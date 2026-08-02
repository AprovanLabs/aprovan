/**
 * Storage contract — per-domain store interfaces behind one `RegistryStorage`
 * facade (tech-plan D8). Every method takes an explicit `tenantId` first
 * (tech-plan D2): a missing tenant is a compile error, not a runtime default.
 *
 * The schema is relational and identical across drivers; credential payloads
 * are opaque TEXT here — the credentialCipher envelope is applied by the
 * credentials domain layer, never by a driver.
 */

// ---------------------------------------------------------------------------
// Rows
// ---------------------------------------------------------------------------

export interface TenantRow {
  id: string;
  displayName?: string;
  createdAt: string;
}

/** Credential types are shared WS-2 vocabulary (@utdk/common/auth). */
export type { CredentialType } from "@utdk/common/auth";
import type { CredentialType } from "@utdk/common/auth";

export interface CredentialRow {
  id: string;
  tenantId: string;
  provider: string;
  /** Display only; NOT a resolution mechanism. */
  label?: string;
  type: CredentialType;
  /** NEW user/owner dimension (decision 7); undefined = tenant-shared. */
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CredentialRowWithPayload extends CredentialRow {
  /** credentialCipher envelope (kms|local|none) — opaque to storage. */
  payload: string;
}

export type ProfileTargetKind = "interface" | "provider";

export interface ProfileRow {
  id: string;
  tenantId: string;
  /** "default" reserved for bare-namespace dispatch. */
  name: string;
  targetKind: ProfileTargetKind;
  /** Interface id ('sql') or provider id ('github'). */
  targetId: string;
  /** Interface targets: executing compat provider. */
  provider?: string;
  /** NULL allowed (credentialless compat entries). */
  credentialId?: string;
  /** JSON: model, database, baseUrl, … */
  options: Record<string, unknown>;
  /** JSON: { rps, burst, budget? } server-enforced. */
  limits?: ProfileLimits;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileLimits {
  rps?: number;
  burst?: number;
  /** Calls per rolling 24h (PRD open question resolution). */
  budget?: number;
}

export type GrantSubjectKind = "user" | "group" | "app" | "workflow" | "agent";

export interface ProfileGrantRow {
  tenantId: string;
  profileId: string;
  subjectKind: GrantSubjectKind;
  subjectId: string;
  grantedBy: string;
  createdAt: string;
}

export interface ApiKeyRow {
  id: string;
  tenantId: string;
  /** sha256 of the full key; plaintext shown once. */
  digest: string;
  label?: string;
  createdBy: string;
  createdAt: string;
  revokedAt?: string;
}

export interface AuditRow {
  requestId: string;
  tenantId: string;
  principal: string;
  namespace: string;
  operation: string;
  profileId?: string;
  status: number;
  durationMs?: number;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Store interfaces (tenantId is ALWAYS the first parameter)
// ---------------------------------------------------------------------------

export interface TenantStore {
  /** Create-if-absent; returns the row either way (auto-provision-on-first-use). */
  ensure(id: string, displayName?: string): Promise<TenantRow>;
  get(id: string): Promise<TenantRow | undefined>;
  list(): Promise<TenantRow[]>;
}

export interface CredentialStore {
  create(
    tenantId: string,
    input: {
      provider: string;
      label?: string;
      type: CredentialType;
      payload: string;
      createdBy?: string;
    },
  ): Promise<CredentialRow>;
  list(tenantId: string): Promise<CredentialRow[]>;
  get(tenantId: string, id: string): Promise<CredentialRow | undefined>;
  getWithPayload(tenantId: string, id: string): Promise<CredentialRowWithPayload | undefined>;
  /** First credential for the provider, creation order — the zero-config pick. */
  firstForProvider(tenantId: string, provider: string): Promise<CredentialRowWithPayload | undefined>;
  updatePayload(tenantId: string, id: string, payload: string): Promise<void>;
  delete(tenantId: string, id: string): Promise<boolean>;
}

export interface ProfileStore {
  create(
    tenantId: string,
    input: Omit<ProfileRow, "id" | "tenantId" | "createdAt" | "updatedAt"> & { id?: string },
  ): Promise<ProfileRow>;
  update(
    tenantId: string,
    id: string,
    patch: Partial<Pick<ProfileRow, "name" | "provider" | "credentialId" | "options" | "limits">>,
  ): Promise<ProfileRow | undefined>;
  delete(tenantId: string, id: string): Promise<boolean>;
  getById(tenantId: string, id: string): Promise<ProfileRow | undefined>;
  /** The uniqueness key: (tenant, target_kind, target_id, name). */
  getByName(
    tenantId: string,
    targetKind: ProfileTargetKind,
    targetId: string,
    name: string,
  ): Promise<ProfileRow | undefined>;
  list(
    tenantId: string,
    filter?: { targetKind?: ProfileTargetKind; targetId?: string },
  ): Promise<ProfileRow[]>;
  /** Names that exist for a target — the loud named-miss listing. */
  namesForTarget(tenantId: string, targetKind: ProfileTargetKind, targetId: string): Promise<string[]>;
}

export interface GrantSubject {
  kind: GrantSubjectKind;
  id: string;
}

export interface GrantStore {
  grant(
    tenantId: string,
    profileId: string,
    subject: GrantSubject,
    grantedBy: string,
  ): Promise<ProfileGrantRow>;
  revoke(tenantId: string, profileId: string, subject: GrantSubject): Promise<boolean>;
  listForProfile(tenantId: string, profileId: string): Promise<ProfileGrantRow[]>;
  /**
   * The auth-time join (tech-plan D12): every profile id granted to any of
   * the given subjects, in ONE indexed query — no per-call N+1.
   */
  grantedProfileIds(tenantId: string, subjects: GrantSubject[]): Promise<Set<string>>;
}

export interface ApiKeyStore {
  create(
    tenantId: string,
    input: { digest: string; label?: string; createdBy: string },
  ): Promise<ApiKeyRow>;
  /** Key → tenant resolution; includes revoked rows (caller checks revokedAt). */
  findByDigest(digest: string): Promise<ApiKeyRow | undefined>;
  list(tenantId: string): Promise<ApiKeyRow[]>;
  revoke(tenantId: string, id: string): Promise<boolean>;
}

export interface AuditStore {
  append(row: Omit<AuditRow, "createdAt">): Promise<void>;
  query(tenantId: string, filter?: { since?: string; limit?: number }): Promise<AuditRow[]>;
}

// ---------------------------------------------------------------------------
// Facade
// ---------------------------------------------------------------------------

export interface RegistryStorage {
  tenants: TenantStore;
  credentials: CredentialStore;
  profiles: ProfileStore;
  grants: GrantStore;
  apiKeys: ApiKeyStore;
  audit: AuditStore;
  close(): Promise<void>;
}

/** Duck-type check: is this options value a caller-provided RegistryStorage? */
export function isRegistryStorage(value: unknown): value is RegistryStorage {
  return (
    typeof value === "object" &&
    value !== null &&
    !("driver" in value) &&
    "tenants" in value &&
    "credentials" in value &&
    "profiles" in value
  );
}
