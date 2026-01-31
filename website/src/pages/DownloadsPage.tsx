import React from "react";
import { motion } from "motion/react";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextEffect } from "../components/ui/text-effect";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import reelCircle from "../assets/reel-circle-deco.svg";
import radialMarquee from "../assets/radial-marquee-circle-deco.svg";

interface DownloadItemProps {
    title: string;
    description: string;
    href: string;
    badge?: string;
    delay?: number;
}

const DownloadItem: React.FC<DownloadItemProps> = ({
    title,
    description,
    href,
    badge,
    delay = 0,
}) => {
    return (
        <BlurFade delay={delay}>
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-8 border-b border-border/30 hover:border-foreground/20 transition-colors duration-500"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="flex items-baseline justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl md:text-3xl font-light text-foreground group-hover:text-foreground/80 transition-colors">
                                {title}
                            </h3>
                            {badge && (
                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full">
                                    {badge}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground max-w-lg">
                            {description}
                        </p>
                    </div>
                    <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </div>
            </motion.a>
        </BlurFade>
    );
};

const DownloadsPage: React.FC = () => {
    const navigate = useNavigate();

    const downloads = [
        {
            title: "Chrome Extension",
            description: "Track your coding practice on LeetCode, GeeksforGeeks, HackerRank, and more. Get AI-powered feedback and insights.",
            href: "https://github.com/lqSky7/leetFeedback-extension",
            badge: "Free",
        },
        {
            title: "iOS App",
            description: "View your stats, streaks, and achievements on the go. Stay motivated with daily reminders and progress tracking.",
            href: "https://github.com/lqSky7/traverse-ios",
            badge: "Free",
        },
        {
            title: "Android App",
            description: "Native Android experience for tracking your DSA journey. Seamlessly sync your progress across devices.",
            href: "https://github.com/lqSky7?tab=repositories",
            badge: "Free",
        },
        {
            title: "LSTM Model",
            description: "Open source machine learning model for intelligent spaced repetition. Optimize your learning with AI-powered revision scheduling.",
            href: "https://github.com/lqSky7/LSTM-spaced-repetition",
            badge: "Open Source",
        },
    ];

    return (
        <>
            <main className="min-h-screen relative overflow-hidden">
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

                {/* Main content */}
                <div className="relative z-10">
                    <div className="container max-w-4xl mx-auto px-6 pt-32 pb-24">
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

                        {/* Handwritten annotation - above Downloads */}
                        <BlurFade delay={0.15}>
                            <div className="relative mb-4 ml-2" aria-hidden>
                                <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
                                    <path
                                        d="M10 40 Q 40 45, 70 25 Q 90 10, 110 20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                        className="text-rose-500/60"
                                    />
                                    <path
                                        d="M105 15 L 115 22 L 108 12"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                        className="text-rose-500/60"
                                    />
                                </svg>
                                <span
                                    className="absolute -top-1 left-24 text-rose-500/80 text-sm whitespace-nowrap"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    Open Source!
                                </span>
                            </div>
                        </BlurFade>

                        {/* Header */}
                        <div className="mb-20">
                            <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
                                <TextEffect
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    as="span"
                                >
                                    Downloads
                                </TextEffect>
                            </h1>
                            <BlurFade delay={0.3}>
                                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
                                    Everything you need to accelerate your DSA journey. All our tools are open source.
                                </p>
                            </BlurFade>
                        </div>

                        {/* Organization link */}
                        <BlurFade delay={0.4}>
                            <a
                                href="https://github.com/orgs/QuickHasaCat/repositories"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-16 group"
                            >
                                <span className="font-mono">github.com/QuickHasaCat</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                >
                                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </a>
                        </BlurFade>

                        {/* Download items */}
                        <div className="border-t border-border/30">
                            {downloads.map((download, index) => (
                                <DownloadItem
                                    key={download.title}
                                    {...download}
                                    delay={0.5 + index * 0.1}
                                />
                            ))}
                        </div>

                        {/* Footer note */}
                        <BlurFade delay={0.9}>
                            <div className="mt-20 text-center">
                                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                                    Contributions welcome
                                </p>
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DownloadsPage;
