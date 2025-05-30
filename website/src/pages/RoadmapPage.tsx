"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button, buttonVariants } from "@/components/ui/button"; // Assuming buttonVariants is needed for DockIcon styling
import { useTheme } from "@/contexts/ThemeContext"; // Assuming ThemeContext is available
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const RoadmapPage: React.FC = () => {
    const { isDark, toggleTheme } = useTheme(); // Access theme context

    return (
        <div className="min-h-screen bg-background grid-pattern"> {/* Added background styling */}
            {/* Placeholder for Navbar - you'd typically use a routing solution here */}
            {/* For now, this page will just have the background and dock */}

            <main className="container mx-auto px-4 md:px-8 py-24">
                {/* Empty content area for the roadmap details */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foreground">Roadmap</h1>
                    <p className="text-muted-foreground mt-4">Details about our upcoming features and plans will be shared here soon.</p>
                </div>
            </main>

            {/* Minimal Dock */}
            <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <TooltipProvider>
                    <Dock direction="middle" iconSize={40} iconMagnification={48} className="md:h-[72px] h-[56px] md:px-6 px-3 md:gap-4 gap-2">
                        {/* GitHub Icon */}
                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a
                                        href="https://github.com/lqSky7/LeetFeedback"
                                        target="_blank" // Open in new tab
                                        rel="noopener noreferrer" // Security best practice
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

                        {/* Theme Switch Icon */}
                        <DockIcon>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={toggleTheme}
                                        aria-label="Toggle Theme"
                                        className={cn(
                                          buttonVariants({ variant: "ghost", size: "icon" }),
                                          "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10"
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