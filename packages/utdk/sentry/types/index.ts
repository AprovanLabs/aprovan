

export type SentryClient = {
  /**
   * Return a list of organizations available to the authenticated session in a region. This is particularly useful for requests with a user bound context. For API key-based requests this will only return the organization that belongs to the key.
   */
  listYourOrganizations: () => Promise<({ features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean })[]>;

  /**
   * Return details on an individual organization, including various details such as membership access and teams.
   */
  retrieveAnOrganization: () => Promise<{ features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }>;

  /**
   * Update various attributes and configurable settings for the given organization.
   */
  updateAnOrganization: () => Promise<{ features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean; role?: unknown; orgRole?: string; targetSampleRate?: number; samplingMode?: string; planSampleRate?: number; desiredSampleRate?: number; experiments: { [key: string]: string | undefined }; isDefault: boolean; defaultRole: string; orgRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; is_global: boolean; isGlobal: boolean; minimumTeamRole: string })[]; teamRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; isMinimumRoleFor: string | null })[]; openMembership: boolean; allowSharedIssues: boolean; enhancedPrivacy: boolean; dataScrubber: boolean; dataScrubberDefaults: boolean; sensitiveFields: (string)[]; safeFields: (string)[]; storeCrashReports: number; attachmentsRole: string; debugFilesRole: string; eventsMemberAdmin: boolean; alertsMemberWrite: boolean; scrubIPAddresses: boolean; scrapeJavaScript: boolean; allowJoinRequests: boolean; relayPiiConfig: string | null; trustedRelays: ({ name?: string; description?: string; publicKey?: string; created?: string; lastModified?: string })[]; pendingAccessRequests: number; codecovAccess: boolean; hideAiFeatures: boolean; aggregatedDataConsent: boolean; isDynamicallySampled: boolean; issueAlertsThreadFlag: boolean; metricAlertsThreadFlag: boolean; requiresSso: boolean; defaultAutofixAutomationTuning: string; defaultSeerScannerAutomation: boolean; enableSeerCoding: boolean; defaultCodingAgent: string; defaultCodingAgentIntegrationId: string | null; defaultAutomatedRunStoppingPoint: string; autoEnableCodeReview: boolean; autoOpenPrs: boolean; defaultCodeReviewTriggers: (string)[]; teams: ({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] })[]; projects: ({ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null })[] }>;

  /**
   * Get integration provider information about all available integrations for an organization.
   */
  getIntegrationProviderInformation: () => Promise<{ providers: ({ key: string; slug: string; name: string; metadata: unknown; canAdd: boolean; canDisable: boolean; features: (string)[]; setupDialog: { [key: string]: unknown | undefined } })[] }>;

  /**
   * Retrieve a list of custom dashboards that are associated with the given organization.
   */
  listAnOrganizationSCustomDashboards: () => Promise<({ id: string; title: string; dateCreated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; environment: (string)[]; filters: { release?: (string)[]; releaseId?: (string)[]; globalFilter?: ({ [key: string]: unknown | undefined })[] }; lastVisited: string | null; widgetDisplay: (string)[]; widgetPreview: ({ [key: string]: string | undefined })[]; permissions: { isEditableByEveryone: boolean; teamsWithEditAccess: (number)[] } | null; isFavorited: boolean; projects: (number)[]; prebuiltId: number | null })[]>;

  /**
   * Create a new dashboard for the given Organization
   */
  createANewDashboardForAnOrganization: () => Promise<{ environment?: (string)[]; period?: string; utc?: string; expired?: boolean; start?: string; end?: string; id: string; title: string; dateCreated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | null; widgets: ({ id: string; title: string; description: string | null; displayType: string; thresholds: { preferredPolarity?: string; max_values: { [key: string]: number | undefined }; unit: string } | null; interval: string; dateCreated: string; dashboardId: string; queries: ({ id: string; name: string; fields: (string)[]; aggregates: (string)[]; columns: (string)[]; fieldAliases: (string)[]; conditions: string; orderby: string; widgetId: string; onDemand: ({ enabled: boolean; extractionState: string; dashboardWidgetQueryId: number })[]; isHidden: boolean; selectedAggregate: number | null; linkedDashboards: ({ field: string; dashboardId: number })[] })[]; limit: number | null; widgetType: string | null; layout: { [key: string]: number | undefined } | null; axisRange: string | null; legendType: "default" | "breakdown" | null; datasetSource: string | null; exploreUrls: (string)[] | null; changedReason: ({ orderby: ({ [key: string]: string | undefined })[] | null; equations: ({ [key: string]: string | (string)[] | undefined })[] | null; selected_columns: (string)[] })[] | null })[]; projects: (number)[]; filters: { release?: (string)[]; releaseId?: (string)[]; globalFilter?: ({ [key: string]: unknown | undefined })[] }; permissions: { isEditableByEveryone: boolean; teamsWithEditAccess: (number)[] } | null; isFavorited: boolean; prebuiltId: number | null }>;

  /**
   * Return details about an organization's custom dashboard.
   */
  retrieveAnOrganizationSCustomDashboard: () => Promise<{ environment?: (string)[]; period?: string; utc?: string; expired?: boolean; start?: string; end?: string; id: string; title: string; dateCreated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | null; widgets: ({ id: string; title: string; description: string | null; displayType: string; thresholds: { preferredPolarity?: string; max_values: { [key: string]: number | undefined }; unit: string } | null; interval: string; dateCreated: string; dashboardId: string; queries: ({ id: string; name: string; fields: (string)[]; aggregates: (string)[]; columns: (string)[]; fieldAliases: (string)[]; conditions: string; orderby: string; widgetId: string; onDemand: ({ enabled: boolean; extractionState: string; dashboardWidgetQueryId: number })[]; isHidden: boolean; selectedAggregate: number | null; linkedDashboards: ({ field: string; dashboardId: number })[] })[]; limit: number | null; widgetType: string | null; layout: { [key: string]: number | undefined } | null; axisRange: string | null; legendType: "default" | "breakdown" | null; datasetSource: string | null; exploreUrls: (string)[] | null; changedReason: ({ orderby: ({ [key: string]: string | undefined })[] | null; equations: ({ [key: string]: string | (string)[] | undefined })[] | null; selected_columns: (string)[] })[] | null })[]; projects: (number)[]; filters: { release?: (string)[]; releaseId?: (string)[]; globalFilter?: ({ [key: string]: unknown | undefined })[] }; permissions: { isEditableByEveryone: boolean; teamsWithEditAccess: (number)[] } | null; isFavorited: boolean; prebuiltId: number | null }>;

  /**
   * Edit an organization's custom dashboard as well as any bulk edits on widgets that may have been made. (For example, widgets that have been rearranged, updated queries and fields, specific display types, and so on.)
   */
  editAnOrganizationSCustomDashboard: () => Promise<{ environment?: (string)[]; period?: string; utc?: string; expired?: boolean; start?: string; end?: string; id: string; title: string; dateCreated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | null; widgets: ({ id: string; title: string; description: string | null; displayType: string; thresholds: { preferredPolarity?: string; max_values: { [key: string]: number | undefined }; unit: string } | null; interval: string; dateCreated: string; dashboardId: string; queries: ({ id: string; name: string; fields: (string)[]; aggregates: (string)[]; columns: (string)[]; fieldAliases: (string)[]; conditions: string; orderby: string; widgetId: string; onDemand: ({ enabled: boolean; extractionState: string; dashboardWidgetQueryId: number })[]; isHidden: boolean; selectedAggregate: number | null; linkedDashboards: ({ field: string; dashboardId: number })[] })[]; limit: number | null; widgetType: string | null; layout: { [key: string]: number | undefined } | null; axisRange: string | null; legendType: "default" | "breakdown" | null; datasetSource: string | null; exploreUrls: (string)[] | null; changedReason: ({ orderby: ({ [key: string]: string | undefined })[] | null; equations: ({ [key: string]: string | (string)[] | undefined })[] | null; selected_columns: (string)[] })[] | null })[]; projects: (number)[]; filters: { release?: (string)[]; releaseId?: (string)[]; globalFilter?: ({ [key: string]: unknown | undefined })[] }; permissions: { isEditableByEveryone: boolean; teamsWithEditAccess: (number)[] } | null; isFavorited: boolean; prebuiltId: number | null }>;

  /**
   * Delete an organization's custom dashboard.
   */
  deleteAnOrganizationSCustomDashboard: () => Promise<unknown>;

  /**
   * List an Organization's Monitors
   */
  fetchAnOrganizationSMonitors: () => Promise<({ owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null; createdBy?: string | null; latestGroup?: { [key: string]: unknown | undefined } | null; description?: string | null; id: string; projectId: string; name: string; type: string; workflowIds: (string)[] | null; dateCreated: string; dateUpdated: string; dataSources: ({ [key: string]: unknown | undefined })[] | null; conditionGroup: { [key: string]: unknown | undefined } | null; config: { [key: string]: unknown | undefined }; enabled: boolean })[]>;

  /**
   * Bulk enable or disable an Organization's Monitors
   */
  mutateAnOrganizationSMonitors: () => Promise<({ owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null; createdBy?: string | null; latestGroup?: { [key: string]: unknown | undefined } | null; description?: string | null; id: string; projectId: string; name: string; type: string; workflowIds: (string)[] | null; dateCreated: string; dateUpdated: string; dataSources: ({ [key: string]: unknown | undefined })[] | null; conditionGroup: { [key: string]: unknown | undefined } | null; config: { [key: string]: unknown | undefined }; enabled: boolean })[]>;

  /**
   * Bulk delete Monitors for a given organization
   */
  bulkDeleteMonitors: () => Promise<unknown>;

  /**
   * Return details on an individual monitor
   */
  fetchAMonitor: () => Promise<{ owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null; createdBy?: string | null; latestGroup?: { [key: string]: unknown | undefined } | null; description?: string | null; id: string; projectId: string; name: string; type: string; workflowIds: (string)[] | null; dateCreated: string; dateUpdated: string; dataSources: ({ [key: string]: unknown | undefined })[] | null; conditionGroup: { [key: string]: unknown | undefined } | null; config: { [key: string]: unknown | undefined }; enabled: boolean }>;

  /**
   * Update an existing monitor
   */
  updateAMonitorById: () => Promise<{ owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null; createdBy?: string | null; latestGroup?: { [key: string]: unknown | undefined } | null; description?: string | null; id: string; projectId: string; name: string; type: string; workflowIds: (string)[] | null; dateCreated: string; dateUpdated: string; dataSources: ({ [key: string]: unknown | undefined })[] | null; conditionGroup: { [key: string]: unknown | undefined } | null; config: { [key: string]: unknown | undefined }; enabled: boolean }>;

  /**
   * Delete a monitor
   */
  deleteAMonitor: () => Promise<unknown>;

  /**
   * Retrieve a list of saved queries that are associated with the given organization.
   */
  listAnOrganizationSDiscoverSavedQueries: () => Promise<({ environment?: (string)[]; query?: string; fields?: (string)[]; widths?: (string)[]; conditions?: (string)[]; aggregations?: (string)[]; range?: string; start?: string; end?: string; orderby?: string; limit?: string; yAxis?: (string)[]; display?: string; topEvents?: number; interval?: string; exploreQuery?: { [key: string]: unknown | undefined }; id: string; name: string; projects: (number)[]; version: number; queryDataset: string; datasetSource: string; expired: boolean; dateCreated: string; dateUpdated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } })[]>;

  /**
   * Create a new saved query for the given organization.
   */
  createANewSavedQuery: () => Promise<{ environment?: (string)[]; query?: string; fields?: (string)[]; widths?: (string)[]; conditions?: (string)[]; aggregations?: (string)[]; range?: string; start?: string; end?: string; orderby?: string; limit?: string; yAxis?: (string)[]; display?: string; topEvents?: number; interval?: string; exploreQuery?: { [key: string]: unknown | undefined }; id: string; name: string; projects: (number)[]; version: number; queryDataset: string; datasetSource: string; expired: boolean; dateCreated: string; dateUpdated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } }>;

  /**
   * Retrieve a saved query.
   */
  retrieveAnOrganizationSDiscoverSavedQuery: () => Promise<{ environment?: (string)[]; query?: string; fields?: (string)[]; widths?: (string)[]; conditions?: (string)[]; aggregations?: (string)[]; range?: string; start?: string; end?: string; orderby?: string; limit?: string; yAxis?: (string)[]; display?: string; topEvents?: number; interval?: string; exploreQuery?: { [key: string]: unknown | undefined }; id: string; name: string; projects: (number)[]; version: number; queryDataset: string; datasetSource: string; expired: boolean; dateCreated: string; dateUpdated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } }>;

  /**
   * Modify a saved query.
   */
  editAnOrganizationSDiscoverSavedQuery: () => Promise<{ environment?: (string)[]; query?: string; fields?: (string)[]; widths?: (string)[]; conditions?: (string)[]; aggregations?: (string)[]; range?: string; start?: string; end?: string; orderby?: string; limit?: string; yAxis?: (string)[]; display?: string; topEvents?: number; interval?: string; exploreQuery?: { [key: string]: unknown | undefined }; id: string; name: string; projects: (number)[]; version: number; queryDataset: string; datasetSource: string; expired: boolean; dateCreated: string; dateUpdated: string; createdBy: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } }>;

  /**
   * Delete a saved query.
   */
  deleteAnOrganizationSDiscoverSavedQuery: () => Promise<unknown>;

  /**
   * Lists an organization's environments.
   */
  listAnOrganizationSEnvironments: () => Promise<({ id: string; name: string })[]>;

  /**
   * This resolves an event ID to the project slug and internal issue ID and internal event ID.
   */
  resolveAnEventId: () => Promise<{ organizationSlug: string; projectSlug: string; groupId: string; eventId: string; event: { id: string; groupID: string | null; eventID: string; projectID: string; message: string | null; title: string; location: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string; dateReceived: string | null; contexts: { [key: string]: unknown | undefined } | null; size: number | null; entries: (unknown)[]; dist: string | null; sdk: { [key: string]: string | undefined }; context: { [key: string]: unknown | undefined } | null; packages: { [key: string]: unknown | undefined }; type: string; metadata: unknown; errors: (unknown)[]; occurrence: unknown; _meta: { [key: string]: unknown | undefined }; crashFile?: string | null; culprit?: string | null; dateCreated?: string; fingerprints?: (string)[]; groupingConfig?: unknown; startTimestamp?: string; endTimestamp?: string; measurements?: unknown; breakdowns?: unknown } }>;

  /**
   * Retrieves explore data for a given organization.  **Note**: This endpoint is intended to get a table of results, and is not for doing a full export of data sent to Sentry.  The `field` query parameter determines what fields will be selected in the `data` and `meta` keys of the endpoint response. - The `data` key contains a list of results row by row that match the `query` made - The `meta` key contains information about the response, including the unit or type of the fields requested
   */
  queryExploreEventsInTableFormat: () => Promise<{ data: ({ [key: string]: unknown | undefined })[]; meta: { fields: { [key: string]: string | undefined }; datasetReason?: string; isMetricsData?: boolean; isMetricsExtractedData?: boolean } }>;

  /**
   * Retrieves explore data for a given organization as a timeseries.  This endpoint can return timeseries for either 1 or many axis, and results grouped to the top events depending on the parameters passed
   */
  queryExploreEventsInTimeseriesFormat: () => Promise<{ meta?: { dataset: string; start: number; end: number }; timeSeries: ({ values: ({ timestamp: number; value: number; incomplete: boolean; comparisonValue?: number; sampleCount?: number; sampleRate?: number | null; confidence?: "low" | "high" | null; incompleteReason?: string })[]; yAxis: string; groupBy?: ({ key: string; value: string | number | { [key: string]: unknown } | null })[]; meta: { order?: number; isOther?: boolean; valueUnit: string | null; dataScanned?: "partial" | "full"; valueType: string; interval: number } })[] }>;

  /**
   * Link a user from an external provider to a Sentry user.
   */
  createAnExternalUser: () => Promise<{ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string }>;

  /**
   * Update a user in an external provider that is currently linked to a Sentry user.
   */
  updateAnExternalUser: () => Promise<{ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string }>;

  /**
   * Delete the link between a user from an external provider and a Sentry user.
   */
  deleteAnExternalUser: () => Promise<unknown>;

  /**
   * Returns a list of data forwarders for an organization.
   */
  retrieveDataForwardersForAnOrganization: () => Promise<({ id: string; organizationId: string; isEnabled: boolean; enrollNewProjects: boolean; enrolledProjects: ({ id: string; slug: string; platform: string | null })[]; provider: string; config: { [key: string]: string | undefined } | null; projectConfigs: ({ id: string; isEnabled: boolean; dataForwarderId: string; project: { id: string; slug: string; platform: string | null }; overrides: { [key: string]: string | undefined }; effectiveConfig: { [key: string]: string | undefined }; dateAdded: string; dateUpdated: string })[]; dateAdded: string; dateUpdated: string })[]>;

  /**
   * Creates a new data forwarder for an organization. Only one data forwarder can be created per provider for a given organization.  Project-specific overrides can only be created after creating the data forwarder.
   */
  createADataForwarderForAnOrganization: () => Promise<{ id: string; organizationId: string; isEnabled: boolean; enrollNewProjects: boolean; enrolledProjects: ({ id: string; slug: string; platform: string | null })[]; provider: string; config: { [key: string]: string | undefined } | null; projectConfigs: ({ id: string; isEnabled: boolean; dataForwarderId: string; project: { id: string; slug: string; platform: string | null }; overrides: { [key: string]: string | undefined }; effectiveConfig: { [key: string]: string | undefined }; dateAdded: string; dateUpdated: string })[]; dateAdded: string; dateUpdated: string }>;

  /**
   * Updates a data forwarder for an organization or update a project-specific override. Updates to the data forwarder's configuration require `org:write` permissions, and the entire configuration to be provided, including the `project_ids` field.  To configure project-specific overrides, specify only the following fields:    - 'project_id': The ID of the project to create/modify the override for.   - 'overrides': Follows the same format as `config` but all provider fields are optional, since only specified fields are overridden.   - 'is_enabled': To enable/disable the forwarder for events on the specific project.  Overrides can be performed with `project:write` permissions on the project being modified.
   */
  updateADataForwarderForAnOrganization: () => Promise<{ id: string; organizationId: string; isEnabled: boolean; enrollNewProjects: boolean; enrolledProjects: ({ id: string; slug: string; platform: string | null })[]; provider: string; config: { [key: string]: string | undefined } | null; projectConfigs: ({ id: string; isEnabled: boolean; dataForwarderId: string; project: { id: string; slug: string; platform: string | null }; overrides: { [key: string]: string | undefined }; effectiveConfig: { [key: string]: string | undefined }; dateAdded: string; dateUpdated: string })[]; dateAdded: string; dateUpdated: string }>;

  /**
   * Deletes a data forwarder for an organization. All project-specific overrides will be deleted as well.
   */
  deleteADataForwarderForAnOrganization: () => Promise<unknown>;

  /**
   * Lists all the available Integrations for an Organization.
   */
  listAnOrganizationSAvailableIntegrations: () => Promise<({ id: string; name: string; icon: string | null; domainName: string | null; accountType: string | null; scopes: (string)[] | null; status: string; provider: unknown; configOrganization: unknown; configData: unknown; externalId: string; organizationId: number; organizationIntegrationStatus: string; gracePeriodEnd: string | null })[]>;

  /**
   * OrganizationIntegrationBaseEndpoints expect both Integration and OrganizationIntegration DB entries to exist for a given organization and integration_id.
   */
  retrieveAnIntegrationForAnOrganization: () => Promise<{ id: string; name: string; icon: string | null; domainName: string | null; accountType: string | null; scopes: (string)[] | null; status: string; provider: unknown; configOrganization: unknown; configData: unknown; externalId: string; organizationId: number; organizationIntegrationStatus: string; gracePeriodEnd: string | null }>;

  /**
   * OrganizationIntegrationBaseEndpoints expect both Integration and OrganizationIntegration DB entries to exist for a given organization and integration_id.
   */
  deleteAnIntegrationForAnOrganization: () => Promise<unknown>;

  /**
   * Return a list of issues for an organization. All parameters are supplied as query string parameters. A default query of `is:unresolved` is applied. To return all results, use an empty query value (i.e. ``?query=`). 
   */
  listAnOrganizationSIssues: () => Promise<({ id: string; shareId: string | null; shortId: string; title: string; culprit: string | null; permalink: string; logger: string | null; level: string; status: string; statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown }; substatus: string | null; isPublic: boolean; platform: string | null; priority: string | null; priorityLockedAt: string | null; seerFixabilityScore: number | null; seerAutofixLastTriggered: string | null; seerExplorerAutofixLastTriggered: string | null; project: { id: string; name: string; slug: string; platform: string | null }; type: string; issueType: string; issueCategory: string; metadata: { [key: string]: unknown | undefined }; numComments: number; assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null; isBookmarked: boolean; isSubscribed: boolean; subscriptionDetails: { disabled?: boolean; reason?: string } | null; hasSeen: boolean; annotations: ({ displayName: string; url: string })[]; isUnhandled: boolean; count: string; userCount: number; firstSeen: string | null; lastSeen: string | null; stats: { [key: string]: unknown | undefined }; lifetime: { [key: string]: unknown | undefined }; filtered: { count: string; userCount: number; firstSeen: string | null; lastSeen: string | null; stats: { [key: string]: unknown | undefined } } | null; sessionCount: number; inbox: { reason: number; reason_details: { until: string | null; count: number | null; window: number | null; user_count: number | null; user_window: number | null } | null; date_added: string }; owners: { type: string; owner: string; date_added: string }; pluginActions: ((string)[])[]; pluginIssues: ({ [key: string]: unknown | undefined })[]; integrationIssues: ({ [key: string]: unknown | undefined })[]; sentryAppIssues: ({ [key: string]: unknown | undefined })[]; latestEventHasAttachments: boolean })[]>;

  /**
   * Bulk mutate various attributes on a maxmimum of 1000 issues.  - For non-status updates, the `id` query parameter is required.  - For status updates, the `id` query parameter may be omitted to update issues that match the filtering.  If any IDs are out of scope, the data won't be mutated but the endpoint will still produce a successful response. For example, if no issues were found matching the criteria, a HTTP 204 is returned.
   */
  bulkMutateAnOrganizationSIssues: () => Promise<{ assignedTo?: { type: "user" | "team"; id: string; name: string; email?: string }; discard?: boolean; hasSeen?: boolean; inbox?: boolean; isBookmarked?: boolean; isPublic?: boolean; isSubscribed?: boolean; merge?: { parent: string; children: (string)[] }; priority?: string; shareId?: string; status?: string; statusDetails?: { inNextRelease?: boolean; inRelease?: string; inCommit?: { commit: string; repository: string }; ignoreDuration?: number; ignoreCount?: number; ignoreWindow?: number; ignoreUserCount?: number; ignoreUserWindow?: number }; subscriptionDetails?: { disabled?: boolean; reason?: string }; substatus?: string }>;

  /**
   * Permanently remove the given issues. If IDs are provided, queries and filtering will be ignored. If any IDs are out of scope, the data won't be mutated but the endpoint will still produce a successful response. For example, if no issues were found matching the criteria, a HTTP 204 is returned.
   */
  bulkRemoveAnOrganizationSIssues: () => Promise<unknown>;

  /**
   * List all organization members.  Response includes pending invites that are approved by organization owners or managers but waiting to be accepted by the invitee.
   */
  listAnOrganizationSMembers: () => Promise<({ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null })[]>;

  /**
   * Add or invite a member to an organization.
   */
  addAMemberToAnOrganization: () => Promise<{ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null }>;

  /**
   * Retrieve an organization member's details.  Response will be a pending invite if it has been approved by organization owners or managers but is waiting to be accepted by the invitee.
   */
  retrieveAnOrganizationMember: () => Promise<{ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; role?: string; roleName?: string; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null; teams: (string)[]; teamRoles: ({ teamSlug: string; role: string | null })[]; invite_link: string | null; isOnlyOwner: boolean; orgRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; is_global: boolean; isGlobal: boolean; minimumTeamRole: string })[]; teamRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; isMinimumRoleFor: string | null })[] }>;

  /**
   * Update a member's [organization-level](https://docs.sentry.io/organization/membership/#organization-level-roles) and [team-level](https://docs.sentry.io/organization/membership/#team-level-roles) roles.  Note that for changing organization-roles, this endpoint is restricted to [user auth tokens](https://docs.sentry.io/account/auth-tokens/#user-auth-tokens). Additionally, both the original and desired organization role must have the same or lower permissions than the role of the organization user making the request  For example, an organization Manager may change someone's role from Member to Manager, but not to Owner.
   */
  updateAnOrganizationMemberSRoles: () => Promise<{ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; role?: string; roleName?: string; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null; teams: (string)[]; teamRoles: ({ teamSlug: string; role: string | null })[]; invite_link: string | null; isOnlyOwner: boolean; orgRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; is_global: boolean; isGlobal: boolean; minimumTeamRole: string })[]; teamRoleList: ({ id: string; name: string; desc: string; scopes: (string)[]; allowed: boolean; isAllowed: boolean; isRetired: boolean; isTeamRolesAllowed: boolean; isMinimumRoleFor: string | null })[] }>;

  /**
   * Remove an organization member.
   */
  deleteAnOrganizationMember: () => Promise<unknown>;

  /**
   * This request can return various success codes depending on the context of the team: - **`201`**: The member has been successfully added. - **`202`**: The member needs permission to join the team and an access request has been generated. - **`204`**: The member is already on the team.  If the team is provisioned through an identity provider, the member cannot join the team through Sentry.  Note the permission scopes vary depending on the organization setting `"Open Membership"` and the type of authorization token. The following table outlines the accepted scopes. <table style="width: 100%;"> <thead>     <tr>     <th style="width: 33%;"></th>     <th colspan="2" style="text-align: center; font-weight: bold; width: 33%;">Open Membership</th>     </tr> </thead> <tbody>     <tr>     <td style="width: 34%;"></td>     <td style="text-align: center; font-weight: bold; width: 33%;">On</td>     <td style="text-align: center; font-weight: bold; width: 33%;">Off</td>     </tr>     <tr>     <td style="text-align: center; font-weight: bold; vertical-align: middle;"><a     href="https://docs.sentry.io/account/auth-tokens/#internal-integrations">Internal Integration Token</a></td>     <td style="text-align: left; width: 33%;">         <ul style="list-style-type: none; padding-left: 0;">         <li><strong style="color: #9c5f99;">&bull; org:read</strong></li>         </ul>     </td>     <td style="text-align: left; width: 33%;">         <ul style="list-style-type: none; padding-left: 0;">         <li><strong style="color: #9c5f99;">&bull; org:write</strong></li>         <li><strong style="color: #9c5f99;">&bull; team:write</strong></li>         </ul>     </td>     </tr>     <tr>     <td style="text-align: center; font-weight: bold; vertical-align: middle;"><a     href="https://docs.sentry.io/account/auth-tokens/#user-auth-tokens">User Auth Token</a></td>     <td style="text-align: left; width: 33%;">         <ul style="list-style-type: none; padding-left: 0;">         <li><strong style="color: #9c5f99;">&bull; org:read</strong></li>         </ul>     </td>     <td style="text-align: left; width: 33%;">         <ul style="list-style-type: none; padding-left: 0;">         <li><strong style="color: #9c5f99;">&bull; org:read*</strong></li>         <li><strong style="color: #9c5f99;">&bull; org:write</strong></li>         <li><strong style="color: #9c5f99;">&bull; org:read +</strong></li>         <li><strong style="color: #9c5f99;">&nbsp; &nbsp;team:write**</strong></li>         </ul>     </td>     </tr> </tbody> </table>   *Organization members are restricted to this scope. When sending a request, it will always return a 202 and request an invite to the team.   \*\*Team Admins must have both **`org:read`** and **`team:write`** scopes in their user authorization token to add members to their teams.
   */
  addAnOrganizationMemberToATeam: () => Promise<{ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null } }>;

  /**
   * The relevant organization member must already be a part of the team.  Note that for organization admins, managers, and owners, they are automatically granted a minimum team role of `admin` on all teams they are part of. Read more about [team roles](https://docs.sentry.io/product/teams/roles/).
   */
  updateAnOrganizationMemberSTeamRole: () => Promise<{ isActive: boolean; teamRole: "contributor" | "admin" }>;

  /**
   * Delete an organization member from a team.  Note the permission scopes vary depending on the type of authorization token. The following table outlines the accepted scopes. <table style="width: 100%;">     <tr style="width: 50%;">         <td style="width: 50%; text-align: center; font-weight: bold; vertical-align: middle;"><a href="https://docs.sentry.io/api/auth/#auth-tokens">Org Auth Token</a></td>         <td style="width: 50%; text-align: left;">             <ul style="list-style-type: none; padding-left: 0;">                 <li><strong style="color: #9c5f99;">&bull; org:write</strong></li>                 <li><strong style="color: #9c5f99;">&bull; org:admin</strong></li>                 <li><strong style="color: #9c5f99;">&bull; team:admin</strong></li>             </ul>         </td>     </tr>     <tr style="width: 50%;">         <td style="width: 50%; text-align: center; font-weight: bold; vertical-align: middle;"><a href="https://docs.sentry.io/api/auth/#user-authentication-tokens">User Auth Token</a></td>         <td style="width: 50%; text-align: left;">             <ul style="list-style-type: none; padding-left: 0;">                 <li><strong style="color: #9c5f99;">&bull; org:read*</strong></li>                 <li><strong style="color: #9c5f99;">&bull; org:write</strong></li>                 <li><strong style="color: #9c5f99;">&bull; org:admin</strong></li>                 <li><strong style="color: #9c5f99;">&bull; team:admin</strong></li>                 <li><strong style="color: #9c5f99;">&bull; org:read + team:admin**</strong></li>             </ul>         </td>     </tr> </table>   \***`org:read`** can only be used to remove yourself from the teams you are a member of.   \*\*Team Admins must have both **`org:read`** and **`team:admin`** scopes in their user authorization token to delete members from their teams.
   */
  deleteAnOrganizationMemberFromATeam: () => Promise<{ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null } }>;

  /**
   * Lists monitors, including nested monitor environments. May be filtered to a project or environment.
   */
  retrieveMonitorsForAnOrganization: () => Promise<({ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } })[]>;

  /**
   * Create a new monitor.
   */
  createAMonitor: () => Promise<{ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } }>;

  /**
   * Retrieves details for a monitor.
   */
  retrieveAMonitor: () => Promise<{ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } }>;

  /**
   * Update a monitor.
   */
  updateAMonitor: () => Promise<{ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } }>;

  /**
   * Delete a monitor or monitor environments.
   */
  deleteAMonitorOrMonitorEnvironments: () => Promise<unknown>;

  /**
   * Retrieve a list of check-ins for a monitor
   */
  retrieveCheckInsForAMonitor: () => Promise<({ groups?: (string)[]; id: string; environment: string; status: string; duration: number | null; dateCreated: string; dateAdded: string; dateUpdated: string; dateInProgress: string | null; dateClock: string; expectedTime: string; monitorConfig: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null } })[]>;

  /**
   * Returns all Spike Protection Notification Actions for an organization.  Notification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry. For example, organization owners and managers can receive an email when a spike occurs.  You can use either the `project` or `projectSlug` query parameter to filter for certain projects. Note that if both are present, `projectSlug` takes priority.
   */
  listSpikeProtectionNotifications: () => Promise<{ [key: string]: unknown }>;

  /**
   * Creates a new Notification Action for Spike Protection.  Notification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry. For example, organization owners and managers can receive an email when a spike occurs.
   */
  createASpikeProtectionNotificationAction: () => Promise<{ [key: string]: unknown }>;

  /**
   * Returns a serialized Spike Protection Notification Action object.  Notification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry. For example, organization owners and managers can receive an email when a spike occurs.
   */
  retrieveASpikeProtectionNotificationAction: () => Promise<{ [key: string]: unknown }>;

  /**
   * Updates a Spike Protection Notification Action.  Notification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry. For example, organization owners and managers can receive an email when a spike occurs.
   */
  updateASpikeProtectionNotificationAction: () => Promise<unknown>;

  /**
   * Deletes a Spike Protection Notification Action.  Notification Actions notify a set of members when an action has been triggered through a notification service such as Slack or Sentry. For example, organization owners and managers can receive an email when a spike occurs.
   */
  deleteASpikeProtectionNotificationAction: () => Promise<unknown>;

  /**
   * Retrieve install info for a given artifact.  Returns distribution and installation details for a specific preprod artifact, including whether the artifact is installable, the install URL, download count, and iOS-specific code signing information.
   */
  retrieveInstallInfoForAGivenArtifact: () => Promise<{ buildId: string; state: string; appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null }; gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null; platform: string | null; projectId: string; projectSlug: string; buildConfiguration: string | null; isInstallable: boolean; installUrl: string | null; installUrlExpiresAt: string | null; downloadCount: number; releaseNotes: string | null; installGroups: (string)[] | null; isCodeSignatureValid: boolean | null; profileName: string | null; codesigningType: string | null }>;

  /**
   * Retrieve size analysis results for a given artifact.  Returns size metrics including download size, install size, and optional insights. When a base artifact exists (either from commit comparison or via the `baseArtifactId` parameter), comparison data showing size differences is included.  The response `state` field indicates the analysis status: - `PENDING`: Analysis has not started yet. - `PROCESSING`: Analysis is currently running. - `FAILED` / `NOT_RAN`: Analysis did not complete; `errorCode` and `errorMessage` are included. - `COMPLETED`: Analysis finished successfully with full size data.
   */
  retrieveSizeAnalysisResultsForAGivenArtifact: () => Promise<{ buildId: string; state: string; appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null }; gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null; errorCode: string | null; errorMessage: string | null; downloadSize: number | null; installSize: number | null; analysisDuration: number | null; analysisVersion: string | null; baseBuildId: string | null; baseAppInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null } | null; insights: { [key: string]: unknown | undefined } | null; appComponents: ({ componentType: string; name: string; appId: string; path: string; downloadSize: number; installSize: number })[] | null; comparisons: ({ metricsArtifactType: string; identifier: string | null; state: string; errorCode: string | null; errorMessage: string | null; sizeMetricDiff: { metricsArtifactType: string; identifier: string | null; headInstallSize: number; headDownloadSize: number; baseInstallSize: number; baseDownloadSize: number } | null; diffItems: ({ sizeDiff: number; headSize: number | null; baseSize: number | null; path: string; itemType: string | null; type: string; diffItems: (unknown)[] | null })[] | null; insightDiffItems: ({ insightType: string; status: string; totalSavingsChange: number; fileDiffs: ({ sizeDiff: number; headSize: number | null; baseSize: number | null; path: string; itemType: string | null; type: string; diffItems: (unknown)[] | null })[]; groupDiffs: ({ sizeDiff: number; headSize: number | null; baseSize: number | null; path: string; itemType: string | null; type: string; diffItems: (unknown)[] | null })[] })[] | null })[] | null }>;

  /**
   * Retrieve full details for a snapshot, including categorized image lists and comparison status.  When a comparison exists, images are categorized into `changed`, `added`, `removed`, `renamed`, `unchanged`, `errored`, and `skipped` lists with counts. Without a comparison, only the `images` list is populated.  Use `compact_metadata=1` to strip image objects down to `display_name`, `image_file_name`, `group`, and `description` only.  This endpoint requires a bearer token with `project:read` access.
   */
  retrieveSnapshotDetails: () => Promise<{ head_artifact_id?: string; base_artifact_id?: string | null; project_id?: string; comparison_type?: string; state?: string; vcs_info?: { head_sha?: string | null; base_sha?: string | null; provider?: string | null; head_repo_name?: string | null; base_repo_name?: string | null; head_ref?: string | null; base_ref?: string | null; pr_number?: number | null }; app_id?: string | null; is_selective?: boolean; images?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[]; image_count?: number; added?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[]; added_count?: number; removed?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[]; removed_count?: number; renamed?: ({ base_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; head_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; diff_image_key?: string | null; diff?: number | null })[]; renamed_count?: number; changed?: ({ base_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; head_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; diff_image_key?: string | null; diff?: number | null })[]; changed_count?: number; unchanged?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[]; unchanged_count?: number; errored?: ({ base_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; head_image?: { key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number }; diff_image_key?: string | null; diff?: number | null })[]; errored_count?: number; skipped?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number })[]; skipped_count?: number; diff_threshold?: number | null; comparison_state?: string | null; approval_status?: string | null; comparison_error_message?: string | null; approvers?: ({ id?: string | null; name?: string | null; email?: string | null; username?: string | null; avatar_url?: string | null; approved_at?: string | null; source?: "sentry" | "github" })[] }>;

  /**
   * Delete a snapshot and all associated data (images, comparisons, metrics).  This is a permanent, irreversible operation. The snapshot and its images will no longer be accessible after deletion.  This endpoint requires a bearer token with `project:write` access.
   */
  deleteASnapshot: () => Promise<unknown>;

  /**
   * Download all images in a snapshot as a ZIP archive.  The response is a streaming `application/zip` file. Images that share the same content hash are deduplicated during fetch but written under their original filenames in the archive.  This endpoint requires a bearer token with `project:read` access.
   */
  downloadSnapshotImagesAsZip: () => Promise<unknown>;

  /**
   * Retrieve detailed information for a single image within a snapshot.  The `image_identifier` can be either the image filename or its content hash. The response includes head and base image metadata, comparison status, diff image URL, diff percentage, and previous filename for renames.  This endpoint uses a flat response format with nullable fields designed for LLM/MCP consumers.  This endpoint requires a bearer token with `project:read` access.
   */
  retrieveSnapshotImageDetail: () => Promise<{ image_file_name?: string; comparison_status?: string | null; head_image?: { content_hash?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number; diff_threshold?: number | null; description?: string | null; tags?: { [key: string]: string | undefined } | null; image_url?: string } | null; base_image?: { content_hash?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number; diff_threshold?: number | null; description?: string | null; tags?: { [key: string]: string | undefined } | null; image_url?: string } | null; diff_image_url?: string | null; diff_percentage?: number | null; previous_image_file_name?: string | null }>;

  /**
   * Retrieve the most recent base snapshot for a given app.  A base snapshot is one uploaded without a `base_sha` (i.e., a snapshot from a base branch like `main`). Use the optional `branch` and `project` parameters to narrow the search.  The response includes the full image list with download URLs. Use `compact_metadata=1` to reduce image metadata.  This endpoint requires a bearer token with `project:read` access.
   */
  retrieveLatestBaseSnapshot: () => Promise<{ head_artifact_id?: string; project_id?: string; project_slug?: string; app_id?: string | null; image_count?: number; images?: ({ key?: string; display_name?: string | null; group?: string | null; image_file_name?: string; width?: number; height?: number; image_url?: string })[]; diff_threshold?: number | null; date_added?: string; vcs_info?: { head_sha?: string | null; base_sha?: string | null; head_ref?: string | null; base_ref?: string | null; head_repo_name?: string | null; pr_number?: number | null } }>;

  /**
   * Retrieves repository data for a given owner.
   */
  retrievesListOfRepositoriesForAGivenOwner: () => Promise<{ results: ({ name: string; updatedAt: string; latestCommitAt: string; defaultBranch: string })[]; pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean }; totalCount: number }>;

  /**
   * Gets syncing status for repositories for an integrated organization.
   */
  getsSyncingStatusForRepositoriesForAnIntegratedOrg: () => Promise<{ isSyncing: boolean }>;

  /**
   * Syncs repositories for an integrated organization with GitHub.
   */
  syncsRepositoriesFromAnIntegratedOrgWithGitHub: () => Promise<{ isSyncing: boolean }>;

  /**
   * Retrieves a paginated list of repository tokens for a given owner.
   */
  retrievesAPaginatedListOfRepositoryTokensForAGivenOwner: () => Promise<{ results: ({ name: string; token: string })[]; pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean }; totalCount: number }>;

  /**
   * Retrieves repository data for a single repository.
   */
  retrievesASingleRepositoryForAGivenOwner: () => Promise<{ uploadToken: string | null; testAnalyticsEnabled: boolean }>;

  /**
   * Retrieves branch data for a given owner and repository.
   */
  retrievesListOfBranchesForAGivenOwnerAndRepository: () => Promise<{ defaultBranch: string; results: ({ name: string })[]; pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean }; totalCount: number }>;

  /**
   * Retrieves the list of test results for a given repository and owner. Also accepts a number of query parameters to filter the results.
   */
  retrievePaginatedListOfTestResultsForRepositoryOwnerAndOrganization: () => Promise<{ defaultBranch: string; results: ({ updatedAt: string; avgDuration: number; totalDuration: number; name: string; failureRate: number; flakeRate: number; totalFailCount: number; totalFlakyFailCount: number; totalSkipCount: number; totalPassCount: number; lastDuration: number })[]; pageInfo: { endCursor: string | null; startCursor: string | null; hasPreviousPage: boolean; hasNextPage: boolean }; totalCount: number }>;

  /**
   * Retrieves aggregated test result metrics for a given repository and owner. Also accepts a query parameter to specify the time period for the metrics.
   */
  retrieveAggregatedTestResultMetricsForRepositoryOwnerAndOrganization: () => Promise<{ totalDuration: number; totalDurationPercentChange: number; slowestTestsDuration: number; slowestTestsDurationPercentChange: number; totalSlowTests: number; totalSlowTestsPercentChange: number; totalFails: number; totalFailsPercentChange: number; totalSkips: number; totalSkipsPercentChange: number; flakeCount: number; flakeCountPercentChange: number; flakeRate: number; flakeRatePercentChange: number }>;

  /**
   * Retrieves test suites belonging to a repository's test results. It accepts a list of test suites as a query parameter to specify individual test suites.
   */
  retrieveTestSuitesBelongingToARepositorySTestResults: () => Promise<{ testSuites: (string)[] }>;

  /**
   * Regenerates a repository upload token and returns the new token.
   */
  regeneratesARepositoryUploadTokenAndReturnsTheNewToken: () => Promise<{ token: string }>;

  /**
   * Return a list of client keys (DSNs) for all projects in an organization.  This paginated endpoint lists client keys across all projects in an organization. Each key includes the project ID to identify which project it belongs to.  Query Parameters: - team: Filter by team slug or ID to get keys only for that team's projects - status: Filter by 'active' or 'inactive' to get keys with specific status
   */
  listAnOrganizationSClientKeys: () => Promise<({ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string })[]>;

  /**
   * Return a list of projects bound to a organization.
   */
  listAnOrganizationSProjects: () => Promise<({ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null })[]>;

  /**
   * Create a new project for an organization. A personal team (`team-{username}`) is automatically created for the caller with Team Admin role, and the project is bound to it. If the org has member project creation disabled (`disable_member_project_creation`), `org:write` scope is required.
   */
  createAProjectForAnOrganization: () => Promise<{ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null }>;

  /**
   * Create a Monitor for a project
   */
  createAMonitorForAProject: () => Promise<{ owner?: { type: "user" | "team"; id: string; name: string; email?: string } | null; createdBy?: string | null; latestGroup?: { [key: string]: unknown | undefined } | null; description?: string | null; id: string; projectId: string; name: string; type: string; workflowIds: (string)[] | null; dateCreated: string; dateUpdated: string; dataSources: ({ [key: string]: unknown | undefined })[] | null; conditionGroup: { [key: string]: unknown | undefined } | null; config: { [key: string]: unknown | undefined }; enabled: boolean }>;

  /**
   * Return a list of trusted relays bound to an organization.
   */
  listAnOrganizationSTrustedRelays: () => Promise<({ relayId: string; version: string; publicKey: string; firstSeen: string; lastSeen: string })[]>;

  /**
   * **`[WARNING]`**: This API is an experimental Alpha feature and is subject to change!  List all derived statuses of releases that fall within the provided start/end datetimes.  Constructs a response key'd off \{`release_version`\}-\{`project_slug`\} that lists thresholds with their status for *specified* projects. Each returned enriched threshold will contain the full serialized `release_threshold` instance as well as it's derived health statuses.
   */
  retrieveStatusesOfReleaseThresholdsAlpha: () => Promise<{ [key: string]: unknown }>;

  /**
   * Return details on an individual release.
   */
  retrieveAnOrganizationSRelease: () => Promise<{ ref?: string | null; url?: string | null; dateReleased?: string | null; dateCreated?: string | null; dateStarted?: string | null; owner?: { [key: string]: unknown | undefined } | null; lastCommit?: { [key: string]: unknown | undefined } | null; lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null; firstEvent?: string | null; lastEvent?: string | null; currentProjectMeta?: { [key: string]: unknown | undefined } | null; userAgent?: string | null; adoptionStages?: { [key: string]: unknown | undefined } | null; id: number; version: string; newGroups: number; status: string; shortVersion: string; versionInfo: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null; data: { [key: string]: unknown | undefined }; commitCount: number; deployCount: number; authors: ({ identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string })[]; projects: ({ healthData?: { durationP50?: number | null; durationP90?: number | null; crashFreeUsers?: number | null; crashFreeSessions?: number | null; totalUsers?: number | null; totalUsers24h?: number | null; totalProjectUsers24h?: number | null; totalSessions?: number | null; totalSessions24h?: number | null; totalProjectSessions24h?: number | null; adoption?: number | null; sessionsAdoption?: number | null; sessionsCrashed: number; sessionsErrored: number; hasHealthData: boolean; stats: { [key: string]: unknown | undefined } } | null; dateReleased?: string | null; dateCreated?: string | null; dateStarted?: string | null; id: number; slug: string; name: string; platform: string | null; platforms: (string)[] | null; hasHealthData: boolean; newGroups: number })[] }>;

  /**
   * Update a release. This can change some metadata associated with the release (the ref, url, and dates).
   */
  updateAnOrganizationSRelease: () => Promise<{ ref?: string | null; url?: string | null; dateReleased?: string | null; dateCreated?: string | null; dateStarted?: string | null; owner?: { [key: string]: unknown | undefined } | null; lastCommit?: { [key: string]: unknown | undefined } | null; lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null; firstEvent?: string | null; lastEvent?: string | null; currentProjectMeta?: { [key: string]: unknown | undefined } | null; userAgent?: string | null; adoptionStages?: { [key: string]: unknown | undefined } | null; id: number; version: string; newGroups: number; status: string; shortVersion: string; versionInfo: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null; data: { [key: string]: unknown | undefined }; commitCount: number; deployCount: number; authors: ({ identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string })[]; projects: ({ healthData?: { durationP50?: number | null; durationP90?: number | null; crashFreeUsers?: number | null; crashFreeSessions?: number | null; totalUsers?: number | null; totalUsers24h?: number | null; totalProjectUsers24h?: number | null; totalSessions?: number | null; totalSessions24h?: number | null; totalProjectSessions24h?: number | null; adoption?: number | null; sessionsAdoption?: number | null; sessionsCrashed: number; sessionsErrored: number; hasHealthData: boolean; stats: { [key: string]: unknown | undefined } } | null; dateReleased?: string | null; dateCreated?: string | null; dateStarted?: string | null; id: number; slug: string; name: string; platform: string | null; platforms: (string)[] | null; hasHealthData: boolean; newGroups: number })[] }>;

  /**
   * Permanently remove a release and all of its files.
   */
  deleteAnOrganizationSRelease: () => Promise<unknown>;

  /**
   * Returns a list of deploys based on the organization, version, and project.
   */
  listAReleaseSDeploys: () => Promise<({ id: string; environment: string; dateStarted: string | null; dateFinished: string; name: string | null; url: string | null })[]>;

  /**
   * Create a deploy for a given release.
   */
  createADeploy: () => Promise<{ id: string; environment: string; dateStarted: string | null; dateFinished: string; name: string | null; url: string | null }>;

  /**
   * Return a count of replays for a list of issue or transaction IDs.  The `query` parameter is required. It is a search query that includes exactly one of `issue.id`, `transaction`, or `replay_id` (string or list of strings).
   */
  retrieveACountOfReplaysForAGivenIssueOrTransaction: () => Promise<{ [key: string]: unknown }>;

  /**
   * Return a list of selectors for a given organization.
   */
  listAnOrganizationSSelectors: () => Promise<{ data: ({ count_dead_clicks?: number; count_rage_clicks?: number; dom_element?: string; element?: { alt: string; aria_label: string; class: (string)[]; component_name: string; id: string; role: string; tag: string; testid: string; title: string }; project_id?: string })[] }>;

  /**
   * Return a list of replays belonging to an organization.
   */
  listAnOrganizationSReplays: () => Promise<({ id?: string; project_id?: string; trace_ids?: (string)[]; error_ids?: (string)[]; environment?: string | null; tags?: { [key: string]: (string)[] | undefined } | (unknown)[]; user?: { id?: string | null; username?: string | null; email?: string | null; ip?: string | null; display_name?: string | null; geo?: { city?: string | null; country_code?: string | null; region?: string | null; subdivision?: string | null } }; sdk?: { name?: string | null; version?: string | null }; os?: { name?: string | null; version?: string | null }; browser?: { name?: string | null; version?: string | null }; device?: { name?: string | null; brand?: string | null; model?: string | null; family?: string | null }; ota_updates?: { channel?: string | null; runtime_version?: string | null; update_id?: string | null }; is_archived?: boolean | null; urls?: (string)[] | null; clicks?: ({ [key: string]: unknown | undefined })[]; count_dead_clicks?: number | null; count_rage_clicks?: number | null; count_errors?: number | null; duration?: number | null; finished_at?: string | null; started_at?: string | null; activity?: number | null; count_urls?: number | null; replay_type?: string; count_segments?: number | null; platform?: string | null; releases?: (string)[]; dist?: string | null; count_warnings?: number | null; count_infos?: number | null; has_viewed?: boolean })[]>;

  /**
   * Return details on an individual replay.
   */
  retrieveAReplayInstance: () => Promise<{ data: { id?: string; project_id?: string; trace_ids?: (string)[]; error_ids?: (string)[]; environment?: string | null; tags?: { [key: string]: (string)[] | undefined } | (unknown)[]; user?: { id?: string | null; username?: string | null; email?: string | null; ip?: string | null; display_name?: string | null; geo?: { city?: string | null; country_code?: string | null; region?: string | null; subdivision?: string | null } }; sdk?: { name?: string | null; version?: string | null }; os?: { name?: string | null; version?: string | null }; browser?: { name?: string | null; version?: string | null }; device?: { name?: string | null; brand?: string | null; model?: string | null; family?: string | null }; ota_updates?: { channel?: string | null; runtime_version?: string | null; update_id?: string | null }; is_archived?: boolean | null; urls?: (string)[] | null; clicks?: ({ [key: string]: unknown | undefined })[]; count_dead_clicks?: number | null; count_rage_clicks?: number | null; count_errors?: number | null; duration?: number | null; finished_at?: string | null; started_at?: string | null; activity?: number | null; count_urls?: number | null; replay_type?: string; count_segments?: number | null; platform?: string | null; releases?: (string)[]; dist?: string | null; count_warnings?: number | null; count_infos?: number | null; has_viewed?: boolean } }>;

  /**
   * List a Repository's Commits
   */
  listARepositorySCommits: () => Promise<({ id: string; message: string | null; dateCreated: string; pullRequest: { id: string; title: string | null; message: string | null; dateCreated: string; repository: { id?: string; name?: string; url?: string | null; provider?: { [key: string]: string | undefined }; status?: string; dateCreated?: string; integrationId?: string | null; externalSlug?: string | null; externalId?: string | null; settings?: { enabledCodeReview: boolean; codeReviewTriggers: (string)[] } | null }; author: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string }; externalUrl: string } | null; suspectCommitType: string; repository?: { id?: string; name?: string; url?: string | null; provider?: { [key: string]: string | undefined }; status?: string; dateCreated?: string; integrationId?: string | null; externalSlug?: string | null; externalId?: string | null; settings?: { enabledCodeReview: boolean; codeReviewTriggers: (string)[] } | null }; author?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] } | { name: string | null; email: string } })[]>;

  /**
   * Returns a paginated list of teams bound to a organization with a SCIM Groups GET Request.  Note that the members field will only contain up to 10,000 members.
   */
  listAnOrganizationSPaginatedTeams: (input: {
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** SCIM 1-offset based index for pagination. */
    startIndex?: number;
    /** The maximum number of results the query should return, maximum of 100. */
    count?: number;
    /** A SCIM filter expression. The only operator currently supported is `eq`. */
    filter?: string;
    /** Fields that should be left off of return values. Right now the only supported field for this query is members. */
    excludedAttributes?: (string)[];
  }) => Promise<{ schemas: (string)[]; totalResults: number; startIndex: number; itemsPerPage: number; Resources: ({ schemas: (string)[]; id: string; displayName: string; meta: { resourceType: string }; members?: ({ value: string; display: string })[] })[] }>;

  /**
   * Create a new team bound to an organization via a SCIM Groups POST Request. The slug will have a normalization of uppercases/spaces to lowercases and dashes.  Note that teams are always created with an empty member set.
   */
  provisionANewTeam: (input: {
    /** The slug of the team that is shown in the UI. */
    displayName: string;
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
  }) => Promise<{ schemas: (string)[]; id: string; displayName: string; meta: { resourceType: string }; members?: ({ value: string; display: string })[] }>;

  /**
   * Query an individual team with a SCIM Group GET Request. - Note that the members field will only contain up to 10000 members.
   */
  queryAnIndividualTeam: (input: {
    /** The ID or slug of the team the resource belongs to. */
    team_id_or_slug: string;
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
  }) => Promise<{ schemas: (string)[]; id: string; displayName: string; meta: { resourceType: string }; members?: ({ value: string; display: string })[] }>;

  /**
   * Update a team's attributes with a SCIM Group PATCH Request.
   */
  updateATeamSAttributes: (input: {
    /** The list of operations to perform. Valid operations are: * Renaming a team: ```json {     "Operations": [{         "op": "replace",         "value": {             "id": 23,             "displayName": "newName"         }     }] } ``` * Adding a member to a team: ```json {     "Operations": [{         "op": "add",         "path": "members",         "value": [             {                 "value": 23,                 "display": "testexample@example.com"             }         ]     }] } ``` * Removing a member from a team: ```json {     "Operations": [{         "op": "remove",         "path": "members[value eq "23"]"     }] } ``` * Replacing an entire member set of a team: ```json {     "Operations": [{         "op": "replace",         "path": "members",         "value": [             {                 "value": 23,                 "display": "testexample2@sentry.io"             },             {                 "value": 24,                 "display": "testexample3@sentry.io"             }         ]     }] } ```  */
    Operations: ({ op: string; value?: { [key: string]: unknown | undefined }; path?: string })[];
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** The ID or slug of the team the resource belongs to. */
    team_id_or_slug: string;
  }) => Promise<unknown>;

  /**
   * Delete a team with a SCIM Group DELETE Request.
   */
  deleteAnIndividualTeam: (input: {
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** The ID or slug of the team the resource belongs to. */
    team_id_or_slug: string;
  }) => Promise<unknown>;

  /**
   * Returns a paginated list of members bound to a organization with a SCIM Users GET Request.
   */
  listAnOrganizationSScimMembers: (input: {
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** SCIM 1-offset based index for pagination. */
    startIndex?: number;
    /** The maximum number of results the query should return, maximum of 100. */
    count?: number;
    /** A SCIM filter expression. The only operator currently supported is `eq`. */
    filter?: string;
    /** Fields that should be left off of return values. Right now the only supported field for this query is members. */
    excludedAttributes?: (string)[];
  }) => Promise<{ schemas: (string)[]; totalResults: number; startIndex: number; itemsPerPage: number; Resources: ({ active?: boolean; schemas: (string)[]; id: string; userName: string; name: { givenName: string; familyName: string }; emails: ({ primary: boolean; value: string; type: string })[]; meta: { resourceType: string }; sentryOrgRole: string })[] }>;

  /**
   * Create a new Organization Member via a SCIM Users POST Request.  Note that this API does not support setting secondary emails.
   */
  provisionANewOrganizationMember: (input: {
    /** The SAML field used for email. */
    userName: string;
    /** The organization role of the member. If unspecified, this will be                     set to the organization's default role. The options are:  * `billing` - Can manage payment and compliance details. * `member` - Can view and act on events, as well as view most other data within the organization. * `manager` - Has full management access to all teams and projects. Can also manage         the organization's membership. * `admin` - Can edit global integrations, manage projects, and add/remove teams.         They automatically assume the Team Admin role for teams they join.         Note: This role can no longer be assigned in Business and Enterprise plans. Use `TeamRoles` instead.          */
    sentryOrgRole?: "billing" | "member" | "manager" | "admin";
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
  }) => Promise<{ active?: boolean; schemas: (string)[]; id: string; userName: string; name: { givenName: string; familyName: string }; emails: ({ primary: boolean; value: string; type: string })[]; meta: { resourceType: string }; sentryOrgRole: string }>;

  /**
   * Query an individual organization member with a SCIM User GET Request. - The `name` object will contain fields `firstName` and `lastName` with the values of `N/A`. Sentry's SCIM API does not currently support these fields but returns them for compatibility purposes.
   */
  queryAnIndividualOrganizationMember: (input: {
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** The ID of the member to query. */
    member_id: string;
  }) => Promise<{ active?: boolean; schemas: (string)[]; id: string; userName: string; name: { givenName: string; familyName: string }; emails: ({ primary: boolean; value: string; type: string })[]; meta: { resourceType: string }; sentryOrgRole: string }>;

  /**
   * Update an organization member's attributes with a SCIM PATCH Request.
   */
  updateAnOrganizationMemberSAttributes: (input: {
    /** A list of operations to perform. Currently, the only valid operation is setting a member's `active` attribute to false, after which the member will be permanently deleted. ```json {     "Operations": [{         "op": "replace",         "path": "active",         "value": False     }] } ```  */
    Operations: ({ op: string; value: unknown; path?: string })[];
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** The ID of the member to update. */
    member_id: string;
  }) => Promise<unknown>;

  /**
   * Delete an organization member with a SCIM User DELETE Request.
   */
  deleteAnOrganizationMemberViaScim: (input: {
    /** The ID or slug of the organization the resource belongs to. */
    organization_id_or_slug: string;
    /** The ID of the member to delete. */
    member_id: string;
  }) => Promise<unknown>;

  /**
   * Retrieve the custom integrations for an organization
   */
  retrieveTheCustomIntegrationsCreatedByAnOrganization: () => Promise<({ allowedOrigins: (string)[]; avatars: ({ avatarType: string; avatarUuid: string; avatarUrl: string; color: boolean; photoType: string })[]; events: (string)[]; featureData: (string)[]; isAlertable: boolean; metadata: string; name: string; schema: string; scopes: (string)[]; slug: string; status: string; uuid: string; verifyInstall: boolean; isDisabled?: boolean; author?: string | null; overview?: string | null; popularity?: number | null; redirectUrl?: string | null; webhookUrl?: string | null; clientSecret?: string | null; datePublished?: string; clientId?: string; owner?: { id: number; slug: string } })[]>;

  /**
   * Returns a time series of release health session statistics for projects bound to an organization.  The interval and date range are subject to certain restrictions and rounding rules.  The date range is rounded to align with the interval, and is rounded to at least one hour. The interval can at most be one day and at least one hour currently. It has to cleanly divide one day, for rounding reasons.  Because of technical limitations, this endpoint returns at most 10000 data points. For example, if you select a 90 day window grouped by releases, you will see at most `floor(10k / (90 + 1)) = 109` releases. To get more results, reduce the `statsPeriod`.
   */
  retrieveReleaseHealthSessionStatistics: () => Promise<{ start: string; end: string; intervals: (string)[]; groups: ({ by: { project?: number; release?: string; environment?: string; "session.status"?: string }; series: { [key: string]: (number | null)[] | undefined }; totals: { [key: string]: number | null | undefined } })[]; query: string }>;

  /**
   * Resolve a short ID to the project slug and group details.
   */
  resolveAShortId: () => Promise<{ organizationSlug: string; projectSlug: string; groupId: string; group: { isUnhandled?: boolean; count?: string; userCount?: number; firstSeen?: string | null; lastSeen?: string | null; id: string; shareId: string | null; shortId: string; title: string; culprit: string | null; permalink: string; logger: string | null; level: string; status: string; statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown }; substatus: string | null; isPublic: boolean; platform: string | null; priority: string | null; priorityLockedAt: string | null; seerFixabilityScore: number | null; seerAutofixLastTriggered: string | null; seerExplorerAutofixLastTriggered: string | null; project: { id: string; name: string; slug: string; platform: string | null }; type: string; issueType: string; issueCategory: string; metadata: { [key: string]: unknown | undefined }; numComments: number; assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null; isBookmarked: boolean; isSubscribed: boolean; subscriptionDetails: { disabled?: boolean; reason?: string } | null; hasSeen: boolean; annotations: ({ displayName: string; url: string })[] }; shortId: string }>;

  /**
   * Query summarized event counts by project for your Organization. Also see https://docs.sentry.io/api/organizations/retrieve-event-counts-for-an-organization-v2/ for reference.
   */
  retrieveAnOrganizationSEventsCountByProject: () => Promise<{ start: string; end: string; projects: ({ id: string; slug: string; stats: ({ [key: string]: unknown | undefined })[] })[] }>;

  /**
   * Query event counts for your Organization. Select a field, define a date range, and group or filter by columns.
   */
  retrieveEventCountsForAnOrganizationV2: () => Promise<{ start: string; end: string; intervals: (string)[]; groups: ({ by: { [key: string]: unknown | undefined }; totals: { [key: string]: unknown | undefined }; series: { [key: string]: unknown | undefined } })[] }>;

  /**
   * Returns a list of teams bound to a organization.
   */
  listAnOrganizationSTeams: () => Promise<({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] })[]>;

  /**
   * Create a new team bound to an organization. Requires at least one of the `name` or `slug` body params to be set.
   */
  createANewTeam: () => Promise<{ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] }>;

  /**
   * Returns a list of teams the user has access to in the specified organization. Note that this endpoint is restricted to [user auth tokens](https://docs.sentry.io/account/auth-tokens/#user-auth-tokens).
   */
  listAUserSTeamsForAnOrganization: () => Promise<({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] })[]>;

  /**
   * Returns a list of alerts for a given organization
   */
  fetchAlerts: () => Promise<({ id: string; name: string; organizationId: string; createdBy: string | null; dateCreated: string; dateUpdated: string; triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null; actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null; environment: string | null; config: { [key: string]: unknown | undefined }; detectorIds: (string)[] | null; enabled: boolean; lastTriggered: string | null; owner: string | null })[]>;

  /**
   * Creates an alert for an organization
   */
  createAnAlertForAnOrganization: () => Promise<{ id: string; name: string; organizationId: string; createdBy: string | null; dateCreated: string; dateUpdated: string; triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null; actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null; environment: string | null; config: { [key: string]: unknown | undefined }; detectorIds: (string)[] | null; enabled: boolean; lastTriggered: string | null; owner: string | null }>;

  /**
   * Bulk enable or disable alerts for a given Organization
   */
  mutateAnOrganizationSAlerts: () => Promise<({ id: string; name: string; organizationId: string; createdBy: string | null; dateCreated: string; dateUpdated: string; triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null; actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null; environment: string | null; config: { [key: string]: unknown | undefined }; detectorIds: (string)[] | null; enabled: boolean; lastTriggered: string | null; owner: string | null })[]>;

  /**
   * Bulk delete alerts for a given organization
   */
  bulkDeleteAlerts: () => Promise<unknown>;

  /**
   * Returns an alert.
   */
  fetchAnAlert: () => Promise<{ id: string; name: string; organizationId: string; createdBy: string | null; dateCreated: string; dateUpdated: string; triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null; actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null; environment: string | null; config: { [key: string]: unknown | undefined }; detectorIds: (string)[] | null; enabled: boolean; lastTriggered: string | null; owner: string | null }>;

  /**
   * Updates an alert.
   */
  updateAnAlertById: () => Promise<{ id: string; name: string; organizationId: string; createdBy: string | null; dateCreated: string; dateUpdated: string; triggers: { id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] } | null; actionFilters: ({ id?: string; organizationId?: string; logicType?: string; conditions?: ({ id: string; type: string; comparison: boolean | number; conditionResult: boolean })[] | (unknown)[]; actions?: ({ id?: string; type?: string; integrationId?: string | null; data?: { [key: string]: string | undefined }; config?: { [key: string]: unknown | undefined }; status?: string })[] | (unknown)[] })[] | null; environment: string | null; config: { [key: string]: unknown | undefined }; detectorIds: (string)[] | null; enabled: boolean; lastTriggered: string | null; owner: string | null }>;

  /**
   * Deletes an alert.
   */
  deleteAnAlert: () => Promise<unknown>;

  /**
   * Return details on an individual project.
   */
  retrieveAProject: () => Promise<{ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string; team?: { id: string; name: string; slug: string }; teams: ({ id: string; name: string; slug: string })[]; latestRelease: { version: string } | null; options: { [key: string]: unknown | undefined }; digestsMinDelay: number; digestsMaxDelay: number; subjectPrefix: string; allowedDomains: (string)[]; resolveAge: number; dataScrubber: boolean; dataScrubberDefaults: boolean; safeFields: (string)[]; storeCrashReports: number | null; sensitiveFields: (string)[]; subjectTemplate: string; securityToken: string; securityTokenHeader: string | null; verifySSL: boolean; scrubIPAddresses: boolean; scrapeJavaScript: boolean; highlightTags: (string)[]; highlightContext: { [key: string]: unknown | undefined }; highlightPreset: { tags: (string)[]; context: { [key: string]: (string)[] | undefined } }; groupingConfig: string; derivedGroupingEnhancements: string; groupingEnhancements: string; secondaryGroupingExpiry: number; secondaryGroupingConfig: string | null; fingerprintingRules: string; organization: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; plugins: ({ id: string; name: string; slug: string; shortName: string; type: string; canDisable: boolean; isTestable: boolean; hasConfiguration: boolean; metadata: { [key: string]: unknown | undefined }; contexts: (string)[]; status: string; assets: (unknown)[]; doc: string; firstPartyAlternative: unknown; deprecationDate: unknown; altIsSentryApp: unknown; enabled: boolean; version: string; author: { [key: string]: string | undefined }; isDeprecated: boolean; isHidden: boolean; description: string; features: (string)[]; featureDescriptions: ({ [key: string]: string | undefined })[]; resourceLinks: ({ [key: string]: string | undefined })[] })[]; platforms: (string)[]; processingIssues: number; defaultEnvironment: string | null; relayPiiConfig: string | null; builtinSymbolSources: (string)[]; dynamicSamplingBiases: ({ [key: string]: string | boolean | undefined })[]; symbolSources: string; isDynamicallySampled: boolean; tempestFetchScreenshots: boolean; autofixAutomationTuning: string; seerScannerAutomation: boolean; seerNightshiftTweaks: unknown; scmSourceContextEnabled: boolean; debugFilesRole: string | null }>;

  /**
   * Update various attributes and configurable settings for the given project.  Note that solely having the **`project:read`** scope restricts updatable settings to `isBookmarked`, `autofixAutomationTuning`, `seerScannerAutomation`, `preprodSizeStatusChecksEnabled`, `preprodSizeStatusChecksRules`, `preprodSizeEnabledQuery`, `preprodDistributionEnabledQuery`, `preprodSizeEnabledByCustomer`, `preprodDistributionEnabledByCustomer`, and `preprodDistributionPrCommentsEnabledByCustomer`.
   */
  updateAProject: () => Promise<{ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string; team?: { id: string; name: string; slug: string }; teams: ({ id: string; name: string; slug: string })[]; latestRelease: { version: string } | null; options: { [key: string]: unknown | undefined }; digestsMinDelay: number; digestsMaxDelay: number; subjectPrefix: string; allowedDomains: (string)[]; resolveAge: number; dataScrubber: boolean; dataScrubberDefaults: boolean; safeFields: (string)[]; storeCrashReports: number | null; sensitiveFields: (string)[]; subjectTemplate: string; securityToken: string; securityTokenHeader: string | null; verifySSL: boolean; scrubIPAddresses: boolean; scrapeJavaScript: boolean; highlightTags: (string)[]; highlightContext: { [key: string]: unknown | undefined }; highlightPreset: { tags: (string)[]; context: { [key: string]: (string)[] | undefined } }; groupingConfig: string; derivedGroupingEnhancements: string; groupingEnhancements: string; secondaryGroupingExpiry: number; secondaryGroupingConfig: string | null; fingerprintingRules: string; organization: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; plugins: ({ id: string; name: string; slug: string; shortName: string; type: string; canDisable: boolean; isTestable: boolean; hasConfiguration: boolean; metadata: { [key: string]: unknown | undefined }; contexts: (string)[]; status: string; assets: (unknown)[]; doc: string; firstPartyAlternative: unknown; deprecationDate: unknown; altIsSentryApp: unknown; enabled: boolean; version: string; author: { [key: string]: string | undefined }; isDeprecated: boolean; isHidden: boolean; description: string; features: (string)[]; featureDescriptions: ({ [key: string]: string | undefined })[]; resourceLinks: ({ [key: string]: string | undefined })[] })[]; platforms: (string)[]; processingIssues: number; defaultEnvironment: string | null; relayPiiConfig: string | null; builtinSymbolSources: (string)[]; dynamicSamplingBiases: ({ [key: string]: string | boolean | undefined })[]; symbolSources: string; isDynamicallySampled: boolean; tempestFetchScreenshots: boolean; autofixAutomationTuning: string; seerScannerAutomation: boolean; seerNightshiftTweaks: unknown; scmSourceContextEnabled: boolean; debugFilesRole: string | null }>;

  /**
   * Schedules a project for deletion.  Deletion happens asynchronously and therefore is not immediate. However once deletion has begun the state of a project changes and will be hidden from most public views.
   */
  deleteAProject: () => Promise<unknown>;

  /**
   * Lists a project's environments.
   */
  listAProjectSEnvironments: () => Promise<({ id: string; name: string; isHidden: boolean })[]>;

  /**
   * Return details on a project environment.
   */
  retrieveAProjectEnvironment: () => Promise<{ id: string; name: string; isHidden: boolean }>;

  /**
   * Update the visibility for a project environment.
   */
  updateAProjectEnvironment: () => Promise<{ id: string; name: string; isHidden: boolean }>;

  /**
   * Return a list of events bound to a project.
   */
  listAProjectSErrorEvents: () => Promise<({ id: string; "event.type": string; groupID: string | null; eventID: string; projectID: string; message: string; title: string; location: string | null; culprit: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string | null; dateCreated: string; crashFile: string | null; metadata: { [key: string]: unknown | undefined } | null })[]>;

  /**
   * Return details on an individual event.
   */
  retrieveAnEventForAProject: () => Promise<{ id: string; groupID: string | null; eventID: string; projectID: string; message: string | null; title: string; location: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string; dateReceived: string | null; contexts: { [key: string]: unknown | undefined } | null; size: number | null; entries: (unknown)[]; dist: string | null; sdk: { [key: string]: string | undefined }; context: { [key: string]: unknown | undefined } | null; packages: { [key: string]: unknown | undefined }; type: string; metadata: unknown; errors: (unknown)[]; occurrence: unknown; _meta: { [key: string]: unknown | undefined }; crashFile?: string | null; culprit?: string | null; dateCreated?: string; fingerprints?: (string)[]; groupingConfig?: unknown; startTimestamp?: string; endTimestamp?: string; measurements?: unknown; breakdowns?: unknown; release: { id?: number; commitCount?: number; data?: { [key: string]: unknown | undefined }; dateCreated?: string; dateReleased?: string | null; deployCount?: number; ref?: string | null; lastCommit?: { [key: string]: unknown | undefined } | null; lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null; status?: string; url?: string | null; userAgent?: string | null; version?: string | null; versionInfo?: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null } | null; userReport: { id: string; eventID: string; name: string | null; email: string | null; comments: string; dateCreated: string; user: { id: string; username: string | null; email: string | null; name: string | null; ipAddress: string | null; avatarUrl: string | null } | null; event: { id: string; eventID: string } } | null; sdkUpdates: ({ [key: string]: unknown | undefined })[]; resolvedWith: (string)[]; nextEventID: string | null; previousEventID: string | null }>;

  /**
   * Return a list of source map errors for a given event.
   */
  debugIssuesRelatedToSourceMapsForAGivenEvent: () => Promise<{ errors: ({ type: string; message: string; data: { [key: string]: unknown | undefined } | null })[] }>;

  /**
   * Retrieve a list of debug information files for a given project.
   */
  listAProjectSDebugInformationFiles: () => Promise<({ id: string; uuid: string; debugId: string; codeId: string | null; cpuName: string; objectName: string; symbolType: string; headers: { [key: string]: string | undefined }; size: number; sha1: string; dateCreated: string; data: { [key: string]: unknown | undefined } })[]>;

  /**
   * Retrieve a list of filters for a given project. `active` will be either a boolean or a list for the legacy browser filters.
   */
  listAProjectSDataFilters: () => Promise<({ id: string; active: boolean | (string)[] })[]>;

  /**
   * Update various inbound data filters for a project.
   */
  updateAnInboundDataFilter: () => Promise<unknown>;

  /**
   * Return a list of client keys bound to a project.
   */
  listAProjectSClientKeys: () => Promise<({ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string })[]>;

  /**
   * Create a new client key bound to a project.  The key's secret and public key are generated by the server.
   */
  createANewClientKey: () => Promise<{ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string }>;

  /**
   * Return a client key bound to a project.
   */
  retrieveAClientKey: () => Promise<{ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string }>;

  /**
   * Update various settings for a client key.
   */
  updateAClientKey: () => Promise<{ id: string; name: string; label: string; public: string | null; secret: string | null; projectId: number; isActive: boolean; rateLimit: { window: number; count: number } | null; dsn: { secret: string; public: string; csp: string; security: string; minidump: string; nel: string; unreal: string; crons: string; cdn: string; playstation: string; integration: string; otlp_traces: string; otlp_logs: string }; browserSdkVersion: string; browserSdk: { choices: ((string)[])[] }; dateCreated: string | null; dynamicSdkLoaderOptions: { hasReplay: boolean; hasPerformance: boolean; hasDebug: boolean; hasFeedback: boolean; hasLogsAndMetrics: boolean }; useCase?: string }>;

  /**
   * Delete a client key for a given project.
   */
  deleteAClientKey: () => Promise<unknown>;

  /**
   * Returns a list of active organization members that belong to any team assigned to the project.
   */
  listAProjectSOrganizationMembers: () => Promise<({ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; id: string; email: string; name: string; user?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null })[]>;

  /**
   * Retrieves details for a monitor.
   */
  retrieveAMonitorForAProject: () => Promise<{ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } }>;

  /**
   * Update a monitor.
   */
  updateAMonitorForAProject: () => Promise<{ alertRule?: { targets: ({ targetIdentifier: number; targetType: string })[]; environment: string }; id: string; name: string; slug: string; status: string; isMuted: boolean; isUpserting: boolean; config: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null }; dateCreated: string; project: { stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string }; environments: { name: string; status: string; isMuted: boolean; dateCreated: string; lastCheckIn: string; nextCheckIn: string; nextCheckInLatest: string; activeIncident: { startingTimestamp: string; resolvingTimestamp: string; brokenNotice: { userNotifiedTimestamp: string; environmentMutedTimestamp: string } | null } | null }; owner: { type: "user" | "team"; id: string; name: string; email?: string } }>;

  /**
   * Delete a monitor or monitor environments.
   */
  deleteAMonitorOrMonitorEnvironmentsForAProject: () => Promise<unknown>;

  /**
   * Retrieve a list of check-ins for a monitor
   */
  retrieveCheckInsForAMonitorByProject: () => Promise<({ groups?: (string)[]; id: string; environment: string; status: string; duration: number | null; dateCreated: string; dateAdded: string; dateUpdated: string; dateInProgress: string | null; dateClock: string; expectedTime: string; monitorConfig: { schedule_type: "crontab" | "interval"; schedule: string | (number)[]; checkin_margin: number | null; max_runtime: number | null; timezone: string | null; failure_issue_threshold: number | null; recovery_threshold: number | null; alert_rule_id: number | null } })[]>;

  /**
   * Returns details on a project's ownership configuration.
   */
  retrieveOwnershipConfigurationForAProject: () => Promise<{ schema?: { $version: number; rules: ({ matcher: { type: string; pattern: string }; owners: ({ type: string; name: string; id?: string })[] })[] } | null; raw: string; fallthrough: boolean; dateCreated: string; lastUpdated: string; isActive: boolean; autoAssignment: string; codeownersAutoSync: boolean }>;

  /**
   * Updates ownership configurations for a project. Note that only the attributes submitted are modified.
   */
  updateOwnershipConfigurationForAProject: () => Promise<unknown>;

  /**
   * Retrieve the current Size Analysis status check rules configured for a project.  Use this endpoint after receiving a `size_analysis.completed` webhook when you want external CI to evaluate the same Size Analysis status check thresholds that Sentry uses. The endpoint returns the current project configuration, not a historical snapshot from when the webhook was emitted.  The response includes whether status check enforcement is enabled and the normalized rule list Sentry uses when evaluating Size Analysis thresholds.  This endpoint requires a bearer token with `project:read` access. Project distribution tokens are not supported.  Response notes:  - `enabled: false` means status-check enforcement is disabled for the project. - `rules: []` means there are no configured thresholds to evaluate. - `value` is returned as a string. For `absolute` and `absolute_diff`   measurements it is a byte value; for `relative_diff` it is a percentage. - `filterQuery` is the original configured filter string. - `filters` is the machine-readable version of `filterQuery`. - `filters: []` means the rule has no filters and applies to all builds. - `filters: null` means the saved filter query could not be parsed; Sentry's   status check trigger treats that rule as non-matching.  Rule evaluation semantics:  - Threshold comparisons are strict: a rule triggers only when the computed value   is greater than the configured threshold, not greater than or equal to it. - `absolute_diff` and `relative_diff` require a matching base metric/build. - `relative_diff` does not trigger when the base size is zero. - `artifactType` identifies the artifact scope the rule evaluates.   `main_artifact`, `watch_artifact`, `android_dynamic_feature_artifact`,   and `app_clip_artifact` target their matching artifact metric.   `all_artifacts` evaluates all available artifact metrics. - Rule filters support the keys `app_id`, `git_head_ref`,   `build_configuration_name`, and `platform_name`. - Filter objects are combined with AND. Multiple `conditions` inside one   filter object are combined with OR. - Each condition uses `values`; single-value operators still return a   one-item array. - Values in `filters` are decoded literal values for exact/simple operators,   not query syntax. For example, `app_id:\*com` in `filterQuery` becomes   `values: ["*com"]` with `operator: "equals"`. - The same key can appear in more than one filter object when positive and   negative conditions both exist; those filter objects are still combined with   AND. - Supported filter operators are `equals`, `notEquals`, `in`, `notIn`,   `contains`, `notContains`, `startsWith`, `notStartsWith`, `endsWith`,   `notEndsWith`, `matches`, and `notMatches`. - `matches` and `notMatches` values use Sentry wildcard pattern syntax, not   regular expressions. `*` matches zero or more characters, escaped `\*`   matches a literal asterisk, and a pattern without `*` is an exact match. - `in` and `notIn` are evaluated as one condition against all values, matching   Sentry's status check trigger behavior. - A rule applies only when the build metadata matches all filters. If a   referenced metadata key is missing, the filter does not match, even for   negated operators.
   */
  retrieveSizeAnalysisStatusCheckRulesForAProject: () => Promise<{ enabled: boolean; rules: ({ id: string; metric: "install_size" | "download_size"; measurement: "absolute" | "absolute_diff" | "relative_diff"; value: string; filterQuery: string; filters: ({ key: "app_id" | "build_configuration_name" | "git_head_ref" | "platform_name"; conditions: ({ operator: "contains" | "endsWith" | "equals" | "in" | "matches" | "notContains" | "notEndsWith" | "notEquals" | "notIn" | "notMatches" | "notStartsWith" | "startsWith"; values: (string)[] })[] })[] | null; artifactType: "main_artifact" | "watch_artifact" | "android_dynamic_feature_artifact" | "app_clip_artifact" | "all_artifacts" })[] }>;

  /**
   * Retrieve the current Snapshot status check rules configured for a project.  Use this endpoint when external CI needs to evaluate the same Snapshot change-type rules that Sentry uses. The endpoint returns the current project configuration, not a historical snapshot from when a build was processed.  The response includes whether status check enforcement is enabled and the Snapshot change types that fail the status check.  This endpoint requires a bearer token with `project:read` access. Project distribution tokens are not supported.  Response notes:  - `enabled: false` means status-check enforcement is disabled for the project. - `rules` contains one boolean per Snapshot change type. - `failOnAdded`, `failOnRemoved`, `failOnChanged`, and `failOnRenamed`   indicate which unapproved change types fail the status check.
   */
  retrieveSnapshotStatusCheckRulesForAProject: () => Promise<{ enabled: boolean; rules: { failOnAdded: boolean; failOnRemoved: boolean; failOnChanged: boolean; failOnRenamed: boolean } }>;

  /**
   * Get the latest installable build for a project.  Returns the latest installable build matching filter criteria. When buildVersion is provided, also returns the current build and whether an update is available.
   */
  getTheLatestInstallableBuildForAProject: () => Promise<{ latestArtifact: { buildId: string; state: string; appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null }; gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null; platform: string | null; projectId: string; projectSlug: string; buildConfiguration: string | null; isInstallable: boolean; installUrl: string | null; installUrlExpiresAt: string | null; downloadCount: number; releaseNotes: string | null; installGroups: (string)[] | null; isCodeSignatureValid: boolean | null; profileName: string | null; codesigningType: string | null } | null; currentArtifact: { buildId: string; state: string; appInfo: { appId: string | null; name: string | null; version: string | null; buildNumber: number | null; artifactType: string | null; dateAdded: string | null; dateBuilt: string | null }; gitInfo: { headSha: string | null; baseSha: string | null; provider: string | null; headRepoName: string | null; baseRepoName: string | null; headRef: string | null; baseRef: string | null; prNumber: number | null } | null; platform: string | null; projectId: string; projectSlug: string; buildConfiguration: string | null; isInstallable: boolean; installUrl: string | null; installUrlExpiresAt: string | null; downloadCount: number; releaseNotes: string | null; installGroups: (string)[] | null; isCodeSignatureValid: boolean | null; profileName: string | null; codesigningType: string | null } | null }>;

  /**
   * Upload a new snapshot with image metadata.  The request body is a JSON object containing `app_id` (required), `images` (required, a mapping of filenames to image metadata objects), and optional VCS fields (`head_sha`, `base_sha`, `provider`, `head_repo_name`, `head_ref`, `base_repo_name`, `base_ref`, `pr_number`).  When VCS info with a `base_sha` is provided and a matching base snapshot exists, a comparison is automatically triggered.  This endpoint requires a bearer token with `project:write` access.
   */
  uploadASnapshot: () => Promise<{ artifactId: string; snapshotMetricsId: string; imageCount: number; snapshotUrl: string }>;

  /**
   * Delete a replay.
   */
  deleteAReplayInstance: () => Promise<unknown>;

  /**
   * Retrieve a collection of RRWeb DOM node-ids and the timestamp they were clicked.
   */
  listClickedNodes: () => Promise<{ data: ({ node_id: number; timestamp: string })[] }>;

  /**
   * Return a collection of replay recording segments.
   */
  listRecordingSegments: () => Promise<(({ [key: string]: unknown | undefined })[])[]>;

  /**
   * Return a replay recording segment.
   */
  retrieveARecordingSegment: () => Promise<({ [key: string]: unknown | undefined })[]>;

  /**
   * Return a list of users who have viewed a replay.
   */
  listUsersWhoHaveViewedAReplay: () => Promise<{ data: { viewed_by: ({ [key: string]: unknown | undefined })[] } }>;

  /**
   * Retrieve a collection of replay delete jobs.
   */
  listReplayBatchDeletionJobs: () => Promise<{ data: ({ id: number; dateCreated: string; dateUpdated: string; rangeStart: string; rangeEnd: string; environments: (string)[]; status: string; query: string; countDeleted: number })[] }>;

  /**
   * Create a new replay deletion job.
   */
  createReplayBatchDeletionJob: () => Promise<{ data: { id: number; dateCreated: string; dateUpdated: string; rangeStart: string; rangeEnd: string; environments: (string)[]; status: string; query: string; countDeleted: number } }>;

  /**
   * Fetch a replay delete job instance.
   */
  retrieveAReplayBatchDeletionJob: () => Promise<{ data: { id: number; dateCreated: string; dateUpdated: string; rangeStart: string; rangeEnd: string; environments: (string)[]; status: string; query: string; countDeleted: number } }>;

  /**
   * Link a repository to a project. The repository must already exist in the organization (connected via a VCS integration). Idempotent: returns 200 if the link already exists, 201 if created.
   */
  linkARepositoryToAProject: () => Promise<{ id: string; projectId: string; repositoryId: string; source: string; created: boolean }>;

  /**
   * List custom symbol sources configured for a project.
   */
  retrieveAProjectSSymbolSources: () => Promise<({ type: "http"; url: string; username?: string; password?: { "hidden-secret"?: true }; id: string; name?: string; layout: { type: "native" | "symstore" | "symstore_index2" | "ssqp" | "unified" | "debuginfod" | "slashsymbols"; casing?: "lowercase" | "uppercase" | "default" }; filters?: { filetypes?: ("pe" | "pdb" | "portablepdb" | "mach_debug" | "mach_code" | "elf_debug" | "elf_code" | "wasm_debug" | "wasm_code" | "breakpad" | "sourcebundle" | "uuidmap" | "bcsymbolmap" | "il2cpp" | "proguard" | "dartsymbolmap")[]; path_patterns?: (string)[]; requires_checksum?: boolean }; is_public?: boolean; has_index?: boolean; platforms?: (string)[] } | { type: "s3"; bucket: string; region: string; access_key: string; secret_key: { "hidden-secret"?: true }; prefix?: string; id: string; name?: string; layout: { type: "native" | "symstore" | "symstore_index2" | "ssqp" | "unified" | "debuginfod" | "slashsymbols"; casing?: "lowercase" | "uppercase" | "default" }; filters?: { filetypes?: ("pe" | "pdb" | "portablepdb" | "mach_debug" | "mach_code" | "elf_debug" | "elf_code" | "wasm_debug" | "wasm_code" | "breakpad" | "sourcebundle" | "uuidmap" | "bcsymbolmap" | "il2cpp" | "proguard" | "dartsymbolmap")[]; path_patterns?: (string)[]; requires_checksum?: boolean }; is_public?: boolean; has_index?: boolean; platforms?: (string)[] } | { type: "gcs"; bucket: string; client_email: string; private_key: { "hidden-secret"?: true }; prefix?: string; id: string; name?: string; layout: { type: "native" | "symstore" | "symstore_index2" | "ssqp" | "unified" | "debuginfod" | "slashsymbols"; casing?: "lowercase" | "uppercase" | "default" }; filters?: { filetypes?: ("pe" | "pdb" | "portablepdb" | "mach_debug" | "mach_code" | "elf_debug" | "elf_code" | "wasm_debug" | "wasm_code" | "breakpad" | "sourcebundle" | "uuidmap" | "bcsymbolmap" | "il2cpp" | "proguard" | "dartsymbolmap")[]; path_patterns?: (string)[]; requires_checksum?: boolean }; is_public?: boolean; has_index?: boolean; platforms?: (string)[] } | { type: "appStoreConnect"; id: string; name: string; appconnectIssuer: string; appconnectKey: string; appconnectPrivateKey: string; appName: string; appId: string; bundleId: string })[]>;

  /**
   * Add a custom symbol source to a project.
   */
  addASymbolSourceToAProject: () => Promise<{ [key: string]: unknown }>;

  /**
   * Update a custom symbol source in a project.
   */
  updateAProjectSSymbolSource: () => Promise<{ [key: string]: unknown }>;

  /**
   * Delete a custom symbol source from a project.
   */
  deleteASymbolSourceFromAProject: () => Promise<unknown>;

  /**
   * Return a list of teams that have access to this project.
   */
  listAProjectSTeams: () => Promise<({ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null } })[]>;

  /**
   * Give a team access to a project.
   */
  addATeamToAProject: () => Promise<{ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string; team?: { id: string; name: string; slug: string }; teams: ({ id: string; name: string; slug: string })[] }>;

  /**
   * Revoke a team's access to a project.  Note that Team Admins can only revoke access to teams they are admins of.
   */
  deleteATeamFromAProject: () => Promise<{ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string; team?: { id: string; name: string; slug: string }; teams: ({ id: string; name: string; slug: string })[] }>;

  /**
   * Get list of actively used LLM model names from Seer.  Returns the list of AI models that are currently used in production in Seer. This endpoint does not require authentication and can be used to discover which models Seer uses.  Requests to this endpoint should use the region-specific domain eg. `us.sentry.io` or `de.sentry.io`
   */
  listSeerAiModels: () => Promise<{ models: (string)[] }>;

  /**
   * Retrieve a custom integration.
   */
  retrieveACustomIntegrationByIdOrSlug: () => Promise<{ allowedOrigins: (string)[]; avatars: ({ avatarType: string; avatarUuid: string; avatarUrl: string; color: boolean; photoType: string })[]; events: (string)[]; featureData: (string)[]; isAlertable: boolean; metadata: string; name: string; schema: string; scopes: (string)[]; slug: string; status: string; uuid: string; verifyInstall: boolean; isDisabled?: boolean; author?: string | null; overview?: string | null; popularity?: number | null; redirectUrl?: string | null; webhookUrl?: string | null; clientSecret?: string | null; datePublished?: string; clientId?: string; owner?: { id: number; slug: string } }>;

  /**
   * Update an existing custom integration.
   */
  updateAnExistingCustomIntegration: () => Promise<{ allowedOrigins: (string)[]; avatars: ({ avatarType: string; avatarUuid: string; avatarUrl: string; color: boolean; photoType: string })[]; events: (string)[]; featureData: (string)[]; isAlertable: boolean; metadata: string; name: string; schema: string; scopes: (string)[]; slug: string; status: string; uuid: string; verifyInstall: boolean; isDisabled?: boolean; author?: string | null; overview?: string | null; popularity?: number | null; redirectUrl?: string | null; webhookUrl?: string | null; clientSecret?: string | null; datePublished?: string; clientId?: string; owner?: { id: number; slug: string } }>;

  /**
   * Delete a custom integration.
   */
  deleteACustomIntegration: () => Promise<unknown>;

  /**
   * Return details on an individual team.
   */
  retrieveATeam: () => Promise<{ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] }>;

  /**
   * Update various attributes and configurable settings for the given team.
   */
  updateATeam: () => Promise<{ id: string; slug: string; name: string; dateCreated: string | null; isMember: boolean; teamRole: string | null; flags: { [key: string]: unknown | undefined }; access: (string)[]; hasAccess: boolean; isPending: boolean; memberCount: number; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; externalTeams?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; organization?: { features?: (string)[]; extraOptions?: { [key: string]: { [key: string]: unknown | undefined } | undefined }; access?: (string)[]; onboardingTasks?: ({ task: string | null; status: string; completionSeen: string | null; dateCompleted: string; data: unknown })[]; id: string; slug: string; status: { id: string; name: string }; name: string; dateCreated: string; isEarlyAdopter: boolean; require2FA: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; links: { organizationUrl: string; regionUrl: string }; hasAuthProvider: boolean; allowMemberInvite: boolean; allowMemberProjectCreation: boolean; allowSuperuserAccess: boolean }; projects?: ({ stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; isInternal: boolean; isPublic: boolean; avatar: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; color: string; status: string })[] }>;

  /**
   * Schedules a team for deletion.  **Note:** Deletion happens asynchronously and therefore is not immediate. Teams will have their slug released while waiting for deletion.
   */
  deleteATeam: () => Promise<unknown>;

  /**
   * Link a team from an external provider to a Sentry team.
   */
  createAnExternalTeam: () => Promise<{ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string }>;

  /**
   * Update a team in an external provider that is currently linked to a Sentry team.
   */
  updateAnExternalTeam: () => Promise<{ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string }>;

  /**
   * Delete the link between a team from an external provider and a Sentry team.
   */
  deleteAnExternalTeam: () => Promise<unknown>;

  /**
   * List all members on a team.  The response will not include members with pending invites.
   */
  listATeamSMembers: () => Promise<({ externalUsers?: ({ externalId?: string; userId?: string; teamId?: string; id: string; provider: string; externalName: string; integrationId: string })[]; role?: string; roleName?: string; id: string; email: string; name: string; user: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; orgRole: string; pending: boolean; expired: boolean; flags: { "idp:provisioned": boolean; "idp:role-restricted": boolean; "sso:linked": boolean; "sso:invalid": boolean; "member-limit:restricted": boolean; "partnership:restricted": boolean }; dateCreated: string; inviteStatus: string; inviterName: string | null; teamRole: string | null; teamSlug: string })[]>;

  /**
   * Return a list of projects bound to a team.
   */
  listATeamSProjects: () => Promise<({ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null })[]>;

  /**
   * Create a new project bound to a team.          Note: If your organization has disabled member project creation, the `org:write` or `team:admin` scope is required.         
   */
  createANewProject: () => Promise<{ latestDeploys?: { [key: string]: { [key: string]: string | undefined } | undefined } | null; options?: { [key: string]: unknown | undefined }; stats?: unknown; transactionStats?: unknown; sessionStats?: unknown; id: string; slug: string; name: string; platform: string | null; dateCreated: string; isBookmarked: boolean; isMember: boolean; features: (string)[]; firstEvent: string | null; firstTransactionEvent: boolean; access: (string)[]; hasAccess: boolean; hasFeedbacks: boolean; hasFlags: boolean; hasMinifiedStackTrace: boolean; hasMonitors: boolean; hasNewFeedbacks: boolean; hasProfiles: boolean; hasReplays: boolean; hasSessions: boolean; hasInsightsHttp: boolean; hasInsightsDb: boolean; hasInsightsAssets: boolean; hasInsightsAppStart: boolean; hasInsightsScreenLoad: boolean; hasInsightsVitals: boolean; hasInsightsCaches: boolean; hasInsightsQueues: boolean; hasInsightsAgentMonitoring: boolean; hasInsightsMCP: boolean; hasLogs: boolean; hasTraceMetrics: boolean; team: { id: string; name: string; slug: string } | null; teams: ({ id: string; name: string; slug: string })[]; platforms: (string)[]; hasUserReports: boolean; environments: (string)[]; latestRelease: { version: string } | null }>;

  /**
   * Return a list of version control repositories for a given organization.
   */
  listAnOrganizationSRepositories: () => Promise<({ dateCreated: string; id: string; name: string })[]>;

  /**
   * Return a list of users seen within this project.
   */
  listAProjectSUsers: () => Promise<({ username: string | null; email: string | null })[]>;

  /**
   * Return a list of values associated with this key.  The `query` parameter can be used to to perform a "contains" match on values.   When [paginated](/api/pagination) can return at most 1000 values.
   */
  listATagSValues: () => Promise<({ name: string })[]>;

  /**
   * Caution This endpoint may change in the future without  notice.
   */
  retrieveEventCountsForAProject: () => Promise<((number)[])[]>;

  /**
   * Return a list of user feedback items within this project.  *This list does not include submissions from the [User Feedback Widget](https://docs.sentry.io/product/user-feedback/#user-feedback-widget). This is because it is based on an older format called User Reports - read more [here](https://develop.sentry.dev/application/feedback-architecture/#user-reports). To return a list of user feedback items from the widget, please use the [issue API](https://docs.sentry.io/api/events/list-a-projects-issues/) with the filter `issue.category:feedback`.*
   */
  listAProjectSUserFeedback: () => Promise<({ comments: string; dateCreated: string; email: string; event: { eventID?: string; id?: string | null }; eventID: string; id: string; issue: { [key: string]: unknown } | null; name: string; user: { [key: string]: unknown } | null })[]>;

  /**
   * *This endpoint is DEPRECATED. We document it here for older SDKs and users who are still migrating to the [User Feedback Widget](https://docs.sentry.io/product/user-feedback/#user-feedback-widget) or [API](https://docs.sentry.io/platforms/javascript/user-feedback/#user-feedback-api)(multi-platform). If you are a new user, do not use this endpoint - unless you don't have a JS frontend, and your platform's SDK does not offer a feedback API.*  Feedback must be received by the server no more than 30 minutes after the event was saved.  Additionally, within 5 minutes of submitting feedback it may also be overwritten. This is useful in situations where you may need to retry sending a request due to network failures.  If feedback is rejected due to a mutability threshold, a 409 status code will be returned.  Note: Feedback may be submitted with DSN authentication (see auth documentation).
   */
  submitUserFeedback: () => Promise<{ comments: string; dateCreated: string; email: string; event: { eventID?: string; id?: string | null }; eventID: string; id: string; issue: { [key: string]: unknown } | null; name: string; user: { [key: string]: unknown } | null }>;

  /**
   * Return a list of service hooks bound to a project.
   */
  listAProjectSServiceHooks: () => Promise<({ dateCreated: string; events: (string)[]; id: string; secret: string; status: string; url: string })[]>;

  /**
   * Register a new service hook on a project.  Events include:  - event.alert: An alert is generated for an event (via rules). - event.created: A new event has been processed.  This endpoint requires the 'servicehooks' feature to be enabled for your project.
   */
  registerANewServiceHook: () => Promise<{ dateCreated: string; events: (string)[]; id: string; secret: string; status: string; url: string }>;

  /**
   * Return a service hook bound to a project.
   */
  retrieveAServiceHook: () => Promise<{ dateCreated: string; events: (string)[]; id: string; secret: string; status: string; url: string }>;

  /**
   * Update a service hook.
   */
  updateAServiceHook: () => Promise<{ dateCreated: string; events: (string)[]; id: string; secret: string; status: string; url: string }>;

  /**
   * Remove a service hook.
   */
  removeAServiceHook: () => Promise<unknown>;

  /**
   * **Deprecated**: This endpoint has been replaced with the [Organization Issues endpoint](/api/events/list-an-organizations-issues/) which supports filtering on project and additional functionality.  Return a list of issues (groups) bound to a project.  All parameters are supplied as query string parameters.    A default query of ``is:unresolved`` is applied. To return results with other statuses send an new query value (i.e. ``?query=`` for all results).  The ``statsPeriod`` parameter can be used to select the timeline stats which should be present. Possible values are: ``""`` (disable),``"24h"`` (default), ``"14d"``  User feedback items from the [User Feedback Widget](https://docs.sentry.io/product/user-feedback/#user-feedback-widget) are built off the issue platform, so to return a list of user feedback items for a specific project, filter for `issue.category:feedback`.
   */
  listAProjectSIssues: () => Promise<({ annotations: (string)[]; assignedTo: { [key: string]: unknown } | null; count: string; culprit: string; firstSeen: string; hasSeen: boolean; id: string; isBookmarked: boolean; isPublic: boolean; isSubscribed: boolean; lastSeen: string; level: string; logger: string | null; metadata: { filename: string; type: string; value: string } | { title: string }; numComments: number; permalink: string; project: { id?: string; name?: string; slug?: string }; shareId: string | null; shortId: string; stats: { "24h"?: ((number)[])[] }; status: "resolved" | "unresolved" | "ignored"; statusDetails: { [key: string]: unknown }; subscriptionDetails: { [key: string]: unknown } | null; title: string; type: string; userCount: number })[]>;

  /**
   * Bulk mutate various attributes on issues.  The list of issues to modify is given through the `id` query parameter.  It is repeated for each issue that should be modified.  - For non-status updates, the `id` query parameter is required. - For status updates, the `id` query parameter may be omitted for a batch "update all" query. - An optional `status` query parameter may be used to restrict mutations to only events with the given status.  The following attributes can be modified and are supplied as JSON object in the body:  If any IDs are out of scope this operation will succeed without any data mutation.
   */
  bulkMutateAListOfIssues: () => Promise<{ isPublic: boolean; status: "resolved" | "unresolved" | "ignored"; statusDetails: { [key: string]: unknown } }>;

  /**
   * Permanently remove the given issues. The list of issues to modify is given through the `id` query parameter.  It is repeated for each issue that should be removed.  Only queries by 'id' are accepted.  If any IDs are out of scope this operation will succeed without any data mutation.
   */
  bulkRemoveAListOfIssues: () => Promise<unknown>;

  /**
   * Returns a list of values associated with this key for an issue. Returns at most 1000 values when paginated.
   */
  listATagSValuesForAnIssue: () => Promise<({ query?: string | null; key: string; name: string; value: string | null; count: number | null; lastSeen: string | null; firstSeen: string | null })[]>;

  /**
   * This endpoint lists an issue's hashes, which are the generated checksums used to aggregate individual events.
   */
  listAnIssueSHashes: () => Promise<({ latestEvent?: { eventID: string; dist: string | null; message: string; id: string; size: number; errors: ({ message?: string; type?: string; data?: { column?: number; source?: string; row?: number } })[]; platform: string; type: string; metadata: { type: string; value: string } | { title: string }; tags: ({ value?: string; key?: string; _meta?: string | null })[]; dateCreated: string; dateReceived: string; user: { username: string | null; name: string | null; ip_address: string | null; email: string | null; data: { isStaff?: boolean } | null; id: string } | null; entries: ({ type: string; data: { values: ({ category: string; level: string; event_id: string | null; timestamp: string; data: { [key: string]: unknown } | null; message: string | null; type: string })[] } } | { type: string; data: { fragment: string | null; cookies: ((string)[])[] | null; inferredContentType: string | null; env: { ENV?: string } | null; headers: ((string)[])[]; url: string; query: ((string)[])[]; data: { [key: string]: unknown } | null; method: string | null } } | { type: string; data: { formatted: string } } | { type: string; data: { excOmitted: (number)[] | null; hasSystemFrames: boolean; values: ({ stacktrace: { frames: ({ function: string; errors: string | null; colNo: number | null; vars: { [key: string]: unknown } | null; package: string | null; absPath: string | null; inApp: boolean; lineNo: number; module: string; filename: string; platform: string | null; instructionAddr: string | null; context: ((number | string)[])[]; symbolAddr: string | null; trust: string | null; symbol: string | null })[]; framesOmitted: string | null; registers: string | null; hasSystemFrames: boolean } | null; module: string | null; rawStacktrace: { [key: string]: unknown } | null; mechanism: { type?: string; handled?: boolean } | null; threadId: string | null; value: string; type: string })[] } })[]; packages: { [key: string]: unknown }; sdk: { version?: string; name?: string }; _meta: { user?: string | null; context?: string | null; entries?: { [key: string]: unknown }; contexts?: string | null; message?: string | null; packages?: string | null; tags?: { [key: string]: unknown }; sdk?: string | null }; contexts: { ForbiddenError?: { status?: number; statusText?: string; responseJSON?: { detail?: string }; type?: string }; browser?: { version?: string; type?: string; name?: string }; os?: { version?: string; type?: string; name?: string }; trace?: { span_id?: string; type?: string; trace_id?: string; op?: string }; organization?: { type?: string; id?: string; slug?: string } }; fingerprints: (string)[]; context: { resp?: { status?: number; responseJSON?: { detail?: string }; name?: string; statusText?: string; message?: string; stack?: string }; session?: { foo?: string }; unauthorized?: boolean; url?: string }; groupID: string; title: string }; id?: string })[]>;

  /**
   * Return a list of releases for a given organization.
   */
  listAnOrganizationSReleases: () => Promise<({ id?: number; authors: ({ [key: string]: unknown })[]; commitCount: number; data: { [key: string]: unknown }; dateCreated: string; dateReleased: string | null; deployCount: number; firstEvent: string | null; lastCommit: { [key: string]: unknown } | null; lastDeploy: { environment: string; name: string | null; dateStarted: string | null; dateFinished: string; url: string | null; id: string } | string | null | null; lastEvent: string | null; newGroups: number; owner: { [key: string]: unknown } | null; projects: ({ name?: string; slug?: string })[]; ref: string | null; shortVersion: string; version: string; url: string | null })[]>;

  /**
   * Create a new release for the given organization.  Releases are used by Sentry to improve its error reporting abilities by correlating first seen events with the release that might have introduced the problem. Releases are also necessary for source maps and other debug features that require manual upload for functioning well.
   */
  createANewReleaseForAnOrganization: () => Promise<{ id?: number; authors: ({ [key: string]: unknown })[]; commitCount: number; data: { [key: string]: unknown }; dateCreated: string; dateReleased: string | null; deployCount: number; firstEvent: string | null; lastCommit: { [key: string]: unknown } | null; lastDeploy: { environment: string; name: string | null; dateStarted: string | null; dateFinished: string; url: string | null; id: string } | string | null | null; lastEvent: string | null; newGroups: number; owner: { [key: string]: unknown } | null; projects: ({ name?: string; slug?: string })[]; ref: string | null; shortVersion: string; version: string; url: string | null }>;

  /**
   * Return a list of files for a given release.
   */
  listAnOrganizationSReleaseFiles: () => Promise<({ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number })[]>;

  /**
   * Upload a new file for the given release.  Unlike other API requests, files must be uploaded using the traditional multipart/form-data content-type.  Requests to this endpoint should use the region-specific domain eg. `us.sentry.io` or `de.sentry.io`.  The optional 'name' attribute should reflect the absolute path that this file will be referenced as. For example, in the case of JavaScript you might specify the full web URI.
   */
  uploadANewOrganizationReleaseFile: () => Promise<unknown>;

  /**
   * Return a list of files for a given release.
   */
  listAProjectSReleaseFiles: () => Promise<({ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number })[]>;

  /**
   * Upload a new file for the given release.  Unlike other API requests, files must be uploaded using the traditional multipart/form-data content-type.  Requests to this endpoint should use the region-specific domain eg. `us.sentry.io` or `de.sentry.io`  The optional 'name' attribute should reflect the absolute path that this file will be referenced as. For example, in the case of JavaScript you might specify the full web URI.
   */
  uploadANewProjectReleaseFile: () => Promise<{ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number }>;

  /**
   * Retrieve a file for a given release.
   */
  retrieveAnOrganizationReleaseSFile: () => Promise<{ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number }>;

  /**
   * Update an organization release file.
   */
  updateAnOrganizationReleaseFile: () => Promise<{ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number }>;

  /**
   * Delete a file for a given release.
   */
  deleteAnOrganizationReleaseSFile: () => Promise<unknown>;

  /**
   * Retrieve a file for a given release.
   */
  retrieveAProjectReleaseSFile: () => Promise<{ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number }>;

  /**
   * Update a project release file.
   */
  updateAProjectReleaseFile: () => Promise<{ sha1: string; dist: string | null; name: string; dateCreated: string; headers: { "Content-Type"?: string }; id: string; size: number }>;

  /**
   * Delete a file for a given release.
   */
  deleteAProjectReleaseSFile: () => Promise<unknown>;

  /**
   * List an organization release's commits.
   */
  listAnOrganizationReleaseSCommits: () => Promise<({ dateCreated: string; id: string; message: string | null })[]>;

  /**
   * List a project release's commits.
   */
  listAProjectReleaseSCommits: () => Promise<({ dateCreated: string; id: string; message: string | null })[]>;

  /**
   * Retrieve files changed in a release's commits
   */
  retrieveFilesChangedInAReleaseSCommits: () => Promise<unknown>;

  /**
   * Return a list of integration platform installations for a given organization.
   */
  listAnOrganizationSIntegrationPlatformInstallations: () => Promise<({ app: { uuid: string; slug: string; sentryAppId: number }; organization: { slug: string }; uuid: string; status: string })[]>;

  /**
   * Create or update an external issue from an integration platform integration.
   */
  createOrUpdateAnExternalIssue: () => Promise<{ id: string; issueId: string; serviceType: string; displayName: string; webUrl: string }>;

  /**
   * Delete an external issue.
   */
  deleteAnExternalIssue: () => Promise<unknown>;

  /**
   * Enables Spike Protection feature for some of the projects within the organization.
   */
  enableSpikeProtection: () => Promise<unknown>;

  /**
   * Disables Spike Protection feature for some of the projects within the organization.
   */
  disableSpikeProtection: () => Promise<unknown>;

  /**
   * Return details on an individual issue, including its basic stats, comment and user-report counts, and a summary of the latest event.
   */
  retrieveAnIssue: () => Promise<{ isUnhandled?: boolean; count?: string; userCount?: number; firstSeen?: string | null; lastSeen?: string | null; id: string; shareId: string | null; shortId: string; title: string; culprit: string | null; permalink: string; logger: string | null; level: string; status: string; statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown }; substatus: string | null; isPublic: boolean; platform: string | null; priority: string | null; priorityLockedAt: string | null; seerFixabilityScore: number | null; seerAutofixLastTriggered: string | null; seerExplorerAutofixLastTriggered: string | null; project: { id: string; name: string; slug: string; platform: string | null }; type: string; issueType: string; issueCategory: string; metadata: { [key: string]: unknown | undefined }; numComments: number; assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null; isBookmarked: boolean; isSubscribed: boolean; subscriptionDetails: { disabled?: boolean; reason?: string } | null; hasSeen: boolean; annotations: ({ displayName: string; url: string })[]; firstRelease?: { [key: string]: unknown | undefined } | null; lastRelease?: { [key: string]: unknown | undefined } | null; tags?: ({ [key: string]: unknown | undefined })[]; stats?: { [key: string]: ((number)[])[] | undefined }; inbox?: { [key: string]: unknown | undefined } | null; owners?: ({ [key: string]: unknown | undefined })[] | null; forecast?: { [key: string]: unknown | undefined }; integrationIssues?: ({ [key: string]: unknown | undefined })[]; sentryAppIssues?: ({ [key: string]: unknown | undefined })[]; latestEventHasAttachments?: boolean; activity: ({ [key: string]: unknown | undefined })[]; seenBy: ({ [key: string]: unknown | undefined })[]; pluginActions: (unknown)[]; pluginIssues: ({ [key: string]: unknown | undefined })[]; pluginContexts: ({ [key: string]: unknown | undefined })[]; userReportCount: number; participants: ({ [key: string]: unknown | undefined })[] }>;

  /**
   * Update an individual issue's attributes. Only the attributes submitted are modified.
   */
  updateAnIssue: () => Promise<{ isUnhandled?: boolean; count?: string; userCount?: number; firstSeen?: string | null; lastSeen?: string | null; id: string; shareId: string | null; shortId: string; title: string; culprit: string | null; permalink: string; logger: string | null; level: string; status: string; statusDetails: { autoResolved?: boolean; ignoreCount?: number; ignoreUntil?: string; ignoreUserCount?: number; ignoreUserWindow?: number; ignoreWindow?: number; actor?: { identities?: ({ id: string; name: string; organization: { slug: string; name: string }; provider: { id: string; name: string }; dateVerified: string; dateSynced: string })[]; avatar?: { avatarType?: string; avatarUuid?: string | null; avatarUrl?: string | null }; authenticators?: (unknown)[]; canReset2fa?: boolean; id: string; name: string; username: string; email: string; avatarUrl: string; isActive: boolean; isSuspended: boolean; hasPasswordAuth: boolean; isManaged: boolean; dateJoined: string; lastLogin: string | null; has2fa: boolean; lastActive: string | null; isSuperuser: boolean; isStaff: boolean; experiments: { [key: string]: unknown | undefined }; emails: ({ id: string; email: string; is_verified: boolean })[] }; inNextRelease?: boolean; inRelease?: string; inCommit?: string; pendingEvents?: number; info?: unknown }; substatus: string | null; isPublic: boolean; platform: string | null; priority: string | null; priorityLockedAt: string | null; seerFixabilityScore: number | null; seerAutofixLastTriggered: string | null; seerExplorerAutofixLastTriggered: string | null; project: { id: string; name: string; slug: string; platform: string | null }; type: string; issueType: string; issueCategory: string; metadata: { [key: string]: unknown | undefined }; numComments: number; assignedTo: { type: "user" | "team"; id: string; name: string; email?: string } | null; isBookmarked: boolean; isSubscribed: boolean; subscriptionDetails: { disabled?: boolean; reason?: string } | null; hasSeen: boolean; annotations: ({ displayName: string; url: string })[] }>;

  /**
   * Asynchronously queue an individual issue for deletion.
   */
  removeAnIssue: () => Promise<unknown>;

  /**
   * Retrieve the current detailed state of an issue fix process for a specific issue including:  - Current status - Steps performed and their outcomes - Repository information and permissions - Root Cause Analysis - Proposed Solution - Generated code changes  This endpoint although documented is still experimental and the payload may change in the future.
   */
  retrieveSeerIssueFixState: () => Promise<{ autofix: { [key: string]: unknown | undefined } | null }>;

  /**
   * Trigger a Seer Issue Fix run for a specific issue.  The issue fix process can: - Identify the root cause of the issue - Propose a solution - Generate code changes - Create a pull request with the fix  The process runs asynchronously, and you can get the state using the GET endpoint.
   */
  startSeerIssueFix: () => Promise<unknown>;

  /**
   * Return a list of error events bound to an issue
   */
  listAnIssueSEvents: () => Promise<({ id: string; "event.type": string; groupID: string | null; eventID: string; projectID: string; message: string; title: string; location: string | null; culprit: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string | null; dateCreated: string; crashFile: string | null; metadata: { [key: string]: unknown | undefined } | null })[]>;

  /**
   * Retrieves the details of an issue event.
   */
  retrieveAnIssueEvent: () => Promise<{ id: string; groupID: string | null; eventID: string; projectID: string; message: string | null; title: string; location: string | null; user: { id?: string | null; email?: string | null; username?: string | null; ip_address?: string | null; name?: string | null; geo?: { [key: string]: string | undefined } | null; data?: { [key: string]: unknown | undefined } | null } | null; tags: ({ query?: string; key: string; value: string })[]; platform: string; dateReceived: string | null; contexts: { [key: string]: unknown | undefined } | null; size: number | null; entries: (unknown)[]; dist: string | null; sdk: { [key: string]: string | undefined }; context: { [key: string]: unknown | undefined } | null; packages: { [key: string]: unknown | undefined }; type: string; metadata: unknown; errors: (unknown)[]; occurrence: unknown; _meta: { [key: string]: unknown | undefined }; crashFile?: string | null; culprit?: string | null; dateCreated?: string; fingerprints?: (string)[]; groupingConfig?: unknown; startTimestamp?: string; endTimestamp?: string; measurements?: unknown; breakdowns?: unknown; release: { id?: number; commitCount?: number; data?: { [key: string]: unknown | undefined }; dateCreated?: string; dateReleased?: string | null; deployCount?: number; ref?: string | null; lastCommit?: { [key: string]: unknown | undefined } | null; lastDeploy?: { dateStarted?: string | null; url?: string | null; id: string; environment: string; dateFinished: string; name: string } | null; status?: string; url?: string | null; userAgent?: string | null; version?: string | null; versionInfo?: { description?: string; package: string | null; version: { [key: string]: unknown | undefined }; buildHash: string | null } | null } | null; userReport: { id: string; eventID: string; name: string | null; email: string | null; comments: string; dateCreated: string; user: { id: string; username: string | null; email: string | null; name: string | null; ipAddress: string | null; avatarUrl: string | null } | null; event: { id: string; eventID: string } } | null; sdkUpdates: ({ [key: string]: unknown | undefined })[]; resolvedWith: (string)[]; nextEventID: string | null; previousEventID: string | null }>;

  /**
   * Retrieve custom integration issue links for the given Sentry issue
   */
  retrieveCustomIntegrationIssueLinksForTheGivenSentryIssue: () => Promise<({ id: string; issueId: string; serviceType: string; displayName: string; webUrl: string })[]>;

  /**
   * Return a list of values associated with this key for an issue. When paginated can return at most 1000 values.
   */
  retrieveTagDetails: () => Promise<{ uniqueValues?: number | null; totalValues?: number | null; topValues?: ({ query?: string | null; key: string; name: string; value: string | null; count: number | null; lastSeen: string | null; firstSeen: string | null })[] | null; key: string; name: string }>;
};

export * from "./schemas.js";
