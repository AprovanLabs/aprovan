/**
 * The `agent` interface: the runtime that executes an agent's loop.
 *
 * Two things here are not shared with `llm`/`sql`/`sandbox` and are the whole
 * reason this file exists:
 *
 *   1. its default implementation is the gateway's own runner, which has no
 *      credential — so the interface must be *listed and resolvable* in a
 *      workspace that has connected nothing, and must not be hijacked by
 *      whatever vendor key happens to be lying around;
 *   2. its discovery entries come from the contract package rather than from a
 *      resolved module, because there is no module to resolve.
 *
 * Plus the contract's own unit surface (@utdk/agent), where the interesting
 * behaviour is effort snapping and refusing to promise a capability the
 * runtime does not have.
 */

import {
  AGENT_EFFORTS,
  AgentError,
  agentToolEntries,
  NO_AGENT_CAPABILITIES,
  assertRunSupported,
  clampOutput,
  inputMessages,
  isTerminal,
  maxTurns,
  nearestEffort,
  runTimeout,
  validateRunArgs,
  type AgentCapabilities,
} from "@utdk/agent";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { listInterfaces, resolveInterfaceForWorkspace } from "../src/interfaces.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agent-iface-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const manage = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

describe("the agent interface resolves without a credential", () => {
  it("declares a credentialless first-party implementation", () => {
    const def = listInterfaces().find((entry) => entry.id === "agent");
    expect(def).toBeDefined();
    expect(def!.defaultsFor).toContain("run");
    const native = def!.compat.find((entry) => entry.credentialless);
    expect(native?.provider).toBe("native");
    // The vendor entries are there too — an interface with one implementation
    // is a service wearing a costume.
    expect(def!.compat.length).toBeGreaterThan(1);
  });

  it("falls back to the gateway's own runner in an empty workspace", async () => {
    const resolved = await resolveInterfaceForWorkspace("local", "agent");
    expect(resolved.bound).toBe(false);
    expect(resolved.compat.provider).toBe("native");
  });

  it("advertises the native runner's ops now that the loop exists", async () => {
    // These pinned `not.toContain` while every implementation was
    // declared-not-built; the in-process runner (agents/runner.ts) is the
    // first runtime to land, and this flip is the assertion that proves it.
    // The advertised surface is trimmed by the native capability descriptor:
    // an in-process tool transport never yields calls, so there is no
    // submitToolResults to answer.
    const res = await createApp().request("/tools?scope=configured");
    const body = (await res.json()) as { tools: Array<{ name: string }> };
    const names = body.tools.map((tool) => tool.name);
    expect(names).toContain("agent.run");
    expect(names).toContain("agent.get");
    expect(names).toContain("agent.cancel");
    expect(names).not.toContain("agent.submitToolResults");
  });

  it("dispatches a direct call into the in-process loop, never the isolate", async () => {
    // The raw namespace short-circuits into the runner (the `machine`
    // sandbox precedent) — no module load, so no `Package subpath './native'
    // is not defined by "exports"` from deep inside the loader. This
    // workspace has no LLM provider connected yet, so the loop's first turn
    // fails; the failure lands ON THE RUN RESOURCE (a run is a resource, not
    // a request), naming the llm resolution rather than a package path.
    const res = await createApp().request("/tools/agent/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: { input: "hi" } }),
    });
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      data: { id: string; status: string; stopReason: string; error?: { message: string } };
    };
    expect(body.data.status).toBe("failed");
    expect(body.data.stopReason).toBe("error");
    expect(body.data.error?.message).toMatch(/llm/u);
    expect(body.data.error?.message).not.toMatch(/subpath/u);

    // …and the run resource is readable afterwards, because even the
    // in-gateway runtime persists one.
    const read = await createApp().request("/tools/agent/get", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ args: { id: body.data.id } }),
    });
    expect(read.status).toBe(200);
    const readBody = (await read.json()) as { data: { id: string; status: string } };
    expect(readBody.data.id).toBe(body.data.id);
    expect(readBody.data.status).toBe("failed");
  });

  it("classifies the namespace and shows the native runner as available", async () => {
    const res = await createApp().request("/tools/namespaces");
    const body = (await res.json()) as {
      namespaces: Array<{
        id: string;
        kind: string;
        compat?: Array<{ provider: string; connected: boolean }>;
      }>;
    };
    const agent = body.namespaces.find((entry) => entry.id === "agent");
    expect(agent?.kind).toBe("interface");
    // "Not connected" next to the binding that resolves to it would be a
    // contradiction: there is nothing to connect.
    expect(agent?.compat?.find((c) => c.provider === "native")?.connected).toBe(true);
  });

  it("keeps a vendor credential from silently becoming the agent runtime", async () => {
    // Connecting OpenAI is not consent to run your agents in OpenAI's cloud.
    // `openai` is a compat provider for `agent`, so without the credentialless
    // rule this credential alone would move every agent run off-box.
    const saved = await createApp().request("/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "openai",
        payload: { type: "api_key", value: "test-key" },
      }),
    });
    expect(saved.status).toBeLessThan(300);

    const resolved = await resolveInterfaceForWorkspace("local", "agent");
    expect(resolved.compat.provider).toBe("native");
    expect(resolved.bound).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Binding
