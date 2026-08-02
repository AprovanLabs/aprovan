# Enterprise Team Organizations

6 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.enterpriseTeamOrganizations.getAssignments`

Get organization assignments — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#get-organization-assignments)

```ts
github.enterpriseTeamOrganizations.getAssignments(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrganizationSimple)[]>
```

<sub>`GET /enterprises/{enterprise}/teams/{enterprise-team}/organizations` · `enterprise-team-organizations/get-assignments`</sub>

## `github.enterpriseTeamOrganizations.delete`

Delete an organization assignment — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#delete-an-organization-assignment)

```ts
github.enterpriseTeamOrganizations.delete(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`DELETE /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}` · `enterprise-team-organizations/delete`</sub>

## `github.enterpriseTeamOrganizations.getAssignment`

Get organization assignment — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#get-organization-assignment)

```ts
github.enterpriseTeamOrganizations.getAssignment(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OrganizationSimple>
```

<sub>`GET /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}` · `enterprise-team-organizations/get-assignment`</sub>

## `github.enterpriseTeamOrganizations.add`

Add an organization assignment — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#add-an-organization-assignment)

```ts
github.enterpriseTeamOrganizations.add(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<OrganizationSimple>
```

<sub>`PUT /enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}` · `enterprise-team-organizations/add`</sub>

## `github.enterpriseTeamOrganizations.bulkAdd`

Add organization assignments — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#add-organization-assignments)

```ts
github.enterpriseTeamOrganizations.bulkAdd(input: {
  /** Organization slug to assign the team to. */
  organization_slugs: (string)[];
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
}): Promise<(OrganizationSimple)[]>
```

<sub>`POST /enterprises/{enterprise}/teams/{enterprise-team}/organizations/add` · `enterprise-team-organizations/bulk-add`</sub>

## `github.enterpriseTeamOrganizations.bulkRemove`

Remove organization assignments — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-organizations#remove-organization-assignments)

```ts
github.enterpriseTeamOrganizations.bulkRemove(input: {
  /** Organization slug to unassign the team from. */
  organization_slugs: (string)[];
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
}): Promise<unknown>
```

<sub>`POST /enterprises/{enterprise}/teams/{enterprise-team}/organizations/remove` · `enterprise-team-organizations/bulk-remove`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
