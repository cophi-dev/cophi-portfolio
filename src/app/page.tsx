import { ProjectCard } from "@/components/project-card";
import { getPortfolioConfig } from "@/lib/config";
import { fetchPinnedRepos } from "@/lib/github";
import { getProjectDisplay } from "@/lib/projects";
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
    repos = await fetchPinnedRepos(config.GITHUB_USERNAME, config.GITHUB_TOKEN);
  } catch (error) {
    reposError = error instanceof Error ? error.message : "Failed to load GitHub repositories.";
  }

  const projects = repos.map(getProjectDisplay);

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Developer portfolio</p>
        <h1>Cophi</h1>
        <p className="subtitle">
          I build calm, useful software — products, prototypes, and experiments. This page highlights
          pinned GitHub projects with a bit more context than the repo blurbs alone.
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
          <h2>Featured projects</h2>
          <span>{config.GITHUB_USERNAME}</span>
        </div>

        {reposError ? (
          <p className="error">Could not load projects: {reposError}</p>
        ) : (
          <div className="grid">
            {projects.map((project) => (
              <ProjectCard key={project.repo.id} project={project} formatDate={formatDate} />
            ))}
          </div>
        )}
      </section>

      <footer className="site-footer">
        <p>Cophi — built with Next.js and GitHub.</p>
      </footer>
    </main>
  );
}
