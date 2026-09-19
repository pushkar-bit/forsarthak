import { type CSSProperties } from "react";
import { FadeIn } from "../jack/FadeIn";

const SKILLS = [
  {
    num: "01",
    name: "AI & LLM Engineering",
    desc: "Retrieval-augmented generation, vector search, embeddings, LLM API integration (Gemini, GPT-4o mini, Groq), prompt engineering, GenAI application development, multi-tenant AI architecture.",
  },
  {
    num: "02",
    name: "Product Management",
    desc: "PRD authoring, user research, consumer behaviour analysis, roadmapping, feature prioritisation, gamification and retention design, growth analysis, go-to-market strategy, stakeholder communication.",
  },
  {
    num: "03",
    name: "Full-Stack Development",
    desc: "React, Next.js, React Native, Node.js, Express.js, Tailwind CSS, Zustand, TanStack Query, Socket.IO, Prisma ORM, BullMQ — TypeScript, JavaScript, Python, C, SQL.",
  },
  {
    num: "04",
    name: "Data & Analytics",
    desc: "PostgreSQL, MySQL, MongoDB, Supabase, Firebase, Upstash Redis, NumPy, Pandas, Matplotlib, Tableau, data structures and algorithms.",
  },
  {
    num: "05",
    name: "Cloud, DevOps & Security",
    desc: "Vercel, Railway, GitHub Actions, CI/CD, OAuth 2.0, HTTPS/TLS enforcement, DDoS mitigation, clickjacking protection, JWT authentication, REST APIs, Sentry, Figma.",
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-0"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={30}>
          <h2
            className="font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 select-none text-[#0C0C0C]"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" } as CSSProperties}
          >
            Skills
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {SKILLS.map((skill, i) => (
            <FadeIn key={skill.num} delay={i * 0.1} y={30}>
              <div
                className="py-8 sm:py-10 md:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 md:gap-12"
                style={{
                  borderTop: "1px solid rgba(12,12,12,0.15)",
                  ...(i === SKILLS.length - 1 ? { borderBottom: "1px solid rgba(12,12,12,0.15)" } : {}),
                }}
              >
                <span
                  className="font-black text-[#0C0C0C] leading-none shrink-0 select-none min-w-[90px] sm:min-w-[130px]"
                  style={{ fontSize: "clamp(3rem, 10vw, 140px)" } as CSSProperties}
                >
                  {skill.num}
                </span>
                <div className="flex flex-col gap-1.5 sm:gap-2 flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" } as CSSProperties}
                  >
                    {skill.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                    style={{
                      fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                      opacity: 0.6,
                    } as CSSProperties}
                  >
                    {skill.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
