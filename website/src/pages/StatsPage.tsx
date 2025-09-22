import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveBump } from "@nivo/bump";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { ResponsiveFunnel } from "@nivo/funnel";
import { ResponsiveSankey } from "@nivo/sankey";
import { ResponsiveRadialBar } from "@nivo/radial-bar";
import { ResponsiveWaffle } from "@nivo/waffle";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import { ResponsiveChord } from "@nivo/chord";
import { ResponsiveNetwork } from "@nivo/network";
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";
import { NumberTicker } from "../components/magicui/number-ticker";
import { Highlighter } from "../components/ui/highlighter";
import { AuroraText } from "../components/ui/aurora-text";
import { SparklesText } from "../components/ui/sparkles-text";
import { X, Maximize2 } from "lucide-react";
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
  bumpData,
  calendarData,
  heatmapData,
  sunburstData,
  treemapData,
  funnelData,
  sankeyData,
  radialBarData,
  waffleData,
  scatterData,
  chordData,
  networkData,
  parallelData,
} from "../data/sampleStatsData";

interface ModalData {
  isOpen: boolean;
  title: string;
  description: string;
  chartType: string;
  data: any;
  keys?: string[];
  indexBy?: string;
  colorScheme?: string;
}

const StatsPage: React.FC = () => {
  const [modal, setModal] = useState<ModalData>({
    isOpen: false,
    title: "",
    description: "",
    chartType: "",
    data: null,
  });
  const [isAnimating, setIsAnimating] = useState(false);

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

  const openModal = (
    title: string,
    description: string,
    chartType: string,
    data: any,
    keys?: string[],
    indexBy?: string,
    colorScheme?: string
  ) => {
    setIsAnimating(true);
    setModal({
      isOpen: true,
      title,
      description,
      chartType,
      data,
      keys,
      indexBy,
      colorScheme,
    });
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setModal({
        isOpen: false,
        title: "",
        description: "",
        chartType: "",
        data: null,
      });
    }, 300);
  };

  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modal.isOpen]);

  const renderModalChart = () => {
    const { chartType, data, keys, indexBy, colorScheme } = modal;

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveBar
            data={data}
            keys={keys || ["value"]}
            indexBy={indexBy || "platform"}
            margin={{ top: 50, right: 130, bottom: 100, left: 80 }}
            padding={0.3}
            colors={colorScheme || "paired"}
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
            legends={
              keys && keys.length > 1
                ? [
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
          />
        );
      case "pie":
        return (
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            innerRadius={0.4}
            padAngle={1}
            cornerRadius={4}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            borderWidth={2}
            borderColor="hsl(var(--background))"
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="hsl(var(--foreground))"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="hsl(var(--background))"
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "hsl(var(--foreground))",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
              },
            ]}
          />
        );
      case "line":
        return (
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
            pointSize={12}
            pointColor="hsl(var(--background))"
            pointBorderWidth={3}
            pointBorderColor="hsl(var(--foreground))"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        );
      case "radar":
        return (
          <ResponsiveRadar
            data={data}
            keys={keys || ["easy", "medium", "hard"]}
            indexBy={indexBy || "platform"}
            maxValue={100}
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor="hsl(var(--foreground))"
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={12}
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
        );
      case "bump":
        return (
          <ResponsiveBump
            data={data}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor="hsl(var(--background))"
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor="hsl(var(--foreground))"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
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
          />
        );
      case "calendar":
        return (
          <ResponsiveCalendar
            data={data}
            from="2024-01-01"
            to="2024-01-31"
            emptyColor="hsl(var(--muted))"
            colors={["hsl(var(--muted-foreground))", "hsl(var(--primary))"]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="hsl(var(--border))"
            dayBorderWidth={2}
            dayBorderColor="hsl(var(--background))"
            theme={commonTheme}
          />
        );
      case "heatmap":
        return (
          <ResponsiveHeatMap
            data={data}
            margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
            colors={{ type: "quantize", scheme: "greens" }}
            theme={commonTheme}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -90,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            animate={true}
            motionConfig="wobbly"
          />
        );
      case "sunburst":
        return (
          <ResponsiveSunburst
            data={data}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            id="name"
            value="value"
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            borderColor="hsl(var(--background))"
            childColor={{
              from: "color",
              modifiers: [["brighter", 0.2]],
            }}
            animate={true}
            motionConfig="wobbly"
          />
        );
      case "treemap":
        return (
          <ResponsiveTreeMap
            data={data}
            identity="name"
            value="value"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            labelSkipSize={12}
            labelTextColor="hsl(var(--background))"
            parentLabelPosition="left"
            parentLabelTextColor="hsl(var(--foreground))"
            borderColor="hsl(var(--background))"
          />
        );
      case "funnel":
        return (
          <ResponsiveFunnel
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            borderWidth={20}
            labelColor="hsl(var(--background))"
            beforeSeparatorLength={100}
            beforeSeparatorOffset={20}
            afterSeparatorLength={100}
            afterSeparatorOffset={20}
            currentPartSizeExtension={10}
            currentBorderWidth={40}
            motionConfig="wobbly"
          />
        );
      case "sankey":
        return (
          <ResponsiveSankey
            data={data}
            margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            nodeOpacity={1}
            nodeHoverOthersOpacity={0.35}
            nodeThickness={18}
            nodeSpacing={24}
            nodeBorderWidth={0}
            nodeBorderColor={{
              from: "color",
              modifiers: [["darker", 0.8]],
            }}
            linkOpacity={0.5}
            linkHoverOthersOpacity={0.1}
            linkContract={3}
            enableLinkGradient={true}
            labelPosition="outside"
            labelOrientation="horizontal"
            labelPadding={16}
            labelTextColor="hsl(var(--foreground))"
            animate={true}
            motionConfig="wobbly"
          />
        );
      case "radialbar":
        return (
          <ResponsiveRadialBar
            data={data}
            margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            borderColor="hsl(var(--background))"
            tracksColor="hsl(var(--muted))"
            radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
            circularAxisOuter={{
              tickSize: 5,
              tickPadding: 12,
              tickRotation: 0,
            }}
            legends={[
              {
                anchor: "right",
                direction: "column",
                translateX: 80,
                translateY: 0,
                itemWidth: 80,
                itemHeight: 14,
                itemTextColor: "hsl(var(--foreground))",
                symbolSize: 12,
                symbolShape: "square",
              },
            ]}
          />
        );
      case "waffle":
        return (
          <ResponsiveWaffle
            data={data}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            total={100}
            rows={10}
            columns={10}
            fillDirection="top"
            padding={1}
            // cellComponent="circle"
            animate={true}
            motionConfig="wobbly"
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                translateX: 0,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 14,
                itemTextColor: "hsl(var(--foreground))",
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        );
      case "scatterplot":
        return (
          <ResponsiveScatterPlot
            data={data}
            margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
            xScale={{ type: "linear", min: 0, max: "auto" }}
            xFormat=">-.2f"
            yScale={{ type: "linear", min: 0, max: "auto" }}
            yFormat=">-.2f"
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            blendMode="multiply"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Time (minutes)",
              legendPosition: "middle",
              legendOffset: 46,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Attempts",
              legendPosition: "middle",
              legendOffset: -60,
            }}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemTextColor: "hsl(var(--foreground))",
                symbolSize: 12,
                symbolShape: "circle",
              },
            ]}
          />
        );
      case "chord":
        return (
          <ResponsiveChord
            data={data}
            keys={[
              "LeetCode",
              "GeeksForGeeks",
              "CodeChef",
              "HackerRank",
              "CodeForces",
            ]}
            margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
            colors={["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]}
            theme={commonTheme}
            padAngle={0.02}
            innerRadiusRatio={0.96}
            innerRadiusOffset={0.02}
            arcOpacity={1}
            arcBorderWidth={1}
            arcBorderColor="hsl(var(--background))"
            ribbonOpacity={0.5}
            ribbonBorderWidth={1}
            ribbonBorderColor="hsl(var(--background))"
            enableLabel={true}
            label="id"
            labelOffset={12}
            labelRotation={-90}
            labelTextColor="hsl(var(--foreground))"
            animate={true}
            motionConfig="wobbly"
          />
        );
      case "network":
        return (
          <ResponsiveNetwork
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            linkDistance={100}
            centeringStrength={0.3}
            repulsivity={6}
            nodeSize={16}
            activeNodeSize={24}
            nodeColor="hsl(var(--primary))"
            nodeBorderWidth={1}
            nodeBorderColor="hsl(var(--background))"
            linkThickness={2}
            linkBlendMode="multiply"
            motionConfig="wobbly"
            theme={commonTheme}
          />
        );
      case "parallel":
        return (
          <ResponsiveParallelCoordinates
            data={data}
            variables={[
              {
                key: "temp",
                type: "linear",
                min: "auto",
                max: "auto",
                ticksPosition: "before",
                legend: "Time",
                legendPosition: "start",
                legendOffset: 20,
              },
              {
                key: "cost",
                type: "linear",
                min: "auto",
                max: "auto",
                ticksPosition: "before",
                legend: "Attempts",
                legendPosition: "start",
                legendOffset: 20,
              },
              {
                key: "calories",
                type: "linear",
                min: "auto",
                max: "auto",
                ticksPosition: "before",
                legend: "Easy",
                legendPosition: "start",
                legendOffset: 20,
              },
              {
                key: "fat",
                type: "linear",
                min: "auto",
                max: "auto",
                ticksPosition: "before",
                legend: "Medium",
                legendPosition: "start",
                legendOffset: 20,
              },
              {
                key: "sugar",
                type: "linear",
                min: "auto",
                max: "auto",
                ticksPosition: "before",
                legend: "Hard",
                legendPosition: "start",
                legendOffset: 20,
              },
              {
                key: "protein",
                type: "linear",
                min: "auto",
                max: "auto",
                ticksPosition: "before",
                legend: "Count",
                legendPosition: "start",
                legendOffset: 20,
              },
            ]}
            margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
            colors={{ scheme: "paired" }}
            theme={commonTheme}
            strokeWidth={2}
            lineOpacity={0.35}
            animate={true}
            motionConfig="wobbly"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-8xl font-extrabold mt-12 mb-12 text-center">
          Statistics <AuroraText>Dashboard</AuroraText>
        </h1>

        {/* Overall Streak Card */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Current Streak</h2>
            <SparklesText className="text-6xl font-bold text-primary">
              <NumberTicker value={overallStreak} />
            </SparklesText>
            <p className="text-muted-foreground">consecutive days</p>
          </div>
        </div>

        {/* Charts Grid - Inconsistent Layout */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Large Bump Chart - spans 8 columns */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="highlight"
                color="#ffd1dc"
                animationDuration={800}
              >
                Platform Rankings Over Time
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Platform Rankings Over Time",
                  "This bump chart shows how platforms rank over time based on your activity. The lines represent ranking positions, with lower numbers indicating higher rankings.",
                  "bump",
                  bumpData
                )
              }
            >
              <ResponsiveBump
                data={bumpData}
                margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                lineWidth={3}
                activeLineWidth={6}
                inactiveLineWidth={3}
                inactiveOpacity={0.15}
                pointSize={10}
                activePointSize={16}
                inactivePointSize={0}
                pointColor="hsl(var(--background))"
                pointBorderWidth={3}
                activePointBorderWidth={3}
                pointBorderColor="hsl(var(--foreground))"
                axisTop={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
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
              />
            </div>
          </div>

          {/* Small Calendar - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="underline"
                color="#4ade80"
                strokeWidth={2}
                animationDuration={600}
              >
                Daily Activity Heatmap
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Daily Activity Calendar",
                  "This calendar heatmap shows your daily coding activity. Darker colors indicate more intense practice days.",
                  "calendar",
                  calendarData
                )
              }
            >
              <ResponsiveCalendar
                data={calendarData}
                from="2024-01-01"
                to="2024-01-31"
                emptyColor="hsl(var(--muted))"
                colors={["hsl(var(--muted-foreground))", "hsl(var(--primary))"]}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                yearSpacing={40}
                monthBorderColor="hsl(var(--border))"
                dayBorderWidth={1}
                dayBorderColor="hsl(var(--background))"
                theme={commonTheme}
              />
            </div>
          </div>

          {/* Original Charts - Time Spent Bar - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              <Highlighter
                action="highlight"
                color="#10b981"
                animationDuration={600}
              >
                Time Spent by Platform
              </Highlighter>
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Time Spent by Platform",
                  "This chart shows the total hours spent practicing on each platform. Higher values indicate more time investment in that particular platform.",
                  "bar",
                  timeSpentData,
                  ["value"],
                  "platform",
                  "paired"
                )
              }
            >
              <ResponsiveBar
                data={timeSpentData as any}
                keys={["value"]}
                indexBy="platform"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={{ scheme: "paired" }}
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

          {/* Original Charts - Questions Solved Pie - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              <Highlighter
                action="circle"
                color="#3b82f6"
                strokeWidth={2}
                animationDuration={700}
              >
                Questions Solved Distribution
              </Highlighter>
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Questions Solved Distribution",
                  "This pie chart displays the distribution of questions solved across different platforms. Each segment represents the proportion of problems solved on that platform.",
                  "pie",
                  pieData
                )
              }
            >
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

          {/* Medium Heatmap - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="box"
                color="#fbbf24"
                strokeWidth={2}
                animationDuration={700}
              >
                Topic vs Difficulty Matrix
              </Highlighter>
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Topic vs Difficulty Correlation",
                  "This heatmap shows the correlation between algorithmic topics and difficulty levels. Darker cells indicate more practice in that combination.",
                  "heatmap",
                  heatmapData
                )
              }
            >
              <ResponsiveHeatMap
                data={heatmapData}
                margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
                colors={{ type: "sequential", scheme: "greens" }}
                theme={commonTheme}
                axisTop={null}
                axisRight={null}
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
                borderColor="hsl(var(--background))"
                labelTextColor="hsl(var(--background))"
                animate={true}
                motionConfig="wobbly"
              />
            </div>
          </div>

          {/* Medium Sunburst - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="circle"
                color="#f87171"
                strokeWidth={2}
                animationDuration={800}
              >
                Topic Hierarchy Breakdown
              </Highlighter>
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Algorithmic Topic Hierarchy",
                  "This sunburst chart shows the hierarchical breakdown of algorithmic topics from general categories to specific subtopics.",
                  "sunburst",
                  sunburstData
                )
              }
            >
              <ResponsiveSunburst
                data={sunburstData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="value"
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                borderColor="hsl(var(--background))"
                childColor={{
                  from: "color",
                  modifiers: [["brighter", 0.2]],
                }}
                animate={true}
                motionConfig="wobbly"
              />
            </div>
          </div>

          {/* Original Charts - Questions by Difficulty - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              <Highlighter
                action="underline"
                color="#f59e0b"
                strokeWidth={2}
                animationDuration={600}
              >
                Questions by Difficulty
              </Highlighter>
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Questions by Difficulty Level",
                  "This stacked bar chart shows the breakdown of questions solved by difficulty level (Easy, Medium, Hard) for each platform. It helps identify your comfort zone and areas for improvement.",
                  "bar",
                  stackedBarData,
                  ["Easy", "Medium", "Hard"],
                  "platform",
                  "greens"
                )
              }
            >
              <ResponsiveBar
                data={stackedBarData}
                keys={["Easy", "Medium", "Hard"]}
                indexBy="platform"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={{ scheme: "greens" }}
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

          {/* Original Charts - Monthly Time Trend - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              <Highlighter
                action="box"
                color="#ef4444"
                strokeWidth={2}
                animationDuration={700}
              >
                Monthly Time Trend
              </Highlighter>
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Monthly Time Trend",
                  "This line chart shows your monthly practice time trend over the year. It helps visualize your consistency and identify periods of high or low activity, useful for planning future study schedules.",
                  "line",
                  lineData
                )
              }
            >
              <ResponsiveLine
                data={lineData}
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
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
                pointSize={8}
                pointColor="hsl(var(--background))"
                pointBorderWidth={2}
                pointBorderColor="hsl(var(--foreground))"
                pointLabelYOffset={-12}
                useMesh={true}
              />
            </div>
          </div>

          {/* Large Treemap - spans 8 columns */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="bracket"
                color="#a78bfa"
                strokeWidth={2}
                animationDuration={900}
              >
                Topic Distribution Treemap
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Topic Distribution Treemap",
                  "This treemap visualizes the relative sizes of different algorithmic topics based on your practice frequency. Larger rectangles represent more practiced topics.",
                  "treemap",
                  treemapData
                )
              }
            >
              <ResponsiveTreeMap
                data={treemapData}
                identity="name"
                value="value"
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                labelSkipSize={12}
                labelTextColor="hsl(var(--background))"
                parentLabelPosition="left"
                parentLabelTextColor="hsl(var(--foreground))"
                borderColor="hsl(var(--background))"
              />
            </div>
          </div>

          {/* Small Funnel - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="underline"
                color="#06b6d4"
                strokeWidth={2}
                animationDuration={700}
              >
                Problem Solving Funnel
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Problem Solving Conversion Funnel",
                  "This funnel chart shows the conversion from problems started to successfully solved, highlighting drop-off points in your problem-solving process.",
                  "funnel",
                  funnelData
                )
              }
            >
              <ResponsiveFunnel
                data={funnelData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                borderWidth={20}
                labelColor="hsl(var(--background))"
                beforeSeparatorLength={100}
                beforeSeparatorOffset={20}
                afterSeparatorLength={100}
                afterSeparatorOffset={20}
                currentPartSizeExtension={10}
                currentBorderWidth={40}
                motionConfig="wobbly"
              />
            </div>
          </div>

          {/* Original Charts - Attempts per Question - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              <Highlighter
                action="bracket"
                color="#8b5cf6"
                strokeWidth={2}
                animationDuration={800}
              >
                Average Attempts per Question
              </Highlighter>
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Average Attempts per Question",
                  "This metric shows how many attempts on average it takes to solve a question of each difficulty level. Lower values indicate better problem-solving efficiency and understanding.",
                  "bar",
                  attemptsBarData,
                  ["attempts"],
                  "difficulty",
                  "blues"
                )
              }
            >
              <ResponsiveBar
                data={attemptsBarData}
                keys={["attempts"]}
                indexBy="difficulty"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
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

          {/* Original Charts - Topics Frequency - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              <Highlighter
                action="highlight"
                color="#06b6d4"
                animationDuration={600}
              >
                Topics Frequency
              </Highlighter>
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Topics Frequency Distribution",
                  "This chart displays how frequently you practice different algorithmic topics. It helps identify your strongest areas and topics that might need more attention for a well-rounded skill set.",
                  "bar",
                  topicsBarData,
                  ["count"],
                  "topic",
                  "spectral"
                )
              }
            >
              <ResponsiveBar
                data={topicsBarData}
                keys={["count"]}
                indexBy="topic"
                margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
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

          {/* Full-width Sankey - spans 12 columns */}
          <div className="col-span-12 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="highlight"
                color="#ec4899"
                animationDuration={800}
              >
                Difficulty to Platform Flow
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Difficulty to Platform Flow",
                  "This Sankey diagram shows the flow of problems from difficulty levels to platforms, illustrating which platforms you prefer for different difficulty levels.",
                  "sankey",
                  sankeyData
                )
              }
            >
              <ResponsiveSankey
                data={sankeyData}
                margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                nodeOpacity={1}
                nodeHoverOthersOpacity={0.35}
                nodeThickness={18}
                nodeSpacing={24}
                nodeBorderWidth={0}
                nodeBorderColor={{
                  from: "color",
                  modifiers: [["darker", 0.8]],
                }}
                linkOpacity={0.5}
                linkHoverOthersOpacity={0.1}
                linkContract={3}
                enableLinkGradient={true}
                labelPosition="outside"
                labelOrientation="horizontal"
                labelPadding={16}
                labelTextColor="hsl(var(--foreground))"
                animate={true}
                motionConfig="wobbly"
              />
            </div>
          </div>

          {/* Medium Radial Bar - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="box"
                color="#10b981"
                strokeWidth={2}
                animationDuration={700}
              >
                Success Rates by Platform
              </Highlighter>
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Platform Success Rates",
                  "This radial bar chart shows success rates across different platforms. Longer bars indicate higher success percentages.",
                  "radialbar",
                  radialBarData
                )
              }
            >
              <ResponsiveRadialBar
                data={radialBarData}
                margin={{ top: 40, right: 120, bottom: 40, left: 40 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                borderColor="hsl(var(--background))"
                tracksColor="hsl(var(--muted))"
                radialAxisStart={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                }}
                circularAxisOuter={{
                  tickSize: 5,
                  tickPadding: 12,
                  tickRotation: 0,
                }}
                legends={[
                  {
                    anchor: "right",
                    direction: "column",
                    translateX: 80,
                    translateY: 0,
                    itemWidth: 80,
                    itemHeight: 14,
                    itemTextColor: "hsl(var(--foreground))",
                    symbolSize: 12,
                    symbolShape: "square",
                  },
                ]}
              />
            </div>
          </div>

          {/* Medium Waffle - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="circle"
                color="#8b5cf6"
                strokeWidth={2}
                animationDuration={800}
              >
                Difficulty Distribution
              </Highlighter>
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Problem Difficulty Distribution",
                  "This waffle chart shows the proportion of easy, medium, and hard problems you've solved. Each square represents a percentage of your total solved problems.",
                  "waffle",
                  waffleData
                )
              }
            >
              <ResponsiveWaffle
                data={waffleData}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                total={100}
                rows={10}
                columns={10}
                fillDirection="top"
                padding={1}
                animate={true}
                motionConfig="wobbly"
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    translateX: 0,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 14,
                    itemTextColor: "hsl(var(--foreground))",
                    symbolSize: 12,
                    symbolShape: "circle",
                  },
                ]}
              />
            </div>
          </div>

          {/* Original Charts - Mistakes by Difficulty - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Mistakes by Difficulty
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Mistakes by Difficulty Level",
                  "This chart tracks the number of mistakes made across different difficulty levels on each platform. Higher values in harder categories are normal, but consistent patterns can highlight areas needing more practice.",
                  "bar",
                  mistakesStackedData,
                  ["Easy", "Medium", "Hard"],
                  "platform",
                  "reds"
                )
              }
            >
              <ResponsiveBar
                data={mistakesStackedData}
                keys={["Easy", "Medium", "Hard"]}
                indexBy="platform"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={{ scheme: "reds" }}
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

          {/* Large Scatter Plot - spans 8 columns */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="bracket"
                color="#f59e0b"
                strokeWidth={2}
                animationDuration={900}
              >
                Time vs Attempts Correlation
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Time vs Attempts Scatter Plot",
                  "This scatter plot shows the correlation between time spent on problems and number of attempts. Each point represents a problem, with size indicating frequency.",
                  "scatterplot",
                  scatterData
                )
              }
            >
              <ResponsiveScatterPlot
                data={scatterData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: "linear", min: 0, max: "auto" }}
                xFormat=">-.2f"
                yScale={{ type: "linear", min: 0, max: "auto" }}
                yFormat=">-.2f"
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                blendMode="multiply"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Time (minutes)",
                  legendPosition: "middle",
                  legendOffset: 46,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Attempts",
                  legendPosition: "middle",
                  legendOffset: -60,
                }}
                legends={[
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    translateX: 130,
                    translateY: 0,
                    itemWidth: 100,
                    itemHeight: 12,
                    itemTextColor: "hsl(var(--foreground))",
                    symbolSize: 12,
                    symbolShape: "circle",
                  },
                ]}
              />
            </div>
          </div>

          {/* Small Network - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-lg p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="underline"
                color="#ef4444"
                strokeWidth={2}
                animationDuration={700}
              >
                Topic Relationships
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Algorithmic Topic Network",
                  "This network diagram shows relationships between different algorithmic topics. Connected nodes represent related concepts.",
                  "network",
                  networkData
                )
              }
            >
              <ResponsiveNetwork
                data={networkData}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                linkDistance={100}
                centeringStrength={0.3}
                repulsivity={6}
                nodeSize={16}
                activeNodeSize={24}
                nodeColor="hsl(var(--primary))"
                nodeBorderWidth={1}
                nodeBorderColor="hsl(var(--background))"
                linkThickness={2}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                theme={commonTheme}
              />
            </div>
          </div>

          {/* Original Charts - Success Rate Radar - spans 12 columns */}
          <div className="col-span-12 bg-card border border-border rounded-lg p-6 mb-8 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="highlight"
                color="#06b6d4"
                animationDuration={800}
              >
                Success Rate by Difficulty
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Success Rate by Difficulty",
                  "This radar chart shows your success rate percentage across different difficulty levels for each platform. It provides a comprehensive view of your problem-solving accuracy and helps identify platforms or difficulty levels where you excel or need improvement.",
                  "radar",
                  successRateData,
                  ["easy", "medium", "hard"],
                  "platform"
                )
              }
            >
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

          {/* Full-width Parallel Coordinates - spans 12 columns */}
          <div className="col-span-12 bg-card border border-border rounded-lg p-6 mb-8 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              <Highlighter
                action="box"
                color="#8b5cf6"
                strokeWidth={2}
                animationDuration={900}
              >
                Multi-dimensional Performance Analysis
              </Highlighter>
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Multi-dimensional Performance Analysis",
                  "This parallel coordinates plot shows relationships between multiple performance metrics simultaneously. Each line represents a problem type with different characteristics.",
                  "parallel",
                  parallelData
                )
              }
            >
              <ResponsiveParallelCoordinates
                data={parallelData}
                variables={[
                  {
                    key: "temp",
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    ticksPosition: "before",
                    legend: "Time",
                    legendPosition: "start",
                    legendOffset: 20,
                  },
                  {
                    key: "cost",
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    ticksPosition: "before",
                    legend: "Attempts",
                    legendPosition: "start",
                    legendOffset: 20,
                  },
                  {
                    key: "calories",
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    ticksPosition: "before",
                    legend: "Easy",
                    legendPosition: "start",
                    legendOffset: 20,
                  },
                  {
                    key: "fat",
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    ticksPosition: "before",
                    legend: "Medium",
                    legendPosition: "start",
                    legendOffset: 20,
                  },
                  {
                    key: "sugar",
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    ticksPosition: "before",
                    legend: "Hard",
                    legendPosition: "start",
                    legendOffset: 20,
                  },
                  {
                    key: "protein",
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    ticksPosition: "before",
                    legend: "Count",
                    legendPosition: "start",
                    legendOffset: 20,
                  },
                ]}
                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
                colors={{ scheme: "paired" }}
                theme={commonTheme}
                strokeWidth={2}
                lineOpacity={0.35}
                animate={true}
                motionConfig="wobbly"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal with iOS-style bouncy animation */}
      {modal.isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
          />

          {/* Modal Content with iOS-style bouncy animation */}
          <div
            className={`relative bg-card border border-border rounded-2xl shadow-2xl w-[90vw] h-[85vh] max-w-6xl transition-all duration-500 ease-out ${
              isAnimating
                ? "scale-100 opacity-100 translate-y-0"
                : "scale-75 opacity-0 translate-y-8"
            }`}
            style={{
              transitionTimingFunction: isAnimating
                ? "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                : "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold">{modal.title}</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  {modal.description}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chart Content */}
            <div className="p-6 h-[calc(100%-120px)]">{renderModalChart()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
