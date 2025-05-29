import React from 'react';
import { Badge } from './ui/badge';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <TrendingUpIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">LeetFeedback</span>
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                Beta
              </Badge>
            </div>
            <p className="text-gray-400 leading-relaxed">
              AI-powered insights for data structures and algorithms practice. 
              Accelerate your coding journey with intelligent feedback.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <PinterestIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Installation Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Report a Bug</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press Kit</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investors</a></li>
            </ul>
          </div>
        </div>

        {/* Platform Support Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Supported Platforms</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">L</div>
              <span>LeetCode</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">G</div>
              <span>GeeksforGeeks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">H</div>
              <span>HackerRank</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-yellow-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">C</div>
              <span>CodeChef</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center text-white text-xs font-bold">C</div>
              <span>Codeforces</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 LeetFeedback. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a>
          </div>
        </div>

        {/* Extension Download CTA */}
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Ready to Level Up Your Coding?</h3>
          <p className="text-blue-100 mb-4">Join thousands of developers already using LeetFeedback</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
              <RocketLaunchIcon className="w-4 h-4 mr-2" />
              Add to Chrome - Free
            </button>
            <button className="border border-white/30 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center">
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