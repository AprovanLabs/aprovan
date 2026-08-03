/**
 * Phase-B record moves (specs/record-store, "No subsystem writes service
 * files"): exercising every subsystem leaves the FS store free of new
 * `.services/**` paths except staged-session shadow content (and the legacy
 * `.services/bindings.json` tombstone, which dies with WS-3 Profiles), and
 * each subsystem's state is readable through the record store under its
 * `svc#<subsystem>` scope.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { getFsStore } from "../src/fs-store.js";
import { getRecordStore } from "../src/records.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-svc-records-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

const manage = (path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/tools/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ args }),
  });

const putFile = (path: string, content: string, session?: string) =>
  createApp().request(`/fs/${path}${session ? `?session=${session}` : ""}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

describe("no subsystem writes service files", () => {
  it("exercises chat, vcs, workflows, webhooks, agents, sandboxes, sync, events, apps, keyvalue — and the FS stays clean", async () => {
    // Authored content + a commit (vcs).
    await putFile("widgets/x.ts", "export const x = 1;");
    await manage("vfs/commit", { message: "seed" });

    // Chat with a staged shadow write.
    const created = await data<{ session: { id: string } }>(
      await manage("sessions/create", { title: "probe", mode: "staged" }),
    );
    await manage("sessions/append", {
      id: created.session.id,
      messages: [{ id: "m1", role: "user", parts: [] }],
    });
    await putFile("scratch/x.md", "shadow", created.session.id);

    // Workflows (registration + run) and webhooks.
    await putFile("workflows/probe.js", "return 1;");
    await manage("workflows/register", { name: "probe", script_path: "workflows/probe.js" });
    await manage("workflows/run", { name: "probe" });
    await manage("webhooks/register", {
      id: "probe-hook",
      provider: "github",
      workflows: ["probe"],
    });

    // Agents, sandbox defaults, sync (scheduled — inline companion script),
    // events, keyvalue, workspace-level app publish.
    await manage("agents/create", { name: "probe-agent" });
    await manage("sandboxes/defaults", { mounts: [] });
    await manage("sync/register", {
      name: "probe-sync",
      source: { tool: "vfs.list" },
      sink: { path: "data/probe.json" },
      schedule: "0 6 * * *",
    });
    await manage("events/emit", { channel: "probe.channel", payload: { n: 1 } });
    await manage("keyvalue/set", { key: "probe", value: 42 });
    await manage("apps/publish", {
      name: "probe-app",
      entry: "widgets/x.ts",
      allowed_tools: ["keyvalue.*"],
    });

    // Everything is readable through its svc# scope...
    const records = getRecordStore();
    expect(await records.list("local", "svc#workflows")).toContain("probe");
    expect(await records.list("local", "svc#webhooks")).toContain("probe-hook");
    expect(await records.list("local", "svc#agents")).toContain("probe-agent");
    expect(await records.list("local", "svc#sync")).toContain("probe-sync");
    expect((await records.list("local", "svc#events#probe.channel")).length).toBe(1);
    const appKeys = await records.list("local", "svc#apps");
    expect(appKeys.some((key) => /^[0-9A-HJKMNP-TV-Z]{26}$/.test(key))).toBe(true);
    expect(await records.list("local", "svc#apps#alias")).toContain("probe-app");
    expect(await records.list("local", "svc#chat#sessions")).toContain(created.session.id);
    expect((await records.list("local", "svc#vcs#commits")).length).toBeGreaterThan(0);
    expect((await records.list("local", "svc#workflows#runs#probe")).length).toBe(1);

    // ...and the `.services/**` file namespace holds nothing new: only
    // staged-session shadow content (file content by nature).
    const { listAll } = await import("../src/fs-store.js");
    const files = await listAll(getFsStore(), "local", ".services");
    const residue = files
      .map((entry) => entry.path)
      .filter((path) => !/^\.services\/chat\/sessions\/[^/]+\/files\//.test(path))
      .filter((path) => path !== ".services/bindings.json");
    expect(residue).toEqual([]);
  });

  it("events append one record per emit, replayable oldest-first", async () => {
    await manage("events/emit", { channel: "seq.probe", payload: { n: 1 } });
    await manage("events/emit", { channel: "seq.probe", payload: { n: 2 } });
    const listed = await data<{ events: Array<{ payload: { n: number } }> }>(
      await manage("events/list", { channel: "seq.probe" }),
    );
    expect(listed.events.map((event) => event.payload.n)).toEqual([1, 2]);
    const keys = await getRecordStore().list("local", "svc#events#seq.probe");
    expect(keys).toHaveLength(2);
    expect(keys[0]! < keys[1]!).toBe(true);
  });
});
