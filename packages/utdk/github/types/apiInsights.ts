import type { ApiInsightsRouteStats, ApiInsightsSubjectStats, ApiInsightsSummaryStats, ApiInsightsTimeStats, ApiInsightsUserStats } from "./schemas.js";

export type ApiInsightsOperations = {
  /**
   * Get route stats by actor
   * @see https://docs.github.com/rest/orgs/api-insights#get-route-stats-by-actor
   */
  getRouteStatsByActor: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The type of the actor */
    actor_type: "installation" | "classic_pat" | "fine_grained_pat" | "oauth_app" | "github_app_user_to_server";
    /** The ID of the actor */
    actor_id: number;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** The property to sort the results by. */
    sort?: ("last_rate_limited_timestamp" | "last_request_timestamp" | "rate_limited_request_count" | "http_method" | "api_route" | "total_request_count")[];
    /** Providing a substring will filter results where the API route contains the substring. This is a case-insensitive search. */
    api_route_substring?: string;
  }) => Promise<ApiInsightsRouteStats>;

  /**
   * Get subject stats
   * @see https://docs.github.com/rest/orgs/api-insights#get-subject-stats
   */
  getSubjectStats: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** The property to sort the results by. */
    sort?: ("last_rate_limited_timestamp" | "last_request_timestamp" | "rate_limited_request_count" | "subject_name" | "total_request_count")[];
    /** Providing a substring will filter results where the subject name contains the substring. This is a case-insensitive search. */
    subject_name_substring?: string;
  }) => Promise<ApiInsightsSubjectStats>;

  /**
   * Get summary stats
   * @see https://docs.github.com/rest/orgs/api-insights#get-summary-stats
   */
  getSummaryStats: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
  }) => Promise<ApiInsightsSummaryStats>;

  /**
   * Get summary stats by user
   * @see https://docs.github.com/rest/orgs/api-insights#get-summary-stats-by-user
   */
  getSummaryStatsByUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the user to query for stats */
    user_id: string;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
  }) => Promise<ApiInsightsSummaryStats>;

  /**
   * Get summary stats by actor
   * @see https://docs.github.com/rest/orgs/api-insights#get-summary-stats-by-actor
   */
  getSummaryStatsByActor: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The type of the actor */
    actor_type: "installation" | "classic_pat" | "fine_grained_pat" | "oauth_app" | "github_app_user_to_server";
    /** The ID of the actor */
    actor_id: number;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
  }) => Promise<ApiInsightsSummaryStats>;

  /**
   * Get time stats
   * @see https://docs.github.com/rest/orgs/api-insights#get-time-stats
   */
  getTimeStats: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
    /** The increment of time used to breakdown the query results (5m, 10m, 1h, etc.) */
    timestamp_increment: string;
  }) => Promise<ApiInsightsTimeStats>;

  /**
   * Get time stats by user
   * @see https://docs.github.com/rest/orgs/api-insights#get-time-stats-by-user
   */
  getTimeStatsByUser: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the user to query for stats */
    user_id: string;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
    /** The increment of time used to breakdown the query results (5m, 10m, 1h, etc.) */
    timestamp_increment: string;
  }) => Promise<ApiInsightsTimeStats>;

  /**
   * Get time stats by actor
   * @see https://docs.github.com/rest/orgs/api-insights#get-time-stats-by-actor
   */
  getTimeStatsByActor: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The type of the actor */
    actor_type: "installation" | "classic_pat" | "fine_grained_pat" | "oauth_app" | "github_app_user_to_server";
    /** The ID of the actor */
    actor_id: number;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
    /** The increment of time used to breakdown the query results (5m, 10m, 1h, etc.) */
    timestamp_increment: string;
  }) => Promise<ApiInsightsTimeStats>;

  /**
   * Get user stats
   * @see https://docs.github.com/rest/orgs/api-insights#get-user-stats
   */
  getUserStats: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The ID of the user to query for stats */
    user_id: string;
    /** The minimum timestamp to query for stats. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    min_timestamp: string;
    /** The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    max_timestamp?: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** The property to sort the results by. */
    sort?: ("last_rate_limited_timestamp" | "last_request_timestamp" | "rate_limited_request_count" | "subject_name" | "total_request_count")[];
    /** Providing a substring will filter results where the actor name contains the substring. This is a case-insensitive search. */
    actor_name_substring?: string;
  }) => Promise<ApiInsightsUserStats>;
};
