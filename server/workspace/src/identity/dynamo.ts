/**
 * DynamoDB identity backend — a mechanical wrap of the raw call sites that
 * used to live in users.ts / workspaces.ts / memberships.ts / sessions.ts /
 * invites.ts / groups.ts / userGroups.ts / permissions.ts and the inline
 * group-member Scan in routes/groups.ts. Command shapes are unchanged (the
 * test fixtures and dynamodb-local suites depend on them). Retired at
 * cutover (tech-plan D5).
 *
 * API keys have no Dynamo implementation: the workspace never shipped one on
 * Dynamo, so the methods refuse rather than pretend.
 */

import { randomBytes } from "node:crypto";
import { dynamo } from "../db/client.js";
import type {
  GrantInput,
  GroupRecord,
  IIdentityStore,
  InviteRecord,
  MembershipRecord,
  Permission,
  UserRecord,
  WorkspaceRecord,
} from "./types.js";

const DYNAMODB_USERS_TABLE = () => process.env["DYNAMODB_USERS_TABLE"] ?? "Users";
const DYNAMODB_WORKSPACES_TABLE = () => process.env["DYNAMODB_WORKSPACES_TABLE"] ?? "Workspaces";
const DYNAMODB_MEMBERSHIPS_TABLE = () => process.env["DYNAMODB_MEMBERSHIPS_TABLE"] ?? "Memberships";
const SESSIONS_TABLE = () => process.env["SESSIONS_TABLE"] ?? "Sessions";
const DYNAMODB_INVITES_TABLE = () => process.env["DYNAMODB_INVITES_TABLE"] ?? "Invites";
const GROUPS_TABLE = () => process.env["GROUPS_TABLE"] ?? "Groups";
const USER_GROUPS_TABLE = () => process.env["USER_GROUPS_TABLE"] ?? "UserGroups";
// Both spellings pre-date this module; keep honoring both.
const USERGROUPS_READ_TABLE = () => process.env["USERGROUPS_TABLE"] ?? "UserGroups";

const DEFAULT_SESSION_TTL_SECONDS = (): number => {
  const raw = Number(process.env["GATEWAY_SESSION_TTL_SECONDS"]);
  return Number.isFinite(raw) && raw > 0 ? raw : 604_800; // 7 days
};

const INVITE_TTL_SECONDS = 7 * 24 * 3600;


function makePermId(): string {
  return randomBytes(12).toString("hex");
}

/**
 * DynamoDB-backed permission store (single-table schema, APR-320) — moved
 * here verbatim from permissions.ts as part of the identity extraction:
 *   - `PK = WS#<workspaceId>`
 *   - `SK = PERM#<callerId>#<provider>#<operation>` (the grant)
 *   - `SK = PERMID#<permId>` (permId → tuple pointer for revoke)
 */
export class PermissionStoreDynamodb {
  private readonly tableName: string;

  constructor(tableName?: string) {
    this.tableName = tableName ?? process.env["PERMISSIONS_TABLE"] ?? "Permissions";
  }

