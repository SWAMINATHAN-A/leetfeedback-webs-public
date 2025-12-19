import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface LenisOptions {
  autoRaf?: boolean;
  wrapper?: Window | HTMLElement;
  content?: HTMLElement;
  wheelMultiplier?: number;
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchInertiaMultiplier?: number;
  easing?: (t: number) => number;
  lerp?: number;
  duration?: number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  normalizeWheel?: boolean;
  normalizeTouch?: boolean;
  tabGestures?: boolean;
}

/**
 * Custom hook to initialize and manage Lenis smooth scroll
 * Handles lifecycle and cleanup automatically
 */
export const useLenis = (options?: LenisOptions) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with provided options or defaults
    const lenisInstance = new Lenis({
      autoRaf: true,
      ...options,
    });

    lenisRef.current = lenisInstance;

    // Optional: Handle Lenis scroll events
    lenisInstance.on('scroll', ({ velocity, direction, progress }) => {
      // You can log or handle scroll events here
      // console.log('Lenis scroll:', { velocity, direction, progress });
    });

    // Cleanup function
    return () => {
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef.current;
};

/**
 * Helper function to scroll to a specific position using Lenis
 * @param target - Target scroll position or element
 * @param options - Lenis scrollTo options
 */
export const scrollToWithLenis = (
  target: number | string | HTMLElement,
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    lock?: boolean;
    force?: boolean;
    onComplete?: () => void;
  }
) => {
  const lenis = (window as any).lenis as Lenis | undefined;
  
  if (!lenis) {
    console.warn('Lenis instance not found on window');
    return;
  }

  lenis.scrollTo(target, options);
};

/**
 * Helper function to pause Lenis scroll (useful for modals)
 */
export const pauseLenis = () => {
  const lenis = (window as any).lenis as Lenis | undefined;
  if (lenis) {
    lenis.stop();
  }
};

/**
 * Helper function to resume Lenis scroll
 */
export const resumeLenis = () => {
  const lenis = (window as any).lenis as Lenis | undefined;
  if (lenis) {
    lenis.start();
  }
};
