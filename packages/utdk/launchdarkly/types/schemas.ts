export type AiConfigRep = {
  /** The key of the AI Config */
  key: string;
  /** The name of the AI Config */
  name: string;
};

export type Access = {
  denied: (AccessDenied)[];
  allowed: (AccessAllowedRep)[];
};

export type AccessAllowedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type AccessAllowedRep = {
  action: ActionIdentifier;
  reason: AccessAllowedReason;
};

export type AccessDenied = {
  action: ActionIdentifier;
  reason: AccessDeniedReason;
};

export type AccessDeniedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type AccessTokenPost = {
  /** A human-friendly name for the access token */
  name?: string;
  /** A description for the access token */
  description?: string;
  /** Base role for the token */
  role?: "reader" | "writer" | "admin";
  /** A list of custom role IDs to use as access limits for the access token */
  customRoleIds?: (string)[];
  /** A JSON array of statements represented as JSON objects with three attributes: effect, resources, actions. May be used in place of a role. */
  inlineRole?: (StatementPost)[];
  /** Whether the token is a service token */
  serviceToken?: boolean;
  /** The default API version for this token */
  defaultApiVersion?: number;
};

export type ActionIdentifier = string;

export type ActionInput = {
  /** An array of instructions for the stage. Each object in the array uses the semantic patch format for updating a feature flag. */
  instructions?: unknown;
};

export type ActionOutput = {
  /** The type of action for this stage */
  kind: string;
  /** An array of instructions for the stage. Each object in the array uses the semantic patch format for updating a feature flag. */
  instructions: Instructions;
};

export type ActionSpecifier = string;

export type AllVariationsSummary = { [key: string]: VariationSummary | undefined };

export type AnalysisConfigInput = {
  /** The threshold for the Probability to Beat Baseline (PBBL) and Probability to Be Best (PBB) comparisons for the Bayesian results analysis approach. */
  bayesianThreshold?: string;
  /** The significance threshold for the frequentist results analysis approach. */
  significanceThreshold?: string;
  /** The test sided direction for the frequentist results analysis approach. */
  testDirection?: string;
  /** The method to use for multiple comparison correction. */
  multipleComparisonCorrectionMethod?: "bonferroni" | "benjamini-hochberg";
  /** The scope of the multiple comparison correction. */
  multipleComparisonCorrectionScope?: "variations" | "variations-and-metrics" | "metrics";
  /** Whether sequential testing is enabled for Frequentist analysis */
  sequentialTestingEnabled?: boolean;
};

export type AnalysisConfigRep = {
  /** The threshold for the Probability to Beat Baseline (PBBL) and Probability to Be Best (PBB) comparisons for the Bayesian results analysis approach.  Value should be between 0-100 inclusive. */
  bayesianThreshold?: string;
  /** The significance threshold for the frequentist results analysis approach. Value should be between 0.0-1.0 inclusive. */
  significanceThreshold?: string;
  /** The test sided direction for the frequentist results analysis approach. */
  testDirection?: string;
  /** The method for multiple comparison correction. */
  multipleComparisonCorrectionMethod?: "bonferroni" | "benjamini-hochberg";
  /** The scope for multiple comparison correction. */
  multipleComparisonCorrectionScope?: "variations" | "variations-and-metrics" | "metrics";
  /** Whether sequential testing is enabled for Frequentist analysis */
  sequentialTestingEnabled?: boolean;
};

export type ApplicationCollectionRep = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** A list of applications */
  items?: (ApplicationRep)[];
  /** The number of applications */
  totalCount?: number;
};

export type ApplicationFlagCollectionRep = {
  /** A list of the flags that have been evaluated by the application */
  items?: (FlagListingRep)[];
  /** The number of flags that have been evaluated by the application */
  totalCount?: number;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type ApplicationMaintainerRep = {
  /** Details on the member who maintains this resource */
  member?: MemberSummary;
  /** Details on the team that maintains this resource */
  team?: MemberTeamSummaryRep;
};

export type ApplicationRep = {
  /** Details about the flags that have been evaluated by the application */
  flags?: ApplicationFlagCollectionRep;
  /** Details on the allowed and denied actions for this application */
  _access?: Access;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Version of the application */
  _version?: number;
  /** Whether the application was automatically created because it was included in a context when a LaunchDarkly SDK evaluated a feature flag, or was created through the LaunchDarkly UI or REST API. */
  autoAdded: boolean;
  /** Timestamp of when the application version was created */
  creationDate?: UnixMillis;
  /** The application description */
  description?: string;
  /** The unique identifier of this application */
  key: string;
  /** To distinguish the kind of application */
  kind: "browser" | "mobile" | "server";
  /** Associated maintainer member or team info for the application */
  _maintainer?: ApplicationMaintainerRep;
  /** The name of the application */
  name: string;
};

export type ApplicationVersionRep = {
  /** Details on the allowed and denied actions for this application version */
  _access?: Access;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Version of the application version */
  _version?: number;
  /** Whether the application version was automatically created, because it was included in a context when a LaunchDarkly SDK evaluated a feature flag, or if the application version was created through the LaunchDarkly UI or REST API.  */
  autoAdded: boolean;
  /** Timestamp of when the application version was created */
  creationDate?: UnixMillis;
  /** The unique identifier of this application version */
  key: string;
  /** The name of this version */
  name: string;
  /** Whether this version is supported. Only applicable if the application <code>kind</code> is <code>mobile</code>. */
  supported?: boolean;
};

export type ApplicationVersionsCollectionRep = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** A list of the versions for this application */
  items?: (ApplicationVersionRep)[];
  /** The number of versions for this application */
  totalCount?: number;
};

export type ApprovalRequestResponse = {
  /** The ID of this approval request */
  _id: string;
  /** Version of the approval request */
  _version: number;
  /** Timestamp of when the approval request was created */
  creationDate: UnixMillis;
  /** The approval service for this request. May be LaunchDarkly or an external approval service, such as ServiceNow or JIRA. */
  serviceKind: ApprovalRequestServiceKind;
  /** The ID of the member who requested the approval */
  requestorId?: string;
  /** A human-friendly name for the approval request */
  description?: string;
  /** Current status of the review of this approval request */
  reviewStatus: "approved" | "declined" | "pending";
  /** An array of individual reviews of this approval request */
  allReviews: (ReviewResponse)[];
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds: (string)[];
  /** Timestamp of when the approval request was applied */
  appliedDate?: UnixMillis;
  /** The member ID of the member who applied the approval request */
  appliedByMemberId?: string;
  /** The service token ID of the service token which applied the approval request */
  appliedByServiceTokenId?: string;
  /** Current status of the approval request */
  status: "pending" | "completed" | "failed" | "scheduled";
  /** List of instructions in semantic patch format to be applied to the feature flag */
  instructions: Instructions;
  /** Details on any conflicting approval requests */
  conflicts: (Conflict)[];
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** Timestamp for when instructions will be executed */
  executionDate?: UnixMillis;
  /** ID of scheduled change to edit or delete */
  operatingOnId?: string;
  /** Details about the object in an external service corresponding to this approval request, such as a ServiceNow change request or a JIRA ticket, if an external approval service is being used */
  integrationMetadata?: IntegrationMetadata;
  /** Details about the source feature flag, if copied */
  source?: CopiedFromEnv;
  /** Details about the custom workflow, if this approval request is part of a custom workflow */
  customWorkflowMetadata?: CustomWorkflowMeta;
  /** String representation of a resource */
  resourceId?: string;
  /** The settings for this approval */
  approvalSettings?: ApprovalSettings;
};

export type ApprovalRequestServiceKind = string;

export type ApprovalSettings = {
  /** If approvals are required for this environment */
  required: boolean;
  /** Whether to skip approvals for pending changes */
  bypassApprovalsForPendingChanges: boolean;
  /** Sets the amount of approvals required before a member can apply a change. The minimum is one and the maximum is five. */
  minNumApprovals: number;
  /** Allow someone who makes an approval request to apply their own change */
  canReviewOwnRequest: boolean;
  /** Allow applying the change as long as at least one person has approved */
  canApplyDeclinedChanges: boolean;
  /** Automatically apply changes that have been approved by all reviewers. This field is only applicable for approval services other than LaunchDarkly. */
  autoApplyApprovedChanges?: boolean;
  /** Which service to use for managing approvals */
  serviceKind: string;
  serviceConfig: { [key: string]: unknown | undefined };
  /** Require approval only on flags with the provided tags. Otherwise all flags will require approval. */
  requiredApprovalTags: (string)[];
  /** Optional field for integration configuration ID of a custom approval integration. This is an Enterprise-only feature. */
  serviceKindConfigurationId?: string;
};

export type ApprovalsCapabilityConfig = {
  /** The additional form variables for the approvals capability */
  additionalFormVariables?: (FormVariable)[];
};

export type AssignedToRep = {
  /** The number of individual members this role is assigned to */
  membersCount?: number;
  /** The number of teams this role is assigned to */
  teamsCount?: number;
};

export type Audience = {
  /** Details about the environment. When the environment has been deleted, this field is omitted. */
  environment?: EnvironmentSummary;
  /** The release phase name */
  name: string;
  /** The configuration for the audience's rollout. */
  configuration?: AudienceConfiguration;
  /** A list of segment keys */
  segmentKeys?: (string)[];
};

export type AudienceConfiguration = {
  /** The release strategy */
  releaseStrategy: ReleaseStrategy;
  /** Whether or not the audience requires approval */
  requireApproval: boolean;
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds?: (string)[];
  /** An array of team keys. The members of these teams are notified to review the approval request. */
  notifyTeamKeys?: (string)[];
  /** The configuration for the release guardian. */
  releaseGuardianConfiguration?: ReleaseGuardianConfiguration;
};

export type AudiencePost = {
  /** A project-unique key for the environment. */
  environmentKey: string;
  /** The audience name */
  name: string;
  /** Segments targeted by this audience. */
  segmentKeys?: (string)[];
  /** The configuration for the audience's rollout. */
  configuration?: AudienceConfiguration;
};

export type AudienceStatus = string;

export type Audiences = (Audience)[];

export type AuditLogEntryListingRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID of the audit log entry */
  _id: string;
  /** The ID of the account to which this audit log entry belongs */
  _accountId: string;
  /** Timestamp of the audit log entry */
  date: UnixMillis;
  /** Details on the actions performed and resources acted on in this audit log entry */
  accesses: (ResourceAccess)[];
  /** The type of resource this audit log entry refers to */
  kind: ResourceKind;
  /** The name of the resource this audit log entry refers to */
  name: string;
  /** Description of the change recorded in the audit log entry */
  description: string;
  /** Shorter version of the change recorded in the audit log entry */
  shortDescription: string;
  /** Optional comment for the audit log entry */
  comment?: string;
  /** Flag that this audit log entry updated as a side effect */
  relatedFlag?: RelatedFlag;
  /** Details of the subject who initiated the action described in the audit log entry */
  subject?: SubjectDataRep;
  /** Details of the member who initiated the action described in the audit log entry */
  member?: MemberDataRep;
  /** Details of the access token that initiated the action described in the audit log entry */
  token?: TokenSummary;
  /** Details of the authorized application that initiated the action described in the audit log entry */
  app?: AuthorizedAppDataRep;
  /** The action and resource recorded in this audit log entry */
  titleVerb?: string;
  /** A description of what occurred, in the format <code>member</code> <code>titleVerb</code> <code>target</code> */
  title?: string;
  /** Details of the resource acted upon in this audit log entry */
  target?: TargetResourceRep;
  parent?: ParentResourceRep;
};

export type AuditLogEntryListingRepCollection = {
  /** An array of audit log entries */
  items: (AuditLogEntryListingRep)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type AuditLogEntryRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID of the audit log entry */
  _id: string;
  /** The ID of the account to which this audit log entry belongs */
  _accountId: string;
  /** Timestamp of the audit log entry */
  date: UnixMillis;
  /** Details on the actions performed and resources acted on in this audit log entry */
  accesses: (ResourceAccess)[];
  /** The type of resource this audit log entry refers to */
  kind: ResourceKind;
  /** The name of the resource this audit log entry refers to */
  name: string;
  /** Description of the change recorded in the audit log entry */
  description: string;
  /** Shorter version of the change recorded in the audit log entry */
  shortDescription: string;
  /** Optional comment for the audit log entry */
  comment?: string;
  /** Flag that this audit log entry updated as a side effect */
  relatedFlag?: RelatedFlag;
  /** Details of the subject who initiated the action described in the audit log entry */
  subject?: SubjectDataRep;
  /** Details of the member who initiated the action described in the audit log entry */
  member?: MemberDataRep;
  /** Details of the access token that initiated the action described in the audit log entry */
  token?: TokenSummary;
  /** Details of the authorized application that initiated the action described in the audit log entry */
  app?: AuthorizedAppDataRep;
  /** The action and resource recorded in this audit log entry */
  titleVerb?: string;
  /** A description of what occurred, in the format <code>member</code> <code>titleVerb</code> <code>target</code> */
  title?: string;
  /** Details of the resource acted upon in this audit log entry */
  target?: TargetResourceRep;
  parent?: ParentResourceRep;
  /** If the audit log entry has been updated, this is the JSON patch body that was used in the request to update the entity */
  delta?: unknown;
  /** A JSON representation of the external trigger for this audit log entry, if any */
  triggerBody?: unknown;
  /** A JSON representation of the merge information for this audit log entry, if any */
  merge?: unknown;
  /** If the audit log entry has been updated, this is a JSON representation of the previous version of the entity */
  previousVersion?: unknown;
  /** If the audit log entry has been updated, this is a JSON representation of the current version of the entity */
  currentVersion?: unknown;
  subentries?: (AuditLogEntryListingRep)[];
};

export type AuditLogEventsHookCapabilityConfigPost = {
  /** The set of resources you wish to subscribe to audit log notifications for. */
  statements?: StatementPostList;
};

export type AuditLogEventsHookCapabilityConfigRep = {
  /** The set of resources you wish to subscribe to audit log notifications for. */
  statements?: (Statement)[];
};

export type AuthorizedAppDataRep = {
  _links?: { [key: string]: Link | undefined };
  /** The ID of the authorized application */
  _id?: string;
  /** Whether the application is authorized through SCIM */
  isScim?: boolean;
  /** The authorized application name */
  name?: string;
  /** The name of the maintainer for this authorized application */
  maintainerName?: string;
};

export type BigSegmentStoreIntegration = {
  /** The location and content type of related resources */
  _links: BigSegmentStoreIntegrationLinks;
  /** The integration ID */
  _id: string;
  /** The integration key */
  integrationKey: "redis" | "dynamodb";
  /** The project key */
  projectKey: string;
  /** The environment key */
  environmentKey: string;
  /** The delivery configuration for the given integration provider. Only included when requesting a single integration by ID. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> for a full list of fields for each integration. */
  config: FormVariableConfig;
  /** Whether the configuration is turned on */
  on: boolean;
  /** List of tags for this configuration */
  tags: (string)[];
  /** Name of the configuration */
  name: string;
  /** Version of the current configuration */
  version: number;
  /** Details on the allowed and denied actions for this configuration */
  _access?: Access;
  /** Details on the connection status of the persistent store integration */
  _status: BigSegmentStoreStatus;
};

export type BigSegmentStoreIntegrationCollection = {
  /** The location and content type of related resources */
  _links: BigSegmentStoreIntegrationCollectionLinks;
  /** An array of persistent store integration configurations */
  items: (BigSegmentStoreIntegration)[];
};

export type BigSegmentStoreIntegrationCollectionLinks = {
  self: Link;
  parent?: Link;
};

export type BigSegmentStoreIntegrationLinks = {
  self: Link;
  parent: Link;
  project: Link;
  environment: Link;
};

export type BigSegmentStoreStatus = {
  /** Whether the persistent store integration is fully synchronized with the LaunchDarkly environment, and the <code>lastSync</code> occurred within a few minutes */
  available?: boolean;
  /** Whether the persistent store integration may not be fully synchronized with the LaunchDarkly environment. <code>true</code> if the integration could be stale. */
  potentiallyStale?: boolean;
  /** Timestamp of when the most recent successful sync occurred between the persistent store integration and the LaunchDarkly environment. */
  lastSync?: UnixMillis;
  /** Timestamp of when the most recent synchronization error occurred, if any */
  lastError?: UnixMillis;
  errors?: (StoreIntegrationError)[];
};

export type BigSegmentTarget = {
  /** The target key */
  userKey: string;
  /** Indicates whether the target is included.<br />Included targets are always segment members, regardless of segment rules. */
  included: boolean;
  /** Indicates whether the target is excluded.<br />Segment rules bypass excluded targets, so they will never be included based on rules. Excluded targets may still be included explicitly. */
  excluded: boolean;
};

export type BooleanDefaults = {
  /** The display name for the true variation, displayed in the LaunchDarkly user interface */
  trueDisplayName?: string;
  /** The display name for the false variation, displayed in the LaunchDarkly user interface */
  falseDisplayName?: string;
  /** The description for the true variation */
  trueDescription?: string;
  /** The description for the false variation */
  falseDescription?: string;
  /** The variation index of the flag variation to use for the default targeting behavior when a flag's targeting is on and the target did not match any rules */
  onVariation?: number;
  /** The variation index of the flag variation to use for the default targeting behavior when a flag's targeting is off */
  offVariation?: number;
};

export type BooleanFlagDefaults = {
  /** The display name for the true variation, displayed in the LaunchDarkly user interface */
  trueDisplayName: string;
  /** The display name for the false variation, displayed in the LaunchDarkly user interface */
  falseDisplayName: string;
  /** The description for the true variation */
  trueDescription: string;
  /** The description for the false variation */
  falseDescription: string;
  /** The variation index of the flag variation to use for the default targeting behavior when a flag's targeting is on and the target did not match any rules */
  onVariation: number;
  /** The variation index of the flag variation to use for the default targeting behavior when a flag's targeting is off */
  offVariation: number;
};

export type BranchCollectionRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** An array of branches */
  items: (BranchRep)[];
};

export type BranchRep = {
  /** The branch name */
  name: string;
  /** An ID representing the branch HEAD. For example, a commit SHA. */
  head: string;
  /** An optional ID used to prevent older data from overwriting newer data */
  updateSequenceId?: number;
  /** A timestamp indicating when the branch was last synced */
  syncTime: UnixMillis;
  /** An array of flag references found on the branch */
  references?: (ReferenceRep)[];
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
};

export type BulkEditMembersRep = {
  /** A list of members IDs of the members who were successfully updated. */
  members?: (string)[];
  /** A list of member IDs and errors for the members whose updates failed. */
  errors?: ({ [key: string]: string | undefined })[];
};

export type BulkEditTeamsRep = {
  /** A list of member IDs of the members who were added to the teams. */
  memberIDs?: (string)[];
  /** A list of team keys of the teams that were successfully updated. */
  teamKeys?: (string)[];
  /** A list of team keys and errors for the teams whose updates failed. */
  errors?: ({ [key: string]: string | undefined })[];
};

export type CallerIdentityRep = {
  accountId?: string;
  environmentId?: string;
  projectId?: string;
  environmentName?: string;
  projectName?: string;
  authKind?: string;
  tokenKind?: string;
  clientId?: string;
  tokenName?: string;
  tokenId?: string;
  memberId?: string;
  serviceToken?: boolean;
  scopes?: (string)[];
};

export type CapabilityConfigPost = {
  /** The approvals capability configuration for this integration */
  approvals?: ApprovalsCapabilityConfig;
  /** The audit log events hook capability configuration for the integration */
  auditLogEventsHook?: AuditLogEventsHookCapabilityConfigPost;
};

export type CapabilityConfigRep = {
  /** The approvals capability configuration for this integration */
  approvals?: ApprovalsCapabilityConfig;
  /** The audit log events hook capability configuration for the integration */
  auditLogEventsHook?: AuditLogEventsHookCapabilityConfigRep;
};

export type Clause = {
  _id?: string;
  attribute: string;
  op: Operator;
  values: (unknown)[];
  contextKind?: string;
  negate: boolean;
};

export type Client = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Client name */
  name: string;
  /** Client description */
  description?: string;
  /** The account ID the client is registered under */
  _accountId: string;
  /** The client's unique ID */
  _clientId: string;
  /** The client secret. This will only be shown upon creation. */
  _clientSecret?: string;
  /** The client's redirect URI */
  redirectUri: string;
  /** Timestamp of client creation date */
  _creationDate: UnixMillis;
};

export type ClientCollection = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** List of client objects */
  items: (Client)[];
};

export type ClientSideAvailability = {
  usingMobileKey?: boolean;
  usingEnvironmentId?: boolean;
};

export type ClientSideAvailabilityPost = {
  /** Whether to enable availability for client-side SDKs. Defaults to <code>false</code>. */
  usingEnvironmentId: boolean;
  /** Whether to enable availability for mobile SDKs. Defaults to <code>true</code>. */
  usingMobileKey: boolean;
};

export type CompletedBy = {
  /** The LaunchDarkly member who marked this phase as complete */
  member?: MemberSummary;
  /** The service token used to mark this phase as complete */
  token?: TokenSummary;
};

export type ConditionInput = {
  /** Whether the scheduled execution of the workflow stage is relative or absolute. If relative, the <code>waitDuration</code> and <code>waitDurationUnit</code> specify when the execution occurs. If absolute, the <code>executionDate</code> specifies when the execution occurs. */
  scheduleKind?: ScheduleKind;
  /** For workflow stages whose scheduled execution is absolute, the time, in Unix milliseconds, when the stage should start. */
  executionDate?: UnixMillis;
  /** For workflow stages whose scheduled execution is relative, how far in the future the stage should start. */
  waitDuration?: number;
  /** For workflow stages whose scheduled execution is relative, the unit of measure for the <code>waitDuration</code>. */
  waitDurationUnit?: DurationUnit;
  /** Whether the workflow stage should be executed immediately */
  executeNow?: boolean;
  /** A description of the approval required for this stage */
  description?: string;
  /** A list of member IDs for the members to request approval from for this stage */
  notifyMemberIds?: (string)[];
  /** A list of team keys for the teams to request approval from for this stage */
  notifyTeamKeys?: (string)[];
  /** Additional approval request fields for third-party integration approval systems. If you are using a third-party integration to manage approval requests, these additional fields will be described in the <code>manifest.json</code> for that integration, at https://github.com/launchdarkly/integration-framework. */
  integrationConfig?: FormVariableConfig;
  /** The type of condition to meet before executing this stage of the workflow. Use <code>schedule</code> to schedule a workflow stage. Use <code>ld-approval</code> to add an approval request to a workflow stage. */
  kind?: ConditionKind;
};

export type ConditionKind = string;

export type ConditionOutput = {
  _id: string;
  kind?: string;
  _execution: ExecutionOutput;
  scheduleKind?: ScheduleKind;
  executionDate?: UnixMillis;
  waitDuration?: number;
  waitDurationUnit?: DurationUnit;
  description: string;
  notifyMemberIds: (string)[];
  allReviews: (ReviewOutput)[];
  reviewStatus: string;
  appliedDate?: UnixMillis;
  creationConfig?: FormVariableConfig;
};

export type Conflict = {
  /** Instruction in semantic patch format to be applied to the feature flag */
  instruction?: Instruction;
  /** Reason why the conflict exists */
  reason?: string;
};

export type ConflictOutput = {
  /** The stage ID */
  stageId: string;
  /** Message about the conflict */
  message: string;
};

export type ContextAttributeName = {
  /** A context attribute's name. */
  name: string;
  /** A relative estimate of the number of contexts seen recently that have an attribute with the associated name. */
  weight: number;
  /** Whether or not the attribute has one or more redacted values. */
  redacted?: boolean;
};

export type ContextAttributeNames = {
  /** The kind associated with this collection of context attribute names. */
  kind: string;
  /** A collection of context attribute names. */
  names: (ContextAttributeName)[];
};

export type ContextAttributeNamesCollection = {
  /** A collection of context attribute name data grouped by kind. */
  items: (ContextAttributeNames)[];
};

export type ContextAttributeValue = {
  /** A value for a context attribute. */
  name: unknown;
  /** A relative estimate of the number of contexts seen recently that have a matching value for a given attribute. */
  weight: number;
};

export type ContextAttributeValues = {
  /** The kind associated with this collection of context attribute values. */
  kind: string;
  /** A collection of context attribute values. */
  values: (ContextAttributeValue)[];
};

export type ContextAttributeValuesCollection = {
  /** A collection of context attribute value data grouped by kind. */
  items: (ContextAttributeValues)[];
};

export type ContextInstance = { [key: string]: unknown | undefined };

