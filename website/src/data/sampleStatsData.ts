// Sample data for DSA platform statistics
// This data would typically be collected via a Chrome extension

export interface PlatformData {
  platform: string;
  value: number;
}

export interface DifficultyData {
  platform: string;
  easy: number;
  medium: number;
  hard: number;
}

export interface AttemptsData {
  difficulty: string;
  attempts: number;
}

export interface TopicData {
  topic: string;
  count: number;
}

// Time spent on each platform (in hours)
export const timeSpentData: PlatformData[] = [
  { platform: "LeetCode", value: 120 },
  { platform: "GeeksForGeeks", value: 85 },
  { platform: "CodeChef", value: 45 },
  { platform: "HackerRank", value: 30 },
  { platform: "CodeForces", value: 25 },
];

// Questions solved on each platform
export const questionsSolvedData: PlatformData[] = [
  { platform: "LeetCode", value: 245 },
  { platform: "GeeksForGeeks", value: 180 },
  { platform: "CodeChef", value: 95 },
  { platform: "HackerRank", value: 67 },
  { platform: "CodeForces", value: 42 },
];

// Questions solved by difficulty per platform
export const questionsByDifficultyData: DifficultyData[] = [
  { platform: "LeetCode", easy: 85, medium: 120, hard: 40 },
  { platform: "GeeksForGeeks", easy: 65, medium: 90, hard: 25 },
  { platform: "CodeChef", easy: 35, medium: 45, hard: 15 },
  { platform: "HackerRank", easy: 28, medium: 30, hard: 9 },
  { platform: "CodeForces", easy: 12, medium: 20, hard: 10 },
];

// Mistakes made by difficulty per platform
export const mistakesByDifficultyData: DifficultyData[] = [
  { platform: "LeetCode", easy: 12, medium: 35, hard: 18 },
  { platform: "GeeksForGeeks", easy: 8, medium: 22, hard: 12 },
  { platform: "CodeChef", easy: 5, medium: 12, hard: 8 },
  { platform: "HackerRank", easy: 4, medium: 9, hard: 5 },
  { platform: "CodeForces", easy: 3, medium: 8, hard: 6 },
];

// Overall streak (consecutive days)
export const overallStreak = 47;

// Average attempts per question before success by difficulty
export const attemptsData: AttemptsData[] = [
  { difficulty: "Easy", attempts: 1.2 },
  { difficulty: "Medium", attempts: 2.8 },
  { difficulty: "Hard", attempts: 4.5 },
];

// Average time taken per question by difficulty (in minutes)
export const timePerDifficultyData: AttemptsData[] = [
  { difficulty: "Easy", attempts: 25 }, // actually time in minutes
  { difficulty: "Medium", attempts: 45 },
  { difficulty: "Hard", attempts: 75 },
];

// Topics/tags frequency
export const topicsData: TopicData[] = [
  { topic: "Array", count: 85 },
  { topic: "String", count: 72 },
  { topic: "Dynamic Programming", count: 68 },
  { topic: "Tree", count: 55 },
  { topic: "Graph", count: 42 },
  { topic: "Hash Table", count: 38 },
  { topic: "Linked List", count: 35 },
  { topic: "Binary Search", count: 32 },
  { topic: "Backtracking", count: 28 },
  { topic: "Greedy", count: 25 },
  { topic: "Stack", count: 22 },
  { topic: "Queue", count: 18 },
  { topic: "Heap", count: 15 },
  { topic: "Trie", count: 12 },
  { topic: "Math", count: 10 },
];

// Combined data for radar chart (success rate by difficulty per platform)
export const successRateData = [
  {
    platform: "LeetCode",
    easy: 85,
    medium: 77,
    hard: 69,
  },
  {
    platform: "GeeksForGeeks",
    easy: 89,
    medium: 80,
    hard: 68,
  },
  {
    platform: "CodeChef",
    easy: 86,
    medium: 73,
    hard: 47,
  },
  {
    platform: "HackerRank",
    easy: 88,
    medium: 70,
    hard: 44,
  },
  {
    platform: "CodeForces",
    easy: 75,
    medium: 60,
    hard: 40,
  },
];

