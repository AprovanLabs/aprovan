/**
 * Members API — email/name enrichment from the identity Users store.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getIdentityStore, resetIdentityStore } from "../src/identity/store.js";
import { putMembership } from "../src/memberships.js";
import { resetCognitoVerifier, setCognitoVerifier } from "../src/middleware/auth.js";
import { setCurrentWorkspace } from "../src/sessions.js";
import { setActiveWorkspaceId } from "../src/users.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-members-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"];
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

describe("GET /members identity fields", () => {
  const ADMIN_TOKEN = "members-admin-token";
  const WS = "local";

  beforeEach(async () => {
    process.env["OIDC_ISSUER"] =
      "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_members";
    process.env["OIDCAUDIENCE"] = "members-test-client";
    resetIdentityStore();
    setCognitoVerifier({
      async verify(token: string) {
        if (token === ADMIN_TOKEN) return { sub: "admin-1" };
        throw new Error("invalid_token");
      },
      async hydrate() {},
    });
    await getIdentityStore().users.upsert({
      sub: "alice",
      email: "alice@example.com",
      name: "Alice Example",
    });
    await putMembership({ workspaceId: WS, userId: "admin-1", role: "admin" });
    await putMembership({ workspaceId: WS, userId: "alice", role: "member" });
    await setCurrentWorkspace("admin-1", WS);
    await setActiveWorkspaceId("admin-1", WS);
  });

  afterEach(() => {
    delete process.env["OIDC_ISSUER"];
    delete process.env["OIDCAUDIENCE"];
    resetIdentityStore();
    resetCognitoVerifier();
  });

  it("returns email and name with userId secondary", async () => {
    const res = await createApp().request("/members", {
      headers: { Authorization: `Bearer ${ADMIN_TOKEN}` },
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      members: Array<{ userId: string; email?: string; name?: string }>;
    };
    expect(body.members.find((m) => m.userId === "alice")).toMatchObject({
      userId: "alice",
      email: "alice@example.com",
      name: "Alice Example",
    });
  });
});
