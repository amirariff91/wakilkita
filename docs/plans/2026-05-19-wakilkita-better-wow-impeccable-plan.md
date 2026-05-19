# WakilKita Better-Wow Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make WakilKita feel more memorable, deliberate, and high-craft without Three.js, AI-slop, fake civic authority, or anything that weakens trust.

**Architecture:** Keep the current static-first Next.js page and one client form component. Add only lightweight inline SVG, CSS motion, better form states, and tighter copy/IA. No new runtime dependencies.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript, Impeccable CLI.

---

## 0. Product Decision

Do **not** use Three.js on the core homepage.

The better wow direction is: **Civic Intake Desk / P105 Workbench**.

The page should feel like a precise civil-society intake desk:
- local to Petaling Jaya,
- plain but intentionally designed,
- privacy-first,
- form-first,
- visibly non-official,
- calm enough for trust-sensitive civic use.

The wow should come from craft and confidence:
- a restrained WakilKita mark,
- a subtle P105/PJ line motif,
- a clearer resident journey,
- a better intake form state system,
- sharper trust boundaries,
- less default-box UI.

## 1. Non-Negotiables

### Must remain true

- WakilKita is not online voting.
- WakilKita is not SPR-affiliated.
- WakilKita is not government, party, campaign, or candidate infrastructure.
- Current public page is email-only intake.
- No IC/eKYC collection on this page.
- No public supporter lists.
- Nothing becomes public automatically.
- Named people are contacted before a public profile is considered.

### Must not introduce

- Three.js, WebGL, map SDKs, particles, 3D, Lottie, Framer Motion, GSAP, Rive.
- Ballot, election, parliament, government seal, official badge, or party-style visuals.
- Candidate/person profile cards.
- Fake resident data, fake public counts, fake rankings, fake dashboards.
- Public support totals, heatmaps, issue popularity charts, or live-looking activity.
- “Vote”, “ballot”, “official”, “SPR replacement”, “verified backing”, “support signal”, “MVP”, “prototype”, “demo”, “preview”, “pitch deck”, “proposal” in public UI copy.
- Generated civic scenes, crowds, townhalls, or photoreal local event imagery.

## 2. Final Direction

### Name

**P105 Civic Intake Desk**

### Visual posture

- Off-white / white / ink / blue-slate / cool grey / burnt orange.
- Sans-first, clear, public-service tone.
- Small-radius or square panels.
- 1px borders and deliberate dividers.
- Very light shadow only where depth improves scanning.
- Motion is short, non-looping, and never required to understand content.

### Core page order

1. Civic notice header / hero
2. Intake form with better completion and safety states
3. What this is / what this is not
4. Review journey visual
5. Privacy model before public output
6. P105 local context motif, not data dashboard
7. Footer safety/dispute/takedown details

## 3. Fan-Out Consensus

### Product/trust agent consensus

The site should not become more spectacular. It should become more confidently operational. The strongest wow is immediate trust:
- user knows what the page does within 10 seconds,
- user knows what it does not do,
- user knows nothing public happens automatically,
- user knows no IC/eKYC is collected here.

### UI/interaction agent consensus

Use SVG/CSS, not WebGL:
- subtle local linework,
- process line animation,
- better form affordances,
- stronger brand mark,
- calmer status chips,
- fewer generic cards.

### Engineering agent consensus

Keep architecture minimal:
- no new dependencies,
- inline SVG or static SVG only,
- CSS transitions/keyframes only,
- preserve server-rendered page,
- keep client logic inside `WakilKitaActionPanel.tsx`,
- run lint/build/impeccable + browser/mobile QA.

### Harsh Impeccable QA consensus

Plan fails if it becomes:
- civic SaaS theatre,
- fake government/institution cosplay,
- AI gradient/glass UI,
- cardocalypse,
- motion garnish,
- fake-local or fake-data visuals,
- less clear than the current form-first page.

---

## 4. Implementation Tasks

### Task 1: Update project design brief for the better-wow direction

**Objective:** Make `.impeccable.md` the source of truth for the new visual direction before implementation.

**Files:**
- Modify: `.impeccable.md`

**Steps:**
1. Add a “Better-wow direction” section.
2. Define “P105 Civic Intake Desk” as the target.
3. Allow only inline SVG/CSS motion.
4. Explicitly ban WebGL/Three.js and fake map/dashboard/person visuals.
5. Add acceptance criteria: first screen must show P105, non-voting boundary, and route to intake.

