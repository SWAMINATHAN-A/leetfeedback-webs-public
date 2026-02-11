import React from "react";

export const BeyondBasicsCards: React.FC = () => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Row 1: 3 cards */}
      
      {/* Smart Tracking Card */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 flex flex-col min-h-[240px]">
        <h3 className="text-lg font-medium text-white text-left mb-2">
          100% Automated Tracking
        </h3>
        <p className="text-gray-500 text-left leading-relaxed text-xs mb-auto">
          Every code run is captured automatically across all platforms. Zero manual input required.
        </p>
        
        {/* Concentric arcs visualization */}
        <div className="mt-auto flex items-end justify-center h-32 opacity-50">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d="M 150 140 Q 150 50, 60 50"
              stroke="#888"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 150 140 Q 150 75, 85 75"
              stroke="#999"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 150 140 Q 150 100, 110 100"
              stroke="#aaa"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 150 140 Q 150 120, 130 120"
              stroke="rgb(255, 182, 193)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Secure by Default Card */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 flex flex-col min-h-[240px]">
        <h3 className="text-lg font-medium text-white text-left mb-2">
          Secure by Default
        </h3>
        <p className="text-gray-500 text-left leading-relaxed text-xs mb-auto">
          Enterprise-grade security protects your coding data and progress with industry-standard encryption.
        </p>
        
        {/* Vertical lines visualization */}
        <div className="mt-auto flex items-end justify-center h-32 opacity-50">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <line x1="80" y1="40" x2="80" y2="140" stroke="#777" strokeWidth="1.5" />
            <line x1="95" y1="50" x2="95" y2="140" stroke="#7d7d7d" strokeWidth="1.5" />
            <line x1="110" y1="30" x2="110" y2="140" stroke="#838383" strokeWidth="1.5" />
            <line x1="125" y1="45" x2="125" y2="140" stroke="#8a8a8a" strokeWidth="1.5" />
            <line x1="140" y1="20" x2="140" y2="140" stroke="rgb(240, 40, 50)" strokeWidth="2" />
            <line x1="155" y1="35" x2="155" y2="140" stroke="rgb(240, 40, 50)" strokeWidth="2" opacity="0.7" />
            <line x1="170" y1="45" x2="170" y2="140" stroke="#8a8a8a" strokeWidth="1.5" />
            <line x1="185" y1="30" x2="185" y2="140" stroke="#838383" strokeWidth="1.5" />
            <line x1="200" y1="50" x2="200" y2="140" stroke="#7d7d7d" strokeWidth="1.5" />
            <line x1="215" y1="40" x2="215" y2="140" stroke="#777" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Smart Analytics Card */}
      <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 flex flex-col min-h-[240px]">
        <h3 className="text-lg font-medium text-white text-left mb-2">
          Smart Analytics
        </h3>
        <p className="text-gray-500 text-left leading-relaxed text-xs mb-auto">
          Track your progress with detailed performance insights and growth metrics visualized in real-time.
        </p>
        
        {/* Line chart visualization */}
        <div className="mt-auto flex items-end justify-center h-32 opacity-50">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              d="M 30 110 L 60 95 L 90 100 L 120 75 L 150 80 L 180 60 L 210 65 L 240 55 L 270 60"
              stroke="#888"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M 30 120 L 60 108 L 90 112 L 120 90 L 150 94 L 180 78 L 210 82 L 240 72 L 270 76"
              stroke="#6a6a6a"
              strokeWidth="1.2"
              fill="none"
            />
            <circle cx="180" cy="60" r="4" fill="rgb(255, 190, 20)" />
          </svg>
        </div>
      </div>

      {/* Row 2: 1 large card spanning 3 columns */}
      
      {/* AI Performance Coach Card */}
      <div className="md:col-span-3 bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 flex flex-col min-h-[240px]">
        <h3 className="text-lg font-medium text-white text-left mb-2">
          AI Performance Coach
        </h3>
        <p className="text-gray-500 text-left leading-relaxed text-xs mb-auto">
          Receive personalized insights on your study habits, mistake analysis, and consistency tracking powered by AI.
        </p>
        
        {/* Complex neural network visualization */}
        <div className="mt-auto flex items-end justify-center h-32 opacity-50">
          <svg
            className="w-full h-full"
            viewBox="0 0 600 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Layer 1 to Layer 2 connections */}
            <line x1="120" y1="60" x2="250" y2="50" stroke="#777" strokeWidth="1" />
            <line x1="120" y1="60" x2="250" y2="80" stroke="#777" strokeWidth="1" />
            <line x1="120" y1="60" x2="250" y2="110" stroke="#777" strokeWidth="1" />
            <line x1="120" y1="100" x2="250" y2="50" stroke="#777" strokeWidth="1" />
            <line x1="120" y1="100" x2="250" y2="80" stroke="#777" strokeWidth="1" />
            <line x1="120" y1="100" x2="250" y2="110" stroke="#777" strokeWidth="1" />
            
            {/* Layer 2 to Layer 3 connections */}
            <line x1="250" y1="50" x2="380" y2="60" stroke="#888" strokeWidth="1" />
            <line x1="250" y1="50" x2="380" y2="100" stroke="#888" strokeWidth="1" />
            <line x1="250" y1="80" x2="380" y2="60" stroke="#888" strokeWidth="1" />
            <line x1="250" y1="80" x2="380" y2="100" stroke="#888" strokeWidth="1" />
            <line x1="250" y1="110" x2="380" y2="60" stroke="#888" strokeWidth="1" />
            <line x1="250" y1="110" x2="380" y2="100" stroke="#888" strokeWidth="1" />
            
            {/* Layer 3 to Output connections */}
            <line x1="380" y1="60" x2="480" y2="80" stroke="#999" strokeWidth="1.2" />
            <line x1="380" y1="100" x2="480" y2="80" stroke="#999" strokeWidth="1.2" />
            
            {/* Layer 1 nodes */}
            <circle cx="120" cy="60" r="6" fill="#777" />
            <circle cx="120" cy="100" r="6" fill="#777" />
            
            {/* Layer 2 nodes */}
            <circle cx="250" cy="50" r="6" fill="#888" />
            <circle cx="250" cy="80" r="6" fill="#888" />
            <circle cx="250" cy="110" r="6" fill="#888" />
            
            {/* Layer 3 nodes */}
            <circle cx="380" cy="60" r="6" fill="#999" />
            <circle cx="380" cy="100" r="6" fill="#999" />
            
            {/* Output node */}
            <circle cx="480" cy="80" r="7" fill="rgb(235, 235, 255)" />
          </svg>
        </div>
      </div>

      {/* Row 3: 2 cards */}
      
      {/* Notion Sync Card (replacing GitHub Integration) */}
      <div className="md:col-span-2 bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 flex flex-col min-h-[240px]">
        <h3 className="text-lg font-medium text-white text-left mb-2">
          Notion Sync
        </h3>
        <p className="text-gray-500 text-left leading-relaxed text-xs mb-auto">
          Export insights and tagged mistakes to your Notion workspace for organized learning and team collaboration.
        </p>
        
        {/* Document/sync visualization */}
        <div className="mt-auto flex items-end justify-center h-32 opacity-50">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            {/* Document pages */}
            <rect x="100" y="50" width="80" height="90" rx="4" stroke="#888" strokeWidth="1.5" fill="none" />
            <rect x="110" y="45" width="80" height="90" rx="4" stroke="#999" strokeWidth="1.5" fill="none" />
            <rect x="120" y="40" width="80" height="90" rx="4" stroke="#aaa" strokeWidth="1.5" fill="none" />
            
            {/* Lines inside document */}
            <line x1="130" y1="55" x2="190" y2="55" stroke="#777" strokeWidth="1" />
            <line x1="130" y1="65" x2="185" y2="65" stroke="#777" strokeWidth="1" />
            <line x1="130" y1="75" x2="190" y2="75" stroke="#777" strokeWidth="1" />
            <line x1="130" y1="85" x2="180" y2="85" stroke="#777" strokeWidth="1" />
            
            {/* Sync arrows */}
            <path d="M 210 75 L 240 75" stroke="rgb(20, 90, 230)" strokeWidth="2" />
            <path d="M 235 70 L 240 75 L 235 80" stroke="rgb(20, 90, 230)" strokeWidth="2" fill="none" />
            
            {/* Target location */}
            <rect x="250" y="60" width="50" height="60" rx="4" stroke="rgb(20, 90, 230)" strokeWidth="2" fill="none" />
            <line x1="260" y1="75" x2="290" y2="75" stroke="#888" strokeWidth="1" />
            <line x1="260" y1="85" x2="285" y2="85" stroke="#888" strokeWidth="1" />
            <line x1="260" y1="95" x2="290" y2="95" stroke="#888" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Social Leaderboard Card */}
      <div className="md:col-span-1 bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 flex flex-col min-h-[240px]">
        <h3 className="text-lg font-medium text-white text-left mb-2">
          Compete & Conquer
        </h3>
        <p className="text-gray-500 text-left leading-relaxed text-xs mb-auto">
          Earn XP for every solve, unlock 40+ achievements, and see how you stack up on global leaderboards.
        </p>
        
        {/* Horizontal bars visualization */}
        <div className="mt-auto flex items-end justify-center h-32 opacity-50">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <rect x="60" y="60" width="180" height="3" fill="#777" />
            <rect x="60" y="80" width="200" height="3" fill="rgb(255, 190, 20)" />
            <rect x="60" y="100" width="150" height="3" fill="#888" />
            <rect x="60" y="120" width="120" height="3" fill="#6a6a6a" />
          </svg>
        </div>
      </div>
    </div>
  );
};
