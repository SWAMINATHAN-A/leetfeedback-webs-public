"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LampContainer } from "@/components/ui/lamp";
import { Timeline } from "@/components/ui/timeline";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import ProfileImage from "@/components/ui/ProfileImage";
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
        description: "Push code to LeetCode and GeeksforGeeks platforms with basic tracking functionality",
        completed: true,
        icon: CodeIcon
    },
    {
        id: 2,
        title: "Extension Popup Interface",
        description: "Develop user-friendly popup interface for settings and quick access to features",
        completed: true,
        icon: ExtensionIcon
    },
    {
        id: 3,
        title: "AI-Powered Mistake Tracking & Analysis",
        description: "Implement AI pattern recognition for coding mistakes with automated GitHub analysis reports - backend work after this will be smooth sailing",
        completed: false,
        milestone: "Public Beta Launch",
        icon: PsychologyIcon
    },
    {
        id: 4,
        title: "ANKI Flash Cards Integration",
        description: "Auto-generate study flash cards from solved problems and common mistake patterns",
        completed: false,
        icon: StyleIcon
    },
    {
        id: 5,
        title: "Notion Workspace Integration",
        description: "Sync practice sessions, analytics, and progress reports directly to Notion databases",
        completed: false,
        icon: IntegrationInstructionsIcon
    },
    {
        id: 6,
        title: "Performance Analytics Dashboard",
        description: "Comprehensive web dashboard with detailed insights, progress tracking, and performance metrics",
        completed: false,
        icon: AnalyticsIcon
    },
    {
        id: 7,
        title: "Achievement System & Gamification",
        description: "Unlock achievements, streaks, and badges to motivate consistent practice habits",
        completed: false,
        icon: EmojiEventsIcon
    },
    {
        id: 8,
        title: "Privacy & Security Features",
        description: "Implement data encryption, anonymization, and GDPR compliance for user data protection",
        completed: false,
        milestone: "Public Release",
        icon: SecurityIcon
    },
    {
        id: 9,
        title: "Extended Platform Support",
        description: "Add support for TUF+, CodeChef, HackerRank, Codeforces, and other popular platforms",
        completed: false,
        icon: DevicesIcon
    },
    {
        id: 10,
        title: "Mobile Companion App",
        description: "Cross-platform mobile app for viewing analytics and progress on the go",
        completed: false,
        icon: PhoneAndroidIcon
    },
    {
        id: 11,
        title: "Team & Organization Features",
        description: "Enable team analytics, progress comparison, and organizational dashboards for coding bootcamps",
        completed: false,
        icon: GroupsIcon
    },
];

const RoadmapPage: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();
    const { user, isAuthenticated } = useAuth();

    // Transform roadmap items to timeline data format
    const timelineData = roadmapItems.map((item, index) => ({
        title: `Phase ${item.id}`,
        content: (
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        {item.icon && (
                            <div className={cn(
                                "w-12 h-12 rounded-lg flex items-center justify-center border-2",
                                item.completed
                                    ? "bg-foreground text-background border-foreground"
                                    : "bg-background text-foreground border-foreground"
                            )}>
                                <item.icon className="w-6 h-6" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <h3 className={cn(
                                "text-xl font-bold",
                                item.completed
                                    ? "text-foreground line-through"
                                    : "text-foreground"
                            )}>
                                {item.title}
                            </h3>

                            {item.completed ? (
                                <CheckCircleIcon className="w-5 h-5 text-foreground" />
                            ) : (
                                <RadioButtonUncheckedIcon className="w-5 h-5 text-muted-foreground" />
                            )}

                            {item.milestone && (
                                <span className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded-full border border-foreground">
                                    {item.milestone}
                                </span>
                            )}
                        </div>

                        <p className={cn(
                            "text-base leading-relaxed",
                            item.completed
                                ? "text-muted-foreground line-through"
                                : "text-muted-foreground"
                        )}>
                            {item.description}
                        </p>

                        <div className="flex items-center gap-2">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                item.completed ? "bg-foreground" : "bg-muted-foreground"
                            )} />
                            <span className="text-xs text-muted-foreground font-medium">
                                {item.completed ? "Completed" : "In Development"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        ),
    }));

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

            {/* Timeline Section */}
            <div className="bg-background">
                <Timeline data={timelineData} />

                {/* Call to Action Section */}
                <div className="max-w-4xl mx-auto px-4 pb-20">
                    <div className="relative bg-card border-2 border-foreground rounded-lg p-8 shadow-2xl">
                        <h4 className="text-2xl font-semibold text-foreground mb-3 font-mono">Join Our Journey</h4>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-mono">
                            Looking for developers to contribute code and testers to help shape the future of LeetFeedback.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => window.location.href = "mailto:catinice@outlook.com"}
                                className="bg-foreground text-background px-6 py-3 rounded-lg font-medium hover:bg-foreground/90 transition-colors border-2 border-foreground font-mono"
                            >
                                Join Our Team
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dock Navigation */}
            <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <TooltipProvider>
                    <Dock direction="middle" iconSize={40} iconMagnification={48} className="md:h-[72px] h-[56px] md:px-6 px-3 md:gap-4 gap-2">
                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href="/"
                                        aria-label="Home"
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10"
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
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10"
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

                        {isAuthenticated && user && (
                            <DockIcon>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href="/profile"
                                            aria-label="Profile"
                                            className={cn(
                                                buttonVariants({ variant: "ghost", size: "icon" }),
                                                "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10 p-1"
                                            )}
                                        >
                                            <ProfileImage
                                                src={user.photoURL}
                                                alt={user.displayName || "User"}
                                                size="sm"
                                                className="w-full h-full border-0"
                                            />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Profile</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        )}
                    </Dock>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default RoadmapPage;
