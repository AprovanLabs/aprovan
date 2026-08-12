/**
 * Commit detail + history helpers over the gateway's `vcs.*` verbs.
 * Mount lineage (registry specs/mount-lineage) still surfaces via `vcs.show`;
 * history / restore / manual save use the full six-verb surface.
 */

import { GATEWAY_BASE } from "./gateway";
import { gatewayFetch } from "./gateway-fetch";
import { invokeNamespaceTool } from "./tools";

const invokeVcsTool = invokeNamespaceTool("vcs");

/** App id/slug for scoped verbs; omit for workspace `main`. */
export type VcsScope = { app: string };

export type VcsScopeArg = { scope?: VcsScope };

/** Hash-bearing change bag from `vcs.show` / `vcs.diff` (F1 wire). */
export type VcsPathChange =
  | { path: string; hash: string; kind: "added" | "removed" }
  | { path: string; from: string; to: string; kind: "modified" };

export interface VcsChangeSummary {
  added: Array<{ path: string; hash: string }>;
  modified: Array<{ path: string; from: string; to: string }>;
  removed: Array<{ path: string; hash: string }>;
}

export interface VcsCommitSummary {
  id: string;
  message: string;
  author: string;
  createdAt: string;
  parents: string[];
  snapshot?: string;
}

export interface MountLineageEntry {
  prefix: string;
  type: "git" | "s3";
  configHash: string;
  versionToken: string | null;
}

export interface MountProvenance {
  prefix: string;
  source:
    | { type: "git"; repo: string; ref: string; path?: string }
    | { type: "s3"; bucket: string; prefix?: string; region?: string };
  originDomain: string;
  retrievedAt: string;
}

export interface CommitDetail {
  commit: {
    id: string;
    message: string;
    author: string;
    createdAt: string;
    parents?: string[];
    provenance?: MountProvenance[];
  };
  entries: Array<{ path: string }>;
  mounts?: MountLineageEntry[];
  /** Hash-bearing change summary from `vcs.show` — used by DiffViewer. */
  changes?: VcsChangeSummary;
}

function scopeArgs(scope?: VcsScope): VcsScopeArg {
  return scope ? { scope } : {};
}

function asChangeSummary(raw: unknown): VcsChangeSummary | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const bag = raw as Record<string, unknown>;
  const added = Array.isArray(bag.added) ? bag.added : [];
  const modified = Array.isArray(bag.modified) ? bag.modified : [];
  const removed = Array.isArray(bag.removed) ? bag.removed : [];
  return {
    added: added
      .filter((row): row is { path: string; hash: string } =>
        Boolean(row && typeof row === "object" && typeof (row as { path?: unknown }).path === "string"),
      )
      .map((row) => ({
        path: row.path,
        hash: typeof row.hash === "string" ? row.hash : "",
      })),
    modified: modified
      .filter((row): row is { path: string; from: string; to: string } =>
        Boolean(row && typeof row === "object" && typeof (row as { path?: unknown }).path === "string"),
      )
      .map((row) => ({
        path: row.path,
        from: typeof row.from === "string" ? row.from : "",
        to: typeof row.to === "string" ? row.to : "",
      })),
    removed: removed
      .filter((row): row is { path: string; hash: string } =>
        Boolean(row && typeof row === "object" && typeof (row as { path?: unknown }).path === "string"),
      )
      .map((row) => ({
        path: row.path,
        hash: typeof row.hash === "string" ? row.hash : "",
      })),
  };
}

function asCommitSummary(raw: unknown): VcsCommitSummary | null {
  if (!raw || typeof raw !== "object") return null;
  const c = raw as Record<string, unknown>;
  if (typeof c.id !== "string" || typeof c.createdAt !== "string") return null;
  return {
    id: c.id,
    message: typeof c.message === "string" ? c.message : "",
    author: typeof c.author === "string" ? c.author : "",
    createdAt: c.createdAt,
    parents: Array.isArray(c.parents)
      ? c.parents.filter((p): p is string => typeof p === "string")
      : [],
    ...(typeof c.snapshot === "string" ? { snapshot: c.snapshot } : {}),
  };
}

