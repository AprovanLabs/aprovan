/**
 * Auth chain for @utdk/mcp-server.
 *
 * When UTDK_GATEWAY_URL is set, auth is resolved for the gateway:
 *   1. UTDK_GATEWAY_TOKEN env var — static bearer (CI/scripting)
 *   2. Cached Cognito session from `utdk login` — transparently refreshed
 *
 * When UTDK_GATEWAY_URL is not set, auth is resolved per-provider from
 * environment variables or the provider's utdk.auth config.
 */

import { ApiKey, BearerToken, OAuth2ClientCredentials } from "@utdk/common";
import type { AuthProvider } from "@utdk/common";
import { getGatewayToken } from "./token-cache.js";

export type { AuthProvider };

export interface UtdkAuthConfig {
  auth_type: string;
  api_key?: string;
  var_name?: string;
  location?: string;
  token_url?: string;
  client_id?: string;
  client_secret?: string;
  scope?: string;
}

/**
 * Interpolate `${ENV_VAR}` placeholders in a string with actual environment values.
 * Returns null if any placeholder resolved to an empty or missing env var.
 */
function interpolateEnv(value: string): string | null {
  let hasEmpty = false;
  const result = value.replace(/\$\{([^}]+)\}/g, (_match, varName: string) => {
    const envValue = process.env[varName];
    if (!envValue) {
      hasEmpty = true;
    }
    return envValue ?? "";
  });
  return hasEmpty ? null : result;
}

/**
 * Build an AuthProvider from a provider's `utdk.auth` config entry and env vars.
 * Returns undefined if no credentials are found in the environment.
 */
function authFromConfig(config: UtdkAuthConfig): AuthProvider | undefined {
  const authType = config.auth_type;

  if (authType === "api_key" && config.api_key) {
    const resolved = interpolateEnv(config.api_key);
    if (resolved === null) return undefined;

    const trimmed = resolved.trim();
    if (!trimmed) return undefined;

    const varName = config.var_name ?? "Authorization";
    const location = config.location ?? "header";

    if (location !== "header") {
      // Query/cookie auth not yet supported in this chain
      return undefined;
    }

    // If the value looks like "Bearer <token>", use BearerToken; otherwise ApiKey
    const bearerMatch = /^Bearer\s+(\S.*)$/.exec(trimmed);
    if (bearerMatch) {
      return new BearerToken((bearerMatch[1] as string).trim());
    }

    return new ApiKey({ headerName: varName, value: trimmed });
  }

  if (authType === "oauth2") {
    const clientId = config.client_id ? interpolateEnv(config.client_id) : null;
    const clientSecret = config.client_secret ? interpolateEnv(config.client_secret) : null;

    if (clientId && clientSecret && config.token_url) {
      return new OAuth2ClientCredentials({
        clientId,
        clientSecret,
        tokenUrl: config.token_url,
        scopes: config.scope?.split(/\s+/) ?? [],
      });
    }

    return undefined;
  }

  return undefined;
}

/**
 * AuthProvider that reads the Cognito token cache (written by `utdk login`)
 * and refreshes transparently when the access token is near expiry.
 */
function cachedCognitoProvider(): AuthProvider {
  return {
    async authenticate(headers: Record<string, string>): Promise<void> {
      const token = await getGatewayToken();
      if (!token) {
        throw new Error(
          "Gateway session not found. Run `utdk login` or set UTDK_GATEWAY_TOKEN.",
        );
      }
      headers["Authorization"] = `Bearer ${token}`;
    },
  };
}

/**
 * Build an AuthProvider for a provider from its utdk auth config array.
 *
 * When UTDK_GATEWAY_URL is set, returns gateway auth (static token or
 * cached Cognito session).  Otherwise resolves provider-specific auth from
 * env vars and the utdk.auth config.
 */
export function buildAuthProvider(
  providerName: string,
  authConfigs: UtdkAuthConfig[],
): AuthProvider | undefined {
  const gatewayUrl = process.env["UTDK_GATEWAY_URL"];

  if (gatewayUrl) {
    // 1. Static token override (CI/scripting)
    const gatewayToken = process.env["UTDK_GATEWAY_TOKEN"];
    if (gatewayToken) {
      return new BearerToken(gatewayToken);
    }

    // 2. Cached Cognito session from `utdk login`
    return cachedCognitoProvider();
  }

  // 3. Per-provider auth from env / utdk.auth config
  const providerToken = process.env[`${providerName.toUpperCase()}_TOKEN`];
  if (providerToken) {
    return new BearerToken(providerToken);
  }

  for (const config of authConfigs) {
    const provider = authFromConfig(config);
    if (provider) return provider;
  }

  return undefined;
}
