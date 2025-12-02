import React, { useCallback, useEffect, useRef, useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import SecurityIcon from "@mui/icons-material/Security";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Download, Code2, Share2, BarChart3 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { animate, stagger } from "animejs";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "./ui/glowing-stars";
import TextPressure from "./TextPressure";
import leetcodeIcon from "@/assets/support-icons/leetcode-svgrepo-com.svg";
import ShinyText from "./ShinyText";
import geeksforgeeksIcon from "@/assets/support-icons/geeksforgeeks.svg";
import hackerrankIcon from "@/assets/support-icons/hackerrank-svgrepo-com.svg";
import codechefIcon from "@/assets/support-icons/codechef-svgrepo-com.svg";
import tufIcon from "@/assets/support-icons/tuf.svg";
import notionIcon from "@/assets/support-icons/notion.svg";
import ankiIcon from "@/assets/support-icons/anki.svg";
import geminiIcon from "@/assets/support-icons/gemini.svg";

// Line art doodle SVG paths - continuous single line drawings (dense, spanning entire box)
const doodlePaths = {
  // Step 1: Download/Install - dense network of download arrows and connection nodes
  install: `M 50 50 Q 100 80 150 50 Q 200 20 250 60 Q 300 100 350 60 Q 400 20 450 70 Q 500 120 550 70 Q 600 20 650 80 Q 700 140 750 80 Q 800 20 850 90 Q 900 160 950 100
    M 50 150 L 100 200 L 50 250 M 100 200 L 150 200 Q 200 200 200 150 L 200 100
    M 250 120 Q 300 180 350 140 Q 400 100 450 160 Q 500 220 550 160 Q 600 100 650 180 Q 700 260 750 180 Q 800 100 850 200 Q 900 300 950 220
    M 50 300 Q 120 260 180 320 Q 240 380 300 320 Q 360 260 420 340 Q 480 420 540 340 Q 600 260 660 360 Q 720 460 780 360 Q 840 260 900 380 Q 960 500 950 400
    M 100 400 L 150 450 L 100 500 M 150 450 Q 200 450 250 400 Q 300 350 350 420 Q 400 490 450 420 Q 500 350 550 440 Q 600 530 650 450 Q 700 370 750 480 Q 800 590 850 480
    M 50 550 Q 150 500 250 560 Q 350 620 450 540 Q 550 460 650 560 Q 750 660 850 560 Q 950 460 1000 550`,
  // Step 2: Code/Practice - dense code brackets, curly braces, and flowing syntax
  code: `M 30 30 L 80 30 L 80 80 L 30 80 Z M 100 50 Q 150 20 200 60 Q 250 100 300 50 Q 350 0 400 60 Q 450 120 500 60 Q 550 0 600 80 Q 650 160 700 80 Q 750 0 800 100 Q 850 200 900 100 Q 950 0 1000 80
    M 50 120 L 100 180 L 50 240 M 120 180 Q 180 120 240 180 Q 300 240 360 180 Q 420 120 480 200 Q 540 280 600 200 Q 660 120 720 220 Q 780 320 840 220 Q 900 120 960 240
    M 30 280 Q 80 320 130 280 Q 180 240 230 300 Q 280 360 330 300 Q 380 240 430 320 Q 480 400 530 320 Q 580 240 630 340 Q 680 440 730 340 Q 780 240 830 360 Q 880 480 930 360
    M 50 400 L 80 450 L 50 500 M 100 380 Q 160 440 220 380 Q 280 320 340 400 Q 400 480 460 400 Q 520 320 580 420 Q 640 520 700 420 Q 760 320 820 440 Q 880 560 940 440
    M 70 520 Q 140 480 210 540 Q 280 600 350 520 Q 420 440 490 540 Q 560 640 630 540 Q 700 440 770 560 Q 840 680 910 560 Q 980 440 1000 560`,
  // Step 3: Export/Sync - branching paths like git, arrows flowing outward
  export: `M 450 500 Q 450 450 400 420 Q 350 390 350 340 Q 350 290 400 260 Q 450 230 450 180 Q 450 130 400 100 Q 350 70 350 20 M 450 500 Q 450 450 500 420 Q 550 390 550 340 Q 550 290 600 260 Q 650 230 650 180 Q 650 130 700 100 Q 750 70 750 20 M 450 500 Q 500 480 550 500 Q 600 520 650 500 Q 700 480 750 500 Q 800 520 850 500 Q 900 480 950 500 M 350 340 Q 280 340 250 290 Q 220 240 150 240 Q 80 240 50 190 M 550 340 Q 620 340 650 380 Q 680 420 750 420 Q 820 420 850 460
    M 200 500 Q 200 450 150 420 Q 100 390 100 340 Q 100 290 50 260
    M 300 340 Q 250 300 200 340 Q 150 380 100 340 Q 50 300 0 360
    M 700 340 Q 750 300 800 340 Q 850 380 900 340 Q 950 300 1000 360
    M 450 580 Q 500 620 550 580 Q 600 540 650 600 Q 700 660 750 600 Q 800 540 850 620`,
  // Step 4: Track/Analytics - dense chart lines, data points, and growth curves
  track: `M 0 500 Q 50 480 100 450 Q 150 420 200 380 Q 250 340 300 320 Q 350 300 400 260 Q 450 220 500 200 Q 550 180 600 140 Q 650 100 700 80 Q 750 60 800 40 Q 850 20 900 10 Q 950 0 1000 20
    M 0 400 Q 80 420 160 380 Q 240 340 320 360 Q 400 380 480 320 Q 560 260 640 300 Q 720 340 800 260 Q 880 180 960 240
    M 50 550 Q 120 500 190 540 Q 260 580 330 520 Q 400 460 470 520 Q 540 580 610 500 Q 680 420 750 500 Q 820 580 890 480 Q 960 380 1000 450
    M 100 300 Q 140 260 180 300 Q 220 340 260 280 Q 300 220 340 280 Q 380 340 420 260 Q 460 180 500 260 Q 540 340 580 240
    M 600 350 Q 660 300 720 360 Q 780 420 840 340 Q 900 260 960 360
    M 150 180 Q 200 140 250 180 Q 300 220 350 160 Q 400 100 450 160 Q 500 220 550 140 Q 600 60 650 140 Q 700 220 750 120 Q 800 20 850 100 Q 900 180 950 80
    M 0 100 Q 80 140 160 80 Q 240 20 320 100 Q 400 180 480 80 Q 560 -20 640 80 Q 720 180 800 60`,
};

// Different reveal animation patterns for each doodle
type RevealPattern = 'circleBottomLeft' | 'circleTopRight' | 'horizontalWipe' | 'diagonalReveal';

const revealPatterns: Record<RevealPattern, string> = {
  circleBottomLeft: 'radial-gradient(circle at 0% 100%, white var(--reveal-size), transparent var(--reveal-size))',
  circleTopRight: 'radial-gradient(circle at 100% 0%, white var(--reveal-size), transparent var(--reveal-size))',
  horizontalWipe: 'linear-gradient(90deg, white var(--reveal-size), transparent var(--reveal-size))',
  diagonalReveal: 'linear-gradient(135deg, white var(--reveal-size), transparent var(--reveal-size))',
};

interface DoodleProps {
  path: string;
  pattern: RevealPattern;
  isActive: boolean;
  strokeColor?: string;
}

const AnimatedDoodle: React.FC<DoodleProps> = ({ path, pattern, isActive, strokeColor = 'rgba(255,255,255,0.15)' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !maskRef.current) return;

    if (isActive) {
      // Reset and animate the path drawing
      const pathElement = svgRef.current.querySelector('path');
      if (pathElement) {
        const length = pathElement.getTotalLength();
        pathElement.style.strokeDasharray = `${length}`;
        pathElement.style.strokeDashoffset = `${length}`;
        
        // Animate path drawing
        animate(pathElement, {
          strokeDashoffset: [length, 0],
          duration: 2000,
          easing: 'easeOutQuad',
        });
      }

      // Animate the color reveal mask
      animate(maskRef.current, {
        '--reveal-size': ['0%', '150%'],
        duration: 2500,
        easing: 'easeOutQuad',
        delay: 300,
      });
    } else {
      // Reset when not active
      const pathElement = svgRef.current.querySelector('path');
      if (pathElement) {
        const length = pathElement.getTotalLength();
        pathElement.style.strokeDashoffset = `${length}`;
      }
      if (maskRef.current) {
        maskRef.current.style.setProperty('--reveal-size', '0%');
      }
    }
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gray path */}
      <svg
        ref={svgRef}
        viewBox="0 0 1000 600"
        className="absolute w-[140%] h-[140%] -left-[20%] -top-[20%]"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Colored path with mask reveal */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{
          '--reveal-size': '0%',
          maskImage: revealPatterns[pattern],
          WebkitMaskImage: revealPatterns[pattern],
        } as React.CSSProperties}
      >
        <svg
          viewBox="0 0 1000 600"
          className="absolute w-[140%] h-[140%] -left-[20%] -top-[20%]"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d={path}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = React.memo(() => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      step: "01",
      title: "Install Extension",
      description: "Add Traverse to Chrome in seconds. No Sign-In required.",
      icon: <Download strokeWidth={1.5} />,
      details: [
        "One-click installation from the Chrome Web Store - no complicated setup wizards",
        "Automatic detection of supported platforms like LeetCode, GeeksforGeeks, and HackerRank",
        "Instant activation on coding sites - start tracking immediately after install",
        "Zero configuration needed - works out of the box with sensible defaults",
      ],
      doodlePath: doodlePaths.install,
      revealPattern: 'circleBottomLeft' as RevealPattern,
      doodleColor: 'rgba(96, 165, 250, 0.25)', // blue
    },
    {
      step: "02",
      title: "Code & Practice",
      description:
        "Continue your normal coding practice. We silently track your runs and submissions in the background.",
      icon: <Code2 strokeWidth={1.5} />,
      details: [
        "Seamless integration - no interruption to your workflow or coding rhythm",
        "Tracks every 'Run' and 'Submit' button click for comprehensive analytics",
        "Captures successful submissions along with AI-powered code analysis",
        "Works across multiple platforms simultaneously - one extension for everything",
      ],
      doodlePath: doodlePaths.code,
      revealPattern: 'circleTopRight' as RevealPattern,
      doodleColor: 'rgba(192, 132, 252, 0.25)', // purple
    },
    {
      step: "03",
      title: "Auto-Export Everything",
      description:
        "Your solutions and insights automatically sync to GitHub, Notion, and Anki cards.",
      icon: <Share2 strokeWidth={1.5} />,
      details: [
        "GitHub commits with AI-generated feedback notes and code documentation",
        "Structured Notion database entries for organized problem tracking",
        "Spaced repetition flashcards automatically generated for key concepts",
        "Full control over what gets exported - customize your workflow",
      ],
      doodlePath: doodlePaths.export,
      revealPattern: 'horizontalWipe' as RevealPattern,
      doodleColor: 'rgba(74, 222, 128, 0.25)', // green
    },
    {
      step: "04",
      title: "Track Progress",
      description:
        "Watch your coding journey unfold across all platforms with comprehensive analytics and insights.",
      icon: <BarChart3 strokeWidth={1.5} />,
      details: [
        "Your portfolio builds automatically as you solve more problems",
        "Mistake patterns identified through AI analysis to improve faster",
        "Learning reinforced through spaced repetition scheduling",
        "Visualize your growth with beautiful charts and progress metrics",
      ],
      doodlePath: doodlePaths.track,
      revealPattern: 'diagonalReveal' as RevealPattern,
      doodleColor: 'rgba(251, 146, 60, 0.25)', // orange
    },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);

    // Animate the card content on slide change
    const currentCard = cardRefs.current[newIndex];
    if (currentCard) {
      animate(currentCard.querySelectorAll(".animate-item"), {
        translateY: [30, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 600,
        easing: "outQuart",
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      id="how-it-works"
      className="py-24 bg-background border-t border-border/20"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <BlurFade delay={0.25}>
            <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-white/20 rounded-full px-3 py-1.5 inline-flex items-center hover:bg-[rgba(40,40,40,1)] transition-colors">
              <ShinyText
                text="Simple Process"
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
            How Traverse Works
          </TextAnimate>
          <BlurFade delay={0.75}>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              From installation to building your coding portfolio - everything
              happens <span style={{ fontFamily: "'Figurlce', sans-serif" }} className="font-bold italic text-foreground">automatically</span> in the background.
            </p>
          </BlurFade>
        </div>

        {/* Carousel Section with External Navigation */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Navigation Controls - Outside Box, Below */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Previous Button */}
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200"
              aria-label="Previous step"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {/* Progress Indicators */}
            <div className="flex items-center gap-3">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-8 h-2 bg-white rounded-full"
                      : "w-2 h-2 bg-zinc-600 rounded-full hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-gray-300 hover:text-white hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200"
              aria-label="Next step"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-zinc-900 border border-gray-800 rounded-3xl overflow-hidden">
            {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0"
                >
                  <div
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className="relative min-h-[500px] flex flex-col"
                  >
                    {/* Animated Doodle Background - Full bleed */}
                    <AnimatedDoodle
                      path={step.doodlePath}
                      pattern={step.revealPattern}
                      isActive={selectedIndex === index}
                      strokeColor={step.doodleColor}
                    />
                    
                    {/* Card Content - With padding */}
                    <div className="flex flex-col h-full relative z-10 p-6 md:p-10">
                      {/* Step Number & Icon */}
                      <div className="flex items-center justify-between mb-8 animate-item">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-zinc-500">
                            <div className="w-10 h-10 md:w-12 md:h-12">
{React.cloneElement(step.icon as React.ReactElement<any>, { className: "w-full h-full" })}
                            </div>
                          </div>
                          <div style={{ fontFamily: "'Figurlce', sans-serif" }} className="text-6xl md:text-7xl font-bold text-zinc-600">
                            {step.step}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-item">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-item">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <ul className="space-y-4 flex-grow animate-item">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <CheckCircleIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                            <span className="text-base md:text-lg">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Integration Showcase */}
        <div className="text-center mb-8">
          <TextPressure
            text="Why Choose Us"
            className="text-5xl md:text-7xl italic"
            textColor="hsl(var(--foreground))"
            minFontSize={32}
            width={true}
            weight={true}
            italic={true}
            flex={false}
          />
        </div>
        <div className="bg-card dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Integration Visual */}
            <div className="bg-zinc-900 dark:bg-zinc-950 flex items-center justify-center min-h-[400px] border-r border-border dark:border-zinc-800 overflow-hidden">
              <GlowingStarsBackgroundCard className="w-full h-full max-w-none max-h-none rounded-none border-0 m-0 p-8">
                <div className="text-center space-y-6">
                  <GlowingStarsTitle className="text-white dark:text-white">
                    All Your Tools Connected
                  </GlowingStarsTitle>

                  {/* Platform Icons Grid */}
                  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={leetcodeIcon}
                        alt="LeetCode"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        LeetCode
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={geeksforgeeksIcon}
                        alt="GeeksforGeeks"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        GeeksforGeeks
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={hackerrankIcon}
                        alt="HackerRank"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        HackerRank
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={codechefIcon}
                        alt="CodeChef"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        CodeChef
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={tufIcon}
                        alt="TakeUforward"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        TakeUforward
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={notionIcon}
                        alt="Notion"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        Notion
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={ankiIcon}
                        alt="Anki"
                        className="w-8 h-8 invert brightness-0 contrast-200"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        Anki
                      </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 rounded-3xl bg-zinc-800/50 dark:bg-zinc-800/50 backdrop-blur-sm transition-all hover:scale-105">
                      <img
                        src={geminiIcon}
                        alt="Gemini AI"
                        className="w-8 h-8"
                      />
                      <span className="text-xs text-zinc-300 dark:text-zinc-300 font-medium">
                        Gemini AI
                      </span>
                    </div>
                  </div>

                  <GlowingStarsDescription className="max-w-none text-zinc-300 dark:text-zinc-300">
                    We seamlessly integrate with all major coding platforms,
                    study tools, and AI assistants to create the best unified
                    learning ecosystem.
                  </GlowingStarsDescription>

                  <div className="flex items-center justify-center space-x-6 pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-zinc-300 dark:text-zinc-300 font-medium">
                        8 Platforms
                      </span>
                    </div>
                  </div>
                </div>
              </GlowingStarsBackgroundCard>
            </div>

            {/* Right Side - Benefits */}
            <div className="p-8 flex flex-col h-full">
              <div className="flex-shrink-0">
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  Experience the most comprehensive coding learning platform
                  that seamlessly integrates with your entire workflow, from
                  problem-solving to portfolio building.
                </p>
              </div>

              <div className="flex-grow space-y-4">
                {[
                  {
                    icon: <GitHubIcon className="w-5 h-5" />,
                    title: "Portfolio Building",
                    description:
                      "Every solution automatically becomes part of your portfolio",
                  },
                  {
                    icon: <NotesIcon className="w-5 h-5" />,
                    title: "Uninterrupted Learning",
                    description:
                      "no extra input required from you after inital setup",
                  },
                  {
                    icon: <StyleIcon className="w-5 h-5" />,
                    title: "Memory Retention",
                    description:
                      "Anki cards ensure you never forget important concepts",
                  },
                  {
                    icon: <SecurityIcon className="w-5 h-5" />,
                    title: "Privacy Focused",
                    description:
                      "Your data stays yours - full control over what gets shared",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-muted/30 border border-border rounded-md flex items-center justify-center text-foreground">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-shrink-0 pt-6 border-t border-border mt-auto">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div className="bg-card/50 border border-border rounded-3xl p-2 sm:p-4 backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-bold text-foreground font-mono">
                      2 min
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Setup
                    </div>
                  </div>
                  <div className="bg-card/50 border border-border rounded-3xl p-2 sm:p-4 backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-bold text-green-400 font-mono">
                      100%
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Automated
                    </div>
                  </div>
                  <div className="bg-card/50 border border-border rounded-3xl p-2 sm:p-4 backdrop-blur-sm">
                    <div className="text-lg sm:text-2xl font-bold text-blue-400 font-mono">
                      8
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Tools
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default HowItWorks;