**Verification:**
- Read `.impeccable.md` and confirm it matches this plan.
- Do not run Impeccable against `.impeccable.md` because detector phrases can false-positive inside briefs.

---

### Task 2: Create a restrained WK mark and P105 motif

**Objective:** Add brand/local specificity without official-looking symbolism.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Optional create: `src/app/WakilKitaMark.tsx` if page file becomes too large.

**Implementation notes:**
- Replace or enhance the current `WK` circle with a simple inline SVG mark.
- The mark should feel like civic paperwork / two joined paths / review linework.
- Do not use crests, shields, scales, ballot boxes, parliament shapes, flags, stars, laurels, or seals.
- Add a decorative `P105LineMotif` component:
  - thin abstract paths,
  - no official map claim,
  - no data dots or counts,
  - `aria-hidden="true"`,
  - `focusable="false"`,
  - uses existing CSS variables.

**Suggested component shape:**
- `WakilKitaMark()` returns inline SVG, used in nav and maybe hero.
- `P105LineMotif()` returns inline SVG inside hero preview area or background.

**Verification:**
- Visual does not look like official election/government material.
- Motif remains decorative and not mistaken for official constituency data.
- No new dependencies in `package.json`.

---

### Task 3: Recompose the hero as a civic notice + intake desk

**Objective:** Make the first screen more designed and more trustworthy without hiding the action.

**Files:**
- Modify: `src/app/page.tsx`

**Current issue:** Hero is clear but a bit default: headline + buttons + `ProductPreview` card.

**Target:**
- Keep the direct headline or improve it without hype.
- Add a boundary strip/chip row near the headline:
  - “Not online voting”
  - “Not SPR-affiliated”
  - “Email-only intake”
  - “No IC/eKYC here”
- Replace `ProductPreview` with a more deliberate “Before you submit” civic desk panel:
  - three current-state rows,
  - email draft explanation,
  - tiny line motif or document-like divider.

**Important:**
- Do not move the intake form lower than it is now.
- Do not add feature-card grids.
- Do not add fake metrics.

**Verification:**
- At desktop and mobile, first screen still tells users exactly what to do.
- “Not online voting / not SPR / no IC/eKYC” remains visible before the form.

---

### Task 4: Upgrade the form interaction states

**Objective:** Make the form feel safer and more polished without changing the email-only mechanism.

**Files:**
- Modify: `src/app/WakilKitaActionPanel.tsx`
- Modify: `src/app/globals.css` if shared form classes/animations are added.

**Changes:**
1. Add a small completion/readiness panel near the submit button:
   - incomplete: “Still needed: name/issue + short reason.”
   - ready: “Ready to open your email draft. You can review before sending.”
2. Add reason character count:
   - e.g. `148 / 420`
   - say “Minimum reached” only after 13+ chars.
3. Improve `missingFields` grammar so it does not produce awkward “and and”.
4. Improve saved/success state:
   - “Email draft prepared”
   - “A draft copy was saved in this browser.”
   - “On a shared device, clear browser storage after sending.”
   - “If your email app did not open, email miccy@arusdigital.com.”
5. Optional: add “Copy details” fallback only if implementation is simple and accessible. Skip if it complicates scope.

**Do not change:**
- mailto behavior,
- localStorage payload format unless necessary,
- sensitive-data warnings.

**Verification:**
- Empty form: button disabled, readiness explains missing fields.
- Partial form: readiness updates.
- Valid form: button enabled, readiness says email draft will open.
- Submit: localStorage payload exists, saved state appears, mailto URL is sane.
- `aria-live` does not spam or obscure labels.

---

### Task 5: Add a “What this is / is not” section

**Objective:** Turn civic boundaries into a trust-building design moment.

**Files:**
- Modify: `src/app/page.tsx`

**Placement:** After the intake form or just before review process.

**Content:**

What this is:
- Private P105 civic intake
- Manual review before anything public
- A way to submit a name, correction, or local priority
- Independent from parties, candidates, government, and SPR

What this is not:
- Not online voting
- Not official election infrastructure
- Not a public supporter list
- Not IC/eKYC collection
- Not a popularity ranking

**Visual treatment:**
- Use two clear columns or stacked panels on mobile.
- Avoid red/green moralizing.
- Avoid seals/badges.
- Use text hierarchy and dividers, not card piles.

**Verification:**
- It improves clarity without adding startup-theatre copy.
- Mobile stack remains readable.

---

