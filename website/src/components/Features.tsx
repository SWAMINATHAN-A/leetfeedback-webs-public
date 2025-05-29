import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Features: React.FC = () => {
  const features = [
    {
      icon: '📊',
      title: 'Smart Session Tracking',
      description: 'Automatically tracks every "Run" click across all major DSA platforms. Monitor your debugging patterns and iteration count.',
      benefits: ['Real-time tracking', 'Cross-platform support', 'Zero manual input'],
      badge: 'Core'
    },
    {
      icon: '🤖',
      title: 'AI-Powered Analysis',
      description: 'Advanced LLM analysis of your coding patterns, identifying recurring mistakes and suggesting improvements.',
      benefits: ['Pattern recognition', 'Personalized insights', 'Actionable feedback'],
      badge: 'AI'
    },
    {
      icon: '📈',
      title: 'Performance Analytics',
      description: 'Detailed metrics on your problem-solving journey with interactive charts and progress tracking.',
      benefits: ['Progress visualization', 'Trend analysis', 'Goal tracking'],
      badge: 'Analytics'
    },
    {
      icon: '🎯',
      title: 'Mistake Categorization',
      description: 'Automatically categorizes and summarizes your common coding mistakes with precise, actionable recommendations.',
      benefits: ['Error classification', 'Learning roadmap', 'Skill gaps identification'],
      badge: 'Learning'
    },
    {
      icon: '🔄',
      title: 'Solution Comparison',
      description: 'Compare your approaches across different attempts and see how your problem-solving evolves over time.',
      benefits: ['Version tracking', 'Improvement insights', 'Code evolution'],
      badge: 'Comparison'
    },
    {
      icon: '🏆',
      title: 'Achievement System',
      description: 'Gamified learning experience with achievements, streaks, and milestones to keep you motivated.',
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
            ✨ Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to
            <span className="gradient-text"> level up</span> your coding
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive tools and insights designed to transform how you learn and practice data structures and algorithms.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
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
                    <li key={benefitIndex} className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Highlight Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                🎯 Smart Analysis
              </Badge>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Get insights that actually matter
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our AI doesn't just tell you what went wrong—it shows you exactly how to improve. 
                From syntax patterns to algorithmic approaches, get personalized feedback that accelerates your learning.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">92%</div>
                  <div className="text-sm text-gray-600">Accuracy in mistake detection</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">3.2x</div>
                  <div className="text-sm text-gray-600">Faster improvement rate</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Analysis Report</h4>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 px-3 bg-red-50 rounded">
                    <span className="text-sm text-red-700">Off-by-one errors</span>
                    <span className="text-xs text-red-600 font-medium">Found in 3 solutions</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-yellow-50 rounded">
                    <span className="text-sm text-yellow-700">Inefficient loops</span>
                    <span className="text-xs text-yellow-600 font-medium">2 occurrences</span>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded">
                    <span className="text-sm text-blue-700">Recommended: Two pointers</span>
                    <span className="text-xs text-blue-600 font-medium">Try next</span>
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