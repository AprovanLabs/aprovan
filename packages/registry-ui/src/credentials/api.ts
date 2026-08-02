import type { GatewayClient } from "@aprovan/registry-main";
import type { CredentialInput, CredentialRecord } from "./types";

export function parseGatewayStatus(err: unknown): number | undefined {
  if (!(err instanceof Error)) return undefined;
  const match = err.message.match(/\((\d{3})\)/);
  return match ? Number(match[1]) : undefined;
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
