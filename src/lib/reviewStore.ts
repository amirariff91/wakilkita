import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  canMoveReviewStatus,
  cleanReviewText,
  createReviewRecord,
  normaliseStoredRecord,
  toCandidateDashboardEntry,
  toPublicReviewRecord,
  type AuditEvent,
  type CandidateDashboardEntry,
  type IntakeDraft,
  type PublicReviewRecord,
  type ReviewRecord,
  type ReviewStatus,
} from "@/lib/review";

type StoreFile = {
  version: 1;
  entries: ReviewRecord[];
  auditEvents: AuditEvent[];
};

const dataDir = process.env.WAKILKITA_DATA_DIR ?? path.join(process.cwd(), ".data");
const dataFile = path.join(dataDir, "wakilkita-private-review.json");

let memoryStore: StoreFile = { version: 1, entries: [], auditEvents: [] };
let writeLock = Promise.resolve();

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function normaliseStore(value: unknown): StoreFile {
  if (typeof value !== "object" || value === null) return { version: 1, entries: [], auditEvents: [] };
  const record = value as { entries?: unknown; auditEvents?: unknown };
  const entries = Array.isArray(record.entries) ? record.entries.map(normaliseStoredRecord).filter(Boolean) : [];
  const auditEvents = Array.isArray(record.auditEvents)
    ? record.auditEvents
        .filter((event): event is Record<string, unknown> => typeof event === "object" && event !== null)
        .map((event): AuditEvent => {
          const actor: AuditEvent["actor"] =
            event.actor === "reviewer" || event.actor === "system" ? event.actor : "public-form";
          const action: AuditEvent["action"] =
            event.action === "status-changed" ||
            event.action === "risk-flagged" ||
            event.action === "validation-rejected" ||
            event.action === "note-added"
              ? event.action
              : "submitted";

          return {
            id: cleanReviewText(String(event.id ?? makeId("audit")), 80),
            recordId: cleanReviewText(String(event.recordId ?? "unknown"), 80),
            at: cleanReviewText(String(event.at ?? new Date().toISOString()), 40),
            actor,
            action,
            detail: cleanReviewText(String(event.detail ?? ""), 240),
          };
        })
    : [];

  return { version: 1, entries: entries as ReviewRecord[], auditEvents };
}

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(dataFile, "utf8");
    memoryStore = normaliseStore(JSON.parse(raw));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Unable to read WakilKita review store; falling back to memory.", error);
    }
  }

  return memoryStore;
}

async function writeStore(store: StoreFile) {
  memoryStore = store;
  writeLock = writeLock.then(async () => {
    await mkdir(dataDir, { recursive: true });
    await writeFile(dataFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  });
  await writeLock;
}

function audit(recordId: string, action: AuditEvent["action"], detail: string, actor: AuditEvent["actor"] = "system"): AuditEvent {
  return {
    id: makeId("audit"),
    recordId,
    at: new Date().toISOString(),
    actor,
    action,
    detail: cleanReviewText(detail, 240),
  };
}

export async function listReviewEntries(): Promise<PublicReviewRecord[]> {
  const store = await readStore();
  return store.entries.map(toPublicReviewRecord);
}

export async function listCandidateDashboardEntries(): Promise<CandidateDashboardEntry[]> {
  const store = await readStore();
  return store.entries.map(toCandidateDashboardEntry);
}

export async function listAuditEvents(): Promise<AuditEvent[]> {
  const store = await readStore();
  return store.auditEvents.slice(0, 100);
}

export async function appendReviewEntry(draft: IntakeDraft) {
  const store = await readStore();
  const submittedAt = new Date().toISOString();
  const entry = createReviewRecord(draft, makeId("sub"), submittedAt);
  const auditEvents = [audit(entry.id, "submitted", "Public form submission entered private review queue.", "public-form")];

  if (entry.riskFlags.length > 0) {
    auditEvents.push(audit(entry.id, "risk-flagged", `Risk flags: ${entry.riskFlags.join(", ")}.`, "system"));
  }

  const next = {
    version: 1 as const,
    entries: [entry, ...store.entries].slice(0, 500),
    auditEvents: [...auditEvents, ...store.auditEvents].slice(0, 1000),
  };
  await writeStore(next);

  return toPublicReviewRecord(entry);
}

export async function updateReviewStatus(id: string, status: ReviewStatus, note?: string) {
  const store = await readStore();
  const entry = store.entries.find((item) => item.id === id);
  if (!entry) return { ok: false as const, status: 404, message: "Submission not found." };
  if (!canMoveReviewStatus(entry.status, status)) {
    return { ok: false as const, status: 409, message: `Cannot move review state from ${entry.status} to ${status}.` };
  }

  const updatedAt = new Date().toISOString();
  const safeNote = note ? cleanReviewText(note, 240) : "";
  const updated: ReviewRecord = {
    ...entry,
    status,
    updatedAt,
    reviewerNotes: safeNote ? [safeNote, ...entry.reviewerNotes].slice(0, 20) : entry.reviewerNotes,
  };

  const next = {
    version: 1 as const,
    entries: store.entries.map((item) => (item.id === id ? updated : item)),
    auditEvents: [
      audit(id, "status-changed", `Review state changed from ${entry.status} to ${status}.`, "reviewer"),
      ...(safeNote ? [audit(id, "note-added", "Reviewer note stored privately.", "reviewer")] : []),
      ...store.auditEvents,
    ].slice(0, 1000),
  };
  await writeStore(next);

  return { ok: true as const, entry: toPublicReviewRecord(updated) };
}

export async function appendRejectedValidationAudit(detail: string) {
  const store = await readStore();
  const next = {
    version: 1 as const,
    entries: store.entries,
    auditEvents: [audit("rejected", "validation-rejected", detail, "system"), ...store.auditEvents].slice(0, 1000),
  };
  await writeStore(next);
}
