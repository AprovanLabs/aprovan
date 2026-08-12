/**
 * Agent profiles + the unified grant model: CRUD on `.services/agents/`,
 * tool-pattern enforcement in the workflow dispatch path, vfs path-prefix
 * enforcement (ro/rw, longest prefix, deny by default once grants exist),
 * and the `agent` global inside agent-attributed runs.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { pathAccess, matchesCapabilityPattern } from "../src/grants.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-agents-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRateLimiters();
});

const manage = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("grant matchers", () => {
  it("matches tool patterns: exact, namespace, subtree, star", () => {
    expect(matchesCapabilityPattern(["keyvalue.set"], "keyvalue", "set")).toBe(true);
    expect(matchesCapabilityPattern(["keyvalue.set"], "keyvalue", "get")).toBe(false);
    expect(matchesCapabilityPattern(["keyvalue.*"], "keyvalue", "get")).toBe(true);
    expect(matchesCapabilityPattern(["github.repos.*"], "github", "repos.listForUser")).toBe(true);
    expect(matchesCapabilityPattern(["github.repos.*"], "github", "issues.create")).toBe(false);
    expect(matchesCapabilityPattern(["*"], "anything", "at.all")).toBe(true);
    expect(matchesCapabilityPattern([], "keyvalue", "set")).toBe(false);
  });

  it("path access: longest prefix wins, deny by default", () => {
    const grants = [
      { prefix: "docs", access: "rw" as const },
      { prefix: "docs/generated", access: "ro" as const },
      { prefix: "apps", access: "ro" as const },
    ];
    expect(pathAccess(grants, "docs/readme.md")).toBe("rw");
    expect(pathAccess(grants, "docs/generated/api.md")).toBe("ro");
    expect(pathAccess(grants, "apps/tasks/index.tsx")).toBe("ro");
    expect(pathAccess(grants, "secrets/key.txt")).toBe("none");
    expect(pathAccess(grants, "docs")).toBe("rw");
  });
});

describe("agents service", () => {
  it("creates, lists, updates, and deletes profiles", async () => {
    const created = await data<{ agent: { name: string; grants?: unknown } }>(
      await manage("agents/create", {
        name: "docs-writer",
        title: "Docs writer",
        provider: "synthetic.new",
        prompt: "You write documentation.",
        grants: {
          tools: ["keyvalue.*", "vfs.*"],
          paths: [{ prefix: "agentdocs/", access: "rw" }],
        },
      }),
    );
    expect(created.agent.name).toBe("docs-writer");

    expect((await manage("agents/create", { name: "docs-writer" })).status).toBe(409);
    expect((await manage("agents/create", { name: "Bad Name!" })).status).toBe(400);
    expect(
      (
        await manage("agents/create", {
          name: "escape",
          grants: { paths: [{ prefix: "../oops", access: "rw" }] },
        })
      ).status,
    ).toBe(400);

    const listing = await data<{ agents: Array<{ name: string }> }>(
      await manage("agents/list", {}),
    );
    expect(listing.agents.some((a) => a.name === "docs-writer")).toBe(true);

    const updated = await data<{ agent: { model?: string; prompt?: string } }>(
      await manage("agents/update", { name: "docs-writer", model: "some-model" }),
    );
    expect(updated.agent.model).toBe("some-model");
    expect(updated.agent.prompt).toBe("You write documentation.");

    await manage("agents/create", { name: "temp" });
    const deleted = await data<{ deleted: string }>(await manage("agents/delete", { name: "temp" }));
    expect(deleted.deleted).toBe("temp");
    expect((await manage("agents/get", { name: "temp" })).status).toBe(404);
  });
});

describe("agent-attributed workflow runs", () => {
  beforeAll(async () => {
    await manage("agents/create", {
      name: "scoped",
      grants: {
        tools: ["keyvalue.*", "vfs.*", "agents.*"],
        paths: [
          { prefix: "agentdocs", access: "rw" },
          { prefix: "apps", access: "ro" },
        ],
      },
    });
    await putFile("apps/sample.txt", "readable");
    await putFile(
      "workflows/agent-probe.js",
      `export default async function run() {
  const out = { agent: agent?.name ?? null, denied: [] };
  await tools.keyvalue.set({ key: "probe", value: 1 });          // granted
  await tools.vfs.write({ path: "agentdocs/note.md", content: "hi" }); // rw prefix
  const file = await tools.vfs.read({ path: "apps/sample.txt" }); // ro prefix
  out.readBack = file.content;
  try { await tools.vfs.write({ path: "apps/sample.txt", content: "clobber" }); }
  catch (err) { out.denied.push("vfs.write:apps"); }
  try { await tools.vfs.read({ path: "workflows/agent-probe.js" }); }
  catch (err) { out.denied.push("vfs.read:workflows"); }
  try { await tools.events.emit({ channel: "probe", payload: {} }); }
  catch (err) { out.denied.push("events.emit"); }
  return out;
}
`,
    );
    await manage("workflows/register", {
      name: "agent-probe",
      script_path: "workflows/agent-probe.js",
    });
  });

  it("bounds the run by the profile's grants and exposes the agent global", async () => {
    const run = await data<{
      status: string;
      result: {
        agent: string;
        readBack: string;
        denied: string[];
      };
    }>(await manage("workflows/run", { name: "agent-probe", agent: "scoped" }));
    expect(run.status).toBe("succeeded");
    expect(run.result.agent).toBe("scoped");
    expect(run.result.readBack).toBe("readable");
    expect(run.result.denied).toEqual([
      "vfs.write:apps",
      "vfs.read:workflows",
      "events.emit",
    ]);

    // The workspace file the grant denied writing stayed intact.
    const file = await data<{ content: string }>(await manage("vfs/read", { path: "apps/sample.txt" }));
    expect(file.content).toBe("readable");
    const note = await data<{ content: string }>(
      await manage("vfs/read", { path: "agentdocs/note.md" }),
    );
    expect(note.content).toBe("hi");
  });

  it("runs unbounded without an agent, and 404s on unknown agents", async () => {
    const run = await data<{ status: string; result: { denied: string[] } }>(
      await manage("workflows/run", { name: "agent-probe" }),
    );
    expect(run.status).toBe("succeeded");
    expect(run.result.denied).toEqual([]);

    expect((await manage("workflows/run", { name: "agent-probe", agent: "nope" })).status).toBe(
      404,
    );
  });

  it("registration-level agent applies to every run", async () => {
    await manage("workflows/register", {
      name: "agent-probe",
      script_path: "workflows/agent-probe.js",
      agent: "scoped",
    });
    const run = await data<{ status: string; result: { agent: string; denied: string[] } }>(
      await manage("workflows/run", { name: "agent-probe" }),
    );
    expect(run.status).toBe("succeeded");
    expect(run.result.agent).toBe("scoped");
    expect(run.result.denied.length).toBe(3);
  });
});

describe("agent executions", () => {
  it("stamps run.agent and lists executions via agents.runs", async () => {
    await manage("workflows/run", { name: "agent-probe", agent: "scoped" });
    const { runs } = await data<{
      runs: Array<{ workflow: string; agent: string; status: string; traceId?: string }>;
    }>(await manage("agents/runs", { name: "scoped" }));
    expect(runs.length).toBeGreaterThanOrEqual(1);
    expect(runs[0]?.workflow).toBe("agent-probe");
    expect(runs[0]?.agent).toBe("scoped");
    expect(runs[0]?.traceId).toBeDefined();

    // Unattributed runs stay out of the executions feed.
    const all = await data<{ runs: Array<{ agent: string }> }>(await manage("agents/runs", {}));
    expect(all.runs.every((run) => run.agent === "scoped")).toBe(true);
  });
});
