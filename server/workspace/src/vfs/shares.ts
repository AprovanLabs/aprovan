/**
 * Person- and link-shares over workspace VFS paths (iw9-b D6 / artifact-sharing).
 *
 * Records live under `svc#vfs#shares / <shareId>`. Link keys are minted once,
 * stored only as `HMAC-SHA256(serverSecret, key)`, and resolved by recompute +
 * constant-time compare. A `_system` HMAC index lets the anonymous
 * `GET /share/:key` route find the tenant without putting workspaceId in the URL.
 *
 * Visibility (installability) is a separate axis — this module never reads
 * app manifests or directory rows.
 */

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { ulid } from "ulid";
import { normalizeFsPath } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

const SHARES_SCOPE = svcScope("vfs", "shares");
const SHARE_KEYS_SCOPE = svcScope("vfs", "share-keys");
const SHARE_KEYS_WORKSPACE = "_system";

/** HMAC key for link shares — override in prod; local/dev has a stable default. */
function serverSecret(): string {
  return process.env["VFS_SHARE_SECRET"] ?? process.env["WORKSPACE_SHARE_SECRET"] ?? "local-vfs-share-secret";
}

export type ShareKind = "person" | "link";

export interface VfsShareRecord {
  shareId: string;
  path: string;
  kind: ShareKind;
  /** Platform user sub when kind is "person". */
  grantee?: string;
  /** Hex HMAC-SHA256 digest when kind is "link". Never a usable key. */
  keyHmac?: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  revokedAt?: string;
}

export interface CreatePersonShareInput {
  path: string;
  grantee: string;
  expiresAt: string;
  createdBy: string;
}

export interface CreateLinkShareInput {
  path: string;
  expiresAt: string;
  createdBy: string;
}

export interface ResolvedLinkShare {
  workspaceId: string;
  share: VfsShareRecord;
}

function mintShareId(): string {
  return ulid().toLowerCase();
}

/** 256-bit key as base64url (returned once to the sharer). */
function mintLinkKey(): string {
  return randomBytes(32).toString("base64url");
}

export function hmacShareKey(key: string): string {
  return createHmac("sha256", serverSecret()).update(key, "utf8").digest("hex");
}

