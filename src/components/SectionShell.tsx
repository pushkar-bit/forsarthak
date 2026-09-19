import { type ReactNode } from "react";

interface SectionShellProps {
  id?: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function SectionShell({ id, label, children, className = "" }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`relative w-full border-t border-[rgba(0,0,0,0.1)] py-14 sm:py-20 md:py-24 ${className}`}
    >
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6 md:gap-12 lg:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <h2 className="text-[11px] font-semibold tracking-[0.14em] text-[#8a8a8a]">
              {label}
            </h2>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
