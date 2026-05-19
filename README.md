# WakilKita

Non-binding civic preference signal MVP.

WakilKita is not online voting, not SPR, and not a political party platform. It is a public preference and endorsement signal where one eligible resident can support one local preferred rep in their own constituency.

## MVP thesis

A prototype for residents to signal a preferred local representative with verification, privacy, and constituency-level issue data designed in from the start.

## What this prototype includes

- Trust-first landing page
- Pilot constituency mock dashboard
- Verified resident / nomination / dispute counters
- Aggregate-only public support signal
- Constituency issue prioritization board
- MVP pilot scope and positioning guardrails

## Product guardrails

- Do not call it official voting.
- Do not expose individual political preference.
- Do not collect IC/eKYC data until privacy, verification, deletion, and retention rules are published.
- Separate identity records from support records.
- Keep auditability and dispute handling in the first release.

## Development

```bash
bun install
bun run dev
bun run lint
bun run build
npx impeccable detect --fast src/app/page.tsx src/app/globals.css
```

## Design context

See `.impeccable.md` for the civic trust design brief.
