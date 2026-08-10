import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  CONTENT                                                            */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const SYMBOLS = ["8", "$", "^^", "%", "/"];

type Tile =
  | { kind: "image"; src: string; tag: string; caption: string }
  | {
      kind: "card";
      tag: string;
      title: string;
      caption: string;
      tech: string;
      accent: string;
      img?: string;
      link?: string;
    };

/*
 * Gallery archive. Personal photos live in /public/img (drop yours in with
 * the filenames below). Project cards are self-contained and always render.
 */
const TILES: Tile[] = [
  {
    kind: "image",
    src: "/img/latenight.jpg",
    tag: "02:39 · TUE 11 AUG",
    caption:
      "Built through the night. I wanted this opportunity too badly to sleep.",
  },
  {
    kind: "card",
    tag: "LIVE · FLAGSHIP",
    title: "biol.club",
    caption:
      "My finest build. Cloudflare in front, a hardened backend behind — every feature ideated and cross-questioned against its failure cases before it shipped.",
    tech: "NEXT.JS · CLOUDFLARE · SUPABASE · EDGE",
    accent: "linear-gradient(135deg,#1b1b1b 0%,#3a2f5c 100%)",
    img: "/img/shot-biol.png",
    link: "https://www.biol.club",
  },
  {
    kind: "image",
    src: "/img/thumbs-a.jpg",
    tag: "SHOWING UP",
    caption: "Not the most-decorated stack in the room. The most consistent one.",
  },
  {
    kind: "card",
    tag: "IN PROGRESS · GAME",
    title: "ichor",
    caption:
      "My other finest work — running, gamified. Every run claims ground; hold it, grow it, defend it. Overlap a rival's territory past the threshold and you can attack or conquer it. Multiple leaderboards turn running into culture.",
    tech: "GEO-TERRITORY · REALTIME · CLANS · LEADERBOARDS",
    accent: "linear-gradient(135deg,#141414 0%,#2a1c47 100%)",
    img: "/img/shot-ichor.png",
    link: "https://ichor-xi.vercel.app",
  },
  {
    kind: "card",
    tag: "AI · RAG",
    title: "InsightRAG",
    caption:
      "Multi-tenant RAG: document upload, vector search and context-aware answers. Job queues, retries and guardrails so every answer maps back to its source — never a guess.",
    tech: "NEXT.JS · GROQ · BULLMQ · MONGODB",
    accent: "linear-gradient(135deg,#101010 0%,#1f3d5c 100%)",
    img: "/img/shot-rag.png",
    link: "https://rag-lac-ten.vercel.app",
  },
  {
    kind: "image",
    src: "/img/thumbs-b.jpg",
    tag: "ALL IN",
    caption: "I don't quit on a thing when it goes up and down. I finish it.",
  },
  {
    kind: "card",
    tag: "AI · MARKETPLACE",
    title: "HomeQuest",
    caption:
      "Full-stack real-estate platform — listings, live chat, AI-assisted queries — built to cut the broker out of the buyer–agent handshake.",
    tech: "REACT · NODE · MYSQL · SOCKET.IO · GPT-4o",
    accent: "linear-gradient(135deg,#111111 0%,#2f5c3a 100%)",
    img: "/img/shot-homequest.png",
    link: "https://homequest1.vercel.app",
  },
  {
    kind: "card",
    tag: "HOW I BUILD",
    title: "Fails-last engineering",
    caption:
      "Every feature gets an ideation pass and a cross-question: what breaks it, what's the consequence, what's the fallback. That's why the things I ship stay up.",
    tech: "IDEATE → CROSS-QUESTION → HARDEN → SHIP",
    accent: "linear-gradient(135deg,#141414 0%,#333333 100%)",
  },
  {
    kind: "card",
    tag: "THE OFFER",
    title: "Unlimited consistency",
    caption:
      "My worth isn't the tech stack — it's the will to prove myself every single day. I'm up for every sleepless night the coffee product needs, because I want to be part of it.",
    tech: "COMMITMENT · OWNERSHIP · PROOF DAILY",
    accent: "linear-gradient(135deg,#1a1a1a 0%,#5c4a1f 100%)",
  },
];

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
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const outroInfoRef = useRef<HTMLDivElement>(null);
  const outroBuyRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const maxScrollRef = useRef(0);

  const [touch] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
  );
  const [cols, setCols] = useState(() =>
    typeof window !== "undefined" ? colsForWidth(window.innerWidth) : 4
  );

  const layout = useMemo(() => buildLayout(TILES.length, cols), [cols]);

  /* keep column count in sync with viewport */
  useEffect(() => {
    const onResize = () => setCols(colsForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* custom cursor (desktop only) */
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

  /* circle symbol randomises on scroll, throttled ~80ms */
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const now = performance.now();
      if (now - last < 80) return;
      last = now;
      const el = circleRef.current;
      if (el) el.textContent = SYMBOLS[(Math.random() * SYMBOLS.length) | 0];
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* main RAF scroll engine */
  useEffect(() => {
    const setSizes = () => {
      const vh = window.innerHeight;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const maxScroll = Math.max(0, wrap.scrollHeight - vh);
      maxScrollRef.current = maxScroll;
      if (rootRef.current)
        rootRef.current.style.height = `${vh + maxScroll + 2 * vh}px`;
    };
    setSizes();
    // re-measure after fonts/images settle
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
      if (panelRef.current)
        panelRef.current.style.transform = `translateY(${panelOffset}px)`;
      if (wrapRef.current)
        wrapRef.current.style.transform = `translateY(${wrapTranslate}px)`;
      if (heroRef.current)
        heroRef.current.style.visibility = y > vh ? "hidden" : "visible";

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

      const outroOffset = window.innerWidth < 640 ? 132 : 166;
      const outroStart = vh + maxScroll;
      const denom = Math.max(1, vh - 100);
      const p = Math.max(0, Math.min(1, (y - outroStart) / denom));
      if (overlayRef.current) overlayRef.current.style.opacity = String(p);
      if (footerRef.current) footerRef.current.style.opacity = String(p);
      if (outroInfoRef.current)
        outroInfoRef.current.style.transform = `translateY(${-p * outroOffset}px)`;
      if (outroBuyRef.current)
        outroBuyRef.current.style.transform = `scale(${p})`;

      // hand off to the normal-flow About section once the outro is fully white
      const hideAt = vh + maxScroll + vh - 140;
      if (fxRef.current)
        fxRef.current.style.visibility = y > hideAt ? "hidden" : "visible";

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

  return (
    <>
    <div
      ref={rootRef}
      id="scroll-spacer"
      style={{
        position: "relative",
        userSelect: "none",
        background: "#fff",
        height: "500vh",
        cursor: touch ? "auto" : "none",
      }}
    >
      <div ref={fxRef}>
      {/* ---------- CUSTOM CURSOR ---------- */}
      {!touch && (
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 50,
            pointerEvents: "none",
            transform: "translate(-50%,-50%)",
            mixBlendMode: "exclusion",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22.75" stroke="#fff" strokeWidth="2.5" />
            <path
              d="M24 12v24M14 18c4 3 16 3 20 0M14 30c4-3 16-3 20 0"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* ---------- HERO BACKGROUND ---------- */}
      <div
        ref={heroRef}
        id="main-canvas"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          background: "#0a0a0a",
        }}
      >
        <img
          src="/img/hero.jpg"
          alt=""
          onError={(e) => (e.currentTarget.style.opacity = "0")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            animation: "heroZoom 18s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(120% 90% at 70% 30%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* ---------- LOGO ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          position: "fixed",
          top: isMobile ? 16 : 32,
          left: isMobile ? 16 : 32,
          zIndex: 20,
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontWeight: 600,
            letterSpacing: "-0.05em",
            color: "#fff",
            fontSize: isMobile ? 34 : 64,
            lineHeight: 1,
          }}
        >
          pushkar
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? 18 : 30,
            height: isMobile ? 18 : 30,
            borderRadius: "50%",
            border: "2px solid #fff",
            color: "#fff",
            fontSize: isMobile ? 9 : 14,
            fontWeight: 600,
            marginTop: isMobile ? 6 : 12,
          }}
        >
          R
        </span>
      </motion.div>

      {/* ---------- CAPTION ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        style={{
          position: "fixed",
          left: isMobile ? 16 : 32,
          top: isMobile ? 118 : 130,
          width: isMobile ? "calc(100vw - 32px)" : 480,
          zIndex: 20,
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "150%",
          letterSpacing: "-0.03em",
          color: "#fff",
        }}
      >
        For Sarthak Singhal. My worth isn't the stack — it's the consistency
        behind it. I owe commitments, not excuses, and I'll get the work done no
        matter how the days go up and down. Up for every sleepless night the
        product needs.
      </motion.div>

      {/* ---------- HEADER NAV ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        style={{
          position: "fixed",
          top: isMobile ? 16 : 32,
          right: isMobile ? 16 : 32,
          height: 30,
          width: isMobile ? "auto" : 340,
          zIndex: 20,
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isMobile && (
          <span
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontWeight: 500,
              fontSize: 15,
              textTransform: "uppercase",
              color: "#fff",
              pointerEvents: "auto",
              cursor: "pointer",
            }}
          >
            About
          </span>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 20 : 40,
          }}
        >
          <svg
            width={isMobile ? 24 : 30}
            height={isMobile ? 24 : 30}
            viewBox="0 0 40 40"
            fill="none"
          >
            <path d="M0 14H40" stroke="#fff" strokeWidth="2.5" />
            <path d="M0 26H40" stroke="#fff" strokeWidth="2.5" />
          </svg>
          <span
            style={{
              fontWeight: 500,
              fontSize: isMobile ? 13 : 15,
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            [ FOR SARTHAK ]
          </span>
        </div>
      </motion.div>

      {/* ---------- PRODUCT INFO ---------- */}
      <motion.div
        ref={outroInfoRef}
        id="outro-info"
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
            marginBottom: isMobile ? 12 : 28,
          }}
        >
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
                stroke="#fff"
                strokeWidth={isMobile ? 2 : 2.5}
              />
            </svg>
            <span
              ref={circleRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 500,
                fontSize: isMobile ? 10 : 15,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              8
            </span>
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: isMobile ? 20 : 30,
              lineHeight: "100%",
              textAlign: "center",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#fff",
            }}
          >
            PROOF-OF-WORK
            <br />
            "COMMITMENT"
          </div>
        </div>
        <div
          style={{
            fontWeight: 500,
            fontSize: isMobile ? 60 : 80,
            lineHeight: "100%",
            textAlign: "center",
            letterSpacing: "-0.04em",
            color: "#fff",
          }}
        >
          ∞
        </div>
      </motion.div>

      {/* ---------- VIEW BUTTON (outro) ---------- */}
      <a
        ref={outroBuyRef}
        href="https://www.biol.club"
        target="_blank"
        rel="noreferrer"
        id="outro-buy"
        style={{
          position: "fixed",
          right: isMobile ? 16 : 32,
          left: isMobile ? 16 : "auto",
          bottom: isMobile ? 60 : 32,
          width: isMobile ? "auto" : 330,
          height: isMobile ? 100 : 174,
          zIndex: 21,
          transformOrigin: "right bottom",
          transform: "scale(0)",
          background: "#fff",
          borderRadius: 1335,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontWeight: 500,
            fontSize: isMobile ? 72 : 110,
            letterSpacing: "-0.04em",
            color: "#fff",
            mixBlendMode: "exclusion",
          }}
        >
          view
        </span>
      </a>

      {/* ---------- WHITE OVERLAY ---------- */}
      <div
        ref={overlayRef}
        id="outro-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 12,
          pointerEvents: "none",
          background: "#fff",
          opacity: 0,
        }}
      />

      {/* ---------- FOOTER ---------- */}
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
          fontWeight: 500,
          fontSize: isMobile ? 11 : 13,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        <span>PUSHKAR JAIN · 2026</span>
        <span>BUILT FOR THE PITCH</span>
      </div>

      {/* ---------- BLACK PANEL (GALLERY) ---------- */}
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          background: "#000",
          transform: "translateY(100vh)",
        }}
      >
        <div
          ref={wrapRef}
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "min(400px, 40vh)",
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
              const tile = TILES[tileIdx];
              const origin =
                colIndex < cols / 2 ? "right bottom" : "left bottom";
              return (
                <div
                  key={i}
                  className="bp-card"
                  style={{
                    aspectRatio: "2 / 3",
                    transform: "scale(0)",
                    transformOrigin: origin,
                  }}
                >
                  <TileView tile={tile} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
    <AboutSection isMobile={isMobile} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  TILE RENDERER                                                      */
/* ------------------------------------------------------------------ */

function TileView({ tile }: { tile: Tile }) {
  if (tile.kind === "image") {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 4,
          background: "linear-gradient(135deg,#1a1a1a 0%,#2a2438 100%)",
        }}
      >
        <img
          src={tile.src}
          alt={tile.caption}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.opacity = "0")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <TileCaption tag={tile.tag} caption={tile.caption} />
      </div>
    );
  }
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 4,
        background: tile.accent,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {tile.img && (
        <>
          <img
            src={tile.img}
            alt={tile.title}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.opacity = "0")}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.6) 68%, rgba(0,0,0,0.92) 100%)",
            }}
          />
        </>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "clamp(14px,1.6vw,22px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.92)",
            textTransform: "uppercase",
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 100,
            padding: "4px 9px",
            backdropFilter: "blur(4px)",
          }}
        >
          {tile.tag}
        </div>
        <div>
          <div
            style={{
              fontSize: "clamp(20px,2.4vw,34px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "#fff",
              marginBottom: 10,
              textShadow: tile.img ? "0 1px 16px rgba(0,0,0,0.7)" : "none",
            }}
          >
            {tile.title}
          </div>
          <div
            style={{
              fontSize: "clamp(11px,0.95vw,13px)",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {tile.caption}
          </div>
        </div>
        <div
          style={{
            fontSize: 9.5,
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 10,
          }}
        >
          {tile.tech}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT SECTION (normal flow, scrolls in after the outro)           */
/* ------------------------------------------------------------------ */

const FOCUS = [
  { label: "Frontend — React & Next.js", pct: 92 },
  { label: "TypeScript / JavaScript", pct: 90 },
  { label: "AI — RAG, GenAI, LLM apps", pct: 86 },
  { label: "Backend — Node.js & Express", pct: 84 },
  { label: "UI / Design — Tailwind, Figma", pct: 82 },
  { label: "Python & Data — NumPy, Pandas", pct: 78 },
];

const SKILL_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C", "SQL", "DSA"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend & Data",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Prisma",
      "Supabase",
      "Firebase",
      "BullMQ",
      "Socket.io",
    ],
  },
  {
    title: "AI / GenAI",
    items: [
      "RAG systems",
      "GenAI apps",
      "Groq",
      "OpenAI GPT-4o",
      "Vector search",
    ],
  },
  {
    title: "Data Science",
    items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Tableau"],
  },
  {
    title: "Tools & Infra",
    items: [
      "GitHub Actions",
      "CI/CD",
      "Cloudflare",
      "Vercel",
      "Git",
      "Figma",
      "Canva",
    ],
  },
  {
    title: "Product & People",
    items: [
      "Product management",
      "Problem-solving",
      "Decision-making",
      "Public speaking",
      "Strategy",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Software Developer",
    org: "Launched Global · Remote",
    date: "May – Jun 2025",
    points: [
      "Built a reusable restaurant-menu frontend template restaurants can customize and deploy without touching core code.",
      "Focused on a clean, responsive, user-friendly interface with a modular structure built for scalability and reuse.",
    ],
    tech: "HTML · CSS · JavaScript",
  },
  {
    role: "Growth & Development Head",
    org: "Apollo Medskills · Rishihood University",
    date: "Apr 2025",
    points: [
      "Owned consumer-engagement and conversion strategy for Apollo Medskills × Zarmed University.",
      "Drove marketing, audience targeting and strategic brand communication.",
    ],
    tech: "Strategy · Growth · Brand",
  },
];

