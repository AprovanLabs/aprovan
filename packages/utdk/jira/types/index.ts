import type { AnnouncementBannerConfiguration, Application, ApplicationProperty, ApplicationRole, AssociationContextObject, Attachment, AttachmentArchiveImpl, AttachmentArchiveMetadataReadable, AttachmentMetadata, AttachmentSettings, AuditRecords, AutoCompleteSuggestions, AvailableDashboardGadgetsResponse, Avatar, AvatarUrlsBean, Avatars, BulkChangeOwnerDetails, BulkChangelogResponseBean, BulkEditGetFields, BulkEditShareableEntityResponse, BulkIssueIsWatching, BulkIssueResults, BulkOperationProgress, BulkPermissionGrants, BulkProjectPermissions, BulkTransitionGetAvailableTransitions, BulkTransitionSubmitInput, BulkWorklogKeyResponseBean, ChangedWorklogs, ColumnItem, Comment, ComponentIssuesCount, Configuration, ConnectCustomFieldValue, ConnectModule, ConnectModules, ContainerForProjectFeatures, ContainerForRegisteredWebhooks, ContainerOfWorkflowSchemeAssociations, ContextualConfiguration, ConvertedJqlQueries, CreateCrossProjectReleaseRequest, CreateCustomFieldContext, CreateCustomFieldRequest, CreateExclusionRulesRequest, CreateFieldAssociationSchemeResponse, CreateIssueSourceRequest, CreatePermissionRequest, CreateSchedulingRequest, CreatedIssue, CreatedIssues, CustomFieldContextDefaultValue, CustomFieldCreatedContextOptionsList, CustomFieldOption, CustomFieldOptionCreate, CustomFieldOptionUpdate, CustomFieldReplacement, CustomFieldUpdatedContextOptionsList, CustomFieldValueUpdate, CustomTemplateOptions, CustomTemplateRequestDto, CustomTemplatesProjectDetails, Dashboard, DashboardGadget, DashboardGadgetPosition, DashboardGadgetResponse, DataClassificationLevelsBean, DateRangeFilterRequest, DefaultLevelValue, DefaultShareScope, DefaultWorkflow, DefaultWorkflowEditorResponse, DeleteFieldAssociationSchemeResponse, DocumentVersion, EntityProperty, EntityPropertyDetails, ErrorCollection, ErrorMessage, ExportArchivedIssuesTaskProgressResponse, FailedWebhooks, FieldConfiguration, FieldConfigurationItem, FieldConfigurationScheme, FieldConfigurationToIssueTypeMapping, FieldDetails, FieldIdentifierObject, FieldSchemeToFieldsResponse, FieldSchemeToProjectsRequest, FieldSchemeToProjectsResponse, FieldUpdateOperation, Filter, FilterSubscriptionsList, ForgePanelProjectPinAsyncResponse, FoundGroups, FoundUsers, FoundUsersAndGroups, GetAtlassianTeamResponse, GetFieldAssociationParametersResponse, GetFieldAssociationSchemeByIdResponse, GetPlanOnlyTeamResponse, GetPlanResponse, Group, GroupName, HistoryMetadata, IssueArchivalSyncResponse, IssueBean, IssueCreateMetadata, IssueEntityPropertiesForMultiUpdate, IssueEvent, IssueFieldOption, IssueFieldOptionConfiguration, IssueFilterForBulkPropertySet, IssueLimitReportResponseBean, IssueLink, IssueLinkType, IssueLinkTypes, IssueMatches, IssuePickerSuggestions, IssueTransition, IssueTypeDetails, IssueTypeSchemeId, IssueTypeScreenSchemeId, IssueTypeScreenSchemeMapping, IssueTypeWithStatus, IssueTypeWorkflowMapping, IssueTypesWorkflowMapping, IssueUpdateDetails, IssueUpdateMetadata, JExpEvaluateJiraExpressionResultBean, JiraExpressionEvalContextBean, JiraExpressionEvaluateContextBean, JiraExpressionResult, JiraExpressionsAnalysis, JiraIssueFields, JiraStatus, JqlCountResultsBean, JqlFunctionPrecomputationGetByIdResponse, JqlFunctionPrecomputationUpdateBean, JqlFunctionPrecomputationUpdateResponse, JqlQueryToSanitize, JqlReferenceData, JsonNode, License, LicenseMetric, LinkedIssue, Locale, MappingsByIssueTypeOverride, MappingsByWorkflow, MinimalFieldSchemeToFieldsResponse, MultipartFile, MultipleCustomFieldValuesUpdate, NotificationRecipients, NotificationRecipientsRestrictions, NotificationScheme, NotificationSchemeEventDetails, NotificationSchemeId, OldToNewSecurityLevelMappingsBean, OperationMessage, PageBean2ComponentJsonBean, PageBean2FieldAssociationSchemeFieldSearchResult, PageBean2FieldAssociationSchemeProjectSearchResult, PageBean2GetFieldAssociationSchemeResponse, PageBean2GetProjectsWithFieldSchemesResponse, PageBean2JqlFunctionPrecomputationBean, PageBean2ProjectFieldBean, PageBeanBulkContextualConfiguration, PageBeanChangelog, PageBeanComment, PageBeanComponentWithIssueCount, PageBeanContext, PageBeanContextForProjectAndIssueType, PageBeanContextualConfiguration, PageBeanCustomFieldContext, PageBeanCustomFieldContextDefaultValue, PageBeanCustomFieldContextOption, PageBeanCustomFieldContextProjectMapping, PageBeanDashboard, PageBeanField, PageBeanFieldConfigurationDetails, PageBeanFieldConfigurationIssueTypeItem, PageBeanFieldConfigurationItem, PageBeanFieldConfigurationScheme, PageBeanFieldConfigurationSchemeProjects, PageBeanFieldProjectAssociation, PageBeanFilterDetails, PageBeanGroupDetails, PageBeanIssueFieldOption, PageBeanIssueSecurityLevelMember, PageBeanIssueSecuritySchemeToProjectMapping, PageBeanIssueTypeScheme, PageBeanIssueTypeSchemeMapping, PageBeanIssueTypeSchemeProjects, PageBeanIssueTypeScreenScheme, PageBeanIssueTypeScreenSchemeItem, PageBeanIssueTypeScreenSchemesProjects, PageBeanIssueTypeToContextMapping, PageBeanNotificationScheme, PageBeanNotificationSchemeAndProjectMappingJsonBean, PageBeanPriority, PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects, PageBeanPriorityWithSequence, PageBeanProject, PageBeanProjectDetails, PageBeanResolutionJsonBean, PageBeanScreen, PageBeanScreenScheme, PageBeanScreenWithTab, PageBeanSecurityLevel, PageBeanSecurityLevelMember, PageBeanSecuritySchemeWithProjects, PageBeanString, PageBeanUiModificationDetails, PageBeanUser, PageBeanUserDetails, PageBeanUserKey, PageBeanVersion, PageBeanWebhook, PageBeanWorkflow, PageBeanWorkflowScheme, PageBeanWorkflowTransitionRules, PageOfChangelogs, PageOfComments, PageOfCreateMetaIssueTypeWithField, PageOfCreateMetaIssueTypes, PageOfDashboards, PageOfStatuses, PageOfWorklogs, PageWithCursorGetPlanResponseForPage, PageWithCursorGetTeamResponseForPage, ParameterRemovalDetails, ParsedJqlQueries, PermissionDetails, PermissionGrant, PermissionGrants, PermissionHolder, PermissionScheme, PermissionSchemes, Permissions, PermittedProjects, Priority, PriorityId, PriorityMapping, PrioritySchemeId, Project, ProjectAndIssueTypePair, ProjectAvatars, ProjectCategory, ProjectComponent, ProjectDataPolicies, ProjectEmailAddress, ProjectIdentifiers, ProjectIssueSecurityLevels, ProjectIssueTypeHierarchy, ProjectIssueTypeMapping, ProjectPinAction, ProjectRole, ProjectRoleDetails, ProjectTemplateModel, ProjectType, PropertyKeys, RedactionJobStatusResponse, RemoteIssueLink, RemoteIssueLinkIdentifies, RemoteObject, RemoveFieldAssociationsRequestItem, Resolution, ResolutionId, SanitizedJqlQueries, SaveProjectTemplateRequest, SaveTemplateResponse, Scope, Screen, ScreenSchemeId, ScreenTypes, ScreenableField, ScreenableTab, SearchAndReconcileResults, SearchResults, SecurityLevel, SecurityScheme, SecuritySchemeId, SecuritySchemeLevelBean, SecuritySchemeLevelMemberBean, SecuritySchemes, ServerInformation, ServiceRegistry, SharePermission, SimpleLink, SimpleListWrapperApplicationRole, SimpleListWrapperGroupName, SingleRedactionRequest, StatusCategory, StatusCreate, StatusDetails, StatusMapping, StatusProjectIssueTypeUsageDto, StatusProjectUsageDto, StatusScope, StatusUpdate, StatusWorkflowUsageDto, StreamingResponseBody, StringList, SubmittedBulkOperation, SuggestedMappingsForPrioritiesRequestBean, SuggestedMappingsForProjectsRequestBean, SystemAvatars, TargetToSourcesMapping, TaskProgress, TaskProgressBeanObject, TaskProgressBeanRemoveOptionFromIssuesResult, TimeTrackingConfiguration, TimeTrackingProvider, Transitions, UiModificationContextDetails, UiModificationIdentifiers, UnrestrictedUserEmail, UpdateFieldAssociationSchemeResponse, UpdateFieldAssociationsRequestItem, UpdateFieldSchemeParametersRequest, UpdateFieldSchemeParametersResponse, UpdatePrioritiesInSchemeRequestBean, UpdatePrioritySchemeResponseBean, UpdateProjectsInSchemeRequestBean, UpdateScreenTypes, UpdatedProjectCategory, User, UserDetails, UserList, UserMigrationBean, ValidationOptionsForCreate, ValidationOptionsForUpdate, Version, VersionApprover, VersionIssueCounts, VersionIssuesStatus, VersionRelatedWork, VersionUnresolvedIssuesCount, Visibility, Votes, Watchers, WebhookDetails, WebhooksExpirationDate, WorkflowCapabilities, WorkflowCreate, WorkflowCreateRequest, WorkflowCreateResponse, WorkflowHistoryListResponseDto, WorkflowHistoryReadResponseDto, WorkflowPreviewResponse, WorkflowProjectIssueTypeUsageDto, WorkflowProjectUsageDto, WorkflowReadResponse, WorkflowRulesSearchDetails, WorkflowScheme, WorkflowSchemeAssociation, WorkflowSchemeProjectUsageDto, WorkflowSchemeReadResponse, WorkflowSchemeUpdateRequiredMappingsResponse, WorkflowSchemeUsageDto, WorkflowScope, WorkflowSearchResponse, WorkflowStatusUpdate, WorkflowTransitionProperty, WorkflowTransitionRules, WorkflowTransitionRulesDetails, WorkflowTransitionRulesUpdateErrors, WorkflowUpdate, WorkflowUpdateRequest, WorkflowUpdateResponse, WorkflowValidationErrorList, Worklog, WorklogCompositeKey, WorkspaceDataPolicy } from "./schemas.js";

