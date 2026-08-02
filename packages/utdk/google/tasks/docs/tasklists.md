# Tasklists

6 operations · `utdk/google/tasks`

```ts
import tasks from "utdk/google/tasks";
```

## `tasks.tasksTasklistsList`

Returns all the authenticated user's task lists. — [Provider docs](https://developers.google.com/tasks/)

```ts
tasks.tasksTasklistsList(input: {
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100). */
  maxResults?: number;
  /** Token specifying the result page to return. Optional. */
  pageToken?: string;
}): Promise<TaskLists>
```

<sub>`GET /tasks/v1/users/@me/lists` · `tasks.tasklists.list`</sub>

## `tasks.tasksTasklistsInsert`

Creates a new task list and adds it to the authenticated user's task lists. — [Provider docs](https://developers.google.com/tasks/)

```ts
tasks.tasksTasklistsInsert(input: {
  /** ETag of the resource. */
  etag?: string;
  /** Task list identifier. */
  id?: string;
  /** Type of the resource. This is always "tasks#taskList". */
  kind?: string;
  /** URL pointing to this task list. Used to retrieve, update, or delete this task list. */
  selfLink?: string;
  /** Title of the task list. */
  title?: string;
  /** Last modification time of the task list (as a RFC 3339 timestamp). */
  updated?: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<TaskList>
```

<sub>`POST /tasks/v1/users/@me/lists` · `tasks.tasklists.insert`</sub>

## `tasks.tasksTasklistsDelete`

Deletes the authenticated user's specified task list. — [Provider docs](https://developers.google.com/tasks/)

```ts
tasks.tasksTasklistsDelete(input: {
  /** Task list identifier. */
  tasklist: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<unknown>
```

<sub>`DELETE /tasks/v1/users/@me/lists/{tasklist}` · `tasks.tasklists.delete`</sub>

## `tasks.tasksTasklistsGet`

Returns the authenticated user's specified task list. — [Provider docs](https://developers.google.com/tasks/)

```ts
tasks.tasksTasklistsGet(input: {
  /** Task list identifier. */
  tasklist: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<TaskList>
```

<sub>`GET /tasks/v1/users/@me/lists/{tasklist}` · `tasks.tasklists.get`</sub>

## `tasks.tasksTasklistsPatch`

Updates the authenticated user's specified task list. This method supports patch semantics. — [Provider docs](https://developers.google.com/tasks/)

```ts
tasks.tasksTasklistsPatch(input: {
  /** ETag of the resource. */
  etag?: string;
  /** Task list identifier. */
  id?: string;
  /** Type of the resource. This is always "tasks#taskList". */
  kind?: string;
  /** URL pointing to this task list. Used to retrieve, update, or delete this task list. */
  selfLink?: string;
  /** Title of the task list. */
  title?: string;
  /** Last modification time of the task list (as a RFC 3339 timestamp). */
  updated?: string;
  /** Task list identifier. */
  tasklist: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<TaskList>
```

<sub>`PATCH /tasks/v1/users/@me/lists/{tasklist}` · `tasks.tasklists.patch`</sub>

## `tasks.tasksTasklistsUpdate`

Updates the authenticated user's specified task list. — [Provider docs](https://developers.google.com/tasks/)

```ts
tasks.tasksTasklistsUpdate(input: {
  /** ETag of the resource. */
  etag?: string;
  /** Task list identifier. */
  id?: string;
  /** Type of the resource. This is always "tasks#taskList". */
  kind?: string;
  /** URL pointing to this task list. Used to retrieve, update, or delete this task list. */
  selfLink?: string;
  /** Title of the task list. */
  title?: string;
  /** Last modification time of the task list (as a RFC 3339 timestamp). */
  updated?: string;
  /** Task list identifier. */
  tasklist: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<TaskList>
```

<sub>`PUT /tasks/v1/users/@me/lists/{tasklist}` · `tasks.tasklists.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
