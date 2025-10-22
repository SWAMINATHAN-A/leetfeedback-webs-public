import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { Timeline } from "../components/ui/timeline";
import { TextEffect } from "../components/ui/text-effect";
import {
  Phase1Swapy,
  Phase2Swapy,
  Phase3Swapy,
  Phase4Swapy,
} from "../components/roadmap/PhaseSwapy";
import { analytics } from "../utils/analytics";
import Silk from "../components/Silk";
import ShinyText from "../components/ShinyText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TimelineIcon from "@mui/icons-material/Timeline";
import HubIcon from "@mui/icons-material/Hub";
import GitHubIcon from "@mui/icons-material/GitHub";
import FlagIcon from "@mui/icons-material/Flag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TargetIcon from "@mui/icons-material/MyLocation";
import GroupsIcon from "@mui/icons-material/Groups";
import { Users, Code2, Bug, Sparkles } from "lucide-react";
import roadmapVisual from "../assets/support-icons/roadmap-visual.svg";

interface RoadmapPhase {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  phase: string;
  milestone?: string;
  icon: React.ComponentType<any>;
  features: string[];
  timeline: string;
}

const RoadmapPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  // Hero scroll tracking
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Page-wide scroll tracking for the animated path
  const { scrollYProgress } = useScroll();

  // Animation values for the hero SVG
  const svgScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.1]);
  const svgOpacity = useTransform(
    heroScrollProgress,
    [0, 0.3, 0.5],
    [1, 0.9, 0.7]
  );
  const svgY = useTransform(heroScrollProgress, [0, 0.5], [0, -30]);

  const roadmapPhases: RoadmapPhase[] = [
    {
      id: 1,
      title: "Foundation & Core Features",
      description:
        "We built the essential groundwork with seamless integrations for LeetCode and GeeksforGeeks, creating an intuitive extension popup interface. The foundation includes robust user authentication, automatic GitHub repository creation, and intelligent solution auto-commit functionality that tracks your problem-solving journey from the very first line of code.",
      completed: true,
      phase: "Phase 1",
      timeline: "2025 Q1-Q2",
      milestone: "Beta Launch",
      icon: RocketLaunchIcon,
      features: [
        "LeetCode & GeeksforGeeks integration",
        "Extension popup interface",
        "Basic problem tracking",
        "User authentication system",
        "GitHub repository creation",
        "Solution auto-commit functionality",
      ],
    },
    {
      id: 2,
      title: "AI Intelligence & Productivity Tools",
      description:
        "Leveraging cutting-edge AI technology, we introduced intelligent mistake pattern recognition that learns from your coding patterns. This phase brought automated GitHub analysis reports, smart insights generation, and seamless Notion workspace integration. Enhanced with ANKI flashcard generation and a sophisticated revision scheduling system to optimize your learning workflow.",
      completed: true,
      phase: "Phase 2",
      timeline: "2025 Q2-Q3",
      milestone: "Public Beta",
      icon: AutoAwesomeIcon,
      features: [
        "AI mistake pattern recognition",
        "Automated GitHub analysis reports",
        "Smart insights generation",
        "Notion workspace integration",
        "ANKI flashcard generation",
        "Revision scheduling system",
      ],
    },
    {
      id: 3,
      title: "Analytics & Visualization",
      description:
        "Transform your coding data into actionable insights with our comprehensive analytics dashboard. Featuring advanced performance metrics visualization, progress comparison tools, and custom reporting features. Track your time investment, analyze difficulty progression, and gain deep insights into your learning patterns to accelerate your growth.",
      completed: false,
      phase: "Phase 3",
      timeline: "2025 Q3-Q4",
      icon: TimelineIcon,
      features: [
        "Advanced analytics dashboard",
        "Performance metrics visualization",
        "Progress comparison tools",
        "Custom reporting features",
        "Time tracking analytics",
        "Difficulty progression insights",
      ],
    },
    {
      id: 4,
      title: "Platform Expansion & Advanced Features",
      description:
        "Expanding our reach across the coding practice ecosystem with support for TUF+, CodeChef, HackerRank, and Codeforces. This phase introduces a powerful mobile companion app for learning on-the-go, team collaboration features for group practice, an engaging achievement system with gamification elements, and enterprise-grade admin controls for organizations.",
      completed: false,
      phase: "Phase 4",
      timeline: "2026 Q1+",
      milestone: "Full Release",
      icon: HubIcon,
      features: [
        "TUF+, CodeChef, HackerRank support",
        "Codeforces integration",
        "Mobile companion app",
        "Team collaboration features",
        "Achievement system & gamification",
        "Enterprise admin controls",
      ],
    },
  ];

  const completedCount = roadmapPhases.filter((item) => item.completed).length;
  const progressPercentage = Math.round(
    (completedCount / roadmapPhases.length) * 100
  );

  // Timeline data for the new Timeline component
  const timelineData = roadmapPhases.map((phase, index) => {
    const getPhaseComponent = () => {
      switch (phase.id) {
        case 1:
          return <Phase1Swapy />;
        case 2:
          return <Phase2Swapy />;
        case 3:
          return <Phase3Swapy />;
        case 4:
          return <Phase4Swapy />;
        default:
          return <Phase1Swapy />;
      }
    };

    return {
      title: `${phase.phase} - ${phase.timeline}`,
      content: (
        <div className="space-y-8">
          {/* Phase Card - Text and Description Focused */}
          <Card
            className={`overflow-hidden rounded-3xl transition-all duration-300 backdrop-blur-xl ${
              phase.id === 1
                ? "bg-gradient-to-br from-rose-200/10 via-background/95 to-background/95 border-rose-300/30"
                : phase.id === 2
                ? "bg-gradient-to-br from-blue-200/10 via-background/95 to-background/95 border-blue-300/30"
                : phase.completed
                ? "bg-gradient-to-br from-background/95 via-background/95 to-background/95 border-border/30 opacity-90"
                : "bg-gradient-to-br from-primary/5 via-background/95 to-background/95 border-border/30"
            }`}
          >
            <CardContent className="p-8">
              {/* Header with Icon and Status */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                      phase.id === 1
                        ? "bg-rose-200/20"
                        : phase.id === 2
                        ? "bg-blue-200/20"
                        : phase.id === 3
                        ? "bg-purple-200/20"
                        : phase.id === 4
                        ? "bg-pink-200/20"
                        : "bg-gradient-to-br from-primary/80 to-primary"
                    }`}
                  >
                    <phase.icon
                      className={`w-7 h-7 ${
                        phase.id === 1
                          ? "text-rose-500 dark:text-rose-400"
                          : phase.id === 2
                          ? "text-blue-500 dark:text-blue-400"
                          : phase.id === 3
                          ? "text-purple-500 dark:text-purple-400"
                          : phase.id === 4
                          ? "text-pink-500 dark:text-pink-400"
                          : "text-white"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed font-light">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {phase.milestone && (
                  <div className="px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
                    <ShinyText
                      text={phase.milestone}
                      speed={3}
                      className="text-sm font-normal"
                    />
                  </div>
                )}
              </div>

              {/* Features as flowing text description */}
              <div
                className={`p-6 rounded-2xl mb-6 ${
                  phase.id === 1
                    ? "bg-rose-200/10 border border-rose-300/30"
                    : phase.id === 2
                    ? "bg-blue-200/10 border border-blue-300/30"
                    : phase.id === 3
                    ? "bg-purple-200/10 border border-purple-300/30"
                    : phase.id === 4
                    ? "bg-pink-200/10 border border-pink-300/30"
                    : "bg-muted/20 border border-border/30"
                }`}
              >
                <p className="text-sm text-foreground leading-relaxed font-light">
                  {phase.features.join(" • ")}
                </p>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    phase.id === 1
                      ? "bg-rose-200/20 border border-rose-300/30"
                      : phase.id === 2
                      ? "bg-blue-200/20 border border-blue-300/30"
                      : "bg-muted/30 border border-border/30"
                  }`}
                >
                  {phase.completed ? (
                    <>
                      <CheckCircleIcon
                        className={`w-4 h-4 ${
                          phase.id === 1
                            ? "text-rose-600 dark:text-rose-400"
                            : phase.id === 2
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-muted-foreground"
                        }`}
                      />
                      <div
                        className={`${
                          phase.id === 1
                            ? "text-rose-700 dark:text-rose-300"
                            : phase.id === 2
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-muted-foreground"
                        }`}
                      >
                        <ShinyText
                          text="Completed"
                          speed={3}
                          className="text-sm font-normal"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <RadioButtonUncheckedIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-normal text-muted-foreground">
                        In Development
                      </span>
                    </>
                  )}
                </div>

                <span className="text-sm font-mono text-muted-foreground">
                  {phase.timeline}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Phase-specific Swapy Component */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full" />
              Interactive Preview
            </h4>
            {getPhaseComponent()}
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <main>
        {/* Hero Section - Redesigned like main page */}
        <section
          ref={heroRef}
          id="roadmap"
          className="relative overflow-hidden -mt-20 pt-28 pb-32"
        >
          {/* Gradient backgrounds */}
          <div
            aria-hidden
            className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
          >
            <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
            <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
            <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            <div className="container relative mx-auto px-4 md:px-8 max-w-7xl overflow-visible">
              <div className="grid lg:grid-cols-2 gap-12 items-start overflow-visible">
                <div className="text-left sm:mx-0 lg:mr-auto lg:mt-0">
                  {/* Progress Badge */}
                  <BlurFade delay={0.25}>
                    <div className="mb-10">
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 text-sm font-mono hover:bg-blue-500/30">
                        <TrendingUpIcon className="w-4 h-4 mr-2" />
                        {progressPercentage}% Complete
                      </Badge>
                    </div>
                  </BlurFade>

                  {/* Main Heading with TextEffect */}
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="mt-0 max-w-4xl text-balance text-5xl md:text-7xl leading-tight"
                  >
                    Development Roadmap
                  </TextEffect>

                  {/* Subheadline with TextEffect */}
                  <TextEffect
                    per="line"
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    delay={0.5}
                    as="p"
                    className="mt-8 max-w-3xl text-balance text-xl md:text-2xl text-muted-foreground leading-relaxed"
                  >
                    Follow our journey as we build the future of coding
                    practice. Transparent development with community-driven
                    features.
                  </TextEffect>

                  {/* Progress Stats */}
                  <BlurFade delay={1}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                      <Card className="bg-card/50 border border-border backdrop-blur-sm">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <CheckCircleIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">
                              {completedCount}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Phases Complete
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-card/50 border border-border backdrop-blur-sm">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <AutoAwesomeIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">
                              {roadmapPhases.length - completedCount}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              In Development
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-card/50 border border-border backdrop-blur-sm">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <FlagIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">
                              {
                                roadmapPhases.filter((item) => item.milestone)
                                  .length
                              }
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Major Milestones
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </BlurFade>
                </div>

                {/* Timeline Preview on the right */}
                <BlurFade
                  delay={0.5}
                  direction="up"
                  duration={1.5}
                  offset={12}
                  blur="12px"
                  className="hidden lg:block relative mt-10"
                >
                  <motion.div
                    className="relative w-full overflow-visible max-h-96"
                    style={{
                      scale: svgScale,
                      opacity: svgOpacity,
                      y: svgY,
                    }}
                  >
                    <img
                      src={roadmapVisual}
                      alt="Roadmap Phases Visualization"
                      className="w-[160%] max-w-none h-auto translate-x-12"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, black 0%, black 40%, transparent 90%), linear-gradient(to right, black 0%, black 60%, transparent 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black 0%, black 40%, transparent 90%), linear-gradient(to right, black 0%, black 60%, transparent 100%)",
                        WebkitMaskComposite: "source-in",
                        filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1))",
                      }}
                    />
                  </motion.div>
                </BlurFade>
              </div>
            </div>
          </div>

          {/* Bottom separator */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mt-32"></div>
        </section>

        {/* Roadmap Timeline - "Our Journey" Section */}
        <section className="relative py-24 border-t border-border/20 min-h-[200vh] overflow-hidden">
          {/* Background Blur Effect - More Visible */}
          <div className="absolute inset-0 bg-muted/30 backdrop-blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />

          {/* Animated SVG Path Overlay */}
          <RoadmapPath scrollYProgress={scrollYProgress} />

          <div className="container relative z-10 mx-auto px-4 md:px-8">
            {/* Timeline Component */}
            <BlurFade delay={1}>
              <div className="w-full max-w-6xl mx-auto">
                <Timeline data={timelineData} />
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-24 bg-background border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Open Source Contribution */}
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
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground text-center">
                    Join Our Open Source Journey
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-6 text-center">
                    Help us build the future of coding practice tools
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <RainbowButton
                      size="lg"
                      className="px-6 py-3 text-base font-semibold"
                      onClick={() => {
                        analytics.trackFeatureClick("contribute_github");
                        window.open(
                          "https://github.com/lqSky7/leetFeedback-extension",
                          "_blank"
                        );
                      }}
                    >
                      <GitHubIcon className="w-4 h-4 mr-2" />
                      Contribute on GitHub
                    </RainbowButton>
                    <RainbowButton
                      variant="outline"
                      size="lg"
                      className="px-6 py-3 text-base font-semibold"
                      onClick={() =>
                        (window.location.href = "mailto:catince@outlook.com")
                      }
                    >
                      Join Our Team
                    </RainbowButton>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

// Animated SVG Path Component
const RoadmapPath = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="hsl(var(--primary))"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          pathLength,
          strokeDasharray: "1 1",
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

export default RoadmapPage;
