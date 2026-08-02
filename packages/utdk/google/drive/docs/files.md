# Files

12 operations · `utdk/google/drive`

```ts
import drive from "utdk/google/drive";
```

## `drive.driveFilesList`

Lists or searches files. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesList(input: {
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
  /** Groupings of files to which the query applies. Supported groupings are: 'user' (files created by, opened by, or shared directly with the user), 'drive' (files in the specified shared drive as indicated by the 'driveId'), 'domain' (files shared to the user's domain), and 'allDrives' (A combination of 'user' and 'drive' for all drives where the user is a member). When able, use 'user' or 'drive', instead of 'allDrives', for efficiency. */
  corpora?: string;
  /** The source of files to list. Deprecated: use 'corpora' instead. */
  corpus?: "domain" | "user";
  /** ID of the shared drive to search. */
  driveId?: string;
  /** Whether both My Drive and shared drive items should be included in results. */
  includeItemsFromAllDrives?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Deprecated use includeItemsFromAllDrives instead. */
  includeTeamDriveItems?: boolean;
  /** A comma-separated list of sort keys. Valid keys are 'createdTime', 'folder', 'modifiedByMeTime', 'modifiedTime', 'name', 'name_natural', 'quotaBytesUsed', 'recency', 'sharedWithMeTime', 'starred', and 'viewedByMeTime'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedTime desc,name. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored. */
  orderBy?: string;
  /** The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached. */
  pageSize?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
  /** A query for filtering the file results. See the "Search for Files" guide for supported syntax. */
  q?: string;
  /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
  spaces?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Deprecated use driveId instead. */
  teamDriveId?: string;
}): Promise<FileList>
```

<sub>`GET /files` · `drive.files.list`</sub>

## `drive.driveFilesCreate`

Creates a file. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesCreate(input: {
  /** A collection of arbitrary key-value pairs that are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with an OAuth 2 client ID. You cannot use an API key to retrieve private properties. */
  appProperties?: { [key: string]: string | undefined };
  /** Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user can take. */
  capabilities?: { canAcceptOwnership?: boolean; canAddChildren?: boolean; canAddFolderFromAnotherDrive?: boolean; canAddMyDriveParent?: boolean; canChangeCopyRequiresWriterPermission?: boolean; canChangeSecurityUpdateEnabled?: boolean; canChangeViewersCanCopyContent?: boolean; canComment?: boolean; canCopy?: boolean; canDelete?: boolean; canDeleteChildren?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canModifyContent?: boolean; canModifyContentRestriction?: boolean; canModifyLabels?: boolean; canMoveChildrenOutOfDrive?: boolean; canMoveChildrenOutOfTeamDrive?: boolean; canMoveChildrenWithinDrive?: boolean; canMoveChildrenWithinTeamDrive?: boolean; canMoveItemIntoTeamDrive?: boolean; canMoveItemOutOfDrive?: boolean; canMoveItemOutOfTeamDrive?: boolean; canMoveItemWithinDrive?: boolean; canMoveItemWithinTeamDrive?: boolean; canMoveTeamDriveItem?: boolean; canReadDrive?: boolean; canReadLabels?: boolean; canReadRevisions?: boolean; canReadTeamDrive?: boolean; canRemoveChildren?: boolean; canRemoveMyDriveParent?: boolean; canRename?: boolean; canShare?: boolean; canTrash?: boolean; canTrashChildren?: boolean; canUntrash?: boolean };
  /** Additional information about the content of the file. These fields are never populated in responses. */
  contentHints?: { indexableText?: string; thumbnail?: { image?: string; mimeType?: string } };
  /** Restrictions for accessing the content of the file. Only populated if such a restriction exists. */
  contentRestrictions?: (ContentRestriction)[];
  /** Whether the options to copy, print, or download this file, should be disabled for readers and commenters. */
  copyRequiresWriterPermission?: boolean;
  /** The time at which the file was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A short description of the file. */
  description?: string;
  /** ID of the shared drive the file resides in. Only populated for items in shared drives. */
  driveId?: string;
  /** Whether the file has been explicitly trashed, as opposed to recursively trashed from a parent folder. */
  explicitlyTrashed?: boolean;
  /** Links for exporting Docs Editors files to specific formats. */
  exportLinks?: { [key: string]: string | undefined };
  /** The final component of fullFileExtension. This is only available for files with binary content in Google Drive. */
  fileExtension?: string;
  /** The color for a folder or shortcut to a folder as an RGB hex string. The supported colors are published in the folderColorPalette field of the About resource. If an unsupported color is specified, the closest color in the palette will be used instead. */
  folderColorRgb?: string;
  /** The full file extension extracted from the name field. Can contain multiple concatenated extensions, such as "tar.gz". This is only available for files with binary content in Google Drive. This is automatically updated when the name field changes, however it's not cleared if the new name does not contain a valid extension. */
  fullFileExtension?: string;
  /** Whether there are permissions directly on this file. This field is only populated for items in shared drives. */
  hasAugmentedPermissions?: boolean;
  /** Whether this file has a thumbnail. This does not indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field. */
  hasThumbnail?: boolean;
  /** The ID of the file's head revision. This is only available for files with binary content in Google Drive. */
  headRevisionId?: string;
  /** A static, unauthenticated link to the file's icon. */
  iconLink?: string;
  /** The ID of the file. */
  id?: string;
  /** Additional metadata about image media, if available. */
  imageMediaMetadata?: { aperture?: number; cameraMake?: string; cameraModel?: string; colorSpace?: string; exposureBias?: number; exposureMode?: string; exposureTime?: number; flashUsed?: boolean; focalLength?: number; height?: number; isoSpeed?: number; lens?: string; location?: { altitude?: number; latitude?: number; longitude?: number }; maxApertureValue?: number; meteringMode?: string; rotation?: number; sensor?: string; subjectDistance?: number; time?: string; whiteBalance?: string; width?: number };
  /** Whether the requesting app created or opened the file. */
  isAppAuthorized?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#file". */
  kind?: string;
  /** An overview of the labels on the file. */
  labelInfo?: { labels?: (Label)[] };
  /** The last user to modify the file. */
  lastModifyingUser?: User;
  /** Contains details about the link URLs that clients are using to refer to this item. */
  linkShareMetadata?: { securityUpdateEligible?: boolean; securityUpdateEnabled?: boolean };
  /** The MD5 checksum for the content of the file. This is only applicable to files with binary content in Google Drive. */
  md5Checksum?: string;
  /** The MIME type of the file. Google Drive will attempt to automatically detect an appropriate value from uploaded content if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content will be imported if possible. The supported import formats are published in the About resource. */
  mimeType?: string;
  /** Whether this user has modified the file. */
  modifiedByMe?: boolean;
  /** The last time the user modified the file (RFC 3339 date-time). */
  modifiedByMeTime?: string;
  /** The last time anyone modified the file (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user. */
  modifiedTime?: string;
  /** The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, My Drive root folder, and Application Data folder the name is constant. */
  name?: string;
  /** The original filename of the uploaded content if available, or else the original value of the name field. This is only available for files with binary content in Google Drive. */
  originalFilename?: string;
  /** Whether the user owns the file. Not populated for items in shared drives. */
  ownedByMe?: boolean;
  /** The owner of this file. Only certain legacy files might have more than one owner. This field isn't populated for items in shared drives. */
  owners?: (User)[];
  /** The IDs of the parent folders that contain the file. If not specified as part of a create request, the file will be placed directly in the user's My Drive folder. If not specified as part of a copy request, the file will inherit any discoverable parents of the source file. Update requests must use the addParents and removeParents parameters to modify the parents list. */
  parents?: (string)[];
  /** List of permission IDs for users with access to this file. */
  permissionIds?: (string)[];
  /** The full list of permissions for the file. This is only available if the requesting user can share the file. Not populated for items in shared drives. */
  permissions?: (Permission)[];
  /** A collection of arbitrary key-value pairs that are visible to all apps. Entries with null values are cleared in update and copy requests. */
  properties?: { [key: string]: string | undefined };
  /** The number of storage quota bytes used by the file. This includes the head revision as well as previous revisions with keepForever enabled. */
  quotaBytesUsed?: string;
  /** A key needed to access the item via a shared link. */
  resourceKey?: string;
  /** The SHA1 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha1Checksum?: string;
  /** The SHA256 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha256Checksum?: string;
  /** Whether the file has been shared. Not populated for items in shared drives. */
  shared?: boolean;
  /** The time at which the file was shared with the user, if applicable (RFC 3339 date-time). */
  sharedWithMeTime?: string;
  /** The user who shared the file with the requesting user, if applicable. */
  sharingUser?: User;
  /** Shortcut file details. Only populated for shortcut files, which have the mimeType field set to application/vnd.google-apps.shortcut. */
  shortcutDetails?: { targetId?: string; targetMimeType?: string; targetResourceKey?: string };
  /** The size of the file's content in bytes. This field is populated for files with binary content stored in Google Drive and for Docs Editors files; it's not populated for shortcuts or folders. */
  size?: string;
  /** The list of spaces that contain the file. The currently supported values are 'drive', 'appDataFolder' and 'photos'. */
  spaces?: (string)[];
  /** Whether the user has starred the file. */
  starred?: boolean;
  /** Deprecated - use driveId instead. */
  teamDriveId?: string;
  /** A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours. Only populated when the requesting app can access the file's content. If the file isn't shared publicly, the URL returned in Files.thumbnailLink must be fetched using a credentialed request. */
  thumbnailLink?: string;
  /** The thumbnail version for use in thumbnail cache invalidation. */
  thumbnailVersion?: string;
  /** Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner can trash a file. The trashed item is excluded from all files.list responses returned for any user who does not own the file. However, all users with access to the file can see the trashed item metadata in an API response. All users with access can copy, download, export, and share the file. */
  trashed?: boolean;
  /** The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives. */
  trashedTime?: string;
  /** If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives. */
  trashingUser?: User;
  /** A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the user. */
  version?: string;
  /** Additional metadata about video media. This might not be available immediately upon upload. */
  videoMediaMetadata?: { durationMillis?: string; height?: number; width?: number };
  /** Whether this user has viewed the file. */
  viewedByMe?: boolean;
  /** The last time the user viewed the file (RFC 3339 date-time). */
  viewedByMeTime?: string;
  /** Deprecated - use copyRequiresWriterPermission instead. */
  viewersCanCopyContent?: boolean;
  /** A link for downloading the content of the file in a browser. This is only available for files with binary content in Google Drive. */
  webContentLink?: string;
  /** A link for opening the file in a relevant Google editor or viewer in a browser. */
  webViewLink?: string;
  /** Whether users with only writer permission can modify the file's permissions. Not populated for items in shared drives. */
  writersCanShare?: boolean;
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
  /** Deprecated. Creating files in multiple folders is no longer supported. */
  enforceSingleParent?: boolean;
  /** Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders. */
  ignoreDefaultVisibility?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Whether to use the uploaded content as indexable text. */
  useContentAsIndexableText?: boolean;
}): Promise<File>
```

