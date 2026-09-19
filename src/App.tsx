import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const SYMBOLS = ["PJ", "AI", ">>", "{}", "//"];

// Hero background image
const HERO_IMAGE_URL = "/img/imagetobeused.jpg";

// Gallery: only real project screenshots + Pushkar's official image
const GALLERY_IMAGES = [
  "/img/imagetobeused.jpg",
  "/img/shot-biol.png",
  "/img/biol-proof.png",
  "/img/shot-homequest.png",
  "/img/shot-ichor.png",
  "/img/shot-rag.png",
  "/img/imagetobeused.jpg",
  "/img/shot-biol.png",
  "/img/shot-ichor.png",
  "/img/shot-rag.png",
];

// Captions and metadata for each gallery tile
interface GalleryTileMeta {
  title: string;
  tag: string;
  url?: string;
  sectionId: string;
}

const GALLERY_META: Record<number, GalleryTileMeta> = {
  0: {
    title: "Pushkar Jain",
    tag: "Profile",
    sectionId: "about-section",
  },
  1: {
    title: "biol.club",
    tag: "Campus Social",
    url: "https://www.biol.club",
    sectionId: "biol-project",
  },
  2: {
    title: "29,430 Requests",
    tag: "biol Proof",
    url: "https://www.biol.club",
    sectionId: "biol-project",
  },
  3: {
    title: "HomeQuest AI",
    tag: "Real Estate",
    url: "https://homequest1.vercel.app",
    sectionId: "homequest-project",
  },
  4: {
    title: "ICHOR Run Club",
    tag: "500+ Community",
    url: "https://ichor-xi.vercel.app",
    sectionId: "ichor-project",
  },
  5: {
    title: "InsightRAG",
    tag: "Enterprise AI",
    url: "https://rag-lac-ten.vercel.app/",
    sectionId: "rag-project",
  },
  6: {
    title: "Pushkar Jain",
    tag: "AI & Product",
    sectionId: "about-section",
  },
  7: {
    title: "biol.club",
    tag: "Live Social",
    url: "https://www.biol.club",
    sectionId: "biol-project",
  },
  8: {
    title: "ICHOR Platform",
    tag: "Territory Wars",
    url: "https://ichor-xi.vercel.app",
    sectionId: "ichor-project",
  },
  9: {
    title: "InsightRAG Engine",
    tag: "Vector Search",
    url: "https://rag-lac-ten.vercel.app/",
    sectionId: "rag-project",
  },
};

/* Grid layout algorithm (per spec) */
function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let idx = 0;
  let r = 0;
  while (idx < count) {
    const row = new Array(cols).fill(-1);
    const a = (r * 2 + (r % 2)) % cols;
    row[a] = idx++;
    if (idx < count && r % 3 === 0) {
      let b = (a + 2) % cols;
      if (b === a) b = (a + 1) % cols;
      row[b] = idx++;
    }
    rows.push(row);
    r++;
  }
  return rows;
}

function colsForWidth(w: number): number {
  if (w < 640) return 2;
  if (w < 1024) return 3;
  return 4;
}

/* ------------------------------------------------------------------ */
/* RESUME DATA DEFINITIONS                                            */
/* ------------------------------------------------------------------ */

interface Project {
  id: string;
  title: string;
  role: string;
  tagline: string;
  scale: string;
  href?: string;
  github?: string;
  tech: string[];
  bullets: string[];
  img?: string;
}

