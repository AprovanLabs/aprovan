/**
 * Sandbox records and host registrations — the durable half of
 * docs/sandboxes.md.
 *
 * Both live in the record store beside every other subsystem's state, so
 * they inherit tenancy and the backend split for free:
 *
 *   svc#sandboxes       / <id>   one live environment
 *   svc#sandboxes#hosts / <id>   one registered execution endpoint
 *
 * A sandbox record is *durable* rather than request-scoped because the hosts
 * worth using are: a Sprite keeps its filesystem across hibernation, and a
 * registered laptop keeps a directory on a real disk. The record is what makes
 * "the changes in that sandbox" answerable after the process that created it
 * is gone — it carries the base manifest of everything the workspace handed
 * over, which is the other side of every diff.
 */

import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcRecord,
  listSvcRecords,
  readSvcRecord,
  svcScope,
  writeSvcRecord,
} from "../svc-records.js";

const SANDBOXES_SCOPE = svcScope("sandboxes");
const HOSTS_SCOPE = svcScope("sandboxes", "hosts");

export type SandboxRecordStatus = "running" | "stopped" | "destroyed";

/**
 * Where a mount's content comes from. `vfs` (the default — absent on records
 * written before the field existed) is a workspace prefix; `repo` is an
 * external Git repository named by a `github:owner/repo[#ref[/sub/path]]`
 * source string, parsed into {@link RepoMountRef} at declaration time.
 */
export type SandboxMountKind = "vfs" | "repo";

/** A parsed `github:` mount source. */
export interface RepoMountRef {
  /** Credential provider / hosting vendor. Only "github" exists today. */
  provider: "github";
  /** `owner/name`. */
  repo: string;
  /** Branch, tag, or commit; the repo's default branch when absent. */
  ref?: string;
  /** Subdirectory within the repo, when only a slice is wanted. */
  path?: string;
}

/**
 * A directory inside the sandbox backed by a workspace prefix.
 *
 * `source: null` is a scratch mount: real inside the box, invisible to the
 * workspace, never committed. That is the "outside VCS" case in its purest
 * form and it costs nothing to support — a mount with no source is simply
 * skipped by every sync and commit pass.
 *
 * A `kind: "repo"` mount is backed by a Git repository instead of the
 * workspace: materialized as a real `git clone` on machine hosts and as a
 * tree-API snapshot everywhere else, and never committed back through the
 * workspace (changes leave through git itself — branch, commit, push).
 */
export interface SandboxMount {
  /** Path inside the sandbox, relative to the image workdir. */
  path: string;
  /** Workspace VFS prefix, a `github:` repo spec, or null for scratch. */
  source: string | null;
  /** Absent means `vfs` — records predate the field. */
  kind?: SandboxMountKind;
  /** Parsed repo reference, present exactly when `kind` is "repo". */
  repo?: RepoMountRef;
  mode: "ro" | "rw";
  /** Whether changes come back to the workspace at all. */
  track: boolean;
  /** `{relative path → sha256}` of what was materialized into the sandbox. */
  base: Record<string, string>;
  /** When `base` was last (re)established. */
  syncedAt: string;
}

