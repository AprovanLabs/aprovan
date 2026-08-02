import type { AccessRequestCreateRequest, AccessRequestResponse, AddCustomFieldSettingRequest, AddFollowersRequest, AddMembersRequest, AgentCompact, AgentResponse, AllocationRequest, AllocationResponse, AsanaNamedResource, AttachmentCompact, AttachmentResponse, AuditLogEvent, BatchRequest, BatchResponse, BudgetRequest, BudgetResponse, CreateMembershipRequest, CreateTimeTrackingEntryRequest, CreateTimesheetApprovalStatusRequest, CustomFieldCreateRequest, CustomFieldRequest, CustomFieldResponse, CustomFieldSettingResponse, CustomTypeResponse, DeprecatedPortfolioMembershipCompact, DeprecatedPortfolioMembershipResponse, EmptyResponse, EnumOption, EnumOptionBase, EnumOptionInsertRequest, EnumOptionRequest, EventResponse, GoalAddSupportingRelationshipRequest, GoalCompact, GoalMetricCurrentValueRequest, GoalMetricRequest, GoalRelationshipCompact, GoalRelationshipRequest, GoalRelationshipResponse, GoalRemoveSupportingRelationshipRequest, GoalRequest, GoalResponse, GoalUpdateRequest, GraphExportRequest, GraphExportResponse, JobResponse, MembershipCompact, MembershipRequest, MembershipResponse, ModifyDependenciesRequest, ModifyDependentsRequest, NextPage, OooEntryCreateRequest, OooEntryResponse, OooEntryUpdateRequest, OrganizationExportRequest, OrganizationExportResponse, PortfolioAddItemRequest, PortfolioCompact, PortfolioDuplicateRequest, PortfolioRemoveItemRequest, PortfolioRequest, PortfolioResponse, PortfolioUpdateRequest, ProjectBriefRequest, ProjectBriefResponse, ProjectCompact, ProjectDuplicateRequest, ProjectMembershipCompact, ProjectMembershipNormalResponse, ProjectPortfolioSettingCompact, ProjectPortfolioSettingResponse, ProjectPortfolioSettingUpdateRequest, ProjectRequest, ProjectResponse, ProjectSaveAsTemplateRequest, ProjectSectionInsertRequest, ProjectStatusCompact, ProjectStatusRequest, ProjectStatusResponse, ProjectTemplateCompact, ProjectTemplateInstantiateProjectRequest, ProjectTemplateResponse, ProjectUpdateRequest, RateOrPlaceholderCompact, RateRequest, RateResponse, RateUpdateRequest, RbacRoleCompact, RbacRoleRequest, RbacRoleResponse, RbacRoleUpdateRequest, ReactionCompact, RemoveCustomFieldSettingRequest, RemoveFollowersRequest, RemoveMembersRequest, ResourceExportRequest, ResourceExportResponse, RuleTriggerRequest, RuleTriggerResponse, SectionCompact, SectionRequest, SectionResponse, SectionTaskInsertRequest, StatusUpdateCompact, StatusUpdateRequest, StatusUpdateResponse, StoryCompact, StoryRequest, StoryResponse, TagCompact, TagCreateRequest, TagCreateTagForWorkspaceRequest, TagResponse, TagUpdateRequest, TaskAddFollowersRequest, TaskAddProjectRequest, TaskAddTagRequest, TaskCompact, TaskCountResponse, TaskCreateRequest, TaskDuplicateRequest, TaskRemoveFollowersRequest, TaskRemoveProjectRequest, TaskRemoveTagRequest, TaskResponse, TaskSetParentRequest, TaskTemplateCompact, TaskTemplateInstantiateTaskRequest, TaskTemplateResponse, TaskUpdateRequest, TeamAddUserRequest, TeamCompact, TeamMembershipCompact, TeamMembershipResponse, TeamRemoveUserRequest, TeamRequest, TeamResponse, TimePeriodCompact, TimePeriodResponse, TimeTrackingCategoryCompact, TimeTrackingCategoryCreateRequest, TimeTrackingCategoryResponse, TimeTrackingCategoryUpdateRequest, TimeTrackingEntryBase, TimeTrackingEntryCompact, TimesheetApprovalStatusCompact, TimesheetApprovalStatusResponse, UpdateTimeTrackingEntryRequest, UpdateTimesheetApprovalStatusRequest, UserBaseResponse, UserCompact, UserResponse, UserTaskListResponse, UserUpdateRequest, WebhookRequest, WebhookResponse, WebhookUpdateRequest, WorkspaceAddUserRequest, WorkspaceCompact, WorkspaceMembershipCompact, WorkspaceMembershipResponse, WorkspaceRemoveUserRequest, WorkspaceRequest, WorkspaceResponse } from "./schemas.js";

