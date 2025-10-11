"use client";
import { animate, motion } from "motion/react";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import ankiIcon from "@/assets/support-icons/anki.svg";
import notionIcon from "@/assets/support-icons/notion.svg";
import geminiIcon from "@/assets/support-icons/gemini.svg";
import leetcodeIcon from "@/assets/support-icons/leetcode-svgrepo-com.svg";
import geeksforgeeksIcon from "@/assets/support-icons/geeksforgeeks.svg";
import hackerrankIcon from "@/assets/support-icons/hackerrank-svgrepo-com.svg";
import codechefIcon from "@/assets/support-icons/codechef-svgrepo-com.svg";
import tufIcon from "@/assets/support-icons/tuf.svg";

export function CardDemo() {
  return (
    <Card>
      <CardSkeletonContainer>
        <Skeleton />
      </CardSkeletonContainer>
      <CardTitle>All Your Tools Connected</CardTitle>
      <CardDescription>
        All features, unlimited usage, forever free. LeetCode, GeeksforGeeks,
        Notion, Anki, Gemini AI and more.
      </CardDescription>
    </Card>
  );
}

const Skeleton = () => {
  const scale = [1, 1.1, 1];
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
  const sequence = [
    [
      ".circle-1",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-2",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-3",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-4",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-5",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-6",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-7",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
    [
      ".circle-8",
      {
        scale,
        transform,
      },
      { duration: 0.8 },
    ],
  ];

  useEffect(() => {
    // @ts-ignore
    const controls = animate(sequence as any, {
      repeat: Infinity,
      repeatDelay: 1,
    } as any);
    return () => controls.stop();
  }, []);
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row shrink-0 justify-center items-center gap-3 md:gap-4">
        <Container className="h-10 w-10 md:h-12 md:w-12 circle-1">
          <img src={leetcodeIcon} alt="LeetCode" className="h-5 w-5 md:h-6 md:w-6 brightness-0 invert" />
        </Container>
        <Container className="h-12 w-12 md:h-14 md:w-14 circle-2">
          <img src={geeksforgeeksIcon} alt="GeeksforGeeks" className="h-6 w-6 md:h-7 md:w-7 brightness-0 invert" />
        </Container>
        <Container className="h-14 w-14 md:h-16 md:w-16 circle-3">
          <img src={hackerrankIcon} alt="HackerRank" className="h-7 w-7 md:h-8 md:w-8 brightness-0 invert" />
        </Container>
        <Container className="h-16 w-16 md:h-20 md:w-20 circle-4">
          <img src={codechefIcon} alt="CodeChef" className="h-8 w-8 md:h-10 md:w-10 brightness-0 invert" />
        </Container>
        <Container className="h-14 w-14 md:h-16 md:w-16 circle-5">
          <img src={tufIcon} alt="TakeUforward" className="h-7 w-7 md:h-8 md:w-8 brightness-0 invert" />
        </Container>
        <Container className="h-12 w-12 md:h-14 md:w-14 circle-6">
          <img src={notionIcon} alt="Notion" className="h-6 w-6 md:h-7 md:w-7 brightness-0 invert" />
        </Container>
        <Container className="h-14 w-14 md:h-16 md:w-16 circle-7">
          <img src={ankiIcon} alt="Anki" className="h-7 w-7 md:h-8 md:w-8 brightness-0 invert" />
        </Container>
        <Container className="h-12 w-12 md:h-14 md:w-14 circle-8">
          <img src={geminiIcon} alt="Gemini AI" className="h-6 w-6 md:h-7 md:w-7 brightness-0 invert" />
        </Container>
      </div>

      <div className="w-40 h-px absolute left-0 top-1/2 z-40 bg-gradient-to-r from-cyan-500 via-cyan-400 to-transparent animate-move">
        <div className="h-10 w-20 left-1/2 -translate-x-1/2 absolute -top-10">
          <Sparkles />
        </div>
      </div>
    </div>
  );
};
const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-black dark:bg-white"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-6xl w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(10,10,10,0.95)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-300 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className
      )}
    >
      {children}
    </div>
  );
};

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};
