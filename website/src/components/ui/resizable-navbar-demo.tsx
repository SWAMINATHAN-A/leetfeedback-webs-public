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
import { MotionValue } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "../../contexts/NavigationContext";
import SimpleUserMenu from "./SimpleUserMenu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChromaText } from "./textRenderAppear";

// Animated Logo Component - text at top, icon when scrolled
const TraverseLogo = ({ visible }: { visible?: boolean }) => {
  // Default to showing text (visible=false means at top)
  const showIcon = visible === true;

  return (
    <div className="relative pl-4 h-7 flex items-center min-w-[120px]">
      {/* Text - visible when not scrolled */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          opacity: showIcon ? 0 : 1,
          pointerEvents: showIcon ? "none" : "auto",
          transition: "opacity 300ms ease-out",
        }}
      >
        <ChromaText
          id="traverse-logo"
          className="text-xl"
        >
          <span style={{ fontFamily: "'Fascinate', cursive" }}>Traverse</span>
        </ChromaText>
      </div>
      {/* Icon - visible when scrolled */}
      <div
        className="absolute inset-0 flex items-center"
        style={{
          opacity: showIcon ? 1 : 0,
          pointerEvents: showIcon ? "auto" : "none",
          transition: "opacity 300ms ease-out",
        }}
      >
        <img
          src="/logo.svg"
          alt="Traverse"
          className="h-6 w-auto dark:invert"
        />
      </div>
    </div>
  );
};

// Flush Sign-In Button wrapper - becomes flush with navbar edge when scrolled
interface FlushSignInButtonProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  onClick: () => void;
  visible?: boolean;
  scrollProgress?: MotionValue<number>;
}

const FlushSignInButton = ({ isAuthenticated, isLoading, onClick, visible }: FlushSignInButtonProps) => {
  // When scrolled (visible), button becomes flush with navbar edge
  const isFlush = visible === true;

  if (isAuthenticated) {
    return <SimpleUserMenu />;
  }

  return (
    <div
      className="flex items-center self-stretch"
      style={{
        marginRight: isFlush ? "-0.5rem" : "0",
        marginTop: isFlush ? "-0.25rem" : "0",
        marginBottom: isFlush ? "-0.25rem" : "0",
        transition: "margin 300ms ease-out",
      }}
    >
      <AnimatedClipButton
        text={isLoading ? "Loading..." : "Sign In"}
        variant="default"
        size="default"
        onClick={onClick}
        disabled={isLoading}
        className={
          isFlush
            ? "bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-100 !rounded-l-none !rounded-r-[2rem] h-full border-0 font-normal text-sm"
            : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        }
        style={{
          transition: "background-color 300ms ease-out, border-radius 300ms ease-out",
        }}
      />
    </div>
  );
};

export function ResizableNavbarDemo() {
  const navItems = [
    { name: "Downloads", link: "/downloads" },
    { name: "Pricing", link: "#pricing" },
    { name: "Blog", link: "/blog" },
    { name: "Careers", link: "/careers" },
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
      // Simple overflow lock - position:fixed breaks sticky navbar
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <TraverseLogo />
          <NavItems items={navItems} />
          <FlushSignInButton
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
            onClick={handleSignInClick}
          />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <TraverseLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavExpandableContent 
            isExpanded={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
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
