# WakilKita

Independent dashboard-first civic nomination and issue intake for P105 Petaling Jaya.

WakilKita is not online voting, not SPR-affiliated, and not a political party platform. Residents can submit local nominations, endorsements, profile claims, and local issue priorities into a review dashboard before anything public appears.

## What it does

- Residents submit a name, public role, endorsement, profile claim, or local issue through the in-platform intake form.
- The submission appears immediately in `/dashboard` for review state, risk flags, and operator follow-up.
- Nothing is published automatically — submissions are manually reviewed first.
- Named people need consent or claim review before any public profile is considered.
- No IC/eKYC data is collected through the public nomination form.
- No public supporter lists, live counts, or aggregate results in the current phase.

## Product guardrails

- Do not call it official voting.
- Do not expose individual political preference.
- Do not collect IC/eKYC data until privacy, verification, deletion, and retention rules are published.
- Separate identity records from support records.
- Keep dispute and takedown handling in scope from the start.
- Treat the current dashboard as a review queue, not a public leaderboard.

## Development

```bash
bun install
bun run dev
bun run lint
bun run build
npx impeccable detect --fast src/app/page.tsx src/app/WakilKitaActionPanel.tsx src/app/dashboard/page.tsx src/app/globals.css
```

## Design context

See `.impeccable.md` for the civic trust and better-wow design brief.
See `docs/plans/2026-05-19-wakilkita-better-wow-impeccable-plan.md` for the current visual direction.
