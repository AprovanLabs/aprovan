/**
 * `document/fix-typos` agent profile (iw9-doc-markdown stream 10).
 *
 * Spec: openspec/changes/iw9-doc-markdown/specs/document-app
 *       ("Profile runs within app grants")
 *       openspec/changes/iw9-doc-markdown/specs/document-agent-reconciliation
 *       ("Write to a doc without a live session is ordinary")
 * Gate 10.0: CF-5 (`resolveAppProfile` / app.yaml `agents:`) already on main.
 */

import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import {
  FIX_TYPOS_AGENT,
  FIX_TYPOS_PROFILE_NAME,
  FIX_TYPOS_PROMPT,
  FIX_TYPOS_TOOLS,
} from "../../../Apps/document/agents/fix-typos.js";
import { mintAppId } from "../src/apps/identity.js";
import { loadAppYaml, type AppYaml } from "../src/apps/manifest.js";
import { saveApp, type AppManifest } from "../src/apps/store.js";
import { agentsService } from "../src/agents/service.js";
import { docKey, getOrLoadDoc, hasLiveDoc, releaseDoc } from "../src/doc/registry.js";
import { getFsStore, resetFsStore } from "../src/fs-store.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import { putMembership } from "../src/memberships.js";
import { resetRecordStore } from "../src/records.js";
import { resetWorkspaceConfig } from "../src/runtime/config.js";
import type { ServiceContext } from "../src/service-kernel.js";
import { createApp } from "../src/app.js";
import { deleteSvcRecord, deleteSvcScope, svcScope } from "../src/svc-records.js";

const APP_YAML_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../Apps/document/app.yaml",
);

let dataDir: string;

/** Match agent-app-profiles / agents.run fixtures — profiles bind on `local`. */
const WS = "local";
const ALICE = "alice";

const BASE = [
  "# Title",
  "",
  "Paragraph one.",
  "",
  "Paragraph two with a typo.",
  "",
  "Paragraph three.",
  "",
  "Paragraph four.",
  "",
  "Paragraph five.",
  "",
].join("\n");

const FIXED = [
  "# Title",
  "",
  "Paragraph one.",
  "",
  "Paragraph two with a fix.",
  "",
  "Paragraph three.",
  "",
  "Paragraph four.",
  "",
  "Paragraph five.",
  "",
].join("\n");

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-doc-fix-typos-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
  delete process.env["STORE_BACKEND"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  resetWorkspaceConfig();
  resetFsStore();
  resetRecordStore();
  rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  resetExecutor();
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T; error?: string };
  if (!res.ok) throw new Error(body.error ?? `HTTP ${res.status}`);
  return body.data;
}

const saveCredential = (provider: string, token: string) =>
  createApp().request("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider,
      payload: { type: "bearer_token", token },
    }),
  });

interface ChatTurn {
  content?: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
}

