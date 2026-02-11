import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { animate, stagger } from "animejs";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { AnimatedClipButton } from "../components/ui/animated-clip-button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextEffect } from "../components/ui/text-effect";
import { ChromaText } from "../components/ui/textRenderAppear";

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
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <span ref={ref}>
      {hasAnimated ? (
        <ChromaText
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
import { analytics } from "../utils/analytics";
import ShinyText from "../components/ShinyText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlagIcon from "@mui/icons-material/Flag";
import GitHubIcon from "@mui/icons-material/GitHub";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Users, Code2, Sparkles } from "lucide-react";
import roadmapVisual from "../assets/support-icons/roadmap-visual.svg";

// Animated progress bar component
const AnimatedProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    animate(barRef.current, {
      width: `${progress}%`,
      duration: 1800,
      ease: "outExpo",
      delay: 300,
    });
  }, [progress]);

  return (
    <div className="relative w-full h-2 bg-muted/30 rounded-full overflow-hidden mt-4">
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-blue-500 to-primary rounded-full"
        style={{ width: "0%" }}
      />
    </div>
  );
};

// Simple phase data
interface PhaseInfo {
  phase: string;
  completedDate?: string;
  status: "completed" | "in-development";
}

const phases: PhaseInfo[] = [
  { phase: "Phase 1", completedDate: "May 2025", status: "completed" },
  { phase: "Phase 2", completedDate: "August 2025", status: "completed" },
  { phase: "Phase 3", completedDate: "October 2025", status: "completed" },
  { phase: "Phase 4", completedDate: "December 29, 2025", status: "completed" },
];

const RoadmapPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Hero scroll tracking
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Simple fade-in animation for stats
  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(".stat-card", {
        opacity: [0, 1],
        delay: stagger(100),
        duration: 600,
        ease: "outQuad",
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, []);

  // Animation values for the hero SVG
  const svgScale = useTransform(heroScrollProgress, [0, 0.5], [1, 1.1]);
  const svgOpacity = useTransform(
    heroScrollProgress,
    [0, 0.3, 0.5],
    [1, 0.9, 0.7],
  );
  const svgY = useTransform(heroScrollProgress, [0, 0.5], [0, -30]);

  const completedCount = phases.filter((p) => p.status === "completed").length;
  const progressPercentage = Math.round((completedCount / phases.length) * 100);

  return (
    <>
      <main>
        {/* Hero Section */}
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

            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center overflow-visible">
                <div className="text-left sm:mx-0 lg:mr-auto lg:mt-0">
                  {/* Progress Badge */}
                  <BlurFade delay={0.25}>
                    <div className="mb-10">
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 text-sm font-mono hover:bg-blue-500/30 opacity-90">
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        <ShinyText
                          text={`${progressPercentage}% Complete`}
                          speed={3}
                          className="text-sm font-mono"
                        />
                      </Badge>
                    </div>
                  </BlurFade>

                  {/* Main Heading with TextEffect */}
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="mt-0 text-5xl md:text-7xl leading-tight"
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
                    <Card
                      ref={statsRef}
                      className="bg-card/50 border border-border backdrop-blur-sm rounded-3xl mt-12 relative overflow-hidden"
                    >
                      <CardContent className="p-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                          <div
                            className="stat-card text-center py-4 md:py-0"
                            style={{ opacity: 0 }}
                          >
                            <CheckCircleIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">
                              {completedCount}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Phases Complete
                            </div>
                          </div>
                          <div
                            className="stat-card text-center py-4 md:py-0"
                            style={{ opacity: 0 }}
                          >
                            <AutoAwesomeIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">
                              8
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Months of Work
                            </div>
                          </div>
                          <div
                            className="stat-card text-center py-4 md:py-0"
                            style={{ opacity: 0 }}
                          >
                            <FlagIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                            <div className="text-2xl font-bold text-foreground">
                              3
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Major Milestones
                            </div>
                          </div>
                        </div>
                        <AnimatedProgressBar progress={progressPercentage} />
                      </CardContent>
                    </Card>
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

        {/* Thank You & Our Journey Section */}
        <section className="relative py-24 border-t border-border/20">
          <div className="container">
            {/* Thank You Message */}
            <BlurFade delay={0.2}>
              <div className="text-center mb-16">
                <div className="mb-6">
                  <VolunteerActivismIcon className="w-16 h-16 text-primary mx-auto" />
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-foreground mb-6">
                  Thank You for Being Part of Our Journey
                </h2>
                <div className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed space-y-4">
                  <p>
                    <VisibleChromaText id="thank-you-1" delay={0.3} duration={1.4}>
                      To be fair no one really supported this project, and I've worked on it for almost a year at this point. The origins of this project lie in TakeUForward to Github Chrome extension. I learnt JS to build that thing and in the process I realised this is something that I can build a product around.
                    </VisibleChromaText>
                  </p>
                  <p>
                    <VisibleChromaText id="thank-you-2" delay={0.5} duration={1.4}>
                      The project got a good kick during SIH hackathon thanks to my teammates who suggested wonderful ideas. So, right now our vision is to provide a student-first Learning platform, and a trust platform for recruiters to find the best talent.
                    </VisibleChromaText>
                  </p>
                  <p>
                    <VisibleChromaText id="thank-you-3" delay={0.7} duration={1.4}>
                      Recruiters will be able to detect how honest a student has been during their DSA journey. I understand no matter the amount of checks I have on extension side, they all can be fooled. But there will be a way around this.
                    </VisibleChromaText>
                  </p>
                  <p>
                    <VisibleChromaText id="thank-you-4" delay={0.9} duration={1.4}>
                      Anyway, I'm sure you have noted the attention to detail. This is just me being me, I love design, but hate writing frontend code. I have plans to make a component library for the components I have used/modified for this website. Someday.
                    </VisibleChromaText>
                  </p>
                  <p>
                    <VisibleChromaText id="thank-you-5" delay={1.1} duration={1.4}>
                      If you are reading this, Thank you. If you use this product, please report bugs, I'm sure there are a lot.
                    </VisibleChromaText>
                  </p>
                </div>
              </div>
            </BlurFade>

            {/* Simplified Phase Timeline */}
            <BlurFade delay={0.4}>
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
                  Our Journey
                </h3>
                <div className="space-y-4">
                  {phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${phase.status === "completed"
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/30 border-border/50"
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        {phase.status === "completed" ? (
                          <CheckCircleIcon className="w-6 h-6 text-primary" />
                        ) : (
                          <AutoAwesomeIcon className="w-6 h-6 text-muted-foreground" />
                        )}
                        <span className="text-lg font-medium text-foreground">
                          {phase.phase}
                        </span>
                      </div>
                      <div className="text-right">
                        {phase.status === "completed" && phase.completedDate ? (
                          <span className="text-sm font-medium text-primary">
                            Completed {phase.completedDate}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            In Development
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Open Source Community Section */}
        <section className="py-24 bg-background border-t border-border/20">
          <div className="container">
            <div className="container-medium">
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
                      <h3 className="text-3xl md:text-4xl font-semibold text-white mb-3">
                        Join Our Open Source Journey
                      </h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        Help us build the future of coding practice tools
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-10">
                      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <Users className="w-4 h-4 text-green-400" />
                          <span className="text-xl font-bold text-white font-mono">
                            50+
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          Contributors
                        </span>
                      </div>
                      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <Code2 className="w-4 h-4 text-blue-400" />
                          <span className="text-xl font-bold text-white font-mono">
                            10k+
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          Lines of Code
                        </span>
                      </div>
                      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <Sparkles className="w-4 h-4 text-yellow-400" />
                          <span className="text-xl font-bold text-white font-mono">
                            4
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          Phases Planned
                        </span>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <AnimatedClipButton
                        text="Contribute on GitHub"
                        icon={<GitHubIcon className="w-4 h-4" />}
                        iconPosition="left"
                        variant="white"
                        size="lg"
                        className="rounded-full px-6 font-medium"
                        onClick={() => {
                          analytics.trackFeatureClick("contribute_github");
                          window.open(
                            "https://github.com/lqSky7/leetFeedback-extension",
                            "_blank",
                          );
                        }}
                      />
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-zinc-600 text-zinc-100 hover:bg-zinc-800 hover:text-white rounded-full px-6 font-medium"
                        onClick={() =>
                          (window.location.href = "mailto:catince@outlook.com")
                        }
                      >
                        Join Our Team
                      </Button>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RoadmapPage;
