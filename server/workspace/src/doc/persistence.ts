/**
 * Durable CRDT state for live docs — snapshot + ordered update log under
 * svc-records (tech-plan D4/D6; specs/document-persistence).
 *
 *   svc#doc#snapshot            / <docKey>              → snapshot record
 *   svc#doc#updates#<docKey>    / <seq10>#<updateId>    → one update each
 */

import * as Y from "yjs";
import { getFsStore } from "../fs-store.js";
import {
  deleteSvcRecord,
  listSvcKeys,
  listSvcRecords,
  parseSeqKey,
  readSvcRecord,
  seqKey,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

/** Mutable compaction thresholds (D6). Override fields in tests. */
export const DOC_COMPACT = {
  SIZE_BYTES: 256 * 1024,
  AGE_MS: 24 * 60 * 60 * 1000,
};

/** Default size threshold (tech-plan name). Prefer mutating `DOC_COMPACT.SIZE_BYTES`. */
export const DOC_COMPACT_SIZE_BYTES = 256 * 1024;
/** Default age threshold (tech-plan name). Prefer mutating `DOC_COMPACT.AGE_MS`. */
export const DOC_COMPACT_AGE_MS = 24 * 60 * 60 * 1000;

const SNAPSHOT_SCOPE = svcScope("doc", "snapshot");

type SnapshotRecord = {
  data: string;
  updatedAt: string;
  /** FS content hash when this durable state was initialized / last re-based. */
  fileHash?: string;
};

type UpdateRecord = {
  data: string;
  createdAt: string;
};

/** Same key shape as registry `docKey` — kept local to avoid a cycle. */
function persistenceKey(workspaceId: string, path: string): string {
  return `${workspaceId}\0${path}`;
}

function updatesScope(key: string): string {
  return svcScope("doc", "updates", key);
}

function encodeUpdate(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

function decodeUpdate(data: string): Uint8Array {
  return new Uint8Array(Buffer.from(data, "base64"));
}

function contentText(doc: Y.Doc): Y.Text {
  return doc.getText("content");
}

async function writeSnapshot(
  workspaceId: string,
  key: string,
  doc: Y.Doc,
  fileHash: string | undefined,
): Promise<void> {
  const record: SnapshotRecord = {
    data: encodeUpdate(Y.encodeStateAsUpdate(doc)),
    updatedAt: new Date().toISOString(),
    ...(fileHash !== undefined ? { fileHash } : {}),
  };
  await writeSvcRecord(workspaceId, SNAPSHOT_SCOPE, key, record);
}

async function clearUpdateLog(workspaceId: string, key: string): Promise<void> {
  const scope = updatesScope(key);
  const keys = await listSvcKeys(workspaceId, scope);
  for (const entryKey of keys) {
    await deleteSvcRecord(workspaceId, scope, entryKey);
  }
}

async function initFromFile(
  workspaceId: string,
  path: string,
  key: string,
): Promise<Y.Doc> {
  const file = await getFsStore().read(workspaceId, path);
  const doc = new Y.Doc();
  if (file?.content) {
    contentText(doc).insert(0, file.content);
  }
  await writeSnapshot(workspaceId, key, doc, file?.hash);
  await clearUpdateLog(workspaceId, key);
  return doc;
}

/**
 * Reconstruct a Y.Doc from durable snapshot + log, or initialize from the
 * current file when durable state is missing or the file was restored under
 * the CRDT (specs/document-persistence "First open" / "Restore wins").
 */
export async function loadDurable(workspaceId: string, path: string): Promise<Y.Doc> {
  const key = persistenceKey(workspaceId, path);
  const file = await getFsStore().read(workspaceId, path);
  const snapshot = await readSvcRecord<SnapshotRecord>(workspaceId, SNAPSHOT_SCOPE, key);

  if (!snapshot) {
    return initFromFile(workspaceId, path, key);
  }

  // External file change (e.g. vcs.restore) while no live session — re-init.
  if ((file?.hash ?? undefined) !== (snapshot.fileHash ?? undefined)) {
    return initFromFile(workspaceId, path, key);
  }

  const doc = new Y.Doc();
  Y.applyUpdate(doc, decodeUpdate(snapshot.data));
  const entries = await listSvcRecords<UpdateRecord>(workspaceId, updatesScope(key));
  for (const entry of entries) {
    Y.applyUpdate(doc, decodeUpdate(entry.value.data));
  }
  return doc;
}

/**
 * Append one update (or several in one call) as individual seq-keyed records.
 */
export async function appendUpdate(
  workspaceId: string,
  path: string,
  update: Uint8Array | readonly Uint8Array[],
): Promise<void> {
  const key = persistenceKey(workspaceId, path);
  const scope = updatesScope(key);
  const batch: Uint8Array[] =
    update instanceof Uint8Array ? [update] : [...update];

  const keys = await listSvcKeys(workspaceId, scope);
  let nextSeq = 0;
  for (const existing of keys) {
    const parsed = parseSeqKey(existing);
    if (parsed && parsed.seq >= nextSeq) nextSeq = parsed.seq + 1;
  }

  const now = new Date().toISOString();
  for (const bytes of batch) {
    const entryKey = seqKey(nextSeq, crypto.randomUUID());
    nextSeq += 1;
    const record: UpdateRecord = { data: encodeUpdate(bytes), createdAt: now };
    await writeSvcRecord(workspaceId, scope, entryKey, record);
  }
}

/**
 * Compact when the update log exceeds size or age thresholds (D6). Writes the
 * new snapshot before deleting covered log entries so readers never observe a
 * torn mix (Yjs treats redundant log replay as idempotent if they race).
 */
export async function compactIfDue(workspaceId: string, path: string): Promise<void> {
  const key = persistenceKey(workspaceId, path);
  const scope = updatesScope(key);
  const entries = await listSvcRecords<UpdateRecord>(workspaceId, scope);
  if (entries.length === 0) return;

  let totalBytes = 0;
  let oldestMs = Number.POSITIVE_INFINITY;
  for (const entry of entries) {
    totalBytes += decodeUpdate(entry.value.data).byteLength;
    const created = Date.parse(entry.value.createdAt);
    if (Number.isFinite(created) && created < oldestMs) oldestMs = created;
  }

  const sizeDue = totalBytes >= DOC_COMPACT.SIZE_BYTES;
  const ageDue =
    Number.isFinite(oldestMs) && Date.now() - oldestMs >= DOC_COMPACT.AGE_MS;
  if (!sizeDue && !ageDue) return;

  const snapshot = await readSvcRecord<SnapshotRecord>(workspaceId, SNAPSHOT_SCOPE, key);
  const doc = new Y.Doc();
  try {
    if (snapshot) Y.applyUpdate(doc, decodeUpdate(snapshot.data));
    for (const entry of entries) {
      Y.applyUpdate(doc, decodeUpdate(entry.value.data));
    }
    const file = await getFsStore().read(workspaceId, path);
    await writeSnapshot(workspaceId, key, doc, file?.hash ?? snapshot?.fileHash);
    for (const entry of entries) {
      await deleteSvcRecord(workspaceId, scope, entry.key);
    }
  } finally {
    doc.destroy();
  }
}
