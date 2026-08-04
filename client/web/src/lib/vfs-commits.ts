/**
 * Commit detail over the gateway's `vcs.show` — the client surface for mount
 * lineage (registry specs/mount-lineage): commits carry per-mount provenance
 * (`{prefix, source, originDomain, retrievedAt}`) and their snapshot carries
 * the deterministic version tokens. Pre-lineage commits return neither field
 * and render with no mounted-content section.
 */

import { invokeNamespaceTool } from "./tools";

const invokeVcsTool = invokeNamespaceTool("vcs");

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
    provenance?: MountProvenance[];
  };
  entries: Array<{ path: string }>;
  mounts?: MountLineageEntry[];
}

export async function fetchCommitDetail(commit: string): Promise<CommitDetail> {
  const raw = (await invokeVcsTool("show", { commit })) as {
    commit: CommitDetail["commit"];
    files?: string[];
    entries?: Array<{ path: string }>;
    mounts?: MountLineageEntry[];
    changes?: unknown;
  };
  return {
    commit: raw.commit,
    entries:
      raw.entries ??
      (raw.files ?? []).map((path) => ({ path })),
    ...(raw.mounts ? { mounts: raw.mounts } : {}),
  };
}

/** One renderable mounted-content row: provenance joined with its token. */
export interface MountedContentRow {
  prefix: string;
  /** "github.com/org/charts@main" / "s3://bucket/prefix". */
  sourceLabel: string;
  /** Short resolved token, or null = "version unavailable at commit time". */
  shortToken: string | null;
  retrievedAt: string;
}

/**
 * Join a commit's provenance records with the snapshot's version tokens by
 * prefix. Empty for commits without lineage — the section stays absent.
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
      shortToken: token ? token.slice(0, 8) : null,
      retrievedAt: entry.retrievedAt,
    };
  });
}