const PROJECTS: Project[] = [
  {
    id: "biol-project",
    title: "biol — Campus Social Platform",
    role: "Architect & PRD Lead",
    tagline:
      "A student social platform for discovery, anonymous chat, campus stories, and RAG-powered document processing.",
    scale: "29,000+ requests · biol.club",
    href: "https://www.biol.club",
    github: "https://github.com/pushkar-bit",
    tech: [
      "React 19",
      "Vite 8",
      "Express v5",
      "Prisma v5",
      "SQLite",
      "Socket.IO",
      "RAG Engine (Gemini AI + pdf-parse)",
      "Tailwind CSS v4",
      "Zustand",
      "Cloudinary",
      "Google OAuth",
      "Helmet",
    ],
    bullets: [
      "Architect and PRD lead: defined spec, feature set, and success metrics before development, then co-built and shipped with one engineer.",
      "Reached 100 users on launch day and 29,000+ requests with zero paid acquisition, running entirely on free-tier infrastructure.",
      "Grounded product decisions in primary research on Gen Z consumer behavior regarding how campus-age users discover, engage with, and churn from social products.",
      "Designed in-app points economy (signup and survey rewards) and peer contact-exchange flow, specifying idempotent transactions and atomic accept logic so concurrent requests could not double-spend points or leak contact details before acceptance.",
      "Owned application security end-to-end: enforced HTTPS/TLS, closed clickjacking vectors with frame-ancestor restrictions, and layered edge rate limiting and DDoS mitigation; held through campus traffic spikes without security incidents.",
    ],
    img: "/img/shot-biol.png",
  },
  {
    id: "ichor-project",
    title: "ICHOR — Social Fitness Platform",
    role: "Founder & Full-Stack Lead",
    tagline:
      "Gamified social fitness platform turning running into territory wars: GPS-verified routes claim mapped ground, hold it, and declare 48-hour wars.",
    scale: "500+ Member Community",
    href: "https://ichor-xi.vercel.app",
    github: "https://github.com/pushkar-bit",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "MongoDB (Mongoose)",
      "Upstash Redis",
      "Turf.js + Strava API",
      "RAG Engine (Gemini AI)",
      "Firebase",
      "Leaflet",
      "Tailwind CSS v4",
      "Framer Motion",
      "Three.js",
      "Sentry",
    ],
    bullets: [
      "Designed and built a gamified social fitness platform turning running into territory wars: GPS-verified routes claim mapped territory, held ground generates passive points, and contested territory appreciates in value the more it is attacked and defended.",
      "Architected gamification layer and points economy where distance, pace, streaks, nutrition, and battles won compound into a single non-resetting score plus clan mechanics where crews pool territory into a shared map empire and declare 48-hour wars on rivals.",
      "Integrated Strava API and RAG engine end-to-end: OAuth 2.0 onboarding via Strava and Google, automated activity sync, and GPS route ingestion feeding live leaderboards, contextual workout insights, and territory claims under developer-tier athlete caps.",
      "Directed full design system—brand identity, dark palette, and high-fidelity feed, leaderboard, and challenge surfaces in Figma—and shipped developer-ready specs.",
    ],
    img: "/img/shot-ichor.png",
  },
  {
    id: "homequest-project",
    title: "HomeQuest — AI Real Estate Marketplace",
    role: "Full-Stack Engineer",
    tagline:
      "Real-estate marketplace platform with listings, real-time agent chat, and AI-assisted property querying to streamline buyer-agent connections.",
    scale: "Full-Stack + AI",
    href: "https://homequest1.vercel.app",
    tech: ["React", "Node.js", "MySQL", "Socket.io", "OpenAI GPT-4o mini", "Tailwind CSS"],
    bullets: [
      "Engineered real-time listing discovery with WebSocket messaging for instant buyer-to-agent negotiations.",
      "Integrated AI query assistant to analyze buyer preferences and summarize property documents directly on platform.",
    ],
    img: "/img/shot-homequest.png",
  },
  {
    id: "rag-project",
    title: "InsightRAG — Multi-tenant Document RAG Engine",
    role: "AI Systems Engineer",
    tagline:
      "Enterprise document processing pipeline with vector search, semantic embeddings, background job queues, and deterministic source citations.",
    scale: "Zero-Hallucination Pipeline",
    href: "https://rag-lac-ten.vercel.app/",
    tech: ["Next.js", "Groq", "Gemini AI", "BullMQ", "MongoDB", "Redis", "Tailwind CSS"],
    bullets: [
      "Designed chunking and embedding pipelines with vector search returning contextual document citations with every answer.",
      "Implemented BullMQ worker queues for asynchronous document ingestion with automated retries and dead-letter handling.",
    ],
    img: "/img/shot-rag.png",
  },
];

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
  tech: string;
}

const EXPERIENCES: Experience[] = [
  {
    role: "Software Developer Intern",
    company: "Launched Global",
    period: "May 2025 – Jun 2025",
    location: "Remote",
    points: [
      "Built a reusable, modular restaurant menu frontend template that allowed non-technical owners to edit menu content without touching core code, designed for rapid customization and redeployment across client sites.",
      "Streamlined deployment velocity for client onboarding with zero configuration code touchpoints.",
    ],
    tech: "HTML · CSS · JavaScript",
  },
  {
    role: "Growth & Development Head",
    company: "Apollo MedSkills – Rishihood University",
    period: "Apr 2025",
    location: "Sonipat, India",
    points: [
      "Developed consumer engagement and conversion strategies for the Apollo MedSkills program, contributing to marketing, audience targeting, and strategic brand communication.",
      "Analyzed student acquisition channels and optimized promotional messaging across institutional cohorts.",
    ],
    tech: "Brand Strategy · Consumer Engagement · Conversion Optimization",
  },
];

interface SkillCategory {
  category: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "AI & LLM",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "Vector Search & Embeddings",
      "Gemini AI",
      "OpenAI GPT-4o mini",
      "Groq",
      "Prompt Engineering",
      "GenAI App Development",
      "Multi-tenant AI Architecture",
    ],
  },
  {
    category: "Product Management",
    skills: [
      "PRD Authoring",
      "Product Requirements",
      "User Research",
      "Consumer Behavior Analysis",
      "Roadmapping",
      "Feature Prioritization",
      "Gamification & Retention Design",
      "Growth Analysis",
      "Go-to-Market (GTM)",
      "Stakeholder Communication",
    ],
  },
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "C", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "Next.js",
      "React",
      "React Native",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Socket.io",
      "Prisma ORM",
      "BullMQ",
    ],
  },
  {
    category: "Data & Analytics",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "Upstash Redis",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Tableau",
      "Data Structures & Algorithms",
    ],
  },
  {
    category: "Cloud, DevOps & Security",
    skills: [
      "Vercel",
      "Railway",
      "GitHub Actions",
      "CI/CD",
      "OAuth 2.0",
      "HTTPS/TLS Enforcement",
      "DDoS Mitigation",
      "Clickjacking Protection",
      "JWT Authentication",
      "REST APIs",
      "Sentry",
      "Git",
      "Figma",
    ],
  },
];

