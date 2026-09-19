# PRD & Superprompt: Pushkar Jain Portfolio & Resume Integration

## 1. Executive Summary & Objective
Transform the portfolio at `https://forsarthak.vercel.app` into an extraordinary, professional Product & AI Engineer showcase for **Pushkar Jain**. 
Preserve the core signature UI/UX components (Hero video-scrub phase, scattered grid scaling Gallery phase, Outro white overlay transition) while improvising and infusing **100% of the details from Pushkar's resume** into an editorial-grade experience, featuring his official portrait `imagetobeused.jpg` prominently on the landing page.

---

## 2. Source Data: Full Resume Dossier

### 2.1 Identity & Header
- **Full Name**: Pushkar Jain
- **Headline**: Product-minded Full-Stack and AI Engineer
- **Target Roles**: AI/LLM Product Management | Product Engineering Internship Roles
- **Location**: Delhi, India
- **Phone**: +91 79868 05107
- **Email**: pushkar.jain2024@nst.rishihood.edu.in
- **LinkedIn**: https://linkedin.com/in/pushkarjainn
- **GitHub**: https://github.com/pushkar-bit
- **Instagram**: @ichor.club (https://www.instagram.com/ichor.club/)
- **Summary**: Product-minded Full-Stack and AI Engineer experienced in taking consumer digital products from initial problem statement to deployment and active user adoption. Proficient in end-to-end product development, PRD authoring, user research, full-stack architecture, RAG engine design, gamification mechanics, application security hardening, and growth strategy.

---

### 2.2 Work Experience
1. **Software Developer Intern** — *Launched Global* (Remote) | May 2025 – Jun 2025
   - Built a reusable, modular restaurant menu frontend template that allowed non-technical owners to edit menu content without touching core code.
   - Designed for rapid customization and redeployment across client sites.
   - **Tech**: HTML, CSS, JavaScript
2. **Growth & Development Head** — *Apollo MedSkills – Rishihood University* | Apr 2025
   - Developed consumer engagement and conversion strategies for the Apollo MedSkills program.
   - Spearheaded marketing campaigns, audience targeting, and strategic brand communication.

---

### 2.3 Flagship Projects
1. **biol – Campus Social Platform** (`biol.club` | GitHub)
   - **Scale**: 29,000+ requests / 4,000 users with zero paid acquisition running on free-tier infrastructure.
   - **Tech Stack**: React 19, Vite 8, Express v5, Prisma v5, SQLite, Socket.IO, RAG Engine (Google Generative AI + pdf-parse), Tailwind CSS v4, Zustand, Cloudinary, Google OAuth, Helmet.
   - **Highlights**:
     - Architect and PRD lead on a student social platform for discovery, anonymous chat, campus stories, and RAG-powered document processing; defined spec, feature set, and success metrics before development, then co-built and shipped with one engineer.
     - Grounded product decisions in primary research on Gen Z consumer behavior regarding how campus-age users discover, engage with, and churn from social products.
     - Designed in-app points economy (signup and survey rewards) and peer contact-exchange flow with idempotent transactions and atomic accept logic.
     - Owned application security end-to-end: enforced HTTPS/TLS, closed clickjacking vectors with frame-ancestor restrictions, and layered edge rate limiting & DDoS mitigation.

2. **ICHOR – Social Fitness Platform** (`ichor-xi.vercel.app` | GitHub | `@ichor.club`)
   - **Scale**: 500+ member active community.
   - **Tech Stack**: Next.js 16, React 19, TypeScript, MongoDB (Mongoose), Upstash Redis, Gamification Engine (Turf.js + Strava API), RAG Engine (Gemini AI), Firebase, Leaflet, Tailwind CSS v4, Framer Motion, Three.js, Sentry.
   - **Highlights**:
     - Designed and built a gamified social fitness platform turning running into territory wars: GPS-verified routes claim mapped territory, held ground generates passive points, and contested territory appreciates in value.
     - Architected gamification layer and points economy where distance, pace, streaks, nutrition, and battles won compound into a single non-resetting score, plus clan mechanics where crews pool territory into a shared map empire and declare 48-hour wars on rivals.
     - Integrated Strava API and RAG engine end-to-end: OAuth 2.0 onboarding via Strava and Google, automated activity sync, and GPS route ingestion feeding live leaderboards, contextual workout insights, and territory claims.
     - Directed full design system—brand identity, dark palette, and high-fidelity feed, leaderboard, and challenge surfaces in Figma.

3. **HomeQuest – AI Real Estate Marketplace** (`homequest1.vercel.app`)
   - Full-stack real-estate platform with property listings, live agent chat, and AI-assisted queries cutting the broker out of the handshake.
   - **Tech Stack**: React, Node.js, MySQL, Socket.io, GPT-4o mini.

4. **InsightRAG – Multi-tenant RAG Pipeline** (`rag-lac-ten.vercel.app`)
   - High-throughput document ingestion, vector embeddings, context-aware Q&A with BullMQ job queues, fallback retries, and strict source attribution.
   - **Tech Stack**: Next.js, Groq, Gemini AI, MongoDB, BullMQ.

---

### 2.4 Core Skills Breakdown
- **AI & LLM**: Retrieval-Augmented Generation (RAG), Vector Search, Embeddings, LLM API Integration (Gemini AI, OpenAI GPT-4o mini, Groq), Prompt Engineering, GenAI Application Development, Multi-tenant AI Architecture
- **Product Management**: PRD Authoring, Product Requirements, User Research, Consumer Behavior Analysis, Roadmapping, Feature Prioritization, Gamification & Retention Design, Growth Analysis, Go-to-Market, Stakeholder Communication
- **Languages**: TypeScript, JavaScript, Python, C, SQL
- **Frameworks & Libraries**: Next.js, React, React Native, Node.js, Express.js, Tailwind CSS, Zustand, TanStack Query, Socket.io, Prisma ORM, BullMQ
- **Data & Analytics**: PostgreSQL, MySQL, MongoDB, Supabase, Firebase, Upstash Redis, NumPy, Pandas, Matplotlib, Tableau, Data Structures & Algorithms
- **Cloud, DevOps & Security**: Vercel, Railway, GitHub Actions, CI/CD, OAuth 2.0, HTTPS/TLS Enforcement, DDoS Mitigation, Clickjacking Protection, JWT Authentication, REST APIs, Sentry, Git, Figma

---

### 2.5 Education
- **Degree**: B.Tech in Computer Science
- **Institution**: Newton School of Technology, Rishihood University
- **Timeline**: Expected Jan 2028
- **GPA**: 7.0 / 10.0

---

### 2.6 Co-Curricular & Leadership
- **Founder & President** — *ICHOR Run Club, Rishihood University* (Jun 2026 – Present)
  - Founded club and grew to 500+ member community in 1st month; built brand identity, constitution, and operating model from zero to university registration with 5-person founding team.
  - Created and delivered RU-Rox, flagship obstacle race with Rishihood University and ARAMBH Orientation, selling out every bib for 1st edition while managing race format, logistics, and registration.
- **Growth & Development Head** — *Arthakram Consulting Club*
  - Led club strategy, leadership initiatives, and structured problem-solving frameworks.
- **Competitions & Leadership**:
  - LSSC Declamation Champion, Interschool JAM Champion, MUN Debate Champion; multiple hackathons and E-Summits in technical and leadership roles.

---

## 3. UI/UX Architecture & Improvisations

### 3.1 Landing Page Hero Section
- **Image Integration**: Use `imagetobeused.jpg` as Pushkar's primary hero portrait badge/card, visible immediately on the initial viewport.
- Provide a subtle active status badge: `🟢 Available for AI/LLM PM & Product Eng Roles`.
- Preserve the signature dual-video scrubber background canvas, keeping it interactive on cursor move.
- Keep the top wordmark `"Pushkar"`, the bio caption, and the stat counter (`29K+ requests on biol`).

### 3.2 Navigation & Smooth Anchor Scrolling
- Nav links: `WORK`, `SKILLS`, `EXPERIENCE`, `CONTACT`, and `[ HIRE ME ]`.
- Make them interactive buttons that smoothly navigate directly to their respective resume sections.

### 3.3 Scattered Grid Gallery
- Feature `imagetobeused.jpg`, `shot-biol.png`, `biol-proof.png`, `shot-ichor.png`, `shot-rag.png`, `shot-homequest.png`.
- Provide high-contrast, clean captions and live links on cards.

### 3.4 Outro & Comprehensive Resume Dossier
- Following the outro phase ("hire" button with mailto), expand into the complete editorial dossier:
  1. **About & Philosophy**: Product-minded engineer summary and core pillars.
  2. **Detailed Experience**: Launched Global & Apollo MedSkills with dates, bullet points, and tech tags.
  3. **Flagship Projects Deep Dive**: biol, ICHOR, HomeQuest, and InsightRAG with metrics, full bullet points, tech stack pills, and live visit links.
  4. **Categorized Skill Matrix**: Interactive categorized skill chips (AI & LLM, PM, Languages, Frameworks, Data, DevOps/Security).
  5. **Education & Leadership**: B.Tech Newton School of Tech + ICHOR Run Club + Arthakram + Debate/Hackathons.
  6. **Direct Contact Grid**: Email, Phone, LinkedIn, GitHub, Instagram (@ichor.club), and Location.
  7. **Back to Top button** and dynamic footer.

---

## 4. Execution Workflow
1. Verify `imagetobeused.jpg` is copied to `/public/img/imagetobeused.jpg` and `/public/imagetobeused.jpg`.
2. Update `src/App.tsx` with all resume data structures and refined UI components.
3. Keep the scroll engine intact while supporting document flow for the resume dossier.
4. Run `npm run build` and ensure 0 TypeScript or lint errors.
5. Verify in browser with subagent and preview screenshots.
6. Commit and push to git repository for auto-deployment to Vercel.
