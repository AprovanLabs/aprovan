import type { GatewayClient } from "@aprovan/registry-main";
import type {
  CredentialInput,
  CredentialRecord,
  ProfileCreateInput,
  ProfileUpdateInput,
  ProfileWire,
} from "./types";

export function parseGatewayStatus(err: unknown): number | undefined {
  if (!(err instanceof Error)) return undefined;
  const match = err.message.match(/\((\d{3})\)/);
  return match ? Number(match[1]) : undefined;
}

/** True when the gateway answered 501 (feature-detected capability gap). */
export function isUnavailable(err: unknown): boolean {
  return parseGatewayStatus(err) === 501;
}

export async function listCredentials(client: GatewayClient): Promise<CredentialRecord[]> {
  const data = await client.request<{ credentials: CredentialRecord[] }>("/credentials");
  return data.credentials;
}

export async function addCredential(
  client: GatewayClient,
  input: CredentialInput,
): Promise<CredentialRecord> {
  return client.request<CredentialRecord>("/credentials", true, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function deleteCredential(client: GatewayClient, id: string): Promise<void> {
  await client.request<void>(`/credentials/${id}`, true, { method: "DELETE" });
}

export async function listWorkspaceProfiles(client: GatewayClient): Promise<ProfileWire[]> {
  const data = await client.request<{ profiles: ProfileWire[] }>("/profiles");
  return data.profiles;
}

export async function createWorkspaceProfile(
  client: GatewayClient,
  input: ProfileCreateInput,
): Promise<ProfileWire> {
  const data = await client.request<{ profile: ProfileWire }>("/profiles", true, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return data.profile;
}

export async function updateWorkspaceProfile(
  client: GatewayClient,
  id: string,
  input: ProfileUpdateInput,
): Promise<ProfileWire> {
  const data = await client.request<{ profile: ProfileWire }>(`/profiles/${id}`, true, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return data.profile;
}

export async function deleteWorkspaceProfile(
  client: GatewayClient,
  id: string,
): Promise<void> {
  await client.request<{ ok: boolean }>(`/profiles/${id}`, true, { method: "DELETE" });
}
