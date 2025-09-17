import React from "react";
import leetcodeIcon from "@/assets/support-icons/leetcode-svgrepo-com.svg";
import geeksforgeeksIcon from "@/assets/support-icons/geeksforgeeks.svg";
import hackerrankIcon from "@/assets/support-icons/hackerrank-svgrepo-com.svg";
import codechefIcon from "@/assets/support-icons/codechef-svgrepo-com.svg";
import tufIcon from "@/assets/support-icons/tuf.svg";

interface PlatformIconProps {
  platform:
    | "leetcode"
    | "geeksforgeeks"
    | "hackerrank"
    | "codechef"
    | "tufplus";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const iconPath = {
    leetcode: leetcodeIcon,
    geeksforgeeks: geeksforgeeksIcon,
    hackerrank: hackerrankIcon,
    codechef: codechefIcon,
    tufplus: tufIcon,
  };

  return (
    <img
      src={iconPath[platform]}
      alt={`${platform} icon`}
      className={`${sizeClasses[size]} ${className} dark:invert dark:brightness-200`}
    />
  );
};

export default PlatformIcon;
