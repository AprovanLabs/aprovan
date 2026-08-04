/**
 * Agents running *inside* sandboxes — the remote code-execution shape.
 *
 * Two suites, one per binding direction:
 *
 *   - `agents.run { sandbox }` — the native loop, granted the sandbox tool
 *     projection: the model is told which box it owns, its shell/file calls
 *     route through `sandboxes.*` into the bound driver, and the run record
 *     carries the sandbox id. The LLM and the driver are both behind the
 *     scripted isolate executor (the agent-run.test.ts pattern), so every
 *     assertion is about composition, not a live model.
 *
 *   - `sandboxes.schedule { agent }` — a workflow-less scheduled run: a
 *     machine host claims it, the gateway provisions the sandbox on the host
 *     (including a `cloneRepo` repo mount), then drives the agent loop whose
 *     exec calls travel the relay to the host. The test is the host agent,
 *     leasing and answering ops; the finished run must carry agent +
 *     sandboxId + agentRunId so the UI can say "ran on sandbox X as Y".
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";

let dataDir: string;

// -----------------------------------------------------------------------------
// A stand-in image registry (sandbox-scheduling.test.ts pattern).
// -----------------------------------------------------------------------------

const NODE_IMAGE = "@aprovan/native";

const IMAGES: Record<string, unknown> = {
  [NODE_IMAGE]: {
    name: NODE_IMAGE,
    version: "0.1.0",
    sandbox: {
      workdir: "/work",
      base: { machine: { require: ["node", "git"] } },
      tools: [{ name: "node" }, { name: "git" }],
    },
  },
};

let imageServer: { url: string; close: () => Promise<void> };

beforeAll(async () => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-sbx-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  process.env["GATEWAY_RATE_LIMIT_RPS"] = "1000";
  process.env["GATEWAY_RATE_LIMIT_BURST"] = "2000";

  const { createServer } = await import("node:http");
  const server = createServer((req, res) => {
    const path = decodeURIComponent(req.url ?? "").replace(/^\//u, "");
    const name = path.replace(/\/package\.json$/u, "").replace(/@[\d.]+$/u, "");
    const body = IMAGES[name];
    res.writeHead(body ? 200 : 404, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body ?? { error: "not found" }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const port = (server.address() as { port: number }).port;
  imageServer = {
    url: `http://127.0.0.1:${port}`,
    close: () => new Promise<void>((resolve) => server.close(() => resolve())),
  };
  process.env["SANDBOX_IMAGE_CDN"] = imageServer.url;
});

afterAll(async () => {
  await imageServer.close();
  delete process.env["WORKSPACE_DATA_DIR"];
  delete process.env["GATEWAY_RATE_LIMIT_RPS"];
  delete process.env["GATEWAY_RATE_LIMIT_BURST"];
  delete process.env["SANDBOX_IMAGE_CDN"];
  rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  resetExecutor();
});

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const call = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data?: T; error?: string };
  if (body.error) throw new Error(body.error);
  return body.data as T;
}

const saveCredential = (provider: string, token: string) =>
  createApp().request("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, payload: { type: "bearer_token", token } }),
  });

interface ChatMessage {
  role: string;
  content?: string | null;
}

/**
 * Script the isolate: LLM turns are produced by `nextTurn` (which sees the
 * conversation, so it can pull the sandbox id out of the system prompt);
 * sandbox driver ops run an in-memory box; everything else returns a canned
 * success. Returns the call log for assertions.
 */
