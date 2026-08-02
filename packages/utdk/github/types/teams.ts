import type { BasicError, MinimalRepository, OrganizationInvitation, Team, TeamFull, TeamMember, TeamMembership, TeamRepository } from "./schemas.js";

export type TeamsOperations = {
  /**
   * List teams
   * @see https://docs.github.com/rest/teams/teams#list-teams
   */
  list: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** Filter team results by their type. For more information, see "[What kind of team should I use?](https://docs.github.com/enterprise-cloud@latest/admin/concepts/enterprise-fundamentals/teams-in-an-enterprise#what-kind-of-team-should-i-use)" */
    team_type?: "all" | "enterprise" | "organization";
  }) => Promise<(Team)[]>;

  /**
   * Create a team
   * @see https://docs.github.com/rest/teams/teams#create-a-team
   */
  create: (input: {
    /** The name of the team. */
    name: string;
    /** The description of the team. */
    description?: string;
    /** List GitHub usernames for organization members who will become team maintainers. */
    maintainers?: (string)[];
    /** The full name (e.g., "organization-name/repository-name") of repositories to add the team to. */
    repo_names?: (string)[];
    /** The level of privacy this team should have. The options are:   **For a non-nested team:**    * `secret` - only visible to organization owners and members of this team.    * `closed` - visible to all members of this organization.   Default: `secret`   **For a parent or child team:**    * `closed` - visible to all members of this organization.   Default for child team: `closed` */
    privacy?: "secret" | "closed";
    /** The notification setting the team has chosen. The options are:    * `notifications_enabled` - team members receive notifications when the team is @mentioned.    * `notifications_disabled` - no one receives notifications.   Default: `notifications_enabled` */
    notification_setting?: "notifications_enabled" | "notifications_disabled";
    /** **Closing down notice**. The permission that new repositories will be added to the team with when none is specified. */
    permission?: "pull" | "push";
    /** The ID of a team to set as the parent team. */
    parent_team_id?: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<TeamFull>;

  /**
   * Get a team by name
   * @see https://docs.github.com/rest/teams/teams#get-a-team-by-name
   */
  getByName: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<TeamFull>;

  /**
   * Update a team
   * @see https://docs.github.com/rest/teams/teams#update-a-team
   */
  updateInOrg: (input: {
    /** The name of the team. */
    name?: string;
    /** The description of the team. */
    description?: string;
    /** The level of privacy this team should have. Editing teams without specifying this parameter leaves `privacy` intact. When a team is nested, the `privacy` for parent teams cannot be `secret`. The options are:   **For a non-nested team:**    * `secret` - only visible to organization owners and members of this team.    * `closed` - visible to all members of this organization.   **For a parent or child team:**    * `closed` - visible to all members of this organization. */
    privacy?: "secret" | "closed";
    /** The notification setting the team has chosen. Editing teams without specifying this parameter leaves `notification_setting` intact. The options are:   * `notifications_enabled` - team members receive notifications when the team is @mentioned.    * `notifications_disabled` - no one receives notifications. */
    notification_setting?: "notifications_enabled" | "notifications_disabled";
    /** **Closing down notice**. The permission that new repositories will be added to the team with when none is specified. */
    permission?: "pull" | "push" | "admin";
    /** The ID of a team to set as the parent team. */
    parent_team_id?: number | null;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<TeamFull>;

  /**
   * Delete a team
   * @see https://docs.github.com/rest/teams/teams#delete-a-team
   */
  deleteInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
  }) => Promise<unknown>;

  /**
   * List pending team invitations
   * @see https://docs.github.com/rest/teams/members#list-pending-team-invitations
   */
  listPendingInvitationsInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrganizationInvitation)[]>;

  /**
   * List team members
   * @see https://docs.github.com/rest/teams/members#list-team-members
   */
  listMembersInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** Filters members returned by their role in the team. */
    role?: "member" | "maintainer" | "all";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(TeamMember)[]>;

  /**
   * Get team membership for a user
   * @see https://docs.github.com/rest/teams/members#get-team-membership-for-a-user
   */
  getMembershipForUserInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<TeamMembership>;

  /**
   * Add or update team membership for a user
   * @see https://docs.github.com/rest/teams/members#add-or-update-team-membership-for-a-user
   */
  addOrUpdateMembershipForUserInOrg: (input: {
    /** The role that this user should have in the team. */
    role?: "member" | "maintainer";
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<TeamMembership>;

  /**
   * Remove team membership for a user
   * @see https://docs.github.com/rest/teams/members#remove-team-membership-for-a-user
   */
  removeMembershipForUserInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * List team repositories
   * @see https://docs.github.com/rest/teams/teams#list-team-repositories
   */
  listReposInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * Check team permissions for a repository
   * @see https://docs.github.com/rest/teams/teams#check-team-permissions-for-a-repository
   */
  checkPermissionsForRepoInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<TeamRepository>;

  /**
   * Add or update team repository permissions
   * @see https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions
   */
  addOrUpdateRepoPermissionsInOrg: (input: {
    /** The permission to grant the team on this repository. We accept the following permissions to be set: `pull`, `triage`, `push`, `maintain`, `admin` and you can also specify a custom repository role name, if the owning organization has defined any. If no permission is specified, the team's `permission` attribute will be used to determine what permission to grant the team on this repository. */
    permission?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Remove a repository from a team
   * @see https://docs.github.com/rest/teams/teams#remove-a-repository-from-a-team
   */
  removeRepoInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * List child teams
   * @see https://docs.github.com/rest/teams/teams#list-child-teams
   */
  listChildInOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The slug of the team name. */
    team_slug: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Team)[]>;

  /**
   * Get a team (Legacy)
   * @see https://docs.github.com/rest/teams/teams#get-a-team-legacy
   */
  getLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
  }) => Promise<TeamFull>;

  /**
   * Update a team (Legacy)
   * @see https://docs.github.com/rest/teams/teams#update-a-team-legacy
   */
  updateLegacy: (input: {
    /** The name of the team. */
    name: string;
    /** The description of the team. */
    description?: string;
    /** The level of privacy this team should have. Editing teams without specifying this parameter leaves `privacy` intact. The options are:   **For a non-nested team:**    * `secret` - only visible to organization owners and members of this team.    * `closed` - visible to all members of this organization.   **For a parent or child team:**    * `closed` - visible to all members of this organization. */
    privacy?: "secret" | "closed";
    /** The notification setting the team has chosen. Editing teams without specifying this parameter leaves `notification_setting` intact. The options are:   * `notifications_enabled` - team members receive notifications when the team is @mentioned.    * `notifications_disabled` - no one receives notifications. */
    notification_setting?: "notifications_enabled" | "notifications_disabled";
    /** **Closing down notice**. The permission that new repositories will be added to the team with when none is specified. */
    permission?: "pull" | "push" | "admin";
    /** The ID of a team to set as the parent team. */
    parent_team_id?: number | null;
    /** The unique identifier of the team. */
    team_id: number;
  }) => Promise<TeamFull>;

  /**
   * Delete a team (Legacy)
   * @see https://docs.github.com/rest/teams/teams#delete-a-team-legacy
   */
  deleteLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
  }) => Promise<BasicError>;

  /**
   * List pending team invitations (Legacy)
   * @see https://docs.github.com/rest/teams/members#list-pending-team-invitations-legacy
   */
  listPendingInvitationsLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrganizationInvitation)[]>;

  /**
   * List team members (Legacy)
   * @see https://docs.github.com/rest/teams/members#list-team-members-legacy
   */
  listMembersLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** Filters members returned by their role in the team. */
    role?: "member" | "maintainer" | "all";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(TeamMember)[]>;

  /**
   * Get team member (Legacy)
   * @see https://docs.github.com/rest/teams/members#get-team-member-legacy
   */
  getMemberLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Add team member (Legacy)
   * @see https://docs.github.com/rest/teams/members#add-team-member-legacy
   */
  addMemberLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;

  /**
   * Remove team member (Legacy)
   * @see https://docs.github.com/rest/teams/members#remove-team-member-legacy
   */
  removeMemberLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * Get team membership for a user (Legacy)
   * @see https://docs.github.com/rest/teams/members#get-team-membership-for-a-user-legacy
   */
  getMembershipForUserLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<TeamMembership>;

  /**
   * Add or update team membership for a user (Legacy)
   * @see https://docs.github.com/rest/teams/members#add-or-update-team-membership-for-a-user-legacy
   */
  addOrUpdateMembershipForUserLegacy: (input: {
    /** The role that this user should have in the team. */
    role?: "member" | "maintainer";
    /** The unique identifier of the team. */
    team_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<TeamMembership>;

  /**
   * Remove team membership for a user (Legacy)
   * @see https://docs.github.com/rest/teams/members#remove-team-membership-for-a-user-legacy
   */
  removeMembershipForUserLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<unknown>;

  /**
   * List team repositories (Legacy)
   * @see https://docs.github.com/rest/teams/teams#list-team-repositories-legacy
   */
  listReposLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * Check team permissions for a repository (Legacy)
   * @see https://docs.github.com/rest/teams/teams#check-team-permissions-for-a-repository-legacy
   */
  checkPermissionsForRepoLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<TeamRepository>;

  /**
   * Add or update team repository permissions (Legacy)
   * @see https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions-legacy
   */
  addOrUpdateRepoPermissionsLegacy: (input: {
    /** The permission to grant the team on this repository. If no permission is specified, the team's `permission` attribute will be used to determine what permission to grant the team on this repository. */
    permission?: "pull" | "push" | "admin";
    /** The unique identifier of the team. */
    team_id: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Remove a repository from a team (Legacy)
   * @see https://docs.github.com/rest/teams/teams#remove-a-repository-from-a-team-legacy
   */
  removeRepoLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * List child teams (Legacy)
   * @see https://docs.github.com/rest/teams/teams#list-child-teams-legacy
   */
  listChildLegacy: (input: {
    /** The unique identifier of the team. */
    team_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Team)[]>;

  /**
   * List teams for the authenticated user
   * @see https://docs.github.com/rest/teams/teams#list-teams-for-the-authenticated-user
   */
  listForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(TeamFull)[]>;
};