export interface SandboxRecord {
  id: string;
  /**
   * The registered host this sandbox lives on, when the provider addresses
   * hosts individually. Pinned at create: a workspace with two laptops must
   * keep talking to the one holding the files.
   */
  hostId?: string;
  name: string;
  /** Concrete provider the `sandbox` interface resolved to at create time. */
  provider: string;
  /** The driver's own id for this environment. */
  externalId: string;
  /** Image spec, when one was named. */
  image?: string;
  workdir: string;
  status: SandboxRecordStatus;
  mounts: SandboxMount[];
  /** Chat session whose overlay receives commits (staged sessions only). */
  sessionId?: string;
  /** Agent profile whose grants bounded this sandbox. */
  agent?: string;
  url?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

/**
 * A registered execution endpoint. For the `machine` provider this is one
 * computer running `aprovan sandbox host run`; the two tokens are
 * deliberately distinct principals:
 *
 *   - `hostToken`   — the agent's. Leases work and answers it.
 *   - `clientToken` — the workspace's, stored as the `machine` credential.
 *     Enqueues work. It cannot lease or answer, so a leaked workspace
 *     credential cannot impersonate the machine.
 *
 * Only digests are stored; the plaintext is shown once at registration.
 */
export interface SandboxHostRecord {
  id: string;
  name: string;
  provider: string;
  /** Root directory the agent confines every working directory to. */
  root?: string;
  /**
   * Sandbox images this host offers to run — the match key for scheduled
   * runs (see queue.ts). Declared at registration.
   */
  images?: string[];
  /**
   * Images whose requirements the agent actually verified on the machine.
   * Set by the capability handshake; until it runs, `images` is taken on
   * trust. A declared-but-unverified image is the difference between "I was
   * told this box has Node" and "I watched it answer `node --version`".
   */
  verifiedImages?: string[];
  /** Binaries the agent found on PATH during the handshake. */
  tools?: string[];
  /** `darwin/arm64`, `linux/x64`, … as reported by the agent. */
  platform?: string;
  hostTokenHash: string;
  clientTokenHash: string;
  createdBy: string;
  createdAt: string;
  lastSeenAt?: string;
}

const ID_RE = /^[A-Za-z0-9][\w-]{0,63}$/u;

export function sandboxIdent(value: unknown, label: string): string {
  if (typeof value !== "string" || !ID_RE.test(value)) {
    throw new ServiceError(`${label} must match ${ID_RE}`, 400);
  }
  return value;
}

export function newSandboxId(): string {
  return `sbx_${randomUUID().replaceAll("-", "").slice(0, 20)}`;
}

export function newHostId(): string {
  return `sbh_${randomUUID().replaceAll("-", "").slice(0, 20)}`;
}

export function mintToken(prefix: string): string {
  return `${prefix}_${randomBytes(24).toString("base64url")}`;
}

export function tokenDigest(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time digest comparison — tokens are secrets, not identifiers. */
export function tokenMatches(token: string, digest: string): boolean {
  const candidate = Buffer.from(tokenDigest(token), "hex");
  const expected = Buffer.from(digest, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

// ---------------------------------------------------------------------------
// Sandboxes
// ---------------------------------------------------------------------------

export async function readSandbox(
  workspaceId: string,
  id: string,
): Promise<SandboxRecord | undefined> {
  return readSvcRecord<SandboxRecord>(workspaceId, SANDBOXES_SCOPE, sandboxIdent(id, "id")).catch(
    () => undefined,
  );
}

export async function requireSandbox(
  workspaceId: string,
  id: unknown,
): Promise<SandboxRecord> {
  const record = await readSandbox(workspaceId, sandboxIdent(id, "id"));
  if (!record) throw new ServiceError(`Unknown sandbox: ${String(id)}`, 404);
  if (record.status === "destroyed") {
    throw new ServiceError(`Sandbox ${record.id} was destroyed`, 410);
  }
  return record;
}

export async function saveSandbox(
  workspaceId: string,
  record: SandboxRecord,
): Promise<SandboxRecord> {
  record.updatedAt = new Date().toISOString();
  await writeSvcRecord(workspaceId, SANDBOXES_SCOPE, record.id, record, record.createdBy);
  return record;
}

export async function listSandboxes(workspaceId: string): Promise<SandboxRecord[]> {
  const entries = await listSvcRecords<Partial<SandboxRecord>>(workspaceId, SANDBOXES_SCOPE);
  const records = entries
    .map((entry) => entry.value)
    .filter(
      (record): record is SandboxRecord =>
        typeof record.id === "string" && typeof record.createdAt === "string",
    );
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteSandbox(workspaceId: string, id: string): Promise<void> {
  await deleteSvcRecord(workspaceId, SANDBOXES_SCOPE, id);
}

// ---------------------------------------------------------------------------
// Hosts
// ---------------------------------------------------------------------------

export async function readHost(
  workspaceId: string,
  id: string,
): Promise<SandboxHostRecord | undefined> {
  return readSvcRecord<SandboxHostRecord>(
    workspaceId,
    HOSTS_SCOPE,
    sandboxIdent(id, "host"),
  ).catch(() => undefined);
}

export async function saveHost(
  workspaceId: string,
  record: SandboxHostRecord,
): Promise<SandboxHostRecord> {
  await writeSvcRecord(workspaceId, HOSTS_SCOPE, record.id, record, record.createdBy);
  return record;
}

export async function listHosts(workspaceId: string): Promise<SandboxHostRecord[]> {
  const entries = await listSvcRecords<SandboxHostRecord>(workspaceId, HOSTS_SCOPE);
  return entries.map((entry) => entry.value).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function deleteHost(workspaceId: string, id: string): Promise<boolean> {
  return deleteSvcRecord(workspaceId, HOSTS_SCOPE, sandboxIdent(id, "host"));
}

/** Public view of a host — never the digests. */
export function hostSummary(host: SandboxHostRecord): Omit<
  SandboxHostRecord,
  "hostTokenHash" | "clientTokenHash"
> {
  const { hostTokenHash: _h, clientTokenHash: _c, ...summary } = host;
  return summary;
}
