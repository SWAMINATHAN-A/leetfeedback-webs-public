import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import {
  BackendUser,
  getBackendUser,
  validateBackendAuth,
  loginUser,
  registerUser,
  logoutBackendUser,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../utils/backendAuth";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
  username?: string;
  timezone?: string;
  visibility?: string;
  currentStreak?: number;
  totalXp?: number;
  createdAt?: string;
  authType: "backend";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
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
      localStorage.setItem("backend_user", JSON.stringify(userData));
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
    // Check for existing backend user
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        // Check if user was previously authenticated with backend
        const authType = localStorage.getItem("auth_type");
        console.log("[AuthContext] Initializing auth, auth_type:", authType);
        
        if (authType === "backend") {
          // Try to validate with backend using httpOnly cookie
          console.log("[AuthContext] Attempting to validate backend auth...");
          const validatedUser = await validateBackendAuth();
          if (validatedUser) {
            console.log("[AuthContext] Backend auth validation successful:", validatedUser.username);
            const userData: User = {
              uid: validatedUser.id,
              email: validatedUser.email,
              displayName: validatedUser.username,
              photoURL: null,
              provider: "backend",
              username: validatedUser.username,
              timezone: validatedUser.timezone,
              visibility: validatedUser.visibility,
              currentStreak: validatedUser.currentStreak,
              totalXp: validatedUser.totalXp,
              createdAt: validatedUser.createdAt,
              authType: "backend",
            };
            setUserState(userData);
            setIsLoading(false);
            return;
          } else {
            console.log("[AuthContext] Backend auth validation failed");
          }
        }
      } catch (error) {
        console.error("[AuthContext] Auth initialization error:", error);
      }

      console.log("[AuthContext] Auth initialization complete, user:", !!user);
      setIsLoading(false);
    };

    initializeAuth();

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
      window.removeEventListener("message", handleExtensionMessage);
    };
  }, []);

  const signInWithCredentials = useCallback(
    async (credentials: LoginRequest): Promise<AuthResponse> => {
      try {
        setIsLoading(true);

        const response = await loginUser(credentials);

        if (response.success && response.user) {
          const userData: User = {
            uid: response.user.id,
            email: response.user.email,
            displayName: response.user.username,
            photoURL: null,
            provider: "backend",
            username: response.user.username,
            timezone: response.user.timezone,
            visibility: response.user.visibility,
            currentStreak: response.user.currentStreak,
            totalXp: response.user.totalXp,
            createdAt: response.user.createdAt,
            authType: "backend",
          };
          setUserState(userData);
        }

        return response;
      } catch (error) {
        console.error("Backend sign-in error:", error);
        return {
          success: false,
          message: "Sign-in failed. Please try again.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const registerWithCredentials = useCallback(
    async (userData: RegisterRequest): Promise<AuthResponse> => {
      try {
        setIsLoading(true);

        const response = await registerUser(userData);

        if (response.success && response.user) {
          const userState: User = {
            uid: response.user.id,
            email: response.user.email,
            displayName: response.user.username,
            photoURL: null,
            provider: "backend",
            username: response.user.username,
            timezone: response.user.timezone,
            visibility: response.user.visibility,
            currentStreak: response.user.currentStreak,
            totalXp: response.user.totalXp,
            createdAt: response.user.createdAt,
            authType: "backend",
          };
          setUserState(userState);
        }

        return response;
      } catch (error) {
        console.error("Backend registration error:", error);
        return {
          success: false,
          message: "Registration failed. Please try again.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await logoutBackendUser();
      setUserState(null);
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      signInWithCredentials,
      registerWithCredentials,
      signOut,
      isAuthenticated: !!user,
    }),
    [
      user,
      isLoading,
      signInWithCredentials,
      registerWithCredentials,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
