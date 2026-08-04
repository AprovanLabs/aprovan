/**
 * Integration tests for the DynamoDB-backed groups data layer (APR-282).
 *
 * Requires a local DynamoDB-compatible endpoint at `DYNAMO_ENDPOINT`
 * (default http://localhost:8000). Skipped automatically when the endpoint is
 * not reachable so the mock-based tests gate stays green without Docker.
 *
 *   docker run -p 8000:8000 amazon/dynamodb-local
 */

import { randomUUID } from "crypto";
import {
  CreateTableCommand,
  DeleteTableCommand,
  DescribeTableCommand,
  DynamoDBClient,
  ResourceInUseException,
  ResourceNotFoundException,
} from "@aws-sdk/client-dynamodb";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { resetDynamoDocClient } from "../src/db/client.js";
import { createIdentityStoreDynamo } from "../src/identity/dynamo.js";
import type { IIdentityStore } from "../src/identity/types.js";

// ---------------------------------------------------------------------------
// Endpoint probe + table provisioning
// ---------------------------------------------------------------------------

const GROUPS_TABLE = process.env["GROUPS_TABLE"] ?? "Groups-test";
const USER_GROUPS_TABLE = process.env["USER_GROUPS_TABLE"] ?? "UserGroups-test";
const ENDPOINT = process.env["DYNAMO_ENDPOINT"];

let ddbReady = false;

if (ENDPOINT) {
  try {
    ddbReady = await provisionTables();
  } catch (err) {
    process.stderr.write(
      `[groups-dynamodb] skipping suite — no reachable DynamoDB at ${ENDPOINT}` +
        ` (${err instanceof Error ? `${err.name}: ${err.message || "unknown"}` : String(err)})\n`,
    );
    ddbReady = false;
  }
}

function makeLowLevelClient(): DynamoDBClient {
  return new DynamoDBClient({
    endpoint: ENDPOINT,
    region: process.env["AWS_REGION"] ?? "us-east-1",
    credentials: {
      accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "local",
      secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "local",
    },
  });
}

async function dropAndCreate(
  client: DynamoDBClient,
  tableName: string,
  keySchema: { AttributeName: string; KeyType: "HASH" | "RANGE" }[],
  attrDefs: { AttributeName: string; AttributeType: "S" | "N" | "B" }[],
): Promise<void> {
  try {
    await client.send(new DeleteTableCommand({ TableName: tableName }));
  } catch (err) {
    if (!(err instanceof ResourceNotFoundException)) throw err;
  }
  await waitForTableState(client, tableName, false);

  try {
    await client.send(
      new CreateTableCommand({
        TableName: tableName,
        KeySchema: keySchema,
        AttributeDefinitions: attrDefs,
        BillingMode: "PAY_PER_REQUEST",
      }),
    );
  } catch (err) {
    if (!(err instanceof ResourceInUseException)) throw err;
  }
  await waitForTableState(client, tableName, true);
}

async function provisionTables(): Promise<boolean> {
  const client = makeLowLevelClient();

  await dropAndCreate(
    client,
    GROUPS_TABLE,
    [
      { AttributeName: "workspaceId", KeyType: "HASH" },
      { AttributeName: "groupId", KeyType: "RANGE" },
    ],
    [
      { AttributeName: "workspaceId", AttributeType: "S" },
      { AttributeName: "groupId", AttributeType: "S" },
    ],
  );

  await dropAndCreate(
    client,
    USER_GROUPS_TABLE,
    [
      { AttributeName: "workspaceId#userId", KeyType: "HASH" },
      { AttributeName: "groupId", KeyType: "RANGE" },
    ],
    [
      { AttributeName: "workspaceId#userId", AttributeType: "S" },
      { AttributeName: "groupId", AttributeType: "S" },
    ],
  );

  return true;
}

