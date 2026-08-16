/**
 * Install hosting-mode immutability (iw9-f2 stream 3, TD4) at the
 * `saveInstall` persistence choke point (spec shared-record-partition:
 * "Hosting mode is immutable on the install record" — scenarios "Mode fixed
 * at creation", "Mode flip rejected", plus the absent-field ⇒ "managed"
 * default for pre-F2 records; IW-9 invariant 10, no migration ever).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  mintNewInstall,
  readInstall,
  saveInstall,
  type AppInstallation,
} from "../src/apps/install.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

let dataDir: string;

const WS = "ws-hosting-mode";
const ORIGIN_APP = "01APPHOSTINGMODE00000000000";
const ALICE = "alice";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-install-hosting-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

function mint(input?: Partial<Parameters<typeof mintNewInstall>[0]>): AppInstallation {
  return mintNewInstall({
    originAppId: ORIGIN_APP,
    originWorkspaceId: WS,
    pin: { channel: "latest" },
    bindings: {},
    config: {},
    installedBy: ALICE,
    ...input,
  });
}

describe("Mode fixed at creation", () => {
  it("mintNewInstall defaults hosting to managed and every read reports it", async () => {
    const install = mint();
    expect(install.hosting).toBe("managed");

    await saveInstall(WS, install);
    expect((await readInstall(WS, install.installId))?.hosting).toBe("managed");

    // Unrelated mutation persists; a re-read still reports managed.
    await saveInstall(WS, {
      ...install,
      config: { theme: "dark" },
      updatedAt: new Date().toISOString(),
    });
    const stored = await readInstall(WS, install.installId);
    expect(stored?.hosting).toBe("managed");
    expect(stored?.config).toEqual({ theme: "dark" });
  });

  it("an explicit hosted pick is recorded at creation", async () => {
    const install = mint({ hosting: "hosted", hostingWorkspaceId: WS });
    expect(install.hosting).toBe("hosted");

    await saveInstall(WS, install);
    expect((await readInstall(WS, install.installId))?.hosting).toBe("hosted");
  });
});

describe("Mode flip rejected", () => {
  it("saveInstall rejects a hosting flip with 409 and leaves the record unchanged", async () => {
    const install = mint();
    await saveInstall(WS, install);

    await expect(
      saveInstall(WS, { ...install, hosting: "hosted", config: { sneak: true } }),
    ).rejects.toMatchObject({
      status: 409,
      message: expect.stringMatching(/immutable/i),
    });

    const stored = await readInstall(WS, install.installId);
    expect(stored?.hosting).toBe("managed");
    expect(stored?.config).toEqual({});
  });

  it("rejects the reverse flip (hosted → managed) too", async () => {
    const install = mint({ hosting: "hosted", hostingWorkspaceId: WS });
    await saveInstall(WS, install);

    await expect(
      saveInstall(WS, { ...install, hosting: "managed" }),
    ).rejects.toMatchObject({
      status: 409,
      message: expect.stringMatching(/immutable/i),
    });

    expect((await readInstall(WS, install.installId))?.hosting).toBe("hosted");
  });
});

describe("Absent field on pre-F2 records reads as managed (TD4)", () => {
  /** Seed a stored install predating the `hosting` field — no migration exists. */
  async function seedPreF2Install(installId: string): Promise<void> {
    await writeSvcRecord(WS, svcScope("installs"), installId, {
      installId,
      originAppId: ORIGIN_APP,
      originWorkspaceId: WS,
      pin: { channel: "latest" },
      resolvedRelease: null,
      bindings: {},
      config: {},
      editing: false,
      installedBy: ALICE,
      installedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  it("flip to hosted rejected 409; explicit managed save accepted", async () => {
    const installId = "01PREF2INSTALL0000000000000";
    await seedPreF2Install(installId);
    const stored = await readInstall(WS, installId);
    expect(stored).toBeDefined();
    expect(stored?.hosting).toBeUndefined();

    // Absent ⇒ managed: writing "hosted" is a mode flip.
    await expect(
      saveInstall(WS, { ...stored!, hosting: "hosted" }),
    ).rejects.toMatchObject({
      status: 409,
      message: expect.stringMatching(/immutable/i),
    });

    // Writing the equivalent "managed" is not a flip.
    await saveInstall(WS, { ...stored!, hosting: "managed" });
    expect((await readInstall(WS, installId))?.hosting).toBe("managed");
  });
});
