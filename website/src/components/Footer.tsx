import React from "react";
import { Skiper58 } from "./ui/skiper-ui/skiper58";

const Footer: React.FC = () => {
  return (
    <>
      {/* Original Footer Content with black background */}
      <footer className="relative z-10 pt-2 pb-3 bg-background">
        <div className="container mx-auto px-2 md:px-4">
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
              {/* Cool backstory label */}
              <div className="cool-backstory absolute -left-32 top-0 flex items-center gap-2">
                <span className="handwritten rotated">Cool backstory</span>
                <svg width="30" height="15" viewBox="0 0 30 15" className="arrow-svg">
                  <path d="M0 7.5 Q7.5 2.5 15 7.5 Q22.5 12.5 30 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <polygon points="25,5 30,7.5 25,10" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-white/50 text-sm leading-relaxed text-right max-w-[400px]">
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
      <div className="relative z-0 w-full h-64 bg-gradient-to-b from-card to-black flex justify-center items-center">
        <div className="relative overflow-hidden w-full h-full px-12">
          <h2 className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 sm:text-[192px] text-[100px] md:text-[192px] text-white/10 font-bold">
            LeetFeedback
          </h2>
        </div>
      </div>
    </>
  );
};

export default Footer;
