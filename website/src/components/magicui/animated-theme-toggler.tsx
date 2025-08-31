declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => ViewTransition;
  }

  interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  }
}

"use client";

import { Moon, SunDim } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { cn } from "../../lib/utils";
import { useTheme } from "../../contexts/ThemeContext";

type props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: props) => {
  const { isDark, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Check if startViewTransition is available
    if (document.startViewTransition) {
      await document.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      }).ready;

      const { top, left, width, height } =
        buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } else {
      // Fallback for browsers without startViewTransition
      toggleTheme();
    }
  };
  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn("w-full h-full flex items-center justify-center", className)}>
      {isDark ? <SunDim className="w-6 h-6 md:w-7 md:h-7" /> : <Moon className="w-6 h-6 md:w-7 md:h-7" />}
    </button>
  );
};
