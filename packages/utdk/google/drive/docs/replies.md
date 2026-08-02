# Replies

5 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveRepliesList`

Lists a comment's replies. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRepliesList(input: {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Data format for the response. */
  alt?: "json";
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
  quotaUser?: string;
  /** Deprecated. Please use quotaUser instead. */
  userIp?: string;
  /** Whether to include deleted replies. Deleted replies will not include their original content. */
  includeDeleted?: boolean;
  /** The maximum number of replies to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
}): Promise<ReplyList>
```

<sub>`GET /files/{fileId}/comments/{commentId}/replies` · `drive.replies.list`</sub>

## `drive.driveRepliesCreate`

Creates a reply to a comment. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRepliesCreate(input: {
  /** The action the reply performed to the parent comment. Valid values are:   - resolve  - reopen */
  action?: string;
  /** The author of the reply. The author's email address and permission ID will not be populated. */
  author?: User;
  /** The plain text content of the reply. This field is used for setting the content, while htmlContent should be displayed. This is required on creates if no action is specified. */
  content?: string;
  /** The time at which the reply was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the reply has been deleted. A deleted reply has no content. */
  deleted?: boolean;
  /** The content of the reply with HTML formatting. */
  htmlContent?: string;
  /** The ID of the reply. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#reply". */
  kind?: string;
  /** The last time the reply was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** Data format for the response. */
  alt?: "json";
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
  quotaUser?: string;
  /** Deprecated. Please use quotaUser instead. */
  userIp?: string;
}): Promise<Reply>
```

<sub>`POST /files/{fileId}/comments/{commentId}/replies` · `drive.replies.create`</sub>

## `drive.driveRepliesDelete`

Deletes a reply. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRepliesDelete(input: {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Data format for the response. */
  alt?: "json";
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
  quotaUser?: string;
  /** Deprecated. Please use quotaUser instead. */
  userIp?: string;
}): Promise<unknown>
```

<sub>`DELETE /files/{fileId}/comments/{commentId}/replies/{replyId}` · `drive.replies.delete`</sub>

## `drive.driveRepliesGet`

Gets a reply by ID. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRepliesGet(input: {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Data format for the response. */
  alt?: "json";
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
  quotaUser?: string;
  /** Deprecated. Please use quotaUser instead. */
  userIp?: string;
  /** Whether to return deleted replies. Deleted replies will not include their original content. */
  includeDeleted?: boolean;
}): Promise<Reply>
```

<sub>`GET /files/{fileId}/comments/{commentId}/replies/{replyId}` · `drive.replies.get`</sub>

## `drive.driveRepliesUpdate`

Updates a reply with patch semantics. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRepliesUpdate(input: {
  /** The action the reply performed to the parent comment. Valid values are:   - resolve  - reopen */
  action?: string;
  /** The author of the reply. The author's email address and permission ID will not be populated. */
  author?: User;
  /** The plain text content of the reply. This field is used for setting the content, while htmlContent should be displayed. This is required on creates if no action is specified. */
  content?: string;
  /** The time at which the reply was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the reply has been deleted. A deleted reply has no content. */
  deleted?: boolean;
  /** The content of the reply with HTML formatting. */
  htmlContent?: string;
  /** The ID of the reply. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#reply". */
  kind?: string;
  /** The last time the reply was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The ID of the file. */
  fileId: string;
  /** The ID of the comment. */
  commentId: string;
  /** The ID of the reply. */
  replyId: string;
  /** Data format for the response. */
  alt?: "json";
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** An opaque string that represents a user for quota purposes. Must not exceed 40 characters. */
  quotaUser?: string;
  /** Deprecated. Please use quotaUser instead. */
  userIp?: string;
}): Promise<Reply>
```

<sub>`PATCH /files/{fileId}/comments/{commentId}/replies/{replyId}` · `drive.replies.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
