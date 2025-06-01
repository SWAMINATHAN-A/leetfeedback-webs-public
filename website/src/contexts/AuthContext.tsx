import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User as FirebaseUser, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../config/firebase';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userData: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          provider: firebaseUser.providerData[0]?.providerId || 'unknown'
        };
        setUser(userData);
        
        // Store user data for extension communication with timestamp
        localStorage.setItem('firebase_user', JSON.stringify(userData));
        localStorage.setItem('auth_timestamp', Date.now().toString());
        
        // Notify extension of auth change
        window.postMessage({
          type: 'AUTH_STATE_CHANGED',
          isAuthenticated: true,
          user: userData
        }, window.location.origin);
        
        console.log('[AuthContext] User authenticated, data stored for extension');
      } else {
        setUser(null);
        localStorage.removeItem('firebase_user');
        localStorage.removeItem('auth_timestamp');
        
        // Notify extension of auth change
        window.postMessage({
          type: 'AUTH_STATE_CHANGED',
          isAuthenticated: false,
          user: null
        }, window.location.origin);
        
        console.log('[AuthContext] User signed out, data cleared');
      }
      setIsLoading(false);
    });

    // Listen for auth status requests from extension
    const handleExtensionMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'AUTH_STATUS_REQUEST' && event.data.source === 'extension') {
        console.log('[AuthContext] Extension requesting auth status, current user:', !!user);
        // Send auth status to extension
        const response = {
          type: 'AUTH_STATUS_RESPONSE',
          isAuthenticated: !!user,
          user: user
        };
        
        if (event.source) {
          event.source.postMessage(response, event.origin);
        } else {
          // Fallback: post to window
          window.postMessage(response, window.location.origin);
        }
      }
      
      if (event.data.type === 'SIGN_OUT_REQUEST' && event.data.source === 'extension') {
        // Handle sign out request from extension
        signOut().then(() => {
          window.postMessage({
            type: 'SIGN_OUT_RESPONSE',
            success: true
          }, window.location.origin);
        }).catch((error) => {
          console.error('Sign out error:', error);
          window.postMessage({
            type: 'SIGN_OUT_RESPONSE',
            success: false,
            error: error.message
          }, window.location.origin);
        });
      }
    };

    window.addEventListener('message', handleExtensionMessage);

    return () => {
      unsubscribe();
      window.removeEventListener('message', handleExtensionMessage);
    };
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const result: UserCredential = await signInWithPopup(auth, googleProvider);
      // User state will be updated by onAuthStateChanged
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithApple = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const result: UserCredential = await signInWithPopup(auth, appleProvider);
      // User state will be updated by onAuthStateChanged
    } catch (error) {
      console.error('Apple sign-in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      // User state will be updated by onAuthStateChanged
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    signInWithGoogle,
    signInWithApple,
    signOut,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};