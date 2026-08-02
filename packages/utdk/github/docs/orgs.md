# Orgs

108 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.orgs.list`

List organizations — [API reference](https://docs.github.com/rest/orgs/orgs#list-organizations)

```ts
github.orgs.list(input: {
  /** An organization ID. Only return organizations with an ID greater than this ID. */
  since?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(OrganizationSimple)[]>
```

<sub>`GET /organizations` · `orgs/list`</sub>

## `github.orgs.delete`

Delete an organization — [API reference](https://docs.github.com/rest/orgs/orgs#delete-an-organization)

```ts
github.orgs.delete(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`DELETE /orgs/{org}` · `orgs/delete`</sub>

## `github.orgs.get`

Get an organization — [API reference](https://docs.github.com/rest/orgs/orgs#get-an-organization)

```ts
github.orgs.get(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OrganizationFull>
```

<sub>`GET /orgs/{org}` · `orgs/get`</sub>

## `github.orgs.update`

Update an organization — [API reference](https://docs.github.com/rest/orgs/orgs#update-an-organization)

```ts
github.orgs.update(input: {
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
}): Promise<OrganizationFull>
```

<sub>`PATCH /orgs/{org}` · `orgs/update`</sub>

## `github.orgs.enableOrDisableSecurityProductOnAllOrgRepos`

Enable or disable a security feature for an organization — [API reference](https://docs.github.com/rest/orgs/orgs#enable-or-disable-a-security-feature-for-an-organization)

```ts
github.orgs.enableOrDisableSecurityProductOnAllOrgRepos(input: {
  /** CodeQL query suite to be used. If you specify the `query_suite` parameter, the default setup will be configured with this query suite only on all repositories that didn't have default setup already configured. It will not change the query suite on repositories that already have default setup configured. If you don't specify any `query_suite` in your request, the preferred query suite of the organization will be applied. */
  query_suite?: "default" | "extended";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The security feature to enable or disable. */
  security_product: "dependency_graph" | "dependabot_alerts" | "dependabot_security_updates" | "advanced_security" | "code_scanning_default_setup" | "secret_scanning" | "secret_scanning_push_protection";
  /** The action to take.  `enable_all` means to enable the specified security feature for all repositories in the organization. `disable_all` means to disable the specified security feature for all repositories in the organization. */
  enablement: "enable_all" | "disable_all";
}): Promise<unknown>
```

<sub>`POST /orgs/{org}/{security_product}/{enablement}` · `orgs/enable-or-disable-security-product-on-all-org-repos`</sub>

## `github.orgs.listArtifactDeploymentRecords`

List artifact deployment records — [API reference](https://docs.github.com/rest/orgs/artifact-metadata#list-artifact-deployment-records)

```ts
github.orgs.listArtifactDeploymentRecords(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The SHA256 digest of the artifact, in the form `sha256:HEX_DIGEST`. */
  subject_digest: string;
}): Promise<{ total_count?: number; deployment_records?: (ArtifactDeploymentRecord)[] }>
```

<sub>`GET /orgs/{org}/artifacts/{subject_digest}/metadata/deployment-records` · `orgs/list-artifact-deployment-records`</sub>

## `github.orgs.listArtifactStorageRecords`

List artifact storage records — [API reference](https://docs.github.com/rest/orgs/artifact-metadata#list-artifact-storage-records)

```ts
github.orgs.listArtifactStorageRecords(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The parameter should be set to the attestation's subject's SHA256 digest, in the form `sha256:HEX_DIGEST`. */
  subject_digest: string;
}): Promise<{ total_count?: number; storage_records?: ({ id?: number; name?: string; digest?: string; artifact_url?: string; registry_url?: string; repository?: string; status?: string; created_at?: string; updated_at?: string })[] }>
```

<sub>`GET /orgs/{org}/artifacts/{subject_digest}/metadata/storage-records` · `orgs/list-artifact-storage-records`</sub>

## `github.orgs.createArtifactDeploymentRecord`

Create an artifact deployment record — [API reference](https://docs.github.com/rest/orgs/artifact-metadata#create-an-artifact-deployment-record)

```ts
github.orgs.createArtifactDeploymentRecord(input: {
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
}): Promise<{ total_count: number; deployment_records?: (ArtifactDeploymentRecord)[] }>
```

<sub>`POST /orgs/{org}/artifacts/metadata/deployment-record` · `orgs/create-artifact-deployment-record`</sub>

## `github.orgs.setClusterDeploymentRecords`

Set cluster deployment records — [API reference](https://docs.github.com/rest/orgs/artifact-metadata#set-cluster-deployment-records)

```ts
github.orgs.setClusterDeploymentRecords(input: {
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
}): Promise<{ total_count: number; deployment_records?: (ArtifactDeploymentRecord)[] }>
```

<sub>`POST /orgs/{org}/artifacts/metadata/deployment-record/cluster/{cluster}` · `orgs/set-cluster-deployment-records`</sub>

## `github.orgs.createArtifactStorageRecord`

Create artifact metadata storage record — [API reference](https://docs.github.com/rest/orgs/artifact-metadata#create-artifact-metadata-storage-record)

```ts
github.orgs.createArtifactStorageRecord(input: {
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
}): Promise<{ total_count: number; storage_records?: ({ id?: number; name?: string; digest?: string; artifact_url?: string | null; registry_url?: string; repository?: string | null; status?: string; created_at?: string; updated_at?: string })[] }>
```

<sub>`POST /orgs/{org}/artifacts/metadata/storage-record` · `orgs/create-artifact-storage-record`</sub>

## `github.orgs.deleteAttestationsById`

Delete attestations by ID — [API reference](https://docs.github.com/rest/orgs/attestations#delete-attestations-by-id)

```ts
github.orgs.deleteAttestationsById(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Attestation ID */
  attestation_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/attestations/{attestation_id}` · `orgs/delete-attestations-by-id`</sub>

## `github.orgs.listAttestations`

List attestations — [API reference](https://docs.github.com/rest/orgs/attestations#list-attestations)

```ts
github.orgs.listAttestations(input: {
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
}): Promise<{ attestations?: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } } | null; repository_id?: number; bundle_url?: string; initiator?: string })[] }>
```

<sub>`GET /orgs/{org}/attestations/{subject_digest}` · `orgs/list-attestations`</sub>

## `github.orgs.listAttestationsBulk`

List attestations by bulk subject digests — [API reference](https://docs.github.com/rest/orgs/attestations#list-attestations-by-bulk-subject-digests)

```ts
github.orgs.listAttestationsBulk(input: {
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
}): Promise<{ attestations_subject_digests?: { [key: string]: ({ bundle?: { mediaType?: string; verificationMaterial?: { [key: string]: unknown }; dsseEnvelope?: { [key: string]: unknown } }; repository_id?: number; bundle_url?: string })[] | null | undefined }; page_info?: { has_next?: boolean; has_previous?: boolean; next?: string; previous?: string } }>
```

<sub>`POST /orgs/{org}/attestations/bulk-list` · `orgs/list-attestations-bulk`</sub>

## `github.orgs.deleteAttestationsBulk`

Delete attestations in bulk — [API reference](https://docs.github.com/rest/orgs/attestations#delete-attestations-in-bulk)

```ts
github.orgs.deleteAttestationsBulk(input: {
  /** The request body must include either `subject_digests` or `attestation_ids`, but not both. */
  body: { subject_digests: (string)[] } | { attestation_ids: (number)[] };
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/attestations/delete-request` · `orgs/delete-attestations-bulk`</sub>

## `github.orgs.deleteAttestationsBySubjectDigest`

Delete attestations by subject digest — [API reference](https://docs.github.com/rest/orgs/attestations#delete-attestations-by-subject-digest)

```ts
github.orgs.deleteAttestationsBySubjectDigest(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Subject Digest */
  subject_digest: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/attestations/digest/{subject_digest}` · `orgs/delete-attestations-by-subject-digest`</sub>

## `github.orgs.listAttestationRepositories`

List attestation repositories — [API reference](https://docs.github.com/rest/orgs/attestations#list-attestation-repositories)

```ts
github.orgs.listAttestationRepositories(input: {
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
}): Promise<({ id?: number; name?: string })[]>
```

<sub>`GET /orgs/{org}/attestations/repositories` · `orgs/list-attestation-repositories`</sub>

## `github.orgs.listBlockedUsers`

List users blocked by an organization — [API reference](https://docs.github.com/rest/orgs/blocking#list-users-blocked-by-an-organization)

```ts
github.orgs.listBlockedUsers(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /orgs/{org}/blocks` · `orgs/list-blocked-users`</sub>

## `github.orgs.unblockUser`

Unblock a user from an organization — [API reference](https://docs.github.com/rest/orgs/blocking#unblock-a-user-from-an-organization)

```ts
github.orgs.unblockUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/blocks/{username}` · `orgs/unblock-user`</sub>

## `github.orgs.checkBlockedUser`

Check if a user is blocked by an organization — [API reference](https://docs.github.com/rest/orgs/blocking#check-if-a-user-is-blocked-by-an-organization)

```ts
github.orgs.checkBlockedUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`GET /orgs/{org}/blocks/{username}` · `orgs/check-blocked-user`</sub>

## `github.orgs.blockUser`

Block a user from an organization — [API reference](https://docs.github.com/rest/orgs/blocking#block-a-user-from-an-organization)

```ts
github.orgs.blockUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<ValidationError>
```

<sub>`PUT /orgs/{org}/blocks/{username}` · `orgs/block-user`</sub>

## `github.orgs.listFailedInvitations`

List failed organization invitations — [API reference](https://docs.github.com/rest/orgs/members#list-failed-organization-invitations)

```ts
github.orgs.listFailedInvitations(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrganizationInvitation)[]>
```

<sub>`GET /orgs/{org}/failed_invitations` · `orgs/list-failed-invitations`</sub>

## `github.orgs.listWebhooks`

List organization webhooks — [API reference](https://docs.github.com/rest/orgs/webhooks#list-organization-webhooks)

```ts
github.orgs.listWebhooks(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrgHook)[]>
```

<sub>`GET /orgs/{org}/hooks` · `orgs/list-webhooks`</sub>

## `github.orgs.createWebhook`

Create an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#create-an-organization-webhook)

```ts
github.orgs.createWebhook(input: {
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
}): Promise<OrgHook>
```

<sub>`POST /orgs/{org}/hooks` · `orgs/create-webhook`</sub>

## `github.orgs.deleteWebhook`

Delete an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#delete-an-organization-webhook)

```ts
github.orgs.deleteWebhook(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/hooks/{hook_id}` · `orgs/delete-webhook`</sub>

## `github.orgs.getWebhook`

Get an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#get-an-organization-webhook)

```ts
github.orgs.getWebhook(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
}): Promise<OrgHook>
```

<sub>`GET /orgs/{org}/hooks/{hook_id}` · `orgs/get-webhook`</sub>

## `github.orgs.updateWebhook`

Update an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#update-an-organization-webhook)

```ts
github.orgs.updateWebhook(input: {
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
}): Promise<OrgHook>
```

<sub>`PATCH /orgs/{org}/hooks/{hook_id}` · `orgs/update-webhook`</sub>

## `github.orgs.getWebhookConfigForOrg`

Get a webhook configuration for an organization — [API reference](https://docs.github.com/rest/orgs/webhooks#get-a-webhook-configuration-for-an-organization)

```ts
github.orgs.getWebhookConfigForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
}): Promise<WebhookConfig>
```

<sub>`GET /orgs/{org}/hooks/{hook_id}/config` · `orgs/get-webhook-config-for-org`</sub>

## `github.orgs.updateWebhookConfigForOrg`

Update a webhook configuration for an organization — [API reference](https://docs.github.com/rest/orgs/webhooks#update-a-webhook-configuration-for-an-organization)

```ts
github.orgs.updateWebhookConfigForOrg(input: {
  url?: WebhookConfigUrl;
  content_type?: WebhookConfigContentType;
  secret?: WebhookConfigSecret;
  insecure_ssl?: WebhookConfigInsecureSsl;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
}): Promise<WebhookConfig>
```

<sub>`PATCH /orgs/{org}/hooks/{hook_id}/config` · `orgs/update-webhook-config-for-org`</sub>

## `github.orgs.listWebhookDeliveries`

List deliveries for an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#list-deliveries-for-an-organization-webhook)

```ts
github.orgs.listWebhookDeliveries(input: {
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
}): Promise<(HookDeliveryItem)[]>
```

<sub>`GET /orgs/{org}/hooks/{hook_id}/deliveries` · `orgs/list-webhook-deliveries`</sub>

## `github.orgs.getWebhookDelivery`

Get a webhook delivery for an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#get-a-webhook-delivery-for-an-organization-webhook)

```ts
github.orgs.getWebhookDelivery(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
  delivery_id: number;
}): Promise<HookDelivery>
```

<sub>`GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}` · `orgs/get-webhook-delivery`</sub>

## `github.orgs.redeliverWebhookDelivery`

Redeliver a delivery for an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#redeliver-a-delivery-for-an-organization-webhook)

```ts
github.orgs.redeliverWebhookDelivery(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
  delivery_id: number;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts` · `orgs/redeliver-webhook-delivery`</sub>

## `github.orgs.pingWebhook`

Ping an organization webhook — [API reference](https://docs.github.com/rest/orgs/webhooks#ping-an-organization-webhook)

```ts
github.orgs.pingWebhook(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery. */
  hook_id: number;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/hooks/{hook_id}/pings` · `orgs/ping-webhook`</sub>

## `github.apiInsights.getRouteStatsByActor`

Get route stats by actor — [API reference](https://docs.github.com/rest/orgs/api-insights#get-route-stats-by-actor)

```ts
github.apiInsights.getRouteStatsByActor(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The type of the actor */
  actor_type: "installation" | "classic_pat" | "fine_grained_pat" | "oauth_app" | "github_app_user_to_server";
  /** The ID of the actor */
  actor_id: number;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The property to sort the results by. */
  sort?: ("last_rate_limited_timestamp" | "last_request_timestamp" | "rate_limited_request_count" | "http_method" | "api_route" | "total_request_count")[];
  /** Providing a substring will filter results where the API route contains the substring. This is a case-insensitive search. */
  api_route_substring?: string;
}): Promise<ApiInsightsRouteStats>
```

<sub>`GET /orgs/{org}/insights/api/route-stats/{actor_type}/{actor_id}` · `api-insights/get-route-stats-by-actor`</sub>

## `github.apiInsights.getSubjectStats`

Get subject stats — [API reference](https://docs.github.com/rest/orgs/api-insights#get-subject-stats)

```ts
github.apiInsights.getSubjectStats(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The property to sort the results by. */
  sort?: ("last_rate_limited_timestamp" | "last_request_timestamp" | "rate_limited_request_count" | "subject_name" | "total_request_count")[];
  /** Providing a substring will filter results where the subject name contains the substring. This is a case-insensitive search. */
  subject_name_substring?: string;
}): Promise<ApiInsightsSubjectStats>
```

<sub>`GET /orgs/{org}/insights/api/subject-stats` · `api-insights/get-subject-stats`</sub>

## `github.apiInsights.getSummaryStats`

Get summary stats — [API reference](https://docs.github.com/rest/orgs/api-insights#get-summary-stats)

```ts
github.apiInsights.getSummaryStats(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
}): Promise<ApiInsightsSummaryStats>
```

<sub>`GET /orgs/{org}/insights/api/summary-stats` · `api-insights/get-summary-stats`</sub>

## `github.apiInsights.getSummaryStatsByActor`

Get summary stats by actor — [API reference](https://docs.github.com/rest/orgs/api-insights#get-summary-stats-by-actor)

```ts
github.apiInsights.getSummaryStatsByActor(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The type of the actor */
  actor_type: "installation" | "classic_pat" | "fine_grained_pat" | "oauth_app" | "github_app_user_to_server";
  /** The ID of the actor */
  actor_id: number;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
}): Promise<ApiInsightsSummaryStats>
```

<sub>`GET /orgs/{org}/insights/api/summary-stats/{actor_type}/{actor_id}` · `api-insights/get-summary-stats-by-actor`</sub>

## `github.apiInsights.getSummaryStatsByUser`

Get summary stats by user — [API reference](https://docs.github.com/rest/orgs/api-insights#get-summary-stats-by-user)

```ts
github.apiInsights.getSummaryStatsByUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID of the user to query for stats */
  user_id: string;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
}): Promise<ApiInsightsSummaryStats>
```

<sub>`GET /orgs/{org}/insights/api/summary-stats/users/{user_id}` · `api-insights/get-summary-stats-by-user`</sub>

## `github.apiInsights.getTimeStats`

Get time stats — [API reference](https://docs.github.com/rest/orgs/api-insights#get-time-stats)

```ts
github.apiInsights.getTimeStats(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
  /** The increment of time used to breakdown the query results (5m, 10m, 1h, etc.) */
  timestamp_increment: string;
}): Promise<ApiInsightsTimeStats>
```

<sub>`GET /orgs/{org}/insights/api/time-stats` · `api-insights/get-time-stats`</sub>

## `github.apiInsights.getTimeStatsByActor`

Get time stats by actor — [API reference](https://docs.github.com/rest/orgs/api-insights#get-time-stats-by-actor)

```ts
github.apiInsights.getTimeStatsByActor(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The type of the actor */
  actor_type: "installation" | "classic_pat" | "fine_grained_pat" | "oauth_app" | "github_app_user_to_server";
  /** The ID of the actor */
  actor_id: number;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
  /** The increment of time used to breakdown the query results (5m, 10m, 1h, etc.) */
  timestamp_increment: string;
}): Promise<ApiInsightsTimeStats>
```

<sub>`GET /orgs/{org}/insights/api/time-stats/{actor_type}/{actor_id}` · `api-insights/get-time-stats-by-actor`</sub>

## `github.apiInsights.getTimeStatsByUser`

Get time stats by user — [API reference](https://docs.github.com/rest/orgs/api-insights#get-time-stats-by-user)

```ts
github.apiInsights.getTimeStatsByUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID of the user to query for stats */
  user_id: string;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
  /** The increment of time used to breakdown the query results (5m, 10m, 1h, etc.) */
  timestamp_increment: string;
}): Promise<ApiInsightsTimeStats>
```

<sub>`GET /orgs/{org}/insights/api/time-stats/users/{user_id}` · `api-insights/get-time-stats-by-user`</sub>

## `github.apiInsights.getUserStats`

Get user stats — [API reference](https://docs.github.com/rest/orgs/api-insights#get-user-stats)

```ts
github.apiInsights.getUserStats(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID of the user to query for stats */
  user_id: string;
  /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  min_timestamp: string;
  /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  max_timestamp?: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The property to sort the results by. */
  sort?: ("last_rate_limited_timestamp" | "last_request_timestamp" | "rate_limited_request_count" | "subject_name" | "total_request_count")[];
  /** Providing a substring will filter results where the actor name contains the substring. This is a case-insensitive search. */
  actor_name_substring?: string;
}): Promise<ApiInsightsUserStats>
```

<sub>`GET /orgs/{org}/insights/api/user-stats/{user_id}` · `api-insights/get-user-stats`</sub>

## `github.orgs.listAppInstallations`

List app installations for an organization — [API reference](https://docs.github.com/rest/orgs/orgs#list-app-installations-for-an-organization)

```ts
github.orgs.listAppInstallations(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; installations: (Installation)[] }>
```

<sub>`GET /orgs/{org}/installations` · `orgs/list-app-installations`</sub>

## `github.orgs.listPendingInvitations`

List pending organization invitations — [API reference](https://docs.github.com/rest/orgs/members#list-pending-organization-invitations)

```ts
github.orgs.listPendingInvitations(input: {
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
}): Promise<(OrganizationInvitation)[]>
```

<sub>`GET /orgs/{org}/invitations` · `orgs/list-pending-invitations`</sub>

## `github.orgs.createInvitation`

Create an organization invitation — [API reference](https://docs.github.com/rest/orgs/members#create-an-organization-invitation)

```ts
github.orgs.createInvitation(input: {
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
}): Promise<OrganizationInvitation>
```

<sub>`POST /orgs/{org}/invitations` · `orgs/create-invitation`</sub>

## `github.orgs.cancelInvitation`

Cancel an organization invitation — [API reference](https://docs.github.com/rest/orgs/members#cancel-an-organization-invitation)

```ts
github.orgs.cancelInvitation(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the invitation. */
  invitation_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/invitations/{invitation_id}` · `orgs/cancel-invitation`</sub>

## `github.orgs.listInvitationTeams`

List organization invitation teams — [API reference](https://docs.github.com/rest/orgs/members#list-organization-invitation-teams)

```ts
github.orgs.listInvitationTeams(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the invitation. */
  invitation_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Team)[]>
```

<sub>`GET /orgs/{org}/invitations/{invitation_id}/teams` · `orgs/list-invitation-teams`</sub>

## `github.orgs.listIssueFields`

List issue fields for an organization — [API reference](https://docs.github.com/rest/orgs/issue-fields#list-issue-fields-for-an-organization)

```ts
github.orgs.listIssueFields(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(IssueField)[]>
```

<sub>`GET /orgs/{org}/issue-fields` · `orgs/list-issue-fields`</sub>

## `github.orgs.createIssueField`

Create issue field for an organization — [API reference](https://docs.github.com/rest/orgs/issue-fields#create-issue-field-for-an-organization)

```ts
github.orgs.createIssueField(input: {
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
}): Promise<IssueField>
```

<sub>`POST /orgs/{org}/issue-fields` · `orgs/create-issue-field`</sub>

## `github.orgs.deleteIssueField`

Delete issue field for an organization — [API reference](https://docs.github.com/rest/orgs/issue-fields#delete-issue-field-for-an-organization)

```ts
github.orgs.deleteIssueField(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the issue field. */
  issue_field_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/issue-fields/{issue_field_id}` · `orgs/delete-issue-field`</sub>

## `github.orgs.updateIssueField`

Update issue field for an organization — [API reference](https://docs.github.com/rest/orgs/issue-fields#update-issue-field-for-an-organization)

```ts
github.orgs.updateIssueField(input: {
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
}): Promise<IssueField>
```

<sub>`PATCH /orgs/{org}/issue-fields/{issue_field_id}` · `orgs/update-issue-field`</sub>

## `github.orgs.listIssueTypes`

List issue types for an organization — [API reference](https://docs.github.com/rest/orgs/issue-types#list-issue-types-for-an-organization)

```ts
github.orgs.listIssueTypes(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(IssueType)[]>
```

<sub>`GET /orgs/{org}/issue-types` · `orgs/list-issue-types`</sub>

## `github.orgs.createIssueType`

Create issue type for an organization — [API reference](https://docs.github.com/rest/orgs/issue-types#create-issue-type-for-an-organization)

```ts
github.orgs.createIssueType(input: {
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
}): Promise<IssueType>
```

<sub>`POST /orgs/{org}/issue-types` · `orgs/create-issue-type`</sub>

## `github.orgs.deleteIssueType`

Delete issue type for an organization — [API reference](https://docs.github.com/rest/orgs/issue-types#delete-issue-type-for-an-organization)

```ts
github.orgs.deleteIssueType(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the issue type. */
  issue_type_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/issue-types/{issue_type_id}` · `orgs/delete-issue-type`</sub>

## `github.orgs.updateIssueType`

Update issue type for an organization — [API reference](https://docs.github.com/rest/orgs/issue-types#update-issue-type-for-an-organization)

```ts
github.orgs.updateIssueType(input: {
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
}): Promise<IssueType>
```

<sub>`PUT /orgs/{org}/issue-types/{issue_type_id}` · `orgs/update-issue-type`</sub>

## `github.orgs.listMembers`

List organization members — [API reference](https://docs.github.com/rest/orgs/members#list-organization-members)

```ts
github.orgs.listMembers(input: {
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
}): Promise<(SimpleUser)[]>
```

<sub>`GET /orgs/{org}/members` · `orgs/list-members`</sub>

## `github.orgs.removeMember`

Remove an organization member — [API reference](https://docs.github.com/rest/orgs/members#remove-an-organization-member)

```ts
github.orgs.removeMember(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/members/{username}` · `orgs/remove-member`</sub>

## `github.orgs.checkMembershipForUser`

Check organization membership for a user — [API reference](https://docs.github.com/rest/orgs/members#check-organization-membership-for-a-user)

```ts
github.orgs.checkMembershipForUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`GET /orgs/{org}/members/{username}` · `orgs/check-membership-for-user`</sub>

## `github.orgs.removeMembershipForUser`

Remove organization membership for a user — [API reference](https://docs.github.com/rest/orgs/members#remove-organization-membership-for-a-user)

```ts
github.orgs.removeMembershipForUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/memberships/{username}` · `orgs/remove-membership-for-user`</sub>

## `github.orgs.getMembershipForUser`

Get organization membership for a user — [API reference](https://docs.github.com/rest/orgs/members#get-organization-membership-for-a-user)

```ts
github.orgs.getMembershipForUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<OrgMembership>
```

<sub>`GET /orgs/{org}/memberships/{username}` · `orgs/get-membership-for-user`</sub>

## `github.orgs.setMembershipForUser`

Set organization membership for a user — [API reference](https://docs.github.com/rest/orgs/members#set-organization-membership-for-a-user)

```ts
github.orgs.setMembershipForUser(input: {
  /** The role to give the user in the organization. Can be one of:    * `admin` - The user will become an owner of the organization.    * `member` - The user will become a non-owner member of the organization. */
  role?: "admin" | "member";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<OrgMembership>
```

<sub>`PUT /orgs/{org}/memberships/{username}` · `orgs/set-membership-for-user`</sub>

## `github.orgs.listOrgRoles`

Get all organization roles for an organization — [API reference](https://docs.github.com/rest/orgs/organization-roles#get-all-organization-roles-for-an-organization)

```ts
github.orgs.listOrgRoles(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count?: number; roles?: (OrganizationRole)[] }>
```

<sub>`GET /orgs/{org}/organization-roles` · `orgs/list-org-roles`</sub>

## `github.orgs.getOrgRole`

Get an organization role — [API reference](https://docs.github.com/rest/orgs/organization-roles#get-an-organization-role)

```ts
github.orgs.getOrgRole(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the role. */
  role_id: number;
}): Promise<OrganizationRole>
```

<sub>`GET /orgs/{org}/organization-roles/{role_id}` · `orgs/get-org-role`</sub>

## `github.orgs.listOrgRoleTeams`

List teams that are assigned to an organization role — [API reference](https://docs.github.com/rest/orgs/organization-roles#list-teams-that-are-assigned-to-an-organization-role)

```ts
github.orgs.listOrgRoleTeams(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the role. */
  role_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(TeamRoleAssignment)[]>
```

<sub>`GET /orgs/{org}/organization-roles/{role_id}/teams` · `orgs/list-org-role-teams`</sub>

## `github.orgs.listOrgRoleUsers`

List users that are assigned to an organization role — [API reference](https://docs.github.com/rest/orgs/organization-roles#list-users-that-are-assigned-to-an-organization-role)

```ts
github.orgs.listOrgRoleUsers(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the role. */
  role_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(UserRoleAssignment)[]>
```

<sub>`GET /orgs/{org}/organization-roles/{role_id}/users` · `orgs/list-org-role-users`</sub>

## `github.orgs.revokeAllOrgRolesTeam`

Remove all organization roles for a team — [API reference](https://docs.github.com/rest/orgs/organization-roles#remove-all-organization-roles-for-a-team)

```ts
github.orgs.revokeAllOrgRolesTeam(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/organization-roles/teams/{team_slug}` · `orgs/revoke-all-org-roles-team`</sub>

## `github.orgs.revokeOrgRoleTeam`

Remove an organization role from a team — [API reference](https://docs.github.com/rest/orgs/organization-roles#remove-an-organization-role-from-a-team)

```ts
github.orgs.revokeOrgRoleTeam(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The unique identifier of the role. */
  role_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}` · `orgs/revoke-org-role-team`</sub>

## `github.orgs.assignTeamToOrgRole`

Assign an organization role to a team — [API reference](https://docs.github.com/rest/orgs/organization-roles#assign-an-organization-role-to-a-team)

```ts
github.orgs.assignTeamToOrgRole(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The unique identifier of the role. */
  role_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/organization-roles/teams/{team_slug}/{role_id}` · `orgs/assign-team-to-org-role`</sub>

## `github.orgs.revokeAllOrgRolesUser`

Remove all organization roles for a user — [API reference](https://docs.github.com/rest/orgs/organization-roles#remove-all-organization-roles-for-a-user)

```ts
github.orgs.revokeAllOrgRolesUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/organization-roles/users/{username}` · `orgs/revoke-all-org-roles-user`</sub>

## `github.orgs.revokeOrgRoleUser`

Remove an organization role from a user — [API reference](https://docs.github.com/rest/orgs/organization-roles#remove-an-organization-role-from-a-user)

```ts
github.orgs.revokeOrgRoleUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the role. */
  role_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/organization-roles/users/{username}/{role_id}` · `orgs/revoke-org-role-user`</sub>

## `github.orgs.assignUserToOrgRole`

Assign an organization role to a user — [API reference](https://docs.github.com/rest/orgs/organization-roles#assign-an-organization-role-to-a-user)

```ts
github.orgs.assignUserToOrgRole(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the role. */
  role_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/organization-roles/users/{username}/{role_id}` · `orgs/assign-user-to-org-role`</sub>

## `github.orgs.listOutsideCollaborators`

List outside collaborators for an organization — [API reference](https://docs.github.com/rest/orgs/outside-collaborators#list-outside-collaborators-for-an-organization)

```ts
github.orgs.listOutsideCollaborators(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Filter the list of outside collaborators. `2fa_disabled` means that only outside collaborators without [two-factor authentication](https://github.com/blog/1614-two-factor-authentication) enabled will be returned. `2fa_insecure` means that only outside collaborators with [insecure 2FA methods](https://docs.github.com/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/requiring-two-factor-authentication-in-your-organization#requiring-secure-methods-of-two-factor-authentication-in-your-organization) will be returned. */
  filter?: "2fa_disabled" | "2fa_insecure" | "all";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /orgs/{org}/outside_collaborators` · `orgs/list-outside-collaborators`</sub>

## `github.orgs.removeOutsideCollaborator`

Remove outside collaborator from an organization — [API reference](https://docs.github.com/rest/orgs/outside-collaborators#remove-outside-collaborator-from-an-organization)

```ts
github.orgs.removeOutsideCollaborator(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<{ message?: string; documentation_url?: string }>
```

<sub>`DELETE /orgs/{org}/outside_collaborators/{username}` · `orgs/remove-outside-collaborator`</sub>

## `github.orgs.convertMemberToOutsideCollaborator`

Convert an organization member to outside collaborator — [API reference](https://docs.github.com/rest/orgs/outside-collaborators#convert-an-organization-member-to-outside-collaborator)

```ts
github.orgs.convertMemberToOutsideCollaborator(input: {
  /** When set to `true`, the request will be performed asynchronously. Returns a 202 status code when the job is successfully queued. */
  async?: boolean;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`PUT /orgs/{org}/outside_collaborators/{username}` · `orgs/convert-member-to-outside-collaborator`</sub>

## `github.orgs.listPatGrantRequests`

List requests to access organization resources with fine-grained personal access tokens — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#list-requests-to-access-organization-resources-with-fine-grained-personal-access-tokens)

```ts
github.orgs.listPatGrantRequests(input: {
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
}): Promise<(OrganizationProgrammaticAccessGrantRequest)[]>
```

<sub>`GET /orgs/{org}/personal-access-token-requests` · `orgs/list-pat-grant-requests`</sub>

## `github.orgs.reviewPatGrantRequestsInBulk`

Review requests to access organization resources with fine-grained personal access tokens — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#review-requests-to-access-organization-resources-with-fine-grained-personal-access-tokens)

```ts
github.orgs.reviewPatGrantRequestsInBulk(input: {
  /** Unique identifiers of the requests for access via fine-grained personal access token. Must be formed of between 1 and 100 `pat_request_id` values. */
  pat_request_ids?: (number)[];
  /** Action to apply to the requests. */
  action: "approve" | "deny";
  /** Reason for approving or denying the requests. Max 1024 characters. */
  reason?: string | null;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /orgs/{org}/personal-access-token-requests` · `orgs/review-pat-grant-requests-in-bulk`</sub>

## `github.orgs.reviewPatGrantRequest`

Review a request to access organization resources with a fine-grained personal access token — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#review-a-request-to-access-organization-resources-with-a-fine-grained-personal-access-token)

```ts
github.orgs.reviewPatGrantRequest(input: {
  /** Action to apply to the request. */
  action: "approve" | "deny";
  /** Reason for approving or denying the request. Max 1024 characters. */
  reason?: string | null;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the request for access via fine-grained personal access token. */
  pat_request_id: number;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/personal-access-token-requests/{pat_request_id}` · `orgs/review-pat-grant-request`</sub>

## `github.orgs.listPatGrantRequestRepositories`

List repositories requested to be accessed by a fine-grained personal access token — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#list-repositories-requested-to-be-accessed-by-a-fine-grained-personal-access-token)

```ts
github.orgs.listPatGrantRequestRepositories(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the request for access via fine-grained personal access token. */
  pat_request_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories` · `orgs/list-pat-grant-request-repositories`</sub>

## `github.orgs.listPatGrants`

List fine-grained personal access tokens with access to organization resources — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#list-fine-grained-personal-access-tokens-with-access-to-organization-resources)

```ts
github.orgs.listPatGrants(input: {
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
}): Promise<(OrganizationProgrammaticAccessGrant)[]>
```

<sub>`GET /orgs/{org}/personal-access-tokens` · `orgs/list-pat-grants`</sub>

## `github.orgs.updatePatAccesses`

Update the access to organization resources via fine-grained personal access tokens — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#update-the-access-to-organization-resources-via-fine-grained-personal-access-tokens)

```ts
github.orgs.updatePatAccesses(input: {
  /** Action to apply to the fine-grained personal access token. */
  action: "revoke";
  /** The IDs of the fine-grained personal access tokens. */
  pat_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`POST /orgs/{org}/personal-access-tokens` · `orgs/update-pat-accesses`</sub>

## `github.orgs.updatePatAccess`

Update the access a fine-grained personal access token has to organization resources — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#update-the-access-a-fine-grained-personal-access-token-has-to-organization-resources)

```ts
github.orgs.updatePatAccess(input: {
  /** Action to apply to the fine-grained personal access token. */
  action: "revoke";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the fine-grained personal access token. */
  pat_id: number;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/personal-access-tokens/{pat_id}` · `orgs/update-pat-access`</sub>

## `github.orgs.listPatGrantRepositories`

List repositories a fine-grained personal access token has access to — [API reference](https://docs.github.com/rest/orgs/personal-access-tokens#list-repositories-a-fine-grained-personal-access-token-has-access-to)

```ts
github.orgs.listPatGrantRepositories(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the fine-grained personal access token. */
  pat_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories` · `orgs/list-pat-grant-repositories`</sub>

## `github.orgs.customPropertiesForReposGetOrganizationDefinitions`

Get all custom properties for an organization — [API reference](https://docs.github.com/rest/orgs/custom-properties#get-all-custom-properties-for-an-organization)

```ts
github.orgs.customPropertiesForReposGetOrganizationDefinitions(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(CustomProperty)[]>
```

<sub>`GET /orgs/{org}/properties/schema` · `orgs/custom-properties-for-repos-get-organization-definitions`</sub>

## `github.orgs.customPropertiesForReposCreateOrUpdateOrganizationDefinitions`

Create or update custom properties for an organization — [API reference](https://docs.github.com/rest/orgs/custom-properties#create-or-update-custom-properties-for-an-organization)

```ts
github.orgs.customPropertiesForReposCreateOrUpdateOrganizationDefinitions(input: {
  /** The array of custom properties to create or update. */
  properties: (CustomProperty)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(CustomProperty)[]>
```

<sub>`PATCH /orgs/{org}/properties/schema` · `orgs/custom-properties-for-repos-create-or-update-organization-definitions`</sub>

## `github.orgs.customPropertiesForReposDeleteOrganizationDefinition`

Remove a custom property for an organization — [API reference](https://docs.github.com/rest/orgs/custom-properties#remove-a-custom-property-for-an-organization)

```ts
github.orgs.customPropertiesForReposDeleteOrganizationDefinition(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The custom property name */
  custom_property_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/properties/schema/{custom_property_name}` · `orgs/custom-properties-for-repos-delete-organization-definition`</sub>

## `github.orgs.customPropertiesForReposGetOrganizationDefinition`

Get a custom property for an organization — [API reference](https://docs.github.com/rest/orgs/custom-properties#get-a-custom-property-for-an-organization)

```ts
github.orgs.customPropertiesForReposGetOrganizationDefinition(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The custom property name */
  custom_property_name: string;
}): Promise<CustomProperty>
```

<sub>`GET /orgs/{org}/properties/schema/{custom_property_name}` · `orgs/custom-properties-for-repos-get-organization-definition`</sub>

## `github.orgs.customPropertiesForReposCreateOrUpdateOrganizationDefinition`

Create or update a custom property for an organization — [API reference](https://docs.github.com/rest/orgs/custom-properties#create-or-update-a-custom-property-for-an-organization)

```ts
github.orgs.customPropertiesForReposCreateOrUpdateOrganizationDefinition(input: {
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
}): Promise<CustomProperty>
```

<sub>`PUT /orgs/{org}/properties/schema/{custom_property_name}` · `orgs/custom-properties-for-repos-create-or-update-organization-definition`</sub>

## `github.orgs.customPropertiesForReposGetOrganizationValues`

List custom property values for organization repositories — [API reference](https://docs.github.com/rest/orgs/custom-properties#list-custom-property-values-for-organization-repositories)

```ts
github.orgs.customPropertiesForReposGetOrganizationValues(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** Finds repositories in the organization with a query containing one or more search keywords and qualifiers. Qualifiers allow you to limit your search to specific areas of GitHub. The REST API supports the same qualifiers as the web interface for GitHub. To learn more about the format of the query, see [Constructing a search query](https://docs.github.com/rest/search/search#constructing-a-search-query). See "[Searching for repositories](https://docs.github.com/articles/searching-for-repositories/)" for a detailed list of qualifiers. */
  repository_query?: string;
}): Promise<(OrgRepoCustomPropertyValues)[]>
```

<sub>`GET /orgs/{org}/properties/values` · `orgs/custom-properties-for-repos-get-organization-values`</sub>

## `github.orgs.customPropertiesForReposCreateOrUpdateOrganizationValues`

Create or update custom property values for organization repositories — [API reference](https://docs.github.com/rest/orgs/custom-properties#create-or-update-custom-property-values-for-organization-repositories)

```ts
github.orgs.customPropertiesForReposCreateOrUpdateOrganizationValues(input: {
  /** The names of repositories that the custom property values will be applied to. */
  repository_names: (string)[];
  /** List of custom property names and associated values to apply to the repositories. */
  properties: (CustomPropertyValue)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PATCH /orgs/{org}/properties/values` · `orgs/custom-properties-for-repos-create-or-update-organization-values`</sub>

## `github.orgs.listPublicMembers`

List public organization members — [API reference](https://docs.github.com/rest/orgs/members#list-public-organization-members)

```ts
github.orgs.listPublicMembers(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /orgs/{org}/public_members` · `orgs/list-public-members`</sub>

## `github.orgs.removePublicMembershipForAuthenticatedUser`

Remove public organization membership for the authenticated user — [API reference](https://docs.github.com/rest/orgs/members#remove-public-organization-membership-for-the-authenticated-user)

```ts
github.orgs.removePublicMembershipForAuthenticatedUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/public_members/{username}` · `orgs/remove-public-membership-for-authenticated-user`</sub>

## `github.orgs.checkPublicMembershipForUser`

Check public organization membership for a user — [API reference](https://docs.github.com/rest/orgs/members#check-public-organization-membership-for-a-user)

```ts
github.orgs.checkPublicMembershipForUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`GET /orgs/{org}/public_members/{username}` · `orgs/check-public-membership-for-user`</sub>

## `github.orgs.setPublicMembershipForAuthenticatedUser`

Set public organization membership for the authenticated user — [API reference](https://docs.github.com/rest/orgs/members#set-public-organization-membership-for-the-authenticated-user)

```ts
github.orgs.setPublicMembershipForAuthenticatedUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/public_members/{username}` · `orgs/set-public-membership-for-authenticated-user`</sub>

## `github.orgs.getOrgRulesetHistory`

Get organization ruleset history — [API reference](https://docs.github.com/rest/orgs/rules#get-organization-ruleset-history)

```ts
github.orgs.getOrgRulesetHistory(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID of the ruleset. */
  ruleset_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(RulesetVersion)[]>
```

<sub>`GET /orgs/{org}/rulesets/{ruleset_id}/history` · `orgs/get-org-ruleset-history`</sub>

## `github.orgs.getOrgRulesetVersion`

Get organization ruleset version — [API reference](https://docs.github.com/rest/orgs/rules#get-organization-ruleset-version)

```ts
github.orgs.getOrgRulesetVersion(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The ID of the ruleset. */
  ruleset_id: number;
  /** The ID of the version */
  version_id: number;
}): Promise<RulesetVersionWithState>
```

<sub>`GET /orgs/{org}/rulesets/{ruleset_id}/history/{version_id}` · `orgs/get-org-ruleset-version`</sub>

## `github.orgs.listSecurityManagerTeams`

List security manager teams — [API reference](https://docs.github.com/rest/orgs/security-managers#list-security-manager-teams)

```ts
github.orgs.listSecurityManagerTeams(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(TeamSimple)[]>
```

<sub>`GET /orgs/{org}/security-managers` · `orgs/list-security-manager-teams`</sub>

## `github.orgs.removeSecurityManagerTeam`

Remove a security manager team — [API reference](https://docs.github.com/rest/orgs/security-managers#remove-a-security-manager-team)

```ts
github.orgs.removeSecurityManagerTeam(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/security-managers/teams/{team_slug}` · `orgs/remove-security-manager-team`</sub>

## `github.orgs.addSecurityManagerTeam`

Add a security manager team — [API reference](https://docs.github.com/rest/orgs/security-managers#add-a-security-manager-team)

```ts
github.orgs.addSecurityManagerTeam(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/security-managers/teams/{team_slug}` · `orgs/add-security-manager-team`</sub>

## `github.orgs.getImmutableReleasesSettings`

Get immutable releases settings for an organization — [API reference](https://docs.github.com/rest/orgs/orgs#get-immutable-releases-settings-for-an-organization)

```ts
github.orgs.getImmutableReleasesSettings(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ImmutableReleasesOrganizationSettings>
```

<sub>`GET /orgs/{org}/settings/immutable-releases` · `orgs/get-immutable-releases-settings`</sub>

## `github.orgs.setImmutableReleasesSettings`

Set immutable releases settings for an organization — [API reference](https://docs.github.com/rest/orgs/orgs#set-immutable-releases-settings-for-an-organization)

```ts
github.orgs.setImmutableReleasesSettings(input: {
  /** The policy that controls how immutable releases are enforced in the organization. */
  enforced_repositories: "all" | "none" | "selected";
  /** An array of repository ids for which immutable releases enforcement should be applied. You can only provide a list of repository ids when the `enforced_repositories` is set to `selected`. You can add and remove individual repositories using the [Enable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#enable-a-selected-repository-for-immutable-releases-in-an-organization) and [Disable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#disable-a-selected-repository-for-immutable-releases-in-an-organization) endpoints. */
  selected_repository_ids?: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/settings/immutable-releases` · `orgs/set-immutable-releases-settings`</sub>

## `github.orgs.getImmutableReleasesSettingsRepositories`

List selected repositories for immutable releases enforcement — [API reference](https://docs.github.com/rest/orgs/orgs#list-selected-repositories-for-immutable-releases-enforcement)

```ts
github.orgs.getImmutableReleasesSettingsRepositories(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<{ total_count: number; repositories: (MinimalRepository)[] }>
```

<sub>`GET /orgs/{org}/settings/immutable-releases/repositories` · `orgs/get-immutable-releases-settings-repositories`</sub>

## `github.orgs.setImmutableReleasesSettingsRepositories`

Set selected repositories for immutable releases enforcement — [API reference](https://docs.github.com/rest/orgs/orgs#set-selected-repositories-for-immutable-releases-enforcement)

```ts
github.orgs.setImmutableReleasesSettingsRepositories(input: {
  /** An array of repository ids for which immutable releases enforcement should be applied. You can only provide a list of repository ids when the `enforced_repositories` is set to `selected`. You can add and remove individual repositories using the [Enable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#enable-a-selected-repository-for-immutable-releases-in-an-organization) and [Disable a selected repository for immutable releases in an organization](https://docs.github.com/rest/orgs/orgs#disable-a-selected-repository-for-immutable-releases-in-an-organization) endpoints. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/settings/immutable-releases/repositories` · `orgs/set-immutable-releases-settings-repositories`</sub>

## `github.orgs.disableSelectedRepositoryImmutableReleasesOrganization`

Disable a selected repository for immutable releases in an organization — [API reference](https://docs.github.com/rest/orgs/orgs#disable-a-selected-repository-for-immutable-releases-in-an-organization)

```ts
github.orgs.disableSelectedRepositoryImmutableReleasesOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/settings/immutable-releases/repositories/{repository_id}` · `orgs/disable-selected-repository-immutable-releases-organization`</sub>

## `github.orgs.enableSelectedRepositoryImmutableReleasesOrganization`

Enable a selected repository for immutable releases in an organization — [API reference](https://docs.github.com/rest/orgs/orgs#enable-a-selected-repository-for-immutable-releases-in-an-organization)

```ts
github.orgs.enableSelectedRepositoryImmutableReleasesOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/settings/immutable-releases/repositories/{repository_id}` · `orgs/enable-selected-repository-immutable-releases-organization`</sub>

## `github.orgs.listMembershipsForAuthenticatedUser`

List organization memberships for the authenticated user — [API reference](https://docs.github.com/rest/orgs/members#list-organization-memberships-for-the-authenticated-user)

```ts
github.orgs.listMembershipsForAuthenticatedUser(input: {
  /** Indicates the state of the memberships to return. If not specified, the API returns both active and pending memberships. */
  state?: "active" | "pending";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrgMembership)[]>
```

<sub>`GET /user/memberships/orgs` · `orgs/list-memberships-for-authenticated-user`</sub>

## `github.orgs.getMembershipForAuthenticatedUser`

Get an organization membership for the authenticated user — [API reference](https://docs.github.com/rest/orgs/members#get-an-organization-membership-for-the-authenticated-user)

```ts
github.orgs.getMembershipForAuthenticatedUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OrgMembership>
```

<sub>`GET /user/memberships/orgs/{org}` · `orgs/get-membership-for-authenticated-user`</sub>

## `github.orgs.updateMembershipForAuthenticatedUser`

Update an organization membership for the authenticated user — [API reference](https://docs.github.com/rest/orgs/members#update-an-organization-membership-for-the-authenticated-user)

```ts
github.orgs.updateMembershipForAuthenticatedUser(input: {
  /** The state that the membership should be in. Only `"active"` will be accepted. */
  state: "active";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OrgMembership>
```

<sub>`PATCH /user/memberships/orgs/{org}` · `orgs/update-membership-for-authenticated-user`</sub>

## `github.orgs.listForAuthenticatedUser`

List organizations for the authenticated user — [API reference](https://docs.github.com/rest/orgs/orgs#list-organizations-for-the-authenticated-user)

```ts
github.orgs.listForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrganizationSimple)[]>
```

<sub>`GET /user/orgs` · `orgs/list-for-authenticated-user`</sub>

## `github.orgs.listForUser`

List organizations for a user — [API reference](https://docs.github.com/rest/orgs/orgs#list-organizations-for-a-user)

```ts
github.orgs.listForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrganizationSimple)[]>
```

<sub>`GET /users/{username}/orgs` · `orgs/list-for-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
