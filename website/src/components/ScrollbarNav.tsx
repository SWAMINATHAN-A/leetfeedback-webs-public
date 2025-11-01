"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { animate } from "animejs";
import { cn } from "../lib/utils";
import { BlurFade } from "./magicui/blur-fade";
import { smoothScrollTo, smoothScrollToElement } from "../utils/smoothScroll";

interface Section {
  id: string;
  label: string;
  isMajor?: boolean; // Major checkpoints with labels
  position: number; // Manual position (0-100)
}

const SECTIONS: Section[] = [
  { id: "home", label: "Home", isMajor: true, position: 0 },
  { id: "marker-1", label: "", position: 5 },
  { id: "marker-2", label: "", position: 10 },
  { id: "hero-content", label: "Hero Content", position: 15 },
  { id: "marker-3", label: "", position: 20 },
  { id: "marker-4", label: "", position: 23 },
  { id: "features", label: "Features", isMajor: true, position: 28 },
  { id: "marker-5", label: "", position: 32 },
  { id: "marker-6", label: "", position: 36 },
  { id: "marker-7", label: "", position: 40 },
  { id: "features-grid", label: "Features Grid", position: 44 },
  { id: "marker-8", label: "", position: 48 },
  { id: "marker-9", label: "", position: 52 },
  { id: "marker-10", label: "", position: 56 },
  { id: "how-it-works", label: "How it Works", isMajor: true, position: 60 },
  { id: "marker-11", label: "", position: 63 },
  { id: "marker-12", label: "", position: 66 },
  { id: "how-it-works-steps", label: "Steps", position: 69 },
  { id: "marker-13", label: "", position: 72 },
  { id: "marker-14", label: "", position: 75 },
  { id: "marker-15", label: "", position: 78 },
  { id: "pricing", label: "Pricing", isMajor: true, position: 82 },
  { id: "marker-16", label: "", position: 85 },
  { id: "marker-17", label: "", position: 88 },
  { id: "pricing-plans", label: "Plans", position: 91 },
  { id: "marker-18", label: "", position: 94 },
  { id: "marker-19", label: "", position: 97 },
  { id: "marker-20", label: "", position: 100 },
];

