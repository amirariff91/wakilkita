# WakilKita Refocus + Impeccable Implementation Plan

> For Hermes: use subagent-driven-development if executing. Dispatch separate agents for product hierarchy, trust/privacy, UI implementation, and QA review. Spec compliance first, then quality review. Do not implement backend IC/eKYC in this pass.

Goal: turn WakilKita from a polished civic concept page into a resident-first Pandan intake product.

Architecture: keep the current Next.js App Router/Tailwind static site, but restructure the page around the core action loop: nominate -> private intake -> review -> future verified support signal. Use Impeccable as a UI anti-pattern gate, not as the only quality gate. Add rendered browser QA because civic trust failures are mostly semantic, not just visual.

Tech stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Bun, Impeccable 2.x.

Current audit verdict: the page is safe and credible, but product hierarchy is backwards. It explains trust, visuals, and data before residents can act. Core intake is buried after hero, generated visuals, trust architecture, and Pandan data.

---

## Product north star

WakilKita helps Pandan residents surface credible local representatives and urgent local priorities through private intake now, then one verified private support signal later.

Not online voting. Not SPR. Not a party tool. Not official results.

Public copy should use:
- nominate
- representative profile
- private intake
- issue priority
- support signal
- verified backing
- participant signal

Avoid public copy using:
- vote
- ballot
- election infrastructure
- official
- mandate
- winner
- turnout
- results, unless clearly qualified as future aggregate participant output

---

## Target page hierarchy

1. Nav
   - Brand: WakilKita / P100 Pandan
   - Links: Nominate, Submit priority, How it works, Trust & privacy
   - Primary CTA: Nominate someone
   - Remove “Request review” from primary nav.

2. Hero: resident action first
   - H1: “Nominate credible local representatives for P100 Pandan.”
   - Subcopy: “Submit a local representative, claim a profile, or share the issue Pandan should prioritise first. WakilKita starts with private intake before verified resident support signals go live.”
   - Boundary line: “P100 Pandan only. Private intake first. No IC/eKYC collected here. Not online voting, not SPR-affiliated, not a party tool.”
   - Primary CTA: “Nominate someone” -> #take-part
   - Secondary CTA: “Submit a priority” -> #take-part with priority context if practical later.

3. Action panel immediately after hero
   - Move `WakilKitaActionPanel` above `VisualEvidencePanel`, `TrustArchitectureDiagram`, and `PandanConstituencyExplorer`.
   - Default action remains “Nominate a representative”.
   - Rename button from “Prepare secure email intake” to “Prepare private intake email”.
   - Rename field labels:
     - “Nominee, profile, or role name” -> “Who are you nominating or claiming?”
     - “Priority area” -> “Which Pandan priority does this relate to?”
     - “Why should this be prioritised?” -> “Why should residents consider this?”
   - Keep low-risk fields only. No IC, address, phone, allegations, or sensitive identity data.

4. What happens after you submit
   - Add a compact 3-step block immediately after intake:
     1. WakilKita reviews relevance to P100 Pandan.
     2. Sensitive/private details are removed before anything public.
     3. Verified private support signals open only after privacy, dispute, and verification rules are ready.

5. Representative profile promise
   - Add a section explaining what a nominated profile can become:
     - public service profile
     - claimed/verified status
     - issue priorities
     - evidence/community track record
     - aggregate participant support only when safe
   - Empty-state copy: “No public representative profiles yet. Nominate someone serving Pandan.”

6. Trust & privacy model, compressed
   - Keep identity separation, but simplify into plain language.
   - Do not lead with diagrams.
   - Required bullets:
     - We do not collect IC through this page.
     - We do not publish individual support.
     - We do not share supporter lists with reps, parties, employers, or campaigns.
     - Public counts require minimum thresholds and dispute rules.
     - Verified support signals are future pilot functionality, not live today.

7. Pandan data as supporting context
   - Keep `PandanConstituencyExplorer`, but position it as “Pandan priorities context”.
   - The data explorer supports issue framing; it is not the product.
   - Any issue scores must be labelled as baseline/product prioritisation, not official public need or live resident data.
   - If age/race electorate splits lack authoritative source, show “Source needed” rather than inferring from population.

8. Visuals demoted or removed
   - Remove `VisualEvidencePanel` from prime placement.
   - If kept, move near bottom as supporting “How the model works” visuals.
   - Avoid public copy that says “Generated site visuals” or “Use product diagrams, not political theatre”; this is internal design rationale, not resident-facing value.

