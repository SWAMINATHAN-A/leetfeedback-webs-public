"use client";
import type React from "react";
import { useEffect, useRef, useMemo, useState } from "react";
import { createSwapy, type SlotItemMapArray, utils } from "swapy";
import { cn } from "@/lib/utils";
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
  onSwap?: (event: { newSlotItemMap: { asArray: SlotItemMapArray } }) => void;
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

export const SwapyLayout = ({
  id,
  onSwap,
  config = {},
  className,
  children,
}: SwapyLayoutProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const swapyRef = useRef<ReturnType<typeof createSwapy> | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Disable swapy on mobile devices
    const swapyConfig = {
      ...config,
      enabled: !isMobile, // Disable on mobile
    };

    swapyRef.current = createSwapy(container, swapyConfig);

    if (onSwap && !isMobile) {
      swapyRef.current.onSwap(onSwap);
    }

    return () => {
      swapyRef.current?.destroy();
    };
  }, [config, onSwap, isMobile]);

  // Update swapy enabled state when mobile state changes
  useEffect(() => {
    if (swapyRef.current) {
      swapyRef.current.enable(!isMobile);
    }
  }, [isMobile]);

  return (
    <div id={id} ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export const DragHandle = ({ className }: { className?: string }) => {
  const isMobile = useIsMobile();

  // Don't render drag handle on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      data-swapy-handle
      className={cn(
        "absolute top-2 left-2 cursor-grab text-gray-500 rounded-md bg-transparent active:cursor-grabbing",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-grip-vertical-icon lucide-grip-vertical opacity-80"
      >
        <circle cx="9" cy="12" r="1" />
        <circle cx="9" cy="5" r="1" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="15" cy="12" r="1" />
        <circle cx="15" cy="5" r="1" />
        <circle cx="15" cy="19" r="1" />
      </svg>
    </div>
  );
};

export const SwapySlot = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        // Only apply swapy highlight styles on desktop
        !isMobile &&
          "data-[swapy-highlighted]:bg-neutral-200 data-[swapy-highlighted]:dark:bg-neutral-800",
        className
      )}
      data-swapy-slot={id}
    >
      {children}
    </div>
  );
};

const dragOpacityClassMap: Record<number, string> = {
  10: "data-[swapy-dragging]:opacity-10",
  20: "data-[swapy-dragging]:opacity-20",
  30: "data-[swapy-dragging]:opacity-30",
  40: "data-[swapy-dragging]:opacity-40",
  50: "data-[swapy-dragging]:opacity-50",
  60: "data-[swapy-dragging]:opacity-60",
  70: "data-[swapy-dragging]:opacity-70",
  80: "data-[swapy-dragging]:opacity-80",
  90: "data-[swapy-dragging]:opacity-90",
  100: "data-[swapy-dragging]:opacity-100",
};

