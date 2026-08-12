/**
 * App releases as VCS tags (IW-9 A stream 3).
 *
 * A release is an immutable tag `tag/app/<appId>/<releaseId>` over an
 * app-scoped commit. A channel is a movable ref
 * `channel/app/<appId>/<channel>` pointed at that commit. Cutting a release
 * commits the app scope if dirty, writes the tag, then points the channel.
 *
 * Legacy `svc#apps#releases#<appId>` records are re-tagged once on first use
 * (tags written before records dropped — tech-plan Rollout 4).
 */

import { getFsStore } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import {
  deleteSvcScope,
  listSvcRecords,
  svcScope,
} from "../svc-records.js";
import {
  appRefName,
  buildSnapshot,
  channelRefName,
  commitTree,
  createCommit,
  listRefs,
  moveChannel,
  readCommit,
  readRef,
  readSnapshot,
  saveSnapshot,
  tagRefName,
  visibleEntries,
  writeTag,
  type VcsCommit,
} from "../vcs/store.js";
import { appRoot, readApp, saveApp, type AppManifest } from "./store.js";

export const DEFAULT_CHANNEL = "live";

const CHANNEL_RE = /^[a-z][a-z0-9-]{0,31}$/u;

export interface ResolvedRelease {
  releaseId: string;
  commitId: string;
  snapshotId: string;
  /** Channel this resolution came from, when resolved via channel name. */
  channel?: string;
  notes?: string;
  createdAt: string;
}

export interface ListedRelease {
  releaseId: string;
  commitId: string;
  channels: string[];
  createdAt: string;
  notes?: string;
}

export function channelName(value: unknown, fallback = DEFAULT_CHANNEL): string {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string" || !CHANNEL_RE.test(value)) {
    throw new ServiceError(`channel must match ${CHANNEL_RE}`, 400);
  }
  return value;
}

