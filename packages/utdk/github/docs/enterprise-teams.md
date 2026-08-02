# Enterprise Teams

5 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.enterpriseTeams.list`

List enterprise teams — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-teams#list-enterprise-teams)

```ts
github.enterpriseTeams.list(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(EnterpriseTeam)[]>
```

<sub>`GET /enterprises/{enterprise}/teams` · `enterprise-teams/list`</sub>

## `github.enterpriseTeams.create`

Create an enterprise team — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-teams#create-an-enterprise-team)

```ts
github.enterpriseTeams.create(input: {
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
}): Promise<EnterpriseTeam>
```

<sub>`POST /enterprises/{enterprise}/teams` · `enterprise-teams/create`</sub>

## `github.enterpriseTeams.delete`

Delete an enterprise team — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-teams#delete-an-enterprise-team)

```ts
github.enterpriseTeams.delete(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<BasicError>
```

<sub>`DELETE /enterprises/{enterprise}/teams/{team_slug}` · `enterprise-teams/delete`</sub>

## `github.enterpriseTeams.get`

Get an enterprise team — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-teams#get-an-enterprise-team)

```ts
github.enterpriseTeams.get(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<EnterpriseTeam>
```

<sub>`GET /enterprises/{enterprise}/teams/{team_slug}` · `enterprise-teams/get`</sub>

## `github.enterpriseTeams.update`

Update an enterprise team — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-teams#update-an-enterprise-team)

```ts
github.enterpriseTeams.update(input: {
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
}): Promise<EnterpriseTeam>
```

<sub>`PATCH /enterprises/{enterprise}/teams/{team_slug}` · `enterprise-teams/update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
