"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavExpandableContent,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { AnimatedClipButton } from "@/components/ui/animated-clip-button";
import { useState } from "react";
import { Badge } from "./badge";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PlatformIcon from "../PlatformIcon";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "../../contexts/NavigationContext";
import SimpleUserMenu from "./SimpleUserMenu";

export function ResizableNavbarDemo() {
  const navItems = [];
  const { isAuthenticated, isLoading } = useAuth();
  const { isSignInIslandOpen, openSignInIsland } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignInClick = () => {
    openSignInIsland();
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center space-x-3">
            <img
              src="/navbar.svg"
              alt="Traverse Logo"
              className="h-8 w-auto dark:hidden"
            />
            <img
              src="/navbar-dark.svg"
              alt="Traverse Logo"
              className="h-8 w-auto hidden dark:block"
            />
            <span className="text-2xl font-semibold" style={{ fontFamily: "'Belisa Plumilla Manual', cursive" }}>Traverse</span>
          </div>
          <NavItems items={navItems} />
          <div className="flex items-center">
            <div className="flex items-center space-x-4 pl-4 border-l border-border">
              <PlatformIcon
                platform="leetcode"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="geeksforgeeks"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="hackerrank"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="codechef"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="tufplus"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="h-6 w-px bg-border mx-2"></div>
            <div className="flex items-center gap-3 flex-1">
              {isAuthenticated ? (
                <SimpleUserMenu />
              ) : (
                <AnimatedClipButton
                  text={isLoading ? "Loading..." : "Sign In"}
                  variant="default"
                  size="default"
                  onClick={handleSignInClick}
                  disabled={isLoading}
                  className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                />
              )}
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center space-x-3">
              <img
                src="/navbar.svg"
                alt="Traverse Logo"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/navbar-dark.svg"
                alt="Traverse Logo"
                className="h-8 w-auto hidden dark:block"
              />
              <span className="text-2xl font-semibold" style={{ fontFamily: "'Belisa Plumilla Manual', cursive" }}>Traverse</span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavExpandableContent isExpanded={isMobileMenuOpen}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex items-center justify-center space-x-4 py-4 border-y border-border w-full">
              <PlatformIcon
                platform="leetcode"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="geeksforgeeks"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="hackerrank"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="codechef"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
              <PlatformIcon
                platform="tufplus"
                size="sm"
                className="opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex w-full flex-col gap-3 px-4">
              {isAuthenticated ? (
                <SimpleUserMenu />
              ) : (
                <AnimatedClipButton
                  text={isLoading ? "Loading..." : "Sign In"}
                  variant="default"
                  size="default"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignInClick();
                  }}
                  disabled={isLoading}
                  className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                />
              )}
            </div>
          </MobileNavExpandableContent>
        </MobileNav>
      </Navbar>
    </div>
  );
}
