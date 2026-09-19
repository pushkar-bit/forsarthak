export function Navbar() {
  const navItems = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-20 w-full bg-white/[0.88] backdrop-blur-md border-b border-[rgba(0,0,0,0.1)]">
      <div className="max-w-[1120px] mx-auto px-5 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-baseline gap-2 group text-decoration-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a0a]"
        >
          <span className="font-semibold text-[#0a0a0a] text-base sm:text-lg tracking-tight">
            Pushkar Jain
          </span>
          <span className="text-[#8a8a8a] text-xs sm:text-sm font-normal">
            product & AI engineer
          </span>
        </a>

        <nav aria-label="Main Navigation" className="hidden sm:flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-normal text-[#6a6a6a] hover:text-[#0a0a0a] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a0a0a]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
