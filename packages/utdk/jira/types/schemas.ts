export type ActorInputBean = {
  /** The name of the group to add as a default actor. This parameter cannot be used with the `groupId` parameter. As a group's name can change,use of `groupId` is recommended. This parameter accepts a comma-separated list. For example, `"group":["project-admin", "jira-developers"]`. */
  group?: (string)[];
  /** The ID of the group to add as a default actor. This parameter cannot be used with the `group` parameter This parameter accepts a comma-separated list. For example, `"groupId":["77f6ab39-e755-4570-a6ae-2d7a8df0bcb8", "0c011f85-69ed-49c4-a801-3b18d0f771bc"]`. */
  groupId?: (string)[];
  /** The account IDs of the users to add as default actors. This parameter accepts a comma-separated list. For example, `"user":["5b10a2844c20165700ede21g", "5b109f2e9729b51b54dc274d"]`. */
  user?: (string)[];
};

export type ActorsMap = {
  /** The name of the group to add. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended. */
  group?: (string)[];
  /** The ID of the group to add. This parameter cannot be used with the `group` parameter. */
  groupId?: (string)[];
  /** The user account ID of the user to add. */
  user?: (string)[];
};

export type AddAtlassianTeamRequest = {
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
};

export type AddFieldBean = {
  /** The ID of the field to add. */
  fieldId: string;
};

export type AddGroupBean = {
  /** The name of the group. */
  name: string;
  [key: string]: unknown;
};

/** Details of notifications which should be added to the notification scheme. */
export type AddNotificationsDetails = {
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents: (NotificationSchemeEventDetails)[];
  [key: string]: unknown;
};

export type AddSecuritySchemeLevelsRequestBean = {
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: (SecuritySchemeLevelBean)[];
};

/** Announcement banner configuration. */
export type AnnouncementBannerConfiguration = {
  /** Hash of the banner data. The client detects updates by comparing hash IDs. */
  hashId?: string;
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible?: boolean;
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled?: boolean;
  /** The text on the announcement banner. */
  message?: string;
  /** Visibility of the announcement banner. */
  visibility?: "public" | "private";
};

/** Configuration of the announcement banner. */
export type AnnouncementBannerConfigurationUpdate = {
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible?: boolean;
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled?: boolean;
  /** The text on the announcement banner. */
  message?: string;
  /** Visibility of the announcement banner. Can be public or private. */
  visibility?: string;
};

/** A workflow transition rule. */
export type AppWorkflowTransitionRule = {
  configuration: RuleConfiguration;
  /** The ID of the transition rule. */
  id: string;
  /** The key of the rule, as defined in the Connect or the Forge app descriptor. */
  key: string;
  transition?: WorkflowTransition;
};

/** The application the linked item is in. */
export type Application = {
  /** The name of the application. Used in conjunction with the (remote) object icon title to display a tooltip for the link's icon. The tooltip takes the format "\[application name\] icon title". Blank items are excluded from the tooltip title. If both items are blank, the icon tooltop displays as "Web Link". Grouping and sorting of links may place links without an application name last. */
  name?: string;
  /** The name-spaced type of the application, used by registered rendering apps. */
  type?: string;
  [key: string]: unknown;
};

/** Details of an application property. */
export type ApplicationProperty = {
  /** The allowed values, if applicable. */
  allowedValues?: (string)[];
  /** The default value of the application property. */
  defaultValue?: string;
  /** The description of the application property. */
  desc?: string;
  example?: string;
  /** The ID of the application property. The ID and key are the same. */
  id?: string;
  /** The key of the application property. The ID and key are the same. */
  key?: string;
  /** The name of the application property. */
  name?: string;
  /** The data type of the application property. */
  type?: string;
  /** The new value. */
  value?: string;
};

/** Details of an application role. */
export type ApplicationRole = {
  /** The groups that are granted default access for this application role. As a group's name can change, use of `defaultGroupsDetails` is recommended to identify a groups. */
  defaultGroups?: (string)[];
  /** The groups that are granted default access for this application role. */
  defaultGroupsDetails?: (GroupName)[];
  /** Deprecated. */
  defined?: boolean;
  /** The groups associated with the application role. */
  groupDetails?: (GroupName)[];
  /** The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended to identify a groups. */
  groups?: (string)[];
  hasUnlimitedSeats?: boolean;
  /** The key of the application role. */
  key?: string;
  /** The display name of the application role. */
  name?: string;
  /** The maximum count of users on your license. */
  numberOfSeats?: number;
  /** Indicates if the application role belongs to Jira platform (`jira-core`). */
  platform?: boolean;
  /** The count of users remaining on your license. */
  remainingSeats?: number;
  /** Determines whether this application role should be selected by default on user creation. */
  selectedByDefault?: boolean;
  /** The number of users counting against your license. */
  userCount?: number;
  /** The [type of users](https://confluence.atlassian.com/x/lRW3Ng) being counted against your license. */
  userCountDescription?: string;
};

/** The approval configuration of a status within a workflow. Applies only to Jira Service Management approvals. */
export type ApprovalConfiguration = {
  /** Whether the approval configuration is active. */
  active: "true" | "false";
  /** How the required approval count is calculated. It may be configured to require a specific number of approvals, or approval by a percentage of approvers. If the approvers source field is Approver groups, you can configure how many approvals per group are required for the request to be approved. The number will be the same across all groups. */
  conditionType: "number" | "percent" | "numberPerPrincipal";
  /** The number or percentage of approvals required for a request to be approved. If `conditionType` is `number`, the value must be 20 or less. If `conditionType` is `percent`, the value must be 100 or less. */
  conditionValue: string;
  /** A list of roles that should be excluded as possible approvers. */
  exclude?: ("assignee" | "reporter" | null)[] | null;
  /** The custom field ID of the "Approvers" or "Approver Groups" field. */
  fieldId: string;
  /** The custom field ID of the field used to pre-populate the Approver field. Only supports the "Affected Services" field. */
  prePopulatedFieldId?: string | null;
  /** The numeric ID of the transition to be executed if the request is approved. */
  transitionApproved: string;
  /** The numeric ID of the transition to be executed if the request is declined. */
  transitionRejected: string;
};

/** Approval configuration. */
export type ApprovalConfigurationPreview = {
  /** The active approval configuration. */
  active?: string;
  /** The transition ID for approved state. */
  transitionApproved?: string;
  /** The transition ID for rejected state. */
  transitionRejected?: string;
};

export type ArchiveIssueAsyncRequest = {
  jql?: string;
};

/** Details of a filter for exporting archived issues. */
export type ArchivedIssuesFilterRequest = {
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
};

/** Details of a field configuration to issue type mappings. */
export type AssociateFieldConfigurationsWithIssueTypesRequest = {
  /** Field configuration to issue type mappings. */
  mappings: (FieldConfigurationToIssueTypeMapping)[];
};

/** Issue security scheme, project, and remapping details. */
export type AssociateSecuritySchemeWithProjectDetails = {
  /** The list of scheme levels which should be remapped to new levels of the issue security scheme. */
  oldToNewSecurityLevelMappings?: (OldToNewSecurityLevelMappingsBean)[];
  /** The ID of the project. */
  projectId: string;
  /** The ID of the issue security scheme. Providing null will clear the association with the issue security scheme. */
  schemeId: string;
};

/** Details of an item associated with the changed record. */
export type AssociatedItemBean = {
  /** The ID of the associated record. */
  id?: string;
  /** The name of the associated record. */
  name?: string;
  /** The ID of the associated parent record. */
  parentId?: string;
  /** The name of the associated parent record. */
  parentName?: string;
  /** The type of the associated record. */
  typeName?: string;
};

/** Field association for example PROJECT\_ID. */
export type AssociationContextObject = {
  identifier?: { [key: string]: unknown };
  type: string;
};

/** Details about an attachment. */
export type Attachment = {
  /** Details of the user who added the attachment. */
  author?: UserDetails;
  /** The content of the attachment. */
  content?: string;
  /** The datetime the attachment was created. */
  created?: string;
  /** The file name of the attachment. */
  filename?: string;
  /** The ID of the attachment. */
  id?: string;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** The URL of the attachment details response. */
  self?: string;
  /** The size of the attachment. */
  size?: number;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
  [key: string]: unknown;
};

export type AttachmentArchive = {
  entries?: (AttachmentArchiveEntry)[];
  moreAvailable?: boolean;
  totalEntryCount?: number;
  totalNumberOfEntriesAvailable?: number;
};

export type AttachmentArchiveEntry = {
  abbreviatedName?: string;
  entryIndex?: number;
  mediaType?: string;
  name?: string;
  size?: number;
};

export type AttachmentArchiveImpl = {
  /** The list of the items included in the archive. */
  entries?: (AttachmentArchiveEntry)[];
  /** The number of items in the archive. */
  totalEntryCount?: number;
};

/** Metadata for an item in an attachment archive. */
export type AttachmentArchiveItemReadable = {
  /** The position of the item within the archive. */
  index?: number;
  /** The label for the archive item. */
  label?: string;
  /** The MIME type of the archive item. */
  mediaType?: string;
  /** The path of the archive item. */
  path?: string;
  /** The size of the archive item. */
  size?: string;
};

/** Metadata for an archive (for example a zip) and its contents. */
export type AttachmentArchiveMetadataReadable = {
  /** The list of the items included in the archive. */
  entries?: (AttachmentArchiveItemReadable)[];
  /** The ID of the attachment. */
  id?: number;
  /** The MIME type of the attachment. */
  mediaType?: string;
  /** The name of the archive file. */
  name?: string;
  /** The number of items included in the archive. */
  totalEntryCount?: number;
};

/** Metadata for an issue attachment. */
export type AttachmentMetadata = {
  /** Details of the user who attached the file. */
  author?: User;
  /** The URL of the attachment. */
  content?: string;
  /** The datetime the attachment was created. */
  created?: string;
  /** The name of the attachment file. */
  filename?: string;
  /** The ID of the attachment. */
  id?: number;
  /** The MIME type of the attachment. */
  mimeType?: string;
  /** Additional properties of the attachment. */
  properties?: { [key: string]: unknown | undefined };
  /** The URL of the attachment metadata details. */
  self?: string;
  /** The size of the attachment. */
  size?: number;
  /** The URL of a thumbnail representing the attachment. */
  thumbnail?: string;
};

/** Details of the instance's attachment settings. */
export type AttachmentSettings = {
  /** Whether the ability to add attachments is enabled. */
  enabled?: boolean;
  /** The maximum size of attachments permitted, in bytes. */
  uploadLimit?: number;
};

/** An audit record. */
export type AuditRecordBean = {
  /** The list of items associated with the changed record. */
  associatedItems?: (AssociatedItemBean)[];
  /** Deprecated, use `authorAccountId` instead. The key of the user who created the audit record. */
  authorKey?: string;
  /** The category of the audit record. For a list of these categories, see the help article [Auditing in Jira applications](https://confluence.atlassian.com/x/noXKM). */
  category?: string;
  /** The list of values changed in the record event. */
  changedValues?: (ChangedValueBean)[];
  /** The date and time on which the audit record was created. */
  created?: string;
  /** The description of the audit record. */
  description?: string;
  /** The event the audit record originated from. */
  eventSource?: string;
  /** The ID of the audit record. */
  id?: number;
  objectItem?: AssociatedItemBean;
  /** The URL of the computer where the creation of the audit record was initiated. */
  remoteAddress?: string;
  /** The summary of the audit record. */
  summary?: string;
};

/** Container for a list of audit records. */
export type AuditRecords = {
  /** The requested or default limit on the number of audit items to be returned. */
  limit?: number;
  /** The number of audit items skipped before the first item in this list. */
  offset?: number;
  /** The list of audit items. */
  records?: (AuditRecordBean)[];
  /** The total number of audit items returned. */
  total?: number;
};

/** A field auto-complete suggestion. */
export type AutoCompleteSuggestion = {
  /** The display name of a suggested item. If `fieldValue` or `predicateValue` are provided, the matching text is highlighted with the HTML bold tag. */
  displayName?: string;
  /** The value of a suggested item. */
  value?: string;
};

/** The results from a JQL query. */
export type AutoCompleteSuggestions = {
  /** The list of suggested item. */
  results?: (AutoCompleteSuggestion)[];
};

/** The details of the available dashboard gadget. */
export type AvailableDashboardGadget = {
  /** The module key of the gadget type. */
  moduleKey?: string;
  /** The title of the gadget. */
  title: string;
  /** The URI of the gadget type. */
  uri?: string;
};

/** The list of available gadgets. */
export type AvailableDashboardGadgetsResponse = {
  /** The list of available gadgets. */
  gadgets: (AvailableDashboardGadget)[];
};

/** The Connect provided ecosystem rules available. */
export type AvailableWorkflowConnectRule = {
  /** The add-on providing the rule. */
  addonKey?: string;
  /** The URL creation path segment defined in the Connect module. */
  createUrl?: string;
  /** The rule description. */
  description?: string;
  /** The URL edit path segment defined in the Connect module. */
  editUrl?: string;
  /** The module providing the rule. */
  moduleKey?: string;
  /** The rule name. */
  name?: string;
  /** The rule key. */
  ruleKey?: string;
  /** The rule type. */
  ruleType?: "Condition" | "Validator" | "Function" | "Screen";
  /** The URL view path segment defined in the Connect module. */
  viewUrl?: string;
};

/** The Forge provided ecosystem rules available. */
export type AvailableWorkflowForgeRule = {
  /** The rule description. */
  description?: string;
  /** The unique ARI of the forge rule type. */
  id?: string;
  /** The rule name. */
  name?: string;
  /** The rule key. */
  ruleKey?: string;
  /** The rule type. */
  ruleType?: "Condition" | "Validator" | "Function" | "Screen";
};

/** The Atlassian provided system rules available. */
export type AvailableWorkflowSystemRule = {
  /** The rule description. */
  description: string;
  /** List of rules that conflict with this one. */
  incompatibleRuleKeys: (string)[];
  /** Whether the rule can be added added to an initial transition. */
  isAvailableForInitialTransition: boolean;
  /** Whether the rule is visible. */
  isVisible: boolean;
  /** The rule name. */
  name: string;
  /** The rule key. */
  ruleKey: string;
  /** The rule type. */
  ruleType: "Condition" | "Validator" | "Function" | "Screen";
};

/** The list of available trigger types. */
export type AvailableWorkflowTriggerTypes = {
  /** The description of the trigger rule. */
  description?: string;
  /** The name of the trigger rule. */
  name?: string;
  /** The type identifier of trigger rule. */
  type?: string;
};

/** The trigger rules available. */
export type AvailableWorkflowTriggers = {
  /** The list of available trigger types. */
  availableTypes: (AvailableWorkflowTriggerTypes)[];
  /** The rule key of the rule. */
  ruleKey: string;
};

/** Details of an avatar. */
export type Avatar = {
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
  [key: string]: unknown;
};

export type AvatarUrlsBean = {
  /** The URL of the item's 16x16 pixel avatar. */
  "16x16"?: string;
  /** The URL of the item's 24x24 pixel avatar. */
  "24x24"?: string;
  /** The URL of the item's 32x32 pixel avatar. */
  "32x32"?: string;
  /** The URL of the item's 48x48 pixel avatar. */
  "48x48"?: string;
};

/** Details about system and custom avatars. */
export type Avatars = {
  /** Custom avatars list. */
  custom?: (Avatar)[];
  /** System avatars list. */
  system?: (Avatar)[];
};

/** The payload for creating a board column */
export type BoardColumnPayload = {
  /** The maximum issue constraint for the column */
  maximumIssueConstraint?: number;
  /** The minimum issue constraint for the column */
  minimumIssueConstraint?: number;
  /** The name of the column */
  name?: string;
  /** The status IDs for the column */
  statusIds?: (ProjectCreateResourceIdentifier)[];
};

/** The payload for setting a board feature */
export type BoardFeaturePayload = {
  /** The key of the feature */
  featureKey?: "ESTIMATION" | "SPRINTS";
  /** Whether the feature should be turned on or off */
  state?: true | false;
};

/** Configuration of features for one or more boards. Replaces the deprecated features field on BoardPayload */
export type BoardFeaturesPayload = {
  /** A map of board PCRIs to the list of features to enable on each board. */
  boardFeatures?: { [key: string]: (BoardFeaturePayload)[] | undefined };
};

/** The payload for creating a board */
export type BoardPayload = {
  /** Takes in a JQL string to create a new filter. If no value is provided, it'll default to a JQL filter for the project creating */
  boardFilterJQL?: string;
  /** Card color settings of the board */
  cardColorStrategy?: "ISSUE_TYPE" | "REQUEST_TYPE" | "ASSIGNEE" | "PRIORITY" | "NONE" | "CUSTOM";
  cardLayout?: CardLayout;
  /** Card layout settings of the board */
  cardLayouts?: (CardLayoutField)[];
  /** The columns of the board */
  columns?: (BoardColumnPayload)[];
  /** Feature settings for the board. Deprecated: use boardFeatures capability instead. */
  features?: (BoardFeaturePayload)[];
  /** The name of the board */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The quick filters for the board. */
  quickFilters?: (QuickFilterPayload)[];
  /** Whether sprints are supported on the board */
  supportsSprint?: boolean;
  swimlanes?: SwimlanesPayload;
  workingDaysConfig?: WorkingDaysConfig;
};

export type BoardsPayload = {
  /** The boards to be associated with the project. */
  boards?: (BoardPayload)[];
};

/** Details for changing owners of shareable entities */
export type BulkChangeOwnerDetails = {
  /** Whether the name is fixed automatically if it's duplicated after changing owner. */
  autofixName: boolean;
  /** The account id of the new owner. */
  newOwner: string;
};

/** Request bean for bulk changelog retrieval */
export type BulkChangelogRequestBean = {
  /** List of field IDs to filter changelogs */
  fieldIds?: (string)[];
  /** List of issue IDs/keys to fetch changelogs for */
  issueIdsOrKeys: (string)[];
  /** The maximum number of items to return per page */
  maxResults?: number;
  /** The cursor for pagination */
  nextPageToken?: string;
};

/** A page of changelogs which is designed to handle multiple issues */
export type BulkChangelogResponseBean = {
  /** The list of issues changelogs. */
  issueChangeLogs?: (IssueChangeLog)[];
  /** Continuation token to fetch the next page. If this result represents the last or the only page, this token will be null. */
  nextPageToken?: string;
};

/** Details of the contextual configuration for a custom field. */
export type BulkContextualConfiguration = {
  /** The field configuration. */
  configuration?: unknown;
  /** The ID of the custom field. */
  customFieldId: string;
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: string;
  /** The ID of the configuration. */
  id: string;
  /** The field value schema. */
  schema?: unknown;
};

/** Details of the options to create for a custom field. */
export type BulkCustomFieldOptionCreateRequest = {
  /** Details of options to create. */
  options?: (CustomFieldOptionCreate)[];
};

/** Details of the options to update for a custom field. */
export type BulkCustomFieldOptionUpdateRequest = {
  /** Details of the options to update. */
  options?: (CustomFieldOptionUpdate)[];
};

/** Errors of bulk edit action. */
export type BulkEditActionError = {
  /** The error messages. */
  errorMessages: (string)[];
  /** The errors. */
  errors: { [key: string]: string | undefined };
};

/** Bulk Edit Get Fields Response. */
export type BulkEditGetFields = {
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** List of all the fields */
  fields?: (IssueBulkEditField)[];
  /** The start cursor for use in pagination. */
  startingAfter?: string;
};

/** Details of a request to bulk edit shareable entity. */
export type BulkEditShareableEntityRequest = {
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
};

/** Details of a request to bulk edit shareable entity. */
export type BulkEditShareableEntityResponse = {
  /** Allowed action for bulk edit shareable entity */
  action: "changeOwner" | "changePermission" | "addPermission" | "removePermission";
  /** The mapping dashboard id to errors if any. */
  entityErrors?: { [key: string]: BulkEditActionError | undefined };
};

export type BulkFetchIssueRequestBean = {
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
};

/** A container for the watch status of a list of issues. */
export type BulkIssueIsWatching = {
  /** The map of issue ID to boolean watch status. */
  issuesIsWatching?: { [key: string]: boolean | undefined };
};

/** Bulk issue property update request details. */
export type BulkIssuePropertyUpdateRequest = {
  /** EXPERIMENTAL. The Jira expression to calculate the value of the property. The value of the expression must be an object that can be converted to JSON, such as a number, boolean, string, list, or map. The context variables available to the expression are `issue` and `user`. Issues for which the expression returns a value whose JSON representation is longer than 32768 characters are ignored. */
  expression?: string;
  /** The bulk operation filter. */
  filter?: IssueFilterForBulkPropertySet;
  /** The value of the property. The value must be a [valid](https://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters. */
  value?: unknown;
};

/** The list of requested issues & fields. */
export type BulkIssueResults = {
  /** When Jira can't return an issue enumerated in a request due to a retriable error or payload constraint, we'll return the respective issue ID with a corresponding error message. This list is empty when there are no errors Issues which aren't found or that the user doesn't have permission to view won't be returned in this list. */
  issueErrors?: (IssueError)[];
  /** The list of issues. */
  issues?: (IssueBean)[];
};

export type BulkOperationErrorResponse = {
  errors?: (ErrorMessage)[];
};

export type BulkOperationErrorResult = {
  elementErrors?: ErrorCollection;
  failedElementNumber?: number;
  status?: number;
};

export type BulkOperationProgress = {
  /** A timestamp of when the task was submitted. */
  created?: string;
  /** Map of issue IDs for which the operation failed and that the user has permission to view, to their one or more reasons for failure. These reasons are open-ended text descriptions of the error and are not selected from a predefined list of standard reasons. */
  failedAccessibleIssues?: { [key: string]: (string)[] | undefined };
  /** The number of issues that are either invalid or issues that the user doesn't have permission to view, regardless of the success or failure of the operation. */
  invalidOrInaccessibleIssueCount?: number;
  /** List of issue IDs for which the operation was successful and that the user has permission to view. */
  processedAccessibleIssues?: (number)[];
  /** Progress of the task as a percentage. */
  progressPercent?: number;
  /** A timestamp of when the task was started. */
  started?: string;
  /** The status of the task. */
  status?: "ENQUEUED" | "RUNNING" | "COMPLETE" | "FAILED" | "CANCEL_REQUESTED" | "CANCELLED" | "DEAD";
  submittedBy?: User;
  /** The ID of the task. */
  taskId?: string;
  /** The number of issues that the bulk operation was attempted on. */
  totalIssueCount?: number;
  /** A timestamp of when the task progress was last updated. */
  updated?: string;
};

/** Details of global and project permissions granted to the user. */
export type BulkPermissionGrants = {
  /** List of permissions granted to the user. */
  globalPermissions: (string)[];
  /** List of project permissions and the projects and issues those permissions provide access to. */
  projectPermissions: (BulkProjectPermissionGrants)[];
};

/** Details of global permissions to look up and project permissions with associated projects and issues to look up. */
export type BulkPermissionsRequestBean = {
  /** The account ID of a user. */
  accountId?: string;
  /** Global permissions to look up. */
  globalPermissions?: (string)[];
  /** Project permissions with associated projects and issues to look up. */
  projectPermissions?: (BulkProjectPermissions)[];
};

/** List of project permissions and the projects and issues those permissions grant access to. */
export type BulkProjectPermissionGrants = {
  /** IDs of the issues the user has the permission for. */
  issues: (number)[];
  /** A project permission, */
  permission: string;
  /** IDs of the projects the user has the permission for. */
  projects: (number)[];
};

/** Details of project permissions and associated issues and projects to look up. */
export type BulkProjectPermissions = {
  /** List of issue IDs. */
  issues?: (number)[];
  /** List of project permissions. */
  permissions: (string)[];
  /** List of project IDs. */
  projects?: (number)[];
};

export type BulkRedactionRequest = {
  redactions?: (SingleRedactionRequest)[];
};

export type BulkRedactionResponse = {
  /** Result for requested redactions */
  results: (SingleRedactionResponse)[];
};

/** Bulk Transition Get Available Transitions Response. */
export type BulkTransitionGetAvailableTransitions = {
  /** List of available transitions for bulk transition operation for requested issues grouped by workflow */
  availableTransitions?: (IssueBulkTransitionForWorkflow)[];
  /** The end cursor for use in pagination. */
  endingBefore?: string;
  /** The start cursor for use in pagination. */
  startingAfter?: string;
};

export type BulkTransitionSubmitInput = {
  /** List of all the issue IDs or keys that are to be bulk transitioned. */
  selectedIssueIdsOrKeys: (string)[];
  /** The ID of the transition that is to be performed on the issues. */
  transitionId: string;
};

export type BulkWorklogKeyRequestBean = {
  /** A list of issue and worklog ID pairs. */
  requests?: (WorklogCompositeKey)[];
};

export type BulkWorklogKeyResponseBean = {
  /** A list of successfully retrieved worklogs with their issue and worklog IDs. */
  worklogs?: (WorklogKeyResult)[];
};

/** Card layout configuration. */
export type CardLayout = {
  /** Whether to show days in column */
  showDaysInColumn?: true | false;
};

/** Card layout settings of the board */
export type CardLayoutField = {
  fieldId?: string;
  id?: number;
  mode?: "PLAN" | "WORK";
  position?: number;
};

/** A change item. */
export type ChangeDetails = {
  /** The name of the field changed. */
  field?: string;
  /** The ID of the field changed. */
  fieldId?: string;
  /** The type of the field changed. */
  fieldtype?: string;
  /** The details of the original value. */
  from?: string;
  /** The details of the original value as a string. */
  fromString?: string;
  /** The details of the new value. */
  to?: string;
  /** The details of the new value as a string. */
  toString?: string;
};

/** The account ID of the new owner. */
export type ChangeFilterOwner = {
  /** The account ID of the new owner. */
  accountId: string;
};

/** Details of names changed in the record event. */
export type ChangedValueBean = {
  /** The value of the field before the change. */
  changedFrom?: string;
  /** The value of the field after the change. */
  changedTo?: string;
  /** The name of the field changed. */
  fieldName?: string;
};

/** Details of a changed worklog. */
export type ChangedWorklog = {
  /** Details of properties associated with the change. */
  properties?: (EntityProperty)[];
  /** The datetime of the change. */
  updatedTime?: number;
  /** The ID of the worklog. */
  worklogId?: number;
};

/** List of changed worklogs. */
export type ChangedWorklogs = {
  lastPage?: boolean;
  /** The URL of the next list of changed worklogs. */
  nextPage?: string;
  /** The URL of this changed worklogs list. */
  self?: string;
  /** The datetime of the first worklog item in the list. */
  since?: number;
  /** The datetime of the last worklog item in the list. */
  until?: number;
  /** Changed worklog list. */
  values?: (ChangedWorklog)[];
};

/** A log of changes made to issue fields. Changelogs related to workflow associations are currently being deprecated. */
export type Changelog = {
  /** The user who made the change. */
  author?: UserDetails;
  /** The date on which the change took place. */
  created?: string;
  /** The history metadata associated with the changed. */
  historyMetadata?: HistoryMetadata;
  /** The ID of the changelog. */
  id?: string;
  /** The list of items changed. */
  items?: (ChangeDetails)[];
};

/** Details of an issue navigator column item. */
export type ColumnItem = {
  /** The issue navigator column label. */
  label?: string;
  /** The issue navigator column value. */
  value?: string;
};

export type ColumnRequestBody = {
  columns?: (string)[];
};

/** A comment. */
export type Comment = {
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
  [key: string]: unknown;
};

/** Count of issues assigned to a component. */
export type ComponentIssuesCount = {
  /** The count of issues assigned to a component. */
  issueCount?: number;
  /** The URL for this count of issues for a component. */
  self?: string;
};

export type ComponentJsonBean = {
  ari?: string;
  description?: string;
  id?: string;
  metadata?: { [key: string]: string | undefined };
  name?: string;
  self?: string;
  [key: string]: unknown;
};

/** Details about a component with a count of the issues it contains. */
export type ComponentWithIssueCount = {
  /** The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component. */
  assignee?: User;
  /** The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Takes the following values:   *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.  *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.  *  `UNASSIGNED` an assignee is not set for issues created with this component.  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in. */
  assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /** The description for the component. */
  description?: string;
  /** The unique identifier for the component. */
  id?: string;
  /** Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. */
  isAssigneeTypeValid?: boolean;
  /** Count of issues for the component. */
  issueCount?: number;
  /** The user details for the component's lead user. */
  lead?: User;
  /** The name for the component. */
  name?: string;
  /** The key of the project to which the component is assigned. */
  project?: string;
  /** Not used. */
  projectId?: number;
  /** The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. */
  realAssignee?: User;
  /** The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:   *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.  *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.  *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.  *  `PROJECT_DEFAULT` when none of the preceding cases are true. */
  realAssigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /** The URL for this count of the issues contained in the component. */
  self?: string;
};

/** A JQL query clause that consists of nested clauses. For example, `(labels in (urgent, blocker) OR lastCommentedBy = currentUser()). Note that, where nesting is not defined, the parser nests JQL clauses based on the operator precedence. For example, "A OR B AND C" is parsed as "(A OR B) AND C". See Setting the precedence of operators for more information about precedence in JQL queries.` */
export type CompoundClause = {
  /** The list of nested clauses. */
  clauses: (JqlQueryClause)[];
  /** The operator between the clauses. */
  operator: "and" | "or" | "not";
};

/** The conditions group associated with the transition. */
export type ConditionGroupConfiguration = {
  /** The nested conditions of the condition group. */
  conditionGroups?: (ConditionGroupConfiguration)[];
  /** The rules for this condition. */
  conditions?: (WorkflowRuleConfiguration)[];
  /** Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the group must be true for the group to evaluate to true. */
  operation?: "ANY" | "ALL";
};

/** The payload for creating a condition group in a workflow */
export type ConditionGroupPayload = {
  /** The nested conditions of the condition group. */
  conditionGroup?: (ConditionGroupPayload)[];
  /** The rules for this condition. */
  conditions?: (RulePayload)[];
  /** Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the group must be true for the group to evaluate to true. */
  operation?: "ANY" | "ALL";
};

/** The conditions group associated with the transition. */
export type ConditionGroupUpdate = {
  /** The nested conditions of the condition group. */
  conditionGroups?: (ConditionGroupUpdate)[];
  /** The rules for this condition. */
  conditions?: (WorkflowRuleConfiguration)[];
  /** Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the group must be true for the group to evaluate to true. */
  operation: "ANY" | "ALL";
};

/** Details about the configuration of Jira. */
export type Configuration = {
  /** Whether the ability to add attachments to issues is enabled. */
  attachmentsEnabled?: boolean;
  /** Whether the ability to link issues is enabled. */
  issueLinkingEnabled?: boolean;
  /** Whether the ability to create subtasks for issues is enabled. */
  subTasksEnabled?: boolean;
  /** The configuration of time tracking. */
  timeTrackingConfiguration?: TimeTrackingConfiguration;
  /** Whether the ability to track time is enabled. This property is deprecated. */
  timeTrackingEnabled?: boolean;
  /** Whether the ability to create unassigned issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details. */
  unassignedIssuesAllowed?: boolean;
  /** Whether the ability for users to vote on issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details. */
  votingEnabled?: boolean;
  /** Whether the ability for users to watch issues is enabled. See [Configuring Jira application options](https://confluence.atlassian.com/x/uYXKM) for details. */
  watchingEnabled?: boolean;
};

/** List of custom fields identifiers which will be used to filter configurations */
export type ConfigurationsListParameters = {
  /** List of IDs or keys of the custom fields. It can be a mix of IDs and keys in the same query. */
  fieldIdsOrKeys: (string)[];
};

/** A list of custom field details. */
export type ConnectCustomFieldValue = {
  /** The type of custom field. */
  _type: "StringIssueField" | "NumberIssueField" | "RichTextIssueField" | "SingleSelectIssueField" | "MultiSelectIssueField" | "TextIssueField";
  /** The custom field ID. */
  fieldID: number;
  /** The issue ID. */
  issueID: number;
  /** The value of number type custom field when `_type` is `NumberIssueField`. */
  number?: number;
  /** The value of single select and multiselect custom field type when `_type` is `SingleSelectIssueField` or `MultiSelectIssueField`. */
  optionID?: string;
  /** The value of richText type custom field when `_type` is `RichTextIssueField`. */
  richText?: string;
  /** The value of string type custom field when `_type` is `StringIssueField`. */
  string?: string;
  /** The value of of text custom field type when `_type` is `TextIssueField`. */
  text?: string;
};

/** Details of updates for a custom field. */
export type ConnectCustomFieldValues = {
  /** The list of custom field update details. */
  updateValueList?: (ConnectCustomFieldValue)[];
};

/** A [Connect module](https://developer.atlassian.com/cloud/jira/platform/about-jira-modules/) in the same format as in the [app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/). */
export type ConnectModule = { [key: string]: unknown };

export type ConnectModules = {
  /** A list of app modules in the same format as the `modules` property in the [app descriptor](https://developer.atlassian.com/cloud/jira/platform/app-descriptor/). */
  modules: (ConnectModule)[];
};

/** A workflow transition rule. */
export type ConnectWorkflowTransitionRule = {
  configuration: RuleConfiguration;
  /** The ID of the transition rule. */
  id: string;
  /** The key of the rule, as defined in the Connect app descriptor. */
  key: string;
  transition?: WorkflowTransition;
};

/** The list of features on a project. */
export type ContainerForProjectFeatures = {
  /** The project features. */
  features?: (ProjectFeature)[];
};

/** Container for a list of registered webhooks. Webhook details are returned in the same order as the request. */
export type ContainerForRegisteredWebhooks = {
  /** A list of registered webhooks. */
  webhookRegistrationResult?: (RegisteredWebhook)[];
};

/** Container for a list of webhook IDs. */
export type ContainerForWebhookIDs = {
  /** A list of webhook IDs. */
  webhookIds: (number)[];
};

/** A container for a list of workflow schemes together with the projects they are associated with. */
export type ContainerOfWorkflowSchemeAssociations = {
  /** A list of workflow schemes together with projects they are associated with. */
  values: (WorkflowSchemeAssociations)[];
};

/** Represents the content to redact */
export type ContentItem = {
  /** The ID of the content entity.   *  For redacting an issue field, this will be the field ID (e.g., summary, customfield\_10000).  *  For redacting a comment, this will be the comment ID.  *  For redacting a worklog, this will be the worklog ID. */
  entityId: string;
  /** The type of the entity to redact; It will be one of the following:   *  **issuefieldvalue** \- To redact in issue fields  *  **issue-comment** \- To redact in issue comments.  *  **issue-worklog** \- To redact in issue worklogs */
  entityType: "issuefieldvalue" | "issue-comment" | "issue-worklog";
  /** This would be the issue ID */
  id: string;
};

/** A context. */
export type Context = {
  /** The ID of the context. */
  id?: number;
  /** The name of the context. */
  name?: string;
  /** The scope of the context. */
  scope?: Scope;
};

/** The project and issue type mapping with a matching custom field context. */
export type ContextForProjectAndIssueType = {
  /** The ID of the custom field context. */
  contextId: string;
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the project. */
  projectId: string;
};

/** Details of the contextual configuration for a custom field. */
export type ContextualConfiguration = {
  /** The field configuration. */
  configuration?: unknown;
  /** The ID of the field context the configuration is associated with. */
  fieldContextId: string;
  /** The ID of the configuration. */
  id: string;
  /** The field value schema. */
  schema?: unknown;
};

/** The converted JQL queries. */
export type ConvertedJqlQueries = {
  /** List of queries containing user information that could not be mapped to an existing user */
  queriesWithUnknownUsers?: (JqlQueryWithUnknownUsers)[];
  /** The list of converted query strings with account IDs in place of user identifiers. */
  queryStrings?: (string)[];
};

export type CreateCrossProjectReleaseRequest = {
  /** The cross-project release name. */
  name: string;
  /** The IDs of the releases to include in the cross-project release. */
  releaseIds?: (number)[];
};

/** The details of a created custom field context. */
export type CreateCustomFieldContext = {
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
};

export type CreateCustomFieldRequest = {
  /** The custom field ID. */
  customFieldId: number;
  /** Allows filtering issues based on their values for the custom field. */
  filter?: boolean;
};

export type CreateDateFieldRequest = {
  /** A date custom field ID. This is required if the type is "DateCustomField". */
  dateCustomFieldId?: number;
  /** The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: "DueDate" | "TargetStartDate" | "TargetEndDate" | "DateCustomField";
};

export type CreateExclusionRulesRequest = {
  /** The IDs of the issues to exclude from the plan. */
  issueIds?: (number)[];
  /** The IDs of the issue types to exclude from the plan. */
  issueTypeIds?: (number)[];
  /** Issues completed this number of days ago will be excluded from the plan. */
  numberOfDaysToShowCompletedIssues?: number;
  /** The IDs of the releases to exclude from the plan. */
  releaseIds?: (number)[];
  /** The IDs of the work status categories to exclude from the plan. */
  workStatusCategoryIds?: (number)[];
  /** The IDs of the work statuses to exclude from the plan. */
  workStatusIds?: (number)[];
};

export type CreateFieldAssociationSchemeLinksBean = {
  associations?: string;
  projects?: string;
};

/** Request object for creating a new field association scheme. */
export type CreateFieldAssociationSchemeRequest = {
  /** Description of the scheme to be created */
  description?: string;
  /** The name of the scheme to be created */
  name: string;
};

