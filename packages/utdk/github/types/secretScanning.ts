import type { AlertNumber, BasicError, OrganizationSecretScanningAlert, SecretScanningAlert, SecretScanningAlertWithMetadata, SecretScanningCustomPattern, SecretScanningCustomPatternToCreate, SecretScanningCustomPatternToDelete, SecretScanningCustomPatternToUpdate, SecretScanningLocation, SecretScanningPatternConfiguration, SecretScanningPushProtectionBypass, SecretScanningPushProtectionBypassPlaceholderId, SecretScanningPushProtectionBypassReason, SecretScanningRowVersion, SecretScanningScanHistory } from "./schemas.js";

export type SecretScanningOperations = {
  /**
   * List secret scanning alerts for an organization
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#list-secret-scanning-alerts-for-an-organization
   */
  listAlertsForOrg: (input: {
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
  }) => Promise<(OrganizationSecretScanningAlert)[]>;

  /**
   * List organization custom patterns
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#list-organization-custom-patterns
   */
  listOrgCustomPatterns: (input: {
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
  }) => Promise<(SecretScanningCustomPattern)[]>;

  /**
   * Bulk create organization custom patterns
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-create-organization-custom-patterns
   */
  bulkCreateOrgCustomPatterns: (input: {
    /** The list of custom patterns to create. */
    patterns: (SecretScanningCustomPatternToCreate)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ created_patterns?: (SecretScanningCustomPattern)[] }>;

  /**
   * Bulk delete organization custom patterns
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-delete-organization-custom-patterns
   */
  bulkDeleteOrgCustomPatterns: (input: {
    /** The list of custom patterns to delete. */
    patterns: (SecretScanningCustomPatternToDelete)[];
    /** What to do with alerts associated with the deleted patterns. `delete_alerts` permanently removes the alerts. `resolve_alerts` resolves the alerts as "pattern deleted". Defaults to `delete_alerts` when not specified. */
    post_delete_action?: "delete_alerts" | "resolve_alerts";
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Update an organization custom pattern
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#update-an-organization-custom-pattern
   */
  updateOrgCustomPattern: (input: {
    body: SecretScanningCustomPatternToUpdate;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the custom pattern. */
    pattern_id: number;
  }) => Promise<SecretScanningCustomPattern>;

  /**
   * List organization pattern configurations
   * @see https://docs.github.com/rest/secret-scanning/push-protection#list-organization-pattern-configurations
   */
  listOrgPatternConfigs: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<SecretScanningPatternConfiguration>;

  /**
   * Update organization pattern configurations
   * @see https://docs.github.com/rest/secret-scanning/push-protection#update-organization-pattern-configurations
   */
  updateOrgPatternConfigs: (input: {
    pattern_config_version?: SecretScanningRowVersion;
    /** Pattern settings for provider patterns. */
    provider_pattern_settings?: ({ token_type?: string; push_protection_setting?: "not-set" | "disabled" | "enabled" })[];
    /** Pattern settings for custom patterns. */
    custom_pattern_settings?: ({ token_type?: string; custom_pattern_version?: SecretScanningRowVersion; push_protection_setting?: "disabled" | "enabled" })[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ pattern_config_version?: string }>;

  /**
   * List secret scanning alerts for a repository
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#list-secret-scanning-alerts-for-a-repository
   */
  listAlertsForRepo: (input: {
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
  }) => Promise<(SecretScanningAlert)[]>;

  /**
   * Get a secret scanning alert
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#get-a-secret-scanning-alert
   */
  getAlert: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
    /** A boolean value representing whether or not to hide literal secrets in the results. */
    hide_secret?: boolean;
  }) => Promise<SecretScanningAlertWithMetadata>;

  /**
   * Update a secret scanning alert
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#update-a-secret-scanning-alert
   */
  updateAlert: (input: {
    body: unknown | unknown | unknown;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<SecretScanningAlertWithMetadata>;

  /**
   * List locations for a secret scanning alert
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#list-locations-for-a-secret-scanning-alert
   */
  listLocationsForAlert: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(SecretScanningLocation)[]>;

  /**
   * List repository custom patterns
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#list-repository-custom-patterns
   */
  listRepoCustomPatterns: (input: {
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
  }) => Promise<(SecretScanningCustomPattern)[]>;

  /**
   * Bulk create repository custom patterns
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-create-repository-custom-patterns
   */
  bulkCreateRepoCustomPatterns: (input: {
    /** The list of custom patterns to create. */
    patterns: (SecretScanningCustomPatternToCreate)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ created_patterns?: (SecretScanningCustomPattern)[] }>;

  /**
   * Bulk delete repository custom patterns
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#bulk-delete-repository-custom-patterns
   */
  bulkDeleteRepoCustomPatterns: (input: {
    /** The list of custom patterns to delete. */
    patterns: (SecretScanningCustomPatternToDelete)[];
    /** What to do with alerts associated with the deleted patterns. `delete_alerts` permanently removes the alerts. `resolve_alerts` resolves the alerts as "pattern deleted". Defaults to `delete_alerts` when not specified. */
    post_delete_action?: "delete_alerts" | "resolve_alerts";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Update a repository custom pattern
   * @see https://docs.github.com/rest/secret-scanning/custom-patterns#update-a-repository-custom-pattern
   */
  updateRepoCustomPattern: (input: {
    body: SecretScanningCustomPatternToUpdate;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the custom pattern. */
    pattern_id: number;
  }) => Promise<SecretScanningCustomPattern>;

  /**
   * Create a push protection bypass
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#create-a-push-protection-bypass
   */
  createPushProtectionBypass: (input: {
    reason: SecretScanningPushProtectionBypassReason;
    placeholder_id: SecretScanningPushProtectionBypassPlaceholderId;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<SecretScanningPushProtectionBypass>;

  /**
   * Get secret scanning scan history for a repository
   * @see https://docs.github.com/rest/secret-scanning/secret-scanning#get-secret-scanning-scan-history-for-a-repository
   */
  getScanHistory: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<SecretScanningScanHistory>;
};
