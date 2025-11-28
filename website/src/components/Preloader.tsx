import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

// ============================================
// CONFIGURATION - Edit these values as needed
// ============================================
const CONFIG = {
  // Array of greetings to cycle through
  greetings: [
    "Hello", // English
    "مرحبا", // Arabic
    "Bonjour", // French
    "Ciao", // Italian
    "やあ", // Japanese
    "Hola", // Spanish
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
  ],

  // Timing configuration (in milliseconds)
  timings: {
    initialHold: 700, // How long to show "Hello" initially
    cycleMin: 80, // Minimum time per greeting during quick cycle
    cycleMax: 120, // Maximum time per greeting during quick cycle
    finalHold: 400, // How long to hold the final greeting before exit
    exitDuration: 1.1, // Exit animation duration in seconds (matching theme switch)
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
  const blurOverlayRef = useRef<HTMLDivElement>(null);

  const runExitAnimation = useCallback(() => {
    if (!overlayRef.current || !textRef.current || !blurOverlayRef.current)
      return;

    const { exitDuration } = CONFIG.timings;

    // Animation state - circle starts fully covering, ends at 0
    // Animation goes UPWARD: starts at bottom (100%), ends at top (0%)
    const clipState = {
      radius: 150, // Start fully covered
      centerY: 100, // Start at bottom
    };

    // Blur state for the backdrop blur overlay
    const blurState = {
      blur: 30, // Start with strong blur
      opacity: 1,
    };

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete?.();
      },
    });

    // Animate text fade out with slight upward motion
    tl.to(textRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.95,
      filter: "blur(10px)",
      duration: 0.3,
      ease: "power4.out",
    });

    // Circular reveal animation - same style as theme switch but towards TOP
    // The circle shrinks from bottom-center upward, revealing content behind
    tl.to(
      clipState,
      {
        radius: 0,
        centerY: 0, // Move to top
        duration: exitDuration,
        ease: "power4.out",
        onUpdate: () => {
          if (overlayRef.current) {
            overlayRef.current.style.clipPath = `circle(${clipState.radius}% at 50% ${clipState.centerY}%)`;
          }
        },
      },
      "-=0.15"
    );

    // Backdrop blur animation - creates frosted glass effect on revealed content
    tl.to(
      blurState,
      {
        blur: 0,
        opacity: 0,
        duration: exitDuration * 0.9,
        ease: "power3.out",
        onUpdate: () => {
          if (blurOverlayRef.current) {
            blurOverlayRef.current.style.backdropFilter = `blur(${blurState.blur}px)`;
            (
              blurOverlayRef.current.style as any
            ).webkitBackdropFilter = `blur(${blurState.blur}px)`;
            blurOverlayRef.current.style.opacity = String(blurState.opacity);
          }
        },
      },
      "<+0.1" // Start slightly after clip animation begins
    );
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
      {/* Blur overlay - applies backdrop blur to revealed content */}
      <div
        ref={blurOverlayRef}
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          opacity: 0,
          willChange: "backdrop-filter, opacity",
        }}
      />

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
        <span
          ref={textRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground select-none"
          style={{
            fontFamily: "'HarmonyOS Sans', system-ui, sans-serif",
            willChange: "transform, opacity, filter",
          }}
        >
          {currentGreeting}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
