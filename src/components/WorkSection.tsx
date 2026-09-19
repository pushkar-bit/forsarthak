import { useState, useEffect } from "react";
import { SectionShell } from "./SectionShell";
import { MetricPill } from "./MetricPill";
import { Button } from "./Button";

interface Project {
  name: string;
  pill?: string;
  role: string;
  bullets: string[];
  stack: string;
  liveUrl: string;
  liveLabel: string;
  sourceUrl: string;
  proofUrl?: string;
  proofLabel?: string;
}

const PROJECTS: Project[] = [
  {
    name: "biol",
    pill: "29,000+ requests",
    role: "Campus social platform · Architect and PRD lead, co-built and shipped with one engineer",
    bullets: [
      "A student social platform for discovery, anonymous chat, campus stories, and RAG-powered document processing. Defined the spec, feature set, and success metrics before a line of code was written.",
      "Reached 100 users on launch day and over 29,000 requests in total with no paid acquisition, running entirely on free-tier infrastructure.",
      "Grounded product decisions in primary research on how campus-age users actually discover, engage with, and churn from social products.",
      "Designed the in-app points economy and peer contact-exchange flow, specifying idempotent transactions and atomic accept logic so concurrent requests could never double-spend points or leak contact details before acceptance.",
      "Owned application security end to end: HTTPS/TLS enforcement, frame-ancestor restrictions to close clickjacking vectors, and layered edge rate limiting with DDoS mitigation. Held through campus traffic spikes with no security incidents.",
    ],
    stack:
      "React 19, Vite 8, Express v5, Prisma v5, SQLite, Socket.IO, RAG engine (Google Generative AI + pdf-parse), Tailwind CSS v4, Zustand, Cloudinary, Google OAuth, Helmet",
    liveUrl: "https://biol.club",
    liveLabel: "biol.club",
    sourceUrl: "https://github.com/pushkar-bit",
    proofUrl: "/img/biol-proof.png",
    proofLabel: "View proof (29.4k)",
  },
  {
    name: "ICHOR",
    pill: "500+ member community",
    role: "Social fitness platform · Product, gamification design, and full-stack build",
    bullets: [
      "A gamified fitness platform that turns running into territory wars. GPS-verified routes claim mapped territory, held ground generates passive points, and contested territory appreciates in value the more it is attacked and defended.",
      "Architected the gamification layer and points economy, where distance, pace, streaks, nutrition, and battles won compound into a single non-resetting score — plus clan mechanics, where crews pool territory into a shared map empire and declare 48-hour wars on rivals.",
      "Integrated the Strava API and a RAG engine end to end: OAuth 2.0 onboarding via Strava and Google, automated activity sync, and GPS route ingestion feeding live leaderboards, contextual workout insights, and territory claims under developer-tier athlete caps.",
      "Directed the full design system — brand identity, dark palette, and high-fidelity feed, leaderboard, and challenge surfaces in Figma — and shipped developer-ready specs.",
    ],
    stack:
      "Next.js 16, React 19, TypeScript, MongoDB (Mongoose), Upstash Redis, gamification engine (Turf.js + Strava API), RAG engine (Gemini AI), Firebase, Leaflet, Tailwind CSS v4, Framer Motion, Three.js, Sentry",
    liveUrl: "https://ichor-xi.vercel.app",
    liveLabel: "ichor-xi.vercel.app",
    sourceUrl: "https://github.com/pushkar-bit",
  },
  {
    name: "InsightRAG",
    role: "Multi-tenant AI RAG platform · Full-stack and AI architecture",
    bullets: [
      "Multi-tenant document ingestion and vector search pipeline delivering context-aware answers with zero hallucinations by anchoring every output to source chunks.",
      "Architected background job processing with BullMQ and Redis for asynchronous document parsing, chunking, and vector embedding generation with automatic retries and dead-letter queues.",
      "Integrated Groq LLM inference for low-latency retrieval response times and implemented guardrails ensuring transparent citation mapping back to verified uploads.",
    ],
    stack: "Next.js, Groq, BullMQ, MongoDB, Zustand, Tailwind CSS",
    liveUrl: "https://rag-lac-ten.vercel.app",
    liveLabel: "rag-lac-ten.vercel.app",
    sourceUrl: "https://github.com/pushkar-bit",
  },
  {
    name: "HomeQuest",
    role: "AI real-estate marketplace · Full-stack build and real-time architecture",
    bullets: [
      "Full-stack property discovery platform designed to eliminate intermediary broker friction through direct buyer-to-agent communication and verified property listings.",
      "Built real-time messaging and inquiry workflows powered by Socket.IO, enabling instant property inquiries and scheduling handshakes between buyers and agents.",
      "Integrated OpenAI GPT-4o for contextual conversational property search, querying structured listings based on natural-language user criteria and budget constraints.",
    ],
    stack: "React, Node.js, Express.js, MySQL, Prisma, Socket.IO, GPT-4o",
    liveUrl: "https://homequest1.vercel.app",
    liveLabel: "homequest1.vercel.app",
    sourceUrl: "https://github.com/pushkar-bit",
  },
  {
    name: "Zombie Survival Shooter",
    role: "Browser game engine · Architecture and game systems design",
    bullets: [
      "Developed a 2D wave-based survival browser game engine built entirely in TypeScript and HTML5 Canvas adhering to OOP and SOLID design principles.",
      "Implemented entity-component patterns, collision detection algorithms, spatial partitioning, dynamic weapon mechanics, and enemy state machines with smooth 60fps rendering.",
    ],
    stack: "Next.js, React, TypeScript, HTML5 Canvas",
    liveUrl: "https://zombie-survival-shooter.vercel.app",
    liveLabel: "zombie-survival-shooter.vercel.app",
    sourceUrl: "https://github.com/pushkar-bit",
  },
];

