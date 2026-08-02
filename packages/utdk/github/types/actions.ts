import type { ActionsArtifactAndLogRetentionResponse, ActionsCacheList, ActionsCacheRetentionLimitForEnterprise, ActionsCacheRetentionLimitForOrganization, ActionsCacheRetentionLimitForRepository, ActionsCacheStorageLimitForEnterprise, ActionsCacheStorageLimitForOrganization, ActionsCacheStorageLimitForRepository, ActionsCacheUsageByRepository, ActionsCacheUsageOrgEnterprise, ActionsCanApprovePullRequestReviews, ActionsDefaultWorkflowPermissions, ActionsEnabled, ActionsForkPrContributorApproval, ActionsForkPrWorkflowsPrivateRepos, ActionsGetDefaultWorkflowPermissions, ActionsHostedRunner, ActionsHostedRunnerCuratedImage, ActionsHostedRunnerCustomImage, ActionsHostedRunnerCustomImageVersion, ActionsHostedRunnerLimits, ActionsHostedRunnerMachineSpec, ActionsOrganizationPermissions, ActionsPublicKey, ActionsRepositoryPermissions, ActionsSecret, ActionsVariable, ActionsWorkflowAccessToRepository, AllowedActions, Artifact, AuthenticationToken, BasicError, ConcurrencyGroup, ConcurrencyGroupList, ConcurrencyGroupRunList, Deployment, EmptyObject, EnabledRepositories, EnvironmentApprovals, Job, MinimalRepository, OidcCustomSubRepo, OrganizationActionsSecret, OrganizationActionsVariable, PendingDeployment, Repository, ReviewCustomGatesCommentRequired, ReviewCustomGatesStateRequired, Runner, RunnerApplication, RunnerGroupsOrg, RunnerLabel, SelectedActions, SelfHostedRunnersSettings, ShaPinningRequired, ValidationErrorSimple, Workflow, WorkflowDispatchResponse, WorkflowRun, WorkflowRunUsage, WorkflowUsage } from "./schemas.js";

