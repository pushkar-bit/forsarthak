import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  yOffset = 12,
  className = "",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
