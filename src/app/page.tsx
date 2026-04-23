import { getPortfolioConfig } from "@/lib/config";
import { fetchFeaturedRepos } from "@/lib/github";
import type { GitHubRepo } from "@/lib/github";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export default async function Home() {
  const config = getPortfolioConfig();

  let reposError: string | null = null;
  let repos: GitHubRepo[] = [];

  try {
    repos = await fetchFeaturedRepos(config.GITHUB_USERNAME, config.GITHUB_REPOS_LIMIT);
  } catch (error) {
    reposError = error instanceof Error ? error.message : "Failed to load GitHub repositories.";
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Developer Portfolio</p>
        <h1>Philipp</h1>
        <p className="subtitle">
          I build products, prototypes, and coding projects. This page highlights my latest work from GitHub.
        </p>
        <div className="links">
          <a href={`https://github.com/${config.GITHUB_USERNAME}`} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`https://x.com/${config.X_USERNAME}`} target="_blank" rel="noreferrer">
            X
          </a>
        </div>
      </section>

      <section className="projects">
        <div className="projects-header">
          <h2>Featured Projects</h2>
          <span>{config.GITHUB_USERNAME}</span>
        </div>

        {reposError ? (
          <p className="error">Could not load projects: {reposError}</p>
        ) : (
          <div className="grid">
            {repos.map((repo) => (
              <article className="card" key={repo.id}>
                <h3>
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
                    {repo.name}
                  </a>
                </h3>
                <p>{repo.description ?? "No description provided."}</p>
                <div className="meta">
                  <span>{repo.language ?? "Unknown"}</span>
                  <span>{repo.stargazers_count} stars</span>
                  <span>{repo.forks_count} forks</span>
                  <span>Updated {formatDate(repo.pushed_at)}</span>
                </div>
                {repo.homepage ? (
                  <a className="demo-link" href={repo.homepage} target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
