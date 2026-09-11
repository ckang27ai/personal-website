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
    school: "MIT Sloan School of Management",
    degree: "Master of Business Administration, Expected May 2027",
    location: "Cambridge, MA",
    dates: "2025 — Present",
    notes: [
      "Concentration in Entrepreneurship & Innovation; Sustainability Certificate.",
      "Coursework: Operations Strategy, Data Models & Decisions, Entrepreneurial Finance, Climate & Energy Ventures, Platform Strategy.",
      "Co-President, Sloan Sustainability Club; organizing team, MIT Clean Energy Prize.",
      "Teaching Assistant for Introduction to Operations Management (Fall 2026).",
    ],
  },
  {
    school: "Georgia Institute of Technology",
    degree: "B.S. in Industrial & Systems Engineering, Highest Honors",
    location: "Atlanta, GA",
    dates: "2016 — 2020",
    notes: [
      "Minor in Economics; GPA 3.9/4.0. President's Scholarship recipient.",
      "Undergraduate research on last-mile routing heuristics with the Supply Chain & Logistics Institute.",
    ],
  },
];

const experience = [
  {
    role: "Product Management Intern",
    company: "Verdigris Energy",
    // Optional one-line description of the company; delete this line if you don't need it.
    context: "Series B climate software · 120 employees",
    location: "Boston, MA",
    dates: "Jun 2026 — Aug 2026",
    bullets: [
      "Shipped a fleet-emissions reporting module to 14 enterprise customers, cutting the time to produce an audit-ready quarterly report from three weeks to two days.",
      "Ran 27 customer discovery interviews across logistics and facilities teams, and used the findings to kill one roadmap item and reprioritize two others.",
      "Built the pricing model for a new usage-based tier, projecting $1.4M in incremental ARR; the model was adopted for the FY27 plan.",
      "Received a full-time return offer.",
    ],
  },
  {
    role: "Operations Manager",
    company: "Northwind Logistics",
    context: "Series C freight technology · 400 employees",
    location: "Atlanta, GA",
    dates: "Jan 2023 — Jul 2025",
    bullets: [
      "Owned regional cross-dock operations moving 2,800 shipments per week across six facilities, with a team of 19.",
      "Redesigned the trailer loading sequence and dock scheduling policy, raising on-time departure from 78% to 94% within two quarters.",
      "Led the rollout of a new warehouse management system across all six sites, delivered on schedule with under four hours of unplanned downtime.",
      "Renegotiated three carrier contracts, reducing linehaul cost per mile by 11% while holding service levels flat.",
    ],
  },
  {
    role: "Supply Chain Analyst → Senior Analyst",
    company: "Bellweather Manufacturing",
    location: "Atlanta, GA",
    dates: "Jul 2020 — Dec 2022",
    bullets: [
      "Built the demand forecasting model for a 400-SKU portfolio in Python, improving forecast accuracy by 9 points and cutting safety stock by $2.3M.",
      "Automated a manual weekly S&OP reporting cycle with SQL and Tableau, saving roughly 15 analyst-hours per week.",
      "Promoted to Senior Analyst after 18 months, ahead of the standard cycle.",
    ],
  },
];

const skillGroups = [
  {
    label: "Product & Strategy",
    items: ["Customer Discovery", "Roadmapping", "Market Sizing", "Go-to-Market", "Pricing"],
  },
  {
    label: "Data & Analytics",
    items: ["Python", "SQL", "pandas", "Tableau", "Excel Modeling", "A/B Testing"],
  },
  {
    label: "Operations",
    items: [
      "S&OP",
      "Network Optimization",
      "Lean Six Sigma",
      "Supplier Negotiation",
      "Forecasting",
    ],
  },
  { label: "Tools", items: ["Figma", "Jira", "dbt", "Notion", "Git"] },
];

const certifications = [
  "Lean Six Sigma Green Belt (ASQ, 2021)",
  "Certified Supply Chain Professional, CSCP (ASCM, 2022)",
  "Google Project Management Certificate (2023)",
];

const interests = [
  "Long-distance running; finished the 2026 Boston Marathon in 3:41.",
  "Carnatic violin, which I have played since I was seven and still practice badly.",
  "Volunteer route planner for a Cambridge food rescue nonprofit.",
  "Perpetually attempting to keep a sourdough starter alive.",
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
