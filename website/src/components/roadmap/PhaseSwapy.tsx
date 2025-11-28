"use client";
import type React from "react";
import { useEffect, useState, useRef } from "react";
import { animate, stagger, utils } from "animejs";
const { random } = utils;
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PsychologyIcon from "@mui/icons-material/Psychology";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";
import DevicesIcon from "@mui/icons-material/Devices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";

// Custom hook for anime.js scroll-triggered animations
const useScrollAnimation = (
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = containerRef.current?.querySelectorAll(".swapy-card");

            if (cards) {
              animate(cards, {
                translateY: [50, 0],
                opacity: [0, 1],
                scale: [0.85, 1],
                rotate: [random(-3, 3), 0],
                delay: stagger(120, { start: 100 }),
                duration: 900,
                ease: "outElastic(1, 0.7)",
              });
            }

            // Animate icons with a bounce
            const icons = containerRef.current?.querySelectorAll(".swapy-icon");
            if (icons) {
              animate(icons, {
                scale: [0, 1.15, 1],
                rotate: [180, 0],
                delay: stagger(120, { start: 300 }),
                duration: 800,
                ease: "outBack",
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef]);
};

// Hook to detect if device is mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;

      setIsMobile(
        mobileRegex.test(userAgent) || (isTouchDevice && isSmallScreen)
      );
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

// Phase 1 Components
export function GitHubIntegrationCard() {
  return (
    <div
      className="swapy-card bg-gray-800 text-white rounded-xl h-full p-3 sm:p-4 flex flex-col justify-between shadow-md"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <GitHubIcon className="swapy-icon w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
          GitHub
        </h3>
      </div>
      <p className="text-gray-300 text-[10px] sm:text-xs mt-1 leading-tight">
        Auto-commit solutions
      </p>
    </div>
  );
}

export function PlatformIntegrationCard() {
  return (
    <div
      className="swapy-card bg-blue-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start items-start shadow-md"
      style={{ opacity: 0 }}
    >
      <CodeIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 text-white mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
        Platform
      </h3>
      <p className="text-blue-100 text-[10px] sm:text-xs text-left leading-tight">
        LeetCode & GeeksforGeeks
      </p>
    </div>
  );
}

export function AuthSystemCard() {
  return (
    <div
      className="swapy-card bg-green-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <AccountCircleIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 text-white mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
        User Auth
      </h3>
      <p className="text-green-100 text-[10px] sm:text-xs leading-tight">
        Secure Authentication
      </p>
    </div>
  );
}

export function ExtensionCard() {
  return (
    <div
      className="swapy-card bg-purple-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start items-start shadow-md"
      style={{ opacity: 0 }}
    >
      <IntegrationInstructionsIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 text-white mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">
        Extension
      </h3>
      <p className="text-purple-100 text-[10px] sm:text-xs text-left leading-tight">
        Popup Interface
      </p>
    </div>
  );
}

// Phase 2 Components
export function AIAnalysisCard() {
  return (
    <div
      className="swapy-card bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <PsychologyIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        AI Analysis
      </h3>
      <p className="text-purple-100 text-[10px] sm:text-xs leading-tight">
        Pattern Recognition
      </p>
      <p className="text-pink-200 font-medium text-[10px] sm:text-xs mt-0.5 sm:mt-1">
        Smart Insights
      </p>
    </div>
  );
}

export function NotionSyncCard() {
  return (
    <div
      className="swapy-card bg-gray-100 text-gray-900 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <NotesIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 text-gray-700 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Notion Sync
      </h3>
      <p className="text-gray-600 text-[10px] sm:text-xs leading-tight">
        Workspace Integration
      </p>
    </div>
  );
}

export function AnkiCardsCard() {
  return (
    <div
      className="swapy-card bg-red-500 text-white rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <StyleIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        ANKI Cards
      </h3>
      <p className="text-red-100 text-[10px] sm:text-xs leading-tight">
        Auto-generation
      </p>
    </div>
  );
}

export function RevisionScheduleCard() {
  return (
    <div
      className="swapy-card bg-orange-500 text-white rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <ScheduleIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Revision
      </h3>
      <p className="text-orange-100 text-[10px] sm:text-xs leading-tight">
        Smart Scheduling
      </p>
    </div>
  );
}

// Phase 3 Components (Muted)
export function AnalyticsDashboardCard() {
  return (
    <div
      className="swapy-card bg-gray-400 text-gray-700 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <AnalyticsIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Analytics
      </h3>
      <p className="text-gray-600 text-[10px] sm:text-xs leading-tight">
        Dashboard
      </p>
      <p className="text-gray-500 font-medium text-[10px] sm:text-xs mt-0.5 sm:mt-1">
        Coming Soon
      </p>
    </div>
  );
}

export function DataVisualizationCard() {
  return (
    <div
      className="swapy-card bg-gray-300 text-gray-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <BarChartIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Visualization
      </h3>
      <p className="text-gray-500 text-[10px] sm:text-xs leading-tight">
        Performance Metrics
      </p>
    </div>
  );
}

export function ProgressTrackingCard() {
  return (
    <div
      className="swapy-card bg-gray-400 text-gray-700 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <TimelineIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Progress
      </h3>
      <p className="text-gray-600 text-[10px] sm:text-xs leading-tight">
        Tracking Tools
      </p>
    </div>
  );
}

export function CustomReportsCard() {
  return (
    <div
      className="swapy-card bg-gray-300 text-gray-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <InsightsIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Reports
      </h3>
      <p className="text-gray-500 text-[10px] sm:text-xs leading-tight">
        Custom Features
      </p>
    </div>
  );
}

// Phase 4 Components (Muted)
export function PlatformExpansionCard() {
  return (
    <div
      className="swapy-card bg-gray-400 text-gray-700 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <DevicesIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Platform
      </h3>
      <p className="text-gray-600 text-[10px] sm:text-xs leading-tight">
        Expansion
      </p>
      <p className="text-gray-500 font-medium text-[10px] sm:text-xs mt-0.5 sm:mt-1">
        Future
      </p>
    </div>
  );
}

export function MobileAppCard() {
  return (
    <div
      className="swapy-card bg-gray-300 text-gray-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <PhoneAndroidIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Mobile App
      </h3>
      <p className="text-gray-500 text-[10px] sm:text-xs leading-tight">
        Companion
      </p>
    </div>
  );
}

export function GamificationCard() {
  return (
    <div
      className="swapy-card bg-gray-400 text-gray-700 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <EmojiEventsIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Gamification
      </h3>
      <p className="text-gray-600 text-[10px] sm:text-xs leading-tight">
        Achievements
      </p>
    </div>
  );
}

export function TeamFeaturesCard() {
  return (
    <div
      className="swapy-card bg-gray-300 text-gray-600 rounded-xl h-full p-3 sm:p-4 flex flex-col justify-start shadow-md"
      style={{ opacity: 0 }}
    >
      <GroupsIcon className="swapy-icon w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0" />
      <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight">
        Team
      </h3>
      <p className="text-gray-500 text-[10px] sm:text-xs leading-tight">
        Collaboration
      </p>
    </div>
  );
}

// Custom Swapy Layout Components
export function Phase1Swapy() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef);

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto"
      >
        <div className="h-24 sm:h-28">
          <GitHubIntegrationCard />
        </div>
        <div className="h-24 sm:h-28">
          <PlatformIntegrationCard />
        </div>
        <div className="h-24 sm:h-28">
          <AuthSystemCard />
        </div>
        <div className="h-24 sm:h-28">
          <ExtensionCard />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full"
    >
      <div className="h-28 lg:h-32">
        <GitHubIntegrationCard />
      </div>
      <div className="h-28 lg:h-32">
        <PlatformIntegrationCard />
      </div>
      <div className="h-28 lg:h-32">
        <AuthSystemCard />
      </div>
      <div className="h-28 lg:h-32">
        <ExtensionCard />
      </div>
    </div>
  );
}

