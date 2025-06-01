"use client";

import React from "react";
import { cn } from "../lib/utils";
import { Dock, DockIcon } from "./magicui/dock";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import ProfileImage from "./ui/ProfileImage";

// Material Icons
import FeaturesIcon from '@mui/icons-material/Stars';
import HowItWorksIcon from '@mui/icons-material/Build';
import PricingIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "#home", icon: HomeIcon, label: "Home" },
    { href: "#features", icon: FeaturesIcon, label: "Features" },
    { href: "#how-it-works", icon: HowItWorksIcon, label: "How it Works" },
    { href: "#pricing", icon: PricingIcon, label: "Pricing" },
  ],
};

export function DockDemo() {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Determine what to show based on current page
  const isHomePage = location.pathname === '/';
  const isRoadmapPage = location.pathname === '/roadmap';
  const isProfilePage = location.pathname === '/profile';

  const renderRightSection = () => {
    if (isHomePage) {
      // Home page: Show theme switch only
      return (
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
      );
    } else if (isRoadmapPage) {
      // Roadmap page: Show user profile picture only (if authenticated)
      if (isAuthenticated && user) {
        return (
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => window.location.href = '/profile'}
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
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        );
      }
      return null;
    } else if (isProfilePage) {
      // Profile page: Show home link + theme switch
      return (
        <>
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => window.location.href = '/'}
                  aria-label="Home"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10"
                  )}
                >
                  <HomeIcon className="md:size-5 size-4 text-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
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
        </>
      );
    }
    
    // Default fallback: show theme switch
    return (
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
    );
  };

  // Only show navigation items on home page
  const showNavigation = isHomePage;

  return (
    <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <TooltipProvider>
        <Dock direction="middle" iconSize={40} iconMagnification={48} className="md:h-[72px] h-[56px] md:px-6 px-3 md:gap-4 gap-2">
          {showNavigation && DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "w-full h-full rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-white/20 dark:border-white/10"
                    )}
                  >
                    <item.icon className="md:size-5 size-4 text-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          {showNavigation && <Separator orientation="vertical" className="h-full py-2" />}
          {renderRightSection()}
        </Dock>
      </TooltipProvider>
    </div>
  );
}