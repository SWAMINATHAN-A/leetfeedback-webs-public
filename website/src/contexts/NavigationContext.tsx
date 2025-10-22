import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
  isNavigating: boolean;
  navigationTarget: string | null;
  startNavigation: (target: string) => void;
  completeNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);

  const startNavigation = (target: string) => {
    setIsNavigating(true);
    setNavigationTarget(target);
  };

  const completeNavigation = () => {
    setIsNavigating(false);
    setNavigationTarget(null);
  };

  return (
    <NavigationContext.Provider
      value={{
        isNavigating,
        navigationTarget,
        startNavigation,
        completeNavigation,
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
