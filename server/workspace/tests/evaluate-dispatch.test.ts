/**
 * IW-9 C stream 8 — evaluateDispatch decision matrix + multi-path chokepoint.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { ResourceGrantRow } from "@aprovan/registry-server";
import {
  evaluateDispatch,
  type DispatchDecision,
  type DispatchRequest,
} from "../src/grants.js";
import type { Principal } from "../src/middleware/auth.js";
import { getPermissionStore, resetPermissionStore } from "../src/permissions.js";
import { getRegistryStorage, resetRegistryStorage } from "../src/registry-storage.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-evaluate-dispatch-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["STORE_BACKEND"] = "sqlite";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["STORE_BACKEND"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRegistryStorage();
  resetPermissionStore();
});

const member = (overrides: Partial<Principal> = {}): Principal => ({
  sub: "user-alice",
  workspaceId: "ws-eval",
  role: "member",
  groupIds: [],
  ...overrides,
});

const admin = (): Principal => member({ sub: "user-admin", role: "admin" });

function grantRow(
  partial: Pick<ResourceGrantRow, "capability" | "resourcePattern" | "credentialLevel"> & {
    subject?: ResourceGrantRow["subject"];
  },
): ResourceGrantRow {
  return {
    id: `rg-${Math.random().toString(36).slice(2, 10)}`,
    tenantId: "ws-eval",
    subject: partial.subject ?? { kind: "user", id: "user-alice" },
    capability: partial.capability,
    resourcePattern: partial.resourcePattern,
    credentialLevel: partial.credentialLevel,
    grantedBy: "user-admin",
    createdAt: new Date().toISOString(),
  };
}

function req(
  tool: DispatchRequest["tool"],
  extra: Partial<DispatchRequest> = {},
): DispatchRequest {
  return {
    principal: member(),
    tool,
    ...extra,
  };
}

describe("evaluateDispatch (IW-9 C stream 8)", () => {
  it("Action within granted resource → allow (no card/queue)", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "email", operation: "send", effect: "action" },
        { resource: "mailto:alice@aprovan.com" },
      ),
      {
        invokerPatterns: ["email.send"],
        resourceGrants: [
          grantRow({
            capability: "email.send",
            // Exact match — published matcher treats `*` as a whole segment,
            // so `mailto:*@aprovan.com` is not a local-part glob.
            resourcePattern: "mailto:alice@aprovan.com",
            credentialLevel: "workspace-oauth",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "allow" });
  });

  it("Action outside granted resource → queue (not deny)", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "email", operation: "send", effect: "action" },
        { resource: "mailto:bob@example.org" },
      ),
      {
        invokerPatterns: ["email.send"],
        resourceGrants: [
          grantRow({
            capability: "email.send",
            resourcePattern: "mailto:alice@aprovan.com",
            credentialLevel: "workspace-oauth",
          }),
        ],
      },
    );
    expect(decision.kind).toBe("queue");
    expect((decision as { queuedActionId: string }).queuedActionId).toBeTruthy();
  });

  it("App cannot exceed invoker → deny", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "email", operation: "send", effect: "action" },
        { via: { appId: "app-1" }, resource: "mailto:alice@aprovan.com" },
      ),
      {
        invokerPatterns: [],
        appCeiling: ["email.send"],
        resourceGrants: [
          grantRow({
            capability: "email.send",
            resourcePattern: null,
            credentialLevel: "workspace-token",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "deny", reason: "capability" });
  });

  it("Invoker cannot exceed app → deny", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "email", operation: "send", effect: "action" },
        { via: { appId: "app-1" }, resource: "mailto:anyone@x.com" },
      ),
      {
        invokerPatterns: ["email.send"],
        appCeiling: ["github.repos.get"],
        resourceGrants: [
          grantRow({
            capability: "email.send",
            resourcePattern: null,
            credentialLevel: "workspace-token",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "deny", reason: "capability" });
  });

  it("Hidden namespace unreachable from every path (same deny)", async () => {
    const hidden = {
      namespace: "secretns",
      operation: "exfiltrate",
      effect: "action" as const,
    };
    const options = {
      invokerPatterns: ["keyvalue.*", "github.*"],
      resourceGrants: [] as ResourceGrantRow[],
    };

    // Three entry points against the same predicate (HTTP / agent / app).
    const httpDecision = await evaluateDispatch(req(hidden), options);
    const agentDecision = await evaluateDispatch(
      { ...req(hidden), runContext: { runId: "run-1", resultDependent: true } },
      { ...options, runTools: ["keyvalue.*", "github.*"] },
    );
    const appDecision = await evaluateDispatch(
      { ...req(hidden), via: { appId: "app-hidden" } },
      { ...options, appCeiling: ["keyvalue.get"] },
    );

    expect(httpDecision).toEqual({ kind: "deny", reason: "capability" });
    expect(appDecision).toEqual({ kind: "deny", reason: "capability" });
    // Agent capability miss → ask (JIT card; stream 10), still non-allow.
    expect(agentDecision.kind).toBe("ask");
  });

  it("Admin is not exempt from resource grants for apps", async () => {
    const decision = await evaluateDispatch(
      {
        principal: admin(),
        via: { appId: "app-admin" },
        tool: { namespace: "email", operation: "send", effect: "action" },
        resource: "mailto:bob@example.org",
      },
      {
        invokerPatterns: ["*"],
        appCeiling: ["email.send"],
        resourceGrants: [
          grantRow({
            subject: { kind: "app-install", id: "app-admin" },
            capability: "email.send",
            resourcePattern: "mailto:alice@aprovan.com",
            credentialLevel: "workspace-oauth",
          }),
        ],
      },
    );
    expect(decision.kind).toBe("queue");
  });

  it("Workspace credential, member invokes → allow", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "slack", operation: "post", effect: "action" },
        {
          resource: "https://aprovan.slack.com/archives/C123",
          credential: { level: "workspace-oauth", id: "cred-slack" },
          via: { appId: "app-slack" },
        },
      ),
      {
        invokerPatterns: ["slack.post"],
        appCeiling: ["slack.post"],
        resourceGrants: [
          grantRow({
            capability: "slack.post",
            resourcePattern: "https://aprovan.slack.com/**",
            credentialLevel: "workspace-oauth",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "allow" });
  });

  it("User credential, first use (unconnected) → deny credential-unconnected", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "gmail", operation: "send", effect: "action" },
        {
          resource: "mailto:x@y.com",
          credential: { level: "user-oauth", id: "" },
        },
      ),
      {
        invokerPatterns: ["gmail.send"],
        resourceGrants: [
          grantRow({
            capability: "gmail.send",
            resourcePattern: null,
            credentialLevel: "user-oauth",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "deny", reason: "credential-unconnected" });
  });

  it("Legacy grant still works (keyvalue.* via permission row)", async () => {
    const store = await getRegistryStorage();
    await store.tenants.ensure("ws-eval");
    await getPermissionStore().grant("ws-eval", {
      callerId: "user-alice",
      provider: "keyvalue",
      operation: "*",
      grantedBy: "user-admin",
    });

    const decision = await evaluateDispatch(
      req({ namespace: "keyvalue", operation: "set", effect: "action" }),
    );
    expect(decision).toEqual({ kind: "allow" });
  });

  it("Observation inside a granted namespace skips resource checks", async () => {
    const decision = await evaluateDispatch(
      req(
        { namespace: "github", operation: "repos.get", effect: "observation" },
        { resource: "https://github.com/evil/x" },
      ),
      {
        invokerPatterns: ["github.*"],
        resourceGrants: [
          grantRow({
            capability: "github.repos.get",
            resourcePattern: "https://github.com/aprovan/**",
            credentialLevel: "workspace-token",
          }),
        ],
      },
    );
    expect(decision).toEqual({ kind: "allow" });
  });
});

describe("decision matrix helpers", () => {
  it("queue and ask carry ids", async () => {
    const queue = await evaluateDispatch(
      req(
        { namespace: "email", operation: "send", effect: "action" },
        { resource: "mailto:other@x.com" },
      ),
      {
        invokerPatterns: ["email.*"],
        resourceGrants: [
          grantRow({
            capability: "email.send",
            resourcePattern: "mailto:alice@aprovan.com",
            credentialLevel: "workspace-token",
          }),
        ],
      },
    );
    const ask = await evaluateDispatch(
      {
        ...req({ namespace: "hidden", operation: "x", effect: "action" }),
        runContext: { runId: "r", resultDependent: true },
      },
      { invokerPatterns: ["other.*"] },
    );
    expect(queue.kind).toBe("queue");
    expect(ask.kind).toBe("ask");
    const kinds: DispatchDecision["kind"][] = [queue.kind, ask.kind];
    expect(kinds).toEqual(["queue", "ask"]);
  });
});