9. Final CTA + footer disclaimers
   - Repeat: Nominate someone / Submit priority / Ask about claiming a profile.
   - Footer holds longer non-affiliation and non-binding disclaimer.

---

## Impeccable design brief update

Before implementation, update `.impeccable.md` so future agents do not recreate the current deck-style layout.

Replace the project line with:
“WakilKita is a trust-first Pandan civic intake product. It helps residents nominate credible local representatives, submit local priorities, and later give one verified private support signal. It is not online voting, not SPR-affiliated, not a party tool, and not official results.”

Add:
- Page must feel like a resident action interface, not a pitch deck or civic dashboard.
- Core intake appears before diagrams, visuals, and data explorer.
- Public visuals must explain product trust, never imply a real event, official system, ballot, campaign, or live result.
- Do not use founder-facing terms like “MVP” in hero or primary CTA.
- Do not use “secure” unless the implementation provides a real security guarantee.

---

## Task breakdown

### Task 1: Update Impeccable context

Objective: lock the new product direction into `.impeccable.md` before any UI work.

Files:
- Modify: `.impeccable.md`

Steps:
1. Rewrite project and page/component guidance using the “Impeccable design brief update” above.
2. Keep existing palette and typography.
3. Add explicit “resident action first” guardrail.
4. Run:
   `npx impeccable detect --fast .impeccable.md 2>&1`
   Note: if the brief itself triggers detector tokens, do not scan `.impeccable.md` in final gate; scan implementation files only.

Acceptance:
- `.impeccable.md` says resident action interface, not civic mandate MVP.
- It explicitly says intake before diagrams/data.
- It warns against public-facing “MVP”, “secure”, fake official visuals, and deck layout.

### Task 2: Rewrite hero and nav around nomination

Objective: make the first screen answer “what can I do here?”

Files:
- Modify: `src/app/page.tsx`

Steps:
1. Change nav links to Nominate / Submit priority / How it works / Trust & privacy.
2. Change primary nav CTA from “Request review” to “Nominate someone”.
3. Replace H1 with an action headline.
4. Replace subcopy with private intake + future support signal framing.
5. Keep a short boundary line above/below hero: P100 Pandan only, private intake, no IC/eKYC here, not online voting/SPR/party.
6. Remove public “MVP” wording from hero/nav.

Acceptance:
- Above fold includes “Nominate” and “P100 Pandan”.
- Above fold says private intake and no IC/eKYC collected here.
- No “Request review” as primary CTA.
- No “MVP” in public hero/nav copy.

### Task 3: Move action panel directly under hero

Objective: the first usable product flow must appear before trust diagrams, visuals, and data.

Files:
- Modify: `src/app/page.tsx`
- Modify: `src/app/WakilKitaActionPanel.tsx`

Steps:
1. Move `<WakilKitaActionPanel />` to directly after hero section.
2. Move `VisualEvidencePanel` below trust/data or remove from the page.
3. Update action panel labels and CTA copy.
4. Add optional short anchor handling later only if simple; do not overbuild.

Acceptance:
- `#take-part` appears before `#trust` and `#constituency` in page flow.
- Button says “Prepare private intake email”, not “Prepare secure email intake”.
- Intake copy says nothing is silently collected and no IC/address/private allegations should be sent.

### Task 4: Add “What happens after you submit” block

Objective: explain why private intake does not instantly publish profiles or counts.

Files:
- Modify: `src/app/page.tsx`

Steps:
1. Create a small section/component after `WakilKitaActionPanel`.
2. Use 3 cards/steps: review, clean sensitive details, future verified support signal.
3. Keep language plain, non-technical, and non-official.

Acceptance:
- Users understand submission is private and reviewed.
- Users understand verified support signals are not live yet.
- Users understand public output requires thresholds/dispute rules.

### Task 5: Add representative profile promise / empty state

Objective: make the “rep” product tangible without fake nominees.

Files:
- Modify: `src/app/page.tsx`

Steps:
1. Add section: “What a representative profile can become”.
2. Explain claimed profile, issue priorities, public service record, and future aggregate support.
3. Add empty state: no public profiles yet; nominate someone serving Pandan.
4. Do not invent names, counts, or fake profiles.

Acceptance:
- Representative role is defined clearly.
- No fake people or fake support counts.
- Profile promise links back to intake.

### Task 6: Compress trust section

Objective: keep trust strong but stop it becoming the product.

Files:
- Modify: `src/app/page.tsx`

Steps:
1. Rename section to “How trust works”.
2. Keep identity separation diagram lower in the section.
3. Add “what we will not do” bullets.
4. Separate “live now” from “future pilot”.

