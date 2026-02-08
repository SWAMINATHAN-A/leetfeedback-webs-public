import React from "react";
import { motion } from "motion/react";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextEffect } from "../components/ui/text-effect";
import { ChromaText } from "../components/ui/textRenderAppear";
import Footer from "../components/Footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import reelCircle from "../assets/reel-circle-deco.svg";
import radialMarquee from "../assets/radial-marquee-circle-deco.svg";

// ChromaText styles for blog page - pastel colors
const BlogChromaStyles = () => (
  <style>{`
    .chroma-text {
      display: inline-flex;
      padding-bottom: 0.3rem;
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
      animation: chroma-sweep-blog 1.2s ease-in-out forwards;
      filter: blur(1px);
    }

    [data-chroma-id="blog-title"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(255, 182, 193) 40%,
        rgb(255, 218, 185) 45%,
        rgb(176, 224, 230) 50%,
        rgb(221, 160, 221) 55%,
        rgb(255, 228, 196) 60%,
        transparent 66.67%,
        transparent
      );
      animation-delay: 0.2s;
    }

    [data-chroma-id^="blog-post-"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(176, 224, 230) 40%,
        rgb(221, 160, 221) 45%,
        rgb(255, 218, 185) 50%,
        rgb(255, 228, 196) 55%,
        rgb(255, 182, 193) 60%,
        transparent 66.67%,
        transparent
      );
      animation-delay: 0.3s;
    }

    @keyframes chroma-sweep-blog {
      0% {
        background-position: 100% 0;
        filter: blur(1px);
      }
      100% {
        background-position: 0 0;
        filter: blur(0px);
      }
    }
  `}</style>
);

// Visible wrapper that triggers animation only when scrolled into view
const VisibleChromaText: React.FC<{
  children: React.ReactNode;
  id: string;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ children, id, className, delay = 0.2, duration = 1.0 }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [animationKey, setAnimationKey] = React.useState(0);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setAnimationKey((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {isVisible ? (
        <ChromaText
          key={animationKey}
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

interface BlogItemProps {
  title: string;
  description: string;
  date: string;
  href: string;
  readTime?: string;
  delay?: number;
}

const BlogItem: React.FC<BlogItemProps> = ({
  title,
  description,
  date,
  href,
  readTime = "10 min read",
  delay = 0,
}) => {
  const navigate = useNavigate();

  return (
    <BlurFade delay={delay}>
      <motion.div
        onClick={() => navigate(href)}
        className="group block py-8 border-b border-border/30 hover:border-foreground/20 transition-colors duration-500 cursor-pointer"
        whileHover={{ x: 8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-baseline justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                {date}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{readTime}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-light text-foreground group-hover:text-foreground/80 transition-colors mb-3">
              <VisibleChromaText
                id={`blog-post-${title.replace(/\s+/g, "-").toLowerCase()}`}
                delay={0.2}
                duration={1.0}
              >
                {title}
              </VisibleChromaText>
            </h3>
            <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
          <div className="text-muted-foreground group-hover:text-foreground transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </BlurFade>
  );
};

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: "Infrastructure Migration and Optimization",
      description:
        "A comprehensive technical guide on migrating our global infrastructure to optimize latency for Indian users. We moved our database from Germany to Singapore and backend services from East US to Central India, achieving a 5.7x improvement in API response times.",
      date: "February 8, 2026",
      href: "/blog/infrastructure-migration",
      readTime: "15 min read",
    },
  ];

  return (
    <>
      <main className="min-h-screen relative overflow-hidden">
        {/* ChromaText styles */}
        <BlogChromaStyles />

        {/* Large watermark typography - left */}
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-[15%] pointer-events-none select-none z-0"
          aria-hidden
        >
          <span className="text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
            Tech
          </span>
        </div>

        {/* Large watermark typography - right */}
        <div
          className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-[15%] pointer-events-none select-none z-0"
          aria-hidden
        >
          <span className="text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
            Blog
          </span>
        </div>

        {/* Reel circle decoration - huge, overflowing top right */}
        <div
          className="absolute -top-[300px] -right-[300px] pointer-events-none opacity-30 z-0"
          aria-hidden
        >
          <img
            src={reelCircle}
            alt=""
            className="w-[800px] h-[800px] grayscale"
          />
        </div>

        {/* Radial marquee circle - bottom left */}
        <div
          className="absolute -bottom-[400px] -left-[400px] pointer-events-none opacity-20 z-0"
          aria-hidden
        >
          <img
            src={radialMarquee}
            alt=""
            className="w-[1000px] h-auto grayscale"
          />
        </div>

        {/* Decorative lines */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          aria-hidden
        >
          {/* Vertical line - left */}
          <div className="absolute left-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
          {/* Vertical line - right */}
          <div className="absolute right-[15%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
          {/* Horizontal line - center */}
          <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="container max-w-4xl mx-auto px-6 pt-32 pb-24">
            {/* Back button */}
            <BlurFade delay={0.1}>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12 group"
              >
                <ArrowBackIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                <span>Home</span>
              </button>
            </BlurFade>

            {/* Header */}
            <div className="mb-20">
              <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
                <VisibleChromaText id="blog-title" delay={0.2} duration={1.2}>
                  Blog
                </VisibleChromaText>
              </h1>
              <BlurFade delay={0.3}>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
                  Technical insights, engineering stories, and deep dives into
                  building Traverse.
                </p>
              </BlurFade>
            </div>

            {/* Blog posts */}
            <div className="border-t border-border/30">
              {blogPosts.map((post, index) => (
                <BlogItem
                  key={post.title}
                  {...post}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>

            {/* Footer note */}
            <BlurFade delay={0.6}>
              <div className="mt-20 text-center">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
                  More posts coming soon
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
