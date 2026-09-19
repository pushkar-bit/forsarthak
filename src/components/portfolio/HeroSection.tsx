import { useState, useEffect, useRef } from "react";
import { PortraitCard } from "./PortraitCard";
import { ArrowUpRight, Copy, Check, Sparkles, Send } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function useTypewriter(text: string, speed = 32, startDelay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    let index = 0;
    setDisplayed("");
    setDone(false);

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index++;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

const TYPEWRITER_TEXT =
  "I take consumer products from the problem statement through the PRD, the architecture, and the launch — to real users on the other side.";

const STATS = [
  { figure: "29,000+", label: "requests on biol", highlight: "biol" },
  { figure: "500+", label: "ICHOR community members", highlight: "ICHOR" },
  { figure: "100", label: "users on launch day", highlight: "launch" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 350);
    return () => clearTimeout(t);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("pushkar.jain2024@nst.rishihood.edu.in");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center pt-28 pb-16 px-5 sm:px-8 md:px-12 bg-[#0C0C0C]"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(900px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 51, 234, 0.12), rgba(59, 130, 246, 0.05), transparent 70%)`,
        }}
      />

      {/* Cyber Grid Background overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Layout: Two Columns on LG */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Bio & Manifesto */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 hover:bg-white/[0.08] transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[12px] sm:text-[13px] font-medium tracking-wide text-white/90">
              Open to Product & AI Engineering Roles
            </span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400 ml-0.5" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-4">
            Pushkar Jain
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-light text-white/60 mt-1">
              Product & <span className="hero-heading font-semibold text-transparent bg-clip-text">AI Engineer</span>
            </span>
          </h1>

          {/* Typewriter text */}
          <div className="min-h-[72px] sm:min-h-[80px] mb-8">
            <p
              className="text-[#D7E2EA] font-normal leading-relaxed text-base sm:text-lg md:text-xl max-w-xl"
            >
              {displayed}
              {!done && (
                <span
                  className="cursor-blink inline-block w-[2px] h-[1.1em] bg-purple-400 align-middle ml-[3px]"
                  aria-hidden
                />
              )}
            </p>
          </div>

          {/* Interactive Pill Buttons */}
          <div
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
            className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 w-full"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-white text-[#0C0C0C] font-semibold rounded-full text-[13px] sm:text-[14px] px-5 py-2.5 shadow-lg shadow-white/10 hover:bg-[#D7E2EA] hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>View my work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="mailto:pushkar.jain2024@nst.rishihood.edu.in"
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-5 py-2.5 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Send className="w-3.5 h-3.5 text-purple-300" />
              <span>Email</span>
            </a>

            <a
              href="https://linkedin.com/in/pushkarjainn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-5 py-2.5 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/pushkar-bit"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-5 py-2.5 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <GithubIcon className="w-3.5 h-3.5 text-white/80" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.instagram.com/ichor.club/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-pink-500/20 text-white border border-white/15 hover:border-pink-500/40 rounded-full text-[13px] sm:text-[14px] px-4 sm:px-5 py-2.5 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>@ichor.club</span>
            </a>

            {/* Quick Copy Email pill */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white border border-white/10 rounded-full text-[12px] sm:text-[13px] px-3.5 py-2 backdrop-blur-md transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white/50" />
                  <span className="font-mono text-xs text-white/60">pushkar.jain2024@nst...</span>
                </>
              )}
            </button>
          </div>

          {/* Stats strip */}
          <div
            style={{
              opacity: pillsVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}
            className="w-full pt-6 border-t border-white/10 flex flex-wrap gap-8 sm:gap-14"
          >
            {STATS.map((stat) => (
              <div key={stat.figure} className="flex flex-col group">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-none group-hover:text-purple-300 transition-colors">
                  {stat.figure}
                </span>
                <span className="text-xs text-white/50 mt-1.5 leading-tight font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Holographic Portrait Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
          <PortraitCard />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