export function Phase2Swapy() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef);

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto"
      >
        <div className="h-24 sm:h-28">
          <AIAnalysisCard />
        </div>
        <div className="h-24 sm:h-28">
          <NotionSyncCard />
        </div>
        <div className="h-24 sm:h-28">
          <AnkiCardsCard />
        </div>
        <div className="h-24 sm:h-28">
          <RevisionScheduleCard />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full"
    >
      <div className="h-28 lg:h-32">
        <AIAnalysisCard />
      </div>
      <div className="h-28 lg:h-32">
        <NotionSyncCard />
      </div>
      <div className="h-28 lg:h-32">
        <AnkiCardsCard />
      </div>
      <div className="h-28 lg:h-32">
        <RevisionScheduleCard />
      </div>
    </div>
  );
}

export function Phase3Swapy() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef);

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto"
      >
        <div className="h-24 sm:h-28">
          <AnalyticsDashboardCard />
        </div>
        <div className="h-24 sm:h-28">
          <DataVisualizationCard />
        </div>
        <div className="h-24 sm:h-28">
          <ProgressTrackingCard />
        </div>
        <div className="h-24 sm:h-28">
          <CustomReportsCard />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full"
    >
      <div className="h-28 lg:h-32">
        <AnalyticsDashboardCard />
      </div>
      <div className="h-28 lg:h-32">
        <DataVisualizationCard />
      </div>
      <div className="h-28 lg:h-32">
        <ProgressTrackingCard />
      </div>
      <div className="h-28 lg:h-32">
        <CustomReportsCard />
      </div>
    </div>
  );
}

export function Phase4Swapy() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(containerRef);

  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto"
      >
        <div className="h-24 sm:h-28">
          <PlatformExpansionCard />
        </div>
        <div className="h-24 sm:h-28">
          <MobileAppCard />
        </div>
        <div className="h-24 sm:h-28">
          <GamificationCard />
        </div>
        <div className="h-24 sm:h-28">
          <TeamFeaturesCard />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full"
    >
      <div className="h-28 lg:h-32">
        <PlatformExpansionCard />
      </div>
      <div className="h-28 lg:h-32">
        <MobileAppCard />
      </div>
      <div className="h-28 lg:h-32">
        <GamificationCard />
      </div>
      <div className="h-28 lg:h-32">
        <TeamFeaturesCard />
      </div>
    </div>
  );
}
