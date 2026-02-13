import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import SquigglyArrow from "./ui/squiggle-arrow";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Activity, Users, Shield } from "lucide-react";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AppsIcon from "@mui/icons-material/Apps";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";
import { FlipWords } from "./ui/flip-words";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TextPressure from "./TextPressure";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconCloud } from "./magicui/icon-cloud";
import SvgRippleEffect from "./ui/svg-ripple-effect";
import { useTheme } from "../contexts/ThemeContext";
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
import reelCircleDeco from "@/assets/reel-circle-deco.svg";
import marqueeCircleDeco from "@/assets/radial-marquee-circle-deco.svg";
import DefaultSwapy from "./ui/swapy";
import { ContainerScroll } from "./ui/container-scroll-animation";
import ShinyText from "./ShinyText";
import { ChromaText } from "./ui/textRenderAppear";
import { fetchUserCount } from "../utils/statsAPI";
import { BeyondBasicsCards } from "./BeyondBasicsCards";

// Wrapper component that triggers ChromaText animation when visible (animates once, stays visible)
const VisibleChromaText: React.FC<{
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ id, className, delay, duration, children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <span ref={ref}>
      {hasAnimated ? (
        <ChromaText id={id} className={className} delay={delay} duration={duration}>
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

// Screenshot with play button overlay linking to YouTube
const ScrollPlayVideo: React.FC<{
  videoId: string;
  poster?: string;
  className?: string;
}> = ({ videoId, poster = "/screenshot.png", className = "" }) => {
  const handlePlayClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  return (
    <div className={`${className} relative flex items-center justify-center bg-black group cursor-pointer`} onClick={handlePlayClick}>
      <img src={poster} alt="LeetFeedback Screenshot" className="w-full h-full object-cover" />
      <button
        className="absolute flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-110 shadow-2xl"
        onClick={handlePlayClick}
        aria-label="Play video on YouTube"
      >
        <svg
          className="w-8 h-8 md:w-12 md:h-12 text-white ml-1"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </button>
    </div>
  );
};

const Features: React.FC = React.memo(() => {
  const { isDark } = useTheme();
  const [userCount, setUserCount] = useState<number>(23); // Default fallback

  useEffect(() => {
    fetchUserCount().then((count) => {
      if (count !== null && count > 0) {
        setUserCount(count);
      }
    });
  }, []);
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
      title: "Built-in Spaced Repetition (SRS)",
      description:
        "Never forget a pattern. The app automatically schedules revisions for problems you struggled with.",
      benefits: [
        "Smart Calendar for reviews",
        "Dedicated Revisions tab",
        "Anki compatible",
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
      title: "AI Performance Coach",
      description:
        "Receive personalized insights on your study habits, mistake analysis, and consistency tracking.",
      benefits: [
        "Strategic insights",
        "Mistake analysis",
        "Habit tracking",
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
              {/* Handwritten annotation - Your code, but smarter! */}
              <div className="relative mb-2 ml-4 md:ml-32 text-left" aria-hidden>
                <span
                  className="text-white/70 text-xs md:text-sm whitespace-nowrap block"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Your code, but smarter!
                </span>
                <SquigglyArrow
                  width={50}
                  height={35}
                  strokeWidth={2.5}
                  direction="right"
                  variant="smooth"
                  className="text-white/50 ml-4 md:ml-12 mt-1 rotate-45 md:w-[70px] md:h-[50px]"
                />
              </div>
              <div className="relative inline-block">
                {/* Radial Marquee Circle Decoration */}
                <img
                  src={marqueeCircleDeco}
                  alt="Circle decoration"
                  className="absolute inset-0 w-full h-full dark:invert-0 invert"
                  style={{
                    transform: "scale(1.8)",
                    pointerEvents: "none",
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                />
                {/* Horizontal and Vertical Lines */}
                <div
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  aria-hidden="true"
                >
                  {/* Vertical Line */}
                  <div
                    className="absolute bg-border/50"
                    style={{
                      width: "1px",
                      height: "150%",
                      top: "-25%",
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
                <h1 className="text-5xl md:text-7xl text-foreground mb-4 relative z-10">
                  Transform Your Coding Journey
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                Watch how AI turns your{" "}
                <VisibleChromaText
                  id="practice-progress"
                  className="italic text-foreground font-light"
                  delay={0.5}
                  duration={1.2}
                >
                  <span style={{ fontFamily: "'HarmonyOS Sans', system-ui, sans-serif" }}>
                    practice into progress
                  </span>
                </VisibleChromaText>
              </p>
            </div>
          }
        >
          <ScrollPlayVideo videoId="zHgaHDe7QTM" poster="/screenshot.png" className="w-full h-full" />
        </ContainerScroll>
      </div>

      <div className="container">
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
            {/* Handwritten annotation - Fits in your pocket! */}
            <div className="relative mb-2 ml-4 md:ml-32 text-left" aria-hidden>
              <span
                className="text-amber-500/80 text-xs md:text-sm whitespace-nowrap block"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Fits in your pocket!
              </span> 
              <SquigglyArrow
                width={50}
                height={35}
                strokeWidth={2.5}
                direction="right"
                variant="smooth"
                className="text-amber-500/60 ml-4 md:ml-8 mt-1 rotate-45 md:w-[70px] md:h-[50px]"
              />
            </div>
            <div className="relative inline-block">
              {/* Radial Marquee Circle Decoration - Hidden on mobile */}
              <img
                src={marqueeCircleDeco}
                alt="Circle decoration"
                className="absolute inset-0 w-full h-full dark:invert-0 invert hidden md:block"
                style={{
                  transform: "scale(2.5)",
                  pointerEvents: "none",
                  opacity: 0.55,
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
                className="text-5xl md:text-7xl text-foreground mb-6 relative z-10"
                animation="blurInUp"
                delay={0.3}
                by="word"
              >
                Your Pocket DSA Dashboard
              </TextAnimate>
            </div>
            <BlurFade delay={0.5} inView={true}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Track your solves, streaks, and progress all in one clean mobile interface
              </p>
            </BlurFade>
          </div>

          {/* Mobile Screenshots Carousel */}
          <MobileScreenshotsCarousel />

          <div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 container -mx-4 md:mx-0 px-4 md:px-0"
            style={{ fontFamily: "'Britanica', sans-serif" }}
          >
            <BlurFade delay={0.8} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AppsIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Unified History
                </h4>
                <p className="text-sm text-muted-foreground">
                  See your solves from LeetCode, GFG, and CodeForces in one clean timeline
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.9} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrackChangesIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  Performance Metrics
                </h4>
                <p className="text-sm text-muted-foreground">
                  Track time-to-solve, attempt counts, and difficulty breakdown
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={1.0} duration={0.8} inView={true}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AnalyticsIcon className="w-6 h-6 text-primary" />
                </div>
                <h4
                  className="font-semibold text-foreground mb-1"
                  style={{ fontFamily: "'Stinger', sans-serif" }}
                >
                  Daily Goals
                </h4>
                <p className="text-sm text-muted-foreground">
                  Check your streaks, XP progress, and daily targets at a glance
                </p>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Mobile-only: Pocket DSA Dashboard Section */}
        <div className="py-12 md:hidden">
          <div className="text-center mb-6">
            <BlurFade delay={0.1} inView={true}>
              <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
                <ShinyText
                  text="Mobile Experience"
                  speed={3}
                  className="font-mono text-xs"
                />
              </div>
            </BlurFade>
            {/* Handwritten annotation - Fits in your pocket! */}
            <div className="relative mb-2 ml-4 text-left" aria-hidden>
              <span
                className="text-amber-500/80 text-xs whitespace-nowrap block"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Fits in your pocket!
              </span>
              <SquigglyArrow
                width={50}
                height={35}
                strokeWidth={2.5}
                direction="right"
                variant="smooth"
                className="text-amber-500/60 ml-4 mt-1 rotate-45"
              />
            </div>
            <TextAnimate
              as="h2"
              className="text-5xl md:text-7xl text-foreground mb-6 relative z-10 px-4"
              animation="blurInUp"
              delay={0.3}
              by="word"
            >
              Your Pocket DSA Dashboard
            </TextAnimate>
            <BlurFade delay={0.3} inView={true}>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed px-4">
                Track your solves, streaks, and progress on the go
              </p>
            </BlurFade>
          </div>

          {/* Horizontal Scrollable Screenshot Gallery */}
          <BlurFade delay={0.4} inView={true}>
            <div className="relative mb-8">
              <div
                className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {[
                  { src: "/ios1.webp", alt: "Login Page" },
                  { src: "/ios2.webp", alt: "Dashboard" },
                  { src: "/ios3.webp", alt: "Revisions" },
                  { src: "/ios4.webp", alt: "Friends" },
                  { src: "/ios5.webp", alt: "Solvesq" },
                  { src: "/ios6.webp", alt: "Settings" },
                ].map((screenshot, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-36 snap-center"
                  >
                    <div className="bg-border/40 rounded-xl p-1 shadow-lg">
                      <div className="bg-black rounded-lg overflow-hidden">
                        <img
                          src={screenshot.src}
                          alt={screenshot.alt}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">{screenshot.alt}</p>
                  </div>
                ))}
              </div>
              {/* Swipe hint */}
              <p className="text-xs text-muted-foreground/60 text-center mt-1">
                ← Swipe to explore →
              </p>

              {/* YouTube Demo Button for Mobile */}
              <div className="flex justify-center mt-6">
                <a
                  href="https://www.youtube.com/watch?v=zHgaHDe7QTM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 font-medium text-sm group"
                  aria-label="Watch YouTube demo video"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Watch demo on YouTube</span>
                </a>
              </div>
            </div>
          </BlurFade>


        </div>

        {/* Primary Features - Bento Grid Style */}
        <div className="mb-20 mt-20">
          <div className="text-center mb-12">
            <BlurFade delay={0.1} inView={true}>
              <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
                <ShinyText
                  text="Core Features"
                  speed={3}
                  className="font-mono text-xs"
                />
              </div>
            </BlurFade>
            <div className="relative inline-block overflow-hidden">
              {/* Radial Marquee Circle Decoration — visible on mobile and larger (clipped to prevent overflow) */}
              <img
                src={marqueeCircleDeco}
                alt="Circle decoration"
                className="absolute inset-0 w-full h-full dark:invert-0 invert block"
                style={{
                  transform: "scale(2.6)",
                  transformOrigin: 'center center',
                  pointerEvents: "none",
                  opacity: 0.55,
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
                className="text-5xl md:text-7xl text-foreground mb-6 relative z-10"
                animation="blurInUp"
                delay={0.3}
                by="word"
              >
                Everything you need to excel
              </TextAnimate>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0d0d0d] rounded-3xl overflow-hidden border border-white/5">
              {/* GitHub Integration Card - Large */}
              <div className="col-span-full md:col-span-1">
                <div className="p-6 sm:p-12 border-b md:border-b-0 md:border-r border-white/5">
                  <span
                    className="text-gray-500 flex items-center gap-2 text-sm"
                    style={{ fontFamily: "'Stinger', sans-serif" }}
                  >
                    <GitHubIcon className="size-4" />
                    GitHub Integration
                  </span>
                  <p className="mt-8 text-2xl font-semibold text-white">
                    Automatically push your solutions and AI feedback notes to
                    your GitHub repo.
                  </p>
                  <ul className="space-y-3 mt-6">
                    <li className="flex items-center text-sm text-gray-500">
                      <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      <span>Auto-commit solutions with AI analysis</span>
                    </li>
                    <li className="flex items-center text-sm text-muted-foreground">
                      <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      <span>Track your progress over time</span>
                    </li>
                    <li className="flex items-center text-sm text-muted-foreground">
                      <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      <span>Build an impressive portfolio</span>
                    </li>
                  </ul>
                </div>
                <div aria-hidden className="relative border-t border-white/5">
                  <div className="absolute inset-0 z-20 m-auto size-fit top-8">
                    <div className="relative flex size-fit w-fit items-center gap-2 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-medium shadow-lg bg-[#0d0d0d]">
                      <GitHubIcon className="size-4" />
                      <span className="text-white">Pushed 247 solutions this month</span>
                    </div>
                  </div>
                  <div className="relative overflow-hidden h-64 bg-[#0d0d0d]">
                    <div className="absolute inset-0 from-transparent to-[#0d0d0d] via-[#0d0d0d]/50 to-90% bg-gradient-to-b z-10 pointer-events-none"></div>
                    {/* GitHub Contribution Heatmap */}
                    <div className="p-8 pt-16">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 320 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <text
                          x="0"
                          y="18"
                          className="fill-muted-foreground text-[8px]"
                        >
                          Mon
                        </text>
                        <text
                          x="0"
                          y="42"
                          className="fill-muted-foreground text-[8px]"
                        >
                          Wed
                        </text>
                        <text
                          x="0"
                          y="66"
                          className="fill-muted-foreground text-[8px]"
                        >
                          Fri
                        </text>
                        {/* Simplified heatmap grid */}
                        {Array.from({ length: 21 }).map((_, weekIndex) => (
                          <g key={weekIndex}>
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              const opacity =
                                Math.random() > 0.3
                                  ? 0.5 + Math.random() * 0.5
                                  : 0.2;
                              const isHighActivity = opacity > 0.8;
                              return (
                                <rect
                                  key={dayIndex}
                                  x={30 + weekIndex * 13}
                                  y={10 + dayIndex * 12}
                                  width="10"
                                  height="10"
                                  rx="2"
                                  className={
                                    isHighActivity
                                      ? "fill-green-600 dark:fill-green-400"
                                      : "fill-green-500 dark:fill-green-500"
                                  }
                                  opacity={opacity}
                                />
                              );
                            })}
                          </g>
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Analysis Card */}
              <div className="overflow-hidden border-b md:border-b-0 md:border-l p-6 sm:p-12 bg-[#0d0d0d]">
                <span
                  className="text-gray-500 flex items-center gap-2 text-sm"
                  style={{ fontFamily: "'Stinger', sans-serif" }}
                >
                  <Activity className="size-4" />
                  AI Analysis
                </span>
                <p className="mt-8 text-2xl font-semibold text-white">
                  AI analysis of all your attempts at your fingertips.
                </p>

                {/* Problem Card with AI Analysis */}
                <div className="relative mt-8 bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden">

                  {/* Problem Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Britanica', sans-serif" }}>Next Permutation</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold" style={{ color: 'rgb(255, 190, 20)' }}>Medium</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">Arrays</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-sm" style={{ color: 'rgb(255, 182, 193)' }}>+20 ★</span>
                        <div className="text-xs text-gray-500 mt-0.5">via Chrome</div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        <span className="font-medium">Language: Java</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        <span className="font-medium">Attempts: 4</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span className="font-medium">Time: 13m 43s</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis Section */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Activity className="size-4 text-pink-600 dark:text-pink-400" />
                      <h4 className="font-bold text-white" style={{ fontFamily: "'Britanica', sans-serif" }}>AI Analysis</h4>
                    </div>

                    {/* Key Issues */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        <span className="font-bold text-white">1. Key Issues:</span> Attempt 1 had a syntax error (missing variable declaration). Early attempts contained loop logic errors (incrementing instead of decrementing) and array bounds issues. Specifically, the swap-search loop used i++ and the reversal started at the pivot rather than the suffix.
                      </p>
                    </div>

                    {/* Evolution */}
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        <span className="font-bold text-white">2. Evolution:</span> The code improved by correcting variable scopes, fixing the search direction for the successor element, and adjusting the <code className="px-1 py-0.5 rounded bg-[#0d0d0d] text-xs font-mono" style={{ color: 'rgb(240, 40, 50)' }}>reverseArr</code> indices to correctly target only the suffix.
                      </p>
                    </div>

                    {/* Mistake Tags */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <svg className="size-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                        <span className="text-sm font-bold text-white">Mistake Tags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0d0d0d] text-white border border-white/10">Logic Error</span>
                        <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0d0d0d] text-white border border-white/10">Syntax Error</span>
                        <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0d0d0d] text-white border border-white/10">Off By One</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">
                  * This is real data generated by our app, not placeholder content.
                </p>
              </div>

              {/* Stats Card - Full Width */}
              <div
                className="col-span-full border-b border-white/5 p-12 bg-[#0d0d0d]"
                style={{ fontFamily: "'Figurlce', sans-serif" }}
              >
                <div className="text-center">
                  <div
                    className="text-5xl md:text-7xl font-bold mb-4"
                    style={{ fontFamily: "'Figurlce', sans-serif" }}
                  >
                    <NumberTicker value={userCount} className="text-white" />
                    <span
                      className="text-primary"
                      style={{ fontFamily: "'Figurlce', sans-serif" }}
                    >
                      +
                    </span>
                  </div>
                  <p className="text-xl text-gray-500"><VisibleChromaText id="happy-users" className="font-light" delay={0.8} duration={1.0}>Happy</VisibleChromaText> users</p>
                </div>
              </div>

              {/* Anki Cards Generation Card - Full Width */}
              <div className="relative col-span-full min-h-[320px] overflow-hidden bg-[#0d0d0d]">
                {/* Large rotated Anki icon - hidden on mobile */}
                <div className="hidden md:block absolute right-[-10%] top-1/2 -translate-y-1/2 pointer-events-none z-0">
                  <img
                    src="/icons8-anki.svg"
                    alt=""
                    className="w-[400px] h-[400px] rotate-[-12deg] opacity-90"
                  />
                </div>

                {/* Smooth progressive fade overlay - hidden on mobile */}
                <div
                  className="hidden md:block absolute right-[19%] top-0 bottom-0 w-[120px] z-[1] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, #0d0d0d 0%, rgba(13, 13, 13, 0.8) 30%, rgba(13, 13, 13, 0.4) 60%, transparent 100%)",
                  }}
                ></div>

              {/* Text content - left side */}
              <div className="relative z-10 md:max-w-md px-6 pt-6 pb-8 md:px-12 md:pt-12 md:pb-12">
                <span
                  className="text-gray-500 flex items-center gap-2 text-sm"
                  style={{ fontFamily: "'Stinger', sans-serif" }}
                >
                  <StyleIcon className="size-4" />
                  Built-in Spaced Repetition (SRS)
                </span>
                <p className="my-8 text-2xl font-semibold text-white">
                  Never forget a pattern.{" "}
                  <VisibleChromaText id="spaced-repetition" className="text-muted-foreground font-light" delay={1.2} duration={1.2}>
                    The app automatically schedules revisions for problems you struggled with.
                  </VisibleChromaText>
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>Smart Calendar tells you what to review today</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>Dedicated "Revisions" tab for scheduled reviews</span>
                  </li>
                  <li className="flex items-center text-sm text-gray-500">
                    <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                    <span>Anki compatible - auto-export flashcards</span>
                  </li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>

      {/* Power Features - Professional Cards */}
      <div className="mb-20">
        {/* Section Title */}
        <div className="text-center mb-16 overflow-visible">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-foreground italic mb-4">
            <VisibleChromaText id="beyond-basics" className="font-light text-foreground" delay={1.8} duration={1.5}>
              BEYOND BASICS
            </VisibleChromaText>
          </h2>
          <div
            className="text-md sm:text-lg md:text-xl lg:text-2xl text-muted-foreground font-light break-words"
            style={{ fontFamily: "'Stinger', sans-serif" }}
          >
            Features to{" "}
            <FlipWords
              words={["transform", "accelerate", "supercharge"]}
              className="text-foreground font-bold inline-block"
              duration={2500}
            />{" "}
            your growth — plus personalized themes to match your style
          </div>
        </div>

        {/* Professional Features Grid */}
        <section className="bg-transparent py-8">
          <div className="container">
            <BeyondBasicsCards />
          </div>
        </section>
      </div>

      {/* Feature Highlight Section - GitHub Integration Focus */}
      <div className="container">
        <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center">
                <ShinyText
                  text="GitHub Integration"
                  speed={3}
                  className="font-mono text-xs"
                />
              </div>
              <h3 className="text-3xl mb-6 text-white">
                Build your coding portfolio automatically
              </h3>
              <p className="text-lg text-zinc-300 mb-8 leading-relaxed">
                Every solution you complete gets automatically committed to your
                GitHub with AI-generated feedback notes, creating a kind of{" "}
                <span className="text-red-400 font-bold">coding journal</span>{" "}
                that <VisibleChromaText id="showcases-growth" className="font-light" delay={0.5} duration={1.2}>showcases your growth to employers.</VisibleChromaText>
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Figurlce', sans-serif" }}
                  >
                    500+
                  </div>
                  <div className="text-sm text-zinc-400">
                    Auto-commits per month
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-3xl font-bold text-green-400 mb-2"
                    style={{ fontFamily: "'Figurlce', sans-serif" }}
                  >
                    100%
                  </div>
                  <div className="text-sm text-zinc-400">
                    Developers Find themselves more productive
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl shadow-xl p-6 font-mono text-sm">
                <div className="flex items-center justify-between mb-4 text-zinc-400">
                  <span className="font-mono">📁 my-dsa-journey</span>
                  <GitHubIcon className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2 text-zinc-400">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">+</span>
                    <span>solutions/two-sum.py</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">+</span>
                    <span>feedback/two-sum-analysis.md</span>
                  </div>
                  <div className="mt-4 p-3 bg-zinc-900/50 rounded border-l-4 border-blue-400">
                    <div className="text-blue-400 text-xs mb-1 font-mono">
                      AI Feedback:
                    </div>
                    <div className="text-zinc-200 text-xs">
                      "Your solution works but some edge cases are not
                      covered..."
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-zinc-900 text-sm font-bold animate-pulse">
                ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
});

// Mobile Screenshots Carousel Component
const MobileScreenshotsCarousel: React.FC = () => {
  const [scrollX, setScrollX] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  const screenshots = [
    { src: "/ios1.webp", alt: "Mobile Dashboard" },
    { src: "/ios2.webp", alt: "Problem View" },
    { src: "/ios3.webp", alt: "Statistics" },
    { src: "/ios4.webp", alt: "Profile" },
    { src: "/ios5.webp", alt: "Login page" },
    { src: "/ios6.webp", alt: "Dashboard" },
    { src: "/ios7.webp", alt: "Progress Tracking" },
    { src: "/ios8.webp", alt: "Settings" },
  ];

  // Scroll-linked infinite carousel
  React.useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;

      const element = carouselRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate scroll progress through the section
        const elementHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1,
          (windowHeight - rect.top) / (windowHeight + elementHeight)
        ));

        // Map scroll progress to horizontal scroll (3 full cycles through all images)
        const totalScrollDistance = 300; // percentage
        setScrollX(scrollProgress * totalScrollDistance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Triple the screenshots for infinite loop effect
  const infiniteScreenshots = [...screenshots, ...screenshots, ...screenshots];

  return (
    <div ref={carouselRef} className="relative w-full py-8">
      <div className="relative max-w-5xl mx-auto">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6"
            style={{
              x: `-${scrollX}%`,
            }}
            transition={{
              type: "tween",
              ease: "linear",
              duration: 0.1,
            }}
          >
            {infiniteScreenshots.map((screenshot, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 md:w-56 lg:w-64"
              >
                <div className="relative select-none">
                  <div className="bg-border/40 rounded-xl p-1.5 shadow-xl">
                    <div className="bg-black rounded-xl overflow-hidden">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="w-full h-auto object-contain pointer-events-none select-none"
                        loading="lazy"
                        draggable="false"
                        onDragStart={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
