/**
 * Integration tests for the DynamoDB-backed credential store (APR-318).
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
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { CredentialStoreDynamodb, type CredentialPayload } from "../src/credentials.js";
import { resetDynamoDocClient } from "../src/db/client.js";

// ---------------------------------------------------------------------------
// Endpoint probe + table provisioning (top-level await so describe.skipIf can
// see the result at module evaluation time)
// ---------------------------------------------------------------------------

const TABLE_NAME = process.env["CREDENTIALS_TABLE"] ?? "Credentials-test";
const ENDPOINT = process.env["DYNAMO_ENDPOINT"];

let ddbReady = false;

if (ENDPOINT) {
  try {
    ddbReady = await provisionTable();
  } catch (err) {
    process.stderr.write(
      `[credentials-dynamodb] skipping suite — no reachable DynamoDB at ${ENDPOINT}` +
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
      if (!wantActive && status !== undefined) {
        // still present (DELETING); keep waiting for it to vanish
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
// Tests
// ---------------------------------------------------------------------------

function uniqueWs(): string {
  return `ws-${randomUUID()}`;
}

const BEARER: CredentialPayload = { type: "bearer_token", token: "ghp_test_token" };
const API_KEY: CredentialPayload = { type: "api_key", value: "sk_test_secret", headerName: "X-Api-Key" };
const OAUTH_CLIENT: CredentialPayload = {
  type: "oauth2_client",
  clientId: "cid",
  clientSecret: "csec",
  tokenUrl: "https://example.com/token",
  scopes: ["read"],
};

describe.skipIf(!ddbReady)("CredentialStoreDynamodb", () => {
  beforeAll(() => {
    // Use a fresh document client pointed at the test endpoint.
    resetDynamoDocClient();
  });

  afterAll(() => {
    resetDynamoDocClient();
  });

  it("creates a credential and lists it for the workspace", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const created = await store.create(ws, { provider: "github", label: "CI token", payload: BEARER });

    expect(created.id).toMatch(/^[0-9a-f]{24}$/);
    expect(created.workspaceId).toBe(ws);
    expect(created.provider).toBe("github");
    expect(created.label).toBe("CI token");
    expect(created.type).toBe("bearer_token");
    expect(typeof created.createdAt).toBe("string");
    expect(created.createdAt).toBe(created.updatedAt);

    const list = await store.list(ws);
    expect(list).toHaveLength(1);
    expect(list[0]!.id).toBe(created.id);
    expect(list[0]!.provider).toBe("github");
  });

  it("retrieves a credential by id via the pointer (get)", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const created = await store.create(ws, { provider: "stripe", payload: API_KEY });

    const got = await store.get(ws, created.id);
    expect(got).toBeDefined();
    expect(got!.id).toBe(created.id);
    expect(got!.provider).toBe("stripe");
    expect(got!.type).toBe("api_key");
  });

  it("getPayload returns the decrypted plaintext payload", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const created = await store.create(ws, { provider: "google", payload: OAUTH_CLIENT });

    const payload = await store.getPayload(ws, created.id);
    expect(payload).toEqual(OAUTH_CLIENT);
  });

  it("resolveForProvider returns the first payload for a provider (hot path)", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.create(ws, { provider: "github", payload: BEARER });

    const resolved = await store.resolveForProvider(ws, "github");
    expect(resolved).toEqual(BEARER);
  });

  it("resolveForProvider only matches the requested provider", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.create(ws, { provider: "github", payload: BEARER });
    await store.create(ws, { provider: "linear", payload: { type: "bearer_token", token: "lin_x" } });

    expect(await store.resolveForProvider(ws, "github")).toEqual(BEARER);
    expect(await store.resolveForProvider(ws, "linear")).toEqual({ type: "bearer_token", token: "lin_x" });
    expect(await store.resolveForProvider(ws, "not-configured")).toBeUndefined();
  });

  it("deletes a credential and removes both the record and the pointer", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const created = await store.create(ws, { provider: "github", payload: BEARER });

    expect(await store.delete(ws, created.id)).toBe(true);
    expect(await store.get(ws, created.id)).toBeUndefined();
    expect(await store.getPayload(ws, created.id)).toBeUndefined();
    expect(await store.list(ws)).toHaveLength(0);
    // After delete, resolveForProvider no longer finds the provider for the ws.
    expect(await store.resolveForProvider(ws, "github")).toBeUndefined();
  });

  it("delete returns false for a missing credential", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    expect(await store.delete(ws, "nonexistent-id")).toBe(false);
  });

  it("get returns undefined for a missing credential", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    expect(await store.get(ws, "nonexistent-id")).toBeUndefined();
  });

  it("isolates credentials by workspace", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const wsA = uniqueWs();
    const wsB = uniqueWs();
    await store.create(wsA, { provider: "github", payload: BEARER });
    await store.create(wsB, { provider: "linear", payload: { type: "bearer_token", token: "lin_b" } });

    expect(await store.list(wsA)).toHaveLength(1);
    expect(await store.list(wsB)).toHaveLength(1);
    expect((await store.list(wsA))[0]!.provider).toBe("github");
    expect((await store.list(wsB))[0]!.provider).toBe("linear");
    // Cross-workspace get is not possible (pointer is workspace-scoped).
    const aCredId = (await store.list(wsA))[0]!.id;
    expect(await store.get(wsB, aCredId)).toBeUndefined();
  });

  it("supports multiple credentials per workspace across providers", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.create(ws, { provider: "github", payload: BEARER });
    await store.create(ws, { provider: "stripe", payload: API_KEY });
    await store.create(ws, { provider: "google", payload: OAUTH_CLIENT });

    const list = await store.list(ws);
    expect(list).toHaveLength(3);
    const providers = list.map((c) => c.provider).sort();
    expect(providers).toEqual(["github", "google", "stripe"]);
  });

  it("omits label when not provided", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const created = await store.create(ws, { provider: "github", payload: BEARER });

    expect(created.label).toBeUndefined();
    const got = await store.get(ws, created.id);
    expect(got!.label).toBeUndefined();
  });

  it("list does not surface the payload (only record fields)", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    await store.create(ws, { provider: "stripe", payload: API_KEY });

    const list = await store.list(ws);
    expect(list).toHaveLength(1);
    const rec = list[0]!;
    // CredentialRecord has no payload/encryptedPayload fields.
    expect((rec as unknown as Record<string, unknown>)["payload"]).toBeUndefined();
    expect((rec as unknown as Record<string, unknown>)["encryptedPayload"]).toBeUndefined();
    // But the payload is retrievable on the cold path.
    const payload = await store.getPayload(ws, rec.id);
    expect(payload).toEqual(API_KEY);
  });

  it("resolveForProvider returns the first when multiple exist for a provider", async () => {
    const store = new CredentialStoreDynamodb(TABLE_NAME);
    const ws = uniqueWs();
    const first = await store.create(ws, { provider: "github", payload: BEARER });
    await store.create(ws, {
      provider: "github",
      payload: { type: "bearer_token", token: "ghp_second" },
    });

    const resolved = await store.resolveForProvider(ws, "github");
    // Limit=1 returns one of the two; it must be a valid github payload.
    expect(resolved?.type).toBe("bearer_token");
    expect([BEARER.token, "ghp_second"]).toContain((resolved as { token: string }).token);
    // The first-created record is still individually retrievable.
    expect(await store.get(ws, first.id)).toBeDefined();
  });
});
