import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getBanner": {
    "accessPath": [
      "getBanner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/announcementBanner",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get announcement banner configuration"
  },
  "setBanner": {
    "accessPath": [
      "setBanner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "isDismissible",
      "isEnabled",
      "message",
      "visibility"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/announcementBanner",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update announcement banner configuration"
  },
  "getCustomFieldsConfigurations": {
    "accessPath": [
      "getCustomFieldsConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fieldIdsOrKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/app/field/context/configuration/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "id",
      "fieldContextId",
      "issueId",
      "projectKeyOrId",
      "issueTypeId",
      "startAt",
      "maxResults"
    ],
    "description": "Bulk get custom field configurations",
    "parameterDescriptions": {
      "id": "The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand: `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`.",
      "fieldContextId": "The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`.",
      "issueId": "The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`.",
      "projectKeyOrId": "The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with `issueId`.",
      "issueTypeId": "The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with `issueId`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "updateMultipleCustomFieldValues": {
    "accessPath": [
      "updateMultipleCustomFieldValues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "updates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/app/field/value",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "generateChangelog",
      "generateAppEvents"
    ],
    "description": "Update custom fields",
    "parameterDescriptions": {
      "generateChangelog": "Whether to generate a changelog for this update.",
      "generateAppEvents": "Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured webhooks (registered via the Jira admin UI). Note: Suppressing events means that \"issue updated\" events will not be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for the updated field, resulting in potentially confusing behaviour. We do not recommend using this flag in a Marketplace app as it may result in incompatibilities with other apps that depend on up-to-date issue data."
    }
  },
  "getCustomFieldConfiguration": {
    "accessPath": [
      "getCustomFieldConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/app/field/{fieldIdOrKey}/context/configuration",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "id",
      "fieldContextId",
      "issueId",
      "projectKeyOrId",
      "issueTypeId",
      "startAt",
      "maxResults"
    ],
    "description": "Get custom field configurations",
    "parameterDescriptions": {
      "fieldIdOrKey": "The ID or key of the custom field, for example `customfield_10000`.",
      "id": "The list of configuration IDs. To include multiple configurations, separate IDs with an ampersand: `id=10000&id=10001`. Can't be provided with `fieldContextId`, `issueId`, `projectKeyOrId`, or `issueTypeId`.",
      "fieldContextId": "The list of field context IDs. To include multiple field contexts, separate IDs with an ampersand: `fieldContextId=10000&fieldContextId=10001`. Can't be provided with `id`, `issueId`, `projectKeyOrId`, or `issueTypeId`.",
      "issueId": "The ID of the issue to filter results by. If the issue doesn't exist, an empty list is returned. Can't be provided with `projectKeyOrId`, or `issueTypeId`.",
      "projectKeyOrId": "The ID or key of the project to filter results by. Must be provided with `issueTypeId`. Can't be provided with `issueId`.",
      "issueTypeId": "The ID of the issue type to filter results by. Must be provided with `projectKeyOrId`. Can't be provided with `issueId`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "updateCustomFieldConfiguration": {
    "accessPath": [
      "updateCustomFieldConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "configurations"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/app/field/{fieldIdOrKey}/context/configuration",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update custom field configurations",
    "parameterDescriptions": {
      "fieldIdOrKey": "The ID or key of the custom field, for example `customfield_10000`."
    }
  },
  "updateCustomFieldValue": {
    "accessPath": [
      "updateCustomFieldValue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "updates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/app/field/{fieldIdOrKey}/value",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "generateChangelog",
      "generateAppEvents"
    ],
    "description": "Update custom field value",
    "parameterDescriptions": {
      "fieldIdOrKey": "The ID or key of the custom field. For example, `customfield_10010`.",
      "generateChangelog": "Whether to generate a changelog for this update.",
      "generateAppEvents": "Whether to generate app events for this update. Suppresses Forge, Connect, OAuth 2.0, and admin-configured webhooks (registered via the Jira admin UI). Note: Suppressing events means that \"issue updated\" events will not be emitted for your app or any other apps installed in Jira. This may cause other apps to retain stale data for the updated field, resulting in potentially confusing behaviour. We do not recommend using this flag in a Marketplace app as it may result in incompatibilities with other apps that depend on up-to-date issue data."
    }
  },
  "getApplicationProperty": {
    "accessPath": [
      "getApplicationProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/application-properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key",
      "permissionLevel",
      "keyFilter"
    ],
    "description": "Get application property",
    "parameterDescriptions": {
      "key": "The key of the application property.",
      "permissionLevel": "The permission level of all items being returned in the list.",
      "keyFilter": "When a `key` isn't provided, this filters the list of results by the application property `key` using a regular expression. For example, using `jira.lf.*` will return all application properties with keys that start with *jira.lf.*."
    }
  },
  "getAdvancedSettings": {
    "accessPath": [
      "getAdvancedSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/application-properties/advanced-settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get advanced settings"
  },
  "setApplicationProperty": {
    "accessPath": [
      "setApplicationProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/application-properties/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set application property",
    "parameterDescriptions": {
      "id": "The key of the application property to update."
    }
  },
  "getAllApplicationRoles": {
    "accessPath": [
      "getAllApplicationRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/applicationrole",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all application roles"
  },
  "getApplicationRole": {
    "accessPath": [
      "getApplicationRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/applicationrole/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get application role",
    "parameterDescriptions": {
      "key": "The key of the application role. Use the [Get all application roles](#api-rest-api-3-applicationrole-get) operation to get the key for each application role."
    }
  },
  "getAttachmentContent": {
    "accessPath": [
      "getAttachmentContent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/attachment/content/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "redirect"
    ],
    "description": "Get attachment content",
    "parameterDescriptions": {
      "id": "The ID of the attachment.",
      "redirect": "Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment."
    }
  },
  "getAttachmentMeta": {
    "accessPath": [
      "getAttachmentMeta"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/attachment/meta",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Jira attachment settings"
  },
  "getAttachmentThumbnail": {
    "accessPath": [
      "getAttachmentThumbnail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/attachment/thumbnail/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "redirect",
      "fallbackToDefault",
      "width",
      "height"
    ],
    "description": "Get attachment thumbnail",
    "parameterDescriptions": {
      "id": "The ID of the attachment.",
      "redirect": "Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment.",
      "fallbackToDefault": "Whether a default thumbnail is returned when the requested thumbnail is not found.",
      "width": "The maximum width to scale the thumbnail to.",
      "height": "The maximum height to scale the thumbnail to."
    }
  },
  "removeAttachment": {
    "accessPath": [
      "removeAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/attachment/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete attachment",
    "parameterDescriptions": {
      "id": "The ID of the attachment."
    }
  },
  "getAttachment": {
    "accessPath": [
      "getAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/attachment/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get attachment metadata",
    "parameterDescriptions": {
      "id": "The ID of the attachment."
    }
  },
  "expandAttachmentForHumans": {
    "accessPath": [
      "expandAttachmentForHumans"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/attachment/{id}/expand/human",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all metadata for an expanded attachment",
    "parameterDescriptions": {
      "id": "The ID of the attachment."
    }
  },
  "expandAttachmentForMachines": {
    "accessPath": [
      "expandAttachmentForMachines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/attachment/{id}/expand/raw",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get contents metadata for an expanded attachment",
    "parameterDescriptions": {
      "id": "The ID of the attachment."
    }
  },
  "getAuditRecords": {
    "accessPath": [
      "getAuditRecords"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/auditing/record",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "offset",
      "limit",
      "filter",
      "from",
      "to"
    ],
    "description": "Get audit records",
    "parameterDescriptions": {
      "offset": "The number of records to skip before returning the first result.",
      "limit": "The maximum number of results to return.",
      "filter": "The strings to match with audit field content, space separated.",
      "from": "The date and time on or after which returned audit records must have been created. If `to` is provided `from` must be before `to` or no audit records are returned.",
      "to": "The date and time on or before which returned audit results must have been created. If `from` is provided `to` must be after `from` or no audit records are returned."
    }
  },
  "getAllSystemAvatars": {
    "accessPath": [
      "getAllSystemAvatars"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/avatar/{type}/system",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get system avatars by type",
    "parameterDescriptions": {
      "type": "The avatar type."
    }
  },
  "submitBulkDelete": {
    "accessPath": [
      "submitBulkDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "selectedIssueIdsOrKeys",
      "sendBulkNotification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/bulk/issues/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk delete issues"
  },
  "getBulkEditableFields": {
    "accessPath": [
      "getBulkEditableFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/bulk/issues/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "issueIdsOrKeys",
      "searchText",
      "endingBefore",
      "startingAfter"
    ],
    "description": "Get bulk editable fields",
    "parameterDescriptions": {
      "issueIdsOrKeys": "The IDs or keys of the issues to get editable fields from.",
      "searchText": "(Optional)The text to search for in the editable fields.",
      "endingBefore": "(Optional)The end cursor for use in pagination.",
      "startingAfter": "(Optional)The start cursor for use in pagination."
    }
  },
  "submitBulkEdit": {
    "accessPath": [
      "submitBulkEdit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "editedFieldsInput",
      "selectedActions",
      "selectedIssueIdsOrKeys",
      "sendBulkNotification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/bulk/issues/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk edit issues"
  },
  "submitBulkMove": {
    "accessPath": [
      "submitBulkMove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sendBulkNotification",
      "targetToSourcesMapping"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/bulk/issues/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk move issues"
  },
  "getAvailableTransitions": {
    "accessPath": [
      "getAvailableTransitions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/bulk/issues/transition",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "issueIdsOrKeys",
      "endingBefore",
      "startingAfter"
    ],
    "description": "Get available transitions",
    "parameterDescriptions": {
      "issueIdsOrKeys": "Comma (,) separated Ids or keys of the issues to get transitions available for them.",
      "endingBefore": "(Optional)The end cursor for use in pagination.",
      "startingAfter": "(Optional)The start cursor for use in pagination."
    }
  },
  "submitBulkTransition": {
    "accessPath": [
      "submitBulkTransition"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bulkTransitionInputs",
      "sendBulkNotification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/bulk/issues/transition",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk transition issue statuses"
  },
  "submitBulkUnwatch": {
    "accessPath": [
      "submitBulkUnwatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "selectedIssueIdsOrKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/bulk/issues/unwatch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk unwatch issues"
  },
  "submitBulkWatch": {
    "accessPath": [
      "submitBulkWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "selectedIssueIdsOrKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/bulk/issues/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk watch issues"
  },
  "getBulkOperationProgress": {
    "accessPath": [
      "getBulkOperationProgress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/bulk/queue/{taskId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "taskId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get bulk issue operation progress",
    "parameterDescriptions": {
      "taskId": "The ID of the task."
    }
  },
  "getBulkChangelogs": {
    "accessPath": [
      "getBulkChangelogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fieldIds",
      "issueIdsOrKeys",
      "maxResults",
      "nextPageToken"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/changelog/bulkfetch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk fetch changelogs"
  },
  "getAllUserDataClassificationLevels": {
    "accessPath": [
      "getAllUserDataClassificationLevels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/classification-levels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "orderBy"
    ],
    "description": "Get all classification levels",
    "parameterDescriptions": {
      "status": "Optional set of statuses to filter by.",
      "orderBy": "Ordering of the results by a given field. If not provided, values will not be sorted."
    }
  },
  "getCommentsByIds": {
    "accessPath": [
      "getCommentsByIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/comment/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get comments by IDs",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `renderedBody` Returns the comment body rendered in HTML.\n *  `properties` Returns the comment's properties."
    }
  },
  "getCommentPropertyKeys": {
    "accessPath": [
      "getCommentPropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/comment/{commentId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "commentId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get comment property keys",
    "parameterDescriptions": {
      "commentId": "The ID of the comment."
    }
  },
  "deleteCommentProperty": {
    "accessPath": [
      "deleteCommentProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/comment/{commentId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "commentId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete comment property",
    "parameterDescriptions": {
      "commentId": "The ID of the comment.",
      "propertyKey": "The key of the property."
    }
  },
  "getCommentProperty": {
    "accessPath": [
      "getCommentProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/comment/{commentId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "commentId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get comment property",
    "parameterDescriptions": {
      "commentId": "The ID of the comment.",
      "propertyKey": "The key of the property."
    }
  },
  "setCommentProperty": {
    "accessPath": [
      "setCommentProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/comment/{commentId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "commentId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set comment property",
    "parameterDescriptions": {
      "commentId": "The ID of the comment.",
      "propertyKey": "The key of the property. The maximum length is 255 characters."
    }
  },
  "findComponentsForProjects": {
    "accessPath": [
      "findComponentsForProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/component",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectIdsOrKeys",
      "startAt",
      "maxResults",
      "orderBy",
      "query"
    ],
    "description": "Find components for projects",
    "parameterDescriptions": {
      "projectIdsOrKeys": "The project IDs and/or project keys (case sensitive).",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `description` Sorts by the component description.\n *  `name` Sorts by component name.",
      "query": "Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive)."
    }
  },
  "createComponent": {
    "accessPath": [
      "createComponent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ari",
      "assignee",
      "assigneeType",
      "description",
      "id",
      "isAssigneeTypeValid",
      "lead",
      "leadAccountId",
      "leadUserName",
      "metadata",
      "name",
      "project",
      "projectId",
      "realAssignee",
      "realAssigneeType",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/component",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create component"
  },
  "deleteComponent": {
    "accessPath": [
      "deleteComponent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/component/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "moveIssuesTo"
    ],
    "description": "Delete component",
    "parameterDescriptions": {
      "id": "The ID of the component.",
      "moveIssuesTo": "The ID of the component to replace the deleted component. If this value is null no replacement is made."
    }
  },
  "getComponent": {
    "accessPath": [
      "getComponent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/component/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get component",
    "parameterDescriptions": {
      "id": "The ID of the component."
    }
  },
  "updateComponent": {
    "accessPath": [
      "updateComponent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ari",
      "assignee",
      "assigneeType",
      "description",
      "id",
      "isAssigneeTypeValid",
      "lead",
      "leadAccountId",
      "leadUserName",
      "metadata",
      "name",
      "project",
      "projectId",
      "realAssignee",
      "realAssigneeType",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/component/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update component",
    "parameterDescriptions": {
      "id": "The ID of the component."
    }
  },
  "getComponentRelatedIssues": {
    "accessPath": [
      "getComponentRelatedIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/component/{id}/relatedIssueCounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get component issues count",
    "parameterDescriptions": {
      "id": "The ID of the component."
    }
  },
  "getFieldAssociationSchemes": {
    "accessPath": [
      "getFieldAssociationSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/config/fieldschemes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectId",
      "query",
      "startAt",
      "maxResults"
    ],
    "description": "Get field schemes",
    "parameterDescriptions": {
      "projectId": "(optional) List of project IDs to filter schemes by. If not provided, schemes from all projects are returned.",
      "query": "(optional) Text filter for scheme name or description matching (case-insensitive). If not provided, no text filtering is applied.",
      "startAt": "Zero-based index of the first item to return (default: 0)",
      "maxResults": "Maximum number of items to return per page (default: 50, max: 100)"
    }
  },
  "createFieldAssociationScheme": {
    "accessPath": [
      "createFieldAssociationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/config/fieldschemes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create field scheme"
  },
  "removeFieldsAssociatedWithSchemes": {
    "accessPath": [
      "removeFieldsAssociatedWithSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/config/fieldschemes/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove fields associated with field schemes"
  },
  "updateFieldsAssociatedWithSchemes": {
    "accessPath": [
      "updateFieldsAssociatedWithSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/config/fieldschemes/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update fields associated with field schemes"
  },
  "removeFieldAssociationSchemeItemParameters": {
    "accessPath": [
      "removeFieldAssociationSchemeItemParameters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/config/fieldschemes/fields/parameters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove field parameters"
  },
  "updateFieldAssociationSchemeItemParameters": {
    "accessPath": [
      "updateFieldAssociationSchemeItemParameters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/config/fieldschemes/fields/parameters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update field parameters"
  },
  "getProjectsWithFieldSchemes": {
    "accessPath": [
      "getProjectsWithFieldSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/config/fieldschemes/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Get projects with field schemes",
    "parameterDescriptions": {
      "startAt": "The starting index of the returned projects. Base index: 0.",
      "maxResults": "The maximum number of projects to return per page, maximum allowed value is 100.",
      "projectId": "List of project ids to filter the results by."
    }
  },
  "associateProjectsToFieldAssociationSchemes": {
    "accessPath": [
      "associateProjectsToFieldAssociationSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/config/fieldschemes/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate projects to field schemes"
  },
  "deleteFieldAssociationScheme": {
    "accessPath": [
      "deleteFieldAssociationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a field scheme",
    "parameterDescriptions": {
      "id": "The ID of the field association scheme to delete."
    }
  },
  "getFieldAssociationSchemeById": {
    "accessPath": [
      "getFieldAssociationSchemeById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get field scheme",
    "parameterDescriptions": {
      "id": "The scheme id to fetch"
    }
  },
  "updateFieldAssociationScheme": {
    "accessPath": [
      "updateFieldAssociationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update field scheme"
  },
  "cloneFieldAssociationScheme": {
    "accessPath": [
      "cloneFieldAssociationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}/clone",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Clone field scheme",
    "parameterDescriptions": {
      "id": "The ID of the source field association scheme to clone from"
    }
  },
  "searchFieldAssociationSchemeFields": {
    "accessPath": [
      "searchFieldAssociationSchemeFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "fieldId"
    ],
    "description": "Search field scheme fields",
    "parameterDescriptions": {
      "startAt": "The starting index of the returned fields. Base index: 0.",
      "maxResults": "The maximum number of fields to return per page, maximum allowed value is 100.",
      "fieldId": "The field IDs to filter by, if empty then all fields belonging to a field association scheme will be returned",
      "id": "The scheme ID to search for child fields"
    }
  },
  "getFieldAssociationSchemeItemParameters": {
    "accessPath": [
      "getFieldAssociationSchemeItemParameters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}/fields/{fieldId}/parameters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get field parameters",
    "parameterDescriptions": {
      "id": "the ID of the field association scheme to retrieve parameters for",
      "fieldId": "the ID of the field"
    }
  },
  "searchFieldAssociationSchemeProjects": {
    "accessPath": [
      "searchFieldAssociationSchemeProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/config/fieldschemes/{id}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Search field scheme projects",
    "parameterDescriptions": {
      "startAt": "The starting index of the returned projects. Base index: 0.",
      "maxResults": "The maximum number of projects to return per page, maximum allowed value is 100.",
      "projectId": "The project Ids to filter by, if empty then all projects belonging to a field association scheme will be returned",
      "id": "The scheme id to search for associated projects"
    }
  },
  "getConfiguration": {
    "accessPath": [
      "getConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/configuration",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get global settings"
  },
  "getSelectedTimeTrackingImplementation": {
    "accessPath": [
      "getSelectedTimeTrackingImplementation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/configuration/timetracking",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get selected time tracking provider"
  },
  "selectTimeTrackingImplementation": {
    "accessPath": [
      "selectTimeTrackingImplementation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/configuration/timetracking",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Select time tracking provider"
  },
  "getAvailableTimeTrackingImplementations": {
    "accessPath": [
      "getAvailableTimeTrackingImplementations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/configuration/timetracking/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all time tracking providers"
  },
  "getSharedTimeTrackingConfiguration": {
    "accessPath": [
      "getSharedTimeTrackingConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/configuration/timetracking/options",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get time tracking settings"
  },
  "setSharedTimeTrackingConfiguration": {
    "accessPath": [
      "setSharedTimeTrackingConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultUnit",
      "timeFormat",
      "workingDaysPerWeek",
      "workingHoursPerDay"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/configuration/timetracking/options",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set time tracking settings"
  },
  "getCustomFieldOption": {
    "accessPath": [
      "getCustomFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/customFieldOption/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get custom field option",
    "parameterDescriptions": {
      "id": "The ID of the custom field option."
    }
  },
  "getAllDashboards": {
    "accessPath": [
      "getAllDashboards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "startAt",
      "maxResults"
    ],
    "description": "Get all dashboards",
    "parameterDescriptions": {
      "filter": "The filter applied to the list of dashboards. Valid values are:\n\n *  `favourite` Returns dashboards the user has marked as favorite.\n *  `my` Returns dashboards owned by the user.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "createDashboard": {
    "accessPath": [
      "createDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "editPermissions",
      "name",
      "sharePermissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/dashboard",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "extendAdminPermissions"
    ],
    "description": "Create dashboard",
    "parameterDescriptions": {
      "extendAdminPermissions": "Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)"
    }
  },
  "bulkEditDashboards": {
    "accessPath": [
      "bulkEditDashboards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "changeOwnerDetails",
      "entityIds",
      "extendAdminPermissions",
      "permissionDetails"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/dashboard/bulk/edit",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk edit dashboards"
  },
  "getAllAvailableDashboardGadgets": {
    "accessPath": [
      "getAllAvailableDashboardGadgets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard/gadgets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get available gadgets"
  },
  "getDashboardsPaginated": {
    "accessPath": [
      "getDashboardsPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "dashboardName",
      "accountId",
      "owner",
      "groupname",
      "groupId",
      "projectId",
      "orderBy",
      "startAt",
      "maxResults",
      "status",
      "expand"
    ],
    "description": "Search for dashboards",
    "parameterDescriptions": {
      "dashboardName": "String used to perform a case-insensitive partial match with `name`.",
      "accountId": "User account ID used to return dashboards with the matching `owner.accountId`. This parameter cannot be used with the `owner` parameter.",
      "owner": "This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return dashboards with the matching `owner.name`. This parameter cannot be used with the `accountId` parameter.",
      "groupname": "As a group's name can change, use of `groupId` is recommended. Group name used to return dashboards that are shared with a group that matches `sharePermissions.group.name`. This parameter cannot be used with the `groupId` parameter.",
      "groupId": "Group ID used to return dashboards that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter.",
      "projectId": "Project ID used to returns dashboards that are shared with a project that matches `sharePermissions.project.id`.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `description` Sorts by dashboard description. Note that this sort works independently of whether the expand to display the description field is in use.\n *  `favourite_count` Sorts by dashboard popularity.\n *  `id` Sorts by dashboard ID.\n *  `is_favourite` Sorts by whether the dashboard is marked as a favorite.\n *  `name` Sorts by dashboard name.\n *  `owner` Sorts by dashboard owner name.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "status": "The status to filter by. It may be active, archived or deleted.",
      "expand": "Use [expand](#expansion) to include additional information about dashboard in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `description` Returns the description of the dashboard.\n *  `owner` Returns the owner of the dashboard.\n *  `viewUrl` Returns the URL that is used to view the dashboard.\n *  `favourite` Returns `isFavourite`, an indicator of whether the user has set the dashboard as a favorite.\n *  `favouritedCount` Returns `popularity`, a count of how many users have set this dashboard as a favorite.\n *  `sharePermissions` Returns details of the share permissions defined for the dashboard.\n *  `editPermissions` Returns details of the edit permissions defined for the dashboard.\n *  `isWritable` Returns whether the current user has permission to edit the dashboard."
    }
  },
  "getAllGadgets": {
    "accessPath": [
      "getAllGadgets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/gadget",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "moduleKey",
      "uri",
      "gadgetId"
    ],
    "description": "Get gadgets",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "moduleKey": "The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand: `moduleKey=key:one&moduleKey=key:two`.",
      "uri": "The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand: `uri=/rest/example/uri/1&uri=/rest/example/uri/2`.",
      "gadgetId": "The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`."
    }
  },
  "addGadget": {
    "accessPath": [
      "addGadget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "color",
      "ignoreUriAndModuleKeyValidation",
      "moduleKey",
      "position",
      "title",
      "uri"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/gadget",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add gadget to dashboard",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard."
    }
  },
  "removeGadget": {
    "accessPath": [
      "removeGadget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId",
      "gadgetId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove gadget from dashboard",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "gadgetId": "The ID of the gadget."
    }
  },
  "updateGadget": {
    "accessPath": [
      "updateGadget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "color",
      "position",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/gadget/{gadgetId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId",
      "gadgetId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update gadget on dashboard",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "gadgetId": "The ID of the gadget."
    }
  },
  "getDashboardItemPropertyKeys": {
    "accessPath": [
      "getDashboardItemPropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId",
      "itemId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get dashboard item property keys",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "itemId": "The ID of the dashboard item."
    }
  },
  "deleteDashboardItemProperty": {
    "accessPath": [
      "deleteDashboardItemProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId",
      "itemId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete dashboard item property",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "itemId": "The ID of the dashboard item.",
      "propertyKey": "The key of the dashboard item property."
    }
  },
  "getDashboardItemProperty": {
    "accessPath": [
      "getDashboardItemProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId",
      "itemId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get dashboard item property",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "itemId": "The ID of the dashboard item.",
      "propertyKey": "The key of the dashboard item property."
    }
  },
  "setDashboardItemProperty": {
    "accessPath": [
      "setDashboardItemProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboardId",
      "itemId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set dashboard item property",
    "parameterDescriptions": {
      "dashboardId": "The ID of the dashboard.",
      "itemId": "The ID of the dashboard item.",
      "propertyKey": "The key of the dashboard item property. The maximum length is 255 characters. For dashboard items with a spec URI and no complete module key, if the provided propertyKey is equal to \"config\", the request body's JSON must be an object with all keys and values as strings."
    }
  },
  "deleteDashboard": {
    "accessPath": [
      "deleteDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/dashboard/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete dashboard",
    "parameterDescriptions": {
      "id": "The ID of the dashboard."
    }
  },
  "getDashboard": {
    "accessPath": [
      "getDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/dashboard/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get dashboard",
    "parameterDescriptions": {
      "id": "The ID of the dashboard."
    }
  },
  "updateDashboard": {
    "accessPath": [
      "updateDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "editPermissions",
      "name",
      "sharePermissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/dashboard/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "extendAdminPermissions"
    ],
    "description": "Update dashboard",
    "parameterDescriptions": {
      "id": "The ID of the dashboard to update.",
      "extendAdminPermissions": "Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)"
    }
  },
  "copyDashboard": {
    "accessPath": [
      "copyDashboard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "editPermissions",
      "name",
      "sharePermissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/dashboard/{id}/copy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "extendAdminPermissions"
    ],
    "description": "Copy dashboard",
    "parameterDescriptions": {
      "extendAdminPermissions": "Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)"
    }
  },
  "getPolicy": {
    "accessPath": [
      "getPolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/data-policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get data policy for the workspace"
  },
  "getPolicies": {
    "accessPath": [
      "getPolicies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/data-policy/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids"
    ],
    "description": "Get data policy for projects",
    "parameterDescriptions": {
      "ids": "A list of project identifiers. This parameter accepts a comma-separated list."
    }
  },
  "getEvents": {
    "accessPath": [
      "getEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get events"
  },
  "analyseExpression": {
    "accessPath": [
      "analyseExpression"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contextVariables",
      "expressions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/expression/analyse",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "check"
    ],
    "description": "Analyse Jira expression",
    "parameterDescriptions": {
      "check": "The check to perform:\n\n *  `syntax` Each expression's syntax is checked to ensure the expression can be parsed. Also, syntactic limits are validated. For example, the expression's length.\n *  `type` EXPERIMENTAL. Each expression is type checked and the final type of the expression inferred. Any type errors that would result in the expression failure at runtime are reported. For example, accessing properties that don't exist or passing the wrong number of arguments to functions. Also performs the syntax check.\n *  `complexity` EXPERIMENTAL. Determines the formulae for how many [expensive operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) each expression may execute."
    }
  },
  "evaluateJiraExpression": {
    "accessPath": [
      "evaluateJiraExpression"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "context",
      "expression"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/expression/eval",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Currently being removed. Evaluate Jira expression",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the [complexity limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing and debugging your expressions."
    }
  },
  "evaluateJSISJiraExpression": {
    "accessPath": [
      "evaluateJsisJiraExpression"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "context",
      "expression"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/expression/evaluate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Evaluate Jira expression using enhanced search API",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the [complexity limit](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing and debugging your expressions."
    }
  },
  "getFields": {
    "accessPath": [
      "getFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get fields"
  },
  "createCustomField": {
    "accessPath": [
      "createCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name",
      "searcherKey",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create custom field"
  },
  "removeAssociations": {
    "accessPath": [
      "removeAssociations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "associationContexts",
      "fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/association",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove associations"
  },
  "createAssociations": {
    "accessPath": [
      "createAssociations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "associationContexts",
      "fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/association",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create associations"
  },
  "getFieldsPaginated": {
    "accessPath": [
      "getFieldsPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "type",
      "id",
      "query",
      "orderBy",
      "expand",
      "projectIds"
    ],
    "description": "Get fields paginated",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "type": "The type of fields to search.",
      "id": "The IDs of the custom fields to return or, where `query` is specified, filter.",
      "query": "String used to perform a case-insensitive partial match with field names or descriptions.",
      "orderBy": "[Order](#ordering) the results by:\n\n *  `contextsCount` sorts by the number of contexts related to a field\n *  `lastUsed` sorts by the date when the value of the field last changed\n *  `name` sorts by the field name\n *  `screensCount` sorts by the number of screens related to a field",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `key` returns the key for each field\n *  `stableId` returns the stableId for each field\n *  `lastUsed` returns the date when the value of the field last changed\n *  `screensCount` returns the number of screens related to a field\n *  `contextsCount` returns the number of contexts related to a field\n *  `isLocked` returns information about whether the field is locked\n *  `searcherKey` returns the searcher key for each custom field",
      "projectIds": "The IDs of the projects to filter the fields by. Fields belonging to project Ids that the user does not have access to will not be returned"
    }
  },
  "getTrashedFieldsPaginated": {
    "accessPath": [
      "getTrashedFieldsPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/search/trashed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "query",
      "expand",
      "orderBy"
    ],
    "description": "Get fields in trash paginated",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "query": "String used to perform a case-insensitive partial match with field names or descriptions.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `name` sorts by the field name\n *  `trashDate` sorts by the date the field was moved to the trash\n *  `plannedDeletionDate` sorts by the planned deletion date"
    }
  },
  "updateCustomField": {
    "accessPath": [
      "updateCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name",
      "searcherKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update custom field",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field."
    }
  },
  "getFieldProjectAssociations": {
    "accessPath": [
      "getFieldProjectAssociations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/association/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get field project associations",
    "parameterDescriptions": {
      "fieldId": "The ID of the field, for example `customfield_10000`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getContextsForField": {
    "accessPath": [
      "getContextsForField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "isAnyIssueType",
      "isGlobalContext",
      "contextId",
      "startAt",
      "maxResults"
    ],
    "description": "Get custom field contexts",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "isAnyIssueType": "Whether to return contexts that apply to all issue types.",
      "isGlobalContext": "Whether to return contexts that apply to all projects.",
      "contextId": "The list of context IDs. To include multiple contexts, separate IDs with ampersand: `contextId=10000&contextId=10001`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "createCustomFieldContext": {
    "accessPath": [
      "createCustomFieldContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "id",
      "issueTypeIds",
      "name",
      "projectIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create custom field context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field."
    }
  },
  "getDefaultValues": {
    "accessPath": [
      "getDefaultValues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/defaultValue",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "contextId",
      "startAt",
      "maxResults"
    ],
    "description": "Get custom field contexts default values",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field, for example `customfield\\_10000`.",
      "contextId": "The IDs of the contexts.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "setDefaultValues": {
    "accessPath": [
      "setDefaultValues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultValues"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/defaultValue",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set custom field contexts default values",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field."
    }
  },
  "getIssueTypeMappingsForContexts": {
    "accessPath": [
      "getIssueTypeMappingsForContexts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/issuetypemapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "contextId",
      "startAt",
      "maxResults"
    ],
    "description": "Get issue types for custom field context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context. To include multiple contexts, provide an ampersand-separated list. For example, `contextId=10001&contextId=10002`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getCustomFieldContextsForProjectsAndIssueTypes": {
    "accessPath": [
      "getCustomFieldContextsForProjectsAndIssueTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "mappings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get custom field contexts for projects and issue types",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getProjectContextMapping": {
    "accessPath": [
      "getProjectContextMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/projectmapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "contextId",
      "startAt",
      "maxResults"
    ],
    "description": "Get project mappings for custom field context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field, for example `customfield\\_10000`.",
      "contextId": "The list of context IDs. To include multiple context, separate IDs with ampersand: `contextId=10000&contextId=10001`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "deleteCustomFieldContext": {
    "accessPath": [
      "deleteCustomFieldContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete custom field context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "updateCustomFieldContext": {
    "accessPath": [
      "updateCustomFieldContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update custom field context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "addIssueTypesToContext": {
    "accessPath": [
      "addIssueTypesToContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/issuetype",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add issue types to context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "removeIssueTypesFromContext": {
    "accessPath": [
      "removeIssueTypesFromContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/issuetype/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove issue types from context",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "getOptionsForContext": {
    "accessPath": [
      "getOptionsForContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/option",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "optionId",
      "onlyOptions",
      "startAt",
      "maxResults"
    ],
    "description": "Get custom field options (context)",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context.",
      "optionId": "The ID of the option.",
      "onlyOptions": "Whether only options are returned.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "createCustomFieldOption": {
    "accessPath": [
      "createCustomFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/option",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create custom field options (context)",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "updateCustomFieldOption": {
    "accessPath": [
      "updateCustomFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/option",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update custom field options (context)",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "reorderCustomFieldOptions": {
    "accessPath": [
      "reorderCustomFieldOptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "customFieldOptionIds",
      "position"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/option/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reorder custom field options (context)",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "deleteCustomFieldOption": {
    "accessPath": [
      "deleteCustomFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/option/{optionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId",
      "optionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete custom field options (context)",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context from which an option should be deleted.",
      "optionId": "The ID of the option to delete."
    }
  },
  "replaceCustomFieldOption": {
    "accessPath": [
      "replaceCustomFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/option/{optionId}/issue",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "optionId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "replaceWith",
      "jql"
    ],
    "description": "Replace custom field options",
    "parameterDescriptions": {
      "replaceWith": "The ID of the option that will replace the currently selected option.",
      "jql": "A JQL query that specifies the issues to be updated. For example, *project=10000*.",
      "fieldId": "The ID of the custom field.",
      "optionId": "The ID of the option to be deselected.",
      "contextId": "The ID of the context."
    }
  },
  "assignProjectsToCustomFieldContext": {
    "accessPath": [
      "assignProjectsToCustomFieldContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "projectIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign custom field context to projects",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "removeCustomFieldContextFromProjects": {
    "accessPath": [
      "removeCustomFieldContextFromProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "projectIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{fieldId}/context/{contextId}/project/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId",
      "contextId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove custom field context from projects",
    "parameterDescriptions": {
      "fieldId": "The ID of the custom field.",
      "contextId": "The ID of the context."
    }
  },
  "getContextsForFieldDeprecated": {
    "accessPath": [
      "getContextsForFieldDeprecated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/contexts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get contexts for a field",
    "parameterDescriptions": {
      "fieldId": "The ID of the field to return contexts for.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getScreensForField": {
    "accessPath": [
      "getScreensForField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldId}/screens",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "expand"
    ],
    "description": "Get screens for a field",
    "parameterDescriptions": {
      "fieldId": "The ID of the field to return screens for.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "expand": "Use [expand](#expansion) to include additional information about screens in the response. This parameter accepts `tab` which returns details about the screen tabs the field is used in."
    }
  },
  "getAllIssueFieldOptions": {
    "accessPath": [
      "getAllIssueFieldOptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get all issue field options",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"
    }
  },
  "createIssueFieldOption": {
    "accessPath": [
      "createIssueFieldOption"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "config",
      "properties",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue field option",
    "parameterDescriptions": {
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"
    }
  },
  "getSelectableIssueFieldOptions": {
    "accessPath": [
      "getSelectableIssueFieldOptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option/suggestions/edit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Get selectable issue field options",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "Filters the results to options that are only available in the specified project.",
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"
    }
  },
  "getVisibleIssueFieldOptions": {
    "accessPath": [
      "getVisibleIssueFieldOptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option/suggestions/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Get visible issue field options",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "Filters the results to options that are only available in the specified project.",
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`"
    }
  },
  "deleteIssueFieldOption": {
    "accessPath": [
      "deleteIssueFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option/{optionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey",
      "optionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue field option",
    "parameterDescriptions": {
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`",
      "optionId": "The ID of the option to be deleted."
    }
  },
  "getIssueFieldOption": {
    "accessPath": [
      "getIssueFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option/{optionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey",
      "optionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue field option",
    "parameterDescriptions": {
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`",
      "optionId": "The ID of the option to be returned."
    }
  },
  "updateIssueFieldOption": {
    "accessPath": [
      "updateIssueFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "config",
      "id",
      "properties",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option/{optionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey",
      "optionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue field option",
    "parameterDescriptions": {
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`",
      "optionId": "The ID of the option to be updated."
    }
  },
  "replaceIssueFieldOption": {
    "accessPath": [
      "replaceIssueFieldOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/{fieldKey}/option/{optionId}/issue",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldKey",
      "optionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "replaceWith",
      "jql",
      "overrideScreenSecurity",
      "overrideEditableFlag"
    ],
    "description": "Replace issue field option",
    "parameterDescriptions": {
      "replaceWith": "The ID of the option that will replace the currently selected option.",
      "jql": "A JQL query that specifies the issues to be updated. For example, *project=10000*.",
      "overrideScreenSecurity": "Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with admin permission.",
      "overrideEditableFlag": "Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "fieldKey": "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:\n\n *  open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin Manager.\n *  run [Get fields](#api-rest-api-3-field-get) and in the field details the value is returned in `key`. For example, `\"key\": \"teams-add-on__team-issue-field\"`",
      "optionId": "The ID of the option to be deselected."
    }
  },
  "deleteCustomField": {
    "accessPath": [
      "deleteCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/field/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete custom field",
    "parameterDescriptions": {
      "id": "The ID of a custom field."
    }
  },
  "restoreCustomField": {
    "accessPath": [
      "restoreCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{id}/restore",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Restore custom field from trash",
    "parameterDescriptions": {
      "id": "The ID of a custom field."
    }
  },
  "trashCustomField": {
    "accessPath": [
      "trashCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/field/{id}/trash",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move custom field to trash",
    "parameterDescriptions": {
      "id": "The ID of a custom field."
    }
  },
  "getAllFieldConfigurations": {
    "accessPath": [
      "getAllFieldConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/fieldconfiguration",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "isDefault",
      "query"
    ],
    "description": "Get all field configurations",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of field configuration IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.",
      "isDefault": "If *true* returns default field configurations only.",
      "query": "The query string used to match against field configuration names and descriptions."
    }
  },
  "createFieldConfiguration": {
    "accessPath": [
      "createFieldConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/fieldconfiguration",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create field configuration"
  },
  "deleteFieldConfiguration": {
    "accessPath": [
      "deleteFieldConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/fieldconfiguration/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete field configuration",
    "parameterDescriptions": {
      "id": "The ID of the field configuration."
    }
  },
  "updateFieldConfiguration": {
    "accessPath": [
      "updateFieldConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/fieldconfiguration/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update field configuration",
    "parameterDescriptions": {
      "id": "The ID of the field configuration."
    }
  },
  "getFieldConfigurationItems": {
    "accessPath": [
      "getFieldConfigurationItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/fieldconfiguration/{id}/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get field configuration items",
    "parameterDescriptions": {
      "id": "The ID of the field configuration.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "updateFieldConfigurationItems": {
    "accessPath": [
      "updateFieldConfigurationItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fieldConfigurationItems"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/fieldconfiguration/{id}/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update field configuration items",
    "parameterDescriptions": {
      "id": "The ID of the field configuration."
    }
  },
  "getAllFieldConfigurationSchemes": {
    "accessPath": [
      "getAllFieldConfigurationSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id"
    ],
    "description": "Get all field configuration schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of field configuration scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`."
    }
  },
  "createFieldConfigurationScheme": {
    "accessPath": [
      "createFieldConfigurationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create field configuration scheme"
  },
  "getFieldConfigurationSchemeMappings": {
    "accessPath": [
      "getFieldConfigurationSchemeMappings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "fieldConfigurationSchemeId"
    ],
    "description": "Get field configuration issue type items",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "fieldConfigurationSchemeId": "The list of field configuration scheme IDs. To include multiple field configuration schemes separate IDs with ampersand: `fieldConfigurationSchemeId=10000&fieldConfigurationSchemeId=10001`."
    }
  },
  "getFieldConfigurationSchemeProjectMapping": {
    "accessPath": [
      "getFieldConfigurationSchemeProjectMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Get field configuration schemes for projects",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`."
    }
  },
  "assignFieldConfigurationSchemeToProject": {
    "accessPath": [
      "assignFieldConfigurationSchemeToProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fieldConfigurationSchemeId",
      "projectId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign field configuration scheme to project"
  },
  "deleteFieldConfigurationScheme": {
    "accessPath": [
      "deleteFieldConfigurationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete field configuration scheme",
    "parameterDescriptions": {
      "id": "The ID of the field configuration scheme."
    }
  },
  "updateFieldConfigurationScheme": {
    "accessPath": [
      "updateFieldConfigurationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update field configuration scheme",
    "parameterDescriptions": {
      "id": "The ID of the field configuration scheme."
    }
  },
  "setFieldConfigurationSchemeMapping": {
    "accessPath": [
      "setFieldConfigurationSchemeMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "mappings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/{id}/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign issue types to field configurations",
    "parameterDescriptions": {
      "id": "The ID of the field configuration scheme."
    }
  },
  "removeIssueTypesFromGlobalFieldConfigurationScheme": {
    "accessPath": [
      "removeIssueTypesFromGlobalFieldConfigurationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/fieldconfigurationscheme/{id}/mapping/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove issue types from field configuration scheme",
    "parameterDescriptions": {
      "id": "The ID of the field configuration scheme."
    }
  },
  "createFilter": {
    "accessPath": [
      "createFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "approximateLastUsed",
      "description",
      "editPermissions",
      "favourite",
      "favouritedCount",
      "id",
      "jql",
      "name",
      "owner",
      "searchUrl",
      "self",
      "sharePermissions",
      "sharedUsers",
      "subscriptions",
      "viewUrl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/filter",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "overrideSharePermissions"
    ],
    "description": "Create filter",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`.",
      "overrideSharePermissions": "EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be created. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."
    }
  },
  "getDefaultShareScope": {
    "accessPath": [
      "getDefaultShareScope"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/defaultShareScope",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get default share scope"
  },
  "setDefaultShareScope": {
    "accessPath": [
      "setDefaultShareScope"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "scope"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/filter/defaultShareScope",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set default share scope"
  },
  "getFavouriteFilters": {
    "accessPath": [
      "getFavouriteFilters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/favourite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get favorite filters",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`."
    }
  },
  "getMyFilters": {
    "accessPath": [
      "getMyFilters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/my",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "includeFavourites"
    ],
    "description": "Get my filters",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`.",
      "includeFavourites": "Include the user's favorite filters in the response."
    }
  },
  "getFiltersPaginated": {
    "accessPath": [
      "getFiltersPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filterName",
      "accountId",
      "owner",
      "groupname",
      "groupId",
      "projectId",
      "id",
      "orderBy",
      "startAt",
      "maxResults",
      "expand",
      "overrideSharePermissions",
      "isSubstringMatch"
    ],
    "description": "Search for filters",
    "parameterDescriptions": {
      "filterName": "String used to perform a case-insensitive partial match with `name`.",
      "accountId": "User account ID used to return filters with the matching `owner.accountId`. This parameter cannot be used with `owner`.",
      "owner": "This parameter is deprecated because of privacy changes. Use `accountId` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return filters with the matching `owner.name`. This parameter cannot be used with `accountId`.",
      "groupname": "As a group's name can change, use of `groupId` is recommended to identify a group. Group name used to returns filters that are shared with a group that matches `sharePermissions.group.groupname`. This parameter cannot be used with the `groupId` parameter.",
      "groupId": "Group ID used to returns filters that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter.",
      "projectId": "Project ID used to returns filters that are shared with a project that matches `sharePermissions.project.id`.",
      "id": "The list of filter IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Do not exceed 200 filter IDs.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `description` Sorts by filter description. Note that this sorting works independently of whether the expand to display the description field is in use.\n *  `favourite_count` Sorts by the count of how many users have this filter as a favorite.\n *  `is_favourite` Sorts by whether the filter is marked as a favorite.\n *  `id` Sorts by filter ID.\n *  `name` Sorts by filter name.\n *  `owner` Sorts by the ID of the filter owner.\n *  `is_shared` Sorts by whether the filter is shared.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `description` Returns the description of the filter.\n *  `favourite` Returns an indicator of whether the user has set the filter as a favorite.\n *  `favouritedCount` Returns a count of how many users have set this filter as a favorite.\n *  `jql` Returns the JQL query that the filter uses.\n *  `owner` Returns the owner of the filter.\n *  `searchUrl` Returns a URL to perform the filter's JQL query.\n *  `sharePermissions` Returns the share permissions defined for the filter.\n *  `editPermissions` Returns the edit permissions defined for the filter.\n *  `isWritable` Returns whether the current user has permission to edit the filter.\n *  `approximateLastUsed` \\[Experimental\\] Returns the approximate date and time when the filter was last evaluated.\n *  `subscriptions` Returns the users that are subscribed to the filter.\n *  `viewUrl` Returns a URL to view the filter.",
      "overrideSharePermissions": "EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "isSubstringMatch": "When `true` this will perform a case-insensitive substring match for the provided `filterName`. When `false` the filter name will be searched using [full text search syntax](https://support.atlassian.com/jira-software-cloud/docs/search-for-issues-using-the-text-field/)."
    }
  },
  "deleteFilter": {
    "accessPath": [
      "deleteFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/filter/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete filter",
    "parameterDescriptions": {
      "id": "The ID of the filter to delete."
    }
  },
  "getFilter": {
    "accessPath": [
      "getFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "overrideSharePermissions"
    ],
    "description": "Get filter",
    "parameterDescriptions": {
      "id": "The ID of the filter to return.",
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`.",
      "overrideSharePermissions": "EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."
    }
  },
  "updateFilter": {
    "accessPath": [
      "updateFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "approximateLastUsed",
      "description",
      "editPermissions",
      "favourite",
      "favouritedCount",
      "id",
      "jql",
      "name",
      "owner",
      "searchUrl",
      "self",
      "sharePermissions",
      "sharedUsers",
      "subscriptions",
      "viewUrl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/filter/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "overrideSharePermissions"
    ],
    "description": "Update filter",
    "parameterDescriptions": {
      "id": "The ID of the filter to update.",
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`.",
      "overrideSharePermissions": "EXPERIMENTAL: Whether share permissions are overridden to enable the addition of any share permissions to filters. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."
    }
  },
  "resetColumns": {
    "accessPath": [
      "resetColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/filter/{id}/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset columns",
    "parameterDescriptions": {
      "id": "The ID of the filter."
    }
  },
  "getColumns": {
    "accessPath": [
      "getColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/{id}/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get columns",
    "parameterDescriptions": {
      "id": "The ID of the filter."
    }
  },
  "setColumns": {
    "accessPath": [
      "setColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "columns"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/filter/{id}/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set columns",
    "parameterDescriptions": {
      "id": "The ID of the filter."
    }
  },
  "deleteFavouriteForFilter": {
    "accessPath": [
      "deleteFavouriteForFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/filter/{id}/favourite",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Remove filter as favorite",
    "parameterDescriptions": {
      "id": "The ID of the filter.",
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`."
    }
  },
  "setFavouriteForFilter": {
    "accessPath": [
      "setFavouriteForFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/filter/{id}/favourite",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Add filter as favorite",
    "parameterDescriptions": {
      "id": "The ID of the filter.",
      "expand": "Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `[start-index:end-index]` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers[1001:2000]`.\n *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `[start-index:end-index]` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions[1001:2000]`."
    }
  },
  "changeFilterOwner": {
    "accessPath": [
      "changeFilterOwner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/filter/{id}/owner",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Change filter owner",
    "parameterDescriptions": {
      "id": "The ID of the filter to update."
    }
  },
  "getSharePermissions": {
    "accessPath": [
      "getSharePermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/{id}/permission",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get share permissions",
    "parameterDescriptions": {
      "id": "The ID of the filter."
    }
  },
  "addSharePermission": {
    "accessPath": [
      "addSharePermission"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountId",
      "groupId",
      "groupname",
      "projectId",
      "projectRoleId",
      "rights",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/filter/{id}/permission",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add share permission",
    "parameterDescriptions": {
      "id": "The ID of the filter."
    }
  },
  "deleteSharePermission": {
    "accessPath": [
      "deleteSharePermission"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/filter/{id}/permission/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete share permission",
    "parameterDescriptions": {
      "id": "The ID of the filter.",
      "permissionId": "The ID of the share permission."
    }
  },
  "getSharePermission": {
    "accessPath": [
      "getSharePermission"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/filter/{id}/permission/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get share permission",
    "parameterDescriptions": {
      "id": "The ID of the filter.",
      "permissionId": "The ID of the share permission."
    }
  },
  "bulkPinUnpinProjectsAsync": {
    "accessPath": [
      "bulkPinUnpinProjectsAsync"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "moduleId",
      "projectList"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/forge/panel/action/bulk/async",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk pin or unpin issue panel to projects"
  },
  "removeGroup": {
    "accessPath": [
      "removeGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/group",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "groupname",
      "groupId",
      "swapGroup",
      "swapGroupId"
    ],
    "description": "Remove group",
    "parameterDescriptions": {
      "groupId": "The ID of the group. This parameter cannot be used with the `groupname` parameter.",
      "swapGroup": "As a group's name can change, use of `swapGroupId` is recommended to identify a group.  \nThe group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter.",
      "swapGroupId": "The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroup` parameter."
    }
  },
  "getGroup": {
    "accessPath": [
      "getGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/group",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "groupname",
      "groupId",
      "expand"
    ],
    "description": "Get group",
    "parameterDescriptions": {
      "groupname": "As a group's name can change, use of `groupId` is recommended to identify a group.  \nThe name of the group. This parameter cannot be used with the `groupId` parameter.",
      "groupId": "The ID of the group. This parameter cannot be used with the `groupName` parameter.",
      "expand": "List of fields to expand."
    }
  },
  "createGroup": {
    "accessPath": [
      "createGroup"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/group",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create group"
  },
  "bulkGetGroups": {
    "accessPath": [
      "bulkGetGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/group/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "groupId",
      "groupName",
      "accessType",
      "applicationKey"
    ],
    "description": "Bulk get groups",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "groupId": "The ID of a group. To specify multiple IDs, pass multiple `groupId` parameters. For example, `groupId=5b10a2844c20165700ede21g&groupId=5b10ac8d82e05b22cc7d4ef5`.",
      "groupName": "The name of a group. To specify multiple names, pass multiple `groupName` parameters. For example, `groupName=administrators&groupName=jira-software-users`.",
      "accessType": "The access level of a group. Valid values: 'site-admin', 'admin', 'user'.",
      "applicationKey": "The application key of the product user groups to search for. Valid values: 'jira-servicedesk', 'jira-software', 'jira-product-discovery', 'jira-core'."
    }
  },
  "getUsersFromGroup": {
    "accessPath": [
      "getUsersFromGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/group/member",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "groupname",
      "groupId",
      "includeInactiveUsers",
      "startAt",
      "maxResults"
    ],
    "description": "Get users from group",
    "parameterDescriptions": {
      "groupname": "As a group's name can change, use of `groupId` is recommended to identify a group.  \nThe name of the group. This parameter cannot be used with the `groupId` parameter.",
      "groupId": "The ID of the group. This parameter cannot be used with the `groupName` parameter.",
      "includeInactiveUsers": "Include inactive users.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page (number should be between 1 and 50)."
    }
  },
  "removeUserFromGroup": {
    "accessPath": [
      "removeUserFromGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/group/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "groupname",
      "groupId",
      "username",
      "accountId"
    ],
    "description": "Remove user from group",
    "parameterDescriptions": {
      "groupname": "As a group's name can change, use of `groupId` is recommended to identify a group.  \nThe name of the group. This parameter cannot be used with the `groupId` parameter.",
      "groupId": "The ID of the group. This parameter cannot be used with the `groupName` parameter.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."
    }
  },
  "addUserToGroup": {
    "accessPath": [
      "addUserToGroup"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountId",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/group/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "groupname",
      "groupId"
    ],
    "description": "Add user to group",
    "parameterDescriptions": {
      "groupname": "As a group's name can change, use of `groupId` is recommended to identify a group.  \nThe name of the group. This parameter cannot be used with the `groupId` parameter.",
      "groupId": "The ID of the group. This parameter cannot be used with the `groupName` parameter."
    }
  },
  "findGroups": {
    "accessPath": [
      "findGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/groups/picker",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "query",
      "exclude",
      "excludeId",
      "maxResults",
      "caseInsensitive",
      "userName"
    ],
    "description": "Find groups",
    "parameterDescriptions": {
      "accountId": "This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user, use [Get user groups](#api-rest-api-3-user-groups-get).",
      "query": "The string to find in group names.",
      "exclude": "As a group's name can change, use of `excludeGroupIds` is recommended to identify a group.  \nA group to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `exclude=group1&exclude=group2`. This parameter cannot be used with the `excludeGroupIds` parameter.",
      "excludeId": "A group ID to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with the `excludeGroups` parameter.",
      "maxResults": "The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system property `jira.ajax.autocomplete.limit`.",
      "caseInsensitive": "Whether the search for groups should be case insensitive.",
      "userName": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."
    }
  },
  "findUsersAndGroups": {
    "accessPath": [
      "findUsersAndGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/groupuserpicker",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "maxResults",
      "showAvatar",
      "fieldId",
      "projectId",
      "issueTypeId",
      "avatarSize",
      "caseInsensitive",
      "excludeConnectAddons"
    ],
    "description": "Find users and groups",
    "parameterDescriptions": {
      "query": "The search string.",
      "maxResults": "The maximum number of items to return in each list.",
      "showAvatar": "Whether the user avatar should be returned. If an invalid value is provided, the default value is used.",
      "fieldId": "The custom field ID of the field this request is for.",
      "projectId": "The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used when `fieldId` is present.",
      "issueTypeId": "The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values, such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only used when `fieldId` is present.",
      "avatarSize": "The size of the avatar to return. If an invalid value is provided, the default value is used.",
      "caseInsensitive": "Whether the search for groups should be case insensitive.",
      "excludeConnectAddons": "Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used."
    }
  },
  "getLicense": {
    "accessPath": [
      "getLicense"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/instance/license",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get license"
  },
  "createIssue": {
    "accessPath": [
      "createIssue"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fields",
      "historyMetadata",
      "properties",
      "transition",
      "update"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "updateHistory"
    ],
    "description": "Create issue",
    "parameterDescriptions": {
      "updateHistory": "Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a project. These values are then used to provide defaults on the issue create screen."
    }
  },
  "archiveIssuesAsync": {
    "accessPath": [
      "archiveIssuesAsync"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "jql"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive issue(s) by JQL"
  },
  "archiveIssues": {
    "accessPath": [
      "archiveIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueIdsOrKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive issue(s) by issue ID/key"
  },
  "createIssues": {
    "accessPath": [
      "createIssues"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueUpdates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk create issue"
  },
  "bulkFetchIssues": {
    "accessPath": [
      "bulkFetchIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "fields",
      "fieldsByKeys",
      "issueIdsOrKeys",
      "properties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/bulkfetch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk fetch issues"
  },
  "getCreateIssueMeta": {
    "accessPath": [
      "getCreateIssueMeta"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/createmeta",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectIds",
      "projectKeys",
      "issuetypeIds",
      "issuetypeNames",
      "expand"
    ],
    "description": "Get create issue metadata",
    "parameterDescriptions": {
      "projectIds": "List of project IDs. This parameter accepts a comma-separated list. Multiple project IDs can also be provided using an ampersand-separated list. For example, `projectIds=10000,10001&projectIds=10020,10021`. This parameter may be provided with `projectKeys`.",
      "projectKeys": "List of project keys. This parameter accepts a comma-separated list. Multiple project keys can also be provided using an ampersand-separated list. For example, `projectKeys=proj1,proj2&projectKeys=proj3`. This parameter may be provided with `projectIds`.",
      "issuetypeIds": "List of issue type IDs. This parameter accepts a comma-separated list. Multiple issue type IDs can also be provided using an ampersand-separated list. For example, `issuetypeIds=10000,10001&issuetypeIds=10020,10021`. This parameter may be provided with `issuetypeNames`.",
      "issuetypeNames": "List of issue type names. This parameter accepts a comma-separated list. Multiple issue type names can also be provided using an ampersand-separated list. For example, `issuetypeNames=name1,name2&issuetypeNames=name3`. This parameter may be provided with `issuetypeIds`.",
      "expand": "Use [expand](#expansion) to include additional information about issue metadata in the response. This parameter accepts `projects.issuetypes.fields`, which returns information about the fields in the issue creation screen for each issue type. Fields hidden from the screen are not returned. Use the information to populate the `fields` and `update` fields in [Create issue](#api-rest-api-3-issue-post) and [Create issues](#api-rest-api-3-issue-bulk-post)."
    }
  },
  "getCreateIssueMetaIssueTypes": {
    "accessPath": [
      "getCreateIssueMetaIssueTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/createmeta/{projectIdOrKey}/issuetypes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get create metadata issue types for a project",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or key of the project.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getCreateIssueMetaIssueTypeId": {
    "accessPath": [
      "getCreateIssueMetaIssueTypeId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/createmeta/{projectIdOrKey}/issuetypes/{issueTypeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "issueTypeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get create field metadata for a project and issue type id",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or key of the project.",
      "issueTypeId": "The issuetype ID.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getIssueLimitReport": {
    "accessPath": [
      "getIssueLimitReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/limit/report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "isReturningKeys"
    ],
    "description": "Get issue limit report",
    "parameterDescriptions": {
      "isReturningKeys": "Return issue keys instead of issue ids in the response.\n\nUsage: Add `?isReturningKeys=true` to the end of the path to request issue keys."
    }
  },
  "getIssuePickerResource": {
    "accessPath": [
      "getIssuePickerResource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/picker",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "currentJQL",
      "currentIssueKey",
      "currentProjectId",
      "showSubTasks",
      "showSubTaskParent"
    ],
    "description": "Get issue picker suggestions",
    "parameterDescriptions": {
      "query": "A string to match against text fields in the issue such as title, description, or comments.",
      "currentJQL": "A JQL query defining a list of issues to search for the query term. Note that `username` and `userkey` cannot be used as search terms for this parameter, due to privacy reasons. Use `accountId` instead.",
      "currentIssueKey": "The key of an issue to exclude from search results. For example, the issue the user is viewing when they perform this query.",
      "currentProjectId": "The ID of a project that suggested issues must belong to.",
      "showSubTasks": "Indicate whether to include subtasks in the suggestions list.",
      "showSubTaskParent": "When `currentIssueKey` is a subtask, whether to include the parent issue in the suggestions if it matches the query."
    }
  },
  "bulkSetIssuesPropertiesList": {
    "accessPath": [
      "bulkSetIssuesPropertiesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "entitiesIds",
      "properties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk set issues properties by list"
  },
  "bulkSetIssuePropertiesByIssue": {
    "accessPath": [
      "bulkSetIssuePropertiesByIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issues"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/properties/multi",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk set issue properties by issue"
  },
  "bulkDeleteIssueProperty": {
    "accessPath": [
      "bulkDeleteIssueProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "currentValue",
      "entityIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk delete issue property",
    "parameterDescriptions": {
      "propertyKey": "The key of the property."
    }
  },
  "bulkSetIssueProperty": {
    "accessPath": [
      "bulkSetIssueProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expression",
      "filter",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk set issue property",
    "parameterDescriptions": {
      "propertyKey": "The key of the property. The maximum length is 255 characters."
    }
  },
  "unarchiveIssues": {
    "accessPath": [
      "unarchiveIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueIdsOrKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unarchive issue(s) by issue keys/ID"
  },
  "getIsWatchingIssueBulk": {
    "accessPath": [
      "getIsWatchingIssueBulk"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/watching",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get is watching issue bulk"
  },
  "deleteIssue": {
    "accessPath": [
      "deleteIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "deleteSubtasks"
    ],
    "description": "Delete issue",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "deleteSubtasks": "Whether the issue's subtasks are deleted when the issue is deleted."
    }
  },
  "getIssue": {
    "accessPath": [
      "getIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "fields",
      "fieldsByKeys",
      "expand",
      "properties",
      "updateHistory",
      "failFast"
    ],
    "description": "Get issue",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "fields": "A list of fields to return for the issue. This parameter accepts a comma-separated list. Use it to retrieve a subset of fields. Allowed values:\n\n *  `*all` Returns all fields.\n *  `*navigable` Returns navigable fields.\n *  Any issue field, prefixed with a minus to exclude.\n\nExamples:\n\n *  `summary,comment` Returns only the summary and comments fields.\n *  `-description` Returns all (default) fields except description.\n *  `*navigable,-comment` Returns all navigable fields except comment.\n\nThis parameter may be specified multiple times. For example, `fields=field1,field2& fields=field3`.\n\nNote: All fields are returned by default. This differs from [Search for issues using JQL (GET)](#api-rest-api-3-search-get) and [Search for issues using JQL (POST)](#api-rest-api-3-search-post) where the default is all navigable fields.",
      "fieldsByKeys": "Whether fields in `fields` are referenced by keys rather than IDs. This parameter is useful where fields have been added by a connect app and a field's key may differ from its ID.",
      "expand": "Use [expand](#expansion) to include additional information about the issues in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `renderedFields` Returns field values rendered in HTML format.\n *  `names` Returns the display name of each field.\n *  `schema` Returns the schema describing a field type.\n *  `transitions` Returns all possible transitions for the issue.\n *  `editmeta` Returns information about how each field can be edited.\n *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.\n *  `versionedRepresentations` Returns a JSON array for each version of a field's value, with the highest number representing the most recent version. Note: When included in the request, the `fields` parameter is ignored.",
      "properties": "A list of issue properties to return for the issue. This parameter accepts a comma-separated list. Allowed values:\n\n *  `*all` Returns all issue properties.\n *  Any issue property key, prefixed with a minus to exclude.\n\nExamples:\n\n *  `*all` Returns all properties.\n *  `*all,-prop1` Returns all properties except `prop1`.\n *  `prop1,prop2` Returns `prop1` and `prop2` properties.\n\nThis parameter may be specified multiple times. For example, `properties=prop1,prop2& properties=prop3`.",
      "updateHistory": "Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. This also populates the [JQL issues search](#api-rest-api-3-search-get) `lastViewed` field.",
      "failFast": "Whether to fail the request quickly in case of an error while loading fields for an issue. For `failFast=true`, if one field fails, the entire operation fails. For `failFast=false`, the operation will continue even if a field fails. It will return a valid response, but without values for the failed field(s)."
    }
  },
  "editIssue": {
    "accessPath": [
      "editIssue"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fields",
      "historyMetadata",
      "properties",
      "transition",
      "update"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notifyUsers",
      "overrideScreenSecurity",
      "overrideEditableFlag",
      "returnIssue",
      "expand"
    ],
    "description": "Edit issue",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "notifyUsers": "Whether a notification email about the issue update is sent to all watchers. To disable the notification, administer Jira or administer project permissions are required. If the user doesn't have the necessary permission the request is ignored.",
      "overrideScreenSecurity": "Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "overrideEditableFlag": "Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "returnIssue": "Whether the response should contain the issue with fields edited in this request. The returned issue will have the same format as in the [Get issue API](#api-rest-api-3-issue-issueidorkey-get).",
      "expand": "The Get issue API expand parameter to use in the response if the `returnIssue` parameter is `true`."
    }
  },
  "assignIssue": {
    "accessPath": [
      "assignIssue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountId",
      "accountType",
      "active",
      "appType",
      "applicationRoles",
      "avatarUrls",
      "displayName",
      "emailAddress",
      "expand",
      "groups",
      "guest",
      "key",
      "locale",
      "name",
      "self",
      "timeZone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/assignee",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign issue",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue to be assigned."
    }
  },
  "addAttachment": {
    "accessPath": [
      "addAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add attachment",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue that attachments are added to."
    }
  },
  "getChangeLogs": {
    "accessPath": [
      "getChangeLogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/changelog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get changelogs",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getChangeLogsByIds": {
    "accessPath": [
      "getChangeLogsByIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "changelogIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/changelog/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get changelogs by IDs",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "getComments": {
    "accessPath": [
      "getComments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/comment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "orderBy",
      "expand"
    ],
    "description": "Get comments",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "orderBy": "[Order](#ordering) the results by a field. Accepts *created* to sort comments by their created date.",
      "expand": "Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML."
    }
  },
  "addComment": {
    "accessPath": [
      "addComment"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author",
      "body",
      "created",
      "id",
      "jsdAuthorCanSeeRequest",
      "jsdPublic",
      "properties",
      "renderedBody",
      "self",
      "updateAuthor",
      "updated",
      "visibility"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/comment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Add comment",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "expand": "Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML."
    }
  },
  "deleteComment": {
    "accessPath": [
      "deleteComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/comment/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete comment",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "id": "The ID of the comment."
    }
  },
  "getComment": {
    "accessPath": [
      "getComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/comment/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get comment",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "id": "The ID of the comment.",
      "expand": "Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML."
    }
  },
  "updateComment": {
    "accessPath": [
      "updateComment"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author",
      "body",
      "created",
      "id",
      "jsdAuthorCanSeeRequest",
      "jsdPublic",
      "properties",
      "renderedBody",
      "self",
      "updateAuthor",
      "updated",
      "visibility"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/comment/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "issueIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notifyUsers",
      "overrideEditableFlag",
      "expand"
    ],
    "description": "Update comment",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "id": "The ID of the comment.",
      "notifyUsers": "Whether users are notified when a comment is updated.",
      "overrideEditableFlag": "Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "expand": "Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts `renderedBody`, which returns the comment body rendered in HTML."
    }
  },
  "getEditIssueMeta": {
    "accessPath": [
      "getEditIssueMeta"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/editmeta",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "overrideScreenSecurity",
      "overrideEditableFlag"
    ],
    "description": "Get edit issue metadata",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "overrideScreenSecurity": "Whether hidden fields are returned. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "overrideEditableFlag": "Whether non-editable fields are returned. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)."
    }
  },
  "notify": {
    "accessPath": [
      "notify"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "htmlBody",
      "restrict",
      "subject",
      "textBody",
      "to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/notify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send notification for issue",
    "parameterDescriptions": {
      "issueIdOrKey": "ID or key of the issue that the notification is sent for."
    }
  },
  "getIssuePropertyKeys": {
    "accessPath": [
      "getIssuePropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue property keys",
    "parameterDescriptions": {
      "issueIdOrKey": "The key or ID of the issue."
    }
  },
  "deleteIssueProperty": {
    "accessPath": [
      "deleteIssueProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue property",
    "parameterDescriptions": {
      "issueIdOrKey": "The key or ID of the issue.",
      "propertyKey": "The key of the property."
    }
  },
  "getIssueProperty": {
    "accessPath": [
      "getIssueProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue property",
    "parameterDescriptions": {
      "issueIdOrKey": "The key or ID of the issue.",
      "propertyKey": "The key of the property."
    }
  },
  "setIssueProperty": {
    "accessPath": [
      "setIssueProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set issue property",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "propertyKey": "The key of the issue property. The maximum length is 255 characters."
    }
  },
  "deleteRemoteIssueLinkByGlobalId": {
    "accessPath": [
      "deleteRemoteIssueLinkByGlobalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/remotelink",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "globalId"
    ],
    "description": "Delete remote issue link by global ID",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "globalId": "The global ID of a remote issue link."
    }
  },
  "getRemoteIssueLinks": {
    "accessPath": [
      "getRemoteIssueLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/remotelink",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "globalId"
    ],
    "description": "Get remote issue links",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "globalId": "The global ID of the remote issue link."
    }
  },
  "createOrUpdateRemoteIssueLink": {
    "accessPath": [
      "createOrUpdateRemoteIssueLink"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "application",
      "globalId",
      "object",
      "relationship"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/remotelink",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or update remote issue link",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "deleteRemoteIssueLinkById": {
    "accessPath": [
      "deleteRemoteIssueLinkById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "linkId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete remote issue link by ID",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "linkId": "The ID of a remote issue link."
    }
  },
  "getRemoteIssueLinkById": {
    "accessPath": [
      "getRemoteIssueLinkById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "linkId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get remote issue link by ID",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "linkId": "The ID of the remote issue link."
    }
  },
  "updateRemoteIssueLink": {
    "accessPath": [
      "updateRemoteIssueLink"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "application",
      "globalId",
      "object",
      "relationship"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/remotelink/{linkId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "linkId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update remote issue link by ID",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "linkId": "The ID of the remote issue link."
    }
  },
  "getTransitions": {
    "accessPath": [
      "getTransitions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/transitions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "transitionId",
      "skipRemoteOnlyCondition",
      "includeUnavailableTransitions",
      "sortByOpsBarAndStatus"
    ],
    "description": "Get transitions",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "expand": "Use [expand](#expansion) to include additional information about transitions in the response. This parameter accepts `transitions.fields`, which returns information about the fields in the transition screen for each transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and `update` fields in [Transition issue](#api-rest-api-3-issue-issueIdOrKey-transitions-post).",
      "transitionId": "The ID of the transition.",
      "skipRemoteOnlyCondition": "Whether transitions with the condition *Hide From User Condition* are included in the response. Available to Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).",
      "includeUnavailableTransitions": "Whether details of transitions that fail a condition are included in the response",
      "sortByOpsBarAndStatus": "Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or only by ops-bar sequence value."
    }
  },
  "doTransition": {
    "accessPath": [
      "doTransition"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fields",
      "historyMetadata",
      "properties",
      "transition",
      "update"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/transitions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Transition issue",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "removeVote": {
    "accessPath": [
      "removeVote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/votes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete vote",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "getVotes": {
    "accessPath": [
      "getVotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/votes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get votes",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "addVote": {
    "accessPath": [
      "addVote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/votes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add vote",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "removeWatcher": {
    "accessPath": [
      "removeWatcher"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/watchers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username",
      "accountId"
    ],
    "description": "Delete watcher",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required."
    }
  },
  "getIssueWatchers": {
    "accessPath": [
      "getIssueWatchers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/watchers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue watchers",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "addWatcher": {
    "accessPath": [
      "addWatcher"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/watchers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add watcher",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue."
    }
  },
  "bulkDeleteWorklogs": {
    "accessPath": [
      "bulkDeleteWorklogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "adjustEstimate",
      "overrideEditableFlag"
    ],
    "description": "Bulk delete worklogs",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "adjustEstimate": "Defines how to update the issue's time estimate, the options are:\n\n *  `leave` Leaves the estimate unchanged.\n *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being deleted.",
      "overrideEditableFlag": "Whether the work log entries should be removed to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag."
    }
  },
  "getIssueWorklog": {
    "accessPath": [
      "getIssueWorklog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "startedAfter",
      "startedBefore",
      "expand"
    ],
    "description": "Get issue worklogs",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "startedAfter": "The worklog start date and time, as a UNIX timestamp in milliseconds, after which worklogs are returned.",
      "startedBefore": "The worklog start date and time, as a UNIX timestamp in milliseconds, before which worklogs are returned.",
      "expand": "Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts`properties`, which returns worklog properties."
    }
  },
  "addWorklog": {
    "accessPath": [
      "addWorklog"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author",
      "comment",
      "created",
      "id",
      "issueId",
      "properties",
      "self",
      "started",
      "timeSpent",
      "timeSpentSeconds",
      "updateAuthor",
      "updated",
      "visibility"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notifyUsers",
      "adjustEstimate",
      "newEstimate",
      "reduceBy",
      "expand",
      "overrideEditableFlag"
    ],
    "description": "Add worklog",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key the issue.",
      "notifyUsers": "Whether users watching the issue are notified by email.",
      "adjustEstimate": "Defines how to update the issue's time estimate, the options are:\n\n *  `new` Sets the estimate to a specific value, defined in `newEstimate`.\n *  `leave` Leaves the estimate unchanged.\n *  `manual` Reduces the estimate by amount specified in `reduceBy`.\n *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog.",
      "newEstimate": "The value to set as the issue's remaining time estimate, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `new`.",
      "reduceBy": "The amount to reduce the issue's remaining estimate by, as days (\\#d), hours (\\#h), or minutes (\\#m). For example, *2d*. Required when `adjustEstimate` is `manual`.",
      "expand": "Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts `properties`, which returns worklog properties.",
      "overrideEditableFlag": "Whether the worklog entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag."
    }
  },
  "bulkMoveWorklogs": {
    "accessPath": [
      "bulkMoveWorklogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids",
      "issueIdOrKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/move",
    "pathConflictKeys": [
      "issueIdOrKey"
    ],
    "pathParameterKeys": [
      "issueIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "adjustEstimate",
      "overrideEditableFlag"
    ],
    "description": "Bulk move worklogs",
    "parameterDescriptions": {
      "adjustEstimate": "Defines how to update the issues' time estimate, the options are:\n\n *  `leave` Leaves the estimate unchanged.\n *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being moved in the source issue, and increases it in the destination issue.",
      "overrideEditableFlag": "Whether the work log entry should be moved to and from the issues even if the issues are not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag."
    }
  },
  "deleteWorklog": {
    "accessPath": [
      "deleteWorklog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notifyUsers",
      "adjustEstimate",
      "newEstimate",
      "increaseBy",
      "overrideEditableFlag"
    ],
    "description": "Delete worklog",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "id": "The ID of the worklog.",
      "notifyUsers": "Whether users watching the issue are notified by email.",
      "adjustEstimate": "Defines how to update the issue's time estimate, the options are:\n\n *  `new` Sets the estimate to a specific value, defined in `newEstimate`.\n *  `leave` Leaves the estimate unchanged.\n *  `manual` Increases the estimate by amount specified in `increaseBy`.\n *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog.",
      "newEstimate": "The value to set as the issue's remaining time estimate, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `new`.",
      "increaseBy": "The amount to increase the issue's remaining estimate by, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `manual`.",
      "overrideEditableFlag": "Whether the work log entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag."
    }
  },
  "getWorklog": {
    "accessPath": [
      "getWorklog"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get worklog",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "id": "The ID of the worklog.",
      "expand": "Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts\n\n`properties`, which returns worklog properties."
    }
  },
  "updateWorklog": {
    "accessPath": [
      "updateWorklog"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author",
      "comment",
      "created",
      "id",
      "issueId",
      "properties",
      "self",
      "started",
      "timeSpent",
      "timeSpentSeconds",
      "updateAuthor",
      "updated",
      "visibility"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "issueIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notifyUsers",
      "adjustEstimate",
      "newEstimate",
      "expand",
      "overrideEditableFlag"
    ],
    "description": "Update worklog",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key the issue.",
      "id": "The ID of the worklog.",
      "notifyUsers": "Whether users watching the issue are notified by email.",
      "adjustEstimate": "Defines how to update the issue's time estimate, the options are:\n\n *  `new` Sets the estimate to a specific value, defined in `newEstimate`.\n *  `leave` Leaves the estimate unchanged.\n *  `auto` Updates the estimate by the difference between the original and updated value of `timeSpent` or `timeSpentSeconds`.",
      "newEstimate": "The value to set as the issue's remaining time estimate, as days (\\#d), hours (\\#h), or minutes (\\#m or \\#). For example, *2d*. Required when `adjustEstimate` is `new`.",
      "expand": "Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties`, which returns worklog properties.",
      "overrideEditableFlag": "Whether the worklog should be added to the issue even if the issue is not editable. For example, because the issue is closed. Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag."
    }
  },
  "getWorklogPropertyKeys": {
    "accessPath": [
      "getWorklogPropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "worklogId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get worklog property keys",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "worklogId": "The ID of the worklog."
    }
  },
  "deleteWorklogProperty": {
    "accessPath": [
      "deleteWorklogProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "worklogId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete worklog property",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "worklogId": "The ID of the worklog.",
      "propertyKey": "The key of the property."
    }
  },
  "getWorklogProperty": {
    "accessPath": [
      "getWorklogProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "worklogId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get worklog property",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "worklogId": "The ID of the worklog.",
      "propertyKey": "The key of the property."
    }
  },
  "setWorklogProperty": {
    "accessPath": [
      "setWorklogProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueIdOrKey",
      "worklogId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set worklog property",
    "parameterDescriptions": {
      "issueIdOrKey": "The ID or key of the issue.",
      "worklogId": "The ID of the worklog.",
      "propertyKey": "The key of the issue property. The maximum length is 255 characters."
    }
  },
  "linkIssues": {
    "accessPath": [
      "linkIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "inwardIssue",
      "outwardIssue",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issueLink",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue link"
  },
  "deleteIssueLink": {
    "accessPath": [
      "deleteIssueLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issueLink/{linkId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "linkId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue link",
    "parameterDescriptions": {
      "linkId": "The ID of the issue link."
    }
  },
  "getIssueLink": {
    "accessPath": [
      "getIssueLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issueLink/{linkId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "linkId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue link",
    "parameterDescriptions": {
      "linkId": "The ID of the issue link."
    }
  },
  "getIssueLinkTypes": {
    "accessPath": [
      "getIssueLinkTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issueLinkType",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue link types"
  },
  "createIssueLinkType": {
    "accessPath": [
      "createIssueLinkType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "inward",
      "name",
      "outward",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issueLinkType",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue link type"
  },
  "deleteIssueLinkType": {
    "accessPath": [
      "deleteIssueLinkType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issueLinkType/{issueLinkTypeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueLinkTypeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue link type",
    "parameterDescriptions": {
      "issueLinkTypeId": "The ID of the issue link type."
    }
  },
  "getIssueLinkType": {
    "accessPath": [
      "getIssueLinkType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issueLinkType/{issueLinkTypeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueLinkTypeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue link type",
    "parameterDescriptions": {
      "issueLinkTypeId": "The ID of the issue link type."
    }
  },
  "updateIssueLinkType": {
    "accessPath": [
      "updateIssueLinkType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "inward",
      "name",
      "outward",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issueLinkType/{issueLinkTypeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueLinkTypeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue link type",
    "parameterDescriptions": {
      "issueLinkTypeId": "The ID of the issue link type."
    }
  },
  "exportArchivedIssues": {
    "accessPath": [
      "exportArchivedIssues"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "archivedBy",
      "archivedDateRange",
      "issueTypes",
      "projects",
      "reporters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issues/archive/export",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Export archived issue(s)"
  },
  "getIssueSecuritySchemes": {
    "accessPath": [
      "getIssueSecuritySchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue security schemes"
  },
  "createIssueSecurityScheme": {
    "accessPath": [
      "createIssueSecurityScheme"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "levels",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issuesecurityschemes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue security scheme"
  },
  "getSecurityLevels": {
    "accessPath": [
      "getSecurityLevels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/level",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "schemeId",
      "onlyDefault"
    ],
    "description": "Get issue security levels",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of issue security scheme level IDs. To include multiple issue security levels, separate IDs with an ampersand: `id=10000&id=10001`.",
      "schemeId": "The list of issue security scheme IDs. To include multiple issue security schemes, separate IDs with an ampersand: `schemeId=10000&schemeId=10001`.",
      "onlyDefault": "When set to true, returns multiple default levels for each security scheme containing a default. If you provide scheme and level IDs not associated with the default, returns an empty page. The default value is false."
    }
  },
  "setDefaultLevels": {
    "accessPath": [
      "setDefaultLevels"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultValues"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/level/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set default issue security levels"
  },
  "getSecurityLevelMembers": {
    "accessPath": [
      "getSecurityLevelMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/level/member",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "schemeId",
      "levelId",
      "expand"
    ],
    "description": "Get issue security level members",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of issue security level member IDs. To include multiple issue security level members separate IDs with an ampersand: `id=10000&id=10001`.",
      "schemeId": "The list of issue security scheme IDs. To include multiple issue security schemes separate IDs with an ampersand: `schemeId=10000&schemeId=10001`.",
      "levelId": "The list of issue security level IDs. To include multiple issue security levels separate IDs with an ampersand: `levelId=10000&levelId=10001`.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information\n *  `field` Returns information about the custom field granted the permission\n *  `group` Returns information about the group that is granted the permission\n *  `projectRole` Returns information about the project role granted the permission\n *  `user` Returns information about the user who is granted the permission"
    }
  },
  "searchProjectsUsingSecuritySchemes": {
    "accessPath": [
      "searchProjectsUsingSecuritySchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "issueSecuritySchemeId",
      "projectId"
    ],
    "description": "Get projects using issue security schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "issueSecuritySchemeId": "The list of security scheme IDs to be filtered out.",
      "projectId": "The list of project IDs to be filtered out."
    }
  },
  "associateSchemesToProjects": {
    "accessPath": [
      "associateSchemesToProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "oldToNewSecurityLevelMappings",
      "projectId",
      "schemeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate security scheme to project"
  },
  "searchSecuritySchemes": {
    "accessPath": [
      "searchSecuritySchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "projectId"
    ],
    "description": "Search issue security schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of issue security scheme IDs. To include multiple issue security scheme IDs, separate IDs with an ampersand: `id=10000&id=10001`.",
      "projectId": "The list of project IDs. To include multiple project IDs, separate IDs with an ampersand: `projectId=10000&projectId=10001`."
    }
  },
  "getIssueSecurityScheme": {
    "accessPath": [
      "getIssueSecurityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue security scheme",
    "parameterDescriptions": {
      "id": "The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of issue security scheme IDs."
    }
  },
  "updateIssueSecurityScheme": {
    "accessPath": [
      "updateIssueSecurityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue security scheme",
    "parameterDescriptions": {
      "id": "The ID of the issue security scheme."
    }
  },
  "getIssueSecurityLevelMembers": {
    "accessPath": [
      "getIssueSecurityLevelMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{issueSecuritySchemeId}/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueSecuritySchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "issueSecurityLevelId",
      "expand"
    ],
    "description": "Get issue security level members by issue security scheme",
    "parameterDescriptions": {
      "issueSecuritySchemeId": "The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) operation to get a list of issue security scheme IDs.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "issueSecurityLevelId": "The list of issue security level IDs. To include multiple issue security levels separate IDs with ampersand: `issueSecurityLevelId=10000&issueSecurityLevelId=10001`.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "deleteSecurityScheme": {
    "accessPath": [
      "deleteSecurityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{schemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue security scheme",
    "parameterDescriptions": {
      "schemeId": "The ID of the issue security scheme."
    }
  },
  "addSecurityLevel": {
    "accessPath": [
      "addSecurityLevel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "levels"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{schemeId}/level",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add issue security levels",
    "parameterDescriptions": {
      "schemeId": "The ID of the issue security scheme."
    }
  },
  "removeLevel": {
    "accessPath": [
      "removeLevel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId",
      "levelId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "replaceWith"
    ],
    "description": "Remove issue security level",
    "parameterDescriptions": {
      "schemeId": "The ID of the issue security scheme.",
      "levelId": "The ID of the issue security level to remove.",
      "replaceWith": "The ID of the issue security level that will replace the currently selected level."
    }
  },
  "updateSecurityLevel": {
    "accessPath": [
      "updateSecurityLevel"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId",
      "levelId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue security level",
    "parameterDescriptions": {
      "schemeId": "The ID of the issue security scheme level belongs to.",
      "levelId": "The ID of the issue security level to update."
    }
  },
  "addSecurityLevelMembers": {
    "accessPath": [
      "addSecurityLevelMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "members"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}/member",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId",
      "levelId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add issue security level members",
    "parameterDescriptions": {
      "schemeId": "The ID of the issue security scheme.",
      "levelId": "The ID of the issue security level."
    }
  },
  "removeMemberFromSecurityLevel": {
    "accessPath": [
      "removeMemberFromSecurityLevel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuesecurityschemes/{schemeId}/level/{levelId}/member/{memberId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId",
      "levelId",
      "memberId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove member from issue security level",
    "parameterDescriptions": {
      "schemeId": "The ID of the issue security scheme.",
      "levelId": "The ID of the issue security level.",
      "memberId": "The ID of the issue security level member to be removed."
    }
  },
  "getIssueAllTypes": {
    "accessPath": [
      "getIssueAllTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetype",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all issue types for user"
  },
  "createIssueType": {
    "accessPath": [
      "createIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "hierarchyLevel",
      "name",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issuetype",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue type"
  },
  "getIssueTypesForProject": {
    "accessPath": [
      "getIssueTypesForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetype/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectId",
      "level"
    ],
    "description": "Get issue types for project",
    "parameterDescriptions": {
      "projectId": "The ID of the project.",
      "level": "The level of the issue type to filter by. Use:\n\n *  `-1` for Subtask.\n *  `0` for Base.\n *  `1` for Epic."
    }
  },
  "deleteIssueType": {
    "accessPath": [
      "deleteIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuetype/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alternativeIssueTypeId"
    ],
    "description": "Delete issue type",
    "parameterDescriptions": {
      "id": "The ID of the issue type.",
      "alternativeIssueTypeId": "The ID of the replacement issue type."
    }
  },
  "getIssueType": {
    "accessPath": [
      "getIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetype/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue type",
    "parameterDescriptions": {
      "id": "The ID of the issue type."
    }
  },
  "updateIssueType": {
    "accessPath": [
      "updateIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "avatarId",
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetype/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue type",
    "parameterDescriptions": {
      "id": "The ID of the issue type."
    }
  },
  "getAlternativeIssueTypes": {
    "accessPath": [
      "getAlternativeIssueTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetype/{id}/alternatives",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get alternative issue types",
    "parameterDescriptions": {
      "id": "The ID of the issue type."
    }
  },
  "createIssueTypeAvatar": {
    "accessPath": [
      "createIssueTypeAvatar"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issuetype/{id}/avatar2",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "x",
      "y",
      "size"
    ],
    "description": "Load issue type avatar",
    "parameterDescriptions": {
      "id": "The ID of the issue type.",
      "x": "The X coordinate of the top-left corner of the crop region.",
      "y": "The Y coordinate of the top-left corner of the crop region.",
      "size": "The length of each side of the crop region."
    }
  },
  "getIssueTypePropertyKeys": {
    "accessPath": [
      "getIssueTypePropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetype/{issueTypeId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue type property keys",
    "parameterDescriptions": {
      "issueTypeId": "The ID of the issue type."
    }
  },
  "deleteIssueTypeProperty": {
    "accessPath": [
      "deleteIssueTypeProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue type property",
    "parameterDescriptions": {
      "issueTypeId": "The ID of the issue type.",
      "propertyKey": "The key of the property. Use [Get issue type property keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of all issue type property keys."
    }
  },
  "getIssueTypeProperty": {
    "accessPath": [
      "getIssueTypeProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue type property",
    "parameterDescriptions": {
      "issueTypeId": "The ID of the issue type.",
      "propertyKey": "The key of the property. Use [Get issue type property keys](#api-rest-api-3-issuetype-issueTypeId-properties-get) to get a list of all issue type property keys."
    }
  },
  "setIssueTypeProperty": {
    "accessPath": [
      "setIssueTypeProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetype/{issueTypeId}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeId",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set issue type property",
    "parameterDescriptions": {
      "issueTypeId": "The ID of the issue type.",
      "propertyKey": "The key of the issue type property. The maximum length is 255 characters."
    }
  },
  "getAllIssueTypeSchemes": {
    "accessPath": [
      "getAllIssueTypeSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "orderBy",
      "expand",
      "queryString"
    ],
    "description": "Get all issue type schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of issue type schemes IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `name` Sorts by issue type scheme name.\n *  `id` Sorts by issue type scheme ID.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `projects` For each issue type schemes, returns information about the projects the issue type scheme is assigned to.\n *  `issueTypes` For each issue type schemes, returns information about the issueTypes the issue type scheme have.",
      "queryString": "String used to perform a case-insensitive partial match with issue type scheme name."
    }
  },
  "createIssueTypeScheme": {
    "accessPath": [
      "createIssueTypeScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultIssueTypeId",
      "description",
      "issueTypeIds",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issuetypescheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue type scheme"
  },
  "getIssueTypeSchemesMapping": {
    "accessPath": [
      "getIssueTypeSchemesMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescheme/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "issueTypeSchemeId"
    ],
    "description": "Get issue type scheme items",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "issueTypeSchemeId": "The list of issue type scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `issueTypeSchemeId=10000&issueTypeSchemeId=10001`."
    }
  },
  "getIssueTypeSchemeForProjects": {
    "accessPath": [
      "getIssueTypeSchemeForProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Get issue type schemes for projects",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "The list of project IDs. To include multiple project IDs, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`."
    }
  },
  "assignIssueTypeSchemeToProject": {
    "accessPath": [
      "assignIssueTypeSchemeToProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeSchemeId",
      "projectId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign issue type scheme to project"
  },
  "deleteIssueTypeScheme": {
    "accessPath": [
      "deleteIssueTypeScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuetypescheme/{issueTypeSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue type scheme",
    "parameterDescriptions": {
      "issueTypeSchemeId": "The ID of the issue type scheme."
    }
  },
  "updateIssueTypeScheme": {
    "accessPath": [
      "updateIssueTypeScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultIssueTypeId",
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescheme/{issueTypeSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue type scheme",
    "parameterDescriptions": {
      "issueTypeSchemeId": "The ID of the issue type scheme."
    }
  },
  "addIssueTypesToIssueTypeScheme": {
    "accessPath": [
      "addIssueTypesToIssueTypeScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add issue types to issue type scheme",
    "parameterDescriptions": {
      "issueTypeSchemeId": "The ID of the issue type scheme."
    }
  },
  "reorderIssueTypesInIssueTypeScheme": {
    "accessPath": [
      "reorderIssueTypesInIssueTypeScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "issueTypeIds",
      "position"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Change order of issue types",
    "parameterDescriptions": {
      "issueTypeSchemeId": "The ID of the issue type scheme."
    }
  },
  "removeIssueTypeFromIssueTypeScheme": {
    "accessPath": [
      "removeIssueTypeFromIssueTypeScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuetypescheme/{issueTypeSchemeId}/issuetype/{issueTypeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeSchemeId",
      "issueTypeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove issue type from issue type scheme",
    "parameterDescriptions": {
      "issueTypeSchemeId": "The ID of the issue type scheme.",
      "issueTypeId": "The ID of the issue type."
    }
  },
  "getIssueTypeScreenSchemes": {
    "accessPath": [
      "getIssueTypeScreenSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "queryString",
      "orderBy",
      "expand"
    ],
    "description": "Get issue type screen schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of issue type screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.",
      "queryString": "String used to perform a case-insensitive partial match with issue type screen scheme name.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `name` Sorts by issue type screen scheme name.\n *  `id` Sorts by issue type screen scheme ID.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts `projects` that, for each issue type screen schemes, returns information about the projects the issue type screen scheme is assigned to."
    }
  },
  "createIssueTypeScreenScheme": {
    "accessPath": [
      "createIssueTypeScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "issueTypeMappings",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create issue type screen scheme"
  },
  "getIssueTypeScreenSchemeMappings": {
    "accessPath": [
      "getIssueTypeScreenSchemeMappings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "issueTypeScreenSchemeId"
    ],
    "description": "Get issue type screen scheme items",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "issueTypeScreenSchemeId": "The list of issue type screen scheme IDs. To include multiple issue type screen schemes, separate IDs with ampersand: `issueTypeScreenSchemeId=10000&issueTypeScreenSchemeId=10001`."
    }
  },
  "getIssueTypeScreenSchemeProjectAssociations": {
    "accessPath": [
      "getIssueTypeScreenSchemeProjectAssociations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId"
    ],
    "description": "Get issue type screen schemes for projects",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`."
    }
  },
  "assignIssueTypeScreenSchemeToProject": {
    "accessPath": [
      "assignIssueTypeScreenSchemeToProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeScreenSchemeId",
      "projectId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign issue type screen scheme to project"
  },
  "deleteIssueTypeScreenScheme": {
    "accessPath": [
      "deleteIssueTypeScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeScreenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete issue type screen scheme",
    "parameterDescriptions": {
      "issueTypeScreenSchemeId": "The ID of the issue type screen scheme."
    }
  },
  "updateIssueTypeScreenScheme": {
    "accessPath": [
      "updateIssueTypeScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeScreenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue type screen scheme",
    "parameterDescriptions": {
      "issueTypeScreenSchemeId": "The ID of the issue type screen scheme."
    }
  },
  "appendMappingsForIssueTypeScreenScheme": {
    "accessPath": [
      "appendMappingsForIssueTypeScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeMappings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeScreenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Append mappings to issue type screen scheme",
    "parameterDescriptions": {
      "issueTypeScreenSchemeId": "The ID of the issue type screen scheme."
    }
  },
  "updateDefaultScreenScheme": {
    "accessPath": [
      "updateDefaultScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "screenSchemeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeScreenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update issue type screen scheme default screen scheme",
    "parameterDescriptions": {
      "issueTypeScreenSchemeId": "The ID of the issue type screen scheme."
    }
  },
  "removeMappingsFromIssueTypeScreenScheme": {
    "accessPath": [
      "removeMappingsFromIssueTypeScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeScreenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove mappings from issue type screen scheme",
    "parameterDescriptions": {
      "issueTypeScreenSchemeId": "The ID of the issue type screen scheme."
    }
  },
  "getProjectsForIssueTypeScreenScheme": {
    "accessPath": [
      "getProjectsForIssueTypeScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/issuetypescreenscheme/{issueTypeScreenSchemeId}/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issueTypeScreenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "query"
    ],
    "description": "Get issue type screen scheme projects",
    "parameterDescriptions": {
      "issueTypeScreenSchemeId": "The ID of the issue type screen scheme.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getAutoComplete": {
    "accessPath": [
      "getAutoComplete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/jql/autocompletedata",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get field reference data (GET)"
  },
  "getAutoCompletePost": {
    "accessPath": [
      "getAutoCompletePost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "includeCollapsedFields",
      "projectIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/autocompletedata",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get field reference data (POST)"
  },
  "getFieldAutoCompleteForQueryString": {
    "accessPath": [
      "getFieldAutoCompleteForQueryString"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/jql/autocompletedata/suggestions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "fieldName",
      "fieldValue",
      "predicateName",
      "predicateValue"
    ],
    "description": "Get field auto complete suggestions",
    "parameterDescriptions": {
      "fieldName": "The name of the field.",
      "fieldValue": "The partial field item name entered by the user.",
      "predicateName": "The name of the [ CHANGED operator predicate](https://confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which the suggestions are generated. The valid predicate operators are *by*, *from*, and *to*.",
      "predicateValue": "The partial predicate item name entered by the user."
    }
  },
  "getPrecomputations": {
    "accessPath": [
      "getPrecomputations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/jql/function/computation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "functionKey",
      "startAt",
      "maxResults",
      "orderBy"
    ],
    "description": "Get precomputations (apps)",
    "parameterDescriptions": {
      "functionKey": "The function key in format:\n\n *  Forge: `ari:cloud:ecosystem::extension/[App ID]/[Environment ID]/static/[Function key from manifest]`\n *  Connect: `[App key]__[Module key]`",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `functionKey` Sorts by the functionKey.\n *  `used` Sorts by the used timestamp.\n *  `created` Sorts by the created timestamp.\n *  `updated` Sorts by the updated timestamp."
    }
  },
  "updatePrecomputations": {
    "accessPath": [
      "updatePrecomputations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "values"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/function/computation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "skipNotFoundPrecomputations"
    ],
    "description": "Update precomputations (apps)"
  },
  "getPrecomputationsByID": {
    "accessPath": [
      "getPrecomputationsById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "precomputationIDs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/function/computation/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "orderBy"
    ],
    "description": "Get precomputations by ID (apps)",
    "parameterDescriptions": {
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `functionKey` Sorts by the functionKey.\n *  `used` Sorts by the used timestamp.\n *  `created` Sorts by the created timestamp.\n *  `updated` Sorts by the updated timestamp."
    }
  },
  "matchIssues": {
    "accessPath": [
      "matchIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueIds",
      "jqls"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/match",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Check issues against JQL"
  },
  "parseJqlQueries": {
    "accessPath": [
      "parseJqlQueries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "queries"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/parse",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "validation"
    ],
    "description": "Parse JQL query",
    "parameterDescriptions": {
      "validation": "How to validate the JQL query and treat the validation results. Validation options include:\n\n *  `strict` Returns all errors. If validation fails, the query structure is not returned.\n *  `warn` Returns all errors. If validation fails but the JQL query is correctly formed, the query structure is returned.\n *  `none` No validation is performed. If JQL query is correctly formed, the query structure is returned."
    }
  },
  "migrateQueries": {
    "accessPath": [
      "migrateQueries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "queryStrings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/pdcleaner",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Convert user identifiers to account IDs in JQL queries"
  },
  "sanitiseJqlQueries": {
    "accessPath": [
      "sanitiseJqlQueries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "queries"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/jql/sanitize",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Sanitize JQL queries"
  },
  "getAllLabels": {
    "accessPath": [
      "getAllLabels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/label",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get all labels",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getApproximateLicenseCount": {
    "accessPath": [
      "getApproximateLicenseCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/license/approximateLicenseCount",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get approximate license count"
  },
  "getApproximateApplicationLicenseCount": {
    "accessPath": [
      "getApproximateApplicationLicenseCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/license/approximateLicenseCount/product/{applicationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get approximate application license count",
    "parameterDescriptions": {
      "applicationKey": "The ID of the application, represents a specific version of Jira."
    }
  },
  "getMyPermissions": {
    "accessPath": [
      "getMyPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/mypermissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "projectId",
      "issueKey",
      "issueId",
      "permissions",
      "projectUuid",
      "projectConfigurationUuid",
      "commentId"
    ],
    "description": "Get my permissions",
    "parameterDescriptions": {
      "projectKey": "The key of project. Ignored if `projectId` is provided.",
      "projectId": "The ID of project.",
      "issueKey": "The key of the issue. Ignored if `issueId` is provided.",
      "issueId": "The ID of the issue.",
      "permissions": "A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available permissions, use [Get all permissions](#api-rest-api-3-permissions-get).",
      "commentId": "The ID of the comment."
    }
  },
  "removePreference": {
    "accessPath": [
      "removePreference"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/mypreferences",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key"
    ],
    "description": "Delete preference",
    "parameterDescriptions": {
      "key": "The key of the preference."
    }
  },
  "getPreference": {
    "accessPath": [
      "getPreference"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/mypreferences",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key"
    ],
    "description": "Get preference",
    "parameterDescriptions": {
      "key": "The key of the preference."
    }
  },
  "setPreference": {
    "accessPath": [
      "setPreference"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/mypreferences",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key"
    ],
    "description": "Set preference",
    "parameterDescriptions": {
      "key": "The key of the preference. The maximum length is 255 characters."
    }
  },
  "getLocale": {
    "accessPath": [
      "getLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/mypreferences/locale",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get locale"
  },
  "setLocale": {
    "accessPath": [
      "setLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "locale"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/mypreferences/locale",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set locale"
  },
  "getCurrentUser": {
    "accessPath": [
      "getCurrentUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/myself",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get current user",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information about user in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `groups` Returns all groups, including nested groups, the user belongs to.\n *  `applicationRoles` Returns the application roles the user is assigned to."
    }
  },
  "getNotificationSchemes": {
    "accessPath": [
      "getNotificationSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/notificationscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "projectId",
      "onlyDefault",
      "expand"
    ],
    "description": "Get notification schemes paginated",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of notification schemes IDs to be filtered by",
      "projectId": "The list of projects IDs to be filtered by",
      "onlyDefault": "When set to true, returns only the default notification scheme. If you provide project IDs not associated with the default, returns an empty page. The default value is false.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information\n *  `field` Returns information about any custom fields assigned to receive an event\n *  `group` Returns information about any groups assigned to receive an event\n *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information\n *  `projectRole` Returns information about any project roles assigned to receive an event\n *  `user` Returns information about any users assigned to receive an event"
    }
  },
  "createNotificationScheme": {
    "accessPath": [
      "createNotificationScheme"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name",
      "notificationSchemeEvents"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/notificationscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create notification scheme"
  },
  "getNotificationSchemeToProjectMappings": {
    "accessPath": [
      "getNotificationSchemeToProjectMappings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/notificationscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "notificationSchemeId",
      "projectId"
    ],
    "description": "Get projects using notification schemes paginated",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "notificationSchemeId": "The list of notifications scheme IDs to be filtered out",
      "projectId": "The list of project IDs to be filtered out"
    }
  },
  "getNotificationScheme": {
    "accessPath": [
      "getNotificationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/notificationscheme/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get notification scheme",
    "parameterDescriptions": {
      "id": "The ID of the notification scheme. Use [Get notification schemes paginated](#api-rest-api-3-notificationscheme-get) to get a list of notification scheme IDs.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information\n *  `field` Returns information about any custom fields assigned to receive an event\n *  `group` Returns information about any groups assigned to receive an event\n *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information\n *  `projectRole` Returns information about any project roles assigned to receive an event\n *  `user` Returns information about any users assigned to receive an event"
    }
  },
  "updateNotificationScheme": {
    "accessPath": [
      "updateNotificationScheme"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/notificationscheme/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update notification scheme",
    "parameterDescriptions": {
      "id": "The ID of the notification scheme."
    }
  },
  "addNotifications": {
    "accessPath": [
      "addNotifications"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "notificationSchemeEvents"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/notificationscheme/{id}/notification",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add notifications to notification scheme",
    "parameterDescriptions": {
      "id": "The ID of the notification scheme."
    }
  },
  "deleteNotificationScheme": {
    "accessPath": [
      "deleteNotificationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/notificationscheme/{notificationSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "notificationSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete notification scheme",
    "parameterDescriptions": {
      "notificationSchemeId": "The ID of the notification scheme."
    }
  },
  "removeNotificationFromNotificationScheme": {
    "accessPath": [
      "removeNotificationFromNotificationScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/notificationscheme/{notificationSchemeId}/notification/{notificationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "notificationSchemeId",
      "notificationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove notification from notification scheme",
    "parameterDescriptions": {
      "notificationSchemeId": "The ID of the notification scheme.",
      "notificationId": "The ID of the notification."
    }
  },
  "getAllPermissions": {
    "accessPath": [
      "getAllPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all permissions"
  },
  "getBulkPermissions": {
    "accessPath": [
      "getBulkPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accountId",
      "globalPermissions",
      "projectPermissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/permissions/check",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get bulk permissions"
  },
  "getPermittedProjects": {
    "accessPath": [
      "getPermittedProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "permissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/permissions/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get permitted projects"
  },
  "getAllPermissionSchemes": {
    "accessPath": [
      "getAllPermissionSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/permissionscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get all permission schemes",
    "parameterDescriptions": {
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "createPermissionScheme": {
    "accessPath": [
      "createPermissionScheme"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "expand",
      "id",
      "name",
      "permissions",
      "scope",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/permissionscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [
      "expand"
    ],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Create permission scheme",
    "parameterDescriptions": {
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "deletePermissionScheme": {
    "accessPath": [
      "deletePermissionScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete permission scheme",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme being deleted."
    }
  },
  "getPermissionScheme": {
    "accessPath": [
      "getPermissionScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get permission scheme",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme to return.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "updatePermissionScheme": {
    "accessPath": [
      "updatePermissionScheme"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "expand",
      "id",
      "name",
      "permissions",
      "scope",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [
      "expand"
    ],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Update permission scheme",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme to update.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "getPermissionSchemeGrants": {
    "accessPath": [
      "getPermissionSchemeGrants"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}/permission",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get permission scheme grants",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:\n\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `user` Returns information about the user who is granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `field` Returns information about the custom field granted the permission.\n *  `all` Returns all expandable information."
    }
  },
  "createPermissionGrant": {
    "accessPath": [
      "createPermissionGrant"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "holder",
      "id",
      "permission",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}/permission",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Create permission grant",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme in which to create a new permission grant.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:\n\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `user` Returns information about the user who is granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `field` Returns information about the custom field granted the permission.\n *  `all` Returns all expandable information."
    }
  },
  "deletePermissionSchemeEntity": {
    "accessPath": [
      "deletePermissionSchemeEntity"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete permission scheme grant",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme to delete the permission grant from.",
      "permissionId": "The ID of the permission grant to delete."
    }
  },
  "getPermissionSchemeGrant": {
    "accessPath": [
      "getPermissionSchemeGrant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/permissionscheme/{schemeId}/permission/{permissionId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId",
      "permissionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get permission scheme grant",
    "parameterDescriptions": {
      "schemeId": "The ID of the permission scheme.",
      "permissionId": "The ID of the permission grant.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "getPlans": {
    "accessPath": [
      "getPlans"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/plans/plan",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "includeTrashed",
      "includeArchived",
      "cursor",
      "maxResults"
    ],
    "description": "Get plans paginated",
    "parameterDescriptions": {
      "includeTrashed": "Whether to include trashed plans in the results.",
      "includeArchived": "Whether to include archived plans in the results.",
      "cursor": "The cursor to start from. If not provided, the first page will be returned.",
      "maxResults": "The maximum number of plans to return per page. The maximum value is 50. The default value is 50."
    }
  },
  "createPlan": {
    "accessPath": [
      "createPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "crossProjectReleases",
      "customFields",
      "exclusionRules",
      "issueSources",
      "leadAccountId",
      "name",
      "permissions",
      "scheduling"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/plans/plan",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "useGroupId"
    ],
    "description": "Create plan",
    "parameterDescriptions": {
      "useGroupId": "Whether to accept group IDs instead of group names. Group names are deprecated."
    }
  },
  "getPlan": {
    "accessPath": [
      "getPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "useGroupId"
    ],
    "description": "Get plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "useGroupId": "Whether to return group IDs instead of group names. Group names are deprecated."
    }
  },
  "updatePlan": {
    "accessPath": [
      "updatePlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "useGroupId"
    ],
    "description": "Update plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "useGroupId": "Whether to accept group IDs instead of group names. Group names are deprecated."
    }
  },
  "archivePlan": {
    "accessPath": [
      "archivePlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan."
    }
  },
  "duplicatePlan": {
    "accessPath": [
      "duplicatePlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/duplicate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan."
    }
  },
  "getTeams": {
    "accessPath": [
      "getTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "maxResults"
    ],
    "description": "Get teams in plan paginated",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "cursor": "The cursor to start from. If not provided, the first page will be returned.",
      "maxResults": "The maximum number of plan teams to return per page. The maximum value is 50. The default value is 50."
    }
  },
  "addAtlassianTeam": {
    "accessPath": [
      "addAtlassianTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "capacity",
      "id",
      "issueSourceId",
      "planningStyle",
      "sprintLength"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/atlassian",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Atlassian team to plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan."
    }
  },
  "removeAtlassianTeam": {
    "accessPath": [
      "removeAtlassianTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId",
      "atlassianTeamId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove Atlassian team from plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "atlassianTeamId": "The ID of the Atlassian team."
    }
  },
  "getAtlassianTeam": {
    "accessPath": [
      "getAtlassianTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId",
      "atlassianTeamId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Atlassian team in plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "atlassianTeamId": "The ID of the Atlassian team."
    }
  },
  "updateAtlassianTeam": {
    "accessPath": [
      "updateAtlassianTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId",
      "atlassianTeamId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Atlassian team in plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "atlassianTeamId": "The ID of the Atlassian team."
    }
  },
  "createPlanOnlyTeam": {
    "accessPath": [
      "createPlanOnlyTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "capacity",
      "issueSourceId",
      "memberAccountIds",
      "name",
      "planningStyle",
      "sprintLength"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/planonly",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create plan-only team",
    "parameterDescriptions": {
      "planId": "The ID of the plan."
    }
  },
  "deletePlanOnlyTeam": {
    "accessPath": [
      "deletePlanOnlyTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId",
      "planOnlyTeamId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete plan-only team",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "planOnlyTeamId": "The ID of the plan-only team."
    }
  },
  "getPlanOnlyTeam": {
    "accessPath": [
      "getPlanOnlyTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId",
      "planOnlyTeamId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get plan-only team",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "planOnlyTeamId": "The ID of the plan-only team."
    }
  },
  "updatePlanOnlyTeam": {
    "accessPath": [
      "updatePlanOnlyTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId",
      "planOnlyTeamId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update plan-only team",
    "parameterDescriptions": {
      "planId": "The ID of the plan.",
      "planOnlyTeamId": "The ID of the plan-only team."
    }
  },
  "trashPlan": {
    "accessPath": [
      "trashPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/plans/plan/{planId}/trash",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "planId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trash plan",
    "parameterDescriptions": {
      "planId": "The ID of the plan."
    }
  },
  "getPriorities": {
    "accessPath": [
      "getPriorities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priority",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get priorities"
  },
  "createPriority": {
    "accessPath": [
      "createPriority"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "avatarId",
      "description",
      "iconUrl",
      "name",
      "statusColor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/priority",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create priority"
  },
  "setDefaultPriority": {
    "accessPath": [
      "setDefaultPriority"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/priority/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set default priority"
  },
  "movePriorities": {
    "accessPath": [
      "movePriorities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "ids",
      "position"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/priority/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move priorities"
  },
  "searchPriorities": {
    "accessPath": [
      "searchPriorities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priority/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "projectId",
      "priorityName",
      "onlyDefault",
      "expand"
    ],
    "description": "Search priorities",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`.",
      "projectId": "The list of projects IDs. To include multiple IDs, provide an ampersand-separated list. For example, `projectId=10010&projectId=10111`.",
      "priorityName": "The name of priority to search for.",
      "onlyDefault": "Whether only the default priority is returned.",
      "expand": "Use `schemes` to return the associated priority schemes for each priority. Limited to returning first 15 priority schemes per priority."
    }
  },
  "deletePriority": {
    "accessPath": [
      "deletePriority"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/priority/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete priority",
    "parameterDescriptions": {
      "id": "The ID of the issue priority."
    }
  },
  "getPriority": {
    "accessPath": [
      "getPriority"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priority/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get priority",
    "parameterDescriptions": {
      "id": "The ID of the issue priority."
    }
  },
  "updatePriority": {
    "accessPath": [
      "updatePriority"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "avatarId",
      "description",
      "iconUrl",
      "name",
      "statusColor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/priority/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update priority",
    "parameterDescriptions": {
      "id": "The ID of the issue priority."
    }
  },
  "getPrioritySchemes": {
    "accessPath": [
      "getPrioritySchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priorityscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "priorityId",
      "schemeId",
      "schemeName",
      "onlyDefault",
      "orderBy",
      "expand"
    ],
    "description": "Get priority schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "priorityId": "A set of priority IDs to filter by. To include multiple IDs, provide an ampersand-separated list. For example, `priorityId=10000&priorityId=10001`.",
      "schemeId": "A set of priority scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `schemeId=10000&schemeId=10001`.",
      "schemeName": "The name of scheme to search for.",
      "onlyDefault": "Whether only the default priority is returned.",
      "orderBy": "The ordering to return the priority schemes by.",
      "expand": "A comma separated list of additional information to return. \"priorities\" will return priorities associated with the priority scheme. \"projects\" will return projects associated with the priority scheme. `expand=priorities,projects`."
    }
  },
  "createPriorityScheme": {
    "accessPath": [
      "createPriorityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultPriorityId",
      "description",
      "mappings",
      "name",
      "priorityIds",
      "projectIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/priorityscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create priority scheme"
  },
  "suggestedPrioritiesForMappings": {
    "accessPath": [
      "suggestedPrioritiesForMappings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "maxResults",
      "priorities",
      "projects",
      "schemeId",
      "startAt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/priorityscheme/mappings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Suggested priorities for mappings"
  },
  "getAvailablePrioritiesByPriorityScheme": {
    "accessPath": [
      "getAvailablePrioritiesByPriorityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priorityscheme/priorities/available",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "query",
      "schemeId",
      "exclude"
    ],
    "description": "Get available priorities by priority scheme",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "query": "The string to query priorities on by name.",
      "schemeId": "The priority scheme ID.",
      "exclude": "A list of priority IDs to exclude from the results."
    }
  },
  "deletePriorityScheme": {
    "accessPath": [
      "deletePriorityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/priorityscheme/{schemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete priority scheme",
    "parameterDescriptions": {
      "schemeId": "The priority scheme ID."
    }
  },
  "updatePriorityScheme": {
    "accessPath": [
      "updatePriorityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultPriorityId",
      "description",
      "mappings",
      "name",
      "priorities",
      "projects"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/priorityscheme/{schemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update priority scheme",
    "parameterDescriptions": {
      "schemeId": "The ID of the priority scheme."
    }
  },
  "getPrioritiesByPriorityScheme": {
    "accessPath": [
      "getPrioritiesByPriorityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priorityscheme/{schemeId}/priorities",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get priorities by priority scheme",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "schemeId": "The priority scheme ID."
    }
  },
  "getProjectsByPriorityScheme": {
    "accessPath": [
      "getProjectsByPriorityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/priorityscheme/{schemeId}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId",
      "query"
    ],
    "description": "Get projects by priority scheme",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "The project IDs to filter by. For example, `projectId=10000&projectId=10001`.",
      "schemeId": "The priority scheme ID.",
      "query": "The string to query projects on by name."
    }
  },
  "getAllProjects": {
    "accessPath": [
      "getAllProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "recent",
      "properties"
    ],
    "description": "Get all projects",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:\n\n *  `description` Returns the project description.\n *  `issueTypes` Returns all issue types associated with the project.\n *  `lead` Returns information about the project lead.\n *  `projectKeys` Returns all project keys associated with the project.",
      "recent": "Returns the user's most recently accessed projects. You may specify the number of results to return up to a maximum of 20. If access is anonymous, then the recently accessed projects are based on the current HTTP session.",
      "properties": "A list of project properties to return for the project. This parameter accepts a comma-separated list."
    }
  },
  "createProject": {
    "accessPath": [
      "createProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assigneeType",
      "avatarId",
      "categoryId",
      "description",
      "fieldConfigurationScheme",
      "fieldScheme",
      "issueSecurityScheme",
      "issueTypeScheme",
      "issueTypeScreenScheme",
      "key",
      "lead",
      "leadAccountId",
      "name",
      "notificationScheme",
      "permissionScheme",
      "projectTemplateKey",
      "projectTypeKey",
      "url",
      "workflowScheme"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create project"
  },
  "createProjectWithCustomTemplate": {
    "accessPath": [
      "createProjectWithCustomTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "details",
      "template"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project-template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create custom project"
  },
  "editTemplate": {
    "accessPath": [
      "editTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "templateDescription",
      "templateGenerationOptions",
      "templateKey",
      "templateName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project-template/edit-template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit a custom project template"
  },
  "liveTemplate": {
    "accessPath": [
      "liveTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project-template/live-template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectId",
      "templateKey"
    ],
    "description": "Gets a custom project template",
    "parameterDescriptions": {
      "projectId": "optional - The \\{@link String\\} containing the project key linked to the custom template to retrieve",
      "templateKey": "optional - The \\{@link String\\} containing the key of the custom template to retrieve"
    }
  },
  "removeTemplate": {
    "accessPath": [
      "removeTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/project-template/remove-template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "templateKey"
    ],
    "description": "Deletes a custom project template",
    "parameterDescriptions": {
      "templateKey": "The \\{@link String\\} containing the key of the custom template to remove"
    }
  },
  "saveTemplate": {
    "accessPath": [
      "saveTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "templateDescription",
      "templateFromProjectRequest",
      "templateName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project-template/save-template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Save a custom project template"
  },
  "getRecent": {
    "accessPath": [
      "getRecent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/recent",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "properties"
    ],
    "description": "Get recent projects",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:\n\n *  `description` Returns the project description.\n *  `projectKeys` Returns all project keys associated with a project.\n *  `lead` Returns information about the project lead.\n *  `issueTypes` Returns all issue types associated with the project.\n *  `url` Returns the URL associated with the project.\n *  `permissions` Returns the permissions associated with the project.\n *  `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project.\n *  `*` Returns the project with all available expand options.",
      "properties": "EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list. Invalid property names are ignored."
    }
  },
  "searchProjects": {
    "accessPath": [
      "searchProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "orderBy",
      "id",
      "keys",
      "query",
      "typeKey",
      "categoryId",
      "action",
      "expand",
      "status",
      "properties",
      "propertyQuery"
    ],
    "description": "Get projects paginated",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page. Must be less than or equal to 100. If a value greater than 100 is provided, the `maxResults` parameter will default to 100.",
      "orderBy": "[Order](#ordering) the results by a field.\n\n *  `category` Sorts by project category. A complete list of category IDs is found using [Get all project categories](#api-rest-api-3-projectCategory-get).\n *  `issueCount` Sorts by the total number of issues in each project.\n *  `key` Sorts by project key.\n *  `lastIssueUpdatedTime` Sorts by the last issue update time.\n *  `name` Sorts by project name.\n *  `owner` Sorts by project lead.\n *  `archivedDate` EXPERIMENTAL. Sorts by project archived date.\n *  `deletedDate` EXPERIMENTAL. Sorts by project deleted date.",
      "id": "The project IDs to filter the results by. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Up to 50 project IDs can be provided.",
      "keys": "The project keys to filter the results by. To include multiple keys, provide an ampersand-separated list. For example, `keys=PA&keys=PB`. Up to 50 project keys can be provided.",
      "query": "Filter the results using a literal string. Projects with a matching `key` or `name` are returned (case insensitive).",
      "typeKey": "Orders results by the [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes). This parameter accepts a comma-separated list. Valid values are `business`, `service_desk`, and `software`.",
      "categoryId": "The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation.",
      "action": "Filter results by projects for which the user can:\n\n *  `view` the project, meaning that they have one of the following permissions:\n    \n     *  *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n     *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n     *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  `browse` the project, meaning that they have the *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n *  `edit` the project, meaning that they have one of the following permissions:\n    \n     *  *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.\n     *  *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).\n *  `create` the project, meaning that they have the *Create issues* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the issue is created.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expanded options include:\n\n *  `description` Returns the project description.\n *  `projectKeys` Returns all project keys associated with a project.\n *  `lead` Returns information about the project lead.\n *  `issueTypes` Returns all issue types associated with the project.\n *  `url` Returns the URL associated with the project.\n *  `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the project.",
      "status": "EXPERIMENTAL. Filter results by project status:\n\n *  `live` Search live projects.\n *  `archived` Search archived projects.\n *  `deleted` Search deleted projects, those in the recycle bin.",
      "properties": "EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list.",
      "propertyQuery": "EXPERIMENTAL. A query string used to search properties. The query string cannot be specified using a JSON object. For example, to search for the value of `nested` from `{\"something\":{\"nested\":1,\"other\":2}}` use `[thepropertykey].something.nested=1`. Note that the propertyQuery key is enclosed in square brackets to enable searching where the propertyQuery key includes dot (.) or equals (=) characters. Note that `thepropertykey` is only returned when included in `properties`."
    }
  },
  "getAllProjectTypes": {
    "accessPath": [
      "getAllProjectTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/type",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all project types"
  },
  "getAllAccessibleProjectTypes": {
    "accessPath": [
      "getAllAccessibleProjectTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/type/accessible",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get licensed project types"
  },
  "getProjectTypeByKey": {
    "accessPath": [
      "getProjectTypeByKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/type/{projectTypeKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectTypeKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project type by key",
    "parameterDescriptions": {
      "projectTypeKey": "The key of the project type."
    }
  },
  "getAccessibleProjectTypeByKey": {
    "accessPath": [
      "getAccessibleProjectTypeByKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/type/{projectTypeKey}/accessible",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectTypeKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get accessible project type by key",
    "parameterDescriptions": {
      "projectTypeKey": "The key of the project type."
    }
  },
  "deleteProject": {
    "accessPath": [
      "deleteProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enableUndo"
    ],
    "description": "Delete project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "enableUndo": "Whether this project is placed in the Jira recycle bin where it will be available for restoration."
    }
  },
  "getProject": {
    "accessPath": [
      "getProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "properties"
    ],
    "description": "Get project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:\n\n *  `description` The project description.\n *  `issueTypes` The issue types associated with the project.\n *  `lead` The project lead.\n *  `projectKeys` All project keys associated with the project.\n *  `issueTypeHierarchy` The project issue type hierarchy.",
      "properties": "A list of project properties to return for the project. This parameter accepts a comma-separated list."
    }
  },
  "updateProject": {
    "accessPath": [
      "updateProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assigneeType",
      "avatarId",
      "categoryId",
      "description",
      "issueSecurityScheme",
      "key",
      "lead",
      "leadAccountId",
      "name",
      "notificationScheme",
      "permissionScheme",
      "releasedProjectKeys",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Update project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:\n\n *  `description` The project description.\n *  `issueTypes` The issue types associated with the project.\n *  `lead` The project lead.\n *  `projectKeys` All project keys associated with the project."
    }
  },
  "archiveProject": {
    "accessPath": [
      "archiveProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive)."
    }
  },
  "updateProjectAvatar": {
    "accessPath": [
      "updateProjectAvatar"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fileName",
      "id",
      "isDeletable",
      "isSelected",
      "isSystemAvatar",
      "owner",
      "urls"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/avatar",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set project avatar",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or (case-sensitive) key of the project."
    }
  },
  "deleteProjectAvatar": {
    "accessPath": [
      "deleteProjectAvatar"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/avatar/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete project avatar",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or (case-sensitive) key.",
      "id": "The ID of the avatar."
    }
  },
  "createProjectAvatar": {
    "accessPath": [
      "createProjectAvatar"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/avatar2",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "x",
      "y",
      "size"
    ],
    "description": "Load project avatar",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or (case-sensitive) key of the project.",
      "x": "The X coordinate of the top-left corner of the crop region.",
      "y": "The Y coordinate of the top-left corner of the crop region.",
      "size": "The length of each side of the crop region."
    }
  },
  "getAllProjectAvatars": {
    "accessPath": [
      "getAllProjectAvatars"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/avatars",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all project avatars",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or (case-sensitive) key of the project."
    }
  },
  "getProjectClassificationConfig": {
    "accessPath": [
      "getProjectClassificationConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/classification-config",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get the classification configuration for a project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case-sensitive)."
    }
  },
  "removeDefaultProjectClassification": {
    "accessPath": [
      "removeDefaultProjectClassification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/classification-level/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove the default data classification level from a project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case-sensitive)."
    }
  },
  "getDefaultProjectClassification": {
    "accessPath": [
      "getDefaultProjectClassification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/classification-level/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get the default data classification level of a project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case-sensitive)."
    }
  },
  "updateDefaultProjectClassification": {
    "accessPath": [
      "updateDefaultProjectClassification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/classification-level/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the default data classification level of a project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case-sensitive)."
    }
  },
  "getProjectComponentsPaginated": {
    "accessPath": [
      "getProjectComponentsPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/component",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "orderBy",
      "componentSource",
      "query"
    ],
    "description": "Get project components paginated",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `description` Sorts by the component description.\n *  `issueCount` Sorts by the count of issues associated with the component.\n *  `lead` Sorts by the user key of the component's project lead.\n *  `name` Sorts by component name.",
      "componentSource": "The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`.",
      "query": "Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive)."
    }
  },
  "getProjectComponents": {
    "accessPath": [
      "getProjectComponents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/components",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "componentSource"
    ],
    "description": "Get project components",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "componentSource": "The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`."
    }
  },
  "deleteProjectAsynchronously": {
    "accessPath": [
      "deleteProjectAsynchronously"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete project asynchronously",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive)."
    }
  },
  "getFeaturesForProject": {
    "accessPath": [
      "getFeaturesForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project features",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or (case-sensitive) key of the project."
    }
  },
  "toggleFeatureForProject": {
    "accessPath": [
      "toggleFeatureForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "state"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/features/{featureKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "featureKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set project feature state",
    "parameterDescriptions": {
      "projectIdOrKey": "The ID or (case-sensitive) key of the project.",
      "featureKey": "The key of the feature."
    }
  },
  "getProjectPropertyKeys": {
    "accessPath": [
      "getProjectPropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project property keys",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive)."
    }
  },
  "deleteProjectProperty": {
    "accessPath": [
      "deleteProjectProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete project property",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "propertyKey": "The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of all project property keys."
    }
  },
  "getProjectProperty": {
    "accessPath": [
      "getProjectProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project property",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "propertyKey": "The project property key. Use [Get project property keys](#api-rest-api-3-project-projectIdOrKey-properties-get) to get a list of all project property keys."
    }
  },
  "setProjectProperty": {
    "accessPath": [
      "setProjectProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set project property",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "propertyKey": "The key of the project property. The maximum length is 255 characters."
    }
  },
  "restore": {
    "accessPath": [
      "restore"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/restore",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Restore deleted or archived project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive)."
    }
  },
  "getProjectRoles": {
    "accessPath": [
      "getProjectRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/role",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project roles for project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive)."
    }
  },
  "deleteActor": {
    "accessPath": [
      "deleteActor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user",
      "group",
      "groupId"
    ],
    "description": "Delete actors from project role",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs.",
      "user": "The user account ID of the user to remove from the project role.",
      "group": "The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended.",
      "groupId": "The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter."
    }
  },
  "getProjectRole": {
    "accessPath": [
      "getProjectRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "excludeInactiveUsers"
    ],
    "description": "Get project role for project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs.",
      "excludeInactiveUsers": "Exclude inactive users."
    }
  },
  "addActorUsers": {
    "accessPath": [
      "addActorUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "group",
      "groupId",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add actors to project role",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "setActors": {
    "accessPath": [
      "setActors"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "categorisedActors",
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/role/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "projectIdOrKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set actors for project role",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "getProjectRoleDetails": {
    "accessPath": [
      "getProjectRoleDetails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/roledetails",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "currentMember",
      "excludeConnectAddons",
      "excludeOtherServiceRoles"
    ],
    "description": "Get project role details",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "currentMember": "Whether the roles should be filtered to include only those the user is assigned to.",
      "excludeOtherServiceRoles": "Do not return the default JSM company-managed space from CSM spaces, or the default CSM roles from JSM spaces."
    }
  },
  "getAllStatuses": {
    "accessPath": [
      "getAllStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all statuses for project",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive)."
    }
  },
  "getProjectVersionsPaginated": {
    "accessPath": [
      "getProjectVersionsPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/version",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "orderBy",
      "query",
      "status",
      "expand"
    ],
    "description": "Get project versions paginated",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `description` Sorts by version description.\n *  `name` Sorts by version name.\n *  `releaseDate` Sorts by release date, starting with the oldest date. Versions with no release date are listed last.\n *  `sequence` Sorts by the order of appearance in the user interface.\n *  `startDate` Sorts by start date, starting with the oldest date. Versions with no start date are listed last.",
      "query": "Filter the results using a literal string. Versions with matching `name` or `description` are returned (case insensitive).",
      "status": "A list of status values used to filter the results by version status. This parameter accepts a comma-separated list. The status values are `released`, `unreleased`, and `archived`.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `issuesstatus` Returns the number of issues in each status category for each version.\n *  `operations` Returns actions that can be performed on the specified version.\n *  `driver` Returns the Atlassian account ID of the version driver.\n *  `approvers` Returns a list containing the approvers for this version."
    }
  },
  "getProjectVersions": {
    "accessPath": [
      "getProjectVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectIdOrKey}/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectIdOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get project versions",
    "parameterDescriptions": {
      "projectIdOrKey": "The project ID or project key (case sensitive).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts `operations`, which returns actions that can be performed on the version."
    }
  },
  "getProjectEmail": {
    "accessPath": [
      "getProjectEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectId}/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project's sender email",
    "parameterDescriptions": {
      "projectId": "The project ID."
    }
  },
  "updateProjectEmail": {
    "accessPath": [
      "updateProjectEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "emailAddress",
      "emailAddressStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectId}/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set project's sender email",
    "parameterDescriptions": {
      "projectId": "The project ID."
    }
  },
  "getHierarchy": {
    "accessPath": [
      "getHierarchy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectId}/hierarchy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project issue type hierarchy",
    "parameterDescriptions": {
      "projectId": "The ID of the project."
    }
  },
  "getProjectIssueSecurityScheme": {
    "accessPath": [
      "getProjectIssueSecurityScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectKeyOrId}/issuesecuritylevelscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKeyOrId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project issue security scheme",
    "parameterDescriptions": {
      "projectKeyOrId": "The project ID or project key (case sensitive)."
    }
  },
  "getNotificationSchemeForProject": {
    "accessPath": [
      "getNotificationSchemeForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectKeyOrId}/notificationscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKeyOrId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get project notification scheme",
    "parameterDescriptions": {
      "projectKeyOrId": "The project ID or project key (case sensitive).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `all` Returns all expandable information\n *  `field` Returns information about any custom fields assigned to receive an event\n *  `group` Returns information about any groups assigned to receive an event\n *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information\n *  `projectRole` Returns information about any project roles assigned to receive an event\n *  `user` Returns information about any users assigned to receive an event"
    }
  },
  "getAssignedPermissionScheme": {
    "accessPath": [
      "getAssignedPermissionScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectKeyOrId}/permissionscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKeyOrId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get assigned permission scheme",
    "parameterDescriptions": {
      "projectKeyOrId": "The project ID or project key (case sensitive).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "assignPermissionScheme": {
    "accessPath": [
      "assignPermissionScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/project/{projectKeyOrId}/permissionscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKeyOrId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Assign permission scheme",
    "parameterDescriptions": {
      "projectKeyOrId": "The project ID or project key (case sensitive).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:\n\n *  `all` Returns all expandable information.\n *  `field` Returns information about the custom field granted the permission.\n *  `group` Returns information about the group that is granted the permission.\n *  `permissions` Returns all permission grants for each permission scheme.\n *  `projectRole` Returns information about the project role granted the permission.\n *  `user` Returns information about the user who is granted the permission."
    }
  },
  "getSecurityLevelsForProject": {
    "accessPath": [
      "getSecurityLevelsForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/project/{projectKeyOrId}/securitylevel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKeyOrId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project issue security levels",
    "parameterDescriptions": {
      "projectKeyOrId": "The project ID or project key (case sensitive)."
    }
  },
  "getAllProjectCategories": {
    "accessPath": [
      "getAllProjectCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/projectCategory",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all project categories"
  },
  "createProjectCategory": {
    "accessPath": [
      "createProjectCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "id",
      "name",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/projectCategory",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create project category"
  },
  "removeProjectCategory": {
    "accessPath": [
      "removeProjectCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/projectCategory/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete project category",
    "parameterDescriptions": {
      "id": "ID of the project category to delete."
    }
  },
  "getProjectCategoryById": {
    "accessPath": [
      "getProjectCategoryById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/projectCategory/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project category by ID",
    "parameterDescriptions": {
      "id": "The ID of the project category."
    }
  },
  "updateProjectCategory": {
    "accessPath": [
      "updateProjectCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "id",
      "name",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/projectCategory/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update project category"
  },
  "getProjectFields": {
    "accessPath": [
      "getProjectFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/projects/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "projectId",
      "workTypeId",
      "fieldId"
    ],
    "description": "Get fields for projects",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "projectId": "The IDs of projects to return fields for.",
      "workTypeId": "The IDs of work types (issue types) to return fields for.",
      "fieldId": "The IDs of fields to return. If not provided, all fields are returned."
    }
  },
  "validateProjectKey": {
    "accessPath": [
      "validateProjectKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/projectvalidate/key",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key"
    ],
    "description": "Validate project key",
    "parameterDescriptions": {
      "key": "The project key."
    }
  },
  "getValidProjectKey": {
    "accessPath": [
      "getValidProjectKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/projectvalidate/validProjectKey",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key"
    ],
    "description": "Get valid project key",
    "parameterDescriptions": {
      "key": "The project key."
    }
  },
  "getValidProjectName": {
    "accessPath": [
      "getValidProjectName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/projectvalidate/validProjectName",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name"
    ],
    "description": "Get valid project name",
    "parameterDescriptions": {
      "name": "The project name."
    }
  },
  "redact": {
    "accessPath": [
      "redact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "redactions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/redact",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Redact"
  },
  "getRedactionStatus": {
    "accessPath": [
      "getRedactionStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/redact/status/{jobId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "jobId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get redaction status",
    "parameterDescriptions": {
      "jobId": "Redaction job id"
    }
  },
  "getResolutions": {
    "accessPath": [
      "getResolutions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/resolution",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get resolutions"
  },
  "createResolution": {
    "accessPath": [
      "createResolution"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/resolution",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create resolution"
  },
  "setDefaultResolution": {
    "accessPath": [
      "setDefaultResolution"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/resolution/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set default resolution"
  },
  "moveResolutions": {
    "accessPath": [
      "moveResolutions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "ids",
      "position"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/resolution/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move resolutions"
  },
  "searchResolutions": {
    "accessPath": [
      "searchResolutions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/resolution/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "onlyDefault"
    ],
    "description": "Search resolutions",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of resolutions IDs to be filtered out",
      "onlyDefault": "When set to true, return default only, when IDs provided, if none of them is default, return empty page. Default value is false"
    }
  },
  "deleteResolution": {
    "accessPath": [
      "deleteResolution"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/resolution/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "replaceWith"
    ],
    "description": "Delete resolution",
    "parameterDescriptions": {
      "id": "The ID of the issue resolution.",
      "replaceWith": "The ID of the issue resolution that will replace the currently selected resolution."
    }
  },
  "getResolution": {
    "accessPath": [
      "getResolution"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/resolution/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get resolution",
    "parameterDescriptions": {
      "id": "The ID of the issue resolution value."
    }
  },
  "updateResolution": {
    "accessPath": [
      "updateResolution"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/resolution/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update resolution",
    "parameterDescriptions": {
      "id": "The ID of the issue resolution."
    }
  },
  "getAllProjectRoles": {
    "accessPath": [
      "getAllProjectRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/role",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all project roles"
  },
  "createProjectRole": {
    "accessPath": [
      "createProjectRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/role",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create project role"
  },
  "deleteProjectRole": {
    "accessPath": [
      "deleteProjectRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "swap"
    ],
    "description": "Delete project role",
    "parameterDescriptions": {
      "id": "The ID of the project role to delete. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs.",
      "swap": "The ID of the project role that will replace the one being deleted. The swap will attempt to swap the role in schemes (notifications, permissions, issue security), workflows, worklogs and comments."
    }
  },
  "getProjectRoleById": {
    "accessPath": [
      "getProjectRoleById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get project role by ID",
    "parameterDescriptions": {
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "partialUpdateProjectRole": {
    "accessPath": [
      "partialUpdateProjectRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Partial update project role",
    "parameterDescriptions": {
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "fullyUpdateProjectRole": {
    "accessPath": [
      "fullyUpdateProjectRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/role/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fully update project role",
    "parameterDescriptions": {
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "deleteProjectRoleActorsFromRole": {
    "accessPath": [
      "deleteProjectRoleActorsFromRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/role/{id}/actors",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user",
      "groupId",
      "group"
    ],
    "description": "Delete default actors from project role",
    "parameterDescriptions": {
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs.",
      "user": "The user account ID of the user to remove as a default actor.",
      "groupId": "The group ID of the group to be removed as a default actor. This parameter cannot be used with the `group` parameter.",
      "group": "The group name of the group to be removed as a default actor.This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended."
    }
  },
  "getProjectRoleActorsForRole": {
    "accessPath": [
      "getProjectRoleActorsForRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/role/{id}/actors",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get default actors for project role",
    "parameterDescriptions": {
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "addProjectRoleActorsToRole": {
    "accessPath": [
      "addProjectRoleActorsToRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "group",
      "groupId",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/role/{id}/actors",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add default actors to project role",
    "parameterDescriptions": {
      "id": "The ID of the project role. Use [Get all project roles](#api-rest-api-3-role-get) to get a list of project role IDs."
    }
  },
  "getScreens": {
    "accessPath": [
      "getScreens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/screens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "queryString",
      "scope",
      "orderBy"
    ],
    "description": "Get screens",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of screen IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.",
      "queryString": "String used to perform a case-insensitive partial match with screen name.",
      "scope": "The scope filter string. To filter by multiple scope, provide an ampersand-separated list. For example, `scope=GLOBAL&scope=PROJECT`.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `id` Sorts by screen ID.\n *  `name` Sorts by screen name."
    }
  },
  "createScreen": {
    "accessPath": [
      "createScreen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create screen"
  },
  "addFieldToDefaultScreen": {
    "accessPath": [
      "addFieldToDefaultScreen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screens/addToDefault/{fieldId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fieldId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add field to default screen",
    "parameterDescriptions": {
      "fieldId": "The ID of the field."
    }
  },
  "getBulkScreenTabs": {
    "accessPath": [
      "getBulkScreenTabs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/screens/tabs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "screenId",
      "tabId",
      "startAt",
      "maxResult"
    ],
    "description": "Get bulk screen tabs",
    "parameterDescriptions": {
      "screenId": "The list of screen IDs. To include multiple screen IDs, provide an ampersand-separated list. For example, `screenId=10000&screenId=10001`.",
      "tabId": "The list of tab IDs. To include multiple tab IDs, provide an ampersand-separated list. For example, `tabId=10000&tabId=10001`.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResult": "The maximum number of items to return per page. The maximum number is 100,"
    }
  },
  "deleteScreen": {
    "accessPath": [
      "deleteScreen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/screens/{screenId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete screen",
    "parameterDescriptions": {
      "screenId": "The ID of the screen."
    }
  },
  "updateScreen": {
    "accessPath": [
      "updateScreen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/screens/{screenId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update screen",
    "parameterDescriptions": {
      "screenId": "The ID of the screen."
    }
  },
  "getAvailableScreenFields": {
    "accessPath": [
      "getAvailableScreenFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/screens/{screenId}/availableFields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get available screen fields",
    "parameterDescriptions": {
      "screenId": "The ID of the screen."
    }
  },
  "getAllScreenTabs": {
    "accessPath": [
      "getAllScreenTabs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey"
    ],
    "description": "Get all screen tabs",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "projectKey": "The key of the project."
    }
  },
  "addScreenTab": {
    "accessPath": [
      "addScreenTab"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create screen tab",
    "parameterDescriptions": {
      "screenId": "The ID of the screen."
    }
  },
  "deleteScreenTab": {
    "accessPath": [
      "deleteScreenTab"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete screen tab",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab."
    }
  },
  "renameScreenTab": {
    "accessPath": [
      "renameScreenTab"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update screen tab",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab."
    }
  },
  "getAllScreenTabFields": {
    "accessPath": [
      "getAllScreenTabFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey"
    ],
    "description": "Get all screen tab fields",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab.",
      "projectKey": "The key of the project."
    }
  },
  "addScreenTabField": {
    "accessPath": [
      "addScreenTabField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fieldId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "skipFieldAssociation"
    ],
    "description": "Add screen tab field",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab."
    }
  },
  "removeScreenTabField": {
    "accessPath": [
      "removeScreenTabField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove screen tab field",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab.",
      "id": "The ID of the field."
    }
  },
  "moveScreenTabField": {
    "accessPath": [
      "moveScreenTabField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "position"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}/fields/{id}/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move screen tab field",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab.",
      "id": "The ID of the field."
    }
  },
  "moveScreenTab": {
    "accessPath": [
      "moveScreenTab"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screens/{screenId}/tabs/{tabId}/move/{pos}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenId",
      "tabId",
      "pos"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move screen tab",
    "parameterDescriptions": {
      "screenId": "The ID of the screen.",
      "tabId": "The ID of the screen tab.",
      "pos": "The position of tab. The base index is 0."
    }
  },
  "getScreenSchemes": {
    "accessPath": [
      "getScreenSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/screenscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "id",
      "expand",
      "queryString",
      "orderBy"
    ],
    "description": "Get screen schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "id": "The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.",
      "expand": "Use [expand](#expansion) include additional information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns information about the issue type screen scheme the screen scheme is assigned to.",
      "queryString": "String used to perform a case-insensitive partial match with screen scheme name.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `id` Sorts by screen scheme ID.\n *  `name` Sorts by screen scheme name."
    }
  },
  "createScreenScheme": {
    "accessPath": [
      "createScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name",
      "screens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/screenscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create screen scheme"
  },
  "deleteScreenScheme": {
    "accessPath": [
      "deleteScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/screenscheme/{screenSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete screen scheme",
    "parameterDescriptions": {
      "screenSchemeId": "The ID of the screen scheme."
    }
  },
  "updateScreenScheme": {
    "accessPath": [
      "updateScreenScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name",
      "screens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/screenscheme/{screenSchemeId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "screenSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update screen scheme",
    "parameterDescriptions": {
      "screenSchemeId": "The ID of the screen scheme."
    }
  },
  "searchForIssuesUsingJql": {
    "accessPath": [
      "searchForIssuesUsingJql"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "jql",
      "startAt",
      "maxResults",
      "validateQuery",
      "fields",
      "expand",
      "properties",
      "fieldsByKeys",
      "failFast"
    ],
    "description": "Currently being removed. Search for issues using JQL (GET)",
    "parameterDescriptions": {
      "jql": "The [JQL](https://confluence.atlassian.com/x/egORLQ) that defines the search. Note:\n\n *  If no JQL expression is provided, all issues are returned.\n *  `username` and `userkey` cannot be used as search terms due to privacy reasons. Use `accountId` instead.\n *  If a user has hidden their email address in their user profile, partial matches of the email address will not find the user. An exact match is required.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page. To manage page size, Jira may return fewer items per page where a large number of fields or properties are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only.",
      "validateQuery": "Determines how to validate the JQL query and treat the validation results. Supported values are:\n\n *  `strict` Returns a 400 response code if any errors are found, along with a list of all errors (and warnings).\n *  `warn` Returns all errors as warnings.\n *  `none` No validation is performed.\n *  `true` *Deprecated* A legacy synonym for `strict`.\n *  `false` *Deprecated* A legacy synonym for `warn`.\n\nNote: If the JQL is not correctly formed a 400 response code is returned, regardless of the `validateQuery` value.",
      "fields": "A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:\n\n *  `*all` Returns all fields.\n *  `*navigable` Returns navigable fields.\n *  Any issue field, prefixed with a minus to exclude.\n\nExamples:\n\n *  `summary,comment` Returns only the summary and comments fields.\n *  `-description` Returns all navigable (default) fields except description.\n *  `*all,-comment` Returns all fields except comments.\n\nThis parameter may be specified multiple times. For example, `fields=field1,field2&fields=field3`.\n\nNote: All navigable fields are returned by default. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.",
      "expand": "Use [expand](#expansion) to include additional information about issues in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `renderedFields` Returns field values rendered in HTML format.\n *  `names` Returns the display name of each field.\n *  `schema` Returns the schema describing a field type.\n *  `transitions` Returns all possible transitions for the issue.\n *  `operations` Returns all possible operations for the issue.\n *  `editmeta` Returns information about how each field can be edited.\n *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.\n *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version.",
      "properties": "A list of issue property keys for issue properties to include in the results. This parameter accepts a comma-separated list. Multiple properties can also be provided using an ampersand separated list. For example, `properties=prop1,prop2&properties=prop3`. A maximum of 5 issue property keys can be specified.",
      "fieldsByKeys": "Reference fields by their key (rather than ID).",
      "failFast": "Whether to fail the request quickly in case of an error while loading fields for an issue. For `failFast=true`, if one field fails, the entire operation fails. For `failFast=false`, the operation will continue even if a field fails. It will return a valid response, but without values for the failed field(s)."
    }
  },
  "searchForIssuesUsingJqlPost": {
    "accessPath": [
      "searchForIssuesUsingJqlPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "fields",
      "fieldsByKeys",
      "jql",
      "maxResults",
      "properties",
      "startAt",
      "validateQuery"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Currently being removed. Search for issues using JQL (POST)"
  },
  "countIssues": {
    "accessPath": [
      "countIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "jql"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/search/approximate-count",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Count issues using JQL"
  },
  "searchAndReconsileIssuesUsingJql": {
    "accessPath": [
      "searchAndReconsileIssuesUsingJql"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/search/jql",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "jql",
      "nextPageToken",
      "maxResults",
      "fields",
      "expand",
      "properties",
      "fieldsByKeys",
      "failFast",
      "reconcileIssues"
    ],
    "description": "Search for issues using JQL enhanced search (GET)",
    "parameterDescriptions": {
      "jql": "A [JQL](https://confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.\n\n *  Example of an unbounded query: `order by key desc`.\n *  Example of a bounded query: `assignee = currentUser() order by key`.\n\nAdditionally, `orderBy` clause can contain a maximum of 7 fields.",
      "nextPageToken": "The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues.\n\nNote: The `nextPageToken` field is **not included** in the response for the last page, indicating there is no next page.",
      "maxResults": "The maximum number of items to return per page. To manage page size, API may return fewer items per page where a large number of fields or properties are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. It returns max 5000 issues.",
      "fields": "A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:\n\n *  `*all` Returns all fields.\n *  `*navigable` Returns navigable fields.\n *  `id` Returns only issue IDs.\n *  Any issue field, prefixed with a minus to exclude.\n\nThe default is `id`.\n\nExamples:\n\n *  `summary,comment` Returns only the summary and comments fields only.\n *  `-description` Returns all navigable (default) fields except description.\n *  `*all,-comment` Returns all fields except comments.\n\nMultiple `fields` parameters can be included in a request.\n\nNote: By default, this resource returns IDs only. This differs from [GET issue](#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.",
      "expand": "Use [expand](#expansion) to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a comma-delimited string of values. The expand options are:\n\n *  `renderedFields` Returns field values rendered in HTML format.\n *  `names` Returns the display name of each field.\n *  `schema` Returns the schema describing a field type.\n *  `transitions` Returns all possible transitions for the issue.\n *  `operations` Returns all possible operations for the issue.\n *  `editmeta` Returns information about how each field can be edited.\n *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.\n *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version.\n\nExamples: `\"names,changelog\"` Returns the display name of each field as well as a list of recent updates to an issue.",
      "properties": "A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list.",
      "fieldsByKeys": "Reference fields by their key (rather than ID). The default is `false`.",
      "failFast": "Fail this request early if we can't retrieve all field data.",
      "reconcileIssues": "Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. This list of ids should be consistent with each paginated request across different pages."
    }
  },
  "searchAndReconsileIssuesUsingJqlPost": {
    "accessPath": [
      "searchAndReconsileIssuesUsingJqlPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "fields",
      "fieldsByKeys",
      "jql",
      "maxResults",
      "nextPageToken",
      "properties",
      "reconcileIssues"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/search/jql",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search for issues using JQL enhanced search (POST)"
  },
  "getIssueSecurityLevel": {
    "accessPath": [
      "getIssueSecurityLevel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/securitylevel/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue security level",
    "parameterDescriptions": {
      "id": "The ID of the issue security level."
    }
  },
  "getServerInfo": {
    "accessPath": [
      "getServerInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/serverInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Jira instance info"
  },
  "getIssueNavigatorDefaultColumns": {
    "accessPath": [
      "getIssueNavigatorDefaultColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/settings/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get issue navigator default columns"
  },
  "setIssueNavigatorDefaultColumns": {
    "accessPath": [
      "setIssueNavigatorDefaultColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "columns"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/settings/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set issue navigator default columns"
  },
  "getStatuses": {
    "accessPath": [
      "getStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/status",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all statuses"
  },
  "getStatus": {
    "accessPath": [
      "getStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/status/{idOrName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "idOrName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get status",
    "parameterDescriptions": {
      "idOrName": "The ID or name of the status."
    }
  },
  "getStatusCategories": {
    "accessPath": [
      "getStatusCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuscategory",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all status categories"
  },
  "getStatusCategory": {
    "accessPath": [
      "getStatusCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuscategory/{idOrKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "idOrKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get status category",
    "parameterDescriptions": {
      "idOrKey": "The ID or key of the status category."
    }
  },
  "deleteStatusesById": {
    "accessPath": [
      "deleteStatusesById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "id"
    ],
    "description": "Bulk delete Statuses",
    "parameterDescriptions": {
      "id": "The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.\n\nMin items `1`, Max items `50`"
    }
  },
  "getStatusesById": {
    "accessPath": [
      "getStatusesById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "id"
    ],
    "description": "Bulk get statuses",
    "parameterDescriptions": {
      "id": "The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.\n\nMin items `1`, Max items `50`"
    }
  },
  "createStatuses": {
    "accessPath": [
      "createStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "scope",
      "statuses"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk create statuses"
  },
  "updateStatuses": {
    "accessPath": [
      "updateStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "statuses"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk update statuses"
  },
  "getStatusesByName": {
    "accessPath": [
      "getStatusesByName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuses/byNames",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name",
      "projectId"
    ],
    "description": "Bulk get statuses by name",
    "parameterDescriptions": {
      "name": "The list of status names. To include multiple names, provide an ampersand-separated list. For example, name=nameXX&name=nameYY.\n\nMin items `1`, Max items `50`",
      "projectId": "The project the status is part of or null for global statuses."
    }
  },
  "search": {
    "accessPath": [
      "search"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuses/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectId",
      "startAt",
      "maxResults",
      "searchString",
      "statusCategory"
    ],
    "description": "Search statuses paginated",
    "parameterDescriptions": {
      "projectId": "The project the status is part of or null for global statuses.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "searchString": "Term to match status names against or null to search for all statuses in the search scope.",
      "statusCategory": "Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`."
    }
  },
  "getProjectIssueTypeUsagesForStatus": {
    "accessPath": [
      "getProjectIssueTypeUsagesForStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuses/{statusId}/project/{projectId}/issueTypeUsages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "statusId",
      "projectId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get issue type usages by status and project",
    "parameterDescriptions": {
      "statusId": "The statusId to fetch issue type usages for",
      "projectId": "The projectId to fetch issue type usages for",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "getProjectUsagesForStatus": {
    "accessPath": [
      "getProjectUsagesForStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuses/{statusId}/projectUsages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "statusId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get project usages by status",
    "parameterDescriptions": {
      "statusId": "The statusId to fetch project usages for",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "getWorkflowUsagesForStatus": {
    "accessPath": [
      "getWorkflowUsagesForStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/statuses/{statusId}/workflowUsages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "statusId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get workflow usages by status",
    "parameterDescriptions": {
      "statusId": "The statusId to fetch workflow usages for",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "getTask": {
    "accessPath": [
      "getTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/task/{taskId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "taskId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get task",
    "parameterDescriptions": {
      "taskId": "The ID of the task."
    }
  },
  "cancelTask": {
    "accessPath": [
      "cancelTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/task/{taskId}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "taskId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel task",
    "parameterDescriptions": {
      "taskId": "The ID of the task."
    }
  },
  "getUiModifications": {
    "accessPath": [
      "getUiModifications"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/uiModifications",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "expand"
    ],
    "description": "Get UI modifications",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "expand": "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `data` Returns UI modification data.\n *  `contexts` Returns UI modification contexts."
    }
  },
  "createUiModification": {
    "accessPath": [
      "createUiModification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contexts",
      "data",
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/uiModifications",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create UI modification"
  },
  "deleteUiModification": {
    "accessPath": [
      "deleteUiModification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/uiModifications/{uiModificationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "uiModificationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete UI modification",
    "parameterDescriptions": {
      "uiModificationId": "The ID of the UI modification."
    }
  },
  "updateUiModification": {
    "accessPath": [
      "updateUiModification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contexts",
      "data",
      "description",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/uiModifications/{uiModificationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "uiModificationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update UI modification",
    "parameterDescriptions": {
      "uiModificationId": "The ID of the UI modification."
    }
  },
  "getAvatars": {
    "accessPath": [
      "getAvatars"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/universal_avatar/type/{type}/owner/{entityId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type",
      "entityId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get avatars",
    "parameterDescriptions": {
      "type": "The avatar type.",
      "entityId": "The ID of the item the avatar is associated with."
    }
  },
  "storeAvatar": {
    "accessPath": [
      "storeAvatar"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/universal_avatar/type/{type}/owner/{entityId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type",
      "entityId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "x",
      "y",
      "size"
    ],
    "description": "Load avatar",
    "parameterDescriptions": {
      "type": "The avatar type.",
      "entityId": "The ID of the item the avatar is associated with.",
      "x": "The X coordinate of the top-left corner of the crop region.",
      "y": "The Y coordinate of the top-left corner of the crop region.",
      "size": "The length of each side of the crop region."
    }
  },
  "deleteAvatar": {
    "accessPath": [
      "deleteAvatar"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/universal_avatar/type/{type}/owner/{owningObjectId}/avatar/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type",
      "owningObjectId",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete avatar",
    "parameterDescriptions": {
      "type": "The avatar type.",
      "owningObjectId": "The ID of the item the avatar is associated with.",
      "id": "The ID of the avatar."
    }
  },
  "getAvatarImageByType": {
    "accessPath": [
      "getAvatarImageByType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/universal_avatar/view/type/{type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "size",
      "format"
    ],
    "description": "Get avatar image by type",
    "parameterDescriptions": {
      "type": "The icon type of the avatar.",
      "size": "The size of the avatar image. If not provided the default size is returned.",
      "format": "The format to return the avatar image in. If not provided the original content format is returned."
    }
  },
  "getAvatarImageByID": {
    "accessPath": [
      "getAvatarImageById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/universal_avatar/view/type/{type}/avatar/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "size",
      "format"
    ],
    "description": "Get avatar image by ID",
    "parameterDescriptions": {
      "type": "The icon type of the avatar.",
      "id": "The ID of the avatar.",
      "size": "The size of the avatar image. If not provided the default size is returned.",
      "format": "The format to return the avatar image in. If not provided the original content format is returned."
    }
  },
  "getAvatarImageByOwner": {
    "accessPath": [
      "getAvatarImageByOwner"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/universal_avatar/view/type/{type}/owner/{entityId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type",
      "entityId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "size",
      "format"
    ],
    "description": "Get avatar image by owner",
    "parameterDescriptions": {
      "type": "The icon type of the avatar.",
      "entityId": "The ID of the project or issue type the avatar belongs to.",
      "size": "The size of the avatar image. If not provided the default size is returned.",
      "format": "The format to return the avatar image in. If not provided the original content format is returned."
    }
  },
  "removeUser": {
    "accessPath": [
      "removeUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "username",
      "key"
    ],
    "description": "Delete user",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "key": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."
    }
  },
  "getUser": {
    "accessPath": [
      "getUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "username",
      "key",
      "expand"
    ],
    "description": "Get user",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide) for details.",
      "key": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide) for details.",
      "expand": "Use [expand](#expansion) to include additional information about users in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `groups` includes all groups and nested groups to which the user belongs.\n *  `applicationRoles` includes details of all the applications to which the user has access."
    }
  },
  "createUser": {
    "accessPath": [
      "createUser"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "applicationKeys",
      "displayName",
      "emailAddress",
      "key",
      "name",
      "password",
      "products",
      "self"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create user"
  },
  "findBulkAssignableUsers": {
    "accessPath": [
      "findBulkAssignableUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/assignable/multiProjectSearch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "username",
      "accountId",
      "projectKeys",
      "startAt",
      "maxResults"
    ],
    "description": "Find users assignable to projects",
    "parameterDescriptions": {
      "query": "A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "A query string that is matched exactly against user `accountId`. Required, unless `query` is specified.",
      "projectKeys": "A list of project keys (case sensitive). This parameter accepts a comma-separated list.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "findAssignableUsers": {
    "accessPath": [
      "findAssignableUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/assignable/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "sessionId",
      "username",
      "accountId",
      "project",
      "issueKey",
      "issueId",
      "startAt",
      "maxResults",
      "actionDescriptorId",
      "recommend",
      "accountType",
      "appType"
    ],
    "description": "Find users assignable to issues",
    "parameterDescriptions": {
      "query": "A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `username` or `accountId` is specified.",
      "sessionId": "The sessionId of this request. SessionId is the same until the assignee is set.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "A query string that is matched exactly against user `accountId`. Required, unless `query` is specified.",
      "project": "The project ID or project key (case sensitive). Required, unless `issueKey` or `issueId` is specified.",
      "issueKey": "The key of the issue. Required, unless `issueId` or `project` is specified.",
      "issueId": "The ID of the issue. Required, unless `issueKey` or `project` is specified.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return. This operation may return less than the maximum number of items even if more are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the users that can be assigned to the issue.",
      "actionDescriptorId": "The ID of the transition."
    }
  },
  "bulkGetUsers": {
    "accessPath": [
      "bulkGetUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "username",
      "key",
      "accountId"
    ],
    "description": "Bulk get users",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "username": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "key": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "The account ID of a user. To specify multiple users, pass multiple `accountId` parameters. For example, `accountId=5b10a2844c20165700ede21g&accountId=5b10ac8d82e05b22cc7d4ef5`."
    }
  },
  "bulkGetUsersMigration": {
    "accessPath": [
      "bulkGetUsersMigration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/bulk/migration",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "username",
      "key"
    ],
    "description": "Get account IDs for users",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "username": "Username of a user. To specify multiple users, pass multiple copies of this parameter. For example, `username=fred&username=barney`. Required if `key` isn't provided. Cannot be provided if `key` is present.",
      "key": "Key of a user. To specify multiple users, pass multiple copies of this parameter. For example, `key=fred&key=barney`. Required if `username` isn't provided. Cannot be provided if `username` is present."
    }
  },
  "resetUserColumns": {
    "accessPath": [
      "resetUserColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/user/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "username"
    ],
    "description": "Reset user default columns",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."
    }
  },
  "getUserDefaultColumns": {
    "accessPath": [
      "getUserDefaultColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "username"
    ],
    "description": "Get user default columns",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "username": "This parameter is no longer available See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."
    }
  },
  "setUserColumns": {
    "accessPath": [
      "setUserColumns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "columns"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/user/columns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId"
    ],
    "description": "Set user default columns",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*."
    }
  },
  "getUserEmail": {
    "accessPath": [
      "getUserEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/email",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId"
    ],
    "description": "Get user email",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`."
    }
  },
  "getUserEmailBulk": {
    "accessPath": [
      "getUserEmailBulk"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/email/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId"
    ],
    "description": "Get user email bulk",
    "parameterDescriptions": {
      "accountId": "The account IDs of the users for which emails are required. An `accountId` is an identifier that uniquely identifies the user across all Atlassian products. For example, `5b10ac8d82e05b22cc7d4ef5`. Note, this should be treated as an opaque identifier (that is, do not assume any structure in the value)."
    }
  },
  "getUserGroups": {
    "accessPath": [
      "getUserGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "username",
      "key"
    ],
    "description": "Get user groups",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "key": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."
    }
  },
  "findUsersWithAllPermissions": {
    "accessPath": [
      "findUsersWithAllPermissions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/permission/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "username",
      "accountId",
      "permissions",
      "issueKey",
      "projectKey",
      "startAt",
      "maxResults"
    ],
    "description": "Find users with permissions",
    "parameterDescriptions": {
      "query": "A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "A query string that is matched exactly against user `accountId`. Required, unless `query` is specified.",
      "permissions": "A comma separated list of permissions. Permissions can be specified as any:\n\n *  permission returned by [Get all permissions](#api-rest-api-3-permissions-get).\n *  custom project permission added by Connect apps.\n *  (deprecated) one of the following:\n    \n     *  ASSIGNABLE\\_USER\n     *  ASSIGN\\_ISSUE\n     *  ATTACHMENT\\_DELETE\\_ALL\n     *  ATTACHMENT\\_DELETE\\_OWN\n     *  BROWSE\n     *  CLOSE\\_ISSUE\n     *  COMMENT\\_DELETE\\_ALL\n     *  COMMENT\\_DELETE\\_OWN\n     *  COMMENT\\_EDIT\\_ALL\n     *  COMMENT\\_EDIT\\_OWN\n     *  COMMENT\\_ISSUE\n     *  CREATE\\_ATTACHMENT\n     *  CREATE\\_ISSUE\n     *  DELETE\\_ISSUE\n     *  EDIT\\_ISSUE\n     *  LINK\\_ISSUE\n     *  MANAGE\\_WATCHER\\_LIST\n     *  MODIFY\\_REPORTER\n     *  MOVE\\_ISSUE\n     *  PROJECT\\_ADMIN\n     *  RESOLVE\\_ISSUE\n     *  SCHEDULE\\_ISSUE\n     *  SET\\_ISSUE\\_SECURITY\n     *  TRANSITION\\_ISSUE\n     *  VIEW\\_VERSION\\_CONTROL\n     *  VIEW\\_VOTERS\\_AND\\_WATCHERS\n     *  VIEW\\_WORKFLOW\\_READONLY\n     *  WORKLOG\\_DELETE\\_ALL\n     *  WORKLOG\\_DELETE\\_OWN\n     *  WORKLOG\\_EDIT\\_ALL\n     *  WORKLOG\\_EDIT\\_OWN\n     *  WORK\\_ISSUE",
      "issueKey": "The issue key for the issue.",
      "projectKey": "The project key for the project (case sensitive).",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "findUsersForPicker": {
    "accessPath": [
      "findUsersForPicker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/picker",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "maxResults",
      "showAvatar",
      "exclude",
      "excludeAccountIds",
      "avatarSize",
      "excludeConnectUsers"
    ],
    "description": "Find users for picker",
    "parameterDescriptions": {
      "query": "A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*.",
      "maxResults": "The maximum number of items to return. The total number of matched users is returned in `total`.",
      "showAvatar": "Include the URI to the user's avatar.",
      "exclude": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "excludeAccountIds": "A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple account IDs can also be provided using an ampersand-separated list. For example, `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`. Cannot be provided with `exclude`."
    }
  },
  "getUserPropertyKeys": {
    "accessPath": [
      "getUserPropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "userKey",
      "username"
    ],
    "description": "Get user property keys",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "userKey": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "username": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details."
    }
  },
  "deleteUserProperty": {
    "accessPath": [
      "deleteUserProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/user/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "userKey",
      "username"
    ],
    "description": "Delete user property",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "userKey": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "username": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "propertyKey": "The key of the user's property."
    }
  },
  "getUserProperty": {
    "accessPath": [
      "getUserProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "userKey",
      "username"
    ],
    "description": "Get user property",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "userKey": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "username": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "propertyKey": "The key of the user's property."
    }
  },
  "setUserProperty": {
    "accessPath": [
      "setUserProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/user/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "accountId",
      "userKey",
      "username"
    ],
    "description": "Set user property",
    "parameterDescriptions": {
      "accountId": "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      "userKey": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "username": "This parameter is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "propertyKey": "The key of the user's property. The maximum length is 255 characters."
    }
  },
  "findUsers": {
    "accessPath": [
      "findUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "username",
      "accountId",
      "startAt",
      "maxResults",
      "property"
    ],
    "description": "Find users",
    "parameterDescriptions": {
      "query": "A query string that is matched against user attributes ( `displayName`, and `emailAddress`) to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` or `property` is specified.",
      "accountId": "A query string that is matched exactly against a user `accountId`. Required, unless `query` or `property` is specified.",
      "startAt": "The index of the first item to return in a page of filtered results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "property": "A query string used to search properties. Property keys are specified by path, so property keys containing dot (.) or equals (=) characters cannot be used. The query string cannot be specified using a JSON object. Example: To search for the value of `nested` from `{\"something\":{\"nested\":1,\"other\":2}}` use `thepropertykey.something.nested=1`. Required, unless `accountId` or `query` is specified."
    }
  },
  "findUsersByQuery": {
    "accessPath": [
      "findUsersByQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/search/query",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "startAt",
      "maxResults"
    ],
    "description": "Find users by query",
    "parameterDescriptions": {
      "query": "The search query.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "findUserKeysByQuery": {
    "accessPath": [
      "findUserKeysByQuery"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/search/query/key",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "startAt",
      "maxResult"
    ],
    "description": "Find user keys by query",
    "parameterDescriptions": {
      "query": "The search query.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResult": "The maximum number of items to return per page."
    }
  },
  "findUsersWithBrowsePermission": {
    "accessPath": [
      "findUsersWithBrowsePermission"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/user/viewissue/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "username",
      "accountId",
      "issueKey",
      "projectKey",
      "startAt",
      "maxResults"
    ],
    "description": "Find users with browse permission",
    "parameterDescriptions": {
      "query": "A query string that is matched against user attributes, such as `displayName` and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `accountId` is specified.",
      "username": "This parameter is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.",
      "accountId": "A query string that is matched exactly against user `accountId`. Required, unless `query` is specified.",
      "issueKey": "The issue key for the issue. Required, unless `projectKey` is specified.",
      "projectKey": "The project key for the project (case sensitive). Required, unless `issueKey` is specified.",
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "getAllUsersDefault": {
    "accessPath": [
      "getAllUsersDefault"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "expand"
    ],
    "description": "Get all users default",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return.",
      "maxResults": "The maximum number of items to return (limited to 1000)."
    }
  },
  "getAllUsers": {
    "accessPath": [
      "getAllUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/users/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "expand"
    ],
    "description": "Get all users",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return.",
      "maxResults": "The maximum number of items to return (limited to 1000)."
    }
  },
  "createVersion": {
    "accessPath": [
      "createVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "approvers",
      "archived",
      "description",
      "driver",
      "expand",
      "id",
      "issuesStatusForFixVersion",
      "moveUnfixedIssuesTo",
      "name",
      "operations",
      "overdue",
      "project",
      "projectId",
      "releaseDate",
      "released",
      "self",
      "startDate",
      "userReleaseDate",
      "userStartDate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/version",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create version"
  },
  "deleteVersion": {
    "accessPath": [
      "deleteVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/version/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "moveFixIssuesTo",
      "moveAffectedIssuesTo"
    ],
    "description": "Delete version",
    "parameterDescriptions": {
      "id": "The ID of the version.",
      "moveFixIssuesTo": "The ID of the version to update `fixVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted.",
      "moveAffectedIssuesTo": "The ID of the version to update `affectedVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted."
    }
  },
  "getVersion": {
    "accessPath": [
      "getVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/version/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get version",
    "parameterDescriptions": {
      "id": "The ID of the version.",
      "expand": "Use [expand](#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `operations` Returns the list of operations available for this version.\n *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property represents the number of issues with a status other than *to do*, *in progress*, and *done*.\n *  `driver` Returns the Atlassian account ID of the version driver.\n *  `approvers` Returns a list containing the Atlassian account IDs of approvers for this version."
    }
  },
  "updateVersion": {
    "accessPath": [
      "updateVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "approvers",
      "archived",
      "description",
      "driver",
      "expand",
      "id",
      "issuesStatusForFixVersion",
      "moveUnfixedIssuesTo",
      "name",
      "operations",
      "overdue",
      "project",
      "projectId",
      "releaseDate",
      "released",
      "self",
      "startDate",
      "userReleaseDate",
      "userStartDate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/version/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update version",
    "parameterDescriptions": {
      "id": "The ID of the version."
    }
  },
  "mergeVersions": {
    "accessPath": [
      "mergeVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/version/{id}/mergeto/{moveIssuesTo}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "moveIssuesTo"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge versions",
    "parameterDescriptions": {
      "id": "The ID of the version to delete.",
      "moveIssuesTo": "The ID of the version to merge into."
    }
  },
  "moveVersion": {
    "accessPath": [
      "moveVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "position"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/version/{id}/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move version",
    "parameterDescriptions": {
      "id": "The ID of the version to be moved."
    }
  },
  "getVersionRelatedIssues": {
    "accessPath": [
      "getVersionRelatedIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/version/{id}/relatedIssueCounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get version's related issues count",
    "parameterDescriptions": {
      "id": "The ID of the version."
    }
  },
  "getRelatedWork": {
    "accessPath": [
      "getRelatedWork"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/version/{id}/relatedwork",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get related work",
    "parameterDescriptions": {
      "id": "The ID of the version."
    }
  },
  "createRelatedWork": {
    "accessPath": [
      "createRelatedWork"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "category",
      "issueId",
      "relatedWorkId",
      "title",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/version/{id}/relatedwork",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create related work"
  },
  "updateRelatedWork": {
    "accessPath": [
      "updateRelatedWork"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "category",
      "issueId",
      "relatedWorkId",
      "title",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/version/{id}/relatedwork",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update related work",
    "parameterDescriptions": {
      "id": "The ID of the version to update the related work on. For the related work id, pass it to the input JSON."
    }
  },
  "deleteAndReplaceVersion": {
    "accessPath": [
      "deleteAndReplaceVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customFieldReplacementList",
      "moveAffectedIssuesTo",
      "moveFixIssuesTo"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/version/{id}/removeAndSwap",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete and replace version",
    "parameterDescriptions": {
      "id": "The ID of the version."
    }
  },
  "getVersionUnresolvedIssues": {
    "accessPath": [
      "getVersionUnresolvedIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/version/{id}/unresolvedIssueCount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get version's unresolved issues count",
    "parameterDescriptions": {
      "id": "The ID of the version."
    }
  },
  "deleteRelatedWork": {
    "accessPath": [
      "deleteRelatedWork"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/version/{versionId}/relatedwork/{relatedWorkId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "versionId",
      "relatedWorkId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete related work",
    "parameterDescriptions": {
      "versionId": "The ID of the version that the target related work belongs to.",
      "relatedWorkId": "The ID of the related work to delete."
    }
  },
  "deleteWebhookById": {
    "accessPath": [
      "deleteWebhookById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "webhookIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete webhooks by ID"
  },
  "getDynamicWebhooksForApp": {
    "accessPath": [
      "getDynamicWebhooksForApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get dynamic webhooks for app",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "registerDynamicWebhooks": {
    "accessPath": [
      "registerDynamicWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "url",
      "webhooks"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/webhook",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register dynamic webhooks"
  },
  "getFailedWebhooks": {
    "accessPath": [
      "getFailedWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/webhook/failed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "maxResults",
      "after"
    ],
    "description": "Get failed webhooks",
    "parameterDescriptions": {
      "maxResults": "The maximum number of webhooks to return per page. If obeying the maxResults directive would result in records with the same failure time being split across pages, the directive is ignored and all records with the same failure time included on the page.",
      "after": "The time after which any webhook failure must have occurred for the record to be returned, expressed as milliseconds since the UNIX epoch."
    }
  },
  "refreshWebhooks": {
    "accessPath": [
      "refreshWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "webhookIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/webhook/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Extend webhook life"
  },
  "readWorkflowFromHistory": {
    "accessPath": [
      "readWorkflowFromHistory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "version",
      "workflowId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflow/history",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Read workflow version from history"
  },
  "listWorkflowHistory": {
    "accessPath": [
      "listWorkflowHistory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "workflowId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflow/history/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "List workflow history entries",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `includeIntermediateWorkflows` Includes intermediate workflow versions that are sometimes created during workflow updates or migrations. By default, these are omitted from the response."
    }
  },
  "getWorkflowTransitionRuleConfigurations": {
    "accessPath": [
      "getWorkflowTransitionRuleConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflow/rule/config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "types",
      "keys",
      "workflowNames",
      "withTags",
      "draft",
      "expand"
    ],
    "description": "Get workflow transition rule configurations",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "types": "The types of the transition rules to return.",
      "keys": "The transition rule class keys, as defined in the Connect or the Forge app descriptor, of the transition rules to return.",
      "workflowNames": "The list of workflow names to filter by.",
      "withTags": "The list of `tags` to filter by.",
      "draft": "**Deprecated:** Whether draft or published workflows are returned. If not provided, both workflow types are returned. The 'draft' parameter will be removed from this API on [November 2, 2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3147).",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts `transition`, which, for each rule, returns information about the transition the rule is assigned to."
    }
  },
  "updateWorkflowTransitionRuleConfigurations": {
    "accessPath": [
      "updateWorkflowTransitionRuleConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "workflows"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflow/rule/config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update workflow transition rule configurations"
  },
  "deleteWorkflowTransitionRuleConfigurations": {
    "accessPath": [
      "deleteWorkflowTransitionRuleConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "workflows"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflow/rule/config/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete workflow transition rule configurations"
  },
  "getWorkflowsPaginated": {
    "accessPath": [
      "getWorkflowsPaginated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflow/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "workflowName",
      "expand",
      "queryString",
      "orderBy",
      "isActive"
    ],
    "description": "Get workflows paginated",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "workflowName": "The name of a workflow to return. To include multiple workflows, provide an ampersand-separated list. For example, `workflowName=name1&workflowName=name2`.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `transitions` For each workflow, returns information about the transitions inside the workflow.\n *  `transitions.rules` For each workflow transition, returns information about its rules. Transitions are included automatically if this expand is requested.\n *  `transitions.properties` For each workflow transition, returns information about its properties. Transitions are included automatically if this expand is requested.\n *  `statuses` For each workflow, returns information about the statuses inside the workflow.\n *  `statuses.properties` For each workflow status, returns information about its properties. Statuses are included automatically if this expand is requested.\n *  `default` For each workflow, returns information about whether this is the default workflow.\n *  `schemes` For each workflow, returns information about the workflow schemes the workflow is assigned to.\n *  `projects` For each workflow, returns information about the projects the workflow is assigned to, through workflow schemes.\n *  `hasDraftWorkflow` For each workflow, returns information about whether the workflow has a draft version.\n *  `operations` For each workflow, returns information about the actions that can be undertaken on the workflow.",
      "queryString": "String used to perform a case-insensitive partial match with workflow name.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `name` Sorts by workflow name.\n *  `created` Sorts by create time.\n *  `updated` Sorts by update time.",
      "isActive": "Filters active and inactive workflows."
    }
  },
  "deleteWorkflowTransitionProperty": {
    "accessPath": [
      "deleteWorkflowTransitionProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflow/transitions/{transitionId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transitionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key",
      "workflowName",
      "workflowMode"
    ],
    "description": "Delete workflow transition property",
    "parameterDescriptions": {
      "transitionId": "The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition.",
      "key": "The name of the transition property to delete, also known as the name of the property.",
      "workflowName": "The name of the workflow that the transition belongs to.",
      "workflowMode": "The workflow status. Set to `live` for inactive workflows or `draft` for draft workflows. Active workflows cannot be edited."
    }
  },
  "getWorkflowTransitionProperties": {
    "accessPath": [
      "getWorkflowTransitionProperties"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflow/transitions/{transitionId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transitionId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "includeReservedKeys",
      "key",
      "workflowName",
      "workflowMode"
    ],
    "description": "Get workflow transition properties",
    "parameterDescriptions": {
      "transitionId": "The ID of the transition. To get the ID, view the workflow in text mode in the Jira administration console. The ID is shown next to the transition.",
      "includeReservedKeys": "Some properties with keys that have the *jira.* prefix are reserved, which means they are not editable. To include these properties in the results, set this parameter to *true*.",
      "key": "The key of the property being returned, also known as the name of the property. If this parameter is not specified, all properties on the transition are returned.",
      "workflowName": "The name of the workflow that the transition belongs to.",
      "workflowMode": "The workflow status. Set to *live* for active and inactive workflows, or *draft* for draft workflows."
    }
  },
  "createWorkflowTransitionProperty": {
    "accessPath": [
      "createWorkflowTransitionProperty"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "key",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflow/transitions/{transitionId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transitionId"
    ],
    "queryConflictKeys": [
      "key"
    ],
    "queryParameterKeys": [
      "key",
      "workflowName",
      "workflowMode"
    ],
    "description": "Create workflow transition property",
    "parameterDescriptions": {
      "transitionId": "The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition.",
      "key": "The key of the property being added, also known as the name of the property. Set this to the same value as the `key` defined in the request body.",
      "workflowName": "The name of the workflow that the transition belongs to.",
      "workflowMode": "The workflow status. Set to *live* for inactive workflows or *draft* for draft workflows. Active workflows cannot be edited."
    }
  },
  "updateWorkflowTransitionProperty": {
    "accessPath": [
      "updateWorkflowTransitionProperty"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "key",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflow/transitions/{transitionId}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transitionId"
    ],
    "queryConflictKeys": [
      "key"
    ],
    "queryParameterKeys": [
      "key",
      "workflowName",
      "workflowMode"
    ],
    "description": "Update workflow transition property",
    "parameterDescriptions": {
      "transitionId": "The ID of the transition. To get the ID, view the workflow in text mode in the Jira admin settings. The ID is shown next to the transition.",
      "key": "The key of the property being updated, also known as the name of the property. Set this to the same value as the `key` defined in the request body.",
      "workflowName": "The name of the workflow that the transition belongs to.",
      "workflowMode": "The workflow status. Set to `live` for inactive workflows or `draft` for draft workflows. Active workflows cannot be edited."
    }
  },
  "deleteInactiveWorkflow": {
    "accessPath": [
      "deleteInactiveWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflow/{entityId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entityId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete inactive workflow",
    "parameterDescriptions": {
      "entityId": "The entity ID of the workflow."
    }
  },
  "getWorkflowProjectIssueTypeUsages": {
    "accessPath": [
      "getWorkflowProjectIssueTypeUsages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflow/{workflowId}/project/{projectId}/issueTypeUsages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflowId",
      "projectId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get issue types in a project that are using a given workflow",
    "parameterDescriptions": {
      "workflowId": "The workflow ID",
      "projectId": "The project ID",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "getProjectUsagesForWorkflow": {
    "accessPath": [
      "getProjectUsagesForWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflow/{workflowId}/projectUsages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflowId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get projects using a given workflow",
    "parameterDescriptions": {
      "workflowId": "The workflow ID",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "getWorkflowSchemeUsagesForWorkflow": {
    "accessPath": [
      "getWorkflowSchemeUsagesForWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflow/{workflowId}/workflowSchemes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflowId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get workflow schemes which are using a given workflow",
    "parameterDescriptions": {
      "workflowId": "The workflow ID",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "readWorkflows": {
    "accessPath": [
      "readWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "projectAndIssueTypes",
      "workflowIds",
      "workflowNames"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflows",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk get workflows"
  },
  "workflowCapabilities": {
    "accessPath": [
      "workflowCapabilities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflows/capabilities",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowId",
      "projectId",
      "issueTypeId"
    ],
    "description": "Get available workflow capabilities"
  },
  "createWorkflows": {
    "accessPath": [
      "createWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "scope",
      "statuses",
      "workflows"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflows/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk create workflows"
  },
  "validateCreateWorkflows": {
    "accessPath": [
      "validateCreateWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "payload",
      "validationOptions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflows/create/validation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate create workflows"
  },
  "getDefaultEditor": {
    "accessPath": [
      "getDefaultEditor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflows/defaultEditor",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get the user's default workflow editor"
  },
  "readWorkflowPreviews": {
    "accessPath": [
      "readWorkflowPreviews"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueTypeIds",
      "projectId",
      "workflowIds",
      "workflowNames"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflows/preview",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Preview workflow"
  },
  "searchWorkflows": {
    "accessPath": [
      "searchWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflows/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults",
      "expand",
      "queryString",
      "orderBy",
      "scope",
      "isActive"
    ],
    "description": "Search workflows",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page.",
      "expand": "Use [expand](#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:\n\n *  `values.transitions` Returns the transitions that each workflow is associated with.",
      "queryString": "String used to perform a case-insensitive partial match with workflow name.",
      "orderBy": "[Order](#ordering) the results by a field:\n\n *  `name` Sorts by workflow name.\n *  `created` Sorts by create time.\n *  `updated` Sorts by update time.",
      "scope": "The scope of the workflow. Global for company-managed projects and Project for team-managed projects.",
      "isActive": "Filters active and inactive workflows."
    }
  },
  "updateWorkflows": {
    "accessPath": [
      "updateWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "statuses",
      "workflows"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflows/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk update workflows"
  },
  "validateUpdateWorkflows": {
    "accessPath": [
      "validateUpdateWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "payload",
      "validationOptions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflows/update/validation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate update workflows"
  },
  "getAllWorkflowSchemes": {
    "accessPath": [
      "getAllWorkflowSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "startAt",
      "maxResults"
    ],
    "description": "Get all workflow schemes",
    "parameterDescriptions": {
      "startAt": "The index of the first item to return in a page of results (page offset).",
      "maxResults": "The maximum number of items to return per page."
    }
  },
  "createWorkflowScheme": {
    "accessPath": [
      "createWorkflowScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultWorkflow",
      "description",
      "draft",
      "id",
      "issueTypeMappings",
      "issueTypes",
      "lastModified",
      "lastModifiedUser",
      "name",
      "originalDefaultWorkflow",
      "originalIssueTypeMappings",
      "self",
      "updateDraftIfNeeded"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create workflow scheme"
  },
  "getWorkflowSchemeProjectAssociations": {
    "accessPath": [
      "getWorkflowSchemeProjectAssociations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectId"
    ],
    "description": "Get workflow scheme project associations",
    "parameterDescriptions": {
      "projectId": "The ID of a project to return the workflow schemes for. To include multiple projects, provide an ampersand-Jim: oneseparated list. For example, `projectId=10000&projectId=10001`."
    }
  },
  "assignSchemeToProject": {
    "accessPath": [
      "assignSchemeToProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "projectId",
      "workflowSchemeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign workflow scheme to project"
  },
  "switchWorkflowSchemeForProject": {
    "accessPath": [
      "switchWorkflowSchemeForProject"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "mappingsByIssueTypeOverride",
      "projectId",
      "targetSchemeId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme/project/switch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Switch workflow scheme for project"
  },
  "readWorkflowSchemes": {
    "accessPath": [
      "readWorkflowSchemes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "projectIds",
      "workflowSchemeIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme/read",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk get workflow schemes"
  },
  "updateSchemes": {
    "accessPath": [
      "updateSchemes"
    ],
    "bodyAllowsAdditionalProperties": true,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultWorkflowId",
      "description",
      "id",
      "name",
      "statusMappingsByIssueTypeOverride",
      "statusMappingsByWorkflows",
      "version",
      "workflowsForIssueTypes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update workflow scheme"
  },
  "getRequiredWorkflowSchemeMappings": {
    "accessPath": [
      "getRequiredWorkflowSchemeMappings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultWorkflowId",
      "id",
      "workflowsForIssueTypes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme/update/mappings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get required status mappings for workflow scheme update"
  },
  "deleteWorkflowScheme": {
    "accessPath": [
      "deleteWorkflowScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*."
    }
  },
  "getWorkflowScheme": {
    "accessPath": [
      "getWorkflowScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "returnDraftIfExists"
    ],
    "description": "Get workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*.",
      "returnDraftIfExists": "Returns the workflow scheme's draft rather than scheme itself, if set to true. If the workflow scheme does not have a draft, then the workflow scheme is returned."
    }
  },
  "updateWorkflowScheme": {
    "accessPath": [
      "updateWorkflowScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultWorkflow",
      "description",
      "draft",
      "id",
      "issueTypeMappings",
      "issueTypes",
      "lastModified",
      "lastModifiedUser",
      "name",
      "originalDefaultWorkflow",
      "originalIssueTypeMappings",
      "self",
      "updateDraftIfNeeded"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Classic update workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the URL as `schemeId`. For example, *schemeId=10301*."
    }
  },
  "createWorkflowSchemeDraftFromParent": {
    "accessPath": [
      "createWorkflowSchemeDraftFromParent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/createdraft",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the active workflow scheme that the draft is created from."
    }
  },
  "deleteDefaultWorkflow": {
    "accessPath": [
      "deleteDefaultWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "updateDraftIfNeeded"
    ],
    "description": "Delete default workflow",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "updateDraftIfNeeded": "Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the workflow scheme cannot be edited. Defaults to `false`."
    }
  },
  "getDefaultWorkflow": {
    "accessPath": [
      "getDefaultWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "returnDraftIfExists"
    ],
    "description": "Get default workflow",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "returnDraftIfExists": "Set to `true` to return the default workflow for the workflow scheme's draft rather than scheme itself. If the workflow scheme does not have a draft, then the default workflow for the workflow scheme is returned."
    }
  },
  "updateDefaultWorkflow": {
    "accessPath": [
      "updateDefaultWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "updateDraftIfNeeded",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update default workflow",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme."
    }
  },
  "deleteWorkflowSchemeDraft": {
    "accessPath": [
      "deleteWorkflowSchemeDraft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the active workflow scheme that the draft was created from."
    }
  },
  "getWorkflowSchemeDraft": {
    "accessPath": [
      "getWorkflowSchemeDraft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the active workflow scheme that the draft was created from."
    }
  },
  "updateWorkflowSchemeDraft": {
    "accessPath": [
      "updateWorkflowSchemeDraft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultWorkflow",
      "description",
      "draft",
      "id",
      "issueTypeMappings",
      "issueTypes",
      "lastModified",
      "lastModifiedUser",
      "name",
      "originalDefaultWorkflow",
      "originalIssueTypeMappings",
      "self",
      "updateDraftIfNeeded"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the active workflow scheme that the draft was created from."
    }
  },
  "deleteDraftDefaultWorkflow": {
    "accessPath": [
      "deleteDraftDefaultWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete draft default workflow",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to."
    }
  },
  "getDraftDefaultWorkflow": {
    "accessPath": [
      "getDraftDefaultWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get draft default workflow",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to."
    }
  },
  "updateDraftDefaultWorkflow": {
    "accessPath": [
      "updateDraftDefaultWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "updateDraftIfNeeded",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update draft default workflow",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to."
    }
  },
  "deleteWorkflowSchemeDraftIssueType": {
    "accessPath": [
      "deleteWorkflowSchemeDraftIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "issueType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete workflow for issue type in draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "issueType": "The ID of the issue type."
    }
  },
  "getWorkflowSchemeDraftIssueType": {
    "accessPath": [
      "getWorkflowSchemeDraftIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "issueType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get workflow for issue type in draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "issueType": "The ID of the issue type."
    }
  },
  "setWorkflowSchemeDraftIssueType": {
    "accessPath": [
      "setWorkflowSchemeDraftIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueType",
      "updateDraftIfNeeded",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/issuetype/{issueType}",
    "pathConflictKeys": [
      "issueType"
    ],
    "pathParameterKeys": [
      "id",
      "issueType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set workflow for issue type in draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "issueType": "The ID of the issue type."
    }
  },
  "publishDraftWorkflowScheme": {
    "accessPath": [
      "publishDraftWorkflowScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "statusMappings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/publish",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "validateOnly"
    ],
    "description": "Publish draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "validateOnly": "Whether the request only performs a validation."
    }
  },
  "deleteDraftWorkflowMapping": {
    "accessPath": [
      "deleteDraftWorkflowMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/workflow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowName"
    ],
    "description": "Delete issue types for workflow in draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "workflowName": "The name of the workflow."
    }
  },
  "getDraftWorkflow": {
    "accessPath": [
      "getDraftWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/workflow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowName"
    ],
    "description": "Get issue types for workflows in draft workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "workflowName": "The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow."
    }
  },
  "updateDraftWorkflowMapping": {
    "accessPath": [
      "updateDraftWorkflowMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultMapping",
      "issueTypes",
      "updateDraftIfNeeded",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/draft/workflow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowName"
    ],
    "description": "Set issue types for workflow in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme that the draft belongs to.",
      "workflowName": "The name of the workflow."
    }
  },
  "deleteWorkflowSchemeIssueType": {
    "accessPath": [
      "deleteWorkflowSchemeIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "issueType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "updateDraftIfNeeded"
    ],
    "description": "Delete workflow for issue type in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "issueType": "The ID of the issue type.",
      "updateDraftIfNeeded": "Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`."
    }
  },
  "getWorkflowSchemeIssueType": {
    "accessPath": [
      "getWorkflowSchemeIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "issueType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "returnDraftIfExists"
    ],
    "description": "Get workflow for issue type in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "issueType": "The ID of the issue type.",
      "returnDraftIfExists": "Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned."
    }
  },
  "setWorkflowSchemeIssueType": {
    "accessPath": [
      "setWorkflowSchemeIssueType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueType",
      "updateDraftIfNeeded",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/issuetype/{issueType}",
    "pathConflictKeys": [
      "issueType"
    ],
    "pathParameterKeys": [
      "id",
      "issueType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set workflow for issue type in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "issueType": "The ID of the issue type."
    }
  },
  "deleteWorkflowMapping": {
    "accessPath": [
      "deleteWorkflowMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/workflow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowName",
      "updateDraftIfNeeded"
    ],
    "description": "Delete issue types for workflow in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "workflowName": "The name of the workflow.",
      "updateDraftIfNeeded": "Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the workflow scheme cannot be edited. Defaults to `false`."
    }
  },
  "getWorkflow": {
    "accessPath": [
      "getWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/workflow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowName",
      "returnDraftIfExists"
    ],
    "description": "Get issue types for workflows in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "workflowName": "The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow.",
      "returnDraftIfExists": "Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned."
    }
  },
  "updateWorkflowMapping": {
    "accessPath": [
      "updateWorkflowMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaultMapping",
      "issueTypes",
      "updateDraftIfNeeded",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/api/3/workflowscheme/{id}/workflow",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workflowName"
    ],
    "description": "Set issue types for workflow in workflow scheme",
    "parameterDescriptions": {
      "id": "The ID of the workflow scheme.",
      "workflowName": "The name of the workflow."
    }
  },
  "getProjectUsagesForWorkflowScheme": {
    "accessPath": [
      "getProjectUsagesForWorkflowScheme"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/workflowscheme/{workflowSchemeId}/projectUsages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflowSchemeId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "nextPageToken",
      "maxResults"
    ],
    "description": "Get projects which are using a given workflow scheme",
    "parameterDescriptions": {
      "workflowSchemeId": "The workflow scheme ID",
      "nextPageToken": "The cursor for pagination",
      "maxResults": "The maximum number of results to return. Must be an integer between 1 and 200."
    }
  },
  "getIdsOfWorklogsDeletedSince": {
    "accessPath": [
      "getIdsOfWorklogsDeletedSince"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/worklog/deleted",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "since"
    ],
    "description": "Get IDs of deleted worklogs",
    "parameterDescriptions": {
      "since": "The date and time, as a UNIX timestamp in milliseconds, after which deleted worklogs are returned."
    }
  },
  "getWorklogsForIds": {
    "accessPath": [
      "getWorklogsForIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/api/3/worklog/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get worklogs",
    "parameterDescriptions": {
      "expand": "Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog."
    }
  },
  "getIdsOfWorklogsModifiedSince": {
    "accessPath": [
      "getIdsOfWorklogsModifiedSince"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/api/3/worklog/updated",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "since",
      "expand"
    ],
    "description": "Get IDs of updated worklogs",
    "parameterDescriptions": {
      "since": "The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned.",
      "expand": "Use [expand](#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog."
    }
  },
  "AddonPropertiesResource.getAddonProperties_get": {
    "accessPath": [
      "addonPropertiesResourceGetAddonPropertiesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/atlassian-connect/1/addons/{addonKey}/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "addonKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get app properties",
    "parameterDescriptions": {
      "addonKey": "The key of the app, as defined in its descriptor."
    }
  },
  "AddonPropertiesResource.deleteAddonProperty_delete": {
    "accessPath": [
      "addonPropertiesResourceDeleteAddonPropertyDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "addonKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete app property",
    "parameterDescriptions": {
      "addonKey": "The key of the app, as defined in its descriptor.",
      "propertyKey": "The key of the property."
    }
  },
  "AddonPropertiesResource.getAddonProperty_get": {
    "accessPath": [
      "addonPropertiesResourceGetAddonPropertyGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "addonKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get app property",
    "parameterDescriptions": {
      "addonKey": "The key of the app, as defined in its descriptor.",
      "propertyKey": "The key of the property."
    }
  },
  "AddonPropertiesResource.putAddonProperty_put": {
    "accessPath": [
      "addonPropertiesResourcePutAddonPropertyPut"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/atlassian-connect/1/addons/{addonKey}/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "addonKey",
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set app property",
    "parameterDescriptions": {
      "addonKey": "The key of the app, as defined in its descriptor.",
      "propertyKey": "The key of the property."
    }
  },
  "DynamicModulesResource.removeModules_delete": {
    "accessPath": [
      "dynamicModulesResourceRemoveModulesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/atlassian-connect/1/app/module/dynamic",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "moduleKey"
    ],
    "description": "Remove modules",
    "parameterDescriptions": {
      "moduleKey": "The key of the module to remove. To include multiple module keys, provide multiple copies of this parameter.\nFor example, `moduleKey=dynamic-attachment-entity-property&moduleKey=dynamic-select-field`.\nNonexistent keys are ignored."
    }
  },
  "DynamicModulesResource.getModules_get": {
    "accessPath": [
      "dynamicModulesResourceGetModulesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/atlassian-connect/1/app/module/dynamic",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get modules"
  },
  "DynamicModulesResource.registerModules_post": {
    "accessPath": [
      "dynamicModulesResourceRegisterModulesPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "modules"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/atlassian-connect/1/app/module/dynamic",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register modules"
  },
  "AppIssueFieldValueUpdateResource.updateIssueFields_put": {
    "accessPath": [
      "appIssueFieldValueUpdateResourceUpdateIssueFieldsPut"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "updateValueList"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Atlassian-Transfer-Id"
    ],
    "method": "PUT",
    "routeTemplate": "/rest/atlassian-connect/1/migration/field",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk update custom field value",
    "parameterDescriptions": {
      "Atlassian-Transfer-Id": "The ID of the transfer."
    }
  },
  "MigrationResource.updateEntityPropertiesValue_put": {
    "accessPath": [
      "migrationResourceUpdateEntityPropertiesValuePut"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Atlassian-Transfer-Id"
    ],
    "method": "PUT",
    "routeTemplate": "/rest/atlassian-connect/1/migration/properties/{entityType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entityType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk update entity properties",
    "parameterDescriptions": {
      "Atlassian-Transfer-Id": "The app migration transfer ID.",
      "entityType": "The type indicating the object that contains the entity properties."
    }
  },
  "MigrationResource.workflowRuleSearch_post": {
    "accessPath": [
      "migrationResourceWorkflowRuleSearchPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "ruleIds",
      "workflowEntityId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Atlassian-Transfer-Id"
    ],
    "method": "POST",
    "routeTemplate": "/rest/atlassian-connect/1/migration/workflow/rule/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get workflow transition rule configurations",
    "parameterDescriptions": {
      "Atlassian-Transfer-Id": "The app migration transfer ID."
    }
  },
  "ConnectToForgeMigrationFetchTaskResource.fetchMigrationTask_get": {
    "accessPath": [
      "connectToForgeMigrationFetchTaskResourceFetchMigrationTaskGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/atlassian-connect/1/migration/{connectKey}/{jiraIssueFieldsKey}/task",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connectKey",
      "jiraIssueFieldsKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Connect issue field migration task",
    "parameterDescriptions": {
      "connectKey": "The key of the Connect app that contains the Jira issue field being migrated.",
      "jiraIssueFieldsKey": "The module key of the Connect issue field being migrated."
    }
  },
  "ConnectToForgeMigrationTaskSubmissionResource.submitTask_post": {
    "accessPath": [
      "connectToForgeMigrationTaskSubmissionResourceSubmitTaskPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/atlassian-connect/1/migration/{connectKey}/{jiraIssueFieldsKey}/task",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connectKey",
      "jiraIssueFieldsKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit Connect issue field migration task",
    "parameterDescriptions": {
      "connectKey": "The key of the Connect app that contains the Jira issue field being migrated.",
      "jiraIssueFieldsKey": "The module key of the Connect issue field being migrated."
    }
  },
  "ServiceRegistryResource.services_get": {
    "accessPath": [
      "serviceRegistryResourceServicesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/atlassian-connect/1/service-registry",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "serviceIds"
    ],
    "description": "Retrieve the attributes of service registries",
    "parameterDescriptions": {
      "serviceIds": "The ID of the services (the strings starting with \"b:\" need to be decoded in Base64)."
    }
  },
  "getForgeAppPropertyKeys": {
    "accessPath": [
      "getForgeAppPropertyKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/forge/1/app/properties",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get app property keys (Forge)"
  },
  "deleteForgeAppProperty": {
    "accessPath": [
      "deleteForgeAppProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/rest/forge/1/app/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete app property (Forge)",
    "parameterDescriptions": {
      "propertyKey": "The key of the property."
    }
  },
  "getForgeAppProperty": {
    "accessPath": [
      "getForgeAppProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rest/forge/1/app/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get app property (Forge)",
    "parameterDescriptions": {
      "propertyKey": "The key of the property."
    }
  },
  "putForgeAppProperty": {
    "accessPath": [
      "putForgeAppProperty"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/rest/forge/1/app/properties/{propertyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "propertyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set app property (Forge)",
    "parameterDescriptions": {
      "propertyKey": "The key of the property."
    }
  },
  "getWorklogsByIssueIdAndWorklogId": {
    "accessPath": [
      "getWorklogsByIssueIdAndWorklogId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "requests"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/rest/internal/api/latest/worklog/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get worklogs by issue id and worklog id"
  }
} satisfies ToolRuntimeMetadataMap;
