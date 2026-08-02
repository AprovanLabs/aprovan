import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { cronMatches, parseCron } from "../src/workflows/cron.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-workflows-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const call = (path: string, args: Record<string, unknown>) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const writeScript = (path: string, content: string) =>
  createApp().request(`/fs/${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, mimeType: "text/javascript" }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("cron matcher", () => {
  it("parses fields, ranges, lists, steps", () => {
    const s = parseCron("*/15 9-17 1,15 * 1-5");
    expect([...s.minute]).toEqual([0, 15, 30, 45]);
    expect(s.hour.has(9)).toBe(true);
    expect(s.hour.has(18)).toBe(false);
    expect([...s.dayOfMonth]).toEqual([1, 15]);
    expect([...s.dayOfWeek]).toEqual([1, 2, 3, 4, 5]);
  });

  it("matches the current UTC minute", () => {
    const date = new Date(Date.UTC(2026, 0, 5, 13, 30)); // Monday
    expect(cronMatches("30 13 * * 1", date)).toBe(true);
    expect(cronMatches("31 13 * * 1", date)).toBe(false);
    expect(cronMatches("*/10 * * * *", date)).toBe(true);
  });

  it("rejects malformed expressions", () => {
    expect(() => parseCron("* * *")).toThrow();
    expect(() => parseCron("61 * * * *")).toThrow();
  });
});

describe("workflows service", () => {
  it("registers, lists, runs, and traces a workflow", async () => {
    await writeScript(
      "workflows/echo.js",
      `import keyvalue from "keyvalue";
       export default async function run(input) {
         console.log("starting", input.n);
         await keyvalue.set({ key: "wf-last-input", value: input });
         return { doubled: input.n * 2 };
       }`,
    );

    const reg = await call("workflows/register", {
      name: "echo",
      script_path: "workflows/echo.js",
      description: "Doubles input.n",
      triggers: { webhook: true },
    });
    expect(reg.status).toBe(200);
    const regData = await data<{ name: string; hookToken?: string; webhookPath?: string }>(reg);
    expect(regData.hookToken).toBeTruthy();
    expect(regData.webhookPath).toContain("/hooks/");

    const list = await data<{ workflows: Array<{ name: string }> }>(
      await call("workflows/list", {}),
    );
    expect(list.workflows.map((w) => w.name)).toContain("echo");

    const run = await data<{
      id: string;
      status: string;
      result: { doubled: number };
      logs: Array<{ message: string }>;
      spans: Array<{ namespace: string; procedure: string; ok: boolean }>;
    }>(await call("workflows/run", { name: "echo", input: { n: 21 } }));
    expect(run.status).toBe("succeeded");
    expect(run.result.doubled).toBe(42);
    expect(run.logs[0]?.message).toContain("starting");
    expect(run.spans).toHaveLength(1);
    expect(run.spans[0]).toMatchObject({ namespace: "keyvalue", procedure: "set", ok: true });

    // The script's keyvalue.set landed in the same workspace.
    const kv = await data<{ value: { n: number } }>(
      await call("keyvalue/get", { key: "wf-last-input" }),
    );
    expect(kv.value.n).toBe(21);

    const trace = await data<{ id: string; spans: unknown[] }>(
      await call("workflows/trace", { name: "echo", run_id: run.id }),
    );
    expect(trace.id).toBe(run.id);
    expect(trace.spans).toHaveLength(1);
  });

  it("records failures with the error and partial spans", async () => {
    await writeScript("workflows/boom.js", `export default async () => { throw new Error("kaboom"); };`);
    await call("workflows/register", { name: "boom", script_path: "workflows/boom.js" });
    const run = await data<{ status: string; error: string }>(
      await call("workflows/run", { name: "boom" }),
    );
    expect(run.status).toBe("failed");
    expect(run.error).toContain("kaboom");
  });

  it("serves webhook triggers with the hook token", async () => {
    await writeScript("workflows/hooked.js", `export default async (input) => ({ got: input.ping });`);
    const reg = await data<{ hookToken: string; webhookPath: string }>(
      await call("workflows/register", {
        name: "hooked",
        script_path: "workflows/hooked.js",
        triggers: { webhook: true },
      }),
    );

    const app = createApp();
    const unauthorized = await app.request(reg.webhookPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ping: "pong" }),
    });
    expect(unauthorized.status).toBe(403);

    const ok = await app.request(reg.webhookPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hook-Token": reg.hookToken,
      },
      body: JSON.stringify({ ping: "pong" }),
    });
    expect(ok.status).toBe(200);
    const body = (await ok.json()) as { status: string; result: { got: string } };
    expect(body.status).toBe("succeeded");
    expect(body.result.got).toBe("pong");
  });

  it("triggers event-subscribed workflows on emit (loop-capped)", async () => {
    // reacted re-emits on the same channel it subscribes to — the depth cap
    // must stop the cascade instead of looping forever.
    await writeScript(
      "workflows/reactor.js",
      `export default async function run(input) {
         await keyvalue.set({ key: "reactor-count", value: (input.payload?.count ?? 0) + 1 });
         await events.emit({ channel: "wf.chain", payload: { count: (input.payload?.count ?? 0) + 1 } });
         return "ok";
       }`,
    );
    await call("workflows/register", {
      name: "reactor",
      script_path: "workflows/reactor.js",
      triggers: { events: ["wf.chain"] },
    });

    await call("events/emit", { channel: "wf.chain", payload: { count: 0 } });

    // Runs are async fire-and-forget; poll for completion.
    let runs: Array<{ status: string }> = [];
    for (let i = 0; i < 40; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const res = await data<{ runs: Array<{ status: string }> }>(
        await call("workflows/runs", { name: "reactor" }),
      );
      runs = res.runs;
      if (runs.length >= 2 && runs.every((r) => r.status !== "running")) break;
    }
    // Cascade: user emit (depth 0) → run → its emit (depth 1) → run → its
    // emit (depth 2) → run → emit (depth 3) blocked. 3 runs total.
    expect(runs.length).toBeGreaterThanOrEqual(2);
    expect(runs.length).toBeLessThanOrEqual(3);
  });

  it("removes registrations and their runs", async () => {
    const removed = await data<{ removed: boolean }>(
      await call("workflows/remove", { name: "boom" }),
    );
    expect(removed.removed).toBe(true);
    expect((await call("workflows/get", { name: "boom" })).status).toBe(404);
  });

  it("lists, reads, and restores script versions", async () => {
    const tick = () => new Promise((resolve) => setTimeout(resolve, 2));
    const hashOf = async (res: Response) =>
      ((await res.json()) as { hash: string }).hash;

    const v1 = await hashOf(await writeScript("workflows/vers.js", "export default async () => 1;"));
    await tick();
    await writeScript("workflows/vers.js", "export default async () => 2;");
    await tick();
    const v3 = await hashOf(await writeScript("workflows/vers.js", "export default async () => 3;"));
    await call("workflows/register", { name: "vers", script_path: "workflows/vers.js" });

    // versions: newest-first, current flag on the live (v3) version.
    const listed = await data<{
      path: string;
      versions: Array<{ hash: string; current: boolean; size: number }>;
    }>(await call("workflows/versions", { name: "vers" }));
    expect(listed.path).toBe("workflows/vers.js");
    expect(listed.versions).toHaveLength(3);
    expect(listed.versions[0]).toMatchObject({ hash: v3, current: true });
    expect(listed.versions.slice(1).every((v) => !v.current)).toBe(true);

    // version: read one past version's content by hash.
    const old = await data<{ content: string; hash: string }>(
      await call("workflows/version", { name: "vers", hash: v1 }),
    );
    expect(old.content).toBe("export default async () => 1;");

    // restore: v1 becomes the live version again (append, non-destructive).
    const restored = await data<{ name: string; scriptPath: string }>(
      await call("workflows/restore", { name: "vers", hash: v1 }),
    );
    expect(restored.name).toBe("vers");
    const script = await createApp().request("/fs/workflows/vers.js");
    expect(((await script.json()) as { content: string }).content).toBe("export default async () => 1;");
    const afterRestore = await data<{ versions: Array<{ hash: string; current: boolean }> }>(
      await call("workflows/versions", { name: "vers" }),
    );
    expect(afterRestore.versions[0]).toMatchObject({ hash: v1, current: true });

    // Unknown hash / unknown workflow => 404.
    expect(
      (await call("workflows/version", { name: "vers", hash: "0".repeat(64) })).status,
    ).toBe(404);
    expect(
      (await call("workflows/restore", { name: "vers", hash: "0".repeat(64) })).status,
    ).toBe(404);
    expect((await call("workflows/versions", { name: "ghost" })).status).toBe(404);
  });
});
