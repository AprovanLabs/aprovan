import type { BasicError, Issue, IssueComment, IssueEvent, IssueEventForIssue, IssueFieldValue, Label, Milestone, SimpleUser, TimelineIssueEvents } from "./schemas.js";

export type IssuesOperations = {
  /**
   * List issues assigned to the authenticated user
   * @see https://docs.github.com/rest/issues/issues#list-issues-assigned-to-the-authenticated-user
   */
  list: (input: {
    /** Indicates which sorts of issues to return. `assigned` means issues assigned to you. `created` means issues created by you. `mentioned` means issues mentioning you. `subscribed` means issues you're subscribed to updates for. `all` or `repos` means all issues you can see, regardless of participation or creation. */
    filter?: "assigned" | "created" | "mentioned" | "subscribed" | "repos" | "all";
    /** Indicates the state of the issues to return. */
    state?: "open" | "closed" | "all";
    /** A list of comma separated label names. Example: `bug,ui,@high` */
    labels?: string;
    /** What to sort results by. */
    sort?: "created" | "updated" | "comments";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    collab?: boolean;
    orgs?: boolean;
    owned?: boolean;
    pulls?: boolean;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;

  /**
   * List organization issues assigned to the authenticated user
   * @see https://docs.github.com/rest/issues/issues#list-organization-issues-assigned-to-the-authenticated-user
   */
  listForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** Indicates which sorts of issues to return. `assigned` means issues assigned to you. `created` means issues created by you. `mentioned` means issues mentioning you. `subscribed` means issues you're subscribed to updates for. `all` or `repos` means all issues you can see, regardless of participation or creation. */
    filter?: "assigned" | "created" | "mentioned" | "subscribed" | "repos" | "all";
    /** Indicates the state of the issues to return. */
    state?: "open" | "closed" | "all";
    /** A list of comma separated label names. Example: `bug,ui,@high` */
    labels?: string;
    /** Can be the name of an issue type. */
    type?: string;
    /** What to sort results by. */
    sort?: "created" | "updated" | "comments";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;

  /**
   * List assignees
   * @see https://docs.github.com/rest/issues/assignees#list-assignees
   */
  listAssignees: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Check if a user can be assigned
   * @see https://docs.github.com/rest/issues/assignees#check-if-a-user-can-be-assigned
   */
  checkUserCanBeAssigned: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    assignee: string;
  }) => Promise<BasicError>;

  /**
   * List repository issues
   * @see https://docs.github.com/rest/issues/issues#list-repository-issues
   */
  listForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** If an `integer` is passed, it should refer to a milestone by its `number` field. If the string `*` is passed, issues with any milestone are accepted. If the string `none` is passed, issues without milestones are returned. */
    milestone?: string;
    /** Indicates the state of the issues to return. */
    state?: "open" | "closed" | "all";
    /** Can be the name of a user. Pass in `none` for issues with no assigned user, and `*` for issues assigned to any user. */
    assignee?: string;
    /** Can be the name of an issue type. If the string `*` is passed, issues with any type are accepted. If the string `none` is passed, issues without type are returned. */
    type?: string;
    /** The user that created the issue. */
    creator?: string;
    /** A user that's mentioned in the issue. */
    mentioned?: string;
    /** A comma-separated list of issue field filters in `field_slug:value` format. Only issues matching all specified field values are returned. Requires issue fields to be enabled for the repository. Issue fields are not available for user-owned repositories, and field availability for organization-owned public repositories depends on the organization's visibility settings. For example, `priority:Urgent,severity:High` filters issues where the `priority` field is `Urgent` AND the `severity` field is `High`. */
    issue_field_values?: string;
    /** A list of comma separated label names. Example: `bug,ui,@high` */
    labels?: string;
    /** What to sort results by. */
    sort?: "created" | "updated" | "comments";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;

  /**
   * Create an issue
   * @see https://docs.github.com/rest/issues/issues#create-an-issue
   */
  create: (input: {
    /** The title of the issue. */
    title: string | number;
    /** The contents of the issue. */
    body?: string;
    /** Login for the user that this issue should be assigned to. _NOTE: Only users with push access can set the assignee for new issues. The assignee is silently dropped otherwise. **This field is closing down.**_ */
    assignee?: string | null;
    milestone?: string | number | null;
    /** Labels to associate with this issue. _NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise._ */
    labels?: (string | { id?: number; name?: string; description?: string | null; color?: string | null })[];
    /** Logins for Users to assign to this issue. _NOTE: Only users with push access can set assignees for new issues. Assignees are silently dropped otherwise._ */
    assignees?: (string)[];
    /** An array of issue field values to set on this issue. Each field value must include the field ID and the value to set. Issue fields are only available for organization-owned repositories with the feature enabled. Field values are silently dropped otherwise. */
    issue_field_values?: ({ field_id: number; value: string | number | (string)[] })[];
    /** The name of the issue type to associate with this issue. _NOTE: Only users with push access can set the type for new issues. The type is silently dropped otherwise._ */
    type?: string | null;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Issue>;

  /**
   * List issue comments for a repository
   * @see https://docs.github.com/rest/issues/comments#list-issue-comments-for-a-repository
   */
  listCommentsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The property to sort the results by. */
    sort?: "created" | "updated";
    /** Either `asc` or `desc`. Ignored without the `sort` parameter. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(IssueComment)[]>;

  /**
   * Get an issue comment
   * @see https://docs.github.com/rest/issues/comments#get-an-issue-comment
   */
  getComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<IssueComment>;

  /**
   * Update an issue comment
   * @see https://docs.github.com/rest/issues/comments#update-an-issue-comment
   */
  updateComment: (input: {
    /** The contents of the comment. */
    body: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<IssueComment>;

  /**
   * Delete an issue comment
   * @see https://docs.github.com/rest/issues/comments#delete-an-issue-comment
   */
  deleteComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<unknown>;

  /**
   * Pin an issue comment
   * @see https://docs.github.com/rest/issues/comments#pin-an-issue-comment
   */
  pinComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<IssueComment>;

  /**
   * Unpin an issue comment
   * @see https://docs.github.com/rest/issues/comments#unpin-an-issue-comment
   */
  unpinComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<BasicError>;

  /**
   * List issue events for a repository
   * @see https://docs.github.com/rest/issues/events#list-issue-events-for-a-repository
   */
  listEventsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(IssueEvent)[]>;

  /**
   * Get an issue event
   * @see https://docs.github.com/rest/issues/events#get-an-issue-event
   */
  getEvent: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    event_id: number;
  }) => Promise<IssueEvent>;

  /**
   * Get an issue
   * @see https://docs.github.com/rest/issues/issues#get-an-issue
   */
  get: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * Update an issue
   * @see https://docs.github.com/rest/issues/issues#update-an-issue
   */
  update: (input: {
    /** The title of the issue. */
    title?: string | number | null;
    /** The contents of the issue. */
    body?: string | null;
    /** Username to assign to this issue. **This field is closing down.** */
    assignee?: string | null;
    /** The open or closed state of the issue. */
    state?: "open" | "closed";
    /** The reason for the state change. Ignored unless `state` is changed. */
    state_reason?: "completed" | "not_planned" | "duplicate" | "reopened" | null;
    /** The ID of the issue to mark as the canonical duplicate when `state_reason` is `duplicate`. The issue must exist and be accessible to the authenticated user. Ignored when `state_reason` is not `duplicate`. */
    duplicate_issue_id?: number;
    milestone?: string | number | null;
    /** Labels to associate with this issue. Pass one or more labels to _replace_ the set of labels on this issue. Send an empty array (`[]`) to clear all labels from the issue. Only users with push access can set labels for issues. Without push access to the repository, label changes are silently dropped. */
    labels?: (string | { id?: number; name?: string; description?: string | null; color?: string | null })[];
    /** Usernames to assign to this issue. Pass one or more user logins to _replace_ the set of assignees on this issue. Send an empty array (`[]`) to clear all assignees from the issue. Only users with push access can set assignees for new issues. Without push access to the repository, assignee changes are silently dropped. */
    assignees?: (string | { login?: string })[];
    /** An array of issue field values to set on this issue. Each field value must include the field ID and the value to set. Only users with push access can set field values for issues */
    issue_field_values?: ({ field_id: number; value: string | number | (string)[] })[];
    /** The name of the issue type to associate with this issue or use `null` to remove the current issue type. Only users with push access can set the type for issues. Without push access to the repository, type changes are silently dropped. */
    type?: string | null;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue & { [key: string]: unknown }>;

  /**
   * Add assignees to an issue
   * @see https://docs.github.com/rest/issues/assignees#add-assignees-to-an-issue
   */
  addAssignees: (input: {
    /** Usernames of people to assign this issue to. _NOTE: Only users with push access can add assignees to an issue. Assignees are silently ignored otherwise._ */
    assignees?: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * Remove assignees from an issue
   * @see https://docs.github.com/rest/issues/assignees#remove-assignees-from-an-issue
   */
  removeAssignees: (input: {
    /** Usernames of assignees to remove from an issue. _NOTE: Only users with push access can remove assignees from an issue. Assignees are silently ignored otherwise._ */
    assignees?: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * Check if a user can be assigned to a issue
   * @see https://docs.github.com/rest/issues/assignees#check-if-a-user-can-be-assigned-to-a-issue
   */
  checkUserCanBeAssignedToIssue: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    assignee: string;
  }) => Promise<BasicError>;

  /**
   * List issue comments
   * @see https://docs.github.com/rest/issues/comments#list-issue-comments
   */
  listComments: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(IssueComment)[]>;

  /**
   * Create an issue comment
   * @see https://docs.github.com/rest/issues/comments#create-an-issue-comment
   */
  createComment: (input: {
    /** The contents of the comment. */
    body: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<IssueComment>;

  /**
   * List dependencies an issue is blocked by
   * @see https://docs.github.com/rest/issues/issue-dependencies#list-dependencies-an-issue-is-blocked-by
   */
  listDependenciesBlockedBy: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;

  /**
   * Add a dependency an issue is blocked by
   * @see https://docs.github.com/rest/issues/issue-dependencies#add-a-dependency-an-issue-is-blocked-by
   */
  addBlockedByDependency: (input: {
    /** The id of the issue that blocks the current issue */
    issue_id: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * Remove dependency an issue is blocked by
   * @see https://docs.github.com/rest/issues/issue-dependencies#remove-dependency-an-issue-is-blocked-by
   */
  removeDependencyBlockedBy: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The id of the blocking issue to remove as a dependency */
    issue_id: number;
  }) => Promise<Issue>;

  /**
   * List dependencies an issue is blocking
   * @see https://docs.github.com/rest/issues/issue-dependencies#list-dependencies-an-issue-is-blocking
   */
  listDependenciesBlocking: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;

  /**
   * List issue events
   * @see https://docs.github.com/rest/issues/events#list-issue-events
   */
  listEvents: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(IssueEventForIssue)[]>;

  /**
   * List issue field values for an issue
   * @see https://docs.github.com/rest/issues/issue-field-values#list-issue-field-values-for-an-issue
   */
  listIssueFieldValuesForIssue: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(IssueFieldValue)[]>;

  /**
   * Add issue field values to an issue
   * @see https://docs.github.com/rest/issues/issue-field-values#add-issue-field-values-to-an-issue
   */
  addIssueFieldValues: (input: {
    /** An array of issue field values to add to this issue. Each field value must include the field ID and the value to set. */
    issue_field_values?: ({ field_id: number; value: string | number | (string)[] })[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<(IssueFieldValue)[]>;

  /**
   * Set issue field values for an issue
   * @see https://docs.github.com/rest/issues/issue-field-values#set-issue-field-values-for-an-issue
   */
  setIssueFieldValues: (input: {
    /** An array of issue field values to set for this issue. Each field value must include the field ID and the value to set. All existing field values will be replaced. */
    issue_field_values?: ({ field_id: number; value: string | number })[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<(IssueFieldValue)[]>;

  /**
   * Delete an issue field value from an issue
   * @see https://docs.github.com/rest/issues/issue-field-values#delete-an-issue-field-value-from-an-issue
   */
  deleteIssueFieldValue: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The unique identifier of the issue field. */
    issue_field_id: number;
  }) => Promise<BasicError>;

  /**
   * List labels for an issue
   * @see https://docs.github.com/rest/issues/labels#list-labels-for-an-issue
   */
  listLabelsOnIssue: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Label)[]>;

  /**
   * Add labels to an issue
   * @see https://docs.github.com/rest/issues/labels#add-labels-to-an-issue
   */
  addLabels: (input: {
    body?: { labels?: (string)[] } | (string)[] | ({ name: string })[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<(Label)[]>;

  /**
   * Set labels for an issue
   * @see https://docs.github.com/rest/issues/labels#set-labels-for-an-issue
   */
  setLabels: (input: {
    body?: { labels?: (string)[] } | (string)[] | { labels?: ({ name: string })[] } | ({ name: string })[] | string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<(Label)[]>;

  /**
   * Remove all labels from an issue
   * @see https://docs.github.com/rest/issues/labels#remove-all-labels-from-an-issue
   */
  removeAllLabels: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<BasicError>;

  /**
   * Remove a label from an issue
   * @see https://docs.github.com/rest/issues/labels#remove-a-label-from-an-issue
   */
  removeLabel: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    name: string;
  }) => Promise<(Label)[]>;

  /**
   * Lock an issue
   * @see https://docs.github.com/rest/issues/issues#lock-an-issue
   */
  lock: (input: {
    /** The reason for locking the issue or pull request conversation. Lock will fail if you don't use one of these reasons:    * `off-topic`    * `too heated`    * `resolved`    * `spam` */
    lock_reason?: "off-topic" | "too heated" | "resolved" | "spam";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<BasicError>;

  /**
   * Unlock an issue
   * @see https://docs.github.com/rest/issues/issues#unlock-an-issue
   */
  unlock: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<BasicError>;

  /**
   * Get parent issue
   * @see https://docs.github.com/rest/issues/sub-issues#get-parent-issue
   */
  getParent: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * Remove sub-issue
   * @see https://docs.github.com/rest/issues/sub-issues#remove-sub-issue
   */
  removeSubIssue: (input: {
    /** The id of the sub-issue to remove */
    sub_issue_id: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * List sub-issues
   * @see https://docs.github.com/rest/issues/sub-issues#list-sub-issues
   */
  listSubIssues: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;

  /**
   * Add sub-issue
   * @see https://docs.github.com/rest/issues/sub-issues#add-sub-issue
   */
  addSubIssue: (input: {
    /** The id of the sub-issue to add. The sub-issue must belong to the same repository owner as the parent issue */
    sub_issue_id: number;
    /** Option that, when true, instructs the operation to replace the sub-issues current parent issue */
    replace_parent?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * Reprioritize sub-issue
   * @see https://docs.github.com/rest/issues/sub-issues#reprioritize-sub-issue
   */
  reprioritizeSubIssue: (input: {
    /** The id of the sub-issue to reprioritize */
    sub_issue_id: number;
    /** The id of the sub-issue to be prioritized after (either positional argument after OR before should be specified). */
    after_id?: number;
    /** The id of the sub-issue to be prioritized before (either positional argument after OR before should be specified). */
    before_id?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Issue>;

  /**
   * List timeline events for an issue
   * @see https://docs.github.com/rest/issues/timeline#list-timeline-events-for-an-issue
   */
  listEventsForTimeline: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(TimelineIssueEvents)[]>;

  /**
   * List labels for a repository
   * @see https://docs.github.com/rest/issues/labels#list-labels-for-a-repository
   */
  listLabelsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Label)[]>;

  /**
   * Create a label
   * @see https://docs.github.com/rest/issues/labels#create-a-label
   */
  createLabel: (input: {
    /** The name of the label. Emoji can be added to label names, using either native emoji or colon-style markup. For example, typing `:strawberry:` will render the emoji ![:strawberry:](https://github.githubassets.com/images/icons/emoji/unicode/1f353.png ":strawberry:"). For a full list of available emoji and codes, see "[Emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet)." */
    name: string;
    /** The [hexadecimal color code](http://www.color-hex.com/) for the label, without the leading `#`. */
    color?: string;
    /** A short description of the label. Must be 100 characters or fewer. */
    description?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Label>;

  /**
   * Get a label
   * @see https://docs.github.com/rest/issues/labels#get-a-label
   */
  getLabel: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    name: string;
  }) => Promise<Label>;

  /**
   * Update a label
   * @see https://docs.github.com/rest/issues/labels#update-a-label
   */
  updateLabel: (input: {
    /** The new name of the label. Emoji can be added to label names, using either native emoji or colon-style markup. For example, typing `:strawberry:` will render the emoji ![:strawberry:](https://github.githubassets.com/images/icons/emoji/unicode/1f353.png ":strawberry:"). For a full list of available emoji and codes, see "[Emoji cheat sheet](https://github.com/ikatyang/emoji-cheat-sheet)." */
    new_name?: string;
    /** The [hexadecimal color code](http://www.color-hex.com/) for the label, without the leading `#`. */
    color?: string;
    /** A short description of the label. Must be 100 characters or fewer. */
    description?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    name: string;
  }) => Promise<Label>;

  /**
   * Delete a label
   * @see https://docs.github.com/rest/issues/labels#delete-a-label
   */
  deleteLabel: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    name: string;
  }) => Promise<unknown>;

  /**
   * List milestones
   * @see https://docs.github.com/rest/issues/milestones#list-milestones
   */
  listMilestones: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The state of the milestone. Either `open`, `closed`, or `all`. */
    state?: "open" | "closed" | "all";
    /** What to sort results by. Either `due_on` or `completeness`. */
    sort?: "due_on" | "completeness";
    /** The direction of the sort. Either `asc` or `desc`. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Milestone)[]>;

  /**
   * Create a milestone
   * @see https://docs.github.com/rest/issues/milestones#create-a-milestone
   */
  createMilestone: (input: {
    /** The title of the milestone. */
    title: string;
    /** The state of the milestone. Either `open` or `closed`. */
    state?: "open" | "closed";
    /** A description of the milestone. */
    description?: string;
    /** The milestone due date. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    due_on?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<Milestone>;

  /**
   * Get a milestone
   * @see https://docs.github.com/rest/issues/milestones#get-a-milestone
   */
  getMilestone: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the milestone. */
    milestone_number: number;
  }) => Promise<Milestone>;

  /**
   * Update a milestone
   * @see https://docs.github.com/rest/issues/milestones#update-a-milestone
   */
  updateMilestone: (input: {
    /** The title of the milestone. */
    title?: string;
    /** The state of the milestone. Either `open` or `closed`. */
    state?: "open" | "closed";
    /** A description of the milestone. */
    description?: string;
    /** The milestone due date. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    due_on?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the milestone. */
    milestone_number: number;
  }) => Promise<Milestone>;

  /**
   * Delete a milestone
   * @see https://docs.github.com/rest/issues/milestones#delete-a-milestone
   */
  deleteMilestone: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the milestone. */
    milestone_number: number;
  }) => Promise<BasicError>;

  /**
   * List labels for issues in a milestone
   * @see https://docs.github.com/rest/issues/labels#list-labels-for-issues-in-a-milestone
   */
  listLabelsForMilestone: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the milestone. */
    milestone_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Label)[]>;

  /**
   * List user account issues assigned to the authenticated user
   * @see https://docs.github.com/rest/issues/issues#list-user-account-issues-assigned-to-the-authenticated-user
   */
  listForAuthenticatedUser: (input: {
    /** Indicates which sorts of issues to return. `assigned` means issues assigned to you. `created` means issues created by you. `mentioned` means issues mentioning you. `subscribed` means issues you're subscribed to updates for. `all` or `repos` means all issues you can see, regardless of participation or creation. */
    filter?: "assigned" | "created" | "mentioned" | "subscribed" | "repos" | "all";
    /** Indicates the state of the issues to return. */
    state?: "open" | "closed" | "all";
    /** A list of comma separated label names. Example: `bug,ui,@high` */
    labels?: string;
    /** What to sort results by. */
    sort?: "created" | "updated" | "comments";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Issue)[]>;
};
