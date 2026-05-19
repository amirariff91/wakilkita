# WakilKita Product Grill + Dashboard-First Requirements

Date: 2026-05-19
Scope: P105 Petaling Jaya first constituency
Status: Working product direction after Amir correction: no email intake; submission must appear in dashboard.

## The hard correction

Nomination, endorsement, profile claim, and issue intake must be in-platform. No email draft for the core flow.

Resident action:
1. Open WakilKita.
2. Submit nomination / endorsement / issue / claim.
3. See it land in a dashboard queue.
4. Understand nothing is public until review, consent, and privacy checks happen.

## Product thesis

WakilKita is not online voting. It is a trusted civic intake and preference-signal platform that helps residents surface possible local representatives and local priorities, then gives reviewers a structured way to process nominations safely.

The valuable product is not a leaderboard. The valuable product is a credible, auditable, consent-aware pipeline from resident input → constituency issue context → nominee review → verified local preference signal.

## Hazim-style product grill

### 1. The abuse problem is the product
If anyone can nominate repeatedly, the product becomes a popularity toy. The platform needs a dedup path before public totals:
- one submission per resident per constituency per window,
- device/session friction for early private intake,
- later: phone OTP + IC/eKYC verification separated from support data,
- audit trail for duplicate review,
- no public counts until methodology is published.

### 2. Consent is non-negotiable
A person can be nominated without asking, but a public representative profile should not appear without:
- consent or claim flow,
- correction/removal path,
- defamation/allegation screening,
- clear difference between “someone nominated this person” and “this person is participating”.

### 3. Constituency scope must be boringly strict
P105 first. No national map fantasy yet.
Need:
- constituency selector later,
- boundary validation later,
- P105 issue taxonomy now,
- data.gov.my/open data context only where sourced and labelled.

### 4. The word “vote” is dangerous
Avoid anything that sounds binding, official, electoral, or SPR-like.
Use:
- nominate,
- endorse,
- support,
- review,
- preference signal,
- local priority,
- constituency intake.

Avoid:
- vote,
- ballot,
- turnout,
- mandate,
- official result,
- winner,
- candidate leaderboard.

### 5. The first dashboard is not the final system
Current implementation is a browser-local review queue so the product behaviour is visible without unsafe public collection. Production needs:
- persistent backend database,
- reviewer/admin auth,
- resident account or verification channel,
- immutable audit logs,
- retention/deletion policy,
- identity/support record separation,
- rate limits and anti-abuse checks.

## Current implemented scope

Implemented now:
- Dashboard route: `/dashboard`.
- Core form no longer opens email.
- Submissions save into dashboard queue.
- Queue shows status, type, constituency, reason, timestamp, contact hidden, and risk flags.
- Risk flags detect possible IC number, phone number, address detail, and allegation language.
- Copy updated to dashboard-first, P105, non-official, consent-first framing.
- Impeccable design context updated.

Not implemented yet:
- Real backend persistence.
- Authenticated reviewer dashboard.
- Resident verification/eKYC.
- Constituency boundary validation.
- Public representative profiles.
- Public counts or aggregate preference signal.

## Required production architecture later

### Data separation
Keep separate stores:
1. Identity verification record: IC/eKYC, phone, proof, verification status.
2. Support/preference record: constituency, nominee, window, anonymised resident key.
3. Public nominee profile: consented public fields only.
4. Moderation/audit record: reviewer actions, timestamps, reasons.

Never expose identity record to public profile or supporter list.

### Review states
- submitted
- needs-review
- duplicate-check
- consent-needed
- approved
- declined

### Public visibility rules
Public pages may show:
- approved nominee profile,
- consented public bio,
- sourced constituency issues,
- methodology notes.

Public pages must not show yet:
- individual supporter identity,
- raw submissions,
- contact details,
- IC/eKYC status,
- public counts until threshold and methodology exist,
- allegations without review.

## Next build priorities

1. Persistent backend + admin auth.
2. Reviewer state transitions in dashboard.
3. Nominee consent/claim flow.
4. P105 issue taxonomy from open data with source labels.
5. Verification model design: phone OTP first, IC/eKYC later, always separated from support records.
6. Public methodology page before any aggregate counts.
