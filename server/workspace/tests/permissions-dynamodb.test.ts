/**
 * Integration tests for the DynamoDB-backed permission store (APR-320).
 *
 * These run against a real DynamoDB-compatible endpoint at `DYNAMO_ENDPOINT`
 * (default http://localhost:8000), e.g. `amazon/dynamodb-local`:
 *
 *   docker run -p 8000:8000 amazon/dynamodb-local
 *
 * The suite is gated on endpoint availability: if no local DynamoDB is running
 * (the default for `pnpm test` without docker), the suite is skipped so the
 * mock-based unit tests and the rest of the gate stay green. Bring up a local
 * DynamoDB to exercise these end-to-end.
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
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { resetDynamoDocClient, getDynamoDocClient } from "../src/db/client.js";
import { PermissionStoreDynamodb } from "../src/permissions.js";

// ---------------------------------------------------------------------------
// Endpoint probe + table provisioning (top-level await so describe.skipIf can
// see the result at module evaluation time)
// ---------------------------------------------------------------------------

const TABLE_NAME = process.env["PERMISSIONS_TABLE"] ?? "Permissions-test";
const ENDPOINT = process.env["DYNAMO_ENDPOINT"];

let ddbReady = false;

if (ENDPOINT) {
  try {
    ddbReady = await provisionTable();
  } catch (err) {
    process.stderr.write(
      `[permissions-dynamodb] skipping suite — no reachable DynamoDB at ${ENDPOINT}` +
        ` (${err instanceof Error ? `${err.name}: ${err.message || "unknown"}` : String(err)})\n`,
    );
    ddbReady = false;
  }
}

async function lowLevelClient(): Promise<DynamoDBClient> {
  return new DynamoDBClient({
    endpoint: ENDPOINT,
    region: process.env["AWS_REGION"] ?? "us-east-1",
    credentials: {
      accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "local",
      secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "local",
    },
  });
}

async function provisionTable(): Promise<boolean> {
  const client = await lowLevelClient();

  // Drop any leftover table, then recreate with the single-table PK/SK schema
  // so a stale schema from a prior experiment can't poison the run.
  try {
    await client.send(new DeleteTableCommand({ TableName: TABLE_NAME }));
  } catch (err) {
    if (!(err instanceof ResourceNotFoundException)) throw err;
  }
  await waitForTableState(client, TABLE_NAME, false);

  try {
    await client.send(
      new CreateTableCommand({
        TableName: TABLE_NAME,
        KeySchema: [
          { AttributeName: "PK", KeyType: "HASH" },
          { AttributeName: "SK", KeyType: "RANGE" },
        ],
        AttributeDefinitions: [
          { AttributeName: "PK", AttributeType: "S" },
          { AttributeName: "SK", AttributeType: "S" },
        ],
        BillingMode: "PAY_PER_REQUEST",
      }),
    );
  } catch (err) {
    if (!(err instanceof ResourceInUseException)) throw err;
  }
  await waitForTableState(client, TABLE_NAME, true);
  return true;
}

/** Poll DescribeTable until the table exists (or is gone) or we time out. */
async function waitForTableState(
  client: DynamoDBClient,
  tableName: string,
  wantActive: boolean,
): Promise<void> {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const res = await client.send(new DescribeTableCommand({ TableName: tableName }));
      const status = res.Table?.TableStatus;
      if (wantActive && status === "ACTIVE") return;
    } catch (err) {
      if (err instanceof ResourceNotFoundException) {
        if (!wantActive) return;
      } else {
        throw err;
      }
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`timed out waiting for table ${tableName} (wantActive=${wantActive})`);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

function uniqueWs(): string {
  return `ws-${randomUUID()}`;
}

function uniqueCaller(): string {
  return `caller-${randomUUID().slice(0, 8)}`;
}

