import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  shadowColor?: string;
  as?: React.ElementType;
}

export function LineShadowText({
  children,
  shadowColor = "white", // CHANGED: Default to white so it shows on dark backgrounds
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  const content = typeof children === "string" ? children : null;

  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  return (
    <MotionComponent
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "text-white", // Ensure main text is white by default (matches image)
        // Pseudo-element setup
        "after:absolute after:left-[0.06em] after:top-[0.06em] after:content-[attr(data-text)]",
        // The striped background
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_55%)]",
        // Shadow positioning and sizing
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        // Animation
        "after:animate-line-shadow",
        className
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}
