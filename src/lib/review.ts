export const intakeTypes = [
  "Cadangkan nama untuk semakan",
] as const;

export type IntakeType = (typeof intakeTypes)[number];

export const reviewStatuses = [
  "submitted",
  "needs-review",
  "duplicate-check",
  "consent-needed",
  "approved",
  "declined",
] as const;

export type ReviewStatus = (typeof reviewStatuses)[number];

export type ConsentState = "not-needed" | "needed" | "requested" | "granted" | "declined";

export type RiskFlag =
  | "possible-phone"
  | "possible-address-detail"
  | "allegation-language"
  | "external-link"
  | "consent-required"
  | "possible-duplicate";

export type ValidationIssue = {
  field: string;
  message: string;
};

export type IntakeDraft = {
  intakeType: IntakeType;
  constituency: string;
  nameOrRole: string;
  priorityArea: string;
  reason: string;
  replyContact: string;
};

export type ReviewRecord = IntakeDraft & {
  id: string;
  submittedAt: string;
  updatedAt: string;
  status: ReviewStatus;
  consentState: ConsentState;
  riskFlags: RiskFlag[];
  reviewerNotes: string[];
};

export type PublicReviewRecord = Omit<ReviewRecord, "replyContact" | "reviewerNotes"> & {
  hasReplyContact: boolean;
};

export type CandidateDashboardEntry = Pick<
  ReviewRecord,
  "id" | "constituency" | "nameOrRole" | "priorityArea" | "reason" | "submittedAt" | "updatedAt"
> & {
  stage: "Cadangan diterima" | "Dalam semakan" | "Diluluskan untuk pengundian";
};

export type AuditEvent = {
  id: string;
  recordId: string;
  at: string;
  actor: "public-form" | "reviewer" | "system";
  action: "submitted" | "status-changed" | "risk-flagged" | "validation-rejected" | "note-added";
  detail: string;
};

export type ReviewQueueSnapshot = {
  entries: PublicReviewRecord[];
  auditEvents: AuditEvent[];
};

const maxLengths: Record<keyof IntakeDraft, number> = {
  intakeType: 80,
  constituency: 80,
  nameOrRole: 80,
  priorityArea: 80,
  reason: 420,
  replyContact: 120,
};

