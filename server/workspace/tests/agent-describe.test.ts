/**
 * Native runner built-in `describe(namespace)` — on-demand compact
 * signatures from the shared tool catalog (iw9-d stream 4).
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { DESCRIBE_PAGE_SIZE } from "../src/agents/runner.js";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";
import * as toolsRoute from "../src/routes/tools.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-describe-"));
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
  vi.restoreAllMocks();
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
      if (options.operation === "log") {
        return { success: true, data: { commits: [] }, durationMs: 1 };
      }
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
  return calls;
}

type StoredRun = {
  id: string;
  status: string;
  stopReason?: string;
  error?: { message: string };
  turns?: Array<{
    kind: string;
    toolCalls?: Array<{ name: string; result?: string; error?: string }>;
  }>;
};

beforeEach(async () => {
  expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
  expect((await saveCredential("github", "gh-test")).status).toBeLessThan(300);
  await data(
    await manage("profiles/set", {
      namespace: "llm",
      name: "fast",
      provider: "anthropic",
      options: { model: "model-fast", tier: "fast", costPerMTokUsd: 1 },
    }),
  );
  await data(
    await manage("profiles/set", {
      namespace: "vcs",
      provider: "github",
    }),
  );
});

function toolResultJson(run: StoredRun, toolName: string): unknown {
  for (const turn of run.turns ?? []) {
    for (const call of turn.toolCalls ?? []) {
      if (call.name === toolName && call.result) {
        return JSON.parse(call.result);
      }
    }
  }
  throw new Error(`No ${toolName} result on run`);
}

describe("describe tool", () => {
  it("returns compact vcs signatures mid-run with no signatures in the system prompt", async () => {
    await data(
      await manage("agents/create", {
        name: "discoverer",
        llm: "llm:fast",
        prompt: "Discover then call.",
        grants: { tools: ["vcs.*"] },
      }),
    );

    const calls = scriptLlm([
      {
        tool_calls: [
          {
            id: "d1",
            type: "function",
            function: {
              name: "describe",
              arguments: JSON.stringify({ namespace: "vcs" }),
            },
          },
        ],
      },
      {
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "vcs",
                operation: "log",
                args: { limit: 5 },
              }),
            },
          },
        ],
      },
      { content: "done" },
    ]);

    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "discoverer", input: "go" }),
    );

    expect(run.status).toBe("succeeded");
    expect(run.stopReason).toBe("completed");

    const described = toolResultJson(run, "describe") as {
      namespace: string;
      operations: Array<{ operation: string; params: string; description?: string }>;
    };
    expect(described.namespace).toBe("vcs");
    expect(described.operations.length).toBeGreaterThan(0);
    const logOp = described.operations.find((op) => op.operation === "log");
    expect(logOp).toBeDefined();
    expect(typeof logOp!.params).toBe("string");
    // Compact form: optional markers, no JSON schema dump.
    expect(logOp!.params).not.toContain("{");
    expect(logOp!.params).toMatch(/limit\?|ref\?|scope\?/);

    const llmCalls = calls.filter((c) => c.operation === "createChatCompletion");
    expect(llmCalls.length).toBeGreaterThanOrEqual(1);
    const firstMessages = llmCalls[0]!.args["messages"] as Array<{
      role: string;
      content?: string;
    }>;
    const system = firstMessages.find((m) => m.role === "system");
    expect(system?.content).toContain("Discover then call");
    // No per-operation parameter lists pasted into the prompt.
    expect(system?.content ?? "").not.toMatch(/limit\?,\s*ref\?/);
    expect(system?.content ?? "").not.toContain("pullRequests");

    const toolsArg = llmCalls[0]!.args["tools"] as Array<{
      function?: { name?: string };
    }>;
    const names = toolsArg.map((t) => t.function?.name);
    expect(names).toContain("call_tool");
    expect(names).toContain("describe");

    expect(calls.some((c) => c.operation === "log")).toBe(true);
  });

  it("refuses an ungranted namespace with { error, allowed } and continues the run", async () => {
    const catalogSpy = vi.spyOn(toolsRoute, "catalogForNamespace");

    await data(
      await manage("agents/create", {
        name: "locked",
        llm: "llm:fast",
        prompt: "Stay in vcs.",
        grants: { tools: ["vcs.*"] },
      }),
    );

    scriptLlm([
      {
        tool_calls: [
          {
            id: "d1",
            type: "function",
            function: {
              name: "describe",
              arguments: JSON.stringify({ namespace: "github" }),
            },
          },
        ],
      },
      { content: "still going" },
    ]);

    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "locked", input: "go" }),
    );

    expect(run.status).toBe("succeeded");
    expect(run.stopReason).toBe("completed");
    expect(run.stopReason).not.toBe("tool_denied");

    const refused = toolResultJson(run, "describe") as {
      error: string;
      allowed: string[];
    };
    expect(refused.error).toMatch(/github/i);
    expect(refused.allowed).toEqual(expect.arrayContaining(["vcs.*"]));
    // Spec: no catalog for the ungranted namespace is loaded.
    expect(catalogSpy).not.toHaveBeenCalled();
  });

  it("paginates large namespaces via cursor and remaining", async () => {
    const total = DESCRIBE_PAGE_SIZE + 7;
    vi.spyOn(toolsRoute, "catalogForNamespace").mockResolvedValue(
      Array.from({ length: total }, (_, i) => ({
        operation: `op${String(i).padStart(3, "0")}`,
        params: "x?",
      })),
    );

    await data(
      await manage("agents/create", {
        name: "pager",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );

    const calls = scriptLlm([
      {
        tool_calls: [
          {
            id: "d1",
            type: "function",
            function: {
              name: "describe",
              arguments: JSON.stringify({ namespace: "vcs" }),
            },
          },
        ],
      },
      {
        tool_calls: [
          {
            id: "d2",
            type: "function",
            function: {
              name: "describe",
              arguments: JSON.stringify({
                namespace: "vcs",
                cursor: String(DESCRIBE_PAGE_SIZE),
              }),
            },
          },
        ],
      },
      { content: "paged" },
    ]);

    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "pager", input: "go" }),
    );
    expect(run.status).toBe("succeeded");

    // Prefer tool messages fed back to the model (24k cap) over the
    // truncated run-record echo (2k) so a full page still parses. The final
    // LLM turn sees both describe results in order.
    const llmCalls = calls.filter((c) => c.operation === "createChatCompletion");
    const lastMessages = llmCalls[llmCalls.length - 1]!.args["messages"] as Array<{
      role?: string;
      content?: string;
    }>;
    const describeBodies = lastMessages
      .filter((m) => m.role === "tool" && m.content)
      .map((m) => JSON.parse(m.content!) as {
        operations?: Array<{ operation: string }>;
        cursor?: string;
        remaining?: number;
      })
      .filter((body) => Array.isArray(body.operations));

    expect(describeBodies).toHaveLength(2);
    const first = describeBodies[0]!;
    expect(first.operations).toHaveLength(DESCRIBE_PAGE_SIZE);
    expect(first.cursor).toBe(String(DESCRIBE_PAGE_SIZE));
    expect(first.remaining).toBe(7);

    const second = describeBodies[1]!;
    expect(second.operations).toHaveLength(7);
    expect(second.operations![0]!.operation).toBe(
      `op${String(DESCRIBE_PAGE_SIZE).padStart(3, "0")}`,
    );
    expect(second.cursor).toBeUndefined();
    expect(second.remaining).toBeUndefined();
  });

  it("does not widen authority: describe then denied call_tool ends tool_denied", async () => {
    await data(
      await manage("agents/create", {
        name: "narrow",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );

    scriptLlm([
      {
        tool_calls: [
          {
            id: "d1",
            type: "function",
            function: {
              name: "describe",
              arguments: JSON.stringify({ namespace: "vcs" }),
            },
          },
        ],
      },
      {
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "github",
                operation: "repos.get",
                args: { owner: "acme", repo: "app" },
              }),
            },
          },
        ],
      },
      { content: "should not reach" },
    ]);

    const run = await data<StoredRun>(
      await manage("agents/run", { agent: "narrow", input: "go" }),
    );

    expect(run.status).toBe("failed");
    expect(run.stopReason).toBe("tool_denied");
    expect(run.error?.message).toMatch(/github\.repos\.get/);
  });
});
