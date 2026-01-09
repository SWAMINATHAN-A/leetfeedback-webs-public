import React, { useRef, useEffect, useState } from "react";
import { Skiper58 } from "./ui/skiper-ui/skiper58";
import { ChromaText } from "./ui/textRenderAppear";

// Wrapper component that triggers ChromaText animation when visible (replays on re-scroll)
const VisibleChromaText: React.FC<{
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ children, id, className, delay = 0.1, duration = 0.9 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setKey((prev) => prev + 1);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {isVisible ? (
        <ChromaText
          key={key}
          id={id}
          className={className}
          delay={delay}
          duration={duration}
        >
          {children}
        </ChromaText>
      ) : (
        <span className={className}>{children}</span>
      )}
    </span>
  );
};

const Footer: React.FC = () => {
  return (
    <>
      {/* Original Footer Content with black background */}
      <footer className="relative z-10 pt-2 pb-3 bg-background">
        <div className="container">
          {/* Separator */}
          <div className="border-t border-white/10 mb-1"></div>

          {/* Footer Content - navigation on left, copyright right */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Skiper58 Footer Component - constrained width so it doesn't stretch */}
            <div className="shrink-0 max-w-[520px] w-full md:w-auto">
              <Skiper58 />
            </div>

            {/* Copyright - right aligned on desktop, wraps as paragraph */}
            <div className="w-full md:w-auto md:flex md:items-center md:justify-end relative">
              <div className="text-muted-foreground text-sm leading-relaxed text-right max-w-[400px]">
                <p>
                  ©2025 LeetFeedback. All rights recieved. This project is
                  something I have worked on for over a year at this point, it's
                  still nowhere near completion. It started as a simple push to
                  github chrome extension and now we are training neural
                  networks for revision scheduler, never would i have thought
                  this project would become so big.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer - positioned after all content */}
      <div className="relative z-0 w-full h-64 bg-gradient-to-b from-card to-white dark:to-black flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full px-12">
          {/* Large Logo */}
          <img
            src="/logo.svg"
            alt="LeetFeedback Logo"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 object-contain opacity-10 dark:invert dark:opacity-5 pointer-events-none"
          />
          <h2 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 sm:text-[192px] text-[100px] md:text-[192px] font-bold">
            <VisibleChromaText id="footer-leetfeedback" delay={0.2} duration={1.5}>
              LeetFeedback
            </VisibleChromaText>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Footer;