export type ContextInstanceEvaluation = {
  /** Name of the flag. */
  name: string;
  /** Key of the flag. */
  key: string;
  /** The value of the flag variation that the context receives. If there is no defined default rule, this is null. */
  _value: unknown;
  /** Contains information about why that variation was selected. */
  reason?: ContextInstanceEvaluationReason;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ContextInstanceEvaluationReason = {
  /** Describes the general reason that LaunchDarkly selected this variation. */
  kind: string;
  /** The positional index of the matching rule if the kind is 'RULE_MATCH'. The index is 0-based. */
  ruleIndex?: number;
  /** The unique identifier of the matching rule if the kind is 'RULE_MATCH'. */
  ruleID?: string;
  /** The key of the flag that failed if the kind is 'PREREQUISITE_FAILED'. */
  prerequisiteKey?: string;
  /** Indicates whether the context was evaluated as part of an experiment. */
  inExperiment?: boolean;
  /** The specific error type if the kind is 'ERROR'. */
  errorKind?: string;
};

export type ContextInstanceEvaluations = {
  /** Details on the flag evaluations for this context instance */
  items: (ContextInstanceEvaluation)[];
  /** The number of flags */
  totalCount?: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ContextInstanceRecord = {
  /** Timestamp of the last time an evaluation occurred for this context instance */
  lastSeen?: string;
  /** The context instance ID */
  id: string;
  /** An identifier representing the application where the LaunchDarkly SDK is running */
  applicationId?: string;
  /** A list of the context kinds this context was associated with that the SDK removed because they were marked as anonymous at flag evaluation */
  anonymousKinds?: (string)[];
  /** The context, including its kind and attributes */
  context: unknown;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Details on the allowed and denied actions for this context instance */
  _access?: Access;
};

export type ContextInstanceSearch = {
  /** A collection of context instance filters */
  filter?: string;
  /** Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying <code>ts</code> for this value, or descending order by specifying <code>-ts</code>. */
  sort?: string;
  /** Specifies the maximum number of items in the collection to return (max: 50, default: 20) */
  limit?: number;
  /** Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the <code>next</code> link instead, because this value is an obfuscated string. */
  continuationToken?: string;
};

export type ContextInstanceSegmentMembership = {
  /** A human-friendly name for the segment */
  name: string;
  /** A unique key used to reference the segment */
  key: string;
  /** A description of the segment's purpose */
  description: string;
  /** Whether this is an unbounded segment. Unbounded segments, also called big segments, may be list-based segments with more than 15,000 entries, or synced segments. */
  unbounded: boolean;
  /** If the segment is a synced segment, the name of the external source */
  external: string;
  /** Whether the context is a member of this segment, either by explicit inclusion or by rule matching */
  isMember: boolean;
  /** Whether the context is explicitly included in this segment */
  isIndividuallyTargeted: boolean;
  /** Whether the context is captured by this segment's rules. The value of this field is undefined if the context is also explicitly included (<code>isIndividuallyTargeted</code> is <code>true</code>). */
  isRuleTargeted: boolean;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ContextInstanceSegmentMemberships = {
  items: (ContextInstanceSegmentMembership)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ContextInstances = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The number of unique context instances */
  totalCount?: number;
  /** The environment ID */
  _environmentId: string;
  /** An obfuscated string that references the last context instance on the previous page of results. You can use this for pagination, however, we recommend using the <code>next</code> link instead. */
  continuationToken?: string;
  /** A collection of context instances. Can include multiple versions of context instances that have the same <code>id</code>, but different <code>applicationId</code>s. */
  items: (ContextInstanceRecord)[];
};

export type ContextKindCreatedFrom = string;

export type ContextKindRep = {
  /** The context kind key */
  key: string;
  /** The context kind name */
  name: string;
  /** The context kind description */
  description: string;
  /** The context kind version */
  version: number;
  /** Timestamp of when the context kind was created */
  creationDate: UnixMillis;
  /** Timestamp of when the context kind was most recently changed */
  lastModified: UnixMillis;
  /** Timestamp of when a context of this context kind was most recently evaluated */
  lastSeen?: UnixMillis;
  /** How the context kind was created */
  createdFrom: ContextKindCreatedFrom;
  /** Alias for archived. */
  hideInTargeting?: boolean;
  /** Whether the context kind is archived. Archived context kinds are unavailable for targeting. */
  archived?: boolean;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type ContextKindsCollectionRep = {
  /** An array of context kinds */
  items: (ContextKindRep)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ContextRecord = {
  /** Timestamp of the last time an evaluation occurred for this context */
  lastSeen?: string;
  /** An identifier representing the application where the LaunchDarkly SDK is running */
  applicationId?: string;
  /** The context, including its kind and attributes */
  context: unknown;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Details on the allowed and denied actions for this context instance */
  _access?: Access;
  /** The total number of associated contexts. Associated contexts are contexts that have appeared in the same context instance, that is, they were part of the same flag evaluation. */
  associatedContexts?: number;
};

export type ContextSearch = {
  /** A collection of context filters */
  filter?: string;
  /** Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying <code>ts</code> for this value, or descending order by specifying <code>-ts</code>. */
  sort?: string;
  /** Specifies the maximum number of items in the collection to return (max: 50, default: 20) */
  limit?: number;
  /** Limits results to contexts with sort values after the value specified. You can use this for pagination, however, we recommend using the <code>next</code> link instead, because this value is an obfuscated string. */
  continuationToken?: string;
};

export type Contexts = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The number of contexts */
  totalCount?: number;
  /** The environment ID where the context was evaluated */
  _environmentId: string;
  /** An obfuscated string that references the last context instance on the previous page of results. You can use this for pagination, however, we recommend using the <code>next</code> link instead. */
  continuationToken?: string;
  /** A collection of contexts. Can include multiple versions of contexts that have the same <code>kind</code> and <code>key</code>, but different <code>applicationId</code>s. */
  items: (ContextRecord)[];
};

export type CopiedFromEnv = {
  /** Key of feature flag copied */
  key: string;
  /** Version of feature flag copied */
  version?: number;
};

export type CountBucket = {
  timestamp: number;
  count: number;
};

export type CountBucketsResult = {
  buckets: (CountBucket)[];
  totalCount: number;
  bucketIntervalMs: number;
};

export type CovariateInfoRep = {
  /** The ID of the covariate matrix */
  id: string;
  /** The file name of the uploaded covariate matrix */
  fileName: string;
  /** Timestamp of when the covariate was uploaded */
  createdAt: UnixMillis;
};

export type CreateApprovalRequestRequest = {
  /** String representation of the resource specifier */
  resourceId: string;
  /** Optional comment describing the approval request */
  comment?: string;
  /** A brief description of the changes you're requesting */
  description: string;
  /** List of instructions in semantic patch format to be applied to the feature flag. Review the [Update feature flag](https://launchdarkly.com/docs/ld-docs/api/feature-flags/patch-feature-flag) documentation for details on available instructions. */
  instructions: Instructions;
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds?: (string)[];
  /** An array of team keys. The members of these teams are notified to review the approval request. */
  notifyTeamKeys?: (string)[];
  /** Additional approval request fields for third-party integration approval systems. If you are using a third-party integration to manage approval requests, these additional fields will be described in the <code>manifest.json</code> for that integration, at https://github.com/launchdarkly/integration-framework. */
  integrationConfig?: FormVariableConfig;
};

export type CreatePhaseInput = {
  /** An ordered list of the audiences for this release phase. Each audience corresponds to a LaunchDarkly environment. */
  audiences: (AudiencePost)[];
  /** The release phase name */
  name: string;
  /** The configuration for the phase's rollout. */
  configuration?: PhaseConfiguration;
};

export type CreateReleaseInput = {
  /** The variation id to release to across all phases */
  releaseVariationId?: string;
  /** The key of the release pipeline to attach the flag to */
  releasePipelineKey: string;
};

export type CreateReleasePipelineInput = {
  /** The release pipeline description */
  description?: string;
  /** The unique identifier of this release pipeline */
  key: string;
  /** The name of the release pipeline */
  name: string;
  /** A logical grouping of one or more environments that share attributes for rolling out changes */
  phases: (CreatePhaseInput)[];
  /** A list of tags for this release pipeline */
  tags?: (string)[];
  /** Whether or not the newly created pipeline should be set as the default pipeline for this project */
  isProjectDefault?: boolean;
  /** Whether or not the pipeline is enabled for Release Automation. */
  isLegacy?: boolean;
};

export type CreateWorkflowTemplateInput = {
  key: string;
  name?: string;
  description?: string;
  workflowId?: FeatureWorkflowId;
  stages?: (StageInput)[];
  projectKey?: string;
  environmentKey?: string;
  flagKey?: string;
};

export type CustomProperties = { [key: string]: CustomProperty | undefined };

export type CustomRole = {
  /** The ID of the custom role */
  _id: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on the allowed and denied actions for this custom role */
  _access?: Access;
  /** The description of the custom role */
  description?: string;
  /** The key of the custom role */
  key: string;
  /** The name of the custom role */
  name: string;
  /** An array of the policies that comprise this custom role */
  policy: (Statement)[];
  /** Base permissions to use for this role. Defaults to no_access (older roles defaulted to reader). Recommended to set this to no_access in all cases. */
  basePermissions?: RoleType;
  /** The category of resources this role is intended to manage. Can be <code>organization</code>, <code>project</code>, or <code>any</code>. Once set, this field cannot be changed. */
  resourceCategory?: ResourceCategory;
  /** The number of teams and members this role is assigned to */
  assignedTo?: AssignedToRep;
  /** If created from a preset, the preset bundle version */
  _presetBundleVersion?: number;
  /** If created from a preset, the read-only statements copied from the preset */
  _presetStatements?: (Statement)[];
};

export type CustomRolePost = {
  /** A human-friendly name for the custom role */
  name: string;
  /** The custom role key */
  key: string;
  /** Description of custom role */
  description?: string;
  /** Resource statements for custom role */
  policy: StatementPostList;
  /** Base permissions to use for this role. Defaults to no_access (older roles defaulted to reader). Recommended to set this to no_access in all cases. */
  basePermissions?: RoleType;
  /** The category of resources this role is intended to manage. Can be <code>organization</code>, <code>project</code>, or <code>any</code>. This field is immutable. */
  resourceCategory?: ResourceCategory;
};

export type CustomRoles = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** An array of custom roles */
  items: (CustomRole)[];
  /** The total number of custom roles */
  totalCount?: number;
};

export type CustomWorkflowInput = {
  /** The ID of the workflow maintainer. Defaults to the workflow creator. */
  maintainerId?: ObjectId;
  /** The workflow name */
  name: string;
  /** The workflow description */
  description?: string;
  /** A list of the workflow stages */
  stages?: (StageInput)[];
  /** The template key */
  templateKey?: string;
};

export type CustomWorkflowMeta = {
  /** The name of the workflow stage that required this approval request */
  name?: string;
  /** Details on the stage of the workflow where this approval request is required */
  stage?: CustomWorkflowStageMeta;
};

export type CustomWorkflowOutput = {
  /** The ID of the workflow */
  _id: string;
  /** The version of the workflow */
  _version: number;
  /** Any conflicts that are present in the workflow stages */
  _conflicts: (ConflictOutput)[];
  /** Timestamp of when the workflow was created */
  _creationDate: UnixMillis;
  /** The member ID of the maintainer of the workflow. Defaults to the workflow creator. */
  _maintainerId: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The name of the workflow */
  name: string;
  /** A brief description of the workflow */
  description?: string;
  /** The kind of workflow */
  kind?: string;
  /** The stages that make up the workflow. Each stage contains conditions and actions. */
  stages?: (StageOutput)[];
  /** The current execution status of the workflow */
  _execution: ExecutionOutput;
  /** For workflows being created from a workflow template, this value holds any parameters that could potentially be incompatible with the current project, environment, or flag */
  meta?: WorkflowTemplateMetadata;
  /** For workflows being created from a workflow template, this value is the template's key */
  templateKey?: string;
};

export type CustomWorkflowStageMeta = {
  /** The zero-based index of the workflow stage */
  index?: number;
  /** The name of the workflow stage */
  name?: string;
};

export type CustomWorkflowsListingOutput = {
  /** An array of workflows */
  items: (CustomWorkflowOutput)[];
  /** Total number of workflows */
  totalCount: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type DateVersion = number;

export type DefaultClientSideAvailability = {
  /** Whether to enable availability for mobile SDKs */
  usingMobileKey: boolean;
  /** Whether to enable availability for client-side SDKs */
  usingEnvironmentId: boolean;
};

export type DefaultClientSideAvailabilityPost = {
  /** Whether to enable availability for client-side SDKs. */
  usingEnvironmentId: boolean;
  /** Whether to enable availability for mobile SDKs. */
  usingMobileKey: boolean;
};

export type Defaults = {
  /** The index, from the array of variations for this flag, of the variation to serve by default when targeting is on. */
  onVariation: number;
  /** The index, from the array of variations for this flag, of the variation to serve by default when targeting is off. */
  offVariation: number;
};

export type DependentExperimentListRep = (DependentExperimentRep)[];

export type DependentExperimentRep = {
  /** The experiment key */
  key: string;
  /** The experiment name */
  name: string;
  /** The environment ID */
  environmentId: string;
  /** The environment key */
  environmentKey: string;
  /** Timestamp of when the experiment was created */
  creationDate: UnixMillis;
  /** Timestamp of when the experiment was archived */
  archivedDate?: UnixMillis;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type DependentFlag = {
  /** The flag name */
  name?: string;
  /** The flag key */
  key: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on how to access the dependent flag in the LaunchDarkly UI */
  _site: Link;
};

export type DependentFlagEnvironment = {
  /** The environment name */
  name?: string;
  /** The environment key */
  key: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on how to access the dependent flag in this environment in the LaunchDarkly UI */
  _site: Link;
};

export type DependentFlagsByEnvironment = {
  /** A list of dependent flags, which are flags that use the requested flag as a prerequisite */
  items: (DependentFlag)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on how to access the prerequisite flag in the LaunchDarkly UI */
  _site: Link;
};

export type DependentMeasuredRolloutRep = {
  /** The guarded rollout measured rollout Id */
  _id: string;
  /** The guarded rollout flag key  */
  flagKey: string;
  /** The guarded rollout flag name  */
  flagName: string;
  /** The guarded rollout flag purpose */
  flagPurpose?: string;
  /** The guarded rollout environment key */
  environmentKey: string;
  /** The guarded rollout environment name */
  environmentName: string;
  /** The guarded rollout status */
  status: string;
  /** Timestamp of when the guarded rollout was created */
  creationDate: UnixMillis;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type DependentMetricGroupRep = {
  /** A unique key to reference the metric group */
  key: string;
  /** A human-friendly name for the metric group */
  name: string;
  /** The type of the metric group */
  kind: "funnel" | "standard";
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type DependentMetricGroupRepWithMetrics = {
  /** A unique key to reference the metric group */
  key: string;
  /** A human-friendly name for the metric group */
  name: string;
  /** The type of the metric group */
  kind: "funnel" | "standard";
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The metrics in the metric group */
  metrics?: (MetricInGroupRep)[];
};

export type DependentMetricOrMetricGroupRep = {
  /** A unique key to reference the metric or metric group */
  key: string;
  /** The version ID of the metric or metric group */
  _versionId: string;
  /** A human-friendly name for the metric or metric group */
  name: string;
  /** If this is a metric, then it represents the kind of event the metric tracks. If this is a metric group, then it represents the group type */
  kind: "pageview" | "click" | "custom" | "trace" | "funnel" | "standard";
  /** For custom and trace metrics, whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). */
  isNumeric?: boolean;
  /** The event key sent with the metric. Only relevant for custom metrics. */
  eventKey?: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Whether this is a metric group or a metric */
  isGroup: boolean;
  /** An ordered list of the metrics in this metric group */
  metrics?: (MetricInGroupRep)[];
};

export type Destination = {
  /** The ID of this Data Export destination */
  _id?: string;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** A human-readable name for your Data Export destination */
  name?: string;
  /** The type of Data Export destination */
  kind?: "google-pubsub" | "kinesis" | "mparticle" | "segment" | "azure-event-hubs" | "snowflake-v2" | "databricks" | "bigquery" | "redshift";
  version?: number;
  /** An object with the configuration parameters required for the destination type */
  config?: unknown;
  /** Whether the export is on, that is, the status of the integration */
  on?: boolean;
  /** Timestamp of when the Data Export destination was created (as Unix milliseconds since epoch) */
  createdAt?: UnixMillis;
  /** Details on the allowed and denied actions for this Data Export destination */
  _access?: Access;
};

export type DestinationPost = {
  /** A human-readable name for your Data Export destination */
  name?: string;
  /** The type of Data Export destination */
  kind?: "google-pubsub" | "kinesis" | "mparticle" | "segment" | "azure-event-hubs" | "snowflake-v2" | "databricks" | "bigquery" | "redshift";
  /** An object with the configuration parameters required for the destination type */
  config?: unknown;
  /** Whether the export is on. Displayed as the integration status in the LaunchDarkly UI. */
  on?: boolean;
};

export type Destinations = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** An array of Data Export destinations */
  items?: (Destination)[];
};

export type DurationUnit = string;

export type DynamicOptions = {
  endpoint?: Endpoint;
  parser?: DynamicOptionsParser;
};

export type DynamicOptionsParser = {
  optionsItems?: OptionsArray;
  optionsPath?: string;
};

export type Endpoint = {
  headers?: (HeaderItems)[];
  hmacSignature?: HmacSignature;
  method?: string;
  url?: string;
};

export type Environment = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID for the environment. Use this as the client-side ID for authorization in some client-side SDKs, and to associate LaunchDarkly environments with CDN integrations in edge SDKs. */
  _id: string;
  /** A project-unique key for the new environment */
  key: string;
  /** A human-friendly name for the new environment */
  name: string;
  /** The SDK key for the environment. Use this for authorization in server-side SDKs. */
  apiKey: string;
  /** The mobile key for the environment. Use this for authorization in mobile SDKs. */
  mobileKey: string;
  /** The color used to indicate this environment in the UI */
  color: string;
  /** The default time (in minutes) that the PHP SDK can cache feature flag rules locally */
  defaultTtl: number;
  /** Ensures that one end user of the client-side SDK cannot inspect the variations for another end user */
  secureMode: boolean;
  _access?: Access;
  /** Enables tracking detailed information for new flags by default */
  defaultTrackEvents: boolean;
  /** Whether members who modify flags and segments through the LaunchDarkly user interface are required to add a comment */
  requireComments: boolean;
  /** Whether members who modify flags and segments through the LaunchDarkly user interface are required to confirm those changes */
  confirmChanges: boolean;
  /** A list of tags for this environment */
  tags: (string)[];
  /** Details about the approval settings for flags in this environment */
  approvalSettings?: ApprovalSettings;
  /** Details about the approval settings for other resources in this environment, organized by resource kind (for example, "aiconfig" and "segment") */
  resourceApprovalSettings?: { [key: string]: ApprovalSettings | undefined };
  /** Whether the environment is critical */
  critical: boolean;
};

export type EnvironmentPost = {
  /** A human-friendly name for the new environment */
  name: string;
  /** A project-unique key for the new environment */
  key: string;
  /** A color to indicate this environment in the UI */
  color: string;
  /** The default time (in minutes) that the PHP SDK can cache feature flag rules locally */
  defaultTtl?: number;
  /** Ensures that one end user of the client-side SDK cannot inspect the variations for another end user */
  secureMode?: boolean;
  /** Enables tracking detailed information for new flags by default */
  defaultTrackEvents?: boolean;
  /** Requires confirmation for all flag and segment changes via the UI in this environment */
  confirmChanges?: boolean;
  /** Requires comments for all flag and segment changes via the UI in this environment */
  requireComments?: boolean;
  /** Tags to apply to the new environment */
  tags?: (string)[];
  /** Indicates that the new environment created will be cloned from the provided source environment */
  source?: SourceEnv;
  /** Whether the environment is critical */
  critical?: boolean;
};

export type EnvironmentSummary = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** A project-unique key for the environment */
  key: string;
  /** A human-friendly name for the environment */
  name: string;
  /** The color used to indicate this environment in the UI */
  color: string;
};

export type Environments = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The number of environments returned */
  totalCount?: number;
  /** An array of environments */
  items: (Environment)[];
};

export type EvaluationReason = {
  /** Describes the general reason that LaunchDarkly selected this variation. */
  kind: string;
  /** The positional index of the matching rule if the kind is 'RULE_MATCH'. The index is 0-based. */
  ruleIndex?: number;
  /** The unique identifier of the matching rule if the kind is 'RULE_MATCH'. */
  ruleID?: string;
  /** The key of the flag that failed if the kind is 'PREREQUISITE_FAILED'. */
  prerequisiteKey?: string;
  /** Indicates whether the evaluation occurred as part of an experiment. */
  inExperiment?: boolean;
  /** The specific error type if the kind is 'ERROR'. */
  errorKind?: string;
};

export type EventFilter = {
  /** Filter type. One of [contextAttribute, eventProperty, group] */
  type: string;
  /** If not a group node, the context attribute name or event property name to filter on */
  attribute?: string;
  /** The function to perform */
  op: Operator;
  /** The context attribute / event property values or group member nodes. Numeric values must not exceed 14 decimal places. */
  values: (unknown)[];
  /** For context attribute filters, the context kind. */
  contextKind?: string;
  /** If set, then take the inverse of the operator. 'in' becomes 'not in'. */
  negate: boolean;
};

export type ExecutionOutput = {
  /** The status of the execution of this workflow stage */
  status: string;
  /** Timestamp of when the workflow was completed. */
  stopDate?: UnixMillis;
};

export type ExpandableApprovalRequestResponse = {
  /** The ID of this approval request */
  _id: string;
  /** Version of the approval request */
  _version: number;
  /** Timestamp of when the approval request was created */
  creationDate: UnixMillis;
  /** The approval service for this request. May be LaunchDarkly or an external approval service, such as ServiceNow or JIRA. */
  serviceKind: ApprovalRequestServiceKind;
  /** The ID of the member who requested the approval */
  requestorId?: string;
  /** A human-friendly name for the approval request */
  description?: string;
  /** Current status of the review of this approval request */
  reviewStatus: "approved" | "declined" | "pending";
  /** An array of individual reviews of this approval request */
  allReviews: (ReviewResponse)[];
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds: (string)[];
  /** Timestamp of when the approval request was applied */
  appliedDate?: UnixMillis;
  /** The member ID of the member who applied the approval request */
  appliedByMemberId?: string;
  /** The service token ID of the service token which applied the approval request */
  appliedByServiceTokenId?: string;
  /** Current status of the approval request */
  status: "pending" | "completed" | "failed" | "scheduled";
  /** List of instructions in semantic patch format to be applied to the feature flag */
  instructions: Instructions;
  /** Details on any conflicting approval requests */
  conflicts: (Conflict)[];
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** Timestamp for when instructions will be executed */
  executionDate?: UnixMillis;
  /** ID of scheduled change to edit or delete */
  operatingOnId?: string;
  /** Details about the object in an external service corresponding to this approval request, such as a ServiceNow change request or a JIRA ticket, if an external approval service is being used */
  integrationMetadata?: IntegrationMetadata;
  /** Details about the source feature flag, if copied */
  source?: CopiedFromEnv;
  /** Details about the custom workflow, if this approval request is part of a custom workflow */
  customWorkflowMetadata?: CustomWorkflowMeta;
  /** String representation of a resource */
  resourceId?: string;
  /** The settings for this approval */
  approvalSettings?: ApprovalSettings;
  /** Project the approval request belongs to */
  project?: Project;
  /** List of environments the approval impacts */
  environments?: (Environment)[];
  /** Flag the approval request belongs to */
  flag?: ExpandedFlagRep;
  /** Resource the approval request belongs to */
  resource?: ExpandedResourceRep;
};

export type ExpandableApprovalRequestsResponse = {
  /** An array of approval requests */
  items: (ExpandableApprovalRequestResponse)[];
  /** Total number of approval requests */
  totalCount: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ExpandedExperimentRep = {
  /** The key of the experiment */
  key: string;
  /** The name of the experiment */
  name: string;
  _access?: Access;
};

export type ExpandedFlagRep = {
  /** A human-friendly name for the feature flag */
  name: string;
  /** Kind of feature flag */
  kind: "boolean" | "multivariate";
  /** Description of the feature flag */
  description?: string;
  /** A unique key used to reference the flag in your code */
  key: string;
  /** Version of the feature flag */
  _version: number;
  /** Timestamp of flag creation date */
  creationDate: UnixMillis;
  /** Deprecated, use <code>clientSideAvailability</code>. Whether this flag should be made available to the client-side JavaScript SDK */
  includeInSnippet?: boolean;
  /** Which type of client-side SDKs the feature flag is available to */
  clientSideAvailability?: ClientSideAvailability;
  /** An array of possible variations for the flag */
  variations: (Variation)[];
  /** Whether the flag is a temporary flag */
  temporary: boolean;
  /** Tags for the feature flag */
  tags: (string)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID of the member who maintains the flag */
  maintainerId?: string;
  /** Details on the member who maintains this feature flag */
  _maintainer?: MemberSummary;
  /** Metadata attached to the feature flag, in the form of the property key associated with a name and array of values for the metadata to associate with this flag. Typically used to store data related to an integration. */
  customProperties: CustomProperties;
  /** Boolean indicating if the feature flag is archived */
  archived: boolean;
  /** If archived is true, date of archive */
  archivedDate?: UnixMillis;
  /** The indices, from the array of variations, for the variations to serve by default when targeting is on and when targeting is off. These variations will be used for this flag in new environments. If omitted, the first and last variation will be used. */
  defaults?: Defaults;
};

export type ExpandedResourceRep = {
  /** The type of resource */
  kind: string;
  aiConfig?: AiConfigRep;
  experiment?: ExpandedExperimentRep;
  flag?: ExpandedFlagRep;
  segment?: UserSegment;
};

export type Experiment = {
  /** The experiment ID */
  _id?: string;
  /** The experiment key */
  key: string;
  /** The experiment name */
  name: string;
  /** The experiment description */
  description?: string;
  /** The ID of the member who maintains this experiment. */
  _maintainerId: string;
  /** Timestamp of when the experiment was created */
  _creationDate: UnixMillis;
  environmentKey: string;
  /** The results analysis approach. */
  methodology?: "bayesian" | "frequentist" | "export_only";
  /** The source of metric data in order to analyze results. Defaults to "launchdarkly" when not provided. */
  dataSource?: "launchdarkly" | "snowflake";
  /** Timestamp of when the experiment was archived */
  archivedDate?: UnixMillis;
  /** Tags for the experiment */
  tags?: (string)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The holdout ID */
  holdoutId?: string;
  /** Details on the current iteration */
  currentIteration?: IterationRep;
  /** The experiment type */
  type?: string;
  /** Details on the current iteration. This iteration may be already started, or may still be a draft. */
  draftIteration?: IterationRep;
  /** Details on the previous iterations for this experiment. */
  previousIterations?: (IterationRep)[];
  /** Details of the Analysis Configuration for this experiment. */
  analysisConfig?: AnalysisConfigRep;
  /** Fields that can be changed for each iteration status. */
  mutableFieldsByStatus?: MutableFieldsByStatusRep;
};

export type ExperimentAllocationRep = {
  defaultVariation: number;
  canReshuffle: boolean;
};

export type ExperimentCollectionRep = {
  /** An array of experiments */
  items: (Experiment)[];
  /** The total number of experiments in this project and environment. Does not include legacy experiments. */
  total_count?: number;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type ExperimentEnabledPeriodRep = {
  startDate?: UnixMillis;
  stopDate?: UnixMillis;
};

export type ExperimentEnvironmentSettingRep = {
  startDate?: UnixMillis;
  stopDate?: UnixMillis;
  enabledPeriods?: (ExperimentEnabledPeriodRep)[];
};

export type ExperimentInfoRep = {
  baselineIdx: number;
  items: (LegacyExperimentRep)[];
};

export type ExperimentPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
  instructions: Instructions;
};

export type ExperimentPost = {
  /** The experiment name */
  name: string;
  /** The experiment description */
  description?: string;
  /** The ID of the member who maintains this experiment */
  maintainerId?: string;
  /** The experiment key */
  key: string;
  /** Details on the construction of the initial iteration */
  iteration: IterationInput;
  /** The ID of the holdout */
  holdoutId?: string;
  /** Tags for the experiment */
  tags?: (string)[];
  /** The results analysis approach. */
  methodology?: "bayesian" | "frequentist" | "export_only";
  /** Details of the Analysis Configuration for this experiment */
  analysisConfig?: AnalysisConfigInput;
  /** The source of metric data in order to analyze results. Defaults to "launchdarkly" when not provided. */
  dataSource?: "launchdarkly" | "snowflake";
  /** The type of experiment. */
  type?: "experiment" | "mab" | "holdout";
};

export type ExpiringTarget = {
  /** The ID of this expiring target */
  _id: string;
  /** The version of this expiring target */
  _version: number;
  /** A timestamp for when the target expires */
  expirationDate: UnixMillis;
  /** The context kind of the context to be removed */
  contextKind: string;
  /** A unique key used to represent the context to be removed */
  contextKey: string;
  /** A segment's target type, <code>included</code> or <code>excluded</code>. Included when expiring targets are updated on a segment. */
  targetType?: string;
  /** A unique ID used to represent the flag variation. Included when expiring targets are updated on a feature flag. */
  variationId?: string;
  /** Details on the segment or flag this expiring target belongs to, its environment, and its project */
  _resourceId: ResourceId;
};

export type ExpiringTargetError = {
  /** The index of the PATCH instruction where the error occurred */
  instructionIndex: number;
  /** The error message related to a failed PATCH instruction */
  message: string;
};

export type ExpiringTargetGetResponse = {
  /** A list of expiring targets */
  items: (ExpiringTarget)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type ExpiringTargetPatchResponse = {
  /** A list of the results from each instruction */
  items: (ExpiringTarget)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  totalInstructions?: number;
  successfulInstructions?: number;
  failedInstructions?: number;
  errors?: (ExpiringTargetError)[];
};

export type ExpiringUserTargetGetResponse = {
  /** An array of expiring user targets */
  items: (ExpiringUserTargetItem)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type ExpiringUserTargetItem = {
  /** The ID of this expiring user target */
  _id: string;
  /** The version of this expiring user target */
  _version: number;
  /** A timestamp for when the user target expires */
  expirationDate: UnixMillis;
  /** A unique key used to represent the user */
  userKey: string;
  /** A segment's target type. Included when expiring user targets are updated on a segment. */
  targetType?: string;
  /** A unique key used to represent the flag variation. Included when expiring user targets are updated on a feature flag. */
  variationId?: string;
  /** Details on the resource from which the user is expiring */
  _resourceId: ResourceIdResponse;
};

export type ExpiringUserTargetPatchResponse = {
  /** An array of expiring user targets */
  items: (ExpiringUserTargetItem)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The total count of instructions sent in the PATCH request */
  totalInstructions?: number;
  /** The total count of successful instructions sent in the PATCH request */
  successfulInstructions?: number;
  /** The total count of the failed instructions sent in the PATCH request */
  failedInstructions?: number;
  /** An array of error messages for the failed instructions */
  errors?: (ExpiringTargetError)[];
};

export type Export = {
  /** The export ID */
  id: string;
  /** The segment key */
  segmentKey: string;
  /** Timestamp of when this export was created */
  creationTime: UnixMillis;
  /** The export status */
  status: string;
  /** The export size, in bytes */
  sizeBytes: number;
  /** The export size, with units */
  size: string;
  /** Details on the member who initiated the export */
  initiator: InitiatorRep;
  /** The location and content type of related resources, including the location of the exported file */
  _links: { [key: string]: Link | undefined };
};

export type Extinction = {
  /** The identifier for the revision where flag became extinct. For example, a commit SHA. */
  revision: string;
  /** Description of the extinction. For example, the commit message for the revision. */
  message: string;
  /** Time of extinction */
  time: UnixMillis;
  /** The feature flag key */
  flagKey: string;
  /** The project key */
  projKey: string;
};

export type ExtinctionCollectionRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** An array of extinction events */
  items: { [key: string]: (Extinction)[] | undefined };
};

export type ExtinctionListPost = (Extinction)[];

export type FeatureFlag = {
  /** A human-friendly name for the feature flag */
  name: string;
  /** Kind of feature flag */
  kind: "boolean" | "multivariate";
  /** Description of the feature flag */
  description?: string;
  /** A unique key used to reference the flag in your code */
  key: string;
  /** Version of the feature flag */
  _version: number;
  /** Timestamp of flag creation date */
  creationDate: UnixMillis;
  /** Deprecated, use <code>clientSideAvailability</code>. Whether this flag should be made available to the client-side JavaScript SDK */
  includeInSnippet?: boolean;
  /** Which type of client-side SDKs the feature flag is available to */
  clientSideAvailability?: ClientSideAvailability;
  /** An array of possible variations for the flag */
  variations: (Variation)[];
  /** Whether the flag is a temporary flag */
  temporary: boolean;
  /** Tags for the feature flag */
  tags: (string)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Associated maintainerId for the feature flag */
  maintainerId?: string;
  /** Associated maintainer member info for the feature flag */
  _maintainer?: MemberSummary;
  /** The key of the associated team that maintains this feature flag */
  maintainerTeamKey?: string;
  /** Associated maintainer team info for the feature flag */
  _maintainerTeam?: MaintainerTeam;
  /** Deprecated, use <code>experiments</code> instead */
  goalIds?: (string)[];
  /** Experimentation data for the feature flag */
  experiments: ExperimentInfoRep;
  /** Metadata attached to the feature flag, in the form of the property key associated with a name and array of values for the metadata to associate with this flag. Typically used to store data related to an integration. */
  customProperties: CustomProperties;
  /** Boolean indicating if the feature flag is archived */
  archived: boolean;
  /** If archived is true, date of archive */
  archivedDate?: UnixMillis;
  /** Boolean indicating if the feature flag is deprecated */
  deprecated?: boolean;
  /** If deprecated is true, date of deprecation */
  deprecatedDate?: UnixMillis;
  /** The indices, from the array of variations, for the variations to serve by default when targeting is on and when targeting is off. These variations will be used for this flag in new environments. If omitted, the first and last variation will be used. */
  defaults?: Defaults;
  _purpose?: string;
  /** Migration-related settings for the flag */
  migrationSettings?: FlagMigrationSettingsRep;
  /** Details on the environments for this flag. Only returned if the request is filtered by environment, using the <code>filterEnv</code> query parameter. */
  environments?: { [key: string]: FeatureFlagConfig | undefined };
};

export type FeatureFlagBody = {
  /** A human-friendly name for the feature flag */
  name: string;
  /** A unique key used to reference the flag in your code */
  key: string;
  /** Description of the feature flag. Defaults to an empty string. */
  description?: string;
  /** Deprecated, use <code>clientSideAvailability</code>. Whether this flag should be made available to the client-side JavaScript SDK. Defaults to <code>false</code>. */
  includeInSnippet?: boolean;
  /** Which type of client-side SDKs the feature flag is available to */
  clientSideAvailability?: ClientSideAvailabilityPost;
  /** An array of possible variations for the flag. The variation values must be unique. If omitted, two boolean variations of <code>true</code> and <code>false</code> will be used. */
  variations?: (Variation)[];
  /** Whether the flag is a temporary flag. Defaults to <code>true</code>. */
  temporary?: boolean;
  /** Tags for the feature flag. Defaults to an empty array. */
  tags?: (string)[];
  /** Metadata attached to the feature flag, in the form of the property key associated with a name and array of values for the metadata to associate with this flag. Typically used to store data related to an integration. */
  customProperties?: CustomProperties;
  /** The indices, from the array of variations, for the variations to serve by default when targeting is on and when targeting is off. These variations will be used for this flag in new environments. If omitted, the first and last variation will be used. */
  defaults?: Defaults;
  /** Purpose of the flag */
  purpose?: "migration" | "holdout";
  /** Settings relevant to flags where <code>purpose</code> is <code>migration</code> */
  migrationSettings?: MigrationSettingsPost;
  /** The ID of the member who maintains this feature flag */
  maintainerId?: string;
  /** The key of the team that maintains this feature flag */
  maintainerTeamKey?: string;
  /** Initial set of prerequisite flags for all environments */
  initialPrerequisites?: (FlagPrerequisitePost)[];
  /** Whether to automatically turn the flag on across all environments at creation. Defaults to <code>false</code>. */
  isFlagOn?: boolean;
};

export type FeatureFlagConfig = {
  /** Whether the flag is on */
  on: boolean;
  /** Boolean indicating if the feature flag is archived */
  archived: boolean;
  salt: string;
  sel: string;
  /** Timestamp of when the flag configuration was most recently modified */
  lastModified: UnixMillis;
  /** Version of the feature flag */
  version: number;
  /** An array of the individual targets that will receive a specific variation based on their key. Individual targets with a context kind of 'user' are included here. */
  targets?: (Target)[];
  /** An array of the individual targets that will receive a specific variation based on their key. Individual targets with context kinds other than 'user' are included here. */
  contextTargets?: (Target)[];
  /** An array of the rules for how to serve a variation to specific targets based on their attributes */
  rules?: (Rule)[];
  /** Details on the variation or rollout to serve as part of the flag's default rule */
  fallthrough?: VariationOrRolloutRep;
  /** The ID of the variation to serve when the flag is off */
  offVariation?: number;
  /** An array of the prerequisite flags and their variations that are required before this flag takes effect */
  prerequisites?: (Prerequisite)[];
  /** Details on how to access the flag configuration in the LaunchDarkly UI */
  _site: Link;
  /** Details on the allowed and denied actions for this flag */
  _access?: Access;
  /** The environment name */
  _environmentName: string;
  /** Whether LaunchDarkly tracks events for the feature flag, for all rules */
  trackEvents: boolean;
  /** Whether LaunchDarkly tracks events for the feature flag, for the default rule */
  trackEventsFallthrough: boolean;
  _debugEventsUntilDate?: UnixMillis;
  /** A summary of the prerequisites and variations for this flag */
  _summary?: FlagSummary;
  /** Evaluation information for the flag */
  evaluation?: FlagConfigEvaluation;
  /** Migration-related settings for the flag configuration */
  migrationSettings?: FlagConfigMigrationSettingsRep;
};

export type FeatureFlagScheduledChange = {
  /** The ID of this scheduled change */
  _id: FeatureWorkflowId;
  /** Timestamp of when the scheduled change was created */
  _creationDate: UnixMillis;
  /** The ID of the scheduled change maintainer */
  _maintainerId: string;
  /** The ID of the service token that created or updated this scheduled change */
  _maintainerServiceTokenId?: string;
  /** Version of the scheduled change */
  _version: number;
  /** When the scheduled changes should be executed */
  executionDate: UnixMillis;
  /** The actions to perform on the execution date for these scheduled changes */
  instructions: Instructions;
  /** Details on any conflicting scheduled changes */
  conflicts?: unknown;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type FeatureFlagScheduledChanges = {
  /** Array of scheduled changes */
  items: (FeatureFlagScheduledChange)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type FeatureFlagStatus = {
  /** Status of the flag */
  name: "new" | "inactive" | "active" | "launched";
  /** Timestamp of last time flag was requested */
  lastRequested?: string;
  /** Default value seen from code */
  default?: unknown;
};

export type FeatureFlagStatusAcrossEnvironments = {
  /** Flag status for environment. */
  environments: { [key: string]: FeatureFlagStatus | undefined };
  /** feature flag key */
  key: string;
  _links: { [key: string]: Link | undefined };
};

export type FeatureFlagStatuses = {
  _links: { [key: string]: Link | undefined };
  items?: (FlagStatusRep)[];
};

export type FeatureFlags = {
  /** An array of feature flags */
  items: (FeatureFlag)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The total number of flags */
  totalCount?: number;
  /** The number of flags that have differences between environments. Only shown when query parameter <code>compare</code> is <code>true</code>. */
  totalCountWithDifferences?: number;
};

export type FeatureWorkflowId = string;

export type FieldAction = string;

export type FileRep = {
  /** The imported file name, including the extension */
  filename?: string;
  /** The imported file status */
  status?: string;
};

export type Filter = {
  /** Filter type. One of [contextAttribute, eventProperty, group] */
  type: "group" | "contextAttribute" | "eventProperty";
  /** If not a group node, the context attribute name or event property name to filter on */
  attribute?: string;
  /** The function to perform */
  op: Operator;
  /** The context attribute / event property values or group member nodes */
  values: (unknown)[];
  /** For context attribute filters, the context kind. */
  contextKind?: string;
  /** If set, then take the inverse of the operator. 'in' becomes 'not in'. */
  negate: boolean;
};

export type FlagConfigApprovalRequestResponse = {
  /** The ID of this approval request */
  _id: string;
  /** Version of the approval request */
  _version: number;
  /** Timestamp of when the approval request was created */
  creationDate: UnixMillis;
  /** The approval service for this request. May be LaunchDarkly or an external approval service, such as ServiceNow or JIRA. */
  serviceKind: ApprovalRequestServiceKind;
  /** The ID of the member who requested the approval */
  requestorId?: string;
  /** A human-friendly name for the approval request */
  description?: string;
  /** Current status of the review of this approval request */
  reviewStatus: "approved" | "declined" | "pending";
  /** An array of individual reviews of this approval request */
  allReviews: (ReviewResponse)[];
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds: (string)[];
  /** Timestamp of when the approval request was applied */
  appliedDate?: UnixMillis;
  /** The member ID of the member who applied the approval request */
  appliedByMemberId?: string;
  /** The service token ID of the service token which applied the approval request */
  appliedByServiceTokenId?: string;
  /** Current status of the approval request */
  status: "pending" | "completed" | "failed" | "scheduled";
  /** List of instructions in semantic patch format to be applied to the feature flag */
  instructions: Instructions;
  /** Details on any conflicting approval requests */
  conflicts: (Conflict)[];
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** Timestamp for when instructions will be executed */
  executionDate?: UnixMillis;
  /** ID of scheduled change to edit or delete */
  operatingOnId?: string;
  /** Details about the object in an external service corresponding to this approval request, such as a ServiceNow change request or a JIRA ticket, if an external approval service is being used */
  integrationMetadata?: IntegrationMetadata;
  /** Details about the source feature flag, if copied */
  source?: CopiedFromEnv;
  /** Details about the custom workflow, if this approval request is part of a custom workflow */
  customWorkflowMetadata?: CustomWorkflowMeta;
};

export type FlagConfigApprovalRequestsResponse = {
  /** An array of approval requests */
  items: (FlagConfigApprovalRequestResponse)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type FlagConfigEvaluation = {
  contextKinds?: (string)[];
};

export type FlagConfigMigrationSettingsRep = {
  checkRatio?: number;
};

export type FlagCopyConfigEnvironment = {
  /** The environment key */
  key: string;
  /** Optional flag version. If you include this, the operation only succeeds if the current flag version in the environment matches this version. */
  currentVersion?: number;
};

export type FlagCopyConfigPost = {
  /** The source environment */
  source: FlagCopyConfigEnvironment;
  /** The target environment */
  target: FlagCopyConfigEnvironment;
  /** Optional comment */
  comment?: string;
  /** Optional list of the flag changes to copy from the source environment to the target environment. You may include either <code>includedActions</code> or <code>excludedActions</code>, but not both. If you include neither, then all flag changes will be copied. */
  includedActions?: ("updateOn" | "updateRules" | "updateFallthrough" | "updateOffVariation" | "updatePrerequisites" | "updateTargets" | "updateFlagConfigMigrationSettings")[];
  /** Optional list of the flag changes NOT to copy from the source environment to the target environment. You may include either  <code>includedActions</code> or <code>excludedActions</code>, but not both. If you include neither, then all flag changes will be copied. */
  excludedActions?: ("updateOn" | "updateRules" | "updateFallthrough" | "updateOffVariation" | "updatePrerequisites" | "updateTargets" | "updateFlagConfigMigrationSettings")[];
};

export type FlagFollowersByProjEnvGetRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** An array of flags and their followers */
  items?: (FollowersPerFlag)[];
};

export type FlagFollowersGetRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** An array of members who are following this flag */
  items: (FollowFlagMember)[];
};

export type FlagImportConfigurationPost = {
  /** The global configuration settings, as specified by the <code>formVariables</code> in the <code>manifest.json</code> for this configuration. */
  config: FormVariableConfig;
  /** Tags to associate with the configuration */
  tags?: (string)[];
  /** Name to identify the configuration */
  name?: string;
};

export type FlagImportIntegration = {
  /** The location and content type of related resources */
  _links: FlagImportIntegrationLinks;
  /** The integration ID */
  _id: string;
  /** The integration key */
  integrationKey: "split" | "unleash";
  /** The project key */
  projectKey: string;
  /** The configuration for the given import integration. Only included when requesting a single integration by ID. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> for a full list of fields for each integration. */
  config: FormVariableConfig;
  /** List of tags for this configuration */
  tags: (string)[];
  /** Name of the configuration */
  name: string;
  /** Version of the current configuration */
  version: number;
  /** Details on the allowed and denied actions for this configuration */
  _access?: Access;
  /** Details on the status of the import job */
  _status: FlagImportStatus;
};

export type FlagImportIntegrationCollection = {
  /** The location and content type of related resources */
  _links: FlagImportIntegrationCollectionLinks;
  /** An array of flag import configurations */
  items: (FlagImportIntegration)[];
};

export type FlagImportIntegrationCollectionLinks = {
  self: Link;
  parent?: Link;
};

export type FlagImportIntegrationLinks = {
  self: Link;
  parent: Link;
  project: Link;
};

export type FlagImportStatus = {
  /** The current status of the import integrations related import job */
  status?: "complete" | "importing" | "pending" | "failed" | "partial";
  /** Timestamp of when the most recent successful import occurred. */
  lastImport?: UnixMillis;
  /** Timestamp of when the most recent import error occurred, if any */
  lastError?: UnixMillis;
  errors?: (StatusResponse)[];
};

export type FlagInput = {
  /** The ID of the variation or rollout of the flag to use. Use "fallthrough" for the default targeting behavior when the flag is on. */
  ruleId: string;
  /** The flag version */
  flagConfigVersion: number;
  /** The ID of the variation to route traffic not part of the experiment analysis to. Defaults to variation ID of baseline treatment, if set. */
  notInExperimentVariationId?: string;
};

export type FlagLinkCollectionRep = {
  /** An array of flag links */
  items: (FlagLinkRep)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type FlagLinkMember = {
  _links: { [key: string]: Link | undefined };
  _id: string;
  firstName?: string;
  lastName?: string;
};

export type FlagLinkRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The flag link key */
  _key?: string;
  /** The integration key for an integration whose <code>manifest.json</code> includes the <code>flagLink</code> capability, if this is a flag link for an existing integration */
  _integrationKey?: string;
  /** The ID of this flag link */
  _id: string;
  /** The URL for the external resource the flag is linked to */
  _deepLink: string;
  /** The time to mark this flag link as associated with the external URL. Defaults to the creation time of the flag link, but can be set to another time during creation. */
  _timestamp: TimestampRep;
  /** The title of the flag link */
  title?: string;
  /** The description of the flag link */
  description?: string;
  /** The metadata required by this integration in order to create a flag link, if this is a flag link for an existing integration. Defined in the integration's <code>manifest.json</code> file under <code>flagLink</code>. */
  _metadata?: { [key: string]: string | undefined };
  /** Timestamp of when the flag link was created */
  _createdAt: UnixMillis;
  /** Details on the member associated with this flag link */
  _member?: FlagLinkMember;
};

export type FlagListingRep = {
  /** The flag name */
  name: string;
  /** The flag key */
  key: string;
  _links?: { [key: string]: Link | undefined };
  _site?: Link;
};

export type FlagMigrationSettingsRep = {
  /** The context kind targeted by this migration flag. Only applicable for six-stage migrations. */
  contextKind?: string;
  /** The number of stages for this migration flag */
  stageCount?: number;
};

export type FlagPrerequisitePost = {
  /** Flag key of the prerequisite flag */
  key: string;
  /** ID of a variation of the prerequisite flag */
  variationId: string;
};

export type FlagRep = {
  /** The targeting rule */
  targetingRule?: string;
  /** The rule description */
  targetingRuleDescription?: string;
  /** An array of clauses used for individual targeting based on attributes */
  targetingRuleClauses?: (unknown)[];
  /** The flag version */
  flagConfigVersion?: number;
  /** The ID of the variation to route traffic not part of the experiment analysis to */
  notInExperimentVariationId?: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type FlagScheduledChangesInput = {
  /** Optional comment describing the update to the scheduled changes */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
  instructions: Instructions;
};

export type FlagStatusRep = {
  /** Status of the flag */
  name: "new" | "inactive" | "active" | "launched";
  /** Timestamp of last time flag was requested */
  lastRequested?: string;
  /** Default value seen from code */
  default?: unknown;
  _links: { [key: string]: Link | undefined };
};

export type FlagSummary = {
  /** A summary of the variations for this flag */
  variations: AllVariationsSummary;
  /** The number of prerequisites for this flag */
  prerequisites: number;
};

export type FlagTriggerInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "trigger_action"}</code>. */
  instructions?: (Instruction)[];
};

export type FlagsInput = { [key: string]: FlagInput | undefined };

export type FollowFlagMember = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The member's ID */
  _id: string;
  /** The member's first name */
  firstName?: string;
  /** The member's last name */
  lastName?: string;
  /** The member's base role. If the member has no additional roles, this role will be in effect. */
  role: string;
  /** The member's email address */
  email: string;
};

export type ForbiddenErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type FormVariable = {
  key?: string;
  name?: string;
  type?: string;
  description?: string;
  placeholder?: string;
  isOptional?: boolean;
  defaultValue?: unknown;
  allowedValues?: (string)[];
  dynamicOptions?: DynamicOptions;
};

export type FormVariableConfig = { [key: string]: unknown | undefined };

export type GenerateTrustPolicyPostRep = {
  /** The AWS trust policy */
  awsTrustPolicy?: TrustPolicyDetails;
};

export type GenerateWarehouseDestinationKeyPairPostRep = {
  /** The public key used by LaunchDarkly */
  public_key?: string;
  /** The public key to assign in your Snowflake worksheet */
  public_key_pkcs8?: string;
};

export type HmacSignature = {
  headerName?: string;
  hmacSecretFormVariableKey?: string;
};

export type HeaderItems = {
  name?: string;
  value?: string;
};

export type HoldoutDetailRep = {
  _id: string;
  status: "created" | "enabled" | "running" | "ended";
  description?: string;
  /** The percentage of traffic allocated to this holdout. */
  holdoutAmount: string;
  /** Indicates if the holdout experiment is running and if any related experiments are running. */
  isDirty?: boolean;
  createdAt: UnixMillis;
  updatedAt: UnixMillis;
  baseExperiment: Experiment;
  relatedExperiments?: (Experiment)[];
};

export type HoldoutPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
  instructions: Instructions;
};

export type HoldoutPostRequest = {
  /** A human-friendly name for the holdout */
  name?: string;
  /** A key that identifies the holdout */
  key?: string;
  /** Description of the holdout */
  description?: string;
  /** The chosen randomization unit for the holdout base experiment */
  randomizationunit?: string;
  /** The attributes that the holdout iteration's results can be sliced by */
  attributes?: (string)[];
  /** Audience allocation for the holdout */
  holdoutamount?: string;
  /** The key of the primary metric for this holdout */
  primarymetrickey?: string;
  /** Details on the metrics for this experiment */
  metrics?: (MetricInput)[];
  /** The key of the flag that the holdout is dependent on */
  prerequisiteflagkey?: string;
  /** Maintainer id */
  maintainerId?: string;
};

export type HoldoutRep = {
  _id: string;
  status: "created" | "enabled" | "running" | "ended";
  description?: string;
  /** The percentage of traffic allocated to this holdout. */
  holdoutAmount: string;
  createdAt: UnixMillis;
  updatedAt: UnixMillis;
  baseExperiment: Experiment;
  experiments?: (RelatedExperimentRep)[];
};

export type HoldoutsCollectionRep = {
  items?: (SimpleHoldoutRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The total number of holdouts in this project and environment. */
  total_count?: number;
};

export type HunkRep = {
  /** Line number of beginning of code reference hunk */
  startingLineNumber: number;
  /** Contextual lines of code that include the referenced feature flag */
  lines?: string;
  /** The project key */
  projKey?: string;
  /** The feature flag key */
  flagKey?: string;
  /** An array of flag key aliases */
  aliases?: (string)[];
};

export type Import = {
  /** The import ID */
  id: string;
  /** The segment key */
  segmentKey: string;
  /** Timestamp of when this import was created */
  creationTime: UnixMillis;
  /** The import mode used, either <code>merge</code> or <code>replace</code> */
  mode: string;
  /** The import status */
  status: "preparing" | "pending_approval" | "ready" | "in_progress" | "complete" | "stopped";
  /** The imported files and their status */
  files?: (FileRep)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type InitiatorRep = {
  /** The name of the member who initiated the export */
  name?: string;
  /** The email address of the member who initiated the export */
  email?: string;
};

export type Instruction = { [key: string]: unknown | undefined };

export type Instructions = (Instruction)[];

export type Integration = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The ID for this integration audit log subscription */
  _id?: string;
  /** The type of integration */
  kind?: string;
  /** A human-friendly name for the integration */
  name?: string;
  /** Details on configuration for an integration of this type. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> for a full list of fields for each integration. */
  config?: { [key: string]: unknown | undefined };
  /** Represents a Custom role policy, defining a resource kinds filter the integration audit log subscription responds to. */
  statements?: (Statement)[];
  /** Whether the integration is currently active */
  on?: boolean;
  /** An array of tags for this integration */
  tags?: (string)[];
  /** Details on the allowed and denied actions for this subscription */
  _access?: Access;
  /** Details on the most recent successes and errors for this integration */
  _status?: IntegrationSubscriptionStatusRep;
  /** Slack webhook receiver URL. Only used for legacy Slack webhook integrations. */
  url?: string;
  /** Datadog API key. Only used for legacy Datadog webhook integrations. */
  apiKey?: string;
};

export type IntegrationConfigurationCollectionRep = {
  /** An array of integration configurations */
  items: (IntegrationConfigurationsRep)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type IntegrationConfigurationPost = {
  /** The name of the integration configuration */
  name: string;
  /** Whether the integration configuration is enabled. If omitted, defaults to true */
  enabled?: boolean;
  /** Tags for the integration */
  tags?: (string)[];
  /** The unique set of fields required to configure the integration. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> at https://github.com/launchdarkly/integration-framework/tree/main/integrations for a full list of fields for the integration you wish to configure. */
  configValues: { [key: string]: unknown | undefined };
  /** The capability configuration for the integration */
  capabilityConfig?: CapabilityConfigPost;
};

export type IntegrationConfigurationsRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The unique identifier for this integration configuration */
  _id: string;
  /** A human-friendly name for the integration */
  name: string;
  /** The time the integration configuration was created */
  _createdAt?: UnixMillis;
  /** The type of integration */
  _integrationKey?: string;
  /** An array of tags for this integration */
  tags?: (string)[];
  /** Whether the integration is currently active */
  enabled?: boolean;
  /** Details on the allowed and denied actions for this integration configuration */
  _access?: Access;
  /** Details on configuration for an integration of this type. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> for a full list of fields for each integration. */
  configValues?: { [key: string]: unknown | undefined };
  /** The capability configuration for the integration */
  capabilityConfig?: CapabilityConfigRep;
  /** Consolidated SQL script for Snowflake Warehouse Native Experimentation setup. Present only for setup endpoint responses. */
  snowflakeSetupScript?: string;
  /** SQL setup scripts (4 parts) for Redshift Native Experimentation setup. Present only for setup endpoint responses. */
  redshiftSetupScripts?: (string)[];
  /** IAM permissions policy JSON for the customer's Redshift IAM role. Present only for setup endpoint responses. */
  redshiftIAMPermissionsPolicy?: string;
  /** IAM trust policy JSON for the customer's Redshift IAM role. Present only for setup endpoint responses. */
  redshiftIAMTrustPolicy?: string;
};

export type IntegrationDeliveryConfiguration = {
  /** The location and content type of related resources */
  _links: IntegrationDeliveryConfigurationLinks;
  /** The integration ID */
  _id: string;
  /** The integration key */
  integrationKey: string;
  /** The project key */
  projectKey: string;
  /** The environment key */
  environmentKey: string;
  /** The delivery configuration for the given integration provider. Only included when requesting a single integration by ID. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> for a full list of fields for each integration. */
  config: FormVariableConfig;
  /** Whether the configuration is turned on */
  on: boolean;
  /** List of tags for this configuration */
  tags: (string)[];
  /** Name of the configuration */
  name: string;
  /** Version of the current configuration */
  version: number;
  /** Details on the allowed and denied actions for this configuration */
  _access?: Access;
};

export type IntegrationDeliveryConfigurationCollection = {
  /** The location and content type of related resources */
  _links: IntegrationDeliveryConfigurationCollectionLinks;
  /** An array of integration delivery configurations */
  items: (IntegrationDeliveryConfiguration)[];
};

export type IntegrationDeliveryConfigurationCollectionLinks = {
  self: Link;
  parent?: Link;
};

export type IntegrationDeliveryConfigurationLinks = {
  self: Link;
  parent: Link;
  project: Link;
  environment: Link;
};

export type IntegrationDeliveryConfigurationPost = {
  /** Whether the integration configuration is active. Default value is false. */
  on?: boolean;
  /** The global integration settings, as specified by the <code>formVariables</code> in the <code>manifest.json</code> for this integration. */
  config: FormVariableConfig;
  /** Tags to associate with the integration */
  tags?: (string)[];
  /** Name to identify the integration */
  name?: string;
};

export type IntegrationDeliveryConfigurationResponse = {
  /** The status code returned by the validation */
  statusCode?: number;
  error?: string;
  /** Timestamp of when the validation was performed */
  timestamp?: UnixMillis;
  /** JSON response to the validation request */
  responseBody?: string;
};

export type IntegrationMetadata = {
  externalId: string;
  externalStatus: IntegrationStatus;
  externalUrl: string;
  lastChecked: UnixMillis;
};

export type IntegrationStatus = {
  display: string;
  value: string;
};

export type IntegrationStatusRep = {
  statusCode?: number;
  responseBody?: string;
  timestamp?: UnixMillis;
};

export type IntegrationSubscriptionStatusRep = {
  successCount?: number;
  lastSuccess?: UnixMillis;
  lastError?: UnixMillis;
  errorCount?: number;
  errors?: (IntegrationStatusRep)[];
};

export type Integrations = {
  _links?: { [key: string]: Link | undefined };
  items?: (Integration)[];
  key?: string;
};

export type InvalidRequestErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type IterationInput = {
  /** The expected outcome of this experiment */
  hypothesis: string;
  /** Whether to allow the experiment to reassign traffic to different variations when you increase or decrease the traffic in your experiment audience (true) or keep all traffic assigned to its initial variation (false). Defaults to true. */
  canReshuffleTraffic?: boolean;
  /** Details on the metrics for this experiment */
  metrics: MetricsInput;
  /** The key of the primary metric for this experiment. Either <code>primarySingleMetricKey</code> or <code>primaryFunnelKey</code> must be present. */
  primarySingleMetricKey?: string;
  /** The key of the primary funnel group for this experiment. Either <code>primarySingleMetricKey</code> or <code>primaryFunnelKey</code> must be present. */
  primaryFunnelKey?: string;
  /** Details on the variations you are testing in the experiment. You establish these variations in feature flags, and then reuse them in experiments. */
  treatments: TreatmentsInput;
  /** Details on the feature flag and targeting rules for this iteration */
  flags: FlagsInput;
  /** The unit of randomization for this iteration. Defaults to user. */
  randomizationUnit?: string;
  /** The cadence (in milliseconds) to update the allocation. */
  reallocationFrequencyMillis?: number;
  /** The ID of the covariate CSV */
  covariateId?: string;
  /** The attributes that this iteration's results can be sliced by */
  attributes?: (string)[];
};

export type IterationRep = {
  /** The iteration ID */
  _id?: string;
  /** The expected outcome of this experiment */
  hypothesis: string;
  /** The status of the iteration: <code>not_started</code>, <code>running</code>, <code>stopped</code> */
  status: "not_started" | "running" | "stopped";
  /** Timestamp of when the iteration was created */
  createdAt: UnixMillis;
  /** Timestamp of when the iteration started */
  startedAt?: UnixMillis;
  /** Timestamp of when the iteration ended */
  endedAt?: UnixMillis;
  /** The ID of the treatment chosen when the experiment stopped */
  winningTreatmentId?: string;
  /** The reason you stopped the experiment */
  winningReason?: string;
  /** Whether the experiment may reassign traffic to different variations when the experiment audience changes (true) or must keep all traffic assigned to its initial variation (false). */
  canReshuffleTraffic?: boolean;
  /** Details on the flag used in this experiment */
  flags?: { [key: string]: FlagRep | undefined };
  /** The cadence (in milliseconds) to update the allocation. Only present for multi-armed bandits. */
  reallocationFrequencyMillis?: number;
  /** The current version that the iteration is on */
  version?: number;
  /** Deprecated, use <code>primarySingleMetric</code> and <code>primaryFunnel</code> instead. Details on the primary metric for this experiment. */
  primaryMetric?: DependentMetricOrMetricGroupRep;
  /** Details on the primary metric for this experiment */
  primarySingleMetric?: MetricV2Rep;
  /** Details on the primary funnel group for this experiment */
  primaryFunnel?: DependentMetricGroupRepWithMetrics;
  /** The unit of randomization for this iteration */
  randomizationUnit?: string;
  /** The available attribute filters for this iteration */
  attributes?: (string)[];
  /** Details on the variations you are testing in the experiment */
  treatments?: (TreatmentRep)[];
  /** Deprecated, use <code>metrics</code> instead. Details on the secondary metrics for this experiment. */
  secondaryMetrics?: (MetricV2Rep)[];
  /** Details on the metrics for this experiment */
  metrics?: (DependentMetricOrMetricGroupRep)[];
  /** Snapshot of the layer state on iteration stop, if part of a layer. Otherwise omitted. */
  layerSnapshot?: LayerSnapshotRep;
  /** Details of the covariate file for stratified sampling */
  covariateInfo?: CovariateInfoRep;
};

export type JsonPatch = (PatchOperation)[];

export type LastSeenMetadata = {
  /** The ID of the token used in the member's last session */
  tokenId?: string;
};

export type LayerCollectionRep = {
  /** The layers in the project */
  items: (LayerRep)[];
  /** The total number of layers in the project */
  totalCount: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type LayerConfigurationRep = {
  /** The experiment reservations for the layer */
  reservations: (LayerReservationRep)[];
};

export type LayerPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The environment key used for making environment specific updates. For example, updating the reservation of an experiment */
  environmentKey?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
  instructions: Instructions;
};

export type LayerPost = {
  /** Unique identifier for the layer */
  key: string;
  /** Layer name */
  name: string;
  /** The checkout flow for the application */
  description: string;
};

export type LayerRep = {
  /** The key of the layer */
  key: string;
  /** The name of the layer */
  name: string;
  /** The description of the layer */
  description: string;
  /** The date and time when the layer was created */
  createdAt: UnixMillis;
  /** The unit of randomization for the layer */
  randomizationUnit?: string;
  /** The layer configurations for each requested environment */
  environments?: { [key: string]: LayerConfigurationRep | undefined };
};

export type LayerReservationRep = {
  /** The key of the experiment */
  experimentKey: string;
  /** The key of the flag */
  flagKey: string;
  /** The percentage of traffic reserved for the experiment */
  reservationPercent: number;
};

export type LayerSnapshotRep = {
  /** Key of the layer the experiment was part of */
  key: string;
  /** Layer name at the time this experiment iteration was stopped */
  name: string;
  /** Percent of layer traffic that was reserved in the layer for this experiment iteration */
  reservationPercent: number;
  /** Percent of layer traffic that was reserved for other experiments in the same environment, when this experiment iteration was stopped */
  otherReservationPercent: number;
};

export type LegacyExperimentRep = {
  metricKey?: string;
  _metric?: MetricListingRep;
  environments?: (string)[];
  _environmentSettings?: { [key: string]: ExperimentEnvironmentSettingRep | undefined };
};

export type Link = {
  href?: string;
  type?: string;
};

export type MaintainerRep = {
  /** The ID of the maintainer member, or the key of the maintainer team */
  key: string;
  /** The type of the maintainer */
  kind: "member" | "team";
  /** Details on the member who maintains this resource */
  _member?: MemberSummary;
  /** Details on the team that maintains this resource */
  _team?: MemberTeamSummaryRep;
};

export type MaintainerTeam = {
  /** The key of the maintainer team */
  key: string;
  /** A human-friendly name for the maintainer team */
  name: string;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type Member = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The member's ID */
  _id: string;
  /** The member's first name */
  firstName?: string;
  /** The member's last name */
  lastName?: string;
  /** The member's base role. If the member has no additional roles, this role will be in effect. */
  role: string;
  /** The member's email address */
  email: string;
  /** Whether the member has a pending invitation */
  _pendingInvite: boolean;
  /** Whether the member's email address has been verified */
  _verified: boolean;
  /** The member's email address before it has been verified, for accounts where email verification is required */
  _pendingEmail?: string;
  /** The set of additional roles, besides the base role, assigned to the member */
  customRoles: (string)[];
  /** Whether multi-factor authentication is enabled for this member */
  mfa: string;
  /** Default dashboards that the member has chosen to ignore */
  excludedDashboards?: (string)[];
  /** The member's last session date (as Unix milliseconds since epoch) */
  _lastSeen: UnixMillis;
  /** Additional metadata associated with the member's last session, for example, whether a token was used */
  _lastSeenMetadata?: LastSeenMetadata;
  /** Details on the member account in an external source, if this member is provisioned externally */
  _integrationMetadata?: IntegrationMetadata;
  /** Details on the teams this member is assigned to */
  teams?: (MemberTeamSummaryRep)[];
  /** A list of permission grants. Permission grants allow a member to have access to a specific action, without having to create or update a custom role. */
  permissionGrants?: (MemberPermissionGrantSummaryRep)[];
  /** Timestamp of when the member was created */
  creationDate: UnixMillis;
  /** A list of OAuth providers */
  oauthProviders?: (OAuthProviderKind)[];
  /** Version of the current configuration */
  version?: number;
  /** The role attributes for the member */
  roleAttributes?: RoleAttributeMap;
};

export type MemberDataRep = {
  _links?: { [key: string]: Link | undefined };
  /** The member ID */
  _id?: string;
  /** The member email */
  email?: string;
  /** The member first name */
  firstName?: string;
  /** The member last name */
  lastName?: string;
};

export type MemberImportItem = {
  /** An error message, including CSV line number, if the <code>status</code> is <code>error</code> */
  message?: string;
  /** Whether this member can be successfully imported (<code>success</code>) or not (<code>error</code>). Even if the status is <code>success</code>, members are only added to a team on a <code>201</code> response. */
  status: string;
  /** The email address for the member requested to be added to this team. May be blank or an error, such as 'invalid email format', if the email address cannot be found or parsed. */
  value: string;
};

export type MemberPermissionGrantSummaryRep = {
  /** The name of the group of related actions to allow. A permission grant may have either an <code>actionSet</code> or a list of <code>actions</code> but not both at the same time. */
  actionSet?: string;
  /** A list of actions to allow. A permission grant may have either an <code>actionSet</code> or a list of <code>actions</code> but not both at the same time. */
  actions?: (string)[];
  /** The resource for which the actions are allowed */
  resource: string;
};

export type MemberSummary = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The member's ID */
  _id: string;
  /** The member's first name */
  firstName?: string;
  /** The member's last name */
  lastName?: string;
  /** The member's base role. If the member has no additional roles, this role will be in effect. */
  role: string;
  /** The member's email address */
  email: string;
};

export type MemberTeamSummaryRep = {
  /** A list of keys of the custom roles this team has access to */
  customRoleKeys: (string)[];
  /** The team key */
  key: string;
  _links?: { [key: string]: Link | undefined };
  /** The team name */
  name: string;
};

export type MemberTeamsPostInput = {
  /** List of team keys */
  teamKeys: (string)[];
};

export type Members = {
  /** An array of members */
  items: (Member)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The number of members returned */
  totalCount?: number;
};

export type MethodNotAllowedErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type MetricCollectionRep = {
  /** An array of metrics */
  items?: (MetricListingRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  totalCount?: number;
};

export type MetricDataSourceRefRep = {
  key: string;
  environmentKey?: string;
  _name?: string;
  _integrationKey?: string;
};

export type MetricEventDefaultRep = {
  /** Whether to disable defaulting missing unit events when calculating results. Defaults to false */
  disabled?: boolean;
  /** The default value applied to missing unit events. Set to 0 when <code>disabled</code> is false. No other values are currently supported. */
  value?: number;
};

export type MetricGroupCollectionRep = {
  /** An array of metric groups */
  items: (MetricGroupRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  totalCount?: number;
};

export type MetricGroupPost = {
  /** A unique key to reference the metric group */
  key?: string;
  /** A human-friendly name for the metric group */
  name: string;
  /** The type of the metric group */
  kind: "funnel" | "standard";
  /** Description of the metric group */
  description?: string;
  /** The ID of the member who maintains this metric group */
  maintainerId: string;
  /** Tags for the metric group */
  tags: (string)[];
  /** An ordered list of the metrics in this metric group */
  metrics: (MetricInMetricGroupInput)[];
};

export type MetricGroupRep = {
  /** The ID of this metric group */
  _id: string;
  /** A unique key to reference the metric group */
  key: string;
  /** A human-friendly name for the metric group */
  name: string;
  /** The type of the metric group */
  kind: "funnel" | "standard";
  /** Description of the metric group */
  description?: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on the allowed and denied actions for this metric group */
  _access?: Access;
  /** Tags for the metric group */
  tags: (string)[];
  /** Timestamp of when the metric group was created */
  _creationDate: UnixMillis;
  /** Timestamp of when the metric group was last modified */
  _lastModified: UnixMillis;
  /** The maintainer of this metric */
  maintainer: MaintainerRep;
  /** An ordered list of the metrics in this metric group */
  metrics: (MetricInGroupRep)[];
  /** The version of this metric group */
  _version: number;
  /** Experiments that use this metric group. Only included if specified in the <code>expand</code> query parameter in a <code>getMetricGroup</code> request. */
  experiments?: DependentExperimentListRep;
  /** The number of experiments using this metric group */
  experimentCount?: number;
  /** The number of active experiments using this metric group */
  activeExperimentCount?: number;
  /** The number of active guarded rollouts using this metric group */
  activeGuardedRolloutCount?: number;
};

export type MetricInGroupRep = {
  /** The metric key */
  key: string;
  /** The version ID of the metric */
  _versionId?: string;
  /** The metric name */
  name: string;
  /** The kind of event the metric tracks */
  kind: "pageview" | "click" | "custom" | "trace";
  /** For custom metrics, whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). */
  isNumeric?: boolean;
  /** The type of unit aggregation to use for the metric */
  unitAggregationType?: "sum" | "average";
  /** The event key sent with the metric. Only relevant for custom metrics. */
  eventKey?: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Name of the metric when used within the associated metric group. Can be different from the original name of the metric. Required if and only if the metric group is a <code>funnel</code>. */
  nameInGroup?: string;
  /** Deprecated, use <code>analysisUnits</code> instead. */
  randomizationUnits?: (string)[];
  /** An array of analysis units allowed for this metric. */
  analysisUnits?: (string)[];
};

export type MetricInMetricGroupInput = {
  /** The metric key */
  key: string;
  /** Name of the metric when used within the associated metric group. Can be different from the original name of the metric */
  nameInGroup: string;
};

export type MetricInput = {
  /** The metric key */
  key: string;
  /** Whether this is a metric group (true) or a metric (false). Defaults to false */
  isGroup?: boolean;
  /** Deprecated, use <code>primarySingleMetricKey</code> and <code>primaryFunnelKey</code>. Whether this is a primary metric (true) or a secondary metric (false) */
  primary?: boolean;
};

export type MetricListingRep = {
  /** The number of experiments using this metric */
  experimentCount?: number;
  /** The number of metric groups using this metric */
  metricGroupCount?: number;
  /** The number of active experiments using this metric */
  activeExperimentCount?: number;
  /** The number of active guarded rollouts using this metric */
  activeGuardedRolloutCount?: number;
  /** The ID of this metric */
  _id: string;
  /** The version ID of the metric */
  _versionId: string;
  /** Version of the metric */
  _version?: number;
  /** A unique key to reference the metric */
  key: string;
  /** A human-friendly name for the metric */
  name: string;
  /** The kind of event the metric tracks */
  kind: "pageview" | "click" | "custom" | "trace";
  /** The number of feature flags currently attached to this metric */
  _attachedFlagCount?: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on how to access the metric in the LaunchDarkly UI */
  _site?: Link;
  /** Details on the allowed and denied actions for this metric */
  _access?: Access;
  /** Tags for the metric */
  tags: (string)[];
  /** Timestamp of when the metric was created */
  _creationDate: UnixMillis;
  lastModified?: Modification;
  /** The ID of the member who maintains this metric */
  maintainerId?: string;
  /** Details on the member who maintains this metric */
  _maintainer?: MemberSummary;
  /** Description of the metric */
  description?: string;
  /** The category of the metric */
  category?: string;
  /** For custom and trace metrics, whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). */
  isNumeric?: boolean;
  /** For custom and trace metrics, the success criteria */
  successCriteria?: "HigherThanBaseline" | "LowerThanBaseline";
  /** For numeric custom and trace metrics, the unit of measure */
  unit?: string;
  /** For custom metrics, the event key to use in your code */
  eventKey?: string;
  /** Deprecated, use <code>analysisUnits</code> instead. */
  randomizationUnits?: (string)[];
  /** An array of analysis units allowed for this metric. */
  analysisUnits?: (string)[];
  /** The filters narrowing down the audience based on context attributes or event properties. */
  filters?: Filter;
  /** The method by which multiple unit event values are aggregated */
  unitAggregationType?: "average" | "sum";
  /** The method for analyzing metric events */
  analysisType?: "mean" | "percentile";
  /** The percentile for the analysis method. An integer denoting the target percentile between 0 and 100. Required when <code>analysisType</code> is <code>percentile</code>. */
  percentileValue?: number;
  eventDefault?: MetricEventDefaultRep;
  dataSource: MetricDataSourceRefRep;
  /** Timestamp of most recent data for this metric, at one-hour fidelity */
  lastSeen?: UnixMillis;
  /** Whether the metric version is archived */
  archived?: boolean;
  /** Timestamp when the metric version was archived */
  archivedAt?: UnixMillis;
  /** For click metrics, the CSS selectors */
  selector?: string;
  /** For click and pageview metrics, the target URLs */
  urls?: UrlMatchers;
  /** Not yet implemented - The start of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowStartOffset?: number;
  /** Not yet implemented - The end of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowEndOffset?: number;
  /** Lower winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, defines a two-sided clamp range. Otherwise lower-only winsorization. */
  winsorLowerPercentile?: number;
  /** Upper winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, must be greater than winsorLowerPercentile. */
  winsorUpperPercentile?: number;
  /** When true, the percentile bound calculation excludes imputed zeros. Only meaningful when at least one bound is set and the metric includes units that didn't send events. */
  winsorExcludeImputed?: boolean;
  /** For trace metrics, the trace query to use for the metric. */
  traceQuery?: string;
  /** For trace metrics, the location in the trace to use for numeric values. */
  traceValueLocation?: string;
};

export type MetricPost = {
  /** A unique key to reference the metric */
  key: string;
  /** A human-friendly name for the metric */
  name?: string;
  /** Description of the metric */
  description?: string;
  /** The kind of event your metric will track */
  kind: "pageview" | "click" | "custom" | "trace";
  /** One or more CSS selectors. Required for click metrics only. */
  selector?: string;
  /** One or more target URLs. Required for click and pageview metrics only. */
  urls?: (UrlPost)[];
  /** Whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). Required for custom and trace metrics only. */
  isNumeric?: boolean;
  /** The unit of measure. Applicable for numeric custom and trace metrics only. */
  unit?: string;
  /** The event key to use in your code. Required for custom conversion/binary and custom numeric metrics only. */
  eventKey?: string;
  /** Success criteria. Required for custom and trace numeric metrics, optional for custom and trace conversion metrics. */
  successCriteria?: "HigherThanBaseline" | "LowerThanBaseline";
  /** Tags for the metric */
  tags?: (string)[];
  /** Deprecated, use <code>analysisUnits</code> instead. */
  randomizationUnits?: (string)[];
  /** An array of analysis units allowed for this metric. */
  analysisUnits?: (string)[];
  /** The ID of the member who maintains this metric */
  maintainerId?: string;
  /** The method by which multiple unit event values are aggregated */
  unitAggregationType?: "average" | "sum";
  /** The method for analyzing metric events */
  analysisType?: string;
  /** The percentile for the analysis method. An integer denoting the target percentile between 0 and 100. Required when <code>analysisType</code> is <code>percentile</code>. */
  percentileValue?: number;
  eventDefault?: MetricEventDefaultRep;
  dataSource?: MetricDataSourceRefRep;
  /** Filters for the metric to exclude certain events from being included. This is only supported for custom metrics. */
  filters?: EventFilter;
  /** Not yet implemented - The start of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowStartOffset?: number;
  /** Not yet implemented - The end of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowEndOffset?: number;
  /** Lower winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, defines a two-sided clamp range. Otherwise lower-only winsorization. */
  winsorLowerPercentile?: number;
  /** Upper winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, must be greater than winsorLowerPercentile. */
  winsorUpperPercentile?: number;
  /** When true, the percentile bound calculation excludes imputed zeros. Only meaningful when at least one bound is set and the metric includes units that didn't send events. */
  winsorExcludeImputed?: boolean;
  /** The trace query to use for the metric. Required for trace metrics. */
  traceQuery?: string;
  /** The location in the trace to use for numeric values. Required for numeric trace metrics. */
  traceValueLocation?: string;
};

export type MetricRep = {
  /** The number of experiments using this metric */
  experimentCount?: number;
  /** The number of metric groups using this metric */
  metricGroupCount?: number;
  /** The number of active experiments using this metric */
  activeExperimentCount?: number;
  /** The number of active guarded rollouts using this metric */
  activeGuardedRolloutCount?: number;
  /** The ID of this metric */
  _id: string;
  /** The version ID of the metric */
  _versionId: string;
  /** Version of the metric */
  _version?: number;
  /** A unique key to reference the metric */
  key: string;
  /** A human-friendly name for the metric */
  name: string;
  /** The kind of event the metric tracks */
  kind: "pageview" | "click" | "custom" | "trace";
  /** The number of feature flags currently attached to this metric */
  _attachedFlagCount?: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on how to access the metric in the LaunchDarkly UI */
  _site?: Link;
  /** Details on the allowed and denied actions for this metric */
  _access?: Access;
  /** Tags for the metric */
  tags: (string)[];
  /** Timestamp of when the metric was created */
  _creationDate: UnixMillis;
  lastModified?: Modification;
  /** The ID of the member who maintains this metric */
  maintainerId?: string;
  /** Details on the member who maintains this metric */
  _maintainer?: MemberSummary;
  /** Description of the metric */
  description?: string;
  /** The category of the metric */
  category?: string;
  /** For custom and trace metrics, whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). */
  isNumeric?: boolean;
  /** For custom and trace metrics, the success criteria */
  successCriteria?: "HigherThanBaseline" | "LowerThanBaseline";
  /** For numeric custom and trace metrics, the unit of measure */
  unit?: string;
  /** For custom metrics, the event key to use in your code */
  eventKey?: string;
  /** Deprecated, use <code>analysisUnits</code> instead. */
  randomizationUnits?: (string)[];
  /** An array of analysis units allowed for this metric. */
  analysisUnits?: (string)[];
  /** The filters narrowing down the audience based on context attributes or event properties. */
  filters?: Filter;
  /** The method by which multiple unit event values are aggregated */
  unitAggregationType?: "average" | "sum";
  /** The method for analyzing metric events */
  analysisType?: "mean" | "percentile";
  /** The percentile for the analysis method. An integer denoting the target percentile between 0 and 100. Required when <code>analysisType</code> is <code>percentile</code>. */
  percentileValue?: number;
  eventDefault?: MetricEventDefaultRep;
  dataSource: MetricDataSourceRefRep;
  /** Timestamp of most recent data for this metric, at one-hour fidelity */
  lastSeen?: UnixMillis;
  /** Whether the metric version is archived */
  archived?: boolean;
  /** Timestamp when the metric version was archived */
  archivedAt?: UnixMillis;
  /** For click metrics, the CSS selectors */
  selector?: string;
  /** For click and pageview metrics, the target URLs */
  urls?: UrlMatchers;
  /** Not yet implemented - The start of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowStartOffset?: number;
  /** Not yet implemented - The end of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowEndOffset?: number;
  /** Lower winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, defines a two-sided clamp range. Otherwise lower-only winsorization. */
  winsorLowerPercentile?: number;
  /** Upper winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, must be greater than winsorLowerPercentile. */
  winsorUpperPercentile?: number;
  /** When true, the percentile bound calculation excludes imputed zeros. Only meaningful when at least one bound is set and the metric includes units that didn't send events. */
  winsorExcludeImputed?: boolean;
  /** For trace metrics, the trace query to use for the metric. */
  traceQuery?: string;
  /** For trace metrics, the location in the trace to use for numeric values. */
  traceValueLocation?: string;
  /** Experiments that use this metric, including those using a metric group that contains this metric */
  experiments?: DependentExperimentListRep;
  /** Metric groups that use this metric */
  metricGroups?: (DependentMetricGroupRep)[];
  /** The most recent experiment that used this metric */
  lastUsedInExperiment?: DependentExperimentRep;
  /** The most recent guarded rollout that used this metric */
  lastUsedInGuardedRollout?: DependentMeasuredRolloutRep;
  /** Whether the metric is active */
  isActive?: boolean;
  /** Details on the flags attached to this metric */
  _attachedFeatures?: (FlagListingRep)[];
};

export type MetricV2Rep = {
  /** The metric key */
  key: string;
  /** The version ID of the metric */
  _versionId?: string;
  /** The metric name */
  name: string;
  /** The kind of event the metric tracks */
  kind: "pageview" | "click" | "custom" | "trace";
  /** For custom metrics, whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). */
  isNumeric?: boolean;
  /** The type of unit aggregation to use for the metric */
  unitAggregationType?: "sum" | "average";
  /** The event key sent with the metric. Only relevant for custom metrics. */
  eventKey?: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type MetricsInput = (MetricInput)[];

export type MigrationFlagStageCount = number;

export type MigrationSafetyIssueRep = {
  /** The ID of the rule which caused this issue */
  causingRuleId?: string;
  /** A list of the IDs of the rules which are affected by this issue. <code>fallthrough</code> is a sentinel value for the default rule. */
  affectedRuleIds?: (string)[];
  /** A description of the issue that <code>causingRuleId</code> has caused for <code>affectedRuleIds</code>. */
  issue?: string;
  /** Whether the changes caused by <code>causingRuleId</code> bring inconsistency to the old system */
  oldSystemAffected?: boolean;
};

export type MigrationSettingsPost = {
  /** Context kind for a migration with 6 stages, where data is being moved */
  contextKind?: string;
  stageCount: MigrationFlagStageCount;
};

export type Modification = {
  date?: string;
};

export type MultiEnvironmentDependentFlag = {
  /** The flag name */
  name?: string;
  /** The flag key */
  key: string;
  /** A list of environments in which the dependent flag appears */
  environments: (DependentFlagEnvironment)[];
};

export type MultiEnvironmentDependentFlags = {
  /** An array of dependent flags with their environment information */
  items: (MultiEnvironmentDependentFlag)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** Details on how to access the prerequisite flag in the LaunchDarkly UI */
  _site: Link;
};

export type MutableFieldsByStatusRep = {
  not_started?: { [key: string]: (FieldAction)[] | undefined };
  running?: { [key: string]: (FieldAction)[] | undefined };
  stopped?: { [key: string]: (FieldAction)[] | undefined };
};

export type NamingConvention = {
  /** The casing convention to enforce for new flag keys in this project */
  case?: "camelCase" | "upperCamelCase" | "snakeCase" | "kebabCase" | "constantCase";
  /** The prefix to enforce for new flag keys in this project */
  prefix?: string;
};

export type NewMemberForm = {
  /** The member's email */
  email: string;
  /** The member's password */
  password?: string;
  /** The member's first name */
  firstName?: string;
  /** The member's last name */
  lastName?: string;
  /** The member's initial role, if you are using a base role for the initial role */
  role?: "reader" | "writer" | "admin" | "no_access";
  /** An array of the member's initial roles, if you are using custom roles or preset roles provided by LaunchDarkly */
  customRoles?: (string)[];
  /** An array of the member's teams */
  teamKeys?: (string)[];
  /** An object of role attributes for the member */
  roleAttributes?: RoleAttributeMap;
};

export type NewMemberFormListPost = (NewMemberForm)[];

export type NotFoundErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type OAuthProviderKind = string;

export type ObjectId = string;

export type Operator = string;

export type OptionsArray = {
  label?: string;
  value?: string;
};

export type ParameterDefault = {
  /** The default value for the given parameter */
  value?: unknown;
  /** Variation value for boolean flags. Not applicable for non-boolean flags. */
  booleanVariationValue?: boolean;
  /** Metadata related to add rule instructions */
  ruleClause?: RuleClause;
};

export type ParameterRep = {
  variationId?: string;
  flagKey?: string;
};

export type ParentResourceRep = {
  _links?: { [key: string]: Link | undefined };
  /** The name of the parent resource */
  name?: string;
  /** The parent's resource specifier */
  resource?: string;
};

export type PatchFailedErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type PatchOperation = {
  /** The type of operation to perform */
  op: string;
  /** A JSON Pointer string specifying the part of the document to operate on */
  path: string;
  /** A JSON value used in "add", "replace", and "test" operations */
  value?: unknown;
};

export type PatchWithComment = {
  /** A JSON patch representation of the change to make */
  patch: JsonPatch;
  /** Optional comment */
  comment?: string;
};

export type Phase = {
  /** The phase ID */
  id: string;
  /** An ordered list of the audiences for this release phase. Each audience corresponds to a LaunchDarkly environment. */
  audiences: Audiences;
  /** The release phase name */
  name: string;
  /** The configuration for the phase's rollout. */
  configuration?: PhaseConfiguration;
};

export type PhaseConfiguration = { [key: string]: unknown };

export type PhaseInfo = {
  /** The phase ID */
  _id: string;
  /** The release phase name */
  name: string;
  /** The number of active releases in this phase */
  releaseCount: number;
};

export type PhaseStatus = string;

export type PostFlagScheduledChangesInput = {
  /** Optional comment describing the scheduled changes */
  comment?: string;
  /** When the scheduled changes should be executed */
  executionDate: UnixMillis;
  /** The actions to perform on the execution date for these scheduled changes. This should be an array with a single object that looks like <code>{"kind": "scheduled_action"}</code>. Supported scheduled actions include any semantic patch instructions available when updating a feature flag. */
  instructions: Instructions;
};

export type Prerequisite = {
  key: string;
  variation: number;
};

export type Project = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID of this project */
  _id: string;
  /** The key of this project */
  key: string;
  /** Whether or not flags created in this project are made available to the client-side JavaScript SDK by default */
  includeInSnippetByDefault: boolean;
  /** Describes which client-side SDKs can use new flags by default */
  defaultClientSideAvailability?: ClientSideAvailability;
  /** A human-friendly name for the project */
  name: string;
  /** Details on the allowed and denied actions for this project */
  _access?: Access;
  /** A list of tags for the project */
  tags: (string)[];
  /** The key of the default release pipeline for this project */
  defaultReleasePipelineKey?: string;
  /** A paginated list of environments for the project. By default this field is omitted unless expanded by the client. */
  environments?: Environments;
};

export type ProjectPost = {
  /** A human-friendly name for the project. */
  name: string;
  /** A unique key used to reference the project in your code. */
  key: string;
  /** Whether or not flags created in this project are made available to the client-side JavaScript SDK by default. */
  includeInSnippetByDefault?: boolean;
  /** Controls which client-side SDKs can use new flags by default. */
  defaultClientSideAvailability?: DefaultClientSideAvailabilityPost;
  /** Tags for the project */
  tags?: (string)[];
  /** Creates the provided environments for this project. If omitted default environments will be created instead. */
  environments?: (EnvironmentPost)[];
  /** The flag key convention for this project. Omit this field if you don't want to enforce any conventions for flag keys. */
  namingConvention?: NamingConvention;
};

export type ProjectRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID of this project */
  _id: string;
  /** The key of this project */
  key: string;
  /** Whether or not flags created in this project are made available to the client-side JavaScript SDK by default */
  includeInSnippetByDefault: boolean;
  /** Describes which client-side SDKs can use new flags by default */
  defaultClientSideAvailability?: ClientSideAvailability;
  /** A human-friendly name for the project */
  name: string;
  /** Details on the allowed and denied actions for this project */
  _access?: Access;
  /** A list of tags for the project */
  tags: (string)[];
  /** The key of the default release pipeline for this project */
  defaultReleasePipelineKey?: string;
  /** A list of environments for the project */
  environments: (Environment)[];
};

export type ProjectSummary = {
  /** The ID of this project */
  _id: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The project key */
  key: string;
  /** The project name */
  name: string;
};

export type Projects = {
  /** A link to this resource. */
  _links: { [key: string]: Link | undefined };
  /** List of projects. */
  items: (Project)[];
  totalCount?: number;
};

export type RandomizationSettingsPut = {
  /** An array of randomization units allowed for this project. */
  randomizationUnits: (RandomizationUnitInput)[];
};

export type RandomizationSettingsRep = {
  /** The project ID */
  _projectId?: string;
  /** The project key */
  _projectKey?: string;
  /** An array of the randomization units in this project */
  randomizationUnits?: (RandomizationUnitRep)[];
  /** Timestamp of when the experiment was created */
  _creationDate?: UnixMillis;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type RandomizationUnitInput = {
  /** The unit of randomization. Must match the key of an existing context kind in this project. */
  randomizationUnit: string;
  /** If true, any experiment iterations created within this project will default to using this randomization unit. A project can only have one default randomization unit. */
  default?: boolean;
  /** (deprecated) This field is deprecated and will be removed. Use randomizationUnit instead. */
  standardRandomizationUnit?: string;
};

export type RandomizationUnitRep = {
  /** The unit of randomization. Defaults to user. */
  randomizationUnit?: string;
  /** Whether this randomization unit is the default for experiments */
  default?: boolean;
  _hidden?: boolean;
  /** The display name for the randomization unit, displayed in the LaunchDarkly user interface. */
  _displayName?: string;
};

export type RateLimitedErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type RecentTriggerBody = {
  /** Timestamp of the incoming trigger webhook */
  timestamp?: UnixMillis;
  /** The marshalled JSON request body for the incoming trigger webhook. If this is empty or contains invalid JSON, the timestamp is recorded but this field will be empty. */
  jsonBody?: { [key: string]: unknown | undefined };
};

export type ReferenceRep = {
  /** File path of the reference */
  path: string;
  /** Programming language used in the file */
  hint?: string;
  hunks: (HunkRep)[];
};

export type RelatedExperimentRep = {
  key?: string;
  name?: string;
  environment?: string;
};

export type RelatedFlag = {
  key: string;
};

export type RelayAutoConfigCollectionRep = {
  /** An array of Relay Proxy configurations */
  items: (RelayAutoConfigRep)[];
};

export type RelayAutoConfigPost = {
  /** A human-friendly name for the Relay Proxy configuration */
  name: string;
  /** A description of what environments and projects the Relay Proxy should include or exclude. To learn more, read [Write an inline policy](https://launchdarkly.com/docs/sdk/relay-proxy/automatic-configuration#write-an-inline-policy). */
  policy: (Statement)[];
};

export type RelayAutoConfigRep = {
  /** The ID of the Relay Proxy configuration */
  _id: ObjectId;
  /** Details on the member who created this Relay Proxy configuration */
  _creator?: MemberSummary;
  /** Details on the allowed and denied actions for this Relay Proxy configuration */
  _access?: Access;
  /** A human-friendly name for the Relay Proxy configuration */
  name: string;
  /** A description of what environments and projects the Relay Proxy should include or exclude */
  policy: (Statement)[];
  /** The Relay Proxy configuration key */
  fullKey?: string;
  /** The last few characters of the Relay Proxy configuration key, displayed in the LaunchDarkly UI */
  displayKey: string;
  /** Timestamp of when the Relay Proxy configuration was created */
  creationDate: UnixMillis;
  /** Timestamp of when the Relay Proxy configuration was most recently modified */
  lastModified: UnixMillis;
};

export type Release = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The release pipeline name */
  name: string;
  /** The release pipeline key */
  releasePipelineKey: string;
  /** The release pipeline description */
  releasePipelineDescription: string;
  /** An ordered list of the release pipeline phases */
  phases: (ReleasePhase)[];
  /** The release version */
  _version: number;
  /** The chosen release variation ID to use across all phases of a release */
  _releaseVariationId?: string;
  /** Timestamp of when the release was canceled */
  _canceledAt?: UnixMillis;
};

export type ReleaseAudience = {
  /** The audience ID */
  _id: string;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Details about the environment. If the environment is deleted, this field will be omitted. */
  environment?: EnvironmentSummary;
  /** The release phase name */
  name: string;
  /** The audience configuration */
  configuration?: AudienceConfiguration;
  /** A list of segment keys */
  segmentKeys?: (string)[];
  /** The audience status */
  status?: AudienceStatus;
  /** The rules IDs added or updated by this audience */
  _ruleIds?: (string)[];
};

export type ReleaseGuardianConfiguration = {
  /** The monitoring window in milliseconds */
  monitoringWindowMilliseconds: number;
  /** The rollout weight percentage */
  rolloutWeight: number;
  /** Whether or not to roll back on regression */
  rollbackOnRegression: boolean;
  /** The randomization unit for the measured rollout */
  randomizationUnit?: string;
};

export type ReleaseGuardianConfigurationInput = {
  /** The monitoring window in milliseconds */
  monitoringWindowMilliseconds?: number;
  /** The rollout weight */
  rolloutWeight?: number;
  /** Whether or not to rollback on regression */
  rollbackOnRegression?: boolean;
  /** The randomization unit for the measured rollout */
  randomizationUnit?: string;
};

export type ReleasePhase = {
  /** The phase ID */
  _id: string;
  /** The release phase name */
  _name: string;
  /** Whether this phase is complete */
  complete: boolean;
  /** Timestamp of when the release phase was created */
  _creationDate: UnixMillis;
  /** Timestamp of when the release phase was completed */
  _completionDate?: UnixMillis;
  /** Details about how this phase was marked as complete */
  _completedBy?: CompletedBy;
  /** A logical grouping of one or more environments that share attributes for rolling out changes */
  _audiences: (ReleaseAudience)[];
  /** Status of the phase */
  status?: PhaseStatus;
  /** Whether or not this phase has started */
  started?: boolean;
  /** Timestamp of when the release phase was started */
  _startedDate?: UnixMillis;
  /** The phase configuration */
  configuration?: PhaseConfiguration;
};

export type ReleasePipeline = {
  /** Timestamp of when the release pipeline was created */
  createdAt: string;
  /** The release pipeline description */
  description?: string;
  /** The release pipeline key */
  key: string;
  /** The release pipeline name */
  name: string;
  /** An ordered list of the release pipeline phases. Each phase is a logical grouping of one or more environments that share attributes for rolling out changes. */
  phases: (Phase)[];
  /** A list of the release pipeline's tags */
  tags?: (string)[];
  /** The release pipeline version */
  _version?: number;
  /** Details on the allowed and denied actions for this release pipeline */
  _access?: Access;
  /** Whether this release pipeline is the default pipeline for the project */
  isProjectDefault?: boolean;
  /** Whether this release pipeline is a legacy pipeline */
  _isLegacy?: boolean;
};

export type ReleasePipelineCollection = {
  /** An array of release pipelines */
  items: (ReleasePipeline)[];
  /** Total number of release pipelines */
  totalCount: number;
};

export type ReleaseProgression = {
  /** Timestamp of when the release was created */
  _createdAt: UnixMillis;
  /** Timestamp of when the release was completed */
  _completedAt?: UnixMillis;
  /** The flag key */
  flagKey: string;
  /** The ID of the currently active release phase */
  activePhaseId?: string;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ReleaseProgressionCollection = {
  /** The number of active releases */
  activeCount: number;
  /** The number of completed releases */
  completedCount: number;
  /** A list of details for each release, across all flags, for this release pipeline */
  items: (ReleaseProgression)[];
  /** A list of details for each phase, across all releases, for this release pipeline */
  phases: (PhaseInfo)[];
  /** The total number of releases for this release pipeline */
  totalCount: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type ReleaseStrategy = string;

export type ReleaserAudienceConfigInput = {
  /** UUID of the audience. */
  audienceId?: string;
  /** Optional configuration details for the specified audience. Will default to the release pipeline's audience configuration if omitted. */
  releaseGuardianConfiguration?: ReleaseGuardianConfigurationInput;
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds?: (string)[];
  /** An array of team keys. The members of these teams are notified to review the approval request. */
  notifyTeamKeys?: (string)[];
};

export type RepositoryCollectionRep = {
  _links: { [key: string]: Link | undefined };
  /** An array of repositories */
  items: (RepositoryRep)[];
};

export type RepositoryRep = {
  /** The repository name */
  name: string;
  /** A URL to access the repository */
  sourceLink?: string;
  /** A template for constructing a valid URL to view the commit */
  commitUrlTemplate?: string;
  /** A template for constructing a valid URL to view the hunk */
  hunkUrlTemplate?: string;
  /** The type of repository */
  type: "bitbucket" | "custom" | "github" | "gitlab";
  /** The repository's default branch */
  defaultBranch: string;
  /** Whether or not a repository is enabled for code reference scanning */
  enabled: boolean;
  /** The version of the repository's saved information */
  version: number;
  /** An array of the repository's branches that have been scanned for code references */
  branches?: (BranchRep)[];
  _links: { [key: string]: unknown | undefined };
  _access?: Access;
};

export type ResourceAccess = {
  action?: ActionIdentifier;
  resource?: string;
};

export type ResourceCategory = string;

export type ResourceIdResponse = {
  kind?: string;
  projectKey?: string;
  environmentKey?: string;
  flagKey?: string;
  key?: string;
};

export type ResourceId = {
  /** The environment key */
  environmentKey?: string;
  /** Deprecated, use <code>key</code> instead */
  flagKey?: string;
  /** The key of the flag or segment */
  key?: string;
  /** The type of resource, <code>flag</code> or <code>segment</code> */
  kind?: ResourceKind;
  /** The project key */
  projectKey?: string;
};

export type ResourceKind = string;

export type ReviewOutput = {
  _id: string;
  kind: string;
  creationDate?: UnixMillis;
  comment?: string;
  memberId?: string;
  serviceTokenId?: string;
};

export type ReviewResponse = {
  /** The approval request ID */
  _id: string;
  /** The type of review action to take */
  kind: "approve" | "decline" | "comment";
  /** Timestamp of when the request was created */
  creationDate?: UnixMillis;
  /** A comment describing the approval response */
  comment?: string;
  /** ID of account member that reviewed request */
  memberId?: string;
  /** ID of account service token that reviewed request */
  serviceTokenId?: string;
};

export type RoleAttributeMap = { [key: string]: RoleAttributeValues | undefined };

export type RoleAttributeValues = (string)[];

export type RoleType = string;

export type Rollout = {
  variations: (WeightedVariation)[];
  experimentAllocation?: ExperimentAllocationRep;
  seed?: number;
  bucketBy?: string;
  contextKind?: string;
};

export type RootResponse = {
  links: { [key: string]: Link | undefined };
};

export type Rule = {
  /** The flag rule ID */
  _id?: string;
  /** Whether the rule is disabled */
  disabled?: boolean;
  /** The index of the variation, from the array of variations for this flag */
  variation?: number;
  /** Details on the percentage rollout, if it exists */
  rollout?: Rollout;
  /** An array of clauses used for individual targeting based on attributes */
  clauses: (Clause)[];
  /** Whether LaunchDarkly tracks events for this rule */
  trackEvents: boolean;
  /** The rule description */
  description?: string;
  ref?: string;
};

export type RuleClause = {
  /** The attribute the rule applies to, for example, last name or email address */
  attribute?: string;
  /** The operator to apply to the given attribute */
  op?: "in" | "endsWith" | "startsWith" | "matches" | "contains" | "lessThan" | "lessThanOrEqual" | "greaterThan" | "greaterThanOrEqual" | "before" | "after" | "segmentMatch" | "semVerEqual" | "semVerLessThan" | "semVerGreaterThan";
  /** Whether the operator should be negated */
  negate?: boolean;
};

export type ScheduleKind = string;

export type SdkListRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** The list of SDK names */
  sdks: (string)[];
};

export type SdkVersionDetailsRep = {
  name?: string;
  version?: string;
  type?: string;
  projectId?: string;
  projectKey?: string;
  projectName?: string;
  environmentId?: string;
  environmentKey?: string;
  environmentName?: string;
  applicationId?: string;
  ldLatestVersion?: string;
  /** The end of life (EOL) status of the SDK version. Possible values are: <br/>- <code>EolAllClear</code>: the SDK version is current<br/>- <code>EolNear</code>: the SDK version is approaching EOL<br/>- <code>EolPast</code>: the SDK version is past EOL<br/>- <code>MajorVersionAvailable</code>: a new major version is available but the current version is not near EOL<br/>- <code>EolUnknown</code>: the EOL status cannot be determined. */
  eolStatus?: string;
  latestReleaseUrl?: string;
  connectionType?: string;
  relayVersion?: string;
  /** The end of life status of the Relay Proxy version. Only present when the SDK connects through a Relay Proxy. Uses the same values as <code>eolStatus</code>. */
  relayEolStatus?: string;
  relayLatestVersion?: string;
  relayLatestReleaseUrl?: string;
};

export type SdkVersionListRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** The list of SDK names and versions */
  sdkVersions: (SdkVersionRep)[];
};

export type SdkVersionRep = {
  /** The SDK name, or "Unknown" */
  sdk: string;
  /** The version number, or "Unknown" */
  version: string;
};

export type SegmentBody = {
  /** A human-friendly name for the segment */
  name: string;
  /** A unique key used to reference the segment */
  key: string;
  /** A description of the segment's purpose */
  description?: string;
  /** Tags for the segment */
  tags?: (string)[];
  /** Whether to create a standard segment (<code>false</code>) or a big segment (<code>true</code>). Standard segments include rule-based and smaller list-based segments. Big segments include larger list-based segments and synced segments. Only use a big segment if you need to add more than 15,000 individual targets. */
  unbounded?: boolean;
  /** For big segments, the targeted context kind. */
  unboundedContextKind?: string;
};

export type SegmentId = string;

export type SegmentMetadata = {
  envId?: string;
  segmentId?: SegmentId;
  version?: number;
  includedCount?: number;
  excludedCount?: number;
  lastModified?: UnixMillis;
  deleted?: boolean;
};

export type SegmentTarget = {
  values?: (string)[];
  contextKind?: string;
};

export type SegmentUserList = {
  add?: (string)[];
  remove?: (string)[];
};

export type SegmentUserState = {
  included?: SegmentUserList;
  excluded?: SegmentUserList;
};

export type SeriesListRep = {
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** Metadata about each series */
  metadata: (SeriesMetadataRep)[];
  /** An array of data points with timestamps. Each element of the array is an object with a 'time' field, whose value is the timestamp, and one or more key fields. If there are multiple key fields, they are labeled '0', '1', and so on, and are explained in the <code>metadata</code>. */
  series: (SeriesTimeSliceRep)[];
};

export type SeriesListRepFloat = {
  /** The location and content type of related resources */
  _links: { [key: string]: unknown | undefined };
  /** Metadata about each series */
  metadata: (SeriesMetadataRep)[];
  /** An array of data points with timestamps. Each element of the array is an object with a 'time' field, whose value is the timestamp, and one or more key fields. If there are multiple key fields, they are labeled '0', '1', and so on, and are explained in the <code>metadata</code>. */
  series: (SeriesTimeSliceRepFloat)[];
};

export type SeriesMetadataRep = { [key: string]: unknown | undefined };

export type SeriesTimeSliceRep = { [key: string]: number | undefined };

export type SeriesTimeSliceRepFloat = { [key: string]: number | undefined };

export type SimpleHoldoutRep = {
  _id?: string;
  key?: string;
  name?: string;
  status?: string;
  createdAt?: UnixMillis;
  updatedAt?: UnixMillis;
  experiments?: (RelatedExperimentRep)[];
};

export type SourceEnv = {
  /** The key of the source environment to clone from */
  key?: string;
  /** (Optional) The version number of the source environment to clone from. Used for optimistic locking */
  version?: number;
};

export type StageInput = {
  /** The stage name */
  name?: string;
  /** Whether to execute the conditions in sequence for the given stage */
  executeConditionsInSequence?: boolean;
  /** An array of conditions for the stage */
  conditions?: (ConditionInput)[];
  /** An <code>instructions</code> field containing an array of instructions for the stage. Each object in the array uses the semantic patch format for updating a feature flag. */
  action?: ActionInput;
};

export type StageOutput = {
  /** The ID of this stage */
  _id: string;
  /** The stage name */
  name?: string;
  /** An array of conditions for the stage */
  conditions: (ConditionOutput)[];
  /** The type of instruction, and an array of instructions for the stage. Each object in the array uses the semantic patch format for updating a feature flag. */
  action: ActionOutput;
  /** Details on the execution of this stage */
  _execution: ExecutionOutput;
};

export type Statement = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
};

export type StatementPost = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> field must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> field must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
};

export type StatementPostList = (StatementPost)[];

export type StatisticCollectionRep = {
  /** A map of flag keys to a list of code reference statistics for each code repository in which the flag key appears */
  flags: { [key: string]: (StatisticRep)[] | undefined };
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type StatisticRep = {
  /** The repository name */
  name: string;
  /** The type of repository */
  type: "bitbucket" | "custom" | "github" | "gitlab";
  /** A URL to access the repository */
  sourceLink: string;
  /** The repository's default branch */
  defaultBranch: string;
  /** Whether or not a repository is enabled for code reference scanning */
  enabled: boolean;
  /** The version of the repository's saved information */
  version: number;
  /** The number of code reference hunks in which the flag appears in this repository */
  hunkCount: number;
  /** The number of files in which the flag appears in this repository */
  fileCount: number;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The timestamp of the latest commit in the repository including the flag */
  latestCommitTime?: UnixMillis;
};

export type StatisticsRoot = {
  /** The location and content type of all projects that have code references */
  projects?: (Link)[];
  /** The location and content type for accessing this resource */
  self?: Link;
};

export type StatusConflictErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type StatusResponse = {
  integrationId?: string;
  message?: string;
  statusCode?: number;
  timestamp?: UnixMillis;
};

export type StatusServiceUnavailable = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type StoreIntegrationError = {
  statusCode?: number;
  message?: string;
  timestamp?: UnixMillis;
};

export type SubjectDataRep = {
  _links?: { [key: string]: Link | undefined };
  /** The subject's name */
  name?: string;
  /** The subject's avatar */
  avatarUrl?: string;
};

export type Target = {
  /** A list of the keys for targets that will receive this variation because of individual targeting */
  values: (string)[];
  /** The index, from the array of variations for this flag, of the variation to serve this list of targets */
  variation: number;
  /** The context kind of the individual target */
  contextKind?: string;
};

export type TargetResourceRep = {
  _links?: { [key: string]: Link | undefined };
  /** The name of the resource */
  name?: string;
  /** The resource specifier */
  resources?: (string)[];
};

export type Team = {
  /** A description of the team */
  description?: string;
  /** The team key */
  key?: string;
  /** A human-friendly name for the team */
  name?: string;
  /** Details on the allowed and denied actions for this team */
  _access?: Access;
  /** Timestamp of when the team was created */
  _creationDate?: UnixMillis;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Timestamp of when the team was most recently updated */
  _lastModified?: UnixMillis;
  /** The team version */
  _version?: number;
  /** Whether the team has been synced with an external identity provider (IdP). Team sync is available to customers on an Enterprise plan. */
  _idpSynced?: boolean;
  /** A map of role attributes for the team */
  roleAttributes?: RoleAttributeMap;
  /** Paginated list of the custom roles assigned to this team. Only included if specified in the <code>expand</code> query parameter. */
  roles?: TeamCustomRoles;
  /** Details on the total count of members that belong to the team. Only included if specified in the <code>expand</code> query parameter. */
  members?: TeamMembers;
  /** Paginated list of the projects that the team has any write access to. Only included if specified in the <code>expand</code> query parameter. */
  projects?: TeamProjects;
  /** Paginated list of the maintainers assigned to this team. Only included if specified in the <code>expand</code> query parameter. */
  maintainers?: TeamMaintainers;
};

export type TeamCustomRole = {
  /** The key of the custom role */
  key?: string;
  /** The name of the custom role */
  name?: string;
  /** Details on the projects where team members have write privileges on at least one resource type (e.g. flags) */
  projects?: TeamProjects;
  /** Timestamp of when the custom role was assigned to this team */
  appliedOn?: UnixMillis;
};

export type TeamCustomRoles = {
  /** The number of custom roles assigned to this team */
  totalCount?: number;
  /** An array of the custom roles that have been assigned to this team */
  items?: (TeamCustomRole)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type TeamImportsRep = {
  /** An array of details about the members requested to be added to this team */
  items?: (MemberImportItem)[];
};

export type TeamMaintainers = {
  /** The number of maintainers of the team */
  totalCount?: number;
  /** Details on the members that have been assigned as maintainers of the team */
  items?: (MemberSummary)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type TeamMembers = {
  /** The total count of members that belong to the team */
  totalCount?: number;
};

export type TeamProjects = {
  totalCount?: number;
  /** Details on each project where team members have write privileges on at least one resource type (e.g. flags) */
  items?: (ProjectSummary)[];
};

export type Teams = {
  /** An array of teams */
  items: (Team)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The number of teams */
  totalCount?: number;
};

export type TimestampRep = {
  milliseconds?: UnixMillis;
  seconds?: number;
  rfc3339?: string;
  simple?: string;
};

export type Token = {
  /** The ID of the access token */
  _id: ObjectId;
  /** The ID of the owner of the account for the access token */
  ownerId: ObjectId;
  /** The ID of the member who created the access token */
  memberId: ObjectId;
  /** Details on the member who created the access token */
  _member?: MemberSummary;
  /** A human-friendly name for the access token */
  name?: string;
  /** A description for the access token */
  description?: string;
  /** Timestamp of when the access token was created */
  creationDate: UnixMillis;
  /** Timestamp of the last modification of the access token */
  lastModified: UnixMillis;
  /** A list of custom role IDs to use as access limits for the access token */
  customRoleIds?: (ObjectId)[];
  /** An array of policy statements, with three attributes: effect, resources, actions. May be used in place of a role. */
  inlineRole?: (Statement)[];
  /** Base role for the token */
  role?: string;
  /** The token value. When creating or resetting, contains the entire token value. Otherwise, contains the last four characters. */
  token?: string;
  /** Whether this is a service token or a personal token */
  serviceToken?: boolean;
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The default API version for this token */
  defaultApiVersion?: number;
  /** Timestamp of when the access token was last used */
  lastUsed?: UnixMillis;
};

export type TokenSummary = {
  _links?: { [key: string]: Link | undefined };
  _id?: string;
  /** The name of the token */
  name?: string;
  /** The last few characters of the token */
  ending?: string;
  /** Whether this is a service token */
  serviceToken?: boolean;
};

export type Tokens = {
  /** An array of access tokens */
  items?: (Token)[];
  _links?: { [key: string]: Link | undefined };
  /** The number of access tokens returned */
  totalCount?: number;
};

export type TreatmentInput = {
  /** The treatment name */
  name: string;
  /** Whether this treatment is the baseline to compare other treatments against */
  baseline: boolean;
  /** The percentage of traffic allocated to this treatment during the iteration */
  allocationPercent: string;
  /** Details on the flag and variation to use for this treatment */
  parameters: (TreatmentParameterInput)[];
};

export type TreatmentParameterInput = {
  /** The flag key */
  flagKey: string;
  /** The ID of the flag variation */
  variationId: string;
};

export type TreatmentRep = {
  /** The treatment ID. This is the variation ID from the flag. */
  _id?: string;
  /** The treatment name. This is the variation name from the flag. */
  name: string;
  /** The percentage of traffic allocated to this treatment during the iteration */
  allocationPercent: string;
  /** Whether this treatment is the baseline to compare other treatments against */
  baseline?: boolean;
  /** Details on the flag and variation used for this treatment */
  parameters?: (ParameterRep)[];
};

export type TreatmentsInput = (TreatmentInput)[];

export type TriggerWorkflowCollectionRep = {
  /** An array of flag triggers */
  items?: (TriggerWorkflowRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type TriggerWorkflowRep = {
  /** The ID of this flag trigger */
  _id?: FeatureWorkflowId;
  /** The flag trigger version */
  _version?: number;
  /** Timestamp of when the flag trigger was created */
  _creationDate?: UnixMillis;
  /** The ID of the flag trigger maintainer */
  _maintainerId?: string;
  /** Details on the member who maintains this flag trigger */
  _maintainer?: MemberSummary;
  /** Whether the flag trigger is currently enabled */
  enabled?: boolean;
  /** The trigger state: active, inactive, or failed */
  _status?: "active" | "inactive" | "failed";
  /** Timestamp of when the trigger most recently entered failed state */
  _lastFailedAt?: UnixMillis;
  /** The unique identifier of the integration for your trigger */
  _integrationKey?: string;
  /** Details on the action to perform when triggering */
  instructions?: Instructions;
  /** Timestamp of when the trigger was most recently executed */
  _lastTriggeredAt?: UnixMillis;
  /** Details on recent flag trigger requests. */
  _recentTriggerBodies?: (RecentTriggerBody)[];
  /** Number of times the trigger has been executed */
  _triggerCount?: number;
  /** The unguessable URL for this flag trigger */
  triggerURL?: string;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type TrustPolicyDetails = {
  /** The version of the trust policy */
  Version?: string;
  /** The statements of the trust policy */
  Statement?: (TrustPolicyStatement)[];
};

export type TrustPolicyStatement = {
  /** The effect of trust policy statement */
  Effect?: string;
  /** The action of trust policy statement */
  Action?: (string)[];
  /** The principal of trust policy statement */
  Principal?: unknown;
  /** The condition of trust policy statement */
  Condition?: unknown;
};

export type UnauthorizedErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
};

export type UnixMillis = number;

export type UpdatePhaseStatusInput = {
  /** Status of the phase */
  status?: PhaseStatus;
  /** Extra configuration for audiences required upon phase initialization. */
  audiences?: (ReleaserAudienceConfigInput)[];
};

export type UpdateReleasePipelineInput = {
  /** The release pipeline description */
  description?: string;
  /** The name of the release pipeline */
  name: string;
  /** A logical grouping of one or more environments that share attributes for rolling out changes */
  phases: (CreatePhaseInput)[];
  /** A list of tags for this release pipeline */
  tags?: (string)[];
};

export type UpsertContextKindPayload = {
  /** The context kind name */
  name: string;
  /** The context kind description */
  description?: string;
  /** Alias for archived. */
  hideInTargeting?: boolean;
  /** Whether the context kind is archived. Archived context kinds are unavailable for targeting. */
  archived?: boolean;
  /** The context kind version. If not specified when the context kind is created, defaults to 1. */
  version?: number;
};

export type UpsertFlagDefaultsPayload = {
  /** A list of default tags for each flag */
  tags: (string)[];
  /** Whether the flag should be temporary by default */
  temporary: boolean;
  booleanDefaults: BooleanFlagDefaults;
  /** Which client-side SDK types can use this flag by default. */
  defaultClientSideAvailability: DefaultClientSideAvailability;
};

export type UpsertResponseRep = {
  /** The status of the create or update operation */
  status?: string;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type UrlMatcher = { [key: string]: unknown | undefined };

export type UrlMatchers = (UrlMatcher)[];

export type UrlPost = {
  kind?: "exact" | "canonical" | "substring" | "regex";
  url?: string;
  substring?: string;
  pattern?: string;
};

export type User = {
  /** The user key. This is the only mandatory user attribute. */
  key?: string;
  /** If provided, used with the user key to generate a variation in percentage rollouts */
  secondary?: string;
  /** The user's IP address */
  ip?: string;
  /** The user's country */
  country?: string;
  /** The user's email */
  email?: string;
  /** The user's first name */
  firstName?: string;
  /** The user's last name */
  lastName?: string;
  /** An absolute URL to an avatar image. */
  avatar?: string;
  /** The user's full name */
  name?: string;
  /** Whether the user is anonymous. If true, this user does not appear on the Contexts list in the LaunchDarkly user interface. */
  anonymous?: boolean;
  /** Any other custom attributes for this user. Custom attributes contain any other user data that you would like to use to conditionally target your users. */
  custom?: { [key: string]: unknown | undefined };
  /** A list of attribute names that are marked as private. You can use these attributes in targeting rules and segments. If you are using a server-side SDK, the SDK will not send the private attribute back to LaunchDarkly. If you are using a client-side SDK, the SDK will send the private attribute back to LaunchDarkly for evaluation. However, the SDK won't send the attribute to LaunchDarkly in events data, LaunchDarkly won't store the private attribute, and the private attribute will not appear on the Contexts list. */
  privateAttrs?: (string)[];
};

export type UserAttributeNamesRep = {
  /** private attributes */
  private?: (string)[];
  /** custom attributes */
  custom?: (string)[];
  /** standard attributes */
  standard?: (string)[];
};

export type UserFlagSetting = {
  /** The location and content type of related resources. */
  _links: { [key: string]: Link | undefined };
  /** The value of the flag variation that the user receives. If there is no defined default rule, this is null. */
  _value: unknown;
  /** Whether the user is explicitly targeted to receive a particular variation. The setting is false if you have turned off a feature flag for a user. It is null if you haven't assigned that user to a specific variation. */
  setting: unknown;
  /** Contains information about why that variation was selected. */
  reason?: EvaluationReason;
};

export type UserFlagSettings = {
  /** An array of flag settings for the user */
  items: { [key: string]: UserFlagSetting | undefined };
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
};

export type UserRecord = {
  /** Timestamp of the last time this user was seen */
  lastPing?: string;
  /** The environment ID */
  environmentId?: ObjectId;
  /** The ID of the member who is the owner for this account */
  ownerId?: ObjectId;
  /** Details on the user */
  user?: User;
  /** If this record is returned as part of a list, the value used to sort the list. This is only included when the <code>sort</code> query parameter is specified. It is a time, in Unix milliseconds, if the sort is by <code>lastSeen</code>. It is a user key if the sort is by <code>userKey</code>. */
  sortValue?: unknown;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Details on the allowed and denied actions for this user */
  _access?: Access;
};

export type UserSegment = {
  /** A human-friendly name for the segment. */
  name: string;
  /** A description of the segment's purpose. Defaults to <code>null</code> and is omitted in the response if not provided. */
  description?: string;
  /** Tags for the segment. Defaults to an empty array. */
  tags: (string)[];
  /** Timestamp of when the segment was created */
  creationDate: UnixMillis;
  /** Timestamp of when the segment was last modified */
  lastModifiedDate: UnixMillis;
  /** A unique key used to reference the segment */
  key: string;
  /** An array of keys for included targets. Included individual targets are always segment members, regardless of segment rules. For list-based segments over 15,000 entries, also called big segments, this array is either empty or omitted. */
  included?: (string)[];
  /** An array of keys for excluded targets. Segment rules bypass individual excluded targets, so they will never be included based on rules. Excluded targets may still be included explicitly. This value is omitted for list-based segments over 15,000 entries, also called big segments. */
  excluded?: (string)[];
  includedContexts?: (SegmentTarget)[];
  excludedContexts?: (SegmentTarget)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** An array of the targeting rules for this segment. */
  rules: (UserSegmentRule)[];
  /** Version of the segment */
  version: number;
  /** Whether the segment has been deleted */
  deleted: boolean;
  _access?: Access;
  /** A list of flags targeting this segment. Only included when getting a single segment, using the <code>getSegment</code> endpoint. */
  _flags?: (FlagListingRep)[];
  /** Whether this is a standard segment (<code>false</code>) or a big segment (<code>true</code>). Standard segments include rule-based segments and smaller list-based segments. Big segments include larger list-based segments and synced segments. If omitted, the segment is a standard segment. */
  unbounded?: boolean;
  /** For big segments, the targeted context kind. */
  unboundedContextKind?: string;
  /** For big segments, how many times this segment has been created. */
  generation: number;
  /** Details on the external data store backing this segment. Only applies to big segments. */
  _unboundedMetadata?: SegmentMetadata;
  /** The external data store backing this segment. Only applies to synced segments. */
  _external?: string;
  /** The URL for the external data store backing this segment. Only applies to synced segments. */
  _externalLink?: string;
  /** Whether an import is currently in progress for the specified segment. Only applies to big segments. */
  _importInProgress?: boolean;
};

export type UserSegmentRule = {
  _id?: string;
  clauses: (Clause)[];
  weight?: number;
  rolloutContextKind?: string;
  bucketBy?: string;
  description?: string;
};

export type UserSegments = {
  /** An array of segments */
  items: (UserSegment)[];
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The total number of segments */
  totalCount?: number;
};

export type Users = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The total number of users in the environment */
  totalCount: number;
  /** Details on the users */
  items: (UserRecord)[];
};

export type UsersRep = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** The total number of users in the environment */
  totalCount: number;
  /** Details on the users */
  items: (UserRecord)[];
};

export type ValuePut = {
  /** The variation value to set for the context. Must match the flag's variation type. */
  setting?: unknown;
  /** Optional comment describing the change */
  comment?: string;
};

export type Variation = {
  /** The ID of the variation. Leave empty when you are creating a flag. */
  _id?: string;
  /** The value of the variation. For boolean flags, this must be <code>true</code> or <code>false</code>. For multivariate flags, this may be a string, number, or JSON object. */
  value: unknown;
  /** Description of the variation. Defaults to an empty string, but is omitted from the response if not set. */
  description?: string;
  /** A human-friendly name for the variation. Defaults to an empty string, but is omitted from the response if not set. */
  name?: string;
};

export type VariationOrRolloutRep = {
  /** The index of the variation, from the array of variations for this flag */
  variation?: number;
  /** Details on the percentage rollout, if it exists */
  rollout?: Rollout;
};

export type VariationSummary = {
  rules: number;
  nullRules: number;
  targets: number;
  contextTargets: number;
  isFallthrough?: boolean;
  isOff?: boolean;
  rollout?: number;
  bucketBy?: string;
};

export type VersionsRep = {
  /** A list of all valid API versions. To learn more about our versioning, read [Versioning](https://launchdarkly.com/docs/api#versioning). */
  validVersions: (DateVersion)[];
  /** The most recently released version of the API */
  latestVersion: DateVersion;
  /** The version of the API currently in use. Typically this is the API version specified for your access token. If you add the <code>LD-API-Version: beta</code> header to your request, this will be equal to the <code>latestVersion</code>. */
  currentVersion: DateVersion;
  /** Whether the version of the API currently is use is a beta version. This is always <code>true</code> if you add the <code>LD-API-Version: beta</code> header to your request. */
  beta?: boolean;
};

export type WarehouseDestinationSetupScriptRep = {
  /** The SQL setup script to run in your data warehouse */
  script?: string;
  /** The RSA public key (Snowflake only) to store as the destination public_key */
  publicKey?: string;
  /** The PKCS8 RSA public key (Snowflake only) */
  publicKeyPkcs8?: string;
  /** For Redshift, present only when clusterIdentifier, clusterRegion, and clusterAwsAccountId are supplied in the request body. */
  redshiftIAMPermissionsPolicy?: string;
  /** For Redshift, present only when clusterIdentifier, clusterRegion, and clusterAwsAccountId are supplied in the request body. */
  redshiftIAMTrustPolicy?: string;
};

export type Webhook = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** The ID of this webhook */
  _id: string;
  /** A human-readable name for this webhook */
  name?: string;
  /** The URL to which LaunchDarkly sends an HTTP POST payload for this webhook */
  url: string;
  /** The secret for this webhook */
  secret?: string;
  /** Represents a Custom role policy, defining a resource kinds filter the webhook responds to. */
  statements?: (Statement)[];
  /** Whether or not this webhook is enabled */
  on: boolean;
  /** List of tags for this webhook */
  tags: (string)[];
  /** Details on the allowed and denied actions for this webhook */
  _access?: Access;
};

export type Webhooks = {
  /** The location and content type of related resources */
  _links: { [key: string]: Link | undefined };
  /** An array of webhooks */
  items: (Webhook)[];
};

export type WeightedVariation = {
  variation: number;
  weight: number;
  _untracked?: boolean;
};

export type WorkflowTemplateMetadata = {
  parameters?: (WorkflowTemplateParameter)[];
};

export type WorkflowTemplateOutput = {
  _id: string;
  _key: string;
  name?: string;
  _creationDate: UnixMillis;
  _ownerId: string;
  _maintainerId: string;
  _links: { [key: string]: Link | undefined };
  description?: string;
  stages?: (StageOutput)[];
};

export type WorkflowTemplateParameter = {
  /** The ID of the condition or instruction referenced by this parameter */
  _id?: ObjectId;
  /** The path of the property to parameterize, relative to its parent condition or instruction */
  path?: string;
  /** The default value of the parameter and other relevant metadata */
  default?: ParameterDefault;
  /** Whether the default value is valid for the target flag and environment */
  valid?: boolean;
};

export type WorkflowTemplatesListingOutputRep = {
  items: (WorkflowTemplateOutput)[];
};

export type ApprovalRequestPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating */
  instructions: Instructions;
};

export type CompleteSetupPostBody = {
  publicKey?: string;
};

export type CreateCopyFlagConfigApprovalRequestRequest = {
  /** Optional comment describing the approval request */
  comment?: string;
  /** A brief description of your changes */
  description: string;
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds?: (string)[];
  /** An array of team keys. The members of these teams are notified to review the approval request. */
  notifyTeamKeys?: (string)[];
  /** The flag to copy */
  source: SourceFlag;
  /** Optional list of the flag changes to copy from the source environment to the target environment. You may include either <code>includedActions</code> or <code>excludedActions</code>, but not both. If neither are included, then all flag changes will be copied. */
  includedActions?: ("updateOn" | "updateFallthrough" | "updateOffVariation" | "updateRules" | "updateTargets" | "updatePrerequisites")[];
  /** Optional list of the flag changes NOT to copy from the source environment to the target environment. You may include either <code>includedActions</code> or <code>excludedActions</code>, but not both. If neither are included, then all flag changes will be copied. */
  excludedActions?: ("updateOn" | "updateFallthrough" | "updateOffVariation" | "updateRules" | "updateTargets" | "updatePrerequisites")[];
};

export type CreateFlagConfigApprovalRequestRequest = {
  /** Optional comment describing the approval request */
  comment?: string;
  /** A brief description of the changes you're requesting */
  description: string;
  /** List of instructions in semantic patch format to be applied to the feature flag. Review the [Update feature flag](https://launchdarkly.com/docs/ld-docs/api/feature-flags/patch-feature-flag) documentation for details on available instructions. */
  instructions: Instructions;
  /** An array of member IDs. These members are notified to review the approval request. */
  notifyMemberIds?: (string)[];
  /** An array of team keys. The members of these teams are notified to review the approval request. */
  notifyTeamKeys?: (string)[];
  /** Timestamp for when instructions will be executed */
  executionDate?: UnixMillis;
  /** The ID of a scheduled change. Include this if your <code>instructions</code> include editing or deleting a scheduled change. */
  operatingOnId?: string;
  /** Additional approval request fields for third-party integration approval systems. If you are using a third-party integration to manage approval requests, these additional fields will be described in the <code>manifest.json</code> for that integration, at https://github.com/launchdarkly/integration-framework. */
  integrationConfig?: FormVariableConfig;
};

export type CustomProperty = {
  /** The name of the custom property of this type. */
  name: string;
  /** An array of values for the custom property data to associate with this flag. */
  value: (string)[];
};

export type FlagDefaultsRep = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** A unique key for the flag default */
  key?: string;
  /** A list of default tags for each flag */
  tags?: (string)[];
  /** Whether the flag should be temporary by default */
  temporary?: boolean;
  /** Which client-side SDK types can use this flag by default. Set <code>usingMobileKey</code> to make the flag available for mobile SDKs. Set <code>usingEnvironmentId</code> to make the flag available for client-side SDKs. */
  defaultClientSideAvailability?: ClientSideAvailability;
  /** Defaults for boolean flags within this project */
  booleanDefaults?: BooleanDefaults;
};

export type FlagLinkPost = {
  /** The flag link key */
  key?: string;
  /** The integration key for an integration whose <code>manifest.json</code> includes the <code>flagLink</code> capability, if this is a flag link for an existing integration. Do not include for URL flag links. */
  integrationKey?: string;
  /** The time, in Unix milliseconds, to mark this flag link as associated with the external URL. If omitted, defaults to the creation time of this flag link. */
  timestamp?: UnixMillis;
  /** The URL for the external resource you are linking the flag to */
  deepLink?: string;
  /** The title of the flag link */
  title?: string;
  /** The description of the flag link */
  description?: string;
  /** The metadata required by this integration in order to create a flag link, if this is a flag link for an existing integration. Defined in the integration's <code>manifest.json</code> file under <code>flagLink</code>. */
  metadata?: { [key: string]: string | undefined };
};

export type FlagSempatch = {
  /** Semantic patch instructions. The same ones that are valid for flags are valid here. */
  instructions: Instructions;
  comment?: string;
};

export type FollowersPerFlag = {
  /** The flag key */
  flagKey?: string;
  /** A list of members who are following this flag */
  followers?: (FollowFlagMember)[];
};

export type InstructionUserRequest = {
  /** The type of change to make to the removal date for this user from individual targeting for this flag. */
  kind: "addExpireUserTargetDate" | "updateExpireUserTargetDate" | "removeExpireUserTargetDate";
  /** The flag key */
  flagKey: string;
  /** ID of a variation on the flag */
  variationId: string;
  /** The time, in Unix milliseconds, when LaunchDarkly should remove the user from individual targeting for this flag. Required if <code>kind</code> is <code>addExpireUserTargetDate</code> or <code>updateExpireUserTargetDate</code>. */
  value?: number;
  /** The version of the expiring user target to update. Optional and only used if <code>kind</code> is <code>updateExpireUserTargetDate</code>. If included, update will fail if version doesn't match current version of the expiring user target. */
  version?: number;
};

export type IpList = {
  /** A list of IP addresses used by the LaunchDarkly service */
  addresses: (string)[];
  /** A list of the IP addresses outgoing webhook notifications use */
  outboundAddresses: (string)[];
};

export type MembersPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require additional parameters as part of this object. */
  instructions: Instructions;
};

export type OauthClientPost = {
  /** The name of your new LaunchDarkly OAuth 2.0 client. */
  name?: string;
  /** The redirect URI for your new OAuth 2.0 application. This should be an absolute URL conforming with the standard HTTPS protocol. */
  redirectUri?: string;
  /** Description of your OAuth 2.0 client. */
  description?: string;
};

export type PatchFlagsRequest = {
  /** Optional comment describing the change */
  comment?: string;
  /** The instructions to perform when updating */
  instructions: (Instruction)[];
};

export type PatchSegmentExpiringTargetInputRep = {
  /** Optional description of changes */
  comment?: string;
  /** Semantic patch instructions for the desired changes to the resource */
  instructions: (PatchSegmentExpiringTargetInstruction)[];
};

export type PatchSegmentExpiringTargetInstruction = {
  /** The type of change to make to the context's removal date from this segment */
  kind: "addExpiringTarget" | "updateExpiringTarget" | "removeExpiringTarget";
  /** A unique key used to represent the context */
  contextKey: string;
  /** The kind of context */
  contextKind: string;
  /** The segment's target type */
  targetType: "included" | "excluded";
  /** The time, in Unix milliseconds, when the context should be removed from this segment. Required if <code>kind</code> is <code>addExpiringTarget</code> or <code>updateExpiringTarget</code>. */
  value?: number;
  /** The version of the expiring target to update. Optional and only used if <code>kind</code> is <code>updateExpiringTarget</code>. If included, update will fail if version doesn't match current version of the expiring target. */
  version?: number;
};

export type PatchSegmentInstruction = {
  /** The type of change to make to the user's removal date from this segment */
  kind: "addExpireUserTargetDate" | "updateExpireUserTargetDate" | "removeExpireUserTargetDate";
  /** A unique key used to represent the user */
  userKey: string;
  /** The segment's target type */
  targetType: "included" | "excluded";
  /** The time, in Unix milliseconds, when the user should be removed from this segment. Required if <code>kind</code> is <code>addExpireUserTargetDate</code> or <code>updateExpireUserTargetDate</code>. */
  value?: number;
  /** The version of the segment to update. Required if <code>kind</code> is <code>updateExpireUserTargetDate</code>. */
  version?: number;
};

export type PatchSegmentRequest = {
  /** Optional description of changes */
  comment?: string;
  /** Semantic patch instructions for the desired changes to the resource */
  instructions: (PatchSegmentInstruction)[];
};

export type PatchUsersRequest = {
  /** Optional comment describing the change */
  comment?: string;
  /** The instructions to perform when updating */
  instructions: (InstructionUserRequest)[];
};

export type PermissionGrantInput = {
  /** A group of related actions to allow. Specify either <code>actionSet</code> or <code>actions</code>. Use <code>maintainTeam</code> to add team maintainers. */
  actionSet?: "maintainTeam";
  /** A list of actions to allow. Specify either <code>actionSet</code> or <code>actions</code>. To learn more, read [Role actions](https://launchdarkly.com/docs/ld-docs/home/account/role-actions). */
  actions?: (string)[];
  /** A list of member IDs who receive the permission grant. */
  memberIDs?: (string)[];
};

export type PostApprovalRequestApplyRequest = {
  /** Optional comment about the approval request */
  comment?: string;
};

export type PostApprovalRequestReviewRequest = {
  /** The type of review for this approval request */
  kind?: "approve" | "comment" | "decline";
  /** Optional comment about the approval request */
  comment?: string;
};

export type PutBranch = {
  /** The branch name */
  name: string;
  /** An ID representing the branch HEAD. For example, a commit SHA. */
  head: string;
  /** An optional ID used to prevent older data from overwriting newer data. If no sequence ID is included, the newly submitted data will always be saved. */
  updateSequenceId?: number;
  /** A timestamp indicating when the branch was last synced */
  syncTime: UnixMillis;
  /** An array of flag references found on the branch */
  references?: (ReferenceRep)[];
  /** A timestamp of the current commit */
  commitTime?: UnixMillis;
};

export type RepositoryPost = {
  /** The repository name */
  name: string;
  /** A URL to access the repository */
  sourceLink?: string;
  /** A template for constructing a valid URL to view the commit */
  commitUrlTemplate?: string;
  /** A template for constructing a valid URL to view the hunk */
  hunkUrlTemplate?: string;
  /** The type of repository. If not specified, the default value is <code>custom</code>. */
  type?: "bitbucket" | "custom" | "github" | "gitlab";
  /** The repository's default branch. If not specified, the default value is <code>main</code>. */
  defaultBranch?: string;
};

export type SourceFlag = {
  /** The environment key for the source environment */
  key: string;
  /** The version of the source flag from which to copy */
  version?: number;
};

export type SubscriptionPost = {
  /** A human-friendly name for your audit log subscription. */
  name: string;
  /** The set of resources you wish to subscribe to audit log notifications for. */
  statements?: StatementPostList;
  /** Whether or not you want your subscription to actively send events. */
  on?: boolean;
  /** An array of tags for this subscription. */
  tags?: (string)[];
  /** The unique set of fields required to configure an audit log subscription integration of this type. Refer to the <code>formVariables</code> field in the corresponding <code>manifest.json</code> at https://github.com/launchdarkly/integration-framework/tree/main/integrations for a full list of fields for the integration you wish to configure. */
  config: { [key: string]: unknown | undefined };
  /** Slack webhook receiver URL. Only necessary for legacy Slack webhook integrations. */
  url?: string;
  /** Datadog API key. Only necessary for legacy Datadog webhook integrations. */
  apiKey?: string;
};

export type TeamPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require additional parameters as part of this object. */
  instructions: Instructions;
};

export type TeamPostInput = {
  /** List of custom role keys the team will access */
  customRoleKeys?: (string)[];
  /** A description of the team */
  description?: string;
  /** The team key */
  key: string;
  /** A list of member IDs who belong to the team */
  memberIDs?: (string)[];
  /** A human-friendly name for the team */
  name: string;
  /** A list of permission grants. Permission grants allow access to a specific action, without having to create or update a custom role. */
  permissionGrants?: (PermissionGrantInput)[];
  /** A map of role attributes for the team */
  roleAttributes?: RoleAttributeMap;
};

export type TeamsPatchInput = {
  /** Optional comment describing the update */
  comment?: string;
  /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require additional parameters as part of this object. */
  instructions: Instructions;
};

export type TriggerPost = {
  /** Optional comment describing the trigger */
  comment?: string;
  /** The action to perform when triggering. This should be an array with a single object that looks like <code>{"kind": "flag_action"}</code>. Supported flag actions are <code>turnFlagOn</code> and <code>turnFlagOff</code>. */
  instructions?: (Instruction)[];
  /** The unique identifier of the integration for your trigger. Use <code>generic-trigger</code> for integrations not explicitly supported. */
  integrationKey: string;
};

export type UpsertPayloadRep = {
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** A list of default tags for each flag */
  tags: (string)[];
  /** Whether the flag should be temporary by default */
  temporary: boolean;
  booleanDefaults: BooleanFlagDefaults;
  /** Which client-side SDK types can use this flag by default. */
  defaultClientSideAvailability: DefaultClientSideAvailability;
};

export type WarehouseSetupScriptPostBody = {
  name?: string;
  snowflakeHostAddress?: string;
  databaseName?: string;
  warehouseName?: string;
  roleName?: string;
  schemaName?: string;
  userName?: string;
  includeNetworkPolicy?: boolean;
  clusterIdentifier?: string;
  clusterRegion?: string;
  clusterAwsAccountId?: string;
};

export type WebhookPost = {
  /** A human-readable name for your webhook */
  name?: string;
  /** The URL of the remote webhook */
  url: string;
  /** If sign is true, and the secret attribute is omitted, LaunchDarkly automatically generates a secret for you. */
  secret?: string;
  /** Represents a Custom role policy, defining a resource kinds filter the webhook should respond to. */
  statements?: StatementPostList;
  /** If sign is false, the webhook does not include a signature header, and the secret can be omitted. */
  sign: boolean;
  /** Whether or not this webhook is enabled. */
  on: boolean;
  /** List of tags for this webhook */
  tags?: (string)[];
};

export type TagsCollection = {
  /** List of tags */
  items: (string)[];
  _links: { [key: string]: TagsLink | undefined };
  /** The total number of tags */
  totalCount?: number;
};

export type CoreLink = {
  href: string;
  type: string;
};

export type Error = {
  message: string;
  code: string;
};

export type TagsLink = {
  href?: string;
  type?: string;
};

export type QuickStats = {
  activeConfigs: number;
  activeExperiments: number;
  averageSatisfaction7D?: number | null;
  spendMonthToDate?: number | null;
};

export type AiConfigs = {
  _links?: PaginatedLinks;
  items: (AiConfig)[];
  totalCount: number;
};

export type AiConfig = {
  _access?: AiConfigsAccess;
  _links?: ParentAndSelfLinks;
  description: string;
  key: string;
  _maintainer?: AiConfigMaintainer;
  mode?: "agent" | "completion" | "judge";
  name: string;
  tags: (string)[];
  version: number;
  variations: (AiConfigVariation)[];
  createdAt: number;
  updatedAt: number;
  /** Evaluation metric key for this AI Config */
  evaluationMetricKey?: string;
  /** List of evaluation metric keys for this AI Config */
  evaluationMetricKeys?: (string)[];
  /** Whether the evaluation metric is inverted, meaning a lower value is better if set as true */
  isInverted?: boolean;
  /** Resources that depend on this AI Config, grouped by type */
  dependencies?: (AiConfigDependency)[];
};

export type AiConfigPost = {
  description?: string;
  key: string;
  maintainerId?: string;
  maintainerTeamKey?: string;
  mode?: "agent" | "completion" | "judge";
  name: string;
  tags?: (string)[];
  viewKeys?: (string)[];
  defaultVariation?: AiConfigVariationPost;
  /** Evaluation metric key for this AI Config */
  evaluationMetricKey?: string;
  /** Whether the evaluation metric is inverted, meaning a lower value is better if set as true */
  isInverted?: boolean;
};

export type AiConfigPatch = {
  description?: string;
  maintainerId?: string;
  maintainerTeamKey?: string;
  name?: string;
  tags?: (string)[];
  /** Evaluation metric key for this AI Config */
  evaluationMetricKey?: string;
  /** Whether the evaluation metric is inverted, meaning a lower value is better if set as true */
  isInverted?: boolean;
};

export type AiConfigVariation = {
  _links?: ParentLink;
  color?: string;
  comment?: string;
  /** Returns the description for the agent. This is only returned for agent variations. */
  description?: string;
  /** Returns the instructions for the agent. This is only returned for agent variations. */
  instructions?: string;
  key: string;
  _id: string;
  messages?: (Message)[];
  model: { [key: string]: unknown };
  modelConfigKey?: string;
  name: string;
  createdAt: number;
  version: number;
  state?: string;
  _archivedAt?: number;
  _publishedAt?: number;
  tools?: (VariationTool)[];
  judgeConfiguration?: JudgeConfiguration;
  judgingConfigKeys?: (string)[];
};

export type AiConfigVariationsResponse = {
  items: (AiConfigVariation)[];
  totalCount: number;
};

export type AiConfigVariationPost = {
  /** Human-readable description of this variation */
  comment?: string;
  /** Returns the description for the agent. This is only returned for agent variations. */
  description?: string;
  /** Returns the instructions for the agent. This is only returned for agent variations. */
  instructions?: string;
  key: string;
  messages?: (Message)[];
  model?: { [key: string]: unknown };
  name: string;
  modelConfigKey?: string;
  /** List of tools to use for this variation. The latest version of the tool will be used. */
  tools?: (VariationToolPost)[];
  /** List of tool keys to use for this variation. The latest version of the tool will be used. */
  toolKeys?: (string)[];
  judgeConfiguration?: JudgeConfiguration;
};

export type AiConfigVariationPatch = {
  /** Human-readable description of what this patch changes */
  comment?: string;
  /** Description for agent when AI Config is in agent mode. */
  description?: string;
  /** Instructions for agent when AI Config is in agent mode. */
  instructions?: string;
  messages?: (Message)[];
  model?: { [key: string]: unknown };
  modelConfigKey?: string;
  name?: string;
  published?: boolean;
  /** One of 'archived', 'published' */
  state?: string;
  /** List of tools to use for this variation. The latest version of the tool will be used. */
  tools?: (VariationToolPost)[];
  /** List of tool keys to use for this variation. The latest version of the tool will be used. */
  toolKeys?: (string)[];
  judgeConfiguration?: JudgeConfiguration;
};

export type JudgeConfiguration = {
  /** List of judges for this variation. When updating, this replaces all existing judge attachments, and if empty, removes all judge attachments.  */
  judges?: (JudgeAttachment)[];
};

export type JudgeAttachment = {
  /** Key of the judge AI Config */
  judgeConfigKey: string;
  /** Sampling rate for this judge attachment (0.0 to 1.0) */
  samplingRate: number;
};

export type Message = {
  content: string;
  role: string;
};

export type ModelConfig = {
  _access?: AiConfigsAccess;
  /** Human readable name of the model */
  name: string;
  /** Unique key for the model */
  key: string;
  /** Identifier for the model, for use with third party providers */
  id: string;
  /** Icon for the model */
  icon?: string;
  /** Provider for the model */
  provider?: string;
  /** Whether the model is global */
  global: boolean;
  params?: { [key: string]: unknown };
  customParams?: { [key: string]: unknown };
  tags: (string)[];
  version: number;
  /** Cost per input token in USD */
  costPerInputToken?: number;
  /** Cost per output token in USD */
  costPerOutputToken?: number;
  /** Cost per cached input token in USD */
  costPerCachedInputToken?: number;
  /** Whether the model is restricted */
  isRestricted: boolean;
};

export type ModelConfigPost = {
  /** Human readable name of the model */
  name: string;
  /** Unique key for the model */
  key: string;
  /** Identifier for the model, for use with third party providers */
  id: string;
  /** Icon for the model */
  icon?: string;
  /** Provider for the model */
  provider?: string;
  params?: { [key: string]: unknown };
  customParams?: { [key: string]: unknown };
  tags?: (string)[];
  /** Cost per input token in USD */
  costPerInputToken?: number;
  /** Cost per output token in USD */
  costPerOutputToken?: number;
  /** Cost per cached input token in USD */
  costPerCachedInputToken?: number;
};

export type RestrictedModelsRequest = {
  keys: (string)[];
};

export type RestrictedModelsResponse = {
  successes: (string)[];
  errors: (RestrictedModelError)[];
};

export type RestrictedModelError = {
  key: string;
  message: string;
  code: number;
};

export type MaintainerMember = {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
};

export type AiConfigsMaintainerTeam = {
  key: string;
  name: string;
};

export type AiConfigTargeting = {
  /** Unix timestamp in milliseconds */
  createdAt: number;
  defaults?: AiConfigTargetingDefaults;
  environments: { [key: string]: AiConfigTargetingEnvironment | undefined };
  experiments: AiConfigsExperimentInfoRep;
  key: string;
  name: string;
  tags: (string)[];
  variations: (AiConfigTargetingVariation)[];
  _version: number;
};

export type AiConfigTargetingPatch = {
  comment?: string;
  environmentKey: string;
  instructions: ({ [key: string]: unknown })[];
};

export type Metrics = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  /** Number of attempted generations */
  generationCount?: number;
  /** Number of successful generations */
  generationSuccessCount?: number;
  /** Number of generations with errors */
  generationErrorCount?: number;
  thumbsUp?: number;
  thumbsDown?: number;
  durationMs?: number;
  timeToFirstTokenMs?: number;
  /** A value between 0 and 1 representing satisfaction rating */
  satisfactionRating?: number;
  /** Cost of input tokens in USD */
  inputCost?: number;
  /** Cost of output tokens in USD */
  outputCost?: number;
  /** Average accuracy judge score (0.0-1.0) */
  judgeAccuracy?: number;
  /** Average relevance judge score (0.0-1.0) */
  judgeRelevance?: number;
  /** Average toxicity judge score (0.0-1.0) */
  judgeToxicity?: number;
};

