/**
 * IW-9 C stream 10 — capability approval flow (install / JIT / ask / always-ask).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { ResourceGrantRow } from "@aprovan/registry-server";
import {
  getQueuedAction,
  resetQueueForChainIndex,
  resetReleaseExecutor,
  setReleaseExecutor,
} from "../src/action-queue.js";
import {
  acceptJitCard,
  declareAppAlwaysAsk,
  draftHasNoGrants,
  getAlwaysAskPolicy,
  getCapabilityCard,
  isAlwaysAsk,
  proposeDraftInstall,
  proposeInstallCeiling,
  queuedActionsMessage,
  raiseJitCard,
  saveInstallCard,
  setWorkspaceAlwaysAsk,
} from "../src/capability-cards.js";
import {
  confirmInstallCeilingCard,
  proposeInstallCeilingCard,
} from "../src/apps/install.js";
import { resumeNativeAgentAfterApproval } from "../src/agents/runner.js";
import { evaluateDispatch, type DispatchRequest } from "../src/grants.js";
import type { Principal } from "../src/middleware/auth.js";
import { resetPermissionStore } from "../src/permissions.js";
import { resetRecordStore } from "../src/records.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";
import {
  writeSvcRecord,
  svcScope,
} from "../src/svc-records.js";
import {
  AskPendingError,
  answerWorkflowAsk,
  askStep,
} from "../src/workflows/invoke.js";
import type { ServiceContext } from "../src/service-kernel.js";

let dataDir: string;
let testSeq = 0;
let WS = "ws-cards";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-capability-cards-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["STORE_BACKEND"] = "sqlite";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["STORE_BACKEND"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(async () => {
  testSeq += 1;
  WS = `ws-cards-${testSeq}`;
  await resetRegistryStorage();
  resetPermissionStore();
  resetRecordStore();
  resetReleaseExecutor();
  resetQueueForChainIndex();
});

const APP = "app-mailer";

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

const SOURCE_BOTH = `
async function run() {
  await tools.github.issues.create({ title: "hi" });
  await tools.email.send({ to: "bob@example.org" });
}
`;

describe("capability-cards (IW-9 C stream 10)", () => {
  it("Ceiling proposed from code — lists declared caps for scanned namespaces", async () => {
    const card = proposeInstallCeiling({
      workspaceId: WS,
      invokerId: "user-alice",
      sources: [SOURCE_BOTH],
      declaredCapabilities: ["github.issues.create", "email.send"],
    });
    expect(card.blocked).toBe(false);
    const caps = (card.proposals ?? [])
      .filter((p) => !p.flag)
      .map((p) => p.capability)
      .sort();
    expect(caps).toEqual(["email.send", "github.issues.create"]);
    expect(card.proposals?.every((p) => p.effect === "action")).toBe(true);

    await saveInstallCard(card);
    const confirmed = await confirmInstallCeilingCard(WS, card.id, "user-alice", {
      kind: "app-install",
      id: APP,
    });
    expect(confirmed.state).toBe("accepted");

    const store = await getRegistryStorage();
    await store.tenants.ensure(WS);
    const rows = await store.resourceGrants.list(WS, {
      subject: { kind: "app-install", id: APP },
    });
    expect(rows.map((r) => r.capability).sort()).toEqual([
      "email.send",
      "github.issues.create",
    ]);
    expect(rows.every((r) => r.resourcePattern === null)).toBe(true);
  });

  it("Undeclared use blocks install", async () => {
    const card = await proposeInstallCeilingCard({
      workspaceId: WS,
      invokerId: "user-alice",
      sources: [SOURCE_BOTH],
      declaredCapabilities: ["email.send"],
    });
    expect(card.blocked).toBe(true);
    expect(card.state).toBe("blocked");
    const undeclared = card.proposals?.filter((p) => p.flag === "undeclared") ?? [];
    expect(undeclared.some((p) => p.capability.startsWith("github"))).toBe(true);

    await expect(
      confirmInstallCeilingCard(WS, card.id, "user-alice"),
    ).rejects.toThrow(/undeclared/i);
  });

  it("Ceiling is coarse — confirming writes no resource patterns", async () => {
    const card = proposeInstallCeiling({
      workspaceId: WS,
      invokerId: "user-alice",
      sources: [`await tools.email.send({})`],
      declaredCapabilities: ["email.send"],
    });
    await saveInstallCard(card);
    await confirmInstallCeilingCard(WS, card.id, "user-alice");
    const store = await getRegistryStorage();
    await store.tenants.ensure(WS);
    const rows = await store.resourceGrants.list(WS);
    expect(rows).toHaveLength(1);
    expect(rows[0]!.resourcePattern).toBeNull();
  });

  it("JIT miss ends the turn; accept resumes and releases queued action", async () => {
    const runId = "agr-jit-1";
    const req: DispatchRequest = {
      principal: member(),
      tool: { namespace: "email", operation: "send", effect: "action" },
      resource: "mailto:bob@example.org",
      credential: { level: "workspace-oauth", id: "cred-1" },
      runContext: { runId, resultDependent: true },
    };

    // Resource miss → queue
    const decision = await evaluateDispatch(req, {
      invokerPatterns: ["email.send"],
      resourceGrants: [
        grantRow({
          capability: "email.send",
          resourcePattern: "mailto:alice@aprovan.com",
          credentialLevel: "workspace-oauth",
        }),
      ],
    });
    expect(decision.kind).toBe("queue");
    const queuedActionId = (decision as { queuedActionId: string }).queuedActionId;

    const card = await raiseJitCard({
      workspaceId: WS,
      invokerId: "user-alice",
      request: req,
      runId,
      turn: 0,
      queuedActionIds: [queuedActionId],
    });
    expect(card.queuedCount).toBe(1);
    expect(queuedActionsMessage(1)).toBe("queued 1 actions");

    // Seed a suspended run record for resume.
    await writeSvcRecord(
      WS,
      svcScope("agents", "runs"),
      runId,
      {
        id: runId,
        status: "awaiting_tools",
        startedAt: new Date().toISOString(),
        pendingApproval: {
          cardId: card.id,
          turn: 0,
          messages: [],
          args: { input: [] },
          allowed: ["email.send"],
        },
      },
      "user-alice",
    );

    let released = false;
    setReleaseExecutor(async () => {
      released = true;
    });

    const { card: accepted, released: releasedRows } = await acceptJitCard(
      WS,
      card.id,
      "user-alice",
      {
        rememberPattern: "mailto:bob@example.org",
        resume: async (id) => {
          await resumeNativeAgentAfterApproval(WS, id);
        },
      },
    );
    expect(accepted.state).toBe("accepted");
    expect(released).toBe(true);
    expect(releasedRows).toHaveLength(1);
    expect(releasedRows[0]!.state).toBe("released");

    const queued = await getQueuedAction(WS, queuedActionId);
    expect(queued?.state).toBe("released");

    const store = await getRegistryStorage();
    const grants = await store.resourceGrants.list(WS);
    expect(
      grants.some(
        (g) =>
          g.capability === "email.send" &&
          g.resourcePattern === "mailto:bob@example.org",
      ),
    ).toBe(true);

    const { readNativeAgentRun } = await import("../src/agents/runner.js");
    const run = await readNativeAgentRun(WS, runId);
    expect(run?.status).toBe("running");
    expect(run?.pendingApproval).toBeUndefined();
  });

  it("Workflow ask round-trips through the invoker's queue", async () => {
    const ctx: ServiceContext = {
      workspaceId: WS,
      userId: "user-alice",
    };
    let pending: AskPendingError | undefined;
    try {
      await askStep(ctx, {
        question: "Ship the release?",
        payload: { version: "1.2.0" },
        runId: "wfr-1",
      });
    } catch (err) {
      if (err instanceof AskPendingError) pending = err;
      else throw err;
    }
    expect(pending).toBeDefined();
    const card = await getCapabilityCard(WS, pending!.cardId);
    expect(card?.kind).toBe("ask");
    expect(card?.invokerId).toBe("user-alice");
    expect(card?.question).toBe("Ship the release?");
    expect(card?.state).toBe("pending");

    const answered = await answerWorkflowAsk(
      WS,
      pending!.cardId,
      "user-alice",
      { approved: true },
    );
    expect(answered.state).toBe("answered");
    expect(answered.answer).toEqual({ approved: true });
  });

  it("Always-ask fires inside a grant; workspace cannot loosen", async () => {
    await declareAppAlwaysAsk(WS, APP, ["email.send"]);
    expect(await isAlwaysAsk(WS, APP, "email.send")).toBe(true);

    // Inside a granted resource — still raise a card (always-ask).
    const req: DispatchRequest = {
      principal: member(),
      via: { appId: APP },
      tool: { namespace: "email", operation: "send", effect: "action" },
      resource: "mailto:bob@example.org",
      runContext: { runId: "agr-aa", resultDependent: true },
    };
    const decision = await evaluateDispatch(req, {
      invokerPatterns: ["email.send"],
      appCeiling: ["email.send"],
      resourceGrants: [
        grantRow({
          capability: "email.send",
          resourcePattern: "mailto:bob@example.org",
          credentialLevel: "workspace-token",
          subject: { kind: "app-install", id: APP },
        }),
      ],
    });
    expect(decision.kind).toBe("allow");
    expect(await isAlwaysAsk(WS, APP, "email.send")).toBe(true);

    const before = await (await getRegistryStorage()).resourceGrants.list(WS);
    const beforeCount = before.length;

    const card = await raiseJitCard({
      workspaceId: WS,
      invokerId: "user-alice",
      request: req,
      alwaysAsk: true,
      runId: "agr-aa",
      turn: 1,
    });
    setReleaseExecutor(async () => undefined);
    await acceptJitCard(WS, card.id, "user-alice");
    const after = await (await getRegistryStorage()).resourceGrants.list(WS);
    expect(after).toHaveLength(beforeCount); // no new standing grant

    await expect(
      setWorkspaceAlwaysAsk(WS, APP, []),
    ).rejects.toThrow(/email\.send/);

    const policy = await getAlwaysAskPolicy(WS, APP);
    expect(policy.appDeclared).toContain("email.send");

    // Workspace may add classes.
    const tightened = await setWorkspaceAlwaysAsk(WS, APP, [
      "email.send",
      "slack.post",
    ]);
    expect(tightened.workspaceAdded).toEqual(["slack.post"]);
    expect(await isAlwaysAsk(WS, APP, "slack.post")).toBe(true);
  });

  it("Agent draft creates no grant until a person confirms", async () => {
    const card = await proposeDraftInstall({
      workspaceId: WS,
      proposerId: "agent-bot",
      ownerId: "user-alice",
      originAppId: APP,
      sources: [`await tools.email.send({})`],
      declaredCapabilities: ["email.send"],
    });
    expect(card.kind).toBe("draft");
    expect(card.state).toBe("pending");
    expect(await draftHasNoGrants(WS, card.id)).toBe(true);

    const store = await getRegistryStorage();
    await store.tenants.ensure(WS);
    expect(await store.resourceGrants.list(WS)).toHaveLength(0);

    await confirmInstallCeilingCard(WS, card.id, "user-alice");
    expect(await draftHasNoGrants(WS, card.id)).toBe(false);
    const rows = await store.resourceGrants.list(WS);
    expect(rows).toHaveLength(1);
    expect(rows[0]!.capability).toBe("email.send");
    expect(rows[0]!.resourcePattern).toBeNull();
  });

  it("Capability-miss ask card persists a grant on accept (no queue)", async () => {
    // Force an enqueue so we prove capability miss path stays queue-free.
    const req: DispatchRequest = {
      principal: member(),
      tool: { namespace: "email", operation: "send", effect: "action" },
      resource: "mailto:bob@example.org",
      runContext: { runId: "agr-ask", resultDependent: true },
    };
    const decision = await evaluateDispatch(req, {
      invokerPatterns: [], // capability miss
    });
    expect(decision.kind).toBe("ask");

    const card = await raiseJitCard({
      workspaceId: WS,
      invokerId: "user-alice",
      request: req,
      cardId: (decision as { cardId: string }).cardId,
      runId: "agr-ask",
      turn: 0,
    });
    expect(card.queuedActionIds ?? []).toHaveLength(0);

    await acceptJitCard(WS, card.id, "user-alice", {
      rememberPattern: null,
    });
    const store = await getRegistryStorage();
    const rows = await store.resourceGrants.list(WS);
    expect(rows).toHaveLength(1);
    expect(rows[0]!.resourcePattern).toBeNull();
    expect(rows[0]!.capability).toBe("email.send");
  });
});
