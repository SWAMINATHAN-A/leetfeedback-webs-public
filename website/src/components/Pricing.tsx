import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GitHubIcon from '@mui/icons-material/GitHub';
import NotesIcon from '@mui/icons-material/Notes';
import StyleIcon from '@mui/icons-material/Style';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with AI-powered coding insights',
      badge: 'Most Popular',
      badgeColor: 'bg-green-100 text-green-800',
      features: [
        'Up to 100 tracked submissions/month',
        'Basic mistake pattern analysis',
        'Weekly progress reports',
        'Support for 3 platforms',
        'Community support',
        'Basic analytics dashboard'
      ],
      limitations: [
        'Limited to 100 submissions/month',
        'Basic AI analysis only',
        'No export functionality'
      ],
      cta: 'Start Free',
      ctaVariant: 'outline' as const,
      popular: true
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'Advanced analytics and unlimited tracking for serious developers',
      badge: 'Best Value',
      badgeColor: 'bg-blue-100 text-blue-800',
      features: [
        'Everything in Free plan',
        'Unlimited tracked submissions',
        'GitHub auto-commit with AI notes',
        'Notion workspace integration',
        'Anki flashcard generation',
        'Advanced AI analysis & insights',
        'All platforms supported',
        'Priority email support',
        'Export data to CSV/PDF',
        'Custom learning goals'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      ctaVariant: 'default' as const,
      popular: false
    },
    {
      name: 'Teams',
      price: '$29.99',
      period: 'per month',
      description: 'Collaborate and track progress across your entire development team',
      badge: 'Enterprise',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Shared GitHub organization repos',
        'Team Notion workspace templates',
        'Collaborative Anki decks',
        'Team analytics dashboard',
        'Admin controls & permissions',
        'Slack/Discord integrations',
        'Custom reporting',
        'Dedicated account manager'
      ],
      limitations: [],
      cta: 'Contact Sales',
      ctaVariant: 'outline' as const,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
            <AttachMoneyIcon className="w-4 h-4 mr-1" />
            Simple Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the perfect plan for
            <span className="gradient-text"> your journey</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Start free and upgrade as you grow. All plans include our core AI-powered analysis.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-xl scale-105 bg-gradient-to-br from-blue-50 to-indigo-50' 
                  : 'border-2 hover:border-gray-300 hover:shadow-lg bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                  ⭐ Most Popular Choice
                </div>
              )}
              
              <CardHeader className={`space-y-4 ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <Badge className={plan.badgeColor}>
                    {plan.badge}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-end space-x-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 pb-1">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                </div>

                <Button 
                  variant={plan.ctaVariant}
                  className={`w-full py-3 font-semibold ${
                    plan.ctaVariant === 'default' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0' 
                      : ''
                  }`}
                >
                  {plan.cta}
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 mr-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-start">
                          <CloseIcon className="w-4 h-4 mr-3 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600">
              Everything you need to know about our pricing and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I upgrade or downgrade anytime?",
                answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at your next billing cycle."
              },
              {
                question: "Do you offer student discounts?",
                answer: "Absolutely! Students get 50% off Pro plans with a valid .edu email address. Contact us for verification."
              },
              {
                question: "Is my code data secure?",
                answer: "Yes, we use enterprise-grade encryption and never store your actual code. Only anonymized patterns are analyzed."
              },
              {
                question: "What happens if I exceed the free limit?",
                answer: "We'll notify you as you approach the limit. You can upgrade anytime or wait for the next month's reset."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Of course! Cancel anytime with one click. Your data remains accessible until your current period ends."
              }
            ].map((faq, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Highlight */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl text-white">
          <div className="flex justify-center space-x-6 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <GitHubIcon className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <NotesIcon className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <StyleIcon className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            <AutoAwesomeIcon className="w-6 h-6 mr-2 inline" />
            Your Complete Coding Ecosystem
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            The only tool that connects your practice to GitHub portfolio building, Notion knowledge management, and Anki memory retention.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <BusinessIcon className="w-4 h-4 mr-2" />
              Enterprise Solutions
            </Button>
            <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              <StarIcon className="w-4 h-4 mr-2" />
              See All Integrations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;