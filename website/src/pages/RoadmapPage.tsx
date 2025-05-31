"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CodeIcon from "@mui/icons-material/Code";
import ExtensionIcon from "@mui/icons-material/Extension";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StyleIcon from "@mui/icons-material/Style";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GroupsIcon from "@mui/icons-material/Groups";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HomeIcon from "@mui/icons-material/Home";
import ScienceIcon from "@mui/icons-material/Science";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AnimatedButton from "@/components/ui/animated-button";

interface RoadmapItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    milestone?: string;
    icon?: React.ComponentType<any>;
}

const roadmapItems: RoadmapItem[] = [
    {
        id: 1,
        title: "Initial Implementation and Testing",
        description:
            "Push code to LeetCode and GeeksforGeeks platforms with basic tracking functionality",
        completed: true,
        icon: CodeIcon,
    },
    {
        id: 2,
        title: "Extension Popup Interface",
        description:
            "Develop user-friendly popup interface for settings and quick access to features",
        completed: true,
        icon: ExtensionIcon,
    },
    {
        id: 3,
        title: "AI-Powered Mistake Tracking & Analysis",
        description:
            "Implement AI pattern recognition for coding mistakes with automated GitHub analysis reports",
        completed: false,
        milestone: "Public Beta Launch",
        icon: PsychologyIcon,
    },
    {
        id: 4,
        title: "ANKI Flash Cards Integration",
        description:
            "Auto-generate study flash cards from solved problems and common mistake patterns",
        completed: false,
        icon: StyleIcon,
    },
    {
        id: 5,
        title: "Notion Workspace Integration",
        description:
            "Sync practice sessions, analytics, and progress reports directly to Notion databases",
        completed: false,
        icon: IntegrationInstructionsIcon,
    },
    {
        id: 6,
        title: "Performance Analytics Dashboard",
        description:
            "Comprehensive web dashboard with detailed insights, progress tracking, and performance metrics",
        completed: false,
        icon: AnalyticsIcon,
    },
    {
        id: 7,
        title: "Achievement System & Gamification",
        description:
            "Unlock achievements, streaks, and badges to motivate consistent practice habits",
        completed: false,
        icon: EmojiEventsIcon,
    },
    {
        id: 8,
        title: "Privacy & Security Features",
        description:
            "Implement data encryption, anonymization, and GDPR compliance for user data protection",
        completed: false,
        icon: SecurityIcon,
    },
    {
        id: 9,
        title: "Extended Platform Support",
        description:
            "Add support for TUF+, CodeChef, HackerRank, Codeforces, and other popular platforms",
        completed: false,
        icon: DevicesIcon,
    },
    {
        id: 10,
        title: "Mobile Companion App",
        description:
            "Cross-platform mobile app for viewing analytics and progress on the go",
        completed: false,
        icon: PhoneAndroidIcon,
    },
    {
        id: 11,
        title: "Team & Organization Features",
        description:
            "Enable team analytics, progress comparison, and organizational dashboards for coding bootcamps",
        completed: false,
        milestone: "Public Release",
        icon: GroupsIcon,
    },
];