async function waitForTableState(
  client: DynamoDBClient,
  tableName: string,
  wantActive: boolean,
): Promise<void> {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const res = await client.send(new DescribeTableCommand({ TableName: tableName }));
      if (wantActive && res.Table?.TableStatus === "ACTIVE") return;
    } catch (err) {
      if (err instanceof ResourceNotFoundException && !wantActive) return;
      if (!(err instanceof ResourceNotFoundException)) throw err;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`timed out waiting for table ${tableName} (wantActive=${wantActive})`);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function uniqueWs(): string {
  return `ws-${randomUUID()}`;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe.skipIf(!ddbReady)("Groups DynamoDB", () => {
  let store: IIdentityStore;

  beforeAll(() => {
    process.env["GROUPS_TABLE"] = GROUPS_TABLE;
    process.env["USER_GROUPS_TABLE"] = USER_GROUPS_TABLE;
    resetDynamoDocClient();
    store = createIdentityStoreDynamo();
  });

  afterAll(() => {
    resetDynamoDocClient();
  });

  // -------------------------------------------------------------------------
  // Group CRUD
  // -------------------------------------------------------------------------

  it("creates a group and retrieves it by id", async () => {
    const ws = uniqueWs();
    const group = await store.groups.create(ws, "team-a", "Team A");

    expect(group.groupId).toMatch(/^[0-9a-f]{24}$/);
    expect(group.workspaceId).toBe(ws);
    expect(group.name).toBe("team-a");
    expect(group.description).toBe("Team A");
    expect(typeof group.createdAt).toBe("string");

    const fetched = await store.groups.get(ws, group.groupId);
    expect(fetched).toBeDefined();
    expect(fetched!.name).toBe("team-a");
  });

  it("creates a group without description", async () => {
    const ws = uniqueWs();
    const group = await store.groups.create(ws, "no-desc");
    expect(group.description).toBeUndefined();

    const fetched = await store.groups.get(ws, group.groupId);
    expect(fetched!.description).toBeUndefined();
  });

  it("lists groups scoped to workspace", async () => {
    const wsA = uniqueWs();
    const wsB = uniqueWs();
    await store.groups.create(wsA, "g1");
    await store.groups.create(wsA, "g2");
    await store.groups.create(wsB, "g3");

    const listA = await store.groups.list(wsA);
    expect(listA).toHaveLength(2);
    expect(listA.map((g) => g.name).sort()).toEqual(["g1", "g2"]);

    const listB = await store.groups.list(wsB);
    expect(listB).toHaveLength(1);
    expect(listB[0]!.name).toBe("g3");
  });

  it("updates group name and description", async () => {
    const ws = uniqueWs();
    const group = await store.groups.create(ws, "old-name", "old desc");

    const updated = await store.groups.update(ws, group.groupId, {
      name: "new-name",
      description: "new desc",
    });
    expect(updated).toBeDefined();
    expect(updated!.name).toBe("new-name");
    expect(updated!.description).toBe("new desc");
    expect(updated!.updatedAt >= group.updatedAt).toBe(true);
  });

  it("updateGroup returns undefined for a non-existent group", async () => {
    const ws = uniqueWs();
    const result = await store.groups.update(ws, "nonexistent-id", { name: "x" });
    expect(result).toBeUndefined();
  });

  it("deletes a group and returns false on second delete", async () => {
    const ws = uniqueWs();
    const group = await store.groups.create(ws, "to-delete");

    expect(await store.groups.remove(ws, group.groupId)).toBe(true);
    expect(await store.groups.get(ws, group.groupId)).toBeUndefined();
    expect(await store.groups.remove(ws, group.groupId)).toBe(false);
  });

  // -------------------------------------------------------------------------
  // UserGroups
  // -------------------------------------------------------------------------

  it("adds and removes a user from a group", async () => {
    const ws = uniqueWs();
    const group = await store.groups.create(ws, "ug-test");

    await store.groups.members.add(ws, group.groupId, "user-sub-1");
    await store.groups.members.add(ws, group.groupId, "user-sub-2");

    expect(await store.groups.members.remove(ws, group.groupId, "user-sub-1")).toBe(true);
    expect(await store.groups.members.remove(ws, group.groupId, "user-sub-1")).toBe(false);
    expect(await store.groups.members.remove(ws, group.groupId, "user-sub-2")).toBe(true);
  });

  it("addUserToGroup is idempotent", async () => {
    const ws = uniqueWs();
    const group = await store.groups.create(ws, "idem-test");

    await store.groups.members.add(ws, group.groupId, "user-a");
    await store.groups.members.add(ws, group.groupId, "user-a");
    expect(await store.groups.members.remove(ws, group.groupId, "user-a")).toBe(true);
  });
});
