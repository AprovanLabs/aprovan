import type { AgentGraph, AgentGraphEdge, AgentGraphEdgePost, AgentGraphs, AgentOptimization, AgentOptimizationAcceptanceStatement, AgentOptimizationJudge, AgentOptimizationResult, AgentOptimizationResultActivity, AgentOptimizationResultStatus, AgentOptimizationResults, AgentOptimizationRuns, AgentOptimizations, AiConfig, AiConfigTargeting, AiConfigVariation, AiConfigVariationPost, AiConfigVariationsResponse, AiConfigs, AiTool, AiTools, AnalysisConfigInput, AnnouncementJsonPatch, AnnouncementResponse, ApplicationCollectionRep, ApplicationRep, ApplicationVersionRep, ApplicationVersionsCollectionRep, ApprovalRequestResponse, ApprovalRequestSettings, AuditLogEntryListingRepCollection, AuditLogEntryRep, BigSegmentStoreIntegration, BigSegmentStoreIntegrationCollection, BigSegmentTarget, BooleanFlagDefaults, BranchCollectionRep, BranchRep, BulkEditMembersRep, BulkEditTeamsRep, CallerIdentityRep, CapabilityConfigPost, Client, ClientCollection, ClientSideAvailabilityPost, ContextAttributeNamesCollection, ContextAttributeValuesCollection, ContextInstance, ContextInstanceEvaluations, ContextInstanceSegmentMemberships, ContextInstances, ContextKindsCollectionRep, Contexts, CountBucketsResult, CreatePhaseInput, CustomProperties, CustomRole, CustomRoles, CustomWorkflowOutput, CustomWorkflowsListingOutput, DefaultClientSideAvailability, DefaultClientSideAvailabilityPost, Defaults, DependentFlagsByEnvironment, DeploymentCollectionRep, DeploymentRep, Destination, Destinations, Environment, EnvironmentPost, Environments, Error, EventFilter, ExpandableApprovalRequestResponse, ExpandableApprovalRequestsResponse, Experiment, ExperimentCollectionRep, ExpiringTargetGetResponse, ExpiringTargetPatchResponse, ExpiringUserTargetGetResponse, ExpiringUserTargetPatchResponse, Export, ExtinctionCollectionRep, ExtinctionListPost, FeatureFlag, FeatureFlagScheduledChange, FeatureFlagScheduledChanges, FeatureFlagStatusAcrossEnvironments, FeatureFlagStatuses, FeatureFlags, FeatureWorkflowId, FlagConfigApprovalRequestResponse, FlagConfigApprovalRequestsResponse, FlagCopyConfigEnvironment, FlagDefaultsRep, FlagEventCollectionRep, FlagFollowersByProjEnvGetRep, FlagFollowersGetRep, FlagImportIntegration, FlagImportIntegrationCollection, FlagLinkCollectionRep, FlagLinkRep, FlagPrerequisitePost, FlagStatusRep, FlagsInput, ForbiddenErrorRep, FormVariableConfig, GenerateTrustPolicyPostRep, GenerateWarehouseDestinationKeyPairPostRep, GetAnnouncementsPublic200Response, GuardedReleaseConfig, HoldoutDetailRep, HoldoutRep, HoldoutsCollectionRep, Import, InsightGroup, InsightGroupCollection, InsightScores, InsightsChart, InsightsRepositoryCollection, InsightsRepositoryProject, InsightsRepositoryProjectCollection, Instruction, InstructionUserRequest, Instructions, Integration, IntegrationConfigurationCollectionRep, IntegrationConfigurationsRep, IntegrationDeliveryConfiguration, IntegrationDeliveryConfigurationCollection, IntegrationDeliveryConfigurationResponse, Integrations, InvalidRequestErrorRep, IpAllowlistEntryResponse, IpAllowlistResponse, IpList, IterationInput, IterationRep, JsonPatch, JudgeConfiguration, LayerCollectionRep, LayerRep, LinkResourceSuccessResponse, Member, Members, Message, MetricCollectionRep, MetricDataSourceRefRep, MetricEventDefaultRep, MetricGroupCollectionRep, MetricGroupRep, MetricInMetricGroupInput, MetricInput, MetricRep, Metrics, MetricsByVariation, MetricsInput, MigrationSafetyIssueRep, MigrationSettingsPost, ModelConfig, MultiEnvironmentDependentFlags, NamingConvention, NewMemberFormListPost, ObjectId, PatchSegmentExpiringTargetInstruction, PatchSegmentInstruction, PermissionGrantInput, PhaseStatus, ProgressiveReleaseConfig, Project, ProjectRep, Projects, PromptSnippet, PromptSnippets, PullRequestCollectionRep, QuickStats, RandomizationSettingsRep, RandomizationUnitInput, RateLimitedErrorRep, ReferenceRep, RelayAutoConfigCollectionRep, RelayAutoConfigRep, Release, ReleaseMethod, ReleasePipeline, ReleasePipelineCollection, ReleasePoliciesResponse, ReleasePolicy, ReleasePolicyScope, ReleaseProgressionCollection, ReleaserAudienceConfigInput, RepositoryCollectionRep, RepositoryRep, ResourceCategory, RestrictedModelsResponse, RoleAttributeMap, RoleType, RootResponse, SdkListRep, SdkVersionDetailsRep, SdkVersionListRep, SegmentUserList, SeriesListRep, SeriesListRepFloat, SnippetReferences, SourceEnv, SourceFlag, StageInput, Statement, StatementPost, StatementPostList, StatisticCollectionRep, StatisticsRoot, TagsCollection, Team, TeamCustomRoles, TeamImportsRep, TeamMaintainers, Teams, Token, Tokens, ToolReferences, TreatmentsInput, TriggerWorkflowCollectionRep, TriggerWorkflowRep, UnauthorizedErrorRep, UnixMillis, UnlinkResourceSuccessResponse, UpsertPayloadRep, UpsertResponseRep, UrlPost, UserAttributeNamesRep, UserFlagSetting, UserFlagSettings, UserRecord, UserSegment, UserSegments, Users, UsersRep, ValidationFailedErrorRep, Variation, VariationToolPost, VersionsRep, View, ViewLinkRequest, ViewLinkedResources, Views, WarehouseDestinationSetupScriptRep, Webhook, Webhooks, WorkflowTemplateOutput, WorkflowTemplatesListingOutputRep } from "./schemas.js";