function hmacMatches(presented: string, storedHex: string): boolean {
  try {
    const a = Buffer.from(hmacShareKey(presented), "hex");
    const b = Buffer.from(storedHex, "hex");
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function normalizeSharePath(path: string): string {
  const normalized = normalizeFsPath(path);
  if (!normalized) {
    throw new ServiceError("path must be a workspace path", 400);
  }
  return normalized;
}

function parseExpiresAt(value: string): Date {
  const at = new Date(value);
  if (Number.isNaN(at.getTime())) {
    throw new ServiceError("expiresAt must be an ISO-8601 timestamp", 400);
  }
  return at;
}

function isShareActive(share: VfsShareRecord, now = new Date()): boolean {
  if (share.revokedAt) return false;
  return parseExpiresAt(share.expiresAt).getTime() > now.getTime();
}

/** True when `path` is the shared artifact or under a shared directory prefix. */
export function pathCoveredByShare(sharePath: string, path: string): boolean {
  return path === sharePath || path.startsWith(`${sharePath}/`);
}

async function writeShare(workspaceId: string, share: VfsShareRecord): Promise<void> {
  await writeSvcRecord(workspaceId, SHARES_SCOPE, share.shareId, share, share.createdBy);
}

export async function readShare(
  workspaceId: string,
  shareId: string,
): Promise<VfsShareRecord | undefined> {
  return readSvcRecord<VfsShareRecord>(workspaceId, SHARES_SCOPE, shareId);
}

export async function createPersonShare(
  workspaceId: string,
  input: CreatePersonShareInput,
): Promise<VfsShareRecord> {
  if (!input.grantee.trim()) {
    throw new ServiceError("grantee is required", 400);
  }
  parseExpiresAt(input.expiresAt);
  const share: VfsShareRecord = {
    shareId: mintShareId(),
    path: normalizeSharePath(input.path),
    kind: "person",
    grantee: input.grantee,
    expiresAt: input.expiresAt,
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  await writeShare(workspaceId, share);
  return share;
}

/**
 * Mint a link-share. Returns the plaintext key exactly once; only `keyHmac`
 * is persisted (plus a `_system` HMAC→tenant index for anonymous lookup).
 */
export async function createLinkShare(
  workspaceId: string,
  input: CreateLinkShareInput,
): Promise<{ share: VfsShareRecord; key: string }> {
  parseExpiresAt(input.expiresAt);
  const key = mintLinkKey();
  const keyHmac = hmacShareKey(key);
  const share: VfsShareRecord = {
    shareId: mintShareId(),
    path: normalizeSharePath(input.path),
    kind: "link",
    keyHmac,
    expiresAt: input.expiresAt,
    createdBy: input.createdBy,
    createdAt: new Date().toISOString(),
  };
  await writeShare(workspaceId, share);
  await writeSvcRecord(
    SHARE_KEYS_WORKSPACE,
    SHARE_KEYS_SCOPE,
    keyHmac,
    { workspaceId, shareId: share.shareId },
    input.createdBy,
  );
  return { share, key };
}

/**
 * Resolve a link key to its share. Expired / revoked / unknown all return
 * undefined (callers map that to indistinguishable 404).
 */
export async function resolveLinkShare(key: string): Promise<ResolvedLinkShare | undefined> {
  if (!key) return undefined;
  const keyHmac = hmacShareKey(key);
  const index = await readSvcRecord<{ workspaceId: string; shareId: string }>(
    SHARE_KEYS_WORKSPACE,
    SHARE_KEYS_SCOPE,
    keyHmac,
  ).catch(() => undefined);
  if (!index?.workspaceId || !index.shareId) return undefined;

  const share = await readShare(index.workspaceId, index.shareId);
  if (!share || share.kind !== "link" || !share.keyHmac) return undefined;
  if (!hmacMatches(key, share.keyHmac)) return undefined;
  if (!isShareActive(share)) return undefined;
  return { workspaceId: index.workspaceId, share };
}

export async function revokeShare(
  workspaceId: string,
  shareId: string,
  revokedBy: string,
): Promise<VfsShareRecord> {
  const share = await readShare(workspaceId, shareId);
  if (!share) throw new ServiceError(`Not found: share ${shareId}`, 404);
  if (share.revokedAt) return share;
  const next: VfsShareRecord = {
    ...share,
    revokedAt: new Date().toISOString(),
  };
  await writeShare(workspaceId, next);
  // Drop the HMAC index so resolveLinkShare cannot find it (same 404 as never-existed).
  if (share.kind === "link" && share.keyHmac) {
    await deleteSvcRecord(SHARE_KEYS_WORKSPACE, SHARE_KEYS_SCOPE, share.keyHmac);
  }
  void revokedBy;
  return next;
}

export async function listSharesCreatedBy(
  workspaceId: string,
  createdBy: string,
): Promise<VfsShareRecord[]> {
  const entries = await listSvcRecords<VfsShareRecord>(workspaceId, SHARES_SCOPE);
  return entries
    .map((e) => e.value)
    .filter((s) => s.createdBy === createdBy)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listSharesReceivedBy(
  workspaceId: string,
  grantee: string,
): Promise<VfsShareRecord[]> {
  const entries = await listSvcRecords<VfsShareRecord>(workspaceId, SHARES_SCOPE);
  const now = new Date();
  return entries
    .map((e) => e.value)
    .filter(
      (s) =>
        s.kind === "person" &&
        s.grantee === grantee &&
        isShareActive(s, now),
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/**
 * Does an active person-share grant `grantee` read access to `path`?
 * Checked at read time (not snapshotted) — revocation/expiry take effect
 * on the next request.
 */
export async function personShareAllowsRead(
  workspaceId: string,
  grantee: string,
  path: string,
): Promise<boolean> {
  const normalized = normalizeFsPath(path);
  if (!normalized) return false;
  const entries = await listSvcRecords<VfsShareRecord>(workspaceId, SHARES_SCOPE);
  const now = new Date();
  return entries.some(
    (e) =>
      e.value.kind === "person" &&
      e.value.grantee === grantee &&
      isShareActive(e.value, now) &&
      pathCoveredByShare(e.value.path, normalized),
  );
}
