/**
 * Thin read/refresh layer over the utdk token cache for the MCP server.
 *
 * The cache is written by `utdk login` (in @utdk/cli).  This module reads
 * it and silently refreshes the access token when it is about to expire so
 * the self-hosted MCP server can authenticate to the gateway without human
 * intervention.
 *
 * Cache path: ${XDG_STATE_HOME:-~/.local/state}/utdk/tokens.json  (0600 perms)
 * Env vars:
 *   UTDK_COGNITO_DOMAIN     — e.g. https://myapp.auth.us-east-1.amazoncognito.com
 *   UTDK_COGNITO_CLIENT_ID  — Cognito app client id
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { readFileSync } from "fs";
import { homedir } from "os";
import { dirname, join } from "path";

interface CachedTokens {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  expiresAt: number;
}

function getCachePath(): string {
  const stateHome =
    process.env["XDG_STATE_HOME"] ?? join(homedir(), ".local", "state");
  return join(stateHome, "utdk", "tokens.json");
}

function readTokens(): CachedTokens | undefined {
  const cachePath = getCachePath();
  if (!existsSync(cachePath)) return undefined;
  try {
    return JSON.parse(readFileSync(cachePath, "utf-8")) as CachedTokens;
  } catch {
    return undefined;
  }
}

function writeTokens(tokens: CachedTokens): void {
  const cachePath = getCachePath();
  const cacheDir = dirname(cachePath);
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true, mode: 0o700 });
  }
  writeFileSync(cachePath, JSON.stringify(tokens, null, 2), {
    mode: 0o600,
    encoding: "utf-8",
  });
}

function isExpired(tokens: CachedTokens): boolean {
  return Math.floor(Date.now() / 1000) >= tokens.expiresAt - 60;
}

async function refreshTokens(
  refreshToken: string,
): Promise<CachedTokens | undefined> {
  const domain = process.env["UTDK_COGNITO_DOMAIN"];
  const clientId = process.env["UTDK_COGNITO_CLIENT_ID"];
  if (!domain || !clientId) return undefined;

  try {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    });
    const response = await fetch(`${domain}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    if (!response.ok) return undefined;

    const data = (await response.json()) as {
      access_token: string;
      refresh_token?: string;
      id_token?: string;
      expires_in: number;
    };

    const tokens: CachedTokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? refreshToken,
      idToken: data.id_token,
      expiresAt: Math.floor(Date.now() / 1000) + data.expires_in,
    };
    writeTokens(tokens);
    return tokens;
  } catch {
    return undefined;
  }
}

/**
 * Returns a valid gateway access token from the cache (refreshing if needed),
 * or undefined if no session exists.
 */
export async function getGatewayToken(): Promise<string | undefined> {
  let cached = readTokens();
  if (!cached) return undefined;

  if (isExpired(cached)) {
    const refreshed = await refreshTokens(cached.refreshToken);
    if (!refreshed) return undefined;
    cached = refreshed;
  }

  return cached.accessToken;
}
