# Codespaces

48 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.codespaces.listInOrganization`

List codespaces for the organization — [API reference](https://docs.github.com/rest/codespaces/organizations#list-codespaces-for-the-organization)

```ts
github.codespaces.listInOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; codespaces: (Codespace)[] }>
```

<sub>`GET /orgs/{org}/codespaces` · `codespaces/list-in-organization`</sub>

## `github.codespaces.setCodespacesAccess`

Manage access control for organization codespaces — [API reference](https://docs.github.com/rest/codespaces/organizations#manage-access-control-for-organization-codespaces)

```ts
github.codespaces.setCodespacesAccess(input: {
  /** Which users can access codespaces in the organization. `disabled` means that no users can access codespaces in the organization. */
  visibility: "disabled" | "selected_members" | "all_members" | "all_members_and_outside_collaborators";
  /** The usernames of the organization members who should have access to codespaces in the organization. Required when `visibility` is `selected_members`. The provided list of usernames will replace any existing value. */
  selected_usernames?: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/codespaces/access` · `codespaces/set-codespaces-access`</sub>

## `github.codespaces.deleteCodespacesAccessUsers`

Remove users from Codespaces access for an organization — [API reference](https://docs.github.com/rest/codespaces/organizations#remove-users-from-codespaces-access-for-an-organization)

```ts
github.codespaces.deleteCodespacesAccessUsers(input: {
  /** The usernames of the organization members and outside collaborators whose codespaces should not be billed to the organization. */
  selected_usernames: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/codespaces/access/selected_users` · `codespaces/delete-codespaces-access-users`</sub>

## `github.codespaces.setCodespacesAccessUsers`

Add users to Codespaces access for an organization — [API reference](https://docs.github.com/rest/codespaces/organizations#add-users-to-codespaces-access-for-an-organization)

```ts
github.codespaces.setCodespacesAccessUsers(input: {
  /** The usernames of the organization members and outside collaborators whose codespaces should be billed to the organization. */
  selected_usernames: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`POST /orgs/{org}/codespaces/access/selected_users` · `codespaces/set-codespaces-access-users`</sub>

## `github.codespaces.listOrgSecrets`

List organization secrets — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#list-organization-secrets)

```ts
github.codespaces.listOrgSecrets(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (CodespacesOrgSecret)[] }>
```

<sub>`GET /orgs/{org}/codespaces/secrets` · `codespaces/list-org-secrets`</sub>

## `github.codespaces.deleteOrgSecret`

Delete an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#delete-an-organization-secret)

```ts
github.codespaces.deleteOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/codespaces/secrets/{secret_name}` · `codespaces/delete-org-secret`</sub>

## `github.codespaces.getOrgSecret`

Get an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#get-an-organization-secret)

```ts
github.codespaces.getOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<CodespacesOrgSecret>
```

<sub>`GET /orgs/{org}/codespaces/secrets/{secret_name}` · `codespaces/get-org-secret`</sub>

## `github.codespaces.createOrUpdateOrgSecret`

Create or update an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#create-or-update-an-organization-secret)

```ts
github.codespaces.createOrUpdateOrgSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /orgs/{org}/codespaces/secrets/{secret_name}` · `codespaces/create-or-update-org-secret`</sub>

## `github.codespaces.listSelectedReposForOrgSecret`

List selected repositories for an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#list-selected-repositories-for-an-organization-secret)

```ts
github.codespaces.listSelectedReposForOrgSecret(input: {
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

<sub>`GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories` · `codespaces/list-selected-repos-for-org-secret`</sub>

## `github.codespaces.setSelectedReposForOrgSecret`

Set selected repositories for an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#set-selected-repositories-for-an-organization-secret)

```ts
github.codespaces.setSelectedReposForOrgSecret(input: {
  /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Set selected repositories for an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#set-selected-repositories-for-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/codespaces/organization-secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories` · `codespaces/set-selected-repos-for-org-secret`</sub>

## `github.codespaces.removeSelectedRepoFromOrgSecret`

Remove selected repository from an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#remove-selected-repository-from-an-organization-secret)

```ts
github.codespaces.removeSelectedRepoFromOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}` · `codespaces/remove-selected-repo-from-org-secret`</sub>

## `github.codespaces.addSelectedRepoToOrgSecret`

Add selected repository to an organization secret — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#add-selected-repository-to-an-organization-secret)

```ts
github.codespaces.addSelectedRepoToOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}` · `codespaces/add-selected-repo-to-org-secret`</sub>

## `github.codespaces.getOrgPublicKey`

Get an organization public key — [API reference](https://docs.github.com/rest/codespaces/organization-secrets#get-an-organization-public-key)

```ts
github.codespaces.getOrgPublicKey(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CodespacesPublicKey>
```

<sub>`GET /orgs/{org}/codespaces/secrets/public-key` · `codespaces/get-org-public-key`</sub>

## `github.codespaces.getCodespacesForUserInOrg`

List codespaces for a user in organization — [API reference](https://docs.github.com/rest/codespaces/organizations#list-codespaces-for-a-user-in-organization)

```ts
github.codespaces.getCodespacesForUserInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; codespaces: (Codespace)[] }>
```

<sub>`GET /orgs/{org}/members/{username}/codespaces` · `codespaces/get-codespaces-for-user-in-org`</sub>

## `github.codespaces.deleteFromOrganization`

Delete a codespace from the organization — [API reference](https://docs.github.com/rest/codespaces/organizations#delete-a-codespace-from-the-organization)

```ts
github.codespaces.deleteFromOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}` · `codespaces/delete-from-organization`</sub>

## `github.codespaces.stopInOrganization`

Stop a codespace for an organization user — [API reference](https://docs.github.com/rest/codespaces/organizations#stop-a-codespace-for-an-organization-user)

```ts
github.codespaces.stopInOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<Codespace>
```

<sub>`POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop` · `codespaces/stop-in-organization`</sub>

## `github.codespaces.listInRepositoryForAuthenticatedUser`

List codespaces in a repository for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#list-codespaces-in-a-repository-for-the-authenticated-user)

```ts
github.codespaces.listInRepositoryForAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; codespaces: (Codespace)[] }>
```

<sub>`GET /repos/{owner}/{repo}/codespaces` · `codespaces/list-in-repository-for-authenticated-user`</sub>

## `github.codespaces.createWithRepoForAuthenticatedUser`

Create a codespace in a repository — [API reference](https://docs.github.com/rest/codespaces/codespaces#create-a-codespace-in-a-repository)

```ts
github.codespaces.createWithRepoForAuthenticatedUser(input: {
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
}): Promise<Codespace>
```

<sub>`POST /repos/{owner}/{repo}/codespaces` · `codespaces/create-with-repo-for-authenticated-user`</sub>

## `github.codespaces.listDevcontainersInRepositoryForAuthenticatedUser`

List devcontainer configurations in a repository for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#list-devcontainer-configurations-in-a-repository-for-the-authenticated-user)

```ts
github.codespaces.listDevcontainersInRepositoryForAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; devcontainers: ({ path: string; name?: string; display_name?: string })[] }>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/devcontainers` · `codespaces/list-devcontainers-in-repository-for-authenticated-user`</sub>

## `github.codespaces.repoMachinesForAuthenticatedUser`

List available machine types for a repository — [API reference](https://docs.github.com/rest/codespaces/machines#list-available-machine-types-for-a-repository)

```ts
github.codespaces.repoMachinesForAuthenticatedUser(input: {
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
}): Promise<{ total_count: number; machines: (CodespaceMachine)[] }>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/machines` · `codespaces/repo-machines-for-authenticated-user`</sub>

## `github.codespaces.preFlightWithRepoForAuthenticatedUser`

Get default attributes for a codespace — [API reference](https://docs.github.com/rest/codespaces/codespaces#get-default-attributes-for-a-codespace)

```ts
github.codespaces.preFlightWithRepoForAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The branch or commit to check for a default devcontainer path. If not specified, the default branch will be checked. */
  ref?: string;
  /** An alternative IP for default location auto-detection, such as when proxying a request. */
  client_ip?: string;
}): Promise<{ billable_owner?: SimpleUser; defaults?: { location: string; devcontainer_path: string | null } }>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/new` · `codespaces/pre-flight-with-repo-for-authenticated-user`</sub>

## `github.codespaces.checkPermissionsForDevcontainer`

Check if permissions defined by a devcontainer have been accepted by the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#check-if-permissions-defined-by-a-devcontainer-have-been-accepted-by-the-authenticated-user)

```ts
github.codespaces.checkPermissionsForDevcontainer(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The git reference that points to the location of the devcontainer configuration to use for the permission check. The value of `ref` will typically be a branch name (`heads/BRANCH_NAME`). For more information, see "[Git References](https://git-scm.com/book/en/v2/Git-Internals-Git-References)" in the Git documentation. */
  ref: string;
  /** Path to the devcontainer.json configuration to use for the permission check. */
  devcontainer_path: string;
}): Promise<CodespacesPermissionsCheckForDevcontainer>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/permissions_check` · `codespaces/check-permissions-for-devcontainer`</sub>

## `github.codespaces.listRepoSecrets`

List repository secrets — [API reference](https://docs.github.com/rest/codespaces/repository-secrets#list-repository-secrets)

```ts
github.codespaces.listRepoSecrets(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (RepoCodespacesSecret)[] }>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/secrets` · `codespaces/list-repo-secrets`</sub>

## `github.codespaces.deleteRepoSecret`

Delete a repository secret — [API reference](https://docs.github.com/rest/codespaces/repository-secrets#delete-a-repository-secret)

```ts
github.codespaces.deleteRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}` · `codespaces/delete-repo-secret`</sub>

## `github.codespaces.getRepoSecret`

Get a repository secret — [API reference](https://docs.github.com/rest/codespaces/repository-secrets#get-a-repository-secret)

```ts
github.codespaces.getRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<RepoCodespacesSecret>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}` · `codespaces/get-repo-secret`</sub>

## `github.codespaces.createOrUpdateRepoSecret`

Create or update a repository secret — [API reference](https://docs.github.com/rest/codespaces/repository-secrets#create-or-update-a-repository-secret)

```ts
github.codespaces.createOrUpdateRepoSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}` · `codespaces/create-or-update-repo-secret`</sub>

## `github.codespaces.getRepoPublicKey`

Get a repository public key — [API reference](https://docs.github.com/rest/codespaces/repository-secrets#get-a-repository-public-key)

```ts
github.codespaces.getRepoPublicKey(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<CodespacesPublicKey>
```

<sub>`GET /repos/{owner}/{repo}/codespaces/secrets/public-key` · `codespaces/get-repo-public-key`</sub>

## `github.codespaces.createWithPrForAuthenticatedUser`

Create a codespace from a pull request — [API reference](https://docs.github.com/rest/codespaces/codespaces#create-a-codespace-from-a-pull-request)

```ts
github.codespaces.createWithPrForAuthenticatedUser(input: {
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
}): Promise<Codespace>
```

<sub>`POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces` · `codespaces/create-with-pr-for-authenticated-user`</sub>

## `github.codespaces.listForAuthenticatedUser`

List codespaces for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#list-codespaces-for-the-authenticated-user)

```ts
github.codespaces.listForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** ID of the Repository to filter on */
  repository_id?: number;
}): Promise<{ total_count: number; codespaces: (Codespace)[] }>
```

<sub>`GET /user/codespaces` · `codespaces/list-for-authenticated-user`</sub>

## `github.codespaces.createForAuthenticatedUser`

Create a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#create-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.createForAuthenticatedUser(input: {
  body: { repository_id: number; ref?: string; location?: string; geo?: "EuropeWest" | "SoutheastAsia" | "UsEast" | "UsWest"; client_ip?: string; machine?: string; devcontainer_path?: string; multi_repo_permissions_opt_out?: boolean; working_directory?: string; idle_timeout_minutes?: number; display_name?: string; retention_period_minutes?: number } | { pull_request: { pull_request_number: number; repository_id: number }; location?: string; geo?: "EuropeWest" | "SoutheastAsia" | "UsEast" | "UsWest"; machine?: string; devcontainer_path?: string; working_directory?: string; idle_timeout_minutes?: number };
}): Promise<Codespace>
```

<sub>`POST /user/codespaces` · `codespaces/create-for-authenticated-user`</sub>

## `github.codespaces.deleteForAuthenticatedUser`

Delete a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#delete-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.deleteForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<{ [key: string]: unknown }>
```

<sub>`DELETE /user/codespaces/{codespace_name}` · `codespaces/delete-for-authenticated-user`</sub>

## `github.codespaces.getForAuthenticatedUser`

Get a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#get-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.getForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<Codespace>
```

<sub>`GET /user/codespaces/{codespace_name}` · `codespaces/get-for-authenticated-user`</sub>

## `github.codespaces.updateForAuthenticatedUser`

Update a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#update-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.updateForAuthenticatedUser(input: {
  /** A valid machine to transition this codespace to. */
  machine?: string;
  /** Display name for this codespace */
  display_name?: string;
  /** Recently opened folders inside the codespace. It is currently used by the clients to determine the folder path to load the codespace in. */
  recent_folders?: (string)[];
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<Codespace>
```

<sub>`PATCH /user/codespaces/{codespace_name}` · `codespaces/update-for-authenticated-user`</sub>

## `github.codespaces.exportForAuthenticatedUser`

Export a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#export-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.exportForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<CodespaceExportDetails>
```

<sub>`POST /user/codespaces/{codespace_name}/exports` · `codespaces/export-for-authenticated-user`</sub>

## `github.codespaces.getExportDetailsForAuthenticatedUser`

Get details about a codespace export — [API reference](https://docs.github.com/rest/codespaces/codespaces#get-details-about-a-codespace-export)

```ts
github.codespaces.getExportDetailsForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
  /** The ID of the export operation, or `latest`. Currently only `latest` is currently supported. */
  export_id: string;
}): Promise<CodespaceExportDetails>
```

<sub>`GET /user/codespaces/{codespace_name}/exports/{export_id}` · `codespaces/get-export-details-for-authenticated-user`</sub>

## `github.codespaces.codespaceMachinesForAuthenticatedUser`

List machine types for a codespace — [API reference](https://docs.github.com/rest/codespaces/machines#list-machine-types-for-a-codespace)

```ts
github.codespaces.codespaceMachinesForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<{ total_count: number; machines: (CodespaceMachine)[] }>
```

<sub>`GET /user/codespaces/{codespace_name}/machines` · `codespaces/codespace-machines-for-authenticated-user`</sub>

## `github.codespaces.publishForAuthenticatedUser`

Create a repository from an unpublished codespace — [API reference](https://docs.github.com/rest/codespaces/codespaces#create-a-repository-from-an-unpublished-codespace)

```ts
github.codespaces.publishForAuthenticatedUser(input: {
  /** A name for the new repository. */
  name?: string;
  /** Whether the new repository should be private. */
  private?: boolean;
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<CodespaceWithFullRepository>
```

<sub>`POST /user/codespaces/{codespace_name}/publish` · `codespaces/publish-for-authenticated-user`</sub>

## `github.codespaces.startForAuthenticatedUser`

Start a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#start-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.startForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<Codespace>
```

<sub>`POST /user/codespaces/{codespace_name}/start` · `codespaces/start-for-authenticated-user`</sub>

## `github.codespaces.stopForAuthenticatedUser`

Stop a codespace for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/codespaces#stop-a-codespace-for-the-authenticated-user)

```ts
github.codespaces.stopForAuthenticatedUser(input: {
  /** The name of the codespace. */
  codespace_name: string;
}): Promise<Codespace>
```

<sub>`POST /user/codespaces/{codespace_name}/stop` · `codespaces/stop-for-authenticated-user`</sub>

## `github.codespaces.listSecretsForAuthenticatedUser`

List secrets for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/secrets#list-secrets-for-the-authenticated-user)

```ts
github.codespaces.listSecretsForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (CodespacesSecret)[] }>
```

<sub>`GET /user/codespaces/secrets` · `codespaces/list-secrets-for-authenticated-user`</sub>

## `github.codespaces.deleteSecretForAuthenticatedUser`

Delete a secret for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/secrets#delete-a-secret-for-the-authenticated-user)

```ts
github.codespaces.deleteSecretForAuthenticatedUser(input: {
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /user/codespaces/secrets/{secret_name}` · `codespaces/delete-secret-for-authenticated-user`</sub>

## `github.codespaces.getSecretForAuthenticatedUser`

Get a secret for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/secrets#get-a-secret-for-the-authenticated-user)

```ts
github.codespaces.getSecretForAuthenticatedUser(input: {
  /** The name of the secret. */
  secret_name: string;
}): Promise<CodespacesSecret>
```

<sub>`GET /user/codespaces/secrets/{secret_name}` · `codespaces/get-secret-for-authenticated-user`</sub>

## `github.codespaces.createOrUpdateSecretForAuthenticatedUser`

Create or update a secret for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/secrets#create-or-update-a-secret-for-the-authenticated-user)

```ts
github.codespaces.createOrUpdateSecretForAuthenticatedUser(input: {
  /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get the public key for the authenticated user](https://docs.github.com/rest/codespaces/secrets#get-public-key-for-the-authenticated-user) endpoint. */
  encrypted_value?: string;
  /** ID of the key you used to encrypt the secret. */
  key_id: string;
  /** An array of repository ids that can access the user secret. You can manage the list of selected repositories using the [List selected repositories for a user secret](https://docs.github.com/rest/codespaces/secrets#list-selected-repositories-for-a-user-secret), [Set selected repositories for a user secret](https://docs.github.com/rest/codespaces/secrets#set-selected-repositories-for-a-user-secret), and [Remove a selected repository from a user secret](https://docs.github.com/rest/codespaces/secrets#remove-a-selected-repository-from-a-user-secret) endpoints. */
  selected_repository_ids?: (number | string)[];
  /** The name of the secret. */
  secret_name: string;
}): Promise<EmptyObject>
```

<sub>`PUT /user/codespaces/secrets/{secret_name}` · `codespaces/create-or-update-secret-for-authenticated-user`</sub>

## `github.codespaces.listRepositoriesForSecretForAuthenticatedUser`

List selected repositories for a user secret — [API reference](https://docs.github.com/rest/codespaces/secrets#list-selected-repositories-for-a-user-secret)

```ts
github.codespaces.listRepositoriesForSecretForAuthenticatedUser(input: {
  /** The name of the secret. */
  secret_name: string;
}): Promise<{ total_count: number; repositories: (MinimalRepository)[] }>
```

<sub>`GET /user/codespaces/secrets/{secret_name}/repositories` · `codespaces/list-repositories-for-secret-for-authenticated-user`</sub>

## `github.codespaces.setRepositoriesForSecretForAuthenticatedUser`

Set selected repositories for a user secret — [API reference](https://docs.github.com/rest/codespaces/secrets#set-selected-repositories-for-a-user-secret)

```ts
github.codespaces.setRepositoriesForSecretForAuthenticatedUser(input: {
  /** An array of repository ids for which a codespace can access the secret. You can manage the list of selected repositories using the [List selected repositories for a user secret](https://docs.github.com/rest/codespaces/secrets#list-selected-repositories-for-a-user-secret), [Add a selected repository to a user secret](https://docs.github.com/rest/codespaces/secrets#add-a-selected-repository-to-a-user-secret), and [Remove a selected repository from a user secret](https://docs.github.com/rest/codespaces/secrets#remove-a-selected-repository-from-a-user-secret) endpoints. */
  selected_repository_ids: (number)[];
  /** The name of the secret. */
  secret_name: string;
}): Promise<BasicError>
```

<sub>`PUT /user/codespaces/secrets/{secret_name}/repositories` · `codespaces/set-repositories-for-secret-for-authenticated-user`</sub>

## `github.codespaces.removeRepositoryForSecretForAuthenticatedUser`

Remove a selected repository from a user secret — [API reference](https://docs.github.com/rest/codespaces/secrets#remove-a-selected-repository-from-a-user-secret)

```ts
github.codespaces.removeRepositoryForSecretForAuthenticatedUser(input: {
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}` · `codespaces/remove-repository-for-secret-for-authenticated-user`</sub>

## `github.codespaces.addRepositoryForSecretForAuthenticatedUser`

Add a selected repository to a user secret — [API reference](https://docs.github.com/rest/codespaces/secrets#add-a-selected-repository-to-a-user-secret)

```ts
github.codespaces.addRepositoryForSecretForAuthenticatedUser(input: {
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<BasicError>
```

<sub>`PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}` · `codespaces/add-repository-for-secret-for-authenticated-user`</sub>

## `github.codespaces.getPublicKeyForAuthenticatedUser`

Get public key for the authenticated user — [API reference](https://docs.github.com/rest/codespaces/secrets#get-public-key-for-the-authenticated-user)

```ts
github.codespaces.getPublicKeyForAuthenticatedUser(): Promise<CodespacesUserPublicKey>
```

<sub>`GET /user/codespaces/secrets/public-key` · `codespaces/get-public-key-for-authenticated-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
