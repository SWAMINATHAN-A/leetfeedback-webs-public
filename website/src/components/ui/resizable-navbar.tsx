"use client";
import { cn } from "@/lib/utils";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavExpandableContentProps {
  children: React.ReactNode;
  className?: string;
  isExpanded: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
        scale: visible ? [1, 0.95, 1.02, 1] : 1,
        rotateX: visible ? [0, -2, 1, 0] : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 12,
        mass: 0.8,
        width: {
          type: "spring",
          stiffness: 120,
          damping: 15,
          bounce: 0.6,
        },
        scale: {
          duration: 0.8,
          times: [0, 0.3, 0.7, 1],
          ease: [0.68, -0.55, 0.265, 1.55],
        },
        rotateX: {
          duration: 0.6,
          ease: "easeInOut",
        },
      }}
      style={{
        minWidth: "800px",
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start lg:flex",
        visible
          ? "liquidGlass-wrapper liquidGlass-nav"
          : "bg-transparent dark:bg-transparent",
        "max-lg:!hidden", // Force hide desktop navbar on mobile
        className
      )}
    >
      {visible && (
        <>
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
        </>
      )}
      <motion.div
        animate={{
          opacity: visible ? [0.7, 1] : 1,
          y: visible ? [5, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.4, delay: 0.2 },
          y: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          },
        }}
        className={cn(
          "liquidGlass-content flex flex-row items-center w-full",
          !visible && "px-6 py-3"
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <div className="liquidGlass-spacerLeft" />
      <motion.div
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "flex flex-row items-center justify-center space-x-2 text-sm font-medium transition duration-200 lg:flex lg:space-x-2",
          className
        )}
      >
        {items.map((item, idx) => (
          <motion.a
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className="liquidGlass-navItem relative text-inherit"
            key={`link-${idx}`}
            href={item.link}
            initial={{ scale: 1, y: 0 }}
            animate={{
              scale: 1,
              y: 0,
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 17,
              },
            }}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-3xl bg-white/20 dark:bg-white/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
              />
            )}
            <motion.span
              className="relative z-20"
              animate={{
                y: 0,
              }}
              transition={{
                delay: idx * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {item.name}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
      <div className="liquidGlass-spacerRight" />
    </>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "16px" : "0px",
        paddingLeft: visible ? "16px" : "0px",
        borderRadius: visible ? "2rem" : "2rem",
        y: visible ? 20 : 0,
        scale: visible ? 0.95 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.6,
        width: {
          type: "spring",
          stiffness: 180,
          damping: 20,
        },
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      }}
      style={{
        transformOrigin: "center center",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center px-0 py-2 lg:hidden",
        visible
          ? "liquidGlass-wrapper liquidGlass-nav"
          : "bg-transparent dark:bg-transparent",
        "lg:!hidden", // Ensure mobile navbar never shows on desktop
        className
      )}
    >
      {visible && (
        <>
          <div className="liquidGlass-effect"></div>
          <div className="liquidGlass-tint"></div>
          <div className="liquidGlass-shine"></div>
        </>
      )}
      <motion.div
        animate={{
          opacity: visible ? 1 : 1,
        }}
        transition={{
          opacity: { duration: 0.3, delay: 0.1 },
        }}
        className={cn(
          "liquidGlass-content flex flex-col items-center w-full",
          !visible && "px-4 py-3"
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavExpandableContent = ({
  children,
  className,
  isExpanded,
}: MobileNavExpandableContentProps) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.3,
          }}
          className={cn(
            "flex w-full flex-col items-center gap-4 pb-4 overflow-hidden",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <CloseIcon className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <MenuIcon className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <motion.a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
      whileHover={{
        scale: 1.05,
        y: -1,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
        whileHover={{
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      />
      <motion.span
        className="font-medium text-black dark:text-white"
        whileHover={{
          x: 2,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        Startup
      </motion.span>
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  [key: string]: any;
}) => {
  const baseStyles =
    "px-4 py-2 rounded-3xl text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 15 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {React.createElement(
        Tag as any,
        {
          href: href || undefined,
          className: cn(baseStyles, variantStyles[variant], className),
          ...props,
        },
        <motion.span
          initial={{ opacity: 1 }}
          whileHover={{
            opacity: [1, 0.8, 1],
            transition: { duration: 0.3 },
          }}
        >
          {children}
        </motion.span>
      )}
    </motion.div>
  );
};
