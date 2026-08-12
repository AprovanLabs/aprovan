/**
 * `chat/summarize` agent profile (iw9-chat-flagship stream 5).
 *
 * Spec: openspec/changes/iw9-chat-flagship/specs/chat-summarize-agent.
 * Gate 5.1: CF-5 (`resolveAppProfile` / app.yaml `agents:`) already on main.
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
  SUMMARIZE_AGENT,
  SUMMARIZE_PROFILE_NAME,
  SUMMARIZE_PROMPT,
  SUMMARIZE_TOOLS,
  postSummaryMessage,
  readMessagesForSummarize,
} from "../../../Apps/chat/agents/summarize.js";
import { mintAppId } from "../src/apps/identity.js";
import { loadAppYaml, type AppYaml } from "../src/apps/manifest.js";
import { saveApp, type AppManifest } from "../src/apps/store.js";
import {
  createChannel,
  postMessage,
  type ChatScope,
} from "../src/apps/chat/service.js";
import {
  createInstance,
  type HostingMode,
} from "../src/apps/instances.js";
import { agentsService } from "../src/agents/service.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import { putMembership } from "../src/memberships.js";
import { ServiceError, type ServiceContext } from "../src/service-kernel.js";
import { createApp } from "../src/app.js";
import { svcScope, writeSvcRecord } from "../src/svc-records.js";

const APP_YAML_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../Apps/chat/app.yaml",
);

let dataDir: string;

/** Match agent-app-profiles / agents.run fixtures — profiles bind on `local`. */
const WS = "local";
const INSTALL = "01CHATSUMINSTALL00000000000";
const ALICE = "alice";
const GUEST = "guest-summarize";

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-chat-summarize-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
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

function chatDeclared(): AppYaml {
  const result = loadAppYaml(readFileSync(APP_YAML_PATH, "utf8"));
  if (!result.ok) {
    throw new Error(result.issues.map((i) => i.message).join("; "));
  }
  return result.value;
}

/** One Chat install per suite — `saveApp` aliases slug `chat` uniquely. */
let chatApp: AppManifest;

function buildChatApp(allowedTools?: string[]): AppManifest {
  const declared = chatDeclared();
  const appId = mintAppId();
  const now = new Date().toISOString();
  return {
    appId,
    name: "chat",
    slug: "chat",
    root: "apps/chat",
    entry: "apps/chat/index.tsx",
    paths: ["apps/chat"],
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

async function seedInstall(installId: string, hosting: HostingMode): Promise<void> {
  await writeSvcRecord(WS, svcScope("installs"), installId, {
    installId,
    originAppId: "01ORIGINCHATSUM0000000000000",
    originWorkspaceId: WS,
    pin: { channel: "latest" },
    resolvedRelease: null,
    bindings: {},
    config: {},
    editing: false,
    installedBy: ALICE,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    hosting,
  });
}

async function seedHostedWithGuest(): Promise<{
  instanceId: string;
  alice: ChatScope;
  guest: ChatScope;
}> {
  await seedInstall(INSTALL, "hosted");
  const instance = await createInstance({
    workspaceId: WS,
    appId: INSTALL,
    createdBy: ALICE,
    participants: [ALICE, GUEST],
  });
  const base = {
    workspaceId: WS,
    installId: INSTALL,
    instanceId: instance.instanceId,
  };
  return {
    instanceId: instance.instanceId,
    alice: { ...base, userId: ALICE },
    guest: { ...base, userId: GUEST },
  };
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
  if (!chatApp) {
    chatApp = buildChatApp();
    await saveApp(WS, chatApp);
  }
});

describe("5.1 CF-5 gate + app.yaml declaration", () => {
  it("app.yaml accepts agents: and declares chat/summarize inside the ceiling", () => {
    const declared = chatDeclared();
    expect(declared.agents).toHaveLength(1);
    const agent = declared.agents![0]!;
    expect(agent.name).toBe(SUMMARIZE_PROFILE_NAME);
    expect(agent.tools).toEqual([...SUMMARIZE_TOOLS]);
    expect(normalizeWs(agent.prompt ?? "")).toBe(normalizeWs(SUMMARIZE_PROMPT));
    for (const pattern of agent.tools) {
      expect(pattern.startsWith("records.")).toBe(true);
    }
  });
});

describe("Summarize respects the invoker's channel access", () => {
  it("guest run reads only the invoked public channel; restricted id absent from tool trace", async () => {
    const { alice, guest } = await seedHostedWithGuest();
    const publicCh = await createChannel(alice, { name: "lobby", kind: "public" });
    const restricted = await createChannel(alice, {
      name: "owners",
      kind: "restricted",
      members: [ALICE],
    });
    await postMessage(alice, { channelId: publicCh.id, body: "hello guest-visible" });
    await postMessage(alice, { channelId: restricted.id, body: "secret owners only" });

    // canReadChannel-gated helper: public ok, restricted deny-as-404.
    const readable = await readMessagesForSummarize(guest, publicCh.id, { limit: 10 });
    expect(readable.map((m) => m.body)).toEqual(["hello guest-visible"]);
    await expect(
      readMessagesForSummarize(guest, restricted.id, { limit: 10 }),
    ).rejects.toMatchObject({ status: 404 } satisfies Partial<ServiceError>);

    // Script a records.list against the public channel only — restricted must
    // never appear in the tool-call trace (invoker-scoped prompt + host path).
    scriptLlm([
      {
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "records",
                operation: "list",
                args: { prefix: `msg#${publicCh.id}#` },
              }),
            },
          },
        ],
      },
      { content: "Guest-visible: hello guest-visible" },
    ]);

    const run = (await agentsService.call(appCtx(chatApp, GUEST), "run", {
      agent: SUMMARIZE_AGENT,
      input: `Summarize channel ${publicCh.id}`,
    })) as {
      id: string;
      status: string;
      agent?: string;
      output?: string;
      error?: { message?: string };
      stopReason?: string;
      turns?: Array<{ toolCalls?: Array<{ arguments?: unknown }> }>;
      events?: Array<{ type: string; [k: string]: unknown }>;
      meta?: { agent?: string; app?: { appId: string; slug: string } };
    };

    if (run.status !== "succeeded") {
      expect.fail(
        `expected succeeded, got ${run.status} stopReason=${run.stopReason} error=${run.error?.message}`,
      );
    }
    expect(run.agent).toBe(SUMMARIZE_AGENT);
    expect(run.output).toContain("hello guest-visible");

    const trace = JSON.stringify({
      turns: run.turns,
      events: run.events,
      output: run.output,
    });
    expect(trace).toContain(publicCh.id);
    expect(trace).not.toContain(restricted.id);
  });
});

