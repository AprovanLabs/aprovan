#!/usr/bin/env node
/**
 * `workspace` — run the Aprovan platform.
 *
 * The same binary is the container's entrypoint, so there is exactly one way
 * to start the server and one place where its flags are defined:
 *
 *   workspace start                      # local, SQLite under ~/.aprovan
 *   workspace start --data-dir ./data    # local, somewhere else
 *   workspace start --mode aws           # DynamoDB + S3 + Cognito
 *   workspace credentials add openai     # token on stdin, never in argv
 *   workspace credentials list
 *
 * Flags are translated into the same environment variables the container and
 * the CDK task definition set, so `--mode aws` and `WORKSPACE_MODE=aws` are
 * the same instruction arriving by different routes (see runtime/config.ts).
 */

import { createInterface } from "node:readline";

const USAGE = `workspace — run the Aprovan platform

Usage:
  workspace start [options]
  workspace credentials add <provider> [--label <label>] [--workspace <id>]
  workspace credentials list [--workspace <id>]
  workspace --help

Options for \`start\`:
  --mode <local|aws>   Where state lives (default: local, or $WORKSPACE_MODE)
  --port <n>           HTTP port (default: 4000, or $WORKSPACE_PORT)
  --host <addr>        Bind address (default: all interfaces, or $WORKSPACE_HOST)
  --data-dir <path>    Local-mode data directory (default: ~/.aprovan)
  --no-cron            Do not contend for the workflow cron lease

Environment:
  WORKSPACE_MODE, WORKSPACE_PORT, WORKSPACE_HOST, WORKSPACE_DATA_DIR,
  WORKSPACE_CRON, WORKSPACE_ALLOW_INSECURE, WORKSPACE_CRON_SECRET
  WORKSPACE_KEY_FD   (desktop) inherited fd with 32 raw key bytes — not key material
  aws mode additionally reads /aprovan/<env>/env from SSM.
`;

interface ParsedArgs {
  command: string;
  positional: string[];
  flags: Map<string, string | true>;
}

function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags = new Map<string, string | true>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;
    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }
    const name = arg.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      flags.set(name, next);
      i++;
    } else {
      flags.set(name, true);
    }
  }
  return { command: positional.shift() ?? "start", positional, flags };
}

function stringFlag(flags: ParsedArgs["flags"], name: string): string | undefined {
  const value = flags.get(name);
  return typeof value === "string" ? value : undefined;
}

function die(message: string): never {
  process.stderr.write(`workspace: ${message}\n`);
  process.exit(2);
}

/** Read a secret from stdin without it ever appearing in argv or shell history. */
async function readSecret(prompt: string): Promise<string> {
  if (!process.stdin.isTTY) {
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
    return Buffer.concat(chunks).toString("utf8").trim();
  }
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  try {
    return (await new Promise<string>((resolve) => rl.question(prompt, resolve))).trim();
  } finally {
    rl.close();
  }
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function commandStart(flags: ParsedArgs["flags"]): Promise<void> {
  const mode = stringFlag(flags, "mode");
  if (mode) process.env["WORKSPACE_MODE"] = mode;
  const dataDir = stringFlag(flags, "data-dir");
  if (dataDir) process.env["WORKSPACE_DATA_DIR"] = dataDir;
  const host = stringFlag(flags, "host");
  if (host) process.env["WORKSPACE_HOST"] = host;
  if (flags.get("no-cron")) process.env["WORKSPACE_CRON"] = "0";

  const portFlag = stringFlag(flags, "port");
  const port = portFlag === undefined ? undefined : Number(portFlag);
  if (port !== undefined && !Number.isInteger(port)) die(`--port must be an integer`);

  const { startWorkspace } = await import("./server.js");
  await startWorkspace({ port, hostname: host });
}

async function commandCredentials(
  action: string | undefined,
  positional: string[],
  flags: ParsedArgs["flags"],
): Promise<void> {
  const dataDir = stringFlag(flags, "data-dir");
  if (dataDir) process.env["WORKSPACE_DATA_DIR"] = dataDir;

  const { loadWorkspaceConfig } = await import("./runtime/config.js");
  const config = await loadWorkspaceConfig();
  // Local mode has exactly one workspace, and it is named `local` (the same
  // identity auth-none short-circuits to — see routes/session.ts).
  const workspaceId = stringFlag(flags, "workspace") ?? "local";
  const { getCredentialStore } = await import("./credentials.js");
  const store = getCredentialStore();

  if (action === "list") {
    const records = await store.list(workspaceId);
    if (records.length === 0) {
      process.stderr.write(`No credentials in workspace "${workspaceId}".\n`);
      return;
    }
    for (const record of records) {
      process.stdout.write(
        `${record.provider}\t${record.type}\t${record.label ?? ""}\t${record.id}\n`,
      );
    }
    return;
  }

  if (action === "add") {
    const provider = positional[0];
    if (!provider) die("credentials add requires a provider (e.g. `openai`)");
    const token = await readSecret(`${provider} token: `);
    if (!token) die("no token provided");
    const record = await store.create(workspaceId, {
      provider,
      label: stringFlag(flags, "label"),
      payload: { type: "bearer_token", token },
      createdBy: "local",
    });
    process.stderr.write(
      `Added ${record.provider} credential ${record.id} to workspace "${workspaceId}" ` +
        `(${config.data.kind === "sqlite" ? config.data.dir : "aws"}).\n`,
    );
    return;
  }

  die(`unknown credentials action "${action ?? ""}" — expected add or list`);
}

// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(USAGE);
    return;
  }

  const { command, positional, flags } = parseArgs(argv);
  switch (command) {
    case "start":
      return commandStart(flags);
    case "credentials":
      return commandCredentials(positional.shift(), positional, flags);
    default:
      process.stderr.write(USAGE);
      die(`unknown command "${command}"`);
  }
}

await main().catch((error: unknown) => {
  process.stderr.write(`workspace: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
