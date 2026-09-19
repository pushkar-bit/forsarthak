import { type ReactNode } from "react";

interface MetricPillProps {
  children?: ReactNode;
  className?: string;
}

export function MetricPill({ children, className = "" }: MetricPillProps) {
  if (!children) return null;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-tight bg-[#2a1c47]/[0.07] text-[#2a1c47] border border-[#2a1c47]/[0.15] ${className}`}
    >
      {children}
    </span>
  );
}
