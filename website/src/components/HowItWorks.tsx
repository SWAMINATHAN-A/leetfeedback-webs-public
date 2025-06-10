import React from "react";
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
import GetAppIcon from "@mui/icons-material/GetApp";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";

const HowItWorks: React.FC = () => {
    const steps = [
        {
            step: "01",
            title: "Install Extension",
            description:
                "Add LeetFeedback to Chrome in seconds. No registration required to start tracking.",
            icon: <GetAppIcon className="w-8 h-8" />,
            details: [
                "One-click installation from Chrome Web Store",
                "Automatic detection of supported platforms",
                "Instant activation on coding sites",
            ],
        },
        {
            step: "02",
            title: "Code & Practice",
            description:
                "Continue your normal coding practice. We silently track your runs and submissions.",
            icon: <AutoFixHighIcon className="w-8 h-8" />,
            details: [
                "Works on LeetCode, GeeksforGeeks, HackerRank",
                'Tracks every "Run" button click',
                "Captures successful submissions with AI analysis",
            ],
        },
        {
            step: "03",
            title: "Auto-Export Everything",
            description:
                "Your solutions and insights automatically sync to GitHub, Notion, and Anki cards.",
            icon: <GitHubIcon className="w-8 h-8" />,
            details: [
                "GitHub commits with AI feedback notes",
                "Structured Notion database entries",
                "Spaced repetition flashcards generated",
            ],
        },
        {
            step: "04",
            title: "Track Progress",
            description:
                "Watch your coding journey unfold across all platforms with comprehensive analytics.",
            icon: <TrendingUpIcon className="w-8 h-8" />,
            details: [
                "Portfolio builds automatically",
                "Mistake patterns identified",
                "Learning reinforced through spaced repetition",
            ],
        },
    ];

    return (
        <section
            id="how-it-works"
            className="py-24 bg-background border-t border-border/20"
        >
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <BlurFade delay={0.25}>
                        <Badge className="mb-4 bg-muted/50 text-foreground border border-border font-mono hover:bg-white dark:hover:bg-white hover:text-black dark:hover:text-black">
                            <AutoFixHighIcon className="w-4 h-4 mr-1" />
                            Simple Process
                        </Badge>
                    </BlurFade>
                    <TextAnimate
                        as="h2"
                        className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                        animation="blurInUp"
                        delay={0.5}
                        by="word"
                    >
                        How LeetFeedback Works
                    </TextAnimate>
                    <BlurFade delay={0.75}>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            From installation to building your coding portfolio
                            - everything happens automatically in the
                            background.
                        </p>
                    </BlurFade>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {steps.map((step, index) => (
                        <BlurFade key={index} delay={1 + index * 0.2}>
                            <div className="relative">
                                {/* Connection Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-border z-0">
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-muted-foreground rounded-full"></div>
                                    </div>
                                )}

                                <Card className="relative z-10 h-full bg-card/30 border border-border hover:border-white/20 hover:bg-card/50 transition-all duration-300 group">
                                    <CardHeader className="text-center space-y-4">
                                        <div className="mx-auto w-16 h-16 bg-muted/50 border border-border rounded-md flex items-center justify-center text-foreground font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300 font-mono">
                                            {step.step}
                                        </div>
                                        <div className="text-foreground group-hover:scale-105 transition-transform duration-300">
                                            {step.icon}
                                        </div>
                                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {step.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <CardDescription className="text-muted-foreground text-center leading-relaxed">
                                            {step.description}
                                        </CardDescription>
                                        <ul className="space-y-2">
                                            {step.details.map(
                                                (detail, detailIndex) => (
                                                    <li
                                                        key={detailIndex}
                                                        className="flex items-start text-sm text-muted-foreground"
                                                    >
                                                        <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                                                        {detail}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </BlurFade>
                    ))}
                </div>

                {/* Integration Showcase */}
                <div className="bg-card/20 border border-border rounded-lg shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side - Integration Visual */}
                        <div className="bg-muted/10 p-8 flex items-center justify-center min-h-[400px] border-r border-border">
                            <div className="text-center">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <GitHubIcon className="w-8 h-8 text-foreground" />
                                    </div>
                                    <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <NotesIcon className="w-8 h-8 text-foreground" />
                                    </div>
                                    <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <StyleIcon className="w-8 h-8 text-foreground" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-foreground">
                                    All Your Tools Connected
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    LeetFeedback seamlessly integrates with your
                                    existing workflow
                                </p>
                                <button className="bg-card/50 hover:bg-card/70 border border-border text-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center mx-auto">
                                    <PlayArrowIcon className="w-5 h-5 mr-2" />
                                    See Integration Demo
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Benefits */}
                        <div className="p-8 space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">
                                    Why Developers Choose LeetFeedback
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    The only tool that transforms your coding
                                    practice into a comprehensive learning and
                                    portfolio system.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        icon: (
                                            <GitHubIcon className="w-5 h-5" />
                                        ),
                                        title: "Portfolio Building",
                                        description:
                                            "Every solution automatically becomes part of your GitHub portfolio",
                                    },
                                    {
                                        icon: <NotesIcon className="w-5 h-5" />,
                                        title: "Organized Learning",
                                        description:
                                            "Structured knowledge base in Notion with progress tracking",
                                    },
                                    {
                                        icon: <StyleIcon className="w-5 h-5" />,
                                        title: "Memory Retention",
                                        description:
                                            "Anki cards ensure you never forget important concepts",
                                    },
                                    {
                                        icon: (
                                            <SecurityIcon className="w-5 h-5" />
                                        ),
                                        title: "Privacy Focused",
                                        description:
                                            "Your data stays yours - full control over what gets shared",
                                    },
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start space-x-3"
                                    >
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

                            <div className="pt-6 border-t border-border">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-foreground font-mono">
                                            1
                                        </div>
                                        <div className="text-xs text-muted-foreground font-mono">
                                            Setup time
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-400 font-mono">
                                            100%
                                        </div>
                                        <div className="text-xs text-muted-foreground font-mono">
                                            Automated
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-blue-400 font-mono">
                                            ∞
                                        </div>
                                        <div className="text-xs text-muted-foreground font-mono">
                                            Platforms
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
};

export default HowItWorks;
