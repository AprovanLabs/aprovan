import type { BasicError, Import, Migration, MinimalRepository, PorterAuthor, PorterLargeFile } from "./schemas.js";

export type MigrationsOperations = {
  /**
   * List organization migrations
   * @see https://docs.github.com/rest/migrations/orgs#list-organization-migrations
   */
  listForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Exclude attributes from the API response to improve performance */
    exclude?: ("repositories")[];
  }) => Promise<(Migration)[]>;

  /**
   * Start an organization migration
   * @see https://docs.github.com/rest/migrations/orgs#start-an-organization-migration
   */
  startForOrg: (input: {
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
  }) => Promise<Migration>;

  /**
   * Get an organization migration status
   * @see https://docs.github.com/rest/migrations/orgs#get-an-organization-migration-status
   */
  getStatusForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the migration. */
    migration_id: number;
    /** Exclude attributes from the API response to improve performance */
    exclude?: ("repositories")[];
  }) => Promise<Migration>;

  /**
   * Download an organization migration archive
   * @see https://docs.github.com/rest/migrations/orgs#download-an-organization-migration-archive
   */
  downloadArchiveForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the migration. */
    migration_id: number;
  }) => Promise<BasicError>;

  /**
   * Delete an organization migration archive
   * @see https://docs.github.com/rest/migrations/orgs#delete-an-organization-migration-archive
   */
  deleteArchiveForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the migration. */
    migration_id: number;
  }) => Promise<BasicError>;

  /**
   * Unlock an organization repository
   * @see https://docs.github.com/rest/migrations/orgs#unlock-an-organization-repository
   */
  unlockRepoForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the migration. */
    migration_id: number;
    /** repo_name parameter */
    repo_name: string;
  }) => Promise<BasicError>;

  /**
   * List repositories in an organization migration
   * @see https://docs.github.com/rest/migrations/orgs#list-repositories-in-an-organization-migration
   */
  listReposForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the migration. */
    migration_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * Get an import status
   * @see https://docs.github.com/rest/migrations/source-imports#get-an-import-status
   */
  getImportStatus: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Import>;

  /**
   * Start an import
   * @see https://docs.github.com/rest/migrations/source-imports#start-an-import
   */
  startImport: (input: {
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
  }) => Promise<Import>;

  /**
   * Update an import
   * @see https://docs.github.com/rest/migrations/source-imports#update-an-import
   */
  updateImport: (input: {
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
  }) => Promise<Import>;

  /**
   * Cancel an import
   * @see https://docs.github.com/rest/migrations/source-imports#cancel-an-import
   */
  cancelImport: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get commit authors
   * @see https://docs.github.com/rest/migrations/source-imports#get-commit-authors
   */
  getCommitAuthors: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** A user ID. Only return users with an ID greater than this ID. */
    since?: number;
  }) => Promise<(PorterAuthor)[]>;

  /**
   * Map a commit author
   * @see https://docs.github.com/rest/migrations/source-imports#map-a-commit-author
   */
  mapCommitAuthor: (input: {
    /** The new Git author email. */
    email?: string;
    /** The new Git author name. */
    name?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    author_id: number;
  }) => Promise<PorterAuthor>;

  /**
   * Get large files
   * @see https://docs.github.com/rest/migrations/source-imports#get-large-files
   */
  getLargeFiles: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(PorterLargeFile)[]>;

  /**
   * Update Git LFS preference
   * @see https://docs.github.com/rest/migrations/source-imports#update-git-lfs-preference
   */
  setLfsPreference: (input: {
    /** Whether to store large files during the import. `opt_in` means large files will be stored using Git LFS. `opt_out` means large files will be removed during the import. */
    use_lfs: "opt_in" | "opt_out";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Import>;

  /**
   * List user migrations
   * @see https://docs.github.com/rest/migrations/users#list-user-migrations
   */
  listForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Migration)[]>;

  /**
   * Start a user migration
   * @see https://docs.github.com/rest/migrations/users#start-a-user-migration
   */
  startForAuthenticatedUser: (input: {
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
  }) => Promise<Migration>;

  /**
   * Get a user migration status
   * @see https://docs.github.com/rest/migrations/users#get-a-user-migration-status
   */
  getStatusForAuthenticatedUser: (input: {
    /** The unique identifier of the migration. */
    migration_id: number;
    exclude?: (string)[];
  }) => Promise<Migration>;

  /**
   * Download a user migration archive
   * @see https://docs.github.com/rest/migrations/users#download-a-user-migration-archive
   */
  getArchiveForAuthenticatedUser: (input: {
    /** The unique identifier of the migration. */
    migration_id: number;
  }) => Promise<BasicError>;

  /**
   * Delete a user migration archive
   * @see https://docs.github.com/rest/migrations/users#delete-a-user-migration-archive
   */
  deleteArchiveForAuthenticatedUser: (input: {
    /** The unique identifier of the migration. */
    migration_id: number;
  }) => Promise<BasicError>;

  /**
   * Unlock a user repository
   * @see https://docs.github.com/rest/migrations/users#unlock-a-user-repository
   */
  unlockRepoForAuthenticatedUser: (input: {
    /** The unique identifier of the migration. */
    migration_id: number;
    /** repo_name parameter */
    repo_name: string;
  }) => Promise<BasicError>;

  /**
   * List repositories for a user migration
   * @see https://docs.github.com/rest/migrations/users#list-repositories-for-a-user-migration
   */
  listReposForAuthenticatedUser: (input: {
    /** The unique identifier of the migration. */
    migration_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;
};
