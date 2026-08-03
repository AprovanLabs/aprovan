/**
 * App releases and channels — a deployable pin over content that already
 * exists.
 *
 * The workspace FS content-versions every write, so an app's UI entrypoint and
 * each exported workflow's script already have an immutable hash per revision.
 * A **release** is just a snapshot of those hashes plus a hash of the manifest
 * (and an embedded manifest copy so install resolution needs no live-manifest
 * drift handling):
 *
 *   svc#apps#releases#<appId> / <id>
 *     { id, channel, notes, manifestHash, entryHash, workflows, manifest, … }
 *
 * A **channel** is a named pointer at a release, stored on the manifest
 * (`channels: { live, preview, … }`).
 */

import { createHash } from "node:crypto";
import { getFsStore } from "../fs-store.js";
import { ServiceError } from "../service-kernel.js";
import { listSvcRecords, readSvcRecord, svcScope, writeSvcRecord } from "../svc-records.js";
import { readRegistration } from "../workflows/store.js";
import { saveApp, type AppManifest } from "./store.js";

export const DEFAULT_CHANNEL = "live";

const CHANNEL_RE = /^[a-z][a-z0-9-]{0,31}$/u;

export interface AppRelease {
  id: string;
  /** Channel this release was cut on (promotions point other channels at it). */
  channel: string;
  notes?: string;
  /** sha256 of the manifest's durable fields (channels/timestamps excluded). */
  manifestHash: string;
  /** Content hash of the UI entrypoint at snapshot time (absent if unwritten). */
  entryHash?: string;
  /** Exported workflow name → its script's content hash at snapshot time. */
  workflows: Record<string, string>;
  entry: string;
  /** Embedded manifest snapshot at cut time (D2). */
  manifest: AppManifest;
  createdBy: string;
  createdAt: string;
}

export function channelName(value: unknown, fallback = DEFAULT_CHANNEL): string {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string" || !CHANNEL_RE.test(value)) {
    throw new ServiceError(`channel must match ${CHANNEL_RE}`, 400);
  }
  return value;
}

function releasesScope(appId: string): string {
  return svcScope("apps", "releases", appId);
}

/** Time-prefixed id: sortable, unique. */
export function newReleaseId(): string {
  return `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
}

/**
 * Hash of the manifest's durable fields. Channel pointers and timestamps are
 * excluded deliberately: promoting a channel must not change what the release
 * says the app *is*.
 */
export function manifestHash(manifest: AppManifest): string {
  const {
    channels: _channels,
    updatedAt: _updatedAt,
    createdAt: _createdAt,
    ...durable
  } = manifest;
  return createHash("sha256").update(JSON.stringify(durable)).digest("hex");
}

/** Snapshot the app's current content into a new release (does not save it). */
export async function snapshotRelease(
  workspaceId: string,
  manifest: AppManifest,
  options: { channel: string; notes?: string; createdBy: string },
): Promise<AppRelease> {
  const store = getFsStore();
  const entry = await store.read(workspaceId, manifest.entry).catch(() => undefined);

  const workflows: Record<string, string> = {};
  for (const name of manifest.workflows ?? []) {
    const registration = await readRegistration(workspaceId, name).catch(() => undefined);
    if (!registration) continue;
    const script = await store.read(workspaceId, registration.scriptPath).catch(() => undefined);
    if (script) workflows[name] = script.hash;
  }

  return {
    id: newReleaseId(),
    channel: options.channel,
    notes: options.notes,
    manifestHash: manifestHash(manifest),
    entryHash: entry?.hash,
    workflows,
    entry: manifest.entry,
    manifest: { ...manifest },
    createdBy: options.createdBy,
    createdAt: new Date().toISOString(),
  };
}

export async function saveRelease(
  workspaceId: string,
  appId: string,
  release: AppRelease,
): Promise<void> {
  await writeSvcRecord(
    workspaceId,
    releasesScope(appId),
    release.id,
    release,
    release.createdBy,
  );
}

export async function readRelease(
  workspaceId: string,
  appId: string,
  id: string,
): Promise<AppRelease | undefined> {
  if (!id) return undefined;
  return readSvcRecord<AppRelease>(workspaceId, releasesScope(appId), id).catch(() => undefined);
}

/** Every release of an app, newest first (ids are time-prefixed). */
export async function listReleases(
  workspaceId: string,
  appId: string,
): Promise<AppRelease[]> {
  const entries = await listSvcRecords<AppRelease>(workspaceId, releasesScope(appId));
  return entries.map((entry) => entry.value).reverse();
}

/** Point a channel at a release and persist the manifest. */
export async function setChannel(
  workspaceId: string,
  manifest: AppManifest,
  channel: string,
  releaseId: string,
): Promise<AppManifest> {
  const next: AppManifest = {
    ...manifest,
    channels: { ...(manifest.channels ?? {}), [channel]: releaseId },
    updatedAt: new Date().toISOString(),
  };
  await saveApp(workspaceId, next);
  return next;
}

/**
 * The release a channel currently serves, or undefined when the channel has
 * no pointer (the app serves latest content).
 */
export async function resolveChannelRelease(
  workspaceId: string,
  manifest: AppManifest,
  channel: string,
): Promise<AppRelease | undefined> {
  const id = manifest.channels?.[channel];
  return id ? readRelease(workspaceId, manifest.appId, id) : undefined;
}

/**
 * The release a rollback on `channel` should land on: the newest release
 * older than the current pointer, preferring ones cut on the same channel so
 * a rollback on `preview` can't drag `live`'s history in.
 */
export function previousRelease(
  releases: AppRelease[],
  currentId: string | undefined,
  channel: string,
): AppRelease | undefined {
  const index = currentId ? releases.findIndex((release) => release.id === currentId) : -1;
  const older = index >= 0 ? releases.slice(index + 1) : releases;
  return older.find((release) => release.channel === channel) ?? older[0];
}
