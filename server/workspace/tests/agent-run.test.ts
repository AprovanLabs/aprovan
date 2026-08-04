/**
 * Native agents.run loop + the webhook → workflow → agent → vcs north star.
 *
 * The loop itself lives in agents/runner.ts; these tests drive it through
 * the public surfaces (agents.run, then a provider webhook that fans into a
 * workflow whose script calls agents.run) with a scripted isolate executor
 * so every assertion is about composition, not a live model.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-run-"));
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

/**
 * Scripted LLM + capture every isolate dispatch. Each LLM call consumes one
 * turn from the queue; every other provider returns a canned success so the
 * vcs adapter (and anything else) can be asserted via the call log.
 */
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
      if (options.provider === "github/vcs" || options.module === "github/vcs") {
        if (options.operation === "pullRequests.diff") {
          return { success: true, data: "diff --git a/x b/x\n+hello\n", durationMs: 1 };
        }
        if (options.operation === "pullRequests.get") {
          return {
            success: true,
            data: { number: 7, title: "Add greeting", state: "open" },
            durationMs: 1,
          };
        }
        return { success: true, data: { ok: true }, durationMs: 1 };
      }
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
  return calls;
}

beforeEach(async () => {
  expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
  expect((await saveCredential("github", "gh-test")).status).toBeLessThan(300);
  await manage("interfaces/bind", {
    interface: "llm",
    as: "fast",
    provider: "anthropic",
    options: { model: "model-fast", tier: "fast", costPerMTokUsd: 1 },
  });
  await manage("interfaces/bind", {
    interface: "llm",
    as: "deep",
    provider: "anthropic",
    options: { model: "model-deep", tier: "deep", costPerMTokUsd: 15 },
  });
});

describe("agents.run native loop", () => {
  it("runs a bounded tool-use loop and returns the final answer", async () => {
    await data(
      await manage("agents/create", {
        name: "reviewer",
        llm: "llm:fast",
        prompt: "You review pull requests.",
        grants: { tools: ["vcs.*", "llm.*"] },
      }),
    );

    const calls = scriptLlm([
      {
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "vcs",
                operation: "pullRequests.get",
                args: { owner: "acme", repo: "app", number: 7 },
              }),
            },
          },
        ],
      },
      {
        content: JSON.stringify({
          blocking: true,
          suggestions: ["Please add tests."],
        }),
      },
    ]);

    const run = await data<{
      id: string;
      status: string;
      stopReason: string;
      output?: string;
      turns: unknown[];
      usage: { turns: number; toolCalls: number };
      effortApplied?: string;
    }>(
      await manage("agents/run", {
        agent: "reviewer",
        input: { diff: "diff --git a/x b/x\n+hello\n" },
      }),
    );

    expect(run.status).toBe("succeeded");
    expect(run.stopReason).toBe("completed");
    expect(run.usage.turns).toBe(2);
    expect(run.usage.toolCalls).toBe(1);
    expect(run.output).toContain("blocking");

    const llmCalls = calls.filter((c) => c.operation === "createChatCompletion");
    expect(llmCalls).toHaveLength(2);
    const firstMessages = llmCalls[0]!.args["messages"] as Array<{ role: string; content?: string }>;
    expect(firstMessages.some((m) => m.role === "system" && m.content?.includes("review pull"))).toBe(
      true,
    );
    // Binding default for llm:fast — proves instance redirection, not the
    // zero-config anthropic fallback.
    expect(llmCalls[0]!.args["model"]).toBe("model-fast");

    expect(calls.some((c) => c.operation === "pullRequests.get")).toBe(true);
  });

  it("ends with tool_denied when the model asks outside its grants", async () => {
    await data(
      await manage("agents/create", {
        name: "locked",
        llm: "llm:fast",
        grants: { tools: ["vcs.*"] },
      }),
    );

    scriptLlm([
      {
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "keyvalue",
                operation: "set",
                args: { key: "nope", value: 1 },
              }),
            },
          },
        ],
      },
    ]);

    const run = await data<{ status: string; stopReason: string; error?: { message: string } }>(
      await manage("agents/run", { agent: "locked", input: "go" }),
    );
    expect(run.status).toBe("failed");
    expect(run.stopReason).toBe("tool_denied");
    expect(run.error?.message).toMatch(/keyvalue\.set/);
  });

  it("renders mounts as an instruction layer", async () => {
    await manage("vfs/write", {
      path: "skills/review.md",
      content: "Always ask for tests.",
    });
    await data(
      await manage("agents/create", {
        name: "mounted",
        llm: "llm:fast",
        prompt: "Reviewer",
        grants: {
          tools: ["vcs.*"],
          paths: [{ prefix: "skills/", access: "ro" }],
        },
        mounts: [{ path: "skills", source: "skills/", mode: "ro" }],
      }),
    );

    const calls = scriptLlm([{ content: "ok" }]);
    const run = await data<{ status: string }>(
      await manage("agents/run", { agent: "mounted", input: "review this" }),
    );
    expect(run.status).toBe("succeeded");
    const messages = calls[0]!.args["messages"] as Array<{ role: string; content?: string }>;
    const system = messages.find((m) => m.role === "system");
    expect(system?.content).toContain("Always ask for tests.");
    expect(system?.content).toContain("skills/review.md");
  });

  it("picks an llm candidate from the profile policy", async () => {
    await data(
      await manage("agents/create", {
        name: "chooser",
        llm: "llm:fast",
        llmCandidates: ["llm:fast", "llm:deep"],
        policy: { effort: "high" },
        grants: { tools: ["vcs.*"] },
      }),
    );

    const calls = scriptLlm([{ content: "done" }]);
    const run = await data<{ status: string; effortApplied?: string }>(
      await manage("agents/run", { agent: "chooser", input: "go" }),
    );
    expect(run.status).toBe("succeeded");
    expect(run.effortApplied).toContain("llm:deep");
    expect(calls[0]!.args["model"]).toBe("model-deep");
  });
});

