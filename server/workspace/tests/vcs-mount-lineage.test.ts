/**
 * Mount lineage (specs/mount-lineage; tech-plan data-auth-model D4/D5):
 * commits record a deterministic version token per mount in the snapshot
 * (git commit SHA; s3 sorted-listing manifest hash) and a timestamped
 * provenance record on the commit; upstream movement alone forces a new
 * snapshot; identical trees over identical mount states short-circuit;
 * resolution failure degrades to a null token without blocking the commit;
 * and pre-lineage records still parse.
 *
 * GitHub is stubbed with a local HTTP server behind GITHUB_API_URL (the
 * sandbox-repo-mounts pattern); the AWS S3 SDK is vi.mocked.
 */

import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { readSvcRecord, svcScope, writeSvcRecord } from "../src/svc-records.js";
import {
  addMount,
  collectMountLineage,
  removeMount,
  resetMountsCache,
} from "../src/vcs/mounts.js";
import {
  commitTree,
  readCommit,
  readSnapshot,
  type VcsCommit,
  type VcsSnapshot,
} from "../src/vcs/store.js";

// ---------------------------------------------------------------------------
// S3 SDK mock — a fixed two-object bucket listing, deliberately unsorted.
// ---------------------------------------------------------------------------

const S3_OBJECTS = [
  { Key: "assets/zeta.png", ETag: '"etag-zeta"', Size: 5 },
  { Key: "assets/alpha.css", ETag: '"etag-alpha"', Size: 3 },
];

vi.mock("@aws-sdk/client-s3", () => {
  class ListObjectsV2Command {
    constructor(public readonly input: Record<string, unknown>) {}
  }
  class GetObjectCommand {
    constructor(public readonly input: Record<string, unknown>) {}
  }
  class DeleteObjectCommand {
    constructor(public readonly input: Record<string, unknown>) {}
  }
  class PutObjectCommand {
    constructor(public readonly input: Record<string, unknown>) {}
  }
  class S3Client {
    async send(command: unknown): Promise<unknown> {
      if (command instanceof ListObjectsV2Command) {
        return { Contents: S3_OBJECTS, NextContinuationToken: undefined };
      }
      throw new Error("unexpected S3 command in lineage test");
    }
  }
  return { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, PutObjectCommand };
});

// ---------------------------------------------------------------------------
// GitHub stub — the commits endpoint lineage resolution calls.
// ---------------------------------------------------------------------------

let currentSha = "1111111111111111111111111111111111111111";
let commitsEndpointBroken = false;

let githubServer: { url: string; close: () => Promise<void> };

async function startGithubStub(): Promise<typeof githubServer> {
  const { createServer } = await import("node:http");
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://stub");
    const json = (status: number, body: unknown): void => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    };
    if (/^\/repos\/org\/charts\/commits\//u.test(url.pathname)) {
      if (commitsEndpointBroken) {
        json(500, { message: "GitHub is down" });
        return;
      }
      json(200, { sha: currentSha });
      return;
    }
    json(404, { message: "Not Found" });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  return {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
}

let dataDir: string;

beforeAll(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-mount-lineage-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  githubServer = await startGithubStub();
  process.env["GITHUB_API_URL"] = githubServer.url;
  resetMountsCache();
});

afterAll(async () => {
  await githubServer.close();
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GITHUB_API_URL"];
  resetMountsCache();
  rmSync(dataDir, { recursive: true, force: true });
});

const putFile = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

/** Store-backed stand-in for the retired vfs/show shape this file asserts on. */
async function showCommit(commitId: string): Promise<{
  commit: VcsCommit;
  entries: Array<{ path: string }>;
  mounts?: Array<{ prefix: string; type: string; configHash: string; versionToken: string | null }>;
}> {
  const commit = (await readCommit("local", commitId)) as VcsCommit;
  const snapshot = (await readSnapshot("local", commit.snapshot)) as VcsSnapshot;
  return {
    commit,
    entries: snapshot.entries,
    mounts: snapshot.mounts,
  };
}

