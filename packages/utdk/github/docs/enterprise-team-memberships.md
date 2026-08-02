# Enterprise Team Memberships

6 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.enterpriseTeamMemberships.list`

List members in an enterprise team — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-members#list-members-in-an-enterprise-team)

```ts
github.enterpriseTeamMemberships.list(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /enterprises/{enterprise}/teams/{enterprise-team}/memberships` · `enterprise-team-memberships/list`</sub>

## `github.enterpriseTeamMemberships.remove`

Remove team membership — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-members#remove-team-membership)

```ts
github.enterpriseTeamMemberships.remove(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`DELETE /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}` · `enterprise-team-memberships/remove`</sub>

## `github.enterpriseTeamMemberships.get`

Get enterprise team membership — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-members#get-enterprise-team-membership)

```ts
github.enterpriseTeamMemberships.get(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<SimpleUser>
```

<sub>`GET /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}` · `enterprise-team-memberships/get`</sub>

## `github.enterpriseTeamMemberships.add`

Add team member — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-members#add-team-member)

```ts
github.enterpriseTeamMemberships.add(input: {
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<SimpleUser>
```

<sub>`PUT /enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}` · `enterprise-team-memberships/add`</sub>

## `github.enterpriseTeamMemberships.bulkAdd`

Bulk add team members — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-members#bulk-add-team-members)

```ts
github.enterpriseTeamMemberships.bulkAdd(input: {
  /** The GitHub user handles to add to the team. */
  usernames: (string)[];
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
}): Promise<(SimpleUser)[]>
```

<sub>`POST /enterprises/{enterprise}/teams/{enterprise-team}/memberships/add` · `enterprise-team-memberships/bulk-add`</sub>

## `github.enterpriseTeamMemberships.bulkRemove`

Bulk remove team members — [API reference](https://docs.github.com/rest/enterprise-teams/enterprise-team-members#bulk-remove-team-members)

```ts
github.enterpriseTeamMemberships.bulkRemove(input: {
  /** The GitHub user handles to be removed from the team. */
  usernames: (string)[];
  /** The slug version of the enterprise name. */
  enterprise: string;
  /** The slug version of the enterprise team name. You can also substitute this value with the enterprise team id. */
  "enterprise-team": string;
}): Promise<(SimpleUser)[]>
```

<sub>`POST /enterprises/{enterprise}/teams/{enterprise-team}/memberships/remove` · `enterprise-team-memberships/bulk-remove`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
