/**
 * App-scoped agent profiles (iw9-d stream 10 / CF-5).
 * Spec: openspec/changes/iw9-d-agent-loop-server/specs/app-scoped-agent-profiles.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { mintAppId } from "../src/apps/identity.js";
import { loadAppYaml, type AppYaml } from "../src/apps/manifest.js";
import { saveApp, type AppManifest } from "../src/apps/store.js";
import { agentsService } from "../src/agents/service.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import { ServiceError, type ServiceContext } from "../src/service-kernel.js";
import { createApp } from "../src/app.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-app-profiles-"));
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

function yaml(raw: string): AppYaml {
  const result = loadAppYaml(raw);
  if (!result.ok) throw new Error(result.issues.map((i) => i.message).join("; "));
  return result.value;
}

function appWithDeclared(args: {
  name: string;
  root: string;
  declared: AppYaml;
  allowedTools?: string[];
}): AppManifest {
  const appId = mintAppId();
  const now = new Date().toISOString();
  return {
    appId,
    name: args.name,
    slug: args.name,
    root: args.root,
    entry: `${args.root}/index.tsx`,
    paths: [args.root],
    declared: args.declared,
    allowedTools: args.allowedTools ?? args.declared.capabilities ?? [],
    createdBy: "owner",
    createdAt: now,
    updatedAt: now,
  };
}

function appCtx(
  workspaceId: string,
  app: AppManifest,
  extra?: Partial<ServiceContext>,
): ServiceContext {
  return {
    workspaceId,
    userId: "invoker",
    appScope: {
      id: app.appId,
      name: app.name,
      root: app.root,
      paths: app.paths,
      userId: "invoker",
      role: "user",
    },
    ...extra,
  };
}

beforeEach(async () => {
  expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
  // Named llm profiles live in the unified profile store (not interfaces.bind).
  await data(
    await manage("profiles/set", {
      namespace: "llm",
      name: "fast",
      provider: "anthropic",
      options: { model: "model-fast", tier: "fast", costPerMTokUsd: 1 },
    }),
  );
});

describe("Declaration cannot exceed the app ceiling", () => {
  it("rejects agents[].tools outside capabilities at parse time", () => {
    const result = loadAppYaml(`
capabilities:
  - chat.messages.*
agents:
  - name: summarize
    tools:
      - chat.messages.*
      - vfs.write
`);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    const issue = result.issues.find((i) => i.message.includes("vfs.write"));
    expect(issue).toBeDefined();
    expect(issue!.message).toContain("vfs.write");
    expect(issue!.message).toContain("chat.messages.*");
    expect(issue!.path).toMatch(/agents/);
  });

  it("accepts agents whose tools narrow the capability ceiling", () => {
    const result = loadAppYaml(`
capabilities:
  - chat.*
agents:
  - name: summarize
    description: Summarize a channel
    prompt: Be brief.
    llm:
      interface: llm
      profile: fast
    tools:
      - chat.messages.read
`);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.agents).toHaveLength(1);
    expect(result.value.agents![0]!.name).toBe("summarize");
  });
});

describe("App sessions may run manifest-declared profiles only", () => {
  it("Declared app profile runs", async () => {
    const ws = "local";
    const declared = yaml(`
capabilities:
  - keyvalue.*
  - llm.*
agents:
  - name: summarize
    prompt: Summarize.
    llm:
      interface: llm
      profile: fast
    tools:
      - keyvalue.get
`);
    const app = appWithDeclared({
      name: "chat",
      root: "apps/chat",
      declared,
      allowedTools: ["keyvalue.*", "llm.*"],
    });
    await saveApp(ws, app);

    scriptLlm([{ content: "done summarizing" }]);

    const run = (await agentsService.call(appCtx(ws, app), "run", {
      agent: "chat/summarize",
      input: "summarize please",
    })) as {
      id: string;
      status: string;
      agent?: string;
      meta?: { agent?: string; app?: { appId: string; slug: string } };
    };

    expect(run.status).toBe("succeeded");
    expect(run.agent).toBe("chat/summarize");
    expect(run.meta?.app).toEqual({ appId: app.appId, slug: "chat" });
  });

  it("Arbitrary workspace profile is refused", async () => {
    const ws = "local";
    const declared = yaml(`
capabilities:
  - keyvalue.*
agents:
  - name: summarize
    tools:
      - keyvalue.get
`);
    const app = appWithDeclared({ name: "chat-refuse", root: "apps/chat-refuse", declared });
    await saveApp(ws, app);

    await agentsService.call(
      { workspaceId: ws, userId: "owner" },
      "create",
      {
        name: "workspace-bot-refuse",
        llm: { interface: "llm", profile: "fast" },
        grants: { tools: ["keyvalue.*"] },
      },
    );

    await expect(
      agentsService.call(appCtx(ws, app), "run", {
        agent: "workspace-bot-refuse",
        input: "nope",
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: "Apps cannot manage or run agent profiles",
    } satisfies Partial<ServiceError>);

    await expect(
      agentsService.call(appCtx(ws, app), "run", {
        agent: "other/summarize",
        input: "nope",
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: "Apps cannot manage or run agent profiles",
    } satisfies Partial<ServiceError>);
  });

  it("Removed declaration stops resolving", async () => {
    const ws = "local";
    const withAgent = yaml(`
capabilities:
  - keyvalue.*
agents:
  - name: summarize
    tools:
      - keyvalue.get
`);
    const app = appWithDeclared({
      name: "chat-removed",
      root: "apps/chat-removed",
      declared: withAgent,
    });
    await saveApp(ws, app);

    // Drop the declaration from the last-reconciled snapshot.
    await saveApp(ws, {
      ...app,
      declared: yaml("capabilities:\n  - keyvalue.*\n"),
    });

    await expect(
      agentsService.call(appCtx(ws, app), "run", {
        agent: "chat-removed/summarize",
        input: "gone",
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: "Apps cannot manage or run agent profiles",
    } satisfies Partial<ServiceError>);
  });
});

describe("Apps never provision profiles", () => {
  it("Create and update stay refused", async () => {
    const ws = "local";
    const declared = yaml(`
capabilities:
  - keyvalue.*
agents:
  - name: summarize
    tools:
      - keyvalue.get
`);
    const app = appWithDeclared({
      name: "chat-provision",
      root: "apps/chat-provision",
      declared,
    });
    await saveApp(ws, app);
    const ctx = appCtx(ws, app);

    await expect(
      agentsService.call(ctx, "create", {
        name: "minted",
        grants: { tools: ["*"] },
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: "Apps cannot manage or run agent profiles",
    } satisfies Partial<ServiceError>);

    await expect(
      agentsService.call(ctx, "update", {
        name: "summarize",
        prompt: "hijack",
      }),
    ).rejects.toMatchObject({
      status: 403,
      message: "Apps cannot manage or run agent profiles",
    } satisfies Partial<ServiceError>);

    await expect(
      agentsService.call(ctx, "delete", { name: "summarize" }),
    ).rejects.toMatchObject({
      status: 403,
      message: "Apps cannot manage or run agent profiles",
    } satisfies Partial<ServiceError>);
  });

  it("Reads remain permitted", async () => {
    const ws = "local";
    const declared = yaml(`
capabilities:
  - keyvalue.*
agents:
  - name: summarize
    description: Channel summary
    tools:
      - keyvalue.get
`);
    const app = appWithDeclared({
      name: "chat-reads",
      root: "apps/chat-reads",
      declared,
    });
    await saveApp(ws, app);

    await agentsService.call(
      { workspaceId: ws, userId: "owner" },
      "create",
      {
        name: "workspace-bot-reads",
        llm: { interface: "llm", profile: "fast" },
        grants: { tools: ["keyvalue.*"] },
      },
    );

    const ctx = appCtx(ws, app);
    const listed = (await agentsService.call(ctx, "list", {})) as {
      agents: Array<{ name: string; app?: unknown }>;
    };
    expect(listed.agents.some((a) => a.name === "workspace-bot-reads")).toBe(true);
    expect(listed.agents.find((a) => a.name === "workspace-bot-reads")?.app).toBeUndefined();

    const got = (await agentsService.call(ctx, "get", { name: "chat-reads/summarize" })) as {
      agent: { name: string; app?: { appId: string; slug: string }; title?: string };
    };
    expect(got.agent.name).toBe("chat-reads/summarize");
    expect(got.agent.app).toEqual({ appId: app.appId, slug: "chat-reads" });
    expect(got.agent.title).toBe("Channel summary");

    const runs = (await agentsService.call(ctx, "runs", {})) as { runs: unknown[] };
    expect(Array.isArray(runs.runs)).toBe(true);
  });
});

describe("Authority is the intersection, derived at run time", () => {
  it("Declaration does not widen authority — out-of-grant call denied at dispatch", async () => {
    const ws = "local";
    const declared = yaml(`
capabilities:
  - keyvalue.*
  - vfs.*
agents:
  - name: summarize
    prompt: Work.
    llm:
      interface: llm
      profile: fast
    tools:
      - keyvalue.*
      - vfs.write
`);
    const app = appWithDeclared({
      name: "chat-intersect",
      root: "apps/chat-intersect",
      declared,
      // App is granted both; invoker is not.
      allowedTools: ["keyvalue.*", "vfs.*", "llm.*"],
    });
    await saveApp(ws, app);

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
      appCtx(ws, app, { grants: { tools: ["keyvalue.*", "llm.*"] } }),
      "run",
      { agent: "chat-intersect/summarize", input: "try write" },
    )) as { status: string; stopReason: string; error?: { message?: string } };

    expect(run.stopReason).toBe("tool_denied");
    expect(run.status).toBe("failed");
  });
});
describe("loadAppYaml — agents key is additive and strict", () => {
  it("still rejects unknown top-level keys", () => {
    const result = loadAppYaml("title: My App\nbogusField: nope\n");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.issues).toContainEqual(
      expect.objectContaining({ path: "bogusField" }),
    );
  });
});
