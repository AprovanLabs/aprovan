import type { BasicError, Event, Feed, MinimalRepository, Repository, RepositorySubscription, SimpleUser, Stargazer, StarredRepository, Thread, ThreadSubscription } from "./schemas.js";

export type ActivityOperations = {
  /**
   * List public events
   * @see https://docs.github.com/rest/activity/events#list-public-events
   */
  listPublicEvents: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * Get feeds
   * @see https://docs.github.com/rest/activity/feeds#get-feeds
   */
  getFeeds: () => Promise<Feed>;

  /**
   * List public events for a network of repositories
   * @see https://docs.github.com/rest/activity/events#list-public-events-for-a-network-of-repositories
   */
  listPublicEventsForRepoNetwork: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List notifications for the authenticated user
   * @see https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user
   */
  listNotificationsForAuthenticatedUser: (input: {
    /** If `true`, show notifications marked as read. */
    all?: boolean;
    /** If `true`, only shows notifications in which the user is directly participating or mentioned. */
    participating?: boolean;
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    before?: string;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
    /** The number of results per page (max 50). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
  }) => Promise<(Thread)[]>;

  /**
   * Mark notifications as read
   * @see https://docs.github.com/rest/activity/notifications#mark-notifications-as-read
   */
  markNotificationsAsRead: (input: {
    /** Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp. */
    last_read_at?: string;
    /** Whether the notification has been read. */
    read?: boolean;
  }) => Promise<{ message?: string }>;

  /**
   * Get a thread
   * @see https://docs.github.com/rest/activity/notifications#get-a-thread
   */
  getThread: (input: {
    /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
    thread_id: number;
  }) => Promise<Thread>;

  /**
   * Mark a thread as read
   * @see https://docs.github.com/rest/activity/notifications#mark-a-thread-as-read
   */
  markThreadAsRead: (input: {
    /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
    thread_id: number;
  }) => Promise<BasicError>;

  /**
   * Mark a thread as done
   * @see https://docs.github.com/rest/activity/notifications#mark-a-thread-as-done
   */
  markThreadAsDone: (input: {
    /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
    thread_id: number;
  }) => Promise<unknown>;

  /**
   * Get a thread subscription for the authenticated user
   * @see https://docs.github.com/rest/activity/notifications#get-a-thread-subscription-for-the-authenticated-user
   */
  getThreadSubscriptionForAuthenticatedUser: (input: {
    /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
    thread_id: number;
  }) => Promise<ThreadSubscription>;

  /**
   * Set a thread subscription
   * @see https://docs.github.com/rest/activity/notifications#set-a-thread-subscription
   */
  setThreadSubscription: (input: {
    /** Whether to block all notifications from a thread. */
    ignored?: boolean;
    /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
    thread_id: number;
  }) => Promise<ThreadSubscription>;

  /**
   * Delete a thread subscription
   * @see https://docs.github.com/rest/activity/notifications#delete-a-thread-subscription
   */
  deleteThreadSubscription: (input: {
    /** The unique identifier of the notification thread. This corresponds to the value returned in the `id` field when you retrieve notifications (for example with the [`GET /notifications` operation](https://docs.github.com/rest/activity/notifications#list-notifications-for-the-authenticated-user)). */
    thread_id: number;
  }) => Promise<BasicError>;

  /**
   * List public organization events
   * @see https://docs.github.com/rest/activity/events#list-public-organization-events
   */
  listPublicOrgEvents: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List repository events
   * @see https://docs.github.com/rest/activity/events#list-repository-events
   */
  listRepoEvents: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List repository notifications for the authenticated user
   * @see https://docs.github.com/rest/activity/notifications#list-repository-notifications-for-the-authenticated-user
   */
  listRepoNotificationsForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** If `true`, show notifications marked as read. */
    all?: boolean;
    /** If `true`, only shows notifications in which the user is directly participating or mentioned. */
    participating?: boolean;
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** Only show notifications updated before the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    before?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Thread)[]>;

  /**
   * Mark repository notifications as read
   * @see https://docs.github.com/rest/activity/notifications#mark-repository-notifications-as-read
   */
  markRepoNotificationsAsRead: (input: {
    /** Describes the last point that notifications were checked. Anything updated since this time will not be marked as read. If you omit this parameter, all notifications are marked as read. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. Default: The current timestamp. */
    last_read_at?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ message?: string; url?: string }>;

  /**
   * List stargazers
   * @see https://docs.github.com/rest/activity/starring#list-stargazers
   */
  listStargazersForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[] | (Stargazer)[]>;

  /**
   * List watchers
   * @see https://docs.github.com/rest/activity/watching#list-watchers
   */
  listWatchersForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Get a repository subscription
   * @see https://docs.github.com/rest/activity/watching#get-a-repository-subscription
   */
  getRepoSubscription: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<RepositorySubscription>;

  /**
   * Set a repository subscription
   * @see https://docs.github.com/rest/activity/watching#set-a-repository-subscription
   */
  setRepoSubscription: (input: {
    /** Determines if notifications should be received from this repository. */
    subscribed?: boolean;
    /** Determines if all notifications should be blocked from this repository. */
    ignored?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<RepositorySubscription>;

  /**
   * Delete a repository subscription
   * @see https://docs.github.com/rest/activity/watching#delete-a-repository-subscription
   */
  deleteRepoSubscription: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * List repositories starred by the authenticated user
   * @see https://docs.github.com/rest/activity/starring#list-repositories-starred-by-the-authenticated-user
   */
  listReposStarredByAuthenticatedUser: (input: {
    /** The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to. */
    sort?: "created" | "updated";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Repository)[]>;

  /**
   * Check if a repository is starred by the authenticated user
   * @see https://docs.github.com/rest/activity/starring#check-if-a-repository-is-starred-by-the-authenticated-user
   */
  checkRepoIsStarredByAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Star a repository for the authenticated user
   * @see https://docs.github.com/rest/activity/starring#star-a-repository-for-the-authenticated-user
   */
  starRepoForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Unstar a repository for the authenticated user
   * @see https://docs.github.com/rest/activity/starring#unstar-a-repository-for-the-authenticated-user
   */
  unstarRepoForAuthenticatedUser: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * List repositories watched by the authenticated user
   * @see https://docs.github.com/rest/activity/watching#list-repositories-watched-by-the-authenticated-user
   */
  listWatchedReposForAuthenticatedUser: (input: {
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;

  /**
   * List events for the authenticated user
   * @see https://docs.github.com/rest/activity/events#list-events-for-the-authenticated-user
   */
  listEventsForAuthenticatedUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List organization events for the authenticated user
   * @see https://docs.github.com/rest/activity/events#list-organization-events-for-the-authenticated-user
   */
  listOrgEventsForAuthenticatedUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The organization name. The name is not case sensitive. */
    org: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List public events for a user
   * @see https://docs.github.com/rest/activity/events#list-public-events-for-a-user
   */
  listPublicEventsForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List events received by the authenticated user
   * @see https://docs.github.com/rest/activity/events#list-events-received-by-the-authenticated-user
   */
  listReceivedEventsForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List public events received by a user
   * @see https://docs.github.com/rest/activity/events#list-public-events-received-by-a-user
   */
  listReceivedPublicEventsForUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Event)[]>;

  /**
   * List repositories starred by a user
   * @see https://docs.github.com/rest/activity/starring#list-repositories-starred-by-a-user
   */
  listReposStarredByUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to. */
    sort?: "created" | "updated";
    /** The direction to sort the results by. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(StarredRepository)[] | (Repository)[]>;

  /**
   * List repositories watched by a user
   * @see https://docs.github.com/rest/activity/watching#list-repositories-watched-by-a-user
   */
  listReposWatchedByUser: (input: {
    /** The handle for the GitHub user account. */
    username: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(MinimalRepository)[]>;
};
