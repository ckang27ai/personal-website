import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow } from "@/components/Eyebrow";
import { Pill } from "@/components/Pill";
import { outlineButton } from "@/lib/buttons";
import { getProject, type ProjectSection } from "@/lib/projects";
import { pageMeta } from "@/lib/site";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  // Throwing here (rather than in the component) lets the server render the
  // not-found page with a 404 status.
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? pageMeta({ title: loaderData.title, description: loaderData.blurb })
      : pageMeta({ title: "Project Not Found" }),
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
      <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-sm text-primary hover:underline">
        ← Back to projects
      </Link>
    </div>
  ),
});

function RenderSection({ section }: { section: ProjectSection }) {
  return (
    <section>
      <Eyebrow as="h2">{section.title}</Eyebrow>
      <div className="mt-3 space-y-3">
        {section.blocks.map((block, i) => {
          if (block.type === "paragraph") {
            return (
              <p key={i} className="text-sm leading-relaxed text-foreground/80">
                {block.text}
              </p>
            );
          }
          if (block.type === "link") {
            return (
              <a
                key={i}
                href={block.href}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineButton}
              >
                {block.label} <ExternalLink className="size-3" />
              </a>
            );
          }
          if (block.type === "video") {
            return (
              <div key={i} className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${block.youtubeId}`}
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            );
          }
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80 marker:text-muted-foreground/60"
            >
              {block.items.map((item, j) => (
                <li key={j}>
                  {item.label && (
                    <span className="font-semibold text-foreground">{item.label} </span>
                  )}
                  {item.detail}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
    </section>
  );
}

function ProjectDetail() {
  const project = Route.useLoaderData();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3" /> Back to projects
      </Link>
      <div className="mt-6">
        <Eyebrow>{project.tags.join(" · ")}</Eyebrow>
        <h1 className="mt-2 text-3xl font-bold text-foreground">{project.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {project.sections.map((s) => (
          <RenderSection key={s.title} section={s} />
        ))}
      </div>
    </div>
  );
}
