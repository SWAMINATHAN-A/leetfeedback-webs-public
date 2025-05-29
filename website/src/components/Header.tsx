import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ThemeSwitch from './ThemeSwitch';
import PlatformIcon from './PlatformIcon';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Reviews
          </a>
          <div className="flex items-center space-x-4 pl-4 border-l border-border">
            <PlatformIcon platform="leetcode" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
            <PlatformIcon platform="geeksforgeeks" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
            <PlatformIcon platform="hackerrank" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
            <PlatformIcon platform="codechef" size="sm" className="opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </nav>

        {/* Right side - Theme Switch & CTA Buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme Switch */}
          <div className="hidden md:block">
            <ThemeSwitch />
          </div>
          
          {/* Auth & CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Button>
            <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 border-0 font-medium">
              Add to Chrome
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-muted-foreground hover:text-foreground ml-2">
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;