// ---------------------------------------------------------------------------

describe("binding an agent runtime", () => {
  it("rejects a provider that does not implement the interface", async () => {
    const res = await manage("interfaces/bind", { interface: "agent", provider: "github" });
    expect(res.status).toBe(400);
  });

  it("moves the default onto a vendor runtime when asked explicitly", async () => {
    await manage("interfaces/bind", {
      interface: "agent",
      provider: "openai",
      options: { effort: "high" },
    });
    const resolved = await resolveInterfaceForWorkspace("local", "agent");
    expect(resolved.bound).toBe(true);
    expect(resolved.compat.provider).toBe("openai");
    expect(resolved.compat.module).toBe("openai/assistants");
    expect(resolved.options["effort"]).toBe("high");

    await manage("interfaces/unbind", { interface: "agent" });
    expect((await resolveInterfaceForWorkspace("local", "agent")).compat.provider).toBe("native");
  });

  it("gives a named runtime instance its own namespace and schemas", async () => {
    const bound = await data<{ namespace: string }>(
      await manage("interfaces/bind", {
        interface: "agent",
        as: "deep",
        provider: "native",
        options: { effort: "max", maxTurns: 128 },
      }),
    );
    expect(bound.namespace).toBe("agent:deep");

    const resolved = await resolveInterfaceForWorkspace("local", "agent:deep");
    expect(resolved.compat.provider).toBe("native");
    expect(resolved.options["effort"]).toBe("max");

    // The colon must not be mistaken for the operation separator when the
    // operation is derived — `deep.run` would name a namespace that does not
    // exist. Asserted on the entry factory rather than through `GET /tools`,
    // so the parsing rule holds regardless of what the workspace has bound
    // or which runtimes discovery currently lists.
    const entries = agentToolEntries("agent:deep");
    const run = entries.find((entry) => entry.name === "agent:deep.run");
    expect(run).toBeDefined();
    expect(run!.name.slice("agent:deep".length + 1)).toBe("run");
  });

  it("refuses a named instance nobody bound, rather than guessing", async () => {
    await expect(resolveInterfaceForWorkspace("local", "agent:ghost")).rejects.toThrow(
      /No such interface instance/u,
    );
  });
});

// ---------------------------------------------------------------------------
// The name collision
// ---------------------------------------------------------------------------

describe("the interface id does not shadow the agent global", () => {
  it("keeps `agent` meaning the run's profile inside a workflow script", async () => {
    // The runner injects one global per namespace, and it injects the agent
    // profile as `agent`. Adding an interface with the id `agent` put a
    // namespace proxy in that slot, so `agent.name` stopped being the
    // profile's name and became a tool path — a silent change to every
    // agent-attributed script. The raw driver loses the bare identifier;
    // `agents.*` is the surface for spawning one anyway.
    await manage("agents/create", { name: "shadow-probe", title: "Shadow probe" });
    await manage("vfs/write", {
      path: "workflows/agent-global.js",
      content:
        "export default async function run() {\n" +
        "  return { name: agent?.name ?? null, kind: typeof agent };\n" +
        "}\n",
    });
    await manage("workflows/register", {
      name: "agent-global",
      script_path: "workflows/agent-global.js",
    });

    const run = await data<{
      status: string;
      error?: string;
      result: { name: string | null; kind: string };
    }>(await manage("workflows/run", { name: "agent-global", agent: "shadow-probe" }));
    expect(run.status).toBe("succeeded");
    expect(run.result.kind).toBe("object");
    expect(run.result.name).toBe("shadow-probe");
  });
});

// ---------------------------------------------------------------------------
// The contract
// ---------------------------------------------------------------------------

const FULL: AgentCapabilities = {
  locality: "in-gateway",
  toolTransport: "in-process",
  filesystem: true,
  hashes: true,
  inlineFiles: true,
  resumable: true,
  cancellable: true,
  streaming: true,
  modelSelectable: true,
  setupCommand: true,
  effortLevels: [...AGENT_EFFORTS],
};

