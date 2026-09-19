import { type ReactNode } from "react";

interface ButtonProps {
  variant?: "filled" | "ghost";
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function Button({
  variant = "filled",
  href,
  onClick,
  children,
  className = "",
  target,
  rel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 text-sm sm:text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a0a] active:scale-[0.98]";

  const variantStyles =
    variant === "filled"
      ? "bg-[#0a0a0a] text-white hover:bg-[#262626] border border-[#0a0a0a] px-5 py-2.5 sm:px-6 sm:py-3"
      : "bg-transparent text-[#0a0a0a] border border-[rgba(0,0,0,0.18)] hover:border-[#0a0a0a] hover:bg-black/[0.03] px-4 py-2 sm:px-5 sm:py-2.5";

  const combinedClass = `${baseStyles} ${variantStyles} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        className={combinedClass}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noreferrer" : undefined)}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClass}>
      {children}
    </button>
  );
}