/** Path-list shape ChangeList expects (words, not glyphs). */
export function changeListBag(changes: VcsChangeSummary | undefined): {
  added: string[];
  modified: string[];
  removed: string[];
} {
  if (!changes) return { added: [], modified: [], removed: [] };
  return {
    added: changes.added.map((r) => r.path),
    modified: changes.modified.map((r) => r.path),
    removed: changes.removed.map((r) => r.path),
  };
}

export function changeCountLabel(changes: VcsChangeSummary | undefined): string | null {
  if (!changes) return null;
  const parts: string[] = [];
  if (changes.modified.length > 0) {
    parts.push(
      `${changes.modified.length} edited`,
    );
  }
  if (changes.added.length > 0) {
    parts.push(`${changes.added.length} new`);
  }
  if (changes.removed.length > 0) {
    parts.push(`${changes.removed.length} removed`);
  }
  return parts.length > 0 ? parts.join(", ") : null;
}

/** Draft-chat merge lineage from two-parent commits + message convention. */
export function draftChatTitleFromCommit(commit: {
  message: string;
  parents?: string[];
}): string | null {
  const parents = commit.parents ?? [];
  if (parents.length < 2) return null;
  const merge = /^Merge session:\s*(.+)$/i.exec(commit.message.trim());
  if (merge?.[1]) return merge[1].trim();
  const session = /^Session:\s*(.+)$/i.exec(commit.message.trim());
  if (session?.[1]) return session[1].trim();
  return null;
}

export async function fetchCommitDetail(
  commit: string,
  scope?: VcsScope,
): Promise<CommitDetail> {
  const raw = (await invokeVcsTool("show", {
    commit,
    ...scopeArgs(scope),
  })) as {
    commit: CommitDetail["commit"];
    files?: string[];
    entries?: Array<{ path: string }>;
    mounts?: MountLineageEntry[];
    changes?: unknown;
  };
  const changes = asChangeSummary(raw.changes);
  return {
    commit: raw.commit,
    entries: raw.entries ?? (raw.files ?? []).map((path) => ({ path })),
    ...(raw.mounts ? { mounts: raw.mounts } : {}),
    ...(changes ? { changes } : {}),
  };
}

/** `vcs.log` — newest first. */
export async function fetchCommitLog(
  options: { limit?: number; scope?: VcsScope } = {},
): Promise<VcsCommitSummary[]> {
  const raw = (await invokeVcsTool("log", {
    ...(typeof options.limit === "number" ? { limit: options.limit } : {}),
    ...scopeArgs(options.scope),
  })) as { commits?: unknown[] };
  return (raw.commits ?? [])
    .map(asCommitSummary)
    .filter((c): c is VcsCommitSummary => c !== null);
}

/** `vcs.branches` — named refs (main / app / tag / channel). */
export async function fetchVcsBranches(
  scope?: VcsScope,
): Promise<Array<{ name: string; commit: string }>> {
  const raw = (await invokeVcsTool("branches", {
    ...scopeArgs(scope),
  })) as { branches?: Array<{ name?: string; commit?: string }> };
  return (raw.branches ?? [])
    .filter(
      (b): b is { name: string; commit: string } =>
        typeof b?.name === "string" && typeof b?.commit === "string",
    )
    .map((b) => ({ name: b.name, commit: b.commit }));
}

/** `vcs.diff` — hash-bearing path changes between two commits. */
export async function fetchCommitDiff(
  from: string,
  to: string,
  scope?: VcsScope,
): Promise<VcsChangeSummary & { from: string; to: string }> {
  const raw = (await invokeVcsTool("diff", {
    from,
    to,
    ...scopeArgs(scope),
  })) as {
    from?: string;
    to?: string;
    added?: unknown;
    modified?: unknown;
    removed?: unknown;
  };
  const changes = asChangeSummary(raw) ?? {
    added: [],
    modified: [],
    removed: [],
  };
  return {
    from: typeof raw.from === "string" ? raw.from : from,
    to: typeof raw.to === "string" ? raw.to : to,
    ...changes,
  };
}

