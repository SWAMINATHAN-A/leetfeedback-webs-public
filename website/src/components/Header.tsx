import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUpIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold">LeetFeedback</span>
            <Badge variant="secondary" className="text-xs">
              Beta
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            Reviews
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
            Add to Chrome
          </Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;