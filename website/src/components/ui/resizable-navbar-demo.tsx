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
import { useState } from "react";
import { Badge } from "./badge";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PlatformIcon from "../PlatformIcon";
import { useAuth } from "../../contexts/AuthContext";
import SignInModal from "./SignInModal";
import SimpleUserMenu from "./SimpleUserMenu";
import LogoNoBackground from "@/assets/icons/LogoNoBackground.svg";

export function ResizableNavbarDemo() {
  const navItems = [];
  const { isAuthenticated, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const handleSignInClick = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center space-x-3">
            <img
              src={LogoNoBackground}
              alt="Traverse Logo"
              className="h-8 w-auto"
            />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold mono">Traverse</span>
              <Badge
                variant="outline"
                className="text-xs font-mono bg-muted/50"
              >
                Beta
              </Badge>
            </div>
          </div>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
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
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <SimpleUserMenu />
              ) : (
                <NavbarButton
                  variant="secondary"
                  onClick={handleSignInClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </NavbarButton>
              )}
              <NavbarButton
                variant="primary"
                onClick={() => (window.location.href = "/roadmap")}
              >
                Roadmap
              </NavbarButton>
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center space-x-3">
              <img
                src={LogoNoBackground}
                alt="Traverse Logo"
                className="h-8 w-auto"
              />
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold mono">Traverse</span>
                <Badge
                  variant="outline"
                  className="text-xs font-mono bg-muted/50"
                >
                  Beta
                </Badge>
              </div>
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
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignInClick();
                  }}
                  variant="secondary"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </NavbarButton>
              )}

              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = "/roadmap";
                }}
                variant="primary"
                className="w-full"
              >
                Roadmap
              </NavbarButton>
            </div>
          </MobileNavExpandableContent>
        </MobileNav>
      </Navbar>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />
    </div>
  );
}
