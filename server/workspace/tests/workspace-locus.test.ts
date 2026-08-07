/**
 * Workspace execution locus (stream 4 / specs/workspace-execution-locus).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  InMemoryKeyProvider,
  resetCredentialCipher,
} from "@aprovan/registry-server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { resetIdentityStore } from "../src/identity/store.js";
import { ServiceError } from "../src/service-kernel.js";
import { setProfile } from "../src/profiles/store.js";
import { writeBinding } from "../src/interfaces.js";
import { resetRegistryStorage } from "../src/registry-storage.js";
import {
  assertProviderBindingAllowed,
  createWorkspace,
  getWorkspace,
  initLocalWorkspaceCipher,
  isLocalMachineProvider,
  resolveLocus,
  updateWorkspace,
} from "../src/workspaces.js";

let dataDir: string;

beforeEach(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-workspace-locus-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
  delete process.env["CREDENTIALS_KMS_KEY_ID"];
  delete process.env["CREDENTIALS_CIPHER_SECRET"];
  resetIdentityStore();
  resetCredentialCipher();
  resetRegistryStorage();
});

afterEach(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetIdentityStore();
  resetCredentialCipher();
  resetRegistryStorage();
  rmSync(dataDir, { recursive: true, force: true });
});

describe("workspace execution locus", () => {
  it("defaults missing locus to cloud (existing records unchanged)", async () => {
    const { getIdentityStore } = await import("../src/identity/store.js");
    await getIdentityStore().workspaces.put({
      workspaceId: "legacy",
      name: "Pre-locus",
    });
    const row = await getWorkspace("legacy");
    expect(row?.locus).toBe("cloud");
    expect(resolveLocus(row)).toBe("cloud");
  });

  it("creates a cloud workspace by default", async () => {
    const ws = await createWorkspace({ workspaceId: "ws-cloud", name: "Cloud" });
    expect(ws.locus).toBe("cloud");
    expect(ws.dataDir).toBeUndefined();
    expect((await getWorkspace("ws-cloud"))?.locus).toBe("cloud");
  });

  it("creates a local workspace with dataDir and optional vfsRoot", async () => {
    const localDir = join(dataDir, "local-ws");
    const vfsRoot = join(dataDir, "vfs");
    const ws = await createWorkspace({
      workspaceId: "ws-local",
      name: "Local",
      locus: "local",
      dataDir: localDir,
      vfsRoot,
      keyProvider: new InMemoryKeyProvider(),
    });
    expect(ws.locus).toBe("local");
    expect(ws.dataDir).toBe(localDir);
    expect(ws.vfsRoot).toBe(vfsRoot);
  });

  it("refuses to change locus after creation", async () => {
    await createWorkspace({ workspaceId: "ws-fixed", name: "Fixed", locus: "cloud" });
    await expect(
      updateWorkspace("ws-fixed", { locus: "local" }),
    ).rejects.toThrow(/locus cannot be changed/i);

    const still = await getWorkspace("ws-fixed");
    expect(still?.locus).toBe("cloud");
  });

  it("allows renaming a workspace without touching locus", async () => {
    await createWorkspace({
      workspaceId: "ws-rename",
      name: "Before",
      locus: "local",
      dataDir: join(dataDir, "rename"),
      keyProvider: new InMemoryKeyProvider(),
    });
    const updated = await updateWorkspace("ws-rename", { name: "After" });
    expect(updated.name).toBe("After");
    expect(updated.locus).toBe("local");
  });

  it("refuses local-directory binding in a cloud workspace", async () => {
    await createWorkspace({ workspaceId: "ws-cloud-bind", name: "Cloud", locus: "cloud" });

    await expect(
      assertProviderBindingAllowed("ws-cloud-bind", "local-directory"),
    ).rejects.toMatchObject({
      message: expect.stringMatching(/cannot reach local resources/i),
    });

    await expect(
      writeBinding("ws-cloud-bind", "vfs", { provider: "local-directory" }),
    ).rejects.toBeInstanceOf(ServiceError);

    await expect(
      setProfile("ws-cloud-bind", {
        namespace: "vfs",
        provider: "local-directory",
      }),
    ).rejects.toThrow(/cannot reach local resources/i);
  });

  it("allows local-directory binding in a local workspace", async () => {
    await createWorkspace({
      workspaceId: "ws-local-bind",
      name: "Local",
      locus: "local",
      dataDir: join(dataDir, "bind"),
      keyProvider: new InMemoryKeyProvider(),
    });
    await expect(
      assertProviderBindingAllowed("ws-local-bind", "local-directory"),
    ).resolves.toBeUndefined();
  });

  it("allows remote provider bindings in a cloud workspace", async () => {
    await createWorkspace({ workspaceId: "ws-s3", name: "Cloud", locus: "cloud" });
    await expect(assertProviderBindingAllowed("ws-s3", "s3")).resolves.toBeUndefined();
    expect(isLocalMachineProvider("s3")).toBe(false);
    expect(isLocalMachineProvider("local-directory")).toBe(true);
  });

  it("refuses local workspace init without a key provider (no plaintext)", async () => {
    await expect(
      createWorkspace({
        workspaceId: "ws-plain",
        name: "No key",
        locus: "local",
        dataDir: join(dataDir, "plain"),
      }),
    ).rejects.toThrow(/key provider/i);

    expect(() => initLocalWorkspaceCipher()).toThrow(/key provider/i);
  });

  it("initialises local workspace cipher when a key provider is supplied", async () => {
    const cipher = initLocalWorkspaceCipher(new InMemoryKeyProvider());
    expect(cipher.backend).toBe("keystore");
  });

  it("local workspace needs no account — create succeeds without Cognito", async () => {
    // Auth-none / no linked account: createWorkspace does not consult identity auth.
    const ws = await createWorkspace({
      workspaceId: "ws-anon",
      name: "Anonymous local",
      locus: "local",
      dataDir: join(dataDir, "anon"),
      keyProvider: new InMemoryKeyProvider(),
    });
    expect(ws.locus).toBe("local");
    expect(ws.workspaceId).toBe("ws-anon");
  });
});