### Task 6: Replace process cards with a resident review journey

**Objective:** Make “what happens next” feel intentional and memorable.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Current:** three simple cards: check constituency, clean submission, contact before publishing.

**Target:** an accessible ordered list with a subtle SVG/CSS connector:
1. Receive the draft
2. Check constituency scope
3. Remove unsafe/private details
4. Contact named people before public profile consideration

**Motion:**
- Optional line reveal only once.
- No looping.
- Disable under `prefers-reduced-motion`.
- Decorative connector must be `aria-hidden`.

**Verification:**
- It reads correctly with CSS disabled / screen reader.
- It does not look like blockchain/audit theatre.
- It does not imply instant publication or verification.

---

### Task 7: Add a privacy model section without architecture theatre

**Objective:** Make privacy separation explicit as the main trust proof.

**Files:**
- Modify: `src/app/page.tsx`

**Content blocks:**
1. Contact details stay private during review.
2. Individual preferences are not public.
3. No supporter lists are sold/shared with reps, parties, employers, or campaigns.
4. Public aggregate output requires threshold rules and published methodology later.

**Important wording:**
- Do not say verification exists yet.
- Do not say “secure” unless explaining actual security properties.
- If future verification appears, mark it future/separate-consent.

**Visual treatment:**
- Four short blocks connected by thin rules.
- No network nodes, crypto chains, lock badges, or official seals.

**Verification:**
- A visitor can understand individual choices are not public.
- Section does not overclaim current backend capability.

---

### Task 8: Clean stale docs that can mislead future agents

**Objective:** Prevent future implementation drift from old Pandan/MVP/prototype language.

**Files:**
- Modify: `README.md`
- Optional Modify: old plan docs only if they are actively misleading; otherwise mark this new plan as superseding visual direction.

**Changes:**
- README should describe current P105 Petaling Jaya email-only intake.
- Remove or qualify old “MVP/prototype/Pandan” language from top-level readme.
- Add a note linking this plan as the current visual direction.

**Verification:**
- Search README for stale terms.
- Public UI copy remains unchanged unless intended.

---

### Task 9: Run quality gates

**Objective:** Verify the implementation is safe, fast, accessible, and Impeccable-clean.

**Commands:**

```bash
bun run lint
bun run build
npx impeccable detect --fast src/app/page.tsx src/app/WakilKitaActionPanel.tsx src/app/layout.tsx src/app/globals.css 2>&1
```

**Search checks:**

```bash
grep -RniE "P100|Pandan|prototype|proposal|pitch deck|MVP|demo|preview|verified backing|support signal|vote|ballot|official result|public results|live count|dashboard" src/app README.md .impeccable.md docs/plans/2026-05-19-wakilkita-better-wow-impeccable-plan.md
```

Important: grep may find banned terms in this plan or `.impeccable.md` as “avoid” examples. Treat source UI files as stricter than planning docs.

**Browser QA:**
- Desktop screenshot.
- Mobile 390px screenshot.
- Browser console.
- Keyboard tab through nav/form/CTA.
- Reduced motion check.
- Submit flow with safe dummy content.

**Rendered civic trust checks:**
- Could any visual be mistaken for official election infrastructure?
- Could any visual be mistaken for real live data/results?
- Does the first screen preserve “not online voting / not SPR / no IC/eKYC”?
- Is the intake still the primary action?
- Does the page feel local to PJ without fake-local data?

---

## 5. Suggested Execution Order

1. Update `.impeccable.md`.
2. Add WK mark and P105 motif.
3. Recompose hero/preview panel.
4. Upgrade form readiness and success states.
5. Add “what this is / is not”.
6. Convert review process to journey treatment.
7. Add privacy model section.
8. Clean README/current context.
9. Run gates and browser QA.
10. Commit and deploy only after rendered visual review passes.

## 6. Acceptance Criteria

Ship only if:

- No new runtime dependencies are added.
- The form remains usable without JavaScript animations.
- The page still builds statically.
- Impeccable has no implementation-file flags.
- Mobile first viewport shows civic boundary and action.
- No visual suggests voting, official status, public counts, or live results.
- No fake people, fake dashboards, or fake data appear.
- Reduced-motion users get a static, complete experience.
- The UI feels more intentional, not more theatrical.

## 7. What “Good” Looks Like

A resident should think:

“This is careful. I know what I can submit. I know what they won’t do with my information. This is clearly not voting or government, but it feels serious enough to try.”

That is the right wow for WakilKita.
