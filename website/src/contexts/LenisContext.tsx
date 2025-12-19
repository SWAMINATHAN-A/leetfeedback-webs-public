import React, { createContext, ReactNode } from 'react';
import { useLenis } from '../hooks/useLenis';
import Lenis from 'lenis';

interface LenisContextType {
  lenis: Lenis | null;
}

export const LenisContext = createContext<LenisContextType>({ lenis: null });

interface LenisProviderProps {
  children: ReactNode;
  options?: {
    autoRaf?: boolean;
    wheelMultiplier?: number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    easing?: (t: number) => number;
    lerp?: number;
    duration?: number;
  };
}

/**
 * Provider component for Lenis smooth scroll
 * Wraps your application and initializes Lenis globally
 */
export const LenisProvider: React.FC<LenisProviderProps> = ({
  children,
  options = {},
}) => {
  const lenis = useLenis(options);

  // Expose lenis instance to window for global access
  React.useEffect(() => {
    if (lenis) {
      (window as any).lenis = lenis;
    }
  }, [lenis]);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
};

/**
 * Hook to access Lenis instance from context
 */
export const useLenisContext = () => {
  const context = React.useContext(LenisContext);
  if (!context) {
    console.warn('useLenisContext must be used within LenisProvider');
  }
  return context;
};
