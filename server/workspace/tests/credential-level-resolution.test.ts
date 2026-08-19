/**
 * IW-9 F3 stream 6 — invoker-aware resolution at the workspace entry point
 * (spec credential-level-resolution; tech-plan D4/D5/D6).
 *
 * Exercises `resolveCredentialRecord` (required invoker; pin loud → own
 * user-oauth → workspace-level rows; fail closed with
 * `CredentialNotConnectedError`) and `resolveWorkspaceCredential` (the
 * workspace-only resolver for invoker-less system paths — a `user-oauth`
 * row is filtered out of selection before ranking, so `owner` is always
 * undefined on its result by construction) through the singleton store the
 * dispatch paths use (sqlite backend over a scratch data dir).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  CredentialNotConnectedError,
  CredentialResolutionError,
  getCredentialStore,
  resetCredentialStore,
  resolveCredentialRecord,
  resolveWorkspaceCredential,
  type CredentialPayload,
  type OAuth2AuthCodePayload,
} from "../src/credentials.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const bearer = (token = "tok-ws"): CredentialPayload => ({ type: "bearer_token", token });

/** Pre-resolved token so nothing attempts a network code exchange. */
const authcode = (accessToken: string): OAuth2AuthCodePayload => ({
  type: "oauth2_authcode",
  clientId: "cid",
  clientSecret: "csec",
  tokenUrl: "https://oauth.example.invalid/token",
  code: "",
  redirectUri: "https://oauth.example.invalid/cb",
  accessToken,
});

const ALICE = { sub: "alice" };
const BOB = { sub: "bob" };

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "level-resolution-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["WORKSPACE_MODE"] = "local";
  delete process.env["STORE_BACKEND"];
  resetWorkspaceConfig();
  resetCredentialStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["WORKSPACE_MODE"];
  resetWorkspaceConfig();
  resetCredentialStore();
  rmSync(dataDir, { recursive: true, force: true });
});

/** Matched on `code`, never message (stream 2 contract). */
async function expectNotConnected(
  attempt: Promise<unknown>,
  provider: string,
): Promise<void> {
  const err = await attempt.then(
    () => {
      throw new Error("expected resolution to fail closed");
    },
    (thrown: unknown) => thrown,
  );
  expect(err).toBeInstanceOf(CredentialNotConnectedError);
  const notConnected = err as CredentialNotConnectedError;
  expect(notConnected.code).toBe("credential_not_connected");
  expect(notConnected.status).toBe(403);
  expect(notConnected.provider).toBe(provider);
  expect(notConnected.requiredLevel).toBe("user-oauth");
}

