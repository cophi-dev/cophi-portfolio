import { z } from "zod";
import type { GitHubRepo } from "@/lib/github";

const screenshotSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
});

const projectOverlaySchema = z.object({
  repoName: z.string().min(1),
  summary: z.string().min(1),
  stack: z.array(z.string().min(1)).optional(),
  outcome: z.string().min(1).optional(),
  screenshot: screenshotSchema.optional(),
});

export type ProjectOverlay = z.infer<typeof projectOverlaySchema>;

export type ProjectScreenshot = z.infer<typeof screenshotSchema>;

export type ProjectDisplay = {
  repo: GitHubRepo;
  summary: string;
  stack: string[];
  outcome?: string;
  screenshot: ProjectScreenshot;
};

const DEFAULT_SCREENSHOT: ProjectScreenshot = {
  src: "/projects/placeholder.svg",
  alt: "Project screenshot placeholder",
};

/**
 * Per-repo copy and assets. Add entries when you want richer text or real screenshots.
 *
 * @example
 * {
 *   repoName: "my-app",
 *   summary: "What it is and why. Stack and what you learned.",
 *   stack: ["TypeScript", "Next.js"],
 *   outcome: "Shipped X; learned Y.",
 *   screenshot: { src: "/projects/my-app.png", alt: "My App dashboard" },
 * }
 */
const projectOverlays: ProjectOverlay[] = projectOverlaySchema.array().parse([]);

const overlayByRepo = new Map(projectOverlays.map((entry) => [entry.repoName, entry]));

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

export function getProjectDisplay(repo: GitHubRepo): ProjectDisplay {
  const overlay = overlayByRepo.get(repo.name);

  return {
    repo,
    summary: overlay?.summary ?? buildDefaultSummary(repo),
    stack: overlay?.stack ?? (repo.language ? [repo.language] : []),
    outcome: overlay?.outcome,
    screenshot: screenshotFor(repo, overlay),
  };
}
