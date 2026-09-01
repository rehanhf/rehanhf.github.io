Overview
- Single-page React + TypeScript portfolio built with Vite. UI is componentized under `components/` and content is sourced from `data/portfolio.ts` via the `LanguageContext` provider.

Architecture & Data Flow
- `index.tsx` mounts the app and wraps it with `context/LanguageContext.tsx` (`LanguageProvider`).
- `LanguageContext` reads `portfolioData` from `data/portfolio.ts` and exposes `useLanguage()` to components. Update textual content or labels only in `data/portfolio.ts`.
- `App.tsx` composes sections (Hero, Summary, TechStack, Projects, Experience, Education, Footer). Most components are presentational and consume the shared `content` object.
- UI uses utility CSS classes (Tailwind-style classes appear throughout). Animations use `framer-motion`. Icons come from `lucide-react`.

Build / Dev / Debug
- Install: `npm install` (Node >= 24 recommended; `package.json` lists `node`).
- Dev server: `npm run dev` (Vite). Port and host configured in `vite.config.ts` (default: `3000`, host `0.0.0.0`).
- Production build: `npm run build` and preview with `npm run preview`.
- Environment: `vite.config.ts` reads `GEMINI_API_KEY` and exposes it as `process.env.GEMINI_API_KEY`. Do NOT commit secrets; use `.env` files or CI secrets.

Project-specific Conventions
- Single source of truth for content: edit `data/portfolio.ts` to change hero text, labels, skills, projects, social links and translations (en/id).
- Component props: many components accept simple props (e.g., `TechStack` expects an `items` array). Follow existing shapes in `data/portfolio.ts` and `types.ts`.
- Social icons: Footer maps platform strings to icons. Keep platform keys consistent with Footer's `getIcon` mapping (`github`, `linkedin`, `email`).
- Language toggle: default language is `'en'` in `LanguageContext`. To change default, update the `useState` initial value.
- Path alias `@` is configured in `tsconfig.json` and `vite.config.ts` — import with `@/path` if needed.

Integration Points
- Gemini API: referenced in `data` and `vite.config.ts` — if you add AI features, read `process.env.GEMINI_API_KEY` and follow safe secret handling.
- `HeroProfile3D.tsx` likely contains 3D/webgl code — review it before changing rendering or bundling options.

Editing Examples (concrete)
- Add a new project: append to `data/portfolio.ts` -> `enContent.projects` and `idContent.projects`. Use existing project objects as templates (fields: `id`, `title`, `description`, `tags`, `link`).
- Add a social link: edit `socialLinks` in `data/portfolio.ts` and ensure `platform` matches Footer's supported keys.
- Change nav labels: update `labels.nav` in `data/portfolio.ts`.

What agents should NOT assume
- There are no configured tests or CI workflows in the repo — do not add tests without confirming preferred test runner.
- Tailwind is implied by CSS class usage but not present in `package.json` dependencies; confirm before adding Tailwind-specific build changes.

Files to inspect for implementation details
- `index.tsx`, `App.tsx`, `vite.config.ts`, `tsconfig.json`
- `context/LanguageContext.tsx`, `data/portfolio.ts`, `types.ts`
- `components/*` (start with `Footer.tsx`, `HeroProfile3D.tsx`, `MouseFollower.tsx`, `TechStack.tsx`)

When submitting PRs
- Small, focused changes: content edits should only touch `data/portfolio.ts`; UI/behavior changes should include a component update and a short description.
- Document env vars required (e.g., `GEMINI_API_KEY`) in the PR description.

If anything in this file is unclear or you want additional examples (e.g., `HeroProfile3D` breakdown, adding Tailwind), tell me which area to expand.
