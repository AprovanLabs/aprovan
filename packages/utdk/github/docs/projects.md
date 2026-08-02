# Projects

26 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.projects.listForOrg`

List projects for organization — [API reference](https://docs.github.com/rest/projects/projects#list-projects-for-organization)

```ts
github.projects.listForOrg(input: {
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Limit results to projects of the specified type. */
  q?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(ProjectsV2)[]>
```

<sub>`GET /orgs/{org}/projectsV2` · `projects/list-for-org`</sub>

## `github.projects.getForOrg`

Get project for organization — [API reference](https://docs.github.com/rest/projects/projects#get-project-for-organization)

```ts
github.projects.getForOrg(input: {
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ProjectsV2>
```

<sub>`GET /orgs/{org}/projectsV2/{project_number}` · `projects/get-for-org`</sub>

## `github.projects.createDraftItemForOrg`

Create draft item for organization owned project — [API reference](https://docs.github.com/rest/projects/drafts#create-draft-item-for-organization-owned-project)

```ts
github.projects.createDraftItemForOrg(input: {
  /** The title of the draft issue item to create in the project. */
  title: string;
  /** The body content of the draft issue item to create in the project. */
  body?: string;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2ItemSimple>
```

<sub>`POST /orgs/{org}/projectsV2/{project_number}/drafts` · `projects/create-draft-item-for-org`</sub>

## `github.projects.listFieldsForOrg`

List project fields for organization — [API reference](https://docs.github.com/rest/projects/fields#list-project-fields-for-organization)

```ts
github.projects.listFieldsForOrg(input: {
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
}): Promise<(ProjectsV2Field)[]>
```

<sub>`GET /orgs/{org}/projectsV2/{project_number}/fields` · `projects/list-fields-for-org`</sub>

## `github.projects.addFieldForOrg`

Add a field to an organization-owned project. — [API reference](https://docs.github.com/rest/projects/fields#add-a-field-to-an-organization-owned-project)

```ts
github.projects.addFieldForOrg(input: {
  body: { issue_field_id: number } | { name: string; data_type: "text" | "number" | "date" } | { name: string; data_type: "single_select"; single_select_options: (ProjectsV2FieldSingleSelectOption)[] } | { name: string; data_type: "iteration"; iteration_configuration: ProjectsV2FieldIterationConfiguration };
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ProjectsV2Field>
```

<sub>`POST /orgs/{org}/projectsV2/{project_number}/fields` · `projects/add-field-for-org`</sub>

## `github.projects.getFieldForOrg`

Get project field for organization — [API reference](https://docs.github.com/rest/projects/fields#get-project-field-for-organization)

```ts
github.projects.getFieldForOrg(input: {
  /** The project's number. */
  project_number: number;
  /** The unique identifier of the field. */
  field_id: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
}): Promise<ProjectsV2Field>
```

<sub>`GET /orgs/{org}/projectsV2/{project_number}/fields/{field_id}` · `projects/get-field-for-org`</sub>

## `github.projects.listItemsForOrg`

List items for an organization owned project — [API reference](https://docs.github.com/rest/projects/items#list-items-for-an-organization-owned-project)

```ts
github.projects.listItemsForOrg(input: {
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** Search query to filter items, see [Filtering projects](https://docs.github.com/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects) for more information. */
  q?: string;
  /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: `fields[]=123&fields[]=456&fields[]=789` or `fields=123,456,789` */
  fields?: string | (string)[];
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(ProjectsV2ItemWithContent)[]>
```

<sub>`GET /orgs/{org}/projectsV2/{project_number}/items` · `projects/list-items-for-org`</sub>

## `github.projects.addItemForOrg`

Add item to organization owned project — [API reference](https://docs.github.com/rest/projects/items#add-item-to-organization-owned-project)

```ts
github.projects.addItemForOrg(input: {
  body: unknown | unknown;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2ItemSimple>
```

<sub>`POST /orgs/{org}/projectsV2/{project_number}/items` · `projects/add-item-for-org`</sub>

## `github.projects.deleteItemForOrg`

Delete project item for organization — [API reference](https://docs.github.com/rest/projects/items#delete-project-item-for-organization)

```ts
github.projects.deleteItemForOrg(input: {
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the project item. */
  item_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /orgs/{org}/projectsV2/{project_number}/items/{item_id}` · `projects/delete-item-for-org`</sub>

## `github.projects.getOrgItem`

Get an item for an organization owned project — [API reference](https://docs.github.com/rest/projects/items#get-an-item-for-an-organization-owned-project)

```ts
github.projects.getOrgItem(input: {
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the project item. */
  item_id: number;
  /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: fields[]=123&fields[]=456&fields[]=789 or fields=123,456,789 */
  fields?: string | (string)[];
}): Promise<ProjectsV2ItemWithContent>
```

<sub>`GET /orgs/{org}/projectsV2/{project_number}/items/{item_id}` · `projects/get-org-item`</sub>

## `github.projects.updateItemForOrg`

Update project item for organization — [API reference](https://docs.github.com/rest/projects/items#update-project-item-for-organization)

```ts
github.projects.updateItemForOrg(input: {
  /** A list of field updates to apply. */
  fields: ({ id: number; value: string | number | null })[];
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The unique identifier of the project item. */
  item_id: number;
}): Promise<ProjectsV2ItemWithContent>
```

<sub>`PATCH /orgs/{org}/projectsV2/{project_number}/items/{item_id}` · `projects/update-item-for-org`</sub>

## `github.projects.createViewForOrg`

Create a view for an organization-owned project — [API reference](https://docs.github.com/rest/projects/views#create-a-view-for-an-organization-owned-project)

```ts
github.projects.createViewForOrg(input: {
  /** The name of the view. */
  name: string;
  /** The layout of the view. */
  layout: "table" | "board" | "roadmap";
  /** The filter query for the view. See [Filtering projects](https://docs.github.com/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects) for more information. */
  filter?: string;
  /** `visible_fields` is not applicable to `roadmap` layout views. For `table` and `board` layouts, this represents the field IDs that should be visible in the view. If not provided, the default visible fields will be used. */
  visible_fields?: (number)[];
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2View>
```

<sub>`POST /orgs/{org}/projectsV2/{project_number}/views` · `projects/create-view-for-org`</sub>

## `github.projects.listViewItemsForOrg`

List items for an organization project view — [API reference](https://docs.github.com/rest/projects/items#list-items-for-an-organization-project-view)

```ts
github.projects.listViewItemsForOrg(input: {
  /** The project's number. */
  project_number: number;
  /** The organization name. The name is not case sensitive. */
  org: string;
  /** The number that identifies the project view. */
  view_number: number;
  /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: `fields[]=123&fields[]=456&fields[]=789` or `fields=123,456,789` */
  fields?: string | (string)[];
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(ProjectsV2ItemWithContent)[]>
```

<sub>`GET /orgs/{org}/projectsV2/{project_number}/views/{view_number}/items` · `projects/list-view-items-for-org`</sub>

## `github.projects.createDraftItemForAuthenticatedUser`

Create draft item for user owned project — [API reference](https://docs.github.com/rest/projects/drafts#create-draft-item-for-user-owned-project)

```ts
github.projects.createDraftItemForAuthenticatedUser(input: {
  /** The title of the draft issue item to create in the project. */
  title: string;
  /** The body content of the draft issue item to create in the project. */
  body?: string;
  /** The unique identifier of the user. */
  user_id: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2ItemSimple>
```

<sub>`POST /user/{user_id}/projectsV2/{project_number}/drafts` · `projects/create-draft-item-for-authenticated-user`</sub>

## `github.projects.createViewForUser`

Create a view for a user-owned project — [API reference](https://docs.github.com/rest/projects/views#create-a-view-for-a-user-owned-project)

```ts
github.projects.createViewForUser(input: {
  /** The name of the view. */
  name: string;
  /** The layout of the view. */
  layout: "table" | "board" | "roadmap";
  /** The filter query for the view. See [Filtering projects](https://docs.github.com/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects) for more information. */
  filter?: string;
  /** `visible_fields` is not applicable to `roadmap` layout views. For `table` and `board` layouts, this represents the field IDs that should be visible in the view. If not provided, the default visible fields will be used. */
  visible_fields?: (number)[];
  /** The unique identifier of the user. */
  user_id: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2View>
```

<sub>`POST /users/{user_id}/projectsV2/{project_number}/views` · `projects/create-view-for-user`</sub>

## `github.projects.listForUser`

List projects for user — [API reference](https://docs.github.com/rest/projects/projects#list-projects-for-user)

```ts
github.projects.listForUser(input: {
  /** The handle for the GitHub user account. */
  username: string;
  /** Limit results to projects of the specified type. */
  q?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(ProjectsV2)[]>
```

<sub>`GET /users/{username}/projectsV2` · `projects/list-for-user`</sub>

## `github.projects.getForUser`

Get project for user — [API reference](https://docs.github.com/rest/projects/projects#get-project-for-user)

```ts
github.projects.getForUser(input: {
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<ProjectsV2>
```

<sub>`GET /users/{username}/projectsV2/{project_number}` · `projects/get-for-user`</sub>

## `github.projects.listFieldsForUser`

List project fields for user — [API reference](https://docs.github.com/rest/projects/fields#list-project-fields-for-user)

```ts
github.projects.listFieldsForUser(input: {
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
}): Promise<(ProjectsV2Field)[]>
```

<sub>`GET /users/{username}/projectsV2/{project_number}/fields` · `projects/list-fields-for-user`</sub>

## `github.projects.addFieldForUser`

Add field to user owned project — [API reference](https://docs.github.com/rest/projects/fields#add-field-to-user-owned-project)

```ts
github.projects.addFieldForUser(input: {
  body: { name: string; data_type: "text" | "number" | "date" } | { name: string; data_type: "single_select"; single_select_options: (ProjectsV2FieldSingleSelectOption)[] } | { name: string; data_type: "iteration"; iteration_configuration: ProjectsV2FieldIterationConfiguration };
  /** The handle for the GitHub user account. */
  username: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2Field>
```

<sub>`POST /users/{username}/projectsV2/{project_number}/fields` · `projects/add-field-for-user`</sub>

## `github.projects.getFieldForUser`

Get project field for user — [API reference](https://docs.github.com/rest/projects/fields#get-project-field-for-user)

```ts
github.projects.getFieldForUser(input: {
  /** The project's number. */
  project_number: number;
  /** The unique identifier of the field. */
  field_id: number;
  /** The handle for the GitHub user account. */
  username: string;
}): Promise<ProjectsV2Field>
```

<sub>`GET /users/{username}/projectsV2/{project_number}/fields/{field_id}` · `projects/get-field-for-user`</sub>

## `github.projects.listItemsForUser`

List items for a user owned project — [API reference](https://docs.github.com/rest/projects/items#list-items-for-a-user-owned-project)

```ts
github.projects.listItemsForUser(input: {
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
  /** Search query to filter items, see [Filtering projects](https://docs.github.com/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects) for more information. */
  q?: string;
  /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: `fields[]=123&fields[]=456&fields[]=789` or `fields=123,456,789` */
  fields?: string | (string)[];
}): Promise<(ProjectsV2ItemWithContent)[]>
```

<sub>`GET /users/{username}/projectsV2/{project_number}/items` · `projects/list-items-for-user`</sub>

## `github.projects.addItemForUser`

Add item to user owned project — [API reference](https://docs.github.com/rest/projects/items#add-item-to-user-owned-project)

```ts
github.projects.addItemForUser(input: {
  body: unknown | unknown;
  /** The handle for the GitHub user account. */
  username: string;
  /** The project's number. */
  project_number: number;
}): Promise<ProjectsV2ItemSimple>
```

<sub>`POST /users/{username}/projectsV2/{project_number}/items` · `projects/add-item-for-user`</sub>

## `github.projects.deleteItemForUser`

Delete project item for user — [API reference](https://docs.github.com/rest/projects/items#delete-project-item-for-user)

```ts
github.projects.deleteItemForUser(input: {
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the project item. */
  item_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /users/{username}/projectsV2/{project_number}/items/{item_id}` · `projects/delete-item-for-user`</sub>

## `github.projects.getUserItem`

Get an item for a user owned project — [API reference](https://docs.github.com/rest/projects/items#get-an-item-for-a-user-owned-project)

```ts
github.projects.getUserItem(input: {
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the project item. */
  item_id: number;
  /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: fields[]=123&fields[]=456&fields[]=789 or fields=123,456,789 */
  fields?: string | (string)[];
}): Promise<ProjectsV2ItemWithContent>
```

<sub>`GET /users/{username}/projectsV2/{project_number}/items/{item_id}` · `projects/get-user-item`</sub>

## `github.projects.updateItemForUser`

Update project item for user — [API reference](https://docs.github.com/rest/projects/items#update-project-item-for-user)

```ts
github.projects.updateItemForUser(input: {
  /** A list of field updates to apply. */
  fields: ({ id: number; value: string | number | null })[];
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
  /** The unique identifier of the project item. */
  item_id: number;
}): Promise<ProjectsV2ItemWithContent>
```

<sub>`PATCH /users/{username}/projectsV2/{project_number}/items/{item_id}` · `projects/update-item-for-user`</sub>

## `github.projects.listViewItemsForUser`

List items for a user project view — [API reference](https://docs.github.com/rest/projects/items#list-items-for-a-user-project-view)

```ts
github.projects.listViewItemsForUser(input: {
  /** The project's number. */
  project_number: number;
  /** The handle for the GitHub user account. */
  username: string;
  /** The number that identifies the project view. */
  view_number: number;
  /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: `fields[]=123&fields[]=456&fields[]=789` or `fields=123,456,789` */
  fields?: string | (string)[];
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results before this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  before?: string;
  /** A cursor, as given in the [Link header](https://docs.github.com/rest/guides/using-pagination-in-the-rest-api#using-link-headers). If specified, the query only searches for results after this cursor. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  after?: string;
  /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
  per_page?: number;
}): Promise<(ProjectsV2ItemWithContent)[]>
```

<sub>`GET /users/{username}/projectsV2/{project_number}/views/{view_number}/items` · `projects/list-view-items-for-user`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