export type AsanaClient = {
  /**
   * Get access requests
   */
  getAccessRequests: (input: {
    /** Globally unique identifier for the target object. */
    target: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "message" | "requester" | "requester.name" | "target")[];
  }) => Promise<{ data?: (AccessRequestResponse)[] }>;

  /**
   * Create an access request
   */
  createAccessRequest: (input: {
    data?: AccessRequestCreateRequest;
  }) => Promise<{ data?: AccessRequestResponse }>;

  /**
   * Approve an access request
   */
  approveAccessRequest: (input: {
    /** Globally unique identifier for the access request. */
    access_request_gid: string;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Reject an access request
   */
  rejectAccessRequest: (input: {
    /** Globally unique identifier for the access request. */
    access_request_gid: string;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a list of agents in a workspace
   */
  getAgentsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("behavior_guidance" | "description" | "name" | "offset" | "path" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "resource_subtype" | "uri" | "workspace")[];
  }) => Promise<{ data?: (AgentCompact)[]; next_page?: NextPage }>;

  /**
   * Get an agent
   */
  getAgent: (input: {
    /** Globally unique identifier for the agent. */
    agent_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("behavior_guidance" | "description" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "resource_subtype" | "workspace")[];
  }) => Promise<{ data?: AgentResponse }>;

  /**
   * Get an allocation
   */
  getAllocation: (input: {
    /** Globally unique identifier for the allocation. */
    allocation_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_by" | "created_by.name" | "effort" | "effort.type" | "effort.value" | "end_date" | "parent" | "parent.name" | "resource_subtype" | "start_date")[];
  }) => Promise<{ data?: AllocationResponse }>;

  /**
   * Update an allocation
   */
  updateAllocation: (input: {
    data?: AllocationRequest;
    /** Globally unique identifier for the allocation. */
    allocation_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_by" | "created_by.name" | "effort" | "effort.type" | "effort.value" | "end_date" | "parent" | "parent.name" | "resource_subtype" | "start_date")[];
  }) => Promise<{ data?: AllocationResponse }>;

  /**
   * Delete an allocation
   */
  deleteAllocation: (input: {
    /** Globally unique identifier for the allocation. */
    allocation_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get multiple allocations
   */
  getAllocations: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for the project to filter allocations by. */
    parent?: string;
    /** Globally unique identifier for the user or placeholder the allocation is assigned to. */
    assignee?: string;
    /** Globally unique identifier for the workspace. */
    workspace?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_by" | "created_by.name" | "effort" | "effort.type" | "effort.value" | "end_date" | "offset" | "parent" | "parent.name" | "path" | "resource_subtype" | "start_date" | "uri")[];
  }) => Promise<{ data?: (AllocationResponse)[]; next_page?: NextPage }>;

  /**
   * Create an allocation
   */
  createAllocation: (input: {
    data?: AllocationRequest & { [key: string]: unknown };
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_by" | "created_by.name" | "effort" | "effort.type" | "effort.value" | "end_date" | "parent" | "parent.name" | "resource_subtype" | "start_date")[];
  }) => Promise<{ data?: AllocationResponse }>;

  /**
   * Get an attachment
   */
  getAttachment: (input: {
    /** Globally unique identifier for the attachment. */
    attachment_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("connected_to_app" | "created_at" | "download_url" | "host" | "name" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permanent_url" | "resource_subtype" | "size" | "view_url")[];
  }) => Promise<{ data?: AttachmentResponse }>;

  /**
   * Delete an attachment
   */
  deleteAttachment: (input: {
    /** Globally unique identifier for the attachment. */
    attachment_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get attachments from an object
   */
  getAttachmentsForObject: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Globally unique identifier for object to fetch statuses from. Must be a GID for a `project`, `project_brief`, or `task`. */
    parent: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("connected_to_app" | "created_at" | "download_url" | "host" | "name" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permanent_url" | "resource_subtype" | "size" | "uri" | "view_url")[];
  }) => Promise<{ data?: (AttachmentCompact)[]; next_page?: NextPage }>;

  /**
   * Upload an attachment
   */
  createAttachmentForObject: (input: {
    /** The type of the attachment. Must be one of the given values. If not specified, a file attachment of type `asana` will be assumed. Note that if the value of `resource_subtype` is `external`, a `parent`, `name`, and `url` must also be provided.  */
    resource_subtype?: "asana" | "external";
    /** Required for `asana` attachments.  */
    file?: string;
    /** Required identifier of the parent task, project, or project_brief, as a string.  */
    parent: string;
    /** The URL of the external resource being attached. Required for attachments of type `external`.  */
    url?: string;
    /** The name of the external resource being attached. Required for attachments of type `external`.  */
    name?: string;
    /** *Optional*. Only relevant for external attachments with a parent task. A boolean indicating whether the current app should be connected with the attachment for the purposes of showing an app components widget. Requires the app to have been added to a project the parent task is in. This property can only be set if an OAuth token is used to authenticate the request.  Criteria for displaying app widget: 1. An OAuth token must be used to authenticate the request 2. The app needs to have its `widget_metadata_url` configured in the developer console 3. The task the attachment is being attached to must be in a project with the app installed */
    connect_to_app?: boolean;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("connected_to_app" | "created_at" | "download_url" | "host" | "name" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permanent_url" | "resource_subtype" | "size" | "view_url")[];
  }) => Promise<{ data?: AttachmentResponse }>;

  /**
   * Get audit log events
   */
  getAuditLogEvents: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Filter to events created after this time (inclusive). */
    start_at?: string;
    /** Filter to events created before this time (exclusive). */
    end_at?: string;
    /** Filter to events of this type. Refer to the [supported audit log events](/docs/audit-log-events#supported-audit-log-events) for a full list of values. */
    event_type?: string;
    /** Filter to events with an actor of this type. This only needs to be included if querying for actor types without an ID. If `actor_gid` is included, this should be excluded. */
    actor_type?: "user" | "asana" | "asana_support" | "anonymous" | "external_administrator";
    /** Filter to events triggered by the actor with this ID. */
    actor_gid?: string;
    /** Filter to events with this resource ID. */
    resource_gid?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
  }) => Promise<{ data?: (AuditLogEvent)[]; next_page?: NextPage }>;

  /**
   * Submit parallel requests
   */
  createBatchRequest: (input: {
    data?: BatchRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("body" | "headers" | "status_code")[];
  }) => Promise<{ data?: (BatchResponse)[] }>;

  /**
   * Get all budgets
   */
  getBudgets: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for the budget's parent object. This currently can only be a `project`. */
    parent: string;
  }) => Promise<{ data?: (BudgetResponse)[] }>;

  /**
   * Create a budget
   */
  createBudget: (input: {
    data?: BudgetRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: BudgetResponse }>;

  /**
   * Get a budget
   */
  getBudget: (input: {
    /** Globally unique identifier for the budget. */
    budget_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual" | "actual.billable_status_filter" | "actual.units" | "actual.value" | "budget_type" | "estimate" | "estimate.billable_status_filter" | "estimate.enabled" | "estimate.source" | "estimate.units" | "estimate.value" | "parent" | "parent.name" | "total" | "total.enabled" | "total.units" | "total.value")[];
  }) => Promise<{ data?: BudgetResponse }>;

  /**
   * Update a budget
   */
  updateBudget: (input: {
    data?: BudgetRequest;
    /** Globally unique identifier for the budget. */
    budget_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual" | "actual.billable_status_filter" | "actual.units" | "actual.value" | "budget_type" | "estimate" | "estimate.billable_status_filter" | "estimate.enabled" | "estimate.source" | "estimate.units" | "estimate.value" | "parent" | "parent.name" | "total" | "total.enabled" | "total.units" | "total.value")[];
  }) => Promise<{ data?: BudgetResponse }>;

  /**
   * Delete a budget
   */
  deleteBudget: (input: {
    /** Globally unique identifier for the budget. */
    budget_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a project's custom fields
   */
  getCustomFieldSettingsForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field" | "custom_field.asana_created_field" | "custom_field.created_by" | "custom_field.created_by.name" | "custom_field.currency_code" | "custom_field.custom_label" | "custom_field.custom_label_position" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.default_access_level" | "custom_field.description" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.format" | "custom_field.has_notifications_enabled" | "custom_field.html_text_value" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.is_global_to_workspace" | "custom_field.is_value_read_only" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.people_value" | "custom_field.people_value.name" | "custom_field.precision" | "custom_field.privacy_setting" | "custom_field.reference_value" | "custom_field.reference_value.name" | "custom_field.representation_type" | "custom_field.resource_subtype" | "custom_field.text_value" | "custom_field.type" | "is_important" | "offset" | "parent" | "parent.name" | "path" | "project" | "project.name" | "uri")[];
  }) => Promise<{ data?: (CustomFieldSettingResponse)[]; next_page?: NextPage }>;

  /**
   * Get a portfolio's custom fields
   */
  getCustomFieldSettingsForPortfolio: (input: {
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field" | "custom_field.asana_created_field" | "custom_field.created_by" | "custom_field.created_by.name" | "custom_field.currency_code" | "custom_field.custom_label" | "custom_field.custom_label_position" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.default_access_level" | "custom_field.description" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.format" | "custom_field.has_notifications_enabled" | "custom_field.html_text_value" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.is_global_to_workspace" | "custom_field.is_value_read_only" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.people_value" | "custom_field.people_value.name" | "custom_field.precision" | "custom_field.privacy_setting" | "custom_field.reference_value" | "custom_field.reference_value.name" | "custom_field.representation_type" | "custom_field.resource_subtype" | "custom_field.text_value" | "custom_field.type" | "is_important" | "offset" | "parent" | "parent.name" | "path" | "project" | "project.name" | "uri")[];
  }) => Promise<{ data?: (CustomFieldSettingResponse)[]; next_page?: NextPage }>;

  /**
   * Get a goal's custom fields
   */
  getCustomFieldSettingsForGoal: (input: {
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field" | "custom_field.asana_created_field" | "custom_field.created_by" | "custom_field.created_by.name" | "custom_field.currency_code" | "custom_field.custom_label" | "custom_field.custom_label_position" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.default_access_level" | "custom_field.description" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.format" | "custom_field.has_notifications_enabled" | "custom_field.html_text_value" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.is_global_to_workspace" | "custom_field.is_value_read_only" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.people_value" | "custom_field.people_value.name" | "custom_field.precision" | "custom_field.privacy_setting" | "custom_field.reference_value" | "custom_field.reference_value.name" | "custom_field.representation_type" | "custom_field.resource_subtype" | "custom_field.text_value" | "custom_field.type" | "is_important" | "offset" | "parent" | "parent.name" | "path" | "project" | "project.name" | "uri")[];
  }) => Promise<{ data?: (CustomFieldSettingResponse)[]; next_page?: NextPage }>;

  /**
   * Get a team's custom fields
   */
  getCustomFieldSettingsForTeam: (input: {
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field" | "custom_field.asana_created_field" | "custom_field.created_by" | "custom_field.created_by.name" | "custom_field.currency_code" | "custom_field.custom_label" | "custom_field.custom_label_position" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.default_access_level" | "custom_field.description" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.format" | "custom_field.has_notifications_enabled" | "custom_field.html_text_value" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.is_global_to_workspace" | "custom_field.is_value_read_only" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.people_value" | "custom_field.people_value.name" | "custom_field.precision" | "custom_field.privacy_setting" | "custom_field.reference_value" | "custom_field.reference_value.name" | "custom_field.representation_type" | "custom_field.resource_subtype" | "custom_field.text_value" | "custom_field.type" | "is_important" | "parent" | "parent.name" | "project" | "project.name")[];
  }) => Promise<{ data?: (CustomFieldSettingResponse)[] }>;

  /**
   * Create a custom field
   */
  createCustomField: (input: {
    data?: CustomFieldCreateRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("asana_created_field" | "created_by" | "created_by.name" | "currency_code" | "custom_label" | "custom_label_position" | "date_value" | "date_value.date" | "date_value.date_time" | "default_access_level" | "description" | "display_value" | "enabled" | "enum_options" | "enum_options.color" | "enum_options.enabled" | "enum_options.name" | "enum_value" | "enum_value.color" | "enum_value.enabled" | "enum_value.name" | "format" | "has_notifications_enabled" | "html_text_value" | "id_prefix" | "input_restrictions" | "is_formula_field" | "is_global_to_workspace" | "is_value_read_only" | "multi_enum_values" | "multi_enum_values.color" | "multi_enum_values.enabled" | "multi_enum_values.name" | "name" | "number_value" | "people_value" | "people_value.name" | "precision" | "privacy_setting" | "reference_value" | "reference_value.name" | "representation_type" | "resource_subtype" | "text_value" | "type")[];
  }) => Promise<{ data?: CustomFieldResponse }>;

  /**
   * Get a custom field
   */
  getCustomField: (input: {
    /** Globally unique identifier for the custom field. */
    custom_field_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("asana_created_field" | "created_by" | "created_by.name" | "currency_code" | "custom_label" | "custom_label_position" | "date_value" | "date_value.date" | "date_value.date_time" | "default_access_level" | "description" | "display_value" | "enabled" | "enum_options" | "enum_options.color" | "enum_options.enabled" | "enum_options.name" | "enum_value" | "enum_value.color" | "enum_value.enabled" | "enum_value.name" | "format" | "has_notifications_enabled" | "html_text_value" | "id_prefix" | "input_restrictions" | "is_formula_field" | "is_global_to_workspace" | "is_value_read_only" | "multi_enum_values" | "multi_enum_values.color" | "multi_enum_values.enabled" | "multi_enum_values.name" | "name" | "number_value" | "people_value" | "people_value.name" | "precision" | "privacy_setting" | "reference_value" | "reference_value.name" | "representation_type" | "resource_subtype" | "text_value" | "type")[];
  }) => Promise<{ data?: CustomFieldResponse }>;

  /**
   * Update a custom field
   */
  updateCustomField: (input: {
    data?: CustomFieldRequest;
    /** Globally unique identifier for the custom field. */
    custom_field_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("asana_created_field" | "created_by" | "created_by.name" | "currency_code" | "custom_label" | "custom_label_position" | "date_value" | "date_value.date" | "date_value.date_time" | "default_access_level" | "description" | "display_value" | "enabled" | "enum_options" | "enum_options.color" | "enum_options.enabled" | "enum_options.name" | "enum_value" | "enum_value.color" | "enum_value.enabled" | "enum_value.name" | "format" | "has_notifications_enabled" | "html_text_value" | "id_prefix" | "input_restrictions" | "is_formula_field" | "is_global_to_workspace" | "is_value_read_only" | "multi_enum_values" | "multi_enum_values.color" | "multi_enum_values.enabled" | "multi_enum_values.name" | "name" | "number_value" | "people_value" | "people_value.name" | "precision" | "privacy_setting" | "reference_value" | "reference_value.name" | "representation_type" | "resource_subtype" | "text_value" | "type")[];
  }) => Promise<{ data?: CustomFieldResponse }>;

  /**
   * Delete a custom field
   */
  deleteCustomField: (input: {
    /** Globally unique identifier for the custom field. */
    custom_field_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a workspace's custom fields
   */
  getCustomFieldsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("asana_created_field" | "created_by" | "created_by.name" | "currency_code" | "custom_label" | "custom_label_position" | "date_value" | "date_value.date" | "date_value.date_time" | "default_access_level" | "description" | "display_value" | "enabled" | "enum_options" | "enum_options.color" | "enum_options.enabled" | "enum_options.name" | "enum_value" | "enum_value.color" | "enum_value.enabled" | "enum_value.name" | "format" | "has_notifications_enabled" | "html_text_value" | "id_prefix" | "input_restrictions" | "is_formula_field" | "is_global_to_workspace" | "is_value_read_only" | "multi_enum_values" | "multi_enum_values.color" | "multi_enum_values.enabled" | "multi_enum_values.name" | "name" | "number_value" | "offset" | "path" | "people_value" | "people_value.name" | "precision" | "privacy_setting" | "reference_value" | "reference_value.name" | "representation_type" | "resource_subtype" | "text_value" | "type" | "uri")[];
  }) => Promise<{ data?: (CustomFieldResponse)[]; next_page?: NextPage }>;

  /**
   * Create an enum option
   */
  createEnumOptionForCustomField: (input: {
    data?: EnumOptionRequest;
    /** Globally unique identifier for the custom field. */
    custom_field_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "enabled" | "name")[];
  }) => Promise<{ data?: EnumOption }>;

  /**
   * Reorder a custom field's enum
   */
  insertEnumOptionForCustomField: (input: {
    data?: EnumOptionInsertRequest;
    /** Globally unique identifier for the custom field. */
    custom_field_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "enabled" | "name")[];
  }) => Promise<{ data?: EnumOption }>;

  /**
   * Update an enum option
   */
  updateEnumOption: (input: {
    data?: EnumOptionBase;
    /** Globally unique identifier for the enum option. */
    enum_option_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "enabled" | "name")[];
  }) => Promise<{ data?: EnumOption }>;

  /**
   * Get all custom types associated with an object
   */
  getCustomTypes: (input: {
    /** Globally unique identifier for the project, which is used as a filter when retrieving all custom types. */
    project: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("name" | "offset" | "path" | "status_options" | "status_options.color" | "status_options.completion_state" | "status_options.enabled" | "status_options.name" | "uri")[];
  }) => Promise<{ data?: (CustomTypeResponse)[]; next_page?: NextPage }>;

  /**
   * Get a custom type
   */
  getCustomType: (input: {
    /** Globally unique identifier for the custom type. */
    custom_type_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("name" | "status_options" | "status_options.color" | "status_options.completion_state" | "status_options.enabled" | "status_options.name")[];
  }) => Promise<{ data?: CustomTypeResponse }>;

  /**
   * Get events on a resource
   */
  getEvents: (input: {
    /** A resource ID to subscribe to. The resource can be a task, project, or goal. */
    resource: string;
    /** A sync token received from the last request, or none on first sync. Events will be returned from the point in time that the sync token was generated. *Note: On your first request, omit the sync token. The response will be the same as for an expired sync token, and will include a new valid sync token.If the sync token is too old (which may happen from time to time) the API will return a `412 Precondition Failed` error, and include a fresh sync token in the response.* */
    sync?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("action" | "change" | "change.action" | "change.added_value" | "change.field" | "change.new_value" | "change.removed_value" | "created_at" | "parent" | "parent.name" | "resource" | "resource.name" | "type" | "user" | "user.name")[];
  }) => Promise<{ data?: (EventResponse)[]; sync?: string; has_more?: boolean }>;

  /**
   * Initiate a graph export
   */
  createGraphExport: (input: {
    data?: GraphExportRequest;
  }) => Promise<{ data?: GraphExportResponse }>;

  /**
   * Initiate a resource export
   */
  createResourceExport: (input: {
    data?: ResourceExportRequest;
  }) => Promise<{ data?: ResourceExportResponse }>;

  /**
   * Get a goal relationship
   */
  getGoalRelationship: (input: {
    /** Globally unique identifier for the goal relationship. */
    goal_relationship_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("contribution_weight" | "resource_subtype" | "supported_goal" | "supported_goal.name" | "supported_goal.owner" | "supported_goal.owner.name" | "supporting_resource" | "supporting_resource.name")[];
  }) => Promise<{ data?: GoalRelationshipResponse }>;

  /**
   * Update a goal relationship
   */
  updateGoalRelationship: (input: {
    data?: GoalRelationshipRequest;
    /** Globally unique identifier for the goal relationship. */
    goal_relationship_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("contribution_weight" | "resource_subtype" | "supported_goal" | "supported_goal.name" | "supported_goal.owner" | "supported_goal.owner.name" | "supporting_resource" | "supporting_resource.name")[];
  }) => Promise<{ data?: GoalRelationshipResponse }>;

  /**
   * Get goal relationships
   */
  getGoalRelationships: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Globally unique identifier for the supported goal in the goal relationship. */
    supported_goal: string;
    /** If provided, filter to goal relationships with a given resource_subtype. */
    resource_subtype?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("contribution_weight" | "offset" | "path" | "resource_subtype" | "supported_goal" | "supported_goal.name" | "supported_goal.owner" | "supported_goal.owner.name" | "supporting_resource" | "supporting_resource.name" | "uri")[];
  }) => Promise<{ data?: (GoalRelationshipCompact)[]; next_page?: NextPage }>;

  /**
   * Add a supporting goal relationship
   */
  addSupportingRelationship: (input: {
    data?: GoalAddSupportingRelationshipRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("contribution_weight" | "resource_subtype" | "supported_goal" | "supported_goal.name" | "supported_goal.owner" | "supported_goal.owner.name" | "supporting_resource" | "supporting_resource.name")[];
  }) => Promise<{ data?: GoalRelationshipResponse }>;

  /**
   * Removes a supporting goal relationship
   */
  removeSupportingRelationship: (input: {
    data?: GoalRemoveSupportingRelationshipRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a goal
   */
  getGoal: (input: {
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Update a goal
   */
  updateGoal: (input: {
    data?: GoalUpdateRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Delete a goal
   */
  deleteGoal: (input: {
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get goals
   */
  getGoals: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for supporting portfolio. */
    portfolio?: string;
    /** Globally unique identifier for supporting project. */
    project?: string;
    /** Globally unique identifier for supporting task. */
    task?: string;
    /** Filter to goals with is_workspace_level set to query value. Must be used with the workspace parameter. */
    is_workspace_level?: boolean;
    /** Globally unique identifier for the team. */
    team?: string;
    /** Globally unique identifier for the workspace. */
    workspace?: string;
    /** Globally unique identifiers for the time periods. */
    time_periods?: (string)[];
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "offset" | "owner" | "owner.name" | "path" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (GoalCompact)[]; next_page?: NextPage }>;

  /**
   * Create a goal
   */
  createGoal: (input: {
    data?: GoalRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Create a goal metric
   */
  createGoalMetric: (input: {
    data?: GoalMetricRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Update a goal metric
   */
  updateGoalMetric: (input: {
    data?: GoalMetricCurrentValueRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Add a collaborator to a goal
   */
  addFollowers: (input: {
    data?: TaskAddFollowersRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Remove a collaborator from a goal
   */
  removeFollowers: (input: {
    data?: TaskAddFollowersRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: GoalResponse }>;

  /**
   * Get parent goals from a goal
   */
  getParentGoalsForGoal: (input: {
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "followers" | "followers.name" | "html_notes" | "is_workspace_level" | "liked" | "likes" | "likes.user" | "likes.user.name" | "metric" | "metric.can_manage" | "metric.currency_code" | "metric.current_display_value" | "metric.current_number_value" | "metric.initial_number_value" | "metric.is_custom_weight" | "metric.precision" | "metric.progress_source" | "metric.resource_subtype" | "metric.target_number_value" | "metric.unit" | "name" | "notes" | "num_likes" | "owner" | "owner.name" | "privacy_setting" | "start_on" | "status" | "team" | "team.name" | "time_period" | "time_period.display_name" | "time_period.end_on" | "time_period.period" | "time_period.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (GoalCompact)[] }>;

  /**
   * Add a custom field to a goal
   */
  addCustomFieldSettingForGoal: (input: {
    data?: AddCustomFieldSettingRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: CustomFieldSettingResponse }>;

  /**
   * Remove a custom field from a goal
   */
  removeCustomFieldSettingForGoal: (input: {
    data?: RemoveCustomFieldSettingRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a job by id
   */
  getJob: (input: {
    /** Globally unique identifier for the job. */
    job_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get multiple memberships
   */
  getMemberships: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for `goal`, `project`, `portfolio`, `custom_type`, or `custom_field`. This parameter is optional when `resource_subtype` is provided along with `member` of type `team`. */
    parent?: string;
    /** Globally unique identifier for `team` or `user`. When used with `resource_subtype` and without `parent`, `member` must be of type `team`. For user-type memberships `parent` parameter is required to disambiguate the workspace from which memberships should be retrieved. */
    member?: string;
    /** The type of membership to return. Required when `parent` is absent. Currently supported value is `project_membership` (when `member` is a team GID, returns all project memberships for that team). */
    resource_subtype?: "project_membership";
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("offset" | "path" | "uri")[];
  }) => Promise<{ data?: (MembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Create a membership
   */
  createMembership: (input: {
    data?: CreateMembershipRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: MembershipResponse }>;

  /**
   * Get a membership
   */
  getMembership: (input: {
    /** Globally unique identifier for the membership. */
    membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: MembershipResponse }>;

  /**
   * Update a membership
   */
  updateMembership: (input: {
    data?: MembershipRequest;
    /** Globally unique identifier for the membership. */
    membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: MembershipResponse }>;

  /**
   * Delete a membership
   */
  deleteMembership: (input: {
    /** Globally unique identifier for the membership. */
    membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get an OOO entry
   */
  getOooEntry: (input: {
    /** Globally unique identifier for the OOO entry. */
    ooo_entry_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "end_date" | "start_date" | "user" | "user.name")[];
  }) => Promise<{ data?: OooEntryResponse }>;

  /**
   * Update an OOO entry
   */
  updateOooEntry: (input: {
    data?: OooEntryUpdateRequest;
    /** Globally unique identifier for the OOO entry. */
    ooo_entry_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "end_date" | "start_date" | "user" | "user.name")[];
  }) => Promise<{ data?: OooEntryResponse }>;

  /**
   * Delete an OOO entry
   */
  deleteOooEntry: (input: {
    /** Globally unique identifier for the OOO entry. */
    ooo_entry_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get OOO entries for a user
   */
  getOooEntries: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for the user to filter OOO entries by. */
    user: string;
    /** Globally unique identifier for the workspace. */
    workspace: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** An ISO 8601 date string. Filters to OOO entries that overlap with or end after this date. */
    start_date?: string;
    /** An ISO 8601 date string. Filters to OOO entries that overlap with or start before this date. */
    end_date?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "end_date" | "offset" | "path" | "start_date" | "uri" | "user" | "user.name")[];
  }) => Promise<{ data?: (OooEntryResponse)[]; next_page?: NextPage }>;

  /**
   * Create an OOO entry
   */
  createOooEntry: (input: {
    data?: OooEntryCreateRequest & { [key: string]: unknown };
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "end_date" | "start_date" | "user" | "user.name")[];
  }) => Promise<{ data?: OooEntryResponse }>;

  /**
   * Create an organization export request
   */
  createOrganizationExport: (input: {
    data?: OrganizationExportRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "download_url" | "organization" | "organization.name" | "state")[];
  }) => Promise<{ data?: OrganizationExportResponse }>;

  /**
   * Get details on an org export request
   */
  getOrganizationExport: (input: {
    /** Globally unique identifier for the organization export. */
    organization_export_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "download_url" | "organization" | "organization.name" | "state")[];
  }) => Promise<{ data?: OrganizationExportResponse }>;

  /**
   * Get multiple portfolio memberships
   */
  getPortfolioMemberships: (input: {
    /** The portfolio to filter results on. */
    portfolio?: string;
    /** The workspace to filter results on. */
    workspace?: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("access_level" | "offset" | "path" | "portfolio" | "portfolio.name" | "uri" | "user" | "user.name")[];
  }) => Promise<{ data?: (DeprecatedPortfolioMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get a portfolio membership
   */
  getPortfolioMembership: (input: {
    portfolio_membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("access_level" | "portfolio" | "portfolio.name" | "user" | "user.name")[];
  }) => Promise<{ data?: DeprecatedPortfolioMembershipResponse }>;

  /**
   * Get memberships from a portfolio
   */
  getPortfolioMembershipsForPortfolio: (input: {
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("access_level" | "offset" | "path" | "portfolio" | "portfolio.name" | "uri" | "user" | "user.name")[];
  }) => Promise<{ data?: (DeprecatedPortfolioMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get multiple portfolios
   */
  getPortfolios: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The workspace or organization to filter portfolios on. */
    workspace: string;
    /** The user who owns the portfolio. Currently, API users can only get a list of portfolios that they themselves own, unless the request is made from a Service Account. In the case of a Service Account, if this parameter is specified, then all portfolios owned by this parameter are returned. Otherwise, all portfolios across the workspace are returned. */
    owner?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "created_at" | "created_by" | "created_by.name" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "members" | "members.name" | "name" | "offset" | "owner" | "owner.name" | "path" | "permalink_url" | "privacy_setting" | "project_templates" | "project_templates.name" | "public" | "start_on" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (PortfolioCompact)[]; next_page?: NextPage }>;

  /**
   * Create a portfolio
   */
  createPortfolio: (input: {
    data?: PortfolioRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "created_at" | "created_by" | "created_by.name" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "members" | "members.name" | "name" | "owner" | "owner.name" | "permalink_url" | "privacy_setting" | "project_templates" | "project_templates.name" | "public" | "start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: PortfolioResponse }>;

  /**
   * Get a portfolio
   */
  getPortfolio: (input: {
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "created_at" | "created_by" | "created_by.name" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "members" | "members.name" | "name" | "owner" | "owner.name" | "permalink_url" | "privacy_setting" | "project_templates" | "project_templates.name" | "public" | "start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: PortfolioResponse }>;

  /**
   * Update a portfolio
   */
  updatePortfolio: (input: {
    data?: PortfolioUpdateRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "created_at" | "created_by" | "created_by.name" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "members" | "members.name" | "name" | "owner" | "owner.name" | "permalink_url" | "privacy_setting" | "project_templates" | "project_templates.name" | "public" | "start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: PortfolioResponse }>;

  /**
   * Delete a portfolio
   */
  deletePortfolio: (input: {
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get portfolio items
   */
  getItemsForPortfolio: (input: {
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "offset" | "owner" | "path" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (ProjectCompact)[]; next_page?: NextPage }>;

  /**
   * Add a portfolio item
   */
  addItemForPortfolio: (input: {
    data?: PortfolioAddItemRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Remove a portfolio item
   */
  removeItemForPortfolio: (input: {
    data?: PortfolioRemoveItemRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Add a custom field to a portfolio
   */
  addCustomFieldSettingForPortfolio: (input: {
    data?: AddCustomFieldSettingRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: CustomFieldSettingResponse }>;

  /**
   * Remove a custom field from a portfolio
   */
  removeCustomFieldSettingForPortfolio: (input: {
    data?: RemoveCustomFieldSettingRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Add users to a portfolio
   */
  addMembersForPortfolio: (input: {
    data?: AddMembersRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "created_at" | "created_by" | "created_by.name" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "members" | "members.name" | "name" | "owner" | "owner.name" | "permalink_url" | "privacy_setting" | "project_templates" | "project_templates.name" | "public" | "start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: PortfolioResponse }>;

  /**
   * Remove users from a portfolio
   */
  removeMembersForPortfolio: (input: {
    data?: RemoveMembersRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "created_at" | "created_by" | "created_by.name" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "due_on" | "members" | "members.name" | "name" | "owner" | "owner.name" | "permalink_url" | "privacy_setting" | "project_templates" | "project_templates.name" | "public" | "start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: PortfolioResponse }>;

  /**
   * Duplicate a portfolio
   */
  duplicatePortfolio: (input: {
    data?: PortfolioDuplicateRequest;
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get a project brief
   */
  getProjectBrief: (input: {
    /** Globally unique identifier for the project brief. */
    project_brief_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("html_text" | "permalink_url" | "project" | "project.name" | "text" | "title")[];
  }) => Promise<{ data?: ProjectBriefResponse }>;

  /**
   * Update a project brief
   */
  updateProjectBrief: (input: {
    data?: ProjectBriefRequest;
    /** Globally unique identifier for the project brief. */
    project_brief_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("html_text" | "permalink_url" | "project" | "project.name" | "text" | "title")[];
  }) => Promise<{ data?: ProjectBriefResponse }>;

  /**
   * Delete a project brief
   */
  deleteProjectBrief: (input: {
    /** Globally unique identifier for the project brief. */
    project_brief_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Create a project brief
   */
  createProjectBrief: (input: {
    data?: ProjectBriefRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("html_text" | "permalink_url" | "project" | "project.name" | "text" | "title")[];
  }) => Promise<{ data?: ProjectBriefResponse }>;

  /**
   * Get a project membership
   */
  getProjectMembership: (input: {
    project_membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("access_level" | "member" | "member.name" | "parent" | "parent.name" | "project" | "project.name" | "user" | "user.name" | "write_access")[];
  }) => Promise<{ data?: ProjectMembershipNormalResponse }>;

  /**
   * Get memberships from a project
   */
  getProjectMembershipsForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("access_level" | "member" | "member.name" | "offset" | "parent" | "parent.name" | "path" | "uri")[];
  }) => Promise<{ data?: (ProjectMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get a project portfolio setting
   */
  getProjectPortfolioSetting: (input: {
    /** Globally unique identifier for the project portfolio setting. */
    project_portfolio_setting_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_access_control_inherited" | "portfolio" | "project")[];
  }) => Promise<{ data?: ProjectPortfolioSettingResponse }>;

  /**
   * Update a project portfolio setting
   */
  updateProjectPortfolioSetting: (input: {
    data?: ProjectPortfolioSettingUpdateRequest;
    /** Globally unique identifier for the project portfolio setting. */
    project_portfolio_setting_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_access_control_inherited" | "portfolio" | "project")[];
  }) => Promise<{ data?: ProjectPortfolioSettingResponse }>;

  /**
   * Get project portfolio settings for a project
   */
  getProjectPortfolioSettingsForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_access_control_inherited" | "offset" | "path" | "portfolio" | "project" | "uri")[];
  }) => Promise<{ data?: (ProjectPortfolioSettingCompact)[]; next_page?: NextPage }>;

  /**
   * Get project portfolio settings for a portfolio
   */
  getProjectPortfolioSettingsForPortfolio: (input: {
    /** Globally unique identifier for the portfolio. */
    portfolio_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_access_control_inherited" | "offset" | "path" | "portfolio" | "project" | "uri")[];
  }) => Promise<{ data?: (ProjectPortfolioSettingCompact)[]; next_page?: NextPage }>;

  /**
   * Get a project status
   */
  getProjectStatus: (input: {
    /** The project status update to get. */
    project_status_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("author" | "author.name" | "color" | "created_at" | "created_by" | "created_by.name" | "html_text" | "modified_at" | "text" | "title")[];
  }) => Promise<{ data?: ProjectStatusResponse }>;

  /**
   * Delete a project status
   */
  deleteProjectStatus: (input: {
    /** The project status update to get. */
    project_status_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get statuses from a project
   */
  getProjectStatusesForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("author" | "author.name" | "color" | "created_at" | "created_by" | "created_by.name" | "html_text" | "modified_at" | "offset" | "path" | "text" | "title" | "uri")[];
  }) => Promise<{ data?: (ProjectStatusCompact)[]; next_page?: NextPage }>;

  /**
   * Create a project status
   */
  createProjectStatusForProject: (input: {
    data?: ProjectStatusRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("author" | "author.name" | "color" | "created_at" | "created_by" | "created_by.name" | "html_text" | "modified_at" | "text" | "title")[];
  }) => Promise<{ data?: ProjectStatusResponse }>;

  /**
   * Get a project template
   */
  getProjectTemplate: (input: {
    /** Globally unique identifier for the project template. */
    project_template_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "description" | "html_description" | "name" | "owner" | "public" | "requested_dates" | "requested_dates.description" | "requested_dates.name" | "requested_roles" | "requested_roles.name" | "team" | "team.name")[];
  }) => Promise<{ data?: ProjectTemplateResponse }>;

  /**
   * Delete a project template
   */
  deleteProjectTemplate: (input: {
    /** Globally unique identifier for the project template. */
    project_template_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get multiple project templates
   */
  getProjectTemplates: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** The workspace to filter results on. */
    workspace?: string;
    /** The team to filter projects on. */
    team?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "description" | "html_description" | "name" | "offset" | "owner" | "path" | "public" | "requested_dates" | "requested_dates.description" | "requested_dates.name" | "requested_roles" | "requested_roles.name" | "team" | "team.name" | "uri")[];
  }) => Promise<{ data?: (ProjectTemplateCompact)[]; next_page?: NextPage }>;

  /**
   * Get a team's project templates
   */
  getProjectTemplatesForTeam: (input: {
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "description" | "html_description" | "name" | "offset" | "owner" | "path" | "public" | "requested_dates" | "requested_dates.description" | "requested_dates.name" | "requested_roles" | "requested_roles.name" | "team" | "team.name" | "uri")[];
  }) => Promise<{ data?: (ProjectTemplateCompact)[]; next_page?: NextPage }>;

  /**
   * Instantiate a project from a project template
   */
  instantiateProject: (input: {
    data?: ProjectTemplateInstantiateProjectRequest;
    /** Globally unique identifier for the project template. */
    project_template_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get multiple projects
   */
  getProjects: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The workspace or organization to filter projects on. */
    workspace?: string;
    /** **Deprecated.** The team to filter projects on. Please use `GET /memberships` with `{ member: team, resource_subtype: project_membership }` instead. */
    team?: string;
    /** Only return projects whose `archived` field takes on the value of this parameter. */
    archived?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "offset" | "owner" | "path" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (ProjectCompact)[]; next_page?: NextPage }>;

  /**
   * Create a project
   */
  createProject: (input: {
    data?: ProjectRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Get a project
   */
  getProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Update a project
   */
  updateProject: (input: {
    data?: ProjectUpdateRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Delete a project
   */
  deleteProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Duplicate a project
   */
  duplicateProject: (input: {
    data?: ProjectDuplicateRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get projects a task is in
   */
  getProjectsForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "offset" | "owner" | "path" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (ProjectCompact)[]; next_page?: NextPage }>;

  /**
   * Get a team's projects
   */
  getProjectsForTeam: (input: {
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Only return projects whose `archived` field takes on the value of this parameter. */
    archived?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "offset" | "owner" | "path" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (ProjectCompact)[]; next_page?: NextPage }>;

  /**
   * Create a project in a team
   */
  createProjectForTeam: (input: {
    data?: ProjectRequest;
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Get all projects in a workspace
   */
  getProjectsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Only return projects whose `archived` field takes on the value of this parameter. */
    archived?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "offset" | "owner" | "path" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (ProjectCompact)[]; next_page?: NextPage }>;

  /**
   * Create a project in a workspace
   */
  createProjectForWorkspace: (input: {
    data?: ProjectRequest;
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Search projects in a workspace
   */
  searchProjectsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Performs full-text search on the project name. */
    text?: string;
    /** One of `due_date`, `created_at`, `completed_at`, or `modified_at`, defaults to `modified_at`. */
    sort_by?: "due_date" | "created_at" | "completed_at" | "modified_at";
    /** Default `false`. */
    sort_ascending?: boolean;
    /** Filter on project completion status. */
    completed?: boolean;
    /** Comma-separated list of team IDs. */
    "teams.any"?: string;
    /** Comma-separated list of user identifiers to filter on as project owners. This can either be the string "me", an email, or the gid of a user. */
    "owner.any"?: string;
    /** Comma-separated list of user identifiers to filter on as members. This can either be the string "me", an email, or the gid of a user. */
    "members.any"?: string;
    /** Comma-separated list of user identifiers to exclude as members. This can either be the string "me", an email, or the gid of a user. */
    "members.not"?: string;
    /** Comma-separated list of portfolio IDs to filter on. */
    "portfolios.any"?: string;
    /** ISO 8601 date string or `null`. */
    completed_on?: string | null;
    /** ISO 8601 date string. */
    "completed_on.before"?: string;
    /** ISO 8601 date string. */
    "completed_on.after"?: string;
    /** ISO 8601 datetime string. */
    "completed_at.before"?: string;
    /** ISO 8601 datetime string. */
    "completed_at.after"?: string;
    /** ISO 8601 date string or `null`. */
    created_on?: string | null;
    /** ISO 8601 date string. */
    "created_on.before"?: string;
    /** ISO 8601 date string. */
    "created_on.after"?: string;
    /** ISO 8601 datetime string. */
    "created_at.before"?: string;
    /** ISO 8601 datetime string. */
    "created_at.after"?: string;
    /** ISO 8601 date string or `null`. */
    due_on?: string | null;
    /** ISO 8601 date string. */
    "due_on.before"?: string;
    /** ISO 8601 date string. */
    "due_on.after"?: string;
    /** ISO 8601 datetime string. */
    "due_at.before"?: string;
    /** ISO 8601 datetime string. */
    "due_at.after"?: string;
    /** ISO 8601 date string or `null`. */
    start_on?: string | null;
    /** ISO 8601 date string. */
    "start_on.before"?: string;
    /** ISO 8601 date string. */
    "start_on.after"?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (ProjectCompact)[] }>;

  /**
   * Add a custom field to a project
   */
  addCustomFieldSettingForProject: (input: {
    data?: AddCustomFieldSettingRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field" | "custom_field.asana_created_field" | "custom_field.created_by" | "custom_field.created_by.name" | "custom_field.currency_code" | "custom_field.custom_label" | "custom_field.custom_label_position" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.default_access_level" | "custom_field.description" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.format" | "custom_field.has_notifications_enabled" | "custom_field.html_text_value" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.is_global_to_workspace" | "custom_field.is_value_read_only" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.people_value" | "custom_field.people_value.name" | "custom_field.precision" | "custom_field.privacy_setting" | "custom_field.reference_value" | "custom_field.reference_value.name" | "custom_field.representation_type" | "custom_field.resource_subtype" | "custom_field.text_value" | "custom_field.type" | "is_important" | "parent" | "parent.name" | "project" | "project.name")[];
  }) => Promise<{ data?: CustomFieldSettingResponse }>;

  /**
   * Remove a custom field from a project
   */
  removeCustomFieldSettingForProject: (input: {
    data?: RemoveCustomFieldSettingRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get task count of a project
   */
  getTaskCountsForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("num_completed_milestones" | "num_completed_tasks" | "num_incomplete_milestones" | "num_incomplete_tasks" | "num_milestones" | "num_tasks")[];
  }) => Promise<{ data?: TaskCountResponse }>;

  /**
   * Add users to a project
   */
  addMembersForProject: (input: {
    data?: AddMembersRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Remove users from a project
   */
  removeMembersForProject: (input: {
    data?: RemoveMembersRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Add followers to a project
   */
  addFollowersForProject: (input: {
    data?: AddFollowersRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Remove followers from a project
   */
  removeFollowersForProject: (input: {
    data?: RemoveFollowersRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("archived" | "color" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_from_template" | "created_from_template.name" | "current_status" | "current_status.author" | "current_status.author.name" | "current_status.color" | "current_status.created_at" | "current_status.created_by" | "current_status.created_by.name" | "current_status.html_text" | "current_status.modified_at" | "current_status.text" | "current_status.title" | "current_status_update" | "current_status_update.resource_subtype" | "current_status_update.title" | "custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "default_access_level" | "default_view" | "due_date" | "due_on" | "followers" | "followers.name" | "html_notes" | "icon" | "members" | "members.name" | "minimum_access_level_for_customization" | "minimum_access_level_for_sharing" | "modified_at" | "name" | "notes" | "owner" | "permalink_url" | "privacy_setting" | "project_brief" | "public" | "start_on" | "team" | "team.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: ProjectResponse }>;

  /**
   * Create a project template from a project
   */
  projectSaveAsTemplate: (input: {
    data?: ProjectSaveAsTemplateRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get multiple rates
   */
  getRates: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for `project`. */
    parent?: string;
    /** Globally unique identifier for `user` or `placeholder`. */
    resource?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("offset" | "path" | "uri")[];
  }) => Promise<{ data?: (RateOrPlaceholderCompact)[]; next_page?: NextPage }>;

  /**
   * Create a rate
   */
  createRate: (input: {
    data?: RateRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "currency_code" | "parent" | "parent.name" | "rate" | "resource" | "resource.name")[];
  }) => Promise<{ data?: RateResponse }>;

  /**
   * Get a rate
   */
  getRate: (input: {
    /** Globally unique identifier for the rate. */
    rate_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "currency_code" | "parent" | "parent.name" | "rate" | "resource" | "resource.name")[];
  }) => Promise<{ data?: RateResponse }>;

  /**
   * Update a rate
   */
  updateRate: (input: {
    data?: RateUpdateRequest;
    /** Globally unique identifier for the rate. */
    rate_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_by" | "created_by.name" | "currency_code" | "parent" | "parent.name" | "rate" | "resource" | "resource.name")[];
  }) => Promise<{ data?: RateResponse }>;

  /**
   * Delete a rate
   */
  deleteRate: (input: {
    /** Globally unique identifier for the rate. */
    rate_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get reactions with an emoji base on an object.
   */
  getReactionsOnObject: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Globally unique identifier for object to fetch reactions from. Must be a GID for a status update or story. */
    target: string;
    /** Only return reactions with this emoji base character. */
    emoji_base: string;
  }) => Promise<{ data?: (ReactionCompact)[]; next_page?: NextPage }>;

  /**
   * Get multiple roles
   */
  getRoles: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The workspace or organization to filter roles on. */
    workspace?: string;
    /** Only return projects whose `archived` field takes on the value of this parameter. */
    archived?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("base_role_type" | "creation_time" | "description" | "is_standard_role" | "modified_at" | "name" | "offset" | "path" | "permissions" | "permissions.allowed_guest_invites" | "permissions.assign_roles" | "permissions.create_and_edit_ai_automations" | "permissions.create_and_edit_ai_teammates" | "permissions.create_app_authorization" | "permissions.create_global_custom_fields" | "permissions.create_pat_authorization" | "permissions.create_team" | "permissions.download_mobile_attachments" | "permissions.export_project_data" | "permissions.import_data" | "permissions.manage_roles" | "permissions.proactive_ai" | "permissions.share_goal_with_domain" | "permissions.share_portfolios_with_org" | "permissions.standard_ai" | "permissions.task_deletion_policy" | "permissions.upload_attachments" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (RbacRoleCompact)[]; next_page?: NextPage }>;

  /**
   * Create a role
   */
  createRole: (input: {
    data?: RbacRoleRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("base_role_type" | "creation_time" | "description" | "is_standard_role" | "modified_at" | "name" | "permissions" | "permissions.allowed_guest_invites" | "permissions.assign_roles" | "permissions.create_and_edit_ai_automations" | "permissions.create_and_edit_ai_teammates" | "permissions.create_app_authorization" | "permissions.create_global_custom_fields" | "permissions.create_pat_authorization" | "permissions.create_team" | "permissions.download_mobile_attachments" | "permissions.export_project_data" | "permissions.import_data" | "permissions.manage_roles" | "permissions.proactive_ai" | "permissions.share_goal_with_domain" | "permissions.share_portfolios_with_org" | "permissions.standard_ai" | "permissions.task_deletion_policy" | "permissions.upload_attachments" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: RbacRoleResponse }>;

  /**
   * Get a role
   */
  getRole: (input: {
    /** Globally unique identifier for the role. */
    role_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("base_role_type" | "creation_time" | "description" | "is_standard_role" | "modified_at" | "name" | "permissions" | "permissions.allowed_guest_invites" | "permissions.assign_roles" | "permissions.create_and_edit_ai_automations" | "permissions.create_and_edit_ai_teammates" | "permissions.create_app_authorization" | "permissions.create_global_custom_fields" | "permissions.create_pat_authorization" | "permissions.create_team" | "permissions.download_mobile_attachments" | "permissions.export_project_data" | "permissions.import_data" | "permissions.manage_roles" | "permissions.proactive_ai" | "permissions.share_goal_with_domain" | "permissions.share_portfolios_with_org" | "permissions.standard_ai" | "permissions.task_deletion_policy" | "permissions.upload_attachments" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: RbacRoleResponse }>;

  /**
   * Update a role
   */
  updateRole: (input: {
    data?: RbacRoleUpdateRequest;
    /** Globally unique identifier for the role. */
    role_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("base_role_type" | "creation_time" | "description" | "is_standard_role" | "modified_at" | "name" | "permissions" | "permissions.allowed_guest_invites" | "permissions.assign_roles" | "permissions.create_and_edit_ai_automations" | "permissions.create_and_edit_ai_teammates" | "permissions.create_app_authorization" | "permissions.create_global_custom_fields" | "permissions.create_pat_authorization" | "permissions.create_team" | "permissions.download_mobile_attachments" | "permissions.export_project_data" | "permissions.import_data" | "permissions.manage_roles" | "permissions.proactive_ai" | "permissions.share_goal_with_domain" | "permissions.share_portfolios_with_org" | "permissions.standard_ai" | "permissions.task_deletion_policy" | "permissions.upload_attachments" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: RbacRoleResponse }>;

  /**
   * Delete a role
   */
  deleteRole: (input: {
    /** Globally unique identifier for the role. */
    role_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Trigger a rule
   */
  triggerRule: (input: {
    data?: RuleTriggerRequest;
    /** The ID of the incoming web request trigger. This value is a path parameter that is automatically generated for the API endpoint. */
    rule_trigger_gid: string;
  }) => Promise<{ data?: RuleTriggerResponse }>;

  /**
   * Get a section
   */
  getSection: (input: {
    /** The globally unique identifier for the section. */
    section_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "name" | "project" | "project.name" | "projects" | "projects.name")[];
  }) => Promise<{ data?: SectionResponse }>;

  /**
   * Update a section
   */
  updateSection: (input: {
    data?: SectionRequest;
    /** The globally unique identifier for the section. */
    section_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "name" | "project" | "project.name" | "projects" | "projects.name")[];
  }) => Promise<{ data?: SectionResponse }>;

  /**
   * Delete a section
   */
  deleteSection: (input: {
    /** The globally unique identifier for the section. */
    section_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get sections in a project
   */
  getSectionsForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "name" | "offset" | "path" | "project" | "project.name" | "projects" | "projects.name" | "uri")[];
  }) => Promise<{ data?: (SectionCompact)[]; next_page?: NextPage }>;

  /**
   * Create a section in a project
   */
  createSectionForProject: (input: {
    data?: SectionRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "name" | "project" | "project.name" | "projects" | "projects.name")[];
  }) => Promise<{ data?: SectionResponse }>;

  /**
   * Add task to section
   */
  addTaskForSection: (input: {
    data?: SectionTaskInsertRequest;
    /** The globally unique identifier for the section. */
    section_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Move or Insert sections
   */
  insertSectionForProject: (input: {
    data?: ProjectSectionInsertRequest;
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a status update
   */
  getStatus: (input: {
    /** The status update to get. */
    status_update_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("author" | "author.name" | "created_at" | "created_by" | "created_by.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "liked" | "likes" | "likes.user" | "likes.user.name" | "modified_at" | "num_hearts" | "num_likes" | "parent" | "parent.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "status_type" | "text" | "title")[];
  }) => Promise<{ data?: StatusUpdateResponse }>;

  /**
   * Delete a status update
   */
  deleteStatus: (input: {
    /** The status update to get. */
    status_update_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get status updates from an object
   */
  getStatusesForObject: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Globally unique identifier for object to fetch statuses from. Must be a GID for a project, portfolio, or goal. */
    parent: string;
    /** Only return statuses that have been created since the given time. */
    created_since?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("author" | "author.name" | "created_at" | "created_by" | "created_by.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "liked" | "likes" | "likes.user" | "likes.user.name" | "modified_at" | "num_hearts" | "num_likes" | "offset" | "parent" | "parent.name" | "path" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "status_type" | "text" | "title" | "uri")[];
  }) => Promise<{ data?: (StatusUpdateCompact)[]; next_page?: NextPage }>;

  /**
   * Create a status update
   */
  createStatusForObject: (input: {
    data?: StatusUpdateRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("author" | "author.name" | "created_at" | "created_by" | "created_by.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "liked" | "likes" | "likes.user" | "likes.user.name" | "modified_at" | "num_hearts" | "num_likes" | "parent" | "parent.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "status_type" | "text" | "title")[];
  }) => Promise<{ data?: StatusUpdateResponse }>;

  /**
   * Get a story
   */
  getStory: (input: {
    /** Globally unique identifier for the story. */
    story_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_at" | "created_by" | "created_by.name" | "custom_field" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.representation_type" | "custom_field.text_value" | "custom_field.type" | "dependency" | "dependency.created_by" | "dependency.name" | "dependency.resource_subtype" | "duplicate_of" | "duplicate_of.created_by" | "duplicate_of.name" | "duplicate_of.resource_subtype" | "duplicated_from" | "duplicated_from.created_by" | "duplicated_from.name" | "duplicated_from.resource_subtype" | "follower" | "follower.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "is_editable" | "is_edited" | "is_pinned" | "liked" | "likes" | "likes.user" | "likes.user.name" | "new_approval_status" | "new_date_value" | "new_dates" | "new_dates.due_at" | "new_dates.due_on" | "new_dates.start_on" | "new_enum_value" | "new_enum_value.color" | "new_enum_value.enabled" | "new_enum_value.name" | "new_multi_enum_values" | "new_multi_enum_values.color" | "new_multi_enum_values.enabled" | "new_multi_enum_values.name" | "new_name" | "new_number_value" | "new_people_value" | "new_people_value.name" | "new_resource_subtype" | "new_section" | "new_section.name" | "new_text_value" | "num_hearts" | "num_likes" | "old_approval_status" | "old_date_value" | "old_dates" | "old_dates.due_at" | "old_dates.due_on" | "old_dates.start_on" | "old_enum_value" | "old_enum_value.color" | "old_enum_value.enabled" | "old_enum_value.name" | "old_multi_enum_values" | "old_multi_enum_values.color" | "old_multi_enum_values.enabled" | "old_multi_enum_values.name" | "old_name" | "old_number_value" | "old_people_value" | "old_people_value.name" | "old_resource_subtype" | "old_section" | "old_section.name" | "old_text_value" | "previews" | "previews.fallback" | "previews.footer" | "previews.header" | "previews.header_link" | "previews.html_text" | "previews.text" | "previews.title" | "previews.title_link" | "project" | "project.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "source" | "sticker_name" | "story" | "story.created_at" | "story.created_by" | "story.created_by.name" | "story.resource_subtype" | "story.text" | "tag" | "tag.name" | "target" | "target.created_by" | "target.name" | "target.resource_subtype" | "task" | "task.created_by" | "task.name" | "task.resource_subtype" | "text" | "type")[];
  }) => Promise<{ data?: StoryResponse }>;

  /**
   * Update a story
   */
  updateStory: (input: {
    data?: StoryRequest;
    /** Globally unique identifier for the story. */
    story_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_at" | "created_by" | "created_by.name" | "custom_field" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.representation_type" | "custom_field.text_value" | "custom_field.type" | "dependency" | "dependency.created_by" | "dependency.name" | "dependency.resource_subtype" | "duplicate_of" | "duplicate_of.created_by" | "duplicate_of.name" | "duplicate_of.resource_subtype" | "duplicated_from" | "duplicated_from.created_by" | "duplicated_from.name" | "duplicated_from.resource_subtype" | "follower" | "follower.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "is_editable" | "is_edited" | "is_pinned" | "liked" | "likes" | "likes.user" | "likes.user.name" | "new_approval_status" | "new_date_value" | "new_dates" | "new_dates.due_at" | "new_dates.due_on" | "new_dates.start_on" | "new_enum_value" | "new_enum_value.color" | "new_enum_value.enabled" | "new_enum_value.name" | "new_multi_enum_values" | "new_multi_enum_values.color" | "new_multi_enum_values.enabled" | "new_multi_enum_values.name" | "new_name" | "new_number_value" | "new_people_value" | "new_people_value.name" | "new_resource_subtype" | "new_section" | "new_section.name" | "new_text_value" | "num_hearts" | "num_likes" | "old_approval_status" | "old_date_value" | "old_dates" | "old_dates.due_at" | "old_dates.due_on" | "old_dates.start_on" | "old_enum_value" | "old_enum_value.color" | "old_enum_value.enabled" | "old_enum_value.name" | "old_multi_enum_values" | "old_multi_enum_values.color" | "old_multi_enum_values.enabled" | "old_multi_enum_values.name" | "old_name" | "old_number_value" | "old_people_value" | "old_people_value.name" | "old_resource_subtype" | "old_section" | "old_section.name" | "old_text_value" | "previews" | "previews.fallback" | "previews.footer" | "previews.header" | "previews.header_link" | "previews.html_text" | "previews.text" | "previews.title" | "previews.title_link" | "project" | "project.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "source" | "sticker_name" | "story" | "story.created_at" | "story.created_by" | "story.created_by.name" | "story.resource_subtype" | "story.text" | "tag" | "tag.name" | "target" | "target.created_by" | "target.name" | "target.resource_subtype" | "task" | "task.created_by" | "task.name" | "task.resource_subtype" | "text" | "type")[];
  }) => Promise<{ data?: StoryResponse }>;

  /**
   * Delete a story
   */
  deleteStory: (input: {
    /** Globally unique identifier for the story. */
    story_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get stories from a task
   */
  getStoriesForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_at" | "created_by" | "created_by.name" | "custom_field" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.representation_type" | "custom_field.text_value" | "custom_field.type" | "dependency" | "dependency.created_by" | "dependency.name" | "dependency.resource_subtype" | "duplicate_of" | "duplicate_of.created_by" | "duplicate_of.name" | "duplicate_of.resource_subtype" | "duplicated_from" | "duplicated_from.created_by" | "duplicated_from.name" | "duplicated_from.resource_subtype" | "follower" | "follower.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "is_editable" | "is_edited" | "is_pinned" | "liked" | "likes" | "likes.user" | "likes.user.name" | "new_approval_status" | "new_date_value" | "new_dates" | "new_dates.due_at" | "new_dates.due_on" | "new_dates.start_on" | "new_enum_value" | "new_enum_value.color" | "new_enum_value.enabled" | "new_enum_value.name" | "new_multi_enum_values" | "new_multi_enum_values.color" | "new_multi_enum_values.enabled" | "new_multi_enum_values.name" | "new_name" | "new_number_value" | "new_people_value" | "new_people_value.name" | "new_resource_subtype" | "new_section" | "new_section.name" | "new_text_value" | "num_hearts" | "num_likes" | "offset" | "old_approval_status" | "old_date_value" | "old_dates" | "old_dates.due_at" | "old_dates.due_on" | "old_dates.start_on" | "old_enum_value" | "old_enum_value.color" | "old_enum_value.enabled" | "old_enum_value.name" | "old_multi_enum_values" | "old_multi_enum_values.color" | "old_multi_enum_values.enabled" | "old_multi_enum_values.name" | "old_name" | "old_number_value" | "old_people_value" | "old_people_value.name" | "old_resource_subtype" | "old_section" | "old_section.name" | "old_text_value" | "path" | "previews" | "previews.fallback" | "previews.footer" | "previews.header" | "previews.header_link" | "previews.html_text" | "previews.text" | "previews.title" | "previews.title_link" | "project" | "project.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "source" | "sticker_name" | "story" | "story.created_at" | "story.created_by" | "story.created_by.name" | "story.resource_subtype" | "story.text" | "tag" | "tag.name" | "target" | "target.created_by" | "target.name" | "target.resource_subtype" | "task" | "task.created_by" | "task.name" | "task.resource_subtype" | "text" | "type" | "uri")[];
  }) => Promise<{ data?: (StoryCompact)[]; next_page?: NextPage }>;

  /**
   * Create a story on a task
   */
  createStoryForTask: (input: {
    data?: StoryRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_at" | "created_by" | "created_by.name" | "custom_field" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.representation_type" | "custom_field.text_value" | "custom_field.type" | "dependency" | "dependency.created_by" | "dependency.name" | "dependency.resource_subtype" | "duplicate_of" | "duplicate_of.created_by" | "duplicate_of.name" | "duplicate_of.resource_subtype" | "duplicated_from" | "duplicated_from.created_by" | "duplicated_from.name" | "duplicated_from.resource_subtype" | "follower" | "follower.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "is_editable" | "is_edited" | "is_pinned" | "liked" | "likes" | "likes.user" | "likes.user.name" | "new_approval_status" | "new_date_value" | "new_dates" | "new_dates.due_at" | "new_dates.due_on" | "new_dates.start_on" | "new_enum_value" | "new_enum_value.color" | "new_enum_value.enabled" | "new_enum_value.name" | "new_multi_enum_values" | "new_multi_enum_values.color" | "new_multi_enum_values.enabled" | "new_multi_enum_values.name" | "new_name" | "new_number_value" | "new_people_value" | "new_people_value.name" | "new_resource_subtype" | "new_section" | "new_section.name" | "new_text_value" | "num_hearts" | "num_likes" | "old_approval_status" | "old_date_value" | "old_dates" | "old_dates.due_at" | "old_dates.due_on" | "old_dates.start_on" | "old_enum_value" | "old_enum_value.color" | "old_enum_value.enabled" | "old_enum_value.name" | "old_multi_enum_values" | "old_multi_enum_values.color" | "old_multi_enum_values.enabled" | "old_multi_enum_values.name" | "old_name" | "old_number_value" | "old_people_value" | "old_people_value.name" | "old_resource_subtype" | "old_section" | "old_section.name" | "old_text_value" | "previews" | "previews.fallback" | "previews.footer" | "previews.header" | "previews.header_link" | "previews.html_text" | "previews.text" | "previews.title" | "previews.title_link" | "project" | "project.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "source" | "sticker_name" | "story" | "story.created_at" | "story.created_by" | "story.created_by.name" | "story.resource_subtype" | "story.text" | "tag" | "tag.name" | "target" | "target.created_by" | "target.name" | "target.resource_subtype" | "task" | "task.created_by" | "task.name" | "task.resource_subtype" | "text" | "type")[];
  }) => Promise<{ data?: StoryResponse }>;

  /**
   * Get stories from a goal
   */
  getStoriesForGoal: (input: {
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_at" | "created_by" | "created_by.name" | "custom_field" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.representation_type" | "custom_field.text_value" | "custom_field.type" | "dependency" | "dependency.created_by" | "dependency.name" | "dependency.resource_subtype" | "duplicate_of" | "duplicate_of.created_by" | "duplicate_of.name" | "duplicate_of.resource_subtype" | "duplicated_from" | "duplicated_from.created_by" | "duplicated_from.name" | "duplicated_from.resource_subtype" | "follower" | "follower.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "is_editable" | "is_edited" | "is_pinned" | "liked" | "likes" | "likes.user" | "likes.user.name" | "new_approval_status" | "new_date_value" | "new_dates" | "new_dates.due_at" | "new_dates.due_on" | "new_dates.start_on" | "new_enum_value" | "new_enum_value.color" | "new_enum_value.enabled" | "new_enum_value.name" | "new_multi_enum_values" | "new_multi_enum_values.color" | "new_multi_enum_values.enabled" | "new_multi_enum_values.name" | "new_name" | "new_number_value" | "new_people_value" | "new_people_value.name" | "new_resource_subtype" | "new_section" | "new_section.name" | "new_text_value" | "num_hearts" | "num_likes" | "offset" | "old_approval_status" | "old_date_value" | "old_dates" | "old_dates.due_at" | "old_dates.due_on" | "old_dates.start_on" | "old_enum_value" | "old_enum_value.color" | "old_enum_value.enabled" | "old_enum_value.name" | "old_multi_enum_values" | "old_multi_enum_values.color" | "old_multi_enum_values.enabled" | "old_multi_enum_values.name" | "old_name" | "old_number_value" | "old_people_value" | "old_people_value.name" | "old_resource_subtype" | "old_section" | "old_section.name" | "old_text_value" | "path" | "previews" | "previews.fallback" | "previews.footer" | "previews.header" | "previews.header_link" | "previews.html_text" | "previews.text" | "previews.title" | "previews.title_link" | "project" | "project.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "source" | "sticker_name" | "story" | "story.created_at" | "story.created_by" | "story.created_by.name" | "story.resource_subtype" | "story.text" | "tag" | "tag.name" | "target" | "target.created_by" | "target.name" | "target.resource_subtype" | "task" | "task.created_by" | "task.name" | "task.resource_subtype" | "text" | "type" | "uri")[];
  }) => Promise<{ data?: (StoryCompact)[]; next_page?: NextPage }>;

  /**
   * Create a story on a goal
   */
  createStoryForGoal: (input: {
    data?: StoryRequest;
    /** Globally unique identifier for the goal. */
    goal_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("assignee" | "assignee.name" | "created_at" | "created_by" | "created_by.name" | "custom_field" | "custom_field.date_value" | "custom_field.date_value.date" | "custom_field.date_value.date_time" | "custom_field.display_value" | "custom_field.enabled" | "custom_field.enum_options" | "custom_field.enum_options.color" | "custom_field.enum_options.enabled" | "custom_field.enum_options.name" | "custom_field.enum_value" | "custom_field.enum_value.color" | "custom_field.enum_value.enabled" | "custom_field.enum_value.name" | "custom_field.id_prefix" | "custom_field.input_restrictions" | "custom_field.is_formula_field" | "custom_field.multi_enum_values" | "custom_field.multi_enum_values.color" | "custom_field.multi_enum_values.enabled" | "custom_field.multi_enum_values.name" | "custom_field.name" | "custom_field.number_value" | "custom_field.representation_type" | "custom_field.text_value" | "custom_field.type" | "dependency" | "dependency.created_by" | "dependency.name" | "dependency.resource_subtype" | "duplicate_of" | "duplicate_of.created_by" | "duplicate_of.name" | "duplicate_of.resource_subtype" | "duplicated_from" | "duplicated_from.created_by" | "duplicated_from.name" | "duplicated_from.resource_subtype" | "follower" | "follower.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_text" | "is_editable" | "is_edited" | "is_pinned" | "liked" | "likes" | "likes.user" | "likes.user.name" | "new_approval_status" | "new_date_value" | "new_dates" | "new_dates.due_at" | "new_dates.due_on" | "new_dates.start_on" | "new_enum_value" | "new_enum_value.color" | "new_enum_value.enabled" | "new_enum_value.name" | "new_multi_enum_values" | "new_multi_enum_values.color" | "new_multi_enum_values.enabled" | "new_multi_enum_values.name" | "new_name" | "new_number_value" | "new_people_value" | "new_people_value.name" | "new_resource_subtype" | "new_section" | "new_section.name" | "new_text_value" | "num_hearts" | "num_likes" | "old_approval_status" | "old_date_value" | "old_dates" | "old_dates.due_at" | "old_dates.due_on" | "old_dates.start_on" | "old_enum_value" | "old_enum_value.color" | "old_enum_value.enabled" | "old_enum_value.name" | "old_multi_enum_values" | "old_multi_enum_values.color" | "old_multi_enum_values.enabled" | "old_multi_enum_values.name" | "old_name" | "old_number_value" | "old_people_value" | "old_people_value.name" | "old_resource_subtype" | "old_section" | "old_section.name" | "old_text_value" | "previews" | "previews.fallback" | "previews.footer" | "previews.header" | "previews.header_link" | "previews.html_text" | "previews.text" | "previews.title" | "previews.title_link" | "project" | "project.name" | "reaction_summary" | "reaction_summary.count" | "reaction_summary.emoji_base" | "reaction_summary.reacted" | "reaction_summary.variant" | "resource_subtype" | "source" | "sticker_name" | "story" | "story.created_at" | "story.created_by" | "story.created_by.name" | "story.resource_subtype" | "story.text" | "tag" | "tag.name" | "target" | "target.created_by" | "target.name" | "target.resource_subtype" | "task" | "task.created_by" | "task.name" | "task.resource_subtype" | "text" | "type")[];
  }) => Promise<{ data?: StoryResponse }>;

  /**
   * Get multiple tags
   */
  getTags: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The workspace to filter tags on. */
    workspace?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "offset" | "path" | "permalink_url" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TagCompact)[]; next_page?: NextPage }>;

  /**
   * Create a tag
   */
  createTag: (input: {
    data?: TagCreateRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "permalink_url" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TagResponse }>;

  /**
   * Get a tag
   */
  getTag: (input: {
    /** Globally unique identifier for the tag. */
    tag_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "permalink_url" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TagResponse }>;

  /**
   * Update a tag
   */
  updateTag: (input: {
    data?: TagUpdateRequest;
    /** Globally unique identifier for the tag. */
    tag_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "permalink_url" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TagResponse }>;

  /**
   * Delete a tag
   */
  deleteTag: (input: {
    /** Globally unique identifier for the tag. */
    tag_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a task's tags
   */
  getTagsForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "offset" | "path" | "permalink_url" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TagCompact)[]; next_page?: NextPage }>;

  /**
   * Get tags in a workspace
   */
  getTagsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "offset" | "path" | "permalink_url" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TagCompact)[]; next_page?: NextPage }>;

  /**
   * Create a tag in a workspace
   */
  createTagForWorkspace: (input: {
    data?: TagCreateTagForWorkspaceRequest;
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "created_at" | "followers" | "followers.name" | "name" | "notes" | "permalink_url" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TagResponse }>;

  /**
   * Get multiple task templates
   */
  getTaskTemplates: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The project to filter task templates on. */
    project?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "created_by" | "name" | "project" | "template")[];
  }) => Promise<{ data?: (TaskTemplateCompact)[] }>;

  /**
   * Get a task template
   */
  getTaskTemplate: (input: {
    /** Globally unique identifier for the task template. */
    task_template_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "created_by" | "name" | "project" | "template")[];
  }) => Promise<{ data?: TaskTemplateResponse }>;

  /**
   * Delete a task template
   */
  deleteTaskTemplate: (input: {
    /** Globally unique identifier for the task template. */
    task_template_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Instantiate a task from a task template
   */
  instantiateTask: (input: {
    data?: TaskTemplateInstantiateTaskRequest;
    /** Globally unique identifier for the task template. */
    task_template_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get multiple tasks
   */
  getTasks: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The assignee to filter tasks on. If searching for unassigned tasks, assignee.any = null can be specified. *Note: If you specify `assignee`, you must also specify the `workspace` to filter on.* */
    assignee?: string;
    /** The project to filter tasks on. */
    project?: string;
    /** The section to filter tasks on. */
    section?: string;
    /** The workspace to filter tasks on. *Note: If you specify `workspace`, you must also specify the `assignee` to filter on.* */
    workspace?: string;
    /** Only return tasks that are either incomplete or that have been completed since this time. */
    completed_since?: string;
    /** Only return tasks that have been modified since the given time.  *Note: A task is considered “modified” if any of its properties change, or associations between it and other objects are modified (e.g.  a task being added to a project). A task is not considered modified just because another object it is associated with (e.g. a subtask) is modified. Actions that count as modifying the task include assigning, renaming, completing, and adding stories.* */
    modified_since?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Create a task
   */
  createTask: (input: {
    data?: TaskCreateRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Get a task
   */
  getTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Update a task
   */
  updateTask: (input: {
    data?: TaskUpdateRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Delete a task
   */
  deleteTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Duplicate a task
   */
  duplicateTask: (input: {
    data?: TaskDuplicateRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("new_graph_export" | "new_graph_export.completed_at" | "new_graph_export.created_at" | "new_graph_export.download_url" | "new_portfolio" | "new_portfolio.name" | "new_project" | "new_project.name" | "new_project_template" | "new_project_template.name" | "new_resource_export" | "new_resource_export.completed_at" | "new_resource_export.created_at" | "new_resource_export.download_url" | "new_task" | "new_task.created_by" | "new_task.name" | "new_task.resource_subtype" | "resource_subtype" | "status")[];
  }) => Promise<{ data?: JobResponse }>;

  /**
   * Get tasks from a project
   */
  getTasksForProject: (input: {
    /** Globally unique identifier for the project. */
    project_gid: string;
    /** Only return tasks that are either incomplete or that have been completed since this time. Accepts a date-time string or the keyword *now*.  */
    completed_since?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Get tasks from a section
   */
  getTasksForSection: (input: {
    /** The globally unique identifier for the section. */
    section_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Only return tasks that are either incomplete or that have been completed since this time. Accepts a date-time string or the keyword *now*.  */
    completed_since?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Get tasks from a tag
   */
  getTasksForTag: (input: {
    /** Globally unique identifier for the tag. */
    tag_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Get tasks from a user task list
   */
  getTasksForUserTaskList: (input: {
    /** Globally unique identifier for the user task list. */
    user_task_list_gid: string;
    /** Only return tasks that are either incomplete or that have been completed since this time. Accepts a date-time string or the keyword *now*.  */
    completed_since?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Get subtasks from a task
   */
  getSubtasksForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Create a subtask
   */
  createSubtaskForTask: (input: {
    data?: TaskCreateRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Set the parent of a task
   */
  setParentForTask: (input: {
    data?: TaskSetParentRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Get dependencies from a task
   */
  getDependenciesForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Set dependencies for a task
   */
  addDependenciesForTask: (input: {
    data?: ModifyDependenciesRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Unlink dependencies from a task
   */
  removeDependenciesForTask: (input: {
    data?: ModifyDependenciesRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get dependents from a task
   */
  getDependentsForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "offset" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "path" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "uri" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[]; next_page?: NextPage }>;

  /**
   * Set dependents for a task
   */
  addDependentsForTask: (input: {
    data?: ModifyDependentsRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Unlink dependents from a task
   */
  removeDependentsForTask: (input: {
    data?: ModifyDependentsRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Add a project to a task
   */
  addProjectForTask: (input: {
    data?: TaskAddProjectRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Remove a project from a task
   */
  removeProjectForTask: (input: {
    data?: TaskRemoveProjectRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Add a tag to a task
   */
  addTagForTask: (input: {
    data?: TaskAddTagRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Remove a tag from a task
   */
  removeTagForTask: (input: {
    data?: TaskRemoveTagRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Add followers to a task
   */
  addFollowersForTask: (input: {
    data?: TaskAddFollowersRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Remove followers from a task
   */
  removeFollowerForTask: (input: {
    data?: TaskRemoveFollowersRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Get a task for a given custom ID
   */
  getTaskForCustomId: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Generated custom ID for a task. */
    custom_id: string;
  }) => Promise<{ data?: TaskResponse }>;

  /**
   * Search tasks in a workspace
   */
  searchTasksForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Performs full-text search on both task name and description */
    text?: string;
    /** Filters results by the task's resource_subtype */
    resource_subtype?: "default_task" | "milestone" | "approval" | "custom";
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "assignee.any"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "assignee.not"?: string;
    /** Comma-separated list of portfolio IDs */
    "portfolios.any"?: string;
    /** Comma-separated list of project IDs */
    "projects.any"?: string;
    /** Comma-separated list of project IDs */
    "projects.not"?: string;
    /** Comma-separated list of project IDs */
    "projects.all"?: string;
    /** Comma-separated list of section or column IDs */
    "sections.any"?: string;
    /** Comma-separated list of section or column IDs */
    "sections.not"?: string;
    /** Comma-separated list of section or column IDs */
    "sections.all"?: string;
    /** Comma-separated list of tag IDs */
    "tags.any"?: string;
    /** Comma-separated list of tag IDs */
    "tags.not"?: string;
    /** Comma-separated list of tag IDs */
    "tags.all"?: string;
    /** Comma-separated list of team IDs */
    "teams.any"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "followers.any"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "followers.not"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "created_by.any"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "created_by.not"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "assigned_by.any"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "assigned_by.not"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "liked_by.not"?: string;
    /** Comma-separated list of user identifiers. This can either be the string "me", an email, or the gid of a user. */
    "commented_on_by.not"?: string;
    /** ISO 8601 date string */
    "due_on.before"?: string;
    /** ISO 8601 date string */
    "due_on.after"?: string;
    /** ISO 8601 date string or `null` */
    due_on?: string | null;
    /** ISO 8601 datetime string */
    "due_at.before"?: string;
    /** ISO 8601 datetime string */
    "due_at.after"?: string;
    /** ISO 8601 date string */
    "start_on.before"?: string;
    /** ISO 8601 date string */
    "start_on.after"?: string;
    /** ISO 8601 date string or `null` */
    start_on?: string | null;
    /** ISO 8601 date string */
    "created_on.before"?: string;
    /** ISO 8601 date string */
    "created_on.after"?: string;
    /** ISO 8601 date string or `null` */
    created_on?: string | null;
    /** ISO 8601 datetime string */
    "created_at.before"?: string;
    /** ISO 8601 datetime string */
    "created_at.after"?: string;
    /** ISO 8601 date string */
    "completed_on.before"?: string;
    /** ISO 8601 date string */
    "completed_on.after"?: string;
    /** ISO 8601 date string or `null` */
    completed_on?: string | null;
    /** ISO 8601 datetime string */
    "completed_at.before"?: string;
    /** ISO 8601 datetime string */
    "completed_at.after"?: string;
    /** ISO 8601 date string */
    "modified_on.before"?: string;
    /** ISO 8601 date string */
    "modified_on.after"?: string;
    /** ISO 8601 date string or `null` */
    modified_on?: string | null;
    /** ISO 8601 datetime string */
    "modified_at.before"?: string;
    /** ISO 8601 datetime string */
    "modified_at.after"?: string;
    /** Filter to incomplete tasks with dependents */
    is_blocking?: boolean;
    /** Filter to tasks with incomplete dependencies */
    is_blocked?: boolean;
    /** Filter to tasks with attachments */
    has_attachment?: boolean;
    /** Filter to completed tasks */
    completed?: boolean;
    /** Filter to subtasks */
    is_subtask?: boolean;
    /** One of `due_date`, `created_at`, `completed_at`, `likes`, or `modified_at`, defaults to `modified_at` */
    sort_by?: "due_date" | "created_at" | "completed_at" | "likes" | "modified_at";
    /** Default `false` */
    sort_ascending?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("actual_time_minutes" | "approval_status" | "assigned_by" | "assigned_by.name" | "assignee" | "assignee.name" | "assignee_section" | "assignee_section.name" | "assignee_status" | "completed" | "completed_at" | "completed_by" | "completed_by.name" | "created_at" | "created_by" | "custom_fields" | "custom_fields.asana_created_field" | "custom_fields.created_by" | "custom_fields.created_by.name" | "custom_fields.currency_code" | "custom_fields.custom_label" | "custom_fields.custom_label_position" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.default_access_level" | "custom_fields.description" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.format" | "custom_fields.has_notifications_enabled" | "custom_fields.html_text_value" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.is_global_to_workspace" | "custom_fields.is_value_read_only" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.people_value" | "custom_fields.people_value.name" | "custom_fields.precision" | "custom_fields.privacy_setting" | "custom_fields.reference_value" | "custom_fields.reference_value.name" | "custom_fields.representation_type" | "custom_fields.resource_subtype" | "custom_fields.text_value" | "custom_fields.type" | "custom_type" | "custom_type.name" | "custom_type_status_option" | "custom_type_status_option.name" | "dependencies" | "dependents" | "due_at" | "due_on" | "external" | "external.data" | "followers" | "followers.name" | "hearted" | "hearts" | "hearts.user" | "hearts.user.name" | "html_notes" | "is_rendered_as_separator" | "liked" | "likes" | "likes.user" | "likes.user.name" | "memberships" | "memberships.project" | "memberships.project.name" | "memberships.section" | "memberships.section.name" | "modified_at" | "name" | "notes" | "num_hearts" | "num_likes" | "num_subtasks" | "parent" | "parent.created_by" | "parent.name" | "parent.resource_subtype" | "permalink_url" | "projects" | "projects.name" | "resource_subtype" | "start_at" | "start_on" | "tags" | "tags.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TaskCompact)[] }>;

  /**
   * Get a team membership
   */
  getTeamMembership: (input: {
    team_membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("is_admin" | "is_guest" | "is_limited_access" | "team" | "team.name" | "user" | "user.name")[];
  }) => Promise<{ data?: TeamMembershipResponse }>;

  /**
   * Get team memberships
   */
  getTeamMemberships: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Globally unique identifier for the team. */
    team?: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. This parameter must be used with the workspace parameter. */
    user?: string;
    /** Globally unique identifier for the workspace. This parameter must be used with the user parameter. */
    workspace?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("is_admin" | "is_guest" | "is_limited_access" | "offset" | "path" | "team" | "team.name" | "uri" | "user" | "user.name")[];
  }) => Promise<{ data?: (TeamMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get memberships from a team
   */
  getTeamMembershipsForTeam: (input: {
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("is_admin" | "is_guest" | "is_limited_access" | "offset" | "path" | "team" | "team.name" | "uri" | "user" | "user.name")[];
  }) => Promise<{ data?: (TeamMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get memberships from a user
   */
  getTeamMembershipsForUser: (input: {
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** Globally unique identifier for the workspace. */
    workspace: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("is_admin" | "is_guest" | "is_limited_access" | "offset" | "path" | "team" | "team.name" | "uri" | "user" | "user.name")[];
  }) => Promise<{ data?: (TeamMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Create a team
   */
  createTeam: (input: {
    data?: TeamRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "description" | "edit_team_name_or_description_access_level" | "edit_team_visibility_or_trash_team_access_level" | "endorsed" | "guest_invite_management_access_level" | "html_description" | "join_request_management_access_level" | "member_invite_management_access_level" | "name" | "organization" | "organization.name" | "permalink_url" | "team_content_management_access_level" | "team_member_removal_access_level" | "visibility")[];
  }) => Promise<{ data?: TeamResponse }>;

  /**
   * Get a team
   */
  getTeam: (input: {
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "description" | "edit_team_name_or_description_access_level" | "edit_team_visibility_or_trash_team_access_level" | "endorsed" | "guest_invite_management_access_level" | "html_description" | "join_request_management_access_level" | "member_invite_management_access_level" | "name" | "organization" | "organization.name" | "permalink_url" | "team_content_management_access_level" | "team_member_removal_access_level" | "visibility")[];
  }) => Promise<{ data?: TeamResponse }>;

  /**
   * Update a team
   */
  updateTeam: (input: {
    data?: TeamRequest;
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "description" | "edit_team_name_or_description_access_level" | "edit_team_visibility_or_trash_team_access_level" | "endorsed" | "guest_invite_management_access_level" | "html_description" | "join_request_management_access_level" | "member_invite_management_access_level" | "name" | "organization" | "organization.name" | "permalink_url" | "team_content_management_access_level" | "team_member_removal_access_level" | "visibility")[];
  }) => Promise<{ data?: TeamResponse }>;

  /**
   * Get teams in a workspace
   */
  getTeamsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "description" | "edit_team_name_or_description_access_level" | "edit_team_visibility_or_trash_team_access_level" | "endorsed" | "guest_invite_management_access_level" | "html_description" | "join_request_management_access_level" | "member_invite_management_access_level" | "name" | "offset" | "organization" | "organization.name" | "path" | "permalink_url" | "team_content_management_access_level" | "team_member_removal_access_level" | "uri" | "visibility")[];
  }) => Promise<{ data?: (TeamCompact)[]; next_page?: NextPage }>;

  /**
   * Get teams for a user
   */
  getTeamsForUser: (input: {
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The workspace or organization to filter teams on. */
    organization: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_field_settings" | "custom_field_settings.custom_field" | "custom_field_settings.custom_field.asana_created_field" | "custom_field_settings.custom_field.created_by" | "custom_field_settings.custom_field.created_by.name" | "custom_field_settings.custom_field.currency_code" | "custom_field_settings.custom_field.custom_label" | "custom_field_settings.custom_field.custom_label_position" | "custom_field_settings.custom_field.date_value" | "custom_field_settings.custom_field.date_value.date" | "custom_field_settings.custom_field.date_value.date_time" | "custom_field_settings.custom_field.default_access_level" | "custom_field_settings.custom_field.description" | "custom_field_settings.custom_field.display_value" | "custom_field_settings.custom_field.enabled" | "custom_field_settings.custom_field.enum_options" | "custom_field_settings.custom_field.enum_options.color" | "custom_field_settings.custom_field.enum_options.enabled" | "custom_field_settings.custom_field.enum_options.name" | "custom_field_settings.custom_field.enum_value" | "custom_field_settings.custom_field.enum_value.color" | "custom_field_settings.custom_field.enum_value.enabled" | "custom_field_settings.custom_field.enum_value.name" | "custom_field_settings.custom_field.format" | "custom_field_settings.custom_field.has_notifications_enabled" | "custom_field_settings.custom_field.html_text_value" | "custom_field_settings.custom_field.id_prefix" | "custom_field_settings.custom_field.input_restrictions" | "custom_field_settings.custom_field.is_formula_field" | "custom_field_settings.custom_field.is_global_to_workspace" | "custom_field_settings.custom_field.is_value_read_only" | "custom_field_settings.custom_field.multi_enum_values" | "custom_field_settings.custom_field.multi_enum_values.color" | "custom_field_settings.custom_field.multi_enum_values.enabled" | "custom_field_settings.custom_field.multi_enum_values.name" | "custom_field_settings.custom_field.name" | "custom_field_settings.custom_field.number_value" | "custom_field_settings.custom_field.people_value" | "custom_field_settings.custom_field.people_value.name" | "custom_field_settings.custom_field.precision" | "custom_field_settings.custom_field.privacy_setting" | "custom_field_settings.custom_field.reference_value" | "custom_field_settings.custom_field.reference_value.name" | "custom_field_settings.custom_field.representation_type" | "custom_field_settings.custom_field.resource_subtype" | "custom_field_settings.custom_field.text_value" | "custom_field_settings.custom_field.type" | "custom_field_settings.is_important" | "custom_field_settings.parent" | "custom_field_settings.parent.name" | "custom_field_settings.project" | "custom_field_settings.project.name" | "description" | "edit_team_name_or_description_access_level" | "edit_team_visibility_or_trash_team_access_level" | "endorsed" | "guest_invite_management_access_level" | "html_description" | "join_request_management_access_level" | "member_invite_management_access_level" | "name" | "offset" | "organization" | "organization.name" | "path" | "permalink_url" | "team_content_management_access_level" | "team_member_removal_access_level" | "uri" | "visibility")[];
  }) => Promise<{ data?: (TeamCompact)[]; next_page?: NextPage }>;

  /**
   * Add a user to a team
   */
  addUserForTeam: (input: {
    data?: TeamAddUserRequest;
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("is_admin" | "is_guest" | "is_limited_access" | "team" | "team.name" | "user" | "user.name")[];
  }) => Promise<{ data?: TeamMembershipResponse }>;

  /**
   * Remove a user from a team
   */
  removeUserForTeam: (input: {
    data?: TeamRemoveUserRequest;
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a time period
   */
  getTimePeriod: (input: {
    /** Globally unique identifier for the time period. */
    time_period_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("display_name" | "end_on" | "parent" | "parent.display_name" | "parent.end_on" | "parent.period" | "parent.start_on" | "period" | "start_on")[];
  }) => Promise<{ data?: TimePeriodResponse }>;

  /**
   * Get time periods
   */
  getTimePeriods: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** ISO 8601 date string */
    start_on?: string;
    /** ISO 8601 date string */
    end_on?: string;
    /** Globally unique identifier for the workspace. */
    workspace: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("display_name" | "end_on" | "offset" | "parent" | "parent.display_name" | "parent.end_on" | "parent.period" | "parent.start_on" | "path" | "period" | "start_on" | "uri")[];
  }) => Promise<{ data?: (TimePeriodCompact)[]; next_page?: NextPage }>;

  /**
   * Get a time tracking category
   */
  getTimeTrackingCategory: (input: {
    /** Globally unique identifier for the time tracking category. */
    time_tracking_category_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "is_archived" | "name")[];
  }) => Promise<{ data?: TimeTrackingCategoryResponse }>;

  /**
   * Update a time tracking category
   */
  updateTimeTrackingCategory: (input: {
    data?: TimeTrackingCategoryUpdateRequest;
    /** Globally unique identifier for the time tracking category. */
    time_tracking_category_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "is_archived" | "name")[];
  }) => Promise<{ data?: TimeTrackingCategoryResponse }>;

  /**
   * Delete a time tracking category
   */
  deleteTimeTrackingCategory: (input: {
    /** Globally unique identifier for the time tracking category. */
    time_tracking_category_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get time tracking entries for a time tracking category
   */
  getTimeTrackingEntriesForTimeTrackingCategory: (input: {
    /** Globally unique identifier for the time tracking category. */
    time_tracking_category_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** The start date for filtering time tracking entries by their entry date. */
    start_date?: string;
    /** The end date for filtering time tracking entries by their entry date. */
    end_date?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("attributable_to" | "attributable_to.name" | "categories" | "categories.color" | "categories.name" | "created_by" | "created_by.name" | "duration_minutes" | "entered_on" | "offset" | "path" | "uri")[];
  }) => Promise<{ data?: (TimeTrackingEntryCompact)[]; next_page?: NextPage }>;

  /**
   * Get time tracking categories for a workspace
   */
  getTimeTrackingCategories: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for the workspace. */
    workspace: string;
    /** Filter by archived status. If not provided, defaults to returning non-archived categories. */
    is_archived?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "is_archived" | "name" | "offset" | "path" | "uri")[];
  }) => Promise<{ data?: (TimeTrackingCategoryCompact)[]; next_page?: NextPage }>;

  /**
   * Create a time tracking category
   */
  createTimeTrackingCategory: (input: {
    data?: TimeTrackingCategoryCreateRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("color" | "is_archived" | "name")[];
  }) => Promise<{ data?: TimeTrackingCategoryResponse }>;

  /**
   * Get time tracking entries for a task
   */
  getTimeTrackingEntriesForTask: (input: {
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("attributable_to" | "attributable_to.name" | "categories" | "categories.color" | "categories.name" | "created_by" | "created_by.name" | "duration_minutes" | "entered_on" | "offset" | "path" | "uri")[];
  }) => Promise<{ data?: (TimeTrackingEntryCompact)[]; next_page?: NextPage }>;

  /**
   * Create a time tracking entry
   */
  createTimeTrackingEntry: (input: {
    data?: CreateTimeTrackingEntryRequest;
    /** The task to operate on. */
    task_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "attributable_to" | "attributable_to.name" | "billable_status" | "categories" | "categories.color" | "categories.name" | "created_at" | "created_by" | "created_by.name" | "description" | "duration_minutes" | "entered_on" | "task" | "task.created_by" | "task.name" | "task.resource_subtype")[];
  }) => Promise<{ data?: TimeTrackingEntryBase }>;

  /**
   * Get a time tracking entry
   */
  getTimeTrackingEntry: (input: {
    /** Globally unique identifier for the time tracking entry. */
    time_tracking_entry_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "attributable_to" | "attributable_to.name" | "billable_status" | "categories" | "categories.color" | "categories.name" | "created_at" | "created_by" | "created_by.name" | "description" | "duration_minutes" | "entered_on" | "task" | "task.created_by" | "task.name" | "task.resource_subtype")[];
  }) => Promise<{ data?: TimeTrackingEntryBase }>;

  /**
   * Update a time tracking entry
   */
  updateTimeTrackingEntry: (input: {
    data?: UpdateTimeTrackingEntryRequest;
    /** Globally unique identifier for the time tracking entry. */
    time_tracking_entry_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "attributable_to" | "attributable_to.name" | "billable_status" | "categories" | "categories.color" | "categories.name" | "created_at" | "created_by" | "created_by.name" | "description" | "duration_minutes" | "entered_on" | "task" | "task.created_by" | "task.name" | "task.resource_subtype")[];
  }) => Promise<{ data?: TimeTrackingEntryBase }>;

  /**
   * Delete a time tracking entry
   */
  deleteTimeTrackingEntry: (input: {
    /** Globally unique identifier for the time tracking entry. */
    time_tracking_entry_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get multiple time tracking entries
   */
  getTimeTrackingEntries: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for the task to filter time tracking entries by. */
    task?: string;
    /** Globally unique identifier for the project the time tracking entries are attributed to. */
    attributable_to?: string;
    /** Globally unique identifier for the portfolio to filter time tracking entries by. */
    portfolio?: string;
    /** Globally unique identifier for the user to filter time tracking entries by. */
    user?: string;
    /** Globally unique identifier for the workspace. At least one of `entered_on_start_date` or `entered_on_end_date` must be provided when filtering by workspace. */
    workspace?: string;
    /** The start date for filtering time tracking entries by when they were entered. */
    entered_on_start_date?: string;
    /** The end date for filtering time tracking entries by when they were entered. */
    entered_on_end_date?: string;
    /** Globally unique identifier for the timesheet approval status to filter time tracking entries by. */
    timesheet_approval_status?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("attributable_to" | "attributable_to.name" | "categories" | "categories.color" | "categories.name" | "created_by" | "created_by.name" | "duration_minutes" | "entered_on" | "offset" | "path" | "uri")[];
  }) => Promise<{ data?: (TimeTrackingEntryCompact)[]; next_page?: NextPage }>;

  /**
   * Get a timesheet approval status
   */
  getTimesheetApprovalStatus: (input: {
    /** Globally unique identifier for the timesheet approval status. */
    timesheet_approval_status_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "created_at" | "end_date" | "start_date" | "user" | "user.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TimesheetApprovalStatusResponse }>;

  /**
   * Update a timesheet approval status
   */
  updateTimesheetApprovalStatus: (input: {
    data?: UpdateTimesheetApprovalStatusRequest;
    /** Globally unique identifier for the timesheet approval status. */
    timesheet_approval_status_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "created_at" | "end_date" | "start_date" | "user" | "user.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TimesheetApprovalStatusResponse }>;

  /**
   * Get multiple timesheet approval statuses
   */
  getTimesheetApprovalStatuses: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Globally unique identifier for the workspace. */
    workspace: string;
    /** Globally unique identifier for the user to filter timesheet approval statuses by. */
    user?: string;
    /** The start date for filtering timesheet approval statuses. */
    from_date?: string;
    /** The end date for filtering timesheet approval statuses. */
    to_date?: string;
    /** Filter by approval status. Can be one or more of draft, submitted, approved, or rejected. */
    approval_statuses?: string;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "created_at" | "end_date" | "offset" | "path" | "start_date" | "uri" | "user" | "user.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (TimesheetApprovalStatusCompact)[]; next_page?: NextPage }>;

  /**
   * Create a timesheet approval status
   */
  createTimesheetApprovalStatus: (input: {
    data?: CreateTimesheetApprovalStatusRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("approval_status" | "created_at" | "end_date" | "start_date" | "user" | "user.name" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: TimesheetApprovalStatusResponse }>;

  /**
   * Get objects via typeahead
   */
  typeaheadForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** The type of values the typeahead should return. You can choose from one of the following: `actor`, `agent`, `custom_field`, `goal`, `project`, `project_template`, `portfolio`, `tag`, `task`, `team`, and `user`. Note that unlike in the names of endpoints, the types listed here are in singular form (e.g. `task`). Using multiple types is not yet supported. The `agent` type returns only agents, currently limited to AI Teammates, which are Asana's first-party agents. The `actor` type returns a combined set of users and agents. */
    resource_type: "actor" | "agent" | "custom_field" | "goal" | "project" | "project_template" | "portfolio" | "tag" | "task" | "team" | "user";
    /** *Deprecated: new integrations should prefer the resource_type field.* */
    type?: "custom_field" | "portfolio" | "project" | "tag" | "task" | "user";
    /** The string that will be used to search for relevant objects. If an empty string is passed in, the API will return results. */
    query?: string;
    /** The number of results to return. The default is 20 if this parameter is omitted, with a minimum of 1 and a maximum of 100. If there are fewer results found than requested, all will be returned. */
    count?: number;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("name")[];
  }) => Promise<{ data?: (AsanaNamedResource)[] }>;

  /**
   * Get a user task list
   */
  getUserTaskList: (input: {
    /** Globally unique identifier for the user task list. */
    user_task_list_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("name" | "owner" | "workspace")[];
  }) => Promise<{ data?: UserTaskListResponse }>;

  /**
   * Get a user's task list
   */
  getUserTaskListForUser: (input: {
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** The workspace in which to get the user task list. */
    workspace: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("name" | "owner" | "workspace")[];
  }) => Promise<{ data?: UserTaskListResponse }>;

  /**
   * Get multiple users
   */
  getUsers: (input: {
    /** The workspace or organization ID to filter users on. */
    workspace?: string;
    /** The team ID to filter users on. */
    team?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "offset" | "path" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "uri" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: (UserCompact)[]; next_page?: NextPage }>;

  /**
   * Get a user
   */
  getUser: (input: {
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** The workspace to filter results on. */
    workspace?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: UserResponse }>;

  /**
   * Update a user
   */
  updateUser: (input: {
    data?: UserUpdateRequest;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** The workspace to filter results on. */
    workspace?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: UserResponse }>;

  /**
   * Get a user's favorites
   */
  getFavoritesForUser: (input: {
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The resource type of favorites to be returned. */
    resource_type: "portfolio" | "project" | "tag" | "task" | "user" | "project_template";
    /** The workspace in which to get favorites. */
    workspace: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("name" | "offset" | "path" | "uri")[];
  }) => Promise<{ data?: (AsanaNamedResource)[]; next_page?: NextPage }>;

  /**
   * Get users in a team
   */
  getUsersForTeam: (input: {
    /** Globally unique identifier for the team. */
    team_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: (UserCompact)[] }>;

  /**
   * Get users in a workspace or organization
   */
  getUsersForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: (UserCompact)[] }>;

  /**
   * Get a user in a workspace or organization
   */
  getUserForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: UserResponse }>;

  /**
   * Update a user in a workspace or organization
   */
  updateUserForWorkspace: (input: {
    data?: UserUpdateRequest;
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("custom_fields" | "custom_fields.date_value" | "custom_fields.date_value.date" | "custom_fields.date_value.date_time" | "custom_fields.display_value" | "custom_fields.enabled" | "custom_fields.enum_options" | "custom_fields.enum_options.color" | "custom_fields.enum_options.enabled" | "custom_fields.enum_options.name" | "custom_fields.enum_value" | "custom_fields.enum_value.color" | "custom_fields.enum_value.enabled" | "custom_fields.enum_value.name" | "custom_fields.id_prefix" | "custom_fields.input_restrictions" | "custom_fields.is_formula_field" | "custom_fields.multi_enum_values" | "custom_fields.multi_enum_values.color" | "custom_fields.multi_enum_values.enabled" | "custom_fields.multi_enum_values.name" | "custom_fields.name" | "custom_fields.number_value" | "custom_fields.representation_type" | "custom_fields.text_value" | "custom_fields.type" | "email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60" | "workspaces" | "workspaces.name")[];
  }) => Promise<{ data?: UserResponse }>;

  /**
   * Get multiple webhooks
   */
  getWebhooks: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** The workspace to query for webhooks in. */
    workspace: string;
    /** Only return webhooks for the given resource. */
    resource?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("active" | "created_at" | "delivery_retry_count" | "failure_deletion_timestamp" | "filters" | "filters.action" | "filters.fields" | "filters.resource_subtype" | "last_failure_at" | "last_failure_content" | "last_success_at" | "next_attempt_after" | "offset" | "path" | "resource" | "resource.name" | "target" | "uri")[];
  }) => Promise<{ data?: (WebhookResponse)[]; next_page?: NextPage }>;

  /**
   * Establish a webhook
   */
  createWebhook: (input: {
    data?: WebhookRequest;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("active" | "created_at" | "delivery_retry_count" | "failure_deletion_timestamp" | "filters" | "filters.action" | "filters.fields" | "filters.resource_subtype" | "last_failure_at" | "last_failure_content" | "last_success_at" | "next_attempt_after" | "resource" | "resource.name" | "target")[];
  }) => Promise<{ data?: WebhookResponse; "X-Hook-Secret"?: string }>;

  /**
   * Get a webhook
   */
  getWebhook: (input: {
    /** Globally unique identifier for the webhook. */
    webhook_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("active" | "created_at" | "delivery_retry_count" | "failure_deletion_timestamp" | "filters" | "filters.action" | "filters.fields" | "filters.resource_subtype" | "last_failure_at" | "last_failure_content" | "last_success_at" | "next_attempt_after" | "resource" | "resource.name" | "target")[];
  }) => Promise<{ data?: WebhookResponse }>;

  /**
   * Update a webhook
   */
  updateWebhook: (input: {
    data?: WebhookUpdateRequest;
    /** Globally unique identifier for the webhook. */
    webhook_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("active" | "created_at" | "delivery_retry_count" | "failure_deletion_timestamp" | "filters" | "filters.action" | "filters.fields" | "filters.resource_subtype" | "last_failure_at" | "last_failure_content" | "last_success_at" | "next_attempt_after" | "resource" | "resource.name" | "target")[];
  }) => Promise<{ data?: WebhookResponse }>;

  /**
   * Delete a webhook
   */
  deleteWebhook: (input: {
    /** Globally unique identifier for the webhook. */
    webhook_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get a workspace membership
   */
  getWorkspaceMembership: (input: {
    workspace_membership_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_active" | "is_admin" | "is_guest" | "is_view_only" | "user" | "user.name" | "user_task_list" | "user_task_list.name" | "user_task_list.owner" | "user_task_list.workspace" | "vacation_dates" | "vacation_dates.end_on" | "vacation_dates.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: WorkspaceMembershipResponse }>;

  /**
   * Get workspace memberships for a user
   */
  getWorkspaceMembershipsForUser: (input: {
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_active" | "is_admin" | "is_guest" | "is_view_only" | "offset" | "path" | "uri" | "user" | "user.name" | "user_task_list" | "user_task_list.name" | "user_task_list.owner" | "user_task_list.workspace" | "vacation_dates" | "vacation_dates.end_on" | "vacation_dates.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (WorkspaceMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get the workspace memberships for a workspace
   */
  getWorkspaceMembershipsForWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** A string identifying a user. This can either be the string "me", an email, or the gid of a user. */
    user?: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("created_at" | "is_active" | "is_admin" | "is_guest" | "is_view_only" | "offset" | "path" | "uri" | "user" | "user.name" | "user_task_list" | "user_task_list.name" | "user_task_list.owner" | "user_task_list.workspace" | "vacation_dates" | "vacation_dates.end_on" | "vacation_dates.start_on" | "workspace" | "workspace.name")[];
  }) => Promise<{ data?: (WorkspaceMembershipCompact)[]; next_page?: NextPage }>;

  /**
   * Get multiple workspaces
   */
  getWorkspaces: (input: {
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** Results per page. The number of objects to return per page. The value must be between 1 and 100. */
    limit?: number;
    /** Offset token. An offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results. *Note: You can only pass in an offset that was returned to you via a previously paginated request.* */
    offset?: string;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("email_domains" | "is_organization" | "name" | "offset" | "path" | "uri")[];
  }) => Promise<{ data?: (WorkspaceCompact)[]; next_page?: NextPage }>;

  /**
   * Get a workspace
   */
  getWorkspace: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("email_domains" | "is_organization" | "name")[];
  }) => Promise<{ data?: WorkspaceResponse }>;

  /**
   * Update a workspace
   */
  updateWorkspace: (input: {
    data?: WorkspaceRequest;
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("email_domains" | "is_organization" | "name")[];
  }) => Promise<{ data?: WorkspaceResponse }>;

  /**
   * Add a user to a workspace or organization
   */
  addUserForWorkspace: (input: {
    data?: WorkspaceAddUserRequest;
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include. */
    opt_fields?: ("email" | "name" | "photo" | "photo.image_1024x1024" | "photo.image_128x128" | "photo.image_21x21" | "photo.image_27x27" | "photo.image_36x36" | "photo.image_60x60")[];
  }) => Promise<{ data?: UserBaseResponse }>;

  /**
   * Remove a user from a workspace or organization
   */
  removeUserForWorkspace: (input: {
    data?: WorkspaceRemoveUserRequest;
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
  }) => Promise<{ data?: EmptyResponse }>;

  /**
   * Get workspace events
   */
  getWorkspaceEvents: (input: {
    /** Globally unique identifier for the workspace or organization. */
    workspace_gid: string;
    /** Provides “pretty” output. Provides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging. */
    opt_pretty?: boolean;
    /** A sync token received from the last request, or none on first sync. Events will be returned from the point in time that the sync token was generated. *Note: On your first request, omit the sync token. The response will be the same as for an expired sync token, and will include a new valid sync token. If the sync token is too old (which may happen from time to time) the API will return a `412 Precondition Failed` error, and include a fresh sync token in the response.* */
    sync?: string;
  }) => Promise<{ data?: (EventResponse)[]; sync?: string; has_more?: boolean }>;
};

export * from "./schemas.js";
