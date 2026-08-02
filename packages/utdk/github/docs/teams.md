# Teams

32 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.teams.list`

List teams — [API reference](https://docs.github.com/rest/teams/teams#list-teams)

```ts
github.teams.list(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** Filter team results by their type. For more information, see "[What kind of team should I use?](https://docs.github.com/enterprise-cloud@latest/admin/concepts/enterprise-fundamentals/teams-in-an-enterprise#what-kind-of-team-should-i-use)" */
  team_type?: "all" | "enterprise" | "organization";
}): Promise<(Team)[]>
```

<sub>`GET /orgs/{org}/teams` · `teams/list`</sub>

## `github.teams.create`

Create a team — [API reference](https://docs.github.com/rest/teams/teams#create-a-team)

```ts
github.teams.create(input: {
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
}): Promise<TeamFull>
```

<sub>`POST /orgs/{org}/teams` · `teams/create`</sub>

## `github.teams.deleteInOrg`

Delete a team — [API reference](https://docs.github.com/rest/teams/teams#delete-a-team)

```ts
github.teams.deleteInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/teams/{team_slug}` · `teams/delete-in-org`</sub>

## `github.teams.getByName`

Get a team by name — [API reference](https://docs.github.com/rest/teams/teams#get-a-team-by-name)

```ts
github.teams.getByName(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
}): Promise<TeamFull>
```

<sub>`GET /orgs/{org}/teams/{team_slug}` · `teams/get-by-name`</sub>

## `github.teams.updateInOrg`

Update a team — [API reference](https://docs.github.com/rest/teams/teams#update-a-team)

```ts
github.teams.updateInOrg(input: {
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
}): Promise<TeamFull>
```

<sub>`PATCH /orgs/{org}/teams/{team_slug}` · `teams/update-in-org`</sub>

## `github.teams.listPendingInvitationsInOrg`

List pending team invitations — [API reference](https://docs.github.com/rest/teams/members#list-pending-team-invitations)

```ts
github.teams.listPendingInvitationsInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrganizationInvitation)[]>
```

<sub>`GET /orgs/{org}/teams/{team_slug}/invitations` · `teams/list-pending-invitations-in-org`</sub>

## `github.teams.listMembersInOrg`

List team members — [API reference](https://docs.github.com/rest/teams/members#list-team-members)

```ts
github.teams.listMembersInOrg(input: {
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
}): Promise<(TeamMember)[]>
```

<sub>`GET /orgs/{org}/teams/{team_slug}/members` · `teams/list-members-in-org`</sub>

## `github.teams.removeMembershipForUserInOrg`

Remove team membership for a user — [API reference](https://docs.github.com/rest/teams/members#remove-team-membership-for-a-user)

```ts
github.teams.removeMembershipForUserInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}` · `teams/remove-membership-for-user-in-org`</sub>

## `github.teams.getMembershipForUserInOrg`

Get team membership for a user — [API reference](https://docs.github.com/rest/teams/members#get-team-membership-for-a-user)

```ts
github.teams.getMembershipForUserInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<TeamMembership>
```

<sub>`GET /orgs/{org}/teams/{team_slug}/memberships/{username}` · `teams/get-membership-for-user-in-org`</sub>

## `github.teams.addOrUpdateMembershipForUserInOrg`

Add or update team membership for a user — [API reference](https://docs.github.com/rest/teams/members#add-or-update-team-membership-for-a-user)

```ts
github.teams.addOrUpdateMembershipForUserInOrg(input: {
  /** The role that this user should have in the team. */
  role?: "member" | "maintainer";
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<TeamMembership>
```

<sub>`PUT /orgs/{org}/teams/{team_slug}/memberships/{username}` · `teams/add-or-update-membership-for-user-in-org`</sub>

## `github.teams.listReposInOrg`

List team repositories — [API reference](https://docs.github.com/rest/teams/teams#list-team-repositories)

```ts
github.teams.listReposInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /orgs/{org}/teams/{team_slug}/repos` · `teams/list-repos-in-org`</sub>

## `github.teams.removeRepoInOrg`

Remove a repository from a team — [API reference](https://docs.github.com/rest/teams/teams#remove-a-repository-from-a-team)

```ts
github.teams.removeRepoInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` · `teams/remove-repo-in-org`</sub>

## `github.teams.checkPermissionsForRepoInOrg`

Check team permissions for a repository — [API reference](https://docs.github.com/rest/teams/teams#check-team-permissions-for-a-repository)

```ts
github.teams.checkPermissionsForRepoInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<TeamRepository>
```

<sub>`GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` · `teams/check-permissions-for-repo-in-org`</sub>

## `github.teams.addOrUpdateRepoPermissionsInOrg`

Add or update team repository permissions — [API reference](https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions)

```ts
github.teams.addOrUpdateRepoPermissionsInOrg(input: {
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
}): Promise<unknown>
```

<sub>`PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}` · `teams/add-or-update-repo-permissions-in-org`</sub>

## `github.teams.listChildInOrg`

List child teams — [API reference](https://docs.github.com/rest/teams/teams#list-child-teams)

```ts
github.teams.listChildInOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The slug of the team name. */
  team_slug: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Team)[]>
