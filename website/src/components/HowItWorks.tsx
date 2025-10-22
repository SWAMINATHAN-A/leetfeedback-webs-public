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
import LinkIcon from "@mui/icons-material/Link";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsTitle,
  GlowingStarsDescription,
} from "./ui/glowing-stars";
import DiscordIcon from "./icons/DiscordIcon";
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

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Install Extension",
      description: "Add Traverse to Chrome in seconds. No Sign-In required.",
      icon: <GetAppIcon className="w-8 h-8" />,
      details: [
        "One-click installation",
        "Automatic detection of supported platforms",
        "Instant activation on coding sites",
      ],
    },
    {
      step: "02",
      title: "Code & Practice",
      description:
        "Continue your normal Leetcode. We silently track your runs and submissions.",
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
              happens automatically in the background.
            </p>
          </BlurFade>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <BlurFade key={index} delay={1 + index * 0.2}>
              <div className="relative h-full">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-border z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-muted-foreground rounded-full"></div>
                  </div>
                )}

                <Card className="relative z-10 h-full bg-card/30 border border-border hover:border-white/20 hover:bg-card/50 transition-all duration-300 group flex flex-col rounded-3xl">
                  <CardHeader className="text-center space-y-4 flex-shrink-0">
                    <div className="mx-auto w-16 h-16 bg-muted/50 border border-border rounded-3xl flex items-center justify-center text-foreground font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300 font-mono">
                      {step.step}
                    </div>
                    <div className="text-foreground group-hover:scale-105 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col">
                    <CardDescription className="text-muted-foreground text-center leading-relaxed flex-grow">
                      {step.description}
                    </CardDescription>
                    <ul className="space-y-2 flex-shrink-0">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <TrendingUpIcon className="w-4 h-4 mr-2 text-green-400 flex-shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>
          ))}
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
            <div className="bg-muted dark:bg-zinc-950 flex items-center justify-center min-h-[400px] border-r border-border dark:border-zinc-800 overflow-hidden">
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
};

export default HowItWorks;
