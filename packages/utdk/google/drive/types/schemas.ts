/** Information about the user, the user's Drive, and system capabilities. */
export type About = {
  /** Whether the user has installed the requesting app. */
  appInstalled?: boolean;
  /** Whether the user can create shared drives. */
  canCreateDrives?: boolean;
  /** Deprecated - use canCreateDrives instead. */
  canCreateTeamDrives?: boolean;
  /** A list of themes that are supported for shared drives. */
  driveThemes?: ({ backgroundImageLink?: string; colorRgb?: string; id?: string })[];
  /** A map of source MIME type to possible targets for all supported exports. */
  exportFormats?: { [key: string]: (string)[] | undefined };
  /** The currently supported folder colors as RGB hex strings. */
  folderColorPalette?: (string)[];
  /** A map of source MIME type to possible targets for all supported imports. */
  importFormats?: { [key: string]: (string)[] | undefined };
  /** Identifies what kind of resource this is. Value: the fixed string "drive#about". */
  kind?: string;
  /** A map of maximum import sizes by MIME type, in bytes. */
  maxImportSizes?: { [key: string]: string | undefined };
  /** The maximum upload size in bytes. */
  maxUploadSize?: string;
  /** The user's storage quota limits and usage. All fields are measured in bytes. */
  storageQuota?: { limit?: string; usage?: string; usageInDrive?: string; usageInDriveTrash?: string };
  /** Deprecated - use driveThemes instead. */
  teamDriveThemes?: ({ backgroundImageLink?: string; colorRgb?: string; id?: string })[];
  /** The authenticated user. */
  user?: User;
};

/** A change to a file or shared drive. */
export type Change = {
  /** The type of the change. Possible values are file and drive. */
  changeType?: string;
  /** The updated state of the shared drive. Present if the changeType is drive, the user is still a member of the shared drive, and the shared drive has not been deleted. */
  drive?: Drive;
  /** The ID of the shared drive associated with this change. */
  driveId?: string;
  /** The updated state of the file. Present if the type is file and the file has not been removed from this list of changes. */
  file?: File;
  /** The ID of the file which has changed. */
  fileId?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#change". */
  kind?: string;
  /** Whether the file or shared drive has been removed from this list of changes, for example by deletion or loss of access. */
  removed?: boolean;
  /** Deprecated - use drive instead. */
  teamDrive?: TeamDrive;
  /** Deprecated - use driveId instead. */
  teamDriveId?: string;
  /** The time of this change (RFC 3339 date-time). */
  time?: string;
  /** Deprecated - use changeType instead. */
  type?: string;
};