// Time distribution over months (for line chart)
export const monthlyTimeData = [
  { month: "Jan", hours: 15 },
  { month: "Feb", hours: 22 },
  { month: "Mar", hours: 18 },
  { month: "Apr", hours: 28 },
  { month: "May", hours: 35 },
  { month: "Jun", hours: 42 },
  { month: "Jul", hours: 38 },
  { month: "Aug", hours: 45 },
  { month: "Sep", hours: 52 },
  { month: "Oct", hours: 48 },
  { month: "Nov", hours: 55 },
  { month: "Dec", hours: 60 },
];

// Bump chart data - ranking of platforms over time
export const bumpData = [
  {
    id: "LeetCode",
    data: [
      { x: "Jan", y: 1 },
      { x: "Feb", y: 1 },
      { x: "Mar", y: 2 },
      { x: "Apr", y: 1 },
      { x: "May", y: 1 },
      { x: "Jun", y: 1 },
      { x: "Jul", y: 2 },
      { x: "Aug", y: 1 },
      { x: "Sep", y: 1 },
      { x: "Oct", y: 1 },
      { x: "Nov", y: 1 },
      { x: "Dec", y: 1 },
    ],
  },
  {
    id: "GeeksForGeeks",
    data: [
      { x: "Jan", y: 2 },
      { x: "Feb", y: 2 },
      { x: "Mar", y: 1 },
      { x: "Apr", y: 2 },
      { x: "May", y: 2 },
      { x: "Jun", y: 2 },
      { x: "Jul", y: 1 },
      { x: "Aug", y: 2 },
      { x: "Sep", y: 2 },
      { x: "Oct", y: 2 },
      { x: "Nov", y: 2 },
      { x: "Dec", y: 2 },
    ],
  },
  {
    id: "CodeChef",
    data: [
      { x: "Jan", y: 3 },
      { x: "Feb", y: 3 },
      { x: "Mar", y: 3 },
      { x: "Apr", y: 3 },
      { x: "May", y: 3 },
      { x: "Jun", y: 3 },
      { x: "Jul", y: 3 },
      { x: "Aug", y: 3 },
      { x: "Sep", y: 3 },
      { x: "Oct", y: 3 },
      { x: "Nov", y: 3 },
      { x: "Dec", y: 3 },
    ],
  },
  {
    id: "HackerRank",
    data: [
      { x: "Jan", y: 4 },
      { x: "Feb", y: 4 },
      { x: "Mar", y: 4 },
      { x: "Apr", y: 4 },
      { x: "May", y: 4 },
      { x: "Jun", y: 4 },
      { x: "Jul", y: 4 },
      { x: "Aug", y: 4 },
      { x: "Sep", y: 4 },
      { x: "Oct", y: 4 },
      { x: "Nov", y: 4 },
      { x: "Dec", y: 4 },
    ],
  },
  {
    id: "CodeForces",
    data: [
      { x: "Jan", y: 5 },
      { x: "Feb", y: 5 },
      { x: "Mar", y: 5 },
      { x: "Apr", y: 5 },
      { x: "May", y: 5 },
      { x: "Jun", y: 5 },
      { x: "Jul", y: 5 },
      { x: "Aug", y: 5 },
      { x: "Sep", y: 5 },
      { x: "Oct", y: 5 },
      { x: "Nov", y: 5 },
      { x: "Dec", y: 5 },
    ],
  },
];

