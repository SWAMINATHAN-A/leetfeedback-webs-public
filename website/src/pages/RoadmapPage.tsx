import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { DockDemo } from '../components/DockDemo';
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { analytics } from "../utils/analytics";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CodeIcon from "@mui/icons-material/Code";
import ExtensionIcon from "@mui/icons-material/Extension";
import PsychologyIcon from "@mui/icons-material/Psychology";
import StyleIcon from "@mui/icons-material/Style";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SecurityIcon from "@mui/icons-material/Security";
import DevicesIcon from "@mui/icons-material/Devices";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GroupsIcon from "@mui/icons-material/Groups";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlagIcon from "@mui/icons-material/Flag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TargetIcon from "@mui/icons-material/MyLocation";

interface RoadmapItem {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    phase: string;
    milestone?: string;
    icon: React.ComponentType<any>;
    features: string[];
}

const RoadmapPage: React.FC = () => {
    const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

    const roadmapItems: RoadmapItem[] = [
        {
            id: 1,
            title: "Foundation & Core Features",
            description: "Basic tracking functionality and user interface development",
            completed: true,
            phase: "Phase 1",
            icon: CodeIcon,
            features: [
                "LeetCode & GeeksforGeeks platform integration",
                "Extension popup interface",
                "Basic problem tracking",
                "User authentication system"
            ]
        },
        {
            id: 2,
            title: "AI-Powered Intelligence",
            description: "Advanced AI analysis and automated reporting systems",
            completed: true,
            phase: "Phase 2",
            milestone: "Public Beta Launch",
            icon: PsychologyIcon,
            features: [
                "AI mistake pattern recognition",
                "Automated GitHub analysis reports",
                "Smart insights generation",
                "Performance trend analysis"
            ]
        },
        {
            id: 3,
            title: "Study & Productivity Tools",
            description: "Enhanced learning tools and workspace integrations",
            completed: false,
            phase: "Phase 3",
            icon: StyleIcon,
            features: [
                "ANKI flashcard auto-generation",
                "Notion workspace integration",
                "Study session planning",
                "Progress tracking dashboard"
            ]
        },
        {
            id: 4,
            title: "Analytics & Insights",
            description: "Comprehensive performance analytics and reporting",
            completed: false,
            phase: "Phase 4",
            icon: AnalyticsIcon,
            features: [
                "Advanced analytics dashboard",
                "Performance metrics visualization",
                "Progress comparison tools",
                "Custom reporting features"
            ]
        },
        {
            id: 5,
            title: "Gamification & Engagement",
            description: "Achievement system and motivation features",
            completed: false,
            phase: "Phase 5",
            icon: EmojiEventsIcon,
            features: [
                "Achievement badges & streaks",
                "Leaderboards & competitions",
                "Goal setting & tracking",
                "Motivation system"
            ]
        },
        {
            id: 6,
            title: "Platform Expansion",
            description: "Extended platform support and mobile experience",
            completed: false,
            phase: "Phase 6",
            milestone: "Public Release",
            icon: DevicesIcon,
            features: [
                "TUF+, CodeChef, HackerRank support",
                "Codeforces integration",
                "Mobile companion app",
                "Cross-platform synchronization"
            ]
        },
        {
            id: 7,
            title: "Enterprise & Teams",
            description: "Team collaboration and organizational features",
            completed: false,
            phase: "Phase 7",
            icon: GroupsIcon,
            features: [
                "Team analytics dashboards",
                "Organization management",
                "Bootcamp integration tools",
                "Advanced admin controls"
            ]
        },
        {
            id: 8,
            title: "Security & Compliance",
            description: "Advanced security features and data protection",
            completed: false,
            phase: "Phase 8",
            icon: SecurityIcon,
            features: [
                "End-to-end encryption",
                "GDPR compliance",
                "Data anonymization",
                "Advanced privacy controls"
            ]
        }
    ];

    const completedCount = roadmapItems.filter(item => item.completed).length;
    const progressPercentage = Math.round((completedCount / roadmapItems.length) * 100);

    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <section
                    id="roadmap"
                    className="relative overflow-hidden bg-background pt-20 pb-32 grid-pattern"
                >
                    {/* Floating Elements */}
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
                            {/* Progress Badge */}
                            <BlurFade delay={0.25}>
                                <div className="mb-8">
                                    <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 text-sm font-mono hover:bg-blue-500/30">
                                        <TrendingUpIcon className="w-4 h-4 mr-2" />
                                        {progressPercentage}% Complete
                                    </Badge>
                                </div>
                            </BlurFade>

                            {/* Main Heading */}
                            <TextAnimate
                                as="h1"
                                className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
                                animation="blurInUp"
                                delay={0.5}
                                by="word"
                            >
                                Development Roadmap
                            </TextAnimate>

                            <BlurFade delay={0.75}>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
                                    Follow our journey as we build the future of coding practice. 
                                    Transparent development with community-driven features.
                                </p>
                            </BlurFade>

                            {/* Progress Stats */}
                            <BlurFade delay={1}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                                    <Card className="bg-card/50 border border-border backdrop-blur-sm">
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <CheckCircleIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                                                <div className="text-2xl font-bold text-foreground">{completedCount}</div>
                                                <div className="text-sm text-muted-foreground">Phases Complete</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card/50 border border-border backdrop-blur-sm">
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <AutoAwesomeIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                                                <div className="text-2xl font-bold text-foreground">{roadmapItems.length - completedCount}</div>
                                                <div className="text-sm text-muted-foreground">In Development</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="bg-card/50 border border-border backdrop-blur-sm">
                                        <CardContent className="pt-6">
                                            <div className="text-center">
                                                <FlagIcon className="w-8 h-8 text-foreground mx-auto mb-2" />
                                                <div className="text-2xl font-bold text-foreground">{roadmapItems.filter(item => item.milestone).length}</div>
                                                <div className="text-sm text-muted-foreground">Major Milestones</div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                </section>

                {/* Roadmap Timeline */}
                <section className="py-24 bg-background border-t border-border/20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <TextAnimate
                                as="h2"
                                className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                                animation="blurInUp"
                                delay={0.5}
                                by="word"
                            >
                                Feature Timeline
                            </TextAnimate>
                            <BlurFade delay={0.75}>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Our development phases and the exciting features coming your way
                                </p>
                            </BlurFade>
                        </div>

                        {/* Timeline Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {roadmapItems.map((item, index) => (
                                <BlurFade key={item.id} delay={1 + index * 0.1}>
                                    <Card 
                                        className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                                            item.completed
                                                ? "border-2 border-foreground/30 bg-foreground/5 shadow-lg"
                                                : selectedPhase === item.phase
                                                ? "border-2 border-foreground/50 bg-foreground/10 shadow-lg scale-105"
                                                : "border border-border hover:border-foreground/20 hover:bg-card/30 bg-card/20"
                                        }`}
                                        onClick={() => setSelectedPhase(selectedPhase === item.phase ? null : item.phase)}
                                    >
                                        {item.milestone && (
                                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 text-sm font-semibold font-mono">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <TargetIcon className="w-4 h-4 text-blue-400" />
                                                    {item.milestone}
                                                </div>
                                            </div>
                                        )}

                                        <CardHeader className={`space-y-4 ${item.milestone ? "pt-12" : "pt-6"}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${
                                                        item.completed
                                                            ? "bg-foreground text-background border-foreground"
                                                            : "bg-card text-foreground border-border"
                                                    }`}>
                                                        <item.icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <Badge className={`${
                                                            item.completed
                                                                ? "bg-foreground/20 text-foreground border-foreground/30"
                                                                : "bg-muted/50 text-foreground border-border"
                                                        } font-mono`}>
                                                            {item.phase}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {item.completed ? (
                                                        <CheckCircleIcon className="w-6 h-6 text-foreground" />
                                                    ) : (
                                                        <RadioButtonUncheckedIcon className="w-6 h-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <CardTitle className={`text-xl font-bold mb-2 ${
                                                    item.completed ? "text-foreground" : "text-foreground"
                                                }`}>
                                                    {item.title}
                                                </CardTitle>
                                                <CardDescription className="text-muted-foreground">
                                                    {item.description}
                                                </CardDescription>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-3 font-mono">
                                                    Key Features:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {item.features.map((feature, featureIndex) => (
                                                        <li
                                                            key={featureIndex}
                                                            className="flex items-start"
                                                        >
                                                            <CheckCircleIcon className={`w-4 h-4 mr-3 flex-shrink-0 mt-0.5 ${
                                                                item.completed ? "text-foreground" : "text-muted-foreground"
                                                            }`} />
                                                            <span className="text-sm text-muted-foreground">
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex items-center gap-2 pt-2">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    item.completed ? "bg-foreground" : "bg-muted-foreground"
                                                }`} />
                                                <span className="text-xs text-muted-foreground font-medium">
                                                    {item.completed ? "Completed" : "In Development"}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </BlurFade>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-24 bg-background border-t border-border/20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Open Source Contribution */}
                            <div className="text-center p-8 bg-muted/10 border border-border rounded-lg mb-16">
                                <div className="flex justify-center space-x-6 mb-6">
                                    <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <GroupsIcon className="w-8 h-8 text-foreground" />
                                    </div>
                                    <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <CodeIcon className="w-8 h-8 text-foreground" />
                                    </div>
                                    <div className="w-16 h-16 bg-card/50 border border-border rounded-lg flex items-center justify-center backdrop-blur-sm">
                                        <AutoAwesomeIcon className="w-8 h-8 text-foreground" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-foreground">
                                    <VolunteerActivismIcon className="w-8 h-8 mr-2 inline" />
                                    Join Our Open Source Journey
                                </h3>
                                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-lg">
                                    Help us build the future of coding practice! We're looking for passionate developers, 
                                    designers, and testers to contribute to this open source project.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <RainbowButton
                                        size="lg"
                                        className="px-8 py-4 text-lg font-semibold"
                                        onClick={() => {
                                            analytics.trackFeatureClick('contribute_github');
                                            window.open("https://github.com/QuickHasaCat/leetFeedback", "_blank");
                                        }}
                                    >
                                        <GitHubIcon className="w-5 h-5 mr-2" />
                                        Contribute on GitHub
                                    </RainbowButton>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="px-8 py-4 text-lg font-semibold border-border hover:bg-muted/50"
                                        onClick={() => window.location.href = "mailto:catince@outlook.com"}
                                    >
                                        Join Our Team
                                    </Button>
                                </div>
                            </div>

                            {/* Community & Feedback */}
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-4 text-foreground">
                                    Shape the Future
                                </h3>
                                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                    Your feedback drives our development. Join our community and help us prioritize features 
                                    that matter most to developers like you.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open("https://github.com/QuickHasaCat/leetFeedback/issues", "_blank")}
                                        className="border-border hover:bg-muted/50"
                                    >
                                        Request Features
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => window.open("https://github.com/QuickHasaCat/leetFeedback/discussions", "_blank")}
                                        className="border-border hover:bg-muted/50"
                                    >
                                        Join Discussion
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <DockDemo />
        </>
    );
};

export default RoadmapPage;