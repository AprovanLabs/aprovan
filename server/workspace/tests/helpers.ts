/**
 * Shared test fixtures for the Cognito access-token auth model.
 *
 * The auth middleware verifies a Cognito access token (mocked via
 * `setCognitoVerifier`) and reads the active workspace + membership + groups
 * from DynamoDB (mocked via the per-file `mockDdbSend`). `setupAuth` wires
 * both for a set of test users so routes can be exercised end-to-end.
 *
 * The DDB mock is stateful: PutCommand, GetCommand, QueryCommand,
 * TransactWriteCommand, and BatchGetCommand all operate on an in-memory
 * PK/SK store so credential and permission CRUD flows work without a real DB.
 * Sessions, Memberships, and UserGroups are handled from the user fixtures.
 */

import { vi } from "vitest";
import { setCognitoVerifier } from "../src/middleware/auth.js";

export interface TestMembership {
  /** Workspace id the user belongs to. */
  workspaceId: string;
  /** Workspace-scoped role, default "member". */
  role?: string;
}

export interface TestUser {
  /** Cognito sub. */
  sub: string;
  /** Bearer token the client sends; the verifier maps token → sub. */
  token: string;
  /** Workspace role, default "admin". */
  role?: string;
  /** Active workspace, default `defaultWorkspaceId`. */
  workspaceId?: string;
  /** Group ids in the active workspace, default []. */
  groupIds?: string[];
  /**
   * Persisted active workspace id written to the `Users` table
   * (`activeWorkspaceId`) and mirrored to the `Sessions` row. Defaults to
   * `workspaceId` so existing fixtures keep an active workspace; set to `null`
   * to model a user with no selection (both reads return empty).
   */
  activeWorkspaceId?: string | null;
  /**
   * Every workspace the user is a member of (for `GET /session`). Defaults to
   * a single membership derived from `workspaceId` + `role` so existing
   * single-workspace fixtures keep working.
   */
  memberships?: TestMembership[];
  email?: string;
  name?: string;
}

export interface TestWorkspace {
  id: string;
  name: string;
}

export interface SetupAuthOptions {
  /** The per-file `vi.fn()` backing the DDB document client mock. */
  mockDdbSend: ReturnType<typeof vi.fn>;
  users: TestUser[];
  /** Default workspace id, default "ws-test". */
  defaultWorkspaceId?: string;
  /** `Workspaces` table fixture used by `GET /session` to resolve names. */
  workspaces?: TestWorkspace[];
}

interface ResolvedMembership {
  workspaceId: string;
  role: string;
}

interface ResolvedUser {
  sub: string;
  token: string;
  role: string;
  workspaceId: string;
  /** Persisted preference; `null` means no active workspace selected. */
  activeWorkspaceId: string | null;
  groupIds: string[];
  memberships: ResolvedMembership[];
}

/**
 * Configure the Cognito verifier mock and the DDB mock for the given users.
 * Each user maps token → sub (verifier) and (workspaceId, sub) → role (Memberships),
 * with `Sessions[sub].currentWorkspaceId` returning the user's workspace.
 *
 * The DDB mock maintains an in-memory PK/SK store per call to `setupAuth`,
 * reset fresh on each invocation. All five DDB command types are handled:
 * PutCommand, GetCommand, QueryCommand, TransactWriteCommand, BatchGetCommand.
 */
