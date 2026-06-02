# GitHub repository renames

Slugs are aligned with product names and `package.json` where applicable.

| Old slug | New slug | Card title |
|----------|----------|------------|
| `portfolio` | `cophi-portfolio` | Cophi Portfolio |
| `afa-mint-progress` | `afa-minting-progress` | AFA Minting Progress |
| `EnergieQuartier` | `energie-quartier` | EnergieQuartier |
| `besorge` | `speicherpilot` | SpeicherPilot |
| `bess` | `bess-kompass` | BESS Kompass |
| `nano-bayc` | *(unchanged)* | Nano BAYC |

## Run renames on GitHub

```bash
gh auth login
chmod +x scripts/rename-github-repos.sh
./scripts/rename-github-repos.sh
```

GitHub redirects old URLs to the new slug automatically.

## After renaming

1. **This portfolio clone:** `git remote set-url origin https://github.com/cophi-dev/cophi-portfolio.git`
2. **Vercel:** each project → Settings → Git → reconnect the renamed repository.
3. **Homepage fields** on GitHub (repo About → Website): point to the live Vercel URL if needed.

Overlays in `src/lib/projects.ts` use the **new** slugs. Legacy slugs are aliased until GitHub reflects the rename.
