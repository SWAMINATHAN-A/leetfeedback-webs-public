import React, { useState } from "react";
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
  Sparkles,
} from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";
import { analytics } from "../utils/analytics";
import DiscordIcon from "./icons/DiscordIcon";
import ShinyText from "./ShinyText";
import Silk from "./Silk";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
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
  ];

  return (
    <Accordion className="max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="text-white hover:text-gray-200"
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            isOpen={openIndex === index}
            className="text-gray-300"
          >
            {openIndex === index ? (
              <BlurFade delay={0.05} inView key={`content-${index}`}>
                {faq.answer}
              </BlurFade>
            ) : (
              faq.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const Pricing: React.FC = React.memo(() => {
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
    {
      text: "Premium AI powered insights based on performance trends",
      icon: TrendingUp,
    },
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
          <BlurFade delay={0.15}>
            <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
              <ShinyText
                text="One time payment"
                speed={3}
                className="font-mono text-xs"
              />
            </div>
          </BlurFade>
          <TextAnimate
            as="h2"
            className="text-5xl md:text-7xl text-foreground mb-4"
            animation="blurInUp"
            delay={0.25}
            by="word"
          >
            Simple Pricing
          </TextAnimate>
          <BlurFade delay={0.5}>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Choose the plan that works for you
            </p>
          </BlurFade>
        </div>

        {/* Pricing Cards */}
        <div
          id="pricing-plans"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
        >
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
                        <IconComponent
                          className="w-5 h-5 text-white flex-shrink-0"
                          strokeWidth={2}
                        />
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
                  <span className="text-5xl font-bold text-white">$100</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 mb-6 flex-grow">
                  {premiumFeatures.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent
                          className="w-5 h-5 text-white flex-shrink-0"
                          strokeWidth={2}
                        />
                        <span className="text-sm text-white/90 leading-tight">
                          {feature.text}
                        </span>
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
        <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-300">Everything you need to know</p>
          </div>

          <FAQAccordion />
        </div>

        {/* Help Us Section */}
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <Card className="relative overflow-hidden bg-background/10 border border-border rounded-3xl backdrop-blur-sm">
            {/* Silk Background */}
            <div className="absolute inset-0 opacity-20">
              <Silk
                speed={2}
                scale={1}
                color="#197CDB"
                noiseIntensity={1}
                rotation={0.2}
              />
            </div>

            <div className="relative z-10 p-8 sm:p-10">
              <h3 className="text-2xl sm:text-3xl mb-3 text-foreground">
                Join Our Open Source Community
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-6">
                Contribute to the future of coding practice tools
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 px-4">
                <RainbowButton
                  size="lg"
                  className="px-6 py-3 text-base font-semibold w-full sm:w-auto"
                  onClick={() =>
                    window.open(
                      "https://github.com/lqSky7/leetFeedback-extension",
                      "_blank"
                    )
                  }
                >
                  <Github className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Contribute on GitHub</span>
                </RainbowButton>
                <RainbowButton
                  variant="outline"
                  size="lg"
                  className="px-6 py-3 text-base font-semibold w-full sm:w-auto"
                  onClick={() =>
                    window.open("https://discord.gg/BZDb22gz", "_blank")
                  }
                >
                  <DiscordIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>Join Discord</span>
                </RainbowButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
});

export default Pricing;
