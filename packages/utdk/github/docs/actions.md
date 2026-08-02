# Actions

187 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.actions.getActionsCacheRetentionLimitForEnterprise`

Get GitHub Actions cache retention limit for an enterprise — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-retention-limit-for-an-enterprise)

```ts
github.actions.getActionsCacheRetentionLimitForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<ActionsCacheRetentionLimitForEnterprise>
```

<sub>`GET /enterprises/{enterprise}/actions/cache/retention-limit` · `actions/get-actions-cache-retention-limit-for-enterprise`</sub>

## `github.actions.setActionsCacheRetentionLimitForEnterprise`

Set GitHub Actions cache retention limit for an enterprise — [API reference](https://docs.github.com/rest/actions/cache#set-github-actions-cache-retention-limit-for-an-enterprise)

```ts
github.actions.setActionsCacheRetentionLimitForEnterprise(input: {
  /** For repositories & organizations in an enterprise, the maximum duration, in days, for which caches in a repository may be retained. */
  max_cache_retention_days?: number;
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`PUT /enterprises/{enterprise}/actions/cache/retention-limit` · `actions/set-actions-cache-retention-limit-for-enterprise`</sub>

## `github.actions.getActionsCacheStorageLimitForEnterprise`

Get GitHub Actions cache storage limit for an enterprise — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-storage-limit-for-an-enterprise)

```ts
github.actions.getActionsCacheStorageLimitForEnterprise(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<ActionsCacheStorageLimitForEnterprise>
```

<sub>`GET /enterprises/{enterprise}/actions/cache/storage-limit` · `actions/get-actions-cache-storage-limit-for-enterprise`</sub>

## `github.actions.setActionsCacheStorageLimitForEnterprise`

Set GitHub Actions cache storage limit for an enterprise — [API reference](https://docs.github.com/rest/actions/cache#set-github-actions-cache-storage-limit-for-an-enterprise)

```ts
github.actions.setActionsCacheStorageLimitForEnterprise(input: {
  /** For repositories & organizations in an enterprise, the maximum size limit for the sum of all caches in a repository, in gigabytes. */
  max_cache_size_gb?: number;
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`PUT /enterprises/{enterprise}/actions/cache/storage-limit` · `actions/set-actions-cache-storage-limit-for-enterprise`</sub>

## `github.actions.getActionsCacheRetentionLimitForOrganization`

Get GitHub Actions cache retention limit for an organization — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-retention-limit-for-an-organization)

```ts
github.actions.getActionsCacheRetentionLimitForOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsCacheRetentionLimitForOrganization>
```

<sub>`GET /organizations/{org}/actions/cache/retention-limit` · `actions/get-actions-cache-retention-limit-for-organization`</sub>

## `github.actions.setActionsCacheRetentionLimitForOrganization`

Set GitHub Actions cache retention limit for an organization — [API reference](https://docs.github.com/rest/actions/cache#set-github-actions-cache-retention-limit-for-an-organization)

```ts
github.actions.setActionsCacheRetentionLimitForOrganization(input: {
  /** For repositories in this organization, the maximum duration, in days, for which caches in a repository may be retained. */
  max_cache_retention_days?: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /organizations/{org}/actions/cache/retention-limit` · `actions/set-actions-cache-retention-limit-for-organization`</sub>

## `github.actions.getActionsCacheStorageLimitForOrganization`

Get GitHub Actions cache storage limit for an organization — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-storage-limit-for-an-organization)

```ts
github.actions.getActionsCacheStorageLimitForOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsCacheStorageLimitForOrganization>
```

<sub>`GET /organizations/{org}/actions/cache/storage-limit` · `actions/get-actions-cache-storage-limit-for-organization`</sub>

## `github.actions.setActionsCacheStorageLimitForOrganization`

Set GitHub Actions cache storage limit for an organization — [API reference](https://docs.github.com/rest/actions/cache#set-github-actions-cache-storage-limit-for-an-organization)

```ts
github.actions.setActionsCacheStorageLimitForOrganization(input: {
  /** For repositories in the organization, the maximum size limit for the sum of all caches in a repository, in gigabytes. */
  max_cache_size_gb?: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /organizations/{org}/actions/cache/storage-limit` · `actions/set-actions-cache-storage-limit-for-organization`</sub>

## `github.actions.getActionsCacheUsageForOrg`

Get GitHub Actions cache usage for an organization — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-usage-for-an-organization)

```ts
github.actions.getActionsCacheUsageForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsCacheUsageOrgEnterprise>
```

<sub>`GET /orgs/{org}/actions/cache/usage` · `actions/get-actions-cache-usage-for-org`</sub>

## `github.actions.getActionsCacheUsageByRepoForOrg`

List repositories with GitHub Actions cache usage for an organization — [API reference](https://docs.github.com/rest/actions/cache#list-repositories-with-github-actions-cache-usage-for-an-organization)

```ts
github.actions.getActionsCacheUsageByRepoForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; repository_cache_usages: (ActionsCacheUsageByRepository)[] }>
```

<sub>`GET /orgs/{org}/actions/cache/usage-by-repository` · `actions/get-actions-cache-usage-by-repo-for-org`</sub>

## `github.actions.listHostedRunnersForOrg`

List GitHub-hosted runners for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#list-github-hosted-runners-for-an-organization)

```ts
github.actions.listHostedRunnersForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; runners: (ActionsHostedRunner)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners` · `actions/list-hosted-runners-for-org`</sub>

## `github.actions.createHostedRunnerForOrg`

Create a GitHub-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#create-a-github-hosted-runner-for-an-organization)

```ts
github.actions.createHostedRunnerForOrg(input: {
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
}): Promise<ActionsHostedRunner>
```

<sub>`POST /orgs/{org}/actions/hosted-runners` · `actions/create-hosted-runner-for-org`</sub>

## `github.actions.deleteHostedRunnerForOrg`

Delete a GitHub-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#delete-a-github-hosted-runner-for-an-organization)

```ts
github.actions.deleteHostedRunnerForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the GitHub-hosted runner. */
  hosted_runner_id: number;
}): Promise<ActionsHostedRunner>
```

<sub>`DELETE /orgs/{org}/actions/hosted-runners/{hosted_runner_id}` · `actions/delete-hosted-runner-for-org`</sub>

## `github.actions.getHostedRunnerForOrg`

Get a GitHub-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-a-github-hosted-runner-for-an-organization)

```ts
github.actions.getHostedRunnerForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the GitHub-hosted runner. */
  hosted_runner_id: number;
}): Promise<ActionsHostedRunner>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/{hosted_runner_id}` · `actions/get-hosted-runner-for-org`</sub>

## `github.actions.updateHostedRunnerForOrg`

Update a GitHub-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#update-a-github-hosted-runner-for-an-organization)

```ts
github.actions.updateHostedRunnerForOrg(input: {
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
}): Promise<ActionsHostedRunner>
```

<sub>`PATCH /orgs/{org}/actions/hosted-runners/{hosted_runner_id}` · `actions/update-hosted-runner-for-org`</sub>

## `github.actions.listCustomImagesForOrg`

List custom images for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#list-custom-images-for-an-organization)

```ts
github.actions.listCustomImagesForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count: number; images: (ActionsHostedRunnerCustomImage)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/images/custom` · `actions/list-custom-images-for-org`</sub>

## `github.actions.deleteCustomImageFromOrg`

Delete a custom image from the organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#delete-a-custom-image-from-the-organization)

```ts
github.actions.deleteCustomImageFromOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Image definition ID of custom image */
  image_definition_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}` · `actions/delete-custom-image-from-org`</sub>

## `github.actions.getCustomImageForOrg`

Get a custom image definition for GitHub Actions Hosted Runners — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-a-custom-image-definition-for-github-actions-hosted-runners)

```ts
github.actions.getCustomImageForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Image definition ID of custom image */
  image_definition_id: number;
}): Promise<ActionsHostedRunnerCustomImage>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}` · `actions/get-custom-image-for-org`</sub>

## `github.actions.listCustomImageVersionsForOrg`

List image versions of a custom image for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#list-image-versions-of-a-custom-image-for-an-organization)

```ts
github.actions.listCustomImageVersionsForOrg(input: {
  /** Image definition ID of custom image */
  image_definition_id: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count: number; image_versions: (ActionsHostedRunnerCustomImageVersion)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions` · `actions/list-custom-image-versions-for-org`</sub>

## `github.actions.deleteCustomImageVersionFromOrg`

Delete an image version of custom image from the organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#delete-an-image-version-of-custom-image-from-the-organization)

```ts
github.actions.deleteCustomImageVersionFromOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Image definition ID of custom image */
  image_definition_id: number;
  /** Version of a custom image */
  version: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}` · `actions/delete-custom-image-version-from-org`</sub>

## `github.actions.getCustomImageVersionForOrg`

Get an image version of a custom image for GitHub Actions Hosted Runners — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-an-image-version-of-a-custom-image-for-github-actions-hosted-runners)

```ts
github.actions.getCustomImageVersionForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Image definition ID of custom image */
  image_definition_id: number;
  /** Version of a custom image */
  version: string;
}): Promise<ActionsHostedRunnerCustomImageVersion>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions/{version}` · `actions/get-custom-image-version-for-org`</sub>

## `github.actions.getHostedRunnersGithubOwnedImagesForOrg`

Get GitHub-owned images for GitHub-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-github-owned-images-for-github-hosted-runners-in-an-organization)

```ts
github.actions.getHostedRunnersGithubOwnedImagesForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count: number; images: (ActionsHostedRunnerCuratedImage)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/images/github-owned` · `actions/get-hosted-runners-github-owned-images-for-org`</sub>

## `github.actions.getHostedRunnersPartnerImagesForOrg`

Get partner images for GitHub-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-partner-images-for-github-hosted-runners-in-an-organization)

```ts
github.actions.getHostedRunnersPartnerImagesForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count: number; images: (ActionsHostedRunnerCuratedImage)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/images/partner` · `actions/get-hosted-runners-partner-images-for-org`</sub>

## `github.actions.getHostedRunnersLimitsForOrg`

Get limits on GitHub-hosted runners for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-limits-on-github-hosted-runners-for-an-organization)

```ts
github.actions.getHostedRunnersLimitsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsHostedRunnerLimits>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/limits` · `actions/get-hosted-runners-limits-for-org`</sub>

## `github.actions.getHostedRunnersMachineSpecsForOrg`

Get GitHub-hosted runners machine specs for an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-github-hosted-runners-machine-specs-for-an-organization)

```ts
github.actions.getHostedRunnersMachineSpecsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count: number; machine_specs: (ActionsHostedRunnerMachineSpec)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/machine-sizes` · `actions/get-hosted-runners-machine-specs-for-org`</sub>

## `github.actions.getHostedRunnersPlatformsForOrg`

Get platforms for GitHub-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/hosted-runners#get-platforms-for-github-hosted-runners-in-an-organization)

```ts
github.actions.getHostedRunnersPlatformsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ total_count: number; platforms: (string)[] }>
```

<sub>`GET /orgs/{org}/actions/hosted-runners/platforms` · `actions/get-hosted-runners-platforms-for-org`</sub>

## `github.actions.getGithubActionsPermissionsOrganization`

Get GitHub Actions permissions for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-github-actions-permissions-for-an-organization)

```ts
github.actions.getGithubActionsPermissionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsOrganizationPermissions>
```

<sub>`GET /orgs/{org}/actions/permissions` · `actions/get-github-actions-permissions-organization`</sub>

## `github.actions.setGithubActionsPermissionsOrganization`

Set GitHub Actions permissions for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-github-actions-permissions-for-an-organization)

```ts
github.actions.setGithubActionsPermissionsOrganization(input: {
  enabled_repositories: EnabledRepositories;
  allowed_actions?: AllowedActions;
  sha_pinning_required?: ShaPinningRequired;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/permissions` · `actions/set-github-actions-permissions-organization`</sub>

## `github.actions.getArtifactAndLogRetentionSettingsOrganization`

Get artifact and log retention settings for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-artifact-and-log-retention-settings-for-an-organization)

```ts
github.actions.getArtifactAndLogRetentionSettingsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsArtifactAndLogRetentionResponse>
```

<sub>`GET /orgs/{org}/actions/permissions/artifact-and-log-retention` · `actions/get-artifact-and-log-retention-settings-organization`</sub>

## `github.actions.setArtifactAndLogRetentionSettingsOrganization`

Set artifact and log retention settings for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-artifact-and-log-retention-settings-for-an-organization)

```ts
github.actions.setArtifactAndLogRetentionSettingsOrganization(input: {
  /** The number of days to retain artifacts and logs */
  days: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/actions/permissions/artifact-and-log-retention` · `actions/set-artifact-and-log-retention-settings-organization`</sub>

## `github.actions.getForkPrContributorApprovalPermissionsOrganization`

Get fork PR contributor approval permissions for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-fork-pr-contributor-approval-permissions-for-an-organization)

```ts
github.actions.getForkPrContributorApprovalPermissionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsForkPrContributorApproval>
```

<sub>`GET /orgs/{org}/actions/permissions/fork-pr-contributor-approval` · `actions/get-fork-pr-contributor-approval-permissions-organization`</sub>

## `github.actions.setForkPrContributorApprovalPermissionsOrganization`

Set fork PR contributor approval permissions for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-fork-pr-contributor-approval-permissions-for-an-organization)

```ts
github.actions.setForkPrContributorApprovalPermissionsOrganization(input: {
  /** The policy that controls when fork PR workflows require approval from a maintainer. */
  approval_policy: "first_time_contributors_new_to_github" | "first_time_contributors" | "all_external_contributors";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/actions/permissions/fork-pr-contributor-approval` · `actions/set-fork-pr-contributor-approval-permissions-organization`</sub>

## `github.actions.getPrivateRepoForkPrWorkflowsSettingsOrganization`

Get private repo fork PR workflow settings for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-private-repo-fork-pr-workflow-settings-for-an-organization)

```ts
github.actions.getPrivateRepoForkPrWorkflowsSettingsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsForkPrWorkflowsPrivateRepos>
```

<sub>`GET /orgs/{org}/actions/permissions/fork-pr-workflows-private-repos` · `actions/get-private-repo-fork-pr-workflows-settings-organization`</sub>

## `github.actions.setPrivateRepoForkPrWorkflowsSettingsOrganization`

Set private repo fork PR workflow settings for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-private-repo-fork-pr-workflow-settings-for-an-organization)

```ts
github.actions.setPrivateRepoForkPrWorkflowsSettingsOrganization(input: {
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
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/actions/permissions/fork-pr-workflows-private-repos` · `actions/set-private-repo-fork-pr-workflows-settings-organization`</sub>

## `github.actions.listSelectedRepositoriesEnabledGithubActionsOrganization`

List selected repositories enabled for GitHub Actions in an organization — [API reference](https://docs.github.com/rest/actions/permissions#list-selected-repositories-enabled-for-github-actions-in-an-organization)

```ts
github.actions.listSelectedRepositoriesEnabledGithubActionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; repositories: (Repository)[] }>
```

<sub>`GET /orgs/{org}/actions/permissions/repositories` · `actions/list-selected-repositories-enabled-github-actions-organization`</sub>

## `github.actions.setSelectedRepositoriesEnabledGithubActionsOrganization`

Set selected repositories enabled for GitHub Actions in an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-selected-repositories-enabled-for-github-actions-in-an-organization)

```ts
github.actions.setSelectedRepositoriesEnabledGithubActionsOrganization(input: {
  /** List of repository IDs to enable for GitHub Actions. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/permissions/repositories` · `actions/set-selected-repositories-enabled-github-actions-organization`</sub>

## `github.actions.disableSelectedRepositoryGithubActionsOrganization`

Disable a selected repository for GitHub Actions in an organization — [API reference](https://docs.github.com/rest/actions/permissions#disable-a-selected-repository-for-github-actions-in-an-organization)

```ts
github.actions.disableSelectedRepositoryGithubActionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}` · `actions/disable-selected-repository-github-actions-organization`</sub>

## `github.actions.enableSelectedRepositoryGithubActionsOrganization`

Enable a selected repository for GitHub Actions in an organization — [API reference](https://docs.github.com/rest/actions/permissions#enable-a-selected-repository-for-github-actions-in-an-organization)

```ts
github.actions.enableSelectedRepositoryGithubActionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/permissions/repositories/{repository_id}` · `actions/enable-selected-repository-github-actions-organization`</sub>

## `github.actions.getAllowedActionsOrganization`

Get allowed actions and reusable workflows for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-allowed-actions-and-reusable-workflows-for-an-organization)

```ts
github.actions.getAllowedActionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<SelectedActions>
```

<sub>`GET /orgs/{org}/actions/permissions/selected-actions` · `actions/get-allowed-actions-organization`</sub>

## `github.actions.setAllowedActionsOrganization`

Set allowed actions and reusable workflows for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-allowed-actions-and-reusable-workflows-for-an-organization)

```ts
github.actions.setAllowedActionsOrganization(input: {
  /** Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization. */
  github_owned_allowed?: boolean;
  /** Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators. */
  verified_allowed?: boolean;
  /** Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.  > [!NOTE] > The `patterns_allowed` setting only applies to public repositories. */
  patterns_allowed?: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/permissions/selected-actions` · `actions/set-allowed-actions-organization`</sub>

## `github.actions.getSelfHostedRunnersPermissionsOrganization`

Get self-hosted runners settings for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-self-hosted-runners-settings-for-an-organization)

```ts
github.actions.getSelfHostedRunnersPermissionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<SelfHostedRunnersSettings>
```

<sub>`GET /orgs/{org}/actions/permissions/self-hosted-runners` · `actions/get-self-hosted-runners-permissions-organization`</sub>

## `github.actions.setSelfHostedRunnersPermissionsOrganization`

Set self-hosted runners settings for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-self-hosted-runners-settings-for-an-organization)

```ts
github.actions.setSelfHostedRunnersPermissionsOrganization(input: {
  /** The policy that controls whether self-hosted runners can be used in the organization */
  enabled_repositories: "all" | "selected" | "none";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/actions/permissions/self-hosted-runners` · `actions/set-self-hosted-runners-permissions-organization`</sub>

## `github.actions.listSelectedRepositoriesSelfHostedRunnersOrganization`

List repositories allowed to use self-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/permissions#list-repositories-allowed-to-use-self-hosted-runners-in-an-organization)

```ts
github.actions.listSelectedRepositoriesSelfHostedRunnersOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count?: number; repositories?: (Repository)[] }>
```

<sub>`GET /orgs/{org}/actions/permissions/self-hosted-runners/repositories` · `actions/list-selected-repositories-self-hosted-runners-organization`</sub>

## `github.actions.setSelectedRepositoriesSelfHostedRunnersOrganization`

Set repositories allowed to use self-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-repositories-allowed-to-use-self-hosted-runners-in-an-organization)

```ts
github.actions.setSelectedRepositoriesSelfHostedRunnersOrganization(input: {
  /** IDs of repositories that can use repository-level self-hosted runners */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/actions/permissions/self-hosted-runners/repositories` · `actions/set-selected-repositories-self-hosted-runners-organization`</sub>

## `github.actions.disableSelectedRepositorySelfHostedRunnersOrganization`

Remove a repository from the list of repositories allowed to use self-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/permissions#remove-a-repository-from-the-list-of-repositories-allowed-to-use-self-hosted-runners-in-an-organization)

```ts
github.actions.disableSelectedRepositorySelfHostedRunnersOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}` · `actions/disable-selected-repository-self-hosted-runners-organization`</sub>

## `github.actions.enableSelectedRepositorySelfHostedRunnersOrganization`

Add a repository to the list of repositories allowed to use self-hosted runners in an organization — [API reference](https://docs.github.com/rest/actions/permissions#add-a-repository-to-the-list-of-repositories-allowed-to-use-self-hosted-runners-in-an-organization)

```ts
github.actions.enableSelectedRepositorySelfHostedRunnersOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/actions/permissions/self-hosted-runners/repositories/{repository_id}` · `actions/enable-selected-repository-self-hosted-runners-organization`</sub>

## `github.actions.getGithubActionsDefaultWorkflowPermissionsOrganization`

Get default workflow permissions for an organization — [API reference](https://docs.github.com/rest/actions/permissions#get-default-workflow-permissions-for-an-organization)

```ts
github.actions.getGithubActionsDefaultWorkflowPermissionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsGetDefaultWorkflowPermissions>
```

<sub>`GET /orgs/{org}/actions/permissions/workflow` · `actions/get-github-actions-default-workflow-permissions-organization`</sub>

## `github.actions.setGithubActionsDefaultWorkflowPermissionsOrganization`

Set default workflow permissions for an organization — [API reference](https://docs.github.com/rest/actions/permissions#set-default-workflow-permissions-for-an-organization)

```ts
github.actions.setGithubActionsDefaultWorkflowPermissionsOrganization(input: {
  default_workflow_permissions?: ActionsDefaultWorkflowPermissions;
  can_approve_pull_request_reviews?: ActionsCanApprovePullRequestReviews;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/permissions/workflow` · `actions/set-github-actions-default-workflow-permissions-organization`</sub>

## `github.actions.listSelfHostedRunnerGroupsForOrg`

List self-hosted runner groups for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#list-self-hosted-runner-groups-for-an-organization)

```ts
github.actions.listSelfHostedRunnerGroupsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** Only return runner groups that are allowed to be used by this repository. */
  visible_to_repository?: string;
}): Promise<{ total_count: number; runner_groups: (RunnerGroupsOrg)[] }>
```

<sub>`GET /orgs/{org}/actions/runner-groups` · `actions/list-self-hosted-runner-groups-for-org`</sub>

## `github.actions.createSelfHostedRunnerGroupForOrg`

Create a self-hosted runner group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#create-a-self-hosted-runner-group-for-an-organization)

```ts
github.actions.createSelfHostedRunnerGroupForOrg(input: {
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
}): Promise<RunnerGroupsOrg>
```

<sub>`POST /orgs/{org}/actions/runner-groups` · `actions/create-self-hosted-runner-group-for-org`</sub>

## `github.actions.deleteSelfHostedRunnerGroupFromOrg`

Delete a self-hosted runner group from an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#delete-a-self-hosted-runner-group-from-an-organization)

```ts
github.actions.deleteSelfHostedRunnerGroupFromOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/runner-groups/{runner_group_id}` · `actions/delete-self-hosted-runner-group-from-org`</sub>

## `github.actions.getSelfHostedRunnerGroupForOrg`

Get a self-hosted runner group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#get-a-self-hosted-runner-group-for-an-organization)

```ts
github.actions.getSelfHostedRunnerGroupForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
}): Promise<RunnerGroupsOrg>
```

<sub>`GET /orgs/{org}/actions/runner-groups/{runner_group_id}` · `actions/get-self-hosted-runner-group-for-org`</sub>

## `github.actions.updateSelfHostedRunnerGroupForOrg`

Update a self-hosted runner group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#update-a-self-hosted-runner-group-for-an-organization)

```ts
github.actions.updateSelfHostedRunnerGroupForOrg(input: {
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
}): Promise<RunnerGroupsOrg>
```

<sub>`PATCH /orgs/{org}/actions/runner-groups/{runner_group_id}` · `actions/update-self-hosted-runner-group-for-org`</sub>

## `github.actions.listGithubHostedRunnersInGroupForOrg`

List GitHub-hosted runners in a group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#list-github-hosted-runners-in-a-group-for-an-organization)

```ts
github.actions.listGithubHostedRunnersInGroupForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; runners: (ActionsHostedRunner)[] }>
```

<sub>`GET /orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners` · `actions/list-github-hosted-runners-in-group-for-org`</sub>

## `github.actions.listRepoAccessToSelfHostedRunnerGroupInOrg`

List repository access to a self-hosted runner group in an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#list-repository-access-to-a-self-hosted-runner-group-in-an-organization)

```ts
github.actions.listRepoAccessToSelfHostedRunnerGroupInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<{ total_count: number; repositories: (MinimalRepository)[] }>
```

<sub>`GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories` · `actions/list-repo-access-to-self-hosted-runner-group-in-org`</sub>

## `github.actions.setRepoAccessToSelfHostedRunnerGroupInOrg`

Set repository access for a self-hosted runner group in an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#set-repository-access-for-a-self-hosted-runner-group-in-an-organization)

```ts
github.actions.setRepoAccessToSelfHostedRunnerGroupInOrg(input: {
  /** List of repository IDs that can access the runner group. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories` · `actions/set-repo-access-to-self-hosted-runner-group-in-org`</sub>

## `github.actions.removeRepoAccessToSelfHostedRunnerGroupInOrg`

Remove repository access to a self-hosted runner group in an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#remove-repository-access-to-a-self-hosted-runner-group-in-an-organization)

```ts
github.actions.removeRepoAccessToSelfHostedRunnerGroupInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}` · `actions/remove-repo-access-to-self-hosted-runner-group-in-org`</sub>

## `github.actions.addRepoAccessToSelfHostedRunnerGroupInOrg`

Add repository access to a self-hosted runner group in an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#add-repository-access-to-a-self-hosted-runner-group-in-an-organization)

```ts
github.actions.addRepoAccessToSelfHostedRunnerGroupInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}` · `actions/add-repo-access-to-self-hosted-runner-group-in-org`</sub>

## `github.actions.listSelfHostedRunnersInGroupForOrg`

List self-hosted runners in a group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#list-self-hosted-runners-in-a-group-for-an-organization)

```ts
github.actions.listSelfHostedRunnersInGroupForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; runners: (Runner)[] }>
```

<sub>`GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners` · `actions/list-self-hosted-runners-in-group-for-org`</sub>

## `github.actions.setSelfHostedRunnersInGroupForOrg`

Set self-hosted runners in a group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#set-self-hosted-runners-in-a-group-for-an-organization)

```ts
github.actions.setSelfHostedRunnersInGroupForOrg(input: {
  /** List of runner IDs to add to the runner group. */
  runners: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/runners` · `actions/set-self-hosted-runners-in-group-for-org`</sub>

## `github.actions.removeSelfHostedRunnerFromGroupForOrg`

Remove a self-hosted runner from a group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#remove-a-self-hosted-runner-from-a-group-for-an-organization)

```ts
github.actions.removeSelfHostedRunnerFromGroupForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}` · `actions/remove-self-hosted-runner-from-group-for-org`</sub>

## `github.actions.addSelfHostedRunnerToGroupForOrg`

Add a self-hosted runner to a group for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runner-groups#add-a-self-hosted-runner-to-a-group-for-an-organization)

```ts
github.actions.addSelfHostedRunnerToGroupForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner group. */
  runner_group_id: number;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}` · `actions/add-self-hosted-runner-to-group-for-org`</sub>

## `github.actions.listSelfHostedRunnersForOrg`

List self-hosted runners for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#list-self-hosted-runners-for-an-organization)

```ts
github.actions.listSelfHostedRunnersForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of a self-hosted runner. */
  name?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; runners: (Runner)[] }>
```

<sub>`GET /orgs/{org}/actions/runners` · `actions/list-self-hosted-runners-for-org`</sub>

## `github.actions.deleteSelfHostedRunnerFromOrg`

Delete a self-hosted runner from an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#delete-a-self-hosted-runner-from-an-organization)

```ts
github.actions.deleteSelfHostedRunnerFromOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<ValidationErrorSimple>
```

<sub>`DELETE /orgs/{org}/actions/runners/{runner_id}` · `actions/delete-self-hosted-runner-from-org`</sub>

## `github.actions.getSelfHostedRunnerForOrg`

Get a self-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#get-a-self-hosted-runner-for-an-organization)

```ts
github.actions.getSelfHostedRunnerForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<Runner>
```

<sub>`GET /orgs/{org}/actions/runners/{runner_id}` · `actions/get-self-hosted-runner-for-org`</sub>

## `github.actions.removeAllCustomLabelsFromSelfHostedRunnerForOrg`

Remove all custom labels from a self-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#remove-all-custom-labels-from-a-self-hosted-runner-for-an-organization)

```ts
github.actions.removeAllCustomLabelsFromSelfHostedRunnerForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`DELETE /orgs/{org}/actions/runners/{runner_id}/labels` · `actions/remove-all-custom-labels-from-self-hosted-runner-for-org`</sub>

## `github.actions.listLabelsForSelfHostedRunnerForOrg`

List labels for a self-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#list-labels-for-a-self-hosted-runner-for-an-organization)

```ts
github.actions.listLabelsForSelfHostedRunnerForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`GET /orgs/{org}/actions/runners/{runner_id}/labels` · `actions/list-labels-for-self-hosted-runner-for-org`</sub>

## `github.actions.addCustomLabelsToSelfHostedRunnerForOrg`

Add custom labels to a self-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#add-custom-labels-to-a-self-hosted-runner-for-an-organization)

```ts
github.actions.addCustomLabelsToSelfHostedRunnerForOrg(input: {
  /** The names of the custom labels to add to the runner. */
  labels: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`POST /orgs/{org}/actions/runners/{runner_id}/labels` · `actions/add-custom-labels-to-self-hosted-runner-for-org`</sub>

## `github.actions.setCustomLabelsForSelfHostedRunnerForOrg`

Set custom labels for a self-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#set-custom-labels-for-a-self-hosted-runner-for-an-organization)

```ts
github.actions.setCustomLabelsForSelfHostedRunnerForOrg(input: {
  /** The names of the custom labels to set for the runner. You can pass an empty array to remove all custom labels. */
  labels: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`PUT /orgs/{org}/actions/runners/{runner_id}/labels` · `actions/set-custom-labels-for-self-hosted-runner-for-org`</sub>

## `github.actions.removeCustomLabelFromSelfHostedRunnerForOrg`

Remove a custom label from a self-hosted runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#remove-a-custom-label-from-a-self-hosted-runner-for-an-organization)

```ts
github.actions.removeCustomLabelFromSelfHostedRunnerForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
  /** The name of a self-hosted runner's custom label. */
  name: string;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}` · `actions/remove-custom-label-from-self-hosted-runner-for-org`</sub>

## `github.actions.listRunnerApplicationsForOrg`

List runner applications for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#list-runner-applications-for-an-organization)

```ts
github.actions.listRunnerApplicationsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<(RunnerApplication)[]>
```

<sub>`GET /orgs/{org}/actions/runners/downloads` · `actions/list-runner-applications-for-org`</sub>

## `github.actions.generateRunnerJitconfigForOrg`

Create configuration for a just-in-time runner for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#create-configuration-for-a-just-in-time-runner-for-an-organization)

```ts
github.actions.generateRunnerJitconfigForOrg(input: {
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
}): Promise<{ runner: Runner; encoded_jit_config: string }>
```

<sub>`POST /orgs/{org}/actions/runners/generate-jitconfig` · `actions/generate-runner-jitconfig-for-org`</sub>

## `github.actions.createRegistrationTokenForOrg`

Create a registration token for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#create-a-registration-token-for-an-organization)

```ts
github.actions.createRegistrationTokenForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<AuthenticationToken>
```

<sub>`POST /orgs/{org}/actions/runners/registration-token` · `actions/create-registration-token-for-org`</sub>

## `github.actions.createRemoveTokenForOrg`

Create a remove token for an organization — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#create-a-remove-token-for-an-organization)

```ts
github.actions.createRemoveTokenForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<AuthenticationToken>
```

<sub>`POST /orgs/{org}/actions/runners/remove-token` · `actions/create-remove-token-for-org`</sub>

## `github.actions.listOrgSecrets`

List organization secrets — [API reference](https://docs.github.com/rest/actions/secrets#list-organization-secrets)

```ts
github.actions.listOrgSecrets(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; secrets: (OrganizationActionsSecret)[] }>
```

<sub>`GET /orgs/{org}/actions/secrets` · `actions/list-org-secrets`</sub>

## `github.actions.deleteOrgSecret`

Delete an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#delete-an-organization-secret)

```ts
github.actions.deleteOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/secrets/{secret_name}` · `actions/delete-org-secret`</sub>

## `github.actions.getOrgSecret`

Get an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#get-an-organization-secret)

```ts
github.actions.getOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<OrganizationActionsSecret>
```

<sub>`GET /orgs/{org}/actions/secrets/{secret_name}` · `actions/get-org-secret`</sub>

## `github.actions.createOrUpdateOrgSecret`

Create or update an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#create-or-update-an-organization-secret)

```ts
github.actions.createOrUpdateOrgSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /orgs/{org}/actions/secrets/{secret_name}` · `actions/create-or-update-org-secret`</sub>

## `github.actions.listSelectedReposForOrgSecret`

List selected repositories for an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#list-selected-repositories-for-an-organization-secret)

```ts
github.actions.listSelectedReposForOrgSecret(input: {
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

<sub>`GET /orgs/{org}/actions/secrets/{secret_name}/repositories` · `actions/list-selected-repos-for-org-secret`</sub>

## `github.actions.setSelectedReposForOrgSecret`

Set selected repositories for an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#set-selected-repositories-for-an-organization-secret)

```ts
github.actions.setSelectedReposForOrgSecret(input: {
  /** An array of repository ids that can access the organization secret. You can only provide a list of repository ids when the `visibility` is set to `selected`. You can add and remove individual repositories using the [Add selected repository to an organization secret](https://docs.github.com/rest/actions/secrets#add-selected-repository-to-an-organization-secret) and [Remove selected repository from an organization secret](https://docs.github.com/rest/actions/secrets#remove-selected-repository-from-an-organization-secret) endpoints. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/secrets/{secret_name}/repositories` · `actions/set-selected-repos-for-org-secret`</sub>

## `github.actions.removeSelectedRepoFromOrgSecret`

Remove selected repository from an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#remove-selected-repository-from-an-organization-secret)

```ts
github.actions.removeSelectedRepoFromOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}` · `actions/remove-selected-repo-from-org-secret`</sub>

## `github.actions.addSelectedRepoToOrgSecret`

Add selected repository to an organization secret — [API reference](https://docs.github.com/rest/actions/secrets#add-selected-repository-to-an-organization-secret)

```ts
github.actions.addSelectedRepoToOrgSecret(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the secret. */
  secret_name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}` · `actions/add-selected-repo-to-org-secret`</sub>

## `github.actions.getOrgPublicKey`

Get an organization public key — [API reference](https://docs.github.com/rest/actions/secrets#get-an-organization-public-key)

```ts
github.actions.getOrgPublicKey(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ActionsPublicKey>
```

<sub>`GET /orgs/{org}/actions/secrets/public-key` · `actions/get-org-public-key`</sub>

## `github.actions.listOrgVariables`

List organization variables — [API reference](https://docs.github.com/rest/actions/variables#list-organization-variables)

```ts
github.actions.listOrgVariables(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 30). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; variables: (OrganizationActionsVariable)[] }>
```

<sub>`GET /orgs/{org}/actions/variables` · `actions/list-org-variables`</sub>

## `github.actions.createOrgVariable`

Create an organization variable — [API reference](https://docs.github.com/rest/actions/variables#create-an-organization-variable)

```ts
github.actions.createOrgVariable(input: {
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

<sub>`POST /orgs/{org}/actions/variables` · `actions/create-org-variable`</sub>

## `github.actions.deleteOrgVariable`

Delete an organization variable — [API reference](https://docs.github.com/rest/actions/variables#delete-an-organization-variable)

```ts
github.actions.deleteOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/variables/{name}` · `actions/delete-org-variable`</sub>

## `github.actions.getOrgVariable`

Get an organization variable — [API reference](https://docs.github.com/rest/actions/variables#get-an-organization-variable)

```ts
github.actions.getOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
}): Promise<OrganizationActionsVariable>
```

<sub>`GET /orgs/{org}/actions/variables/{name}` · `actions/get-org-variable`</sub>

## `github.actions.updateOrgVariable`

Update an organization variable — [API reference](https://docs.github.com/rest/actions/variables#update-an-organization-variable)

```ts
github.actions.updateOrgVariable(input: {
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

<sub>`PATCH /orgs/{org}/actions/variables/{name}` · `actions/update-org-variable`</sub>

## `github.actions.listSelectedReposForOrgVariable`

List selected repositories for an organization variable — [API reference](https://docs.github.com/rest/actions/variables#list-selected-repositories-for-an-organization-variable)

```ts
github.actions.listSelectedReposForOrgVariable(input: {
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

<sub>`GET /orgs/{org}/actions/variables/{name}/repositories` · `actions/list-selected-repos-for-org-variable`</sub>

## `github.actions.setSelectedReposForOrgVariable`

Set selected repositories for an organization variable — [API reference](https://docs.github.com/rest/actions/variables#set-selected-repositories-for-an-organization-variable)

```ts
github.actions.setSelectedReposForOrgVariable(input: {
  /** The IDs of the repositories that can access the organization variable. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/variables/{name}/repositories` · `actions/set-selected-repos-for-org-variable`</sub>

## `github.actions.removeSelectedRepoFromOrgVariable`

Remove selected repository from an organization variable — [API reference](https://docs.github.com/rest/actions/variables#remove-selected-repository-from-an-organization-variable)

```ts
github.actions.removeSelectedRepoFromOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}` · `actions/remove-selected-repo-from-org-variable`</sub>

## `github.actions.addSelectedRepoToOrgVariable`

Add selected repository to an organization variable — [API reference](https://docs.github.com/rest/actions/variables#add-selected-repository-to-an-organization-variable)

```ts
github.actions.addSelectedRepoToOrgVariable(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The name of the variable. */
  name: string;
  repository_id: number;
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}` · `actions/add-selected-repo-to-org-variable`</sub>

## `github.actions.listArtifactsForRepo`

List artifacts for a repository — [API reference](https://docs.github.com/rest/actions/artifacts#list-artifacts-for-a-repository)

```ts
github.actions.listArtifactsForRepo(input: {
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
}): Promise<{ total_count: number; artifacts: (Artifact)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/artifacts` · `actions/list-artifacts-for-repo`</sub>

## `github.actions.deleteArtifact`

Delete an artifact — [API reference](https://docs.github.com/rest/actions/artifacts#delete-an-artifact)

```ts
github.actions.deleteArtifact(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the artifact. */
  artifact_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}` · `actions/delete-artifact`</sub>

## `github.actions.getArtifact`

Get an artifact — [API reference](https://docs.github.com/rest/actions/artifacts#get-an-artifact)

```ts
github.actions.getArtifact(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the artifact. */
  artifact_id: number;
}): Promise<Artifact>
```

<sub>`GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}` · `actions/get-artifact`</sub>

## `github.actions.downloadArtifact`

Download an artifact — [API reference](https://docs.github.com/rest/actions/artifacts#download-an-artifact)

```ts
github.actions.downloadArtifact(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the artifact. */
  artifact_id: number;
  archive_format: string;
}): Promise<BasicError>
```

<sub>`GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}` · `actions/download-artifact`</sub>

## `github.actions.getActionsCacheRetentionLimitForRepository`

Get GitHub Actions cache retention limit for a repository — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-retention-limit-for-a-repository)

```ts
github.actions.getActionsCacheRetentionLimitForRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsCacheRetentionLimitForRepository>
```

<sub>`GET /repos/{owner}/{repo}/actions/cache/retention-limit` · `actions/get-actions-cache-retention-limit-for-repository`</sub>

## `github.actions.setActionsCacheRetentionLimitForRepository`

Set GitHub Actions cache retention limit for a repository — [API reference](https://docs.github.com/rest/actions/cache#set-github-actions-cache-retention-limit-for-a-repository)

```ts
github.actions.setActionsCacheRetentionLimitForRepository(input: {
  /** The maximum number of days to keep caches in this repository. */
  max_cache_retention_days?: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/actions/cache/retention-limit` · `actions/set-actions-cache-retention-limit-for-repository`</sub>

## `github.actions.getActionsCacheStorageLimitForRepository`

Get GitHub Actions cache storage limit for a repository — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-storage-limit-for-a-repository)

```ts
github.actions.getActionsCacheStorageLimitForRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsCacheStorageLimitForRepository>
```

<sub>`GET /repos/{owner}/{repo}/actions/cache/storage-limit` · `actions/get-actions-cache-storage-limit-for-repository`</sub>

## `github.actions.setActionsCacheStorageLimitForRepository`

Set GitHub Actions cache storage limit for a repository — [API reference](https://docs.github.com/rest/actions/cache#set-github-actions-cache-storage-limit-for-a-repository)

```ts
github.actions.setActionsCacheStorageLimitForRepository(input: {
  /** The maximum total cache size for this repository, in gigabytes. */
  max_cache_size_gb?: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/actions/cache/storage-limit` · `actions/set-actions-cache-storage-limit-for-repository`</sub>

## `github.actions.getActionsCacheUsage`

Get GitHub Actions cache usage for a repository — [API reference](https://docs.github.com/rest/actions/cache#get-github-actions-cache-usage-for-a-repository)

```ts
github.actions.getActionsCacheUsage(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsCacheUsageByRepository>
```

<sub>`GET /repos/{owner}/{repo}/actions/cache/usage` · `actions/get-actions-cache-usage`</sub>

## `github.actions.deleteActionsCacheByKey`

Delete GitHub Actions caches for a repository (using a cache key) — [API reference](https://docs.github.com/rest/actions/cache#delete-github-actions-caches-for-a-repository-using-a-cache-key)

```ts
github.actions.deleteActionsCacheByKey(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** A key for identifying the cache. */
  key: string;
  /** The full Git reference for narrowing down the cache. The `ref` for a branch should be formatted as `refs/heads/<branch name>`. To reference a pull request use `refs/pull/<number>/merge`. */
  ref?: string;
}): Promise<ActionsCacheList>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/caches` · `actions/delete-actions-cache-by-key`</sub>

## `github.actions.getActionsCacheList`

List GitHub Actions caches for a repository — [API reference](https://docs.github.com/rest/actions/cache#list-github-actions-caches-for-a-repository)

```ts
github.actions.getActionsCacheList(input: {
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
}): Promise<ActionsCacheList>
```

<sub>`GET /repos/{owner}/{repo}/actions/caches` · `actions/get-actions-cache-list`</sub>

## `github.actions.deleteActionsCacheById`

Delete a GitHub Actions cache for a repository (using a cache ID) — [API reference](https://docs.github.com/rest/actions/cache#delete-a-github-actions-cache-for-a-repository-using-a-cache-id)

```ts
github.actions.deleteActionsCacheById(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the GitHub Actions cache. */
  cache_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}` · `actions/delete-actions-cache-by-id`</sub>

## `github.actions.listConcurrencyGroupsForRepository`

List concurrency groups for a repository — [API reference](https://docs.github.com/rest/actions/concurrency-groups#list-concurrency-groups-for-a-repository)

```ts
github.actions.listConcurrencyGroupsForRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
}): Promise<ConcurrencyGroupList>
```

<sub>`GET /repos/{owner}/{repo}/actions/concurrency_groups` · `actions/list-concurrency-groups-for-repository`</sub>

## `github.actions.getConcurrencyGroupForRepository`

Get a concurrency group for a repository — [API reference](https://docs.github.com/rest/actions/concurrency-groups#get-a-concurrency-group-for-a-repository)

```ts
github.actions.getConcurrencyGroupForRepository(input: {
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
}): Promise<ConcurrencyGroup>
```

<sub>`GET /repos/{owner}/{repo}/actions/concurrency_groups/{concurrency_group_name}` · `actions/get-concurrency-group-for-repository`</sub>

## `github.actions.getJobForWorkflowRun`

Get a job for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-jobs#get-a-job-for-a-workflow-run)

```ts
github.actions.getJobForWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the job. */
  job_id: number;
}): Promise<Job>
```

<sub>`GET /repos/{owner}/{repo}/actions/jobs/{job_id}` · `actions/get-job-for-workflow-run`</sub>

## `github.actions.downloadJobLogsForWorkflowRun`

Download job logs for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-jobs#download-job-logs-for-a-workflow-run)

```ts
github.actions.downloadJobLogsForWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the job. */
  job_id: number;
}): Promise<unknown>
```

<sub>`GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs` · `actions/download-job-logs-for-workflow-run`</sub>

## `github.actions.reRunJobForWorkflowRun`

Re-run a job from a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#re-run-a-job-from-a-workflow-run)

```ts
github.actions.reRunJobForWorkflowRun(input: {
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
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun` · `actions/re-run-job-for-workflow-run`</sub>

## `github.actions.getCustomOidcSubClaimForRepo`

Get the customization template for an OIDC subject claim for a repository — [API reference](https://docs.github.com/rest/actions/oidc#get-the-customization-template-for-an-oidc-subject-claim-for-a-repository)

```ts
github.actions.getCustomOidcSubClaimForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<OidcCustomSubRepo>
```

<sub>`GET /repos/{owner}/{repo}/actions/oidc/customization/sub` · `actions/get-custom-oidc-sub-claim-for-repo`</sub>

## `github.actions.setCustomOidcSubClaimForRepo`

Set the customization template for an OIDC subject claim for a repository — [API reference](https://docs.github.com/rest/actions/oidc#set-the-customization-template-for-an-oidc-subject-claim-for-a-repository)

```ts
github.actions.setCustomOidcSubClaimForRepo(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /repos/{owner}/{repo}/actions/oidc/customization/sub` · `actions/set-custom-oidc-sub-claim-for-repo`</sub>

## `github.actions.listRepoOrganizationSecrets`

List repository organization secrets — [API reference](https://docs.github.com/rest/actions/secrets#list-repository-organization-secrets)

```ts
github.actions.listRepoOrganizationSecrets(input: {
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

<sub>`GET /repos/{owner}/{repo}/actions/organization-secrets` · `actions/list-repo-organization-secrets`</sub>

## `github.actions.listRepoOrganizationVariables`

List repository organization variables — [API reference](https://docs.github.com/rest/actions/variables#list-repository-organization-variables)

```ts
github.actions.listRepoOrganizationVariables(input: {
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

<sub>`GET /repos/{owner}/{repo}/actions/organization-variables` · `actions/list-repo-organization-variables`</sub>

## `github.actions.getGithubActionsPermissionsRepository`

Get GitHub Actions permissions for a repository — [API reference](https://docs.github.com/rest/actions/permissions#get-github-actions-permissions-for-a-repository)

```ts
github.actions.getGithubActionsPermissionsRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsRepositoryPermissions>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions` · `actions/get-github-actions-permissions-repository`</sub>

## `github.actions.setGithubActionsPermissionsRepository`

Set GitHub Actions permissions for a repository — [API reference](https://docs.github.com/rest/actions/permissions#set-github-actions-permissions-for-a-repository)

```ts
github.actions.setGithubActionsPermissionsRepository(input: {
  enabled: ActionsEnabled;
  allowed_actions?: AllowedActions;
  sha_pinning_required?: ShaPinningRequired;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions` · `actions/set-github-actions-permissions-repository`</sub>

## `github.actions.getWorkflowAccessToRepository`

Get the level of access for workflows outside of the repository — [API reference](https://docs.github.com/rest/actions/permissions#get-the-level-of-access-for-workflows-outside-of-the-repository)

```ts
github.actions.getWorkflowAccessToRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsWorkflowAccessToRepository>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions/access` · `actions/get-workflow-access-to-repository`</sub>

## `github.actions.setWorkflowAccessToRepository`

Set the level of access for workflows outside of the repository — [API reference](https://docs.github.com/rest/actions/permissions#set-the-level-of-access-for-workflows-outside-of-the-repository)

```ts
github.actions.setWorkflowAccessToRepository(input: {
  /** Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the repository.  `none` means the access is only possible from workflows in this repository. `user` level access allows sharing across user owned private repositories only. `organization` level access allows sharing across the organization. */
  access_level: "none" | "user" | "organization";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions/access` · `actions/set-workflow-access-to-repository`</sub>

## `github.actions.getArtifactAndLogRetentionSettingsRepository`

Get artifact and log retention settings for a repository — [API reference](https://docs.github.com/rest/actions/permissions#get-artifact-and-log-retention-settings-for-a-repository)

```ts
github.actions.getArtifactAndLogRetentionSettingsRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsArtifactAndLogRetentionResponse>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention` · `actions/get-artifact-and-log-retention-settings-repository`</sub>

## `github.actions.setArtifactAndLogRetentionSettingsRepository`

Set artifact and log retention settings for a repository — [API reference](https://docs.github.com/rest/actions/permissions#set-artifact-and-log-retention-settings-for-a-repository)

```ts
github.actions.setArtifactAndLogRetentionSettingsRepository(input: {
  /** The number of days to retain artifacts and logs */
  days: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions/artifact-and-log-retention` · `actions/set-artifact-and-log-retention-settings-repository`</sub>

## `github.actions.getForkPrContributorApprovalPermissionsRepository`

Get fork PR contributor approval permissions for a repository — [API reference](https://docs.github.com/rest/actions/permissions#get-fork-pr-contributor-approval-permissions-for-a-repository)

```ts
github.actions.getForkPrContributorApprovalPermissionsRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsForkPrContributorApproval>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval` · `actions/get-fork-pr-contributor-approval-permissions-repository`</sub>

## `github.actions.setForkPrContributorApprovalPermissionsRepository`

Set fork PR contributor approval permissions for a repository — [API reference](https://docs.github.com/rest/actions/permissions#set-fork-pr-contributor-approval-permissions-for-a-repository)

```ts
github.actions.setForkPrContributorApprovalPermissionsRepository(input: {
  /** The policy that controls when fork PR workflows require approval from a maintainer. */
  approval_policy: "first_time_contributors_new_to_github" | "first_time_contributors" | "all_external_contributors";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval` · `actions/set-fork-pr-contributor-approval-permissions-repository`</sub>

## `github.actions.getPrivateRepoForkPrWorkflowsSettingsRepository`

Get private repo fork PR workflow settings for a repository — [API reference](https://docs.github.com/rest/actions/permissions#get-private-repo-fork-pr-workflow-settings-for-a-repository)

```ts
github.actions.getPrivateRepoForkPrWorkflowsSettingsRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsForkPrWorkflowsPrivateRepos>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos` · `actions/get-private-repo-fork-pr-workflows-settings-repository`</sub>

## `github.actions.setPrivateRepoForkPrWorkflowsSettingsRepository`

Set private repo fork PR workflow settings for a repository — [API reference](https://docs.github.com/rest/actions/permissions#set-private-repo-fork-pr-workflow-settings-for-a-repository)

```ts
github.actions.setPrivateRepoForkPrWorkflowsSettingsRepository(input: {
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
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions/fork-pr-workflows-private-repos` · `actions/set-private-repo-fork-pr-workflows-settings-repository`</sub>

## `github.actions.getAllowedActionsRepository`

Get allowed actions and reusable workflows for a repository — [API reference](https://docs.github.com/rest/actions/permissions#get-allowed-actions-and-reusable-workflows-for-a-repository)

```ts
github.actions.getAllowedActionsRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<SelectedActions>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions/selected-actions` · `actions/get-allowed-actions-repository`</sub>

## `github.actions.setAllowedActionsRepository`

Set allowed actions and reusable workflows for a repository — [API reference](https://docs.github.com/rest/actions/permissions#set-allowed-actions-and-reusable-workflows-for-a-repository)

```ts
github.actions.setAllowedActionsRepository(input: {
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
}): Promise<unknown>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions/selected-actions` · `actions/set-allowed-actions-repository`</sub>

## `github.actions.getGithubActionsDefaultWorkflowPermissionsRepository`

Get default workflow permissions for a repository — [API reference](https://docs.github.com/rest/actions/permissions#get-default-workflow-permissions-for-a-repository)

```ts
github.actions.getGithubActionsDefaultWorkflowPermissionsRepository(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsGetDefaultWorkflowPermissions>
```

<sub>`GET /repos/{owner}/{repo}/actions/permissions/workflow` · `actions/get-github-actions-default-workflow-permissions-repository`</sub>

## `github.actions.setGithubActionsDefaultWorkflowPermissionsRepository`

Set default workflow permissions for a repository — [API reference](https://docs.github.com/rest/actions/permissions#set-default-workflow-permissions-for-a-repository)

```ts
github.actions.setGithubActionsDefaultWorkflowPermissionsRepository(input: {
  default_workflow_permissions?: ActionsDefaultWorkflowPermissions;
  can_approve_pull_request_reviews?: ActionsCanApprovePullRequestReviews;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`PUT /repos/{owner}/{repo}/actions/permissions/workflow` · `actions/set-github-actions-default-workflow-permissions-repository`</sub>

## `github.actions.listSelfHostedRunnersForRepo`

List self-hosted runners for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#list-self-hosted-runners-for-a-repository)

```ts
github.actions.listSelfHostedRunnersForRepo(input: {
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
}): Promise<{ total_count: number; runners: (Runner)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/runners` · `actions/list-self-hosted-runners-for-repo`</sub>

## `github.actions.deleteSelfHostedRunnerFromRepo`

Delete a self-hosted runner from a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#delete-a-self-hosted-runner-from-a-repository)

```ts
github.actions.deleteSelfHostedRunnerFromRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<ValidationErrorSimple>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}` · `actions/delete-self-hosted-runner-from-repo`</sub>

## `github.actions.getSelfHostedRunnerForRepo`

Get a self-hosted runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#get-a-self-hosted-runner-for-a-repository)

```ts
github.actions.getSelfHostedRunnerForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<Runner>
```

<sub>`GET /repos/{owner}/{repo}/actions/runners/{runner_id}` · `actions/get-self-hosted-runner-for-repo`</sub>

## `github.actions.removeAllCustomLabelsFromSelfHostedRunnerForRepo`

Remove all custom labels from a self-hosted runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#remove-all-custom-labels-from-a-self-hosted-runner-for-a-repository)

```ts
github.actions.removeAllCustomLabelsFromSelfHostedRunnerForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` · `actions/remove-all-custom-labels-from-self-hosted-runner-for-repo`</sub>

## `github.actions.listLabelsForSelfHostedRunnerForRepo`

List labels for a self-hosted runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#list-labels-for-a-self-hosted-runner-for-a-repository)

```ts
github.actions.listLabelsForSelfHostedRunnerForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` · `actions/list-labels-for-self-hosted-runner-for-repo`</sub>

## `github.actions.addCustomLabelsToSelfHostedRunnerForRepo`

Add custom labels to a self-hosted runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#add-custom-labels-to-a-self-hosted-runner-for-a-repository)

```ts
github.actions.addCustomLabelsToSelfHostedRunnerForRepo(input: {
  /** The names of the custom labels to add to the runner. */
  labels: (string)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` · `actions/add-custom-labels-to-self-hosted-runner-for-repo`</sub>

## `github.actions.setCustomLabelsForSelfHostedRunnerForRepo`

Set custom labels for a self-hosted runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#set-custom-labels-for-a-self-hosted-runner-for-a-repository)

```ts
github.actions.setCustomLabelsForSelfHostedRunnerForRepo(input: {
  /** The names of the custom labels to set for the runner. You can pass an empty array to remove all custom labels. */
  labels: (string)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels` · `actions/set-custom-labels-for-self-hosted-runner-for-repo`</sub>

## `github.actions.removeCustomLabelFromSelfHostedRunnerForRepo`

Remove a custom label from a self-hosted runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#remove-a-custom-label-from-a-self-hosted-runner-for-a-repository)

```ts
github.actions.removeCustomLabelFromSelfHostedRunnerForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** Unique identifier of the self-hosted runner. */
  runner_id: number;
  /** The name of a self-hosted runner's custom label. */
  name: string;
}): Promise<{ total_count: number; labels: (RunnerLabel)[] }>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}` · `actions/remove-custom-label-from-self-hosted-runner-for-repo`</sub>

## `github.actions.listRunnerApplicationsForRepo`

List runner applications for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#list-runner-applications-for-a-repository)

```ts
github.actions.listRunnerApplicationsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<(RunnerApplication)[]>
```

<sub>`GET /repos/{owner}/{repo}/actions/runners/downloads` · `actions/list-runner-applications-for-repo`</sub>

## `github.actions.generateRunnerJitconfigForRepo`

Create configuration for a just-in-time runner for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#create-configuration-for-a-just-in-time-runner-for-a-repository)

```ts
github.actions.generateRunnerJitconfigForRepo(input: {
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
}): Promise<{ runner: Runner; encoded_jit_config: string }>
```

<sub>`POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig` · `actions/generate-runner-jitconfig-for-repo`</sub>

## `github.actions.createRegistrationTokenForRepo`

Create a registration token for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#create-a-registration-token-for-a-repository)

```ts
github.actions.createRegistrationTokenForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<AuthenticationToken>
```

<sub>`POST /repos/{owner}/{repo}/actions/runners/registration-token` · `actions/create-registration-token-for-repo`</sub>

## `github.actions.createRemoveTokenForRepo`

Create a remove token for a repository — [API reference](https://docs.github.com/rest/actions/self-hosted-runners#create-a-remove-token-for-a-repository)

```ts
github.actions.createRemoveTokenForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<AuthenticationToken>
```

<sub>`POST /repos/{owner}/{repo}/actions/runners/remove-token` · `actions/create-remove-token-for-repo`</sub>

## `github.actions.listWorkflowRunsForRepo`

List workflow runs for a repository — [API reference](https://docs.github.com/rest/actions/workflow-runs#list-workflow-runs-for-a-repository)

```ts
github.actions.listWorkflowRunsForRepo(input: {
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
}): Promise<{ total_count: number; workflow_runs: (WorkflowRun)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs` · `actions/list-workflow-runs-for-repo`</sub>

## `github.actions.deleteWorkflowRun`

Delete a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#delete-a-workflow-run)

```ts
github.actions.deleteWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/runs/{run_id}` · `actions/delete-workflow-run`</sub>

## `github.actions.getWorkflowRun`

Get a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#get-a-workflow-run)

```ts
github.actions.getWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
  /** If `true` pull requests are omitted from the response (empty array). */
  exclude_pull_requests?: boolean;
}): Promise<WorkflowRun>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}` · `actions/get-workflow-run`</sub>

## `github.actions.getReviewsForRun`

Get the review history for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#get-the-review-history-for-a-workflow-run)

```ts
github.actions.getReviewsForRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<(EnvironmentApprovals)[]>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals` · `actions/get-reviews-for-run`</sub>

## `github.actions.approveWorkflowRun`

Approve a workflow run for a fork pull request — [API reference](https://docs.github.com/rest/actions/workflow-runs#approve-a-workflow-run-for-a-fork-pull-request)

```ts
github.actions.approveWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve` · `actions/approve-workflow-run`</sub>

## `github.actions.listWorkflowRunArtifacts`

List workflow run artifacts — [API reference](https://docs.github.com/rest/actions/artifacts#list-workflow-run-artifacts)

```ts
github.actions.listWorkflowRunArtifacts(input: {
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
}): Promise<{ total_count: number; artifacts: (Artifact)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts` · `actions/list-workflow-run-artifacts`</sub>

## `github.actions.getWorkflowRunAttempt`

Get a workflow run attempt — [API reference](https://docs.github.com/rest/actions/workflow-runs#get-a-workflow-run-attempt)

```ts
github.actions.getWorkflowRunAttempt(input: {
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
}): Promise<WorkflowRun>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}` · `actions/get-workflow-run-attempt`</sub>

## `github.actions.listJobsForWorkflowRunAttempt`

List jobs for a workflow run attempt — [API reference](https://docs.github.com/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run-attempt)

```ts
github.actions.listJobsForWorkflowRunAttempt(input: {
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
}): Promise<{ total_count: number; jobs: (Job)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs` · `actions/list-jobs-for-workflow-run-attempt`</sub>

## `github.actions.downloadWorkflowRunAttemptLogs`

Download workflow run attempt logs — [API reference](https://docs.github.com/rest/actions/workflow-runs#download-workflow-run-attempt-logs)

```ts
github.actions.downloadWorkflowRunAttemptLogs(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
  /** The attempt number of the workflow run. */
  attempt_number: number;
}): Promise<unknown>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs` · `actions/download-workflow-run-attempt-logs`</sub>

## `github.actions.cancelWorkflowRun`

Cancel a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#cancel-a-workflow-run)

```ts
github.actions.cancelWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel` · `actions/cancel-workflow-run`</sub>

## `github.actions.listConcurrencyGroupsForWorkflowRun`

List concurrency groups for a workflow run — [API reference](https://docs.github.com/rest/actions/concurrency-groups#list-concurrency-groups-for-a-workflow-run)

```ts
github.actions.listConcurrencyGroupsForWorkflowRun(input: {
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
}): Promise<ConcurrencyGroupRunList>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups` · `actions/list-concurrency-groups-for-workflow-run`</sub>

## `github.actions.reviewCustomGatesForRun`

Review custom deployment protection rules for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#review-custom-deployment-protection-rules-for-a-workflow-run)

```ts
github.actions.reviewCustomGatesForRun(input: {
  body: ReviewCustomGatesCommentRequired | ReviewCustomGatesStateRequired;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<unknown>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule` · `actions/review-custom-gates-for-run`</sub>

## `github.actions.forceCancelWorkflowRun`

Force cancel a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#force-cancel-a-workflow-run)

```ts
github.actions.forceCancelWorkflowRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel` · `actions/force-cancel-workflow-run`</sub>

## `github.actions.listJobsForWorkflowRun`

List jobs for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-jobs#list-jobs-for-a-workflow-run)

```ts
github.actions.listJobsForWorkflowRun(input: {
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
}): Promise<{ total_count: number; jobs: (Job)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs` · `actions/list-jobs-for-workflow-run`</sub>

## `github.actions.deleteWorkflowRunLogs`

Delete workflow run logs — [API reference](https://docs.github.com/rest/actions/workflow-runs#delete-workflow-run-logs)

```ts
github.actions.deleteWorkflowRunLogs(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs` · `actions/delete-workflow-run-logs`</sub>

## `github.actions.downloadWorkflowRunLogs`

Download workflow run logs — [API reference](https://docs.github.com/rest/actions/workflow-runs#download-workflow-run-logs)

```ts
github.actions.downloadWorkflowRunLogs(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<unknown>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs` · `actions/download-workflow-run-logs`</sub>

## `github.actions.getPendingDeploymentsForRun`

Get pending deployments for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#get-pending-deployments-for-a-workflow-run)

```ts
github.actions.getPendingDeploymentsForRun(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<(PendingDeployment)[]>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments` · `actions/get-pending-deployments-for-run`</sub>

## `github.actions.reviewPendingDeploymentsForRun`

Review pending deployments for a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#review-pending-deployments-for-a-workflow-run)

```ts
github.actions.reviewPendingDeploymentsForRun(input: {
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
}): Promise<(Deployment)[]>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments` · `actions/review-pending-deployments-for-run`</sub>

## `github.actions.reRunWorkflow`

Re-run a workflow — [API reference](https://docs.github.com/rest/actions/workflow-runs#re-run-a-workflow)

```ts
github.actions.reRunWorkflow(input: {
  /** Whether to enable debug logging for the re-run. */
  enable_debug_logging?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun` · `actions/re-run-workflow`</sub>

## `github.actions.reRunWorkflowFailedJobs`

Re-run failed jobs from a workflow run — [API reference](https://docs.github.com/rest/actions/workflow-runs#re-run-failed-jobs-from-a-workflow-run)

```ts
github.actions.reRunWorkflowFailedJobs(input: {
  /** Whether to enable debug logging for the re-run. */
  enable_debug_logging?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs` · `actions/re-run-workflow-failed-jobs`</sub>

## `github.actions.getWorkflowRunUsage`

Get workflow run usage — [API reference](https://docs.github.com/rest/actions/workflow-runs#get-workflow-run-usage)

```ts
github.actions.getWorkflowRunUsage(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the workflow run. */
  run_id: number;
}): Promise<WorkflowRunUsage>
```

<sub>`GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing` · `actions/get-workflow-run-usage`</sub>

## `github.actions.listRepoSecrets`

List repository secrets — [API reference](https://docs.github.com/rest/actions/secrets#list-repository-secrets)

```ts
github.actions.listRepoSecrets(input: {
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

<sub>`GET /repos/{owner}/{repo}/actions/secrets` · `actions/list-repo-secrets`</sub>

## `github.actions.deleteRepoSecret`

Delete a repository secret — [API reference](https://docs.github.com/rest/actions/secrets#delete-a-repository-secret)

```ts
github.actions.deleteRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}` · `actions/delete-repo-secret`</sub>

## `github.actions.getRepoSecret`

Get a repository secret — [API reference](https://docs.github.com/rest/actions/secrets#get-a-repository-secret)

```ts
github.actions.getRepoSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<ActionsSecret>
```

<sub>`GET /repos/{owner}/{repo}/actions/secrets/{secret_name}` · `actions/get-repo-secret`</sub>

## `github.actions.createOrUpdateRepoSecret`

Create or update a repository secret — [API reference](https://docs.github.com/rest/actions/secrets#create-or-update-a-repository-secret)

```ts
github.actions.createOrUpdateRepoSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}` · `actions/create-or-update-repo-secret`</sub>

## `github.actions.getRepoPublicKey`

Get a repository public key — [API reference](https://docs.github.com/rest/actions/secrets#get-a-repository-public-key)

```ts
github.actions.getRepoPublicKey(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<ActionsPublicKey>
```

<sub>`GET /repos/{owner}/{repo}/actions/secrets/public-key` · `actions/get-repo-public-key`</sub>

## `github.actions.listRepoVariables`

List repository variables — [API reference](https://docs.github.com/rest/actions/variables#list-repository-variables)

```ts
github.actions.listRepoVariables(input: {
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

<sub>`GET /repos/{owner}/{repo}/actions/variables` · `actions/list-repo-variables`</sub>

## `github.actions.createRepoVariable`

Create a repository variable — [API reference](https://docs.github.com/rest/actions/variables#create-a-repository-variable)

```ts
github.actions.createRepoVariable(input: {
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

<sub>`POST /repos/{owner}/{repo}/actions/variables` · `actions/create-repo-variable`</sub>

## `github.actions.deleteRepoVariable`

Delete a repository variable — [API reference](https://docs.github.com/rest/actions/variables#delete-a-repository-variable)

```ts
github.actions.deleteRepoVariable(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the variable. */
  name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/actions/variables/{name}` · `actions/delete-repo-variable`</sub>

## `github.actions.getRepoVariable`

Get a repository variable — [API reference](https://docs.github.com/rest/actions/variables#get-a-repository-variable)

```ts
github.actions.getRepoVariable(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the variable. */
  name: string;
}): Promise<ActionsVariable>
```

<sub>`GET /repos/{owner}/{repo}/actions/variables/{name}` · `actions/get-repo-variable`</sub>

## `github.actions.updateRepoVariable`

Update a repository variable — [API reference](https://docs.github.com/rest/actions/variables#update-a-repository-variable)

```ts
github.actions.updateRepoVariable(input: {
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

<sub>`PATCH /repos/{owner}/{repo}/actions/variables/{name}` · `actions/update-repo-variable`</sub>

## `github.actions.listRepoWorkflows`

List repository workflows — [API reference](https://docs.github.com/rest/actions/workflows#list-repository-workflows)

```ts
github.actions.listRepoWorkflows(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; workflows: (Workflow)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/workflows` · `actions/list-repo-workflows`</sub>

## `github.actions.getWorkflow`

Get a workflow — [API reference](https://docs.github.com/rest/actions/workflows#get-a-workflow)

```ts
github.actions.getWorkflow(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflow_id: number | string;
}): Promise<Workflow>
```

<sub>`GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}` · `actions/get-workflow`</sub>

## `github.actions.disableWorkflow`

Disable a workflow — [API reference](https://docs.github.com/rest/actions/workflows#disable-a-workflow)

```ts
github.actions.disableWorkflow(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflow_id: number | string;
}): Promise<unknown>
```

<sub>`PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable` · `actions/disable-workflow`</sub>

## `github.actions.createWorkflowDispatch`

Create a workflow dispatch event — [API reference](https://docs.github.com/rest/actions/workflows#create-a-workflow-dispatch-event)

```ts
github.actions.createWorkflowDispatch(input: {
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
}): Promise<WorkflowDispatchResponse>
```

<sub>`POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches` · `actions/create-workflow-dispatch`</sub>

## `github.actions.enableWorkflow`

Enable a workflow — [API reference](https://docs.github.com/rest/actions/workflows#enable-a-workflow)

```ts
github.actions.enableWorkflow(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflow_id: number | string;
}): Promise<unknown>
```

<sub>`PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable` · `actions/enable-workflow`</sub>

## `github.actions.listWorkflowRuns`

List workflow runs for a workflow — [API reference](https://docs.github.com/rest/actions/workflow-runs#list-workflow-runs-for-a-workflow)

```ts
github.actions.listWorkflowRuns(input: {
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
}): Promise<{ total_count: number; workflow_runs: (WorkflowRun)[] }>
```

<sub>`GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs` · `actions/list-workflow-runs`</sub>

## `github.actions.getWorkflowUsage`

Get workflow usage — [API reference](https://docs.github.com/rest/actions/workflows#get-workflow-usage)

```ts
github.actions.getWorkflowUsage(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The ID of the workflow. You can also pass the workflow file name as a string. */
  workflow_id: number | string;
}): Promise<WorkflowUsage>
```

<sub>`GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing` · `actions/get-workflow-usage`</sub>

## `github.actions.listEnvironmentSecrets`

List environment secrets — [API reference](https://docs.github.com/rest/actions/secrets#list-environment-secrets)

```ts
github.actions.listEnvironmentSecrets(input: {
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
}): Promise<{ total_count: number; secrets: (ActionsSecret)[] }>
```

<sub>`GET /repos/{owner}/{repo}/environments/{environment_name}/secrets` · `actions/list-environment-secrets`</sub>

## `github.actions.deleteEnvironmentSecret`

Delete an environment secret — [API reference](https://docs.github.com/rest/actions/secrets#delete-an-environment-secret)

```ts
github.actions.deleteEnvironmentSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
  environment_name: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` · `actions/delete-environment-secret`</sub>

## `github.actions.getEnvironmentSecret`

Get an environment secret — [API reference](https://docs.github.com/rest/actions/secrets#get-an-environment-secret)

```ts
github.actions.getEnvironmentSecret(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
  environment_name: string;
  /** The name of the secret. */
  secret_name: string;
}): Promise<ActionsSecret>
```

<sub>`GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` · `actions/get-environment-secret`</sub>

## `github.actions.createOrUpdateEnvironmentSecret`

Create or update an environment secret — [API reference](https://docs.github.com/rest/actions/secrets#create-or-update-an-environment-secret)

```ts
github.actions.createOrUpdateEnvironmentSecret(input: {
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
}): Promise<EmptyObject>
```

<sub>`PUT /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}` · `actions/create-or-update-environment-secret`</sub>

## `github.actions.getEnvironmentPublicKey`

Get an environment public key — [API reference](https://docs.github.com/rest/actions/secrets#get-an-environment-public-key)

```ts
github.actions.getEnvironmentPublicKey(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
  environment_name: string;
}): Promise<ActionsPublicKey>
```

<sub>`GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key` · `actions/get-environment-public-key`</sub>

## `github.actions.listEnvironmentVariables`

List environment variables — [API reference](https://docs.github.com/rest/actions/variables#list-environment-variables)

```ts
github.actions.listEnvironmentVariables(input: {
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
}): Promise<{ total_count: number; variables: (ActionsVariable)[] }>
```

<sub>`GET /repos/{owner}/{repo}/environments/{environment_name}/variables` · `actions/list-environment-variables`</sub>

## `github.actions.createEnvironmentVariable`

Create an environment variable — [API reference](https://docs.github.com/rest/actions/variables#create-an-environment-variable)

```ts
github.actions.createEnvironmentVariable(input: {
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
}): Promise<EmptyObject>
```

<sub>`POST /repos/{owner}/{repo}/environments/{environment_name}/variables` · `actions/create-environment-variable`</sub>

## `github.actions.deleteEnvironmentVariable`

Delete an environment variable — [API reference](https://docs.github.com/rest/actions/variables#delete-an-environment-variable)

```ts
github.actions.deleteEnvironmentVariable(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the variable. */
  name: string;
  /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
  environment_name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` · `actions/delete-environment-variable`</sub>

## `github.actions.getEnvironmentVariable`

Get an environment variable — [API reference](https://docs.github.com/rest/actions/variables#get-an-environment-variable)

```ts
github.actions.getEnvironmentVariable(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`. */
  environment_name: string;
  /** The name of the variable. */
  name: string;
}): Promise<ActionsVariable>
```

<sub>`GET /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` · `actions/get-environment-variable`</sub>

## `github.actions.updateEnvironmentVariable`

Update an environment variable — [API reference](https://docs.github.com/rest/actions/variables#update-an-environment-variable)

```ts
github.actions.updateEnvironmentVariable(input: {
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
}, options: { params: { name: string } }): Promise<unknown>
```

<sub>`PATCH /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}` · `actions/update-environment-variable`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
