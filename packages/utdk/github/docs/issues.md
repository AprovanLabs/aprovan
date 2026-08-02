# Issues

55 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.issues.list`

List issues assigned to the authenticated user — [API reference](https://docs.github.com/rest/issues/issues#list-issues-assigned-to-the-authenticated-user)

```ts
github.issues.list(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /issues` · `issues/list`</sub>

## `github.issues.listForOrg`

List organization issues assigned to the authenticated user — [API reference](https://docs.github.com/rest/issues/issues#list-organization-issues-assigned-to-the-authenticated-user)

```ts
github.issues.listForOrg(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /orgs/{org}/issues` · `issues/list-for-org`</sub>

## `github.issues.listAssignees`

List assignees — [API reference](https://docs.github.com/rest/issues/assignees#list-assignees)

```ts
github.issues.listAssignees(input: {
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

<sub>`GET /repos/{owner}/{repo}/assignees` · `issues/list-assignees`</sub>

## `github.issues.checkUserCanBeAssigned`

Check if a user can be assigned — [API reference](https://docs.github.com/rest/issues/assignees#check-if-a-user-can-be-assigned)

```ts
github.issues.checkUserCanBeAssigned(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  assignee: string;
}): Promise<BasicError>
```

<sub>`GET /repos/{owner}/{repo}/assignees/{assignee}` · `issues/check-user-can-be-assigned`</sub>

## `github.issues.listForRepo`

List repository issues — [API reference](https://docs.github.com/rest/issues/issues#list-repository-issues)

```ts
github.issues.listForRepo(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues` · `issues/list-for-repo`</sub>

## `github.issues.create`

Create an issue — [API reference](https://docs.github.com/rest/issues/issues#create-an-issue)

```ts
github.issues.create(input: {
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
}): Promise<Issue>
```

<sub>`POST /repos/{owner}/{repo}/issues` · `issues/create`</sub>

## `github.issues.get`

Get an issue — [API reference](https://docs.github.com/rest/issues/issues#get-an-issue)

```ts
github.issues.get(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Issue>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}` · `issues/get`</sub>

## `github.issues.update`

Update an issue — [API reference](https://docs.github.com/rest/issues/issues#update-an-issue)

```ts
github.issues.update(input: {
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
}): Promise<Issue & { [key: string]: unknown }>
```

<sub>`PATCH /repos/{owner}/{repo}/issues/{issue_number}` · `issues/update`</sub>

## `github.issues.removeAssignees`

Remove assignees from an issue — [API reference](https://docs.github.com/rest/issues/assignees#remove-assignees-from-an-issue)

```ts
github.issues.removeAssignees(input: {
  /** Usernames of assignees to remove from an issue. _NOTE: Only users with push access can remove assignees from an issue. Assignees are silently ignored otherwise._ */
  assignees?: (string)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Issue>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees` · `issues/remove-assignees`</sub>

## `github.issues.addAssignees`

Add assignees to an issue — [API reference](https://docs.github.com/rest/issues/assignees#add-assignees-to-an-issue)

```ts
github.issues.addAssignees(input: {
  /** Usernames of people to assign this issue to. _NOTE: Only users with push access can add assignees to an issue. Assignees are silently ignored otherwise._ */
  assignees?: (string)[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Issue>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/assignees` · `issues/add-assignees`</sub>

## `github.issues.checkUserCanBeAssignedToIssue`

Check if a user can be assigned to a issue — [API reference](https://docs.github.com/rest/issues/assignees#check-if-a-user-can-be-assigned-to-a-issue)

```ts
github.issues.checkUserCanBeAssignedToIssue(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
  assignee: string;
}): Promise<BasicError>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}` · `issues/check-user-can-be-assigned-to-issue`</sub>

## `github.issues.listComments`

List issue comments — [API reference](https://docs.github.com/rest/issues/comments#list-issue-comments)

```ts
github.issues.listComments(input: {
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
}): Promise<(IssueComment)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/comments` · `issues/list-comments`</sub>

## `github.issues.createComment`

Create an issue comment — [API reference](https://docs.github.com/rest/issues/comments#create-an-issue-comment)

```ts
github.issues.createComment(input: {
  /** The contents of the comment. */
  body: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<IssueComment>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/comments` · `issues/create-comment`</sub>

## `github.issues.listDependenciesBlockedBy`

List dependencies an issue is blocked by — [API reference](https://docs.github.com/rest/issues/issue-dependencies#list-dependencies-an-issue-is-blocked-by)

```ts
github.issues.listDependenciesBlockedBy(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by` · `issues/list-dependencies-blocked-by`</sub>

## `github.issues.addBlockedByDependency`

Add a dependency an issue is blocked by — [API reference](https://docs.github.com/rest/issues/issue-dependencies#add-a-dependency-an-issue-is-blocked-by)

```ts
github.issues.addBlockedByDependency(input: {
  /** The id of the issue that blocks the current issue */
  issue_id: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Issue>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by` · `issues/add-blocked-by-dependency`</sub>

## `github.issues.removeDependencyBlockedBy`

Remove dependency an issue is blocked by — [API reference](https://docs.github.com/rest/issues/issue-dependencies#remove-dependency-an-issue-is-blocked-by)

```ts
github.issues.removeDependencyBlockedBy(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
  /** The id of the blocking issue to remove as a dependency */
  issue_id: number;
}): Promise<Issue>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}` · `issues/remove-dependency-blocked-by`</sub>

## `github.issues.listDependenciesBlocking`

List dependencies an issue is blocking — [API reference](https://docs.github.com/rest/issues/issue-dependencies#list-dependencies-an-issue-is-blocking)

```ts
github.issues.listDependenciesBlocking(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking` · `issues/list-dependencies-blocking`</sub>

## `github.issues.listEvents`

List issue events — [API reference](https://docs.github.com/rest/issues/events#list-issue-events)

```ts
github.issues.listEvents(input: {
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
}): Promise<(IssueEventForIssue)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/events` · `issues/list-events`</sub>

## `github.issues.listIssueFieldValuesForIssue`

List issue field values for an issue — [API reference](https://docs.github.com/rest/issues/issue-field-values#list-issue-field-values-for-an-issue)

```ts
github.issues.listIssueFieldValuesForIssue(input: {
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
}): Promise<(IssueFieldValue)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` · `issues/list-issue-field-values-for-issue`</sub>

## `github.issues.addIssueFieldValues`

Add issue field values to an issue — [API reference](https://docs.github.com/rest/issues/issue-field-values#add-issue-field-values-to-an-issue)

```ts
github.issues.addIssueFieldValues(input: {
  /** An array of issue field values to add to this issue. Each field value must include the field ID and the value to set. */
  issue_field_values?: ({ field_id: number; value: string | number | (string)[] })[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<(IssueFieldValue)[]>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` · `issues/add-issue-field-values`</sub>

## `github.issues.setIssueFieldValues`

Set issue field values for an issue — [API reference](https://docs.github.com/rest/issues/issue-field-values#set-issue-field-values-for-an-issue)

```ts
github.issues.setIssueFieldValues(input: {
  /** An array of issue field values to set for this issue. Each field value must include the field ID and the value to set. All existing field values will be replaced. */
  issue_field_values?: ({ field_id: number; value: string | number })[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<(IssueFieldValue)[]>
```

<sub>`PUT /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values` · `issues/set-issue-field-values`</sub>

## `github.issues.deleteIssueFieldValue`

Delete an issue field value from an issue — [API reference](https://docs.github.com/rest/issues/issue-field-values#delete-an-issue-field-value-from-an-issue)

```ts
github.issues.deleteIssueFieldValue(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
  /** The unique identifier of the issue field. */
  issue_field_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values/{issue_field_id}` · `issues/delete-issue-field-value`</sub>

## `github.issues.removeAllLabels`

Remove all labels from an issue — [API reference](https://docs.github.com/rest/issues/labels#remove-all-labels-from-an-issue)

```ts
github.issues.removeAllLabels(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels` · `issues/remove-all-labels`</sub>

## `github.issues.listLabelsOnIssue`

List labels for an issue — [API reference](https://docs.github.com/rest/issues/labels#list-labels-for-an-issue)

```ts
github.issues.listLabelsOnIssue(input: {
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
}): Promise<(Label)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/labels` · `issues/list-labels-on-issue`</sub>

## `github.issues.addLabels`

Add labels to an issue — [API reference](https://docs.github.com/rest/issues/labels#add-labels-to-an-issue)

```ts
github.issues.addLabels(input: {
  body?: { labels?: (string)[] } | (string)[] | ({ name: string })[];
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<(Label)[]>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/labels` · `issues/add-labels`</sub>

## `github.issues.setLabels`

Set labels for an issue — [API reference](https://docs.github.com/rest/issues/labels#set-labels-for-an-issue)

```ts
github.issues.setLabels(input: {
  body?: { labels?: (string)[] } | (string)[] | { labels?: ({ name: string })[] } | ({ name: string })[] | string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<(Label)[]>
```

<sub>`PUT /repos/{owner}/{repo}/issues/{issue_number}/labels` · `issues/set-labels`</sub>

## `github.issues.removeLabel`

Remove a label from an issue — [API reference](https://docs.github.com/rest/issues/labels#remove-a-label-from-an-issue)

```ts
github.issues.removeLabel(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
  name: string;
}): Promise<(Label)[]>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}` · `issues/remove-label`</sub>

## `github.issues.unlock`

Unlock an issue — [API reference](https://docs.github.com/rest/issues/issues#unlock-an-issue)

```ts
github.issues.unlock(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock` · `issues/unlock`</sub>

## `github.issues.lock`

Lock an issue — [API reference](https://docs.github.com/rest/issues/issues#lock-an-issue)

```ts
github.issues.lock(input: {
  /** The reason for locking the issue or pull request conversation. Lock will fail if you don't use one of these reasons:    * `off-topic`    * `too heated`    * `resolved`    * `spam` */
  lock_reason?: "off-topic" | "too heated" | "resolved" | "spam";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<BasicError>
```

<sub>`PUT /repos/{owner}/{repo}/issues/{issue_number}/lock` · `issues/lock`</sub>

## `github.issues.getParent`

Get parent issue — [API reference](https://docs.github.com/rest/issues/sub-issues#get-parent-issue)

```ts
github.issues.getParent(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Issue>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/parent` · `issues/get-parent`</sub>

## `github.issues.removeSubIssue`

Remove sub-issue — [API reference](https://docs.github.com/rest/issues/sub-issues#remove-sub-issue)

```ts
github.issues.removeSubIssue(input: {
  /** The id of the sub-issue to remove */
  sub_issue_id: number;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Issue>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/sub_issue` · `issues/remove-sub-issue`</sub>

## `github.issues.listSubIssues`

List sub-issues — [API reference](https://docs.github.com/rest/issues/sub-issues#list-sub-issues)

```ts
github.issues.listSubIssues(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues` · `issues/list-sub-issues`</sub>

## `github.issues.addSubIssue`

Add sub-issue — [API reference](https://docs.github.com/rest/issues/sub-issues#add-sub-issue)

```ts
github.issues.addSubIssue(input: {
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
}): Promise<Issue>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/sub_issues` · `issues/add-sub-issue`</sub>

## `github.issues.reprioritizeSubIssue`

Reprioritize sub-issue — [API reference](https://docs.github.com/rest/issues/sub-issues#reprioritize-sub-issue)

```ts
github.issues.reprioritizeSubIssue(input: {
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
}): Promise<Issue>
```

<sub>`PATCH /repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority` · `issues/reprioritize-sub-issue`</sub>

## `github.issues.listEventsForTimeline`

List timeline events for an issue — [API reference](https://docs.github.com/rest/issues/timeline#list-timeline-events-for-an-issue)

```ts
github.issues.listEventsForTimeline(input: {
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
}): Promise<(TimelineIssueEvents)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/timeline` · `issues/list-events-for-timeline`</sub>

## `github.issues.listCommentsForRepo`

List issue comments for a repository — [API reference](https://docs.github.com/rest/issues/comments#list-issue-comments-for-a-repository)

```ts
github.issues.listCommentsForRepo(input: {
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
}): Promise<(IssueComment)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/comments` · `issues/list-comments-for-repo`</sub>

## `github.issues.deleteComment`

Delete an issue comment — [API reference](https://docs.github.com/rest/issues/comments#delete-an-issue-comment)

```ts
github.issues.deleteComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}` · `issues/delete-comment`</sub>

## `github.issues.getComment`

Get an issue comment — [API reference](https://docs.github.com/rest/issues/comments#get-an-issue-comment)

```ts
github.issues.getComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<IssueComment>
```

<sub>`GET /repos/{owner}/{repo}/issues/comments/{comment_id}` · `issues/get-comment`</sub>

## `github.issues.updateComment`

Update an issue comment — [API reference](https://docs.github.com/rest/issues/comments#update-an-issue-comment)

```ts
github.issues.updateComment(input: {
  /** The contents of the comment. */
  body: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<IssueComment>
```

<sub>`PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}` · `issues/update-comment`</sub>

## `github.issues.unpinComment`

Unpin an issue comment — [API reference](https://docs.github.com/rest/issues/comments#unpin-an-issue-comment)

```ts
github.issues.unpinComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/pin` · `issues/unpin-comment`</sub>

## `github.issues.pinComment`

Pin an issue comment — [API reference](https://docs.github.com/rest/issues/comments#pin-an-issue-comment)

```ts
github.issues.pinComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<IssueComment>
```

<sub>`PUT /repos/{owner}/{repo}/issues/comments/{comment_id}/pin` · `issues/pin-comment`</sub>

## `github.issues.listEventsForRepo`

List issue events for a repository — [API reference](https://docs.github.com/rest/issues/events#list-issue-events-for-a-repository)

```ts
github.issues.listEventsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(IssueEvent)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/events` · `issues/list-events-for-repo`</sub>

## `github.issues.getEvent`

Get an issue event — [API reference](https://docs.github.com/rest/issues/events#get-an-issue-event)

```ts
github.issues.getEvent(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  event_id: number;
}): Promise<IssueEvent>
```

<sub>`GET /repos/{owner}/{repo}/issues/events/{event_id}` · `issues/get-event`</sub>

## `github.issues.listLabelsForRepo`

List labels for a repository — [API reference](https://docs.github.com/rest/issues/labels#list-labels-for-a-repository)

```ts
github.issues.listLabelsForRepo(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  page?: number;
}): Promise<(Label)[]>
```

<sub>`GET /repos/{owner}/{repo}/labels` · `issues/list-labels-for-repo`</sub>

## `github.issues.createLabel`

Create a label — [API reference](https://docs.github.com/rest/issues/labels#create-a-label)

```ts
github.issues.createLabel(input: {
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
}): Promise<Label>
```

<sub>`POST /repos/{owner}/{repo}/labels` · `issues/create-label`</sub>

## `github.issues.deleteLabel`

Delete a label — [API reference](https://docs.github.com/rest/issues/labels#delete-a-label)

```ts
github.issues.deleteLabel(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  name: string;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/labels/{name}` · `issues/delete-label`</sub>

## `github.issues.getLabel`

Get a label — [API reference](https://docs.github.com/rest/issues/labels#get-a-label)

```ts
github.issues.getLabel(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  name: string;
}): Promise<Label>
```

<sub>`GET /repos/{owner}/{repo}/labels/{name}` · `issues/get-label`</sub>

## `github.issues.updateLabel`

Update a label — [API reference](https://docs.github.com/rest/issues/labels#update-a-label)

```ts
github.issues.updateLabel(input: {
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
}): Promise<Label>
```

<sub>`PATCH /repos/{owner}/{repo}/labels/{name}` · `issues/update-label`</sub>

## `github.issues.listMilestones`

List milestones — [API reference](https://docs.github.com/rest/issues/milestones#list-milestones)

```ts
github.issues.listMilestones(input: {
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
}): Promise<(Milestone)[]>
```

<sub>`GET /repos/{owner}/{repo}/milestones` · `issues/list-milestones`</sub>

## `github.issues.createMilestone`

Create a milestone — [API reference](https://docs.github.com/rest/issues/milestones#create-a-milestone)

```ts
github.issues.createMilestone(input: {
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
}): Promise<Milestone>
```

<sub>`POST /repos/{owner}/{repo}/milestones` · `issues/create-milestone`</sub>

## `github.issues.deleteMilestone`

Delete a milestone — [API reference](https://docs.github.com/rest/issues/milestones#delete-a-milestone)

```ts
github.issues.deleteMilestone(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the milestone. */
  milestone_number: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/milestones/{milestone_number}` · `issues/delete-milestone`</sub>

## `github.issues.getMilestone`

Get a milestone — [API reference](https://docs.github.com/rest/issues/milestones#get-a-milestone)

```ts
github.issues.getMilestone(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the milestone. */
  milestone_number: number;
}): Promise<Milestone>
```

<sub>`GET /repos/{owner}/{repo}/milestones/{milestone_number}` · `issues/get-milestone`</sub>

## `github.issues.updateMilestone`

Update a milestone — [API reference](https://docs.github.com/rest/issues/milestones#update-a-milestone)

```ts
github.issues.updateMilestone(input: {
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
}): Promise<Milestone>
```

<sub>`PATCH /repos/{owner}/{repo}/milestones/{milestone_number}` · `issues/update-milestone`</sub>

## `github.issues.listLabelsForMilestone`

List labels for issues in a milestone — [API reference](https://docs.github.com/rest/issues/labels#list-labels-for-issues-in-a-milestone)

```ts
github.issues.listLabelsForMilestone(input: {
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
}): Promise<(Label)[]>
```

<sub>`GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels` · `issues/list-labels-for-milestone`</sub>

## `github.issues.listForAuthenticatedUser`

List user account issues assigned to the authenticated user — [API reference](https://docs.github.com/rest/issues/issues#list-user-account-issues-assigned-to-the-authenticated-user)

```ts
github.issues.listForAuthenticatedUser(input: {
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
}): Promise<(Issue)[]>
```

<sub>`GET /user/issues` · `issues/list-for-authenticated-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
