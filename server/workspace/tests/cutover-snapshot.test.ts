/**
 * Stream 9 — snapshot to a bootable SQLite mirror + verification by local
 * boot (specs/storage-cutover). Runs against the compose stack
 * (dynamodb-local + MinIO), skipped when unreachable so the suite stays
 * green without Docker.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  CreateTableCommand,
  DeleteTableCommand,
  DynamoDBClient,
  waitUntilTableExists,
} from "@aws-sdk/client-dynamodb";
import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { snapshotToSqlite } from "../scripts/snapshot-to-sqlite.js";
import { verifySnapshot } from "../scripts/verify-snapshot.js";
import { resetDynamoDocClient } from "../src/db/client.js";
import { Credentials, FsFiles, Records } from "../src/db/schema.js";
import { FsStoreS3, resetFsStore, resetS3Client } from "../src/fs-store.js";
import { resetIdentityStore } from "../src/identity/store.js";
import { RecordStoreDynamodb, resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const FS_TABLE = "FsFiles-cutover";
const RECORDS_TABLE = "Records-cutover";
const CREDENTIALS_TABLE = "Credentials-cutover";
const BUCKET = "aprovan-fs-cutover";
const DYNAMO_ENDPOINT = process.env["DYNAMO_ENDPOINT"] ?? "http://localhost:8000";
const S3_ENDPOINT = process.env["S3_ENDPOINT"] ?? "http://localhost:9000";

let ready = false;

try {
  const dynamo = new DynamoDBClient({
    endpoint: DYNAMO_ENDPOINT,
    region: "us-east-1",
    credentials: { accessKeyId: "local", secretAccessKey: "local" },
  });
  for (const [name, schema] of [
    [FS_TABLE, FsFiles],
    [RECORDS_TABLE, Records],
    [CREDENTIALS_TABLE, Credentials],
  ] as const) {
    try {
      await dynamo.send(new DeleteTableCommand({ TableName: name }));
    } catch {
      // Absent — fine.
    }
    await dynamo.send(new CreateTableCommand({ ...schema.createInput, TableName: name }));
    await waitUntilTableExists(
      { client: dynamo, maxWaitTime: 30, minDelay: 1 },
      { TableName: name },
    );
  }
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
  ready = true;
} catch (err) {
  process.stderr.write(
    `[cutover-snapshot] skipping suite — compose stack unreachable (${
      err instanceof Error ? `${err.name}: ${err.message || "unknown"}` : String(err)
    })\n`,
  );
}

describe.skipIf(!ready)("snapshot to a bootable SQLite mirror", () => {
  let mirrorDir: string;

  beforeAll(() => {
    mirrorDir = mkdtempSync(join(tmpdir(), "cutover-mirror-"));
    process.env["WORKSPACE_MODE"] = "aws";
    process.env["DYNAMO_ENDPOINT"] = DYNAMO_ENDPOINT;
    process.env["S3_ENDPOINT"] = S3_ENDPOINT;
    process.env["FS_TABLE"] = FS_TABLE;
    process.env["FS_BUCKET"] = BUCKET;
    process.env["RECORDS_TABLE"] = RECORDS_TABLE;
    process.env["CREDENTIALS_TABLE"] = CREDENTIALS_TABLE;
    resetWorkspaceConfig();
    resetDynamoDocClient();
    resetS3Client();
    resetFsStore();
    resetRecordStore();
    resetIdentityStore();
  });

  afterAll(() => {
    for (const key of [
      "FS_TABLE",
      "FS_BUCKET",
      "RECORDS_TABLE",
      "CREDENTIALS_TABLE",
      "S3_ENDPOINT",
      "WORKSPACE_MODE",
      "WORKSPACE_DATA_DIR",
    ]) {
      delete process.env[key];
    }
    resetWorkspaceConfig();
    resetDynamoDocClient();
    resetS3Client();
    resetFsStore();
    resetRecordStore();
    resetIdentityStore();
    rmSync(mirrorDir, { recursive: true, force: true });
  });

  it("mirrors latest pointers + blobs + records, resumably, and boots verified", async () => {
    // Seed the "deployment": files (incl. one overwritten so the V# history
    // exists but only the latest survives), a service write, records.
    const fs = new FsStoreS3({ tableName: FS_TABLE, bucket: BUCKET });
    await fs.write("ws-cut", "widgets/a.ts", "old content");
    const latest = await fs.write("ws-cut", "widgets/a.ts", "new content");
    await fs.write("ws-cut", "README.md", "# hello");
    await fs.write("ws-two", "notes.md", "second workspace");
    const records = new RecordStoreDynamodb({ tableName: RECORDS_TABLE, bucket: BUCKET });
    await records.set("ws-cut", "ws", "counter", { n: 7 }, "alice");
    await records.set("ws-cut", "svc#workflows", "daily", { name: "daily" }, "system");

    const counts = await snapshotToSqlite(mirrorDir);
    // Latest pointers only: widgets/a.ts (1), README.md, notes.md.
    expect(counts.fsFiles).toBe(3);
    expect(counts.fsBlobsDownloaded).toBe(3);
    expect(counts.records).toBe(2);

    // Resumable: a re-run skips every already-mirrored blob.
    const again = await snapshotToSqlite(mirrorDir);
    expect(again.fsBlobsDownloaded).toBe(0);
    expect(again.fsBlobsSkipped).toBe(3);

    // The mirror's rows equal the P# set — count and per-path hash — and
    // inline content hashes to its recorded hash: verified by local boot.
    const result = await verifySnapshot(mirrorDir);
    for (const check of result.checks) {
      expect(check, `${check.name}: ${check.detail ?? ""}`).toMatchObject({ ok: true });
    }
    expect(result.ok).toBe(true);

    // The booted store serves the latest content, not the overwritten one.
    const { getFsStore } = await import("../src/fs-store.js");
    const mirrored = await getFsStore().read("ws-cut", "widgets/a.ts");
    expect(mirrored?.content).toBe("new content");
    expect(mirrored?.hash).toBe(latest.hash);

    // And a failure is a failure: verification against a missing mirror
    // rejects (the CLI wrapper turns that into a non-zero exit).
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    await expect(verifySnapshot(join(mirrorDir, "not-a-mirror"))).rejects.toThrow();
    spy.mockRestore();

    // Re-point the store layer at the real mirror for any later suites.
    process.env["WORKSPACE_DATA_DIR"] = mirrorDir;
  });
});

// ---------------------------------------------------------------------------
// Regeneration (specs/storage-cutover, "Registrations are regenerated, not
// copied"): local-mode — registrations re-validate against authored sources
// and webhook secrets rotate with a report.
// ---------------------------------------------------------------------------

describe("post-reseed regeneration", () => {
  let dataDir: string;

  beforeAll(() => {
    dataDir = mkdtempSync(join(tmpdir(), "cutover-regen-"));
    process.env["WORKSPACE_DATA_DIR"] = dataDir;
    resetWorkspaceConfig();
    resetFsStore();
    resetRecordStore();
  });

  afterAll(() => {
    delete process.env["WORKSPACE_DATA_DIR"];
    resetWorkspaceConfig();
    resetFsStore();
    resetRecordStore();
    rmSync(dataDir, { recursive: true, force: true });
  });

  it("re-validates registrations and rotates webhook + hook secrets", async () => {
    const { createApp } = await import("../src/app.js");
    const call = (path: string, args: Record<string, unknown>) =>
      createApp().request(`/tools/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ args }),
      });
    await createApp().request("/fs/workflows/wf.js", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "return 1;" }),
    });
    await call("workflows/register", {
      name: "regen-wf",
      script_path: "workflows/wf.js",
      triggers: { webhook: true },
    });
    // A workflow whose script is gone must surface as an ISSUE.
    await call("workflows/register", { name: "orphan-wf", script_path: "workflows/gone.js" });
    await call("webhooks/register", {
      id: "regen-hook",
      provider: "github",
      workflows: ["regen-wf"],
      signature: { header: "X-Hub-Signature-256", scheme: "hmac-sha256", secret: "old-secret" },
    });

    const { readRegistration } = await import("../src/workflows/store.js");
    const { readWebhook } = await import("../src/webhooks/store.js");
    const beforeWf = await readRegistration("local", "regen-wf");
    const beforeHook = await readWebhook("local", "regen-hook");

    const { regenerateRegistrations } = await import("../scripts/regenerate-registrations.js");
    const report = await regenerateRegistrations("local");

    const wf = report.workflows.find((w) => w.name === "regen-wf");
    expect(wf).toMatchObject({ ok: true, hookTokenRotated: true });
    const orphan = report.workflows.find((w) => w.name === "orphan-wf");
    expect(orphan?.ok).toBe(false);
    expect(orphan?.issue).toContain("workflows/gone.js");

    const hook = report.webhooks.find((h) => h.id === "regen-hook");
    expect(hook?.signatureRotated).toBe(true);

    // Fresh secrets actually landed.
    const afterWf = await readRegistration("local", "regen-wf");
    expect(afterWf?.hookToken).toBeDefined();
    expect(afterWf?.hookToken).not.toBe(beforeWf?.hookToken);
    const afterHook = await readWebhook("local", "regen-hook");
    expect(afterHook?.token).toBe(hook?.newToken);
    expect(afterHook?.token).not.toBe(beforeHook?.token);
    expect(afterHook?.signature?.secret).not.toBe("old-secret");
  });
});
