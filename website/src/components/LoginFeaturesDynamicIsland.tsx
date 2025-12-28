import React, { useState, useEffect } from "react";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "@/components/ui/dynamic-island";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CodeIcon from "@mui/icons-material/Code";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BarChartIcon from "@mui/icons-material/BarChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import InsightsIcon from "@mui/icons-material/Insights";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GroupsIcon from "@mui/icons-material/Groups";
import DevicesIcon from "@mui/icons-material/Devices";
import { BlurFade } from "@/components/magicui/blur-fade";
import { motion } from "motion/react";

// Constants
const COLORS = {
  systemBlue: "#007AFF",
  systemGreen: "#34C759",
  systemIndigo: "#5856D6",
  systemOrange: "#FF9500",
  systemPink: "#FF2D55",
  systemPurple: "#AF52DE",
  systemRed: "#FF3B30",
  systemTeal: "#5AC8FA",
  systemYellow: "#FFCC00",
  white: "#FFFFFF",
  gray: "#8E8E93",
} as const;

const ANIMATION_DELAYS = {
  icon: 0,
  title: 0.1,
  description: 0.2,
} as const;

const ANIMATION_DURATION = 0.5;

const FEATURE_DURATIONS = {
  short: 3000,
  medium: 3500,
  long: 4000,
  initial: 1000,
} as const;

// Feature configuration
type FeatureType =
  | "github"
  | "aiFeedback"
  | "notionSync"
  | "smartTracking"
  | "analytics"
  | "ankiCards"
  | "mistakeCategorization"
  | "achievements"
  | "platformIntegration"
  | "userAuth"
  | "aiAnalysis"
  | "revisionSchedule"
  | "dataVisualization"
  | "progressTracking"
  | "mobileApp"
  | "teamCollaboration"
  | "platformExpansion";

interface FeatureConfig {
  id: FeatureType;
  icon: React.ComponentType<any>;
  iconColor: string;
  title: string;
  description?: string;
  size: "compact" | "compactLong" | "large" | "tall" | "medium" | "long";
}

const FEATURES: FeatureConfig[] = [
  // Phase 1: Foundation & Core Features
  {
    id: "github",
    icon: GitHubIcon,
    iconColor: COLORS.white,
    title: "GitHub Integration",
    description:
      "Auto-commit solutions with AI analysis to build your coding portfolio",
    size: "compactLong",
  },
  {
    id: "platformIntegration",
    icon: CodeIcon,
    iconColor: COLORS.systemBlue,
    title: "Platform Integration",
    description:
      "Seamless support for LeetCode, GeeksforGeeks, and more coding platforms",
    size: "large",
  },
  {
    id: "userAuth",
    icon: AccountCircleIcon,
    iconColor: COLORS.systemGreen,
    title: "Secure Authentication",
    size: "large",
  },
  {
    id: "smartTracking",
    icon: TrackChangesIcon,
    iconColor: COLORS.systemGreen,
    title: "Smart Session Tracking",
    description:
      'Automatically tracks every "Run" click across all major DSA platforms',
    size: "medium",
  },

  // Phase 2: AI Intelligence & Productivity Tools
  {
    id: "aiFeedback",
    icon: SmartToyIcon,
    iconColor: COLORS.systemBlue,
    title: "AI-Powered Feedback",
    description:
      "Advanced pattern recognition and personalized coding insights",
    size: "compactLong",
  },
  {
    id: "aiAnalysis",
    icon: PsychologyIcon,
    iconColor: COLORS.systemPurple,
    title: "AI Performance Coach",
    description: "Strategic insights, mistake analysis, and habit tracking",
    size: "tall",
  },
  {
    id: "notionSync",
    icon: NotesIcon,
    iconColor: COLORS.systemIndigo,
    title: "Notion Sync",
    description:
      "Export insights and tagged mistakes to your Notion workspace for organized learning",
    size: "tall",
  },
  {
    id: "ankiCards",
    icon: StyleIcon,
    iconColor: COLORS.systemOrange,
    title: "Built-in SRS",
    description: "Spaced repetition for patterns",
    size: "long",
  },
  {
    id: "revisionSchedule",
    icon: ScheduleIcon,
    iconColor: COLORS.systemOrange,
    title: "Smart Revision Scheduling",
    size: "compactLong",
  },

  // Phase 3: Analytics & Visualization
  {
    id: "analytics",
    icon: AnalyticsIcon,
    iconColor: COLORS.systemTeal,
    title: "Performance Analytics & Graphs",
    description: "Comprehensive dashboard with detailed progress metrics",
    size: "large",
  },
  {
    id: "dataVisualization",
    icon: BarChartIcon,
    iconColor: COLORS.systemTeal,
    title: "Data Visualization",
    description: "Interactive charts and performance metrics visualization",
    size: "medium",
  },
  {
    id: "progressTracking",
    icon: TimelineIcon,
    iconColor: COLORS.systemIndigo,
    title: "Progress Tracking",
    description: "Advanced time tracking and difficulty progression analysis",
    size: "medium",
  },
  {
    id: "mistakeCategorization",
    icon: AutoFixHighIcon,
    iconColor: COLORS.systemPink,
    title: "Mistake Categorization",
    size: "compactLong",
  },

  // Phase 4: Platform Expansion & Advanced Features
  {
    id: "platformExpansion",
    icon: DevicesIcon,
    iconColor: COLORS.gray,
    title: "Platform Expansion",
    description: "Support for CodeChef, HackerRank, Codeforces, and TUF+",
    size: "large",
  },
  {
    id: "mobileApp",
    icon: PhoneAndroidIcon,
    iconColor: COLORS.gray,
    title: "Mobile Companion App",
    description: "iOS and Android Support",
    size: "tall",
  },
  {
    id: "teamCollaboration",
    icon: GroupsIcon,
    iconColor: COLORS.gray,
    title: "Team Collaboration",
    description: "Group practice sessions and enterprise admin controls",
    size: "medium",
  },
  {
    id: "achievements",
    icon: EmojiEventsIcon,
    iconColor: COLORS.systemYellow,
    title: "Compete & Conquer",
    description: "XP system, 40+ achievements, and real-time leaderboards",
    size: "compactLong",
  },
];