export function ScrollbarNav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isDragging, setIsDragging] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [labelText, setLabelText] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const lastLabelRef = useRef<string>("");

  // Calculate scroll progress and active section
  const updateScrollPosition = useCallback(() => {
    if (isDragging) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    // Calculate overall scroll progress (0 to 1)
    const maxScroll = documentHeight - windowHeight;
    const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    setScrollProgress(progress);

    // Find active section
    const sections = SECTIONS.map((section) => ({
      ...section,
      element: document.querySelector(`#${section.id}`),
    }));

    const scrollPosition = scrollTop + windowHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.element) {
        const rect = section.element.getBoundingClientRect();
        const elementTop = scrollTop + rect.top;

        if (scrollPosition >= elementTop) {
          if (activeSection !== section.id) {
            setActiveSection(section.id);
            // Only show label if section has a non-empty label
            if (section.label && section.label.length > 0) {
              // update label only when different
              if (lastLabelRef.current !== section.label) {
                setLabelText(section.label);
                lastLabelRef.current = section.label;
                showLabelBriefly();
              }
            }
          }
          break;
        }
      }
    }
  }, [isDragging, activeSection]);

  // Show label briefly when changing sections
  const showLabelBriefly = () => {
    // Clear any existing hide timeout
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    // Show the label (mount it)
    setShowLabel(true);

    // Wait for next tick so the element is mounted before animating
    requestAnimationFrame(() => {
      if (labelRef.current) {
        // Reset quick styles so animation starts clean
        labelRef.current.style.opacity = "0";
        labelRef.current.style.transform = "translateX(-10px)";

        animate(labelRef.current, {
          opacity: [0, 1],
          translateX: [-10, 0],
          duration: 300,
          easing: "easeOutCubic",
        });
      }
    });

    // Auto-hide after 2 seconds (store id so we can clear on new events)
    hideTimeoutRef.current = window.setTimeout(() => {
      if (labelRef.current) {
        animate(labelRef.current, {
          opacity: 0,
          translateX: -10,
          duration: 300,
          easing: "easeInCubic",
          complete: () => {
            setShowLabel(false);
            hideTimeoutRef.current = null;
          },
        });
      } else {
        setShowLabel(false);
        hideTimeoutRef.current = null;
      }
    }, 1800);
  };

  // Animate thumb position
  useEffect(() => {
    if (!thumbRef.current || !trackRef.current) return;

    const trackHeight = trackRef.current.offsetHeight;
    const thumbHeight = thumbRef.current.offsetHeight;
    const maxThumbPosition = trackHeight - thumbHeight;
    const targetY = scrollProgress * maxThumbPosition;

    if (animationRef.current) {
      animationRef.current.pause();
    }

    animationRef.current = animate(thumbRef.current, {
      translateY: targetY,
      duration: isDragging ? 0 : 400,
      easing: "out(3)",
    });
  }, [scrollProgress, isDragging]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      updateScrollPosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
    };
  }, [updateScrollPosition]);

  // Scroll to section using anime.js
  const scrollToSection = (sectionId: string) => {
    smoothScrollToElement(`#${sectionId}`, 800, "easeInOutCubic");
  };

  // Handle drag start
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setShowLabel(true);

    if (!trackRef.current || !thumbRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackHeight = trackRect.height;
    const thumbHeight = thumbRef.current.offsetHeight;
    const maxThumbPosition = trackHeight - thumbHeight;

    const handleMove = (moveY: number) => {
      const relativeY = moveY - trackRect.top;
      const clampedY = Math.max(
        0,
        Math.min(relativeY - thumbHeight / 2, maxThumbPosition)
      );
      const progress = clampedY / maxThumbPosition;

      setScrollProgress(progress);

      // Calculate target scroll position
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const targetScroll = progress * maxScroll;

      // Use instant scroll during drag for responsiveness
      window.scrollTo({ top: targetScroll, behavior: "auto" });

      // Update section label
      const sections = SECTIONS.map((section) => ({
        ...section,
        element: document.querySelector(`#${section.id}`),
      }));

      const scrollPosition = targetScroll + windowHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = targetScroll + rect.top;

          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            // show label for labeled sections (avoid repeating)
            if (section.label && section.label.length > 0) {
              if (lastLabelRef.current !== section.label) {
                setLabelText(section.label);
                lastLabelRef.current = section.label;
                showLabelBriefly();
              }
            }
            break;
          }
        }
      }
    };

    return handleMove;
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const handleMove = handleDragStart(e.clientY);

    const handleMouseMove = (e: MouseEvent) => {
      handleMove?.(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);

      // Hide label after a delay (use shared timeout so it can be cleared)
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        if (labelRef.current) {
          animate(labelRef.current, {
            opacity: 0,
            translateX: -10,
            duration: 300,
            easing: "easeInCubic",
            complete: () => setShowLabel(false),
          });
        } else {
          setShowLabel(false);
        }
        hideTimeoutRef.current = null;
      }, 1500);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const handleMove = handleDragStart(e.touches[0].clientY);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleMove?.(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);

      // Hide label after a delay (use shared timeout)
      if (hideTimeoutRef.current) {
        window.clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = window.setTimeout(() => {
        if (labelRef.current) {
          animate(labelRef.current, {
            opacity: 0,
            translateX: -10,
            duration: 300,
            easing: "easeInCubic",
            complete: () => setShowLabel(false),
          });
        } else {
          setShowLabel(false);
        }
        hideTimeoutRef.current = null;
      }, 1500);

      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  // Handle track click
  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || !thumbRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const trackHeight = trackRect.height;
    const thumbHeight = thumbRef.current.offsetHeight;
    const maxThumbPosition = trackHeight - thumbHeight;

    const progress = Math.max(
      0,
      Math.min((clickY - thumbHeight / 2) / maxThumbPosition, 1)
    );

    setScrollProgress(progress);

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const targetScroll = progress * maxScroll;

    // Use anime.js smooth scroll for track clicks
    smoothScrollTo(targetScroll, 800, "easeInOutCubic");

    // Show label for nearest labeled checkpoint after click
    const currentPercent = progress * 100;
    let nearest = SECTIONS[0];
    let nearestDist = Math.abs(SECTIONS[0].position - currentPercent);
    for (let i = 1; i < SECTIONS.length; i++) {
      const d = Math.abs(SECTIONS[i].position - currentPercent);
      if (d < nearestDist) {
        nearest = SECTIONS[i];
        nearestDist = d;
      }
    }

    if (nearest.label && nearest.label.length > 0) {
      if (lastLabelRef.current !== nearest.label) {
        setLabelText(nearest.label);
        lastLabelRef.current = nearest.label;
        showLabelBriefly();
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
      <div className="flex items-center gap-4">
        {/* Label popup */}
        {showLabel && (
          <BlurFade delay={0} duration={0.3} inView={true}>
            <div
              ref={labelRef}
              className={cn(
                "bg-background/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2.5",
                "shadow-lg text-sm font-semibold text-foreground whitespace-nowrap",
                "pointer-events-none"
              )}
              style={{ opacity: 0 }}
            >
              {labelText}
            </div>
          </BlurFade>
        )}

        {/* Scrollbar track */}
        <div
          ref={trackRef}
          className={cn("relative h-80 w-2", "cursor-pointer")}
          onClick={handleTrackClick}
        >
          {/* Section markers - horizontal lines */}
          {SECTIONS.map((section, index) => {
            const position = section.position;
            const isActive = activeSection === section.id;
            const isMajor = section.isMajor;
            const hasLabel = section.label && section.label.length > 0;

            // Calculate proximity to current scroll position
            const currentPosition = scrollProgress * 100;
            const distance = Math.abs(currentPosition - position);
            const proximity = Math.max(0, 1 - distance / 15); // Magnify nearby lines

            // Determine if this checkpoint has been passed
            const isPassed = currentPosition >= position;

            // Calculate line width with magnification
            const baseWidth = isMajor ? 14 : hasLabel ? 10 : 6;
            const magnification = proximity * 12; // Up to 12px extra when closest
            const lineWidth = baseWidth + magnification;

            // Calculate thickness
            const baseThickness = isMajor ? 2 : hasLabel ? 1.5 : 1;
            const thicknessMagnification = proximity * 1;
            const lineThickness = baseThickness + thicknessMagnification;

            return (
              <div
                key={section.id}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{ top: `${position}%` }}
              >
                {/* Horizontal line marker */}
                <div
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isPassed ? "bg-red-500" : "bg-muted-foreground/40"
                  )}
                  style={{
                    width: `${lineWidth}px`,
                    height: `${lineThickness}px`,
                    opacity: isMajor
                      ? 0.9
                      : hasLabel
                      ? 0.6 + proximity * 0.3
                      : 0.4 + proximity * 0.3,
                  }}
                />
              </div>
            );
          })}

          {/* Draggable thumb - red indicator (mobile only) */}
          <div
            ref={thumbRef}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-10 h-12 -ml-5",
              "cursor-grab active:cursor-grabbing",
              "flex items-center justify-center",
              "md:hidden" // Hide on desktop
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ transform: "translateY(0) translateX(-50%)" }}
          >
            {/* Red indicator bar */}
            <div
              className={cn(
                "w-2 h-10 bg-red-500 rounded-full shadow-lg shadow-red-500/60",
                "transition-all duration-200 relative",
                isDragging ? "h-12 w-2.5 shadow-red-500/80" : ""
              )}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-400 rounded-full blur-sm opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
