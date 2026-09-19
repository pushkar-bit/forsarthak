import { useState } from "react";
import { ContactButton } from "../jack/ContactButton";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 px-5 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center transition-all duration-300 border-b border-white/[0.08]"
        style={{
          background: "rgba(12, 12, 12, 0.8)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* Profile Logo with Pushkar's Image */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-sky-400 group-hover:scale-105 transition-transform duration-300 shadow-md shadow-purple-500/20">
              <img
                src="/pushkar.jpg"
                alt="Pushkar Jain"
                className="w-full h-full object-cover rounded-full"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
            {/* Live active dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0C0C0C]"></span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className="text-[17px] sm:text-[20px] font-bold tracking-tight text-white leading-none group-hover:text-purple-200 transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pushkar Jain
            </span>
            <span className="text-[18px] sm:text-[22px] text-purple-400/80 select-none leading-none group-hover:rotate-45 transition-transform duration-300">
              ✳︎
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 text-[14px] text-[#D7E2EA]/80 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          {NAV_LINKS.map((l, i) => (
            <span key={l.label} className="flex items-center">
              <a
                href={l.href}
                className="hover:text-white transition-colors duration-200 px-3 py-1 rounded-full hover:bg-white/10 font-medium"
              >
                {l.label}
              </a>
              {i < NAV_LINKS.length - 1 && (
                <span className="text-white/20 text-xs mx-0.5">·</span>
              )}
            </span>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <ContactButton href="#contact" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-50 relative rounded-lg bg-white/5 border border-white/10"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className="w-5 h-[2px] bg-white block transition-all duration-300 origin-center"
            style={{ transform: open ? "rotate(45deg) translateY(7px)" : "none" }}
          />
          <span
            className="w-5 h-[2px] bg-white block transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="w-5 h-[2px] bg-white block transition-all duration-300 origin-center"
            style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }}
          />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className="fixed inset-0 z-30 flex flex-col justify-center px-8 gap-6 md:hidden transition-all duration-300"
        style={{
          background: "rgba(10, 10, 10, 0.96)",
          backdropFilter: "blur(24px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
          <img
            src="/pushkar.jpg"
            alt="Pushkar Jain"
            className="w-14 h-14 object-cover rounded-full border-2 border-purple-500/50"
            style={{ objectPosition: "center 20%" }}
          />
          <div>
            <h2 className="text-xl font-bold text-white">Pushkar Jain</h2>
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Available for Opportunities
            </p>
          </div>
        </div>

        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-[28px] font-semibold text-white hover:text-purple-300 transition-colors leading-none"
          >
            {l.label}
          </a>
        ))}
        <div className="mt-4">
          <ContactButton href="#contact" onClick={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
