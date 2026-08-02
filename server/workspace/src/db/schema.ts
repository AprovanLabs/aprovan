import type { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

export interface TableSchema {
  tableName: string;
  createInput: CreateTableCommandInput;
  ttlAttribute?: string;
}

export const Users: TableSchema = {
  tableName: "Users",
  createInput: {
    TableName: "Users",
    KeySchema: [{ AttributeName: "sub", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "sub", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "ByEmail",
        KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const Workspaces: TableSchema = {
  tableName: "Workspaces",
  createInput: {
    TableName: "Workspaces",
    KeySchema: [{ AttributeName: "workspaceId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "workspaceId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const Memberships: TableSchema = {
  tableName: "Memberships",
  createInput: {
    TableName: "Memberships",
    KeySchema: [
      { AttributeName: "workspaceId", KeyType: "HASH" },
      { AttributeName: "userId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "workspaceId", AttributeType: "S" },
      { AttributeName: "userId", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "ByUserId",
        KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const Sessions: TableSchema = {
  tableName: "Sessions",
  ttlAttribute: "expiresAt",
  createInput: {
    TableName: "Sessions",
    KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const Invites: TableSchema = {
  tableName: "Invites",
  ttlAttribute: "expiresAt",
  createInput: {
    TableName: "Invites",
    KeySchema: [{ AttributeName: "inviteToken", KeyType: "HASH" }],
    AttributeDefinitions: [
      { AttributeName: "inviteToken", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" },
      { AttributeName: "workspaceId", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "ByEmailWorkspace",
        KeySchema: [
          { AttributeName: "email", KeyType: "HASH" },
          { AttributeName: "workspaceId", KeyType: "RANGE" },
        ],
        Projection: { ProjectionType: "ALL" },
      },
      {
        IndexName: "ByWorkspace",
        KeySchema: [{ AttributeName: "workspaceId", KeyType: "HASH" }],
        Projection: { ProjectionType: "ALL" },
      },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

/**
 * Single-table design for gateway credentials (APR-318).
 *
 * Each workspace's items share the partition `PK = WS#<workspaceId>`. The sort
 * key prefixes the entity type so a single partition query can fan out across
 * entity types once the other gateway stores migrate here:
 *   - `SK = CRED#<provider>#<credId>`  — the credential record itself
 *   - `SK = CREDID#<credId>`          — a pointer from credId → provider, used
 *                                       by `get`/`delete`/`getPayload` which
 *                                       don't know the provider up front
 *
 * No GSI is required: `resolveForProvider` queries `begins_with(SK, "CRED#<provider>#")`
 * against the partition, and `list` queries `begins_with(SK, "CRED#")` (which
 * excludes the `CREDID#` pointers because their 5th character is `I`, not `#`).
 */
export const Credentials: TableSchema = {
  tableName: "Credentials",
  createInput: {
    TableName: "Credentials",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

/**
 * Single-table design for gateway permission grants (APR-320).
 *
 * Each workspace's items share the partition `PK = WS#<workspaceId>`. The sort
 * key encodes the entity:
 *   - `SK = PERM#<callerId>#<provider>#<operation>` — the grant (`operation`
 *     may be `*` for a wildcard over all of the provider's operations)
 *   - `SK = PERMID#<permId>` — a permId → (callerId, provider, operation)
 *     pointer written alongside the grant so `revoke(wsId, permId)` can
 *     resolve the tuple and delete both items in one `TransactWriteItems`
 *
 * `check()` is a `BatchGetItem` of the exact-op and wildcard items (two items,
 * one round-trip). `list()` queries `begins_with(SK, "PERM#")`, which excludes
 * the `PERMID#` pointers (their 5th character is `I`, not `#`). No GSI is
 * required.
 */
export const Permissions: TableSchema = {
  tableName: "Permissions",
  createInput: {
    TableName: "Permissions",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

/**
 * Single-table design for gateway API keys (APR-319).
 *
 * Each workspace's items share the partition `PK = WS#<workspaceId>`. The sort
 * key prefixes the entity type:
 *   - `SK = APIKEY#<keyId>`          — the API key record (id, name, callerId,
 *                                     secretHash, createdAt, createdBy, expiresAt)
 *   - `SK = APIKEYHASH#<sha256(secret)>` — a hash → keyId mirror so `verify`
 *                                     is a point lookup instead of a scan
 *
 * The mirror item carries a sparse `ttl` (epoch seconds derived from
 * `expiresAt`) so DynamoDB auto-evicts expired mirrors and `verify()` fails
 * closed even if `revoke` is never called. The primary record stores `expiresAt`
 * as an ISO-8601 string and is checked server-side on verify (the TTL sweep is
 * best-effort).
 *
 * No GSI is required: `list(wsId)` queries `begins_with(SK, "APIKEY#")`, which
 * excludes the `APIKEYHASH#` mirrors (their 7th character is `H`, not `#`).
 */
export const ApiKeys: TableSchema = {
  tableName: "ApiKeys",
  ttlAttribute: "ttl",
  createInput: {
    TableName: "ApiKeys",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const Groups: TableSchema = {
  tableName: "Groups",
  createInput: {
    TableName: "Groups",
    KeySchema: [
      { AttributeName: "workspaceId", KeyType: "HASH" },
      { AttributeName: "groupId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "workspaceId", AttributeType: "S" },
      { AttributeName: "groupId", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const UserGroups: TableSchema = {
  tableName: "UserGroups",
  createInput: {
    TableName: "UserGroups",
    KeySchema: [
      { AttributeName: "workspaceId#userId", KeyType: "HASH" },
      { AttributeName: "groupId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "workspaceId#userId", AttributeType: "S" },
      { AttributeName: "groupId", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

/**
 * Single-table design for gateway audit logs (APR-321).
 *
 * Each workspace's items share the partition `PK = WS#<workspaceId>`. The sort
 * key encodes the entity chronologically so `ScanIndexForward=false` returns
 * the most-recent entries first:
 *   - `SK = AUDIT#<isoTs>#<uuid>` — one entry per tool call
 *
 * A sparse `ttl` attribute (epoch seconds, 30-day horizon) drives DynamoDB TTL
 * auto-eviction. TTL is best-effort and may lag up to 48h.
 */
export const Audit: TableSchema = {
  tableName: "Audit",
  ttlAttribute: "ttl",
  createInput: {
    TableName: "Audit",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

/**
 * Workspace filesystem index (see src/fs-store.ts `FsStoreS3`). Content
 * blobs live in S3 (`FS_BUCKET`); this table holds latest-pointer and
 * version rows: `sk = P#<path>` / `sk = V#<path>#<hash>`.
 */
export const FsFiles: TableSchema = {
  tableName: "FsFiles",
  createInput: {
    TableName: "FsFiles",
    KeySchema: [
      { AttributeName: "workspaceId", KeyType: "HASH" },
      { AttributeName: "sk", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "workspaceId", AttributeType: "S" },
      { AttributeName: "sk", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

/**
 * The record store (see src/records.ts) — accumulated state (keyvalue rows,
 * later queues/queryable collections), as opposed to authored files on the
 * workspace FS. Every workspace's rows share the partition
 * `PK = t#<tenantWorkspaceId>#s#<scope>`; the sort key is the literal
 * unprefixed key, so a prefix listing is a plain `begins_with(SK, prefix)`
 * query with no unwrapping needed. Large values (>~350KB) spill to the
 * existing `FS_BUCKET` under a `records/` prefix instead of a Dynamo item.
 */
export const Records: TableSchema = {
  tableName: "Records",
  createInput: {
    TableName: "Records",
    KeySchema: [
      { AttributeName: "PK", KeyType: "HASH" },
      { AttributeName: "SK", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "PK", AttributeType: "S" },
      { AttributeName: "SK", AttributeType: "S" },
    ],
    BillingMode: "PAY_PER_REQUEST",
  },
};

export const ALL_TABLES: TableSchema[] = [
  FsFiles,
  Users,
  Workspaces,
  Memberships,
  Sessions,
  Invites,
  Credentials,
  Permissions,
  ApiKeys,
  Groups,
  UserGroups,
  Audit,
  Records,
];