export type MetricByVariation = {
  variationKey?: string;
  metrics?: Metrics;
};

export type MetricsByVariation = (MetricByVariation)[];

/** The location and content type of related resources */
export type ParentAndSelfLinks = {
  self: CoreLink;
  parent: CoreLink;
};

export type ParentLink = {
  parent: CoreLink;
};

export type PaginatedLinks = {
  first?: AiConfigsLink;
  last?: AiConfigsLink;
  next?: AiConfigsLink;
  prev?: AiConfigsLink;
  self: AiConfigsLink;
};

export type AiConfigTargetingDefaults = {
  onVariation: number;
  offVariation: number;
};

export type AiConfigTargetingEnvironment = {
  contextTargets: (AiConfigTargetingEnvironmentTarget)[];
  enabled: boolean;
  fallthrough: AiConfigTargetingEnvironmentFallthrough;
  lastModified: number;
  offVariation?: number;
  rules: (AiConfigTargetingEnvironmentRule)[];
  targets: (AiConfigTargetingEnvironmentTarget)[];
  trackEvents: boolean;
  trackEventsFallthrough: boolean;
  _environmentName: string;
  _version: number;
};

export type AiConfigTargetingEnvironmentFallthrough = {
  variation?: number;
  rollout?: AiConfigTargetingEnvironmentFallthroughRollout;
};

