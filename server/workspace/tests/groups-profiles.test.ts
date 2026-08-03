/**
 * Groups→profiles wiring (specs group-profile-grants; tech-plan
 * data-auth-model D6): the admin API attaches/detaches profiles on WS-3
 * registry-server storage (idempotent attach, 404 on unknown profiles),
 * tool authorization resolves through the single profile-grant join (and
 * revocation takes effect on the next call), the legacy tool-grant and
 * prefix-grant admin surfaces are gone, and the admin routes stay
 * admin-only.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createApp } from "../src/app.js";
import { mayInvokeTool } from "../src/authorize.js";
import { resetIdentityStore } from "../src/identity/store.js";
import { resetCognitoVerifier } from "../src/middleware/auth.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import { setupAuth } from "./helpers.js";

// The DDB document-client mock is only exercised by the final requireAdmin
// suite (which pins STORE_BACKEND=dynamo); the sqlite-backed tests above it
// never touch these modules.
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
  dataDir = mkdtempSync(join(tmpdir(), "gateway-groups-profiles-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(async () => {
  await resetRegistryStorage();
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const req = (path: string, init: RequestInit = {}) =>
  createApp().request(path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

interface ProfileSummary {
  id: string;
  name: string;
  target: { kind: string; id: string; provider?: string };
  credentialLabel?: string;
}

async function createGroupViaApi(name: string): Promise<string> {
  const res = await req("/groups", { method: "POST", body: JSON.stringify({ name }) });
  expect(res.status).toBe(201);
  return ((await res.json()) as { groupId: string }).groupId;
}

async function createProfile(name: string, provider: string): Promise<string> {
  const storage = await getRegistryStorage();
  await storage.tenants.ensure("local");
  const row = await storage.profiles.create("local", {
    name,
    targetKind: "provider",
    targetId: provider,
    options: {},
    createdBy: "test",
  });
  return row.id;
}

describe("group↔profile admin API (sqlite backend)", () => {
  it("attach/detach lifecycle: idempotent attach, listing, detach revokes", async () => {
    const groupId = await createGroupViaApi("eng");
    const profileId = await createProfile("github-bot", "github");

    // Empty to start.
    const empty = await req(`/groups/${groupId}/profiles`);
    expect(empty.status).toBe(200);
    expect(((await empty.json()) as { profiles: ProfileSummary[] }).profiles).toEqual([]);

    // The workspace picker lists the profile.
    const picker = await req("/profiles");
    expect(picker.status).toBe(200);
    const pickerBody = (await picker.json()) as { profiles: ProfileSummary[] };
    expect(pickerBody.profiles.some((p) => p.id === profileId)).toBe(true);

    // Attach by name; response carries name + target.
    const attach = await req(`/groups/${groupId}/profiles`, {
      method: "POST",
      body: JSON.stringify({ profile: "github-bot" }),
    });
    expect(attach.status).toBe(201);
    expect((await attach.json()) as ProfileSummary).toMatchObject({
      id: profileId,
      name: "github-bot",
      target: { kind: "provider", id: "github" },
    });

    // Repeat attach: idempotent success, no duplicate.
    const again = await req(`/groups/${groupId}/profiles`, {
      method: "POST",
      body: JSON.stringify({ profile: profileId }),
    });
    expect(again.status).toBe(201);
    const listed = await req(`/groups/${groupId}/profiles`);
    expect(((await listed.json()) as { profiles: ProfileSummary[] }).profiles).toHaveLength(1);

    // Detach; second detach 404s.
    const detach = await req(`/groups/${groupId}/profiles`, {
      method: "DELETE",
      body: JSON.stringify({ profile: profileId }),
    });
    expect(detach.status).toBe(200);
    expect((await detach.json()) as { removed: boolean }).toEqual({ removed: true });
    const detachAgain = await req(`/groups/${groupId}/profiles`, {
      method: "DELETE",
      body: JSON.stringify({ profile: profileId }),
    });
    expect(detachAgain.status).toBe(404);
  });

  it("attaching a profile the workspace does not define 404s naming it", async () => {
    const groupId = await createGroupViaApi("eng-2");
    const res = await req(`/groups/${groupId}/profiles`, {
      method: "POST",
      body: JSON.stringify({ profile: "no-such-profile" }),
    });
    expect(res.status).toBe(404);
    expect(((await res.json()) as { error: string }).error).toContain("no-such-profile");
  });

  it("the legacy tool-grant and prefix-grant routes are gone (404, unknown route)", async () => {
    const groupId = await createGroupViaApi("legacy");
    for (const path of [`/groups/${groupId}/tool-grants`, `/groups/${groupId}/prefix-grants`]) {
      expect((await req(path)).status).toBe(404);
      expect((await req(path, { method: "POST", body: "{}" })).status).toBe(404);
    }
  });
});

describe("tool authorization through the profile join", () => {
  it("a member of a granted group is authorized; detach revokes on the next call", async () => {
    const groupId = await createGroupViaApi("granted");
    const profileId = await createProfile("linear-bot", "linear");
    const member = {
      sub: "alice",
      workspaceId: "local",
      role: "member",
      groupIds: [groupId],
    };

    expect(await mayInvokeTool(member, "linear", "issues.create")).toBe(false);

    await req(`/groups/${groupId}/profiles`, {
      method: "POST",
      body: JSON.stringify({ profile: profileId }),
    });
    expect(await mayInvokeTool(member, "linear", "issues.create")).toBe(true);
    // A granted provider-target profile covers the provider's full surface
    // (D6: `provider:*` wildcard rows are subsumed structurally)…
    expect(await mayInvokeTool(member, "linear", "anything.else")).toBe(true);
    // …but only that target's namespace.
    expect(await mayInvokeTool(member, "github", "repos.get")).toBe(false);
    // Losing the group membership loses the capability.
    expect(
      await mayInvokeTool({ ...member, groupIds: [] }, "linear", "issues.create"),
    ).toBe(false);

    await req(`/groups/${groupId}/profiles`, {
      method: "DELETE",
      body: JSON.stringify({ profile: profileId }),
    });
    expect(await mayInvokeTool(member, "linear", "issues.create")).toBe(false);
  });

  it("resolves grants with ONE joined query across all of the caller's groups", async () => {
    const groups = await Promise.all(
      ["join-a", "join-b", "join-c"].map((name) => createGroupViaApi(name)),
    );
    const profileId = await createProfile("sql-analytics", "postgres");
    await req(`/groups/${groups[1]}/profiles`, {
      method: "POST",
      body: JSON.stringify({ profile: profileId }),
    });

    const storage = await getRegistryStorage();
    const joinSpy = vi.spyOn(storage.grants, "grantedProfileIds");
    const allowed = await mayInvokeTool(
      { sub: "bob", workspaceId: "local", role: "member", groupIds: groups },
      "postgres",
      "query",
    );
    expect(allowed).toBe(true);
    // One call, carrying the user subject plus every group — never a query
    // per group per grant.
    expect(joinSpy).toHaveBeenCalledTimes(1);
    const subjects = joinSpy.mock.calls[0]![1];
    expect(subjects).toEqual([
      { kind: "user", id: "bob" },
      ...groups.map((id) => ({ kind: "group", id })),
    ]);
    joinSpy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// requireAdmin gate — exercised through the Cognito-mocked auth stack on the
// interim dynamo identity backend (the 403 fires before any storage access).
// ---------------------------------------------------------------------------

describe("profile admin routes are admin-only", () => {
  const MEMBER_TOKEN = "member-token";

  it("answers 403 for group profile mutations; member GET /profiles works on dynamo", async () => {
    process.env["STORE_BACKEND"] = "dynamo";
    process.env["OIDC_ISSUER"] = "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_gp";
    process.env["OIDCAUDIENCE"] = "gp-test-client";
    resetIdentityStore();
    setupAuth({
      mockDdbSend,
      defaultWorkspaceId: "ws-a",
      users: [{ sub: "plain-member", token: MEMBER_TOKEN, role: "member", workspaceId: "ws-a" }],
    });
    try {
      for (const [path, init] of [
        ["/groups/some-group/profiles", {}],
        ["/groups/some-group/profiles", { method: "POST", body: JSON.stringify({ profile: "x" }) }],
      ] as const) {
        const res = await createApp().request(path, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MEMBER_TOKEN}`,
          },
          ...init,
        });
        expect(res.status).toBe(403);
      }

      // GET /profiles is member-readable but gated by the relational backend.
      const profiles = await createApp().request("/profiles", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MEMBER_TOKEN}`,
        },
      });
      expect(profiles.status).toBe(200);
    } finally {
      delete process.env["STORE_BACKEND"];
      delete process.env["OIDC_ISSUER"];
      delete process.env["OIDCAUDIENCE"];
      resetIdentityStore();
      resetCognitoVerifier();
    }
  });
});
