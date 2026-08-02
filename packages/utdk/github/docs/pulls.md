# Pulls

27 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.pulls.list`

List pull requests — [API reference](https://docs.github.com/rest/pulls/pulls#list-pull-requests)

```ts
github.pulls.list(input: {
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
}): Promise<(PullRequestSimple)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls` · `pulls/list`</sub>

## `github.pulls.create`

Create a pull request — [API reference](https://docs.github.com/rest/pulls/pulls#create-a-pull-request)

```ts
github.pulls.create(input: {
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
}): Promise<PullRequest>
```

<sub>`POST /repos/{owner}/{repo}/pulls` · `pulls/create`</sub>

## `github.pulls.get`

Get a pull request — [API reference](https://docs.github.com/rest/pulls/pulls#get-a-pull-request)

```ts
github.pulls.get(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
}): Promise<PullRequest>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}` · `pulls/get`</sub>

## `github.pulls.update`

Update a pull request — [API reference](https://docs.github.com/rest/pulls/pulls#update-a-pull-request)

```ts
github.pulls.update(input: {
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
}): Promise<PullRequest>
```

<sub>`PATCH /repos/{owner}/{repo}/pulls/{pull_number}` · `pulls/update`</sub>

## `github.pulls.listReviewComments`

List review comments on a pull request — [API reference](https://docs.github.com/rest/pulls/comments#list-review-comments-on-a-pull-request)

```ts
github.pulls.listReviewComments(input: {
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
}): Promise<(PullRequestReviewComment)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/comments` · `pulls/list-review-comments`</sub>

## `github.pulls.createReviewComment`

Create a review comment for a pull request — [API reference](https://docs.github.com/rest/pulls/comments#create-a-review-comment-for-a-pull-request)

```ts
github.pulls.createReviewComment(input: {
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
}): Promise<PullRequestReviewComment>
```

<sub>`POST /repos/{owner}/{repo}/pulls/{pull_number}/comments` · `pulls/create-review-comment`</sub>

## `github.pulls.createReplyForReviewComment`

Create a reply for a review comment — [API reference](https://docs.github.com/rest/pulls/comments#create-a-reply-for-a-review-comment)

```ts
github.pulls.createReplyForReviewComment(input: {
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
}): Promise<PullRequestReviewComment>
```

<sub>`POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies` · `pulls/create-reply-for-review-comment`</sub>

## `github.pulls.listCommits`

List commits on a pull request — [API reference](https://docs.github.com/rest/pulls/pulls#list-commits-on-a-pull-request)

```ts
github.pulls.listCommits(input: {
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
}): Promise<(Commit)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/commits` · `pulls/list-commits`</sub>

## `github.pulls.listFiles`

List pull requests files — [API reference](https://docs.github.com/rest/pulls/pulls#list-pull-requests-files)

```ts
github.pulls.listFiles(input: {
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
}): Promise<(DiffEntry)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/files` · `pulls/list-files`</sub>

## `github.pulls.checkIfMerged`

Check if a pull request has been merged — [API reference](https://docs.github.com/rest/pulls/pulls#check-if-a-pull-request-has-been-merged)

```ts
github.pulls.checkIfMerged(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
}): Promise<unknown>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/merge` · `pulls/check-if-merged`</sub>

## `github.pulls.merge`

Merge a pull request — [API reference](https://docs.github.com/rest/pulls/pulls#merge-a-pull-request)

```ts
github.pulls.merge(input: {
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
}): Promise<PullRequestMergeResult>
```

<sub>`PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge` · `pulls/merge`</sub>

## `github.pulls.removeRequestedReviewers`

Remove requested reviewers from a pull request — [API reference](https://docs.github.com/rest/pulls/review-requests#remove-requested-reviewers-from-a-pull-request)

```ts
github.pulls.removeRequestedReviewers(input: {
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
}): Promise<PullRequestSimple>
```

<sub>`DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` · `pulls/remove-requested-reviewers`</sub>

## `github.pulls.listRequestedReviewers`

Get all requested reviewers for a pull request — [API reference](https://docs.github.com/rest/pulls/review-requests#get-all-requested-reviewers-for-a-pull-request)

```ts
github.pulls.listRequestedReviewers(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
}): Promise<PullRequestReviewRequest>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` · `pulls/list-requested-reviewers`</sub>

## `github.pulls.requestReviewers`

Request reviewers for a pull request — [API reference](https://docs.github.com/rest/pulls/review-requests#request-reviewers-for-a-pull-request)

```ts
github.pulls.requestReviewers(input: {
  body?: unknown | unknown;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
}): Promise<PullRequestSimple>
```

<sub>`POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers` · `pulls/request-reviewers`</sub>

## `github.pulls.listReviews`

List reviews for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#list-reviews-for-a-pull-request)

```ts
github.pulls.listReviews(input: {
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
}): Promise<(PullRequestReview)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews` · `pulls/list-reviews`</sub>

## `github.pulls.createReview`

Create a review for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#create-a-review-for-a-pull-request)

```ts
github.pulls.createReview(input: {
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
}): Promise<PullRequestReview>
```

<sub>`POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews` · `pulls/create-review`</sub>

## `github.pulls.deletePendingReview`

Delete a pending review for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#delete-a-pending-review-for-a-pull-request)

```ts
github.pulls.deletePendingReview(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
  /** The unique identifier of the review. */
  review_id: number;
}): Promise<PullRequestReview>
```

<sub>`DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` · `pulls/delete-pending-review`</sub>

## `github.pulls.getReview`

Get a review for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#get-a-review-for-a-pull-request)

```ts
github.pulls.getReview(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
  /** The unique identifier of the review. */
  review_id: number;
}): Promise<PullRequestReview>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` · `pulls/get-review`</sub>

## `github.pulls.updateReview`

Update a review for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#update-a-review-for-a-pull-request)

```ts
github.pulls.updateReview(input: {
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
}): Promise<PullRequestReview>
```

<sub>`PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}` · `pulls/update-review`</sub>

## `github.pulls.listCommentsForReview`

List comments for a pull request review — [API reference](https://docs.github.com/rest/pulls/reviews#list-comments-for-a-pull-request-review)

```ts
github.pulls.listCommentsForReview(input: {
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
}): Promise<(ReviewComment)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments` · `pulls/list-comments-for-review`</sub>

## `github.pulls.dismissReview`

Dismiss a review for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#dismiss-a-review-for-a-pull-request)

```ts
github.pulls.dismissReview(input: {
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
}): Promise<PullRequestReview>
```

<sub>`PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals` · `pulls/dismiss-review`</sub>

## `github.pulls.submitReview`

Submit a review for a pull request — [API reference](https://docs.github.com/rest/pulls/reviews#submit-a-review-for-a-pull-request)

```ts
github.pulls.submitReview(input: {
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
}): Promise<PullRequestReview>
```

<sub>`POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events` · `pulls/submit-review`</sub>

## `github.pulls.updateBranch`

Update a pull request branch — [API reference](https://docs.github.com/rest/pulls/pulls#update-a-pull-request-branch)

```ts
github.pulls.updateBranch(input: {
  /** The expected SHA of the pull request's HEAD ref. This is the most recent commit on the pull request's branch. If the expected SHA does not match the pull request's HEAD, you will receive a `422 Unprocessable Entity` status. You can use the "[List commits](https://docs.github.com/rest/commits/commits#list-commits)" endpoint to find the most recent commit SHA. Default: SHA of the pull request's current HEAD ref. */
  expected_head_sha?: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the pull request. */
  pull_number: number;
}): Promise<{ message?: string; url?: string }>
```

<sub>`PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch` · `pulls/update-branch`</sub>

## `github.pulls.listReviewCommentsForRepo`

List review comments in a repository — [API reference](https://docs.github.com/rest/pulls/comments#list-review-comments-in-a-repository)

```ts
github.pulls.listReviewCommentsForRepo(input: {
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
}): Promise<(PullRequestReviewComment)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/comments` · `pulls/list-review-comments-for-repo`</sub>

## `github.pulls.deleteReviewComment`

Delete a review comment for a pull request — [API reference](https://docs.github.com/rest/pulls/comments#delete-a-review-comment-for-a-pull-request)

```ts
github.pulls.deleteReviewComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<BasicError>
```

<sub>`DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}` · `pulls/delete-review-comment`</sub>

## `github.pulls.getReviewComment`

Get a review comment for a pull request — [API reference](https://docs.github.com/rest/pulls/comments#get-a-review-comment-for-a-pull-request)

```ts
github.pulls.getReviewComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<PullRequestReviewComment>
```

<sub>`GET /repos/{owner}/{repo}/pulls/comments/{comment_id}` · `pulls/get-review-comment`</sub>

## `github.pulls.updateReviewComment`

Update a review comment for a pull request — [API reference](https://docs.github.com/rest/pulls/comments#update-a-review-comment-for-a-pull-request)

```ts
github.pulls.updateReviewComment(input: {
  /** The text of the reply to the review comment. */
  body: string;
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<PullRequestReviewComment>
```

<sub>`PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}` · `pulls/update-review-comment`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
