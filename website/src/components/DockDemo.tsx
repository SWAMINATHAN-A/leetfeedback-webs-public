"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { Dock, DockIcon } from "./magicui/dock";
import { Button, buttonVariants } from "./ui/button";
import { Separator } from "./ui/separator";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "../contexts/NavigationContext";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "./ui/ProfileImage";
import { AnimatedThemeToggler } from "./magicui/animated-theme-toggler";
import { smoothScrollToElement } from "../utils/smoothScroll";

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
  const { startNavigation, isNavigating } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      // Use anime.js smooth scroll for anchor links
      smoothScrollToElement(href, 800, "easeInOutCubic");
    } else if (href.startsWith("/")) {
      // Use navigation island for internal links
      startNavigation(href);
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
              onClick={() => startNavigation("/")}
              aria-label="Home"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <HomeIcon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
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
              onClick={() => startNavigation("/")}
              aria-label="Home"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <HomeIcon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
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
              onClick={() => startNavigation("/")}
              aria-label="Home"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <HomeIcon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
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

  // Don't render if navigation is in progress
  if (isNavigating) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 20, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed bottom-4 md:bottom-8 left-1/2 hidden md:block"
      style={{
        zIndex: 100,
        x: "-50%",
      }}
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
    </motion.div>
  );
}
