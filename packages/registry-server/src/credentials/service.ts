/**
 * Credential domain service — the cipher-aware layer over the storage rows.
 * Payloads are sealed with the credentialCipher envelope (kms/local/none) on
 * write and opened on read; `created_by` is populated from the calling
 * context (profiles spec "Credential owner dimension").
 */

import { getCredentialCipher } from "./cipher.js";
import { exchangeAuthorizationCode } from "./oauth.js";
import type { CredentialPayload } from "./types.js";
import type { CredentialRow, CredentialStore } from "../storage/types.js";

export interface CredentialInput {
  provider: string;
  label?: string;
  payload: CredentialPayload;
}

export class CredentialResolutionError extends Error {
  readonly status = 400;
}

export class CredentialService {
  constructor(private readonly store: CredentialStore) {}

  /**
   * Create a credential. Authorization-code payloads exchange their one-time
   * code up front (codes expire in minutes) so the stored payload carries
   * live tokens.
   */
  async create(
    tenantId: string,
    createdBy: string,
    input: CredentialInput,
  ): Promise<CredentialRow> {
    let payload = input.payload;
    if (payload.type === "oauth2_authcode" && payload.code && !payload.accessToken) {
      try {
        const tokens = await exchangeAuthorizationCode(payload);
        payload = {
          ...payload,
          code: "",
          accessToken: tokens.accessToken,
          ...(tokens.refreshToken ? { refreshToken: tokens.refreshToken } : {}),
          ...(tokens.expiresAt !== undefined ? { expiresAt: tokens.expiresAt } : {}),
        };
      } catch {
        // Store as-is; call-time resolution reports the provider's error.
      }
    }
    return this.store.create(tenantId, {
      provider: input.provider,
      ...(input.label !== undefined ? { label: input.label } : {}),
      type: payload.type,
      payload: await getCredentialCipher().encrypt(JSON.stringify(payload)),
      createdBy,
    });
  }

  list(tenantId: string): Promise<CredentialRow[]> {
    return this.store.list(tenantId);
  }

  get(tenantId: string, id: string): Promise<CredentialRow | undefined> {
    return this.store.get(tenantId, id);
  }

  delete(tenantId: string, id: string): Promise<boolean> {
    return this.store.delete(tenantId, id);
  }

  async getPayload(tenantId: string, id: string): Promise<CredentialPayload | undefined> {
    const row = await this.store.getWithPayload(tenantId, id);
    if (!row) return undefined;
    return JSON.parse(await getCredentialCipher().decrypt(row.payload)) as CredentialPayload;
  }

  /**
   * Resolve one specific credential by id — loud on a miss and on a provider
   * mismatch (a pinned credential that cannot be honoured is a configuration
   * bug, never a silent fallback).
   */
  async resolveById(
    tenantId: string,
    credentialId: string,
    expectedProvider?: string,
  ): Promise<{ id: string; provider: string; payload: CredentialPayload }> {
    const row = await this.store.getWithPayload(tenantId, credentialId);
    if (!row) {
      throw new CredentialResolutionError(
        `Credential ${credentialId} does not exist in this tenant`,
      );
    }
    if (expectedProvider && row.provider !== expectedProvider) {
      throw new CredentialResolutionError(
        `Credential ${credentialId} belongs to ${row.provider}, not ${expectedProvider}`,
      );
    }
    return {
      id: row.id,
      provider: row.provider,
      payload: JSON.parse(await getCredentialCipher().decrypt(row.payload)) as CredentialPayload,
    };
  }

  /** First credential for the provider, creation order — the zero-config pick. */
  async firstForProvider(
    tenantId: string,
    provider: string,
  ): Promise<{ id: string; payload: CredentialPayload } | undefined> {
    const row = await this.store.firstForProvider(tenantId, provider);
    if (!row) return undefined;
    return {
      id: row.id,
      payload: JSON.parse(await getCredentialCipher().decrypt(row.payload)) as CredentialPayload,
    };
  }

  async updatePayload(tenantId: string, id: string, payload: CredentialPayload): Promise<void> {
    await this.store.updatePayload(
      tenantId,
      id,
      await getCredentialCipher().encrypt(JSON.stringify(payload)),
    );
  }
}