function scriptLlm(turns: ChatTurn[]): IsolateExecuteOptions[] {
  const calls: IsolateExecuteOptions[] = [];
  let i = 0;
  setExecutor({
    async execute(options): Promise<IsolateResult> {
      calls.push(options);
      if (options.operation === "createChatCompletion") {
        const turn = turns[i++] ?? { content: "{}" };
        return {
          success: true,
          data: {
            choices: [{ message: { role: "assistant", ...turn } }],
            usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
          },
          durationMs: 1,
        };
      }
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
  return calls;
}

function normalizeWs(s: string): string {
  return s.replace(/\s+/gu, " ").trim();
}

function documentDeclared(): AppYaml {
  const result = loadAppYaml(readFileSync(APP_YAML_PATH, "utf8"));
  if (!result.ok) {
    throw new Error(result.issues.map((i) => i.message).join("; "));
  }
  return result.value;
}

/** One Document install per suite — `saveApp` aliases slug `document` uniquely. */
let documentApp: AppManifest;

function buildDocumentApp(allowedTools?: string[]): AppManifest {
  const declared = documentDeclared();
  const appId = mintAppId();
  const now = new Date().toISOString();
  return {
    appId,
    name: "document",
    slug: "document",
    root: "apps/document",
    entry: "apps/document/index.tsx",
    paths: ["apps/document"],
    declared,
    allowedTools: allowedTools ?? declared.capabilities ?? [],
    createdBy: ALICE,
    createdAt: now,
    updatedAt: now,
  };
}

function appCtx(
  app: AppManifest,
  userId: string,
  extra?: Partial<ServiceContext>,
): ServiceContext {
  return {
    workspaceId: WS,
    userId,
    appScope: {
      id: app.appId,
      name: app.name,
      root: app.root,
      paths: app.paths,
      userId,
      role: "user",
    },
    ...extra,
  };
}

function readWriteTurns(path: string, content: string): ChatTurn[] {
  return [
    {
      tool_calls: [
        {
          id: "c1",
          type: "function",
          function: {
            name: "call_tool",
            arguments: JSON.stringify({
              namespace: "vfs",
              operation: "read",
              args: { path },
            }),
          },
        },
      ],
    },
    {
      tool_calls: [
        {
          id: "c2",
          type: "function",
          function: {
            name: "call_tool",
            arguments: JSON.stringify({
              namespace: "vfs",
              operation: "write",
              args: { path, content },
            }),
          },
        },
      ],
    },
    { content: "Fixed typos." },
  ];
}

beforeEach(async () => {
  await putMembership({ workspaceId: WS, userId: ALICE, role: "admin" });
  expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
  await data(
    await manage("profiles/set", {
      namespace: "llm",
      name: "fast",
      provider: "anthropic",
      options: { model: "model-fast", tier: "fast", costPerMTokUsd: 1 },
    }),
  );
  if (!documentApp) {
    documentApp = buildDocumentApp();
    await saveApp(WS, documentApp);
  }
});

describe("10.0 CF-5 gate + app.yaml declaration", () => {
  it("app.yaml accepts agents: and declares document/fix-typos inside the ceiling", () => {
    const declared = documentDeclared();
    expect(declared.agents).toHaveLength(1);
    const agent = declared.agents![0]!;
    expect(agent.name).toBe(FIX_TYPOS_PROFILE_NAME);
    expect(agent.tools).toEqual([...FIX_TYPOS_TOOLS]);
    expect(normalizeWs(agent.prompt ?? "")).toBe(normalizeWs(FIX_TYPOS_PROMPT));
    for (const pattern of agent.tools) {
      expect(pattern.startsWith("vfs.")).toBe(true);
    }
    // Ceiling covers declared tools (invariant 2 — no widen).
    expect(declared.capabilities).toEqual(
      expect.arrayContaining(["vfs.*", "sessions.*", "agents.run"]),
    );
  });

  it("ctx.appScope run of the manifest profile is not 403'd (CF-5)", async () => {
    scriptLlm([{ content: "noop" }]);
    const run = (await agentsService.call(appCtx(documentApp, ALICE), "run", {
      agent: FIX_TYPOS_AGENT,
      input: "ping",
    })) as { status: string; agent?: string; error?: { message?: string } };

    expect(run.status).toBe("succeeded");
    expect(run.agent).toBe(FIX_TYPOS_AGENT);
  });
});

describe("Profile runs within app grants — live reconcile merge", () => {
  /** Relative path the app session passes to vfs.* (resolved under apps/document/). */
  let REL: string;
  /** Absolute workspace path after resolveAppPath — live-doc identity. */
  let ABS: string;

  beforeEach(() => {
    REL = `notes/doc-${crypto.randomUUID()}.md`;
    ABS = `apps/document/${REL}`;
  });

  afterEach(async () => {
    if (hasLiveDoc(WS, ABS)) await releaseDoc(docKey(WS, ABS));
    const key = docKey(WS, ABS);
    await deleteSvcRecord(WS, svcScope("doc", "snapshot"), key);
    await deleteSvcScope(WS, svcScope("doc", "updates", key));
  });

  it("agents.run vfs.write merges with concurrent human typing elsewhere", async () => {
    await getFsStore().write(WS, ABS, BASE);
    const live = await getOrLoadDoc(WS, ABS);
    expect(live.doc.getText("content").toString()).toBe(BASE);

    // Human types in paragraph 5 while the agent fixes paragraph 2.
    live.doc.transact(() => {
      const ytext = live.doc.getText("content");
      const current = ytext.toString();
      const needle = "Paragraph five.";
      const idx = current.indexOf(needle);
      expect(idx).toBeGreaterThan(-1);
      ytext.insert(idx + needle.length, " Human addition.");
    }, "human");

    const withHuman = live.doc.getText("content").toString();
    expect(withHuman).toContain("Human addition.");
    expect(withHuman).toContain("typo");

    scriptLlm(readWriteTurns(REL, FIXED));

    const run = (await agentsService.call(appCtx(documentApp, ALICE), "run", {
      agent: FIX_TYPOS_AGENT,
      input: `Fix typos in ${REL}`,
    })) as {
      status: string;
      agent?: string;
      stopReason?: string;
      error?: { message?: string };
      turns?: Array<{ toolCalls?: Array<{ name?: string; result?: string }> }>;
      meta?: { agent?: string; app?: { appId: string; slug: string } };
    };

    if (run.status !== "succeeded") {
      expect.fail(
        `expected succeeded, got ${run.status} stopReason=${run.stopReason} error=${run.error?.message}`,
      );
    }
    expect(run.agent).toBe(FIX_TYPOS_AGENT);
    expect(run.meta?.app).toEqual({ appId: documentApp.appId, slug: "document" });

    const writeTurn = run.turns?.flatMap((t) => t.toolCalls ?? []).find((c) => c.name === "vfs.write");
    expect(writeTurn?.result).toBeDefined();
    const writeResult = JSON.parse(writeTurn!.result!) as {
      reconciled?: boolean;
      appliedBlocks?: number;
      conflict?: boolean;
      path?: string;
    };
    expect(writeResult.path).toBe(ABS);
    expect(writeResult.reconciled).toBe(true);
    expect(writeResult.conflict).toBeUndefined();
    expect(writeResult.appliedBlocks).toBeGreaterThanOrEqual(1);

    const merged = live.doc.getText("content").toString();
    expect(merged).toContain("Paragraph two with a fix.");
    expect(merged).not.toContain("typo");
    expect(merged).toContain("Human addition.");
  });
});

describe("Write without a live session is ordinary", () => {
  let REL: string;
  let ABS: string;

  beforeEach(() => {
    REL = `notes/doc-${crypto.randomUUID()}.md`;
    ABS = `apps/document/${REL}`;
  });

  it("agents.run vfs.write falls through to store.write when no live doc", async () => {
    await getFsStore().write(WS, ABS, BASE);
    expect(hasLiveDoc(WS, ABS)).toBe(false);

    scriptLlm(readWriteTurns(REL, FIXED));

    const run = (await agentsService.call(appCtx(documentApp, ALICE), "run", {
      agent: FIX_TYPOS_AGENT,
      input: `Fix typos in ${REL}`,
    })) as {
      status: string;
      stopReason?: string;
      error?: { message?: string };
      turns?: Array<{ toolCalls?: Array<{ name?: string; result?: string }> }>;
    };

    if (run.status !== "succeeded") {
      expect.fail(
        `expected succeeded, got ${run.status} stopReason=${run.stopReason} error=${run.error?.message}`,
      );
    }

    expect(hasLiveDoc(WS, ABS)).toBe(false);

    const writeTurn = run.turns?.flatMap((t) => t.toolCalls ?? []).find((c) => c.name === "vfs.write");
    expect(writeTurn?.result).toBeDefined();
    const writeResult = JSON.parse(writeTurn!.result!) as {
      path?: string;
      reconciled?: boolean;
      hash?: string;
    };
    // Ordinary store.write returns path/hash metadata — no reconcile fields.
    expect(writeResult.reconciled).toBeUndefined();
    expect(writeResult.path).toBe(ABS);

    const file = await getFsStore().read(WS, ABS);
    expect(file?.content).toBe(FIXED);
  });
});