describe("@utdk/agent — effort is an ordinal, not a vendor knob", () => {
  it("passes through a level the runtime supports", () => {
    expect(nearestEffort("high", AGENT_EFFORTS)).toBe("high");
  });

  it("snaps onto the nearest supported level", () => {
    expect(nearestEffort("minimal", ["low", "high"])).toBe("low");
    expect(nearestEffort("max", ["low", "high"])).toBe("high");
  });

  it("rounds a tie down, so `medium` is never the priciest setting", () => {
    // `medium` is equidistant from `low` and `high`. Rounding up would make
    // the middle of a five-step scale the most expensive option on every
    // two-level backend — the wrong direction for a knob about cost.
    expect(nearestEffort("medium", ["low", "high"])).toBe("low");
  });

  it("leaves the request alone when a runtime declares nothing", () => {
    expect(nearestEffort("high", [])).toBe("high");
  });
});

describe("@utdk/agent — run arguments", () => {
  it("treats a bare string as one user turn", () => {
    expect(inputMessages({ input: "review this" })).toEqual([
      { role: "user", content: "review this" },
    ]);
  });

  it("rejects an empty task", () => {
    expect(() => validateRunArgs({ input: "  " })).toThrow(AgentError);
    expect(() => validateRunArgs({ input: [] })).toThrow(AgentError);
  });

  it("rejects an effort level that is not on the scale", () => {
    expect(() =>
      validateRunArgs({ input: "go", effort: "extreme" as never }),
    ).toThrow(/effort must be one of/u);
  });

  it("refuses an inline file set that wants a mount instead", () => {
    const files = Array.from({ length: 100 }, (_, i) => ({
      path: `skills/${i}.md`,
      content: "x",
    }));
    expect(() => validateRunArgs({ input: "go", files })).toThrow(/inline files/u);
  });

  it("applies the contract's defaults when the caller sets no limits", () => {
    expect(runTimeout({ input: "go" })).toBe(900_000);
    expect(maxTurns({ input: "go" })).toBe(32);
    expect(maxTurns({ input: "go", limits: { maxTurns: 4 } })).toBe(4);
  });

  it("truncates output at the caller's cap and says so", () => {
    const clamped = clampOutput("abcdef", { maxOutputBytes: 3 });
    expect(clamped).toEqual({ text: "abc", truncated: true });
    expect(clampOutput("abc").truncated).toBe(false);
  });
});

describe("@utdk/agent — a runtime fails loudly rather than degrading", () => {
  it("accepts everything from a fully capable runtime", () => {
    expect(() =>
      assertRunSupported(FULL, "native", {
        input: "go",
        model: "claude-sonnet-5",
        setup: "npm ci",
        stream: true,
        files: [{ path: "skills/a.md", content: "…" }],
        tools: [{ name: "vfs.read" }],
      }),
    ).not.toThrow();
  });

  it("refuses a model on a runtime that owns that choice", () => {
    expect(() =>
      assertRunSupported({ ...FULL, modelSelectable: false }, "assistants", {
        input: "go",
        model: "gpt-5",
      }),
    ).toThrow(/chooses its own model/u);
  });

  it("refuses a setup command with no environment to run it in", () => {
    expect(() =>
      assertRunSupported({ ...FULL, setupCommand: false }, "assistants", {
        input: "go",
        setup: "npm ci",
      }),
    ).toThrow(/setup/u);
  });

  it("refuses tools on a runtime with no tool loop", () => {
    expect(() =>
      assertRunSupported(NO_AGENT_CAPABILITIES, "toy", {
        input: "go",
        tools: [{ name: "vfs.read" }],
      }),
    ).toThrow(/no tool loop/u);
  });

  it("demands a callback target from a runtime that phones home for tools", () => {
    // A remote runtime handed a tool list with nowhere to send the calls would
    // discover that mid-run, after the tokens were spent.
    expect(() =>
      assertRunSupported({ ...FULL, toolTransport: "callback" }, "harness", {
        input: "go",
        tools: [{ name: "vfs.read" }],
      }),
    ).toThrow(/callback/u);
  });
});

describe("@utdk/agent — run status vocabulary", () => {
  it("treats only settled runs as terminal", () => {
    expect(isTerminal("succeeded")).toBe(true);
    expect(isTerminal("failed")).toBe(true);
    expect(isTerminal("cancelled")).toBe(true);
    expect(isTerminal("awaiting_tools")).toBe(false);
    // Reserved for a run whose resource went away (a browser sandbox's tab).
    // Not terminal: the point of the state is that it can be resumed.
    expect(isTerminal("suspended")).toBe(false);
  });
});
