import React, { useState, useEffect, useRef } from "react";
import { LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import StackingCards, { StackingCardItem } from "@/components/fancy/blocks/stacking-cards";
import TextRotate from "@/components/fancy/text/text-rotate";
import { ChromaText } from "@/components/ui/textRenderAppear";
import GlowyButton from "@/components/ui/GlowyButton";

// ChromaText styles for this page - fixed for light/dark mode
const ChromaStyles = () => (
    <style>{`
    .chroma-text {
      display: inline-flex;
      padding-bottom: 0.1rem;
      padding-right: 0.15em;
      background-size: 300% 100%;
      background-position: 100% 0;
      will-change: background-position;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }

    .chroma-text-animate {
      animation: chroma-sweep 0.9s ease-in-out forwards;
      filter: blur(1px);
    }

    [data-chroma-id="open-positions"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(198, 121, 196) 40%,
        rgb(250, 61, 29) 45%,
        rgb(255, 176, 5) 50%,
        rgb(225, 225, 254) 55%,
        rgb(3, 88, 247) 60%,
        transparent 66.67%,
        transparent
      );
    }

    [data-chroma-id="job-video-editor"],
    [data-chroma-id="job-devops"] {
      background-image: linear-gradient(
        90deg,
        rgb(255, 255, 255) 0px,
        rgb(255, 255, 255) 33.33%,
        rgb(198, 121, 196) 40%,
        rgb(250, 61, 29) 45%,
        rgb(255, 176, 5) 50%,
        rgb(225, 225, 254) 55%,
        rgb(3, 88, 247) 60%,
        transparent 66.67%,
        transparent
      );
    }

    [data-chroma-id="job-video-editor"] {
      animation-delay: 0.1s;
    }

    [data-chroma-id="job-devops"] {
      animation-delay: 0.2s;
    }

    @keyframes chroma-sweep {
      0% {
        background-position: 100% 0;
        filter: blur(1px);
      }
      100% {
        background-position: 0 0;
        filter: blur(0);
      }
    }
  `}</style>
);

// Visible wrapper that triggers animation only when scrolled into view (animates once, stays visible)
const VisibleChromaText: React.FC<{
    id: string;
    className?: string;
    delay?: number;
    duration?: number;
    children: React.ReactNode;
}> = ({ id, className, delay, duration, children }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <span ref={ref}>
            {hasAnimated ? (
                <ChromaText
                    id={id}
                    className={className}
                    delay={delay}
                    duration={duration}
                >
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

// Cards data - 4 values inspired by road trip philosophy
const cards = [
    {
        bgColor: "bg-[#f97316]",
        title: "Show Up With Heartfelt Intensity",
        description:
            "There's a certain type of passion that motivates you to do what you do — so potent it puts a bit of magic behind the eyes. That thing that compels you to obsess over the details others overlook, and do it with gusto. People find joy in the work; they find joy in the details.",
        image:
            "https://plus.unsplash.com/premium_vector-1739262161806-d954eb02427c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
    },
    {
        bgColor: "bg-[#0015ff]",
        title: "Start With 'What Could Be?'",
        description:
            "Before you take on anything, pause and ask what could be? Create the space needed to break apart the everydayness and press on it. Dream, then think. Just because something is, doesn't mean it has to be — and certainly doesn't mean it's right.",
        image:
            "https://plus.unsplash.com/premium_vector-1739200616200-69a138d91627?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
    },
    {
        bgColor: "bg-[#ff5941]",
        title: "Assume You Don't Know",
        description:
            "When you say 'I don't know' a series of things happen that wouldn't happen otherwise. You just start, and you start quickly. You think twice, maybe three times. You pull in as many different perspectives as possible. There's so much to discover, and you'll be damned if you don't figure it all out.",
        image:
            "https://plus.unsplash.com/premium_vector-1738597190290-a3b571590b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
    },
    {
        bgColor: "bg-[#1f464d]",
        title: "Make Them Feel Something",
        description:
            "When we build software, it's an opportunity to make people feel something. You leave your fingerprints behind, so that they know it was made by another person and that person cared. It can be fun. It can be playful. So much so that we can make ourselves feel at home in it.",
        image:
            "https://plus.unsplash.com/premium_vector-1738935247245-97940c74cced?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
    },
];

// Job listings data with black backgrounds
const jobs = [
    {
        id: "video-editor",
        title: "Video Editor",
        bgColor: "bg-[#1a1a1a]",
        description: "You'll craft visual stories that make people feel something — leaving your fingerprints behind so they know it was made by someone who cared. Show up with heartfelt intensity and help us create content that's fun, playful, and unmistakably alive.",
    },
    {
        id: "devops",
        title: "DevOps",
        bgColor: "bg-[#1a1a1a]",
        description: "Start with 'what could be?' and build the infrastructure that lets us move fast without breaking things. Assume you don't know, pull in different perspectives, and discover the joy in the details others overlook.",
    },
];

// Text Rotate Header Component - much bigger and left aligned
const CareersHeader: React.FC = () => {
    return (
        <div className="w-full min-h-[60vh] text-5xl sm:text-7xl md:text-9xl flex flex-row items-center justify-start bg-background text-foreground font-light overflow-hidden px-8 sm:px-16 md:px-24 py-20">
            <LayoutGroup>
                <motion.p className="flex flex-wrap whitespace-pre" layout>
                    <motion.span
                        className="pt-1 sm:pt-2 md:pt-4"
                        layout
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    >
                        Make it{" "}
                    </motion.span>
                    <TextRotate
                        texts={[
                            "work!",
                            "fancy ✽",
                            "right",
                            "fast",
                            "fun",
                            "rock",
                            "🕶️🕶️🕶️",
                        ]}
                        mainClassName="text-white px-3 sm:px-4 md:px-6 bg-[#ff5941] overflow-hidden py-1 sm:py-2 md:py-4 justify-center rounded-xl"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-1 sm:pb-2 md:pb-2"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </motion.p>
            </LayoutGroup>
        </div>
    );
};

// Stacking Cards Section Component - bigger cards with larger fonts
const CareersCards: React.FC = () => {
    return (
        <StackingCards totalCards={cards.length}>
            {cards.map(({ bgColor, description, image, title }, index) => {
                return (
                    <StackingCardItem key={index} index={index} className="h-[800px]">
                        <div
                            className={cn(
                                bgColor,
                                "h-[85%] sm:h-[80%] flex-col sm:flex-row px-12 py-14 flex w-11/12 rounded-3xl mx-auto relative"
                            )}
                        >
                            <div className="flex-1 flex flex-col justify-center text-white pr-0 sm:pr-8">
                                <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 md:mb-8">{title}</h3>
                                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">{description}</p>
                            </div>

                            <div className="w-full sm:w-1/2 rounded-2xl aspect-video relative overflow-hidden mt-6 sm:mt-0">
                                <img
                                    src={image}
                                    alt={title}
                                    className="object-cover w-full h-full absolute inset-0"
                                />
                            </div>
                        </div>
                    </StackingCardItem>
                );
            })}

            <div className="w-full h-96 relative overflow-hidden">
                <h2
                    className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[240px] text-[100px] text-[#ff5941]"
                    style={{ fontFamily: "'Fascinate', cursive" }}
                >
                    Traverse
                </h2>
            </div>
        </StackingCards>
    );
};

// Job Listings Section with VisibleChromaText (triggers on scroll)
const JobListings: React.FC = () => {
    return (
        <div className="w-full bg-background py-24 px-8 sm:px-16 md:px-24">
            <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-16"
                style={{ fontFamily: "'Fascinate', cursive" }}
            >
                <VisibleChromaText id="open-positions" delay={0.2} duration={1.0}>
                    Open Positions
                </VisibleChromaText>
            </h2>

            <div className="space-y-8 max-w-4xl">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className={cn(job.bgColor, "rounded-2xl p-8 md:p-10")}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            <VisibleChromaText id={`job-${job.id}`} delay={0.3} duration={0.9}>
                                {job.title}
                            </VisibleChromaText>
                        </h3>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
                            {job.description}
                        </p>
                        <GlowyButton
                            href={`mailto:diljotsingh7@iCloud.com?subject=Application for ${job.title} at Traverse&body=Hi Traverse Team,%0D%0A%0D%0AI'm interested in the ${job.title} position.%0D%0A%0D%0A1. What technologies/tools are you most excited about right now?%0D%0A%0D%0A2. Tell us about something you built with 'heartfelt intensity' - what made it special?%0D%0A%0D%0A3. Share an example of when you asked 'what could be?' and discovered something unexpected.%0D%0A%0D%0A4. How do you approach problems when you genuinely don't know the answer?%0D%0A%0D%0ALooking forward to connecting!%0D%0A%0D%0ABest,%0D%0A[Your Name]`}
                        >
                            Contact Us
                        </GlowyButton>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main Careers Page - uses global dock from App.tsx
const CareersPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* ChromaText styles */}
            <ChromaStyles />

            {/* Text Rotate Header */}
            <CareersHeader />

            {/* Stacking Cards Section */}
            <CareersCards />

            {/* Job Listings */}
            <JobListings />
        </div>
    );
};

export default CareersPage;