/** Response object after successfully creating a new field association scheme. */
export type CreateFieldAssociationSchemeResponse = {
  description?: string;
  id?: number;
  links?: CreateFieldAssociationSchemeLinksBean;
  name?: string;
};

/** Issue security scheme and it's details */
export type CreateIssueSecuritySchemeDetails = {
  /** The description of the issue security scheme. */
  description?: string;
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: (SecuritySchemeLevelBean)[];
  /** The name of the issue security scheme. Must be unique (case-insensitive). */
  name: string;
  [key: string]: unknown;
};

export type CreateIssueSourceRequest = {
  /** The issue source type. This must be "Board", "Project" or "Filter". */
  type: "Board" | "Project" | "Filter";
  /** The issue source value. This must be a board ID if the type is "Board", a project ID if the type is "Project" or a filter ID if the type is "Filter". */
  value: number;
};

/** Details of an notification scheme. */
export type CreateNotificationSchemeDetails = {
  /** The description of the notification scheme. */
  description?: string;
  /** The name of the notification scheme. Must be unique (case-insensitive). */
  name: string;
  /** The list of notifications which should be added to the notification scheme. */
  notificationSchemeEvents?: (NotificationSchemeEventDetails)[];
  [key: string]: unknown;
};

export type CreatePermissionHolderRequest = {
  /** The permission holder type. This must be "Group" or "AccountId". */
  type: "Group" | "AccountId";
  /** The permission holder value. This must be a group name if the type is "Group" or an account ID if the type is "AccountId". */
  value: string;
};

export type CreatePermissionRequest = {
  /** The permission holder. */
  holder: CreatePermissionHolderRequest;
  /** The permission type. This must be "View" or "Edit". */
  type: "View" | "Edit";
};

export type CreatePlanOnlyTeamRequest = {
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
};

export type CreatePlanRequest = {
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
};

/** Details of an issue priority. */
export type CreatePriorityDetails = {
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
};

/** Details of a new priority scheme */
export type CreatePrioritySchemeDetails = {
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
};

/** Details about the project. */
export type CreateProjectDetails = {
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
};

/** Details of an issue resolution. */
export type CreateResolutionDetails = {
  /** The description of the resolution. */
  description?: string;
  /** The name of the resolution. Must be unique (case-insensitive). */
  name: string;
  [key: string]: unknown;
};

export type CreateSchedulingRequest = {
  /** The dependencies for the plan. This must be "Sequential" or "Concurrent". */
  dependencies?: "Sequential" | "Concurrent";
  /** The end date field for the plan. */
  endDate?: CreateDateFieldRequest;
  /** The estimation unit for the plan. This must be "StoryPoints", "Days" or "Hours". */
  estimation: "StoryPoints" | "Days" | "Hours";
  /** The inferred dates for the plan. This must be "None", "SprintDates" or "ReleaseDates". */
  inferredDates?: "None" | "SprintDates" | "ReleaseDates";
  /** The start date field for the plan. */
  startDate?: CreateDateFieldRequest;
};

/** The details of a UI modification. */
export type CreateUiModificationDetails = {
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts?: (UiModificationContextDetails)[];
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: string;
};

export type CreateUpdateRoleRequestBean = {
  /** A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role. */
  description?: string;
  /** The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role. */
  name?: string;
};

/** Details about a created issue or subtask. */
export type CreatedIssue = {
  /** The ID of the created issue or subtask. */
  id?: string;
  /** The key of the created issue or subtask. */
  key?: string;
  /** The URL of the created issue or subtask. */
  self?: string;
  /** The response code and messages related to any requested transition. */
  transition?: NestedResponse;
  /** The response code and messages related to any requested watchers. */
  watchers?: NestedResponse;
};

/** Details about the issues created and the errors for requests that failed. */
export type CreatedIssues = {
  /** Error details for failed issue creation requests. */
  errors?: (BulkOperationErrorResult)[];
  /** Details of the issues created. */
  issues?: (CreatedIssue)[];
};

export type CustomContextVariable = {
  /** Type of custom context variable. */
  type: string;
};

/** Details of configurations for a custom field. */
export type CustomFieldConfigurations = {
  /** The list of custom field configuration details. */
  configurations: (ContextualConfiguration)[];
};

/** The details of a custom field context. */
export type CustomFieldContext = {
  /** The description of the context. */
  description: string;
  /** The ID of the context. */
  id: string;
  /** Whether the context apply to all issue types. */
  isAnyIssueType: boolean;
  /** Whether the context is global. */
  isGlobalContext: boolean;
  /** The name of the context. */
  name: string;
};

export type CustomFieldContextDefaultValue = CustomFieldContextDefaultValueCascadingOption | CustomFieldContextDefaultValueMultipleOption | CustomFieldContextDefaultValueSingleOption | CustomFieldContextSingleUserPickerDefaults | CustomFieldContextDefaultValueMultiUserPicker | CustomFieldContextDefaultValueSingleGroupPicker | CustomFieldContextDefaultValueMultipleGroupPicker | CustomFieldContextDefaultValueDate | CustomFieldContextDefaultValueDateTime | CustomFieldContextDefaultValueUrl | CustomFieldContextDefaultValueProject | CustomFieldContextDefaultValueFloat | CustomFieldContextDefaultValueLabels | CustomFieldContextDefaultValueTextField | CustomFieldContextDefaultValueTextArea | CustomFieldContextDefaultValueReadOnly | CustomFieldContextDefaultValueSingleVersionPicker | CustomFieldContextDefaultValueMultipleVersionPicker | CustomFieldContextDefaultValueForgeStringField | CustomFieldContextDefaultValueForgeMultiStringField | CustomFieldContextDefaultValueForgeObjectField | CustomFieldContextDefaultValueForgeDateTimeField | CustomFieldContextDefaultValueForgeGroupField | CustomFieldContextDefaultValueForgeMultiGroupField | CustomFieldContextDefaultValueForgeNumberField | CustomFieldContextDefaultValueForgeUserField | CustomFieldContextDefaultValueForgeMultiUserField;

/** The default value for a cascading select custom field. */
export type CustomFieldContextDefaultValueCascadingOption = {
  /** The ID of the default cascading option. */
  cascadingOptionId?: string;
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default option. */
  optionId: string;
  type: string;
};

/** The default value for a Date custom field. */
export type CustomFieldContextDefaultValueDate = {
  /** The ID of the context. */
  contextId: string;
  /** The default date in ISO format. Ignored if `useCurrent` is true. */
  date?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
};

/** The default value for a date time custom field. */
export type CustomFieldContextDefaultValueDateTime = {
  /** The ID of the context. */
  contextId: string;
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
};

/** Default value for a float (number) custom field. */
export type CustomFieldContextDefaultValueFloat = {
  /** The ID of the context. */
  contextId: string;
  /** The default floating-point number. */
  number: number;
  type: string;
};

/** The default value for a Forge date time custom field. */
export type CustomFieldContextDefaultValueForgeDateTimeField = {
  /** The ID of the context. */
  contextId: string;
  /** The default date-time in ISO format. Ignored if `useCurrent` is true. */
  dateTime?: string;
  type: string;
  /** Whether to use the current date. */
  useCurrent?: boolean;
};

/** The default value for a Forge group custom field. */
export type CustomFieldContextDefaultValueForgeGroupField = {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the the default group. */
  groupId: string;
  type: string;
};

/** The default value for a Forge collection of groups custom field. */
export type CustomFieldContextDefaultValueForgeMultiGroupField = {
  /** The ID of the context. */
  contextId: string;
  /** The IDs of the default groups. */
  groupIds: (string)[];
  type: string;
};

/** The default text for a Forge collection of strings custom field. */
export type CustomFieldContextDefaultValueForgeMultiStringField = {
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** List of string values. The maximum length for a value is 254 characters. */
  values?: (string)[];
};

/** Defaults for a Forge collection of users custom field. */
export type CustomFieldContextDefaultValueForgeMultiUserField = {
  /** The IDs of the default users. */
  accountIds: (string)[];
  /** The ID of the context. */
  contextId: string;
  type: string;
};

/** Default value for a Forge number custom field. */
export type CustomFieldContextDefaultValueForgeNumberField = {
  /** The ID of the context. */
  contextId: string;
  /** The default floating-point number. */
  number: number;
  type: string;
};

/** The default value for a Forge object custom field. */
export type CustomFieldContextDefaultValueForgeObjectField = {
  /** The ID of the context. */
  contextId: string;
  /** The default JSON object. */
  object?: { [key: string]: unknown };
  type: string;
};

/** The default text for a Forge string custom field. */
export type CustomFieldContextDefaultValueForgeStringField = {
  /** The ID of the context. */
  contextId: string;
  /** The default text. The maximum length is 254 characters. */
  text?: string;
  type: string;
};

/** Defaults for a Forge user custom field. */
export type CustomFieldContextDefaultValueForgeUserField = {
  /** The ID of the default user. */
  accountId: string;
  /** The ID of the context. */
  contextId: string;
  type: string;
  userFilter: UserFilter;
};

/** Default value for a labels custom field. */
export type CustomFieldContextDefaultValueLabels = {
  /** The ID of the context. */
  contextId: string;
  /** The default labels value. */
  labels: (string)[];
  type: string;
};

/** The default value for a User Picker (multiple) custom field. */
export type CustomFieldContextDefaultValueMultiUserPicker = {
  /** The IDs of the default users. */
  accountIds: (string)[];
  /** The ID of the context. */
  contextId: string;
  type: string;
};

/** The default value for a multiple group picker custom field. */
export type CustomFieldContextDefaultValueMultipleGroupPicker = {
  /** The ID of the context. */
  contextId: string;
  /** The IDs of the default groups. */
  groupIds: (string)[];
  type: string;
};

/** The default value for a multi-select custom field. */
export type CustomFieldContextDefaultValueMultipleOption = {
  /** The ID of the context. */
  contextId: string;
  /** The list of IDs of the default options. */
  optionIds: (string)[];
  type: string;
};

/** The default value for a multiple version picker custom field. */
export type CustomFieldContextDefaultValueMultipleVersionPicker = {
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** The IDs of the default versions. */
  versionIds: (string)[];
  /** The order the pickable versions are displayed in. If not provided, the released-first order is used. Available version orders are `"releasedFirst"` and `"unreleasedFirst"`. */
  versionOrder?: string;
};

/** The default value for a project custom field. */
export type CustomFieldContextDefaultValueProject = {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default project. */
  projectId: string;
  type: string;
};

/** The default text for a read only custom field. */
export type CustomFieldContextDefaultValueReadOnly = {
  /** The ID of the context. */
  contextId: string;
  /** The default text. The maximum length is 255 characters. */
  text?: string;
  type: string;
};

/** The default value for a group picker custom field. */
export type CustomFieldContextDefaultValueSingleGroupPicker = {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the the default group. */
  groupId: string;
  type: string;
};

/** The default value for a single select custom field. */
export type CustomFieldContextDefaultValueSingleOption = {
  /** The ID of the context. */
  contextId: string;
  /** The ID of the default option. */
  optionId: string;
  type: string;
};

/** The default value for a version picker custom field. */
export type CustomFieldContextDefaultValueSingleVersionPicker = {
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** The ID of the default version. */
  versionId: string;
  /** The order the pickable versions are displayed in. If not provided, the released-first order is used. Available version orders are `"releasedFirst"` and `"unreleasedFirst"`. */
  versionOrder?: string;
};

/** The default text for a text area custom field. */
export type CustomFieldContextDefaultValueTextArea = {
  /** The ID of the context. */
  contextId: string;
  /** The default text. The maximum length is 32767 characters. */
  text?: string;
  type: string;
};

/** The default text for a text custom field. */
export type CustomFieldContextDefaultValueTextField = {
  /** The ID of the context. */
  contextId: string;
  /** The default text. The maximum length is 254 characters. */
  text?: string;
  type: string;
};

/** The default value for a URL custom field. */
export type CustomFieldContextDefaultValueUrl = {
  /** The ID of the context. */
  contextId: string;
  type: string;
  /** The default URL. */
  url: string;
};

/** Default values to update. */
export type CustomFieldContextDefaultValueUpdate = {
  defaultValues?: (CustomFieldContextDefaultValue)[];
};

/** Details of the custom field options for a context. */
export type CustomFieldContextOption = {
  /** Whether the option is disabled. */
  disabled: boolean;
  /** The ID of the custom field option. */
  id: string;
  /** For cascading options, the ID of the custom field option containing the cascading option. */
  optionId?: string;
  /** The value of the custom field option. */
  value: string;
};

/** Details of a context to project association. */
export type CustomFieldContextProjectMapping = {
  /** The ID of the context. */
  contextId: string;
  /** Whether context is global. */
  isGlobalContext?: boolean;
  /** The ID of the project. */
  projectId?: string;
};

/** Defaults for a User Picker (single) custom field. */
export type CustomFieldContextSingleUserPickerDefaults = {
  /** The ID of the default user. */
  accountId: string;
  /** The ID of the context. */
  contextId: string;
  type: string;
  userFilter: UserFilter;
};

/** Details of a custom field context. */
export type CustomFieldContextUpdateDetails = {
  /** The description of the custom field context. The maximum length is 255 characters. */
  description?: string;
  /** The name of the custom field context. The name must be unique. The maximum length is 255 characters. */
  name?: string;
};

/** A list of custom field options for a context. */
export type CustomFieldCreatedContextOptionsList = {
  /** The created custom field options. */
  options?: (CustomFieldContextOption)[];
};

export type CustomFieldDefinitionJsonBean = {
  /** The description of the custom field, which is displayed in Jira. */
  description?: string;
  /** The name of the custom field, which is displayed in Jira. This is not the unique identifier. */
  name: string;
  /** The searcher defines the way the field is searched in Jira. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher*.   The search UI (basic search and JQL search) will display different operations and values for the field, based on the field searcher. You must specify a searcher that is valid for the field type, as listed below (abbreviated values shown):   *  `cascadingselect`: `cascadingselectsearcher`  *  `datepicker`: `daterange`  *  `datetime`: `datetimerange`  *  `float`: `exactnumber` or `numberrange`  *  `grouppicker`: `grouppickersearcher`  *  `importid`: `exactnumber` or `numberrange`  *  `labels`: `labelsearcher`  *  `multicheckboxes`: `multiselectsearcher`  *  `multigrouppicker`: `multiselectsearcher`  *  `multiselect`: `multiselectsearcher`  *  `multiuserpicker`: `userpickergroupsearcher`  *  `multiversion`: `versionsearcher`  *  `project`: `projectsearcher`  *  `radiobuttons`: `multiselectsearcher`  *  `readonlyfield`: `textsearcher`  *  `select`: `multiselectsearcher`  *  `textarea`: `textsearcher`  *  `textfield`: `textsearcher`  *  `url`: `exacttextsearcher`  *  `userpicker`: `userpickergroupsearcher`  *  `version`: `versionsearcher`  If no searcher is provided, the field isn't searchable. However, [Forge custom fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-) have a searcher set automatically, so are always searchable. */
  searcherKey?: "com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:daterange" | "com.atlassian.jira.plugin.system.customfieldtypes:datetimerange" | "com.atlassian.jira.plugin.system.customfieldtypes:exactnumber" | "com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:numberrange" | "com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:textsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher";
  /** The type of the custom field. These built-in custom field types are available:   *  `cascadingselect`: Enables values to be selected from two levels of select lists (value: `com.atlassian.jira.plugin.system.customfieldtypes:cascadingselect`)  *  `datepicker`: Stores a date using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:datepicker`)  *  `datetime`: Stores a date with a time component (value: `com.atlassian.jira.plugin.system.customfieldtypes:datetime`)  *  `float`: Stores and validates a numeric (floating point) input (value: `com.atlassian.jira.plugin.system.customfieldtypes:float`)  *  `grouppicker`: Stores a user group using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:grouppicker`)  *  `importid`: A read-only field that stores the ID the issue had in the system it was imported from (value: `com.atlassian.jira.plugin.system.customfieldtypes:importid`)  *  `labels`: Stores labels (value: `com.atlassian.jira.plugin.system.customfieldtypes:labels`)  *  `multicheckboxes`: Stores multiple values using checkboxes (value: ``)  *  `multigrouppicker`: Stores multiple user groups using a picker control (value: ``)  *  `multiselect`: Stores multiple values using a select list (value: `com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes`)  *  `multiuserpicker`: Stores multiple users using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:multigrouppicker`)  *  `multiversion`: Stores multiple versions from the versions available in a project using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:multiversion`)  *  `project`: Stores a project from a list of projects that the user is permitted to view (value: `com.atlassian.jira.plugin.system.customfieldtypes:project`)  *  `radiobuttons`: Stores a value using radio buttons (value: `com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons`)  *  `readonlyfield`: Stores a read-only text value, which can only be populated via the API (value: `com.atlassian.jira.plugin.system.customfieldtypes:readonlyfield`)  *  `select`: Stores a value from a configurable list of options (value: `com.atlassian.jira.plugin.system.customfieldtypes:select`)  *  `textarea`: Stores a long text string using a multiline text area (value: `com.atlassian.jira.plugin.system.customfieldtypes:textarea`)  *  `textfield`: Stores a text string using a single-line text box (value: `com.atlassian.jira.plugin.system.customfieldtypes:textfield`)  *  `url`: Stores a URL (value: `com.atlassian.jira.plugin.system.customfieldtypes:url`)  *  `userpicker`: Stores a user using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:userpicker`)  *  `version`: Stores a version using a picker control (value: `com.atlassian.jira.plugin.system.customfieldtypes:version`)  To create a field based on a [Forge custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-), use the ID of the Forge custom field type as the value. For example, `ari:cloud:ecosystem::extension/e62f20a2-4b61-4dbe-bfb9-9a88b5e3ac84/548c5df1-24aa-4f7c-bbbb-3038d947cb05/static/my-cf-type-key`. */
  type: string;
};

/** Details of a custom option for a field. */
export type CustomFieldOption = {
  /** The URL of these custom field option details. */
  self?: string;
  /** The value of the custom field option. */
  value?: string;
};

/** Details of a custom field option to create. */
export type CustomFieldOptionCreate = {
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** For cascading options, the ID of a parent option. */
  optionId?: string;
  /** The value of the custom field option. */
  value: string;
};

/** Details of a custom field option for a context. */
export type CustomFieldOptionUpdate = {
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** The ID of the custom field option. */
  id: string;
  /** The value of the custom field option. */
  value?: string;
};

/** Defines the payload for the custom field definitions. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/\#api-rest-api-3-field-post */
export type CustomFieldPayload = {
  /** The type of the custom field */
  cfType?: string;
  /** The description of the custom field */
  description?: string;
  /** The name of the custom field */
  name?: string;
  /** The strategy to use when there is a conflict with an existing custom field. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
  /** Allows an overwrite to declare the new Custom Field to be created as a GLOBAL-scoped field. Leave this as empty or null to use the project's default scope. */
  scope?: "GLOBAL" | "TEMPLATE" | "PROJECT";
  /** The searcher key of the custom field */
  searcherKey?: string;
};

/** Details about the replacement for a deleted version. */
export type CustomFieldReplacement = {
  /** The ID of the custom field in which to replace the version number. */
  customFieldId?: number;
  /** The version number to use as a replacement for the deleted version. */
  moveTo?: number;
};

/** A list of custom field options for a context. */
export type CustomFieldUpdatedContextOptionsList = {
  /** The updated custom field options. */
  options?: (CustomFieldOptionUpdate)[];
};

/** A list of issue IDs and the value to update a custom field to. */
export type CustomFieldValueUpdate = {
  /** The list of issue IDs. */
  issueIds: (number)[];
  /** The value for the custom field. The value must be compatible with the [custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#data-types) as follows:   *  `string` the value must be a string.  *  `number` the value must be a number.  *  `datetime` the value must be a string that represents a date in the ISO format or the simplified extended ISO format. For example, `"2023-01-18T12:00:00-03:00"` or `"2023-01-18T12:00:00.000Z"`. However, the milliseconds part is ignored.  *  `user` the value must be an object that contains the `accountId` field.  *  `group` the value must be an object that contains the group `name` or `groupId` field. Because group names can change, we recommend using `groupId`.  A list of appropriate values must be provided if the field is of the `list` [collection type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#collection-types). */
  value: unknown;
};

/** Details of updates for a custom field. */
export type CustomFieldValueUpdateDetails = {
  /** The list of custom field update details. */
  updates?: (CustomFieldValueUpdate)[];
};

export type CustomTemplateOptions = {
  /** Enable screen delegated admin support for the template. This means screen and associated schemes will be copied rather than referenced. */
  enableScreenDelegatedAdminSupport?: boolean;
  /** Enable workflow delegated admin support for the template. This means workflows and workflow schemes will be copied rather than referenced. */
  enableWorkflowDelegatedAdminSupport?: boolean;
};

/** The specific request object for creating a project with template. */
export type CustomTemplateRequestDto = {
  boardFeatures?: BoardFeaturesPayload;
  boards?: BoardsPayload;
  field?: FieldCapabilityPayload;
  issueType?: IssueTypeProjectCreatePayload;
  notification?: NotificationSchemePayload;
  permissionScheme?: PermissionPayloadDto;
  project?: ProjectPayload;
  role?: RolesCapabilityPayload;
  scope?: ScopePayload;
  security?: SecuritySchemePayload;
  workflow?: WorkflowCapabilityPayload;
};

/** Project Details */
export type CustomTemplatesProjectDetails = {
  /** The access level of the project. Only used by team-managed project */
  accessLevel?: "open" | "limited" | "private" | "free";
  /** Additional properties of the project */
  additionalProperties?: { [key: string]: string | undefined };
  /** The default assignee when creating issues in the project */
  assigneeType?: "PROJECT_DEFAULT" | "COMPONENT_LEAD" | "PROJECT_LEAD" | "UNASSIGNED";
  /** The ID of the project's avatar. Use the \[Get project avatars\](\#api-rest-api-3-project-projectIdOrKey-avatar-get) operation to list the available avatars in a project. */
  avatarId?: number;
  /** The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation. */
  categoryId?: number;
  /** Brief description of the project */
  description?: string;
  /** Whether components are enabled for the project. Only used by company-managed project */
  enableComponents?: boolean;
  /** Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters. */
  key?: string;
  /** The default language for the project */
  language?: string;
  /** The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be provided with `lead`. */
  leadAccountId?: string;
  /** Name of the project */
  name?: string;
  /** A link to information about this project, such as project documentation */
  url?: string;
};

/** Details of a dashboard. */
export type Dashboard = {
  /** The automatic refresh interval for the dashboard in milliseconds. */
  automaticRefreshMs?: number;
  description?: string;
  /** The details of any edit share permissions for the dashboard. */
  editPermissions?: (SharePermission)[];
  /** The ID of the dashboard. */
  id?: string;
  /** Whether the dashboard is selected as a favorite by the user. */
  isFavourite?: boolean;
  /** Whether the current user has permission to edit the dashboard. */
  isWritable?: boolean;
  /** The name of the dashboard. */
  name?: string;
  /** The owner of the dashboard. */
  owner?: UserBean;
  /** The number of users who have this dashboard as a favorite. */
  popularity?: number;
  /** The rank of this dashboard. */
  rank?: number;
  /** The URL of these dashboard details. */
  self?: string;
  /** The details of any view share permissions for the dashboard. */
  sharePermissions?: (SharePermission)[];
  /** Whether the current dashboard is system dashboard. */
  systemDashboard?: boolean;
  /** The URL of the dashboard. */
  view?: string;
};

/** Details of a dashboard. */
export type DashboardDetails = {
  /** The description of the dashboard. */
  description?: string;
  /** The edit permissions for the dashboard. */
  editPermissions: (SharePermission)[];
  /** The name of the dashboard. */
  name: string;
  /** The share permissions for the dashboard. */
  sharePermissions: (SharePermission)[];
};

/** Details of a gadget. */
export type DashboardGadget = {
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color: "blue" | "red" | "yellow" | "green" | "cyan" | "purple" | "gray" | "white";
  /** The ID of the gadget instance. */
  id: number;
  /** The module key of the gadget type. */
  moduleKey?: string;
  /** The position of the gadget. */
  position: DashboardGadgetPosition;
  /** The title of the gadget. */
  title: string;
  /** The URI of the gadget type. */
  uri?: string;
};

/** Details of a gadget position. */
export type DashboardGadgetPosition = {
  "The column position of the gadget.": number;
  "The row position of the gadget.": number;
};

/** The list of gadgets on the dashboard. */
export type DashboardGadgetResponse = {
  /** The list of gadgets. */
  gadgets: (DashboardGadget)[];
};

/** Details of the settings for a dashboard gadget. */
export type DashboardGadgetSettings = {
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
};

/** The details of the gadget to update. */
export type DashboardGadgetUpdateRequest = {
  /** The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. */
  color?: string;
  /** The position of the gadget. */
  position?: DashboardGadgetPosition;
  /** The title of the gadget. */
  title?: string;
};

/** The data classification. */
export type DataClassificationLevelsBean = {
  /** The data classifications. */
  classifications?: (DataClassificationTagBean)[];
};

/** The data classification. */
export type DataClassificationTagBean = {
  /** The color of the data classification object. */
  color?: string;
  /** The description of the data classification object. */
  description?: string;
  /** The guideline of the data classification object. */
  guideline?: string;
  /** The guideline in ADF (Atlassian Document Format) for rich text rendering. */
  guidelineADF?: string;
  /** The ID of the data classification object. */
  id: string;
  /** The name of the data classification object. */
  name?: string;
  /** The rank of the data classification object. */
  rank?: number;
  /** The status of the data classification object. */
  status: string;
};

/** List issues archived within a specified date range. */
export type DateRangeFilterRequest = {
  /** List issues archived after a specified date, passed in the YYYY-MM-DD format. */
  dateAfter: string;
  /** List issues archived before a specified date provided in the YYYY-MM-DD format. */
  dateBefore: string;
};

/** Details of scheme and new default level. */
export type DefaultLevelValue = {
  /** The ID of the issue security level to set as default for the specified scheme. Providing null will reset the default level. */
  defaultLevelId: string;
  /** The ID of the issue security scheme to set default level for. */
  issueSecuritySchemeId: string;
  [key: string]: unknown;
};

/** Details of the scope of the default sharing for new filters and dashboards. */
export type DefaultShareScope = {
  /** The scope of the default sharing for new filters and dashboards:   *  `AUTHENTICATED` Shared with all logged-in users.  *  `GLOBAL` Shared with all logged-in users. This shows as `AUTHENTICATED` in the response.  *  `PRIVATE` Not shared with any users. */
  scope: "GLOBAL" | "AUTHENTICATED" | "PRIVATE";
};

/** Details about the default workflow. */
export type DefaultWorkflow = {
  /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new default workflow. Defaults to `false`. */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow to set as the default workflow. */
  workflow: string;
};

export type DefaultWorkflowEditorResponse = {
  value?: "NEW" | "LEGACY";
};

export type DeleteAndReplaceVersionBean = {
  /** An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the deleted version. */
  customFieldReplacementList?: (CustomFieldReplacement)[];
  /** The ID of the version to update `affectedVersion` to when the field contains the deleted version. */
  moveAffectedIssuesTo?: number;
  /** The ID of the version to update `fixVersion` to when the field contains the deleted version. */
  moveFixIssuesTo?: number;
};

/** Response object after successfully deleting a field association scheme. */
export type DeleteFieldAssociationSchemeResponse = {
  deleted?: boolean;
  id?: string;
};

export type DetailedErrorCollection = {
  /** Map of objects representing additional details for an error */
  details?: { [key: string]: unknown | undefined };
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages?: (string)[];
  /** The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters." */
  errors?: { [key: string]: string | undefined };
};

/** The current version details of this workflow scheme. */
export type DocumentVersion = {
  /** The version UUID. */
  id?: string;
  /** The version number. */
  versionNumber?: number;
};

export type DuplicatePlanRequest = {
  /** The plan name. */
  name: string;
};

/** Request to edit a custom template */
export type EditTemplateRequest = {
  /** The description of the template */
  templateDescription?: string;
  templateGenerationOptions?: CustomTemplateOptions;
  /** The unique identifier of the template */
  templateKey?: string;
  /** The name of the template */
  templateName?: string;
};

/** An entity property, for more information see [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/). */
export type EntityProperty = {
  /** The key of the property. Required on create and update. */
  key?: string;
  /** The value of the property. Required on create and update. */
  value?: unknown;
};

export type EntityPropertyDetails = {
  /** The entity property ID. */
  entityId: number;
  /** The entity property key. */
  key: string;
  /** The new value of the entity property. */
  value: string;
};

export type Error = {
  count?: number;
  issueIdsOrKeys?: (string)[];
  message?: string;
};

/** Error messages from an operation. */
export type ErrorCollection = {
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages?: (string)[];
  /** The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters." */
  errors?: { [key: string]: string | undefined };
  status?: number;
};

export type ErrorCollections = { [key: string]: unknown };

export type ErrorMessage = {
  message?: string;
};

export type Errors = {
  issueIsSubtask?: Error;
  issuesInArchivedProjects?: Error;
  issuesInUnlicensedProjects?: Error;
  issuesNotFound?: Error;
  userDoesNotHavePermission?: Error;
};

/** Details about a notification associated with an event. */
export type EventNotification = {
  /** The email address. */
  emailAddress?: string;
  /** Expand options that include additional event notification details in the response. */
  expand?: string;
  /** The custom user or group field. */
  field?: FieldDetails;
  /** The specified group. */
  group?: GroupName;
  /** The ID of the notification. */
  id?: number;
  /** Identifies the recipients of the notification. */
  notificationType?: "CurrentAssignee" | "Reporter" | "CurrentUser" | "ProjectLead" | "ComponentLead" | "User" | "Group" | "ProjectRole" | "EmailAddress" | "AllWatchers" | "UserCustomField" | "GroupCustomField";
  /** As a group's name can change, use of `recipient` is recommended. The identifier associated with the `notificationType` value that defines the receiver of the notification, where the receiver isn't implied by `notificationType` value. So, when `notificationType` is:   *  `User` The `parameter` is the user account ID.  *  `Group` The `parameter` is the group name.  *  `ProjectRole` The `parameter` is the project role ID.  *  `UserCustomField` The `parameter` is the ID of the custom field.  *  `GroupCustomField` The `parameter` is the ID of the custom field. */
  parameter?: string;
  /** The specified project role. */
  projectRole?: ProjectRole;
  /** The identifier associated with the `notificationType` value that defines the receiver of the notification, where the receiver isn't implied by the `notificationType` value. So, when `notificationType` is:   *  `User`, `recipient` is the user account ID.  *  `Group`, `recipient` is the group ID.  *  `ProjectRole`, `recipient` is the project role ID.  *  `UserCustomField`, `recipient` is the ID of the custom field.  *  `GroupCustomField`, `recipient` is the ID of the custom field. */
  recipient?: string;
  /** The specified user. */
  user?: UserDetails;
};

/** A priority scheme with less fields to be used in for an API expand response. */
export type ExpandPrioritySchemeBean = {
  /** The ID of the priority scheme. */
  id?: string;
  /** The name of the priority scheme. */
  name?: string;
  /** The URL of the priority scheme. */
  self?: string;
};

export type ExpandPrioritySchemePage = {
  maxResults?: number;
  startAt?: number;
  total?: number;
  [key: string]: unknown;
};

/** The response for status request for a running/completed export task. */
export type ExportArchivedIssuesTaskProgressResponse = {
  fileUrl?: string;
  payload?: string;
  progress?: number;
  status?: string;
  submittedTime?: string;
  taskId?: string;
};

/** Details about a failed webhook. */
export type FailedWebhook = {
  /** The webhook body. */
  body?: string;
  /** The time the webhook was added to the list of failed webhooks (that is, the time of the last failed retry). */
  failureTime: number;
  /** The webhook ID, as sent in the `X-Atlassian-Webhook-Identifier` header with the webhook. */
  id: string;
  /** The original webhook destination. */
  url: string;
};

/** A page of failed webhooks. */
export type FailedWebhooks = {
  /** The maximum number of items on the page. If the list of values is shorter than this number, then there are no more pages. */
  maxResults: number;
  /** The URL to the next page of results. Present only if the request returned at least one result.The next page may be empty at the time of receiving the response, but new failed webhooks may appear in time. You can save the URL to the next page and query for new results periodically (for example, every hour). */
  next?: string;
  /** The list of webhooks. */
  values: (FailedWebhook)[];
};

/** Details of a field. */
export type Field = {
  /** Number of contexts where the field is used. */
  contextsCount?: number;
  /** The description of the field. */
  description?: string;
  /** The ID of the field. */
  id: string;
  /** Whether the field is locked. */
  isLocked?: boolean;
  /** Whether the field is shown on screen or not. */
  isUnscreenable?: boolean;
  /** The key of the field. */
  key?: string;
  lastUsed?: FieldLastUsed;
  /** The name of the field. */
  name: string;
  /** Number of projects where the field is used. */
  projectsCount?: number;
  schema: JsonTypeBean;
  /** Number of screens where the field is used. */
  screensCount?: number;
  /** The searcher key of the field. Returned for custom fields. */
  searcherKey?: string;
  /** The stable ID of the field. */
  stableId?: string;
  /** The display name of the field type */
  typeDisplayName?: string;
};

/** Defines the payload for the field association scheme. */
export type FieldAssociationItemPayload = {
  /** The description of the field association item */
  description?: string;
  pcri?: ProjectCreateResourceIdentifier;
  qualifierId?: ProjectCreateResourceIdentifier;
  qualifierType?: ProjectCreateResourceIdentifier;
  /** The renderer type of the field */
  rendererType?: string;
  /** Whether the field is required */
  required?: boolean;
};

export type FieldAssociationParameters = {
  description?: string;
  isRequired: boolean;
};

/** Field association scheme field search results. */
export type FieldAssociationSchemeFieldSearchResult = {
  allowedOperations?: (string)[];
  fieldId?: string;
  parameters?: SearchResultFieldParameters;
  restrictedToWorkTypes?: (string)[];
  workTypeParameters?: (SearchResultWorkTypeParameters)[];
};

export type FieldAssociationSchemeLinks = {
  associations?: string;
  projects?: string;
};

export type FieldAssociationSchemeLinksBean = {
  associations?: string;
  projects?: string;
};

/** Matched filters for field association scheme search. */
export type FieldAssociationSchemeMatchedFilters = {
  projectIds?: (number)[];
  query?: string;
};

/** Project search results for field association scheme. */
export type FieldAssociationSchemeProjectSearchResult = {
  avatarUrls?: { [key: string]: string | undefined };
  deleted?: boolean;
  id?: string;
  key?: string;
  name?: string;
};

/** Details of field associations with projects. */
export type FieldAssociationsRequest = {
  /** Contexts to associate/unassociate the fields with. */
  associationContexts: (AssociationContextObject)[];
  /** Fields to associate/unassociate with projects. */
  fields: (FieldIdentifierObject)[];
};

/** Defines the payload for the fields, screens, screen schemes, issue type screen schemes, field layouts, and field layout schemes */
export type FieldCapabilityPayload = {
  /** The custom field definitions. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/\#api-rest-api-3-field-post */
  customFieldDefinitions?: (CustomFieldPayload)[] | null;
  fieldLayoutScheme?: FieldLayoutSchemePayload;
  /** The field layouts configuration. */
  fieldLayouts?: (FieldLayoutPayload)[] | null;
  fieldScheme?: FieldSchemePayload;
  /** The issue layouts configuration */
  issueLayouts?: (IssueLayoutPayload)[] | null;
  issueTypeScreenScheme?: IssueTypeScreenSchemePayload;
  /** The screen schemes See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/\#api-rest-api-3-screenscheme-post */
  screenScheme?: (ScreenSchemePayload)[] | null;
  /** The screens. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/\#api-rest-api-3-screens-post */
  screens?: (ScreenPayload)[] | null;
};

/** A clause that asserts whether a field was changed. For example, `status CHANGED AFTER startOfMonth(-1M)`.See [CHANGED](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for more information about the CHANGED operator. */
export type FieldChangedClause = {
  field: JqlQueryField;
  /** The operator applied to the field. */
  operator: "changed";
  /** The list of time predicates. */
  predicates: (JqlQueryClauseTimePredicate)[];
};

/** Details of a field configuration. */
export type FieldConfiguration = {
  /** The description of the field configuration. */
  description: string;
  /** The ID of the field configuration. */
  id: number;
  /** Whether the field configuration is the default. */
  isDefault?: boolean;
  /** The name of the field configuration. */
  name: string;
};

/** Details of a field configuration. */
export type FieldConfigurationDetails = {
  /** The description of the field configuration. */
  description?: string;
  /** The name of the field configuration. Must be unique. */
  name: string;
};

/** The field configuration for an issue type. */
export type FieldConfigurationIssueTypeItem = {
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
  /** The ID of the field configuration scheme. */
  fieldConfigurationSchemeId: string;
  /** The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration. */
  issueTypeId: string;
};

/** A field within a field configuration. */
export type FieldConfigurationItem = {
  /** The description of the field within the field configuration. */
  description?: string;
  /** The ID of the field within the field configuration. */
  id: string;
  /** Whether the field is hidden in the field configuration. */
  isHidden?: boolean;
  /** Whether the field is required in the field configuration. */
  isRequired?: boolean;
  /** The renderer type for the field within the field configuration. */
  renderer?: string;
};

/** Details of field configuration items. */
export type FieldConfigurationItemsDetails = {
  /** Details of fields in a field configuration. */
  fieldConfigurationItems: (FieldConfigurationItem)[];
};

