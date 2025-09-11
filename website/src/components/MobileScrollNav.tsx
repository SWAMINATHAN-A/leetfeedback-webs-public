"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";

interface Section {
  id: string;
  label: string;
}

const SECTIONS: Section[] = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How it Works" },
  { id: "pricing", label: "Pricing" },
];

export function MobileScrollNav() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isDragging, setIsDragging] = useState(false);

  // Scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return; // Don't update active section while dragging

      const sections = SECTIONS.map(section => ({
        ...section,
        element: document.querySelector(`#${section.id}`)
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          
          if (scrollPosition >= elementTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDragging]);

  // Handle drag navigation
  const handleMouseDown = (e: React.MouseEvent, sectionId: string) => {
    setIsDragging(true);
    setActiveSection(sectionId);
    scrollToSection(sectionId);

    const startY = e.clientY;
    const startIndex = SECTIONS.findIndex(s => s.id === sectionId);

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      const sensitivity = 30; // pixels per section
      const newIndex = Math.max(0, Math.min(SECTIONS.length - 1, startIndex - Math.round(deltaY / sensitivity)));
      
      if (newIndex !== startIndex) {
        const newSection = SECTIONS[newIndex];
        setActiveSection(newSection.id);
        scrollToSection(newSection.id);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent, sectionId: string) => {
    setIsDragging(true);
    setActiveSection(sectionId);
    scrollToSection(sectionId);

    const startY = e.touches[0].clientY;
    const startIndex = SECTIONS.findIndex(s => s.id === sectionId);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = e.touches[0].clientY - startY;
      const sensitivity = 30;
      const newIndex = Math.max(0, Math.min(SECTIONS.length - 1, startIndex - Math.round(deltaY / sensitivity)));
      
      if (newIndex !== startIndex) {
        const newSection = SECTIONS[newIndex];
        setActiveSection(newSection.id);
        scrollToSection(newSection.id);
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 md:hidden opacity-60">
      <div className="flex flex-col items-center gap-6 p-2">
        {SECTIONS.map((section, index) => (
          <div
            key={section.id}
            className="relative"
          >
            {/* Camera focus effect for active dot */}
            {activeSection === section.id && (
              <div className="absolute inset-0 w-6 h-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {/* Top-right border */}
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-primary/50 rounded-tr-sm" />
                {/* Bottom-left border */}
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-primary/50 rounded-bl-sm" />
              </div>
            )}
            
            {/* Dot */}
            <div
              className={cn(
                "w-1 h-1 rounded-full cursor-pointer transition-all duration-300 select-none",
                "hover:scale-125 relative z-10",
                activeSection === section.id
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
              )}
              onClick={() => {
                setActiveSection(section.id);
                scrollToSection(section.id);
              }}
              onMouseDown={(e) => handleMouseDown(e, section.id)}
              onTouchStart={(e) => handleTouchStart(e, section.id)}
              aria-label={`Navigate to ${section.label}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveSection(section.id);
                  scrollToSection(section.id);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}