const LoginFeatureShowcase = () => {
  const { state: blobState, setSize } = useDynamicIslandSize();
  const [currentFeatureIndex, setCurrentFeatureIndex] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Define the animation sequence for features - simplified to match FEATURES array
  const featureSequence = FEATURES.map((feature, index) => ({
    size: feature.size,
    delay: index === 0 ? FEATURE_DURATIONS.initial : FEATURE_DURATIONS.short,
    featureIndex: index,
  }));

  // Custom animation control instead of useScheduledAnimations
  React.useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setTimeout(
      () => {
        const nextIndex = (currentFeatureIndex + 1) % FEATURES.length;
        setCurrentFeatureIndex(nextIndex);
        setSize(FEATURES[nextIndex].size);
      },
      currentFeatureIndex === 0
        ? FEATURE_DURATIONS.initial
        : FEATURE_DURATIONS.short
    );

    return () => clearTimeout(timer);
  }, [currentFeatureIndex, isAutoPlaying, setSize]);

  // Get current feature based on index
  const getCurrentFeature = (): FeatureConfig => {
    return FEATURES[currentFeatureIndex] || FEATURES[0];
  };

  // Handle click to advance to next feature
  const handleClick = () => {
    setIsAutoPlaying(false);
    const nextIndex = (currentFeatureIndex + 1) % FEATURES.length;
    setCurrentFeatureIndex(nextIndex);
    setSize(FEATURES[nextIndex].size);

    // Resume auto-play after a brief pause
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  // Unified render function for different layouts
  const renderFeature = (feature: FeatureConfig) => {
    const { icon: Icon, iconColor, title, description, size } = feature;

    // Animated icon with special effect for AI feature
    const iconElement = (
      <BlurFade
        key={`icon-${currentFeatureIndex}-${feature.id}`}
        delay={ANIMATION_DELAYS.icon}
        duration={ANIMATION_DURATION}
      >
        {feature.id === "aiFeedback" ? (
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className={getIconSize(size)} style={{ color: iconColor }} />
          </motion.div>
        ) : (
          <Icon className={getIconSize(size)} style={{ color: iconColor }} />
        )}
      </BlurFade>
    );

    // Render based on layout size
    switch (size) {
      case "tall":
        return renderTallLayout(iconElement, title, feature.id, description);
      case "medium":
        return renderMediumLayout(iconElement, title, feature.id, description);
      case "large":
        return renderLargeLayout(iconElement, title, feature.id);
      case "long":
        return renderLongLayout(iconElement, title, feature.id);
      case "compact":
      case "compactLong":
      default:
        return renderCompactLayout(iconElement, title, feature.id);
    }
  };

  // Helper functions for different layouts
  const getIconSize = (size: string): string => {
    switch (size) {
      case "large":
        return "h-12 w-12";
      case "tall":
        return "h-9 w-9";
      case "medium":
        return "h-8 w-8";
      case "long":
        return "h-9 w-9";
      case "compact":
      case "compactLong":
      default:
        return "h-6 w-6";
    }
  };

  const renderCompactLayout = (
    iconElement: React.ReactNode,
    title: string,
    featureId: string
  ) => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative w-full flex items-center justify-between px-6">
        {iconElement}
        <BlurFade
          key={`title-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.title}
          duration={ANIMATION_DURATION}
        >
          <DynamicDescription className="text-white text-lg font-semibold tracking-tight">
            {title}
          </DynamicDescription>
        </BlurFade>
      </div>
    </DynamicContainer>
  );

  const renderLargeLayout = (
    iconElement: React.ReactNode,
    title: string,
    featureId: string
  ) => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative flex w-full items-center justify-between px-6">
        {iconElement}
        <BlurFade
          key={`title-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.title}
          duration={ANIMATION_DURATION}
        >
          <DynamicTitle className="text-2xl font-black tracking-tight text-white">
            {title}
          </DynamicTitle>
        </BlurFade>
      </div>
    </DynamicContainer>
  );

  const renderTallLayout = (
    iconElement: React.ReactNode,
    title: string,
    featureId: string,
    description?: string
  ) => (
    <DynamicContainer className="flex flex-col justify-between h-full w-full px-6 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-1">
        {iconElement}
        <BlurFade
          key={`title-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.title}
          duration={ANIMATION_DURATION}
        >
          <DynamicTitle className="text-3xl font-black tracking-tight text-white">
            {title}
          </DynamicTitle>
        </BlurFade>
      </div>
      {description && (
        <BlurFade
          key={`desc-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.description}
          duration={ANIMATION_DURATION}
        >
          <DynamicDescription className="tracking-tight leading-6 text-lg text-neutral-200 text-left">
            {description}
          </DynamicDescription>
        </BlurFade>
      )}
    </DynamicContainer>
  );

  const renderMediumLayout = (
    iconElement: React.ReactNode,
    title: string,
    featureId: string,
    description?: string
  ) => (
    <DynamicContainer className="flex flex-col justify-between px-6 pt-5 text-left text-white h-full pb-3">
      <div className="flex items-center gap-3 mb-2">
        {iconElement}
        <BlurFade
          key={`title-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.title}
          duration={ANIMATION_DURATION}
        >
          <DynamicTitle className="text-2xl font-black tracking-tight">
            {title}
          </DynamicTitle>
        </BlurFade>
      </div>
      {description && (
        <BlurFade
          key={`desc-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.description}
          duration={ANIMATION_DURATION}
        >
          <DynamicDescription className="leading-6 text-lg text-neutral-200 mb-3">
            {description}
          </DynamicDescription>
        </BlurFade>
      )}
    </DynamicContainer>
  );

  const renderLongLayout = (
    iconElement: React.ReactNode,
    title: string,
    featureId: string
  ) => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <DynamicDiv className="relative flex w-full items-center justify-between px-6">
        {iconElement}
        <BlurFade
          key={`title-${currentFeatureIndex}-${featureId}`}
          delay={ANIMATION_DELAYS.title}
          duration={ANIMATION_DURATION}
        >
          <DynamicTitle className="text-xl font-black tracking-tight text-white">
            {title}
          </DynamicTitle>
        </BlurFade>
      </DynamicDiv>
    </DynamicContainer>
  );

  // Simplified render logic
  const renderState = () => {
    const currentFeature = getCurrentFeature();
    return renderFeature(currentFeature);
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div onClick={handleClick} className="cursor-pointer">
        <DynamicIsland id="login-features-showcase">
          {renderState()}
        </DynamicIsland>
      </div>
    </div>
  );
};

export function LoginFeaturesDynamicIsland() {
  return (
    <DynamicIslandProvider initialSize="compactLong">
      {/* Fixed height container to prevent layout shift when island expands/contracts */}
      <div
        className="w-full flex items-start justify-center mobile-dynamic-island relative z-50"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          height: "220px", // Fixed height to accommodate largest size (tall/medium)
          minHeight: "220px",
        }}
      >
        {/* Absolutely positioned island within the fixed container */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <LoginFeatureShowcase />
        </div>
      </div>
    </DynamicIslandProvider>
  );
}
