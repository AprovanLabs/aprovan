import type { AlertNumber, BasicError, DependabotAlert, DependabotAlertWithRepository, DependabotPublicKey, DependabotRepositoryAccessDetails, DependabotSecret, EmptyObject, MinimalRepository, OrganizationDependabotSecret } from "./schemas.js";

export type DependabotOperations = {
  /**
   * List Dependabot alerts for an enterprise
   * @see https://docs.github.com/rest/dependabot/alerts#list-dependabot-alerts-for-an-enterprise
   */
  listAlertsForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** A comma-separated list of vulnerability classifications. If specified, only alerts for vulnerabilities with these classifications will be returned.  Can be: `malware`, `general` */
    classification?: string;
    /** A comma-separated list of states. If specified, only alerts with these states will be returned.  Can be: `auto_dismissed`, `dismissed`, `fixed`, `open` */
    state?: string;
    /** A comma-separated list of severities. If specified, only alerts with these severities will be returned.  Can be: `low`, `medium`, `high`, `critical` */
    severity?: string;
    /** A comma-separated list of ecosystems. If specified, only alerts for these ecosystems will be returned.  Can be: `composer`, `go`, `maven`, `npm`, `nuget`, `pip`, `pub`, `rubygems`, `rust` */
    ecosystem?: string;
    /** A comma-separated list of package names. If specified, only alerts for these packages will be returned. */
    package?: string;
    /** CVE Exploit Prediction Scoring System (EPSS) percentage. Can be specified as: - An exact number (`n`) - Comparators such as `>n`, `<n`, `>=n`, `<=n` - A range like `n..n`, where `n` is a number from 0.0 to 1.0  Filters the list of alerts based on EPSS percentages. If specified, only alerts with the provided EPSS percentages will be returned. */
    epss_percentage?: string;
    /** Filters the list of alerts based on whether the alert has the given value. If specified, only alerts meeting this criterion will be returned. Multiple `has` filters can be passed to filter for alerts that have all of the values. Currently, only `patch` is supported. */
    has?: string | ("patch")[];
    /** Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`) to return alerts assigned to any of the specified users. Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees. */
    assignee?: string;
    /** The scope of the vulnerable dependency. If specified, only alerts with this scope will be returned. */
    scope?: "development" | "runtime";
    /** The property by which to sort the results. `created` means when the alert was created. `updated` means when the alert's state last changed. `epss_percentage` sorts alerts by the Exploit Prediction Scoring System (EPSS) percentage. */
    sort?: "created" | "updated" | "epss_percentage";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(DependabotAlertWithRepository)[]>;

  /**
   * Lists the repositories Dependabot can access in an enterprise
   * @see https://docs.github.com/rest/dependabot/repository-access#lists-the-repositories-dependabot-can-access-in-an-enterprise
   */
  repositoryAccessForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The page number of results to fetch. */
    page?: number;
    /** Number of results per page. */
    per_page?: number;
  }) => Promise<DependabotRepositoryAccessDetails>;

  /**
   * Updates Dependabot's repository access list for an enterprise
   * @see https://docs.github.com/rest/dependabot/repository-access#updates-dependabots-repository-access-list-for-an-enterprise
   */
  updateRepositoryAccessForEnterprise: (input: {
    /** List of repository IDs to add. */
    repository_ids_to_add?: (number)[];
    /** List of repository IDs to remove. */
    repository_ids_to_remove?: (number)[];
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * Set the default repository access level for Dependabot in an enterprise
   * @see https://docs.github.com/rest/dependabot/repository-access#set-the-default-repository-access-level-for-dependabot-in-an-enterprise
   */
  setRepositoryAccessDefaultLevelForEnterprise: (input: {
    /** The default repository access level for Dependabot updates. */
    default_level: "public" | "internal";
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * List Dependabot alerts for an organization
   * @see https://docs.github.com/rest/dependabot/alerts#list-dependabot-alerts-for-an-organization
   */
  listAlertsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** A comma-separated list of vulnerability classifications. If specified, only alerts for vulnerabilities with these classifications will be returned.  Can be: `malware`, `general` */
    classification?: string;
    /** A comma-separated list of states. If specified, only alerts with these states will be returned.  Can be: `auto_dismissed`, `dismissed`, `fixed`, `open` */
    state?: string;
    /** A comma-separated list of severities. If specified, only alerts with these severities will be returned.  Can be: `low`, `medium`, `high`, `critical` */
    severity?: string;
    /** A comma-separated list of ecosystems. If specified, only alerts for these ecosystems will be returned.  Can be: `composer`, `go`, `maven`, `npm`, `nuget`, `pip`, `pub`, `rubygems`, `rust` */
    ecosystem?: string;
    /** A comma-separated list of package names. If specified, only alerts for these packages will be returned. */
    package?: string;
    /** CVE Exploit Prediction Scoring System (EPSS) percentage. Can be specified as: - An exact number (`n`) - Comparators such as `>n`, `<n`, `>=n`, `<=n` - A range like `n..n`, where `n` is a number from 0.0 to 1.0  Filters the list of alerts based on EPSS percentages. If specified, only alerts with the provided EPSS percentages will be returned. */
    epss_percentage?: string;
    /** A comma-separated list of artifact registry URLs. If specified, only alerts for repositories with storage records matching these URLs will be returned. */
    artifact_registry_url?: string;
    /** A comma-separated list of Artifact Registry name strings. If specified, only alerts for repositories with storage records matching these registries will be returned.  Can be: `jfrog-artifactory` */
    artifact_registry?: string;
    /** Filters the list of alerts based on whether the alert has the given value. If specified, only alerts meeting this criterion will be returned. Multiple `has` filters can be passed to filter for alerts that have all of the values. */
    has?: string | ("patch" | "deployment")[];
    /** Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`) to return alerts assigned to any of the specified users. Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees. */
    assignee?: string;
    /** A comma-separated list of runtime risk strings. If specified, only alerts for repositories with deployment records matching these risks will be returned.  Can be: `critical-resource`, `internet-exposed`, `sensitive-data`, `lateral-movement` */
    runtime_risk?: string;
    /** The scope of the vulnerable dependency. If specified, only alerts with this scope will be returned. */
    scope?: "development" | "runtime";
    /** The property by which to sort the results. `created` means when the alert was created. `updated` means when the alert's state last changed. `epss_percentage` sorts alerts by the Exploit Prediction Scoring System (EPSS) percentage. */
    sort?: "created" | "updated" | "epss_percentage";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(DependabotAlertWithRepository)[]>;

  /**
   * Lists the repositories Dependabot can access in an organization
   * @see https://docs.github.com/rest/dependabot/repository-access#lists-the-repositories-dependabot-can-access-in-an-organization
   */
  repositoryAccessForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The page number of results to fetch. */
    page?: number;
    /** Number of results per page. */
    per_page?: number;
  }) => Promise<DependabotRepositoryAccessDetails>;

  /**
   * Updates Dependabot's repository access list for an organization
   * @see https://docs.github.com/rest/dependabot/repository-access#updates-dependabots-repository-access-list-for-an-organization
   */
  updateRepositoryAccessForOrg: (input: {
    /** List of repository IDs to add. */
    repository_ids_to_add?: (number)[];
    /** List of repository IDs to remove. */
    repository_ids_to_remove?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Set the default repository access level for Dependabot
   * @see https://docs.github.com/rest/dependabot/repository-access#set-the-default-repository-access-level-for-dependabot
   */
  setRepositoryAccessDefaultLevel: (input: {
    /** The default repository access level for Dependabot updates. */
    default_level: "public" | "internal";
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * List organization secrets
   * @see https://docs.github.com/rest/dependabot/secrets#list-organization-secrets
   */
  listOrgSecrets: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (OrganizationDependabotSecret)[] }>;

  /**
   * Get an organization public key
   * @see https://docs.github.com/rest/dependabot/secrets#get-an-organization-public-key
   */
  getOrgPublicKey: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<DependabotPublicKey>;

  /**
   * Get an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#get-an-organization-secret
   */
  getOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<OrganizationDependabotSecret>;

  /**
   * Create or update an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#create-or-update-an-organization-secret
   */
  createOrUpdateOrgSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get an organization public key](https://docs.github.com/rest/dependabot/secrets#get-an-organization-public-key) endpoint. */
    encrypted_value?: string;
    /** ID of the key you used to encrypt the secret. */
    key_id?: string;
    /** Which type of organization repositories have access to the organization secret. `selected` means only the repositories specified by `selected_repository_ids` can access the secret. */
    visibility: "all" | "private" | "selected";
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can manage the list of selected repositories using the [List selected repositories for an organization secret](https://docs.github.com/rest/dependabot/secrets#list-selected-repositories-for-an-organization-secret), [Set selected repositories for an organization secret](https://docs.github.com/rest/dependabot/secrets#set-selected-repositories-for-an-organization-secret), and [Remove selected repository from an organization secret](https://docs.github.com/rest/dependabot/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids?: (number | string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#delete-an-organization-secret
   */
  deleteOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#list-selected-repositories-for-an-organization-secret
   */
  listSelectedReposForOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<{ total_count: number; repositories: (MinimalRepository)[] }>;

  /**
   * Set selected repositories for an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#set-selected-repositories-for-an-organization-secret
   */
  setSelectedReposForOrgSecret: (input: {
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Set selected repositories for an organization secret](https://docs.github.com/rest/dependabot/secrets#set-selected-repositories-for-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/dependabot/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * Add selected repository to an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#add-selected-repository-to-an-organization-secret
   */
  addSelectedRepoToOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Remove selected repository from an organization secret
   * @see https://docs.github.com/rest/dependabot/secrets#remove-selected-repository-from-an-organization-secret
   */
  removeSelectedRepoFromOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * List Dependabot alerts for a repository
   * @see https://docs.github.com/rest/dependabot/alerts#list-dependabot-alerts-for-a-repository
   */
  listAlertsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** A comma-separated list of vulnerability classifications. If specified, only alerts for vulnerabilities with these classifications will be returned.  Can be: `malware`, `general` */
    classification?: string;
    /** A comma-separated list of states. If specified, only alerts with these states will be returned.  Can be: `auto_dismissed`, `dismissed`, `fixed`, `open` */
    state?: string;
    /** A comma-separated list of severities. If specified, only alerts with these severities will be returned.  Can be: `low`, `medium`, `high`, `critical` */
    severity?: string;
    /** A comma-separated list of ecosystems. If specified, only alerts for these ecosystems will be returned.  Can be: `composer`, `go`, `maven`, `npm`, `nuget`, `pip`, `pub`, `rubygems`, `rust` */
    ecosystem?: string;
    /** A comma-separated list of package names. If specified, only alerts for these packages will be returned. */
    package?: string;
    /** A comma-separated list of full manifest paths. If specified, only alerts for these manifests will be returned. */
    manifest?: string;
    /** CVE Exploit Prediction Scoring System (EPSS) percentage. Can be specified as: - An exact number (`n`) - Comparators such as `>n`, `<n`, `>=n`, `<=n` - A range like `n..n`, where `n` is a number from 0.0 to 1.0  Filters the list of alerts based on EPSS percentages. If specified, only alerts with the provided EPSS percentages will be returned. */
    epss_percentage?: string;
    /** Filters the list of alerts based on whether the alert has the given value. If specified, only alerts meeting this criterion will be returned. Multiple `has` filters can be passed to filter for alerts that have all of the values. Currently, only `patch` is supported. */
    has?: string | ("patch")[];
    /** Filter alerts by assignees. Provide a comma-separated list of user handles (e.g., `octocat` or `octocat,hubot`) to return alerts assigned to any of the specified users. Use `*` to list alerts with at least one assignee or `none` to list alerts with no assignees. */
    assignee?: string;
    /** The scope of the vulnerable dependency. If specified, only alerts with this scope will be returned. */
    scope?: "development" | "runtime";
    /** The property by which to sort the results. `created` means when the alert was created. `updated` means when the alert's state last changed. `epss_percentage` sorts alerts by the Exploit Prediction Scoring System (EPSS) percentage. */
    sort?: "created" | "updated" | "epss_percentage";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(DependabotAlert)[]>;

  /**
   * Get a Dependabot alert
   * @see https://docs.github.com/rest/dependabot/alerts#get-a-dependabot-alert
   */
  getAlert: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<DependabotAlert>;

  /**
   * Update a Dependabot alert
   * @see https://docs.github.com/rest/dependabot/alerts#update-a-dependabot-alert
   */
  updateAlert: (input: {
    body: unknown | unknown;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    alert_number: AlertNumber;
  }) => Promise<DependabotAlert>;

  /**
   * List repository secrets
   * @see https://docs.github.com/rest/dependabot/secrets#list-repository-secrets
   */
  listRepoSecrets: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (DependabotSecret)[] }>;

  /**
   * Get a repository public key
   * @see https://docs.github.com/rest/dependabot/secrets#get-a-repository-public-key
   */
  getRepoPublicKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<DependabotPublicKey>;

  /**
   * Get a repository secret
   * @see https://docs.github.com/rest/dependabot/secrets#get-a-repository-secret
   */
  getRepoSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<DependabotSecret>;

  /**
   * Create or update a repository secret
   * @see https://docs.github.com/rest/dependabot/secrets#create-or-update-a-repository-secret
   */
  createOrUpdateRepoSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get a repository public key](https://docs.github.com/rest/dependabot/secrets#get-a-repository-public-key) endpoint. */
    encrypted_value?: string;
    /** ID of the key you used to encrypt the secret. */
    key_id?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete a repository secret
   * @see https://docs.github.com/rest/dependabot/secrets#delete-a-repository-secret
   */
  deleteRepoSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;
};