// Calendar heatmap data - daily activity
export const calendarData = [
  { day: "2024-01-01", value: 12 },
  { day: "2024-01-02", value: 8 },
  { day: "2024-01-03", value: 15 },
  { day: "2024-01-04", value: 22 },
  { day: "2024-01-05", value: 18 },
  { day: "2024-01-06", value: 25 },
  { day: "2024-01-07", value: 30 },
  { day: "2024-01-08", value: 20 },
  { day: "2024-01-09", value: 28 },
  { day: "2024-01-10", value: 35 },
  { day: "2024-01-11", value: 40 },
  { day: "2024-01-12", value: 45 },
  { day: "2024-01-13", value: 38 },
  { day: "2024-01-14", value: 42 },
  { day: "2024-01-15", value: 50 },
  { day: "2024-01-16", value: 55 },
  { day: "2024-01-17", value: 48 },
  { day: "2024-01-18", value: 52 },
  { day: "2024-01-19", value: 60 },
  { day: "2024-01-20", value: 65 },
  { day: "2024-01-21", value: 58 },
  { day: "2024-01-22", value: 62 },
  { day: "2024-01-23", value: 70 },
  { day: "2024-01-24", value: 75 },
  { day: "2024-01-25", value: 68 },
  { day: "2024-01-26", value: 72 },
  { day: "2024-01-27", value: 80 },
  { day: "2024-01-28", value: 85 },
  { day: "2024-01-29", value: 78 },
  { day: "2024-01-30", value: 82 },
  { day: "2024-01-31", value: 90 },
];

// Heatmap data - correlation between topics and difficulties
export const heatmapData = [
  {
    id: "Array",
    data: [
      { x: "Easy", y: 25 },
      { x: "Medium", y: 35 },
      { x: "Hard", y: 15 },
    ],
  },
  {
    id: "String",
    data: [
      { x: "Easy", y: 22 },
      { x: "Medium", y: 30 },
      { x: "Hard", y: 12 },
    ],
  },
  {
    id: "Dynamic Programming",
    data: [
      { x: "Easy", y: 8 },
      { x: "Medium", y: 25 },
      { x: "Hard", y: 35 },
    ],
  },
  {
    id: "Tree",
    data: [
      { x: "Easy", y: 15 },
      { x: "Medium", y: 25 },
      { x: "Hard", y: 20 },
    ],
  },
  {
    id: "Graph",
    data: [
      { x: "Easy", y: 5 },
      { x: "Medium", y: 15 },
      { x: "Hard", y: 25 },
    ],
  },
  {
    id: "Hash Table",
    data: [
      { x: "Easy", y: 18 },
      { x: "Medium", y: 28 },
      { x: "Hard", y: 10 },
    ],
  },
  {
    id: "Linked List",
    data: [
      { x: "Easy", y: 20 },
      { x: "Medium", y: 22 },
      { x: "Hard", y: 8 },
    ],
  },
  {
    id: "Binary Search",
    data: [
      { x: "Easy", y: 12 },
      { x: "Medium", y: 20 },
      { x: "Hard", y: 18 },
    ],
  },
  {
    id: "Backtracking",
    data: [
      { x: "Easy", y: 6 },
      { x: "Medium", y: 15 },
      { x: "Hard", y: 22 },
    ],
  },
  {
    id: "Greedy",
    data: [
      { x: "Easy", y: 10 },
      { x: "Medium", y: 18 },
      { x: "Hard", y: 15 },
    ],
  },
];

// Sunburst data - hierarchical topic breakdown
export const sunburstData = {
  name: "Topics",
  children: [
    {
      name: "Data Structures",
      children: [
        { name: "Array", value: 85 },
        { name: "String", value: 72 },
        { name: "Hash Table", value: 38 },
        { name: "Linked List", value: 35 },
        { name: "Stack", value: 22 },
        { name: "Queue", value: 18 },
        { name: "Tree", value: 55 },
        { name: "Heap", value: 15 },
        { name: "Trie", value: 12 },
      ],
    },
    {
      name: "Algorithms",
      children: [
        { name: "Dynamic Programming", value: 68 },
        { name: "Graph", value: 42 },
        { name: "Binary Search", value: 32 },
        { name: "Backtracking", value: 28 },
        { name: "Greedy", value: 25 },
        { name: "Math", value: 10 },
      ],
    },
  ],
};

