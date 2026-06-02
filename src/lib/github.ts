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

export type GitHubRepo = z.infer<typeof githubRepoSchema>;

/** Matches pin order on github.com/cophi-dev — see doc/github-profile.md */
export const DEFAULT_PINNED_REPO_NAMES = [
  "afa",
  "afa-minting-progress",
  "speicherpilot",
  "energie-quartier",
  "aivery",
  "cophi-portfolio",
] as const;

const pinnedGraphQlSchema = z.object({
  data: z.object({
    user: z.object({
      pinnedItems: z.object({
        nodes: z.array(
          z.object({
            databaseId: z.number(),
            name: z.string(),
            description: z.string().nullable(),
            url: z.url(),
            homepageUrl: z.string().nullable(),
            primaryLanguage: z.object({ name: z.string() }).nullable(),
            stargazerCount: z.number(),
            forkCount: z.number(),
            updatedAt: z.string(),
            pushedAt: z.string(),
            isArchived: z.boolean(),
            isFork: z.boolean(),
          }),
        ),
      }),
    }),
  }),
});

function mapGraphQlRepo(node: z.infer<typeof pinnedGraphQlSchema>["data"]["user"]["pinnedItems"]["nodes"][number]): GitHubRepo {
  return {
    id: node.databaseId,
    name: node.name,
    description: node.description,
    html_url: node.url,
    homepage: node.homepageUrl,
    language: node.primaryLanguage?.name ?? null,
    stargazers_count: node.stargazerCount,
    forks_count: node.forkCount,
    updated_at: node.updatedAt,
    pushed_at: node.pushedAt,
    archived: node.isArchived,
    fork: node.isFork,
  };
}

function githubHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "cophi-portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchPinnedReposViaGraphQL(username: string, token: string): Promise<GitHubRepo[]> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...githubHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query ($login: String!) {
          user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  databaseId
                  name
                  description
                  url
                  homepageUrl
                  primaryLanguage { name }
                  stargazerCount
                  forkCount
                  updatedAt
                  pushedAt
                  isArchived
                  isFork
                }
              }
            }
          }
        }
      `,
      variables: { login: username },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with status ${response.status}`);
  }

  const json = await response.json();

  if ("errors" in json && Array.isArray(json.errors) && json.errors.length > 0) {
    const message = json.errors.map((error: { message?: string }) => error.message ?? "Unknown error").join("; ");
    throw new Error(`GitHub GraphQL error: ${message}`);
  }

  const parsed = pinnedGraphQlSchema.parse(json);

  return parsed.data.user.pinnedItems.nodes
    .map(mapGraphQlRepo)
    .filter((repo) => !repo.archived && !repo.fork);
}

async function fetchRepoByName(username: string, repoName: string): Promise<GitHubRepo | null> {
  const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
    headers: githubHeaders(),
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`GitHub API request failed for ${repoName} with status ${response.status}`);
  }

  return githubRepoSchema.parse(await response.json());
}

async function fetchPinnedReposViaRest(
  username: string,
  repoNames: readonly string[],
): Promise<GitHubRepo[]> {
  const repos = await Promise.all(repoNames.map((name) => fetchRepoByName(username, name)));

  return repos.filter((repo): repo is GitHubRepo => repo !== null && !repo.archived && !repo.fork);
}

export async function fetchPinnedRepos(username: string, token?: string): Promise<GitHubRepo[]> {
  if (token) {
    try {
      return await fetchPinnedReposViaGraphQL(username, token);
    } catch {
      // Fall back to REST when GraphQL is unavailable or misconfigured.
    }
  }

  return fetchPinnedReposViaRest(username, DEFAULT_PINNED_REPO_NAMES);
}
