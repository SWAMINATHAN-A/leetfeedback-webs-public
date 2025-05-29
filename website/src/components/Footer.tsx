import React from 'react';
import { Badge } from './ui/badge';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlatformIcon from './PlatformIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card">
                <TrendingUpIcon className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold mono">LeetFeedback</span>
                <Badge variant="outline" className="text-xs font-mono bg-muted/50">
                  Beta
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI-powered insights for data structures and algorithms practice. 
              Accelerate your coding journey with intelligent feedback.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <PinterestIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground font-mono">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground font-mono">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Installation Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Report a Bug</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground font-mono">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press Kit</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Partners</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Investors</a></li>
            </ul>
          </div>
        </div>

        {/* Platform Support Section */}
        <div className="mt-8 text-center p-6 bg-muted/10 border border-border rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-foreground">Supported Platforms</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex flex-col items-center space-y-2">
              <PlatformIcon platform="leetcode" size="lg" className="opacity-80 hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium text-muted-foreground">LeetCode</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <PlatformIcon platform="geeksforgeeks" size="lg" className="opacity-80 hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium text-muted-foreground">GeeksforGeeks</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <PlatformIcon platform="hackerrank" size="lg" className="opacity-80 hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium text-muted-foreground">HackerRank</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <PlatformIcon platform="codechef" size="lg" className="opacity-80 hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium text-muted-foreground">CodeChef</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0 font-mono">
            © 2024 LeetFeedback. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a>
          </div>
        </div>

        {/* Extension Download CTA */}
        <div className="mt-8 text-center p-6 bg-muted/10 border border-border rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-foreground">Ready to Level Up Your Coding?</h3>
          <p className="text-muted-foreground mb-4">Join thousands of developers already using LeetFeedback</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-foreground text-background px-6 py-2 rounded-lg font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center">
              <RocketLaunchIcon className="w-4 h-4 mr-2" />
              Add to Chrome - Free
            </button>
            <button className="border border-border text-foreground px-6 py-2 rounded-lg font-medium hover:bg-muted/50 transition-colors flex items-center justify-center">
              <PlayArrowIcon className="w-4 h-4 mr-2" />
              View Demo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;