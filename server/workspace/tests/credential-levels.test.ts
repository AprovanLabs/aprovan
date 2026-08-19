/**
 * IW-9 F3 stream 5 — credential stores carry the level (spec
 * credential-levels; tech-plan D3/D3a/D3b).
 *
 * The same contract is asserted on BOTH configurable backends: the sqlite
 * store directly, and the registry-backed (dsql) adapter
 * `CredentialStoreRegistry` over sqlite-driver registry storage — the latter
 * covers the D3b routing fix (create goes through the package's
 * `CredentialService`, not the raw storage primitive). Covered per backend:
 * level round-trip on every record read surface, create-time validation
 * (vocabulary, level/type matrix, default derivation, user-oauth owner),
 * legacy NULL-level rows backfilled via `effectiveLevel` on read, the D3a
 * one-user-oauth-per-(workspace, provider, owner) uniqueness with the
 * friendly error, and two distinct users connecting the same provider.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import Database from "better-sqlite3";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { adaptCredentialStore } from "../src/credential-store-adapter.js";
import { getCredentialCipher } from "../src/credentialCipher.js";
import {
  CredentialStoreRegistry,
  CredentialStoreSqlite,
  type CredentialPayload,
  type ICredentialStore,
  type OAuth2AuthCodePayload,
} from "../src/credentials.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";

const bearer = (token = "tok-1"): CredentialPayload => ({ type: "bearer_token", token });

/**
 * Tenant client + a pre-resolved access token: the registry path resolves the
 * OAuth client from the payload (no platform app in tests) and skips the
 * authorization-code exchange (no network) because `accessToken` is set.
 */
const authcode = (): OAuth2AuthCodePayload => ({
  type: "oauth2_authcode",
  clientId: "cid",
  clientSecret: "csec",
  tokenUrl: "https://oauth.example.invalid/token",
  code: "",
  redirectUri: "https://oauth.example.invalid/cb",
  accessToken: "at-1",
});

const RAW_CONSTRAINT_TEXT = /UNIQUE constraint|SQLITE_CONSTRAINT|duplicate key/iu;

/** The backend-independent level contract (acceptance scenarios, brief 05). */
function levelContract(
  name: string,
  getStore: () => ICredentialStore,
  insertLegacyRow: (workspaceId: string, provider: string, type: string) => void,
): void {
  describe(`${name}: credential level contract`, () => {
    it("derives the default level from the payload type at create", async () => {
      const store = getStore();
      const tokenRecord = await store.create("ws-default", {
        provider: "stripe",
        payload: bearer(),
        createdBy: "alice",
      });
      expect(tokenRecord.level).toBe("workspace-token");
      const oauthRecord = await store.create("ws-default", {
        provider: "github",
        payload: authcode(),
        createdBy: "alice",
      });
      expect(oauthRecord.level).toBe("user-oauth");
    });

    it("round-trips the stored level through create, get, and list", async () => {
      const store = getStore();
      const ws = "ws-roundtrip";
      const shared = await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "workspace-oauth",
        createdBy: "alice",
      });
      expect(shared.level).toBe("workspace-oauth");
      const own = await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "alice",
      });
      expect(own.level).toBe("user-oauth");

      expect((await store.get(ws, shared.id))?.level).toBe("workspace-oauth");
      expect((await store.get(ws, own.id))?.level).toBe("user-oauth");
      const listed = await store.list(ws);
      expect(listed.find((row) => row.id === shared.id)?.level).toBe("workspace-oauth");
      expect(listed.find((row) => row.id === own.id)?.level).toBe("user-oauth");

      // Payload surfaces still resolve (level lands on them in stream 6).
      const token = await store.create(ws, { provider: "stripe", payload: bearer(), createdBy: "alice" });
      expect((await store.getPayload(ws, token.id))).toEqual(bearer());
      expect((await store.resolveRecordForProvider(ws, "stripe"))?.payload).toEqual(bearer());
      expect((await store.resolveRecordById(ws, token.id))?.provider).toBe("stripe");
    });

    it("validates the level vocabulary, matrix, and user-oauth owner identically", async () => {
      const store = getStore();
      const ws = "ws-validate";
      await expect(
        store.create(ws, { provider: "stripe", payload: bearer(), level: "banana", createdBy: "alice" }),
      ).rejects.toThrow(/Invalid credential level/u);
      await expect(
        store.create(ws, { provider: "stripe", payload: bearer(), level: "user-oauth", createdBy: "alice" }),
      ).rejects.toThrow(/incompatible with payload type bearer_token/u);
      await expect(
        store.create(ws, { provider: "github", payload: authcode(), level: "user-oauth" }),
      ).rejects.toThrow(/user-oauth credentials require an owner/u);
    });

    it("backfills legacy rows (no stored level) with the type-derived effective level", async () => {
      const store = getStore();
      const ws = "ws-legacy";
      insertLegacyRow(ws, "legacy-token", "bearer_token");
      insertLegacyRow(ws, "legacy-oauth", "oauth2_authcode");
      const listed = await store.list(ws);
      expect(listed.find((row) => row.provider === "legacy-token")?.level).toBe("workspace-token");
      // Legacy authcode stays workspace-shared — never user-oauth (D2).
      expect(listed.find((row) => row.provider === "legacy-oauth")?.level).toBe("workspace-oauth");
    });

    it("rejects a duplicate user connection with the friendly error", async () => {
      const store = getStore();
      const ws = "ws-duplicate";
      await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "alice",
      });
      const duplicate = store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "alice",
      });
      await expect(duplicate).rejects.toThrow("github is already connected");
      // The friendly message, not a raw driver constraint error.
      await duplicate.catch((err: unknown) => {
        expect(String(err)).not.toMatch(RAW_CONSTRAINT_TEXT);
      });
    });

    it("lets two different users connect the same provider", async () => {
      const store = getStore();
      const ws = "ws-two-users";
      const alice = await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "alice",
      });
      const bob = await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "bob",
      });
      const listed = await store.list(ws);
      expect(listed.find((row) => row.id === alice.id)).toMatchObject({
        level: "user-oauth",
        createdBy: "alice",
      });
      expect(listed.find((row) => row.id === bob.id)).toMatchObject({
        level: "user-oauth",
        createdBy: "bob",
      });
    });

    it("a deleted user connection can be reconnected", async () => {
      const store = getStore();
      const ws = "ws-reconnect";
      const first = await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "alice",
      });
      expect(await store.delete(ws, first.id)).toBe(true);
      const second = await store.create(ws, {
        provider: "github",
        payload: authcode(),
        level: "user-oauth",
        createdBy: "alice",
      });
      expect(second.level).toBe("user-oauth");
    });
  });
}

