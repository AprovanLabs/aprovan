import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "drive.about.get": {
    "accessPath": [
      "driveAboutGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/about",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Gets information about the user, the user's Drive, and system capabilities."
  },
  "drive.changes.list": {
    "accessPath": [
      "driveChangesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/changes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageToken",
      "driveId",
      "includeCorpusRemovals",
      "includeItemsFromAllDrives",
      "includeLabels",
      "includePermissionsForView",
      "includeRemoved",
      "includeTeamDriveItems",
      "pageSize",
      "restrictToMyDrive",
      "spaces",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "description": "Lists the changes for a user or shared drive.",
    "parameterDescriptions": {
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.",
      "driveId": "The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.",
      "includeCorpusRemovals": "Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.",
      "includeItemsFromAllDrives": "Whether both My Drive and shared drive items should be included in results.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "includeRemoved": "Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.",
      "includeTeamDriveItems": "Deprecated use includeItemsFromAllDrives instead.",
      "pageSize": "The maximum number of changes to return per page.",
      "restrictToMyDrive": "Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.",
      "spaces": "A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "teamDriveId": "Deprecated use driveId instead."
    }
  },
  "drive.changes.getStartPageToken": {
    "accessPath": [
      "driveChangesGetStartPageToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/changes/startPageToken",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "driveId",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "description": "Gets the starting pageToken for listing future changes.",
    "parameterDescriptions": {
      "driveId": "The ID of the shared drive for which the starting pageToken for listing future changes from that shared drive is returned.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "teamDriveId": "Deprecated use driveId instead."
    }
  },
  "drive.changes.watch": {
    "accessPath": [
      "driveChangesWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/changes/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageToken",
      "driveId",
      "includeCorpusRemovals",
      "includeItemsFromAllDrives",
      "includeLabels",
      "includePermissionsForView",
      "includeRemoved",
      "includeTeamDriveItems",
      "pageSize",
      "restrictToMyDrive",
      "spaces",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "description": "Subscribes to changes for a user. To use this method, you must include the pageToken query parameter.",
    "parameterDescriptions": {
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response or to the response from the getStartPageToken method.",
      "driveId": "The shared drive from which changes are returned. If specified the change IDs will be reflective of the shared drive; use the combined drive ID and change ID as an identifier.",
      "includeCorpusRemovals": "Whether changes should include the file resource if the file is still accessible by the user at the time of the request, even when a file was removed from the list of changes and there will be no further change entries for this file.",
      "includeItemsFromAllDrives": "Whether both My Drive and shared drive items should be included in results.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "includeRemoved": "Whether to include changes indicating that items have been removed from the list of changes, for example by deletion or loss of access.",
      "includeTeamDriveItems": "Deprecated use includeItemsFromAllDrives instead.",
      "pageSize": "The maximum number of changes to return per page.",
      "restrictToMyDrive": "Whether to restrict the results to changes inside the My Drive hierarchy. This omits changes to files such as those in the Application Data folder or shared files which have not been added to My Drive.",
      "spaces": "A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "teamDriveId": "Deprecated use driveId instead."
    }
  },
  "drive.channels.stop": {
    "accessPath": [
      "driveChannelsStop"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/channels/stop",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Stop watching resources through this channel"
  },
  "drive.drives.list": {
    "accessPath": [
      "driveDrivesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/drives",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageSize",
      "pageToken",
      "q",
      "useDomainAdminAccess"
    ],
    "description": "Lists the user's shared drives.",
    "parameterDescriptions": {
      "pageSize": "Maximum number of shared drives to return per page.",
      "pageToken": "Page token for shared drives.",
      "q": "Query string for searching shared drives.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then all shared drives of the domain in which the requester is an administrator are returned."
    }
  },
  "drive.drives.create": {
    "accessPath": [
      "driveDrivesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "backgroundImageFile",
      "backgroundImageLink",
      "capabilities",
      "colorRgb",
      "createdTime",
      "hidden",
      "id",
      "kind",
      "name",
      "orgUnitId",
      "restrictions",
      "themeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/drives",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "requestId"
    ],
    "description": "Creates a shared drive.",
    "parameterDescriptions": {
      "requestId": "An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a shared drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same shared drive. If the shared drive already exists a 409 error will be returned."
    }
  },
  "drive.drives.delete": {
    "accessPath": [
      "driveDrivesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/drives/{driveId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "driveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "allowItemDeletion",
      "useDomainAdminAccess"
    ],
    "description": "Permanently deletes a shared drive for which the user is an organizer. The shared drive cannot contain any untrashed items.",
    "parameterDescriptions": {
      "driveId": "The ID of the shared drive.",
      "allowItemDeletion": "Whether any items inside the shared drive should also be deleted. This option is only supported when useDomainAdminAccess is also set to true.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.drives.get": {
    "accessPath": [
      "driveDrivesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/drives/{driveId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "driveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "description": "Gets a shared drive's metadata by ID.",
    "parameterDescriptions": {
      "driveId": "The ID of the shared drive.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.drives.update": {
    "accessPath": [
      "driveDrivesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "backgroundImageFile",
      "backgroundImageLink",
      "capabilities",
      "colorRgb",
      "createdTime",
      "hidden",
      "id",
      "kind",
      "name",
      "orgUnitId",
      "restrictions",
      "themeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/drives/{driveId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "driveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "description": "Updates the metadata for a shared drive.",
    "parameterDescriptions": {
      "driveId": "The ID of the shared drive.",
      "useDomainAdminAccess": "Issue the request as a domain administrator. If set to true, then the requester is granted access if they're an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.drives.hide": {
    "accessPath": [
      "driveDrivesHide"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/drives/{driveId}/hide",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "driveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Hides a shared drive from the default view.",
    "parameterDescriptions": {
      "driveId": "The ID of the shared drive."
    }
  },
  "drive.drives.unhide": {
    "accessPath": [
      "driveDrivesUnhide"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/drives/{driveId}/unhide",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "driveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Restores a shared drive to the default view.",
    "parameterDescriptions": {
      "driveId": "The ID of the shared drive."
    }
  },
  "drive.files.list": {
    "accessPath": [
      "driveFilesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "corpora",
      "corpus",
      "driveId",
      "includeItemsFromAllDrives",
      "includeLabels",
      "includePermissionsForView",
      "includeTeamDriveItems",
      "orderBy",
      "pageSize",
      "pageToken",
      "q",
      "spaces",
      "supportsAllDrives",
      "supportsTeamDrives",
      "teamDriveId"
    ],
    "description": "Lists or searches files.",
    "parameterDescriptions": {
      "corpora": "Groupings of files to which the query applies. Supported groupings are: 'user' (files created by, opened by, or shared directly with the user), 'drive' (files in the specified shared drive as indicated by the 'driveId'), 'domain' (files shared to the user's domain), and 'allDrives' (A combination of 'user' and 'drive' for all drives where the user is a member). When able, use 'user' or 'drive', instead of 'allDrives', for efficiency.",
      "corpus": "The source of files to list. Deprecated: use 'corpora' instead.",
      "driveId": "ID of the shared drive to search.",
      "includeItemsFromAllDrives": "Whether both My Drive and shared drive items should be included in results.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "includeTeamDriveItems": "Deprecated use includeItemsFromAllDrives instead.",
      "orderBy": "A comma-separated list of sort keys. Valid keys are 'createdTime', 'folder', 'modifiedByMeTime', 'modifiedTime', 'name', 'name_natural', 'quotaBytesUsed', 'recency', 'sharedWithMeTime', 'starred', and 'viewedByMeTime'. Each key sorts ascending by default, but may be reversed with the 'desc' modifier. Example usage: ?orderBy=folder,modifiedTime desc,name. Please note that there is a current limitation for users with approximately one million files in which the requested sort order is ignored.",
      "pageSize": "The maximum number of files to return per page. Partial or empty result pages are possible even before the end of the files list has been reached.",
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.",
      "q": "A query for filtering the file results. See the \"Search for Files\" guide for supported syntax.",
      "spaces": "A comma-separated list of spaces to query within the corpora. Supported values are 'drive' and 'appDataFolder'.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "teamDriveId": "Deprecated use driveId instead."
    }
  },
  "drive.files.create": {
    "accessPath": [
      "driveFilesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "appProperties",
      "capabilities",
      "contentHints",
      "contentRestrictions",
      "copyRequiresWriterPermission",
      "createdTime",
      "description",
      "driveId",
      "explicitlyTrashed",
      "exportLinks",
      "fileExtension",
      "folderColorRgb",
      "fullFileExtension",
      "hasAugmentedPermissions",
      "hasThumbnail",
      "headRevisionId",
      "iconLink",
      "id",
      "imageMediaMetadata",
      "isAppAuthorized",
      "kind",
      "labelInfo",
      "lastModifyingUser",
      "linkShareMetadata",
      "md5Checksum",
      "mimeType",
      "modifiedByMe",
      "modifiedByMeTime",
      "modifiedTime",
      "name",
      "originalFilename",
      "ownedByMe",
      "owners",
      "parents",
      "permissionIds",
      "permissions",
      "properties",
      "quotaBytesUsed",
      "resourceKey",
      "sha1Checksum",
      "sha256Checksum",
      "shared",
      "sharedWithMeTime",
      "sharingUser",
      "shortcutDetails",
      "size",
      "spaces",
      "starred",
      "teamDriveId",
      "thumbnailLink",
      "thumbnailVersion",
      "trashed",
      "trashedTime",
      "trashingUser",
      "version",
      "videoMediaMetadata",
      "viewedByMe",
      "viewedByMeTime",
      "viewersCanCopyContent",
      "webContentLink",
      "webViewLink",
      "writersCanShare"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "enforceSingleParent",
      "ignoreDefaultVisibility",
      "includeLabels",
      "includePermissionsForView",
      "keepRevisionForever",
      "ocrLanguage",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useContentAsIndexableText"
    ],
    "description": "Creates a file.",
    "parameterDescriptions": {
      "enforceSingleParent": "Deprecated. Creating files in multiple folders is no longer supported.",
      "ignoreDefaultVisibility": "Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "keepRevisionForever": "Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions.",
      "ocrLanguage": "A language hint for OCR processing during image import (ISO 639-1 code).",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "useContentAsIndexableText": "Whether to use the uploaded content as indexable text."
    }
  },
  "drive.files.generateIds": {
    "accessPath": [
      "driveFilesGenerateIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/generateIds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "count",
      "space",
      "type"
    ],
    "description": "Generates a set of file IDs which can be provided in create or copy requests.",
    "parameterDescriptions": {
      "count": "The number of IDs to return.",
      "space": "The space in which the IDs can be used to create new files. Supported values are 'drive' and 'appDataFolder'. (Default: 'drive')",
      "type": "The type of items which the IDs can be used for. Supported values are 'files' and 'shortcuts'. Note that 'shortcuts' are only supported in the drive 'space'. (Default: 'files')"
    }
  },
  "drive.files.emptyTrash": {
    "accessPath": [
      "driveFilesEmptyTrash"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/files/trash",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "driveId",
      "enforceSingleParent"
    ],
    "description": "Permanently deletes all of the user's trashed files.",
    "parameterDescriptions": {
      "driveId": "If set, empties the trash of the provided shared drive.",
      "enforceSingleParent": "Deprecated. If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item will be placed under its owner's root."
    }
  },
  "drive.files.delete": {
    "accessPath": [
      "driveFilesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/files/{fileId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "enforceSingleParent",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "description": "Permanently deletes a file owned by the user without moving it to the trash. If the file belongs to a shared drive the user must be an organizer on the parent. If the target is a folder, all descendants owned by the user are also deleted.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "enforceSingleParent": "Deprecated. If an item is not in a shared drive and its last parent is deleted but the item itself is not, the item will be placed under its owner's root.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead."
    }
  },
  "drive.files.get": {
    "accessPath": [
      "driveFilesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "acknowledgeAbuse",
      "includeLabels",
      "includePermissionsForView",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "description": "Gets a file's metadata or content by ID.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "acknowledgeAbuse": "Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead."
    }
  },
  "drive.files.update": {
    "accessPath": [
      "driveFilesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "appProperties",
      "capabilities",
      "contentHints",
      "contentRestrictions",
      "copyRequiresWriterPermission",
      "createdTime",
      "description",
      "driveId",
      "explicitlyTrashed",
      "exportLinks",
      "fileExtension",
      "folderColorRgb",
      "fullFileExtension",
      "hasAugmentedPermissions",
      "hasThumbnail",
      "headRevisionId",
      "iconLink",
      "id",
      "imageMediaMetadata",
      "isAppAuthorized",
      "kind",
      "labelInfo",
      "lastModifyingUser",
      "linkShareMetadata",
      "md5Checksum",
      "mimeType",
      "modifiedByMe",
      "modifiedByMeTime",
      "modifiedTime",
      "name",
      "originalFilename",
      "ownedByMe",
      "owners",
      "parents",
      "permissionIds",
      "permissions",
      "properties",
      "quotaBytesUsed",
      "resourceKey",
      "sha1Checksum",
      "sha256Checksum",
      "shared",
      "sharedWithMeTime",
      "sharingUser",
      "shortcutDetails",
      "size",
      "spaces",
      "starred",
      "teamDriveId",
      "thumbnailLink",
      "thumbnailVersion",
      "trashed",
      "trashedTime",
      "trashingUser",
      "version",
      "videoMediaMetadata",
      "viewedByMe",
      "viewedByMeTime",
      "viewersCanCopyContent",
      "webContentLink",
      "webViewLink",
      "writersCanShare"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/files/{fileId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "addParents",
      "enforceSingleParent",
      "includeLabels",
      "includePermissionsForView",
      "keepRevisionForever",
      "ocrLanguage",
      "removeParents",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useContentAsIndexableText"
    ],
    "description": "Updates a file's metadata and/or content. When calling this method, only populate fields in the request that you want to modify. When updating fields, some fields might change automatically, such as modifiedDate. This method supports patch semantics.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "addParents": "A comma-separated list of parent IDs to add.",
      "enforceSingleParent": "Deprecated. Adding files to multiple folders is no longer supported. Use shortcuts instead.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "keepRevisionForever": "Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions.",
      "ocrLanguage": "A language hint for OCR processing during image import (ISO 639-1 code).",
      "removeParents": "A comma-separated list of parent IDs to remove.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "useContentAsIndexableText": "Whether to use the uploaded content as indexable text."
    }
  },
  "drive.comments.list": {
    "accessPath": [
      "driveCommentsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted",
      "pageSize",
      "pageToken",
      "startModifiedTime"
    ],
    "description": "Lists a file's comments.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "includeDeleted": "Whether to include deleted comments. Deleted comments will not include their original content.",
      "pageSize": "The maximum number of comments to return per page.",
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.",
      "startModifiedTime": "The minimum value of 'modifiedTime' for the result comments (RFC 3339 date-time)."
    }
  },
  "drive.comments.create": {
    "accessPath": [
      "driveCommentsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "anchor",
      "author",
      "content",
      "createdTime",
      "deleted",
      "htmlContent",
      "id",
      "kind",
      "modifiedTime",
      "quotedFileContent",
      "replies",
      "resolved"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files/{fileId}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Creates a comment on a file.",
    "parameterDescriptions": {
      "fileId": "The ID of the file."
    }
  },
  "drive.comments.delete": {
    "accessPath": [
      "driveCommentsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Deletes a comment.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment."
    }
  },
  "drive.comments.get": {
    "accessPath": [
      "driveCommentsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted"
    ],
    "description": "Gets a comment by ID.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment.",
      "includeDeleted": "Whether to return deleted comments. Deleted comments will not include their original content."
    }
  },
  "drive.comments.update": {
    "accessPath": [
      "driveCommentsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "anchor",
      "author",
      "content",
      "createdTime",
      "deleted",
      "htmlContent",
      "id",
      "kind",
      "modifiedTime",
      "quotedFileContent",
      "replies",
      "resolved"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Updates a comment with patch semantics.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment."
    }
  },
  "drive.replies.list": {
    "accessPath": [
      "driveRepliesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}/replies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted",
      "pageSize",
      "pageToken"
    ],
    "description": "Lists a comment's replies.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment.",
      "includeDeleted": "Whether to include deleted replies. Deleted replies will not include their original content.",
      "pageSize": "The maximum number of replies to return per page.",
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."
    }
  },
  "drive.replies.create": {
    "accessPath": [
      "driveRepliesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "author",
      "content",
      "createdTime",
      "deleted",
      "htmlContent",
      "id",
      "kind",
      "modifiedTime"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}/replies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Creates a reply to a comment.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment."
    }
  },
  "drive.replies.delete": {
    "accessPath": [
      "driveRepliesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}/replies/{replyId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId",
      "replyId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Deletes a reply.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment.",
      "replyId": "The ID of the reply."
    }
  },
  "drive.replies.get": {
    "accessPath": [
      "driveRepliesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}/replies/{replyId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId",
      "replyId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includeDeleted"
    ],
    "description": "Gets a reply by ID.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment.",
      "replyId": "The ID of the reply.",
      "includeDeleted": "Whether to return deleted replies. Deleted replies will not include their original content."
    }
  },
  "drive.replies.update": {
    "accessPath": [
      "driveRepliesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "author",
      "content",
      "createdTime",
      "deleted",
      "htmlContent",
      "id",
      "kind",
      "modifiedTime"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/files/{fileId}/comments/{commentId}/replies/{replyId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "commentId",
      "replyId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Updates a reply with patch semantics.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "commentId": "The ID of the comment.",
      "replyId": "The ID of the reply."
    }
  },
  "drive.files.copy": {
    "accessPath": [
      "driveFilesCopy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "appProperties",
      "capabilities",
      "contentHints",
      "contentRestrictions",
      "copyRequiresWriterPermission",
      "createdTime",
      "description",
      "driveId",
      "explicitlyTrashed",
      "exportLinks",
      "fileExtension",
      "folderColorRgb",
      "fullFileExtension",
      "hasAugmentedPermissions",
      "hasThumbnail",
      "headRevisionId",
      "iconLink",
      "id",
      "imageMediaMetadata",
      "isAppAuthorized",
      "kind",
      "labelInfo",
      "lastModifyingUser",
      "linkShareMetadata",
      "md5Checksum",
      "mimeType",
      "modifiedByMe",
      "modifiedByMeTime",
      "modifiedTime",
      "name",
      "originalFilename",
      "ownedByMe",
      "owners",
      "parents",
      "permissionIds",
      "permissions",
      "properties",
      "quotaBytesUsed",
      "resourceKey",
      "sha1Checksum",
      "sha256Checksum",
      "shared",
      "sharedWithMeTime",
      "sharingUser",
      "shortcutDetails",
      "size",
      "spaces",
      "starred",
      "teamDriveId",
      "thumbnailLink",
      "thumbnailVersion",
      "trashed",
      "trashedTime",
      "trashingUser",
      "version",
      "videoMediaMetadata",
      "viewedByMe",
      "viewedByMeTime",
      "viewersCanCopyContent",
      "webContentLink",
      "webViewLink",
      "writersCanShare"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files/{fileId}/copy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "enforceSingleParent",
      "ignoreDefaultVisibility",
      "includeLabels",
      "includePermissionsForView",
      "keepRevisionForever",
      "ocrLanguage",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "description": "Creates a copy of a file and applies any requested updates with patch semantics. Folders cannot be copied.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "enforceSingleParent": "Deprecated. Copying files into multiple folders is no longer supported. Use shortcuts instead.",
      "ignoreDefaultVisibility": "Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "keepRevisionForever": "Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions.",
      "ocrLanguage": "A language hint for OCR processing during image import (ISO 639-1 code).",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead."
    }
  },
  "drive.files.export": {
    "accessPath": [
      "driveFilesExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/export",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "mimeType"
    ],
    "description": "Exports a Google Workspace document to the requested MIME type and returns exported byte content. Note that the exported content is limited to 10MB.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "mimeType": "The MIME type of the format requested for this export."
    }
  },
  "drive.files.listLabels": {
    "accessPath": [
      "driveFilesListLabels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/listLabels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "maxResults",
      "pageToken"
    ],
    "description": "Lists the labels on a file.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "maxResults": "The maximum number of labels to return per page. When not set, this defaults to 100.",
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."
    }
  },
  "drive.files.modifyLabels": {
    "accessPath": [
      "driveFilesModifyLabels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "kind",
      "labelModifications"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files/{fileId}/modifyLabels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Modifies the set of labels on a file.",
    "parameterDescriptions": {
      "fileId": "The ID of the file for which the labels are modified."
    }
  },
  "drive.permissions.list": {
    "accessPath": [
      "drivePermissionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "includePermissionsForView",
      "pageSize",
      "pageToken",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useDomainAdminAccess"
    ],
    "description": "Lists a file's or shared drive's permissions.",
    "parameterDescriptions": {
      "fileId": "The ID of the file or shared drive.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "pageSize": "The maximum number of permissions to return per page. When not set for files in a shared drive, at most 100 results will be returned. When not set for files that are not in a shared drive, the entire list will be returned.",
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.permissions.create": {
    "accessPath": [
      "drivePermissionsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "allowFileDiscovery",
      "deleted",
      "displayName",
      "domain",
      "emailAddress",
      "expirationTime",
      "id",
      "kind",
      "pendingOwner",
      "permissionDetails",
      "photoLink",
      "role",
      "teamDrivePermissionDetails",
      "type",
      "view"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files/{fileId}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "emailMessage",
      "enforceSingleParent",
      "moveToNewOwnersRoot",
      "sendNotificationEmail",
      "supportsAllDrives",
      "supportsTeamDrives",
      "transferOwnership",
      "useDomainAdminAccess"
    ],
    "description": "Creates a permission for a file or shared drive. For more information on creating permissions, see Share files, folders & drives.",
    "parameterDescriptions": {
      "fileId": "The ID of the file or shared drive.",
      "emailMessage": "A plain text custom message to include in the notification email.",
      "enforceSingleParent": "Deprecated. See moveToNewOwnersRoot for details.",
      "moveToNewOwnersRoot": "This parameter will only take effect if the item is not in a shared drive and the request is attempting to transfer the ownership of the item. If set to true, the item will be moved to the new owner's My Drive root folder and all prior parents removed. If set to false, parents are not changed.",
      "sendNotificationEmail": "Whether to send a notification email when sharing to users or groups. This defaults to true for users and groups, and is not allowed for other requests. It must not be disabled for ownership transfers.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "transferOwnership": "Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. File owners can only transfer ownership of files existing on My Drive. Files existing in a shared drive are owned by the organization that owns that shared drive. Ownership transfers are not supported for files and folders in shared drives. Organizers of a shared drive can move items from that shared drive into their My Drive which transfers the ownership to them.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.permissions.delete": {
    "accessPath": [
      "drivePermissionsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/files/{fileId}/permissions/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useDomainAdminAccess"
    ],
    "description": "Deletes a permission.",
    "parameterDescriptions": {
      "fileId": "The ID of the file or shared drive.",
      "permissionId": "The ID of the permission.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.permissions.get": {
    "accessPath": [
      "drivePermissionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/permissions/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "supportsAllDrives",
      "supportsTeamDrives",
      "useDomainAdminAccess"
    ],
    "description": "Gets a permission by ID.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "permissionId": "The ID of the permission.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.permissions.update": {
    "accessPath": [
      "drivePermissionsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "allowFileDiscovery",
      "deleted",
      "displayName",
      "domain",
      "emailAddress",
      "expirationTime",
      "id",
      "kind",
      "pendingOwner",
      "permissionDetails",
      "photoLink",
      "role",
      "teamDrivePermissionDetails",
      "type",
      "view"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/files/{fileId}/permissions/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "removeExpiration",
      "supportsAllDrives",
      "supportsTeamDrives",
      "transferOwnership",
      "useDomainAdminAccess"
    ],
    "description": "Updates a permission with patch semantics.",
    "parameterDescriptions": {
      "fileId": "The ID of the file or shared drive.",
      "permissionId": "The ID of the permission.",
      "removeExpiration": "Whether to remove the expiration date.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead.",
      "transferOwnership": "Whether to transfer ownership to the specified user and downgrade the current owner to a writer. This parameter is required as an acknowledgement of the side effect. File owners can only transfer ownership of files existing on My Drive. Files existing in a shared drive are owned by the organization that owns that shared drive. Ownership transfers are not supported for files and folders in shared drives. Organizers of a shared drive can move items from that shared drive into their My Drive which transfers the ownership to them.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if the file ID parameter refers to a shared drive and the requester is an administrator of the domain to which the shared drive belongs."
    }
  },
  "drive.revisions.list": {
    "accessPath": [
      "driveRevisionsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/revisions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageSize",
      "pageToken"
    ],
    "description": "Lists a file's revisions.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "pageSize": "The maximum number of revisions to return per page.",
      "pageToken": "The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response."
    }
  },
  "drive.revisions.delete": {
    "accessPath": [
      "driveRevisionsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/files/{fileId}/revisions/{revisionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "revisionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Permanently deletes a file version. You can only delete revisions for files with binary content in Google Drive, like images or videos. Revisions for other files, like Google Docs or Sheets, and the last remaining file version can't be deleted.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "revisionId": "The ID of the revision."
    }
  },
  "drive.revisions.get": {
    "accessPath": [
      "driveRevisionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/files/{fileId}/revisions/{revisionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "revisionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "acknowledgeAbuse"
    ],
    "description": "Gets a revision's metadata or content by ID.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "revisionId": "The ID of the revision.",
      "acknowledgeAbuse": "Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media."
    }
  },
  "drive.revisions.update": {
    "accessPath": [
      "driveRevisionsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "exportLinks",
      "id",
      "keepForever",
      "kind",
      "lastModifyingUser",
      "md5Checksum",
      "mimeType",
      "modifiedTime",
      "originalFilename",
      "publishAuto",
      "published",
      "publishedLink",
      "publishedOutsideDomain",
      "size"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/files/{fileId}/revisions/{revisionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId",
      "revisionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Updates a revision with patch semantics.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "revisionId": "The ID of the revision."
    }
  },
  "drive.files.watch": {
    "accessPath": [
      "driveFilesWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "expiration",
      "id",
      "kind",
      "params",
      "payload",
      "resourceId",
      "resourceUri",
      "token",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/files/{fileId}/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fileId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "acknowledgeAbuse",
      "includeLabels",
      "includePermissionsForView",
      "supportsAllDrives",
      "supportsTeamDrives"
    ],
    "description": "Subscribes to changes to a file.",
    "parameterDescriptions": {
      "fileId": "The ID of the file.",
      "acknowledgeAbuse": "Whether the user is acknowledging the risk of downloading known malware or other abusive files. This is only applicable when alt=media.",
      "includeLabels": "A comma-separated list of IDs of labels to include in the labelInfo part of the response.",
      "includePermissionsForView": "Specifies which additional view's permissions to include in the response. Only 'published' is supported.",
      "supportsAllDrives": "Whether the requesting application supports both My Drives and shared drives.",
      "supportsTeamDrives": "Deprecated use supportsAllDrives instead."
    }
  },
  "drive.teamdrives.list": {
    "accessPath": [
      "driveTeamdrivesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/teamdrives",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "pageSize",
      "pageToken",
      "q",
      "useDomainAdminAccess"
    ],
    "description": "Deprecated use drives.list instead.",
    "parameterDescriptions": {
      "pageSize": "Maximum number of Team Drives to return.",
      "pageToken": "Page token for Team Drives.",
      "q": "Query string for searching Team Drives.",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then all Team Drives of the domain in which the requester is an administrator are returned."
    }
  },
  "drive.teamdrives.create": {
    "accessPath": [
      "driveTeamdrivesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "backgroundImageFile",
      "backgroundImageLink",
      "capabilities",
      "colorRgb",
      "createdTime",
      "id",
      "kind",
      "name",
      "orgUnitId",
      "restrictions",
      "themeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/drive/v3/teamdrives",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "requestId"
    ],
    "description": "Deprecated use drives.create instead.",
    "parameterDescriptions": {
      "requestId": "An ID, such as a random UUID, which uniquely identifies this user's request for idempotent creation of a Team Drive. A repeated request by the same user and with the same request ID will avoid creating duplicates by attempting to create the same Team Drive. If the Team Drive already exists a 409 error will be returned."
    }
  },
  "drive.teamdrives.delete": {
    "accessPath": [
      "driveTeamdrivesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drive/v3/teamdrives/{teamDriveId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamDriveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp"
    ],
    "description": "Deprecated use drives.delete instead.",
    "parameterDescriptions": {
      "teamDriveId": "The ID of the Team Drive"
    }
  },
  "drive.teamdrives.get": {
    "accessPath": [
      "driveTeamdrivesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/drive/v3/teamdrives/{teamDriveId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamDriveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "description": "Deprecated use drives.get instead.",
    "parameterDescriptions": {
      "teamDriveId": "The ID of the Team Drive",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs."
    }
  },
  "drive.teamdrives.update": {
    "accessPath": [
      "driveTeamdrivesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "backgroundImageFile",
      "backgroundImageLink",
      "capabilities",
      "colorRgb",
      "createdTime",
      "id",
      "kind",
      "name",
      "orgUnitId",
      "restrictions",
      "themeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drive/v3/teamdrives/{teamDriveId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamDriveId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alt",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "userIp",
      "useDomainAdminAccess"
    ],
    "description": "Deprecated use drives.update instead",
    "parameterDescriptions": {
      "teamDriveId": "The ID of the Team Drive",
      "useDomainAdminAccess": "Issue the request as a domain administrator; if set to true, then the requester will be granted access if they are an administrator of the domain to which the Team Drive belongs."
    }
  }
} satisfies ToolRuntimeMetadataMap;
