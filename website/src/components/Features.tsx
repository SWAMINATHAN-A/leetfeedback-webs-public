import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotesIcon from '@mui/icons-material/Notes';
import StyleIcon from '@mui/icons-material/Style';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const Features: React.FC = () => {
  const primaryFeatures = [
    {
      icon: <GitHubIcon className="w-8 h-8" />,
      title: 'GitHub Integration',
      description: 'Automatically push your solutions and AI feedback notes to GitHub repositories. Keep a versioned history of your coding journey.',
      benefits: ['Auto-commit solutions', 'AI feedback as comments', 'Progress tracking', 'Portfolio building'],
      badge: 'Core',
      highlight: true
    },
    {
      icon: <NotesIcon className="w-8 h-8" />,
      title: 'Notion Sync',
      description: 'Seamlessly export your coding sessions, insights, and progress reports to your Notion workspace for organized learning.',
      benefits: ['Structured notes', 'Progress databases', 'Custom templates', 'Team collaboration'],
      badge: 'Productivity',
      highlight: true
    },
    {
      icon: <StyleIcon className="w-8 h-8" />,
      title: 'Anki Cards Generation',
      description: 'Transform your mistakes and learnings into spaced repetition flashcards. Never forget important concepts again.',
      benefits: ['Auto-generated cards', 'Spaced repetition', 'Concept reinforcement', 'Memory retention'],
      badge: 'Learning',
      highlight: true
    }
  ];

  const secondaryFeatures = [
    {
      icon: <TrackChangesIcon className="w-6 h-6" />,
      title: 'Smart Session Tracking',
      description: 'Automatically tracks every "Run" click across all major DSA platforms.',
      benefits: ['Real-time tracking', 'Cross-platform support', 'Zero manual input'],
      badge: 'Tracking'
    },
    {
      icon: <SmartToyIcon className="w-6 h-6" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced LLM analysis of your coding patterns and mistake identification.',
      benefits: ['Pattern recognition', 'Personalized insights', 'Actionable feedback'],
      badge: 'AI'
    },
    {
      icon: <AnalyticsIcon className="w-6 h-6" />,
      title: 'Performance Analytics',
      description: 'Detailed metrics on your problem-solving journey with interactive charts.',
      benefits: ['Progress visualization', 'Trend analysis', 'Goal tracking'],
      badge: 'Analytics'
    },
    {
      icon: <AutoFixHighIcon className="w-6 h-6" />,
      title: 'Mistake Categorization',
      description: 'Automatically categorizes and summarizes your common coding mistakes.',
      benefits: ['Error classification', 'Learning roadmap', 'Skill gaps identification'],
      badge: 'Learning'
    },
    {
      icon: <CompareArrowsIcon className="w-6 h-6" />,
      title: 'Solution Comparison',
      description: 'Compare your approaches across different attempts and see improvement.',
      benefits: ['Version tracking', 'Improvement insights', 'Code evolution'],
      badge: 'Comparison'
    },
    {
      icon: <EmojiEventsIcon className="w-6 h-6" />,
      title: 'Achievement System',
      description: 'Gamified learning experience with achievements and milestones.',
      benefits: ['Progress rewards', 'Streak tracking', 'Motivation boost'],
      badge: 'Gamification'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <AutoFixHighIcon className="w-4 h-4 mr-1" />
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to
            <span className="gradient-text"> level up</span> your coding
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Transform your coding practice with powerful integrations and AI-driven insights that actually help you improve.
          </p>
        </div>

        {/* Primary Features - Highlighted */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            🚀 Game-Changing Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {primaryFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
              >
                {/* Highlight Badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
                  FEATURED
                </div>
                
                <CardHeader className="space-y-4 pt-8">
                  <div className="flex items-center justify-between">
                    <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <TrendingUpIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Secondary Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Additional Power Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border hover:border-gray-300 bg-white"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feature Highlight Section - GitHub Integration Focus */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <GitHubIcon className="w-4 h-4 mr-1" />
                GitHub Integration
              </Badge>
              <h3 className="text-3xl font-bold mb-6">
                Build your coding portfolio automatically
              </h3>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Every solution you complete gets automatically committed to your GitHub with AI-generated 
                feedback notes, creating a comprehensive coding journal that showcases your growth to employers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-2">500+</div>
                  <div className="text-sm text-blue-200">Auto-commits per month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300 mb-2">95%</div>
                  <div className="text-sm text-blue-200">Developers hired faster</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 font-mono text-sm">
                <div className="flex items-center justify-between mb-4 text-gray-300">
                  <span>📁 my-leetcode-journey</span>
                  <GitHubIcon className="w-5 h-5" />
                </div>
                <div className="space-y-2 text-gray-400">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">+</span>
                    <span>solutions/two-sum.py</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">+</span>
                    <span>feedback/two-sum-analysis.md</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-900 rounded border-l-4 border-blue-500">
                    <div className="text-blue-300 text-xs mb-1">AI Feedback:</div>
                    <div className="text-gray-300 text-xs">
                      "Consider using hash map for O(1) lookup instead of nested loops..."
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;