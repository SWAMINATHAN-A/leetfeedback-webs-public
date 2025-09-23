"use client";

import React from "react";
import { cn } from "../lib/utils";
import { Dock, DockIcon } from "./magicui/dock";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "./ui/ProfileImage";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";

// Material Icons
import FeaturesIcon from "@mui/icons-material/Stars";
import HowItWorksIcon from "@mui/icons-material/Build";
import PricingIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import RoadmapIcon from "@mui/icons-material/Map";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "#home", icon: HomeIcon, label: "Home" },
    { href: "#features", icon: FeaturesIcon, label: "Features" },
    { href: "#how-it-works", icon: HowItWorksIcon, label: "How it Works" },
    { href: "/roadmap", icon: RoadmapIcon, label: "Roadmap" },
  ],
};

export function DockDemo() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("/")) {
      navigate(href);
    }
  };

  // Determine what to show based on current page
  const isHomePage = location.pathname === "/";
  const isRoadmapPage = location.pathname === "/roadmap";
  const isProfilePage = location.pathname === "/profile";
  const isStatsPage = location.pathname === "/profile/stats";

  const renderRightSection = () => {
    if (isHomePage) {
      // Home page: Show theme switch only
      return (
        <DockIcon>
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
            )}
          >
            <AnimatedThemeToggler />
          </div>
        </DockIcon>
      );
    } else if (isRoadmapPage) {
      // Roadmap page: Show home link + theme switch (no profile icon)
      return (
        <>
          <DockIcon>
            <button
              onClick={() => (window.location.href = "/")}
              aria-label="Home"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <HomeIcon className="md:size-6 size-5 text-foreground" />
            </button>
          </DockIcon>
          <DockIcon>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}
            >
              <AnimatedThemeToggler />
            </div>
          </DockIcon>
        </>
      );
    } else if (isProfilePage) {
      // Profile page: Show home link + theme switch
      return (
        <>
          <DockIcon>
            <button
              onClick={() => (window.location.href = "/")}
              aria-label="Home"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <HomeIcon className="md:size-6 size-5 text-foreground" />
            </button>
          </DockIcon>
          <DockIcon>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}
            >
              <AnimatedThemeToggler />
            </div>
          </DockIcon>
        </>
      );
    } else if (isStatsPage) {
      // Stats page: Show home link + theme switch
      return (
        <>
          <DockIcon>
            <button
              onClick={() => (window.location.href = "/")}
              aria-label="Home"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <HomeIcon className="md:size-6 size-5 text-foreground" />
            </button>
          </DockIcon>
          <DockIcon>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}
            >
              <AnimatedThemeToggler />
            </div>
          </DockIcon>
        </>
      );
    }

    // Default fallback: show theme switch
    return (
      <DockIcon>
        <div
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "w-full h-full hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
          )}
        >
          <AnimatedThemeToggler />
        </div>
      </DockIcon>
    );
  };

  // Only show navigation items on home page
  const showNavigation = isHomePage;

  return (
    <div 
      className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      style={{ zIndex: 100 }}
    >
      <Dock
        direction="middle"
        iconSize={48}
        iconMagnification={60}
        className="md:h-[80px] h-[64px]"
      >
        {showNavigation &&
          DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <button
                onClick={() => scrollToSection(item.href)}
                aria-label={item.label}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "w-full h-full hover:bg-white/10 dark:hover:bg-black/10"
                )}
              >
                <item.icon className="md:size-6 size-5 text-foreground" />
              </button>
            </DockIcon>
          ))}
        {showNavigation && (
          <Separator orientation="vertical" className="h-full py-2" />
        )}
        {renderRightSection()}
      </Dock>
    </div>
  );
}
