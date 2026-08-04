/**
 * Unit tests for the session routes (APR-281):
 *   - GET  /session            — active workspace + workspace list for the picker
 *   - POST /session/workspace  — select the active workspace (camelCase body)
 *
 * Auth is exercised via mocked Cognito verification; identity rows live on
 * the sqlite backend (Dynamo runtime store retired after DSQL cutover).
 */

import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getIdentityStore, resetIdentityStore } from "../src/identity/store.js";
import { putMembership } from "../src/memberships.js";
import { resetCognitoVerifier, setCognitoVerifier } from "../src/middleware/auth.js";
import { setCurrentWorkspace } from "../src/sessions.js";
import { setActiveWorkspaceId } from "../src/users.js";

const MULTI_TOKEN = "test-cognito-multi-token";
const MULTI_SUB = "multi-user";
const NO_SESSION_TOKEN = "test-cognito-nosession-token";
const NO_SESSION_SUB = "nosession-user";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-session-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  process.env["OIDC_ISSUER"] =
    "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_sessiontest";
  process.env["OIDCAUDIENCE"] = "session-test-client";
  resetIdentityStore();
  setCognitoVerifier({
    async verify(token: string) {
      if (token === MULTI_TOKEN) return { sub: MULTI_SUB };
      if (token === NO_SESSION_TOKEN) return { sub: NO_SESSION_SUB };
      throw new Error("invalid token");
    },
    async hydrate() {},
  });

  const identity = getIdentityStore();
  await identity.workspaces.put({ workspaceId: "ws-a", name: "Alpha" });
  await identity.workspaces.put({ workspaceId: "ws-b", name: "Beta" });

  await putMembership({ workspaceId: "ws-a", userId: MULTI_SUB, role: "admin" });
  await putMembership({ workspaceId: "ws-b", userId: MULTI_SUB, role: "member" });
  await setCurrentWorkspace(MULTI_SUB, "ws-a");
  await setActiveWorkspaceId(MULTI_SUB, "ws-a");

  await putMembership({ workspaceId: "ws-a", userId: NO_SESSION_SUB, role: "admin" });
  await putMembership({ workspaceId: "ws-b", userId: NO_SESSION_SUB, role: "member" });
});

afterEach(() => {
  delete process.env["OIDC_ISSUER"];
  delete process.env["OIDCAUDIENCE"];
  resetIdentityStore();
  resetCognitoVerifier();
});

describe("GET /session", () => {
  it("returns the active workspace and the full workspace list", async () => {
    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${MULTI_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as {
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
    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${NO_SESSION_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      activeWorkspaceId: string | null;
      workspaces: { id: string; name: string }[];
    };
    expect(body.activeWorkspaceId).toBeNull();
    expect(body.workspaces).toHaveLength(2);
  });

  it("falls back to the ephemeral Sessions row when Users has no activeWorkspaceId", async () => {
    // User selected a workspace before activeWorkspaceId existed: no Users
    // preference row, Sessions still carries the choice.
    resetIdentityStore();
    const identity = getIdentityStore();
    await identity.workspaces.put({ workspaceId: "ws-a", name: "Alpha" });
    await identity.workspaces.put({ workspaceId: "ws-b", name: "Beta" });
    await putMembership({ workspaceId: "ws-a", userId: MULTI_SUB, role: "admin" });
    await putMembership({ workspaceId: "ws-b", userId: MULTI_SUB, role: "member" });
    await setCurrentWorkspace(MULTI_SUB, "ws-a");

    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${MULTI_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      activeWorkspaceId: string | null;
      workspaces: { id: string; name: string }[];
    };
    expect(body.activeWorkspaceId).toBe("ws-a");
  });

  it("falls back to the workspace id as the name when the Workspaces row is missing", async () => {
    // Fresh sqlite db so only ws-c membership exists (no name row).
    rmSync(dataDir, { recursive: true, force: true });
    mkdirSync(dataDir, { recursive: true, mode: 0o700 });
    resetIdentityStore();
    await putMembership({ workspaceId: "ws-c", userId: MULTI_SUB, role: "admin" });
    await setCurrentWorkspace(MULTI_SUB, "ws-c");
    await setActiveWorkspaceId(MULTI_SUB, "ws-c");

    const app = createApp();
    const res = await app.request("/session", {
      headers: { Authorization: `Bearer ${MULTI_TOKEN}` },
    });

    expect(res.status).toBe(200);
    const body = (await res.json()) as {
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
    const body = (await res.json()) as { activeWorkspaceId: string };
    expect(body.activeWorkspaceId).toBe("ws-b");

    expect(await getIdentityStore().users.getActiveWorkspaceId(MULTI_SUB)).toBe("ws-b");
    expect(await getIdentityStore().sessions.getCurrentWorkspace(MULTI_SUB)).toBe("ws-b");
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
    const body = (await res.json()) as { code?: string };
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