describe("mount lineage on commits", () => {
  it("records the git SHA + provenance, forces a new snapshot on upstream movement, and short-circuits when nothing moved", async () => {
    await putFile("src/main.ts", "export {};");
    await addMount("local", "user1", {
      prefix: "vendor/charts",
      type: "git",
      config: { repo: "org/charts", ref: "main" },
    });

    // Commit 1: token = the SHA `main` resolves to right now.
    const first = await commitTree("local", { message: "first", author: "user1" });
    expect(first.created).toBe(true);
    const firstShow = await showCommit(first.commit.id);
    const firstMount = firstShow.mounts?.find((m) => m.prefix === "vendor/charts");
    expect(firstMount).toMatchObject({ type: "git", versionToken: currentSha });
    expect(firstMount?.configHash).toMatch(/^[0-9a-f]{64}$/u);
    const provenance = firstShow.commit.provenance?.find((p) => p.prefix === "vendor/charts");
    expect(provenance).toMatchObject({
      prefix: "vendor/charts",
      source: { type: "git", repo: "org/charts", ref: "main" },
      originDomain: "127.0.0.1",
    });
    expect(Date.parse(provenance!.retrievedAt)).not.toBeNaN();

    // No native change, no upstream change: the head short-circuits.
    const unchanged = await commitTree("local", { message: "no-op", author: "user1" });
    expect(unchanged.created).toBe(false);
    expect(unchanged.commit.id).toBe(first.commit.id);

    // Upstream moves; still no native change → a NEW snapshot + commit whose
    // mount entry carries the new SHA (mount tokens are snapshot identity).
    currentSha = "2222222222222222222222222222222222222222";
    const second = await commitTree("local", { message: "upstream moved", author: "user1" });
    expect(second.created).toBe(true);
    expect(second.commit.snapshot).not.toBe(first.commit.snapshot);
    const secondShow = await showCommit(second.commit.id);
    expect(secondShow.mounts?.find((m) => m.prefix === "vendor/charts")?.versionToken).toBe(
      "2222222222222222222222222222222222222222",
    );
    // Native entries are identical across the two snapshots.
    expect(secondShow.entries.map((e) => e.path)).toEqual(
      firstShow.entries.map((e) => e.path),
    );
  });

  it("degrades to a null token (provenance still recorded) when resolution fails", async () => {
    commitsEndpointBroken = true;
    try {
      const res = await commitTree("local", { message: "github down", author: "user1" });
      expect(res.created).toBe(true);
      const show = await showCommit(res.commit.id);
      expect(show.mounts?.find((m) => m.prefix === "vendor/charts")?.versionToken).toBeNull();
      const prov = res.commit.provenance?.find((p) => p.prefix === "vendor/charts");
      expect(prov?.source).toMatchObject({ type: "git", repo: "org/charts" });
      expect(Date.parse(prov!.retrievedAt)).not.toBeNaN();
    } finally {
      commitsEndpointBroken = false;
    }
  });

  it("computes a deterministic s3 manifest hash over sorted '<etag> <path>' lines", async () => {
    await addMount("local", "user1", {
      prefix: "media",
      type: "s3",
      config: { bucket: "assets-bucket", prefix: "assets", region: "eu-west-1" },
    });

    const lineage = await collectMountLineage("local");
    const s3Entry = lineage.entries.find((entry) => entry.prefix === "media");
    const expected = createHash("sha256")
      .update(
        ["etag-zeta media/zeta.png", "etag-alpha media/alpha.css"]
          .sort()
          .join("\n"),
      )
      .digest("hex");
    expect(s3Entry).toMatchObject({ type: "s3", versionToken: expected });

    // Unchanged bucket → identical token on re-resolution.
    const again = await collectMountLineage("local");
    expect(again.entries.find((entry) => entry.prefix === "media")?.versionToken).toBe(expected);

    const s3Prov = lineage.provenance.find((entry) => entry.prefix === "media");
    expect(s3Prov).toMatchObject({
      source: { type: "s3", bucket: "assets-bucket", prefix: "assets", region: "eu-west-1" },
      originDomain: "assets-bucket.s3.eu-west-1.amazonaws.com",
    });

    await removeMount("local", "media");
  });

  it("parses pre-lineage commit/snapshot JSON (no mounts, no provenance) without error", async () => {
    const legacySnapshot = {
      id: "legacy-snap",
      prefix: "",
      entries: [{ path: "old.txt", hash: "h1", mimeType: "text/plain", size: 3 }],
    };
    const legacyCommit = {
      id: "legacy-commit",
      snapshot: "legacy-snap",
      prefix: "",
      parents: [],
      message: "pre-lineage",
      author: "old",
      createdAt: new Date(0).toISOString(),
      stats: { added: 1, modified: 0, removed: 0 },
    };
    await writeSvcRecord("local", svcScope("vcs", "snapshots"), legacySnapshot.id, legacySnapshot);
    await writeSvcRecord("local", svcScope("vcs", "commits"), legacyCommit.id, legacyCommit);

    const snapshot = (await readSnapshot("local", "legacy-snap")) as VcsSnapshot;
    expect(snapshot.mounts).toBeUndefined();
    const commit = (await readCommit("local", "legacy-commit")) as VcsCommit;
    expect(commit.provenance).toBeUndefined();

    const show = await showCommit("legacy-commit");
    expect(show.mounts).toBeUndefined();
    expect(show.commit.provenance).toBeUndefined();
    expect(show.entries.map((entry) => entry.path)).toEqual(["old.txt"]);

    // Sanity: the record really is the legacy shape on disk.
    const raw = await readSvcRecord<Record<string, unknown>>(
      "local",
      svcScope("vcs", "commits"),
      "legacy-commit",
    );
    expect(raw && "provenance" in raw).toBe(false);
  });
});
