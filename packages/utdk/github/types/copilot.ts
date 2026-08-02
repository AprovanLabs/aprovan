import type { BasicError, CopilotOrganizationContentExclusionDetails, CopilotOrganizationDetails, CopilotSeatDetails, CopilotUsageMetrics1DayReport, CopilotUsageMetrics28DayReport, MinimalRepository } from "./schemas.js";

export type CopilotOperations = {
  /**
   * Get Copilot enterprise usage metrics for a specific day
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-enterprise-usage-metrics-for-a-specific-day
   */
  copilotEnterpriseOneDayUsageMetrics: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The day to request data for, in `YYYY-MM-DD` format. */
    day: string;
  }) => Promise<CopilotUsageMetrics1DayReport>;

  /**
   * Get Copilot enterprise usage metrics
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-enterprise-usage-metrics
   */
  copilotEnterpriseUsageMetrics: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<CopilotUsageMetrics28DayReport>;

  /**
   * Get Copilot enterprise user-teams report for a specific day
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-enterprise-user-teams-report-for-a-specific-day
   */
  copilotEnterpriseUserTeamsOneDayReport: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The day to request data for, in `YYYY-MM-DD` format. */
    day: string;
  }) => Promise<CopilotUsageMetrics1DayReport>;

  /**
   * Get Copilot users usage metrics for a specific day
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-users-usage-metrics-for-a-specific-day
   */
  copilotUsersOneDayUsageMetrics: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The day to request data for, in `YYYY-MM-DD` format. */
    day: string;
  }) => Promise<CopilotUsageMetrics1DayReport>;

  /**
   * Get Copilot users usage metrics
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-users-usage-metrics
   */
  copilotUsersUsageMetrics: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<CopilotUsageMetrics28DayReport>;

  /**
   * Set the coding agent policy for an enterprise
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#set-the-coding-agent-policy-for-an-enterprise
   */
  setEnterpriseCodingAgentPolicy: (input: {
    /** The policy state for Copilot cloud agent in the enterprise. Can be one of `enabled_for_all_orgs`, `disabled_for_all_orgs`, `enabled_for_selected_orgs`, or `configured_by_org_admins`. */
    policy_state: "enabled_for_all_orgs" | "disabled_for_all_orgs" | "enabled_for_selected_orgs" | "configured_by_org_admins";
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * Add organizations to the enterprise coding agent policy
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#add-organizations-to-the-enterprise-coding-agent-policy
   */
  addOrganizationsToEnterpriseCodingAgentPolicy: (input: {
    /** List of organization logins within the enterprise to enable Copilot cloud agent for. */
    organizations?: (string)[];
    /** List of custom property filters to match organizations. Organizations matching any of the specified property name/value pairs will be included. This is a one-time operation, setting the property on an organization in the future will not automatically update its coding agent policy. */
    custom_properties?: ({ property_name: string; values: (string)[] })[];
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * Remove organizations from the enterprise coding agent policy
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#remove-organizations-from-the-enterprise-coding-agent-policy
   */
  removeOrganizationsFromEnterpriseCodingAgentPolicy: (input: {
    /** List of organization logins within the enterprise to disable Copilot cloud agent for. */
    organizations?: (string)[];
    /** List of custom property filters to match organizations. Organizations matching any of the specified property name/value pairs will be included. This is a one-time operation, setting the property on an organization in the future will not automatically update its coding agent policy. */
    custom_properties?: ({ property_name: string; values: (string)[] })[];
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<BasicError>;

  /**
   * Get Copilot seat information and settings for an organization
   * @see https://docs.github.com/rest/copilot/copilot-user-management#get-copilot-seat-information-and-settings-for-an-organization
   */
  getCopilotOrganizationDetails: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CopilotOrganizationDetails>;

  /**
   * List all Copilot seat assignments for an organization
   * @see https://docs.github.com/rest/copilot/copilot-user-management#list-all-copilot-seat-assignments-for-an-organization
   */
  listCopilotSeats: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<{ total_seats?: number; seats?: (CopilotSeatDetails)[] }>;

  /**
   * Add teams to the Copilot subscription for an organization
   * @see https://docs.github.com/rest/copilot/copilot-user-management#add-teams-to-the-copilot-subscription-for-an-organization
   */
  addCopilotSeatsForTeams: (input: {
    /** List of team names within the organization to which to grant access to GitHub Copilot. */
    selected_teams: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ seats_created: number }>;

  /**
   * Remove teams from the Copilot subscription for an organization
   * @see https://docs.github.com/rest/copilot/copilot-user-management#remove-teams-from-the-copilot-subscription-for-an-organization
   */
  cancelCopilotSeatAssignmentForTeams: (input: {
    /** The names of teams from which to revoke access to GitHub Copilot. */
    selected_teams: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ seats_cancelled: number }>;

  /**
   * Add users to the Copilot subscription for an organization
   * @see https://docs.github.com/rest/copilot/copilot-user-management#add-users-to-the-copilot-subscription-for-an-organization
   */
  addCopilotSeatsForUsers: (input: {
    /** The usernames of the organization members to be granted access to GitHub Copilot. */
    selected_usernames: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ seats_created: number }>;

  /**
   * Remove users from the Copilot subscription for an organization
   * @see https://docs.github.com/rest/copilot/copilot-user-management#remove-users-from-the-copilot-subscription-for-an-organization
   */
  cancelCopilotSeatAssignmentForUsers: (input: {
    /** The usernames of the organization members for which to revoke access to GitHub Copilot. */
    selected_usernames: (string)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ seats_cancelled: number }>;

  /**
   * Get Copilot cloud agent permissions for an organization
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#get-copilot-cloud-agent-permissions-for-an-organization
   */
  getCopilotCodingAgentPermissionsOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ enabled_repositories: "all" | "selected" | "none"; selected_repositories_url?: string }>;

  /**
   * Set Copilot cloud agent permissions for an organization
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#set-copilot-cloud-agent-permissions-for-an-organization
   */
  setCopilotCodingAgentPermissionsOrganization: (input: {
    /** The policy for which repositories can use Copilot cloud agent. Can be one of `all`, `selected`, or `none`. */
    enabled_repositories: "all" | "selected" | "none";
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * List repositories enabled for Copilot cloud agent in an organization
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#list-repositories-enabled-for-copilot-cloud-agent-in-an-organization
   */
  listCopilotCodingAgentSelectedRepositoriesForOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<{ total_count: number; repositories: (MinimalRepository)[] }>;

  /**
   * Set selected repositories for Copilot cloud agent in an organization
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#set-selected-repositories-for-copilot-cloud-agent-in-an-organization
   */
  setCopilotCodingAgentSelectedRepositoriesForOrganization: (input: {
    /** List of repository IDs to enable for Copilot cloud agent. */
    selected_repository_ids: (number)[];
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<BasicError>;

  /**
   * Enable a repository for Copilot cloud agent in an organization
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#enable-a-repository-for-copilot-cloud-agent-in-an-organization
   */
  enableCopilotCodingAgentForRepositoryInOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Disable a repository for Copilot cloud agent in an organization
   * @see https://docs.github.com/rest/copilot/copilot-coding-agent-management#disable-a-repository-for-copilot-cloud-agent-in-an-organization
   */
  disableCopilotCodingAgentForRepositoryInOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the repository. */
    repository_id: number;
  }) => Promise<BasicError>;

  /**
   * Get Copilot content exclusion rules for an organization
   * @see https://docs.github.com/rest/copilot/copilot-content-exclusion-management#get-copilot-content-exclusion-rules-for-an-organization
   */
  copilotContentExclusionForOrganization: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CopilotOrganizationContentExclusionDetails>;

  /**
   * Set Copilot content exclusion rules for an organization
   * @see https://docs.github.com/rest/copilot/copilot-content-exclusion-management#set-copilot-content-exclusion-rules-for-an-organization
   */
  setCopilotContentExclusionForOrganization: (input: {
    body: { [key: string]: (string | { ifAnyMatch: (string)[] } | { ifNoneMatch: (string)[] })[] | undefined };
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<{ message?: string }>;

  /**
   * Get Copilot organization usage metrics for a specific day
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-usage-metrics-for-a-specific-day
   */
  copilotOrganizationOneDayUsageMetrics: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The day to request data for, in `YYYY-MM-DD` format. */
    day: string;
  }) => Promise<CopilotUsageMetrics1DayReport>;

  /**
   * Get Copilot organization usage metrics
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-usage-metrics
   */
  copilotOrganizationUsageMetrics: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CopilotUsageMetrics28DayReport>;

  /**
   * Get Copilot organization user-teams report for a specific day
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-user-teams-report-for-a-specific-day
   */
  copilotOrganizationUserTeamsOneDayReport: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The day to request data for, in `YYYY-MM-DD` format. */
    day: string;
  }) => Promise<CopilotUsageMetrics1DayReport>;

  /**
   * Get Copilot organization users usage metrics for a specific day
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-users-usage-metrics-for-a-specific-day
   */
  copilotOrganizationUsersOneDayUsageMetrics: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The day to request data for, in `YYYY-MM-DD` format. */
    day: string;
  }) => Promise<CopilotUsageMetrics1DayReport>;

  /**
   * Get Copilot organization users usage metrics
   * @see https://docs.github.com/rest/copilot/copilot-usage-metrics#get-copilot-organization-users-usage-metrics
   */
  copilotOrganizationUsersUsageMetrics: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CopilotUsageMetrics28DayReport>;

  /**
   * Get Copilot seat assignment details for a user
   * @see https://docs.github.com/rest/copilot/copilot-user-management#get-copilot-seat-assignment-details-for-a-user
   */
  getCopilotSeatDetailsForUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<CopilotSeatDetails>;

  /**
   * Get Copilot cloud agent configuration for a repository
   * @see https://docs.github.com/rest/copilot/copilot-cloud-agent-management#get-copilot-cloud-agent-configuration-for-a-repository
   */
  getCopilotCloudAgentConfiguration: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ mcp_configuration: { [key: string]: unknown } | null; enabled_tools: { codeql: boolean; copilot_code_review: boolean; secret_scanning: boolean; dependency_vulnerability_checks: boolean }; require_actions_workflow_approval: boolean; is_firewall_enabled: boolean; is_firewall_recommended_allowlist_enabled: boolean; custom_allowlist: (string)[] }>;
};
