/**
 * Private per-user space (`.users/<sub>` + `user#<sub>`) — specs per-user-space.
 * Own space is listed and readable; foreign (incl. admin) answers 404; no
 * procedure serves `.users/**` for another member.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  resetHiddenDataPrefixCache,
  userSpaceDir,
} from "../src/apps/store.js";
import { getFsStore } from "../src/fs-store.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";
import { assertCallerScope, userRecordScope } from "../src/svc-records.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-user-space-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetAppRateLimiters();
  resetRateLimiters();
  resetHiddenDataPrefixCache();
});

const manage = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("userSpaceDir", () => {
  it("roots private space at .users/<sub>", () => {
    expect(userSpaceDir("alice")).toBe(".users/alice");
  });
});

describe("user# record scope self-only", () => {
  it("allows self-addressed user# and rejects foreign / missing caller", () => {
    expect(userRecordScope("alice")).toBe("user#alice");
    expect(() => assertCallerScope("user#alice", "scope", "alice")).not.toThrow();
    expect(() => assertCallerScope("user#alice", "scope", "bob")).toThrowError(/owner/);
    expect(() => assertCallerScope("user#alice", "scope")).toThrowError(/owner/);
    expect(() => assertCallerScope("ws", "scope")).not.toThrow();
    expect(() => assertCallerScope("app#x#u#alice", "scope", "bob")).not.toThrow();
  });
});

describe(".users file-plane", () => {
  it("own space is writable, readable, listed; foreign is 404 and unlisted", async () => {
    const store = getFsStore();
    await store.write("local", ".users/alice/secret.md", "alice-only");

    const mine = ".users/local/notes.md";
    const write = await manage("vfs/write", { path: mine, content: "my private notes" });
    expect(write.status).toBe(200);

    const read = await manage("vfs/read", { path: mine });
    expect(read.status).toBe(200);
    expect((await data<{ content: string }>(read)).content).toBe("my private notes");

    const foreign = await manage("vfs/read", { path: ".users/alice/secret.md" });
    expect(foreign.status).toBe(404);
    const pinned = await manage("vfs/read", {
      path: ".users/alice/secret.md",
      hash: (await store.read("local", ".users/alice/secret.md"))!.hash,
    });
    expect(pinned.status).toBe(404);

    const listing = await data<{ entries: Array<{ path: string }> }>(await manage("vfs/list", {}));
    const paths = listing.entries.map((entry) => entry.path);
    expect(paths).toContain(mine);
    expect(paths.some((path) => path.startsWith(".users/alice/"))).toBe(false);

    const httpForeign = await createApp().request("/fs/.users/alice/secret.md");
    const httpMissing = await createApp().request("/fs/definitely/missing.md");
    expect(httpForeign.status).toBe(404);
    expect(httpMissing.status).toBe(404);
    expect(await httpForeign.text()).toBe(await httpMissing.text());

    const httpList = await createApp().request("/fs");
    const httpPaths = (
      (await httpList.json()) as { entries: Array<{ path: string }> }
    ).entries.map((entry) => entry.path);
    expect(httpPaths).toContain(mine);
    expect(httpPaths.some((path) => path.startsWith(".users/alice/"))).toBe(false);
  });
});
