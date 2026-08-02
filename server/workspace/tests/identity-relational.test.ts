/**
 * Stream 8 — identity store extraction (specs/identity-store):
 * the relational SQLite backend behaves like the Dynamo backend across
 * membership, session, invite, group, permission, and API-key flows; the
 * auth-cache invalidation choke point lives inside the store; and no module
 * outside src/identity/ issues raw DynamoDB calls for identity entities.
 */

import { readdirSync, readFileSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { getCachedPrincipal, hashToken, setCachedPrincipal } from "../src/auth-cache.js";
import { getIdentityStore, resetIdentityStore } from "../src/identity/store.js";
import { consumeInvite, createInvite, getInvite, listInvites, revokeInvite } from "../src/invites.js";
import {
  getMembership,
  listMembers,
  listMembershipsForUser,
  putMembership,
  removeMember,
} from "../src/memberships.js";
import {
  addUserToGroup,
  createGroup,
  deleteGroup,
  getGroup,
  listGroups,
  listGroupUserIds,
  removeUserFromGroup,
  updateGroup,
} from "../src/groups.js";
import { getPermissionStore, resetPermissionStore } from "../src/permissions.js";
import { getCurrentWorkspace, setCurrentWorkspace } from "../src/sessions.js";
import { getActiveWorkspaceId, setActiveWorkspaceId } from "../src/users.js";
import { listUserGroupIds } from "../src/userGroups.js";
import { getWorkspace, getWorkspaces } from "../src/workspaces.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-identity-sql-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  delete process.env["STORE_BACKEND"]; // local default = sqlite
  resetIdentityStore();
  resetPermissionStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  resetIdentityStore();
  resetPermissionStore();
  rmSync(dataDir, { recursive: true, force: true });
});

const WS = "ws-rel";

