import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextEffect } from "../components/ui/text-effect";
import { ChromaText } from "../components/ui/textRenderAppear";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExtensionIcon from "@mui/icons-material/Extension";
import LoginIcon from "@mui/icons-material/Login";
import AndroidIcon from "@mui/icons-material/Android";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import reelCircle from "../assets/reel-circle-deco.svg";
import radialMarquee from "../assets/radial-marquee-circle-deco.svg";

// ChromaText styles for guide page - emerald/cyan theme
const GuideChromaStyles = () => (
    <style>{`
    .chroma-text {
      display: inline-flex;
      padding-bottom: 0.1rem;
      padding-right: 0.15em;
      background-size: 300% 100%;
      background-position: 100% 0;
      will-change: background-position;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .chroma-text-animate {
      animation: chroma-sweep-guide 0.9s ease-in-out forwards;
      filter: blur(1px);
    }

    [data-chroma-id="guide-header"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(255, 182, 193) 40%,
        rgb(255, 218, 185) 45%,
        rgb(255, 160, 122) 50%,
        rgb(255, 192, 203) 55%,
        rgb(255, 228, 225) 60%,
        transparent 66.67%,
        transparent
      );
    }

    [data-chroma-id="step-extension"],
    [data-chroma-id="step-signin"],
    [data-chroma-id="step-android"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(255, 182, 193) 40%,
        rgb(255, 218, 185) 45%,
        rgb(255, 160, 122) 50%,
        rgb(255, 192, 203) 55%,
        rgb(255, 228, 225) 60%,
        transparent 66.67%,
        transparent
      );
    }

    [data-chroma-id="step-extension"] {
      animation-delay: 0.1s;
    }

    [data-chroma-id="step-signin"] {
      animation-delay: 0.2s;
    }

    [data-chroma-id="step-android"] {
      animation-delay: 0.3s;
    }

    @keyframes chroma-sweep-guide {
      0% {
        background-position: 100% 0;
        filter: blur(1px);
      }
      100% {
        background-position: 0 0;
        filter: blur(0px);
      }
    }
  `}</style>
);

// Visible wrapper that triggers animation only when scrolled into view
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
            { threshold: 0.1 }
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

interface GuideStepProps {
    stepNumber: number;
    title: string;
    chromaId: string;
    description: string;
    instructions: string[];
    href: string;
    linkText: string;
    icon: typeof ExtensionIcon;
    delay?: number;
}

const GuideStep: React.FC<GuideStepProps> = ({
    stepNumber,
    title,
    chromaId,
    description,
    instructions,
    href,
    linkText,
    icon: Icon,
    delay = 0,
}) => {
    return (
        <BlurFade delay={delay}>
            <div className="py-10 md:py-16 border-b border-border/30">
                <div className="flex items-start gap-6 md:gap-8">
                    {/* Step number indicator */}
                    <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-foreground/5 border border-border/50 flex items-center justify-center">
                        <span className="text-xl md:text-3xl font-mono text-foreground/60">{stepNumber}</span>
                    </div>

                    <div className="flex-1">
                        {/* Title with icon */}
                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <Icon className="w-7 h-7 md:w-10 md:h-10 text-foreground/70" />
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground">
                                <VisibleChromaText id={chromaId} delay={0.2} duration={0.9}>
                                    {title}
                                </VisibleChromaText>
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-3xl leading-relaxed">
                            {description}
                        </p>

                        {/* Instructions list */}
                        <ol className="list-decimal list-inside space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base text-muted-foreground">
                            {instructions.map((instruction, idx) => (
                                <li key={idx} className="leading-relaxed">{instruction}</li>
                            ))}
                        </ol>

                        {/* Action link */}
                        <motion.a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-base md:text-lg font-medium text-foreground hover:text-foreground/80 transition-colors group"
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span>{linkText}</span>
                            <OpenInNewIcon className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </BlurFade>
    );
};

