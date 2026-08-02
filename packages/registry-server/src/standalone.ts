/**
 * Standalone entrypoint — the Docker image's CMD and nothing more:
 * parse env → createRegistryServer → serve. No code path exists only here
 * except this configuration parsing (registry-server spec).
 */

import { serve } from "@hono/node-server";
import { optionsFromEnv } from "./config/env.js";
import { createRegistryServer } from "./server.js";

export async function main(): Promise<void> {
  const { port, options } = optionsFromEnv();
  const server = await createRegistryServer(options);

  const httpServer = serve({ fetch: server.router.fetch, port }, (info) => {
    process.stderr.write(
      JSON.stringify({
        ts: new Date().toISOString(),
        type: "registry_server_started",
        port: info.port,
        storage: "driver" in options.storage ? options.storage.driver : "custom",
        auth: "mode" in options.auth ? options.auth.mode : "custom",
        telemetry: options.telemetry?.otlpEndpoint ? "otlp" : "off",
      }) + "\n",
    );
  });

  const shutdown = async (): Promise<void> => {
    httpServer.close();
    await server.close();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown());
  process.on("SIGTERM", () => void shutdown());
}

const entrypoint = process.argv[1];
if (entrypoint && (entrypoint.endsWith("standalone.js") || entrypoint.endsWith("standalone.ts"))) {
  main().catch((err) => {
    process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
    process.exit(1);
  });
}
