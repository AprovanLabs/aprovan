import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getRoot": {
    "accessPath": [
      "getRoot"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Root resource"
  },
  "getRelayProxyConfigs": {
    "accessPath": [
      "getRelayProxyConfigs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/account/relay-auto-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Relay Proxy configs"
  },
  "postRelayAutoConfig": {
    "accessPath": [
      "postRelayAutoConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "policy"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/account/relay-auto-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Relay Proxy config"
  },
  "getRelayProxyConfig": {
    "accessPath": [
      "getRelayProxyConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/account/relay-auto-configs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Relay Proxy config",
    "parameterDescriptions": {
      "id": "The relay auto config id"
    }
  },
  "patchRelayAutoConfig": {
    "accessPath": [
      "patchRelayAutoConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "patch",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/account/relay-auto-configs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Relay Proxy config",
    "parameterDescriptions": {
      "id": "The relay auto config id"
    }
  },
  "deleteRelayAutoConfig": {
    "accessPath": [
      "deleteRelayAutoConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/account/relay-auto-configs/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Relay Proxy config by ID",
    "parameterDescriptions": {
      "id": "The relay auto config id"
    }
  },
  "resetRelayAutoConfig": {
    "accessPath": [
      "resetRelayAutoConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/account/relay-auto-configs/{id}/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expiry"
    ],
    "description": "Reset Relay Proxy configuration key",
    "parameterDescriptions": {
      "id": "The Relay Proxy configuration ID",
      "expiry": "An expiration time for the old Relay Proxy configuration key, expressed as a Unix epoch time in milliseconds. By default, the Relay Proxy configuration will expire immediately."
    }
  },
  "getApplications": {
    "accessPath": [
      "getApplications"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/applications",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "limit",
      "offset",
      "sort",
      "expand"
    ],
    "description": "Get applications",
    "parameterDescriptions": {
      "filter": "Accepts filter by `key`, `name`, `kind`, and `autoAdded`. To learn more about the filter syntax, read [Filtering applications and application versions](https://launchdarkly.com/docs/api/applications-beta#filtering-applications-and-application-versions).",
      "limit": "The number of applications to return. Defaults to 10.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "sort": "Accepts sorting order and fields. Fields can be comma separated. Possible fields are `creationDate`, `name`. Examples: `sort=name` sort by names ascending, `sort=-name,creationDate` sort by names descending and creationDate ascending.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Options: `flags`."
    }
  },
  "getApplication": {
    "accessPath": [
      "getApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/applications/{applicationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get application by key",
    "parameterDescriptions": {
      "applicationKey": "The application key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Options: `flags`."
    }
  },
  "patchApplication": {
    "accessPath": [
      "patchApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/applications/{applicationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update application",
    "parameterDescriptions": {
      "applicationKey": "The application key"
    }
  },
  "deleteApplication": {
    "accessPath": [
      "deleteApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/applications/{applicationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete application",
    "parameterDescriptions": {
      "applicationKey": "The application key"
    }
  },
  "getApplicationVersions": {
    "accessPath": [
      "getApplicationVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/applications/{applicationKey}/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "limit",
      "offset",
      "sort"
    ],
    "description": "Get application versions by application key",
    "parameterDescriptions": {
      "filter": "Accepts filter by `key`, `name`, `supported`, and `autoAdded`. To learn more about the filter syntax, read [Filtering applications and application versions](https://launchdarkly.com/docs/api/applications-beta#filtering-applications-and-application-versions).",
      "applicationKey": "The application key",
      "limit": "The number of versions to return. Defaults to 50.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "sort": "Accepts sorting order and fields. Fields can be comma separated. Possible fields are `creationDate`, `name`. Examples: `sort=name` sort by names ascending, `sort=-name,creationDate` sort by names descending and creationDate ascending."
    }
  },
  "patchApplicationVersion": {
    "accessPath": [
      "patchApplicationVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/applications/{applicationKey}/versions/{versionKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey",
      "versionKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update application version",
    "parameterDescriptions": {
      "applicationKey": "The application key",
      "versionKey": "The application version key"
    }
  },
  "deleteApplicationVersion": {
    "accessPath": [
      "deleteApplicationVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/applications/{applicationKey}/versions/{versionKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "applicationKey",
      "versionKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete application version",
    "parameterDescriptions": {
      "applicationKey": "The application key",
      "versionKey": "The application version key"
    }
  },
  "getApprovalRequests": {
    "accessPath": [
      "getApprovalRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/approval-requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "expand",
      "limit",
      "offset"
    ],
    "description": "List approval requests",
    "parameterDescriptions": {
      "filter": "A comma-separated list of filters. Each filter is of the form `field operator value`. Supported fields are explained above.",
      "expand": "A comma-separated list of fields to expand in the response. Supported fields are explained above.",
      "limit": "The number of approvals to return. Defaults to 20. Maximum limit is 200.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postApprovalRequest": {
    "accessPath": [
      "postApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "resourceId",
      "comment",
      "description",
      "instructions",
      "notifyMemberIds",
      "notifyTeamKeys",
      "integrationConfig"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/approval-requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create approval request"
  },
  "getApprovalRequest": {
    "accessPath": [
      "getApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/approval-requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get approval request",
    "parameterDescriptions": {
      "id": "The approval request ID",
      "expand": "A comma-separated list of fields to expand in the response. Supported fields are explained above."
    }
  },
  "patchApprovalRequest": {
    "accessPath": [
      "patchApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/approval-requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update approval request",
    "parameterDescriptions": {
      "id": "The approval ID"
    }
  },
  "deleteApprovalRequest": {
    "accessPath": [
      "deleteApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/approval-requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete approval request",
    "parameterDescriptions": {
      "id": "The approval request ID"
    }
  },
  "postApprovalRequestApply": {
    "accessPath": [
      "postApprovalRequestApply"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/approval-requests/{id}/apply",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Apply approval request",
    "parameterDescriptions": {
      "id": "The approval request ID"
    }
  },
  "postApprovalRequestReview": {
    "accessPath": [
      "postApprovalRequestReview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "kind",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/approval-requests/{id}/reviews",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Review approval request",
    "parameterDescriptions": {
      "id": "The approval request ID"
    }
  },
  "getAuditLogEntries": {
    "accessPath": [
      "getAuditLogEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/auditlog",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "after",
      "q",
      "limit",
      "spec"
    ],
    "description": "List audit log entries",
    "parameterDescriptions": {
      "before": "A timestamp filter, expressed as a Unix epoch time in milliseconds.  All entries this returns occurred before the timestamp.",
      "after": "A timestamp filter, expressed as a Unix epoch time in milliseconds. All entries this returns occurred after the timestamp.",
      "q": "Text to search for. You can search for the full or partial name of the resource.",
      "limit": "A limit on the number of audit log entries that return. Set between 1 and 20. The default is 10.",
      "spec": "A resource specifier that lets you filter audit log listings by resource"
    }
  },
  "postAuditLogEntries": {
    "accessPath": [
      "postAuditLogEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/auditlog",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "after",
      "q",
      "limit"
    ],
    "description": "Search audit log entries",
    "parameterDescriptions": {
      "before": "A timestamp filter, expressed as a Unix epoch time in milliseconds.  All entries returned occurred before the timestamp.",
      "after": "A timestamp filter, expressed as a Unix epoch time in milliseconds. All entries returned occurred after the timestamp.",
      "q": "Text to search for. You can search for the full or partial name of the resource.",
      "limit": "A limit on the number of audit log entries that return. Set between 1 and 20. The default is 10."
    }
  },
  "postAuditLogEntryCounts": {
    "accessPath": [
      "postAuditLogEntryCounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/auditlog/counts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "before",
      "after",
      "buckets"
    ],
    "description": "Get audit log entry counts",
    "parameterDescriptions": {
      "before": "A timestamp filter, expressed as a Unix epoch time in milliseconds. Defaults to now.",
      "after": "A timestamp filter, expressed as a Unix epoch time in milliseconds. Required.",
      "buckets": "Number of time buckets to divide the range into. Default 50, max 500."
    }
  },
  "getAuditLogEntry": {
    "accessPath": [
      "getAuditLogEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/auditlog/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get audit log entry",
    "parameterDescriptions": {
      "id": "The ID of the audit log entry"
    }
  },
  "getCallerIdentity": {
    "accessPath": [
      "getCallerIdentity"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/caller-identity",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Identify the caller"
  },
  "getExtinctions": {
    "accessPath": [
      "getExtinctions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/extinctions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "repoName",
      "branchName",
      "projKey",
      "flagKey",
      "from",
      "to"
    ],
    "description": "List extinctions",
    "parameterDescriptions": {
      "repoName": "Filter results to a specific repository",
      "branchName": "Filter results to a specific branch. By default, only the default branch will be queried for extinctions.",
      "projKey": "Filter results to a specific project",
      "flagKey": "Filter results to a specific flag key",
      "from": "Filter results to a specific timeframe based on commit time, expressed as a Unix epoch time in milliseconds. Must be used with `to`.",
      "to": "Filter results to a specific timeframe based on commit time, expressed as a Unix epoch time in milliseconds. Must be used with `from`."
    }
  },
  "getRepositories": {
    "accessPath": [
      "getRepositories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/repositories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "withBranches",
      "withReferencesForDefaultBranch",
      "projKey",
      "flagKey"
    ],
    "description": "List repositories",
    "parameterDescriptions": {
      "withBranches": "If set to any value, the endpoint returns repositories with associated branch data",
      "withReferencesForDefaultBranch": "If set to any value, the endpoint returns repositories with associated branch data, as well as code references for the default git branch",
      "projKey": "A LaunchDarkly project key. If provided, this filters code reference results to the specified project.",
      "flagKey": "If set to any value, the endpoint returns repositories with associated branch data, as well as code references for the default git branch"
    }
  },
  "postRepository": {
    "accessPath": [
      "postRepository"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "sourceLink",
      "commitUrlTemplate",
      "hunkUrlTemplate",
      "type",
      "defaultBranch"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/code-refs/repositories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create repository"
  },
  "getRepository": {
    "accessPath": [
      "getRepository"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get repository",
    "parameterDescriptions": {
      "repo": "The repository name"
    }
  },
  "patchRepository": {
    "accessPath": [
      "patchRepository"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update repository",
    "parameterDescriptions": {
      "repo": "The repository name"
    }
  },
  "deleteRepository": {
    "accessPath": [
      "deleteRepository"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete repository",
    "parameterDescriptions": {
      "repo": "The repository name"
    }
  },
  "deleteBranches": {
    "accessPath": [
      "deleteBranches"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}/branch-delete-tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete branches",
    "parameterDescriptions": {
      "repo": "The repository name to delete branches for."
    }
  },
  "getBranches": {
    "accessPath": [
      "getBranches"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}/branches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List branches",
    "parameterDescriptions": {
      "repo": "The repository name"
    }
  },
  "getBranch": {
    "accessPath": [
      "getBranch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}/branches/{branch}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo",
      "branch"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projKey",
      "flagKey"
    ],
    "description": "Get branch",
    "parameterDescriptions": {
      "repo": "The repository name",
      "branch": "The url-encoded branch name",
      "projKey": "Filter results to a specific project",
      "flagKey": "Filter results to a specific flag key"
    }
  },
  "putBranch": {
    "accessPath": [
      "putBranch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "head",
      "updateSequenceId",
      "syncTime",
      "references",
      "commitTime"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}/branches/{branch}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo",
      "branch"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upsert branch",
    "parameterDescriptions": {
      "repo": "The repository name",
      "branch": "The URL-encoded branch name"
    }
  },
  "postExtinction": {
    "accessPath": [
      "postExtinction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/code-refs/repositories/{repo}/branches/{branch}/extinction-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repo",
      "branch"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create extinction",
    "parameterDescriptions": {
      "repo": "The repository name",
      "branch": "The URL-encoded branch name"
    }
  },
  "getRootStatistic": {
    "accessPath": [
      "getRootStatistic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/statistics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get links to code reference repositories for each project"
  },
  "getStatistics": {
    "accessPath": [
      "getStatistics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/code-refs/statistics/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "flagKey"
    ],
    "description": "Get code references statistics for flags",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "Filter results to a specific flag key"
    }
  },
  "getDestinations": {
    "accessPath": [
      "getDestinations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/destinations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List destinations"
  },
  "postGenerateWarehouseDestinationKeyPair": {
    "accessPath": [
      "postGenerateWarehouseDestinationKeyPair"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/destinations/generate-warehouse-destination-key-pair",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate Snowflake destination key pair"
  },
  "postGenerateTrustPolicy": {
    "accessPath": [
      "postGenerateTrustPolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/destinations/projects/{projKey}/environments/{envKey}/generate-trust-policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projKey",
      "envKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate trust policy",
    "parameterDescriptions": {
      "projKey": "The project key",
      "envKey": "The environment key"
    }
  },
  "postGenerateProjectEnvWarehouseDestinationKeyPair": {
    "accessPath": [
      "postGenerateProjectEnvWarehouseDestinationKeyPair"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/destinations/projects/{projKey}/environments/{envKey}/generate-warehouse-destination-key-pair",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projKey",
      "envKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate Snowflake destination key pair",
    "parameterDescriptions": {
      "projKey": "The project key",
      "envKey": "The environment key"
    }
  },
  "postCompleteWarehouseDestinationSetup": {
    "accessPath": [
      "postCompleteWarehouseDestinationSetup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "publicKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/destinations/projects/{projKey}/environments/{envKey}/kinds/{kind}/complete-setup",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projKey",
      "envKey",
      "kind"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Complete warehouse destination setup",
    "parameterDescriptions": {
      "projKey": "The project key",
      "envKey": "The environment key",
      "kind": "The destination kind (snowflake-v2)"
    }
  },
  "postGenerateWarehouseDestinationSetupScript": {
    "accessPath": [
      "postGenerateWarehouseDestinationSetupScript"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "snowflakeHostAddress",
      "databaseName",
      "warehouseName",
      "roleName",
      "schemaName",
      "userName",
      "includeNetworkPolicy",
      "clusterIdentifier",
      "clusterRegion",
      "clusterAwsAccountId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/destinations/projects/{projKey}/environments/{envKey}/kinds/{kind}/setup",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projKey",
      "envKey",
      "kind"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate warehouse destination setup script",
    "parameterDescriptions": {
      "projKey": "The project key",
      "envKey": "The environment key",
      "kind": "The destination kind (snowflake-v2, redshift)"
    }
  },
  "postDestination": {
    "accessPath": [
      "postDestination"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "kind",
      "config",
      "on"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/destinations/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Data Export destination",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getDestination": {
    "accessPath": [
      "getDestination"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/destinations/{projectKey}/{environmentKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get destination",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "id": "The Data Export destination ID"
    }
  },
  "patchDestination": {
    "accessPath": [
      "patchDestination"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/destinations/{projectKey}/{environmentKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Data Export destination",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "id": "The Data Export destination ID"
    }
  },
  "deleteDestination": {
    "accessPath": [
      "deleteDestination"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/destinations/{projectKey}/{environmentKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Data Export destination",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "id": "The Data Export destination ID"
    }
  },
  "getFlagLinks": {
    "accessPath": [
      "getFlagLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flag-links/projects/{projectKey}/flags/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List flag links",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "createFlagLink": {
    "accessPath": [
      "createFlagLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "integrationKey",
      "timestamp",
      "deepLink",
      "title",
      "description",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/flag-links/projects/{projectKey}/flags/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create flag link",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "updateFlagLink": {
    "accessPath": [
      "updateFlagLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/flag-links/projects/{projectKey}/flags/{featureFlagKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update flag link",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "id": "The flag link ID"
    }
  },
  "deleteFlagLink": {
    "accessPath": [
      "deleteFlagLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/flag-links/projects/{projectKey}/flags/{featureFlagKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete flag link",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "id": "The flag link ID or Key"
    }
  },
  "getFeatureFlagStatusAcrossEnvironments": {
    "accessPath": [
      "getFeatureFlagStatusAcrossEnvironments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flag-status/{projectKey}/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "env"
    ],
    "description": "Get flag status across environments",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "env": "Optional environment filter"
    }
  },
  "getFeatureFlagStatuses": {
    "accessPath": [
      "getFeatureFlagStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flag-statuses/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List feature flag statuses",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getFeatureFlagStatus": {
    "accessPath": [
      "getFeatureFlagStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flag-statuses/{projectKey}/{environmentKey}/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get feature flag status",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getFeatureFlags": {
    "accessPath": [
      "getFeatureFlags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "env",
      "tag",
      "limit",
      "offset",
      "archived",
      "summary",
      "filter",
      "sort",
      "compare",
      "expand"
    ],
    "description": "List feature flags",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "env": "Filter configurations by environment",
      "tag": "Filter feature flags by tag",
      "limit": "The number of feature flags to return. Defaults to 20.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "archived": "Deprecated, use `filter=archived:true` instead. A boolean to filter the list to archived flags. When this is absent, only unarchived flags will be returned",
      "summary": "By default, flags do _not_ include their lists of prerequisites, targets, or rules for each environment. Set `summary=0` and include the `env` query parameter to include these fields for each flag returned.",
      "filter": "A comma-separated list of filters. Each filter is of the form field:value. Read the endpoint description for a full list of available filter fields.",
      "sort": "A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. Read the endpoint description for a full list of available sort fields.",
      "compare": "Deprecated, unavailable in API version `20240415`. A boolean to filter results by only flags that have differences between environments.",
      "expand": "A comma-separated list of fields to expand in the response. Supported fields are explained above."
    }
  },
  "postFeatureFlag": {
    "accessPath": [
      "postFeatureFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "description",
      "includeInSnippet",
      "clientSideAvailability",
      "variations",
      "temporary",
      "tags",
      "customProperties",
      "defaults",
      "purpose",
      "migrationSettings",
      "maintainerId",
      "maintainerTeamKey",
      "initialPrerequisites",
      "isFlagOn"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/flags/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "clone"
    ],
    "description": "Create a feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "clone": "The key of the feature flag to be cloned. The key identifies the flag in your code. For example, setting `clone=flagKey` copies the full targeting configuration for all environments, including `on/off` state, from the original flag to the new flag."
    }
  },
  "getDependentFlagsByEnv": {
    "accessPath": [
      "getDependentFlagsByEnv"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{environmentKey}/{featureFlagKey}/dependent-flags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List dependent feature flags by environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getFeatureFlag": {
    "accessPath": [
      "getFeatureFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "env",
      "expand"
    ],
    "description": "Get feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "env": "Filter configurations by environment",
      "expand": "A comma-separated list of fields to expand in the response. Supported fields are explained above."
    }
  },
  "patchFeatureFlag": {
    "accessPath": [
      "patchFeatureFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "patch",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ignoreConflicts",
      "dryRun"
    ],
    "description": "Update feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key. The key identifies the flag in your code.",
      "ignoreConflicts": "If true, the patch will be applied even if it causes a pending scheduled change or approval request to fail.",
      "dryRun": "If true, the patch will be validated but not persisted. Returns a preview of the flag after the patch is applied."
    }
  },
  "deleteFeatureFlag": {
    "accessPath": [
      "deleteFeatureFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key. The key identifies the flag in your code."
    }
  },
  "copyFeatureFlag": {
    "accessPath": [
      "copyFeatureFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "source",
      "target",
      "comment",
      "includedActions",
      "excludedActions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/copy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Copy feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key. The key identifies the flag in your code."
    }
  },
  "getDependentFlags": {
    "accessPath": [
      "getDependentFlags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/dependent-flags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List dependent feature flags",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getExpiringContextTargets": {
    "accessPath": [
      "getExpiringContextTargets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/expiring-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get expiring context targets for feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "patchExpiringTargets": {
    "accessPath": [
      "patchExpiringTargets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/expiring-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update expiring context targets on feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getExpiringUserTargets": {
    "accessPath": [
      "getExpiringUserTargets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/expiring-user-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get expiring user targets for feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "patchExpiringUserTargets": {
    "accessPath": [
      "patchExpiringUserTargets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/expiring-user-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update expiring user targets on feature flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getTriggerWorkflows": {
    "accessPath": [
      "getTriggerWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/triggers/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List flag triggers",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "createTriggerWorkflow": {
    "accessPath": [
      "createTriggerWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions",
      "integrationKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/triggers/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create flag trigger",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getTriggerWorkflowById": {
    "accessPath": [
      "getTriggerWorkflowById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/triggers/{environmentKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get flag trigger by ID",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The flag trigger ID"
    }
  },
  "patchTriggerWorkflow": {
    "accessPath": [
      "patchTriggerWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/triggers/{environmentKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update flag trigger",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key",
      "id": "The flag trigger ID"
    }
  },
  "deleteTriggerWorkflow": {
    "accessPath": [
      "deleteTriggerWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/flags/{projectKey}/{featureFlagKey}/triggers/{environmentKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete flag trigger",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key",
      "id": "The flag trigger ID"
    }
  },
  "getReleaseByFlagKey": {
    "accessPath": [
      "getReleaseByFlagKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/flags/{projectKey}/{flagKey}/release",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "flagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get release for flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "The flag key"
    }
  },
  "patchReleaseByFlagKey": {
    "accessPath": [
      "patchReleaseByFlagKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/flags/{projectKey}/{flagKey}/release",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "flagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch release for flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "The flag key"
    }
  },
  "deleteReleaseByFlagKey": {
    "accessPath": [
      "deleteReleaseByFlagKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/flags/{projectKey}/{flagKey}/release",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "flagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a release for flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "The flag key"
    }
  },
  "getBigSegmentStoreIntegrations": {
    "accessPath": [
      "getBigSegmentStoreIntegrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/big-segment-store",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all big segment store integrations"
  },
  "createBigSegmentStoreIntegration": {
    "accessPath": [
      "createBigSegmentStoreIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "on",
      "config",
      "tags",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration-capabilities/big-segment-store/{projectKey}/{environmentKey}/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create big segment store integration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key, either `redis` or `dynamodb`"
    }
  },
  "getBigSegmentStoreIntegration": {
    "accessPath": [
      "getBigSegmentStoreIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/big-segment-store/{projectKey}/{environmentKey}/{integrationKey}/{integrationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get big segment store integration by ID",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key, either `redis` or `dynamodb`",
      "integrationId": "The integration ID"
    }
  },
  "patchBigSegmentStoreIntegration": {
    "accessPath": [
      "patchBigSegmentStoreIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration-capabilities/big-segment-store/{projectKey}/{environmentKey}/{integrationKey}/{integrationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update big segment store integration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key, either `redis` or `dynamodb`",
      "integrationId": "The integration ID"
    }
  },
  "deleteBigSegmentStoreIntegration": {
    "accessPath": [
      "deleteBigSegmentStoreIntegration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration-capabilities/big-segment-store/{projectKey}/{environmentKey}/{integrationKey}/{integrationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete big segment store integration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key, either `redis` or `dynamodb`",
      "integrationId": "The integration ID"
    }
  },
  "getIntegrationDeliveryConfigurations": {
    "accessPath": [
      "getIntegrationDeliveryConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all delivery configurations"
  },
  "getIntegrationDeliveryConfigurationByEnvironment": {
    "accessPath": [
      "getIntegrationDeliveryConfigurationByEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get delivery configurations by environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "createIntegrationDeliveryConfiguration": {
    "accessPath": [
      "createIntegrationDeliveryConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "on",
      "config",
      "tags",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore/{projectKey}/{environmentKey}/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create delivery configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key"
    }
  },
  "getIntegrationDeliveryConfigurationById": {
    "accessPath": [
      "getIntegrationDeliveryConfigurationById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore/{projectKey}/{environmentKey}/{integrationKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get delivery configuration by ID",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key",
      "id": "The configuration ID"
    }
  },
  "patchIntegrationDeliveryConfiguration": {
    "accessPath": [
      "patchIntegrationDeliveryConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore/{projectKey}/{environmentKey}/{integrationKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update delivery configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key",
      "id": "The configuration ID"
    }
  },
  "deleteIntegrationDeliveryConfiguration": {
    "accessPath": [
      "deleteIntegrationDeliveryConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore/{projectKey}/{environmentKey}/{integrationKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete delivery configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key",
      "id": "The configuration ID"
    }
  },
  "validateIntegrationDeliveryConfiguration": {
    "accessPath": [
      "validateIntegrationDeliveryConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration-capabilities/featureStore/{projectKey}/{environmentKey}/{integrationKey}/{id}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate delivery configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "integrationKey": "The integration key",
      "id": "The configuration ID"
    }
  },
  "getFlagImportConfigurations": {
    "accessPath": [
      "getFlagImportConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/flag-import",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all flag import configurations"
  },
  "createFlagImportConfiguration": {
    "accessPath": [
      "createFlagImportConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "config",
      "tags",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration-capabilities/flag-import/{projectKey}/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a flag import configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "integrationKey": "The integration key"
    }
  },
  "getFlagImportConfiguration": {
    "accessPath": [
      "getFlagImportConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-capabilities/flag-import/{projectKey}/{integrationKey}/{integrationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a single flag import configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "integrationKey": "The integration key, for example, `split`",
      "integrationId": "The integration ID"
    }
  },
  "patchFlagImportConfiguration": {
    "accessPath": [
      "patchFlagImportConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration-capabilities/flag-import/{projectKey}/{integrationKey}/{integrationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a flag import configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "integrationKey": "The integration key",
      "integrationId": "The integration ID"
    }
  },
  "deleteFlagImportConfiguration": {
    "accessPath": [
      "deleteFlagImportConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration-capabilities/flag-import/{projectKey}/{integrationKey}/{integrationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a flag import configuration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "integrationKey": "The integration key",
      "integrationId": "The integration ID"
    }
  },
  "triggerFlagImportJob": {
    "accessPath": [
      "triggerFlagImportJob"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration-capabilities/flag-import/{projectKey}/{integrationKey}/{integrationId}/trigger",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "integrationKey",
      "integrationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trigger a single flag import run",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "integrationKey": "The integration key",
      "integrationId": "The integration ID"
    }
  },
  "getAllIntegrationConfigurations": {
    "accessPath": [
      "getAllIntegrationConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-configurations/keys/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get all configurations for the integration",
    "parameterDescriptions": {
      "integrationKey": "Integration key"
    }
  },
  "createIntegrationConfiguration": {
    "accessPath": [
      "createIntegrationConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "enabled",
      "tags",
      "configValues",
      "capabilityConfig"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration-configurations/keys/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create integration configuration",
    "parameterDescriptions": {
      "integrationKey": "The integration key"
    }
  },
  "getIntegrationConfiguration": {
    "accessPath": [
      "getIntegrationConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration-configurations/{integrationConfigurationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationConfigurationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an integration configuration",
    "parameterDescriptions": {
      "integrationConfigurationId": "Integration configuration ID"
    }
  },
  "updateIntegrationConfiguration": {
    "accessPath": [
      "updateIntegrationConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration-configurations/{integrationConfigurationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationConfigurationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update integration configuration",
    "parameterDescriptions": {
      "integrationConfigurationId": "The ID of the integration configuration"
    }
  },
  "deleteIntegrationConfiguration": {
    "accessPath": [
      "deleteIntegrationConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration-configurations/{integrationConfigurationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationConfigurationId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete integration configuration",
    "parameterDescriptions": {
      "integrationConfigurationId": "The ID of the integration configuration to be deleted"
    }
  },
  "getSubscriptions": {
    "accessPath": [
      "getSubscriptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get audit log subscriptions by integration",
    "parameterDescriptions": {
      "integrationKey": "The integration key"
    }
  },
  "createSubscription": {
    "accessPath": [
      "createSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "statements",
      "on",
      "tags",
      "config",
      "url",
      "apiKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/{integrationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create audit log subscription",
    "parameterDescriptions": {
      "integrationKey": "The integration key"
    }
  },
  "getSubscriptionByID": {
    "accessPath": [
      "getSubscriptionById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/{integrationKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get audit log subscription by ID",
    "parameterDescriptions": {
      "integrationKey": "The integration key",
      "id": "The subscription ID"
    }
  },
  "updateSubscription": {
    "accessPath": [
      "updateSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/{integrationKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update audit log subscription",
    "parameterDescriptions": {
      "integrationKey": "The integration key",
      "id": "The ID of the audit log subscription"
    }
  },
  "deleteSubscription": {
    "accessPath": [
      "deleteSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/{integrationKey}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integrationKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete audit log subscription",
    "parameterDescriptions": {
      "integrationKey": "The integration key",
      "id": "The subscription ID"
    }
  },
  "getMembers": {
    "accessPath": [
      "getMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter",
      "expand",
      "sort"
    ],
    "description": "List account members",
    "parameterDescriptions": {
      "limit": "The number of members to return in the response. Defaults to 20.",
      "offset": "Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response.",
      "sort": "A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order."
    }
  },
  "postMembers": {
    "accessPath": [
      "postMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite new members"
  },
  "patchMembers": {
    "accessPath": [
      "patchMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Modify account members"
  },
  "getMember": {
    "accessPath": [
      "getMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/members/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get account member",
    "parameterDescriptions": {
      "id": "The member ID",
      "expand": "A comma-separated list of properties that can reveal additional information in the response."
    }
  },
  "patchMember": {
    "accessPath": [
      "patchMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/members/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Modify an account member",
    "parameterDescriptions": {
      "id": "The member ID"
    }
  },
  "deleteMember": {
    "accessPath": [
      "deleteMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/members/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete account member",
    "parameterDescriptions": {
      "id": "The member ID"
    }
  },
  "postMemberTeams": {
    "accessPath": [
      "postMemberTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teamKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/members/{id}/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a member to teams",
    "parameterDescriptions": {
      "id": "The member ID"
    }
  },
  "getMetrics": {
    "accessPath": [
      "getMetrics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "offset",
      "sort",
      "filter"
    ],
    "description": "List metrics",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response.",
      "limit": "The number of metrics to return in the response. Defaults to 20. Maximum limit is 50.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.",
      "sort": "A field to sort the items by. Prefix field by a dash ( - ) to sort in descending order. This endpoint supports sorting by `createdAt` or `name`.",
      "filter": "A comma-separated list of filters. This endpoint accepts filtering by `query`, `tags`, `eventKind`, `isNumeric`, `unitAggregationType`, `hasConnections`, `maintainerIds`, `maintainerTeamKey`, `view`, `dataSourceKeys`, `metricUsedIn`, `eventKeys`, and `versionIds`. To learn more about the filter syntax, read the 'Filtering metrics' section above."
    }
  },
  "postMetric": {
    "accessPath": [
      "postMetric"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "description",
      "kind",
      "selector",
      "urls",
      "isNumeric",
      "unit",
      "eventKey",
      "successCriteria",
      "tags",
      "randomizationUnits",
      "analysisUnits",
      "maintainerId",
      "unitAggregationType",
      "analysisType",
      "percentileValue",
      "eventDefault",
      "dataSource",
      "filters",
      "windowStartOffset",
      "windowEndOffset",
      "winsorLowerPercentile",
      "winsorUpperPercentile",
      "winsorExcludeImputed",
      "traceQuery",
      "traceValueLocation"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/metrics/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create metric",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getMetric": {
    "accessPath": [
      "getMetric"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{projectKey}/{metricKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "metricKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "versionId"
    ],
    "description": "Get metric",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "metricKey": "The metric key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are `experiments`, `experimentCount`, `metricGroups`, `metricGroupCount`, `eventSources`, `guardedRollouts`, `guardedRolloutCount`, `lastUsedInExperiment`, and `lastUsedInGuardedRollout`.",
      "versionId": "The specific version ID of the metric"
    }
  },
  "patchMetric": {
    "accessPath": [
      "patchMetric"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/metrics/{projectKey}/{metricKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "metricKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update metric",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "metricKey": "The metric key"
    }
  },
  "deleteMetric": {
    "accessPath": [
      "deleteMetric"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/metrics/{projectKey}/{metricKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "metricKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete metric",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "metricKey": "The metric key"
    }
  },
  "getOAuthClients": {
    "accessPath": [
      "getOAuthClients"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/oauth/clients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get clients"
  },
  "createOAuth2Client": {
    "accessPath": [
      "createOAuth2Client"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "redirectUri",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/oauth/clients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a LaunchDarkly OAuth 2.0 client"
  },
  "getOAuthClientById": {
    "accessPath": [
      "getOAuthClientById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/oauth/clients/{clientId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "clientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get client by ID",
    "parameterDescriptions": {
      "clientId": "The client ID"
    }
  },
  "patchOAuthClient": {
    "accessPath": [
      "patchOAuthClient"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/oauth/clients/{clientId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "clientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch client by ID",
    "parameterDescriptions": {
      "clientId": "The client ID"
    }
  },
  "deleteOAuthClient": {
    "accessPath": [
      "deleteOAuthClient"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/oauth/clients/{clientId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "clientId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete OAuth 2.0 client",
    "parameterDescriptions": {
      "clientId": "The client ID"
    }
  },
  "getOpenapiSpec": {
    "accessPath": [
      "getOpenapiSpec"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/openapi.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Gets the OpenAPI spec in json"
  },
  "getProjects": {
    "accessPath": [
      "getProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter",
      "sort",
      "expand"
    ],
    "description": "List projects",
    "parameterDescriptions": {
      "limit": "The number of projects to return in the response. Defaults to 20.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.",
      "filter": "A comma-separated list of filters. Each filter is constructed as `field:value`.",
      "sort": "A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response."
    }
  },
  "postProject": {
    "accessPath": [
      "postProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "includeInSnippetByDefault",
      "defaultClientSideAvailability",
      "tags",
      "environments",
      "namingConvention"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create project"
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
    "routeTemplate": "/api/v2/projects/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get project",
    "parameterDescriptions": {
      "projectKey": "The project key.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response."
    }
  },
  "patchProject": {
    "accessPath": [
      "patchProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update project",
    "parameterDescriptions": {
      "projectKey": "The project key"
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
    "routeTemplate": "/api/v2/projects/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete project",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getContextKindsByProjectKey": {
    "accessPath": [
      "getContextKindsByProjectKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/context-kinds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get context kinds",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "putContextKind": {
    "accessPath": [
      "putContextKind"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "hideInTargeting",
      "archived",
      "version"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/context-kinds/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or update context kind",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "key": "The context kind key"
    }
  },
  "getEnvironmentsByProject": {
    "accessPath": [
      "getEnvironmentsByProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter",
      "sort"
    ],
    "description": "List environments",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "limit": "The number of environments to return in the response. Defaults to 20.",
      "offset": "Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A comma-separated list of filters. Each filter is of the form `field:value`.",
      "sort": "A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order."
    }
  },
  "postEnvironment": {
    "accessPath": [
      "postEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "color",
      "defaultTtl",
      "secureMode",
      "defaultTrackEvents",
      "confirmChanges",
      "requireComments",
      "tags",
      "source",
      "critical"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create environment",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getEnvironment": {
    "accessPath": [
      "getEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "patchEnvironment": {
    "accessPath": [
      "patchEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "deleteEnvironment": {
    "accessPath": [
      "deleteEnvironment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "resetEnvironmentSDKKey": {
    "accessPath": [
      "resetEnvironmentSdkKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/apiKey",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expiry"
    ],
    "description": "Reset environment SDK key",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "expiry": "The time at which you want the old SDK key to expire, in UNIX milliseconds. By default, the key expires immediately. During the period between this call and the time when the old SDK key expires, both the old SDK key and the new SDK key will work."
    }
  },
  "getContextAttributeNames": {
    "accessPath": [
      "getContextAttributeNames"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/context-attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "limit"
    ],
    "description": "Get context attribute names",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "filter": "A comma-separated list of context filters. This endpoint only accepts `kind` filters, with the `equals` operator, and `name` filters, with the `startsWith` operator. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).",
      "limit": "Specifies the maximum number of items in the collection to return (max: 100, default: 100)"
    }
  },
  "getContextAttributeValues": {
    "accessPath": [
      "getContextAttributeValues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/context-attributes/{attributeName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "attributeName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "limit"
    ],
    "description": "Get context attribute values",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "attributeName": "The attribute name",
      "filter": "A comma-separated list of context filters. This endpoint only accepts `kind` filters, with the `equals` operator, and `value` filters, with the `startsWith` operator. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).",
      "limit": "Specifies the maximum number of items in the collection to return (max: 100, default: 50)"
    }
  },
  "searchContextInstances": {
    "accessPath": [
      "searchContextInstances"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "sort",
      "limit",
      "continuationToken"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/context-instances/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [
      "limit",
      "continuationToken",
      "sort",
      "filter"
    ],
    "queryParameterKeys": [
      "limit",
      "continuationToken",
      "sort",
      "filter",
      "includeTotalCount"
    ],
    "description": "Search for context instances",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "Specifies the maximum number of items in the collection to return (max: 50, default: 20)",
      "continuationToken": "Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead.",
      "sort": "Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.",
      "filter": "A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).",
      "includeTotalCount": "Specifies whether to include or omit the total count of matching context instances. Defaults to true."
    }
  },
  "getContextInstances": {
    "accessPath": [
      "getContextInstances"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/context-instances/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "continuationToken",
      "sort",
      "filter",
      "includeTotalCount"
    ],
    "description": "Get context instances",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "id": "The context instance ID",
      "limit": "Specifies the maximum number of context instances to return (max: 50, default: 20)",
      "continuationToken": "Limits results to context instances with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead.",
      "sort": "Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.",
      "filter": "A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).",
      "includeTotalCount": "Specifies whether to include or omit the total count of matching context instances. Defaults to true."
    }
  },
  "deleteContextInstances": {
    "accessPath": [
      "deleteContextInstances"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/context-instances/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete context instances",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "id": "The context instance ID"
    }
  },
  "searchContexts": {
    "accessPath": [
      "searchContexts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "sort",
      "limit",
      "continuationToken"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/contexts/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [
      "limit",
      "continuationToken",
      "sort",
      "filter"
    ],
    "queryParameterKeys": [
      "limit",
      "continuationToken",
      "sort",
      "filter",
      "includeTotalCount"
    ],
    "description": "Search for contexts",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "Specifies the maximum number of items in the collection to return (max: 50, default: 20)",
      "continuationToken": "Limits results to contexts with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead.",
      "sort": "Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.",
      "filter": "A comma-separated list of context filters. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).",
      "includeTotalCount": "Specifies whether to include or omit the total count of matching contexts. Defaults to true."
    }
  },
  "putContextFlagSetting": {
    "accessPath": [
      "putContextFlagSetting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "setting",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/contexts/{contextKind}/{contextKey}/flags/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "contextKind",
      "contextKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update flag settings for context",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "contextKind": "The context kind",
      "contextKey": "The context key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getContexts": {
    "accessPath": [
      "getContexts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/contexts/{kind}/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "kind",
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "continuationToken",
      "sort",
      "filter",
      "includeTotalCount"
    ],
    "description": "Get contexts",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "kind": "The context kind",
      "key": "The context key",
      "limit": "Specifies the maximum number of items in the collection to return (max: 50, default: 20)",
      "continuationToken": "Limits results to contexts with sort values after the value specified. You can use this for pagination, however, we recommend using the `next` link we provide instead.",
      "sort": "Specifies a field by which to sort. LaunchDarkly supports sorting by timestamp in ascending order by specifying `ts` for this value, or descending order by specifying `-ts`.",
      "filter": "A comma-separated list of context filters. This endpoint only accepts an `applicationId` filter. To learn more about the filter syntax, read [Filtering contexts and context instances](https://launchdarkly.com/docs/ld-docs/api/contexts#filtering-contexts-and-context-instances).",
      "includeTotalCount": "Specifies whether to include or omit the total count of matching contexts. Defaults to true."
    }
  },
  "getExperiments": {
    "accessPath": [
      "getExperiments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/experiments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter",
      "expand",
      "lifecycleState"
    ],
    "description": "Get experiments",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "The maximum number of experiments to return. Defaults to 20.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above.",
      "lifecycleState": "A comma-separated list of experiment archived states. Supports `archived`, `active`, or both. Defaults to `active` experiments."
    }
  },
  "createExperiment": {
    "accessPath": [
      "createExperiment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "maintainerId",
      "key",
      "iteration",
      "holdoutId",
      "tags",
      "methodology",
      "analysisConfig",
      "dataSource",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/experiments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create experiment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getExperiment": {
    "accessPath": [
      "getExperiment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/experiments/{experimentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "experimentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get experiment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "experimentKey": "The experiment key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above."
    }
  },
  "patchExperiment": {
    "accessPath": [
      "patchExperiment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/experiments/{experimentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "experimentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch experiment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "experimentKey": "The experiment key"
    }
  },
  "createIteration": {
    "accessPath": [
      "createIteration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "hypothesis",
      "canReshuffleTraffic",
      "metrics",
      "primarySingleMetricKey",
      "primaryFunnelKey",
      "treatments",
      "flags",
      "randomizationUnit",
      "reallocationFrequencyMillis",
      "covariateId",
      "attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/experiments/{experimentKey}/iterations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "experimentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create iteration",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "experimentKey": "The experiment key"
    }
  },
  "evaluateContextInstance": {
    "accessPath": [
      "evaluateContextInstance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/flags/evaluate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "sort",
      "filter"
    ],
    "description": "Evaluate flags for context instance",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "The number of feature flags to return. Defaults to -1, which returns all flags",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "sort": "A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order",
      "filter": "A comma-separated list of filters. Each filter is of the form `field operator value`. Supported fields are explained above."
    }
  },
  "getFollowersByProjEnv": {
    "accessPath": [
      "getFollowersByProjEnv"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get followers of all flags in a given project and environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getAllHoldouts": {
    "accessPath": [
      "getAllHoldouts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/holdouts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Get all holdouts",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "The number of holdouts to return in the response. Defaults to 20",
      "offset": "Where to start in the list. Use this with pagination. For example, an `offset` of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postHoldout": {
    "accessPath": [
      "postHoldout"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "description",
      "randomizationunit",
      "attributes",
      "holdoutamount",
      "primarymetrickey",
      "metrics",
      "prerequisiteflagkey",
      "maintainerId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/holdouts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create holdout",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getHoldoutById": {
    "accessPath": [
      "getHoldoutById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/holdouts/id/{holdoutId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "holdoutId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Holdout by Id",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "holdoutId": "The holdout experiment ID"
    }
  },
  "getHoldout": {
    "accessPath": [
      "getHoldout"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/holdouts/{holdoutKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "holdoutKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get holdout",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "holdoutKey": "The holdout experiment key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above. Holdout experiment expansion fields have no prefix. Related experiment expansion fields have `rel-` as a prefix."
    }
  },
  "patchHoldout": {
    "accessPath": [
      "patchHoldout"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/holdouts/{holdoutKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "holdoutKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch holdout",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "holdoutKey": "The holdout key"
    }
  },
  "resetEnvironmentMobileKey": {
    "accessPath": [
      "resetEnvironmentMobileKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/mobileKey",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset environment mobile SDK key",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getContextInstanceSegmentsMembershipByEnv": {
    "accessPath": [
      "getContextInstanceSegmentsMembershipByEnv"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/environments/{environmentKey}/segments/evaluate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List segment memberships for context instance",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getExperimentationSettings": {
    "accessPath": [
      "getExperimentationSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/experimentation-settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get experimentation settings",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "putExperimentationSettings": {
    "accessPath": [
      "putExperimentationSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "randomizationUnits"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/experimentation-settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update experimentation settings",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getExperimentsAnyEnv": {
    "accessPath": [
      "getExperimentsAnyEnv"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/experiments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter",
      "expand",
      "lifecycleState"
    ],
    "description": "Get experiments any environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "limit": "The maximum number of experiments to return. Defaults to 20.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A comma-separated list of filters. Each filter is of the form `field:value`. Supported fields are explained above.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above.",
      "lifecycleState": "A comma-separated list of experiment archived states. Supports `archived`, `active`, or both. Defaults to `active` experiments."
    }
  },
  "getFlagDefaultsByProject": {
    "accessPath": [
      "getFlagDefaultsByProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flag-defaults",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get flag defaults for project",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "patchFlagDefaultsByProject": {
    "accessPath": [
      "patchFlagDefaultsByProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/flag-defaults",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update flag default for project",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "putFlagDefaultsByProject": {
    "accessPath": [
      "putFlagDefaultsByProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tags",
      "temporary",
      "booleanDefaults",
      "defaultClientSideAvailability"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/flag-defaults",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or update flag defaults for project",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getApprovalsForFlag": {
    "accessPath": [
      "getApprovalsForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List approval requests for a flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key"
    }
  },
  "postApprovalRequestForFlag": {
    "accessPath": [
      "postApprovalRequestForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "description",
      "instructions",
      "notifyMemberIds",
      "notifyTeamKeys",
      "executionDate",
      "operatingOnId",
      "integrationConfig"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create approval request for a flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key"
    }
  },
  "postFlagCopyConfigApprovalRequest": {
    "accessPath": [
      "postFlagCopyConfigApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "description",
      "notifyMemberIds",
      "notifyTeamKeys",
      "source",
      "includedActions",
      "excludedActions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests-flag-copy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create approval request to copy flag configurations across environments",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key for the target environment"
    }
  },
  "getApprovalForFlag": {
    "accessPath": [
      "getApprovalForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get approval request for a flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The feature flag approval request ID"
    }
  },
  "patchFlagConfigApprovalRequest": {
    "accessPath": [
      "patchFlagConfigApprovalRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update flag approval request",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The approval ID"
    }
  },
  "deleteApprovalRequestForFlag": {
    "accessPath": [
      "deleteApprovalRequestForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete approval request for a flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The feature flag approval request ID"
    }
  },
  "postApprovalRequestApplyForFlag": {
    "accessPath": [
      "postApprovalRequestApplyForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests/{id}/apply",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Apply approval request for a flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The feature flag approval request ID"
    }
  },
  "postApprovalRequestReviewForFlag": {
    "accessPath": [
      "postApprovalRequestReviewForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "kind",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/approval-requests/{id}/reviews",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Review approval request for a flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The feature flag approval request ID"
    }
  },
  "getFlagFollowers": {
    "accessPath": [
      "getFlagFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get followers of a flag in a project and environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key"
    }
  },
  "putFlagFollower": {
    "accessPath": [
      "putFlagFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/followers/{memberId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "memberId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a member as a follower of a flag in a project and environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "memberId": "The memberId of the member to add as a follower of the flag. Reader roles can only add themselves."
    }
  },
  "deleteFlagFollower": {
    "accessPath": [
      "deleteFlagFollower"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/followers/{memberId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "memberId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a member as a follower of a flag in a project and environment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "memberId": "The memberId of the member to remove as a follower of the flag. Reader roles can only remove themselves."
    }
  },
  "getFlagConfigScheduledChanges": {
    "accessPath": [
      "getFlagConfigScheduledChanges"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/scheduled-changes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List scheduled changes",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key"
    }
  },
  "postFlagConfigScheduledChanges": {
    "accessPath": [
      "postFlagConfigScheduledChanges"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "executionDate",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/scheduled-changes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ignoreConflicts"
    ],
    "description": "Create scheduled changes workflow",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "ignoreConflicts": "Whether to succeed (`true`) or fail (`false`) when these instructions conflict with existing scheduled changes"
    }
  },
  "getFeatureFlagScheduledChange": {
    "accessPath": [
      "getFeatureFlagScheduledChange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/scheduled-changes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a scheduled change",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The scheduled change id"
    }
  },
  "patchFlagConfigScheduledChange": {
    "accessPath": [
      "patchFlagConfigScheduledChange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/scheduled-changes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ignoreConflicts"
    ],
    "description": "Update scheduled changes workflow",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The scheduled change ID",
      "ignoreConflicts": "Whether to succeed (`true`) or fail (`false`) when these new instructions conflict with existing scheduled changes"
    }
  },
  "deleteFlagConfigScheduledChanges": {
    "accessPath": [
      "deleteFlagConfigScheduledChanges"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/scheduled-changes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete scheduled changes workflow",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "id": "The scheduled change id"
    }
  },
  "getWorkflows": {
    "accessPath": [
      "getWorkflows"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/workflows",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "sort",
      "limit",
      "offset"
    ],
    "description": "Get workflows",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "status": "Filter results by workflow status. Valid status filters are `active`, `completed`, and `failed`.",
      "sort": "A field to sort the items by. Prefix field by a dash ( - ) to sort in descending order. This endpoint supports sorting by `creationDate` or `stopDate`.",
      "limit": "The maximum number of workflows to return. Defaults to 20.",
      "offset": "Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postWorkflow": {
    "accessPath": [
      "postWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "maintainerId",
      "name",
      "description",
      "stages",
      "templateKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/workflows",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [
      "templateKey"
    ],
    "queryParameterKeys": [
      "templateKey",
      "dryRun"
    ],
    "description": "Create workflow",
    "parameterDescriptions": {
      "templateKey": "The template key to apply as a starting point for the new workflow",
      "dryRun": "Whether to call the endpoint in dry-run mode",
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key"
    }
  },
  "getCustomWorkflow": {
    "accessPath": [
      "getCustomWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/workflows/{workflowId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "workflowId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get custom workflow",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "workflowId": "The workflow ID"
    }
  },
  "deleteWorkflow": {
    "accessPath": [
      "deleteWorkflow"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{featureFlagKey}/environments/{environmentKey}/workflows/{workflowId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "featureFlagKey",
      "environmentKey",
      "workflowId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete workflow",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "featureFlagKey": "The feature flag key",
      "environmentKey": "The environment key",
      "workflowId": "The workflow id"
    }
  },
  "postMigrationSafetyIssues": {
    "accessPath": [
      "postMigrationSafetyIssues"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "instructions",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{flagKey}/environments/{environmentKey}/migration-safety-issues",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "flagKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get migration safety issues",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "The migration flag key",
      "environmentKey": "The environment key"
    }
  },
  "createReleaseForFlag": {
    "accessPath": [
      "createReleaseForFlag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "releaseVariationId",
      "releasePipelineKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{flagKey}/release",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "flagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new release for flag",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "The flag key"
    }
  },
  "updatePhaseStatus": {
    "accessPath": [
      "updatePhaseStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "status",
      "audiences"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/flags/{flagKey}/release/phases/{phaseId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "flagKey",
      "phaseId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update phase status for release",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "flagKey": "The flag key",
      "phaseId": "The phase ID"
    }
  },
  "getLayers": {
    "accessPath": [
      "getLayers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/layers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter"
    ],
    "description": "Get layers",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "filter": "A comma-separated list of filters. This endpoint only accepts filtering by `experimentKey`. The filter returns layers which include that experiment for the selected environment(s). For example: `filter=reservations.experimentKey contains expKey`."
    }
  },
  "createLayer": {
    "accessPath": [
      "createLayer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/layers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create layer",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "updateLayer": {
    "accessPath": [
      "updateLayer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "environmentKey",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/layers/{layerKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "layerKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update layer",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "layerKey": "The layer key"
    }
  },
  "getMetricGroups": {
    "accessPath": [
      "getMetricGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/metric-groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "sort",
      "expand",
      "limit",
      "offset"
    ],
    "description": "List metric groups",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "filter": "Accepts filter by `experimentStatus`, `query`, `kind`, `hasConnections`, `maintainerIds`, and `maintainerTeamKey`. Example: `filter=experimentStatus equals 'running' and query equals 'test'`.",
      "sort": "A comma-separated list of fields to sort by. Fields prefixed by a dash ( - ) sort in descending order. Read the endpoint description for a full list of available sort fields.",
      "expand": "This parameter is reserved for future use and is not currently supported on this endpoint.",
      "limit": "The number of metric groups to return in the response. Defaults to 20. Maximum limit is 50.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items."
    }
  },
  "createMetricGroup": {
    "accessPath": [
      "createMetricGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "kind",
      "description",
      "maintainerId",
      "tags",
      "metrics"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/metric-groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create metric group",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getMetricGroup": {
    "accessPath": [
      "getMetricGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/metric-groups/{metricGroupKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "metricGroupKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get metric group",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "metricGroupKey": "The metric group key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response."
    }
  },
  "patchMetricGroup": {
    "accessPath": [
      "patchMetricGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/metric-groups/{metricGroupKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "metricGroupKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch metric group",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "metricGroupKey": "The metric group key"
    }
  },
  "deleteMetricGroup": {
    "accessPath": [
      "deleteMetricGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/metric-groups/{metricGroupKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "metricGroupKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete metric group",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "metricGroupKey": "The metric group key"
    }
  },
  "getAllReleasePipelines": {
    "accessPath": [
      "getAllReleasePipelines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "limit",
      "offset"
    ],
    "description": "Get all release pipelines",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "filter": "A comma-separated list of filters. Each filter is of the form field:value. Read the endpoint description for a full list of available filter fields.",
      "limit": "The maximum number of items to return. Defaults to 20.",
      "offset": "Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postReleasePipeline": {
    "accessPath": [
      "postReleasePipeline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "key",
      "name",
      "phases",
      "tags",
      "isProjectDefault",
      "isLegacy"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a release pipeline",
    "parameterDescriptions": {
      "projectKey": "The project key"
    }
  },
  "getReleasePipelineByKey": {
    "accessPath": [
      "getReleasePipelineByKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-pipelines/{pipelineKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "pipelineKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get release pipeline by key",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "pipelineKey": "The release pipeline key"
    }
  },
  "putReleasePipeline": {
    "accessPath": [
      "putReleasePipeline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "name",
      "phases",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-pipelines/{pipelineKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "pipelineKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a release pipeline",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "pipelineKey": "The release pipeline key"
    }
  },
  "deleteReleasePipeline": {
    "accessPath": [
      "deleteReleasePipeline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-pipelines/{pipelineKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "pipelineKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete release pipeline",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "pipelineKey": "The release pipeline key"
    }
  },
  "getAllReleaseProgressionsForReleasePipeline": {
    "accessPath": [
      "getAllReleaseProgressionsForReleasePipeline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-pipelines/{pipelineKey}/releases",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "pipelineKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "limit",
      "offset"
    ],
    "description": "Get release progressions for release pipeline",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "pipelineKey": "The pipeline key",
      "filter": "Accepts filter by `status` and `activePhaseId`. `status` can take a value of `completed` or `active`. `activePhaseId` takes a UUID and will filter results down to releases active on the specified phase. Providing `status equals completed` along with an `activePhaseId` filter will return an error as they are disjoint sets of data. The combination of `status equals active` and `activePhaseId` will return the same results as `activePhaseId` alone.",
      "limit": "The maximum number of items to return. Defaults to 20.",
      "offset": "Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "getIps": {
    "accessPath": [
      "getIps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/public-ip-list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Gets the public IP list"
  },
  "getCustomRoles": {
    "accessPath": [
      "getCustomRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List custom roles",
    "parameterDescriptions": {
      "limit": "The maximum number of custom roles to return. Defaults to 20.",
      "offset": "Where to start in the list. Defaults to 0. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postCustomRole": {
    "accessPath": [
      "postCustomRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "description",
      "policy",
      "basePermissions",
      "resourceCategory"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create custom role"
  },
  "getCustomRole": {
    "accessPath": [
      "getCustomRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles/{customRoleKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customRoleKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get custom role",
    "parameterDescriptions": {
      "customRoleKey": "The custom role key or ID"
    }
  },
  "patchCustomRole": {
    "accessPath": [
      "patchCustomRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "patch",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/roles/{customRoleKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customRoleKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update custom role",
    "parameterDescriptions": {
      "customRoleKey": "The custom role key"
    }
  },
  "deleteCustomRole": {
    "accessPath": [
      "deleteCustomRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/roles/{customRoleKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customRoleKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete custom role",
    "parameterDescriptions": {
      "customRoleKey": "The custom role key"
    }
  },
  "getSegments": {
    "accessPath": [
      "getSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "sort",
      "filter"
    ],
    "description": "List segments",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "The number of segments to return. Defaults to 20.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "sort": "Accepts sorting order and fields. Fields can be comma separated. Possible fields are 'creationDate', 'name', 'lastModified'. Example: `sort=name` sort by names ascending or `sort=-name,creationDate` sort by names descending and creationDate ascending.",
      "filter": "Accepts filter by `excludedKeys`, `external`, `includedKeys`, `query`, `tags`, `unbounded`, `view`. To learn more about the filter syntax, read the  'Filtering segments' section above."
    }
  },
  "postSegment": {
    "accessPath": [
      "postSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "description",
      "tags",
      "unbounded",
      "unboundedContextKind"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getSegment": {
    "accessPath": [
      "getSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "patchSegment": {
    "accessPath": [
      "patchSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "patch",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "dryRun"
    ],
    "description": "Patch segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key",
      "dryRun": "If true, the patch will be validated but not persisted. Returns a preview of the segment after the patch is applied."
    }
  },
  "deleteSegment": {
    "accessPath": [
      "deleteSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "updateBigSegmentContextTargets": {
    "accessPath": [
      "updateBigSegmentContextTargets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "included",
      "excluded"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/contexts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update context targets on a big segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "getSegmentMembershipForContext": {
    "accessPath": [
      "getSegmentMembershipForContext"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/contexts/{contextKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey",
      "contextKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get big segment membership for context",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key",
      "contextKey": "The context key"
    }
  },
  "createBigSegmentExport": {
    "accessPath": [
      "createBigSegmentExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/exports",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create big segment export",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "getBigSegmentExport": {
    "accessPath": [
      "getBigSegmentExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/exports/{exportID}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey",
      "exportID"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get big segment export",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key",
      "exportID": "The export ID"
    }
  },
  "createBigSegmentImport": {
    "accessPath": [
      "createBigSegmentImport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "mode",
      "waitOnApprovals"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/imports",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create big segment import",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "getBigSegmentImport": {
    "accessPath": [
      "getBigSegmentImport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/imports/{importID}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey",
      "importID"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get big segment import",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key",
      "importID": "The import ID"
    }
  },
  "updateBigSegmentTargets": {
    "accessPath": [
      "updateBigSegmentTargets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "included",
      "excluded"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update user context targets on a big segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "getSegmentMembershipForUser": {
    "accessPath": [
      "getSegmentMembershipForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{environmentKey}/{segmentKey}/users/{userKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey",
      "userKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get big segment membership for user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key",
      "userKey": "The user key"
    }
  },
  "getExpiringTargetsForSegment": {
    "accessPath": [
      "getExpiringTargetsForSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{segmentKey}/expiring-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get expiring targets for segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "patchExpiringTargetsForSegment": {
    "accessPath": [
      "patchExpiringTargetsForSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/segments/{projectKey}/{segmentKey}/expiring-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update expiring targets for segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "getExpiringUserTargetsForSegment": {
    "accessPath": [
      "getExpiringUserTargetsForSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/segments/{projectKey}/{segmentKey}/expiring-user-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get expiring user targets for segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
    }
  },
  "patchExpiringUserTargetsForSegment": {
    "accessPath": [
      "patchExpiringUserTargetsForSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/segments/{projectKey}/{segmentKey}/expiring-user-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "segmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update expiring user targets for segment",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "segmentKey": "The segment key"
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
    "routeTemplate": "/api/v2/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter",
      "expand"
    ],
    "description": "List teams",
    "parameterDescriptions": {
      "limit": "The number of teams to return in the response. Defaults to 20.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and returns the next `limit` items.",
      "filter": "A comma-separated list of filters. Each filter is constructed as `field:value`.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response."
    }
  },
  "postTeam": {
    "accessPath": [
      "postTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customRoleKeys",
      "description",
      "key",
      "memberIDs",
      "name",
      "permissionGrants",
      "roleAttributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Create team",
    "parameterDescriptions": {
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above."
    }
  },
  "patchTeams": {
    "accessPath": [
      "patchTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update teams"
  },
  "getTeam": {
    "accessPath": [
      "getTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/teams/{teamKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get team",
    "parameterDescriptions": {
      "teamKey": "The team key.",
      "expand": "A comma-separated list of properties that can reveal additional information in the response."
    }
  },
  "patchTeam": {
    "accessPath": [
      "patchTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/teams/{teamKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Update team",
    "parameterDescriptions": {
      "teamKey": "The team key",
      "expand": "A comma-separated list of properties that can reveal additional information in the response. Supported fields are explained above."
    }
  },
  "deleteTeam": {
    "accessPath": [
      "deleteTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/teams/{teamKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete team",
    "parameterDescriptions": {
      "teamKey": "The team key"
    }
  },
  "getTeamMaintainers": {
    "accessPath": [
      "getTeamMaintainers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/teams/{teamKey}/maintainers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Get team maintainers",
    "parameterDescriptions": {
      "teamKey": "The team key",
      "limit": "The number of maintainers to return in the response. Defaults to 20.",
      "offset": "Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postTeamMembers": {
    "accessPath": [
      "postTeamMembers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/teams/{teamKey}/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add multiple members to team",
    "parameterDescriptions": {
      "teamKey": "The team key"
    }
  },
  "getTeamRoles": {
    "accessPath": [
      "getTeamRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/teams/{teamKey}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teamKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "Get team custom roles",
    "parameterDescriptions": {
      "teamKey": "The team key",
      "limit": "The number of roles to return in the response. Defaults to 20.",
      "offset": "Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "getWorkflowTemplates": {
    "accessPath": [
      "getWorkflowTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "summary",
      "search"
    ],
    "description": "Get workflow templates",
    "parameterDescriptions": {
      "summary": "Whether the entire template object or just a summary should be returned",
      "search": "The substring in either the name or description of a template"
    }
  },
  "createWorkflowTemplate": {
    "accessPath": [
      "createWorkflowTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "description",
      "workflowId",
      "stages",
      "projectKey",
      "environmentKey",
      "flagKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create workflow template"
  },
  "deleteWorkflowTemplate": {
    "accessPath": [
      "deleteWorkflowTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/templates/{templateKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "templateKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete workflow template",
    "parameterDescriptions": {
      "templateKey": "The template key"
    }
  },
  "getTokens": {
    "accessPath": [
      "getTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "showAll",
      "limit",
      "offset"
    ],
    "description": "List access tokens",
    "parameterDescriptions": {
      "showAll": "If set to true, and the authentication access token has the 'Admin' role, personal access tokens for all members will be retrieved.",
      "limit": "The number of access tokens to return in the response. Defaults to 25.",
      "offset": "Where to start in the list. This is for use with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postToken": {
    "accessPath": [
      "postToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "role",
      "customRoleIds",
      "inlineRole",
      "serviceToken",
      "defaultApiVersion"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create access token"
  },
  "getToken": {
    "accessPath": [
      "getToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tokens/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get access token",
    "parameterDescriptions": {
      "id": "The ID of the access token"
    }
  },
  "patchToken": {
    "accessPath": [
      "patchToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/tokens/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch access token",
    "parameterDescriptions": {
      "id": "The ID of the access token to update"
    }
  },
  "deleteToken": {
    "accessPath": [
      "deleteToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/tokens/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete access token",
    "parameterDescriptions": {
      "id": "The ID of the access token to update"
    }
  },
  "resetToken": {
    "accessPath": [
      "resetToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/tokens/{id}/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expiry"
    ],
    "description": "Reset access token",
    "parameterDescriptions": {
      "id": "The ID of the access token to update",
      "expiry": "An expiration time for the old token key, expressed as a Unix epoch time in milliseconds. By default, the token will expire immediately."
    }
  },
  "getAIRunsUsage": {
    "accessPath": [
      "getAiRunsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/ai-runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "sdkName",
      "sdkVersion",
      "sdkType",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get AI runs usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "sdkVersion": "An SDK version to filter results by. Can be specified multiple times, one query parameter per SDK version.",
      "sdkType": "An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkVersion`, `sdkType`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`."
    }
  },
  "getContextsClientsideUsage": {
    "accessPath": [
      "getContextsClientsideUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/clientside-contexts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "contextKind",
      "sdkName",
      "anonymous",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get contexts clientside usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "contextKind": "A context kind to filter results by. Can be specified multiple times, one query parameter per context kind.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "anonymous": "An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`.",
      "groupBy": "If specified, returns data for each distinct value of the given field. `contextKind` is always included as a grouping dimension. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkAppId`, `anonymousV2`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only."
    }
  },
  "getMAUClientsideUsage": {
    "accessPath": [
      "getMauClientsideUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/clientside-mau",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "sdkName",
      "anonymous",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get MAU clientside usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "anonymous": "An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkAppId`, `anonymousV2`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only."
    }
  },
  "getDataExportEventsUsage": {
    "accessPath": [
      "getDataExportEventsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/data-export-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "eventKind",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get data export events usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "eventKind": "An event kind to filter results by. Can be specified multiple times, one query parameter per event kind.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `environmentId`, `eventKind`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`."
    }
  },
  "getEvaluationsUsage": {
    "accessPath": [
      "getEvaluationsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/evaluations/{projectKey}/{environmentKey}/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "tz"
    ],
    "description": "Get evaluations usage",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "featureFlagKey": "The feature flag key",
      "from": "The series of data returned starts from this timestamp. Defaults to 30 days ago.",
      "to": "The series of data returned ends at this timestamp. Defaults to the current time.",
      "tz": "The timezone to use for breaks between days when returning daily data."
    }
  },
  "getEventsUsage": {
    "accessPath": [
      "getEventsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/events/{type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to"
    ],
    "description": "Get events usage",
    "parameterDescriptions": {
      "type": "The type of event to retrieve. Must be either `received` or `published`.",
      "from": "The series of data returned starts from this timestamp. Defaults to 24 hours ago.",
      "to": "The series of data returned ends at this timestamp. Defaults to the current time."
    }
  },
  "getExperimentationEventsUsage": {
    "accessPath": [
      "getExperimentationEventsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/experimentation-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "eventKey",
      "eventKind",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get experimentation events usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "eventKey": "An event key to filter results by. Can be specified multiple times, one query parameter per event key.",
      "eventKind": "An event kind to filter results by. Can be specified multiple times, one query parameter per event kind.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `environmentId`, `eventKey`, `eventKind`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`."
    }
  },
  "getExperimentationKeysUsage": {
    "accessPath": [
      "getExperimentationKeysUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/experimentation-keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "experimentId",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get experimentation keys usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "experimentId": "An experiment ID to filter results by. Can be specified multiple times, one query parameter per experiment ID.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `experimentId`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`."
    }
  },
  "getMauUsage": {
    "accessPath": [
      "getMauUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/mau",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "project",
      "environment",
      "sdktype",
      "sdk",
      "anonymous",
      "groupby",
      "aggregationType",
      "contextKind"
    ],
    "description": "Get MAU usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp. Defaults to 30 days ago.",
      "to": "The series of data returned ends at this timestamp. Defaults to the current time.",
      "project": "A project key to filter results to. Can be specified multiple times, one query parameter per project key, to view data for multiple projects.",
      "environment": "An environment key to filter results to. When using this parameter, exactly one project key must also be set. Can be specified multiple times as separate query parameters to view data for multiple environments within a single project.",
      "sdktype": "An SDK type to filter results to. Can be specified multiple times, one query parameter per SDK type. Valid values: client, server",
      "sdk": "An SDK name to filter results to. Can be specified multiple times, one query parameter per SDK.",
      "anonymous": "If specified, filters results to either anonymous or nonanonymous users.",
      "groupby": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions (for example, to group by both project and SDK). Valid values: project, environment, sdktype, sdk, anonymous, contextKind, sdkAppId",
      "aggregationType": "If specified, queries for rolling 30-day, month-to-date, or daily incremental counts. Default is rolling 30-day. Valid values: rolling_30d, month_to_date, daily_incremental",
      "contextKind": "Filters results to the specified context kinds. Can be specified multiple times, one query parameter per context kind. If not set, queries for the user context kind."
    }
  },
  "getMauUsageByCategory": {
    "accessPath": [
      "getMauUsageByCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/mau/bycategory",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to"
    ],
    "description": "Get MAU usage by category",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp. Defaults to 30 days ago.",
      "to": "The series of data returned ends at this timestamp. Defaults to the current time."
    }
  },
  "getMauSdksByType": {
    "accessPath": [
      "getMauSdksByType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/mau/sdks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "sdktype"
    ],
    "description": "Get MAU SDKs by type",
    "parameterDescriptions": {
      "from": "The data returned starts from this timestamp. Defaults to seven days ago. The timestamp is in Unix milliseconds, for example, 1656694800000.",
      "to": "The data returned ends at this timestamp. Defaults to the current time. The timestamp is in Unix milliseconds, for example, 1657904400000.",
      "sdktype": "The type of SDK with monthly active users (MAU) to list. Must be either `client` or `server`."
    }
  },
  "getObservabilityErrorsUsage": {
    "accessPath": [
      "getObservabilityErrorsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/observability/errors",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "granularity",
      "aggregationType"
    ],
    "description": "Get observability errors usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`."
    }
  },
  "getObservabilityLogsUsage": {
    "accessPath": [
      "getObservabilityLogsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/observability/logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "granularity",
      "aggregationType"
    ],
    "description": "Get observability logs usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`."
    }
  },
  "getObservabilityMetricsUsage": {
    "accessPath": [
      "getObservabilityMetricsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/observability/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "granularity",
      "aggregationType"
    ],
    "description": "Get observability metrics usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `hourly`, `daily`, and `monthly`; **average** supports `hourly`, `daily`, and `monthly`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `average`."
    }
  },
  "getObservabilitySessionsUsage": {
    "accessPath": [
      "getObservabilitySessionsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/observability/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "granularity",
      "aggregationType"
    ],
    "description": "Get observability sessions usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`."
    }
  },
  "getObservabilityTracesUsage": {
    "accessPath": [
      "getObservabilityTracesUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/observability/traces",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "granularity",
      "aggregationType"
    ],
    "description": "Get observability traces usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`."
    }
  },
  "getSdkAllVersions": {
    "accessPath": [
      "getSdkAllVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/sdk-versions/all",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "environmentId",
      "projectId",
      "sdkName",
      "sdkType",
      "sdkAppId",
      "connectionType"
    ],
    "description": "Get usage details for all SDK versions",
    "parameterDescriptions": {
      "environmentId": "Filter to a specific environment ID.",
      "projectId": "Filter to a specific project ID.",
      "sdkName": "Filter to a specific SDK name.",
      "sdkType": "Filter to a specific SDK type (for example, 'server', 'browser', 'mobile').",
      "sdkAppId": "Filter to a specific SDK application ID.",
      "connectionType": "Filter to a specific connection type (for example, 'direct', 'proxy')."
    }
  },
  "getSdkVersionsDetails": {
    "accessPath": [
      "getSdkVersionsDetails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/sdk-versions/details",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get SDK versions usage details"
  },
  "getContextsServersideUsage": {
    "accessPath": [
      "getContextsServersideUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/serverside-contexts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "contextKind",
      "sdkName",
      "anonymous",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get contexts serverside usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "contextKind": "A context kind to filter results by. Can be specified multiple times, one query parameter per context kind.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "anonymous": "An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`.",
      "groupBy": "If specified, returns data for each distinct value of the given field. `contextKind` is always included as a grouping dimension. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkAppId`, `anonymousV2`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only."
    }
  },
  "getServiceConnectionsUsage": {
    "accessPath": [
      "getServiceConnectionsUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/service-connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "connectionType",
      "relayVersion",
      "sdkName",
      "sdkVersion",
      "sdkType",
      "sdkAppId",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get service connections usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "connectionType": "A connection type to filter results by. Can be specified multiple times, one query parameter per connection type.",
      "relayVersion": "A relay version to filter results by. Can be specified multiple times, one query parameter per relay version.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "sdkVersion": "An SDK version to filter results by. Can be specified multiple times, one query parameter per SDK version.",
      "sdkType": "An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type.",
      "sdkAppId": "An SDK app ID to filter results by. Can be specified multiple times, one query parameter per SDK app ID.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `connectionType`, `relayVersion`, `sdkName`, `sdkVersion`, `sdkType`, `sdkAppId`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. `monthly` granularity is only supported with the **month_to_date** aggregation type.<br/>Valid values: `daily`, `hourly`, `monthly`."
    }
  },
  "getStreamUsage": {
    "accessPath": [
      "getStreamUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/streams/{source}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "tz"
    ],
    "description": "Get stream usage",
    "parameterDescriptions": {
      "source": "The source of streaming connections to describe. Must be either `client` or `server`.",
      "from": "The series of data returned starts from this timestamp. Defaults to 30 days ago.",
      "to": "The series of data returned ends at this timestamp. Defaults to the current time.",
      "tz": "The timezone to use for breaks between days when returning daily data."
    }
  },
  "getStreamUsageBySdkVersion": {
    "accessPath": [
      "getStreamUsageBySdkVersion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/streams/{source}/bysdkversion",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "tz",
      "sdk",
      "version"
    ],
    "description": "Get stream usage by SDK version",
    "parameterDescriptions": {
      "source": "The source of streaming connections to describe. Must be either `client` or `server`.",
      "from": "The series of data returned starts from this timestamp. Defaults to 24 hours ago.",
      "to": "The series of data returned ends at this timestamp. Defaults to the current time.",
      "tz": "The timezone to use for breaks between days when returning daily data.",
      "sdk": "If included, this filters the returned series to only those that match this SDK name.",
      "version": "If included, this filters the returned series to only those that match this SDK version."
    }
  },
  "getStreamUsageSdkversion": {
    "accessPath": [
      "getStreamUsageSdkversion"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/streams/{source}/sdkversions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get stream usage SDK versions",
    "parameterDescriptions": {
      "source": "The source of streaming connections to describe. Must be either `client` or `server`."
    }
  },
  "getContextsTotalUsage": {
    "accessPath": [
      "getContextsTotalUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/total-contexts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "contextKind",
      "sdkName",
      "sdkType",
      "anonymous",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get contexts total usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "contextKind": "A context kind to filter results by. Can be specified multiple times, one query parameter per context kind.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "sdkType": "An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type.",
      "anonymous": "An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`.",
      "groupBy": "If specified, returns data for each distinct value of the given field. `contextKind` is always included as a grouping dimension. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkType`, `sdkAppId`, `anonymousV2`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only."
    }
  },
  "getMAUTotalUsage": {
    "accessPath": [
      "getMauTotalUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/total-mau",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "environmentKey",
      "sdkName",
      "sdkType",
      "anonymous",
      "groupBy",
      "aggregationType",
      "granularity"
    ],
    "description": "Get MAU total usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix milliseconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix milliseconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "environmentKey": "An environment key to filter results by. If specified, exactly one `projectKey` must be provided. Can be specified multiple times, one query parameter per environment key.",
      "sdkName": "An SDK name to filter results by. Can be specified multiple times, one query parameter per SDK name.",
      "sdkType": "An SDK type to filter results by. Can be specified multiple times, one query parameter per SDK type.",
      "anonymous": "An anonymous value to filter results by. Can be specified multiple times, one query parameter per anonymous value.<br/>Valid values: `true`, `false`.",
      "groupBy": "If specified, returns data for each distinct value of the given field. Can be specified multiple times to group data by multiple dimensions, one query parameter per dimension.<br/>Valid values: `projectId`, `environmentId`, `sdkName`, `sdkType`, `sdkAppId`, `anonymousV2`.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only."
    }
  },
  "getVegaAIUsage": {
    "accessPath": [
      "getVegaAiUsage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/vega-ai",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "projectKey",
      "granularity",
      "aggregationType"
    ],
    "description": "Get Vega AI usage",
    "parameterDescriptions": {
      "from": "The series of data returned starts from this timestamp (Unix seconds). Defaults to the beginning of the current month.",
      "to": "The series of data returned ends at this timestamp (Unix seconds). Defaults to the current time.",
      "projectKey": "A project key to filter results by. Can be specified multiple times, one query parameter per project key.",
      "granularity": "Specifies the data granularity. Defaults to `daily`. Valid values depend on `aggregationType`: **month_to_date** supports `daily` and `monthly`; **incremental** and **rolling_30d** support `daily` only.",
      "aggregationType": "Specifies the aggregation method. Defaults to `month_to_date`.<br/>Valid values: `month_to_date`, `incremental`, `rolling_30d`."
    }
  },
  "getUserAttributeNames": {
    "accessPath": [
      "getUserAttributeNames"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/user-attributes/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get user attribute names",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key"
    }
  },
  "getSearchUsers": {
    "accessPath": [
      "getSearchUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/user-search/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "offset",
      "after",
      "sort",
      "searchAfter",
      "filter"
    ],
    "description": "Find users",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "q": "Full-text search for users based on name, first name, last name, e-mail address, or key",
      "limit": "Specifies the maximum number of items in the collection to return (max: 50, default: 20)",
      "offset": "Deprecated, use `searchAfter` instead. Specifies the first item to return in the collection.",
      "after": "A Unix epoch time in milliseconds specifying the maximum last time a user requested a feature flag from LaunchDarkly",
      "sort": "Specifies a field by which to sort. LaunchDarkly supports the `userKey` and `lastSeen` fields. Fields prefixed by a dash ( - ) sort in descending order.",
      "searchAfter": "Limits results to users with sort values after the value you specify. You can use this for pagination, but we recommend using the `next` link we provide instead.",
      "filter": "A comma-separated list of user attribute filters. Each filter is in the form of attributeKey:attributeValue"
    }
  },
  "getUsers": {
    "accessPath": [
      "getUsers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{projectKey}/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "searchAfter"
    ],
    "description": "List users",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "limit": "The number of elements to return per page",
      "searchAfter": "Limits results to users with sort values after the value you specify. You can use this for pagination, but we recommend using the `next` link we provide instead."
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
    "routeTemplate": "/api/v2/users/{projectKey}/{environmentKey}/{userKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "userKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "userKey": "The user key"
    }
  },
  "deleteUser": {
    "accessPath": [
      "deleteUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/users/{projectKey}/{environmentKey}/{userKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "userKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "userKey": "The user key"
    }
  },
  "getUserFlagSettings": {
    "accessPath": [
      "getUserFlagSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{projectKey}/{environmentKey}/{userKey}/flags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "userKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List flag settings for user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "userKey": "The user key"
    }
  },
  "getUserFlagSetting": {
    "accessPath": [
      "getUserFlagSetting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{projectKey}/{environmentKey}/{userKey}/flags/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "userKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get flag setting for user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "userKey": "The user key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "putFlagSetting": {
    "accessPath": [
      "putFlagSetting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "setting",
      "comment"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/users/{projectKey}/{environmentKey}/{userKey}/flags/{featureFlagKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "environmentKey",
      "userKey",
      "featureFlagKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update flag settings for user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "userKey": "The user key",
      "featureFlagKey": "The feature flag key"
    }
  },
  "getExpiringFlagsForUser": {
    "accessPath": [
      "getExpiringFlagsForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{projectKey}/{userKey}/expiring-user-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "userKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get expiring dates on flags for user",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "userKey": "The user key",
      "environmentKey": "The environment key"
    }
  },
  "patchExpiringFlagsForUser": {
    "accessPath": [
      "patchExpiringFlagsForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/users/{projectKey}/{userKey}/expiring-user-targets/{environmentKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "userKey",
      "environmentKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update expiring user target for flags",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "userKey": "The user key",
      "environmentKey": "The environment key"
    }
  },
  "getVersions": {
    "accessPath": [
      "getVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get version information"
  },
  "getAllWebhooks": {
    "accessPath": [
      "getAllWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List webhooks"
  },
  "postWebhook": {
    "accessPath": [
      "postWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "url",
      "secret",
      "statements",
      "sign",
      "on",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates a webhook"
  },
  "getWebhook": {
    "accessPath": [
      "getWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/webhooks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get webhook",
    "parameterDescriptions": {
      "id": "The ID of the webhook"
    }
  },
  "patchWebhook": {
    "accessPath": [
      "patchWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/webhooks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update webhook",
    "parameterDescriptions": {
      "id": "The ID of the webhook to update"
    }
  },
  "deleteWebhook": {
    "accessPath": [
      "deleteWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/webhooks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete webhook",
    "parameterDescriptions": {
      "id": "The ID of the webhook to delete"
    }
  },
  "getTags": {
    "accessPath": [
      "getTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "kind",
      "pre",
      "archived",
      "limit",
      "offset",
      "asOf"
    ],
    "description": "List tags",
    "parameterDescriptions": {
      "kind": "Fetch tags associated with the specified resource type. Options are `flag`, `project`, `environment`, `segment`, `metric`, `metric-data-source`, `aiconfig`, and `view`. Returns all types by default.",
      "pre": "Return tags with the specified prefix",
      "archived": "Whether or not to return archived flags",
      "limit": "The number of tags to return. Maximum is 1000.",
      "offset": "The index of the first tag to return. Default is 0.",
      "asOf": "The time to retrieve tags as of. Default is the current time."
    }
  },
  "getAIConfigTargeting": {
    "accessPath": [
      "getAiConfigTargeting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/targeting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Show an AI Config's targeting"
  },
  "patchAIConfigTargeting": {
    "accessPath": [
      "patchAiConfigTargeting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "environmentKey",
      "instructions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/targeting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update AI Config targeting"
  },
  "getAIConfigs": {
    "accessPath": [
      "getAiConfigs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort",
      "limit",
      "offset",
      "filter"
    ],
    "description": "List AI Configs",
    "parameterDescriptions": {
      "sort": "A sort to apply to the list of AI Configs.",
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A filter to apply to the list."
    }
  },
  "postAIConfig": {
    "accessPath": [
      "postAiConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "key",
      "maintainerId",
      "maintainerTeamKey",
      "mode",
      "name",
      "tags",
      "viewKeys",
      "defaultVariation",
      "evaluationMetricKey",
      "isInverted"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create new AI Config"
  },
  "deleteAIConfig": {
    "accessPath": [
      "deleteAiConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete AI Config"
  },
  "getAIConfig": {
    "accessPath": [
      "getAiConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get AI Config"
  },
  "patchAIConfig": {
    "accessPath": [
      "patchAiConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "maintainerId",
      "maintainerTeamKey",
      "name",
      "tags",
      "evaluationMetricKey",
      "isInverted"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update AI Config"
  },
  "postAIConfigVariation": {
    "accessPath": [
      "postAiConfigVariation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "description",
      "instructions",
      "key",
      "messages",
      "model",
      "name",
      "modelConfigKey",
      "tools",
      "toolKeys",
      "judgeConfiguration"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/variations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create AI Config variation"
  },
  "deleteAIConfigVariation": {
    "accessPath": [
      "deleteAiConfigVariation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/variations/{variationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey",
      "variationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete AI Config variation"
  },
  "getAIConfigVariation": {
    "accessPath": [
      "getAiConfigVariation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/variations/{variationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey",
      "variationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get AI Config variation"
  },
  "patchAIConfigVariation": {
    "accessPath": [
      "patchAiConfigVariation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "comment",
      "description",
      "instructions",
      "messages",
      "model",
      "modelConfigKey",
      "name",
      "published",
      "state",
      "tools",
      "toolKeys",
      "judgeConfiguration"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/variations/{variationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey",
      "variationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update AI Config variation"
  },
  "getAIConfigQuickStats": {
    "accessPath": [
      "getAiConfigQuickStats"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/quick-stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "env"
    ],
    "description": "Get AI Config quick stats",
    "parameterDescriptions": {
      "env": "An environment key. Only metrics from this environment will be included."
    }
  },
  "getAIConfigMetrics": {
    "accessPath": [
      "getAiConfigMetrics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "env"
    ],
    "description": "Get AI Config metrics",
    "parameterDescriptions": {
      "from": "The starting time, as milliseconds since epoch (inclusive).",
      "to": "The ending time, as milliseconds since epoch (exclusive). May not be more than 100 days after `from`.",
      "env": "An environment key. Only metrics from this environment will be included."
    }
  },
  "getAIConfigMetricsByVariation": {
    "accessPath": [
      "getAiConfigMetricsByVariation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/{configKey}/metrics-by-variation",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "configKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "env"
    ],
    "description": "Get AI Config metrics by variation",
    "parameterDescriptions": {
      "from": "The starting time, as milliseconds since epoch (inclusive).",
      "to": "The ending time, as milliseconds since epoch (exclusive). May not be more than 100 days after `from`.",
      "env": "An environment key. Only metrics from this environment will be included."
    }
  },
  "deleteRestrictedModels": {
    "accessPath": [
      "deleteRestrictedModels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "keys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/model-configs/restricted",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove AI models from the restricted list"
  },
  "postRestrictedModels": {
    "accessPath": [
      "postRestrictedModels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "keys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/model-configs/restricted",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add AI models to the restricted list"
  },
  "listModelConfigs": {
    "accessPath": [
      "listModelConfigs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/model-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "restricted"
    ],
    "description": "List AI model configs",
    "parameterDescriptions": {
      "restricted": "Whether to return only restricted models"
    }
  },
  "postModelConfig": {
    "accessPath": [
      "postModelConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "id",
      "icon",
      "provider",
      "params",
      "customParams",
      "tags",
      "costPerInputToken",
      "costPerOutputToken",
      "costPerCachedInputToken"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/model-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an AI model config"
  },
  "deleteModelConfig": {
    "accessPath": [
      "deleteModelConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/model-configs/{modelConfigKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "modelConfigKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an AI model config"
  },
  "getModelConfig": {
    "accessPath": [
      "getModelConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/model-configs/{modelConfigKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "modelConfigKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get AI model config"
  },
  "listAITools": {
    "accessPath": [
      "listAiTools"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort",
      "limit",
      "offset",
      "filter"
    ],
    "description": "List AI tools",
    "parameterDescriptions": {
      "sort": "A sort to apply to the list of AI Configs.",
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A filter to apply to the list."
    }
  },
  "postAITool": {
    "accessPath": [
      "postAiTool"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "maintainerId",
      "maintainerTeamKey",
      "description",
      "schema",
      "customParameters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an AI tool"
  },
  "listAIToolVersions": {
    "accessPath": [
      "listAiToolVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools/{toolKey}/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "toolKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort",
      "limit",
      "offset"
    ],
    "description": "List AI tool versions",
    "parameterDescriptions": {
      "sort": "A sort to apply to the list of AI Configs.",
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "listAIToolReferences": {
    "accessPath": [
      "listAiToolReferences"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools/{toolKey}/references",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "toolKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List AI tool references",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "deleteAITool": {
    "accessPath": [
      "deleteAiTool"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools/{toolKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "toolKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete AI tool"
  },
  "getAITool": {
    "accessPath": [
      "getAiTool"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools/{toolKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "toolKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get AI tool"
  },
  "patchAITool": {
    "accessPath": [
      "patchAiTool"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "maintainerId",
      "maintainerTeamKey",
      "description",
      "schema",
      "customParameters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-tools/{toolKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "toolKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update AI tool"
  },
  "listPromptSnippets": {
    "accessPath": [
      "listPromptSnippets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "filter"
    ],
    "description": "List prompt snippets",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A filter to apply to the list."
    }
  },
  "postPromptSnippet": {
    "accessPath": [
      "postPromptSnippet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "description",
      "text",
      "maintainerId",
      "maintainerTeamKey",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a prompt snippet"
  },
  "deletePromptSnippet": {
    "accessPath": [
      "deletePromptSnippet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets/{snippetKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "snippetKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a prompt snippet"
  },
  "getPromptSnippet": {
    "accessPath": [
      "getPromptSnippet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets/{snippetKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "snippetKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a prompt snippet"
  },
  "patchPromptSnippet": {
    "accessPath": [
      "patchPromptSnippet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "text",
      "maintainerId",
      "maintainerTeamKey",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets/{snippetKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "snippetKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a prompt snippet"
  },
  "listPromptSnippetReferences": {
    "accessPath": [
      "listPromptSnippetReferences"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets/{snippetKey}/references",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "snippetKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List prompt snippet references",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "listPromptSnippetVersions": {
    "accessPath": [
      "listPromptSnippetVersions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/ai-configs/prompt-snippets/{snippetKey}/versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "snippetKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List prompt snippet versions",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "listAgentGraphs": {
    "accessPath": [
      "listAgentGraphs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-graphs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List agent graphs",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postAgentGraph": {
    "accessPath": [
      "postAgentGraph"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "description",
      "maintainerId",
      "maintainerTeamKey",
      "rootConfigKey",
      "edges"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-graphs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create new agent graph",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "deleteAgentGraph": {
    "accessPath": [
      "deleteAgentGraph"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-graphs/{graphKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "graphKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete agent graph",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "getAgentGraph": {
    "accessPath": [
      "getAgentGraph"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-graphs/{graphKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "graphKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get agent graph",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "patchAgentGraph": {
    "accessPath": [
      "patchAgentGraph"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "maintainerId",
      "maintainerTeamKey",
      "rootConfigKey",
      "edges"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-graphs/{graphKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "graphKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update agent graph",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "listAgentOptimizations": {
    "accessPath": [
      "listAgentOptimizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List agent optimizations",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postAgentOptimization": {
    "accessPath": [
      "postAgentOptimization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "aiConfigKey",
      "maxAttempts",
      "modelChoices",
      "judgeModel",
      "variableChoices",
      "acceptanceStatements",
      "judges",
      "userInputOptions",
      "groundTruthResponses",
      "metricKey",
      "tokenLimit",
      "variationKey",
      "label",
      "latencyOptimization",
      "tokenOptimization",
      "autoCommit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create agent optimization"
  },
  "deleteAgentOptimization": {
    "accessPath": [
      "deleteAgentOptimization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an agent optimization"
  },
  "getAgentOptimization": {
    "accessPath": [
      "getAgentOptimization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get an agent optimization"
  },
  "patchAgentOptimization": {
    "accessPath": [
      "patchAgentOptimization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "maxAttempts",
      "modelChoices",
      "judgeModel",
      "variableChoices",
      "acceptanceStatements",
      "judges",
      "userInputOptions",
      "groundTruthResponses",
      "metricKey",
      "tokenLimit",
      "variationKey",
      "label",
      "latencyOptimization",
      "tokenOptimization",
      "autoCommit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an agent optimization"
  },
  "listAgentOptimizationResults": {
    "accessPath": [
      "listAgentOptimizationResults"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}/results",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List agent optimization runs",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "postAgentOptimizationResult": {
    "accessPath": [
      "postAgentOptimizationResult"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "runId",
      "agentOptimizationVersion",
      "iteration",
      "instructions",
      "userInput",
      "parameters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}/results",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create agent optimization result"
  },
  "listAllAgentOptimizationResults": {
    "accessPath": [
      "listAllAgentOptimizationResults"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}/all-results",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List all agent optimization results across versions",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "listAgentOptimizationRuns": {
    "accessPath": [
      "listAgentOptimizationRuns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}/runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset"
    ],
    "description": "List agent optimization runs",
    "parameterDescriptions": {
      "limit": "The number of resources to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "listAgentOptimizationResultsByRunId": {
    "accessPath": [
      "listAgentOptimizationResultsByRunId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}/runs/{runId}/results",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey",
      "runId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List agent optimization results for a run"
  },
  "patchAgentOptimizationResult": {
    "accessPath": [
      "patchAgentOptimizationResult"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "status",
      "activity",
      "completionResponse",
      "variation",
      "scores",
      "generationTokens",
      "evaluationTokens",
      "generationLatency",
      "evaluationLatencies",
      "createdVariationKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/agent-optimizations/{optimizationKey}/results/{resultId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "optimizationKey",
      "resultId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an agent optimization result"
  },
  "getAnnouncementsPublic": {
    "accessPath": [
      "getAnnouncementsPublic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/announcements",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status",
      "limit",
      "offset"
    ],
    "description": "Get announcements",
    "parameterDescriptions": {
      "status": "Filter announcements by status.",
      "limit": "The number of announcements to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "createAnnouncementPublic": {
    "accessPath": [
      "createAnnouncementPublic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "isDismissible",
      "title",
      "message",
      "startTime",
      "endTime",
      "severity"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/announcements",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an announcement"
  },
  "deleteAnnouncementPublic": {
    "accessPath": [
      "deleteAnnouncementPublic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/announcements/{announcementId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "announcementId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an announcement"
  },
  "updateAnnouncementPublic": {
    "accessPath": [
      "updateAnnouncementPublic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/announcements/{announcementId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "announcementId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an announcement"
  },
  "getApprovalRequestSettings": {
    "accessPath": [
      "getApprovalRequestSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/approval-requests/projects/{projectKey}/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "environmentKey",
      "resourceKind",
      "expand"
    ],
    "description": "Get approval request settings",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "environmentKey": "An environment key filter to apply to the approval request settings.",
      "resourceKind": "A resource kind filter to apply to the approval request settings.",
      "expand": "A comma-separated list of fields to expand in the response. Options include 'default' and 'strict'."
    }
  },
  "patchApprovalRequestSettings": {
    "accessPath": [
      "patchApprovalRequestSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "autoApplyApprovedChanges",
      "bypassApprovalsForPendingChanges",
      "canApplyDeclinedChanges",
      "canReviewOwnRequest",
      "environmentKey",
      "minNumApprovals",
      "required",
      "requiredApprovalTags",
      "resourceKind",
      "serviceConfig",
      "serviceKind",
      "serviceKindConfigurationId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/api/v2/approval-requests/projects/{projectKey}/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update approval request settings",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "getViews": {
    "accessPath": [
      "getViews"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/views",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort",
      "limit",
      "offset",
      "filter",
      "expand"
    ],
    "description": "List views",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "sort": "A sort to apply to the list of views.",
      "limit": "The number of views to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A filter to apply to the list of views. Supports the following fields and operators: `name` (equals, notEquals, startsWith, contains, anyOf), `key` (equals, notEquals, startsWith, contains, anyOf), `tag` (equals, anyOf), `maintainerId` (equals, anyOf), `isPayloadView` (equals).",
      "expand": "A comma-separated list of fields to expand."
    }
  },
  "createView": {
    "accessPath": [
      "createView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "name",
      "description",
      "maintainerId",
      "maintainerTeamKey",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/views",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create view",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "deleteView": {
    "accessPath": [
      "deleteView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/views/{viewKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "viewKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete view",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "getView": {
    "accessPath": [
      "getView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/views/{viewKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "viewKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort",
      "limit",
      "offset",
      "filter",
      "expand"
    ],
    "description": "Get view",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "sort": "A sort to apply to the list of views.",
      "limit": "The number of views to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "filter": "A filter to apply to the list of views. Supports the following fields and operators: `name` (equals, notEquals, startsWith, contains, anyOf), `key` (equals, notEquals, startsWith, contains, anyOf), `tag` (equals, anyOf), `maintainerId` (equals, anyOf), `isPayloadView` (equals).",
      "expand": "A comma-separated list of fields to expand."
    }
  },
  "updateView": {
    "accessPath": [
      "updateView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "maintainerId",
      "maintainerTeamKey",
      "tags",
      "archived"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/api/v2/projects/{projectKey}/views/{viewKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "viewKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update view",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "unlinkResource": {
    "accessPath": [
      "unlinkResource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/views/{viewKey}/link/{resourceType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "viewKey",
      "resourceType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unlink resource",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "linkResource": {
    "accessPath": [
      "linkResource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/views/{viewKey}/link/{resourceType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "viewKey",
      "resourceType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Link resource",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint."
    }
  },
  "getLinkedResources": {
    "accessPath": [
      "getLinkedResources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/views/{viewKey}/linked/{resourceType}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "viewKey",
      "resourceType"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "sort",
      "query",
      "filter",
      "expand"
    ],
    "description": "Get linked resources",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "limit": "The number of views to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "sort": "Field to sort by. Default field is `linkedAt`, default order is ascending.",
      "query": "Case-insensitive search query for linked resources. Matches resource key and, when expanded, resource name.",
      "filter": "Optional resource filter expression for linked resources.\n- Supported for `flags` and `segments` resource types.\n- Uses the same syntax as link/unlink and list endpoints.\n- For `segments`, `environmentId` is required when `filter` is provided.\n",
      "expand": "A comma-separated list of fields to expand."
    }
  },
  "getLinkedViews": {
    "accessPath": [
      "getLinkedViews"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/view-associations/{resourceType}/{resourceKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "resourceType",
      "resourceKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "environmentId",
      "limit",
      "offset"
    ],
    "description": "Get linked views for a given resource",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "environmentId": "Environment ID. Required when resourceType is 'segments'",
      "limit": "The number of views to return.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`."
    }
  },
  "GetReleasePolicies": {
    "accessPath": [
      "getReleasePolicies"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-policies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "excludeDefault"
    ],
    "description": "List release policies",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "projectKey": "The project key",
      "excludeDefault": "When true, exclude the default release policy from the response. When false or omitted, include the default policy if an environment filter is present."
    }
  },
  "PostReleasePolicy": {
    "accessPath": [
      "postReleasePolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "scope",
      "releaseMethod",
      "guardedReleaseConfig",
      "progressiveReleaseConfig",
      "name",
      "key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-policies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a release policy",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "projectKey": "The project key"
    }
  },
  "PostReleasePoliciesOrder": {
    "accessPath": [
      "postReleasePoliciesOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-policies/order",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the order of existing release policies",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "projectKey": "The project key"
    }
  },
  "DeleteReleasePolicy": {
    "accessPath": [
      "deleteReleasePolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-policies/{policyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "policyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a release policy",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "projectKey": "The project key",
      "policyKey": "The human-readable key of the release policy"
    }
  },
  "GetReleasePolicy": {
    "accessPath": [
      "getReleasePolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "GET",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-policies/{policyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "policyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a release policy by key",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "projectKey": "The project key",
      "policyKey": "The release policy key"
    }
  },
  "PutReleasePolicy": {
    "accessPath": [
      "putReleasePolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "scope",
      "releaseMethod",
      "guardedReleaseConfig",
      "progressiveReleaseConfig",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "LD-API-Version"
    ],
    "method": "PUT",
    "routeTemplate": "/api/v2/projects/{projectKey}/release-policies/{policyKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "projectKey",
      "policyKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a release policy",
    "parameterDescriptions": {
      "LD-API-Version": "Version of the endpoint.",
      "projectKey": "The project key",
      "policyKey": "The human-readable key of the release policy"
    }
  },
  "getIpAllowlist": {
    "accessPath": [
      "getIpAllowlist"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/account/ip-allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get IP Allowlist"
  },
  "patchIpAllowlistConfig": {
    "accessPath": [
      "patchIpAllowlistConfig"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sessionAllowlistEnabled",
      "apiTokenAllowlistEnabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/account/ip-allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update IP Allowlist Configuration"
  },
  "createIpAllowlistEntry": {
    "accessPath": [
      "createIpAllowlistEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ipAddress",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/account/ip-allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create IP Allowlist Entry"
  },
  "deleteIpAllowlistEntry": {
    "accessPath": [
      "deleteIpAllowlistEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/account/ip-allowlist/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete IP Allowlist Entry",
    "parameterDescriptions": {
      "id": "Unique identifier for the allowlist entry"
    }
  },
  "patchIpAllowlistEntry": {
    "accessPath": [
      "patchIpAllowlistEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/account/ip-allowlist/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update IP Allowlist Entry Description",
    "parameterDescriptions": {
      "id": "Unique identifier for the allowlist entry"
    }
  },
  "getDeploymentFrequencyChart": {
    "accessPath": [
      "getDeploymentFrequencyChart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/charts/deployments/frequency",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "from",
      "to",
      "bucketType",
      "bucketMs",
      "groupBy",
      "expand"
    ],
    "description": "Get deployment frequency chart data",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys",
      "from": "Unix timestamp in milliseconds. Default value is 7 days ago.",
      "to": "Unix timestamp in milliseconds. Default value is now.",
      "bucketType": "Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`.",
      "bucketMs": "Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds).",
      "groupBy": "Options: `application`, `kind`",
      "expand": "Options: `metrics`"
    }
  },
  "getStaleFlagsChart": {
    "accessPath": [
      "getStaleFlagsChart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/charts/flags/stale",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "groupBy",
      "maintainerId",
      "maintainerTeamKey",
      "expand"
    ],
    "description": "Get stale flags chart data",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys",
      "groupBy": "Property to group results by. Options: `maintainer`",
      "maintainerId": "Comma-separated list of individual maintainers to filter results.",
      "maintainerTeamKey": "Comma-separated list of team maintainer keys to filter results.",
      "expand": "Options: `metrics`"
    }
  },
  "getFlagStatusChart": {
    "accessPath": [
      "getFlagStatusChart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/charts/flags/status",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey"
    ],
    "description": "Get flag status chart data",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys"
    }
  },
  "getLeadTimeChart": {
    "accessPath": [
      "getLeadTimeChart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/charts/lead-time",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "from",
      "to",
      "bucketType",
      "bucketMs",
      "groupBy",
      "expand"
    ],
    "description": "Get lead time chart data",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys",
      "from": "Unix timestamp in milliseconds. Default value is 7 days ago.",
      "to": "Unix timestamp in milliseconds. Default value is now.",
      "bucketType": "Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`.",
      "bucketMs": "Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds).",
      "groupBy": "Options: `application`, `stage`. Default: `stage`.",
      "expand": "Options: `metrics`, `percentiles`."
    }
  },
  "getReleaseFrequencyChart": {
    "accessPath": [
      "getReleaseFrequencyChart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/charts/releases/frequency",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "hasExperiments",
      "global",
      "groupBy",
      "from",
      "to",
      "bucketType",
      "bucketMs",
      "expand"
    ],
    "description": "Get release frequency chart data",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys",
      "hasExperiments": "Filter events to those associated with an experiment (`true`) or without an experiment (`false`)",
      "global": "Filter to include or exclude global events. Default value is `include`. Options: `include`, `exclude`",
      "groupBy": "Property to group results by. Options: `impact`",
      "from": "Unix timestamp in milliseconds. Default value is 7 days ago.",
      "to": "Unix timestamp in milliseconds. Default value is now.",
      "bucketType": "Specify type of bucket. Options: `rolling`, `hour`, `day`. Default: `rolling`.",
      "bucketMs": "Duration of intervals for x-axis in milliseconds. Default value is one day (`86400000` milliseconds).",
      "expand": "Options: `metrics`"
    }
  },
  "createDeploymentEvent": {
    "accessPath": [
      "createDeploymentEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "applicationName",
      "applicationKind",
      "version",
      "versionName",
      "eventType",
      "eventTime",
      "eventMetadata",
      "deploymentMetadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/engineering-insights/deployment-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create deployment event"
  },
  "getDeployments": {
    "accessPath": [
      "getDeployments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/deployments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "limit",
      "expand",
      "from",
      "to",
      "after",
      "before",
      "kind",
      "status"
    ],
    "description": "List deployments",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys",
      "limit": "The number of deployments to return. Default is 20. Maximum allowed is 100.",
      "expand": "Expand properties in response. Options: `pullRequests`, `flagReferences`",
      "from": "Unix timestamp in milliseconds. Default value is 7 days ago.",
      "to": "Unix timestamp in milliseconds. Default value is now.",
      "after": "Identifier used for pagination",
      "before": "Identifier used for pagination",
      "kind": "The deployment kind",
      "status": "The deployment status"
    }
  },
  "getDeployment": {
    "accessPath": [
      "getDeployment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/deployments/{deploymentID}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deploymentID"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get deployment",
    "parameterDescriptions": {
      "deploymentID": "The deployment ID",
      "expand": "Expand properties in response. Options: `pullRequests`, `flagReferences`"
    }
  },
  "updateDeployment": {
    "accessPath": [
      "updateDeployment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/engineering-insights/deployments/{deploymentID}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deploymentID"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update deployment",
    "parameterDescriptions": {
      "deploymentID": "The deployment ID"
    }
  },
  "getFlagEvents": {
    "accessPath": [
      "getFlagEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/flag-events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "query",
      "impactSize",
      "hasExperiments",
      "global",
      "expand",
      "limit",
      "from",
      "to",
      "after",
      "before"
    ],
    "description": "List flag events",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys",
      "query": "Filter events by flag key",
      "impactSize": "Filter events by impact size. A small impact created a less than 20% change in the proportion of end users receiving one or more flag variations. A medium impact created between a 20%-80% change. A large impact created a more than 80% change. Options: `none`, `small`, `medium`, `large`",
      "hasExperiments": "Filter events to those associated with an experiment (`true`) or without an experiment (`false`)",
      "global": "Filter to include or exclude global events. Default value is `include`. Options: `include`, `exclude`",
      "expand": "Expand properties in response. Options: `experiments`",
      "limit": "The number of deployments to return. Default is 20. Maximum allowed is 100.",
      "from": "Unix timestamp in milliseconds. Default value is 7 days ago.",
      "to": "Unix timestamp in milliseconds. Default value is now.",
      "after": "Identifier used for pagination",
      "before": "Identifier used for pagination"
    }
  },
  "createInsightGroup": {
    "accessPath": [
      "createInsightGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "key",
      "projectKey",
      "environmentKey",
      "applicationKeys"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/engineering-insights/insights/group",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create insight group"
  },
  "getInsightGroups": {
    "accessPath": [
      "getInsightGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/insights/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "offset",
      "sort",
      "query",
      "expand"
    ],
    "description": "List insight groups",
    "parameterDescriptions": {
      "limit": "The number of insight groups to return. Default is 20. Must be between 1 and 20 inclusive.",
      "offset": "Where to start in the list. Use this with pagination. For example, an offset of 10 skips the first ten items and then returns the next items in the list, up to the query `limit`.",
      "sort": "Sort flag list by field. Prefix field with <code>-</code> to sort in descending order. Allowed fields: name",
      "query": "Filter list of insights groups by name.",
      "expand": "Options: `scores`, `environment`, `metadata`"
    }
  },
  "getInsightGroup": {
    "accessPath": [
      "getInsightGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/insights/groups/{insightGroupKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "insightGroupKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Get insight group",
    "parameterDescriptions": {
      "insightGroupKey": "The insight group key",
      "expand": "Options: `scores`, `environment`"
    }
  },
  "patchInsightGroup": {
    "accessPath": [
      "patchInsightGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/engineering-insights/insights/groups/{insightGroupKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "insightGroupKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Patch insight group",
    "parameterDescriptions": {
      "insightGroupKey": "The insight group key"
    }
  },
  "deleteInsightGroup": {
    "accessPath": [
      "deleteInsightGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/engineering-insights/insights/groups/{insightGroupKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "insightGroupKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete insight group",
    "parameterDescriptions": {
      "insightGroupKey": "The insight group key"
    }
  },
  "getInsightsScores": {
    "accessPath": [
      "getInsightsScores"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/insights/scores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey"
    ],
    "description": "Get insight scores",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "The environment key",
      "applicationKey": "Comma separated list of application keys"
    }
  },
  "getPullRequests": {
    "accessPath": [
      "getPullRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/pull-requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "projectKey",
      "environmentKey",
      "applicationKey",
      "status",
      "query",
      "limit",
      "expand",
      "sort",
      "from",
      "to",
      "after",
      "before"
    ],
    "description": "List pull requests",
    "parameterDescriptions": {
      "projectKey": "The project key",
      "environmentKey": "Required if you are using the <code>sort</code> parameter's <code>leadTime</code> option to sort pull requests.",
      "applicationKey": "Filter the results to pull requests deployed to a comma separated list of applications",
      "status": "Filter results to pull requests with the given status. Options: `open`, `merged`, `closed`, `deployed`.",
      "query": "Filter list of pull requests by title or author",
      "limit": "The number of pull requests to return. Default is 20. Maximum allowed is 100.",
      "expand": "Expand properties in response. Options: `deployments`, `flagReferences`, `leadTime`.",
      "sort": "Sort results. Requires the `environmentKey` to be set. Options: `leadTime` (asc) and `-leadTime` (desc). When query option is excluded, default sort is by created or merged date.",
      "from": "Unix timestamp in milliseconds. Default value is 7 days ago.",
      "to": "Unix timestamp in milliseconds. Default value is now.",
      "after": "Identifier used for pagination",
      "before": "Identifier used for pagination"
    }
  },
  "getInsightsRepositories": {
    "accessPath": [
      "getInsightsRepositories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/engineering-insights/repositories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "List repositories",
    "parameterDescriptions": {
      "expand": "Expand properties in response. Options: `projects`"
    }
  },
  "associateRepositoriesAndProjects": {
    "accessPath": [
      "associateRepositoriesAndProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "mappings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/engineering-insights/repositories/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Associate repositories with projects"
  },
  "deleteRepositoryProject": {
    "accessPath": [
      "deleteRepositoryProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/engineering-insights/repositories/{repositoryKey}/projects/{projectKey}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "repositoryKey",
      "projectKey"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove repository project association",
    "parameterDescriptions": {
      "repositoryKey": "The repository key",
      "projectKey": "The project key"
    }
  }
} satisfies ToolRuntimeMetadataMap;
