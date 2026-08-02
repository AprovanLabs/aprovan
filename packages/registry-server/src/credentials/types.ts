/**
 * Credential payload shapes — the decrypted contents of a credential row.
 * The type vocabulary is the shared WS-2 tuple (@utdk/common/auth).
 */

export type { CredentialType } from "@utdk/common/auth";

export interface BearerTokenPayload {
  type: "bearer_token";
  token: string;
}

export interface ApiKeyPayload {
  type: "api_key";
  value: string;
  /** Header to inject (default: X-Api-Key) */
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
  /** Resolved tokens, written after the authorization-code exchange. */
  accessToken?: string;
  refreshToken?: string;
  /** Epoch ms when the access token expires. */
  expiresAt?: number;
}

export type CredentialPayload =
  | BearerTokenPayload
  | ApiKeyPayload
  | OAuth2ClientPayload
  | OAuth2AuthCodePayload;

/**
 * What the executor may receive: bearer token or api key ONLY. OAuth payloads
 * are pre-resolved to injectable bearer tokens in the dispatch pipeline
 * (provider-execution spec "OAuth pre-resolution").
 */
export type InjectableCredential = BearerTokenPayload | ApiKeyPayload;
