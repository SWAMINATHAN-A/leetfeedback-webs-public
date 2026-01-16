"use client";

import React from "react";
import { NavigatingLink } from "@/components/NavigatingLink";
import LetterSwapForward from "@/components/ui/LetterSwapForward";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Roadmap",
    href: "/roadmap",
    description: "[1]",
  },
  {
    name: "Privacy Policy",
    href: "/privacy",
    description: "[2]",
  },
  {
    name: "Terms of Service",
    href: "/terms",
    description: "[3]",
  },
  {
    name: "Cookie Policy",
    href: "/cookies",
    description: "[4]",
  },
];

export const Skiper58 = () => {
  return (
    <ul className="bs flex min-h-full w-full flex-1 flex-col items-start justify-start gap-0 rounded-2xl px-4 pt-8 pb-0 bg-card">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-start overflow-visible"
          key={index}
        >
          <NavigatingLink to={item.href} className="relative flex items-start">
            <LetterSwapForward
              label={item.name.toUpperCase()}
              className="text-4xl font-extrabold uppercase leading-[0.7] tracking-[-0.03em] transition-colors lg:text-5xl"
              staggerDuration={0.03}
              staggerFrom="first"
              reverse={false}
            />
          </NavigatingLink>
        </li>
      ))}
    </ul>
  );
};

