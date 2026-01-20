import React, { useState, useEffect, useRef } from "react";
import { ChromaText } from "./ui/textRenderAppear";
import { Link } from "react-router-dom";
import GlowyButton from "./ui/GlowyButton";
import { BlurFade } from "./magicui/blur-fade";
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

// Wrapper component that triggers ChromaText animation when visible (replays on re-scroll)
const VisibleChromaText: React.FC<{
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ id, className, delay, duration, children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationKey(prev => prev + 1);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {isVisible ? (
        <ChromaText key={animationKey} id={id} className={className} delay={delay} duration={duration}>
          {children}
        </ChromaText>
      ) : (
        <span className={className} style={{ opacity: 0 }}>
          {children}
        </span>
      )}
    </span>
  );
};

const Hero: React.FC = React.memo(() => {
  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-32">
      {/* Gradient backgrounds */}
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block overflow-hidden"
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

        <div className="container">
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
              <h1 className="mt-0 text-5xl md:text-7xl leading-tight">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="span"
                >
                  The Complete Learning
                </TextEffect>
                <br />
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="span"
                  delay={0.3}
                >
                  Ecosystem
                </TextEffect>
              </h1>

              {/* Subheadline with BlurFade */}
              <BlurFade delay={0.5}>
                <p
                  className="mt-8 max-w-3xl text-balance text-xl md:text-2xl text-muted-foreground leading-relaxed"
                  style={{ fontFamily: "'Britanica', sans-serif" }}
                >
                  Turn DSA into a habit: Streaks, Leaderboards, Friends and
                  Achievements —{" "}
                  <VisibleChromaText id="existing-platforms" delay={0.4} duration={1.2}>
                    right on your existing coding platforms.
                  </VisibleChromaText>
                </p>
              </BlurFade>

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
                  <GlowyButton
                    onClick={() => {
                      analytics.trackDownloadClick("hero_primary_cta");
                      window.location.href = "/downloads";
                    }}
                  >
                    Download
                  </GlowyButton>
                </AnimatedGroup>

                {/* Supported Platforms - half width, no blur effects */}
                <div className="mt-10 w-full max-w-sm md:max-w-2xl">
                  <LogoCloud />
                </div>

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
              <div
                className="relative w-full"
                style={{
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                }}
              >
                {/* Ambient glow effect - positioned to match image bounds */}
                <div
                  className="absolute top-8 left-0 w-[180%] h-[70%] bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-transparent blur-2xl opacity-70 pointer-events-none"
                  style={{ willChange: "transform" }}
                  aria-hidden="true"
                />
                {/* Subtle connecting gradient line */}
                <div
                  className="absolute -left-16 top-1/4 w-16 h-px bg-gradient-to-r from-transparent to-white/20"
                  aria-hidden="true"
                />
                {/* Left edge glow accent */}
                <div
                  className="absolute left-0 top-12 w-px h-32 bg-gradient-to-b from-white/30 via-white/10 to-transparent"
                  aria-hidden="true"
                />
                <img
                  src={graphImage}
                  alt="Analytics Graph"
                  className="relative w-[200%] max-w-none h-auto rounded-t-3xl grayscale"
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
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mt-32"></div>
    </section>
  );
});

export default Hero;
