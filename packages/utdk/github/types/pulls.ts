import type { BasicError, Commit, DiffEntry, PullRequest, PullRequestMergeResult, PullRequestReview, PullRequestReviewComment, PullRequestReviewRequest, PullRequestSimple, ReviewComment } from "./schemas.js";

export type PullsOperations = {
  /**
   * List pull requests
   * @see https://docs.github.com/rest/pulls/pulls#list-pull-requests
   */
  list: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** Either `open`, `closed`, or `all` to filter by state. */
    state?: "open" | "closed" | "all";
    /** Filter pulls by head user or head organization and branch name in the format of `user:ref-name` or `organization:ref-name`. For example: `github:new-script-format` or `octocat:test-branch`. */
    head?: string;
    /** Filter pulls by base branch name. Example: `gh-pages`. */
    base?: string;
    /** What to sort results by. `popularity` will sort by the number of comments. `long-running` will sort by date created and will limit the results to pull requests that have been open for more than a month and have had activity within the past month. */
    sort?: "created" | "updated" | "popularity" | "long-running";
    /** The direction of the sort. Default: `desc` when sort is `created` or sort is not specified, otherwise `asc`. */
    direction?: "asc" | "desc";
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(PullRequestSimple)[]>;

  /**
   * Create a pull request
   * @see https://docs.github.com/rest/pulls/pulls#create-a-pull-request
   */
  create: (input: {
    /** The title of the new pull request. Required unless `issue` is specified. */
    title?: string;
    /** The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace `head` with a user like this: `username:branch`. */
    head: string;
    /** The name of the repository where the changes in the pull request were made. This field is required for cross-repository pull requests if both repositories are owned by the same organization. */
    head_repo?: string;
    /** The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository. */
    base: string;
    /** The contents of the pull request. */
    body?: string;
    /** Indicates whether [maintainers can modify](https://docs.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) the pull request. */
    maintainer_can_modify?: boolean;
    /** Indicates whether the pull request is a draft. See "[Draft Pull Requests](https://docs.github.com/articles/about-pull-requests#draft-pull-requests)" in the GitHub Help documentation to learn more. */
    draft?: boolean;
    /** An issue in the repository to convert to a pull request. The issue title, body, and comments will become the title, body, and comments on the new pull request. Required unless `title` is specified. */
    issue?: number;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
  }) => Promise<PullRequest>;

  /**
   * List review comments in a repository
   * @see https://docs.github.com/rest/pulls/comments#list-review-comments-in-a-repository
   */
  listReviewCommentsForRepo: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    sort?: "created" | "updated" | "created_at";
    /** The direction to sort results. Ignored without `sort` parameter. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(PullRequestReviewComment)[]>;

  /**
   * Get a review comment for a pull request
   * @see https://docs.github.com/rest/pulls/comments#get-a-review-comment-for-a-pull-request
   */
  getReviewComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<PullRequestReviewComment>;

  /**
   * Update a review comment for a pull request
   * @see https://docs.github.com/rest/pulls/comments#update-a-review-comment-for-a-pull-request
   */
  updateReviewComment: (input: {
    /** The text of the reply to the review comment. */
    body: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<PullRequestReviewComment>;

  /**
   * Delete a review comment for a pull request
   * @see https://docs.github.com/rest/pulls/comments#delete-a-review-comment-for-a-pull-request
   */
  deleteReviewComment: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<BasicError>;

  /**
   * Get a pull request
   * @see https://docs.github.com/rest/pulls/pulls#get-a-pull-request
   */
  get: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequest>;

  /**
   * Update a pull request
   * @see https://docs.github.com/rest/pulls/pulls#update-a-pull-request
   */
  update: (input: {
    /** The title of the pull request. */
    title?: string;
    /** The contents of the pull request. */
    body?: string;
    /** State of this Pull Request. Either `open` or `closed`. */
    state?: "open" | "closed";
    /** The name of the branch you want your changes pulled into. This should be an existing branch on the current repository. You cannot update the base branch on a pull request to point to another repository. */
    base?: string;
    /** Indicates whether [maintainers can modify](https://docs.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork/) the pull request. */
    maintainer_can_modify?: boolean;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequest>;

  /**
   * List review comments on a pull request
   * @see https://docs.github.com/rest/pulls/comments#list-review-comments-on-a-pull-request
   */
  listReviewComments: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The property to sort the results by. */
    sort?: "created" | "updated";
    /** The direction to sort results. Ignored without `sort` parameter. */
    direction?: "asc" | "desc";
    /** Only show results that were last updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
    since?: string;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(PullRequestReviewComment)[]>;

  /**
   * Create a review comment for a pull request
   * @see https://docs.github.com/rest/pulls/comments#create-a-review-comment-for-a-pull-request
   */
  createReviewComment: (input: {
    /** The text of the review comment. */
    body: string;
    /** The SHA of the commit needing a comment. Not using the latest commit SHA may render your comment outdated if a subsequent commit modifies the line you specify as the `position`. */
    commit_id: string;
    /** The relative path to the file that necessitates a comment. */
    path: string;
    /** **This parameter is closing down. Use `line` instead**. The position in the diff where you want to add a review comment. Note this value is not the same as the line number in the file. The position value equals the number of lines down from the first "@@" hunk header in the file you want to add a comment. The line just below the "@@" line is position 1, the next line is position 2, and so on. The position in the diff continues to increase through lines of whitespace and additional hunks until the beginning of a new file. */
    position?: number;
    /** In a split diff view, the side of the diff that the pull request's changes appear on. Can be `LEFT` or `RIGHT`. Use `LEFT` for deletions that appear in red. Use `RIGHT` for additions that appear in green or unchanged lines that appear in white and are shown for context. For a multi-line comment, side represents whether the last line of the comment range is a deletion or addition. For more information, see "[Diff view options](https://docs.github.com/articles/about-comparing-branches-in-pull-requests#diff-view-options)" in the GitHub Help documentation. */
    side?: "LEFT" | "RIGHT";
    /** **Required unless using `subject_type:file`**. The line of the blob in the pull request diff that the comment applies to. For a multi-line comment, the last line of the range that your comment applies to. */
    line?: number;
    /** **Required when using multi-line comments unless using `in_reply_to`**. The `start_line` is the first line in the pull request diff that your multi-line comment applies to. To learn more about multi-line comments, see "[Commenting on a pull request](https://docs.github.com/articles/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)" in the GitHub Help documentation. */
    start_line?: number;
    /** **Required when using multi-line comments unless using `in_reply_to`**. The `start_side` is the starting side of the diff that the comment applies to. Can be `LEFT` or `RIGHT`. To learn more about multi-line comments, see "[Commenting on a pull request](https://docs.github.com/articles/commenting-on-a-pull-request#adding-line-comments-to-a-pull-request)" in the GitHub Help documentation. See `side` in this table for additional context. */
    start_side?: "LEFT" | "RIGHT" | "side";
    /** The ID of the review comment to reply to. To find the ID of a review comment with ["List review comments on a pull request"](#list-review-comments-on-a-pull-request). When specified, all parameters other than `body` in the request body are ignored. */
    in_reply_to?: number;
    /** The level at which the comment is targeted. */
    subject_type?: "line" | "file";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequestReviewComment>;

  /**
   * Create a reply for a review comment
   * @see https://docs.github.com/rest/pulls/comments#create-a-reply-for-a-review-comment
   */
  createReplyForReviewComment: (input: {
    /** The text of the review comment. */
    body: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the comment. */
    comment_id: number;
  }) => Promise<PullRequestReviewComment>;

  /**
   * List commits on a pull request
   * @see https://docs.github.com/rest/pulls/pulls#list-commits-on-a-pull-request
   */
  listCommits: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(Commit)[]>;

  /**
   * List pull requests files
   * @see https://docs.github.com/rest/pulls/pulls#list-pull-requests-files
   */
  listFiles: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(DiffEntry)[]>;

  /**
   * Check if a pull request has been merged
   * @see https://docs.github.com/rest/pulls/pulls#check-if-a-pull-request-has-been-merged
   */
  checkIfMerged: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<unknown>;

  /**
   * Merge a pull request
   * @see https://docs.github.com/rest/pulls/pulls#merge-a-pull-request
   */
  merge: (input: {
    /** Title for the automatic commit message. */
    commit_title?: string;
    /** Extra detail to append to automatic commit message. */
    commit_message?: string;
    /** SHA that pull request head must match to allow merge. */
    sha?: string;
    /** The merge method to use. */
    merge_method?: "merge" | "squash" | "rebase";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequestMergeResult>;

  /**
   * Get all requested reviewers for a pull request
   * @see https://docs.github.com/rest/pulls/review-requests#get-all-requested-reviewers-for-a-pull-request
   */
  listRequestedReviewers: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequestReviewRequest>;

  /**
   * Request reviewers for a pull request
   * @see https://docs.github.com/rest/pulls/review-requests#request-reviewers-for-a-pull-request
   */
  requestReviewers: (input: {
    body?: unknown | unknown;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequestSimple>;

  /**
   * Remove requested reviewers from a pull request
   * @see https://docs.github.com/rest/pulls/review-requests#remove-requested-reviewers-from-a-pull-request
   */
  removeRequestedReviewers: (input: {
    /** An array of user `login`s that will be removed. */
    reviewers: (string)[];
    /** An array of team `slug`s that will be removed. */
    team_reviewers?: (string)[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequestSimple>;

  /**
   * List reviews for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#list-reviews-for-a-pull-request
   */
  listReviews: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(PullRequestReview)[]>;

  /**
   * Create a review for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#create-a-review-for-a-pull-request
   */
  createReview: (input: {
    /** The SHA of the commit that needs a review. Not using the latest commit SHA may render your review comment outdated if a subsequent commit modifies the line you specify as the `position`. Defaults to the most recent commit in the pull request when you do not specify a value. */
    commit_id?: string;
    /** **Required** when using `REQUEST_CHANGES` or `COMMENT` for the `event` parameter. The body text of the pull request review. */
    body?: string;
    /** The review action you want to perform. The review actions include: `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`. By leaving this blank, you set the review action state to `PENDING`, which means you will need to [submit the pull request review](https://docs.github.com/rest/pulls/reviews#submit-a-review-for-a-pull-request) when you are ready. */
    event?: "APPROVE" | "REQUEST_CHANGES" | "COMMENT";
    /** Use the following table to specify the location, destination, and contents of the draft review comment. */
    comments?: ({ path: string; position?: number; body: string; line?: number; side?: string; start_line?: number; start_side?: string })[];
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<PullRequestReview>;

  /**
   * Get a review for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#get-a-review-for-a-pull-request
   */
  getReview: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the review. */
    review_id: number;
  }) => Promise<PullRequestReview>;

  /**
   * Update a review for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#update-a-review-for-a-pull-request
   */
  updateReview: (input: {
    /** The body text of the pull request review. */
    body: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the review. */
    review_id: number;
  }) => Promise<PullRequestReview>;

  /**
   * Delete a pending review for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#delete-a-pending-review-for-a-pull-request
   */
  deletePendingReview: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the review. */
    review_id: number;
  }) => Promise<PullRequestReview>;

  /**
   * List comments for a pull request review
   * @see https://docs.github.com/rest/pulls/reviews#list-comments-for-a-pull-request-review
   */
  listCommentsForReview: (input: {
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the review. */
    review_id: number;
    /** The number of results per page (max 100). For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    per_page?: number;
    /** The page number of the results to fetch. For more information, see "[Using pagination in the REST API](https://docs.github.com/rest/using-the-rest-api/using-pagination-in-the-rest-api)." */
    page?: number;
  }) => Promise<(ReviewComment)[]>;

  /**
   * Dismiss a review for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#dismiss-a-review-for-a-pull-request
   */
  dismissReview: (input: {
    /** The message for the pull request review dismissal */
    message: string;
    event?: "DISMISS";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the review. */
    review_id: number;
  }) => Promise<PullRequestReview>;

  /**
   * Submit a review for a pull request
   * @see https://docs.github.com/rest/pulls/reviews#submit-a-review-for-a-pull-request
   */
  submitReview: (input: {
    /** The body text of the pull request review */
    body?: string;
    /** The review action you want to perform. The review actions include: `APPROVE`, `REQUEST_CHANGES`, or `COMMENT`. When you leave this blank, the API returns _HTTP 422 (Unrecognizable entity)_ and sets the review action state to `PENDING`, which means you will need to re-submit the pull request review using a review action. */
    event: "APPROVE" | "REQUEST_CHANGES" | "COMMENT";
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
    /** The unique identifier of the review. */
    review_id: number;
  }) => Promise<PullRequestReview>;

  /**
   * Update a pull request branch
   * @see https://docs.github.com/rest/pulls/pulls#update-a-pull-request-branch
   */
  updateBranch: (input: {
    /** The expected SHA of the pull request's HEAD ref. This is the most recent commit on the pull request's branch. If the expected SHA does not match the pull request's HEAD, you will receive a `422 Unprocessable Entity` status. You can use the "[List commits](https://docs.github.com/rest/commits/commits#list-commits)" endpoint to find the most recent commit SHA. Default: SHA of the pull request's current HEAD ref. */
    expected_head_sha?: string;
    /** The account owner of the repository. The name is not case sensitive. */
    owner: string;
    /** The name of the repository without the `.git` extension. The name is not case sensitive. */
    repo: string;
    /** The number that identifies the pull request. */
    pull_number: number;
  }) => Promise<{ message?: string; url?: string }>;
};
