/**
 * IW-9 C stream 9 — action exception queue lifecycle.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { ResourceGrantRow } from "@aprovan/registry-server";
import {
  countQueuedForRun,
  discard,
  expireQueuedAction,
  getQueuedAction,
  queueForChain,
  QUEUE_TTL_MS,
  release,
  resetQueueForChainIndex,
  resetReleaseExecutor,
  setReleaseExecutor,
  type QueuedAction,
} from "../src/action-queue.js";
import { getAuditStore, resetAuditStore } from "../src/audit.js";
import { evaluateDispatch, type DispatchRequest } from "../src/grants.js";
import type { Principal } from "../src/middleware/auth.js";
import { resetPermissionStore } from "../src/permissions.js";
import { resetRecordStore } from "../src/records.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-action-queue-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["STORE_BACKEND"] = "sqlite";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["STORE_BACKEND"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  await resetRegistryStorage();
  resetPermissionStore();
  resetRecordStore();
  resetAuditStore();
  resetReleaseExecutor();
  resetQueueForChainIndex();
});

const WS = "ws-queue";

const member = (overrides: Partial<Principal> = {}): Principal => ({
  sub: "user-alice",
  workspaceId: WS,
  role: "member",
  groupIds: [],
  ...overrides,
});

function grantRow(
  partial: Pick<ResourceGrantRow, "capability" | "resourcePattern" | "credentialLevel"> & {
    subject?: ResourceGrantRow["subject"];
  },
): ResourceGrantRow {
  return {
    id: `rg-${Math.random().toString(36).slice(2, 10)}`,
    tenantId: WS,
    subject: partial.subject ?? { kind: "user", id: "user-alice" },
    capability: partial.capability,
    resourcePattern: partial.resourcePattern,
    credentialLevel: partial.credentialLevel,
    grantedBy: "user-admin",
    createdAt: new Date().toISOString(),
  };
}

function emailSendReq(extra: Partial<DispatchRequest> = {}): DispatchRequest {
  return {
    principal: member(),
    tool: { namespace: "email", operation: "send", effect: "action" },
    resource: "mailto:bob@example.org",
    credential: { level: "workspace-oauth", id: "cred-ws-oauth" },
    ...extra,
  };
}

const aprovanOnlyGrant = () =>
  grantRow({
    capability: "email.send",
    // Exact match — published matcher treats `*` as a whole segment.
    resourcePattern: "mailto:alice@aprovan.com",
    credentialLevel: "workspace-oauth",
  });

async function queueBob(): Promise<{ decisionId: string; action: QueuedAction }> {
  const decision = await evaluateDispatch(emailSendReq(), {
    invokerPatterns: ["email.send"],
    resourceGrants: [aprovanOnlyGrant()],
  });
  expect(decision.kind).toBe("queue");
  const decisionId = (decision as { queuedActionId: string }).queuedActionId;
  const action = await getQueuedAction(WS, decisionId);
  expect(action).toBeDefined();
  return { decisionId, action: action! };
}

function parseAuditAttribution(mcpToolName: string | undefined): {
  transition: string;
  attribution: {
    user: string;
    approver?: string;
    credential?: { level: string; id: string };
    via?: { appId?: string; profileId?: string };
  };
} {
  expect(mcpToolName).toBeTruthy();
  return JSON.parse(mcpToolName!) as ReturnType<typeof parseAuditAttribution>;
}

describe("action exception queue (IW-9 C stream 9)", () => {
  it("Resource miss queues — full call + target resource persisted", async () => {
    const { decisionId, action } = await queueBob();
    expect(action.id).toBe(decisionId);
    expect(action.state).toBe("queued");
    expect(action.request.resource).toBe("mailto:bob@example.org");
    expect(action.request.tool).toEqual({
      namespace: "email",
      operation: "send",
      effect: "action",
    });
    expect(action.attribution.user).toBe("user-alice");
    expect(action.attribution.credential).toEqual({
      level: "workspace-oauth",
      id: "cred-ws-oauth",
    });
    expect(Date.parse(action.expiresAt) - Date.parse(action.createdAt)).toBe(QUEUE_TTL_MS);
  });

  it("Namespace miss does not queue", async () => {
    const before = await getAuditStore().recent({ workspaceId: WS, limit: 100 });
    const decision = await evaluateDispatch(emailSendReq(), {
      invokerPatterns: ["slack.*"],
      resourceGrants: [aprovanOnlyGrant()],
    });
    expect(decision).toEqual({ kind: "deny", reason: "capability" });
    const after = await getAuditStore().recent({ workspaceId: WS, limit: 100 });
    expect(after.length).toBe(before.length);
  });

  it("Fire-and-forget continues; result-dependent ends turn", async () => {
    const runId = "run-chain-1";
    const decision = await evaluateDispatch(
      emailSendReq({ runContext: { runId, resultDependent: false } }),
      {
        invokerPatterns: ["email.send"],
        resourceGrants: [aprovanOnlyGrant()],
      },
    );
    expect(decision.kind).toBe("queue");

    const ff = await queueForChain(runId, false);
    expect(ff.queuedActionId).toBe((decision as { queuedActionId: string }).queuedActionId);
    expect(ff.continueTurn).toBe(true);

    const dep = await queueForChain(runId, true);
    expect(dep.continueTurn).toBe(false);
    expect(await countQueuedForRun(WS, runId)).toBe(1);
  });

  it("Release executes once; double-release is a no-op error", async () => {
    const { decisionId, action } = await queueBob();
    const executed: DispatchRequest[] = [];
    setReleaseExecutor(async (req) => {
      executed.push(req);
    });

    const released = await release(WS, decisionId, "user-admin");
    expect(released.state).toBe("released");
    expect(executed).toHaveLength(1);
    expect(executed[0]!.resource).toBe("mailto:bob@example.org");
    expect(released.resolution?.by).toBe("user-admin");

    await expect(release(WS, decisionId, "user-admin")).rejects.toMatchObject({
      status: 409,
    });
    expect(executed).toHaveLength(1);

    const stored = await getQueuedAction(WS, action.id);
    expect(stored?.state).toBe("released");
  });

  it("Release with remember writes a grant that later dispatches allow", async () => {
    const { decisionId } = await queueBob();
    const executed: DispatchRequest[] = [];
    setReleaseExecutor(async (req) => {
      executed.push(req);
    });

    await release(WS, decisionId, "user-admin", "mailto:bob@example.org");
    expect(executed).toHaveLength(1);

    const store = await getRegistryStorage();
    const grants = await store.resourceGrants.list(WS, {
      subject: { kind: "user", id: "user-alice" },
      capability: "email.send",
    });
    expect(grants.some((g) => g.resourcePattern === "mailto:bob@example.org")).toBe(true);

    const again = await evaluateDispatch(emailSendReq(), {
      invokerPatterns: ["email.send"],
    });
    expect(again).toEqual({ kind: "allow" });
  });

  it("Expiry discards without executing; cannot release", async () => {
    const { decisionId } = await queueBob();
    const executed: DispatchRequest[] = [];
    setReleaseExecutor(async (req) => {
      executed.push(req);
    });

    const expired = await expireQueuedAction(WS, decisionId);
    expect(expired.state).toBe("expired");
    expect(expired.reason).toBe("expired");
    expect(executed).toHaveLength(0);

    await expect(release(WS, decisionId, "user-admin")).rejects.toMatchObject({
      status: 409,
    });
    expect(executed).toHaveLength(0);
  });

  it("Lazy expiry on get transitions queued → expired", async () => {
    const { decisionId } = await queueBob();
    const action = await getQueuedAction(WS, decisionId);
    expect(action).toBeDefined();
    // Backdate expiry so the next read sweeps it.
    const { writeSvcRecord, svcScope } = await import("../src/svc-records.js");
    await writeSvcRecord(WS, svcScope("actions", "queue"), decisionId, {
      ...action!,
      expiresAt: new Date(Date.now() - 1000).toISOString(),
    });

    const swept = await getQueuedAction(WS, decisionId);
    expect(swept?.state).toBe("expired");
    expect(swept?.reason).toBe("expired");
  });

  it("Discard marks terminal without executing", async () => {
    const { decisionId } = await queueBob();
    const executed: DispatchRequest[] = [];
    setReleaseExecutor(async (req) => {
      executed.push(req);
    });
    const discarded = await discard(WS, decisionId, "user-admin");
    expect(discarded.state).toBe("discarded");
    expect(executed).toHaveLength(0);
  });

  it("Attribution survives release — every transition audits the F3 triple", async () => {
    const decision = await evaluateDispatch(
      emailSendReq({ via: { appId: "app-mail" } }),
      {
        invokerPatterns: ["email.send"],
        appCeiling: ["email.send"],
        resourceGrants: [
          grantRow({
            subject: { kind: "app-install", id: "app-mail" },
            capability: "email.send",
            resourcePattern: "mailto:alice@aprovan.com",
            credentialLevel: "workspace-oauth",
          }),
        ],
      },
    );
    expect(decision.kind).toBe("queue");
    const id = (decision as { queuedActionId: string }).queuedActionId;

    setReleaseExecutor(async () => undefined);
    await release(WS, id, "user-admin");

    const recent = await getAuditStore().recent({ workspaceId: WS, limit: 100 });
    const queueRows = recent.filter((e) => e.requestId.startsWith(`${id}:`));
    expect(queueRows.map((e) => e.operation).sort()).toEqual([
      "queue.queued",
      "queue.released",
    ]);

    for (const row of queueRows) {
      expect(row.callerId).toBe("user-alice");
      const parsed = parseAuditAttribution(row.mcp_tool_name);
      expect(parsed.attribution.user).toBe("user-alice");
      expect(parsed.attribution.credential).toEqual({
        level: "workspace-oauth",
        id: "cred-ws-oauth",
      });
      expect(parsed.attribution.via).toEqual({ appId: "app-mail" });
    }

    const releasedAudit = queueRows.find((e) => e.operation === "queue.released")!;
    const releasedParsed = parseAuditAttribution(releasedAudit.mcp_tool_name);
    expect(releasedParsed.attribution.approver).toBe("user-admin");
  });
});
