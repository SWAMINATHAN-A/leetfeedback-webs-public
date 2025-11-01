import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import GitHubIcon from "@mui/icons-material/GitHub";
import NotesIcon from "@mui/icons-material/Notes";
import StyleIcon from "@mui/icons-material/Style";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BlurFade } from "./magicui/blur-fade";
import { NumberTicker } from "./magicui/number-ticker";
import ElasticSlider from "./ElasticSlider";
import { analytics } from "../utils/analytics";
import ShinyText from "./ShinyText";
import { TextEffect } from "./ui/text-effect";
import { AnimatedGroup } from "./ui/animated-group";
import LogoCloud from "./logo-cloud";
import graphImage from "../assets/support-icons/graph3.png";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

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
    <section id="home" className="relative overflow-hidden -mt-20 pt-28 pb-32">
      {/* Gradient backgrounds */}
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
        />

        <div className="container relative mx-auto px-4 md:px-8 max-w-7xl overflow-visible">
          <div className="grid lg:grid-cols-2 gap-12 items-start overflow-visible">
            <div className="text-left sm:mx-0 lg:mr-auto lg:mt-0">
              {/* Beta Badge - Original Design */}
              <BlurFade delay={0.25}>
                <div className="mb-10">
                  <Link
                    to="/roadmap"
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
                  </Link>
                </div>
              </BlurFade>

              {/* Main Headline with TextEffect */}
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mt-0 max-w-4xl text-balance text-5xl md:text-7xl leading-tight"
              >
                The Complete Learning Ecosystem
              </TextEffect>

              {/* Subheadline with TextEffect */}
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mt-8 max-w-3xl text-balance text-xl md:text-2xl text-muted-foreground leading-relaxed"
              >
                Automatically push solutions to GitHub, sync insights to Notion,
                and create Anki flashcards from your coding mistakes. The
                complete learning ecosystem.
              </TextEffect>

              {/* CTA Buttons */}
              <div id="hero-content">
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-start gap-4 md:flex-row"
                >
                  <Button
                    size="lg"
                    className="h-10.5 rounded-xl px-5 text-base bg-black dark:bg-white text-white dark:text-black border border-gray-800 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-100"
                    onClick={() => {
                      analytics.trackDownloadClick("hero_primary_cta");
                      window.open(
                        "https://github.com/lqSky7/leetFeedback-extension",
                        "_blank"
                      );
                    }}
                  >
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    <span className="text-nowrap">Add to Chrome - Free</span>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-10.5 rounded-xl px-5"
                    onClick={() => {
                      analytics.trackFeatureClick("follow_development");
                      window.location.href = "/roadmap";
                    }}
                  >
                    <RocketLaunchIcon className="w-5 h-5 mr-2" />
                    <span className="text-nowrap">Follow Development</span>
                  </Button>
                </AnimatedGroup>

                {/* Trust Indicators */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 1,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-14 flex flex-col sm:flex-row items-start gap-8"
                >
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors text-sm text-muted-foreground"
                    onClick={() => setShowRatingSlider(true)}
                  >
                    {renderStars(currentRating)}
                    <NumberTicker value={currentRating} decimalPlaces={1} />/ 5
                    Rating
                  </div>
                </AnimatedGroup>

                {/* Key Features Highlight */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 1.1,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="flex flex-wrap justify-start gap-4 mt-12"
                >
                  <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-3xl px-4 py-2 border border-border">
                    <GitHubIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Auto GitHub Push
                    </span>
                  </div>
                  <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-3xl px-4 py-2 border border-border">
                    <NotesIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Notion Integration
                    </span>
                  </div>
                  <div className="flex items-center bg-card/50 backdrop-blur-sm rounded-3xl px-4 py-2 border border-border">
                    <StyleIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      Anki Cards
                    </span>
                  </div>
                </AnimatedGroup>
              </div>
            </div>

            {/* Graph Image on the right */}
            <BlurFade
              delay={0.5}
              direction="up"
              duration={1.5}
              offset={12}
              blur="12px"
              className="hidden lg:block relative mt-10"
            >
              <div className="relative w-full">
                <img
                  src={graphImage}
                  alt="Analytics Graph"
                  className="w-[200%] max-w-none h-auto rounded-t-3xl grayscale"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
                    filter: "grayscale(100%)",
                  }}
                />
              </div>
            </BlurFade>
          </div>
        </div>

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

        {/* Platform Showcase with Infinite Slider */}
        <div className="mt-24 -mx-4 md:-mx-8">
          <LogoCloud />
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mt-32"></div>
    </section>
  );
};

export default Hero;