export type AiConfigTargetingEnvironmentFallthroughRollout = {
  bucketBy?: string;
  contextKind: string;
  experimentAllocation?: AiConfigTargetingEnvironmentFallthroughRolloutExperimentationAllocation;
  seed?: number;
  variations: (AiConfigTargetingEnvironmentFallthroughRolloutVariation)[];
};

export type AiConfigTargetingEnvironmentFallthroughRolloutExperimentationAllocation = {
  canReshuffle: boolean;
  defaultVariation: number;
  type: string;
};

export type AiConfigTargetingEnvironmentFallthroughRolloutVariation = {
  _untracked?: boolean;
  variation: number;
  weight: number;
};

export type AiConfigTargetingEnvironmentRule = {
  clauses: (AiConfigTargetingEnvironmentRuleClause)[];
  trackEvents: boolean;
};

export type AiConfigTargetingEnvironmentRuleClause = {
  attribute: string;
  id: string;
  negate: boolean;
  op: string;
  values: (unknown)[];
};

export type AiConfigTargetingEnvironmentTarget = {
  contextKind: string;
  values: (string)[];
  variation: number;
};

export type AiConfigTargetingVariation = {
  _id: string;
  description: string;
  name: string;
  value: AiConfigTargetingVariationValue;
};

export type AiConfigTargetingVariationBoolean = boolean;

