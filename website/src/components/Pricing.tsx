import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  Code2, 
  Infinity, 
  Smartphone, 
  Headphones, 
  Github, 
  Trophy, 
  CheckCircle, 
  Brain, 
  Grid3x3, 
  Zap, 
  Watch, 
  RefreshCw, 
  TrendingUp,
  Users,
  Bug,
  Sparkles
} from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";
import { analytics } from "../utils/analytics";
import DiscordIcon from "./icons/DiscordIcon";

const Pricing: React.FC = () => {
  const freeFeatures = [
    { text: "LeetCode & GeeksforGeeks integration", icon: Code2 },
    { text: "Unlimited Daily Problem Solves", icon: Infinity },
    { text: "iOS and Android Application Support", icon: Smartphone },
    { text: "Priority Support untill userbase is small", icon: Headphones },
    { text: "Unlimited GitHub pushes", icon: Github },
    { text: "All Duolingo-like features", icon: Trophy },
  ];

  const premiumFeatures = [
    { text: "Everything in Free", icon: CheckCircle },
    { text: "Premium ML based Revision Scheduler", icon: Brain },
    { text: "All Platforms support", icon: Grid3x3 },
    { text: "Early Access to features", icon: Zap },
    { text: "WatchOS app support", icon: Watch },
    { text: "Anki and notion sync", icon: RefreshCw },
    { text: "Premium AI powered insights based on performance trends", icon: TrendingUp },
  ];

  const handleGetAccessClick = () => {
    analytics.trackFeatureClick("get_free_access");
    // Add your action here
  };

  const handleComingSoonClick = () => {
    analytics.trackFeatureClick("premium_coming_soon");
    // Add your action here
  };

  return (
    <section
      id="pricing"
      className="py-24 bg-background border-t border-border/20"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <TextAnimate
            as="h2"
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            animation="blurInUp"
            delay={0.25}
            by="word"
          >
            Simple Pricing
          </TextAnimate>
          <BlurFade delay={0.5}>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works for you
            </p>
          </BlurFade>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <BlurFade delay={0.5}>
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm h-full flex flex-col">
              {/* Free Plan Content */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-foreground mb-2">Free</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">$0</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6 flex-grow">
                  {freeFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-white flex-shrink-0" strokeWidth={2} />
                        <span className="text-sm text-muted-foreground leading-tight">
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full py-5 text-base font-semibold rounded-full mt-auto"
                  onClick={handleGetAccessClick}
                >
                  Get Instant access
                </Button>
              </div>
            </div>
          </BlurFade>

          {/* Premium Plan */}
          <BlurFade delay={0.7}>
            <div className="relative rounded-3xl overflow-hidden border border-border h-full flex flex-col">
              {/* Video Background */}
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="https://cdn.skiper-ui.com/loopbg.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>

              {/* Premium Plan Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">$129</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6 flex-grow">
                  {premiumFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-white flex-shrink-0" strokeWidth={2} />
                        <span className="text-sm text-white/90 leading-tight">{feature.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full py-5 text-base font-semibold rounded-full bg-white text-black hover:bg-white/90 mt-auto"
                  onClick={handleComingSoonClick}
                >
                  Coming Soon
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* FAQ Section */}
        <div className="bg-muted/10 border border-border rounded-lg p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-muted-foreground">Everything you need to know</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Is this really free forever?",
                answer:
                  "I initially decided to make it paid but no one's paying for this crap idea. So yeah it's free forever now.",
              },
              {
                question: "How do you sustain the project?",
                answer: "Midnight motivation bursts.",
              },
              {
                question:
                  "Any deadlines or something of that sort for phases and upcoming features?",
                answer:
                  "If reality hits hard this will be completed entirely within 1 non-working-day.",
              },
              {
                question: "Is my code data secure?",
                answer:
                  "Yes, It is only stored locally (for now), refer to Gemini Policy for Ai stuff, requests are made direcctly from you, there's no middleware.",
              },
              {
                question:
                  "We are XYZ/MNC and are looking to buy this for XYZ million dollars...",
                answer: "Not selling.",
              },
              {
                question: "How do I request a new feature/idea?",
                answer:
                  "Just mail catinice@outlook.com. You get instant reply even if it's 3AM.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  {faq.question}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Help Us Section */}
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <Card className="bg-background/80 border border-border rounded-lg backdrop-blur-sm">
            <div className="p-4 sm:p-8 relative z-10">
              <div className="flex justify-center space-x-6 mb-6">
                <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Users className="w-8 h-8 text-foreground" />
                </div>
                <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Code2 className="w-8 h-8 text-foreground" />
                </div>
                <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Bug className="w-8 h-8 text-foreground" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                <Sparkles className="w-6 h-6 mr-2 inline" />
                Join Our Open Source Community
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Looking for someone to design icon and fix some AI generated
                slop.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                <RainbowButton
                  size="lg"
                  className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                  onClick={() =>
                    window.open(
                      "https://github.com/lqSky7/leetFeedback-extension",
                      "_blank"
                    )
                  }
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="text-center">Contribute on GitHub</span>
                </RainbowButton>
                <RainbowButton
                  variant="outline"
                  size="lg"
                  className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                  onClick={() =>
                    window.open("https://discord.gg/BZDb22gz", "_blank")
                  }
                >
                  <DiscordIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="text-center">Join Discord Community</span>
                </RainbowButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
