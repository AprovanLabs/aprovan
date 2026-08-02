/**
 * VFS mounts — a path prefix backed by an external store
 * (docs/vcs-and-sessions.md). The same read semantics, other backing:
 *
 *   record svc#vcs#mounts / mounts
 *   [{ prefix: "vendor/charts", type: "git",
 *      config: { repo: "org/charts", ref: "main", path: "src" }, mode: "read" }]
 *
 * v1 scope, deliberately narrow:
 * - `git` — read-through to a GitHub repo at a pinned ref (branch, tag, or
 *   commit) using the workspace's `github` credential (or anonymously for
 *   public repos). The git blob sha serves as the entry hash: not sha256,
 *   but a stable version token for the mounted view.
 * - `s3` — read-through to an S3 bucket/prefix using the gateway's own AWS
 *   credentials (grant the gateway role access via bucket policy).
 *   Workspace-credential-backed S3 access comes with the credential-grant
 *   workstream.
 * - `crdt` — reserved: the type is modeled (a CRDT-backed prefix is live and
 *   unversioned-by-us) but mounting one is rejected until a provider exists.
 * - All mounts are read-only in v1: writes and deletes under a mounted
 *   prefix fail with 403 whatever `mode` says; `mode` is stored so
 *   `readwrite` s3 can light up without a schema change.
 * - Mounted content never enters the FS store, so snapshots/commits keep
 *   covering exactly the native tree. What they DO record is mount lineage
 *   (specs/mount-lineage): a deterministic version token per mount in the
 *   snapshot and a timestamped provenance record on the commit — see
 *   {@link collectMountLineage}.
 */

import { createHash } from "node:crypto";
import { getCredentialStore } from "../credentials.js";
import { getFsStore, normalizeFsPath, type FsEntry, type FsFile, type S3 } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import { readSvcRecord, svcScope, writeSvcRecord } from "../svc-records.js";
import type { S3Client } from "@aws-sdk/client-s3";

const MOUNTS_SCOPE = svcScope("vcs", "mounts");
const MOUNTS_KEY = "mounts";

export type MountType = "git" | "s3" | "crdt";

export interface VfsMount {
  prefix: string;
  type: MountType;
  mode: "read" | "readwrite";
  config: Record<string, unknown>;
  createdBy: string;
  createdAt: string;
}

/**
 * `readMounts` used to re-read the mounts document on every FS op (list,
 * read, write, delete all call `assertNotMounted`/`mountEntries`/
 * `mountRead`) — a store read per request for state that changes rarely.
 * Cached per workspace with a 30s TTL (specs/record-store "Cached mounts
 * read"; storage is the `svc#vcs#mounts` record), and invalidated
 * synchronously by `addMount`/`removeMount` so a mount change is visible to
 * the very next read in this process.
 */
const MOUNTS_CACHE_TTL_MS = 30_000;

interface MountsCacheEntry {
  mounts: VfsMount[];
  expiresAt: number;
}

const mountsCache = new Map<string, MountsCacheEntry>();

function invalidateMountsCache(workspaceId: string): void {
  mountsCache.delete(workspaceId);
}

/** Test hook: drop every cached mounts list. */
export function resetMountsCache(): void {
  mountsCache.clear();
}

async function loadMounts(workspaceId: string): Promise<VfsMount[]> {
  const parsed = await readSvcRecord<unknown>(workspaceId, MOUNTS_SCOPE, MOUNTS_KEY).catch(
    () => undefined,
  );
  return Array.isArray(parsed) ? (parsed as VfsMount[]) : [];
}

export async function readMounts(workspaceId: string): Promise<VfsMount[]> {
  const cached = mountsCache.get(workspaceId);
  if (cached && cached.expiresAt > Date.now()) return cached.mounts;
  const mounts = await loadMounts(workspaceId);
  mountsCache.set(workspaceId, { mounts, expiresAt: Date.now() + MOUNTS_CACHE_TTL_MS });
  return mounts;
}

async function saveMounts(workspaceId: string, mounts: VfsMount[]): Promise<void> {
  await writeSvcRecord(workspaceId, MOUNTS_SCOPE, MOUNTS_KEY, mounts);
  invalidateMountsCache(workspaceId);
}

