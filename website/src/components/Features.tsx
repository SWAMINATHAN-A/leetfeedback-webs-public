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
import { BlurFade } from './magicui/blur-fade';
import { TextAnimate } from './magicui/text-animate';
import { NumberTicker } from './magicui/number-ticker';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const Features: React.FC = () => {
  const primaryFeatures = [
    {
      icon: <GitHubIcon className="w-8 h-8" />,
      title: 'GitHub Integration',
      description: 'Automatically push your solutions and AI feedback notes to a GitHub repo.',
      benefits: ['Auto-commit solutions and AI analysis', 'Progress tracking', 'Portfolio building'],
      badge: 'Core',
      highlight: true
    },
    {
      icon: <NotesIcon className="w-8 h-8" />,
      title: 'Notion Sync',
      description: 'Export insights and tagged mistakes your Notion workspace.',
      benefits: ['Structured notes', 'Mistake tags','Team collaboration'],
      badge: 'Productivity',
      highlight: true
    },
    {
      icon: <StyleIcon className="w-8 h-8" />,
      title: 'Anki Cards Generation',
      description: 'Generate Anki cards from your mistakes, Tagged by mistake type and questions.',
      benefits: ['Auto-generated cards', 'Spaced repetition', 'Memory retention'],
      badge: 'Revision',
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
      title: 'Importance of Feedback',
      description: 'Advanced LLM analysis of your coding patterns and mistake identification.',
      benefits: ['Pattern recognition', 'Personalized insights', 'Actionable feedback'],
      badge: 'AI'
    },
    {
      icon: <AnalyticsIcon className="w-6 h-6" />,
      title: 'Performance Analytics and graphs',
      description: 'Detailed metrics on your problem-solving journey with interactive charts.',
      benefits: ['Progress visualization', 'Time tracking', 'Difficulty tracking'],
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
    <section id="features" className="py-24 bg-background border-t border-border/20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <BlurFade delay={0.25}>
            <Badge className="mb-4 bg-muted/50 text-foreground border border-border font-mono">
              <AutoFixHighIcon className="w-4 h-4 mr-1" />
              Core Features
            </Badge>
          </BlurFade>
          <TextAnimate
            as="h2"
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            animation="blurInUp"
            delay={0.5}
            by="word"
          >
            100% Automated, Install and forget.
          </TextAnimate>
          <BlurFade delay={0.75}>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your coding practice with powerful integrations and AI-driven insights that actually help you improve.
            </p>
          </BlurFade>
        </div>

        {/* Primary Features - Highlighted */}
        <div className="mb-20">
          <BlurFade delay={0.25}>
            <h3 className="text-2xl font-bold text-center text-foreground mb-12 font-mono">
              Game-Changing Features
            </h3>
          </BlurFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {primaryFeatures.map((feature, index) => (
              <BlurFade key={index} delay={1 + index * 0.2}>
                <Card 
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-border bg-card/50 relative overflow-hidden hover:border-white/20"
                >
                {/* Highlight Badge */}
                <div className="absolute top-0 right-0 bg-foreground text-background text-xs px-3 py-1 rounded-bl-md font-mono font-semibold">
                  FEATURED
                </div>
                
                <CardHeader className="space-y-4 pt-8">
                  <div className="flex items-center justify-between">
                    <div className="text-foreground group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="text-xs bg-muted/30 font-mono">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                        <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Secondary Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12 font-mono">
            Additional Power Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryFeatures.map((feature, index) => (
              <BlurFade key={index} delay={1.5 + index * 0.1}>
                <Card 
                  className="group hover:shadow-lg transition-all duration-300 border border-border bg-card/30 hover:bg-card/50"
                >
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="text-xs font-mono bg-muted/20">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Feature Highlight Section - GitHub Integration Focus */}
        <div className="bg-muted/20 border border-border rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-card/50 text-foreground border border-border font-mono">
                <GitHubIcon className="w-4 h-4 mr-1" />
                GitHub Integration
              </Badge>
              <h3 className="text-3xl font-bold mb-6 text-foreground">
                Build your coding portfolio automatically
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every solution you complete gets automatically committed to your GitHub with AI-generated 
                feedback notes, creating a kind of <span className="text-red-400 text-bold">coding journal</span> that showcases your growth to employers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2 font-mono">500+</div>
                  <div className="text-sm text-muted-foreground">Auto-commits per month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2 font-mono">0%</div>
                  <div className="text-sm text-muted-foreground">Developers hired faster (give me a job pls)</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-background/50 border border-border rounded-lg shadow-xl p-6 font-mono text-sm">
                <div className="flex items-center justify-between mb-4 text-muted-foreground">
                  <span className="font-mono">📁 my-dsa-journey</span>
                  <GitHubIcon className="w-5 h-5" />
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">+</span>
                    <span>solutions/two-sum.py</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">+</span>
                    <span>feedback/two-sum-analysis.md</span>
                  </div>
                  <div className="mt-4 p-3 bg-muted/20 rounded border-l-4 border-blue-400">
                    <div className="text-blue-400 text-xs mb-1 font-mono">AI Feedback:</div>
                    <div className="text-foreground text-xs">
                      "Your solution is shit. Do this instead..."
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-background text-sm font-bold animate-pulse">
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