export type ActionsOperations = {
  /**
   * Get GitHub Actions cache retention limit for an enterprise
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-retention-limit-for-an-enterprise
   */
  getActionsCacheRetentionLimitForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<ActionsCacheRetentionLimitForEnterprise>;

  /**
   * Set GitHub Actions cache retention limit for an enterprise
   * @see https://docs.github.com/rest/actions/cache#set-github-actions-cache-retention-limit-for-an-enterprise
   */
  setActionsCacheRetentionLimitForEnterprise: (input: {
    /** For repositories & organizations in an enterprise, the maximum duration, in days, for which caches in a repository may be retained. */
    max_cache_retention_days?: number;
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache storage limit for an enterprise
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-storage-limit-for-an-enterprise
   */
  getActionsCacheStorageLimitForEnterprise: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<ActionsCacheStorageLimitForEnterprise>;

  /**
   * Set GitHub Actions cache storage limit for an enterprise
   * @see https://docs.github.com/rest/actions/cache#set-github-actions-cache-storage-limit-for-an-enterprise
   */
  setActionsCacheStorageLimitForEnterprise: (input: {
    /** For repositories & organizations in an enterprise, the maximum size limit for the sum of all caches in a repository, in gigabytes. */
    max_cache_size_gb?: number;
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache retention limit for an organization
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-retention-limit-for-an-organization
   */
  getActionsCacheRetentionLimitForOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsCacheRetentionLimitForOrganization>;

  /**
   * Set GitHub Actions cache retention limit for an organization
   * @see https://docs.github.com/rest/actions/cache#set-github-actions-cache-retention-limit-for-an-organization
   */
  setActionsCacheRetentionLimitForOrganization: (input: {
    /** For repositories in this organization, the maximum duration, in days, for which caches in a repository may be retained. */
    max_cache_retention_days?: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache storage limit for an organization
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-storage-limit-for-an-organization
   */
  getActionsCacheStorageLimitForOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsCacheStorageLimitForOrganization>;

  /**
   * Set GitHub Actions cache storage limit for an organization
   * @see https://docs.github.com/rest/actions/cache#set-github-actions-cache-storage-limit-for-an-organization
   */
  setActionsCacheStorageLimitForOrganization: (input: {
    /** For repositories in the organization, the maximum size limit for the sum of all caches in a repository, in gigabytes. */
    max_cache_size_gb?: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache usage for an organization
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-usage-for-an-organization
   */
  getActionsCacheUsageForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsCacheUsageOrgEnterprise>;

  /**
   * List repositories with GitHub Actions cache usage for an organization
   * @see https://docs.github.com/rest/actions/cache#list-repositories-with-github-actions-cache-usage-for-an-organization
   */
  getActionsCacheUsageByRepoForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; repository_cache_usages: (ActionsCacheUsageByRepository)[] }>;

  /**
   * List GitHub-hosted runners for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#list-github-hosted-runners-for-an-organization
   */
  listHostedRunnersForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; runners: (ActionsHostedRunner)[] }>;

  /**
   * Create a GitHub-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#create-a-github-hosted-runner-for-an-organization
   */
  createHostedRunnerForOrg: (input: {
    /** Name of the runner. Must be between 1 and 64 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'. */
    name: string;
    /** The image of runner. To list all available images, use `GET /actions/hosted-runners/images/github-owned` or `GET /actions/hosted-runners/images/partner`. */
    image: { id?: string; source?: "github" | "partner" | "custom"; version?: string | null };
    /** The machine size of the runner. To list available sizes, use `GET actions/hosted-runners/machine-sizes` */
    size: string;
    /** The existing runner group to add this runner to. */
    runner_group_id: number;
    /** The maximum amount of runners to scale up to. Runners will not auto-scale above this number. Use this setting to limit your cost. */
    maximum_runners?: number;
    /** Whether this runner should be created with a static public IP. Note limit on account. To list limits on account, use `GET actions/hosted-runners/limits` */
    enable_static_ip?: boolean;
    /** Whether this runner should be used to generate custom images. */
    image_gen?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsHostedRunner>;

  /**
   * List custom images for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#list-custom-images-for-an-organization
   */
  listCustomImagesForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; images: (ActionsHostedRunnerCustomImage)[] }>;

  /**
   * Get a custom image definition for GitHub Actions Hosted Runners
   * @see https://docs.github.com/rest/actions/hosted-runners#get-a-custom-image-definition-for-github-actions-hosted-runners
   */
  getCustomImageForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Image definition ID of custom image */
    image_definition_id: number;
  }) => Promise<ActionsHostedRunnerCustomImage>;

  /**
   * Delete a custom image from the organization
   * @see https://docs.github.com/rest/actions/hosted-runners#delete-a-custom-image-from-the-organization
   */
  deleteCustomImageFromOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Image definition ID of custom image */
    image_definition_id: number;
  }) => Promise<unknown>;

  /**
   * List image versions of a custom image for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#list-image-versions-of-a-custom-image-for-an-organization
   */
  listCustomImageVersionsForOrg: (input: {
    /** Image definition ID of custom image */
    image_definition_id: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; image_versions: (ActionsHostedRunnerCustomImageVersion)[] }>;

  /**
   * Get an image version of a custom image for GitHub Actions Hosted Runners
   * @see https://docs.github.com/rest/actions/hosted-runners#get-an-image-version-of-a-custom-image-for-github-actions-hosted-runners
   */
  getCustomImageVersionForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Image definition ID of custom image */
    image_definition_id: number;
    /** Version of a custom image */
    version: string;
  }) => Promise<ActionsHostedRunnerCustomImageVersion>;

  /**
   * Delete an image version of custom image from the organization
   * @see https://docs.github.com/rest/actions/hosted-runners#delete-an-image-version-of-custom-image-from-the-organization
   */
  deleteCustomImageVersionFromOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Image definition ID of custom image */
    image_definition_id: number;
    /** Version of a custom image */
    version: string;
  }) => Promise<unknown>;

  /**
   * Get GitHub-owned images for GitHub-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#get-github-owned-images-for-github-hosted-runners-in-an-organization
   */
  getHostedRunnersGithubOwnedImagesForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; images: (ActionsHostedRunnerCuratedImage)[] }>;

  /**
   * Get partner images for GitHub-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#get-partner-images-for-github-hosted-runners-in-an-organization
   */
  getHostedRunnersPartnerImagesForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; images: (ActionsHostedRunnerCuratedImage)[] }>;

  /**
   * Get limits on GitHub-hosted runners for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#get-limits-on-github-hosted-runners-for-an-organization
   */
  getHostedRunnersLimitsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsHostedRunnerLimits>;

  /**
   * Get GitHub-hosted runners machine specs for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#get-github-hosted-runners-machine-specs-for-an-organization
   */
  getHostedRunnersMachineSpecsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; machine_specs: (ActionsHostedRunnerMachineSpec)[] }>;

  /**
   * Get platforms for GitHub-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#get-platforms-for-github-hosted-runners-in-an-organization
   */
  getHostedRunnersPlatformsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ total_count: number; platforms: (string)[] }>;

  /**
   * Get a GitHub-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#get-a-github-hosted-runner-for-an-organization
   */
  getHostedRunnerForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the GitHub-hosted runner. */
    hosted_runner_id: number;
  }) => Promise<ActionsHostedRunner>;

  /**
   * Update a GitHub-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#update-a-github-hosted-runner-for-an-organization
   */
  updateHostedRunnerForOrg: (input: {
    /** Name of the runner. Must be between 1 and 64 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'. */
    name?: string;
    /** The existing runner group to add this runner to. */
    runner_group_id?: number;
    /** The maximum amount of runners to scale up to. Runners will not auto-scale above this number. Use this setting to limit your cost. */
    maximum_runners?: number;
    /** Whether this runner should be updated with a static public IP. Note limit on account. To list limits on account, use `GET actions/hosted-runners/limits` */
    enable_static_ip?: boolean;
    /** The machine size of the runner. To list available sizes, use `GET actions/hosted-runners/machine-sizes` */
    size?: string;
    /** The source type of the runner image to use. Must match the source of the image specified by `image_id`. Can be one of `github`, `partner`, or `custom`. */
    image_source?: "github" | "partner" | "custom";
    /** The unique identifier of the runner image. To list available images, use `GET /actions/hosted-runners/images/github-owned`, `GET /actions/hosted-runners/images/partner`, or `GET /actions/hosted-runners/images/custom`. */
    image_id?: string;
    /** The version of the runner image to deploy. This is relevant only for runners using custom images. */
    image_version?: string | null;
    /** Whether to enable image generation for this runner pool. When enabled, the runner pool is used to build and publish custom runner images. */
    image_gen?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the GitHub-hosted runner. */
    hosted_runner_id: number;
  }) => Promise<ActionsHostedRunner>;

  /**
   * Delete a GitHub-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/hosted-runners#delete-a-github-hosted-runner-for-an-organization
   */
  deleteHostedRunnerForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the GitHub-hosted runner. */
    hosted_runner_id: number;
  }) => Promise<ActionsHostedRunner>;

  /**
   * Get GitHub Actions permissions for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-github-actions-permissions-for-an-organization
   */
  getGithubActionsPermissionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsOrganizationPermissions>;

  /**
   * Set GitHub Actions permissions for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-github-actions-permissions-for-an-organization
   */
  setGithubActionsPermissionsOrganization: (input: {
    enabled_repositories: EnabledRepositories;
    allowed_actions?: AllowedActions;
    sha_pinning_required?: ShaPinningRequired;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * Get artifact and log retention settings for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-artifact-and-log-retention-settings-for-an-organization
   */
  getArtifactAndLogRetentionSettingsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsArtifactAndLogRetentionResponse>;

  /**
   * Set artifact and log retention settings for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-artifact-and-log-retention-settings-for-an-organization
   */
  setArtifactAndLogRetentionSettingsOrganization: (input: {
    /** The number of days to retain artifacts and logs */
    days: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Get fork PR contributor approval permissions for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-fork-pr-contributor-approval-permissions-for-an-organization
   */
  getForkPrContributorApprovalPermissionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsForkPrContributorApproval>;

  /**
   * Set fork PR contributor approval permissions for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-fork-pr-contributor-approval-permissions-for-an-organization
   */
  setForkPrContributorApprovalPermissionsOrganization: (input: {
    /** The policy that controls when fork PR workflows require approval from a maintainer. */
    approval_policy: "first_time_contributors_new_to_github" | "first_time_contributors" | "all_external_contributors";
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Get private repo fork PR workflow settings for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-private-repo-fork-pr-workflow-settings-for-an-organization
   */
  getPrivateRepoForkPrWorkflowsSettingsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsForkPrWorkflowsPrivateRepos>;

  /**
   * Set private repo fork PR workflow settings for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-private-repo-fork-pr-workflow-settings-for-an-organization
   */
  setPrivateRepoForkPrWorkflowsSettingsOrganization: (input: {
    /** Whether workflows triggered by pull requests from forks are allowed to run on private repositories. */
    run_workflows_from_fork_pull_requests: boolean;
    /** Whether GitHub Actions can create pull requests or submit approving pull request reviews from a workflow triggered by a fork pull request. */
    send_write_tokens_to_workflows?: boolean;
    /** Whether to make secrets and variables available to workflows triggered by pull requests from forks. */
    send_secrets_and_variables?: boolean;
    /** Whether workflows triggered by pull requests from forks require approval from a repository administrator to run. */
    require_approval_for_fork_pr_workflows?: boolean;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * List selected repositories enabled for GitHub Actions in an organization
   * @see https://docs.github.com/rest/actions/permissions#list-selected-repositories-enabled-for-github-actions-in-an-organization
   */
  listSelectedRepositoriesEnabledGithubActionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; repositories: (Repository)[] }>;

  /**
   * Set selected repositories enabled for GitHub Actions in an organization
   * @see https://docs.github.com/rest/actions/permissions#set-selected-repositories-enabled-for-github-actions-in-an-organization
   */
  setSelectedRepositoriesEnabledGithubActionsOrganization: (input: {
    /** List of repository IDs to enable for GitHub Actions. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * Enable a selected repository for GitHub Actions in an organization
   * @see https://docs.github.com/rest/actions/permissions#enable-a-selected-repository-for-github-actions-in-an-organization
   */
  enableSelectedRepositoryGithubActionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Disable a selected repository for GitHub Actions in an organization
   * @see https://docs.github.com/rest/actions/permissions#disable-a-selected-repository-for-github-actions-in-an-organization
   */
  disableSelectedRepositoryGithubActionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Get allowed actions and reusable workflows for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-allowed-actions-and-reusable-workflows-for-an-organization
   */
  getAllowedActionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<SelectedActions>;

  /**
   * Set allowed actions and reusable workflows for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-allowed-actions-and-reusable-workflows-for-an-organization
   */
  setAllowedActionsOrganization: (input: {
    /** Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization. */
    github_owned_allowed?: boolean;
    /** Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators. */
    verified_allowed?: boolean;
    /** Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.  > [!NOTE] > The `patterns_allowed` setting only applies to public repositories. */
    patterns_allowed?: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * Get self-hosted runners settings for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-self-hosted-runners-settings-for-an-organization
   */
  getSelfHostedRunnersPermissionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<SelfHostedRunnersSettings>;

  /**
   * Set self-hosted runners settings for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-self-hosted-runners-settings-for-an-organization
   */
  setSelfHostedRunnersPermissionsOrganization: (input: {
    /** The policy that controls whether self-hosted runners can be used in the organization */
    enabled_repositories: "all" | "selected" | "none";
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * List repositories allowed to use self-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/permissions#list-repositories-allowed-to-use-self-hosted-runners-in-an-organization
   */
  listSelectedRepositoriesSelfHostedRunnersOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count?: number; repositories?: (Repository)[] }>;

  /**
   * Set repositories allowed to use self-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/permissions#set-repositories-allowed-to-use-self-hosted-runners-in-an-organization
   */
  setSelectedRepositoriesSelfHostedRunnersOrganization: (input: {
    /** IDs of repositories that can use repository-level self-hosted runners */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Add a repository to the list of repositories allowed to use self-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/permissions#add-a-repository-to-the-list-of-repositories-allowed-to-use-self-hosted-runners-in-an-organization
   */
  enableSelectedRepositorySelfHostedRunnersOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Remove a repository from the list of repositories allowed to use self-hosted runners in an organization
   * @see https://docs.github.com/rest/actions/permissions#remove-a-repository-from-the-list-of-repositories-allowed-to-use-self-hosted-runners-in-an-organization
   */
  disableSelectedRepositorySelfHostedRunnersOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Get default workflow permissions for an organization
   * @see https://docs.github.com/rest/actions/permissions#get-default-workflow-permissions-for-an-organization
   */
  getGithubActionsDefaultWorkflowPermissionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsGetDefaultWorkflowPermissions>;

  /**
   * Set default workflow permissions for an organization
   * @see https://docs.github.com/rest/actions/permissions#set-default-workflow-permissions-for-an-organization
   */
  setGithubActionsDefaultWorkflowPermissionsOrganization: (input: {
    default_workflow_permissions?: ActionsDefaultWorkflowPermissions;
    can_approve_pull_request_reviews?: ActionsCanApprovePullRequestReviews;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * List self-hosted runner groups for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#list-self-hosted-runner-groups-for-an-organization
   */
  listSelfHostedRunnerGroupsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Only return runner groups that are allowed to be used by this repository. */
    visible_to_repository?: string;
  }) => Promise<{ total_count: number; runner_groups: (RunnerGroupsOrg)[] }>;

  /**
   * Create a self-hosted runner group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#create-a-self-hosted-runner-group-for-an-organization
   */
  createSelfHostedRunnerGroupForOrg: (input: {
    /** Name of the runner group. */
    name: string;
    /** Visibility of a runner group. You can select all repositories, select individual repositories, or limit access to private repositories. */
    visibility?: "selected" | "all" | "private";
    /** List of repository IDs that can access the runner group. */
    selected_repository_ids?: (number)[];
    /** List of runner IDs to add to the runner group. */
    runners?: (number)[];
    /** Whether the runner group can be used by `public` repositories. */
    allows_public_repositories?: boolean;
    /** If `true`, the runner group will be restricted to running only the workflows specified in the `selected_workflows` array. */
    restricted_to_workflows?: boolean;
    /** List of workflows the runner group should be allowed to run. This setting will be ignored unless `restricted_to_workflows` is set to `true`. */
    selected_workflows?: (string)[];
    /** The identifier of a hosted compute network configuration. */
    network_configuration_id?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<RunnerGroupsOrg>;

  /**
   * Get a self-hosted runner group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#get-a-self-hosted-runner-group-for-an-organization
   */
  getSelfHostedRunnerGroupForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
  }) => Promise<RunnerGroupsOrg>;

  /**
   * Update a self-hosted runner group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#update-a-self-hosted-runner-group-for-an-organization
   */
  updateSelfHostedRunnerGroupForOrg: (input: {
    /** Name of the runner group. */
    name: string;
    /** Visibility of a runner group. You can select all repositories, select individual repositories, or all private repositories. */
    visibility?: "selected" | "all" | "private";
    /** Whether the runner group can be used by `public` repositories. */
    allows_public_repositories?: boolean;
    /** If `true`, the runner group will be restricted to running only the workflows specified in the `selected_workflows` array. */
    restricted_to_workflows?: boolean;
    /** List of workflows the runner group should be allowed to run. This setting will be ignored unless `restricted_to_workflows` is set to `true`. */
    selected_workflows?: (string)[];
    /** The identifier of a hosted compute network configuration. */
    network_configuration_id?: string | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
  }) => Promise<RunnerGroupsOrg>;

  /**
   * Delete a self-hosted runner group from an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#delete-a-self-hosted-runner-group-from-an-organization
   */
  deleteSelfHostedRunnerGroupFromOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
  }) => Promise<unknown>;

  /**
   * List GitHub-hosted runners in a group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#list-github-hosted-runners-in-a-group-for-an-organization
   */
  listGithubHostedRunnersInGroupForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; runners: (ActionsHostedRunner)[] }>;

  /**
   * List repository access to a self-hosted runner group in an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#list-repository-access-to-a-self-hosted-runner-group-in-an-organization
   */
  listRepoAccessToSelfHostedRunnerGroupInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<{ total_count: number; repositories: (MinimalRepository)[] }>;

  /**
   * Set repository access for a self-hosted runner group in an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#set-repository-access-for-a-self-hosted-runner-group-in-an-organization
   */
  setRepoAccessToSelfHostedRunnerGroupInOrg: (input: {
    /** List of repository IDs that can access the runner group. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
  }) => Promise<unknown>;

  /**
   * Add repository access to a self-hosted runner group in an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#add-repository-access-to-a-self-hosted-runner-group-in-an-organization
   */
  addRepoAccessToSelfHostedRunnerGroupInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * Remove repository access to a self-hosted runner group in an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#remove-repository-access-to-a-self-hosted-runner-group-in-an-organization
   */
  removeRepoAccessToSelfHostedRunnerGroupInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * List self-hosted runners in a group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#list-self-hosted-runners-in-a-group-for-an-organization
   */
  listSelfHostedRunnersInGroupForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; runners: (Runner)[] }>;

  /**
   * Set self-hosted runners in a group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#set-self-hosted-runners-in-a-group-for-an-organization
   */
  setSelfHostedRunnersInGroupForOrg: (input: {
    /** List of runner IDs to add to the runner group. */
    runners: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
  }) => Promise<unknown>;

  /**
   * Add a self-hosted runner to a group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#add-a-self-hosted-runner-to-a-group-for-an-organization
   */
  addSelfHostedRunnerToGroupForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<unknown>;

  /**
   * Remove a self-hosted runner from a group for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runner-groups#remove-a-self-hosted-runner-from-a-group-for-an-organization
   */
  removeSelfHostedRunnerFromGroupForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner group. */
    runner_group_id: number;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<unknown>;

  /**
   * List self-hosted runners for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#list-self-hosted-runners-for-an-organization
   */
  listSelfHostedRunnersForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of a self-hosted runner. */
    name?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; runners: (Runner)[] }>;

  /**
   * List runner applications for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#list-runner-applications-for-an-organization
   */
  listRunnerApplicationsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<(RunnerApplication)[]>;

  /**
   * Create configuration for a just-in-time runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#create-configuration-for-a-just-in-time-runner-for-an-organization
   */
  generateRunnerJitconfigForOrg: (input: {
    /** The name of the new runner. */
    name: string;
    /** The ID of the runner group to register the runner to. */
    runner_group_id: number;
    /** The names of the custom labels to add to the runner. **Minimum items**: 1. **Maximum items**: 100. */
    labels: (string)[];
    /** The working directory to be used for job execution, relative to the runner install directory. */
    work_folder?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ runner: Runner; encoded_jit_config: string }>;

  /**
   * Create a registration token for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#create-a-registration-token-for-an-organization
   */
  createRegistrationTokenForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<AuthenticationToken>;

  /**
   * Create a remove token for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#create-a-remove-token-for-an-organization
   */
  createRemoveTokenForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<AuthenticationToken>;

  /**
   * Get a self-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#get-a-self-hosted-runner-for-an-organization
   */
  getSelfHostedRunnerForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<Runner>;

  /**
   * Delete a self-hosted runner from an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#delete-a-self-hosted-runner-from-an-organization
   */
  deleteSelfHostedRunnerFromOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<ValidationErrorSimple>;

  /**
   * List labels for a self-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#list-labels-for-a-self-hosted-runner-for-an-organization
   */
  listLabelsForSelfHostedRunnerForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Add custom labels to a self-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#add-custom-labels-to-a-self-hosted-runner-for-an-organization
   */
  addCustomLabelsToSelfHostedRunnerForOrg: (input: {
    /** The names of the custom labels to add to the runner. */
    labels: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Set custom labels for a self-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#set-custom-labels-for-a-self-hosted-runner-for-an-organization
   */
  setCustomLabelsForSelfHostedRunnerForOrg: (input: {
    /** The names of the custom labels to set for the runner. You can pass an empty array to remove all custom labels. */
    labels: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Remove all custom labels from a self-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#remove-all-custom-labels-from-a-self-hosted-runner-for-an-organization
   */
  removeAllCustomLabelsFromSelfHostedRunnerForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Remove a custom label from a self-hosted runner for an organization
   * @see https://docs.github.com/rest/actions/self-hosted-runners#remove-a-custom-label-from-a-self-hosted-runner-for-an-organization
   */
  removeCustomLabelFromSelfHostedRunnerForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
    /** The name of a self-hosted runner's custom label. */
    name: string;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * List organization secrets
   * @see https://docs.github.com/rest/actions/secrets#list-organization-secrets
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
   * @see https://docs.github.com/rest/actions/secrets#get-an-organization-public-key
   */
  getOrgPublicKey: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ActionsPublicKey>;

  /**
   * Get an organization secret
   * @see https://docs.github.com/rest/actions/secrets#get-an-organization-secret
   */
  getOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<OrganizationActionsSecret>;

  /**
   * Create or update an organization secret
   * @see https://docs.github.com/rest/actions/secrets#create-or-update-an-organization-secret
   */
  createOrUpdateOrgSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get an organization public key](https://docs.github.com/rest/actions/secrets#get-an-organization-public-key) endpoint. */
    encrypted_value: string;
    /** ID of the key you used to encrypt the secret. */
    key_id: string;
    /** Which type of organization repositories have access to the organization secret. `selected` means only the repositories specified by `selected_repository_ids` can access the secret. */
    visibility: "all" | "private" | "selected";
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can manage the list of selected repositories using the [List selected repositories for an organization secret](https://docs.github.com/rest/actions/secrets#list-selected-repositories-for-an-organization-secret), [Set selected repositories for an organization secret](https://docs.github.com/rest/actions/secrets#set-selected-repositories-for-an-organization-secret), and [Remove selected repository from an organization secret](https://docs.github.com/rest/actions/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids?: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete an organization secret
   * @see https://docs.github.com/rest/actions/secrets#delete-an-organization-secret
   */
  deleteOrgSecret: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for an organization secret
   * @see https://docs.github.com/rest/actions/secrets#list-selected-repositories-for-an-organization-secret
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
   * @see https://docs.github.com/rest/actions/secrets#set-selected-repositories-for-an-organization-secret
   */
  setSelectedReposForOrgSecret: (input: {
    /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Add selected repository to an organization secret](https://docs.github.com/rest/actions/secrets#add-selected-repository-to-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/actions/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * Add selected repository to an organization secret
   * @see https://docs.github.com/rest/actions/secrets#add-selected-repository-to-an-organization-secret
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
   * @see https://docs.github.com/rest/actions/secrets#remove-selected-repository-from-an-organization-secret
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
   * @see https://docs.github.com/rest/actions/variables#list-organization-variables
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
   * @see https://docs.github.com/rest/actions/variables#create-an-organization-variable
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
   * @see https://docs.github.com/rest/actions/variables#get-an-organization-variable
   */
  getOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<OrganizationActionsVariable>;

  /**
   * Update an organization variable
   * @see https://docs.github.com/rest/actions/variables#update-an-organization-variable
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
   * @see https://docs.github.com/rest/actions/variables#delete-an-organization-variable
   */
  deleteOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<unknown>;

  /**
   * List selected repositories for an organization variable
   * @see https://docs.github.com/rest/actions/variables#list-selected-repositories-for-an-organization-variable
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
   * @see https://docs.github.com/rest/actions/variables#set-selected-repositories-for-an-organization-variable
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
   * @see https://docs.github.com/rest/actions/variables#add-selected-repository-to-an-organization-variable
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
   * @see https://docs.github.com/rest/actions/variables#remove-selected-repository-from-an-organization-variable
   */
  removeSelectedRepoFromOrgVariable: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The name of the variable. */
    name: string;
    repository_id: number;
  }) => Promise<unknown>;

  /**
   * List artifacts for a repository
   * @see https://docs.github.com/rest/actions/artifacts#list-artifacts-for-a-repository
   */
  listArtifactsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The name field of an artifact. When specified, only artifacts with this name will be returned. */
    name?: string;
  }) => Promise<{ total_count: number; artifacts: (Artifact)[] }>;

  /**
   * Get an artifact
   * @see https://docs.github.com/rest/actions/artifacts#get-an-artifact
   */
  getArtifact: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the artifact. */
    artifact_id: number;
  }) => Promise<Artifact>;

  /**
   * Delete an artifact
   * @see https://docs.github.com/rest/actions/artifacts#delete-an-artifact
   */
  deleteArtifact: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the artifact. */
    artifact_id: number;
  }) => Promise<unknown>;

  /**
   * Download an artifact
   * @see https://docs.github.com/rest/actions/artifacts#download-an-artifact
   */
  downloadArtifact: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the artifact. */
    artifact_id: number;
    archive_format: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache retention limit for a repository
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-retention-limit-for-a-repository
   */
  getActionsCacheRetentionLimitForRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsCacheRetentionLimitForRepository>;

  /**
   * Set GitHub Actions cache retention limit for a repository
   * @see https://docs.github.com/rest/actions/cache#set-github-actions-cache-retention-limit-for-a-repository
   */
  setActionsCacheRetentionLimitForRepository: (input: {
    /** The maximum number of days to keep caches in this repository. */
    max_cache_retention_days?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache storage limit for a repository
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-storage-limit-for-a-repository
   */
  getActionsCacheStorageLimitForRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsCacheStorageLimitForRepository>;

  /**
   * Set GitHub Actions cache storage limit for a repository
   * @see https://docs.github.com/rest/actions/cache#set-github-actions-cache-storage-limit-for-a-repository
   */
  setActionsCacheStorageLimitForRepository: (input: {
    /** The maximum total cache size for this repository, in gigabytes. */
    max_cache_size_gb?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get GitHub Actions cache usage for a repository
   * @see https://docs.github.com/rest/actions/cache#get-github-actions-cache-usage-for-a-repository
   */
  getActionsCacheUsage: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsCacheUsageByRepository>;

  /**
   * List GitHub Actions caches for a repository
   * @see https://docs.github.com/rest/actions/cache#list-github-actions-caches-for-a-repository
   */
  getActionsCacheList: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The full Git reference for narrowing down the cache. The `ref` for a branch should be formatted as `refs/heads/<branch name>`. To reference a pull request use `refs/pull/<number>/merge`. */
    ref?: string;
    /** An explicit key or prefix for identifying the cache */
    key?: string;
    /** The property to sort the results by. `created_at` means when the cache was created. `last_accessed_at` means when the cache was last accessed. `size_in_bytes` is the size of the cache in bytes. */
    sort?: "created_at" | "last_accessed_at" | "size_in_bytes";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
  }) => Promise<ActionsCacheList>;

  /**
   * Delete GitHub Actions caches for a repository (using a cache key)
   * @see https://docs.github.com/rest/actions/cache#delete-github-actions-caches-for-a-repository-using-a-cache-key
   */
  deleteActionsCacheByKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** A key for identifying the cache. */
    key: string;
    /** The full Git reference for narrowing down the cache. The `ref` for a branch should be formatted as `refs/heads/<branch name>`. To reference a pull request use `refs/pull/<number>/merge`. */
    ref?: string;
  }) => Promise<ActionsCacheList>;

  /**
   * Delete a GitHub Actions cache for a repository (using a cache ID)
   * @see https://docs.github.com/rest/actions/cache#delete-a-github-actions-cache-for-a-repository-using-a-cache-id
   */
  deleteActionsCacheById: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the GitHub Actions cache. */
    cache_id: number;
  }) => Promise<unknown>;

  /**
   * List concurrency groups for a repository
   * @see https://docs.github.com/rest/actions/concurrency-groups#list-concurrency-groups-for-a-repository
   */
  listConcurrencyGroupsForRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
  }) => Promise<ConcurrencyGroupList>;

  /**
   * Get a concurrency group for a repository
   * @see https://docs.github.com/rest/actions/concurrency-groups#get-a-concurrency-group-for-a-repository
   */
  getConcurrencyGroupForRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the concurrency group. */
    concurrency_group_name: string;
    /** Filter to items ahead of this workflow run ID in the queue, plus the run itself. Matches workflow-level concurrency and reusable-workflow leases held on behalf of the run. Mutually exclusive with `ahead_of_job`. */
    ahead_of_run?: number;
    /** Filter to items ahead of this job ID in the queue, plus the job itself. Matches job-level concurrency and reusable-workflow leases on the job's ancestor paths. Mutually exclusive with `ahead_of_run`. */
    ahead_of_job?: number;
  }) => Promise<ConcurrencyGroup>;

  /**
   * Get a job for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-jobs#get-a-job-for-a-workflow-run
   */
  getJobForWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the job. */
    job_id: number;
  }) => Promise<Job>;

  /**
   * Download job logs for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-jobs#download-job-logs-for-a-workflow-run
   */
  downloadJobLogsForWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the job. */
    job_id: number;
  }) => Promise<unknown>;

  /**
   * Re-run a job from a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#re-run-a-job-from-a-workflow-run
   */
  reRunJobForWorkflowRun: (input: {
    /** Whether to enable debug logging for the re-run. */
    enable_debug_logging?: boolean;
    /** Whether to enable the debugger for the re-run of this job. */
    enable_debugger?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the job. */
    job_id: number;
  }) => Promise<EmptyObject>;

  /**
   * Get the customization template for an OIDC subject claim for a repository
   * @see https://docs.github.com/rest/actions/oidc#get-the-customization-template-for-an-oidc-subject-claim-for-a-repository
   */
  getCustomOidcSubClaimForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<OidcCustomSubRepo>;

  /**
   * Set the customization template for an OIDC subject claim for a repository
   * @see https://docs.github.com/rest/actions/oidc#set-the-customization-template-for-an-oidc-subject-claim-for-a-repository
   */
  setCustomOidcSubClaimForRepo: (input: {
    /** Whether to use the default template or not. If `true`, the `include_claim_keys` field is ignored. */
    use_default: boolean;
    /** Array of unique strings. Each claim key can only contain alphanumeric characters and underscores. */
    include_claim_keys?: (string)[];
    /** Whether to opt in to the immutable OIDC subject claim format for this repository. When `true`, OIDC tokens will use a stable, repository-ID-based `sub` claim. */
    use_immutable_subject?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<EmptyObject>;

  /**
   * List repository organization secrets
   * @see https://docs.github.com/rest/actions/secrets#list-repository-organization-secrets
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
   * @see https://docs.github.com/rest/actions/variables#list-repository-organization-variables
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
   * Get GitHub Actions permissions for a repository
   * @see https://docs.github.com/rest/actions/permissions#get-github-actions-permissions-for-a-repository
   */
  getGithubActionsPermissionsRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsRepositoryPermissions>;

  /**
   * Set GitHub Actions permissions for a repository
   * @see https://docs.github.com/rest/actions/permissions#set-github-actions-permissions-for-a-repository
   */
  setGithubActionsPermissionsRepository: (input: {
    enabled: ActionsEnabled;
    allowed_actions?: AllowedActions;
    sha_pinning_required?: ShaPinningRequired;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Get the level of access for workflows outside of the repository
   * @see https://docs.github.com/rest/actions/permissions#get-the-level-of-access-for-workflows-outside-of-the-repository
   */
  getWorkflowAccessToRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsWorkflowAccessToRepository>;

  /**
   * Set the level of access for workflows outside of the repository
   * @see https://docs.github.com/rest/actions/permissions#set-the-level-of-access-for-workflows-outside-of-the-repository
   */
  setWorkflowAccessToRepository: (input: {
    /** Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the repository.  `none` means the access is only possible from workflows in this repository. `user` level access allows sharing across user owned private repositories only. `organization` level access allows sharing across the organization. */
    access_level: "none" | "user" | "organization";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Get artifact and log retention settings for a repository
   * @see https://docs.github.com/rest/actions/permissions#get-artifact-and-log-retention-settings-for-a-repository
   */
  getArtifactAndLogRetentionSettingsRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsArtifactAndLogRetentionResponse>;

  /**
   * Set artifact and log retention settings for a repository
   * @see https://docs.github.com/rest/actions/permissions#set-artifact-and-log-retention-settings-for-a-repository
   */
  setArtifactAndLogRetentionSettingsRepository: (input: {
    /** The number of days to retain artifacts and logs */
    days: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get fork PR contributor approval permissions for a repository
   * @see https://docs.github.com/rest/actions/permissions#get-fork-pr-contributor-approval-permissions-for-a-repository
   */
  getForkPrContributorApprovalPermissionsRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsForkPrContributorApproval>;

  /**
   * Set fork PR contributor approval permissions for a repository
   * @see https://docs.github.com/rest/actions/permissions#set-fork-pr-contributor-approval-permissions-for-a-repository
   */
  setForkPrContributorApprovalPermissionsRepository: (input: {
    /** The policy that controls when fork PR workflows require approval from a maintainer. */
    approval_policy: "first_time_contributors_new_to_github" | "first_time_contributors" | "all_external_contributors";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get private repo fork PR workflow settings for a repository
   * @see https://docs.github.com/rest/actions/permissions#get-private-repo-fork-pr-workflow-settings-for-a-repository
   */
  getPrivateRepoForkPrWorkflowsSettingsRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsForkPrWorkflowsPrivateRepos>;

  /**
   * Set private repo fork PR workflow settings for a repository
   * @see https://docs.github.com/rest/actions/permissions#set-private-repo-fork-pr-workflow-settings-for-a-repository
   */
  setPrivateRepoForkPrWorkflowsSettingsRepository: (input: {
    /** Whether workflows triggered by pull requests from forks are allowed to run on private repositories. */
    run_workflows_from_fork_pull_requests: boolean;
    /** Whether GitHub Actions can create pull requests or submit approving pull request reviews from a workflow triggered by a fork pull request. */
    send_write_tokens_to_workflows?: boolean;
    /** Whether to make secrets and variables available to workflows triggered by pull requests from forks. */
    send_secrets_and_variables?: boolean;
    /** Whether workflows triggered by pull requests from forks require approval from a repository administrator to run. */
    require_approval_for_fork_pr_workflows?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get allowed actions and reusable workflows for a repository
   * @see https://docs.github.com/rest/actions/permissions#get-allowed-actions-and-reusable-workflows-for-a-repository
   */
  getAllowedActionsRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<SelectedActions>;

  /**
   * Set allowed actions and reusable workflows for a repository
   * @see https://docs.github.com/rest/actions/permissions#set-allowed-actions-and-reusable-workflows-for-a-repository
   */
  setAllowedActionsRepository: (input: {
    /** Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization. */
    github_owned_allowed?: boolean;
    /** Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators. */
    verified_allowed?: boolean;
    /** Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.  > [!NOTE] > The `patterns_allowed` setting only applies to public repositories. */
    patterns_allowed?: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Get default workflow permissions for a repository
   * @see https://docs.github.com/rest/actions/permissions#get-default-workflow-permissions-for-a-repository
   */
  getGithubActionsDefaultWorkflowPermissionsRepository: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsGetDefaultWorkflowPermissions>;

  /**
   * Set default workflow permissions for a repository
   * @see https://docs.github.com/rest/actions/permissions#set-default-workflow-permissions-for-a-repository
   */
  setGithubActionsDefaultWorkflowPermissionsRepository: (input: {
    default_workflow_permissions?: ActionsDefaultWorkflowPermissions;
    can_approve_pull_request_reviews?: ActionsCanApprovePullRequestReviews;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * List self-hosted runners for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#list-self-hosted-runners-for-a-repository
   */
  listSelfHostedRunnersForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of a self-hosted runner. */
    name?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; runners: (Runner)[] }>;

  /**
   * List runner applications for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#list-runner-applications-for-a-repository
   */
  listRunnerApplicationsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(RunnerApplication)[]>;

  /**
   * Create configuration for a just-in-time runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#create-configuration-for-a-just-in-time-runner-for-a-repository
   */
  generateRunnerJitconfigForRepo: (input: {
    /** The name of the new runner. */
    name: string;
    /** The ID of the runner group to register the runner to. */
    runner_group_id: number;
    /** The names of the custom labels to add to the runner. **Minimum items**: 1. **Maximum items**: 100. */
    labels: (string)[];
    /** The working directory to be used for job execution, relative to the runner install directory. */
    work_folder?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ runner: Runner; encoded_jit_config: string }>;

  /**
   * Create a registration token for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#create-a-registration-token-for-a-repository
   */
  createRegistrationTokenForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<AuthenticationToken>;

  /**
   * Create a remove token for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#create-a-remove-token-for-a-repository
   */
  createRemoveTokenForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<AuthenticationToken>;

  /**
   * Get a self-hosted runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#get-a-self-hosted-runner-for-a-repository
   */
  getSelfHostedRunnerForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<Runner>;

  /**
   * Delete a self-hosted runner from a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#delete-a-self-hosted-runner-from-a-repository
   */
  deleteSelfHostedRunnerFromRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<ValidationErrorSimple>;

  /**
   * List labels for a self-hosted runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#list-labels-for-a-self-hosted-runner-for-a-repository
   */
  listLabelsForSelfHostedRunnerForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Add custom labels to a self-hosted runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#add-custom-labels-to-a-self-hosted-runner-for-a-repository
   */
  addCustomLabelsToSelfHostedRunnerForRepo: (input: {
    /** The names of the custom labels to add to the runner. */
    labels: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Set custom labels for a self-hosted runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#set-custom-labels-for-a-self-hosted-runner-for-a-repository
   */
  setCustomLabelsForSelfHostedRunnerForRepo: (input: {
    /** The names of the custom labels to set for the runner. You can pass an empty array to remove all custom labels. */
    labels: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Remove all custom labels from a self-hosted runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#remove-all-custom-labels-from-a-self-hosted-runner-for-a-repository
   */
  removeAllCustomLabelsFromSelfHostedRunnerForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * Remove a custom label from a self-hosted runner for a repository
   * @see https://docs.github.com/rest/actions/self-hosted-runners#remove-a-custom-label-from-a-self-hosted-runner-for-a-repository
   */
  removeCustomLabelFromSelfHostedRunnerForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Unique identifier of the self-hosted runner. */
    runner_id: number;
    /** The name of a self-hosted runner's custom label. */
    name: string;
  }) => Promise<{ total_count: number; labels: (RunnerLabel)[] }>;

  /**
   * List workflow runs for a repository
   * @see https://docs.github.com/rest/actions/workflow-runs#list-workflow-runs-for-a-repository
   */
  listWorkflowRunsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Returns someone's workflow runs. Use the login for the user who created the `push` associated with the check suite or workflow run. */
    actor?: string;
    /** Returns workflow runs associated with a branch. Use the name of the branch of the `push`. */
    branch?: string;
    /** Returns workflow run triggered by the event you specify. For example, `push`, `pull_request` or `issue`. For more information, see "[Events that trigger workflows](https://docs.github.com/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)." */
    event?: string;
    /** Returns workflow runs with the check run `status` or `conclusion` that you specify. For example, a conclusion can be `success` or a status can be `in_progress`. Only GitHub Actions can set a status of `waiting`, `pending`, or `requested`. */
    status?: "completed" | "action_required" | "cancelled" | "failure" | "neutral" | "skipped" | "stale" | "success" | "timed_out" | "in_progress" | "queued" | "requested" | "waiting" | "pending";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Returns workflow runs created within the given date-time range. For more information on the syntax, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
    created?: string;
    /** If `true` pull requests are omitted from the response (empty array). */
    exclude_pull_requests?: boolean;
    /** Returns workflow runs with the `check_suite_id` that you specify. */
    check_suite_id?: number;
    /** Only returns workflow runs that are associated with the specified `head_sha`. */
    head_sha?: string;
  }) => Promise<{ total_count: number; workflow_runs: (WorkflowRun)[] }>;

  /**
   * Get a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#get-a-workflow-run
   */
  getWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** If `true` pull requests are omitted from the response (empty array). */
    exclude_pull_requests?: boolean;
  }) => Promise<WorkflowRun>;

  /**
   * Delete a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#delete-a-workflow-run
   */
  deleteWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<unknown>;

  /**
   * Get the review history for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#get-the-review-history-for-a-workflow-run
   */
  getReviewsForRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<(EnvironmentApprovals)[]>;

  /**
   * Approve a workflow run for a fork pull request
   * @see https://docs.github.com/rest/actions/workflow-runs#approve-a-workflow-run-for-a-fork-pull-request
   */
  approveWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<EmptyObject>;

  /**
   * List workflow run artifacts
   * @see https://docs.github.com/rest/actions/artifacts#list-workflow-run-artifacts
   */
  listWorkflowRunArtifacts: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The name field of an artifact. When specified, only artifacts with this name will be returned. */
    name?: string;
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
  }) => Promise<{ total_count: number; artifacts: (Artifact)[] }>;

  /**
   * Get a workflow run attempt
   * @see https://docs.github.com/rest/actions/workflow-runs#get-a-workflow-run-attempt
   */
  getWorkflowRunAttempt: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** The attempt number of the workflow run. */
    attempt_number: number;
    /** If `true` pull requests are omitted from the response (empty array). */
    exclude_pull_requests?: boolean;
  }) => Promise<WorkflowRun>;

  /**
   * List jobs for a workflow run attempt
   * @see https://docs.github.com/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run-attempt
   */
  listJobsForWorkflowRunAttempt: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** The attempt number of the workflow run. */
    attempt_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; jobs: (Job)[] }>;

  /**
   * Download workflow run attempt logs
   * @see https://docs.github.com/rest/actions/workflow-runs#download-workflow-run-attempt-logs
   */
  downloadWorkflowRunAttemptLogs: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** The attempt number of the workflow run. */
    attempt_number: number;
  }) => Promise<unknown>;

  /**
   * Cancel a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#cancel-a-workflow-run
   */
  cancelWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<EmptyObject>;

  /**
   * List concurrency groups for a workflow run
   * @see https://docs.github.com/rest/actions/concurrency-groups#list-concurrency-groups-for-a-workflow-run
   */
  listConcurrencyGroupsForWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    before?: string;
    /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    after?: string;
  }) => Promise<ConcurrencyGroupRunList>;

  /**
   * Review custom deployment protection rules for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#review-custom-deployment-protection-rules-for-a-workflow-run
   */
  reviewCustomGatesForRun: (input: {
    body: ReviewCustomGatesCommentRequired | ReviewCustomGatesStateRequired;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<unknown>;

  /**
   * Force cancel a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#force-cancel-a-workflow-run
   */
  forceCancelWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<EmptyObject>;

  /**
   * List jobs for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run
   */
  listJobsForWorkflowRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
    /** Filters jobs by their `completed_at` timestamp. `latest` returns jobs from the most recent execution of the workflow run. `all` returns all jobs for a workflow run, including from old executions of the workflow run. */
    filter?: "latest" | "all";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; jobs: (Job)[] }>;

  /**
   * Download workflow run logs
   * @see https://docs.github.com/rest/actions/workflow-runs#download-workflow-run-logs
   */
  downloadWorkflowRunLogs: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<unknown>;

  /**
   * Delete workflow run logs
   * @see https://docs.github.com/rest/actions/workflow-runs#delete-workflow-run-logs
   */
  deleteWorkflowRunLogs: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<BasicError>;

  /**
   * Get pending deployments for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#get-pending-deployments-for-a-workflow-run
   */
  getPendingDeploymentsForRun: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<(PendingDeployment)[]>;

  /**
   * Review pending deployments for a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#review-pending-deployments-for-a-workflow-run
   */
  reviewPendingDeploymentsForRun: (input: {
    /** The list of environment ids to approve or reject */
    environment_ids: (number)[];
    /** Whether to approve or reject deployment to the specified environments. */
    state: "approved" | "rejected";
    /** A comment to accompany the deployment review */
    comment: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<(Deployment)[]>;

  /**
   * Re-run a workflow
   * @see https://docs.github.com/rest/actions/workflow-runs#re-run-a-workflow
   */
  reRunWorkflow: (input: {
    /** Whether to enable debug logging for the re-run. */
    enable_debug_logging?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<EmptyObject>;

  /**
   * Re-run failed jobs from a workflow run
   * @see https://docs.github.com/rest/actions/workflow-runs#re-run-failed-jobs-from-a-workflow-run
   */
  reRunWorkflowFailedJobs: (input: {
    /** Whether to enable debug logging for the re-run. */
    enable_debug_logging?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<EmptyObject>;

  /**
   * Get workflow run usage
   * @see https://docs.github.com/rest/actions/workflow-runs#get-workflow-run-usage
   */
  getWorkflowRunUsage: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the workflow run. */
    run_id: number;
  }) => Promise<WorkflowRunUsage>;

  /**
   * List repository secrets
   * @see https://docs.github.com/rest/actions/secrets#list-repository-secrets
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
   * @see https://docs.github.com/rest/actions/secrets#get-a-repository-public-key
   */
  getRepoPublicKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<ActionsPublicKey>;

  /**
   * Get a repository secret
   * @see https://docs.github.com/rest/actions/secrets#get-a-repository-secret
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
   * @see https://docs.github.com/rest/actions/secrets#create-or-update-a-repository-secret
   */
  createOrUpdateRepoSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get a repository public key](https://docs.github.com/rest/actions/secrets#get-a-repository-public-key) endpoint. */
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
   * @see https://docs.github.com/rest/actions/secrets#delete-a-repository-secret
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
   * @see https://docs.github.com/rest/actions/variables#list-repository-variables
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
   * @see https://docs.github.com/rest/actions/variables#create-a-repository-variable
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
   * @see https://docs.github.com/rest/actions/variables#get-a-repository-variable
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
   * @see https://docs.github.com/rest/actions/variables#update-a-repository-variable
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
   * @see https://docs.github.com/rest/actions/variables#delete-a-repository-variable
   */
  deleteRepoVariable: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<unknown>;

  /**
   * List repository workflows
   * @see https://docs.github.com/rest/actions/workflows#list-repository-workflows
   */
  listRepoWorkflows: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; workflows: (Workflow)[] }>;

  /**
   * Get a workflow
   * @see https://docs.github.com/rest/actions/workflows#get-a-workflow
   */
  getWorkflow: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the workflow. You can also pass the workflow file name as a string. */
    workflow_id: number | string;
  }) => Promise<Workflow>;

  /**
   * Disable a workflow
   * @see https://docs.github.com/rest/actions/workflows#disable-a-workflow
   */
  disableWorkflow: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the workflow. You can also pass the workflow file name as a string. */
    workflow_id: number | string;
  }) => Promise<unknown>;

  /**
   * Create a workflow dispatch event
   * @see https://docs.github.com/rest/actions/workflows#create-a-workflow-dispatch-event
   */
  createWorkflowDispatch: (input: {
    /** The git reference for the workflow. The reference can be a branch or tag name. */
    ref: string;
    /** Input keys and values configured in the workflow file. The maximum number of properties is 25. Any default properties configured in the workflow file will be used when `inputs` are omitted. */
    inputs?: { [key: string]: unknown };
    /** Whether the response should include the workflow run ID and URLs. */
    return_run_details?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the workflow. You can also pass the workflow file name as a string. */
    workflow_id: number | string;
  }) => Promise<WorkflowDispatchResponse>;

  /**
   * Enable a workflow
   * @see https://docs.github.com/rest/actions/workflows#enable-a-workflow
   */
  enableWorkflow: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the workflow. You can also pass the workflow file name as a string. */
    workflow_id: number | string;
  }) => Promise<unknown>;

  /**
   * List workflow runs for a workflow
   * @see https://docs.github.com/rest/actions/workflow-runs#list-workflow-runs-for-a-workflow
   */
  listWorkflowRuns: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the workflow. You can also pass the workflow file name as a string. */
    workflow_id: number | string;
    /** Returns someone's workflow runs. Use the login for the user who created the `push` associated with the check suite or workflow run. */
    actor?: string;
    /** Returns workflow runs associated with a branch. Use the name of the branch of the `push`. */
    branch?: string;
    /** Returns workflow run triggered by the event you specify. For example, `push`, `pull_request` or `issue`. For more information, see "[Events that trigger workflows](https://docs.github.com/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows)." */
    event?: string;
    /** Returns workflow runs with the check run `status` or `conclusion` that you specify. For example, a conclusion can be `success` or a status can be `in_progress`. Only GitHub Actions can set a status of `waiting`, `pending`, or `requested`. */
    status?: "completed" | "action_required" | "cancelled" | "failure" | "neutral" | "skipped" | "stale" | "success" | "timed_out" | "in_progress" | "queued" | "requested" | "waiting" | "pending";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Returns workflow runs created within the given date-time range. For more information on the syntax, see "[Understanding the search syntax](https://docs.github.com/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax#query-for-dates)." */
    created?: string;
    /** If `true` pull requests are omitted from the response (empty array). */
    exclude_pull_requests?: boolean;
    /** Returns workflow runs with the `check_suite_id` that you specify. */
    check_suite_id?: number;
    /** Only returns workflow runs that are associated with the specified `head_sha`. */
    head_sha?: string;
  }) => Promise<{ total_count: number; workflow_runs: (WorkflowRun)[] }>;

  /**
   * Get workflow usage
   * @see https://docs.github.com/rest/actions/workflows#get-workflow-usage
   */
  getWorkflowUsage: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The ID of the workflow. You can also pass the workflow file name as a string. */
    workflow_id: number | string;
  }) => Promise<WorkflowUsage>;

  /**
   * List environment secrets
   * @see https://docs.github.com/rest/actions/secrets#list-environment-secrets
   */
  listEnvironmentSecrets: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; secrets: (ActionsSecret)[] }>;

  /**
   * Get an environment public key
   * @see https://docs.github.com/rest/actions/secrets#get-an-environment-public-key
   */
  getEnvironmentPublicKey: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<ActionsPublicKey>;

  /**
   * Get an environment secret
   * @see https://docs.github.com/rest/actions/secrets#get-an-environment-secret
   */
  getEnvironmentSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<ActionsSecret>;

  /**
   * Create or update an environment secret
   * @see https://docs.github.com/rest/actions/secrets#create-or-update-an-environment-secret
   */
  createOrUpdateEnvironmentSecret: (input: {
    /** Value for your secret, encrypted with [LibSodium](https://libsodium.gitbook.io/doc/bindings_for_other_languages) using the public key retrieved from the [Get an environment public key](https://docs.github.com/rest/actions/secrets#get-an-environment-public-key) endpoint. */
    encrypted_value: string;
    /** ID of the key you used to encrypt the secret. */
    key_id: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Delete an environment secret
   * @see https://docs.github.com/rest/actions/secrets#delete-an-environment-secret
   */
  deleteEnvironmentSecret: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the secret. */
    secret_name: string;
  }) => Promise<unknown>;

  /**
   * List environment variables
   * @see https://docs.github.com/rest/actions/variables#list-environment-variables
   */
  listEnvironmentVariables: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; variables: (ActionsVariable)[] }>;

  /**
   * Create an environment variable
   * @see https://docs.github.com/rest/actions/variables#create-an-environment-variable
   */
  createEnvironmentVariable: (input: {
    /** The name of the variable. */
    name: string;
    /** The value of the variable. */
    value: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<EmptyObject>;

  /**
   * Get an environment variable
   * @see https://docs.github.com/rest/actions/variables#get-an-environment-variable
   */
  getEnvironmentVariable: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
    /** The name of the variable. */
    name: string;
  }) => Promise<ActionsVariable>;

  /**
   * Update an environment variable
   * @see https://docs.github.com/rest/actions/variables#update-an-environment-variable
   */
  updateEnvironmentVariable: (input: {
    /** The name of the variable. */
    name?: string;
    /** The value of the variable. */
    value?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }, options: { params: { name: string } }) => Promise<unknown>;

  /**
   * Delete an environment variable
   * @see https://docs.github.com/rest/actions/variables#delete-an-environment-variable
   */
  deleteEnvironmentVariable: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The name of the variable. */
    name: string;
    /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
    environment_name: string;
  }) => Promise<unknown>;
};
