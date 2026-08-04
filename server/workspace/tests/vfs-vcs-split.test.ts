/**
 * vfs-vcs-split scenarios: driver ops only on `vfs`; commit/history/refs on
 * `vcs` (interface → aprovan native); mounts are path-keyed profiles.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { resolveInterfaceForWorkspace } from "../src/interfaces.js";
import { dispatchAprovanNativeOp, NATIVE_PROVIDER_ID } from "../src/native-dispatch.js";
import type { ServiceContext } from "../src/service-kernel.js";
import "../src/services.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-vfs-vcs-split-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

function memberCtx(workspaceId: string): ServiceContext {
  return { workspaceId, userId: "member-1" };
}

describe("vfs-vcs-split", () => {
  it("driver surface only — no version-control or mount ops on vfs", async () => {
    const ctx = memberCtx("ws-split-ops");
    for (const gone of [
      "commit",
      "log",
      "show",
      "diff",
      "branches",
      "restore",
      "mount",
      "unmount",
      "mounts",
    ]) {
      await expect(dispatchAprovanNativeOp(ctx, "vfs", gone, {})).rejects.toThrow(
        /Unknown vfs/,
      );
    }
    // Contract driver ops resolve.
    await dispatchAprovanNativeOp(ctx, "vfs", "write", {
      path: "probe.txt",
      content: "x",
    });
    const listed = (await dispatchAprovanNativeOp(ctx, "vfs", "list", {})) as {
      entries: unknown[];
    };
    expect(Array.isArray(listed.entries)).toBe(true);
  });

  it("version-control operation is not found on the file namespace", async () => {
    const ctx = memberCtx("ws-split-1");
    await expect(dispatchAprovanNativeOp(ctx, "vfs", "commit", { message: "x" })).rejects.toThrow(
      /Unknown vfs/,
    );
    await expect(dispatchAprovanNativeOp(ctx, "vfs", "log", {})).rejects.toThrow(/Unknown vfs/);
  });

  it("history is served by the version-control namespace (native default)", async () => {
    const workspaceId = "ws-split-history";
    const ctx = memberCtx(workspaceId);
    await dispatchAprovanNativeOp(ctx, "vfs", "write", { path: "notes.txt", content: "hello" });
    const committed = (await dispatchAprovanNativeOp(ctx, "vcs", "commit", {
      message: "first",
    })) as { commit: { id: string }; created: boolean };
    expect(committed.created).toBe(true);
    const log = (await dispatchAprovanNativeOp(ctx, "vcs", "log", {
      limit: 10,
    })) as { commits: Array<{ id: string }> };
    expect(log.commits.some((c) => c.id === committed.commit.id)).toBe(true);
  });

  it("default binding for vcs is the workspace store (aprovan native)", async () => {
    const resolved = await resolveInterfaceForWorkspace("ws-split-ns", "vcs");
    expect(resolved.compat.provider).toBe(NATIVE_PROVIDER_ID);
    expect(resolved.compat.credentialless).toBe(true);
  });

  it("no mount operations on the file namespace; resolution stays on read", async () => {
    const ctx = memberCtx("ws-split-mount");
    await expect(dispatchAprovanNativeOp(ctx, "vfs", "mounts", {})).rejects.toThrow(/Unknown vfs/);
    await expect(
      dispatchAprovanNativeOp(ctx, "vfs", "mount", {
        prefix: "ext",
        type: "s3",
        config: { bucket: "b" },
      }),
    ).rejects.toThrow(/Unknown vfs/);
  });

  it("vfs implementation has no workspace-only guard for version-control ops", async () => {
    const appCtx: ServiceContext = {
      workspaceId: "ws-split-app",
      userId: "user-1",
      appScope: {
        id: "demo",
        name: "demo",
        paths: [".apps/demo"],
        userId: "user-1",
        role: "user",
      },
    };
    await expect(dispatchAprovanNativeOp(appCtx, "vfs", "commit", { message: "nope" })).rejects.toThrow(
      /Unknown vfs/,
    );
  });

  it("application access to vcs is grant-governed (no special workspace-only reject)", async () => {
    const appCtx: ServiceContext = {
      workspaceId: "ws-split-grant",
      userId: "user-1",
      appScope: {
        id: "demo",
        name: "demo",
        paths: [".apps/demo"],
        userId: "user-1",
        role: "user",
      },
      grants: { tools: ["vcs.log"], paths: [] },
    };
    const log = (await dispatchAprovanNativeOp(appCtx, "vcs", "log", {})) as {
      commits: unknown[];
    };
    expect(Array.isArray(log.commits)).toBe(true);
  });
});
