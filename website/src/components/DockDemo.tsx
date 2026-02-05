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
import HomeIcon from "@mui/icons-material/Home";
import RoadmapIcon from "@mui/icons-material/Map";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "#home", icon: HomeIcon, label: "Home" },
    { href: "/profile/stats", icon: AnalyticsIcon, label: "Stats" },
    { href: "/roadmap", icon: RoadmapIcon, label: "Roadmap" },
    { href: "/problems", icon: MenuBookIcon, label: "Problems" },
  ],
};

export const DockDemo = React.memo(function DockDemo() {
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

  // Determine what to show based on current page and device
  const isHomePage = location.pathname === "/";
  const isRoadmapPage = location.pathname === "/roadmap";
  const isProfilePage = location.pathname === "/profile";
  const isStatsPage = location.pathname === "/profile/stats";
  const isDownloadsPage = location.pathname === "/downloads";
  const isProblemsPage = location.pathname === "/problems";
  const isGuidePage = location.pathname === "/guide";

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderRightSection = () => {
    if (isMobile) {
      // Mobile: Always show home, roadmap, problems, and theme
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
            <button
              onClick={() => startNavigation("/roadmap")}
              aria-label="Roadmap"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <RoadmapIcon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
            </button>
          </DockIcon>
          <DockIcon>
            <button
              onClick={() => startNavigation("/problems")}
              aria-label="Problems"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-full h-full hover:bg-white/20 dark:hover:bg-black/20"
              )}
            >
              <MenuBookIcon className="w-6 h-6 md:w-7 md:h-7 text-foreground" />
            </button>
          </DockIcon>
          <DockIcon>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}
            >
              <AnimatedThemeToggler />
            </div>
          </DockIcon>
        </>
      );
    }

    if (isHomePage) {
      // Desktop Home page: Show theme switch only
      return (
        <DockIcon>
          <div
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
            )}
          >
            <AnimatedThemeToggler />
          </div>
        </DockIcon>
      );
    } else if (isRoadmapPage) {
      // Desktop Roadmap page: Show home link + theme switch (no profile icon)
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
                "hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}
            >
              <AnimatedThemeToggler />
            </div>
          </DockIcon>
        </>
      );
    } else if (isProfilePage) {
      // Desktop Profile page: Show home link + theme switch
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
                "hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
              )}
            >
              <AnimatedThemeToggler />
            </div>
          </DockIcon>
        </>
      );
    } else if (isStatsPage) {
      // Desktop Stats page: Show home link + theme switch
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
    } else if (isDownloadsPage || isProblemsPage || isGuidePage) {
      // Desktop Downloads/Problems/Guide pages: Show home link + theme switch
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

    // Default fallback: show home + theme switch
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
              "hover:bg-white/20 dark:hover:bg-black/20 flex items-center justify-center"
            )}
          >
            <AnimatedThemeToggler />
          </div>
        </DockIcon>
      </>
    );
  };

  // Only show navigation items on home page and desktop
  const showNavigation = isHomePage && !isMobile;

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
      className="fixed bottom-4 md:bottom-8 left-0 right-0 flex justify-center"
      style={{
        zIndex: 100,
        willChange: "auto",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
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
          <Separator orientation="vertical" className="h-full mx-2" />
        )}
        {renderRightSection()}
      </Dock>
    </motion.div>
  );
});
