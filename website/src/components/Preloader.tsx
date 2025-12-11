import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ChromaText from "./chromaText";

// ============================================
// CONFIGURATION - Edit these values as needed
// ============================================
const CONFIG = {
  // Array of greetings to cycle through
  greetings: [
    "Begin", // English
    "ابدأ", // Arabic
    "ਸ਼ੁਰੂ", // Punjabi
    "Inizia", // Italian
    "開始", // Japanese
    "Débute", // French
    "ahora", // Spanish
  ],

  // Timing configuration (in milliseconds)
  timings: {
    initialHold: 700, // How long to show "Hello" initially
    cycleMin: 100, // Minimum time per greeting during quick cycle
    cycleMax: 140, // Maximum time per greeting during quick cycle
    finalHold: 500, // How long to hold the final greeting before exit
    exitDuration: 0.7, // Exit animation duration in seconds (matching theme switch)
  },
};

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [currentGreeting, setCurrentGreeting] = useState(CONFIG.greetings[0]);
  const [isVisible, setIsVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const runExitAnimation = useCallback(() => {
    if (!overlayRef.current || !textRef.current) return;

    const { exitDuration } = CONFIG.timings;

    // Animation state - circle starts fully covering, ends at 0
    // Animation goes UPWARD: starts at bottom (100%), ends at top (0%)
    const clipState = {
      radius: 150, // Start fully covered
      centerY: 100, // Start at bottom
    };

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Circular reveal animation - same style as theme switch but towards TOP
    // The circle shrinks from bottom-center upward, revealing content behind
    tl.to(clipState, {
      radius: 0,
      centerY: 0, // Move to top
      duration: exitDuration,
      ease: "none",
      onUpdate: () => {
        if (overlayRef.current) {
          overlayRef.current.style.clipPath = `circle(${clipState.radius}% at 50% ${clipState.centerY}%)`;
        }
      },
    });
  }, [onComplete]);

  useEffect(() => {
    let isMounted = true;
    const { greetings, timings } = CONFIG;

    const runAnimation = async () => {
      // Phase 1: Show initial greeting
      await new Promise((resolve) => setTimeout(resolve, timings.initialHold));
      if (!isMounted) return;

      // Phase 2: Quick cycle through greetings
      for (let i = 1; i < greetings.length; i++) {
        const cycleTime =
          timings.cycleMin +
          Math.random() * (timings.cycleMax - timings.cycleMin);
        await new Promise((resolve) => setTimeout(resolve, cycleTime));
        if (!isMounted) return;
        setCurrentGreeting(greetings[i]);
      }

      // Phase 3: Hold final greeting
      setCurrentGreeting(greetings[greetings.length - 1]);
      await new Promise((resolve) => setTimeout(resolve, timings.finalHold));
      if (!isMounted) return;

      // Phase 4: Exit animation
      runExitAnimation();
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [runExitAnimation]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-live="polite"
      aria-label="Loading"
    >
      {/* Overlay with circular clip-path - starts at bottom, reveals upward */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-background flex items-center justify-center"
        style={{
          clipPath: "circle(150% at 50% 100%)",
          willChange: "clip-path",
        }}
      >
        {/* Greeting text */}
        <ChromaText
          ref={textRef}
          words={[currentGreeting]}
          autoCycle={false}
          fontFamily="'HarmonyOS Sans', system-ui, sans-serif"
          fontWeight="300"
          fontSize="3rem"
          className="text-foreground select-none"
          style={{
            willChange: "transform, opacity, filter",
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
