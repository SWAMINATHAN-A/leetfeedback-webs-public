"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  className?: string;
  position?: "top" | "bottom";
}

const blurLayers = [
  { blur: 2, opacity: "0 25%" },
  { blur: 4, opacity: "25% 50%" },
  { blur: 8, opacity: "50% 75%" },
  { blur: 12, opacity: "75% 100%" },
];

export const ProgressiveBlur = React.memo(function ProgressiveBlur({
  className,
  position = "bottom",
}: ProgressiveBlurProps) {
  const direction = position === "top" ? "to top" : "to bottom";

  return (
    <div
      className={cn(
        "pointer-events-none z-20",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{ height: "7%" }}
    >
      {blurLayers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${layer.blur}px)`,
            WebkitBackdropFilter: `blur(${layer.blur}px)`,
            maskImage: `linear-gradient(${direction}, transparent ${
              layer.opacity.split(" ")[0]
            }, black ${layer.opacity.split(" ")[1]})`,
            WebkitMaskImage: `linear-gradient(${direction}, transparent ${
              layer.opacity.split(" ")[0]
            }, black ${layer.opacity.split(" ")[1]})`,
          }}
        />
      ))}
    </div>
  );
});

export default ProgressiveBlur;
