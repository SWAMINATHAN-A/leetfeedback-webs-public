import { useEffect, useId, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/marquee";

// Platform icons
import leetcodeIcon from "@/assets/support-icons/leetcode-svgrepo-com.svg";
import geeksforgeeksIcon from "@/assets/support-icons/geeksforgeeks.svg";
import hackerrankIcon from "@/assets/support-icons/hackerrank-svgrepo-com.svg";
import codechefIcon from "@/assets/support-icons/codechef-svgrepo-com.svg";
import tufIcon from "@/assets/support-icons/tuf.svg";
import notionIcon from "@/assets/support-icons/notion.svg";
import ankiIcon from "@/assets/support-icons/anki.svg";
import geminiIcon from "@/assets/support-icons/gemini.svg";
import codeforcesIcon from "@/assets/support-icons/codeforces.svg";
import githubIcon from "@/assets/support-icons/github.svg";
import swiftIcon from "@/assets/support-icons/swift.svg";
import kotlinIcon from "@/assets/support-icons/kotlin.svg";
import composeIcon from "@/assets/support-icons/jetpackcompose.svg";
import appleIcon from "@/assets/support-icons/apple.svg";
import stackoverflowIcon from "@/assets/support-icons/stackoverflow.svg";
import dockerIcon from "@/assets/support-icons/docker.svg";
import pythonIcon from "@/assets/support-icons/python.svg";
import javascriptIcon from "@/assets/support-icons/javascript.svg";
import typescriptIcon from "@/assets/support-icons/typescript.svg";
import reactIcon from "@/assets/support-icons/react.svg";
import nodejsIcon from "@/assets/support-icons/nodejs.svg";

const platformTiles = [
    {
        icon: leetcodeIcon,
        name: "LeetCode",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: geeksforgeeksIcon,
        name: "GeeksforGeeks",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: hackerrankIcon,
        name: "HackerRank",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-green-600 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: codechefIcon,
        name: "CodeChef",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: codeforcesIcon,
        name: "Codeforces",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: tufIcon,
        name: "TakeUforward",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-violet-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: notionIcon,
        name: "Notion",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-white opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: ankiIcon,
        name: "Anki",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: geminiIcon,
        name: "Gemini AI",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: githubIcon,
        name: "GitHub",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: swiftIcon,
        name: "Swift",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: kotlinIcon,
        name: "Kotlin",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-purple-600 via-orange-500 to-pink-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: composeIcon,
        name: "Jetpack Compose",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: appleIcon,
        name: "Apple",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-white opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: stackoverflowIcon,
        name: "Stack Overflow",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: dockerIcon,
        name: "Docker",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: pythonIcon,
        name: "Python",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-500 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: javascriptIcon,
        name: "JavaScript",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: typescriptIcon,
        name: "TypeScript",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: reactIcon,
        name: "React",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
    {
        icon: nodejsIcon,
        name: "Node.js",
        bg: <div className="pointer-events-none absolute top-1/2 left-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-600 via-green-500 to-green-400 opacity-70 blur-[20px]" />,
        invert: true,
    },
];

function shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function PlatformCard({
    icon,
    name,
    bg,
    invert,
}: {
    icon: string;
    name: string;
    bg: React.ReactNode;
    invert: boolean;
}) {
    const id = useId();
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 0.2,
                transition: { delay: Math.random() * 1.5, ease: "easeOut", duration: 0.8 },
            });
        }
    }, [controls, inView]);

    return (
        <motion.div
            key={id}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={controls}
            className={cn(
                "relative size-16 cursor-pointer overflow-hidden rounded-2xl border p-3",
                "bg-zinc-800/50 [box-shadow:0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3)]",
                "transform-gpu [border:1px_solid_rgba(255,255,255,.1)]"
            )}
        >
            <img
                src={icon}
                alt={name}
                className={cn("size-full object-contain", invert && "invert brightness-0 contrast-200")}
            />
        </motion.div>
    );
}

export default function PlatformIntegrations() {
    const [tiles1, setTiles1] = useState<typeof platformTiles>([]);
    const [tiles2, setTiles2] = useState<typeof platformTiles>([]);
    const [tiles3, setTiles3] = useState<typeof platformTiles>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setTiles1(shuffleArray([...platformTiles]));
            setTiles2(shuffleArray([...platformTiles]));
            setTiles3(shuffleArray([...platformTiles]));
        }
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[400px] overflow-hidden">

            {/* Marquee rows */}
            <div className="flex flex-col gap-3 w-full justify-center h-full">
                <Marquee reverse className="[--duration:25s]" repeat={4}>
                    {tiles1.map((tile, idx) => (
                        <PlatformCard key={idx} {...tile} />
                    ))}
                </Marquee>
                <Marquee className="[--duration:30s]" repeat={4}>
                    {tiles2.map((tile, idx) => (
                        <PlatformCard key={idx} {...tile} />
                    ))}
                </Marquee>
                <Marquee reverse className="[--duration:20s]" repeat={4}>
                    {tiles3.map((tile, idx) => (
                        <PlatformCard key={idx} {...tile} />
                    ))}
                </Marquee>
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-900 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-900 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>
        </div>
    );
}
