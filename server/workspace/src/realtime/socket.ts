/**
 * WebSocket transport for the realtime broker (tech-plan D2/D3).
 *
 * Attaches a `ws` WebSocketServer in noServer mode to the Node HTTP server's
 * `upgrade` event at `/api/gateway/ws`. Auth reuses the HTTP verifier path;
 * the bearer token rides in `Sec-WebSocket-Protocol` as `bearer.<token>`.
 */

import { randomUUID } from "node:crypto";
import type { IncomingMessage, Server as HttpServer } from "node:http";
import type { Duplex } from "node:stream";
import { WebSocketServer, type WebSocket } from "ws";
import { getCachedPrincipal, hashToken, setCachedPrincipal } from "../auth-cache.js";
import { getMembership } from "../memberships.js";
import {
  getAuthMode,
  verifyAccessToken,
  type Principal,
} from "../middleware/auth.js";
import { getCurrentWorkspace } from "../sessions.js";
import { listUserGroupIds } from "../userGroups.js";
import { createDocHandler } from "../doc/doc-namespace.js";
import { createBroker, type Conn, type RealtimeBroker } from "./broker.js";
import { createAppTopicsHandler } from "./app-topics.js";
import { createPresenceHandler } from "./presence.js";
import { parseClientMessage, type ServerMessage } from "./protocol.js";

export const REALTIME_PATH = "/api/gateway/ws";
export const REALTIME_SUBPROTOCOL = "aprovan.v1";

const DEFAULT_PING_INTERVAL_MS = 30_000;
const DEFAULT_MAX_MISSED_PONGS = 2;

export interface AttachRealtimeOptions {
  /** Override the broker (tests register handlers on a shared instance). */
  broker?: RealtimeBroker;
  /** Ping interval; default 30s. Injectable so tests stay fast. */
  pingIntervalMs?: number;
  /** Terminate after this many consecutive missed pongs; default 2. */
  maxMissedPongs?: number;
  /** Clock for token-exp checks (tests). */
  now?: () => number;
  /**
   * Override principal resolution (tests). Return null to reject with 401.
   * `exp` is unix seconds; omit for no lifetime bound.
   */
  authenticate?: (
    req: IncomingMessage,
    protocols: string[],
  ) => Promise<{ principal: Principal; exp?: number } | null>;
}

export interface RealtimeHandle {
  broker: RealtimeBroker;
  /** Close every open socket and detach the upgrade listener. */
  close(): void;
}