// Treemap data - topic distribution
export const treemapData = {
  name: "Topics",
  children: [
    { name: "Array", value: 85 },
    { name: "String", value: 72 },
    { name: "Dynamic Programming", value: 68 },
    { name: "Tree", value: 55 },
    { name: "Graph", value: 42 },
    { name: "Hash Table", value: 38 },
    { name: "Linked List", value: 35 },
    { name: "Binary Search", value: 32 },
    { name: "Backtracking", value: 28 },
    { name: "Greedy", value: 25 },
    { name: "Stack", value: 22 },
    { name: "Queue", value: 18 },
    { name: "Heap", value: 15 },
    { name: "Trie", value: 12 },
    { name: "Math", value: 10 },
  ],
};

// Funnel data - conversion from attempts to success
export const funnelData = [
  { id: "Started", value: 1000, label: "Problems Started" },
  { id: "Attempted", value: 850, label: "First Attempt" },
  { id: "Multiple Attempts", value: 650, label: "Multiple Attempts" },
  { id: "Solved", value: 580, label: "Successfully Solved" },
];

// Sankey data - flow from difficulty to platforms
export const sankeyData = {
  nodes: [
    { id: "Easy", nodeColor: "hsl(120, 70%, 50%)" },
    { id: "Medium", nodeColor: "hsl(60, 70%, 50%)" },
    { id: "Hard", nodeColor: "hsl(0, 70%, 50%)" },
    { id: "LeetCode", nodeColor: "hsl(200, 70%, 50%)" },
    { id: "GeeksForGeeks", nodeColor: "hsl(280, 70%, 50%)" },
    { id: "CodeChef", nodeColor: "hsl(160, 70%, 50%)" },
    { id: "HackerRank", nodeColor: "hsl(320, 70%, 50%)" },
    { id: "CodeForces", nodeColor: "hsl(40, 70%, 50%)" },
  ],
  links: [
    { source: "Easy", target: "LeetCode", value: 85 },
    { source: "Easy", target: "GeeksForGeeks", value: 65 },
    { source: "Easy", target: "CodeChef", value: 35 },
    { source: "Easy", target: "HackerRank", value: 28 },
    { source: "Easy", target: "CodeForces", value: 12 },
    { source: "Medium", target: "LeetCode", value: 120 },
    { source: "Medium", target: "GeeksForGeeks", value: 90 },
    { source: "Medium", target: "CodeChef", value: 45 },
    { source: "Medium", target: "HackerRank", value: 30 },
    { source: "Medium", target: "CodeForces", value: 20 },
    { source: "Hard", target: "LeetCode", value: 40 },
    { source: "Hard", target: "GeeksForGeeks", value: 25 },
    { source: "Hard", target: "CodeChef", value: 15 },
    { source: "Hard", target: "HackerRank", value: 9 },
    { source: "Hard", target: "CodeForces", value: 10 },
  ],
};

// Radial bar data - success rates
export const radialBarData = [
  { id: "LeetCode", data: [{ x: "Success Rate", y: 78 }] },
  { id: "GeeksForGeeks", data: [{ x: "Success Rate", y: 79 }] },
  { id: "CodeChef", data: [{ x: "Success Rate", y: 69 }] },
  { id: "HackerRank", data: [{ x: "Success Rate", y: 67 }] },
  { id: "CodeForces", data: [{ x: "Success Rate", y: 58 }] },
];

// Waffle data - percentage breakdown
export const waffleData = [
  { id: "Easy", value: 35, label: "Easy Problems" },
  { id: "Medium", value: 45, label: "Medium Problems" },
  { id: "Hard", value: 20, label: "Hard Problems" },
];

// Scatter plot data - time vs attempts correlation
export const scatterData = [
  {
    id: "Problems",
    data: [
      { x: 25, y: 1.2, size: 85 }, // time, attempts, count
      { x: 45, y: 2.8, size: 120 },
      { x: 75, y: 4.5, size: 40 },
      { x: 30, y: 1.5, size: 65 },
      { x: 50, y: 3.2, size: 90 },
      { x: 80, y: 5.1, size: 25 },
      { x: 20, y: 1.1, size: 35 },
      { x: 40, y: 2.5, size: 45 },
      { x: 70, y: 4.2, size: 15 },
      { x: 35, y: 2.1, size: 28 },
      { x: 55, y: 3.8, size: 30 },
      { x: 85, y: 5.8, size: 9 },
      { x: 15, y: 1.0, size: 12 },
      { x: 38, y: 2.3, size: 20 },
      { x: 68, y: 4.8, size: 10 },
    ],
  },
];