function scriptIsolate(
  nextTurn: (turn: number, messages: ChatMessage[]) => Record<string, unknown>,
): IsolateExecuteOptions[] {
  const calls: IsolateExecuteOptions[] = [];
  let turn = 0;
  setExecutor({
    async execute(options): Promise<IsolateResult> {
      calls.push(options);
      if (options.operation === "createChatCompletion") {
        const messages = (options.args["messages"] as ChatMessage[]) ?? [];
        const message = nextTurn(turn++, messages);
        return {
          success: true,
          data: {
            choices: [{ message: { role: "assistant", ...message } }],
            usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
          },
          durationMs: 1,
        };
      }
      // The sandbox driver half (bashkit is the zero-config binding).
      if (options.operation === "create") {
        return {
          success: true,
          data: { id: "sbx-inproc", status: "running", workdir: "/work" },
          durationMs: 1,
        };
      }
      if (options.operation === "exec") {
        return {
          success: true,
          data: { exitCode: 0, stdout: "hi\n", stderr: "", durationMs: 1, truncated: false },
          durationMs: 1,
        };
      }
      if (options.operation === "listFiles") {
        return { success: true, data: [], durationMs: 1 };
      }
      if (options.operation === "pullRequests.create") {
        return {
          success: true,
          data: { number: 42, title: "Add greeting", state: "open" },
          durationMs: 1,
        };
      }
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
  return calls;
}

/** The sandbox id the run was told about, from its own system prompt. */
function sandboxIdFrom(messages: ChatMessage[]): string {
  const system = messages.find((m) => m.role === "system")?.content ?? "";
  const match = /sandbox "([^"]+)"/u.exec(system);
  if (!match) throw new Error(`no sandbox id in system prompt: ${system.slice(0, 200)}`);
  return match[1]!;
}

const toolCall = (id: string, namespace: string, operation: string, args: unknown) => ({
  tool_calls: [
    {
      id,
      type: "function" as const,
      function: {
        name: "call_tool",
        arguments: JSON.stringify({ namespace, operation, args }),
      },
    },
  ],
});

// -----------------------------------------------------------------------------
// agents.run bound to a sandbox
// -----------------------------------------------------------------------------

describe("agents.run { sandbox }", () => {
  it("grants the sandbox projection, execs inside the box, and opens a PR", async () => {
    expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
    expect((await saveCredential("github", "gh-test")).status).toBeLessThan(300);
    await call("interfaces/bind", {
      interface: "llm",
      as: "fast",
      provider: "anthropic",
      options: { model: "model-fast" },
    });
    // The default (bashkit) sandbox binding dispatches through the isolate,
    // which the scripted executor stands in for.
    await call("interfaces/bind", { interface: "sandbox", provider: "bashkit" });

    // The profile grants only vcs.* — the sandbox tools must come from the
    // binding, not the profile, or every agent would need them spelled out.
    await data(
      await call("agents/create", {
        name: "pr-agent",
        llm: "llm:fast",
        prompt: "You fix code and open pull requests.",
        grants: { tools: ["vcs.*"] },
      }),
    );

    const calls = scriptIsolate((turn, messages) => {
      if (turn === 0) {
        return toolCall("c1", "sandboxes", "exec", {
          id: sandboxIdFrom(messages),
          command: "echo hi",
          cwd: "repo",
        });
      }
      if (turn === 1) {
        return toolCall("c2", "vcs", "pullRequests.create", {
          owner: "acme",
          repo: "skills",
          title: "Add greeting",
          sourceBranch: "agent/greeting",
          targetBranch: "main",
        });
      }
      return { content: "Opened PR #42." };
    });

    const sandbox = await data<{ id: string }>(
      await call("sandboxes/create", { name: "agent-box" }),
    );

    const run = await data<{
      id: string;
      status: string;
      stopReason: string;
      sandboxId?: string;
      output?: string;
      usage: { toolCalls: number };
    }>(
      await call("agents/run", {
        agent: "pr-agent",
        input: "add a greeting and open a PR",
        sandbox: sandbox.id,
      }),
    );

    expect(run.status).toBe("succeeded");
    expect(run.stopReason).toBe("completed");
    expect(run.sandboxId).toBe(sandbox.id);
    expect(run.usage.toolCalls).toBe(2);
    expect(run.output).toContain("#42");

    // The exec reached the driver addressed to this sandbox's external id.
    const exec = calls.find((c) => c.operation === "exec");
    expect(exec?.args).toMatchObject({ id: "sbx-inproc", command: "echo hi" });

    // The PR went through the vcs interface's GitHub adapter dispatch.
    const pr = calls.find((c) => c.operation === "pullRequests.create");
    expect(pr?.args).toMatchObject({ sourceBranch: "agent/greeting", targetBranch: "main" });

    // The record answers "which box, which agent" from other requests too.
    const fetched = await data<{ agent?: string; sandboxId?: string }>(
      await call("agents/getRun", { id: run.id }),
    );
    expect(fetched).toMatchObject({ agent: "pr-agent", sandboxId: sandbox.id });
  });

  it("refuses to bind a run to an unknown sandbox before spending a model call", async () => {
    await data(
      await call("agents/create", { name: "lost", llm: "llm:fast", grants: { tools: ["vcs.*"] } }),
    );
    const res = await call("agents/run", {
      agent: "lost",
      input: "go",
      sandbox: "sbx_doesnotexist00000000",
    });
    expect(res.status).toBe(404);
  });
});

// -----------------------------------------------------------------------------
// Scheduled agent-only runs on a machine host
// -----------------------------------------------------------------------------

interface Registered {
  host: { id: string };
  hostToken: string;
  clientToken: string;
  relayUrl: string;
}

const asAgent = (host: Registered, path: string, body: unknown = {}) =>
  createApp().request(`${host.relayUrl}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${host.hostToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

interface LeasedOp {
  id: string;
  op: string;
  args: Record<string, unknown>;
}

describe("sandboxes.schedule { agent } on a machine host", () => {
  it("clones the repo mount on the host and drives the agent loop against it", { timeout: 30_000 }, async () => {
    // The github credential was stored by the first suite ("gh-test");
    // resolveRecordForProvider keeps returning it, so assert against that.
    expect((await saveCredential("anthropic", "sk-test")).status).toBeLessThan(300);
    await call("interfaces/bind", {
      interface: "llm",
      as: "fast",
      provider: "anthropic",
      options: { model: "model-fast" },
    });

    // Register the desktop and bind the sandbox interface to it — the CLI's
    // registration flow, inlined.
    const registered = await data<Registered>(
      await call("sandboxes/registerHost", {
        name: "desk",
        root: "/tmp/aprovan-work",
        images: [NODE_IMAGE],
      }),
    );
    // registerHost persists the client token as the machine credential.
    await call("interfaces/bind", { interface: "sandbox", provider: "machine" });
    await asAgent(registered, "advert", { tools: ["node", "git"], platform: "darwin/arm64" });

    await data(
      await call("agents/create", {
        name: "boxer",
        llm: "llm:fast",
        prompt: "Work inside your sandbox.",
        grants: { tools: ["vcs.*"] },
      }),
    );

    // The model: one exec inside its box, then done.
    scriptIsolate((turn, messages) => {
      if (turn === 0) {
        return toolCall("t1", "sandboxes", "exec", {
          id: sandboxIdFrom(messages),
          command: "git -C repo status",
        });
      }
      return { content: "All done in the sandbox." };
    });

    const scheduled = await data<{ run: { id: string; status: string } }>(
      await call("sandboxes/schedule", {
        image: NODE_IMAGE,
        agent: "boxer",
        input: { task: "inspect the repo" },
        mounts: [{ path: "repo", source: "github:acme/skills#main" }],
      }),
    );
    expect(scheduled.run.status).toBe("pending");

    const claim = (await (await asAgent(registered, "claim", { maxWaitMs: 2_000 })).json()) as {
      run: { id: string } | null;
    };
    expect(claim.run?.id).toBe(scheduled.run.id);

    // Be the machine while the gateway drives the run end to end.
    const seen: LeasedOp[] = [];
    let finished: Record<string, unknown> | undefined;
    for (let attempt = 0; attempt < 200 && !finished; attempt++) {
      const leased = (await (await asAgent(registered, "lease", { maxWaitMs: 250 })).json()) as {
        ops?: LeasedOp[];
      };
      for (const op of leased.ops ?? []) {
        seen.push(op);
        let answer: unknown;
        if (op.op === "create") {
          answer = {
            id: "sbx-sched",
            status: "running",
            workdir: "/tmp/aprovan-work/sbx-sched",
            createdAt: new Date().toISOString(),
          };
        } else if (op.op === "cloneRepo") {
          answer = {
            path: op.args["path"],
            files: [
              { path: "SKILL.md", hash: "0".repeat(64), size: 5, updatedAt: new Date().toISOString() },
            ],
          };
        } else if (op.op === "exec") {
          answer = { exitCode: 0, stdout: "clean\n", stderr: "", durationMs: 1, truncated: false };
        } else if (op.op === "destroy") {
          answer = { destroyed: true };
        } else {
          answer = { ok: true };
        }
        await asAgent(registered, "result", { id: op.id, data: answer });
      }

      const runs = await data<{ runs: Array<Record<string, unknown>> }>(
        await call("sandboxes/runs", {}),
      );
      const current = runs.runs.find((run) => run["id"] === scheduled.run.id);
      if (
        current &&
        (current["status"] === "succeeded" ||
          current["status"] === "failed" ||
          current["status"] === "cancelled")
      ) {
        finished = current;
      }
    }

    expect(finished, "run never reached a terminal state").toBeDefined();
    expect(finished).toMatchObject({
      status: "succeeded",
      agent: "boxer",
      sandboxId: expect.stringMatching(/^sbx_/u),
      agentRunId: expect.stringMatching(/^agr-/u),
    });

    // The host really did the work: provision, clone, the agent's exec.
    expect(seen.map((op) => op.op)).toEqual(
      expect.arrayContaining(["create", "cloneRepo", "exec", "destroy"]),
    );
    const clone = seen.find((op) => op.op === "cloneRepo");
    expect(clone!.args).toMatchObject({ repo: "acme/skills", ref: "main", token: "gh-test" });
    const exec = seen.find((op) => op.op === "exec");
    expect(exec!.args).toMatchObject({ id: "sbx-sched", command: "git -C repo status" });

    // And the agent run record points back at the same sandbox.
    const agentRun = await data<{ agent?: string; sandboxId?: string; status: string }>(
      await call("agents/getRun", { id: finished!["agentRunId"] as string }),
    );
    expect(agentRun).toMatchObject({
      agent: "boxer",
      status: "succeeded",
      sandboxId: finished!["sandboxId"],
    });

    await call("sandboxes/revokeHost", { id: registered.host.id });
  });
});