/** Details of a field configuration scheme. */
export type FieldConfigurationScheme = {
  /** The description of the field configuration scheme. */
  description?: string;
  /** The ID of the field configuration scheme. */
  id: string;
  /** The name of the field configuration scheme. */
  name: string;
};

/** Associated field configuration scheme and project. */
export type FieldConfigurationSchemeProjectAssociation = {
  /** The ID of the field configuration scheme. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme. */
  fieldConfigurationSchemeId?: string;
  /** The ID of the project. */
  projectId: string;
};

/** Project list with assigned field configuration schema. */
export type FieldConfigurationSchemeProjects = {
  fieldConfigurationScheme?: FieldConfigurationScheme;
  /** The IDs of projects using the field configuration scheme. */
  projectIds: (string)[];
};

/** The field configuration to issue type mapping. */
export type FieldConfigurationToIssueTypeMapping = {
  /** The ID of the field configuration. */
  fieldConfigurationId: string;
  /** The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration. An issue type can be included only once in a request. */
  issueTypeId: string;
};

/** The metadata describing an issue field for createmeta. */
export type FieldCreateMetadata = {
  /** The list of values allowed in the field. */
  allowedValues?: (unknown)[];
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl?: string;
  /** The configuration properties. */
  configuration?: { [key: string]: unknown | undefined };
  /** The default value of the field. */
  defaultValue?: unknown;
  /** The field id. */
  fieldId: string;
  /** Whether the field has a default value. */
  hasDefaultValue?: boolean;
  /** The key of the field. */
  key: string;
  /** The name of the field. */
  name: string;
  /** The list of operations that can be performed on the field. */
  operations: (string)[];
  /** Whether the field is required. */
  required: boolean;
  /** The data type of the field. */
  schema: JsonTypeBean;
};

/** Details about a field. */
export type FieldDetails = {
  /** The names that can be used to reference the field in an advanced search. For more information, see [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ). */
  clauseNames?: (string)[];
  /** Whether the field is a custom field. */
  custom?: boolean;
  /** The ID of the field. */
  id?: string;
  /** The key of the field. */
  key?: string;
  /** The name of the field. */
  name?: string;
  /** Whether the field can be used as a column on the issue navigator. */
  navigable?: boolean;
  /** Whether the content of the field can be used to order lists. */
  orderable?: boolean;
  /** The data schema for the field. */
  schema?: JsonTypeBean;
  /** The scope of the field. */
  scope?: Scope;
  /** Whether the content of the field can be searched. */
  searchable?: boolean;
};

export type FieldIdIdentifier = FieldIdentifierObject & { identifier?: string };

/** Identifier for a field for example FIELD\_ID. */
export type FieldIdentifierObject = {
  identifier?: { [key: string]: unknown };
  type: string;
};

/** Information about the most recent use of a field. */
export type FieldLastUsed = {
  /** Last used value type:   *  *TRACKED*: field is tracked and a last used date is available.  *  *NOT\_TRACKED*: field is not tracked, last used date is not available.  *  *NO\_INFORMATION*: field is tracked, but no last used date is available. */
  type?: "TRACKED" | "NOT_TRACKED" | "NO_INFORMATION";
  /** The date when the value of the field last changed. */
  value?: string;
};

/** Defines the payload for the field layout configuration. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-rest-api-3-fieldconfiguration-post */
export type FieldLayoutConfiguration = {
  /** Whether to show the field */
  field?: boolean;
  pcri?: ProjectCreateResourceIdentifier;
  /** Whether the field is required */
  required?: boolean;
};

/** Defines the payload for the field layouts. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-group-issue-field-configurations" + fieldlayout is what users would see as "Field Configuration" in Jira's UI - https://support.atlassian.com/jira-cloud-administration/docs/manage-issue-field-configurations/ */
export type FieldLayoutPayload = {
  /** The field layout configuration. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/\#api-rest-api-3-fieldconfiguration-post */
  configuration?: (FieldLayoutConfiguration)[];
  /** The description of the field layout */
  description?: string;
  /** The name of the field layout */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
};