export async function addMount(
  workspaceId: string,
  userId: string,
  options: {
    prefix: string;
    type: string;
    config: Record<string, unknown>;
    mode?: string;
  },
): Promise<VfsMount> {
  const prefix = normalizeFsPath(options.prefix);
  if (!prefix) throw new ServiceError("prefix must be a workspace-relative path", 400);
  if (prefix.startsWith(".")) throw new ServiceError("prefix must not be hidden", 400);

  if (options.type === "crdt") {
    throw new ServiceError(
      'Mount type "crdt" is reserved — no provider is implemented yet (see docs/vcs-and-sessions.md)',
      501,
    );
  }
  if (options.type !== "git" && options.type !== "s3") {
    throw new ServiceError('type must be "git" or "s3"', 400);
  }
  if (options.type === "git" && typeof options.config["repo"] !== "string") {
    throw new ServiceError('git mounts need config.repo ("owner/name")', 400);
  }
  if (options.type === "s3" && typeof options.config["bucket"] !== "string") {
    throw new ServiceError("s3 mounts need config.bucket", 400);
  }

  const mounts = await readMounts(workspaceId);
  const overlaps = (a: string, b: string): boolean =>
    a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`);
  if (mounts.some((mount) => overlaps(mount.prefix, prefix))) {
    throw new ServiceError(`A mount already covers ${prefix}`, 409);
  }
  // The mount shadows nothing: native files under the prefix would become
  // unreachable, so refuse while any exist.
  const native = await getFsStore().list(workspaceId, prefix, { limit: 1 });
  if (native.entries.length > 0) {
    throw new ServiceError(
      `${prefix} has workspace file(s) — move or delete them before mounting over it`,
      409,
    );
  }

  const mount: VfsMount = {
    prefix,
    type: options.type,
    mode: options.mode === "readwrite" ? "readwrite" : "read",
    config: options.config,
    createdBy: userId,
    createdAt: new Date().toISOString(),
  };
  await saveMounts(workspaceId, [...mounts, mount]);
  return mount;
}

export async function removeMount(workspaceId: string, prefix: string): Promise<boolean> {
  const normalized = normalizeFsPath(prefix);
  const mounts = await readMounts(workspaceId);
  const next = mounts.filter((mount) => mount.prefix !== normalized);
  if (next.length === mounts.length) return false;
  await saveMounts(workspaceId, next);
  return true;
}

/** The mount covering `path`, if any. */
export function mountFor(mounts: VfsMount[], path: string): VfsMount | undefined {
  return mounts.find(
    (mount) => path === mount.prefix || path.startsWith(`${mount.prefix}/`),
  );
}

/** Throw when `path` sits under a mount (writes/deletes — v1 is read-only). */
export async function assertNotMounted(workspaceId: string, path: string): Promise<void> {
  const mounts = await readMounts(workspaceId).catch(() => []);
  const mount = mountFor(mounts, path);
  if (mount) {
    throw new ServiceError(
      `${mount.prefix} is a read-only ${mount.type} mount`,
      403,
    );
  }
}

// ---------------------------------------------------------------------------
// git (GitHub) read-through
// ---------------------------------------------------------------------------

const GIT_TREE_TTL_MS = 60_000;
const gitTreeCache = new Map<
  string,
  { entries: Array<{ path: string; sha: string; size: number }>; expiresAt: number }
>();

/** GitHub REST root — overridable so tests can stand in a local server. */
export function githubApiBase(): string {
  return (process.env["GITHUB_API_URL"] ?? "https://api.github.com").replace(/\/+$/u, "");
}

/**
 * The workspace's stored GitHub token, when one is connected. Exported for
 * the sandbox repo-mount path, which hands it to a machine host so `git
 * clone` can reach private repos — the same credential this module's
 * read-through already uses.
 */
export async function githubToken(workspaceId: string): Promise<string | undefined> {
  const record = await getCredentialStore()
    .resolveRecordForProvider(workspaceId, "github")
    .catch(() => undefined);
  const payload = record?.payload as
    | { token?: string; value?: string }
    | undefined;
  return payload?.token ?? payload?.value;
}

async function githubFetch(
  workspaceId: string,
  url: string,
): Promise<Response> {
  const token = await githubToken(workspaceId);
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "aprovan-gateway",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!response.ok) {
    throw new ServiceError(`GitHub mount fetch failed (${response.status})`, 502);
  }
  return response;
}

interface GitConfig {
  repo: string;
  ref?: string;
  path?: string;
}

async function gitTree(
  workspaceId: string,
  config: GitConfig,
): Promise<Array<{ path: string; sha: string; size: number }>> {
  const ref = config.ref || "main";
  const key = `${workspaceId}:${config.repo}@${ref}`;
  const cached = gitTreeCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.entries;
  const response = await githubFetch(
    workspaceId,
    `${githubApiBase()}/repos/${config.repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
  );
  const body = (await response.json()) as {
    tree?: Array<{ path?: string; type?: string; sha?: string; size?: number }>;
  };
  const entries = (body.tree ?? [])
    .filter((node) => node.type === "blob" && node.path && node.sha)
    .map((node) => ({ path: node.path!, sha: node.sha!, size: node.size ?? 0 }));
  gitTreeCache.set(key, { entries, expiresAt: Date.now() + GIT_TREE_TTL_MS });
  return entries;
}

