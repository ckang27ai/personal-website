# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A personal website for a student: homepage (bio + contact), resume page, and project
write-ups with one page per project. Server-rendered React deployed free on Vercel.

**Current state: filled in with a fictional persona.** The site is populated with
"Priya Venkatesan", an invented MIT Sloan MBA '27 (climate tech + operations), across
`site.ts`, `index.tsx`, `resume.tsx`, and `projects.ts`. This is placeholder content of a
better kind, not real biography — the person, companies (Verdigris Energy, Northwind
Logistics, Bellweather Manufacturing), GitHub links, and email are all fabricated. Replace
with real details before this goes public.

Still genuinely unset: `SITE_URL` (currently `https://priya-venkatesan.vercel.app`, a guess
— must become the real deploy URL), `src/assets/headshot.webp`, and the binary icons
(`favicon.ico`, `apple-touch-icon.png`, `og-image.png`). `favicon.svg` reads "PV".

## Stack

- **React 19** + **TanStack Start** (`@tanstack/react-start`) on **TanStack Router** — SSR
  with file-based routing.
- **Nitro** as the server/build target. It picks the preset at build time: Vercel when
  building on Vercel, otherwise a standalone Node server at `.output/server/index.mjs`.
- **Tailwind CSS v4** via `@tailwindcss/vite` — CSS-first config, no `tailwind.config.js`.
- **lucide-react** for icons.
- **Vite 7**, TypeScript strict mode, ESLint + Prettier.

No test framework. No state management, no data fetching, no backend — all content is
hard-coded TypeScript.

## Commands

```sh
npm install
npm run dev        # http://localhost:8080  (note: 8080, not Vite's default 5173)
npm run lint       # eslint (Prettier violations surface as lint errors)
npm run typecheck  # tsc --noEmit
npm run build      # production build into .output/
npm run preview
npm run format     # prettier --write .
```

CI (`.github/workflows/ci.yml`) runs lint → typecheck → build on every PR and push to
`main`. Run those three locally before proposing a change is done.

## Layout

```
src/
  routes/                    file-based routes (see below)
  components/                SiteHeader, SiteFooter, Eyebrow, Pill, DefaultErrorComponent
  lib/
    site.ts                  SITE_URL, SITE_NAME, SITE_DESCRIPTION, pageMeta()
    projects.ts              project data + block types + getProject()
    buttons.ts               shared button class strings
  styles.css                 Tailwind import + design tokens
  router.tsx                 createRouter(), wires in the default error component
  routeTree.gen.ts           GENERATED — never edit by hand
  assets/headshot.webp
public/                      favicon.ico/.svg, apple-touch-icon.png, og-image.png
```

### Routes

| File                        | URL                                                          |
| --------------------------- | ------------------------------------------------------------ |
| `routes/__root.tsx`         | HTML shell, `<head>` meta, header/main/footer, 404 component |
| `routes/index.tsx`          | `/` — hero, bio, contact links                               |
| `routes/resume.tsx`         | `/resume`                                                    |
| `routes/projects.index.tsx` | `/projects` — card grid                                      |
| `routes/projects.$slug.tsx` | `/projects/<slug>` — renders one project's sections          |
| `routes/robots[.]txt.ts`    | `/robots.txt` — server handler, plain text                   |
| `routes/sitemap[.]xml.ts`   | `/sitemap.xml` — server handler, generated from `projects`   |

`[.]` in a filename escapes a literal dot in the URL. The two SEO routes export
`server.handlers.GET` returning a `Response` instead of a component.

## How content is modelled

Content is data, not prose-in-JSX, wherever a page repeats a shape:

- **`src/lib/projects.ts`** — the `projects` array drives the cards on `/projects`, each
  detail page, and the sitemap. A project has `slug`, `title`, `blurb`, `tags`, and
  `sections`; each section is `{ title, blocks[] }`; each block is a discriminated union:
  `paragraph` | `list` | `video` (YouTube ID) | `link`. `projects.$slug.tsx`'s
  `RenderSection` handles `paragraph`, `link`, and `video` with early returns and treats
  everything else as `list` — **adding a new block type means adding a branch there**;
  TypeScript will flag the omission, since the fallback then narrows to more than `list` and
  `block.items` stops type-checking.
- **`src/routes/resume.tsx`** — `education`, `experience`, `skillGroups`, `certifications`,
  `interests` are module-level consts at the top of the file; the JSX below just maps them.
  Add/remove/reorder entries freely.
- **`src/routes/index.tsx`** — the bio paragraph is inline JSX; contact links are the
  `contacts` array; `emailHref` is used in two places.
- **`src/lib/site.ts`** — `pageMeta({ title, description })` builds title + description +
  Open Graph + Twitter tags and appends the site name (`"Resume — Your Name"`). Every page
  route calls it in its `head()`. Root adds `og:image`, `twitter:card`, and author.

`SITE_URL` feeds absolute URLs in `og:image`, `robots.txt`, and `sitemap.xml`, so it must be
updated after the first deploy or social previews and SEO point at the placeholder domain.

## Styling

- Tailwind v4 CSS-first: `src/styles.css` holds `@theme inline` (maps CSS variables to
  utility names) and `:root` (the actual values). **All colors are `oklch`.** Adding a
  semantic color takes two edits: define `--foo` in `:root`, then register
  `--color-foo: var(--foo)` in `@theme inline`. Only registered names produce utilities.
- Palette: cream background, teal `--primary`, `--radius: 0.75rem`. No dark mode.
- Buttons are shared class strings, not components: `primaryButton` / `outlineButton` from
  `src/lib/buttons.ts`, applied to both `<a>`/`<Link>` and `<button>`. Reuse them instead of
  writing new button classes.
- `Eyebrow` (small uppercase label, renders `span` or `h2`) and `Pill` (tag chip) are the
  only presentational components; prefer them over re-styling.
- Layout convention: `mx-auto w-full max-w-5xl px-6` for wide pages, `max-w-3xl` for reading
  pages (resume, project detail).

## Conventions and gotchas

- **`src/routeTree.gen.ts` is generated** by the TanStack Router plugin on dev/build. Don't
  edit it; add a file under `src/routes/` and let it regenerate.
- **Import alias `@/*` → `./src/*`** (tsconfig `paths` + `vite-tsconfig-paths`). Used
  everywhere except `__root.tsx`'s `../styles.css?url`.
- **404s**: `projects.$slug.tsx` throws `notFound()` from the _loader_, not the component,
  so the server can respond with a real 404 status. Keep that pattern.
- **Prettier is enforced through ESLint** (`eslint-plugin-prettier/recommended`), printWidth 100. Formatting mistakes fail CI as lint errors — run `npm run format`.
- **TS strict plus `noUnusedLocals`/`noUnusedParameters`** — an unused import fails
  `typecheck` and therefore CI.
- List content is sometimes used as the React `key` (resume note/bullet text, project
  section title). Duplicate strings within one list will collide; use distinct text.
- External links use `target="_blank" rel="noopener noreferrer"`; the homepage `contacts`
  array gates this on an `external` flag.
- `import.meta.env.DEV` guards the error message shown in `DefaultErrorComponent`, so error
  details never leak in production.

## Deploying

Vercel, connected to the GitHub repo — no build settings needed; every push to `main` ships.
After the first deploy, set `SITE_URL` in `src/lib/site.ts` to the live address (and again
if a custom domain is added).
