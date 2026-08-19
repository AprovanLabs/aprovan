/**
 * IW-9 F3 stream 7 — credential audit attribution
 * (spec credential-audit-attribution; tech-plan D7).
 *
 * Exercises the sqlite audit backend directly: the six attribution fields
 * (`credentialId`, `credentialLevel`, `credentialSource`, `actorKind`,
 * `actorId`, `profileName`) round-trip through `append`/`recent`, rows
 * written before the change read back with the fields undefined (the
 * try/catch `ALTER` migration path), a shared-bot row names the human
 * (`callerId`) alongside the `workspace-oauth` credential, and ephemeral
 * request-supplied credentials are marked distinctly from stored rows.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import Database from "better-sqlite3";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AuditStoreSqlite, type AuditEntry } from "../src/audit.js";

const WS = "ws-audit-attribution";

/** Required append fields; tests override/extend per scenario. */
const base = (
  overrides: Partial<Omit<AuditEntry, "id" | "ts" | "result">> = {},
): Omit<AuditEntry, "id" | "ts" | "result"> => ({
  requestId: crypto.randomUUID(),
  workspaceId: WS,
  callerId: "alice",
  provider: "github",
  operation: "createIssue",
  status: 200,
  durationMs: 12,
  ...overrides,
});

let dataDir: string;
let store: AuditStoreSqlite;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "audit-attribution-"));
  store = new AuditStoreSqlite(dataDir);
});

afterAll(() => {
  rmSync(dataDir, { recursive: true, force: true });
});

describe("attribution fields round-trip (sqlite)", () => {
  it("round-trips all six attribution fields through append/recent", async () => {
    store.append(
      base({
        provider: "roundtrip",
        credentialId: "cred-123",
        credentialLevel: "user-oauth",
        credentialSource: "stored",
        actorKind: "workflow",
        actorId: "run-42",
        profileName: "deploy-bot",
      }),
    );
    const [row] = await store.recent({ workspaceId: WS, provider: "roundtrip" });
    expect(row).toBeDefined();
    expect(row!.credentialId).toBe("cred-123");
    expect(row!.credentialLevel).toBe("user-oauth");
    expect(row!.credentialSource).toBe("stored");
    expect(row!.actorKind).toBe("workflow");
    expect(row!.actorId).toBe("run-42");
    expect(row!.profileName).toBe("deploy-bot");
    // The pre-existing fields are untouched by the attribution columns.
    expect(row!.callerId).toBe("alice");
    expect(row!.status).toBe(200);
    expect(row!.result).toBe("success");
  });

  it("shared-bot row carries callerId + level workspace-oauth + credential id", async () => {
    // Spec: "Shared-bot action names the human" — a user's tool call under a
    // workspace-oauth credential records that user as callerId and the
    // credential's id and level.
    store.append(
      base({
        provider: "slack",
        callerId: "human-jane",
        credentialId: "cred-shared-bot",
        credentialLevel: "workspace-oauth",
        credentialSource: "stored",
      }),
    );
    const [row] = await store.recent({ workspaceId: WS, provider: "slack" });
    expect(row).toBeDefined();
    expect(row!.callerId).toBe("human-jane");
    expect(row!.credentialLevel).toBe("workspace-oauth");
    expect(row!.credentialId).toBe("cred-shared-bot");
  });

  it("ephemeral credential is marked as such and stores no credential id", async () => {
    // Spec: "Ephemeral credential is distinguishable".
    store.append(base({ provider: "ephemeral-prov", credentialSource: "ephemeral" }));
    const [row] = await store.recent({ workspaceId: WS, provider: "ephemeral-prov" });
    expect(row).toBeDefined();
    expect(row!.credentialSource).toBe("ephemeral");
    expect(row!.credentialId).toBeUndefined();
    expect(row!.credentialLevel).toBeUndefined();
  });

  it("credential-less append writes a row with no attribution fields", async () => {
    // Spec: "No credential, no attribution fields".
    store.append(base({ provider: "credless" }));
    const [row] = await store.recent({ workspaceId: WS, provider: "credless" });
    expect(row).toBeDefined();
    expect(row!.status).toBe(200);
    expect(row!.credentialId).toBeUndefined();
    expect(row!.credentialLevel).toBeUndefined();
    expect(row!.credentialSource).toBeUndefined();
    expect(row!.actorKind).toBeUndefined();
    expect(row!.actorId).toBeUndefined();
    expect(row!.profileName).toBeUndefined();
  });
});

describe("pre-change rows still read (sqlite migration)", () => {
  it("a row written before the attribution columns reads back with the fields undefined", async () => {
    // Spec: "Old rows still read" — build a database with the PRE-change
    // schema, insert a row raw, then open it through the store (which adds
    // the attribution columns via the try/catch ALTER path on construction).
    const legacyDir = mkdtempSync(join(tmpdir(), "audit-attribution-legacy-"));
    try {
      const raw = new Database(join(legacyDir, "workspace.db"));
      raw.exec(`
        CREATE TABLE audit_log (
          id TEXT PRIMARY KEY,
          ts TEXT NOT NULL,
          request_id TEXT NOT NULL,
          workspace_id TEXT NOT NULL,
          caller_id TEXT NOT NULL,
          provider TEXT NOT NULL,
          operation TEXT NOT NULL,
          status INTEGER NOT NULL,
          duration_ms INTEGER,
          result TEXT NOT NULL,
          mcp_tool_name TEXT
        );
      `);
      raw
        .prepare(
          `INSERT INTO audit_log
           (id, ts, request_id, workspace_id, caller_id, provider, operation, status, duration_ms, result, mcp_tool_name)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(
          "legacy-row-1",
          new Date().toISOString(),
          "req-legacy",
          WS,
          "old-caller",
          "github",
          "createIssue",
          200,
          7,
          "success",
          null,
        );
      raw.close();

      const migrated = new AuditStoreSqlite(legacyDir);
      const [row] = await migrated.recent({ workspaceId: WS, provider: "github" });
      expect(row).toBeDefined();
      expect(row!.id).toBe("legacy-row-1");
      expect(row!.callerId).toBe("old-caller");
      expect(row!.durationMs).toBe(7);
      expect(row!.credentialId).toBeUndefined();
      expect(row!.credentialLevel).toBeUndefined();
      expect(row!.credentialSource).toBeUndefined();
      expect(row!.actorKind).toBeUndefined();
      expect(row!.actorId).toBeUndefined();
      expect(row!.profileName).toBeUndefined();

      // New writes and old rows coexist on the migrated table.
      migrated.append(
        base({
          provider: "github",
          callerId: "new-caller",
          credentialId: "cred-after-migration",
          credentialLevel: "workspace-token",
          credentialSource: "stored",
        }),
      );
      const rows = await migrated.recent({ workspaceId: WS, provider: "github" });
      expect(rows).toHaveLength(2);
      const fresh = rows.find((entry) => entry.callerId === "new-caller");
      expect(fresh?.credentialId).toBe("cred-after-migration");
      expect(fresh?.credentialLevel).toBe("workspace-token");
    } finally {
      rmSync(legacyDir, { recursive: true, force: true });
    }
  });
});
