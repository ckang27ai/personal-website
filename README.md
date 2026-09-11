# Personal Website Template

A clean, fast personal website for students: a homepage with your bio and contact links, a
resume page, and project write-ups, each with its own page. It's free to host on Vercel, and you
don't need to be an experienced developer to make it yours: all of your content lives in a few
plain files.

Built with React, TanStack Start, and Tailwind CSS.

## Get your own copy

1. Click **Use this template** → **Create a new repository** at the top of this page.
2. Name it (for example `personal-website`) and click **Create repository**.

## Run it on your computer

You'll need [Node.js](https://nodejs.org) 22 or newer and [Git](https://git-scm.com).

```sh
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev
```

Open http://localhost:8080. The page updates as soon as you save a file.

## Make it yours

| What                           | Where                                                       |
| ------------------------------ | ----------------------------------------------------------- |
| Your name and site description | `src/lib/site.ts`                                           |
| Homepage bio and contact links | `src/routes/index.tsx`                                      |
| Resume                         | `src/routes/resume.tsx`                                     |
| Projects                       | `src/lib/projects.ts`                                       |
| Headshot                       | `src/assets/headshot.webp`                                  |
| Browser tab icon               | `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png` |
| Link preview image             | `public/og-image.png`                                       |
| Colors                         | `src/styles.css`                                            |

**Projects.** Each project in `src/lib/projects.ts` gets a card on the Projects page and its own
page. The two sample projects show every kind of content block (paragraphs, bullet lists,
YouTube videos, and link buttons). Copy one, change the text, and delete the samples when
you're done.

**Headshot.** Replace `src/assets/headshot.webp` with a square photo of yourself, ideally at
least 512×512. If your photo is a `.jpg` or `.png`, put it in `src/assets/` and update the
`import headshot from ...` line at the top of `src/routes/index.tsx` to match the file name.

**Browser tab icon.** `public/favicon.svg` is a simple text file: open it and change `YN` to your
initials, and change the `fill` color if you like. To regenerate `favicon.ico` and
`apple-touch-icon.png`, upload your SVG to a free generator such as
[RealFaviconGenerator](https://realfavicongenerator.net).

**Link preview image.** When someone shares your site on LinkedIn, iMessage, or Slack, they see
`public/og-image.png`. Once your homepage looks the way you want, take a 1200×630 screenshot of
it and save it over that file.

**Colors.** The accent color is `--primary` in `src/styles.css`.

## Put it online (free)

1. Sign in to [Vercel](https://vercel.com) with your GitHub account.
2. Click **Add New… → Project**, pick your repository, and click **Deploy**. No settings needed.
3. Copy your new site's address (like `https://your-repo.vercel.app`), paste it as `SITE_URL`
   in `src/lib/site.ts`, then commit and push.

From then on, every push to `main` updates your live site within a minute. To use your own
domain, add it under your Vercel project's **Settings → Domains**, then update `SITE_URL` again.

## Useful commands

```sh
npm run dev        # local dev server at http://localhost:8080
npm run lint       # check code style
npm run typecheck  # check for type errors
npm run build      # production build
npm run preview    # serve the production build locally
npm run format     # auto-format all files
```

A GitHub Actions workflow runs lint, typecheck, and build on every pull request, so you'll know
if a change breaks the site before it goes live.

## License

[MIT](LICENSE): use it, change it, and publish your own version freely.
