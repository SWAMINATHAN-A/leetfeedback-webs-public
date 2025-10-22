import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  isThemeSwitching: boolean;
  startThemeSwitch: () => void;
  completeThemeSwitch: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // Default to dark theme
  });
  const [isThemeSwitching, setIsThemeSwitching] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const startThemeSwitch = () => {
    setIsThemeSwitching(true);
  };

  const completeThemeSwitch = () => {
    setIsThemeSwitching(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        isThemeSwitching,
        startThemeSwitch,
        completeThemeSwitch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
