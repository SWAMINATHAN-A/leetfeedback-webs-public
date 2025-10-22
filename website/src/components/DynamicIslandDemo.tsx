"use client";

import { useEffect, useState } from "react";
import { Loader, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "@/components/ui/dynamic-island";

interface DynamicIslandDemoProps {
  onComplete: () => void;
}

const COOKIE_CONSENT_KEY = "leetfeedback_cookie_consent";

const DynamicIslandContent = ({ onComplete }: DynamicIslandDemoProps) => {
  const { state, setSize } = useDynamicIslandSize();
  const [hasConsent, setHasConsent] = useState(false);

  // Check if user already accepted cookies
  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent === "accepted") {
      setHasConsent(true);
      // Show loading animation for 700ms, then complete
      setTimeout(() => {
        setSize("empty");
        setTimeout(onComplete, 400);
      }, 700);
    }
  }, [onComplete, setSize]);

  // Schedule animations based on consent status
  useScheduledAnimations(
    hasConsent
      ? [
          { size: "default", delay: 0 },
          { size: "large", delay: 100 }, // Show loading for 700ms total
        ]
      : [
          { size: "default", delay: 0 },
          { size: "large", delay: 100 },
          { size: "medium", delay: 1200 },
        ]
  );

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    // Animate to compact, stay for 500ms, then disappear
    setSize("compact");
    setTimeout(() => {
      setSize("empty");
      setTimeout(onComplete, 400);
    }, 1100); // 600ms transition + 500ms display time
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    // Animate to compact, stay for 500ms, then disappear
    setSize("compact");
    setTimeout(() => {
      setSize("empty");
      setTimeout(onComplete, 400);
    }, 1100); // 600ms transition + 500ms display time
  };

  // Loading state
  const renderLoadingState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative flex w-full items-center justify-center gap-4 px-4">
        <BlurFade delay={0.1} inView>
          <Loader className="animate-spin h-12 w-12 text-[#fcba70]" />
        </BlurFade>
        <BlurFade delay={0.2} inView>
          <DynamicTitle className="my-auto text-3xl font-black tracking-tighter text-white">
            Loading
          </DynamicTitle>
        </BlurFade>
      </div>
    </DynamicContainer>
  );

  // Cookie consent state
  const renderCookieConsentState = () => (
    <DynamicContainer className="flex flex-col justify-between px-3 pt-4 text-left text-white h-full">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <BlurFade delay={0.1}>
          <Cookie className="h-7 w-7 text-white" />
        </BlurFade>
        <BlurFade delay={0.15}>
          <DynamicTitle className="text-2xl font-black tracking-tighter">
            Cookie Consent
          </DynamicTitle>
        </BlurFade>
      </div>
      <BlurFade delay={0.2}>
        <DynamicDescription className="leading-6 text-neutral-300 pl-2 text-base mb-3">
          We use cookies to enhance your experience. View our{" "}
          <a href="/cookies" className="text-[#fcba70] hover:underline">
            cookie policy
          </a>
          .
        </DynamicDescription>
      </BlurFade>

      <div className="flex flex-row gap-2 mb-2 px-2">
        <BlurFade delay={0.25} className="flex-1">
          <Button
            onClick={handleAccept}
            className="w-full bg-[#fcba70]/80 hover:bg-[#fcba70]/80 text-white font-semibold rounded-3xl"
          >
            Accept
          </Button>
        </BlurFade>
        <BlurFade delay={0.3} className="flex-1">
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full border-[#577590] bg-[#577590]/80 text-neutral-300 hover:bg-[#577590]/80 font-semibold rounded-3xl"
          >
            Decline
          </Button>
        </BlurFade>
      </div>
    </DynamicContainer>
  );

  // Compact transition state
  const renderCompactState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative w-full flex items-center justify-center">
        <BlurFade delay={0.1} inView>
          <DynamicDescription className="text-2xl font-medium tracking-tighter text-white">
            ✓
          </DynamicDescription>
        </BlurFade>
      </div>
    </DynamicContainer>
  );

  // Don't render anything if already has consent (will trigger completion)
  if (hasConsent && state.size === "default") {
    return null;
  }

  // Render based on current size
  const renderState = () => {
    switch (state.size) {
      case "default":
      case "large":
        return renderLoadingState();
      case "medium":
        return renderCookieConsentState();
      case "compact":
        return renderCompactState();
      default:
        return null;
    }
  };

  return (
    <DynamicIsland id="cookie-consent-island">{renderState()}</DynamicIsland>
  );
};

export function DynamicIslandDemo({ onComplete }: DynamicIslandDemoProps) {
  return (
    <DynamicIslandProvider initialSize="default">
      <DynamicIslandContent onComplete={onComplete} />
    </DynamicIslandProvider>
  );
}
