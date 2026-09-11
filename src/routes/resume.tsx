import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow } from "@/components/Eyebrow";
import { Pill } from "@/components/Pill";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: pageMeta({ title: "Resume" }),
  }),
  component: ResumePage,
});

// Everything on the resume page comes from the lists below. Add, remove, or reorder entries
// freely; the page layout updates automatically.

const education = [
  {
    school: "Your University",
    degree: "Bachelor of Science in Computer Science, Expected May 2027",
    location: "City, State",
    dates: "2023 — Present",
    notes: [
      "Relevant coursework: Data Structures, Machine Learning, Product Management, Statistics.",
      "Activities: Entrepreneurship Club (Treasurer), Hackathon Organizing Team.",
    ],
  },
  {
    school: "Previous School",
    degree: "High School Diploma or Previous Degree",
    location: "City, State",
    dates: "2019 — 2023",
    notes: ["An honor, award, or activity you're proud of."],
  },
];

const experience = [
  {
    role: "Product Intern",
    company: "Example Company",
    // Optional one-line description of the company; delete this line if you don't need it.
    context: "Series A startup · 50 employees",
    location: "San Francisco, CA",
    dates: "Jun 2026 — Aug 2026",
    bullets: [
      'Start each bullet with a strong verb and end with a result, e.g. "Launched a signup flow redesign that raised conversion by 15%."',
      "Quantify impact where you can: users reached, time saved, revenue, or accuracy improved.",
      "Keep it to 3–5 bullets per role, focusing on what you owned and what changed because of it.",
    ],
  },
  {
    role: "Research Assistant",
    company: "Your University Lab",
    location: "City, State",
    dates: "Sep 2024 — May 2026",
    bullets: [
      "Built a data pipeline in Python to clean and analyze 10,000+ survey responses.",
      "Presented findings to faculty and co-authored a paper submitted to a student research conference.",
    ],
  },
];

const skillGroups = [
  { label: "Programming", items: ["Python", "TypeScript", "SQL"] },
  { label: "Tools", items: ["GitHub", "Figma", "Notion"] },
  { label: "Data & AI", items: ["Pandas", "Machine Learning", "LLM APIs"] },
];

const certifications = ["Example Certification (Issuer, Year)"];

const interests = [
  "A hobby or interest that shows your personality.",
  "Another interest, like a sport, music, volunteering, or a team you follow.",
];

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border/60 pt-10">
      <Eyebrow as="h2">{label}</Eyebrow>
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  );
}

function EntryHeader({
  title,
  subtitle,
  dates,
}: {
  title: string;
  subtitle?: string;
  dates: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className="text-base font-semibold text-foreground">
        {title}
        {subtitle && (
          <>
            <span className="text-muted-foreground"> · </span>
            <span className="font-normal text-muted-foreground">{subtitle}</span>
          </>
        )}
      </h3>
      <span className="shrink-0 text-sm text-muted-foreground">{dates}</span>
    </div>
  );
}

function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">Resume</h1>

      <div className="mt-16 space-y-12">
        {/* Education */}
        <Section label="Education">
          {education.map((e) => (
            <div key={e.school}>
              <EntryHeader title={e.school} dates={e.dates} />
              <p className="mt-1 text-sm text-muted-foreground">
                {e.degree} · {e.location}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80 marker:text-muted-foreground/60">
                {e.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Experience */}
        <Section label="Experience">
          {experience.map((e) => (
            <div key={e.role + e.company}>
              <EntryHeader title={e.role} subtitle={e.company} dates={e.dates} />
              <p className="mt-1 text-sm text-muted-foreground">
                {e.context ? `${e.context} · ${e.location}` : e.location}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80 marker:text-muted-foreground/60">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Skills */}
        <Section label="Skills">
          <div className="space-y-6">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <p className="text-sm font-semibold text-foreground">{g.label}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <Pill key={i}>{i}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section label="Certifications & Interests">
          <div>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/80 marker:text-muted-foreground/60">
              {[...certifications, ...interests].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>
      </div>
    </div>
  );
}
