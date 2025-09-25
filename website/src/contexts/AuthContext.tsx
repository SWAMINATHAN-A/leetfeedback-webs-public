import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User as FirebaseUser,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserCredential,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { 
  BackendUser, 
  getBackendUser, 
  validateBackendAuth,
  loginUser,
  registerUser,
  logoutBackendUser,
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from "../utils/backendAuth";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  username?: string;
  role?: string;
  github?: {
    username: string | null;
    repo: string | null;
    branch: string | null;
    linked: boolean;
  };
  authType: 'firebase' | 'backend';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithCredentials: (credentials: LoginRequest) => Promise<AuthResponse>;
  registerWithCredentials: (userData: RegisterRequest) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to set user state and handle notifications
  const setUserState = (userData: User | null) => {
    setUser(userData);
    
    if (userData) {
      // Store user data for extension communication with timestamp
      const storageKey = userData.authType === 'firebase' ? "firebase_user" : "backend_user";
      localStorage.setItem(storageKey, JSON.stringify(userData));
      localStorage.setItem("auth_timestamp", Date.now().toString());

      // Notify extension of auth change
      window.postMessage(
        {
          type: "AUTH_STATE_CHANGED",
          isAuthenticated: true,
          user: userData,
        },
        window.location.origin
      );

      console.log(
        `[AuthContext] User authenticated via ${userData.authType}, data stored for extension`
      );
    } else {
      localStorage.removeItem("firebase_user");
      localStorage.removeItem("backend_user");
      localStorage.removeItem("auth_timestamp");

      // Notify extension of auth change
      window.postMessage(
        {
          type: "AUTH_STATE_CHANGED",
          isAuthenticated: false,
          user: null,
        },
        window.location.origin
      );

      console.log("[AuthContext] User signed out, data cleared");
    }
  };

  useEffect(() => {
    // Check for existing backend user first
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check if user was previously authenticated with backend
        const authType = localStorage.getItem('auth_type');
        if (authType === 'backend') {
          // Try to validate with backend using httpOnly cookie
          const validatedUser = await validateBackendAuth();
          if (validatedUser) {
            const userData: User = {
              uid: validatedUser.id,
              email: validatedUser.email,
              displayName: validatedUser.username,
              photoURL: null,
              provider: 'backend',
              username: validatedUser.username,
              role: validatedUser.role,
              github: validatedUser.github,
              authType: 'backend',
            };
            setUserState(userData);
            setIsLoading(false);
            return;
          }
          // If validation fails, user will be signed out
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
      
      // If no backend user or validation failed, continue with Firebase auth check
      setIsLoading(false);
    };

    initializeAuth();

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        // Only process Firebase auth if no backend user is already authenticated
        const currentAuthType = localStorage.getItem('auth_type');
        if (currentAuthType === 'backend' && user?.authType === 'backend') {
          return; // Don't override backend auth with Firebase
        }

        if (firebaseUser) {
          const userData: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            provider: firebaseUser.providerData[0]?.providerId || "unknown",
            authType: 'firebase',
          };
          setUserState(userData);
        } else if (user?.authType === 'firebase') {
          // Only clear if the current user was Firebase-authenticated
          setUserState(null);
        }
        setIsLoading(false);
      }
    );

    // Listen for auth status requests from extension
    const handleExtensionMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (
        event.data.type === "AUTH_STATUS_REQUEST" &&
        event.data.source === "extension"
      ) {
        console.log(
          "[AuthContext] Extension requesting auth status, current user:",
          !!user
        );
        // Send auth status to extension
        const response = {
          type: "AUTH_STATUS_RESPONSE",
          isAuthenticated: !!user,
          user: user,
        };

        if (event.source) {
          (event.source as Window).postMessage(response, event.origin);
        } else {
          // Fallback: post to window
          window.postMessage(response, window.location.origin);
        }
      }

      if (
        event.data.type === "SIGN_OUT_REQUEST" &&
        event.data.source === "extension"
      ) {
        // Handle sign out request from extension
        signOut()
          .then(() => {
            window.postMessage(
              {
                type: "SIGN_OUT_RESPONSE",
                success: true,
              },
              window.location.origin
            );
          })
          .catch((error) => {
            console.error("Sign out error:", error);
            window.postMessage(
              {
                type: "SIGN_OUT_RESPONSE",
                success: false,
                error: error.message,
              },
              window.location.origin
            );
          });
      }
    };

    window.addEventListener("message", handleExtensionMessage);

    return () => {
      unsubscribe();
      window.removeEventListener("message", handleExtensionMessage);
    };
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Clear any existing backend auth
      await logoutBackendUser();
      const result: UserCredential = await signInWithPopup(
        auth,
        googleProvider
      );
      // User state will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithCredentials = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      // Clear any existing Firebase auth
      if (user?.authType === 'firebase') {
        await firebaseSignOut(auth);
      }
      
      const response = await loginUser(credentials);
      
      if (response.success && response.user) {
        const userData: User = {
          uid: response.user.id,
          email: response.user.email,
          displayName: response.user.username,
          photoURL: null,
          provider: 'backend',
          username: response.user.username,
          role: response.user.role,
          github: response.user.github,
          authType: 'backend',
        };
        setUserState(userData);
      }
      
      return response;
    } catch (error) {
      console.error("Backend sign-in error:", error);
      return {
        success: false,
        message: 'Sign-in failed. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithCredentials = async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      // Clear any existing Firebase auth
      if (user?.authType === 'firebase') {
        await firebaseSignOut(auth);
      }
      
      const response = await registerUser(userData);
      
      if (response.success && response.user) {
        const userState: User = {
          uid: response.user.id,
          email: response.user.email,
          displayName: response.user.username,
          photoURL: null,
          provider: 'backend',
          username: response.user.username,
          role: response.user.role,
          github: response.user.github,
          authType: 'backend',
        };
        setUserState(userState);
      }
      
      return response;
    } catch (error) {
      console.error("Backend registration error:", error);
      return {
        success: false,
        message: 'Registration failed. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      if (user?.authType === 'firebase') {
        await firebaseSignOut(auth);
      } else if (user?.authType === 'backend') {
        await logoutBackendUser();
        setUserState(null);
      }
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithCredentials,
    registerWithCredentials,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
