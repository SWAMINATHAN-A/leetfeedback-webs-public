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

  // Helper function to set user state
  const setUserState = (userData: User | null) => {
    setUser(userData);

    if (userData) {
      console.log(
        `[AuthContext] User authenticated via ${userData.authType}`
      );
    } else {
      console.log("[AuthContext] User signed out");
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
