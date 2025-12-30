import React, { useState, useEffect, lazy, Suspense } from "react";
// Lazy load Nivo chart components to reduce initial bundle size
const ResponsiveBar = lazy(() => import("@nivo/bar").then(m => ({ default: m.ResponsiveBar })));
const ResponsivePie = lazy(() => import("@nivo/pie").then(m => ({ default: m.ResponsivePie })));
const ResponsiveLine = lazy(() => import("@nivo/line").then(m => ({ default: m.ResponsiveLine })));
const ResponsiveRadar = lazy(() => import("@nivo/radar").then(m => ({ default: m.ResponsiveRadar })));
const ResponsiveBump = lazy(() => import("@nivo/bump").then(m => ({ default: m.ResponsiveBump })));
const ResponsiveCalendar = lazy(() => import("@nivo/calendar").then(m => ({ default: m.ResponsiveCalendar })));
const ResponsiveHeatMap = lazy(() => import("@nivo/heatmap").then(m => ({ default: m.ResponsiveHeatMap })));
const ResponsiveSunburst = lazy(() => import("@nivo/sunburst").then(m => ({ default: m.ResponsiveSunburst })));
const ResponsiveTreeMap = lazy(() => import("@nivo/treemap").then(m => ({ default: m.ResponsiveTreeMap })));
const ResponsiveFunnel = lazy(() => import("@nivo/funnel").then(m => ({ default: m.ResponsiveFunnel })));
const ResponsiveSankey = lazy(() => import("@nivo/sankey").then(m => ({ default: m.ResponsiveSankey })));
const ResponsiveRadialBar = lazy(() => import("@nivo/radial-bar").then(m => ({ default: m.ResponsiveRadialBar })));
const ResponsiveWaffle = lazy(() => import("@nivo/waffle").then(m => ({ default: m.ResponsiveWaffle })));
const ResponsiveScatterPlot = lazy(() => import("@nivo/scatterplot").then(m => ({ default: m.ResponsiveScatterPlot })));
const ResponsiveChord = lazy(() => import("@nivo/chord").then(m => ({ default: m.ResponsiveChord })));
const ResponsiveNetwork = lazy(() => import("@nivo/network").then(m => ({ default: m.ResponsiveNetwork })));
const ResponsiveParallelCoordinates = lazy(() => import("@nivo/parallel-coordinates").then(m => ({ default: m.ResponsiveParallelCoordinates }))) as any;

import { NumberTicker } from "../components/magicui/number-ticker";
import { AuroraText } from "../components/ui/aurora-text";
import { SparklesText } from "../components/ui/sparkles-text";
import { Ripple } from "../components/magicui/ripple";
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
import { useTheme } from "../contexts/ThemeContext";

// Chart loading fallback component
const ChartLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-muted-foreground">Loading chart...</div>
  </div>
);

