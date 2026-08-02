# Agents

30 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.agents.listOrgSecrets`

List organization secrets — [API reference](https://docs.github.com/rest/agents/secrets#list-organization-secrets)

```ts
github.agents.listOrgSecrets(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (OrganizationActionsSecret)[] }>
```

<sub>`GET /orgs/{org}/agents/secrets` · `agents/list-org-secrets`</sub>

## `github.agents.deleteOrgSecret`

Delete an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#delete-an-organization-secret)

```ts
github.agents.deleteOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/agents/secrets/{secret_name}` · `agents/delete-org-secret`</sub>

## `github.agents.getOrgSecret`

Get an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#get-an-organization-secret)

```ts
github.agents.getOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<OrganizationActionsSecret>
```

<sub>`GET /orgs/{org}/agents/secrets/{secret_name}` · `agents/get-org-secret`</sub>

## `github.agents.createOrUpdateOrgSecret`

Create or update an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#create-or-update-an-organization-secret)

```ts
github.agents.createOrUpdateOrgSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /orgs/{org}/agents/secrets/{secret_name}` · `agents/create-or-update-org-secret`</sub>

## `github.agents.listSelectedReposForOrgSecret`

List selected repositories for an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#list-selected-repositories-for-an-organization-secret)

```ts
github.agents.listSelectedReposForOrgSecret(input: {
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

<sub>`GET /orgs/{org}/agents/secrets/{secret_name}/repositories` · `agents/list-selected-repos-for-org-secret`</sub>

## `github.agents.setSelectedReposForOrgSecret`

Set selected repositories for an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#set-selected-repositories-for-an-organization-secret)

```ts
github.agents.setSelectedReposForOrgSecret(input: {
  /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Add selected repository to an organization secret](https://docs.github.com/rest/agents/secrets#add-selected-repository-to-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/agents/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/agents/secrets/{secret_name}/repositories` · `agents/set-selected-repos-for-org-secret`</sub>

## `github.agents.removeSelectedRepoFromOrgSecret`

Remove selected repository from an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#remove-selected-repository-from-an-organization-secret)

```ts
github.agents.removeSelectedRepoFromOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}` · `agents/remove-selected-repo-from-org-secret`</sub>

## `github.agents.addSelectedRepoToOrgSecret`

Add selected repository to an organization secret — [API reference](https://docs.github.com/rest/agents/secrets#add-selected-repository-to-an-organization-secret)

```ts
github.agents.addSelectedRepoToOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/agents/secrets/{secret_name}/repositories/{repository_id}` · `agents/add-selected-repo-to-org-secret`</sub>

## `github.agents.getOrgPublicKey`

Get an organization public key — [API reference](https://docs.github.com/rest/agents/secrets#get-an-organization-public-key)

```ts
github.agents.getOrgPublicKey(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsPublicKey>
```

<sub>`GET /orgs/{org}/agents/secrets/public-key` · `agents/get-org-public-key`</sub>

## `github.agents.listOrgVariables`

List organization variables — [API reference](https://docs.github.com/rest/agents/variables#list-organization-variables)

```ts
github.agents.listOrgVariables(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; variables: (OrganizationActionsVariable)[] }>
```

<sub>`GET /orgs/{org}/agents/variables` · `agents/list-org-variables`</sub>

## `github.agents.createOrgVariable`

Create an organization variable — [API reference](https://docs.github.com/rest/agents/variables#create-an-organization-variable)

```ts
github.agents.createOrgVariable(input: {
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
}): Promise<EmptyObject>
```

<sub>`POST /orgs/{org}/agents/variables` · `agents/create-org-variable`</sub>

## `github.agents.deleteOrgVariable`

Delete an organization variable — [API reference](https://docs.github.com/rest/agents/variables#delete-an-organization-variable)

```ts
github.agents.deleteOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/agents/variables/{name}` · `agents/delete-org-variable`</sub>

## `github.agents.getOrgVariable`

Get an organization variable — [API reference](https://docs.github.com/rest/agents/variables#get-an-organization-variable)

```ts
github.agents.getOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
}): Promise<OrganizationActionsVariable>
```

<sub>`GET /orgs/{org}/agents/variables/{name}` · `agents/get-org-variable`</sub>

## `github.agents.updateOrgVariable`

Update an organization variable — [API reference](https://docs.github.com/rest/agents/variables#update-an-organization-variable)

```ts
github.agents.updateOrgVariable(input: {
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
}, options: { params: { name: string } }): Promise<unknown>
```

<sub>`PATCH /orgs/{org}/agents/variables/{name}` · `agents/update-org-variable`</sub>

## `github.agents.listSelectedReposForOrgVariable`

List selected repositories for an organization variable — [API reference](https://docs.github.com/rest/agents/variables#list-selected-repositories-for-an-organization-variable)

```ts
github.agents.listSelectedReposForOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<{ total_count: number; repositories: (MinimalRepository)[] }>
```

<sub>`GET /orgs/{org}/agents/variables/{name}/repositories` · `agents/list-selected-repos-for-org-variable`</sub>

## `github.agents.setSelectedReposForOrgVariable`

Set selected repositories for an organization variable — [API reference](https://docs.github.com/rest/agents/variables#set-selected-repositories-for-an-organization-variable)

```ts
github.agents.setSelectedReposForOrgVariable(input: {
  /** The IDs of the repositories that can access the organization variable. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/agents/variables/{name}/repositories` · `agents/set-selected-repos-for-org-variable`</sub>

## `github.agents.removeSelectedRepoFromOrgVariable`

Remove selected repository from an organization variable — [API reference](https://docs.github.com/rest/agents/variables#remove-selected-repository-from-an-organization-variable)

```ts
github.agents.removeSelectedRepoFromOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/agents/variables/{name}/repositories/{repository_id}` · `agents/remove-selected-repo-from-org-variable`</sub>

## `github.agents.addSelectedRepoToOrgVariable`

Add selected repository to an organization variable — [API reference](https://docs.github.com/rest/agents/variables#add-selected-repository-to-an-organization-variable)

```ts
github.agents.addSelectedRepoToOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/agents/variables/{name}/repositories/{repository_id}` · `agents/add-selected-repo-to-org-variable`</sub>

## `github.agents.listRepoOrganizationSecrets`

List repository organization secrets — [API reference](https://docs.github.com/rest/agents/secrets#list-repository-organization-secrets)

```ts
github.agents.listRepoOrganizationSecrets(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (ActionsSecret)[] }>
```

<sub>`GET /repos/{owner}/{repo}/agents/organization-secrets` · `agents/list-repo-organization-secrets`</sub>

## `github.agents.listRepoOrganizationVariables`

List repository organization variables — [API reference](https://docs.github.com/rest/agents/variables#list-repository-organization-variables)

```ts
github.agents.listRepoOrganizationVariables(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; variables: (ActionsVariable)[] }>
```

<sub>`GET /repos/{owner}/{repo}/agents/organization-variables` · `agents/list-repo-organization-variables`</sub>

## `github.agents.listRepoSecrets`

List repository secrets — [API reference](https://docs.github.com/rest/agents/secrets#list-repository-secrets)

```ts
github.agents.listRepoSecrets(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (ActionsSecret)[] }>
```

<sub>`GET /repos/{owner}/{repo}/agents/secrets` · `agents/list-repo-secrets`</sub>

## `github.agents.deleteRepoSecret`

Delete a repository secret — [API reference](https://docs.github.com/rest/agents/secrets#delete-a-repository-secret)

```ts
github.agents.deleteRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/agents/secrets/{secret_name}` · `agents/delete-repo-secret`</sub>

## `github.agents.getRepoSecret`

Get a repository secret — [API reference](https://docs.github.com/rest/agents/secrets#get-a-repository-secret)

```ts
github.agents.getRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<ActionsSecret>
```

<sub>`GET /repos/{owner}/{repo}/agents/secrets/{secret_name}` · `agents/get-repo-secret`</sub>

## `github.agents.createOrUpdateRepoSecret`

Create or update a repository secret — [API reference](https://docs.github.com/rest/agents/secrets#create-or-update-a-repository-secret)

```ts
github.agents.createOrUpdateRepoSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /repos/{owner}/{repo}/agents/secrets/{secret_name}` · `agents/create-or-update-repo-secret`</sub>

## `github.agents.getRepoPublicKey`

Get a repository public key — [API reference](https://docs.github.com/rest/agents/secrets#get-a-repository-public-key)

```ts
github.agents.getRepoPublicKey(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsPublicKey>
```

<sub>`GET /repos/{owner}/{repo}/agents/secrets/public-key` · `agents/get-repo-public-key`</sub>

## `github.agents.listRepoVariables`

List repository variables — [API reference](https://docs.github.com/rest/agents/variables#list-repository-variables)

```ts
github.agents.listRepoVariables(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; variables: (ActionsVariable)[] }>
```

<sub>`GET /repos/{owner}/{repo}/agents/variables` · `agents/list-repo-variables`</sub>

## `github.agents.createRepoVariable`

Create a repository variable — [API reference](https://docs.github.com/rest/agents/variables#create-a-repository-variable)

```ts
github.agents.createRepoVariable(input: {
  /** The name of the variable. */
  name: string;
  /** The value of the variable. */
  value: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/agents/variables` · `agents/create-repo-variable`</sub>

## `github.agents.deleteRepoVariable`

Delete a repository variable — [API reference](https://docs.github.com/rest/agents/variables#delete-a-repository-variable)

```ts
github.agents.deleteRepoVariable(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the variable. */
  name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/agents/variables/{name}` · `agents/delete-repo-variable`</sub>

## `github.agents.getRepoVariable`

Get a repository variable — [API reference](https://docs.github.com/rest/agents/variables#get-a-repository-variable)

```ts
github.agents.getRepoVariable(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the variable. */
  name: string;
}): Promise<ActionsVariable>
```

<sub>`GET /repos/{owner}/{repo}/agents/variables/{name}` · `agents/get-repo-variable`</sub>

## `github.agents.updateRepoVariable`

Update a repository variable — [API reference](https://docs.github.com/rest/agents/variables#update-a-repository-variable)

```ts
github.agents.updateRepoVariable(input: {
  /** The name of the variable. */
  name?: string;
  /** The value of the variable. */
  value?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}, options: { params: { name: string } }): Promise<unknown>
```

<sub>`PATCH /repos/{owner}/{repo}/agents/variables/{name}` · `agents/update-repo-variable`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
