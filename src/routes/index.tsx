import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow } from "@/components/Eyebrow";
import { outlineButton, primaryButton } from "@/lib/buttons";
import { SITE_NAME } from "@/lib/site";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import headshot from "@/assets/headshot.webp";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const emailHref = "mailto:you@example.com";

// Links shown under "Connect". Icons come from lucide-react (https://lucide.dev/icons).
const contacts = [
  { icon: Mail, label: "Email", href: emailHref, external: false },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-profile/",
    external: true,
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-20 sm:grid-cols-2 sm:items-center sm:py-28">
        <div>
          <Eyebrow>Hello, I'm</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {SITE_NAME}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            I'm a student at Your University studying Computer Science and Business. I like building
            products that solve real problems, and this site is where I share my projects,
            experience, and what I'm learning. Replace this paragraph with a short introduction
            about yourself.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/projects" className={primaryButton}>
              See my work <ArrowRight className="size-4" />
            </Link>
            <a href={emailHref} className={outlineButton}>
              Get in touch
            </a>
          </div>
        </div>
        {/* Headshot */}
        <div className="flex justify-center sm:justify-end">
          <img
            src={headshot}
            alt={SITE_NAME}
            width={256}
            height={256}
            className="size-56 rounded-full object-cover shadow-sm sm:size-64"
          />
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-border/60">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <Eyebrow>Connect</Eyebrow>
          <div className="mt-5 flex flex-wrap gap-3">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external && { target: "_blank", rel: "noopener noreferrer" })}
                className={outlineButton}
              >
                <c.icon className="size-4" /> {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
