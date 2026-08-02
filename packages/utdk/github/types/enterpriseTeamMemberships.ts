import type { BasicError, SimpleUser } from "./schemas.js";

export type EnterpriseTeamMembershipsOperations = {
  /**
   * List members in an enterprise team
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-members#list-members-in-an-enterprise-team
   */
  list: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Bulk add team members
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-members#bulk-add-team-members
   */
  bulkAdd: (input: {
    /** The GitHub user handles to add to the team. */
    usernames: (string)[];
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Bulk remove team members
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-members#bulk-remove-team-members
   */
  bulkRemove: (input: {
    /** The GitHub user handles to be removed from the team. */
    usernames: (string)[];
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Get enterprise team membership
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-members#get-enterprise-team-membership
   */
  get: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<SimpleUser>;

  /**
   * Add team member
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-members#add-team-member
   */
  add: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<SimpleUser>;

  /**
   * Remove team membership
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-members#remove-team-membership
   */
  remove: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<BasicError>;
};
