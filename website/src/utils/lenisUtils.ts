import Lenis from 'lenis';
import { scrollToWithLenis, pauseLenis, resumeLenis } from '../hooks/useLenis';

/**
 * Enhanced smooth scroll to target using Lenis when available,
 * falls back to anime.js implementation
 * @param targetY - Target scroll position in pixels
 * @param duration - Animation duration in milliseconds (default: 800)
 * @param easing - Easing function name
 */
export function smoothScrollToEnhanced(
  targetY: number,
  duration: number = 800,
  easing?: string
): Promise<void> {
  const lenis = (window as any).lenis as Lenis | undefined;

  if (lenis) {
    // Use Lenis if available
    return new Promise((resolve) => {
      scrollToWithLenis(targetY, {
        duration: duration / 1000, // Lenis expects duration in seconds
        onComplete: resolve,
      });
    });
  }

  // Fallback to anime.js
  return import('./smoothScroll').then(({ smoothScrollTo }) =>
    smoothScrollTo(targetY, duration, easing || 'easeInOutCubic')
  );
}

/**
 * Enhanced smooth scroll to element using Lenis when available,
 * falls back to anime.js implementation
 * @param element - Target element or selector
 * @param duration - Animation duration in milliseconds (default: 800)
 * @param offset - Optional offset in pixels
 */
export function smoothScrollToElementEnhanced(
  element: Element | string,
  duration: number = 800,
  offset: number = 0
): Promise<void> {
  const lenis = (window as any).lenis as Lenis | undefined;
  const targetElement =
    typeof element === 'string' ? document.querySelector(element) : element;

  if (!targetElement) {
    console.warn(`Element not found: ${element}`);
    return Promise.resolve();
  }

  if (lenis) {
    // Use Lenis if available
    return new Promise((resolve) => {
      scrollToWithLenis(targetElement, {
        duration: duration / 1000, // Lenis expects duration in seconds
        onComplete: resolve,
      });
    });
  }

  // Fallback to anime.js
  return import('./smoothScroll').then(({ smoothScrollToElement }) =>
    smoothScrollToElement(element, duration, 'easeInOutCubic', offset)
  );
}

/**
 * Pause scrolling (useful for modals)
 */
export function pauseScroll() {
  const lenis = (window as any).lenis as Lenis | undefined;
  if (lenis) {
    pauseLenis();
  }
}

/**
 * Resume scrolling
 */
export function resumeScroll() {
  const lenis = (window as any).lenis as Lenis | undefined;
  if (lenis) {
    resumeLenis();
  }
}

/**
 * Get current Lenis instance
 */
export function getLenisInstance(): Lenis | null {
  return (window as any).lenis || null;
}
