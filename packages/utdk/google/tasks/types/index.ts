import type { Task, TaskList, TaskLists, Tasks } from "./schemas.js";

export type GoogleTasksClient = {
  /**
   * Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list.
   */
  tasksTasksClear: (input: {
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
  }) => Promise<unknown>;

  /**
   * Returns all tasks in the specified task list.
   */
  tasksTasksList: (input: {
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
    /** Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date. */
    completedMax?: string;
    /** Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date. */
    completedMin?: string;
    /** Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date. */
    dueMax?: string;
    /** Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date. */
    dueMin?: string;
    /** Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100). */
    maxResults?: number;
    /** Token specifying the result page to return. Optional. */
    pageToken?: string;
    /** Flag indicating whether completed tasks are returned in the result. Optional. The default is True. Note that showHidden must also be True to show tasks completed in first party clients, such as the web UI and Google's mobile apps. */
    showCompleted?: boolean;
    /** Flag indicating whether deleted tasks are returned in the result. Optional. The default is False. */
    showDeleted?: boolean;
    /** Flag indicating whether hidden tasks are returned in the result. Optional. The default is False. */
    showHidden?: boolean;
    /** Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time. */
    updatedMin?: string;
  }) => Promise<Tasks>;

  /**
   * Creates a new task on the specified task list.
   */
  tasksTasksInsert: (input: {
    /** Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed. */
    completed?: string;
    /** Flag indicating whether the task has been deleted. The default is False. */
    deleted?: boolean;
    /** Due date of the task (as a RFC 3339 timestamp). Optional. The due date only records date information; the time portion of the timestamp is discarded when setting the due date. It isn't possible to read or write the time that a task is due via the API. */
    due?: string;
    /** ETag of the resource. */
    etag?: string;
    /** Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only. */
    hidden?: boolean;
    /** Task identifier. */
    id?: string;
    /** Type of the resource. This is always "tasks#task". */
    kind?: string;
    /** Collection of links. This collection is read-only. */
    links?: ({ description?: string; link?: string; type?: string })[];
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Parent task identifier. This field is omitted if it is a top-level task. This field is read-only. Use the "move" method to move the task under a different parent or to the top level. */
    parent?: string;
    /** String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task's corresponding position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). This field is read-only. Use the "move" method to move the task to another position. */
    position?: string;
    /** URL pointing to this task. Used to retrieve, update, or delete this task. */
    selfLink?: string;
    /** Status of the task. This is either "needsAction" or "completed". */
    status?: string;
    /** Title of the task. */
    title?: string;
    /** Last modification time of the task (as a RFC 3339 timestamp). */
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
    /** Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional. */
    previous?: string;
  }, options?: { query?: { parent?: string } }) => Promise<Task>;

  /**
   * Deletes the specified task from the task list.
   */
  tasksTasksDelete: (input: {
    /** Task list identifier. */
    tasklist: string;
    /** Task identifier. */
    task: string;
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
  }) => Promise<unknown>;

  /**
   * Returns the specified task.
   */
  tasksTasksGet: (input: {
    /** Task list identifier. */
    tasklist: string;
    /** Task identifier. */
    task: string;
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
  }) => Promise<Task>;

  /**
   * Updates the specified task. This method supports patch semantics.
   */
  tasksTasksPatch: (input: {
    /** Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed. */
    completed?: string;
    /** Flag indicating whether the task has been deleted. The default is False. */
    deleted?: boolean;
    /** Due date of the task (as a RFC 3339 timestamp). Optional. The due date only records date information; the time portion of the timestamp is discarded when setting the due date. It isn't possible to read or write the time that a task is due via the API. */
    due?: string;
    /** ETag of the resource. */
    etag?: string;
    /** Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only. */
    hidden?: boolean;
    /** Task identifier. */
    id?: string;
    /** Type of the resource. This is always "tasks#task". */
    kind?: string;
    /** Collection of links. This collection is read-only. */
    links?: ({ description?: string; link?: string; type?: string })[];
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Parent task identifier. This field is omitted if it is a top-level task. This field is read-only. Use the "move" method to move the task under a different parent or to the top level. */
    parent?: string;
    /** String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task's corresponding position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). This field is read-only. Use the "move" method to move the task to another position. */
    position?: string;
    /** URL pointing to this task. Used to retrieve, update, or delete this task. */
    selfLink?: string;
    /** Status of the task. This is either "needsAction" or "completed". */
    status?: string;
    /** Title of the task. */
    title?: string;
    /** Last modification time of the task (as a RFC 3339 timestamp). */
    updated?: string;
    /** Task list identifier. */
    tasklist: string;
    /** Task identifier. */
    task: string;
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
  }) => Promise<Task>;

  /**
   * Updates the specified task.
   */
  tasksTasksUpdate: (input: {
    /** Completion date of the task (as a RFC 3339 timestamp). This field is omitted if the task has not been completed. */
    completed?: string;
    /** Flag indicating whether the task has been deleted. The default is False. */
    deleted?: boolean;
    /** Due date of the task (as a RFC 3339 timestamp). Optional. The due date only records date information; the time portion of the timestamp is discarded when setting the due date. It isn't possible to read or write the time that a task is due via the API. */
    due?: string;
    /** ETag of the resource. */
    etag?: string;
    /** Flag indicating whether the task is hidden. This is the case if the task had been marked completed when the task list was last cleared. The default is False. This field is read-only. */
    hidden?: boolean;
    /** Task identifier. */
    id?: string;
    /** Type of the resource. This is always "tasks#task". */
    kind?: string;
    /** Collection of links. This collection is read-only. */
    links?: ({ description?: string; link?: string; type?: string })[];
    /** Notes describing the task. Optional. */
    notes?: string;
    /** Parent task identifier. This field is omitted if it is a top-level task. This field is read-only. Use the "move" method to move the task under a different parent or to the top level. */
    parent?: string;
    /** String indicating the position of the task among its sibling tasks under the same parent task or at the top level. If this string is greater than another task's corresponding position string according to lexicographical ordering, the task is positioned after the other task under the same parent task (or at the top level). This field is read-only. Use the "move" method to move the task to another position. */
    position?: string;
    /** URL pointing to this task. Used to retrieve, update, or delete this task. */
    selfLink?: string;
    /** Status of the task. This is either "needsAction" or "completed". */
    status?: string;
    /** Title of the task. */
    title?: string;
    /** Last modification time of the task (as a RFC 3339 timestamp). */
    updated?: string;
    /** Task list identifier. */
    tasklist: string;
    /** Task identifier. */
    task: string;
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
  }) => Promise<Task>;

  /**
   * Moves the specified task to another position in the task list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks.
   */
  tasksTasksMove: (input: {
    /** Task list identifier. */
    tasklist: string;
    /** Task identifier. */
    task: string;
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
    /** New parent task identifier. If the task is moved to the top level, this parameter is omitted. Optional. */
    parent?: string;
    /** New previous sibling task identifier. If the task is moved to the first position among its siblings, this parameter is omitted. Optional. */
    previous?: string;
  }) => Promise<Task>;

  /**
   * Returns all the authenticated user's task lists.
   */
  tasksTasklistsList: (input: {
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
  }) => Promise<TaskLists>;

  /**
   * Creates a new task list and adds it to the authenticated user's task lists.
   */
  tasksTasklistsInsert: (input: {
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
  }) => Promise<TaskList>;

  /**
   * Deletes the authenticated user's specified task list.
   */
  tasksTasklistsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Returns the authenticated user's specified task list.
   */
  tasksTasklistsGet: (input: {
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
  }) => Promise<TaskList>;

  /**
   * Updates the authenticated user's specified task list. This method supports patch semantics.
   */
  tasksTasklistsPatch: (input: {
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
  }) => Promise<TaskList>;

  /**
   * Updates the authenticated user's specified task list.
   */
  tasksTasklistsUpdate: (input: {
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
  }) => Promise<TaskList>;
};

export * from "./schemas.js";
