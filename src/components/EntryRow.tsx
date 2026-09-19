import { type ReactNode } from "react";

interface EntryRowProps {
  title: string;
  date?: string;
  org?: string;
  children?: ReactNode;
  asHeading?: "h2" | "h3";
  className?: string;
}

export function EntryRow({
  title,
  date,
  org,
  children,
  asHeading = "h3",
  className = "",
}: EntryRowProps) {
  const HeadingTag = asHeading;

  return (
    <div className={`border-b border-[rgba(0,0,0,0.1)] py-8 first:pt-0 last:border-b-0 last:pb-0 ${className}`}>
      <div className="flex items-baseline justify-between gap-4 flex-wrap sm:flex-nowrap">
        <HeadingTag className="text-lg sm:text-xl font-semibold text-[#0a0a0a] tracking-tight">
          {title}
        </HeadingTag>
        {date && (
          <span className="text-xs sm:text-sm text-[#8a8a8a] shrink-0 font-normal">
            {date}
          </span>
        )}
      </div>

      {org && (
        <div className="text-sm text-[#6a6a6a] mt-1 mb-3 font-normal">
          {org}
        </div>
      )}

      {children && (
        <div className="text-sm sm:text-[15px] leading-relaxed text-[#3a3a3a] max-w-[66ch]">
          {children}
        </div>
      )}
    </div>
  );
}
