/**
 * Gateway Hono application factory.
 *
 * Exported separately from src/index.ts so the app can be imported in tests
 * without binding to a port.
 */

import { AGENTS_ROUTE_PREFIX } from "@aprovan/agent-protocol";
import { Hono } from "hono";
import { getAuthMode } from "./middleware/auth.js";
import { agentChatRouter } from "./routes/agent-chat.js";
import { auditRouter } from "./routes/audit.js";
import { authRouter } from "./routes/auth.js";
import { credentialsRouter } from "./routes/credentials.js";
import { fsRouter, fsUploadsRouter } from "./routes/fs.js";
import { groupsRouter } from "./routes/groups.js";
import { invitesRouter } from "./routes/invites.js";
import { appsRouter } from "./routes/apps.js";
import { hooksRouter } from "./routes/hooks.js";
import { llmRouter } from "./routes/llm.js";
import { mcpRouter } from "./routes/mcp.js";
import { membersRouter } from "./routes/members.js";
import { oauthRouter } from "./routes/oauth.js";
import { permissionsRouter } from "./routes/permissions.js";
import { workspaceProfilesRouter } from "./routes/profiles.js";
import { sandboxHostsRouter } from "./routes/sandbox-hosts.js";
import { sessionRouter } from "./routes/session.js";
import { shareRouter } from "./routes/share.js";
import { toolsRouter } from "./routes/tools.js";
import { wellKnownRouter } from "./routes/well-known.js";
import type { GatewayConfig } from "./contract.js";

function isLocalDevOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    if (["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname)) {
      return true;
    }
    // Electron desktop renderer (app://bundle/…).
    return url.protocol === "app:";
  } catch {
    return false;
  }
}

export function createApp(): Hono {
  const app = new Hono();

  // ---------------------------------------------------------------------------
  // CORS middleware — allow local browser clients to call the gateway
  // ---------------------------------------------------------------------------
  app.use("/*", async (c, next) => {
    const origin = c.req.header("Origin");
    const requestHeaders = c.req.header("Access-Control-Request-Headers");

    if (origin) {
      const allowOrigin = isLocalDevOrigin(origin) ? origin : "*";
      const responseHeaders = new Headers();
      responseHeaders.set("Access-Control-Allow-Origin", allowOrigin);
      responseHeaders.set("Vary", "Origin");
      responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
      responseHeaders.set(
        "Access-Control-Allow-Headers",
        requestHeaders ?? "Content-Type, Authorization, X-Aprovan-Authorization, X-Aprovan-Workspace",
      );
      responseHeaders.set("Access-Control-Expose-Headers", "Content-Type, Authorization");

      if (c.req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: responseHeaders });
      }

      await next();
      const response = c.res;
      for (const [key, value] of responseHeaders.entries()) {
        response.headers.set(key, value);
      }
      return response;
    }

    await next();
  });

  // ---------------------------------------------------------------------------
  // Health check — unauthenticated
  // ---------------------------------------------------------------------------
  app.get("/health", (c) => c.json({ status: "ok", service: "gateway" }));

  // Streaming health check: five SSE ticks, 500ms apart, no auth. Exists to
  // answer one question from the outside — does the full transport chain
  // (hono streamHandle → Lambda RESPONSE_STREAM → CloudFront → client)
  // deliver bytes incrementally, or does something buffer? If the ticks
  // arrive as one burst, every SSE surface (chat, widget edits) is silently
  // buffered and long completions die at an intermediary timeout instead of
  // streaming — exactly the failure this endpoint makes diagnosable in one
  // curl.
  // `?ticks=` and `?intervalMs=` shape the stream (capped at 5 minutes
  // total) so the probe can also impersonate a long LLM completion — e.g.
  // ticks=8&intervalMs=15000 is exactly the byte cadence of a two-minute
  // widget edit riding 15s keepalives, which is how we bisect "server
  // streamed for 124s but the client died" failures to CloudFront vs the
  // browser.
  app.on(["GET", "POST"], "/health/stream", (c) => {
    const ticks = Math.max(1, Math.min(Number(c.req.query("ticks")) || 5, 600));
    const intervalMs = Math.max(50, Math.min(Number(c.req.query("intervalMs")) || 500, 60_000));
    const cappedTicks = Math.min(ticks, Math.floor(300_000 / intervalMs));
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (let tick = 1; tick <= cappedTicks; tick++) {
          controller.enqueue(
            encoder.encode(`data: {"tick":${tick},"at":${Date.now()}}\n\n`),
          );
          await new Promise((resolve) => setTimeout(resolve, intervalMs));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    return c.newResponse(stream, 200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    });
  });
  app.get("/config", (c) => {
    const config: GatewayConfig = {
      mode: getAuthMode(),
      auth: {
        authority: process.env["COGNITO_AUTHORITY"],
        clientId: process.env["COGNITO_CLIENT_ID"],
        domain: process.env["COGNITO_DOMAIN"],
      },
      features: {
        ephemeralCredentials:
          process.env["GATEWAY_EPHEMERAL_CREDENTIALS"] !== "0",
        streaming: true,
      },
      version: process.env["npm_package_version"] ?? "0.1.0",
    };
    return c.json(config);
  });

  // ---------------------------------------------------------------------------
  // Routes
  // ---------------------------------------------------------------------------

  // Unauthenticated — must be mounted before requireAuth touches any prefix.
  app.route("/.well-known", wellKnownRouter);
  // Link-share anonymous read (iw9-b D6 / invariant 9) — no Cognito.
  app.route("/share", shareRouter);
  // Workflow webhooks + cron tick authenticate with their own tokens.
  app.route("/hooks", hooksRouter);
  // Sandbox host relay: registered machines dial out and lease work with
  // their own per-registration tokens (see routes/sandbox-hosts.ts).
  app.route("/sandbox-hosts", sandboxHostsRouter);
  // Published apps: any authenticated user, gated by each app's manifest
  // (roles, tool allow-list, per-user rate limits) — not workspace membership.
  app.route("/apps", appsRouter);

  app.route("/auth", authRouter);
  app.route("/session", sessionRouter);
  app.route("/mcp", mcpRouter);
  app.route("/oauth", oauthRouter);
  app.route("/credentials", credentialsRouter);
  app.route("/groups", groupsRouter);
  // Workspace profile CRUD (routes/profiles.ts).
  app.route("/profiles", workspaceProfilesRouter);
  app.route("/invites", invitesRouter);
  app.route("/members", membersRouter);
  app.route("/permissions", permissionsRouter);
  app.route("/tools", toolsRouter);
  // Frozen client contract (stream 1.5) — streams 5/6/7 build URLs from the
  // same AGENTS_ROUTE_PREFIX helpers. Does not shadow /tools/agents/*.
  app.route(AGENTS_ROUTE_PREFIX, agentChatRouter);
  app.route("/llm", llmRouter);
  app.route("/audit", auditRouter);
  app.route("/fs", fsRouter);
  app.route("/fs-uploads", fsUploadsRouter);

  // ---------------------------------------------------------------------------
  // 404 fallback
  // ---------------------------------------------------------------------------
  app.notFound((c) => c.json({ error: "Not found" }, 404));

  // ---------------------------------------------------------------------------
  // Error handler
  // ---------------------------------------------------------------------------
  app.onError((err, c) => {
    process.stderr.write(
      JSON.stringify({
        ts: new Date().toISOString(),
        type: "gateway_error",
        error: err instanceof Error ? err.message : String(err),
      }) + "\n",
    );
    return c.json({ error: "Internal server error" }, 500);
  });

  return app;
}
