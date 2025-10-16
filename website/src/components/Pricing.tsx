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
import CelebrationIcon from "@mui/icons-material/Celebration";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";
import { Ripple } from "./magicui/ripple";
import { LineShadowText } from "./magicui/line-shadow-text";
import { ScriptCopyBtn } from "./magicui/script-copy-btn";
import { analytics } from "../utils/analytics";
import GroupsIcon from "@mui/icons-material/Groups";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import OpenSourceIcon from "@mui/icons-material/OpenInNew";
import DiscordIcon from "./icons/DiscordIcon";
import { CardSpotlight } from "./ui/card-spotlight";
import { CardDemo } from "./cards-demo-1";
import ShinyText from "./ShinyText";

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

  return (
    <section
      id="pricing"
      className="py-24 bg-background border-t border-border/20"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <BlurFade delay={0.25}>
            <div className="mb-4 bg-[rgba(40,40,40,0.9)] border border-red-500/50 rounded-full px-4 py-2 inline-flex items-center hover:bg-[rgba(40,40,40,1)] transition-colors">
              <FavoriteIcon className="w-4 h-4 mr-1 text-red-400" />
              <ShinyText text="Free Forever" speed={3} className="font-mono text-sm" />
            </div>
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
              Made with <FavoriteIcon className="w-5 h-5 inline text-red-400" />{" "}
              and open source. All features, unlimited usage, forever free.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card/50 border border-border rounded-lg p-4 backdrop-blur-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <OpenSourceIcon className="w-4 h-4 flex-shrink-0" />
                </div>
                <span className="text-sm leading-relaxed">
                  Open Source until I get featured on githubRetards (again)
                </span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4 backdrop-blur-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FavoriteIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
                </div>
                <span className="text-sm leading-relaxed">
                  Made with Love (AI is love)
                </span>
              </div>
              <div className="bg-card/50 border border-border rounded-lg p-4 backdrop-blur-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GitHubIcon className="w-4 h-4 flex-shrink-0" />
                </div>
                <span className="text-sm leading-relaxed">
                  Community Driven (I am the community)
                </span>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Free Card Demo */}
        <div className="flex justify-center mb-16">
          <BlurFade delay={1}>
            <CardDemo />
          </BlurFade>
        </div>

        {/* Donation Section with Ripple Background */}
        <div className="max-w-4xl mx-auto mb-16">
          <BlurFade delay={1.2}>
            <div className="relative bg-background/80 border border-border rounded-lg backdrop-blur-sm overflow-hidden min-h-[400px] flex items-center justify-center">
              {/* Ripple Background */}
              <Ripple
                mainCircleSize={200}
                mainCircleOpacity={0.12}
                numCircles={8}
              />

              {/* Content */}
              <div className="p-4 sm:p-8 relative z-10 flex flex-col items-center justify-center text-center">
                {/* Line Shadow Donate Text */}
                <div className="mb-8">
                  <LineShadowText
                    as="h1"
                    shadowColor="hsl(var(--muted-foreground))"
                    className="text-5xl sm:text-7xl md:text-8xl font-black text-foreground tracking-tight italic"
                  >
                    DONATE
                  </LineShadowText>
                  <div className="flex justify-center mt-6 mb-4">
                    <VolunteerActivismIcon className="w-16 h-16 text-red-400" />
                  </div>
                  <p className="text-lg text-muted-foreground max-w-md">
                    If we have helped you in your coding journey, consider
                    supporting us
                  </p>
                </div>

                <div className="space-y-6 w-full max-w-sm">
                  <RainbowButton
                    size="lg"
                    className="px-8 py-4 text-xl font-bold w-full"
                    onClick={handleDonateClick}
                  >
                    <VolunteerActivismIcon className="w-6 h-6 mr-3" />
                    Support Us
                  </RainbowButton>

                  {showUPI && (
                    <BlurFade delay={0.3}>
                      <div className="bg-card/60 border border-border rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-sm text-muted-foreground mb-3 font-medium">
                          UPI ID:
                        </p>
                        <ScriptCopyBtn
                          textToCopy="d.singh.55@superyes"
                          className="w-full max-w-none"
                        />
                        <p className="text-xs text-muted-foreground mt-3 text-center opacity-70">
                          Thank you for funding my gambling addiction.
                        </p>
                      </div>
                    </BlurFade>
                  )}
                </div>
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
            <p className="text-muted-foreground">Everything you need to know</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Is this really free forever?",
                answer:
                  "I initially decided to make it paid but no one's paying for this crap idea. So yeah it's free forever now.",
              },
              {
                question: "How do you sustain the project?",
                answer: "Midnight motivation bursts.",
              },
              {
                question:
                  "Any deadlines or something of that sort for phases and upcoming features?",
                answer:
                  "If reality hits hard this will be completed entirely within 1 non-working-day.",
              },
              {
                question: "Is my code data secure?",
                answer:
                  "Yes, It is only stored locally (for now), refer to Gemini Policy for Ai stuff, requests are made direcctly from you, there's no middleware.",
              },
              {
                question:
                  "We are XYZ/MNC and are looking to buy this for XYZ million dollars...",
                answer: "Not selling.",
              },
              {
                question: "How do I request a new feature/idea?",
                answer:
                  "Just mail catinice@outlook.com. You get instant reply even if it's 3AM.",
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

        {/* Help Us Section with CardSpotlight */}
        <div className="text-center mt-16">
          <Card className="bg-background/80 border border-border rounded-lg backdrop-blur-sm">
            <div className="p-4 sm:p-8 relative z-10">
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
                Looking for someone to design icon and fix some AI generated
                slop.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                <RainbowButton
                  size="lg"
                  className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                  onClick={() =>
                    window.open(
                      "https://github.com/lqSky7/leetFeedback-extension",
                      "_blank"
                    )
                  }
                >
                  <GitHubIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="text-center">Contribute on GitHub</span>
                </RainbowButton>
                <RainbowButton
                  variant="outline"
                  size="lg"
                  className="px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                  onClick={() =>
                    window.open("https://discord.gg/BZDb22gz", "_blank")
                  }
                >
                  <DiscordIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span className="text-center">Join Discord Community</span>
                </RainbowButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
