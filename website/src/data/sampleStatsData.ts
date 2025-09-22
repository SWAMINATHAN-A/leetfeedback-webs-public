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