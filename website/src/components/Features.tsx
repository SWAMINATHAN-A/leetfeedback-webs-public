import React from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AppsIcon from "@mui/icons-material/Apps";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";
import { FlipWords } from "./ui/flip-words";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TextPressure from "./TextPressure";
import { IconCloud } from "./magicui/icon-cloud";
import { LineShadowText } from "./magicui/line-shadow-text";
import { LampContainer } from "./ui/lamp";
import progressIcon from "@/assets/support-icons/progress.svg";
import progress2Icon from "@/assets/support-icons/Progress2.svg";
import cloudSyncIcon from "@/assets/support-icons/cloudSync.svg";
import growthIcon from "@/assets/support-icons/Growth.svg";
import taskCompIcon from "@/assets/support-icons/TaskComp.svg";
import liveCollabIcon from "@/assets/support-icons/LiveCollab.svg";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";
import LinkIcon from "@mui/icons-material/Link";
import DefaultSwapy from "./ui/swapy";
import { ContainerScroll } from "./ui/container-scroll-animation";

const Features: React.FC = () => {
  const primaryFeatures = [
    {
      icon: <GitHubIcon className="w-8 h-8" />,
      title: "GitHub Integration",
      description:
        "Automatically push your solutions and AI feedback notes to a GitHub repo.",
      benefits: [
        "Auto-commit solutions and AI analysis",
        "Progress tracking",
        "Portfolio building",
      ],
      badge: "Core",
      highlight: true,
    },
    {
      icon: <NotesIcon className="w-8 h-8" />,
      title: "Notion Sync",
      description: "Export insights and tagged mistakes your Notion workspace.",
      benefits: ["Structured notes", "Mistake tags", "Team collaboration"],
      badge: "Productivity",
      highlight: true,
    },
    {
      icon: <StyleIcon className="w-8 h-8" />,
      title: "Anki Cards Generation",
      description:
        "Generate Anki cards from your mistakes, Tagged by mistake type and questions.",
      benefits: [
        "Auto-generated cards",
        "Spaced repetition",
        "Memory retention",
      ],
      badge: "Revision",
      highlight: true,
    },
  ];

  const secondaryFeatures = [
    {
      icon: <TrackChangesIcon className="w-6 h-6" />,
      title: "Smart Session Tracking",
      description:
        'Automatically tracks every "Run" click across all major DSA platforms.',
      benefits: [
        "Real-time tracking",
        "Cross-platform support",
        "Zero manual input",
      ],
      badge: "Tracking",
    },
    {
      icon: <SmartToyIcon className="w-6 h-6" />,
      title: "Importance of Feedback",
      description:
        "Advanced LLM analysis of your coding patterns and mistake identification.",
      benefits: [
        "Pattern recognition",
        "Personalized insights",
        "Actionable feedback",
      ],
      badge: "AI",
    },
    {
      icon: <AnalyticsIcon className="w-6 h-6" />,
      title: "Performance Analytics and graphs",
      description:
        "Detailed metrics on your problem-solving journey with interactive charts.",
      benefits: [
        "Progress visualization",
        "Time tracking",
        "Difficulty tracking",
      ],
      badge: "Analytics",
    },
    {
      icon: <AutoFixHighIcon className="w-6 h-6" />,
      title: "Mistake Categorization",
      description:
        "Automatically categorizes and summarizes your common coding mistakes.",
      benefits: [
        "Error classification",
        "Learning roadmap",
        "Skill gaps identification",
      ],
      badge: "Learning",
    },
    {
      icon: <CompareArrowsIcon className="w-6 h-6" />,
      title: "Solution Comparison",
      description:
        "Compare your approaches across different attempts and see improvement.",
      benefits: ["Version tracking", "Improvement insights", "Code evolution"],
      badge: "Comparison",
    },
    {
      icon: <EmojiEventsIcon className="w-6 h-6" />,
      title: "Achievement System",
      description:
        "Gamified learning experience with achievements and milestones.",
      benefits: ["Progress rewards", "Streak tracking", "Motivation boost"],
      badge: "Gamification",
    },
  ];

  return (
    <section
      id="features"
      className="py-12 bg-background border-t border-border/20"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Container Scroll Animation */}
        <ContainerScroll
          titleComponent={
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                Transform Your Coding Journey
              </h1>
              <p className="text-xl text-muted-foreground">
                Watch how AI turns your practice into progress
              </p>
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center h-full w-full">
            <img
              src="/screenshot.png"
              alt="LeetFeedback Screenshot"
              className="w-full h-full object-cover"
            />
          </div>
        </ContainerScroll>

        {/* Mobile Screenshots Section */}
        <div className="py-16 from-background to-muted/20">
          <div className="text-center mb-12">
            <BlurFade delay={0.1} inView={true}>
              <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20 font-mono">
                <AppsIcon className="w-4 h-4 mr-1" />
                Mobile Experience
              </Badge>
            </BlurFade>
            <TextAnimate
              as="h3"
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              animation="blurInUp"
              delay={0.3}
              by="word"
            >
              Seamless mobile experience
            </TextAnimate>
            <BlurFade delay={0.5} inView={true}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Take your coding practice anywhere with our responsive mobile interface
              </p>
            </BlurFade>
          </div>

          {/* Mobile Screenshots Grid */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
              {/* Screenshot 1 */}
              <BlurFade delay={0.6} duration={0.4} inView={true}>
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-2xl overflow-hidden">
                      {/* Placeholder for mobile screenshot 1 */}
                      <img 
                      src="ms1.jpg" 
                      alt="Mobile Dashboard View"
                      className="w-full h-full object-cover"
                    />
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Screenshot 2 */}
              <BlurFade delay={1.0} duration={0.4} inView={true}>
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-2xl overflow-hidden">
                      {/* Placeholder for mobile screenshot 2 */}
                      <img 
                      src="ms2.jpg" 
                      alt="Mobile Dashboard View"
                      className="w-full h-full object-cover"
                    />
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Screenshot 3 */}
              <BlurFade delay={1.4} duration={0.4} className="sm:col-span-2 lg:col-span-1" inView={true}>
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-2xl overflow-hidden">
                      {/* Placeholder for mobile screenshot 3 */}
                      <img 
                      src="ms3.jpg" 
                      alt="Mobile Dashboard View"
                      className="w-full h-full object-cover"
                    />
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>

          {/* Optional: Feature highlights under screenshots */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
            <BlurFade delay={0.8} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AppsIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Intuitive Interface</h4>
                <p className="text-sm text-muted-foreground">Clean, mobile-first design that works seamlessly on all devices</p>
              </div>
            </BlurFade>

            <BlurFade delay={0.9} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrackChangesIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Real-time Tracking</h4>
                <p className="text-sm text-muted-foreground">Monitor your progress instantly, wherever you are</p>
              </div>
            </BlurFade>

            <BlurFade delay={1.0} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AnalyticsIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Smart Analytics</h4>
                <p className="text-sm text-muted-foreground">Get insights into your coding patterns on the go</p>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
              Transform your coding practice with powerful integrations and
              AI-driven insights that actually help you improve.
            </p>
          </BlurFade>
        </div>

        {/* Primary Features - Highlighted */}
        <div className="mb-20">
          {/* Mobile: Compact Lamp Effect */}
          <div className="md:hidden relative h-32 w-full flex items-center justify-center overflow-hidden mb-4">
            {/* Compact lamp elements for mobile */}
            <motion.div
              initial={{ opacity: 0.5, width: "8rem" }}
              whileInView={{ opacity: 1, width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto right-1/2 h-32 overflow-visible w-[16rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
            >
              <div className="absolute w-[100%] left-0 bg-background h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-20 h-[100%] left-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0.5, width: "8rem" }}
              whileInView={{ opacity: 1, width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto left-1/2 h-32 w-[16rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-20 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-background h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
            <div className="absolute top-1/2 h-24 w-full translate-y-6 scale-x-150 bg-background blur-2xl"></div>
            <div className="absolute inset-auto z-50 h-18 w-[14rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
            <motion.div
              initial={{ width: "4rem" }}
              whileInView={{ width: "8rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-30 h-18 w-32 -translate-y-[3rem] rounded-full bg-cyan-400 blur-2xl"
            ></motion.div>
            <motion.div
              initial={{ width: "8rem" }}
              whileInView={{ width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-50 h-0.5 w-[16rem] -translate-y-[3.5rem] bg-cyan-400"
            ></motion.div>
            <div className="absolute inset-auto z-40 h-22 w-full -translate-y-[6rem] bg-background"></div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0.5, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute z-50 text-center"
            >
              <h3 className="text-5xl font-black text-foreground tracking-tight">
                THE BASICS
              </h3>
            </motion.div>
          </div>

          {/* Desktop: Full Lamp Effect */}
          <div className="hidden md:block">
            <LampContainer className="relative flex h-96 flex-col items-center justify-center overflow-hidden bg-background w-full rounded-md z-0 mb-8">
              <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="absolute z-50 translate-y-0 text-center"
              >
                <h3 className="text-7xl md:text-8xl font-black text-foreground tracking-tight">
                  THE BASICS
                </h3>
              </motion.div>
            </LampContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* GitHub Integration Card */}
            <div className="bg-gray-800 text-white rounded-xl h-full p-6 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <GitHubIcon className="w-8 h-8" />
                  <Badge className="text-xs bg-gray-700 text-white font-mono">
                    Core
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-3">GitHub Integration</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Automatically push your solutions and AI feedback notes to a
                  GitHub repo.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-300">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Auto-commit solutions and AI analysis
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Progress tracking
                  </li>
                  <li className="flex items-center text-sm text-gray-300">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Portfolio building
                  </li>
                </ul>
              </div>
            </div>

            {/* Notion Sync Card */}
            <div className="bg-blue-600 text-white rounded-xl h-full p-6 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <NotesIcon className="w-8 h-8" />
                  <Badge className="text-xs bg-blue-500 text-white font-mono">
                    Productivity
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-3">Notion Sync</h3>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  Export insights and tagged mistakes your Notion workspace.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-blue-100">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Structured notes
                  </li>
                  <li className="flex items-center text-sm text-blue-100">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Mistake tags
                  </li>
                  <li className="flex items-center text-sm text-blue-100">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Team collaboration
                  </li>
                </ul>
              </div>
            </div>

            {/* Anki Cards Generation Card */}
            <div className="bg-emerald-600 text-white rounded-xl h-full p-6 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <StyleIcon className="w-8 h-8" />
                  <Badge className="text-xs bg-emerald-500 text-white font-mono">
                    Revision
                  </Badge>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Anki Cards Generation
                </h3>
                <p className="text-emerald-100 mb-4 leading-relaxed">
                  Generate Anki cards from your mistakes, Tagged by mistake type
                  and questions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-emerald-100">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Auto-generated cards
                  </li>
                  <li className="flex items-center text-sm text-emerald-100">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Spaced repetition
                  </li>
                  <li className="flex items-center text-sm text-emerald-100">
                    <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                    Memory retention
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Power Features - Bento Grid */}
        <div className="mb-20">
          {/* Section Title */}
          <div className="text-center mb-16">
            <LineShadowText
              as="h2"
              shadowColor="hsl(var(--muted-foreground))"
              className="text-5xl sm:text-7xl md:text-8xl font-black text-foreground tracking-tight italic mb-4"
            >
              BEYOND BASICS
            </LineShadowText>
            <div className="text-2xl text-muted-foreground font-light">
              Six features that{" "}
              <FlipWords
                words={["transform", "accelerate", "supercharge"]}
                className="text-foreground font-bold"
                duration={2500}
              />{" "}
              your growth
            </div>
          </div>

          {/* Magic Bento Grid */}
          {/* Magic Bento Grid - Desktop & Mobile Responsive */}
          <div className="bento-section w-full flex justify-center">
            <DefaultSwapy />
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
                Every solution you complete gets automatically committed to your
                GitHub with AI-generated feedback notes, creating a kind of{" "}
                <span className="text-red-400 text-bold">coding journal</span>{" "}
                that showcases your growth to employers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2 font-mono">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Auto-commits per month
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2 font-mono">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Developers Find themselves more productive
                  </div>
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
                    <div className="text-blue-400 text-xs mb-1 font-mono">
                      AI Feedback:
                    </div>
                    <div className="text-foreground text-xs">
                      "Your solution works but some edge cases are not
                      covered..."
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-300 rounded-full flex items-center justify-center text-background text-sm font-bold animate-pulse">
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
