"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px before reveal */
  y?: number;
  as?: "div" | "li" | "article";
};

/** Fades + lifts content in once when it scrolls into view. Static when reduced motion is on. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
}
