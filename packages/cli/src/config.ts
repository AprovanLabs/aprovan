/**
 * CLI state: where the gateway is, who you are, and which hosts this machine
 * has registered.
 *
 * `~/.aprovan/cli.json`, mode 0600. It holds a workspace access token and one
 * host token per registration — secrets, so the file is written restricted and
 * never echoed. The *client* token minted alongside each host token is
 * deliberately **not** stored: it belongs in the workspace as a provider
 * credential, and the register command puts it there directly rather than
 * leaving a second copy on disk.
 */

import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

export interface HostConfig {
  id: string;
  name: string;
  workspaceId: string;
  root: string;
  hostToken: string;
  /** Absolute relay root: `<gateway>/sandbox-hosts/<ws>/<host>`. */
  relayUrl: string;
  registeredAt: string;
}

export interface CliConfig {
  gatewayUrl?: string;
  token?: string;
  hosts: Record<string, HostConfig>;
}

export function configPath(): string {
  return process.env["APROVAN_CONFIG"] ?? join(homedir(), ".aprovan", "cli.json");
}

export async function readConfig(): Promise<CliConfig> {
  try {
    const raw = await readFile(configPath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<CliConfig>;
    return { hosts: {}, ...parsed };
  } catch {
    return { hosts: {} };
  }
}

export async function writeConfig(config: CliConfig): Promise<void> {
  const path = configPath();
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  await chmod(path, 0o600).catch(() => undefined);
}

export function gatewayUrl(config: CliConfig): string {
  const url = process.env["APROVAN_GATEWAY_URL"] ?? config.gatewayUrl;
  if (!url) {
    throw new Error(
      "No gateway configured. Run `aprovan login --gateway <url>` (local default: http://localhost:4000).",
    );
  }
  return url.replace(/\/+$/u, "");
}

/** Authorization header for gateway calls; absent in auth-none local mode. */
export function authHeaders(config: CliConfig): Record<string, string> {
  const token = process.env["APROVAN_TOKEN"] ?? config.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}
