import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Install Extension',
      description: 'Add LeetFeedback to Chrome in seconds. No registration required to start tracking.',
      icon: '⚡',
      details: [
        'One-click installation from Chrome Web Store',
        'Automatic detection of supported platforms',
        'Instant activation on coding sites'
      ]
    },
    {
      step: '02',
      title: 'Code & Practice',
      description: 'Continue your normal coding practice. We silently track your runs and submissions.',
      icon: '💻',
      details: [
        'Works on LeetCode, GeeksforGeeks, HackerRank',
        'Tracks every "Run" button click',
        'Captures successful submissions'
      ]
    },
    {
      step: '03',
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your code patterns and identifies improvement opportunities.',
      icon: '🧠',
      details: [
        'Pattern recognition across solutions',
        'Mistake categorization and clustering',
        'Performance bottleneck identification'
      ]
    },
    {
      step: '04',
      title: 'Get Insights',
      description: 'Receive personalized feedback and actionable recommendations for improvement.',
      icon: '📊',
      details: [
        'Detailed analytics dashboard',
        'Personalized improvement suggestions',
        'Progress tracking over time'
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            🔄 Simple Process
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="gradient-text">LeetFeedback</span> Works
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get started in minutes and start receiving AI-powered insights into your coding practice immediately.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-purple-300 rounded-full"></div>
                </div>
              )}
              
              <Card className="relative z-10 h-full bg-white/80 backdrop-blur-sm border-2 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Demo Video/Screenshot */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center text-white">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">See It In Action</h3>
                <p className="text-blue-100 mb-6">
                  Watch how LeetFeedback seamlessly integrates with your coding workflow
                </p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                  ▶ Play Demo
                </button>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Developers Love LeetFeedback
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Join thousands of developers who have accelerated their coding journey with intelligent insights.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: '🎯',
                    title: 'Precise Feedback',
                    description: 'Get specific, actionable insights instead of generic advice'
                  },
                  {
                    icon: '⚡',
                    title: 'Zero Setup',
                    description: 'Works immediately with your existing practice routine'
                  },
                  {
                    icon: '📈',
                    title: 'Measurable Progress',
                    description: 'Track your improvement with detailed analytics'
                  },
                  {
                    icon: '🔒',
                    title: 'Privacy First',
                    description: 'Your code stays private with optional anonymization'
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm">{benefit.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Trusted by developers at</span>
                  <div className="flex space-x-4 text-gray-400">
                    <span className="font-semibold">Google</span>
                    <span className="font-semibold">Microsoft</span>
                    <span className="font-semibold">Meta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;