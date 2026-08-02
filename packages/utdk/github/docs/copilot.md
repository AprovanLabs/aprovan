# Copilot

29 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.copilot.copilotEnterpriseOneDayUsageMetrics`

Get Copilot enterprise usage metrics for a specific day — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-enterprise-usage-metrics-for-a-specific-day)

```ts
github.copilot.copilotEnterpriseOneDayUsageMetrics(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The day to request data for, in `YYYY-MM-DD` format. */
  day: string;
}): Promise<CopilotUsageMetrics1DayReport>
```

<sub>`GET /enterprises/{enterprise}/copilot/metrics/reports/enterprise-1-day` · `copilot/copilot-enterprise-one-day-usage-metrics`</sub>

## `github.copilot.copilotEnterpriseUsageMetrics`

Get Copilot enterprise usage metrics — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-enterprise-usage-metrics)

```ts
github.copilot.copilotEnterpriseUsageMetrics(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<CopilotUsageMetrics28DayReport>
```

<sub>`GET /enterprises/{enterprise}/copilot/metrics/reports/enterprise-28-day/latest` · `copilot/copilot-enterprise-usage-metrics`</sub>

## `github.copilot.copilotEnterpriseUserTeamsOneDayReport`

Get Copilot enterprise user-teams report for a specific day — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-enterprise-user-teams-report-for-a-specific-day)

```ts
github.copilot.copilotEnterpriseUserTeamsOneDayReport(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The day to request data for, in `YYYY-MM-DD` format. */
  day: string;
}): Promise<CopilotUsageMetrics1DayReport>
```

<sub>`GET /enterprises/{enterprise}/copilot/metrics/reports/user-teams-1-day` · `copilot/copilot-enterprise-user-teams-one-day-report`</sub>

## `github.copilot.copilotUsersOneDayUsageMetrics`

Get Copilot users usage metrics for a specific day — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-users-usage-metrics-for-a-specific-day)

```ts
github.copilot.copilotUsersOneDayUsageMetrics(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The day to request data for, in `YYYY-MM-DD` format. */
  day: string;
}): Promise<CopilotUsageMetrics1DayReport>
```

<sub>`GET /enterprises/{enterprise}/copilot/metrics/reports/users-1-day` · `copilot/copilot-users-one-day-usage-metrics`</sub>

## `github.copilot.copilotUsersUsageMetrics`

Get Copilot users usage metrics — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-users-usage-metrics)

```ts
github.copilot.copilotUsersUsageMetrics(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<CopilotUsageMetrics28DayReport>
```

<sub>`GET /enterprises/{enterprise}/copilot/metrics/reports/users-28-day/latest` · `copilot/copilot-users-usage-metrics`</sub>

## `github.copilot.setEnterpriseCodingAgentPolicy`

Set the coding agent policy for an enterprise — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#set-the-coding-agent-policy-for-an-enterprise)

```ts
github.copilot.setEnterpriseCodingAgentPolicy(input: {
  /** The policy state for Copilot cloud agent in the enterprise. Can be one of `enabled_for_all_orgs`, `disabled_for_all_orgs`, `enabled_for_selected_orgs`, or `configured_by_org_admins`. */
  policy_state: "enabled_for_all_orgs" | "disabled_for_all_orgs" | "enabled_for_selected_orgs" | "configured_by_org_admins";
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`PUT /enterprises/{enterprise}/copilot/policies/coding_agent` · `copilot/set-enterprise-coding-agent-policy`</sub>

## `github.copilot.removeOrganizationsFromEnterpriseCodingAgentPolicy`

Remove organizations from the enterprise coding agent policy — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#remove-organizations-from-the-enterprise-coding-agent-policy)

```ts
github.copilot.removeOrganizationsFromEnterpriseCodingAgentPolicy(input: {
  /** List of organization logins within the enterprise to disable Copilot cloud agent for. */
  organizations?: (string)[];
  /** List of custom property filters to match organizations. Organizations matching any of the specified property name/value pairs will be included. This is a one-time operation, setting the property on an organization in the future will not automatically update its coding agent policy. */
  custom_properties?: ({ property_name: string; values: (string)[] })[];
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`DELETE /enterprises/{enterprise}/copilot/policies/coding_agent/organizations` · `copilot/remove-organizations-from-enterprise-coding-agent-policy`</sub>

## `github.copilot.addOrganizationsToEnterpriseCodingAgentPolicy`

Add organizations to the enterprise coding agent policy — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#add-organizations-to-the-enterprise-coding-agent-policy)

```ts
github.copilot.addOrganizationsToEnterpriseCodingAgentPolicy(input: {
  /** List of organization logins within the enterprise to enable Copilot cloud agent for. */
  organizations?: (string)[];
  /** List of custom property filters to match organizations. Organizations matching any of the specified property name/value pairs will be included. This is a one-time operation, setting the property on an organization in the future will not automatically update its coding agent policy. */
  custom_properties?: ({ property_name: string; values: (string)[] })[];
  /** The slug version of the enterprise name. */
  enterprise: string;
}): Promise<BasicError>
```

<sub>`POST /enterprises/{enterprise}/copilot/policies/coding_agent/organizations` · `copilot/add-organizations-to-enterprise-coding-agent-policy`</sub>

## `github.copilot.getCopilotOrganizationDetails`

Get Copilot seat information and settings for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#get-copilot-seat-information-and-settings-for-an-organization)

```ts
github.copilot.getCopilotOrganizationDetails(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CopilotOrganizationDetails>
```

<sub>`GET /orgs/{org}/copilot/billing` · `copilot/get-copilot-organization-details`</sub>

## `github.copilot.listCopilotSeats`

List all Copilot seat assignments for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#list-all-copilot-seat-assignments-for-an-organization)

```ts
github.copilot.listCopilotSeats(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<{ total_seats?: number; seats?: (CopilotSeatDetails)[] }>
```

<sub>`GET /orgs/{org}/copilot/billing/seats` · `copilot/list-copilot-seats`</sub>

## `github.copilot.cancelCopilotSeatAssignmentForTeams`

Remove teams from the Copilot subscription for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#remove-teams-from-the-copilot-subscription-for-an-organization)

```ts
github.copilot.cancelCopilotSeatAssignmentForTeams(input: {
  /** The names of teams from which to revoke access to GitHub Copilot. */
  selected_teams: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ seats_cancelled: number }>
```

<sub>`DELETE /orgs/{org}/copilot/billing/selected_teams` · `copilot/cancel-copilot-seat-assignment-for-teams`</sub>

## `github.copilot.addCopilotSeatsForTeams`

Add teams to the Copilot subscription for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#add-teams-to-the-copilot-subscription-for-an-organization)

```ts
github.copilot.addCopilotSeatsForTeams(input: {
  /** List of team names within the organization to which to grant access to GitHub Copilot. */
  selected_teams: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ seats_created: number }>
```

<sub>`POST /orgs/{org}/copilot/billing/selected_teams` · `copilot/add-copilot-seats-for-teams`</sub>

## `github.copilot.cancelCopilotSeatAssignmentForUsers`

Remove users from the Copilot subscription for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#remove-users-from-the-copilot-subscription-for-an-organization)

```ts
github.copilot.cancelCopilotSeatAssignmentForUsers(input: {
  /** The usernames of the organization members for which to revoke access to GitHub Copilot. */
  selected_usernames: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ seats_cancelled: number }>
```

<sub>`DELETE /orgs/{org}/copilot/billing/selected_users` · `copilot/cancel-copilot-seat-assignment-for-users`</sub>

## `github.copilot.addCopilotSeatsForUsers`

Add users to the Copilot subscription for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#add-users-to-the-copilot-subscription-for-an-organization)

```ts
github.copilot.addCopilotSeatsForUsers(input: {
  /** The usernames of the organization members to be granted access to GitHub Copilot. */
  selected_usernames: (string)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ seats_created: number }>
```

<sub>`POST /orgs/{org}/copilot/billing/selected_users` · `copilot/add-copilot-seats-for-users`</sub>

## `github.copilot.getCopilotCodingAgentPermissionsOrganization`

Get Copilot cloud agent permissions for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#get-copilot-cloud-agent-permissions-for-an-organization)

```ts
github.copilot.getCopilotCodingAgentPermissionsOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ enabled_repositories: "all" | "selected" | "none"; selected_repositories_url?: string }>
```

<sub>`GET /orgs/{org}/copilot/coding-agent/permissions` · `copilot/get-copilot-coding-agent-permissions-organization`</sub>

## `github.copilot.setCopilotCodingAgentPermissionsOrganization`

Set Copilot cloud agent permissions for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#set-copilot-cloud-agent-permissions-for-an-organization)

```ts
github.copilot.setCopilotCodingAgentPermissionsOrganization(input: {
  /** The policy for which repositories can use Copilot cloud agent. Can be one of `all`, `selected`, or `none`. */
  enabled_repositories: "all" | "selected" | "none";
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/copilot/coding-agent/permissions` · `copilot/set-copilot-coding-agent-permissions-organization`</sub>

## `github.copilot.listCopilotCodingAgentSelectedRepositoriesForOrganization`

List repositories enabled for Copilot cloud agent in an organization — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#list-repositories-enabled-for-copilot-cloud-agent-in-an-organization)

```ts
github.copilot.listCopilotCodingAgentSelectedRepositoriesForOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<{ total_count: number; repositories: (MinimalRepository)[] }>
```

<sub>`GET /orgs/{org}/copilot/coding-agent/permissions/repositories` · `copilot/list-copilot-coding-agent-selected-repositories-for-organization`</sub>

## `github.copilot.setCopilotCodingAgentSelectedRepositoriesForOrganization`

Set selected repositories for Copilot cloud agent in an organization — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#set-selected-repositories-for-copilot-cloud-agent-in-an-organization)

```ts
github.copilot.setCopilotCodingAgentSelectedRepositoriesForOrganization(input: {
  /** List of repository IDs to enable for Copilot cloud agent. */
  selected_repository_ids: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/copilot/coding-agent/permissions/repositories` · `copilot/set-copilot-coding-agent-selected-repositories-for-organization`</sub>

## `github.copilot.disableCopilotCodingAgentForRepositoryInOrganization`

Disable a repository for Copilot cloud agent in an organization — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#disable-a-repository-for-copilot-cloud-agent-in-an-organization)

```ts
github.copilot.disableCopilotCodingAgentForRepositoryInOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}` · `copilot/disable-copilot-coding-agent-for-repository-in-organization`</sub>

## `github.copilot.enableCopilotCodingAgentForRepositoryInOrganization`

Enable a repository for Copilot cloud agent in an organization — [API reference](https://docs.github.com/rest/copilot/copilot-coding-agent-management#enable-a-repository-for-copilot-cloud-agent-in-an-organization)

```ts
github.copilot.enableCopilotCodingAgentForRepositoryInOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the repository. */
  repository_id: number;
}): Promise<BasicError>
```

<sub>`PUT /orgs/{org}/copilot/coding-agent/permissions/repositories/{repository_id}` · `copilot/enable-copilot-coding-agent-for-repository-in-organization`</sub>

## `github.copilot.copilotContentExclusionForOrganization`

Get Copilot content exclusion rules for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-content-exclusion-management#get-copilot-content-exclusion-rules-for-an-organization)

```ts
github.copilot.copilotContentExclusionForOrganization(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CopilotOrganizationContentExclusionDetails>
```

<sub>`GET /orgs/{org}/copilot/content_exclusion` · `copilot/copilot-content-exclusion-for-organization`</sub>

## `github.copilot.setCopilotContentExclusionForOrganization`

Set Copilot content exclusion rules for an organization — [API reference](https://docs.github.com/rest/copilot/copilot-content-exclusion-management#set-copilot-content-exclusion-rules-for-an-organization)

```ts
github.copilot.setCopilotContentExclusionForOrganization(input: {
  body: { [key: string]: (string | { ifAnyMatch: (string)[] } | { ifNoneMatch: (string)[] })[] | undefined };
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<{ message?: string }>
```

<sub>`PUT /orgs/{org}/copilot/content_exclusion` · `copilot/set-copilot-content-exclusion-for-organization`</sub>

## `github.copilot.copilotOrganizationOneDayUsageMetrics`

Get Copilot organization usage metrics for a specific day — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-usage-metrics-for-a-specific-day)

```ts
github.copilot.copilotOrganizationOneDayUsageMetrics(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The day to request data for, in `YYYY-MM-DD` format. */
  day: string;
}): Promise<CopilotUsageMetrics1DayReport>
```

<sub>`GET /orgs/{org}/copilot/metrics/reports/organization-1-day` · `copilot/copilot-organization-one-day-usage-metrics`</sub>

## `github.copilot.copilotOrganizationUsageMetrics`

Get Copilot organization usage metrics — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-usage-metrics)

```ts
github.copilot.copilotOrganizationUsageMetrics(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CopilotUsageMetrics28DayReport>
```

<sub>`GET /orgs/{org}/copilot/metrics/reports/organization-28-day/latest` · `copilot/copilot-organization-usage-metrics`</sub>

## `github.copilot.copilotOrganizationUserTeamsOneDayReport`

Get Copilot organization user-teams report for a specific day — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-user-teams-report-for-a-specific-day)

```ts
github.copilot.copilotOrganizationUserTeamsOneDayReport(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The day to request data for, in `YYYY-MM-DD` format. */
  day: string;
}): Promise<CopilotUsageMetrics1DayReport>
```

<sub>`GET /orgs/{org}/copilot/metrics/reports/user-teams-1-day` · `copilot/copilot-organization-user-teams-one-day-report`</sub>

## `github.copilot.copilotOrganizationUsersOneDayUsageMetrics`

Get Copilot organization users usage metrics for a specific day — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-users-usage-metrics-for-a-specific-day)

```ts
github.copilot.copilotOrganizationUsersOneDayUsageMetrics(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The day to request data for, in `YYYY-MM-DD` format. */
  day: string;
}): Promise<CopilotUsageMetrics1DayReport>
```

<sub>`GET /orgs/{org}/copilot/metrics/reports/users-1-day` · `copilot/copilot-organization-users-one-day-usage-metrics`</sub>

## `github.copilot.copilotOrganizationUsersUsageMetrics`

Get Copilot organization users usage metrics — [API reference](https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-users-usage-metrics)

```ts
github.copilot.copilotOrganizationUsersUsageMetrics(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CopilotUsageMetrics28DayReport>
```

<sub>`GET /orgs/{org}/copilot/metrics/reports/users-28-day/latest` · `copilot/copilot-organization-users-usage-metrics`</sub>

## `github.copilot.getCopilotSeatDetailsForUser`

Get Copilot seat assignment details for a user — [API reference](https://docs.github.com/rest/copilot/copilot-user-management#get-copilot-seat-assignment-details-for-a-user)

```ts
github.copilot.getCopilotSeatDetailsForUser(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<CopilotSeatDetails>
```

<sub>`GET /orgs/{org}/members/{username}/copilot` · `copilot/get-copilot-seat-details-for-user`</sub>

## `github.copilot.getCopilotCloudAgentConfiguration`

Get Copilot cloud agent configuration for a repository — [API reference](https://docs.github.com/rest/copilot/copilot-cloud-agent-management#get-copilot-cloud-agent-configuration-for-a-repository)

```ts
github.copilot.getCopilotCloudAgentConfiguration(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<{ mcp_configuration: { [key: string]: unknown } | null; enabled_tools: { codeql: boolean; copilot_code_review: boolean; secret_scanning: boolean; dependency_vulnerability_checks: boolean }; require_actions_workflow_approval: boolean; is_firewall_enabled: boolean; is_firewall_recommended_allowlist_enabled: boolean; custom_allowlist: (string)[] }>
```

<sub>`GET /repos/{owner}/{repo}/copilot/cloud-agent/configuration` · `copilot/get-copilot-cloud-agent-configuration`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
