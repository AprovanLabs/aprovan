# Activity

32 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.activity.listPublicEvents`

List public events — [API reference](https://docs.github.com/rest/activity/events#list-public-events)

```ts
github.activity.listPublicEvents(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /events` · `activity/list-public-events`</sub>

## `github.activity.getFeeds`

Get feeds — [API reference](https://docs.github.com/rest/activity/feeds#get-feeds)

```ts
github.activity.getFeeds(): Promise<Feed>
```

<sub>`GET /feeds` · `activity/get-feeds`</sub>

## `github.activity.listPublicEventsForRepoNetwork`

List public events for a network of repositories — [API reference](https://docs.github.com/rest/activity/events#list-public-events-for-a-network-of-repositories)

```ts
github.activity.listPublicEventsForRepoNetwork(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /networks/{owner}/{repo}/events` · `activity/list-public-events-for-repo-network`</sub>

## `github.activity.listNotificationsForAuthenticatedUser`

List notifications for the authenticated user — [API reference](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)

```ts
github.activity.listNotificationsForAuthenticatedUser(input: {
  /** If `true`, show notifications marked as read. */
  all?: boolean;
  /** If `true`, only shows notifications in which the user is directly participating or mentioned. */
  participating?: boolean;
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  before?: string;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
  /** The number of results per page (max 50). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(Thread)[]>
```

<sub>`GET /notifications` · `activity/list-notifications-for-authenticated-user`</sub>

## `github.activity.markNotificationsAsRead`

Mark notifications as read — [API reference](https://docs.github.com/rest/activity/notifications#mark-notifications-as-read)

```ts
github.activity.markNotificationsAsRead(input: {
  /** Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp. */
  last_read_at?: string;
  /** Whether the notification has been read. */
  read?: boolean;
}): Promise<{ message?: string }>
```

<sub>`PUT /notifications` · `activity/mark-notifications-as-read`</sub>

## `github.activity.markThreadAsDone`

Mark a thread as done — [API reference](https://docs.github.com/rest/activity/notifications#mark-a-thread-as-done)

```ts
github.activity.markThreadAsDone(input: {
  /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
  thread_id: number;
}): Promise<unknown>
```

<sub>`DELETE /notifications/threads/{thread_id}` · `activity/mark-thread-as-done`</sub>

## `github.activity.getThread`

Get a thread — [API reference](https://docs.github.com/rest/activity/notifications#get-a-thread)

```ts
github.activity.getThread(input: {
  /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
  thread_id: number;
}): Promise<Thread>
```

<sub>`GET /notifications/threads/{thread_id}` · `activity/get-thread`</sub>

## `github.activity.markThreadAsRead`

Mark a thread as read — [API reference](https://docs.github.com/rest/activity/notifications#mark-a-thread-as-read)

```ts
github.activity.markThreadAsRead(input: {
  /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
  thread_id: number;
}): Promise<BasicError>
```

<sub>`PATCH /notifications/threads/{thread_id}` · `activity/mark-thread-as-read`</sub>

## `github.activity.deleteThreadSubscription`

Delete a thread subscription — [API reference](https://docs.github.com/rest/activity/notifications#delete-a-thread-subscription)

```ts
github.activity.deleteThreadSubscription(input: {
  /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
  thread_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /notifications/threads/{thread_id}/subscription` · `activity/delete-thread-subscription`</sub>

## `github.activity.getThreadSubscriptionForAuthenticatedUser`

Get a thread subscription for the authenticated user — [API reference](https://docs.github.com/rest/activity/notifications#get-a-thread-subscription-for-the-authenticated-user)

```ts
github.activity.getThreadSubscriptionForAuthenticatedUser(input: {
  /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
  thread_id: number;
}): Promise<ThreadSubscription>
```

<sub>`GET /notifications/threads/{thread_id}/subscription` · `activity/get-thread-subscription-for-authenticated-user`</sub>

## `github.activity.setThreadSubscription`

Set a thread subscription — [API reference](https://docs.github.com/rest/activity/notifications#set-a-thread-subscription)

```ts
github.activity.setThreadSubscription(input: {
  /** Whether to block all notifications from a thread. */
  ignored?: boolean;
  /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
  thread_id: number;
}): Promise<ThreadSubscription>
```

<sub>`PUT /notifications/threads/{thread_id}/subscription` · `activity/set-thread-subscription`</sub>

## `github.activity.listPublicOrgEvents`

List public organization events — [API reference](https://docs.github.com/rest/activity/events#list-public-organization-events)

```ts
github.activity.listPublicOrgEvents(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /orgs/{org}/events` · `activity/list-public-org-events`</sub>

## `github.activity.listRepoEvents`

List repository events — [API reference](https://docs.github.com/rest/activity/events#list-repository-events)

```ts
github.activity.listRepoEvents(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /repos/{owner}/{repo}/events` · `activity/list-repo-events`</sub>

## `github.activity.listRepoNotificationsForAuthenticatedUser`

List repository notifications for the authenticated user — [API reference](https://docs.github.com/rest/activity/notifications#list-repository-notifications-for-the-authenticated-user)

```ts
github.activity.listRepoNotificationsForAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** If `true`, show notifications marked as read. */
  all?: boolean;
  /** If `true`, only shows notifications in which the user is directly participating or mentioned. */
  participating?: boolean;
  /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  before?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Thread)[]>
```

<sub>`GET /repos/{owner}/{repo}/notifications` · `activity/list-repo-notifications-for-authenticated-user`</sub>

## `github.activity.markRepoNotificationsAsRead`

Mark repository notifications as read — [API reference](https://docs.github.com/rest/activity/notifications#mark-repository-notifications-as-read)

```ts
github.activity.markRepoNotificationsAsRead(input: {
  /** Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp. */
  last_read_at?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<{ message?: string; url?: string }>
```

<sub>`PUT /repos/{owner}/{repo}/notifications` · `activity/mark-repo-notifications-as-read`</sub>

## `github.activity.listStargazersForRepo`

List stargazers — [API reference](https://docs.github.com/rest/activity/starring#list-stargazers)

```ts
github.activity.listStargazersForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[] | (Stargazer)[]>
```

<sub>`GET /repos/{owner}/{repo}/stargazers` · `activity/list-stargazers-for-repo`</sub>

## `github.activity.listWatchersForRepo`

List watchers — [API reference](https://docs.github.com/rest/activity/watching#list-watchers)

```ts
github.activity.listWatchersForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(SimpleUser)[]>
```

<sub>`GET /repos/{owner}/{repo}/subscribers` · `activity/list-watchers-for-repo`</sub>

## `github.activity.deleteRepoSubscription`

Delete a repository subscription — [API reference](https://docs.github.com/rest/activity/watching#delete-a-repository-subscription)

```ts
github.activity.deleteRepoSubscription(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/subscription` · `activity/delete-repo-subscription`</sub>

## `github.activity.getRepoSubscription`

Get a repository subscription — [API reference](https://docs.github.com/rest/activity/watching#get-a-repository-subscription)

```ts
github.activity.getRepoSubscription(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<RepositorySubscription>
```

<sub>`GET /repos/{owner}/{repo}/subscription` · `activity/get-repo-subscription`</sub>

## `github.activity.setRepoSubscription`

Set a repository subscription — [API reference](https://docs.github.com/rest/activity/watching#set-a-repository-subscription)

```ts
github.activity.setRepoSubscription(input: {
  /** Determines if notifications should be received from this repository. */
  subscribed?: boolean;
  /** Determines if all notifications should be blocked from this repository. */
  ignored?: boolean;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<RepositorySubscription>
```

<sub>`PUT /repos/{owner}/{repo}/subscription` · `activity/set-repo-subscription`</sub>

## `github.activity.listReposStarredByAuthenticatedUser`

List repositories starred by the authenticated user — [API reference](https://docs.github.com/rest/activity/starring#list-repositories-starred-by-the-authenticated-user)

```ts
github.activity.listReposStarredByAuthenticatedUser(input: {
  /** The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to. */
  sort?: "created" | "updated";
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Repository)[]>
```

<sub>`GET /user/starred` · `activity/list-repos-starred-by-authenticated-user`</sub>

## `github.activity.unstarRepoForAuthenticatedUser`

Unstar a repository for the authenticated user — [API reference](https://docs.github.com/rest/activity/starring#unstar-a-repository-for-the-authenticated-user)

```ts
github.activity.unstarRepoForAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`DELETE /user/starred/{owner}/{repo}` · `activity/unstar-repo-for-authenticated-user`</sub>

## `github.activity.checkRepoIsStarredByAuthenticatedUser`

Check if a repository is starred by the authenticated user — [API reference](https://docs.github.com/rest/activity/starring#check-if-a-repository-is-starred-by-the-authenticated-user)

```ts
github.activity.checkRepoIsStarredByAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`GET /user/starred/{owner}/{repo}` · `activity/check-repo-is-starred-by-authenticated-user`</sub>

## `github.activity.starRepoForAuthenticatedUser`

Star a repository for the authenticated user — [API reference](https://docs.github.com/rest/activity/starring#star-a-repository-for-the-authenticated-user)

```ts
github.activity.starRepoForAuthenticatedUser(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
}): Promise<BasicError>
```

<sub>`PUT /user/starred/{owner}/{repo}` · `activity/star-repo-for-authenticated-user`</sub>

## `github.activity.listWatchedReposForAuthenticatedUser`

List repositories watched by the authenticated user — [API reference](https://docs.github.com/rest/activity/watching#list-repositories-watched-by-the-authenticated-user)

```ts
github.activity.listWatchedReposForAuthenticatedUser(input: {
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /user/subscriptions` · `activity/list-watched-repos-for-authenticated-user`</sub>

## `github.activity.listEventsForAuthenticatedUser`

List events for the authenticated user — [API reference](https://docs.github.com/rest/activity/events#list-events-for-the-authenticated-user)

```ts
github.activity.listEventsForAuthenticatedUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /users/{username}/events` · `activity/list-events-for-authenticated-user`</sub>

## `github.activity.listOrgEventsForAuthenticatedUser`

List organization events for the authenticated user — [API reference](https://docs.github.com/rest/activity/events#list-organization-events-for-the-authenticated-user)

```ts
github.activity.listOrgEventsForAuthenticatedUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /users/{username}/events/orgs/{org}` · `activity/list-org-events-for-authenticated-user`</sub>

## `github.activity.listPublicEventsForUser`

List public events for a user — [API reference](https://docs.github.com/rest/activity/events#list-public-events-for-a-user)

```ts
github.activity.listPublicEventsForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /users/{username}/events/public` · `activity/list-public-events-for-user`</sub>

## `github.activity.listReceivedEventsForUser`

List events received by the authenticated user — [API reference](https://docs.github.com/rest/activity/events#list-events-received-by-the-authenticated-user)

```ts
github.activity.listReceivedEventsForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /users/{username}/received_events` · `activity/list-received-events-for-user`</sub>

## `github.activity.listReceivedPublicEventsForUser`

List public events received by a user — [API reference](https://docs.github.com/rest/activity/events#list-public-events-received-by-a-user)

```ts
github.activity.listReceivedPublicEventsForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Event)[]>
```

<sub>`GET /users/{username}/received_events/public` · `activity/list-received-public-events-for-user`</sub>

## `github.activity.listReposStarredByUser`

List repositories starred by a user — [API reference](https://docs.github.com/rest/activity/starring#list-repositories-starred-by-a-user)

```ts
github.activity.listReposStarredByUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to. */
  sort?: "created" | "updated";
  /** The direction to sort the results by. */
  direction?: "asc" | "desc";
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(StarredRepository)[] | (Repository)[]>
```

<sub>`GET /users/{username}/starred` · `activity/list-repos-starred-by-user`</sub>

## `github.activity.listReposWatchedByUser`

List repositories watched by a user — [API reference](https://docs.github.com/rest/activity/watching#list-repositories-watched-by-a-user)

```ts
github.activity.listReposWatchedByUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(MinimalRepository)[]>
```

<sub>`GET /users/{username}/subscriptions` · `activity/list-repos-watched-by-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