const GuidePage: React.FC = () => {
    const navigate = useNavigate();

    const steps = [
        {
            stepNumber: 1,
            title: "Install Chrome Extension",
            chromaId: "step-extension",
            description: "The Chrome extension automatically tracks your coding practice on LeetCode, GeeksforGeeks, HackerRank, and more. Get AI-powered feedback and insights on every problem you solve.",
            instructions: [
                "Visit the GitHub repository and download the latest release",
                "Unzip the downloaded file to a folder on your computer",
                "Open Chrome and navigate to chrome://extensions",
                "Enable 'Developer mode' in the top right corner",
                "Click 'Load unpacked' and select the unzipped folder",
                "The Traverse extension icon will appear in your toolbar"
            ],
            href: "https://github.com/lqSky7/leetFeedback-extension",
            linkText: "Get Chrome Extension",
            icon: ExtensionIcon,
        },
        {
            stepNumber: 2,
            title: "Sign In to Your Account",
            chromaId: "step-signin",
            description: "Connect your Traverse account to sync your progress across devices and unlock personalized insights, spaced repetition scheduling, and social features.",
            instructions: [
                "Click the Traverse extension icon in your Chrome toolbar",
                "Click the 'Sign In' button in the extension popup",
                "You'll be redirected to the Traverse sign-in page",
                "Sign in with your Google account or create a new account",
                "Once signed in, return to any supported coding platform",
                "Your solutions will now sync automatically"
            ],
            href: "https://leet-feedback.vercel.app/login",
            linkText: "Sign in or sign up (no email required)",
            icon: LoginIcon,
        },
        {
            stepNumber: 3,
            title: "Install Android App",
            chromaId: "step-android",
            description: "Take your DSA journey on the go with our native Android app. View your stats, streaks, achievements, and stay motivated with daily reminders.",
            instructions: [
                "Visit the GitHub releases page on your Android device",
                "Download the latest APK file",
                "Open the downloaded file to install",
                "If prompted, allow installation from unknown sources",
                "Open the app and sign in with your Traverse account",
                "Your progress will sync automatically from the extension"
            ],
            href: "https://github.com/lqSky7/traverse-android/releases/latest",
            linkText: "Download Android App",
            icon: AndroidIcon,
        },
    ];

    return (
        <>
            <main className="min-h-screen relative overflow-hidden">
                {/* ChromaText styles */}
                <GuideChromaStyles />

                {/* Large watermark typography - left */}
                <div
                    className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-[15%] pointer-events-none select-none z-0"
                    aria-hidden
                >
                    <span className="text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
                        Get
                    </span>
                </div>

                {/* Large watermark typography - right */}
                <div
                    className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-[15%] pointer-events-none select-none z-0"
                    aria-hidden
                >
                    <span className="text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
                        Started
                    </span>
                </div>

                {/* Reel circle decoration - huge, overflowing top right */}
                <div
                    className="absolute -top-[300px] -right-[300px] pointer-events-none opacity-30 z-0"
                    aria-hidden
                >
                    <img
                        src={reelCircle}
                        alt=""
                        className="w-[800px] h-[800px]"
                    />
                </div>

                {/* Radial marquee circle - bottom left */}
                <div
                    className="absolute -bottom-[400px] -left-[400px] pointer-events-none opacity-20 z-0"
                    aria-hidden
                >
                    <img
                        src={radialMarquee}
                        alt=""
                        className="w-[1000px] h-auto"
                    />
                </div>

                {/* Decorative lines */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
                    {/* Vertical line - left */}
                    <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
                    {/* Vertical line - right */}
                    <div className="absolute right-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
                    {/* Horizontal line - center */}
                    <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
                </div>

                <div className="relative z-10">
                    <div className="container max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-32 pb-24">
                        {/* Back button */}
                        <BlurFade delay={0.1}>
                            <button
                                onClick={() => navigate("/")}
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
                            >
                                <ArrowBackIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                                <span>Home</span>
                            </button>
                        </BlurFade>

                        {/* Handwritten annotation */}
                        <BlurFade delay={0.15}>
                            <div className="relative mb-4 ml-2" aria-hidden>
                                <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
                                    <path
                                        d="M10 40 Q 40 45, 70 25 Q 90 10, 110 20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                        className="text-emerald-500/60"
                                    />
                                    <path
                                        d="M105 15 L 115 22 L 108 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                        className="text-emerald-500/60"
                                    />
                                </svg>
                                <span
                                    className="absolute -top-1 left-24 text-emerald-500/80 text-sm whitespace-nowrap"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    Quick setup!
                                </span>
                            </div>
                        </BlurFade>

                        {/* Header */}
                        <div className="mb-16 md:mb-24">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-8">
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="span"
                                >
                                    Getting Started
                                </TextEffect>
                            </h1>
                            <BlurFade delay={0.3}>
                                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
                                    Follow these simple steps to set up Traverse and supercharge your DSA practice journey.
                                </p>
                            </BlurFade>
                        </div>

                        {/* Estimated time */}
                        <BlurFade delay={0.4}>
                            <div className="inline-flex items-center gap-2 text-sm md:text-base text-muted-foreground mb-10">
                                <span className="font-mono">~5 minutes</span>
                                <span className="text-border">•</span>
                                <span>3 simple steps</span>
                            </div>
                        </BlurFade>

                        {/* Guide steps */}
                        <div className="border-t border-border/30">
                            {steps.map((step, index) => (
                                <GuideStep
                                    key={step.chromaId}
                                    {...step}
                                    delay={0.5 + index * 0.15}
                                />
                            ))}
                        </div>

                        {/* Footer note */}
                        <BlurFade delay={1.0}>
                            <div className="mt-20 text-center">
                                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-4">
                                    Need help?
                                </p>
                                <a
                                    href="mailto:diljotsingh7@iCloud.com"
                                    className="text-sm text-foreground hover:text-foreground/80 transition-colors"
                                >
                                    Contact us at diljotsingh7@iCloud.com
                                </a>
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default GuidePage;
