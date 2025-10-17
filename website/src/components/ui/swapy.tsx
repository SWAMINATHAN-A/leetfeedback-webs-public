"use client";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Heart,
  PlusCircle,
  Activity,
  Bot,
  Link,
  BarChart3,
  Trophy,
  Users,
  User,
  UserCheck,
  UserCog,
  UserPlus,
  Code,
  Github,
  Building,
} from "lucide-react";
import {
  TrackingIllustration,
  PatternIllustration,
  PlatformsIllustration,
  GamificationIllustration,
  CollaborationIllustration,
  AnalyticsIllustration,
  MistakeLearningIllustration,
  BuildingIllustration,
  GitHubIllustration,
} from "./bento-illustrations";

type AnimationType = "dynamic" | "spring" | "none";
type SwapMode = "hover" | "drop";

type Config = {
  animation: AnimationType;
  continuousMode: boolean;
  manualSwap: boolean;
  swapMode: SwapMode;
  autoScrollOnDrag: boolean;
  enabled: boolean;
};

type SwapyLayoutProps = {
  id: string;
  enable?: boolean;
  onSwap?: (event: { newSlotItemMap: { asArray: any } }) => void;
  config?: Partial<Config>;
  className?: string;
  children: React.ReactNode;
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

export function ProjectViewsCard() {
  return (
    <div className="bg-emerald-600 rounded-xl h-full p-6 flex flex-col justify-center items-center text-center shadow-md relative overflow-hidden">
      <TrackingIllustration />
      <div className="flex gap-2 relative z-10">
        <h2 className="text-yellow-200 2xl:text-5xl text-3xl font-bold mb-2">
          Smart
        </h2>
        <div className="text-yellow-200 flex items-center gap-1 mb-1">
          <span className="text-xl">
            <Activity className="w-6 h-6" />
          </span>
        </div>
      </div>
      <p className="text-yellow-200 font-medium relative z-10">Tracking</p>
      <p className="text-yellow-200/80 text-sm relative z-10">
        Every run captured
      </p>
    </div>
  );
}

export function NewUsersCard() {
  return (
    <div className="bg-gray-600 rounded-xl h-full p-6 flex flex-col justify-center shadow-md relative overflow-hidden">
      <PatternIllustration />
      <div className="flex items-center gap-2 relative z-10">
        <p className="text-yellow-200 mb-1 font-medium">AI Analysis</p>
        <Bot className="w-5 h-5 text-yellow-200" />
      </div>
      <h2 className="text-yellow-200 2xl:text-6xl text-4xl font-bold leading-none relative z-10">
        Pattern
      </h2>
      <p className="text-green-400 font-medium mt-2 relative z-10">
        Recognition
      </p>
    </div>
  );
}

export function TeamCard() {
  return (
    <div className="bg-blue-100 rounded-xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-md">
      <PlatformsIllustration />
      <div className="bg-blue-300 text-black font-medium px-4 py-2 rounded-xl inline-block mb-4 max-w-fit relative z-10">
        8 Coding Platforms
      </div>
      <div className="relative z-10">
        <p className="font-bold text-gray-800">LeetCode, HackerRank</p>
        <div className="flex items-end gap-2">
          <span className="text-6xl font-bold text-gray-900">& More</span>
          <Code className="w-10 h-10 text-gray-900" />
        </div>
      </div>
    </div>
  );
}

export function LogoCard() {
  return (
    <div className="bg-gradient-to-br from-pink-300 via-pink-200 to-rose-200 rounded-xl h-full p-6 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
      <GamificationIllustration />

      {/* Custom geometric trophy */}
      <div className="relative z-10 mb-6">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trophy cup */}
          <path
            d="M25 25L20 45C20 50 25 55 30 55H50C55 55 60 50 60 45L55 25H25Z"
            fill="#1F2937"
          />
          <rect x="35" y="55" width="10" height="15" fill="#1F2937" />
          <rect x="28" y="70" width="24" height="4" rx="2" fill="#1F2937" />

          {/* Handles */}
          <path
            d="M20 30C15 30 12 35 12 38C12 41 15 43 18 43L20 40"
            stroke="#1F2937"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M60 30C65 30 68 35 68 38C68 41 65 43 62 43L60 40"
            stroke="#1F2937"
            strokeWidth="3"
            fill="none"
          />

          {/* Shine effect */}
          <ellipse cx="35" cy="35" rx="4" ry="8" fill="white" opacity="0.3" />

          {/* Star on trophy */}
          <path
            d="M40 35L42 40L47 41L43 45L44 50L40 47L36 50L37 45L33 41L38 40Z"
            fill="#FCD34D"
          />
        </svg>
      </div>

      {/* Title with bold typography */}
      <h2 className="text-3xl font-black text-gray-900 relative z-10 mb-2 tracking-tight">
        Gamification
      </h2>

      {/* Achievement level bars */}
      <div className="flex gap-1.5 mb-3 relative z-10">
        <div className="w-2 h-6 bg-pink-600 rounded-full"></div>
        <div className="w-2 h-8 bg-pink-500 rounded-full"></div>
        <div className="w-2 h-10 bg-pink-400 rounded-full"></div>
        <div className="w-2 h-8 bg-pink-300 rounded-full"></div>
        <div className="w-2 h-6 bg-pink-200 rounded-full"></div>
      </div>

      <p className="text-gray-700 text-center relative z-10 font-medium text-sm">
        Achievements & Motivation
      </p>
    </div>
  );
}

