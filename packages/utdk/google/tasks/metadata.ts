import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "tasks.tasks.clear": {
    "accessPath": [
      "tasksTasksClear"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/clear",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
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
      "uploadType"
    ],
    "description": "Clears all completed tasks from the specified task list. The affected tasks will be marked as 'hidden' and no longer be returned by default when retrieving all tasks for a task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier."
    }
  },
  "tasks.tasks.list": {
    "accessPath": [
      "tasksTasksList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
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
      "completedMax",
      "completedMin",
      "dueMax",
      "dueMin",
      "maxResults",
      "pageToken",
      "showCompleted",
      "showDeleted",
      "showHidden",
      "updatedMin"
    ],
    "description": "Returns all tasks in the specified task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "completedMax": "Upper bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.",
      "completedMin": "Lower bound for a task's completion date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by completion date.",
      "dueMax": "Upper bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.",
      "dueMin": "Lower bound for a task's due date (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by due date.",
      "maxResults": "Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100).",
      "pageToken": "Token specifying the result page to return. Optional.",
      "showCompleted": "Flag indicating whether completed tasks are returned in the result. Optional. The default is True. Note that showHidden must also be True to show tasks completed in first party clients, such as the web UI and Google's mobile apps.",
      "showDeleted": "Flag indicating whether deleted tasks are returned in the result. Optional. The default is False.",
      "showHidden": "Flag indicating whether hidden tasks are returned in the result. Optional. The default is False.",
      "updatedMin": "Lower bound for a task's last modification time (as a RFC 3339 timestamp) to filter by. Optional. The default is not to filter by last modification time."
    }
  },
  "tasks.tasks.insert": {
    "accessPath": [
      "tasksTasksInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "completed",
      "deleted",
      "due",
      "etag",
      "hidden",
      "id",
      "kind",
      "links",
      "notes",
      "parent",
      "position",
      "selfLink",
      "status",
      "title",
      "updated"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
    ],
    "queryConflictKeys": [
      "parent"
    ],
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
      "parent",
      "previous"
    ],
    "description": "Creates a new task on the specified task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "parent": "Parent task identifier. If the task is created at the top level, this parameter is omitted. Optional.",
      "previous": "Previous sibling task identifier. If the task is created at the first position among its siblings, this parameter is omitted. Optional."
    }
  },
  "tasks.tasks.delete": {
    "accessPath": [
      "tasksTasksDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks/{task}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist",
      "task"
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
      "uploadType"
    ],
    "description": "Deletes the specified task from the task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "task": "Task identifier."
    }
  },
  "tasks.tasks.get": {
    "accessPath": [
      "tasksTasksGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks/{task}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist",
      "task"
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
      "uploadType"
    ],
    "description": "Returns the specified task.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "task": "Task identifier."
    }
  },
  "tasks.tasks.patch": {
    "accessPath": [
      "tasksTasksPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "completed",
      "deleted",
      "due",
      "etag",
      "hidden",
      "id",
      "kind",
      "links",
      "notes",
      "parent",
      "position",
      "selfLink",
      "status",
      "title",
      "updated"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks/{task}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist",
      "task"
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
      "uploadType"
    ],
    "description": "Updates the specified task. This method supports patch semantics.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "task": "Task identifier."
    }
  },
  "tasks.tasks.update": {
    "accessPath": [
      "tasksTasksUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "completed",
      "deleted",
      "due",
      "etag",
      "hidden",
      "id",
      "kind",
      "links",
      "notes",
      "parent",
      "position",
      "selfLink",
      "status",
      "title",
      "updated"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks/{task}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist",
      "task"
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
      "uploadType"
    ],
    "description": "Updates the specified task.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "task": "Task identifier."
    }
  },
  "tasks.tasks.move": {
    "accessPath": [
      "tasksTasksMove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/tasks/v1/lists/{tasklist}/tasks/{task}/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist",
      "task"
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
      "parent",
      "previous"
    ],
    "description": "Moves the specified task to another position in the task list. This can include putting it as a child task under a new parent and/or move it to a different position among its sibling tasks.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier.",
      "task": "Task identifier.",
      "parent": "New parent task identifier. If the task is moved to the top level, this parameter is omitted. Optional.",
      "previous": "New previous sibling task identifier. If the task is moved to the first position among its siblings, this parameter is omitted. Optional."
    }
  },
  "tasks.tasklists.list": {
    "accessPath": [
      "tasksTasklistsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tasks/v1/users/@me/lists",
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
      "maxResults",
      "pageToken"
    ],
    "description": "Returns all the authenticated user's task lists.",
    "parameterDescriptions": {
      "maxResults": "Maximum number of task lists returned on one page. Optional. The default is 20 (max allowed: 100).",
      "pageToken": "Token specifying the result page to return. Optional."
    }
  },
  "tasks.tasklists.insert": {
    "accessPath": [
      "tasksTasklistsInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "selfLink",
      "title",
      "updated"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/tasks/v1/users/@me/lists",
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
    "description": "Creates a new task list and adds it to the authenticated user's task lists."
  },
  "tasks.tasklists.delete": {
    "accessPath": [
      "tasksTasklistsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/tasks/v1/users/@me/lists/{tasklist}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
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
      "uploadType"
    ],
    "description": "Deletes the authenticated user's specified task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier."
    }
  },
  "tasks.tasklists.get": {
    "accessPath": [
      "tasksTasklistsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tasks/v1/users/@me/lists/{tasklist}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
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
      "uploadType"
    ],
    "description": "Returns the authenticated user's specified task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier."
    }
  },
  "tasks.tasklists.patch": {
    "accessPath": [
      "tasksTasklistsPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "selfLink",
      "title",
      "updated"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/tasks/v1/users/@me/lists/{tasklist}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
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
      "uploadType"
    ],
    "description": "Updates the authenticated user's specified task list. This method supports patch semantics.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier."
    }
  },
  "tasks.tasklists.update": {
    "accessPath": [
      "tasksTasklistsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "etag",
      "id",
      "kind",
      "selfLink",
      "title",
      "updated"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/tasks/v1/users/@me/lists/{tasklist}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tasklist"
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
      "uploadType"
    ],
    "description": "Updates the authenticated user's specified task list.",
    "parameterDescriptions": {
      "tasklist": "Task list identifier."
    }
  }
} satisfies ToolRuntimeMetadataMap;