<sub>`POST /files` · `drive.files.create`</sub>

## `drive.driveFilesDelete`

Permanently deletes a file owned by the user without moving it to the trash. If the file belongs to a shared drive the user must be an organizer on the parent. If the target is a folder, all descendants owned by the user are also deleted. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesDelete(input: {
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
  /** Deprecated. If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item will be placed under its owner's root. */
  enforceSingleParent?: boolean;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
}): Promise<unknown>
```

<sub>`DELETE /files/{fileId}` · `drive.files.delete`</sub>

## `drive.driveFilesGet`

Gets a file's metadata or content by ID. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesGet(input: {
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
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media. */
  acknowledgeAbuse?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
}): Promise<File>
```

<sub>`GET /files/{fileId}` · `drive.files.get`</sub>

## `drive.driveFilesUpdate`

Updates a file's metadata and/or content. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might change automatically, such as modifiedDate. This method supports patch semantics. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesUpdate(input: {
  /** A collection of arbitrary key-value pairs that are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with an OAuth 2 client ID. You cannot use an API key to retrieve private properties. */
  appProperties?: { [key: string]: string | undefined };
  /** Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user can take. */
  capabilities?: { canAcceptOwnership?: boolean; canAddChildren?: boolean; canAddFolderFromAnotherDrive?: boolean; canAddMyDriveParent?: boolean; canChangeCopyRequiresWriterPermission?: boolean; canChangeSecurityUpdateEnabled?: boolean; canChangeViewersCanCopyContent?: boolean; canComment?: boolean; canCopy?: boolean; canDelete?: boolean; canDeleteChildren?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canModifyContent?: boolean; canModifyContentRestriction?: boolean; canModifyLabels?: boolean; canMoveChildrenOutOfDrive?: boolean; canMoveChildrenOutOfTeamDrive?: boolean; canMoveChildrenWithinDrive?: boolean; canMoveChildrenWithinTeamDrive?: boolean; canMoveItemIntoTeamDrive?: boolean; canMoveItemOutOfDrive?: boolean; canMoveItemOutOfTeamDrive?: boolean; canMoveItemWithinDrive?: boolean; canMoveItemWithinTeamDrive?: boolean; canMoveTeamDriveItem?: boolean; canReadDrive?: boolean; canReadLabels?: boolean; canReadRevisions?: boolean; canReadTeamDrive?: boolean; canRemoveChildren?: boolean; canRemoveMyDriveParent?: boolean; canRename?: boolean; canShare?: boolean; canTrash?: boolean; canTrashChildren?: boolean; canUntrash?: boolean };
  /** Additional information about the content of the file. These fields are never populated in responses. */
  contentHints?: { indexableText?: string; thumbnail?: { image?: string; mimeType?: string } };
  /** Restrictions for accessing the content of the file. Only populated if such a restriction exists. */
  contentRestrictions?: (ContentRestriction)[];
  /** Whether the options to copy, print, or download this file, should be disabled for readers and commenters. */
  copyRequiresWriterPermission?: boolean;
  /** The time at which the file was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A short description of the file. */
  description?: string;
  /** ID of the shared drive the file resides in. Only populated for items in shared drives. */
  driveId?: string;
  /** Whether the file has been explicitly trashed, as opposed to recursively trashed from a parent folder. */
  explicitlyTrashed?: boolean;
  /** Links for exporting Docs Editors files to specific formats. */
  exportLinks?: { [key: string]: string | undefined };
  /** The final component of fullFileExtension. This is only available for files with binary content in Google Drive. */
  fileExtension?: string;
  /** The color for a folder or shortcut to a folder as an RGB hex string. The supported colors are published in the folderColorPalette field of the About resource. If an unsupported color is specified, the closest color in the palette will be used instead. */
  folderColorRgb?: string;
  /** The full file extension extracted from the name field. Can contain multiple concatenated extensions, such as "tar.gz". This is only available for files with binary content in Google Drive. This is automatically updated when the name field changes, however it's not cleared if the new name does not contain a valid extension. */
  fullFileExtension?: string;
  /** Whether there are permissions directly on this file. This field is only populated for items in shared drives. */
  hasAugmentedPermissions?: boolean;
  /** Whether this file has a thumbnail. This does not indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field. */
  hasThumbnail?: boolean;
  /** The ID of the file's head revision. This is only available for files with binary content in Google Drive. */
  headRevisionId?: string;
  /** A static, unauthenticated link to the file's icon. */
  iconLink?: string;
  /** The ID of the file. */
  id?: string;
  /** Additional metadata about image media, if available. */
  imageMediaMetadata?: { aperture?: number; cameraMake?: string; cameraModel?: string; colorSpace?: string; exposureBias?: number; exposureMode?: string; exposureTime?: number; flashUsed?: boolean; focalLength?: number; height?: number; isoSpeed?: number; lens?: string; location?: { altitude?: number; latitude?: number; longitude?: number }; maxApertureValue?: number; meteringMode?: string; rotation?: number; sensor?: string; subjectDistance?: number; time?: string; whiteBalance?: string; width?: number };
  /** Whether the requesting app created or opened the file. */
  isAppAuthorized?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#file". */
  kind?: string;
  /** An overview of the labels on the file. */
  labelInfo?: { labels?: (Label)[] };
  /** The last user to modify the file. */
  lastModifyingUser?: User;
  /** Contains details about the link URLs that clients are using to refer to this item. */
  linkShareMetadata?: { securityUpdateEligible?: boolean; securityUpdateEnabled?: boolean };
  /** The MD5 checksum for the content of the file. This is only applicable to files with binary content in Google Drive. */
  md5Checksum?: string;
  /** The MIME type of the file. Google Drive will attempt to automatically detect an appropriate value from uploaded content if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content will be imported if possible. The supported import formats are published in the About resource. */
  mimeType?: string;
  /** Whether this user has modified the file. */
  modifiedByMe?: boolean;
  /** The last time the user modified the file (RFC 3339 date-time). */
  modifiedByMeTime?: string;
  /** The last time anyone modified the file (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user. */
  modifiedTime?: string;
  /** The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, My Drive root folder, and Application Data folder the name is constant. */
  name?: string;
  /** The original filename of the uploaded content if available, or else the original value of the name field. This is only available for files with binary content in Google Drive. */
  originalFilename?: string;
  /** Whether the user owns the file. Not populated for items in shared drives. */
  ownedByMe?: boolean;
  /** The owner of this file. Only certain legacy files might have more than one owner. This field isn't populated for items in shared drives. */
  owners?: (User)[];
  /** The IDs of the parent folders that contain the file. If not specified as part of a create request, the file will be placed directly in the user's My Drive folder. If not specified as part of a copy request, the file will inherit any discoverable parents of the source file. Update requests must use the addParents and removeParents parameters to modify the parents list. */
  parents?: (string)[];
  /** List of permission IDs for users with access to this file. */
  permissionIds?: (string)[];
  /** The full list of permissions for the file. This is only available if the requesting user can share the file. Not populated for items in shared drives. */
  permissions?: (Permission)[];
  /** A collection of arbitrary key-value pairs that are visible to all apps. Entries with null values are cleared in update and copy requests. */
  properties?: { [key: string]: string | undefined };
  /** The number of storage quota bytes used by the file. This includes the head revision as well as previous revisions with keepForever enabled. */
  quotaBytesUsed?: string;
  /** A key needed to access the item via a shared link. */
  resourceKey?: string;
  /** The SHA1 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha1Checksum?: string;
  /** The SHA256 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha256Checksum?: string;
  /** Whether the file has been shared. Not populated for items in shared drives. */
  shared?: boolean;
  /** The time at which the file was shared with the user, if applicable (RFC 3339 date-time). */
  sharedWithMeTime?: string;
  /** The user who shared the file with the requesting user, if applicable. */
  sharingUser?: User;
  /** Shortcut file details. Only populated for shortcut files, which have the mimeType field set to application/vnd.google-apps.shortcut. */
  shortcutDetails?: { targetId?: string; targetMimeType?: string; targetResourceKey?: string };
  /** The size of the file's content in bytes. This field is populated for files with binary content stored in Google Drive and for Docs Editors files; it's not populated for shortcuts or folders. */
  size?: string;
  /** The list of spaces that contain the file. The currently supported values are 'drive', 'appDataFolder' and 'photos'. */
  spaces?: (string)[];
  /** Whether the user has starred the file. */
  starred?: boolean;
  /** Deprecated - use driveId instead. */
  teamDriveId?: string;
  /** A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours. Only populated when the requesting app can access the file's content. If the file isn't shared publicly, the URL returned in Files.thumbnailLink must be fetched using a credentialed request. */
  thumbnailLink?: string;
  /** The thumbnail version for use in thumbnail cache invalidation. */
  thumbnailVersion?: string;
  /** Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner can trash a file. The trashed item is excluded from all files.list responses returned for any user who does not own the file. However, all users with access to the file can see the trashed item metadata in an API response. All users with access can copy, download, export, and share the file. */
  trashed?: boolean;
  /** The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives. */
  trashedTime?: string;
  /** If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives. */
  trashingUser?: User;
  /** A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the user. */
  version?: string;
  /** Additional metadata about video media. This might not be available immediately upon upload. */
  videoMediaMetadata?: { durationMillis?: string; height?: number; width?: number };
  /** Whether this user has viewed the file. */
  viewedByMe?: boolean;
  /** The last time the user viewed the file (RFC 3339 date-time). */
  viewedByMeTime?: string;
  /** Deprecated - use copyRequiresWriterPermission instead. */
  viewersCanCopyContent?: boolean;
  /** A link for downloading the content of the file in a browser. This is only available for files with binary content in Google Drive. */
  webContentLink?: string;
  /** A link for opening the file in a relevant Google editor or viewer in a browser. */
  webViewLink?: string;
  /** Whether users with only writer permission can modify the file's permissions. Not populated for items in shared drives. */
  writersCanShare?: boolean;
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
  /** A comma-separated list of parent IDs to add. */
  addParents?: string;
  /** Deprecated. Adding files to multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** A comma-separated list of parent IDs to remove. */
  removeParents?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
  /** Whether to use the uploaded content as indexable text. */
  useContentAsIndexableText?: boolean;
}): Promise<File>
```

<sub>`PATCH /files/{fileId}` · `drive.files.update`</sub>

## `drive.driveFilesCopy`

Creates a copy of a file and applies any requested updates with patch semantics. Folders cannot be copied. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesCopy(input: {
  /** A collection of arbitrary key-value pairs that are private to the requesting app. Entries with null values are cleared in update and copy requests. These properties can only be retrieved using an authenticated request. An authenticated request uses an access token obtained with an OAuth 2 client ID. You cannot use an API key to retrieve private properties. */
  appProperties?: { [key: string]: string | undefined };
  /** Capabilities the current user has on this file. Each capability corresponds to a fine-grained action that a user can take. */
  capabilities?: { canAcceptOwnership?: boolean; canAddChildren?: boolean; canAddFolderFromAnotherDrive?: boolean; canAddMyDriveParent?: boolean; canChangeCopyRequiresWriterPermission?: boolean; canChangeSecurityUpdateEnabled?: boolean; canChangeViewersCanCopyContent?: boolean; canComment?: boolean; canCopy?: boolean; canDelete?: boolean; canDeleteChildren?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canModifyContent?: boolean; canModifyContentRestriction?: boolean; canModifyLabels?: boolean; canMoveChildrenOutOfDrive?: boolean; canMoveChildrenOutOfTeamDrive?: boolean; canMoveChildrenWithinDrive?: boolean; canMoveChildrenWithinTeamDrive?: boolean; canMoveItemIntoTeamDrive?: boolean; canMoveItemOutOfDrive?: boolean; canMoveItemOutOfTeamDrive?: boolean; canMoveItemWithinDrive?: boolean; canMoveItemWithinTeamDrive?: boolean; canMoveTeamDriveItem?: boolean; canReadDrive?: boolean; canReadLabels?: boolean; canReadRevisions?: boolean; canReadTeamDrive?: boolean; canRemoveChildren?: boolean; canRemoveMyDriveParent?: boolean; canRename?: boolean; canShare?: boolean; canTrash?: boolean; canTrashChildren?: boolean; canUntrash?: boolean };
  /** Additional information about the content of the file. These fields are never populated in responses. */
  contentHints?: { indexableText?: string; thumbnail?: { image?: string; mimeType?: string } };
  /** Restrictions for accessing the content of the file. Only populated if such a restriction exists. */
  contentRestrictions?: (ContentRestriction)[];
  /** Whether the options to copy, print, or download this file, should be disabled for readers and commenters. */
  copyRequiresWriterPermission?: boolean;
  /** The time at which the file was created (RFC 3339 date-time). */
  createdTime?: string;
  /** A short description of the file. */
  description?: string;
  /** ID of the shared drive the file resides in. Only populated for items in shared drives. */
  driveId?: string;
  /** Whether the file has been explicitly trashed, as opposed to recursively trashed from a parent folder. */
  explicitlyTrashed?: boolean;
  /** Links for exporting Docs Editors files to specific formats. */
  exportLinks?: { [key: string]: string | undefined };
  /** The final component of fullFileExtension. This is only available for files with binary content in Google Drive. */
  fileExtension?: string;
  /** The color for a folder or shortcut to a folder as an RGB hex string. The supported colors are published in the folderColorPalette field of the About resource. If an unsupported color is specified, the closest color in the palette will be used instead. */
  folderColorRgb?: string;
  /** The full file extension extracted from the name field. Can contain multiple concatenated extensions, such as "tar.gz". This is only available for files with binary content in Google Drive. This is automatically updated when the name field changes, however it's not cleared if the new name does not contain a valid extension. */
  fullFileExtension?: string;
  /** Whether there are permissions directly on this file. This field is only populated for items in shared drives. */
  hasAugmentedPermissions?: boolean;
  /** Whether this file has a thumbnail. This does not indicate whether the requesting app has access to the thumbnail. To check access, look for the presence of the thumbnailLink field. */
  hasThumbnail?: boolean;
  /** The ID of the file's head revision. This is only available for files with binary content in Google Drive. */
  headRevisionId?: string;
  /** A static, unauthenticated link to the file's icon. */
  iconLink?: string;
  /** The ID of the file. */
  id?: string;
  /** Additional metadata about image media, if available. */
  imageMediaMetadata?: { aperture?: number; cameraMake?: string; cameraModel?: string; colorSpace?: string; exposureBias?: number; exposureMode?: string; exposureTime?: number; flashUsed?: boolean; focalLength?: number; height?: number; isoSpeed?: number; lens?: string; location?: { altitude?: number; latitude?: number; longitude?: number }; maxApertureValue?: number; meteringMode?: string; rotation?: number; sensor?: string; subjectDistance?: number; time?: string; whiteBalance?: string; width?: number };
  /** Whether the requesting app created or opened the file. */
  isAppAuthorized?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#file". */
  kind?: string;
  /** An overview of the labels on the file. */
  labelInfo?: { labels?: (Label)[] };
  /** The last user to modify the file. */
  lastModifyingUser?: User;
  /** Contains details about the link URLs that clients are using to refer to this item. */
  linkShareMetadata?: { securityUpdateEligible?: boolean; securityUpdateEnabled?: boolean };
  /** The MD5 checksum for the content of the file. This is only applicable to files with binary content in Google Drive. */
  md5Checksum?: string;
  /** The MIME type of the file. Google Drive will attempt to automatically detect an appropriate value from uploaded content if no value is provided. The value cannot be changed unless a new revision is uploaded. If a file is created with a Google Doc MIME type, the uploaded content will be imported if possible. The supported import formats are published in the About resource. */
  mimeType?: string;
  /** Whether this user has modified the file. */
  modifiedByMe?: boolean;
  /** The last time the user modified the file (RFC 3339 date-time). */
  modifiedByMeTime?: string;
  /** The last time anyone modified the file (RFC 3339 date-time). Note that setting modifiedTime will also update modifiedByMeTime for the user. */
  modifiedTime?: string;
  /** The name of the file. This isn't necessarily unique within a folder. Note that for immutable items such as the top-level folders of shared drives, My Drive root folder, and Application Data folder the name is constant. */
  name?: string;
  /** The original filename of the uploaded content if available, or else the original value of the name field. This is only available for files with binary content in Google Drive. */
  originalFilename?: string;
  /** Whether the user owns the file. Not populated for items in shared drives. */
  ownedByMe?: boolean;
  /** The owner of this file. Only certain legacy files might have more than one owner. This field isn't populated for items in shared drives. */
  owners?: (User)[];
  /** The IDs of the parent folders that contain the file. If not specified as part of a create request, the file will be placed directly in the user's My Drive folder. If not specified as part of a copy request, the file will inherit any discoverable parents of the source file. Update requests must use the addParents and removeParents parameters to modify the parents list. */
  parents?: (string)[];
  /** List of permission IDs for users with access to this file. */
  permissionIds?: (string)[];
  /** The full list of permissions for the file. This is only available if the requesting user can share the file. Not populated for items in shared drives. */
  permissions?: (Permission)[];
  /** A collection of arbitrary key-value pairs that are visible to all apps. Entries with null values are cleared in update and copy requests. */
  properties?: { [key: string]: string | undefined };
  /** The number of storage quota bytes used by the file. This includes the head revision as well as previous revisions with keepForever enabled. */
  quotaBytesUsed?: string;
  /** A key needed to access the item via a shared link. */
  resourceKey?: string;
  /** The SHA1 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha1Checksum?: string;
  /** The SHA256 checksum associated with this file, if available. This field is only populated for files with content stored in Google Drive; it's not populated for Docs Editors or shortcut files. */
  sha256Checksum?: string;
  /** Whether the file has been shared. Not populated for items in shared drives. */
  shared?: boolean;
  /** The time at which the file was shared with the user, if applicable (RFC 3339 date-time). */
  sharedWithMeTime?: string;
  /** The user who shared the file with the requesting user, if applicable. */
  sharingUser?: User;
  /** Shortcut file details. Only populated for shortcut files, which have the mimeType field set to application/vnd.google-apps.shortcut. */
  shortcutDetails?: { targetId?: string; targetMimeType?: string; targetResourceKey?: string };
  /** The size of the file's content in bytes. This field is populated for files with binary content stored in Google Drive and for Docs Editors files; it's not populated for shortcuts or folders. */
  size?: string;
  /** The list of spaces that contain the file. The currently supported values are 'drive', 'appDataFolder' and 'photos'. */
  spaces?: (string)[];
  /** Whether the user has starred the file. */
  starred?: boolean;
  /** Deprecated - use driveId instead. */
  teamDriveId?: string;
  /** A short-lived link to the file's thumbnail, if available. Typically lasts on the order of hours. Only populated when the requesting app can access the file's content. If the file isn't shared publicly, the URL returned in Files.thumbnailLink must be fetched using a credentialed request. */
  thumbnailLink?: string;
  /** The thumbnail version for use in thumbnail cache invalidation. */
  thumbnailVersion?: string;
  /** Whether the file has been trashed, either explicitly or from a trashed parent folder. Only the owner can trash a file. The trashed item is excluded from all files.list responses returned for any user who does not own the file. However, all users with access to the file can see the trashed item metadata in an API response. All users with access can copy, download, export, and share the file. */
  trashed?: boolean;
  /** The time that the item was trashed (RFC 3339 date-time). Only populated for items in shared drives. */
  trashedTime?: string;
  /** If the file has been explicitly trashed, the user who trashed it. Only populated for items in shared drives. */
  trashingUser?: User;
  /** A monotonically increasing version number for the file. This reflects every change made to the file on the server, even those not visible to the user. */
  version?: string;
  /** Additional metadata about video media. This might not be available immediately upon upload. */
  videoMediaMetadata?: { durationMillis?: string; height?: number; width?: number };
  /** Whether this user has viewed the file. */
  viewedByMe?: boolean;
  /** The last time the user viewed the file (RFC 3339 date-time). */
  viewedByMeTime?: string;
  /** Deprecated - use copyRequiresWriterPermission instead. */
  viewersCanCopyContent?: boolean;
  /** A link for downloading the content of the file in a browser. This is only available for files with binary content in Google Drive. */
  webContentLink?: string;
  /** A link for opening the file in a relevant Google editor or viewer in a browser. */
  webViewLink?: string;
  /** Whether users with only writer permission can modify the file's permissions. Not populated for items in shared drives. */
  writersCanShare?: boolean;
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
  /** Deprecated. Copying files into multiple folders is no longer supported. Use shortcuts instead. */
  enforceSingleParent?: boolean;
  /** Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders. */
  ignoreDefaultVisibility?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions. */
  keepRevisionForever?: boolean;
  /** A language hint for OCR processing during image import (ISO 639-1 code). */
  ocrLanguage?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
}): Promise<File>
```

