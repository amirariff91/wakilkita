# WakilKita UI/UX Requirements — Hazim / Amir Interview Notes

Date: 2026-05-19
Status: implemented first dashboard-first product pass; production backend still pending

## New hard requirement from Amir

The nomination flow must not be email-based.

When a user clicks/submits a nomination, it should appear straightforwardly in a dashboard.

This changes the product from a static/manual email intake page into an app flow with:

1. user-facing nomination submission,
2. backend persistence,
3. admin/review dashboard,
4. visible workflow state,
5. trust/safety controls before anything public appears.

## Product implication

The current “email-only intake” positioning is now wrong for the intended product.

The UI should communicate:

- Submit nomination in-platform.
- Nomination enters a review dashboard immediately.
- It is not public by default.
- Admin/moderator reviews for constituency scope, consent, duplicates, unsafe/private content.
- Approved items can move to public constituency page / rep profile / issue board depending on product rules.

## Dashboard requirement

A first dashboard should show:

- New nominations received.
- Constituency code and area.
- Submission type: nominate rep, endorse rep, submit issue, claim profile.
- Submitted name / issue title.
- Reason / priority explanation.
- Contact method if provided.
- Verification state.
- Review state: new, needs info, duplicate, rejected, approved, public-ready.
- Risk flags: IC/phone/address detected, defamation/allegation, non-constituency, duplicate person.

## UX correction needed

Homepage must stop behaving like a brochure/mailto landing page.

Above the fold should make the platform model obvious:

- Pick / confirm constituency.
- Nominate or endorse a local rep.
- Submit local issue priority.
- See trusted dashboard/review flow.
- Explain verification and anti-abuse without overclaiming election legitimacy.

## Copy to remove or revise

Remove/revise:

- “Email-only intake”
- “opens an email draft”
- “does not send anything to a WakilKita server”
- “no IC/eKYC here” if the future direction includes IC/eKYC. Replace with “IC/eKYC handled separately from public support data” once built.

Keep guardrails:

- Not online voting.
- Not SPR-affiliated.
- Independent of parties.
- No public supporter list.
- No public counts/ranking before methodology.

## Open interview questions for Hazim

1. Should dashboard be admin-only at first, or should nominators see their own submission status?
2. What is the first dashboard user: internal operator, constituency moderator, nominee, or public resident?
3. Should nominees become visible immediately as “under review”, or only after consent/claim?
4. Should endorsements be possible before nominee consent?
5. What minimum verification is required for pilot: email/phone only, IC OCR, MyKad + selfie, or third-party eKYC?
6. What is the anti-abuse rule for one person: one nomination, one endorsement, one constituency?
7. What should the dashboard optimize for: speed of review, trust auditability, or public transparency?
8. What should the public page show after dashboard approval: reps, issues, both, or a constituency progress board?

## Recommended next build direction

Phase 1 should be a real app skeleton:

- Submit nomination form posts to backend.
- Store submission privately.
- Admin dashboard lists nominations.
- Review state can be changed manually.
- Public site shows only safe approved data or placeholder methodology.

Avoid building full eKYC until the review dashboard and data model are correct.