/** A list of changes for a user. */
export type ChangeList = {
  /** The list of changes. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  changes?: (Change)[];
  /** Identifies what kind of resource this is. Value: the fixed string "drive#changeList". */
  kind?: string;
  /** The starting page token for future changes. This will be present only if the end of the current changes list has been reached. */
  newStartPageToken?: string;
  /** The page token for the next page of changes. This will be absent if the end of the changes list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
};

/** An notification channel used to watch for resource changes. */
export type Channel = {
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
};

/** A comment on a file. */
export type Comment = {
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
};

/** A list of comments on a file. */
export type CommentList = {
  /** The list of comments. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  comments?: (Comment)[];
  /** Identifies what kind of resource this is. Value: the fixed string "drive#commentList". */
  kind?: string;
  /** The page token for the next page of comments. This will be absent if the end of the comments list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
};

/** A restriction for accessing the content of the file. */
export type ContentRestriction = {
  /** Whether the content of the file is read-only. If a file is read-only, a new revision of the file may not be added, comments may not be added or modified, and the title of the file may not be modified. */
  readOnly?: boolean;
  /** Reason for why the content of the file is restricted. This is only mutable on requests that also set readOnly=true. */
  reason?: string;
  /** The user who set the content restriction. Only populated if readOnly is true. */
  restrictingUser?: User;
  /** The time at which the content restriction was set (formatted RFC 3339 timestamp). Only populated if readOnly is true. */
  restrictionTime?: string;
  /** The type of the content restriction. Currently the only possible value is globalContentRestriction. */
  type?: string;
};

/** Representation of a shared drive. */
export type Drive = {
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
};

/** A list of shared drives. */
export type DriveList = {
  /** The list of shared drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  drives?: (Drive)[];
  /** Identifies what kind of resource this is. Value: the fixed string "drive#driveList". */
  kind?: string;
  /** The page token for the next page of shared drives. This will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
};

/** The metadata for a file. */
export type File = {
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
};

/** A list of files. */
export type FileList = {
  /** The list of files. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  files?: (File)[];
  /** Whether the search process was incomplete. If true, then some search results may be missing, since all documents were not searched. This may occur when searching multiple drives with the "allDrives" corpora, but all corpora could not be searched. When this happens, it is suggested that clients narrow their query by choosing a different corpus such as "user" or "drive". */
  incompleteSearch?: boolean;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#fileList". */
  kind?: string;
  /** The page token for the next page of files. This will be absent if the end of the files list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
};

/** A list of generated file IDs which can be provided in create requests. */
export type GeneratedIds = {
  /** The IDs generated for the requesting user in the specified space. */
  ids?: (string)[];
  /** Identifies what kind of resource this is. Value: the fixed string "drive#generatedIds". */
  kind?: string;
  /** The type of file that can be created with these IDs. */
  space?: string;
};

/** Representation of a label and its fields. */
export type Label = {
  /** A map of the label's fields keyed by the field ID. */
  fields?: { [key: string]: LabelField | undefined };
  /** The ID of the label. */
  id?: string;
  /** This is always drive#label */
  kind?: string;
  /** The revision ID of the label. */
  revisionId?: string;
};

/** Representation of a label field. */
export type LabelField = {
  /** Only present if valueType is dateString. RFC 3339 formatted date: YYYY-MM-DD. */
  dateString?: (string)[];
  /** The identifier of this field. */
  id?: string;
  /** Only present if valueType is integer. */
  integer?: (string)[];
  /** This is always drive#labelField. */
  kind?: string;
  /** Only present if valueType is selection. */
  selection?: (string)[];
  /** Only present if valueType is text. */
  text?: (string)[];
  /** Only present if valueType is user. */
  user?: (User)[];
  /** The field type. While new values may be supported in the future, the following are currently allowed:   - dateString  - integer  - selection  - text  - user */
  valueType?: string;
};

/** A modification to a label's field. */
export type LabelFieldModification = {
  /** The ID of the Field to be modified. */
  fieldId?: string;
  /** This is always drive#labelFieldModification. */
  kind?: string;
  /** Replaces a dateString field with these new values. The values must be strings in the RFC 3339 full-date format: YYYY-MM-DD. */
  setDateValues?: (string)[];
  /** Replaces an integer field with these new values. */
  setIntegerValues?: (string)[];
  /** Replaces a selection field with these new values. */
  setSelectionValues?: (string)[];
  /** Replaces a text field with these new values. */
  setTextValues?: (string)[];
  /** Replaces a user field with these new values. The values must be valid email addresses. */
  setUserValues?: (string)[];
  /** Unsets the values for this field. */
  unsetValues?: boolean;
};

/** A list of labels. */
export type LabelList = {
  /** This is always drive#labelList */
  kind?: string;
  /** The list of labels. */
  labels?: (Label)[];
  /** The page token for the next page of labels. This field will be absent if the end of the list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
};

/** A modification to a label on a file. A LabelModification can be used to apply a label to a file, update an existing label on a file, or remove a label from a file. */
export type LabelModification = {
  /** The list of modifications to this label's fields. */
  fieldModifications?: (LabelFieldModification)[];
  /** This is always drive#labelModification. */
  kind?: string;
  /** The ID of the label to modify. */
  labelId?: string;
  /** If true, the label will be removed from the file. */
  removeLabel?: boolean;
};

/** A request to modify the set of labels on a file. This request may contain many modifications that will either all succeed or all fail transactionally. */
export type ModifyLabelsRequest = {
  /** This is always drive#modifyLabelsRequest */
  kind?: string;
  /** The list of modifications to apply to the labels on the file. */
  labelModifications?: (LabelModification)[];
};

/** Response to a ModifyLabels request. This contains only those labels which were added or updated by the request. */
export type ModifyLabelsResponse = {
  /** This is always drive#modifyLabelsResponse */
  kind?: string;
  /** The list of labels which were added or updated by the request. */
  modifiedLabels?: (Label)[];
};

/** A permission for a file. A permission grants a user, group, domain, or the world access to a file or a folder hierarchy. */
export type Permission = {
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
};

/** A list of permissions for a file. */
export type PermissionList = {
  /** Identifies what kind of resource this is. Value: the fixed string "drive#permissionList". */
  kind?: string;
  /** The page token for the next page of permissions. This field will be absent if the end of the permissions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** The list of permissions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  permissions?: (Permission)[];
};

/** A reply to a comment on a file. */
export type Reply = {
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
};

/** A list of replies to a comment on a file. */
export type ReplyList = {
  /** Identifies what kind of resource this is. Value: the fixed string "drive#replyList". */
  kind?: string;
  /** The page token for the next page of replies. This will be absent if the end of the replies list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** The list of replies. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  replies?: (Reply)[];
};

/** The metadata for a revision to a file. */
export type Revision = {
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
};

/** A list of revisions of a file. */
export type RevisionList = {
  /** Identifies what kind of resource this is. Value: the fixed string "drive#revisionList". */
  kind?: string;
  /** The page token for the next page of revisions. This will be absent if the end of the revisions list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** The list of revisions. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  revisions?: (Revision)[];
};

export type StartPageToken = {
  /** Identifies what kind of resource this is. Value: the fixed string "drive#startPageToken". */
  kind?: string;
  /** The starting page token for listing changes. */
  startPageToken?: string;
};

/** Deprecated: use the drive collection instead. */
export type TeamDrive = {
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
};

/** A list of Team Drives. */
export type TeamDriveList = {
  /** Identifies what kind of resource this is. Value: the fixed string "drive#teamDriveList". */
  kind?: string;
  /** The page token for the next page of Team Drives. This will be absent if the end of the Team Drives list has been reached. If the token is rejected for any reason, it should be discarded, and pagination should be restarted from the first page of results. */
  nextPageToken?: string;
  /** The list of Team Drives. If nextPageToken is populated, then this list may be incomplete and an additional page of results should be fetched. */
  teamDrives?: (TeamDrive)[];
};

/** Information about a Drive user. */
export type User = {
  /** A plain text displayable name for this user. */
  displayName?: string;
  /** The email address of the user. This may not be present in certain contexts if the user has not made their email address visible to the requester. */
  emailAddress?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "drive#user". */
  kind?: string;
  /** Whether this user is the requesting user. */
  me?: boolean;
  /** The user's ID as visible in Permission resources. */
  permissionId?: string;
  /** A link to the user's profile photo, if available. */
  photoLink?: string;
};
