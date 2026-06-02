import { z } from "zod";

const githubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  html_url: z.url(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  updated_at: z.string(),
  pushed_at: z.string(),
  archived: z.boolean(),
  fork: z.boolean(),
});

const githubRepoListSchema = z.array(githubRepoSchema);

export type GitHubRepo = z.infer<typeof githubRepoSchema>;

export async function fetchFeaturedRepos(username: string, limit: number): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "cophi-portfolio",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with status ${response.status}`);
  }

  const json = await response.json();
  const repos = githubRepoListSchema.parse(json);

  return repos
    .filter((repo) => !repo.archived && !repo.fork)
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, limit);
}