export function UserTrustCard() {
  return (
    <div className="bg-blue-600 rounded-xl h-full p-4 flex flex-col justify-center items-center text-white shadow-lg relative overflow-hidden">
      <CollaborationIllustration />
      <h3 className="text-2xl font-bold mb-2 relative z-10">Team</h3>
      <p className="text-3xl font-bold mb-4 relative z-10">Collaboration</p>

      <div className="flex -space-x-2 mb-4 relative z-10">
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" fill="currentColor" />
        </div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200 flex items-center justify-center">
          <UserCheck className="w-5 h-5 text-blue-600" fill="currentColor" />
        </div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200 flex items-center justify-center">
          <UserCog className="w-5 h-5 text-blue-600" fill="currentColor" />
        </div>
        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-600 bg-gray-200 flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-blue-600" fill="currentColor" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-yellow-500 border-2 border-blue-600 flex items-center justify-center">
          <PlusCircle className="w-5 h-5 text-white" />
        </div>
      </div>

      <p className="text-sm relative z-10">Share Insights Together</p>
    </div>
  );
}

export function FontCard() {
  return (
    <div className="bg-yellow-200 rounded-xl h-full p-6 col-span-1 shadow-md relative overflow-hidden">
      <GitHubIllustration />
      <h2 className="text-3xl font-bold mb-1 text-gray-900 relative z-10">
        GitHub
      </h2>
      <p className="mb-6 text-gray-700 relative z-10">Auto-commit solutions</p>

      <div className="flex gap-3 mt-4 relative z-10">
        <div className="w-12 h-12 bg-gray-800 rounded-md flex justify-center items-center">
          <Github className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DesignIndustryCard() {
  return (
    <div className="bg-orange-600 text-white rounded-xl h-full p-6 flex flex-col justify-between relative shadow-md overflow-hidden">
      <BuildingIllustration />
      <div className="relative z-10">
        <p className="text-2xl font-bold">Building Future of</p>
        <p className="text-2xl font-bold">Aatamnirbhar Bharat</p>
      </div>
      <Building className="w-12 h-12 text-white self-end relative z-10" />
    </div>
  );
}

export function CardBalanceCard() {
  return (
    <div className="bg-yellow-200 rounded-xl h-full p-6 shadow-lg relative overflow-hidden">
      <AnalyticsIllustration />
      <div className="flex items-center gap-2 relative z-10">
        <h3 className="text-xl font-bold mb-4 text-neutral-950">Progress</h3>
        <BarChart3 className="w-6 h-6 text-neutral-950" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-neutral-800 relative z-10">
        Analytics
      </h2>

      <div className="bg-black text-white rounded-lg p-4 shadow-sm relative z-10">
        <div className="flex justify-between text-sm mb-2">
          <span>Problems Solved</span>
          <span>Streak</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>247</span>
          <span>12 days</span>
        </div>
      </div>
    </div>
  );
}

type Item = {
  id: string;
  title: string;
  widgets: React.ReactNode;
  className?: string;
};

function DefaultSwapy() {
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-12 gap-2 md:gap-6 py-4">
        {/* Row 1 */}
        <div className="lg:col-span-4 sm:col-span-7 col-span-12">
          <ProjectViewsCard />
        </div>
        <div className="lg:col-span-3 sm:col-span-5 col-span-12">
          <NewUsersCard />
        </div>
        <div className="lg:col-span-5 sm:col-span-5 col-span-12">
          <DesignIndustryCard />
        </div>

        {/* Row 2 */}
        <div className="lg:col-span-5 sm:col-span-7 col-span-12">
          <TeamCard />
        </div>
        <div className="lg:col-span-4 sm:col-span-6 col-span-12">
          <LogoCard />
        </div>
        <div className="lg:col-span-3 sm:col-span-6 col-span-12">
          <FontCard />
        </div>

        {/* Row 3 */}
        <div className="lg:col-span-4 sm:col-span-7 col-span-12">
          <UserTrustCard />
        </div>
        <div className="lg:col-span-4 sm:col-span-12 col-span-12">
          <CardBalanceCard />
        </div>
        <div className="lg:col-span-4 sm:col-span-6 col-span-12">
          <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 rounded-xl h-full p-6 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
            <MistakeLearningIllustration />

            {/* Custom brain/learning icon */}
            <div className="w-20 h-20 mb-4 relative z-10">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Brain outline */}
                <path
                  d="M25 30C20 30 15 35 15 40C15 42 16 44 17 45C15 47 14 50 16 53C18 56 22 57 25 56C25 60 28 65 35 65H45C52 65 55 60 55 56C58 57 62 56 64 53C66 50 65 47 63 45C64 44 65 42 65 40C65 35 60 30 55 30C54 25 50 20 40 20C30 20 26 25 25 30Z"
                  fill="white"
                  opacity="0.9"
                />

                {/* Neural pathways */}
                <circle cx="30" cy="35" r="2" fill="#8B5CF6" />
                <circle cx="40" cy="32" r="2" fill="#8B5CF6" />
                <circle cx="50" cy="35" r="2" fill="#8B5CF6" />
                <circle cx="35" cy="45" r="2" fill="#8B5CF6" />
                <circle cx="45" cy="45" r="2" fill="#8B5CF6" />
                <circle cx="40" cy="55" r="2" fill="#8B5CF6" />

                <path
                  d="M30 35L40 32M40 32L50 35M30 35L35 45M50 35L45 45M35 45L40 55M45 45L40 55"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                  opacity="0.6"
                />

                {/* Lightbulb moment */}
                <circle
                  cx="60"
                  cy="25"
                  r="6"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <path d="M57 31L63 31" stroke="white" strokeWidth="2" />
                <path d="M58.5 33L61.5 33" stroke="white" strokeWidth="2" />
              </svg>
            </div>

            <h2 className="text-2xl font-black text-white mb-2 relative z-10 tracking-tight">
              Learn from Mistakes
            </h2>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
              </div>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 10L9 14L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>

            <p className="text-purple-100 text-sm relative z-10 font-medium">
              AI-powered error analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultSwapy;