describe("relational identity backend (SQLite)", () => {
  it("users: active-workspace preference round-trips", async () => {
    expect(await getActiveWorkspaceId("alice")).toBeUndefined();
    await setActiveWorkspaceId("alice", WS);
    expect(await getActiveWorkspaceId("alice")).toBe(WS);
  });

  it("workspaces: put/get/getMany with real columns", async () => {
    await getIdentityStore().workspaces.put({ workspaceId: WS, name: "Relational" });
    await getIdentityStore().workspaces.put({ workspaceId: "ws-two", name: "Second" });
    expect((await getWorkspace(WS))?.name).toBe("Relational");
    const many = await getWorkspaces([WS, "ws-two", "ws-missing"]);
    expect(many.map((w) => w.workspaceId).sort()).toEqual([WS, "ws-two"]);
  });

  it("memberships: put/get/list by workspace and by user, remove", async () => {
    await putMembership({ workspaceId: WS, userId: "alice", role: "admin" });
    await putMembership({ workspaceId: WS, userId: "bob", role: "member" });
    await putMembership({ workspaceId: "ws-two", userId: "alice", role: "member" });

    expect((await getMembership(WS, "alice"))?.role).toBe("admin");
    expect((await listMembers(WS)).map((m) => m.userId).sort()).toEqual(["alice", "bob"]);
    expect((await listMembershipsForUser("alice")).map((m) => m.workspaceId).sort()).toEqual([
      WS,
      "ws-two",
    ]);
    // Role change upserts in place.
    await putMembership({ workspaceId: WS, userId: "bob", role: "admin" });
    expect((await getMembership(WS, "bob"))?.role).toBe("admin");
    expect(await removeMember(WS, "bob")).toBe(true);
    expect(await removeMember(WS, "bob")).toBe(false);
    expect(await getMembership(WS, "bob")).toBeUndefined();
  });

  it("sessions: current workspace with TTL semantics", async () => {
    await setCurrentWorkspace("alice", WS);
    expect(await getCurrentWorkspace("alice")).toBe(WS);
    // An expired row reads as absent.
    await setCurrentWorkspace("carol", WS, -10);
    expect(await getCurrentWorkspace("carol")).toBeUndefined();
  });

  it("invites: create/get/list, consume mints once, revoke", async () => {
    const invite = await createInvite(WS, "New@Example.COM", "member", ["g1"], "alice");
    expect(invite.email).toBe("new@example.com");
    expect((await getInvite(invite.inviteToken))?.groupIds).toEqual(["g1"]);
    expect((await listInvites(WS)).some((i) => i.inviteToken === invite.inviteToken)).toBe(true);

    const consumed = await consumeInvite(invite.inviteToken);
    expect(consumed?.email).toBe("new@example.com");
    expect(await consumeInvite(invite.inviteToken)).toBeUndefined();

    const second = await createInvite(WS, "two@example.com", "admin", [], "alice");
    expect(await revokeInvite(second.inviteToken)).toBe(true);
    expect(await getInvite(second.inviteToken)).toBeUndefined();
  });

  it("groups: CRUD and membership resolution", async () => {
    const group = await createGroup(WS, "engineers", "the builders");
    expect((await getGroup(WS, group.groupId))?.name).toBe("engineers");
    expect((await listGroups(WS)).some((g) => g.groupId === group.groupId)).toBe(true);
    expect((await updateGroup(WS, group.groupId, { name: "builders" }))?.name).toBe("builders");
    expect(await updateGroup(WS, "missing", { name: "x" })).toBeUndefined();

    await addUserToGroup(WS, group.groupId, "alice");
    expect(await listUserGroupIds(WS, "alice")).toEqual([group.groupId]);
    expect(await listGroupUserIds(WS, group.groupId)).toEqual(["alice"]);

    expect(await removeUserFromGroup(WS, group.groupId, "alice")).toBe(true);
    expect(await listUserGroupIds(WS, "alice")).toEqual([]);

    // Deleting the group takes its memberships (app-layer integrity).
    expect(await deleteGroup(WS, group.groupId)).toBe(true);
    expect(await deleteGroup(WS, group.groupId)).toBe(false);
  });

  it("permissions: grant/check (wildcard)/list/revoke, idempotent re-grant", async () => {
    const store = getPermissionStore();
    const perm = await store.grant(WS, {
      callerId: "alice",
      provider: "github",
      operation: "issues.create",
      grantedBy: "admin",
    });
    await store.grant(WS, {
      callerId: "alice",
      provider: "linear",
      operation: "*",
      grantedBy: "admin",
    });
    expect(await store.check(WS, "alice", "github", "issues.create")).toBe(true);
    expect(await store.check(WS, "alice", "github", "issues.delete")).toBe(false);
    expect(await store.check(WS, "alice", "linear", "whatever")).toBe(true);
    expect(await store.list(WS)).toHaveLength(2);
    expect(await store.list(WS, "alice")).toHaveLength(2);
    expect(await store.list(WS, "bob")).toHaveLength(0);

    // Re-granting the same tuple stays one row with a fresh id.
    const regrant = await store.grant(WS, {
      callerId: "alice",
      provider: "github",
      operation: "issues.create",
      grantedBy: "admin2",
    });
    expect(await store.list(WS, "alice")).toHaveLength(2);
    expect(await store.revoke(WS, perm.id)).toBe(false); // superseded id
    expect(await store.revoke(WS, regrant.id)).toBe(true);
    expect(await store.check(WS, "alice", "github", "issues.create")).toBe(false);
  });

  it("api keys: mint once, verify by secret hash, honor expiry, revoke", async () => {
    const keys = getIdentityStore().apiKeys;
    const { record, secret } = await keys.create(WS, { name: "ci", createdBy: "alice" });
    expect(secret.startsWith("apw_")).toBe(true);
    expect((await keys.list(WS)).some((k) => k.keyId === record.keyId)).toBe(true);
    expect((await keys.verify(secret))?.keyId).toBe(record.keyId);
    expect(await keys.verify("apw_not-a-key")).toBeUndefined();

    const expired = await keys.create(WS, { name: "old", expiresAt: 1 });
    expect(await keys.verify(expired.secret)).toBeUndefined();

    expect(await keys.revoke(WS, record.keyId)).toBe(true);
    expect(await keys.verify(secret)).toBeUndefined();
  });

  it("mutations invalidate the cached principal at the store choke point", async () => {
    const tokenHash = hashToken("token-alice");
    const principal = { sub: "alice", workspaceId: WS, role: "admin", groupIds: [] };
    setCachedPrincipal(tokenHash, WS, principal);
    expect(getCachedPrincipal(tokenHash, WS)).toEqual(principal);
    await putMembership({ workspaceId: WS, userId: "alice", role: "member" });
    expect(getCachedPrincipal(tokenHash, WS)).toBeUndefined();

    setCachedPrincipal(tokenHash, WS, principal);
    await removeMember(WS, "alice");
    expect(getCachedPrincipal(tokenHash, WS)).toBeUndefined();

    setCachedPrincipal(tokenHash, WS, principal);
    await setCurrentWorkspace("alice", "ws-two");
    expect(getCachedPrincipal(tokenHash, WS)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Grep gate (tasks.md 8.4): identity entities reach DynamoDB only through
// src/identity/. The non-identity stores (fs/records/credentials/audit) keep
// their own Dynamo backends until cutover.
// ---------------------------------------------------------------------------

describe("identity dynamo isolation", () => {
  it("no dynamo() usage for identity entities outside src/identity/", () => {
    const srcRoot = join(__dirname, "..", "src");
    const allowed = new Set([
      join(srcRoot, "db", "client.ts"), // the loader itself
      join(srcRoot, "identity", "dynamo.ts"), // the identity backend
      // Non-identity stores, retired at cutover:
      join(srcRoot, "fs-store.ts"),
      join(srcRoot, "records.ts"),
      join(srcRoot, "credentials.ts"),
      join(srcRoot, "audit.ts"),
    ]);
    const offenders: string[] = [];
    const walk = (dir: string): void => {
      for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) {
          walk(path);
          continue;
        }
        if (!path.endsWith(".ts")) continue;
        if (allowed.has(path)) continue;
        const source = readFileSync(path, "utf8");
        if (/\bdynamo\(\)/u.test(source)) offenders.push(path.slice(srcRoot.length + 1));
      }
    };
    walk(srcRoot);
    expect(offenders).toEqual([]);
  });
});