const LEADERSHIP = [
  {
    title: "Founder & President — ICHOR Run Club",
    period: "Jun 2026 – Present",
    org: "Rishihood University",
    instagram: "https://www.instagram.com/ichor.club/",
    bullets: [
      "Founded club and grew to 500+ member community in 1st month; built brand identity, constitution, and operating model from zero to university registration with 5-person founding team.",
      "Created and delivered RU-Rox, flagship obstacle race with Rishihood University and ARAMBH Orientation, selling out every bib for 1st edition while managing race format, logistics, and registration.",
    ],
  },
  {
    title: "Growth & Development Head — Arthakram Consulting Club",
    period: "2025",
    org: "Rishihood University",
    bullets: [
      "Led club strategy, leadership initiatives, and structured problem-solving frameworks across competitive business simulations.",
    ],
  },
  {
    title: "Competitions & Public Speaking",
    period: "Ongoing",
    org: "National & Regional",
    bullets: [
      "LSSC Declamation, Interschool JAM, and MUN Debate Champion.",
      "Active participant in technical hackathons and E-Summits in engineering and leadership roles.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const outroInfoRef = useRef<HTMLDivElement>(null);
  const outroBuyRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const maxScrollRef = useRef(0);

  const [touch, setTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024)
  );

  const [cols, setCols] = useState(() =>
    typeof window !== "undefined" ? colsForWidth(window.innerWidth) : 4
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const layout = useMemo(() => buildLayout(GALLERY_IMAGES.length, cols), [cols]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* Drivethru: smooth cinematic automated scroll from top to bottom */
  const driveThru = () => {
    const startY = window.scrollY;
    const targetY = document.documentElement.scrollHeight - window.innerHeight;
    const distance = targetY - startY;
    if (distance <= 0) return;

    // Cinematic comfortable pace: not too quick, not too slow (~6.0s)
    const duration = 6000;
    let startTime: number | null = null;
    let cancelled = false;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const cancel = () => {
      cancelled = true;
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
    };

    // 400ms grace period before interrupt listeners activate
    const cancelTimeout = window.setTimeout(() => {
      window.addEventListener("wheel", cancel, { passive: true });
      window.addEventListener("touchstart", cancel, { passive: true });
      window.addEventListener("keydown", cancel, { passive: true });
    }, 400);

    const step = (currentTime: number) => {
      if (cancelled) return;
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.clearTimeout(cancelTimeout);
        cleanup();
      }
    };

    requestAnimationFrame(step);
  };

  /* Resize listener */
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setCols(colsForWidth(w));
      setTouch(window.matchMedia("(pointer: coarse)").matches || w < 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Custom cursor for desktop */
  useEffect(() => {
    if (touch) return;
    const move = (e: MouseEvent) => {
      const c = cursorRef.current;
      if (!c) return;
      c.style.left = `${e.clientX}px`;
      c.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [touch]);

  /* Mouse parallax interaction for hero background */
  useEffect(() => {
    if (touch) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 26;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [touch]);

  /* Circle symbol randomizer on scroll throttled to 80ms */
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const now = performance.now();
      if (now - last < 80) return;
      last = now;
      const el = circleRef.current;
      if (el) {
        el.textContent = SYMBOLS[(Math.random() * SYMBOLS.length) | 0];
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Main RAF scroll engine */
  useEffect(() => {
    const setSizes = () => {
      const vh = window.innerHeight;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const maxScroll = Math.max(0, wrap.scrollHeight - vh);
      maxScrollRef.current = maxScroll;
      const outroDuration = Math.round(vh * 0.7);
      if (rootRef.current) {
        rootRef.current.style.height = `${vh + maxScroll + outroDuration}px`;
      }
    };

    setSizes();
    const t = window.setTimeout(setSizes, 400);
    window.addEventListener("resize", setSizes);
    window.addEventListener("load", setSizes);

    const cards = wrapRef.current
      ? Array.from(wrapRef.current.querySelectorAll<HTMLElement>(".bp-card"))
      : [];

    let raf = 0;
    const loop = () => {
      const vh = window.innerHeight;
      const y = window.scrollY;
      const maxScroll = maxScrollRef.current;

      let panelOffset: number;
      let wrapTranslate: number;

      if (y <= vh) {
        panelOffset = vh - y;
        wrapTranslate = 0;
      } else {
        panelOffset = 0;
        wrapTranslate = -Math.min(y - vh, maxScroll);
      }

      if (panelRef.current) {
        panelRef.current.style.transform = `translateY(${panelOffset}px)`;
      }
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(${wrapTranslate}px)`;
      }
      if (heroRef.current) {
        heroRef.current.style.visibility = y > vh ? "hidden" : "visible";
      }

      for (const el of cards) {
        const top = panelOffset + wrapTranslate + el.offsetTop;
        const bottom = top + el.offsetHeight;
        let scale: number;
        if (bottom <= 0 || top >= vh) {
          scale = 0;
        } else {
          const enter = Math.min(1, (vh - top) / (vh * 0.6));
          const exit = Math.min(1, bottom / (vh * 0.4));
          scale = Math.max(0, Math.min(enter, exit));
        }
        el.style.transform = `scale(${scale})`;
      }

      const isMobileScreen = window.innerWidth < 640;
      const outroOffset = isMobileScreen ? 132 : 166;
      const outroStart = vh + maxScroll;
      const outroDuration = Math.round(vh * 0.7);
      const rawP = Math.max(0, Math.min(1, (y - outroStart) / outroDuration));
      // Optical smoothstep for a perfectly blended black-to-white dissolve
      const p = rawP * rawP * (3 - 2 * rawP);

      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(p);
      }
      if (footerRef.current) {
        footerRef.current.style.opacity = String(p);
      }
      if (outroInfoRef.current) {
        outroInfoRef.current.style.transform = `translateY(${-p * outroOffset}px)`;
      }
      if (outroBuyRef.current) {
        outroBuyRef.current.style.transform = `scale(${p})`;
      }

      // Smooth handoff: as scroll passes the outro, fxRef smoothly translates up
      // so there is NEVER an empty white gap or sudden visibility snap!
      const totalOutroEnd = outroStart + outroDuration;
      if (fxRef.current) {
        if (y > totalOutroEnd) {
          const overScroll = y - totalOutroEnd;
          fxRef.current.style.transform = `translateY(${-overScroll}px)`;
          fxRef.current.style.visibility = overScroll > vh ? "hidden" : "visible";
        } else {
          fxRef.current.style.transform = "translateY(0px)";
          fxRef.current.style.visibility = "visible";
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("resize", setSizes);
      window.removeEventListener("load", setSizes);
    };
  }, [cols]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const isTablet =
    typeof window !== "undefined" &&
    window.innerWidth >= 640 &&
    window.innerWidth < 1024;

  const logoWidth = isMobile ? 160 : isTablet ? 280 : 380;
  const captionTop = isMobile ? 100 : isTablet ? 160 : 210;
  const captionWidth = isMobile
    ? "calc(100vw - 32px)"
    : isTablet
      ? "calc(50vw - 48px)"
      : "540px";

  return (
    <div
      style={{
        position: "relative",
        background: "#FFFFFF",
        fontFamily: "'Inter Tight', sans-serif",
        color: "#0a0a0a",
      }}
    >
      {/* ------------------------------------------------------------ */}
      {/* 1. SCROLL EFFECT CONTAINER (HERO + GALLERY + OUTRO)          */}
      {/* ------------------------------------------------------------ */}
      <div
        ref={rootRef}
        id="scroll-spacer"
        style={{
          position: "relative",
          userSelect: "none",
          background: "#FFFFFF",
          height: "500vh",
          cursor: touch ? "auto" : "none",
        }}
      >
        <div ref={fxRef}>
          {/* 1A. Custom Cursor (Desktop Only) */}
          {!touch && (
            <div
              ref={cursorRef}
              style={{
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: 60,
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                mixBlendMode: "exclusion",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22.75" stroke="#FFFFFF" strokeWidth="2.5" />
                <path
                  d="M24 12v24M14 18c4 3 16 3 20 0M14 30c4-3 16-3 20 0"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}

          {/* 1B. Hero Background Visual featuring Pushkar's JPG (imagetobeused.jpg) */}
          <div
            ref={heroRef}
            id="main-canvas"
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              overflow: "hidden",
              pointerEvents: "none",
              background: "#080808",
            }}
          >
            <img
              src={HERO_IMAGE_URL}
              alt="Pushkar Jain"
              style={{
                position: "absolute",
                inset: "-4%",
                width: "108%",
                height: "108%",
                objectFit: "cover",
                objectPosition: "center 20%",
                filter: "brightness(0.65) contrast(1.1) saturate(1.05)",
                transform: touch
                  ? "none"
                  : `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0) scale(1.02)`,
                transition: "transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
            {/* Cinematic dark gradients for legibility of text and smooth contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.8) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </div>

          {/* 1C. Logo (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0 }}
            style={{
              position: "fixed",
              top: isMobile ? 16 : 32,
              left: isMobile ? 16 : 32,
              zIndex: 25,
              pointerEvents: "auto",
              mixBlendMode: "exclusion",
              width: logoWidth,
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <svg
              viewBox="0 0 380 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <text
                x="0"
                y="64"
                fill="#FFFFFF"
                fontFamily="'Inter Tight', sans-serif"
                fontWeight="600"
                fontSize="68"
                letterSpacing="-0.05em"
              >
                Pushkar
              </text>
              <circle cx="368" cy="14" r="10" fill="#FFFFFF" />
            </svg>
          </motion.div>

          {/* 1D. Caption (Below Logo) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            style={{
              position: "fixed",
              left: isMobile ? 16 : 32,
              top: captionTop,
              width: captionWidth,
              zIndex: 25,
              pointerEvents: "none",
              mixBlendMode: "exclusion",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? 13 : 14,
              lineHeight: "145%",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            Product · Tech Management · Innovation
          </motion.div>

          {/* 1E. Main Landing Page Hero Portrait Card featuring imagetobeused.jpg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            style={{
              position: "fixed",
              left: isMobile ? 16 : 32,
              top: isMobile ? captionTop + 95 : captionTop + 85,
              zIndex: 30,
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "7px 18px 7px 7px",
              borderRadius: 9999,
              background: "rgba(12, 12, 12, 0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("about-section")}
          >
            {/* The requested imagetobeused.jpg photo */}
            <div
              style={{
                position: "relative",
                width: isMobile ? 44 : 52,
                height: isMobile ? 44 : 52,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(255, 255, 255, 0.6)",
                flexShrink: 0,
              }}
            >
              <img
                src="/img/imagetobeused.jpg"
                alt="Pushkar Jain"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: isMobile ? 12 : 13,
                  fontWeight: 600,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    boxShadow: "0 0 10px #10B981",
                    display: "inline-block",
                  }}
                />
                <span>Pushkar Jain · Delhi, India</span>
              </div>
              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.7)",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                Available for AI/LLM PM &amp; Product Eng
              </div>
            </div>
          </motion.div>

          {/* 1F. NAV (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            style={{
              position: "fixed",
              top: isMobile ? 16 : 32,
              right: isMobile ? 16 : 32,
              zIndex: 35,
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 12 : 28,
            }}
          >
            {!isMobile && (
              <div style={{ display: "flex", gap: 24, mixBlendMode: "exclusion" }}>
                {[
                  { label: "WORK", id: "projects-section" },
                  { label: "SKILLS", id: "skills-section" },
                  { label: "EXPERIENCE", id: "experience-section" },
                  { label: "CONTACT", id: "contact-section" },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={driveThru}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(56, 189, 248, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                padding: isMobile ? "6px 12px" : "8px 16px",
                borderRadius: 9999,
                color: "#FFFFFF",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? 11 : 12,
                letterSpacing: "0.04em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#38bdf8",
                  boxShadow: "0 0 8px #38bdf8",
                }}
              />
              <span>DRIVETHRU ↓</span>
            </button>

            <a
              href="mailto:pushkar.jain2024@nst.rishihood.edu.in"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                padding: isMobile ? "6px 14px" : "8px 18px",
                borderRadius: 9999,
                color: "#FFFFFF",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? 11 : 12,
                letterSpacing: "0.04em",
                transition: "all 0.2s ease",
              }}
            >
              <span>[ HIRE ME ]</span>
            </a>
          </motion.div>

          {/* 1G. Identity Label & Stats (Bottom Right) */}
          <motion.div
            ref={outroInfoRef}
            id="outro-info"
            data-outro-offset={isMobile ? 132 : 166}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            style={{
              position: "fixed",
              right: isMobile ? 0 : 32,
              left: isMobile ? 0 : "auto",
              bottom: isMobile ? 48 : 80,
              width: isMobile ? "100%" : 330,
              zIndex: 20,
              pointerEvents: "none",
              mixBlendMode: "exclusion",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: isMobile ? 252 : "100%",
                marginBottom: isMobile ? 12 : 32,
              }}
            >
              {/* Circle icon */}
              <div
                style={{
                  position: "relative",
                  width: isMobile ? 20 : 30,
                  height: isMobile ? 20 : 30,
                  marginBottom: 10,
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 40 40"
                  fill="none"
                  style={{ position: "absolute", inset: 0 }}
                >
                  <circle
                    cx="20"
                    cy="20"
                    r="18.75"
                    stroke="#FFFFFF"
                    strokeWidth={isMobile ? 2 : 2.5}
                  />
                </svg>
                <span
                  ref={circleRef}
                  id="circle-symbol"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 500,
                    fontSize: isMobile ? 10 : 15,
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                  }}
                >
                  8
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: isMobile ? 18 : 26,
                  lineHeight: "100%",
                  textAlign: "left",
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                PRODUCT &amp; AI
                <br />
                ENGINEER
              </div>
            </div>

            {/* Big stat number */}
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: isMobile ? 56 : 76,
                lineHeight: "100%",
                textAlign: "center",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
              }}
            >
              29K+
            </div>
            <div
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? 10 : 12,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                opacity: 0.8,
                marginTop: 4,
              }}
            >
              requests on biol
            </div>
          </motion.div>

          {/* 1H. CTA "hire" button — appears on outro */}
          <a
            href="mailto:pushkar.jain2024@nst.rishihood.edu.in"
            ref={outroBuyRef}
            id="outro-buy"
            style={{
              position: "fixed",
              right: isMobile ? 16 : 32,
              left: isMobile ? 16 : "auto",
              bottom: isMobile ? 60 : 32,
              width: isMobile ? "calc(100vw - 32px)" : 330,
              height: isMobile ? 100 : 174,
              zIndex: 20,
              pointerEvents: "auto",
              mixBlendMode: "exclusion",
              transformOrigin: "right bottom",
              transform: "scale(0)",
              background: "#FFFFFF",
              borderRadius: 1335,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: isMobile ? 60 : 96,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                mixBlendMode: "exclusion",
              }}
            >
              hire
            </span>
          </a>

          {/* 1I. White Overlay */}
          <div
            ref={overlayRef}
            id="outro-overlay"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 12,
              pointerEvents: "none",
              background: "#FFFFFF",
              opacity: 0,
            }}
          />

          {/* 1J. Footer */}
          <div
            ref={footerRef}
            id="outro-footer"
            style={{
              position: "fixed",
              left: 16,
              right: isMobile ? 16 : "auto",
              bottom: isMobile ? 24 : 32,
              zIndex: 20,
              pointerEvents: "none",
              mixBlendMode: "exclusion",
              opacity: 0,
              display: "flex",
              gap: isMobile ? 0 : 80,
              justifyContent: isMobile ? "space-between" : "flex-start",
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? 11 : 13,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            <span>Pushkar Jain © 2026</span>
            <span>Delhi, India</span>
            {!isMobile && <span>@ichor.club</span>}
          </div>

          {/* 1K. Black Panel (Scattered Gallery) */}
          <div
            ref={panelRef}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
              background: "#000000",
              transform: "translateY(100vh)",
            }}
          >
            <div
              ref={wrapRef}
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "min(360px, 35vh)",
                paddingBottom: "20vh",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: cols === 2 ? 8 : 12,
                  padding: cols === 2 ? "0 8px" : "0 12px",
                }}
              >
                {layout.flat().map((tileIdx, i) => {
                  const colIndex = i % cols;
                  if (tileIdx === -1) {
                    return (
                      <div key={i} style={{ aspectRatio: "2 / 3" }} aria-hidden />
                    );
                  }
                  const imgSrc = GALLERY_IMAGES[tileIdx];
                  const meta = GALLERY_META[tileIdx] ?? {
                    title: "Pushkar Jain",
                    tag: "Dossier",
                    sectionId: "about-section",
                  };
                  const origin =
                    colIndex < cols / 2 ? "right bottom" : "left bottom";

                  return (
                    <div
                      key={i}
                      className="bp-card group"
                      onClick={() => {
                        if (meta.url) {
                          window.open(meta.url, "_blank");
                        } else {
                          scrollToSection(meta.sectionId);
                        }
                      }}
                      style={{
                        aspectRatio: "2 / 3",
                        transform: "scale(0)",
                        transformOrigin: origin,
                        overflow: "hidden",
                        position: "relative",
                        background: "#111111",
                        borderRadius: 8,
                        cursor: "pointer",
                        pointerEvents: "auto",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={meta.title}
                        loading="lazy"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition:
                            tileIdx === 0 || tileIdx === 6 ? "center top" : "center center",
                        }}
                      />

                      {/* Top Bar: Tag & Quick Action */}
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          right: 10,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          pointerEvents: "none",
                          zIndex: 3,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: cols === 2 ? 8 : 10,
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            background: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            padding: "3px 8px",
                            borderRadius: 9999,
                            color: "rgba(255, 255, 255, 0.95)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          {meta.tag}
                        </span>

                        {meta.url && (
                          <span
                            style={{
                              fontFamily: "'Inter Tight', sans-serif",
                              fontSize: cols === 2 ? 8 : 10,
                              fontWeight: 600,
                              letterSpacing: "0.04em",
                              background: "#FFFFFF",
                              color: "#000000",
                              padding: "3px 8px",
                              borderRadius: 9999,
                              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                            }}
                          >
                            VISIT ↗
                          </span>
                        )}
                      </div>

                      {/* Bottom Overlay with Title & Actions */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "26px 12px 12px",
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 65%, transparent 100%)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          zIndex: 3,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontWeight: 600,
                            fontSize: cols === 2 ? 11 : 13,
                            letterSpacing: "-0.02em",
                            color: "#FFFFFF",
                            lineHeight: 1.2,
                          }}
                        >
                          {meta.title}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: 6,
                            alignItems: "center",
                          }}
                        >
                          {meta.url && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(meta.url, "_blank");
                              }}
                              style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: cols === 2 ? 8 : 10,
                                fontWeight: 600,
                                letterSpacing: "0.04em",
                                background: "rgba(255, 255, 255, 0.22)",
                                backdropFilter: "blur(6px)",
                                border: "1px solid rgba(255, 255, 255, 0.35)",
                                padding: "3px 8px",
                                borderRadius: 4,
                                color: "#FFFFFF",
                                cursor: "pointer",
                              }}
                            >
                              Live ↗
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              scrollToSection(meta.sectionId);
                            }}
                            style={{
                              fontFamily: "'Inter Tight', sans-serif",
                              fontSize: cols === 2 ? 8 : 10,
                              fontWeight: 500,
                              letterSpacing: "0.04em",
                              background: "rgba(0, 0, 0, 0.6)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                              padding: "3px 8px",
                              borderRadius: 4,
                              color: "rgba(255, 255, 255, 0.9)",
                              cursor: "pointer",
                            }}
                          >
                            Specs ↓
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 1L. Hero Floating Drivethru Scroll Down Button */}
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: isMobile ? 20 : 32,
            zIndex: 40,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <motion.button
            onClick={driveThru}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              pointerEvents: "auto",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: isMobile ? "10px 22px" : "12px 30px",
              borderRadius: 9999,
              background: "rgba(10, 10, 10, 0.9)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1.5px solid rgba(56, 189, 248, 0.5)",
              boxShadow:
                "0 12px 40px rgba(0, 0, 0, 0.6), 0 0 24px rgba(56, 189, 248, 0.25)",
              color: "#FFFFFF",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: isMobile ? 12 : 14,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#38bdf8",
                boxShadow: "0 0 10px #38bdf8",
                display: "inline-block",
              }}
            />
            <span>drivethru</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* 2. COMPREHENSIVE RESUME DOSSIER SECTION                      */}
      {/* ------------------------------------------------------------ */}
      <section
        id="about-section"
        style={{
          position: "relative",
          zIndex: 15,
          background: "#FFFFFF",
          color: "#0a0a0a",
          padding: isMobile ? "60px 20px 80px" : "100px 48px 120px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* PROFILE HEADER & SUMMARY */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "180px 1fr",
            gap: isMobile ? 24 : 40,
            alignItems: "start",
            paddingBottom: isMobile ? 40 : 60,
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: isMobile ? 120 : 160,
              height: isMobile ? 120 : 160,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #0a0a0a",
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
            }}
          >
            <img
              src="/img/imagetobeused.jpg"
              alt="Pushkar Jain"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>

          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#f4f4f5",
                padding: "6px 14px",
                borderRadius: 9999,
                fontSize: 12,
                fontWeight: 600,
                color: "#18181b",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  display: "inline-block",
                }}
              />
              Seeking AI/LLM Product Management &amp; Product Engineering Internships
            </div>

            <h1
              style={{
                fontSize: isMobile ? 36 : 56,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                lineHeight: "105%",
                margin: "0 0 16px 0",
              }}
            >
              Pushkar Jain
            </h1>

            <p
              style={{
                fontSize: isMobile ? 18 : 24,
                lineHeight: 1.4,
                color: "#18181b",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                margin: "0 0 24px 0",
                maxWidth: 820,
              }}
            >
              Product · Tech Management · Innovation
            </p>

            {/* Quick stats pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {[
                { label: "29,000+", desc: "Requests on biol" },
                { label: "500+", desc: "ICHOR Run Club Members" },
                { label: "100%", desc: "RU-Rox Bibs Sold Out" },
              ].map((stat) => (
                <div
                  key={stat.desc}
                  style={{
                    padding: "10px 16px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#0f172a",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      fontWeight: 500,
                    }}
                  >
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* PROJECTS SECTION                                             */}
        {/* ------------------------------------------------------------ */}
        <div id="projects-section" style={{ paddingTop: isMobile ? 60 : 80 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#71717a",
                  marginBottom: 6,
                }}
              >
                Engineering &amp; Product Builds
              </div>
              <h2
                style={{
                  fontSize: isMobile ? 28 : 40,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Featured Projects
              </h2>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            {PROJECTS.map((proj) => (
              <div
                id={proj.id}
                key={proj.title}
                style={{
                  scrollMarginTop: 100,
                  border: "1px solid #e4e4e7",
                  borderRadius: 20,
                  padding: isMobile ? 24 : 36,
                  background: "#fafafa",
                  display: "grid",
                  gridTemplateColumns:
                    !isMobile && proj.img ? "1fr 280px" : "1fr",
                  gap: 32,
                  alignItems: "start",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: isMobile ? 22 : 28,
                        fontWeight: 600,
                        letterSpacing: "-0.03em",
                        margin: 0,
                        color: "#09090b",
                      }}
                    >
                      {proj.title}
                    </h3>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        background: "#09090b",
                        color: "#ffffff",
                        padding: "4px 12px",
                        borderRadius: 9999,
                      }}
                    >
                      {proj.scale}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#52525b",
                      marginBottom: 12,
                    }}
                  >
                    {proj.role}
                  </div>

                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "#27272a",
                      margin: "0 0 18px 0",
                    }}
                  >
                    {proj.tagline}
                  </p>

                  <ul
                    style={{
                      paddingLeft: 20,
                      margin: "0 0 20px 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {proj.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        style={{
                          fontSize: 14,
                          lineHeight: 1.6,
                          color: "#3f3f46",
                        }}
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 20,
                    }}
                  >
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          background: "#ffffff",
                          border: "1px solid #e4e4e7",
                          padding: "4px 10px",
                          borderRadius: 6,
                          color: "#18181b",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: 16 }}>
                    {proj.href && (
                      <a
                        href={proj.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#09090b",
                          textDecoration: "none",
                          borderBottom: "1.5px solid #09090b",
                          paddingBottom: 2,
                        }}
                      >
                        Live Website ↗
                      </a>
                    )}
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#71717a",
                          textDecoration: "none",
                          borderBottom: "1.5px solid #71717a",
                          paddingBottom: 2,
                        }}
                      >
                        GitHub Repository ↗
                      </a>
                    )}
                  </div>
                </div>

                {!isMobile && proj.img && (
                  <div
                    style={{
                      borderRadius: 14,
                      overflow: "hidden",
                      border: "1px solid #e4e4e7",
                      aspectRatio: "4 / 3",
                      background: "#000",
                    }}
                  >
                    <img
                      src={proj.img}
                      alt={proj.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* WORK EXPERIENCE                                              */}
        {/* ------------------------------------------------------------ */}
        <div id="experience-section" style={{ paddingTop: isMobile ? 60 : 80 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#71717a",
              marginBottom: 6,
            }}
          >
            Track Record
          </div>
          <h2
            style={{
              fontSize: isMobile ? 28 : 40,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              margin: "0 0 32px 0",
            }}
          >
            Experience
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.role}
                style={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 16,
                  padding: isMobile ? 20 : 28,
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: isMobile ? 18 : 22,
                        fontWeight: 600,
                        margin: 0,
                        color: "#09090b",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#52525b",
                        marginTop: 2,
                      }}
                    >
                      {exp.company} · {exp.location}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#71717a",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {exp.period}
                  </div>
                </div>

                <ul
                  style={{
                    paddingLeft: 20,
                    margin: "14px 0 16px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {exp.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      style={{
                        fontSize: 14,
                        lineHeight: 1.55,
                        color: "#3f3f46",
                      }}
                    >
                      {pt}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#71717a",
                    letterSpacing: "0.02em",
                  }}
                >
                  Tech: <span style={{ color: "#18181b" }}>{exp.tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* CORE SKILLS SECTION                                          */}
        {/* ------------------------------------------------------------ */}
        <div id="skills-section" style={{ paddingTop: isMobile ? 60 : 80 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#71717a",
              marginBottom: 6,
            }}
          >
            Technical &amp; Product Capabilities
          </div>
          <h2
            style={{
              fontSize: isMobile ? 28 : 40,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              margin: "0 0 32px 0",
            }}
          >
            Core Skills
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {SKILL_CATEGORIES.map((cat) => (
              <div
                key={cat.category}
                style={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 16,
                  padding: 24,
                  background: "#fafafa",
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#09090b",
                    marginBottom: 14,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cat.category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        padding: "5px 12px",
                        borderRadius: 9999,
                        color: "#18181b",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* EDUCATION & LEADERSHIP                                       */}
        {/* ------------------------------------------------------------ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 40 : 60,
            paddingTop: isMobile ? 60 : 80,
          }}
        >
          {/* Education */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#71717a",
                marginBottom: 6,
              }}
            >
              Academic Background
            </div>
            <h2
              style={{
                fontSize: isMobile ? 24 : 32,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                margin: "0 0 20px 0",
              }}
            >
              Education
            </h2>

            <div
              style={{
                border: "1px solid #e4e4e7",
                borderRadius: 16,
                padding: 24,
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#09090b",
                  marginBottom: 4,
                }}
              >
                B.Tech in Computer Science
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#52525b",
                  marginBottom: 10,
                }}
              >
                Newton School of Technology, Rishihood University
              </div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  fontWeight: 600,
                  background: "#e4e4e7",
                  padding: "4px 10px",
                  borderRadius: 6,
                  color: "#18181b",
                }}
              >
                Expected Jan 2028 · GPA: 7.0 / 10.0
              </div>
            </div>
          </div>

          {/* Co-Curricular & Leadership */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#71717a",
                marginBottom: 6,
              }}
            >
              Community &amp; Competitions
            </div>
            <h2
              style={{
                fontSize: isMobile ? 24 : 32,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                margin: "0 0 20px 0",
              }}
            >
              Leadership
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {LEADERSHIP.map((item) => (
                <div
                  key={item.title}
                  style={{
                    border: "1px solid #e4e4e7",
                    borderRadius: 16,
                    padding: 20,
                    background: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#09090b",
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#71717a",
                      marginBottom: 10,
                    }}
                  >
                    {item.org} · {item.period}
                    {item.instagram && (
                      <>
                        {" "}
                        ·{" "}
                        <a
                          href={item.instagram}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            color: "#09090b",
                            fontWeight: 600,
                            textDecoration: "underline",
                          }}
                        >
                          @ichor.club
                        </a>
                      </>
                    )}
                  </div>
                  <ul
                    style={{
                      paddingLeft: 16,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {item.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        style={{
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "#3f3f46",
                        }}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* CONTACT SECTION                                              */}
        {/* ------------------------------------------------------------ */}
        <div id="contact-section" style={{ paddingTop: isMobile ? 60 : 80 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#71717a",
              marginBottom: 6,
            }}
          >
            Get In Touch
          </div>
          <h2
            style={{
              fontSize: isMobile ? 28 : 40,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              margin: "0 0 32px 0",
            }}
          >
            Let&apos;s Build Together
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                label: "Email",
                value: "pushkar.jain2024@nst.rishihood.edu.in",
                href: "mailto:pushkar.jain2024@nst.rishihood.edu.in",
              },
              {
                label: "Phone",
                value: "+91 79868 05107",
                href: "tel:+917986805107",
              },
              {
                label: "LinkedIn",
                value: "linkedin.com/in/pushkarjainn",
                href: "https://linkedin.com/in/pushkarjainn",
              },
              {
                label: "GitHub",
                value: "github.com/pushkar-bit",
                href: "https://github.com/pushkar-bit",
              },
              {
                label: "Instagram (Run Club)",
                value: "@ichor.club",
                href: "https://www.instagram.com/ichor.club/",
              },
              {
                label: "Location",
                value: "Delhi, India",
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 14,
                  padding: 20,
                  background: "#fafafa",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#71717a",
                    marginBottom: 6,
                  }}
                >
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#09090b",
                      textDecoration: "none",
                      wordBreak: "break-all",
                    }}
                  >
                    {c.value} ↗
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#09090b",
                    }}
                  >
                    {c.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              marginTop: 60,
              paddingTop: 30,
              borderTop: "1px solid #e4e4e7",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 13,
              color: "#71717a",
            }}
          >
            <span>Pushkar Jain © 2026 · Delhi, India</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#09090b",
                borderBottom: "1.5px solid #09090b",
                paddingBottom: 2,
              }}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
