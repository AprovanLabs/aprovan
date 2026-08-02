import type { OrganizationSimple } from "./schemas.js";

export type EnterpriseTeamOrganizationsOperations = {
  /**
   * Get organization assignments
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#get-organization-assignments
   */
  getAssignments: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(OrganizationSimple)[]>;

  /**
   * Add organization assignments
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#add-organization-assignments
   */
  bulkAdd: (input: {
    /** Organization slug to assign the team to. */
    organization_slugs: (string)[];
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
  }) => Promise<(OrganizationSimple)[]>;

  /**
   * Remove organization assignments
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#remove-organization-assignments
   */
  bulkRemove: (input: {
    /** Organization slug to unassign the team from. */
    organization_slugs: (string)[];
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
  }) => Promise<unknown>;

  /**
   * Get organization assignment
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#get-organization-assignment
   */
  getAssignment: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrganizationSimple>;

  /**
   * Add an organization assignment
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#add-an-organization-assignment
   */
  add: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<OrganizationSimple>;

  /**
   * Delete an organization assignment
   * @see https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#delete-an-organization-assignment
   */
  delete: (input: {
    /** The slug version of the enterprise name. */
    enterprise: string;
    /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
    "enterprise-team": string;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;
};