const MOUNT_MIME: Record<string, string> = {
  ts: "text/typescript",
  tsx: "text/typescript",
  js: "text/javascript",
  jsx: "text/javascript",
  json: "application/json",
  md: "text/markdown",
  css: "text/css",
  html: "text/html",
};

const mountMime = (path: string): string =>
  MOUNT_MIME[path.split(".").pop() ?? ""] ?? "text/plain";

async function gitList(
  workspaceId: string,
  mount: VfsMount,
  prefix: string,
): Promise<FsEntry[]> {
  const config = mount.config as unknown as GitConfig;
  const root = config.path ? `${config.path.replace(/\/+$/u, "")}/` : "";
  const tree = await gitTree(workspaceId, config);
  return tree
    .filter((node) => node.path.startsWith(root))
    .map((node) => ({
      path: `${mount.prefix}/${node.path.slice(root.length)}`,
      hash: node.sha,
      mimeType: mountMime(node.path),
      size: node.size,
      updatedAt: mount.createdAt,
    }))
    .filter(
      (entry) =>
        !prefix || entry.path === prefix || entry.path.startsWith(`${prefix}/`),
    );
}

/** One file body at `repoPath` in the repo, via the contents API. */
async function gitReadRepoPath(
  workspaceId: string,
  config: GitConfig,
  repoPath: string,
): Promise<{ content: string; sha: string; size: number } | undefined> {
  const ref = config.ref || "main";
  let body: { content?: string; encoding?: string; sha?: string; size?: number };
  try {
    const response = await githubFetch(
      workspaceId,
      `${githubApiBase()}/repos/${config.repo}/contents/${repoPath
        .split("/")
        .map(encodeURIComponent)
        .join("/")}?ref=${encodeURIComponent(ref)}`,
    );
    body = (await response.json()) as typeof body;
  } catch {
    return undefined;
  }
  if (typeof body.content !== "string") return undefined;
  const content =
    body.encoding === "base64"
      ? Buffer.from(body.content, "base64").toString("utf8")
      : body.content;
  return {
    content,
    sha: body.sha ?? "",
    size: body.size ?? Buffer.byteLength(content),
  };
}

async function gitRead(
  workspaceId: string,
  mount: VfsMount,
  path: string,
): Promise<FsFile | undefined> {
  const config = mount.config as unknown as GitConfig;
  const relative = path.slice(mount.prefix.length + 1);
  const repoPath = config.path
    ? `${config.path.replace(/\/+$/u, "")}/${relative}`
    : relative;
  const file = await gitReadRepoPath(workspaceId, config, repoPath);
  if (!file) return undefined;
  return {
    path,
    hash: file.sha,
    mimeType: mountMime(path),
    size: file.size,
    updatedAt: mount.createdAt,
    content: file.content,
  };
}

// ---------------------------------------------------------------------------
// Repo snapshots — the tree-API read path, addressable without a VFS mount.
//
// Sandbox repo mounts (sandboxes/repo-mounts.ts) and agent-profile repo
// mounts reuse exactly the machinery the `git` VFS mount runs on: the same
// tree listing, the same contents reads, the same credential. The only
// difference is that the caller names the repo directly instead of a mounted
// prefix.
// ---------------------------------------------------------------------------

/** What a snapshot caller names: a repo, a ref, optionally a subdirectory. */
export interface RepoSnapshotRef {
  repo: string;
  ref?: string;
  path?: string;
}

/**
 * List a repo slice's files, paths relative to `source.path` (or the repo
 * root). Blob shas are version tokens, not content hashes.
 */
