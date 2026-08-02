/**
 * Unit tests for the session routes (APR-281):
 *   - GET  /session            — active workspace + workspace list for the picker
 *   - POST /session/workspace  — select the active workspace (camelCase body)
 *
 * Auth is exercised via mocked Cognito verification + a mocked DDB document
 * client (see tests/helpers.ts). The `ByUserId` GSI on Memberships and the
 * Workspaces table are covered by the extended `setupAuth` fixtures.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createApp } from "../src/app.js";
import { resetIdentityStore } from "../src/identity/store.js";
import { resetCognitoVerifier } from "../src/middleware/auth.js";
import { setupAuth } from "./helpers.js";

// ---------------------------------------------------------------------------
// DynamoDB mock — intercepts all document client calls
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const MULTI_TOKEN = "test-cognito-multi-token";
const MULTI_SUB = "multi-user";
const NO_SESSION_TOKEN = "test-cognito-nosession-token";
const NO_SESSION_SUB = "nosession-user";

const WORKSPACES = [
  { id: "ws-a", name: "Alpha" },
  { id: "ws-b", name: "Beta" },
];

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  // These tests exercise the DynamoDB identity backend through the mocked
  // document client — pin the store switch to it (default would be sqlite).
  process.env["STORE_BACKEND"] = "dynamo";
  resetIdentityStore();
  // These tests simulate the Cognito path; auth mode must be "oidc" or the
  // session surface short-circuits to the local single-user identity.
  process.env["OIDC_ISSUER"] =
    "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_sessiontest";
  process.env["OIDCAUDIENCE"] = "session-test-client";
  setupAuth({
    mockDdbSend,
    defaultWorkspaceId: "ws-a",
    workspaces: WORKSPACES,
    users: [
      {
        sub: MULTI_SUB,
        token: MULTI_TOKEN,
        role: "admin",
        workspaceId: "ws-a",
        memberships: [
          { workspaceId: "ws-a", role: "admin" },
          { workspaceId: "ws-b", role: "member" },
        ],
      },
      {
        sub: NO_SESSION_SUB,
        token: NO_SESSION_TOKEN,
        role: "admin",
        // No active workspace: both the Users and Sessions reads return empty.
        workspaceId: "ws-a",
        activeWorkspaceId: null,
        memberships: [
          { workspaceId: "ws-a", role: "admin" },
          { workspaceId: "ws-b", role: "member" },
        ],
      },
    ],
  });
});

afterEach(() => {
  delete process.env["OIDC_ISSUER"];
  delete process.env["OIDCAUDIENCE"];
  delete process.env["STORE_BACKEND"];
  resetIdentityStore();
  resetCognitoVerifier();
});

// ---------------------------------------------------------------------------
// GET /session
// ---------------------------------------------------------------------------

describe("GET /session", () => {
  it("returns the active workspace and the full workspace list", async () => {
    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${MULTI_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json() as {
      activeWorkspaceId: string | null;
      workspaces: { id: string; name: string; role: string }[];
    };
    expect(body.activeWorkspaceId).toBe("ws-a");
    expect(body.workspaces).toHaveLength(2);
    expect(body.workspaces).toEqual([
      { id: "ws-a", name: "Alpha", role: "admin" },
      { id: "ws-b", name: "Beta", role: "member" },
    ]);
  });

  it("returns activeWorkspaceId null when no active workspace is set", async () => {
    // The NO_SESSION fixture has activeWorkspaceId: null, so both the Users
    // and Sessions reads return empty and the active workspace is unset.
    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${NO_SESSION_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json() as {
      activeWorkspaceId: string | null;
      workspaces: { id: string; name: string }[];
    };
    expect(body.activeWorkspaceId).toBeNull();
    expect(body.workspaces).toHaveLength(2);
  });

  it("falls back to the ephemeral Sessions row when Users has no activeWorkspaceId", async () => {
    // Simulate a user who selected a workspace before activeWorkspaceId existed:
    // the Users row is absent (first call returns {}) but the Sessions row
    // still carries the choice.
    mockDdbSend.mockImplementationOnce(() => Promise.resolve({}));

    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${MULTI_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json() as {
      activeWorkspaceId: string | null;
      workspaces: { id: string; name: string }[];
    };
    expect(body.activeWorkspaceId).toBe("ws-a");
  });

  it("falls back to the workspace id as the name when the Workspaces row is missing", async () => {
    // User belongs to ws-c which has no Workspaces fixture row.
    setupAuth({
      mockDdbSend,
      defaultWorkspaceId: "ws-c",
      workspaces: [],
      users: [
        {
          sub: MULTI_SUB,
          token: MULTI_TOKEN,
          role: "admin",
          workspaceId: "ws-c",
          memberships: [{ workspaceId: "ws-c", role: "admin" }],
        },
      ],
    });

    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${MULTI_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = await res.json() as {
      activeWorkspaceId: string | null;
      workspaces: { id: string; name: string; role: string }[];
    };
    expect(body.activeWorkspaceId).toBe("ws-c");
    expect(body.workspaces).toEqual([{ id: "ws-c", name: "ws-c", role: "admin" }]);
  });

  it("returns 401 without an Authorization header", async () => {
    const app = createApp();
    const res = await app.request("/session");
    expect(res.status).toBe(401);
  });

  it("returns 401 with an invalid token", async () => {
    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: "Bearer not-a-real-token" },
    });
    expect(res.status).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// POST /session/workspace
// ---------------------------------------------------------------------------

describe("POST /session/workspace", () => {
  it("sets the active workspace and returns activeWorkspaceId", async () => {
    const app = createApp();
    const res = await app.request("/session/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MULTI_TOKEN}`,
      },
      body: JSON.stringify({ workspaceId: "ws-b" }),
    });

    expect(res.status).toBe(200);
    const body = await res.json() as { activeWorkspaceId: string };
    expect(body.activeWorkspaceId).toBe("ws-b");

    // The picker persists the choice to the durable Users table (activeWorkspaceId)
    // via an Update that only touches activeWorkspaceId.
    const usersCalls = mockDdbSend.mock.calls.filter(
      (c) =>
        (c[0] as { input?: { TableName?: string } }).input?.TableName === "Users",
    );
    expect(usersCalls.length).toBe(1);
    const usersInput = (usersCalls[0]![0] as {
      input?: {
        Key?: Record<string, unknown>;
        UpdateExpression?: string;
        ExpressionAttributeValues?: Record<string, unknown>;
      };
    }).input;
    expect(usersInput?.Key?.["sub"]).toBe(MULTI_SUB);
    expect(usersInput?.UpdateExpression).toContain("activeWorkspaceId");
    expect(usersInput?.ExpressionAttributeValues?.[":ws"]).toBe("ws-b");

    // …and mirrors it to the ephemeral Sessions table (currentWorkspaceId).
    const putCalls = mockDdbSend.mock.calls.filter(
      (c) =>
        (c[0] as { input?: { TableName?: string } }).input?.TableName ===
        "Sessions",
    );
    expect(putCalls.length).toBe(1);
    const item = (putCalls[0]![0] as {
      input?: { Item?: Record<string, unknown> };
    }).input?.Item;
    expect(item?.["userId"]).toBe(MULTI_SUB);
    expect(item?.["currentWorkspaceId"]).toBe("ws-b");
  });

  it("returns 400 when workspaceId is missing", async () => {
    const app = createApp();
    const res = await app.request("/session/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MULTI_TOKEN}`,
      },
      body: JSON.stringify({}),
    });

    expect(res.status).toBe(400);
    const body = await res.json() as { code?: string };
    expect(body.code).toBe("workspace_not_selected");
  });

  it("returns 403 when not a member of the requested workspace", async () => {
    const app = createApp();
    const res = await app.request("/session/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MULTI_TOKEN}`,
      },
      body: JSON.stringify({ workspaceId: "ws-not-a-member" }),
    });

    expect(res.status).toBe(403);
  });

  it("returns 401 without an Authorization header", async () => {
    const app = createApp();
    const res = await app.request("/session/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId: "ws-a" }),
    });
    expect(res.status).toBe(401);
  });

  it("returns 401 with an invalid token", async () => {
    const app = createApp();
    const res = await app.request("/session/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer not-a-real-token",
      },
      body: JSON.stringify({ workspaceId: "ws-a" }),
    });
    expect(res.status).toBe(401);
  });
});
