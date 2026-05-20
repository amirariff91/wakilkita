import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Verification records are stored SEPARATELY from nominations.
// IC is never stored in plain text — only SHA-256 hash.
// These records are never exposed via public API.

export type VerificationRecord = {
  token: string;
  icHash: string; // SHA-256(IC) — never plain text
  phone: string;
  createdAt: string;
  expiresAt: string; // 30 minutes
  used: boolean;
  usedAt?: string;
};

type VerificationStore = {
  version: 1;
  records: VerificationRecord[];
};

const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_RECORDS = 10000;

const dataDir = process.env.WAKILKITA_DATA_DIR ?? path.join(process.cwd(), ".data");
const storeFile = path.join(dataDir, "wakilkita-verification.json");

let memStore: VerificationStore = { version: 1, records: [] };
let writeLock = Promise.resolve();

function hashIC(ic: string): string {
  return createHash("sha256").update(ic.trim()).digest("hex");
}

function normaliseStore(raw: unknown): VerificationStore {
  if (typeof raw !== "object" || raw === null) return { version: 1, records: [] };
  const r = raw as { records?: unknown[] };
  const records = Array.isArray(r.records)
    ? r.records.filter((x): x is VerificationRecord =>
        typeof x === "object" && x !== null &&
        typeof (x as VerificationRecord).token === "string"
      )
    : [];
  return { version: 1, records };
}

async function readStore(): Promise<VerificationStore> {
  try {
    const raw = await readFile(storeFile, "utf8");
    memStore = normaliseStore(JSON.parse(raw));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Cannot read verification store, using memory.", e);
    }
  }
  return memStore;
}

async function persistStore(store: VerificationStore) {
  memStore = store;
  writeLock = writeLock.then(async () => {
    await mkdir(dataDir, { recursive: true });
    await writeFile(storeFile, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  });
  await writeLock;
}

// Validate Malaysian IC format: 12 digits, valid date
export function validateIC(ic: string): { ok: boolean; message?: string } {
  const clean = ic.replace(/[-\s]/g, "");
  if (!/^\d{12}$/.test(clean)) {
    return { ok: false, message: "Nombor IC mesti mengandungi 12 digit." };
  }

  // Basic date check: YYMMDD
  const yy = parseInt(clean.slice(0, 2), 10);
  const mm = parseInt(clean.slice(2, 4), 10);
  const dd = parseInt(clean.slice(4, 6), 10);
  if (mm < 1 || mm > 12) return { ok: false, message: "Nombor IC tidak sah — bulan tidak tepat." };
  if (dd < 1 || dd > 31) return { ok: false, message: "Nombor IC tidak sah — tarikh tidak tepat." };
  void yy; // year is ambiguous (1900s vs 2000s), just check digits

  // PB code: digits 7-8, valid state codes 01-16 or 21-22 (Sabah/Sarawak) or 71-74, 82 (non-citizen/etc)
  // We keep this loose — just check it's 12 valid digits above
  return { ok: true };
}

export function validatePhone(phone: string): { ok: boolean; message?: string } {
  const clean = phone.replace(/[\s\-()]/g, "");
  // Malaysian numbers: 01X-XXXXXXX (10-11 digits starting with 01)
  if (!/^(\+?60|0)1\d{8,9}$/.test(clean)) {
    return { ok: false, message: "Sila masukkan nombor telefon Malaysia yang sah (cth: 011-12345678)." };
  }
  return { ok: true };
}

// Create a verification token after IC + phone validated
export async function createVerification(ic: string, phone: string): Promise<{ token: string }> {
  const store = await readStore();
  const now = new Date();
  const record: VerificationRecord = {
    token: randomUUID(),
    icHash: hashIC(ic),
    phone: phone.replace(/[\s\-()]/g, ""),
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + TOKEN_TTL_MS).toISOString(),
    used: false,
  };

  const next: VerificationStore = {
    version: 1,
    records: [record, ...store.records].slice(0, MAX_RECORDS),
  };
  await persistStore(next);
  return { token: record.token };
}

// Check if token is valid and unused, then mark as used
export async function consumeVerificationToken(token: string): Promise<{ ok: boolean; message?: string }> {
  if (!token || typeof token !== "string") {
    return { ok: false, message: "Token pengesahan tidak sah." };
  }

  const store = await readStore();
  const idx = store.records.findIndex((r) => r.token === token);
  if (idx === -1) return { ok: false, message: "Token pengesahan tidak dijumpai." };

  const record = store.records[idx];
  if (record.used) return { ok: false, message: "Token pengesahan sudah digunakan." };
  if (new Date(record.expiresAt) < new Date()) {
    return { ok: false, message: "Token pengesahan telah tamat tempoh. Sila sahkan semula." };
  }

  // Mark used
  const updated = { ...record, used: true, usedAt: new Date().toISOString() };
  const next: VerificationStore = {
    version: 1,
    records: store.records.map((r, i) => (i === idx ? updated : r)),
  };
  await persistStore(next);
  return { ok: true };
}
