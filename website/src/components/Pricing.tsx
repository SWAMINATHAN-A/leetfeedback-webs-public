import React, { useState, useEffect, useRef } from "react";
import { ChromaText } from "./ui/textRenderAppear";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { AnimatedClipButton } from "./ui/animated-clip-button";
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
  Star,
  GitFork,
  MessageCircle,
  Clock,
} from "lucide-react";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";
import { analytics } from "../utils/analytics";
import reelCircleDeco from "@/assets/reel-circle-deco.svg";
import DiscordIcon from "./icons/DiscordIcon";
import ShinyText from "./ShinyText";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { useTheme } from "../contexts/ThemeContext";
import { cn } from "../lib/utils";

// Wrapper component that triggers ChromaText animation when visible (replays on re-scroll)
const VisibleChromaText: React.FC<{
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ id, className, delay, duration, children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey((prev) => prev + 1);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {isVisible ? (
        <ChromaText
          key={animationKey}
          id={id}
          className={className}
          delay={delay}
          duration={duration}
        >
          {children}
        </ChromaText>
      ) : (
        <span className={className} style={{ opacity: 0 }}>
          {children}
        </span>
      )}
    </span>
  );
};

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is this really free forever?",
      answer:
        "For Students yes, you only pay for what we pay for. Everything which should be paid is free. For Recruiters, Yeah it will be paid but that's not implemented yet.",
    },
    {
      question: "How do you sustain the project?",
      answer: "uhh..",
    },
    {
      question:
        "Any deadlines or something of that sort for phases and upcoming features?",
      answer:
        "OK. This project is will never be completed as i see it. But what was promised and more is already implemeted!",
    },
    {
      question: "Is my code data secure?",
      answer:
        "Yes. your code 'data' is never collected in any way. It doesn't even reach our servers, even gemini calls are made directly from client side. Though we do collect metadata, and that's the entire purpose of this platform. If some big company wants your data, I'll happily sell it...",
    },
    {
      question:
        "We are XYZ/MNC and are looking to buy this for XYZ million dollars...",
      answer: "IT'S YOURS. PLS GIVE ME A JOB",
    },
    {
      question: "How do I request a new feature/idea or report bug?",
      answer:
        "Just mail diljotsingh7@iCloud.com. You get instant reply even if it's 3AM. No spam pls. Or join our discord server and ping me there.",
    },
    {
      question: "Do you offer any student discounts?",
      answer: "It's already free lil bro",
    },
    {
      question: "What is spaced repetition?",
      answer:
        "Human mind tends to forget stuff, it's the exact counter. Look up what's SM2 or LSTM",
    },
  ];

  return (
    <Accordion className="container-small mx-auto">
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
              <ChromaText
                key={`content-${index}`}
                id={`faq-answer-${index}`}
                delay={0.1}
                duration={1.0}
              >
                {faq.answer}
              </ChromaText>
            ) : (
              faq.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

// GitHub stats hook
const useGitHubStats = () => {
  const [stats, setStats] = useState({
    stars: 9, // Fallback value
    lastCommitDays: 23, // Fallback value
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch repo info for stars
        const repoRes = await fetch(
          "https://api.github.com/repos/lqSky7/leetFeedback-extension",
        );
        const repoData = await repoRes.json();

        // Fetch commits for last commit date
        const commitsRes = await fetch(
          "https://api.github.com/repos/lqSky7/leetFeedback-extension/commits?per_page=1",
        );
        const commitsData = await commitsRes.json();

        const lastCommitDate = new Date(
          commitsData[0]?.commit?.committer?.date,
        );
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - lastCommitDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        setStats({
          stars: repoData.stargazers_count || 9,
          lastCommitDays: isNaN(diffDays) ? 23 : diffDays,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
        // Keep fallback values, just set loading to false
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return stats;
};

const Pricing: React.FC = React.memo(() => {
  const gitHubStats = useGitHubStats();
  const { isDark } = useTheme();

  const freeFeatures = [
    { text: "All platforms supported on based on early user requests", icon: Code2 },
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
      <div className="container">
        {/* Section Header */}
        <div className="text-center container-small mx-auto mb-16">
          <BlurFade delay={0.15}>
            <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
              <ShinyText
                text="One time payment"
                speed={3}
                className="font-mono text-xs"
              />
            </div>
          </BlurFade>
          <div className="relative inline-block">
            {/* Handwritten annotation - Everything is almost free! */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 hidden md:block" aria-hidden>
              <svg width="140" height="50" viewBox="0 0 140 50" fill="none">
                <path
                  d="M20 45 Q 50 50, 80 30 Q 110 10, 130 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-amber-500/70"
                />
                <path
                  d="M125 15 L 135 22 L 128 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-amber-500/70"
                />
              </svg>
              <span
                className="absolute -top-1 left-1/2 -translate-x-1/2 text-amber-500/90 text-sm whitespace-nowrap"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Everything is almost free!
              </span>
            </div>
            {/* Reel Circle Decoration - Smaller/Inner - Hidden on mobile */}
            <img
              src={reelCircleDeco}
              alt="Circle decoration"
              className="absolute inset-0 w-full h-full dark:invert-0 invert hidden md:block"
              style={{
                transform: "scale(3.5)",
                pointerEvents: "none",
                opacity: 0.35,
              }}
              aria-hidden="true"
            />
            {/* Horizontal and Vertical Lines - Hidden on mobile */}
            <div
              className="absolute inset-0 pointer-events-none hidden md:flex items-center justify-center"
              aria-hidden="true"
            >
              {/* Vertical Line */}
              <div
                className="absolute bg-border/50"
                style={{
                  width: "1px",
                  height: "80%",
                  top: "10%",
                }}
              />
              {/* Horizontal Line */}
              <div
                className="absolute bg-border/50"
                style={{
                  height: "1px",
                  width: "150%",
                  left: "-25%",
                }}
              />
            </div>
            <TextAnimate
              as="h2"
              className="text-5xl md:text-7xl text-foreground mb-4 relative z-10"
              animation="blurInUp"
              delay={0.25}
              by="word"
            >
              Simple Pricing
            </TextAnimate>
          </div>
          <BlurFade delay={0.5}>
            <p
              className="text-xl md:text-2xl text-muted-foreground font-light"
              style={{ fontFamily: "'HarmonyOS Sans', system-ui, sans-serif" }}
            >
              <VisibleChromaText
                id="works-for-you"
                className="font-light"
                delay={0.3}
                duration={1.2}
              >
                Choose the plan that works for you
              </VisibleChromaText>
            </p>
          </BlurFade>
        </div>

        {/* Pricing Cards */}
        <div
          id="pricing-plans"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 container-medium mx-auto mb-16"
        >
          {/* Free Plan */}
          <BlurFade delay={0.5}>
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm h-full flex flex-col">
              {/* Free Plan Content */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-foreground mb-2">Free</h3>
                <div className="mb-6">
                  <span
                    className="text-5xl font-bold text-foreground"
                    style={{ fontFamily: "'Stinger', sans-serif" }}
                  >
                    ₹0
                  </span>
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
                <AnimatedClipButton
                  text="Get Instant Access"
                  variant="default"
                  size="lg"
                  className="w-full py-5 text-base font-semibold rounded-full mt-auto"
                  onClick={handleGetAccessClick}
                />
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
                <h3 className="text-xl font-bold text-white mb-2">
                  <VisibleChromaText
                    id="premium-title"
                    delay={0.2}
                    duration={1.0}
                  >
                    Premium
                  </VisibleChromaText>
                </h3>
                <div className="mb-6">
                  <span
                    className="text-5xl font-bold text-white"
                    style={{ fontFamily: "'Stinger', sans-serif" }}
                  >
                    <VisibleChromaText
                      id="premium-price"
                      delay={0.3}
                      duration={1.0}
                    >
                      ₹49
                    </VisibleChromaText>
                  </span>
                  <span className="text-lg text-white/70 ml-1">/mo</span>
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
                          <VisibleChromaText
                            id={`premium-feature-${index}`}
                            delay={0.2 + index * 0.1}
                            duration={1.0}
                          >
                            {feature.text}
                          </VisibleChromaText>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <AnimatedClipButton
                  text="Coming Soon"
                  variant="white"
                  size="lg"
                  className="w-full py-5 text-base font-semibold rounded-full mt-auto"
                  onClick={handleComingSoonClick}
                />
              </div>
            </div>
          </BlurFade>
        </div>

        {/* FAQ Section */}
        <div className="bg-zinc-900 border border-gray-800 rounded-3xl p-8 md:p-12 mb-16 container-medium mx-auto relative">
          <div className="text-center mb-12">
            {/* Handwritten annotation - We even answered without chatgpt! */}
            <div className="relative mb-2 ml-8 md:ml-16 text-left hidden md:block" aria-hidden>
              <span
                className="text-emerald-400/80 text-sm whitespace-nowrap block"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                We even answered without chatgpt!
              </span>
              <svg width="50" height="35" viewBox="0 0 50 35" fill="none" className="ml-16 mt-1">
                <path
                  d="M5 5 Q 15 20, 25 28"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-emerald-400/60"
                />
                <path
                  d="M20 24 L 25 32 L 28 23"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  className="text-emerald-400/60"
                />
              </svg>
            </div>
            <div className="relative inline-block">
              <TextAnimate
                as="h2"
                className="text-3xl md:text-5xl text-white mb-4 relative z-10"
                animation="blurInUp"
                delay={0.25}
                by="word"
              >
                Frequently Asked Questions
              </TextAnimate>
            </div>
            <p
              className="text-gray-300 font-light"
              style={{ fontFamily: "'HarmonyOS Sans', system-ui, sans-serif" }}
            >
              <VisibleChromaText
                id="everything-know"
                className="font-light"
                delay={0.5}
                duration={1.2}
              >
                Everything you need to know
              </VisibleChromaText>
            </p>
          </div>

          <FAQAccordion />
        </div>
        {/* Open Source Community Section */}
        <div className="mt-16 container-medium mx-auto">
          <BlurFade delay={0.1}>
            <div className="bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
                    <ShinyText
                      text="Open Source"
                      speed={3}
                      className="font-mono text-xs"
                    />
                  </div>
                  <h3
                    className="text-4xl md:text-4xl  text-white mb-3"
                    style={{ fontFamily: "'Stinger', sans-serif" }}
                  >
                    Build with us
                  </h3>
                  <p
                    className="text-gray-400 max-w-md mx-auto font-light"
                    style={{
                      fontFamily: "'HarmonyOS Sans', system-ui, sans-serif",
                    }}
                  >
                    Join our growing community and help{" "}
                    <VisibleChromaText
                      id="shape-future"
                      className="font-light"
                      delay={0.4}
                      duration={1.3}
                    >
                      shape the future
                    </VisibleChromaText>{" "}
                    of coding practice
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span
                        className="text-xl font-bold text-white font-mono"
                        style={{ fontFamily: "'Stinger', sans-serif" }}
                      >
                        {gitHubStats.loading ? "--" : gitHubStats.stars}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Stars</span>
                  </div>
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span
                        className="text-xl font-bold text-white font-mono"
                        style={{ fontFamily: "'Stinger', sans-serif" }}
                      >
                        {gitHubStats.loading
                          ? "--"
                          : gitHubStats.lastCommitDays === 0
                            ? "Today"
                            : `${gitHubStats.lastCommitDays}d`}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Last commit</span>
                  </div>
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Users className="w-4 h-4 text-green-400" />
                      <span
                        className="text-xl font-bold text-white font-mono"
                        style={{ fontFamily: "'Stinger', sans-serif" }}
                      >
                        50+
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">Members</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <AnimatedClipButton
                    text="Contribute on GitHub"
                    icon={<Github className="w-4 h-4" />}
                    iconPosition="left"
                    variant="white"
                    size="lg"
                    className="rounded-full px-6 font-medium"
                    onClick={() =>
                      window.open(
                        "https://github.com/lqSky7/leetFeedback-extension",
                        "_blank",
                      )
                    }
                  />
                  <AnimatedClipButton
                    text="Join Discord"
                    icon={<DiscordIcon className="w-4 h-4" />}
                    iconPosition="left"
                    variant={isDark ? "outline" : "default"}
                    size="lg"
                    className={cn(
                      "rounded-full px-6 font-medium",
                      isDark
                        ? "border-zinc-700 text-white hover:bg-zinc-800"
                        : "",
                    )}
                    onClick={() =>
                      window.open("https://discord.gg/BZDb22gz", "_blank")
                    }
                  />
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
});

export default Pricing;
