export type CredentialType =
  | "bearer_token"
  | "api_key"
  | "oauth2_client"
  | "oauth2_authcode";

export interface BearerTokenPayload {
  type: "bearer_token";
  token: string;
}

export interface ApiKeyPayload {
  type: "api_key";
  value: string;
  headerName?: string;
}

export interface OAuth2ClientPayload {
  type: "oauth2_client";
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  scopes?: string[];
}

export interface OAuth2AuthCodePayload {
  type: "oauth2_authcode";
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  code: string;
  redirectUri: string;
  codeVerifier?: string;
  scopes?: string[];
}

export type CredentialPayload =
  | BearerTokenPayload
  | ApiKeyPayload
  | OAuth2ClientPayload
  | OAuth2AuthCodePayload;

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

/** Workspace profile wire shape (no credential payload). */
export type ProfileTargetKind = "interface" | "provider";

export interface ProfileLimits {
  rps?: number;
  burst?: number;
  budget?: number;
}

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