/** Deprecated use [fieldAssociationScheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) instead Defines the payload for the field layout schemes. See [ Field configuration scheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-rest-api-3-fieldconfigurationscheme-post).  [ How to configure a field configuration scheme](https://support.atlassian.com/jira-cloud-administration/docs/configure-a-field-configuration-scheme/). */
export type FieldLayoutSchemePayload = {
  defaultFieldLayout?: ProjectCreateResourceIdentifier;
  /** The description of the field layout scheme */
  description?: string;
  /** There is a default configuration "fieldlayout" that is applied to all issue types using this scheme that don't have an explicit mapping users can create (or re-use existing) configurations for other issue types and map them to this scheme */
  explicitMappings?: { [key: string]: ProjectCreateResourceIdentifier | undefined };
  /** The name of the field layout scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
};

/** The metadata describing an issue field. */
export type FieldMetadata = {
  /** The list of values allowed in the field. */
  allowedValues?: (unknown)[];
  /** The URL that can be used to automatically complete the field. */
  autoCompleteUrl?: string;
  /** The configuration properties. */
  configuration?: { [key: string]: unknown | undefined };
  /** The default value of the field. */
  defaultValue?: unknown;
  /** Whether the field has a default value. */
  hasDefaultValue?: boolean;
  /** The key of the field. */
  key: string;
  /** The name of the field. */
  name: string;
  /** The list of operations that can be performed on the field. */
  operations: (string)[];
  /** Whether the field is required. */
  required: boolean;
  /** The data type of the field. */
  schema: JsonTypeBean;
};

/** List of project associations. */
export type FieldProjectAssociation = {
  projectId?: string;
};

/** Details of a field that can be used in advanced searches. */
export type FieldReferenceData = {
  /** Whether the field provide auto-complete suggestions. */
  auto?: "true" | "false";
  /** If the item is a custom field, the ID of the custom field. */
  cfid?: string;
  /** Whether this field has been deprecated. */
  deprecated?: "true" | "false";
  /** The searcher key of the field, only passed when the field is deprecated. */
  deprecatedSearcherKey?: string;
  /** The display name contains the following:   *  for system fields, the field name. For example, `Summary`.  *  for collapsed custom fields, the field name followed by a hyphen and then the field name and field type. For example, `Component - Component[Dropdown]`.  *  for other custom fields, the field name followed by a hyphen and then the custom field ID. For example, `Component - cf[10061]`. */
  displayName?: string;
  /** The valid search operators for the field. */
  operators?: (string)[];
  /** Whether the field can be used in a query's `ORDER BY` clause. */
  orderable?: "true" | "false";
  /** Whether the content of this field can be searched. */
  searchable?: "true" | "false";
  /** The data types of items in the field. */
  types?: (string)[];
  /** The field identifier. */
  value?: string;
};

/** Defines the payload to configure the field scheme for a project. See [Field schemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes). */
export type FieldSchemePayload = {
  /** The description of the field scheme */
  description?: string;
  /** The field association items for this field scheme. */
  items?: (FieldAssociationItemPayload)[];
  /** The name of the field scheme */
  name?: string;
  /** The strategy to use when there is a conflict with an existing field scheme. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
};

/** Partial failure result when updating field scheme to fields associations. */
export type FieldSchemeToFieldsPartialFailure = {
  error?: string;
  fieldId: string;
  schemeId: number;
  success: boolean;
  workTypeIds: (number)[];
};

/** Response for updating field associations. */
export type FieldSchemeToFieldsResponse = {
  results: (FieldSchemeToFieldsPartialFailure)[];
};

/** Partial failure result when updating field scheme to projects associations. */
export type FieldSchemeToProjectsPartialFailure = {
  error?: string;
  projectId: number;
  schemeId: number;
  success: boolean;
};

/** Request for associating field schemes to projects. */
export type FieldSchemeToProjectsRequest = {
  /** List of project IDs to associate with field schemes */
  projectIds: (number)[];
};

/** Response for updating field scheme to projects associations. */
export type FieldSchemeToProjectsResponse = {
  results: (FieldSchemeToProjectsPartialFailure)[];
};

/** Details of an operation to perform on a field. */
export type FieldUpdateOperation = {
  /** The value to add to the field. */
  add?: unknown;
  /** The field value to copy from another issue. */
  copy?: unknown;
  /** The value to edit in the field. */
  edit?: unknown;
  /** The value to removed from the field. */
  remove?: unknown;
  /** The value to set in the field. */
  set?: unknown;
};

/** A clause that asserts the current value of a field. For example, `summary ~ test`. */
export type FieldValueClause = {
  field: JqlQueryField;
  operand: JqlQueryClauseOperand;
  /** The operator between the field and operand. */
  operator: "=" | "!=" | ">" | "<" | ">=" | "<=" | "in" | "not in" | "~" | "~=" | "is" | "is not";
};

/** A clause that asserts a previous value of a field. For example, `status WAS "Resolved" BY currentUser() BEFORE "2019/02/02"`. See [WAS](https://confluence.atlassian.com/x/dgiiLQ#Advancedsearching-operatorsreference-WASWAS) for more information about the WAS operator. */
export type FieldWasClause = {
  field: JqlQueryField;
  operand: JqlQueryClauseOperand;
  /** The operator between the field and operand. */
  operator: "was" | "was in" | "was not in" | "was not";
  /** The list of time predicates. */
  predicates: (JqlQueryClauseTimePredicate)[];
};

/** Key fields from the linked issue. */
export type Fields = {
  /** The assignee of the linked issue. */
  assignee?: UserDetails;
  /** The type of the linked issue. */
  issueType?: IssueTypeDetails;
  /** The type of the linked issue. */
  issuetype?: IssueTypeDetails;
  /** The priority of the linked issue. */
  priority?: Priority;
  /** The status of the linked issue. */
  status?: StatusDetails;
  /** The summary description of the linked issue. */
  summary?: string;
  /** The time tracking of the linked issue. */
  timetracking?: TimeTrackingDetails;
};

/** The default parameters to apply to the field across all work types in the specified schemes, may be null if only work type-specific updates are needed */
export type FieldsSchemeItemParameter = {
  /** The custom description for the field, null to preserve current description */
  description?: string;
  /** Whether the field is required, null to preserve current requirement setting */
  isRequired?: boolean;
};

/** The list of work type-specific parameter overrides, may be empty if only default parameters are being updated */
export type FieldsSchemeItemWorkTypeParameter = {
  /** The custom description for the field for this work type, null to use default or preserve current */
  description?: string;
  /** Whether the field is required for this work type, null to use default or preserve current */
  isRequired?: boolean;
  /** The ID of the work type (issue type) for which these parameters apply */
  workTypeId?: number;
};

/** Details about a filter. */
export type Filter = {
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
};

/** Details of a filter. */
export type FilterDetails = {
  /** \[Experimental\] Approximate last used time. Returns the date and time when the filter was last used. Returns `null` if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in real time and therefore may not be exactly accurate. */
  approximateLastUsed?: string;
  /** The description of the filter. */
  description?: string;
  /** The groups and projects that can edit the filter. This can be specified when updating a filter, but not when creating a filter. */
  editPermissions?: (SharePermission)[];
  /** Expand options that include additional filter details in the response. */
  expand?: string;
  /** Whether the filter is selected as a favorite by any users, not including the filter owner. */
  favourite?: boolean;
  /** The count of how many users have selected this filter as a favorite, including the filter owner. */
  favouritedCount?: number;
  /** The unique identifier for the filter. */
  id?: string;
  /** The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*. */
  jql?: string;
  /** The name of the filter. */
  name: string;
  /** The user who owns the filter. Defaults to the creator of the filter, however, Jira administrators can change the owner of a shared filter in the admin settings. */
  owner?: User;
  /** A URL to view the filter results in Jira, using the [Search for issues using JQL](#api-rest-api-3-filter-search-get) operation with the filter's JQL string to return the filter results. For example, *https://your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*. */
  searchUrl?: string;
  /** The URL of the filter. */
  self?: string;
  /** The groups and projects that the filter is shared with. This can be specified when updating a filter, but not when creating a filter. */
  sharePermissions?: (SharePermission)[];
  /** The users that are subscribed to the filter. */
  subscriptions?: (FilterSubscription)[];
  /** A URL to view the filter results in Jira, using the ID of the filter. For example, *https://your-domain.atlassian.net/issues/?filter=10100*. */
  viewUrl?: string;
};

/** Details of a user or group subscribing to a filter. */
export type FilterSubscription = {
  /** The group subscribing to filter. */
  group?: GroupName;
  /** The ID of the filter subscription. */
  id?: number;
  /** The user subscribing to filter. */
  user?: User;
};

/** A paginated list of subscriptions to a filter. */
export type FilterSubscriptionsList = {
  /** The index of the last item returned on the page. */
  "end-index"?: number;
  /** The list of items. */
  items?: (FilterSubscription)[];
  /** The maximum number of results that could be on the page. */
  "max-results"?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  "start-index"?: number;
};

export type ForgePanelProjectPinAsyncResponse = {
  taskId?: string;
};

export type ForgePanelProjectPinRequest = {
  /** The moduleId of the Forge panel in the format `ari:cloud:ecosystem::extension/{app-id}/{environment-id}/static/{module-key}` */
  moduleId: string;
  /** The list of projects to pin or unpin the issue panel to or from. */
  projectList: (ProjectPinAction)[];
};

/** A group found in a search. */
export type FoundGroup = {
  /** Avatar url for the group/team if present. */
  avatarUrl?: string;
  /** The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. */
  groupId?: string;
  /** The group name with the matched query string highlighted with the HTML bold tag. */
  html?: string;
  labels?: (GroupLabel)[];
  /** Describes who/how the team is managed. The possible values are   \* external - when team is synced from an external directory like SCIM or HRIS, and team members cannot be modified.   \* admins - when a team is managed by an admin (team members can only be modified by admins).   \* team-members - managed by existing team members, new members need to be invited to join.   \* open - anyone can join or modify this team. */
  managedBy?: "EXTERNAL" | "ADMINS" | "TEAM_MEMBERS" | "OPEN";
  /** The name of the group. The name of a group is mutable, to reliably identify a group use ``groupId`.` */
  name?: string;
  /** Describes the type of group. The possible values are   \* team-collaboration - A platform team managed in people directory.   \* userbase-group - a group of users created in adminhub.   \* admin-oversight - currently unused. */
  usageType?: "USERBASE_GROUP" | "TEAM_COLLABORATION" | "ADMIN_OVERSIGHT";
};

/** The list of groups found in a search, including header text (Showing X of Y matching groups) and total of matched groups. */
export type FoundGroups = {
  groups?: (FoundGroup)[];
  /** Header text indicating the number of groups in the response and the total number of groups found in the search. */
  header?: string;
  /** The total number of groups found in the search. */
  total?: number;
};

/** The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users. */
export type FoundUsers = {
  /** Header text indicating the number of users in the response and the total number of users found in the search. */
  header?: string;
  /** The total number of users found in the search. */
  total?: number;
  users?: (UserPickerUser)[];
};

/** List of users and groups found in a search. */
export type FoundUsersAndGroups = {
  groups?: FoundGroups;
  users?: FoundUsers;
};

/** The payload for the layout details for the start end of a transition */
export type FromLayoutPayload = {
  /** The port that the transition can be made from */
  fromPort?: number;
  status?: ProjectCreateResourceIdentifier;
  /** The port that the transition goes to */
  toPortOverride?: number;
};

/** An operand that is a function. See [Advanced searching - functions reference](https://confluence.atlassian.com/x/dwiiLQ) for more information about JQL functions. */
export type FunctionOperand = {
  /** The list of function arguments. */
  arguments: (string)[];
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand?: string;
  /** The name of the function. */
  function: string;
};

/** Details of functions that can be used in advanced searches. */
export type FunctionReferenceData = {
  /** The display name of the function. */
  displayName?: string;
  /** Whether the function can take a list of arguments. */
  isList?: "true" | "false";
  /** Whether the function supports both single and list value operators. */
  supportsListAndSingleValueOperators?: "true" | "false";
  /** The data types returned by the function. */
  types?: (string)[];
  /** The function identifier. */
  value?: string;
};

export type GetAtlassianTeamResponse = {
  /** The capacity for the Atlassian team. */
  capacity?: number;
  /** The Atlassian team ID. */
  id: string;
  /** The ID of the issue source for the Atlassian team. */
  issueSourceId?: number;
  /** The planning style for the Atlassian team. This is "Scrum" or "Kanban". */
  planningStyle: "Scrum" | "Kanban";
  /** The sprint length for the Atlassian team. */
  sprintLength?: number;
};

export type GetCrossProjectReleaseResponse = {
  /** The cross-project release name. */
  name?: string;
  /** The IDs of the releases included in the cross-project release. */
  releaseIds?: (number)[];
};

export type GetCustomFieldResponse = {
  /** The custom field ID. */
  customFieldId: number;
  /** Allows filtering issues based on their values for the custom field. */
  filter?: boolean;
};

export type GetDateFieldResponse = {
  /** A date custom field ID. This is returned if the type is "DateCustomField". */
  dateCustomFieldId?: number;
  /** The date field type. This is "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: "DueDate" | "TargetStartDate" | "TargetEndDate" | "DateCustomField";
};

export type GetExclusionRulesResponse = {
  /** The IDs of the issues excluded from the plan. */
  issueIds?: (number)[];
  /** The IDs of the issue types excluded from the plan. */
  issueTypeIds?: (number)[];
  /** Issues completed this number of days ago are excluded from the plan. */
  numberOfDaysToShowCompletedIssues: number;
  /** The IDs of the releases excluded from the plan. */
  releaseIds?: (number)[];
  /** The IDs of the work status categories excluded from the plan. */
  workStatusCategoryIds?: (number)[];
  /** The IDs of the work statuses excluded from the plan. */
  workStatusIds?: (number)[];
};

/** Response object for getting field association parameters. */
export type GetFieldAssociationParametersResponse = {
  fieldId: string;
  parameters?: FieldAssociationParameters;
  workTypeParameters?: (WorkTypeParameters)[];
};

/** Response object for getting a field association scheme by ID. */
export type GetFieldAssociationSchemeByIdResponse = {
  description?: string;
  fieldsCount?: number;
  id?: string;
  isDefault?: boolean;
  links?: FieldAssociationSchemeLinks;
  name?: string;
};

/** Response object for getting a field association scheme. */
export type GetFieldAssociationSchemeResponse = {
  description?: string;
  fieldsCount?: number;
  id?: number;
  isDefault?: boolean;
  links?: FieldAssociationSchemeLinksBean;
  matchedFilters?: FieldAssociationSchemeMatchedFilters;
  name?: string;
};

export type GetIssueSourceResponse = {
  /** The issue source type. This is "Board", "Project" or "Filter". */
  type: "Board" | "Project" | "Filter" | "Custom";
  /** The issue source value. This is a board ID if the type is "Board", a project ID if the type is "Project" or a filter ID if the type is "Filter". */
  value: number;
};

export type GetPermissionHolderResponse = {
  /** The permission holder type. This is "Group" or "AccountId". */
  type: "Group" | "AccountId";
  /** The permission holder value. This is a group name if the type is "Group" or an account ID if the type is "AccountId". */
  value: string;
};

export type GetPermissionResponse = {
  /** The permission holder. */
  holder: GetPermissionHolderResponse;
  /** The permission type. This is "View" or "Edit". */
  type: "View" | "Edit";
};

export type GetPlanOnlyTeamResponse = {
  /** The capacity for the plan-only team. */
  capacity?: number;
  /** The plan-only team ID. */
  id: number;
  /** The ID of the issue source for the plan-only team. */
  issueSourceId?: number;
  /** The account IDs of the plan-only team members. */
  memberAccountIds?: (string)[];
  /** The plan-only team name. */
  name: string;
  /** The planning style for the plan-only team. This is "Scrum" or "Kanban". */
  planningStyle: "Scrum" | "Kanban";
  /** The sprint length for the plan-only team. */
  sprintLength?: number;
};

export type GetPlanResponse = {
  /** The cross-project releases included in the plan. */
  crossProjectReleases?: (GetCrossProjectReleaseResponse)[];
  /** The custom fields for the plan. */
  customFields?: (GetCustomFieldResponse)[];
  /** The exclusion rules for the plan. */
  exclusionRules?: GetExclusionRulesResponse;
  /** The plan ID. */
  id: number;
  /** The issue sources included in the plan. */
  issueSources?: (GetIssueSourceResponse)[];
  /** The date when the plan was last saved in UTC. */
  lastSaved?: string;
  /** The account ID of the plan lead. */
  leadAccountId?: string;
  /** The plan name. */
  name?: string;
  /** The permissions for the plan. */
  permissions?: (GetPermissionResponse)[];
  /** The scheduling settings for the plan. */
  scheduling: GetSchedulingResponse;
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: "Active" | "Trashed" | "Archived";
};

export type GetPlanResponseForPage = {
  /** The plan ID. */
  id: string;
  /** The issue sources included in the plan. */
  issueSources?: (GetIssueSourceResponse)[];
  /** The plan name. */
  name: string;
  /** Default scenario ID. */
  scenarioId: string;
  /** The plan status. This is "Active", "Trashed" or "Archived". */
  status: "Active" | "Trashed" | "Archived";
};

/** Response item returned from get projects with field schemes. */
export type GetProjectsWithFieldSchemesResponse = {
  projectId?: number;
  schemeId?: number;
};

export type GetSchedulingResponse = {
  /** The dependencies for the plan. This is "Sequential" or "Concurrent". */
  dependencies: "Sequential" | "Concurrent";
  /** The end date field for the plan. */
  endDate: GetDateFieldResponse;
  /** The estimation unit for the plan. This is "StoryPoints", "Days" or "Hours". */
  estimation: "StoryPoints" | "Days" | "Hours";
  /** The inferred dates for the plan. This is "None", "SprintDates" or "ReleaseDates". */
  inferredDates: "None" | "SprintDates" | "ReleaseDates";
  /** The start date field for the plan. */
  startDate: GetDateFieldResponse;
};

export type GetTeamResponseForPage = {
  /** The team ID. */
  id: string;
  /** The team name. This is returned if the type is "PlanOnly". */
  name?: string;
  /** The team type. This is "PlanOnly" or "Atlassian". */
  type: "PlanOnly" | "Atlassian";
};

export type GlobalScopeBean = {
  /** Defines the behavior of the option in the global context.If notSelectable is set, the option cannot be set as the field's value. This is useful for archiving an option that has previously been selected but shouldn't be used anymore.If defaultValue is set, the option is selected by default. */
  attributes?: ("notSelectable" | "defaultValue")[];
};

export type Group = {
  /** Expand options that include additional group details in the response. */
  expand?: string;
  /** The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. */
  groupId?: string | null;
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
  /** A paginated list of the users that are members of the group. A maximum of 50 users is returned in the list, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 50 users, use`?expand=users[51:100]`. */
  users?: PagedListUserDetailsApplicationUser;
};

/** Details about a group. */
export type GroupDetails = {
  /** The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. */
  groupId?: string | null;
  /** The name of the group. */
  name?: string;
};

/** A group label. */
export type GroupLabel = {
  /** The group label name. */
  text?: string;
  /** The title of the group label. */
  title?: string;
  /** The type of the group label. */
  type?: "ADMIN" | "SINGLE" | "MULTIPLE";
};

/** Details about a group. */
export type GroupName = {
  /** The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. */
  groupId?: string | null;
  /** The name of group. */
  name?: string;
  /** The URL for these group details. */
  self?: string;
};

/** Jira instance health check results. Deprecated and no longer returned. */
export type HealthCheckResult = {
  /** The description of the Jira health check item. */
  description?: string;
  /** The name of the Jira health check item. */
  name?: string;
  /** Whether the Jira health check item passed or failed. */
  passed?: boolean;
};

/** The project issue type hierarchy. */
export type Hierarchy = {
  /** The ID of the base level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  baseLevelId?: number;
  /** Details about the hierarchy level. */
  levels?: (SimplifiedHierarchyLevel)[];
};

/** Details of issue history metadata. */
export type HistoryMetadata = {
  /** The activity described in the history record. */
  activityDescription?: string;
  /** The key of the activity described in the history record. */
  activityDescriptionKey?: string;
  /** Details of the user whose action created the history record. */
  actor?: HistoryMetadataParticipant;
  /** Details of the cause that triggered the creation the history record. */
  cause?: HistoryMetadataParticipant;
  /** The description of the history record. */
  description?: string;
  /** The description key of the history record. */
  descriptionKey?: string;
  /** The description of the email address associated the history record. */
  emailDescription?: string;
  /** The description key of the email address associated the history record. */
  emailDescriptionKey?: string;
  /** Additional arbitrary information about the history record. */
  extraData?: { [key: string]: string | undefined };
  /** Details of the system that generated the history record. */
  generator?: HistoryMetadataParticipant;
  /** The type of the history record. */
  type?: string;
  [key: string]: unknown;
};

/** Details of user or system associated with a issue history metadata item. */
export type HistoryMetadataParticipant = {
  /** The URL to an avatar for the user or system associated with a history record. */
  avatarUrl?: string;
  /** The display name of the user or system associated with a history record. */
  displayName?: string;
  /** The key of the display name of the user or system associated with a history record. */
  displayNameKey?: string;
  /** The ID of the user or system associated with a history record. */
  id?: string;
  /** The type of the user or system associated with a history record. */
  type?: string;
  /** The URL of the user or system associated with a history record. */
  url?: string;
  [key: string]: unknown;
};

/** An icon. If no icon is defined:   *  for a status icon, no status icon displays in Jira.  *  for the remote object icon, the default link icon displays in Jira. */
export type Icon = {
  /** The URL of the tooltip, used only for a status icon. If not set, the status icon in Jira is not clickable. */
  link?: string;
  /** The title of the icon. This is used as follows:   *  For a status icon it is used as a tooltip on the icon. If not set, the status icon doesn't display a tooltip in Jira.  *  For the remote object icon it is used in conjunction with the application name to display a tooltip for the link's icon. The tooltip takes the format "\[application name\] icon title". Blank itemsare excluded from the tooltip title. If both items are blank, the icon tooltop displays as "Web Link". */
  title?: string;
  /** The URL of an icon that displays at 16x16 pixel in Jira. */
  url16x16?: string;
  [key: string]: unknown;
};

/** An icon. */
export type IconBean = {
  /** The URL of the tooltip, used only for a status icon. */
  link?: string;
  /** The title of the icon, for use as a tooltip on the icon. */
  title?: string;
  /** The URL of a 16x16 pixel icon. */
  url16x16?: string;
};

export type IdBean = {
  /** The ID of the permission scheme to associate with the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to get a list of permission scheme IDs. */
  id: number;
};

export type IdOrKeyBean = {
  /** The ID of the referenced item. */
  id?: number;
  /** The key of the referenced item. */
  key?: string;
};

export type IncludedFields = {
  actuallyIncluded?: (string)[];
  excluded?: (string)[];
  included?: (string)[];
};

export type InputStreamSource = {
  inputStream?: { [key: string]: unknown };
};

/** List of Issue Ids Or Keys that are to be archived or unarchived */
export type IssueArchivalSyncRequest = {
  issueIdsOrKeys?: (string)[];
};

/** Number of archived/unarchived issues and list of errors that occurred during the action, if any. */
export type IssueArchivalSyncResponse = {
  errors?: Errors;
  numberOfIssuesUpdated?: number;
};

/** Details about an issue. */
export type IssueBean = {
  /** Details of changelogs associated with the issue. */
  changelog?: PageOfChangelogs;
  /** The metadata for the fields on the issue that can be amended. */
  editmeta?: IssueUpdateMetadata;
  /** Expand options that include additional issue details in the response. */
  expand?: string;
  fields?: { [key: string]: unknown | undefined };
  fieldsToInclude?: IncludedFields;
  /** The ID of the issue. */
  id?: string;
  /** The key of the issue. */
  key?: string;
  /** The ID and name of each field present on the issue. */
  names?: { [key: string]: string | undefined };
  /** The operations that can be performed on the issue. */
  operations?: Operations;
  /** Details of the issue properties identified in the request. */
  properties?: { [key: string]: unknown | undefined };
  /** The rendered value of each field present on the issue. */
  renderedFields?: { [key: string]: unknown | undefined };
  /** The schema describing each field present on the issue. */
  schema?: { [key: string]: JsonTypeBean | undefined };
  /** The URL of the issue details. */
  self?: string;
  /** The transitions that can be performed on the issue. */
  transitions?: (IssueTransition)[];
  /** The versions of each field on the issue. */
  versionedRepresentations?: { [key: string]: { [key: string]: unknown | undefined } | undefined };
};

/** Issue Bulk Delete Payload */
export type IssueBulkDeletePayload = {
  /** List of issue IDs or keys which are to be bulk deleted. These IDs or keys can be from different projects and issue types. */
  selectedIssueIdsOrKeys: (string)[];
  /** A boolean value that indicates whether to send a bulk change notification when the issues are being deleted.  If `true`, dispatches a bulk notification email to users about the updates. */
  sendBulkNotification?: boolean | null;
};

export type IssueBulkEditField = {
  /** Description of the field. */
  description?: string;
  /** A list of options related to the field, applicable in contexts where multiple selections are allowed. */
  fieldOptions?: (IssueBulkOperationsFieldOption)[];
  /** The unique ID of the field. */
  id?: string;
  /** Indicates whether the field is mandatory for the operation. */
  isRequired?: boolean;
  /** Specifies supported actions (like add, replace, remove) on multi-select fields via an enum. */
  multiSelectFieldOptions?: ("ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL")[];
  /** The display name of the field. */
  name?: string;
  /** A URL to fetch additional data for the field */
  searchUrl?: string;
  /** The type of the field. */
  type?: string;
  /** A message indicating why the field is unavailable for editing. */
  unavailableMessage?: string;
};

/** Issue Bulk Edit Payload */
export type IssueBulkEditPayload = {
  /** An object that defines the values to be updated in specified fields of an issue. The structure and content of this parameter vary depending on the type of field being edited. Although the order is not significant, ensure that field IDs align with those in selectedActions. */
  editedFieldsInput: JiraIssueFields;
  /** List of all the field IDs that are to be bulk edited. Each field ID in this list corresponds to a specific attribute of an issue that is set to be modified in the bulk edit operation. The relevant field ID can be obtained by calling the Bulk Edit Get Fields REST API (documentation available on this page itself). */
  selectedActions: (string)[];
  /** List of issue IDs or keys which are to be bulk edited. These IDs or keys can be from different projects and issue types. */
  selectedIssueIdsOrKeys: (string)[];
  /** A boolean value that indicates whether to send a bulk change notification when the issues are being edited.  If `true`, dispatches a bulk notification email to users about the updates. */
  sendBulkNotification?: boolean | null;
};

/** Issue Bulk Move Payload */
export type IssueBulkMovePayload = {
  /** A boolean value that indicates whether to send a bulk change notification when the issues are being moved.  If `true`, dispatches a bulk notification email to users about the updates. */
  sendBulkNotification?: boolean | null;
  /** An object representing the mapping of issues and data related to destination entities, like fields and statuses, that are required during a bulk move.  The key is a string that is created by concatenating the following three entities in order, separated by commas. The format is `<project ID or key>,<issueType ID>,<parent ID or key>`. It should be unique across mappings provided in the payload. If you provide multiple mappings for the same key, only one will be processed. However, the operation won't fail, so the error may be hard to track down.   *  ***Destination project*** (Required): ID or key of the project to which the issues are being moved.  *  ***Destination issueType*** (Required): ID of the issueType to which the issues are being moved.  *  ***Destination parent ID or key*** (Optional): ID or key of the issue which will become the parent of the issues being moved. Only required when the destination issueType is a subtask. */
  targetToSourcesMapping?: { [key: string]: TargetToSourcesMapping | undefined };
};

export type IssueBulkOperationsFieldOption = { [key: string]: unknown };

export type IssueBulkTransitionForWorkflow = {
  /** Indicates whether all the transitions of this workflow are available in the transitions list or not. */
  isTransitionsFiltered?: boolean;
  /** List of issue keys from the request which are associated with this workflow. */
  issues?: (string)[];
  /** List of transitions available for issues from the request which are associated with this workflow.   **This list includes only those transitions that are common across the issues in this workflow and do not involve any additional field updates.**  */
  transitions?: (SimplifiedIssueTransition)[];
};

/** Issue Bulk Transition Payload */
export type IssueBulkTransitionPayload = {
  /** List of objects and each object has two properties:   *  Issues that will be bulk transitioned.  *  TransitionId that corresponds to a specific transition of issues that share the same workflow. */
  bulkTransitionInputs: (BulkTransitionSubmitInput)[];
  /** A boolean value that indicates whether to send a bulk change notification when the issues are being transitioned.  If `true`, dispatches a bulk notification email to users about the updates. */
  sendBulkNotification?: boolean | null;
};

/** Issue Bulk Watch Or Unwatch Payload */
export type IssueBulkWatchOrUnwatchPayload = {
  /** List of issue IDs or keys which are to be bulk watched or unwatched. These IDs or keys can be from different projects and issue types. */
  selectedIssueIdsOrKeys: (string)[];
};

/** List of changelogs that belong to single issue */
export type IssueChangeLog = {
  /** List of changelogs that belongs to given issueId. */
  changeHistories?: (Changelog)[];
  /** The ID of the issue. */
  issueId?: string;
};

/** A list of changelog IDs. */
export type IssueChangelogIds = {
  /** The list of changelog IDs. */
  changelogIds: (number)[];
};

export type IssueCommentListRequestBean = {
  /** The list of comment IDs. A maximum of 1000 IDs can be specified. */
  ids: (number)[];
};

/** An [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression. */
export type IssueContextVariable = {
  /** The issue ID. */
  id?: number;
  /** The issue key. */
  key?: string;
  /** Type of custom context variable. */
  type: string;
};

/** The wrapper for the issue creation metadata for a list of projects. */
export type IssueCreateMetadata = {
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** List of projects and their issue creation metadata. */
  projects?: (ProjectIssueCreateMetadata)[];
};

/** Lists of issues and entity properties. See [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information. */
export type IssueEntityProperties = {
  /** A list of entity property IDs. */
  entitiesIds?: (number)[];
  /** A list of entity property keys and values. */
  properties?: { [key: string]: JsonNode | undefined };
};

/** An issue ID with entity property values. See [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information. */
export type IssueEntityPropertiesForMultiUpdate = {
  /** The ID of the issue. */
  issueID?: number;
  /** Entity properties to set on the issue. The maximum length of an issue property value is 32768 characters. */
  properties?: { [key: string]: JsonNode | undefined };
};

/** Describes the error that occurred when retrieving data for a particular issue. */
export type IssueError = {
  /** The error that occurred when fetching this issue. */
  errorMessage?: string;
  /** The ID of the issue. */
  id?: string;
};

/** Details about an issue event. */
export type IssueEvent = {
  /** The ID of the event. */
  id?: number;
  /** The name of the event. */
  name?: string;
};

/** Details of the options for a select list issue field. */
export type IssueFieldOption = {
  config?: IssueFieldOptionConfiguration;
  /** The unique identifier for the option. This is only unique within the select field's set of options. */
  id: number;
  /** The properties of the object, as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see [Issue Field Option Property Index](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)) are defined in the descriptor for the issue field module. */
  properties?: { [key: string]: unknown | undefined };
  /** The option's name, which is displayed in Jira. */
  value: string;
};

/** Details of the projects the option is available in. */
export type IssueFieldOptionConfiguration = {
  /** DEPRECATED */
  attributes?: ("notSelectable" | "defaultValue")[];
  /** Defines the projects that the option is available in. If the scope is not defined, then the option is available in all projects. */
  scope?: IssueFieldOptionScopeBean;
};

export type IssueFieldOptionCreateBean = {
  config?: IssueFieldOptionConfiguration;
  /** The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/) are defined in the descriptor for the issue field module. */
  properties?: { [key: string]: unknown | undefined };
  /** The option's name, which is displayed in Jira. */
  value: string;
  [key: string]: unknown;
};

export type IssueFieldOptionScopeBean = {
  /** Defines the behavior of the option within the global context. If this property is set, even if set to an empty object, then the option is available in all projects. */
  global?: GlobalScopeBean;
  /** DEPRECATED */
  projects?: (number)[];
  /** Defines the projects in which the option is available and the behavior of the option within each project. Specify one object per project. The behavior of the option in a project context overrides the behavior in the global context. */
  projects2?: (ProjectScopeBean)[];
};

/** Bulk operation filter details. */
export type IssueFilterForBulkPropertyDelete = {
  /** The value of properties to perform the bulk operation on. */
  currentValue?: unknown;
  /** List of issues to perform the bulk delete operation on. */
  entityIds?: (number)[];
};

/** Bulk operation filter details. */
export type IssueFilterForBulkPropertySet = {
  /** The value of properties to perform the bulk operation on. */
  currentValue?: unknown;
  /** List of issues to perform the bulk operation on. */
  entityIds?: (number)[];
  /** Whether the bulk operation occurs only when the property is present on or absent from an issue. */
  hasProperty?: boolean;
};

/** Defines the payload to configure the issue layout item for a project. */
export type IssueLayoutItemPayload = {
  itemKey?: ProjectCreateResourceIdentifier;
  /** Additional properties for this item. This field is only used when the type is FIELD. */
  properties?: { [key: string]: unknown | undefined };
  /** The item section type */
  sectionType?: "content" | "primaryContext" | "secondaryContext";
  /** The item type. Currently only support FIELD */
  type?: "FIELD";
};

/** Defines the payload to configure the issue layouts for a project. */
export type IssueLayoutPayload = {
  containerId?: ProjectCreateResourceIdentifier;
  /** The issue layout type */
  issueLayoutType?: "ISSUE_VIEW" | "ISSUE_CREATE" | "REQUEST_FORM";
  /** The configuration of items in the issue layout */
  items?: (IssueLayoutItemPayload)[];
  pcri?: ProjectCreateResourceIdentifier;
};

export type IssueLimitReportResponseBean = {
  /** A list of ids of issues approaching the limit and their field count */
  issuesApproachingLimit?: { [key: string]: { [key: string]: number | undefined } | undefined };
  /** A list of ids of issues breaching the limit and their field count */
  issuesBreachingLimit?: { [key: string]: { [key: string]: number | undefined } | undefined };
  /** The fields and their defined limits */
  limits?: { [key: string]: number | undefined };
};

/** Details of a link between issues. */
export type IssueLink = {
  /** The ID of the issue link. */
  id?: string;
  /** Provides details about the linked issue. If presenting this link in a user interface, use the `inward` field of the issue link type to label the link. */
  inwardIssue: LinkedIssue;
  /** Provides details about the linked issue. If presenting this link in a user interface, use the `outward` field of the issue link type to label the link. */
  outwardIssue: LinkedIssue;
  /** The URL of the issue link. */
  self?: string;
  /** The type of link between the issues. */
  type: IssueLinkType;
};

/** This object is used as follows:   *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it defines and reports on the type of link between the issues. Find a list of issue link types with [Get issue link types](#api-rest-api-3-issueLinkType-get).  *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it defines and reports on issue link types. */
export type IssueLinkType = {
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
};

/** A list of issue link type beans. */
export type IssueLinkTypes = {
  /** The issue link type bean. */
  issueLinkTypes?: (IssueLinkType)[];
};

/** A list of issue IDs. */
export type IssueList = {
  /** The list of issue IDs. */
  issueIds: (string)[];
};

/** A list of matched issues or errors for each JQL query, in the order the JQL queries were passed. */
export type IssueMatches = {
  matches: (IssueMatchesForJql)[];
};

/** A list of the issues matched to a JQL query or details of errors encountered during matching. */
export type IssueMatchesForJql = {
  /** A list of errors. */
  errors: (string)[];
  /** A list of issue IDs. */
  matchedIssues: (number)[];
};

/** A list of issues suggested for use in auto-completion. */
export type IssuePickerSuggestions = {
  /** A list of issues for an issue type suggested for use in auto-completion. */
  sections?: (IssuePickerSuggestionsIssueType)[];
};

/** A type of issue suggested for use in auto-completion. */
export type IssuePickerSuggestionsIssueType = {
  /** The ID of the type of issues suggested for use in auto-completion. */
  id?: string;
  /** A list of issues suggested for use in auto-completion. */
  issues?: (SuggestedIssue)[];
  /** The label of the type of issues suggested for use in auto-completion. */
  label?: string;
  /** If no issue suggestions are found, returns a message indicating no suggestions were found, */
  msg?: string;
  /** If issue suggestions are found, returns a message indicating the number of issues suggestions found and returned. */
  sub?: string;
};

/** Issue security level member. */
export type IssueSecurityLevelMember = {
  /** The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information. */
  holder: PermissionHolder;
  /** The ID of the issue security level member. */
  id: number;
  /** The ID of the issue security level. */
  issueSecurityLevelId: number;
};

/** Details about an project using security scheme mapping. */
export type IssueSecuritySchemeToProjectMapping = {
  issueSecuritySchemeId?: string;
  projectId?: string;
  [key: string]: unknown;
};

/** Details of an issue transition. */
export type IssueTransition = {
  /** Expand options that include additional transition details in the response. */
  expand?: string;
  /** Details of the fields associated with the issue transition screen. Use this information to populate `fields` and `update` in a transition request. */
  fields?: { [key: string]: FieldMetadata | undefined };
  /** Whether there is a screen associated with the issue transition. */
  hasScreen?: boolean;
  /** The ID of the issue transition. Required when specifying a transition to undertake. */
  id?: string;
  /** Whether the transition is available to be performed. */
  isAvailable?: boolean;
  /** Whether the issue has to meet criteria before the issue transition is applied. */
  isConditional?: boolean;
  /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
  isGlobal?: boolean;
  /** Whether this is the initial issue transition for the workflow. */
  isInitial?: boolean;
  looped?: boolean;
  /** The name of the issue transition. */
  name?: string;
  /** Details of the issue status after the transition. */
  to?: StatusDetails;
  [key: string]: unknown;
};

export type IssueTransitionStatus = {
  /** The unique ID of the status. */
  statusId?: number;
  /** The name of the status. */
  statusName?: string;
};

export type IssueTypeCreateBean = {
  /** The description of the issue type. */
  description?: string;
  /** The hierarchy level of the issue type. Use:   *  `-1` for Subtask.  *  `0` for Base.  Defaults to `0`. */
  hierarchyLevel?: number;
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name: string;
  /** Deprecated. Use `hierarchyLevel` instead. See the [deprecation notice](https://community.developer.atlassian.com/t/deprecation-of-the-epic-link-parent-link-and-other-related-fields-in-rest-apis-and-webhooks/54048) for details.  Whether the issue type is `subtype` or `standard`. Defaults to `standard`. */
  type?: "subtask" | "standard";
};

/** Details about an issue type. */
export type IssueTypeDetails = {
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** Unique ID for next-gen projects. */
  entityId?: string;
  /** Hierarchy level of the issue type. */
  hierarchyLevel?: number;
  /** The URL of the issue type's avatar. */
  iconUrl?: string;
  /** The ID of the issue type. */
  id?: string;
  /** The name of the issue type. */
  name?: string;
  /** Details of the next-gen projects the issue type is available in. */
  scope?: Scope;
  /** The URL of these issue type details. */
  self?: string;
  /** Whether this issue type is used to create subtasks. */
  subtask?: boolean;
};

/** The payload for creating an issue type hierarchy */
export type IssueTypeHierarchyPayload = {
  /** The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for subtasks */
  hierarchyLevel?: number;
  /** The name of the issue type */
  name?: string;
  /** The conflict strategy to use when the issue type already exists. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
};

/** The list of issue type IDs. */
export type IssueTypeIds = {
  /** The list of issue type IDs. */
  issueTypeIds: (string)[];
};

/** The list of issue type IDs to be removed from the field configuration scheme. */
export type IssueTypeIdsToRemove = {
  /** The list of issue type IDs. Must contain unique values not longer than 255 characters and not be empty. Maximum of 100 IDs. */
  issueTypeIds: (string)[];
};

/** Details of an issue type. */
export type IssueTypeInfo = {
  /** The avatar of the issue type. */
  avatarId?: number;
  /** The ID of the issue type. */
  id?: number;
  /** The name of the issue type. */
  name?: string;
};

/** Details of the issue creation metadata for an issue type. */
export type IssueTypeIssueCreateMetadata = {
  /** The ID of the issue type's avatar. */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** Unique ID for next-gen projects. */
  entityId?: string;
  /** Expand options that include additional issue type metadata details in the response. */
  expand?: string;
  /** List of the fields available when creating an issue for the issue type. */
  fields?: { [key: string]: FieldMetadata | undefined };
  /** Hierarchy level of the issue type. */
  hierarchyLevel?: number;
  /** The URL of the issue type's avatar. */
  iconUrl?: string;
  /** The ID of the issue type. */
  id?: string;
  /** The name of the issue type. */
  name?: string;
  /** Details of the next-gen projects the issue type is available in. */
  scope?: Scope;
  /** The URL of these issue type details. */
  self?: string;
  /** Whether this issue type is used to create subtasks. */
  subtask?: boolean;
};

/** The payload for creating an issue type */
export type IssueTypePayload = {
  /** The avatar ID of the issue type. Go to https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/\#api-rest-api-3-avatar-type-system-get to choose an avatarId existing in Jira */
  avatarId?: number | null;
  /** The description of the issue type */
  description?: string | null;
  /** The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for subtasks */
  hierarchyLevel?: number;
  /** The name of the issue type */
  name?: string;
  /** The conflict strategy to use when the issue type already exists. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
};

/** The payload for creating issue types in a project */
export type IssueTypeProjectCreatePayload = {
  /** Defines the issue type hierarhy to be created and used during this project creation. This will only add new levels if there isn't an existing level */
  issueTypeHierarchy?: (IssueTypeHierarchyPayload)[] | null;
  issueTypeScheme?: IssueTypeSchemePayload;
  /** Only needed if you want to create issue types, you can otherwise use the ids of issue types in the scheme configuration */
  issueTypes?: (IssueTypePayload)[] | null;
};

/** Details of an issue type scheme. */
export type IssueTypeScheme = {
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId?: string;
  /** The description of the issue type scheme. */
  description?: string;
  /** The ID of the issue type scheme. */
  id: string;
  /** Whether the issue type scheme is the default. */
  isDefault?: boolean;
  /** The name of the issue type scheme. */
  name: string;
};

/** Details of an issue type scheme and its associated issue types. */
export type IssueTypeSchemeDetails = {
  /** The ID of the default issue type of the issue type scheme. This ID must be included in `issueTypeIds`. */
  defaultIssueTypeId?: string;
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description?: string;
  /** The list of issue types IDs of the issue type scheme. At least one standard issue type ID is required. */
  issueTypeIds: (string)[];
  /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
  name: string;
};

/** The ID of an issue type scheme. */
export type IssueTypeSchemeId = {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: string;
};

/** Issue type scheme item. */
export type IssueTypeSchemeMapping = {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: string;
};

/** The payload for creating issue type schemes */
export type IssueTypeSchemePayload = {
  defaultIssueTypeId?: ProjectCreateResourceIdentifier;
  /** The description of the issue type scheme */
  description?: string | null;
  /** The issue type IDs for the issue type scheme */
  issueTypeIds?: (ProjectCreateResourceIdentifier)[];
  /** The name of the issue type scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
};

/** Details of the association between an issue type scheme and project. */
export type IssueTypeSchemeProjectAssociation = {
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: string;
  /** The ID of the project. */
  projectId: string;
};

/** Issue type scheme with a list of the projects that use it. */
export type IssueTypeSchemeProjects = {
  /** Details of an issue type scheme. */
  issueTypeScheme: IssueTypeScheme;
  /** The IDs of the projects using the issue type scheme. */
  projectIds: (string)[];
};

/** Details of the name, description, and default issue type for an issue type scheme. */
export type IssueTypeSchemeUpdateDetails = {
  /** The ID of the default issue type of the issue type scheme. */
  defaultIssueTypeId?: string;
  /** The description of the issue type scheme. The maximum length is 4000 characters. */
  description?: string;
  /** The name of the issue type scheme. The name must be unique. The maximum length is 255 characters. */
  name?: string;
};

/** Details of an issue type screen scheme. */
export type IssueTypeScreenScheme = {
  /** The description of the issue type screen scheme. */
  description?: string;
  /** The ID of the issue type screen scheme. */
  id: string;
  /** The name of the issue type screen scheme. */
  name: string;
};

/** The details of an issue type screen scheme. */
export type IssueTypeScreenSchemeDetails = {
  /** The description of the issue type screen scheme. The maximum length is 255 characters. */
  description?: string;
  /** The IDs of the screen schemes for the issue type IDs and *default*. A *default* entry is required to create an issue type screen scheme, it defines the mapping for all issue types without a screen scheme. */
  issueTypeMappings: (IssueTypeScreenSchemeMapping)[];
  /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: string;
};

/** The ID of an issue type screen scheme. */
export type IssueTypeScreenSchemeId = {
  /** The ID of the issue type screen scheme. */
  id: string;
};

/** The screen scheme for an issue type. */
export type IssueTypeScreenSchemeItem = {
  /** The ID of the issue type or *default*. Only issue types used in classic projects are accepted. When creating an issue screen scheme, an entry for *default* must be provided and defines the mapping for all issue types without a screen scheme. Otherwise, a *default* entry can't be provided. */
  issueTypeId: string;
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId: string;
  /** The ID of the screen scheme. */
  screenSchemeId: string;
};

/** The IDs of the screen schemes for the issue type IDs. */
export type IssueTypeScreenSchemeMapping = {
  /** The ID of the issue type or *default*. Only issue types used in classic projects are accepted. An entry for *default* must be provided and defines the mapping for all issue types without a screen scheme. */
  issueTypeId: string;
  /** The ID of the screen scheme. Only screen schemes used in classic projects are accepted. */
  screenSchemeId: string;
};

/** A list of issue type screen scheme mappings. */
export type IssueTypeScreenSchemeMappingDetails = {
  /** The list of issue type to screen scheme mappings. A *default* entry cannot be specified because a default entry is added when an issue type screen scheme is created. */
  issueTypeMappings: (IssueTypeScreenSchemeMapping)[];
};

/** Defines the payload for the issue type screen schemes. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/\#api-rest-api-3-issuetypescreenscheme-post */
export type IssueTypeScreenSchemePayload = {
  defaultScreenScheme?: ProjectCreateResourceIdentifier;
  /** The description of the issue type screen scheme */
  description?: string;
  /** The IDs of the screen schemes for the issue type IDs and default. A default entry is required to create an issue type screen scheme, it defines the mapping for all issue types without a screen scheme. */
  explicitMappings?: { [key: string]: ProjectCreateResourceIdentifier | undefined };
  /** The name of the issue type screen scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
};

/** Associated issue type screen scheme and project. */
export type IssueTypeScreenSchemeProjectAssociation = {
  /** The ID of the issue type screen scheme. */
  issueTypeScreenSchemeId?: string;
  /** The ID of the project. */
  projectId?: string;
};

/** Details of an issue type screen scheme. */
export type IssueTypeScreenSchemeUpdateDetails = {
  /** The description of the issue type screen scheme. The maximum length is 255 characters. */
  description?: string;
  /** The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters. */
  name?: string;
};

/** Issue type screen scheme with a list of the projects that use it. */
export type IssueTypeScreenSchemesProjects = {
  /** Details of an issue type screen scheme. */
  issueTypeScreenScheme: IssueTypeScreenScheme;
  /** The IDs of the projects using the issue type screen scheme. */
  projectIds: (string)[];
};

/** Mapping of an issue type to a context. */
export type IssueTypeToContextMapping = {
  /** The ID of the context. */
  contextId: string;
  /** Whether the context is mapped to any issue type. */
  isAnyIssueType?: boolean;
  /** The ID of the issue type. */
  issueTypeId?: string;
};

export type IssueTypeUpdateBean = {
  /** The ID of an issue type avatar. This can be obtained be obtained from the following endpoints:   *  [System issue type avatar IDs only](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-avatar-type-system-get)  *  [System and custom issue type avatar IDs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-rest-api-3-universal-avatar-type-type-owner-entityid-get) */
  avatarId?: number;
  /** The description of the issue type. */
  description?: string;
  /** The unique name for the issue type. The maximum length is 60 characters. */
  name?: string;
};

/** Status details for an issue type. */
export type IssueTypeWithStatus = {
  /** The ID of the issue type. */
  id: string;
  /** The name of the issue type. */
  name: string;
  /** The URL of the issue type's status details. */
  self: string;
  /** List of status details for the issue type. */
  statuses: (StatusDetails)[];
  /** Whether this issue type represents subtasks. */
  subtask: boolean;
};

/** Details about the mapping between an issue type and a workflow. */
export type IssueTypeWorkflowMapping = {
  /** The ID of the issue type. Not required if updating the issue type-workflow mapping. */
  issueType?: string;
  /** Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping. */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow. */
  workflow?: string;
};

/** Details about the mapping between issue types and a workflow. */
export type IssueTypesWorkflowMapping = {
  /** Whether the workflow is the default workflow for the workflow scheme. */
  defaultMapping?: boolean;
  /** The list of issue type IDs. */
  issueTypes?: (string)[];
  /** Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new workflow-issue types mapping. Defaults to `false`. */
  updateDraftIfNeeded?: boolean;
  /** The name of the workflow. Optional if updating the workflow-issue types mapping. */
  workflow?: string;
};

/** Details of an issue update request. */
export type IssueUpdateDetails = {
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
  [key: string]: unknown;
};

/** A list of editable field details. */
export type IssueUpdateMetadata = {
  fields?: { [key: string]: FieldMetadata | undefined };
};

/** List of issues and JQL queries. */
export type IssuesAndJqlQueries = {
  /** A list of issue IDs. */
  issueIds: (number)[];
  /** A list of JQL queries. */
  jqls: (string)[];
};

/** The description of the page of issues loaded by the provided JQL query. */
export type IssuesJqlMetaDataBean = {
  /** The number of issues that were loaded in this evaluation. */
  count: number;
  /** The maximum number of issues that could be loaded in this evaluation. */
  maxResults: number;
  /** The index of the first issue. */
  startAt: number;
  /** The total number of issues the JQL returned. */
  totalCount: number;
  /** Any warnings related to the JQL query. Present only if the validation mode was set to `warn`. */
  validationWarnings?: (string)[];
};

/** Meta data describing the `issues` context variable. */
export type IssuesMetaBean = {
  jql?: IssuesJqlMetaDataBean;
};

export type IssuesUpdateBean = {
  issueUpdates?: (IssueUpdateDetails)[];
  [key: string]: unknown;
};

/** The description of the page of issues loaded by the provided JQL query.This bean will be replacing IssuesJqlMetaDataBean bean as part of new `evaluate` endpoint */
export type JExpEvaluateIssuesJqlMetaDataBean = {
  /** Indicates whether this is the last page of the paginated response. */
  isLast?: boolean;
  /** Next Page token for the next page of issues. */
  nextPageToken: string;
};

/** Meta data describing the `issues` context variable.This bean will be replacing IssuesMetaBean bean as part of new `evaluate` endpoint */
export type JExpEvaluateIssuesMetaBean = {
  jql?: JExpEvaluateIssuesJqlMetaDataBean;
};

/** The result of evaluating a Jira expression.This bean will be replacing `JiraExpressionResultBean` bean as part of new evaluate endpoint */
export type JExpEvaluateJiraExpressionResultBean = {
  /** Contains various characteristics of the performed expression evaluation. */
  meta?: JExpEvaluateMetaDataBean;
  /** The value of the evaluated expression. It may be a primitive JSON value or a Jira REST API object. (Some expressions do not produce any meaningful results—for example, an expression that returns a lambda function—if that's the case a simple string representation is returned. These string representations should not be relied upon and may change without notice.) */
  value: unknown;
};

/** Contains information about the expression evaluation. This bean will be replacing `JiraExpressionEvaluationMetaDataBean` bean as part of new `evaluate` endpoint */
export type JExpEvaluateMetaDataBean = {
  /** Contains information about the expression complexity. For example, the number of steps it took to evaluate the expression. */
  complexity?: JiraExpressionsComplexityBean;
  /** Contains information about the `issues` variable in the context. For example, is the issues were loaded with JQL, information about the page will be included here. */
  issues?: JExpEvaluateIssuesMetaBean;
};

export type JqlCountRequestBean = {
  /** A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction. */
  jql?: string;
};

export type JqlCountResultsBean = {
  /** Number of issues matching JQL query. */
  count?: number;
};

/** The JQL queries to be converted. */
export type JqlPersonalDataMigrationRequest = {
  /** A list of queries with user identifiers. Maximum of 100 queries. */
  queryStrings?: (string)[];
};

/** JQL queries that contained users that could not be found */
export type JqlQueryWithUnknownUsers = {
  /** The converted query, with accountIDs instead of user identifiers, or 'unknown' for users that could not be found */
  convertedQuery?: string;
  /** The original query, for reference */
  originalQuery?: string;
};

/** Lists of JQL reference data. */
export type JqlReferenceData = {
  /** List of JQL query reserved words. */
  jqlReservedWords?: (string)[];
  /** List of fields usable in JQL queries. */
  visibleFieldNames?: (FieldReferenceData)[];
  /** List of functions usable in JQL queries. */
  visibleFunctionNames?: (FunctionReferenceData)[];
};

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. This bean will be replacing `JexpIssues` bean as part of new `evaluate` endpoint */
export type JexpEvaluateCtxIssues = {
  /** The JQL query that specifies the set of issues available in the Jira expression. */
  jql?: JexpEvaluateCtxJqlIssues;
};

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. Not all issues returned by the JQL query are loaded, only those described by the `nextPageToken` and `maxResults` properties. This bean will be replacing JexpJqlIssues bean as part of new `evaluate` endpoint */
export type JexpEvaluateCtxJqlIssues = {
  /** The maximum number of issues to return from the JQL query. max results value considered may be lower than the number specific here. */
  maxResults?: number;
  /** The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues. */
  nextPageToken?: string;
  /** The JQL query, required to be bounded. Additionally, `orderBy` clause can contain a maximum of 7 fields */
  query?: string;
};

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. */
export type JexpIssues = {
  /** The JQL query that specifies the set of issues available in the Jira expression. */
  jql?: JexpJqlIssues;
};

/** The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable. Not all issues returned by the JQL query are loaded, only those described by the `startAt` and `maxResults` properties. To determine whether it is necessary to iterate to ensure all the issues returned by the JQL query are evaluated, inspect `meta.issues.jql.count` in the response. */
export type JexpJqlIssues = {
  /** The maximum number of issues to return from the JQL query. Inspect `meta.issues.jql.maxResults` in the response to ensure the maximum value has not been exceeded. */
  maxResults?: number;
  /** The JQL query. */
  query?: string;
  /** The index of the first issue to return from the JQL query. */
  startAt?: number;
  /** Determines how to validate the JQL query and treat the validation results. */
  validation?: "strict" | "warn" | "none";
};

export type JiraCascadingSelectField = {
  childOptionValue?: JiraSelectedOptionField;
  fieldId: string;
  parentOptionValue: JiraSelectedOptionField;
};

export type JiraColorField = {
  color: JiraColorInput;
  fieldId: string;
};

export type JiraColorInput = {
  name: string;
};

export type JiraComponentField = {
  componentId: number;
};

export type JiraDateField = {
  date?: JiraDateInput;
  fieldId: string;
};

export type JiraDateInput = {
  formattedDate: string;
};

export type JiraDateTimeField = {
  dateTime: JiraDateTimeInput;
  fieldId: string;
};

export type JiraDateTimeInput = {
  formattedDateTime: string;
};

export type JiraDurationField = {
  originalEstimateField: string;
};

/** Details about the analysed Jira expression. */
export type JiraExpressionAnalysis = {
  complexity?: JiraExpressionComplexity;
  /** A list of validation errors. Not included if the expression is valid. */
  errors?: (JiraExpressionValidationError)[];
  /** The analysed expression. */
  expression: string;
  /** EXPERIMENTAL. The inferred type of the expression. */
  type?: string;
  /** Whether the expression is valid and the interpreter will evaluate it. Note that the expression may fail at runtime (for example, if it executes too many expensive operations). */
  valid: boolean;
};

/** Details about the complexity of the analysed Jira expression. */
export type JiraExpressionComplexity = {
  /** Information that can be used to determine how many [expensive operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) the evaluation of the expression will perform. This information may be a formula or number. For example:   *  `issues.map(i => i.comments)` performs as many expensive operations as there are issues on the issues list. So this parameter returns `N`, where `N` is the size of issue list.  *  `new Issue(10010).comments` gets comments for one issue, so its complexity is `2` (`1` to retrieve issue 10010 from the database plus `1` to get its comments). */
  expensiveOperations: string;
  /** Variables used in the formula, mapped to the parts of the expression they refer to. */
  variables?: { [key: string]: string | undefined };
};

export type JiraExpressionEvalContextBean = {
  /** The ID of the board that is available under the `board` variable when evaluating the expression. */
  board?: number;
  /** Custom context variables and their types. These variable types are available for use in a custom context:   *  `user`: A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.  *  `issue`: An [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression.  *  `json`: A JSON object containing custom content.  *  `list`: A JSON list of `user`, `issue`, or `json` variable types. */
  custom?: (CustomContextVariable)[];
  /** The ID of the customer request that is available under the `customerRequest` variable when evaluating the expression. This is the same as the ID of the underlying Jira issue, but the customer request context variable will have a different type. */
  customerRequest?: number;
  /** The issue that is available under the `issue` variable when evaluating the expression. */
  issue?: IdOrKeyBean;
  /** The collection of issues that is available under the `issues` variable when evaluating the expression. */
  issues?: JexpIssues;
  /** The project that is available under the `project` variable when evaluating the expression. */
  project?: IdOrKeyBean;
  /** The ID of the service desk that is available under the `serviceDesk` variable when evaluating the expression. */
  serviceDesk?: number;
  /** The ID of the sprint that is available under the `sprint` variable when evaluating the expression. */
  sprint?: number;
};

export type JiraExpressionEvalRequestBean = {
  /** The context in which the Jira expression is evaluated. */
  context?: JiraExpressionEvalContextBean;
  /** The Jira expression to evaluate. */
  expression: string;
};

export type JiraExpressionEvaluateContextBean = {
  /** The ID of the board that is available under the `board` variable when evaluating the expression. */
  board?: number;
  /** Custom context variables and their types. These variable types are available for use in a custom context:   *  `user`: A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.  *  `issue`: An [issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression.  *  `json`: A JSON object containing custom content.  *  `list`: A JSON list of `user`, `issue`, or `json` variable types. */
  custom?: (CustomContextVariable)[];
  /** The ID of the customer request that is available under the `customerRequest` variable when evaluating the expression. This is the same as the ID of the underlying Jira issue, but the customer request context variable will have a different type. */
  customerRequest?: number;
  /** The issue that is available under the `issue` variable when evaluating the expression. */
  issue?: IdOrKeyBean;
  /** The collection of issues that is available under the `issues` variable when evaluating the expression. */
  issues?: JexpEvaluateCtxIssues;
  /** The project that is available under the `project` variable when evaluating the expression. */
  project?: IdOrKeyBean;
  /** The ID of the service desk that is available under the `serviceDesk` variable when evaluating the expression. */
  serviceDesk?: number;
  /** The ID of the sprint that is available under the `sprint` variable when evaluating the expression. */
  sprint?: number;
};

/** The request to evaluate a Jira expression. This bean will be replacing `JiraExpressionEvaluateRequest` as part of new `evaluate` endpoint */
export type JiraExpressionEvaluateRequestBean = {
  /** The context in which the Jira expression is evaluated. */
  context?: JiraExpressionEvaluateContextBean;
  /** The Jira expression to evaluate. */
  expression: string;
};

export type JiraExpressionEvaluationMetaDataBean = {
  /** Contains information about the expression complexity. For example, the number of steps it took to evaluate the expression. */
  complexity?: JiraExpressionsComplexityBean;
  /** Contains information about the `issues` variable in the context. For example, is the issues were loaded with JQL, information about the page will be included here. */
  issues?: IssuesMetaBean;
};

/** Details of Jira expressions for analysis. */
export type JiraExpressionForAnalysis = {
  /** Context variables and their types. The type checker assumes that [common context variables](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#context-variables), such as `issue` or `project`, are available in context and sets their type. Use this property to override the default types or provide details of new variables. */
  contextVariables?: { [key: string]: string | undefined };
  /** The list of Jira expressions to analyse. */
  expressions: (string)[];
};

/** The result of evaluating a Jira expression. */
export type JiraExpressionResult = {
  /** Contains various characteristics of the performed expression evaluation. */
  meta?: JiraExpressionEvaluationMetaDataBean;
  /** The value of the evaluated expression. It may be a primitive JSON value or a Jira REST API object. (Some expressions do not produce any meaningful results—for example, an expression that returns a lambda function—if that's the case a simple string representation is returned. These string representations should not be relied upon and may change without notice.) */
  value: unknown;
};

/** Details about syntax and type errors. The error details apply to the entire expression, unless the object includes:   *  `line` and `column`  *  `expression` */
export type JiraExpressionValidationError = {
  /** The text column in which the error occurred. */
  column?: number;
  /** The part of the expression in which the error occurred. */
  expression?: string;
  /** The text line in which the error occurred. */
  line?: number;
  /** Details about the error. */
  message: string;
  /** The error type. */
  type: "syntax" | "type" | "other";
};

/** Details about the analysed Jira expression. */
export type JiraExpressionsAnalysis = {
  /** The results of Jira expressions analysis. */
  results: (JiraExpressionAnalysis)[];
};

export type JiraExpressionsComplexityBean = {
  /** The number of Jira REST API beans returned in the response. */
  beans: JiraExpressionsComplexityValueBean;
  /** The number of expensive operations executed while evaluating the expression. Expensive operations are those that load additional data, such as entity properties, comments, or custom fields. */
  expensiveOperations: JiraExpressionsComplexityValueBean;
  /** The number of primitive values returned in the response. */
  primitiveValues: JiraExpressionsComplexityValueBean;
  /** The number of steps it took to evaluate the expression, where a step is a high-level operation performed by the expression. A step is an operation such as arithmetic, accessing a property, accessing a context variable, or calling a function. */
  steps: JiraExpressionsComplexityValueBean;
};

export type JiraExpressionsComplexityValueBean = {
  /** The maximum allowed complexity. The evaluation will fail if this value is exceeded. */
  limit: number;
  /** The complexity value of the current expression. */
  value: number;
};

export type JiraGroupInput = {
  groupName: string;
};

export type JiraIssueFields = {
  /** Add or clear a cascading select field:   *  To add, specify `optionId` for both parent and child.  *  To clear the child, set its `optionId` to null.  *  To clear both, set the parent's `optionId` to null. */
  cascadingSelectFields?: (JiraCascadingSelectField)[];
  /** Add or clear a number field:   *  To add, specify a numeric `value`.  *  To clear, set `value` to `null`. */
  clearableNumberFields?: (JiraNumberField)[];
  /** Add or clear a color field:   *  To add, specify the color `name`. Available colors are: `purple`, `blue`, `green`, `teal`, `yellow`, `orange`, `grey`, `dark purple`, `dark blue`, `dark green`, `dark teal`, `dark yellow`, `dark orange`, `dark grey`.  *  To clear, set the color `name` to an empty string. */
  colorFields?: (JiraColorField)[];
  /** Add or clear a date picker field:   *  To add, specify the date in `d/mmm/yy` format or ISO format `dd-mm-yyyy`.  *  To clear, set `formattedDate` to an empty string. */
  datePickerFields?: (JiraDateField)[];
  /** Add or clear the planned start date and time:   *  To add, specify the date and time in ISO format for `formattedDateTime`.  *  To clear, provide an empty string for `formattedDateTime`. */
  dateTimePickerFields?: (JiraDateTimeField)[];
  /** Set the issue type field by providing an `issueTypeId`. */
  issueType?: JiraIssueTypeField;
  /** Edit a labels field:   *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.  *  To clear labels, use the `REMOVE_ALL` option with an empty `labels` array. */
  labelsFields?: (JiraLabelsField)[];
  /** Add or clear a multi-group picker field:   *  To add groups, provide an array of groups with `groupName`s.  *  To clear all groups, use an empty `groups` array. */
  multipleGroupPickerFields?: (JiraMultipleGroupPickerField)[];
  /** Assign or unassign multiple users to/from a field:   *  To assign, provide an array of user `accountId`s.  *  To clear, set `users` to `null`. */
  multipleSelectClearableUserPickerFields?: (JiraMultipleSelectUserPickerField)[];
  /** Add or clear a multi-select field:   *  To add, provide an array of options with `optionId`s.  *  To clear, use an empty `options` array. */
  multipleSelectFields?: (JiraMultipleSelectField)[];
  /** Edit a multi-version picker field like Fix Versions/Affects Versions:   *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.  *  To clear the field, use the `REMOVE_ALL` option with an empty `versions` array. */
  multipleVersionPickerFields?: (JiraMultipleVersionPickerField)[];
  /** Edit a multi select components field:   *  Options include `ADD`, `REPLACE`, `REMOVE`, or `REMOVE_ALL` for bulk edits.  *  To clear, use the `REMOVE_ALL` option with an empty `components` array. */
  multiselectComponents?: JiraMultiSelectComponentField;
  /** Edit the original estimate field. */
  originalEstimateField?: JiraDurationField;
  /** Set the priority of an issue by specifying a `priorityId`. */
  priority?: JiraPriorityField;
  /** Add or clear a rich text field:   *  To add, provide `adfValue`. Note that rich text fields only support ADF values.  *  To clear, use an empty `richText` object.  For ADF format details, refer to: [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure). */
  richTextFields?: (JiraRichTextField)[];
  /** Add or clear a single group picker field:   *  To add, specify the group with `groupName`.  *  To clear, set `groupName` to an empty string. */
  singleGroupPickerFields?: (JiraSingleGroupPickerField)[];
  /** Add or clear a single line text field:   *  To add, provide the `text` value.  *  To clear, set `text` to an empty string. */
  singleLineTextFields?: (JiraSingleLineTextField)[];
  /** Edit assignment for single select user picker fields like Assignee/Reporter:   *  To assign an issue, specify the user's `accountId`.  *  To unassign an issue, set `user` to `null`.  *  For automatic assignment, set `accountId` to `-1`. */
  singleSelectClearableUserPickerFields?: (JiraSingleSelectUserPickerField)[];
  /** Add or clear a single select field:   *  To add, specify the option with an `optionId`.  *  To clear, pass an option with `optionId` as `-1`. */
  singleSelectFields?: (JiraSingleSelectField)[];
  /** Add or clear a single version picker field:   *  To add, specify the version with a `versionId`.  *  To clear, set `versionId` to `-1`. */
  singleVersionPickerFields?: (JiraSingleVersionPickerField)[];
  status?: JiraStatusInput;
  /** Edit the time tracking field. */
  timeTrackingField?: JiraTimeTrackingField;
  /** Add or clear a URL field:   *  To add, provide the `url` with the desired URL value.  *  To clear, set `url` to an empty string. */
  urlFields?: (JiraUrlField)[];
};

export type JiraIssueTypeField = {
  issueTypeId: string;
};

export type JiraLabelPropertiesInputJackson1 = {
  color?: "GREY_LIGHTEST" | "GREY_LIGHTER" | "GREY" | "GREY_DARKER" | "GREY_DARKEST" | "PURPLE_LIGHTEST" | "PURPLE_LIGHTER" | "PURPLE" | "PURPLE_DARKER" | "PURPLE_DARKEST" | "BLUE_LIGHTEST" | "BLUE_LIGHTER" | "BLUE" | "BLUE_DARKER" | "BLUE_DARKEST" | "TEAL_LIGHTEST" | "TEAL_LIGHTER" | "TEAL" | "TEAL_DARKER" | "TEAL_DARKEST" | "GREEN_LIGHTEST" | "GREEN_LIGHTER" | "GREEN" | "GREEN_DARKER" | "GREEN_DARKEST" | "LIME_LIGHTEST" | "LIME_LIGHTER" | "LIME" | "LIME_DARKER" | "LIME_DARKEST" | "YELLOW_LIGHTEST" | "YELLOW_LIGHTER" | "YELLOW" | "YELLOW_DARKER" | "YELLOW_DARKEST" | "ORANGE_LIGHTEST" | "ORANGE_LIGHTER" | "ORANGE" | "ORANGE_DARKER" | "ORANGE_DARKEST" | "RED_LIGHTEST" | "RED_LIGHTER" | "RED" | "RED_DARKER" | "RED_DARKEST" | "MAGENTA_LIGHTEST" | "MAGENTA_LIGHTER" | "MAGENTA" | "MAGENTA_DARKER" | "MAGENTA_DARKEST";
  name?: string;
};

export type JiraLabelsField = {
  bulkEditMultiSelectFieldOption: "ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL";
  fieldId: string;
  labelProperties?: (JiraLabelPropertiesInputJackson1)[];
  labels: (JiraLabelsInput)[];
};

export type JiraLabelsInput = {
  name: string;
};

export type JiraMultiSelectComponentField = {
  bulkEditMultiSelectFieldOption: "ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL";
  components: (JiraComponentField)[];
  fieldId: string;
};

export type JiraMultipleGroupPickerField = {
  fieldId: string;
  groups: (JiraGroupInput)[];
};

export type JiraMultipleSelectField = {
  fieldId: string;
  options: (JiraSelectedOptionField)[];
};

export type JiraMultipleSelectUserPickerField = {
  fieldId: string;
  users?: (JiraUserField)[];
};

export type JiraMultipleVersionPickerField = {
  bulkEditMultiSelectFieldOption: "ADD" | "REMOVE" | "REPLACE" | "REMOVE_ALL";
  fieldId: string;
  versions: (JiraVersionField)[];
};

export type JiraNumberField = {
  fieldId: string;
  value?: number;
};

export type JiraPriorityField = {
  priorityId: string;
};

export type JiraRichTextField = {
  fieldId: string;
  richText: JiraRichTextInput;
};

export type JiraRichTextInput = {
  adfValue?: { [key: string]: unknown | undefined };
};

export type JiraSelectedOptionField = {
  optionId?: number;
};

export type JiraSingleGroupPickerField = {
  fieldId: string;
  group: JiraGroupInput;
};

export type JiraSingleLineTextField = {
  fieldId: string;
  text: string;
};

/** Add or clear a single select field:   *  To add, specify the option with an `optionId`.  *  To clear, pass an option with `optionId` as `-1`. */
export type JiraSingleSelectField = {
  fieldId: string;
  option: JiraSelectedOptionField;
};

export type JiraSingleSelectUserPickerField = {
  fieldId: string;
  user?: JiraUserField;
};

export type JiraSingleVersionPickerField = {
  fieldId: string;
  version: JiraVersionField;
};

/** Details of a status. */
export type JiraStatus = {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  scope?: StatusScope;
  /** The category of the status. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
};

export type JiraStatusInput = {
  statusId: string;
};

export type JiraTimeTrackingField = {
  timeRemaining: string;
};

export type JiraUrlField = {
  fieldId: string;
  url: string;
};

export type JiraUserField = {
  accountId: string;
};

export type JiraVersionField = {
  versionId?: string;
};

/** Details of a workflow. */
export type JiraWorkflow = {
  /** The creation date of the workflow. */
  created?: string | null;
  /** The description of the workflow. */
  description?: string;
  /** The ID of the workflow. */
  id?: string;
  /** Indicates if the workflow can be edited. */
  isEditable?: boolean;
  loopedTransitionContainerLayout?: WorkflowLayout;
  /** The name of the workflow. */
  name?: string;
  scope?: WorkflowScope;
  startPointLayout?: WorkflowLayout;
  /** The statuses referenced in this workflow. */
  statuses?: (WorkflowReferenceStatus)[];
  /** If there is a current [asynchronous task](#async-operations) operation for this workflow. */
  taskId?: string | null;
  /** The transitions of the workflow. */
  transitions?: (WorkflowTransitions)[];
  /** The last edited date of the workflow. */
  updated?: string | null;
  version?: DocumentVersion;
};

/** Details of a status. */
export type JiraWorkflowPreviewStatus = {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The raw name of the status. */
  rawName?: string;
  scope?: WorkflowPreviewScope;
  /** The category of the status. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
  /** The reference of the status. Unique within this response but not guaranteed to be stable across requests. */
  statusReference?: string;
};

/** Details of a status. */
export type JiraWorkflowStatus = {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  scope?: WorkflowScope;
  /** The category of the status. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
  /** The reference of the status. */
  statusReference?: string;
};

/** Jql function precomputation. */
export type JqlFunctionPrecomputationBean = {
  /** The list of arguments function was invoked with. */
  arguments?: (string)[];
  /** The timestamp of the precomputation creation. */
  created?: string;
  /** The error message to be displayed to the user. */
  error?: string;
  /** The field the function was executed against. */
  field?: string;
  /** The function key. */
  functionKey?: string;
  /** The name of the function. */
  functionName?: string;
  /** The id of the precomputation. */
  id?: string;
  /** The operator in context of which function was executed. */
  operator?: string;
  /** The timestamp of the precomputation last update. */
  updated?: string;
  /** The timestamp of the precomputation last usage. */
  used?: string;
  /** The JQL fragment stored as the precomputation. */
  value?: string;
};

/** Request to fetch precomputations by ID. */
export type JqlFunctionPrecomputationGetByIdRequest = {
  precomputationIDs?: (string)[];
};

/** Get precomputations by ID response. */
export type JqlFunctionPrecomputationGetByIdResponse = {
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: (string)[];
  /** The list of precomputations. */
  precomputations?: (JqlFunctionPrecomputationBean)[];
};

/** Precomputation id and its new value. */
export type JqlFunctionPrecomputationUpdateBean = {
  /** The error message to be displayed to the user if the given function clause is no longer valid during recalculation of the precomputation. */
  error?: string;
  /** The id of the precomputation to update. */
  id: string;
  /** The new value of the precomputation. */
  value?: string;
};

/** Error response returned updating JQL Function precomputations fails. */
export type JqlFunctionPrecomputationUpdateErrorResponse = {
  /** The list of error messages produced by this operation. */
  errorMessages?: (string)[];
  /** List of precomputations that were not found. */
  notFoundPrecomputationIDs?: (string)[];
};

/** List of pairs (id and value) for precomputation updates. */
export type JqlFunctionPrecomputationUpdateRequestBean = {
  values?: (JqlFunctionPrecomputationUpdateBean)[];
};

/** Result of updating JQL Function precomputations. */
export type JqlFunctionPrecomputationUpdateResponse = {
  /** List of precomputations that were not found and skipped. Only returned if the request passed skipNotFoundPrecomputations=true. */
  notFoundPrecomputationIDs?: (string)[];
};

/** A list of JQL queries to parse. */
export type JqlQueriesToParse = {
  /** A list of queries to parse. */
  queries: (string)[];
};

/** The list of JQL queries to sanitize for the given account IDs. */
export type JqlQueriesToSanitize = {
  /** The list of JQL queries to sanitize. Must contain unique values. Maximum of 20 queries. */
  queries: (JqlQueryToSanitize)[];
};

/** A parsed JQL query. */
export type JqlQuery = {
  orderBy?: JqlQueryOrderByClause;
  where?: JqlQueryClause;
};

/** A JQL query clause. */
export type JqlQueryClause = CompoundClause | FieldValueClause | FieldWasClause | FieldChangedClause;

/** Details of an operand in a JQL clause. */
export type JqlQueryClauseOperand = ListOperand | ValueOperand | FunctionOperand | KeywordOperand;

/** A time predicate for a temporal JQL clause. */
export type JqlQueryClauseTimePredicate = {
  operand: JqlQueryClauseOperand;
  /** The operator between the field and the operand. */
  operator: "before" | "after" | "from" | "to" | "on" | "during" | "by";
};

/** A field used in a JQL query. See [Advanced searching - fields reference](https://confluence.atlassian.com/x/dAiiLQ) for more information about fields in JQL queries. */
export type JqlQueryField = {
  /** The encoded name of the field, which can be used directly in a JQL query. */
  encodedName?: string;
  /** The name of the field. */
  name: string;
  /** When the field refers to a value in an entity property, details of the entity property value. */
  property?: (JqlQueryFieldEntityProperty)[];
};

/** Details of an entity property. */
export type JqlQueryFieldEntityProperty = {
  /** The object on which the property is set. */
  entity: string;
  /** The key of the property. */
  key: string;
  /** The path in the property value to query. */
  path: string;
  /** The type of the property value extraction. Not available if the extraction for the property is not registered on the instance with the [Entity property](https://developer.atlassian.com/cloud/jira/platform/modules/entity-property/) module. */
  type?: "number" | "string" | "text" | "date" | "user";
};

/** Details of the order-by JQL clause. */
export type JqlQueryOrderByClause = {
  /** The list of order-by clause fields and their ordering directives. */
  fields: (JqlQueryOrderByClauseElement)[];
};

/** An element of the order-by JQL clause. */
export type JqlQueryOrderByClauseElement = {
  /** The direction in which to order the results. */
  direction?: "asc" | "desc";
  field: JqlQueryField;
};

/** The JQL query to sanitize for the account ID. If the account ID is null, sanitizing is performed for an anonymous user. */
export type JqlQueryToSanitize = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string | null;
  /** The query to sanitize. */
  query: string;
};

/** An operand that can be part of a list operand. */
export type JqlQueryUnitaryOperand = ValueOperand | FunctionOperand | KeywordOperand;

/** A JSON object with custom content. */
export type JsonContextVariable = {
  /** Type of custom context variable. */
  type: string;
  /** A JSON object containing custom content. */
  value?: { [key: string]: unknown };
};

export type JsonNode = {
  array?: boolean;
  bigDecimal?: boolean;
  bigInteger?: boolean;
  bigIntegerValue?: number;
  binary?: boolean;
  binaryValue?: (string)[];
  boolean?: boolean;
  booleanValue?: boolean;
  containerNode?: boolean;
  decimalValue?: number;
  double?: boolean;
  doubleValue?: number;
  elements?: { [key: string]: unknown };
  fieldNames?: { [key: string]: unknown };
  fields?: { [key: string]: unknown };
  floatingPointNumber?: boolean;
  int?: boolean;
  intValue?: number;
  integralNumber?: boolean;
  long?: boolean;
  longValue?: number;
  missingNode?: boolean;
  null?: boolean;
  number?: boolean;
  numberType?: "INT" | "LONG" | "BIG_INTEGER" | "FLOAT" | "DOUBLE" | "BIG_DECIMAL";
  numberValue?: number;
  object?: boolean;
  pojo?: boolean;
  textValue?: string;
  textual?: boolean;
  valueAsBoolean?: boolean;
  valueAsDouble?: number;
  valueAsInt?: number;
  valueAsLong?: number;
  valueAsText?: string;
  valueNode?: boolean;
};

/** The schema of a field. */
export type JsonTypeBean = {
  /** If the field is a custom field, the configuration of the field. */
  configuration?: { [key: string]: unknown | undefined };
  /** If the field is a custom field, the URI of the field. */
  custom?: string;
  /** If the field is a custom field, the custom ID of the field. */
  customId?: number;
  /** When the data type is an array, the name of the field items within the array. */
  items?: string;
  /** If the field is a system field, the name of the field. */
  system?: string;
  /** The data type of the field. */
  type: string;
};

/** An operand that is a JQL keyword. See [Advanced searching - keywords reference](https://confluence.atlassian.com/jiracorecloud/advanced-searching-keywords-reference-765593717.html#Advancedsearching-keywordsreference-EMPTYEMPTY) for more information about operand keywords. */
export type KeywordOperand = {
  /** The keyword that is the operand value. */
  keyword: "empty";
};

export type LegacyJackson1ListAttachment = (Attachment)[];

export type LegacyJackson1ListColumnItem = (ColumnItem)[];

export type LegacyJackson1ListIssueEvent = (IssueEvent)[];

export type LegacyJackson1ListIssueTypeWithStatus = (IssueTypeWithStatus)[];

export type LegacyJackson1ListProject = (Project)[];

export type LegacyJackson1ListProjectComponent = (ProjectComponent)[];

export type LegacyJackson1ListProjectRoleDetails = (ProjectRoleDetails)[];

export type LegacyJackson1ListProjectType = (ProjectType)[];

export type LegacyJackson1ListUserMigrationBean = (UserMigrationBean)[];

export type LegacyJackson1ListVersion = (Version)[];

export type LegacyJackson1ListWorklog = (Worklog)[];

/** Details about a license for the Jira instance. */
export type License = {
  /** The applications under this license. */
  applications: (LicensedApplication)[];
};

/** A metric that provides insight into the active licence details */
export type LicenseMetric = {
  /** The key of a specific license metric. */
  key?: string;
  /** The calculated value of a licence metric linked to the key. An example licence metric is the approximate number of user accounts. */
  value?: string;
};

/** Details about a licensed Jira application. */
export type LicensedApplication = {
  /** The ID of the application. */
  id: string;
  /** The licensing plan. */
  plan: "UNLICENSED" | "FREE" | "PAID";
};

/** Details a link group, which defines issue operations. */
export type LinkGroup = {
  groups?: (LinkGroup)[];
  header?: SimpleLink;
  id?: string;
  links?: (SimpleLink)[];
  styleClass?: string;
  weight?: number;
};

export type LinkIssueRequestJsonBean = {
  comment?: Comment;
  inwardIssue: LinkedIssue;
  outwardIssue: LinkedIssue;
  type: IssueLinkType;
};

/** The ID or key of a linked issue. */
export type LinkedIssue = {
  /** The fields associated with the issue. */
  fields?: Fields;
  /** The ID of an issue. Required if `key` isn't provided. */
  id?: string;
  /** The key of an issue. Required if `id` isn't provided. */
  key?: string;
  /** The URL of the issue. */
  self?: string;
};

/** An operand that is a list of values. */
export type ListOperand = {
  /** Encoded operand, which can be used directly in a JQL query. */
  encodedOperand?: string;
  /** The list of operand values. */
  values: (JqlQueryUnitaryOperand)[];
};

export type ListWrapperCallbackApplicationRole = { [key: string]: unknown };

export type ListWrapperCallbackGroupName = { [key: string]: unknown };

/** Details of a locale. */
export type Locale = {
  /** The locale code. The Java the locale format is used: a two character language code (ISO 639), an underscore, and two letter country code (ISO 3166). For example, en\_US represents a locale of English (United States). Required on create. */
  locale?: string;
};

/** List of string of inputs */
export type MandatoryFieldValue = {
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain?: boolean | null;
  /** Will treat as `MandatoryFieldValue` if type is `raw` or `empty` */
  type?: "adf" | "raw" | null;
  /** Value for each field. Provide a `list of strings` for non-ADF fields. */
  value: (string)[];
};

/** An object notation input */
export type MandatoryFieldValueForAdf = {
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain?: boolean | null;
  /** Will treat as `MandatoryFieldValueForADF` if type is `adf` */
  type: "adf" | "raw";
  /** Value for each field. Accepts Atlassian Document Format (ADF) for rich text fields like `description`, `environments`. For ADF format details, refer to: [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure) */
  value: { [key: string]: unknown };
};

/** The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to another. This field is required if any statuses in the current project's workflows would no longer exist in the target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new status in the issue’s new workflow. */
export type MappingsByIssueTypeOverride = {
  issueTypeId?: string;
  statusMappings?: (WorkflowAssociationStatusMapping)[];
};

/** The status mappings by workflows. Status mappings are required when the new workflow for an issue type doesn't contain all statuses that the old workflow has. Status mappings can be provided by a combination of `statusMappingsByWorkflows` and `statusMappingsByIssueTypeOverride`. */
export type MappingsByWorkflow = {
  /** The ID of the new workflow. */
  newWorkflowId: string;
  /** The ID of the old workflow. */
  oldWorkflowId: string;
  /** The list of status mappings. */
  statusMappings: (WorkflowAssociationStatusMapping)[];
};

/** Minimal partial failure result when updating field scheme to fields associations. */
export type MinimalFieldSchemeToFieldsPartialFailure = {
  error?: string;
  fieldId: string;
  schemeId: number;
  success: boolean;
};

/** Minimal response for updating field scheme to fields associations. */
export type MinimalFieldSchemeToFieldsResponse = {
  results: (MinimalFieldSchemeToFieldsPartialFailure)[];
};

export type MoveFieldBean = {
  /** The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't provided. */
  after?: string;
  /** The named position to which the screen tab field should be moved. Required if `after` isn't provided. */
  position?: "Earlier" | "Later" | "First" | "Last";
};

/** A list of issues and their respective properties to set or update. See [Entity properties](https://developer.atlassian.com/cloud/jira/platform/jira-entity-properties/) for more information. */
export type MultiIssueEntityProperties = {
  /** A list of issue IDs and their respective properties. */
  issues?: (IssueEntityPropertiesForMultiUpdate)[];
};

export type MultipartFile = {
  bytes?: (string)[];
  contentType?: string;
  empty?: boolean;
  inputStream?: { [key: string]: unknown };
  name?: string;
  originalFilename?: string;
  resource?: Resource;
  size?: number;
};

/** A custom field and its new value with a list of issue to update. */
export type MultipleCustomFieldValuesUpdate = {
  /** The ID or key of the custom field. For example, `customfield_10010`. */
  customField: string;
  /** The list of issue IDs. */
  issueIds: (number)[];
  /** The value for the custom field. The value must be compatible with the [custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#data-types) as follows:   *  `string` the value must be a string.  *  `number` the value must be a number.  *  `datetime` the value must be a string that represents a date in the ISO format or the simplified extended ISO format. For example, `"2023-01-18T12:00:00-03:00"` or `"2023-01-18T12:00:00.000Z"`. However, the milliseconds part is ignored.  *  `user` the value must be an object that contains the `accountId` field.  *  `group` the value must be an object that contains the group `name` or `groupId` field. Because group names can change, we recommend using `groupId`.  A list of appropriate values must be provided if the field is of the `list` [collection type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field/#collection-types). */
  value: unknown;
};

/** List of updates for a custom fields. */
export type MultipleCustomFieldValuesUpdateDetails = {
  updates?: (MultipleCustomFieldValuesUpdate)[];
};

export type NestedResponse = {
  errorCollection?: ErrorCollection;
  status?: number;
  warningCollection?: WarningCollection;
};

/** The user details. */
export type NewUserDetails = {
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
};

export type NonWorkingDay = {
  id?: number;
  iso8601Date?: string;
};

/** Details about a notification. */
export type Notification = {
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
  [key: string]: unknown;
};

/** Details about a notification event. */
export type NotificationEvent = {
  /** The description of the event. */
  description?: string;
  /** The ID of the event. The event can be a [Jira system event](https://confluence.atlassian.com/x/8YdKLg#Creatinganotificationscheme-eventsEvents) or a [custom event](https://confluence.atlassian.com/x/AIlKLg). */
  id?: number;
  /** The name of the event. */
  name?: string;
  /** The template of the event. Only custom events configured by Jira administrators have template. */
  templateEvent?: NotificationEvent;
};

/** Details of the users and groups to receive the notification. */
export type NotificationRecipients = {
  /** Whether the notification should be sent to the issue's assignees. */
  assignee?: boolean;
  /** List of groupIds to receive the notification. */
  groupIds?: (string)[];
  /** List of groups to receive the notification. */
  groups?: (GroupName)[];
  /** Whether the notification should be sent to the issue's reporter. */
  reporter?: boolean;
  /** List of users to receive the notification. */
  users?: (UserDetails)[];
  /** Whether the notification should be sent to the issue's voters. */
  voters?: boolean;
  /** Whether the notification should be sent to the issue's watchers. */
  watchers?: boolean;
  [key: string]: unknown;
};

/** Details of the group membership or permissions needed to receive the notification. */
export type NotificationRecipientsRestrictions = {
  /** List of groupId memberships required to receive the notification. */
  groupIds?: (string)[];
  /** List of group memberships required to receive the notification. */
  groups?: (GroupName)[];
  /** List of permissions required to receive the notification. */
  permissions?: (RestrictedPermission)[];
};

/** Details about a notification scheme. */
export type NotificationScheme = {
  /** The description of the notification scheme. */
  description?: string;
  /** Expand options that include additional notification scheme details in the response. */
  expand?: string;
  /** The ID of the notification scheme. */
  id?: number;
  /** The name of the notification scheme. */
  name?: string;
  /** The notification events and associated recipients. */
  notificationSchemeEvents?: (NotificationSchemeEvent)[];
  /** The list of project IDs associated with the notification scheme. */
  projects?: (number)[];
  /** The scope of the notification scheme. */
  scope?: Scope;
  self?: string;
};

export type NotificationSchemeAndProjectMappingJsonBean = {
  notificationSchemeId?: string;
  projectId?: string;
};

/** Details about a notification scheme event. */
export type NotificationSchemeEvent = {
  event?: NotificationEvent;
  notifications?: (EventNotification)[];
};

/** Details of a notification scheme event. */
export type NotificationSchemeEventDetails = {
  /** The ID of the event. */
  event: NotificationSchemeEventTypeId;
  /** The list of notifications mapped to a specified event. */
  notifications: (NotificationSchemeNotificationDetails)[];
  [key: string]: unknown;
};

/** The event ID to use for reference in the payload */
export type NotificationSchemeEventIdPayload = {
  /** The event ID to use for reference in the payload */
  id?: string;
};

/** The payload for creating a notification scheme event. Defines which notifications should be sent for a specific event */
export type NotificationSchemeEventPayload = {
  event?: NotificationSchemeEventIdPayload;
  /** The configuration for notification recipents */
  notifications?: (NotificationSchemeNotificationDetailsPayload)[];
};

/** The ID of an event that is being mapped to notifications. */
export type NotificationSchemeEventTypeId = {
  /** The ID of the notification scheme event. */
  id: string;
  [key: string]: unknown;
};

/** The ID of a notification scheme. */
export type NotificationSchemeId = {
  /** The ID of a notification scheme. */
  id: string;
  [key: string]: unknown;
};

/** Details of a notification within a notification scheme. */
export type NotificationSchemeNotificationDetails = {
  /** The notification type, e.g `CurrentAssignee`, `Group`, `EmailAddress`. */
  notificationType: string;
  /** The value corresponding to the specified notification type. */
  parameter?: string;
  [key: string]: unknown;
};

/** The configuration for notification recipents */
export type NotificationSchemeNotificationDetailsPayload = {
  /** The type of notification. */
  notificationType?: string;
  /** The parameter of the notification, should be eiither null if not required, or PCRI. */
  parameter?: string;
};

/** The payload for creating a notification scheme. The user has to supply the ID for the default notification scheme. For CMP this is provided in the project payload and should be left empty, for TMP it's provided using this payload */
export type NotificationSchemePayload = {
  /** The description of the notification scheme */
  description?: string;
  /** The name of the notification scheme */
  name?: string;
  /** The events and notifications for the notification scheme */
  notificationSchemeEvents?: (NotificationSchemeEventPayload)[];
  /** The strategy to use when there is a conflict with an existing entity */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
};

export type OldToNewSecurityLevelMappingsBean = {
  /** The new issue security level ID. Providing null will clear the assigned old level from issues. */
  newLevelId: string;
  /** The old issue security level ID. Providing null will remap all issues without any assigned levels. */
  oldLevelId: string;
};

export type OperationMessage = {
  /** The human-readable message that describes the result. */
  message: string;
  /** The status code of the response. */
  statusCode: number;
};

/** Details of the operations that can be performed on the issue. */
export type Operations = {
  /** Details of the link groups defining issue operations. */
  linkGroups?: (LinkGroup)[];
  [key: string]: unknown;
};

/** An ordered list of custom field option IDs and information on where to move them. */
export type OrderOfCustomFieldOptions = {
  /** The ID of the custom field option or cascading option to place the moved options after. Required if `position` isn't provided. */
  after?: string;
  /** A list of IDs of custom field options to move. The order of the custom field option IDs in the list is the order they are given after the move. The list must contain custom field options or cascading options, but not both. */
  customFieldOptionIds: (string)[];
  /** The position the custom field options should be moved to. Required if `after` isn't provided. */
  position?: "First" | "Last";
};

/** An ordered list of issue type IDs and information about where to move them. */
export type OrderOfIssueTypes = {
  /** The ID of the issue type to place the moved issue types after. Required if `position` isn't provided. */
  after?: string;
  /** A list of the issue type IDs to move. The order of the issue type IDs in the list is the order they are given after the move. */
  issueTypeIds: (string)[];
  /** The position the issue types should be moved to. Required if `after` isn't provided. */
  position?: "First" | "Last";
};

/** A page of items. */
export type PageBean2ComponentJsonBean = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ComponentJsonBean)[];
};

/** A page of items. */
export type PageBean2FieldAssociationSchemeFieldSearchResult = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldAssociationSchemeFieldSearchResult)[];
};

/** A page of items. */
export type PageBean2FieldAssociationSchemeProjectSearchResult = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldAssociationSchemeProjectSearchResult)[];
};

