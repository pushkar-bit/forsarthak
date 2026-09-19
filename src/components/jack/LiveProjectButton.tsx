import { type ReactNode } from "react";

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export function LiveProjectButton({
  href,
  onClick,
  children = "Live Project",
  className = "",
}: LiveProjectButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all duration-200 hover:bg-[#D7E2EA]/10 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
