/**
 * Workspace `/profiles` CRUD (native-panel-polish stream 3; specs
 * credential-profiles server scenarios).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { CredentialService } from "@aprovan/registry-server";
import { resetIdentityStore } from "../src/identity/store.js";
import { putMembership } from "../src/memberships.js";
import {
  resetCognitoVerifier,
  setCognitoVerifier,
} from "../src/middleware/auth.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import { setCurrentWorkspace } from "../src/sessions.js";
import { setActiveWorkspaceId } from "../src/users.js";
import { setupAuth } from "./helpers.js";

const mockDdbSend = vi.fn();

vi.mock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: {
    from: vi.fn(() => ({ send: mockDdbSend })),
  },
  QueryCommand: vi.fn((input: unknown) => ({ input })),
  PutCommand: vi.fn((input: unknown) => ({ input })),
  GetCommand: vi.fn((input: unknown) => ({ input })),
  UpdateCommand: vi.fn((input: unknown) => ({ input })),
  TransactWriteCommand: vi.fn((input: unknown) => ({ input })),
  BatchGetCommand: vi.fn((input: unknown) => ({ input })),
}));

vi.mock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: vi.fn(() => ({})),
}));

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-profiles-crud-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
});

afterAll(async () => {
  await resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const req = (path: string, init: RequestInit = {}) => {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  return createApp().request(path, { ...init, headers });
};

interface ProfileWire {
  id: string;
  name: string;
  targetKind: string;
  targetId: string;
  provider?: string;
  credentialId?: string;
  options: Record<string, unknown>;
  credentialLabel?: string;
  createdBy: string;
}

const SECRET = "secret-should-never-leak";

describe("workspace profile CRUD (sqlite backend)", () => {
  it("admin create → patch → delete round-trip with credentialLabel, no payload leak", async () => {
    const storage = await getRegistryStorage();
    await storage.tenants.ensure("local");
    const credentials = new CredentialService(storage.credentials);
    const cred = await credentials.create("local", "local", {
      provider: "github",
      label: "Prod GitHub",
      payload: { type: "bearer_token", token: SECRET },
    });

    const created = await req("/profiles", {
      method: "POST",
      body: JSON.stringify({
        name: "gh-bot",
        targetKind: "provider",
        targetId: "github",
        credentialId: cred.id,
        options: { repo: "aprovan/aprovan" },
      }),
    });
    expect(created.status).toBe(201);
    const createdBody = (await created.json()) as { profile: ProfileWire };
    expect(createdBody.profile).toMatchObject({
      name: "gh-bot",
      targetKind: "provider",
      targetId: "github",
      credentialId: cred.id,
      credentialLabel: "Prod GitHub",
      options: { repo: "aprovan/aprovan" },
    });
    expect(JSON.stringify(createdBody)).not.toContain(SECRET);
    expect(JSON.stringify(createdBody)).not.toMatch(/"payload"\s*:/u);

    const listed = await req("/profiles");
    expect(listed.status).toBe(200);
    const listBody = (await listed.json()) as { profiles: ProfileWire[] };
    expect(listBody.profiles.some((p) => p.id === createdBody.profile.id)).toBe(true);
    expect(JSON.stringify(listBody)).not.toContain(SECRET);

    const patched = await req(`/profiles/${createdBody.profile.id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: "gh-bot-renamed", options: { repo: "aprovan/registry" } }),
    });
    expect(patched.status).toBe(200);
    const patchedBody = (await patched.json()) as { profile: ProfileWire };
    expect(patchedBody.profile.name).toBe("gh-bot-renamed");
    expect(patchedBody.profile.options).toEqual({ repo: "aprovan/registry" });
    expect(patchedBody.profile.credentialLabel).toBe("Prod GitHub");
    expect(JSON.stringify(patchedBody)).not.toContain(SECRET);

    const deleted = await req(`/profiles/${createdBody.profile.id}`, { method: "DELETE" });
    expect(deleted.status).toBe(200);
    expect(await deleted.json()).toEqual({ ok: true });

    const after = await req("/profiles");
    expect(
      ((await after.json()) as { profiles: ProfileWire[] }).profiles.some(
        (p) => p.id === createdBody.profile.id,
      ),
    ).toBe(false);
  });
});

describe("members read, only admins write", () => {
  const ADMIN_TOKEN = "profiles-admin-token";
  const MEMBER_TOKEN = "profiles-member-token";
  const WS = "local";

  beforeEach(async () => {
    process.env["OIDC_ISSUER"] =
      "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_profiles";
    process.env["OIDCAUDIENCE"] = "profiles-test-client";
    resetIdentityStore();
    setCognitoVerifier({
      async verify(token: string) {
        if (token === ADMIN_TOKEN) return { sub: "admin-1" };
        if (token === MEMBER_TOKEN) return { sub: "member-1" };
        throw new Error("invalid_token");
      },
      async hydrate() {},
    });
    await putMembership({ workspaceId: WS, userId: "admin-1", role: "admin" });
    await putMembership({ workspaceId: WS, userId: "member-1", role: "member" });
    await setCurrentWorkspace("admin-1", WS);
    await setCurrentWorkspace("member-1", WS);
    await setActiveWorkspaceId("admin-1", WS);
    await setActiveWorkspaceId("member-1", WS);

    const storage = await getRegistryStorage();
    await storage.tenants.ensure(WS);
    await storage.profiles.create(WS, {
      name: "seed-bot",
      targetKind: "provider",
      targetId: "linear",
      options: {},
      createdBy: "admin-1",
    });
  });

  afterEach(() => {
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    resetIdentityStore();
    resetCognitoVerifier();
  });

  it("member GET succeeds and member POST is rejected with no write", async () => {
    const before = await req("/profiles", {
      headers: { Authorization: `Bearer ${MEMBER_TOKEN}` },
    });
    expect(before.status).toBe(200);
    const beforeCount = ((await before.json()) as { profiles: ProfileWire[] }).profiles.length;
    expect(beforeCount).toBeGreaterThan(0);

    const post = await req("/profiles", {
      method: "POST",
      headers: { Authorization: `Bearer ${MEMBER_TOKEN}` },
      body: JSON.stringify({
        name: "sneaky",
        targetKind: "provider",
        targetId: "github",
      }),
    });
    expect(post.status).toBe(403);

    const after = await req("/profiles", {
      headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
    });
    expect(after.status).toBe(200);
    const names = ((await after.json()) as { profiles: ProfileWire[] }).profiles.map((p) => p.name);
    expect(names).not.toContain("sneaky");
    expect(names.length).toBe(beforeCount);
  });
});

describe("unavailable backend answers 501", () => {
  const MEMBER_TOKEN = "profiles-dynamo-member";

  beforeEach(() => {
    process.env["STORE_BACKEND"] = "dynamo";
    process.env["OIDC_ISSUER"] =
      "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_profiles501";
    process.env["OIDCAUDIENCE"] = "profiles-501-client";
    resetIdentityStore();
    setupAuth({
      mockDdbSend,
      defaultWorkspaceId: "ws-a",
      users: [
        { sub: "plain-member", token: MEMBER_TOKEN, role: "member", workspaceId: "ws-a" },
        { sub: "admin-user", token: "profiles-dynamo-admin", role: "admin", workspaceId: "ws-a" },
      ],
    });
  });

  afterEach(() => {
    delete process.env["STORE_BACKEND"];
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    resetIdentityStore();
    resetCognitoVerifier();
  });

  it("every /profiles route answers 501 with the explanatory message", async () => {
    const cases: Array<[string, RequestInit]> = [
      ["", { headers: { Authorization: `Bearer ${MEMBER_TOKEN}` } }],
      [
        "",
        {
          method: "POST",
          headers: { Authorization: `Bearer profiles-dynamo-admin` },
          body: JSON.stringify({
            name: "x",
            targetKind: "provider",
            targetId: "github",
          }),
        },
      ],
      [
        "/some-id",
        {
          method: "PATCH",
          headers: { Authorization: `Bearer profiles-dynamo-admin` },
          body: JSON.stringify({ name: "y" }),
        },
      ],
      [
        "/some-id",
        {
          method: "DELETE",
          headers: { Authorization: `Bearer profiles-dynamo-admin` },
        },
      ],
    ];

    for (const [path, init] of cases) {
      const res = await req(`/profiles${path}`, init);
      expect(res.status).toBe(501);
      const body = (await res.json()) as { error: string };
      expect(body.error).toMatch(/relational store backend/i);
    }
  });
});
