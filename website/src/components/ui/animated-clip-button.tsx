import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const animatedButtonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer transition-all duration-[800ms] cubic-bezier(0.625, 0.05, 0, 1) hover:scale-95",
  {
    variants: {
      variant: {
        default: "bg-black text-white dark:bg-white dark:text-black border border-gray-800 dark:border-gray-200 hover:bg-gray-900 dark:hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-accent",
        outline: "border border-border bg-transparent hover:bg-accent",
        white: "bg-white text-black hover:bg-gray-100",
        dark: "bg-zinc-900 text-white hover:bg-zinc-800",
      },
      size: {
        default: "px-4 py-2 rounded-xl",
        sm: "px-3 py-1.5 rounded-lg text-sm",
        lg: "px-5 py-2.5 rounded-xl text-base",
        xl: "px-6 py-3 rounded-full text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AnimatedClipButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof animatedButtonVariants> {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const AnimatedClipButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedClipButtonProps
>(
  (
    {
      text,
      icon,
      iconPosition = "left",
      variant,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const clipHeight = "1.4em";
    
    return (
      <button
        ref={ref}
        className={cn("group", animatedButtonVariants({ variant, size, className }))}
        style={
          {
            "--clipHeight": clipHeight,
          } as React.CSSProperties
        }
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="mr-2 flex-shrink-0">{icon}</span>
        )}
        <div className="inline-flex">
          {text.split("").map((letter, index) => (
            <div
              key={index}
              className="relative inline-flex overflow-hidden flex-col"
              style={{ height: clipHeight }}
            >
              <div
                className="relative inline-flex items-center transition-all duration-[800ms] cubic-bezier(0.625, 0.05, 0, 1) translate-y-0 group-hover:translate-y-[calc(-1*var(--clipHeight))]"
                style={{
                  height: clipHeight,
                  transitionDelay: `${index * 7}ms`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </div>
              <div
                className="relative inline-flex items-center transition-all duration-[800ms] cubic-bezier(0.625, 0.05, 0, 1) translate-y-0 group-hover:translate-y-[calc(-1*var(--clipHeight))]"
                style={{
                  height: clipHeight,
                  transitionDelay: `${index * 7}ms`,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </div>
            </div>
          ))}
        </div>
        {icon && iconPosition === "right" && (
          <span className="ml-2 flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

AnimatedClipButton.displayName = "AnimatedClipButton";

export { AnimatedClipButton, animatedButtonVariants };
