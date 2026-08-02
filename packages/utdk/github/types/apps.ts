import type { AppPermissions, Authorization, BasicError, HookDelivery, HookDeliveryItem, Installation, InstallationToken, Integration, IntegrationInstallationRequest, MarketplaceListingPlan, MarketplacePurchase, Repository, UserMarketplacePurchase, ValidationError, WebhookConfig, WebhookConfigContentType, WebhookConfigInsecureSsl, WebhookConfigSecret, WebhookConfigUrl } from "./schemas.js";

export type AppsOperations = {
  /**
   * Get the authenticated app
   * @see https://docs.github.com/rest/apps/apps#get-the-authenticated-app
   */
  getAuthenticated: () => Promise<Integration>;

  /**
   * Create a GitHub App from a manifest
   * @see https://docs.github.com/rest/apps/apps#create-a-github-app-from-a-manifest
   */
  createFromManifest: (input: {
    code: string;
  }) => Promise<Integration & { client_id: string; client_secret: string; webhook_secret: string | null; pem: string; [key: string]: unknown }>;

  /**
   * Get a webhook configuration for an app
   * @see https://docs.github.com/rest/apps/webhooks#get-a-webhook-configuration-for-an-app
   */
  getWebhookConfigForApp: () => Promise<WebhookConfig>;

  /**
   * Update a webhook configuration for an app
   * @see https://docs.github.com/rest/apps/webhooks#update-a-webhook-configuration-for-an-app
   */
  updateWebhookConfigForApp: (input: {
    url?: WebhookConfigUrl;
    content_type?: WebhookConfigContentType;
    secret?: WebhookConfigSecret;
    insecure_ssl?: WebhookConfigInsecureSsl;
  }) => Promise<WebhookConfig>;

  /**
   * List deliveries for an app webhook
   * @see https://docs.github.com/rest/apps/webhooks#list-deliveries-for-an-app-webhook
   */
  listWebhookDeliveries: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
    cursor?: string;
    /** Returns webhook deliveries filtered by delivery outcome classification based on `status_code` range. A `status` of `success` returns deliveries with a `status_code` in the 200-399 range (inclusive). A `status` of `failure` returns deliveries with a `status_code` in the 400-599 range (inclusive). */
    status?: "success" | "failure";
  }) => Promise<(HookDeliveryItem)[]>;

  /**
   * Get a delivery for an app webhook
   * @see https://docs.github.com/rest/apps/webhooks#get-a-delivery-for-an-app-webhook
   */
  getWebhookDelivery: (input: {
    delivery_id: number;
  }) => Promise<HookDelivery>;

  /**
   * Redeliver a delivery for an app webhook
   * @see https://docs.github.com/rest/apps/webhooks#redeliver-a-delivery-for-an-app-webhook
   */
  redeliverWebhookDelivery: (input: {
    delivery_id: number;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * List installation requests for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#list-installation-requests-for-the-authenticated-app
   */
  listInstallationRequestsForAuthenticatedApp: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(IntegrationInstallationRequest)[]>;

  /**
   * List installations for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#list-installations-for-the-authenticated-app
   */
  listInstallations: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    outdated?: string;
  }) => Promise<(Installation)[]>;

  /**
   * Get an installation for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#get-an-installation-for-the-authenticated-app
   */
  getInstallation: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
  }) => Promise<Installation>;

  /**
   * Delete an installation for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#delete-an-installation-for-the-authenticated-app
   */
  deleteInstallation: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
  }) => Promise<BasicError>;

  /**
   * Create an installation access token for an app
   * @see https://docs.github.com/rest/apps/apps#create-an-installation-access-token-for-an-app
   */
  createInstallationAccessToken: (input: {
    /** List of repository names that the token should have access to */
    repositories?: (string)[];
    /** List of repository IDs that the token should have access to */
    repository_ids?: (number)[];
    permissions?: AppPermissions;
    /** The unique identifier of the installation. */
    installation_id: number;
  }) => Promise<InstallationToken>;

  /**
   * Suspend an app installation
   * @see https://docs.github.com/rest/apps/apps#suspend-an-app-installation
   */
  suspendInstallation: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
  }) => Promise<BasicError>;

  /**
   * Unsuspend an app installation
   * @see https://docs.github.com/rest/apps/apps#unsuspend-an-app-installation
   */
  unsuspendInstallation: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
  }) => Promise<BasicError>;

  /**
   * Delete an app authorization
   * @see https://docs.github.com/rest/apps/oauth-applications#delete-an-app-authorization
   */
  deleteAuthorization: (input: {
    /** The OAuth access token used to authenticate to the GitHub API. */
    access_token: string;
    /** The client ID of the GitHub app. */
    client_id: string;
  }) => Promise<ValidationError>;

  /**
   * Check a token
   * @see https://docs.github.com/rest/apps/oauth-applications#check-a-token
   */
  checkToken: (input: {
    /** The access_token of the OAuth or GitHub application. */
    access_token: string;
    /** The client ID of the GitHub app. */
    client_id: string;
  }) => Promise<Authorization>;

  /**
   * Reset a token
   * @see https://docs.github.com/rest/apps/oauth-applications#reset-a-token
   */
  resetToken: (input: {
    /** The access_token of the OAuth or GitHub application. */
    access_token: string;
    /** The client ID of the GitHub app. */
    client_id: string;
  }) => Promise<Authorization>;

  /**
   * Delete an app token
   * @see https://docs.github.com/rest/apps/oauth-applications#delete-an-app-token
   */
  deleteToken: (input: {
    /** The OAuth access token used to authenticate to the GitHub API. */
    access_token: string;
    /** The client ID of the GitHub app. */
    client_id: string;
  }) => Promise<ValidationError>;

  /**
   * Create a scoped access token
   * @see https://docs.github.com/rest/apps/apps#create-a-scoped-access-token
   */
  scopeToken: (input: {
    /** The access token used to authenticate to the GitHub API. */
    access_token: string;
    /** The name of the user or organization to scope the user access token to. **Required** unless `target_id` is specified. */
    target?: string;
    /** The ID of the user or organization to scope the user access token to. **Required** unless `target` is specified. */
    target_id?: number;
    /** The list of repository names to scope the user access token to. `repositories` may not be specified if `repository_ids` is specified. */
    repositories?: (string)[];
    /** The list of repository IDs to scope the user access token to. `repository_ids` may not be specified if `repositories` is specified. */
    repository_ids?: (number)[];
    permissions?: AppPermissions;
    /** The client ID of the GitHub app. */
    client_id: string;
  }) => Promise<Authorization>;

  /**
   * Get an app
   * @see https://docs.github.com/rest/apps/apps#get-an-app
   */
  getBySlug: (input: {
    app_slug: string;
  }) => Promise<Integration>;

  /**
   * List repositories accessible to the app installation
   * @see https://docs.github.com/rest/apps/installations#list-repositories-accessible-to-the-app-installation
   */
  listReposAccessibleToInstallation: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; repositories: (Repository & { custom_properties?: { [key: string]: unknown } })[]; repository_selection?: string }>;

  /**
   * Revoke an installation access token
   * @see https://docs.github.com/rest/apps/installations#revoke-an-installation-access-token
   */
  revokeInstallationAccessToken: () => Promise<unknown>;

  /**
   * Get a subscription plan for an account
   * @see https://docs.github.com/rest/apps/marketplace#get-a-subscription-plan-for-an-account
   */
  getSubscriptionPlanForAccount: (input: {
    /** account_id parameter */
    account_id: number;
  }) => Promise<MarketplacePurchase>;

  /**
   * List plans
   * @see https://docs.github.com/rest/apps/marketplace#list-plans
   */
  listPlans: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MarketplaceListingPlan)[]>;

  /**
   * List accounts for a plan
   * @see https://docs.github.com/rest/apps/marketplace#list-accounts-for-a-plan
   */
  listAccountsForPlan: (input: {
    /** The unique identifier of the plan. */
    plan_id: number;
    /** The property to sort the results by. */
    sort?: "created" | "updated";
    /** To return the oldest accounts first, set to `asc`. Ignored without the `sort` parameter. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MarketplacePurchase)[]>;

  /**
   * Get a subscription plan for an account (stubbed)
   * @see https://docs.github.com/rest/apps/marketplace#get-a-subscription-plan-for-an-account-stubbed
   */
  getSubscriptionPlanForAccountStubbed: (input: {
    /** account_id parameter */
    account_id: number;
  }) => Promise<MarketplacePurchase>;

  /**
   * List plans (stubbed)
   * @see https://docs.github.com/rest/apps/marketplace#list-plans-stubbed
   */
  listPlansStubbed: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MarketplaceListingPlan)[]>;

  /**
   * List accounts for a plan (stubbed)
   * @see https://docs.github.com/rest/apps/marketplace#list-accounts-for-a-plan-stubbed
   */
  listAccountsForPlanStubbed: (input: {
    /** The unique identifier of the plan. */
    plan_id: number;
    /** The property to sort the results by. */
    sort?: "created" | "updated";
    /** To return the oldest accounts first, set to `asc`. Ignored without the `sort` parameter. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MarketplacePurchase)[]>;

  /**
   * Get an organization installation for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#get-an-organization-installation-for-the-authenticated-app
   */
  getOrgInstallation: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<Installation>;

  /**
   * Get a repository installation for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#get-a-repository-installation-for-the-authenticated-app
   */
  getRepoInstallation: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Installation>;

  /**
   * List app installations accessible to the user access token
   * @see https://docs.github.com/rest/apps/installations#list-app-installations-accessible-to-the-user-access-token
   */
  listInstallationsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; installations: (Installation)[] }>;

  /**
   * List repositories accessible to the user access token
   * @see https://docs.github.com/rest/apps/installations#list-repositories-accessible-to-the-user-access-token
   */
  listInstallationReposForAuthenticatedUser: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; repository_selection?: string; repositories: (Repository & { custom_properties?: { [key: string]: unknown } })[] }>;

  /**
   * Add a repository to an app installation
   * @see https://docs.github.com/rest/apps/installations#add-a-repository-to-an-app-installation
   */
  addRepoToInstallationForAuthenticatedUser: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Remove a repository from an app installation
   * @see https://docs.github.com/rest/apps/installations#remove-a-repository-from-an-app-installation
   */
  removeRepoFromInstallationForAuthenticatedUser: (input: {
    /** The unique identifier of the installation. */
    installation_id: number;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * List subscriptions for the authenticated user
   * @see https://docs.github.com/rest/apps/marketplace#list-subscriptions-for-the-authenticated-user
   */
  listSubscriptionsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(UserMarketplacePurchase)[]>;

  /**
   * List subscriptions for the authenticated user (stubbed)
   * @see https://docs.github.com/rest/apps/marketplace#list-subscriptions-for-the-authenticated-user-stubbed
   */
  listSubscriptionsForAuthenticatedUserStubbed: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(UserMarketplacePurchase)[]>;

  /**
   * Get a user installation for the authenticated app
   * @see https://docs.github.com/rest/apps/apps#get-a-user-installation-for-the-authenticated-app
   */
  getUserInstallation: (input: {
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<Installation>;
};
