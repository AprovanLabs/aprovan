export type PostmanExploreClient = {
  /**
   * Get details for a specific category
   * Tags: categories
   * Access as: postman-explore.getCategory(input)
   */
  getCategory: (input: { slug: string }) => Promise<{ data?: { id?: number; name?: string; summary?: string; description?: string; heroImageURL?: string; iconURL?: string; slug?: string; createdAt?: string; updatedAt?: string; publicURL?: string } }>;
  /**
   * Get total counts of entities on the network
   * Tags: stats
   * Access as: postman-explore.getNetworkEntityCounts(input)
   */
  getNetworkEntityCounts: (input: { flattenAPIVersions?: boolean }) => Promise<{ data?: { apiCount?: number; collectionCount?: number; flowCount?: number; notebookCount?: number; workspaceCount?: number; teamCount?: number }; meta?: { [key: string]: unknown } }>;
  /**
   * List all API categories
   * Tags: categories
   * Access as: postman-explore.listCategories(input)
   */
  listCategories: (input: { sort?: "spotlighted" }) => Promise<{ data?: ({ id?: number; name?: string; summary?: string; description?: string; heroImageURL?: string; iconURL?: string; slug?: string; createdAt?: string; updatedAt?: string; publicURL?: string })[] }>;
  /**
   * Browse public entities on the API network
   * Tags: browse
   * Access as: postman-explore.listNetworkEntities(input)
   */
  listNetworkEntities: (input: { entityType: "collection" | "workspace" | "api" | "flow"; limit?: number; offset?: number; sort?: "popular" | "recent" | "featured" | "new" | "week" | "alltime"; categoryId?: number }) => Promise<{ data?: ({ id?: number; entityId?: string; entityType?: "collection" | "workspace" | "api" | "flow"; name?: string; summary?: string; description?: string; type?: "public"; metrics?: ({ metricName?: "forkCount" | "monthForkCount" | "monthViewCount" | "monthWatchCount" | "publicViewCount" | "viewCount" | "watchCount" | "weekForkCount" | "weekViewCount" | "weekWatchCount"; metricValue?: number })[]; publisherType?: "team" | "user"; publisherId?: number; createdBy?: number; createdAt?: string; updatedAt?: string; categories?: ({ id?: number; slug?: string; name?: string; isDeleted?: boolean })[]; tags?: (string)[]; meta?: { publisherId?: string; workspaceId?: string; publisherType?: string; workspaceSlug?: string }; redirectURL?: string; redirectURLV2?: string })[]; meta?: { limit?: number; offset?: number; count?: number; totalCount?: number; publisherInfo?: { [key: string]: unknown }; model?: string; action?: string } }>;
  /**
   * List publisher teams on the API network
   * Tags: teams
   * Access as: postman-explore.listTeams(input)
   */
  listTeams: (input: { limit?: number; sort?: "popular" }) => Promise<{ data?: ({ id?: string; name?: string; description?: string; categories?: ({ id?: number; slug?: string; name?: string; isDeleted?: boolean })[]; tags?: (string)[]; profileURL?: string; publicURL?: string; createdAt?: string; updatedAt?: string; metrics?: ({ team?: string; viewCount?: number; teamPublisherScore?: number; apinetworkentityCount?: number; collectionCount?: number; apiCount?: number; workspaceCount?: number })[] })[] }>;
  /**
   * Full-text search across the public API network
   * Tags: search
   * Access as: postman-explore.searchAll(input)
   */
  searchAll: (input: { queryText: string; size: number; from?: number; domain?: "all" | "public"; queryIndices: ("runtime.collection" | "collaboration.workspace" | "runtime.request" | "flow.flow" | "apinetwork.team")[]; mergeEntities?: boolean; nested?: boolean; nonNestedRequests?: boolean; filter?: { [key: string]: unknown } }) => Promise<{ data?: ({ score?: number; normalizedScore?: number; document?: { id?: string; name?: string; summary?: string; entityType?: "collection" | "workspace" | "request" | "flow" | "team"; documentType?: string; isPublic?: boolean; isPublisherVerified?: boolean; publisherName?: string; publisherHandle?: string; publisherType?: "team" | "user"; publisherLogo?: string; categories?: ({ [key: string]: unknown })[]; tags?: (string)[]; views?: number; forkCount?: number; watcherCount?: number; requestCount?: number; workspaces?: ({ id?: string; name?: string; slug?: string; visibilityStatus?: string })[] } })[]; meta?: { total?: number; nextCursor?: string } }>;
};