describe.skipIf(!ddbReady)("PermissionStoreDynamodb", () => {
  beforeAll(() => {
    resetDynamoDocClient();
  });

  afterAll(() => {
    resetDynamoDocClient();
  });

  it("grants a permission and lists it for the workspace", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    const granted = await store.grant(ws, {
      callerId: caller,
      provider: "github",
      operation: "repos.list",
      grantedBy: "admin-1",
    });

    expect(granted.id).toMatch(/^[0-9a-f]{24}$/);
    expect(granted.workspaceId).toBe(ws);
    expect(granted.callerId).toBe(caller);
    expect(granted.provider).toBe("github");
    expect(granted.operation).toBe("repos.list");
    expect(granted.grantedBy).toBe("admin-1");
    expect(typeof granted.grantedAt).toBe("string");

    const list = await store.list(ws);
    expect(list).toHaveLength(1);
    expect(list[0]!.id).toBe(granted.id);
    expect(list[0]!.callerId).toBe(caller);
    expect(list[0]!.provider).toBe("github");
    expect(list[0]!.operation).toBe("repos.list");
  });

  it("check returns true for an exact operation grant", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    await store.grant(ws, { callerId: caller, provider: "github", operation: "repos.list", grantedBy: "u" });

    expect(await store.check(ws, caller, "github", "repos.list")).toBe(true);
  });

  it("check returns true for a wildcard grant regardless of operation", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    await store.grant(ws, { callerId: caller, provider: "github", operation: "*", grantedBy: "u" });

    expect(await store.check(ws, caller, "github", "repos.list")).toBe(true);
    expect(await store.check(ws, caller, "github", "repos.get")).toBe(true);
    expect(await store.check(ws, caller, "github", "issues.create")).toBe(true);
    // A wildcard grant also answers a wildcard query.
    expect(await store.check(ws, caller, "github", "*")).toBe(true);
  });

  it("check returns false when no grant exists", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    expect(await store.check(ws, "nobody", "github", "repos.list")).toBe(false);
  });

  it("check returns false for a different operation under the same provider", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    await store.grant(ws, { callerId: caller, provider: "github", operation: "repos.list", grantedBy: "u" });

    expect(await store.check(ws, caller, "github", "repos.get")).toBe(false);
  });

  it("check is workspace-scoped", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const wsA = uniqueWs();
    const wsB = uniqueWs();
    const caller = uniqueCaller();
    await store.grant(wsA, { callerId: caller, provider: "github", operation: "*", grantedBy: "u" });

    expect(await store.check(wsA, caller, "github", "repos.list")).toBe(true);
    // Same caller + provider + op in a different workspace is not allowed.
    expect(await store.check(wsB, caller, "github", "repos.list")).toBe(false);
  });

  it("check is caller-scoped", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.grant(ws, { callerId: "alice", provider: "github", operation: "*", grantedBy: "u" });

    expect(await store.check(ws, "alice", "github", "repos.list")).toBe(true);
    expect(await store.check(ws, "bob", "github", "repos.list")).toBe(false);
  });

  it("check is provider-scoped", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    await store.grant(ws, { callerId: caller, provider: "github", operation: "*", grantedBy: "u" });

    expect(await store.check(ws, caller, "github", "repos.list")).toBe(true);
    expect(await store.check(ws, caller, "linear", "issues.list")).toBe(false);
  });

  it("revokes a permission by id and removes both the grant and the pointer", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    const granted = await store.grant(ws, {
      callerId: caller,
      provider: "github",
      operation: "repos.list",
      grantedBy: "u",
    });

    expect(await store.revoke(ws, granted.id)).toBe(true);
    expect(await store.list(ws)).toHaveLength(0);
    expect(await store.check(ws, caller, "github", "repos.list")).toBe(false);

    // The PERMID# pointer is gone too.
    const client = await getDynamoDocClient();
    const pointer = await client.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { PK: `WS#${ws}`, SK: `PERMID#${granted.id}` } }),
    );
    expect(pointer.Item).toBeUndefined();
  });

  it("revoke returns false for a missing permId", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    expect(await store.revoke(ws, "nonexistent-id")).toBe(false);
  });

  it("revoke is workspace-scoped (permId from another workspace does not revoke)", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const wsA = uniqueWs();
    const wsB = uniqueWs();
    const granted = await store.grant(wsA, {
      callerId: "alice",
      provider: "github",
      operation: "*",
      grantedBy: "u",
    });

    // The PERMID# pointer is keyed under WS#<wsA>; looking it up from wsB misses.
    expect(await store.revoke(wsB, granted.id)).toBe(false);
    expect(await store.list(wsA)).toHaveLength(1);
  });

  it("list filters by callerId", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.grant(ws, { callerId: "alice", provider: "github", operation: "*", grantedBy: "u" });
    await store.grant(ws, { callerId: "alice", provider: "linear", operation: "*", grantedBy: "u" });
    await store.grant(ws, { callerId: "bob", provider: "github", operation: "*", grantedBy: "u" });

    const all = await store.list(ws);
    expect(all).toHaveLength(3);

    const alice = await store.list(ws, "alice");
    expect(alice).toHaveLength(2);
    expect(alice.every((p) => p.callerId === "alice")).toBe(true);

    const bob = await store.list(ws, "bob");
    expect(bob).toHaveLength(1);
    expect(bob[0]!.provider).toBe("github");

    const nobody = await store.list(ws, "carol");
    expect(nobody).toHaveLength(0);
  });

  it("list excludes the PERMID# pointer items", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.grant(ws, { callerId: "alice", provider: "github", operation: "*", grantedBy: "u" });
    await store.grant(ws, { callerId: "bob", provider: "linear", operation: "issues.list", grantedBy: "u" });

    // Two grants — list must report two permissions, not four (each grant
    // also writes a PERMID# pointer, which begins_with(SK, "PERM#") excludes).
    const list = await store.list(ws);
    expect(list).toHaveLength(2);
    expect(list.map((p) => p.callerId).sort()).toEqual(["alice", "bob"]);
  });

  it("grant is idempotent — re-granting the same tuple overwrites", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();

    const first = await store.grant(ws, { callerId: caller, provider: "github", operation: "repos.list", grantedBy: "u" });
    const second = await store.grant(ws, { callerId: caller, provider: "github", operation: "repos.list", grantedBy: "u2" });

    // Same (caller, provider, operation) tuple → one grant item, overwritten in
    // place. The list shows a single permission, now carrying the second id and
    // grantedBy.
    const list = await store.list(ws);
    expect(list).toHaveLength(1);
    expect(list[0]!.id).toBe(second.id);
    expect(list[0]!.grantedBy).toBe("u2");
    expect(list[0]!.id).not.toBe(first.id);

    // The grant is active and resolves for the operation.
    expect(await store.check(ws, caller, "github", "repos.list")).toBe(true);
  });

  it("isolates permissions by workspace", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const wsA = uniqueWs();
    const wsB = uniqueWs();
    await store.grant(wsA, { callerId: "alice", provider: "github", operation: "*", grantedBy: "u" });
    await store.grant(wsB, { callerId: "bob", provider: "linear", operation: "*", grantedBy: "u" });

    expect(await store.list(wsA)).toHaveLength(1);
    expect(await store.list(wsB)).toHaveLength(1);
    expect((await store.list(wsA))[0]!.provider).toBe("github");
    expect((await store.list(wsB))[0]!.provider).toBe("linear");
  });

  it("supports multiple permissions per workspace", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.grant(ws, { callerId: "alice", provider: "github", operation: "repos.list", grantedBy: "u" });
    await store.grant(ws, { callerId: "alice", provider: "github", operation: "repos.get", grantedBy: "u" });
    await store.grant(ws, { callerId: "alice", provider: "linear", operation: "*", grantedBy: "u" });
    await store.grant(ws, { callerId: "bob", provider: "github", operation: "*", grantedBy: "u" });

    const list = await store.list(ws);
    expect(list).toHaveLength(4);

    // Each operation is individually checkable for alice on github.
    expect(await store.check(ws, "alice", "github", "repos.list")).toBe(true);
    expect(await store.check(ws, "alice", "github", "repos.get")).toBe(true);
    expect(await store.check(ws, "alice", "github", "issues.create")).toBe(false);
    // Wildcard on linear covers any linear operation.
    expect(await store.check(ws, "alice", "linear", "issues.list")).toBe(true);
  });

  it("writes a PERMID# pointer alongside the grant carrying the tuple", async () => {
    const store = new PermissionStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const caller = uniqueCaller();
    const granted = await store.grant(ws, {
      callerId: caller,
      provider: "github",
      operation: "repos.list",
      grantedBy: "u",
    });

    const client = await getDynamoDocClient();
    const pointer = await client.send(
      new GetCommand({ TableName: TABLE_NAME, Key: { PK: `WS#${ws}`, SK: `PERMID#${granted.id}` } }),
    );
    expect(pointer.Item).toBeDefined();
    const item = pointer.Item as Record<string, unknown>;
    expect(item["callerId"]).toBe(caller);
    expect(item["provider"]).toBe("github");
    expect(item["operation"]).toBe("repos.list");
  });
});
