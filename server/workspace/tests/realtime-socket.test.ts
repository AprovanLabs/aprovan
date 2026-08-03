/**
 * Realtime socket transport — covers every scenario in
 * openspec/changes/presence-realtime/specs/realtime-socket/spec.md.
 */

import { createServer, type Server as HttpServer } from "node:http";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WebSocket } from "ws";
import { createBroker, type NamespaceHandler } from "../src/realtime/broker.js";
import type { Principal } from "../src/middleware/auth.js";
import {
  attachRealtime,
  REALTIME_PATH,
  REALTIME_SUBPROTOCOL,
  type RealtimeHandle,
} from "../src/realtime/socket.js";
import type { ServerMessage } from "../src/realtime/protocol.js";
import { resetCognitoVerifier, setCognitoVerifier } from "../src/middleware/auth.js";

const PATH = REALTIME_PATH;

function principal(overrides: Partial<Principal> = {}): Principal {
  return {
    sub: "user-a",
    workspaceId: "ws-a",
    role: "member",
    groupIds: [],
    ...overrides,
  };
}

function relayHandler(broker: ReturnType<typeof createBroker>): NamespaceHandler {
  return {
    namespace: "relay",
    onSubscribe() {
      return {};
    },
    onPublish(conn, topic, body) {
      broker.publishToTopic(conn.workspaceId, topic, body, { except: conn });
    },
    onDisconnect() {},
  };
}

