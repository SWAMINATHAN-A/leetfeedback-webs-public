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
import { Activity, Users } from "lucide-react";
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
import ShinyText from "./ShinyText";

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
      <div className="w-full px-0 hidden md:block">
        {/* Container Scroll Animation */}
        <ContainerScroll
          titleComponent={
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl text-foreground mb-4">
                Transform Your Coding Journey
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Watch how AI turns your practice into progress
              </p>
            </div>
          }
        >
          <img
            src="/screenshot.png"
            alt="LeetFeedback Screenshot"
            className="w-full h-full object-contain"
          />
        </ContainerScroll>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        {/* Mobile Screenshots Section */}
        <div className="py-16 from-background to-muted/20 hidden md:block">
          <div className="text-center mb-12">
            <BlurFade delay={0.1} inView={true}>
              <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
                <ShinyText
                  text="Mobile Experience"
                  speed={3}
                  className="font-mono text-xs"
                />
              </div>
            </BlurFade>
            <TextAnimate
              as="h2"
              className="text-5xl md:text-7xl text-foreground mb-6"
              animation="blurInUp"
              delay={0.3}
              by="word"
            >
              Seamless mobile experience
            </TextAnimate>
            <BlurFade delay={0.5} inView={true}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Take your coding practice anywhere with our responsive mobile
                interface
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
                    <div className="bg-black rounded-3xl overflow-hidden">
                      {/* Placeholder for mobile screenshot 1 */}
                      <img
                        src="ms1.jpg"
                        alt="Mobile Dashboard View"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </BlurFade>

              {/* Screenshot 2 */}
              <BlurFade delay={1.0} duration={0.4} inView={true}>
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-3xl overflow-hidden">
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
              <BlurFade
                delay={1.4}
                duration={0.4}
                className="sm:col-span-2 lg:col-span-1"
                inView={true}
              >
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-3xl overflow-hidden">
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
                <h4 className="font-semibold text-foreground mb-2">
                  Intuitive Interface
                </h4>
                <p className="text-sm text-muted-foreground">
                  Clean, mobile-first design that works seamlessly on all
                  devices
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.9} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrackChangesIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Real-time Tracking
                </h4>
                <p className="text-sm text-muted-foreground">
                  Monitor your progress instantly, wherever you are
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={1.0} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AnalyticsIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  Smart Analytics
                </h4>
                <p className="text-sm text-muted-foreground">
                  Get insights into your coding patterns on the go
                </p>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <BlurFade delay={0.25}>
            <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
              <ShinyText
                text="Core Features"
                speed={3}
                className="font-mono text-xs"
              />
            </div>
          </BlurFade>
          <TextAnimate
            as="h2"
            className="text-5xl md:text-7xl text-foreground mb-6"
            animation="blurInUp"
            delay={0.5}
            by="word"
          >
            100% Automated, Install and forget.
          </TextAnimate>
          <BlurFade delay={0.75}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
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
              className="absolute inset-auto right-1/2 h-32 overflow-visible w-[16rem] bg-gradient-conic from-[#00E0FE] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
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
              className="absolute inset-auto left-1/2 h-32 w-[16rem] bg-gradient-conic from-transparent via-transparent to-[#00E0FE] text-white [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-20 h-[100%] right-0 bg-background bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-background h-20 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
            <div className="absolute top-1/2 h-24 w-full translate-y-6 scale-x-150 bg-background blur-2xl"></div>
            <div className="absolute inset-auto z-50 h-18 w-[14rem] -translate-y-1/2 rounded-full bg-[#197CDB] opacity-50 blur-3xl"></div>
            <motion.div
              initial={{ width: "4rem" }}
              whileInView={{ width: "8rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-30 h-18 w-32 -translate-y-[3rem] rounded-full bg-[#1B78D6] blur-2xl"
            ></motion.div>
            <motion.div
              initial={{ width: "8rem" }}
              whileInView={{ opacity: 1, width: "16rem" }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="absolute inset-auto z-50 h-0.5 w-[16rem] -translate-y-[3.5rem] bg-[#1B78D6]"
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
            <div className="bg-gray-800 text-white rounded-3xl h-full p-6 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300">
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
            <div className="bg-blue-600 text-white rounded-3xl h-full p-6 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300">
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
            <div className="bg-emerald-600 text-white rounded-3xl h-full p-6 flex flex-col justify-between relative shadow-lg hover:shadow-xl transition-all duration-300">
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

        {/* Power Features - Professional Cards */}
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
            <p className="text-2xl text-muted-foreground font-light">
              Six features that{" "}
              <FlipWords
                words={["transform", "accelerate", "supercharge"]}
                className="text-foreground font-bold"
                duration={2500}
              />{" "}
              your growth
            </p>
          </div>

          {/* Professional Features Grid */}
          <section className="bg-transparent py-8">
            <div className="mx-auto max-w-7xl px-6">
              <div className="relative">
                <div className="relative z-10 grid grid-cols-6 gap-3">
                  {/* Smart Tracking Card */}
                  <Card className="relative col-span-full flex overflow-hidden lg:col-span-2">
                    <CardContent className="relative m-auto size-fit pt-6">
                      <div className="relative flex h-24 w-56 items-center">
                        <svg
                          className="text-muted absolute inset-0 size-full"
                          viewBox="0 0 254 104"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="mx-auto block w-fit text-5xl font-semibold">
                          100%
                        </span>
                      </div>
                      <h2 className="mt-6 text-center text-3xl font-semibold">
                        Automated
                      </h2>
                    </CardContent>
                  </Card>

                  {/* Platform Support Card */}
                  <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                    <CardContent className="pt-6">
                      <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                        <svg
                          className="m-auto h-fit w-24"
                          viewBox="0 0 212 143"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="text-zinc-400 dark:text-zinc-600"
                            d="M44.0209 55.3542C43.1945 54.7639 42.6916 54.0272 42.5121 53.1442C42.3327 52.2611 42.5995 51.345 43.3125 50.3958C50.632 40.3611 59.812 32.5694 70.8525 27.0208C81.8931 21.4722 93.668 18.6979 106.177 18.6979C118.691 18.6979 130.497 21.3849 141.594 26.7587C152.691 32.1326 161.958 39.8936 169.396 50.0417C170.222 51.1042 170.489 52.0486 170.196 52.875C169.904 53.7014 169.401 54.4097 168.688 55C167.979 55.5903 167.153 55.8571 166.208 55.8004C165.264 55.7437 164.438 55.2408 163.729 54.2917C157.236 45.0833 148.885 38.0307 138.675 33.1337C128.466 28.2368 117.633 25.786 106.177 25.7812C94.7257 25.7812 83.9827 28.2321 73.948 33.1337C63.9132 38.0354 55.5903 45.0881 48.9792 54.2917C48.2709 55.3542 47.4445 55.9444 46.5 56.0625C45.5556 56.1806 44.7292 55.9444 44.0209 55.3542Z"
                            fill="currentColor"
                          />
                          <path
                            className="text-primary-600 dark:text-primary-500"
                            d="M3 72H209"
                            stroke="currentColor"
                            strokeWidth="6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="relative z-10 mt-6 space-y-2 text-center">
                        <h2 className="text-lg font-medium transition dark:text-white">
                          Multi-Platform
                        </h2>
                        <p className="text-foreground text-sm">
                          Works seamlessly across LeetCode, HackerRank, and 6
                          other platforms
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Analytics Card */}
                  <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
                    <CardContent className="pt-6">
                      <div className="pt-6 lg:px-6">
                        <svg
                          className="dark:text-muted-foreground w-full"
                          viewBox="0 0 386 123"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_0_106)">
                            <circle
                              className="text-muted-foreground dark:text-muted"
                              cx="29"
                              cy="29"
                              r="15"
                              fill="currentColor"
                            />
                            <path
                              d="M29 23V35"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M35 29L29 35L23 29"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123"
                            fill="url(#paint0_linear_0_106)"
                          />
                          <path
                            className="text-primary-600 dark:text-primary-500"
                            d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_0_106"
                              x1="3"
                              y1="60"
                              x2="3"
                              y2="123"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                className="text-primary/15 dark:text-primary/35"
                                stopColor="currentColor"
                              />
                              <stop
                                className="text-transparent"
                                offset="1"
                                stopColor="currentColor"
                                stopOpacity="0.103775"
                              />
                            </linearGradient>
                            <clipPath id="clip0_0_106">
                              <rect
                                width="358"
                                height="30"
                                fill="white"
                                transform="translate(14 14)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="relative z-10 mt-14 space-y-2 text-center">
                        <h2 className="text-lg font-medium transition">
                          Smart Analytics
                        </h2>
                        <p className="text-foreground text-sm">
                          Track progress with detailed performance insights and
                          growth metrics
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI Pattern Recognition Card */}
                  <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                    <CardContent className="grid pt-6 sm:grid-cols-2">
                      <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                        <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                          <Activity className="m-auto size-5" strokeWidth={1} />
                        </div>
                        <div className="space-y-2">
                          <h2 className="group-hover:text-secondary-950 text-lg font-medium text-zinc-800 transition dark:text-white">
                            AI Pattern Recognition
                          </h2>
                          <p className="text-foreground text-sm">
                            Automatically identify coding patterns and suggest
                            improvements based on your mistakes
                          </p>
                        </div>
                      </div>
                      <div className="rounded-tl-(--radius) relative -mb-6 -mr-6 mt-6 h-fit border-l border-t p-6 py-6 sm:ml-6">
                        <div className="absolute left-3 top-2 flex gap-1">
                          <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                          <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                          <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                        </div>
                        <svg
                          className="w-full sm:w-[150%]"
                          viewBox="0 0 366 231"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.148438 231V179.394L1.92188 180.322L2.94482 177.73L4.05663 183.933L6.77197 178.991L7.42505 184.284L9.42944 187.985L11.1128 191.306V155.455L13.6438 153.03V145.122L14.2197 142.829V150.454V154.842L15.5923 160.829L17.0793 172.215H19.2031V158.182L20.7441 153.03L22.426 148.111V142.407L24.7471 146.86V128.414L26.7725 129.918V120.916L28.1492 118.521L28.4653 127.438L29.1801 123.822L31.0426 120.525V130.26L32.3559 134.71L34.406 145.122V137.548L35.8982 130.26L37.1871 126.049L38.6578 134.71L40.659 138.977V130.26V126.049L43.7557 130.26V123.822L45.972 112.407L47.3391 103.407V92.4726L49.2133 98.4651V106.053L52.5797 89.7556L54.4559 82.7747L56.1181 87.9656L58.9383 89.7556V98.4651L60.7617 103.407L62.0545 123.822L63.8789 118.066L65.631 122.082L68.5479 114.229L70.299 109.729L71.8899 118.066L73.5785 123.822V130.26L74.9446 134.861L76.9243 127.87L78.352 134.71V138.977L80.0787 142.407V152.613L83.0415 142.407V130.26L86.791 123.822L89.0121 116.645V122.082L90.6059 127.87L92.3541 131.77L93.7104 123.822L95.4635 118.066L96.7553 122.082V137.548L99.7094 140.988V131.77L101.711 120.525L103.036 116.645V133.348L104.893 136.218L106.951 140.988L108.933 134.71L110.797 130.26L112.856 140.988V148.111L115.711 152.613L117.941 145.122L119.999 140.988V148.111L123.4 152.613L125.401 158.182L130.547 150.454V156.566L131.578 155.455L134.143 158.182L135.594 168.136L138.329 158.182L140.612 160.829L144.681 169.5L147.011 155.455L148.478 151.787L151.02 152.613L154.886 145.122L158 143.412L159.406 140.637L159.496 133.348L162.295 127.87V122.082L163.855 116.645V109.729L164.83 104.407L166.894 109.729L176.249 98.4651L178.254 106.169L180.77 98.4651V81.045L182.906 69.1641L184.8 56.8669L186.477 62.8428L187.848 79.7483L188.849 106.169L191.351 79.7483L193.485 75.645V98.4651L196.622 94.4523L198.623 87.4228V79.7483L200.717 75.645L202.276 81.045V89.3966L203.638 113.023L205.334 99.8037L207.164 94.4523L208.982 98.4651V102.176L211.267 107.64L212.788 81.045L214.437 66.0083L216.19 62.8428L217.941 56.8669V73.676V79.7483L220.28 75.645L222.516 66.0083V73.676H226.174V84.8662L228.566 98.4651L230.316 75.645L233.61 94.4523V104.25L236.882 102.176L239.543 113.023L241.057 98.4651L243.604 94.4523L244.975 106.169L245.975 87.4228L247.272 89.3966L250.732 84.8662L251.733 96.7549L254.644 94.4523L257.452 99.8037L259.853 91.3111L261.193 84.8662L264.162 75.645L265.808 87.4228L267.247 58.4895L269.757 66.0083L276.625 13.5146L273.33 58.4895L276.25 67.6563L282.377 20.1968L281.37 58.4895V66.0083L283.579 75.645L286.033 56.8669L287.436 73.676L290.628 77.6636L292.414 84.8662L294.214 61.3904L296.215 18.9623L300.826 0.947876L297.531 56.8669L299.973 62.8428L305.548 22.0598L299.755 114.956L301.907 105.378L304.192 112.688V94.9932L308.009 80.0829L310.003 94.9932L311.004 102.127L312.386 105.378L315.007 112.688L316.853 98.004L318.895 105.378L321.257 94.9932L324.349 100.81L325.032 80.0829L327.604 61.5733L329.308 82.3223L333.525 52.7986L334.097 52.145L334.735 55.6812L337.369 59.8108V73.676L340.743 87.9656L343.843 96.3728L348.594 82.7747L349.607 81.045L351 89.7556L352.611 96.3728L355.149 94.9932L356.688 102.176L359.396 108.784L360.684 111.757L365 95.7607V231H148.478H0.148438Z"
                            fill="url(#paint0_linear_0_705)"
                          />
                          <path
                            className="text-primary-600 dark:text-primary-500"
                            d="M1 179.796L4.05663 172.195V183.933L7.20122 174.398L8.45592 183.933L10.0546 186.948V155.455L12.6353 152.613V145.122L15.3021 134.71V149.804V155.455L16.6916 160.829L18.1222 172.195V158.182L19.8001 152.613L21.4105 148.111V137.548L23.6863 142.407V126.049L25.7658 127.87V120.525L27.2755 118.066L29.1801 112.407V123.822L31.0426 120.525V130.26L32.3559 134.71L34.406 145.122V137.548L35.8982 130.26L37.1871 126.049L38.6578 134.71L40.659 138.977V130.26V126.049L43.7557 130.26V123.822L45.972 112.407L47.3391 103.407V92.4726L49.2133 98.4651V106.053L52.5797 89.7556L54.4559 82.7747L56.1181 87.9656L58.9383 89.7556V98.4651L60.7617 103.407L62.0545 123.822L63.8789 118.066L65.631 122.082L68.5479 114.229L70.299 109.729L71.8899 118.066L73.5785 123.822V130.26L74.9446 134.861L76.9243 127.87L78.352 134.71V138.977L80.0787 142.407V152.613L83.0415 142.407V130.26L86.791 123.822L89.0121 116.645V122.082L90.6059 127.87L92.3541 131.77L93.7104 123.822L95.4635 118.066L96.7553 122.082V137.548L99.7094 140.988V131.77L101.711 120.525L103.036 116.645V133.348L104.893 136.218L106.951 140.988L108.933 134.71L110.797 130.26L112.856 140.988V148.111L115.711 152.613L117.941 145.122L119.999 140.988L121.501 148.111L123.4 152.613L125.401 158.182L127.992 152.613L131.578 146.76V155.455L134.143 158.182L135.818 164.629L138.329 158.182L140.612 160.829L144.117 166.757L146.118 155.455L147.823 149.804L151.02 152.613L154.886 145.122L158.496 140.988V133.348L161.295 127.87V122.082L162.855 116.645V109.729L164.83 103.407L166.894 109.729L176.249 98.4651L178.254 106.169L180.77 98.4651V81.045L182.906 69.1641L184.8 56.8669L186.477 62.8428L187.848 79.7483L188.849 106.169L191.351 79.7483L193.485 75.645V98.4651L196.622 94.4523L198.623 87.4228V79.7483L200.717 75.645L202.276 81.045V89.3966L203.638 113.023L205.334 99.8037L207.164 94.4523L208.982 98.4651V102.176L211.267 107.64L212.788 81.045L214.437 66.0083L216.19 62.8428L217.941 56.8669V73.676V79.7483L220.28 75.645L222.516 66.0083V73.676H226.174V84.8662L228.566 98.4651L230.316 75.645L233.61 94.4523V104.25L236.882 102.176L239.543 113.023L241.057 98.4651L243.604 94.4523L244.975 106.169L245.975 87.4228L247.272 89.3966L250.732 84.8662L251.733 96.7549L254.644 94.4523L257.452 99.8037L259.853 91.3111L261.193 84.8662L264.162 75.645L265.808 87.4228L267.247 58.4895L269.757 66.0083L276.625 13.5146L273.33 58.4895L276.25 67.6563L282.377 20.1968L281.37 58.4895V66.0083L283.579 75.645L286.033 56.8669L287.436 73.676L290.628 77.6636L292.414 84.8662L294.214 61.3904L296.215 18.9623L300.826 0.947876L297.531 56.8669L299.973 62.8428L305.548 22.0598L299.755 114.956L301.907 105.378L304.192 112.688V94.9932L308.009 80.0829L310.003 94.9932L311.004 102.127L312.386 105.378L315.007 112.688L316.853 98.004L318.895 105.378L321.257 94.9932L324.349 100.81L325.032 80.0829L327.604 61.5733L329.357 74.9864L332.611 52.6565L334.352 48.5552L335.785 55.2637L338.377 59.5888V73.426L341.699 87.5181L343.843 93.4347L347.714 82.1171L350.229 78.6821L351.974 89.7556L353.323 94.9932L355.821 93.4347L357.799 102.127L360.684 108.794L363.219 98.004L365 89.7556"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_0_705"
                              x1="0.85108"
                              y1="0.947876"
                              x2="0.85108"
                              y2="230.114"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop
                                className="text-primary/15 dark:text-primary/35"
                                stopColor="currentColor"
                              />
                              <stop
                                className="text-transparent"
                                offset="1"
                                stopColor="currentColor"
                                stopOpacity="0.01"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Collaboration Card */}
                  <Card className="card variant-outlined relative col-span-full overflow-hidden lg:col-span-3">
                    <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                      <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                        <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                          <Users className="m-auto size-6" strokeWidth={1} />
                        </div>
                        <div className="space-y-2">
                          <h2 className="text-lg font-medium transition">
                            GitHub Integration
                          </h2>
                          <p className="text-foreground text-sm">
                            Automatically sync your solutions and build an
                            impressive coding portfolio
                          </p>
                        </div>
                      </div>
                      <div className="before:bg-(--color-border) relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                        <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                          <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                              Auto-Push
                            </span>
                            <div className="ring-background size-7 ring-4">
                              <div className="size-full rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                                ✓
                              </div>
                            </div>
                          </div>
                          <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                            <div className="ring-background size-8 ring-4">
                              <div className="size-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                AI
                              </div>
                            </div>
                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                              Feedback
                            </span>
                          </div>
                          <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                            <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                              Track
                            </span>
                            <div className="ring-background size-7 ring-4">
                              <div className="size-full rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white text-xs font-bold">
                                📊
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Feature Highlight Section - GitHub Integration Focus */}
        <div className="bg-muted/20 border border-border rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
                <ShinyText
                  text="GitHub Integration"
                  speed={3}
                  className="font-mono text-xs"
                />
              </div>
              <h3 className="text-3xl mb-6 text-foreground">
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
              <div className="bg-background/50 border border-border rounded-3xl shadow-xl p-6 font-mono text-sm">
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
