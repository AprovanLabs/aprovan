# Revisions

4 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveRevisionsList`

Lists a file's revisions. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRevisionsList(input: {
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
  /** The maximum number of revisions to return per page. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
}): Promise<RevisionList>
```

<sub>`GET /files/{fileId}/revisions` · `drive.revisions.list`</sub>

## `drive.driveRevisionsDelete`

Permanently deletes a file version. You can only delete revisions for files with binary content in Google Drive, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRevisionsDelete(input: {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
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

<sub>`DELETE /files/{fileId}/revisions/{revisionId}` · `drive.revisions.delete`</sub>

## `drive.driveRevisionsGet`

Gets a revision's metadata or content by ID. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRevisionsGet(input: {
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
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
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media. */
  acknowledgeAbuse?: boolean;
}): Promise<Revision>
```

<sub>`GET /files/{fileId}/revisions/{revisionId}` · `drive.revisions.get`</sub>

## `drive.driveRevisionsUpdate`

Updates a revision with patch semantics. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveRevisionsUpdate(input: {
  /** Links for exporting Docs Editors files to specific formats. */
  exportLinks?: { [key: string]: string | undefined };
  /** The ID of the revision. */
  id?: string;
  /** Whether to keep this revision forever, even if it is no longer the head revision. If not set, the revision will be automatically purged 30 days after newer content is uploaded. This can be set on a maximum of 200 revisions for a file. This field is only applicable to files with binary content in Drive. */
  keepForever?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#revision". */
  kind?: string;
  /** The last user to modify this revision. */
  lastModifyingUser?: User;
  /** The MD5 checksum of the revision's content. This is only applicable to files with binary content in Drive. */
  md5Checksum?: string;
  /** The MIME type of the revision. */
  mimeType?: string;
  /** The last time the revision was modified (RFC 3339 date-time). */
  modifiedTime?: string;
  /** The original filename used to create this revision. This is only applicable to files with binary content in Drive. */
  originalFilename?: string;
  /** Whether subsequent revisions will be automatically republished. This is only applicable to Docs Editors files. */
  publishAuto?: boolean;
  /** Whether this revision is published. This is only applicable to Docs Editors files. */
  published?: boolean;
  /** A link to the published revision. This is only populated for Google Sites files. */
  publishedLink?: string;
  /** Whether this revision is published outside the domain. This is only applicable to Docs Editors files. */
  publishedOutsideDomain?: boolean;
  /** The size of the revision's content in bytes. This is only applicable to files with binary content in Drive. */
  size?: string;
  /** The ID of the file. */
  fileId: string;
  /** The ID of the revision. */
  revisionId: string;
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
}): Promise<Revision>
```

<sub>`PATCH /files/{fileId}/revisions/{revisionId}` · `drive.revisions.update`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