async function listen(): Promise<{ server: HttpServer; port: number }> {
  const server = createServer((_req, res) => {
    res.writeHead(426, { "Content-Type": "text/plain" });
    res.end("Upgrade Required");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const addr = server.address();
  if (!addr || typeof addr === "string") throw new Error("no port");
  return { server, port: addr.port };
}

function openWs(
  port: number,
  opts: {
    protocols?: string | string[];
    headers?: Record<string, string>;
  } = {},
): Promise<WebSocket> {
  const protocols = opts.protocols ?? [REALTIME_SUBPROTOCOL, "bearer.test-token"];
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}${PATH}`, protocols, {
      headers: opts.headers,
    });
    ws.once("open", () => resolve(ws));
    ws.once("error", reject);
    ws.once("unexpected-response", (_req, res) => {
      reject(Object.assign(new Error(`upgrade ${res.statusCode}`), { statusCode: res.statusCode }));
    });
  });
}

function nextMessage(ws: WebSocket, timeoutMs = 2_000): Promise<ServerMessage> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("message timeout")), timeoutMs);
    ws.once("message", (data) => {
      clearTimeout(timer);
      resolve(JSON.parse(data.toString()) as ServerMessage);
    });
  });
}

function waitClose(ws: WebSocket, timeoutMs = 2_000): Promise<{ code: number }> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("close timeout")), timeoutMs);
    ws.once("close", (code) => {
      clearTimeout(timer);
      resolve({ code });
    });
  });
}

describe("realtime-socket", () => {
  let server: HttpServer;
  let port: number;
  let handle: RealtimeHandle;

  afterEach(async () => {
    handle?.close();
    resetCognitoVerifier();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  describe("auth (oidc)", () => {
    beforeEach(async () => {
      process.env["OIDC_ISSUER"] =
        "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_realtimetest";
      process.env["OIDCAUDIENCE"] = "realtime-test-client";
      setCognitoVerifier({
        verify: vi.fn().mockImplementation((token: string) => {
          if (token === "valid-a") return Promise.resolve({ sub: "user-a", exp: Math.floor(Date.now() / 1000) + 3600 });
          if (token === "valid-b") return Promise.resolve({ sub: "user-b", exp: Math.floor(Date.now() / 1000) + 3600 });
          if (token === "expired") return Promise.resolve({ sub: "user-a", exp: Math.floor(Date.now() / 1000) - 10 });
          throw new Error("invalid token");
        }),
        hydrate: vi.fn().mockResolvedValue(undefined),
      });

      const listened = await listen();
      server = listened.server;
      port = listened.port;
    });

    afterEach(() => {
      delete process.env["OIDC_ISSUER"];
      delete process.env["OIDCAUDIENCE"];
    });

    it("valid token upgrades with aprovan.v1", async () => {
      const principals = new Map([
        ["valid-a", principal({ sub: "user-a", workspaceId: "ws-a" })],
      ]);
      handle = attachRealtime(server, {
        authenticate: async (_req, protocols) => {
          if (!protocols.includes(REALTIME_SUBPROTOCOL)) return null;
          const bearer = protocols.find((p) => p.startsWith("bearer."));
          if (!bearer) return null;
          const token = bearer.slice("bearer.".length);
          const p = principals.get(token);
          if (!p) return null;
          return { principal: p, exp: Math.floor(Date.now() / 1000) + 3600 };
        },
      });

      const ws = await openWs(port, {
        protocols: [REALTIME_SUBPROTOCOL, "bearer.valid-a"],
      });
      expect(ws.protocol).toBe(REALTIME_SUBPROTOCOL);
      ws.close();
    });

    it("invalid or absent token is rejected with 401 before open", async () => {
      handle = attachRealtime(server, {
        authenticate: async () => null,
      });

      await expect(
        openWs(port, { protocols: [REALTIME_SUBPROTOCOL, "bearer.bad"] }),
      ).rejects.toMatchObject({ statusCode: 401 });

      await expect(
        openWs(port, { protocols: [REALTIME_SUBPROTOCOL] }),
      ).rejects.toMatchObject({ statusCode: 401 });
    });

    it("closes with 1008 when the upgrade token expires", async () => {
      const exp = Math.floor(Date.now() / 1000) + 1;
      let clock = Date.now();
      handle = attachRealtime(server, {
        now: () => clock,
        authenticate: async () => ({
          principal: principal(),
          exp,
        }),
      });

      const ws = await openWs(port);
      const closed = waitClose(ws);
      // Advance past exp.
      clock = (exp + 1) * 1000;
      // Force the timer: re-check by closing via a short real wait if needed.
      // The attachRealtime schedules setTimeout(msLeft) at connect using now().
      // Since now() returned Date.now() at schedule time with exp+1s, wait for it.
      const { code } = await closed;
      expect(code).toBe(1008);
    });
  });

  describe("protocol (auth-none / injected principal)", () => {
    let broker: ReturnType<typeof createBroker>;

    beforeEach(async () => {
      delete process.env["OIDC_ISSUER"];
      delete process.env["OIDCAUDIENCE"];
      const listened = await listen();
      server = listened.server;
      port = listened.port;
      broker = createBroker();
      broker.registerNamespace(relayHandler(broker));
    });

    function attachWithAuth(
      resolve: (protocols: string[]) => { principal: Principal; exp?: number } | null,
      opts: { pingIntervalMs?: number; maxMissedPongs?: number } = {},
    ): void {
      handle = attachRealtime(server, {
        broker,
        pingIntervalMs: opts.pingIntervalMs,
        maxMissedPongs: opts.maxMissedPongs,
        authenticate: async (_req, protocols) => {
          if (!protocols.includes(REALTIME_SUBPROTOCOL)) return null;
          return resolve(protocols);
        },
      });
    }

    it("none-mode synthetic principal upgrades", async () => {
      handle = attachRealtime(server, { broker });
      const ws = await openWs(port, {
        protocols: [REALTIME_SUBPROTOCOL, "bearer.anything"],
      });
      expect(ws.protocol).toBe(REALTIME_SUBPROTOCOL);
      ws.close();
    });

    it("does not deliver events across workspaces", async () => {
      attachWithAuth((protocols) => {
        const token = protocols.find((p) => p.startsWith("bearer."))?.slice(7);
        if (token === "a") return { principal: principal({ sub: "a", workspaceId: "ws-a" }) };
        if (token === "b") return { principal: principal({ sub: "b", workspaceId: "ws-b" }) };
        return null;
      });

      const wsA = await openWs(port, { protocols: [REALTIME_SUBPROTOCOL, "bearer.a"] });
      const wsB = await openWs(port, { protocols: [REALTIME_SUBPROTOCOL, "bearer.b"] });

      wsA.send(JSON.stringify({ type: "subscribe", topic: "relay:shared" }));
      expect((await nextMessage(wsA)).type).toBe("subscribed");

      wsB.send(JSON.stringify({ type: "subscribe", topic: "relay:shared" }));
      expect((await nextMessage(wsB)).type).toBe("subscribed");

      const bEvents: ServerMessage[] = [];
      wsB.on("message", (d) => bEvents.push(JSON.parse(d.toString()) as ServerMessage));

      wsA.send(JSON.stringify({ type: "publish", topic: "relay:shared", body: { n: 1 } }));

      // Give the broker a tick; B must receive nothing.
      await new Promise((r) => setTimeout(r, 50));
      expect(bEvents.filter((m) => m.type === "event")).toHaveLength(0);

      wsA.close();
      wsB.close();
    });

    it("subscribe → publish → event with no self-echo", async () => {
      attachWithAuth(() => ({ principal: principal() }));

      const wsX = await openWs(port, { protocols: [REALTIME_SUBPROTOCOL, "bearer.x"] });
      const wsY = await openWs(port, { protocols: [REALTIME_SUBPROTOCOL, "bearer.y"] });

      // Bind both to same workspace via authenticate above.
      wsX.send(JSON.stringify({ type: "subscribe", topic: "relay:notes" }));
      expect((await nextMessage(wsX)).type).toBe("subscribed");

      wsY.send(JSON.stringify({ type: "subscribe", topic: "relay:notes" }));
      expect((await nextMessage(wsY)).type).toBe("subscribed");

      const yWait = nextMessage(wsX);

      // Y publishes; X should receive; Y should not echo.
      const ySelf: ServerMessage[] = [];
      wsY.on("message", (d) => ySelf.push(JSON.parse(d.toString()) as ServerMessage));

      wsY.send(JSON.stringify({ type: "publish", topic: "relay:notes", body: { hi: true } }));

      const event = await yWait;
      expect(event).toEqual({ type: "event", topic: "relay:notes", body: { hi: true } });

      await new Promise((r) => setTimeout(r, 30));
      expect(ySelf.filter((m) => m.type === "event")).toHaveLength(0);

      wsX.close();
      wsY.close();
    });

    it("malformed frame does not kill the connection", async () => {
      attachWithAuth(() => ({ principal: principal() }));
      const ws = await openWs(port);

      ws.send("not-json");
      const err = await nextMessage(ws);
      expect(err).toMatchObject({ type: "error", code: "bad-message" });

      ws.send(JSON.stringify({ type: "subscribe", topic: "relay:ok" }));
      const sub = await nextMessage(ws);
      expect(sub).toMatchObject({ type: "subscribed", topic: "relay:ok" });
      expect(ws.readyState).toBe(WebSocket.OPEN);
      ws.close();
    });

    it("reserved vs unknown namespace error codes", async () => {
      attachWithAuth(() => ({ principal: principal() }));
      const ws = await openWs(port);

      ws.send(JSON.stringify({ type: "subscribe", topic: "doc:notes/plan.md" }));
      expect(await nextMessage(ws)).toMatchObject({
        type: "error",
        code: "reserved-namespace",
      });

      ws.send(JSON.stringify({ type: "subscribe", topic: "fs:changes" }));
      expect(await nextMessage(ws)).toMatchObject({
        type: "error",
        code: "reserved-namespace",
      });

      ws.send(JSON.stringify({ type: "subscribe", topic: "bogus:thing" }));
      expect(await nextMessage(ws)).toMatchObject({
        type: "error",
        code: "unknown-namespace",
      });

      // No subscription state for reserved/unknown — a later relay subscribe works.
      ws.send(JSON.stringify({ type: "subscribe", topic: "relay:x" }));
      expect((await nextMessage(ws)).type).toBe("subscribed");
      ws.close();
    });

    it("reaps a dead socket after missed pongs and cleans up", async () => {
      const disconnected: string[] = [];
      broker.registerNamespace({
        namespace: "track",
        onSubscribe() {
          return {};
        },
        onPublish() {},
        onDisconnect(conn) {
          disconnected.push(conn.id);
        },
      });

      attachWithAuth(() => ({ principal: principal() }), {
        pingIntervalMs: 30,
        maxMissedPongs: 2,
      });

      // autoPong: false — client must not answer server pings (ws ≥8).
      const ws = await new Promise<WebSocket>((resolve, reject) => {
        const sock = new WebSocket(`ws://127.0.0.1:${port}${PATH}`, [
          REALTIME_SUBPROTOCOL,
          "bearer.test-token",
        ], { autoPong: false });
        sock.once("open", () => resolve(sock));
        sock.once("error", reject);
        sock.once("unexpected-response", (_req, res) => {
          reject(Object.assign(new Error(`upgrade ${res.statusCode}`), { statusCode: res.statusCode }));
        });
      });

      ws.send(JSON.stringify({ type: "subscribe", topic: "track:t" }));
      expect((await nextMessage(ws)).type).toBe("subscribed");

      await waitClose(ws, 5_000);

      // Allow the server close handler to run.
      await vi.waitFor(() => {
        expect(disconnected.length).toBeGreaterThanOrEqual(1);
      }, { timeout: 1_000 });
    });
  });
});
