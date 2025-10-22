import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isNavigating: boolean;
  navigationTarget: string | null;
  startNavigation: (target: string) => void;
  completeNavigation: () => void;
  isSignInIslandOpen: boolean;
  openSignInIsland: () => void;
  closeSignInIsland: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);
  const [isSignInIslandOpen, setIsSignInIslandOpen] = useState(false);

  const startNavigation = (target: string) => {
    setIsNavigating(true);
    setNavigationTarget(target);
  };

  const completeNavigation = () => {
    setIsNavigating(false);
    setNavigationTarget(null);
  };

  const openSignInIsland = () => {
    setIsSignInIslandOpen(true);
  };

  const closeSignInIsland = () => {
    setIsSignInIslandOpen(false);
  };

  return (
    <NavigationContext.Provider
      value={{
        isNavigating,
        navigationTarget,
        startNavigation,
        completeNavigation,
        isSignInIslandOpen,
        openSignInIsland,
        closeSignInIsland,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};
