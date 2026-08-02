import type { BasicError, CampaignState, CampaignSummary } from "./schemas.js";

export type CampaignsOperations = {
  /**
   * List campaigns for an organization
   * @see https://docs.github.com/rest/campaigns/campaigns#list-campaigns-for-an-organization
   */
  listOrgCampaigns: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    state?: CampaignState;
    /** The property by which to sort the results. */
    sort?: "created" | "updated" | "ends_at" | "published";
  }) => Promise<(CampaignSummary)[]>;

  /**
   * Create a campaign for an organization
   * @see https://docs.github.com/rest/campaigns/campaigns#create-a-campaign-for-an-organization
   */
  createCampaign: (input: {
    body: unknown | unknown;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<CampaignSummary>;

  /**
   * Get a campaign for an organization
   * @see https://docs.github.com/rest/campaigns/campaigns#get-a-campaign-for-an-organization
   */
  getCampaignSummary: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The campaign number. */
    campaign_number: number;
  }) => Promise<CampaignSummary>;

  /**
   * Update a campaign
   * @see https://docs.github.com/rest/campaigns/campaigns#update-a-campaign
   */
  updateCampaign: (input: {
    /** The name of the campaign */
    name?: string;
    /** A description for the campaign */
    description?: string;
    /** The logins of the users to set as the campaign managers. At this time, only a single manager can be supplied. */
    managers?: (string)[];
    /** The slugs of the teams to set as the campaign managers. */
    team_managers?: (string)[];
    /** The end date and time of the campaign, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ. */
    ends_at?: string;
    /** The contact link of the campaign. Must be a URI. */
    contact_link?: string | null;
    state?: CampaignState;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The campaign number. */
    campaign_number: number;
  }) => Promise<CampaignSummary>;

  /**
   * Delete a campaign for an organization
   * @see https://docs.github.com/rest/campaigns/campaigns#delete-a-campaign-for-an-organization
   */
  deleteCampaign: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The campaign number. */
    campaign_number: number;
  }) => Promise<BasicError>;
};
