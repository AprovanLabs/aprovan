export type GraphQlRequest = {
  /** The GraphQL query or mutation string */
  query: string;
  /** Variables to pass to the GraphQL query */
  variables?: { [key: string]: unknown };
  /** Name of the operation to execute (for multi-operation documents) */
  operationName?: string;
};

export type GraphQlResponse = {
  /** The response data */
  data?: { [key: string]: unknown };
  errors?: (GraphQlError)[];
};

export type GraphQlError = {
  message?: string;
  locations?: ({ line?: number; column?: number })[];
  path?: (string)[];
};

export type TokenRequest = {
  /** Authorization code received from the OAuth callback */
  code: string;
  /** Redirect URI used in the authorization request */
  redirect_uri: string;
  /** Application client ID */
  client_id: string;
  /** Application client secret */
  client_secret: string;
  /** OAuth grant type */
  grant_type: "authorization_code";
};

export type TokenResponse = {
  /** OAuth access token */
  access_token?: string;
  /** Token type (always 'Bearer') */
  token_type?: string;
  /** Token expiration time in seconds */
  expires_in?: number;
  /** Refresh token for obtaining new access tokens */
  refresh_token?: string;
  /** Granted OAuth scopes */
  scope?: string;
};

export type Webhook = {
  /** Unique webhook identifier */
  id?: string;
  /** The URL that receives webhook event payloads */
  url?: string;
  /** Whether the webhook is active */
  enabled?: boolean;
  /** HMAC secret for validating webhook signatures */
  secret?: string;
  /** Resource types this webhook listens to (e.g. Issue, Comment, Project) */
  resourceTypes?: (string)[];
  /** Team this webhook is scoped to (null for workspace-wide) */
  teamId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type WebhookList = {
  nodes?: (Webhook)[];
  pageInfo?: PageInfo;
};

export type PageInfo = {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
  endCursor?: string;
};

export type CreateWebhookRequest = {
  /** URL to receive webhook event payloads */
  url: string;
  /** HMAC secret for signing webhook payloads */
  secret?: string;
  /** Whether to enable the webhook immediately */
  enabled?: boolean;
  /** Resource types to subscribe to */
  resourceTypes?: (string)[];
  /** Team to scope this webhook to (omit for workspace-wide) */
  teamId?: string;
};

export type UpdateWebhookRequest = {
  /** New URL for the webhook */
  url?: string;
  /** New HMAC secret */
  secret?: string;
  /** Enable or disable the webhook */
  enabled?: boolean;
  /** Updated list of resource types to subscribe to */
  resourceTypes?: (string)[];
};

export type CreateAttachmentRequest = {
  /** ID of the issue to attach to */
  issueId: string;
  /** URL of the external resource */
  url: string;
  /** Display title for the attachment */
  title: string;
  /** Optional subtitle shown below the title */
  subtitle?: string;
  /** URL of the attachment icon */
  iconUrl?: string;
  /** Additional metadata for the attachment */
  metadata?: { [key: string]: unknown };
};

export type AttachmentPayload = {
  success?: boolean;
  lastSyncId?: number;
  attachment?: { id?: string; url?: string; title?: string; subtitle?: string; createdAt?: string };
};

export type Error = {
  message?: string;
  extensions?: { [key: string]: unknown };
};
