/**
 * Credential payload shapes are OWNED by `@aprovan/registry-server` and
 * re-exported here so the UI has exactly one definition. These were redeclared
 * locally until the MIGRATION-DEBT pass and had drifted: `clientId`/
 * `clientSecret` were required (they are optional upstream, so a redacted
 * platform-OAuth payload could not be represented), `clientOrigin` was absent,
 * and `oauth2_authcode` was missing the `accessToken`/`refreshToken`/
 * `expiresAt` fields the server writes back after the token exchange.
 *
 * Do not reintroduce copies — extend the package instead. These are `export
 * type` only, so nothing from the server package reaches the browser bundle.
 */
export type {
  ApiKeyPayload,
  BearerTokenPayload,
  CredentialPayload,
  CredentialType,
  OAuth2AuthCodePayload,
  OAuth2ClientPayload,
  OAuthClientOrigin,
} from "@aprovan/registry-server";

import type { CredentialPayload, CredentialType } from "@aprovan/registry-server";

export interface CredentialInput {
  provider: string;
  label?: string;
  payload: CredentialPayload;
}

export interface CredentialRecord {
  id: string;
  workspaceId: string;
  provider: string;
  label?: string;
  type: CredentialType;
  createdAt: string;
  updatedAt: string;
}

export type ProviderAuthMethod = CredentialType;

export interface CatalogProviderSummary {
  id: string;
  title: string;
  description?: string | null;
  auth: {
    methods: ProviderAuthMethod[];
    declared: boolean;
    apiKeyHeader?: string | null;
    oauth?: {
      authUrl?: string | null;
      tokenUrl?: string | null;
      scopes?: Record<string, string>;
    } | null;
  };
}

export interface OAuthPendingState {
  provider: string;
  label?: string;
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  redirectUri: string;
  scopes?: string[];
  state: string;
}

/**
 * Workspace profile wire shape (no credential payload).
 *
 * `ProfileTargetKind` and `ProfileLimits` are owned by
 * `@aprovan/registry-server`. The local copy of `ProfileTargetKind` predated
 * the `"path"` member and so could not represent a path profile at all.
 */
export type { ProfileLimits, ProfileTargetKind } from "@aprovan/registry-server";

import type { ProfileLimits, ProfileTargetKind } from "@aprovan/registry-server";

export interface ProfileWire {
  id: string;
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
  credentialLabel?: string;
}

export interface ProfileCreateInput {
  name: string;
  targetKind: ProfileTargetKind;
  targetId: string;
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
