# WakilKita

Independent private civic intake for P105 Petaling Jaya.

WakilKita is not online voting, not SPR-affiliated, and not a political party platform. Residents can submit local nominations, profile corrections or removal requests, and local issue priorities for manual review via email draft.

## What it does

- Residents submit a name, public role, or local issue to a private email-based intake.
- Nothing is published automatically — submissions are manually reviewed first.
- Named people are contacted before any public profile is considered. They can request correction or removal.
- No IC/eKYC data is collected through this page.
- No public supporter lists, live counts, or aggregate results in the current phase.

## Product guardrails

- Do not call it official voting.
- Do not expose individual political preference.
- Do not collect IC/eKYC data until privacy, verification, deletion, and retention rules are published.
- Separate identity records from support records.
- Keep dispute and takedown handling in scope from the start.

## Development

```bash
bun install
bun run dev
bun run lint
bun run build
npx impeccable detect --fast src/app/page.tsx src/app/WakilKitaActionPanel.tsx src/app/globals.css
```

## Design context

See `.impeccable.md` for the civic trust and better-wow design brief.
See `docs/plans/2026-05-19-wakilkita-better-wow-impeccable-plan.md` for the current visual direction.
