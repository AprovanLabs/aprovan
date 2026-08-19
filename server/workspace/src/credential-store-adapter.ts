/**
 * Adapts the workspace `ICredentialStore` (Dynamo on the interim backend) onto
 * `@aprovan/registry-server`'s `CredentialStore` so profile CRUD can resolve
 * credential labels and validate pins without duplicating credential rows.
 */

import type {
  CredentialLevel,
  CredentialRow,
  CredentialStore,
  CredentialType,
} from "@aprovan/registry-server";
import { getCredentialCipher } from "./credentialCipher.js";
import { resolveWorkspaceCredential } from "./credentials.js";
import type { CredentialPayload, ICredentialStore } from "./credentials.js";

export function adaptCredentialStore(store: ICredentialStore): CredentialStore {
  return {
    async create(tenantId, input) {
      const payload = JSON.parse(
        await getCredentialCipher().decrypt(input.payload),
      ) as CredentialPayload;
      const row = await store.create(tenantId, {
        provider: input.provider,
        ...(input.label !== undefined ? { label: input.label } : {}),
        payload,
        ...(input.createdBy !== undefined ? { createdBy: input.createdBy } : {}),
        ...(input.level !== undefined ? { level: input.level } : {}),
      });
      return toRow(tenantId, row);
    },
    async list(tenantId) {
      return (await store.list(tenantId)).map((row) => toRow(tenantId, row));
    },
    async get(tenantId, id) {
      const row = await store.get(tenantId, id);
      return row ? toRow(tenantId, row) : undefined;
    },
    async getWithPayload(tenantId, id) {
      const row = await store.get(tenantId, id);
      if (!row) return undefined;
      const payload = await store.getPayload(tenantId, id);
      if (!payload) return undefined;
      return {
        ...toRow(tenantId, row),
        payload: await getCredentialCipher().encrypt(JSON.stringify(payload)),
      };
    },
    async firstForProvider(tenantId, provider) {
      // No invoker in scope here, so this path resolves through the
      // workspace-only resolver (tech-plan D6/D6a): a `user-oauth` row is
      // structurally unreachable, not merely unpicked.
      const resolved = await resolveWorkspaceCredential(tenantId, provider);
      if (!resolved) return undefined;
      const row = await store.get(tenantId, resolved.id);
      if (!row) return undefined;
      return {
        ...toRow(tenantId, row),
        payload: await getCredentialCipher().encrypt(JSON.stringify(resolved.payload)),
      };
    },
    async updatePayload(tenantId, id, payload) {
      const decrypted = JSON.parse(
        await getCredentialCipher().decrypt(payload),
      ) as CredentialPayload;
      await store.updatePayload(tenantId, id, decrypted);
    },
    async delete(tenantId, id) {
      return store.delete(tenantId, id);
    },
  };
}

function toRow(
  tenantId: string,
  row: {
    id: string;
    provider: string;
    label?: string;
    type: string;
    level: CredentialLevel;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
  },
): CredentialRow {
  return {
    id: row.id,
    tenantId,
    provider: row.provider,
    ...(row.label !== undefined ? { label: row.label } : {}),
    type: row.type as CredentialType,
    level: row.level,
    ...(row.createdBy !== undefined ? { createdBy: row.createdBy } : {}),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
