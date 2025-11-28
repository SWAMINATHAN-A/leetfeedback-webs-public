"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { animate } from "animejs";
import { cn } from "../lib/utils";
import { smoothScrollTo } from "../utils/smoothScroll";

interface Section {
  id: string;
  isMajor?: boolean;
  position: number;
}

const SECTIONS: Section[] = [
  { id: "home", isMajor: true, position: 0 },
  { id: "marker-1", position: 5 },
  { id: "marker-2", position: 10 },
  { id: "hero-content", position: 15 },
  { id: "marker-3", position: 20 },
  { id: "marker-4", position: 23 },
  { id: "features", isMajor: true, position: 28 },
  { id: "marker-5", position: 32 },
  { id: "marker-6", position: 36 },
  { id: "marker-7", position: 40 },
  { id: "features-grid", position: 44 },
  { id: "marker-8", position: 48 },
  { id: "marker-9", position: 52 },
  { id: "marker-10", position: 56 },
  { id: "how-it-works", isMajor: true, position: 60 },
  { id: "marker-11", position: 63 },
  { id: "marker-12", position: 66 },
  { id: "how-it-works-steps", position: 69 },
  { id: "marker-13", position: 72 },
  { id: "marker-14", position: 75 },
  { id: "marker-15", position: 78 },
  { id: "pricing", isMajor: true, position: 82 },
  { id: "marker-16", position: 85 },
  { id: "marker-17", position: 88 },
  { id: "pricing-plans", position: 91 },
  { id: "marker-18", position: 94 },
  { id: "marker-19", position: 97 },
  { id: "marker-20", position: 100 },
];

export function ScrollbarNav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const thumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  // Delay visibility slightly to prevent initial jump
  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Calculate scroll progress
  const updateScrollPosition = useCallback(() => {
    if (isDragging) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const maxScroll = documentHeight - windowHeight;
    const progress =
      maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

    setScrollProgress(progress);
  }, [isDragging]);

  // Animate thumb position with anime.js
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

  // Handle scroll events with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateScrollPosition]);

  // Handle drag start
  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);

    if (!trackRef.current || !thumbRef.current) return null;

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

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const targetScroll = progress * maxScroll;

      window.scrollTo({ top: targetScroll, behavior: "auto" });
    };

    return handleMove;
  }, []);

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const handleMove = handleDragStart(e.clientY);

      const handleMouseMove = (e: MouseEvent) => {
        handleMove?.(e.clientY);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleDragStart]
  );

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const handleMove = handleDragStart(e.touches[0].clientY);

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        handleMove?.(e.touches[0].clientY);
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [handleDragStart]
  );

  // Handle track click
  const handleTrackClick = useCallback((e: React.MouseEvent) => {
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

    smoothScrollTo(targetScroll, 800, "easeInOutCubic");
  }, []);

  // Pre-calculate current progress percentage for marker styling
  const currentPosition = scrollProgress * 100;

  return (
    <div
      className={cn(
        "fixed right-6 top-1/2 z-40 transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{ transform: "translateY(-50%)" }}
    >
      <div className="flex items-center gap-4">
        {/* Scrollbar track */}
        <div
          ref={trackRef}
          className="relative h-80 w-2 cursor-pointer"
          onClick={handleTrackClick}
        >
          {/* Section markers - horizontal lines */}
          {SECTIONS.map((section) => {
            const position = section.position;
            const isMajor = section.isMajor;
            const isPassed = currentPosition >= position;

            // Calculate proximity for magnification effect
            const distance = Math.abs(currentPosition - position);
            const proximity = Math.max(0, 1 - distance / 15);

            // Calculate line dimensions
            const baseWidth = isMajor ? 14 : 6;
            const magnification = proximity * 12;
            const lineWidth = baseWidth + magnification;

            const baseThickness = isMajor ? 2 : 1;
            const thicknessMagnification = proximity * 1;
            const lineThickness = baseThickness + thicknessMagnification;

            return (
              <div
                key={section.id}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{ top: `${position}%` }}
              >
                <div
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isPassed ? "bg-red-500" : "bg-muted-foreground/40"
                  )}
                  style={{
                    width: `${lineWidth}px`,
                    height: `${lineThickness}px`,
                    opacity: isMajor ? 0.9 : 0.4 + proximity * 0.3,
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
              "md:hidden"
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
