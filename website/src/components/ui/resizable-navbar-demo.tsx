"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Badge } from "./badge";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlatformIcon from '../PlatformIcon';

export function ResizableNavbarDemo() {
  const navItems = [];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card">
              <TrendingUpIcon className="h-4 w-4 text-foreground" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold mono">LeetFeedback</span>
              <Badge variant="outline" className="text-xs font-mono bg-muted/50">
                Beta
              </Badge>
            </div>
          </div>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4 pl-4 border-l border-border">
              <PlatformIcon platform="leetcode" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
              <PlatformIcon platform="geeksforgeeks" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
              <PlatformIcon platform="hackerrank" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
              <PlatformIcon platform="codechef" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center gap-3">
              <NavbarButton variant="secondary">Sign In</NavbarButton>
              <NavbarButton variant="primary">Add to Chrome</NavbarButton>
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card">
                <TrendingUpIcon className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold mono">LeetFeedback</span>
                <Badge variant="outline" className="text-xs font-mono bg-muted/50">
                  Beta
                </Badge>
              </div>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
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
            <div className="flex w-full flex-col gap-4">
              <div className="flex items-center justify-center space-x-4 py-4 border-y border-border">
                <PlatformIcon platform="leetcode" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
                <PlatformIcon platform="geeksforgeeks" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
                <PlatformIcon platform="hackerrank" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
                <PlatformIcon platform="codechef" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
              </div>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Sign In
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Add to Chrome
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
} 