/**
 * Materializing a repo-backed sandbox mount (`source: "github:owner/repo"`).
 *
 * Two rungs, chosen by where the sandbox actually runs:
 *
 *   - **machine host** — the desktop has a real git and real network, so the
 *     mount is one `cloneRepo` op dispatched over the relay: the host clones
 *     the repo at the ref into the mount directory and answers with a
 *     `{path → sha256}` manifest of the checkout. The result is a genuine
 *     git working copy — the agent inside can branch, commit, and push. The
 *     workspace's stored GitHub token rides the op args for private repos,
 *     over the same host-token-authenticated channel file bodies already
 *     travel; the host embeds it in the clone remote so later pushes work.
 *
 *   - **everything else** (bashkit, vendor drivers) — the box has no git and
 *     often no network, so the mount is a read-only snapshot fetched through
 *     the GitHub tree API (vcs/mounts.ts machinery, same credential, same
 *     caps) and written in file by file, exactly like a workspace mount.
 *
 * Either way the mount's `base` ends up as `{rel → sha256}` of what landed,
 * so `sandboxes.tree` diffs repo mounts with the same two-manifest set
 * difference every other mount uses. Repo mounts are never tracked: nothing
 * commits back through the workspace — changes leave through git itself.
 */

import { createHash } from "node:crypto";
import { ServiceError, type ServiceContext } from "../service-kernel.js";
import { githubToken, listRepoFiles, readRepoFile } from "../vcs/mounts.js";
import type { SandboxCall } from "./mounts.js";
import type { SandboxMount, SandboxRecord } from "./store.js";

/** Same caps as workspace mounts (sandboxes/mounts.ts) — one vocabulary. */
const MAX_MOUNT_FILES = 5_000;
const MAX_FILE_BYTES = 2_000_000;

/** A clone is network + checkout; give it real time, unlike a file write. */
const CLONE_TIMEOUT_MS = 300_000;

const sha256 = (content: string): string =>
  createHash("sha256").update(content, "utf8").digest("hex");

interface CloneManifestEntry {
  path: string;
  hash: string;
  size: number;
}

/**
 * Materialize one repo mount into the sandbox and (re)establish its `base`.
 * `machine` says which rung applies — the caller knows the provider.
 */
export async function materializeRepoMount(
  ctx: ServiceContext,
  record: SandboxRecord,
  mount: SandboxMount,
  call: SandboxCall,
  options: { machine: boolean },
): Promise<{ files: number; bytes: number }> {
  const repo = mount.repo;
  if (!repo) {
    throw new ServiceError(`Mount ${mount.path} has no parsed repo reference`, 500);
  }

  if (options.machine) {
    const token = await githubToken(ctx.workspaceId);
    const result = (await call("cloneRepo", {
      id: record.externalId,
      path: mount.path,
      repo: repo.repo,
      ...(repo.ref ? { ref: repo.ref } : {}),
      ...(repo.path ? { subPath: repo.path } : {}),
      ...(token ? { token } : {}),
      timeoutMs: CLONE_TIMEOUT_MS,
    })) as { files?: CloneManifestEntry[] } | undefined;

    const base: Record<string, string> = {};
    let bytes = 0;
    for (const entry of result?.files ?? []) {
      if (!entry || typeof entry.path !== "string") continue;
      base[entry.path] = String(entry.hash ?? "");
      bytes += entry.size ?? 0;
    }
    mount.base = base;
    mount.syncedAt = new Date().toISOString();
    return { files: Object.keys(base).length, bytes };
  }

  // Snapshot rung: the tree listing bounds the work, then one contents read
  // per file. Oversized files are skipped rather than fatal — a snapshot
  // mount is reference material, and a 10 MB fixture is not what it's for.
  const listing = await listRepoFiles(ctx.workspaceId, repo);
  if (listing.length > MAX_MOUNT_FILES) {
    throw new ServiceError(
      `${mount.source} has ${listing.length} files — a sandbox mount is capped at ` +
        `${MAX_MOUNT_FILES}. Mount a narrower sub-path (github:owner/repo#ref/sub/path).`,
      400,
    );
  }

  const base: Record<string, string> = {};
  let bytes = 0;
  for (const entry of listing) {
    if (entry.size > MAX_FILE_BYTES) continue;
    const file = await readRepoFile(ctx.workspaceId, repo, entry.path);
    if (!file || file.content.length > MAX_FILE_BYTES) continue;
    await call("writeFile", {
      id: record.externalId,
      path: `${mount.path}/${entry.path}`,
      content: file.content,
    });
    // sha256 of what was written, not the git blob sha: the driver's own
    // listings hash content with sha256, and `base` must diff against those.
    base[entry.path] = sha256(file.content);
    bytes += file.size;
  }
  mount.base = base;
  mount.syncedAt = new Date().toISOString();
  return { files: Object.keys(base).length, bytes };
}
