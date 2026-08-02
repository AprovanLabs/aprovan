/**
 * Integration tests for the DynamoDB-backed audit store (APR-321).
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
import { AuditStoreDynamodb, resetAuditStore } from "../src/audit.js";
import { resetDynamoDocClient } from "../src/db/client.js";

// ---------------------------------------------------------------------------
// Endpoint probe + table provisioning
// ---------------------------------------------------------------------------

const TABLE_NAME = process.env["AUDIT_TABLE"] ?? "Audit-test";
const ENDPOINT = process.env["DYNAMO_ENDPOINT"];

let ddbReady = false;

if (ENDPOINT) {
  try {
    ddbReady = await provisionTable();
  } catch (err) {
    process.stderr.write(
      `[audit-dynamodb] skipping suite — no reachable DynamoDB at ${ENDPOINT}` +
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

async function provisionTable(): Promise<boolean> {
  const client = makeLowLevelClient();

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
      if (!wantActive && status !== undefined) {
        // still present (DELETING); keep waiting
      }
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
// Helpers
// ---------------------------------------------------------------------------

function uniqueWs(): string {
  return `ws-${randomUUID()}`;
}

/** Wait briefly so SK timestamps differ across appends in the same test. */
async function tick(): Promise<void> {
  await new Promise((r) => setTimeout(r, 2));
}

