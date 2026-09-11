// After your first Vercel deploy, replace SITE_URL with your site's address (and update it again
// if you add a custom domain). It's used for absolute URLs in social previews, robots.txt, and
// the sitemap.
export const SITE_URL = "https://your-site.vercel.app";
export const SITE_NAME = "Your Name";
const SITE_DESCRIPTION =
  "Student and builder sharing my projects, experience, and what I'm learning along the way.";

// Title and description tags for search results and social previews (Open Graph + Twitter/X).
// `title` is the page name; the site name is appended ("Resume — Your Name").
export function pageMeta({
  title,
  description = SITE_DESCRIPTION,
}: { title?: string; description?: string } = {}) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
}
