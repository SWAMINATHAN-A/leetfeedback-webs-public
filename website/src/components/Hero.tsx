import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import PlatformIcon from "./PlatformIcon";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";

const Hero: React.FC = () => {
    return (
        <section id="home" className="relative overflow-hidden bg-background pt-20 pb-32 grid-pattern">
            {/* Floating Elements - Minimal */}
            <div className="absolute top-20 left-10 w-32 h-32 border border-border/20 rounded-full opacity-20 float dark:border-white/10"></div>
            <div
                className="absolute top-40 right-20 w-24 h-24 border border-border/10 rounded-full opacity-30 float dark:border-white/5"
                style={{ animationDelay: "1s" }}
            ></div>
            <div
                className="absolute bottom-20 left-1/4 w-16 h-16 border border-border/30 rounded-full opacity-25 float dark:border-white/15"
                style={{ animationDelay: "2s" }}
            ></div>

            <div className="container relative mx-auto px-4 md:px-8">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Beta Badge */}
                    <BlurFade delay={0.25}>
                        <div className="mb-8">
                            <Badge className="bg-muted/50 text-foreground border border-border px-4 py-2 text-sm font-mono">
                                <RocketLaunchIcon className="w-4 h-4 mr-2" />
                                Now in Beta - Join <NumberTicker value={10000} />+ developers
                            </Badge>
                        </div>
                    </BlurFade>

                    {/* Main Headline */}
                    <TextAnimate
                        as="h1"
                        className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight"
                        animation="blurInUp"
                        delay={0.5}
                        by="word"
                    >
                        Master DSA with AI-Powered Insights
                    </TextAnimate>

                    {/* Subheadline */}
                    <BlurFade delay={0.75}>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                            Automatically push solutions to{" "}
                            <strong className="text-foreground">GitHub</strong>,
                            sync insights to{" "}
                            <strong className="text-foreground">Notion</strong>, and
                            create{" "}
                            <strong className="text-foreground">
                                Anki flashcards
                            </strong>{" "}
                            from your coding mistakes. The complete learning
                            ecosystem.
                        </p>
                    </BlurFade>

                    {/* Key Features Highlight */}
                    <BlurFade delay={1}>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-md px-4 py-2 border border-border">
                                <GitHubIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                    Auto GitHub Push
                                </span>
                            </div>
                            <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-md px-4 py-2 border border-border">
                                <NotesIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                    Notion Integration
                                </span>
                            </div>
                            <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-md px-4 py-2 border border-border">
                                <StyleIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm font-medium text-foreground">
                                    Anki Cards
                                </span>
                            </div>
                        </div>
                    </BlurFade>

                    {/* CTA Buttons */}
                    <BlurFade delay={1.25}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Button
                                size="lg"
                                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <CheckCircleIcon className="w-5 h-5 mr-2" />
                                Add to Chrome - Free
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="px-8 py-4 text-lg font-semibold border-border hover:bg-muted/50 transition-all duration-300"
                            >
                                <PlayArrowIcon className="w-5 h-5 mr-2" />
                                Watch Demo
                            </Button>
                        </div>
                    </BlurFade>

                    {/* Trust Indicators */}
                    <BlurFade delay={1.5}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground mb-20">
                            <div className="flex items-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                                Free Forever Plan
                            </div>
                            <div className="flex items-center gap-2">
                                <LockIcon className="w-4 h-4 text-blue-400" />
                                Privacy First
                            </div>
                            <div className="flex items-center gap-2">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <NumberTicker value={4.8} decimalPlaces={1} />/5 Rating
                            </div>
                        </div>
                    </BlurFade>

                    {/* Platform Showcase */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        {[
                            { name: "LeetCode", color: "border-orange-500/20", key: "leetcode" },
                            { name: "GeeksforGeeks", color: "border-green-500/20", key: "geeksforgeeks" },
                            { name: "HackerRank", color: "border-emerald-500/20", key: "hackerrank" },
                            { name: "CodeChef", color: "border-yellow-500/20", key: "codechef" },
                        ].map((platform, index) => (
                            <BlurFade key={platform.name} delay={1.75 + index * 0.1}>
                                <Card
                                    className={`p-6 text-center border-2 ${platform.color} hover:bg-muted/20 transition-all duration-300 bg-card/50`}
                                >
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-md bg-muted/50 flex items-center justify-center border border-border">
                                        <PlatformIcon platform={platform.key as any} size="lg" />
                                    </div>
                                    <p className="font-semibold text-foreground text-sm">
                                        {platform.name}
                                    </p>
                                </Card>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </section>
    );
};

export default Hero;
