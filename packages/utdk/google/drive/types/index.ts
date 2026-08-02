import type { About, ChangeList, Channel, Comment, CommentList, ContentRestriction, Drive, DriveList, File, FileList, GeneratedIds, Label, LabelList, LabelModification, ModifyLabelsResponse, Permission, PermissionList, Reply, ReplyList, Revision, RevisionList, StartPageToken, TeamDrive, TeamDriveList, User } from "./schemas.js";

export type GoogleDriveClient = {
  /**
   * Gets information about the user, the user's Drive, and system capabilities.
   */
  driveAboutGet: (input: {
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
  }) => Promise<About>;

  /**
   * Lists the changes for a user or shared drive.
   */
  driveChangesList: (input: {
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
    /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
    pageToken: string;
    /** The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
    driveId?: string;
    /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
    includeCorpusRemovals?: boolean;
    /** Whether both My Drive and shared drive items should be included in results. */
    includeItemsFromAllDrives?: boolean;
    /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
    includeLabels?: string;
    /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
    includePermissionsForView?: string;
    /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
    includeRemoved?: boolean;
    /** Deprecated use includeItemsFromAllDrives instead. */
    includeTeamDriveItems?: boolean;
    /** The maximum number of changes to return per page. */
    pageSize?: number;
    /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
    restrictToMyDrive?: boolean;
    /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
    spaces?: string;
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Deprecated use driveId instead. */
    teamDriveId?: string;
  }) => Promise<ChangeList>;

  /**
   * Gets the starting pageToken for listing future changes.
   */
  driveChangesGetStartPageToken: (input: {
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
    /** The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned. */
    driveId?: string;
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Deprecated use driveId instead. */
    teamDriveId?: string;
  }) => Promise<StartPageToken>;

  /**
   * Subscribes to changes for a user. To use this method, you must include the pageToken query parameter.
   */
  driveChangesWatch: (input: {
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
    /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method. */
    pageToken: string;
    /** The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier. */
    driveId?: string;
    /** Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file. */
    includeCorpusRemovals?: boolean;
    /** Whether both My Drive and shared drive items should be included in results. */
    includeItemsFromAllDrives?: boolean;
    /** A comma-separated list of IDs of labels to include in the labelInfo part of the response. */
    includeLabels?: string;
    /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
    includePermissionsForView?: string;
    /** Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access. */
    includeRemoved?: boolean;
    /** Deprecated use includeItemsFromAllDrives instead. */
    includeTeamDriveItems?: boolean;
    /** The maximum number of changes to return per page. */
    pageSize?: number;
    /** Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive. */
    restrictToMyDrive?: boolean;
    /** A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'. */
    spaces?: string;
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Deprecated use driveId instead. */
    teamDriveId?: string;
  }) => Promise<Channel>;

  /**
   * Stop watching resources through this channel
   */
  driveChannelsStop: (input: {
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
  }) => Promise<unknown>;

  /**
   * Lists the user's shared drives.
   */
  driveDrivesList: (input: {
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
    /** Maximum number of shared drives to return per page. */
    pageSize?: number;
    /** Page token for shared drives. */
    pageToken?: string;
    /** Query string for searching shared drives. */
    q?: string;
    /** Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned. */
    useDomainAdminAccess?: boolean;
  }) => Promise<DriveList>;

  /**
   * Creates a shared drive.
   */
  driveDrivesCreate: (input: {
    /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write-only field; it can only be set on drive.drives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
    backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
    /** A short-lived link to this shared drive's background image. */
    backgroundImageLink?: string;
    /** Capabilities the current user has on this shared drive. */
    capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeDriveBackground?: boolean; canChangeDriveMembersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRename?: boolean; canRenameDrive?: boolean; canResetDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
    /** The color of this shared drive as an RGB hex string. It can only be set on drive.drives.update requests that don't set themeId. */
    colorRgb?: string;
    /** The time at which the shared drive was created (RFC 3339 date-time). */
    createdTime?: string;
    /** Whether the shared drive is hidden from default view. */
    hidden?: boolean;
    /** The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "drive#drive". */
    kind?: string;
    /** The name of this shared drive. */
    name?: string;
    /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
    orgUnitId?: string;
    /** A set of restrictions that apply to this shared drive or items inside this shared drive. */
    restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; driveMembersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean };
    /** The ID of the theme from which the background image and color are set. The set of possible driveThemes can be retrieved from a drive.about.get response. When not specified on a drive.drives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
    themeId?: string;
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
    /** An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned. */
    requestId: string;
  }) => Promise<Drive>;

  /**
   * Permanently deletes a shared drive for which the user is an organizer. The shared drive cannot contain any untrashed items.
   */
  driveDrivesDelete: (input: {
    /** The ID of the shared drive. */
    driveId: string;
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
    /** Whether any items inside the shared drive should also be deleted. This option is only supported when useDomainAdminAccess is also set to true. */
    allowItemDeletion?: boolean;
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<unknown>;

  /**
   * Gets a shared drive's metadata by ID.
   */
  driveDrivesGet: (input: {
    /** The ID of the shared drive. */
    driveId: string;
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
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<Drive>;

  /**
   * Updates the metadata for a shared drive.
   */
  driveDrivesUpdate: (input: {
    /** An image file and cropping parameters from which a background image for this shared drive is set. This is a write-only field; it can only be set on drive.drives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
    backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
    /** A short-lived link to this shared drive's background image. */
    backgroundImageLink?: string;
    /** Capabilities the current user has on this shared drive. */
    capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeDriveBackground?: boolean; canChangeDriveMembersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRename?: boolean; canRenameDrive?: boolean; canResetDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
    /** The color of this shared drive as an RGB hex string. It can only be set on drive.drives.update requests that don't set themeId. */
    colorRgb?: string;
    /** The time at which the shared drive was created (RFC 3339 date-time). */
    createdTime?: string;
    /** Whether the shared drive is hidden from default view. */
    hidden?: boolean;
    /** The ID of this shared drive which is also the ID of the top level folder of this shared drive. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "drive#drive". */
    kind?: string;
    /** The name of this shared drive. */
    name?: string;
    /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
    orgUnitId?: string;
    /** A set of restrictions that apply to this shared drive or items inside this shared drive. */
    restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; driveMembersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean };
    /** The ID of the theme from which the background image and color are set. The set of possible driveThemes can be retrieved from a drive.about.get response. When not specified on a drive.drives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
    themeId?: string;
    /** The ID of the shared drive. */
    driveId: string;
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
    /** Issue the request as a domain administrator. If set to true, then the requester is granted access if they're an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<Drive>;

  /**
   * Hides a shared drive from the default view.
   */
  driveDrivesHide: (input: {
    /** The ID of the shared drive. */
    driveId: string;
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
  }) => Promise<Drive>;

  /**
   * Restores a shared drive to the default view.
   */
  driveDrivesUnhide: (input: {
    /** The ID of the shared drive. */
    driveId: string;
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
  }) => Promise<Drive>;

  /**
   * Lists or searches files.
   */
  driveFilesList: (input: {
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
  }) => Promise<FileList>;

  /**
   * Creates a file.
   */
  driveFilesCreate: (input: {
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
  }) => Promise<File>;

  /**
   * Generates a set of file IDs which can be provided in create or copy requests.
   */
  driveFilesGenerateIds: (input: {
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
  }) => Promise<GeneratedIds>;

  /**
   * Permanently deletes all of the user's trashed files.
   */
  driveFilesEmptyTrash: (input: {
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
  }) => Promise<unknown>;

  /**
   * Permanently deletes a file owned by the user without moving it to the trash. If the file belongs to a shared drive the user must be an organizer on the parent. If the target is a folder, all descendants owned by the user are also deleted.
   */
  driveFilesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets a file's metadata or content by ID.
   */
  driveFilesGet: (input: {
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
  }) => Promise<File>;

  /**
   * Updates a file's metadata and/or content. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might change automatically, such as modifiedDate. This method supports patch semantics.
   */
  driveFilesUpdate: (input: {
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
  }) => Promise<File>;

  /**
   * Lists a file's comments.
   */
  driveCommentsList: (input: {
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
  }) => Promise<CommentList>;

  /**
   * Creates a comment on a file.
   */
  driveCommentsCreate: (input: {
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
  }) => Promise<Comment>;

  /**
   * Deletes a comment.
   */
  driveCommentsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets a comment by ID.
   */
  driveCommentsGet: (input: {
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
  }) => Promise<Comment>;

  /**
   * Updates a comment with patch semantics.
   */
  driveCommentsUpdate: (input: {
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
  }) => Promise<Comment>;

  /**
   * Lists a comment's replies.
   */
  driveRepliesList: (input: {
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
  }) => Promise<ReplyList>;

  /**
   * Creates a reply to a comment.
   */
  driveRepliesCreate: (input: {
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
  }) => Promise<Reply>;

  /**
   * Deletes a reply.
   */
  driveRepliesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets a reply by ID.
   */
  driveRepliesGet: (input: {
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
  }) => Promise<Reply>;

  /**
   * Updates a reply with patch semantics.
   */
  driveRepliesUpdate: (input: {
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
  }) => Promise<Reply>;

  /**
   * Creates a copy of a file and applies any requested updates with patch semantics. Folders cannot be copied.
   */
  driveFilesCopy: (input: {
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
  }) => Promise<File>;

  /**
   * Exports a Google Workspace document to the requested MIME type and returns exported byte content. Note that the exported content is limited to 10MB.
   */
  driveFilesExport: (input: {
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
  }) => Promise<unknown>;

  /**
   * Lists the labels on a file.
   */
  driveFilesListLabels: (input: {
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
  }) => Promise<LabelList>;

  /**
   * Modifies the set of labels on a file.
   */
  driveFilesModifyLabels: (input: {
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
  }) => Promise<ModifyLabelsResponse>;

  /**
   * Lists a file's or shared drive's permissions.
   */
  drivePermissionsList: (input: {
    /** The ID of the file or shared drive. */
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
    /** Specifies which additional view's permissions to include in the response. Only 'published' is supported. */
    includePermissionsForView?: string;
    /** The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned. */
    pageSize?: number;
    /** The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. */
    pageToken?: string;
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<PermissionList>;

  /**
   * Creates a permission for a file or shared drive. For more information on creating permissions, see Share files, folders & drives.
   */
  drivePermissionsCreate: (input: {
    /** Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone. */
    allowFileDiscovery?: boolean;
    /** Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions. */
    deleted?: boolean;
    /** The "pretty" name of the value of the permission. The following is a list of examples for each type of permission:   - user - User's full name, as defined for their Google Account, such as "Joe Smith."  - group - Name of the Google Group, such as "The Company Administrators."  - domain - String domain name, such as "your-company.com."  - anyone - No displayName is present. */
    displayName?: string;
    /** The domain to which this permission refers. The following options are currently allowed:   - The entire domain, such as "your-company.com."  - A target audience, such as "ID.audience.googledomains.com." */
    domain?: string;
    /** The email address of the user or group to which this permission refers. */
    emailAddress?: string;
    /** The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions:   - They cannot be set on shared drive items.  - They can only be set on user and group permissions.  - The time must be in the future.  - The time cannot be more than one year in the future. */
    expirationTime?: string;
    /** The ID of this permission. This is a unique identifier for the grantee, and is published in User resources as permissionId. IDs should be treated as opaque values. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "drive#permission". */
    kind?: string;
    /** Whether the account associated with this permission is a pending owner. Only populated for user type permissions for files that aren't in a shared drive. */
    pendingOwner?: boolean;
    /** Details of whether the permissions on this shared drive item are inherited or are directly on this item. This is an output-only field that's present only for shared drive items. */
    permissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; permissionType?: string; role?: string })[];
    /** A link to the user's profile photo, if available. */
    photoLink?: string;
    /** The role granted by this permission. While new values may be supported in the future, the following are currently allowed:   - owner  - organizer  - fileOrganizer  - writer  - commenter  - reader */
    role?: string;
    /** Deprecated - use permissionDetails instead. */
    teamDrivePermissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; role?: string; teamDrivePermissionType?: string })[];
    /** The type of the grantee. Valid values are:   - user  - group  - domain  - anyone  When creating a permission, if type is user or group, you must provide an emailAddress for the user or group. When type is domain, you must provide a domain. There isn't extra information required for the anyone type. */
    type?: string;
    /** Indicates the view for this permission. Only populated for permissions that belong to a view. published is the only supported value. */
    view?: string;
    /** The ID of the file or shared drive. */
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
    /** A plain text custom message to include in the notification email. */
    emailMessage?: string;
    /** Deprecated. See moveToNewOwnersRoot for details. */
    enforceSingleParent?: boolean;
    /** This parameter will only take effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. If set to true, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to false, parents are not changed. */
    moveToNewOwnersRoot?: boolean;
    /** Whether to send a notification email when sharing to users or groups. This defaults to true for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers. */
    sendNotificationEmail?: boolean;
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. File owners can only transfer ownership of files existing on My Drive. Files existing in a shared drive are owned by the organization that owns that shared drive. Ownership transfers are not supported for files and folders in shared drives. Organizers of a shared drive can move items from that shared drive into their My Drive which transfers the ownership to them. */
    transferOwnership?: boolean;
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<Permission>;

  /**
   * Deletes a permission.
   */
  drivePermissionsDelete: (input: {
    /** The ID of the file or shared drive. */
    fileId: string;
    /** The ID of the permission. */
    permissionId: string;
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
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<unknown>;

  /**
   * Gets a permission by ID.
   */
  drivePermissionsGet: (input: {
    /** The ID of the file. */
    fileId: string;
    /** The ID of the permission. */
    permissionId: string;
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
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<Permission>;

  /**
   * Updates a permission with patch semantics.
   */
  drivePermissionsUpdate: (input: {
    /** Whether the permission allows the file to be discovered through search. This is only applicable for permissions of type domain or anyone. */
    allowFileDiscovery?: boolean;
    /** Whether the account associated with this permission has been deleted. This field only pertains to user and group permissions. */
    deleted?: boolean;
    /** The "pretty" name of the value of the permission. The following is a list of examples for each type of permission:   - user - User's full name, as defined for their Google Account, such as "Joe Smith."  - group - Name of the Google Group, such as "The Company Administrators."  - domain - String domain name, such as "your-company.com."  - anyone - No displayName is present. */
    displayName?: string;
    /** The domain to which this permission refers. The following options are currently allowed:   - The entire domain, such as "your-company.com."  - A target audience, such as "ID.audience.googledomains.com." */
    domain?: string;
    /** The email address of the user or group to which this permission refers. */
    emailAddress?: string;
    /** The time at which this permission will expire (RFC 3339 date-time). Expiration times have the following restrictions:   - They cannot be set on shared drive items.  - They can only be set on user and group permissions.  - The time must be in the future.  - The time cannot be more than one year in the future. */
    expirationTime?: string;
    /** The ID of this permission. This is a unique identifier for the grantee, and is published in User resources as permissionId. IDs should be treated as opaque values. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "drive#permission". */
    kind?: string;
    /** Whether the account associated with this permission is a pending owner. Only populated for user type permissions for files that aren't in a shared drive. */
    pendingOwner?: boolean;
    /** Details of whether the permissions on this shared drive item are inherited or are directly on this item. This is an output-only field that's present only for shared drive items. */
    permissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; permissionType?: string; role?: string })[];
    /** A link to the user's profile photo, if available. */
    photoLink?: string;
    /** The role granted by this permission. While new values may be supported in the future, the following are currently allowed:   - owner  - organizer  - fileOrganizer  - writer  - commenter  - reader */
    role?: string;
    /** Deprecated - use permissionDetails instead. */
    teamDrivePermissionDetails?: ({ inherited?: boolean; inheritedFrom?: string; role?: string; teamDrivePermissionType?: string })[];
    /** The type of the grantee. Valid values are:   - user  - group  - domain  - anyone  When creating a permission, if type is user or group, you must provide an emailAddress for the user or group. When type is domain, you must provide a domain. There isn't extra information required for the anyone type. */
    type?: string;
    /** Indicates the view for this permission. Only populated for permissions that belong to a view. published is the only supported value. */
    view?: string;
    /** The ID of the file or shared drive. */
    fileId: string;
    /** The ID of the permission. */
    permissionId: string;
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
    /** Whether to remove the expiration date. */
    removeExpiration?: boolean;
    /** Whether the requesting application supports both My Drives and shared drives. */
    supportsAllDrives?: boolean;
    /** Deprecated use supportsAllDrives instead. */
    supportsTeamDrives?: boolean;
    /** Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. File owners can only transfer ownership of files existing on My Drive. Files existing in a shared drive are owned by the organization that owns that shared drive. Ownership transfers are not supported for files and folders in shared drives. Organizers of a shared drive can move items from that shared drive into their My Drive which transfers the ownership to them. */
    transferOwnership?: boolean;
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<Permission>;

  /**
   * Lists a file's revisions.
   */
  driveRevisionsList: (input: {
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
  }) => Promise<RevisionList>;

  /**
   * Permanently deletes a file version. You can only delete revisions for files with binary content in Google Drive, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted.
   */
  driveRevisionsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets a revision's metadata or content by ID.
   */
  driveRevisionsGet: (input: {
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
  }) => Promise<Revision>;

  /**
   * Updates a revision with patch semantics.
   */
  driveRevisionsUpdate: (input: {
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
  }) => Promise<Revision>;

  /**
   * Subscribes to changes to a file.
   */
  driveFilesWatch: (input: {
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
  }) => Promise<Channel>;

  /**
   * Deprecated use drives.list instead.
   */
  driveTeamdrivesList: (input: {
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
    /** Maximum number of Team Drives to return. */
    pageSize?: number;
    /** Page token for Team Drives. */
    pageToken?: string;
    /** Query string for searching Team Drives. */
    q?: string;
    /** Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned. */
    useDomainAdminAccess?: boolean;
  }) => Promise<TeamDriveList>;

  /**
   * Deprecated use drives.create instead.
   */
  driveTeamdrivesCreate: (input: {
    /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on drive.teamdrives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
    backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
    /** A short-lived link to this Team Drive's background image. */
    backgroundImageLink?: string;
    /** Capabilities the current user has on this Team Drive. */
    capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canChangeTeamDriveBackground?: boolean; canChangeTeamMembersOnlyRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteTeamDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canRenameTeamDrive?: boolean; canResetTeamDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
    /** The color of this Team Drive as an RGB hex string. It can only be set on a drive.teamdrives.update request that does not set themeId. */
    colorRgb?: string;
    /** The time at which the Team Drive was created (RFC 3339 date-time). */
    createdTime?: string;
    /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "drive#teamDrive". */
    kind?: string;
    /** The name of this Team Drive. */
    name?: string;
    /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
    orgUnitId?: string;
    /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
    restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean; teamMembersOnly?: boolean };
    /** The ID of the theme from which the background image and color will be set. The set of possible teamDriveThemes can be retrieved from a drive.about.get response. When not specified on a drive.teamdrives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
    themeId?: string;
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
    /** An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned. */
    requestId: string;
  }) => Promise<TeamDrive>;

  /**
   * Deprecated use drives.delete instead.
   */
  driveTeamdrivesDelete: (input: {
    /** The ID of the Team Drive */
    teamDriveId: string;
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
  }) => Promise<unknown>;

  /**
   * Deprecated use drives.get instead.
   */
  driveTeamdrivesGet: (input: {
    /** The ID of the Team Drive */
    teamDriveId: string;
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
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<TeamDrive>;

  /**
   * Deprecated use drives.update instead
   */
  driveTeamdrivesUpdate: (input: {
    /** An image file and cropping parameters from which a background image for this Team Drive is set. This is a write only field; it can only be set on drive.teamdrives.update requests that don't set themeId. When specified, all fields of the backgroundImageFile must be set. */
    backgroundImageFile?: { id?: string; width?: number; xCoordinate?: number; yCoordinate?: number };
    /** A short-lived link to this Team Drive's background image. */
    backgroundImageLink?: string;
    /** Capabilities the current user has on this Team Drive. */
    capabilities?: { canAddChildren?: boolean; canChangeCopyRequiresWriterPermissionRestriction?: boolean; canChangeDomainUsersOnlyRestriction?: boolean; canChangeSharingFoldersRequiresOrganizerPermissionRestriction?: boolean; canChangeTeamDriveBackground?: boolean; canChangeTeamMembersOnlyRestriction?: boolean; canComment?: boolean; canCopy?: boolean; canDeleteChildren?: boolean; canDeleteTeamDrive?: boolean; canDownload?: boolean; canEdit?: boolean; canListChildren?: boolean; canManageMembers?: boolean; canReadRevisions?: boolean; canRemoveChildren?: boolean; canRename?: boolean; canRenameTeamDrive?: boolean; canResetTeamDriveRestrictions?: boolean; canShare?: boolean; canTrashChildren?: boolean };
    /** The color of this Team Drive as an RGB hex string. It can only be set on a drive.teamdrives.update request that does not set themeId. */
    colorRgb?: string;
    /** The time at which the Team Drive was created (RFC 3339 date-time). */
    createdTime?: string;
    /** The ID of this Team Drive which is also the ID of the top level folder of this Team Drive. */
    id?: string;
    /** Identifies what kind of resource this is. Value: the fixed string "drive#teamDrive". */
    kind?: string;
    /** The name of this Team Drive. */
    name?: string;
    /** The organizational unit of this shared drive. This field is only populated on drives.list responses when the useDomainAdminAccess parameter is set to true. */
    orgUnitId?: string;
    /** A set of restrictions that apply to this Team Drive or items inside this Team Drive. */
    restrictions?: { adminManagedRestrictions?: boolean; copyRequiresWriterPermission?: boolean; domainUsersOnly?: boolean; sharingFoldersRequiresOrganizerPermission?: boolean; teamMembersOnly?: boolean };
    /** The ID of the theme from which the background image and color will be set. The set of possible teamDriveThemes can be retrieved from a drive.about.get response. When not specified on a drive.teamdrives.create request, a random theme is chosen from which the background image and color are set. This is a write-only field; it can only be set on requests that don't set colorRgb or backgroundImageFile. */
    themeId?: string;
    /** The ID of the Team Drive */
    teamDriveId: string;
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
    /** Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs. */
    useDomainAdminAccess?: boolean;
  }) => Promise<TeamDrive>;
};

export * from "./schemas.js";
