import Image from "next/image";
import type { ProjectDisplay } from "@/lib/projects";

type ProjectCardProps = {
  project: ProjectDisplay;
  formatDate: (value: string) => string;
};

export function ProjectCard({ project, formatDate }: ProjectCardProps) {
  const { repo, title, summary, stack, outcome, screenshot } = project;

  return (
    <article className="card">
      <div className="card-media">
        {repo.homepage ? (
          <a className="card-media-link" href={repo.homepage} target="_blank" rel="noreferrer">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={800}
              height={450}
              className="card-screenshot"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </a>
        ) : (
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            width={800}
            height={450}
            className="card-screenshot"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        )}
      </div>
      <h3>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {title}
        </a>
      </h3>
      <p className="card-summary">{summary}</p>
      {outcome ? <p className="card-outcome">{outcome}</p> : null}
      <div className="meta">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
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
  );
}