export type AiConfigTargetingVariationJson = { [key: string]: unknown };

export type AiConfigTargetingVariationNumber = number;

export type AiConfigTargetingVariationString = string;

export type AiTool = {
  key: string;
  _access?: AiConfigsAccess;
  _links?: ParentAndSelfLinks;
  _maintainer?: AiConfigMaintainer;
  description?: string;
  /** JSON Schema defining the tool's parameters for LLM consumption */
  schema: { [key: string]: unknown };
  /** Custom metadata and configuration for application-level use (not sent to LLM) */
  customParameters?: { [key: string]: unknown };
  version: number;
  createdAt: number;
};

export type AiTools = {
  _links?: PaginatedLinks;
  items: (AiTool)[];
  totalCount: number;
};

export type AiToolPost = {
  key: string;
  maintainerId?: string;
  maintainerTeamKey?: string;
  description?: string;
  /** JSON Schema defining the tool's parameters for LLM consumption */
  schema: { [key: string]: unknown };
  /** Custom metadata and configuration for application-level use (not sent to LLM) */
  customParameters?: { [key: string]: unknown };
};

export type AiToolPatch = {
  maintainerId?: string;
  maintainerTeamKey?: string;
  description?: string;
  /** JSON Schema defining the tool's parameters for LLM consumption */
  schema?: { [key: string]: unknown };
  /** Custom metadata and configuration for application-level use (not sent to LLM) */
  customParameters?: { [key: string]: unknown };
};

