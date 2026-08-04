/**
 * Stream 4: default binding resolves to the Aprovan native provider;
 * a profile bound to a third party reaches that instead.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  listInterfaces,
  resolveInterfaceForWorkspace,
  writeBinding,
} from "../src/interfaces.js";
import { NATIVE_PROVIDER_ID } from "../src/native-dispatch.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-native-resolve-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

describe("aprovan native default bindings", () => {
  it("catalog lists credentialless aprovan for the five contracts", () => {
    const ids = ["vfs", "vcs", "keyvalue", "events", "telemetry"] as const;
    for (const id of ids) {
      const def = listInterfaces().find((entry) => entry.id === id);
      expect(def, id).toBeDefined();
      const aprovan = def!.compat.find((entry) => entry.provider === NATIVE_PROVIDER_ID);
      expect(aprovan, id).toMatchObject({
        provider: NATIVE_PROVIDER_ID,
        credentialless: true,
        moduleSpecifier: "@aprovan/native",
      });
    }
  });

  it("default resolution reaches aprovan without a profile", async () => {
    const workspaceId = "ws-native-default";
    for (const id of ["vfs", "vcs", "keyvalue", "events", "telemetry"] as const) {
      const resolved = await resolveInterfaceForWorkspace(workspaceId, id);
      expect(resolved.compat.provider).toBe(NATIVE_PROVIDER_ID);
      expect(resolved.compat.credentialless).toBe(true);
    }
  });

  it("a binding to a third party reaches that instead", async () => {
    const workspaceId = "ws-native-rebind";
    await writeBinding(workspaceId, "vfs", {
      provider: "s3",
      options: { region: "us-west-2" },
    });
    const resolved = await resolveInterfaceForWorkspace(workspaceId, "vfs");
    expect(resolved.compat.provider).toBe("s3");
    expect(resolved.compat.credentialless).not.toBe(true);
  });
});
