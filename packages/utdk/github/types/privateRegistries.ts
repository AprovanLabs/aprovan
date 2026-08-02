import type { BasicError, OrgPrivateRegistryConfiguration, OrgPrivateRegistryConfigurationWithSelectedRepositories } from "./schemas.js";

export type PrivateRegistriesOperations = {
  /**
   * List private registries for an organization
   * @see https://docs.github.com/rest/private-registries/organization-configurations#list-private-registries-for-an-organization
   */
  listOrgPrivateRegistries: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; configurations: (OrgPrivateRegistryConfiguration)[] }>;

  /**
   * Create a private registry for an organization
   * @see https://docs.github.com/rest/private-registries/organization-configurations#create-a-private-registry-for-an-organization
   */
  createOrgPrivateRegistry: (input: {
    /** The registry type. */
    registry_type: "maven_repository" | "nuget_feed" | "goproxy_server" | "npm_registry" | "rubygems_server" | "cargo_registry" | "composer_repository" | "docker_registry" | "git_source" | "helm_registry" | "hex_organization" | "hex_repository" | "pub_repository" | "python_index" | "terraform_registry";
    /** The URL of the private registry. */
    url: string;
    /** The username to use when authenticating with the private registry. This field should be omitted if the private registry does not require a username for authentication. */
    username?: string | null;
    /** Whether this private registry should replace the base registry (e.g., npmjs.org for npm, rubygems.org for rubygems). When set to `true`, Dependabot will only use this registry and will not fall back to the public registry. When set to `false` (default), Dependabot will use this registry for scoped packages but may fall back to the public registry for other packages. */
    replaces_base?: boolean;
    /** The value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get private registries public key for an organization](https://docs.github.com/rest/private-registries/organization-configurations#get-private-registries-public-key-for-an-organization) endpoint. Required when `auth_type` is `token` or `username_password`. Should be omitted for OIDC auth types. */
    encrypted_value?: string;
    /** The ID of the key you used to encrypt the secret. Required when `auth_type` is `token` or `username_password`. Should be omitted for OIDC auth types. */
    key_id?: string;
    /** Which type of organization repositories have access to the private registry. `selected` means only the repositories specified by `selected_repository_ids` can access the private registry. */
    visibility: "all" | "private" | "selected";
    /** An array of repository IDs that can access the organization private registry. You can only provide a list of repository IDs when `visibility` is set to `selected`. You can manage the list of selected repositories using the [Update a private registry for an organization](https://docs.github.com/rest/private-registries/organization-configurations#update-a-private-registry-for-an-organization) endpoint. This field should be omitted if `visibility` is set to `all` or `private`. */
    selected_repository_ids?: (number)[];
    /** The authentication type for the private registry. Defaults to `token` if not specified. Use `oidc_azure`, `oidc_aws`, `oidc_jfrog`, `oidc_cloudsmith`, or `oidc_gcp` for OIDC authentication. */
    auth_type?: "token" | "username_password" | "oidc_azure" | "oidc_aws" | "oidc_jfrog" | "oidc_cloudsmith" | "oidc_gcp";
    /** The tenant ID of the Azure AD application. Required when `auth_type` is `oidc_azure`. */
    tenant_id?: string;
    /** The client ID of the Azure AD application. Required when `auth_type` is `oidc_azure`. */
    client_id?: string;
    /** The AWS region. Required when `auth_type` is `oidc_aws`. */
    aws_region?: string;
    /** The AWS account ID. Required when `auth_type` is `oidc_aws`. */
    account_id?: string;
    /** The AWS IAM role name. Required when `auth_type` is `oidc_aws`. */
    role_name?: string;
    /** The CodeArtifact domain. Required when `auth_type` is `oidc_aws`. */
    domain?: string;
    /** The CodeArtifact domain owner (AWS account ID). Required when `auth_type` is `oidc_aws`. */
    domain_owner?: string;
    /** The JFrog OIDC provider name. Required when `auth_type` is `oidc_jfrog`. */
    jfrog_oidc_provider_name?: string;
    /** The OIDC audience. Optional for `oidc_aws`, `oidc_jfrog`, and `oidc_gcp`, and required for `oidc_cloudsmith` auth types. */
    audience?: string;
    /** The JFrog identity mapping name. Optional for `oidc_jfrog` auth type. */
    identity_mapping_name?: string;
    /** The Cloudsmith organization namespace. Required when `auth_type` is `oidc_cloudsmith`. */
    namespace?: string;
    /** The Cloudsmith service account slug. Required when `auth_type` is `oidc_cloudsmith`. */
    service_slug?: string;
    /** The Cloudsmith API host. Optional for `oidc_cloudsmith` auth type. If omitted, `api.cloudsmith.io` is used by default. */
    api_host?: string;
    /** The full resource name of the GCP Workload Identity Provider (e.g. `projects/<NUM>/locations/global/workloadIdentityPools/<POOL>/providers/<PROVIDER>`). Required when `auth_type` is `oidc_gcp`. */
    workload_identity_provider?: string;
    /** The GCP service account email to impersonate. Optional for `oidc_gcp` auth type. If omitted, the federated token is used directly (direct WIF). */
    service_account?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrgPrivateRegistryConfigurationWithSelectedRepositories>;

  /**
   * Get private registries public key for an organization
   * @see https://docs.github.com/rest/private-registries/organization-configurations#get-private-registries-public-key-for-an-organization
   */
  getOrgPublicKey: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ key_id: string; key: string }>;

  /**
   * Get a private registry for an organization
   * @see https://docs.github.com/rest/private-registries/organization-configurations#get-a-private-registry-for-an-organization
   */
  getOrgPrivateRegistry: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<OrgPrivateRegistryConfiguration>;

  /**
   * Update a private registry for an organization
   * @see https://docs.github.com/rest/private-registries/organization-configurations#update-a-private-registry-for-an-organization
   */
  updateOrgPrivateRegistry: (input: {
    /** The registry type. */
    registry_type?: "maven_repository" | "nuget_feed" | "goproxy_server" | "npm_registry" | "rubygems_server" | "cargo_registry" | "composer_repository" | "docker_registry" | "git_source" | "helm_registry" | "hex_organization" | "hex_repository" | "pub_repository" | "python_index" | "terraform_registry";
    /** The URL of the private registry. */
    url?: string;
    /** The username to use when authenticating with the private registry. This field should be omitted if the private registry does not require a username for authentication. */
    username?: string | null;
    /** Whether this private registry should replace the base registry (e.g., npmjs.org for npm, rubygems.org for rubygems). When set to `true`, Dependabot will only use this registry and will not fall back to the public registry. When set to `false` (default), Dependabot will use this registry for scoped packages but may fall back to the public registry for other packages. */
    replaces_base?: boolean;
    /** The value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get private registries public key for an organization](https://docs.github.com/rest/private-registries/organization-configurations#get-private-registries-public-key-for-an-organization) endpoint. */
    encrypted_value?: string;
    /** The ID of the key you used to encrypt the secret. */
    key_id?: string;
    /** Which type of organization repositories have access to the private registry. `selected` means only the repositories specified by `selected_repository_ids` can access the private registry. */
    visibility?: "all" | "private" | "selected";
    /** An array of repository IDs that can access the organization private registry. You can only provide a list of repository IDs when `visibility` is set to `selected`. This field should be omitted if `visibility` is set to `all` or `private`. */
    selected_repository_ids?: (number)[];
    /** The authentication type for the private registry. This field cannot be changed after creation. If provided, it must match the existing `auth_type` of the configuration. To change the authentication type, delete and recreate the configuration. */
    auth_type?: "token" | "username_password" | "oidc_azure" | "oidc_aws" | "oidc_jfrog" | "oidc_cloudsmith" | "oidc_gcp";
    /** The tenant ID of the Azure AD application. Required when `auth_type` is `oidc_azure`. */
    tenant_id?: string;
    /** The client ID of the Azure AD application. Required when `auth_type` is `oidc_azure`. */
    client_id?: string;
    /** The AWS region. Required when `auth_type` is `oidc_aws`. */
    aws_region?: string;
    /** The AWS account ID. Required when `auth_type` is `oidc_aws`. */
    account_id?: string;
    /** The AWS IAM role name. Required when `auth_type` is `oidc_aws`. */
    role_name?: string;
    /** The CodeArtifact domain. Required when `auth_type` is `oidc_aws`. */
    domain?: string;
    /** The CodeArtifact domain owner (AWS account ID). Required when `auth_type` is `oidc_aws`. */
    domain_owner?: string;
    /** The JFrog OIDC provider name. Required when `auth_type` is `oidc_jfrog`. */
    jfrog_oidc_provider_name?: string;
    /** The OIDC audience. Optional for `oidc_aws`, `oidc_jfrog`, and `oidc_gcp`, and required for `oidc_cloudsmith` auth types. */
    audience?: string;
    /** The JFrog identity mapping name. Optional for `oidc_jfrog` auth type. */
    identity_mapping_name?: string;
    /** The Cloudsmith organization namespace. Required when `auth_type` is `oidc_cloudsmith`. */
    namespace?: string;
    /** The Cloudsmith service account slug. Required when `auth_type` is `oidc_cloudsmith`. */
    service_slug?: string;
    /** The Cloudsmith API host. Optional for `oidc_cloudsmith` auth type. If omitted, `api.cloudsmith.io` is used by default. */
    api_host?: string;
    /** The full resource name of the GCP Workload Identity Provider (e.g. `projects/<NUM>/locations/global/workloadIdentityPools/<POOL>/providers/<PROVIDER>`). Required when `auth_type` is `oidc_gcp`. */
    workload_identity_provider?: string;
    /** The GCP service account email to impersonate. Optional for `oidc_gcp` auth type. If omitted, the federated token is used directly (direct WIF). */
    service_account?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<BasicError>;

  /**
   * Delete a private registry for an organization
   * @see https://docs.github.com/rest/private-registries/organization-configurations#delete-a-private-registry-for-an-organization
   */
  deleteOrgPrivateRegistry: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<BasicError>;
};