export function setupAuth(opts: SetupAuthOptions): void {
  const defaultWorkspaceId = opts.defaultWorkspaceId ?? "ws-test";
  const workspaces: TestWorkspace[] = opts.workspaces ?? [];
  const users: ResolvedUser[] = opts.users.map((u) => {
    const homeWorkspaceId = u.workspaceId ?? defaultWorkspaceId;
    const activeRole = u.role ?? "admin";
    return {
      sub: u.sub,
      token: u.token,
      role: activeRole,
      workspaceId: homeWorkspaceId,
      activeWorkspaceId:
        u.activeWorkspaceId === undefined ? homeWorkspaceId : u.activeWorkspaceId,
      groupIds: u.groupIds ?? [],
      memberships:
        u.memberships ??
        [{ workspaceId: homeWorkspaceId, role: activeRole }],
    };
  });

  const tokenToUser = new Map(users.map((u) => [u.token, u]));

  setCognitoVerifier({
    verify: vi.fn().mockImplementation((token: string) => {
      const user = tokenToUser.get(token);
      if (!user) throw new Error("invalid token");
      return Promise.resolve({ sub: user.sub });
    }),
    hydrate: vi.fn().mockResolvedValue(undefined),
  });

  // Stateful in-memory PK/SK store for generic tables.
  // Key format: "<tableName>||<PK>||<SK>"
  const pkSkStore = new Map<string, Record<string, unknown>>();

  function storeKey(table: string, pk: unknown, sk: unknown): string {
    return `${table}||${String(pk)}||${String(sk)}`;
  }

  opts.mockDdbSend.mockReset();
  opts.mockDdbSend.mockImplementation(
    (cmd: { input?: Record<string, unknown> }): Promise<unknown> => {
      const input = cmd.input ?? {};

      // -----------------------------------------------------------------------
      // TransactWriteCommand — has TransactItems array
      // -----------------------------------------------------------------------
      if (Array.isArray(input["TransactItems"])) {
        const items = input["TransactItems"] as Array<{
          Put?: { TableName: string; Item: Record<string, unknown>; ConditionExpression?: string };
          Delete?: { TableName: string; Key: Record<string, unknown> };
        }>;
        for (const op of items) {
          if (op.Put) {
            const k = storeKey(op.Put.TableName, op.Put.Item["PK"], op.Put.Item["SK"]);
            pkSkStore.set(k, op.Put.Item);
          }
          if (op.Delete) {
            const k = storeKey(op.Delete.TableName, op.Delete.Key["PK"], op.Delete.Key["SK"]);
            pkSkStore.delete(k);
          }
        }
        return Promise.resolve({});
      }

      // -----------------------------------------------------------------------
      // BatchGetCommand — has RequestItems
      // -----------------------------------------------------------------------
      if (typeof input["RequestItems"] === "object" && input["RequestItems"] !== null) {
        const requestItems = input["RequestItems"] as Record<string, { Keys: Array<Record<string, unknown>> }>;
        const responses: Record<string, Record<string, unknown>[]> = {};
        for (const [tblName, req] of Object.entries(requestItems)) {
          responses[tblName] = [];
          for (const key of req.Keys) {
            if (tblName === "Users" && typeof key["sub"] === "string") {
              const user = users.find((u) => u.sub === key["sub"]);
              if (user) {
                responses[tblName]!.push({
                  sub: user.sub,
                  ...(user.email ? { email: user.email } : {}),
                  ...(user.name ? { name: user.name } : {}),
                });
              }
              continue;
            }
            const k = storeKey(tblName, key["PK"], key["SK"]);
            const item = pkSkStore.get(k);
            if (item) responses[tblName]!.push(item);
          }
        }
        return Promise.resolve({ Responses: responses });
      }

      const table = input["TableName"] as string | undefined;
      const key = input["Key"] as Record<string, unknown> | undefined;

      // -----------------------------------------------------------------------
      // Users — GetCommand: keyed by sub (reads the persisted activeWorkspaceId)
      // -----------------------------------------------------------------------
      if (table === "Users" && key && typeof key["sub"] === "string") {
        const user = users.find((u) => u.sub === key["sub"]);
        if (user && user.activeWorkspaceId !== null) {
          return Promise.resolve({
            Item: { sub: user.sub, activeWorkspaceId: user.activeWorkspaceId },
          });
        }
        return Promise.resolve({});
      }

      // -----------------------------------------------------------------------
      // Sessions — GetCommand: keyed by userId (not PK/SK)
      // -----------------------------------------------------------------------
      if (table === "Sessions" && key) {
        if (typeof key["userId"] === "string") {
          const user = users.find((u) => u.sub === key["userId"]);
          if (user && user.activeWorkspaceId !== null) {
            return Promise.resolve({
              Item: {
                userId: user.sub,
                currentWorkspaceId: user.activeWorkspaceId,
                expiresAt: Math.floor(Date.now() / 1000) + 3600,
              },
            });
          }
        }
        return Promise.resolve({});
      }

      // -----------------------------------------------------------------------
      // Memberships — GetCommand
      // -----------------------------------------------------------------------
      if (table === "Memberships" && key) {
        const user = users.find((u) => u.sub === key["userId"]);
        const membership = user?.memberships.find(
          (m) => m.workspaceId === key["workspaceId"],
        );
        if (user && membership) {
          return Promise.resolve({
            Item: {
              workspaceId: membership.workspaceId,
              userId: user.sub,
              role: membership.role,
            },
          });
        }
        return Promise.resolve({});
      }

      // -----------------------------------------------------------------------
      // Workspaces — GetCommand (keyed by workspaceId)
      // -----------------------------------------------------------------------
      if (table === "Workspaces" && key && typeof key["workspaceId"] === "string") {
        const ws = workspaces.find((w) => w.id === key["workspaceId"]);
        if (ws) {
          return Promise.resolve({ Item: { workspaceId: ws.id, name: ws.name } });
        }
        return Promise.resolve({});
      }

      // -----------------------------------------------------------------------
      // PutCommand — has Item (and no Key)
      // -----------------------------------------------------------------------
      if ("Item" in input && !key) {
        const item = input["Item"] as Record<string, unknown>;
        if (table && item["PK"] !== undefined && item["SK"] !== undefined) {
          pkSkStore.set(storeKey(table, item["PK"], item["SK"]), item);
        }
        return Promise.resolve({});
      }

      // -----------------------------------------------------------------------
      // GetCommand — generic PK/SK lookup
      // -----------------------------------------------------------------------
      if (key && key["PK"] !== undefined && key["SK"] !== undefined && table) {
        const k = storeKey(table, key["PK"], key["SK"]);
        const item = pkSkStore.get(k);
        return Promise.resolve(item ? { Item: item } : {});
      }

      // -----------------------------------------------------------------------
      // QueryCommand — has KeyConditionExpression
      // -----------------------------------------------------------------------
      if ("KeyConditionExpression" in input && table) {
        const exprValues = (input["ExpressionAttributeValues"] ?? {}) as Record<string, unknown>;
        const pk = exprValues[":pk"] as string | undefined;
        const skPrefix = exprValues[":sk"] as string | undefined;

        // UserGroups uses a composite key, not PK/SK
        if (table === "UserGroups" && pk) {
          const user = users.find((u) => `${u.workspaceId}#${u.sub}` === pk);
          if (user) {
            return Promise.resolve({
              Items: user.groupIds.map((g) => ({
                "workspaceId#userId": pk,
                groupId: g,
              })),
            });
          }
          return Promise.resolve({ Items: [] });
        }

        // Memberships ByUserId GSI — `GET /session` lists a user's workspaces
        if (table === "Memberships" && input["IndexName"] === "ByUserId") {
          const us = exprValues[":us"] as string | undefined;
          const user = users.find((u) => u.sub === us);
          if (!user) return Promise.resolve({ Items: [] });
          return Promise.resolve({
            Items: user.memberships.map((m) => ({
              workspaceId: m.workspaceId,
              userId: user.sub,
              role: m.role,
            })),
          });
        }

        // Generic PK/SK query with optional SK prefix filter
        const items: Record<string, unknown>[] = [];
        for (const [k, item] of pkSkStore.entries()) {
          if (!k.startsWith(`${table}||`)) continue;
          if (pk !== undefined && item["PK"] !== pk) continue;
          if (skPrefix !== undefined && !String(item["SK"]).startsWith(skPrefix)) continue;
          items.push(item);
        }
        return Promise.resolve({ Items: items });
      }

      return Promise.resolve({});
    },
  );
}

/** Build a Bearer header value. */
export function bearer(token: string): string {
  return `Bearer ${token}`;
}