const RECOGNITION = [
  "Growth & Development Head — Arthakram Consulting Club",
  "LSSC Declamation Champion",
  "Interschool JAM Winner",
  "MUN Debate Champion",
  "Multiple hackathons & E-summits — lead, technical & brainstorming roles",
];

const WORK = [
  {
    name: "biol.club",
    href: "https://www.biol.club",
    note: "Cloudflare-secured campus platform. My finest build — every feature ideated and cross-questioned against its failure cases.",
    tech: "Next.js · Cloudflare · Supabase · Edge",
  },
  {
    name: "ichor",
    href: "https://ichor-xi.vercel.app",
    note: "Run-to-conquer territory game. Claim ground on every run, defend it, climb the leaderboards. In progress.",
    tech: "Geo-territory · Realtime · Clans",
  },
  {
    name: "InsightRAG",
    href: "https://rag-lac-ten.vercel.app",
    note: "Multi-tenant RAG: document upload, vector search, context-aware answers mapped back to source.",
    tech: "Next.js · Groq · BullMQ · MongoDB · Zustand",
  },
  {
    name: "HomeQuest",
    href: "https://homequest1.vercel.app",
    note: "Full-stack AI real-estate marketplace — listings, live chat, AI-assisted property queries.",
    tech: "React · Node · MySQL · Prisma · Socket.io · GPT-4o",
  },
  {
    name: "Zombie Survival Shooter",
    href: "https://zombie-survival-shooter.vercel.app",
    note: "Wave-based browser game on a custom engine built with OOP & SOLID principles.",
    tech: "Next.js · React · TypeScript · HTML5 Canvas",
  },
];

