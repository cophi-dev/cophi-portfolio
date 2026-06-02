import { z } from "zod";
import type { GitHubRepo } from "@/lib/github";

const screenshotSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
});

const projectOverlaySchema = z.object({
  repoName: z.string().min(1),
  title: z.string().min(1).optional(),
  summary: z.string().min(1),
  stack: z.array(z.string().min(1)).optional(),
  outcome: z.string().min(1).optional(),
  screenshot: screenshotSchema.optional(),
});

export type ProjectOverlay = z.infer<typeof projectOverlaySchema>;

export type ProjectScreenshot = z.infer<typeof screenshotSchema>;

export type ProjectDisplay = {
  repo: GitHubRepo;
  title: string;
  summary: string;
  stack: string[];
  outcome?: string;
  screenshot: ProjectScreenshot;
};

/** Maps legacy GitHub slugs to canonical names after rename (see doc/github-rename.md). */
const REPO_NAME_ALIASES: Record<string, string> = {
  portfolio: "cophi-portfolio",
  "afa-mint-progress": "afa-minting-progress",
  EnergieQuartier: "energie-quartier",
  besorge: "speicherpilot",
  bess: "bess-kompass",
};

const DEFAULT_SCREENSHOT: ProjectScreenshot = {
  src: "/projects/placeholder.svg",
  alt: "Project screenshot placeholder",
};

/**
 * Per-repo copy and assets. Keyed by canonical repository slug (post-rename).
 */
const projectOverlays: ProjectOverlay[] = projectOverlaySchema.array().parse([
  {
    repoName: "cophi-portfolio",
    title: "Cophi Portfolio",
    summary:
      "This site — a calm Next.js portfolio that pulls featured repos from GitHub and layers in hand-written context, stack tags, and screenshots. Built to stay minimal while still explaining what each project is for.",
    stack: ["TypeScript", "Next.js", "Zod"],
    outcome: "Dogfoods the same overlay pattern the other cards use.",
    screenshot: {
      src: "/projects/cophi-portfolio.png",
      alt: "Cophi portfolio homepage with featured project grid",
    },
  },
  {
    repoName: "afa",
    title: "AFA Editor",
    summary:
      "Studio for composing ApeFacingApe portraits: pick a BAYC token, mix trait layers (outfit, hat, eyes, sets), preview the render, and verify mint status before claiming on apefacingapes.com. Flask compositing API plus React UI, with OG previews for social sharing.",
    stack: ["React", "Flask", "ethers.js", "Vercel"],
    outcome: "Hub for the AFA mint flow — pairs with the mint-progress grid and Nano BAYC export tool.",
    screenshot: {
      src: "/projects/afa.png",
      alt: "AFA Editor trait studio with live composite preview and mint gallery",
    },
  },
  {
    repoName: "afa-minting-progress",
    title: "AFA Minting Progress",
    summary:
      "A live mosaic of all 10,000 BAYC tokens showing which Apes still need an ApeFacingApe (AFA) mint. Mint status syncs from chain data; you can shuffle the grid, open controls, and jump straight to claim an unminted AFA.",
    stack: ["React", "ethers.js", "Material UI"],
    outcome: "Community tool to track AFA minting progress across the collection.",
    screenshot: {
      src: "/projects/afa-minting-progress.png",
      alt: "AFA Minting Progress grid highlighting minted and unminted BAYC apes",
    },
  },
  {
    repoName: "energie-quartier",
    title: "EnergieQuartier",
    summary:
      "Web app for quick decentralized-energy concept studies (PV, heat pump, battery, solar thermal). A five-step wizard feeds a dashboard with Sankey flows, KPIs, charts, and PDF export — projects persist in the browser via Zustand.",
    stack: ["Next.js 15", "TypeScript", "Tailwind", "Recharts", "Zod"],
    outcome: "Demo MFH project shows amortization, autarky, and CO₂ savings in one report.",
    screenshot: {
      src: "/projects/energie-quartier-dashboard.png",
      alt: "EnergieQuartier dashboard with Sankey, KPI cards, and technology mix for a demo building",
    },
  },
  {
    repoName: "speicherpilot",
    title: "SpeicherPilot",
    summary:
      "Germany-focused BESS planning demo: live generation/load snapshot, fleet SoC bands, and methodology for how storage shifts the daily balance. Includes Megapack-style sizing, indicative DE-market economics, site map markers, and PDF proposals aligned to a sales-engineer workflow.",
    stack: ["Next.js", "TypeScript", "Leaflet", "Recharts", "Zod"],
    outcome: "Portfolio piece mapping Tesla-style BESS pre-sales tools to the German market.",
    screenshot: {
      src: "/projects/speicherpilot.png",
      alt: "SpeicherPilot live snapshot with generation, load, net position, and BESS status",
    },
  },
  {
    repoName: "bess-kompass",
    title: "BESS Kompass",
    summary:
      "OpenAutobidder-DE explores Megapack-class battery revenue stacking in Germany — day-ahead arbitrage plus simplified FCR, aFRR, and congestion signals. The public BESS Kompass site explains the market; the Python/Streamlit core runs optimization on sample or ENTSO-E data.",
    stack: ["Python", "PuLP", "Streamlit", "Next.js"],
    outcome: "Runnable with bundled sample data; live ENTSO-E when an API token is set.",
    screenshot: {
      src: "/projects/bess-kompass.png",
      alt: "BESS Kompass landing page on revenue stacking in the German power market",
    },
  },
  {
    repoName: "nano-bayc",
    title: "Nano BAYC",
    summary:
      "Minimal BAYC portrait generator: pick an ape number, export square, X header, or post sizes, and see AFA mint status with a link to claim. Built as a small utility for the ApeFacingApe community.",
    stack: ["React", "JavaScript"],
    outcome: "Pairs with AFA mint progress — idea by @F1reDragon_, built by Cophi.",
    screenshot: {
      src: "/projects/nano-bayc.png",
      alt: "Nano BAYC generator with token ID input and export format selector",
    },
  },
  {
    repoName: "aivery",
    title: "Aivery",
    summary:
      "Training app that syncs with Strava and adds calm, AI-generated workout insights — daily summaries, post-workout notes, and dashboard prompts without noisy UX. Next.js, MongoDB, Stripe, and model calls behind a typed service layer.",
    stack: ["Next.js", "MongoDB", "Strava API", "OpenAI"],
    outcome: "Production-style fitness product focused on consistency and mindful feedback.",
    screenshot: {
      src: "/projects/aivery.png",
      alt: "Aivery landing page — Strava-connected training with calm AI insights",
    },
  },
  {
    repoName: "v0-cophi-website-design",
    title: "Cophi Agency",
    summary:
      "Bilingual agency site (DE/EN) for services, selected projects, pricing, and contact — minimal typography and layout. Built with Next.js and Tailwind; initial design flow via v0, deployed on Vercel.",
    stack: ["Next.js", "Tailwind", "shadcn/ui"],
    outcome: "Public face for client work alongside the developer portfolio.",
    screenshot: {
      src: "/projects/cophi-agency.png",
      alt: "Cophi agency homepage — digital experiences hero",
    },
  },
]);