/** Append and wait for the fire-and-forget write to settle. */
async function appendAndWait(
  store: AuditStoreDynamodb,
  entry: Parameters<AuditStoreDynamodb["append"]>[0],
): Promise<void> {
  store.append(entry);
  // Give the internal Promise time to resolve against local DynamoDB.
  await new Promise((r) => setTimeout(r, 50));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe.skipIf(!ddbReady)("AuditStoreDynamodb", () => {
  beforeAll(() => {
    resetDynamoDocClient();
    resetAuditStore();
  });

  afterAll(() => {
    resetDynamoDocClient();
    resetAuditStore();
  });

  it("appends an entry and retrieves it via recent", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    await appendAndWait(store, {
      requestId: "req-1",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "github",
      operation: "repos.list",
      status: 200,
      durationMs: 42,
    });

    const entries = await store.recent({ workspaceId: ws });
    expect(entries).toHaveLength(1);
    const e = entries[0]!;
    expect(e.workspaceId).toBe(ws);
    expect(e.requestId).toBe("req-1");
    expect(e.callerId).toBe("caller-a");
    expect(e.provider).toBe("github");
    expect(e.operation).toBe("repos.list");
    expect(e.status).toBe(200);
    expect(e.durationMs).toBe(42);
    expect(e.result).toBe("success");
    expect(typeof e.id).toBe("string");
    expect(typeof e.ts).toBe("string");
  });

  it("result is 'forbidden' for 403 and 'error' for 5xx", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    await appendAndWait(store, {
      requestId: "req-403",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "linear",
      operation: "issues.list",
      status: 403,
    });
    await tick();
    await appendAndWait(store, {
      requestId: "req-500",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "linear",
      operation: "issues.list",
      status: 500,
    });

    const entries = await store.recent({ workspaceId: ws });
    expect(entries).toHaveLength(2);
    const byStatus = Object.fromEntries(entries.map((e) => [e.status, e.result]));
    expect(byStatus[403]).toBe("forbidden");
    expect(byStatus[500]).toBe("error");
  });

  it("recent returns entries newest-first", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    for (const op of ["op1", "op2", "op3"]) {
      await appendAndWait(store, {
        requestId: `req-${op}`,
        workspaceId: ws,
        callerId: "caller-a",
        provider: "github",
        operation: op,
        status: 200,
      });
      await tick();
    }

    const entries = await store.recent({ workspaceId: ws });
    expect(entries.map((e) => e.operation)).toEqual(["op3", "op2", "op1"]);
  });

  it("honours the limit parameter", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    for (let i = 0; i < 5; i++) {
      await appendAndWait(store, {
        requestId: `req-${i}`,
        workspaceId: ws,
        callerId: "caller-a",
        provider: "github",
        operation: `op${i}`,
        status: 200,
      });
      await tick();
    }

    const entries = await store.recent({ workspaceId: ws, limit: 3 });
    expect(entries).toHaveLength(3);
  });

  it("filters by callerId", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    await appendAndWait(store, {
      requestId: "req-a",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "github",
      operation: "op",
      status: 200,
    });
    await tick();
    await appendAndWait(store, {
      requestId: "req-b",
      workspaceId: ws,
      callerId: "caller-b",
      provider: "github",
      operation: "op",
      status: 200,
    });

    const onlyA = await store.recent({ workspaceId: ws, callerId: "caller-a" });
    expect(onlyA).toHaveLength(1);
    expect(onlyA[0]!.callerId).toBe("caller-a");

    const onlyB = await store.recent({ workspaceId: ws, callerId: "caller-b" });
    expect(onlyB).toHaveLength(1);
    expect(onlyB[0]!.callerId).toBe("caller-b");
  });

  it("filters by provider", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    await appendAndWait(store, {
      requestId: "req-gh",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "github",
      operation: "op",
      status: 200,
    });
    await tick();
    await appendAndWait(store, {
      requestId: "req-lin",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "linear",
      operation: "op",
      status: 200,
    });

    const github = await store.recent({ workspaceId: ws, provider: "github" });
    expect(github).toHaveLength(1);
    expect(github[0]!.provider).toBe("github");

    const linear = await store.recent({ workspaceId: ws, provider: "linear" });
    expect(linear).toHaveLength(1);
    expect(linear[0]!.provider).toBe("linear");
  });

  it("filters by callerId and provider together", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    const entries = [
      { callerId: "caller-a", provider: "github" },
      { callerId: "caller-a", provider: "linear" },
      { callerId: "caller-b", provider: "github" },
    ];
    for (const { callerId, provider } of entries) {
      await appendAndWait(store, {
        requestId: randomUUID(),
        workspaceId: ws,
        callerId,
        provider,
        operation: "op",
        status: 200,
      });
      await tick();
    }

    const filtered = await store.recent({ workspaceId: ws, callerId: "caller-a", provider: "github" });
    expect(filtered).toHaveLength(1);
    expect(filtered[0]!.callerId).toBe("caller-a");
    expect(filtered[0]!.provider).toBe("github");
  });

  it("isolates entries by workspace", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const wsA = uniqueWs();
    const wsB = uniqueWs();

    await appendAndWait(store, {
      requestId: "req-a",
      workspaceId: wsA,
      callerId: "caller-a",
      provider: "github",
      operation: "op",
      status: 200,
    });
    await tick();
    await appendAndWait(store, {
      requestId: "req-b",
      workspaceId: wsB,
      callerId: "caller-b",
      provider: "linear",
      operation: "op",
      status: 200,
    });

    const a = await store.recent({ workspaceId: wsA });
    expect(a).toHaveLength(1);
    expect(a[0]!.workspaceId).toBe(wsA);

    const b = await store.recent({ workspaceId: wsB });
    expect(b).toHaveLength(1);
    expect(b[0]!.workspaceId).toBe(wsB);
  });

  it("returns empty array when no entries exist", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const entries = await store.recent({ workspaceId: ws });
    expect(entries).toHaveLength(0);
  });

  it("omits durationMs when not provided", async () => {
    const store = new AuditStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();

    await appendAndWait(store, {
      requestId: "req-nodur",
      workspaceId: ws,
      callerId: "caller-a",
      provider: "github",
      operation: "op",
      status: 200,
    });

    const entries = await store.recent({ workspaceId: ws });
    expect(entries).toHaveLength(1);
    expect(entries[0]!.durationMs).toBeUndefined();
  });
});
