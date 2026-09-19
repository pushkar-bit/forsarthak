import { type CSSProperties } from "react";
import { FadeIn } from "../jack/FadeIn";

const ENTRIES = [
  {
    num: "01",
    role: "Software Developer Intern",
    date: "May – Jun 2025",
    org: "Launched Global",
    location: "Remote",
    instagram: null,
    desc: "Built a reusable, modular restaurant menu frontend template that let non-technical owners edit content without touching core code, designed for rapid customisation and redeployment across client sites.",
  },
  {
    num: "02",
    role: "Growth & Development Head",
    date: "Apr 2025",
    org: "Apollo MedSkills",
    location: "Rishihood University",
    instagram: null,
    desc: "Developed consumer engagement and conversion strategies for the Apollo MedSkills program, contributing to marketing, audience targeting, and strategic brand communication.",
  },
  {
    num: "03",
    role: "Founder & President, ICHOR Run Club",
    date: "Jun 2026 – present",
    org: "Rishihood University",
    location: "Delhi, India",
    instagram: { handle: "@ichor.club", url: "https://www.instagram.com/ichor.club/" },
    desc: "Founded the club and grew it to a 500+ member community within the first month. Built brand identity, constitution, and operating model from zero. Created and delivered RU-Rox, a flagship obstacle race — every bib sold out on the first edition.",
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="w-full bg-[#0C0C0C] text-[#D7E2EA] pt-24 sm:pt-32 pb-24 sm:pb-32 px-5 sm:px-8 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" } as CSSProperties}
          >
            Experience
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {ENTRIES.map((entry, i) => (
            <FadeIn key={entry.num} delay={i * 0.12} y={30}>
              <div
                className="py-8 sm:py-10 md:py-12 flex flex-col sm:flex-row items-start gap-4 sm:gap-8 md:gap-12"
                style={{
                  borderTop: "1px solid rgba(215, 226, 234, 0.1)",
                  ...(i === ENTRIES.length - 1
                    ? { borderBottom: "1px solid rgba(215, 226, 234, 0.1)" }
                    : {}),
                }}
              >
                {/* Number */}
                <span
                  className="font-black text-[#D7E2EA]/20 leading-none select-none shrink-0 min-w-[80px] sm:min-w-[110px]"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" } as CSSProperties}
                >
                  {entry.num}
                </span>

                {/* Content */}
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className="font-semibold uppercase tracking-wide text-[#D7E2EA]"
                      style={{ fontSize: "clamp(1rem, 2.2vw, 1.8rem)" } as CSSProperties}
                    >
                      {entry.role}
                    </h3>
                    <div className="flex items-center gap-2 text-[#D7E2EA]/50 text-sm">
                      <span>{entry.org}</span>
                      <span>·</span>
                      <span>{entry.location}</span>
                    </div>
                    {entry.instagram && (
                      <a
                        href={entry.instagram.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#D7E2EA]/70 hover:text-[#E1306C] transition-colors duration-200 text-xs font-medium mt-0.5 w-fit"
                      >
                        {/* Instagram icon */}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <circle cx="12" cy="12" r="4"/>
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                        </svg>
                        <span>{entry.instagram.handle}</span>
                      </a>
                    )}
                    <p
                      className="font-light leading-relaxed text-[#D7E2EA]/60 max-w-2xl mt-2"
                      style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" } as CSSProperties}
                    >
                      {entry.desc}
                    </p>
                  </div>
                  <span
                    className="text-[#D7E2EA]/30 text-sm font-light whitespace-nowrap shrink-0 sm:text-right mt-0.5"
                  >
                    {entry.date}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
