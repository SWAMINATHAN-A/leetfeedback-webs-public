"use client";
import type React from "react";
import { useEffect, useState } from "react";
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
    <div className="bg-gray-800 text-white rounded-xl h-full p-4 flex flex-col justify-between shadow-md overflow-hidden">
      <div className="flex items-center gap-2">
        <GitHubIcon className="w-6 h-6 flex-shrink-0" />
        <h3 className="text-lg font-bold truncate">GitHub</h3>
      </div>
      <p className="text-gray-300 text-xs line-clamp-2">Auto-commit solutions</p>
    </div>
  );
}

export function PlatformIntegrationCard() {
  return (
    <div className="bg-blue-600 rounded-xl h-full p-4 flex flex-col justify-start items-start shadow-md overflow-hidden">
      <CodeIcon className="w-8 h-8 text-white mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold text-white mb-1 truncate">Platform</h3>
      <p className="text-blue-100 text-xs text-left line-clamp-2">LeetCode & GeeksforGeeks</p>
    </div>
  );
}

export function AuthSystemCard() {
  return (
    <div className="bg-green-600 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <AccountCircleIcon className="w-8 h-8 text-white mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold text-white truncate">User Auth</h3>
      <p className="text-green-100 text-xs line-clamp-2">Secure Authentication</p>
    </div>
  );
}

export function ExtensionCard() {
  return (
    <div className="bg-purple-600 rounded-xl h-full p-4 flex flex-col justify-start items-start shadow-md overflow-hidden">
      <IntegrationInstructionsIcon className="w-8 h-8 text-white mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold text-white truncate">Extension</h3>
      <p className="text-purple-100 text-xs text-left line-clamp-2">Popup Interface</p>
    </div>
  );
}

// Phase 2 Components  
export function AIAnalysisCard() {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <PsychologyIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">AI Analysis</h3>
      <p className="text-purple-100 text-xs line-clamp-1">Pattern Recognition</p>
      <p className="text-pink-200 font-medium text-xs mt-1">Smart Insights</p>
    </div>
  );
}

export function NotionSyncCard() {
  return (
    <div className="bg-gray-100 text-gray-900 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <NotesIcon className="w-8 h-8 text-gray-700 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Notion Sync</h3>
      <p className="text-gray-600 text-xs line-clamp-2">Workspace Integration</p>
    </div>
  );
}

export function AnkiCardsCard() {
  return (
    <div className="bg-red-500 text-white rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <StyleIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">ANKI Cards</h3>
      <p className="text-red-100 text-xs line-clamp-2">Auto-generation</p>
    </div>
  );
}

export function RevisionScheduleCard() {
  return (
    <div className="bg-orange-500 text-white rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <ScheduleIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Revision</h3>
      <p className="text-orange-100 text-xs line-clamp-2">Smart Scheduling</p>
    </div>
  );
}

// Phase 3 Components (Muted)
export function AnalyticsDashboardCard() {
  return (
    <div className="bg-gray-400 text-gray-700 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <AnalyticsIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Analytics</h3>
      <p className="text-gray-600 text-xs line-clamp-1">Dashboard</p>
      <p className="text-gray-500 font-medium text-xs mt-1">Coming Soon</p>
    </div>
  );
}

export function DataVisualizationCard() {
  return (
    <div className="bg-gray-300 text-gray-600 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <BarChartIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Visualization</h3>
      <p className="text-gray-500 text-xs line-clamp-2">Performance Metrics</p>
    </div>
  );
}

export function ProgressTrackingCard() {
  return (
    <div className="bg-gray-400 text-gray-700 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <TimelineIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Progress</h3>
      <p className="text-gray-600 text-xs line-clamp-2">Tracking Tools</p>
    </div>
  );
}

export function CustomReportsCard() {
  return (
    <div className="bg-gray-300 text-gray-600 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <InsightsIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Reports</h3>
      <p className="text-gray-500 text-xs line-clamp-2">Custom Features</p>
    </div>
  );
}

// Phase 4 Components (Muted)
export function PlatformExpansionCard() {
  return (
    <div className="bg-gray-400 text-gray-700 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <DevicesIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Platform</h3>
      <p className="text-gray-600 text-xs line-clamp-1">Expansion</p>
      <p className="text-gray-500 font-medium text-xs mt-1">Future</p>
    </div>
  );
}

export function MobileAppCard() {
  return (
    <div className="bg-gray-300 text-gray-600 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <PhoneAndroidIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Mobile App</h3>
      <p className="text-gray-500 text-xs line-clamp-2">Companion</p>
    </div>
  );
}

export function GamificationCard() {
  return (
    <div className="bg-gray-400 text-gray-700 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <EmojiEventsIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Gamification</h3>
      <p className="text-gray-600 text-xs line-clamp-2">Achievements</p>
    </div>
  );
}

export function TeamFeaturesCard() {
  return (
    <div className="bg-gray-300 text-gray-600 rounded-xl h-full p-4 flex flex-col justify-start shadow-md overflow-hidden">
      <GroupsIcon className="w-8 h-8 mb-2 flex-shrink-0" />
      <h3 className="text-lg font-bold mb-1 truncate">Team</h3>
      <p className="text-gray-500 text-xs line-clamp-2">Collaboration</p>
    </div>
  );
}

// Custom Swapy Layout Components
export function Phase1Swapy() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <div className="h-28"><GitHubIntegrationCard /></div>
        <div className="h-28"><PlatformIntegrationCard /></div>
        <div className="h-28"><AuthSystemCard /></div>
        <div className="h-28"><ExtensionCard /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="h-32"><GitHubIntegrationCard /></div>
      <div className="h-32"><PlatformIntegrationCard /></div>
      <div className="h-32"><AuthSystemCard /></div>
      <div className="h-32"><ExtensionCard /></div>
    </div>
  );
}

export function Phase2Swapy() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <div className="h-28"><AIAnalysisCard /></div>
        <div className="h-28"><NotionSyncCard /></div>
        <div className="h-28"><AnkiCardsCard /></div>
        <div className="h-28"><RevisionScheduleCard /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="h-32"><AIAnalysisCard /></div>
      <div className="h-32"><NotionSyncCard /></div>
      <div className="h-32"><AnkiCardsCard /></div>
      <div className="h-32"><RevisionScheduleCard /></div>
    </div>
  );
}

export function Phase3Swapy() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <div className="h-28"><AnalyticsDashboardCard /></div>
        <div className="h-28"><DataVisualizationCard /></div>
        <div className="h-28"><ProgressTrackingCard /></div>
        <div className="h-28"><CustomReportsCard /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="h-32"><AnalyticsDashboardCard /></div>
      <div className="h-32"><DataVisualizationCard /></div>
      <div className="h-32"><ProgressTrackingCard /></div>
      <div className="h-32"><CustomReportsCard /></div>
    </div>
  );
}

export function Phase4Swapy() {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <div className="h-28"><PlatformExpansionCard /></div>
        <div className="h-28"><MobileAppCard /></div>
        <div className="h-28"><GamificationCard /></div>
        <div className="h-28"><TeamFeaturesCard /></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="h-32"><PlatformExpansionCard /></div>
      <div className="h-32"><MobileAppCard /></div>
      <div className="h-32"><GamificationCard /></div>
      <div className="h-32"><TeamFeaturesCard /></div>
    </div>
  );
}