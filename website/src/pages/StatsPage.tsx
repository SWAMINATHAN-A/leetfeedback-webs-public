import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import { NumberTicker } from "../components/magicui/number-ticker";
import {
  timeSpentData,
  questionsSolvedData,
  questionsByDifficultyData,
  mistakesByDifficultyData,
  overallStreak,
  attemptsData,
  timePerDifficultyData,
  topicsData,
  successRateData,
  monthlyTimeData,
} from "../data/sampleStatsData";

const StatsPage: React.FC = () => {
  // Transform data for Nivo charts
  const pieData = questionsSolvedData.map((item) => ({
    id: item.platform,
    label: item.platform,
    value: item.value,
  }));

  const stackedBarData = questionsByDifficultyData.map((item) => ({
    platform: item.platform,
    Easy: item.easy,
    Medium: item.medium,
    Hard: item.hard,
  }));

  const mistakesStackedData = mistakesByDifficultyData.map((item) => ({
    platform: item.platform,
    Easy: item.easy,
    Medium: item.medium,
    Hard: item.hard,
  }));

  const attemptsBarData = attemptsData.map((item) => ({
    difficulty: item.difficulty,
    attempts: item.attempts,
  }));

  const timePerDifficultyBarData = timePerDifficultyData.map((item) => ({
    difficulty: item.difficulty,
    time: item.attempts, // actually time in minutes
  }));

  const topicsBarData = topicsData.map((item) => ({
    topic: item.topic,
    count: item.count,
  }));

  const lineData = [
    {
      id: "hours",
      data: monthlyTimeData.map((item) => ({
        x: item.month,
        y: item.hours,
      })),
    },
  ];

  const commonTheme = {
    background: "transparent",
    textColor: "hsl(var(--foreground))",
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: "hsl(var(--border))",
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fill: "hsl(var(--foreground))",
        },
      },
      ticks: {
        line: {
          stroke: "hsl(var(--border))",
          strokeWidth: 1,
        },
        text: {
          fill: "hsl(var(--foreground))",
        },
      },
    },
    grid: {
      line: {
        stroke: "hsl(var(--border))",
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fill: "hsl(var(--foreground))",
      },
    },
    tooltip: {
      container: {
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        fontSize: "12px",
        borderRadius: "4px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        border: "1px solid hsl(var(--border))",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">DSA Statistics Dashboard</h1>

        {/* Overall Streak Card */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Current Streak</h2>
            <div className="text-6xl font-bold text-primary">
              <NumberTicker value={overallStreak} />
            </div>
            <p className="text-muted-foreground">consecutive days</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Time Spent by Platform */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Time Spent by Platform (Hours)</h3>
            <div className="h-80">
              <ResponsiveBar
                data={timeSpentData as any}
                keys={["value"]}
                indexBy="platform"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="hsl(var(--background))"
              />
            </div>
          </div>

          {/* Questions Solved Distribution */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Questions Solved by Platform</h3>
            <div className="h-80">
              <ResponsivePie
                data={pieData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                borderWidth={1}
                borderColor="hsl(var(--background))"
              />
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Questions by Difficulty */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Questions Solved by Difficulty</h3>
            <div className="h-80">
              <ResponsiveBar
                data={stackedBarData}
                keys={["Easy", "Medium", "Hard"]}
                indexBy="platform"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: "greens" }}
                theme={commonTheme}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="hsl(var(--background))"
              />
            </div>
          </div>

          {/* Mistakes by Difficulty */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Mistakes by Difficulty</h3>
            <div className="h-80">
              <ResponsiveBar
                data={mistakesStackedData}
                keys={["Easy", "Medium", "Hard"]}
                indexBy="platform"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: "reds" }}
                theme={commonTheme}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="hsl(var(--background))"
              />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attempts per Question */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Average Attempts per Question</h3>
            <div className="h-80">
              <ResponsiveBar
                data={attemptsBarData}
                keys={["attempts"]}
                indexBy="difficulty"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: "blues" }}
                theme={commonTheme}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="hsl(var(--background))"
              />
            </div>
          </div>

          {/* Time per Difficulty */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Average Time per Question (Minutes)</h3>
            <div className="h-80">
              <ResponsiveBar
                data={timePerDifficultyBarData}
                keys={["time"]}
                indexBy="difficulty"
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: "purples" }}
                theme={commonTheme}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="hsl(var(--background))"
              />
            </div>
          </div>
        </div>

        {/* Topics and Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Topics Frequency */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Topics Frequency</h3>
            <div className="h-80">
              <ResponsiveBar
                data={topicsBarData}
                keys={["count"]}
                indexBy="topic"
                margin={{ top: 20, right: 30, bottom: 80, left: 60 }}
                padding={0.3}
                colors={{ scheme: "spectral" }}
                theme={commonTheme}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="hsl(var(--background))"
              />
            </div>
          </div>

          {/* Monthly Time Trend */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Time Spent (Hours)</h3>
            <div className="h-80">
              <ResponsiveLine
                data={lineData}
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: true,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                curve="cardinal"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                pointSize={10}
                pointColor="hsl(var(--background))"
                pointBorderWidth={2}
                pointBorderColor="hsl(var(--foreground))"
                pointLabelYOffset={-12}
                useMesh={true}
              />
            </div>
          </div>
        </div>

        {/* Success Rate Radar */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Success Rate by Difficulty (%)</h3>
          <div className="h-96">
            <ResponsiveRadar
              data={successRateData}
              keys={["easy", "medium", "hard"]}
              indexBy="platform"
              maxValue={100}
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              curve="linearClosed"
              borderWidth={2}
              borderColor="hsl(var(--foreground))"
              gridLevels={5}
              gridShape="circular"
              gridLabelOffset={36}
              enableDots={true}
              dotSize={10}
              dotColor="hsl(var(--background))"
              dotBorderWidth={2}
              dotBorderColor="hsl(var(--foreground))"
              enableDotLabel={true}
              dotLabel="value"
              dotLabelYOffset={-12}
              colors={{ scheme: "paired" }}
              fillOpacity={0.25}
              blendMode="multiply"
              animate={true}
              motionConfig="wobbly"
              theme={commonTheme}
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "hsl(var(--foreground))",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "hsl(var(--primary))",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;