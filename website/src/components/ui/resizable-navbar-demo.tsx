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
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "../../contexts/NavigationContext";
import SimpleUserMenu from "./SimpleUserMenu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export function ResizableNavbarDemo() {
  const navItems = [
    { name: "Downloads", link: "/downloads" },
    { name: "Pricing", link: "#pricing" },
    { name: "Support Us", link: "#pricing" },
    { name: "Our Inspiration", link: "https://www.thebrowser.company/values" },
  ];
  const { isAuthenticated, isLoading } = useAuth();
  const { isSignInIslandOpen, openSignInIsland } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignInClick = () => {
    openSignInIsland();
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Simple overflow lock - don't use position:fixed as it breaks sticky navbar
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center space-x-3">
            <img
              src="/logo.svg"
              alt="Traverse Logo"
              className="h-8 w-auto dark:invert"
            />
            <span className="text-2xl font-semibold">Traverse</span>
          </div>
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
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
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center space-x-3">
              <img
                src="/logo.svg"
                alt="Traverse Logo"
                className="h-8 w-auto dark:invert"
              />
              <span className="text-2xl font-semibold">Traverse</span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavExpandableContent isExpanded={isMobileMenuOpen}>
            {/* Menu Items - Craft Style */}
            <div className="flex flex-col w-full divide-y divide-neutral-200 dark:divide-neutral-700">
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 px-2 text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
                >
                  <span>{item.name}</span>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-400" />
                </a>
              ))}
            </div>

            {/* Sign In / User Section */}
            <div className="flex w-full flex-col gap-3 pt-4">
              {isAuthenticated ? (
                <SimpleUserMenu />
              ) : (
                <>
                  <AnimatedClipButton
                    text={isLoading ? "Loading..." : "Try Traverse Free"}
                    variant="default"
                    size="default"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignInClick();
                    }}
                    disabled={isLoading}
                    className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 py-4 text-base font-semibold"
                  />
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignInClick();
                    }}
                    className="w-full text-center py-3 text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </MobileNavExpandableContent>
        </MobileNav>
      </Navbar>
    </div>
  );
}