  async grant(workspaceId: string, input: GrantInput): Promise<Permission> {
    const id = makePermId();
    const now = new Date().toISOString();
    const sk = this.permSk(input.callerId, input.provider, input.operation);
    const perm: Permission = {
      id,
      workspaceId,
      callerId: input.callerId,
      provider: input.provider,
      operation: input.operation,
      grantedAt: now,
      grantedBy: input.grantedBy,
    };

    const { client, TransactWriteCommand } = await dynamo();
    // Atomically write the grant and its permId pointer. Re-granting the same
    // (caller, provider, operation) tuple overwrites the same SK: the
    // transaction replaces the grant and writes a fresh pointer in one shot.
    await client.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Put: {
              TableName: this.tableName,
              Item: {
                PK: `WS#${workspaceId}`,
                SK: sk,
                id,
                workspaceId,
                callerId: input.callerId,
                provider: input.provider,
                operation: input.operation,
                grantedAt: now,
                grantedBy: input.grantedBy,
              },
            },
          },
          {
            Put: {
              TableName: this.tableName,
              Item: {
                PK: `WS#${workspaceId}`,
                SK: `PERMID#${id}`,
                callerId: input.callerId,
                provider: input.provider,
                operation: input.operation,
              },
            },
          },
        ],
      }),
    );
    return perm;
  }

  async revoke(workspaceId: string, id: string): Promise<boolean> {
    const { client, GetCommand, TransactWriteCommand } = await dynamo();
    // Resolve permId → (callerId, provider, operation) via the pointer.
    const pointerRes = await client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { PK: `WS#${workspaceId}`, SK: `PERMID#${id}` },
      }),
    );
    const pointer = pointerRes.Item as Record<string, unknown> | undefined;
    if (!pointer) return false;
    const sk = this.permSk(
      pointer["callerId"] as string,
      pointer["provider"] as string,
      pointer["operation"] as string,
    );

    await client.send(
      new TransactWriteCommand({
        TransactItems: [
          {
            Delete: {
              TableName: this.tableName,
              Key: { PK: `WS#${workspaceId}`, SK: sk },
            },
          },
          {
            Delete: {
              TableName: this.tableName,
              Key: { PK: `WS#${workspaceId}`, SK: `PERMID#${id}` },
            },
          },
        ],
      }),
    );
    return true;
  }

  async list(workspaceId: string, callerId?: string): Promise<Permission[]> {
    const { client, QueryCommand } = await dynamo();
    const skPrefix = callerId !== undefined ? `PERM#${callerId}#` : "PERM#";
    const result = await client.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
        ExpressionAttributeValues: {
          ":pk": `WS#${workspaceId}`,
          ":sk": skPrefix,
        },
      }),
    );
    return (result.Items ?? []).map((it) => this.toPermission(it as Record<string, unknown>));
  }

  async check(workspaceId: string, callerId: string, provider: string, operation: string): Promise<boolean> {
    const { client, BatchGetCommand } = await dynamo();
    // BatchGet the exact-op item and the wildcard item. When `operation` is
    // itself "*" the two keys collapse to one (only the wildcard grant can
    // answer a wildcard query).
    const sks = operation === "*" ? [this.permSk(callerId, provider, "*")] : [this.permSk(callerId, provider, operation), this.permSk(callerId, provider, "*")];
    const res = await client.send(
      new BatchGetCommand({
        RequestItems: {
          [this.tableName]: {
            Keys: sks.map((sk) => ({ PK: `WS#${workspaceId}`, SK: sk })),
          },
        },
      }),
    );
    const responses = res.Responses?.[this.tableName] ?? [];
    return responses.length > 0;
  }

  private permSk(callerId: string, provider: string, operation: string): string {
    return `PERM#${callerId}#${provider}#${operation}`;
  }

  private toPermission(item: Record<string, unknown>): Permission {
    return {
      id: item["id"] as string,
      workspaceId: item["workspaceId"] as string,
      callerId: item["callerId"] as string,
      provider: item["provider"] as string,
      operation: item["operation"] as string,
      grantedAt: item["grantedAt"] as string,
      grantedBy: item["grantedBy"] as string,
    };
  }
}


