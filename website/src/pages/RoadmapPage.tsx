import React from "react";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextAnimate } from "../components/magicui/text-animate";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { Timeline } from "../components/ui/timeline";
import {
  Phase1Swapy,
  Phase2Swapy,
  Phase3Swapy,
  Phase4Swapy,
} from "../components/roadmap/PhaseSwapy";
import { analytics } from "../utils/analytics";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CodeIcon from "@mui/icons-material/Code";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DevicesIcon from "@mui/icons-material/Devices";
import GitHubIcon from "@mui/icons-material/GitHub";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlagIcon from "@mui/icons-material/Flag";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import TargetIcon from "@mui/icons-material/MyLocation";
import GroupsIcon from "@mui/icons-material/Groups";

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
  const roadmapPhases: RoadmapPhase[] = [
    {
      id: 1,
      title: "Foundation & Core Features",
      description: "Basic tracking functionality and platform integrations",
      completed: true,
      phase: "Phase 1",
      timeline: "2025 Q1-Q2",
      milestone: "Beta Launch",
      icon: CodeIcon,
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
      description: "AI-powered analysis and workspace integrations",
      completed: true,
      phase: "Phase 2",
      timeline: "2025 Q2-Q3",
      milestone: "Public Beta",
      icon: PsychologyIcon,
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
      description: "Comprehensive performance analytics and data insights",
      completed: false,
      phase: "Phase 3",
      timeline: "2025 Q3-Q4",
      icon: AnalyticsIcon,
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
      description: "Extended platform support and enterprise features",
      completed: false,
      phase: "Phase 4",
      timeline: "2026 Q1+",
      milestone: "Full Release",
      icon: DevicesIcon,
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
        <div className="space-y-6">
          {/* Phase Header */}
          <div
            className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
              phase.completed
                ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
                : "bg-muted/20 border-muted-foreground/20"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  phase.completed
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <phase.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3
                    className={`text-xl font-bold ${
                      phase.completed
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-foreground"
                    }`}
                  >
                    {phase.title}
                  </h3>
                  {phase.completed ? (
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <RadioButtonUncheckedIcon className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
              {phase.milestone && (
                <Badge
                  className={`${
                    phase.completed
                      ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                      : "bg-muted text-muted-foreground border-muted-foreground/20"
                  } font-mono text-xs`}
                >
                  <TargetIcon className="w-3 h-3 mr-1" />
                  {phase.milestone}
                </Badge>
              )}
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              {phase.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-start gap-2">
                  <div className="text-sm leading-relaxed">{feature}</div>
                </div>
              ))}
            </div>

            {/* Status Footer */}
            <div className="pt-4 border-t border-border/20 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  phase.completed ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {phase.completed ? "Completed" : "In Development"}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {phase.features.length} features
              </span>
            </div>
          </div>

          {/* Phase-specific Swapy Component */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4 text-foreground">
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
        {/* Hero Section */}
        <section id="roadmap" className="relative overflow-hidden pt-20 pb-32">
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
          </div>
        </section>

        {/* Roadmap Timeline */}
        <section className="py-24 bg-background border-t border-border/20">
          <div className="container mx-auto px-4 md:px-8">
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
                  Help us build the future of coding practice! We're looking for
                  passionate developers, designers, and testers to contribute to
                  this open source project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <RainbowButton
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold"
                    onClick={() => {
                      analytics.trackFeatureClick("contribute_github");
                      window.open(
                        "https://github.com/lqSky7/leetFeedback-extension",
                        "_blank"
                      );
                    }}
                  >
                    <GitHubIcon className="w-5 h-5 mr-2" />
                    Contribute on GitHub
                  </RainbowButton>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold border-border hover:bg-muted/50"
                    onClick={() =>
                      (window.location.href = "mailto:catince@outlook.com")
                    }
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
                  Your feedback drives our development. Join our community and
                  help us prioritize features that matter most to developers
                  like you.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        "https://github.com/lqSky7/leetFeedback-extension/issues",
                        "_blank"
                      )
                    }
                    className="border-border hover:bg-muted/50"
                  >
                    Request Features
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      window.open(
                        "https://github.com/lqSky7/leetFeedback-extension/discussions",
                        "_blank"
                      )
                    }
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
    </>
  );
};

export default RoadmapPage;
