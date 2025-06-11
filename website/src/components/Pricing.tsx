import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";
import { analytics } from "../utils/analytics";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import OpenSourceIcon from "@mui/icons-material/OpenInNew";
import DiscordIcon from "./icons/DiscordIcon";

const Pricing: React.FC = () => {
    const [showUPI, setShowUPI] = useState(false);

    const features = [
        "Unlimited tracked submissions",
        "GitHub auto-commit with AI notes",
        "Notion workspace integration",
        "Anki flashcard generation",
        "Advanced AI analysis & insights",
        "All platforms supported",
        "Advanced mistake pattern analysis",
        "Detailed progress reports",
        "Export data to CSV/PDF",
        "Custom learning goals",
        "Team collaboration features",
        "Analytics dashboard",
        "Community support",
        "Priority email support",
        "Slack/Discord integrations",
        "Custom reporting",
    ];

    const handleDonateClick = () => {
        setShowUPI(!showUPI);
        analytics.trackFeatureClick("donation_button");
    };

    const copyUPI = () => {
        navigator.clipboard.writeText("9992806683@yapl");
        // You could add a toast notification here
    };

    return (
        <section
            id="pricing"
            className="py-24 bg-background border-t border-border/20"
        >
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <BlurFade delay={0.25}>
                        <Badge className="mb-4 bg-green-500/20 text-green-400 border border-green-500/30 font-mono hover:bg-green-500/30 hover:text-green-300">
                            <FavoriteIcon className="w-4 h-4 mr-1" />
                            Free Forever
                        </Badge>
                    </BlurFade>
                    <TextAnimate
                        as="h2"
                        className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                        animation="blurInUp"
                        delay={0.5}
                        by="word"
                    >
                        Everything is Free Forever
                    </TextAnimate>
                    <BlurFade delay={0.75}>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                            Made with ❤️ and open source. All features,
                            unlimited usage, forever free.
                        </p>
                        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <OpenSourceIcon className="w-4 h-4" />
                                <span>Open Source</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FavoriteIcon className="w-4 h-4 text-red-400" />
                                <span>Made with Love</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <GitHubIcon className="w-4 h-4" />
                                <span>Community Driven</span>
                            </div>
                        </div>
                    </BlurFade>
                </div>

                {/* Single Free Plan Card */}
                <div className="max-w-2xl mx-auto mb-16">
                    <BlurFade delay={1}>
                        <Card className="relative overflow-hidden border-2 border-green-500/30 bg-card/50 shadow-xl">
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2 text-sm font-semibold font-mono">
                                🎉 Everything Included - Always Free
                            </div>

                            <CardHeader className="pt-12 space-y-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-3xl font-bold text-foreground">
                                        LeetFeedback
                                    </CardTitle>
                                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                                        Free Forever
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-end space-x-1">
                                        <span className="text-5xl font-bold text-foreground font-mono">
                                            ₹0
                                        </span>
                                        <span className="text-muted-foreground pb-2 font-mono">
                                            /forever
                                        </span>
                                    </div>
                                    <CardDescription className="text-muted-foreground text-lg">
                                        All features included. No limitations.
                                        No premium tiers. Just pure love for the
                                        coding community.
                                    </CardDescription>
                                </div>

                                <RainbowButton
                                    size="lg"
                                    className="w-full py-3 text-lg font-semibold"
                                    onClick={() => {
                                        analytics.trackPricingPlanView(
                                            "Free Forever",
                                        );
                                        window.open(
                                            "https://github.com/QuickHasaCat/leetFeedback",
                                            "_blank",
                                        );
                                    }}
                                >
                                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                                    Get Started - It's Free!
                                </RainbowButton>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Features */}
                                <div>
                                    <h4 className="font-semibold text-foreground mb-4 font-mono text-lg">
                                        Everything included:
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {features.map(
                                            (feature, featureIndex) => (
                                                <div
                                                    key={featureIndex}
                                                    className="flex items-start"
                                                >
                                                    <CheckCircleIcon className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-muted-foreground">
                                                        {feature}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* Open Source Message */}
                                <div className="bg-muted/20 border border-border rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <GitHubIcon className="w-6 h-6 text-foreground" />
                                        <h4 className="font-semibold text-foreground font-mono">
                                            Open Source & Community Driven
                                        </h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        LeetFeedback is completely open source
                                        and built with love by the coding
                                        community. We believe that great tools
                                        should be accessible to everyone,
                                        regardless of their financial situation.
                                    </p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            window.open(
                                                "https://github.com/QuickHasaCat/leetFeedback",
                                                "_blank",
                                            )
                                        }
                                        className="border-border hover:bg-muted/50"
                                    >
                                        <GitHubIcon className="w-4 h-4 mr-2" />
                                        View on GitHub
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </BlurFade>
                </div>

                {/* Donation Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <BlurFade delay={1.2}>
                        <div className="bg-muted/10 border border-border rounded-lg p-8">
                            <div className="flex justify-center mb-4">
                                <VolunteerActivismIcon className="w-12 h-12 text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">
                                Support Our Mission
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                If LeetFeedback has helped you in your coding
                                journey, consider supporting us. Every
                                contribution helps us keep the project alive and
                                improve it further.
                            </p>

                            <div className="space-y-4">
                                <RainbowButton
                                    size="lg"
                                    className="px-8 py-4 text-lg font-semibold"
                                    onClick={handleDonateClick}
                                >
                                    <VolunteerActivismIcon className="w-5 h-5 mr-2" />
                                    Donate
                                </RainbowButton>

                                {showUPI && (
                                    <BlurFade>
                                        <div className="bg-card/50 border border-border rounded-lg p-4 backdrop-blur-sm">
                                            <p className="text-sm text-muted-foreground mb-2">
                                                UPI ID:
                                            </p>
                                            <div className="flex items-center justify-center gap-2">
                                                <code className="bg-muted px-3 py-1 rounded font-mono text-sm">
                                                    9992806683@yapl
                                                </code>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={copyUPI}
                                                >
                                                    Copy
                                                </Button>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Thank you for supporting open
                                                source! ❤️
                                            </p>
                                        </div>
                                    </BlurFade>
                                )}
                            </div>
                        </div>
                    </BlurFade>
                </div>

                {/* FAQ Section */}
                <div className="bg-muted/10 border border-border rounded-lg p-8 md:p-12 mb-16">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-muted-foreground">
                            Everything you need to know
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                question: "Is this really free forever?",
                                answer: "I initially decided to make it paid but no one's paying for this crap idea. So yeah it's free forever now.",
                            },
                            {
                                question: "How do you sustain the project?",
                                answer: "Midnight motivation bursts.",
                            },
                            {
                                question:
                                    "Any deadlines or something of that sort for phases and upcoming features?",
                                answer: "If reality hits hard this will be completed entirely within 1 non-working-day.",
                            },
                            {
                                question: "Is my code data secure?",
                                answer: "Yes, It is only stored locally (for now), refer to Gemini Policy for Ai stuff, requests are made direcctly from you there's no middleware.",
                            },
                            {
                                question:
                                    "We are XYZ/MNC and are looking to buy this for XYZ million dollars...",
                                answer: "Not selling.",
                            },
                            {
                                question:
                                    "How do I request a new feature/idea?",
                                answer: "Just mail catinice@outlook.com. You get instant reply even if it's 3AM.",
                            },
                        ].map((faq, index) => (
                            <div key={index} className="space-y-3">
                                <h4 className="font-semibold text-foreground">
                                    {faq.question}
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Help Us Section */}
                <div className="text-center mt-16 p-8 bg-muted/10 border border-border rounded-lg">
                    <div className="flex justify-center space-x-6 mb-6">
                        <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <GroupsIcon className="w-8 h-8 text-foreground" />
                        </div>
                        <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <CodeIcon className="w-8 h-8 text-foreground" />
                        </div>
                        <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <BugReportIcon className="w-8 h-8 text-foreground" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                        <AutoAwesomeIcon className="w-6 h-6 mr-2 inline" />
                        Join Our Open Source Community
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Help us make LeetFeedback even better! We're looking for
                        passionate developers, designers, and testers to join
                        our mission of making coding practice more effective and
                        enjoyable for everyone.
                    </p>
                    <div className="flex justify-center gap-4">
                        <RainbowButton
                            size="lg"
                            className="px-8 py-4 text-lg font-semibold"
                            onClick={() =>
                                window.open(
                                    "https://github.com/QuickHasaCat/leetFeedback",
                                    "_blank",
                                )
                            }
                        >
                            <GitHubIcon className="w-5 h-5 mr-2" />
                            Contribute on GitHub
                        </RainbowButton>
                        <RainbowButton
                            variant="outline"
                            size="lg"
                            className="px-8 py-4 text-lg font-semibold"
                            onClick={() =>
                                window.open(
                                    "https://discord.gg/BZDb22gz",
                                    "_blank",
                                )
                            }
                        >
                            <DiscordIcon className="w-5 h-5 mr-2" />
                            Join Discord Community
                        </RainbowButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
