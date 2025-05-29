import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotesIcon from '@mui/icons-material/Notes';
import StyleIcon from '@mui/icons-material/Style';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] bg-[size:75px_75px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-30 float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-25 float" style={{animationDelay: '2s'}}></div>

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Beta Badge */}
          <div className="mb-6 fade-in">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm">
              <RocketLaunchIcon className="w-4 h-4 mr-1" />
              Now in Beta - Join 10,000+ developers
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 fade-in">
            Master DSA with
            <br />
            <span className="gradient-text">AI-Powered</span> Insights
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed fade-in">
            Automatically push solutions to <strong>GitHub</strong>, sync insights to <strong>Notion</strong>, 
            and create <strong>Anki flashcards</strong> from your coding mistakes. The complete learning ecosystem.
          </p>
          
          {/* Key Features Highlight */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 fade-in">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border">
              <GitHubIcon className="w-5 h-5 mr-2 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Auto GitHub Push</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border">
              <NotesIcon className="w-5 h-5 mr-2 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Notion Integration</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border">
              <StyleIcon className="w-5 h-5 mr-2 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Anki Cards</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              Add to Chrome - Free
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 transition-all duration-300"
            >
              <PlayArrowIcon className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500 mb-20 fade-in">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              Free Forever Plan
            </div>
            <div className="flex items-center gap-2">
              <LockIcon className="w-5 h-5 text-blue-500" />
              Privacy First
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-purple-500" />
              4.9/5 Rating
            </div>
          </div>

          {/* Platform Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto fade-in">
            {[
              { name: 'LeetCode', color: 'from-orange-400 to-orange-600' },
              { name: 'GeeksforGeeks', color: 'from-green-400 to-green-600' },
              { name: 'HackerRank', color: 'from-green-500 to-teal-600' },
              { name: 'CodeChef', color: 'from-yellow-400 to-orange-500' }
            ].map((platform, index) => (
              <Card key={platform.name} className="p-6 text-center border-2 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {platform.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-700">{platform.name}</p>
                <p className="text-xs text-gray-500 mt-1">Supported</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;