/** A page of items. */
export type PageBean2GetFieldAssociationSchemeResponse = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (GetFieldAssociationSchemeResponse)[];
};

/** A page of items. */
export type PageBean2GetProjectsWithFieldSchemesResponse = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (GetProjectsWithFieldSchemesResponse)[];
};

/** A page of items. */
export type PageBean2JqlFunctionPrecomputationBean = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (JqlFunctionPrecomputationBean)[];
};

/** A page of items. */
export type PageBean2ProjectFieldBean = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ProjectFieldBean)[];
};

/** A page of items. */
export type PageBeanBulkContextualConfiguration = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (BulkContextualConfiguration)[];
};

/** A page of items. */
export type PageBeanChangelog = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Changelog)[];
};

/** A page of items. */
export type PageBeanComment = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Comment)[];
};

/** A page of items. */
export type PageBeanComponentWithIssueCount = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ComponentWithIssueCount)[];
};

/** A page of items. */
export type PageBeanContext = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Context)[];
};

/** A page of items. */
export type PageBeanContextForProjectAndIssueType = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ContextForProjectAndIssueType)[];
};

/** A page of items. */
export type PageBeanContextualConfiguration = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ContextualConfiguration)[];
};

/** A page of items. */
export type PageBeanCustomFieldContext = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (CustomFieldContext)[];
};

/** A page of items. */
export type PageBeanCustomFieldContextDefaultValue = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (CustomFieldContextDefaultValue)[];
};

/** A page of items. */
export type PageBeanCustomFieldContextOption = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (CustomFieldContextOption)[];
};

/** A page of items. */
export type PageBeanCustomFieldContextProjectMapping = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (CustomFieldContextProjectMapping)[];
};

/** A page of items. */
export type PageBeanDashboard = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Dashboard)[];
};

/** A page of items. */
export type PageBeanField = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Field)[];
};

/** A page of items. */
export type PageBeanFieldConfigurationDetails = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldConfigurationDetails)[];
};

/** A page of items. */
export type PageBeanFieldConfigurationIssueTypeItem = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldConfigurationIssueTypeItem)[];
};

/** A page of items. */
export type PageBeanFieldConfigurationItem = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldConfigurationItem)[];
};

/** A page of items. */
export type PageBeanFieldConfigurationScheme = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldConfigurationScheme)[];
};

/** A page of items. */
export type PageBeanFieldConfigurationSchemeProjects = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldConfigurationSchemeProjects)[];
};

/** A page of items. */
export type PageBeanFieldProjectAssociation = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FieldProjectAssociation)[];
};

/** A page of items. */
export type PageBeanFilterDetails = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (FilterDetails)[];
};

/** A page of items. */
export type PageBeanGroupDetails = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (GroupDetails)[];
};

/** A page of items. */
export type PageBeanIssueFieldOption = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueFieldOption)[];
};

/** A page of items. */
export type PageBeanIssueSecurityLevelMember = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueSecurityLevelMember)[];
};

/** A page of items. */
export type PageBeanIssueSecuritySchemeToProjectMapping = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueSecuritySchemeToProjectMapping)[];
};

/** A page of items. */
export type PageBeanIssueTypeScheme = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeScheme)[];
};

/** A page of items. */
export type PageBeanIssueTypeSchemeMapping = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeSchemeMapping)[];
};

/** A page of items. */
export type PageBeanIssueTypeSchemeProjects = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeSchemeProjects)[];
};

/** A page of items. */
export type PageBeanIssueTypeScreenScheme = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeScreenScheme)[];
};

/** A page of items. */
export type PageBeanIssueTypeScreenSchemeItem = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeScreenSchemeItem)[];
};

/** A page of items. */
export type PageBeanIssueTypeScreenSchemesProjects = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeScreenSchemesProjects)[];
};

/** A page of items. */
export type PageBeanIssueTypeToContextMapping = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (IssueTypeToContextMapping)[];
};

/** A page of items. */
export type PageBeanNotificationScheme = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (NotificationScheme)[];
};

/** A page of items. */
export type PageBeanNotificationSchemeAndProjectMappingJsonBean = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (NotificationSchemeAndProjectMappingJsonBean)[];
};

/** A page of items. */
export type PageBeanPriority = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Priority)[];
};

/** A page of items. */
export type PageBeanPrioritySchemeWithPaginatedPrioritiesAndProjects = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (PrioritySchemeWithPaginatedPrioritiesAndProjects)[];
};

/** A page of items. */
export type PageBeanPriorityWithSequence = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (PriorityWithSequence)[];
};

/** A page of items. */
export type PageBeanProject = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Project)[];
};

/** A page of items. */
export type PageBeanProjectDetails = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ProjectDetails)[];
};

/** A page of items. */
export type PageBeanResolutionJsonBean = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ResolutionJsonBean)[];
};

/** A page of items. */
export type PageBeanScreen = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Screen)[];
};

/** A page of items. */
export type PageBeanScreenScheme = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ScreenScheme)[];
};

/** A page of items. */
export type PageBeanScreenWithTab = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (ScreenWithTab)[];
};

/** A page of items. */
export type PageBeanSecurityLevel = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (SecurityLevel)[];
};

/** A page of items. */
export type PageBeanSecurityLevelMember = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (SecurityLevelMember)[];
};

/** A page of items. */
export type PageBeanSecuritySchemeWithProjects = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (SecuritySchemeWithProjects)[];
};

/** A page of items. */
export type PageBeanString = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (string)[];
};

/** A page of items. */
export type PageBeanUiModificationDetails = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (UiModificationDetails)[];
};

/** A page of items. */
export type PageBeanUser = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (User)[];
};

/** A page of items. */
export type PageBeanUserDetails = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (UserDetails)[];
};

/** A page of items. */
export type PageBeanUserKey = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (UserKey)[];
};

/** A page of items. */
export type PageBeanVersion = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Version)[];
};

/** A page of items. */
export type PageBeanWebhook = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Webhook)[];
};

/** A page of items. */
export type PageBeanWorkflow = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (Workflow)[];
};

/** A page of items. */
export type PageBeanWorkflowScheme = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (WorkflowScheme)[];
};

/** A page of items. */
export type PageBeanWorkflowTransitionRules = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  /** The list of items. */
  values?: (WorkflowTransitionRules)[];
};

