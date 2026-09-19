import { SectionShell } from "./SectionShell";

interface SkillCategory {
  category: string;
  skills: string;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "AI & LLM",
    skills:
      "Retrieval-augmented generation, vector search, embeddings, LLM API integration (Gemini, GPT-4o mini, Groq), prompt engineering, GenAI application development, multi-tenant AI architecture",
  },
  {
    category: "Product",
    skills:
      "PRD authoring, product requirements, user research, consumer behaviour analysis, roadmapping, feature prioritisation, gamification and retention design, growth analysis, go-to-market, stakeholder communication",
  },
  {
    category: "Languages",
    skills: "TypeScript, JavaScript, Python, C, SQL",
  },
  {
    category: "Frameworks & libraries",
    skills:
      "Next.js, React, React Native, Node.js, Express.js, Tailwind CSS, Zustand, TanStack Query, Socket.IO, Prisma ORM, BullMQ",
  },
  {
    category: "Data & analytics",
    skills:
      "PostgreSQL, MySQL, MongoDB, Supabase, Firebase, Upstash Redis, NumPy, Pandas, Matplotlib, Tableau, data structures and algorithms",
  },
  {
    category: "Cloud, DevOps & security",
    skills:
      "Vercel, Railway, GitHub Actions, CI/CD, OAuth 2.0, HTTPS/TLS enforcement, DDoS mitigation, clickjacking protection, JWT authentication, REST APIs, Sentry, Git, Figma",
  },
];

export function SkillsSection() {
  return (
    <SectionShell id="skills" label="What I work with">
      <div className="flex flex-col">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={cat.category}
            className={`py-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 ${
              idx === 0 ? "pt-0" : "border-t border-[rgba(0,0,0,0.1)]"
            }`}
          >
            <h3 className="font-semibold text-base sm:text-lg text-[#0a0a0a] min-w-[200px] shrink-0 tracking-tight">
              {cat.category}
            </h3>
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#4a4a4a] max-w-[66ch]">
              {cat.skills}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
