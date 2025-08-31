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
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";

// Material Icons
import FeaturesIcon from '@mui/icons-material/Stars';
import HowItWorksIcon from '@mui/icons-material/Build';
import PricingIcon from '@mui/icons-material/AttachMoney';
import HomeIcon from '@mui/icons-material/Home';

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
              <div className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}>
                <AnimatedThemeToggler className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      );
    } else if (isRoadmapPage) {
      // Roadmap page: Show home link + theme switch + profile (if authenticated)
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
                    "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
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
                <div className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
                )}>
                  <AnimatedThemeToggler className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          {isAuthenticated && user && (
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => window.location.href = '/profile'}
                    aria-label="Profile"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 p-1"
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
          )}
        </>
      );
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
                    "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
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
                <div className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
                )}>
                  <AnimatedThemeToggler className="w-5 h-5 md:w-6 md:h-6" />
                </div>
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
            <div className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
            )}>
              <AnimatedThemeToggler className="w-5 h-5 md:w-6 md:h-6" />
            </div>
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
        <Dock direction="middle" iconSize={48} iconMagnification={60} className="md:h-[80px] h-[64px]">
          {showNavigation && DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "w-full h-full hover:bg-white/10 dark:hover:bg-black/10"
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