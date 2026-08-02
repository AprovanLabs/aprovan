import type { ActionsPublicKey, ActionsSecret, ActionsVariable, EmptyObject, MinimalRepository, OrganizationActionsSecret, OrganizationActionsVariable } from "./schemas.js";

export type AgentsOperations = {
  /**
   * List organization secrets
   * @see https://docs.github.com/rest/agents/secrets#list-organization-secrets
   */
  listOrgSecrets: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (OrganizationActionsSecret)[] }>;

  /**
   * Get an organization public key
   * @see https://docs.github.com/rest/agents/secrets#get-an-organization-public-key
   */
  getOrgPublicKey: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsPublicKey>;

  /**
   * Get an organization secret
   * @see https://docs.github.com/rest/agents/secrets#get-an-organization-secret
   */
  getOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<OrganizationActionsSecret>;

  /**
   * Create or update an organization secret
   * @see https://docs.github.com/rest/agents/secrets#create-or-update-an-organization-secret
   */
  createOrUpdateOrgSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get an organization public key](https://docs.github.com/rest/agents/secrets#get-an-organization-public-key) endpoint. */
    encrypted_value: string;
    /** ID of the key you used to encrypt the secret. */
    key_id: string;
    /** Which type of organization repositories have access to the organization secret. `selected` means only the repositories specified by `selected_repository_ids` can access the secret. */
    visibility: "all" | "private" | "selected";
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can manage the list of selected repositories using the [List selected repositories for an organization secret](https://docs.github.com/rest/agents/secrets#list-selected-repositories-for-an-organization-secret), [Set selected repositories for an organization secret](https://docs.github.com/rest/agents/secrets#set-selected-repositories-for-an-organization-secret), and [Remove selected repository from an organization secret](https://docs.github.com/rest/agents/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete an organization secret
   * @see https://docs.github.com/rest/agents/secrets#delete-an-organization-secret
   */
  deleteOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for an organization secret
   * @see https://docs.github.com/rest/agents/secrets#list-selected-repositories-for-an-organization-secret
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
   * @see https://docs.github.com/rest/agents/secrets#set-selected-repositories-for-an-organization-secret
   */
  setSelectedReposForOrgSecret: (input: {
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Add selected repository to an organization secret](https://docs.github.com/rest/agents/secrets#add-selected-repository-to-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/agents/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * Add selected repository to an organization secret
   * @see https://docs.github.com/rest/agents/secrets#add-selected-repository-to-an-organization-secret
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
   * @see https://docs.github.com/rest/agents/secrets#remove-selected-repository-from-an-organization-secret
   */
  removeSelectedRepoFromOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * List organization variables
   * @see https://docs.github.com/rest/agents/variables#list-organization-variables
   */
  listOrgVariables: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; variables: (OrganizationActionsVariable)[] }>;

  /**
   * Create an organization variable
   * @see https://docs.github.com/rest/agents/variables#create-an-organization-variable
   */
  createOrgVariable: (input: {
    /** The name of the variable. */
    name: string;
    /** The value of the variable. */
    value: string;
    /** The type of repositories in the organization that can access the variable. `selected` means only the repositories specified by `selected_repository_ids` can access the variable. */
    visibility: "all" | "private" | "selected";
    /** An array of repository ids that can access the organization variable. You can only provide a list of repository ids when the `visibility` is set to `selected`. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<EmptyObject>;

  /**
   * Get an organization variable
   * @see https://docs.github.com/rest/agents/variables#get-an-organization-variable
   */
  getOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<OrganizationActionsVariable>;

  /**
   * Update an organization variable
   * @see https://docs.github.com/rest/agents/variables#update-an-organization-variable
   */
  updateOrgVariable: (input: {
    /** The name of the variable. */
    name?: string;
    /** The value of the variable. */
    value?: string;
    /** The type of repositories in the organization that can access the variable. `selected` means only the repositories specified by `selected_repository_ids` can access the variable. */
    visibility?: "all" | "private" | "selected";
    /** An array of repository ids that can access the organization variable. You can only provide a list of repository ids when the `visibility` is set to `selected`. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }, options: { params: { name: string } }) => Promise<unknown>;

  /**
   * Delete an organization variable
   * @see https://docs.github.com/rest/agents/variables#delete-an-organization-variable
   */
  deleteOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for an organization variable
   * @see https://docs.github.com/rest/agents/variables#list-selected-repositories-for-an-organization-variable
   */
  listSelectedReposForOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<{ total_count: number; repositories: (MinimalRepository)[] }>;

  /**
   * Set selected repositories for an organization variable
   * @see https://docs.github.com/rest/agents/variables#set-selected-repositories-for-an-organization-variable
   */
  setSelectedReposForOrgVariable: (input: {
    /** The IDs of the repositories that can access the organization variable. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<unknown>;

  /**
   * Add selected repository to an organization variable
   * @see https://docs.github.com/rest/agents/variables#add-selected-repository-to-an-organization-variable
   */
  addSelectedRepoToOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Remove selected repository from an organization variable
   * @see https://docs.github.com/rest/agents/variables#remove-selected-repository-from-an-organization-variable
   */
  removeSelectedRepoFromOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * List repository organization secrets
   * @see https://docs.github.com/rest/agents/secrets#list-repository-organization-secrets
   */
  listRepoOrganizationSecrets: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (ActionsSecret)[] }>;

  /**
   * List repository organization variables
   * @see https://docs.github.com/rest/agents/variables#list-repository-organization-variables
   */
  listRepoOrganizationVariables: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; variables: (ActionsVariable)[] }>;

  /**
   * List repository secrets
   * @see https://docs.github.com/rest/agents/secrets#list-repository-secrets
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
  }) => Promise<{ total_count: number; secrets: (ActionsSecret)[] }>;

  /**
   * Get a repository public key
   * @see https://docs.github.com/rest/agents/secrets#get-a-repository-public-key
   */
  getRepoPublicKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsPublicKey>;

  /**
   * Get a repository secret
   * @see https://docs.github.com/rest/agents/secrets#get-a-repository-secret
   */
  getRepoSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<ActionsSecret>;

  /**
   * Create or update a repository secret
   * @see https://docs.github.com/rest/agents/secrets#create-or-update-a-repository-secret
   */
  createOrUpdateRepoSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get a repository public key](https://docs.github.com/rest/agents/secrets#get-a-repository-public-key) endpoint. */
    encrypted_value: string;
    /** ID of the key you used to encrypt the secret. */
    key_id: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete a repository secret
   * @see https://docs.github.com/rest/agents/secrets#delete-a-repository-secret
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
   * List repository variables
   * @see https://docs.github.com/rest/agents/variables#list-repository-variables
   */
  listRepoVariables: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; variables: (ActionsVariable)[] }>;

  /**
   * Create a repository variable
   * @see https://docs.github.com/rest/agents/variables#create-a-repository-variable
   */
  createRepoVariable: (input: {
    /** The name of the variable. */
    name: string;
    /** The value of the variable. */
    value: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<EmptyObject>;

  /**
   * Get a repository variable
   * @see https://docs.github.com/rest/agents/variables#get-a-repository-variable
   */
  getRepoVariable: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<ActionsVariable>;

  /**
   * Update a repository variable
   * @see https://docs.github.com/rest/agents/variables#update-a-repository-variable
   */
  updateRepoVariable: (input: {
    /** The name of the variable. */
    name?: string;
    /** The value of the variable. */
    value?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }, options: { params: { name: string } }) => Promise<unknown>;

  /**
   * Delete a repository variable
   * @see https://docs.github.com/rest/agents/variables#delete-a-repository-variable
   */
  deleteRepoVariable: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<unknown>;
};
