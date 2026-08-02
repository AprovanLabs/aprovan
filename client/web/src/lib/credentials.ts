/**
 * Credential API helpers for the product app credentials panel.
 */

import { GatewayError } from "@aprovan/ui/gateway";
import { gateway } from "@/lib/gateway";

export type CredentialType =
  | "bearer_token"
  | "api_key"
  | "oauth2_client"
  | "oauth2_authcode";

export interface CredentialRecord {
  id: string;
  workspaceId: string;
  provider: string;
  label?: string;
  type: CredentialType;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialInput {
  provider: string;
  label?: string;
  payload: Record<string, unknown>;
}

export { GatewayError };

export async function listCredentials(): Promise<CredentialRecord[]> {
  const data = await gateway.request<{ credentials: CredentialRecord[] }>("/credentials");
  return data.credentials;
}

export async function addCredential(input: CredentialInput): Promise<CredentialRecord> {
  return gateway.request<CredentialRecord>("/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}

export async function deleteCredential(id: string): Promise<void> {
  await gateway.request<void>(`/credentials/${id}`, { method: "DELETE" });
}

const OAUTH_PENDING_KEY = "aprovan:oauth-pending";

export interface OAuthPending {
  provider: string;
  label?: string;
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  redirectUri: string;
  scopes?: string[];
  state: string;
}

export function saveOAuthPending(pending: OAuthPending): void {
  sessionStorage.setItem(OAUTH_PENDING_KEY, JSON.stringify(pending));
}

export function loadOAuthPending(): OAuthPending | null {
  const raw = sessionStorage.getItem(OAUTH_PENDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as OAuthPending;
  } catch {
    return null;
  }
}

export function clearOAuthPending(): void {
  sessionStorage.removeItem(OAUTH_PENDING_KEY);
}

const CREDENTIALS_PREFILL_KEY = "aprovan:credentials-prefill";
const CREDENTIALS_MOUNT_KEY = "aprovan:credentials-mount";

/** Stash provider prefill before opening the credentials native tab. */
export function stashCredentialsPrefill(provider?: string): string {
  const mountKey = String(Date.now());
  sessionStorage.setItem(CREDENTIALS_MOUNT_KEY, mountKey);
  if (provider) sessionStorage.setItem(CREDENTIALS_PREFILL_KEY, provider);
  else sessionStorage.removeItem(CREDENTIALS_PREFILL_KEY);
  return mountKey;
}

export function readCredentialsPrefill(): {
  mountKey: string;
  provider?: string;
} {
  return {
    mountKey: sessionStorage.getItem(CREDENTIALS_MOUNT_KEY) ?? "initial",
    provider: sessionStorage.getItem(CREDENTIALS_PREFILL_KEY) ?? undefined,
  };
}