describe("resolveCredentialRecord (invoker-aware, D4 order)", () => {
  it("returns the invoker's own user-oauth connection, outranking a workspace row", async () => {
    const ws = "ws-own-wins";
    const store = getCredentialStore();
    const shared = await store.create(ws, { provider: "github", payload: bearer("shared") });
    const own = await store.create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    const resolved = await resolveCredentialRecord(ws, "github", ALICE);
    expect(resolved).toBeDefined();
    expect(resolved?.id).toBe(own.id);
    expect(resolved?.level).toBe("user-oauth");
    expect(resolved?.owner).toBe("alice");
    expect((resolved?.payload as OAuth2AuthCodePayload).accessToken).toBe("at-alice");
    expect(resolved?.id).not.toBe(shared.id);
  });

  it("serves an unconnected invoker from the workspace-level row", async () => {
    const ws = "ws-fallback";
    const store = getCredentialStore();
    const shared = await store.create(ws, { provider: "github", payload: bearer("shared") });
    await store.create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    const resolved = await resolveCredentialRecord(ws, "github", BOB);
    expect(resolved?.id).toBe(shared.id);
    expect(resolved?.level).toBe("workspace-token");
    expect(resolved?.owner).toBeUndefined();
  });

  it("fails closed when only another user's connection exists (never their payload)", async () => {
    const ws = "ws-foreign-only";
    await getCredentialStore().create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    await expectNotConnected(resolveCredentialRecord(ws, "github", BOB), "github");
  });

  it("returns undefined when nothing at all is connected for the provider", async () => {
    await expect(
      resolveCredentialRecord("ws-nothing", "github", BOB),
    ).resolves.toBeUndefined();
  });

  it("resolves a pinned own user-oauth credential with its owner", async () => {
    const ws = "ws-pin-own";
    const own = await getCredentialStore().create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    const resolved = await resolveCredentialRecord(ws, "github", ALICE, own.id);
    expect(resolved?.id).toBe(own.id);
    expect(resolved?.level).toBe("user-oauth");
    expect(resolved?.owner).toBe("alice");
  });

  it("fails closed on a pin to a foreign user-oauth credential — never a downgrade, even with a workspace row present", async () => {
    const ws = "ws-pin-foreign";
    const store = getCredentialStore();
    await store.create(ws, { provider: "github", payload: bearer("shared") });
    const own = await store.create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    await expectNotConnected(
      resolveCredentialRecord(ws, "github", BOB, own.id),
      "github",
    );
  });

  it("keeps pin mismatches loud as 400 config errors, distinct from not-connected", async () => {
    const ws = "ws-pin-mismatch";
    const store = getCredentialStore();
    const stripe = await store.create(ws, { provider: "stripe", payload: bearer("sk") });
    await expect(
      resolveCredentialRecord(ws, "github", ALICE, stripe.id),
    ).rejects.toThrow(CredentialResolutionError);
    await expect(
      resolveCredentialRecord(ws, "github", ALICE, "no-such-id"),
    ).rejects.toThrow(CredentialResolutionError);
  });
});

describe("resolveWorkspaceCredential (workspace-only, D6)", () => {
  it("returns the workspace-level row with owner undefined", async () => {
    const ws = "ws-system";
    const store = getCredentialStore();
    const shared = await store.create(ws, { provider: "github", payload: bearer("shared") });
    await store.create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    const resolved = await resolveWorkspaceCredential(ws, "github");
    expect(resolved?.id).toBe(shared.id);
    expect(resolved?.level).toBe("workspace-token");
    expect(resolved?.owner).toBeUndefined();
  });

  it("never returns a user-oauth row — undefined when only connections exist", async () => {
    const ws = "ws-system-user-only";
    const store = getCredentialStore();
    await store.create(ws, {
      provider: "github",
      payload: authcode("at-alice"),
      level: "user-oauth",
      createdBy: "alice",
    });
    await store.create(ws, {
      provider: "github",
      payload: authcode("at-bob"),
      level: "user-oauth",
      createdBy: "bob",
    });
    await expect(resolveWorkspaceCredential(ws, "github")).resolves.toBeUndefined();
  });

  it("owner is undefined on every result across mixed workspaces", async () => {
    const store = getCredentialStore();
    const cases: Array<[string, () => Promise<void>]> = [
      [
        "ws-mixed-a",
        async () => {
          await store.create("ws-mixed-a", { provider: "github", payload: bearer("a") });
        },
      ],
      [
        "ws-mixed-b",
        async () => {
          await store.create("ws-mixed-b", {
            provider: "github",
            payload: authcode("at-b"),
            level: "workspace-oauth",
          });
          await store.create("ws-mixed-b", {
            provider: "github",
            payload: authcode("at-alice"),
            level: "user-oauth",
            createdBy: "alice",
          });
        },
      ],
    ];
    for (const [ws, seed] of cases) {
      await seed();
      const resolved = await resolveWorkspaceCredential(ws, "github");
      expect(resolved).toBeDefined();
      expect(resolved?.owner).toBeUndefined();
      expect(resolved?.level).not.toBe("user-oauth");
    }
  });

  it("returns undefined when nothing is connected", async () => {
    await expect(
      resolveWorkspaceCredential("ws-system-none", "github"),
    ).resolves.toBeUndefined();
  });
});