Acceptance:
- Trust section does not imply backend verification is live.
- It says IC is not collected through the page.
- It says individual support is never public.
- It says public counts need thresholds and dispute rules.

### Task 7: Reframe Pandan data section

Objective: keep data credibility while making it support nomination and priorities.

Files:
- Modify: `src/app/page.tsx`
- Inspect/modify if needed: `src/app/PandanConstituencyExplorer.tsx`

Steps:
1. Change surrounding heading/copy to “Pandan priorities context”.
2. Ensure all issue data says baseline/product prioritisation, not official public need.
3. Keep source-needed/data-gap language for missing electorate age/race splits.
4. Avoid any visual hierarchy where data explorer looks more important than intake.

Acceptance:
- Data supports “what should reps prioritise?”
- No inferred elector demographic precision.
- No live participation implication.

### Task 8: Impeccable + build gates

Objective: verify static anti-patterns and code health.

Commands:
- `npx impeccable detect --fast src/app/page.tsx src/app/WakilKitaActionPanel.tsx src/app/PandanConstituencyExplorer.tsx src/app/globals.css 2>&1`
- `bun run lint`
- `bun run build`

Acceptance:
- Impeccable output empty / exit 0.
- Lint passes.
- Build passes.

### Task 9: Rendered browser QA

Objective: catch civic trust and mobile hierarchy issues Impeccable cannot catch.

Steps:
1. Start/confirm dev server.
2. Use browser QA at local URL.
3. Test desktop and mobile if available.
4. Check console for JS errors.
5. Verify no “demo” leakage unless intentionally labelled; no vote/official/mandate language in public copy except explicit disclaimers if unavoidable.

Rendered QA checklist:
- First screen makes nomination obvious.
- Action panel appears before diagrams/data.
- No official-election look or language.
- No fake live counts, fake profiles, fake support signals.
- No IC/eKYC collection claim in current flow.
- Disclaimers are visible but do not dominate the product.
- Mobile stacking shows hero -> CTA -> intake without visual clutter.
- Focus states remain visible.
- Generated visuals, if present, cannot be mistaken for official/live data.

### Task 10: Commit and deploy

Objective: ship the refocused page safely.

Commands:
- `git diff --stat`
- `git add -A`
- `git commit -m "feat: refocus WakilKita around Pandan intake"`
- `git push origin main`
- Trigger Coolify deploy using the known deploy URL.
- Verify live HTML has new hero, new CTA, and action panel order.

Acceptance:
- Production loads 200.
- Live page has “Nominate credible local representatives” or approved equivalent.
- Live page has “Prepare private intake email”.
- Live page places intake before trust/data.
- No public hero/nav “MVP” wording.

---

## Trust/privacy gates before future backend work

Do not build IC/eKYC or public counts until these are designed:

1. Privacy policy specific to WakilKita.
2. Retention/deletion/correction process.
3. Identity records separated from support records.
4. No raw IC stored unless unavoidable; prefer provider reference/hash/token.
5. One active support signal per verified resident per consultation, enforced server-side.
6. Admin audit log for every count-changing action.
7. Nominee claim, consent, impersonation, dispute, and takedown flow.
8. Public aggregate suppression threshold. Default planning assumption: k >= 50.
9. No public supporter lists.
10. No public counts during active disputes or below threshold.

---

## Subagent execution plan

Use 4 agents if implementing:

Agent A — Product hierarchy implementer
- Tasks 2–5.
- Must preserve allowed civic language.
- No fake profiles/counts.

Agent B — Trust/copy reviewer
- Reviews all changed public copy against civic safety rules.
- Checks live/future capability separation.
- Blocks overclaims.

Agent C — Impeccable/UI implementer
- Updates `.impeccable.md`.
- Runs Impeccable static gate.
- Fixes visual anti-patterns.

Agent D — Rendered QA reviewer
- Browser/screenshot QA after implementation.
- Checks mobile, hierarchy, trust semantics, console errors.

Controller must run final lint/build/impeccable and commit/deploy only after review pass.

---

## Go/no-go criteria for this refocus pass

Go if:
- User can understand the action within 5 seconds.
- Nomination/priority intake appears before data/trust diagrams.
- Public copy clearly separates current private intake from future verified support signal.
- Page remains legally/trust safe without sounding like a legal disclaimer first.
- Impeccable, lint, build, and rendered QA pass.

No-go if:
- Page still reads like a pitch deck/dashboard.
- Primary CTA still says review/contact instead of nominate/submit.
- It implies live verification, live public counts, or official civic authority.
- It collects or asks for IC/eKYC before policy/backend exists.
