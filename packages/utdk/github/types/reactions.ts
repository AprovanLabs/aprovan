import type { Reaction } from "./schemas.js";

export type ReactionsOperations = {
  /**
   * List reactions for a commit comment
   * @see https://docs.github.com/rest/reactions/reactions#list-reactions-for-a-commit-comment
   */
  listForCommitComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
    /** Returns a single [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions). Omit this parameter to list all reactions to a commit comment. */
    content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Reaction)[]>;

  /**
   * Create reaction for a commit comment
   * @see https://docs.github.com/rest/reactions/reactions#create-reaction-for-a-commit-comment
   */
  createForCommitComment: (input: {
    /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the commit comment. */
    content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<Reaction>;

  /**
   * Delete a commit comment reaction
   * @see https://docs.github.com/rest/reactions/reactions#delete-a-commit-comment-reaction
   */
  deleteForCommitComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
    /** The unique identifier of the reaction. */
    reaction_id: number;
  }) => Promise<unknown>;

  /**
   * List reactions for an issue comment
   * @see https://docs.github.com/rest/reactions/reactions#list-reactions-for-an-issue-comment
   */
  listForIssueComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
    /** Returns a single [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions). Omit this parameter to list all reactions to an issue comment. */
    content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Reaction)[]>;

  /**
   * Create reaction for an issue comment
   * @see https://docs.github.com/rest/reactions/reactions#create-reaction-for-an-issue-comment
   */
  createForIssueComment: (input: {
    /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the issue comment. */
    content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<Reaction>;

  /**
   * Delete an issue comment reaction
   * @see https://docs.github.com/rest/reactions/reactions#delete-an-issue-comment-reaction
   */
  deleteForIssueComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
    /** The unique identifier of the reaction. */
    reaction_id: number;
  }) => Promise<unknown>;

  /**
   * List reactions for an issue
   * @see https://docs.github.com/rest/reactions/reactions#list-reactions-for-an-issue
   */
  listForIssue: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** Returns a single [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions). Omit this parameter to list all reactions to an issue. */
    content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Reaction)[]>;

  /**
   * Create reaction for an issue
   * @see https://docs.github.com/rest/reactions/reactions#create-reaction-for-an-issue
   */
  createForIssue: (input: {
    /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the issue. */
    content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
  }) => Promise<Reaction>;

  /**
   * Delete an issue reaction
   * @see https://docs.github.com/rest/reactions/reactions#delete-an-issue-reaction
   */
  deleteForIssue: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the issue. */
    issue_number: number;
    /** The unique identifier of the reaction. */
    reaction_id: number;
  }) => Promise<unknown>;

  /**
   * List reactions for a pull request review comment
   * @see https://docs.github.com/rest/reactions/reactions#list-reactions-for-a-pull-request-review-comment
   */
  listForPullRequestReviewComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
    /** Returns a single [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions). Omit this parameter to list all reactions to a pull request review comment. */
    content?: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Reaction)[]>;

  /**
   * Create reaction for a pull request review comment
   * @see https://docs.github.com/rest/reactions/reactions#create-reaction-for-a-pull-request-review-comment
   */
  createForPullRequestReviewComment: (input: {
    /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the pull request review comment. */
    content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<Reaction>;

  /**
   * Delete a pull request comment reaction
   * @see https://docs.github.com/rest/reactions/reactions#delete-a-pull-request-comment-reaction
   */
  deleteForPullRequestComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
    /** The unique identifier of the reaction. */
    reaction_id: number;
  }) => Promise<unknown>;

  /**
   * List reactions for a release
   * @see https://docs.github.com/rest/reactions/reactions#list-reactions-for-a-release
   */
  listForRelease: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
    /** Returns a single [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions). Omit this parameter to list all reactions to a release. */
    content?: "+1" | "laugh" | "heart" | "hooray" | "rocket" | "eyes";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Reaction)[]>;

  /**
   * Create reaction for a release
   * @see https://docs.github.com/rest/reactions/reactions#create-reaction-for-a-release
   */
  createForRelease: (input: {
    /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the release. */
    content: "+1" | "laugh" | "heart" | "hooray" | "rocket" | "eyes";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
  }) => Promise<Reaction>;

  /**
   * Delete a release reaction
   * @see https://docs.github.com/rest/reactions/reactions#delete-a-release-reaction
   */
  deleteForRelease: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the release. */
    release_id: number;
    /** The unique identifier of the reaction. */
    reaction_id: number;
  }) => Promise<unknown>;
};
