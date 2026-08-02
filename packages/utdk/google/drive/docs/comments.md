# Comments

5 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveCommentsList`

Lists a file's comments. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveCommentsList(input: {
  /** The ID of the file. */
  fileId: string;
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
  /** Whether to include deleted comments. Deleted comments will not include their original content. */
  includeDeleted?: boolean;
  /** The maximum number of comments to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
  /** The minimum value of 'modifiedTime' for the result comments (RFC 3339 date-time). */
  startModifiedTime?: string;
}): Promise<CommentList>
```

<sub>`GET /files/{fileId}/comments` · `drive.comments.list`</sub>

## `drive.driveCommentsCreate`

Creates a comment on a file. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveCommentsCreate(input: {
  /** A region of the document represented as a JSON string. For details on defining anchor properties, refer to  Add comments and replies. */
  anchor?: string;
  /** The author of the comment. The author's email address and permission ID will not be populated. */
  author?: User;
  /** The plain text content of the comment. This field is used for setting the content, while htmlContent should be displayed. */
  content?: string;
  /** The time at which the comment was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the comment has been deleted. A deleted comment has no content. */
  deleted?: boolean;
  /** The content of the comment with HTML formatting. */
  htmlContent?: string;
  /** The ID of the comment. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#comment". */
  kind?: string;
  /** The last time the comment or any of its replies was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment. */
  quotedFileContent?: { mimeType?: string; value?: string };
  /** The full list of replies to the comment in chronological order. */
  replies?: (Reply)[];
  /** Whether the comment has been resolved by one of its replies. */
  resolved?: boolean;
  /** The ID of the file. */
  fileId: string;
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
}): Promise<Comment>
```

<sub>`POST /files/{fileId}/comments` · `drive.comments.create`</sub>

## `drive.driveCommentsDelete`

Deletes a comment. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveCommentsDelete(input: {
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
}): Promise<unknown>
```

<sub>`DELETE /files/{fileId}/comments/{commentId}` · `drive.comments.delete`</sub>

## `drive.driveCommentsGet`

Gets a comment by ID. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveCommentsGet(input: {
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
  /** Whether to return deleted comments. Deleted comments will not include their original content. */
  includeDeleted?: boolean;
}): Promise<Comment>
```

<sub>`GET /files/{fileId}/comments/{commentId}` · `drive.comments.get`</sub>

## `drive.driveCommentsUpdate`

Updates a comment with patch semantics. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveCommentsUpdate(input: {
  /** A region of the document represented as a JSON string. For details on defining anchor properties, refer to  Add comments and replies. */
  anchor?: string;
  /** The author of the comment. The author's email address and permission ID will not be populated. */
  author?: User;
  /** The plain text content of the comment. This field is used for setting the content, while htmlContent should be displayed. */
  content?: string;
  /** The time at which the comment was created (RFC 3339 date-time). */
  createdTime?: string;
  /** Whether the comment has been deleted. A deleted comment has no content. */
  deleted?: boolean;
  /** The content of the comment with HTML formatting. */
  htmlContent?: string;
  /** The ID of the comment. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#comment". */
  kind?: string;
  /** The last time the comment or any of its replies was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The file content to which the comment refers, typically within the anchor region. For a text file, for example, this would be the text at the location of the comment. */
  quotedFileContent?: { mimeType?: string; value?: string };
  /** The full list of replies to the comment in chronological order. */
  replies?: (Reply)[];
  /** Whether the comment has been resolved by one of its replies. */
  resolved?: boolean;
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
}): Promise<Comment>
```

<sub>`PATCH /files/{fileId}/comments/{commentId}` · `drive.comments.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