/** A page of changelogs. */
export type PageOfChangelogs = {
  /** The list of changelogs. */
  histories?: (Changelog)[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
};

/** A page of comments. */
export type PageOfComments = {
  /** The list of comments. */
  comments?: (Comment)[];
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The number of items returned. */
  total?: number;
  [key: string]: unknown;
};

/** A page of CreateMetaIssueType with Field. */
export type PageOfCreateMetaIssueTypeWithField = {
  /** The collection of FieldCreateMetaBeans. */
  fields?: (FieldCreateMetadata)[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  results?: (FieldCreateMetadata)[];
  /** The index of the first item returned. */
  startAt?: number;
  /** The total number of items in all pages. */
  total?: number;
  [key: string]: unknown;
};

/** A page of CreateMetaIssueTypes. */
export type PageOfCreateMetaIssueTypes = {
  createMetaIssueType?: (IssueTypeIssueCreateMetadata)[];
  /** The list of CreateMetaIssueType. */
  issueTypes?: (IssueTypeIssueCreateMetadata)[];
  /** The maximum number of items to return per page. */
  maxResults?: number;
  /** The index of the first item returned. */
  startAt?: number;
  /** The total number of items in all pages. */
  total?: number;
  [key: string]: unknown;
};

/** A page containing dashboard details. */
export type PageOfDashboards = {
  /** List of dashboards. */
  dashboards?: (Dashboard)[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The URL of the next page of results, if any. */
  next?: string;
  /** The URL of the previous page of results, if any. */
  prev?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
};

export type PageOfStatuses = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** The URL of the next page of results, if any. */
  nextPage?: string;
  /** The URL of this page. */
  self?: string;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** Number of items that satisfy the search. */
  total?: number;
  /** The list of items. */
  values?: (JiraStatus)[];
};

/** Paginated list of worklog details */
export type PageOfWorklogs = {
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
  /** List of worklogs. */
  worklogs?: (Worklog)[];
  [key: string]: unknown;
};

export type PageWithCursorGetPlanResponseForPage = {
  cursor?: string;
  last?: boolean;
  nextPageCursor?: string;
  size?: number;
  total?: number;
  values?: (GetPlanResponseForPage)[];
};

export type PageWithCursorGetTeamResponseForPage = {
  cursor?: string;
  last?: boolean;
  nextPageCursor?: string;
  size?: number;
  total?: number;
  values?: (GetTeamResponseForPage)[];
};

/** A paged list. To access additional details append `[start-index:end-index]` to the expand request. For example, `?expand=sharedUsers[10:40]` returns a list starting at item 10 and finishing at item 40. */
export type PagedListUserDetailsApplicationUser = {
  /** The index of the last item returned on the page. */
  "end-index"?: number;
  /** The list of items. */
  items?: (UserDetails)[];
  /** The maximum number of results that could be on the page. */
  "max-results"?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  "start-index"?: number;
};

export type PaginatedResponseComment = {
  maxResults?: number;
  results?: (Comment)[];
  startAt?: number;
  total?: number;
};

export type PaginatedResponseFieldCreateMetadata = {
  maxResults?: number;
  results?: (FieldCreateMetadata)[];
  startAt?: number;
  total?: number;
};

export type PaginatedResponseIssueTypeIssueCreateMetadata = {
  maxResults?: number;
  results?: (IssueTypeIssueCreateMetadata)[];
  startAt?: number;
  total?: number;
};

export type ParameterRemovalDetails = {
  /** Set of parameter names to remove */
  parameters?: (string)[];
  /** ID of the field scheme */
  schemeId?: number;
  /** Set of work type (issue type) IDs */
  workTypeIds?: (number)[];
};

/** A list of parsed JQL queries. */
export type ParsedJqlQueries = {
  /** A list of parsed JQL queries. */
  queries: (ParsedJqlQuery)[];
};

/** Details of a parsed JQL query. */
export type ParsedJqlQuery = {
  /** The list of syntax or validation errors. */
  errors?: (string)[];
  /** The JQL query that was parsed and validated. */
  query: string;
  /** The syntax tree of the query. Empty if the query was invalid. */
  structure?: JqlQuery;
  /** The list of warning messages */
  warnings?: (string)[];
};

/** Details for permissions of shareable entities */
export type PermissionDetails = {
  /** The edit permissions for the shareable entities. */
  editPermissions: (SharePermission)[];
  /** The share permissions for the shareable entities. */
  sharePermissions: (SharePermission)[];
};

/** Details about a permission granted to a user or group. */
export type PermissionGrant = {
  /** The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information. */
  holder?: PermissionHolder;
  /** The ID of the permission granted details. */
  id?: number;
  /** The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See [Built-in permissions](../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions. */
  permission?: string;
  /** The URL of the permission granted details. */
  self?: string;
  [key: string]: unknown;
};

/** List of permission grants */
export type PermissionGrantDto = {
  applicationAccess?: (string)[];
  groupCustomFields?: (ProjectCreateResourceIdentifier)[];
  groups?: (ProjectCreateResourceIdentifier)[];
  permissionKeys?: (string)[];
  projectRoles?: (ProjectCreateResourceIdentifier)[];
  specialGrants?: (string)[];
  userCustomFields?: (ProjectCreateResourceIdentifier)[];
  users?: (ProjectCreateResourceIdentifier)[];
};

/** List of permission grants. */
export type PermissionGrants = {
  /** Expand options that include additional permission grant details in the response. */
  expand?: string;
  /** Permission grants list. */
  permissions?: (PermissionGrant)[];
};

/** Details of a user, group, field, or project role that holds a permission. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information. */
export type PermissionHolder = {
  /** Expand options that include additional permission holder details in the response. */
  expand?: string;
  /** As a group's name can change, use of `value` is recommended. The identifier associated withthe `type` value that defines the holder of the permission. */
  parameter?: string;
  /** The type of permission holder. */
  type: string;
  /** The identifier associated with the `type` value that defines the holder of the permission. */
  value?: string;
};

/** The payload to create a permission scheme */
export type PermissionPayloadDto = {
  /** Configuration to generate addon role. Default is false if null. Only applies to GLOBAL-scoped permission scheme */
  addAddonRole?: boolean;
  /** The description of the permission scheme */
  description?: string;
  /** List of permission grants */
  grants?: (PermissionGrantDto)[];
  /** The name of the permission scheme */
  name?: string;
  /** The strategy to use when there is a conflict with an existing permission scheme. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters; NEW - If the entity exist, try and create a new one with a different name */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
};

/** Details of a permission scheme. */
export type PermissionScheme = {
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
};

/** List of all permission schemes. */
export type PermissionSchemes = {
  /** Permission schemes list. */
  permissionSchemes?: (PermissionScheme)[];
};

/** Details about permissions. */
export type Permissions = {
  /** List of permissions. */
  permissions?: { [key: string]: UserPermission | undefined };
};

export type PermissionsKeysBean = {
  /** A list of permission keys. */
  permissions: (string)[];
};

/** A list of projects in which a user is granted permissions. */
export type PermittedProjects = {
  /** A list of projects. */
  projects?: (ProjectIdentifierBean)[];
};

/** Condition group configuration for workflow transitions. */
export type PreviewConditionGroupConfiguration = {
  /** The nested conditions of the condition group. */
  conditionGroups?: (PreviewConditionGroupConfiguration)[];
  /** The rules for this condition. */
  conditions?: (PreviewRuleConfiguration)[];
  /** Determines how the conditions in the group are evaluated. Accepts either `ANY` or `ALL`. If `ANY` is used, at least one condition in the group must be true for the group to evaluate to true. If `ALL` is used, all conditions in the group must be true for the group to evaluate to true. */
  operation?: "ANY" | "ALL";
};

/** Rule configuration for workflow transitions. */
export type PreviewRuleConfiguration = {
  /** A transient identifier for this element, unique within this response but not guaranteed to stable across requests. */
  id?: string;
  /** The parameters of the rule. */
  parameters?: { [key: string]: string | undefined };
  /** The rule key of the rule. */
  ruleKey?: string;
};

/** Trigger configuration for workflow transitions. */
export type PreviewTrigger = {
  /** The ID of the trigger. */
  id?: string;
  /** The key of the trigger rule. */
  ruleKey?: string;
};

/** An issue priority. */
export type Priority = {
  /** The avatarId of the avatar for the issue priority. This parameter is nullable and when set, this avatar references the universal avatar APIs. */
  avatarId?: number;
  /** The description of the issue priority. */
  description?: string;
  /** The URL of the icon for the issue priority. */
  iconUrl?: string;
  /** The ID of the issue priority. */
  id?: string;
  /** Whether this priority is the default. */
  isDefault?: boolean;
  /** The name of the issue priority. */
  name?: string;
  /** Priority schemes associated with the issue priority. */
  schemes?: ExpandPrioritySchemePage;
  /** The URL of the issue priority. */
  self?: string;
  /** The color used to indicate the issue priority. */
  statusColor?: string;
  [key: string]: unknown;
};

/** The ID of an issue priority. */
export type PriorityId = {
  /** The ID of the issue priority. */
  id: string;
  [key: string]: unknown;
};

/** Mapping of issue priorities for changes in priority schemes. */
export type PriorityMapping = {
  /** The mapping of priorities for issues being migrated **into** this priority scheme. Key is the old priority ID, value is the new priority ID (must exist in this priority scheme).  E.g. The current priority scheme has priority ID `10001`. Issues with priority ID `10000` are being migrated into this priority scheme will need mapping to new priorities. The `in` mapping would be `{"10000": 10001}`. */
  in?: { [key: string]: number | undefined };
  /** The mapping of priorities for issues being migrated **out of** this priority scheme. Key is the old priority ID (must exist in this priority scheme), value is the new priority ID (must exist in the default priority scheme). Required for updating an existing priority scheme. Not used when creating a new priority scheme.  E.g. The current priority scheme has priority ID `10001`. Issues with priority ID `10001` are being migrated out of this priority scheme will need mapping to new priorities. The `out` mapping would be `{"10001": 10000}`. */
  out?: { [key: string]: number | undefined };
};

export type PrioritySchemeChangesWithoutMappings = {
  /** Affected entity ids. */
  ids: (number)[];
};

/** The ID of a priority scheme. */
export type PrioritySchemeId = {
  /** The ID of the priority scheme. */
  id?: string;
  /** The in-progress issue migration task. */
  task?: TaskProgressBeanJsonNode;
};

/** A priority scheme with paginated priorities and projects. */
export type PrioritySchemeWithPaginatedPrioritiesAndProjects = {
  default?: boolean;
  /** The ID of the default issue priority. */
  defaultPriorityId?: string;
  /** The description of the priority scheme */
  description?: string;
  /** The ID of the priority scheme. */
  id: string;
  isDefault?: boolean;
  /** The name of the priority scheme */
  name: string;
  /** The paginated list of priorities. */
  priorities?: PageBeanPriorityWithSequence;
  /** The paginated list of projects. */
  projects?: PageBeanProjectDetails;
  /** The URL of the priority scheme. */
  self?: string;
  [key: string]: unknown;
};

/** An issue priority with sequence information. */
export type PriorityWithSequence = {
  /** The description of the issue priority. */
  description?: string;
  /** The URL of the icon for the issue priority. */
  iconUrl?: string;
  /** The ID of the issue priority. */
  id?: string;
  /** Whether this priority is the default. */
  isDefault?: boolean;
  /** The name of the issue priority. */
  name?: string;
  /** The URL of the issue priority. */
  self?: string;
  /** The sequence of the issue priority. */
  sequence?: string;
  /** The color used to indicate the issue priority. */
  statusColor?: string;
};

/** Details about a project. */
export type Project = {
  /** Whether the project is archived. */
  archived?: boolean;
  /** The user who archived the project. */
  archivedBy?: User;
  /** The date when the project was archived. */
  archivedDate?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: "PROJECT_LEAD" | "UNASSIGNED";
  /** The URLs of the project's avatars. */
  avatarUrls?: AvatarUrlsBean;
  /** List of the components contained in the project. */
  components?: (ProjectComponent)[];
  /** Whether the project is marked as deleted. */
  deleted?: boolean;
  /** The user who marked the project as deleted. */
  deletedBy?: User;
  /** The date when the project was marked as deleted. */
  deletedDate?: string;
  /** A brief description of the project. */
  description?: string;
  /** An email address associated with the project. */
  email?: string;
  /** Expand options that include additional project details in the response. */
  expand?: string;
  /** Whether the project is selected as a favorite. */
  favourite?: boolean;
  /** The ID of the project. */
  id?: string;
  /** Insights about the project. */
  insight?: ProjectInsight;
  /** Whether the project is private from the user's perspective. This means the user can't see the project or any associated issues. */
  isPrivate?: boolean;
  /** The issue type hierarchy for the project. */
  issueTypeHierarchy?: Hierarchy;
  /** List of the issue types available in the project. */
  issueTypes?: (IssueTypeDetails)[];
  /** The key of the project. */
  key?: string;
  /** The project landing page info. */
  landingPageInfo?: ProjectLandingPageInfo;
  /** The username of the project lead. */
  lead?: User;
  /** The name of the project. */
  name?: string;
  /** User permissions on the project */
  permissions?: ProjectPermissions;
  /** The category the project belongs to. */
  projectCategory?: ProjectCategory;
  /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. */
  projectTypeKey?: "software" | "service_desk" | "business";
  /** Map of project properties */
  properties?: { [key: string]: unknown | undefined };
  /** The date when the project is deleted permanently. */
  retentionTillDate?: string;
  /** The name and self URL for each role defined in the project. For more information, see [Create project role](#api-rest-api-3-role-post). */
  roles?: { [key: string]: string | undefined };
  /** The URL of the project details. */
  self?: string;
  /** Whether the project is simplified. */
  simplified?: boolean;
  /** The type of the project. */
  style?: "classic" | "next-gen";
  /** A link to information about this project, such as project documentation. */
  url?: string;
  /** Unique ID for next-gen projects. */
  uuid?: string;
  /** The versions defined in the project. For more information, see [Create version](#api-rest-api-3-version-post). */
  versions?: (Version)[];
};

/** A project and issueType ID pair that identifies a status mapping. */
export type ProjectAndIssueTypePair = {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the project. */
  projectId: string;
};

export type ProjectArchetype = {
  realType?: "BUSINESS" | "SOFTWARE" | "PRODUCT_DISCOVERY" | "SERVICE_DESK" | "CUSTOMER_SERVICE" | "OPS";
  style?: "classic" | "next-gen";
  type?: "BUSINESS" | "SOFTWARE" | "PRODUCT_DISCOVERY" | "SERVICE_DESK" | "CUSTOMER_SERVICE" | "OPS";
};

/** List of project avatars. */
export type ProjectAvatars = {
  /** List of avatars added to Jira. These avatars may be deleted. */
  custom?: (Avatar)[];
  /** List of avatars included with Jira. These avatars cannot be deleted. */
  system?: (Avatar)[];
};

/** A project category. */
export type ProjectCategory = {
  /** The description of the project category. */
  description?: string;
  /** The ID of the project category. */
  id?: string;
  /** The name of the project category. Required on create, optional on update. */
  name?: string;
  /** The URL of the project category. */
  self?: string;
};

/** Details about a project component. */
export type ProjectComponent = {
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
};

/** Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI format is defined as follows: pcri:\[entityType\]:\[type\]:\[entityId\] entityType - the type of an entity, e.g. status, role, workflow type - PCRI type, either `id` - The ID of an entity that already exists in the target site, or `ref` - A unique reference to an entity that is being created entityId - entity identifier, if type is `id` - must be an existing entity ID that exists in the Jira site, if `ref` - must be unique across all entities in the scope of this project template creation */
export type ProjectCreateResourceIdentifier = {
  anID?: boolean;
  areference?: boolean;
  entityId?: string;
  entityType?: string;
  id?: string;
  type?: "id" | "ref";
};

/** Request to create a project using a custom template */
export type ProjectCustomTemplateCreateRequestDto = {
  details?: CustomTemplatesProjectDetails;
  template?: CustomTemplateRequestDto;
};

/** Details about data policies for a list of projects. */
export type ProjectDataPolicies = {
  /** List of projects with data policies. */
  projectDataPolicies?: (ProjectWithDataPolicy)[];
};

/** Details about data policy. */
export type ProjectDataPolicy = {
  /** Whether the project contains any content inaccessible to the requesting application. */
  anyContentBlocked?: boolean;
};

/** Details about a project. */
export type ProjectDetails = {
  /** The URLs of the project's avatars. */
  avatarUrls?: AvatarUrlsBean;
  /** The ID of the project. */
  id?: string;
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The category the project belongs to. */
  projectCategory?: UpdatedProjectCategory;
  /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. */
  projectTypeKey?: "software" | "service_desk" | "business";
  /** The URL of the project details. */
  self?: string;
  /** Whether or not the project is simplified. */
  simplified?: boolean;
};

/** A project's sender email address. */
export type ProjectEmailAddress = {
  /** The email address. */
  emailAddress?: string;
  /** When using a custom domain, the status of the email address. */
  emailAddressStatus?: (string)[];
};

/** Details of a project feature. */
export type ProjectFeature = {
  /** The key of the feature. */
  feature?: string;
  /** URI for the image representing the feature. */
  imageUri?: string;
  /** Localized display description for the feature. */
  localisedDescription?: string;
  /** Localized display name for the feature. */
  localisedName?: string;
  /** List of keys of the features required to enable the feature. */
  prerequisites?: (string)[];
  /** The ID of the project. */
  projectId?: number;
  /** The state of the feature. When updating the state of a feature, only ENABLED and DISABLED are supported. Responses can contain all values */
  state?: "ENABLED" | "DISABLED" | "COMING_SOON";
  /** Whether the state of the feature can be updated. */
  toggleLocked?: boolean;
};

/** Details of the feature state. */
export type ProjectFeatureState = {
  /** The feature state. */
  state?: "ENABLED" | "DISABLED" | "COMING_SOON";
};

export type ProjectFieldBean = {
  description?: string;
  fieldId?: string;
  isRequired?: boolean;
  projectId?: number;
  workTypeId?: number;
};

/** Project ID details. */
export type ProjectId = {
  /** The ID of the project. */
  id: string;
};

export type ProjectIdAssociationContext = AssociationContextObject & { identifier?: number };

/** The identifiers for a project. */
export type ProjectIdentifierBean = {
  /** The ID of the project. */
  id?: number;
  /** The key of the project. */
  key?: string;
};

/** Identifiers for a project. */
export type ProjectIdentifiers = {
  /** The ID of the created project. */
  id: number;
  /** The key of the created project. */
  key: string;
  /** The URL of the created project. */
  self: string;
};

/** A list of project IDs. */
export type ProjectIds = {
  /** The IDs of projects. */
  projectIds: (string)[];
};

/** Additional details about a project. */
export type ProjectInsight = {
  /** The last issue update time. */
  lastIssueUpdateTime?: string;
  /** Total issue count. */
  totalIssueCount?: number;
};

/** Details of the issue creation metadata for a project. */
export type ProjectIssueCreateMetadata = {
  /** List of the project's avatars, returning the avatar size and associated URL. */
  avatarUrls?: AvatarUrlsBean;
  /** Expand options that include additional project issue create metadata details in the response. */
  expand?: string;
  /** The ID of the project. */
  id?: string;
  /** List of the issue types supported by the project. */
  issuetypes?: (IssueTypeIssueCreateMetadata)[];
  /** The key of the project. */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** The URL of the project. */
  self?: string;
};

/** List of issue level security items in a project. */
export type ProjectIssueSecurityLevels = {
  /** Issue level security items list. */
  levels: (SecurityLevel)[];
};

/** The hierarchy of issue types within a project. */
export type ProjectIssueTypeHierarchy = {
  /** Details of an issue type hierarchy level. */
  hierarchy?: (ProjectIssueTypesHierarchyLevel)[];
  /** The ID of the project. */
  projectId?: number;
};

/** The project and issue type mapping. */
export type ProjectIssueTypeMapping = {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the project. */
  projectId: string;
};

/** The project and issue type mappings. */
export type ProjectIssueTypeMappings = {
  /** The project and issue type mappings. */
  mappings: (ProjectIssueTypeMapping)[];
};

/** Project and issue type context for workflow queries made using issue types. */
export type ProjectIssueTypeQueryContext = {
  /** The set of issue type IDs. */
  issueTypes?: (string)[];
  /** The ID of the project. */
  project?: string;
};

/** Details of an issue type hierarchy level. */
export type ProjectIssueTypesHierarchyLevel = {
  /** The ID of the issue type hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  entityId?: string;
  /** The list of issue types in the hierarchy level. */
  issueTypes?: (IssueTypeInfo)[];
  /** The level of the issue type hierarchy level. */
  level?: number;
  /** The name of the issue type hierarchy level. */
  name?: string;
};

export type ProjectLandingPageInfo = {
  attributes?: { [key: string]: string | undefined };
  boardId?: number;
  boardName?: string;
  projectKey?: string;
  projectType?: string;
  queueCategory?: string;
  queueId?: number;
  queueName?: string;
  simpleBoard?: boolean;
  simplified?: boolean;
  url?: string;
};

/** The payload for creating a project */
export type ProjectPayload = {
  fieldLayoutSchemeId?: ProjectCreateResourceIdentifier;
  issueSecuritySchemeId?: ProjectCreateResourceIdentifier;
  issueTypeSchemeId?: ProjectCreateResourceIdentifier;
  issueTypeScreenSchemeId?: ProjectCreateResourceIdentifier;
  notificationSchemeId?: ProjectCreateResourceIdentifier;
  pcri?: ProjectCreateResourceIdentifier;
  permissionSchemeId?: ProjectCreateResourceIdentifier;
  /** The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which defines the application-specific feature set. If you don't specify the project template you have to specify the project type. */
  projectTypeKey?: "software" | "business" | "service_desk" | "product_discovery";
  workflowSchemeId?: ProjectCreateResourceIdentifier;
};

/** Permissions which a user has on a project. */
export type ProjectPermissions = {
  /** Whether the logged user can edit the project. */
  canEdit?: boolean;
};

/** The list of projects to pin or unpin the issue panel to or from. */
export type ProjectPinAction = {
  /** The action to perform: PIN or UNPIN. */
  action: "PIN" | "UNPIN";
  /** The project ID or key. */
  projectIdOrKey: string;
};

/** Details about the roles in a project. */
export type ProjectRole = {
  /** The list of users who act in this role. */
  actors?: (RoleActor)[];
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  /** Whether the calling user is part of this role. */
  currentUserRole?: boolean;
  /** Whether this role is the default role for the project */
  default?: boolean;
  /** The description of the project role. */
  description?: string;
  /** The ID of the project role. */
  id?: number;
  /** The name of the project role. */
  name?: string;
  /** Whether the roles are configurable for this project. */
  roleConfigurable?: boolean;
  /** The scope of the role. Indicated for roles associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO). */
  scope?: Scope;
  /** The URL the project role details. */
  self?: string;
  /** The translated name of the project role. */
  translatedName?: string;
};

export type ProjectRoleActorsUpdateBean = {
  /** The actors to add to the project role.  Add groups using:   *  `atlassian-group-role-actor` and a list of group names.  *  `atlassian-group-role-actor-id` and a list of group IDs.  As a group's name can change, use of `atlassian-group-role-actor-id` is recommended. For example, `"atlassian-group-role-actor-id":["eef79f81-0b89-4fca-a736-4be531a10869","77f6ab39-e755-4570-a6ae-2d7a8df0bcb8"]`.  Add users using `atlassian-user-role-actor` and a list of account IDs. For example, `"atlassian-user-role-actor":["12345678-9abc-def1-2345-6789abcdef12", "abcdef12-3456-789a-bcde-f123456789ab"]`. */
  categorisedActors?: { [key: string]: (string)[] | undefined };
  /** The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs. */
  id?: number;
};

/** Details about a project role. */
export type ProjectRoleDetails = {
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  /** Whether this role is the default role for the project. */
  default?: boolean;
  /** The description of the project role. */
  description?: string;
  /** The ID of the project role. */
  id?: number;
  /** The name of the project role. */
  name?: string;
  /** Whether the roles are configurable for this project. */
  roleConfigurable?: boolean;
  /** The scope of the role. Indicated for roles associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO). */
  scope?: Scope;
  /** The URL the project role details. */
  self?: string;
  /** The translated name of the project role. */
  translatedName?: string;
  /** The type of the project role. This is "DEFAULT" or "GUEST\_ROLE". */
  type?: "DEFAULT" | "GUEST_ROLE";
};

/** Details of the group associated with the role. */
export type ProjectRoleGroup = {
  /** The display name of the group. */
  displayName?: string;
  /** The ID of the group. */
  groupId?: string;
  /** The name of the group. As a group's name can change, use of `groupId` is recommended to identify the group. */
  name?: string;
};

/** Details of the user associated with the role. */
export type ProjectRoleUser = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown* if the record is deleted and corrupted, for example, as the result of a server import. */
  accountId?: string;
};

export type ProjectScopeBean = {
  /** Defines the behavior of the option in the project.If notSelectable is set, the option cannot be set as the field's value. This is useful for archiving an option that has previously been selected but shouldn't be used anymore.If defaultValue is set, the option is selected by default. */
  attributes?: ("notSelectable" | "defaultValue")[];
  /** The ID of the project that the option's behavior applies to. */
  id?: number;
};

export type ProjectTemplateKey = {
  key?: string;
  uuid?: string;
};

export type ProjectTemplateModel = {
  archetype?: ProjectArchetype;
  defaultBoardView?: string;
  description?: string;
  liveTemplateProjectIdReference?: number;
  name?: string;
  projectTemplateKey?: ProjectTemplateKey;
  snapshotTemplate?: { [key: string]: unknown | undefined };
  templateGenerationOptions?: CustomTemplateOptions;
  type?: "LIVE" | "SNAPSHOT";
};

/** Details about a project type. */
export type ProjectType = {
  /** The color of the project type. */
  color?: string;
  /** The key of the project type's description. */
  descriptionI18nKey?: string;
  /** The formatted key of the project type. */
  formattedKey?: string;
  /** The icon of the project type. */
  icon?: string;
  /** The key of the project type. */
  key?: string;
};

/** The project. */
export type ProjectUsage = {
  /** The project ID. */
  id?: string;
};

/** A page of projects. */
export type ProjectUsagePage = {
  /** Page token for the next page of project usages. */
  nextPageToken?: string;
  /** The list of projects. */
  values?: (ProjectUsage)[];
};

/** Details about data policies for a project. */
export type ProjectWithDataPolicy = {
  /** Data policy. */
  dataPolicy?: ProjectDataPolicy;
  /** The project ID. */
  id?: number;
};

/** Property key details. */
export type PropertyKey = {
  /** The key of the property. */
  key?: string;
  /** The URL of the property. */
  self?: string;
};

/** List of property keys. */
export type PropertyKeys = {
  /** Property key details. */
  keys?: (PropertyKey)[];
};

/** Details about the status mappings for publishing a draft workflow scheme. */
export type PublishDraftWorkflowScheme = {
  /** Mappings of statuses to new statuses for issue types. */
  statusMappings?: (StatusMapping)[];
};

/** Properties that identify a published workflow. */
export type PublishedWorkflowId = {
  /** The entity ID of the workflow. */
  entityId?: string;
  /** The name of the workflow. */
  name: string;
};

/** The payload for defining quick filters */
export type QuickFilterPayload = {
  /** The description of the quick filter */
  description?: string;
  /** The jql query for the quick filter */
  jqlQuery?: string;
  /** The name of the quick filter */
  name?: string;
};

export type RedactionJobStatusResponse = {
  bulkRedactionResponse?: BulkRedactionResponse;
  jobStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
};

/** Represents the position of the redaction */
export type RedactionPosition = {
  /** The ADF pointer indicating the position of the text to be redacted. This is only required when redacting from rich text(ADF) fields. For plain text fields, this field can be omitted. */
  adfPointer?: string;
  /** The text which will be redacted, encoded using SHA256 hash and Base64 digest */
  expectedText: string;
  /** The start index(inclusive) for the redaction in specified content */
  from: number;
  /** The ending index(exclusive) for the redaction in specified content */
  to: number;
};

/** ID of a registered webhook or error messages explaining why a webhook wasn't registered. */
export type RegisteredWebhook = {
  /** The ID of the webhook. Returned if the webhook is created. */
  createdWebhookId?: number;
  /** Error messages specifying why the webhook creation failed. */
  errors?: (string)[];
};

/** Details of an issue remote link. */
export type RemoteIssueLink = {
  /** Details of the remote application the linked item is in. */
  application?: Application;
  /** The global ID of the link, such as the ID of the item on the remote system. */
  globalId?: string;
  /** The ID of the link. */
  id?: number;
  /** Details of the item linked to. */
  object?: RemoteObject;
  /** Description of the relationship between the issue and the linked item. */
  relationship?: string;
  /** The URL of the link. */
  self?: string;
};

/** Details of the identifiers for a created or updated remote issue link. */
export type RemoteIssueLinkIdentifies = {
  /** The ID of the remote issue link, such as the ID of the item on the remote system. */
  id?: number;
  /** The URL of the remote issue link. */
  self?: string;
};

/** Details of a remote issue link. */
export type RemoteIssueLinkRequest = {
  /** Details of the remote application the linked item is in. For example, trello. */
  application?: Application;
  /** An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence would consist of the app ID and page ID, like this: `appId=456&pageId=123`.  Setting this field enables the remote issue link details to be updated or deleted using remote system and item details as the record identifier, rather than using the record's Jira ID.  The maximum length is 255 characters. */
  globalId?: string;
  /** Details of the item linked to. */
  object: RemoteObject;
  /** Description of the relationship between the issue and the linked item. If not set, the relationship description "links to" is used in Jira. */
  relationship?: string;
  [key: string]: unknown;
};

/** The linked item. */
export type RemoteObject = {
  /** Details of the icon for the item. If no icon is defined, the default link icon is used in Jira. */
  icon?: Icon;
  /** The status of the item. */
  status?: Status;
  /** The summary details of the item. */
  summary?: string;
  /** The title of the item. */
  title: string;
  /** The URL of the item. */
  url: string;
  [key: string]: unknown;
};

/** Request item for removing field associations. */
export type RemoveFieldAssociationsRequestItem = {
  /** Set of scheme IDs from which to remove field associations */
  schemeIds: (number)[];
};

/** Result of remove field parameters operation. */
export type RemoveFieldParametersResult = {
  results?: (SuccessOrErrorResults)[];
};

/** Error during remove field parameters operation. */
export type RemoveFieldParametersResultError = {
  code?: string;
  message?: string;
};

export type RemoveOptionFromIssuesResult = {
  /** A collection of errors related to unchanged issues. The collection size is limited, which means not all errors may be returned. */
  errors?: SimpleErrorCollection;
  /** The IDs of the modified issues. */
  modifiedIssues?: (number)[];
  /** The IDs of the unchanged issues, those issues where errors prevent modification. */
  unmodifiedIssues?: (number)[];
};

/** Change the order of issue priorities. */
export type ReorderIssuePriorities = {
  /** The ID of the priority. Required if `position` isn't provided. */
  after?: string;
  /** The list of issue IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: (string)[];
  /** The position for issue priorities to be moved to. Required if `after` isn't provided. */
  position?: string;
};

/** Change the order of issue resolutions. */
export type ReorderIssueResolutionsRequest = {
  /** The ID of the resolution. Required if `position` isn't provided. */
  after?: string;
  /** The list of resolution IDs to be reordered. Cannot contain duplicates nor after ID. */
  ids: (string)[];
  /** The position for issue resolutions to be moved to. Required if `after` isn't provided. */
  position?: string;
};

/** The list of required status mappings by issue type. */
export type RequiredMappingByIssueType = {
  /** The ID of the issue type. */
  issueTypeId?: string;
  /** The status IDs requiring mapping. */
  statusIds?: (string)[];
};

/** The list of required status mappings by workflow. */
export type RequiredMappingByWorkflows = {
  /** The ID of the source workflow. */
  sourceWorkflowId?: string;
  /** The status IDs requiring mapping. */
  statusIds?: (string)[];
  /** The ID of the target workflow. */
  targetWorkflowId?: string;
};

/** Details of an issue resolution. */
export type Resolution = {
  /** The description of the issue resolution. */
  description?: string;
  /** The ID of the issue resolution. */
  id?: string;
  /** The name of the issue resolution. */
  name?: string;
  /** The URL of the issue resolution. */
  self?: string;
};

/** The ID of an issue resolution. */
export type ResolutionId = {
  /** The ID of the issue resolution. */
  id: string;
  [key: string]: unknown;
};

export type ResolutionJsonBean = {
  default?: boolean;
  description?: string;
  iconUrl?: string;
  id?: string;
  name?: string;
  self?: string;
};

export type Resource = {
  contentAsByteArray?: (string)[];
  description?: string;
  file?: string;
  filename?: string;
  inputStream?: { [key: string]: unknown };
  open?: boolean;
  readable?: boolean;
  uri?: string;
  url?: string;
};

/** Details of the permission. */
export type RestrictedPermission = {
  /** The ID of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions. */
  id?: string;
  /** The key of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions. */
  key?: string;
  [key: string]: unknown;
};

export type RichText = {
  empty?: boolean;
  emptyAdf?: boolean;
  finalised?: boolean;
  valueSet?: boolean;
};

/** Details about a user assigned to a project role. */
export type RoleActor = {
  actorGroup?: ProjectRoleGroup;
  actorUser?: ProjectRoleUser;
  /** The avatar of the role actor. */
  avatarUrl?: string;
  /** The display name of the role actor. For users, depending on the user’s privacy setting, this may return an alternative value for the user's name. */
  displayName?: string;
  /** The ID of the role actor. */
  id?: number;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  /** The type of role actor. */
  type?: "atlassian-group-role-actor" | "atlassian-user-role-actor";
};

/** The payload used to create a project role. It is optional for CMP projects, as a default role actor will be provided. TMP will add new role actors to the table. */
export type RolePayload = {
  /** The default actors for the role. By adding default actors, the role will be added to any future projects created */
  defaultActors?: (ProjectCreateResourceIdentifier)[];
  /** The description of the role */
  description?: string;
  /** The name of the role */
  name?: string;
  /** The strategy to use when there is a conflict with an existing project role. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
  /** The type of the role. Only used by project-scoped project */
  type?: "HIDDEN" | "VIEWABLE" | "EDITABLE" | "GUEST";
};

export type RolesCapabilityPayload = {
  /** A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to associate with the role and project. */
  roleToProjectActors?: { [key: string]: (ProjectCreateResourceIdentifier)[] | undefined };
  /** The list of roles to create. */
  roles?: (RolePayload)[];
};

/** A rule configuration. */
export type RuleConfiguration = {
  /** Whether the rule is disabled. */
  disabled?: boolean;
  /** A tag used to filter rules in [Get workflow transition rule configurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-rest-api-3-workflow-rule-config-get). */
  tag?: string;
  /** Configuration of the rule, as it is stored by the Connect or the Forge app on the rule configuration page. */
  value: string;
};

/** The payload for creating rules in a workflow */
export type RulePayload = {
  /** The parameters of the rule */
  parameters?: { [key: string]: string | undefined };
  /** The key of the rule. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/\#api-rest-api-3-workflows-capabilities-get */
  ruleKey?: string;
};

/** The sanitized JQL queries for the given account IDs. */
export type SanitizedJqlQueries = {
  /** The list of sanitized JQL queries. */
  queries?: (SanitizedJqlQuery)[];
};

/** Details of the sanitized JQL query. */
export type SanitizedJqlQuery = {
  /** The account ID of the user for whom sanitization was performed. */
  accountId?: string | null;
  /** The list of errors. */
  errors?: ErrorCollection;
  /** The initial query. */
  initialQuery?: string;
  /** The sanitized query, if there were no errors. */
  sanitizedQuery?: string | null;
};

/** The request details to generate template from a project */
export type SaveProjectTemplateRequest = {
  /** The ID of the target project */
  projectId?: number;
  templateGenerationOptions?: CustomTemplateOptions;
  /** The type of the template: LIVE | SNAPSHOT */
  templateType?: "LIVE" | "SNAPSHOT";
};

/** Request to save a custom template */
export type SaveTemplateRequest = {
  /** The description of the template */
  templateDescription?: string;
  templateFromProjectRequest?: SaveProjectTemplateRequest;
  /** The name of the template */
  templateName?: string;
};

export type SaveTemplateResponse = {
  projectTemplateKey?: ProjectTemplateKey;
};

/** The projects the item is associated with. Indicated for items associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO). */
export type Scope = {
  /** The project the item has scope in. */
  project?: ProjectDetails;
  /** The type of scope. */
  type?: "PROJECT" | "TEMPLATE";
  [key: string]: unknown;
};

/** The payload for creating a scope. Defines if a project is team-managed project or company-managed project */
export type ScopePayload = {
  /** The type of the scope. Use `GLOBAL` or empty for company-managed project, and `PROJECT` for team-managed project */
  type?: "GLOBAL" | "PROJECT";
};

/** A screen. */
export type Screen = {
  /** The description of the screen. */
  description?: string;
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The scope of the screen. */
  scope?: Scope;
};

/** Details of a screen. */
export type ScreenDetails = {
  /** The description of the screen. The maximum length is 255 characters. */
  description?: string;
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name: string;
};

/** Defines the payload for the field screens. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/\#api-rest-api-3-screens-post */
export type ScreenPayload = {
  /** The description of the screen */
  description?: string;
  /** The name of the screen */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The tabs of the screen. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/\#api-rest-api-3-screens-screenid-tabs-tabid-fields-post */
  tabs?: (TabPayload)[];
};

/** A screen scheme. */
export type ScreenScheme = {
  /** The description of the screen scheme. */
  description?: string;
  /** The ID of the screen scheme. */
  id?: number;
  /** Details of the issue type screen schemes associated with the screen scheme. */
  issueTypeScreenSchemes?: PageBeanIssueTypeScreenScheme;
  /** The name of the screen scheme. */
  name?: string;
  /** The IDs of the screens for the screen types of the screen scheme. */
  screens?: ScreenTypes;
};

/** Details of a screen scheme. */
export type ScreenSchemeDetails = {
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description?: string;
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name: string;
  /** The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted. */
  screens: ScreenTypes;
};

/** The ID of a screen scheme. */
export type ScreenSchemeId = {
  /** The ID of the screen scheme. */
  id: number;
};

/** Defines the payload for the screen schemes. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/\#api-rest-api-3-screenscheme-post */
export type ScreenSchemePayload = {
  defaultScreen?: ProjectCreateResourceIdentifier;
  /** The description of the screen scheme */
  description?: string;
  /** The name of the screen scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /** Similar to the field layout scheme those mappings allow users to set different screens for different operations: default - always there, applied to all operations that don't have an explicit mapping `create`, `view`, `edit` - specific operations that are available and users can assign a different screen for each one of them https://support.atlassian.com/jira-cloud-administration/docs/manage-screen-schemes/\#Associating-a-screen-with-an-issue-operation */
  screens?: { [key: string]: ProjectCreateResourceIdentifier | undefined };
};

/** The IDs of the screens for the screen types of the screen scheme. */
export type ScreenTypes = {
  /** The ID of the create screen. */
  create?: number;
  /** The ID of the default screen. Required when creating a screen scheme. */
  default: number;
  /** The ID of the edit screen. */
  edit?: number;
  /** The ID of the view screen. */
  view?: number;
};

/** A screen with tab details. */
export type ScreenWithTab = {
  /** The description of the screen. */
  description?: string;
  /** The ID of the screen. */
  id?: number;
  /** The name of the screen. */
  name?: string;
  /** The scope of the screen. */
  scope?: Scope;
  /** The tab for the screen. */
  tab?: ScreenableTab;
};

/** A screen tab field. */
export type ScreenableField = {
  /** The ID of the screen tab field. */
  id?: string;
  /** The name of the screen tab field. Required on create and update. The maximum length is 255 characters. */
  name?: string;
};

/** A screen tab. */
export type ScreenableTab = {
  /** The ID of the screen tab. */
  id?: number;
  /** The name of the screen tab. The maximum length is 255 characters. */
  name: string;
};

export type SearchAndReconcileRequestBean = {
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
};

/** The result of a JQL search with issues reconsilation. */
export type SearchAndReconcileResults = {
  /** Indicates whether this is the last page of the paginated response. */
  isLast?: boolean;
  /** The list of issues found by the search or reconsiliation. */
  issues?: (IssueBean)[];
  /** The ID and name of each field in the search results. */
  names?: { [key: string]: string | undefined };
  /** Continuation token to fetch the next page. If this result represents the last or the only page this token will be null. This token will expire in 7 days. */
  nextPageToken?: string;
  /** The schema describing the field types in the search results. */
  schema?: { [key: string]: JsonTypeBean | undefined };
};

/** Details of how to filter and list search auto complete information. */
export type SearchAutoCompleteFilter = {
  /** Include collapsed fields for fields that have non-unique names. */
  includeCollapsedFields?: boolean;
  /** List of project IDs used to filter the visible field details returned. */
  projectIds?: (number)[];
};

export type SearchRequestBean = {
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
};

export type SearchResultFieldParameters = {
  description?: string;
  isRequired?: boolean;
};

export type SearchResultWorkTypeParameters = {
  description?: string;
  isRequired?: boolean;
  workTypeId?: string;
};

/** The result of a JQL search. */
export type SearchResults = {
  /** Expand options that include additional search result details in the response. */
  expand?: string;
  /** The list of issues found by the search. */
  issues?: (IssueBean)[];
  /** The maximum number of results that could be on the page. */
  maxResults?: number;
  /** The ID and name of each field in the search results. */
  names?: { [key: string]: string | undefined };
  /** The schema describing the field types in the search results. */
  schema?: { [key: string]: JsonTypeBean | undefined };
  /** The index of the first item returned on the page. */
  startAt?: number;
  /** The number of results on the page. */
  total?: number;
  /** Any warnings related to the JQL query. */
  warningMessages?: (string)[];
};

/** Details of an issue level security item. */
export type SecurityLevel = {
  /** The description of the issue level security item. */
  description?: string;
  /** The ID of the issue level security item. */
  id?: string;
  /** Whether the issue level security item is the default. */
  isDefault?: boolean;
  /** The ID of the issue level security scheme. */
  issueSecuritySchemeId?: string;
  /** The name of the issue level security item. */
  name?: string;
  /** The URL of the issue level security item. */
  self?: string;
};

/** Issue security level member. */
export type SecurityLevelMember = {
  /** The user or group being granted the permission. It consists of a `type` and a type-dependent `parameter`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information. */
  holder: PermissionHolder;
  /** The ID of the issue security level member. */
  id: string;
  /** The ID of the issue security level. */
  issueSecurityLevelId: string;
  /** The ID of the issue security scheme. */
  issueSecuritySchemeId: string;
  managed?: boolean;
  [key: string]: unknown;
};

/** The payload for creating a security level member. See https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/ */
export type SecurityLevelMemberPayload = {
  /** Defines the value associated with the type. For reporter this would be \{"null"\}; for users this would be the names of specific users); for group this would be group names like \{"administrators", "jira-administrators", "jira-users"\} */
  parameter?: string;
  /** The type of the security level member */
  type?: "group" | "reporter" | "users";
};

/** The payload for creating a security level. See https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/ */
export type SecurityLevelPayload = {
  /** The description of the security level */
  description?: string;
  /** Whether the security level is default for the security scheme */
  isDefault?: true | false;
  /** The name of the security level */
  name?: string;
  /** The members of the security level */
  securityLevelMembers?: (SecurityLevelMemberPayload)[];
};

/** Details about a security scheme. */
export type SecurityScheme = {
  /** The ID of the default security level. */
  defaultSecurityLevelId?: number;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the issue security scheme. */
  id?: number;
  levels?: (SecurityLevel)[];
  /** The name of the issue security scheme. */
  name?: string;
  /** The URL of the issue security scheme. */
  self?: string;
};

/** The ID of the issue security scheme. */
export type SecuritySchemeId = {
  /** The ID of the issue security scheme. */
  id: string;
  [key: string]: unknown;
};

export type SecuritySchemeLevelBean = {
  /** The description of the issue security scheme level. */
  description?: string;
  /** Specifies whether the level is the default level. False by default. */
  isDefault?: boolean;
  /** The list of level members which should be added to the issue security scheme level. */
  members?: (SecuritySchemeLevelMemberBean)[];
  /** The name of the issue security scheme level. Must be unique. */
  name: string;
};

export type SecuritySchemeLevelMemberBean = {
  /** The value corresponding to the specified member type. */
  parameter?: string;
  /** The issue security level member type, e.g `reporter`, `group`, `user`, `projectrole`, `applicationRole`. */
  type: string;
};

/** Details of issue security scheme level new members. */
export type SecuritySchemeMembersRequest = {
  /** The list of level members which should be added to the issue security scheme level. */
  members?: (SecuritySchemeLevelMemberBean)[];
};

/** The payload for creating a security scheme. See https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/ */
export type SecuritySchemePayload = {
  /** The description of the security scheme */
  description?: string;
  /** The name of the security scheme */
  name?: string;
  pcri?: ProjectCreateResourceIdentifier;
  /** The security levels for the security scheme */
  securityLevels?: (SecurityLevelPayload)[];
};

/** Details about an issue security scheme. */
export type SecuritySchemeWithProjects = {
  /** The default level ID of the issue security scheme. */
  defaultLevel?: number;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the issue security scheme. */
  id: number;
  /** The name of the issue security scheme. */
  name: string;
  /** The list of project IDs associated with the issue security scheme. */
  projectIds?: (number)[];
  /** The URL of the issue security scheme. */
  self: string;
  [key: string]: unknown;
};

/** List of security schemes. */
export type SecuritySchemes = {
  /** List of security schemes. */
  issueSecuritySchemes?: (SecurityScheme)[];
};

/** Details about the Jira instance. */
export type ServerInformation = {
  /** The base URL of the Jira instance. */
  baseUrl?: string;
  /** The timestamp when the Jira version was built. */
  buildDate?: string;
  /** The build number of the Jira version. */
  buildNumber?: number;
  /** The type of server deployment. This is always returned as *Cloud*. */
  deploymentType?: string;
  /** The display URL of the Jira instance. */
  displayUrl?: string;
  /** The display URL of Confluence. */
  displayUrlConfluence?: string;
  /** The display URL of the Servicedesk Help Center. */
  displayUrlServicedeskHelpCenter?: string;
  /** Jira instance health check results. Deprecated and no longer returned. */
  healthChecks?: (HealthCheckResult)[];
  /** The unique identifier of the Jira version. */
  scmInfo?: string;
  /** The time in Jira when this request was responded to. */
  serverTime?: string;
  /** The default timezone of the Jira server. In a format known as Olson Time Zones, IANA Time Zones or TZ Database Time Zones. */
  serverTimeZone?: string;
  /** The name of the Jira instance. */
  serverTitle?: string;
  /** The version of Jira. */
  version?: string;
  /** The major, minor, and revision version numbers of the Jira version. */
  versionNumbers?: (number)[];
};

export type ServiceManagementNavigationInfo = {
  queueCategory?: string;
  queueId?: number;
  queueName?: string;
};

export type ServiceRegistry = {
  /** service description */
  description?: string | null;
  /** service ID */
  id?: string;
  /** service name */
  name?: string;
  /** organization ID */
  organizationId?: string;
  /** service revision */
  revision?: string;
  serviceTier?: ServiceRegistryTier;
};

export type ServiceRegistryTier = {
  /** tier description */
  description?: string | null;
  /** tier ID */
  id?: string;
  /** tier level */
  level?: number;
  /** tier name */
  name?: string | null;
  /** name key of the tier */
  nameKey?: string;
};

/** Details of new default levels. */
export type SetDefaultLevelsRequest = {
  /** List of objects with issue security scheme ID and new default level ID. */
  defaultValues: (DefaultLevelValue)[];
  [key: string]: unknown;
};

/** The new default issue priority. */
export type SetDefaultPriorityRequest = {
  /** The ID of the new default issue priority. Must be an existing ID or null. Setting this to null erases the default priority setting. */
  id: string;
};

/** The new default issue resolution. */
export type SetDefaultResolutionRequest = {
  /** The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default resolution setting. */
  id: string;
};

/** Details of a share permission for the filter. */
export type SharePermission = {
  /** The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended. */
  group?: GroupName;
  /** The unique identifier of the share permission. */
  id?: number;
  /** The project that the filter is shared with. This is similar to the project object returned by [Get project](#api-rest-api-3-project-projectIdOrKey-get) but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`.   For a request, specify the `id` for the project. */
  project?: Project;
  /** The project role that the filter is shared with.   For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in. */
  role?: ProjectRole;
  /** The type of share permission:   *  `user` Shared with a user.  *  `group` Shared with a group. If set in a request, then specify `sharePermission.group` as well.  *  `project` Shared with a project. If set in a request, then specify `sharePermission.project` as well.  *  `projectRole` Share with a project role in a project. This value is not returned in responses. It is used in requests, where it needs to be specify with `projectId` and `projectRoleId`.  *  `global` Shared globally. If set in a request, no other `sharePermission` properties need to be specified.  *  `loggedin` Shared with all logged-in users. Note: This value is set in a request by specifying `authenticated` as the `type`.  *  `project-unknown` Shared with a project that the user does not have access to. Cannot be set in a request. */
  type: "user" | "group" | "project" | "projectRole" | "global" | "loggedin" | "authenticated" | "project-unknown";
  /** The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user. */
  user?: UserBean;
};

export type SharePermissionInputBean = {
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
};

export type SimpleApplicationPropertyBean = {
  /** The ID of the application property. */
  id?: string;
  /** The new value. */
  value?: string;
};

export type SimpleErrorCollection = {
  /** The list of error messages produced by this operation. For example, "input parameter 'key' must be provided" */
  errorMessages?: (string)[];
  /** The list of errors by parameter returned by the operation. For example,"projectKey": "Project keys must start with an uppercase letter, followed by one or more uppercase alphanumeric characters." */
  errors?: { [key: string]: string | undefined };
  httpStatusCode?: number;
};

/** Details about the operations available in this version. */
export type SimpleLink = {
  href?: string;
  iconClass?: string;
  id?: string;
  label?: string;
  styleClass?: string;
  title?: string;
  weight?: number;
};

export type SimpleListWrapperApplicationRole = {
  callback?: ListWrapperCallbackApplicationRole;
  items?: (ApplicationRole)[];
  "max-results"?: number;
  pagingCallback?: ListWrapperCallbackApplicationRole;
  size?: number;
};

export type SimpleListWrapperGroupName = {
  callback?: ListWrapperCallbackGroupName;
  items?: (GroupName)[];
  "max-results"?: number;
  pagingCallback?: ListWrapperCallbackGroupName;
  size?: number;
};

export type SimplifiedHierarchyLevel = {
  /** The ID of the level above this one in the hierarchy. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  aboveLevelId?: number;
  /** The ID of the level below this one in the hierarchy. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  belowLevelId?: number;
  /** The external UUID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  externalUuid?: string;
  hierarchyLevelNumber?: number;
  /** The ID of the hierarchy level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  id?: number;
  /** The issue types available in this hierarchy level. */
  issueTypeIds?: (number)[];
  /** The level of this item in the hierarchy. */
  level?: number;
  /** The name of this hierarchy level. */
  name?: string;
  /** The ID of the project configuration. This property is deprecated, see [Change oticen: Removing hierarchy level IDs from next-gen APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). */
  projectConfigurationId?: number;
};

export type SimplifiedIssueTransition = {
  /** The issue status change of the transition. */
  to?: IssueTransitionStatus;
  /** The unique ID of the transition. */
  transitionId?: number;
  /** The name of the transition. */
  transitionName?: string;
};

export type SingleRedactionRequest = {
  contentItem: ContentItem;
  /** Unique id for the redaction request; ID format should be of UUID */
  externalId: string;
  /** The reason why the content is being redacted */
  reason: string;
  redactionPosition: RedactionPosition;
};

/** Result for requested redactions */
export type SingleRedactionResponse = {
  /** An unique id for the redaction request */
  externalId: string;
  /** Indicates if redaction was success/failure */
  successful: boolean;
};

export type SoftwareNavigationInfo = {
  boardId?: number;
  boardName?: string;
  simpleBoard?: boolean;
  totalBoardsInProject?: number;
};

/** The status of the item. */
export type Status = {
  /** Details of the icon representing the status. If not provided, no status icon displays in Jira. */
  icon?: Icon;
  /** Whether the item is resolved. If set to "true", the link to the issue is displayed in a strikethrough font, otherwise the link displays in normal font. */
  resolved?: boolean;
  [key: string]: unknown;
};

/** A status category. */
export type StatusCategory = {
  /** The name of the color used to represent the status category. */
  colorName?: string;
  /** The ID of the status category. */
  id?: number;
  /** The key of the status category. */
  key?: string;
  /** The name of the status category. */
  name?: string;
  /** The URL of the status category. */
  self?: string;
  [key: string]: unknown;
};

/** Details of the status being created. */
export type StatusCreate = {
  /** The description of the status. */
  description?: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: "TODO" | "IN_PROGRESS" | "DONE";
};

/** Details of the statuses being created and their scope. */
export type StatusCreateRequest = {
  scope: StatusScope;
  /** Details of the statuses being created. */
  statuses: (StatusCreate)[];
};

/** A status. */
export type StatusDetails = {
  /** The description of the status. */
  description?: string;
  /** The URL of the icon used to represent the status. */
  iconUrl?: string;
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
  /** The scope of the field. */
  scope?: Scope;
  /** The URL of the status. */
  self?: string;
  /** The category assigned to the status. */
  statusCategory?: StatusCategory;
  [key: string]: unknown;
};

/** The statuses associated with this workflow. */
export type StatusLayoutUpdate = {
  approvalConfiguration?: ApprovalConfiguration;
  layout?: WorkflowLayout;
  /** The properties for this status layout. */
  properties: { [key: string]: string | undefined };
  /** A unique ID which the status will use to refer to this layout configuration. */
  statusReference: string;
  [key: string]: unknown;
};

/** Details about the mapping from a status to a new status for an issue type. */
export type StatusMapping = {
  /** The ID of the issue type. */
  issueTypeId: string;
  /** The ID of the new status. */
  newStatusId: string;
  /** The ID of the status. */
  statusId: string;
};

/** The mapping of old to new status ID for a specific project and issue type. */
export type StatusMappingDto = {
  /** The issue type for the status mapping. */
  issueTypeId: string;
  /** The project for the status mapping. */
  projectId: string;
  /** The list of old and new status ID mappings for the specified project and issue type. */
  statusMigrations: (StatusMigration)[];
  [key: string]: unknown;
};

/** The details of the statuses in the associated workflows. */
export type StatusMetadata = {
  /** The category of the status. */
  category?: "TODO" | "IN_PROGRESS" | "DONE";
  /** The ID of the status. */
  id?: string;
  /** The name of the status. */
  name?: string;
};

/** The mapping of old to new status ID. */
export type StatusMigration = {
  /** The new status ID. */
  newStatusReference: string;
  /** The old status ID. */
  oldStatusReference: string;
  [key: string]: unknown;
};

/** The payload for creating a status */
export type StatusPayload = {
  /** The description of the status */
  description?: string;
  /** The name of the status */
  name?: string;
  /** The conflict strategy for the status already exists. FAIL - Fail execution, this always needs to be unique; USE - Use the existing entity and ignore new entity parameters; NEW - Create a new entity */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
  /** The status category of the status. The value is case-sensitive. */
  statusCategory?: "TODO" | "IN_PROGRESS" | "DONE";
};

/** The list of issue types. */
export type StatusProjectIssueTypeUsage = {
  /** The issue type ID. */
  id?: string;
};

/** The issue types using this status in a project. */
export type StatusProjectIssueTypeUsageDto = {
  issueTypes?: StatusProjectIssueTypeUsagePage;
  /** The project ID. */
  projectId?: string;
  /** The status ID. */
  statusId?: string;
};

/** A page of issue types. */
export type StatusProjectIssueTypeUsagePage = {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of issue types. */
  values?: (StatusProjectIssueTypeUsage)[];
};

/** The project. */
export type StatusProjectUsage = {
  /** The project ID. */
  id?: string;
};

/** The projects using this status. */
export type StatusProjectUsageDto = {
  projects?: StatusProjectUsagePage;
  /** The status ID. */
  statusId?: string;
};

/** A page of projects. */
export type StatusProjectUsagePage = {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of projects. */
  values?: (StatusProjectUsage)[];
};

/** The scope of the status. */
export type StatusScope = {
  project?: ProjectId;
  /** The scope of the status. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type: "PROJECT" | "GLOBAL";
};

/** Details of the status being updated. */
export type StatusUpdate = {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. */
  id: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: "TODO" | "IN_PROGRESS" | "DONE";
  [key: string]: unknown;
};

/** The list of statuses that will be updated. */
export type StatusUpdateRequest = {
  /** The list of statuses that will be updated. */
  statuses: (StatusUpdate)[];
};

/** Workflows using the status. */
export type StatusWorkflowUsageDto = {
  /** The status ID. */
  statusId?: string;
  workflows?: StatusWorkflowUsagePage;
};

/** A page of workflows. */
export type StatusWorkflowUsagePage = {
  /** Page token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of statuses. */
  values?: (StatusWorkflowUsageWorkflow)[];
};

/** The worflow. */
export type StatusWorkflowUsageWorkflow = {
  /** The workflow ID. */
  id?: string;
};

/** The statuses associated with each workflow. */
export type StatusesPerWorkflow = {
  /** The ID of the initial status for the workflow. */
  initialStatusId?: string;
  /** The status IDs associated with the workflow. */
  statuses?: (string)[];
  /** The ID of the workflow. */
  workflowId?: string;
};

export type StreamingResponseBody = { [key: string]: unknown };

export type StringList = { [key: string]: unknown };

export type SubmittedBulkOperation = {
  taskId?: string;
};

export type SuccessOrErrorResults = {
  error?: RemoveFieldParametersResultError;
  fieldId?: string;
  schemeId?: number;
  success?: boolean;
  workTypeIds?: (number)[];
};

/** An issue suggested for use in the issue picker auto-completion. */
export type SuggestedIssue = {
  /** The ID of the issue. */
  id?: number;
  /** The URL of the issue type's avatar. */
  img?: string;
  /** The key of the issue. */
  key?: string;
  /** The key of the issue in HTML format. */
  keyHtml?: string;
  /** The phrase containing the query string in HTML format, with the string highlighted with HTML bold tags. */
  summary?: string;
  /** The phrase containing the query string, as plain text. */
  summaryText?: string;
};

/** Details of changes to a priority scheme's priorities that require suggested priority mappings. */
export type SuggestedMappingsForPrioritiesRequestBean = {
  /** The ids of priorities being removed from the scheme. */
  add?: (number)[];
  /** The ids of priorities being removed from the scheme. */
  remove?: (number)[];
};

/** Details of changes to a priority scheme's projects that require suggested priority mappings. */
export type SuggestedMappingsForProjectsRequestBean = {
  /** The ids of projects being added to the scheme. */
  add?: (number)[];
};

/** Details of changes to a priority scheme that require suggested priority mappings. */
export type SuggestedMappingsRequestBean = {
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
};

/** The payload for custom swimlanes */
export type SwimlanePayload = {
  /** The description of the quick filter */
  description?: string;
  /** The jql query for the quick filter */
  jqlQuery?: string;
  /** The name of the quick filter */
  name?: string;
};

/** The payload for customising a swimlanes on a board */
export type SwimlanesPayload = {
  /** The custom swimlane definitions. */
  customSwimlanes?: (SwimlanePayload)[];
  /** The name of the custom swimlane to use for work items that don't match any other swimlanes. */
  defaultCustomSwimlaneName?: string;
  /** The swimlane strategy for the board. */
  swimlaneStrategy?: "none" | "custom" | "parentChild" | "assignee" | "assigneeUnassignedFirst" | "epic" | "project" | "issueparent" | "issuechildren" | "request_type";
};

/** List of system avatars. */
export type SystemAvatars = {
  /** A list of avatar details. */
  system?: (Avatar)[];
};

/** Defines the payload for the tabs of the screen. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/\#api-rest-api-3-screens-screenid-tabs-tabid-fields-post */
export type TabPayload = {
  /** The list of resource identifier of the field associated to the tab. See https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/\#api-rest-api-3-screens-screenid-tabs-tabid-fields-post */
  fields?: (ProjectCreateResourceIdentifier)[];
  /** The name of the tab */
  name?: string;
};

/** Details about a task. */
export type TaskProgress = {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: string;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: string;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: unknown;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: string;
  /** The status of the task. */
  status: "ENQUEUED" | "RUNNING" | "COMPLETE" | "FAILED" | "CANCEL_REQUESTED" | "CANCELLED" | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted?: string;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
};

/** Details about a task. */
export type TaskProgressBeanJsonNode = {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: JsonNode;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** The status of the task. */
  status: "ENQUEUED" | "RUNNING" | "COMPLETE" | "FAILED" | "CANCEL_REQUESTED" | "CANCELLED" | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
};

/** Details about a task. */
export type TaskProgressBeanObject = {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: unknown;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** The status of the task. */
  status: "ENQUEUED" | "RUNNING" | "COMPLETE" | "FAILED" | "CANCEL_REQUESTED" | "CANCELLED" | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
};

/** Details about a task. */
export type TaskProgressBeanRemoveOptionFromIssuesResult = {
  /** The description of the task. */
  description?: string;
  /** The execution time of the task, in milliseconds. */
  elapsedRuntime: number;
  /** A timestamp recording when the task was finished. */
  finished?: number;
  /** The ID of the task. */
  id: string;
  /** A timestamp recording when the task progress was last updated. */
  lastUpdate: number;
  /** Information about the progress of the task. */
  message?: string;
  /** The progress of the task, as a percentage complete. */
  progress: number;
  /** The result of the task execution. */
  result?: RemoveOptionFromIssuesResult;
  /** The URL of the task. */
  self: string;
  /** A timestamp recording when the task was started. */
  started?: number;
  /** The status of the task. */
  status: "ENQUEUED" | "RUNNING" | "COMPLETE" | "FAILED" | "CANCEL_REQUESTED" | "CANCELLED" | "DEAD";
  /** A timestamp recording when the task was submitted. */
  submitted: number;
  /** The ID of the user who submitted the task. */
  submittedBy: number;
};

/** Details of the time tracking configuration. */
export type TimeTrackingConfiguration = {
  /** The default unit of time applied to logged time. */
  defaultUnit: "minute" | "hour" | "day" | "week";
  /** The format that will appear on an issue's *Time Spent* field. */
  timeFormat: "pretty" | "days" | "hours";
  /** The number of days in a working week. */
  workingDaysPerWeek: number;
  /** The number of hours in a working day. */
  workingHoursPerDay: number;
};

/** Time tracking details. */
export type TimeTrackingDetails = {
  /** The original estimate of time needed for this issue in readable format. */
  originalEstimate?: string;
  /** The original estimate of time needed for this issue in seconds. */
  originalEstimateSeconds?: number;
  /** The remaining estimate of time needed for this issue in readable format. */
  remainingEstimate?: string;
  /** The remaining estimate of time needed for this issue in seconds. */
  remainingEstimateSeconds?: number;
  /** Time worked on this issue in readable format. */
  timeSpent?: string;
  /** Time worked on this issue in seconds. */
  timeSpentSeconds?: number;
};

/** Details about the time tracking provider. */
export type TimeTrackingProvider = {
  /** The key for the time tracking provider. For example, *JIRA*. */
  key: string;
  /** The name of the time tracking provider. For example, *JIRA provided time tracking*. */
  name?: string;
  /** The URL of the configuration page for the time tracking provider app. For example, *\/example/config/url*. This property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking provider app. */
  url?: string;
};

/** The payload for the layout details for the destination end of a transition */
export type ToLayoutPayload = {
  /** Defines where the transition line will be connected to a status. Port 0 to 7 are acceptable values. */
  port?: number;
  status?: ProjectCreateResourceIdentifier;
};

/** Details of a workflow transition. */
export type Transition = {
  /** The description of the transition. */
  description: string;
  /** The statuses the transition can start from. */
  from: (string)[];
  /** The ID of the transition. */
  id: string;
  /** The name of the transition. */
  name: string;
  /** The properties of the transition. */
  properties?: { [key: string]: unknown | undefined };
  rules?: WorkflowRules;
  screen?: TransitionScreenDetails;
  /** The status the transition goes to. */
  to: string;
  /** The type of the transition. */
  type: "global" | "initial" | "directed";
};

/** Link information for workflow transitions. */
export type TransitionLink = {
  /** The from port number. */
  fromPort?: number;
  /** The from status reference. */
  fromStatusReference?: string;
  /** The to port number. */
  toPort?: number;
};

/** The payload for creating a transition in a workflow. Can be DIRECTED, GLOBAL, SELF-LOOPED, GLOBAL LOOPED */
export type TransitionPayload = {
  /** The actions that are performed when the transition is made */
  actions?: (RulePayload)[];
  conditions?: ConditionGroupPayload;
  /** Mechanism in Jira for triggering certain actions, like notifications, automations, etc. Unless a custom notification scheme is configure, it's better not to provide any value here */
  customIssueEventId?: string;
  /** The description of the transition */
  description?: string;
  /** The statuses that the transition can be made from */
  from?: (FromLayoutPayload)[];
  /** The id of the transition */
  id?: number;
  /** The name of the transition */
  name?: string;
  /** The properties of the transition */
  properties?: { [key: string]: string | undefined };
  to?: ToLayoutPayload;
  transitionScreen?: RulePayload;
  /** The triggers that are performed when the transition is made */
  triggers?: (RulePayload)[];
  /** The type of the transition */
  type?: "global" | "initial" | "directed";
  /** The validators that are performed when the transition is made */
  validators?: (RulePayload)[];
};

/** Details about a workflow transition in preview context. */
export type TransitionPreview = {
  /** The post-functions of the transition. */
  actions?: (PreviewRuleConfiguration)[];
  conditions?: PreviewConditionGroupConfiguration;
  /** The custom issue event ID for the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /** The ID of the transition. */
  id?: string;
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links?: (TransitionLink)[];
  /** The name of the transition. */
  name?: string;
  /** The status the transition goes to. */
  toStatusReference?: string;
  transitionScreen?: PreviewRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: (PreviewTrigger)[];
  /** The transition type. */
  type?: "INITIAL" | "GLOBAL" | "DIRECTED";
  /** The validators of the transition. */
  validators?: (PreviewRuleConfiguration)[];
};

/** The details of a transition screen. */
export type TransitionScreenDetails = {
  /** The ID of the screen. */
  id: string;
  /** The name of the screen. */
  name?: string;
};

/** The transition update data. */
export type TransitionUpdateDto = {
  /** The post-functions of the transition. */
  actions?: (WorkflowRuleConfiguration)[];
  conditions?: ConditionGroupUpdate;
  /** The custom event ID of the transition. */
  customIssueEventId?: string;
  /** The description of the transition. */
  description?: string;
  /** The ID of the transition. */
  id?: string;
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links?: (WorkflowTransitionLinks)[];
  /** The name of the transition. */
  name?: string;
  /** The properties of the transition. */
  properties?: { [key: string]: string | undefined };
  /** The status the transition goes to. */
  toStatusReference?: string;
  transitionScreen?: WorkflowRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: (WorkflowTrigger)[];
  /** The transition type. */
  type?: "INITIAL" | "GLOBAL" | "DIRECTED";
  /** The validators of the transition. */
  validators?: (WorkflowRuleConfiguration)[];
  [key: string]: unknown;
};

/** List of issue transitions. */
export type Transitions = {
  /** Expand options that include additional transitions details in the response. */
  expand?: string;
  /** List of issue transitions. */
  transitions?: (IssueTransition)[];
};

/** The details of a UI modification's context, which define where to activate the UI modification. */
export type UiModificationContextDetails = {
  /** The ID of the UI modification context. */
  id?: string;
  /** Whether a context is available. For example, when a project is deleted the context becomes unavailable. */
  isAvailable?: boolean;
  /** The issue type ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all issue types. Each UI modification context can have a maximum of one wildcard. */
  issueTypeId?: string;
  /** The portal ID of the context. Only required for Jira Service Management request create portal view (`JSMRequestCreate`). */
  portalId?: string;
  /** The project ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all projects. Each UI modification context can have a maximum of one wildcard. */
  projectId?: string;
  /** The request type ID of the context. Only required for Jira Service Management request create portal view (`JSMRequestCreate`). */
  requestTypeId?: string;
  /** The view type of the context.   Supported values:   *  `GIC` \- Jira global issue create  *  `IssueView` \- Jira issue view  *  `IssueTransition` \- Jira issue transition  *  `JSMRequestCreate` \- Jira Service Management request create portal view  For Jira view types (`GIC`, `IssueView`, `IssueTransition`), null is treated as a wildcard, meaning the UI modification will be applied to all view types. Each Jira context can have a maximum of one wildcard.      Wildcards are not applicable for JSM contexts. */
  viewType?: "GIC" | "IssueView" | "IssueTransition" | "JSMRequestCreate";
};

/** The details of a UI modification. */
export type UiModificationDetails = {
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts?: (UiModificationContextDetails)[];
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The ID of the UI modification. */
  id: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: string;
  /** The URL of the UI modification. */
  self: string;
};

/** Identifiers for a UI modification. */
export type UiModificationIdentifiers = {
  /** The ID of the UI modification. */
  id: string;
  /** The URL of the UI modification. */
  self: string;
};

export type UnrestrictedUserEmail = {
  /** The accountId of the user */
  accountId?: string;
  /** The email of the user */
  email?: string;
  [key: string]: unknown;
};

/** Details of a custom field. */
export type UpdateCustomFieldDetails = {
  /** The description of the custom field. The maximum length is 40000 characters. */
  description?: string;
  /** The name of the custom field. It doesn't have to be unique. The maximum length is 255 characters. */
  name?: string;
  /** The searcher that defines the way the field is searched in Jira. It can be set to `null`, otherwise you must specify the valid searcher for the field type, as listed below (abbreviated values shown):   *  `cascadingselect`: `cascadingselectsearcher`  *  `datepicker`: `daterange`  *  `datetime`: `datetimerange`  *  `float`: `exactnumber` or `numberrange`  *  `grouppicker`: `grouppickersearcher`  *  `importid`: `exactnumber` or `numberrange`  *  `labels`: `labelsearcher`  *  `multicheckboxes`: `multiselectsearcher`  *  `multigrouppicker`: `multiselectsearcher`  *  `multiselect`: `multiselectsearcher`  *  `multiuserpicker`: `userpickergroupsearcher`  *  `multiversion`: `versionsearcher`  *  `project`: `projectsearcher`  *  `radiobuttons`: `multiselectsearcher`  *  `readonlyfield`: `textsearcher`  *  `select`: `multiselectsearcher`  *  `textarea`: `textsearcher`  *  `textfield`: `textsearcher`  *  `url`: `exacttextsearcher`  *  `userpicker`: `userpickergroupsearcher`  *  `version`: `versionsearcher` */
  searcherKey?: "com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:daterange" | "com.atlassian.jira.plugin.system.customfieldtypes:datetimerange" | "com.atlassian.jira.plugin.system.customfieldtypes:exactnumber" | "com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:numberrange" | "com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:textsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher" | "com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher";
};

/** The request for updating the default project classification level. */
export type UpdateDefaultProjectClassificationBean = {
  /** The ID of the project classification. */
  id: string;
};

/** The ID of a screen scheme. */
export type UpdateDefaultScreenScheme = {
  /** The ID of the screen scheme. */
  screenSchemeId: string;
};

export type UpdateFieldAssociationSchemeLinksBean = {
  associations?: string;
  projects?: string;
};

/** Request object for updating an existing field association scheme. */
export type UpdateFieldAssociationSchemeRequest = {
  /** The description value to update */
  description?: string;
  /** The name value to update */
  name?: string;
};

/** Response object after successfully updating an existing field association scheme. */
export type UpdateFieldAssociationSchemeResponse = {
  description?: string;
  id?: number;
  links?: UpdateFieldAssociationSchemeLinksBean;
  name?: string;
};

/** Represents an association between a field and its operations. */
export type UpdateFieldAssociationsRequestItem = {
  /** (optional) Work types to restrict field to. Replaces any existing work type associations for the field. If not provided, the field is associated to any work types. */
  restrictedToWorkTypes?: (number)[];
  /** Scheme IDs to associate field with */
  schemeIds: (number)[];
};

/** The details of the field configuration scheme. */
export type UpdateFieldConfigurationSchemeDetails = {
  /** The description of the field configuration scheme. */
  description?: string;
  /** The name of the field configuration scheme. The name must be unique. */
  name: string;
};

/** Result of updating field scheme parameters for a specific field, scheme, and optional work type. */
export type UpdateFieldSchemeParametersPartialFailure = {
  error?: string;
  fieldId: string;
  schemeId: number;
  success: boolean;
  workTypeId?: number;
};

/** Request bean for updating field scheme parameters across multiple schemes and work types. */
export type UpdateFieldSchemeParametersRequest = {
  parameters?: FieldsSchemeItemParameter;
  /** The list of field scheme IDs to update */
  schemeIds?: (number)[];
  /** The list of work type-specific parameter overrides, may be empty if only default parameters are being updated */
  workTypeParameters?: (FieldsSchemeItemWorkTypeParameter)[];
};

/** Response bean for field scheme parameter update operations. */
export type UpdateFieldSchemeParametersResponse = {
  results: (UpdateFieldSchemeParametersPartialFailure)[];
};

/** Details of issue security scheme level. */
export type UpdateIssueSecurityLevelDetails = {
  /** The description of the issue security scheme level. */
  description?: string;
  /** The name of the issue security scheme level. Must be unique. */
  name?: string;
  [key: string]: unknown;
};

export type UpdateIssueSecuritySchemeRequestBean = {
  /** The description of the security scheme scheme. */
  description?: string;
  /** The name of the security scheme scheme. Must be unique. */
  name?: string;
};

/** Details of a notification scheme. */
export type UpdateNotificationSchemeDetails = {
  /** The description of the notification scheme. */
  description?: string;
  /** The name of the notification scheme. Must be unique. */
  name?: string;
  [key: string]: unknown;
};

/** Update priorities in a scheme */
export type UpdatePrioritiesInSchemeRequestBean = {
  /** Priorities to add to a scheme */
  add?: PrioritySchemeChangesWithoutMappings;
  /** Priorities to remove from a scheme */
  remove?: PrioritySchemeChangesWithoutMappings;
  [key: string]: unknown;
};

/** Details of an issue priority. */
export type UpdatePriorityDetails = {
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
  [key: string]: unknown;
};

/** Details of a priority scheme. */
export type UpdatePrioritySchemeRequestBean = {
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
};

/** Details of the updated priority scheme. */
export type UpdatePrioritySchemeResponseBean = {
  priorityScheme?: PrioritySchemeWithPaginatedPrioritiesAndProjects;
  /** The in-progress issue migration task. */
  task?: TaskProgressBeanJsonNode;
  [key: string]: unknown;
};

/** Details about the project. */
export type UpdateProjectDetails = {
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
};

/** Update projects in a scheme */
export type UpdateProjectsInSchemeRequestBean = {
  /** Projects to add to a scheme */
  add?: PrioritySchemeChangesWithoutMappings;
  /** Projects to remove from a scheme */
  remove?: PrioritySchemeChangesWithoutMappings;
  [key: string]: unknown;
};

/** Details of an issue resolution. */
export type UpdateResolutionDetails = {
  /** The description of the resolution. */
  description?: string;
  /** The name of the resolution. Must be unique. */
  name: string;
  [key: string]: unknown;
};

/** Details of a screen. */
export type UpdateScreenDetails = {
  /** The description of the screen. The maximum length is 255 characters. */
  description?: string;
  /** The name of the screen. The name must be unique. The maximum length is 255 characters. */
  name?: string;
};

/** Details of a screen scheme. */
export type UpdateScreenSchemeDetails = {
  /** The description of the screen scheme. The maximum length is 255 characters. */
  description?: string;
  /** The name of the screen scheme. The name must be unique. The maximum length is 255 characters. */
  name?: string;
  /** The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted. */
  screens?: UpdateScreenTypes;
};

/** The IDs of the screens for the screen types of the screen scheme. */
export type UpdateScreenTypes = {
  /** The ID of the create screen. To remove the screen association, pass a null. */
  create?: string;
  /** The ID of the default screen. When specified, must include a screen ID as a default screen is required. */
  default?: string;
  /** The ID of the edit screen. To remove the screen association, pass a null. */
  edit?: string;
  /** The ID of the view screen. To remove the screen association, pass a null. */
  view?: string;
};

/** The details of a UI modification. */
export type UpdateUiModificationDetails = {
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. If provided, replaces all existing contexts. */
  contexts?: (UiModificationContextDetails)[];
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data?: string;
  /** The description of the UI modification. The maximum length is 255 characters. */
  description?: string;
  /** The name of the UI modification. The maximum length is 255 characters. */
  name?: string;
};

export type UpdateUserToGroupBean = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** This property is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  [key: string]: unknown;
};

/** A project category. */
export type UpdatedProjectCategory = {
  /** The name of the project category. */
  description?: string;
  /** The ID of the project category. */
  id?: string;
  /** The description of the project category. */
  name?: string;
  /** The URL of the project category. */
  self?: string;
};

/** A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:   *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).  *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.  *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values. */
export type User = {
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
};

export type UserBean = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The avatars of the user. */
  avatarUrls?: UserBeanAvatarUrls;
  /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
  displayName?: string;
  /** This property is deprecated in favor of `accountId` because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.   The key of the user. */
  key?: string;
  /** This property is deprecated in favor of `accountId` because of privacy changes. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.   The username of the user. */
  name?: string;
  /** The URL of the user. */
  self?: string;
};

