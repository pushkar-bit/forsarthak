import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
const SYMBOLS = ["PJ", "AI", ">>", "{}", "//"];

const LEFT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154433_532a85d3-dabf-4265-b8bd-19ac6af31842.mp4";
const RIGHT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260625_154401_a664f076-b971-4557-8728-40ef9ea4c49b.mp4";

// Gallery: only real project screenshots + Pushkar's photo
const GALLERY_IMAGES = [
  "/img/pushkar-selfie.png",
  "/img/shot-biol.png",
  "/img/biol-proof.png",
  "/img/shot-homequest.png",
  "/img/shot-ichor.png",
  "/img/shot-rag.png",
  "/img/shot-biol.png",
  "/img/shot-homequest.png",
  "/img/shot-ichor.png",
  "/img/shot-rag.png",
];

// Captions for each gallery tile
const GALLERY_CAPTIONS: Record<number, string> = {
  0: "Pushkar Jain",
  1: "biol.club",
  2: "29K+ requests",
  3: "HomeQuest AI",
  4: "ICHOR Run Club",
  5: "RAG Pipeline",
  6: "biol.club",
  7: "HomeQuest AI",
  8: "ICHOR Run Club",
  9: "RAG Pipeline",
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
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  const maxScrollRef = useRef(0);
  const activeSideRef = useRef<"left" | "right">("right");

  const [touch, setTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024)
  );

  const [cols, setCols] = useState(() =>
    typeof window !== "undefined" ? colsForWidth(window.innerWidth) : 4
  );

  const [videosReady, setVideosReady] = useState(false);

  const layout = useMemo(() => buildLayout(GALLERY_IMAGES.length, cols), [cols]);

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

  /* Video loading and playback */
  useEffect(() => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    let leftLoaded = false;
    let rightLoaded = false;

    const checkReady = () => {
      if (leftLoaded && rightLoaded) {
        setVideosReady(true);
      }
    };

    const onLeftLoad = () => {
      leftLoaded = true;
      checkReady();
    };

    const onRightLoad = () => {
      rightLoaded = true;
      checkReady();
    };

    left.addEventListener("loadeddata", onLeftLoad);
    right.addEventListener("loadeddata", onRightLoad);

    if (left.readyState >= 2) leftLoaded = true;
    if (right.readyState >= 2) rightLoaded = true;
    checkReady();

    /* Touch autoplay alternate loop */
    if (touch) {
      left.style.display = "block";
      right.style.display = "none";
      left.play().catch(() => {});

      const onLeftEnded = () => {
        left.style.display = "none";
        right.style.display = "block";
        right.currentTime = 0;
        right.play().catch(() => {});
      };

      const onRightEnded = () => {
        right.style.display = "none";
        left.style.display = "block";
        left.currentTime = 0;
        left.play().catch(() => {});
      };

      left.addEventListener("ended", onLeftEnded);
      right.addEventListener("ended", onRightEnded);

      return () => {
        left.removeEventListener("loadeddata", onLeftLoad);
        right.removeEventListener("loadeddata", onRightLoad);
        left.removeEventListener("ended", onLeftEnded);
        right.removeEventListener("ended", onRightEnded);
      };
    }

    /* Desktop cursor-scrub interaction */
    let rafId = 0;
    let targetLeftTime = 0;
    let targetRightTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const center = w / 2;
      const deadZone = Math.max(30, w * 0.05);

      if (e.clientX >= center - deadZone && e.clientX <= center + deadZone) {
        targetLeftTime = 0;
        targetRightTime = 0;
      } else if (e.clientX < center - deadZone) {
        activeSideRef.current = "right";
        const range = center - deadZone;
        const dist = center - deadZone - e.clientX;
        const progress = Math.max(0, Math.min(1, dist / range));
        if (right.duration) {
          targetRightTime = progress * right.duration;
        }
      } else {
        activeSideRef.current = "left";
        const range = w - (center + deadZone);
        const dist = e.clientX - (center + deadZone);
        const progress = Math.max(0, Math.min(1, dist / range));
        if (left.duration) {
          targetLeftTime = progress * left.duration;
        }
      }
    };

    const scrubLoop = () => {
      if (activeSideRef.current === "right") {
        if (right.style.display !== "block") right.style.display = "block";
        if (left.style.display !== "none") left.style.display = "none";

        if (!right.seeking && right.duration && Math.abs(right.currentTime - targetRightTime) > 0.03) {
          right.currentTime = targetRightTime;
        }
      } else {
        if (left.style.display !== "block") left.style.display = "block";
        if (right.style.display !== "none") right.style.display = "none";

        if (!left.seeking && left.duration && Math.abs(left.currentTime - targetLeftTime) > 0.03) {
          left.currentTime = targetLeftTime;
        }
      }
      rafId = requestAnimationFrame(scrubLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(scrubLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      left.removeEventListener("loadeddata", onLeftLoad);
      right.removeEventListener("loadeddata", onRightLoad);
    };
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
      if (rootRef.current) {
        rootRef.current.style.height = `${vh + maxScroll + 2 * vh}px`;
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
      const denom = Math.max(1, vh - 100);
      const p = Math.max(0, Math.min(1, (y - outroStart) / denom));

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
  const captionTop = isMobile ? 130 : isTablet ? 195 : 264;
  const captionWidth = isMobile
    ? "calc(100vw - 32px)"
    : isTablet
      ? "calc(50vw - 48px)"
      : "580px";

  return (
    <div
      ref={rootRef}
      id="scroll-spacer"
      style={{
        position: "relative",
        userSelect: "none",
        background: "#ffffff",
        height: "500vh",
        cursor: touch ? "auto" : "none",
        fontFamily: "'Inter Tight', sans-serif",
      }}
    >
      {/* 1A. Custom Cursor (Desktop Only) */}
      {!touch && (
        <div
          ref={cursorRef}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 50,
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

      {/* 1G. Video Container */}
      <div
        ref={heroRef}
        id="main-canvas"
        style={{
          position: "fixed",
          inset: isMobile ? undefined : 0,
          left: isMobile ? 0 : undefined,
          top: isMobile ? 220 : undefined,
          width: isMobile ? "100vw" : "100%",
          height: isMobile ? "calc(100vh - 220px)" : "100%",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          background: "#000000",
          opacity: videosReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <video
          ref={leftVideoRef}
          src={LEFT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "none",
          }}
        />
        <video
          ref={rightVideoRef}
          src={RIGHT_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* 1B. Logo (Top Left) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0 }}
        style={{
          position: "fixed",
          top: isMobile ? 16 : 32,
          left: isMobile ? 16 : 32,
          zIndex: 20,
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          width: logoWidth,
        }}
      >
        <svg
          viewBox="0 0 380 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Name wordmark */}
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
          {/* Dot accent */}
          <circle cx="368" cy="14" r="10" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* 1C. Caption (Below Logo, Left Side) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        style={{
          position: "fixed",
          left: isMobile ? 16 : 32,
          top: captionTop,
          width: captionWidth,
          zIndex: 20,
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          fontFamily: "'Inter Tight', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "140%",
          letterSpacing: "-0.04em",
          color: "#FFFFFF",
        }}
      >
        Product &amp; AI Engineer — I take consumer products from the
        problem statement through the PRD, architecture, and launch, to
        real users on the other side. Delhi, India · Newton School of
        Technology.
      </motion.div>

      {/* NAV (Top Right) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        style={{
          position: "fixed",
          top: isMobile ? 16 : 32,
          right: isMobile ? 16 : 32,
          width: isMobile ? "auto" : 380,
          height: 30,
          zIndex: 20,
          pointerEvents: "none",
          mixBlendMode: "exclusion",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isMobile && (
          <>
            {["WORK", "SKILLS", "CONTACT"].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            ))}
          </>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 16 : 32,
          }}
        >
          <svg
            width={isMobile ? 24 : 28}
            height={isMobile ? 24 : 28}
            viewBox="0 0 40 40"
            fill="none"
          >
            <path d="M0 14H40" stroke="#FFFFFF" strokeWidth="2.5" />
            <path d="M0 26H40" stroke="#FFFFFF" strokeWidth="2.5" />
          </svg>
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: isMobile ? 12 : 13,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
            }}
          >
            [ HIRE ME ]
          </span>
        </div>
      </motion.div>

      {/* 1E. Product Info (Bottom Right) */}
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

          {/* Identity label */}
          <div
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
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
            fontWeight: 500,
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
            opacity: 0.7,
            marginTop: 4,
          }}
        >
          requests on biol
        </div>
      </motion.div>

      {/* CTA "hire" button — appears on outro */}
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

      {/* SECTION 2: Black Panel (Gallery) */}
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
              const imgSrc = GALLERY_IMAGES[tileIdx];
              const caption = GALLERY_CAPTIONS[tileIdx] ?? "";
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
                    overflow: "hidden",
                    position: "relative",
                    background: "#111111",
                  }}
                >
                  <img
                    src={imgSrc}
                    alt={caption}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: tileIdx === 0 ? "center top" : "center center",
                    }}
                  />
                  {caption && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "20px 10px 8px",
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 500,
                        fontSize: cols === 2 ? 9 : 11,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.75)",
                      }}
                    >
                      {caption}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
