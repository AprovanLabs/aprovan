import type { BasicError, ProjectsV2, ProjectsV2Field, ProjectsV2FieldIterationConfiguration, ProjectsV2FieldSingleSelectOption, ProjectsV2ItemSimple, ProjectsV2ItemWithContent, ProjectsV2View } from "./schemas.js";

export type ProjectsOperations = {
  /**
   * List projects for organization
   * @see https://docs.github.com/rest/projects/projects#list-projects-for-organization
   */
  listForOrg: (input: {
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
  }) => Promise<(ProjectsV2)[]>;

  /**
   * Get project for organization
   * @see https://docs.github.com/rest/projects/projects#get-project-for-organization
   */
  getForOrg: (input: {
    /** The project's number. */
    project_number: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ProjectsV2>;

  /**
   * Create draft item for organization owned project
   * @see https://docs.github.com/rest/projects/drafts#create-draft-item-for-organization-owned-project
   */
  createDraftItemForOrg: (input: {
    /** The title of the draft issue item to create in the project. */
    title: string;
    /** The body content of the draft issue item to create in the project. */
    body?: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The project's number. */
    project_number: number;
  }) => Promise<ProjectsV2ItemSimple>;

  /**
   * List project fields for organization
   * @see https://docs.github.com/rest/projects/fields#list-project-fields-for-organization
   */
  listFieldsForOrg: (input: {
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
  }) => Promise<(ProjectsV2Field)[]>;

  /**
   * Add a field to an organization-owned project.
   * @see https://docs.github.com/rest/projects/fields#add-a-field-to-an-organization-owned-project
   */
  addFieldForOrg: (input: {
    body: { issue_field_id: number } | { name: string; data_type: "text" | "number" | "date" } | { name: string; data_type: "single_select"; single_select_options: (ProjectsV2FieldSingleSelectOption)[] } | { name: string; data_type: "iteration"; iteration_configuration: ProjectsV2FieldIterationConfiguration };
    /** The project's number. */
    project_number: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ProjectsV2Field>;

  /**
   * Get project field for organization
   * @see https://docs.github.com/rest/projects/fields#get-project-field-for-organization
   */
  getFieldForOrg: (input: {
    /** The project's number. */
    project_number: number;
    /** The unique identifier of the field. */
    field_id: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<ProjectsV2Field>;

  /**
   * List items for an organization owned project
   * @see https://docs.github.com/rest/projects/items#list-items-for-an-organization-owned-project
   */
  listItemsForOrg: (input: {
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
  }) => Promise<(ProjectsV2ItemWithContent)[]>;

  /**
   * Add item to organization owned project
   * @see https://docs.github.com/rest/projects/items#add-item-to-organization-owned-project
   */
  addItemForOrg: (input: {
    body: unknown | unknown;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The project's number. */
    project_number: number;
  }) => Promise<ProjectsV2ItemSimple>;

  /**
   * Get an item for an organization owned project
   * @see https://docs.github.com/rest/projects/items#get-an-item-for-an-organization-owned-project
   */
  getOrgItem: (input: {
    /** The project's number. */
    project_number: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the project item. */
    item_id: number;
    /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: fields[]=123&fields[]=456&fields[]=789 or fields=123,456,789 */
    fields?: string | (string)[];
  }) => Promise<ProjectsV2ItemWithContent>;

  /**
   * Update project item for organization
   * @see https://docs.github.com/rest/projects/items#update-project-item-for-organization
   */
  updateItemForOrg: (input: {
    /** A list of field updates to apply. */
    fields: ({ id: number; value: string | number | null })[];
    /** The project's number. */
    project_number: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the project item. */
    item_id: number;
  }) => Promise<ProjectsV2ItemWithContent>;

  /**
   * Delete project item for organization
   * @see https://docs.github.com/rest/projects/items#delete-project-item-for-organization
   */
  deleteItemForOrg: (input: {
    /** The project's number. */
    project_number: number;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The unique identifier of the project item. */
    item_id: number;
  }) => Promise<BasicError>;

  /**
   * Create a view for an organization-owned project
   * @see https://docs.github.com/rest/projects/views#create-a-view-for-an-organization-owned-project
   */
  createViewForOrg: (input: {
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
  }) => Promise<ProjectsV2View>;

  /**
   * List items for an organization project view
   * @see https://docs.github.com/rest/projects/items#list-items-for-an-organization-project-view
   */
  listViewItemsForOrg: (input: {
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
  }) => Promise<(ProjectsV2ItemWithContent)[]>;

  /**
   * Create draft item for user owned project
   * @see https://docs.github.com/rest/projects/drafts#create-draft-item-for-user-owned-project
   */
  createDraftItemForAuthenticatedUser: (input: {
    /** The title of the draft issue item to create in the project. */
    title: string;
    /** The body content of the draft issue item to create in the project. */
    body?: string;
    /** The unique identifier of the user. */
    user_id: string;
    /** The project's number. */
    project_number: number;
  }) => Promise<ProjectsV2ItemSimple>;

  /**
   * Create a view for a user-owned project
   * @see https://docs.github.com/rest/projects/views#create-a-view-for-a-user-owned-project
   */
  createViewForUser: (input: {
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
  }) => Promise<ProjectsV2View>;

  /**
   * List projects for user
   * @see https://docs.github.com/rest/projects/projects#list-projects-for-user
   */
  listForUser: (input: {
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
  }) => Promise<(ProjectsV2)[]>;

  /**
   * Get project for user
   * @see https://docs.github.com/rest/projects/projects#get-project-for-user
   */
  getForUser: (input: {
    /** The project's number. */
    project_number: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<ProjectsV2>;

  /**
   * List project fields for user
   * @see https://docs.github.com/rest/projects/fields#list-project-fields-for-user
   */
  listFieldsForUser: (input: {
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
  }) => Promise<(ProjectsV2Field)[]>;

  /**
   * Add field to user owned project
   * @see https://docs.github.com/rest/projects/fields#add-field-to-user-owned-project
   */
  addFieldForUser: (input: {
    body: { name: string; data_type: "text" | "number" | "date" } | { name: string; data_type: "single_select"; single_select_options: (ProjectsV2FieldSingleSelectOption)[] } | { name: string; data_type: "iteration"; iteration_configuration: ProjectsV2FieldIterationConfiguration };
    /** The handle for the GitHub user account. */
    username: string;
    /** The project's number. */
    project_number: number;
  }) => Promise<ProjectsV2Field>;

  /**
   * Get project field for user
   * @see https://docs.github.com/rest/projects/fields#get-project-field-for-user
   */
  getFieldForUser: (input: {
    /** The project's number. */
    project_number: number;
    /** The unique identifier of the field. */
    field_id: number;
    /** The handle for the GitHub user account. */
    username: string;
  }) => Promise<ProjectsV2Field>;

  /**
   * List items for a user owned project
   * @see https://docs.github.com/rest/projects/items#list-items-for-a-user-owned-project
   */
  listItemsForUser: (input: {
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
  }) => Promise<(ProjectsV2ItemWithContent)[]>;

  /**
   * Add item to user owned project
   * @see https://docs.github.com/rest/projects/items#add-item-to-user-owned-project
   */
  addItemForUser: (input: {
    body: unknown | unknown;
    /** The handle for the GitHub user account. */
    username: string;
    /** The project's number. */
    project_number: number;
  }) => Promise<ProjectsV2ItemSimple>;

  /**
   * Get an item for a user owned project
   * @see https://docs.github.com/rest/projects/items#get-an-item-for-a-user-owned-project
   */
  getUserItem: (input: {
    /** The project's number. */
    project_number: number;
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the project item. */
    item_id: number;
    /** Limit results to specific fields, by their IDs. If not specified, the title field will be returned.  Example: fields[]=123&fields[]=456&fields[]=789 or fields=123,456,789 */
    fields?: string | (string)[];
  }) => Promise<ProjectsV2ItemWithContent>;

  /**
   * Update project item for user
   * @see https://docs.github.com/rest/projects/items#update-project-item-for-user
   */
  updateItemForUser: (input: {
    /** A list of field updates to apply. */
    fields: ({ id: number; value: string | number | null })[];
    /** The project's number. */
    project_number: number;
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the project item. */
    item_id: number;
  }) => Promise<ProjectsV2ItemWithContent>;

  /**
   * Delete project item for user
   * @see https://docs.github.com/rest/projects/items#delete-project-item-for-user
   */
  deleteItemForUser: (input: {
    /** The project's number. */
    project_number: number;
    /** The handle for the GitHub user account. */
    username: string;
    /** The unique identifier of the project item. */
    item_id: number;
  }) => Promise<BasicError>;

  /**
   * List items for a user project view
   * @see https://docs.github.com/rest/projects/items#list-items-for-a-user-project-view
   */
  listViewItemsForUser: (input: {
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
  }) => Promise<(ProjectsV2ItemWithContent)[]>;
};
