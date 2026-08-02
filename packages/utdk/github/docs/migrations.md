# Migrations

22 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.migrations.listForOrg`

List organization migrations — [API reference](https://docs.github.com/rest/migrations/orgs#list-organization-migrations)

```ts
github.migrations.listForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** Exclude attributes from the API response to improve performance */
  exclude?: ("repositories")[];
}): Promise<(Migration)[]>
```

<sub>`GET /orgs/{org}/migrations` · `migrations/list-for-org`</sub>

## `github.migrations.startForOrg`

Start an organization migration — [API reference](https://docs.github.com/rest/migrations/orgs#start-an-organization-migration)

```ts
github.migrations.startForOrg(input: {
  /** A list of arrays indicating which repositories should be migrated. */
  repositories: (string)[];
  /** Indicates whether repositories should be locked (to prevent manipulation) while migrating data. */
  lock_repositories?: boolean;
  /** Indicates whether metadata should be excluded and only git source should be included for the migration. */
  exclude_metadata?: boolean;
  /** Indicates whether the repository git data should be excluded from the migration. */
  exclude_git_data?: boolean;
  /** Indicates whether attachments should be excluded from the migration (to reduce migration archive file size). */
  exclude_attachments?: boolean;
  /** Indicates whether releases should be excluded from the migration (to reduce migration archive file size). */
  exclude_releases?: boolean;
  /** Indicates whether projects owned by the organization or users should be excluded. from the migration. */
  exclude_owner_projects?: boolean;
  /** Indicates whether this should only include organization metadata (repositories array should be empty and will ignore other flags). */
  org_metadata_only?: boolean;
  /** Exclude related items from being returned in the response in order to improve performance of the request. */
  exclude?: ("repositories")[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<Migration>
```

<sub>`POST /orgs/{org}/migrations` · `migrations/start-for-org`</sub>

## `github.migrations.getStatusForOrg`

Get an organization migration status — [API reference](https://docs.github.com/rest/migrations/orgs#get-an-organization-migration-status)

```ts
github.migrations.getStatusForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the migration. */
  migration_id: number;
  /** Exclude attributes from the API response to improve performance */
  exclude?: ("repositories")[];
}): Promise<Migration>
```

<sub>`GET /orgs/{org}/migrations/{migration_id}` · `migrations/get-status-for-org`</sub>

## `github.migrations.deleteArchiveForOrg`

Delete an organization migration archive — [API reference](https://docs.github.com/rest/migrations/orgs#delete-an-organization-migration-archive)

```ts
github.migrations.deleteArchiveForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the migration. */
  migration_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/migrations/{migration_id}/archive` · `migrations/delete-archive-for-org`</sub>

## `github.migrations.downloadArchiveForOrg`

Download an organization migration archive — [API reference](https://docs.github.com/rest/migrations/orgs#download-an-organization-migration-archive)

```ts
github.migrations.downloadArchiveForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the migration. */
  migration_id: number;
}): Promise<BasicError>
```

<sub>`GET /orgs/{org}/migrations/{migration_id}/archive` · `migrations/download-archive-for-org`</sub>

## `github.migrations.unlockRepoForOrg`

Unlock an organization repository — [API reference](https://docs.github.com/rest/migrations/orgs#unlock-an-organization-repository)

```ts
github.migrations.unlockRepoForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the migration. */
  migration_id: number;
  /** repo_name parameter */
  repo_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock` · `migrations/unlock-repo-for-org`</sub>

## `github.migrations.listReposForOrg`

List repositories in an organization migration — [API reference](https://docs.github.com/rest/migrations/orgs#list-repositories-in-an-organization-migration)

```ts
github.migrations.listReposForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the migration. */
  migration_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /orgs/{org}/migrations/{migration_id}/repositories` · `migrations/list-repos-for-org`</sub>

## `github.migrations.cancelImport`

Cancel an import — [API reference](https://docs.github.com/rest/migrations/source-imports#cancel-an-import)

```ts
github.migrations.cancelImport(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/import` · `migrations/cancel-import`</sub>

## `github.migrations.getImportStatus`

Get an import status — [API reference](https://docs.github.com/rest/migrations/source-imports#get-an-import-status)

```ts
github.migrations.getImportStatus(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<Import>
```

<sub>`GET /repos/{owner}/{repo}/import` · `migrations/get-import-status`</sub>

## `github.migrations.updateImport`

Update an import — [API reference](https://docs.github.com/rest/migrations/source-imports#update-an-import)

```ts
github.migrations.updateImport(input: {
  /** The username to provide to the originating repository. */
  vcs_username?: string;
  /** The password to provide to the originating repository. */
  vcs_password?: string;
  /** The type of version control system you are migrating from. */
  vcs?: "subversion" | "tfvc" | "git" | "mercurial";
  /** For a tfvc import, the name of the project that is being imported. */
  tfvc_project?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<Import>
```

<sub>`PATCH /repos/{owner}/{repo}/import` · `migrations/update-import`</sub>

## `github.migrations.startImport`

Start an import — [API reference](https://docs.github.com/rest/migrations/source-imports#start-an-import)

```ts
github.migrations.startImport(input: {
  /** The URL of the originating repository. */
  vcs_url: string;
  /** The originating VCS type. Without this parameter, the import job will take additional time to detect the VCS type before beginning the import. This detection step will be reflected in the response. */
  vcs?: "subversion" | "git" | "mercurial" | "tfvc";
  /** If authentication is required, the username to provide to `vcs_url`. */
  vcs_username?: string;
  /** If authentication is required, the password to provide to `vcs_url`. */
  vcs_password?: string;
  /** For a tfvc import, the name of the project that is being imported. */
  tfvc_project?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<Import>
```

<sub>`PUT /repos/{owner}/{repo}/import` · `migrations/start-import`</sub>

## `github.migrations.getCommitAuthors`

Get commit authors — [API reference](https://docs.github.com/rest/migrations/source-imports#get-commit-authors)

```ts
github.migrations.getCommitAuthors(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** A user ID. Only return users with an ID greater than this ID. */
  since?: number;
}): Promise<(PorterAuthor)[]>
```

<sub>`GET /repos/{owner}/{repo}/import/authors` · `migrations/get-commit-authors`</sub>

## `github.migrations.mapCommitAuthor`

Map a commit author — [API reference](https://docs.github.com/rest/migrations/source-imports#map-a-commit-author)

```ts
github.migrations.mapCommitAuthor(input: {
  /** The new Git author email. */
  email?: string;
  /** The new Git author name. */
  name?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  author_id: number;
}): Promise<PorterAuthor>
```

<sub>`PATCH /repos/{owner}/{repo}/import/authors/{author_id}` · `migrations/map-commit-author`</sub>

## `github.migrations.getLargeFiles`

Get large files — [API reference](https://docs.github.com/rest/migrations/source-imports#get-large-files)

```ts
github.migrations.getLargeFiles(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<(PorterLargeFile)[]>
```

<sub>`GET /repos/{owner}/{repo}/import/large_files` · `migrations/get-large-files`</sub>

## `github.migrations.setLfsPreference`

Update Git LFS preference — [API reference](https://docs.github.com/rest/migrations/source-imports#update-git-lfs-preference)

```ts
github.migrations.setLfsPreference(input: {
  /** Whether to store large files during the import. `opt_in` means large files will be stored using Git LFS. `opt_out` means large files will be removed during the import. */
  use_lfs: "opt_in" | "opt_out";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<Import>
```

<sub>`PATCH /repos/{owner}/{repo}/import/lfs` · `migrations/set-lfs-preference`</sub>

## `github.migrations.listForAuthenticatedUser`

List user migrations — [API reference](https://docs.github.com/rest/migrations/users#list-user-migrations)

```ts
github.migrations.listForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Migration)[]>
```

<sub>`GET /user/migrations` · `migrations/list-for-authenticated-user`</sub>

## `github.migrations.startForAuthenticatedUser`

Start a user migration — [API reference](https://docs.github.com/rest/migrations/users#start-a-user-migration)

```ts
github.migrations.startForAuthenticatedUser(input: {
  /** Lock the repositories being migrated at the start of the migration */
  lock_repositories?: boolean;
  /** Indicates whether metadata should be excluded and only git source should be included for the migration. */
  exclude_metadata?: boolean;
  /** Indicates whether the repository git data should be excluded from the migration. */
  exclude_git_data?: boolean;
  /** Do not include attachments in the migration */
  exclude_attachments?: boolean;
  /** Do not include releases in the migration */
  exclude_releases?: boolean;
  /** Indicates whether projects owned by the organization or users should be excluded. */
  exclude_owner_projects?: boolean;
  /** Indicates whether this should only include organization metadata (repositories array should be empty and will ignore other flags). */
  org_metadata_only?: boolean;
  /** Exclude attributes from the API response to improve performance */
  exclude?: ("repositories")[];
  repositories: (string)[];
}): Promise<Migration>
```

<sub>`POST /user/migrations` · `migrations/start-for-authenticated-user`</sub>

## `github.migrations.getStatusForAuthenticatedUser`

Get a user migration status — [API reference](https://docs.github.com/rest/migrations/users#get-a-user-migration-status)

```ts
github.migrations.getStatusForAuthenticatedUser(input: {
  /** The unique identifier of the migration. */
  migration_id: number;
  exclude?: (string)[];
}): Promise<Migration>
```

<sub>`GET /user/migrations/{migration_id}` · `migrations/get-status-for-authenticated-user`</sub>

## `github.migrations.deleteArchiveForAuthenticatedUser`

Delete a user migration archive — [API reference](https://docs.github.com/rest/migrations/users#delete-a-user-migration-archive)

```ts
github.migrations.deleteArchiveForAuthenticatedUser(input: {
  /** The unique identifier of the migration. */
  migration_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /user/migrations/{migration_id}/archive` · `migrations/delete-archive-for-authenticated-user`</sub>

## `github.migrations.getArchiveForAuthenticatedUser`

Download a user migration archive — [API reference](https://docs.github.com/rest/migrations/users#download-a-user-migration-archive)

```ts
github.migrations.getArchiveForAuthenticatedUser(input: {
  /** The unique identifier of the migration. */
  migration_id: number;
}): Promise<BasicError>
```

<sub>`GET /user/migrations/{migration_id}/archive` · `migrations/get-archive-for-authenticated-user`</sub>

## `github.migrations.unlockRepoForAuthenticatedUser`

Unlock a user repository — [API reference](https://docs.github.com/rest/migrations/users#unlock-a-user-repository)

```ts
github.migrations.unlockRepoForAuthenticatedUser(input: {
  /** The unique identifier of the migration. */
  migration_id: number;
  /** repo_name parameter */
  repo_name: string;
}): Promise<BasicError>
```

<sub>`DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock` · `migrations/unlock-repo-for-authenticated-user`</sub>

## `github.migrations.listReposForAuthenticatedUser`

List repositories for a user migration — [API reference](https://docs.github.com/rest/migrations/users#list-repositories-for-a-user-migration)

```ts
github.migrations.listReposForAuthenticatedUser(input: {
  /** The unique identifier of the migration. */
  migration_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /user/migrations/{migration_id}/repositories` · `migrations/list-repos-for-authenticated-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