const CONTACT = [
  { label: "Email", value: "pushkarjain2024@nst.rishihood.edu.in", href: "mailto:pushkarjain2024@nst.rishihood.edu.in" },
  { label: "Phone", value: "+91 79868 05107", href: "tel:+917986805107" },
  { label: "GitHub", value: "github.com/pushkar-bit", href: "https://github.com/pushkar-bit" },
  { label: "LinkedIn", value: "linkedin.com/in/pushkarjainn", href: "https://www.linkedin.com/in/pushkarjainn" },
  { label: "Based in", value: "Delhi, India", href: undefined },
];

function AboutSection({ isMobile }: { isMobile: boolean }) {
  const secRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && setInView(true),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pad = isMobile ? "20px" : "clamp(40px, 8vw, 120px)";
  const label: CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#8a8a8a",
    marginBottom: 18,
  };
  const hr: CSSProperties = {
    border: "none",
    borderTop: "1px solid rgba(0,0,0,0.1)",
    margin: isMobile ? "48px 0" : "72px 0",
  };

  return (
    <section
      id="about"
      ref={secRef}
      style={{
        position: "relative",
        zIndex: 30,
        background: "#fff",
        color: "#0a0a0a",
        padding: `${isMobile ? "72px" : "120px"} ${pad} ${
          isMobile ? "72px" : "110px"
        }`,
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* INTRO */}
        <div style={label}>About — Pushkar Jain</div>
        <h2
          style={{
            fontSize: isMobile ? 34 : "clamp(44px, 6vw, 82px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          Full-Stack & AI developer. The stack is broad — the commitment is
          unlimited.
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 19,
            lineHeight: 1.6,
            color: "#3a3a3a",
            maxWidth: 720,
          }}
        >
          I build scalable, user-centric products end to end — from a hardened,
          well-reasoned backend to interfaces that feel effortless — and I lean
          on AI and automation to make them smarter. I care about product, not
          just code: every feature gets ideated, cross-questioned against its
          failure cases, and shipped to stay up. Sarthak, this is what I'd bring
          to the coffee business — and I'm up for every sleepless night it takes.
        </p>

        <hr style={hr} />

        {/* FOCUS BARS */}
        <div style={label}>Focus stack</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "22px 0" : "26px 60px",
            maxWidth: 900,
          }}
        >
          {FOCUS.map((f) => (
            <div key={f.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 9,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500 }}>{f.label}</span>
                <span style={{ fontSize: 12, color: "#9a9a9a" }}>{f.pct}%</span>
              </div>
              <div
                style={{
                  height: 4,
                  background: "rgba(0,0,0,0.08)",
                  borderRadius: 100,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: inView ? `${f.pct}%` : "0%",
                    background: "#0a0a0a",
                    borderRadius: 100,
                    transition: "width 1.1s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <hr style={hr} />

        {/* SKILLS GRID */}
        <div style={label}>Everything in the toolbox</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(230px, 1fr))",
            gap: isMobile ? 28 : 36,
          }}
        >
          {SKILL_GROUPS.map((g) => (
            <div key={g.title}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 14,
                  color: "#0a0a0a",
                }}
              >
                {g.title}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map((it) => (
                  <span
                    key={it}
                    style={{
                      fontSize: 13,
                      color: "#333",
                      background: "rgba(0,0,0,0.05)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 100,
                      padding: "6px 12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr style={hr} />

        {/* EXPERIENCE */}
        <div style={label}>Experience</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {EXPERIENCE.map((e) => (
            <div
              key={e.role}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
                gap: isMobile ? 10 : 40,
              }}
            >
              <div style={{ fontSize: 13, color: "#9a9a9a", paddingTop: 4 }}>
                {e.date}
              </div>
              <div>
                <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600 }}>
                  {e.role}
                </div>
                <div
                  style={{ fontSize: 14, color: "#6a6a6a", margin: "3px 0 14px" }}
                >
                  {e.org}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {e.points.map((p, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: "#3a3a3a",
                        paddingLeft: 18,
                        position: "relative",
                      }}
                    >
                      <span style={{ position: "absolute", left: 0 }}>—</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "#9a9a9a",
                    marginTop: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {e.tech}
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr style={hr} />

        {/* LEADERSHIP + EDUCATION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 48 : 60,
          }}
        >
          <div>
            <div style={label}>Leadership & recognition</div>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {RECOGNITION.map((r) => (
                <li
                  key={r}
                  style={{
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "#2a2a2a",
                    paddingLeft: 18,
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0 }}>◆</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={label}>Education</div>
            <div style={{ fontSize: isMobile ? 20 : 24, fontWeight: 600 }}>
              B.Tech, Computer Science
            </div>
            <div style={{ fontSize: 15, color: "#6a6a6a", margin: "4px 0 10px" }}>
              Newton School of Technology
            </div>
            <div style={{ fontSize: 14, color: "#3a3a3a" }}>
              GPA 7.0 / 10 · Expected 2028
            </div>
          </div>
        </div>

        <hr style={hr} />

        {/* SELECTED WORK */}
        <div style={label}>Selected work</div>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          {WORK.map((w) => (
            <a
              key={w.name}
              href={w.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "220px 1fr auto",
                gap: isMobile ? 6 : 30,
                alignItems: "start",
                padding: isMobile ? "22px 0" : "26px 0",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
                textDecoration: "none",
                color: "#0a0a0a",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? 22 : 26,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                {w.name}
              </div>
              <div
                style={{ fontSize: 14, lineHeight: 1.5, color: "#4a4a4a" }}
              >
                {w.note}
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "#9a9a9a",
                    marginTop: 8,
                    textTransform: "uppercase",
                  }}
                >
                  {w.tech}
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#9a9a9a",
                  whiteSpace: "nowrap",
                  paddingTop: 4,
                }}
              >
                Visit ↗
              </div>
            </a>
          ))}
        </div>

        <hr style={hr} />

        {/* CONTACT */}
        <div style={label}>Get in touch</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(220px, 1fr))",
            gap: isMobile ? 20 : 28,
          }}
        >
          {CONTACT.map((c) => (
            <div key={c.label}>
              <div style={{ fontSize: 12, color: "#9a9a9a", marginBottom: 6 }}>
                {c.label}
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#0a0a0a",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(0,0,0,0.25)",
                    paddingBottom: 2,
                  }}
                >
                  {c.value}
                </a>
              ) : (
                <span style={{ fontSize: 15, fontWeight: 500 }}>{c.value}</span>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: isMobile ? 60 : 100,
            paddingTop: 28,
            borderTop: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 13, color: "#9a9a9a" }}>
            Pushkar Jain · Built for Sarthak · 2026
          </span>
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              borderBottom: "1px solid rgba(0,0,0,0.25)",
              paddingBottom: 2,
            }}
          >
            Back to top ↑
          </span>
        </div>
      </div>
    </section>
  );
}

function TileCaption({ tag, caption }: { tag: string; caption: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "clamp(14px,1.6vw,22px)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.75)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {tag}
      </div>
      <div
        style={{
          fontSize: "clamp(12px,1vw,14px)",
          fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: "-0.02em",
          color: "#fff",
        }}
      >
        {caption}
      </div>
    </div>
  );
}
