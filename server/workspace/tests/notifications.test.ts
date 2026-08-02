/**
 * The notifications core service: record-store backed (not the file plane),
 * per-user seen state with expiry, and the app permission model — an app can
 * only embed notification choices whose calls it could make itself.
 */

import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { resetRateLimiters } from "../src/middleware/rateLimitMiddleware.js";
import { resetAppRateLimiters } from "../src/routes/apps.js";

let dataDir: string;

beforeAll(() => {
  dataDir = mkdtempSync(join(tmpdir(), "gateway-notifications-"));
  process.env["WORKSPACE_DATA_DIR"] = dataDir;
});

afterAll(() => {
  delete process.env["WORKSPACE_DATA_DIR"];
  rmSync(dataDir, { recursive: true, force: true });
});

beforeEach(() => {
  resetRateLimiters();
  resetAppRateLimiters();
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

const appCall = (user: string, path: string, args: Record<string, unknown> = {}) =>
  createApp().request(`/apps/local/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-User": user },
    body: JSON.stringify({ args }),
  });

async function data<T>(res: Response): Promise<T> {
  const body = (await res.json()) as { data: T };
  return body.data;
}

interface Emitted {
  notification: { id: string; category: string; source?: { app: string }; user?: string };
}

describe("notifications (member)", () => {
  it("emits, lists newest first, and hides seen with a TTL", async () => {
    await data<Emitted>(await manage("notifications/emit", { title: "First", category: "warning" }));
    const second = await data<Emitted>(
      await manage("notifications/emit", { title: "Second", category: "decision" }),
    );

    const listing = await data<{ notifications: Array<{ id: string; title: string }> }>(
      await manage("notifications/list", {}),
    );
    expect(listing.notifications[0]?.title).toBe("Second");
    expect(listing.notifications.length).toBeGreaterThanOrEqual(2);

    await manage("notifications/seen", { id: second.notification.id });
    const afterSeen = await data<{ notifications: Array<{ title: string }> }>(
      await manage("notifications/list", {}),
    );
    expect(afterSeen.notifications.some((n) => n.title === "Second")).toBe(false);

    const withSeen = await data<{ notifications: Array<{ title: string }> }>(
      await manage("notifications/list", { include_seen: true }),
    );
    expect(withSeen.notifications.some((n) => n.title === "Second")).toBe(true);

    await manage("notifications/seen", { all: true });
    const cleared = await data<{ notifications: unknown[] }>(
      await manage("notifications/list", {}),
    );
    expect(cleared.notifications).toHaveLength(0);
  });
});

describe("notifications (app permission model)", () => {
  beforeAll(async () => {
    await putFile("apps/notify-demo/index.tsx", "export default function App(){return null}");
    await putFile("workflows/notify-demo-accept.js", "export default async () => ({ ok: true });");
    await manage("workflows/register", {
      name: "notify-demo-accept",
      script_path: "workflows/notify-demo-accept.js",
    });
    const published = await manage("apps/publish", {
      name: "notify-demo",
      entry: "apps/notify-demo/index.tsx",
      workflows: ["notify-demo-accept"],
      allowed_tools: ["keyvalue.*", "notifications.*"],
    });
    expect(published.status).toBe(200);
  });

  it("allows choices the app itself could call (own workflow, allow-listed native)", async () => {
    const res = await appCall("alice", "notify-demo/tools/notifications/emit", {
      title: "Review the thing",
      category: "decision",
      choices: [
        {
          label: "Accept",
          call: { namespace: "app", procedure: "notifyDemoAccept", args: {} },
        },
        {
          label: "Stash",
          call: { namespace: "keyvalue", procedure: "set", args: { key: "x", value: 1 } },
        },
      ],
    });
    expect(res.status).toBe(200);
    const { notification } = await data<Emitted>(res);
    // Provenance is server-stamped, targeted at the app's own user.
    expect(notification.source).toEqual({ app: "notify-demo" });
    expect(notification.user).toBe("alice");
  });

  it("rejects a choice calling a tool outside the app's reach", async () => {
    const provider = await appCall("alice", "notify-demo/tools/notifications/emit", {
      title: "Sneaky",
      choices: [
        { label: "Exfiltrate", call: { namespace: "github", procedure: "repos.get", args: {} } },
      ],
    });
    expect(provider.status).toBe(403);

    const native = await appCall("alice", "notify-demo/tools/notifications/emit", {
      title: "Sneakier",
      choices: [
        { label: "Write files", call: { namespace: "vfs", procedure: "write", args: {} } },
      ],
    });
    expect(native.status).toBe(403);

    const memberOnly = await appCall("alice", "notify-demo/tools/notifications/emit", {
      title: "Sneakiest",
      choices: [
        {
          label: "Merge something",
          call: { namespace: "sessions", procedure: "resolve", args: {} },
        },
      ],
    });
    expect(memberOnly.status).toBe(403);
  });

  it("scopes app listings to the app's own user", async () => {
    await appCall("bob", "notify-demo/tools/notifications/emit", { title: "For bob" });

    const bobs = await data<{ notifications: Array<{ title: string }> }>(
      await appCall("bob", "notify-demo/tools/notifications/list", {}),
    );
    expect(bobs.notifications.some((n) => n.title === "For bob")).toBe(true);
    expect(bobs.notifications.some((n) => n.title === "Review the thing")).toBe(false);

    // The member view sees their own feed, not bob's app notifications.
    const member = await data<{ notifications: Array<{ title: string }> }>(
      await manage("notifications/list", { include_seen: true }),
    );
    expect(member.notifications.some((n) => n.title === "For bob")).toBe(false);
  });
});
