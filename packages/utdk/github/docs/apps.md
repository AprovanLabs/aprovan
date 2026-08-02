# Apps

37 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.apps.getAuthenticated`

Get the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#get-the-authenticated-app)

```ts
github.apps.getAuthenticated(): Promise<Integration>
```

<sub>`GET /app` · `apps/get-authenticated`</sub>

## `github.apps.createFromManifest`

Create a GitHub App from a manifest — [API reference](https://docs.github.com/rest/apps/apps#create-a-github-app-from-a-manifest)

```ts
github.apps.createFromManifest(input: {
  code: string;
}): Promise<Integration & { client_id: string; client_secret: string; webhook_secret: string | null; pem: string; [key: string]: unknown }>
```

<sub>`POST /app-manifests/{code}/conversions` · `apps/create-from-manifest`</sub>

## `github.apps.getWebhookConfigForApp`

Get a webhook configuration for an app — [API reference](https://docs.github.com/rest/apps/webhooks#get-a-webhook-configuration-for-an-app)

```ts
github.apps.getWebhookConfigForApp(): Promise<WebhookConfig>
```

<sub>`GET /app/hook/config` · `apps/get-webhook-config-for-app`</sub>

## `github.apps.updateWebhookConfigForApp`

Update a webhook configuration for an app — [API reference](https://docs.github.com/rest/apps/webhooks#update-a-webhook-configuration-for-an-app)

```ts
github.apps.updateWebhookConfigForApp(input: {
  url?: WebhookConfigUrl;
  content_type?: WebhookConfigContentType;
  secret?: WebhookConfigSecret;
  insecure_ssl?: WebhookConfigInsecureSsl;
}): Promise<WebhookConfig>
```

<sub>`PATCH /app/hook/config` · `apps/update-webhook-config-for-app`</sub>

## `github.apps.listWebhookDeliveries`

List deliveries for an app webhook — [API reference](https://docs.github.com/rest/apps/webhooks#list-deliveries-for-an-app-webhook)

```ts
github.apps.listWebhookDeliveries(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
  cursor?: string;
  /** Returns webhook deliveries filtered by delivery outcome classification based on `status_code` range. A `status` of `success` returns deliveries with a `status_code` in the 200-399 range (inclusive). A `status` of `failure` returns deliveries with a `status_code` in the 400-599 range (inclusive). */
  status?: "success" | "failure";
}): Promise<(HookDeliveryItem)[]>
```

<sub>`GET /app/hook/deliveries` · `apps/list-webhook-deliveries`</sub>

## `github.apps.getWebhookDelivery`

Get a delivery for an app webhook — [API reference](https://docs.github.com/rest/apps/webhooks#get-a-delivery-for-an-app-webhook)

```ts
github.apps.getWebhookDelivery(input: {
  delivery_id: number;
}): Promise<HookDelivery>
```

<sub>`GET /app/hook/deliveries/{delivery_id}` · `apps/get-webhook-delivery`</sub>

## `github.apps.redeliverWebhookDelivery`

Redeliver a delivery for an app webhook — [API reference](https://docs.github.com/rest/apps/webhooks#redeliver-a-delivery-for-an-app-webhook)

```ts
github.apps.redeliverWebhookDelivery(input: {
  delivery_id: number;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /app/hook/deliveries/{delivery_id}/attempts` · `apps/redeliver-webhook-delivery`</sub>

## `github.apps.listInstallationRequestsForAuthenticatedApp`

List installation requests for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#list-installation-requests-for-the-authenticated-app)

```ts
github.apps.listInstallationRequestsForAuthenticatedApp(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(IntegrationInstallationRequest)[]>
```

<sub>`GET /app/installation-requests` · `apps/list-installation-requests-for-authenticated-app`</sub>

## `github.apps.listInstallations`

List installations for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#list-installations-for-the-authenticated-app)

```ts
github.apps.listInstallations(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  outdated?: string;
}): Promise<(Installation)[]>
```

<sub>`GET /app/installations` · `apps/list-installations`</sub>

## `github.apps.deleteInstallation`

Delete an installation for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#delete-an-installation-for-the-authenticated-app)

```ts
github.apps.deleteInstallation(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /app/installations/{installation_id}` · `apps/delete-installation`</sub>

## `github.apps.getInstallation`

Get an installation for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#get-an-installation-for-the-authenticated-app)

```ts
github.apps.getInstallation(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
}): Promise<Installation>
```

<sub>`GET /app/installations/{installation_id}` · `apps/get-installation`</sub>

## `github.apps.createInstallationAccessToken`

Create an installation access token for an app — [API reference](https://docs.github.com/rest/apps/apps#create-an-installation-access-token-for-an-app)

```ts
github.apps.createInstallationAccessToken(input: {
  /** List of repository names that the token should have access to */
  repositories?: (string)[];
  /** List of repository IDs that the token should have access to */
  repository_ids?: (number)[];
  permissions?: AppPermissions;
  /** The unique identifier of the installation. */
  installation_id: number;
}): Promise<InstallationToken>
```

<sub>`POST /app/installations/{installation_id}/access_tokens` · `apps/create-installation-access-token`</sub>

## `github.apps.unsuspendInstallation`

Unsuspend an app installation — [API reference](https://docs.github.com/rest/apps/apps#unsuspend-an-app-installation)

```ts
github.apps.unsuspendInstallation(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /app/installations/{installation_id}/suspended` · `apps/unsuspend-installation`</sub>

## `github.apps.suspendInstallation`

Suspend an app installation — [API reference](https://docs.github.com/rest/apps/apps#suspend-an-app-installation)

```ts
github.apps.suspendInstallation(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
}): Promise<BasicError>
```

<sub>`PUT /app/installations/{installation_id}/suspended` · `apps/suspend-installation`</sub>

## `github.apps.deleteAuthorization`

Delete an app authorization — [API reference](https://docs.github.com/rest/apps/oauth-applications#delete-an-app-authorization)

```ts
github.apps.deleteAuthorization(input: {
  /** The OAuth access token used to authenticate to the GitHub API. */
  access_token: string;
  /** The client ID of the GitHub app. */
  client_id: string;
}): Promise<ValidationError>
```

<sub>`DELETE /applications/{client_id}/grant` · `apps/delete-authorization`</sub>

## `github.apps.deleteToken`

Delete an app token — [API reference](https://docs.github.com/rest/apps/oauth-applications#delete-an-app-token)

```ts
github.apps.deleteToken(input: {
  /** The OAuth access token used to authenticate to the GitHub API. */
  access_token: string;
  /** The client ID of the GitHub app. */
  client_id: string;
}): Promise<ValidationError>
```

<sub>`DELETE /applications/{client_id}/token` · `apps/delete-token`</sub>

## `github.apps.resetToken`

Reset a token — [API reference](https://docs.github.com/rest/apps/oauth-applications#reset-a-token)

```ts
github.apps.resetToken(input: {
  /** The access_token of the OAuth or GitHub application. */
  access_token: string;
  /** The client ID of the GitHub app. */
  client_id: string;
}): Promise<Authorization>
```

<sub>`PATCH /applications/{client_id}/token` · `apps/reset-token`</sub>

## `github.apps.checkToken`

Check a token — [API reference](https://docs.github.com/rest/apps/oauth-applications#check-a-token)

```ts
github.apps.checkToken(input: {
  /** The access_token of the OAuth or GitHub application. */
  access_token: string;
  /** The client ID of the GitHub app. */
  client_id: string;
}): Promise<Authorization>
```

<sub>`POST /applications/{client_id}/token` · `apps/check-token`</sub>

## `github.apps.scopeToken`

Create a scoped access token — [API reference](https://docs.github.com/rest/apps/apps#create-a-scoped-access-token)

```ts
github.apps.scopeToken(input: {
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
}): Promise<Authorization>
```

<sub>`POST /applications/{client_id}/token/scoped` · `apps/scope-token`</sub>

## `github.apps.getBySlug`

Get an app — [API reference](https://docs.github.com/rest/apps/apps#get-an-app)

```ts
github.apps.getBySlug(input: {
  app_slug: string;
}): Promise<Integration>
```

<sub>`GET /apps/{app_slug}` · `apps/get-by-slug`</sub>

## `github.apps.listReposAccessibleToInstallation`

List repositories accessible to the app installation — [API reference](https://docs.github.com/rest/apps/installations#list-repositories-accessible-to-the-app-installation)

```ts
github.apps.listReposAccessibleToInstallation(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; repositories: (Repository & { custom_properties?: { [key: string]: unknown } })[]; repository_selection?: string }>
```

<sub>`GET /installation/repositories` · `apps/list-repos-accessible-to-installation`</sub>

## `github.apps.revokeInstallationAccessToken`

Revoke an installation access token — [API reference](https://docs.github.com/rest/apps/installations#revoke-an-installation-access-token)

```ts
github.apps.revokeInstallationAccessToken(): Promise<unknown>
```

<sub>`DELETE /installation/token` · `apps/revoke-installation-access-token`</sub>

## `github.apps.getSubscriptionPlanForAccount`

Get a subscription plan for an account — [API reference](https://docs.github.com/rest/apps/marketplace#get-a-subscription-plan-for-an-account)

```ts
github.apps.getSubscriptionPlanForAccount(input: {
  /** account_id parameter */
  account_id: number;
}): Promise<MarketplacePurchase>
```

<sub>`GET /marketplace_listing/accounts/{account_id}` · `apps/get-subscription-plan-for-account`</sub>

## `github.apps.listPlans`

List plans — [API reference](https://docs.github.com/rest/apps/marketplace#list-plans)

```ts
github.apps.listPlans(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MarketplaceListingPlan)[]>
```

<sub>`GET /marketplace_listing/plans` · `apps/list-plans`</sub>

## `github.apps.listAccountsForPlan`

List accounts for a plan — [API reference](https://docs.github.com/rest/apps/marketplace#list-accounts-for-a-plan)

```ts
github.apps.listAccountsForPlan(input: {
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
}): Promise<(MarketplacePurchase)[]>
```

<sub>`GET /marketplace_listing/plans/{plan_id}/accounts` · `apps/list-accounts-for-plan`</sub>

## `github.apps.getSubscriptionPlanForAccountStubbed`

Get a subscription plan for an account (stubbed) — [API reference](https://docs.github.com/rest/apps/marketplace#get-a-subscription-plan-for-an-account-stubbed)

```ts
github.apps.getSubscriptionPlanForAccountStubbed(input: {
  /** account_id parameter */
  account_id: number;
}): Promise<MarketplacePurchase>
```

<sub>`GET /marketplace_listing/stubbed/accounts/{account_id}` · `apps/get-subscription-plan-for-account-stubbed`</sub>

## `github.apps.listPlansStubbed`

List plans (stubbed) — [API reference](https://docs.github.com/rest/apps/marketplace#list-plans-stubbed)

```ts
github.apps.listPlansStubbed(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MarketplaceListingPlan)[]>
```

<sub>`GET /marketplace_listing/stubbed/plans` · `apps/list-plans-stubbed`</sub>

## `github.apps.listAccountsForPlanStubbed`

List accounts for a plan (stubbed) — [API reference](https://docs.github.com/rest/apps/marketplace#list-accounts-for-a-plan-stubbed)

```ts
github.apps.listAccountsForPlanStubbed(input: {
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
}): Promise<(MarketplacePurchase)[]>
```

<sub>`GET /marketplace_listing/stubbed/plans/{plan_id}/accounts` · `apps/list-accounts-for-plan-stubbed`</sub>

## `github.apps.getOrgInstallation`

Get an organization installation for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#get-an-organization-installation-for-the-authenticated-app)

```ts
github.apps.getOrgInstallation(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<Installation>
```

<sub>`GET /orgs/{org}/installation` · `apps/get-org-installation`</sub>

## `github.apps.getRepoInstallation`

Get a repository installation for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#get-a-repository-installation-for-the-authenticated-app)

```ts
github.apps.getRepoInstallation(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<Installation>
```

<sub>`GET /repos/{owner}/{repo}/installation` · `apps/get-repo-installation`</sub>

## `github.apps.listInstallationsForAuthenticatedUser`

List app installations accessible to the user access token — [API reference](https://docs.github.com/rest/apps/installations#list-app-installations-accessible-to-the-user-access-token)

```ts
github.apps.listInstallationsForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; installations: (Installation)[] }>
```

<sub>`GET /user/installations` · `apps/list-installations-for-authenticated-user`</sub>

## `github.apps.listInstallationReposForAuthenticatedUser`

List repositories accessible to the user access token — [API reference](https://docs.github.com/rest/apps/installations#list-repositories-accessible-to-the-user-access-token)

```ts
github.apps.listInstallationReposForAuthenticatedUser(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; repository_selection?: string; repositories: (Repository & { custom_properties?: { [key: string]: unknown } })[] }>
```

<sub>`GET /user/installations/{installation_id}/repositories` · `apps/list-installation-repos-for-authenticated-user`</sub>

## `github.apps.removeRepoFromInstallationForAuthenticatedUser`

Remove a repository from an app installation — [API reference](https://docs.github.com/rest/apps/installations#remove-a-repository-from-an-app-installation)

```ts
github.apps.removeRepoFromInstallationForAuthenticatedUser(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/installations/{installation_id}/repositories/{repository_id}` · `apps/remove-repo-from-installation-for-authenticated-user`</sub>

## `github.apps.addRepoToInstallationForAuthenticatedUser`

Add a repository to an app installation — [API reference](https://docs.github.com/rest/apps/installations#add-a-repository-to-an-app-installation)

```ts
github.apps.addRepoToInstallationForAuthenticatedUser(input: {
  /** The unique identifier of the installation. */
  installation_id: number;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<BasicError>
```

<sub>`PUT /user/installations/{installation_id}/repositories/{repository_id}` · `apps/add-repo-to-installation-for-authenticated-user`</sub>

## `github.apps.listSubscriptionsForAuthenticatedUser`

List subscriptions for the authenticated user — [API reference](https://docs.github.com/rest/apps/marketplace#list-subscriptions-for-the-authenticated-user)

```ts
github.apps.listSubscriptionsForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(UserMarketplacePurchase)[]>
```

<sub>`GET /user/marketplace_purchases` · `apps/list-subscriptions-for-authenticated-user`</sub>

## `github.apps.listSubscriptionsForAuthenticatedUserStubbed`

List subscriptions for the authenticated user (stubbed) — [API reference](https://docs.github.com/rest/apps/marketplace#list-subscriptions-for-the-authenticated-user-stubbed)

```ts
github.apps.listSubscriptionsForAuthenticatedUserStubbed(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(UserMarketplacePurchase)[]>
```

<sub>`GET /user/marketplace_purchases/stubbed` · `apps/list-subscriptions-for-authenticated-user-stubbed`</sub>

## `github.apps.getUserInstallation`

Get a user installation for the authenticated app — [API reference](https://docs.github.com/rest/apps/apps#get-a-user-installation-for-the-authenticated-app)

```ts
github.apps.getUserInstallation(input: {
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<Installation>
```

<sub>`GET /users/{username}/installation` · `apps/get-user-installation`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