export type JiraClient = {
  /**
   * Get announcement banner configuration
   */
  getBanner: () => Promise<AnnouncementBannerConfiguration>;

  /**
   * Update announcement banner configuration
   */
  setBanner: (input: {
    /** Flag indicating if the announcement banner can be dismissed by the user. */
    isDismissible?: boolean;
    /** Flag indicating if the announcement banner is enabled or not. */
    isEnabled?: boolean;
    /** The text on the announcement banner. */
    message?: string;
    /** Visibility of the announcement banner. Can be public or private. */
    visibility?: string;
  }) => Promise<unknown>;

  /**
   * Bulk get custom field configurations
   */
  getCustomFieldsConfigurations: (input: {
    /** List of IDs or keys of the custom fields. It can be a mix of IDs and keys in the same query. */
    fieldIdsOrKeys: (string)[];
    /** The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand: `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`. */
    id?: (number)[];
    /** The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`. */
    fieldContextId?: (number)[];
    /** The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`. */
    issueId?: number;
    /** The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with `issueId`. */
    projectKeyOrId?: string;
    /** The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with `issueId`. */
    issueTypeId?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanBulkContextualConfiguration>;

  /**
   * Update custom fields
   */
  updateMultipleCustomFieldValues: (input: {
    updates?: (MultipleCustomFieldValuesUpdate)[];
    /** Whether to generate a changelog for this update. */
    generateChangelog?: boolean;
    /** Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured webhooks (registered via the Jira admin UI). Note: Suppressing events means that "issue updated" events will not be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for the updated field, resulting in potentially confusing behaviour. We do not recommend using this flag in a Marketplace app as it may result in incompatibilities with other apps that depend on up-to-date issue data. */
    generateAppEvents?: boolean;
  }) => Promise<unknown>;

  /**
   * Get custom field configurations
   */
  getCustomFieldConfiguration: (input: {
    /** The ID or key of the custom field, for example `customfield_10000`. */
    fieldIdOrKey: string;
    /** The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand: `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`. */
    id?: (number)[];
    /** The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`. */
    fieldContextId?: (number)[];
    /** The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`. */
    issueId?: number;
    /** The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with `issueId`. */
    projectKeyOrId?: string;
    /** The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with `issueId`. */
    issueTypeId?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanContextualConfiguration>;

  /**
   * Update custom field configurations
   */
  updateCustomFieldConfiguration: (input: {
    /** The list of custom field configuration details. */
    configurations: (ContextualConfiguration)[];
    /** The ID or key of the custom field, for example `customfield_10000`. */
    fieldIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Update custom field value
   */
  updateCustomFieldValue: (input: {
    /** The list of custom field update details. */
    updates?: (CustomFieldValueUpdate)[];
    /** The ID or key of the custom field. For example, `customfield_10010`. */
    fieldIdOrKey: string;
    /** Whether to generate a changelog for this update. */
    generateChangelog?: boolean;
    /** Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured webhooks (registered via the Jira admin UI). Note: Suppressing events means that "issue updated" events will not be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for the updated field, resulting in potentially confusing behaviour. We do not recommend using this flag in a Marketplace app as it may result in incompatibilities with other apps that depend on up-to-date issue data. */
    generateAppEvents?: boolean;
  }) => Promise<unknown>;

  /**
   * Get application property
   */
  getApplicationProperty: (input: {
    /** The key of the application property. */
    key?: string;
    /** The permission level of all items being returned in the list. */
    permissionLevel?: string;
    /** When a `key` isn't provided, this filters the list of results by the application property `key` using a regular expression. For example, using `jira.lf.*` will return all application properties with keys that start with *jira.lf.*. */
    keyFilter?: string;
  }) => Promise<(ApplicationProperty)[]>;

  /**
   * Get advanced settings
   */
  getAdvancedSettings: () => Promise<(ApplicationProperty)[]>;

  /**
   * Set application property
   */
  setApplicationProperty: (input: {
    /** The ID of the application property. */
    id?: string;
    /** The new value. */
    value?: string;
  }, options: { params: { id: string } }) => Promise<ApplicationProperty>;

  /**
   * Get all application roles
   */
  getAllApplicationRoles: () => Promise<(ApplicationRole)[]>;

  /**
   * Get application role
   */
  getApplicationRole: (input: {
    /** The key of the application role. Use the [Get all application roles](#api-rest-api-3-applicationrole-get) operation to get the key for each application role. */
    key: string;
  }) => Promise<ApplicationRole>;

  /**
   * Get attachment content
   */
  getAttachmentContent: (input: {
    /** The ID of the attachment. */
    id: string;
    /** Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment. */
    redirect?: boolean;
  }) => Promise<unknown>;

  /**
   * Get Jira attachment settings
   */
  getAttachmentMeta: () => Promise<AttachmentSettings>;

  /**
   * Get attachment thumbnail
   */
  getAttachmentThumbnail: (input: {
    /** The ID of the attachment. */
    id: string;
    /** Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment. */
    redirect?: boolean;
    /** Whether a default thumbnail is returned when the requested thumbnail is not found. */
    fallbackToDefault?: boolean;
    /** The maximum width to scale the thumbnail to. */
    width?: number;
    /** The maximum height to scale the thumbnail to. */
    height?: number;
  }) => Promise<unknown>;

  /**
   * Delete attachment
   */
  removeAttachment: (input: {
    /** The ID of the attachment. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Get attachment metadata
   */
  getAttachment: (input: {
    /** The ID of the attachment. */
    id: string;
  }) => Promise<AttachmentMetadata>;

  /**
   * Get all metadata for an expanded attachment
   */
  expandAttachmentForHumans: (input: {
    /** The ID of the attachment. */
    id: string;
  }) => Promise<AttachmentArchiveMetadataReadable>;

  /**
   * Get contents metadata for an expanded attachment
   */
  expandAttachmentForMachines: (input: {
    /** The ID of the attachment. */
    id: string;
  }) => Promise<AttachmentArchiveImpl>;

  /**
   * Get audit records
   */
  getAuditRecords: (input: {
    /** The number of records to skip before returning the first result. */
    offset?: number;
    /** The maximum number of results to return. */
    limit?: number;
    /** The strings to match with audit field content, space separated. */
    filter?: string;
    /** The date and time on or after which returned audit records must have been created. If `to` is provided `from` must be before `to` or no audit records are returned. */
    from?: string;
    /** The date and time on or before which returned audit results must have been created. If `from` is provided `to` must be after `from` or no audit records are returned. */
    to?: string;
  }) => Promise<AuditRecords>;

  /**
   * Get system avatars by type
   */
  getAllSystemAvatars: (input: {
    /** The avatar type. */
    type: "issuetype" | "project" | "user" | "priority";
  }) => Promise<SystemAvatars>;

  /**
   * Bulk delete issues
   */
  submitBulkDelete: (input: {
    /** List of issue IDs or keys which are to be bulk deleted. These IDs or keys can be from different projects and issue types. */
    selectedIssueIdsOrKeys: (string)[];
    /** A boolean value that indicates whether to send a bulk change notification when the issues are being deleted.  If `true`, dispatches a bulk notification email to users about the updates. */
    sendBulkNotification?: boolean | null;
  }) => Promise<SubmittedBulkOperation>;

  /**
   * Get bulk editable fields
   */
  getBulkEditableFields: (input: {
    /** The IDs or keys of the issues to get editable fields from. */
    issueIdsOrKeys: string;
    /** (Optional)The text to search for in the editable fields. */
    searchText?: string;
    /** (Optional)The end cursor for use in pagination. */
    endingBefore?: string;
    /** (Optional)The start cursor for use in pagination. */
    startingAfter?: string;
  }) => Promise<BulkEditGetFields>;

  /**
   * Bulk edit issues
   */
  submitBulkEdit: (input: {
    /** An object that defines the values to be updated in specified fields of an issue. The structure and content of this parameter vary depending on the type of field being edited. Although the order is not significant, ensure that field IDs align with those in selectedActions. */
    editedFieldsInput: JiraIssueFields;
    /** List of all the field IDs that are to be bulk edited. Each field ID in this list corresponds to a specific attribute of an issue that is set to be modified in the bulk edit operation. The relevant field ID can be obtained by calling the Bulk Edit Get Fields REST API (documentation available on this page itself). */
    selectedActions: (string)[];
    /** List of issue IDs or keys which are to be bulk edited. These IDs or keys can be from different projects and issue types. */
    selectedIssueIdsOrKeys: (string)[];
    /** A boolean value that indicates whether to send a bulk change notification when the issues are being edited.  If `true`, dispatches a bulk notification email to users about the updates. */
    sendBulkNotification?: boolean | null;
  }) => Promise<SubmittedBulkOperation>;

  /**
   * Bulk move issues
   */
  submitBulkMove: (input: {
    /** A boolean value that indicates whether to send a bulk change notification when the issues are being moved.  If `true`, dispatches a bulk notification email to users about the updates. */
    sendBulkNotification?: boolean | null;
    /** An object representing the mapping of issues and data related to destination entities, like fields and statuses, that are required during a bulk move.  The key is a string that is created by concatenating the following three entities in order, separated by commas. The format is `<project ID or key>,<issueType ID>,<parent ID or key>`. It should be unique across mappings provided in the payload. If you provide multiple mappings for the same key, only one will be processed. However, the operation won't fail, so the error may be hard to track down.   *  ***Destination project*** (Required): ID or key of the project to which the issues are being moved.  *  ***Destination issueType*** (Required): ID of the issueType to which the issues are being moved.  *  ***Destination parent ID or key*** (Optional): ID or key of the issue which will become the parent of the issues being moved. Only required when the destination issueType is a subtask. */
    targetToSourcesMapping?: { [key: string]: TargetToSourcesMapping | undefined };
  }) => Promise<SubmittedBulkOperation>;

  /**
   * Get available transitions
   */
  getAvailableTransitions: (input: {
    /** Comma (,) separated Ids or keys of the issues to get transitions available for them. */
    issueIdsOrKeys: string;
    /** (Optional)The end cursor for use in pagination. */
    endingBefore?: string;
    /** (Optional)The start cursor for use in pagination. */
    startingAfter?: string;
  }) => Promise<BulkTransitionGetAvailableTransitions>;

  /**
   * Bulk transition issue statuses
   */
  submitBulkTransition: (input: {
    /** List of objects and each object has two properties:   *  Issues that will be bulk transitioned.  *  TransitionId that corresponds to a specific transition of issues that share the same workflow. */
    bulkTransitionInputs: (BulkTransitionSubmitInput)[];
    /** A boolean value that indicates whether to send a bulk change notification when the issues are being transitioned.  If `true`, dispatches a bulk notification email to users about the updates. */
    sendBulkNotification?: boolean | null;
  }) => Promise<SubmittedBulkOperation>;

  /**
   * Bulk unwatch issues
   */
  submitBulkUnwatch: (input: {
    /** List of issue IDs or keys which are to be bulk watched or unwatched. These IDs or keys can be from different projects and issue types. */
    selectedIssueIdsOrKeys: (string)[];
  }) => Promise<SubmittedBulkOperation>;

  /**
   * Bulk watch issues
   */
  submitBulkWatch: (input: {
    /** List of issue IDs or keys which are to be bulk watched or unwatched. These IDs or keys can be from different projects and issue types. */
    selectedIssueIdsOrKeys: (string)[];
  }) => Promise<SubmittedBulkOperation>;

  /**
   * Get bulk issue operation progress
   */
  getBulkOperationProgress: (input: {
    /** The ID of the task. */
    taskId: string;
  }) => Promise<BulkOperationProgress>;

  /**
   * Bulk fetch changelogs
   */
  getBulkChangelogs: (input: {
    /** List of field IDs to filter changelogs */
    fieldIds?: (string)[];
    /** List of issue IDs/keys to fetch changelogs for */
    issueIdsOrKeys: (string)[];
    /** The maximum number of items to return per page */
    maxResults?: number;
    /** The cursor for pagination */
    nextPageToken?: string;
  }) => Promise<BulkChangelogResponseBean>;

  /**
   * Get all classification levels
   */
  getAllUserDataClassificationLevels: (input: {
    /** Optional set of statuses to filter by. */
    status?: ("PUBLISHED" | "ARCHIVED" | "DRAFT")[];
    /** Ordering of the results by a given field. If not provided, values will not be sorted. */
    orderBy?: "rank" | "-rank" | "+rank";
  }) => Promise<DataClassificationLevelsBean>;

  /**
   * Get comments by IDs
   */
  getCommentsByIds: (input: {
    /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
    ids: (number)[];
    /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts a comma-separated list. Expand options include:   *  `renderedBody` Returns the comment body rendered in HTML.  *  `properties` Returns the comment's properties. */
    expand?: string;
  }) => Promise<PageBeanComment>;

  /**
   * Get comment property keys
   */
  getCommentPropertyKeys: (input: {
    /** The ID of the comment. */
    commentId: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete comment property
   */
  deleteCommentProperty: (input: {
    /** The ID of the comment. */
    commentId: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get comment property
   */
  getCommentProperty: (input: {
    /** The ID of the comment. */
    commentId: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set comment property
   */
  setCommentProperty: (input: {
    body: unknown;
    /** The ID of the comment. */
    commentId: string;
    /** The key of the property. The maximum length is 255 characters. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Find components for projects
   */
  findComponentsForProjects: (input: {
    /** The project IDs and/or project keys (case sensitive). */
    projectIdsOrKeys?: (string)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** [Order](#ordering) the results by a field:   *  `description` Sorts by the component description.  *  `name` Sorts by component name. */
    orderBy?: "description" | "-description" | "+description" | "name" | "-name" | "+name";
    /** Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive). */
    query?: string;
  }) => Promise<PageBean2ComponentJsonBean>;

  /**
   * Create component
   */
  createComponent: (input: {
    /** Compass component's ID. Can't be updated. Not required for creating a Project Component. */
    ari?: string;
    /** The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component. */
    assignee?: User;
    /** The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:   *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.  *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.  *  `UNASSIGNED` an assignee is not set for issues created with this component.  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.  Default value: `PROJECT_DEFAULT`.   Optional when creating or updating a component. */
    assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
    /** The description for the component. Optional when creating or updating a component. */
    description?: string;
    /** The unique identifier for the component. */
    id?: string;
    /** Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. */
    isAssigneeTypeValid?: boolean;
    /** The user details for the component's lead user. */
    lead?: User;
    /** The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    leadAccountId?: string;
    /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    leadUserName?: string;
    /** Compass component's metadata. Can't be updated. Not required for creating a Project Component. */
    metadata?: { [key: string]: string | undefined };
    /** The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters. */
    name?: string;
    /** The key of the project the component is assigned to. Required when creating a component. Can't be updated. */
    project?: string;
    /** The ID of the project the component is assigned to. */
    projectId?: number;
    /** The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. */
    realAssignee?: User;
    /** The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:   *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.  *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.  *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.  *  `PROJECT_DEFAULT` when none of the preceding cases are true. */
    realAssigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
    /** The URL of the component. */
    self?: string;
  }) => Promise<ProjectComponent>;

  /**
   * Delete component
   */
  deleteComponent: (input: {
    /** The ID of the component. */
    id: string;
    /** The ID of the component to replace the deleted component. If this value is null no replacement is made. */
    moveIssuesTo?: string;
  }) => Promise<unknown>;

  /**
   * Get component
   */
  getComponent: (input: {
    /** The ID of the component. */
    id: string;
  }) => Promise<ProjectComponent>;

  /**
   * Update component
   */
  updateComponent: (input: {
    /** Compass component's ID. Can't be updated. Not required for creating a Project Component. */
    ari?: string;
    /** The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component. */
    assignee?: User;
    /** The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:   *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.  *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.  *  `UNASSIGNED` an assignee is not set for issues created with this component.  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.  Default value: `PROJECT_DEFAULT`.   Optional when creating or updating a component. */
    assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
    /** The description for the component. Optional when creating or updating a component. */
    description?: string;
    /** The unique identifier for the component. */
    id?: string;
    /** Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. */
    isAssigneeTypeValid?: boolean;
    /** The user details for the component's lead user. */
    lead?: User;
    /** The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    leadAccountId?: string;
    /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    leadUserName?: string;
    /** Compass component's metadata. Can't be updated. Not required for creating a Project Component. */
    metadata?: { [key: string]: string | undefined };
    /** The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters. */
    name?: string;
    /** The key of the project the component is assigned to. Required when creating a component. Can't be updated. */
    project?: string;
    /** The ID of the project the component is assigned to. */
    projectId?: number;
    /** The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. */
    realAssignee?: User;
    /** The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:   *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.  *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.  *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.  *  `PROJECT_DEFAULT` when none of the preceding cases are true. */
    realAssigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
    /** The URL of the component. */
    self?: string;
  }, options: { params: { id: string } }) => Promise<ProjectComponent>;

  /**
   * Get component issues count
   */
  getComponentRelatedIssues: (input: {
    /** The ID of the component. */
    id: string;
  }) => Promise<ComponentIssuesCount>;

  /**
   * Get field schemes
   */
  getFieldAssociationSchemes: (input: {
    /** (optional) List of project IDs to filter schemes by. If not provided, schemes from all projects are returned. */
    projectId?: (number)[];
    /** (optional) Text filter for scheme name or description matching (case-insensitive). If not provided, no text filtering is applied. */
    query?: string;
    /** Zero-based index of the first item to return (default: 0) */
    startAt?: number;
    /** Maximum number of items to return per page (default: 50, max: 100) */
    maxResults?: number;
  }) => Promise<PageBean2GetFieldAssociationSchemeResponse>;

  /**
   * Create field scheme
   */
  createFieldAssociationScheme: (input: {
    /** Description of the scheme to be created */
    description?: string;
    /** The name of the scheme to be created */
    name: string;
  }) => Promise<CreateFieldAssociationSchemeResponse>;

  /**
   * Remove fields associated with field schemes
   */
  removeFieldsAssociatedWithSchemes: (input: {
    body: { [key: string]: RemoveFieldAssociationsRequestItem | undefined };
  }) => Promise<MinimalFieldSchemeToFieldsResponse>;

  /**
   * Update fields associated with field schemes
   */
  updateFieldsAssociatedWithSchemes: (input: {
    body: { [key: string]: (UpdateFieldAssociationsRequestItem)[] | undefined };
  }) => Promise<FieldSchemeToFieldsResponse>;

  /**
   * Remove field parameters
   */
  removeFieldAssociationSchemeItemParameters: (input: {
    body: { [key: string]: (ParameterRemovalDetails)[] | undefined };
  }) => Promise<unknown>;

  /**
   * Update field parameters
   */
  updateFieldAssociationSchemeItemParameters: (input: {
    body: { [key: string]: (UpdateFieldSchemeParametersRequest)[] | undefined };
  }) => Promise<UpdateFieldSchemeParametersResponse>;

  /**
   * Get projects with field schemes
   */
  getProjectsWithFieldSchemes: (input: {
    /** The starting index of the returned projects. Base index: 0. */
    startAt?: number;
    /** The maximum number of projects to return per page, maximum allowed value is 100. */
    maxResults?: number;
    /** List of project ids to filter the results by. */
    projectId: (number)[];
  }) => Promise<PageBean2GetProjectsWithFieldSchemesResponse>;

  /**
   * Associate projects to field schemes
   */
  associateProjectsToFieldAssociationSchemes: (input: {
    body: { [key: string]: FieldSchemeToProjectsRequest | undefined };
  }) => Promise<FieldSchemeToProjectsResponse>;

  /**
   * Delete a field scheme
   */
  deleteFieldAssociationScheme: (input: {
    /** The ID of the field association scheme to delete. */
    id: number;
  }) => Promise<DeleteFieldAssociationSchemeResponse>;

  /**
   * Get field scheme
   */
  getFieldAssociationSchemeById: (input: {
    /** The scheme id to fetch */
    id: number;
  }) => Promise<GetFieldAssociationSchemeByIdResponse>;

  /**
   * Update field scheme
   */
  updateFieldAssociationScheme: (input: {
    /** The description value to update */
    description?: string;
    /** The name value to update */
    name?: string;
    id: number;
  }) => Promise<UpdateFieldAssociationSchemeResponse>;

  /**
   * Clone field scheme
   */
  cloneFieldAssociationScheme: (input: {
    /** Description of the scheme to be created */
    description?: string;
    /** The name of the scheme to be created */
    name: string;
    /** The ID of the source field association scheme to clone from */
    id: number;
  }) => Promise<CreateFieldAssociationSchemeResponse>;

  /**
   * Search field scheme fields
   */
  searchFieldAssociationSchemeFields: (input: {
    /** The scheme ID to search for child fields */
    id: number;
    /** The starting index of the returned fields. Base index: 0. */
    startAt?: number;
    /** The maximum number of fields to return per page, maximum allowed value is 100. */
    maxResults?: number;
    /** The field IDs to filter by, if empty then all fields belonging to a field association scheme will be returned */
    fieldId?: (string)[];
  }) => Promise<PageBean2FieldAssociationSchemeFieldSearchResult>;

  /**
   * Get field parameters
   */
  getFieldAssociationSchemeItemParameters: (input: {
    /** the ID of the field association scheme to retrieve parameters for */
    id: number;
    /** the ID of the field */
    fieldId: string;
  }) => Promise<GetFieldAssociationParametersResponse>;

  /**
   * Search field scheme projects
   */
  searchFieldAssociationSchemeProjects: (input: {
    /** The scheme id to search for associated projects */
    id: number;
    /** The starting index of the returned projects. Base index: 0. */
    startAt?: number;
    /** The maximum number of projects to return per page, maximum allowed value is 100. */
    maxResults?: number;
    /** The project Ids to filter by, if empty then all projects belonging to a field association scheme will be returned */
    projectId?: (number)[];
  }) => Promise<PageBean2FieldAssociationSchemeProjectSearchResult>;

  /**
   * Get global settings
   */
  getConfiguration: () => Promise<Configuration>;

  /**
   * Get selected time tracking provider
   */
  getSelectedTimeTrackingImplementation: () => Promise<TimeTrackingProvider>;

  /**
   * Select time tracking provider
   */
  selectTimeTrackingImplementation: (input: {
    /** The key for the time tracking provider. For example, *JIRA*. */
    key: string;
    /** The name of the time tracking provider. For example, *JIRA provided time tracking*. */
    name?: string;
    /** The URL of the configuration page for the time tracking provider app. For example, *\/example/config/url*. This property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking provider app. */
    url?: string;
  }) => Promise<unknown>;

  /**
   * Get all time tracking providers
   */
  getAvailableTimeTrackingImplementations: () => Promise<(TimeTrackingProvider)[]>;

  /**
   * Get time tracking settings
   */
  getSharedTimeTrackingConfiguration: () => Promise<TimeTrackingConfiguration>;

  /**
   * Set time tracking settings
   */
  setSharedTimeTrackingConfiguration: (input: {
    /** The default unit of time applied to logged time. */
    defaultUnit: "minute" | "hour" | "day" | "week";
    /** The format that will appear on an issue's *Time Spent* field. */
    timeFormat: "pretty" | "days" | "hours";
    /** The number of days in a working week. */
    workingDaysPerWeek: number;
    /** The number of hours in a working day. */
    workingHoursPerDay: number;
  }) => Promise<TimeTrackingConfiguration>;

  /**
   * Get custom field option
   */
  getCustomFieldOption: (input: {
    /** The ID of the custom field option. */
    id: string;
  }) => Promise<CustomFieldOption>;

  /**
   * Get all dashboards
   */
  getAllDashboards: (input: {
    /** The filter applied to the list of dashboards. Valid values are:   *  `favourite` Returns dashboards the user has marked as favorite.  *  `my` Returns dashboards owned by the user. */
    filter?: "my" | "favourite";
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageOfDashboards>;

  /**
   * Create dashboard
   */
  createDashboard: (input: {
    /** The description of the dashboard. */
    description?: string;
    /** The edit permissions for the dashboard. */
    editPermissions: (SharePermission)[];
    /** The name of the dashboard. */
    name: string;
    /** The share permissions for the dashboard. */
    sharePermissions: (SharePermission)[];
    /** Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) */
    extendAdminPermissions?: boolean;
  }) => Promise<Dashboard>;

  /**
   * Bulk edit dashboards
   */
  bulkEditDashboards: (input: {
    /** Allowed action for bulk edit shareable entity */
    action: "changeOwner" | "changePermission" | "addPermission" | "removePermission";
    /** The details of change owner action. */
    changeOwnerDetails?: BulkChangeOwnerDetails;
    /** The id list of shareable entities to be changed. */
    entityIds: (number)[];
    /** Whether the actions are executed by users with Administer Jira global permission. */
    extendAdminPermissions?: boolean;
    /** The permission details to be changed. */
    permissionDetails?: PermissionDetails;
  }) => Promise<BulkEditShareableEntityResponse>;

  /**
   * Get available gadgets
   */
  getAllAvailableDashboardGadgets: () => Promise<AvailableDashboardGadgetsResponse>;

  /**
   * Search for dashboards
   */
  getDashboardsPaginated: (input: {
    /** String used to perform a case-insensitive partial match with `name`. */
    dashboardName?: string;
    /** User account ID used to return dashboards with the matching `owner.accountId`. This parameter cannot be used with the `owner` parameter. */
    accountId?: string;
    /** This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return dashboards with the matching `owner.name`. This parameter cannot be used with the `accountId` parameter. */
    owner?: string;
    /** As a group's name can change, use of `groupId` is recommended. Group name used to return dashboards that are shared with a group that matches `sharePermissions.group.name`. This parameter cannot be used with the `groupId` parameter. */
    groupname?: string;
    /** Group ID used to return dashboards that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter. */
    groupId?: string;
    /** Project ID used to returns dashboards that are shared with a project that matches `sharePermissions.project.id`. */
    projectId?: number;
    /** [Order](#ordering) the results by a field:   *  `description` Sorts by dashboard description. Note that this sort works independently of whether the expand to display the description field is in use.  *  `favourite_count` Sorts by dashboard popularity.  *  `id` Sorts by dashboard ID.  *  `is_favourite` Sorts by whether the dashboard is marked as a favorite.  *  `name` Sorts by dashboard name.  *  `owner` Sorts by dashboard owner name. */
    orderBy?: "description" | "-description" | "+description" | "favorite_count" | "-favorite_count" | "+favorite_count" | "id" | "-id" | "+id" | "is_favorite" | "-is_favorite" | "+is_favorite" | "name" | "-name" | "+name" | "owner" | "-owner" | "+owner";
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The status to filter by. It may be active, archived or deleted. */
    status?: "active" | "archived" | "deleted";
    /** Use [expand](#expansion) to include additional information about dashboard in the response. This parameter accepts a comma-separated list. Expand options include:   *  `description` Returns the description of the dashboard.  *  `owner` Returns the owner of the dashboard.  *  `viewUrl` Returns the URL that is used to view the dashboard.  *  `favourite` Returns `isFavourite`, an indicator of whether the user has set the dashboard as a favorite.  *  `favouritedCount` Returns `popularity`, a count of how many users have set this dashboard as a favorite.  *  `sharePermissions` Returns details of the share permissions defined for the dashboard.  *  `editPermissions` Returns details of the edit permissions defined for the dashboard.  *  `isWritable` Returns whether the current user has permission to edit the dashboard. */
    expand?: string;
  }) => Promise<PageBeanDashboard>;

  /**
   * Get gadgets
   */
  getAllGadgets: (input: {
    /** The ID of the dashboard. */
    dashboardId: number;
    /** The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand: `moduleKey=key:one&moduleKey=key:two`. */
    moduleKey?: (string)[];
    /** The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand: `uri=/rest/example/uri/1&uri=/rest/example/uri/2`. */
    uri?: (string)[];
    /** The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`. */
    gadgetId?: (number)[];
  }) => Promise<DashboardGadgetResponse>;

  /**
   * Add gadget to dashboard
   */
  addGadget: (input: {
    /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
    color?: string;
    /** Whether to ignore the validation of module key and URI. For example, when a gadget is created that is a part of an application that isn't installed. */
    ignoreUriAndModuleKeyValidation?: boolean;
    /** The module key of the gadget type. Can't be provided with `uri`. */
    moduleKey?: string;
    /** The position of the gadget. When the gadget is placed into the position, other gadgets in the same column are moved down to accommodate it. */
    position?: DashboardGadgetPosition;
    /** The title of the gadget. */
    title?: string;
    /** The URI of the gadget type. Can't be provided with `moduleKey`. */
    uri?: string;
    /** The ID of the dashboard. */
    dashboardId: number;
  }) => Promise<DashboardGadget>;

  /**
   * Remove gadget from dashboard
   */
  removeGadget: (input: {
    /** The ID of the dashboard. */
    dashboardId: number;
    /** The ID of the gadget. */
    gadgetId: number;
  }) => Promise<unknown>;

  /**
   * Update gadget on dashboard
   */
  updateGadget: (input: {
    /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
    color?: string;
    /** The position of the gadget. */
    position?: DashboardGadgetPosition;
    /** The title of the gadget. */
    title?: string;
    /** The ID of the dashboard. */
    dashboardId: number;
    /** The ID of the gadget. */
    gadgetId: number;
  }) => Promise<unknown>;

  /**
   * Get dashboard item property keys
   */
  getDashboardItemPropertyKeys: (input: {
    /** The ID of the dashboard. */
    dashboardId: string;
    /** The ID of the dashboard item. */
    itemId: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete dashboard item property
   */
  deleteDashboardItemProperty: (input: {
    /** The ID of the dashboard. */
    dashboardId: string;
    /** The ID of the dashboard item. */
    itemId: string;
    /** The key of the dashboard item property. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get dashboard item property
   */
  getDashboardItemProperty: (input: {
    /** The ID of the dashboard. */
    dashboardId: string;
    /** The ID of the dashboard item. */
    itemId: string;
    /** The key of the dashboard item property. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set dashboard item property
   */
  setDashboardItemProperty: (input: {
    body: unknown;
    /** The ID of the dashboard. */
    dashboardId: string;
    /** The ID of the dashboard item. */
    itemId: string;
    /** The key of the dashboard item property. The maximum length is 255 characters. For dashboard items with a spec URI and no complete module key, if the provided propertyKey is equal to "config", the request body's JSON must be an object with all keys and values as strings. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Delete dashboard
   */
  deleteDashboard: (input: {
    /** The ID of the dashboard. */
    id: string;
  }) => Promise<ErrorCollection>;

  /**
   * Get dashboard
   */
  getDashboard: (input: {
    /** The ID of the dashboard. */
    id: string;
  }) => Promise<Dashboard>;

  /**
   * Update dashboard
   */
  updateDashboard: (input: {
    /** The description of the dashboard. */
    description?: string;
    /** The edit permissions for the dashboard. */
    editPermissions: (SharePermission)[];
    /** The name of the dashboard. */
    name: string;
    /** The share permissions for the dashboard. */
    sharePermissions: (SharePermission)[];
    /** The ID of the dashboard to update. */
    id: string;
    /** Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) */
    extendAdminPermissions?: boolean;
  }) => Promise<Dashboard>;

  /**
   * Copy dashboard
   */
  copyDashboard: (input: {
    /** The description of the dashboard. */
    description?: string;
    /** The edit permissions for the dashboard. */
    editPermissions: (SharePermission)[];
    /** The name of the dashboard. */
    name: string;
    /** The share permissions for the dashboard. */
    sharePermissions: (SharePermission)[];
    id: string;
    /** Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) */
    extendAdminPermissions?: boolean;
  }) => Promise<Dashboard>;

  /**
   * Get data policy for the workspace
   */
  getPolicy: () => Promise<WorkspaceDataPolicy>;

  /**
   * Get data policy for projects
   */
  getPolicies: (input: {
    /** A list of project identifiers. This parameter accepts a comma-separated list. */
    ids?: string;
  }) => Promise<ProjectDataPolicies>;

  /**
   * Get events
   */
  getEvents: () => Promise<(IssueEvent)[]>;

  /**
   * Analyse Jira expression
   */
  analyseExpression: (input: {
    /** Context variables and their types. The type checker assumes that [common context variables](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables), such as `issue` or `project`, are available in context and sets their type. Use this property to override the default types or provide details of new variables. */
    contextVariables?: { [key: string]: string | undefined };
    /** The list of Jira expressions to analyse. */
    expressions: (string)[];
    /** The check to perform:   *  `syntax` Each expression's syntax is checked to ensure the expression can be parsed. Also, syntactic limits are validated. For example, the expression's length.  *  `type` EXPERIMENTAL. Each expression is type checked and the final type of the expression inferred. Any type errors that would result in the expression failure at runtime are reported. For example, accessing properties that don't exist or passing the wrong number of arguments to functions. Also performs the syntax check.  *  `complexity` EXPERIMENTAL. Determines the formulae for how many [expensive operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) each expression may execute. */
    check?: "syntax" | "type" | "complexity";
  }) => Promise<JiraExpressionsAnalysis>;

  /**
   * Currently being removed. Evaluate Jira expression
   */
  evaluateJiraExpression: (input: {
    /** The context in which the Jira expression is evaluated. */
    context?: JiraExpressionEvalContextBean;
    /** The Jira expression to evaluate. */
    expression: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the [complexity limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing and debugging your expressions. */
    expand?: string;
  }) => Promise<JiraExpressionResult>;

  /**
   * Evaluate Jira expression using enhanced search API
   */
  evaluateJsisJiraExpression: (input: {
    /** The context in which the Jira expression is evaluated. */
    context?: JiraExpressionEvaluateContextBean;
    /** The Jira expression to evaluate. */
    expression: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the [complexity limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing and debugging your expressions. */
    expand?: string;
  }) => Promise<JExpEvaluateJiraExpressionResultBean>;

  /**
   * Get fields
   */
  getFields: () => Promise<(FieldDetails)[]>;

  /**
   * Create custom field
   */
  createCustomField: (input: {
    /** The description of the custom field, which is displayed in Jira. */
    description?: string;
    /** The name of the custom field, which is displayed in Jira. This is not the unique identifier. */
    name: string;
    /** The searcher defines the way the field is searched in Jira. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher*.   The search UI (basic search and JQL search) will display different operations and values for the field, based on the field searcher. You must specify a searcher that is valid for the field type, as listed below (abbreviated values shown):   *  `cascadingselect`: `cascadingselectsearcher`  *  `datepicker`: `daterange`  *  `datetime`: `datetimerange`  *  `float`: `exactnumber` or `numberrange`  *  `grouppicker`: `grouppickersearcher`  *  `importid`: `exactnumber` or `numberrange`  *  `labels`: `labelsearcher`  *  `multicheckboxes`: `multiselectsearcher`  *  `multigrouppicker`: `multiselectsearcher`  *  `multiselect`: `multiselectsearcher`  *  `multiuserpicker`: `userpickergroupsearcher`  *  `multiversion`: `versionsearcher`  *  `project`: `projectsearcher`  *  `radiobuttons`: `multiselectsearcher`  *  `readonlyfield`: `textsearcher`  *  `select`: `multiselectsearcher`  *  `textarea`: `textsearcher`  *  `textfield`: `textsearcher`  *  `url`: `exacttextsearcher`  *  `userpicker`: `userpickergroupsearcher`  *  `version`: `versionsearcher`  If no searcher is provided, the field isn't searchable. However, [Forge custom fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-) have a searcher set automatically, so are always searchable. */
    searcherKey?: "com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:daterange" | "com.atlassian.jira.plugin.system.customfieldtypes:datetimerange" | "com.atlassian.jira.plugin.system.customfieldtypes:exactnumber" | "com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:numberrange" | "com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:textsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher";
    /** The type of the custom field. These built-in custom field types are available:   *  `cascadingselect`: Enables values to be selected from two levels of select lists (value: `com.atlassian.jira.plugin.system.customfieldtypes:cascadingselect`)  *  `datepicker`: Stores a date using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:datepicker`)  *  `datetime`: Stores a date with a time component (value: `com.atlassian.jira.plugin.system.customfieldtypes:datetime`)  *  `float`: Stores and validates a numeric (floating point) input (value: `com.atlassian.jira.plugin.system.customfieldtypes:float`)  *  `grouppicker`: Stores a user group using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:grouppicker`)  *  `importid`: A read-only field that stores the ID the issue had in the system it was imported from (value: `com.atlassian.jira.plugin.system.customfieldtypes:importid`)  *  `labels`: Stores labels (value: `com.atlassian.jira.plugin.system.customfieldtypes:labels`)  *  `multicheckboxes`: Stores multiple values using checkboxes (value: ``)  *  `multigrouppicker`: Stores multiple user groups using a picker control (value: ``)  *  `multiselect`: Stores multiple values using a select list (value: `com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes`)  *  `multiuserpicker`: Stores multiple users using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:multigrouppicker`)  *  `multiversion`: Stores multiple versions from the versions available in a project using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:multiversion`)  *  `project`: Stores a project from a list of projects that the user is permitted to view (value: `com.atlassian.jira.plugin.system.customfieldtypes:project`)  *  `radiobuttons`: Stores a value using radio buttons (value: `com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons`)  *  `readonlyfield`: Stores a read-only text value, which can only be populated via the API (value: `com.atlassian.jira.plugin.system.customfieldtypes:readonlyfield`)  *  `select`: Stores a value from a configurable list of options (value: `com.atlassian.jira.plugin.system.customfieldtypes:select`)  *  `textarea`: Stores a long text string using a multiline text area (value: `com.atlassian.jira.plugin.system.customfieldtypes:textarea`)  *  `textfield`: Stores a text string using a single-line text box (value: `com.atlassian.jira.plugin.system.customfieldtypes:textfield`)  *  `url`: Stores a URL (value: `com.atlassian.jira.plugin.system.customfieldtypes:url`)  *  `userpicker`: Stores a user using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:userpicker`)  *  `version`: Stores a version using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:version`)  To create a field based on a [Forge custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-), use the ID of the Forge custom field type as the value. For example, `ari:cloud:ecosystem::extension/e62f20a2-4b61-4dbe-bfb9-9a88b5e3ac84/548c5df1-24aa-4f7c-bbbb-3038d947cb05/static/my-cf-type-key`. */
    type: string;
  }) => Promise<FieldDetails>;

  /**
   * Remove associations
   */
  removeAssociations: (input: {
    /** Contexts to associate/unassociate the fields with. */
    associationContexts: (AssociationContextObject)[];
    /** Fields to associate/unassociate with projects. */
    fields: (FieldIdentifierObject)[];
  }) => Promise<unknown>;

  /**
   * Create associations
   */
  createAssociations: (input: {
    /** Contexts to associate/unassociate the fields with. */
    associationContexts: (AssociationContextObject)[];
    /** Fields to associate/unassociate with projects. */
    fields: (FieldIdentifierObject)[];
  }) => Promise<unknown>;

  /**
   * Get fields paginated
   */
  getFieldsPaginated: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The type of fields to search. */
    type?: ("custom" | "system")[];
    /** The IDs of the custom fields to return or, where `query` is specified, filter. */
    id?: (string)[];
    /** String used to perform a case-insensitive partial match with field names or descriptions. */
    query?: string;
    /** [Order](#ordering) the results by:   *  `contextsCount` sorts by the number of contexts related to a field  *  `lastUsed` sorts by the date when the value of the field last changed  *  `name` sorts by the field name  *  `screensCount` sorts by the number of screens related to a field */
    orderBy?: "contextsCount" | "-contextsCount" | "+contextsCount" | "lastUsed" | "-lastUsed" | "+lastUsed" | "name" | "-name" | "+name" | "screensCount" | "-screensCount" | "+screensCount" | "projectsCount" | "-projectsCount" | "+projectsCount";
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `key` returns the key for each field  *  `stableId` returns the stableId for each field  *  `lastUsed` returns the date when the value of the field last changed  *  `screensCount` returns the number of screens related to a field  *  `contextsCount` returns the number of contexts related to a field  *  `isLocked` returns information about whether the field is locked  *  `searcherKey` returns the searcher key for each custom field */
    expand?: string;
    /** The IDs of the projects to filter the fields by. Fields belonging to project Ids that the user does not have access to will not be returned */
    projectIds?: (number)[];
  }) => Promise<PageBeanField>;

  /**
   * Get fields in trash paginated
   */
  getTrashedFieldsPaginated: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    id?: (string)[];
    /** String used to perform a case-insensitive partial match with field names or descriptions. */
    query?: string;
    expand?: "name" | "-name" | "+name" | "trashDate" | "-trashDate" | "+trashDate" | "plannedDeletionDate" | "-plannedDeletionDate" | "+plannedDeletionDate" | "projectsCount" | "-projectsCount" | "+projectsCount";
    /** [Order](#ordering) the results by a field:   *  `name` sorts by the field name  *  `trashDate` sorts by the date the field was moved to the trash  *  `plannedDeletionDate` sorts by the planned deletion date */
    orderBy?: string;
  }) => Promise<PageBeanField>;

  /**
   * Update custom field
   */
  updateCustomField: (input: {
    /** The description of the custom field. The maximum length is 40000 characters. */
    description?: string;
    /** The name of the custom field. It doesn't have to be unique. The maximum length is 255 characters. */
    name?: string;
    /** The searcher that defines the way the field is searched in Jira. It can be set to `null`, otherwise you must specify the valid searcher for the field type, as listed below (abbreviated values shown):   *  `cascadingselect`: `cascadingselectsearcher`  *  `datepicker`: `daterange`  *  `datetime`: `datetimerange`  *  `float`: `exactnumber` or `numberrange`  *  `grouppicker`: `grouppickersearcher`  *  `importid`: `exactnumber` or `numberrange`  *  `labels`: `labelsearcher`  *  `multicheckboxes`: `multiselectsearcher`  *  `multigrouppicker`: `multiselectsearcher`  *  `multiselect`: `multiselectsearcher`  *  `multiuserpicker`: `userpickergroupsearcher`  *  `multiversion`: `versionsearcher`  *  `project`: `projectsearcher`  *  `radiobuttons`: `multiselectsearcher`  *  `readonlyfield`: `textsearcher`  *  `select`: `multiselectsearcher`  *  `textarea`: `textsearcher`  *  `textfield`: `textsearcher`  *  `url`: `exacttextsearcher`  *  `userpicker`: `userpickergroupsearcher`  *  `version`: `versionsearcher` */
    searcherKey?: "com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:daterange" | "com.atlassian.jira.plugin.system.customfieldtypes:datetimerange" | "com.atlassian.jira.plugin.system.customfieldtypes:exactnumber" | "com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:numberrange" | "com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:textsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher";
    /** The ID of the custom field. */
    fieldId: string;
  }) => Promise<unknown>;

  /**
   * Get field project associations
   */
  getFieldProjectAssociations: (input: {
    /** The ID of the field, for example `customfield_10000`. */
    fieldId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanFieldProjectAssociation>;

  /**
   * Get custom field contexts
   */
  getContextsForField: (input: {
    /** The ID of the custom field. */
    fieldId: string;
    /** Whether to return contexts that apply to all issue types. */
    isAnyIssueType?: boolean;
    /** Whether to return contexts that apply to all projects. */
    isGlobalContext?: boolean;
    /** The list of context IDs. To include multiple contexts, separate IDs with ampersand: `contextId=10000&contextId=10001`. */
    contextId?: (number)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanCustomFieldContext>;

  /**
   * Create custom field context
   */
  createCustomFieldContext: (input: {
    /** The description of the context. */
    description?: string;
    /** The ID of the context. */
    id?: string;
    /** The list of issue types IDs for the context. If the list is empty, the context refers to all issue types. */
    issueTypeIds?: (string)[];
    /** The name of the context. */
    name: string;
    /** The list of project IDs associated with the context. If the list is empty, the context is global. */
    projectIds?: (string)[];
    /** The ID of the custom field. */
    fieldId: string;
  }) => Promise<CreateCustomFieldContext>;

  /**
   * Get custom field contexts default values
   */
  getDefaultValues: (input: {
    /** The ID of the custom field, for example `customfield\_10000`. */
    fieldId: string;
    /** The IDs of the contexts. */
    contextId?: (number)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanCustomFieldContextDefaultValue>;

  /**
   * Set custom field contexts default values
   */
  setDefaultValues: (input: {
    defaultValues?: (CustomFieldContextDefaultValue)[];
    /** The ID of the custom field. */
    fieldId: string;
  }) => Promise<unknown>;

  /**
   * Get issue types for custom field context
   */
  getIssueTypeMappingsForContexts: (input: {
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. To include multiple contexts, provide an ampersand-separated list. For example, `contextId=10001&contextId=10002`. */
    contextId?: (number)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanIssueTypeToContextMapping>;

  /**
   * Get custom field contexts for projects and issue types
   */
  getCustomFieldContextsForProjectsAndIssueTypes: (input: {
    /** The project and issue type mappings. */
    mappings: (ProjectIssueTypeMapping)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanContextForProjectAndIssueType>;

  /**
   * Get project mappings for custom field context
   */
  getProjectContextMapping: (input: {
    /** The ID of the custom field, for example `customfield\_10000`. */
    fieldId: string;
    /** The list of context IDs. To include multiple context, separate IDs with ampersand: `contextId=10000&contextId=10001`. */
    contextId?: (number)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanCustomFieldContextProjectMapping>;

  /**
   * Delete custom field context
   */
  deleteCustomFieldContext: (input: {
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Update custom field context
   */
  updateCustomFieldContext: (input: {
    /** The description of the custom field context. The maximum length is 255 characters. */
    description?: string;
    /** The name of the custom field context. The name must be unique. The maximum length is 255 characters. */
    name?: string;
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Add issue types to context
   */
  addIssueTypesToContext: (input: {
    /** The list of issue type IDs. */
    issueTypeIds: (string)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Remove issue types from context
   */
  removeIssueTypesFromContext: (input: {
    /** The list of issue type IDs. */
    issueTypeIds: (string)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Get custom field options (context)
   */
  getOptionsForContext: (input: {
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
    /** The ID of the option. */
    optionId?: number;
    /** Whether only options are returned. */
    onlyOptions?: boolean;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanCustomFieldContextOption>;

  /**
   * Create custom field options (context)
   */
  createCustomFieldOption: (input: {
    /** Details of options to create. */
    options?: (CustomFieldOptionCreate)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<CustomFieldCreatedContextOptionsList>;

  /**
   * Update custom field options (context)
   */
  updateCustomFieldOption: (input: {
    /** Details of the options to update. */
    options?: (CustomFieldOptionUpdate)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<CustomFieldUpdatedContextOptionsList>;

  /**
   * Reorder custom field options (context)
   */
  reorderCustomFieldOptions: (input: {
    /** The ID of the custom field option or cascading option to place the moved options after. Required if `position` isn't provided. */
    after?: string;
    /** A list of IDs of custom field options to move. The order of the custom field option IDs in the list is the order they are given after the move. The list must contain custom field options or cascading options, but not both. */
    customFieldOptionIds: (string)[];
    /** The position the custom field options should be moved to. Required if `after` isn't provided. */
    position?: "First" | "Last";
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Delete custom field options (context)
   */
  deleteCustomFieldOption: (input: {
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context from which an option should be deleted. */
    contextId: number;
    /** The ID of the option to delete. */
    optionId: number;
  }) => Promise<unknown>;

  /**
   * Replace custom field options
   */
  replaceCustomFieldOption: (input: {
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the option to be deselected. */
    optionId: number;
    /** The ID of the context. */
    contextId: number;
    /** The ID of the option that will replace the currently selected option. */
    replaceWith?: number;
    /** A JQL query that specifies the issues to be updated. For example, *project=10000*. */
    jql?: string;
  }) => Promise<TaskProgressBeanRemoveOptionFromIssuesResult>;

  /**
   * Assign custom field context to projects
   */
  assignProjectsToCustomFieldContext: (input: {
    /** The IDs of projects. */
    projectIds: (string)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Remove custom field context from projects
   */
  removeCustomFieldContextFromProjects: (input: {
    /** The IDs of projects. */
    projectIds: (string)[];
    /** The ID of the custom field. */
    fieldId: string;
    /** The ID of the context. */
    contextId: number;
  }) => Promise<unknown>;

  /**
   * Get contexts for a field
   */
  getContextsForFieldDeprecated: (input: {
    /** The ID of the field to return contexts for. */
    fieldId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanContext>;

  /**
   * Get screens for a field
   */
  getScreensForField: (input: {
    /** The ID of the field to return screens for. */
    fieldId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Use [expand](#expansion) to include additional information about screens in the response. This parameter accepts `tab` which returns details about the screen tabs the field is used in. */
    expand?: string;
  }) => Promise<PageBeanScreenWithTab>;

  /**
   * Get all issue field options
   */
  getAllIssueFieldOptions: (input: {
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanIssueFieldOption>;

  /**
   * Create issue field option
   */
  createIssueFieldOption: (input: {
    config?: IssueFieldOptionConfiguration;
    /** The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/) are defined in the descriptor for the issue field module. */
    properties?: { [key: string]: unknown | undefined };
    /** The option's name, which is displayed in Jira. */
    value: string;
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    [key: string]: unknown;
  }) => Promise<IssueFieldOption>;

  /**
   * Get selectable issue field options
   */
  getSelectableIssueFieldOptions: (input: {
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Filters the results to options that are only available in the specified project. */
    projectId?: number;
  }) => Promise<PageBeanIssueFieldOption>;

  /**
   * Get visible issue field options
   */
  getVisibleIssueFieldOptions: (input: {
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Filters the results to options that are only available in the specified project. */
    projectId?: number;
  }) => Promise<PageBeanIssueFieldOption>;

  /**
   * Delete issue field option
   */
  deleteIssueFieldOption: (input: {
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The ID of the option to be deleted. */
    optionId: number;
  }) => Promise<unknown>;

  /**
   * Get issue field option
   */
  getIssueFieldOption: (input: {
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The ID of the option to be returned. */
    optionId: number;
  }) => Promise<IssueFieldOption>;

  /**
   * Update issue field option
   */
  updateIssueFieldOption: (input: {
    config?: IssueFieldOptionConfiguration;
    /** The unique identifier for the option. This is only unique within the select field's set of options. */
    id: number;
    /** The properties of the object, as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see [Issue Field Option Property Index](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)) are defined in the descriptor for the issue field module. */
    properties?: { [key: string]: unknown | undefined };
    /** The option's name, which is displayed in Jira. */
    value: string;
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The ID of the option to be updated. */
    optionId: number;
  }) => Promise<IssueFieldOption>;

  /**
   * Replace issue field option
   */
  replaceIssueFieldOption: (input: {
    /** The field key is specified in the following format: **$(app-key)\_\_$(field-key)**. For example, *example-add-on\_\_example-issue-field*. To determine the `fieldKey` value, do one of the following:   *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.  *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `"key": "teams-add-on__team-issue-field"` */
    fieldKey: string;
    /** The ID of the option to be deselected. */
    optionId: number;
    /** The ID of the option that will replace the currently selected option. */
    replaceWith?: number;
    /** A JQL query that specifies the issues to be updated. For example, *project=10000*. */
    jql?: string;
    /** Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with admin permission. */
    overrideScreenSecurity?: boolean;
    /** Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideEditableFlag?: boolean;
  }) => Promise<TaskProgressBeanRemoveOptionFromIssuesResult>;

  /**
   * Delete custom field
   */
  deleteCustomField: (input: {
    /** The ID of a custom field. */
    id: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Restore custom field from trash
   */
  restoreCustomField: (input: {
    /** The ID of a custom field. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Move custom field to trash
   */
  trashCustomField: (input: {
    /** The ID of a custom field. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Get all field configurations
   */
  getAllFieldConfigurations: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of field configuration IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
    id?: (number)[];
    /** If *true* returns default field configurations only. */
    isDefault?: boolean;
    /** The query string used to match against field configuration names and descriptions. */
    query?: string;
  }) => Promise<PageBeanFieldConfigurationDetails>;

  /**
   * Create field configuration
   */
  createFieldConfiguration: (input: {
    /** The description of the field configuration. */
    description?: string;
    /** The name of the field configuration. Must be unique. */
    name: string;
  }) => Promise<FieldConfiguration>;

  /**
   * Delete field configuration
   */
  deleteFieldConfiguration: (input: {
    /** The ID of the field configuration. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Update field configuration
   */
  updateFieldConfiguration: (input: {
    /** The description of the field configuration. */
    description?: string;
    /** The name of the field configuration. Must be unique. */
    name: string;
    /** The ID of the field configuration. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get field configuration items
   */
  getFieldConfigurationItems: (input: {
    /** The ID of the field configuration. */
    id: number;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanFieldConfigurationItem>;

  /**
   * Update field configuration items
   */
  updateFieldConfigurationItems: (input: {
    /** Details of fields in a field configuration. */
    fieldConfigurationItems: (FieldConfigurationItem)[];
    /** The ID of the field configuration. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get all field configuration schemes
   */
  getAllFieldConfigurationSchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of field configuration scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
    id?: (number)[];
  }) => Promise<PageBeanFieldConfigurationScheme>;

  /**
   * Create field configuration scheme
   */
  createFieldConfigurationScheme: (input: {
    /** The description of the field configuration scheme. */
    description?: string;
    /** The name of the field configuration scheme. The name must be unique. */
    name: string;
  }) => Promise<FieldConfigurationScheme>;

  /**
   * Get field configuration issue type items
   */
  getFieldConfigurationSchemeMappings: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of field configuration scheme IDs. To include multiple field configuration schemes separate IDs with ampersand: `fieldConfigurationSchemeId=10000&fieldConfigurationSchemeId=10001`. */
    fieldConfigurationSchemeId?: (number)[];
  }) => Promise<PageBeanFieldConfigurationIssueTypeItem>;

  /**
   * Get field configuration schemes for projects
   */
  getFieldConfigurationSchemeProjectMapping: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`. */
    projectId: (number)[];
  }) => Promise<PageBeanFieldConfigurationSchemeProjects>;

  /**
   * Assign field configuration scheme to project
   */
  assignFieldConfigurationSchemeToProject: (input: {
    /** The ID of the field configuration scheme. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme. */
    fieldConfigurationSchemeId?: string;
    /** The ID of the project. */
    projectId: string;
  }) => Promise<unknown>;

  /**
   * Delete field configuration scheme
   */
  deleteFieldConfigurationScheme: (input: {
    /** The ID of the field configuration scheme. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Update field configuration scheme
   */
  updateFieldConfigurationScheme: (input: {
    /** The description of the field configuration scheme. */
    description?: string;
    /** The name of the field configuration scheme. The name must be unique. */
    name: string;
    /** The ID of the field configuration scheme. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Assign issue types to field configurations
   */
  setFieldConfigurationSchemeMapping: (input: {
    /** Field configuration to issue type mappings. */
    mappings: (FieldConfigurationToIssueTypeMapping)[];
    /** The ID of the field configuration scheme. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Remove issue types from field configuration scheme
   */
  removeIssueTypesFromGlobalFieldConfigurationScheme: (input: {
    /** The list of issue type IDs. Must contain unique values not longer than 255 characters and not be empty. Maximum of 100 IDs. */
    issueTypeIds: (string)[];
    /** The ID of the field configuration scheme. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Create filter
   */
  createFilter: (input: {
    /** \[Experimental\] Approximate last used time. Returns the date and time when the filter was last used. Returns `null` if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in real time and therefore may not be exactly accurate. */
    approximateLastUsed?: string;
    /** A description of the filter. */
    description?: string;
    /** The groups and projects that can edit the filter. */
    editPermissions?: (SharePermission)[];
    /** Whether the filter is selected as a favorite. */
    favourite?: boolean;
    /** The count of how many users have selected this filter as a favorite, including the filter owner. */
    favouritedCount?: number;
    /** The unique identifier for the filter. */
    id?: string;
    /** The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*. */
    jql?: string;
    /** The name of the filter. Must be unique. */
    name: string;
    /** The user who owns the filter. This is defaulted to the creator of the filter, however Jira administrators can change the owner of a shared filter in the admin settings. */
    owner?: User;
    /** A URL to view the filter results in Jira, using the [Search for issues using JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string to return the filter results. For example, *https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*. */
    searchUrl?: string;
    /** The URL of the filter. */
    self?: string;
    /** The groups and projects that the filter is shared with. */
    sharePermissions?: (SharePermission)[];
    /** A paginated list of the users that the filter is shared with. This includes users that are members of the groups or can browse the projects that the filter is shared with. */
    sharedUsers?: UserList;
    /** A paginated list of the users that are subscribed to the filter. */
    subscriptions?: FilterSubscriptionsList;
    /** A URL to view the filter results in Jira, using the ID of the filter. For example, *https://your-domain.atlassian.net/issues/?filter=10100*. */
    viewUrl?: string;
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
    /** EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be created. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideSharePermissions?: boolean;
  }) => Promise<Filter>;

  /**
   * Get default share scope
   */
  getDefaultShareScope: () => Promise<DefaultShareScope>;

  /**
   * Set default share scope
   */
  setDefaultShareScope: (input: {
    /** The scope of the default sharing for new filters and dashboards:   *  `AUTHENTICATED` Shared with all logged-in users.  *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in the response.  *  `PRIVATE` Not shared with any users. */
    scope: "GLOBAL" | "AUTHENTICATED" | "PRIVATE";
  }) => Promise<DefaultShareScope>;

  /**
   * Get favorite filters
   */
  getFavouriteFilters: (input: {
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
  }) => Promise<(Filter)[]>;

  /**
   * Get my filters
   */
  getMyFilters: (input: {
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
    /** Include the user's favorite filters in the response. */
    includeFavourites?: boolean;
  }) => Promise<(Filter)[]>;

  /**
   * Search for filters
   */
  getFiltersPaginated: (input: {
    /** String used to perform a case-insensitive partial match with `name`. */
    filterName?: string;
    /** User account ID used to return filters with the matching `owner.accountId`. This parameter cannot be used with `owner`. */
    accountId?: string;
    /** This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return filters with the matching `owner.name`. This parameter cannot be used with `accountId`. */
    owner?: string;
    /** As a group's name can change, use of `groupId` is recommended to identify a group. Group name used to returns filters that are shared with a group that matches `sharePermissions.group.groupname`. This parameter cannot be used with the `groupId` parameter. */
    groupname?: string;
    /** Group ID used to returns filters that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter. */
    groupId?: string;
    /** Project ID used to returns filters that are shared with a project that matches `sharePermissions.project.id`. */
    projectId?: number;
    /** The list of filter IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Do not exceed 200 filter IDs. */
    id?: (number)[];
    /** [Order](#ordering) the results by a field:   *  `description` Sorts by filter description. Note that this sorting works independently of whether the expand to display the description field is in use.  *  `favourite_count` Sorts by the count of how many users have this filter as a favorite.  *  `is_favourite` Sorts by whether the filter is marked as a favorite.  *  `id` Sorts by filter ID.  *  `name` Sorts by filter name.  *  `owner` Sorts by the ID of the filter owner.  *  `is_shared` Sorts by whether the filter is shared. */
    orderBy?: "description" | "-description" | "+description" | "favourite_count" | "-favourite_count" | "+favourite_count" | "id" | "-id" | "+id" | "is_favourite" | "-is_favourite" | "+is_favourite" | "name" | "-name" | "+name" | "owner" | "-owner" | "+owner" | "is_shared" | "-is_shared" | "+is_shared";
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `description` Returns the description of the filter.  *  `favourite` Returns an indicator of whether the user has set the filter as a favorite.  *  `favouritedCount` Returns a count of how many users have set this filter as a favorite.  *  `jql` Returns the JQL query that the filter uses.  *  `owner` Returns the owner of the filter.  *  `searchUrl` Returns a URL to perform the filter's JQL query.  *  `sharePermissions` Returns the share permissions defined for the filter.  *  `editPermissions` Returns the edit permissions defined for the filter.  *  `isWritable` Returns whether the current user has permission to edit the filter.  *  `approximateLastUsed` \[Experimental\] Returns the approximate date and time when the filter was last evaluated.  *  `subscriptions` Returns the users that are subscribed to the filter.  *  `viewUrl` Returns a URL to view the filter. */
    expand?: string;
    /** EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideSharePermissions?: boolean;
    /** When `true` this will perform a case-insensitive substring match for the provided `filterName`. When `false` the filter name will be searched using [full text search syntax](https://support.atlassian.com/jira-software-cloud/docs/search-for-issues-using-the-text-field/). */
    isSubstringMatch?: boolean;
  }) => Promise<PageBeanFilterDetails>;

  /**
   * Delete filter
   */
  deleteFilter: (input: {
    /** The ID of the filter to delete. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get filter
   */
  getFilter: (input: {
    /** The ID of the filter to return. */
    id: number;
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
    /** EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideSharePermissions?: boolean;
  }) => Promise<Filter>;

  /**
   * Update filter
   */
  updateFilter: (input: {
    /** \[Experimental\] Approximate last used time. Returns the date and time when the filter was last used. Returns `null` if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in real time and therefore may not be exactly accurate. */
    approximateLastUsed?: string;
    /** A description of the filter. */
    description?: string;
    /** The groups and projects that can edit the filter. */
    editPermissions?: (SharePermission)[];
    /** Whether the filter is selected as a favorite. */
    favourite?: boolean;
    /** The count of how many users have selected this filter as a favorite, including the filter owner. */
    favouritedCount?: number;
    /** The unique identifier for the filter. */
    id?: string;
    /** The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*. */
    jql?: string;
    /** The name of the filter. Must be unique. */
    name: string;
    /** The user who owns the filter. This is defaulted to the creator of the filter, however Jira administrators can change the owner of a shared filter in the admin settings. */
    owner?: User;
    /** A URL to view the filter results in Jira, using the [Search for issues using JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string to return the filter results. For example, *https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*. */
    searchUrl?: string;
    /** The URL of the filter. */
    self?: string;
    /** The groups and projects that the filter is shared with. */
    sharePermissions?: (SharePermission)[];
    /** A paginated list of the users that the filter is shared with. This includes users that are members of the groups or can browse the projects that the filter is shared with. */
    sharedUsers?: UserList;
    /** A paginated list of the users that are subscribed to the filter. */
    subscriptions?: FilterSubscriptionsList;
    /** A URL to view the filter results in Jira, using the ID of the filter. For example, *https://your-domain.atlassian.net/issues/?filter=10100*. */
    viewUrl?: string;
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
    /** EXPERIMENTAL: Whether share permissions are overridden to enable the addition of any share permissions to filters. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideSharePermissions?: boolean;
  }, options: { params: { id: number } }) => Promise<Filter>;

  /**
   * Reset columns
   */
  resetColumns: (input: {
    /** The ID of the filter. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get columns
   */
  getColumns: (input: {
    /** The ID of the filter. */
    id: number;
  }) => Promise<(ColumnItem)[]>;

  /**
   * Set columns
   */
  setColumns: (input: {
    columns?: (string)[];
    /** The ID of the filter. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Remove filter as favorite
   */
  deleteFavouriteForFilter: (input: {
    /** The ID of the filter. */
    id: number;
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
  }) => Promise<Filter>;

  /**
   * Add filter as favorite
   */
  setFavouriteForFilter: (input: {
    /** The ID of the filter. */
    id: number;
    /** Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`. */
    expand?: string;
  }) => Promise<Filter>;

  /**
   * Change filter owner
   */
  changeFilterOwner: (input: {
    /** The account ID of the new owner. */
    accountId: string;
    /** The ID of the filter to update. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get share permissions
   */
  getSharePermissions: (input: {
    /** The ID of the filter. */
    id: number;
  }) => Promise<(SharePermission)[]>;

  /**
   * Add share permission
   */
  addSharePermission: (input: {
    /** The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user. */
    accountId?: string;
    /** The ID of the group, which uniquely identifies the group across all Atlassian products.For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. Cannot be provided with `groupname`. */
    groupId?: string;
    /** The name of the group to share the filter with. Set `type` to `group`. Please note that the name of a group is mutable, to reliably identify a group use `groupId`. */
    groupname?: string;
    /** The ID of the project to share the filter with. Set `type` to `project`. */
    projectId?: string;
    /** The ID of the project role to share the filter with. Set `type` to `projectRole` and the `projectId` for the project that the role is in. */
    projectRoleId?: string;
    /** The rights for the share permission. */
    rights?: number;
    /** The type of the share permission.Specify the type as follows:   *  `user` Share with a user.  *  `group` Share with a group. Specify `groupname` as well.  *  `project` Share with a project. Specify `projectId` as well.  *  `projectRole` Share with a project role in a project. Specify `projectId` and `projectRoleId` as well.  *  `global` Share globally, including anonymous users. If set, this type overrides all existing share permissions and must be deleted before any non-global share permissions is set.  *  `authenticated` Share with all logged-in users. This shows as `loggedin` in the response. If set, this type overrides all existing share permissions and must be deleted before any non-global share permissions is set. */
    type: "user" | "project" | "group" | "projectRole" | "global" | "authenticated";
    /** The ID of the filter. */
    id: number;
  }) => Promise<(SharePermission)[]>;

  /**
   * Delete share permission
   */
  deleteSharePermission: (input: {
    /** The ID of the filter. */
    id: number;
    /** The ID of the share permission. */
    permissionId: number;
  }) => Promise<unknown>;

  /**
   * Get share permission
   */
  getSharePermission: (input: {
    /** The ID of the filter. */
    id: number;
    /** The ID of the share permission. */
    permissionId: number;
  }) => Promise<SharePermission>;

  /**
   * Bulk pin or unpin issue panel to projects
   */
  bulkPinUnpinProjectsAsync: (input: {
    /** The moduleId of the Forge panel in the format `ari:cloud:ecosystem::extension/{app-id}/{environment-id}/static/{module-key}` */
    moduleId: string;
    /** The list of projects to pin or unpin the issue panel to or from. */
    projectList: (ProjectPinAction)[];
  }) => Promise<ForgePanelProjectPinAsyncResponse>;

  /**
   * Remove group
   */
  removeGroup: (input: {
    groupname?: string;
    /** The ID of the group. This parameter cannot be used with the `groupname` parameter. */
    groupId?: string;
    /** As a group's name can change, use of `swapGroupId` is recommended to identify a group.   The group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter. */
    swapGroup?: string;
    /** The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroup` parameter. */
    swapGroupId?: string;
  }) => Promise<unknown>;

  /**
   * Get group
   */
  getGroup: (input: {
    /** As a group's name can change, use of `groupId` is recommended to identify a group.   The name of the group. This parameter cannot be used with the `groupId` parameter. */
    groupname?: string;
    /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
    groupId?: string;
    /** List of fields to expand. */
    expand?: string;
  }) => Promise<Group>;

  /**
   * Create group
   */
  createGroup: (input: {
    /** The name of the group. */
    name: string;
    [key: string]: unknown;
  }) => Promise<Group>;

  /**
   * Bulk get groups
   */
  bulkGetGroups: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The ID of a group. To specify multiple IDs, pass multiple `groupId` parameters. For example, `groupId=5b10a2844c20165700ede21g&groupId=5b10ac8d82e05b22cc7d4ef5`. */
    groupId?: (string)[];
    /** The name of a group. To specify multiple names, pass multiple `groupName` parameters. For example, `groupName=administrators&groupName=jira-software-users`. */
    groupName?: (string)[];
    /** The access level of a group. Valid values: 'site-admin', 'admin', 'user'. */
    accessType?: string;
    /** The application key of the product user groups to search for. Valid values: 'jira-servicedesk', 'jira-software', 'jira-product-discovery', 'jira-core'. */
    applicationKey?: string;
  }) => Promise<PageBeanGroupDetails>;

  /**
   * Get users from group
   */
  getUsersFromGroup: (input: {
    /** As a group's name can change, use of `groupId` is recommended to identify a group.   The name of the group. This parameter cannot be used with the `groupId` parameter. */
    groupname?: string;
    /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
    groupId?: string;
    /** Include inactive users. */
    includeInactiveUsers?: boolean;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page (number should be between 1 and 50). */
    maxResults?: number;
  }) => Promise<PageBeanUserDetails>;

  /**
   * Remove user from group
   */
  removeUserFromGroup: (input: {
    /** As a group's name can change, use of `groupId` is recommended to identify a group.   The name of the group. This parameter cannot be used with the `groupId` parameter. */
    groupname?: string;
    /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
    groupId?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId: string;
  }) => Promise<unknown>;

  /**
   * Add user to group
   */
  addUserToGroup: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This property is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    name?: string;
    /** As a group's name can change, use of `groupId` is recommended to identify a group.   The name of the group. This parameter cannot be used with the `groupId` parameter. */
    groupname?: string;
    /** The ID of the group. This parameter cannot be used with the `groupName` parameter. */
    groupId?: string;
    [key: string]: unknown;
  }) => Promise<Group>;

  /**
   * Find groups
   */
  findGroups: (input: {
    /** This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user, use [Get user groups](#api-rest-api-3-user-groups-get). */
    accountId?: string;
    /** The string to find in group names. */
    query?: string;
    /** As a group's name can change, use of `excludeGroupIds` is recommended to identify a group.   A group to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `exclude=group1&exclude=group2`. This parameter cannot be used with the `excludeGroupIds` parameter. */
    exclude?: (string)[];
    /** A group ID to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with the `excludeGroups` parameter. */
    excludeId?: (string)[];
    /** The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system property `jira.ajax.autocomplete.limit`. */
    maxResults?: number;
    /** Whether the search for groups should be case insensitive. */
    caseInsensitive?: boolean;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    userName?: string;
  }) => Promise<FoundGroups>;

  /**
   * Find users and groups
   */
  findUsersAndGroups: (input: {
    /** The search string. */
    query: string;
    /** The maximum number of items to return in each list. */
    maxResults?: number;
    /** Whether the user avatar should be returned. If an invalid value is provided, the default value is used. */
    showAvatar?: boolean;
    /** The custom field ID of the field this request is for. */
    fieldId?: string;
    /** The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used when `fieldId` is present. */
    projectId?: (string)[];
    /** The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values, such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only used when `fieldId` is present. */
    issueTypeId?: (string)[];
    /** The size of the avatar to return. If an invalid value is provided, the default value is used. */
    avatarSize?: "xsmall" | "xsmall@2x" | "xsmall@3x" | "small" | "small@2x" | "small@3x" | "medium" | "medium@2x" | "medium@3x" | "large" | "large@2x" | "large@3x" | "xlarge" | "xlarge@2x" | "xlarge@3x" | "xxlarge" | "xxlarge@2x" | "xxlarge@3x" | "xxxlarge" | "xxxlarge@2x" | "xxxlarge@3x";
    /** Whether the search for groups should be case insensitive. */
    caseInsensitive?: boolean;
    /** Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used. */
    excludeConnectAddons?: boolean;
  }) => Promise<FoundUsersAndGroups>;

  /**
   * Get license
   */
  getLicense: () => Promise<License>;

  /**
   * Create issue
   */
  createIssue: (input: {
    /** List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`. */
    fields?: { [key: string]: unknown | undefined };
    /** Additional issue history details. */
    historyMetadata?: HistoryMetadata;
    /** Details of issue properties to be add or update. */
    properties?: (EntityProperty)[];
    /** Details of a transition. Required when performing a transition, optional when creating or editing an issue. */
    transition?: IssueTransition;
    /** A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in `fields`. */
    update?: { [key: string]: (FieldUpdateOperation)[] | undefined };
    /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a project. These values are then used to provide defaults on the issue create screen. */
    updateHistory?: boolean;
    [key: string]: unknown;
  }) => Promise<CreatedIssue>;

  /**
   * Archive issue(s) by JQL
   */
  archiveIssuesAsync: (input: {
    jql?: string;
  }) => Promise<string>;

  /**
   * Archive issue(s) by issue ID/key
   */
  archiveIssues: (input: {
    issueIdsOrKeys?: (string)[];
  }) => Promise<IssueArchivalSyncResponse>;

  /**
   * Bulk create issue
   */
  createIssues: (input: {
    issueUpdates?: (IssueUpdateDetails)[];
    [key: string]: unknown;
  }) => Promise<CreatedIssues>;

  /**
   * Bulk fetch issues
   */
  bulkFetchIssues: (input: {
    /** Use [expand](#expansion) to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a list of values. The expand options are:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `operations` Returns all possible operations for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent. This returns a maximum of 40 changelogs. If you require more, please refer to [Bulk fetch changelogs](#api-rest-api-3-changelog-bulkfetch-post).  *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version. */
    expand?: (string)[];
    /** A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  Any issue field, prefixed with a minus to exclude.  The default is `*navigable`.  Examples:   *  `summary,comment` Returns the summary and comments fields only.  *  `-description` Returns all navigable (default) fields except description.  *  `*all,-comment` Returns all fields except comments.  Multiple `fields` parameters can be included in a request.  Note: All navigable fields are returned by default. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields. */
    fields?: (string)[];
    /** Reference fields by their key (rather than ID). The default is `false`. */
    fieldsByKeys?: boolean;
    /** An array of issue IDs or issue keys to fetch. You can mix issue IDs and keys in the same query. */
    issueIdsOrKeys: (string)[];
    /** A list of issue property keys of issue properties to be included in the results. A maximum of 5 issue property keys can be specified. */
    properties?: (string)[];
  }) => Promise<BulkIssueResults>;

  /**
   * Get create issue metadata
   */
  getCreateIssueMeta: (input: {
    /** List of project IDs. This parameter accepts a comma-separated list. Multiple project IDs can also be provided using an ampersand-separated list. For example, `projectIds=10000,10001&projectIds=10020,10021`. This parameter may be provided with `projectKeys`. */
    projectIds?: (string)[];
    /** List of project keys. This parameter accepts a comma-separated list. Multiple project keys can also be provided using an ampersand-separated list. For example, `projectKeys=proj1,proj2&projectKeys=proj3`. This parameter may be provided with `projectIds`. */
    projectKeys?: (string)[];
    /** List of issue type IDs. This parameter accepts a comma-separated list. Multiple issue type IDs can also be provided using an ampersand-separated list. For example, `issuetypeIds=10000,10001&issuetypeIds=10020,10021`. This parameter may be provided with `issuetypeNames`. */
    issuetypeIds?: (string)[];
    /** List of issue type names. This parameter accepts a comma-separated list. Multiple issue type names can also be provided using an ampersand-separated list. For example, `issuetypeNames=name1,name2&issuetypeNames=name3`. This parameter may be provided with `issuetypeIds`. */
    issuetypeNames?: (string)[];
    /** Use [expand](#expansion) to include additional information about issue metadata in the response. This parameter accepts `projects.issuetypes.fields`, which returns information about the fields in the issue creation screen for each issue type. Fields hidden from the screen are not returned. Use the information to populate the `fields` and `update` fields in [Create issue](#api-rest-api-3-issue-post) and [Create issues](#api-rest-api-3-issue-bulk-post). */
    expand?: string;
  }) => Promise<IssueCreateMetadata>;

  /**
   * Get create metadata issue types for a project
   */
  getCreateIssueMetaIssueTypes: (input: {
    /** The ID or key of the project. */
    projectIdOrKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageOfCreateMetaIssueTypes>;

  /**
   * Get create field metadata for a project and issue type id
   */
  getCreateIssueMetaIssueTypeId: (input: {
    /** The ID or key of the project. */
    projectIdOrKey: string;
    /** The issuetype ID. */
    issueTypeId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageOfCreateMetaIssueTypeWithField>;

  /**
   * Get issue limit report
   */
  getIssueLimitReport: (input: {
    /** Return issue keys instead of issue ids in the response.  Usage: Add `?isReturningKeys=true` to the end of the path to request issue keys. */
    isReturningKeys?: boolean;
  }) => Promise<IssueLimitReportResponseBean>;

  /**
   * Get issue picker suggestions
   */
  getIssuePickerResource: (input: {
    /** A string to match against text fields in the issue such as title, description, or comments. */
    query?: string;
    /** A JQL query defining a list of issues to search for the query term. Note that `username` and `userkey` cannot be used as search terms for this parameter, due to privacy reasons. Use `accountId` instead. */
    currentJQL?: string;
    /** The key of an issue to exclude from search results. For example, the issue the user is viewing when they perform this query. */
    currentIssueKey?: string;
    /** The ID of a project that suggested issues must belong to. */
    currentProjectId?: string;
    /** Indicate whether to include subtasks in the suggestions list. */
    showSubTasks?: boolean;
    /** When `currentIssueKey` is a subtask, whether to include the parent issue in the suggestions if it matches the query. */
    showSubTaskParent?: boolean;
  }) => Promise<IssuePickerSuggestions>;

  /**
   * Bulk set issues properties by list
   */
  bulkSetIssuesPropertiesList: (input: {
    /** A list of entity property IDs. */
    entitiesIds?: (number)[];
    /** A list of entity property keys and values. */
    properties?: { [key: string]: JsonNode | undefined };
  }) => Promise<ErrorCollection>;

  /**
   * Bulk set issue properties by issue
   */
  bulkSetIssuePropertiesByIssue: (input: {
    /** A list of issue IDs and their respective properties. */
    issues?: (IssueEntityPropertiesForMultiUpdate)[];
  }) => Promise<ErrorCollection>;

  /**
   * Bulk delete issue property
   */
  bulkDeleteIssueProperty: (input: {
    /** The value of properties to perform the bulk operation on. */
    currentValue?: unknown;
    /** List of issues to perform the bulk delete operation on. */
    entityIds?: (number)[];
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<ErrorCollection>;

  /**
   * Bulk set issue property
   */
  bulkSetIssueProperty: (input: {
    /** EXPERIMENTAL. The Jira expression to calculate the value of the property. The value of the expression must be an object that can be converted to JSON, such as a number, boolean, string, list, or map. The context variables available to the expression are `issue` and `user`. Issues for which the expression returns a value whose JSON representation is longer than 32768 characters are ignored. */
    expression?: string;
    /** The bulk operation filter. */
    filter?: IssueFilterForBulkPropertySet;
    /** The value of the property. The value must be a [valid](https://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters. */
    value?: unknown;
    /** The key of the property. The maximum length is 255 characters. */
    propertyKey: string;
  }) => Promise<ErrorCollection>;

  /**
   * Unarchive issue(s) by issue keys/ID
   */
  unarchiveIssues: (input: {
    issueIdsOrKeys?: (string)[];
  }) => Promise<IssueArchivalSyncResponse>;

  /**
   * Get is watching issue bulk
   */
  getIsWatchingIssueBulk: (input: {
    /** The list of issue IDs. */
    issueIds: (string)[];
  }) => Promise<BulkIssueIsWatching>;

  /**
   * Delete issue
   */
  deleteIssue: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Whether the issue's subtasks are deleted when the issue is deleted. */
    deleteSubtasks?: "true" | "false";
  }) => Promise<unknown>;

  /**
   * Get issue
   */
  getIssue: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** A list of fields to return for the issue. This parameter accepts a comma-separated list. Use it to retrieve a subset of fields. Allowed values:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  Any issue field, prefixed with a minus to exclude.  Examples:   *  `summary,comment` Returns only the summary and comments fields.  *  `-description` Returns all (default) fields except description.  *  `*navigable,-comment` Returns all navigable fields except comment.  This parameter may be specified multiple times. For example, `fields=field1,field2& fields=field3`.  Note: All fields are returned by default. This differs from [Search for issues using JQL (GET)](#api-rest-api-3-search-get) and [Search for issues using JQL (POST)](#api-rest-api-3-search-post) where the default is all navigable fields. */
    fields?: (string)[];
    /** Whether fields in `fields` are referenced by keys rather than IDs. This parameter is useful where fields have been added by a connect app and a field's key may differ from its ID. */
    fieldsByKeys?: boolean;
    /** Use [expand](#expansion) to include additional information about the issues in the response. This parameter accepts a comma-separated list. Expand options include:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.  *  `versionedRepresentations` Returns a JSON array for each version of a field's value, with the highest number representing the most recent version. Note: When included in the request, the `fields` parameter is ignored. */
    expand?: string;
    /** A list of issue properties to return for the issue. This parameter accepts a comma-separated list. Allowed values:   *  `*all` Returns all issue properties.  *  Any issue property key, prefixed with a minus to exclude.  Examples:   *  `*all` Returns all properties.  *  `*all,-prop1` Returns all properties except `prop1`.  *  `prop1,prop2` Returns `prop1` and `prop2` properties.  This parameter may be specified multiple times. For example, `properties=prop1,prop2& properties=prop3`. */
    properties?: (string)[];
    /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. This also populates the [JQL issues search](#api-rest-api-3-search-get) `lastViewed` field. */
    updateHistory?: boolean;
    /** Whether to fail the request quickly in case of an error while loading fields for an issue. For `failFast=true`, if one field fails, the entire operation fails. For `failFast=false`, the operation will continue even if a field fails. It will return a valid response, but without values for the failed field(s). */
    failFast?: boolean;
  }) => Promise<IssueBean>;

  /**
   * Edit issue
   */
  editIssue: (input: {
    /** List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`. */
    fields?: { [key: string]: unknown | undefined };
    /** Additional issue history details. */
    historyMetadata?: HistoryMetadata;
    /** Details of issue properties to be add or update. */
    properties?: (EntityProperty)[];
    /** Details of a transition. Required when performing a transition, optional when creating or editing an issue. */
    transition?: IssueTransition;
    /** A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in `fields`. */
    update?: { [key: string]: (FieldUpdateOperation)[] | undefined };
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Whether a notification email about the issue update is sent to all watchers. To disable the notification, administer Jira or administer project permissions are required. If the user doesn't have the necessary permission the request is ignored. */
    notifyUsers?: boolean;
    /** Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideScreenSecurity?: boolean;
    /** Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideEditableFlag?: boolean;
    /** Whether the response should contain the issue with fields edited in this request. The returned issue will have the same format as in the [Get issue API](#api-rest-api-3-issue-issueidorkey-get). */
    returnIssue?: boolean;
    /** The Get issue API expand parameter to use in the response if the `returnIssue` parameter is `true`. */
    expand?: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Assign issue
   */
  assignIssue: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests. */
    accountId?: string;
    /** The user account type. Can take the following values:   *  `atlassian` regular Atlassian user account  *  `app` system account used for Connect applications and OAuth to represent external systems  *  `customer` Jira Service Desk account representing an external service desk */
    accountType?: "atlassian" | "app" | "customer" | "unknown";
    /** Whether the user is active. */
    active?: boolean;
    /** The app type of the user account when accountType is 'app'. Can take the following values:   *  `service` Service Account  *  `agent` Rovo Agent Account  *  `unknown` Unknown app type */
    appType?: string;
    /** The application roles the user is assigned to. */
    applicationRoles?: SimpleListWrapperApplicationRole;
    /** The avatars of the user. */
    avatarUrls?: AvatarUrlsBean;
    /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
    displayName?: string;
    /** The email address of the user. Depending on the user’s privacy setting, this may be returned as null. */
    emailAddress?: string;
    /** Expand options that include additional user details in the response. */
    expand?: string;
    /** The groups that the user belongs to. */
    groups?: SimpleListWrapperGroupName;
    /** Whether the user is a guest. */
    guest?: boolean;
    /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    key?: string;
    /** The locale of the user. Depending on the user’s privacy setting, this may be returned as null. */
    locale?: string;
    /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    name?: string;
    /** The URL of the user. */
    self?: string;
    /** The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned. */
    timeZone?: string;
    /** The ID or key of the issue to be assigned. */
    issueIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Add attachment
   */
  addAttachment: (input: {
    body: (MultipartFile)[];
    /** The ID or key of the issue that attachments are added to. */
    issueIdOrKey: string;
  }) => Promise<(Attachment)[]>;

  /**
   * Get changelogs
   */
  getChangeLogs: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanChangelog>;

  /**
   * Get changelogs by IDs
   */
  getChangeLogsByIds: (input: {
    /** The list of changelog IDs. */
    changelogIds: (number)[];
    /** The ID or key of the issue. */
    issueIdOrKey: string;
  }) => Promise<PageOfChangelogs>;

  /**
   * Get comments
   */
  getComments: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** [Order](#ordering) the results by a field. Accepts *created* to sort comments by their created date. */
    orderBy?: "created" | "-created" | "+created";
    /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML. */
    expand?: string;
  }) => Promise<PageOfComments>;

  /**
   * Add comment
   */
  addComment: (input: {
    /** The ID of the user who created the comment. */
    author?: UserDetails;
    /** The comment text in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). */
    body?: unknown;
    /** The date and time at which the comment was created. */
    created?: string;
    /** The ID of the comment. */
    id?: string;
    /** Whether the comment was added from an email sent by a person who is not part of the issue. See [Allow external emails to be added as comments on issues](https://support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for information on setting up this feature. */
    jsdAuthorCanSeeRequest?: boolean;
    /** Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post) operation. */
    jsdPublic?: boolean;
    /** A list of comment properties. Optional on create and update. */
    properties?: (EntityProperty)[];
    /** The rendered version of the comment. */
    renderedBody?: string;
    /** The URL of the comment. */
    self?: string;
    /** The ID of the user who updated the comment last. */
    updateAuthor?: UserDetails;
    /** The date and time at which the comment was updated last. */
    updated?: string;
    /** The group or role to which this comment is visible. Optional on create and update. */
    visibility?: Visibility;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML. */
    expand?: string;
    [key: string]: unknown;
  }) => Promise<Comment>;

  /**
   * Delete comment
   */
  deleteComment: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the comment. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Get comment
   */
  getComment: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the comment. */
    id: string;
    /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML. */
    expand?: string;
  }) => Promise<Comment>;

  /**
   * Update comment
   */
  updateComment: (input: {
    /** The ID of the user who created the comment. */
    author?: UserDetails;
    /** The comment text in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). */
    body?: unknown;
    /** The date and time at which the comment was created. */
    created?: string;
    /** The ID of the comment. */
    id?: string;
    /** Whether the comment was added from an email sent by a person who is not part of the issue. See [Allow external emails to be added as comments on issues](https://support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for information on setting up this feature. */
    jsdAuthorCanSeeRequest?: boolean;
    /** Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post) operation. */
    jsdPublic?: boolean;
    /** A list of comment properties. Optional on create and update. */
    properties?: (EntityProperty)[];
    /** The rendered version of the comment. */
    renderedBody?: string;
    /** The URL of the comment. */
    self?: string;
    /** The ID of the user who updated the comment last. */
    updateAuthor?: UserDetails;
    /** The date and time at which the comment was updated last. */
    updated?: string;
    /** The group or role to which this comment is visible. Optional on create and update. */
    visibility?: Visibility;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Whether users are notified when a comment is updated. */
    notifyUsers?: boolean;
    /** Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideEditableFlag?: boolean;
    /** Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML. */
    expand?: string;
    [key: string]: unknown;
  }, options: { params: { id: string } }) => Promise<Comment>;

  /**
   * Get edit issue metadata
   */
  getEditIssueMeta: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Whether hidden fields are returned. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideScreenSecurity?: boolean;
    /** Whether non-editable fields are returned. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    overrideEditableFlag?: boolean;
  }) => Promise<IssueUpdateMetadata>;

  /**
   * Send notification for issue
   */
  notify: (input: {
    /** The HTML body of the email notification for the issue. */
    htmlBody?: string;
    /** Restricts the notifications to users with the specified permissions. */
    restrict?: NotificationRecipientsRestrictions;
    /** The subject of the email notification for the issue. If this is not specified, then the subject is set to the issue key and summary. */
    subject?: string;
    /** The plain text body of the email notification for the issue. */
    textBody?: string;
    /** The recipients of the email notification for the issue. */
    to?: NotificationRecipients;
    /** ID or key of the issue that the notification is sent for. */
    issueIdOrKey: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Get issue property keys
   */
  getIssuePropertyKeys: (input: {
    /** The key or ID of the issue. */
    issueIdOrKey: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete issue property
   */
  deleteIssueProperty: (input: {
    /** The key or ID of the issue. */
    issueIdOrKey: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get issue property
   */
  getIssueProperty: (input: {
    /** The key or ID of the issue. */
    issueIdOrKey: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set issue property
   */
  setIssueProperty: (input: {
    body: unknown;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The key of the issue property. The maximum length is 255 characters. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Delete remote issue link by global ID
   */
  deleteRemoteIssueLinkByGlobalId: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The global ID of a remote issue link. */
    globalId: string;
  }) => Promise<unknown>;

  /**
   * Get remote issue links
   */
  getRemoteIssueLinks: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The global ID of the remote issue link. */
    globalId?: string;
  }) => Promise<(RemoteIssueLink)[] | RemoteIssueLink>;

  /**
   * Create or update remote issue link
   */
  createOrUpdateRemoteIssueLink: (input: {
    /** Details of the remote application the linked item is in. For example, trello. */
    application?: Application;
    /** An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence would consist of the app ID and page ID, like this: `appId=456&pageId=123`.  Setting this field enables the remote issue link details to be updated or deleted using remote system and item details as the record identifier, rather than using the record's Jira ID.  The maximum length is 255 characters. */
    globalId?: string;
    /** Details of the item linked to. */
    object: RemoteObject;
    /** Description of the relationship between the issue and the linked item. If not set, the relationship description "links to" is used in Jira. */
    relationship?: string;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    [key: string]: unknown;
  }) => Promise<RemoteIssueLinkIdentifies>;

  /**
   * Delete remote issue link by ID
   */
  deleteRemoteIssueLinkById: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of a remote issue link. */
    linkId: string;
  }) => Promise<unknown>;

  /**
   * Get remote issue link by ID
   */
  getRemoteIssueLinkById: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the remote issue link. */
    linkId: string;
  }) => Promise<RemoteIssueLink>;

  /**
   * Update remote issue link by ID
   */
  updateRemoteIssueLink: (input: {
    /** Details of the remote application the linked item is in. For example, trello. */
    application?: Application;
    /** An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence would consist of the app ID and page ID, like this: `appId=456&pageId=123`.  Setting this field enables the remote issue link details to be updated or deleted using remote system and item details as the record identifier, rather than using the record's Jira ID.  The maximum length is 255 characters. */
    globalId?: string;
    /** Details of the item linked to. */
    object: RemoteObject;
    /** Description of the relationship between the issue and the linked item. If not set, the relationship description "links to" is used in Jira. */
    relationship?: string;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the remote issue link. */
    linkId: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Get transitions
   */
  getTransitions: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Use [expand](#expansion) to include additional information about transitions in the response. This parameter accepts `transitions.fields`, which returns information about the fields in the transition screen for each transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and `update` fields in [Transition issue](#api-rest-api-3-issue-issueIdOrKey-transitions-post). */
    expand?: string;
    /** The ID of the transition. */
    transitionId?: string;
    /** Whether transitions with the condition *Hide From User Condition* are included in the response. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
    skipRemoteOnlyCondition?: boolean;
    /** Whether details of transitions that fail a condition are included in the response */
    includeUnavailableTransitions?: boolean;
    /** Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or only by ops-bar sequence value. */
    sortByOpsBarAndStatus?: boolean;
  }) => Promise<Transitions>;

  /**
   * Transition issue
   */
  doTransition: (input: {
    /** List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`. */
    fields?: { [key: string]: unknown | undefined };
    /** Additional issue history details. */
    historyMetadata?: HistoryMetadata;
    /** Details of issue properties to be add or update. */
    properties?: (EntityProperty)[];
    /** Details of a transition. Required when performing a transition, optional when creating or editing an issue. */
    transition?: IssueTransition;
    /** A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in `fields`. */
    update?: { [key: string]: (FieldUpdateOperation)[] | undefined };
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Delete vote
   */
  removeVote: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Get votes
   */
  getVotes: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
  }) => Promise<Votes>;

  /**
   * Add vote
   */
  addVote: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Delete watcher
   */
  removeWatcher: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required. */
    accountId?: string;
  }) => Promise<unknown>;

  /**
   * Get issue watchers
   */
  getIssueWatchers: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
  }) => Promise<Watchers>;

  /**
   * Add watcher
   */
  addWatcher: (input: {
    body: string;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Bulk delete worklogs
   */
  bulkDeleteWorklogs: (input: {
    /** A list of worklog IDs. */
    ids: (number)[];
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** Defines how to update the issue's time estimate, the options are:   *  `leave` Leaves the estimate unchanged.  *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being deleted. */
    adjustEstimate?: "leave" | "auto";
    /** Whether the work log entries should be removed to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag. */
    overrideEditableFlag?: boolean;
  }) => Promise<unknown>;

  /**
   * Get issue worklogs
   */
  getIssueWorklog: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The worklog start date and time, as a UNIX timestamp in milliseconds, after which worklogs are returned. */
    startedAfter?: number;
    /** The worklog start date and time, as a UNIX timestamp in milliseconds, before which worklogs are returned. */
    startedBefore?: number;
    /** Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts`properties`, which returns worklog properties. */
    expand?: string;
  }) => Promise<PageOfWorklogs>;

  /**
   * Add worklog
   */
  addWorklog: (input: {
    /** Details of the user who created the worklog. */
    author?: UserDetails;
    /** A comment about the worklog in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or updating a worklog. */
    comment?: unknown;
    /** The datetime on which the worklog was created. */
    created?: string;
    /** The ID of the worklog record. */
    id?: string;
    /** The ID of the issue this worklog is for. */
    issueId?: string;
    /** Details of properties for the worklog. Optional when creating or updating a worklog. */
    properties?: (EntityProperty)[];
    /** The URL of the worklog item. */
    self?: string;
    /** The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog. */
    started?: string;
    /** The time spent working on the issue as days (\#d), hours (\#h), or minutes (\#m or \#). Required when creating a worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is provided. */
    timeSpent?: string;
    /** The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpent` is provided. */
    timeSpentSeconds?: number;
    /** Details of the user who last updated the worklog. */
    updateAuthor?: UserDetails;
    /** The datetime on which the worklog was last updated. */
    updated?: string;
    /** Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog. */
    visibility?: Visibility;
    /** The ID or key the issue. */
    issueIdOrKey: string;
    /** Whether users watching the issue are notified by email. */
    notifyUsers?: boolean;
    /** Defines how to update the issue's time estimate, the options are:   *  `new` Sets the estimate to a specific value, defined in `newEstimate`.  *  `leave` Leaves the estimate unchanged.  *  `manual` Reduces the estimate by amount specified in `reduceBy`.  *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog. */
    adjustEstimate?: "new" | "leave" | "manual" | "auto";
    /** The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `new`. */
    newEstimate?: string;
    /** The amount to reduce the issue's remaining estimate by, as days (\#d), hours (\#h), or minutes (\#m). For example, *2d*. Required when `adjustEstimate` is `manual`. */
    reduceBy?: string;
    /** Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts `properties`, which returns worklog properties. */
    expand?: string;
    /** Whether the worklog entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag. */
    overrideEditableFlag?: boolean;
    [key: string]: unknown;
  }) => Promise<Worklog>;

  /**
   * Bulk move worklogs
   */
  bulkMoveWorklogs: (input: {
    /** A list of worklog IDs. */
    ids?: (number)[];
    /** The issue id or key of the destination issue */
    issueIdOrKey?: string;
    /** Defines how to update the issues' time estimate, the options are:   *  `leave` Leaves the estimate unchanged.  *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being moved in the source issue, and increases it in the destination issue. */
    adjustEstimate?: "leave" | "auto";
    /** Whether the work log entry should be moved to and from the issues even if the issues are not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag. */
    overrideEditableFlag?: boolean;
  }, options: { params: { issueIdOrKey: string } }) => Promise<unknown>;

  /**
   * Delete worklog
   */
  deleteWorklog: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the worklog. */
    id: string;
    /** Whether users watching the issue are notified by email. */
    notifyUsers?: boolean;
    /** Defines how to update the issue's time estimate, the options are:   *  `new` Sets the estimate to a specific value, defined in `newEstimate`.  *  `leave` Leaves the estimate unchanged.  *  `manual` Increases the estimate by amount specified in `increaseBy`.  *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog. */
    adjustEstimate?: "new" | "leave" | "manual" | "auto";
    /** The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `new`. */
    newEstimate?: string;
    /** The amount to increase the issue's remaining estimate by, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `manual`. */
    increaseBy?: string;
    /** Whether the work log entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag. */
    overrideEditableFlag?: boolean;
  }) => Promise<unknown>;

  /**
   * Get worklog
   */
  getWorklog: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the worklog. */
    id: string;
    /** Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts  `properties`, which returns worklog properties. */
    expand?: string;
  }) => Promise<Worklog>;

  /**
   * Update worklog
   */
  updateWorklog: (input: {
    /** Details of the user who created the worklog. */
    author?: UserDetails;
    /** A comment about the worklog in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or updating a worklog. */
    comment?: unknown;
    /** The datetime on which the worklog was created. */
    created?: string;
    /** The ID of the worklog record. */
    id?: string;
    /** The ID of the issue this worklog is for. */
    issueId?: string;
    /** Details of properties for the worklog. Optional when creating or updating a worklog. */
    properties?: (EntityProperty)[];
    /** The URL of the worklog item. */
    self?: string;
    /** The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog. */
    started?: string;
    /** The time spent working on the issue as days (\#d), hours (\#h), or minutes (\#m or \#). Required when creating a worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is provided. */
    timeSpent?: string;
    /** The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpent` is provided. */
    timeSpentSeconds?: number;
    /** Details of the user who last updated the worklog. */
    updateAuthor?: UserDetails;
    /** The datetime on which the worklog was last updated. */
    updated?: string;
    /** Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog. */
    visibility?: Visibility;
    /** The ID or key the issue. */
    issueIdOrKey: string;
    /** Whether users watching the issue are notified by email. */
    notifyUsers?: boolean;
    /** Defines how to update the issue's time estimate, the options are:   *  `new` Sets the estimate to a specific value, defined in `newEstimate`.  *  `leave` Leaves the estimate unchanged.  *  `auto` Updates the estimate by the difference between the original and updated value of `timeSpent` or `timeSpentSeconds`. */
    adjustEstimate?: "new" | "leave" | "manual" | "auto";
    /** The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `new`. */
    newEstimate?: string;
    /** Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties`, which returns worklog properties. */
    expand?: string;
    /** Whether the worklog should be added to the issue even if the issue is not editable. For example, because the issue is closed. Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag. */
    overrideEditableFlag?: boolean;
    [key: string]: unknown;
  }, options: { params: { id: string } }) => Promise<Worklog>;

  /**
   * Get worklog property keys
   */
  getWorklogPropertyKeys: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the worklog. */
    worklogId: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete worklog property
   */
  deleteWorklogProperty: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the worklog. */
    worklogId: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get worklog property
   */
  getWorklogProperty: (input: {
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the worklog. */
    worklogId: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set worklog property
   */
  setWorklogProperty: (input: {
    body: unknown;
    /** The ID or key of the issue. */
    issueIdOrKey: string;
    /** The ID of the worklog. */
    worklogId: string;
    /** The key of the issue property. The maximum length is 255 characters. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Create issue link
   */
  linkIssues: (input: {
    comment?: Comment;
    inwardIssue: LinkedIssue;
    outwardIssue: LinkedIssue;
    type: IssueLinkType;
  }) => Promise<unknown>;

  /**
   * Delete issue link
   */
  deleteIssueLink: (input: {
    /** The ID of the issue link. */
    linkId: string;
  }) => Promise<unknown>;

  /**
   * Get issue link
   */
  getIssueLink: (input: {
    /** The ID of the issue link. */
    linkId: string;
  }) => Promise<IssueLink>;

  /**
   * Get issue link types
   */
  getIssueLinkTypes: () => Promise<IssueLinkTypes>;

  /**
   * Create issue link type
   */
  createIssueLinkType: (input: {
    /** The ID of the issue link type and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is read only. */
    id?: string;
    /** The description of the issue link type inward link and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only. */
    inward?: string;
    /** The name of the issue link type and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only. */
    name?: string;
    /** The description of the issue link type outward link and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only. */
    outward?: string;
    /** The URL of the issue link type. Read only. */
    self?: string;
  }) => Promise<IssueLinkType>;

  /**
   * Delete issue link type
   */
  deleteIssueLinkType: (input: {
    /** The ID of the issue link type. */
    issueLinkTypeId: string;
  }) => Promise<unknown>;

  /**
   * Get issue link type
   */
  getIssueLinkType: (input: {
    /** The ID of the issue link type. */
    issueLinkTypeId: string;
  }) => Promise<IssueLinkType>;

  /**
   * Update issue link type
   */
  updateIssueLinkType: (input: {
    /** The ID of the issue link type and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is read only. */
    id?: string;
    /** The description of the issue link type inward link and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only. */
    inward?: string;
    /** The name of the issue link type and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only. */
    name?: string;
    /** The description of the issue link type outward link and is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only. */
    outward?: string;
    /** The URL of the issue link type. Read only. */
    self?: string;
    /** The ID of the issue link type. */
    issueLinkTypeId: string;
  }) => Promise<IssueLinkType>;

  /**
   * Export archived issue(s)
   */
  exportArchivedIssues: (input: {
    /** List archived issues archived by a specified account ID. */
    archivedBy?: (string)[];
    archivedDateRange?: DateRangeFilterRequest;
    /** List archived issues with a specified issue type ID. */
    issueTypes?: (string)[];
    /** List archived issues with a specified project key. */
    projects?: (string)[];
    /** List archived issues where the reporter is a specified account ID. */
    reporters?: (string)[];
    [key: string]: unknown;
  }) => Promise<ExportArchivedIssuesTaskProgressResponse>;

  /**
   * Get issue security schemes
   */
  getIssueSecuritySchemes: () => Promise<SecuritySchemes>;

  /**
   * Create issue security scheme
   */
  createIssueSecurityScheme: (input: {
    /** The description of the issue security scheme. */
    description?: string;
    /** The list of scheme levels which should be added to the security scheme. */
    levels?: (SecuritySchemeLevelBean)[];
    /** The name of the issue security scheme. Must be unique (case-insensitive). */
    name: string;
    [key: string]: unknown;
  }) => Promise<SecuritySchemeId>;

  /**
   * Get issue security levels
   */
  getSecurityLevels: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of issue security scheme level IDs. To include multiple issue security levels, separate IDs with an ampersand: `id=10000&id=10001`. */
    id?: (string)[];
    /** The list of issue security scheme IDs. To include multiple issue security schemes, separate IDs with an ampersand: `schemeId=10000&schemeId=10001`. */
    schemeId?: (string)[];
    /** When set to true, returns multiple default levels for each security scheme containing a default. If you provide scheme and level IDs not associated with the default, returns an empty page. The default value is false. */
    onlyDefault?: boolean;
  }) => Promise<PageBeanSecurityLevel>;

  /**
   * Set default issue security levels
   */
  setDefaultLevels: (input: {
    /** List of objects with issue security scheme ID and new default level ID. */
    defaultValues: (DefaultLevelValue)[];
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Get issue security level members
   */
  getSecurityLevelMembers: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of issue security level member IDs. To include multiple issue security level members separate IDs with an ampersand: `id=10000&id=10001`. */
    id?: (string)[];
    /** The list of issue security scheme IDs. To include multiple issue security schemes separate IDs with an ampersand: `schemeId=10000&schemeId=10001`. */
    schemeId?: (string)[];
    /** The list of issue security level IDs. To include multiple issue security levels separate IDs with an ampersand: `levelId=10000&levelId=10001`. */
    levelId?: (string)[];
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `all` Returns all expandable information  *  `field` Returns information about the custom field granted the permission  *  `group` Returns information about the group that is granted the permission  *  `projectRole` Returns information about the project role granted the permission  *  `user` Returns information about the user who is granted the permission */
    expand?: string;
  }) => Promise<PageBeanSecurityLevelMember>;

  /**
   * Get projects using issue security schemes
   */
  searchProjectsUsingSecuritySchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of security scheme IDs to be filtered out. */
    issueSecuritySchemeId?: (string)[];
    /** The list of project IDs to be filtered out. */
    projectId?: (string)[];
  }) => Promise<PageBeanIssueSecuritySchemeToProjectMapping>;

  /**
   * Associate security scheme to project
   */
  associateSchemesToProjects: (input: {
    /** The list of scheme levels which should be remapped to new levels of the issue security scheme. */
    oldToNewSecurityLevelMappings?: (OldToNewSecurityLevelMappingsBean)[];
    /** The ID of the project. */
    projectId: string;
    /** The ID of the issue security scheme. Providing null will clear the association with the issue security scheme. */
    schemeId: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Search issue security schemes
   */
  searchSecuritySchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of issue security scheme IDs. To include multiple issue security scheme IDs, separate IDs with an ampersand: `id=10000&id=10001`. */
    id?: (string)[];
    /** The list of project IDs. To include multiple project IDs, separate IDs with an ampersand: `projectId=10000&projectId=10001`. */
    projectId?: (string)[];
  }) => Promise<PageBeanSecuritySchemeWithProjects>;

  /**
   * Get issue security scheme
   */
  getIssueSecurityScheme: (input: {
    /** The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of issue security scheme IDs. */
    id: number;
  }) => Promise<SecurityScheme>;

  /**
   * Update issue security scheme
   */
  updateIssueSecurityScheme: (input: {
    /** The description of the security scheme scheme. */
    description?: string;
    /** The name of the security scheme scheme. Must be unique. */
    name?: string;
    /** The ID of the issue security scheme. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Get issue security level members by issue security scheme
   */
  getIssueSecurityLevelMembers: (input: {
    /** The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of issue security scheme IDs. */
    issueSecuritySchemeId: number;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of issue security level IDs. To include multiple issue security levels separate IDs with ampersand: `issueSecurityLevelId=10000&issueSecurityLevelId=10001`. */
    issueSecurityLevelId?: (string)[];
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission. */
    expand?: string;
  }) => Promise<PageBeanIssueSecurityLevelMember>;

  /**
   * Delete issue security scheme
   */
  deleteSecurityScheme: (input: {
    /** The ID of the issue security scheme. */
    schemeId: string;
  }) => Promise<unknown>;

  /**
   * Add issue security levels
   */
  addSecurityLevel: (input: {
    /** The list of scheme levels which should be added to the security scheme. */
    levels?: (SecuritySchemeLevelBean)[];
    /** The ID of the issue security scheme. */
    schemeId: string;
  }) => Promise<unknown>;

  /**
   * Remove issue security level
   */
  removeLevel: (input: {
    /** The ID of the issue security scheme. */
    schemeId: string;
    /** The ID of the issue security level to remove. */
    levelId: string;
    /** The ID of the issue security level that will replace the currently selected level. */
    replaceWith?: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Update issue security level
   */
  updateSecurityLevel: (input: {
    /** The description of the issue security scheme level. */
    description?: string;
    /** The name of the issue security scheme level. Must be unique. */
    name?: string;
    /** The ID of the issue security scheme level belongs to. */
    schemeId: string;
    /** The ID of the issue security level to update. */
    levelId: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Add issue security level members
   */
  addSecurityLevelMembers: (input: {
    /** The list of level members which should be added to the issue security scheme level. */
    members?: (SecuritySchemeLevelMemberBean)[];
    /** The ID of the issue security scheme. */
    schemeId: string;
    /** The ID of the issue security level. */
    levelId: string;
  }) => Promise<unknown>;

  /**
   * Remove member from issue security level
   */
  removeMemberFromSecurityLevel: (input: {
    /** The ID of the issue security scheme. */
    schemeId: string;
    /** The ID of the issue security level. */
    levelId: string;
    /** The ID of the issue security level member to be removed. */
    memberId: string;
  }) => Promise<unknown>;

  /**
   * Get all issue types for user
   */
  getIssueAllTypes: () => Promise<(IssueTypeDetails)[]>;

  /**
   * Create issue type
   */
  createIssueType: (input: {
    /** The description of the issue type. */
    description?: string;
    /** The hierarchy level of the issue type. Use:   *  `-1` for Subtask.  *  `0` for Base.  Defaults to `0`. */
    hierarchyLevel?: number;
    /** The unique name for the issue type. The maximum length is 60 characters. */
    name: string;
    /** Deprecated. Use `hierarchyLevel` instead. See the [deprecation notice](https://community.developer.atlassian.com/t/deprecation-of-the-epic-link-parent-link-and-other-related-fields-in-rest-apis-and-webhooks/54048) for details.  Whether the issue type is `subtype` or `standard`. Defaults to `standard`. */
    type?: "subtask" | "standard";
  }) => Promise<IssueTypeDetails>;

  /**
   * Get issue types for project
   */
  getIssueTypesForProject: (input: {
    /** The ID of the project. */
    projectId: number;
    /** The level of the issue type to filter by. Use:   *  `-1` for Subtask.  *  `0` for Base.  *  `1` for Epic. */
    level?: number;
  }) => Promise<(IssueTypeDetails)[]>;

  /**
   * Delete issue type
   */
  deleteIssueType: (input: {
    /** The ID of the issue type. */
    id: string;
    /** The ID of the replacement issue type. */
    alternativeIssueTypeId?: string;
  }) => Promise<unknown>;

  /**
   * Get issue type
   */
  getIssueType: (input: {
    /** The ID of the issue type. */
    id: string;
  }) => Promise<IssueTypeDetails>;

  /**
   * Update issue type
   */
  updateIssueType: (input: {
    /** The ID of an issue type avatar. This can be obtained be obtained from the following endpoints:   *  [System issue type avatar IDs only](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-avatar-type-system-get)  *  [System and custom issue type avatar IDs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-universal-avatar-type-type-owner-entityid-get) */
    avatarId?: number;
    /** The description of the issue type. */
    description?: string;
    /** The unique name for the issue type. The maximum length is 60 characters. */
    name?: string;
    /** The ID of the issue type. */
    id: string;
  }) => Promise<IssueTypeDetails>;

  /**
   * Get alternative issue types
   */
  getAlternativeIssueTypes: (input: {
    /** The ID of the issue type. */
    id: string;
  }) => Promise<(IssueTypeDetails)[]>;

  /**
   * Load issue type avatar
   */
  createIssueTypeAvatar: (input: {
    body: unknown;
    /** The ID of the issue type. */
    id: string;
    /** The X coordinate of the top-left corner of the crop region. */
    x?: number;
    /** The Y coordinate of the top-left corner of the crop region. */
    y?: number;
    /** The length of each side of the crop region. */
    size: number;
  }) => Promise<Avatar>;

  /**
   * Get issue type property keys
   */
  getIssueTypePropertyKeys: (input: {
    /** The ID of the issue type. */
    issueTypeId: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete issue type property
   */
  deleteIssueTypeProperty: (input: {
    /** The ID of the issue type. */
    issueTypeId: string;
    /** The key of the property. Use [Get issue type property keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of all issue type property keys. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get issue type property
   */
  getIssueTypeProperty: (input: {
    /** The ID of the issue type. */
    issueTypeId: string;
    /** The key of the property. Use [Get issue type property keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of all issue type property keys. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set issue type property
   */
  setIssueTypeProperty: (input: {
    body: unknown;
    /** The ID of the issue type. */
    issueTypeId: string;
    /** The key of the issue type property. The maximum length is 255 characters. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get all issue type schemes
   */
  getAllIssueTypeSchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of issue type schemes IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
    id?: (number)[];
    /** [Order](#ordering) the results by a field:   *  `name` Sorts by issue type scheme name.  *  `id` Sorts by issue type scheme ID. */
    orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `projects` For each issue type schemes, returns information about the projects the issue type scheme is assigned to.  *  `issueTypes` For each issue type schemes, returns information about the issueTypes the issue type scheme have. */
    expand?: string;
    /** String used to perform a case-insensitive partial match with issue type scheme name. */
    queryString?: string;
  }) => Promise<PageBeanIssueTypeScheme>;

  /**
   * Create issue type scheme
   */
  createIssueTypeScheme: (input: {
    /** The ID of the default issue type of the issue type scheme. This ID must be included in `issueTypeIds`. */
    defaultIssueTypeId?: string;
    /** The description of the issue type scheme. The maximum length is 4000 characters. */
    description?: string;
    /** The list of issue types IDs of the issue type scheme. At least one standard issue type ID is required. */
    issueTypeIds: (string)[];
    /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
    name: string;
  }) => Promise<IssueTypeSchemeId>;

  /**
   * Get issue type scheme items
   */
  getIssueTypeSchemesMapping: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of issue type scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `issueTypeSchemeId=10000&issueTypeSchemeId=10001`. */
    issueTypeSchemeId?: (number)[];
  }) => Promise<PageBeanIssueTypeSchemeMapping>;

  /**
   * Get issue type schemes for projects
   */
  getIssueTypeSchemeForProjects: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of project IDs. To include multiple project IDs, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. */
    projectId: (number)[];
  }) => Promise<PageBeanIssueTypeSchemeProjects>;

  /**
   * Assign issue type scheme to project
   */
  assignIssueTypeSchemeToProject: (input: {
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: string;
    /** The ID of the project. */
    projectId: string;
  }) => Promise<unknown>;

  /**
   * Delete issue type scheme
   */
  deleteIssueTypeScheme: (input: {
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: number;
  }) => Promise<unknown>;

  /**
   * Update issue type scheme
   */
  updateIssueTypeScheme: (input: {
    /** The ID of the default issue type of the issue type scheme. */
    defaultIssueTypeId?: string;
    /** The description of the issue type scheme. The maximum length is 4000 characters. */
    description?: string;
    /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
    name?: string;
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: number;
  }) => Promise<unknown>;

  /**
   * Add issue types to issue type scheme
   */
  addIssueTypesToIssueTypeScheme: (input: {
    /** The list of issue type IDs. */
    issueTypeIds: (string)[];
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: number;
  }) => Promise<unknown>;

  /**
   * Change order of issue types
   */
  reorderIssueTypesInIssueTypeScheme: (input: {
    /** The ID of the issue type to place the moved issue types after. Required if `position` isn't provided. */
    after?: string;
    /** A list of the issue type IDs to move. The order of the issue type IDs in the list is the order they are given after the move. */
    issueTypeIds: (string)[];
    /** The position the issue types should be moved to. Required if `after` isn't provided. */
    position?: "First" | "Last";
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: number;
  }) => Promise<unknown>;

  /**
   * Remove issue type from issue type scheme
   */
  removeIssueTypeFromIssueTypeScheme: (input: {
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: number;
    /** The ID of the issue type. */
    issueTypeId: number;
  }) => Promise<unknown>;

  /**
   * Get issue type screen schemes
   */
  getIssueTypeScreenSchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of issue type screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
    id?: (number)[];
    /** String used to perform a case-insensitive partial match with issue type screen scheme name. */
    queryString?: string;
    /** [Order](#ordering) the results by a field:   *  `name` Sorts by issue type screen scheme name.  *  `id` Sorts by issue type screen scheme ID. */
    orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts `projects` that, for each issue type screen schemes, returns information about the projects the issue type screen scheme is assigned to. */
    expand?: string;
  }) => Promise<PageBeanIssueTypeScreenScheme>;

  /**
   * Create issue type screen scheme
   */
  createIssueTypeScreenScheme: (input: {
    /** The description of the issue type screen scheme. The maximum length is 255 characters. */
    description?: string;
    /** The IDs of the screen schemes for the issue type IDs and *default*. A *default* entry is required to create an issue type screen scheme, it defines the mapping for all issue types without a screen scheme. */
    issueTypeMappings: (IssueTypeScreenSchemeMapping)[];
    /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
    name: string;
  }) => Promise<IssueTypeScreenSchemeId>;

  /**
   * Get issue type screen scheme items
   */
  getIssueTypeScreenSchemeMappings: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of issue type screen scheme IDs. To include multiple issue type screen schemes, separate IDs with ampersand: `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`. */
    issueTypeScreenSchemeId?: (number)[];
  }) => Promise<PageBeanIssueTypeScreenSchemeItem>;

  /**
   * Get issue type screen schemes for projects
   */
  getIssueTypeScreenSchemeProjectAssociations: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`. */
    projectId: (number)[];
  }) => Promise<PageBeanIssueTypeScreenSchemesProjects>;

  /**
   * Assign issue type screen scheme to project
   */
  assignIssueTypeScreenSchemeToProject: (input: {
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId?: string;
    /** The ID of the project. */
    projectId?: string;
  }) => Promise<unknown>;

  /**
   * Delete issue type screen scheme
   */
  deleteIssueTypeScreenScheme: (input: {
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Update issue type screen scheme
   */
  updateIssueTypeScreenScheme: (input: {
    /** The description of the issue type screen scheme. The maximum length is 255 characters. */
    description?: string;
    /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
    name?: string;
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Append mappings to issue type screen scheme
   */
  appendMappingsForIssueTypeScreenScheme: (input: {
    /** The list of issue type to screen scheme mappings. A *default* entry cannot be specified because a default entry is added when an issue type screen scheme is created. */
    issueTypeMappings: (IssueTypeScreenSchemeMapping)[];
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Update issue type screen scheme default screen scheme
   */
  updateDefaultScreenScheme: (input: {
    /** The ID of the screen scheme. */
    screenSchemeId: string;
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Remove mappings from issue type screen scheme
   */
  removeMappingsFromIssueTypeScreenScheme: (input: {
    /** The list of issue type IDs. */
    issueTypeIds: (string)[];
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Get issue type screen scheme projects
   */
  getProjectsForIssueTypeScreenScheme: (input: {
    /** The ID of the issue type screen scheme. */
    issueTypeScreenSchemeId: number;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    query?: string;
  }) => Promise<PageBeanProjectDetails>;

  /**
   * Get field reference data (GET)
   */
  getAutoComplete: () => Promise<JqlReferenceData>;

  /**
   * Get field reference data (POST)
   */
  getAutoCompletePost: (input: {
    /** Include collapsed fields for fields that have non-unique names. */
    includeCollapsedFields?: boolean;
    /** List of project IDs used to filter the visible field details returned. */
    projectIds?: (number)[];
  }) => Promise<JqlReferenceData>;

  /**
   * Get field auto complete suggestions
   */
  getFieldAutoCompleteForQueryString: (input: {
    /** The name of the field. */
    fieldName?: string;
    /** The partial field item name entered by the user. */
    fieldValue?: string;
    /** The name of the [ CHANGED operator predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which the suggestions are generated. The valid predicate operators are *by*, *from*, and *to*. */
    predicateName?: string;
    /** The partial predicate item name entered by the user. */
    predicateValue?: string;
  }) => Promise<AutoCompleteSuggestions>;

  /**
   * Get precomputations (apps)
   */
  getPrecomputations: (input: {
    /** The function key in format:   *  Forge: `ari:cloud:ecosystem::extension/[App ID]/[Environment ID]/static/[Function key from manifest]`  *  Connect: `[App key]__[Module key]` */
    functionKey?: (string)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** [Order](#ordering) the results by a field:   *  `functionKey` Sorts by the functionKey.  *  `used` Sorts by the used timestamp.  *  `created` Sorts by the created timestamp.  *  `updated` Sorts by the updated timestamp. */
    orderBy?: string;
  }) => Promise<PageBean2JqlFunctionPrecomputationBean>;

  /**
   * Update precomputations (apps)
   */
  updatePrecomputations: (input: {
    values?: (JqlFunctionPrecomputationUpdateBean)[];
    skipNotFoundPrecomputations?: boolean;
  }) => Promise<JqlFunctionPrecomputationUpdateResponse>;

  /**
   * Get precomputations by ID (apps)
   */
  getPrecomputationsById: (input: {
    precomputationIDs?: (string)[];
    /** [Order](#ordering) the results by a field:   *  `functionKey` Sorts by the functionKey.  *  `used` Sorts by the used timestamp.  *  `created` Sorts by the created timestamp.  *  `updated` Sorts by the updated timestamp. */
    orderBy?: string;
  }) => Promise<JqlFunctionPrecomputationGetByIdResponse>;

  /**
   * Check issues against JQL
   */
  matchIssues: (input: {
    /** A list of issue IDs. */
    issueIds: (number)[];
    /** A list of JQL queries. */
    jqls: (string)[];
  }) => Promise<IssueMatches>;

  /**
   * Parse JQL query
   */
  parseJqlQueries: (input: {
    /** A list of queries to parse. */
    queries: (string)[];
    /** How to validate the JQL query and treat the validation results. Validation options include:   *  `strict` Returns all errors. If validation fails, the query structure is not returned.  *  `warn` Returns all errors. If validation fails but the JQL query is correctly formed, the query structure is returned.  *  `none` No validation is performed. If JQL query is correctly formed, the query structure is returned. */
    validation: "strict" | "warn" | "none";
  }) => Promise<ParsedJqlQueries>;

  /**
   * Convert user identifiers to account IDs in JQL queries
   */
  migrateQueries: (input: {
    /** A list of queries with user identifiers. Maximum of 100 queries. */
    queryStrings?: (string)[];
  }) => Promise<ConvertedJqlQueries>;

  /**
   * Sanitize JQL queries
   */
  sanitiseJqlQueries: (input: {
    /** The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries. */
    queries: (JqlQueryToSanitize)[];
  }) => Promise<SanitizedJqlQueries>;

  /**
   * Get all labels
   */
  getAllLabels: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanString>;

  /**
   * Get approximate license count
   */
  getApproximateLicenseCount: () => Promise<LicenseMetric>;

  /**
   * Get approximate application license count
   */
  getApproximateApplicationLicenseCount: (input: {
    /** The ID of the application, represents a specific version of Jira. */
    applicationKey: "jira-core" | "jira-product-discovery" | "jira-software" | "jira-servicedesk";
  }) => Promise<LicenseMetric>;

  /**
   * Get my permissions
   */
  getMyPermissions: (input: {
    /** The key of project. Ignored if `projectId` is provided. */
    projectKey?: string;
    /** The ID of project. */
    projectId?: string;
    /** The key of the issue. Ignored if `issueId` is provided. */
    issueKey?: string;
    /** The ID of the issue. */
    issueId?: string;
    /** A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available permissions, use [Get all permissions](#api-rest-api-3-permissions-get). */
    permissions?: string;
    projectUuid?: string;
    projectConfigurationUuid?: string;
    /** The ID of the comment. */
    commentId?: string;
  }) => Promise<Permissions>;

  /**
   * Delete preference
   */
  removePreference: (input: {
    /** The key of the preference. */
    key: string;
  }) => Promise<unknown>;

  /**
   * Get preference
   */
  getPreference: (input: {
    /** The key of the preference. */
    key: string;
  }) => Promise<string>;

  /**
   * Set preference
   */
  setPreference: (input: {
    body: string;
    /** The key of the preference. The maximum length is 255 characters. */
    key: string;
  }) => Promise<unknown>;

  /**
   * Get locale
   */
  getLocale: () => Promise<Locale>;

  /**
   * Set locale
   */
  setLocale: (input: {
    /** The locale code. The Java the locale format is used: a two character language code (ISO 639), an underscore, and two letter country code (ISO 3166). For example, en\_US represents a locale of English (United States). Required on create. */
    locale?: string;
  }) => Promise<unknown>;

  /**
   * Get current user
   */
  getCurrentUser: (input: {
    /** Use [expand](#expansion) to include additional information about user in the response. This parameter accepts a comma-separated list. Expand options include:   *  `groups` Returns all groups, including nested groups, the user belongs to.  *  `applicationRoles` Returns the application roles the user is assigned to. */
    expand?: string;
  }) => Promise<User>;

  /**
   * Get notification schemes paginated
   */
  getNotificationSchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of notification schemes IDs to be filtered by */
    id?: (string)[];
    /** The list of projects IDs to be filtered by */
    projectId?: (string)[];
    /** When set to true, returns only the default notification scheme. If you provide project IDs not associated with the default, returns an empty page. The default value is false. */
    onlyDefault?: boolean;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `all` Returns all expandable information  *  `field` Returns information about any custom fields assigned to receive an event  *  `group` Returns information about any groups assigned to receive an event  *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information  *  `projectRole` Returns information about any project roles assigned to receive an event  *  `user` Returns information about any users assigned to receive an event */
    expand?: string;
  }) => Promise<PageBeanNotificationScheme>;

  /**
   * Create notification scheme
   */
  createNotificationScheme: (input: {
    /** The description of the notification scheme. */
    description?: string;
    /** The name of the notification scheme. Must be unique (case-insensitive). */
    name: string;
    /** The list of notifications which should be added to the notification scheme. */
    notificationSchemeEvents?: (NotificationSchemeEventDetails)[];
    [key: string]: unknown;
  }) => Promise<NotificationSchemeId>;

  /**
   * Get projects using notification schemes paginated
   */
  getNotificationSchemeToProjectMappings: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of notifications scheme IDs to be filtered out */
    notificationSchemeId?: (string)[];
    /** The list of project IDs to be filtered out */
    projectId?: (string)[];
  }) => Promise<PageBeanNotificationSchemeAndProjectMappingJsonBean>;

  /**
   * Get notification scheme
   */
  getNotificationScheme: (input: {
    /** The ID of the notification scheme. Use [Get notification schemes paginated](#api-rest-api-3-notificationscheme-get) to get a list of notification scheme IDs. */
    id: number;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `all` Returns all expandable information  *  `field` Returns information about any custom fields assigned to receive an event  *  `group` Returns information about any groups assigned to receive an event  *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information  *  `projectRole` Returns information about any project roles assigned to receive an event  *  `user` Returns information about any users assigned to receive an event */
    expand?: string;
  }) => Promise<NotificationScheme>;

  /**
   * Update notification scheme
   */
  updateNotificationScheme: (input: {
    /** The description of the notification scheme. */
    description?: string;
    /** The name of the notification scheme. Must be unique. */
    name?: string;
    /** The ID of the notification scheme. */
    id: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Add notifications to notification scheme
   */
  addNotifications: (input: {
    /** The list of notifications which should be added to the notification scheme. */
    notificationSchemeEvents: (NotificationSchemeEventDetails)[];
    /** The ID of the notification scheme. */
    id: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Delete notification scheme
   */
  deleteNotificationScheme: (input: {
    /** The ID of the notification scheme. */
    notificationSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Remove notification from notification scheme
   */
  removeNotificationFromNotificationScheme: (input: {
    /** The ID of the notification scheme. */
    notificationSchemeId: string;
    /** The ID of the notification. */
    notificationId: string;
  }) => Promise<unknown>;

  /**
   * Get all permissions
   */
  getAllPermissions: () => Promise<Permissions>;

  /**
   * Get bulk permissions
   */
  getBulkPermissions: (input: {
    /** The account ID of a user. */
    accountId?: string;
    /** Global permissions to look up. */
    globalPermissions?: (string)[];
    /** Project permissions with associated projects and issues to look up. */
    projectPermissions?: (BulkProjectPermissions)[];
  }) => Promise<BulkPermissionGrants>;

  /**
   * Get permitted projects
   */
  getPermittedProjects: (input: {
    /** A list of permission keys. */
    permissions: (string)[];
  }) => Promise<PermittedProjects>;

  /**
   * Get all permission schemes
   */
  getAllPermissionSchemes: (input: {
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission. */
    expand?: string;
  }) => Promise<PermissionSchemes>;

  /**
   * Create permission scheme
   */
  createPermissionScheme: (input: {
    /** A description for the permission scheme. */
    description?: string;
    /** The expand options available for the permission scheme. */
    expand?: string;
    /** The ID of the permission scheme. */
    id?: number;
    /** The name of the permission scheme. Must be unique. */
    name: string;
    /** The permission scheme to create or update. See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information. */
    permissions?: (PermissionGrant)[];
    /** The scope of the permission scheme. */
    scope?: Scope;
    /** The URL of the permission scheme. */
    self?: string;
    [key: string]: unknown;
  }, options?: { query?: { expand?: string } }) => Promise<PermissionScheme>;

  /**
   * Delete permission scheme
   */
  deletePermissionScheme: (input: {
    /** The ID of the permission scheme being deleted. */
    schemeId: number;
  }) => Promise<unknown>;

  /**
   * Get permission scheme
   */
  getPermissionScheme: (input: {
    /** The ID of the permission scheme to return. */
    schemeId: number;
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission. */
    expand?: string;
  }) => Promise<PermissionScheme>;

  /**
   * Update permission scheme
   */
  updatePermissionScheme: (input: {
    /** A description for the permission scheme. */
    description?: string;
    /** The expand options available for the permission scheme. */
    expand?: string;
    /** The ID of the permission scheme. */
    id?: number;
    /** The name of the permission scheme. Must be unique. */
    name: string;
    /** The permission scheme to create or update. See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information. */
    permissions?: (PermissionGrant)[];
    /** The scope of the permission scheme. */
    scope?: Scope;
    /** The URL of the permission scheme. */
    self?: string;
    /** The ID of the permission scheme to update. */
    schemeId: number;
    [key: string]: unknown;
  }, options?: { query?: { expand?: string } }) => Promise<PermissionScheme>;

  /**
   * Get permission scheme grants
   */
  getPermissionSchemeGrants: (input: {
    /** The ID of the permission scheme. */
    schemeId: number;
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  `permissions` Returns all permission grants for each permission scheme.  *  `user` Returns information about the user who is granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `projectRole` Returns information about the project role granted the permission.  *  `field` Returns information about the custom field granted the permission.  *  `all` Returns all expandable information. */
    expand?: string;
  }) => Promise<PermissionGrants>;

  /**
   * Create permission grant
   */
  createPermissionGrant: (input: {
    /** The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information. */
    holder?: PermissionHolder;
    /** The ID of the permission granted details. */
    id?: number;
    /** The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See [Built-in permissions](../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions. */
    permission?: string;
    /** The URL of the permission granted details. */
    self?: string;
    /** The ID of the permission scheme in which to create a new permission grant. */
    schemeId: number;
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  `permissions` Returns all permission grants for each permission scheme.  *  `user` Returns information about the user who is granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `projectRole` Returns information about the project role granted the permission.  *  `field` Returns information about the custom field granted the permission.  *  `all` Returns all expandable information. */
    expand?: string;
    [key: string]: unknown;
  }) => Promise<PermissionGrant>;

  /**
   * Delete permission scheme grant
   */
  deletePermissionSchemeEntity: (input: {
    /** The ID of the permission scheme to delete the permission grant from. */
    schemeId: number;
    /** The ID of the permission grant to delete. */
    permissionId: number;
  }) => Promise<unknown>;

  /**
   * Get permission scheme grant
   */
  getPermissionSchemeGrant: (input: {
    /** The ID of the permission scheme. */
    schemeId: number;
    /** The ID of the permission grant. */
    permissionId: number;
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission. */
    expand?: string;
  }) => Promise<PermissionGrant>;

  /**
   * Get plans paginated
   */
  getPlans: (input: {
    /** Whether to include trashed plans in the results. */
    includeTrashed?: boolean;
    /** Whether to include archived plans in the results. */
    includeArchived?: boolean;
    /** The cursor to start from. If not provided, the first page will be returned. */
    cursor?: string;
    /** The maximum number of plans to return per page. The maximum value is 50. The default value is 50. */
    maxResults?: number;
  }) => Promise<PageWithCursorGetPlanResponseForPage>;

  /**
   * Create plan
   */
  createPlan: (input: {
    /** The cross-project releases to include in the plan. */
    crossProjectReleases?: (CreateCrossProjectReleaseRequest)[];
    /** The custom fields for the plan. */
    customFields?: (CreateCustomFieldRequest)[];
    /** The exclusion rules for the plan. */
    exclusionRules?: CreateExclusionRulesRequest;
    /** The issue sources to include in the plan. */
    issueSources: (CreateIssueSourceRequest)[];
    /** The account ID of the plan lead. */
    leadAccountId?: string;
    /** The plan name. */
    name: string;
    /** The permissions for the plan. */
    permissions?: (CreatePermissionRequest)[];
    /** The scheduling settings for the plan. */
    scheduling: CreateSchedulingRequest;
    /** Whether to accept group IDs instead of group names. Group names are deprecated. */
    useGroupId?: boolean;
  }) => Promise<number>;

  /**
   * Get plan
   */
  getPlan: (input: {
    /** The ID of the plan. */
    planId: number;
    /** Whether to return group IDs instead of group names. Group names are deprecated. */
    useGroupId?: boolean;
  }) => Promise<GetPlanResponse>;

  /**
   * Update plan
   */
  updatePlan: (input: {
    body: { [key: string]: unknown };
    /** The ID of the plan. */
    planId: number;
    /** Whether to accept group IDs instead of group names. Group names are deprecated. */
    useGroupId?: boolean;
  }) => Promise<unknown>;

  /**
   * Archive plan
   */
  archivePlan: (input: {
    /** The ID of the plan. */
    planId: number;
  }) => Promise<unknown>;

  /**
   * Duplicate plan
   */
  duplicatePlan: (input: {
    /** The plan name. */
    name: string;
    /** The ID of the plan. */
    planId: number;
  }) => Promise<number>;

  /**
   * Get teams in plan paginated
   */
  getTeams: (input: {
    /** The ID of the plan. */
    planId: number;
    /** The cursor to start from. If not provided, the first page will be returned. */
    cursor?: string;
    /** The maximum number of plan teams to return per page. The maximum value is 50. The default value is 50. */
    maxResults?: number;
  }) => Promise<PageWithCursorGetTeamResponseForPage>;

  /**
   * Add Atlassian team to plan
   */
  addAtlassianTeam: (input: {
    /** The capacity for the Atlassian team. */
    capacity?: number;
    /** The Atlassian team ID. */
    id: string;
    /** The ID of the issue source for the Atlassian team. */
    issueSourceId?: number;
    /** The planning style for the Atlassian team. This must be "Scrum" or "Kanban". */
    planningStyle: "Scrum" | "Kanban";
    /** The sprint length for the Atlassian team. */
    sprintLength?: number;
    /** The ID of the plan. */
    planId: number;
  }) => Promise<unknown>;

  /**
   * Remove Atlassian team from plan
   */
  removeAtlassianTeam: (input: {
    /** The ID of the plan. */
    planId: number;
    /** The ID of the Atlassian team. */
    atlassianTeamId: string;
  }) => Promise<unknown>;

  /**
   * Get Atlassian team in plan
   */
  getAtlassianTeam: (input: {
    /** The ID of the plan. */
    planId: number;
    /** The ID of the Atlassian team. */
    atlassianTeamId: string;
  }) => Promise<GetAtlassianTeamResponse>;

  /**
   * Update Atlassian team in plan
   */
  updateAtlassianTeam: (input: {
    body: { [key: string]: unknown };
    /** The ID of the plan. */
    planId: number;
    /** The ID of the Atlassian team. */
    atlassianTeamId: string;
  }) => Promise<unknown>;

  /**
   * Create plan-only team
   */
  createPlanOnlyTeam: (input: {
    /** The capacity for the plan-only team. */
    capacity?: number;
    /** The ID of the issue source for the plan-only team. */
    issueSourceId?: number;
    /** The account IDs of the plan-only team members. */
    memberAccountIds?: (string)[];
    /** The plan-only team name. */
    name: string;
    /** The planning style for the plan-only team. This must be "Scrum" or "Kanban". */
    planningStyle: "Scrum" | "Kanban";
    /** The sprint length for the plan-only team. */
    sprintLength?: number;
    /** The ID of the plan. */
    planId: number;
  }) => Promise<number>;

  /**
   * Delete plan-only team
   */
  deletePlanOnlyTeam: (input: {
    /** The ID of the plan. */
    planId: number;
    /** The ID of the plan-only team. */
    planOnlyTeamId: number;
  }) => Promise<unknown>;

  /**
   * Get plan-only team
   */
  getPlanOnlyTeam: (input: {
    /** The ID of the plan. */
    planId: number;
    /** The ID of the plan-only team. */
    planOnlyTeamId: number;
  }) => Promise<GetPlanOnlyTeamResponse>;

  /**
   * Update plan-only team
   */
  updatePlanOnlyTeam: (input: {
    body: { [key: string]: unknown };
    /** The ID of the plan. */
    planId: number;
    /** The ID of the plan-only team. */
    planOnlyTeamId: number;
  }) => Promise<unknown>;

  /**
   * Trash plan
   */
  trashPlan: (input: {
    /** The ID of the plan. */
    planId: number;
  }) => Promise<unknown>;

  /**
   * Get priorities
   */
  getPriorities: () => Promise<(Priority)[]>;

  /**
   * Create priority
   */
  createPriority: (input: {
    /** The ID for the avatar for the priority. Either the iconUrl or avatarId must be defined, but not both. This parameter is nullable and will become mandatory once the iconUrl parameter is deprecated. */
    avatarId?: number;
    /** The description of the priority. */
    description?: string | null;
    /** The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. Either the iconUrl or avatarId must be defined, but not both. */
    iconUrl?: "/images/icons/priorities/blocker.png" | "/images/icons/priorities/critical.png" | "/images/icons/priorities/high.png" | "/images/icons/priorities/highest.png" | "/images/icons/priorities/low.png" | "/images/icons/priorities/lowest.png" | "/images/icons/priorities/major.png" | "/images/icons/priorities/medium.png" | "/images/icons/priorities/minor.png" | "/images/icons/priorities/trivial.png" | "/images/icons/priorities/blocker_new.png" | "/images/icons/priorities/critical_new.png" | "/images/icons/priorities/high_new.png" | "/images/icons/priorities/highest_new.png" | "/images/icons/priorities/low_new.png" | "/images/icons/priorities/lowest_new.png" | "/images/icons/priorities/major_new.png" | "/images/icons/priorities/medium_new.png" | "/images/icons/priorities/minor_new.png" | "/images/icons/priorities/trivial_new.png" | null;
    /** The name of the priority. Must be unique. */
    name: string;
    /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
    statusColor: string;
    [key: string]: unknown;
  }) => Promise<PriorityId>;

  /**
   * Set default priority
   */
  setDefaultPriority: (input: {
    /** The ID of the new default issue priority. Must be an existing ID or null. Setting this to null erases the default priority setting. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Move priorities
   */
  movePriorities: (input: {
    /** The ID of the priority. Required if `position` isn't provided. */
    after?: string;
    /** The list of issue IDs to be reordered. Cannot contain duplicates nor after ID. */
    ids: (string)[];
    /** The position for issue priorities to be moved to. Required if `after` isn't provided. */
    position?: string;
  }) => Promise<unknown>;

  /**
   * Search priorities
   */
  searchPriorities: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`. */
    id?: (string)[];
    /** The list of projects IDs. To include multiple IDs, provide an ampersand-separated list. For example, `projectId=10010&projectId=10111`. */
    projectId?: (string)[];
    /** The name of priority to search for. */
    priorityName?: string;
    /** Whether only the default priority is returned. */
    onlyDefault?: boolean;
    /** Use `schemes` to return the associated priority schemes for each priority. Limited to returning first 15 priority schemes per priority. */
    expand?: string;
  }) => Promise<PageBeanPriority>;

  /**
   * Delete priority
   */
  deletePriority: (input: {
    /** The ID of the issue priority. */
    id: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Get priority
   */
  getPriority: (input: {
    /** The ID of the issue priority. */
    id: string;
  }) => Promise<Priority>;

  /**
   * Update priority
   */
  updatePriority: (input: {
    /** The ID for the avatar for the priority. This parameter is nullable and both iconUrl and avatarId cannot be defined. */
    avatarId?: number;
    /** The description of the priority. */
    description?: string | null;
    /** The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. Both iconUrl and avatarId cannot be defined. */
    iconUrl?: "/images/icons/priorities/blocker.png" | "/images/icons/priorities/critical.png" | "/images/icons/priorities/high.png" | "/images/icons/priorities/highest.png" | "/images/icons/priorities/low.png" | "/images/icons/priorities/lowest.png" | "/images/icons/priorities/major.png" | "/images/icons/priorities/medium.png" | "/images/icons/priorities/minor.png" | "/images/icons/priorities/trivial.png" | "/images/icons/priorities/blocker_new.png" | "/images/icons/priorities/critical_new.png" | "/images/icons/priorities/high_new.png" | "/images/icons/priorities/highest_new.png" | "/images/icons/priorities/low_new.png" | "/images/icons/priorities/lowest_new.png" | "/images/icons/priorities/major_new.png" | "/images/icons/priorities/medium_new.png" | "/images/icons/priorities/minor_new.png" | "/images/icons/priorities/trivial_new.png" | null;
    /** The name of the priority. Must be unique. */
    name?: string | null;
    /** The status color of the priority in 3-digit or 6-digit hexadecimal format. */
    statusColor?: string | null;
    /** The ID of the issue priority. */
    id: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Get priority schemes
   */
  getPrioritySchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** A set of priority IDs to filter by. To include multiple IDs, provide an ampersand-separated list. For example, `priorityId=10000&priorityId=10001`. */
    priorityId?: (number)[];
    /** A set of priority scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `schemeId=10000&schemeId=10001`. */
    schemeId?: (number)[];
    /** The name of scheme to search for. */
    schemeName?: string;
    /** Whether only the default priority is returned. */
    onlyDefault?: boolean;
    /** The ordering to return the priority schemes by. */
    orderBy?: "name" | "+name" | "-name";
    /** A comma separated list of additional information to return. "priorities" will return priorities associated with the priority scheme. "projects" will return projects associated with the priority scheme. `expand=priorities,projects`. */
    expand?: string;
  }) => Promise<PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects>;

  /**
   * Create priority scheme
   */
  createPriorityScheme: (input: {
    /** The ID of the default priority for the priority scheme. */
    defaultPriorityId: number;
    /** The description of the priority scheme. */
    description?: string;
    /** Instructions to migrate the priorities of issues.  `in` mappings are used to migrate the priorities of issues to priorities used within the priority scheme.  `out` mappings are used to migrate the priorities of issues to priorities not used within the priority scheme.   *  When **priorities** are **added** to the new priority scheme, no mapping needs to be provided as the new priorities are not used by any issues.  *  When **priorities** are **removed** from the new priority scheme, no mapping needs to be provided as the removed priorities are not used by any issues.  *  When **projects** are **added** to the priority scheme, the priorities of issues in those projects might need to be migrated to new priorities used by the priority scheme. This can occur when the current scheme does not use all the priorities in the project(s)' priority scheme(s).           *  An `in` mapping must be provided for each of these priorities.  *  When **projects** are **removed** from the priority scheme, no mapping needs to be provided as the removed projects are not using the priorities of the new priority scheme.  For more information on `in` and `out` mappings, see the child properties documentation for the `PriorityMapping` object below. */
    mappings?: PriorityMapping;
    /** The name of the priority scheme. Must be unique. */
    name: string;
    /** The IDs of priorities in the scheme. */
    priorityIds: (number)[];
    /** The IDs of projects that will use the priority scheme. */
    projectIds?: (number)[];
  }) => Promise<PrioritySchemeId>;

  /**
   * Suggested priorities for mappings
   */
  suggestedPrioritiesForMappings: (input: {
    /** The maximum number of results that could be on the page. */
    maxResults?: number;
    /** The priority changes in the scheme. */
    priorities?: SuggestedMappingsForPrioritiesRequestBean;
    /** The project changes in the scheme. */
    projects?: SuggestedMappingsForProjectsRequestBean;
    /** The id of the priority scheme. */
    schemeId?: number;
    /** The index of the first item returned on the page. */
    startAt?: number;
  }) => Promise<PageBeanPriorityWithSequence>;

  /**
   * Get available priorities by priority scheme
   */
  getAvailablePrioritiesByPriorityScheme: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The string to query priorities on by name. */
    query?: string;
    /** The priority scheme ID. */
    schemeId: string;
    /** A list of priority IDs to exclude from the results. */
    exclude?: (string)[];
  }) => Promise<PageBeanPriorityWithSequence>;

  /**
   * Delete priority scheme
   */
  deletePriorityScheme: (input: {
    /** The priority scheme ID. */
    schemeId: number;
  }) => Promise<unknown>;

  /**
   * Update priority scheme
   */
  updatePriorityScheme: (input: {
    /** The default priority of the scheme. */
    defaultPriorityId?: number;
    /** The description of the priority scheme. */
    description?: string;
    /** Instructions to migrate the priorities of issues.  `in` mappings are used to migrate the priorities of issues to priorities used within the priority scheme.  `out` mappings are used to migrate the priorities of issues to priorities not used within the priority scheme.   *  When **priorities** are **added** to the priority scheme, no mapping needs to be provided as the new priorities are not used by any issues.  *  When **priorities** are **removed** from the priority scheme, issues that are using those priorities must be migrated to new priorities used by the priority scheme.           *  An `in` mapping must be provided for each of these priorities.  *  When **projects** are **added** to the priority scheme, the priorities of issues in those projects might need to be migrated to new priorities used by the priority scheme. This can occur when the current scheme does not use all the priorities in the project(s)' priority scheme(s).           *  An `in` mapping must be provided for each of these priorities.  *  When **projects** are **removed** from the priority scheme, the priorities of issues in those projects might need to be migrated to new priorities within the **Default Priority Scheme** that are not used by the priority scheme. This can occur when the **Default Priority Scheme** does not use all the priorities within the current scheme.           *  An `out` mapping must be provided for each of these priorities.  For more information on `in` and `out` mappings, see the child properties documentation for the `PriorityMapping` object below. */
    mappings?: PriorityMapping;
    /** The name of the priority scheme. Must be unique. */
    name?: string;
    /** The priorities in the scheme. */
    priorities?: UpdatePrioritiesInSchemeRequestBean;
    /** The projects in the scheme. */
    projects?: UpdateProjectsInSchemeRequestBean;
    /** The ID of the priority scheme. */
    schemeId: number;
  }) => Promise<UpdatePrioritySchemeResponseBean>;

  /**
   * Get priorities by priority scheme
   */
  getPrioritiesByPriorityScheme: (input: {
    /** The priority scheme ID. */
    schemeId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
  }) => Promise<PageBeanPriorityWithSequence>;

  /**
   * Get projects by priority scheme
   */
  getProjectsByPriorityScheme: (input: {
    /** The priority scheme ID. */
    schemeId: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The project IDs to filter by. For example, `projectId=10000&projectId=10001`. */
    projectId?: (number)[];
    /** The string to query projects on by name. */
    query?: string;
  }) => Promise<PageBeanProject>;

  /**
   * Get all projects
   */
  getAllProjects: (input: {
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:   *  `description` Returns the project description.  *  `issueTypes` Returns all issue types associated with the project.  *  `lead` Returns information about the project lead.  *  `projectKeys` Returns all project keys associated with the project. */
    expand?: string;
    /** Returns the user's most recently accessed projects. You may specify the number of results to return up to a maximum of 20. If access is anonymous, then the recently accessed projects are based on the current HTTP session. */
    recent?: number;
    /** A list of project properties to return for the project. This parameter accepts a comma-separated list. */
    properties?: (string)[];
  }) => Promise<(Project)[]>;

  /**
   * Create project
   */
  createProject: (input: {
    /** The default assignee when creating issues for this project. */
    assigneeType?: "PROJECT_LEAD" | "UNASSIGNED";
    /** An integer value for the project's avatar. */
    avatarId?: number;
    /** The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation. */
    categoryId?: number;
    /** A brief description of the project. */
    description?: string;
    /** Deprecated use [fieldScheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) instead. The ID of the field configuration scheme for the project. Use the [Get all field configuration schemes](#api-rest-api-3-fieldconfigurationscheme-get) operation to get a list of field configuration scheme IDs. If you specify the field configuration scheme you cannot specify the project template key. */
    fieldConfigurationScheme?: number;
    /** The ID of the field scheme for the project. Use the [Get field schemes](#api-rest-api-3-config-fieldschemes-get) operation to get a list of field scheme IDs. If you specify the field scheme you cannot specify the project template key. */
    fieldScheme?: number;
    /** The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue security scheme IDs. */
    issueSecurityScheme?: number;
    /** The ID of the issue type scheme for the project. Use the [Get all issue type schemes](#api-rest-api-3-issuetypescheme-get) operation to get a list of issue type scheme IDs. If you specify the issue type scheme you cannot specify the project template key. */
    issueTypeScheme?: number;
    /** The ID of the issue type screen scheme for the project. Use the [Get all issue type screen schemes](#api-rest-api-3-issuetypescreenscheme-get) operation to get a list of issue type screen scheme IDs. If you specify the issue type screen scheme you cannot specify the project template key. */
    issueTypeScreenScheme?: number;
    /** Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters. */
    key: string;
    /** This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. The user name of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be provided with `leadAccountId`. */
    lead?: string;
    /** The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be provided with `lead`. */
    leadAccountId?: string;
    /** The name of the project. */
    name: string;
    /** The ID of the notification scheme for the project. Use the [Get notification schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of notification scheme IDs. */
    notificationScheme?: number;
    /** The ID of the permission scheme for the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all permission scheme IDs. */
    permissionScheme?: number;
    /** A predefined configuration for a project. The type of the `projectTemplateKey` must match with the type of the `projectTypeKey`. */
    projectTemplateKey?: "com.pyxis.greenhopper.jira:gh-simplified-agility-kanban" | "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum" | "com.pyxis.greenhopper.jira:gh-simplified-basic" | "com.pyxis.greenhopper.jira:gh-simplified-kanban-classic" | "com.pyxis.greenhopper.jira:gh-simplified-scrum-classic" | "com.pyxis.greenhopper.jira:gh-cross-team-template" | "com.pyxis.greenhopper.jira:gh-cross-team-planning-template" | "com.atlassian.servicedesk:simplified-it-service-management" | "com.atlassian.servicedesk:simplified-it-service-management-basic" | "com.atlassian.servicedesk:simplified-it-service-management-operations" | "com.atlassian.servicedesk:simplified-internal-service-desk" | "com.atlassian.servicedesk:simplified-external-service-desk" | "com.atlassian.servicedesk:simplified-hr-service-desk" | "com.atlassian.servicedesk:simplified-facilities-service-desk" | "com.atlassian.servicedesk:simplified-legal-service-desk" | "com.atlassian.servicedesk:simplified-marketing-service-desk" | "com.atlassian.servicedesk:simplified-finance-service-desk" | "com.atlassian.servicedesk:simplified-analytics-service-desk" | "com.atlassian.servicedesk:simplified-design-service-desk" | "com.atlassian.servicedesk:simplified-sales-service-desk" | "com.atlassian.servicedesk:simplified-halp-service-desk" | "com.atlassian.servicedesk:next-gen-it-service-desk" | "com.atlassian.servicedesk:next-gen-hr-service-desk" | "com.atlassian.servicedesk:next-gen-legal-service-desk" | "com.atlassian.servicedesk:next-gen-marketing-service-desk" | "com.atlassian.servicedesk:next-gen-facilities-service-desk" | "com.atlassian.servicedesk:next-gen-general-service-desk" | "com.atlassian.servicedesk:next-gen-analytics-service-desk" | "com.atlassian.servicedesk:next-gen-finance-service-desk" | "com.atlassian.servicedesk:next-gen-design-service-desk" | "com.atlassian.servicedesk:next-gen-sales-service-desk" | "com.atlassian.jira-core-project-templates:jira-core-simplified-content-management" | "com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval" | "com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking" | "com.atlassian.jira-core-project-templates:jira-core-simplified-process-control" | "com.atlassian.jira-core-project-templates:jira-core-simplified-procurement" | "com.atlassian.jira-core-project-templates:jira-core-simplified-project-management" | "com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment" | "com.atlassian.jira-core-project-templates:jira-core-simplified-task-" | "com.atlassian.jcs:customer-service-management";
    /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which defines the application-specific feature set. If you don't specify the project template you have to specify the project type. */
    projectTypeKey?: "software" | "service_desk" | "business";
    /** A link to information about this project, such as project documentation */
    url?: string;
    /** The ID of the workflow scheme for the project. Use the [Get all workflow schemes](#api-rest-api-3-workflowscheme-get) operation to get a list of workflow scheme IDs. If you specify the workflow scheme you cannot specify the project template key. */
    workflowScheme?: number;
  }) => Promise<ProjectIdentifiers>;

  /**
   * Create custom project
   */
  createProjectWithCustomTemplate: (input: {
    details?: CustomTemplatesProjectDetails;
    template?: CustomTemplateRequestDto;
  }) => Promise<unknown>;

  /**
   * Edit a custom project template
   */
  editTemplate: (input: {
    /** The description of the template */
    templateDescription?: string;
    templateGenerationOptions?: CustomTemplateOptions;
    /** The unique identifier of the template */
    templateKey?: string;
    /** The name of the template */
    templateName?: string;
  }) => Promise<unknown>;

  /**
   * Gets a custom project template
   */
  liveTemplate: (input: {
    /** optional - The \{@link String\} containing the project key linked to the custom template to retrieve */
    projectId?: string;
    /** optional - The \{@link String\} containing the key of the custom template to retrieve */
    templateKey?: string;
  }) => Promise<ProjectTemplateModel>;

  /**
   * Deletes a custom project template
   */
  removeTemplate: (input: {
    /** The \{@link String\} containing the key of the custom template to remove */
    templateKey: string;
  }) => Promise<unknown>;

  /**
   * Save a custom project template
   */
  saveTemplate: (input: {
    /** The description of the template */
    templateDescription?: string;
    templateFromProjectRequest?: SaveProjectTemplateRequest;
    /** The name of the template */
    templateName?: string;
  }) => Promise<SaveTemplateResponse>;

  /**
   * Get recent projects
   */
  getRecent: (input: {
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:   *  `description` Returns the project description.  *  `projectKeys` Returns all project keys associated with a project.  *  `lead` Returns information about the project lead.  *  `issueTypes` Returns all issue types associated with the project.  *  `url` Returns the URL associated with the project.  *  `permissions` Returns the permissions associated with the project.  *  `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project.  *  `*` Returns the project with all available expand options. */
    expand?: string;
    /** EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list. Invalid property names are ignored. */
    properties?: (StringList)[];
  }) => Promise<(Project)[]>;

  /**
   * Get projects paginated
   */
  searchProjects: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. Must be less than or equal to 100. If a value greater than 100 is provided, the `maxResults` parameter will default to 100. */
    maxResults?: number;
    /** [Order](#ordering) the results by a field.   *  `category` Sorts by project category. A complete list of category IDs is found using [Get all project categories](#api-rest-api-3-projectCategory-get).  *  `issueCount` Sorts by the total number of issues in each project.  *  `key` Sorts by project key.  *  `lastIssueUpdatedTime` Sorts by the last issue update time.  *  `name` Sorts by project name.  *  `owner` Sorts by project lead.  *  `archivedDate` EXPERIMENTAL. Sorts by project archived date.  *  `deletedDate` EXPERIMENTAL. Sorts by project deleted date. */
    orderBy?: "category" | "-category" | "+category" | "key" | "-key" | "+key" | "name" | "-name" | "+name" | "owner" | "-owner" | "+owner" | "issueCount" | "-issueCount" | "+issueCount" | "lastIssueUpdatedDate" | "-lastIssueUpdatedDate" | "+lastIssueUpdatedDate" | "archivedDate" | "+archivedDate" | "-archivedDate" | "deletedDate" | "+deletedDate" | "-deletedDate";
    /** The project IDs to filter the results by. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Up to 50 project IDs can be provided. */
    id?: (number)[];
    /** The project keys to filter the results by. To include multiple keys, provide an ampersand-separated list. For example, `keys=PA&keys=PB`. Up to 50 project keys can be provided. */
    keys?: (string)[];
    /** Filter the results using a literal string. Projects with a matching `key` or `name` are returned (case insensitive). */
    query?: string;
    /** Orders results by the [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes). This parameter accepts a comma-separated list. Valid values are `business`, `service_desk`, and `software`. */
    typeKey?: string;
    /** The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation. */
    categoryId?: number;
    /** Filter results by projects for which the user can:   *  `view` the project, meaning that they have one of the following permissions:           *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.      *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.      *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).  *  `browse` the project, meaning that they have the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.  *  `edit` the project, meaning that they have one of the following permissions:           *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.      *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).  *  `create` the project, meaning that they have the *Create issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the issue is created. */
    action?: "view" | "browse" | "edit" | "create";
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:   *  `description` Returns the project description.  *  `projectKeys` Returns all project keys associated with a project.  *  `lead` Returns information about the project lead.  *  `issueTypes` Returns all issue types associated with the project.  *  `url` Returns the URL associated with the project.  *  `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project. */
    expand?: string;
    /** EXPERIMENTAL. Filter results by project status:   *  `live` Search live projects.  *  `archived` Search archived projects.  *  `deleted` Search deleted projects, those in the recycle bin. */
    status?: ("live" | "archived" | "deleted")[];
    /** EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list. */
    properties?: (StringList)[];
    /** EXPERIMENTAL. A query string used to search properties. The query string cannot be specified using a JSON object. For example, to search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use `[thepropertykey].something.nested=1`. Note that the propertyQuery key is enclosed in square brackets to enable searching where the propertyQuery key includes dot (.) or equals (=) characters. Note that `thepropertykey` is only returned when included in `properties`. */
    propertyQuery?: string;
  }) => Promise<PageBeanProject>;

  /**
   * Get all project types
   */
  getAllProjectTypes: () => Promise<(ProjectType)[]>;

  /**
   * Get licensed project types
   */
  getAllAccessibleProjectTypes: () => Promise<(ProjectType)[]>;

  /**
   * Get project type by key
   */
  getProjectTypeByKey: (input: {
    /** The key of the project type. */
    projectTypeKey: "software" | "service_desk" | "business" | "product_discovery";
  }) => Promise<ProjectType>;

  /**
   * Get accessible project type by key
   */
  getAccessibleProjectTypeByKey: (input: {
    /** The key of the project type. */
    projectTypeKey: "software" | "service_desk" | "business" | "product_discovery";
  }) => Promise<ProjectType>;

  /**
   * Delete project
   */
  deleteProject: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** Whether this project is placed in the Jira recycle bin where it will be available for restoration. */
    enableUndo?: boolean;
  }) => Promise<unknown>;

  /**
   * Get project
   */
  getProject: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:   *  `description` The project description.  *  `issueTypes` The issue types associated with the project.  *  `lead` The project lead.  *  `projectKeys` All project keys associated with the project.  *  `issueTypeHierarchy` The project issue type hierarchy. */
    expand?: string;
    /** A list of project properties to return for the project. This parameter accepts a comma-separated list. */
    properties?: (string)[];
  }) => Promise<Project>;

  /**
   * Update project
   */
  updateProject: (input: {
    /** The default assignee when creating issues for this project. */
    assigneeType?: "PROJECT_LEAD" | "UNASSIGNED";
    /** An integer value for the project's avatar. */
    avatarId?: number;
    /** The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation. To remove the project category from the project, set the value to `-1.` */
    categoryId?: number;
    /** A brief description of the project. */
    description?: string;
    /** The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue security scheme IDs. */
    issueSecurityScheme?: number;
    /** Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters. */
    key?: string;
    /** This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. The user name of the project lead. Cannot be provided with `leadAccountId`. */
    lead?: string;
    /** The account ID of the project lead. Cannot be provided with `lead`. */
    leadAccountId?: string;
    /** The name of the project. */
    name?: string;
    /** The ID of the notification scheme for the project. Use the [Get notification schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of notification scheme IDs. */
    notificationScheme?: number;
    /** The ID of the permission scheme for the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all permission scheme IDs. */
    permissionScheme?: number;
    /** Previous project keys to be released from the current project. Released keys must belong to the current project and not contain the current project key */
    releasedProjectKeys?: (string)[];
    /** A link to information about this project, such as project documentation */
    url?: string;
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:   *  `description` The project description.  *  `issueTypes` The issue types associated with the project.  *  `lead` The project lead.  *  `projectKeys` All project keys associated with the project. */
    expand?: string;
  }) => Promise<Project>;

  /**
   * Archive project
   */
  archiveProject: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Set project avatar
   */
  updateProjectAvatar: (input: {
    /** The file name of the avatar icon. Returned for system avatars. */
    fileName?: string;
    /** The ID of the avatar. */
    id: string;
    /** Whether the avatar can be deleted. */
    isDeletable?: boolean;
    /** Whether the avatar is used in Jira. For example, shown as a project's avatar. */
    isSelected?: boolean;
    /** Whether the avatar is a system avatar. */
    isSystemAvatar?: boolean;
    /** The owner of the avatar. For a system avatar the owner is null (and nothing is returned). For non-system avatars this is the appropriate identifier, such as the ID for a project or the account ID for a user. */
    owner?: string;
    /** The list of avatar icon URLs. */
    urls?: { [key: string]: string | undefined };
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Delete project avatar
   */
  deleteProjectAvatar: (input: {
    /** The project ID or (case-sensitive) key. */
    projectIdOrKey: string;
    /** The ID of the avatar. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Load project avatar
   */
  createProjectAvatar: (input: {
    body: unknown;
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: string;
    /** The X coordinate of the top-left corner of the crop region. */
    x?: number;
    /** The Y coordinate of the top-left corner of the crop region. */
    y?: number;
    /** The length of each side of the crop region. */
    size?: number;
  }) => Promise<Avatar>;

  /**
   * Get all project avatars
   */
  getAllProjectAvatars: (input: {
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: string;
  }) => Promise<ProjectAvatars>;

  /**
   * Get the classification configuration for a project
   */
  getProjectClassificationConfig: (input: {
    /** The project ID or project key (case-sensitive). */
    projectIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Remove the default data classification level from a project
   */
  removeDefaultProjectClassification: (input: {
    /** The project ID or project key (case-sensitive). */
    projectIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Get the default data classification level of a project
   */
  getDefaultProjectClassification: (input: {
    /** The project ID or project key (case-sensitive). */
    projectIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Update the default data classification level of a project
   */
  updateDefaultProjectClassification: (input: {
    /** The ID of the project classification. */
    id: string;
    /** The project ID or project key (case-sensitive). */
    projectIdOrKey: string;
  }) => Promise<unknown>;

  /**
   * Get project components paginated
   */
  getProjectComponentsPaginated: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** [Order](#ordering) the results by a field:   *  `description` Sorts by the component description.  *  `issueCount` Sorts by the count of issues associated with the component.  *  `lead` Sorts by the user key of the component's project lead.  *  `name` Sorts by component name. */
    orderBy?: "description" | "-description" | "+description" | "issueCount" | "-issueCount" | "+issueCount" | "lead" | "-lead" | "+lead" | "name" | "-name" | "+name";
    /** The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`. */
    componentSource?: "jira" | "compass" | "auto";
    /** Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive). */
    query?: string;
  }) => Promise<PageBeanComponentWithIssueCount>;

  /**
   * Get project components
   */
  getProjectComponents: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`. */
    componentSource?: "jira" | "compass" | "auto";
  }) => Promise<(ProjectComponent)[]>;

  /**
   * Delete project asynchronously
   */
  deleteProjectAsynchronously: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Get project features
   */
  getFeaturesForProject: (input: {
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: string;
  }) => Promise<ContainerForProjectFeatures>;

  /**
   * Set project feature state
   */
  toggleFeatureForProject: (input: {
    /** The feature state. */
    state?: "ENABLED" | "DISABLED" | "COMING_SOON";
    /** The ID or (case-sensitive) key of the project. */
    projectIdOrKey: string;
    /** The key of the feature. */
    featureKey: string;
  }) => Promise<ContainerForProjectFeatures>;

  /**
   * Get project property keys
   */
  getProjectPropertyKeys: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete project property
   */
  deleteProjectProperty: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of all project property keys. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Get project property
   */
  getProjectProperty: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of all project property keys. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set project property
   */
  setProjectProperty: (input: {
    body: unknown;
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The key of the project property. The maximum length is 255 characters. */
    propertyKey: string;
  }) => Promise<unknown>;

  /**
   * Restore deleted or archived project
   */
  restore: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }) => Promise<Project>;

  /**
   * Get project roles for project
   */
  getProjectRoles: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }) => Promise<{ [key: string]: string | undefined }>;

  /**
   * Delete actors from project role
   */
  deleteActor: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
    /** The user account ID of the user to remove from the project role. */
    user?: string;
    /** The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended. */
    group?: string;
    /** The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter. */
    groupId?: string;
  }) => Promise<unknown>;

  /**
   * Get project role for project
   */
  getProjectRole: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
    /** Exclude inactive users. */
    excludeInactiveUsers?: boolean;
  }) => Promise<ProjectRole>;

  /**
   * Add actors to project role
   */
  addActorUsers: (input: {
    /** The name of the group to add. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended. */
    group?: (string)[];
    /** The ID of the group to add. This parameter cannot be used with the `group` parameter. */
    groupId?: (string)[];
    /** The user account ID of the user to add. */
    user?: (string)[];
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
  }) => Promise<ProjectRole>;

  /**
   * Set actors for project role
   */
  setActors: (input: {
    /** The actors to add to the project role.  Add groups using:   *  `atlassian-group-role-actor` and a list of group names.  *  `atlassian-group-role-actor-id` and a list of group IDs.  As a group's name can change, use of `atlassian-group-role-actor-id` is recommended. For example, `"atlassian-group-role-actor-id":["eef79f81-0b89-4fca-a736-4be531a10869","77f6ab39-e755-4570-a6ae-2d7a8df0bcb8"]`.  Add users using `atlassian-user-role-actor` and a list of account IDs. For example, `"atlassian-user-role-actor":["12345678-9abc-def1-2345-6789abcdef12", "abcdef12-3456-789a-bcde-f123456789ab"]`. */
    categorisedActors?: { [key: string]: (string)[] | undefined };
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id?: number;
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }, options: { params: { id: number } }) => Promise<ProjectRole>;

  /**
   * Get project role details
   */
  getProjectRoleDetails: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** Whether the roles should be filtered to include only those the user is assigned to. */
    currentMember?: boolean;
    excludeConnectAddons?: boolean;
    /** Do not return the default JSM company-managed space from CSM spaces, or the default CSM roles from JSM spaces. */
    excludeOtherServiceRoles?: boolean;
  }) => Promise<(ProjectRoleDetails)[]>;

  /**
   * Get all statuses for project
   */
  getAllStatuses: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
  }) => Promise<(IssueTypeWithStatus)[]>;

  /**
   * Get project versions paginated
   */
  getProjectVersionsPaginated: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** [Order](#ordering) the results by a field:   *  `description` Sorts by version description.  *  `name` Sorts by version name.  *  `releaseDate` Sorts by release date, starting with the oldest date. Versions with no release date are listed last.  *  `sequence` Sorts by the order of appearance in the user interface.  *  `startDate` Sorts by start date, starting with the oldest date. Versions with no start date are listed last. */
    orderBy?: "description" | "-description" | "+description" | "name" | "-name" | "+name" | "releaseDate" | "-releaseDate" | "+releaseDate" | "sequence" | "-sequence" | "+sequence" | "startDate" | "-startDate" | "+startDate";
    /** Filter the results using a literal string. Versions with matching `name` or `description` are returned (case insensitive). */
    query?: string;
    /** A list of status values used to filter the results by version status. This parameter accepts a comma-separated list. The status values are `released`, `unreleased`, and `archived`. */
    status?: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `issuesstatus` Returns the number of issues in each status category for each version.  *  `operations` Returns actions that can be performed on the specified version.  *  `driver` Returns the Atlassian account ID of the version driver.  *  `approvers` Returns a list containing the approvers for this version. */
    expand?: string;
  }) => Promise<PageBeanVersion>;

  /**
   * Get project versions
   */
  getProjectVersions: (input: {
    /** The project ID or project key (case sensitive). */
    projectIdOrKey: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts `operations`, which returns actions that can be performed on the version. */
    expand?: string;
  }) => Promise<(Version)[]>;

  /**
   * Get project's sender email
   */
  getProjectEmail: (input: {
    /** The project ID. */
    projectId: number;
  }) => Promise<ProjectEmailAddress>;

  /**
   * Set project's sender email
   */
  updateProjectEmail: (input: {
    /** The email address. */
    emailAddress?: string;
    /** When using a custom domain, the status of the email address. */
    emailAddressStatus?: (string)[];
    /** The project ID. */
    projectId: number;
  }) => Promise<unknown>;

  /**
   * Get project issue type hierarchy
   */
  getHierarchy: (input: {
    /** The ID of the project. */
    projectId: number;
  }) => Promise<ProjectIssueTypeHierarchy>;

  /**
   * Get project issue security scheme
   */
  getProjectIssueSecurityScheme: (input: {
    /** The project ID or project key (case sensitive). */
    projectKeyOrId: string;
  }) => Promise<SecurityScheme>;

  /**
   * Get project notification scheme
   */
  getNotificationSchemeForProject: (input: {
    /** The project ID or project key (case sensitive). */
    projectKeyOrId: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `all` Returns all expandable information  *  `field` Returns information about any custom fields assigned to receive an event  *  `group` Returns information about any groups assigned to receive an event  *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information  *  `projectRole` Returns information about any project roles assigned to receive an event  *  `user` Returns information about any users assigned to receive an event */
    expand?: string;
  }) => Promise<NotificationScheme>;

  /**
   * Get assigned permission scheme
   */
  getAssignedPermissionScheme: (input: {
    /** The project ID or project key (case sensitive). */
    projectKeyOrId: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission. */
    expand?: string;
  }) => Promise<PermissionScheme>;

  /**
   * Assign permission scheme
   */
  assignPermissionScheme: (input: {
    /** The ID of the permission scheme to associate with the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to get a list of permission scheme IDs. */
    id: number;
    /** The project ID or project key (case sensitive). */
    projectKeyOrId: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission. */
    expand?: string;
  }) => Promise<PermissionScheme>;

  /**
   * Get project issue security levels
   */
  getSecurityLevelsForProject: (input: {
    /** The project ID or project key (case sensitive). */
    projectKeyOrId: string;
  }) => Promise<ProjectIssueSecurityLevels>;

  /**
   * Get all project categories
   */
  getAllProjectCategories: () => Promise<(ProjectCategory)[]>;

  /**
   * Create project category
   */
  createProjectCategory: (input: {
    /** The description of the project category. */
    description?: string;
    /** The ID of the project category. */
    id?: string;
    /** The name of the project category. Required on create, optional on update. */
    name?: string;
    /** The URL of the project category. */
    self?: string;
  }) => Promise<ProjectCategory>;

  /**
   * Delete project category
   */
  removeProjectCategory: (input: {
    /** ID of the project category to delete. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get project category by ID
   */
  getProjectCategoryById: (input: {
    /** The ID of the project category. */
    id: number;
  }) => Promise<ProjectCategory>;

  /**
   * Update project category
   */
  updateProjectCategory: (input: {
    /** The description of the project category. */
    description?: string;
    /** The ID of the project category. */
    id?: string;
    /** The name of the project category. Required on create, optional on update. */
    name?: string;
    /** The URL of the project category. */
    self?: string;
  }, options: { params: { id: number } }) => Promise<UpdatedProjectCategory>;

  /**
   * Get fields for projects
   */
  getProjectFields: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The IDs of projects to return fields for. */
    projectId: (number)[];
    /** The IDs of work types (issue types) to return fields for. */
    workTypeId: (number)[];
    /** The IDs of fields to return. If not provided, all fields are returned. */
    fieldId?: (string)[];
  }) => Promise<PageBean2ProjectFieldBean>;

  /**
   * Validate project key
   */
  validateProjectKey: (input: {
    /** The project key. */
    key?: string;
  }) => Promise<ErrorCollection>;

  /**
   * Get valid project key
   */
  getValidProjectKey: (input: {
    /** The project key. */
    key?: string;
  }) => Promise<string>;

  /**
   * Get valid project name
   */
  getValidProjectName: (input: {
    /** The project name. */
    name: string;
  }) => Promise<string>;

  /**
   * Redact
   */
  redact: (input: {
    redactions?: (SingleRedactionRequest)[];
  }) => Promise<string>;

  /**
   * Get redaction status
   */
  getRedactionStatus: (input: {
    /** Redaction job id */
    jobId: string;
  }) => Promise<RedactionJobStatusResponse>;

  /**
   * Get resolutions
   */
  getResolutions: () => Promise<(Resolution)[]>;

  /**
   * Create resolution
   */
  createResolution: (input: {
    /** The description of the resolution. */
    description?: string;
    /** The name of the resolution. Must be unique (case-insensitive). */
    name: string;
    [key: string]: unknown;
  }) => Promise<ResolutionId>;

  /**
   * Set default resolution
   */
  setDefaultResolution: (input: {
    /** The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default resolution setting. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Move resolutions
   */
  moveResolutions: (input: {
    /** The ID of the resolution. Required if `position` isn't provided. */
    after?: string;
    /** The list of resolution IDs to be reordered. Cannot contain duplicates nor after ID. */
    ids: (string)[];
    /** The position for issue resolutions to be moved to. Required if `after` isn't provided. */
    position?: string;
  }) => Promise<unknown>;

  /**
   * Search resolutions
   */
  searchResolutions: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: string;
    /** The maximum number of items to return per page. */
    maxResults?: string;
    /** The list of resolutions IDs to be filtered out */
    id?: (string)[];
    /** When set to true, return default only, when IDs provided, if none of them is default, return empty page. Default value is false */
    onlyDefault?: boolean;
  }) => Promise<PageBeanResolutionJsonBean>;

  /**
   * Delete resolution
   */
  deleteResolution: (input: {
    /** The ID of the issue resolution. */
    id: string;
    /** The ID of the issue resolution that will replace the currently selected resolution. */
    replaceWith: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Get resolution
   */
  getResolution: (input: {
    /** The ID of the issue resolution value. */
    id: string;
  }) => Promise<Resolution>;

  /**
   * Update resolution
   */
  updateResolution: (input: {
    /** The description of the resolution. */
    description?: string;
    /** The name of the resolution. Must be unique. */
    name: string;
    /** The ID of the issue resolution. */
    id: string;
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Get all project roles
   */
  getAllProjectRoles: () => Promise<(ProjectRole)[]>;

  /**
   * Create project role
   */
  createProjectRole: (input: {
    /** A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role. */
    description?: string;
    /** The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role. */
    name?: string;
  }) => Promise<ProjectRole>;

  /**
   * Delete project role
   */
  deleteProjectRole: (input: {
    /** The ID of the project role to delete. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
    /** The ID of the project role that will replace the one being deleted. The swap will attempt to swap the role in schemes (notifications, permissions, issue security), workflows, worklogs and comments. */
    swap?: number;
  }) => Promise<unknown>;

  /**
   * Get project role by ID
   */
  getProjectRoleById: (input: {
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
  }) => Promise<ProjectRole>;

  /**
   * Partial update project role
   */
  partialUpdateProjectRole: (input: {
    /** A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role. */
    description?: string;
    /** The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role. */
    name?: string;
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
  }) => Promise<ProjectRole>;

  /**
   * Fully update project role
   */
  fullyUpdateProjectRole: (input: {
    /** A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role. */
    description?: string;
    /** The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role. */
    name?: string;
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
  }) => Promise<ProjectRole>;

  /**
   * Delete default actors from project role
   */
  deleteProjectRoleActorsFromRole: (input: {
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
    /** The user account ID of the user to remove as a default actor. */
    user?: string;
    /** The group ID of the group to be removed as a default actor. This parameter cannot be used with the `group` parameter. */
    groupId?: string;
    /** The group name of the group to be removed as a default actor.This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended. */
    group?: string;
  }) => Promise<ProjectRole>;

  /**
   * Get default actors for project role
   */
  getProjectRoleActorsForRole: (input: {
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
  }) => Promise<ProjectRole>;

  /**
   * Add default actors to project role
   */
  addProjectRoleActorsToRole: (input: {
    /** The name of the group to add as a default actor. This parameter cannot be used with the `groupId` parameter. As a group's name can change,use of `groupId` is recommended. This parameter accepts a comma-separated list. For example, `"group":["project-admin", "jira-developers"]`. */
    group?: (string)[];
    /** The ID of the group to add as a default actor. This parameter cannot be used with the `group` parameter This parameter accepts a comma-separated list. For example, `"groupId":["77f6ab39-e755-4570-a6ae-2d7a8df0bcb8", "0c011f85-69ed-49c4-a801-3b18d0f771bc"]`. */
    groupId?: (string)[];
    /** The account IDs of the users to add as default actors. This parameter accepts a comma-separated list. For example, `"user":["5b10a2844c20165700ede21g", "5b109f2e9729b51b54dc274d"]`. */
    user?: (string)[];
    /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
    id: number;
  }) => Promise<ProjectRole>;

  /**
   * Get screens
   */
  getScreens: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of screen IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
    id?: (number)[];
    /** String used to perform a case-insensitive partial match with screen name. */
    queryString?: string;
    /** The scope filter string. To filter by multiple scope, provide an ampersand-separated list. For example, `scope=GLOBAL&scope=PROJECT`. */
    scope?: ("GLOBAL" | "TEMPLATE" | "PROJECT")[];
    /** [Order](#ordering) the results by a field:   *  `id` Sorts by screen ID.  *  `name` Sorts by screen name. */
    orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
  }) => Promise<PageBeanScreen>;

  /**
   * Create screen
   */
  createScreen: (input: {
    /** The description of the screen. The maximum length is 255 characters. */
    description?: string;
    /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
    name: string;
  }) => Promise<Screen>;

  /**
   * Add field to default screen
   */
  addFieldToDefaultScreen: (input: {
    /** The ID of the field. */
    fieldId: string;
  }) => Promise<unknown>;

  /**
   * Get bulk screen tabs
   */
  getBulkScreenTabs: (input: {
    /** The list of screen IDs. To include multiple screen IDs, provide an ampersand-separated list. For example, `screenId=10000&screenId=10001`. */
    screenId?: (number)[];
    /** The list of tab IDs. To include multiple tab IDs, provide an ampersand-separated list. For example, `tabId=10000&tabId=10001`. */
    tabId?: (number)[];
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. The maximum number is 100, */
    maxResult?: number;
  }) => Promise<unknown>;

  /**
   * Delete screen
   */
  deleteScreen: (input: {
    /** The ID of the screen. */
    screenId: number;
  }) => Promise<unknown>;

  /**
   * Update screen
   */
  updateScreen: (input: {
    /** The description of the screen. The maximum length is 255 characters. */
    description?: string;
    /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
    name?: string;
    /** The ID of the screen. */
    screenId: number;
  }) => Promise<Screen>;

  /**
   * Get available screen fields
   */
  getAvailableScreenFields: (input: {
    /** The ID of the screen. */
    screenId: number;
  }) => Promise<(ScreenableField)[]>;

  /**
   * Get all screen tabs
   */
  getAllScreenTabs: (input: {
    /** The ID of the screen. */
    screenId: number;
    /** The key of the project. */
    projectKey?: string;
  }) => Promise<(ScreenableTab)[]>;

  /**
   * Create screen tab
   */
  addScreenTab: (input: {
    /** The ID of the screen tab. */
    id?: number;
    /** The name of the screen tab. The maximum length is 255 characters. */
    name: string;
    /** The ID of the screen. */
    screenId: number;
  }) => Promise<ScreenableTab>;

  /**
   * Delete screen tab
   */
  deleteScreenTab: (input: {
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
  }) => Promise<unknown>;

  /**
   * Update screen tab
   */
  renameScreenTab: (input: {
    /** The ID of the screen tab. */
    id?: number;
    /** The name of the screen tab. The maximum length is 255 characters. */
    name: string;
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
  }) => Promise<ScreenableTab>;

  /**
   * Get all screen tab fields
   */
  getAllScreenTabFields: (input: {
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
    /** The key of the project. */
    projectKey?: string;
  }) => Promise<(ScreenableField)[]>;

  /**
   * Add screen tab field
   */
  addScreenTabField: (input: {
    /** The ID of the field to add. */
    fieldId: string;
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
    /** Whether to skip associating the added field with projects linked to this screen. By default, adding a field to a screen tab also updates the field configuration of associated projects, making the field visible in issue experiences. When set to true, the field is added to the screen tab only and will not be visible in experiences such as issue view for associated projects unless the field association is updated separately. */
    skipFieldAssociation?: boolean;
  }) => Promise<ScreenableField>;

  /**
   * Remove screen tab field
   */
  removeScreenTabField: (input: {
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
    /** The ID of the field. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Move screen tab field
   */
  moveScreenTabField: (input: {
    /** The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't provided. */
    after?: string;
    /** The named position to which the screen tab field should be moved. Required if `after` isn't provided. */
    position?: "Earlier" | "Later" | "First" | "Last";
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
    /** The ID of the field. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Move screen tab
   */
  moveScreenTab: (input: {
    /** The ID of the screen. */
    screenId: number;
    /** The ID of the screen tab. */
    tabId: number;
    /** The position of tab. The base index is 0. */
    pos: number;
  }) => Promise<unknown>;

  /**
   * Get screen schemes
   */
  getScreenSchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. */
    id?: (number)[];
    /** Use [expand](#expansion) include additional information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns information about the issue type screen scheme the screen scheme is assigned to. */
    expand?: string;
    /** String used to perform a case-insensitive partial match with screen scheme name. */
    queryString?: string;
    /** [Order](#ordering) the results by a field:   *  `id` Sorts by screen scheme ID.  *  `name` Sorts by screen scheme name. */
    orderBy?: "name" | "-name" | "+name" | "id" | "-id" | "+id";
  }) => Promise<PageBeanScreenScheme>;

  /**
   * Create screen scheme
   */
  createScreenScheme: (input: {
    /** The description of the screen scheme. The maximum length is 255 characters. */
    description?: string;
    /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
    name: string;
    /** The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted. */
    screens: ScreenTypes;
  }) => Promise<ScreenSchemeId>;

  /**
   * Delete screen scheme
   */
  deleteScreenScheme: (input: {
    /** The ID of the screen scheme. */
    screenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Update screen scheme
   */
  updateScreenScheme: (input: {
    /** The description of the screen scheme. The maximum length is 255 characters. */
    description?: string;
    /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
    name?: string;
    /** The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted. */
    screens?: UpdateScreenTypes;
    /** The ID of the screen scheme. */
    screenSchemeId: string;
  }) => Promise<unknown>;

  /**
   * Currently being removed. Search for issues using JQL (GET)
   */
  searchForIssuesUsingJql: (input: {
    /** The [JQL](https://confluence.atlassian.com/x/egORLQ) that defines the search. Note:   *  If no JQL expression is provided, all issues are returned.  *  `username` and `userkey` cannot be used as search terms due to privacy reasons. Use `accountId` instead.  *  If a user has hidden their email address in their user profile, partial matches of the email address will not find the user. An exact match is required. */
    jql?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. To manage page size, Jira may return fewer items per page where a large number of fields or properties are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. */
    maxResults?: number;
    /** Determines how to validate the JQL query and treat the validation results. Supported values are:   *  `strict` Returns a 400 response code if any errors are found, along with a list of all errors (and warnings).  *  `warn` Returns all errors as warnings.  *  `none` No validation is performed.  *  `true` *Deprecated* A legacy synonym for `strict`.  *  `false` *Deprecated* A legacy synonym for `warn`.  Note: If the JQL is not correctly formed a 400 response code is returned, regardless of the `validateQuery` value. */
    validateQuery?: "strict" | "warn" | "none" | "true" | "false";
    /** A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  Any issue field, prefixed with a minus to exclude.  Examples:   *  `summary,comment` Returns only the summary and comments fields.  *  `-description` Returns all navigable (default) fields except description.  *  `*all,-comment` Returns all fields except comments.  This parameter may be specified multiple times. For example, `fields=field1,field2&fields=field3`.  Note: All navigable fields are returned by default. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields. */
    fields?: (string)[];
    /** Use [expand](#expansion) to include additional information about issues in the response. This parameter accepts a comma-separated list. Expand options include:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `operations` Returns all possible operations for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.  *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version. */
    expand?: string;
    /** A list of issue property keys for issue properties to include in the results. This parameter accepts a comma-separated list. Multiple properties can also be provided using an ampersand separated list. For example, `properties=prop1,prop2&properties=prop3`. A maximum of 5 issue property keys can be specified. */
    properties?: (string)[];
    /** Reference fields by their key (rather than ID). */
    fieldsByKeys?: boolean;
    /** Whether to fail the request quickly in case of an error while loading fields for an issue. For `failFast=true`, if one field fails, the entire operation fails. For `failFast=false`, the operation will continue even if a field fails. It will return a valid response, but without values for the failed field(s). */
    failFast?: boolean;
  }) => Promise<SearchResults>;

  /**
   * Currently being removed. Search for issues using JQL (POST)
   */
  searchForIssuesUsingJqlPost: (input: {
    /** Use [expand](#expansion) to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a list of values. The expand options are:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `operations` Returns all possible operations for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.  *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version. */
    expand?: (string)[];
    /** A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  Any issue field, prefixed with a minus to exclude.  The default is `*navigable`.  Examples:   *  `summary,comment` Returns the summary and comments fields only.  *  `-description` Returns all navigable (default) fields except description.  *  `*all,-comment` Returns all fields except comments.  Multiple `fields` parameters can be included in a request.  Note: All navigable fields are returned by default. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields. */
    fields?: (string)[];
    /** Reference fields by their key (rather than ID). The default is `false`. */
    fieldsByKeys?: boolean;
    /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. */
    jql?: string;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. */
    properties?: (string)[];
    /** The index of the first item to return in the page of results (page offset). The base index is `0`. */
    startAt?: number;
    /** Determines how to validate the JQL query and treat the validation results. Supported values:   *  `strict` Returns a 400 response code if any errors are found, along with a list of all errors (and warnings).  *  `warn` Returns all errors as warnings.  *  `none` No validation is performed.  *  `true` *Deprecated* A legacy synonym for `strict`.  *  `false` *Deprecated* A legacy synonym for `warn`.  The default is `strict`.  Note: If the JQL is not correctly formed a 400 response code is returned, regardless of the `validateQuery` value. */
    validateQuery?: "strict" | "warn" | "none" | "true" | "false";
  }) => Promise<SearchResults>;

  /**
   * Count issues using JQL
   */
  countIssues: (input: {
    /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction. */
    jql?: string;
  }) => Promise<JqlCountResultsBean>;

  /**
   * Search for issues using JQL enhanced search (GET)
   */
  searchAndReconsileIssuesUsingJql: (input: {
    /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.   *  Example of an unbounded query: `order by key desc`.  *  Example of a bounded query: `assignee = currentUser() order by key`.  Additionally, `orderBy` clause can contain a maximum of 7 fields. */
    jql?: string;
    /** The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues.  Note: The `nextPageToken` field is **not included** in the response for the last page, indicating there is no next page. */
    nextPageToken?: string;
    /** The maximum number of items to return per page. To manage page size, API may return fewer items per page where a large number of fields or properties are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. It returns max 5000 issues. */
    maxResults?: number;
    /** A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  `id` Returns only issue IDs.  *  Any issue field, prefixed with a minus to exclude.  The default is `id`.  Examples:   *  `summary,comment` Returns only the summary and comments fields only.  *  `-description` Returns all navigable (default) fields except description.  *  `*all,-comment` Returns all fields except comments.  Multiple `fields` parameters can be included in a request.  Note: By default, this resource returns IDs only. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields. */
    fields?: (string)[];
    /** Use [expand](#expansion) to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a comma-delimited string of values. The expand options are:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `operations` Returns all possible operations for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.  *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version.  Examples: `"names,changelog"` Returns the display name of each field as well as a list of recent updates to an issue. */
    expand?: string;
    /** A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. */
    properties?: (string)[];
    /** Reference fields by their key (rather than ID). The default is `false`. */
    fieldsByKeys?: boolean;
    /** Fail this request early if we can't retrieve all field data. */
    failFast?: boolean;
    /** Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. This list of ids should be consistent with each paginated request across different pages. */
    reconcileIssues?: (number)[];
  }) => Promise<SearchAndReconcileResults>;

  /**
   * Search for issues using JQL enhanced search (POST)
   */
  searchAndReconsileIssuesUsingJqlPost: (input: {
    /** Use [expand](#expansion) to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a comma-delimited string of values. The expand options are:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `operations` Returns all possible operations for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.  *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version.  Examples: `"names,changelog"` Returns the display name of each field as well as a list of recent updates to an issue. */
    expand?: string;
    /** A list of fields to return for each issue. Use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  `id` Returns only issue IDs.  *  Any issue field, prefixed with a dash to exclude.  The default is `id`.  Examples:   *  `summary,comment` Returns the summary and comments fields only.  *  `*all,-comment` Returns all fields except comments.  Multiple `fields` parameters can be included in a request.  Note: By default, this resource returns IDs only. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields. */
    fields?: (string)[];
    /** Reference fields by their key (rather than ID). The default is `false`. */
    fieldsByKeys?: boolean;
    /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.   *  Example of an unbounded query: `order by key desc`.  *  Example of a bounded query: `assignee = currentUser() order by key`.  Additionally, `orderBy` clause can contain a maximum of 7 fields. */
    jql?: string;
    /** The maximum number of items to return per page. To manage page size, API may return fewer items per page where a large number of fields are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. It returns max 5000 issues. */
    maxResults?: number;
    /** The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues. */
    nextPageToken?: string;
    /** A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list. */
    properties?: (string)[];
    /** Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. This list of ids should be consistent with each paginated request across different pages. */
    reconcileIssues?: (number)[];
  }) => Promise<SearchAndReconcileResults>;

  /**
   * Get issue security level
   */
  getIssueSecurityLevel: (input: {
    /** The ID of the issue security level. */
    id: string;
  }) => Promise<SecurityLevel>;

  /**
   * Get Jira instance info
   */
  getServerInfo: () => Promise<ServerInformation>;

  /**
   * Get issue navigator default columns
   */
  getIssueNavigatorDefaultColumns: () => Promise<(ColumnItem)[]>;

  /**
   * Set issue navigator default columns
   */
  setIssueNavigatorDefaultColumns: (input: {
    columns?: (string)[];
  }) => Promise<unknown>;

  /**
   * Get all statuses
   */
  getStatuses: () => Promise<(StatusDetails)[]>;

  /**
   * Get status
   */
  getStatus: (input: {
    /** The ID or name of the status. */
    idOrName: string;
  }) => Promise<StatusDetails>;

  /**
   * Get all status categories
   */
  getStatusCategories: () => Promise<(StatusCategory)[]>;

  /**
   * Get status category
   */
  getStatusCategory: (input: {
    /** The ID or key of the status category. */
    idOrKey: string;
  }) => Promise<StatusCategory>;

  /**
   * Bulk delete Statuses
   */
  deleteStatusesById: (input: {
    /** The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.  Min items `1`, Max items `50` */
    id: (string)[];
  }) => Promise<unknown>;

  /**
   * Bulk get statuses
   */
  getStatusesById: (input: {
    /** The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.  Min items `1`, Max items `50` */
    id: (string)[];
  }) => Promise<(JiraStatus)[]>;

  /**
   * Bulk create statuses
   */
  createStatuses: (input: {
    scope: StatusScope;
    /** Details of the statuses being created. */
    statuses: (StatusCreate)[];
  }) => Promise<(JiraStatus)[]>;

  /**
   * Bulk update statuses
   */
  updateStatuses: (input: {
    /** The list of statuses that will be updated. */
    statuses: (StatusUpdate)[];
  }) => Promise<unknown>;

  /**
   * Bulk get statuses by name
   */
  getStatusesByName: (input: {
    /** The list of status names. To include multiple names, provide an ampersand-separated list. For example, name=nameXX&name=nameYY.  Min items `1`, Max items `50` */
    name: (string)[];
    /** The project the status is part of or null for global statuses. */
    projectId?: string;
  }) => Promise<(JiraStatus)[]>;

  /**
   * Search statuses paginated
   */
  search: (input: {
    /** The project the status is part of or null for global statuses. */
    projectId?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Term to match status names against or null to search for all statuses in the search scope. */
    searchString?: string;
    /** Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`. */
    statusCategory?: string;
  }) => Promise<PageOfStatuses>;

  /**
   * Get issue type usages by status and project
   */
  getProjectIssueTypeUsagesForStatus: (input: {
    /** The statusId to fetch issue type usages for */
    statusId: string;
    /** The projectId to fetch issue type usages for */
    projectId: string;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<StatusProjectIssueTypeUsageDto>;

  /**
   * Get project usages by status
   */
  getProjectUsagesForStatus: (input: {
    /** The statusId to fetch project usages for */
    statusId: string;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<StatusProjectUsageDto>;

  /**
   * Get workflow usages by status
   */
  getWorkflowUsagesForStatus: (input: {
    /** The statusId to fetch workflow usages for */
    statusId: string;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<StatusWorkflowUsageDto>;

  /**
   * Get task
   */
  getTask: (input: {
    /** The ID of the task. */
    taskId: string;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Cancel task
   */
  cancelTask: (input: {
    /** The ID of the task. */
    taskId: string;
  }) => Promise<unknown>;

  /**
   * Get UI modifications
   */
  getUiModifications: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `data` Returns UI modification data.  *  `contexts` Returns UI modification contexts. */
    expand?: string;
  }) => Promise<PageBeanUiModificationDetails>;

  /**
   * Create UI modification
   */
  createUiModification: (input: {
    /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
    contexts?: (UiModificationContextDetails)[];
    /** The data of the UI modification. The maximum size of the data is 50000 characters. */
    data?: string;
    /** The description of the UI modification. The maximum length is 255 characters. */
    description?: string;
    /** The name of the UI modification. The maximum length is 255 characters. */
    name: string;
  }) => Promise<UiModificationIdentifiers>;

  /**
   * Delete UI modification
   */
  deleteUiModification: (input: {
    /** The ID of the UI modification. */
    uiModificationId: string;
  }) => Promise<unknown>;

  /**
   * Update UI modification
   */
  updateUiModification: (input: {
    /** List of contexts of the UI modification. The maximum number of contexts is 1000. If provided, replaces all existing contexts. */
    contexts?: (UiModificationContextDetails)[];
    /** The data of the UI modification. The maximum size of the data is 50000 characters. */
    data?: string;
    /** The description of the UI modification. The maximum length is 255 characters. */
    description?: string;
    /** The name of the UI modification. The maximum length is 255 characters. */
    name?: string;
    /** The ID of the UI modification. */
    uiModificationId: string;
  }) => Promise<unknown>;

  /**
   * Get avatars
   */
  getAvatars: (input: {
    /** The avatar type. */
    type: "project" | "issuetype" | "priority";
    /** The ID of the item the avatar is associated with. */
    entityId: string;
  }) => Promise<Avatars>;

  /**
   * Load avatar
   */
  storeAvatar: (input: {
    body: unknown;
    /** The avatar type. */
    type: "project" | "issuetype" | "priority";
    /** The ID of the item the avatar is associated with. */
    entityId: string;
    /** The X coordinate of the top-left corner of the crop region. */
    x?: number;
    /** The Y coordinate of the top-left corner of the crop region. */
    y?: number;
    /** The length of each side of the crop region. */
    size: number;
  }) => Promise<Avatar>;

  /**
   * Delete avatar
   */
  deleteAvatar: (input: {
    /** The avatar type. */
    type: "project" | "issuetype" | "priority";
    /** The ID of the item the avatar is associated with. */
    owningObjectId: string;
    /** The ID of the avatar. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get avatar image by type
   */
  getAvatarImageByType: (input: {
    /** The icon type of the avatar. */
    type: "issuetype" | "project" | "priority";
    /** The size of the avatar image. If not provided the default size is returned. */
    size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
    /** The format to return the avatar image in. If not provided the original content format is returned. */
    format?: "png" | "svg";
  }) => Promise<StreamingResponseBody>;

  /**
   * Get avatar image by ID
   */
  getAvatarImageById: (input: {
    /** The icon type of the avatar. */
    type: "issuetype" | "project" | "priority";
    /** The ID of the avatar. */
    id: number;
    /** The size of the avatar image. If not provided the default size is returned. */
    size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
    /** The format to return the avatar image in. If not provided the original content format is returned. */
    format?: "png" | "svg";
  }) => Promise<StreamingResponseBody>;

  /**
   * Get avatar image by owner
   */
  getAvatarImageByOwner: (input: {
    /** The icon type of the avatar. */
    type: "issuetype" | "project" | "priority";
    /** The ID of the project or issue type the avatar belongs to. */
    entityId: string;
    /** The size of the avatar image. If not provided the default size is returned. */
    size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
    /** The format to return the avatar image in. If not provided the original content format is returned. */
    format?: "png" | "svg";
  }) => Promise<StreamingResponseBody>;

  /**
   * Delete user
   */
  removeUser: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    key?: string;
  }) => Promise<unknown>;

  /**
   * Get user
   */
  getUser: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required. */
    accountId?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide) for details. */
    username?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide) for details. */
    key?: string;
    /** Use [expand](#expansion) to include additional information about users in the response. This parameter accepts a comma-separated list. Expand options include:   *  `groups` includes all groups and nested groups to which the user belongs.  *  `applicationRoles` includes details of all the applications to which the user has access. */
    expand?: string;
  }) => Promise<User>;

  /**
   * Create user
   */
  createUser: (input: {
    /** Deprecated, do not use. */
    applicationKeys?: (string)[];
    /** This property is no longer available. If the user has an Atlassian account, their display name is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account. */
    displayName?: string;
    /** The email address for the user. */
    emailAddress: string;
    /** This property is no longer available. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    key?: string;
    /** This property is no longer available. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    name?: string;
    /** This property is no longer available. If the user has an Atlassian account, their password is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account. */
    password?: string;
    /** Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery, jira-software. To create a user without product access, set this field to be an empty array. */
    products: (string)[];
    /** The URL of the user. */
    self?: string;
    [key: string]: unknown;
  }) => Promise<User>;

  /**
   * Find users assignable to projects
   */
  findBulkAssignableUsers: (input: {
    /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
    query?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
    accountId?: string;
    /** A list of project keys (case sensitive). This parameter accepts a comma-separated list. */
    projectKeys: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<(User)[]>;

  /**
   * Find users assignable to issues
   */
  findAssignableUsers: (input: {
    /** A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `username` or `accountId` is specified. */
    query?: string;
    /** The sessionId of this request. SessionId is the same until the assignee is set. */
    sessionId?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
    accountId?: string;
    /** The project ID or project key (case sensitive). Required, unless `issueKey` or `issueId` is specified. */
    project?: string;
    /** The key of the issue. Required, unless `issueId` or `project` is specified. */
    issueKey?: string;
    /** The ID of the issue. Required, unless `issueKey` or `project` is specified. */
    issueId?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return. This operation may return less than the maximum number of items even if more are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the users that can be assigned to the issue. */
    maxResults?: number;
    /** The ID of the transition. */
    actionDescriptorId?: number;
    recommend?: boolean;
    accountType?: (string)[];
    appType?: (string)[];
  }) => Promise<(User)[]>;

  /**
   * Bulk get users
   */
  bulkGetUsers: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: (string)[];
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    key?: (string)[];
    /** The account ID of a user. To specify multiple users, pass multiple `accountId` parameters. For example, `accountId=5b10a2844c20165700ede21g&accountId=5b10ac8d82e05b22cc7d4ef5`. */
    accountId: (string)[];
  }) => Promise<PageBeanUser>;

  /**
   * Get account IDs for users
   */
  bulkGetUsersMigration: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Username of a user. To specify multiple users, pass multiple copies of this parameter. For example, `username=fred&username=barney`. Required if `key` isn't provided. Cannot be provided if `key` is present. */
    username?: (string)[];
    /** Key of a user. To specify multiple users, pass multiple copies of this parameter. For example, `key=fred&key=barney`. Required if `username` isn't provided. Cannot be provided if `username` is present. */
    key?: (string)[];
  }) => Promise<(UserMigrationBean)[]>;

  /**
   * Reset user default columns
   */
  resetUserColumns: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
  }) => Promise<unknown>;

  /**
   * Get user default columns
   */
  getUserDefaultColumns: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This parameter is no longer available See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
  }) => Promise<(ColumnItem)[]>;

  /**
   * Set user default columns
   */
  setUserColumns: (input: {
    columns?: (string)[];
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
  }) => Promise<unknown>;

  /**
   * Get user email
   */
  getUserEmail: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`. */
    accountId: string;
  }) => Promise<UnrestrictedUserEmail>;

  /**
   * Get user email bulk
   */
  getUserEmailBulk: (input: {
    /** The account IDs of the users for which emails are required. An `accountId` is an identifier that uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`. Note, this should be treated as an opaque identifier (that is, do not assume any structure in the value). */
    accountId: (string)[];
  }) => Promise<UnrestrictedUserEmail>;

  /**
   * Get user groups
   */
  getUserGroups: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    key?: string;
  }) => Promise<(GroupName)[]>;

  /**
   * Find users with permissions
   */
  findUsersWithAllPermissions: (input: {
    /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
    query?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
    accountId?: string;
    /** A comma separated list of permissions. Permissions can be specified as any:   *  permission returned by [Get all permissions](#api-rest-api-3-permissions-get).  *  custom project permission added by Connect apps.  *  (deprecated) one of the following:           *  ASSIGNABLE\_USER      *  ASSIGN\_ISSUE      *  ATTACHMENT\_DELETE\_ALL      *  ATTACHMENT\_DELETE\_OWN      *  BROWSE      *  CLOSE\_ISSUE      *  COMMENT\_DELETE\_ALL      *  COMMENT\_DELETE\_OWN      *  COMMENT\_EDIT\_ALL      *  COMMENT\_EDIT\_OWN      *  COMMENT\_ISSUE      *  CREATE\_ATTACHMENT      *  CREATE\_ISSUE      *  DELETE\_ISSUE      *  EDIT\_ISSUE      *  LINK\_ISSUE      *  MANAGE\_WATCHER\_LIST      *  MODIFY\_REPORTER      *  MOVE\_ISSUE      *  PROJECT\_ADMIN      *  RESOLVE\_ISSUE      *  SCHEDULE\_ISSUE      *  SET\_ISSUE\_SECURITY      *  TRANSITION\_ISSUE      *  VIEW\_VERSION\_CONTROL      *  VIEW\_VOTERS\_AND\_WATCHERS      *  VIEW\_WORKFLOW\_READONLY      *  WORKLOG\_DELETE\_ALL      *  WORKLOG\_DELETE\_OWN      *  WORKLOG\_EDIT\_ALL      *  WORKLOG\_EDIT\_OWN      *  WORK\_ISSUE */
    permissions: string;
    /** The issue key for the issue. */
    issueKey?: string;
    /** The project key for the project (case sensitive). */
    projectKey?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<(User)[]>;

  /**
   * Find users for picker
   */
  findUsersForPicker: (input: {
    /** A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. */
    query: string;
    /** The maximum number of items to return. The total number of matched users is returned in `total`. */
    maxResults?: number;
    /** Include the URI to the user's avatar. */
    showAvatar?: boolean;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    exclude?: (string)[];
    /** A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple account IDs can also be provided using an ampersand-separated list. For example, `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`. Cannot be provided with `exclude`. */
    excludeAccountIds?: (string)[];
    avatarSize?: string;
    excludeConnectUsers?: boolean;
  }) => Promise<FoundUsers>;

  /**
   * Get user property keys
   */
  getUserPropertyKeys: (input: {
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    userKey?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete user property
   */
  deleteUserProperty: (input: {
    /** The key of the user's property. */
    propertyKey: string;
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    userKey?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
  }) => Promise<unknown>;

  /**
   * Get user property
   */
  getUserProperty: (input: {
    /** The key of the user's property. */
    propertyKey: string;
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    userKey?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
  }) => Promise<EntityProperty>;

  /**
   * Set user property
   */
  setUserProperty: (input: {
    body: unknown;
    /** The key of the user's property. The maximum length is 255 characters. */
    propertyKey: string;
    /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
    accountId?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    userKey?: string;
    /** This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
  }) => Promise<unknown>;

  /**
   * Find users
   */
  findUsers: (input: {
    /** A query string that is matched against user attributes ( `displayName`, and `emailAddress`) to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` or `property` is specified. */
    query?: string;
    username?: string;
    /** A query string that is matched exactly against a user `accountId`. Required, unless `query` or `property` is specified. */
    accountId?: string;
    /** The index of the first item to return in a page of filtered results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** A query string used to search properties. Property keys are specified by path, so property keys containing dot (.) or equals (=) characters cannot be used. The query string cannot be specified using a JSON object. Example: To search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is specified. */
    property?: string;
  }) => Promise<(User)[]>;

  /**
   * Find users by query
   */
  findUsersByQuery: (input: {
    /** The search query. */
    query: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanUser>;

  /**
   * Find user keys by query
   */
  findUserKeysByQuery: (input: {
    /** The search query. */
    query: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResult?: number;
  }) => Promise<PageBeanUserKey>;

  /**
   * Find users with browse permission
   */
  findUsersWithBrowsePermission: (input: {
    /** A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified. */
    query?: string;
    /** This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
    username?: string;
    /** A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. */
    accountId?: string;
    /** The issue key for the issue. Required, unless `projectKey` is specified. */
    issueKey?: string;
    /** The project key for the project (case sensitive). Required, unless `issueKey` is specified. */
    projectKey?: string;
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<(User)[]>;

  /**
   * Get all users default
   */
  getAllUsersDefault: (input: {
    /** The index of the first item to return. */
    startAt?: number;
    /** The maximum number of items to return (limited to 1000). */
    maxResults?: number;
    expand?: string;
  }) => Promise<(User)[]>;

  /**
   * Get all users
   */
  getAllUsers: (input: {
    /** The index of the first item to return. */
    startAt?: number;
    /** The maximum number of items to return (limited to 1000). */
    maxResults?: number;
    expand?: string;
  }) => Promise<(User)[]>;

  /**
   * Create version
   */
  createVersion: (input: {
    /** If the expand option `approvers` is used, returns a list containing the approvers for this version. */
    approvers?: (VersionApprover)[];
    /** Indicates that the version is archived. Optional when creating or updating a version. */
    archived?: boolean;
    /** The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes. */
    description?: string;
    /** The Atlassian account ID of the version driver. Optional when creating or updating a version. If the expand option `driver` is used, returns the Atlassian account ID of the driver. */
    driver?: string;
    /** Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:   *  `operations` Returns the list of operations available for this version.  *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.  *  `driver` Returns the Atlassian account ID of the version driver.  *  `approvers` Returns a list containing approvers for this version.  Optional for create and update. */
    expand?: string;
    /** The ID of the version. */
    id?: string;
    /** If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*. */
    issuesStatusForFixVersion?: VersionIssuesStatus;
    /** The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version. */
    moveUnfixedIssuesTo?: string;
    /** The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters. */
    name?: string;
    /** If the expand option `operations` is used, returns the list of operations available for this version. */
    operations?: (SimpleLink)[];
    /** Indicates that the version is overdue. */
    overdue?: boolean;
    /** Deprecated. Use `projectId`. */
    project?: string;
    /** The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version. */
    projectId?: number;
    /** The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
    releaseDate?: string;
    /** Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version. */
    released?: boolean;
    /** The URL of the version. */
    self?: string;
    /** The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
    startDate?: string;
    /** The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format. */
    userReleaseDate?: string;
    /** The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format. */
    userStartDate?: string;
  }) => Promise<Version>;

  /**
   * Delete version
   */
  deleteVersion: (input: {
    /** The ID of the version. */
    id: string;
    /** The ID of the version to update `fixVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted. */
    moveFixIssuesTo?: string;
    /** The ID of the version to update `affectedVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted. */
    moveAffectedIssuesTo?: string;
  }) => Promise<unknown>;

  /**
   * Get version
   */
  getVersion: (input: {
    /** The ID of the version. */
    id: string;
    /** Use [expand](#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:   *  `operations` Returns the list of operations available for this version.  *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property represents the number of issues with a status other than *to do*, *in progress*, and *done*.  *  `driver` Returns the Atlassian account ID of the version driver.  *  `approvers` Returns a list containing the Atlassian account IDs of approvers for this version. */
    expand?: string;
  }) => Promise<Version>;

  /**
   * Update version
   */
  updateVersion: (input: {
    /** If the expand option `approvers` is used, returns a list containing the approvers for this version. */
    approvers?: (VersionApprover)[];
    /** Indicates that the version is archived. Optional when creating or updating a version. */
    archived?: boolean;
    /** The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes. */
    description?: string;
    /** The Atlassian account ID of the version driver. Optional when creating or updating a version. If the expand option `driver` is used, returns the Atlassian account ID of the driver. */
    driver?: string;
    /** Use [expand](em>#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:   *  `operations` Returns the list of operations available for this version.  *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*.  *  `driver` Returns the Atlassian account ID of the version driver.  *  `approvers` Returns a list containing approvers for this version.  Optional for create and update. */
    expand?: string;
    /** The ID of the version. */
    id?: string;
    /** If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*. */
    issuesStatusForFixVersion?: VersionIssuesStatus;
    /** The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version. */
    moveUnfixedIssuesTo?: string;
    /** The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters. */
    name?: string;
    /** If the expand option `operations` is used, returns the list of operations available for this version. */
    operations?: (SimpleLink)[];
    /** Indicates that the version is overdue. */
    overdue?: boolean;
    /** Deprecated. Use `projectId`. */
    project?: string;
    /** The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version. */
    projectId?: number;
    /** The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
    releaseDate?: string;
    /** Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version. */
    released?: boolean;
    /** The URL of the version. */
    self?: string;
    /** The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. */
    startDate?: string;
    /** The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format. */
    userReleaseDate?: string;
    /** The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format. */
    userStartDate?: string;
  }, options: { params: { id: string } }) => Promise<Version>;

  /**
   * Merge versions
   */
  mergeVersions: (input: {
    /** The ID of the version to delete. */
    id: string;
    /** The ID of the version to merge into. */
    moveIssuesTo: string;
  }) => Promise<unknown>;

  /**
   * Move version
   */
  moveVersion: (input: {
    /** The URL (self link) of the version after which to place the moved version. Cannot be used with `position`. */
    after?: string;
    /** An absolute position in which to place the moved version. Cannot be used with `after`. */
    position?: "Earlier" | "Later" | "First" | "Last";
    /** The ID of the version to be moved. */
    id: string;
  }) => Promise<Version>;

  /**
   * Get version's related issues count
   */
  getVersionRelatedIssues: (input: {
    /** The ID of the version. */
    id: string;
  }) => Promise<VersionIssueCounts>;

  /**
   * Get related work
   */
  getRelatedWork: (input: {
    /** The ID of the version. */
    id: string;
  }) => Promise<(VersionRelatedWork)[]>;

  /**
   * Create related work
   */
  createRelatedWork: (input: {
    /** The category of the related work */
    category: string;
    /** The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API. */
    issueId?: number;
    /** The id of the related work. For the native release note related work item, this will be null, and Rest API does not support updating it. */
    relatedWorkId?: string;
    /** The title of the related work */
    title?: string;
    /** The URL of the related work. Will be null for the native release note related work item, but is otherwise required. */
    url?: string;
    id: string;
  }) => Promise<VersionRelatedWork>;

  /**
   * Update related work
   */
  updateRelatedWork: (input: {
    /** The category of the related work */
    category: string;
    /** The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API. */
    issueId?: number;
    /** The id of the related work. For the native release note related work item, this will be null, and Rest API does not support updating it. */
    relatedWorkId?: string;
    /** The title of the related work */
    title?: string;
    /** The URL of the related work. Will be null for the native release note related work item, but is otherwise required. */
    url?: string;
    /** The ID of the version to update the related work on. For the related work id, pass it to the input JSON. */
    id: string;
  }) => Promise<VersionRelatedWork>;

  /**
   * Delete and replace version
   */
  deleteAndReplaceVersion: (input: {
    /** An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the deleted version. */
    customFieldReplacementList?: (CustomFieldReplacement)[];
    /** The ID of the version to update `affectedVersion` to when the field contains the deleted version. */
    moveAffectedIssuesTo?: number;
    /** The ID of the version to update `fixVersion` to when the field contains the deleted version. */
    moveFixIssuesTo?: number;
    /** The ID of the version. */
    id: string;
  }) => Promise<unknown>;

  /**
   * Get version's unresolved issues count
   */
  getVersionUnresolvedIssues: (input: {
    /** The ID of the version. */
    id: string;
  }) => Promise<VersionUnresolvedIssuesCount>;

  /**
   * Delete related work
   */
  deleteRelatedWork: (input: {
    /** The ID of the version that the target related work belongs to. */
    versionId: string;
    /** The ID of the related work to delete. */
    relatedWorkId: string;
  }) => Promise<unknown>;

  /**
   * Delete webhooks by ID
   */
  deleteWebhookById: (input: {
    /** A list of webhook IDs. */
    webhookIds: (number)[];
  }) => Promise<ErrorCollection>;

  /**
   * Get dynamic webhooks for app
   */
  getDynamicWebhooksForApp: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanWebhook>;

  /**
   * Register dynamic webhooks
   */
  registerDynamicWebhooks: (input: {
    /** The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a single URL per app is allowed to be registered. */
    url: string;
    /** A list of webhooks. */
    webhooks: (WebhookDetails)[];
  }) => Promise<ContainerForRegisteredWebhooks>;

  /**
   * Get failed webhooks
   */
  getFailedWebhooks: (input: {
    /** The maximum number of webhooks to return per page. If obeying the maxResults directive would result in records with the same failure time being split across pages, the directive is ignored and all records with the same failure time included on the page. */
    maxResults?: number;
    /** The time after which any webhook failure must have occurred for the record to be returned, expressed as milliseconds since the UNIX epoch. */
    after?: number;
  }) => Promise<FailedWebhooks>;

  /**
   * Extend webhook life
   */
  refreshWebhooks: (input: {
    /** A list of webhook IDs. */
    webhookIds: (number)[];
  }) => Promise<WebhooksExpirationDate>;

  /**
   * Read workflow version from history
   */
  readWorkflowFromHistory: (input: {
    version?: number;
    workflowId?: string;
  }) => Promise<WorkflowHistoryReadResponseDto>;

  /**
   * List workflow history entries
   */
  listWorkflowHistory: (input: {
    /** The id of the workflow to read the history for. */
    workflowId?: string;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `includeIntermediateWorkflows` Includes intermediate workflow versions that are sometimes created during workflow updates or migrations. By default, these are omitted from the response. */
    expand?: string;
  }) => Promise<WorkflowHistoryListResponseDto>;

  /**
   * Get workflow transition rule configurations
   */
  getWorkflowTransitionRuleConfigurations: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The types of the transition rules to return. */
    types: ("postfunction" | "condition" | "validator")[];
    /** The transition rule class keys, as defined in the Connect or the Forge app descriptor, of the transition rules to return. */
    keys?: (string)[];
    /** The list of workflow names to filter by. */
    workflowNames?: (string)[];
    /** The list of `tags` to filter by. */
    withTags?: (string)[];
    /** **Deprecated:** Whether draft or published workflows are returned. If not provided, both workflow types are returned. The 'draft' parameter will be removed from this API on [November 2, 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147). */
    draft?: boolean;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts `transition`, which, for each rule, returns information about the transition the rule is assigned to. */
    expand?: string;
  }) => Promise<PageBeanWorkflowTransitionRules>;

  /**
   * Update workflow transition rule configurations
   */
  updateWorkflowTransitionRuleConfigurations: (input: {
    /** The list of workflows with transition rules to update. */
    workflows: (WorkflowTransitionRules)[];
  }) => Promise<WorkflowTransitionRulesUpdateErrors>;

  /**
   * Delete workflow transition rule configurations
   */
  deleteWorkflowTransitionRuleConfigurations: (input: {
    /** The list of workflows with transition rules to delete. */
    workflows: (WorkflowTransitionRulesDetails)[];
  }) => Promise<WorkflowTransitionRulesUpdateErrors>;

  /**
   * Get workflows paginated
   */
  getWorkflowsPaginated: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** The name of a workflow to return. To include multiple workflows, provide an ampersand-separated list. For example, `workflowName=name1&workflowName=name2`. */
    workflowName?: (string)[];
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `transitions` For each workflow, returns information about the transitions inside the workflow.  *  `transitions.rules` For each workflow transition, returns information about its rules. Transitions are included automatically if this expand is requested.  *  `transitions.properties` For each workflow transition, returns information about its properties. Transitions are included automatically if this expand is requested.  *  `statuses` For each workflow, returns information about the statuses inside the workflow.  *  `statuses.properties` For each workflow status, returns information about its properties. Statuses are included automatically if this expand is requested.  *  `default` For each workflow, returns information about whether this is the default workflow.  *  `schemes` For each workflow, returns information about the workflow schemes the workflow is assigned to.  *  `projects` For each workflow, returns information about the projects the workflow is assigned to, through workflow schemes.  *  `hasDraftWorkflow` For each workflow, returns information about whether the workflow has a draft version.  *  `operations` For each workflow, returns information about the actions that can be undertaken on the workflow. */
    expand?: string;
    /** String used to perform a case-insensitive partial match with workflow name. */
    queryString?: string;
    /** [Order](#ordering) the results by a field:   *  `name` Sorts by workflow name.  *  `created` Sorts by create time.  *  `updated` Sorts by update time. */
    orderBy?: "name" | "-name" | "+name" | "created" | "-created" | "+created" | "updated" | "+updated" | "-updated";
    /** Filters active and inactive workflows. */
    isActive?: boolean;
  }) => Promise<PageBeanWorkflow>;

  /**
   * Delete workflow transition property
   */
  deleteWorkflowTransitionProperty: (input: {
    /** The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition. */
    transitionId: number;
    /** The name of the transition property to delete, also known as the name of the property. */
    key: string;
    /** The name of the workflow that the transition belongs to. */
    workflowName: string;
    /** The workflow status. Set to `live` for inactive workflows or `draft` for draft workflows. Active workflows cannot be edited. */
    workflowMode?: "live" | "draft";
  }) => Promise<unknown>;

  /**
   * Get workflow transition properties
   */
  getWorkflowTransitionProperties: (input: {
    /** The ID of the transition. To get the ID, view the workflow in text mode in the Jira administration console. The ID is shown next to the transition. */
    transitionId: number;
    /** Some properties with keys that have the *jira.* prefix are reserved, which means they are not editable. To include these properties in the results, set this parameter to *true*. */
    includeReservedKeys?: boolean;
    /** The key of the property being returned, also known as the name of the property. If this parameter is not specified, all properties on the transition are returned. */
    key?: string;
    /** The name of the workflow that the transition belongs to. */
    workflowName: string;
    /** The workflow status. Set to *live* for active and inactive workflows, or *draft* for draft workflows. */
    workflowMode?: "live" | "draft";
  }) => Promise<WorkflowTransitionProperty>;

  /**
   * Create workflow transition property
   */
  createWorkflowTransitionProperty: (input: {
    /** The ID of the transition property. */
    id?: string;
    /** The key of the transition property. Also known as the name of the transition property. */
    key?: string;
    /** The value of the transition property. */
    value: string;
    /** The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition. */
    transitionId: number;
    /** The name of the workflow that the transition belongs to. */
    workflowName: string;
    /** The workflow status. Set to *live* for inactive workflows or *draft* for draft workflows. Active workflows cannot be edited. */
    workflowMode?: "live" | "draft";
    [key: string]: unknown;
  }, options: { query: { key: string } }) => Promise<WorkflowTransitionProperty>;

  /**
   * Update workflow transition property
   */
  updateWorkflowTransitionProperty: (input: {
    /** The ID of the transition property. */
    id?: string;
    /** The key of the transition property. Also known as the name of the transition property. */
    key?: string;
    /** The value of the transition property. */
    value: string;
    /** The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition. */
    transitionId: number;
    /** The name of the workflow that the transition belongs to. */
    workflowName: string;
    /** The workflow status. Set to `live` for inactive workflows or `draft` for draft workflows. Active workflows cannot be edited. */
    workflowMode?: "live" | "draft";
    [key: string]: unknown;
  }, options: { query: { key: string } }) => Promise<WorkflowTransitionProperty>;

  /**
   * Delete inactive workflow
   */
  deleteInactiveWorkflow: (input: {
    /** The entity ID of the workflow. */
    entityId: string;
  }) => Promise<unknown>;

  /**
   * Get issue types in a project that are using a given workflow
   */
  getWorkflowProjectIssueTypeUsages: (input: {
    /** The workflow ID */
    workflowId: string;
    /** The project ID */
    projectId: number;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<WorkflowProjectIssueTypeUsageDto>;

  /**
   * Get projects using a given workflow
   */
  getProjectUsagesForWorkflow: (input: {
    /** The workflow ID */
    workflowId: string;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<WorkflowProjectUsageDto>;

  /**
   * Get workflow schemes which are using a given workflow
   */
  getWorkflowSchemeUsagesForWorkflow: (input: {
    /** The workflow ID */
    workflowId: string;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<WorkflowSchemeUsageDto>;

  /**
   * Bulk get workflows
   */
  readWorkflows: (input: {
    /** The list of projects and issue types to query. */
    projectAndIssueTypes?: (ProjectAndIssueTypePair)[];
    /** The list of workflow IDs to query. */
    workflowIds?: (string)[];
    /** The list of workflow names to query. */
    workflowNames?: (string)[];
  }) => Promise<WorkflowReadResponse>;

  /**
   * Get available workflow capabilities
   */
  workflowCapabilities: (input: {
    workflowId?: string;
    projectId?: string;
    issueTypeId?: string;
  }) => Promise<WorkflowCapabilities>;

  /**
   * Bulk create workflows
   */
  createWorkflows: (input: {
    scope?: WorkflowScope;
    /** The statuses to associate with the workflows. */
    statuses?: (WorkflowStatusUpdate)[];
    /** The details of the workflows to create. */
    workflows?: (WorkflowCreate)[];
  }) => Promise<WorkflowCreateResponse>;

  /**
   * Validate create workflows
   */
  validateCreateWorkflows: (input: {
    payload: WorkflowCreateRequest;
    validationOptions?: ValidationOptionsForCreate;
  }) => Promise<WorkflowValidationErrorList>;

  /**
   * Get the user's default workflow editor
   */
  getDefaultEditor: () => Promise<DefaultWorkflowEditorResponse>;

  /**
   * Preview workflow
   */
  readWorkflowPreviews: (input: {
    /** The list of issue type IDs. At most 25 issue type IDs can be specified. */
    issueTypeIds?: (string)[];
    /** The projectId parameter is required and will be used for permission checks. In addition, you must supply at least one of the following lookup terms: *workflowNames*, *workflowIds*, or *issueTypeIds*. The specified workflows must be associated with the given project. */
    projectId: string;
    /** The list of workflow IDs to be returned. At most 25 workflow IDs can be specified. */
    workflowIds?: (string)[];
    /** The list of workflow names to be returned. At most 25 workflow names can be specified. */
    workflowNames?: (string)[];
  }) => Promise<WorkflowPreviewResponse>;

  /**
   * Search workflows
   */
  searchWorkflows: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
    /** Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `values.transitions` Returns the transitions that each workflow is associated with. */
    expand?: string;
    /** String used to perform a case-insensitive partial match with workflow name. */
    queryString?: string;
    /** [Order](#ordering) the results by a field:   *  `name` Sorts by workflow name.  *  `created` Sorts by create time.  *  `updated` Sorts by update time. */
    orderBy?: string;
    /** The scope of the workflow. Global for company-managed projects and Project for team-managed projects. */
    scope?: string;
    /** Filters active and inactive workflows. */
    isActive?: boolean;
  }) => Promise<WorkflowSearchResponse>;

  /**
   * Bulk update workflows
   */
  updateWorkflows: (input: {
    /** The statuses to associate with the workflows. */
    statuses?: (WorkflowStatusUpdate)[];
    /** The details of the workflows to update. */
    workflows?: (WorkflowUpdate)[];
  }) => Promise<WorkflowUpdateResponse>;

  /**
   * Validate update workflows
   */
  validateUpdateWorkflows: (input: {
    payload: WorkflowUpdateRequest;
    validationOptions?: ValidationOptionsForUpdate;
  }) => Promise<WorkflowValidationErrorList>;

  /**
   * Get all workflow schemes
   */
  getAllWorkflowSchemes: (input: {
    /** The index of the first item to return in a page of results (page offset). */
    startAt?: number;
    /** The maximum number of items to return per page. */
    maxResults?: number;
  }) => Promise<PageBeanWorkflowScheme>;

  /**
   * Create workflow scheme
   */
  createWorkflowScheme: (input: {
    /** The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*. */
    defaultWorkflow?: string;
    /** The description of the workflow scheme. */
    description?: string;
    /** Whether the workflow scheme is a draft or not. */
    draft?: boolean;
    /** The ID of the workflow scheme. */
    id?: number;
    /** The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. */
    issueTypeMappings?: { [key: string]: string | undefined };
    /** The issue types available in Jira. */
    issueTypes?: { [key: string]: IssueTypeDetails | undefined };
    /** The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. */
    lastModified?: string;
    /** The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. */
    lastModifiedUser?: User;
    /** The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme. */
    name?: string;
    /** For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. */
    originalDefaultWorkflow?: string;
    /** For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. */
    originalIssueTypeMappings?: { [key: string]: string | undefined };
    self?: string;
    /** Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:   *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.  Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
  }) => Promise<WorkflowScheme>;

  /**
   * Get workflow scheme project associations
   */
  getWorkflowSchemeProjectAssociations: (input: {
    /** The ID of a project to return the workflow schemes for. To include multiple projects, provide an ampersand-Jim: oneseparated list. For example, `projectId=10000&projectId=10001`. */
    projectId: (number)[];
  }) => Promise<ContainerOfWorkflowSchemeAssociations>;

  /**
   * Assign workflow scheme to project
   */
  assignSchemeToProject: (input: {
    /** The ID of the project. */
    projectId: string;
    /** The ID of the workflow scheme. If the workflow scheme ID is `null`, the operation assigns the default workflow scheme. */
    workflowSchemeId?: string;
  }) => Promise<unknown>;

  /**
   * Switch workflow scheme for project
   */
  switchWorkflowSchemeForProject: (input: {
    /** The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to another. This field is required if any statuses in the current project's workflows would no longer exist in the target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new status in the issue’s new workflow. */
    mappingsByIssueTypeOverride?: (MappingsByIssueTypeOverride)[];
    /** The ID of the project to switch the workflow scheme for */
    projectId?: string;
    /** The ID of the target workflow scheme to switch to */
    targetSchemeId?: string;
    [key: string]: unknown;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Bulk get workflow schemes
   */
  readWorkflowSchemes: (input: {
    /** The list of project IDs to query. */
    projectIds?: (string | null)[] | null;
    /** The list of workflow scheme IDs to query. */
    workflowSchemeIds?: (string | null)[] | null;
  }) => Promise<(WorkflowSchemeReadResponse)[]>;

  /**
   * Update workflow scheme
   */
  updateSchemes: (input: {
    /** The ID of the workflow for issue types without having a mapping defined in this workflow scheme. Only used in global-scoped workflow schemes. If the `defaultWorkflowId` isn't specified, this is set to *Jira Workflow (jira)*. */
    defaultWorkflowId?: string;
    /** The new description for this workflow scheme. */
    description: string;
    /** The ID of this workflow scheme. */
    id: string;
    /** The new name for this workflow scheme. */
    name: string;
    /** Overrides, for the selected issue types, any status mappings provided in `statusMappingsByWorkflows`. Status mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`. */
    statusMappingsByIssueTypeOverride?: (MappingsByIssueTypeOverride)[];
    /** The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`. */
    statusMappingsByWorkflows?: (MappingsByWorkflow)[];
    version: DocumentVersion;
    /** Mappings from workflows to issue types. */
    workflowsForIssueTypes?: (WorkflowSchemeAssociation)[];
    [key: string]: unknown;
  }) => Promise<unknown>;

  /**
   * Get required status mappings for workflow scheme update
   */
  getRequiredWorkflowSchemeMappings: (input: {
    /** The ID of the new default workflow for this workflow scheme. Only used in global-scoped workflow schemes. If it isn't specified, is set to *Jira Workflow (jira)*. */
    defaultWorkflowId?: string | null;
    /** The ID of the workflow scheme. */
    id: string;
    /** The new workflow to issue type mappings for this workflow scheme. */
    workflowsForIssueTypes: (WorkflowSchemeAssociation)[];
  }) => Promise<WorkflowSchemeUpdateRequiredMappingsResponse>;

  /**
   * Delete workflow scheme
   */
  deleteWorkflowScheme: (input: {
    /** The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get workflow scheme
   */
  getWorkflowScheme: (input: {
    /** The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*. */
    id: number;
    /** Returns the workflow scheme's draft rather than scheme itself, if set to true. If the workflow scheme does not have a draft, then the workflow scheme is returned. */
    returnDraftIfExists?: boolean;
  }) => Promise<WorkflowScheme>;

  /**
   * Classic update workflow scheme
   */
  updateWorkflowScheme: (input: {
    /** The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*. */
    defaultWorkflow?: string;
    /** The description of the workflow scheme. */
    description?: string;
    /** Whether the workflow scheme is a draft or not. */
    draft?: boolean;
    /** The ID of the workflow scheme. */
    id?: number;
    /** The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. */
    issueTypeMappings?: { [key: string]: string | undefined };
    /** The issue types available in Jira. */
    issueTypes?: { [key: string]: IssueTypeDetails | undefined };
    /** The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. */
    lastModified?: string;
    /** The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. */
    lastModifiedUser?: User;
    /** The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme. */
    name?: string;
    /** For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. */
    originalDefaultWorkflow?: string;
    /** For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. */
    originalIssueTypeMappings?: { [key: string]: string | undefined };
    self?: string;
    /** Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:   *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.  Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
  }, options: { params: { id: number } }) => Promise<WorkflowScheme>;

  /**
   * Create draft workflow scheme
   */
  createWorkflowSchemeDraftFromParent: (input: {
    /** The ID of the active workflow scheme that the draft is created from. */
    id: number;
  }) => Promise<WorkflowScheme>;

  /**
   * Delete default workflow
   */
  deleteDefaultWorkflow: (input: {
    /** The ID of the workflow scheme. */
    id: number;
    /** Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the workflow scheme cannot be edited. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
  }) => Promise<WorkflowScheme>;

  /**
   * Get default workflow
   */
  getDefaultWorkflow: (input: {
    /** The ID of the workflow scheme. */
    id: number;
    /** Set to `true` to return the default workflow for the workflow scheme's draft rather than scheme itself. If the workflow scheme does not have a draft, then the default workflow for the workflow scheme is returned. */
    returnDraftIfExists?: boolean;
  }) => Promise<DefaultWorkflow>;

  /**
   * Update default workflow
   */
  updateDefaultWorkflow: (input: {
    /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new default workflow. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
    /** The name of the workflow to set as the default workflow. */
    workflow: string;
    /** The ID of the workflow scheme. */
    id: number;
  }) => Promise<WorkflowScheme>;

  /**
   * Delete draft workflow scheme
   */
  deleteWorkflowSchemeDraft: (input: {
    /** The ID of the active workflow scheme that the draft was created from. */
    id: number;
  }) => Promise<unknown>;

  /**
   * Get draft workflow scheme
   */
  getWorkflowSchemeDraft: (input: {
    /** The ID of the active workflow scheme that the draft was created from. */
    id: number;
  }) => Promise<WorkflowScheme>;

  /**
   * Update draft workflow scheme
   */
  updateWorkflowSchemeDraft: (input: {
    /** The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*. */
    defaultWorkflow?: string;
    /** The description of the workflow scheme. */
    description?: string;
    /** Whether the workflow scheme is a draft or not. */
    draft?: boolean;
    /** The ID of the workflow scheme. */
    id?: number;
    /** The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. */
    issueTypeMappings?: { [key: string]: string | undefined };
    /** The issue types available in Jira. */
    issueTypes?: { [key: string]: IssueTypeDetails | undefined };
    /** The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. */
    lastModified?: string;
    /** The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. */
    lastModifiedUser?: User;
    /** The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme. */
    name?: string;
    /** For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. */
    originalDefaultWorkflow?: string;
    /** For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. */
    originalIssueTypeMappings?: { [key: string]: string | undefined };
    self?: string;
    /** Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:   *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.  Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
  }, options: { params: { id: number } }) => Promise<WorkflowScheme>;

  /**
   * Delete draft default workflow
   */
  deleteDraftDefaultWorkflow: (input: {
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
  }) => Promise<WorkflowScheme>;

  /**
   * Get draft default workflow
   */
  getDraftDefaultWorkflow: (input: {
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
  }) => Promise<DefaultWorkflow>;

  /**
   * Update draft default workflow
   */
  updateDraftDefaultWorkflow: (input: {
    /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new default workflow. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
    /** The name of the workflow to set as the default workflow. */
    workflow: string;
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
  }) => Promise<WorkflowScheme>;

  /**
   * Delete workflow for issue type in draft workflow scheme
   */
  deleteWorkflowSchemeDraftIssueType: (input: {
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
    /** The ID of the issue type. */
    issueType: string;
  }) => Promise<WorkflowScheme>;

  /**
   * Get workflow for issue type in draft workflow scheme
   */
  getWorkflowSchemeDraftIssueType: (input: {
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
    /** The ID of the issue type. */
    issueType: string;
  }) => Promise<IssueTypeWorkflowMapping>;

  /**
   * Set workflow for issue type in draft workflow scheme
   */
  setWorkflowSchemeDraftIssueType: (input: {
    /** The ID of the issue type. Not required if updating the issue type-workflow mapping. */
    issueType?: string;
    /** Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping. */
    updateDraftIfNeeded?: boolean;
    /** The name of the workflow. */
    workflow?: string;
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
  }, options: { params: { issueType: string } }) => Promise<WorkflowScheme>;

  /**
   * Publish draft workflow scheme
   */
  publishDraftWorkflowScheme: (input: {
    /** Mappings of statuses to new statuses for issue types. */
    statusMappings?: (StatusMapping)[];
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
    /** Whether the request only performs a validation. */
    validateOnly?: boolean;
  }) => Promise<TaskProgressBeanObject>;

  /**
   * Delete issue types for workflow in draft workflow scheme
   */
  deleteDraftWorkflowMapping: (input: {
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
    /** The name of the workflow. */
    workflowName: string;
  }) => Promise<unknown>;

  /**
   * Get issue types for workflows in draft workflow scheme
   */
  getDraftWorkflow: (input: {
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
    /** The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow. */
    workflowName?: string;
  }) => Promise<IssueTypesWorkflowMapping>;

  /**
   * Set issue types for workflow in workflow scheme
   */
  updateDraftWorkflowMapping: (input: {
    /** Whether the workflow is the default workflow for the workflow scheme. */
    defaultMapping?: boolean;
    /** The list of issue type IDs. */
    issueTypes?: (string)[];
    /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new workflow-issue types mapping. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
    /** The name of the workflow. Optional if updating the workflow-issue types mapping. */
    workflow?: string;
    /** The ID of the workflow scheme that the draft belongs to. */
    id: number;
    /** The name of the workflow. */
    workflowName: string;
  }) => Promise<WorkflowScheme>;

  /**
   * Delete workflow for issue type in workflow scheme
   */
  deleteWorkflowSchemeIssueType: (input: {
    /** The ID of the workflow scheme. */
    id: number;
    /** The ID of the issue type. */
    issueType: string;
    /** Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
  }) => Promise<WorkflowScheme>;

  /**
   * Get workflow for issue type in workflow scheme
   */
  getWorkflowSchemeIssueType: (input: {
    /** The ID of the workflow scheme. */
    id: number;
    /** The ID of the issue type. */
    issueType: string;
    /** Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned. */
    returnDraftIfExists?: boolean;
  }) => Promise<IssueTypeWorkflowMapping>;

  /**
   * Set workflow for issue type in workflow scheme
   */
  setWorkflowSchemeIssueType: (input: {
    /** The ID of the issue type. Not required if updating the issue type-workflow mapping. */
    issueType?: string;
    /** Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping. */
    updateDraftIfNeeded?: boolean;
    /** The name of the workflow. */
    workflow?: string;
    /** The ID of the workflow scheme. */
    id: number;
  }, options: { params: { issueType: string } }) => Promise<WorkflowScheme>;

  /**
   * Delete issue types for workflow in workflow scheme
   */
  deleteWorkflowMapping: (input: {
    /** The ID of the workflow scheme. */
    id: number;
    /** The name of the workflow. */
    workflowName: string;
    /** Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the workflow scheme cannot be edited. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
  }) => Promise<unknown>;

  /**
   * Get issue types for workflows in workflow scheme
   */
  getWorkflow: (input: {
    /** The ID of the workflow scheme. */
    id: number;
    /** The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow. */
    workflowName?: string;
    /** Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned. */
    returnDraftIfExists?: boolean;
  }) => Promise<IssueTypesWorkflowMapping>;

  /**
   * Set issue types for workflow in workflow scheme
   */
  updateWorkflowMapping: (input: {
    /** Whether the workflow is the default workflow for the workflow scheme. */
    defaultMapping?: boolean;
    /** The list of issue type IDs. */
    issueTypes?: (string)[];
    /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new workflow-issue types mapping. Defaults to `false`. */
    updateDraftIfNeeded?: boolean;
    /** The name of the workflow. Optional if updating the workflow-issue types mapping. */
    workflow?: string;
    /** The ID of the workflow scheme. */
    id: number;
    /** The name of the workflow. */
    workflowName: string;
  }) => Promise<WorkflowScheme>;

  /**
   * Get projects which are using a given workflow scheme
   */
  getProjectUsagesForWorkflowScheme: (input: {
    /** The workflow scheme ID */
    workflowSchemeId: string;
    /** The cursor for pagination */
    nextPageToken?: string;
    /** The maximum number of results to return. Must be an integer between 1 and 200. */
    maxResults?: number;
  }) => Promise<WorkflowSchemeProjectUsageDto>;

  /**
   * Get IDs of deleted worklogs
   */
  getIdsOfWorklogsDeletedSince: (input: {
    /** The date and time, as a UNIX timestamp in milliseconds, after which deleted worklogs are returned. */
    since?: number;
  }) => Promise<ChangedWorklogs>;

  /**
   * Get worklogs
   */
  getWorklogsForIds: (input: {
    /** A list of worklog IDs. */
    ids: (number)[];
    /** Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog. */
    expand?: string;
  }) => Promise<(Worklog)[]>;

  /**
   * Get IDs of updated worklogs
   */
  getIdsOfWorklogsModifiedSince: (input: {
    /** The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned. */
    since?: number;
    /** Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog. */
    expand?: string;
  }) => Promise<ChangedWorklogs>;

  /**
   * Get app properties
   */
  addonPropertiesResourceGetAddonPropertiesGet: (input: {
    /** The key of the app, as defined in its descriptor. */
    addonKey: string;
  }) => Promise<PropertyKeys>;

  /**
   * Delete app property
   */
  addonPropertiesResourceDeleteAddonPropertyDelete: (input: {
    /** The key of the app, as defined in its descriptor. */
    addonKey: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<OperationMessage>;

  /**
   * Get app property
   */
  addonPropertiesResourceGetAddonPropertyGet: (input: {
    /** The key of the app, as defined in its descriptor. */
    addonKey: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<EntityProperty>;

  /**
   * Set app property
   */
  addonPropertiesResourcePutAddonPropertyPut: (input: {
    body: unknown;
    /** The key of the app, as defined in its descriptor. */
    addonKey: string;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<OperationMessage>;

  /**
   * Remove modules
   */
  dynamicModulesResourceRemoveModulesDelete: (input: {
    /** The key of the module to remove. To include multiple module keys, provide multiple copies of this parameter. For example, `moduleKey=dynamic-attachment-entity-property&moduleKey=dynamic-select-field`. Nonexistent keys are ignored. */
    moduleKey?: (string)[];
  }) => Promise<ErrorMessage>;

  /**
   * Get modules
   */
  dynamicModulesResourceGetModulesGet: () => Promise<ConnectModules>;

  /**
   * Register modules
   */
  dynamicModulesResourceRegisterModulesPost: (input: {
    /** A list of app modules in the same format as the `modules` property in the [app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/). */
    modules: (ConnectModule)[];
  }) => Promise<ErrorMessage>;

  /**
   * Bulk update custom field value
   */
  appIssueFieldValueUpdateResourceUpdateIssueFieldsPut: (input: {
    /** The list of custom field update details. */
    updateValueList?: (ConnectCustomFieldValue)[];
  }, options: { headers: { "Atlassian-Transfer-Id": string } }) => Promise<unknown>;

  /**
   * Bulk update entity properties
   */
  migrationResourceUpdateEntityPropertiesValuePut: (input: {
    body: (EntityPropertyDetails)[];
    /** The type indicating the object that contains the entity properties. */
    entityType: "IssueProperty" | "CommentProperty" | "DashboardItemProperty" | "IssueTypeProperty" | "ProjectProperty" | "UserProperty" | "WorklogProperty" | "BoardProperty" | "SprintProperty";
  }, options: { headers: { "Atlassian-Transfer-Id": string } }) => Promise<unknown>;

  /**
   * Get workflow transition rule configurations
   */
  migrationResourceWorkflowRuleSearchPost: (input: {
    /** Use expand to include additional information in the response. This parameter accepts `transition` which, for each rule, returns information about the transition the rule is assigned to. */
    expand?: string;
    /** The list of workflow rule IDs. */
    ruleIds: (string)[];
    /** The workflow ID. */
    workflowEntityId: string;
  }, options: { headers: { "Atlassian-Transfer-Id": string } }) => Promise<WorkflowRulesSearchDetails>;

  /**
   * Get Connect issue field migration task
   */
  connectToForgeMigrationFetchTaskResourceFetchMigrationTaskGet: (input: {
    /** The key of the Connect app that contains the Jira issue field being migrated. */
    connectKey: string;
    /** The module key of the Connect issue field being migrated. */
    jiraIssueFieldsKey: string;
  }) => Promise<TaskProgress>;

  /**
   * Submit Connect issue field migration task
   */
  connectToForgeMigrationTaskSubmissionResourceSubmitTaskPost: (input: {
    /** The key of the Connect app that contains the Jira issue field being migrated. */
    connectKey: string;
    /** The module key of the Connect issue field being migrated. */
    jiraIssueFieldsKey: string;
  }) => Promise<OperationMessage>;

  /**
   * Retrieve the attributes of service registries
   */
  serviceRegistryResourceServicesGet: (input: {
    /** The ID of the services (the strings starting with "b:" need to be decoded in Base64). */
    serviceIds: (string)[];
  }) => Promise<(ServiceRegistry)[]>;

  /**
   * Get app property keys (Forge)
   */
  getForgeAppPropertyKeys: () => Promise<{ keys?: ({ key?: string; self?: string })[] }>;

  /**
   * Delete app property (Forge)
   */
  deleteForgeAppProperty: (input: {
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<OperationMessage>;

  /**
   * Get app property (Forge)
   */
  getForgeAppProperty: (input: {
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<{ key?: string; value?: unknown }>;

  /**
   * Set app property (Forge)
   */
  putForgeAppProperty: (input: {
    body: unknown;
    /** The key of the property. */
    propertyKey: string;
  }) => Promise<OperationMessage>;

  /**
   * Get worklogs by issue id and worklog id
   */
  getWorklogsByIssueIdAndWorklogId: (input: {
    /** A list of issue and worklog ID pairs. */
    requests?: (WorklogCompositeKey)[];
  }) => Promise<BulkWorklogKeyResponseBean>;
};

export * from "./schemas.js";