function parseProtocols(header: string | string[] | undefined): string[] {
  if (!header) return [];
  const raw = Array.isArray(header) ? header.join(",") : header;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function extractBearerToken(protocols: string[]): string | null {
  for (const p of protocols) {
    if (p.startsWith("bearer.")) return p.slice("bearer.".length);
  }
  return null;
}

/** Read `exp` from a verified JWT without re-verifying — payload is already trusted. */
function readJwtExp(token: string): number | undefined {
  const parts = token.split(".");
  if (parts.length < 2 || !parts[1]) return undefined;
  try {
    const json = Buffer.from(parts[1], "base64url").toString("utf8");
    const payload = JSON.parse(json) as { exp?: unknown };
    return typeof payload.exp === "number" ? payload.exp : undefined;
  } catch {
    return undefined;
  }
}

async function resolveOidcPrincipal(
  token: string,
  workspaceHint: string,
): Promise<{ principal: Principal; exp?: number }> {
  const tokenHash = hashToken(token);
  const cached = getCachedPrincipal(tokenHash, workspaceHint);
  if (cached) {
    return { principal: cached, exp: readJwtExp(token) };
  }

  const sub = await verifyAccessToken(token);
  const workspaceId = workspaceHint || (await getCurrentWorkspace(sub));
  if (!workspaceId) throw new Error("workspace_not_selected");
  const membership = await getMembership(workspaceId, sub);
  if (!membership) throw new Error("workspace_forbidden");
  const principal: Principal = {
    sub,
    workspaceId,
    role: membership.role ?? "member",
    groupIds: await listUserGroupIds(workspaceId, sub),
  };
  setCachedPrincipal(tokenHash, workspaceHint, principal);
  return { principal, exp: readJwtExp(token) };
}

async function defaultAuthenticate(
  req: IncomingMessage,
  protocols: string[],
): Promise<{ principal: Principal; exp?: number } | null> {
  if (!protocols.includes(REALTIME_SUBPROTOCOL)) return null;

  if (getAuthMode() === "none") {
    return {
      principal: {
        sub: "local",
        workspaceId: "local",
        role: "admin",
        groupIds: [],
      },
    };
  }

  const token = extractBearerToken(protocols);
  if (!token) return null;

  const workspaceHint =
    (typeof req.headers["x-aprovan-workspace"] === "string"
      ? req.headers["x-aprovan-workspace"]
      : "") ?? "";

  try {
    return await resolveOidcPrincipal(token, workspaceHint);
  } catch {
    return null;
  }
}

function rejectUpgrade(socket: Duplex, status: number, reason: string): void {
  socket.write(
    `HTTP/1.1 ${status} ${reason}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`,
  );
  socket.destroy();
}

export function attachRealtime(
  server: HttpServer,
  options: AttachRealtimeOptions = {},
): RealtimeHandle {
  const broker = options.broker ?? createBroker();
  // Presence (file-presence) + Doc CRDT sync + Chat CF-1 app-scoped topics.
  broker.registerNamespace(createPresenceHandler(broker));
  broker.registerNamespace(createDocHandler(broker));
  broker.registerNamespace(createAppTopicsHandler(broker));
  const pingIntervalMs = options.pingIntervalMs ?? DEFAULT_PING_INTERVAL_MS;
  const maxMissedPongs = options.maxMissedPongs ?? DEFAULT_MAX_MISSED_PONGS;
  const now = options.now ?? Date.now;
  const authenticate = options.authenticate ?? defaultAuthenticate;

  const wss = new WebSocketServer({ noServer: true, handleProtocols: () => REALTIME_SUBPROTOCOL });
  const sockets = new Set<WebSocket>();

  const onUpgrade = (req: IncomingMessage, socket: Duplex, head: Buffer): void => {
    const host = req.headers.host ?? "localhost";
    let pathname: string;
    try {
      pathname = new URL(req.url ?? "/", `http://${host}`).pathname;
    } catch {
      rejectUpgrade(socket, 400, "Bad Request");
      return;
    }

    if (pathname !== REALTIME_PATH) {
      // Not our path — leave the socket for any other upgrade handler.
      return;
    }

    void (async () => {
      const protocols = parseProtocols(req.headers["sec-websocket-protocol"]);
      const auth = await authenticate(req, protocols);
      if (!auth) {
        rejectUpgrade(socket, 401, "Unauthorized");
        return;
      }

      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req, auth);
      });
    })();
  };

  server.on("upgrade", onUpgrade);

  wss.on(
    "connection",
    (
      ws: WebSocket,
      _req: IncomingMessage,
      auth: { principal: Principal; exp?: number },
    ) => {
      sockets.add(ws);

      const conn: Conn = {
        id: randomUUID(),
        userId: auth.principal.sub,
        workspaceId: auth.principal.workspaceId,
        send(msg: ServerMessage) {
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(msg));
          }
        },
      };
      broker.addConnection(conn);

      let missedPongs = 0;
      let alive = true;

      const pingTimer = setInterval(() => {
        if (ws.readyState !== ws.OPEN) return;
        if (!alive) {
          missedPongs += 1;
          if (missedPongs >= maxMissedPongs) {
            ws.terminate();
            return;
          }
        } else {
          missedPongs = 0;
        }
        alive = false;
        ws.ping();
      }, pingIntervalMs);
      pingTimer.unref?.();

      let expTimer: ReturnType<typeof setTimeout> | undefined;
      if (auth.exp !== undefined) {
        const msLeft = auth.exp * 1000 - now();
        if (msLeft <= 0) {
          ws.close(1008, "token expired");
        } else {
          expTimer = setTimeout(() => {
            if (ws.readyState === ws.OPEN) ws.close(1008, "token expired");
          }, msLeft);
          expTimer.unref?.();
        }
      }

      ws.on("pong", () => {
        alive = true;
        missedPongs = 0;
      });

      ws.on("message", (data, isBinary) => {
        if (isBinary) {
          conn.send({ type: "error", code: "bad-message", message: "expected JSON text frame" });
          return;
        }
        const raw = typeof data === "string" ? data : data.toString("utf8");
        const parsed = parseClientMessage(raw);
        if ("error" in parsed) {
          conn.send({ type: "error", code: "bad-message", message: "invalid message" });
          return;
        }
        broker.handleClientMessage(conn, parsed);
      });

      let cleaned = false;
      const cleanup = (): void => {
        if (cleaned) return;
        cleaned = true;
        clearInterval(pingTimer);
        if (expTimer) clearTimeout(expTimer);
        sockets.delete(ws);
        broker.removeConnection(conn);
      };

      ws.on("close", cleanup);
      ws.on("error", cleanup);
    },
  );

  return {
    broker,
    close() {
      server.off("upgrade", onUpgrade);
      for (const ws of sockets) {
        try {
          ws.close(1001, "server shutting down");
        } catch {
          ws.terminate();
        }
      }
      sockets.clear();
      wss.close();
    },
  };
}
