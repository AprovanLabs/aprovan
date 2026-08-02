# Secret Scanning

17 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.secretScanning.listAlertsForOrg`

List secret scanning alerts for an organization — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#list-secret-scanning-alerts-for-an-organization)

```ts
github.secretScanning.listAlertsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Set to `open` or `resolved` to only list secret scanning alerts in a specific state. */
  state?: "open" | "resolved";
  /** A comma-separated list of secret types to return. All default secret patterns are returned. To return generic patterns, pass the token name(s) in the parameter. See "[Supported secret scanning patterns](https://docs.github.com/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#supported-secrets)" for a complete list of secret types. */
  secret_type?: string;
  /** A comma-separated list of secret types to exclude from the results. All default secret patterns are returned except those matching the specified types. Cannot be combined with the `secret_type` parameter. See "[Supported secret scanning patterns](https://docs.github.com/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#supported-secrets)" for a complete list of secret types. */
  exclude_secret_types?: string;
  /** A comma-separated list of provider slugs to exclude from the results. Provider slugs use lowercase with underscores (e.g., `github_secret_scanning`, `clojars`). You can find the provider slug in the `provider_slug` field of each alert. Cannot be combined with the `providers` parameter. */
  exclude_providers?: string;
  /** A comma-separated list of provider slugs to filter by. Provider slugs use lowercase with underscores (e.g., `github_secret_scanning`, `clojars`). You can find the provider slug in the `provider_slug` field of each alert. Cannot be combined with the `exclude_providers` parameter. */
  providers?: string;
  /** A comma-separated list of resolutions. Only secret scanning alerts with one of these resolutions are listed. Valid resolutions are `false_positive`, `wont_fix`, `revoked`, `pattern_edited`, `pattern_deleted` or `used_in_tests`. */
  resolution?: string;
  /** Filters alerts by assignee. Use `*` to get all assigned alerts, `none` to get all unassigned alerts, or a GitHub username to get alerts assigned to a specific user. */
  assignee?: string;
  /** The property to sort the results by. `created` means when the alert was created. `updated` means when the alert was updated or resolved. */
  sort?: "created" | "updated";
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for events before this cursor. To receive an initial cursor on your first request, include an empty "before" query string. */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for events after this cursor.  To receive an initial cursor on your first request, include an empty "after" query string. */
  after?: string;
  /** A comma-separated list of validities that, when present, will return alerts that match the validities in this list. Valid options are `active`, `inactive`, and `unknown`. */
  validity?: string;
  /** A boolean value representing whether or not to filter alerts by the publicly-leaked tag being present. */
  is_publicly_leaked?: boolean;
  /** A boolean value representing whether or not to filter alerts by the multi-repo tag being present. */
  is_multi_repo?: boolean;
  /** A boolean value representing whether or not to hide literal secrets in the results. */
  hide_secret?: boolean;
  /** A boolean value (`true` or `false`) indicating whether to filter alerts by their push protection bypass status. When set to `true`, only alerts that were created because a push protection rule was bypassed will be returned. When set to `false`, only alerts that were not caused by a push protection bypass will be returned. */
  is_bypassed?: boolean;
  /** A comma-separated list of metadata fields to filter alerts by. Only alerts that have all of the specified metadata fields attached will be returned. Possible values are: `owner-email`, `owner-id`, `owner-name`, `secret-id`, `secret-name`, `secret-issued-date`, `secret-expiration-date`, `organization-name`, `organization-id`, `last-used-date`, and `has-organization-access`. */
  included_metadata?: string;
  /** Filters alerts to only those whose attached `owner_email` metadata field matches the provided value. The value must be the lowercase hex-encoded SHA-256 hash of the email address to match (for example, the SHA-256 of `user@example.com`). Only alerts that have an `owner_email` metadata value whose SHA-256 hash equals this parameter are returned. */
  owner_email_hash?: string;
}): Promise<(OrganizationSecretScanningAlert)[]>
```

<sub>`GET /orgs/{org}/secret-scanning/alerts` · `secret-scanning/list-alerts-for-org`</sub>

## `github.secretScanning.bulkDeleteOrgCustomPatterns`

Bulk delete organization custom patterns — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-delete-organization-custom-patterns)

```ts
github.secretScanning.bulkDeleteOrgCustomPatterns(input: {
  /** The list of custom patterns to delete. */
  patterns: (SecretScanningCustomPatternToDelete)[];
  /** What to do with alerts associated with the deleted patterns. `delete_alerts` permanently removes the alerts. `resolve_alerts` resolves the alerts as "pattern deleted". Defaults to `delete_alerts` when not specified. */
  post_delete_action?: "delete_alerts" | "resolve_alerts";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/secret-scanning/custom-patterns` · `secret-scanning/bulk-delete-org-custom-patterns`</sub>

## `github.secretScanning.listOrgCustomPatterns`

List organization custom patterns — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#list-organization-custom-patterns)

```ts
github.secretScanning.listOrgCustomPatterns(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Filter custom patterns by state. When absent, returns patterns in all states. */
  state?: "published" | "unpublished";
  /** Filter custom patterns by whether push protection is enabled. When absent, returns patterns regardless of push protection status. */
  push_protection?: "enabled" | "disabled";
  /** The property to sort the results by. */
  sort?: "created" | "updated" | "name";
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(SecretScanningCustomPattern)[]>
```

<sub>`GET /orgs/{org}/secret-scanning/custom-patterns` · `secret-scanning/list-org-custom-patterns`</sub>

## `github.secretScanning.bulkCreateOrgCustomPatterns`

Bulk create organization custom patterns — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-create-organization-custom-patterns)

```ts
github.secretScanning.bulkCreateOrgCustomPatterns(input: {
  /** The list of custom patterns to create. */
  patterns: (SecretScanningCustomPatternToCreate)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ created_patterns?: (SecretScanningCustomPattern)[] }>
```

<sub>`POST /orgs/{org}/secret-scanning/custom-patterns` · `secret-scanning/bulk-create-org-custom-patterns`</sub>

## `github.secretScanning.updateOrgCustomPattern`

Update an organization custom pattern — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#update-an-organization-custom-pattern)

```ts
github.secretScanning.updateOrgCustomPattern(input: {
  body: SecretScanningCustomPatternToUpdate;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID of the custom pattern. */
  pattern_id: number;
}): Promise<SecretScanningCustomPattern>
```

<sub>`PATCH /orgs/{org}/secret-scanning/custom-patterns/{pattern_id}` · `secret-scanning/update-org-custom-pattern`</sub>

## `github.secretScanning.listOrgPatternConfigs`

List organization pattern configurations — [API reference](https://docs.github.com/rest/secret-scanning/push-protection#list-organization-pattern-configurations)

```ts
github.secretScanning.listOrgPatternConfigs(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<SecretScanningPatternConfiguration>
```

<sub>`GET /orgs/{org}/secret-scanning/pattern-configurations` · `secret-scanning/list-org-pattern-configs`</sub>

## `github.secretScanning.updateOrgPatternConfigs`

Update organization pattern configurations — [API reference](https://docs.github.com/rest/secret-scanning/push-protection#update-organization-pattern-configurations)

```ts
github.secretScanning.updateOrgPatternConfigs(input: {
  pattern_config_version?: SecretScanningRowVersion;
  /** Pattern settings for provider patterns. */
  provider_pattern_settings?: ({ token_type?: string; push_protection_setting?: "not-set" | "disabled" | "enabled" })[];
  /** Pattern settings for custom patterns. */
  custom_pattern_settings?: ({ token_type?: string; custom_pattern_version?: SecretScanningRowVersion; push_protection_setting?: "disabled" | "enabled" })[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ pattern_config_version?: string }>
```

<sub>`PATCH /orgs/{org}/secret-scanning/pattern-configurations` · `secret-scanning/update-org-pattern-configs`</sub>

## `github.secretScanning.listAlertsForRepo`

List secret scanning alerts for a repository — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#list-secret-scanning-alerts-for-a-repository)

```ts
github.secretScanning.listAlertsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Set to `open` or `resolved` to only list secret scanning alerts in a specific state. */
  state?: "open" | "resolved";
  /** A comma-separated list of secret types to return. All default secret patterns are returned. To return generic patterns, pass the token name(s) in the parameter. See "[Supported secret scanning patterns](https://docs.github.com/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#supported-secrets)" for a complete list of secret types. */
  secret_type?: string;
  /** A comma-separated list of secret types to exclude from the results. All default secret patterns are returned except those matching the specified types. Cannot be combined with the `secret_type` parameter. See "[Supported secret scanning patterns](https://docs.github.com/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#supported-secrets)" for a complete list of secret types. */
  exclude_secret_types?: string;
  /** A comma-separated list of provider slugs to exclude from the results. Provider slugs use lowercase with underscores (e.g., `github_secret_scanning`, `clojars`). You can find the provider slug in the `provider_slug` field of each alert. Cannot be combined with the `providers` parameter. */
  exclude_providers?: string;
  /** A comma-separated list of provider slugs to filter by. Provider slugs use lowercase with underscores (e.g., `github_secret_scanning`, `clojars`). You can find the provider slug in the `provider_slug` field of each alert. Cannot be combined with the `exclude_providers` parameter. */
  providers?: string;
  /** A comma-separated list of resolutions. Only secret scanning alerts with one of these resolutions are listed. Valid resolutions are `false_positive`, `wont_fix`, `revoked`, `pattern_edited`, `pattern_deleted` or `used_in_tests`. */
  resolution?: string;
  /** Filters alerts by assignee. Use `*` to get all assigned alerts, `none` to get all unassigned alerts, or a GitHub username to get alerts assigned to a specific user. */
  assignee?: string;
  /** The property to sort the results by. `created` means when the alert was created. `updated` means when the alert was updated or resolved. */
  sort?: "created" | "updated";
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for events before this cursor. To receive an initial cursor on your first request, include an empty "before" query string. */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for events after this cursor.  To receive an initial cursor on your first request, include an empty "after" query string. */
  after?: string;
  /** A comma-separated list of validities that, when present, will return alerts that match the validities in this list. Valid options are `active`, `inactive`, and `unknown`. */
  validity?: string;
  /** A boolean value representing whether or not to filter alerts by the publicly-leaked tag being present. */
  is_publicly_leaked?: boolean;
  /** A boolean value representing whether or not to filter alerts by the multi-repo tag being present. */
  is_multi_repo?: boolean;
  /** A boolean value representing whether or not to hide literal secrets in the results. */
  hide_secret?: boolean;
  /** A boolean value (`true` or `false`) indicating whether to filter alerts by their push protection bypass status. When set to `true`, only alerts that were created because a push protection rule was bypassed will be returned. When set to `false`, only alerts that were not caused by a push protection bypass will be returned. */
  is_bypassed?: boolean;
  /** A comma-separated list of metadata fields to filter alerts by. Only alerts that have all of the specified metadata fields attached will be returned. Possible values are: `owner-email`, `owner-id`, `owner-name`, `secret-id`, `secret-name`, `secret-issued-date`, `secret-expiration-date`, `organization-name`, `organization-id`, `last-used-date`, and `has-organization-access`. */
  included_metadata?: string;
  /** Filters alerts to only those whose attached `owner_email` metadata field matches the provided value. The value must be the lowercase hex-encoded SHA-256 hash of the email address to match (for example, the SHA-256 of `user@example.com`). Only alerts that have an `owner_email` metadata value whose SHA-256 hash equals this parameter are returned. */
  owner_email_hash?: string;
}): Promise<(SecretScanningAlert)[]>
```

<sub>`GET /repos/{owner}/{repo}/secret-scanning/alerts` · `secret-scanning/list-alerts-for-repo`</sub>

## `github.secretScanning.getAlert`

Get a secret scanning alert — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#get-a-secret-scanning-alert)

```ts
github.secretScanning.getAlert(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
  /** A boolean value representing whether or not to hide literal secrets in the results. */
  hide_secret?: boolean;
}): Promise<SecretScanningAlertWithMetadata>
```

<sub>`GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` · `secret-scanning/get-alert`</sub>

## `github.secretScanning.updateAlert`

Update a secret scanning alert — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#update-a-secret-scanning-alert)

```ts
github.secretScanning.updateAlert(input: {
  body: unknown | unknown | unknown;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<SecretScanningAlertWithMetadata>
```

<sub>`PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}` · `secret-scanning/update-alert`</sub>

## `github.secretScanning.listLocationsForAlert`

List locations for a secret scanning alert — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#list-locations-for-a-secret-scanning-alert)

```ts
github.secretScanning.listLocationsForAlert(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(SecretScanningLocation)[]>
```

<sub>`GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations` · `secret-scanning/list-locations-for-alert`</sub>

## `github.secretScanning.bulkDeleteRepoCustomPatterns`

Bulk delete repository custom patterns — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-delete-repository-custom-patterns)

```ts
github.secretScanning.bulkDeleteRepoCustomPatterns(input: {
  /** The list of custom patterns to delete. */
  patterns: (SecretScanningCustomPatternToDelete)[];
  /** What to do with alerts associated with the deleted patterns. `delete_alerts` permanently removes the alerts. `resolve_alerts` resolves the alerts as "pattern deleted". Defaults to `delete_alerts` when not specified. */
  post_delete_action?: "delete_alerts" | "resolve_alerts";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/secret-scanning/custom-patterns` · `secret-scanning/bulk-delete-repo-custom-patterns`</sub>

## `github.secretScanning.listRepoCustomPatterns`

List repository custom patterns — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#list-repository-custom-patterns)

```ts
github.secretScanning.listRepoCustomPatterns(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Filter custom patterns by state. When absent, returns patterns in all states. */
  state?: "published" | "unpublished";
  /** Filter custom patterns by whether push protection is enabled. When absent, returns patterns regardless of push protection status. */
  push_protection?: "enabled" | "disabled";
  /** The property to sort the results by. */
  sort?: "created" | "updated" | "name";
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(SecretScanningCustomPattern)[]>
```

<sub>`GET /repos/{owner}/{repo}/secret-scanning/custom-patterns` · `secret-scanning/list-repo-custom-patterns`</sub>

## `github.secretScanning.bulkCreateRepoCustomPatterns`

Bulk create repository custom patterns — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-create-repository-custom-patterns)

```ts
github.secretScanning.bulkCreateRepoCustomPatterns(input: {
  /** The list of custom patterns to create. */
  patterns: (SecretScanningCustomPatternToCreate)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<{ created_patterns?: (SecretScanningCustomPattern)[] }>
```

<sub>`POST /repos/{owner}/{repo}/secret-scanning/custom-patterns` · `secret-scanning/bulk-create-repo-custom-patterns`</sub>

## `github.secretScanning.updateRepoCustomPattern`

Update a repository custom pattern — [API reference](https://docs.github.com/rest/secret-scanning/custom-patterns#update-a-repository-custom-pattern)

```ts
github.secretScanning.updateRepoCustomPattern(input: {
  body: SecretScanningCustomPatternToUpdate;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the custom pattern. */
  pattern_id: number;
}): Promise<SecretScanningCustomPattern>
```

<sub>`PATCH /repos/{owner}/{repo}/secret-scanning/custom-patterns/{pattern_id}` · `secret-scanning/update-repo-custom-pattern`</sub>

## `github.secretScanning.createPushProtectionBypass`

Create a push protection bypass — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#create-a-push-protection-bypass)

```ts
github.secretScanning.createPushProtectionBypass(input: {
  reason: SecretScanningPushProtectionBypassReason;
  placeholder_id: SecretScanningPushProtectionBypassPlaceholderId;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<SecretScanningPushProtectionBypass>
```

<sub>`POST /repos/{owner}/{repo}/secret-scanning/push-protection-bypasses` · `secret-scanning/create-push-protection-bypass`</sub>

## `github.secretScanning.getScanHistory`

Get secret scanning scan history for a repository — [API reference](https://docs.github.com/rest/secret-scanning/secret-scanning#get-secret-scanning-scan-history-for-a-repository)

```ts
github.secretScanning.getScanHistory(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<SecretScanningScanHistory>
```

<sub>`GET /repos/{owner}/{repo}/secret-scanning/scan-history` · `secret-scanning/get-scan-history`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