export type UserBeanAvatarUrls = {
  /** The URL of the user's 16x16 pixel avatar. */
  "16x16"?: string;
  /** The URL of the user's 24x24 pixel avatar. */
  "24x24"?: string;
  /** The URL of the user's 32x32 pixel avatar. */
  "32x32"?: string;
  /** The URL of the user's 48x48 pixel avatar. */
  "48x48"?: string;
};

export type UserColumnRequestBody = {
  columns?: (string)[];
};

/** A [user](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID. */
export type UserContextVariable = {
  /** The account ID of the user. */
  accountId: string;
  /** Type of custom context variable. */
  type: string;
};

/** User details permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:   *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).  *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.  *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values. */
export type UserDetails = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user) */
  accountType?: string;
  /** Whether the user is active. */
  active?: boolean;
  /** The avatars of the user. */
  avatarUrls?: AvatarUrlsBean;
  /** The display name of the user. Depending on the user’s privacy settings, this may return an alternative value. */
  displayName?: string;
  /** The email address of the user. Depending on the user’s privacy settings, this may be returned as null. */
  emailAddress?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
  /** The URL of the user. */
  self?: string;
  /** The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null. */
  timeZone?: string;
};

/** Filter for a User Picker (single) custom field. */
export type UserFilter = {
  /** Whether the filter is enabled. */
  enabled: boolean;
  /** User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 groups can be provided. */
  groups?: (string)[];
  /** Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of 10 roles can be provided. */
  roleIds?: (number)[];
};

/** List of user account IDs. */
export type UserKey = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Returns *unknown* if the record is deleted and corrupted, for example, as the result of a server import. */
  accountId?: string;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
};

/** A paginated list of users sharing the filter. This includes users that are members of the groups or can browse the projects that the filter is shared with. */
export type UserList = {
  /** The index of the last item returned on the page. */
  "end-index"?: number;
  /** The list of items. */
  items?: (User)[];
  /** The maximum number of results that could be on the page. */
  "max-results"?: number;
  /** The number of items on the page. */
  size?: number;
  /** The index of the first item returned on the page. */
  "start-index"?: number;
};

export type UserMigrationBean = {
  accountId?: string;
  key?: string;
  username?: string;
};

/** Details of a permission and its availability to a user. */
export type UserPermission = {
  /** Indicate whether the permission key is deprecated. Note that deprecated keys cannot be used in the `permissions parameter of Get my permissions. Deprecated keys are not returned by Get all permissions.` */
  deprecatedKey?: boolean;
  /** The description of the permission. */
  description?: string;
  /** Whether the permission is available to the user in the queried context. */
  havePermission?: boolean;
  /** The ID of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions. */
  id?: string;
  /** The key of the permission. Either `id` or `key` must be specified. Use [Get all permissions](#api-rest-api-3-permissions-get) to get the list of permissions. */
  key?: string;
  /** The name of the permission. */
  name?: string;
  /** The type of the permission. */
  type?: "GLOBAL" | "PROJECT";
  [key: string]: unknown;
};

