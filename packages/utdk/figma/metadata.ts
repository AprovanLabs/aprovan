import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getFile": {
    "accessPath": [
      "getFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "version",
      "ids",
      "depth",
      "geometry",
      "plugin_data",
      "branch_data"
    ]
  },
  "getFileNodes": {
    "accessPath": [
      "getFileNodes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/nodes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids",
      "version",
      "depth",
      "geometry",
      "plugin_data"
    ]
  },
  "getImages": {
    "accessPath": [
      "getImages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/images/{file_key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ids",
      "version",
      "scale",
      "format",
      "svg_outline_text",
      "svg_include_id",
      "svg_include_node_id",
      "svg_simplify_stroke",
      "contents_only",
      "use_absolute_bounds"
    ]
  },
  "getImageFills": {
    "accessPath": [
      "getImageFills"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/images",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getFileMeta": {
    "accessPath": [
      "getFileMeta"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/meta",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getTeamProjects": {
    "accessPath": [
      "getTeamProjects"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/teams/{team_id}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getProjectFiles": {
    "accessPath": [
      "getProjectFiles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/{project_id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "branch_data"
    ]
  },
  "getFileVersions": {
    "accessPath": [
      "getFileVersions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "before",
      "after"
    ]
  },
  "getComments": {
    "accessPath": [
      "getComments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "as_md"
    ]
  },
  "postComment": {
    "accessPath": [
      "postComment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "message",
      "comment_id",
      "client_meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files/{file_key}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteComment": {
    "accessPath": [
      "deleteComment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/files/{file_key}/comments/{comment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key",
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getCommentReactions": {
    "accessPath": [
      "getCommentReactions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/comments/{comment_id}/reactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key",
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor"
    ]
  },
  "postCommentReaction": {
    "accessPath": [
      "postCommentReaction"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "emoji"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files/{file_key}/comments/{comment_id}/reactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key",
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteCommentReaction": {
    "accessPath": [
      "deleteCommentReaction"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/files/{file_key}/comments/{comment_id}/reactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key",
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "emoji"
    ]
  },
  "getMe": {
    "accessPath": [
      "getMe"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getTeamComponents": {
    "accessPath": [
      "getTeamComponents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/teams/{team_id}/components",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "after",
      "before"
    ]
  },
  "getFileComponents": {
    "accessPath": [
      "getFileComponents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/components",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getComponent": {
    "accessPath": [
      "getComponent"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/components/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getTeamComponentSets": {
    "accessPath": [
      "getTeamComponentSets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/teams/{team_id}/component_sets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "after",
      "before"
    ]
  },
  "getFileComponentSets": {
    "accessPath": [
      "getFileComponentSets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/component_sets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getComponentSet": {
    "accessPath": [
      "getComponentSet"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/component_sets/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getTeamStyles": {
    "accessPath": [
      "getTeamStyles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/teams/{team_id}/styles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "after",
      "before"
    ]
  },
  "getFileStyles": {
    "accessPath": [
      "getFileStyles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/styles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getStyle": {
    "accessPath": [
      "getStyle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/styles/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getWebhooks": {
    "accessPath": [
      "getWebhooks"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "context",
      "context_id",
      "plan_api_id",
      "cursor"
    ]
  },
  "postWebhook": {
    "accessPath": [
      "postWebhook"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "event_type",
      "team_id",
      "context",
      "context_id",
      "endpoint",
      "passcode",
      "status",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v2/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getWebhook": {
    "accessPath": [
      "getWebhook"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "putWebhook": {
    "accessPath": [
      "putWebhook"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "event_type",
      "endpoint",
      "passcode",
      "status",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v2/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteWebhook": {
    "accessPath": [
      "deleteWebhook"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v2/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getTeamWebhooks": {
    "accessPath": [
      "getTeamWebhooks"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/teams/{team_id}/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getWebhookRequests": {
    "accessPath": [
      "getWebhookRequests"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v2/webhooks/{webhook_id}/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getActivityLogs": {
    "accessPath": [
      "getActivityLogs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/activity_logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "events",
      "start_time",
      "end_time",
      "limit",
      "order"
    ]
  },
  "getPayments": {
    "accessPath": [
      "getPayments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "plugin_payment_token",
      "user_id",
      "community_file_id",
      "plugin_id",
      "widget_id"
    ]
  },
  "getLocalVariables": {
    "accessPath": [
      "getLocalVariables"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/variables/local",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getPublishedVariables": {
    "accessPath": [
      "getPublishedVariables"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/variables/published",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "postVariables": {
    "accessPath": [
      "postVariables"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "variableCollections",
      "variableModes",
      "variables",
      "variableModeValues"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files/{file_key}/variables",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getDevResources": {
    "accessPath": [
      "getDevResources"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_key}/dev_resources",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "node_ids"
    ]
  },
  "postDevResources": {
    "accessPath": [
      "postDevResources"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dev_resources"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/dev_resources",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "putDevResources": {
    "accessPath": [
      "putDevResources"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dev_resources"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/dev_resources",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteDevResource": {
    "accessPath": [
      "deleteDevResource"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/files/{file_key}/dev_resources/{dev_resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key",
      "dev_resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getLibraryAnalyticsComponentActions": {
    "accessPath": [
      "getLibraryAnalyticsComponentActions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/analytics/libraries/{file_key}/component/actions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "group_by",
      "start_date",
      "end_date"
    ]
  },
  "getLibraryAnalyticsComponentUsages": {
    "accessPath": [
      "getLibraryAnalyticsComponentUsages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/analytics/libraries/{file_key}/component/usages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "group_by"
    ]
  },
  "getLibraryAnalyticsStyleActions": {
    "accessPath": [
      "getLibraryAnalyticsStyleActions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/analytics/libraries/{file_key}/style/actions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "group_by",
      "start_date",
      "end_date"
    ]
  },
  "getLibraryAnalyticsStyleUsages": {
    "accessPath": [
      "getLibraryAnalyticsStyleUsages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/analytics/libraries/{file_key}/style/usages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "group_by"
    ]
  },
  "getLibraryAnalyticsVariableActions": {
    "accessPath": [
      "getLibraryAnalyticsVariableActions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/analytics/libraries/{file_key}/variable/actions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "group_by",
      "start_date",
      "end_date"
    ]
  },
  "getLibraryAnalyticsVariableUsages": {
    "accessPath": [
      "getLibraryAnalyticsVariableUsages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/analytics/libraries/{file_key}/variable/usages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "group_by"
    ]
  },
  "getOEmbed": {
    "accessPath": [
      "getOEmbed"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/oembed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "url",
      "maxwidth",
      "maxheight"
    ]
  }
} satisfies ToolRuntimeMetadataMap;
