/**
 * `aprovan` — the machine-side CLI.
 *
 * The gateway's own CLI is `workspace` (it *runs* the platform). This one is a
 * client: it points at a workspace you already have and offers your machine to
 * it as a sandbox host.
 *
 *   aprovan login --gateway http://localhost:4000
 *   aprovan sandbox host register --name my-laptop --root ~/aprovan/work
 *   aprovan sandbox host run
 *
 * `register` does the whole setup in one call, because leaving a user to paste
 * a token into two other surfaces is how a feature goes unused: it registers
 * the host, stores the *client* token in the workspace as the `local` provider
 * credential, and binds the `sandbox` interface to it with the relay URL. What
 * stays on this machine is only the host token.
 */

import { homedir } from "node:os";
import { isAbsolute, join, resolve } from "node:path";
import { createInterface } from "node:readline";
import { runAgent } from "@aprovan/native/host";
import {
  authHeaders,
  gatewayUrl,
  readConfig,
  writeConfig,
  type CliConfig,
  type HostConfig,
} from "./config.js";

const VERSION = "0.1.0";

const USAGE = `aprovan — offer this machine to an Aprovan workspace

Usage:
  aprovan login [--gateway <url>] [--token <t>]
  aprovan sandbox host register --name <name> [--root <dir>] [--image <spec>]...
  aprovan sandbox host run [--host <id>]
  aprovan sandbox host list
  aprovan sandbox host revoke --host <id>
  aprovan --help | --version

Options:
  --gateway <url>   Gateway root (default: $APROVAN_GATEWAY_URL, else http://localhost:4000)
  --token <t>       Access token; omit to read it from stdin so it stays out of
                    your shell history. Local auth-none workspaces need none.
  --root <dir>      Directory sandboxes are created under (default: ~/aprovan/work).
                    This is the containment boundary — nothing outside it is reachable.
  --image <spec>    Sandbox image this machine offers to run (repeatable).
                    Default: @aprovan/native. A scheduled run is
                    only offered to machines registered for its image.
  --host <id>       Which registered host to act as (default: the only one)

Environment:
  APROVAN_GATEWAY_URL, APROVAN_TOKEN, APROVAN_CONFIG
`;

interface Args {
  positional: string[];
  flags: Map<string, string | true>;
  /** Every occurrence of each flag, for the repeatable ones. */
  repeated: Map<string, string[]>;
}

function parseArgs(argv: string[]): Args {
  const positional: string[] = [];
  const flags = new Map<string, string | true>();
  const repeated = new Map<string, string[]>();
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
      repeated.set(name, [...(repeated.get(name) ?? []), next]);
      i++;
    } else {
      flags.set(name, true);
    }
  }
  return { positional, flags, repeated };
}

function flag(args: Args, name: string): string | undefined {
  const value = args.flags.get(name);
  return typeof value === "string" ? value : undefined;
}

/** Every occurrence of a repeatable flag: `--image a --image b`. */
function flags(args: Args, name: string): string[] {
  return args.repeated.get(name) ?? [];
}

function die(message: string): never {
  process.stderr.write(`aprovan: ${message}\n`);
  process.exit(2);
}

function out(message: string): void {
  process.stdout.write(`${message}\n`);
}

function expandPath(raw: string): string {
  const expanded = raw.startsWith("~") ? join(homedir(), raw.slice(1)) : raw;
  return isAbsolute(expanded) ? expanded : resolve(process.cwd(), expanded);
}

/** Read a secret from stdin so it never lands in argv or shell history. */
async function readSecret(prompt: string): Promise<string> {
  if (!process.stdin.isTTY) {
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) chunks.push(Buffer.from(chunk));
    return Buffer.concat(chunks).toString("utf8").trim();
  }
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  try {
    return (await new Promise<string>((res) => rl.question(prompt, res))).trim();
  } finally {
    rl.close();
  }
}

// ---------------------------------------------------------------------------
// Gateway calls
// ---------------------------------------------------------------------------

async function callTool<T>(
  config: CliConfig,
  namespace: string,
  procedure: string,
  args: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${gatewayUrl(config)}/tools/${namespace}/${procedure}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(config) },
    body: JSON.stringify({ args }),
  });
  const body = (await response.json().catch(() => ({}))) as { data?: T; error?: string };
  if (!response.ok) {
    throw new Error(body.error ?? `${namespace}.${procedure} failed (${response.status})`);
  }
  return body.data as T;
}

