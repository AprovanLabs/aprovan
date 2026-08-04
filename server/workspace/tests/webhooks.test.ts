import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-webhooks-"));
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

/** Seed a workflow that records its input. */
async function seedWorkflow(name: string): Promise<void> {
  await createApp().request(`/fs/workflows/${name}.js`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `export default async function run(input) {
  await tools.keyvalue.set({ key: "${name}-last", value: input });
  return { seen: true };
}`,
    }),
  });
  await manage("workflows/register", { name, script_path: `workflows/${name}.js` });
}

describe("provider webhooks", () => {
  it("registers a webhook and rejects unknown workflows", async () => {
    await seedWorkflow("wh-target");

    expect(
      (await manage("webhooks/register", { id: "bad", provider: "github", workflows: ["nope"] }))
        .status,
    ).toBe(400);

    const res = await manage("webhooks/register", {
      id: "github-pushes",
      provider: "github",
      events: ["push"],
      workflows: ["wh-target"],
    });
    expect(res.status).toBe(200);
    const registered = await data<{ hookPath: string; token: string }>(res);
    expect(registered.hookPath).toBe("/hooks/local/webhooks/github-pushes");
    expect(registered.token).toBeTruthy();
  });

  it("delivers with the token, fans out to workflows, and records stats", async () => {
    await seedWorkflow("wh-target");
    const registered = await data<{ token: string }>(
      await manage("webhooks/register", {
        id: "hook-a",
        provider: "github",
        workflows: ["wh-target"],
      }),
    );

    const delivery = await createApp().request(
      `/hooks/local/webhooks/hook-a?token=${registered.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-GitHub-Event": "push" },
        body: JSON.stringify({ ref: "refs/heads/main" }),
      },
    );
    expect(delivery.status).toBe(200);
    const body = (await delivery.json()) as {
      event: string;
      matched: boolean;
      runs: Array<{ workflow: string; status: string }>;
    };
    expect(body.event).toBe("push");
    expect(body.matched).toBe(true);
    expect(body.runs).toEqual([{ workflow: "wh-target", runId: expect.any(String), status: "succeeded" }]);

    // The workflow saw { provider, event, payload }.
    const last = await data<{ value: { provider: string; event: string; payload: { ref: string } } }>(
      await manage("keyvalue/get", { key: "wh-target-last" }),
    );
    expect(last.value.provider).toBe("github");
    expect(last.value.event).toBe("push");
    expect(last.value.payload.ref).toBe("refs/heads/main");

    // Delivery stats written back.
    const stats = await data<{ deliveryCount: number; lastEvent: string }>(
      await manage("webhooks/get", { id: "hook-a" }),
    );
    expect(stats.deliveryCount).toBe(1);
    expect(stats.lastEvent).toBe("push");
  });

  it("rejects deliveries without a valid token", async () => {
    await seedWorkflow("wh-target");
    await manage("webhooks/register", {
      id: "hook-b",
      provider: "github",
      workflows: ["wh-target"],
    });

    const res = await createApp().request("/hooks/local/webhooks/hook-b?token=wrong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    expect(res.status).toBe(403);
  });

  it("verifies HMAC signatures over the raw body when configured", async () => {
    await seedWorkflow("wh-target");
    await manage("webhooks/register", {
      id: "hook-signed",
      provider: "github",
      workflows: ["wh-target"],
      signature: { header: "X-Hub-Signature-256", scheme: "hmac-sha256", secret: "s3cret" },
    });

    const payload = JSON.stringify({ action: "opened" });
    const digest = createHmac("sha256", "s3cret").update(payload).digest("hex");

    const ok = await createApp().request("/hooks/local/webhooks/hook-signed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hub-Signature-256": `sha256=${digest}`,
      },
      body: payload,
    });
    expect(ok.status).toBe(200);

    // Wrong signature — and note the token is NOT accepted as a fallback
    // once a signature is configured.
    const bad = await createApp().request("/hooks/local/webhooks/hook-signed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hub-Signature-256": "sha256=deadbeef",
      },
      body: payload,
    });
    expect(bad.status).toBe(403);
  });

  it("acknowledges but does not run unlisted events", async () => {
    await seedWorkflow("wh-target");
    const registered = await data<{ token: string }>(
      await manage("webhooks/register", {
        id: "hook-filtered",
        provider: "github",
        events: ["push"],
        workflows: ["wh-target"],
      }),
    );

    const res = await createApp().request(
      `/hooks/local/webhooks/hook-filtered?token=${registered.token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-GitHub-Event": "ping" },
        body: JSON.stringify({ zen: "Design for failure." }),
      },
    );
    expect(res.status).toBe(200);
    const body = (await res.json()) as { matched: boolean; runs: unknown[] };
    expect(body.matched).toBe(false);
    expect(body.runs).toEqual([]);
  });

  it("lists and removes registrations", async () => {
    await seedWorkflow("wh-target");
    await manage("webhooks/register", {
      id: "hook-tmp",
      provider: "figma",
      workflows: ["wh-target"],
    });

    const list = await data<{ webhooks: Array<{ id: string; provider: string }> }>(
      await manage("webhooks/list", { provider: "figma" }),
    );
    expect(list.webhooks.map((w) => w.id)).toContain("hook-tmp");

    const removed = await data<{ removed: boolean }>(
      await manage("webhooks/remove", { id: "hook-tmp" }),
    );
    expect(removed.removed).toBe(true);

    const gone = await createApp().request("/hooks/local/webhooks/hook-tmp?token=x", {
      method: "POST",
      body: "{}",
    });
    expect(gone.status).toBe(404);
  });

  it("surfaces the UTDK webhook intel catalogue via providers", async () => {
    const res = await manage("webhooks/providers", {});
    expect(res.status).toBe(200);
    const body = await data<{
      providers: Array<{
        provider: string;
        supported: boolean;
        summary: string;
        events: Array<{ id: string; description?: string }>;
        signature?: { header: string; scheme: string };
        setupSteps: Array<{ title: string; detail: string }>;
      }>;
    }>(res);

    // Providers without a bundler-generated webhooks.json are absent, not errored.
    expect(body.providers.find((p) => p.provider === "asana")).toBeUndefined();

    const github = body.providers.find((p) => p.provider === "github");
    expect(github).toBeDefined();
    expect(github?.supported).toBe(true);
    expect(github?.signature).toEqual({ header: "X-Hub-Signature-256", scheme: "hmac-sha256" });
    expect(github?.events.length).toBeGreaterThan(0);
    expect(github?.events[0]).toHaveProperty("id");
    expect(github?.setupSteps.length).toBeGreaterThan(0);
  });
});
