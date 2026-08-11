/** Artifact share record returned by `vfs.share` / `vfs.shares.list`. */
export type ShareKind = "person" | "link";

export interface VfsShare {
  shareId: string;
  path: string;
  kind: ShareKind;
  /** Platform user sub when kind is "person". */
  grantee?: string;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  revokedAt?: string;
}

export interface WorkspaceMember {
  userId: string;
  name?: string;
  email?: string;
  role?: string;
}

/** Row status for Manage shares — revoke failure is sticky until retry/reload. */
export type ShareRowStatus = "active" | "expired" | "revoked" | "revoke_failed";

export interface ShareFilePayload {
  path: string;
  content: string;
  mimeType?: string;
  size?: number;
  hash?: string;
  updatedAt?: string;
}

/** Far-future ISO used when the Link tab opts into "No expiry". */
export const NO_EXPIRY_ISO = "9999-12-31T23:59:59.000Z";

export type ExpiryChoice = "7d" | "30d" | "90d" | "none";
