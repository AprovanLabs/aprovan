/**
 * Slug shape rules + global claim registry + workspace-slug resolver.
 * Specs: app-slug (shape + global claims); tech-plan T4/T6.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ulid } from "ulid";
import { mintAppId } from "../src/apps/identity.js";
import {
  assertValidSlug,
  claimGlobalSlug,
  releaseGlobalSlug,
  resolveGlobalSlug,
  resolveWorkspaceSlug,
} from "../src/apps/slugs.js";
import { ServiceError } from "../src/service-kernel.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-app-slugs-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

describe("assertValidSlug", () => {
  it("accepts ordinary slugs", () => {
    expect(() => assertValidSlug("team-recipes")).not.toThrow();
    expect(() => assertValidSlug("a")).not.toThrow();
    expect(() => assertValidSlug("x".repeat(64))).not.toThrow();
  });

  it("rejects malformed shape", () => {
    expect(() => assertValidSlug("-leading-hyphen")).toThrow(ServiceError);
    expect(() => assertValidSlug("HasUpper")).toThrow(ServiceError);
    expect(() => assertValidSlug("x".repeat(65))).toThrow(ServiceError);
    expect(() => assertValidSlug("")).toThrow(ServiceError);
  });

  it("rejects a real ULID as a slug", () => {
    const id = ulid().toLowerCase();
    expect(() => assertValidSlug(id)).toThrow(/ULID-shaped slugs are reserved/);
  });

  it("rejects the Crockford-base32 fixture from the spec", () => {
    expect(() => assertValidSlug("01arz3ndektsv4rrffq69g5fav")).toThrow(
      /ULID-shaped slugs are reserved/,
    );
  });

  it("accepts 26-char slugs outside the Crockford base32 alphabet", () => {
    // u / i / l / o are not in Crockford base32; hyphen breaks the ULID shape.
    expect(() => assertValidSlug("uuuuuuuuuuuuuuuuuuuuuuuuuu")).not.toThrow();
    expect(() => assertValidSlug("iiiiiiiiiiiiiiiiiiiiiiiiii")).not.toThrow();
    expect(() => assertValidSlug("llllllllllllllllllllllllll")).not.toThrow();
    expect(() => assertValidSlug("oooooooooooooooooooooooooo")).not.toThrow();
    expect(() => assertValidSlug("abcdefghi-klmnopqrstuvwxyz")).not.toThrow();
  });
});

describe("global slug claim registry", () => {
  it("grants a claim once and 409s a second holder", async () => {
    const a = mintAppId();
    const b = mintAppId();
    await claimGlobalSlug("recipes", a, "ws-a");
    expect(await resolveGlobalSlug("recipes")).toEqual({
      appId: a,
      workspaceId: "ws-a",
    });

    await expect(claimGlobalSlug("recipes", b, "ws-b")).rejects.toMatchObject({
      status: 409,
      message: expect.stringContaining(a),
    } satisfies Partial<ServiceError>);

    // Holder reclaim is idempotent.
    await claimGlobalSlug("recipes", a, "ws-a");
    expect(await resolveGlobalSlug("recipes")).toEqual({
      appId: a,
      workspaceId: "ws-a",
    });
  });

  it("releases a claim so another app can take it", async () => {
    const a = mintAppId();
    const b = mintAppId();
    await claimGlobalSlug("cookbook", a, "ws-a");
    await releaseGlobalSlug("cookbook", a);
    expect(await resolveGlobalSlug("cookbook")).toBeUndefined();

    await claimGlobalSlug("cookbook", b, "ws-b");
    expect(await resolveGlobalSlug("cookbook")).toEqual({
      appId: b,
      workspaceId: "ws-b",
    });
  });

  it("allows only the holder to release", async () => {
    const holder = mintAppId();
    const other = mintAppId();
    await claimGlobalSlug("held-slug", holder, "ws-a");
    await expect(releaseGlobalSlug("held-slug", other)).rejects.toMatchObject({
      status: 403,
      message: expect.stringContaining(holder),
    } satisfies Partial<ServiceError>);
    expect(await resolveGlobalSlug("held-slug")).toEqual({
      appId: holder,
      workspaceId: "ws-a",
    });
  });

  it("rejects ULID-shaped claims", async () => {
    const id = ulid().toLowerCase();
    await expect(claimGlobalSlug(id, mintAppId(), "ws-a")).rejects.toMatchObject({
      status: 400,
      message: expect.stringMatching(/ULID-shaped/),
    } satisfies Partial<ServiceError>);
  });
});

describe("resolveWorkspaceSlug", () => {
  it("returns undefined when no wsSlug entry exists", async () => {
    expect(await resolveWorkspaceSlug("never-written")).toBeUndefined();
  });
});