/** Time-prefixed id: sortable, unique. */
export function newReleaseId(): string {
  return `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

function releaseIdFromTagName(name: string, appId: string): string | undefined {
  const prefix = `tag/app/${appId}/`;
  if (!name.startsWith(prefix)) return undefined;
  return name.slice(prefix.length) || undefined;
}

function channelFromRefName(name: string, appId: string): string | undefined {
  const prefix = `channel/app/${appId}/`;
  if (!name.startsWith(prefix)) return undefined;
  return name.slice(prefix.length) || undefined;
}

function notesFromMessage(message: string): string | undefined {
  const match = /^Release [^\n:]+(?::\s*(.+))?$/u.exec(message.trim());
  const notes = match?.[1]?.trim();
  return notes || undefined;
}

function releaseMessage(releaseId: string, notes?: string): string {
  return notes?.trim() ? `Release ${releaseId}: ${notes.trim()}` : `Release ${releaseId}`;
}

async function requireManifest(workspaceId: string, appId: string): Promise<AppManifest> {
  const manifest = await readApp(workspaceId, appId);
  if (!manifest) throw new ServiceError(`Unknown app: ${appId}`, 404);
  return manifest;
}

async function commitForRelease(
  workspaceId: string,
  commitId: string,
): Promise<VcsCommit> {
  const commit = await readCommit(workspaceId, commitId);
  if (!commit) throw new ServiceError(`Missing commit for release: ${commitId}`, 404);
  return commit;
}

/** Point a channel at a release tag and dual-write manifest.channels. */
export async function pointChannel(
  workspaceId: string,
  manifest: AppManifest,
  channel: string,
  releaseId: string,
  commitId: string,
  actor = "system",
): Promise<AppManifest> {
  await moveChannel(workspaceId, channelRefName(manifest.appId, channel), commitId, actor);
  const next: AppManifest = {
    ...manifest,
    channels: { ...(manifest.channels ?? {}), [channel]: releaseId },
    updatedAt: new Date().toISOString(),
  };
  await saveApp(workspaceId, next);
  return next;
}

/**
 * Cut a release: commit app scope if dirty → immutable tag → point channel.
 */
export async function cutRelease(
  workspaceId: string,
  appId: string,
  options: { channel?: string; notes?: string; createdBy?: string } = {},
): Promise<ResolvedRelease> {
  await migrateLegacyReleasesIfNeeded(workspaceId, appId);
  const manifest = await requireManifest(workspaceId, appId);
  const channel = channelName(options.channel);
  const actor = options.createdBy ?? "system";
  const prefix = appRoot({
    id: manifest.appId,
    name: manifest.name,
    root: manifest.root,
    paths: manifest.paths,
  });
  const releaseId = newReleaseId();

  const { commit } = await commitTree(workspaceId, {
    message: releaseMessage(releaseId, options.notes),
    author: actor,
    prefix,
    ref: appRefName(appId),
  });

  await writeTag(workspaceId, tagRefName(appId, releaseId), commit.id, actor);
  await pointChannel(workspaceId, manifest, channel, releaseId, commit.id, actor);

  return {
    releaseId,
    commitId: commit.id,
    snapshotId: commit.snapshot,
    channel,
    notes: options.notes,
    createdAt: commit.createdAt,
  };
}

/**
 * Resolve a channel name or release id to `{ releaseId, commitId, snapshotId }`.
 */
export async function resolveRelease(
  workspaceId: string,
  appId: string,
  channelOrReleaseId: string,
): Promise<ResolvedRelease | undefined> {
  await migrateLegacyReleasesIfNeeded(workspaceId, appId);
  if (!channelOrReleaseId) return undefined;

  // Prefer explicit release tag.
  const tag = await readRef(workspaceId, tagRefName(appId, channelOrReleaseId));
  if (tag) {
    const commit = await commitForRelease(workspaceId, tag.commit);
    return {
      releaseId: channelOrReleaseId,
      commitId: commit.id,
      snapshotId: commit.snapshot,
      notes: notesFromMessage(commit.message),
      createdAt: commit.createdAt,
    };
  }

  // Channel ref (VCS).
  const channelRef = await readRef(workspaceId, channelRefName(appId, channelOrReleaseId));
  if (channelRef) {
    const commit = await commitForRelease(workspaceId, channelRef.commit);
    const releaseId =
      (await releaseIdForCommit(workspaceId, appId, commit.id)) ??
      (await readApp(workspaceId, appId).then((m) => m?.channels?.[channelOrReleaseId]));
    if (!releaseId) {
      // Channel points at a commit with no tag — still resolvable for serving.
      return {
        releaseId: channelOrReleaseId,
        commitId: commit.id,
        snapshotId: commit.snapshot,
        channel: channelOrReleaseId,
        notes: notesFromMessage(commit.message),
        createdAt: commit.createdAt,
      };
    }
    return {
      releaseId,
      commitId: commit.id,
      snapshotId: commit.snapshot,
      channel: channelOrReleaseId,
      notes: notesFromMessage(commit.message),
      createdAt: commit.createdAt,
    };
  }

  // Manifest channel pointer (dual-write / pre-channel-ref).
  if (CHANNEL_RE.test(channelOrReleaseId)) {
    const manifest = await readApp(workspaceId, appId);
    const pointed = manifest?.channels?.[channelOrReleaseId];
    if (pointed && pointed !== channelOrReleaseId) {
      return resolveRelease(workspaceId, appId, pointed);
    }
  }

  return undefined;
}

async function releaseIdForCommit(
  workspaceId: string,
  appId: string,
  commitId: string,
): Promise<string | undefined> {
  const tags = await listRefs(workspaceId, `tag/app/${appId}`);
  const hits = tags
    .filter((ref) => ref.commit === commitId)
    .map((ref) => releaseIdFromTagName(ref.name, appId))
    .filter((id): id is string => Boolean(id))
    // Newest time-prefixed ids sort last lexicographically for base36 timestamps
    // that share a prefix length; prefer the last updated tag ref.
    .sort();
  return hits.at(-1);
}

/** Every release tag for an app, newest first, with channels that point at it. */
export async function listReleases(
  workspaceId: string,
  appId: string,
): Promise<ListedRelease[]> {
  await migrateLegacyReleasesIfNeeded(workspaceId, appId);
  const tags = await listRefs(workspaceId, `tag/app/${appId}`);
  const channels = await listRefs(workspaceId, `channel/app/${appId}`);
  const channelsByCommit = new Map<string, string[]>();
  for (const ref of channels) {
    const name = channelFromRefName(ref.name, appId);
    if (!name) continue;
    const list = channelsByCommit.get(ref.commit) ?? [];
    list.push(name);
    channelsByCommit.set(ref.commit, list);
  }

  const listed: ListedRelease[] = [];
  for (const ref of tags) {
    const releaseId = releaseIdFromTagName(ref.name, appId);
    if (!releaseId) continue;
    const commit = await readCommit(workspaceId, ref.commit);
    if (!commit) continue;
    listed.push({
      releaseId,
      commitId: commit.id,
      channels: channelsByCommit.get(commit.id) ?? [],
      createdAt: commit.createdAt,
      notes: notesFromMessage(commit.message),
    });
  }

  return listed.sort((a, b) => (a.releaseId < b.releaseId ? 1 : a.releaseId > b.releaseId ? -1 : 0));
}

/**
 * The release a rollback on `channel` should land on: the newest release
 * older than the current pointer, preferring ones that previously served
 * the same channel.
 */
export function previousRelease(
  releases: ListedRelease[],
  currentId: string | undefined,
  channel: string,
): ListedRelease | undefined {
  const index = currentId ? releases.findIndex((r) => r.releaseId === currentId) : -1;
  const older = index >= 0 ? releases.slice(index + 1) : releases;
  return older.find((r) => r.channels.includes(channel)) ?? older[0];
}

/**
 * Install pin helper consumed by `install.ts` / iw9-b. Resolves an optional
 * release tag (or the default channel) to `{ tag?, commit }`.
 */
export async function resolveReleaseTag(
  workspaceId: string,
  appId: string,
  tag?: string,
): Promise<{ tag?: string; commit: string }> {
  await migrateLegacyReleasesIfNeeded(workspaceId, appId);

  if (tag) {
    const resolved = await resolveRelease(workspaceId, appId, tag);
    if (!resolved) {
      throw new ServiceError(
        `Unknown release "${tag}" for app ${appId} — re-release required`,
        404,
      );
    }
    return { tag: resolved.releaseId, commit: resolved.commitId };
  }

  const live = await resolveRelease(workspaceId, appId, DEFAULT_CHANNEL);
  if (live) return { tag: live.releaseId, commit: live.commitId };

  const appHead = await readRef(workspaceId, appRefName(appId));
  if (appHead?.commit) return { commit: appHead.commit };

  const main = await readRef(workspaceId, "main");
  if (main?.commit) return { commit: main.commit };

  throw new ServiceError(`No commit to pin for app ${appId}`, 404);
}

/** Read a path from a release commit's snapshot (pinned content). */
export async function readReleasePath(
  workspaceId: string,
  resolved: ResolvedRelease,
  path: string,
) {
  const snapshot = await readSnapshot(workspaceId, resolved.snapshotId);
  const entry = snapshot?.entries.find((e) => e.path === path);
  if (!entry) return undefined;
  return getFsStore().read(workspaceId, path, entry.hash);
}

// ---------------------------------------------------------------------------
// Legacy cut-over: svc#apps#releases#<appId> → tags (then drop records)
// ---------------------------------------------------------------------------

/** Shape of the pre-tag release records (kept local to the migrator). */
interface LegacyRelease {
  id: string;
  channel: string;
  notes?: string;
  entryHash?: string;
  entry: string;
  workflows?: Record<string, string>;
  manifest?: AppManifest;
  createdBy?: string;
  createdAt?: string;
}

function releasesScope(appId: string): string {
  return svcScope("apps", "releases", appId);
}

/**
 * Re-tag every legacy release record for an app, then drop the scope.
 * Tags are written before records are deleted. Unreadable entry hashes are
 * skipped (no silent tag) so installs surface an explicit miss.
 */
export async function migrateLegacyReleasesIfNeeded(
  workspaceId: string,
  appId: string,
): Promise<{ migrated: number; skipped: number }> {
  const records = await listSvcRecords<LegacyRelease>(workspaceId, releasesScope(appId));
  if (records.length === 0) return { migrated: 0, skipped: 0 };

  const manifest = await readApp(workspaceId, appId);
  let migrated = 0;
  let skipped = 0;

  // Oldest first so channel dual-write ends on the newest pointer last.
  const ordered = [...records].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));

  for (const { value: release } of ordered) {
    if (!release?.id) {
      skipped += 1;
      continue;
    }
    const existing = await readRef(workspaceId, tagRefName(appId, release.id));
    if (existing) {
      migrated += 1;
      continue;
    }

    const built = await buildLegacyReleaseCommit(workspaceId, appId, release, manifest);
    if (!built) {
      skipped += 1;
      continue;
    }

    await writeTag(workspaceId, tagRefName(appId, release.id), built.commit.id, "migrate");
    migrated += 1;

    // Point channel when this release is (still) the manifest pointer, or when
    // the legacy record's own channel has no channel ref yet.
    const channel = channelName(release.channel, DEFAULT_CHANNEL);
    const pointed = manifest?.channels?.[channel];
    const channelRef = await readRef(workspaceId, channelRefName(appId, channel));
    if (pointed === release.id || !channelRef) {
      await moveChannel(
        workspaceId,
        channelRefName(appId, channel),
        built.commit.id,
        "migrate",
      );
    }
  }

  // Dual-write remaining manifest channel pointers that we successfully tagged.
  if (manifest?.channels) {
    for (const [channel, releaseId] of Object.entries(manifest.channels)) {
      const tag = await readRef(workspaceId, tagRefName(appId, releaseId));
      if (!tag) continue;
      const existing = await readRef(workspaceId, channelRefName(appId, channel));
      if (!existing || existing.commit !== tag.commit) {
        await moveChannel(workspaceId, channelRefName(appId, channel), tag.commit, "migrate");
      }
    }
  }

  await deleteSvcScope(workspaceId, releasesScope(appId));
  return { migrated, skipped };
}

async function buildLegacyReleaseCommit(
  workspaceId: string,
  appId: string,
  release: LegacyRelease,
  manifest: AppManifest | undefined,
): Promise<{ commit: VcsCommit } | undefined> {
  const prefix =
    manifest && (manifest.root || manifest.paths?.[0])
      ? appRoot({
          id: manifest.appId,
          name: manifest.name,
          root: manifest.root,
          paths: manifest.paths,
        })
      : release.manifest && (release.manifest.root || release.manifest.paths?.[0])
        ? appRoot({
            id: release.manifest.appId,
            name: release.manifest.name,
            root: release.manifest.root,
            paths: release.manifest.paths,
          })
        : release.entry.includes("/")
          ? release.entry.slice(0, release.entry.lastIndexOf("/"))
          : "";

  const store = getFsStore();
  const live = await visibleEntries(workspaceId, prefix);
  const adjusted = [];

  for (const entry of live) {
    if (release.entryHash && entry.path === release.entry) {
      const pinned = await store
        .read(workspaceId, entry.path, release.entryHash)
        .catch(() => undefined);
      if (!pinned) return undefined; // Cannot faithfully re-tag — skip (no silent wrong pin).
      adjusted.push({
        path: entry.path,
        hash: pinned.hash,
        mimeType: pinned.mimeType,
        size: pinned.size,
        updatedAt: pinned.updatedAt,
      });
      continue;
    }
    adjusted.push({
      path: entry.path,
      hash: entry.hash,
      mimeType: entry.mimeType,
      size: entry.size,
      updatedAt: entry.updatedAt,
    });
  }

  // Entrypoint must be present in the snapshot when the release pinned one.
  if (release.entryHash && !adjusted.some((e) => e.path === release.entry)) {
    const pinned = await store
      .read(workspaceId, release.entry, release.entryHash)
      .catch(() => undefined);
    if (!pinned) return undefined;
    adjusted.push({
      path: release.entry,
      hash: pinned.hash,
      mimeType: pinned.mimeType,
      size: pinned.size,
      updatedAt: pinned.updatedAt,
    });
  }

  const snapshot = buildSnapshot(adjusted, prefix);
  await saveSnapshot(workspaceId, snapshot);
  const parents: string[] = [];
  const appHead = await readRef(workspaceId, appRefName(appId));
  if (appHead?.commit) parents.push(appHead.commit);

  const commit = await createCommit(workspaceId, {
    snapshot,
    parents,
    message: releaseMessage(release.id, release.notes),
    author: release.createdBy ?? "migrate",
  });
  return { commit };
}
