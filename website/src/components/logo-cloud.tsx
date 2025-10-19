import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import PlatformIcon from "./PlatformIcon";

const platforms = [
  { name: "LeetCode", key: "leetcode" as const },
  { name: "GeeksforGeeks", key: "geeksforgeeks" as const },
  { name: "HackerRank", key: "hackerrank" as const },
  { name: "CodeChef", key: "codechef" as const },
  { name: "CodeForces", key: "codeforces" as const },
  { name: "TUF Plus", key: "tufplus" as const },
];

export default function LogoCloud() {
  return (
    <section className="overflow-hidden py-8">
      <div className="group relative m-auto max-w-7xl px-4">
        <div className="flex flex-col items-start md:flex-row md:items-center">
          <div className="md:max-w-44 md:border-r md:border-border md:pr-6">
            <p className="text-start text-sm text-muted-foreground font-mono">
              Supported Platforms
            </p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)] w-full">
            <InfiniteSlider speedOnHover={20} speed={40} gap={80}>
              {[...platforms, ...platforms].map((platform, index) => (
                <div
                  key={`${platform.key}-${index}`}
                  className="flex items-center gap-3"
                >
                  <PlatformIcon platform={platform.key} size="lg" />
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {platform.name}
                  </span>
                </div>
              ))}
            </InfiniteSlider>

            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
