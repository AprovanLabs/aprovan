/**
 * S3 blob garbage collection — mark-and-sweep (tech-plan D7,
 * specs/fs-metadata-store "S3 blob garbage collection").
 *
 * Content blobs (`blobs/<workspaceId>/<hash>`) are content-addressed and
 * shared across paths/versions inside a workspace; a delete or an
 * unversioned overwrite drops the referencing index row(s) but never the
 * blob itself. This sweep reclaims what's left unreferenced:
 *
 *   1. Scan `FsFiles` for the live-hash set (every `P#`/`V#` row's hash —
 *      unversioned writes leave only the `P#` row, which is exactly why
 *      their old blobs fall out of this set the moment they're overwritten).
 *   2. List every object under `blobs/` in the FS bucket.
 *   3. Delete any object not in the live set that's older than the safety
 *      age (default 7 days — protects blobs mid-upload: `createUpload`
 *      hands out a presigned PUT before `completeUpload` ever registers an
 *      index row, so a blob can be legitimately unreferenced for a few
 *      minutes).
 *
 * Runnable directly (`tsx scripts/gc-blobs.ts [--dry-run]`) or imported by a
 * leader-leased schedule (see {@link startGcBlobsSchedule}, and
 * runtime/leader.ts for the election primitive it reuses).
 */

import { dynamo } from "../src/db/client.js";
import { s3 } from "../src/fs-store.js";
import { LeaderLease } from "../src/runtime/leader.js";

const DEFAULT_SAFETY_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface GcOptions {
  /** Report counts without deleting anything. */
  dryRun?: boolean;
  /** Override the default 7-day safety age (tests only). */
  safetyAgeMs?: number;
  tableName?: string;
  bucket?: string;
}

export interface GcReport {
  /** Objects examined under `blobs/`. */
  scanned: number;
  /** Objects still referenced by a latest-pointer or version row. */
  live: number;
  /** Objects deleted (or that would be, under `--dry-run`). */
  deleted: number;
}

/** `blobs/<workspaceId>/<hash>` → the live-hash set, one Scan over FsFiles. */
async function collectLiveBlobKeys(tableName: string): Promise<Set<string>> {
  const { client, ScanCommand } = await dynamo();
  const live = new Set<string>();
  let cursor: Record<string, unknown> | undefined;
  do {
    const page = await client.send(
      new ScanCommand({
        TableName: tableName,
        ProjectionExpression: "workspaceId, #h",
        ExpressionAttributeNames: { "#h": "hash" },
        ExclusiveStartKey: cursor,
        // Strongly consistent: an unversioned write's overwrite of the P#
        // row must be visible to the very next sweep, or the old hash reads
        // as still-live and its orphaned blob never gets reclaimed.
        ConsistentRead: true,
      }),
    );
    for (const item of page.Items ?? []) {
      const workspaceId = item["workspaceId"];
      const hash = item["hash"];
      if (typeof workspaceId === "string" && typeof hash === "string") {
        live.add(`blobs/${workspaceId}/${hash}`);
      }
    }
    cursor = page.LastEvaluatedKey;
  } while (cursor);
  return live;
}

/** Mark-and-sweep one pass. Idempotent — safe to run repeatedly/concurrently. */
export async function sweepBlobs(opts: GcOptions = {}): Promise<GcReport> {
  const tableName = opts.tableName ?? process.env["FS_TABLE"] ?? "FsFiles";
  const bucket = opts.bucket ?? process.env["FS_BUCKET"];
  if (!bucket) throw new Error("FS_BUCKET must be set (or pass { bucket })");
  const safetyAgeMs = opts.safetyAgeMs ?? DEFAULT_SAFETY_AGE_MS;
  const dryRun = opts.dryRun ?? false;

  const live = await collectLiveBlobKeys(tableName);
  const { client, ListObjectsV2Command, DeleteObjectCommand } = await s3();

  const report: GcReport = { scanned: 0, live: 0, deleted: 0 };
  const cutoff = Date.now() - safetyAgeMs;
  let token: string | undefined;
  do {
    const page = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: "blobs/", ContinuationToken: token }),
    );
    for (const object of page.Contents ?? []) {
      const key = object.Key;
      if (!key) continue;
      report.scanned += 1;
      if (live.has(key)) {
        report.live += 1;
        continue;
      }
      const lastModified = object.LastModified?.getTime() ?? Date.now();
      if (lastModified > cutoff) continue; // too fresh — might be mid-upload
      report.deleted += 1;
      if (!dryRun) {
        await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
      }
    }
    token = page.NextContinuationToken;
  } while (token);

  return report;
}

/**
 * Leader-leased daily sweep. Mirrors runtime/cron.ts's shape (lease held →
 * tick fires; lost race → this process stays quiet) without adding another
 * cron-tick consumer — GC doesn't need minute granularity.
 */
const GC_INTERVAL_MS = 24 * 60 * 60 * 1000; // once/day is plenty for a 7-day safety age

export interface GcSchedule {
  isLeader(): boolean;
  stop(): Promise<void>;
}

export function startGcBlobsSchedule(opts: GcOptions = {}): GcSchedule {
  const lease = new LeaderLease("gc-blobs");
  lease.start();

  const tick = (): void => {
    if (!lease.held()) return;
    void sweepBlobs(opts).catch(() => undefined);
  };

  const timer = setInterval(tick, GC_INTERVAL_MS);
  timer.unref?.();

  return {
    isLeader: () => lease.held(),
    async stop() {
      clearInterval(timer);
      await lease.release();
    },
  };
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const report = await sweepBlobs({ dryRun });
  console.log(JSON.stringify({ dryRun, ...report }, null, 2));
}

// Only run when invoked directly (`tsx scripts/gc-blobs.ts`), not when
// imported by tests or the schedule hook.
if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