// ---------------------------------------------------------------------------
// sqlite backend
// ---------------------------------------------------------------------------

describe("sqlite backend", () => {
  let dataDir: string;
  let store: CredentialStoreSqlite;

  beforeAll(() => {
    dataDir = mkdtempSync(join(tmpdir(), "cred-levels-sqlite-"));
    store = new CredentialStoreSqlite(dataDir);
  });

  afterAll(() => {
    rmSync(dataDir, { recursive: true, force: true });
  });

  levelContract(
    "sqlite",
    () => store,
    (workspaceId, provider, type) => {
      // A pre-F3 row: written before the level column carried values.
      const database = new Database(join(dataDir, "workspace.db"));
      try {
        database
          .prepare(
            `INSERT INTO credentials
            (id, workspace_id, provider, label, type, payload, created_by, level, created_at, updated_at)
            VALUES (?, ?, ?, NULL, ?, 'legacy-opaque', NULL, NULL, ?, ?)`,
          )
          .run(`legacy-${provider}`, workspaceId, provider, type, "2020-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z");
      } finally {
        database.close();
      }
    },
  );
});

// ---------------------------------------------------------------------------
// Registry-backed (dsql) adapter — CredentialStoreRegistry over the package's
// sqlite driver; create routes through CredentialService (D3b).
// ---------------------------------------------------------------------------

describe("registry-backed (dsql) adapter", () => {
  let dataDir: string;
  let store: CredentialStoreRegistry;

  beforeAll(async () => {
    dataDir = mkdtempSync(join(tmpdir(), "cred-levels-registry-"));
    process.env["WORKSPACE_DATA_DIR"] = dataDir;
    delete process.env["STORE_BACKEND"];
    resetWorkspaceConfig();
    await resetRegistryStorage();
    // Boot the registry schema before any raw legacy-row insert.
    await getRegistryStorage();
    store = new CredentialStoreRegistry();
  });

  afterAll(async () => {
    await resetRegistryStorage();
    rmSync(dataDir, { recursive: true, force: true });
  });

  levelContract(
    "registry",
    () => store,
    (workspaceId, provider, type) => {
      // A pre-F3 row in the package's own schema, stored level NULL.
      const database = new Database(join(dataDir, "registry.db"));
      try {
        database
          .prepare(
            `INSERT INTO credentials
            (id, tenant_id, provider, label, type, payload, created_by, level, created_at, updated_at)
            VALUES (?, ?, ?, NULL, ?, 'legacy-opaque', NULL, NULL, ?, ?)`,
          )
          .run(`legacy-${provider}`, workspaceId, provider, type, "2020-01-01T00:00:00.000Z", "2020-01-01T00:00:00.000Z");
      } finally {
        database.close();
      }
    },
  );
});

// ---------------------------------------------------------------------------
// credential-store-adapter — level maps both directions (task 5.2)
// ---------------------------------------------------------------------------

describe("credential-store-adapter level mapping", () => {
  let dataDir: string;
  let inner: CredentialStoreSqlite;

  beforeAll(() => {
    dataDir = mkdtempSync(join(tmpdir(), "cred-levels-adapter-"));
    inner = new CredentialStoreSqlite(dataDir);
  });

  afterAll(() => {
    rmSync(dataDir, { recursive: true, force: true });
  });

  it("carries level through create, get, list, and getWithPayload", async () => {
    const adapter = adaptCredentialStore(inner);
    const ws = "ws-adapter";
    const row = await adapter.create(ws, {
      provider: "github",
      type: "oauth2_authcode",
      payload: await getCredentialCipher().encrypt(JSON.stringify(authcode())),
      createdBy: "alice",
      level: "user-oauth",
    });
    expect(row.level).toBe("user-oauth");
    expect((await adapter.get(ws, row.id))?.level).toBe("user-oauth");
    expect((await adapter.list(ws)).find((item) => item.id === row.id)?.level).toBe(
      "user-oauth",
    );
    expect((await adapter.getWithPayload(ws, row.id))?.level).toBe("user-oauth");

    // Omitted level derives the type default on the way in.
    const derived = await adapter.create(ws, {
      provider: "stripe",
      type: "bearer_token",
      payload: await getCredentialCipher().encrypt(JSON.stringify(bearer())),
      createdBy: "alice",
    });
    expect(derived.level).toBe("workspace-token");
  });
});