export async function listRepoFiles(
  workspaceId: string,
  source: RepoSnapshotRef,
): Promise<Array<{ path: string; sha: string; size: number }>> {
  const config: GitConfig = { repo: source.repo, ...(source.ref ? { ref: source.ref } : {}) };
  const root = source.path ? `${source.path.replace(/\/+$/u, "")}/` : "";
  const tree = await gitTree(workspaceId, config);
  return tree
    .filter((node) => node.path.startsWith(root))
    .map((node) => ({ path: node.path.slice(root.length), sha: node.sha, size: node.size }));
}

/** Read one file (path relative to `source.path`) from a repo slice. */
export async function readRepoFile(
  workspaceId: string,
  source: RepoSnapshotRef,
  relative: string,
): Promise<{ content: string; sha: string; size: number } | undefined> {
  const config: GitConfig = { repo: source.repo, ...(source.ref ? { ref: source.ref } : {}) };
  const repoPath = source.path
    ? `${source.path.replace(/\/+$/u, "")}/${relative}`
    : relative;
  return gitReadRepoPath(workspaceId, config, repoPath);
}

// ---------------------------------------------------------------------------
// s3 read-through (gateway credentials)
// ---------------------------------------------------------------------------

interface S3Config {
  bucket: string;
  prefix?: string;
  region?: string;
}

const s3Clients = new Map<string, S3Client>();

/**
 * A client for the mount's region plus the command classes. Loaded on demand
 * (see ../db/client.ts): an s3 mount is the only thing in this module that
 * needs the AWS SDK, and local mode must not pay for it. Repeat calls hit the
 * module cache, so only the first one resolves anything.
 */
async function mountS3(config: S3Config): Promise<S3> {
  const mod = await import("@aws-sdk/client-s3");
  const region = config.region ?? process.env["AWS_REGION"] ?? "us-east-1";
  let client = s3Clients.get(region);
  if (!client) {
    client = new mod.S3Client({ region });
    s3Clients.set(region, client);
  }
  return { ...mod, client };
}

async function s3List(mount: VfsMount, prefix: string): Promise<FsEntry[]> {
  const config = mount.config as unknown as S3Config;
  const root = config.prefix ? `${config.prefix.replace(/\/+$/u, "")}/` : "";
  const entries: FsEntry[] = [];
  let token: string | undefined;
  const { client, ListObjectsV2Command } = await mountS3(config);
  do {
    const page = await client.send(
      new ListObjectsV2Command({
        Bucket: config.bucket,
        Prefix: root,
        ContinuationToken: token,
      }),
    );
    for (const object of page.Contents ?? []) {
      if (!object.Key || object.Key.endsWith("/")) continue;
      const path = `${mount.prefix}/${object.Key.slice(root.length)}`;
      if (prefix && path !== prefix && !path.startsWith(`${prefix}/`)) continue;
      entries.push({
        path,
        hash: (object.ETag ?? "").replaceAll('"', ""),
        mimeType: mountMime(path),
        size: object.Size ?? 0,
        updatedAt: object.LastModified?.toISOString() ?? mount.createdAt,
      });
    }
    token = page.NextContinuationToken;
  } while (token);
  return entries;
}