/** A user found in a search. */
export type UserPickerUser = {
  /** The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  accountId?: string;
  /** The user account type. Can take the following values:   *  `atlassian` regular Atlassian user account  *  `app` system account used for Connect applications and OAuth to represent external systems  *  `customer` Jira Service Desk account representing an external service desk */
  accountType?: "atlassian" | "app" | "customer" | "unknown";
  /** The avatar URL of the user. */
  avatarUrl?: string;
  /** The display name of the user. Depending on the user’s privacy setting, this may be returned as null. */
  displayName?: string;
  /** The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag. */
  html?: string;
  /** This property is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  key?: string;
  /** This property is no longer available . See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  name?: string;
};

/** The level of validation to return from the API. If no values are provided, the default would return `WARNING` and `ERROR` level validation results. */
export type ValidationOptionsForCreate = {
  levels?: ("WARNING" | "ERROR")[];
};

/** The level of validation to return from the API. If no values are provided, the default would return `WARNING` and `ERROR` level validation results. */
export type ValidationOptionsForUpdate = {
  levels?: ("WARNING" | "ERROR")[];
};

/** An operand that is a user-provided value. */
export type ValueOperand = {
  /** Encoded value, which can be used directly in a JQL query. */
  encodedValue?: string;
  /** The operand value. */
  value: string;
};

/** Details about a project version. */
export type Version = {
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
};

/** Contains details about a version approver. */
export type VersionApprover = {
  /** The Atlassian account ID of the approver. */
  accountId?: string;
  /** A description of why the user is declining the approval. */
  declineReason?: string;
  /** A description of what the user is approving within the specified version. */
  description?: string;
  /** The status of the approval, which can be *PENDING*, *APPROVED*, or *DECLINED* */
  status?: string;
  [key: string]: unknown;
};

/** Various counts of issues within a version. */
export type VersionIssueCounts = {
  /** List of custom fields using the version. */
  customFieldUsage?: (VersionUsageInCustomField)[];
  /** Count of issues where a version custom field is set to the version. */
  issueCountWithCustomFieldsShowingVersion?: number;
  /** Count of issues where the `affectedVersion` is set to the version. */
  issuesAffectedCount?: number;
  /** Count of issues where the `fixVersion` is set to the version. */
  issuesFixedCount?: number;
  /** The URL of these count details. */
  self?: string;
};

/** Counts of the number of issues in various statuses. */
export type VersionIssuesStatus = {
  /** Count of issues with status *done*. */
  done?: number;
  /** Count of issues with status *in progress*. */
  inProgress?: number;
  /** Count of issues with status *to do*. */
  toDo?: number;
  /** Count of issues with a status other than *to do*, *in progress*, and *done*. */
  unmapped?: number;
  [key: string]: unknown;
};

export type VersionMoveBean = {
  /** The URL (self link) of the version after which to place the moved version. Cannot be used with `position`. */
  after?: string;
  /** An absolute position in which to place the moved version. Cannot be used with `after`. */
  position?: "Earlier" | "Later" | "First" | "Last";
};

/** Associated related work to a version */
export type VersionRelatedWork = {
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
};

/** Count of a version's unresolved issues. */
export type VersionUnresolvedIssuesCount = {
  /** Count of issues. */
  issuesCount?: number;
  /** Count of unresolved issues. */
  issuesUnresolvedCount?: number;
  /** The URL of these count details. */
  self?: string;
};

/** List of custom fields using the version. */
export type VersionUsageInCustomField = {
  /** The ID of the custom field. */
  customFieldId?: number;
  /** The name of the custom field. */
  fieldName?: string;
  /** Count of the issues where the custom field contains the version. */
  issueCountWithVersionInCustomField?: number;
};

/** The group or role to which this item is visible. */
export type Visibility = {
  /** The ID of the group or the name of the role that visibility of this item is restricted to. */
  identifier?: string | null;
  /** Whether visibility of this item is restricted to a group or role. */
  type?: "group" | "role";
  /** The name of the group or role that visibility of this item is restricted to. Please note that the name of a group is mutable, to reliably identify a group use `identifier`. */
  value?: string;
  [key: string]: unknown;
};

/** The details of votes on an issue. */
export type Votes = {
  /** Whether the user making this request has voted on the issue. */
  hasVoted?: boolean;
  /** The URL of these issue vote details. */
  self?: string;
  /** List of the users who have voted on this issue. An empty list is returned when the calling user doesn't have the *View voters and watchers* project permission. */
  voters?: (User)[];
  /** The number of votes on the issue. */
  votes?: number;
};

export type WarningCollection = {
  warnings?: (string)[];
};

/** The details of watchers on an issue. */
export type Watchers = {
  /** Whether the calling user is watching this issue. */
  isWatching?: boolean;
  /** The URL of these issue watcher details. */
  self?: string;
  /** The number of users watching this issue. */
  watchCount?: number;
  /** Details of the users watching this issue. */
  watchers?: (UserDetails)[];
};

/** A webhook. */
export type Webhook = {
  /** The Jira events that trigger the webhook. */
  events: ("jira:issue_created" | "jira:issue_updated" | "jira:issue_deleted" | "comment_created" | "comment_updated" | "comment_deleted" | "issue_property_set" | "issue_property_deleted" | "sprint_created" | "sprint_updated" | "sprint_closed" | "sprint_deleted" | "sprint_started" | "jira:version_released" | "jira:version_unreleased" | "jira:version_created" | "jira:version_moved" | "jira:version_updated" | "jira:version_merged" | "jira:version_deleted")[];
  /** The date after which the webhook is no longer sent. Use [Extend webhook life](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-rest-api-3-webhook-refresh-put) to extend the date. */
  expirationDate?: number;
  /** A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent. If this parameter is not present, the app is notified about all field updates. */
  fieldIdsFilter?: (string)[];
  /** The ID of the webhook. */
  id: number;
  /** A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property updates. */
  issuePropertyKeysFilter?: (string)[];
  /** The JQL filter that specifies which issues the webhook is sent for. */
  jqlFilter: string;
  /** The URL that specifies where the webhooks are sent. */
  url: string;
};

/** A list of webhooks. */
export type WebhookDetails = {
  /** The Jira events that trigger the webhook. */
  events: ("jira:issue_created" | "jira:issue_updated" | "jira:issue_deleted" | "comment_created" | "comment_updated" | "comment_deleted" | "issue_property_set" | "issue_property_deleted" | "sprint_created" | "sprint_updated" | "sprint_closed" | "sprint_deleted" | "sprint_started" | "jira:version_released" | "jira:version_unreleased" | "jira:version_created" | "jira:version_moved" | "jira:version_updated" | "jira:version_merged" | "jira:version_deleted")[];
  /** A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent. If this parameter is not present, the app is notified about all field updates. */
  fieldIdsFilter?: (string)[];
  /** A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property updates. */
  issuePropertyKeysFilter?: (string)[];
  /** The JQL filter that specifies which issues the webhook is sent for. Only a subset of JQL can be used. The supported elements are:   *  Fields: `issueKey`, `project`, `issuetype`, `status`, `assignee`, `reporter`, `issue.property`, and `cf[id]`. For custom fields (`cf[id]`), only the epic label custom field is supported.".  *  Operators: `=`, `!=`, `IN`, and `NOT IN`. */
  jqlFilter: string;
};

/** Details of webhooks to register. */
export type WebhookRegistrationDetails = {
  /** The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a single URL per app is allowed to be registered. */
  url: string;
  /** A list of webhooks. */
  webhooks: (WebhookDetails)[];
};

/** The date the refreshed webhooks expire. */
export type WebhooksExpirationDate = {
  /** The expiration date of all the refreshed webhooks. */
  expirationDate: number;
};

export type WorkManagementNavigationInfo = {
  boardName?: string;
};

export type WorkTypeParameters = {
  description?: string;
  isRequired: boolean;
  workTypeId: number;
};

/** Details about a workflow. */
export type Workflow = {
  /** The creation date of the workflow. */
  created?: string;
  /** The description of the workflow. */
  description: string;
  /** Whether the workflow has a draft version. */
  hasDraftWorkflow?: boolean;
  id: PublishedWorkflowId;
  /** Whether this is the default workflow. */
  isDefault?: boolean;
  operations?: WorkflowOperations;
  /** The projects the workflow is assigned to, through workflow schemes. */
  projects?: (ProjectDetails)[];
  /** The workflow schemes the workflow is assigned to. */
  schemes?: (WorkflowSchemeIdName)[];
  /** The statuses of the workflow. */
  statuses?: (WorkflowStatus)[];
  /** The transitions of the workflow. */
  transitions?: (Transition)[];
  /** The last edited date of the workflow. */
  updated?: string;
};

export type WorkflowAssociationStatusMapping = {
  newStatusId?: string;
  oldStatusId?: string;
};

export type WorkflowCapabilities = {
  /** The Connect provided ecosystem rules available. */
  connectRules?: (AvailableWorkflowConnectRule)[];
  /** The scope of the workflow capabilities. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  editorScope?: "PROJECT" | "GLOBAL";
  /** The Forge provided ecosystem rules available. */
  forgeRules?: (AvailableWorkflowForgeRule)[];
  /** The types of projects that this capability set is available for. */
  projectTypes?: ("software" | "service_desk" | "product_discovery" | "business" | "unknown")[];
  /** The Atlassian provided system rules available. */
  systemRules?: (AvailableWorkflowSystemRule)[];
  /** The trigger rules available. */
  triggerRules?: (AvailableWorkflowTriggers)[];
};

/** The payload for creating a workflows. See https://www.atlassian.com/software/jira/guides/workflows/overview\#what-is-a-jira-workflow */
export type WorkflowCapabilityPayload = {
  /** The statuses for the workflow */
  statuses?: (StatusPayload)[];
  workflowScheme?: WorkflowSchemePayload;
  /** The transitions for the workflow */
  workflows?: (WorkflowPayload)[];
};

/** A compound workflow transition rule condition. This object returns `nodeType` as `compound`. */
export type WorkflowCompoundCondition = {
  /** The list of workflow conditions. */
  conditions: (WorkflowCondition)[];
  nodeType: string;
  /** The compound condition operator. */
  operator: "AND" | "OR";
};

/** The workflow transition rule conditions tree. */
export type WorkflowCondition = WorkflowSimpleCondition | WorkflowCompoundCondition;

/** The details of the workflows to create. */
export type WorkflowCreate = {
  /** The description of the workflow to create. */
  description?: string;
  loopedTransitionContainerLayout?: WorkflowLayout;
  /** The name of the workflow to create. */
  name: string;
  startPointLayout?: WorkflowLayout;
  /** The statuses associated with this workflow. */
  statuses: (StatusLayoutUpdate)[];
  /** The transitions of this workflow. */
  transitions: (TransitionUpdateDto)[];
};

/** The create workflows payload. */
export type WorkflowCreateRequest = {
  scope?: WorkflowScope;
  /** The statuses to associate with the workflows. */
  statuses?: (WorkflowStatusUpdate)[];
  /** The details of the workflows to create. */
  workflows?: (WorkflowCreate)[];
};

/** Details of the created workflows and statuses. */
export type WorkflowCreateResponse = {
  /** List of created statuses. */
  statuses?: (JiraWorkflowStatus)[];
  /** List of created workflows. */
  workflows?: (JiraWorkflow)[];
};

export type WorkflowCreateValidateRequest = {
  payload: WorkflowCreateRequest;
  validationOptions?: ValidationOptionsForCreate;
};

/** The workflow stored for the specified version. */
export type WorkflowDocumentDto = {
  created?: string;
  description?: string;
  id?: string;
  lastUpdateAuthorAAID?: string;
  loopedTransitionContainerLayout?: WorkflowLayout;
  name?: string;
  scope?: WorkflowScope;
  startPointLayout?: WorkflowLayout;
  statuses?: (WorkflowReferenceStatus)[];
  transitions?: (WorkflowTransitions)[];
  updated?: string;
  version?: DocumentVersion;
};

/** The statuses stored for the specified version. */
export type WorkflowDocumentStatusDto = {
  description?: string;
  id?: string;
  name?: string;
  scope?: WorkflowScope;
  statusCategory?: string;
  statusReference?: string;
};

/** The version details of the workflow. */
export type WorkflowDocumentVersionBean = {
  /** The version UUID. */
  id?: string;
  /** The version number. */
  versionNumber?: number;
};

/** A reference to the location of the error. This will be null if the error does not refer to a specific element. */
export type WorkflowElementReference = {
  /** A property key. */
  propertyKey?: string;
  /** A rule ID. */
  ruleId?: string;
  statusMappingReference?: ProjectAndIssueTypePair;
  /** A status reference. */
  statusReference?: string;
  /** A transition ID. */
  transitionId?: string;
};

/** A single entry in the WorkflowHistoryPage. */
export type WorkflowHistoryItemDto = {
  /** Whether the version is an intermediate workflow state, sometimes created during workflow updates. */
  isIntermediate?: boolean;
  workflowId?: string;
  workflowVersion?: number;
  /** The timestamp when this workflow version was created. */
  writtenAt?: string;
};

/** A request to read all the workflow history entries for a specific workflow. */
export type WorkflowHistoryListRequest = {
  /** The id of the workflow to read the history for. */
  workflowId?: string;
};

/** A list of workflow history entries. */
export type WorkflowHistoryListResponseDto = {
  entries?: (WorkflowHistoryItemDto)[];
};

/** A request to read a specific workflow version from history. */
export type WorkflowHistoryReadRequest = {
  version?: number;
  workflowId?: string;
};

/** The specified workflow version read from history. */
export type WorkflowHistoryReadResponseDto = {
  statuses?: (WorkflowDocumentStatusDto)[];
  workflows?: (WorkflowDocumentDto)[];
};

/** Properties that identify a workflow. */
export type WorkflowId = {
  /** **Deprecated:** Whether the workflow is in the draft state. The 'draft' parameter will be removed from this API on [November 2, 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147). */
  draft?: boolean;
  /** The name of the workflow. */
  name: string;
};

/** The starting point for the statuses in the workflow. */
export type WorkflowLayout = {
  /** The x axis location. */
  x?: number;
  /** The y axis location. */
  y?: number;
};

/** The workflow metadata and issue type IDs which use this workflow. */
export type WorkflowMetadataAndIssueTypeRestModel = {
  /** The list of issue type IDs for the mapping. */
  issueTypeIds: (string)[];
  workflow: WorkflowMetadataRestModel;
};

/** Workflow metadata and usage detail. */
export type WorkflowMetadataRestModel = {
  /** The description of the workflow. */
  description: string;
  /** The ID of the workflow. */
  id: string;
  /** The name of the workflow. */
  name: string;
  version: DocumentVersion;
};

/** Operations allowed on a workflow */
export type WorkflowOperations = {
  /** Whether the workflow can be deleted. */
  canDelete: boolean;
  /** Whether the workflow can be updated. */
  canEdit: boolean;
};

/** The payload for creating workflow, see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/\#api-rest-api-3-workflows-create-post */
export type WorkflowPayload = {
  /** The description of the workflow */
  description?: string;
  loopedTransitionContainerLayout?: WorkflowStatusLayoutPayload;
  /** The name of the workflow */
  name?: string;
  /** The strategy to use if there is a conflict with another workflow */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
  startPointLayout?: WorkflowStatusLayoutPayload;
  /** The statuses to be used in the workflow */
  statuses?: (WorkflowStatusPayload)[];
  /** The transitions for the workflow */
  transitions?: (TransitionPayload)[];
};

/** Details of a workflow. */
export type WorkflowPreview = {
  /** The description of the workflow. */
  description?: string;
  /** The ID of the workflow. */
  id?: string;
  loopedTransitionContainerLayout?: WorkflowPreviewLayout;
  /** The name of the workflow. */
  name?: string;
  /** The project and issue type context for this workflow query. */
  queryContext?: (ProjectIssueTypeQueryContext)[];
  scope?: WorkflowPreviewScope;
  startPointLayout?: WorkflowPreviewLayout;
  /** The statuses referenced in this workflow. */
  statuses?: (WorkflowPreviewStatus)[];
  /** The transitions of the workflow. */
  transitions?: (TransitionPreview)[];
  version?: WorkflowDocumentVersionBean;
};

/** Layout coordinates for workflow elements. */
export type WorkflowPreviewLayout = {
  /** The X coordinate. */
  x?: number;
  /** The Y coordinate. */
  y?: number;
};

/** The details of the preview workflow request. */
export type WorkflowPreviewRequest = {
  /** The list of issue type IDs. At most 25 issue type IDs can be specified. */
  issueTypeIds?: (string)[];
  /** The projectId parameter is required and will be used for permission checks. In addition, you must supply at least one of the following lookup terms: *workflowNames*, *workflowIds*, or *issueTypeIds*. The specified workflows must be associated with the given project. */
  projectId: string;
  /** The list of workflow IDs to be returned. At most 25 workflow IDs can be specified. */
  workflowIds?: (string)[];
  /** The list of workflow names to be returned. At most 25 workflow names can be specified. */
  workflowNames?: (string)[];
};

/** The preview workflow response containing workflows and statuses. */
export type WorkflowPreviewResponse = {
  /** The list of statuses referenced by the workflows. */
  statuses?: (JiraWorkflowPreviewStatus)[];
  /** The list of workflows. The workflows are returned in the same order as specified in the request. */
  workflows?: (WorkflowPreview)[];
};

/** The scope of the workflow. */
export type WorkflowPreviewScope = {
  project?: WorkflowProjectIdScope;
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type?: "PROJECT" | "GLOBAL";
};

/** Details about a workflow status in preview context. */
export type WorkflowPreviewStatus = {
  approvalConfiguration?: ApprovalConfigurationPreview;
  /** Whether the status is deprecated. */
  deprecated?: boolean;
  layout?: WorkflowPreviewLayout;
  /** The reference of the status. */
  statusReference?: string;
};

/** Project ID details. */
export type WorkflowProjectIdScope = {
  /** The ID of the project. */
  id?: string;
};

/** The issue type. */
export type WorkflowProjectIssueTypeUsage = {
  /** The ID of the issue type. */
  id?: string;
};

/** Issue types associated with the workflow for a project. */
export type WorkflowProjectIssueTypeUsageDto = {
  issueTypes?: WorkflowProjectIssueTypeUsagePage;
  /** The ID of the project. */
  projectId?: string;
  /** The ID of the workflow. */
  workflowId?: string;
};

/** A page of issue types. */
export type WorkflowProjectIssueTypeUsagePage = {
  /** Token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of issue types. */
  values?: (WorkflowProjectIssueTypeUsage)[];
};

/** Projects using the workflow. */
export type WorkflowProjectUsageDto = {
  projects?: ProjectUsagePage;
  /** The workflow ID. */
  workflowId?: string;
};

export type WorkflowReadRequest = {
  /** The list of projects and issue types to query. */
  projectAndIssueTypes?: (ProjectAndIssueTypePair)[];
  /** The list of workflow IDs to query. */
  workflowIds?: (string)[];
  /** The list of workflow names to query. */
  workflowNames?: (string)[];
};

/** Details of workflows and related statuses. */
export type WorkflowReadResponse = {
  /** List of statuses. */
  statuses?: (JiraWorkflowStatus)[];
  /** List of workflows. */
  workflows?: (JiraWorkflow)[];
};

/** The statuses referenced in the workflow. */
export type WorkflowReferenceStatus = {
  approvalConfiguration?: ApprovalConfiguration;
  /** Indicates if the status is deprecated. */
  deprecated?: boolean;
  layout?: WorkflowStatusLayout;
  /** The properties associated with the status. */
  properties?: { [key: string]: string | undefined };
  /** The reference of the status. */
  statusReference?: string;
};

/** The configuration of the rule. */
export type WorkflowRuleConfiguration = {
  /** The ID of the rule. */
  id?: string | null;
  /** The parameters related to the rule. */
  parameters?: { [key: string]: string | undefined };
  /** The rule key of the rule. */
  ruleKey: string;
};

/** A collection of transition rules. */
export type WorkflowRules = {
  conditionsTree?: WorkflowCondition;
  /** The workflow post functions. */
  postFunctions?: (WorkflowTransitionRule)[];
  /** The workflow validators. */
  validators?: (WorkflowTransitionRule)[];
};

/** Details of the workflow and its transition rules. */
export type WorkflowRulesSearch = {
  /** Use expand to include additional information in the response. This parameter accepts `transition` which, for each rule, returns information about the transition the rule is assigned to. */
  expand?: string;
  /** The list of workflow rule IDs. */
  ruleIds: (string)[];
  /** The workflow ID. */
  workflowEntityId: string;
};

/** Details of workflow transition rules. */
export type WorkflowRulesSearchDetails = {
  /** List of workflow rule IDs that do not belong to the workflow or can not be found. */
  invalidRules?: (string)[];
  /** List of valid workflow transition rules. */
  validRules?: (WorkflowTransitionRules)[];
  /** The workflow ID. */
  workflowEntityId?: string;
};

/** Details about a workflow scheme. */
export type WorkflowScheme = {
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
};

/** The explicit association between issue types and a workflow in a workflow scheme. */
export type WorkflowSchemeAssociation = {
  /** The issue types assigned to the workflow. */
  issueTypeIds: (string)[];
  /** The ID of the workflow. */
  workflowId: string;
};

/** A workflow scheme along with a list of projects that use it. */
export type WorkflowSchemeAssociations = {
  /** The list of projects that use the workflow scheme. */
  projectIds: (string)[];
  /** The workflow scheme. */
  workflowScheme: WorkflowScheme;
};

/** The ID and the name of the workflow scheme. */
export type WorkflowSchemeIdName = {
  /** The ID of the workflow scheme. */
  id: string;
  /** The name of the workflow scheme. */
  name: string;
};

/** The payload for creating a workflow scheme. See https://www.atlassian.com/software/jira/guides/workflows/overview\#what-is-a-jira-workflow-scheme */
export type WorkflowSchemePayload = {
  defaultWorkflow?: ProjectCreateResourceIdentifier;
  /** The description of the workflow scheme */
  description?: string;
  /** Association between issuetypes and workflows */
  explicitMappings?: { [key: string]: ProjectCreateResourceIdentifier | undefined };
  /** The name of the workflow scheme */
  name?: string;
  /** The strategy to use if there is a conflict with another workflow scheme */
  onConflict?: "FAIL" | "USE" | "NEW";
  pcri?: ProjectCreateResourceIdentifier;
};

/** An associated workflow scheme and project. */
export type WorkflowSchemeProjectAssociation = {
  /** The ID of the project. */
  projectId: string;
  /** The ID of the workflow scheme. If the workflow scheme ID is `null`, the operation assigns the default workflow scheme. */
  workflowSchemeId?: string;
};

/** Request to switch a project's workflow scheme */
export type WorkflowSchemeProjectSwitchBean = {
  /** The mappings for migrating issues from old statuses to new statuses when switching from one workflow scheme to another. This field is required if any statuses in the current project's workflows would no longer exist in the target workflow scheme. Each mapping defines how to update issues from an old status to the corresponding new status in the issue’s new workflow. */
  mappingsByIssueTypeOverride?: (MappingsByIssueTypeOverride)[];
  /** The ID of the project to switch the workflow scheme for */
  projectId?: string;
  /** The ID of the target workflow scheme to switch to */
  targetSchemeId?: string;
  [key: string]: unknown;
};

/** Projects using the workflow scheme. */
export type WorkflowSchemeProjectUsageDto = {
  projects?: ProjectUsagePage;
  /** The workflow scheme ID. */
  workflowSchemeId?: string;
};

/** The workflow scheme read request body. */
export type WorkflowSchemeReadRequest = {
  /** The list of project IDs to query. */
  projectIds?: (string | null)[] | null;
  /** The list of workflow scheme IDs to query. */
  workflowSchemeIds?: (string | null)[] | null;
};

export type WorkflowSchemeReadResponse = {
  defaultWorkflow?: WorkflowMetadataRestModel;
  /** The description of the workflow scheme. */
  description?: string | null;
  /** The ID of the workflow scheme. */
  id: string;
  /** The name of the workflow scheme. */
  name: string;
  scope: WorkflowScope;
  /** Indicates if there's an [asynchronous task](#async-operations) for this workflow scheme. */
  taskId?: string | null;
  version: DocumentVersion;
  /** Mappings from workflows to issue types. */
  workflowsForIssueTypes: (WorkflowMetadataAndIssueTypeRestModel)[];
};

/** The update workflow scheme payload. */
export type WorkflowSchemeUpdateRequest = {
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
};

/** The request payload to get the required mappings for updating a workflow scheme. */
export type WorkflowSchemeUpdateRequiredMappingsRequest = {
  /** The ID of the new default workflow for this workflow scheme. Only used in global-scoped workflow schemes. If it isn't specified, is set to *Jira Workflow (jira)*. */
  defaultWorkflowId?: string | null;
  /** The ID of the workflow scheme. */
  id: string;
  /** The new workflow to issue type mappings for this workflow scheme. */
  workflowsForIssueTypes: (WorkflowSchemeAssociation)[];
};

export type WorkflowSchemeUpdateRequiredMappingsResponse = {
  /** The list of required status mappings by issue type. */
  statusMappingsByIssueTypes?: (RequiredMappingByIssueType)[];
  /** The list of required status mappings by workflow. */
  statusMappingsByWorkflows?: (RequiredMappingByWorkflows)[];
  /** The details of the statuses in the associated workflows. */
  statuses?: (StatusMetadata)[];
  /** The statuses associated with each workflow. */
  statusesPerWorkflow?: (StatusesPerWorkflow)[];
};

/** The worflow scheme. */
export type WorkflowSchemeUsage = {
  /** The workflow scheme ID. */
  id?: string;
};

/** Workflow schemes using the workflow. */
export type WorkflowSchemeUsageDto = {
  /** The workflow ID. */
  workflowId?: string;
  workflowSchemes?: WorkflowSchemeUsagePage;
};

/** A page of workflow schemes. */
export type WorkflowSchemeUsagePage = {
  /** Token for the next page of issue type usages. */
  nextPageToken?: string;
  /** The list of workflow schemes. */
  values?: (WorkflowSchemeUsage)[];
};

/** The scope of the workflow. */
export type WorkflowScope = {
  project?: ProjectId;
  /** The scope of the workflow. `GLOBAL` for company-managed projects and `PROJECT` for team-managed projects. */
  type?: "PROJECT" | "GLOBAL";
};

/** Page of items, including workflows and related statuses. */
export type WorkflowSearchResponse = {
  /** Whether this is the last page. */
  isLast?: boolean;
  /** The maximum number of items that could be returned. */
  maxResults?: number;
  /** If there is another page of results, the URL of the next page. */
  nextPage?: string;
  /** The URL of the page. */
  self?: string;
  /** The index of the first item returned. */
  startAt?: number;
  /** List of statuses. */
  statuses?: (JiraWorkflowStatus)[];
  /** The number of items returned. */
  total?: number;
  /** List of workflows. */
  values?: (JiraWorkflow)[];
};

/** A workflow transition rule condition. This object returns `nodeType` as `simple`. */
export type WorkflowSimpleCondition = {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: { [key: string]: unknown };
  nodeType: string;
  /** The type of the transition rule. */
  type: string;
};

/** Details of a workflow status. */
export type WorkflowStatus = {
  /** The ID of the issue status. */
  id: string;
  /** The name of the status in the workflow. */
  name: string;
  /** Additional properties that modify the behavior of issues in this status. Supports the properties `jira.issue.editable` and `issueEditable` (deprecated) that indicate whether issues are editable. */
  properties?: { [key: string]: unknown | undefined };
};

/** The x and y location of the status in the workflow. */
export type WorkflowStatusLayout = {
  /** The x axis location. */
  x?: number | null;
  /** The y axis location. */
  y?: number | null;
};

/** The layout of the workflow status. */
export type WorkflowStatusLayoutPayload = {
  /** The x coordinate of the status. */
  x?: number;
  /** The y coordinate of the status. */
  y?: number;
};

/** The statuses to be used in the workflow */
export type WorkflowStatusPayload = {
  layout?: WorkflowStatusLayoutPayload;
  pcri?: ProjectCreateResourceIdentifier;
  /** The properties of the workflow status. */
  properties?: { [key: string]: string | undefined };
};

/** Details of the status being updated. */
export type WorkflowStatusUpdate = {
  /** The description of the status. */
  description?: string;
  /** The ID of the status. When reusing an existing status, this field should be provided. */
  id?: string;
  /** The name of the status. */
  name: string;
  /** The category of the status. */
  statusCategory: "TODO" | "IN_PROGRESS" | "DONE";
  /** The reference of the status. If adding a new status to a team-managed workflow, this must be a UUID (for company-managed a UUID is not needed). */
  statusReference: string;
  [key: string]: unknown;
};

/** A workflow transition. */
export type WorkflowTransition = {
  /** The transition ID. */
  id: number;
  /** The transition name. */
  name: string;
};

/** The statuses the transition can start from, and the mapping of ports between the statuses. */
export type WorkflowTransitionLinks = {
  /** The port that the transition starts from. */
  fromPort?: number | null;
  /** The status that the transition starts from. */
  fromStatusReference?: string | null;
  /** The port that the transition goes to. */
  toPort?: number | null;
};

/** Details about the server Jira is running on. */
export type WorkflowTransitionProperty = {
  /** The ID of the transition property. */
  id?: string;
  /** The key of the transition property. Also known as the name of the transition property. */
  key?: string;
  /** The value of the transition property. */
  value: string;
  [key: string]: unknown;
};

/** A workflow transition rule. */
export type WorkflowTransitionRule = {
  /** EXPERIMENTAL. The configuration of the transition rule. */
  configuration?: unknown;
  /** The type of the transition rule. */
  type: string;
};

/** A workflow with transition rules. */
export type WorkflowTransitionRules = {
  /** The list of conditions within the workflow. */
  conditions?: (AppWorkflowTransitionRule)[];
  /** The list of post functions within the workflow. */
  postFunctions?: (AppWorkflowTransitionRule)[];
  /** The list of validators within the workflow. */
  validators?: (AppWorkflowTransitionRule)[];
  workflowId: WorkflowId;
};

/** Details about a workflow configuration update request. */
export type WorkflowTransitionRulesDetails = {
  workflowId: WorkflowId;
  /** The list of connect workflow rule IDs. */
  workflowRuleIds: (string)[];
};

/** Details about a workflow configuration update request. */
export type WorkflowTransitionRulesUpdate = {
  /** The list of workflows with transition rules to update. */
  workflows: (WorkflowTransitionRules)[];
};

/** Details of any errors encountered while updating workflow transition rules for a workflow. */
export type WorkflowTransitionRulesUpdateErrorDetails = {
  /** A list of transition rule update errors, indexed by the transition rule ID. Any transition rule that appears here wasn't updated. */
  ruleUpdateErrors: { [key: string]: (string)[] | undefined };
  /** The list of errors that specify why the workflow update failed. The workflow was not updated if the list contains any entries. */
  updateErrors: (string)[];
  workflowId: WorkflowId;
};

/** Details of any errors encountered while updating workflow transition rules. */
export type WorkflowTransitionRulesUpdateErrors = {
  /** A list of workflows. */
  updateResults: (WorkflowTransitionRulesUpdateErrorDetails)[];
};

/** The transitions of the workflow. */
export type WorkflowTransitions = {
  /** The post-functions of the transition. */
  actions?: (WorkflowRuleConfiguration)[];
  conditions?: ConditionGroupConfiguration;
  /** The custom event ID of the transition. */
  customIssueEventId?: string | null;
  /** The description of the transition. */
  description?: string;
  /** The ID of the transition. */
  id?: string;
  /** The statuses the transition can start from, and the mapping of ports between the statuses. */
  links?: (WorkflowTransitionLinks)[];
  /** The name of the transition. */
  name?: string;
  /** The properties of the transition. */
  properties?: { [key: string]: string | undefined };
  /** The status the transition goes to. */
  toStatusReference?: string;
  transitionScreen?: WorkflowRuleConfiguration;
  /** The triggers of the transition. */
  triggers?: (WorkflowTrigger)[];
  /** The transition type. */
  type?: "INITIAL" | "GLOBAL" | "DIRECTED";
  /** The validators of the transition. */
  validators?: (WorkflowRuleConfiguration)[];
};

/** The trigger configuration associated with a workflow. */
export type WorkflowTrigger = {
  /** The ID of the trigger. */
  id?: string;
  /** The parameters of the trigger. */
  parameters: { [key: string]: string | undefined };
  /** The rule key of the trigger. */
  ruleKey: string;
};

/** The details of the workflows to update. */
export type WorkflowUpdate = {
  /** The mapping of old to new status ID. */
  defaultStatusMappings?: (StatusMigration)[];
  /** The new description for this workflow. */
  description?: string;
  /** The ID of this workflow. */
  id: string;
  loopedTransitionContainerLayout?: WorkflowLayout;
  startPointLayout?: WorkflowLayout;
  /** The mapping of old to new status ID for a specific project and issue type. */
  statusMappings?: (StatusMappingDto)[];
  /** The statuses associated with this workflow. */
  statuses: (StatusLayoutUpdate)[];
  /** The transitions of this workflow. */
  transitions: (TransitionUpdateDto)[];
  version: DocumentVersion;
  [key: string]: unknown;
};

/** The update workflows payload. */
export type WorkflowUpdateRequest = {
  /** The statuses to associate with the workflows. */
  statuses?: (WorkflowStatusUpdate)[];
  /** The details of the workflows to update. */
  workflows?: (WorkflowUpdate)[];
};

export type WorkflowUpdateResponse = {
  /** List of updated statuses. */
  statuses?: (JiraWorkflowStatus)[];
  /** If there is a [asynchronous task](#async-operations) operation, as a result of this update. */
  taskId?: string | null;
  /** List of updated workflows. */
  workflows?: (JiraWorkflow)[];
};

export type WorkflowUpdateValidateRequestBean = {
  payload: WorkflowUpdateRequest;
  validationOptions?: ValidationOptionsForUpdate;
};

/** The details about a workflow validation error. */
export type WorkflowValidationError = {
  /** Additional details about the validation error. */
  additionalDetails?: string;
  /** An error code. */
  code?: string;
  elementReference?: WorkflowElementReference;
  /** The validation error level. */
  level?: "WARNING" | "ERROR";
  /** An error message. */
  message?: string;
  /** The type of element the error or warning references. */
  type?: "RULE" | "STATUS" | "STATUS_LAYOUT" | "STATUS_PROPERTY" | "WORKFLOW" | "TRANSITION" | "TRANSITION_PROPERTY" | "SCOPE" | "STATUS_MAPPING" | "TRIGGER";
};

export type WorkflowValidationErrorList = {
  /** The list of validation errors. */
  errors?: (WorkflowValidationError)[];
};

/** Details of workflows and their transition rules to delete. */
export type WorkflowsWithTransitionRulesDetails = {
  /** The list of workflows with transition rules to delete. */
  workflows: (WorkflowTransitionRulesDetails)[];
};

/** Working days configuration */
export type WorkingDaysConfig = {
  friday?: boolean;
  id?: number;
  monday?: boolean;
  nonWorkingDays?: (NonWorkingDay)[];
  saturday?: boolean;
  sunday?: boolean;
  thursday?: boolean;
  timezoneId?: string;
  tuesday?: boolean;
  wednesday?: boolean;
};

/** Details of a worklog. */
export type Worklog = {
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
  [key: string]: unknown;
};

export type WorklogCompositeKey = {
  /** The issue ID. */
  issueId?: number;
  /** The worklog ID. */
  worklogId?: number;
};

export type WorklogIdsRequestBean = {
  /** A list of worklog IDs. */
  ids: (number)[];
};

export type WorklogKeyResult = {
  /** The issue ID. */
  issueId?: number;
  /** The worklog ID. */
  worklogId?: number;
};

export type WorklogsMoveRequestBean = {
  /** A list of worklog IDs. */
  ids?: (number)[];
  /** The issue id or key of the destination issue */
  issueIdOrKey?: string;
};

/** Details about data policy. */
export type WorkspaceDataPolicy = {
  /** Whether the workspace contains any content inaccessible to the requesting application. */
  anyContentBlocked?: boolean;
};

/** Can contain multiple field values of following types depending on `type` key */
export type Fields2 = {
  /** If `true`, will try to retain original non-null issue field values on move. */
  retain?: boolean | null;
  type?: "adf" | "raw";
  value?: { [key: string]: unknown };
};

/** Classification mapping for classifications in source issues to respective target classification. */
export type TargetClassification = {
  /** An object with the key as the ID of the target classification and value with the list of the IDs of the current source classifications. */
  classifications: { [key: string]: (string)[] | undefined };
  /** ID of the source issueType to which issues present in `issueIdOrKeys` belongs. */
  issueType?: string;
  /** ID or key of the source project to which issues present in `issueIdOrKeys` belongs. */
  projectKeyOrId?: string;
};

/** Field mapping for mandatory fields in target */
export type TargetMandatoryFields = {
  /** Contains the value of mandatory fields */
  fields: { [key: string]: Fields2 | undefined };
};

/** Status mapping for statuses in source workflow to respective target status in target workflow. */
export type TargetStatus = {
  /** An object with the key as the ID of the target status and value with the list of the IDs of the current source statuses. */
  statuses: { [key: string]: (string)[] | undefined };
};

/** An object representing the mapping of issues and data related to destination entities, like fields and statuses, that are required during a bulk move. */
export type TargetToSourcesMapping = {
  /** If `true`, when issues are moved into this target group, they will adopt the target project's default classification, if they don't have a classification already. If they do have a classification, it will be kept the same even after the move. Leave `targetClassification` empty when using this.  If `false`, you must provide a `targetClassification` mapping for each classification associated with the selected issues.  [Benefit from data classification](https://support.atlassian.com/security-and-access-policies/docs/what-is-data-classification/) */
  inferClassificationDefaults: boolean;
  /** If `true`, values from the source issues will be retained for the mandatory fields in the field configuration of the destination project. The `targetMandatoryFields` property shouldn't be defined.  If `false`, the user is required to set values for mandatory fields present in the field configuration of the destination project. Provide input by defining the `targetMandatoryFields` property */
  inferFieldDefaults: boolean;
  /** If `true`, the statuses of issues being moved in this target group that are not present in the target workflow will be changed to the default status of the target workflow (see below). Leave `targetStatus` empty when using this.  If `false`, you must provide a `targetStatus` for each status not present in the target workflow.  The default status in a workflow is referred to as the "initial status". Each workflow has its own unique initial status. When an issue is created, it is automatically assigned to this initial status. Read more about configuring initial statuses: [Configure the initial status | Atlassian Support.](https://support.atlassian.com/jira-cloud-administration/docs/configure-the-initial-status/) */
  inferStatusDefaults: boolean;
  /** When an issue is moved, its subtasks (if there are any) need to be moved with it. `inferSubtaskTypeDefault` helps with moving the subtasks by picking a random subtask type in the target project.  If `true`, subtasks will automatically move to the same project as their parent.  When they move:   *  Their `issueType` will be set to the default for subtasks in the target project.  *  Values for mandatory fields will be retained from the source issues  *  Specifying separate mapping for implicit subtasks won’t be allowed.  If `false`, you must manually move the subtasks. They will retain the parent which they had in the current project after being moved. */
  inferSubtaskTypeDefault: boolean;
  /** List of issue IDs or keys to be moved. */
  issueIdsOrKeys?: (string)[];
  /** List of the objects containing classifications in the source issues and their new values which need to be set during the bulk move operation.  It is mandatory to provide source classification to target classification mapping when the source classification is invalid for the target project and issue type.   *  **You should only define this property when `inferClassificationDefaults` is `false`.**  *  **In order to provide mapping for issues which don't have a classification, use `"-1"`.** */
  targetClassification?: (TargetClassification)[] | null;
  /** List of objects containing mandatory fields in the target field configuration and new values that need to be set during the bulk move operation.  The new values will only be applied if the field is mandatory in the target project and at least one issue from the source has that field empty, or if the field context is different in the target project (e.g. project-scoped version fields).  **You should only define this property when `inferFieldDefaults` is `false`.** */
  targetMandatoryFields?: (TargetMandatoryFields)[] | null;
  /** List of the objects containing statuses in the source workflow and their new values which need to be set during the bulk move operation.  The new values will only be applied if the source status is invalid for the target project and issue type.  It is mandatory to provide source status to target status mapping when the source status is invalid for the target project and issue type.  **You should only define this property when `inferStatusDefaults` is `false`.** */
  targetStatus?: (TargetStatus)[] | null;
};
