/**
 * Native notification surface — covers specs/native-notification-surface.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";
import { DESKTOP_BRIDGE_METHODS } from "../bridge.js";
import {
  buildChoiceDispatchPath,
  createGatewayNotificationClient,
  createNotificationMirror,
  gatewayApiBase,
  type FeedNotification,
  type NotificationPermission,
  type PresentedSystemNotification,
  type SystemNotificationHost,
} from "../notifications.js";

function feedItem(
  partial: Partial<FeedNotification> & Pick<FeedNotification, "id" | "title">,
): FeedNotification {
  return {
    seen: false,
    ...partial,
  };
}

function mockHost(permission: NotificationPermission = "granted"): SystemNotificationHost & {
  shown: Array<{
    id: string;
    title: string;
    body?: string;
    actions: Array<{ text: string }>;
    onAction: (index: number) => void;
    onClick: () => void;
  }>;
  closed: string[];
  permissionRequests: number;
} {
  const shown: Array<{
    id: string;
    title: string;
    body?: string;
    actions: Array<{ text: string }>;
    onAction: (index: number) => void;
    onClick: () => void;
  }> = [];
  const closed: string[] = [];
  return {
    shown,
    closed,
    permissionRequests: 0,
    isSupported: () => true,
    async requestPermission() {
      this.permissionRequests += 1;
      return permission;
    },
    show(input) {
      shown.push(input);
      const handle: PresentedSystemNotification = {
        close: () => {
          closed.push(input.id);
        },
      };
      return handle;
    },
  };
}

describe("buildChoiceDispatchPath", () => {
  it("matches the in-app member tools path", () => {
    expect(
      buildChoiceDispatchPath(
        "local",
        {},
        { call: { namespace: "vcs", procedure: "completeMerge", args: { id: "1" } } },
      ),
    ).toBe("/tools/vcs/completeMerge");
  });

  it("matches the in-app app-surface path (emit-time allow-list re-checked)", () => {
    expect(
      buildChoiceDispatchPath(
        "ws-1",
        { source: { app: "notify-demo" } },
        {
          call: {
            namespace: "keyvalue",
            procedure: "set",
            args: { key: "k", value: 1 },
          },
        },
      ),
    ).toBe("/apps/ws-1/notify-demo/tools/keyvalue/set");
  });
});

describe("createGatewayNotificationClient", () => {
  it("lists, marks seen, and dispatches choices through the gateway API prefix", async () => {
    const calls: Array<{ url: string; body: unknown }> = [];
    const client = createGatewayNotificationClient({
      getGatewayOrigin: () => "http://127.0.0.1:4242",
      workspaceId: "local",
      userSub: "local",
      fetch: async (url, init) => {
        const body = init?.body ? JSON.parse(init.body) : null;
        calls.push({ url, body });
        if (url.endsWith("/tools/notifications/list")) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              data: {
                notifications: [
                  {
                    id: "n1",
                    title: "Hello",
                    body: "World",
                    choices: [
                      {
                        label: "Do it",
                        call: {
                          namespace: "vcs",
                          procedure: "completeMerge",
                          args: { sessionId: "s1" },
                        },
                      },
                    ],
                    seenBy: {},
                  },
                ],
              },
            }),
          };
        }
        return {
          ok: true,
          status: 200,
          json: async () => ({ data: {} }),
        };
      },
    });

    expect(gatewayApiBase("http://127.0.0.1:4242")).toBe(
      "http://127.0.0.1:4242/api/gateway",
    );

    const list = await client.listNotifications();
    expect(list).toEqual([
      {
        id: "n1",
        title: "Hello",
        body: "World",
        choices: [
          {
            label: "Do it",
            call: {
              namespace: "vcs",
              procedure: "completeMerge",
              args: { sessionId: "s1" },
            },
          },
        ],
        source: undefined,
        seen: false,
      },
    ]);

    await client.dispatchChoice(list[0]!, list[0]!.choices![0]!);
    await client.markSeen("n1");

    expect(calls.map((c) => c.url)).toEqual([
      "http://127.0.0.1:4242/api/gateway/tools/notifications/list",
      "http://127.0.0.1:4242/api/gateway/tools/vcs/completeMerge",
      "http://127.0.0.1:4242/api/gateway/tools/notifications/seen",
    ]);
    expect(calls[1]?.body).toEqual({ args: { sessionId: "s1" } });
  });

  it("dispatches app-sourced choices through /apps/…/tools (same path as in-app)", async () => {
    const calls: string[] = [];
    const client = createGatewayNotificationClient({
      getGatewayOrigin: () => "http://127.0.0.1:9",
      workspaceId: "local",
      fetch: async (url) => {
        calls.push(url);
        return { ok: true, status: 200, json: async () => ({ data: {} }) };
      },
    });
    await client.dispatchChoice(
      {
        id: "n",
        title: "t",
        source: { app: "demo" },
      },
      {
        label: "Go",
        call: { namespace: "keyvalue", procedure: "set", args: { key: "a" } },
      },
    );
    expect(calls[0]).toBe(
      "http://127.0.0.1:9/api/gateway/apps/local/demo/tools/keyvalue/set",
    );
  });
});

describe("createNotificationMirror", () => {
  it("presents new feed items with title and body (window may be in background)", async () => {
    const host = mockHost();
    const feed = [
      feedItem({ id: "a", title: "Decision", body: "Please review" }),
    ];
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => feed,
        markSeen: async () => {},
        dispatchChoice: async () => {},
      },
      pollIntervalMs: 60_000,
    });
    await mirror.syncNow();
    expect(host.shown).toHaveLength(1);
    expect(host.shown[0]).toMatchObject({
      id: "a",
      title: "Decision",
      body: "Please review",
      actions: [],
    });
    expect(mirror.presentedIds()).toEqual(["a"]);
  });

  it("does not alter feed ownership — mirror only presents (feed remains source of truth)", async () => {
    const host = mockHost();
    const feed = [feedItem({ id: "keep", title: "Still here", seen: false })];
    let listCalls = 0;
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => {
          listCalls += 1;
          return feed;
        },
        markSeen: async () => {
          throw new Error("mirror must not mark seen on present");
        },
        dispatchChoice: async () => {},
      },
    });
    await mirror.syncNow();
    expect(listCalls).toBe(1);
    expect(feed[0]?.seen).toBe(false);
    expect(host.shown).toHaveLength(1);
  });

  it("maps choices to actions and dispatches via the gateway client on activate", async () => {
    const host = mockHost();
    const choice = {
      label: "Approve",
      call: {
        namespace: "vcs",
        procedure: "completeMerge",
        args: { sessionId: "s" },
      },
    };
    const item = feedItem({
      id: "c1",
      title: "Merge?",
      choices: [choice],
    });
    const dispatched: unknown[] = [];
    const seen: string[] = [];
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => [item],
        markSeen: async (id) => {
          seen.push(id);
        },
        dispatchChoice: async (n, c) => {
          dispatched.push({ id: n.id, path: buildChoiceDispatchPath("local", n, c), call: c.call });
        },
      },
    });
    await mirror.syncNow();
    expect(host.shown[0]?.actions).toEqual([{ text: "Approve" }]);
    host.shown[0]!.onAction(0);
    await vi.waitFor(() => expect(host.closed).toContain("c1"));
    expect(dispatched[0]).toEqual({
      id: "c1",
      path: "/tools/vcs/completeMerge",
      call: choice.call,
    });
    expect(seen).toEqual(["c1"]);
  });

  it("presents app-sourced choices without inventing a second dispatch path", async () => {
    const host = mockHost();
    const item = feedItem({
      id: "app-1",
      title: "App ask",
      source: { app: "notify-demo" },
      choices: [
        {
          label: "Run",
          call: { namespace: "keyvalue", procedure: "set", args: { key: "x" } },
        },
      ],
    });
    const paths: string[] = [];
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => [item],
        markSeen: async () => {},
        dispatchChoice: async (n, c) => {
          paths.push(buildChoiceDispatchPath("local", n, c));
        },
      },
    });
    await mirror.syncNow();
    host.shown[0]!.onAction(0);
    await vi.waitFor(() => expect(paths).toEqual(["/apps/local/notify-demo/tools/keyvalue/set"]));
  });

  it("opens the application when a no-choice notification is activated", async () => {
    const host = mockHost();
    const opened: string[] = [];
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => [
          feedItem({ id: "plain", title: "FYI", body: "no actions" }),
        ],
        markSeen: async () => {},
        dispatchChoice: async () => {},
      },
      onOpenNotification: (id) => {
        opened.push(id);
      },
    });
    await mirror.syncNow();
    expect(host.shown[0]?.actions).toEqual([]);
    host.shown[0]!.onClick();
    expect(opened).toEqual(["plain"]);
  });

  it("withdraws a system notification when the feed marks it seen", async () => {
    const host = mockHost();
    let feed = [feedItem({ id: "w1", title: "Unread" })];
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => feed,
        markSeen: async () => {},
        dispatchChoice: async () => {},
      },
    });
    await mirror.syncNow();
    expect(mirror.presentedIds()).toEqual(["w1"]);

    feed = [{ ...feed[0]!, seen: true }];
    await mirror.syncNow();
    expect(host.closed).toContain("w1");
    expect(mirror.presentedIds()).toEqual([]);
  });

  it("does not present the same notification twice on refresh", async () => {
    const host = mockHost();
    const feed = [feedItem({ id: "dup", title: "Once" })];
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => feed,
        markSeen: async () => {},
        dispatchChoice: async () => {},
      },
    });
    await mirror.syncNow();
    await mirror.syncNow();
    expect(host.shown).toHaveLength(1);
    expect(mirror.presentedIds()).toEqual(["dup"]);
  });

  it("requests authorization on first use and treats denial as a non-fatal loss", async () => {
    const host = mockHost("denied");
    const mirror = createNotificationMirror({
      host,
      gateway: {
        listNotifications: async () => {
          throw new Error("must not list when denied");
        },
        markSeen: async () => {},
        dispatchChoice: async () => {},
      },
    });
    await mirror.syncNow();
    expect(host.permissionRequests).toBe(1);
    expect(mirror.permission()).toBe("denied");
    expect(host.shown).toHaveLength(0);

    // Second sync does not re-prompt.
    await mirror.syncNow();
    expect(host.permissionRequests).toBe(1);
  });

  it("adds no bindable notification-delivery interface", () => {
    // Spec: "Native presentation is not a delivery contract".
    expect(DESKTOP_BRIDGE_METHODS.some((m) => /notif/i.test(m))).toBe(false);

    const interfacesPath = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../../../server/workspace/src/interfaces.ts",
    );
    const src = fs.readFileSync(interfacesPath, "utf8");
    const match = src.match(/INTERFACE_ORDER\s*=\s*\[([^\]]+)\]/);
    expect(match).toBeTruthy();
    const ids = match![1]!
      .split(",")
      .map((s) => s.trim().replace(/['"]/g, ""))
      .filter(Boolean);
    expect(ids.filter((id) => /notif/i.test(id))).toEqual([]);
    expect(ids).not.toContain("notify");
  });
});
