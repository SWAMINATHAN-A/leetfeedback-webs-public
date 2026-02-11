import { InfiniteSlider } from "@/components/ui/infinite-slider";
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
    <section className="overflow-hidden py-4">
      <div className="group relative m-auto max-w-7xl px-4">
        <div className="flex flex-col items-start md:flex-row md:items-center">
          <div
            className="relative py-3 w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
          >
            <InfiniteSlider speedOnHover={20} speed={40} gap={60}>
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
          </div>
        </div>
      </div>
    </section>
  );
}
