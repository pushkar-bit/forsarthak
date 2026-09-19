import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Activity, Award, ExternalLink } from "lucide-react";

export function PortraitCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to card (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery smooth tilt
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // Glare / light reflection position
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);

  // Floating parallax for badges
  const badge1X = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);
  const badge1Y = useSpring(useTransform(y, [-0.5, 0.5], [-6, 6]), springConfig);

  const badge2X = useSpring(useTransform(x, [-0.5, 0.5], [8, -8]), springConfig);
  const badge2Y = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);

  const badge3X = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const badge3Y = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative select-none perspective-[1200px] w-full max-w-[430px] mx-auto py-6"
      style={{ perspective: 1200 }}
    >
      {/* Outer ambient glow behind the portrait */}
      <div
        className="absolute inset-4 rounded-[44px] pointer-events-none transition-opacity duration-700 blur-[50px] -z-10"
        style={{
          background: isHovered
            ? "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.35), transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25), rgba(59, 130, 246, 0.15), transparent 70%)",
        }}
      />

      {/* 3D Tilted Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? -8 : [0, -8, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.3 }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative rounded-[36px] sm:rounded-[42px] p-2 sm:p-2.5 border border-white/20 bg-gradient-to-b from-white/15 via-white/[0.04] to-black/70 backdrop-blur-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)]"
      >
        {/* Dynamic Glare Reflection Layer */}
        <motion.div
          className="absolute inset-0 rounded-[34px] sm:rounded-[40px] pointer-events-none overflow-hidden z-20"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Image Container */}
        <div className="relative aspect-[4/4.8] w-full rounded-[30px] sm:rounded-[36px] overflow-hidden bg-[#151515]">
          <img
            src="/pushkar.jpg"
            alt="Pushkar Jain — Product & AI Engineer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              objectPosition: "center 22%",
              transform: isHovered ? "scale(1.04)" : "scale(1)",
            }}
          />

          {/* Vignette & contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/30 to-transparent pointer-events-none" />

          {/* Bottom Card Identity Banner */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                  Open to Roles
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                Pushkar Jain
              </h2>
              <p className="text-xs text-white/75 mt-1.5 font-light flex items-center gap-1.5">
                <span>Product & AI Engineer</span>
                <span>·</span>
                <span>Delhi NCR 🇮🇳</span>
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-1.5 text-right hidden sm:block">
              <span className="text-[10px] uppercase tracking-wider text-white/60 block">Shipped</span>
              <span className="text-xs font-bold text-white">biol · ICHOR</span>
            </div>
          </div>
        </div>

        {/* Top-Right Floating Badge: Product & AI */}
        <motion.div
          style={{
            x: badge1X,
            y: badge1Y,
            translateZ: 50,
          }}
          className="absolute -top-3 -right-2 sm:-right-4 z-30 bg-[#0C0C0C]/90 backdrop-blur-xl border border-white/25 rounded-2xl px-3 sm:px-3.5 py-2 shadow-2xl flex items-center gap-2.5 group cursor-default"
        >
          <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white leading-tight">
              Product & AI
            </span>
            <span className="text-[9px] text-purple-300/80 tracking-tight leading-tight">
              End-to-End Builder
            </span>
          </div>
        </motion.div>

        {/* Mid-Left Floating Badge: ICHOR Run Club */}
        <motion.div
          style={{
            x: badge2X,
            y: badge2Y,
            translateZ: 55,
          }}
          className="absolute top-1/3 -left-3 sm:-left-6 z-30 bg-[#0C0C0C]/90 backdrop-blur-xl border border-white/25 rounded-2xl px-3 sm:px-3.5 py-2 shadow-2xl flex items-center gap-2.5 cursor-pointer hover:border-pink-500/50 hover:scale-105 transition-all duration-200"
          onClick={() => window.open("https://www.instagram.com/ichor.club/", "_blank")}
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-bold text-white leading-tight">
                @ichor.club
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-white/50" />
            </div>
            <span className="text-[9px] text-pink-300/90 tracking-tight leading-tight">
              500+ Community
            </span>
          </div>
        </motion.div>

        {/* Floating Pill: 29k requests */}
        <motion.div
          style={{
            x: badge3X,
            y: badge3Y,
            translateZ: 45,
          }}
          className="absolute -bottom-3 right-5 sm:right-6 z-30 flex items-center gap-1.5 bg-[#0C0C0C]/95 backdrop-blur-xl border border-white/25 rounded-full px-3.5 py-1.5 text-[11px] text-white/90 shadow-2xl"
        >
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-white">29K+</span>
          <span className="text-white/60">biol requests</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
