import { type CSSProperties, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FadeIn } from "../jack/FadeIn";
import { LiveProjectButton } from "../jack/LiveProjectButton";
import { ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

interface ProjectData {
  num: string;
  name: string;
  category: string;
  metric?: string;
  role: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  liveUrl: string;
  instagramUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    num: "01",
    name: "biol",
    category: "Campus Social Platform",
    metric: "29,000+ requests",
    role: "Architect & PRD lead — co-built and shipped with one engineer",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Img2: "/img/biol-proof.png",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    liveUrl: "https://biol.club",
  },
  {
    num: "02",
    name: "ICHOR",
    category: "Social Fitness Platform",
    metric: "500+ members",
    role: "Product, gamification design & full-stack build",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    liveUrl: "https://ichor-xi.vercel.app",
    instagramUrl: "https://www.instagram.com/ichor.club/",
  },
  {
    num: "03",
    name: "InsightRAG",
    category: "AI RAG Platform",
    role: "Full-stack and AI architecture",
    col1Img1:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1Img2:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2Img:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    liveUrl: "https://rag-lac-ten.vercel.app",
  },
];

const TOTAL = PROJECTS.length;

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (TOTAL - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center"
      style={{ position: "sticky", top: `calc(6rem + ${index * 28}px)` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-5 sm:p-7 md:p-9 flex flex-col justify-between h-full shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 flex-wrap pb-4 sm:pb-5 border-b border-[#D7E2EA]/15">
          <div className="flex items-baseline gap-3 sm:gap-5 flex-wrap">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 90px)" } as CSSProperties}
            >
              {project.num}
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-purple-300 uppercase tracking-widest font-mono">
                {project.category}
              </span>
              <h3
                className="font-bold uppercase tracking-tight text-white"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" } as CSSProperties}
              >
                {project.name}
              </h3>
              {project.metric && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {project.metric}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-[#D7E2EA]/60 hidden sm:block max-w-[260px] text-right font-light">
              {project.role}
            </span>
            {project.instagramUrl && (
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 text-xs font-semibold tracking-wide transition-all duration-200"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@ichor.club</span>
                <ArrowUpRight className="w-3 h-3 text-pink-400" />
              </a>
            )}
            <LiveProjectButton href={project.liveUrl} />
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-3 sm:pt-4 flex-1 min-h-0">
          {/* Left column (40%) */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div
              className="w-full rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#161616] border border-white/10 shrink-0 group relative"
              style={{ height: "clamp(110px, 14vw, 200px)" }}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="w-full rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#161616] border border-white/10 flex-1 group relative"
              style={{ height: "clamp(140px, 20vw, 300px)" }}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {project.name === "biol" && (
                <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                  <span>Verified 29k+ Proof</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              )}
            </div>
          </div>

          {/* Right column (60%) */}
          <div className="md:col-span-7 rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#161616] border border-white/10 min-h-[200px] group relative">
            <img
              src={project.col2Img}
              alt={`${project.name} full view`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="work"
      className="w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-28 md:pt-36 pb-32 relative z-10 px-4 sm:px-8"
    >
      <div className="max-w-6xl mx-auto mb-16 sm:mb-20 md:mb-28">
        <FadeIn delay={0} y={30}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight select-none"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" } as CSSProperties}
          >
            Work
          </h2>
        </FadeIn>
      </div>

      <div className="flex flex-col gap-10 sm:gap-12 max-w-6xl mx-auto">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.num} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}