async function s3Read(mount: VfsMount, path: string): Promise<FsFile | undefined> {
  const config = mount.config as unknown as S3Config;
  const root = config.prefix ? `${config.prefix.replace(/\/+$/u, "")}/` : "";
  const key = root + path.slice(mount.prefix.length + 1);
  try {
    const { client, GetObjectCommand } = await mountS3(config);
    const object = await client.send(
      new GetObjectCommand({ Bucket: config.bucket, Key: key }),
    );
    const content = (await object.Body?.transformToString("utf8")) ?? "";
    return {
      path,
      hash: (object.ETag ?? "").replaceAll('"', ""),
      mimeType: object.ContentType ?? mountMime(path),
      size: Number(object.ContentLength ?? Buffer.byteLength(content)),
      updatedAt: object.LastModified?.toISOString() ?? mount.createdAt,
      content,
    };
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------

/** Entries for every mount intersecting `prefix` (best-effort per mount). */
export async function mountEntries(
  workspaceId: string,
  prefix = "",
): Promise<FsEntry[]> {
  const mounts = await readMounts(workspaceId).catch(() => []);
  const relevant = mounts.filter(
    (mount) =>
      !prefix ||
      mount.prefix === prefix ||
      mount.prefix.startsWith(`${prefix}/`) ||
      prefix.startsWith(`${mount.prefix}/`),
  );
  const listings = await Promise.all(
    relevant.map((mount) =>
      (mount.type === "git" ? gitList(workspaceId, mount, prefix) : s3List(mount, prefix)).catch(
        () => [] as FsEntry[],
      ),
    ),
  );
  return listings.flat();
}

/** Read `path` when it sits under a mount; undefined when it doesn't. */
export async function mountRead(
  workspaceId: string,
  path: string,
): Promise<FsFile | undefined | "not-mounted"> {
  const mounts = await readMounts(workspaceId).catch(() => []);
  const mount = mountFor(mounts, path);
  if (!mount) return "not-mounted";
  return mount.type === "git" ? gitRead(workspaceId, mount, path) : s3Read(mount, path);
}

// ---------------------------------------------------------------------------
// Mount lineage — what version of the world each mount was at commit time
// (specs/mount-lineage; tech-plan data-auth-model D4/D5).
//
// Two shapes, deliberately split: the SNAPSHOT side is deterministic (no
// timestamps) so identical trees over identical mount states keep producing
// identical snapshot ids; the COMMIT side carries the timestamped provenance
// record (mirroring the bundler's ProvenanceManifest.source). Resolution
// failure degrades to `versionToken: null` with provenance still recorded —
// committing never gains a hard dependency on external availability.
// ---------------------------------------------------------------------------

/** Snapshot-side lineage entry — deterministic, part of snapshot identity. */
export interface MountLineageEntry {
  prefix: string;
  type: "git" | "s3";
  /** sha256 of the mount's canonical (sorted-key) config JSON. */
  configHash: string;
  /** git: resolved commit SHA; s3: sha256 over sorted "<etag> <path>" listing
   *  lines; null when resolution failed at snapshot time. */
  versionToken: string | null;
}

/** Commit-side provenance record — timestamped, never in snapshot identity. */
export interface MountProvenance {
  prefix: string;
  source:
    | { type: "git"; repo: string; ref: string; path?: string }
    | { type: "s3"; bucket: string; prefix?: string; region?: string };
  /** Fetch origin, e.g. "api.github.com" or "<bucket>.s3.<region>.amazonaws.com". */
  originDomain: string;
  /** ISO time of resolution — set even when resolution failed. */
  retrievedAt: string;
}

/** sha256 over the config with sorted keys, so key order can't change it. */
function canonicalConfigHash(config: Record<string, unknown>): string {
  const canonical = JSON.stringify(
    Object.fromEntries(Object.entries(config).sort(([a], [b]) => a.localeCompare(b))),
  );
  return createHash("sha256").update(canonical).digest("hex");
}

/** Resolve a git mount's ref to the commit SHA it points at right now —
 *  one commits-API call through the same credentialed fetch reads use. */
async function resolveGitCommitSha(
  workspaceId: string,
  config: GitConfig,
): Promise<string> {
  const ref = config.ref || "main";
  const response = await githubFetch(
    workspaceId,
    `${githubApiBase()}/repos/${config.repo}/commits/${encodeURIComponent(ref)}`,
  );
  const body = (await response.json()) as { sha?: string };
  if (!body.sha) throw new ServiceError("GitHub commit resolution returned no sha", 502);
  return body.sha;
}

/** Deterministic s3 token: sha256 over the sorted "<etag> <path>" lines of
 *  the mount's current listing (the same walk reads already run). */
async function s3ListingToken(mount: VfsMount): Promise<string> {
  const entries = await s3List(mount, "");
  const lines = entries.map((entry) => `${entry.hash} ${entry.path}`).sort();
  return createHash("sha256").update(lines.join("\n")).digest("hex");
}

/**
 * Resolve every active mount once: lineage entries (for the snapshot) plus
 * provenance records (for the commit), sorted by prefix. Per-mount failures
 * yield `versionToken: null` with provenance still populated — the commit
 * proceeds (spec "Lineage capture degrades without blocking commits").
 */
export async function collectMountLineage(workspaceId: string): Promise<{
  entries: MountLineageEntry[];
  provenance: MountProvenance[];
}> {
  const all: VfsMount[] = await readMounts(workspaceId).catch(() => []);
  const mounts = all
    .filter((mount): mount is VfsMount & { type: "git" | "s3" } =>
      mount.type === "git" || mount.type === "s3",
    )
    .sort((a, b) => a.prefix.localeCompare(b.prefix));

  const entries: MountLineageEntry[] = [];
  const provenance: MountProvenance[] = [];
  for (const mount of mounts) {
    const configHash = canonicalConfigHash(mount.config);
    let versionToken: string | null = null;
    let source: MountProvenance["source"];
    let originDomain: string;
    if (mount.type === "git") {
      const config = mount.config as unknown as GitConfig;
      source = {
        type: "git",
        repo: config.repo,
        ref: config.ref || "main",
        ...(config.path ? { path: config.path } : {}),
      };
      originDomain = new URL(githubApiBase()).hostname;
      versionToken = await resolveGitCommitSha(workspaceId, config).catch(() => null);
    } else {
      const config = mount.config as unknown as S3Config;
      const region = config.region ?? process.env["AWS_REGION"] ?? "us-east-1";
      source = {
        type: "s3",
        bucket: config.bucket,
        ...(config.prefix ? { prefix: config.prefix } : {}),
        ...(config.region ? { region: config.region } : {}),
      };
      originDomain = `${config.bucket}.s3.${region}.amazonaws.com`;
      versionToken = await s3ListingToken(mount).catch(() => null);
    }
    entries.push({ prefix: mount.prefix, type: mount.type, configHash, versionToken });
    provenance.push({
      prefix: mount.prefix,
      source,
      originDomain,
      // Set even when resolution failed — "we looked at this moment".
      retrievedAt: new Date().toISOString(),
    });
  }
  return { entries, provenance };
}

// ---------------------------------------------------------------------------
// Write-through
// ---------------------------------------------------------------------------
//
// `mode: "readwrite"` was stored but ignored until something needed to write
// *through* a mount rather than into the native tree. Sandbox commit is that
// something (docs/sandboxes.md): a sandbox mounting `vendor/charts` and
// changing a file there has nowhere else for the bytes to go — the workspace
// FS does not own that prefix, so a commit cannot record them.
//
// Only `s3` writes, and only with `mode: "readwrite"`. A `git` mount would
// need branch/commit/PR semantics, which is a different feature wearing the
// same word, and it lands with the credential-grant workstream.

function assertWritableMount(mount: VfsMount): void {
  if (mount.mode !== "readwrite") {
    throw new ServiceError(
      `${mount.prefix} is a read-only ${mount.type} mount — remount with mode "readwrite" to write through it`,
      403,
    );
  }
  if (mount.type !== "s3") {
    throw new ServiceError(
      `Writing through a ${mount.type} mount is not supported (${mount.prefix})`,
      501,
    );
  }
}

function s3Key(mount: VfsMount, path: string): string {
  const config = mount.config as unknown as S3Config;
  const root = config.prefix ? `${config.prefix.replace(/\/+$/u, "")}/` : "";
  return root + path.slice(mount.prefix.length + 1);
}

/**
 * Write `path` through its mount. Returns "not-mounted" when the path is
 * native, so a caller can route with one call instead of two.
 */
export async function mountWrite(
  workspaceId: string,
  path: string,
  content: string,
  mimeType?: string,
): Promise<"written" | "not-mounted"> {
  const mounts = await readMounts(workspaceId).catch(() => []);
  const mount = mountFor(mounts, path);
  if (!mount) return "not-mounted";
  assertWritableMount(mount);
  const config = mount.config as unknown as S3Config;
  const { client, PutObjectCommand } = await mountS3(config);
  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: s3Key(mount, path),
      Body: content,
      ContentType: mimeType ?? mountMime(path),
    }),
  );
  return "written";
}

/** Delete `path` through its mount; "not-mounted" when the path is native. */
export async function mountDelete(
  workspaceId: string,
  path: string,
): Promise<"deleted" | "not-mounted"> {
  const mounts = await readMounts(workspaceId).catch(() => []);
  const mount = mountFor(mounts, path);
  if (!mount) return "not-mounted";
  assertWritableMount(mount);
  const config = mount.config as unknown as S3Config;
  const { client, DeleteObjectCommand } = await mountS3(config);
  await client.send(
    new DeleteObjectCommand({ Bucket: config.bucket, Key: s3Key(mount, path) }),
  );
  return "deleted";
}
