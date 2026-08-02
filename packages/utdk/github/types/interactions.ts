import type { BasicError, InteractionExpiry, InteractionGroup, InteractionLimitResponse, SimpleUser } from "./schemas.js";

export type InteractionsOperations = {
  /**
   * Get interaction restrictions for an organization
   * @see https://docs.github.com/rest/interactions/orgs#get-interaction-restrictions-for-an-organization
   */
  getRestrictionsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<InteractionLimitResponse | { [key: string]: unknown }>;

  /**
   * Set interaction restrictions for an organization
   * @see https://docs.github.com/rest/interactions/orgs#set-interaction-restrictions-for-an-organization
   */
  setRestrictionsForOrg: (input: {
    limit: InteractionGroup;
    expiry?: InteractionExpiry;
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<InteractionLimitResponse>;

  /**
   * Remove interaction restrictions for an organization
   * @see https://docs.github.com/rest/interactions/orgs#remove-interaction-restrictions-for-an-organization
   */
  removeRestrictionsForOrg: (input: {
    /** The organization name. The name is not case sensitive. */
    org: string;
  }) => Promise<unknown>;

  /**
   * Get interaction restrictions for a repository
   * @see https://docs.github.com/rest/interactions/repos#get-interaction-restrictions-for-a-repository
   */
  getRestrictionsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<InteractionLimitResponse | { [key: string]: unknown }>;

  /**
   * Set interaction restrictions for a repository
   * @see https://docs.github.com/rest/interactions/repos#set-interaction-restrictions-for-a-repository
   */
  setRestrictionsForRepo: (input: {
    limit: InteractionGroup;
    expiry?: InteractionExpiry;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<InteractionLimitResponse>;

  /**
   * Remove interaction restrictions for a repository
   * @see https://docs.github.com/rest/interactions/repos#remove-interaction-restrictions-for-a-repository
   */
  removeRestrictionsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<unknown>;

  /**
   * Get pull request creation cap bypass list for a repository
   * @see https://docs.github.com/rest/interactions/repos#get-pull-request-creation-cap-bypass-list-for-a-repository
   */
  getPullRequestBypassListForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<(SimpleUser)[]>;

  /**
   * Add users to the pull request creation cap bypass list for a repository
   * @see https://docs.github.com/rest/interactions/repos#add-users-to-the-pull-request-creation-cap-bypass-list-for-a-repository
   */
  setPullRequestBypassListForRepo: (input: {
    /** A list of user logins to add or remove from the bypass list. */
    users: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Remove users from the pull request creation cap bypass list for a repository
   * @see https://docs.github.com/rest/interactions/repos#remove-users-from-the-pull-request-creation-cap-bypass-list-for-a-repository
   */
  removePullRequestBypassListForRepo: (input: {
    /** A list of user logins to add or remove from the bypass list. */
    users: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<BasicError>;

  /**
   * Get pull request creation cap for a repository
   * @see https://docs.github.com/rest/interactions/repos#get-pull-request-creation-cap-for-a-repository
   */
  getPullRequestCreationCapForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ enabled: boolean; max_open_pull_requests: number }>;

  /**
   * Update pull request creation cap for a repository
   * @see https://docs.github.com/rest/interactions/repos#update-pull-request-creation-cap-for-a-repository
   */
  updatePullRequestCreationCapForRepo: (input: {
    /** Whether the pull request creation cap is enabled */
    enabled: boolean;
    /** The maximum number of open pull requests a user can have at one time */
    max_open_pull_requests?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<{ enabled: boolean; max_open_pull_requests: number }>;

  /**
   * Get interaction restrictions for your public repositories
   * @see https://docs.github.com/rest/interactions/user#get-interaction-restrictions-for-your-public-repositories
   */
  getRestrictionsForAuthenticatedUser: () => Promise<InteractionLimitResponse | { [key: string]: unknown }>;

  /**
   * Set interaction restrictions for your public repositories
   * @see https://docs.github.com/rest/interactions/user#set-interaction-restrictions-for-your-public-repositories
   */
  setRestrictionsForAuthenticatedUser: (input: {
    limit: InteractionGroup;
    expiry?: InteractionExpiry;
  }) => Promise<InteractionLimitResponse>;

  /**
   * Remove interaction restrictions from your public repositories
   * @see https://docs.github.com/rest/interactions/user#remove-interaction-restrictions-from-your-public-repositories
   */
  removeRestrictionsForAuthenticatedUser: () => Promise<unknown>;
};