// Chord data - platform interactions
export const chordData = [
  [0, 25, 15, 10, 8], // LeetCode to others
  [25, 0, 12, 8, 6], // GeeksForGeeks to others
  [15, 12, 0, 5, 4], // CodeChef to others
  [10, 8, 5, 0, 3], // HackerRank to others
  [8, 6, 4, 3, 0], // CodeForces to others
];

// Network data - topic relationships
export const networkData = {
  nodes: [
    { id: "Array", height: 1, size: 24, color: "hsl(200, 70%, 50%)" },
    { id: "String", height: 1, size: 20, color: "hsl(220, 70%, 50%)" },
    {
      id: "Dynamic Programming",
      height: 1,
      size: 18,
      color: "hsl(240, 70%, 50%)",
    },
    { id: "Tree", height: 1, size: 16, color: "hsl(260, 70%, 50%)" },
    { id: "Graph", height: 1, size: 14, color: "hsl(280, 70%, 50%)" },
    { id: "Hash Table", height: 1, size: 12, color: "hsl(300, 70%, 50%)" },
    { id: "Linked List", height: 1, size: 10, color: "hsl(320, 70%, 50%)" },
    { id: "Binary Search", height: 1, size: 8, color: "hsl(340, 70%, 50%)" },
  ],
  links: [
    { source: "Array", target: "Hash Table", distance: 80 },
    { source: "Array", target: "Binary Search", distance: 90 },
    { source: "String", target: "Hash Table", distance: 85 },
    { source: "Dynamic Programming", target: "Tree", distance: 75 },
    { source: "Dynamic Programming", target: "Graph", distance: 70 },
    { source: "Tree", target: "Graph", distance: 65 },
    { source: "Tree", target: "Binary Search", distance: 60 },
    { source: "Graph", target: "Dynamic Programming", distance: 55 },
  ],
};

// Parallel coordinates data - multi-dimensional analysis
export const parallelData = [
  { temp: 25, cost: 1.2, calories: 85, fat: 40, sugar: 120, protein: 35 },
  { temp: 45, cost: 2.8, calories: 120, fat: 25, sugar: 90, protein: 68 },
  { temp: 75, cost: 4.5, calories: 40, fat: 15, sugar: 25, protein: 55 },
  { temp: 30, cost: 1.5, calories: 65, fat: 35, sugar: 95, protein: 42 },
  { temp: 50, cost: 3.2, calories: 90, fat: 20, sugar: 75, protein: 38 },
  { temp: 80, cost: 5.1, calories: 25, fat: 10, sugar: 15, protein: 42 },
  { temp: 20, cost: 1.1, calories: 35, fat: 45, sugar: 110, protein: 28 },
  { temp: 40, cost: 2.5, calories: 45, fat: 30, sugar: 85, protein: 32 },
  { temp: 70, cost: 4.2, calories: 15, fat: 12, sugar: 20, protein: 38 },
  { temp: 35, cost: 2.1, calories: 28, fat: 28, sugar: 78, protein: 30 },
  { temp: 55, cost: 3.8, calories: 30, fat: 18, sugar: 65, protein: 25 },
  { temp: 85, cost: 5.8, calories: 9, fat: 8, sugar: 10, protein: 22 },
  { temp: 15, cost: 1.0, calories: 12, fat: 50, sugar: 125, protein: 20 },
  { temp: 38, cost: 2.3, calories: 20, fat: 32, sugar: 72, protein: 18 },
  { temp: 68, cost: 4.8, calories: 10, fat: 14, sugar: 18, protein: 15 },
];
