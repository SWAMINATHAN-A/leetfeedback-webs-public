import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
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
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PlatformIcon from "./PlatformIcon";
import { BlurFade } from "./magicui/blur-fade";
import { TextAnimate } from "./magicui/text-animate";
import { NumberTicker } from "./magicui/number-ticker";
import { RainbowButton } from "./magicui/rainbow-button";
import ElasticSlider from "./ElasticSlider";
import { analytics } from "../utils/analytics";
import ShinyText from "./ShinyText";

const Hero: React.FC = () => {
  const [showRatingSlider, setShowRatingSlider] = useState(false);
  const [currentRating, setCurrentRating] = useState(4.5);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [sliderRating, setSliderRating] = useState(3);

  // Load rating from localStorage on component mount
  useEffect(() => {
    const savedRatings = localStorage.getItem("userRatings");
    if (savedRatings) {
      const ratings = JSON.parse(savedRatings);
      const average =
        ratings.reduce((sum: number, rating: number) => sum + rating, 0) /
        ratings.length;
      setCurrentRating(Math.round(average * 10) / 10); // Round to 1 decimal place
    }
  }, []);

  const handleRatingSubmit = (rating: number) => {
    setUserRating(rating);
    setShowRatingSlider(false);

    // Save rating to localStorage
    const savedRatings = localStorage.getItem("userRatings");
    const ratings = savedRatings ? JSON.parse(savedRatings) : [];
    ratings.push(rating);
    localStorage.setItem("userRatings", JSON.stringify(ratings));

    // Calculate new average
    const average =
      ratings.reduce((sum: number, rating: number) => sum + rating, 0) /
      ratings.length;
    setCurrentRating(Math.round(average * 10) / 10);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"
        }`}
      />
    ));
  };

  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-32">
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
              <a
                href="/roadmap"
                className="inline-block"
                onClick={() => analytics.trackRoadmapView()}
              >
                <div className="bg-[rgba(40,40,40,0.9)] border border-white/20 px-3 py-1.5 rounded-full hover:bg-[rgba(40,40,40,1)] transition-colors inline-flex items-center">
                  <ShinyText
                    text="Public Beta is out!"
                    speed={3}
                    className="text-xs font-mono"
                  />
                </div>
              </a>
            </div>
          </BlurFade>

          {/* Main Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut",
              opacity: { duration: 0.6 },
              y: { duration: 0.8 },
              filter: { duration: 0.6 },
            }}
          >
            The Complete Learning Ecosystem
          </motion.h1>

          {/* Subheadline */}
          <BlurFade delay={0.75}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Automatically push solutions to{" "}
              <strong className="text-foreground">GitHub</strong>, sync insights
              to <strong className="text-foreground">Notion</strong>, and create{" "}
              <strong className="text-foreground">Anki flashcards</strong> from
              your <span className="text-red-500">coding mistakes</span>. The
              complete learning ecosystem.
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
              <RainbowButton
                size="lg"
                className="w-[240px] px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  analytics.trackDownloadClick("hero_primary_cta");
                  window.open(
                    "https://github.com/lqSky7/leetFeedback-extension",
                    "_blank"
                  );
                }}
              >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Add to Chrome - Free
              </RainbowButton>

              <RainbowButton
                variant="outline"
                size="lg"
                className="w-[240px] px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  analytics.trackFeatureClick("follow_development");
                  window.location.href = "/roadmap";
                }}
              >
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Follow Development
              </RainbowButton>
            </div>
          </BlurFade>

          {/* Trust Indicators */}
          <BlurFade delay={1.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground mb-20">
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setShowRatingSlider(true)}
              >
                {renderStars(currentRating)}
                <NumberTicker value={currentRating} decimalPlaces={1} />/ 5
                Rating
              </div>
            </div>
          </BlurFade>

          {/* Rating Slider Modal */}
          {showRatingSlider && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowRatingSlider(false)}
            >
              <motion.div
                className="bg-card border border-border rounded-3xl p-6 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                  Rate LeetFeedback
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  How would you rate your experience?
                </p>

                <div className="flex justify-center mb-6">
                  <ElasticSlider
                    defaultValue={3}
                    startingValue={1}
                    maxValue={5}
                    isStepped={true}
                    stepSize={1}
                    leftIcon={
                      <StarBorderIcon className="w-6 h-6 text-yellow-400" />
                    }
                    rightIcon={<StarIcon className="w-6 h-6 text-yellow-400" />}
                    className="mb-4"
                    onChange={setSliderRating}
                  />
                </div>

                <div className="text-center mb-4">
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < sliderRating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {sliderRating} out of 5 stars
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowRatingSlider(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleRatingSubmit(sliderRating)}
                    className="flex-1"
                  >
                    Submit Rating
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Platform Showcase */}
          <BlurFade delay={1.7}>
            <h3 className="text-xl font-bold text-center text-foreground mb-8 font-mono">
              Supported Platforms
            </h3>
          </BlurFade>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "LeetCode",
                color: "border-orange-500/20",
                key: "leetcode",
              },
              {
                name: "GeeksforGeeks",
                color: "border-green-500/20",
                key: "geeksforgeeks",
              },
              {
                name: "HackerRank",
                color: "border-emerald-500/20",
                key: "hackerrank",
              },
              {
                name: "CodeChef",
                color: "border-yellow-500/20",
                key: "codechef",
              },
              {
                name: "TUF Plus",
                color: "border-blue-500/20",
                key: "tufplus",
              },
            ].map((platform, index) => (
              <BlurFade key={platform.name} delay={1.75 + index * 0.1}>
                <Card
                  className={`p-6 text-center border-2 border-border hover:bg-muted/20 transition-all duration-300 bg-card/50`}
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