<sub>`POST /files/{fileId}/copy` · `drive.files.copy`</sub>

## `drive.driveFilesExport`

Exports a Google Workspace document to the requested MIME type and returns exported byte content. Note that the exported content is limited to 10MB. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesExport(input: {
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
  /** The MIME type of the format requested for this export. */
  mimeType: string;
}): Promise<unknown>
```

<sub>`GET /files/{fileId}/export` · `drive.files.export`</sub>

## `drive.driveFilesListLabels`

Lists the labels on a file. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesListLabels(input: {
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
  /** The maximum number of labels to return per page. When not set, this defaults to 100. */
  maxResults?: number;
  /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
  pageToken?: string;
}): Promise<LabelList>
```

<sub>`GET /files/{fileId}/listLabels` · `drive.files.listLabels`</sub>

## `drive.driveFilesModifyLabels`

Modifies the set of labels on a file. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesModifyLabels(input: {
  /** This is always drive#modifyLabelsRequest */
  kind?: string;
  /** The list of modifications to apply to the labels on the file. */
  labelModifications?: (LabelModification)[];
  /** The ID of the file for which the labels are modified. */
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
}): Promise<ModifyLabelsResponse>
```

<sub>`POST /files/{fileId}/modifyLabels` · `drive.files.modifyLabels`</sub>

## `drive.driveFilesWatch`

Subscribes to changes to a file. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesWatch(input: {
  /** The address where notifications are delivered for this channel. */
  address?: string;
  /** Date and time of notification channel expiration, expressed as a Unix timestamp, in milliseconds. Optional. */
  expiration?: string;
  /** A UUID or similar unique string that identifies this channel. */
  id?: string;
  /** Identifies this as a notification channel used to watch for changes to a resource, which is "api#channel". */
  kind?: string;
  /** Additional parameters controlling delivery channel behavior. Optional. */
  params?: { [key: string]: string | undefined };
  /** A Boolean value to indicate whether payload is wanted. Optional. */
  payload?: boolean;
  /** An opaque ID that identifies the resource being watched on this channel. Stable across different API versions. */
  resourceId?: string;
  /** A version-specific identifier for the watched resource. */
  resourceUri?: string;
  /** An arbitrary string delivered to the target address with each notification delivered over this channel. Optional. */
  token?: string;
  /** The type of delivery mechanism used for this channel. Valid values are "web_hook" (or "webhook"). Both values refer to a channel where Http requests are used to deliver messages. */
  type?: string;
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
  /** Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media. */
  acknowledgeAbuse?: boolean;
  /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
  includeLabels?: string;
  /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
  includePermissionsForView?: string;
  /** Whether the requesting application supports both My Drives and shared drives. */
  supportsAllDrives?: boolean;
  /** Deprecated use supportsAllDrives instead. */
  supportsTeamDrives?: boolean;
}): Promise<Channel>
```

<sub>`POST /files/{fileId}/watch` · `drive.files.watch`</sub>

## `drive.driveFilesGenerateIds`

Generates a set of file IDs which can be provided in create or copy requests. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesGenerateIds(input: {
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
  /** The number of IDs to return. */
  count?: number;
  /** The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'. (Default: 'drive') */
  space?: string;
  /** The type of items which the IDs can be used for. Supported values are 'files' and 'shortcuts'. Note that 'shortcuts' are only supported in the drive 'space'. (Default: 'files') */
  type?: string;
}): Promise<GeneratedIds>
```

<sub>`GET /files/generateIds` · `drive.files.generateIds`</sub>

## `drive.driveFilesEmptyTrash`

Permanently deletes all of the user's trashed files. — [Provider docs](https://developers.google.com/drive/)

```ts
drive.driveFilesEmptyTrash(input: {
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
  /** If set, empties the trash of the provided shared drive. */
  driveId?: string;
  /** Deprecated. If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item will be placed under its owner's root. */
  enforceSingleParent?: boolean;
}): Promise<unknown>
```

<sub>`DELETE /files/trash` · `drive.files.emptyTrash`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
