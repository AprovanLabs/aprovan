/**
 * `client(name)` — the profile factory on workflow script namespaces
 * (replaces `getClient({ profile })`; the prelude now lives in
 * @aprovan/registry-server, sandbox-runtime spec "In-sandbox SDK layer").
 *
 * One vocabulary, two resolutions, and both legs are covered end to end
 * through real QuickJS runs (script → namespace proxy → invokeTool → stubbed
 * executor), because the profile pin crosses the WASM boundary and a unit
 * test of either side alone would not notice the bridge dropping it:
 *
 *   - provider namespaces: a profile is a credential *label*, so one script
 *     can hold two GitHub accounts side by side;
 *   - interface namespaces: a profile is an *instance* name — instances
 *     already are the interface world's profiles, so `llm.client("fast")`
 *     dispatches through `llm:fast`, options and credential pin included.
 *
 * Failures must be call-time ServiceErrors naming what exists (labels,
 * instances) — never a loader error, never a silent first-credential
 * fallback.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resolveCredentialRecord } from "../src/credentials.js";
import {
  resetExecutor,
  setExecutor,
  type IsolateExecuteOptions,
  type IsolateResult,
} from "../src/isolate.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-get-client-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
  // A QuickJS run makes a burst of tool calls as one user; keep the rate
  // limiter out of the way (sandboxes.test.ts precedent).
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
  const body = (await res.json()) as { data: T };
  return body.data;
}

const saveCredential = (provider: string, token: string, label?: string) =>
  createApp().request("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider,
      ...(label ? { label } : {}),
      payload: { type: "bearer_token", token },
    }),
  });

/** Capture every isolate dispatch; answer each with a canned success. */
function stubExecutor(): IsolateExecuteOptions[] {
  const calls: IsolateExecuteOptions[] = [];
  setExecutor({
    async execute(options): Promise<IsolateResult> {
      calls.push(options);
      return { success: true, data: { ok: true }, durationMs: 1 };
    },
  });
  return calls;
}

interface RunRecord {
  status: string;
  error?: string;
  result: unknown;
}

/** Register a script and run it once, returning the run record. */
async function runScript(name: string, source: string): Promise<RunRecord> {
  await manage("vfs/write", { path: `workflows/${name}.js`, content: source });
  await manage("workflows/register", { name, script_path: `workflows/${name}.js` });
  return data<RunRecord>(await manage("workflows/run", { name }));
}

// ---------------------------------------------------------------------------
// Provider namespaces: profile = credential label
// ---------------------------------------------------------------------------

describe("client(name) on a provider namespace", () => {
  it("routes two profiles of one provider to their own credentials", async () => {
    expect((await saveCredential("github", "gh-work-token", "work")).status).toBeLessThan(300);
    expect((await saveCredential("github", "gh-personal-token", "personal")).status).toBeLessThan(
      300,
    );

    const calls = stubExecutor();
    const run = await runScript(
      "two-accounts",
      `export default async function run() {
  const work = await github.client("work");
  const personal = await github.client("personal");
  await work.repos.get({ owner: "acme", repo: "api" });
  await personal.repos.get({ owner: "me", repo: "dotfiles" });
  return "done";
}`,
    );

    expect(run.error).toBeUndefined();
    expect(run.status).toBe("succeeded");
    expect(calls).toHaveLength(2);
    expect(calls[0]).toMatchObject({
      provider: "github",
      operation: "repos.get",
      args: { owner: "acme", repo: "api" },
      credentials: { type: "bearer_token", token: "gh-work-token" },
    });
    expect(calls[1]).toMatchObject({
      provider: "github",
      operation: "repos.get",
      args: { owner: "me", repo: "dotfiles" },
      credentials: { type: "bearer_token", token: "gh-personal-token" },
    });
  });

  it("keeps the plain namespace on the default credential alongside a pinned client", async () => {
    const calls = stubExecutor();
    const run = await runScript(
      "pin-and-default",
      `export default async function run() {
  const personal = await github.client("personal");
  await personal.repos.get({ owner: "me", repo: "dotfiles" });
  await github.repos.get({ owner: "acme", repo: "api" });
  return "done";
}`,
    );

    expect(run.status).toBe("succeeded");
    expect(calls[0]?.credentials).toMatchObject({ token: "gh-personal-token" });
    // The unpinned call resolves as it always has — the provider's first
    // credential — proving the pin lives on the returned client, not the
    // namespace.
    expect(calls[1]?.credentials).toMatchObject({ token: "gh-work-token" });
  });

  it("fails an unknown profile at call time, listing the labels that exist", async () => {
    stubExecutor();
    const run = await runScript(
      "unknown-profile",
      `export default async function run() {
  const gh = await github.client("nope");
  return await gh.repos.get({ owner: "o", repo: "r" });
}`,
    );

    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/No github credential is labeled "nope"/u);
    expect(run.error).toMatch(/"work"/u);
    expect(run.error).toMatch(/"personal"/u);
  });

  it("refuses an ambiguous label rather than guessing between accounts", async () => {
    await saveCredential("stripe", "sk-one", "dup");
    await saveCredential("stripe", "sk-two", "dup");
    await expect(
      resolveCredentialRecord("local", "stripe", undefined, "dup"),
    ).rejects.toThrow(/2 stripe credentials are labeled "dup"/u);
  });

  it("has no profiles on a core service", async () => {
    stubExecutor();
    const run = await runScript(
      "core-profile",
      `export default async function run() {
  const kv = await keyvalue.client("x");
  return await kv.get({ key: "a" });
}`,
    );
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/core service/u);
  });
});

// ---------------------------------------------------------------------------
// Interface namespaces: profile = instance name
// ---------------------------------------------------------------------------

describe("client(name) on an interface namespace", () => {
  it("resolves the instance llm:fast, options and credential included", async () => {
    await saveCredential("anthropic", "sk-ant-key");
    const bound = await manage("interfaces/bind", {
      interface: "llm",
      as: "fast",
      provider: "anthropic",
      options: { model: "claude-haiku-4-5-20251001" },
    });
    expect(bound.status).toBe(200);

    const calls = stubExecutor();
    const run = await runScript(
      "fast-llm",
      `export default async function run() {
  const fast = await llm.client("fast");
  await fast.createChatCompletion({ messages: [{ role: "user", content: "hi" }] });
  return "done";
}`,
    );

    expect(run.error).toBeUndefined();
    expect(run.status).toBe("succeeded");
    expect(calls).toHaveLength(1);
    // The instance's whole 4-tuple travelled: anthropic's OpenAI-compatible
    // module and base URL, the binding's model default, and the anthropic
    // credential — everything a bare credential label could not carry.
    expect(calls[0]).toMatchObject({
      provider: "openai",
      operation: "createChatCompletion",
      credentials: { type: "bearer_token", token: "sk-ant-key" },
    });
    expect(calls[0]?.baseUrl).toContain("anthropic.com");
    expect(calls[0]?.args["model"]).toBe("claude-haiku-4-5-20251001");
  });

  it("refuses an instance nobody bound, rather than guessing", async () => {
    stubExecutor();
    const run = await runScript(
      "ghost-llm",
      `export default async function run() {
  const ghost = await llm.client("ghost");
  return await ghost.listModels({});
}`,
    );
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/No such interface instance: llm:ghost/u);
  });

  it("rejects a profile that is not a legal instance name", async () => {
    stubExecutor();
    const run = await runScript(
      "bad-instance-name",
      `export default async function run() {
  const c = await llm.client("Not Valid");
  return await c.listModels({});
}`,
    );
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/not a valid llm instance name/u);
  });
});
