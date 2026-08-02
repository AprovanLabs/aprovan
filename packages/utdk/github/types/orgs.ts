import type { ArtifactDeploymentRecord, BasicError, CustomProperty, CustomPropertyValue, HookDelivery, HookDeliveryItem, ImmutableReleasesOrganizationSettings, Installation, IssueField, IssueType, MinimalRepository, OrgHook, OrgMembership, OrgRepoCustomPropertyValues, OrganizationFull, OrganizationInvitation, OrganizationProgrammaticAccessGrant, OrganizationProgrammaticAccessGrantRequest, OrganizationRole, OrganizationSimple, RulesetVersion, RulesetVersionWithState, SimpleUser, Team, TeamRoleAssignment, TeamSimple, UserRoleAssignment, ValidationError, WebhookConfig, WebhookConfigContentType, WebhookConfigInsecureSsl, WebhookConfigSecret, WebhookConfigUrl } from "./schemas.js";

export type OrgsOperations = {
  /**
   * List organizations
   * @see https://docs.github.com/rest/orgs/orgs#list-organizations
   */
  list: (input: {
    /** An organization ID. Only return organizations with an ID greater than this ID. */
    since?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(OrganizationSimple)[]>;

  /**
   * Get an organization
   * @see https://docs.github.com/rest/orgs/orgs#get-an-organization
   */
  get: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrganizationFull>;

  /**
   * Update an organization
   * @see https://docs.github.com/rest/orgs/orgs#update-an-organization
   */
  update: (input: {
    /** Billing email address. This address is not publicized. */
    billing_email?: string;
    /** The company name. */
    company?: string;
    /** The publicly visible email address. */
    email?: string;
    /** The Twitter username of the company. */
    twitter_username?: string;
    /** The location. */
    location?: string;
    /** The shorthand name of the company. */
    name?: string;
    /** The description of the company. The maximum size is 160 characters. */
    description?: string;
    /** Whether an organization can use organization projects. */
    has_organization_projects?: boolean;
    /** Whether repositories that belong to the organization can use repository projects. */
    has_repository_projects?: boolean;
    /** Default permission level members have for organization repositories. */
    default_repository_permission?: "read" | "write" | "admin" | "none";
    /** Whether of non-admin organization members can create repositories. **Note:** A parameter can override this parameter. See `members_allowed_repository_creation_type` in this table for details. */
    members_can_create_repositories?: boolean;
    /** Whether organization members can create internal repositories, which are visible to all enterprise members. You can only allow members to create internal repositories if your organization is associated with an enterprise account using GitHub Enterprise Cloud or GitHub Enterprise Server 2.20+. For more information, see "[Restricting repository creation in your organization](https://docs.github.com/github/setting-up-and-managing-organizations-and-teams/restricting-repository-creation-in-your-organization)" in the GitHub Help documentation. */
    members_can_create_internal_repositories?: boolean;
    /** Whether organization members can create private repositories, which are visible to organization members with permission. For more information, see "[Restricting repository creation in your organization](https://docs.github.com/github/setting-up-and-managing-organizations-and-teams/restricting-repository-creation-in-your-organization)" in the GitHub Help documentation. */
    members_can_create_private_repositories?: boolean;
    /** Whether organization members can create public repositories, which are visible to anyone. For more information, see "[Restricting repository creation in your organization](https://docs.github.com/github/setting-up-and-managing-organizations-and-teams/restricting-repository-creation-in-your-organization)" in the GitHub Help documentation. */
    members_can_create_public_repositories?: boolean;
    /** Specifies which types of repositories non-admin organization members can create. `private` is only available to repositories that are part of an organization on GitHub Enterprise Cloud.  **Note:** This parameter is closing down and will be removed in the future. Its return value ignores internal repositories. Using this parameter overrides values set in `members_can_create_repositories`. See the parameter deprecation notice in the operation description for details. */
    members_allowed_repository_creation_type?: "all" | "private" | "none";
    /** Whether organization members can create GitHub Pages sites. Existing published sites will not be impacted. */
    members_can_create_pages?: boolean;
    /** Whether organization members can create public GitHub Pages sites. Existing published sites will not be impacted. */
    members_can_create_public_pages?: boolean;
    /** Whether organization members can create private GitHub Pages sites. Existing published sites will not be impacted. */
    members_can_create_private_pages?: boolean;
    /** Whether organization members can fork private organization repositories. */
    members_can_fork_private_repositories?: boolean;
    /** Whether contributors to organization repositories are required to sign off on commits they make through GitHub's web interface. */
    web_commit_signoff_required?: boolean;
    blog?: string;
    /** **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.  Whether GitHub Advanced Security is automatically enabled for new repositories and repositories transferred to this organization.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  You can check which security and analysis features are currently enabled by using a `GET /orgs/{org}` request. */
    advanced_security_enabled_for_new_repositories?: boolean;
    /** **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.  Whether Dependabot alerts are automatically enabled for new repositories and repositories transferred to this organization.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  You can check which security and analysis features are currently enabled by using a `GET /orgs/{org}` request. */
    dependabot_alerts_enabled_for_new_repositories?: boolean;
    /** **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.  Whether Dependabot security updates are automatically enabled for new repositories and repositories transferred to this organization.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  You can check which security and analysis features are currently enabled by using a `GET /orgs/{org}` request. */
    dependabot_security_updates_enabled_for_new_repositories?: boolean;
    /** **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.  Whether dependency graph is automatically enabled for new repositories and repositories transferred to this organization.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  You can check which security and analysis features are currently enabled by using a `GET /orgs/{org}` request. */
    dependency_graph_enabled_for_new_repositories?: boolean;
    /** **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.  Whether secret scanning is automatically enabled for new repositories and repositories transferred to this organization.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  You can check which security and analysis features are currently enabled by using a `GET /orgs/{org}` request. */
    secret_scanning_enabled_for_new_repositories?: boolean;
    /** **Endpoint closing down notice.** Please use [code security configurations](https://docs.github.com/rest/code-security/configurations) instead.  Whether secret scanning push protection is automatically enabled for new repositories and repositories transferred to this organization.  To use this parameter, you must have admin permissions for the repository or be an owner or security manager for the organization that owns the repository. For more information, see "[Managing security managers in your organization](https://docs.github.com/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)."  You can check which security and analysis features are currently enabled by using a `GET /orgs/{org}` request. */
    secret_scanning_push_protection_enabled_for_new_repositories?: boolean;
    /** Whether a custom link is shown to contributors who are blocked from pushing a secret by push protection. */
    secret_scanning_push_protection_custom_link_enabled?: boolean;
    /** If `secret_scanning_push_protection_custom_link_enabled` is true, the URL that will be displayed to contributors who are blocked from pushing a secret. */
    secret_scanning_push_protection_custom_link?: string;
    /** Controls whether or not deploy keys may be added and used for repositories in the organization. */
    deploy_keys_enabled_for_repositories?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrganizationFull>;

  /**
   * Delete an organization
   * @see https://docs.github.com/rest/orgs/orgs#delete-an-organization
   */
  delete: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Create an artifact deployment record
   * @see https://docs.github.com/rest/orgs/artifact-metadata#create-an-artifact-deployment-record
   */
  createArtifactDeploymentRecord: (input: {
    /** The name of the artifact. */
    name: string;
    /** The hex encoded digest of the artifact. */
    digest: string;
    /** The artifact version. */
    version?: string;
    /** The status of the artifact. Can be either deployed or decommissioned. */
    status: "deployed" | "decommissioned";
    /** The stage of the deployment. */
    logical_environment: string;
    /** The physical region of the deployment. */
    physical_environment?: string;
    /** The deployment cluster. */
    cluster?: string;
    /** The unique identifier for the deployment represented by the new record. To accommodate differing containers and namespaces within a cluster, the following format is recommended: {namespaceName}-{deploymentName}-{containerName}.  */
    deployment_name: string;
    /** The tags associated with the deployment. */
    tags?: { [key: string]: string | undefined };
    /** A list of runtime risks associated with the deployment. */
    runtime_risks?: ("critical-resource" | "internet-exposed" | "lateral-movement" | "sensitive-data")[];
    /** The name of the GitHub repository associated with the artifact. This should be used when there are no provenance attestations available for the artifact. The repository must belong to the organization specified in the path parameter.  If a provenance attestation is available for the artifact, the API will use the repository information from the attestation instead of this parameter. */
    github_repository?: string;
    /** If true, the endpoint will return the created or updated record in the response body.  */
    return_records?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; deployment_records?: (ArtifactDeploymentRecord)[] }>;

  /**
   * Set cluster deployment records
   * @see https://docs.github.com/rest/orgs/artifact-metadata#set-cluster-deployment-records
   */
  setClusterDeploymentRecords: (input: {
    /** The stage of the deployment. */
    logical_environment: string;
    /** The physical region of the deployment. */
    physical_environment?: string;
    /** The list of deployments to record. */
    deployments: ({ name: string; digest: string; version?: string; status?: "deployed" | "decommissioned"; deployment_name: string; github_repository?: string; tags?: { [key: string]: string | undefined }; runtime_risks?: ("critical-resource" | "internet-exposed" | "lateral-movement" | "sensitive-data")[] })[];
    /** If true, the endpoint will return the set records in the response body  */
    return_records?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The cluster name. */
    cluster: string;
  }) => Promise<{ total_count: number; deployment_records?: (ArtifactDeploymentRecord)[] }>;

  /**
   * Create artifact metadata storage record
   * @see https://docs.github.com/rest/orgs/artifact-metadata#create-artifact-metadata-storage-record
   */
  createArtifactStorageRecord: (input: {
    /** The name of the artifact. */
    name: string;
    /** The digest of the artifact (algorithm:hex-encoded-digest). */
    digest: string;
    /** The artifact version. */
    version?: string;
    /** The URL where the artifact is stored. */
    artifact_url?: string;
    /** The path of the artifact. */
    path?: string;
    /** The base URL of the artifact registry. */
    registry_url: string;
    /** The repository name within the registry. */
    repository?: string;
    /** The status of the artifact (e.g., active, inactive). */
    status?: "active" | "eol" | "deleted";
    /** The name of the GitHub repository associated with the artifact. This should be used when there are no provenance attestations available for the artifact. The repository must belong to the organization specified in the path parameter.  If a provenance attestation is available for the artifact, the API will use the repository information from the attestation instead of this parameter. */
    github_repository?: string;
    /** If true, the endpoint will return the created record in the response body.  */
    return_records?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; storage_records?: ({ id?: number; name?: string; digest?: string; artifact_url?: string | null; registry_url?: string; repository?: string | null; status?: string; created_at?: string; updated_at?: string })[] }>;

  /**
   * List artifact deployment records
   * @see https://docs.github.com/rest/orgs/artifact-metadata#list-artifact-deployment-records
   */
  listArtifactDeploymentRecords: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The SHA256 digest of the artifact, in the form `sha256:HEX_DIGEST`. */
    subject_digest: string;
  }) => Promise<{ total_count?: number; deployment_records?: (ArtifactDeploymentRecord)[] }>;

  /**
   * List artifact storage records
   * @see https://docs.github.com/rest/orgs/artifact-metadata#list-artifact-storage-records
   */
  listArtifactStorageRecords: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The parameter should be set to the attestation's subject's SHA256 digest, in the form `sha256:HEX_DIGEST`. */
    subject_digest: string;
  }) => Promise<{ total_count?: number; storage_records?: ({ id?: number; name?: string; digest?: string; artifact_url?: string; registry_url?: string; repository?: string; status?: string; created_at?: string; updated_at?: string })[] }>;

  /**
   * List attestations by bulk subject digests
   * @see https://docs.github.com/rest/orgs/attestations#list-attestations-by-bulk-subject-digests
   */
  listAttestationsBulk: (input: {
    /** List of subject digests to fetch attestations for. */
    subject_digests: (string)[];
    /** Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types. */
    predicate_type?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
  }) => Promise<{ attestations_subject_digests?: { [key: string]: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } }; repository_id?: number; bundle_url?: string })[] | null | undefined }; page_info?: { has_next?: boolean; has_previous?: boolean; next?: string; previous?: string } }>;

  /**
   * Delete attestations in bulk
   * @see https://docs.github.com/rest/orgs/attestations#delete-attestations-in-bulk
   */
  deleteAttestationsBulk: (input: {
    /** The request body must include either `subject_digests` or `attestation_ids`, but not both. */
    body: { subject_digests: (string)[] } | { attestation_ids: (number)[] };
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Delete attestations by subject digest
   * @see https://docs.github.com/rest/orgs/attestations#delete-attestations-by-subject-digest
   */
  deleteAttestationsBySubjectDigest: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Subject Digest */
    subject_digest: string;
  }) => Promise<BasicError>;

  /**
   * List attestation repositories
   * @see https://docs.github.com/rest/orgs/attestations#list-attestation-repositories
   */
  listAttestationRepositories: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types. */
    predicate_type?: string;
  }) => Promise<({ id?: number; name?: string })[]>;

  /**
   * Delete attestations by ID
   * @see https://docs.github.com/rest/orgs/attestations#delete-attestations-by-id
   */
  deleteAttestationsById: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Attestation ID */
    attestation_id: number;
  }) => Promise<BasicError>;

  /**
   * List attestations
   * @see https://docs.github.com/rest/orgs/attestations#list-attestations
   */
  listAttestations: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The parameter should be set to the attestation's subject's SHA256 digest, in the form `sha256:HEX_DIGEST`. */
    subject_digest: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
    /** Optional filter for fetching attestations with a given predicate type. This option accepts `provenance`, `sbom`, `release`, or freeform text for custom predicate types. */
    predicate_type?: string;
  }) => Promise<{ attestations?: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } } | null; repository_id?: number; bundle_url?: string; initiator?: string })[] }>;

  /**
   * List users blocked by an organization
   * @see https://docs.github.com/rest/orgs/blocking#list-users-blocked-by-an-organization
   */
  listBlockedUsers: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check if a user is blocked by an organization
   * @see https://docs.github.com/rest/orgs/blocking#check-if-a-user-is-blocked-by-an-organization
   */
  checkBlockedUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Block a user from an organization
   * @see https://docs.github.com/rest/orgs/blocking#block-a-user-from-an-organization
   */
  blockUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<ValidationError>;

  /**
   * Unblock a user from an organization
   * @see https://docs.github.com/rest/orgs/blocking#unblock-a-user-from-an-organization
   */
  unblockUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * List failed organization invitations
   * @see https://docs.github.com/rest/orgs/members#list-failed-organization-invitations
   */
  listFailedInvitations: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrganizationInvitation)[]>;

  /**
   * List organization webhooks
   * @see https://docs.github.com/rest/orgs/webhooks#list-organization-webhooks
   */
  listWebhooks: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrgHook)[]>;

  /**
   * Create an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#create-an-organization-webhook
   */
  createWebhook: (input: {
    /** Must be passed as "web". */
    name: string;
    /** Key/value pairs to provide settings for this webhook. */
    config: { url: WebhookConfigUrl; content_type?: WebhookConfigContentType; secret?: WebhookConfigSecret; insecure_ssl?: WebhookConfigInsecureSsl; username?: string; password?: string };
    /** Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for. Set to `["*"]` to receive all possible events. */
    events?: (string)[];
    /** Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications. */
    active?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrgHook>;

  /**
   * Get an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#get-an-organization-webhook
   */
  getWebhook: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<OrgHook>;

  /**
   * Update an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#update-an-organization-webhook
   */
  updateWebhook: (input: {
    /** Key/value pairs to provide settings for this webhook. */
    config?: { url: WebhookConfigUrl; content_type?: WebhookConfigContentType; secret?: WebhookConfigSecret; insecure_ssl?: WebhookConfigInsecureSsl };
    /** Determines what [events](https://docs.github.com/webhooks/event-payloads) the hook is triggered for. */
    events?: (string)[];
    /** Determines if notifications are sent when the webhook is triggered. Set to `true` to send notifications. */
    active?: boolean;
    name?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<OrgHook>;

  /**
   * Delete an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#delete-an-organization-webhook
   */
  deleteWebhook: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<BasicError>;

  /**
   * Get a webhook configuration for an organization
   * @see https://docs.github.com/rest/orgs/webhooks#get-a-webhook-configuration-for-an-organization
   */
  getWebhookConfigForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<WebhookConfig>;

  /**
   * Update a webhook configuration for an organization
   * @see https://docs.github.com/rest/orgs/webhooks#update-a-webhook-configuration-for-an-organization
   */
  updateWebhookConfigForOrg: (input: {
    url?: WebhookConfigUrl;
    content_type?: WebhookConfigContentType;
    secret?: WebhookConfigSecret;
    insecure_ssl?: WebhookConfigInsecureSsl;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<WebhookConfig>;

  /**
   * List deliveries for an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#list-deliveries-for-an-organization-webhook
   */
  listWebhookDeliveries: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** Used for pagination: the starting delivery from which the page of deliveries is fetched. Refer to the `link` header for the next and previous page cursors. */
    cursor?: string;
    /** Returns webhook deliveries filtered by delivery outcome classification based on `status_code` range. A `status` of `success` returns deliveries with a `status_code` in the 200-399 range (inclusive). A `status` of `failure` returns deliveries with a `status_code` in the 400-599 range (inclusive). */
    status?: "success" | "failure";
  }) => Promise<(HookDeliveryItem)[]>;

  /**
   * Get a webhook delivery for an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#get-a-webhook-delivery-for-an-organization-webhook
   */
  getWebhookDelivery: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
    delivery_id: number;
  }) => Promise<HookDelivery>;

  /**
   * Redeliver a delivery for an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#redeliver-a-delivery-for-an-organization-webhook
   */
  redeliverWebhookDelivery: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
    delivery_id: number;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Ping an organization webhook
   * @see https://docs.github.com/rest/orgs/webhooks#ping-an-organization-webhook
   */
  pingWebhook: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
    hook_id: number;
  }) => Promise<BasicError>;

  /**
   * List app installations for an organization
   * @see https://docs.github.com/rest/orgs/orgs#list-app-installations-for-an-organization
   */
  listAppInstallations: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; installations: (Installation)[] }>;

  /**
   * List pending organization invitations
   * @see https://docs.github.com/rest/orgs/members#list-pending-organization-invitations
   */
  listPendingInvitations: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Filter invitations by their member role. */
    role?: "all" | "admin" | "direct_member" | "billing_manager" | "hiring_manager";
    /** Filter invitations by their invitation source. */
    invitation_source?: "all" | "member" | "scim";
  }) => Promise<(OrganizationInvitation)[]>;

  /**
   * Create an organization invitation
   * @see https://docs.github.com/rest/orgs/members#create-an-organization-invitation
   */
  createInvitation: (input: {
    /** **Required unless you provide `email`**. GitHub user ID for the person you are inviting. */
    invitee_id?: number;
    /** **Required unless you provide `invitee_id`**. Email address of the person you are inviting, which can be an existing GitHub user. */
    email?: string;
    /** The role for the new member.   * `admin` - Organization owners with full administrative rights to the organization and complete access to all repositories and teams.    * `direct_member` - Non-owner organization members with ability to see other members and join teams by invitation.    * `billing_manager` - Non-owner organization members with ability to manage the billing settings of your organization.   * `reinstate` - The previous role assigned to the invitee before they were removed from your organization. Can be one of the roles listed above. Only works if the invitee was previously part of your organization. */
    role?: "admin" | "direct_member" | "billing_manager" | "reinstate";
    /** Specify IDs for the teams you want to invite new members to. */
    team_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrganizationInvitation>;

  /**
   * Cancel an organization invitation
   * @see https://docs.github.com/rest/orgs/members#cancel-an-organization-invitation
   */
  cancelInvitation: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the invitation. */
    invitation_id: number;
  }) => Promise<BasicError>;

  /**
   * List organization invitation teams
   * @see https://docs.github.com/rest/orgs/members#list-organization-invitation-teams
   */
  listInvitationTeams: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the invitation. */
    invitation_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Team)[]>;

  /**
   * List issue fields for an organization
   * @see https://docs.github.com/rest/orgs/issue-fields#list-issue-fields-for-an-organization
   */
  listIssueFields: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(IssueField)[]>;

  /**
   * Create issue field for an organization
   * @see https://docs.github.com/rest/orgs/issue-fields#create-issue-field-for-an-organization
   */
  createIssueField: (input: {
    /** Name of the issue field. */
    name: string;
    /** Description of the issue field. */
    description?: string | null;
    /** The data type of the issue field. */
    data_type: "text" | "date" | "single_select" | "multi_select" | "number";
    /** The visibility of the issue field. Can be `organization_members_only` (visible only within the organization) or `all` (visible to all users who can see issues). Only used when the visibility settings feature is enabled. Defaults to `organization_members_only`. */
    visibility?: "organization_members_only" | "all";
    /** Options for select fields. Required when data_type is 'single_select' or 'multi_select'. */
    options?: ({ name: string; description?: string | null; color: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple"; priority: number })[] | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<IssueField>;

  /**
   * Update issue field for an organization
   * @see https://docs.github.com/rest/orgs/issue-fields#update-issue-field-for-an-organization
   */
  updateIssueField: (input: {
    /** Name of the issue field. */
    name?: string;
    /** Description of the issue field. */
    description?: string | null;
    /** The visibility of the issue field. Can be `organization_members_only` (visible only within the organization) or `all` (visible to all users who can see issues). Only used when the visibility settings feature is enabled. */
    visibility?: "organization_members_only" | "all";
    /** Options for select fields. Only applicable when updating single_select or multi_select fields. When provided, this array **replaces** the entire existing set of options rather than adding to or updating individual options. To retain or update an existing option, include it in the array with its `id`. Options sent without an `id` are treated as new options and may cause existing options to be deleted and recreated. */
    options?: ({ id?: number; name: string; description?: string | null; color: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple"; priority: number })[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the issue field. */
    issue_field_id: number;
  }) => Promise<IssueField>;

  /**
   * Delete issue field for an organization
   * @see https://docs.github.com/rest/orgs/issue-fields#delete-issue-field-for-an-organization
   */
  deleteIssueField: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the issue field. */
    issue_field_id: number;
  }) => Promise<BasicError>;

  /**
   * List issue types for an organization
   * @see https://docs.github.com/rest/orgs/issue-types#list-issue-types-for-an-organization
   */
  listIssueTypes: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(IssueType)[]>;

  /**
   * Create issue type for an organization
   * @see https://docs.github.com/rest/orgs/issue-types#create-issue-type-for-an-organization
   */
  createIssueType: (input: {
    /** Name of the issue type. */
    name: string;
    /** Whether or not the issue type is enabled at the organization level. */
    is_enabled: boolean;
    /** Description of the issue type. */
    description?: string | null;
    /** Color for the issue type. */
    color?: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple" | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<IssueType>;

  /**
   * Update issue type for an organization
   * @see https://docs.github.com/rest/orgs/issue-types#update-issue-type-for-an-organization
   */
  updateIssueType: (input: {
    /** Name of the issue type. */
    name: string;
    /** Whether or not the issue type is enabled at the organization level. */
    is_enabled: boolean;
    /** Description of the issue type. */
    description?: string | null;
    /** Color for the issue type. */
    color?: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple" | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the issue type. */
    issue_type_id: number;
  }) => Promise<IssueType>;

  /**
   * Delete issue type for an organization
   * @see https://docs.github.com/rest/orgs/issue-types#delete-issue-type-for-an-organization
   */
  deleteIssueType: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the issue type. */
    issue_type_id: number;
  }) => Promise<BasicError>;

  /**
   * List organization members
   * @see https://docs.github.com/rest/orgs/members#list-organization-members
   */
  listMembers: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Filter members returned in the list. `2fa_disabled` means that only members without [two-factor authentication](https://github.com/blog/1614-two-factor-authentication) enabled will be returned. `2fa_insecure` means that only members with [insecure 2FA methods](https://docs.github.com/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization#requiring-secure-methods-of-two-factor-authentication-in-your-organization) will be returned. These options are only available for organization owners. */
    filter?: "2fa_disabled" | "2fa_insecure" | "all";
    /** Filter members returned by their role. */
    role?: "all" | "admin" | "member";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check organization membership for a user
   * @see https://docs.github.com/rest/orgs/members#check-organization-membership-for-a-user
   */
  checkMembershipForUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Remove an organization member
   * @see https://docs.github.com/rest/orgs/members#remove-an-organization-member
   */
  removeMember: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Get organization membership for a user
   * @see https://docs.github.com/rest/orgs/members#get-organization-membership-for-a-user
   */
  getMembershipForUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<OrgMembership>;

  /**
   * Set organization membership for a user
   * @see https://docs.github.com/rest/orgs/members#set-organization-membership-for-a-user
   */
  setMembershipForUser: (input: {
    /** The role to give the user in the organization. Can be one of:    * `admin` - The user will become an owner of the organization.    * `member` - The user will become a non-owner member of the organization. */
    role?: "admin" | "member";
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<OrgMembership>;

  /**
   * Remove organization membership for a user
   * @see https://docs.github.com/rest/orgs/members#remove-organization-membership-for-a-user
   */
  removeMembershipForUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Get all organization roles for an organization
   * @see https://docs.github.com/rest/orgs/organization-roles#get-all-organization-roles-for-an-organization
   */
  listOrgRoles: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count?: number; roles?: (OrganizationRole)[] }>;

  /**
   * Remove all organization roles for a team
   * @see https://docs.github.com/rest/orgs/organization-roles#remove-all-organization-roles-for-a-team
   */
  revokeAllOrgRolesTeam: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<unknown>;

  /**
   * Assign an organization role to a team
   * @see https://docs.github.com/rest/orgs/organization-roles#assign-an-organization-role-to-a-team
   */
  assignTeamToOrgRole: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The unique identifier of the role. */
    role_id: number;
  }) => Promise<unknown>;

  /**
   * Remove an organization role from a team
   * @see https://docs.github.com/rest/orgs/organization-roles#remove-an-organization-role-from-a-team
   */
  revokeOrgRoleTeam: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The unique identifier of the role. */
    role_id: number;
  }) => Promise<unknown>;

  /**
   * Remove all organization roles for a user
   * @see https://docs.github.com/rest/orgs/organization-roles#remove-all-organization-roles-for-a-user
   */
  revokeAllOrgRolesUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Assign an organization role to a user
   * @see https://docs.github.com/rest/orgs/organization-roles#assign-an-organization-role-to-a-user
   */
  assignUserToOrgRole: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the role. */
    role_id: number;
  }) => Promise<unknown>;

  /**
   * Remove an organization role from a user
   * @see https://docs.github.com/rest/orgs/organization-roles#remove-an-organization-role-from-a-user
   */
  revokeOrgRoleUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the role. */
    role_id: number;
  }) => Promise<unknown>;

  /**
   * Get an organization role
   * @see https://docs.github.com/rest/orgs/organization-roles#get-an-organization-role
   */
  getOrgRole: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the role. */
    role_id: number;
  }) => Promise<OrganizationRole>;

  /**
   * List teams that are assigned to an organization role
   * @see https://docs.github.com/rest/orgs/organization-roles#list-teams-that-are-assigned-to-an-organization-role
   */
  listOrgRoleTeams: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the role. */
    role_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(TeamRoleAssignment)[]>;

  /**
   * List users that are assigned to an organization role
   * @see https://docs.github.com/rest/orgs/organization-roles#list-users-that-are-assigned-to-an-organization-role
   */
  listOrgRoleUsers: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the role. */
    role_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(UserRoleAssignment)[]>;

  /**
   * List outside collaborators for an organization
   * @see https://docs.github.com/rest/orgs/outside-collaborators#list-outside-collaborators-for-an-organization
   */
  listOutsideCollaborators: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Filter the list of outside collaborators. `2fa_disabled` means that only outside collaborators without [two-factor authentication](https://github.com/blog/1614-two-factor-authentication) enabled will be returned. `2fa_insecure` means that only outside collaborators with [insecure 2FA methods](https://docs.github.com/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization#requiring-secure-methods-of-two-factor-authentication-in-your-organization) will be returned. */
    filter?: "2fa_disabled" | "2fa_insecure" | "all";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Convert an organization member to outside collaborator
   * @see https://docs.github.com/rest/orgs/outside-collaborators#convert-an-organization-member-to-outside-collaborator
   */
  convertMemberToOutsideCollaborator: (input: {
    /** When set to `true`, the request will be performed asynchronously. Returns a 202 status code when the job is successfully queued. */
    async?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Remove outside collaborator from an organization
   * @see https://docs.github.com/rest/orgs/outside-collaborators#remove-outside-collaborator-from-an-organization
   */
  removeOutsideCollaborator: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<{ message?: string; documentation_url?: string }>;

  /**
   * List requests to access organization resources with fine-grained personal access tokens
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#list-requests-to-access-organization-resources-with-fine-grained-personal-access-tokens
   */
  listPatGrantRequests: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The property by which to sort the results. */
    sort?: "created_at";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** A list of owner usernames to use to filter the results. */
    owner?: (string)[];
    /** The name of the repository to use to filter the results. */
    repository?: string;
    /** The permission to use to filter the results. */
    permission?: string;
    /** Only show fine-grained personal access tokens used before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    last_used_before?: string;
    /** Only show fine-grained personal access tokens used after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    last_used_after?: string;
    /** The ID of the token */
    token_id?: (string)[];
  }) => Promise<(OrganizationProgrammaticAccessGrantRequest)[]>;

  /**
   * Review requests to access organization resources with fine-grained personal access tokens
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#review-requests-to-access-organization-resources-with-fine-grained-personal-access-tokens
   */
  reviewPatGrantRequestsInBulk: (input: {
    /** Unique identifiers of the requests for access via fine-grained personal access token. Must be formed of between 1 and 100 `pat_request_id` values. */
    pat_request_ids?: (number)[];
    /** Action to apply to the requests. */
    action: "approve" | "deny";
    /** Reason for approving or denying the requests. Max 1024 characters. */
    reason?: string | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Review a request to access organization resources with a fine-grained personal access token
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#review-a-request-to-access-organization-resources-with-a-fine-grained-personal-access-token
   */
  reviewPatGrantRequest: (input: {
    /** Action to apply to the request. */
    action: "approve" | "deny";
    /** Reason for approving or denying the request. Max 1024 characters. */
    reason?: string | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the request for access via fine-grained personal access token. */
    pat_request_id: number;
  }) => Promise<BasicError>;

  /**
   * List repositories requested to be accessed by a fine-grained personal access token
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#list-repositories-requested-to-be-accessed-by-a-fine-grained-personal-access-token
   */
  listPatGrantRequestRepositories: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the request for access via fine-grained personal access token. */
    pat_request_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * List fine-grained personal access tokens with access to organization resources
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#list-fine-grained-personal-access-tokens-with-access-to-organization-resources
   */
  listPatGrants: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The property by which to sort the results. */
    sort?: "created_at";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** A list of owner usernames to use to filter the results. */
    owner?: (string)[];
    /** The name of the repository to use to filter the results. */
    repository?: string;
    /** The permission to use to filter the results. */
    permission?: string;
    /** Only show fine-grained personal access tokens used before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    last_used_before?: string;
    /** Only show fine-grained personal access tokens used after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    last_used_after?: string;
    /** The ID of the token */
    token_id?: (string)[];
  }) => Promise<(OrganizationProgrammaticAccessGrant)[]>;

  /**
   * Update the access to organization resources via fine-grained personal access tokens
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#update-the-access-to-organization-resources-via-fine-grained-personal-access-tokens
   */
  updatePatAccesses: (input: {
    /** Action to apply to the fine-grained personal access token. */
    action: "revoke";
    /** The IDs of the fine-grained personal access tokens. */
    pat_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ [key: string]: unknown }>;

  /**
   * Update the access a fine-grained personal access token has to organization resources
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#update-the-access-a-fine-grained-personal-access-token-has-to-organization-resources
   */
  updatePatAccess: (input: {
    /** Action to apply to the fine-grained personal access token. */
    action: "revoke";
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the fine-grained personal access token. */
    pat_id: number;
  }) => Promise<BasicError>;

  /**
   * List repositories a fine-grained personal access token has access to
   * @see https://docs.github.com/rest/orgs/personal-access-tokens#list-repositories-a-fine-grained-personal-access-token-has-access-to
   */
  listPatGrantRepositories: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the fine-grained personal access token. */
    pat_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * Get all custom properties for an organization
   * @see https://docs.github.com/rest/orgs/custom-properties#get-all-custom-properties-for-an-organization
   */
  customPropertiesForReposGetOrganizationDefinitions: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(CustomProperty)[]>;

  /**
   * Create or update custom properties for an organization
   * @see https://docs.github.com/rest/orgs/custom-properties#create-or-update-custom-properties-for-an-organization
   */
  customPropertiesForReposCreateOrUpdateOrganizationDefinitions: (input: {
    /** The array of custom properties to create or update. */
    properties: (CustomProperty)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(CustomProperty)[]>;

  /**
   * Get a custom property for an organization
   * @see https://docs.github.com/rest/orgs/custom-properties#get-a-custom-property-for-an-organization
   */
  customPropertiesForReposGetOrganizationDefinition: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The custom property name */
    custom_property_name: string;
  }) => Promise<CustomProperty>;

  /**
   * Create or update a custom property for an organization
   * @see https://docs.github.com/rest/orgs/custom-properties#create-or-update-a-custom-property-for-an-organization
   */
  customPropertiesForReposCreateOrUpdateOrganizationDefinition: (input: {
    /** The type of the value for the property */
    value_type: "string" | "single_select" | "multi_select" | "true_false" | "url";
    /** Whether the property is required. */
    required?: boolean;
    /** Default value of the property */
    default_value?: string | (string)[] | null;
    /** Short description of the property */
    description?: string | null;
    /** An ordered list of the allowed values of the property. The property can have up to 200 allowed values. */
    allowed_values?: (string)[] | null;
    /** Who can edit the values of the property */
    values_editable_by?: "org_actors" | "org_and_repo_actors" | null;
    /** Whether setting properties values is mandatory */
    require_explicit_values?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The custom property name */
    custom_property_name: string;
  }) => Promise<CustomProperty>;

  /**
   * Remove a custom property for an organization
   * @see https://docs.github.com/rest/orgs/custom-properties#remove-a-custom-property-for-an-organization
   */
  customPropertiesForReposDeleteOrganizationDefinition: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The custom property name */
    custom_property_name: string;
  }) => Promise<BasicError>;

  /**
   * List custom property values for organization repositories
   * @see https://docs.github.com/rest/orgs/custom-properties#list-custom-property-values-for-organization-repositories
   */
  customPropertiesForReposGetOrganizationValues: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Finds repositories in the organization with a query containing one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching for repositories](https://docs.github.com/articles/searching-for-repositories/)" for a detailed list of qualifiers. */
    repository_query?: string;
  }) => Promise<(OrgRepoCustomPropertyValues)[]>;

  /**
   * Create or update custom property values for organization repositories
   * @see https://docs.github.com/rest/orgs/custom-properties#create-or-update-custom-property-values-for-organization-repositories
   */
  customPropertiesForReposCreateOrUpdateOrganizationValues: (input: {
    /** The names of repositories that the custom property values will be applied to. */
    repository_names: (string)[];
    /** List of custom property names and associated values to apply to the repositories. */
    properties: (CustomPropertyValue)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * List public organization members
   * @see https://docs.github.com/rest/orgs/members#list-public-organization-members
   */
  listPublicMembers: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check public organization membership for a user
   * @see https://docs.github.com/rest/orgs/members#check-public-organization-membership-for-a-user
   */
  checkPublicMembershipForUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Set public organization membership for the authenticated user
   * @see https://docs.github.com/rest/orgs/members#set-public-organization-membership-for-the-authenticated-user
   */
  setPublicMembershipForAuthenticatedUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Remove public organization membership for the authenticated user
   * @see https://docs.github.com/rest/orgs/members#remove-public-organization-membership-for-the-authenticated-user
   */
  removePublicMembershipForAuthenticatedUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Get organization ruleset history
   * @see https://docs.github.com/rest/orgs/rules#get-organization-ruleset-history
   */
  getOrgRulesetHistory: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(RulesetVersion)[]>;

  /**
   * Get organization ruleset version
   * @see https://docs.github.com/rest/orgs/rules#get-organization-ruleset-version
   */
  getOrgRulesetVersion: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the ruleset. */
    ruleset_id: number;
    /** The ID of the version */
    version_id: number;
  }) => Promise<RulesetVersionWithState>;

  /**
   * List security manager teams
   * @see https://docs.github.com/rest/orgs/security-managers#list-security-manager-teams
   */
  listSecurityManagerTeams: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(TeamSimple)[]>;

  /**
   * Add a security manager team
   * @see https://docs.github.com/rest/orgs/security-managers#add-a-security-manager-team
   */
  addSecurityManagerTeam: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<unknown>;

  /**
   * Remove a security manager team
   * @see https://docs.github.com/rest/orgs/security-managers#remove-a-security-manager-team
   */
  removeSecurityManagerTeam: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<unknown>;

  /**
   * Get immutable releases settings for an organization
   * @see https://docs.github.com/rest/orgs/orgs#get-immutable-releases-settings-for-an-organization
   */
  getImmutableReleasesSettings: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ImmutableReleasesOrganizationSettings>;

  /**
   * Set immutable releases settings for an organization
   * @see https://docs.github.com/rest/orgs/orgs#set-immutable-releases-settings-for-an-organization
   */
  setImmutableReleasesSettings: (input: {
    /** The policy that controls how immutable releases are enforced in the organization. */
    enforced_repositories: "all" | "none" | "selected";
    /** An array of repository ids for which immutable releases enforcement should be applied. You can only provide a list of repository ids when the `enforced_repositories` is set to `selected`. You can add and remove individual repositories using the [Enable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#enable-a-selected-repository-for-immutable-releases-in-an-organization) and [Disable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#disable-a-selected-repository-for-immutable-releases-in-an-organization) endpoints. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for immutable releases enforcement
   * @see https://docs.github.com/rest/orgs/orgs#list-selected-repositories-for-immutable-releases-enforcement
   */
  getImmutableReleasesSettingsRepositories: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<{ total_count: number; repositories: (MinimalRepository)[] }>;

  /**
   * Set selected repositories for immutable releases enforcement
   * @see https://docs.github.com/rest/orgs/orgs#set-selected-repositories-for-immutable-releases-enforcement
   */
  setImmutableReleasesSettingsRepositories: (input: {
    /** An array of repository ids for which immutable releases enforcement should be applied. You can only provide a list of repository ids when the `enforced_repositories` is set to `selected`. You can add and remove individual repositories using the [Enable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#enable-a-selected-repository-for-immutable-releases-in-an-organization) and [Disable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#disable-a-selected-repository-for-immutable-releases-in-an-organization) endpoints. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * Enable a selected repository for immutable releases in an organization
   * @see https://docs.github.com/rest/orgs/orgs#enable-a-selected-repository-for-immutable-releases-in-an-organization
   */
  enableSelectedRepositoryImmutableReleasesOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Disable a selected repository for immutable releases in an organization
   * @see https://docs.github.com/rest/orgs/orgs#disable-a-selected-repository-for-immutable-releases-in-an-organization
   */
  disableSelectedRepositoryImmutableReleasesOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Enable or disable a security feature for an organization
   * @see https://docs.github.com/rest/orgs/orgs#enable-or-disable-a-security-feature-for-an-organization
   */
  enableOrDisableSecurityProductOnAllOrgRepos: (input: {
    /** CodeQL query suite to be used. If you specify the `query_suite` parameter, the default setup will be configured with this query suite only on all repositories that didn't have default setup already configured. It will not change the query suite on repositories that already have default setup configured. If you don't specify any `query_suite` in your request, the preferred query suite of the organization will be applied. */
    query_suite?: "default" | "extended";
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The security feature to enable or disable. */
    security_product: "dependency_graph" | "dependabot_alerts" | "dependabot_security_updates" | "advanced_security" | "code_scanning_default_setup" | "secret_scanning" | "secret_scanning_push_protection";
    /** The action to take.  `enable_all` means to enable the specified security feature for all repositories in the organization. `disable_all` means to disable the specified security feature for all repositories in the organization. */
    enablement: "enable_all" | "disable_all";
  }) => Promise<unknown>;

  /**
   * List organization memberships for the authenticated user
   * @see https://docs.github.com/rest/orgs/members#list-organization-memberships-for-the-authenticated-user
   */
  listMembershipsForAuthenticatedUser: (input: {
    /** Indicates the state of the memberships to return. If not specified, the API returns both active and pending memberships. */
    state?: "active" | "pending";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrgMembership)[]>;

  /**
   * Get an organization membership for the authenticated user
   * @see https://docs.github.com/rest/orgs/members#get-an-organization-membership-for-the-authenticated-user
   */
  getMembershipForAuthenticatedUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrgMembership>;

  /**
   * Update an organization membership for the authenticated user
   * @see https://docs.github.com/rest/orgs/members#update-an-organization-membership-for-the-authenticated-user
   */
  updateMembershipForAuthenticatedUser: (input: {
    /** The state that the membership should be in. Only `"active"` will be accepted. */
    state: "active";
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrgMembership>;

  /**
   * List organizations for the authenticated user
   * @see https://docs.github.com/rest/orgs/orgs#list-organizations-for-the-authenticated-user
   */
  listForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrganizationSimple)[]>;

  /**
   * List organizations for a user
   * @see https://docs.github.com/rest/orgs/orgs#list-organizations-for-a-user
   */
  listForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrganizationSimple)[]>;
};
