# GitHub profile checklist

Profile README: **[github.com/cophi-dev/cophi-dev](https://github.com/cophi-dev/cophi-dev)** (repo `cophi-dev/cophi-dev`).

## Suggested pinned repositories

GitHub → profile → **Customize your pins** (max 6):

1. `cophi-portfolio`
2. `speicherpilot`
3. `bess-kompass`
4. `energie-quartier`
5. `afa`
6. `afa-minting-progress`

## Profile fields (set manually if API token lacks `user` scope)

| Field | Suggested value |
|-------|-----------------|
| **Bio** | Calm software — energy, BESS, fitness AI, and web3 tools. TypeScript & Python. |
| **URL** | https://portfolio-delta-liart-93.vercel.app |
| **Location** | Europe |
| **X** | @cophi |

## Private repos

`aivery` and `v0-cophi-website-design` are **private** — they do not appear in the public GitHub API feed this portfolio uses. To show them on the site, either make them public or add a `GITHUB_TOKEN` with `repo` scope (future enhancement).

## Live demo URLs to fix

| Repo | Current homepage | Note |
|------|------------------|------|
| `speicherpilot` | `besorge.vercel.app` | Often 404 — update to working Vercel URL in repo **About → Website** |
| `aivery` | `aivery.app` | DNS did not resolve — point domain or update homepage to Vercel URL |

## Re-run repo descriptions

```bash
./scripts/rename-github-repos.sh   # idempotent for renamed slugs
```
