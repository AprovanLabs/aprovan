/**
 * Stdio MCP bridge to the Aprovan workspace gateway.
 *
 * Plugin clients (Cursor, Claude Code) spawn this process; it forwards MCP
 * traffic to the existing Streamable HTTP endpoint at `/api/mcp` via
 * `mcp-remote` — no second MCP implementation.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const DEFAULT_MCP_URL = "http://localhost:4000/api/mcp";

function resolveMcpUrl(): string {
  const fromEnv = process.env["APROVAN_MCP_URL"]?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return DEFAULT_MCP_URL;
}

function buildArgs(url: string): string[] {
  const args = [createRequire(import.meta.url).resolve("mcp-remote/dist/proxy.js"), url];
  const token = process.env["APROVAN_MCP_TOKEN"]?.trim();
  if (token) {
    const header = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    args.push("--header", `Authorization:${header}`);
  }
  return args;
}

export async function main(argv: string[] = process.argv.slice(2)): Promise<number> {
  const subcommand = argv.find((arg) => !arg.startsWith("-"));
  if (subcommand && subcommand !== "serve") {
    process.stderr.write(`Unknown command: ${subcommand}\n`);
    return 1;
  }

  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(
      `aprovan-mcp — bridge stdio MCP clients to the Aprovan workspace gateway

Usage:
  aprovan-mcp serve
  aprovan-mcp --help

Environment:
  APROVAN_MCP_URL    Streamable HTTP MCP endpoint (default: ${DEFAULT_MCP_URL})
  APROVAN_MCP_TOKEN  Optional bearer token for hosted gateways with auth

The workspace gateway must be running (or reachable) at the configured URL.
Local mode: pnpm --filter @aprovan/workspace dev
`,
    );
    return 0;
  }

  const url = resolveMcpUrl();
  const args = buildArgs(url);
  const child = spawn(process.execPath, args, {
    stdio: "inherit",
    env: process.env,
  });

  return await new Promise<number>((resolve) => {
    child.on("error", (error) => {
      process.stderr.write(`${error.message}\n`);
      resolve(1);
    });
    child.on("exit", (code, signal) => {
      if (signal) {
        process.stderr.write(`aprovan-mcp exited on signal ${signal}\n`);
        resolve(1);
        return;
      }
      resolve(code ?? 1);
    });
  });
}
