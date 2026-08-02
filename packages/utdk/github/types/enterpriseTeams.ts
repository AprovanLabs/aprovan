import type { BasicError, EnterpriseTeam } from "./schemas.js";

export type EnterpriseTeamsOperations = {
  /**
   * List enterprise teams
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-teams#list-enterprise-teams
   */
  list: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(EnterpriseTeam)[]>;

  /**
   * Create an enterprise team
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-teams#create-an-enterprise-team
   */
  create: (input: {
    /** The name of the team. */
    name: string;
    /** A description of the team. */
    description?: string | null;
    /** Retired: this field is no longer supported. Whether the enterprise team should be reflected in each organization. This value cannot be set.  */
    sync_to_organizations?: "all" | "disabled";
    /** Specifies which organizations in the enterprise should have access to this team. Can be one of `disabled`, `selected`, or `all`. `disabled`: The team is not assigned to any organizations. This is the default when you create a new team. `selected`: The team is assigned to specific organizations. You can then use the [add organization assignments API](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#add-organization-assignments) endpoint. `all`: The team is assigned to all current and future organizations in the enterprise.  */
    organization_selection_type?: "disabled" | "selected" | "all";
    /** The ID of the IdP group to assign team membership with. You can get this value from the [REST API endpoints for SCIM](https://docs.github.com/rest/scim#list-provisioned-scim-groups-for-an-enterprise). */
    group_id?: string | null;
    /** The notification setting the team is set to. The options are:  * `notifications_enabled` - team members receive notifications when the team is @mentioned. * `notifications_disabled` - no one receives notifications.  Default: `notifications_enabled`  */
    notification_setting?: "notifications_enabled" | "notifications_disabled";
    /** The slug version of the enterprise name. */
    enterprise: string;
  }) => Promise<EnterpriseTeam>;

  /**
   * Get an enterprise team
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-teams#get-an-enterprise-team
   */
  get: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<EnterpriseTeam>;

  /**
   * Update an enterprise team
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-teams#update-an-enterprise-team
   */
  update: (input: {
    /** A new name for the team. */
    name?: string | null;
    /** A new description for the team. */
    description?: string | null;
    /** Retired: this field is no longer supported. Whether the enterprise team should be reflected in each organization. This value cannot be changed.  */
    sync_to_organizations?: "all" | "disabled";
    /** Specifies which organizations in the enterprise should have access to this team. Can be one of `disabled`, `selected`, or `all`. `disabled`: The team is not assigned to any organizations. This is the default when you create a new team. `selected`: The team is assigned to specific organizations. You can then use the [add organization assignments API](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#add-organization-assignments). `all`: The team is assigned to all current and future organizations in the enterprise.  */
    organization_selection_type?: "disabled" | "selected" | "all";
    /** The ID of the IdP group to assign team membership with. The new IdP group will replace the existing one, or replace existing direct members if the team isn't currently linked to an IdP group. */
    group_id?: string | null;
    /** The notification setting the team is set to. The options are:  * `notifications_enabled` - team members receive notifications when the team is @mentioned. * `notifications_disabled` - no one receives notifications.  */
    notification_setting?: "notifications_enabled" | "notifications_disabled";
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<EnterpriseTeam>;

  /**
   * Delete an enterprise team
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-teams#delete-an-enterprise-team
   */
  delete: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<BasicError>;
};
