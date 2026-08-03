export type AdminCapability =
  | "members"
  | "groups"
  | "permissions"
  | "api-keys"
  | "profiles"
  | "audit";

/** Hosted product-gateway default — workspace app passes no `capabilities` prop. */
export const DEFAULT_ADMIN_CAPABILITIES: ReadonlyArray<AdminCapability> = [
  "members",
  "groups",
  "permissions",
];

export interface Member {
  userId: string;
  role: string;
  createdAt?: string;
}

export interface Group {
  workspaceId: string;
  groupId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PermissionGrant {
  id: string;
  workspaceId: string;
  callerId: string;
  provider: string;
  operation: string;
  grantedBy: string;
  createdAt: string;
}

/** API key row as returned by GET/POST /api-keys (digest never leaves the server). */
export interface ApiKey {
  id: string;
  tenantId: string;
  label?: string;
  createdBy: string;
  createdAt: string;
  revokedAt?: string;
}

export type ProfileTargetKind = "interface" | "provider";

export interface ProfileLimits {
  rps?: number;
  burst?: number;
  budget?: number;
}

export interface Profile {
  id: string;
  tenantId: string;
  name: string;
  targetKind: ProfileTargetKind;
  targetId: string;
  provider?: string;
  credentialId?: string;
  options: Record<string, unknown>;
  limits?: ProfileLimits;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type GrantSubjectKind = "user" | "group" | "app" | "workflow" | "agent";

export interface ProfileGrant {
  tenantId: string;
  profileId: string;
  subjectKind: GrantSubjectKind;
  subjectId: string;
  grantedBy: string;
  createdAt: string;
}

export interface ProfileCreateInput {
  name: string;
  target: { kind: "interface"; interface: string } | { kind: "provider"; provider: string };
  provider?: string;
  credentialId?: string;
  options?: Record<string, unknown>;
  limits?: ProfileLimits;
}

export interface ProfileUpdateInput {
  name?: string;
  provider?: string;
  credentialId?: string | null;
  options?: Record<string, unknown>;
  limits?: ProfileLimits | null;
}

export interface AuditEntry {
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
