# Cophi portfolio

Minimal Next.js + TypeScript portfolio for **Cophi** — featured GitHub projects with expanded copy, screenshots, and a link to X.

Project overlays and screenshot conventions: see [doc/projects.md](doc/projects.md).

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

- `GITHUB_USERNAME`: GitHub account to fetch repositories from
- `GITHUB_REPOS_LIMIT`: Max number of repositories to show (1-24)
- `X_USERNAME`: X handle used for profile link

## Deploy on Vercel (via GitHub)

1. Push this repo to GitHub.
2. Import the repository in Vercel.
3. Add environment variables from `.env.example` in Vercel project settings.
4. Deploy.