export type LaunchdarklyClient = {
  /**
   * Root resource
   */
  getRoot: () => Promise<RootResponse>;

  /**
   * List Relay Proxy configs
   */
  getRelayProxyConfigs: () => Promise<RelayAutoConfigCollectionRep>;

  /**
   * Create a new Relay Proxy config
   */
  postRelayAutoConfig: (input: {
    /** A human-friendly name for the Relay Proxy configuration */
    name: string;
    /** A description of what environments and projects the Relay Proxy should include or exclude. To learn more, read [Write an inline policy](https://launchdarkly.com/docs/sdk/relay-proxy/automatic-configuration#write-an-inline-policy). */
    policy: (Statement)[];
  }) => Promise<RelayAutoConfigRep>;

  /**
   * Get Relay Proxy config
   */
  getRelayProxyConfig: (input: {
    /** The relay auto config id */
    id: string;
  }) => Promise<RelayAutoConfigRep>;

  /**
   * Update a Relay Proxy config
   */
  patchRelayAutoConfig: (input: {
    /** A JSON patch representation of the change to make */
    patch: JsonPatch;
    /** Optional comment */
    comment?: string;
    /** The relay auto config id */
    id: string;
  }) => Promise<RelayAutoConfigRep>;

  /**
   * Delete Relay Proxy config by ID
   */
  deleteRelayAutoConfig: (input: {
    /** The relay auto config id */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Reset Relay Proxy configuration key
   */
  resetRelayAutoConfig: (input: {
    /** The Relay Proxy configuration ID */
    id: string;
    /** An expiration time for the old Relay Proxy configuration key, expressed as a Unix epoch time in milliseconds. By default, the Relay Proxy configuration will expire immediately. */
    expiry?: number;
  }) => Promise<RelayAutoConfigRep>;

  /**
   * Get applications
   */
  getApplications: (input: {
    /** Accepts filter by `key`, `name`, `kind`, and `autoAdded`. To learn more about the filter syntax, read [Filtering applications and application versions](https://launchdarkly.com/docs/api/applications-beta#filtering-applications-and-application-versions). */
    filter?: string;
    /** The number of applications to return. Defaults to 10. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** Accepts sorting order and fields. Fields can be comma separated. Possible fields are `creationDate`, `name`. Examples: `sort=name` sort by names ascending, `sort=-name,creationDate` sort by names descending and creationDate ascending. */
    sort?: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Options: `flags`. */
    expand?: string;
  }) => Promise<ApplicationCollectionRep>;

  /**
   * Get application by key
   */
  getApplication: (input: {
    /** The application key */
    applicationKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Options: `flags`. */
    expand?: string;
  }) => Promise<ApplicationRep>;

  /**
   * Update application
   */
  patchApplication: (input: {
    body: JsonPatch;
    /** The application key */
    applicationKey: string;
  }) => Promise<ApplicationRep>;

  /**
   * Delete application
   */
  deleteApplication: (input: {
    /** The application key */
    applicationKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Get application versions by application key
   */
  getApplicationVersions: (input: {
    /** The application key */
    applicationKey: string;
    /** Accepts filter by `key`, `name`, `supported`, and `autoAdded`. To learn more about the filter syntax, read [Filtering applications and application versions](https://launchdarkly.com/docs/api/applications-beta#filtering-applications-and-application-versions). */
    filter?: string;
    /** The number of versions to return. Defaults to 50. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** Accepts sorting order and fields. Fields can be comma separated. Possible fields are `creationDate`, `name`. Examples: `sort=name` sort by names ascending, `sort=-name,creationDate` sort by names descending and creationDate ascending. */
    sort?: string;
  }) => Promise<ApplicationVersionsCollectionRep>;

  /**
   * Update application version
   */
  patchApplicationVersion: (input: {
    body: JsonPatch;
    /** The application key */
    applicationKey: string;
    /** The application version key */
    versionKey: string;
  }) => Promise<ApplicationVersionRep>;

  /**
   * Delete application version
   */
  deleteApplicationVersion: (input: {
    /** The application key */
    applicationKey: string;
    /** The application version key */
    versionKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List approval requests
   */
  getApprovalRequests: (input: {
    /** A comma-separated list of filters. Each filter is of the form `field operator value`. Supported fields are explained above. */
    filter?: string;
    /** A comma-separated list of fields to expand in the response. Supported fields are explained above. */
    expand?: string;
    /** The number of approvals to return. Defaults to 20. Maximum limit is 200. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<ExpandableApprovalRequestsResponse>;

  /**
   * Create approval request
   */
  postApprovalRequest: (input: {
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
  }) => Promise<ApprovalRequestResponse>;

  /**
   * Get approval request
   */
  getApprovalRequest: (input: {
    /** The approval request ID */
    id: string;
    /** A comma-separated list of fields to expand in the response. Supported fields are explained above. */
    expand?: string;
  }) => Promise<ExpandableApprovalRequestResponse>;

  /**
   * Update approval request
   */
  patchApprovalRequest: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating */
    instructions: Instructions;
    /** The approval ID */
    id: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Delete approval request
   */
  deleteApprovalRequest: (input: {
    /** The approval request ID */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Apply approval request
   */
  postApprovalRequestApply: (input: {
    /** Optional comment about the approval request */
    comment?: string;
    /** The approval request ID */
    id: string;
  }) => Promise<ApprovalRequestResponse>;

  /**
   * Review approval request
   */
  postApprovalRequestReview: (input: {
    /** The type of review for this approval request */
    kind?: "approve" | "comment" | "decline";
    /** Optional comment about the approval request */
    comment?: string;
    /** The approval request ID */
    id: string;
  }) => Promise<ApprovalRequestResponse>;

  /**
   * List audit log entries
   */
  getAuditLogEntries: (input: {
    /** A timestamp filter, expressed as a Unix epoch time in milliseconds.  All entries this returns occurred before the timestamp. */
    before?: number;
    /** A timestamp filter, expressed as a Unix epoch time in milliseconds. All entries this returns occurred after the timestamp. */
    after?: number;
    /** Text to search for. You can search for the full or partial name of the resource. */
    q?: string;
    /** A limit on the number of audit log entries that return. Set between 1 and 20. The default is 10. */
    limit?: number;
    /** A resource specifier that lets you filter audit log listings by resource */
    spec?: string;
  }) => Promise<AuditLogEntryListingRepCollection>;

  /**
   * Search audit log entries
   */
  postAuditLogEntries: (input: {
    body?: StatementPostList;
    /** A timestamp filter, expressed as a Unix epoch time in milliseconds.  All entries returned occurred before the timestamp. */
    before?: number;
    /** A timestamp filter, expressed as a Unix epoch time in milliseconds. All entries returned occurred after the timestamp. */
    after?: number;
    /** Text to search for. You can search for the full or partial name of the resource. */
    q?: string;
    /** A limit on the number of audit log entries that return. Set between 1 and 20. The default is 10. */
    limit?: number;
  }) => Promise<AuditLogEntryListingRepCollection>;

  /**
   * Get audit log entry counts
   */
  postAuditLogEntryCounts: (input: {
    body: StatementPostList;
    /** A timestamp filter, expressed as a Unix epoch time in milliseconds. Defaults to now. */
    before?: number;
    /** A timestamp filter, expressed as a Unix epoch time in milliseconds. Required. */
    after: number;
    /** Number of time buckets to divide the range into. Default 50, max 500. */
    buckets?: number;
  }) => Promise<CountBucketsResult>;

  /**
   * Get audit log entry
   */
  getAuditLogEntry: (input: {
    /** The ID of the audit log entry */
    id: string;
  }) => Promise<AuditLogEntryRep>;

  /**
   * Identify the caller
   */
  getCallerIdentity: () => Promise<CallerIdentityRep>;

  /**
   * List extinctions
   */
  getExtinctions: (input: {
    /** Filter results to a specific repository */
    repoName?: string;
    /** Filter results to a specific branch. By default, only the default branch will be queried for extinctions. */
    branchName?: string;
    /** Filter results to a specific project */
    projKey?: string;
    /** Filter results to a specific flag key */
    flagKey?: string;
    /** Filter results to a specific timeframe based on commit time, expressed as a Unix epoch time in milliseconds. Must be used with `to`. */
    from?: number;
    /** Filter results to a specific timeframe based on commit time, expressed as a Unix epoch time in milliseconds. Must be used with `from`. */
    to?: number;
  }) => Promise<ExtinctionCollectionRep>;

  /**
   * List repositories
   */
  getRepositories: (input: {
    /** If set to any value, the endpoint returns repositories with associated branch data */
    withBranches?: string;
    /** If set to any value, the endpoint returns repositories with associated branch data, as well as code references for the default git branch */
    withReferencesForDefaultBranch?: string;
    /** A LaunchDarkly project key. If provided, this filters code reference results to the specified project. */
    projKey?: string;
    /** If set to any value, the endpoint returns repositories with associated branch data, as well as code references for the default git branch */
    flagKey?: string;
  }) => Promise<RepositoryCollectionRep>;

  /**
   * Create repository
   */
  postRepository: (input: {
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
  }) => Promise<RepositoryRep>;

  /**
   * Get repository
   */
  getRepository: (input: {
    /** The repository name */
    repo: string;
  }) => Promise<RepositoryRep>;

  /**
   * Update repository
   */
  patchRepository: (input: {
    body: JsonPatch;
    /** The repository name */
    repo: string;
  }) => Promise<RepositoryRep>;

  /**
   * Delete repository
   */
  deleteRepository: (input: {
    /** The repository name */
    repo: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Delete branches
   */
  deleteBranches: (input: {
    body: (string)[];
    /** The repository name to delete branches for. */
    repo: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * List branches
   */
  getBranches: (input: {
    /** The repository name */
    repo: string;
  }) => Promise<BranchCollectionRep>;

  /**
   * Get branch
   */
  getBranch: (input: {
    /** The repository name */
    repo: string;
    /** The url-encoded branch name */
    branch: string;
    /** Filter results to a specific project */
    projKey?: string;
    /** Filter results to a specific flag key */
    flagKey?: string;
  }) => Promise<BranchRep>;

  /**
   * Upsert branch
   */
  putBranch: (input: {
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
    /** The repository name */
    repo: string;
    /** The URL-encoded branch name */
    branch: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Create extinction
   */
  postExtinction: (input: {
    body: ExtinctionListPost;
    /** The repository name */
    repo: string;
    /** The URL-encoded branch name */
    branch: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get links to code reference repositories for each project
   */
  getRootStatistic: () => Promise<StatisticsRoot>;

  /**
   * Get code references statistics for flags
   */
  getStatistics: (input: {
    /** The project key */
    projectKey: string;
    /** Filter results to a specific flag key */
    flagKey?: string;
  }) => Promise<StatisticCollectionRep>;

  /**
   * List destinations
   */
  getDestinations: () => Promise<Destinations>;

  /**
   * Generate Snowflake destination key pair
   */
  postGenerateWarehouseDestinationKeyPair: () => Promise<GenerateWarehouseDestinationKeyPairPostRep>;

  /**
   * Generate trust policy
   */
  postGenerateTrustPolicy: (input: {
    /** The project key */
    projKey: string;
    /** The environment key */
    envKey: string;
  }) => Promise<GenerateTrustPolicyPostRep>;

  /**
   * Generate Snowflake destination key pair
   */
  postGenerateProjectEnvWarehouseDestinationKeyPair: (input: {
    /** The project key */
    projKey: string;
    /** The environment key */
    envKey: string;
  }) => Promise<GenerateWarehouseDestinationKeyPairPostRep>;

  /**
   * Complete warehouse destination setup
   */
  postCompleteWarehouseDestinationSetup: (input: {
    publicKey?: string;
    /** The project key */
    projKey: string;
    /** The environment key */
    envKey: string;
    /** The destination kind (snowflake-v2) */
    kind: string;
  }) => Promise<Destination>;

  /**
   * Generate warehouse destination setup script
   */
  postGenerateWarehouseDestinationSetupScript: (input: {
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
    /** The project key */
    projKey: string;
    /** The environment key */
    envKey: string;
    /** The destination kind (snowflake-v2, redshift) */
    kind: string;
  }) => Promise<WarehouseDestinationSetupScriptRep>;

  /**
   * Create Data Export destination
   */
  postDestination: (input: {
    /** A human-readable name for your Data Export destination */
    name?: string;
    /** The type of Data Export destination */
    kind?: "google-pubsub" | "kinesis" | "mparticle" | "segment" | "azure-event-hubs" | "snowflake-v2" | "databricks" | "bigquery" | "redshift";
    /** An object with the configuration parameters required for the destination type */
    config?: unknown;
    /** Whether the export is on. Displayed as the integration status in the LaunchDarkly UI. */
    on?: boolean;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<Destination>;

  /**
   * Get destination
   */
  getDestination: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The Data Export destination ID */
    id: string;
  }) => Promise<Destination>;

  /**
   * Update Data Export destination
   */
  patchDestination: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The Data Export destination ID */
    id: string;
  }) => Promise<Destination>;

  /**
   * Delete Data Export destination
   */
  deleteDestination: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The Data Export destination ID */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List flag links
   */
  getFlagLinks: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<FlagLinkCollectionRep>;

  /**
   * Create flag link
   */
  createFlagLink: (input: {
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
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<FlagLinkRep>;

  /**
   * Update flag link
   */
  updateFlagLink: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The flag link ID */
    id: string;
  }) => Promise<FlagLinkRep>;

  /**
   * Delete flag link
   */
  deleteFlagLink: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The flag link ID or Key */
    id: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get flag status across environments
   */
  getFeatureFlagStatusAcrossEnvironments: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** Optional environment filter */
    env?: string;
  }) => Promise<FeatureFlagStatusAcrossEnvironments>;

  /**
   * List feature flag statuses
   */
  getFeatureFlagStatuses: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<FeatureFlagStatuses>;

  /**
   * Get feature flag status
   */
  getFeatureFlagStatus: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<FlagStatusRep>;

  /**
   * List feature flags
   */
  getFeatureFlags: (input: {
    /** The project key */
    projectKey: string;
    /** Filter configurations by environment */
    env?: string;
    /** Filter feature flags by tag */
    tag?: string;
    /** The number of feature flags to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** Deprecated, use `filter=archived:true` instead. A boolean to filter the list to archived flags. When this is absent, only unarchived flags will be returned */
    archived?: boolean;
    /** By default, flags do _not_ include their lists of prerequisites, targets, or rules for each environment. Set `summary=0` and include the `env` query parameter to include these fields for each flag returned. */
    summary?: boolean;
    /** A comma-separated list of filters. Each filter is of the form field:value. Read the endpoint description for a full list of available filter fields. */
    filter?: string;
    /** A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. Read the endpoint description for a full list of available sort fields. */
    sort?: string;
    /** Deprecated, unavailable in API version `20240415`. A boolean to filter results by only flags that have differences between environments. */
    compare?: boolean;
    /** A comma-separated list of fields to expand in the response. Supported fields are explained above. */
    expand?: string;
  }) => Promise<FeatureFlags>;

  /**
   * Create a feature flag
   */
  postFeatureFlag: (input: {
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
    /** The project key */
    projectKey: string;
    /** The key of the feature flag to be cloned. The key identifies the flag in your code. For example, setting `clone=flagKey` copies the full targeting configuration for all environments, including `on/off` state, from the original flag to the new flag. */
    clone?: string;
  }) => Promise<FeatureFlag>;

  /**
   * List dependent feature flags by environment
   */
  getDependentFlagsByEnv: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<DependentFlagsByEnvironment>;

  /**
   * Get feature flag
   */
  getFeatureFlag: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** Filter configurations by environment */
    env?: string;
    /** A comma-separated list of fields to expand in the response. Supported fields are explained above. */
    expand?: string;
  }) => Promise<FeatureFlag>;

  /**
   * Update feature flag
   */
  patchFeatureFlag: (input: {
    /** A JSON patch representation of the change to make */
    patch: JsonPatch;
    /** Optional comment */
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The feature flag key. The key identifies the flag in your code. */
    featureFlagKey: string;
    /** If true, the patch will be applied even if it causes a pending scheduled change or approval request to fail. */
    ignoreConflicts?: boolean;
    /** If true, the patch will be validated but not persisted. Returns a preview of the flag after the patch is applied. */
    dryRun?: boolean;
  }) => Promise<FeatureFlag>;

  /**
   * Delete feature flag
   */
  deleteFeatureFlag: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key. The key identifies the flag in your code. */
    featureFlagKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Copy feature flag
   */
  copyFeatureFlag: (input: {
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
    /** The project key */
    projectKey: string;
    /** The feature flag key. The key identifies the flag in your code. */
    featureFlagKey: string;
  }) => Promise<FeatureFlag>;

  /**
   * List dependent feature flags
   */
  getDependentFlags: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<MultiEnvironmentDependentFlags>;

  /**
   * Get expiring context targets for feature flag
   */
  getExpiringContextTargets: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<ExpiringTargetGetResponse>;

  /**
   * Update expiring context targets on feature flag
   */
  patchExpiringTargets: (input: {
    /** Optional comment describing the change */
    comment?: string;
    /** The instructions to perform when updating */
    instructions: (Instruction)[];
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<ExpiringTargetPatchResponse>;

  /**
   * Get expiring user targets for feature flag
   */
  getExpiringUserTargets: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<ExpiringUserTargetGetResponse>;

  /**
   * Update expiring user targets on feature flag
   */
  patchExpiringUserTargets: (input: {
    /** Optional comment describing the change */
    comment?: string;
    /** The instructions to perform when updating */
    instructions: (Instruction)[];
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<ExpiringUserTargetPatchResponse>;

  /**
   * List flag triggers
   */
  getTriggerWorkflows: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<TriggerWorkflowCollectionRep>;

  /**
   * Create flag trigger
   */
  createTriggerWorkflow: (input: {
    /** Optional comment describing the trigger */
    comment?: string;
    /** The action to perform when triggering. This should be an array with a single object that looks like <code>{"kind": "flag_action"}</code>. Supported flag actions are <code>turnFlagOn</code> and <code>turnFlagOff</code>. */
    instructions?: (Instruction)[];
    /** The unique identifier of the integration for your trigger. Use <code>generic-trigger</code> for integrations not explicitly supported. */
    integrationKey: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<TriggerWorkflowRep>;

  /**
   * Get flag trigger by ID
   */
  getTriggerWorkflowById: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The flag trigger ID */
    id: string;
  }) => Promise<TriggerWorkflowRep>;

  /**
   * Update flag trigger
   */
  patchTriggerWorkflow: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "trigger_action"}</code>. */
    instructions?: (Instruction)[];
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The flag trigger ID */
    id: string;
  }) => Promise<TriggerWorkflowRep>;

  /**
   * Delete flag trigger
   */
  deleteTriggerWorkflow: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The flag trigger ID */
    id: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get release for flag
   */
  getReleaseByFlagKey: (input: {
    /** The project key */
    projectKey: string;
    /** The flag key */
    flagKey: string;
  }) => Promise<Release>;

  /**
   * Patch release for flag
   */
  patchReleaseByFlagKey: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The flag key */
    flagKey: string;
  }) => Promise<Release>;

  /**
   * Delete a release for flag
   */
  deleteReleaseByFlagKey: (input: {
    /** The project key */
    projectKey: string;
    /** The flag key */
    flagKey: string;
  }) => Promise<ForbiddenErrorRep>;

  /**
   * List all big segment store integrations
   */
  getBigSegmentStoreIntegrations: () => Promise<BigSegmentStoreIntegrationCollection>;

  /**
   * Create big segment store integration
   */
  createBigSegmentStoreIntegration: (input: {
    /** Whether the integration configuration is active. Default value is false. */
    on?: boolean;
    /** The global integration settings, as specified by the <code>formVariables</code> in the <code>manifest.json</code> for this integration. */
    config: FormVariableConfig;
    /** Tags to associate with the integration */
    tags?: (string)[];
    /** Name to identify the integration */
    name?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key, either `redis` or `dynamodb` */
    integrationKey: string;
  }) => Promise<BigSegmentStoreIntegration>;

  /**
   * Get big segment store integration by ID
   */
  getBigSegmentStoreIntegration: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key, either `redis` or `dynamodb` */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<BigSegmentStoreIntegration>;

  /**
   * Update big segment store integration
   */
  patchBigSegmentStoreIntegration: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key, either `redis` or `dynamodb` */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<BigSegmentStoreIntegration>;

  /**
   * Delete big segment store integration
   */
  deleteBigSegmentStoreIntegration: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key, either `redis` or `dynamodb` */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List all delivery configurations
   */
  getIntegrationDeliveryConfigurations: () => Promise<IntegrationDeliveryConfigurationCollection>;

  /**
   * Get delivery configurations by environment
   */
  getIntegrationDeliveryConfigurationByEnvironment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<IntegrationDeliveryConfigurationCollection>;

  /**
   * Create delivery configuration
   */
  createIntegrationDeliveryConfiguration: (input: {
    /** Whether the integration configuration is active. Default value is false. */
    on?: boolean;
    /** The global integration settings, as specified by the <code>formVariables</code> in the <code>manifest.json</code> for this integration. */
    config: FormVariableConfig;
    /** Tags to associate with the integration */
    tags?: (string)[];
    /** Name to identify the integration */
    name?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key */
    integrationKey: string;
  }) => Promise<IntegrationDeliveryConfiguration>;

  /**
   * Get delivery configuration by ID
   */
  getIntegrationDeliveryConfigurationById: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key */
    integrationKey: string;
    /** The configuration ID */
    id: string;
  }) => Promise<IntegrationDeliveryConfiguration>;

  /**
   * Update delivery configuration
   */
  patchIntegrationDeliveryConfiguration: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key */
    integrationKey: string;
    /** The configuration ID */
    id: string;
  }) => Promise<IntegrationDeliveryConfiguration>;

  /**
   * Delete delivery configuration
   */
  deleteIntegrationDeliveryConfiguration: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key */
    integrationKey: string;
    /** The configuration ID */
    id: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Validate delivery configuration
   */
  validateIntegrationDeliveryConfiguration: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The integration key */
    integrationKey: string;
    /** The configuration ID */
    id: string;
  }) => Promise<IntegrationDeliveryConfigurationResponse>;

  /**
   * List all flag import configurations
   */
  getFlagImportConfigurations: () => Promise<FlagImportIntegrationCollection>;

  /**
   * Create a flag import configuration
   */
  createFlagImportConfiguration: (input: {
    /** The global configuration settings, as specified by the <code>formVariables</code> in the <code>manifest.json</code> for this configuration. */
    config: FormVariableConfig;
    /** Tags to associate with the configuration */
    tags?: (string)[];
    /** Name to identify the configuration */
    name?: string;
    /** The project key */
    projectKey: string;
    /** The integration key */
    integrationKey: string;
  }) => Promise<FlagImportIntegration>;

  /**
   * Get a single flag import configuration
   */
  getFlagImportConfiguration: (input: {
    /** The project key */
    projectKey: string;
    /** The integration key, for example, `split` */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<FlagImportIntegration>;

  /**
   * Update a flag import configuration
   */
  patchFlagImportConfiguration: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The integration key */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<FlagImportIntegration>;

  /**
   * Delete a flag import configuration
   */
  deleteFlagImportConfiguration: (input: {
    /** The project key */
    projectKey: string;
    /** The integration key */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Trigger a single flag import run
   */
  triggerFlagImportJob: (input: {
    /** The project key */
    projectKey: string;
    /** The integration key */
    integrationKey: string;
    /** The integration ID */
    integrationId: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get all configurations for the integration
   */
  getAllIntegrationConfigurations: (input: {
    /** Integration key */
    integrationKey: string;
  }) => Promise<IntegrationConfigurationCollectionRep>;

  /**
   * Create integration configuration
   */
  createIntegrationConfiguration: (input: {
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
    /** The integration key */
    integrationKey: string;
  }) => Promise<IntegrationConfigurationsRep>;

  /**
   * Get an integration configuration
   */
  getIntegrationConfiguration: (input: {
    /** Integration configuration ID */
    integrationConfigurationId: string;
  }) => Promise<IntegrationConfigurationsRep>;

  /**
   * Update integration configuration
   */
  updateIntegrationConfiguration: (input: {
    body: JsonPatch;
    /** The ID of the integration configuration */
    integrationConfigurationId: string;
  }) => Promise<IntegrationConfigurationsRep>;

  /**
   * Delete integration configuration
   */
  deleteIntegrationConfiguration: (input: {
    /** The ID of the integration configuration to be deleted */
    integrationConfigurationId: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get audit log subscriptions by integration
   */
  getSubscriptions: (input: {
    /** The integration key */
    integrationKey: string;
  }) => Promise<Integrations>;

  /**
   * Create audit log subscription
   */
  createSubscription: (input: {
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
    /** The integration key */
    integrationKey: string;
  }) => Promise<Integration>;

  /**
   * Get audit log subscription by ID
   */
  getSubscriptionById: (input: {
    /** The integration key */
    integrationKey: string;
    /** The subscription ID */
    id: string;
  }) => Promise<Integration>;

  /**
   * Update audit log subscription
   */
  updateSubscription: (input: {
    body: JsonPatch;
    /** The integration key */
    integrationKey: string;
    /** The ID of the audit log subscription */
    id: string;
  }) => Promise<Integration>;

  /**
   * Delete audit log subscription
   */
  deleteSubscription: (input: {
    /** The integration key */
    integrationKey: string;
    /** The subscription ID */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List account members
   */
  getMembers: (input: {
    /** The number of members to return in the response. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above. */
    filter?: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
    /** A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. */
    sort?: string;
  }) => Promise<Members>;

  /**
   * Invite new members
   */
  postMembers: (input: {
    body: NewMemberFormListPost;
  }) => Promise<Members>;

  /**
   * Modify account members
   */
  patchMembers: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require additional parameters as part of this object. */
    instructions: Instructions;
  }) => Promise<BulkEditMembersRep>;

  /**
   * Get account member
   */
  getMember: (input: {
    /** The member ID */
    id: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
  }) => Promise<Member>;

  /**
   * Modify an account member
   */
  patchMember: (input: {
    body: JsonPatch;
    /** The member ID */
    id: string;
  }) => Promise<Member>;

  /**
   * Delete account member
   */
  deleteMember: (input: {
    /** The member ID */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Add a member to teams
   */
  postMemberTeams: (input: {
    /** List of team keys */
    teamKeys: (string)[];
    /** The member ID */
    id: string;
  }) => Promise<Member>;

  /**
   * List metrics
   */
  getMetrics: (input: {
    /** The project key */
    projectKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
    /** The number of metrics to return in the response. Defaults to 20. Maximum limit is 50. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items. */
    offset?: number;
    /** A field to sort the items by. Prefix field by a dash ( - ) to sort in descending order. This endpoint supports sorting by `createdAt` or `name`. */
    sort?: string;
    /** A comma-separated list of filters. This endpoint accepts filtering by `query`, `tags`, `eventKind`, `isNumeric`, `unitAggregationType`, `hasConnections`, `maintainerIds`, `maintainerTeamKey`, `view`, `dataSourceKeys`, `metricUsedIn`, `eventKeys`, and `versionIds`. To learn more about the filter syntax, read the 'Filtering metrics' section above. */
    filter?: string;
  }) => Promise<MetricCollectionRep>;

  /**
   * Create metric
   */
  postMetric: (input: {
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
    /** The project key */
    projectKey: string;
  }) => Promise<MetricRep>;

  /**
   * Get metric
   */
  getMetric: (input: {
    /** The project key */
    projectKey: string;
    /** The metric key */
    metricKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are `experiments`, `experimentCount`, `metricGroups`, `metricGroupCount`, `eventSources`, `guardedRollouts`, `guardedRolloutCount`, `lastUsedInExperiment`, and `lastUsedInGuardedRollout`. */
    expand?: string;
    /** The specific version ID of the metric */
    versionId?: string;
  }) => Promise<MetricRep>;

  /**
   * Update metric
   */
  patchMetric: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The metric key */
    metricKey: string;
  }) => Promise<MetricRep>;

  /**
   * Delete metric
   */
  deleteMetric: (input: {
    /** The project key */
    projectKey: string;
    /** The metric key */
    metricKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Get clients
   */
  getOAuthClients: () => Promise<ClientCollection>;

  /**
   * Create a LaunchDarkly OAuth 2.0 client
   */
  createOAuth2Client: (input: {
    /** The name of your new LaunchDarkly OAuth 2.0 client. */
    name?: string;
    /** The redirect URI for your new OAuth 2.0 application. This should be an absolute URL conforming with the standard HTTPS protocol. */
    redirectUri?: string;
    /** Description of your OAuth 2.0 client. */
    description?: string;
  }) => Promise<Client>;

  /**
   * Get client by ID
   */
  getOAuthClientById: (input: {
    /** The client ID */
    clientId: string;
  }) => Promise<Client>;

  /**
   * Patch client by ID
   */
  patchOAuthClient: (input: {
    body: JsonPatch;
    /** The client ID */
    clientId: string;
  }) => Promise<Client>;

  /**
   * Delete OAuth 2.0 client
   */
  deleteOAuthClient: (input: {
    /** The client ID */
    clientId: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Gets the OpenAPI spec in json
   */
  getOpenapiSpec: () => Promise<RateLimitedErrorRep>;

  /**
   * List projects
   */
  getProjects: (input: {
    /** The number of projects to return in the response. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items. */
    offset?: number;
    /** A comma-separated list of filters. Each filter is constructed as `field:value`. */
    filter?: string;
    /** A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. */
    sort?: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
  }) => Promise<Projects>;

  /**
   * Create project
   */
  postProject: (input: {
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
  }) => Promise<ProjectRep>;

  /**
   * Get project
   */
  getProject: (input: {
    /** The project key. */
    projectKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
  }) => Promise<Project>;

  /**
   * Update project
   */
  patchProject: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
  }) => Promise<ProjectRep>;

  /**
   * Delete project
   */
  deleteProject: (input: {
    /** The project key */
    projectKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get context kinds
   */
  getContextKindsByProjectKey: (input: {
    /** The project key */
    projectKey: string;
  }) => Promise<ContextKindsCollectionRep>;

  /**
   * Create or update context kind
   */
  putContextKind: (input: {
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
    /** The project key */
    projectKey: string;
    /** The context kind key */
    key: string;
  }) => Promise<UpsertResponseRep>;

  /**
   * List environments
   */
  getEnvironmentsByProject: (input: {
    /** The project key */
    projectKey: string;
    /** The number of environments to return in the response. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A comma-separated list of filters. Each filter is of the form `field:value`. */
    filter?: string;
    /** A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. */
    sort?: string;
  }) => Promise<Environments>;

  /**
   * Create environment
   */
  postEnvironment: (input: {
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
    /** The project key */
    projectKey: string;
  }) => Promise<Environment>;

  /**
   * Get environment
   */
  getEnvironment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<Environment>;

  /**
   * Update environment
   */
  patchEnvironment: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<Environment>;

  /**
   * Delete environment
   */
  deleteEnvironment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Reset environment SDK key
   */
  resetEnvironmentSdkKey: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The time at which you want the old SDK key to expire, in UNIX milliseconds. By default, the key expires immediately. During the period between this call and the time when the old SDK key expires, both the old SDK key and the new SDK key will work. */
    expiry?: number;
  }) => Promise<Environment>;

  /**
   * Get context attribute names
   */
  getContextAttributeNames: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** A comma-separated list of context filters. This endpoint only accepts `kind` filters, with the `equals` operator, and `name` filters, with the `startsWith` operator. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances). */
    filter?: string;
    /** Specifies the maximum number of items in the collection to return (max: 100, default: 100) */
    limit?: number;
  }) => Promise<ContextAttributeNamesCollection>;

  /**
   * Get context attribute values
   */
  getContextAttributeValues: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The attribute name */
    attributeName: string;
    /** A comma-separated list of context filters. This endpoint only accepts `kind` filters, with the `equals` operator, and `value` filters, with the `startsWith` operator. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances). */
    filter?: string;
    /** Specifies the maximum number of items in the collection to return (max: 100, default: 50) */
    limit?: number;
  }) => Promise<ContextAttributeValuesCollection>;

  /**
   * Search for context instances
   */
  searchContextInstances: (input: {
    /** A collection of context instance filters */
    filter?: string;
    /** Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying <code>ts</code> for this value, or descending order by specifying <code>-ts</code>. */
    sort?: string;
    /** Specifies the maximum number of items in the collection to return (max: 50, default: 20) */
    limit?: number;
    /** Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the <code>next</code> link instead, because this value is an obfuscated string. */
    continuationToken?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Specifies whether to include or omit the total count of matching context instances. Defaults to true. */
    includeTotalCount?: boolean;
  }, options?: { query?: { limit?: number; continuationToken?: string; sort?: string; filter?: string } }) => Promise<ContextInstances>;

  /**
   * Get context instances
   */
  getContextInstances: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The context instance ID */
    id: string;
    /** Specifies the maximum number of context instances to return (max: 50, default: 20) */
    limit?: number;
    /** Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead. */
    continuationToken?: string;
    /** Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`. */
    sort?: string;
    /** A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances). */
    filter?: string;
    /** Specifies whether to include or omit the total count of matching context instances. Defaults to true. */
    includeTotalCount?: boolean;
  }) => Promise<ContextInstances>;

  /**
   * Delete context instances
   */
  deleteContextInstances: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The context instance ID */
    id: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Search for contexts
   */
  searchContexts: (input: {
    /** A collection of context filters */
    filter?: string;
    /** Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying <code>ts</code> for this value, or descending order by specifying <code>-ts</code>. */
    sort?: string;
    /** Specifies the maximum number of items in the collection to return (max: 50, default: 20) */
    limit?: number;
    /** Limits results to contexts with sort values after the value specified. You can use this for pagination, however, we recommend using the <code>next</code> link instead, because this value is an obfuscated string. */
    continuationToken?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Specifies whether to include or omit the total count of matching contexts. Defaults to true. */
    includeTotalCount?: boolean;
  }, options?: { query?: { limit?: number; continuationToken?: string; sort?: string; filter?: string } }) => Promise<Contexts>;

  /**
   * Update flag settings for context
   */
  putContextFlagSetting: (input: {
    /** The variation value to set for the context. Must match the flag's variation type. */
    setting?: unknown;
    /** Optional comment describing the change */
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The context kind */
    contextKind: string;
    /** The context key */
    contextKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get contexts
   */
  getContexts: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The context kind */
    kind: string;
    /** The context key */
    key: string;
    /** Specifies the maximum number of items in the collection to return (max: 50, default: 20) */
    limit?: number;
    /** Limits results to contexts with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead. */
    continuationToken?: string;
    /** Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`. */
    sort?: string;
    /** A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances). */
    filter?: string;
    /** Specifies whether to include or omit the total count of matching contexts. Defaults to true. */
    includeTotalCount?: boolean;
  }) => Promise<Contexts>;

  /**
   * Get experiments
   */
  getExperiments: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The maximum number of experiments to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above. */
    filter?: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. */
    expand?: string;
    /** A comma-separated list of experiment archived states. Supports `archived`, `active`, or both. Defaults to `active` experiments. */
    lifecycleState?: string;
  }) => Promise<ExperimentCollectionRep>;

  /**
   * Create experiment
   */
  createExperiment: (input: {
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
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<Experiment>;

  /**
   * Get experiment
   */
  getExperiment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The experiment key */
    experimentKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. */
    expand?: string;
  }) => Promise<Experiment>;

  /**
   * Patch experiment
   */
  patchExperiment: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
    instructions: Instructions;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The experiment key */
    experimentKey: string;
  }) => Promise<Experiment>;

  /**
   * Create iteration
   */
  createIteration: (input: {
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
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The experiment key */
    experimentKey: string;
  }) => Promise<IterationRep>;

  /**
   * Evaluate flags for context instance
   */
  evaluateContextInstance: (input: {
    body: ContextInstance;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The number of feature flags to return. Defaults to -1, which returns all flags */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order */
    sort?: string;
    /** A comma-separated list of filters. Each filter is of the form `field operator value`. Supported fields are explained above. */
    filter?: string;
  }) => Promise<ContextInstanceEvaluations>;

  /**
   * Get followers of all flags in a given project and environment
   */
  getFollowersByProjEnv: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<FlagFollowersByProjEnvGetRep>;

  /**
   * Get all holdouts
   */
  getAllHoldouts: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The number of holdouts to return in the response. Defaults to 20 */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an `offset` of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<HoldoutsCollectionRep>;

  /**
   * Create holdout
   */
  postHoldout: (input: {
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
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<HoldoutRep>;

  /**
   * Get Holdout by Id
   */
  getHoldoutById: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The holdout experiment ID */
    holdoutId: string;
  }) => Promise<HoldoutRep>;

  /**
   * Get holdout
   */
  getHoldout: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The holdout experiment key */
    holdoutKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. Holdout experiment expansion fields have no prefix. Related experiment expansion fields have `rel-` as a prefix. */
    expand?: string;
  }) => Promise<HoldoutDetailRep>;

  /**
   * Patch holdout
   */
  patchHoldout: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
    instructions: Instructions;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The holdout key */
    holdoutKey: string;
  }) => Promise<HoldoutRep>;

  /**
   * Reset environment mobile SDK key
   */
  resetEnvironmentMobileKey: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<Environment>;

  /**
   * List segment memberships for context instance
   */
  getContextInstanceSegmentsMembershipByEnv: (input: {
    body: ContextInstance;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<ContextInstanceSegmentMemberships>;

  /**
   * Get experimentation settings
   */
  getExperimentationSettings: (input: {
    /** The project key */
    projectKey: string;
  }) => Promise<RandomizationSettingsRep>;

  /**
   * Update experimentation settings
   */
  putExperimentationSettings: (input: {
    /** An array of randomization units allowed for this project. */
    randomizationUnits: (RandomizationUnitInput)[];
    /** The project key */
    projectKey: string;
  }) => Promise<RandomizationSettingsRep>;

  /**
   * Get experiments any environment
   */
  getExperimentsAnyEnv: (input: {
    /** The project key */
    projectKey: string;
    /** The maximum number of experiments to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above. */
    filter?: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. */
    expand?: string;
    /** A comma-separated list of experiment archived states. Supports `archived`, `active`, or both. Defaults to `active` experiments. */
    lifecycleState?: string;
  }) => Promise<ExperimentCollectionRep>;

  /**
   * Get flag defaults for project
   */
  getFlagDefaultsByProject: (input: {
    /** The project key */
    projectKey: string;
  }) => Promise<FlagDefaultsRep>;

  /**
   * Update flag default for project
   */
  patchFlagDefaultsByProject: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
  }) => Promise<UpsertPayloadRep>;

  /**
   * Create or update flag defaults for project
   */
  putFlagDefaultsByProject: (input: {
    /** A list of default tags for each flag */
    tags: (string)[];
    /** Whether the flag should be temporary by default */
    temporary: boolean;
    booleanDefaults: BooleanFlagDefaults;
    /** Which client-side SDK types can use this flag by default. */
    defaultClientSideAvailability: DefaultClientSideAvailability;
    /** The project key */
    projectKey: string;
  }) => Promise<UpsertPayloadRep>;

  /**
   * List approval requests for a flag
   */
  getApprovalsForFlag: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<FlagConfigApprovalRequestsResponse>;

  /**
   * Create approval request for a flag
   */
  postApprovalRequestForFlag: (input: {
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
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Create approval request to copy flag configurations across environments
   */
  postFlagCopyConfigApprovalRequest: (input: {
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
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key for the target environment */
    environmentKey: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Get approval request for a flag
   */
  getApprovalForFlag: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag approval request ID */
    id: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Update flag approval request
   */
  patchFlagConfigApprovalRequest: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The approval ID */
    id: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Delete approval request for a flag
   */
  deleteApprovalRequestForFlag: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag approval request ID */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Apply approval request for a flag
   */
  postApprovalRequestApplyForFlag: (input: {
    /** Optional comment about the approval request */
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag approval request ID */
    id: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Review approval request for a flag
   */
  postApprovalRequestReviewForFlag: (input: {
    /** The type of review for this approval request */
    kind?: "approve" | "comment" | "decline";
    /** Optional comment about the approval request */
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag approval request ID */
    id: string;
  }) => Promise<FlagConfigApprovalRequestResponse>;

  /**
   * Get followers of a flag in a project and environment
   */
  getFlagFollowers: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<FlagFollowersGetRep>;

  /**
   * Add a member as a follower of a flag in a project and environment
   */
  putFlagFollower: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The memberId of the member to add as a follower of the flag. Reader roles can only add themselves. */
    memberId: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Remove a member as a follower of a flag in a project and environment
   */
  deleteFlagFollower: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The memberId of the member to remove as a follower of the flag. Reader roles can only remove themselves. */
    memberId: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * List scheduled changes
   */
  getFlagConfigScheduledChanges: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<FeatureFlagScheduledChanges>;

  /**
   * Create scheduled changes workflow
   */
  postFlagConfigScheduledChanges: (input: {
    /** Optional comment describing the scheduled changes */
    comment?: string;
    /** When the scheduled changes should be executed */
    executionDate: UnixMillis;
    /** The actions to perform on the execution date for these scheduled changes. This should be an array with a single object that looks like <code>{"kind": "scheduled_action"}</code>. Supported scheduled actions include any semantic patch instructions available when updating a feature flag. */
    instructions: Instructions;
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** Whether to succeed (`true`) or fail (`false`) when these instructions conflict with existing scheduled changes */
    ignoreConflicts?: boolean;
  }) => Promise<FeatureFlagScheduledChange>;

  /**
   * Get a scheduled change
   */
  getFeatureFlagScheduledChange: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The scheduled change id */
    id: string;
  }) => Promise<FeatureFlagScheduledChange>;

  /**
   * Update scheduled changes workflow
   */
  patchFlagConfigScheduledChange: (input: {
    /** Optional comment describing the update to the scheduled changes */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
    instructions: Instructions;
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The scheduled change ID */
    id: string;
    /** Whether to succeed (`true`) or fail (`false`) when these new instructions conflict with existing scheduled changes */
    ignoreConflicts?: boolean;
  }) => Promise<FeatureFlagScheduledChange>;

  /**
   * Delete scheduled changes workflow
   */
  deleteFlagConfigScheduledChanges: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The scheduled change id */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Get workflows
   */
  getWorkflows: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** Filter results by workflow status. Valid status filters are `active`, `completed`, and `failed`. */
    status?: string;
    /** A field to sort the items by. Prefix field by a dash ( - ) to sort in descending order. This endpoint supports sorting by `creationDate` or `stopDate`. */
    sort?: string;
    /** The maximum number of workflows to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<CustomWorkflowsListingOutput>;

  /**
   * Create workflow
   */
  postWorkflow: (input: {
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
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** Whether to call the endpoint in dry-run mode */
    dryRun?: boolean;
  }, options?: { query?: { templateKey?: string } }) => Promise<CustomWorkflowOutput>;

  /**
   * Get custom workflow
   */
  getCustomWorkflow: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The workflow ID */
    workflowId: string;
  }) => Promise<CustomWorkflowOutput>;

  /**
   * Delete workflow
   */
  deleteWorkflow: (input: {
    /** The project key */
    projectKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The environment key */
    environmentKey: string;
    /** The workflow id */
    workflowId: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get migration safety issues
   */
  postMigrationSafetyIssues: (input: {
    /** Semantic patch instructions. The same ones that are valid for flags are valid here. */
    instructions: Instructions;
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The migration flag key */
    flagKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<(MigrationSafetyIssueRep)[]>;

  /**
   * Create a new release for flag
   */
  createReleaseForFlag: (input: {
    /** The variation id to release to across all phases */
    releaseVariationId?: string;
    /** The key of the release pipeline to attach the flag to */
    releasePipelineKey: string;
    /** The project key */
    projectKey: string;
    /** The flag key */
    flagKey: string;
  }) => Promise<Release>;

  /**
   * Update phase status for release
   */
  updatePhaseStatus: (input: {
    /** Status of the phase */
    status?: PhaseStatus;
    /** Extra configuration for audiences required upon phase initialization. */
    audiences?: (ReleaserAudienceConfigInput)[];
    /** The project key */
    projectKey: string;
    /** The flag key */
    flagKey: string;
    /** The phase ID */
    phaseId: string;
  }) => Promise<Release>;

  /**
   * Get layers
   */
  getLayers: (input: {
    /** The project key */
    projectKey: string;
    /** A comma-separated list of filters. This endpoint only accepts filtering by `experimentKey`. The filter returns layers which include that experiment for the selected environment(s). For example: `filter=reservations.experimentKey contains expKey`. */
    filter?: string;
  }) => Promise<LayerCollectionRep>;

  /**
   * Create layer
   */
  createLayer: (input: {
    /** Unique identifier for the layer */
    key: string;
    /** Layer name */
    name: string;
    /** The checkout flow for the application */
    description: string;
    /** The project key */
    projectKey: string;
  }) => Promise<LayerRep>;

  /**
   * Update layer
   */
  updateLayer: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The environment key used for making environment specific updates. For example, updating the reservation of an experiment */
    environmentKey?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require a <code>value</code> field in the array element. */
    instructions: Instructions;
    /** The project key */
    projectKey: string;
    /** The layer key */
    layerKey: string;
  }) => Promise<LayerRep>;

  /**
   * List metric groups
   */
  getMetricGroups: (input: {
    /** The project key */
    projectKey: string;
    /** Accepts filter by `experimentStatus`, `query`, `kind`, `hasConnections`, `maintainerIds`, and `maintainerTeamKey`. Example: `filter=experimentStatus equals 'running' and query equals 'test'`. */
    filter?: string;
    /** A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. Read the endpoint description for a full list of available sort fields. */
    sort?: string;
    /** This parameter is reserved for future use and is not currently supported on this endpoint. */
    expand?: string;
    /** The number of metric groups to return in the response. Defaults to 20. Maximum limit is 50. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items. */
    offset?: number;
  }) => Promise<MetricGroupCollectionRep>;

  /**
   * Create metric group
   */
  createMetricGroup: (input: {
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
    /** The project key */
    projectKey: string;
  }) => Promise<MetricGroupRep>;

  /**
   * Get metric group
   */
  getMetricGroup: (input: {
    /** The project key */
    projectKey: string;
    /** The metric group key */
    metricGroupKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
  }) => Promise<MetricGroupRep>;

  /**
   * Patch metric group
   */
  patchMetricGroup: (input: {
    body: JsonPatch;
    /** The project key */
    projectKey: string;
    /** The metric group key */
    metricGroupKey: string;
  }) => Promise<MetricGroupRep>;

  /**
   * Delete metric group
   */
  deleteMetricGroup: (input: {
    /** The project key */
    projectKey: string;
    /** The metric group key */
    metricGroupKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get all release pipelines
   */
  getAllReleasePipelines: (input: {
    /** The project key */
    projectKey: string;
    /** A comma-separated list of filters. Each filter is of the form field:value. Read the endpoint description for a full list of available filter fields. */
    filter?: string;
    /** The maximum number of items to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<ReleasePipelineCollection>;

  /**
   * Create a release pipeline
   */
  postReleasePipeline: (input: {
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
    /** The project key */
    projectKey: string;
  }) => Promise<ReleasePipeline>;

  /**
   * Get release pipeline by key
   */
  getReleasePipelineByKey: (input: {
    /** The project key */
    projectKey: string;
    /** The release pipeline key */
    pipelineKey: string;
  }) => Promise<ReleasePipeline>;

  /**
   * Update a release pipeline
   */
  putReleasePipeline: (input: {
    /** The release pipeline description */
    description?: string;
    /** The name of the release pipeline */
    name: string;
    /** A logical grouping of one or more environments that share attributes for rolling out changes */
    phases: (CreatePhaseInput)[];
    /** A list of tags for this release pipeline */
    tags?: (string)[];
    /** The project key */
    projectKey: string;
    /** The release pipeline key */
    pipelineKey: string;
  }) => Promise<ReleasePipeline>;

  /**
   * Delete release pipeline
   */
  deleteReleasePipeline: (input: {
    /** The project key */
    projectKey: string;
    /** The release pipeline key */
    pipelineKey: string;
  }) => Promise<ForbiddenErrorRep>;

  /**
   * Get release progressions for release pipeline
   */
  getAllReleaseProgressionsForReleasePipeline: (input: {
    /** The project key */
    projectKey: string;
    /** The pipeline key */
    pipelineKey: string;
    /** Accepts filter by `status` and `activePhaseId`. `status` can take a value of `completed` or `active`. `activePhaseId` takes a UUID and will filter results down to releases active on the specified phase. Providing `status equals completed` along with an `activePhaseId` filter will return an error as they are disjoint sets of data. The combination of `status equals active` and `activePhaseId` will return the same results as `activePhaseId` alone. */
    filter?: string;
    /** The maximum number of items to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<ReleaseProgressionCollection>;

  /**
   * Gets the public IP list
   */
  getIps: () => Promise<IpList>;

  /**
   * List custom roles
   */
  getCustomRoles: (input: {
    /** The maximum number of custom roles to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<CustomRoles>;

  /**
   * Create custom role
   */
  postCustomRole: (input: {
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
  }) => Promise<CustomRole>;

  /**
   * Get custom role
   */
  getCustomRole: (input: {
    /** The custom role key or ID */
    customRoleKey: string;
  }) => Promise<CustomRole>;

  /**
   * Update custom role
   */
  patchCustomRole: (input: {
    /** A JSON patch representation of the change to make */
    patch: JsonPatch;
    /** Optional comment */
    comment?: string;
    /** The custom role key */
    customRoleKey: string;
  }) => Promise<CustomRole>;

  /**
   * Delete custom role
   */
  deleteCustomRole: (input: {
    /** The custom role key */
    customRoleKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List segments
   */
  getSegments: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The number of segments to return. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** Accepts sorting order and fields. Fields can be comma separated. Possible fields are 'creationDate', 'name', 'lastModified'. Example: `sort=name` sort by names ascending or `sort=-name,creationDate` sort by names descending and creationDate ascending. */
    sort?: string;
    /** Accepts filter by `excludedKeys`, `external`, `includedKeys`, `query`, `tags`, `unbounded`, `view`. To learn more about the filter syntax, read the  'Filtering segments' section above. */
    filter?: string;
  }) => Promise<UserSegments>;

  /**
   * Create segment
   */
  postSegment: (input: {
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
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<UserSegment>;

  /**
   * Get segment
   */
  getSegment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<UserSegment>;

  /**
   * Patch segment
   */
  patchSegment: (input: {
    /** A JSON patch representation of the change to make */
    patch: JsonPatch;
    /** Optional comment */
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
    /** If true, the patch will be validated but not persisted. Returns a preview of the segment after the patch is applied. */
    dryRun?: boolean;
  }) => Promise<UserSegment>;

  /**
   * Delete segment
   */
  deleteSegment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Update context targets on a big segment
   */
  updateBigSegmentContextTargets: (input: {
    included?: SegmentUserList;
    excluded?: SegmentUserList;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get big segment membership for context
   */
  getSegmentMembershipForContext: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
    /** The context key */
    contextKey: string;
  }) => Promise<BigSegmentTarget>;

  /**
   * Create big segment export
   */
  createBigSegmentExport: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get big segment export
   */
  getBigSegmentExport: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
    /** The export ID */
    exportID: string;
  }) => Promise<Export>;

  /**
   * Create big segment import
   */
  createBigSegmentImport: (input: {
    /** CSV file containing keys */
    file?: string;
    /** Import mode. Use either `merge` or `replace` */
    mode?: string;
    /** Whether to wait for approvals before processing the import */
    waitOnApprovals?: boolean;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get big segment import
   */
  getBigSegmentImport: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
    /** The import ID */
    importID: string;
  }) => Promise<Import>;

  /**
   * Update user context targets on a big segment
   */
  updateBigSegmentTargets: (input: {
    included?: SegmentUserList;
    excluded?: SegmentUserList;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get big segment membership for user
   */
  getSegmentMembershipForUser: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
    /** The user key */
    userKey: string;
  }) => Promise<BigSegmentTarget>;

  /**
   * Get expiring targets for segment
   */
  getExpiringTargetsForSegment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<ExpiringTargetGetResponse>;

  /**
   * Update expiring targets for segment
   */
  patchExpiringTargetsForSegment: (input: {
    /** Optional description of changes */
    comment?: string;
    /** Semantic patch instructions for the desired changes to the resource */
    instructions: (PatchSegmentExpiringTargetInstruction)[];
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<ExpiringTargetPatchResponse>;

  /**
   * Get expiring user targets for segment
   */
  getExpiringUserTargetsForSegment: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<ExpiringUserTargetGetResponse>;

  /**
   * Update expiring user targets for segment
   */
  patchExpiringUserTargetsForSegment: (input: {
    /** Optional description of changes */
    comment?: string;
    /** Semantic patch instructions for the desired changes to the resource */
    instructions: (PatchSegmentInstruction)[];
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The segment key */
    segmentKey: string;
  }) => Promise<ExpiringUserTargetPatchResponse>;

  /**
   * List teams
   */
  getTeams: (input: {
    /** The number of teams to return in the response. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items. */
    offset?: number;
    /** A comma-separated list of filters. Each filter is constructed as `field:value`. */
    filter?: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
  }) => Promise<Teams>;

  /**
   * Create team
   */
  postTeam: (input: {
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
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. */
    expand?: string;
  }) => Promise<Team>;

  /**
   * Update teams
   */
  patchTeams: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require additional parameters as part of this object. */
    instructions: Instructions;
  }) => Promise<BulkEditTeamsRep>;

  /**
   * Get team
   */
  getTeam: (input: {
    /** The team key. */
    teamKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. */
    expand?: string;
  }) => Promise<Team>;

  /**
   * Update team
   */
  patchTeam: (input: {
    /** Optional comment describing the update */
    comment?: string;
    /** The instructions to perform when updating. This should be an array with objects that look like <code>{"kind": "update_action"}</code>. Some instructions also require additional parameters as part of this object. */
    instructions: Instructions;
    /** The team key */
    teamKey: string;
    /** A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. */
    expand?: string;
  }) => Promise<Team>;

  /**
   * Delete team
   */
  deleteTeam: (input: {
    /** The team key */
    teamKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Get team maintainers
   */
  getTeamMaintainers: (input: {
    /** The team key */
    teamKey: string;
    /** The number of maintainers to return in the response. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<TeamMaintainers>;

  /**
   * Add multiple members to team
   */
  postTeamMembers: (input: {
    /** CSV file containing email addresses */
    file?: string;
    /** The team key */
    teamKey: string;
  }) => Promise<TeamImportsRep>;

  /**
   * Get team custom roles
   */
  getTeamRoles: (input: {
    /** The team key */
    teamKey: string;
    /** The number of roles to return in the response. Defaults to 20. */
    limit?: number;
    /** Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<TeamCustomRoles>;

  /**
   * Get workflow templates
   */
  getWorkflowTemplates: (input: {
    /** Whether the entire template object or just a summary should be returned */
    summary?: boolean;
    /** The substring in either the name or description of a template */
    search?: string;
  }) => Promise<WorkflowTemplatesListingOutputRep>;

  /**
   * Create workflow template
   */
  createWorkflowTemplate: (input: {
    key: string;
    name?: string;
    description?: string;
    workflowId?: FeatureWorkflowId;
    stages?: (StageInput)[];
    projectKey?: string;
    environmentKey?: string;
    flagKey?: string;
  }) => Promise<WorkflowTemplateOutput>;

  /**
   * Delete workflow template
   */
  deleteWorkflowTemplate: (input: {
    /** The template key */
    templateKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * List access tokens
   */
  getTokens: (input: {
    /** If set to true, and the authentication access token has the 'Admin' role, personal access tokens for all members will be retrieved. */
    showAll?: boolean;
    /** The number of access tokens to return in the response. Defaults to 25. */
    limit?: number;
    /** Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<Tokens>;

  /**
   * Create access token
   */
  postToken: (input: {
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
  }) => Promise<Token>;

  /**
   * Get access token
   */
  getToken: (input: {
    /** The ID of the access token */
    id: string;
  }) => Promise<Token>;

  /**
   * Patch access token
   */
  patchToken: (input: {
    body: JsonPatch;
    /** The ID of the access token to update */
    id: string;
  }) => Promise<Token>;

  /**
   * Delete access token
   */
  deleteToken: (input: {
    /** The ID of the access token to update */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * Reset access token
   */
  resetToken: (input: {
    /** The ID of the access token to update */
    id: string;
    /** An expiration time for the old token key, expressed as a Unix epoch time in milliseconds. By default, the token will expire immediately. */
    expiry?: number;
  }) => Promise<Token>;

  /**
   * Get AI runs usage
   */
  getAiRunsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An SDK version to filter results by. Can be specified multiple times, one query parameter per SDK version. */
    sdkVersion?: string;
    /** An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type. */
    sdkType?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkVersion`, `sdkType`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get contexts clientside usage
   */
  getContextsClientsideUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** A context kind to filter results by. Can be specified multiple times, one query parameter per context kind. */
    contextKind?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`. */
    anonymous?: string;
    /** If specified, returns data for each distinct value of the given field. `contextKind` is always included as a grouping dimension. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkAppId`, `anonymousV2`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get MAU clientside usage
   */
  getMauClientsideUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`. */
    anonymous?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkAppId`, `anonymousV2`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get data export events usage
   */
  getDataExportEventsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** An event kind to filter results by. Can be specified multiple times, one query parameter per event kind. */
    eventKind?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `environmentId`, `eventKind`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get evaluations usage
   */
  getEvaluationsUsage: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The feature flag key */
    featureFlagKey: string;
    /** The series of data returned starts from this timestamp. Defaults to 30 days ago. */
    from?: string;
    /** The series of data returned ends at this timestamp. Defaults to the current time. */
    to?: string;
    /** The timezone to use for breaks between days when returning daily data. */
    tz?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get events usage
   */
  getEventsUsage: (input: {
    /** The type of event to retrieve. Must be either `received` or `published`. */
    type: string;
    /** The series of data returned starts from this timestamp. Defaults to 24 hours ago. */
    from?: string;
    /** The series of data returned ends at this timestamp. Defaults to the current time. */
    to?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get experimentation events usage
   */
  getExperimentationEventsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** An event key to filter results by. Can be specified multiple times, one query parameter per event key. */
    eventKey?: string;
    /** An event kind to filter results by. Can be specified multiple times, one query parameter per event kind. */
    eventKind?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `environmentId`, `eventKey`, `eventKind`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get experimentation keys usage
   */
  getExperimentationKeysUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** An experiment ID to filter results by. Can be specified multiple times, one query parameter per experiment ID. */
    experimentId?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `experimentId`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get MAU usage
   */
  getMauUsage: (input: {
    /** The series of data returned starts from this timestamp. Defaults to 30 days ago. */
    from?: string;
    /** The series of data returned ends at this timestamp. Defaults to the current time. */
    to?: string;
    /** A project key to filter results to. Can be specified multiple times, one query parameter per project key, to view data for multiple projects. */
    project?: string;
    /** An environment key to filter results to. When using this parameter, exactly one project key must also be set. Can be specified multiple times as separate query parameters to view data for multiple environments within a single project. */
    environment?: string;
    /** An SDK type to filter results to. Can be specified multiple times, one query parameter per SDK type. Valid values: client, server */
    sdktype?: string;
    /** An SDK name to filter results to. Can be specified multiple times, one query parameter per SDK. */
    sdk?: string;
    /** If specified, filters results to either anonymous or nonanonymous users. */
    anonymous?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions (for example, to group by both project and SDK). Valid values: project, environment, sdktype, sdk, anonymous, contextKind, sdkAppId */
    groupby?: string;
    /** If specified, queries for rolling 30-day, month-to-date, or daily incremental counts. Default is rolling 30-day. Valid values: rolling_30d, month_to_date, daily_incremental */
    aggregationType?: string;
    /** Filters results to the specified context kinds. Can be specified multiple times, one query parameter per context kind. If not set, queries for the user context kind. */
    contextKind?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get MAU usage by category
   */
  getMauUsageByCategory: (input: {
    /** The series of data returned starts from this timestamp. Defaults to 30 days ago. */
    from?: string;
    /** The series of data returned ends at this timestamp. Defaults to the current time. */
    to?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get MAU SDKs by type
   */
  getMauSdksByType: (input: {
    /** The data returned starts from this timestamp. Defaults to seven days ago. The timestamp is in Unix milliseconds, for example, 1656694800000. */
    from?: string;
    /** The data returned ends at this timestamp. Defaults to the current time. The timestamp is in Unix milliseconds, for example, 1657904400000. */
    to?: string;
    /** The type of SDK with monthly active users (MAU) to list. Must be either `client` or `server`. */
    sdktype?: string;
  }) => Promise<SdkListRep>;

  /**
   * Get observability errors usage
   */
  getObservabilityErrorsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get observability logs usage
   */
  getObservabilityLogsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get observability metrics usage
   */
  getObservabilityMetricsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `hourly`, `daily`, and `monthly`; **average** supports `hourly`, `daily`, and `monthly`. */
    granularity?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `average`. */
    aggregationType?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get observability sessions usage
   */
  getObservabilitySessionsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get observability traces usage
   */
  getObservabilityTracesUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get usage details for all SDK versions
   */
  getSdkAllVersions: (input: {
    /** Filter to a specific environment ID. */
    environmentId?: string;
    /** Filter to a specific project ID. */
    projectId?: string;
    /** Filter to a specific SDK name. */
    sdkName?: string;
    /** Filter to a specific SDK type (for example, 'server', 'browser', 'mobile'). */
    sdkType?: string;
    /** Filter to a specific SDK application ID. */
    sdkAppId?: string;
    /** Filter to a specific connection type (for example, 'direct', 'proxy'). */
    connectionType?: string;
  }) => Promise<(SdkVersionDetailsRep)[]>;

  /**
   * Get SDK versions usage details
   */
  getSdkVersionsDetails: () => Promise<(SdkVersionDetailsRep)[]>;

  /**
   * Get contexts serverside usage
   */
  getContextsServersideUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** A context kind to filter results by. Can be specified multiple times, one query parameter per context kind. */
    contextKind?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`. */
    anonymous?: string;
    /** If specified, returns data for each distinct value of the given field. `contextKind` is always included as a grouping dimension. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkAppId`, `anonymousV2`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get service connections usage
   */
  getServiceConnectionsUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** A connection type to filter results by. Can be specified multiple times, one query parameter per connection type. */
    connectionType?: string;
    /** A relay version to filter results by. Can be specified multiple times, one query parameter per relay version. */
    relayVersion?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An SDK version to filter results by. Can be specified multiple times, one query parameter per SDK version. */
    sdkVersion?: string;
    /** An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type. */
    sdkType?: string;
    /** An SDK app ID to filter results by. Can be specified multiple times, one query parameter per SDK app ID. */
    sdkAppId?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `connectionType`, `relayVersion`, `sdkName`, `sdkVersion`, `sdkType`, `sdkAppId`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`. */
    granularity?: string;
  }) => Promise<SeriesListRepFloat>;

  /**
   * Get stream usage
   */
  getStreamUsage: (input: {
    /** The source of streaming connections to describe. Must be either `client` or `server`. */
    source: string;
    /** The series of data returned starts from this timestamp. Defaults to 30 days ago. */
    from?: string;
    /** The series of data returned ends at this timestamp. Defaults to the current time. */
    to?: string;
    /** The timezone to use for breaks between days when returning daily data. */
    tz?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get stream usage by SDK version
   */
  getStreamUsageBySdkVersion: (input: {
    /** The source of streaming connections to describe. Must be either `client` or `server`. */
    source: string;
    /** The series of data returned starts from this timestamp. Defaults to 24 hours ago. */
    from?: string;
    /** The series of data returned ends at this timestamp. Defaults to the current time. */
    to?: string;
    /** The timezone to use for breaks between days when returning daily data. */
    tz?: string;
    /** If included, this filters the returned series to only those that match this SDK name. */
    sdk?: string;
    /** If included, this filters the returned series to only those that match this SDK version. */
    version?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get stream usage SDK versions
   */
  getStreamUsageSdkversion: (input: {
    /** The source of streaming connections to describe. Must be either `client` or `server`. */
    source: string;
  }) => Promise<SdkVersionListRep>;

  /**
   * Get contexts total usage
   */
  getContextsTotalUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** A context kind to filter results by. Can be specified multiple times, one query parameter per context kind. */
    contextKind?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type. */
    sdkType?: string;
    /** An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`. */
    anonymous?: string;
    /** If specified, returns data for each distinct value of the given field. `contextKind` is always included as a grouping dimension. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkType`, `sdkAppId`, `anonymousV2`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get MAU total usage
   */
  getMauTotalUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key. */
    environmentKey?: string;
    /** An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name. */
    sdkName?: string;
    /** An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type. */
    sdkType?: string;
    /** An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`. */
    anonymous?: string;
    /** If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkType`, `sdkAppId`, `anonymousV2`. */
    groupBy?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get Vega AI usage
   */
  getVegaAiUsage: (input: {
    /** The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month. */
    from?: string;
    /** The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time. */
    to?: string;
    /** A project key to filter results by. Can be specified multiple times, one query parameter per project key. */
    projectKey?: string;
    /** Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only. */
    granularity?: string;
    /** Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`. */
    aggregationType?: string;
  }) => Promise<SeriesListRep>;

  /**
   * Get user attribute names
   */
  getUserAttributeNames: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<UserAttributeNamesRep>;

  /**
   * Find users
   */
  getSearchUsers: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Full-text search for users based on name, first name, last name, e-mail address, or key */
    q?: string;
    /** Specifies the maximum number of items in the collection to return (max: 50, default: 20) */
    limit?: number;
    /** Deprecated, use `searchAfter` instead. Specifies the first item to return in the collection. */
    offset?: number;
    /** A Unix epoch time in milliseconds specifying the maximum last time a user requested a feature flag from LaunchDarkly */
    after?: number;
    /** Specifies a field by which to sort. LaunchDarkly supports the `userKey` and `lastSeen` fields. Fields prefixed by a dash ( - ) sort in descending order. */
    sort?: string;
    /** Limits results to users with sort values after the value you specify. You can use this for pagination, but we recommend using the `next` link we provide instead. */
    searchAfter?: string;
    /** A comma-separated list of user attribute filters. Each filter is in the form of attributeKey:attributeValue */
    filter?: string;
  }) => Promise<Users>;

  /**
   * List users
   */
  getUsers: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The number of elements to return per page */
    limit?: number;
    /** Limits results to users with sort values after the value you specify. You can use this for pagination, but we recommend using the `next` link we provide instead. */
    searchAfter?: string;
  }) => Promise<UsersRep>;

  /**
   * Get user
   */
  getUser: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The user key */
    userKey: string;
  }) => Promise<UserRecord>;

  /**
   * Delete user
   */
  deleteUser: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The user key */
    userKey: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List flag settings for user
   */
  getUserFlagSettings: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The user key */
    userKey: string;
  }) => Promise<UserFlagSettings>;

  /**
   * Get flag setting for user
   */
  getUserFlagSetting: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The user key */
    userKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<UserFlagSetting>;

  /**
   * Update flag settings for user
   */
  putFlagSetting: (input: {
    /** The variation value to set for the context. Must match the flag's variation type. */
    setting?: unknown;
    /** Optional comment describing the change */
    comment?: string;
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** The user key */
    userKey: string;
    /** The feature flag key */
    featureFlagKey: string;
  }) => Promise<InvalidRequestErrorRep>;

  /**
   * Get expiring dates on flags for user
   */
  getExpiringFlagsForUser: (input: {
    /** The project key */
    projectKey: string;
    /** The user key */
    userKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<ExpiringUserTargetGetResponse>;

  /**
   * Update expiring user target for flags
   */
  patchExpiringFlagsForUser: (input: {
    /** Optional comment describing the change */
    comment?: string;
    /** The instructions to perform when updating */
    instructions: (InstructionUserRequest)[];
    /** The project key */
    projectKey: string;
    /** The user key */
    userKey: string;
    /** The environment key */
    environmentKey: string;
  }) => Promise<ExpiringUserTargetPatchResponse>;

  /**
   * Get version information
   */
  getVersions: () => Promise<VersionsRep>;

  /**
   * List webhooks
   */
  getAllWebhooks: () => Promise<Webhooks>;

  /**
   * Creates a webhook
   */
  postWebhook: (input: {
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
  }) => Promise<Webhook>;

  /**
   * Get webhook
   */
  getWebhook: (input: {
    /** The ID of the webhook */
    id: string;
  }) => Promise<Webhook>;

  /**
   * Update webhook
   */
  patchWebhook: (input: {
    body: JsonPatch;
    /** The ID of the webhook to update */
    id: string;
  }) => Promise<Webhook>;

  /**
   * Delete webhook
   */
  deleteWebhook: (input: {
    /** The ID of the webhook to delete */
    id: string;
  }) => Promise<UnauthorizedErrorRep>;

  /**
   * List tags
   */
  getTags: (input: {
    /** Fetch tags associated with the specified resource type. Options are `flag`, `project`, `environment`, `segment`, `metric`, `metric-data-source`, `aiconfig`, and `view`. Returns all types by default. */
    kind?: (string)[];
    /** Return tags with the specified prefix */
    pre?: string;
    /** Whether or not to return archived flags */
    archived?: boolean;
    /** The number of tags to return. Maximum is 1000. */
    limit?: number;
    /** The index of the first tag to return. Default is 0. */
    offset?: number;
    /** The time to retrieve tags as of. Default is the current time. */
    asOf?: string;
  }) => Promise<TagsCollection>;

  /**
   * Show an AI Config's targeting
   */
  getAiConfigTargeting: (input: {
    projectKey: string;
    configKey: string;
  }) => Promise<AiConfigTargeting>;

  /**
   * Update AI Config targeting
   */
  patchAiConfigTargeting: (input: {
    comment?: string;
    environmentKey: string;
    instructions: ({ [key: string]: unknown })[];
    projectKey: string;
    configKey: string;
  }) => Promise<AiConfigTargeting>;

  /**
   * List AI Configs
   */
  getAiConfigs: (input: {
    projectKey: string;
    /** A sort to apply to the list of AI Configs. */
    sort?: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A filter to apply to the list. */
    filter?: string;
  }) => Promise<AiConfigs>;

  /**
   * Create new AI Config
   */
  postAiConfig: (input: {
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
    projectKey: string;
  }) => Promise<AiConfig>;

  /**
   * Delete AI Config
   */
  deleteAiConfig: (input: {
    projectKey: string;
    configKey: string;
  }) => Promise<Error>;

  /**
   * Get AI Config
   */
  getAiConfig: (input: {
    projectKey: string;
    configKey: string;
  }) => Promise<AiConfig>;

  /**
   * Update AI Config
   */
  patchAiConfig: (input: {
    description?: string;
    maintainerId?: string;
    maintainerTeamKey?: string;
    name?: string;
    tags?: (string)[];
    /** Evaluation metric key for this AI Config */
    evaluationMetricKey?: string;
    /** Whether the evaluation metric is inverted, meaning a lower value is better if set as true */
    isInverted?: boolean;
    projectKey: string;
    configKey: string;
  }) => Promise<AiConfig>;

  /**
   * Create AI Config variation
   */
  postAiConfigVariation: (input: {
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
    projectKey: string;
    configKey: string;
  }) => Promise<AiConfigVariation>;

  /**
   * Delete AI Config variation
   */
  deleteAiConfigVariation: (input: {
    projectKey: string;
    configKey: string;
    variationKey: string;
  }) => Promise<Error>;

  /**
   * Get AI Config variation
   */
  getAiConfigVariation: (input: {
    projectKey: string;
    configKey: string;
    variationKey: string;
  }) => Promise<AiConfigVariationsResponse>;

  /**
   * Update AI Config variation
   */
  patchAiConfigVariation: (input: {
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
    projectKey: string;
    configKey: string;
    variationKey: string;
  }) => Promise<AiConfigVariation>;

  /**
   * Get AI Config quick stats
   */
  getAiConfigQuickStats: (input: {
    projectKey: string;
    /** An environment key. Only metrics from this environment will be included. */
    env: string;
  }) => Promise<QuickStats>;

  /**
   * Get AI Config metrics
   */
  getAiConfigMetrics: (input: {
    projectKey: string;
    configKey: string;
    /** The starting time, as milliseconds since epoch (inclusive). */
    from: number;
    /** The ending time, as milliseconds since epoch (exclusive). May not be more than 100 days after `from`. */
    to: number;
    /** An environment key. Only metrics from this environment will be included. */
    env: string;
  }) => Promise<Metrics>;

  /**
   * Get AI Config metrics by variation
   */
  getAiConfigMetricsByVariation: (input: {
    projectKey: string;
    configKey: string;
    /** The starting time, as milliseconds since epoch (inclusive). */
    from: number;
    /** The ending time, as milliseconds since epoch (exclusive). May not be more than 100 days after `from`. */
    to: number;
    /** An environment key. Only metrics from this environment will be included. */
    env: string;
  }) => Promise<MetricsByVariation>;

  /**
   * Remove AI models from the restricted list
   */
  deleteRestrictedModels: (input: {
    keys: (string)[];
    projectKey: string;
  }) => Promise<Error>;

  /**
   * Add AI models to the restricted list
   */
  postRestrictedModels: (input: {
    keys: (string)[];
    projectKey: string;
  }) => Promise<RestrictedModelsResponse>;

  /**
   * List AI model configs
   */
  listModelConfigs: (input: {
    projectKey: string;
    /** Whether to return only restricted models */
    restricted?: boolean;
  }) => Promise<(ModelConfig)[]>;

  /**
   * Create an AI model config
   */
  postModelConfig: (input: {
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
    projectKey: string;
  }) => Promise<ModelConfig>;

  /**
   * Delete an AI model config
   */
  deleteModelConfig: (input: {
    projectKey: string;
    modelConfigKey: string;
  }) => Promise<Error>;

  /**
   * Get AI model config
   */
  getModelConfig: (input: {
    projectKey: string;
    modelConfigKey: string;
  }) => Promise<ModelConfig>;

  /**
   * List AI tools
   */
  listAiTools: (input: {
    projectKey: string;
    /** A sort to apply to the list of AI Configs. */
    sort?: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A filter to apply to the list. */
    filter?: string;
  }) => Promise<AiTools>;

  /**
   * Create an AI tool
   */
  postAiTool: (input: {
    key: string;
    maintainerId?: string;
    maintainerTeamKey?: string;
    description?: string;
    /** JSON Schema defining the tool's parameters for LLM consumption */
    schema: { [key: string]: unknown };
    /** Custom metadata and configuration for application-level use (not sent to LLM) */
    customParameters?: { [key: string]: unknown };
    projectKey: string;
  }) => Promise<AiTool>;

  /**
   * List AI tool versions
   */
  listAiToolVersions: (input: {
    projectKey: string;
    toolKey: string;
    /** A sort to apply to the list of AI Configs. */
    sort?: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<AiTools>;

  /**
   * List AI tool references
   */
  listAiToolReferences: (input: {
    projectKey: string;
    toolKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<ToolReferences>;

  /**
   * Delete AI tool
   */
  deleteAiTool: (input: {
    projectKey: string;
    toolKey: string;
  }) => Promise<Error>;

  /**
   * Get AI tool
   */
  getAiTool: (input: {
    projectKey: string;
    toolKey: string;
  }) => Promise<AiTool>;

  /**
   * Update AI tool
   */
  patchAiTool: (input: {
    maintainerId?: string;
    maintainerTeamKey?: string;
    description?: string;
    /** JSON Schema defining the tool's parameters for LLM consumption */
    schema?: { [key: string]: unknown };
    /** Custom metadata and configuration for application-level use (not sent to LLM) */
    customParameters?: { [key: string]: unknown };
    projectKey: string;
    toolKey: string;
  }) => Promise<AiTool>;

  /**
   * List prompt snippets
   */
  listPromptSnippets: (input: {
    projectKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A filter to apply to the list. */
    filter?: string;
  }) => Promise<PromptSnippets>;

  /**
   * Create a prompt snippet
   */
  postPromptSnippet: (input: {
    key: string;
    name: string;
    description?: string;
    /** The text content of the prompt snippet */
    text: string;
    maintainerId?: string;
    maintainerTeamKey?: string;
    tags?: (string)[];
    projectKey: string;
  }) => Promise<PromptSnippet>;

  /**
   * Delete a prompt snippet
   */
  deletePromptSnippet: (input: {
    projectKey: string;
    snippetKey: string;
  }) => Promise<Error>;

  /**
   * Get a prompt snippet
   */
  getPromptSnippet: (input: {
    projectKey: string;
    snippetKey: string;
  }) => Promise<PromptSnippet>;

  /**
   * Update a prompt snippet
   */
  patchPromptSnippet: (input: {
    name?: string;
    description?: string;
    /** The text content of the prompt snippet */
    text?: string;
    maintainerId?: string;
    maintainerTeamKey?: string;
    tags?: (string)[];
    projectKey: string;
    snippetKey: string;
  }) => Promise<PromptSnippet>;

  /**
   * List prompt snippet references
   */
  listPromptSnippetReferences: (input: {
    projectKey: string;
    snippetKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<SnippetReferences>;

  /**
   * List prompt snippet versions
   */
  listPromptSnippetVersions: (input: {
    projectKey: string;
    snippetKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<PromptSnippets>;

  /**
   * List agent graphs
   */
  listAgentGraphs: (input: {
    projectKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<AgentGraphs>;

  /**
   * Create new agent graph
   */
  postAgentGraph: (input: {
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
    projectKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<AgentGraph>;

  /**
   * Delete agent graph
   */
  deleteAgentGraph: (input: {
    projectKey: string;
    graphKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<Error>;

  /**
   * Get agent graph
   */
  getAgentGraph: (input: {
    projectKey: string;
    graphKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<AgentGraph>;

  /**
   * Update agent graph
   */
  patchAgentGraph: (input: {
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
    projectKey: string;
    graphKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<AgentGraph>;

  /**
   * List agent optimizations
   */
  listAgentOptimizations: (input: {
    projectKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<AgentOptimizations>;

  /**
   * Create agent optimization
   */
  postAgentOptimization: (input: {
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
    projectKey: string;
  }) => Promise<AgentOptimization>;

  /**
   * Delete an agent optimization
   */
  deleteAgentOptimization: (input: {
    projectKey: string;
    optimizationKey: string;
  }) => Promise<Error>;

  /**
   * Get an agent optimization
   */
  getAgentOptimization: (input: {
    projectKey: string;
    optimizationKey: string;
  }) => Promise<AgentOptimization>;

  /**
   * Update an agent optimization
   */
  patchAgentOptimization: (input: {
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
    projectKey: string;
    optimizationKey: string;
  }) => Promise<AgentOptimization>;

  /**
   * List agent optimization runs
   */
  listAgentOptimizationResults: (input: {
    projectKey: string;
    optimizationKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<AgentOptimizationResults>;

  /**
   * Create agent optimization result
   */
  postAgentOptimizationResult: (input: {
    runId: string;
    agentOptimizationVersion: number;
    iteration: number;
    instructions: string;
    userInput: string;
    parameters?: { [key: string]: unknown };
    projectKey: string;
    optimizationKey: string;
  }) => Promise<AgentOptimizationResult>;

  /**
   * List all agent optimization results across versions
   */
  listAllAgentOptimizationResults: (input: {
    projectKey: string;
    optimizationKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<AgentOptimizationResults>;

  /**
   * List agent optimization runs
   */
  listAgentOptimizationRuns: (input: {
    projectKey: string;
    optimizationKey: string;
    /** The number of resources to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<AgentOptimizationRuns>;

  /**
   * List agent optimization results for a run
   */
  listAgentOptimizationResultsByRunId: (input: {
    projectKey: string;
    optimizationKey: string;
    runId: string;
  }) => Promise<AgentOptimizationResults>;

  /**
   * Update an agent optimization result
   */
  patchAgentOptimizationResult: (input: {
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
    projectKey: string;
    optimizationKey: string;
    resultId: string;
  }) => Promise<AgentOptimizationResult>;

  /**
   * Get announcements
   */
  getAnnouncementsPublic: (input: {
    /** Filter announcements by status. */
    status?: "active" | "inactive" | "scheduled";
    /** The number of announcements to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }) => Promise<GetAnnouncementsPublic200Response>;

  /**
   * Create an announcement
   */
  createAnnouncementPublic: (input: {
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
  }) => Promise<AnnouncementResponse>;

  /**
   * Delete an announcement
   */
  deleteAnnouncementPublic: (input: {
    announcementId: string;
  }) => Promise<Error>;

  /**
   * Update an announcement
   */
  updateAnnouncementPublic: (input: {
    body: AnnouncementJsonPatch;
    announcementId: string;
  }) => Promise<AnnouncementResponse>;

  /**
   * Get approval request settings
   */
  getApprovalRequestSettings: (input: {
    projectKey: string;
    /** An environment key filter to apply to the approval request settings. */
    environmentKey?: string;
    /** A resource kind filter to apply to the approval request settings. */
    resourceKind?: string;
    /** A comma-separated list of fields to expand in the response. Options include 'default' and 'strict'. */
    expand?: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ApprovalRequestSettings>;

  /**
   * Update approval request settings
   */
  patchApprovalRequestSettings: (input: {
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
    projectKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ApprovalRequestSettings>;

  /**
   * List views
   */
  getViews: (input: {
    projectKey: string;
    /** A sort to apply to the list of views. */
    sort?: "key" | "name" | "updatedAt";
    /** The number of views to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A filter to apply to the list of views. Supports the following fields and operators: `name` (equals, notEquals, startsWith, contains, anyOf), `key` (equals, notEquals, startsWith, contains, anyOf), `tag` (equals, anyOf), `maintainerId` (equals, anyOf), `isPayloadView` (equals). */
    filter?: string;
    /** A comma-separated list of fields to expand. */
    expand?: ("flagsSummary" | "segmentsSummary" | "metricsSummary" | "aiConfigsSummary" | "resourceSummary")[];
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<Views>;

  /**
   * Create view
   */
  createView: (input: {
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
    projectKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<View>;

  /**
   * Delete view
   */
  deleteView: (input: {
    projectKey: string;
    viewKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<Error>;

  /**
   * Get view
   */
  getView: (input: {
    projectKey: string;
    viewKey: string;
    /** A sort to apply to the list of views. */
    sort?: "key" | "name" | "updatedAt";
    /** The number of views to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** A filter to apply to the list of views. Supports the following fields and operators: `name` (equals, notEquals, startsWith, contains, anyOf), `key` (equals, notEquals, startsWith, contains, anyOf), `tag` (equals, anyOf), `maintainerId` (equals, anyOf), `isPayloadView` (equals). */
    filter?: string;
    /** A comma-separated list of fields to expand. */
    expand?: ("allFlags" | "allSegments" | "allMetrics" | "allAIConfigs" | "allResources" | "maintainer" | "flagsSummary" | "segmentsSummary" | "metricsSummary" | "aiConfigsSummary" | "resourceSummary")[];
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<View>;

  /**
   * Update view
   */
  updateView: (input: {
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
    projectKey: string;
    viewKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<View>;

  /**
   * Unlink resource
   */
  unlinkResource: (input: {
    body: ViewLinkRequest;
    projectKey: string;
    viewKey: string;
    resourceType: "flags" | "segments" | "aiConfigs";
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<UnlinkResourceSuccessResponse>;

  /**
   * Link resource
   */
  linkResource: (input: {
    body: ViewLinkRequest;
    projectKey: string;
    viewKey: string;
    resourceType: "flags" | "segments" | "aiConfigs";
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<LinkResourceSuccessResponse>;

  /**
   * Get linked resources
   */
  getLinkedResources: (input: {
    projectKey: string;
    viewKey: string;
    resourceType: "flags" | "segments" | "aiConfigs";
    /** The number of views to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** Field to sort by. Default field is `linkedAt`, default order is ascending. */
    sort?: "linkedAt" | "name";
    /** Case-insensitive search query for linked resources. Matches resource key and, when expanded, resource name. */
    query?: string;
    /** Optional resource filter expression for linked resources. - Supported for `flags` and `segments` resource types. - Uses the same syntax as link/unlink and list endpoints. - For `segments`, `environmentId` is required when `filter` is provided.  */
    filter?: string;
    /** A comma-separated list of fields to expand. */
    expand?: ("maintainer" | "resourceDetails")[];
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ViewLinkedResources>;

  /**
   * Get linked views for a given resource
   */
  getLinkedViews: (input: {
    projectKey: string;
    resourceType: "flags" | "segments" | "aiConfigs";
    resourceKey: string;
    /** Environment ID. Required when resourceType is 'segments' */
    environmentId?: string;
    /** The number of views to return. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<Views>;

  /**
   * List release policies
   */
  getReleasePolicies: (input: {
    /** The project key */
    projectKey: string;
    /** When true, exclude the default release policy from the response. When false or omitted, include the default policy if an environment filter is present. */
    excludeDefault?: boolean;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ReleasePoliciesResponse>;

  /**
   * Create a release policy
   */
  postReleasePolicy: (input: {
    scope?: ReleasePolicyScope;
    releaseMethod: ReleaseMethod;
    guardedReleaseConfig?: GuardedReleaseConfig;
    progressiveReleaseConfig?: ProgressiveReleaseConfig;
    /** The name of the release policy */
    name: string;
    /** The human-readable key of the release policy */
    key: string;
    /** The project key */
    projectKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ReleasePolicy>;

  /**
   * Update the order of existing release policies
   */
  postReleasePoliciesOrder: (input: {
    /** Ordered list of release policy keys */
    body: (string)[];
    /** The project key */
    projectKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<(ReleasePolicy)[]>;

  /**
   * Delete a release policy
   */
  deleteReleasePolicy: (input: {
    /** The project key */
    projectKey: string;
    /** The human-readable key of the release policy */
    policyKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<Error>;

  /**
   * Get a release policy by key
   */
  getReleasePolicy: (input: {
    /** The project key */
    projectKey: string;
    /** The release policy key */
    policyKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ReleasePolicy>;

  /**
   * Update a release policy
   */
  putReleasePolicy: (input: {
    scope?: ReleasePolicyScope;
    releaseMethod: ReleaseMethod;
    guardedReleaseConfig?: GuardedReleaseConfig;
    progressiveReleaseConfig?: ProgressiveReleaseConfig;
    /** The name of the release policy */
    name: string;
    /** The project key */
    projectKey: string;
    /** The human-readable key of the release policy */
    policyKey: string;
  }, options: { headers: { "LD-API-Version": "beta" } }) => Promise<ReleasePolicy>;

  /**
   * Get IP Allowlist
   */
  getIpAllowlist: () => Promise<IpAllowlistResponse>;

  /**
   * Update IP Allowlist Configuration
   */
  patchIpAllowlistConfig: (input: {
    /** Enable or disable session allowlist */
    sessionAllowlistEnabled?: boolean;
    /** Enable or disable API token allowlist */
    apiTokenAllowlistEnabled?: boolean;
  }) => Promise<IpAllowlistResponse>;

  /**
   * Create IP Allowlist Entry
   */
  createIpAllowlistEntry: (input: {
    ipAddress: string;
    description?: string;
  }) => Promise<IpAllowlistEntryResponse>;

  /**
   * Delete IP Allowlist Entry
   */
  deleteIpAllowlistEntry: (input: {
    /** Unique identifier for the allowlist entry */
    id: string;
  }) => Promise<Error>;

  /**
   * Update IP Allowlist Entry Description
   */
  patchIpAllowlistEntry: (input: {
    description: string;
    /** Unique identifier for the allowlist entry */
    id: string;
  }) => Promise<IpAllowlistEntryResponse>;

  /**
   * Get deployment frequency chart data
   */
  getDeploymentFrequencyChart: (input: {
    /** The project key */
    projectKey?: string;
    /** The environment key */
    environmentKey?: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
    /** Unix timestamp in milliseconds. Default value is 7 days ago. */
    from?: string;
    /** Unix timestamp in milliseconds. Default value is now. */
    to?: string;
    /** Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`. */
    bucketType?: string;
    /** Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds). */
    bucketMs?: number;
    /** Options: `application`, `kind` */
    groupBy?: string;
    /** Options: `metrics` */
    expand?: string;
  }) => Promise<InsightsChart>;

  /**
   * Get stale flags chart data
   */
  getStaleFlagsChart: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
    /** Property to group results by. Options: `maintainer` */
    groupBy?: string;
    /** Comma-separated list of individual maintainers to filter results. */
    maintainerId?: string;
    /** Comma-separated list of team maintainer keys to filter results. */
    maintainerTeamKey?: string;
    /** Options: `metrics` */
    expand?: string;
  }) => Promise<InsightsChart>;

  /**
   * Get flag status chart data
   */
  getFlagStatusChart: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
  }) => Promise<InsightsChart>;

  /**
   * Get lead time chart data
   */
  getLeadTimeChart: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey?: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
    /** Unix timestamp in milliseconds. Default value is 7 days ago. */
    from?: number;
    /** Unix timestamp in milliseconds. Default value is now. */
    to?: number;
    /** Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`. */
    bucketType?: string;
    /** Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds). */
    bucketMs?: number;
    /** Options: `application`, `stage`. Default: `stage`. */
    groupBy?: string;
    /** Options: `metrics`, `percentiles`. */
    expand?: string;
  }) => Promise<InsightsChart>;

  /**
   * Get release frequency chart data
   */
  getReleaseFrequencyChart: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
    /** Filter events to those associated with an experiment (`true`) or without an experiment (`false`) */
    hasExperiments?: boolean;
    /** Filter to include or exclude global events. Default value is `include`. Options: `include`, `exclude` */
    global?: string;
    /** Property to group results by. Options: `impact` */
    groupBy?: string;
    /** Unix timestamp in milliseconds. Default value is 7 days ago. */
    from?: string;
    /** Unix timestamp in milliseconds. Default value is now. */
    to?: string;
    /** Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`. */
    bucketType?: string;
    /** Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds). */
    bucketMs?: number;
    /** Options: `metrics` */
    expand?: string;
  }) => Promise<InsightsChart>;

  /**
   * Create deployment event
   */
  createDeploymentEvent: (input: {
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
  }) => Promise<ValidationFailedErrorRep>;

  /**
   * List deployments
   */
  getDeployments: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
    /** The number of deployments to return. Default is 20. Maximum allowed is 100. */
    limit?: number;
    /** Expand properties in response. Options: `pullRequests`, `flagReferences` */
    expand?: string;
    /** Unix timestamp in milliseconds. Default value is 7 days ago. */
    from?: number;
    /** Unix timestamp in milliseconds. Default value is now. */
    to?: number;
    /** Identifier used for pagination */
    after?: string;
    /** Identifier used for pagination */
    before?: string;
    /** The deployment kind */
    kind?: string;
    /** The deployment status */
    status?: string;
  }) => Promise<DeploymentCollectionRep>;

  /**
   * Get deployment
   */
  getDeployment: (input: {
    /** The deployment ID */
    deploymentID: string;
    /** Expand properties in response. Options: `pullRequests`, `flagReferences` */
    expand?: string;
  }) => Promise<DeploymentRep>;

  /**
   * Update deployment
   */
  updateDeployment: (input: {
    body: JsonPatch;
    /** The deployment ID */
    deploymentID: string;
  }) => Promise<DeploymentRep>;

  /**
   * List flag events
   */
  getFlagEvents: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
    /** Filter events by flag key */
    query?: string;
    /** Filter events by impact size. A small impact created a less than 20% change in the proportion of end users receiving one or more flag variations. A medium impact created between a 20%-80% change. A large impact created a more than 80% change. Options: `none`, `small`, `medium`, `large` */
    impactSize?: string;
    /** Filter events to those associated with an experiment (`true`) or without an experiment (`false`) */
    hasExperiments?: boolean;
    /** Filter to include or exclude global events. Default value is `include`. Options: `include`, `exclude` */
    global?: string;
    /** Expand properties in response. Options: `experiments` */
    expand?: string;
    /** The number of deployments to return. Default is 20. Maximum allowed is 100. */
    limit?: number;
    /** Unix timestamp in milliseconds. Default value is 7 days ago. */
    from?: number;
    /** Unix timestamp in milliseconds. Default value is now. */
    to?: number;
    /** Identifier used for pagination */
    after?: string;
    /** Identifier used for pagination */
    before?: string;
  }) => Promise<FlagEventCollectionRep>;

  /**
   * Create insight group
   */
  createInsightGroup: (input: {
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
  }) => Promise<InsightGroup>;

  /**
   * List insight groups
   */
  getInsightGroups: (input: {
    /** The number of insight groups to return. Default is 20. Must be between 1 and 20 inclusive. */
    limit?: number;
    /** Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`. */
    offset?: number;
    /** Sort flag list by field. Prefix field with <code>-</code> to sort in descending order. Allowed fields: name */
    sort?: string;
    /** Filter list of insights groups by name. */
    query?: string;
    /** Options: `scores`, `environment`, `metadata` */
    expand?: string;
  }) => Promise<InsightGroupCollection>;

  /**
   * Get insight group
   */
  getInsightGroup: (input: {
    /** The insight group key */
    insightGroupKey: string;
    /** Options: `scores`, `environment` */
    expand?: string;
  }) => Promise<InsightGroup>;

  /**
   * Patch insight group
   */
  patchInsightGroup: (input: {
    body: JsonPatch;
    /** The insight group key */
    insightGroupKey: string;
  }) => Promise<InsightGroup>;

  /**
   * Delete insight group
   */
  deleteInsightGroup: (input: {
    /** The insight group key */
    insightGroupKey: string;
  }) => Promise<ValidationFailedErrorRep>;

  /**
   * Get insight scores
   */
  getInsightsScores: (input: {
    /** The project key */
    projectKey: string;
    /** The environment key */
    environmentKey: string;
    /** Comma separated list of application keys */
    applicationKey?: string;
  }) => Promise<InsightScores>;

  /**
   * List pull requests
   */
  getPullRequests: (input: {
    /** The project key */
    projectKey: string;
    /** Required if you are using the <code>sort</code> parameter's <code>leadTime</code> option to sort pull requests. */
    environmentKey?: string;
    /** Filter the results to pull requests deployed to a comma separated list of applications */
    applicationKey?: string;
    /** Filter results to pull requests with the given status. Options: `open`, `merged`, `closed`, `deployed`. */
    status?: string;
    /** Filter list of pull requests by title or author */
    query?: string;
    /** The number of pull requests to return. Default is 20. Maximum allowed is 100. */
    limit?: number;
    /** Expand properties in response. Options: `deployments`, `flagReferences`, `leadTime`. */
    expand?: string;
    /** Sort results. Requires the `environmentKey` to be set. Options: `leadTime` (asc) and `-leadTime` (desc). When query option is excluded, default sort is by created or merged date. */
    sort?: string;
    /** Unix timestamp in milliseconds. Default value is 7 days ago. */
    from?: string;
    /** Unix timestamp in milliseconds. Default value is now. */
    to?: string;
    /** Identifier used for pagination */
    after?: string;
    /** Identifier used for pagination */
    before?: string;
  }) => Promise<PullRequestCollectionRep>;

  /**
   * List repositories
   */
  getInsightsRepositories: (input: {
    /** Expand properties in response. Options: `projects` */
    expand?: string;
  }) => Promise<InsightsRepositoryCollection>;

  /**
   * Associate repositories with projects
   */
  associateRepositoriesAndProjects: (input: {
    mappings: (InsightsRepositoryProject)[];
  }) => Promise<InsightsRepositoryProjectCollection>;

  /**
   * Remove repository project association
   */
  deleteRepositoryProject: (input: {
    /** The repository key */
    repositoryKey: string;
    /** The project key */
    projectKey: string;
  }) => Promise<ValidationFailedErrorRep>;
};

export * from "./schemas.js";