export function WorkSection() {
  const [selectedProof, setSelectedProof] = useState<{
    url: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProof(null);
      }
    };
    if (selectedProof) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProof]);

  return (
    <SectionShell id="work" label="Selected work">
      <div className="flex flex-col">
        {PROJECTS.map((project, idx) => (
          <article
            key={project.name}
            className={`py-10 sm:py-12 ${
              idx === 0 ? "pt-0" : "border-t border-[rgba(0,0,0,0.1)]"
            }`}
          >
            {/* Title + Pill */}
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] tracking-tight">
                {project.name}
              </h3>
              {project.pill && (
                project.proofUrl ? (
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedProof({
                        url: project.proofUrl!,
                        name: project.name,
                      })
                    }
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    title="Click to view proof"
                  >
                    <MetricPill>{project.pill}</MetricPill>
                  </button>
                ) : (
                  <MetricPill>{project.pill}</MetricPill>
                )
              )}
            </div>

            {/* Role line */}
            <p className="text-sm text-[#6a6a6a] mt-1.5 mb-4">
              {project.role}
            </p>

            {/* Bullets */}
            <ul className="space-y-2.5 max-w-[66ch] mb-5 text-sm sm:text-[15px] leading-relaxed text-[#3a3a3a]">
              {project.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#8a8a8a] select-none shrink-0 mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Stack line */}
            <p className="text-xs sm:text-sm text-[#6a6a6a] max-w-[66ch] mb-6 leading-normal">
              <strong className="font-semibold text-[#0a0a0a]">Stack: </strong>
              {project.stack}
            </p>

            {/* Link row */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="ghost"
                href={project.liveUrl}
                className="text-xs sm:text-sm py-1.5 px-3.5 sm:px-4"
              >
                {project.liveLabel}
              </Button>
              <Button
                variant="ghost"
                href={project.sourceUrl}
                className="text-xs sm:text-sm py-1.5 px-3.5 sm:px-4"
              >
                Source
              </Button>
              {project.proofUrl && (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setSelectedProof({
                      url: project.proofUrl!,
                      name: project.name,
                    })
                  }
                  className="text-xs sm:text-sm py-1.5 px-3.5 sm:px-4 text-[#2a1c47] border-[#2a1c47]/20 hover:border-[#2a1c47]/50"
                >
                  {project.proofLabel ?? "View proof"}
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Proof Lightbox Modal */}
      {selectedProof && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProof(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl border border-[rgba(0,0,0,0.1)] relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[rgba(0,0,0,0.08)]">
              <div>
                <h4 className="text-lg font-semibold text-[#0a0a0a] tracking-tight">
                  {selectedProof.name} — Analytics Proof
                </h4>
                <p className="text-xs sm:text-sm text-[#6a6a6a] mt-0.5">
                  Verified via biol admin dashboard (Usage &amp; Visitors) showing 29,430 all-time requests
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProof(null)}
                className="text-[#6a6a6a] hover:text-[#0a0a0a] p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-lg font-semibold leading-none cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Image display */}
            <div className="overflow-auto my-4 rounded-xl border border-[rgba(0,0,0,0.08)] bg-neutral-900 flex items-center justify-center max-h-[60vh]">
              <img
                src={selectedProof.url}
                alt={`${selectedProof.name} analytics dashboard proof`}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[#8a8a8a] pt-2">
              <span>papa-pikachu.vercel.app · biol admin</span>
              <a
                href={selectedProof.url}
                target="_blank"
                rel="noreferrer"
                className="text-[#0a0a0a] font-medium underline hover:text-neutral-600"
              >
                Open image in new tab ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </SectionShell>
  );
}
