# Pushkar Jain — a pitch for Sarthak

A full-screen, scroll-driven pitch site. One continuous scroll: a hero (portrait +
overlaid UI + custom cursor) → a black panel slides up → a scattered gallery of
photos and project proof that scale in/out → a white outro with a `view` CTA.

Built with **React 19 · TypeScript · Vite 6 · Tailwind v4 · Motion**. The scroll
engine is fully `requestAnimationFrame`-driven (no scroll-jank), exactly per spec.

## 1. Add your photos

Drop 4 files into `public/img/` (see `public/img/README.txt`):

| file            | what it is                                   |
| --------------- | -------------------------------------------- |
| `hero.jpg`      | main portrait — hero background              |
| `latenight.jpg` | the 02:39 laptop shot (up-all-night proof)   |
| `thumbs-a.jpg`  | thumbs-up selfie                             |
| `thumbs-b.jpg`  | close-up thumbs-up selfie                    |

Missing files fall back to clean branded cards — the site never looks broken.

## 2. Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## 3. Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## 4. Deploy to Vercel

Option A — CLI:

```bash
npm i -g vercel
vercel            # follow prompts; framework auto-detected as Vite
vercel --prod
```

Option B — Dashboard: push this folder to a GitHub repo, then "New Project" on
vercel.com and import it. Build command `npm run build`, output dir `dist`.

## The gallery archive (what's in each tile)

Photos are mixed with self-contained "proof of work" cards:
`biol.club` · `ichor` · RAG Knowledge Assistant · HomeQuest · Territory Run (the
running/territory game) · a "how I build" card (ideate → cross-question → harden)
· and a closing "unlimited consistency" card. Edit them in `src/App.tsx` → `TILES`.
