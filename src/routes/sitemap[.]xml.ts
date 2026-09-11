import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

const staticPaths = ["/", "/resume", "/projects"];

// Generated from the project list so new projects are picked up automatically.
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [...staticPaths, ...projects.map((p) => `/projects/${p.slug}`)];
        const urls = paths.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
