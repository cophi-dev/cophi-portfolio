#!/usr/bin/env bash
# Renames cophi-dev repositories to kebab-case slugs that match product names.
# Requires: gh auth login (once)
set -euo pipefail

OWNER="cophi-dev"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh && gh auth login"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Run: gh auth login"
  exit 1
fi

rename_repo() {
  local old="$1"
  local new="$2"
  local description="$3"
  echo "Renaming ${OWNER}/${old} -> ${new}"
  gh api -X PATCH "repos/${OWNER}/${old}" -f name="${new}" -f description="${description}" >/dev/null
  echo "  OK: https://github.com/${OWNER}/${new}"
}

# Order: no slug collisions
rename_repo "portfolio" "cophi-portfolio" "Calm Next.js portfolio for Cophi — GitHub projects with context and screenshots."
rename_repo "afa-mint-progress" "afa-minting-progress" "Live BAYC mosaic tracking ApeFacingApe (AFA) minting progress across 10,000 apes."
rename_repo "EnergieQuartier" "energie-quartier" "Konzeptstudien für dezentrale Energie — PV, Wärmepumpe, Speicher, Sankey & PDF."
rename_repo "besorge" "speicherpilot" "SpeicherPilot — BESS planning, Germany live grid briefing, Megapack sizing & PDF proposals."
rename_repo "bess" "bess-kompass" "BESS Kompass & OpenAutobidder-DE — revenue stacking for German battery storage."

gh api -X PATCH "repos/${OWNER}/nano-bayc" \
  -f description="Nano BAYC — minimal portrait generator and AFA mint status checker for the BAYC community." \
  >/dev/null
echo "Updated description for nano-bayc (name unchanged)"

echo ""
echo "Done. Next steps:"
echo "  1. In this repo: git remote set-url origin https://github.com/${OWNER}/cophi-portfolio.git"
echo "  2. Vercel: reconnect each project to the renamed GitHub repo (Settings → Git)."
echo "  3. Update GitHub repo homepage URLs if demos moved (optional)."
