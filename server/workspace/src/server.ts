/**
 * The workspace server: one route tree, one lifecycle, every host.
 *
 * There used to be two entry points that disagreed. `index.ts` mounted the API
 * at `/`, `lambda.ts` mounted it at `/api/gateway`, and only the second one was
 * what production served — so every local test of a path-sensitive behaviour
 * (redirects, MCP resource metadata, live app URLs) was testing a layout that
 * did not exist in the deployed system. There is now one tree, defined here,
 * and the CLI, the container, the test suite and an embedding host all serve
 * exactly it:
 *
 *   /api/gateway/*   REST API (credentials, fs, llm, apps, workflows, …)
 *   /api/mcp         public MCP endpoint
 *   /.well-known/*   RFC 9728 OAuth resource metadata, resolved at the root
 *   /apps/*          live app pages (aprovan.com/apps/<workspace>/<name>)
 *   /health          liveness, for container/load-balancer probes
 */

import { serve } from "@hono/node-server";
import type { Server as HttpServer } from "node:http";
import { Hono } from "hono";
import { createApp } from "./app.js";
import { getAuthMode, initAuth } from "./middleware/auth.js";
import { attachRealtime, type RealtimeHandle } from "./realtime/socket.js";
import { liveAppsRouter } from "./routes/live-apps.js";
import { mcpRouter } from "./routes/mcp.js";
import { wellKnownRouter } from "./routes/well-known.js";
import { getWorkspaceConfig, loadWorkspaceConfig, type WorkspaceConfig } from "./runtime/config.js";
import { startCronScheduler, type CronScheduler } from "./runtime/cron.js";
import { startTelemetry } from "./runtime/telemetry.js";

/** The complete HTTP surface, with no server bound to it. */
export function createWorkspaceApp(): Hono {
  const app = new Hono();

  // Root liveness probe. The API's own `/health` lives under /api/gateway;
  // container and load-balancer checks want it at a fixed, prefix-free path.
  app.get("/health", (c) => c.json({ status: "ok", service: "workspace" }));

  app.route("/api/gateway", createApp());
  app.route("/api/mcp", mcpRouter);
  app.route("/.well-known", wellKnownRouter);
  app.route("/apps", liveAppsRouter);

  return app;
}

export interface WorkspaceHandle {
  config: WorkspaceConfig;
  app: Hono;
  cron: CronScheduler | undefined;
  /** Release the cron lease, stop accepting connections, drain in flight. */
  stop(): Promise<void>;
}

export interface StartWorkspaceOptions {
  /** Override the resolved port (the CLI's `--port`). */
  port?: number;
  /** Override the bind address (the CLI's `--host` / WORKSPACE_HOST). */
  hostname?: string;
  /** Install SIGTERM/SIGINT handlers. Off when embedded in another host. */
  handleSignals?: boolean;
  /** How long to let in-flight requests finish before forcing exit. */
  drainMs?: number;
}

/**
 * Boot a workspace: resolve configuration, wire telemetry and auth, start
 * serving, and begin contending for the cron lease.
 */
export async function startWorkspace(
  options: StartWorkspaceOptions = {},
): Promise<WorkspaceHandle> {
  const config = await loadWorkspaceConfig();
  const port = options.port ?? config.port;
  const hostname = options.hostname ?? config.hostname;

  // Registers a real tracer provider when OTEL_EXPORTER_OTLP_ENDPOINT is set,
  // and loads no OpenTelemetry module at all when it isn't.
  const telemetry = await startTelemetry(config);

  // Hydrate the Cognito JWKS up front so the first request does not pay for
  // it. Also the point at which an insecure production posture is refused.
  await initAuth();

  const app = createWorkspaceApp();
  // WebSocket upgrade only — a plain GET answers 426 Upgrade Required.
  app.get("/api/gateway/ws", (c) => c.text("Upgrade Required", 426));
  const server = serve(
    { fetch: app.fetch, port, ...(hostname ? { hostname } : {}) },
    (info) => {
      const where =
        config.data.kind === "sqlite" ? `sqlite ${config.data.dir}` : `aws ${config.data.region}`;
      const bindHost = hostname ?? "localhost";
      process.stderr.write(
        `[workspace] listening on http://${bindHost}:${info.port} ` +
          `(mode=${config.mode} auth=${getAuthMode()} data=${where})\n`,
      );
    },
  );

  // Realtime requires a Node HTTP server (tech-plan D2). Fetch-embedded hosts
  // that only call createWorkspaceApp() have no upgrade path.
  const realtime: RealtimeHandle = attachRealtime(server as HttpServer);

  const cron = config.cron.enabled ? startCronScheduler() : undefined;

  // Warm the embedded registry server so first tool dispatch does not pay boot.
  const { getRegistryServer } = await import("./registry-embed.js");
  await getRegistryServer();

  let stopping: Promise<void> | undefined;
  const stop = (): Promise<void> => {
    stopping ??= (async () => {
      // Release the lease first: a peer can start ticking while this process
      // is still draining, so a deploy never skips a cron minute.
      await cron?.stop();
      // Close realtime sockets before the HTTP drain so brokers drop cleanly.
      realtime.close();
      await new Promise<void>((resolve) => {
        const forced = setTimeout(resolve, options.drainMs ?? 30_000);
        forced.unref?.();
        server.close(() => {
          clearTimeout(forced);
          resolve();
        });
      });
      // Last: spans are batched, so without a flush the final window is lost.
      await telemetry?.stop();
    })();
    return stopping;
  };

  if (options.handleSignals !== false) {
    // Fargate Spot sends SIGTERM two minutes before reclamation, and ECS sends
    // it on every rolling deploy — both are ample for a clean drain.
    for (const signal of ["SIGTERM", "SIGINT"] as const) {
      process.once(signal, () => {
        process.stderr.write(`[workspace] ${signal} — draining\n`);
        void stop().then(() => process.exit(0));
      });
    }
  }

  return { config, app, cron, stop };
}

/** The active configuration, for hosts that need it after boot. */
export { getWorkspaceConfig };
