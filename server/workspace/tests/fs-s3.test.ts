/**
 * Integration tests for the S3+DynamoDB workspace-fs backend.
 *
 * Requires the local compose stack (`docker compose up -d` at the repo
 * root): DynamoDB at `DYNAMO_ENDPOINT` (default http://localhost:8000) and
 * MinIO at `S3_ENDPOINT` (default http://localhost:9000). Skipped
 * automatically when either endpoint is unreachable so the suite stays
 * green without Docker.
 */

import {
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  waitUntilTableExists,
} from "@aws-sdk/client-dynamodb";
import { CreateBucketCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { sweepBlobs } from "../scripts/gc-blobs.js";
import { createApp } from "../src/app.js";
import { resetDynamoDocClient } from "../src/db/client.js";
import { FsFiles } from "../src/db/schema.js";
import { getFsStore, resetFsStore, resetS3Client } from "../src/fs-store.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const tick = (ms = 20) => new Promise((resolve) => setTimeout(resolve, ms));

// MinIO/S3 LastModified has whole-second resolution, so GC tests that need
// an "aged" blob must cross a full second boundary with margin — a
// millisecond-scale safety age would be indistinguishable from "now" once
// truncated.
const GC_TEST_GAP_MS = 1200;
const GC_TEST_SAFETY_AGE_MS = 300;

const TABLE_NAME = "FsFiles-test";
const BUCKET = "aprovan-fs-test";
const DYNAMO_ENDPOINT = process.env["DYNAMO_ENDPOINT"] ?? "http://localhost:8000";
const S3_ENDPOINT = process.env["S3_ENDPOINT"] ?? "http://localhost:9000";

let ready = false;

try {
  await provision();
  ready = true;
} catch (err) {
  process.stderr.write(
    `[fs-s3] skipping suite — compose stack unreachable (${
      err instanceof Error ? `${err.name}: ${err.message || "unknown"}` : String(err)
    })\n`,
  );
}

async function provision(): Promise<void> {
  const dynamo = new DynamoDBClient({
    endpoint: DYNAMO_ENDPOINT,
    region: "us-east-1",
    credentials: { accessKeyId: "local", secretAccessKey: "local" },
  });
  try {
    await dynamo.send(new DeleteTableCommand({ TableName: TABLE_NAME }));
  } catch {
    // Table absent — fine.
  }
  await dynamo.send(
    new CreateTableCommand({ ...FsFiles.createInput, TableName: TABLE_NAME }),
  );
  await waitUntilTableExists(
    { client: dynamo, maxWaitTime: 30, minDelay: 1 },
    { TableName: TABLE_NAME },
  );

  const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: "us-east-1",
    forcePathStyle: true,
    credentials: { accessKeyId: "minioadmin", secretAccessKey: "minioadmin" },
  });
  try {
    await s3.send(new CreateBucketCommand({ Bucket: BUCKET }));
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    if (name !== "BucketAlreadyOwnedByYou" && name !== "BucketAlreadyExists") throw err;
  }
}

const request = (path: string, init?: RequestInit) =>
  createApp().request(path, init);

const put = (path: string, content: string) =>
  request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

const gcS3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: "us-east-1",
  forcePathStyle: true,
  credentials: { accessKeyId: "minioadmin", secretAccessKey: "minioadmin" },
});

/** Whether the blob for `hash` in workspace `local` still exists in S3. */
async function blobExists(hash: string): Promise<boolean> {
  try {
    await gcS3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: `blobs/local/${hash}` }));
    return true;
  } catch {
    return false;
  }
}