const overlayByRepo = new Map(projectOverlays.map((entry) => [entry.repoName, entry]));

export function canonicalRepoName(name: string): string {
  return REPO_NAME_ALIASES[name] ?? name;
}

function buildDefaultSummary(repo: GitHubRepo): string {
  const intro = repo.description
    ? repo.description.endsWith(".")
      ? repo.description
      : `${repo.description}.`
    : `${repo.name} is a repo I maintain to explore an idea in the open.`;

  const tech = repo.language
    ? ` Most of the implementation is in ${repo.language}, with details in the source.`
    : " The implementation lives in the repository for anyone curious about structure and tradeoffs.";

  const demo = repo.homepage
    ? " A live demo is linked below when you want to see it running."
    : " There is no public demo yet; the README and code are the best entry points.";

  return `${intro}${tech}${demo}`;
}

function screenshotFor(repo: GitHubRepo, overlay?: ProjectOverlay): ProjectScreenshot {
  if (overlay?.screenshot) {
    return overlay.screenshot;
  }

  return {
    src: DEFAULT_SCREENSHOT.src,
    alt: `${repo.name} — screenshot placeholder`,
  };
}

function titleFor(repo: GitHubRepo, overlay?: ProjectOverlay): string {
  if (overlay?.title) {
    return overlay.title;
  }
  return repo.name;
}

export function getProjectDisplay(repo: GitHubRepo): ProjectDisplay {
  const overlay = overlayByRepo.get(canonicalRepoName(repo.name));

  return {
    repo,
    title: titleFor(repo, overlay),
    summary: overlay?.summary ?? buildDefaultSummary(repo),
    stack: overlay?.stack ?? (repo.language ? [repo.language] : []),
    outcome: overlay?.outcome,
    screenshot: screenshotFor(repo, overlay),
  };
}
