import type { BasicError, Codespace, CodespaceExportDetails, CodespaceMachine, CodespaceWithFullRepository, CodespacesOrgSecret, CodespacesPermissionsCheckForDevcontainer, CodespacesPublicKey, CodespacesSecret, CodespacesUserPublicKey, EmptyObject, MinimalRepository, RepoCodespacesSecret, SimpleUser } from "./schemas.js";

export type CodespacesOperations = {
  /**
   * List codespaces for the organization
   * @see https://docs.github.com/rest/codespaces/organizations#list-codespaces-for-the-organization
   */
  listInOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; codespaces: (Codespace)[] }>;

  /**
   * Manage access control for organization codespaces
   * @see https://docs.github.com/rest/codespaces/organizations#manage-access-control-for-organization-codespaces
   */
  setCodespacesAccess: (input: {
    /** Which users can access codespaces in the organization. `disabled` means that no users can access codespaces in the organization. */
    visibility: "disabled" | "selected_members" | "all_members" | "all_members_and_outside_collaborators";
    /** The usernames of the organization members who should have access to codespaces in the organization. Required when `visibility` is `selected_members`. The provided list of usernames will replace any existing value. */
    selected_usernames?: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Add users to Codespaces access for an organization
   * @see https://docs.github.com/rest/codespaces/organizations#add-users-to-codespaces-access-for-an-organization
   */
  setCodespacesAccessUsers: (input: {
    /** The usernames of the organization members and outside collaborators whose codespaces should be billed to the organization. */
    selected_usernames: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Remove users from Codespaces access for an organization
   * @see https://docs.github.com/rest/codespaces/organizations#remove-users-from-codespaces-access-for-an-organization
   */
  deleteCodespacesAccessUsers: (input: {
    /** The usernames of the organization members and outside collaborators whose codespaces should not be billed to the organization. */
    selected_usernames: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * List organization secrets
   * @see https://docs.github.com/rest/codespaces/organization-secrets#list-organization-secrets
   */
  listOrgSecrets: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (CodespacesOrgSecret)[] }>;

  /**
   * Get an organization public key
   * @see https://docs.github.com/rest/codespaces/organization-secrets#get-an-organization-public-key
   */
  getOrgPublicKey: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CodespacesPublicKey>;

  /**
   * Get an organization secret
   * @see https://docs.github.com/rest/codespaces/organization-secrets#get-an-organization-secret
   */
  getOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<CodespacesOrgSecret>;

  /**
   * Create or update an organization secret
   * @see https://docs.github.com/rest/codespaces/organization-secrets#create-or-update-an-organization-secret
   */
  createOrUpdateOrgSecret: (input: {
    /** The value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get an organization public key](https://docs.github.com/rest/codespaces/organization-secrets#get-an-organization-public-key) endpoint. */
    encrypted_value?: string;
    /** The ID of the key you used to encrypt the secret. */
    key_id?: string;
    /** Which type of organization repositories have access to the organization secret. `selected` means only the repositories specified by `selected_repository_ids` can access the secret. */
    visibility: "all" | "private" | "selected";
    /** An array of repository IDs that can access the organization secret. You can only provide a list of repository IDs when the `visibility` is set to `selected`. You can manage the list of selected repositories using the [List selected repositories for an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#list-selected-repositories-for-an-organization-secret), [Set selected repositories for an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#set-selected-repositories-for-an-organization-secret), and [Remove selected repository from an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete an organization secret
   * @see https://docs.github.com/rest/codespaces/organization-secrets#delete-an-organization-secret
   */
  deleteOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<BasicError>;

  /**
   * List selected repositories for an organization secret
   * @see https://docs.github.com/rest/codespaces/organization-secrets#list-selected-repositories-for-an-organization-secret
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
   * @see https://docs.github.com/rest/codespaces/organization-secrets#set-selected-repositories-for-an-organization-secret
   */
  setSelectedReposForOrgSecret: (input: {
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Set selected repositories for an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#set-selected-repositories-for-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<BasicError>;

  /**
   * Add selected repository to an organization secret
   * @see https://docs.github.com/rest/codespaces/organization-secrets#add-selected-repository-to-an-organization-secret
   */
  addSelectedRepoToOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Remove selected repository from an organization secret
   * @see https://docs.github.com/rest/codespaces/organization-secrets#remove-selected-repository-from-an-organization-secret
   */
  removeSelectedRepoFromOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * List codespaces for a user in organization
   * @see https://docs.github.com/rest/codespaces/organizations#list-codespaces-for-a-user-in-organization
   */
  getCodespacesForUserInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; codespaces: (Codespace)[] }>;

  /**
   * Delete a codespace from the organization
   * @see https://docs.github.com/rest/codespaces/organizations#delete-a-codespace-from-the-organization
   */
  deleteFromOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Stop a codespace for an organization user
   * @see https://docs.github.com/rest/codespaces/organizations#stop-a-codespace-for-an-organization-user
   */
  stopInOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<Codespace>;

  /**
   * List codespaces in a repository for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#list-codespaces-in-a-repository-for-the-authenticated-user
   */
  listInRepositoryForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; codespaces: (Codespace)[] }>;

  /**
   * Create a codespace in a repository
   * @see https://docs.github.com/rest/codespaces/codespaces#create-a-codespace-in-a-repository
   */
  createWithRepoForAuthenticatedUser: (input: {
    /** Git ref (typically a branch name) for this codespace */
    ref?: string;
    /** The requested location for a new codespace. Best efforts are made to respect this upon creation. Assigned by IP if not provided. */
    location?: string;
    /** The geographic area for this codespace. If not specified, the value is assigned by IP. This property replaces `location`, which is closing down. */
    geo?: "EuropeWest" | "SoutheastAsia" | "UsEast" | "UsWest";
    /** IP for location auto-detection when proxying a request */
    client_ip?: string;
    /** Machine type to use for this codespace */
    machine?: string;
    /** Path to devcontainer.json config to use for this codespace */
    devcontainer_path?: string;
    /** Whether to authorize requested permissions from devcontainer.json */
    multi_repo_permissions_opt_out?: boolean;
    /** Working directory for this codespace */
    working_directory?: string;
    /** Time in minutes before codespace stops from inactivity */
    idle_timeout_minutes?: number;
    /** Display name for this codespace */
    display_name?: string;
    /** Duration in minutes after codespace has gone idle in which it will be deleted. Must be integer minutes between 0 and 43200 (30 days). */
    retention_period_minutes?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Codespace>;

  /**
   * List devcontainer configurations in a repository for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#list-devcontainer-configurations-in-a-repository-for-the-authenticated-user
   */
  listDevcontainersInRepositoryForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; devcontainers: ({ path: string; name?: string; display_name?: string })[] }>;

  /**
   * List available machine types for a repository
   * @see https://docs.github.com/rest/codespaces/machines#list-available-machine-types-for-a-repository
   */
  repoMachinesForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The location to check for available machines. Assigned by IP if not provided. */
    location?: string;
    /** IP for location auto-detection when proxying a request */
    client_ip?: string;
    /** The branch or commit to check for prebuild availability and devcontainer restrictions. */
    ref?: string;
  }) => Promise<{ total_count: number; machines: (CodespaceMachine)[] }>;

  /**
   * Get default attributes for a codespace
   * @see https://docs.github.com/rest/codespaces/codespaces#get-default-attributes-for-a-codespace
   */
  preFlightWithRepoForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The branch or commit to check for a default devcontainer path. If not specified, the default branch will be checked. */
    ref?: string;
    /** An alternative IP for default location auto-detection, such as when proxying a request. */
    client_ip?: string;
  }) => Promise<{ billable_owner?: SimpleUser; defaults?: { location: string; devcontainer_path: string | null } }>;

  /**
   * Check if permissions defined by a devcontainer have been accepted by the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#check-if-permissions-defined-by-a-devcontainer-have-been-accepted-by-the-authenticated-user
   */
  checkPermissionsForDevcontainer: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The git reference that points to the location of the devcontainer configuration to use for the permission check. The value of `ref` will typically be a branch name (`heads/BRANCH_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
    ref: string;
    /** Path to the devcontainer.json configuration to use for the permission check. */
    devcontainer_path: string;
  }) => Promise<CodespacesPermissionsCheckForDevcontainer>;

  /**
   * List repository secrets
   * @see https://docs.github.com/rest/codespaces/repository-secrets#list-repository-secrets
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
  }) => Promise<{ total_count: number; secrets: (RepoCodespacesSecret)[] }>;

  /**
   * Get a repository public key
   * @see https://docs.github.com/rest/codespaces/repository-secrets#get-a-repository-public-key
   */
  getRepoPublicKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<CodespacesPublicKey>;

  /**
   * Get a repository secret
   * @see https://docs.github.com/rest/codespaces/repository-secrets#get-a-repository-secret
   */
  getRepoSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<RepoCodespacesSecret>;

  /**
   * Create or update a repository secret
   * @see https://docs.github.com/rest/codespaces/repository-secrets#create-or-update-a-repository-secret
   */
  createOrUpdateRepoSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get a repository public key](https://docs.github.com/rest/codespaces/repository-secrets#get-a-repository-public-key) endpoint. */
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
   * @see https://docs.github.com/rest/codespaces/repository-secrets#delete-a-repository-secret
   */
  deleteRepoSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * Create a codespace from a pull request
   * @see https://docs.github.com/rest/codespaces/codespaces#create-a-codespace-from-a-pull-request
   */
  createWithPrForAuthenticatedUser: (input: {
    /** The requested location for a new codespace. Best efforts are made to respect this upon creation. Assigned by IP if not provided. */
    location?: string;
    /** The geographic area for this codespace. If not specified, the value is assigned by IP. This property replaces `location`, which is closing down. */
    geo?: "EuropeWest" | "SoutheastAsia" | "UsEast" | "UsWest";
    /** IP for location auto-detection when proxying a request */
    client_ip?: string;
    /** Machine type to use for this codespace */
    machine?: string;
    /** Path to devcontainer.json config to use for this codespace */
    devcontainer_path?: string;
    /** Whether to authorize requested permissions from devcontainer.json */
    multi_repo_permissions_opt_out?: boolean;
    /** Working directory for this codespace */
    working_directory?: string;
    /** Time in minutes before codespace stops from inactivity */
    idle_timeout_minutes?: number;
    /** Display name for this codespace */
    display_name?: string;
    /** Duration in minutes after codespace has gone idle in which it will be deleted. Must be integer minutes between 0 and 43200 (30 days). */
    retention_period_minutes?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<Codespace>;

  /**
   * List codespaces for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#list-codespaces-for-the-authenticated-user
   */
  listForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** ID of the Repository to filter on */
    repository_id?: number;
  }) => Promise<{ total_count: number; codespaces: (Codespace)[] }>;

  /**
   * Create a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#create-a-codespace-for-the-authenticated-user
   */
  createForAuthenticatedUser: (input: {
    body: { repository_id: number; ref?: string; location?: string; geo?: "EuropeWest" | "SoutheastAsia" | "UsEast" | "UsWest"; client_ip?: string; machine?: string; devcontainer_path?: string; multi_repo_permissions_opt_out?: boolean; working_directory?: string; idle_timeout_minutes?: number; display_name?: string; retention_period_minutes?: number } | { pull_request: { pull_request_number: number; repository_id: number }; location?: string; geo?: "EuropeWest" | "SoutheastAsia" | "UsEast" | "UsWest"; machine?: string; devcontainer_path?: string; working_directory?: string; idle_timeout_minutes?: number };
  }) => Promise<Codespace>;

  /**
   * List secrets for the authenticated user
   * @see https://docs.github.com/rest/codespaces/secrets#list-secrets-for-the-authenticated-user
   */
  listSecretsForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (CodespacesSecret)[] }>;

  /**
   * Get public key for the authenticated user
   * @see https://docs.github.com/rest/codespaces/secrets#get-public-key-for-the-authenticated-user
   */
  getPublicKeyForAuthenticatedUser: () => Promise<CodespacesUserPublicKey>;

  /**
   * Get a secret for the authenticated user
   * @see https://docs.github.com/rest/codespaces/secrets#get-a-secret-for-the-authenticated-user
   */
  getSecretForAuthenticatedUser: (input: {
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<CodespacesSecret>;

  /**
   * Create or update a secret for the authenticated user
   * @see https://docs.github.com/rest/codespaces/secrets#create-or-update-a-secret-for-the-authenticated-user
   */
  createOrUpdateSecretForAuthenticatedUser: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get the public key for the authenticated user](https://docs.github.com/rest/codespaces/secrets#get-public-key-for-the-authenticated-user) endpoint. */
    encrypted_value?: string;
    /** ID of the key you used to encrypt the secret. */
    key_id: string;
    /** An array of repository ids that can access the user secret. You can manage the list of selected repositories using the [List selected repositories for a user secret](https://docs.github.com/rest/codespaces/secrets#list-selected-repositories-for-a-user-secret), [Set selected repositories for a user secret](https://docs.github.com/rest/codespaces/secrets#set-selected-repositories-for-a-user-secret), and [Remove a selected repository from a user secret](https://docs.github.com/rest/codespaces/secrets#remove-a-selected-repository-from-a-user-secret) endpoints. */
    selected_repository_ids?: (number | string)[];
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete a secret for the authenticated user
   * @see https://docs.github.com/rest/codespaces/secrets#delete-a-secret-for-the-authenticated-user
   */
  deleteSecretForAuthenticatedUser: (input: {
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for a user secret
   * @see https://docs.github.com/rest/codespaces/secrets#list-selected-repositories-for-a-user-secret
   */
  listRepositoriesForSecretForAuthenticatedUser: (input: {
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<{ total_count: number; repositories: (MinimalRepository)[] }>;

  /**
   * Set selected repositories for a user secret
   * @see https://docs.github.com/rest/codespaces/secrets#set-selected-repositories-for-a-user-secret
   */
  setRepositoriesForSecretForAuthenticatedUser: (input: {
    /** An array of repository ids for which a codespace can access the secret. You can manage the list of selected repositories using the [List selected repositories for a user secret](https://docs.github.com/rest/codespaces/secrets#list-selected-repositories-for-a-user-secret), [Add a selected repository to a user secret](https://docs.github.com/rest/codespaces/secrets#add-a-selected-repository-to-a-user-secret), and [Remove a selected repository from a user secret](https://docs.github.com/rest/codespaces/secrets#remove-a-selected-repository-from-a-user-secret) endpoints. */
    selected_repository_ids: (number)[];
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<BasicError>;

  /**
   * Add a selected repository to a user secret
   * @see https://docs.github.com/rest/codespaces/secrets#add-a-selected-repository-to-a-user-secret
   */
  addRepositoryForSecretForAuthenticatedUser: (input: {
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Remove a selected repository from a user secret
   * @see https://docs.github.com/rest/codespaces/secrets#remove-a-selected-repository-from-a-user-secret
   */
  removeRepositoryForSecretForAuthenticatedUser: (input: {
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Get a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#get-a-codespace-for-the-authenticated-user
   */
  getForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<Codespace>;

  /**
   * Update a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#update-a-codespace-for-the-authenticated-user
   */
  updateForAuthenticatedUser: (input: {
    /** A valid machine to transition this codespace to. */
    machine?: string;
    /** Display name for this codespace */
    display_name?: string;
    /** Recently opened folders inside the codespace. It is currently used by the clients to determine the folder path to load the codespace in. */
    recent_folders?: (string)[];
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<Codespace>;

  /**
   * Delete a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#delete-a-codespace-for-the-authenticated-user
   */
  deleteForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Export a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#export-a-codespace-for-the-authenticated-user
   */
  exportForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<CodespaceExportDetails>;

  /**
   * Get details about a codespace export
   * @see https://docs.github.com/rest/codespaces/codespaces#get-details-about-a-codespace-export
   */
  getExportDetailsForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
    /** The ID of the export operation, or `latest`. Currently only `latest` is currently supported. */
    export_id: string;
  }) => Promise<CodespaceExportDetails>;

  /**
   * List machine types for a codespace
   * @see https://docs.github.com/rest/codespaces/machines#list-machine-types-for-a-codespace
   */
  codespaceMachinesForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<{ total_count: number; machines: (CodespaceMachine)[] }>;

  /**
   * Create a repository from an unpublished codespace
   * @see https://docs.github.com/rest/codespaces/codespaces#create-a-repository-from-an-unpublished-codespace
   */
  publishForAuthenticatedUser: (input: {
    /** A name for the new repository. */
    name?: string;
    /** Whether the new repository should be private. */
    private?: boolean;
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<CodespaceWithFullRepository>;

  /**
   * Start a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#start-a-codespace-for-the-authenticated-user
   */
  startForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<Codespace>;

  /**
   * Stop a codespace for the authenticated user
   * @see https://docs.github.com/rest/codespaces/codespaces#stop-a-codespace-for-the-authenticated-user
   */
  stopForAuthenticatedUser: (input: {
    /** The name of the codespace. */
    codespace_name: string;
  }) => Promise<Codespace>;
};