```

<sub>`GET /orgs/{org}/teams/{team_slug}/teams` · `teams/list-child-in-org`</sub>

## `github.teams.deleteLegacy`

Delete a team (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#delete-a-team-legacy)

```ts
github.teams.deleteLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /teams/{team_id}` · `teams/delete-legacy`</sub>

## `github.teams.getLegacy`

Get a team (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#get-a-team-legacy)

```ts
github.teams.getLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
}): Promise<TeamFull>
```

<sub>`GET /teams/{team_id}` · `teams/get-legacy`</sub>

## `github.teams.updateLegacy`

Update a team (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#update-a-team-legacy)

```ts
github.teams.updateLegacy(input: {
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
}): Promise<TeamFull>
```

<sub>`PATCH /teams/{team_id}` · `teams/update-legacy`</sub>

## `github.teams.listPendingInvitationsLegacy`

List pending team invitations (Legacy) — [API reference](https://docs.github.com/rest/teams/members#list-pending-team-invitations-legacy)

```ts
github.teams.listPendingInvitationsLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(OrganizationInvitation)[]>
```

<sub>`GET /teams/{team_id}/invitations` · `teams/list-pending-invitations-legacy`</sub>

## `github.teams.listMembersLegacy`

List team members (Legacy) — [API reference](https://docs.github.com/rest/teams/members#list-team-members-legacy)

```ts
github.teams.listMembersLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** Filters members returned by their role in the team. */
  role?: "member" | "maintainer" | "all";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(TeamMember)[]>
```

<sub>`GET /teams/{team_id}/members` · `teams/list-members-legacy`</sub>

## `github.teams.removeMemberLegacy`

Remove team member (Legacy) — [API reference](https://docs.github.com/rest/teams/members#remove-team-member-legacy)

```ts
github.teams.removeMemberLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`DELETE /teams/{team_id}/members/{username}` · `teams/remove-member-legacy`</sub>

## `github.teams.getMemberLegacy`

Get team member (Legacy) — [API reference](https://docs.github.com/rest/teams/members#get-team-member-legacy)

```ts
github.teams.getMemberLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`GET /teams/{team_id}/members/{username}` · `teams/get-member-legacy`</sub>

## `github.teams.addMemberLegacy`

Add team member (Legacy) — [API reference](https://docs.github.com/rest/teams/members#add-team-member-legacy)

```ts
github.teams.addMemberLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<BasicError>
```

<sub>`PUT /teams/{team_id}/members/{username}` · `teams/add-member-legacy`</sub>

## `github.teams.removeMembershipForUserLegacy`

Remove team membership for a user (Legacy) — [API reference](https://docs.github.com/rest/teams/members#remove-team-membership-for-a-user-legacy)

```ts
github.teams.removeMembershipForUserLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<unknown>
```

<sub>`DELETE /teams/{team_id}/memberships/{username}` · `teams/remove-membership-for-user-legacy`</sub>

## `github.teams.getMembershipForUserLegacy`

Get team membership for a user (Legacy) — [API reference](https://docs.github.com/rest/teams/members#get-team-membership-for-a-user-legacy)

```ts
github.teams.getMembershipForUserLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<TeamMembership>
```

<sub>`GET /teams/{team_id}/memberships/{username}` · `teams/get-membership-for-user-legacy`</sub>

## `github.teams.addOrUpdateMembershipForUserLegacy`

Add or update team membership for a user (Legacy) — [API reference](https://docs.github.com/rest/teams/members#add-or-update-team-membership-for-a-user-legacy)

```ts
github.teams.addOrUpdateMembershipForUserLegacy(input: {
  /** The role that this user should have in the team. */
  role?: "member" | "maintainer";
  /** The unique identifier of the team. */
  team_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<TeamMembership>
```

<sub>`PUT /teams/{team_id}/memberships/{username}` · `teams/add-or-update-membership-for-user-legacy`</sub>

## `github.teams.listReposLegacy`

List team repositories (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#list-team-repositories-legacy)

```ts
github.teams.listReposLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /teams/{team_id}/repos` · `teams/list-repos-legacy`</sub>

## `github.teams.removeRepoLegacy`

Remove a repository from a team (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#remove-a-repository-from-a-team-legacy)

```ts
github.teams.removeRepoLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`DELETE /teams/{team_id}/repos/{owner}/{repo}` · `teams/remove-repo-legacy`</sub>

## `github.teams.checkPermissionsForRepoLegacy`

Check team permissions for a repository (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#check-team-permissions-for-a-repository-legacy)

```ts
github.teams.checkPermissionsForRepoLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<TeamRepository>
```

<sub>`GET /teams/{team_id}/repos/{owner}/{repo}` · `teams/check-permissions-for-repo-legacy`</sub>

## `github.teams.addOrUpdateRepoPermissionsLegacy`

Add or update team repository permissions (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#add-or-update-team-repository-permissions-legacy)

```ts
github.teams.addOrUpdateRepoPermissionsLegacy(input: {
  /** The permission to grant the team on this repository. If no permission is specified, the team's `permission` attribute will be used to determine what permission to grant the team on this repository. */
  permission?: "pull" | "push" | "admin";
  /** The unique identifier of the team. */
  team_id: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /teams/{team_id}/repos/{owner}/{repo}` · `teams/add-or-update-repo-permissions-legacy`</sub>

## `github.teams.listChildLegacy`

List child teams (Legacy) — [API reference](https://docs.github.com/rest/teams/teams#list-child-teams-legacy)

```ts
github.teams.listChildLegacy(input: {
  /** The unique identifier of the team. */
  team_id: number;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Team)[]>
```

<sub>`GET /teams/{team_id}/teams` · `teams/list-child-legacy`</sub>

## `github.teams.listForAuthenticatedUser`

List teams for the authenticated user — [API reference](https://docs.github.com/rest/teams/teams#list-teams-for-the-authenticated-user)

```ts
github.teams.listForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(TeamFull)[]>
```

<sub>`GET /user/teams` · `teams/list-for-authenticated-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
