# Dependabot

25 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.dependabot.listAlertsForEnterprise`

List Dependabot alerts for an enterprise — [API reference](https://docs.github.com/rest/dependabot/alerts#list-dependabot-alerts-for-an-enterprise)

```ts
github.dependabot.listAlertsForEnterprise(input: {
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
}): Promise<(DependabotAlertWithRepository)[]>
```

<sub>`GET /enterprises/{enterprise}/dependabot/alerts` · `dependabot/list-alerts-for-enterprise`</sub>

## `github.dependabot.repositoryAccessForEnterprise`

Lists the repositories Dependabot can access in an enterprise — [API reference](https://docs.github.com/rest/dependabot/repository-access#lists-the-repositories-dependabot-can-access-in-an-enterprise)

```ts
github.dependabot.repositoryAccessForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The page number of results to fetch. */
  page?: number;
  /** Number of results per page. */
  per_page?: number;
}): Promise<DependabotRepositoryAccessDetails>
```

<sub>`GET /enterprises/{enterprise}/dependabot/repository-access` · `dependabot/repository-access-for-enterprise`</sub>

## `github.dependabot.updateRepositoryAccessForEnterprise`

Updates Dependabot's repository access list for an enterprise — [API reference](https://docs.github.com/rest/dependabot/repository-access#updates-dependabots-repository-access-list-for-an-enterprise)

```ts
github.dependabot.updateRepositoryAccessForEnterprise(input: {
  /** List of repository IDs to add. */
  repository_ids_to_add?: (number)[];
  /** List of repository IDs to remove. */
  repository_ids_to_remove?: (number)[];
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`PATCH /enterprises/{enterprise}/dependabot/repository-access` · `dependabot/update-repository-access-for-enterprise`</sub>

## `github.dependabot.setRepositoryAccessDefaultLevelForEnterprise`

Set the default repository access level for Dependabot in an enterprise — [API reference](https://docs.github.com/rest/dependabot/repository-access#set-the-default-repository-access-level-for-dependabot-in-an-enterprise)

```ts
github.dependabot.setRepositoryAccessDefaultLevelForEnterprise(input: {
  /** The default repository access level for Dependabot updates. */
  default_level: "public" | "internal";
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`PUT /enterprises/{enterprise}/dependabot/repository-access/default-level` · `dependabot/set-repository-access-default-level-for-enterprise`</sub>

## `github.dependabot.listAlertsForOrg`

List Dependabot alerts for an organization — [API reference](https://docs.github.com/rest/dependabot/alerts#list-dependabot-alerts-for-an-organization)

```ts
github.dependabot.listAlertsForOrg(input: {
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
}): Promise<(DependabotAlertWithRepository)[]>
```

<sub>`GET /orgs/{org}/dependabot/alerts` · `dependabot/list-alerts-for-org`</sub>

## `github.dependabot.repositoryAccessForOrg`

Lists the repositories Dependabot can access in an organization — [API reference](https://docs.github.com/rest/dependabot/repository-access#lists-the-repositories-dependabot-can-access-in-an-organization)

```ts
github.dependabot.repositoryAccessForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The page number of results to fetch. */
  page?: number;
  /** Number of results per page. */
  per_page?: number;
}): Promise<DependabotRepositoryAccessDetails>
```

<sub>`GET /orgs/{org}/dependabot/repository-access` · `dependabot/repository-access-for-org`</sub>

## `github.dependabot.updateRepositoryAccessForOrg`

Updates Dependabot's repository access list for an organization — [API reference](https://docs.github.com/rest/dependabot/repository-access#updates-dependabots-repository-access-list-for-an-organization)

```ts
github.dependabot.updateRepositoryAccessForOrg(input: {
  /** List of repository IDs to add. */
  repository_ids_to_add?: (number)[];
  /** List of repository IDs to remove. */
  repository_ids_to_remove?: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PATCH /orgs/{org}/dependabot/repository-access` · `dependabot/update-repository-access-for-org`</sub>

## `github.dependabot.setRepositoryAccessDefaultLevel`

Set the default repository access level for Dependabot — [API reference](https://docs.github.com/rest/dependabot/repository-access#set-the-default-repository-access-level-for-dependabot)

```ts
github.dependabot.setRepositoryAccessDefaultLevel(input: {
  /** The default repository access level for Dependabot updates. */
  default_level: "public" | "internal";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/dependabot/repository-access/default-level` · `dependabot/set-repository-access-default-level`</sub>

## `github.dependabot.listOrgSecrets`

List organization secrets — [API reference](https://docs.github.com/rest/dependabot/secrets#list-organization-secrets)

```ts
github.dependabot.listOrgSecrets(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (OrganizationDependabotSecret)[] }>
```

<sub>`GET /orgs/{org}/dependabot/secrets` · `dependabot/list-org-secrets`</sub>

## `github.dependabot.deleteOrgSecret`

Delete an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#delete-an-organization-secret)

```ts
github.dependabot.deleteOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/dependabot/secrets/{secret_name}` · `dependabot/delete-org-secret`</sub>

## `github.dependabot.getOrgSecret`

Get an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#get-an-organization-secret)

```ts
github.dependabot.getOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<OrganizationDependabotSecret>
```

<sub>`GET /orgs/{org}/dependabot/secrets/{secret_name}` · `dependabot/get-org-secret`</sub>

## `github.dependabot.createOrUpdateOrgSecret`

Create or update an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#create-or-update-an-organization-secret)

```ts
github.dependabot.createOrUpdateOrgSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /orgs/{org}/dependabot/secrets/{secret_name}` · `dependabot/create-or-update-org-secret`</sub>

## `github.dependabot.listSelectedReposForOrgSecret`

List selected repositories for an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#list-selected-repositories-for-an-organization-secret)

```ts
github.dependabot.listSelectedReposForOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<{ total_count: number; repositories: (MinimalRepository)[] }>
```

<sub>`GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories` · `dependabot/list-selected-repos-for-org-secret`</sub>

## `github.dependabot.setSelectedReposForOrgSecret`

Set selected repositories for an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#set-selected-repositories-for-an-organization-secret)

```ts
github.dependabot.setSelectedReposForOrgSecret(input: {
  /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Set selected repositories for an organization secret](https://docs.github.com/rest/dependabot/secrets#set-selected-repositories-for-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/dependabot/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories` · `dependabot/set-selected-repos-for-org-secret`</sub>

## `github.dependabot.removeSelectedRepoFromOrgSecret`

Remove selected repository from an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#remove-selected-repository-from-an-organization-secret)

```ts
github.dependabot.removeSelectedRepoFromOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}` · `dependabot/remove-selected-repo-from-org-secret`</sub>

## `github.dependabot.addSelectedRepoToOrgSecret`

Add selected repository to an organization secret — [API reference](https://docs.github.com/rest/dependabot/secrets#add-selected-repository-to-an-organization-secret)

```ts
github.dependabot.addSelectedRepoToOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}` · `dependabot/add-selected-repo-to-org-secret`</sub>

## `github.dependabot.getOrgPublicKey`

Get an organization public key — [API reference](https://docs.github.com/rest/dependabot/secrets#get-an-organization-public-key)

```ts
github.dependabot.getOrgPublicKey(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<DependabotPublicKey>
```

<sub>`GET /orgs/{org}/dependabot/secrets/public-key` · `dependabot/get-org-public-key`</sub>

## `github.dependabot.listAlertsForRepo`

List Dependabot alerts for a repository — [API reference](https://docs.github.com/rest/dependabot/alerts#list-dependabot-alerts-for-a-repository)

```ts
github.dependabot.listAlertsForRepo(input: {
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
}): Promise<(DependabotAlert)[]>
```

<sub>`GET /repos/{owner}/{repo}/dependabot/alerts` · `dependabot/list-alerts-for-repo`</sub>

## `github.dependabot.getAlert`

Get a Dependabot alert — [API reference](https://docs.github.com/rest/dependabot/alerts#get-a-dependabot-alert)

```ts
github.dependabot.getAlert(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<DependabotAlert>
```

<sub>`GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}` · `dependabot/get-alert`</sub>

## `github.dependabot.updateAlert`

Update a Dependabot alert — [API reference](https://docs.github.com/rest/dependabot/alerts#update-a-dependabot-alert)

```ts
github.dependabot.updateAlert(input: {
  body: unknown | unknown;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  alert_number: AlertNumber;
}): Promise<DependabotAlert>
```

<sub>`PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}` · `dependabot/update-alert`</sub>

## `github.dependabot.listRepoSecrets`

List repository secrets — [API reference](https://docs.github.com/rest/dependabot/secrets#list-repository-secrets)

```ts
github.dependabot.listRepoSecrets(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (DependabotSecret)[] }>
```

<sub>`GET /repos/{owner}/{repo}/dependabot/secrets` · `dependabot/list-repo-secrets`</sub>

## `github.dependabot.deleteRepoSecret`

Delete a repository secret — [API reference](https://docs.github.com/rest/dependabot/secrets#delete-a-repository-secret)

```ts
github.dependabot.deleteRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}` · `dependabot/delete-repo-secret`</sub>

## `github.dependabot.getRepoSecret`

Get a repository secret — [API reference](https://docs.github.com/rest/dependabot/secrets#get-a-repository-secret)

```ts
github.dependabot.getRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<DependabotSecret>
```

<sub>`GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}` · `dependabot/get-repo-secret`</sub>

## `github.dependabot.createOrUpdateRepoSecret`

Create or update a repository secret — [API reference](https://docs.github.com/rest/dependabot/secrets#create-or-update-a-repository-secret)

```ts
github.dependabot.createOrUpdateRepoSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}` · `dependabot/create-or-update-repo-secret`</sub>

## `github.dependabot.getRepoPublicKey`

Get a repository public key — [API reference](https://docs.github.com/rest/dependabot/secrets#get-a-repository-public-key)

```ts
github.dependabot.getRepoPublicKey(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<DependabotPublicKey>
```

<sub>`GET /repos/{owner}/{repo}/dependabot/secrets/public-key` · `dependabot/get-repo-public-key`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
