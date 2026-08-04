import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-services-"));
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

describe("core service namespaces", () => {
  it("keyvalue set/get/list/delete round-trips", async () => {
    const set = await call("keyvalue/set", { key: "draft", value: { a: 1 } });
    expect(set.status).toBe(200);

    const get = await call("keyvalue/get", { key: "draft" });
    expect(((await get.json()) as { data: { value: unknown } }).data.value).toEqual({ a: 1 });

    const list = await call("keyvalue/list", {});
    const listKeys = ((await list.json()) as { data: { keys: Array<string | { key: string }> } })
      .data.keys;
    const names = listKeys.map((row) => (typeof row === "string" ? row : row.key));
    expect(names).toContain("draft");

    const del = await call("keyvalue/delete", { key: "draft" });
    expect(((await del.json()) as { data: { deleted: boolean } }).data.deleted).toBe(true);

    const missing = await call("keyvalue/get", { key: "draft" });
    expect(((await missing.json()) as { data: { value: unknown } }).data.value).toBeNull();
  });

  it("events emit/list preserves order and attribution", async () => {
    await call("events/emit", { channel: "form.submitted", payload: { n: 1 } });
    await call("events/emit", { channel: "form.submitted", payload: { n: 2 } });

    const res = await call("events/list", { channel: "form.submitted" });
    const { data } = (await res.json()) as {
      data: { events: Array<{ payload: { n: number }; userId: string; id: string }> };
    };
    expect(data.events.map((e) => e.payload.n)).toEqual([1, 2]);
    expect(data.events[0]?.id).toBeTruthy();
  });

  it("rejects malformed keys and unknown procedures", async () => {
    expect((await call("keyvalue/set", { key: "../escape", value: 1 })).status).toBe(400);
    expect((await call("keyvalue/nope", { key: "x" })).status).toBe(404);
  });

  it("advertises core tools in discovery", async () => {
    const res = await createApp().request("/tools");
    const { tools } = (await res.json()) as { tools: Array<{ provider: string }> };
    const providers = new Set(tools.map((t) => t.provider));
    expect(providers.has("keyvalue")).toBe(true);
    expect(providers.has("events")).toBe(true);
  });
});
