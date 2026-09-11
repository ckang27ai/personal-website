import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/Eyebrow";
import { Pill } from "@/components/Pill";
import { projects } from "@/lib/projects";
import { pageMeta, SITE_NAME } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: pageMeta({ title: "Projects", description: `Selected projects by ${SITE_NAME}.` }),
  }),
  component: ProjectsIndex,
});

function ProjectsIndex() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <Eyebrow>Projects</Eyebrow>
      <h1 className="mt-2 text-3xl font-bold text-foreground">Selected Work</h1>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Climate, operations, and the occasional side project built to settle an argument with
        myself.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
          >
            <div>
              <h2 className="text-lg font-semibold text-foreground">{p.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors group-hover:text-primary/80">
              View project <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
