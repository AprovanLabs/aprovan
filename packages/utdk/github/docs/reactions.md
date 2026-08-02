# Reactions

15 operations · `@utdk/github`

```ts
import github from "@utdk/github";
```

## `github.reactions.listForCommitComment`

List reactions for a commit comment — [API reference](https://docs.github.com/rest/reactions/reactions#list-reactions-for-a-commit-comment)

```ts
github.reactions.listForCommitComment(input: {
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
}): Promise<(Reaction)[]>
```

<sub>`GET /repos/{owner}/{repo}/comments/{comment_id}/reactions` · `reactions/list-for-commit-comment`</sub>

## `github.reactions.createForCommitComment`

Create reaction for a commit comment — [API reference](https://docs.github.com/rest/reactions/reactions#create-reaction-for-a-commit-comment)

```ts
github.reactions.createForCommitComment(input: {
  /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the commit comment. */
  content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<Reaction>
```

<sub>`POST /repos/{owner}/{repo}/comments/{comment_id}/reactions` · `reactions/create-for-commit-comment`</sub>

## `github.reactions.deleteForCommitComment`

Delete a commit comment reaction — [API reference](https://docs.github.com/rest/reactions/reactions#delete-a-commit-comment-reaction)

```ts
github.reactions.deleteForCommitComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
  /** The unique identifier of the reaction. */
  reaction_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}` · `reactions/delete-for-commit-comment`</sub>

## `github.reactions.listForIssue`

List reactions for an issue — [API reference](https://docs.github.com/rest/reactions/reactions#list-reactions-for-an-issue)

```ts
github.reactions.listForIssue(input: {
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
}): Promise<(Reaction)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/{issue_number}/reactions` · `reactions/list-for-issue`</sub>

## `github.reactions.createForIssue`

Create reaction for an issue — [API reference](https://docs.github.com/rest/reactions/reactions#create-reaction-for-an-issue)

```ts
github.reactions.createForIssue(input: {
  /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the issue. */
  content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
}): Promise<Reaction>
```

<sub>`POST /repos/{owner}/{repo}/issues/{issue_number}/reactions` · `reactions/create-for-issue`</sub>

## `github.reactions.deleteForIssue`

Delete an issue reaction — [API reference](https://docs.github.com/rest/reactions/reactions#delete-an-issue-reaction)

```ts
github.reactions.deleteForIssue(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The number that identifies the issue. */
  issue_number: number;
  /** The unique identifier of the reaction. */
  reaction_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}` · `reactions/delete-for-issue`</sub>

## `github.reactions.listForIssueComment`

List reactions for an issue comment — [API reference](https://docs.github.com/rest/reactions/reactions#list-reactions-for-an-issue-comment)

```ts
github.reactions.listForIssueComment(input: {
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
}): Promise<(Reaction)[]>
```

<sub>`GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions` · `reactions/list-for-issue-comment`</sub>

## `github.reactions.createForIssueComment`

Create reaction for an issue comment — [API reference](https://docs.github.com/rest/reactions/reactions#create-reaction-for-an-issue-comment)

```ts
github.reactions.createForIssueComment(input: {
  /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the issue comment. */
  content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<Reaction>
```

<sub>`POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions` · `reactions/create-for-issue-comment`</sub>

## `github.reactions.deleteForIssueComment`

Delete an issue comment reaction — [API reference](https://docs.github.com/rest/reactions/reactions#delete-an-issue-comment-reaction)

```ts
github.reactions.deleteForIssueComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
  /** The unique identifier of the reaction. */
  reaction_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}` · `reactions/delete-for-issue-comment`</sub>

## `github.reactions.listForPullRequestReviewComment`

List reactions for a pull request review comment — [API reference](https://docs.github.com/rest/reactions/reactions#list-reactions-for-a-pull-request-review-comment)

```ts
github.reactions.listForPullRequestReviewComment(input: {
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
}): Promise<(Reaction)[]>
```

<sub>`GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions` · `reactions/list-for-pull-request-review-comment`</sub>

## `github.reactions.createForPullRequestReviewComment`

Create reaction for a pull request review comment — [API reference](https://docs.github.com/rest/reactions/reactions#create-reaction-for-a-pull-request-review-comment)

```ts
github.reactions.createForPullRequestReviewComment(input: {
  /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the pull request review comment. */
  content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
}): Promise<Reaction>
```

<sub>`POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions` · `reactions/create-for-pull-request-review-comment`</sub>

## `github.reactions.deleteForPullRequestComment`

Delete a pull request comment reaction — [API reference](https://docs.github.com/rest/reactions/reactions#delete-a-pull-request-comment-reaction)

```ts
github.reactions.deleteForPullRequestComment(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the comment. */
  comment_id: number;
  /** The unique identifier of the reaction. */
  reaction_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}` · `reactions/delete-for-pull-request-comment`</sub>

## `github.reactions.listForRelease`

List reactions for a release — [API reference](https://docs.github.com/rest/reactions/reactions#list-reactions-for-a-release)

```ts
github.reactions.listForRelease(input: {
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
}): Promise<(Reaction)[]>
```

<sub>`GET /repos/{owner}/{repo}/releases/{release_id}/reactions` · `reactions/list-for-release`</sub>

## `github.reactions.createForRelease`

Create reaction for a release — [API reference](https://docs.github.com/rest/reactions/reactions#create-reaction-for-a-release)

```ts
github.reactions.createForRelease(input: {
  /** The [reaction type](https://docs.github.com/rest/reactions/reactions#about-reactions) to add to the release. */
  content: "+1" | "laugh" | "heart" | "hooray" | "rocket" | "eyes";
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the release. */
  release_id: number;
}): Promise<Reaction>
```

<sub>`POST /repos/{owner}/{repo}/releases/{release_id}/reactions` · `reactions/create-for-release`</sub>

## `github.reactions.deleteForRelease`

Delete a release reaction — [API reference](https://docs.github.com/rest/reactions/reactions#delete-a-release-reaction)

```ts
github.reactions.deleteForRelease(input: {
  /** The account owner of the repository. The name is not case sensitive. */
  owner: string;
  /** The name of the repository without the `.git` extension. The name is not case sensitive. */
  repo: string;
  /** The unique identifier of the release. */
  release_id: number;
  /** The unique identifier of the reaction. */
  reaction_id: number;
}): Promise<unknown>
```

<sub>`DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}` · `reactions/delete-for-release`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
