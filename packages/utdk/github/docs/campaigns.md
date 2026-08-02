# Campaigns

5 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.campaigns.listOrgCampaigns`

List campaigns for an organization — [API reference](https://docs.github.com/rest/campaigns/campaigns#list-campaigns-for-an-organization)

```ts
github.campaigns.listOrgCampaigns(input: {
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
}): Promise<(CampaignSummary)[]>
```

<sub>`GET /orgs/{org}/campaigns` · `campaigns/list-org-campaigns`</sub>

## `github.campaigns.createCampaign`

Create a campaign for an organization — [API reference](https://docs.github.com/rest/campaigns/campaigns#create-a-campaign-for-an-organization)

```ts
github.campaigns.createCampaign(input: {
  body: unknown | unknown;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<CampaignSummary>
```

<sub>`POST /orgs/{org}/campaigns` · `campaigns/create-campaign`</sub>

## `github.campaigns.deleteCampaign`

Delete a campaign for an organization — [API reference](https://docs.github.com/rest/campaigns/campaigns#delete-a-campaign-for-an-organization)

```ts
github.campaigns.deleteCampaign(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The campaign number. */
  campaign_number: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/campaigns/{campaign_number}` · `campaigns/delete-campaign`</sub>

## `github.campaigns.getCampaignSummary`

Get a campaign for an organization — [API reference](https://docs.github.com/rest/campaigns/campaigns#get-a-campaign-for-an-organization)

```ts
github.campaigns.getCampaignSummary(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The campaign number. */
  campaign_number: number;
}): Promise<CampaignSummary>
```

<sub>`GET /orgs/{org}/campaigns/{campaign_number}` · `campaigns/get-campaign-summary`</sub>

## `github.campaigns.updateCampaign`

Update a campaign — [API reference](https://docs.github.com/rest/campaigns/campaigns#update-a-campaign)

```ts
github.campaigns.updateCampaign(input: {
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
}): Promise<CampaignSummary>
```

<sub>`PATCH /orgs/{org}/campaigns/{campaign_number}` · `campaigns/update-campaign`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
