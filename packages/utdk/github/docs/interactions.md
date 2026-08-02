# Interactions

14 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.interactions.removeRestrictionsForOrg`

Remove interaction restrictions for an organization — [API reference](https://docs.github.com/rest/interactions/orgs#remove-interaction-restrictions-for-an-organization)

```ts
github.interactions.removeRestrictionsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<unknown>
```

<sub>`DELETE /orgs/{org}/interaction-limits` · `interactions/remove-restrictions-for-org`</sub>

## `github.interactions.getRestrictionsForOrg`

Get interaction restrictions for an organization — [API reference](https://docs.github.com/rest/interactions/orgs#get-interaction-restrictions-for-an-organization)

```ts
github.interactions.getRestrictionsForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<InteractionLimitResponse | { [key: string]: unknown }>
```

<sub>`GET /orgs/{org}/interaction-limits` · `interactions/get-restrictions-for-org`</sub>

## `github.interactions.setRestrictionsForOrg`

Set interaction restrictions for an organization — [API reference](https://docs.github.com/rest/interactions/orgs#set-interaction-restrictions-for-an-organization)

```ts
github.interactions.setRestrictionsForOrg(input: {
  limit: InteractionGroup;
  expiry?: InteractionExpiry;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<InteractionLimitResponse>
```

<sub>`PUT /orgs/{org}/interaction-limits` · `interactions/set-restrictions-for-org`</sub>

## `github.interactions.removeRestrictionsForRepo`

Remove interaction restrictions for a repository — [API reference](https://docs.github.com/rest/interactions/repos#remove-interaction-restrictions-for-a-repository)

```ts
github.interactions.removeRestrictionsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/interaction-limits` · `interactions/remove-restrictions-for-repo`</sub>

## `github.interactions.getRestrictionsForRepo`

Get interaction restrictions for a repository — [API reference](https://docs.github.com/rest/interactions/repos#get-interaction-restrictions-for-a-repository)

```ts
github.interactions.getRestrictionsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<InteractionLimitResponse | { [key: string]: unknown }>
```

<sub>`GET /repos/{owner}/{repo}/interaction-limits` · `interactions/get-restrictions-for-repo`</sub>

## `github.interactions.setRestrictionsForRepo`

Set interaction restrictions for a repository — [API reference](https://docs.github.com/rest/interactions/repos#set-interaction-restrictions-for-a-repository)

```ts
github.interactions.setRestrictionsForRepo(input: {
  limit: InteractionGroup;
  expiry?: InteractionExpiry;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<InteractionLimitResponse>
```

<sub>`PUT /repos/{owner}/{repo}/interaction-limits` · `interactions/set-restrictions-for-repo`</sub>

## `github.interactions.removePullRequestBypassListForRepo`

Remove users from the pull request creation cap bypass list for a repository — [API reference](https://docs.github.com/rest/interactions/repos#remove-users-from-the-pull-request-creation-cap-bypass-list-for-a-repository)

```ts
github.interactions.removePullRequestBypassListForRepo(input: {
  /** A list of user logins to add or remove from the bypass list. */
  users: (string)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/interaction-limits/pulls/bypass-list` · `interactions/remove-pull-request-bypass-list-for-repo`</sub>

## `github.interactions.getPullRequestBypassListForRepo`

Get pull request creation cap bypass list for a repository — [API reference](https://docs.github.com/rest/interactions/repos#get-pull-request-creation-cap-bypass-list-for-a-repository)

```ts
github.interactions.getPullRequestBypassListForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /repos/{owner}/{repo}/interaction-limits/pulls/bypass-list` · `interactions/get-pull-request-bypass-list-for-repo`</sub>

## `github.interactions.setPullRequestBypassListForRepo`

Add users to the pull request creation cap bypass list for a repository — [API reference](https://docs.github.com/rest/interactions/repos#add-users-to-the-pull-request-creation-cap-bypass-list-for-a-repository)

```ts
github.interactions.setPullRequestBypassListForRepo(input: {
  /** A list of user logins to add or remove from the bypass list. */
  users: (string)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/interaction-limits/pulls/bypass-list` · `interactions/set-pull-request-bypass-list-for-repo`</sub>

## `github.interactions.getPullRequestCreationCapForRepo`

Get pull request creation cap for a repository — [API reference](https://docs.github.com/rest/interactions/repos#get-pull-request-creation-cap-for-a-repository)

```ts
github.interactions.getPullRequestCreationCapForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<{ enabled: boolean; max_open_pull_requests: number }>
```

<sub>`GET /repos/{owner}/{repo}/interaction-limits/pulls/creation-cap` · `interactions/get-pull-request-creation-cap-for-repo`</sub>

## `github.interactions.updatePullRequestCreationCapForRepo`

Update pull request creation cap for a repository — [API reference](https://docs.github.com/rest/interactions/repos#update-pull-request-creation-cap-for-a-repository)

```ts
github.interactions.updatePullRequestCreationCapForRepo(input: {
  /** Whether the pull request creation cap is enabled */
  enabled: boolean;
  /** The maximum number of open pull requests a user can have at one time */
  max_open_pull_requests?: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<{ enabled: boolean; max_open_pull_requests: number }>
```

<sub>`PATCH /repos/{owner}/{repo}/interaction-limits/pulls/creation-cap` · `interactions/update-pull-request-creation-cap-for-repo`</sub>

## `github.interactions.removeRestrictionsForAuthenticatedUser`

Remove interaction restrictions from your public repositories — [API reference](https://docs.github.com/rest/interactions/user#remove-interaction-restrictions-from-your-public-repositories)

```ts
github.interactions.removeRestrictionsForAuthenticatedUser(): Promise<unknown>
```

<sub>`DELETE /user/interaction-limits` · `interactions/remove-restrictions-for-authenticated-user`</sub>

## `github.interactions.getRestrictionsForAuthenticatedUser`

Get interaction restrictions for your public repositories — [API reference](https://docs.github.com/rest/interactions/user#get-interaction-restrictions-for-your-public-repositories)

```ts
github.interactions.getRestrictionsForAuthenticatedUser(): Promise<InteractionLimitResponse | { [key: string]: unknown }>
```

<sub>`GET /user/interaction-limits` · `interactions/get-restrictions-for-authenticated-user`</sub>

## `github.interactions.setRestrictionsForAuthenticatedUser`

Set interaction restrictions for your public repositories — [API reference](https://docs.github.com/rest/interactions/user#set-interaction-restrictions-for-your-public-repositories)

```ts
github.interactions.setRestrictionsForAuthenticatedUser(input: {
  limit: InteractionGroup;
  expiry?: InteractionExpiry;
}): Promise<InteractionLimitResponse>
```

<sub>`PUT /user/interaction-limits` · `interactions/set-restrictions-for-authenticated-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