describe("webhook → workflow → agents.run → vcs (code reviewer)", () => {
  it("reviews a PR end to end through a provider webhook", async () => {
    await manage("vfs/write", {
      path: "skills/style.md",
      content: "Prefer clear names.",
    });
    await data(
      await manage("agents/create", {
        name: "code-reviewer",
        title: "PR reviewer",
        llm: "llm:fast",
        prompt: "Review the diff. Reply with JSON { blocking, suggestions }.",
        grants: {
          tools: ["vcs.*", "llm.*"],
          paths: [{ prefix: "skills/", access: "ro" }],
        },
        mounts: [{ path: "skills", source: "skills/", mode: "ro" }],
      }),
    );

    // The workflow itself needs agents.run + vcs — a separate "bot" profile
    // owns those grants so the reviewer's grants stay model-facing.
    await data(
      await manage("agents/create", {
        name: "pr-bot",
        llm: "llm:fast",
        grants: { tools: ["vcs.*", "agents.run", "agents.getRun"] },
      }),
    );

    const script = `
export default async function run(input) {
  const payload = input.payload ?? input;
  const owner = payload.repository?.owner?.login ?? "acme";
  const repo = payload.repository?.name ?? "app";
  const number = payload.pull_request?.number ?? payload.prNumber;
  const diff = await tools.vcs.pullRequests.diff({ owner, repo, number });
  const review = await tools.agents.run({
    agent: "code-reviewer",
    input: { diff, owner, repo, number },
  });
  const body = typeof review.output === "string" ? JSON.parse(review.output) : {};
  if (body.blocking) {
    await tools.vcs.pullRequests.review({
      owner, repo, number, event: "request_changes", body: "Blocking findings",
    });
  }
  for (const suggestion of body.suggestions ?? []) {
    await tools.vcs.pullRequests.comment({ owner, repo, number, body: suggestion });
  }
  return { status: review.status, blocking: !!body.blocking, comments: (body.suggestions ?? []).length };
}
`;
    await manage("vfs/write", { path: "workflows/pr-review.js", content: script });
    await manage("workflows/register", {
      name: "pr-review",
      script_path: "workflows/pr-review.js",
      agent: "pr-bot",
    });

    const registered = await data<{ token: string; hookPath: string }>(
      await manage("webhooks/register", {
        id: "gh-prs",
        provider: "github",
        events: ["pull_request"],
        workflows: ["pr-review"],
      }),
    );

    const calls = scriptLlm([
      {
        tool_calls: [
          {
            id: "t1",
            type: "function",
            function: {
              name: "call_tool",
              arguments: JSON.stringify({
                namespace: "vcs",
                operation: "pullRequests.get",
                args: { owner: "acme", repo: "app", number: 7 },
              }),
            },
          },
        ],
      },
      {
        content: JSON.stringify({
          blocking: true,
          suggestions: ["Add a unit test for the greeting."],
        }),
      },
    ]);

    const delivery = await createApp().request(
      `/hooks/local/webhooks/gh-prs?token=${registered.token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Event": "pull_request",
        },
        body: JSON.stringify({
          action: "opened",
          number: 7,
          pull_request: { number: 7 },
          repository: { name: "app", owner: { login: "acme" } },
        }),
      },
    );
    expect(delivery.status).toBe(200);
    const body = (await delivery.json()) as {
      matched: boolean;
      runs: Array<{ workflow: string; status: string }>;
    };
    expect(body.matched).toBe(true);
    expect(body.runs[0]?.status).toBe("succeeded");

    const ops = calls.map((c) => `${c.provider ?? c.module}:${c.operation}`);
    expect(ops.some((o) => o.includes("pullRequests.diff"))).toBe(true);
    expect(ops.some((o) => o.includes("createChatCompletion"))).toBe(true);
    expect(ops.some((o) => o.includes("pullRequests.review"))).toBe(true);
    expect(ops.some((o) => o.includes("pullRequests.comment"))).toBe(true);

    const reviewCall = calls.find((c) => c.operation === "pullRequests.review");
    expect(reviewCall?.args["event"]).toBe("request_changes");
    const commentCall = calls.find((c) => c.operation === "pullRequests.comment");
    expect(commentCall?.args["body"]).toContain("unit test");
  });
});
