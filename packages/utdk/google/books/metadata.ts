import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "books.cloudloading.addBook": {
    "accessPath": [
      "booksCloudloadingAddBook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/cloudloading/addBook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "drive_document_id",
      "mime_type",
      "name",
      "upload_client_token"
    ],
    "description": "Add a user-upload volume and triggers processing.",
    "parameterDescriptions": {
      "drive_document_id": "A drive document id. The upload_client_token must not be set.",
      "mime_type": "The document MIME type. It can be set only if the drive_document_id is set.",
      "name": "The document name. It can be set only if the drive_document_id is set.",
      "upload_client_token": "Scotty upload token."
    }
  },
  "books.cloudloading.deleteBook": {
    "accessPath": [
      "booksCloudloadingDeleteBook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/cloudloading/deleteBook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "volumeId"
    ],
    "description": "Remove the book and its contents",
    "parameterDescriptions": {
      "volumeId": "The id of the book to be removed."
    }
  },
  "books.cloudloading.updateBook": {
    "accessPath": [
      "booksCloudloadingUpdateBook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author",
      "processingState",
      "title",
      "volumeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/cloudloading/updateBook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Updates a user-upload volume."
  },
  "books.dictionary.listOfflineMetadata": {
    "accessPath": [
      "booksDictionaryListOfflineMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/dictionary/listOfflineMetadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "cpksver"
    ],
    "description": "Returns a list of offline dictionary metadata available",
    "parameterDescriptions": {
      "cpksver": "The device/version ID from which to request the data."
    }
  },
  "books.familysharing.getFamilyInfo": {
    "accessPath": [
      "booksFamilysharingGetFamilyInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/familysharing/getFamilyInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Gets information regarding the family that the user is part of.",
    "parameterDescriptions": {
      "source": "String to identify the originator of this request."
    }
  },
  "books.familysharing.share": {
    "accessPath": [
      "booksFamilysharingShare"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/familysharing/share",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "docId",
      "source",
      "volumeId"
    ],
    "description": "Initiates sharing of the content with the user's family. Empty response indicates success.",
    "parameterDescriptions": {
      "docId": "The docid to share.",
      "source": "String to identify the originator of this request.",
      "volumeId": "The volume to share."
    }
  },
  "books.familysharing.unshare": {
    "accessPath": [
      "booksFamilysharingUnshare"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/familysharing/unshare",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "docId",
      "source",
      "volumeId"
    ],
    "description": "Initiates revoking content that has already been shared with the user's family. Empty response indicates success.",
    "parameterDescriptions": {
      "docId": "The docid to unshare.",
      "source": "String to identify the originator of this request.",
      "volumeId": "The volume to unshare."
    }
  },
  "books.myconfig.getUserSettings": {
    "accessPath": [
      "booksMyconfigGetUserSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/myconfig/getUserSettings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "country"
    ],
    "description": "Gets the current settings for the user.",
    "parameterDescriptions": {
      "country": "Unused. Added only to workaround TEX mandatory request template requirement"
    }
  },
  "books.myconfig.releaseDownloadAccess": {
    "accessPath": [
      "booksMyconfigReleaseDownloadAccess"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/myconfig/releaseDownloadAccess",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "cpksver",
      "volumeIds",
      "locale",
      "source"
    ],
    "description": "Release downloaded content access restriction.",
    "parameterDescriptions": {
      "cpksver": "The device/version ID from which to release the restriction.",
      "volumeIds": "The volume(s) to release restrictions for.",
      "locale": "ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.myconfig.requestAccess": {
    "accessPath": [
      "booksMyconfigRequestAccess"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/myconfig/requestAccess",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "cpksver",
      "nonce",
      "source",
      "volumeId",
      "licenseTypes",
      "locale"
    ],
    "description": "Request concurrent and download access restrictions.",
    "parameterDescriptions": {
      "cpksver": "The device/version ID from which to request the restrictions.",
      "nonce": "The client nonce value.",
      "source": "String to identify the originator of this request.",
      "volumeId": "The volume to request concurrent/download restrictions for.",
      "licenseTypes": "The type of access license to request. If not specified, the default is BOTH.",
      "locale": "ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US."
    }
  },
  "books.myconfig.syncVolumeLicenses": {
    "accessPath": [
      "booksMyconfigSyncVolumeLicenses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/myconfig/syncVolumeLicenses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "cpksver",
      "nonce",
      "source",
      "features",
      "includeNonComicsSeries",
      "locale",
      "showPreorders",
      "volumeIds"
    ],
    "description": "Request downloaded content access for specified volumes on the My eBooks shelf.",
    "parameterDescriptions": {
      "cpksver": "The device/version ID from which to release the restriction.",
      "nonce": "The client nonce value.",
      "source": "String to identify the originator of this request.",
      "features": "List of features supported by the client, i.e., 'RENTALS'",
      "includeNonComicsSeries": "Set to true to include non-comics series. Defaults to false.",
      "locale": "ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.",
      "showPreorders": "Set to true to show pre-ordered books. Defaults to false.",
      "volumeIds": "The volume(s) to request download restrictions for."
    }
  },
  "books.myconfig.updateUserSettings": {
    "accessPath": [
      "booksMyconfigUpdateUserSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "kind",
      "notesExport",
      "notification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/myconfig/updateUserSettings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType"
    ],
    "description": "Sets the settings for the user. If a sub-object is specified, it will overwrite the existing sub-object stored in the server. Unspecified sub-objects will retain the existing value."
  },
  "books.mylibrary.annotations.list": {
    "accessPath": [
      "booksMylibraryAnnotationsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/mylibrary/annotations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "layerId",
      "layerIds",
      "maxResults",
      "pageToken",
      "showDeleted",
      "source",
      "updatedMax",
      "updatedMin",
      "volumeId"
    ],
    "description": "Retrieves a list of annotations, possibly filtered.",
    "parameterDescriptions": {
      "contentVersion": "The content version for the requested volume.",
      "layerId": "The layer ID to limit annotation by.",
      "layerIds": "The layer ID(s) to limit annotation by.",
      "maxResults": "Maximum number of results to return",
      "pageToken": "The value of the nextToken from the previous page.",
      "showDeleted": "Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false.",
      "source": "String to identify the originator of this request.",
      "updatedMax": "RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).",
      "updatedMin": "RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).",
      "volumeId": "The volume to restrict annotations to."
    }
  },
  "books.mylibrary.annotations.insert": {
    "accessPath": [
      "booksMylibraryAnnotationsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "afterSelectedText",
      "beforeSelectedText",
      "clientVersionRanges",
      "created",
      "currentVersionRanges",
      "data",
      "deleted",
      "highlightStyle",
      "id",
      "kind",
      "layerId",
      "layerSummary",
      "pageIds",
      "selectedText",
      "selfLink",
      "updated",
      "volumeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/annotations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "annotationId",
      "country",
      "showOnlySummaryInResponse",
      "source"
    ],
    "description": "Inserts a new annotation.",
    "parameterDescriptions": {
      "annotationId": "The ID for the annotation to insert.",
      "country": "ISO-3166-1 code to override the IP-based location.",
      "showOnlySummaryInResponse": "Requests that only the summary of the specified layer be provided in the response.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.annotations.summary": {
    "accessPath": [
      "booksMylibraryAnnotationsSummary"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/annotations/summary",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "layerIds",
      "volumeId"
    ],
    "description": "Gets the summary of specified layers.",
    "parameterDescriptions": {
      "layerIds": "Array of layer IDs to get the summary for.",
      "volumeId": "Volume id to get the summary for."
    }
  },
  "books.mylibrary.annotations.delete": {
    "accessPath": [
      "booksMylibraryAnnotationsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/books/v1/mylibrary/annotations/{annotationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "annotationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Deletes an annotation.",
    "parameterDescriptions": {
      "annotationId": "The ID for the annotation to delete.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.annotations.update": {
    "accessPath": [
      "booksMylibraryAnnotationsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "afterSelectedText",
      "beforeSelectedText",
      "clientVersionRanges",
      "created",
      "currentVersionRanges",
      "data",
      "deleted",
      "highlightStyle",
      "id",
      "kind",
      "layerId",
      "layerSummary",
      "pageIds",
      "selectedText",
      "selfLink",
      "updated",
      "volumeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/books/v1/mylibrary/annotations/{annotationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "annotationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Updates an existing annotation.",
    "parameterDescriptions": {
      "annotationId": "The ID for the annotation to update.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.list": {
    "accessPath": [
      "booksMylibraryBookshelvesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/mylibrary/bookshelves",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Retrieves a list of bookshelves belonging to the authenticated user.",
    "parameterDescriptions": {
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.get": {
    "accessPath": [
      "booksMylibraryBookshelvesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/mylibrary/bookshelves/{shelf}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Retrieves metadata for a specific bookshelf belonging to the authenticated user.",
    "parameterDescriptions": {
      "shelf": "ID of bookshelf to retrieve.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.addVolume": {
    "accessPath": [
      "booksMylibraryBookshelvesAddVolume"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/bookshelves/{shelf}/addVolume",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "volumeId",
      "reason",
      "source"
    ],
    "description": "Adds a volume to a bookshelf.",
    "parameterDescriptions": {
      "shelf": "ID of bookshelf to which to add a volume.",
      "volumeId": "ID of volume to add.",
      "reason": "The reason for which the book is added to the library.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.clearVolumes": {
    "accessPath": [
      "booksMylibraryBookshelvesClearVolumes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/bookshelves/{shelf}/clearVolumes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Clears all volumes from a bookshelf.",
    "parameterDescriptions": {
      "shelf": "ID of bookshelf from which to remove a volume.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.moveVolume": {
    "accessPath": [
      "booksMylibraryBookshelvesMoveVolume"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/bookshelves/{shelf}/moveVolume",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "volumeId",
      "volumePosition",
      "source"
    ],
    "description": "Moves a volume within a bookshelf.",
    "parameterDescriptions": {
      "shelf": "ID of bookshelf with the volume.",
      "volumeId": "ID of volume to move.",
      "volumePosition": "Position on shelf to move the item (0 puts the item before the current first item, 1 puts it between the first and the second and so on.)",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.removeVolume": {
    "accessPath": [
      "booksMylibraryBookshelvesRemoveVolume"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/bookshelves/{shelf}/removeVolume",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "volumeId",
      "reason",
      "source"
    ],
    "description": "Removes a volume from a bookshelf.",
    "parameterDescriptions": {
      "shelf": "ID of bookshelf from which to remove a volume.",
      "volumeId": "ID of volume to remove.",
      "reason": "The reason for which the book is removed from the library.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.bookshelves.volumes.list": {
    "accessPath": [
      "booksMylibraryBookshelvesVolumesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/mylibrary/bookshelves/{shelf}/volumes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "country",
      "maxResults",
      "projection",
      "q",
      "showPreorders",
      "source",
      "startIndex"
    ],
    "description": "Gets volume information for volumes on a bookshelf.",
    "parameterDescriptions": {
      "shelf": "The bookshelf ID or name retrieve volumes for.",
      "country": "ISO-3166-1 code to override the IP-based location.",
      "maxResults": "Maximum number of results to return",
      "projection": "Restrict information returned to a set of selected fields.",
      "q": "Full-text search query string in this bookshelf.",
      "showPreorders": "Set to true to show pre-ordered books. Defaults to false.",
      "source": "String to identify the originator of this request.",
      "startIndex": "Index of the first element to return (starts at 0)"
    }
  },
  "books.mylibrary.readingpositions.get": {
    "accessPath": [
      "booksMylibraryReadingpositionsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/mylibrary/readingpositions/{volumeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "source"
    ],
    "description": "Retrieves my reading position information for a volume.",
    "parameterDescriptions": {
      "volumeId": "ID of volume for which to retrieve a reading position.",
      "contentVersion": "Volume content version for which this reading position is requested.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.mylibrary.readingpositions.setPosition": {
    "accessPath": [
      "booksMylibraryReadingpositionsSetPosition"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/mylibrary/readingpositions/{volumeId}/setPosition",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "position",
      "timestamp",
      "action",
      "contentVersion",
      "deviceCookie",
      "source"
    ],
    "description": "Sets my reading position information for a volume.",
    "parameterDescriptions": {
      "volumeId": "ID of volume for which to update the reading position.",
      "position": "Position string for the new volume reading position.",
      "timestamp": "RFC 3339 UTC format timestamp associated with this reading position.",
      "action": "Action that caused this reading position to be set.",
      "contentVersion": "Volume content version for which this reading position applies.",
      "deviceCookie": "Random persistent device cookie optional on set position.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.notification.get": {
    "accessPath": [
      "booksNotificationGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/notification/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "notification_id",
      "locale",
      "source"
    ],
    "description": "Returns notification details for a given notification id.",
    "parameterDescriptions": {
      "notification_id": "String to identify the notification.",
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating notification title and body.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.onboarding.listCategories": {
    "accessPath": [
      "booksOnboardingListCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/onboarding/listCategories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "locale"
    ],
    "description": "List categories for onboarding experience.",
    "parameterDescriptions": {
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset."
    }
  },
  "books.onboarding.listCategoryVolumes": {
    "accessPath": [
      "booksOnboardingListCategoryVolumes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/onboarding/listCategoryVolumes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "categoryId",
      "locale",
      "maxAllowedMaturityRating",
      "pageSize",
      "pageToken"
    ],
    "description": "List available volumes under categories for onboarding experience.",
    "parameterDescriptions": {
      "categoryId": "List of category ids requested.",
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset.",
      "maxAllowedMaturityRating": "The maximum allowed maturity rating of returned volumes. Books with a higher maturity rating are filtered out.",
      "pageSize": "Number of maximum results per page to be included in the response.",
      "pageToken": "The value of the nextToken from the previous page."
    }
  },
  "books.personalizedstream.get": {
    "accessPath": [
      "booksPersonalizedstreamGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/personalizedstream/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "locale",
      "maxAllowedMaturityRating",
      "source"
    ],
    "description": "Returns a stream of personalized book clusters",
    "parameterDescriptions": {
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations.",
      "maxAllowedMaturityRating": "The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.promooffer.accept": {
    "accessPath": [
      "booksPromoofferAccept"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/promooffer/accept",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "androidId",
      "device",
      "manufacturer",
      "model",
      "offerId",
      "product",
      "serial",
      "volumeId"
    ],
    "description": "Accepts the promo offer.",
    "parameterDescriptions": {
      "androidId": "device android_id",
      "device": "device device",
      "manufacturer": "device manufacturer",
      "model": "device model",
      "product": "device product",
      "serial": "device serial",
      "volumeId": "Volume id to exercise the offer"
    }
  },
  "books.promooffer.dismiss": {
    "accessPath": [
      "booksPromoofferDismiss"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/promooffer/dismiss",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "androidId",
      "device",
      "manufacturer",
      "model",
      "offerId",
      "product",
      "serial"
    ],
    "description": "Marks the promo offer as dismissed.",
    "parameterDescriptions": {
      "androidId": "device android_id",
      "device": "device device",
      "manufacturer": "device manufacturer",
      "model": "device model",
      "offerId": "Offer to dimiss",
      "product": "device product",
      "serial": "device serial"
    }
  },
  "books.promooffer.get": {
    "accessPath": [
      "booksPromoofferGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/promooffer/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "androidId",
      "device",
      "manufacturer",
      "model",
      "product",
      "serial"
    ],
    "description": "Returns a list of promo offers available to the user",
    "parameterDescriptions": {
      "androidId": "device android_id",
      "device": "device device",
      "manufacturer": "device manufacturer",
      "model": "device model",
      "product": "device product",
      "serial": "device serial"
    }
  },
  "books.series.get": {
    "accessPath": [
      "booksSeriesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/series/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "series_id"
    ],
    "description": "Returns Series metadata for the given series ids.",
    "parameterDescriptions": {
      "series_id": "String that identifies the series"
    }
  },
  "books.series.membership.get": {
    "accessPath": [
      "booksSeriesMembershipGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/series/membership/get",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "series_id",
      "page_size",
      "page_token"
    ],
    "description": "Returns Series membership data given the series id.",
    "parameterDescriptions": {
      "series_id": "String that identifies the series",
      "page_size": "Number of maximum results per page to be included in the response.",
      "page_token": "The value of the nextToken from the previous page."
    }
  },
  "books.bookshelves.list": {
    "accessPath": [
      "booksBookshelvesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/users/{userId}/bookshelves",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Retrieves a list of public bookshelves for the specified user.",
    "parameterDescriptions": {
      "userId": "ID of user for whom to retrieve bookshelves.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.bookshelves.get": {
    "accessPath": [
      "booksBookshelvesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/users/{userId}/bookshelves/{shelf}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "source"
    ],
    "description": "Retrieves metadata for a specific bookshelf for the specified user.",
    "parameterDescriptions": {
      "userId": "ID of user for whom to retrieve bookshelves.",
      "shelf": "ID of bookshelf to retrieve.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.bookshelves.volumes.list": {
    "accessPath": [
      "booksBookshelvesVolumesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/users/{userId}/bookshelves/{shelf}/volumes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "shelf"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "maxResults",
      "showPreorders",
      "source",
      "startIndex"
    ],
    "description": "Retrieves volumes in a specific bookshelf for the specified user.",
    "parameterDescriptions": {
      "userId": "ID of user for whom to retrieve bookshelf volumes.",
      "shelf": "ID of bookshelf to retrieve volumes.",
      "maxResults": "Maximum number of results to return",
      "showPreorders": "Set to true to show pre-ordered books. Defaults to false.",
      "source": "String to identify the originator of this request.",
      "startIndex": "Index of the first element to return (starts at 0)"
    }
  },
  "books.volumes.list": {
    "accessPath": [
      "booksVolumesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "q",
      "download",
      "filter",
      "langRestrict",
      "libraryRestrict",
      "maxAllowedMaturityRating",
      "maxResults",
      "orderBy",
      "partner",
      "printType",
      "projection",
      "showPreorders",
      "source",
      "startIndex"
    ],
    "description": "Performs a book search.",
    "parameterDescriptions": {
      "q": "Full-text search query string.",
      "download": "Restrict to volumes by download availability.",
      "filter": "Filter search results.",
      "langRestrict": "Restrict results to books with this language code.",
      "libraryRestrict": "Restrict search to this user's library.",
      "maxAllowedMaturityRating": "The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out.",
      "maxResults": "Maximum number of results to return.",
      "orderBy": "Sort search results.",
      "partner": "Restrict and brand results for partner ID.",
      "printType": "Restrict to books or magazines.",
      "projection": "Restrict information returned to a set of selected fields.",
      "showPreorders": "Set to true to show books available for preorder. Defaults to false.",
      "source": "String to identify the originator of this request.",
      "startIndex": "Index of the first result to return (starts at 0)"
    }
  },
  "books.volumes.mybooks.list": {
    "accessPath": [
      "booksVolumesMybooksList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/mybooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "acquireMethod",
      "country",
      "locale",
      "maxResults",
      "processingState",
      "source",
      "startIndex"
    ],
    "description": "Return a list of books in My Library.",
    "parameterDescriptions": {
      "acquireMethod": "How the book was acquired",
      "country": "ISO-3166-1 code to override the IP-based location.",
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating recommendations.",
      "maxResults": "Maximum number of results to return.",
      "processingState": "The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod.",
      "source": "String to identify the originator of this request.",
      "startIndex": "Index of the first result to return (starts at 0)"
    }
  },
  "books.volumes.recommended.list": {
    "accessPath": [
      "booksVolumesRecommendedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/recommended",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "locale",
      "maxAllowedMaturityRating",
      "source"
    ],
    "description": "Return a list of recommended books for the current user.",
    "parameterDescriptions": {
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations.",
      "maxAllowedMaturityRating": "The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.volumes.recommended.rate": {
    "accessPath": [
      "booksVolumesRecommendedRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/books/v1/volumes/recommended/rate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "rating",
      "volumeId",
      "locale",
      "source"
    ],
    "description": "Rate a recommended book for the current user.",
    "parameterDescriptions": {
      "rating": "Rating to be given to the volume.",
      "volumeId": "ID of the source volume.",
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.volumes.useruploaded.list": {
    "accessPath": [
      "booksVolumesUseruploadedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/useruploaded",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "locale",
      "maxResults",
      "processingState",
      "source",
      "startIndex",
      "volumeId"
    ],
    "description": "Return a list of books uploaded by the current user.",
    "parameterDescriptions": {
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations.",
      "maxResults": "Maximum number of results to return.",
      "processingState": "The processing state of the user uploaded volumes to be returned.",
      "source": "String to identify the originator of this request.",
      "startIndex": "Index of the first result to return (starts at 0)",
      "volumeId": "The ids of the volumes to be returned. If not specified all that match the processingState are returned."
    }
  },
  "books.volumes.get": {
    "accessPath": [
      "booksVolumesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "country",
      "includeNonComicsSeries",
      "partner",
      "projection",
      "source",
      "user_library_consistent_read"
    ],
    "description": "Gets volume information for a single volume.",
    "parameterDescriptions": {
      "volumeId": "ID of volume to retrieve.",
      "country": "ISO-3166-1 code to override the IP-based location.",
      "includeNonComicsSeries": "Set to true to include non-comics series. Defaults to false.",
      "partner": "Brand results for partner ID.",
      "projection": "Restrict information returned to a set of selected fields.",
      "source": "string to identify the originator of this request."
    }
  },
  "books.volumes.associated.list": {
    "accessPath": [
      "booksVolumesAssociatedList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/associated",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "association",
      "locale",
      "maxAllowedMaturityRating",
      "source"
    ],
    "description": "Return a list of associated books.",
    "parameterDescriptions": {
      "volumeId": "ID of the source volume.",
      "association": "Association type.",
      "locale": "ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations.",
      "maxAllowedMaturityRating": "The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.layers.volumeAnnotations.list": {
    "accessPath": [
      "booksLayersVolumeAnnotationsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/layers/{layerId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId",
      "layerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "endOffset",
      "endPosition",
      "locale",
      "maxResults",
      "pageToken",
      "showDeleted",
      "source",
      "startOffset",
      "startPosition",
      "updatedMax",
      "updatedMin",
      "volumeAnnotationsVersion"
    ],
    "description": "Gets the volume annotations for a volume and layer.",
    "parameterDescriptions": {
      "volumeId": "The volume to retrieve annotations for.",
      "layerId": "The ID for the layer to get the annotations.",
      "contentVersion": "The content version for the requested volume.",
      "endOffset": "The end offset to end retrieving data from.",
      "endPosition": "The end position to end retrieving data from.",
      "locale": "The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.",
      "maxResults": "Maximum number of results to return",
      "pageToken": "The value of the nextToken from the previous page.",
      "showDeleted": "Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false.",
      "source": "String to identify the originator of this request.",
      "startOffset": "The start offset to start retrieving data from.",
      "startPosition": "The start position to start retrieving data from.",
      "updatedMax": "RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).",
      "updatedMin": "RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).",
      "volumeAnnotationsVersion": "The version of the volume annotations that you are requesting."
    }
  },
  "books.layers.volumeAnnotations.get": {
    "accessPath": [
      "booksLayersVolumeAnnotationsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId",
      "layerId",
      "annotationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "locale",
      "source"
    ],
    "description": "Gets the volume annotation.",
    "parameterDescriptions": {
      "volumeId": "The volume to retrieve annotations for.",
      "layerId": "The ID for the layer to get the annotations.",
      "annotationId": "The ID of the volume annotation to retrieve.",
      "locale": "The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.layers.annotationData.list": {
    "accessPath": [
      "booksLayersAnnotationDataList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/layers/{layerId}/data",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId",
      "layerId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "annotationDataId",
      "h",
      "locale",
      "maxResults",
      "pageToken",
      "scale",
      "source",
      "updatedMax",
      "updatedMin",
      "w"
    ],
    "description": "Gets the annotation data for a volume and layer.",
    "parameterDescriptions": {
      "volumeId": "The volume to retrieve annotation data for.",
      "layerId": "The ID for the layer to get the annotation data.",
      "contentVersion": "The content version for the requested volume.",
      "annotationDataId": "The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set.",
      "h": "The requested pixel height for any images. If height is provided width must also be provided.",
      "locale": "The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.",
      "maxResults": "Maximum number of results to return",
      "pageToken": "The value of the nextToken from the previous page.",
      "scale": "The requested scale for the image.",
      "source": "String to identify the originator of this request.",
      "updatedMax": "RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).",
      "updatedMin": "RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).",
      "w": "The requested pixel width for any images. If width is provided height must also be provided."
    }
  },
  "books.layers.annotationData.get": {
    "accessPath": [
      "booksLayersAnnotationDataGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/layers/{layerId}/data/{annotationDataId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId",
      "layerId",
      "annotationDataId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "allowWebDefinitions",
      "h",
      "locale",
      "scale",
      "source",
      "w"
    ],
    "description": "Gets the annotation data.",
    "parameterDescriptions": {
      "volumeId": "The volume to retrieve annotations for.",
      "layerId": "The ID for the layer to get the annotations.",
      "annotationDataId": "The ID of the annotation data to retrieve.",
      "contentVersion": "The content version for the volume you are trying to retrieve.",
      "allowWebDefinitions": "For the dictionary layer. Whether or not to allow web definitions.",
      "h": "The requested pixel height for any images. If height is provided width must also be provided.",
      "locale": "The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.",
      "scale": "The requested scale for the image.",
      "source": "String to identify the originator of this request.",
      "w": "The requested pixel width for any images. If width is provided height must also be provided."
    }
  },
  "books.layers.list": {
    "accessPath": [
      "booksLayersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/layersummary",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "maxResults",
      "pageToken",
      "source"
    ],
    "description": "List the layer summaries for a volume.",
    "parameterDescriptions": {
      "volumeId": "The volume to retrieve layers for.",
      "contentVersion": "The content version for the requested volume.",
      "maxResults": "Maximum number of results to return",
      "pageToken": "The value of the nextToken from the previous page.",
      "source": "String to identify the originator of this request."
    }
  },
  "books.layers.get": {
    "accessPath": [
      "booksLayersGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/books/v1/volumes/{volumeId}/layersummary/{summaryId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "volumeId",
      "summaryId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "$.xgafv",
      "access_token",
      "alt",
      "callback",
      "fields",
      "key",
      "oauth_token",
      "prettyPrint",
      "quotaUser",
      "upload_protocol",
      "uploadType",
      "contentVersion",
      "source"
    ],
    "description": "Gets the layer summary for a volume.",
    "parameterDescriptions": {
      "volumeId": "The volume to retrieve layers for.",
      "summaryId": "The ID for the layer to get the summary for.",
      "contentVersion": "The content version for the requested volume.",
      "source": "String to identify the originator of this request."
    }
  }
} satisfies ToolRuntimeMetadataMap;
