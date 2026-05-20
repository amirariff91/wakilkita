export type IntakeType = "Nominate a representative";

export type ReviewStatus = "submitted" | "needs-review" | "duplicate-check" | "consent-needed" | "approved" | "declined";

export type IntakeEntry = {
  id: string;
  intakeType: IntakeType;
  constituency: string;
  nameOrRole: string;
  priorityArea: string;
  reason: string;
  replyContact: string;
  submittedAt: string;
  status: ReviewStatus;
  riskFlags: string[];
};

export type IntakeDraft = Omit<IntakeEntry, "id" | "submittedAt" | "status" | "riskFlags">;

const QUEUE_KEY = "wakilkita_queue_v1";
const LEGACY_KEY = "wakilkita_intake_v1";

export function cleanQueueText(value: string, maxLength: number) {
  return value.replace(/[<>&"']/g, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function detectRiskFlags(entry: Pick<IntakeEntry, "nameOrRole" | "reason" | "replyContact">) {
  const text = `${entry.nameOrRole} ${entry.reason} ${entry.replyContact}`;
  const flags = new Set<string>();

  if (/\b\d{6}-?\d{2}-?\d{4}\b/.test(text)) flags.add("Possible IC number");
  if (/\b01\d[-\s]?\d{3,4}[-\s]?\d{4}\b/.test(text)) flags.add("Possible phone number");
  if (/\b(no\.?|jalan|lorong|persiaran|apartment|unit)\b/i.test(text)) flags.add("Possible address detail");
  if (/\b(corrupt|rasuah|scam|fraud|criminal|penipu)\b/i.test(text)) flags.add("Allegation language");

  return Array.from(flags);
}

function normaliseEntry(value: unknown): IntakeEntry | null {
  if (!isRecord(value)) return null;

  const intakeType = cleanQueueText(String(value.intakeType ?? "Nominate a representative"), 80) as IntakeType;
  const constituency = cleanQueueText(String(value.constituency ?? "P105 Petaling Jaya"), 80);
  const nameOrRole = cleanQueueText(String(value.nameOrRole ?? value.name ?? ""), 80);
  const priorityArea = cleanQueueText(String(value.priorityArea ?? "Council follow-up"), 80);
  const reason = cleanQueueText(String(value.reason ?? ""), 420);
  const replyContact = cleanQueueText(String(value.replyContact ?? ""), 120);
  const submittedAt = cleanQueueText(String(value.submittedAt ?? new Date().toISOString()), 40);
  const status = cleanQueueText(String(value.status ?? "submitted"), 40) as ReviewStatus;

  if (!constituency || !nameOrRole || !reason) return null;

  const entry = {
    id: cleanQueueText(String(value.id ?? makeId()), 60),
    intakeType,
    constituency,
    nameOrRole,
    priorityArea,
    reason,
    replyContact,
    submittedAt,
    status,
    riskFlags: Array.isArray(value.riskFlags)
      ? value.riskFlags.map((flag) => cleanQueueText(String(flag), 60)).filter(Boolean)
      : [],
  } satisfies IntakeEntry;

  return { ...entry, riskFlags: entry.riskFlags.length ? entry.riskFlags : detectRiskFlags(entry) };
}

function writeQueue(entries: IntakeEntry[]) {
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(entries));
}

function migrateLegacyEntry(existing: IntakeEntry[]) {
  const raw = window.localStorage.getItem(LEGACY_KEY);
  if (!raw) return existing;

  try {
    const migrated = normaliseEntry(JSON.parse(raw));
    window.localStorage.removeItem(LEGACY_KEY);
    if (!migrated || existing.some((entry) => entry.id === migrated.id)) return existing;
    const next = [migrated, ...existing];
    writeQueue(next);
    return next;
  } catch {
    window.localStorage.removeItem(LEGACY_KEY);
    return existing;
  }
}

export function readQueue() {
  if (typeof window === "undefined") return [] as IntakeEntry[];

  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const entries = Array.isArray(parsed) ? parsed.map(normaliseEntry).filter(Boolean) : [];
    return migrateLegacyEntry(entries as IntakeEntry[]);
  } catch {
    return migrateLegacyEntry([]);
  }
}

export function appendEntry(draft: IntakeDraft) {
  const entry: IntakeEntry = {
    id: makeId(),
    intakeType: cleanQueueText(draft.intakeType, 80) as IntakeType,
    constituency: cleanQueueText(draft.constituency, 80),
    nameOrRole: cleanQueueText(draft.nameOrRole, 80),
    priorityArea: cleanQueueText(draft.priorityArea, 80),
    reason: cleanQueueText(draft.reason, 420),
    replyContact: cleanQueueText(draft.replyContact, 120),
    submittedAt: new Date().toISOString(),
    status: "submitted",
    riskFlags: [],
  };

  const safeEntry = { ...entry, riskFlags: detectRiskFlags(entry) };
  const next = [safeEntry, ...readQueue()].slice(0, 50);
  writeQueue(next);
  return safeEntry;
}