export const SwapyItem = ({
  id,
  className,
  children,
  dragItemOpacity = 100,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  dragItemOpacity?: number;
}) => {
  const isMobile = useIsMobile();
  const opacityClass =
    dragOpacityClassMap[dragItemOpacity] ?? "data-[swapy-dragging]:opacity-50";

  return (
    <div
      className={cn(
        // Only apply drag opacity styles on desktop
        !isMobile && opacityClass,
        className
      )}
      data-swapy-item={id}
      style={{
        // Prevent touch actions that could interfere with scrolling on mobile
        touchAction: isMobile ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );
};

export function ProjectViewsCard() {
  return (
    <div className="bg-emerald-600 rounded-xl h-full p-6 flex flex-col justify-center items-center text-center shadow-md">
      <div className="flex gap-2">
        <h2 className="text-yellow-200 2xl:text-5xl text-3xl font-bold mb-2">
          Smart
        </h2>
        <div className="text-yellow-200 flex items-center gap-1 mb-1">
          <span className="text-xl">
            <Activity className="w-6 h-6" />
          </span>
        </div>
      </div>
      <p className="text-yellow-200 font-medium">Tracking</p>
      <p className="text-yellow-200/80 text-sm">Every run captured</p>
    </div>
  );
}

export function NewUsersCard() {
  return (
    <div className="bg-gray-600 rounded-xl h-full p-6 flex flex-col justify-center shadow-md">
      <div className="flex items-center gap-2">
        <p className="text-yellow-200 mb-1 font-medium">AI Analysis</p>
        <Bot className="w-5 h-5 text-yellow-200" />
      </div>
      <h2 className="text-yellow-200 2xl:text-6xl text-4xl font-bold leading-none">
        Pattern
      </h2>
      <p className="text-green-400 font-medium mt-2">Recognition</p>
    </div>
  );
}

export function TeamCard() {
  return (
    <div className="bg-blue-100 rounded-xl p-6 h-full flex flex-col justify-between relative overflow-hidden shadow-md">
      <div className="bg-blue-300 text-black font-medium px-4 py-2 rounded-xl inline-block mb-4 max-w-fit">
        8 Coding Platforms
      </div>
      <div>
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
    <div className="bg-pink-200 rounded-xl h-full p-6 flex flex-col items-center justify-center shadow-md">
      <div className="w-16 h-16 mb-4">
        <Trophy className="w-full h-full text-pink-600" />
      </div>
      <h2 className="2xl:text-3xl text-xl font-bold text-gray-900">
        Gamification
      </h2>
      <p className="text-gray-700 text-center">Achievements & Motivation</p>
    </div>
  );
}

export function UserTrustCard() {
  return (
    <div className="bg-blue-600 rounded-xl h-full p-4 flex flex-col justify-center items-center text-white shadow-lg">
      <h3 className="text-2xl font-bold mb-2">Team</h3>
      <p className="text-3xl font-bold mb-4">Collaboration</p>

      <div className="flex -space-x-2 mb-4">
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

      <p className="text-sm">Share Insights Together</p>
    </div>
  );
}

export function FontCard() {
  return (
    <div className="bg-yellow-200 rounded-xl h-full p-6 col-span-1 shadow-md">
      <h2 className="text-3xl font-bold mb-1 text-gray-900">GitHub</h2>
      <p className="mb-6 text-gray-700">Auto-commit solutions</p>

      <div className="flex gap-3 mt-4">
        <div className="w-12 h-12 bg-gray-800 rounded-md flex justify-center items-center">
          <Github className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DesignIndustryCard() {
  return (
    <div className="bg-orange-600 text-white rounded-xl h-full p-6 flex flex-col justify-between relative shadow-md">
      <div>
        <p className="text-2xl font-bold">Building Future of</p>
        <p className="text-2xl font-bold">Aatamnirbhar Bharat</p>
      </div>
      <Building className="w-12 h-12 text-white self-end" />
    </div>
  );
}

export function CardBalanceCard() {
  return (
    <div className="bg-yellow-200 rounded-xl h-full p-6 shadow-lg">
      <div className="flex items-center gap-2">
        <h3 className="text-xl font-bold mb-4 text-neutral-950">Progress</h3>
        <BarChart3 className="w-6 h-6 text-neutral-950" />
      </div>
      <h2 className="text-3xl font-bold mb-6 text-neutral-800">Analytics</h2>

      <div className="bg-black text-white rounded-lg p-4 shadow-sm">
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

const initialItems: Item[] = [
  {
    id: "1",
    title: "1",
    widgets: <ProjectViewsCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  {
    id: "2",
    title: "2",
    widgets: <NewUsersCard />,
    className: "lg:col-span-3 sm:col-span-5 col-span-12",
  },
  {
    id: "3",
    title: "3",
    widgets: <DesignIndustryCard />,
    className: "lg:col-span-5 sm:col-span-5 col-span-12",
  },
  {
    id: "4",
    title: "4",
    widgets: <TeamCard />,
    className: "lg:col-span-5 sm:col-span-7 col-span-12",
  },
  {
    id: "5",
    title: "5",
    widgets: <LogoCard />,
    className: "lg:col-span-4 sm:col-span-6 col-span-12",
  },
  {
    id: "6",
    title: "6",
    widgets: <FontCard />,
    className: "lg:col-span-3 sm:col-span-6 col-span-12",
  },
  {
    id: "8",
    title: "8",
    widgets: <UserTrustCard />,
    className: "lg:col-span-4 sm:col-span-7 col-span-12",
  },
  {
    id: "9",
    title: "9",
    widgets: <CardBalanceCard />,
    className: "lg:col-span-4 sm:col-span-12 col-span-12",
  },
];

function DefaultSwapy() {
  const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
    utils.initSlotItemMap(initialItems, "id")
  );
  const isMobile = useIsMobile();

  const slottedItems = useMemo(
    () => utils.toSlottedItems(initialItems, "id", slotItemMap),
    [slotItemMap]
  );

  return (
    <SwapyLayout
      id="swapy"
      className="w-full"
      config={{
        swapMode: "hover",
        enabled: !isMobile, // Disable on mobile
      }}
      onSwap={(event: { newSlotItemMap: { asArray: any } }) => {
        if (!isMobile) {
          console.log("Swap detected!", event.newSlotItemMap.asArray);
          setSlotItemMap(event.newSlotItemMap.asArray);
        }
      }}
    >
      <div className="grid w-full grid-cols-12 gap-2 md:gap-6 py-4">
        {slottedItems.map(({ slotId, itemId }) => {
          const item = initialItems.find((i) => i.id === itemId);

          return (
            <SwapySlot
              key={slotId}
              className={`swapyItem rounded-lg h-64 ${item?.className}`}
              id={slotId}
            >
              <SwapyItem
                id={itemId}
                className="relative rounded-lg w-full h-full 2xl:text-xl text-sm"
                key={itemId}
              >
                <DragHandle />
                {item?.widgets}
              </SwapyItem>
            </SwapySlot>
          );
        })}
      </div>
    </SwapyLayout>
  );
}

export default DefaultSwapy;
