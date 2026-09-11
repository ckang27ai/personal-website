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
    slug: "gridpath",
    title: "GridPath: Fleet Electrification Planner",
    blurb:
      "A planning tool that models the cost, timeline, and grid constraints of converting a mid-size delivery fleet to electric vehicles.",
    tags: ["Climate Tech", "Product", "Analytics"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "GridPath takes a fleet's existing routes, depot locations, and duty cycles, and returns a year-by-year electrification plan: which vehicles to convert first, how many chargers each depot needs, what the utility interconnection will cost, and when the whole thing turns cash-flow positive. I built it as my project for Climate & Energy Ventures and have since handed it to two fleet operators to pilot.",
          },
        ],
      },
      {
        title: "Why I Built This",
        blocks: [
          {
            type: "paragraph",
            text: "At Northwind I sat through a dozen meetings about electrifying our last-mile vans. Every one of them stalled at the same place: nobody could say what it would actually cost, because the answer depended on depot power capacity, and getting that number meant a six-week study from the utility. Fleets were making million-dollar decisions on the basis of a vendor's spreadsheet. I wanted to see whether a decent first-pass answer could be produced in an afternoon instead.",
          },
        ],
      },
      {
        title: "Approach",
        blocks: [
          {
            type: "paragraph",
            text: "The tool is deliberately opinionated: it prefers a defensible estimate now over a precise one in six weeks.",
          },
          {
            type: "list",
            items: [
              {
                label: "Route ingestion:",
                detail:
                  "Operators upload telematics exports; the model derives daily mileage distributions and dwell windows per vehicle.",
              },
              {
                label: "Feasibility screen:",
                detail:
                  "Each vehicle is matched against a catalog of available electric models, filtering on range headroom under winter derating.",
              },
              {
                label: "Charging design:",
                detail:
                  "A scheduling solver packs charging into depot dwell time, minimizing peak demand rather than charger count, because demand charges dominate the operating bill.",
              },
              {
                label: "Financial model:",
                detail:
                  "Fifteen-year TCO with incentive stacking, residual value, and a sensitivity sweep over electricity and diesel prices.",
              },
              {
                label: "Tech stack:",
                detail:
                  "Python, pandas, Pyomo for the scheduling solve, Streamlit, and PostgreSQL.",
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
            text: "Two regional fleets ran their real route data through it. For one, GridPath found that staging the conversion depot-by-depot instead of all at once avoided a $600K service upgrade and pulled breakeven forward by roughly two years. The bigger lesson was less flattering: my first version optimized for the lowest charger count, which is exactly the wrong objective once demand charges are priced in. Talking to an actual facilities manager corrected in ten minutes what I had reasoned my way into over three weeks.",
          },
        ],
      },
      {
        title: "Links",
        blocks: [
          {
            type: "link",
            label: "View on GitHub",
            href: "https://github.com/priyavenkatesan/gridpath",
          },
        ],
      },
    ],
  },
  {
    slug: "food-rescue-routing",
    title: "Route Optimization for a Food Rescue Nonprofit",
    blurb:
      "A volunteer-friendly routing system that helped a Cambridge food rescue move 40% more donations per driver-hour.",
    tags: ["Operations", "Social Impact", "Python"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "A Cambridge nonprofit collects surplus food from grocers and restaurants and delivers it to shelters the same evening. Routes were assigned by hand each afternoon by one very patient coordinator working from memory. I built a routing tool that produces the daily assignments in about a minute, and — more importantly — that a rotating cast of volunteers can actually operate.",
          },
        ],
      },
      {
        title: "Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The hard constraint was not distance. It was that donation volumes are unknown until pickup, drivers are volunteers with narrow availability windows, and perishable loads have a hard drop-off deadline. A textbook vehicle routing solution assumes none of that.",
          },
        ],
      },
      {
        title: "Approach",
        blocks: [
          {
            type: "list",
            items: [
              {
                label: "Capacity as a distribution:",
                detail:
                  "Pickup sizes are modeled from historical variance rather than point estimates, so routes stay feasible when a grocer donates twice what was expected.",
              },
              {
                label: "Volunteer-first constraints:",
                detail:
                  "Availability windows and vehicle size are hard constraints; total distance is only the tiebreaker.",
              },
              {
                label: "Graceful degradation:",
                detail:
                  "If the solver cannot fit every pickup, it drops the lowest-perishability stops and flags them, instead of failing.",
              },
              {
                detail:
                  "The output is a printed sheet and a text message, not a dashboard. Volunteers were never going to log into anything.",
              },
              {
                label: "Tech stack:",
                detail:
                  "Python, OR-Tools, OpenRouteService, Twilio, and a Google Sheet as the admin interface.",
              },
            ],
          },
        ],
      },
      {
        title: "Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Donations moved per driver-hour rose about 40% over the first three months, and the coordinator got roughly six hours a week back. I still volunteer as their route planner, which mostly means I am the one who gets called when the solver produces something absurd.",
          },
        ],
      },
    ],
  },
  {
    slug: "bid-signal",
    title: "Bid Signal: Course Bidding Analytics",
    blurb:
      "A small side project that predicts MIT Sloan course clearing prices, built after I badly overbid in my first semester.",
    tags: ["Analytics", "Side Project"],
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "Sloan allocates seats in oversubscribed classes through a bidding system. Bid Signal scrapes the published clearing prices from past semesters and estimates what a given class is likely to clear at, with an interval rather than a single number.",
          },
        ],
      },
      {
        title: "Why I Built This",
        blocks: [
          {
            type: "paragraph",
            text: "I spent an embarrassing share of my first-semester points on a class that would have cleared for a fraction of what I bid. This was cheaper than therapy.",
          },
        ],
      },
      {
        title: "Approach",
        blocks: [
          {
            type: "list",
            items: [
              {
                label: "Data:",
                detail:
                  "Eight semesters of published clearing prices, joined to enrollment caps and instructor history.",
              },
              {
                label: "Model:",
                detail:
                  "Quantile regression, because what a bidder actually needs is the 80th percentile outcome, not the mean.",
              },
              {
                label: "Honesty about limits:",
                detail:
                  "New electives and new instructors have no history, and the tool says so rather than inventing a confident number.",
              },
            ],
          },
        ],
      },
      {
        title: "Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Roughly 200 classmates used it during the last bidding round. Predictions landed within the stated interval about 85% of the time. The failures were concentrated exactly where I expected: brand-new courses, where the honest answer is that nobody knows.",
          },
        ],
      },
      {
        title: "Links",
        blocks: [
          {
            type: "link",
            label: "View on GitHub",
            href: "https://github.com/priyavenkatesan/bid-signal",
          },
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
