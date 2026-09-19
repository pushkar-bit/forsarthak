import { type CSSProperties } from "react";
import { FadeIn } from "../jack/FadeIn";
import { ContactButton } from "../jack/ContactButton";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full bg-[#0C0C0C] text-[#D7E2EA] py-24 sm:py-32 md:py-40 px-5 sm:px-8 md:px-10 relative overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(118,33,177,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-8 sm:gap-10 md:gap-14">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" } as CSSProperties}
          >
            Contact
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} y={20}>
          <h3
            className="font-semibold text-[#D7E2EA] leading-tight tracking-tight max-w-[20ch] mx-auto"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)" } as CSSProperties}
          >
            Looking for an AI/LLM product or product engineering intern?
          </h3>
        </FadeIn>

        <FadeIn delay={0.25} y={20}>
          <p
            className="font-light text-[#D7E2EA]/60 max-w-[52ch] mx-auto leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" } as CSSProperties}
          >
            I'm open to internship roles where the work runs from the problem
            statement to the shipped product. The fastest way to reach me is email.
          </p>
        </FadeIn>

        <FadeIn delay={0.35} y={20}>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <ContactButton href="mailto:pushkar.jain2024@nst.rishihood.edu.in" />
            <a
              href="https://linkedin.com/in/pushkarjainn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA]/80 text-sm font-medium uppercase tracking-widest px-8 py-3 hover:border-[#D7E2EA] hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/5 transition-all duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/pushkar-bit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA]/80 text-sm font-medium uppercase tracking-widest px-8 py-3 hover:border-[#D7E2EA] hover:text-[#D7E2EA] hover:bg-[#D7E2EA]/5 transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/ichor.club/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA]/80 text-sm font-medium tracking-widest px-8 py-3 hover:border-[#E1306C] hover:text-[#E1306C] hover:bg-[#E1306C]/5 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @ichor.club
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Footer strip */}
      <div className="mt-24 sm:mt-32 border-t border-[#D7E2EA]/10 pt-8 flex items-center justify-between flex-wrap gap-4 text-xs text-[#D7E2EA]/30">
        <span>Pushkar Jain, Delhi, India</span>
        <span>Updated September 2026</span>
      </div>
    </section>
  );
}
