import type { AttachmentPayload, GraphQlResponse, TokenResponse, Webhook, WebhookList } from "./schemas.js";

export type LinearClient = {
  /**
   * Execute a GraphQL query or mutation
   */
  executeGraphQl: (input: {
    /** The GraphQL query or mutation string */
    query: string;
    /** Variables to pass to the GraphQL query */
    variables?: { [key: string]: unknown };
    /** Name of the operation to execute (for multi-operation documents) */
    operationName?: string;
  }) => Promise<GraphQlResponse>;

  /**
   * Exchange authorization code for access token
   */
  exchangeOAuthToken: (input: {
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
  }) => Promise<TokenResponse>;

  /**
   * Revoke an OAuth access token
   */
  revokeOAuthToken: (input: {
    /** The access token to revoke */
    access_token: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * List webhooks
   */
  listWebhooks: (input: {
    /** Pagination cursor for fetching the next page of results */
    cursor?: string;
    /** Maximum number of webhooks to return (1-250) */
    limit?: number;
  }) => Promise<WebhookList>;

  /**
   * Create a webhook
   */
  createWebhook: (input: {
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
  }) => Promise<Webhook>;

  /**
   * Get a webhook
   */
  getWebhook: (input: {
    /** The unique identifier of the webhook */
    webhookId: string;
  }) => Promise<Webhook>;

  /**
   * Update a webhook
   */
  updateWebhook: (input: {
    /** New URL for the webhook */
    url?: string;
    /** New HMAC secret */
    secret?: string;
    /** Enable or disable the webhook */
    enabled?: boolean;
    /** Updated list of resource types to subscribe to */
    resourceTypes?: (string)[];
    /** The unique identifier of the webhook */
    webhookId: string;
  }) => Promise<Webhook>;

  /**
   * Delete a webhook
   */
  deleteWebhook: (input: {
    /** The unique identifier of the webhook to delete */
    webhookId: string;
  }) => Promise<{ success?: boolean; lastSyncId?: number }>;

  /**
   * Create an attachment on an issue
   */
  createAttachment: (input: {
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
  }) => Promise<AttachmentPayload>;
};

export * from "./schemas.js";