async function addCredential(
  config: CliConfig,
  provider: string,
  label: string,
  token: string,
): Promise<void> {
  const response = await fetch(`${gatewayUrl(config)}/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders(config) },
    body: JSON.stringify({
      provider,
      label,
      payload: { type: "bearer_token", token },
    }),
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `storing the ${provider} credential failed (${response.status})`);
  }
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function commandLogin(args: Args): Promise<void> {
  const config = await readConfig();
  config.gatewayUrl = (flag(args, "gateway") ?? config.gatewayUrl ?? "http://localhost:4000").replace(
    /\/+$/u,
    "",
  );
  const token =
    flag(args, "token") ??
    (args.flags.has("token")
      ? await readSecret("Access token (blank for a local auth-none workspace): ")
      : undefined);
  if (token) config.token = token;
  await writeConfig(config);

  // Prove the configuration before claiming success — a wrong gateway or a
  // stale token should fail here, not at the first lease.
  try {
    const tools = await callTool<{ hosts: unknown[] }>(config, "sandboxes", "hosts", {});
    out(`Signed in to ${config.gatewayUrl} (${tools.hosts.length} host(s) registered).`);
  } catch (err) {
    die(`could not reach the workspace: ${err instanceof Error ? err.message : String(err)}`);
  }
}

async function commandRegister(args: Args): Promise<void> {
  const config = await readConfig();
  const name = flag(args, "name") ?? die("--name is required");
  const root = expandPath(flag(args, "root") ?? join(homedir(), "aprovan", "work"));
  const images = flags(args, "image");

  const result = await callTool<{
    host: { id: string; name: string };
    hostToken: string;
    clientToken: string;
    relayUrl: string;
  }>(config, "sandboxes", "registerHost", { name, provider: "machine", root, images });

  const relayUrl = `${gatewayUrl(config)}${result.relayUrl}`;
  const host: HostConfig = {
    id: result.host.id,
    name: result.host.name,
    workspaceId: result.relayUrl.split("/")[2] ?? "",
    root,
    hostToken: result.hostToken,
    relayUrl,
    registeredAt: new Date().toISOString(),
  };
  config.hosts[host.id] = host;
  await writeConfig(config);

  // Hand the client token to the workspace and point the interface at this
  // machine. The token is never written to disk here.
  await addCredential(config, "machine", `${name} (sandbox host)`, result.clientToken);
  await callTool(config, "interfaces", "bind", {
    interface: "sandbox",
    provider: "machine",
    options: { baseUrl: relayUrl },
  });

  out(`Registered ${host.name} (${host.id}).`);
  out(`  root:  ${root}`);
  out(`  relay: ${relayUrl}`);
  out("");
  out("This machine is now the workspace's sandbox host. Start the agent with:");
  out("  aprovan sandbox host run");
  out("");
  out("A local host is not hardware-isolated: commands run as you, with your");
  out(`toolchain, confined to ${root}. Use a vendor host for untrusted code.`);
}

function selectHost(config: CliConfig, id: string | undefined): HostConfig {
  const hosts = Object.values(config.hosts);
  if (id) {
    const host = config.hosts[id];
    if (!host) die(`unknown host "${id}" — run \`aprovan sandbox host list\``);
    return host;
  }
  if (hosts.length === 0) die("no host registered on this machine — run `aprovan sandbox host register`");
  if (hosts.length > 1) die("several hosts registered — pass --host <id>");
  return hosts[0]!;
}

async function commandRun(args: Args): Promise<void> {
  const config = await readConfig();
  const host = selectHost(config, flag(args, "host"));
  const controller = new AbortController();
  const stop = (): void => controller.abort();
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);

  out(`aprovan host agent — ${host.name} (${host.id})`);
  await runAgent({
    relayUrl: host.relayUrl,
    hostToken: host.hostToken,
    root: host.root,
    signal: controller.signal,
    log: (message) => process.stderr.write(`${new Date().toISOString()} ${message}\n`),
  });
}

async function commandList(): Promise<void> {
  const config = await readConfig();
  const hosts = Object.values(config.hosts);
  if (hosts.length === 0) {
    out("No hosts registered on this machine.");
    return;
  }
  for (const host of hosts) {
    out(`${host.id}  ${host.name}  root=${host.root}`);
  }
}

async function commandRevoke(args: Args): Promise<void> {
  const config = await readConfig();
  const host = selectHost(config, flag(args, "host"));
  await callTool(config, "sandboxes", "revokeHost", { id: host.id }).catch((err: unknown) => {
    // A host already gone from the workspace still needs clearing locally.
    process.stderr.write(
      `aprovan: workspace revoke failed (${err instanceof Error ? err.message : String(err)})\n`,
    );
  });
  delete config.hosts[host.id];
  await writeConfig(config);
  out(`Revoked ${host.name} (${host.id}).`);
}

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

export async function main(argv: string[]): Promise<void> {
  const args = parseArgs(argv);
  if (args.flags.has("help") || args.positional.length === 0) {
    process.stdout.write(USAGE);
    return;
  }
  if (args.flags.has("version")) {
    out(VERSION);
    return;
  }

  const [command, ...rest] = args.positional;
  try {
    if (command === "login") return await commandLogin(args);
    if (command === "sandbox") {
      if (rest[0] !== "host") die(`unknown sandbox command "${rest[0] ?? ""}"`);
      switch (rest[1]) {
        case "register":
          return await commandRegister(args);
        case "run":
          return await commandRun(args);
        case "list":
          return await commandList();
        case "revoke":
          return await commandRevoke(args);
        default:
          die(`unknown host command "${rest[1] ?? ""}"`);
      }
    }
    die(`unknown command "${command}"`);
  } catch (err) {
    die(err instanceof Error ? err.message : String(err));
  }
}
