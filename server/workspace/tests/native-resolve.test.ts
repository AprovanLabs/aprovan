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
    // vfs / keyvalue / events / telemetry: the aprovan credentialless entry wins
    // zero-config resolution in the generic catalog — no credential or binding needed.
    for (const id of ["vfs", "keyvalue", "events", "telemetry"] as const) {
      const resolved = await resolveInterfaceForWorkspace(workspaceId, id);
      expect(resolved.compat.provider).toBe(NATIVE_PROVIDER_ID);
      expect(resolved.compat.credentialless).toBe(true);
    }
    // vcs is different: routes/tools.ts and workflows/invoke.ts each carry a
    // dedicated native short-circuit for the workspace commit store (aprovan)
    // that fires *before* calling resolveInterfaceForWorkspace, so the generic
    // catalog must not also answer for the aprovan entry — otherwise third-party
    // git-hosting providers (github/vcs, bitbucket/vcs) sharing the same
    // interface id become permanently unreachable through dispatchInterface.
    // Resolution for vcs therefore rejects when no binding or third-party
    // credential is present; the native path is always reachable via the
    // pre-resolution short-circuits in routes/tools.ts and invoke.ts.
    await expect(resolveInterfaceForWorkspace(workspaceId, "vcs")).rejects.toThrow(
      /no binding and no connected/iu,
    );
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