// Wrapper to automatically add Suspense to any chart component
const ChartWithSuspense: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<ChartLoader />}>
    {children}
  </Suspense>
);

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
  const { isDark } = useTheme();

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

  const [pastelColors, setPastelColors] = useState<string[]>(() =>
    isDark
      ? [
          "#FFB3BA", // pastel rose pink
          "#FFDFBA", // pastel peach
          "#FFFFBA", // pastel lemon
          "#BAFFC9", // pastel mint green
          "#BAE1FF", // pastel sky blue
          "#E0BAFF", // pastel lavender
          "#FFB3D9", // pastel blush pink
          "#FFD1DC", // pastel rose
          "#F1948A", // pastel coral
          "#82E0AA", // pastel emerald
          "#85C1E9", // pastel powder blue
          "#F7DC6F", // pastel gold
          "#BB8FCE", // pastel violet
          "#F8C471", // pastel amber
          "#AED6F1", // pastel ice blue
          "#B5EAD7", // pastel sage
          "#D7BDE2", // pastel plum
          "#FFE5B4", // pastel apricot
          "#C7CEEA", // pastel periwinkle
          "#A8E6CF", // pastel aqua
          "#FFD3A5", // pastel melon
          "#B19CD9", // pastel lilac
          "#B3FFE3", // pastel seafoam
          "#D4A5A5", // pastel dusty rose
        ]
      : [
          "#E74C3C", // coral red
          "#F39C12", // bright orange
          "#F1C40F", // sunny yellow
          "#27AE60", // forest green
          "#3498DB", // ocean blue
          "#9B59B6", // royal purple
          "#E67E22", // burnt orange
          "#16A085", // teal
          "#8E44AD", // eggplant purple
          "#D35400", // pumpkin orange
          "#2C3E50", // navy blue
          "#C0392B", // brick red
          "#E83E8C", // hot pink
          "#17A2B8", // cyan blue
          "#28A745", // lime green
          "#FFC107", // amber yellow
          "#6F42C1", // indigo
          "#20C997", // mint green
          "#6C757D", // slate gray
          "#DC3545", // raspberry red
          "#FD7E14", // orange
          "#007BFF", // bright blue
          "#28A745", // green
        ],
  );

  // Pastel color schemes that adapt to dark/light mode
  const getPastelColors = () => {
    // Shuffle the array to get random colors each time
    return [...pastelColors].sort(() => Math.random() - 0.5);
  };

  // Specific color schemes with some pinkish shades for certain charts
  const getNonPinkColors = () => {
    const baseColors = isDark
      ? [
          "#FFB3BA", // pastel rose pink
          "#FFDFBA", // pastel peach
          "#FFFFBA", // pastel lemon
          "#BAFFC9", // pastel mint green
          "#BAE1FF", // pastel sky blue
          "#E0BAFF", // pastel lavender
          "#FFB3D9", // pastel blush pink
          "#FFD1DC", // pastel rose
          "#F1948A", // pastel coral
          "#82E0AA", // pastel emerald
          "#85C1E9", // pastel powder blue
          "#F7DC6F", // pastel gold
          "#BB8FCE", // pastel violet
          "#F8C471", // pastel amber
          "#AED6F1", // pastel ice blue
          "#B5EAD7", // pastel sage
          "#D7BDE2", // pastel plum
          "#FFE5B4", // pastel apricot
          "#C7CEEA", // pastel periwinkle
          "#A8E6CF", // pastel aqua
          "#FFD3A5", // pastel melon
          "#B19CD9", // pastel lilac
          "#B3FFE3", // pastel seafoam
          "#D4A5A5", // pastel dusty rose
        ]
      : [
          "#E74C3C", // coral red
          "#F39C12", // bright orange
          "#F1C40F", // sunny yellow
          "#27AE60", // forest green
          "#3498DB", // ocean blue
          "#9B59B6", // royal purple
          "#E67E22", // burnt orange
          "#16A085", // teal
          "#8E44AD", // eggplant purple
          "#D35400", // pumpkin orange
          "#2C3E50", // navy blue
          "#C0392B", // brick red
          "#E83E8C", // hot pink
          "#17A2B8", // cyan blue
          "#28A745", // lime green
          "#FFC107", // amber yellow
          "#6F42C1", // indigo
          "#20C997", // mint green
          "#6C757D", // slate gray
          "#DC3545", // raspberry red
          "#FD7E14", // orange
          "#007BFF", // bright blue
          "#28A745", // green
        ];

    // Shuffle the array to get random colors each time
    return baseColors.sort(() => Math.random() - 0.5);
  };

  const openModal = (
    title: string,
    description: string,
    chartType: string,
    data: any,
    keys?: string[],
    indexBy?: string,
    colorScheme?: string,
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
              colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors().slice(0, 2)}
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
            colors={{ type: "quantize", colors: getPastelColors() }}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            linkOpacity={0.7}
            linkHoverOthersOpacity={0.2}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            colors={getPastelColors()}
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
            linkThickness={3}
            linkBlendMode="normal"
            linkColor="hsl(var(--muted-foreground))"
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
            colors={getPastelColors()}
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
      <div className="container">
        <h1 className="text-8xl font-extrabold mt-12 mb-12 text-center">
          Your <AuroraText>Dashboard</AuroraText>
        </h1>

        {/* Overall Streak Card */}
        <div className="mb-16 mt-20 flex justify-center">
          <div className="bg-card border border-border rounded-3xl px-8 py-8 max-w-lg w-full relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] overflow-hidden">
            {(() => {
              const getRippleColors = (streak: number) => {
                if (streak >= 100)
                  return "[&>div]:bg-yellow-500/25 [&>div]:border-yellow-500/50"; // Gold for legendary streaks
                if (streak >= 50)
                  return "[&>div]:bg-purple-500/25 [&>div]:border-purple-500/50"; // Purple for high streaks
                if (streak >= 25)
                  return "[&>div]:bg-red-600/25 [&>div]:border-red-600/50"; // Deep red for good streaks
                if (streak >= 10)
                  return "[&>div]:bg-red-500/25 [&>div]:border-red-500/50"; // Standard red for decent streaks
                if (streak >= 5)
                  return "[&>div]:bg-orange-500/25 [&>div]:border-orange-500/50"; // Orange for building streaks
                return "[&>div]:bg-gray-400/25 [&>div]:border-gray-400/50"; // Gray for low streaks
              };

              return (
                <Ripple
                  className={`opacity-60 ${getRippleColors(overallStreak)}`}
                  mainCircleSize={300}
                  mainCircleOpacity={0.25}
                  numCircles={6}
                />
              );
            })()}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-center relative z-10">
              <SparklesText
                className={`text-8xl font-extrabold ${
                  overallStreak >= 100
                    ? "text-yellow-500"
                    : overallStreak >= 50
                      ? "text-purple-500"
                      : overallStreak >= 25
                        ? "text-red-600"
                        : overallStreak >= 10
                          ? "text-red-500"
                          : overallStreak >= 5
                            ? "text-orange-500"
                            : "text-gray-400"
                }`}
              >
                <NumberTicker value={overallStreak} />
              </SparklesText>
              <p className="text-muted-foreground mt-4 text-lg">
                Current Streak
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid - Inconsistent Layout - Wrapped in Suspense for lazy-loaded Nivo charts */}
        <Suspense fallback={<div className="text-center py-12"><ChartLoader /></div>}>
        <div className="grid grid-cols-12 gap-6 mb-8">{/* Large Bump Chart - spans 8 columns */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Platform Rankings Over Time
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Platform Rankings Over Time",
                  "This bump chart shows how platforms rank over time based on your activity. The lines represent ranking positions, with lower numbers indicating higher rankings.",
                  "bump",
                  bumpData,
                )
              }
            >
              <ResponsiveBump
                data={bumpData}
                margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
                colors={getPastelColors()}
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
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Average Attempts by Difficulty
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Average Attempts by Difficulty",
                  "This chart shows the average number of attempts needed to solve problems of different difficulty levels. It helps understand how challenging each difficulty level is for you.",
                  "bar",
                  attemptsBarData,
                  ["attempts"],
                  "difficulty",
                  "oranges",
                )
              }
            >
              <ResponsiveBar
                data={attemptsBarData}
                keys={["attempts"]}
                indexBy="difficulty"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={getNonPinkColors()}
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

          {/* Original Charts - Time Spent Bar - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Time Spent by Platform
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
                  "paired",
                )
              }
            >
              <ResponsiveBar
                data={timeSpentData as any}
                keys={["value"]}
                indexBy="platform"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={getNonPinkColors()}
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
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Questions Solved Distribution
            </h3>
            <div
              className="h-64"
              onClick={() =>
                openModal(
                  "Questions Solved Distribution",
                  "This pie chart displays the distribution of questions solved across different platforms. Each segment represents the proportion of problems solved on that platform.",
                  "pie",
                  pieData,
                )
              }
            >
              <ResponsivePie
                data={pieData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={getPastelColors()}
                theme={commonTheme}
                borderWidth={1}
                borderColor="hsl(var(--background))"
              />
            </div>
          </div>

          {/* Average Attempts by Difficulty - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Daily Activity Heatmap
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Daily Activity Calendar",
                  "This calendar heatmap shows your daily coding activity. Darker colors indicate more intense practice days.",
                  "calendar",
                  calendarData,
                )
              }
            >
              <ResponsiveCalendar
                data={calendarData}
                from="2024-01-01"
                to="2024-01-31"
                emptyColor="hsl(var(--muted))"
                colors={getPastelColors().slice(0, 2)}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                yearSpacing={40}
                monthBorderColor="hsl(var(--border))"
                dayBorderWidth={1}
                dayBorderColor="hsl(var(--background))"
                theme={commonTheme}
              />
            </div>
          </div>

          {/* Medium Sunburst - spans 6 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Topic Hierarchy Breakdown
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Algorithmic Topic Hierarchy",
                  "This sunburst chart shows the hierarchical breakdown of algorithmic topics from general categories to specific subtopics.",
                  "sunburst",
                  sunburstData,
                )
              }
            >
              <ResponsiveSunburst
                data={sunburstData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                id="name"
                value="value"
                colors={getNonPinkColors()}
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

          {/* Original Charts - Questions by Difficulty - spans 2 columns */}
          <div className="col-span-12 lg:col-span-6 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Questions by Difficulty
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
                  "greens",
                )
              }
            >
              <ResponsiveBar
                data={stackedBarData}
                keys={["Easy", "Medium", "Hard"]}
                indexBy="platform"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={getPastelColors()}
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

          {/* Original Charts - Monthly Time Trend - spans 12 columns (full width) */}
          <div className="col-span-12 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Monthly Time Trend</h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Monthly Time Trend",
                  "This line chart shows your monthly practice time trend over the year. It helps visualize your consistency and identify periods of high or low activity, useful for planning future study schedules.",
                  "line",
                  lineData,
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
                colors={getNonPinkColors()}
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
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Topic Distribution Treemap
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Topic Distribution Treemap",
                  "This treemap visualizes the relative sizes of different algorithmic topics based on your practice frequency. Larger rectangles represent more practiced topics.",
                  "treemap",
                  treemapData,
                )
              }
            >
              <ResponsiveTreeMap
                data={treemapData}
                identity="name"
                value="value"
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                colors={getPastelColors()}
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
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Problem Solving Funnel
            </h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Problem Solving Conversion Funnel",
                  "This funnel chart shows the conversion from problems started to successfully solved, highlighting drop-off points in your problem-solving process.",
                  "funnel",
                  funnelData,
                )
              }
            >
              <ResponsiveFunnel
                data={funnelData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                colors={getPastelColors()}
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

          {/* Topics Frequency - spans 8 columns (2/3 width) */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Topics Frequency</h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Topics Frequency Distribution",
                  "This chart displays how frequently you practice different algorithmic topics. It helps identify your strongest areas and topics that might need more attention for a well-rounded skill set.",
                  "bar",
                  topicsBarData,
                  ["count"],
                  "topic",
                  "spectral",
                )
              }
            >
              <ResponsiveBar
                data={topicsBarData}
                keys={["count"]}
                indexBy="topic"
                margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
                padding={0.3}
                colors={getNonPinkColors()}
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
          {/* Small Waffle - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Difficulty Distribution
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Problem Difficulty Distribution",
                  "This waffle chart shows the proportion of easy, medium, and hard problems you've solved. Each square represents a percentage of your total solved problems.",
                  "waffle",
                  waffleData,
                )
              }
            >
              <ResponsiveWaffle
                data={waffleData}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                colors={getPastelColors()}
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

          {/* Original Charts - Mistakes by Difficulty - spans 8 columns */}
          <div className="col-span-12 lg:col-span-8 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">
              Mistakes by Difficulty
            </h3>
            <div
              className="h-80"
              onClick={() =>
                openModal(
                  "Mistakes by Difficulty Level",
                  "This chart tracks the number of mistakes made across different difficulty levels on each platform. Higher values in harder categories are normal, but consistent patterns can highlight areas needing more practice.",
                  "bar",
                  mistakesStackedData,
                  ["Easy", "Medium", "Hard"],
                  "platform",
                  "reds",
                )
              }
            >
              <ResponsiveBar
                data={mistakesStackedData}
                keys={["Easy", "Medium", "Hard"]}
                indexBy="platform"
                margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
                padding={0.3}
                colors={getPastelColors()}
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

          {/* Small Network - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 bg-card border border-border rounded-3xl p-6 relative group cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-4">Topic Relationships</h3>
            <div
              className="h-96"
              onClick={() =>
                openModal(
                  "Algorithmic Topic Network",
                  "This network diagram shows relationships between different algorithmic topics. Connected nodes represent related concepts.",
                  "network",
                  networkData,
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
                linkThickness={3}
                linkBlendMode="normal"
                linkColor="hsl(var(--muted-foreground))"
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
              Success Rate by Difficulty
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
                  "platform",
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
                colors={getPastelColors()}
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
        </div>
        </Suspense>
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
            className={`relative bg-card border border-border rounded-3xl shadow-2xl w-[90vw] h-[85vh] max-w-6xl transition-all duration-500 ease-out ${
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
            <div className="p-6 h-[calc(100%-120px)]">
              <Suspense fallback={<ChartLoader />}>
                {renderModalChart()}
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