const RoadmapPage: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-background">
            {/* Lamp Effect Section with Roadmap Heading */}
            <LampContainer className="pb-0">
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Roadmap
                </motion.h1>
            </LampContainer>

            {/* Roadmap Content Section */}
            <div className="relative bg-slate-950 min-h-screen flex flex-col items-center justify-start pt-20 pb-32">
                {/* Roadmap Content */}
                <div className="relative z-20 max-w-4xl mx-auto pl-8 pr-6 md:pl-16 md:pr-8">
                    {/* Bright Neon Laser Line - Left of Cards */}
                    <div className="absolute left-2 md:left-4 top-20 bottom-20">
                        {/* Main white laser line with enhanced glow */}
                        <div className="relative w-1 h-full bg-gradient-to-b from-white via-gray-100 to-white rounded-full shadow-[0_0_40px_rgba(255,255,255,1),0_0_20px_rgba(255,255,255,0.8),0_0_10px_rgba(255,255,255,0.6)]" />

                        {/* Small white particles near the line */}
                        <div className="absolute top-0 w-full h-full">
                            {/* Left side particles */}
                            <div className="absolute top-[87%] -left-2 w-0.5 h-0.5 bg-white rounded-full" />

                            {/* Concentrated particles at start */}
                            <div className="absolute top-[1%] -left-1 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[2%] -left-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[3%] -left-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[4%] -left-3 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[5%] -left-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[6%] -left-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[7%] -left-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[8%] -left-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[9%] -left-3 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[10%] -left-1 w-0.5 h-0.5 bg-white rounded-full" />

                            {/* Rest of particles */}
                            <div className="absolute top-[11%] -left-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[17%] -left-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[26%] -left-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[33%] -left-2.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[41%] -left-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[49%] -left-2 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[57%] -left-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[65%] -left-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[73%] -left-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[6%] -left-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[11%] -left-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[17%] -left-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[26%] -left-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[33%] -left-2.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[41%] -left-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[49%] -left-2 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[57%] -left-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[65%] -left-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[73%] -left-1 w-px h-px bg-white rounded-full" />

                            {/* Right side particles */}
                            <div className="absolute top-[12%] -right-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[19%] -right-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[27%] -right-2 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[35%] -right-1 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[43%] -right-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[51%] -right-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[59%] -right-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[67%] -right-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[75%] -right-2 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[83%] -right-1 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[91%] -right-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[9%] -right-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[14%] -right-1 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[22%] -right-2 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[29%] -right-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[37%] -right-2.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[45%] -right-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[53%] -right-2 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[61%] -right-1.5 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[69%] -right-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[77%] -right-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[85%] -right-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[93%] -right-1.5 w-px h-px bg-white rounded-full" />

                            {/* Concentrated particles at start - right side */}
                            <div className="absolute top-[1%] -right-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[2%] -right-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[3%] -right-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[4%] -right-3 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[5%] -right-1 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[6%] -right-2.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[7%] -right-2 w-0.5 h-0.5 bg-white rounded-full" />
                            <div className="absolute top-[8%] -right-1.5 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[9%] -right-3 w-px h-px bg-white rounded-full" />
                            <div className="absolute top-[10%] -right-1 w-0.5 h-0.5 bg-white rounded-full" />
                        </div>

                        {/* Rainbow halos - concentrated at start and throughout */}
                        {/* Start point concentration */}
                        <div className="absolute top-[2%] left-0 w-3 h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full opacity-80 blur-md" />
                        <div className="absolute top-[3%] -left-4 w-2 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full opacity-70 blur-sm" />
                        <div className="absolute top-[4%] -right-3 w-2.5 h-2.5 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 rounded-full opacity-75 blur-md" />
                        <div className="absolute top-[5%] -left-2 w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-full opacity-60 blur-sm" />
                        <div className="absolute top-[6%] -right-4 w-2 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full opacity-65 blur-sm" />
                        <div className="absolute top-[7%] left-1 w-1 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full opacity-70 blur-sm" />

                        {/* Throughout the laser */}
                        <div className="absolute top-[15%] -left-3 w-2 h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full opacity-60 blur-sm" />
                        <div className="absolute top-[20%] -right-3.5 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full opacity-50 blur-sm" />
                        <div className="absolute top-[25%] -left-2.5 w-1 h-1 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 rounded-full opacity-70 blur-sm" />
                        <div className="absolute top-[30%] -right-2.5 w-2 h-2 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 rounded-full opacity-40 blur-sm" />
                        <div className="absolute top-[35%] -left-4 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 rounded-full opacity-55 blur-sm" />
                        <div className="absolute top-[40%] -right-3 w-2 h-2 bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 rounded-full opacity-65 blur-sm" />
                        <div className="absolute top-[45%] -left-3 w-1 h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 rounded-full opacity-50 blur-sm" />
                        <div className="absolute top-[50%] -right-2 w-1.5 h-1.5 bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 rounded-full opacity-60 blur-sm" />
                        <div className="absolute top-[55%] -left-3.5 w-2 h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full opacity-45 blur-sm" />
                        <div className="absolute top-[60%] -right-4 w-1 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-full opacity-70 blur-sm" />
                        <div className="absolute top-[65%] -left-2 w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full opacity-55 blur-sm" />
                        <div className="absolute top-[70%] -right-3 w-2 h-2 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 rounded-full opacity-60 blur-sm" />
                        <div className="absolute top-[75%] -left-4 w-1 h-1 bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 rounded-full opacity-50 blur-sm" />
                        <div className="absolute top-[80%] -right-2.5 w-1.5 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-65 blur-sm" />
                        <div className="absolute top-[85%] -left-3 w-2 h-2 bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 rounded-full opacity-40 blur-sm" />
                        <div className="absolute top-[90%] -right-3.5 w-1 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full opacity-75 blur-sm" />
                        <div className="absolute top-[95%] -left-2.5 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-55 blur-sm" />
                    </div>
                    <BlurFade delay={0.5} className="text-center mb-16">
                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed font-mono">
                            Our journey to revolutionize DSA practice with
                            AI-powered insights and comprehensive analytics
                        </p>
                    </BlurFade>

                    {/* Roadmap Items */}
                    <div className="space-y-6">
                        {roadmapItems.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <BlurFade
                                    key={item.id}
                                    delay={0.1 * index}
                                    direction="right"
                                >
                                    <div
                                        className={cn(
                                            "relative bg-black/80 border border-white/20 rounded-lg p-4 md:p-6 hover:shadow-lg transition-all duration-300",
                                            item.completed && "opacity-70",
                                        )}
                                    >
                                        {/* Rainbow halos - laser reflection effect */}
                                        {index % 3 === 0 && (
                                            <>
                                                {/* Border reflection halos */}
                                                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full opacity-25 blur-sm">
                                                    <div className="absolute inset-0 bg-red-400 rounded-full opacity-70"></div>
                                                    <div className="absolute inset-0.5 bg-orange-400 rounded-full opacity-55"></div>
                                                    <div className="absolute inset-1 bg-yellow-400 rounded-full opacity-40"></div>
                                                </div>
                                                <div className="absolute -bottom-1 left-0 w-1.5 h-1.5 rounded-full opacity-30 blur-sm">
                                                    <div className="absolute inset-0 bg-blue-400 rounded-full opacity-65"></div>
                                                    <div className="absolute inset-0.5 bg-purple-400 rounded-full opacity-50"></div>
                                                    <div className="absolute inset-1 bg-pink-400 rounded-full opacity-35"></div>
                                                </div>
                                                {/* Interior halos */}
                                                <div className="absolute top-1/4 left-3 w-2 h-2 rounded-full opacity-20 blur-sm">
                                                    <div className="absolute inset-0 bg-green-400 rounded-full opacity-60"></div>
                                                    <div className="absolute inset-0.5 bg-cyan-400 rounded-full opacity-45"></div>
                                                    <div className="absolute inset-1 bg-blue-400 rounded-full opacity-30"></div>
                                                </div>
                                                <div className="absolute bottom-1/3 left-1 w-1.5 h-1.5 rounded-full opacity-25 blur-sm">
                                                    <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-65"></div>
                                                    <div className="absolute inset-0.5 bg-green-400 rounded-full opacity-50"></div>
                                                    <div className="absolute inset-1 bg-cyan-400 rounded-full opacity-35"></div>
                                                </div>
                                            </>
                                        )}
                                        {index % 3 === 1 && (
                                            <>
                                                {/* Border reflection halos */}
                                                <div className="absolute top-0 -left-1 w-2.5 h-2.5 rounded-full opacity-25 blur-sm">
                                                    <div className="absolute inset-0 bg-purple-400 rounded-full opacity-70"></div>
                                                    <div className="absolute inset-0.5 bg-pink-400 rounded-full opacity-55"></div>
                                                    <div className="absolute inset-1 bg-red-400 rounded-full opacity-40"></div>
                                                </div>
                                                <div className="absolute -bottom-1 -left-2 w-1.5 h-1.5 rounded-full opacity-30 blur-sm">
                                                    <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-65"></div>
                                                    <div className="absolute inset-0.5 bg-blue-400 rounded-full opacity-50"></div>
                                                    <div className="absolute inset-1 bg-green-400 rounded-full opacity-35"></div>
                                                </div>
                                                {/* Interior halos */}
                                                <div className="absolute top-1/3 left-2 w-2 h-2 rounded-full opacity-20 blur-sm">
                                                    <div className="absolute inset-0 bg-orange-400 rounded-full opacity-60"></div>
                                                    <div className="absolute inset-0.5 bg-yellow-400 rounded-full opacity-45"></div>
                                                    <div className="absolute inset-1 bg-green-400 rounded-full opacity-30"></div>
                                                </div>
                                            </>
                                        )}
                                        {index % 3 === 2 && (
                                            <>
                                                {/* Border reflection halos */}
                                                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full opacity-25 blur-sm">
                                                    <div className="absolute inset-0 bg-green-400 rounded-full opacity-70"></div>
                                                    <div className="absolute inset-0.5 bg-yellow-400 rounded-full opacity-55"></div>
                                                    <div className="absolute inset-1 bg-orange-400 rounded-full opacity-40"></div>
                                                </div>
                                                <div className="absolute bottom-0 -left-1 w-1.5 h-1.5 rounded-full opacity-30 blur-sm">
                                                    <div className="absolute inset-0 bg-pink-400 rounded-full opacity-65"></div>
                                                    <div className="absolute inset-0.5 bg-purple-400 rounded-full opacity-50"></div>
                                                    <div className="absolute inset-1 bg-blue-400 rounded-full opacity-35"></div>
                                                </div>
                                                {/* Interior halos */}
                                                <div className="absolute top-1/2 left-1 w-2.5 h-2.5 rounded-full opacity-20 blur-sm">
                                                    <div className="absolute inset-0 bg-cyan-400 rounded-full opacity-60"></div>
                                                    <div className="absolute inset-0.5 bg-blue-400 rounded-full opacity-45"></div>
                                                    <div className="absolute inset-1 bg-purple-400 rounded-full opacity-30"></div>
                                                </div>
                                                <div className="absolute bottom-1/4 left-3 w-1.5 h-1.5 rounded-full opacity-25 blur-sm">
                                                    <div className="absolute inset-0 bg-red-400 rounded-full opacity-65"></div>
                                                    <div className="absolute inset-0.5 bg-orange-400 rounded-full opacity-50"></div>
                                                    <div className="absolute inset-1 bg-yellow-400 rounded-full opacity-35"></div>
                                                </div>
                                            </>
                                        )}

                                        {/* Milestone Badge */}
                                        {item.milestone && (
                                            <div className="absolute -top-2 left-4">
                                                <span className="bg-white text-black text-[10px] font-medium px-1.5 py-0.5 rounded-md shadow-sm border border-white/20 flex items-center gap-1 whitespace-nowrap">
                                                    {item.milestone ===
                                                        "Public Beta Launch" && (
                                                        <ScienceIcon className="w-2 h-2" />
                                                    )}
                                                    {item.milestone ===
                                                        "Public Release" && (
                                                        <RocketLaunchIcon className="w-2 h-2" />
                                                    )}
                                                    {item.milestone}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-start md:space-x-4">
                                            {/* Icon and Number - Hidden on mobile */}
                                            <div className="hidden md:flex flex-shrink-0 items-center space-x-3">
                                                <div className="relative">
                                                    {IconComponent && (
                                                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                                                            <IconComponent
                                                                className={cn(
                                                                    "w-6 h-6",
                                                                    item.completed
                                                                        ? "text-white/50"
                                                                        : "text-white",
                                                                )}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2",
                                                        item.completed
                                                            ? "bg-white/20 text-white/50 border-white/30"
                                                            : "bg-white text-black border-white",
                                                    )}
                                                >
                                                    {item.id}
                                                </div>
                                                <div className="hidden md:block">
                                                    {item.completed ? (
                                                        <CheckCircleIcon className="w-5 h-5 text-white/50" />
                                                    ) : (
                                                        <RadioButtonUncheckedIcon className="w-5 h-5 text-white/70" />
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 w-full">
                                                <h3
                                                    className={cn(
                                                        "text-xl font-semibold mb-2 font-mono",
                                                        item.completed
                                                            ? "text-white/50 line-through"
                                                            : "text-white",
                                                    )}
                                                >
                                                    {item.title}
                                                </h3>
                                                <p
                                                    className={cn(
                                                        "leading-relaxed font-mono",
                                                        item.completed
                                                            ? "text-white/40 line-through"
                                                            : "text-white/70",
                                                    )}
                                                >
                                                    {item.description}
                                                </p>

                                                {!item.completed && (
                                                    <div className="flex items-center space-x-2 mt-3">
                                                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                                                        <span className="text-xs text-white/50 font-medium font-mono">
                                                            In Development
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </BlurFade>
                            );
                        })}
                    </div>

                    {/* Final Note */}
                    <BlurFade delay={1} className="text-center mt-16">
                        <div className="relative bg-black/80 border border-white/20 rounded-lg p-8 shadow-lg">
                            {/* Rainbow halos */}
                            <div className="absolute -top-2 left-1/4 w-3 h-3 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full opacity-25"></div>
                            <div className="absolute -bottom-1 right-1/3 w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-35"></div>
                            <div className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"></div>

                            <h4 className="text-2xl font-semibold text-white mb-3">
                                Join Our Journey
                            </h4>
                            <p className="text-white/70 text-lg leading-relaxed mb-6">
                                Looking for developers to contribute code and
                                testers to help shape the future of
                                LeetFeedback.
                            </p>
                            <div className="flex justify-center">
                                <AnimatedButton onClick={() => window.location.href = 'mailto:catinice@outlook.com'}>
                                    Join Our Team
                                </AnimatedButton>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Dock Navigation */}
            <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <TooltipProvider>
                    <Dock
                        direction="middle"
                        iconSize={40}
                        iconMagnification={48}
                        className="md:h-[72px] h-[56px] md:px-6 px-3 md:gap-4 gap-2"
                    >
                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href="/"
                                        aria-label="Home"
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            }),
                                            "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10",
                                        )}
                                    >
                                        <HomeIcon className="md:size-5 size-4 text-foreground" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Home</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>

                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href="https://github.com/lqSky7/LeetFeedback"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub Repository"
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            }),
                                            "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10",
                                        )}
                                    >
                                        <GitHubIcon className="md:size-5 size-4 text-foreground" />
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>GitHub Repository</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>

                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={toggleTheme}
                                        aria-label="Toggle Theme"
                                        className={cn(
                                            buttonVariants({
                                                variant: "ghost",
                                                size: "icon",
                                            }),
                                            "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10",
                                        )}
                                    >
                                        {isDark ? (
                                            <LightModeIcon className="md:size-5 size-4 text-foreground" />
                                        ) : (
                                            <DarkModeIcon className="md:size-5 size-4 text-foreground" />
                                        )}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Toggle Theme</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    </Dock>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default RoadmapPage;