describe.skipIf(!ready)("workspace filesystem (S3+DynamoDB backend)", () => {
  beforeAll(() => {
    process.env["WORKSPACE_MODE"] = "aws";
    process.env["DYNAMO_ENDPOINT"] = DYNAMO_ENDPOINT;
    process.env["S3_ENDPOINT"] = S3_ENDPOINT;
    process.env["FS_TABLE"] = TABLE_NAME;
    process.env["FS_BUCKET"] = BUCKET;
    resetWorkspaceConfig();
    resetDynamoDocClient();
    resetS3Client();
    resetFsStore();
  });

  afterAll(() => {
    delete process.env["FS_TABLE"];
    delete process.env["FS_BUCKET"];
    delete process.env["S3_ENDPOINT"];
    delete process.env["WORKSPACE_MODE"];
    resetWorkspaceConfig();
    resetDynamoDocClient();
    resetS3Client();
    resetFsStore();
  });

  it("writes and reads a file back", async () => {
    const written = await put("widgets/timer/main.tsx", "export default 1;");
    expect(written.status).toBe(201);
    const { hash } = (await written.json()) as { hash: string };

    const read = await request("/fs/widgets/timer/main.tsx");
    expect(read.status).toBe(200);
    expect(await read.json()).toMatchObject({
      path: "widgets/timer/main.tsx",
      content: "export default 1;",
      hash,
    });
  });

  it("keeps hash-pinned history across rewrites", async () => {
    const first = (await (await put("notes.md", "v1")).json()) as { hash: string };
    const second = (await (await put("notes.md", "v2")).json()) as { hash: string };
    expect(first.hash).not.toBe(second.hash);

    const latest = await request("/fs/notes.md");
    expect(((await latest.json()) as { content: string }).content).toBe("v2");

    const pinned = await request(`/fs/notes.md?hash=${first.hash}`);
    expect(((await pinned.json()) as { content: string }).content).toBe("v1");
  });

  it("listVersions enumerates the V# rows newest-first", async () => {
    const first = (await (await put("versioned.md", "one")).json()) as { hash: string };
    await put("versioned.md", "two");
    const live = (await (await put("versioned.md", "three")).json()) as { hash: string };

    const store = getFsStore();
    const versions = await store.listVersions("local", "versioned.md");
    expect(versions.length).toBeGreaterThanOrEqual(3);
    expect(versions[0]!.hash).toBe(live.hash);
    expect(versions.map((v) => v.hash)).toContain(first.hash);
    expect(await store.listVersions("local", "nope.md")).toEqual([]);
  });

  it("lists a subtree without over-matching partial segments", async () => {
    await put("widgets/clock/main.tsx", "clock");
    await put("widgetsized/other.txt", "nope");

    const response = await request("/fs?prefix=widgets");
    const { entries } = (await response.json()) as {
      entries: Array<{ path: string }>;
    };
    const paths = entries.map((entry) => entry.path);
    expect(paths).toContain("widgets/clock/main.tsx");
    expect(paths).toContain("widgets/timer/main.tsx");
    expect(paths).not.toContain("widgetsized/other.txt");
  });

  it("deletes a file and a subtree", async () => {
    await put("tmp/a.txt", "a");
    await put("tmp/b/c.txt", "c");

    const single = await request("/fs/tmp/a.txt", { method: "DELETE" });
    expect(single.status).toBe(204);
    expect((await request("/fs/tmp/a.txt")).status).toBe(404);

    const subtree = await request("/fs/tmp?recursive=1", { method: "DELETE" });
    expect(subtree.status).toBe(204);
    expect((await request("/fs/tmp/b/c.txt")).status).toBe(404);
  });

  it("uploads a blob via presigned PUT and registers it", async () => {
    const content = "binary-ish payload";
    const hash = await sha256Hex(content);

    const ticketResponse = await request("/fs-uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash, mimeType: "text/plain" }),
    });
    expect(ticketResponse.status).toBe(201);
    const ticket = (await ticketResponse.json()) as {
      url: string;
      headers: Record<string, string>;
    };

    const uploaded = await fetch(ticket.url, {
      method: "PUT",
      headers: ticket.headers,
      body: content,
    });
    expect(uploaded.ok).toBe(true);

    const completed = await request("/fs-uploads/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "data/upload.txt", hash, mimeType: "text/plain" }),
    });
    expect(completed.status).toBe(201);

    const read = await request("/fs/data/upload.txt");
    expect(((await read.json()) as { content: string }).content).toBe(content);
  });

  it("404s completion for a hash that was never uploaded", async () => {
    const response = await request("/fs-uploads/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "data/missing.txt", hash: "0".repeat(64) }),
    });
    expect(response.status).toBe(404);
  });

  it("unversioned service-path writes leave no version trail", async () => {
    const store = getFsStore();
    const path = ".services/keyvalue/counter.json";
    for (let i = 0; i < 50; i += 1) {
      await store.write("local", path, JSON.stringify({ i }));
    }
    // The S3 backend never mints a V# row for unversioned writes, so
    // listVersions is empty — "at most the latest entry" per the spec.
    expect(await store.listVersions("local", path)).toEqual([]);
    expect((await store.read("local", path))?.content).toBe(JSON.stringify({ i: 49 }));
  });

  it("authored writes still version on the S3+DynamoDB backend", async () => {
    const store = getFsStore();
    await store.write("local", "widgets/versioned/index.ts", "v1");
    await store.write("local", "widgets/versioned/index.ts", "v2");
    const versions = await store.listVersions("local", "widgets/versioned/index.ts");
    expect(versions.length).toBeGreaterThanOrEqual(2);
  });

  it("pages a listing by cursor with no gaps or duplicates", async () => {
    const { getFsStore: freshStore } = await import("../src/fs-store.js");
    const store = freshStore();
    for (let i = 0; i < 15; i += 1) {
      await store.write("pagews", `pages/f${String(i).padStart(2, "0")}.txt`, `v${i}`);
    }
    const first = await store.list("pagews", "pages", { limit: 10 });
    expect(first.entries).toHaveLength(10);
    expect(first.cursor).toBeDefined();
    const second = await store.list("pagews", "pages", { cursor: first.cursor, limit: 10 });
    expect(second.entries).toHaveLength(5);
    const all = [...first.entries, ...second.entries].map((e) => e.path);
    expect(new Set(all).size).toBe(15);
    expect(all).toEqual([...all].sort());
  });

  describe("blob garbage collection", () => {
    it("reclaims an orphaned blob (overwritten unversioned write) but spares the referenced one", async () => {
      const store = getFsStore();
      const path = ".services/keyvalue/gc-orphan.json";
      const first = await store.write("local", path, "orphan-me");
      // MinIO/S3 LastModified truncates to whole seconds, so the gap between
      // "orphan" and "sweep" has to clear a full second of slack, not just
      // the nominal safety age, to be deterministic.
      await tick(GC_TEST_GAP_MS);
      const second = await store.write("local", path, "still-referenced");
      expect(first.hash).not.toBe(second.hash);
      expect(await blobExists(first.hash)).toBe(true);
      expect(await blobExists(second.hash)).toBe(true);

      const report = await sweepBlobs({
        tableName: TABLE_NAME,
        bucket: BUCKET,
        safetyAgeMs: GC_TEST_SAFETY_AGE_MS,
      });
      expect(report.deleted).toBeGreaterThanOrEqual(1);

      // The orphan's blob is gone; the still-referenced one survives, and a
      // plain read of the path is unaffected.
      expect(await blobExists(first.hash)).toBe(false);
      expect(await blobExists(second.hash)).toBe(true);
      expect((await store.read("local", path))?.content).toBe("still-referenced");
    });

    it("spares a fresh unreferenced blob (mid-upload, not yet completed)", async () => {
      const store = getFsStore();
      if (!store.createUpload) throw new Error("expected the S3 backend's createUpload");
      const content = "not-registered-yet";
      const hash = await sha256Hex(content);
      const ticket = await store.createUpload("local", hash, "text/plain");
      const uploaded = await fetch(ticket.url, {
        method: "PUT",
        headers: ticket.headers,
        body: content,
      });
      expect(uploaded.ok).toBe(true);

      // Default (large) safety age — the sweep must not touch a blob that's
      // seconds old just because completeUpload hasn't run yet.
      const report = await sweepBlobs({ tableName: TABLE_NAME, bucket: BUCKET });
      expect(report.scanned).toBeGreaterThan(0);
      expect(await blobExists(hash)).toBe(true);

      // Still there: registering it now succeeds.
      const completed = await request("/fs-uploads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "data/gc-survivor.txt", hash, mimeType: "text/plain" }),
      });
      expect(completed.status).toBe(201);
    });

    it("dry-run reports without deleting", async () => {
      const store = getFsStore();
      const path = ".services/keyvalue/gc-dry-run.json";
      // Content must be unique across the suite — it's content-addressed, so
      // reusing a literal another test also writes (even to a different,
      // versioned path) would make this blob permanently "live" there.
      const first = await store.write("local", path, "gc-dry-run-orphan");
      await tick(GC_TEST_GAP_MS);
      await store.write("local", path, "gc-dry-run-current");

      const before = await sweepBlobs({
        tableName: TABLE_NAME,
        bucket: BUCKET,
        safetyAgeMs: GC_TEST_SAFETY_AGE_MS,
        dryRun: true,
      });
      expect(before.deleted).toBeGreaterThanOrEqual(1);
      // Dry run reported it, but didn't touch S3.
      expect(await blobExists(first.hash)).toBe(true);

      // A real sweep right after still finds (and this time removes) the
      // same orphan — the dry run didn't delete anything.
      const after = await sweepBlobs({
        tableName: TABLE_NAME,
        bucket: BUCKET,
        safetyAgeMs: GC_TEST_SAFETY_AGE_MS,
      });
      expect(after.deleted).toBeGreaterThanOrEqual(before.deleted);
      expect(await blobExists(first.hash)).toBe(false);
    });
  });
});

async function sha256Hex(content: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(content),
  );
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