/** `vcs.commit` — snapshot current tree (scoped or workspace). */
export async function commitVersion(
  message: string,
  scope?: VcsScope,
): Promise<{ commit: VcsCommitSummary; created: boolean }> {
  const raw = (await invokeVcsTool("commit", {
    message,
    ...scopeArgs(scope),
  })) as { commit?: unknown; created?: boolean };
  const commit = asCommitSummary(raw.commit);
  if (!commit) throw new Error("vcs.commit returned no commit");
  return { commit, created: Boolean(raw.created) };
}

/**
 * Non-destructive restore: write tree from a prior version, then snapshot so
 * history gains a new entry (ux.md restore flow).
 */
export async function restoreVersion(
  commitId: string,
  options: { scope?: VcsScope; whenLabel: string },
): Promise<{ restored: string[]; commit: VcsCommitSummary }> {
  const restoreRaw = (await invokeVcsTool("restore", {
    commit: commitId,
    ...scopeArgs(options.scope),
  })) as { restored?: string[] };
  const restored = Array.isArray(restoreRaw.restored) ? restoreRaw.restored : [];
  const { commit } = await commitVersion(
    `Restored to ${options.whenLabel}`,
    options.scope,
  );
  return { restored, commit };
}

/** Read file content pinned by content hash (`GET /fs/path?hash=`). */
export async function readFileAtHash(
  path: string,
  hash: string,
): Promise<{ content: string; mimeType: string; size: number }> {
  const encoded = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const response = await gatewayFetch(
    `${GATEWAY_BASE}/fs/${encoded}?hash=${encodeURIComponent(hash)}`,
  );
  if (!response.ok) {
    throw new Error(`Couldn't load this version — try again (${response.status})`);
  }
  const body = (await response.json()) as {
    content?: string;
    mimeType?: string;
    size?: number;
  };
  return {
    content: typeof body.content === "string" ? body.content : "",
    mimeType: typeof body.mimeType === "string" ? body.mimeType : "text/plain",
    size: typeof body.size === "number" ? body.size : 0,
  };
}

/** Resolve before/after hashes for one path from a change bag. */
export function hashesForPath(
  changes: VcsChangeSummary,
  path: string,
): { before?: string; after?: string; status: "added" | "modified" | "removed" } | null {
  const added = changes.added.find((r) => r.path === path);
  if (added) return { after: added.hash || undefined, status: "added" };
  const removed = changes.removed.find((r) => r.path === path);
  if (removed) return { before: removed.hash || undefined, status: "removed" };
  const modified = changes.modified.find((r) => r.path === path);
  if (modified) {
    return {
      before: modified.from || undefined,
      after: modified.to || undefined,
      status: "modified",
    };
  }
  return null;
}

/** One renderable mounted-content row: provenance joined with its token. */
export interface MountedContentRow {
  prefix: string;
  /** "github.com/org/charts@main" / "s3://bucket/prefix". */
  sourceLabel: string;
  /** Time-based label ("version from 2h ago"), never a hash token. */
  versionLabel: string | null;
  retrievedAt: string;
}

/**
 * Join a commit's provenance records with the snapshot's version tokens by
 * prefix. Empty for commits without lineage — the section stays absent.
 * Version identity is time-based (ux.md), not a shortened hash.
 */
export function mountedContentRows(detail: CommitDetail): MountedContentRow[] {
  const tokens = new Map(
    (detail.mounts ?? []).map((mount) => [mount.prefix, mount.versionToken] as const),
  );
  return (detail.commit.provenance ?? []).map((entry) => {
    const source = entry.source;
    const sourceLabel =
      source.type === "git"
        ? `github.com/${source.repo}@${source.ref}`
        : `s3://${source.bucket}${source.prefix ? `/${source.prefix}` : ""}`;
    const token = tokens.get(entry.prefix) ?? null;
    return {
      prefix: entry.prefix,
      sourceLabel,
      versionLabel: token ? `version from ${formatRetrievedAt(entry.retrievedAt)}` : null,
      retrievedAt: entry.retrievedAt,
    };
  });
}

function formatRetrievedAt(iso: string): string {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return iso;
  const seconds = Math.max(0, (Date.now() - then) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return new Date(then).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
