import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Footer from "../components/Footer";
import { BlurFade } from "../components/magicui/blur-fade";
import { TextEffect } from "../components/ui/text-effect";
import { ChromaText } from "../components/ui/textRenderAppear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import { useNavigate } from "react-router-dom";
import reelCircle from "../assets/reel-circle-deco.svg";
import radialMarquee from "../assets/radial-marquee-circle-deco.svg";

// ChromaText styles for problems page
const ProblemsChromaStyles = () => (
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
      animation: chroma-sweep-problems 1.2s ease-in-out forwards;
      filter: blur(1px);
    }

    [data-chroma-id="problems-header"],
    [data-chroma-id="section-sql"],
    [data-chroma-id="section-os"],
    [data-chroma-id="section-cn"] {
      background-image: linear-gradient(
        90deg,
        hsl(var(--foreground)) 0px,
        hsl(var(--foreground)) 33.33%,
        rgb(100, 180, 255) 40%,
        rgb(180, 100, 255) 45%,
        rgb(100, 220, 180) 50%,
        rgb(255, 180, 100) 55%,
        rgb(180, 220, 255) 60%,
        transparent 66.67%,
        transparent
      );
    }

    [data-chroma-id="section-sql"] {
      animation-delay: 0.1s;
    }

    [data-chroma-id="section-os"] {
      animation-delay: 0.1s;
    }

    [data-chroma-id="section-cn"] {
      animation-delay: 0.1s;
    }

    @keyframes chroma-sweep-problems {
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
          setAnimationKey((prev) => prev + 1);
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

// Problem type definitions
interface Problem {
  category: string;
  name: string;
  link: string;
}

interface Section {
  id: string;
  title: string;
  chromaId: string;
  problems: Problem[];
}

// SQL Problems Data
const sqlProblems: Problem[] = [
  { category: "Select", name: "Recyclable and Low Fat Products", link: "https://leetcode.com/problems/recyclable-and-low-fat-products/" },
  { category: "Select", name: "Find Customer Referee", link: "https://leetcode.com/problems/find-customer-referee/" },
  { category: "Select", name: "Big Countries", link: "https://leetcode.com/problems/big-countries/" },
  { category: "Select", name: "Article Views I", link: "https://leetcode.com/problems/article-views-i/" },
  { category: "Select", name: "Invalid Tweets", link: "https://leetcode.com/problems/invalid-tweets/" },
  { category: "Basic Joins", name: "Replace Employee ID With The Unique Identifier", link: "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/" },
  { category: "Basic Joins", name: "Product Sales Analysis I", link: "https://leetcode.com/problems/product-sales-analysis-i/" },
  { category: "Basic Joins", name: "Customer Who Visited but Did Not Make Any Transactions", link: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/" },
  { category: "Basic Joins", name: "Rising Temperature", link: "https://leetcode.com/problems/rising-temperature/" },
  { category: "Basic Joins", name: "Average Time of Process per Machine", link: "https://leetcode.com/problems/average-time-of-process-per-machine/" },
  { category: "Basic Joins", name: "Employee Bonus", link: "https://leetcode.com/problems/employee-bonus/" },
  { category: "Basic Joins", name: "Students and Examinations", link: "https://leetcode.com/problems/students-and-examinations/" },
  { category: "Basic Joins", name: "Managers with at Least 5 Direct Reports", link: "https://leetcode.com/problems/managers-with-at-least-5-direct-reports/" },
  { category: "Basic Joins", name: "Confirmation Rate", link: "https://leetcode.com/problems/confirmation-rate/" },
  { category: "Basic Aggregate Functions", name: "Not Boring Movies", link: "https://leetcode.com/problems/not-boring-movies/" },
  { category: "Basic Aggregate Functions", name: "Average Selling Price", link: "https://leetcode.com/problems/average-selling-price/" },
  { category: "Basic Aggregate Functions", name: "Project Employees I", link: "https://leetcode.com/problems/project-employees-i/" },
  { category: "Basic Aggregate Functions", name: "Percentage of Users Attended a Contest", link: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/" },
  { category: "Basic Aggregate Functions", name: "Queries Quality and Percentage", link: "https://leetcode.com/problems/queries-quality-and-percentage/" },
  { category: "Basic Aggregate Functions", name: "Monthly Transactions I", link: "https://leetcode.com/problems/monthly-transactions-i/" },
  { category: "Basic Aggregate Functions", name: "Immediate Food Delivery II", link: "https://leetcode.com/problems/immediate-food-delivery-ii/" },
  { category: "Basic Aggregate Functions", name: "Game Play Analysis IV", link: "https://leetcode.com/problems/game-play-analysis-iv/" },
  { category: "Sorting and Grouping", name: "Number of Unique Subjects Taught by Each Teacher", link: "https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/" },
  { category: "Sorting and Grouping", name: "User Activity for the Past 30 Days I", link: "https://leetcode.com/problems/user-activity-for-the-past-30-days-i/" },
  { category: "Sorting and Grouping", name: "Product Sales Analysis III", link: "https://leetcode.com/problems/product-sales-analysis-iii/" },
  { category: "Sorting and Grouping", name: "Classes With at Least 5 Students", link: "https://leetcode.com/problems/classes-with-at-least-5-students/" },
  { category: "Sorting and Grouping", name: "Find Followers Count", link: "https://leetcode.com/problems/find-followers-count/" },
  { category: "Sorting and Grouping", name: "Biggest Single Number", link: "https://leetcode.com/problems/biggest-single-number/" },
  { category: "Sorting and Grouping", name: "Customers Who Bought All Products", link: "https://leetcode.com/problems/customers-who-bought-all-products/" },
  { category: "Advanced Select and Joins", name: "The Number of Employees Which Report to Each Employee", link: "https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/" },
  { category: "Advanced Select and Joins", name: "Primary Department for Each Employee", link: "https://leetcode.com/problems/primary-department-for-each-employee/" },
  { category: "Advanced Select and Joins", name: "Triangle Judgement", link: "https://leetcode.com/problems/triangle-judgement/" },
  { category: "Advanced Select and Joins", name: "Consecutive Numbers", link: "https://leetcode.com/problems/consecutive-numbers/" },
  { category: "Advanced Select and Joins", name: "Product Price at a Given Date", link: "https://leetcode.com/problems/product-price-at-a-given-date/" },
  { category: "Advanced Select and Joins", name: "Last Person to Fit in the Bus", link: "https://leetcode.com/problems/last-person-to-fit-in-the-bus/" },
  { category: "Advanced Select and Joins", name: "Count Salary Categories", link: "https://leetcode.com/problems/count-salary-categories/" },
  { category: "Subqueries", name: "Employees Whose Manager Left the Company", link: "https://leetcode.com/problems/employees-whose-manager-left-the-company/" },
  { category: "Subqueries", name: "Exchange Seats", link: "https://leetcode.com/problems/exchange-seats/" },
  { category: "Subqueries", name: "Movie Rating", link: "https://leetcode.com/problems/movie-rating/" },
  { category: "Subqueries", name: "Restaurant Growth", link: "https://leetcode.com/problems/restaurant-growth/" },
  { category: "Subqueries", name: "Friend Requests II: Who Has the Most Friends", link: "https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/" },
  { category: "Subqueries", name: "Investments in 2016", link: "https://leetcode.com/problems/investments-in-2016/" },
  { category: "Subqueries", name: "Department Top Three Salaries", link: "https://leetcode.com/problems/department-top-three-salaries/" },
  { category: "Advanced String Functions", name: "Fix Names in a Table", link: "https://leetcode.com/problems/fix-names-in-a-table/" },
  { category: "Advanced String Functions", name: "Patients With a Condition", link: "https://leetcode.com/problems/patients-with-a-condition/" },
  { category: "Advanced String Functions", name: "Delete Duplicate Emails", link: "https://leetcode.com/problems/delete-duplicate-emails/" },
  { category: "Advanced String Functions", name: "Second Highest Salary", link: "https://leetcode.com/problems/second-highest-salary/" },
  { category: "Advanced String Functions", name: "Group Sold Products By The Date", link: "https://leetcode.com/problems/group-sold-products-by-the-date/" },
  { category: "Advanced String Functions", name: "List the Products Ordered in a Period", link: "https://leetcode.com/problems/list-the-products-ordered-in-a-period/" },
  { category: "Advanced String Functions", name: "Find Users With Valid E-Mails", link: "https://leetcode.com/problems/find-users-with-valid-e-mails/" },
];

// OS Problems Data
const osProblems: Problem[] = [
  { category: "Concurrency", name: "Producer-Consumer (Bounded Buffer)", link: "https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem" },
  { category: "Concurrency", name: "The Dining Philosophers", link: "https://leetcode.com/problems/the-dining-philosophers/" },
  { category: "Concurrency", name: "H2O Generation", link: "https://leetcode.com/problems/building-h2o/" },
  { category: "Concurrency", name: "Readers-Writers Problem", link: "https://en.wikipedia.org/wiki/Readers%E2%80%93writers_problem" },
  { category: "Concurrency", name: "Sleeping Barber Problem", link: "https://en.wikipedia.org/wiki/Sleeping_barber_problem" },
  { category: "Memory", name: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/" },
  { category: "Memory", name: "LFU Cache", link: "https://leetcode.com/problems/lfu-cache/" },
  { category: "Memory", name: "Best Fit/Worst Fit Allocation", link: "https://www.geeksforgeeks.org/program-best-fit-algorithm-memory-management/" },
  { category: "Scheduling", name: "First Come First Served (FCFS)", link: "https://www.geeksforgeeks.org/program-for-fcfs-cpu-scheduling/" },
  { category: "Scheduling", name: "Round Robin Scheduling", link: "https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-same-arrival-time/" },
  { category: "Scheduling", name: "Shortest Job First (SJF)", link: "https://www.geeksforgeeks.org/program-for-shortest-job-first-sjf-scheduling/" },
  { category: "Deadlock", name: "Banker's Algorithm", link: "https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/" },
  { category: "File System", name: "Design In-Memory File System", link: "https://leetcode.com/problems/design-in-memory-file-system/" },
  { category: "File System", name: "Design Log Storage System", link: "https://leetcode.com/problems/design-log-storage-system/" },
  { category: "System", name: "Design a Vending Machine", link: "https://github.com/jwasham/coding-interview-university" },
];

// CN Problems Data
const cnProblems: Problem[] = [
  { category: "IP/Subnet", name: "Validate IP Address", link: "https://leetcode.com/problems/validate-ip-address/" },
  { category: "IP/Subnet", name: "IP to CIDR", link: "https://leetcode.com/problems/ip-to-cidr/" },
  { category: "IP/Subnet", name: "Longest Common Prefix (Routing Table)", link: "https://leetcode.com/problems/longest-common-prefix/" },
  { category: "Routing", name: "Network Delay Time (Dijkstra/OSPF)", link: "https://leetcode.com/problems/network-delay-time/" },
  { category: "Routing", name: "Cheapest Flights Within K Stops", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/" },
  { category: "Routing", name: "Path with Maximum Probability", link: "https://leetcode.com/problems/path-with-maximum-probability/" },
  { category: "Protocols", name: "Web Crawler (Multithreaded)", link: "https://leetcode.com/problems/web-crawler-multithreaded/" },
  { category: "Protocols", name: "HTTP Cookie Parsing (String Mani)", link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie" },
  { category: "Error Control", name: "Cyclic Redundancy Check (CRC)", link: "https://www.geeksforgeeks.org/cyclic-redundancy-check-generation-python/" },
  { category: "Error Control", name: "Hamming Code Implementation", link: "https://www.geeksforgeeks.org/hamming-code-implementation-in-cpp/" },
  { category: "Encoding", name: "Base64 Encoding/Decoding", link: "https://en.wikipedia.org/wiki/Base64" },
  { category: "Simulation", name: "Token Bucket Algorithm", link: "https://en.wikipedia.org/wiki/Token_bucket" },
  { category: "Design", name: "Design TinyURL (Hashing/Redirection)", link: "https://leetcode.com/problems/design-tinyurl/" },
];

// Sections configuration
const sections: Section[] = [
  { id: "sql", title: "SQL", chromaId: "section-sql", problems: sqlProblems },
  { id: "os", title: "Operating Systems", chromaId: "section-os", problems: osProblems },
  { id: "cn", title: "Computer Networks", chromaId: "section-cn", problems: cnProblems },
];

// Problem Item Component
interface ProblemItemProps {
  problem: Problem;
  delay?: number;
}

const ProblemItem: React.FC<ProblemItemProps> = ({ problem, delay = 0 }) => {
  return (
    <BlurFade delay={delay}>
      <motion.a
        href={problem.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block py-4 border-b border-border/20 hover:border-foreground/20 transition-colors duration-300"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between gap-4">
          <span className="text-base text-foreground group-hover:text-foreground/80 transition-colors">
            {problem.name}
          </span>
          <OpenInNewIcon className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </motion.a>
    </BlurFade>
  );
};

// Category Group Component
interface CategoryGroupProps {
  category: string;
  problems: Problem[];
  baseDelay: number;
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ category, problems, baseDelay }) => {
  return (
    <div className="mb-12">
      <BlurFade delay={baseDelay}>
        <h4 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
          {category}
        </h4>
      </BlurFade>
      <div>
        {problems.map((problem, idx) => (
          <ProblemItem
            key={problem.name}
            problem={problem}
            delay={baseDelay + 0.02 + idx * 0.02}
          />
        ))}
      </div>
    </div>
  );
};

// Search Modal Component
const SearchModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  sections: Section[];
}> = ({ isOpen, onClose, sections }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    const matches: { section: string; problem: Problem }[] = [];

    sections.forEach((section) => {
      section.problems.forEach((problem) => {
        if (
          problem.name.toLowerCase().includes(lowerQuery) ||
          problem.category.toLowerCase().includes(lowerQuery)
        ) {
          matches.push({ section: section.title, problem });
        }
      });
    });

    return matches.slice(0, 10);
  }, [query, sections]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full max-w-xl bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems..."
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="max-h-[50vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="px-5 py-10 text-center text-muted-foreground">
                <p className="text-sm">Start typing to search problems...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-10 text-center text-muted-foreground">
                <p className="text-sm">No problems found</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => (
                  <a
                    key={`${result.section}-${result.problem.name}-${index}`}
                    href={result.problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors group"
                    onClick={onClose}
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-foreground truncate block">
                        {result.problem.name}
                      </span>
                      <span className="text-xs text-muted-foreground mt-0.5 block">
                        {result.section} / {result.problem.category}
                      </span>
                    </div>
                    <OpenInNewIcon className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px]">esc</kbd>
                to close
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProblemsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsSearchOpen(true);
    }
    if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Group problems by category
  const groupByCategory = (problems: Problem[]) => {
    const grouped: { [key: string]: Problem[] } = {};
    problems.forEach((problem) => {
      if (!grouped[problem.category]) {
        grouped[problem.category] = [];
      }
      grouped[problem.category].push(problem);
    });
    return grouped;
  };

  return (
    <>
      <main className="min-h-screen relative overflow-hidden">
        <ProblemsChromaStyles />

        {/* Large watermark typography - left */}
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 -translate-x-[20%] pointer-events-none select-none z-0"
          aria-hidden
        >
          <span className="text-[18vw] md:text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
            Practice
          </span>
        </div>

        {/* Large watermark typography - right */}
        <div
          className="fixed right-0 top-1/2 -translate-y-1/2 translate-x-[20%] pointer-events-none select-none z-0"
          aria-hidden
        >
          <span className="text-[18vw] md:text-[20vw] font-extralight tracking-tighter text-foreground/[0.03] whitespace-nowrap">
            Problems
          </span>
        </div>

        {/* Reel circle decoration */}
        <div
          className="absolute -top-[300px] -right-[300px] pointer-events-none opacity-30 z-0"
          aria-hidden
        >
          <img src={reelCircle} alt="" className="w-[800px] h-[800px]" />
        </div>

        {/* Radial marquee circle */}
        <div
          className="absolute -bottom-[400px] -left-[400px] pointer-events-none opacity-20 z-0"
          aria-hidden
        >
          <img src={radialMarquee} alt="" className="w-[1000px] h-auto" />
        </div>

        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
          <div className="absolute left-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
          <div className="absolute right-[20%] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent" />
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
            <div className="mb-16">
              <h1 className="text-6xl md:text-8xl font-extralight tracking-tight mb-8">
                <TextEffect preset="fade-in-blur" speedSegment={0.3} as="span">
                  Problems
                </TextEffect>
              </h1>
              <BlurFade delay={0.3}>
                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed font-light">
                  Curated collection of SQL, Operating Systems, and Computer Networks problems for interview preparation.
                </p>
              </BlurFade>
            </div>

            {/* Search bar */}
            <BlurFade delay={0.4}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center gap-3 px-5 py-4 mb-16 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-border transition-all duration-200 group text-left"
              >
                <SearchIcon className="w-5 h-5 text-muted-foreground" />
                <span className="flex-1 text-muted-foreground">Search problems...</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded-md bg-background border border-border text-xs text-muted-foreground flex items-center gap-0.5">
                    <KeyboardCommandKeyIcon className="w-3 h-3" />K
                  </kbd>
                </div>
              </button>
            </BlurFade>

            {/* Sections */}
            {sections.map((section, sectionIndex) => {
              const groupedProblems = groupByCategory(section.problems);
              const categories = Object.keys(groupedProblems);
              const baseDelay = 0.5 + sectionIndex * 0.1;

              return (
                <section key={section.id} id={section.id} className="mb-20">
                  {/* Section header */}
                  <BlurFade delay={baseDelay}>
                    <div className="border-t border-border/30 pt-10 mb-10">
                      <h2 className="text-3xl md:text-4xl font-light text-foreground mb-2">
                        <VisibleChromaText id={section.chromaId} delay={0.2} duration={0.9}>
                          {section.title}
                        </VisibleChromaText>
                      </h2>
                      <p className="text-sm text-muted-foreground font-mono">
                        {section.problems.length} problems
                      </p>
                    </div>
                  </BlurFade>

                  {/* Categories */}
                  {categories.map((category, catIndex) => (
                    <CategoryGroup
                      key={category}
                      category={category}
                      problems={groupedProblems[category]}
                      baseDelay={baseDelay + 0.1 + catIndex * 0.05}
                    />
                  ))}
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        sections={sections}
      />

      <Footer />
    </>
  );
};

export default ProblemsPage;