export function createIdentityStoreDynamo(): IIdentityStore {
  const permissions = new PermissionStoreDynamodb();

  const getGroup = async (
    workspaceId: string,
    groupId: string,
  ): Promise<GroupRecord | undefined> => {
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({ TableName: GROUPS_TABLE(), Key: { workspaceId, groupId } }),
    );
    return result.Item as GroupRecord | undefined;
  };

  const getInvite = async (inviteToken: string): Promise<InviteRecord | undefined> => {
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({ TableName: DYNAMODB_INVITES_TABLE(), Key: { inviteToken } }),
    );
    if (!result.Item) return undefined;
    const item = result.Item as InviteRecord;
    if (item.expiresAt <= Math.floor(Date.now() / 1000)) return undefined;
    return item;
  };

  const getMembership = async (
    workspaceId: string,
    userId: string,
  ): Promise<MembershipRecord | undefined> => {
    const { client, GetCommand } = await dynamo();
    const result = await client.send(
      new GetCommand({ TableName: DYNAMODB_MEMBERSHIPS_TABLE(), Key: { workspaceId, userId } }),
    );
    return result.Item as MembershipRecord | undefined;
  };

  return {
    users: {
      async getActiveWorkspaceId(sub) {
        const { client, GetCommand } = await dynamo();
        const result = await client.send(
          new GetCommand({
            TableName: DYNAMODB_USERS_TABLE(),
            Key: { sub },
            ProjectionExpression: "activeWorkspaceId",
          }),
        );
        if (!result.Item) return undefined;
        return (result.Item as { activeWorkspaceId?: string }).activeWorkspaceId;
      },
      async setActiveWorkspaceId(sub, workspaceId) {
        const { client, UpdateCommand } = await dynamo();
        await client.send(
          new UpdateCommand({
            TableName: DYNAMODB_USERS_TABLE(),
            Key: { sub },
            UpdateExpression: "SET activeWorkspaceId = :ws",
            ExpressionAttributeValues: { ":ws": workspaceId },
          }),
        );
      },
      async upsert(user: UserRecord) {
        const { client, PutCommand } = await dynamo();
        await client.send(
          new PutCommand({
            TableName: DYNAMODB_USERS_TABLE(),
            Item: { ...user },
          }),
        );
      },
    },

    workspaces: {
      async get(workspaceId) {
        const { client, GetCommand } = await dynamo();
        const result = await client.send(
          new GetCommand({
            TableName: DYNAMODB_WORKSPACES_TABLE(),
            Key: { workspaceId },
            ProjectionExpression: "workspaceId, #n, plan, createdAt, updatedAt",
            ExpressionAttributeNames: { "#n": "name" },
          }),
        );
        return result.Item as WorkspaceRecord | undefined;
      },
      async getMany(workspaceIds) {
        if (workspaceIds.length === 0) return [];
        const { client, GetCommand } = await dynamo();
        const results = await Promise.all(
          workspaceIds.map((id) =>
            client
              .send(
                new GetCommand({
                  TableName: DYNAMODB_WORKSPACES_TABLE(),
                  Key: { workspaceId: id },
                  ProjectionExpression: "workspaceId, #n",
                  ExpressionAttributeNames: { "#n": "name" },
                }),
              )
              .then((r) => (r.Item ? (r.Item as WorkspaceRecord) : undefined)),
          ),
        );
        return results.filter((w): w is WorkspaceRecord => w !== undefined);
      },
      async put(workspace) {
        const { client, PutCommand } = await dynamo();
        await client.send(
          new PutCommand({ TableName: DYNAMODB_WORKSPACES_TABLE(), Item: { ...workspace } }),
        );
      },
    },

    memberships: {
      get: getMembership,
      async listByWorkspace(workspaceId) {
        const { client, QueryCommand } = await dynamo();
        const result = await client.send(
          new QueryCommand({
            TableName: DYNAMODB_MEMBERSHIPS_TABLE(),
            KeyConditionExpression: "workspaceId = :ws",
            ExpressionAttributeValues: { ":ws": workspaceId },
          }),
        );
        return (result.Items ?? []) as MembershipRecord[];
      },
      async listByUser(userId) {
        const { client, QueryCommand } = await dynamo();
        const result = await client.send(
          new QueryCommand({
            TableName: DYNAMODB_MEMBERSHIPS_TABLE(),
            IndexName: "ByUserId",
            KeyConditionExpression: "userId = :us",
            ExpressionAttributeValues: { ":us": userId },
          }),
        );
        return (result.Items ?? []) as MembershipRecord[];
      },
      async put(record) {
        const item: Record<string, string> = {
          workspaceId: record.workspaceId,
          userId: record.userId,
          role: record.role ?? "member",
          createdAt: record.createdAt ?? new Date().toISOString(),
        };
        const { client, PutCommand } = await dynamo();
        await client.send(new PutCommand({ TableName: DYNAMODB_MEMBERSHIPS_TABLE(), Item: item }));
      },
      async remove(workspaceId, userId) {
        const existing = await getMembership(workspaceId, userId);
        if (!existing) return false;
        const { client, DeleteCommand } = await dynamo();
        await client.send(
          new DeleteCommand({
            TableName: DYNAMODB_MEMBERSHIPS_TABLE(),
            Key: { workspaceId, userId },
          }),
        );
        return true;
      },
    },

    sessions: {
      async getCurrentWorkspace(userId) {
        const { client, GetCommand } = await dynamo();
        let result;
        try {
          result = await client.send(
            new GetCommand({
              TableName: SESSIONS_TABLE(),
              Key: { userId },
              ProjectionExpression: "currentWorkspaceId, expiresAt",
            }),
          );
        } catch (err) {
          // Local/dev often has Users/Memberships from SSM but no Sessions
          // table yet — treat a missing table as "no active workspace".
          const name = err instanceof Error ? err.name : "";
          if (name === "ResourceNotFoundException") return undefined;
          throw err;
        }
        if (!result.Item) return undefined;
        const item = result.Item as { currentWorkspaceId?: string; expiresAt?: number };
        if (
          typeof item.expiresAt === "number" &&
          item.expiresAt <= Math.floor(Date.now() / 1000)
        ) {
          return undefined;
        }
        return item.currentWorkspaceId;
      },
      async setCurrentWorkspace(userId, workspaceId, ttlSeconds) {
        const { client, PutCommand } = await dynamo();
        const ttl = ttlSeconds ?? DEFAULT_SESSION_TTL_SECONDS();
        const expiresAt = Math.floor(Date.now() / 1000) + ttl;
        await client.send(
          new PutCommand({
            TableName: SESSIONS_TABLE(),
            Item: { userId, currentWorkspaceId: workspaceId, expiresAt },
          }),
        );
      },
    },

    invites: {
      async create(workspaceId, email, role, groupIds, invitedBy) {
        const inviteToken = randomBytes(32).toString("hex");
        const now = new Date().toISOString();
        const expiresAt = Math.floor(Date.now() / 1000) + INVITE_TTL_SECONDS;
        const item: InviteRecord = {
          inviteToken,
          workspaceId,
          email: email.toLowerCase().trim(),
          role: role || "member",
          groupIds: groupIds ?? [],
          invitedBy,
          createdAt: now,
          expiresAt,
        };
        const { client, PutCommand } = await dynamo();
        await client.send(
          new PutCommand({
            TableName: DYNAMODB_INVITES_TABLE(),
            Item: item as unknown as Record<string, unknown>,
          }),
        );
        return item;
      },
      get: getInvite,
      async listByWorkspace(workspaceId) {
        const { client, QueryCommand } = await dynamo();
        const result = await client.send(
          new QueryCommand({
            TableName: DYNAMODB_INVITES_TABLE(),
            IndexName: "ByWorkspace",
            KeyConditionExpression: "workspaceId = :ws",
            ExpressionAttributeValues: { ":ws": workspaceId },
          }),
        );
        const now = Math.floor(Date.now() / 1000);
        return ((result.Items ?? []) as InviteRecord[]).filter((i) => i.expiresAt > now);
      },
      async revoke(inviteToken) {
        const existing = await getInvite(inviteToken);
        if (!existing) return false;
        const { client, DeleteCommand } = await dynamo();
        await client.send(
          new DeleteCommand({ TableName: DYNAMODB_INVITES_TABLE(), Key: { inviteToken } }),
        );
        return true;
      },
      async consume(inviteToken) {
        const invite = await getInvite(inviteToken);
        if (!invite) return undefined;
        const { client, DeleteCommand } = await dynamo();
        await client.send(
          new DeleteCommand({ TableName: DYNAMODB_INVITES_TABLE(), Key: { inviteToken } }),
        );
        return invite;
      },
    },

    groups: {
      async create(workspaceId, name, description) {
        const groupId = randomBytes(12).toString("hex");
        const now = new Date().toISOString();
        const item: Record<string, unknown> = {
          workspaceId,
          groupId,
          name,
          createdAt: now,
          updatedAt: now,
        };
        if (description !== undefined) item["description"] = description;
        const { client, PutCommand } = await dynamo();
        await client.send(
          new PutCommand({
            TableName: GROUPS_TABLE(),
            Item: item,
            ConditionExpression: "attribute_not_exists(groupId)",
          }),
        );
        return { workspaceId, groupId, name, description, createdAt: now, updatedAt: now };
      },
      async list(workspaceId) {
        const { client, QueryCommand } = await dynamo();
        const result = await client.send(
          new QueryCommand({
            TableName: GROUPS_TABLE(),
            KeyConditionExpression: "workspaceId = :ws",
            ExpressionAttributeValues: { ":ws": workspaceId },
          }),
        );
        return (result.Items ?? []) as GroupRecord[];
      },
      get: getGroup,
      async update(workspaceId, groupId, patch) {
        const now = new Date().toISOString();
        const updates: string[] = ["updatedAt = :updatedAt"];
        const exprValues: Record<string, unknown> = {
          ":updatedAt": now,
          ":ws": workspaceId,
          ":gid": groupId,
        };
        const exprNames: Record<string, string> = {};
        if (patch.name !== undefined) {
          updates.push("#nm = :name");
          exprNames["#nm"] = "name";
          exprValues[":name"] = patch.name;
        }
        if (patch.description !== undefined) {
          updates.push("#desc = :description");
          exprNames["#desc"] = "description";
          exprValues[":description"] = patch.description;
        }
        try {
          const { client, UpdateCommand } = await dynamo();
          const result = await client.send(
            new UpdateCommand({
              TableName: GROUPS_TABLE(),
              Key: { workspaceId, groupId },
              ConditionExpression: "workspaceId = :ws AND groupId = :gid",
              UpdateExpression: `SET ${updates.join(", ")}`,
              ExpressionAttributeValues: exprValues,
              ...(Object.keys(exprNames).length > 0
                ? { ExpressionAttributeNames: exprNames }
                : {}),
              ReturnValues: "ALL_NEW",
            }),
          );
          return result.Attributes as GroupRecord | undefined;
        } catch (err) {
          if (err instanceof Error && err.name === "ConditionalCheckFailedException") {
            return undefined;
          }
          throw err;
        }
      },
      async remove(workspaceId, groupId) {
        const existing = await getGroup(workspaceId, groupId);
        if (!existing) return false;
        const { client, DeleteCommand } = await dynamo();
        await client.send(
          new DeleteCommand({ TableName: GROUPS_TABLE(), Key: { workspaceId, groupId } }),
        );
        // UserGroups rows become invisible orphans; profile grants held by
        // the group live in registry-server storage and simply stop matching
        // (the group id no longer resolves for any principal).
        return true;
      },

      members: {
        async add(workspaceId, groupId, userId) {
          const { client, PutCommand } = await dynamo();
          await client.send(
            new PutCommand({
              TableName: USER_GROUPS_TABLE(),
              Item: {
                "workspaceId#userId": `${workspaceId}#${userId}`,
                groupId,
                workspaceId,
                userId,
              },
            }),
          );
        },
        async remove(workspaceId, groupId, userId) {
          const { client, DeleteCommand, GetCommand } = await dynamo();
          const result = await client.send(
            new GetCommand({
              TableName: USER_GROUPS_TABLE(),
              Key: { "workspaceId#userId": `${workspaceId}#${userId}`, groupId },
            }),
          );
          if (!result.Item) return false;
          await client.send(
            new DeleteCommand({
              TableName: USER_GROUPS_TABLE(),
              Key: { "workspaceId#userId": `${workspaceId}#${userId}`, groupId },
            }),
          );
          return true;
        },
        async listGroupIdsForUser(workspaceId, userId) {
          const { client, QueryCommand } = await dynamo();
          const result = await client.send(
            new QueryCommand({
              TableName: USERGROUPS_READ_TABLE(),
              KeyConditionExpression: "#pk = :pk",
              ExpressionAttributeNames: { "#pk": "workspaceId#userId" },
              ExpressionAttributeValues: { ":pk": `${workspaceId}#${userId}` },
              ProjectionExpression: "groupId",
            }),
          );
          const items = (result.Items ?? []) as Array<{ groupId?: string }>;
          return items
            .map((i) => i.groupId)
            .filter((g): g is string => typeof g === "string");
        },
        async listUserIdsForGroup(workspaceId, groupId) {
          // No GSI on groupId — the pre-extraction inline Scan, unchanged.
          const { client, ScanCommand } = await dynamo();
          const result = await client.send(
            new ScanCommand({
              TableName: USERGROUPS_READ_TABLE(),
              FilterExpression: "workspaceId = :ws AND groupId = :gid",
              ExpressionAttributeValues: { ":ws": workspaceId, ":gid": groupId },
              ProjectionExpression: "userId",
            }),
          );
          return ((result.Items ?? []) as Array<{ userId?: string }>)
            .map((i) => i.userId)
            .filter((s): s is string => typeof s === "string");
        },
      },
    },

    permissions: {
      grant: (workspaceId, input) => permissions.grant(workspaceId, input),
      revoke: (workspaceId, id) => permissions.revoke(workspaceId, id),
      list: (workspaceId, callerId) => permissions.list(workspaceId, callerId),
      check: (workspaceId, callerId, provider, operation) =>
        permissions.check(workspaceId, callerId, provider, operation),
    },

    apiKeys: {
      async create() {
        throw new Error(
          "API keys have no DynamoDB implementation — they arrive with the relational identity schema (STORE_BACKEND=sqlite|dsql).",
        );
      },
      async list() {
        return [];
      },
      async verify() {
        return undefined;
      },
      async revoke() {
        return false;
      },
    },
  };
}
