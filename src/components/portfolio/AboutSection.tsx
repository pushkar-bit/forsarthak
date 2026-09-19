import { type CSSProperties } from "react";
import { FadeIn } from "../jack/FadeIn";
import { AnimatedText } from "../jack/AnimatedText";
import { ContactButton } from "../jack/ContactButton";
import { Layers, Zap, Users, Code, Compass, ArrowUpRight } from "lucide-react";

const PARAGRAPH_TEXT =
  "I am a product-led engineer specializing in AI systems, full-stack architectures, and high-growth consumer products. I take ideas from an ambiguous problem statement through PRD, architecture, and deployment — until real users are loving the experience.";

const PILLARS = [
  {
    icon: Layers,
    title: "Problem to Production",
    desc: "Authored PRDs, designed data models, and shipped platforms handling 29k+ live requests.",
  },
  {
    icon: Zap,
    title: "AI & Fast Systems",
    desc: "RAG architectures, vector embeddings, sub-second latency targets, and LLM integrations.",
  },
  {
    icon: Users,
    title: "Community Founder",
    desc: "Created ICHOR Run Club (@ichor.club) from scratch — 500+ members, sold-out races.",
  },
];

const SKILL_PILLS = [
  "TypeScript",
  "Next.js",
  "Python",
  "FastAPI",
  "PyTorch",
  "PostgreSQL",
  "Redis",
  "Zustand",
  "FastEmbed",
  "PRD & Strategy",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-10 py-24 sm:py-32 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Top-left: Moon icon */}
      <div className="w-[110px] sm:w-[150px] md:w-[190px] absolute top-[3%] left-[1%] sm:left-[2%] md:left-[3%] pointer-events-none select-none z-10 opacity-70 hover:opacity-100 transition-opacity">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt=""
            loading="lazy"
            className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(59,130,246,0.3)]"
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="w-[90px] sm:w-[130px] md:w-[160px] absolute bottom-[5%] left-[2%] sm:left-[4%] md:left-[6%] pointer-events-none select-none z-10 opacity-70">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt=""
            loading="lazy"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="w-[110px] sm:w-[150px] md:w-[190px] absolute top-[3%] right-[1%] sm:right-[2%] md:right-[3%] pointer-events-none select-none z-10 opacity-70">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt=""
            loading="lazy"
            className="w-full h-auto object-contain drop-shadow-[0_10px_35px_rgba(236,72,153,0.3)]"
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="w-[120px] sm:w-[150px] md:w-[190px] absolute bottom-[5%] right-[2%] sm:right-[4%] md:right-[6%] pointer-events-none select-none z-10 opacity-70">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt=""
            loading="lazy"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </FadeIn>
      </div>

      {/* Center content */}
      <div className="z-20 flex flex-col items-center max-w-6xl mx-auto w-full">
        {/* Title */}
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight select-none mb-4"
            style={{ fontSize: "clamp(3rem, 11vw, 150px)" } as CSSProperties}
          >
            About Me
          </h2>
        </FadeIn>

        {/* Narrative bio */}
        <div className="max-w-2xl mx-auto mb-14 px-4">
          <AnimatedText
            text={PARAGRAPH_TEXT}
            className="text-[#D7E2EA]/90 font-normal text-center leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
          />
        </div>

        {/* Interactive Profile Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-5xl mx-auto text-left mb-12">
          {/* Left: Pushkar's Profile Dossier Card */}
          <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-[32px] p-6 backdrop-blur-xl flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <img
                  src="/pushkar.jpg"
                  alt="Pushkar Jain"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-white/20 shadow-lg"
                  style={{ objectPosition: "center 20%" }}
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0C0C0C]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-0.5">
                  NST x Rishihood Uni
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Pushkar Jain
                </h3>
                <p className="text-xs text-white/60">Product & AI Engineer</p>
              </div>
            </div>

            <div className="space-y-3 py-3 border-y border-white/10 text-xs">
              <div className="flex items-center justify-between text-white/70">
                <span className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  Location
                </span>
                <span className="font-medium text-white">Delhi NCR, India 🇮🇳</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-blue-400" />
                  Primary Focus
                </span>
                <span className="font-medium text-white">Consumer AI & Systems</span>
              </div>
              <div className="flex items-center justify-between text-white/70">
                <span className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-pink-400" />
                  Community
                </span>
                <a
                  href="https://www.instagram.com/ichor.club/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-pink-300 hover:underline flex items-center gap-1"
                >
                  @ichor.club (500+)
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-5 pt-2">
              <span className="text-[11px] font-mono text-white/50 block mb-2 uppercase tracking-wider">
                Core Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SKILL_PILLS.map((pill) => (
                  <span
                    key={pill}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80 hover:bg-white/15 transition-colors"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 3 Value Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="bg-white/[0.03] border border-white/10 rounded-[28px] p-5 sm:p-6 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 group flex items-start gap-4 sm:gap-5"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 text-purple-300 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-white/40">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {p.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <FadeIn delay={0.2} y={20}>
            <ContactButton href="#contact" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