export type PromptSnippet = {
  key: string;
  _access?: AiConfigsAccess;
  _links?: ParentAndSelfLinks;
  _maintainer?: AiConfigMaintainer;
  name: string;
  description?: string;
  /** The text content of the prompt snippet */
  text: string;
  tags: (string)[];
  version: number;
  createdAt: number;
};

export type PromptSnippets = {
  _links?: PaginatedLinks;
  items: (PromptSnippet)[];
  totalCount: number;
};

export type PromptSnippetPost = {
  key: string;
  name: string;
  description?: string;
  /** The text content of the prompt snippet */
  text: string;
  maintainerId?: string;
  maintainerTeamKey?: string;
  tags?: (string)[];
};

export type PromptSnippetPatch = {
  name?: string;
  description?: string;
  /** The text content of the prompt snippet */
  text?: string;
  maintainerId?: string;
  maintainerTeamKey?: string;
  tags?: (string)[];
};

/** A usage of a prompt snippet in a specific AI Config variation. */
export type SnippetReference = {
  /** The key of the AI Config with a variation that references this snippet. */
  aiConfigKey: string;
  /** The name of the AI Config with a variation that references this snippet. */
  aiConfigName: string;
  /** The ID of the variation that references this snippet. */
  variationId: string;
  /** The key of the AI Config variation that references this snippet. */
  variationKey: string;
  /** The name of the variation that references this snippet. */
  variationName: string;
  /** The version of the snippet being referenced. */
  resourceVersion: number;
};