describe("Out-of-grant tool call fails closed", () => {
  it("denies a namespace outside Chat's granted ceiling (tool_denied)", async () => {
    scriptLlm([
      {
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "vfs",
                operation: "write",
                args: { path: "x", content: "y" },
              }),
            },
          },
        ],
      },
    ]);

    const run = (await agentsService.call(
      appCtx(chatApp, GUEST, {
        // Invoker grants omit vfs — intersection must not widen.
        grants: { tools: ["records.*", "agents.run"] },
      }),
      "run",
      { agent: SUMMARIZE_AGENT, input: "try vfs" },
    )) as { status: string; stopReason: string };

    expect(run.stopReason).toBe("tool_denied");
    expect(run.status).toBe("failed");
  });
});

describe("Invoker is billed and attributed", () => {
  it("run record names the invoker via app profile provenance (D22 / D15)", async () => {
    scriptLlm([{ content: "ok" }]);

    const run = (await agentsService.call(appCtx(chatApp, GUEST), "run", {
      agent: SUMMARIZE_AGENT,
      input: "summarize",
    })) as {
      status: string;
      agent?: string;
      meta?: { agent?: string; app?: { appId: string; slug: string } };
    };

    expect(run.status).toBe("succeeded");
    expect(run.agent).toBe(SUMMARIZE_AGENT);
    // Via-path is the app profile; principal/payer is the ServiceContext userId
    // (GUEST) threaded by iw9-d's agents.run — no Chat-local billing.
    expect(run.meta?.agent).toBe(SUMMARIZE_AGENT);
    expect(run.meta?.app).toEqual({ appId: chatApp.appId, slug: "chat" });

    const got = (await agentsService.call(appCtx(chatApp, GUEST), "get", {
      name: SUMMARIZE_AGENT,
    })) as { agent: { name: string; app?: { appId: string; slug: string } } };
    expect(got.agent.name).toBe(SUMMARIZE_AGENT);
    expect(got.agent.app).toEqual({ appId: chatApp.appId, slug: "chat" });
  });
});

describe("Summary lands in the thread", () => {
  it("posts through postMessage with the agent marker", async () => {
    const { alice, guest } = await seedHostedWithGuest();
    const channel = await createChannel(alice, { name: "general", kind: "public" });
    const root = await postMessage(alice, { channelId: channel.id, body: "root topic" });
    await postMessage(guest, {
      channelId: channel.id,
      body: "guest reply",
      parentId: root.id,
    });

    const summary = await postSummaryMessage(guest, {
      channelId: channel.id,
      parentId: root.id,
      invoker: GUEST,
      body: "Summary · chat/summarize — guest reply on root topic",
    });

    expect(summary.parentId).toBe(root.id);
    expect(summary.author).toBe(GUEST);
    expect(summary.agent).toEqual({
      profile: SUMMARIZE_AGENT,
      invoker: GUEST,
    });

    const window = await readMessagesForSummarize(guest, channel.id, {
      parentId: root.id,
      limit: 20,
    });
    expect(window.some((m) => m.id === summary.id && m.agent?.profile === SUMMARIZE_AGENT)).toBe(
      true,
    );
  });
});
