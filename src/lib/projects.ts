// Each project gets a card on /projects and its own page at /projects/<slug>.
// A project page is a list of sections, and each section is a list of blocks:
//   paragraph — a paragraph of text
//   list      — bullet points, each with an optional bold label
//   video     — an embedded YouTube video (the ID from youtube.com/watch?v=<ID>)
//   link      — a button linking to a live site, repo, or document
export type SectionBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { label?: string; detail: string }[] }
  | { type: "video"; youtubeId: string }
  | { type: "link"; label: string; href: string };

export type ProjectSection = {
  title: string;
  blocks: SectionBlock[];
};

type Project = {
  slug: string; // used in the URL: lowercase words separated by dashes
  title: string;
  blurb: string; // one sentence, shown on the card and in link previews
  tags: string[];
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "ai-study-assistant",
    title: "Sample Project: AI Study Assistant",
    blurb:
      "A web app that turns lecture notes into flashcards and practice quizzes. Replace this with a one-sentence summary of your project.",
    tags: ["AI", "Education", "Web App"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "Describe what you built in two or three sentences. What does it do, and who is it for? This sample shows every kind of block a project page supports, so copy it and replace the text with your own.",
          },
        ],
      },
      {
        title: "Why I Built This",
        blocks: [
          {
            type: "paragraph",
            text: "Explain the problem or moment that sparked the project. A short personal story makes a project memorable, like a frustration you had or a conversation with someone who had the problem.",
          },
        ],
      },
      {
        title: "Approach",
        blocks: [
          {
            type: "paragraph",
            text: "Walk through how it works. Lists with bold labels are a good way to break down the main parts:",
          },
          {
            type: "list",
            items: [
              {
                label: "Note upload:",
                detail: "Students upload lecture notes as PDFs or paste in text.",
              },
              {
                label: "Flashcard generation:",
                detail: "An LLM extracts key concepts and writes question-and-answer cards.",
              },
              {
                label: "Practice quizzes:",
                detail: "Cards are mixed into timed quizzes that focus on the ones you miss.",
              },
              {
                label: "Tech Stack:",
                detail: "React, TypeScript, Python, an LLM API, Vercel",
              },
            ],
          },
        ],
      },
      // To embed a demo video, add a section like this with your video's YouTube ID:
      // { title: "Demo", blocks: [{ type: "video", youtubeId: "YOUR_VIDEO_ID" }] },
      {
        title: "Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Share results and what you learned: how many people used it, feedback you got, metrics, or what you'd do differently next time.",
          },
        ],
      },
      {
        title: "Links",
        blocks: [
          {
            type: "link",
            label: "View on GitHub",
            href: "https://github.com/your-username/your-project",
          },
        ],
      },
    ],
  },
  {
    slug: "campus-events-map",
    title: "Sample Project: Campus Events Map",
    blurb: "A map of what's happening on campus this week, built with a student club.",
    tags: ["Mobile", "Community"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "A second sample project. Projects appear on the Projects page in the order they're listed in src/lib/projects.ts.",
          },
        ],
      },
      {
        title: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Campus events were scattered across emails, flyers, and group chats, so students missed things they would have enjoyed.",
          },
        ],
      },
      {
        title: "Approach",
        blocks: [
          {
            type: "list",
            items: [
              { detail: "List items don't need a bold label." },
              { detail: "Use whichever style reads best for your project." },
            ],
          },
        ],
      },
      {
        title: "Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Delete these sample projects once you've added your own.",
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