export type SnippetReferences = {
  _links?: PaginatedLinks;
  /** The key of the prompt snippet. */
  resourceKey: string;
  /** The type of the resource being referenced. */
  resourceType: string;
  items: (SnippetReference)[];
  /** The total number of references. */
  totalCount: number;
};

export type VariationToolPost = {
  /** The key of the tool to use. */
  key: string;
  /** The version of the tool. */
  version: number;
};

export type VariationTool = {
  /** The key of the tool to use. */
  key: string;
  /** The version of the tool. */
  version: number;
  /** Custom metadata and configuration for application-level use */
  customParameters?: { [key: string]: unknown };
};

/** Request body for creating an agent graph */
export type AgentGraphPost = {
  /** A unique key for the agent graph */
  key: string;
  /** A human-readable name for the agent graph */
  name: string;
  /** A description of the agent graph */
  description?: string;
  /** The ID of the member who maintains this agent graph */
  maintainerId?: string;
  /** The key of the team that maintains this agent graph */
  maintainerTeamKey?: string;
  /** The AI Config key of the root node. A missing root implies a newly created graph with metadata only. */
  rootConfigKey?: string;
  /** The edges in the graph. If edges or rootConfigKey is present, both must be present. */
  edges?: (AgentGraphEdgePost)[];
};

/** An edge in an agent graph connecting two AI Configs */
export type AgentGraphEdgePost = {
  /** A unique key for this edge within the graph */
  key: string;
  /** The AI Config key that is the source of this edge */
  sourceConfig: string;
  /** The AI Config key that is the target of this edge */
  targetConfig: string;
  /** The handoff options from the source AI Config to the target AI Config */
  handoff?: { [key: string]: unknown };
};

/** An agent graph representing a directed graph of AI Configs */
export type AgentGraph = {
  _access?: AiConfigsAccess;
  /** A unique key for the agent graph */
  key: string;
  /** A human-readable name for the agent graph */
  name: string;
  /** A description of the agent graph */
  description?: string;
  _maintainer?: AgentGraphMaintainer;
  /** The AI Config key of the root node */
  rootConfigKey?: string;
  /** The edges in the graph */
  edges?: (AgentGraphEdge)[];
  createdAt: number;
  updatedAt: number;
};

/** An edge in an agent graph connecting two AI Configs */
export type AgentGraphEdge = {
  /** A unique key for this edge within the graph */
  key: string;
  /** The AI Config key that is the source of this edge */
  sourceConfig: string;
  /** The AI Config key that is the target of this edge */
  targetConfig: string;
  /** The handoff options from the source AI Config to the target AI Config */
  handoff?: { [key: string]: unknown };
};

/** A collection of agent graphs */
export type AgentGraphs = {
  _links?: PaginatedLinks;
  items: (AgentGraph)[];
  totalCount: number;
};

/** Request body for updating an agent graph. If rootConfigKey or edges are present, both must be present. */
export type AgentGraphPatch = {
  /** A human-readable name for the agent graph */
  name?: string;
  /** A description of the agent graph */
  description?: string;
  /** The ID of the member who maintains this agent graph. Pass an empty string to remove maintainer. */
  maintainerId?: string;
  /** The key of the team that maintains this agent graph. Pass an empty string to remove maintainer. */
  maintainerTeamKey?: string;
  /** The AI Config key of the root node. If present, edges must also be present. */
  rootConfigKey?: string;
  /** The edges in the graph. If present, rootConfigKey must also be present. Replaces all existing edges. */
  edges?: (AgentGraphEdge)[];
};

export type AgentOptimizationAcceptanceStatement = {
  statement: string;
  threshold: number;
};

export type AgentOptimizationJudge = {
  key: string;
  threshold: number;
};

export type AgentOptimization = {
  _access?: AiConfigsAccess;
  _links?: ParentAndSelfLinks;
  id: string;
  key: string;
  aiConfigKey: string;
  maxAttempts: number;
  modelChoices: (string)[];
  judgeModel: string;
  variableChoices: ({ [key: string]: unknown })[];
  acceptanceStatements: (AgentOptimizationAcceptanceStatement)[];
  judges: (AgentOptimizationJudge)[];
  userInputOptions: (string)[];
  groundTruthResponses: (string)[];
  metricKey?: string;
  tokenLimit?: number;
  variationKey?: string;
  label?: string;
  latencyOptimization?: boolean;
  tokenOptimization?: boolean;
  autoCommit?: boolean;
  version: number;
  createdAt: number;
};

export type AgentOptimizations = {
  _links?: PaginatedLinks;
  items: (AgentOptimization)[];
  totalCount: number;
};

export type AgentOptimizationPatch = {
  maxAttempts?: number;
  modelChoices?: (string)[];
  judgeModel?: string;
  variableChoices?: ({ [key: string]: unknown })[];
  acceptanceStatements?: (AgentOptimizationAcceptanceStatement)[];
  judges?: (AgentOptimizationJudge)[];
  userInputOptions?: (string)[];
  groundTruthResponses?: (string)[];
  metricKey?: string;
  tokenLimit?: number;
  variationKey?: string;
  label?: string;
  latencyOptimization?: boolean;
  tokenOptimization?: boolean;
  autoCommit?: boolean;
};

export type AgentOptimizationPost = {
  key: string;
  aiConfigKey: string;
  maxAttempts: number;
  modelChoices?: (string)[];
  judgeModel: string;
  variableChoices?: ({ [key: string]: unknown })[];
  acceptanceStatements?: (AgentOptimizationAcceptanceStatement)[];
  judges?: (AgentOptimizationJudge)[];
  userInputOptions?: (string)[];
  groundTruthResponses?: (string)[];
  metricKey?: string;
  tokenLimit?: number;
  variationKey?: string;
  label?: string;
  latencyOptimization?: boolean;
  tokenOptimization?: boolean;
  autoCommit?: boolean;
};

export type AgentOptimizationResultStatus = "RUNNING" | "PASSED" | "FAILED" | "ERRORED";

export type AgentOptimizationResultActivity = "PENDING" | "GENERATING" | "EVALUATING" | "GENERATING_VARIATION" | "VALIDATING" | "COMPLETED";

export type AgentOptimizationResult = {
  _access?: AiConfigsAccess;
  _links?: ParentAndSelfLinks;
  id: string;
  runId: string;
  agentOptimizationId: string;
  agentOptimizationVersion: number;
  status: AgentOptimizationResultStatus;
  activity: AgentOptimizationResultActivity;
  iteration: number;
  instructions: string;
  parameters?: { [key: string]: unknown };
  userInput: string;
  completionResponse?: string;
  variation?: { [key: string]: unknown };
  scores?: { [key: string]: unknown };
  generationTokens?: { [key: string]: unknown };
  evaluationTokens?: { [key: string]: unknown };
  generationLatency?: number;
  evaluationLatencies?: { [key: string]: unknown };
  completedAt?: number;
  createdVariationKey?: string;
  createdAt: number;
  updatedAt: number;
};

export type AgentOptimizationResults = {
  _links?: PaginatedLinks;
  items: (AgentOptimizationResult)[];
  totalCount?: number;
};

export type AgentOptimizationRun = {
  runId: string;
  optimizationKey: string;
  agentOptimizationId: string;
  agentOptimizationVersion: number;
  status: AgentOptimizationResultStatus;
  activity: AgentOptimizationResultActivity;
  createdAt: number;
  completedAt?: number | null;
};

export type AgentOptimizationRuns = {
  _links?: PaginatedLinks;
  items: (AgentOptimizationRun)[];
  totalCount?: number;
};

export type AgentOptimizationResultPost = {
  runId: string;
  agentOptimizationVersion: number;
  iteration: number;
  instructions: string;
  userInput: string;
  parameters?: { [key: string]: unknown };
};

export type AgentOptimizationResultPatch = {
  status?: AgentOptimizationResultStatus;
  activity?: AgentOptimizationResultActivity;
  completionResponse?: string;
  variation?: { [key: string]: unknown };
  scores?: { [key: string]: unknown };
  generationTokens?: { [key: string]: unknown };
  evaluationTokens?: { [key: string]: unknown };
  generationLatency?: number;
  evaluationLatencies?: { [key: string]: unknown };
  createdVariationKey?: string;
};

/** A resource that depends on this AI Config */
export type AiConfigDependency = {
  /** The type of the dependent resource */
  type: "agent-graph";
  /** The key of the dependent resource */
  key: string;
};

/** A usage of an AI tool in a specific AgentControl config variation. */
export type ToolReference = {
  /** The key of the AgentControl config with a variation that references this tool. */
  aiConfigKey: string;
  /** The name of the AgentControl config with a variation that references this tool. */
  aiConfigName: string;
  /** The ID of the variation that references this tool. */
  variationId: string;
  /** The key of the AgentControl config variation that references this tool. */
  variationKey: string;
  /** The name of the variation that references this tool. */
  variationName: string;
  /** The version of the tool being referenced. */
  toolVersion: number;
};

export type ToolReferences = {
  _links?: PaginatedLinks;
  /** The key of the AI tool. */
  resourceKey: string;
  /** The type of the resource being referenced. */
  resourceType: string;
  items: (ToolReference)[];
  /** The total number of references. */
  totalCount: number;
};

export type AccessRep = AiConfigsAccess;

export type AiConfigsAccess = {
  denied: (AiConfigsAccessDenied)[];
  allowed: (AiConfigsAccessAllowedRep)[];
};

export type AiConfigsAccessDenied = {
  action: string;
  reason: AiConfigsAccessDeniedReason;
};

export type AiConfigsAccessDeniedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type AiConfigsAccessAllowedRep = {
  action: string;
  reason: AiConfigsAccessAllowedReason;
};

export type AiConfigsAccessAllowedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type AiConfigsExperimentInfoRep = {
  baselineIdx: number;
  items: (AiConfigsLegacyExperimentRep)[];
};

export type AiConfigsLegacyExperimentRep = {
  metricKey?: string;
  _metric?: AiConfigsMetricListingRep;
  environments?: (string)[];
  _environmentSettings?: { [key: string]: AiConfigsExperimentEnvironmentSettingRep | undefined };
};

export type AiConfigsMetricListingRep = {
  /** The number of experiments using this metric */
  experimentCount?: number;
  /** The number of metric groups using this metric */
  metricGroupCount?: number;
  /** The number of guarded rollouts using this metric */
  guardedRolloutCount?: number;
  /** The number of release policies using this metric */
  releasePolicyCount?: number;
  /** The number of active experiments using this metric */
  activeExperimentCount?: number;
  /** The number of active guarded rollouts using this metric */
  activeGuardedRolloutCount?: number;
  /** The ID of this metric */
  _id: string;
  /** The version ID of the metric */
  _versionId: string;
  /** Version of the metric */
  _version?: number;
  /** A unique key to reference the metric */
  key: string;
  /** A human-friendly name for the metric */
  name: string;
  /** The kind of event the metric tracks */
  kind: "pageview" | "click" | "custom" | "trace";
  /** The number of feature flags currently attached to this metric */
  _attachedFlagCount?: number;
  /** The location and content type of related resources */
  _links: { [key: string]: AiConfigsLink | undefined };
  _site?: AiConfigsLink;
  _access?: AiConfigsAccess;
  /** Tags for the metric */
  tags: (string)[];
  _creationDate: number;
  lastModified?: AiConfigsModification;
  /** The ID of the member who maintains this metric */
  maintainerId?: string;
  _maintainer?: AiConfigsMemberSummary;
  /** Description of the metric */
  description?: string;
  /** The category of the metric */
  category?: string;
  /** For custom and trace metrics, whether to track numeric changes in value against a baseline (<code>true</code>) or to track a conversion when an end user takes an action (<code>false</code>). */
  isNumeric?: boolean;
  /** For custom and trace metrics, the success criteria */
  successCriteria?: "HigherThanBaseline" | "LowerThanBaseline";
  /** For numeric custom and trace metrics, the unit of measure */
  unit?: string;
  /** For custom metrics, the event key to use in your code */
  eventKey?: string;
  /** Deprecated, use <code>analysisUnits</code> instead. */
  randomizationUnits?: (string)[];
  /** An array of analysis units allowed for this metric. */
  analysisUnits?: (string)[];
  filters?: AiConfigsFilter;
  /** The method by which multiple unit event values are aggregated */
  unitAggregationType?: "average" | "sum";
  /** The method for analyzing metric events */
  analysisType?: "mean" | "percentile";
  /** The percentile for the analysis method. An integer denoting the target percentile between 0 and 100. Required when <code>analysisType</code> is <code>percentile</code>. */
  percentileValue?: number;
  eventDefault?: AiConfigsMetricEventDefaultRep;
  dataSource: AiConfigsMetricDataSourceRefRep;
  lastSeen?: number;
  /** Whether the metric version is archived */
  archived?: boolean;
  archivedAt?: number;
  /** For click metrics, the CSS selectors */
  selector?: string;
  urls?: (UrlMatcher)[];
  /** Not yet implemented - The start of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowStartOffset?: number;
  /** Not yet implemented - The end of the measurement window, in milliseconds relative to the unit's first exposure to a flag variation */
  windowEndOffset?: number;
  /** Lower winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, defines a two-sided clamp range. Otherwise lower-only winsorization. */
  winsorLowerPercentile?: number;
  /** Upper winsorization percentile, expressed as a percent in the open interval (0, 100). When both bounds are set, must be greater than winsorLowerPercentile. */
  winsorUpperPercentile?: number;
  /** When true, the percentile bound calculation excludes imputed zeros. Only meaningful when at least one bound is set and the metric includes units that didn't send events. */
  winsorExcludeImputed?: boolean;
  /** For trace metrics, the trace query to use for the metric. */
  traceQuery?: string;
  /** For trace metrics, the location in the trace to use for numeric values. */
  traceValueLocation?: string;
};

export type AiConfigsLink = {
  href?: string;
  type?: string;
};

export type AiConfigsModification = {
  date?: string;
};

export type AiConfigsMemberSummary = {
  /** The location and content type of related resources */
  _links: { [key: string]: AiConfigsLink | undefined };
  /** The member's ID */
  _id: string;
  /** The member's first name */
  firstName?: string;
  /** The member's last name */
  lastName?: string;
  /** The member's base role. If the member has no additional roles, this role will be in effect. */
  role: string;
  /** The member's email address */
  email: string;
};

export type AiConfigsFilter = {
  /** Filter type. One of [contextAttribute, eventProperty, group] */
  type: "group" | "contextAttribute" | "eventProperty";
  /** If not a group node, the context attribute name or event property name to filter on */
  attribute?: string;
  op: string;
  /** The context attribute / event property values or group member nodes */
  values: (unknown)[];
  /** For context attribute filters, the context kind. */
  contextKind?: string;
  /** If set, then take the inverse of the operator. 'in' becomes 'not in'. */
  negate: boolean;
};

export type AiConfigsMetricEventDefaultRep = {
  /** Whether to disable defaulting missing unit events when calculating results. Defaults to false */
  disabled?: boolean;
  /** The default value applied to missing unit events. Set to 0 when <code>disabled</code> is false. No other values are currently supported. */
  value?: number;
};

export type AiConfigsMetricDataSourceRefRep = {
  key: string;
  environmentKey?: string;
  _name?: string;
  _integrationKey?: string;
};

export type AiConfigsExperimentEnvironmentSettingRep = {
  startDate?: number;
  stopDate?: number;
  enabledPeriods?: (AiConfigsExperimentEnabledPeriodRep)[];
};

export type AiConfigsExperimentEnabledPeriodRep = {
  startDate?: number;
  stopDate?: number;
};

export type AiConfigMaintainer = {
  kind: string;
};

export type AiConfigTargetingVariationValue = AiConfigTargetingVariationBoolean | AiConfigTargetingVariationJson | AiConfigTargetingVariationNumber | AiConfigTargetingVariationString;

export type AgentGraphMaintainer = {
  kind?: string;
};

/** Announcement response */
export type AnnouncementResponse = {
  /** The ID of the announcement */
  _id: string;
  /** true if the announcement is dismissible */
  isDismissible: boolean;
  /** The title of the announcement */
  title: string;
  /** The message of the announcement */
  message: string;
  /** The start time of the announcement. This is a Unix timestamp in milliseconds. */
  startTime: number;
  /** The end time of the announcement. This is a Unix timestamp in milliseconds. */
  endTime?: number;
  /** The severity of the announcement */
  severity: "info" | "warning" | "critical";
  /** The status of the announcement */
  _status: "active" | "inactive" | "scheduled";
  _access?: AnnouncementAccessRep;
  _links: AnnouncementResponseLinks;
};

/** Create announcement request body */
export type CreateAnnouncementBody = {
  /** true if the announcement is dismissible */
  isDismissible: boolean;
  /** The title of the announcement */
  title: string;
  /** The message of the announcement */
  message: string;
  /** The start time of the announcement. This is a Unix timestamp in milliseconds. */
  startTime: number;
  /** The end time of the announcement. This is a Unix timestamp in milliseconds. */
  endTime?: number;
  /** The severity of the announcement */
  severity: "info" | "warning" | "critical";
};

export type AnnouncementLink = {
  href?: string;
  type?: string;
};

export type AnnouncementPaginatedLinks = {
  first?: AnnouncementLink;
  last?: AnnouncementLink;
  next?: AnnouncementLink;
  prev?: AnnouncementLink;
  self: AnnouncementLink;
};

export type AnnouncementJsonPatch = (AnnouncementPatchOperation)[];

export type AnnouncementPatchOperation = {
  /** The type of operation to perform */
  op: string;
  /** A JSON Pointer string specifying the part of the document to operate on */
  path: string;
  /** A JSON value used in "add", "replace", and "test" operations */
  value?: unknown;
};

export type AnnouncementAccessRep = AnnouncementAccess;

export type AnnouncementAccess = {
  denied: (AnnouncementAccessDenied)[];
  allowed: (AnnouncementAccessAllowedRep)[];
};

export type AnnouncementAccessDenied = {
  action: string;
  reason: AnnouncementAccessDeniedReason;
};

export type AnnouncementAccessDeniedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type AnnouncementAccessAllowedRep = {
  action: string;
  reason: AnnouncementAccessAllowedReason;
};

export type AnnouncementAccessAllowedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type GetAnnouncementsPublic200Response = {
  items: (AnnouncementResponse)[];
  _links: AnnouncementPaginatedLinks;
};

export type AnnouncementResponseLinks = {
  parent: AnnouncementLink;
};

/** Configuration that controls how changes to a resource are gated by approvals. */
export type ApprovalRequestSetting = {
  /** If approvals are required for this environment */
  required: boolean;
  /** Whether to skip approvals for pending changes */
  bypassApprovalsForPendingChanges: boolean;
  /** Sets the amount of approvals required before a member can apply a change. The minimum is one and the maximum is five.  */
  minNumApprovals: number;
  /** Allow someone who makes an approval request to apply their own change */
  canReviewOwnRequest: boolean;
  /** Allow applying the change as long as at least one person has approved */
  canApplyDeclinedChanges: boolean;
  /** Automatically apply changes that have been approved by all reviewers. This field is only applicable for approval services other than LaunchDarkly.  */
  autoApplyApprovedChanges?: boolean | null;
  /** Which service to use for managing approvals */
  serviceKind: string;
  /** Arbitrary service-specific configuration */
  serviceConfig: { [key: string]: unknown };
  /** Require approval only on flags with the provided tags. Otherwise all flags will require approval.  */
  requiredApprovalTags: (string)[];
  /** Optional integration configuration ID of a custom approval integration. This is an Enterprise-only feature.  */
  serviceKindConfigurationId?: string | null;
};

export type ApprovalRequestSettingWithEnvs = { environments?: { [key: string]: ApprovalRequestSetting | undefined }; _default?: ApprovalRequestSetting; _strict?: ApprovalRequestSetting };

export type ApprovalRequestSettings = { [key: string]: ApprovalRequestSettingWithEnvs | undefined };

export type ApprovalRequestSettingsPatch = {
  /** Automatically apply changes that have been approved by all reviewers. This field is only applicable for approval services other than LaunchDarkly.  */
  autoApplyApprovedChanges?: boolean | null;
  /** Whether to skip approvals for pending changes */
  bypassApprovalsForPendingChanges?: boolean;
  /** Allow applying the change as long as at least one person has approved */
  canApplyDeclinedChanges?: boolean;
  /** Allow someone who makes an approval request to apply their own change */
  canReviewOwnRequest?: boolean;
  environmentKey: string;
  /** Sets the amount of approvals required before a member can apply a change. The minimum is one and the maximum is five.  */
  minNumApprovals?: number;
  /** If approvals are required for this environment */
  required?: boolean;
  /** Require approval only on flags with the provided tags. Otherwise all flags will require approval.  */
  requiredApprovalTags?: (string)[];
  resourceKind: string;
  /** Arbitrary service-specific configuration */
  serviceConfig?: { [key: string]: unknown };
  /** Which service to use for managing approvals */
  serviceKind?: string;
  /** Optional integration configuration ID of a custom approval integration. This is an Enterprise-only feature.  */
  serviceKindConfigurationId?: string | null;
};

export type Views = {
  _links?: ViewsPaginatedLinks;
  items: (View)[];
  totalCount: number;
};

export type View = {
  _access?: ViewsAccessRep;
  _links?: ParentAndSelfLinks;
  /** Unique ID of this view */
  id: string;
  /** ID of the account that owns this view */
  accountId: string;
  /** ID of the project this view belongs to */
  projectId: string;
  /** Key of the project this view belongs to */
  projectKey: string;
  /** Unique key for the view within the account/project */
  key: string;
  /** Human-readable name for the view */
  name: string;
  /** Optional detailed description of the view */
  description: string;
  /** Whether this view is used to filter SDK payloads */
  _affectsSdkPayload: boolean;
  /** Deprecated compatibility field. Mirrors `_affectsSdkPayload` during rollout. */
  generateSdkKeys?: boolean;
  /** Version number for tracking changes */
  version: number;
  /** Tags associated with this view */
  tags: (string)[];
  createdAt: number;
  updatedAt: number;
  /** Whether this view is archived */
  archived: boolean;
  archivedAt?: number;
  deletedAt?: number;
  /** Whether this view is deleted */
  deleted: boolean;
  maintainer?: Maintainer;
  flagsSummary?: FlagsSummary;
  segmentsSummary?: SegmentsSummary;
  metricsSummary?: MetricsSummary;
  aiConfigsSummary?: AiConfigsSummary;
  resourceSummary?: ResourceSummary;
  flagsExpanded?: ExpandedLinkedFlags;
  segmentsExpanded?: ExpandedLinkedSegments;
  metricsExpanded?: ExpandedLinkedMetrics;
  aiConfigsExpanded?: ExpandedLinkedAiConfigs;
  resourcesExpanded?: ExpandedLinkedResources;
};

export type Maintainer = {
  id: string;
  kind: string;
  maintainerMember?: ViewsMaintainerMember;
  maintainerTeam?: ViewsMaintainerTeam;
};

export type ViewsMaintainerMember = {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
};

export type ViewsMaintainerTeam = {
  id: string;
  key: string;
  name: string;
};

export type ViewPost = {
  /** Unique key for the view within the account/project */
  key: string;
  /** Human-readable name for the view */
  name: string;
  /** Optional detailed description of the view */
  description?: string;
  /** Member ID of the maintainer for this view. Only one of `maintainerId` or `maintainerTeamKey` can be specified. */
  maintainerId?: string;
  /** Key of the maintainer team for this view. Only one of `maintainerId` or `maintainerTeamKey` can be specified. */
  maintainerTeamKey?: string;
  /** Tags associated with this view */
  tags?: (string)[];
};

export type ViewPatch = {
  /** Human-readable name for the view */
  name?: string;
  /** Optional detailed description of the view */
  description?: string;
  /** Member ID of the maintainer for this view. Only one of `maintainerId` or `maintainerTeamKey` can be specified. */
  maintainerId?: string;
  /** Key of the maintainer team for this view. Only one of `maintainerId` or `maintainerTeamKey` can be specified. */
  maintainerTeamKey?: string;
  /** Tags associated with this view */
  tags?: (string)[];
  /** Whether or not the view is archived */
  archived?: boolean;
};

export type ViewLinkedResources = {
  _links?: ViewsPaginatedLinks;
  items: (ViewLinkedResource)[];
  totalCount: number;
};

export type ViewLinkedResource = {
  _links: ParentAndSelfLinks;
  /** Key of the resource (flag or segment) */
  resourceKey: string;
  /** Environment ID of the resource (only present for segments) */
  environmentId?: string;
  /** Environment Key of the resource (only present for segments) */
  environmentKey?: string;
  resourceType: "flag" | "segment" | "aiConfig";
  linkedAt: number;
  resourceDetails?: ViewLinkedResourceDetails;
};

export type ViewLinkRequest = ViewLinkRequestKeys | ViewLinkRequestSegmentIdentifiers | ViewLinkRequestFilter;

export type FailedResourceLink = {
  /** The key of the resource that failed to link. */
  resourceKey: string;
  /** Environment ID of the resource (only present for segments) */
  environmentId?: string;
  /** The type of the resource that failed to link. */
  resourceType: "flag" | "segment" | "aiConfig";
  /** The reason why linking this resource failed. */
  errorMessage: string;
};

export type LinkResourceSuccessResponse = {
  /** The number of resources successfully linked. */
  successCount: number;
  /** The number of resources that failed to link. */
  failureCount: number;
  linkedResources?: ViewLinkedResources;
  /** Details of resources that failed to link. */
  failedResources?: (FailedResourceLink)[];
};

export type UnlinkResourceSuccessResponse = {
  /** The number of resources successfully unlinked. */
  successCount: number;
  /** The number of resources that failed to unlink. */
  failureCount: number;
  /** Details of resources that failed to unlink. */
  failedResources?: (FailedResourceLink)[];
};

export type ViewsSelfLink = {
  self: CoreLink;
};

export type ViewsPaginatedLinks = {
  first?: ViewsLink;
  last?: ViewsLink;
  next?: ViewsLink;
  prev?: ViewsLink;
  self: ViewsLink;
};

export type FlagsSummary = {
  count: number;
  linkedFlags?: ExpandedDirectlyLinkedFlags;
};

export type ResourceSummary = {
  flagCount: number;
  segmentCount?: number;
  totalCount: number;
};

export type SegmentsSummary = {
  count: number;
  linkedSegments?: ExpandedDirectlyLinkedSegments;
};

export type AiConfigsSummary = {
  count: number;
};

export type MetricsSummary = {
  count: number;
};

export type ExpandedDirectlyLinkedFlags = {
  items: (ExpandedDirectlyLinkedFlag)[];
  totalCount: number;
};

export type ExpandedDirectlyLinkedSegments = {
  items: (ExpandedDirectlyLinkedSegment)[];
  totalCount: number;
};

/** Details on linked flags for a view - requires passing the 'allFlags' expand field */
export type ExpandedLinkedFlags = {
  items: (ExpandedFlag)[];
  totalCount: number;
};

/** Details on linked segments for a view - requires passing the 'allSegments' expand field */
export type ExpandedLinkedSegments = {
  items: (ExpandedSegment)[];
  totalCount: number;
};