export function cleanReviewText(value: string, maxLength: number) {
  return value.replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isIntakeType(value: string): value is IntakeType {
  return intakeTypes.includes(value as IntakeType);
}

function isReviewStatus(value: string): value is ReviewStatus {
  return reviewStatuses.includes(value as ReviewStatus);
}

function containsIcNumber(value: string) {
  return /\b\d{6}-?\d{2}-?\d{4}\b/.test(value);
}

function needsConsent(intakeType?: IntakeType) {
  void intakeType;
  return true;
}

export function detectRiskFlags(entry: Pick<IntakeDraft, "intakeType" | "nameOrRole" | "reason" | "replyContact">) {
  const text = `${entry.nameOrRole} ${entry.reason} ${entry.replyContact}`;
  const flags = new Set<RiskFlag>();

  if (/\b01\d[-\s]?\d{3,4}[-\s]?\d{4}\b/.test(text)) flags.add("possible-phone");
  if (/\b(no\.?|jalan|lorong|persiaran|apartment|unit|block|taman)\b/i.test(text)) {
    flags.add("possible-address-detail");
  }
  if (/\b(corrupt|rasuah|scam|fraud|criminal|penipu)\b/i.test(text)) flags.add("allegation-language");
  if (/https?:\/\/|www\./i.test(text)) flags.add("external-link");
  if (needsConsent(entry.intakeType)) flags.add("consent-required");

  return Array.from(flags);
}

export function validateIntakePayload(payload: unknown): { draft?: IntakeDraft; issues: ValidationIssue[]; rejectedAuditDetail?: string } {
  if (!isRecord(payload)) {
    return { issues: [{ field: "form", message: "Hantaran borang mesti dalam format yang betul." }] };
  }

  const rawIntakeType = cleanReviewText(String(payload.intakeType ?? intakeTypes[0]), maxLengths.intakeType);
  const intakeType = isIntakeType(rawIntakeType) ? rawIntakeType : intakeTypes[0];
  const draft: IntakeDraft = {
    intakeType,
    constituency: cleanReviewText(String(payload.constituency ?? ""), maxLengths.constituency),
    nameOrRole: cleanReviewText(String(payload.nameOrRole ?? payload.name ?? ""), maxLengths.nameOrRole),
    priorityArea: cleanReviewText(String(payload.priorityArea ?? "Council follow-up"), maxLengths.priorityArea),
    reason: cleanReviewText(String(payload.reason ?? ""), maxLengths.reason),
    replyContact: cleanReviewText(String(payload.replyContact ?? ""), maxLengths.replyContact),
  };

  const issues: ValidationIssue[] = [];
  if (draft.constituency.length < 3) issues.push({ field: "constituency", message: "Tambah kawasan Parlimen anda." });
  if (draft.nameOrRole.length < 3) issues.push({ field: "nameOrRole", message: "Tambah nama orang yang dicadangkan." });
  if (draft.reason.length < 13) issues.push({ field: "reason", message: "Tambah sebab cadangan yang ringkas dan faktual." });

  const rawText = Object.values(draft).join(" ");
  if (containsIcNumber(rawText)) {
    issues.push({ field: "form", message: "Jangan hantar nombor IC di sini. eKYC mesti berlaku dalam aliran identiti berasingan." });
  }

  return {
    draft: issues.length ? undefined : draft,
    issues,
    rejectedAuditDetail: issues.length ? issues.map((issue) => `${issue.field}: ${issue.message}`).join("; ") : undefined,
  };
}

export function createReviewRecord(draft: IntakeDraft, id: string, submittedAt: string): ReviewRecord {
  const riskFlags = detectRiskFlags(draft);
  const consentState: ConsentState = needsConsent(draft.intakeType) ? "needed" : "not-needed";
  const status: ReviewStatus = riskFlags.length > 0 ? "needs-review" : "submitted";

  return {
    ...draft,
    id,
    submittedAt,
    updatedAt: submittedAt,
    status: consentState === "needed" ? "consent-needed" : status,
    consentState,
    riskFlags,
    reviewerNotes: [],
  };
}

export function toPublicReviewRecord(entry: ReviewRecord): PublicReviewRecord {
  const { replyContact, reviewerNotes, ...safeEntry } = entry;
  void reviewerNotes;

  return {
    ...safeEntry,
    hasReplyContact: Boolean(replyContact),
  };
}

export function toCandidateDashboardEntry(entry: ReviewRecord): CandidateDashboardEntry {
  const stage: CandidateDashboardEntry["stage"] = entry.status === "approved"
    ? "Diluluskan untuk pengundian"
    : entry.status === "submitted"
      ? "Cadangan diterima"
      : "Dalam semakan";

  return {
    id: entry.id,
    constituency: entry.constituency,
    nameOrRole: entry.nameOrRole,
    priorityArea: entry.priorityArea,
    reason: entry.reason,
    submittedAt: entry.submittedAt,
    updatedAt: entry.updatedAt,
    stage,
  };
}

export function normaliseStoredRecord(value: unknown): ReviewRecord | null {
  if (!isRecord(value)) return null;

  const intakeTypeRaw = cleanReviewText(String(value.intakeType ?? intakeTypes[0]), maxLengths.intakeType);
  const intakeType = isIntakeType(intakeTypeRaw) ? intakeTypeRaw : intakeTypes[0];
  const submittedAt = cleanReviewText(String(value.submittedAt ?? new Date().toISOString()), 40);
  const statusRaw = cleanReviewText(String(value.status ?? "submitted"), 40);
  const status = isReviewStatus(statusRaw) ? statusRaw : "submitted";
  const draft: IntakeDraft = {
    intakeType,
    constituency: cleanReviewText(String(value.constituency ?? ""), maxLengths.constituency),
    nameOrRole: cleanReviewText(String(value.nameOrRole ?? value.name ?? ""), maxLengths.nameOrRole),
    priorityArea: cleanReviewText(String(value.priorityArea ?? "Council follow-up"), maxLengths.priorityArea),
    reason: cleanReviewText(String(value.reason ?? ""), maxLengths.reason),
    replyContact: cleanReviewText(String(value.replyContact ?? ""), maxLengths.replyContact),
  };

  if (!draft.constituency || !draft.nameOrRole || !draft.reason) return null;

  const riskFlags = Array.isArray(value.riskFlags)
    ? value.riskFlags.map((flag) => cleanReviewText(String(flag), 60) as RiskFlag).filter(Boolean)
    : detectRiskFlags(draft);

  return {
    ...draft,
    id: cleanReviewText(String(value.id ?? submittedAt), 80),
    submittedAt,
    updatedAt: cleanReviewText(String(value.updatedAt ?? submittedAt), 40),
    status,
    consentState: cleanReviewText(String(value.consentState ?? (needsConsent(intakeType) ? "needed" : "not-needed")), 40) as ConsentState,
    riskFlags,
    reviewerNotes: Array.isArray(value.reviewerNotes)
      ? value.reviewerNotes.map((note) => cleanReviewText(String(note), 240)).filter(Boolean)
      : [],
  };
}

export function canMoveReviewStatus(from: ReviewStatus, to: ReviewStatus) {
  if (from === to) return true;
  const allowed: Record<ReviewStatus, ReviewStatus[]> = {
    submitted: ["needs-review", "duplicate-check", "consent-needed", "approved", "declined"],
    "needs-review": ["duplicate-check", "consent-needed", "approved", "declined"],
    "duplicate-check": ["needs-review", "consent-needed", "approved", "declined"],
    "consent-needed": ["needs-review", "approved", "declined"],
    approved: ["needs-review", "declined"],
    declined: ["needs-review"],
  };

  return allowed[from].includes(to);
}

export function parseReviewStatus(value: unknown): ReviewStatus | null {
  const status = cleanReviewText(String(value ?? ""), 40);
  return isReviewStatus(status) ? status : null;
}
