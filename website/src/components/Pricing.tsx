import React, { useState } from "react";
import { motion } from "motion/react";
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
import GradientMesh from "./GradientMesh";
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

        {/* Help Us Section - Ultra-minimal Apple Style */}
        <div className="mt-24 mb-8 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02]">
            {/* Animated Gradient Mesh Background */}
            <div className="absolute inset-0 opacity-40 dark:opacity-30">
              <GradientMesh
                colors={["#6366F1", "#8B5CF6", "#EC4899", "#14B8A6"]}
                speed={0.002}
              />
            </div>

            {/* Subtle grain overlay for texture */}
            <div
              className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative z-10 px-8 py-20 sm:px-16 sm:py-28 text-center">
              {/* Headline */}
              <BlurFade delay={0.1}>
                <h3 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                  Build with us
                </h3>
              </BlurFade>

              {/* Subline */}
              <BlurFade delay={0.2}>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-md mx-auto mb-12 font-light">
                  Join our open source community and shape the future of coding practice
                </p>
              </BlurFade>

              {/* Buttons */}
              <BlurFade delay={0.3}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* GitHub Button - Glass effect */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      window.open(
                        "https://github.com/lqSky7/leetFeedback-extension",
                        "_blank"
                      )
                    }
                    className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium transition-all duration-300 bg-foreground text-background hover:bg-foreground/90 min-w-[200px]"
                  >
                    <Github className="w-5 h-5" />
                    <span>Contribute</span>
                  </motion.button>

                  {/* Discord Button - Subtle glass outline */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      window.open("https://discord.gg/BZDb22gz", "_blank")
                    }
                    className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium transition-all duration-300 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 min-w-[200px]"
                  >
                    <DiscordIcon className="w-5 h-5" />
                    <span>Join Discord</span>
                  </motion.button>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Pricing;