export type ExpandedLinkedAiConfigs = {
  items: (ExpandedAiConfig)[];
  totalCount: number;
};

export type ExpandedLinkedMetrics = {
  items: (ExpandedMetric)[];
  totalCount: number;
};

/** Details on linked resources for a view - requires passing the 'allResources' expand field */
export type ExpandedLinkedResources = {
  items: ExpandedLinkedResourcesItems;
  totalCount: number;
};

export type ExpandedDirectlyLinkedFlag = {
  key: string;
  name: string;
  links: ViewsSelfLink;
};

export type ExpandedDirectlyLinkedSegment = {
  key: string;
  name: string;
  environmentId: string;
  links: ViewsSelfLink;
};

/** Flag representation for Views API - contains only fields actually used by the Views service */
export type ExpandedFlag = {
  /** A unique key used to reference the flag */
  key: string;
  /** A human-friendly name for the flag */
  name: string;
  /** Description of the flag */
  description?: string;
  /** Creation date in milliseconds */
  creationDate?: number;
  /** Version of the flag */
  _version?: number;
  /** Whether the flag is archived */
  archived?: boolean;
  /** Tags for the flag */
  tags?: (string)[];
  /** Whether the flag is temporary */
  temporary?: boolean;
  /** Whether to include in snippet */
  includeInSnippet?: boolean;
  maintainer?: ExpandedFlagMaintainer;
  _links?: ParentAndSelfLinks;
};

export type ExpandedFlagMaintainer = {
  /** The ID of the maintainer member, or the key of the maintainer team */
  key: string;
  /** The type of the maintainer */
  kind: "member" | "team";
  _member?: ViewsMemberSummary;
  _team?: ViewsMemberTeamSummaryRep;
};

/** AI Config representation for Views API - contains only fields actually used by the Views service */
export type ExpandedAiConfig = {
  /** A unique key used to reference the AI config */
  key?: string;
  /** A human-friendly name for the AI config */
  name?: string;
  /** Tags for the AI config */
  tags?: (string)[];
  /** Description of the AI config */
  description?: string;
  /** Version of the AI config */
  version?: number;
  /** Creation date in milliseconds */
  createdAt?: number;
  /** Last modification date in milliseconds */
  updatedAt?: number;
  /** Key of the flag that this AI config is attached to */
  flagKey?: string;
  _links?: ParentAndSelfLinks;
};

/** Segment representation for Views API - contains only fields actually used by the Views service */
export type ExpandedSegment = {
  /** A unique key used to reference the segment */
  key: string;
  /** A human-friendly name for the segment */
  name: string;
  /** Environment ID of the segment */
  environmentId?: string;
  /** Environment key of the segment */
  environmentKey?: string;
  /** Description of the segment */
  description?: string;
  /** Creation date in milliseconds */
  creationDate?: number;
  /** Last modification date in milliseconds */
  lastModifiedDate?: number;
  /** Whether the segment is deleted */
  deleted?: boolean;
  /** Tags for the segment */
  tags?: (string)[];
  /** Whether the segment is unbounded */
  unbounded?: boolean;
  /** Version of the segment */
  version?: number;
  /** Generation of the segment */
  generation?: number;
  _links?: ParentAndSelfLinks;
};

/** Metric representation for Views API - contains only fields actually used by the Views service */
export type ExpandedMetric = {
  /** A unique key used to reference the metric */
  key?: string;
  /** A human-friendly name for the metric */
  name?: string;
  /** Creation date in milliseconds */
  creationDate?: number;
  /** Last modification date in milliseconds */
  lastModified?: number;
  /** Whether the metric is active */
  isActive?: boolean;
  /** Event key for the metric */
  eventKey?: string;
  /** ID of the metric */
  _id?: string;
  /** Version ID of the metric */
  _versionId?: string;
  /** Kind of the Metric */
  kind?: string;
  /** Category of the Metric */
  category?: string;
  /** Description of the Metric */
  description?: string;
  isNumeric?: boolean;
  /** Last seen date in milliseconds */
  lastSeen?: number;
  _links?: ParentAndSelfLinks;
};

export type ViewsAccessRep = ViewsAccess;

export type ViewsLink = {
  href?: string;
  type?: string;
};

export type ViewsMemberSummary = {
  /** The location and content type of related resources */
  _links: { [key: string]: ViewsLink | undefined };
  /** The member's ID */
  _id: string;
  /** The member's first name */
  firstName?: string;
  /** The member's last name */
  lastName?: string;
  /** The member's base role. If the member has no additional roles, this role will be in effect. */
  role: string;
  /** The member's email address */
  email: string;
};

export type ViewsMemberTeamSummaryRep = {
  /** A list of keys of the custom roles this team has access to */
  customRoleKeys: (string)[];
  /** The team key */
  key: string;
  _links?: { [key: string]: ViewsLink | undefined };
  /** The team name */
  name: string;
};

export type ViewsAccess = {
  denied: (ViewsAccessDenied)[];
  allowed: (ViewsAccessAllowedRep)[];
};

export type ViewsAccessDenied = {
  action: string;
  reason: ViewsAccessDeniedReason;
};

export type ViewsAccessDeniedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type ViewsAccessAllowedRep = {
  action: string;
  reason: ViewsAccessAllowedReason;
};

export type ViewsAccessAllowedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type ViewLinkedResourceDetails = {
  view?: View;
  flag?: ExpandedFlag;
  segment?: ExpandedSegment;
  aiConfig?: ExpandedAiConfig;
  metric?: ExpandedMetric;
};

export type ViewLinkRequestKeys = {
  /** Keys of the resources (flags, segments) to link/unlink */
  keys: (string)[];
  /** Optional filter string to determine which resources should be linked. Resources only need to match either the filter or explicitly-listed keys to be linked (union). Uses the same syntax as list endpoints: flags use comma-separated field:value filters, segments use queryfilter syntax.  Supported filters by resource type: - flags: query, tags, maintainerId, maintainerTeamKey, type, status, state, staleState, sdkAvailability, targeting, hasExperiment, hasDataExport, evaluated, creationDate, contextKindTargeted, contextKindsEvaluated, filterEnv, segmentTargeted, codeReferences.min, codeReferences.max, excludeSettings, releasePipeline, applicationEvaluated, purpose, guardedRollout, view, key, name, archived, followerId - segments (queryfilter): query, tags, keys, excludedKeys, unbounded, external, view, type Some filters are only available when the corresponding feature is enabled on your account.  */
  filter?: string;
  /** Optional comment for the link/unlink operation */
  comment?: string;
};

export type ViewLinkRequestSegmentIdentifier = {
  environmentId: string;
  segmentKey: string;
};

export type ViewLinkRequestSegmentIdentifiers = {
  /** Identifiers of the segments to link/unlink (environmentId and segmentKey) */
  segmentIdentifiers: (ViewLinkRequestSegmentIdentifier)[];
  /** Optional filter string to determine which resources should be linked. Resources only need to match either the filter or explicitly-listed keys to be linked (union). Uses the same queryfilter syntax as the segments list endpoint.  Supported filters for segments: query, tags, keys, excludedKeys, unbounded, external, view, type  */
  filter?: string;
  /** Required when using filter for segment resources. Specifies which environment to query for segments matching the filter. Ignored when only using explicit segmentIdentifiers (since each identifier contains its own environmentId).  */
  environmentId?: string;
  /** Optional comment for the link/unlink operation */
  comment?: string;
};

export type ViewLinkRequestFilter = {
  /** Filter string to match resources for linking. Uses the same syntax as list endpoints: flags use comma-separated field:value filters, segments use queryfilter syntax.  Supported filters by resource type: - flags: query, tags, maintainerId, maintainerTeamKey, type, status, state, staleState, sdkAvailability, targeting, hasExperiment, hasDataExport, evaluated, creationDate, contextKindTargeted, contextKindsEvaluated, filterEnv, segmentTargeted, codeReferences.min, codeReferences.max, excludeSettings, releasePipeline, applicationEvaluated, purpose, guardedRollout, view, key, name, archived, followerId - segments (queryfilter): query, tags, keys, excludedKeys, unbounded, external, view, type Some filters are only available when the corresponding feature is enabled on your account.  */
  filter: string;
  /** Required when using filter for segment resources. Specifies which environment to query for segments matching the filter. Ignored for flag resources (flags are global across environments).  */
  environmentId?: string;
  /** Optional comment for the link/unlink operation */
  comment?: string;
};

export type ExpandedLinkedResourcesFlags = {
  items: (ExpandedFlag)[];
  totalCount: number;
};

export type ExpandedLinkedResourcesSegments = {
  items: (ExpandedSegment)[];
  totalCount: number;
};

export type ExpandedLinkedResourcesItems = {
  flags: ExpandedLinkedResourcesFlags;
  segments?: ExpandedLinkedResourcesSegments;
};

export type PostReleasePolicyRequest = {
  scope?: ReleasePolicyScope;
  releaseMethod: ReleaseMethod;
  guardedReleaseConfig?: GuardedReleaseConfig;
  progressiveReleaseConfig?: ProgressiveReleaseConfig;
  /** The name of the release policy */
  name: string;
  /** The human-readable key of the release policy */
  key: string;
};

export type PutReleasePolicyRequest = {
  scope?: ReleasePolicyScope;
  releaseMethod: ReleaseMethod;
  guardedReleaseConfig?: GuardedReleaseConfig;
  progressiveReleaseConfig?: ProgressiveReleaseConfig;
  /** The name of the release policy */
  name: string;
};

export type ReleasePolicy = {
  _access?: ReleasePoliciesAccessRep;
  /** The unique identifier of the release policy */
  _id: string;
  scope?: ReleasePolicyScope;
  /** The rank/priority of the release policy */
  rank: number;
  releaseMethod: ReleaseMethod;
  guardedReleaseConfig?: GuardedReleaseConfig;
  progressiveReleaseConfig?: ProgressiveReleaseConfig;
  /** The name of the release policy */
  name: string;
  /** The human-readable key of the release policy */
  key: string;
};

export type ReleasePolicyScope = {
  /** List of environment keys this policy applies to */
  environmentKeys?: (string)[];
  /** List of flag tag keys this policy applies to */
  flagTagKeys?: (string)[];
};

/** Configuration for guarded releases */
export type GuardedReleaseConfig = {
  /** Context kind key to use as the randomization unit for the rollout */
  rolloutContextKindKey?: string;
  /** The minimum number of samples required to make a decision */
  minSampleSize?: number;
  /** Whether to roll back on regression */
  rollbackOnRegression?: boolean;
  /** List of metric keys */
  metricKeys?: (string)[];
  /** List of metric group keys */
  metricGroupKeys?: (string)[];
  /** List of stages */
  stages?: (ReleasePolicyStage)[];
};

/** Configuration for progressive releases */
export type ProgressiveReleaseConfig = {
  /** Context kind key to use as the randomization unit for the rollout */
  rolloutContextKindKey?: string;
  /** List of stages */
  stages?: (ReleasePolicyStage)[];
};

export type ReleasePoliciesResponse = {
  /** List of release policies */
  items: (ReleasePolicy)[];
  /** Total number of release policies */
  totalCount: number;
};

/** The release method for this policy */
export type ReleaseMethod = "guarded-release" | "immediate-release" | "progressive-release";

export type ReleasePolicyStage = {
  allocation: number;
  durationMillis: number;
};

export type ReleasePoliciesAccessRep = ReleasePoliciesAccess;

export type ReleasePoliciesAccess = {
  denied: (ReleasePoliciesAccessDenied)[];
  allowed: (ReleasePoliciesAccessAllowedRep)[];
};

export type ReleasePoliciesAccessDenied = {
  action: string;
  reason: ReleasePoliciesAccessDeniedReason;
};

export type ReleasePoliciesAccessDeniedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type ReleasePoliciesAccessAllowedRep = {
  action: string;
  reason: ReleasePoliciesAccessAllowedReason;
};

export type ReleasePoliciesAccessAllowedReason = {
  /** Resource specifier strings */
  resources?: (string)[];
  /** Targeted resources are the resources NOT in this list. The <code>resources</code> and <code>notActions</code> fields must be empty to use this field. */
  notResources?: (string)[];
  /** Actions to perform on a resource */
  actions?: (ActionSpecifier)[];
  /** Targeted actions are the actions NOT in this list. The <code>actions</code> and <code>notResources</code> fields must be empty to use this field. */
  notActions?: (ActionSpecifier)[];
  /** Whether this statement should allow or deny actions on the resources. */
  effect: "allow" | "deny";
  role_name?: string;
};

export type CreateIpAllowlistEntryRequest = {
  ipAddress: string;
  description?: string;
};

export type IpAllowlistEntryResponse = {
  /** Unique identifier for the allowlist entry */
  _id: string;
  /** IP address or CIDR block */
  ipAddress: string;
  description?: string;
  _createdByMemberId?: string;
  _createdAt: number;
  _updatedAt: number;
};

export type IpAllowlistResponse = {
  sessionAllowlistEnabled: boolean;
  apiTokenAllowlistEnabled: boolean;
  entries: (IpAllowlistEntryResponse)[];
};

export type PatchIpAllowlistConfigRequest = {
  /** Enable or disable session allowlist */
  sessionAllowlistEnabled?: boolean;
  /** Enable or disable API token allowlist */
  apiTokenAllowlistEnabled?: boolean;
};

export type PatchIpAllowlistEntryRequest = {
  description: string;
};

export type DeploymentCollectionRep = {
  /** The total number of deployments */
  totalCount: number;
  /** A list of deployments */
  items: (DeploymentRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type DeploymentKind = string;

export type DeploymentRep = {
  /** The deployment ID */
  id: string;
  /** The application key */
  applicationKey: string;
  /** The application version */
  applicationVersion: string;
  /** The time the deployment started */
  startedAt: UnixMillis;
  /** The time the deployment ended */
  endedAt?: UnixMillis;
  /** The duration of the deployment in milliseconds */
  durationMs?: number;
  /** The status of the deployment */
  status: DeploymentStatus;
  /** The kind of deployment */
  kind: DeploymentKind;
  /** Whether the deployment is active */
  active: boolean;
  /** The metadata associated with the deployment */
  metadata?: { [key: string]: unknown | undefined };
  /** Whether the deployment is archived */
  archived: boolean;
  /** The environment key */
  environmentKey: string;
  /** The number of contributors */
  numberOfContributors: number;
  /** The number of pull requests */
  numberOfPullRequests: number;
  /** The number of lines added */
  linesAdded: number;
  /** The number of lines deleted */
  linesDeleted: number;
  /** The total lead time from first commit to deployment end in milliseconds */
  leadTime: number;
  /** The pull requests contained in the deployment */
  pullRequests?: PullRequestCollectionRep;
  /** The flag references contained in the deployment */
  flagReferences?: FlagReferenceCollectionRep;
  /** The lead time stages for the deployment */
  leadTimeStages?: LeadTimeStagesRep;
};

export type DeploymentStatus = string;

export type EvaluationsSummary = {
  /** A list of variation evaluations */
  variations?: (VariationEvalSummary)[];
};

export type EventType = string;

export type FailureReasonRep = {
  /** The attribute that failed validation */
  attribute: string;
  /** The reason the attribute failed validation */
  reason: string;
};

export type FlagEventCollectionRep = {
  /** The total number of flag events */
  totalCount: number;
  /** A list of flag events */
  items: (FlagEventRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type FlagEventExperiment = {
  /** The experiment key */
  key: string;
  /** The experiment name */
  name: string;
  /** The experiment iteration */
  iteration: FlagEventExperimentIteration;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type FlagEventExperimentCollection = {
  /** The total number of experiments */
  totalCount: number;
  /** A list of experiments */
  items: (FlagEventExperiment)[];
};

export type FlagEventExperimentIteration = {
  /** The experiment iteration ID */
  id: string;
  /** The experiment iteration status */
  status: IterationStatus;
  /** Timestamp of when the iteration started */
  startedAt: UnixMillis;
  /** Timestamp of when the iteration ended */
  endedAt?: UnixMillis;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type FlagEventImpactRep = {
  /** The size of the flag event impact. Sizes are defined as: none (0%), small (0-20%), medium (20-80%), large (>80%) */
  size?: "none" | "small" | "medium" | "large";
  /** The percentage of the flag event impact */
  percentage?: number;
  /** The reason for the flag event impact */
  reason?: ImpactReason;
  /** A summary of the change in variation evaluations after the flag event */
  evaluationsSummary?: EvaluationsSummary;
};

export type FlagEventMemberRep = {
  /** The member ID */
  id: string;
  /** The member email */
  email: string;
  /** The member first name */
  firstName: string;
  /** The member last name */
  lastName: string;
};

export type FlagEventRep = {
  /** The flag event ID */
  id: string;
  /** The project ID */
  projectId: string;
  /** The project key */
  projectKey: string;
  /** The environment ID */
  environmentId?: string;
  /** The environment key */
  environmentKey?: string;
  /** The flag key */
  flagKey: string;
  /** The event type */
  eventType: EventType;
  /** A Unix timestamp in milliseconds */
  eventTime: UnixMillis;
  /** The event description */
  description: string;
  /** The audit log entry ID */
  auditLogEntryId?: string;
  /** The member data */
  member?: FlagEventMemberRep;
  /** The resource actions */
  actions?: (string)[];
  /** The flag event evaluation impact */
  impact: FlagEventImpactRep;
  /** A list of experiment iterations related to the flag event */
  experiments?: FlagEventExperimentCollection;
};

export type FlagReferenceCollectionRep = {
  /** The total number of flag references */
  totalCount: number;
  /** A list of flag references */
  items: (FlagReferenceRep)[];
};

export type FlagReferenceRep = {
  /** The project key */
  projectKey: string;
  /** The flag key */
  flagKey: string;
  /** The number of references added */
  referencesAdded: number;
  /** The number of references removed */
  referencesRemoved: number;
};

export type ImpactReason = string;

export type InsightGroup = {
  /** Expanded details about the environment */
  environment?: Environment;
  /** The scores for the insight group */
  scores?: InsightGroupScores;
  /** Metadata about the insight scores, when expanded */
  scoreMetadata?: InsightGroupCollectionScoreMetadata;
  /** The insight group key */
  key: string;
  /** The insight group name */
  name: string;
  /** The project key */
  projectKey: string;
  /** The environment key */
  environmentKey: string;
  /** The application keys */
  applicationKeys?: (string)[];
  /** The time the insight group was created */
  createdAt: UnixMillis;
};

export type InsightGroupCollection = {
  /** The total number of insight groups */
  totalCount: number;
  /** A list of insight groups */
  items: (InsightGroup)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
  /** Metadata about the insight groups */
  metadata?: InsightGroupCollectionMetadata;
  /** Metadata about the insight scores, when expanded */
  scoreMetadata?: InsightGroupCollectionScoreMetadata;
};

export type InsightGroupCollectionMetadata = {
  countByIndicator: InsightGroupsCountByIndicator;
};

export type InsightGroupCollectionScoreMetadata = {
  /** The time period for the score calculations */
  period: InsightPeriod;
  /** The time period for the score calculations in the last period */
  lastPeriod: InsightPeriod;
};

export type InsightGroupScores = {
  /** The overall score for the insight group */
  overall: InsightsMetricScore;
  /** The deployment frequency score for the insight group */
  deploymentFrequency: InsightsMetricScore;
  /** The deployment failure rate score for the insight group */
  deploymentFailureRate: InsightsMetricScore;
  /** The lead time score for the insight group */
  leadTime: InsightsMetricScore;
  /** The impact size score for the insight group */
  impactSize: InsightsMetricScore;
  /** The Experimentation coverage score for the insight group */
  experimentationCoverage: InsightsMetricScore;
  /** The flag health score for the insight group */
  flagHealth: InsightsMetricScore;
  /** The velocity score for the insight group */
  velocity: InsightsMetricScore;
  /** The risk score for the insight group */
  risk: InsightsMetricScore;
  /** The efficiency score for the insight group */
  efficiency: InsightsMetricScore;
  /** The creation ratio score for the insight group */
  creationRatio?: InsightsMetricScore;
};

export type InsightGroupsCountByIndicator = {
  /** The number of insight groups with an excellent indicator */
  excellent: number;
  /** The number of insight groups with a good indicator */
  good: number;
  /** The number of insight groups with a fair indicator */
  fair: number;
  /** The number of insight groups with a needs attention indicator */
  needsAttention: number;
  /** The number of insight groups with a not calculated indicator */
  notCalculated: number;
  /** The number of insight groups with an unknown indicator */
  unknown: number;
  /** The total number of insight groups */
  total: number;
};

export type InsightPeriod = {
  /** The start time of the period */
  startTime: UnixMillis;
  /** The end time of the period */
  endTime: UnixMillis;
};

export type InsightScores = {
  /** The time period for the scores */
  period: InsightPeriod;
  /** The time period for the scores in the last period */
  lastPeriod: InsightPeriod;
  /** The scores for the insight groups */
  scores: InsightGroupScores;
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type InsightsChart = {
  /** Metadata for the chart */
  metadata: InsightsChartMetadata;
  /** Series data for the chart */
  series: (InsightsChartSeries)[];
};

export type InsightsChartBounds = {
  /** Name of the bound */
  name: string;
  /** Value of the bound */
  value: number;
};

export type InsightsChartMetadata = {
  /** Metadata values */
  summary: InsightsChartMetadataCustomValues;
  /** Name of the chart */
  name?: string;
  /** Metrics for the given chart data, included when expanded */
  metrics?: InsightsChartMetrics;
  /** X-axis metadata */
  xAxis: InsightsChartSeriesMetadataAxis;
  /** Y-axis metadata */
  yAxis: InsightsChartSeriesMetadataAxis;
};

export type InsightsChartMetadataCustomValues = { [key: string]: unknown | undefined };

export type InsightsChartMetric = {
  /** Metric indicator tier */
  indicator: string;
  /** Metric value */
  value: number;
  /** Metric unit */
  unit: string;
  /** Metric modifier */
  modifier: string;
  /** Metric indicator tiers */
  tiers: (InsightsMetricTierDefinition)[];
};

export type InsightsChartMetrics = { [key: string]: InsightsChartMetric | undefined };

export type InsightsChartSeries = {
  /** Metadata for the series */
  metadata: InsightsChartSeriesMetadata;
  /** Data points for the series */
  data: (InsightsChartSeriesDataPoint)[];
};

export type InsightsChartSeriesDataPoint = {
  /** X-axis value */
  x: number;
  /** Y-axis value */
  y: number;
  /** Additional values for the data point */
  values?: { [key: string]: unknown | undefined };
};

export type InsightsChartSeriesMetadata = {
  /** Name of the series */
  name: string;
  /** Aggregate count of the series values */
  count?: number;
  /** Bounds for the series data */
  bounds?: (InsightsChartBounds)[];
};

export type InsightsChartSeriesMetadataAxis = {
  /** Unit of the axis */
  unit: string;
};

export type InsightsMetricIndicatorRange = {
  /** The minimum value for the indicator range */
  min: number;
  /** The maximum value for the indicator range */
  max: number;
};

export type InsightsMetricScore = {
  /** The score for the metric */
  score: number;
  /** The keys of the metrics that were aggregated to calculate this score */
  aggregateOf?: (string)[];
  diffVsLastPeriod?: number;
  /** The indicator for the score */
  indicator: InsightsMetricScoreIndicator;
  /** The indicator range for the score */
  indicatorRange: InsightsMetricIndicatorRange;
  /** The score for the metric in the last period */
  lastPeriod?: InsightsMetricScore;
};

export type InsightsMetricScoreIndicator = string;

export type InsightsMetricTierDefinition = {
  /** Metric indicator tier */
  indicator: string;
  /** Metric indicator description */
  description: string;
};

export type InsightsRepository = {
  /** The repository ID */
  _id: string;
  /** The repository version */
  version: number;
  /** The repository key */
  key: string;
  /** The repository type */
  type: string;
  /** The repository URL */
  url: string;
  /** The repository main branch */
  mainBranch: string;
  projects?: ProjectSummaryCollection;
};

export type InsightsRepositoryCollection = {
  /** Total number of repositories */
  totalCount: number;
  /** List of repositories */
  items: (InsightsRepository)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type InsightsRepositoryProject = {
  /** The repository key */
  repositoryKey: string;
  /** The project key */
  projectKey: string;
};

export type InsightsRepositoryProjectCollection = {
  /** Total number of repository project associations */
  totalCount: number;
  /** List of repository project associations */
  items: (InsightsRepositoryProject)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type InsightsRepositoryProjectMappings = {
  mappings: (InsightsRepositoryProject)[];
};

export type IterationStatus = string;

export type LeadTimeStagesRep = {
  /** The coding duration in milliseconds */
  codingDurationMs: number;
  /** The review duration in milliseconds */
  reviewDurationMs?: number;
  /** The wait duration between merge time and deploy start time in milliseconds */
  waitDurationMs?: number;
  /** The deploy duration in milliseconds */
  deployDurationMs?: number;
  /** The total lead time in milliseconds */
  totalLeadTimeMs?: number;
};

export type PostDeploymentEventInput = {
  /** The project key */
  projectKey: string;
  /** The environment key */
  environmentKey: string;
  /** The application key. This defines the granularity at which you want to view your insights metrics. Typically it is the name of one of the GitHub repositories that you use in this project.<br/><br/>LaunchDarkly automatically creates a new application each time you send a unique application key. */
  applicationKey: string;
  /** The application name. This defines how the application is displayed */
  applicationName?: string;
  /** The kind of application. Default: <code>server</code> */
  applicationKind?: "server" | "browser" | "mobile";
  /** The application version. You can set the application version to any string that includes only letters, numbers, periods (<code>.</code>), hyphens (<code>-</code>), or underscores (<code>_</code>).<br/><br/>We recommend setting the application version to at least the first seven characters of the SHA or to the tag of the GitHub commit for this deployment. */
  version: string;
  /** The version name. This defines how the version is displayed */
  versionName?: string;
  /** The event type */
  eventType: "started" | "failed" | "finished" | "custom";
  /** The time, in Unix milliseconds, when the event occurred. If not included, the time will default to when the event is processed and stored in LaunchDarkly. */
  eventTime?: UnixMillis;
  /** A JSON object containing metadata about the event */
  eventMetadata?: { [key: string]: unknown | undefined };
  /** A JSON object containing metadata about the deployment */
  deploymentMetadata?: { [key: string]: unknown | undefined };
};

export type PostInsightGroupParams = {
  /** The name of the insight group */
  name: string;
  /** The key of the insight group */
  key: string;
  /** The projectKey to be associated with the insight group */
  projectKey: string;
  /** The environmentKey to be associated with the insight group */
  environmentKey: string;
  /** The application keys to associate with the insight group. If not provided, the insight group will include data from all applications. */
  applicationKeys?: (string)[];
};

export type ProjectSummaryCollection = {
  totalCount: number;
  items: (ProjectSummary)[];
  _links?: { [key: string]: Link | undefined };
};

export type PullRequestCollectionRep = {
  /** The total number of pull requests */
  totalCount: number;
  /** A list of pull requests */
  items: (PullRequestRep)[];
  /** The location and content type of related resources */
  _links?: { [key: string]: Link | undefined };
};

export type PullRequestLeadTimeRep = {
  /** The coding duration in milliseconds */
  codingDurationMs: number;
  /** The review duration in milliseconds */
  reviewDurationMs?: number;
  /** The max wait duration between merge time and deploy start time in milliseconds */
  maxWaitDurationMs?: number;
  /** The average wait duration between merge time and deploy start time in milliseconds */
  avgWaitDurationMs?: number;
  /** The max deploy duration in milliseconds */
  maxDeployDurationMs?: number;
  /** The average deploy duration in milliseconds */
  avgDeployDurationMs?: number;
  /** The max total lead time in milliseconds */
  maxTotalLeadTimeMs?: number;
  /** The average total lead time in milliseconds */
  avgTotalLeadTimeMs?: number;
};

export type PullRequestRep = {
  /** The pull request internal ID */
  id: string;
  /** The pull request number */
  externalId: string;
  /** The pull request title */
  title: string;
  /** The pull request status */
  status: string;
  /** The pull request author */
  author: string;
  /** The pull request create time */
  createTime: UnixMillis;
  /** The pull request merge time */
  mergeTime?: UnixMillis;
  /** The pull request merge commit key */
  mergeCommitKey?: string;
  /** The pull request base commit key */
  baseCommitKey: string;
  /** The pull request head commit key */
  headCommitKey: string;
  /** The number of files changed */
  filesChanged: number;
  /** The number of lines added */
  linesAdded: number;
  /** The number of lines deleted */
  linesDeleted: number;
  /** The pull request URL */
  url: string;
  /** A list of deployments associated with the pull request */
  deployments?: DeploymentCollectionRep;
  /** A list of flag references associated with the pull request */
  flagReferences?: FlagReferenceCollectionRep;
  /** The lead time for the pull request in a given environment */
  leadTime?: PullRequestLeadTimeRep;
};

export type ValidationFailedErrorRep = {
  /** Specific error code encountered */
  code: string;
  /** Description of the error */
  message: string;
  /** List of validation errors */
  errors: (FailureReasonRep)[];
};

export type VariationEvalSummary = {
  /** The variation value */
  value?: unknown;
  /** The number of evaluations in the ten minutes before the flag event */
  before?: number;
  /** The number of evaluations in the ten minutes after the flag event */
  after?: number;
};
