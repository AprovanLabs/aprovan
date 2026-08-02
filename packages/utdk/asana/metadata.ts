import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "getAccessRequests": {
    "accessPath": [
      "getAccessRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/access_requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "target",
      "user",
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get access requests",
    "parameterDescriptions": {
      "target": "Globally unique identifier for the target object.",
      "user": "A string identifying a user. This can either be the string \"me\", an email, or the gid of a user.",
      "opt_pretty": "Provides “pretty” output.\nProvides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createAccessRequest": {
    "accessPath": [
      "createAccessRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/access_requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an access request"
  },
  "approveAccessRequest": {
    "accessPath": [
      "approveAccessRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/access_requests/{access_request_gid}/approve",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "access_request_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve an access request",
    "parameterDescriptions": {
      "access_request_gid": "Globally unique identifier for the access request."
    }
  },
  "rejectAccessRequest": {
    "accessPath": [
      "rejectAccessRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/access_requests/{access_request_gid}/reject",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "access_request_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reject an access request",
    "parameterDescriptions": {
      "access_request_gid": "Globally unique identifier for the access request."
    }
  },
  "getAgentsForWorkspace": {
    "accessPath": [
      "getAgentsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a list of agents in a workspace",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getAgent": {
    "accessPath": [
      "getAgent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/agents/{agent_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get an agent",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getAllocation": {
    "accessPath": [
      "getAllocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/allocations/{allocation_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "allocation_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get an allocation",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateAllocation": {
    "accessPath": [
      "updateAllocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/allocations/{allocation_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "allocation_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update an allocation",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteAllocation": {
    "accessPath": [
      "deleteAllocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/allocations/{allocation_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "allocation_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete an allocation"
  },
  "getAllocations": {
    "accessPath": [
      "getAllocations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/allocations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "parent",
      "assignee",
      "workspace",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple allocations",
    "parameterDescriptions": {
      "parent": "Globally unique identifier for the project to filter allocations by.",
      "assignee": "Globally unique identifier for the user or placeholder the allocation is assigned to.",
      "workspace": "Globally unique identifier for the workspace.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createAllocation": {
    "accessPath": [
      "createAllocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/allocations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create an allocation",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/attachments/{attachment_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "attachment_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get an attachment",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteAttachment": {
    "accessPath": [
      "deleteAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/attachments/{attachment_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "attachment_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete an attachment"
  },
  "getAttachmentsForObject": {
    "accessPath": [
      "getAttachmentsForObject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "parent",
      "opt_fields"
    ],
    "description": "Get attachments from an object",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "parent": "Globally unique identifier for object to fetch statuses from. Must be a GID for a `project`, `project_brief`, or `task`.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createAttachmentForObject": {
    "accessPath": [
      "createAttachmentForObject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "resource_subtype",
      "file",
      "parent",
      "url",
      "name",
      "connect_to_app"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Upload an attachment",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getAuditLogEvents": {
    "accessPath": [
      "getAuditLogEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/audit_log_events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_at",
      "end_at",
      "event_type",
      "actor_type",
      "actor_gid",
      "resource_gid",
      "limit",
      "offset"
    ],
    "description": "Get audit log events"
  },
  "createBatchRequest": {
    "accessPath": [
      "createBatchRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/batch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Submit parallel requests",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getBudgets": {
    "accessPath": [
      "getBudgets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/budgets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "parent"
    ],
    "description": "Get all budgets",
    "parameterDescriptions": {
      "parent": "Globally unique identifier for the budget's parent object. This currently can only be a `project`."
    }
  },
  "createBudget": {
    "accessPath": [
      "createBudget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/budgets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Create a budget"
  },
  "getBudget": {
    "accessPath": [
      "getBudget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/budgets/{budget_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "budget_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a budget",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateBudget": {
    "accessPath": [
      "updateBudget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/budgets/{budget_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "budget_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a budget",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteBudget": {
    "accessPath": [
      "deleteBudget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/budgets/{budget_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "budget_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a budget"
  },
  "getCustomFieldSettingsForProject": {
    "accessPath": [
      "getCustomFieldSettingsForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/custom_field_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a project's custom fields",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getCustomFieldSettingsForPortfolio": {
    "accessPath": [
      "getCustomFieldSettingsForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/custom_field_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a portfolio's custom fields",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getCustomFieldSettingsForGoal": {
    "accessPath": [
      "getCustomFieldSettingsForGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/custom_field_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a goal's custom fields",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getCustomFieldSettingsForTeam": {
    "accessPath": [
      "getCustomFieldSettingsForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/teams/{team_gid}/custom_field_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a team's custom fields",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createCustomField": {
    "accessPath": [
      "createCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a custom field",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getCustomField": {
    "accessPath": [
      "getCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/custom_fields/{custom_field_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a custom field",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateCustomField": {
    "accessPath": [
      "updateCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/custom_fields/{custom_field_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a custom field",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/custom_fields/{custom_field_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a custom field"
  },
  "getCustomFieldsForWorkspace": {
    "accessPath": [
      "getCustomFieldsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a workspace's custom fields",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createEnumOptionForCustomField": {
    "accessPath": [
      "createEnumOptionForCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/custom_fields/{custom_field_gid}/enum_options",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create an enum option",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "insertEnumOptionForCustomField": {
    "accessPath": [
      "insertEnumOptionForCustomField"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/custom_fields/{custom_field_gid}/enum_options/insert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_field_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Reorder a custom field's enum",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateEnumOption": {
    "accessPath": [
      "updateEnumOption"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/enum_options/{enum_option_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "enum_option_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update an enum option",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getCustomTypes": {
    "accessPath": [
      "getCustomTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/custom_types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "project",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get all custom types associated with an object",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getCustomType": {
    "accessPath": [
      "getCustomType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/custom_types/{custom_type_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_type_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a custom type",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "resource",
      "sync",
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get events on a resource",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createGraphExport": {
    "accessPath": [
      "createGraphExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/exports/graph",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Initiate a graph export"
  },
  "createResourceExport": {
    "accessPath": [
      "createResourceExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/exports/resource",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Initiate a resource export"
  },
  "getGoalRelationship": {
    "accessPath": [
      "getGoalRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goal_relationships/{goal_relationship_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_relationship_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a goal relationship",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateGoalRelationship": {
    "accessPath": [
      "updateGoalRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/goal_relationships/{goal_relationship_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_relationship_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a goal relationship",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getGoalRelationships": {
    "accessPath": [
      "getGoalRelationships"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goal_relationships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "supported_goal",
      "resource_subtype",
      "opt_fields"
    ],
    "description": "Get goal relationships",
    "parameterDescriptions": {
      "opt_pretty": "Provides “pretty” output.\nProvides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "supported_goal": "Globally unique identifier for the supported goal in the goal relationship.",
      "resource_subtype": "If provided, filter to goal relationships with a given resource_subtype.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addSupportingRelationship": {
    "accessPath": [
      "addSupportingRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/addSupportingRelationship",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add a supporting goal relationship",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeSupportingRelationship": {
    "accessPath": [
      "removeSupportingRelationship"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/removeSupportingRelationship",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Removes a supporting goal relationship"
  },
  "getGoal": {
    "accessPath": [
      "getGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goals/{goal_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateGoal": {
    "accessPath": [
      "updateGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/goals/{goal_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteGoal": {
    "accessPath": [
      "deleteGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/goals/{goal_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a goal"
  },
  "getGoals": {
    "accessPath": [
      "getGoals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "portfolio",
      "project",
      "task",
      "is_workspace_level",
      "team",
      "workspace",
      "time_periods",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get goals",
    "parameterDescriptions": {
      "portfolio": "Globally unique identifier for supporting portfolio.",
      "project": "Globally unique identifier for supporting project.",
      "task": "Globally unique identifier for supporting task.",
      "is_workspace_level": "Filter to goals with is_workspace_level set to query value. Must be used with the workspace parameter.",
      "team": "Globally unique identifier for the team.",
      "workspace": "Globally unique identifier for the workspace.",
      "time_periods": "Globally unique identifiers for the time periods.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createGoal": {
    "accessPath": [
      "createGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createGoalMetric": {
    "accessPath": [
      "createGoalMetric"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/setMetric",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a goal metric",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateGoalMetric": {
    "accessPath": [
      "updateGoalMetric"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/setMetricCurrentValue",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a goal metric",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addFollowers": {
    "accessPath": [
      "addFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/addFollowers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add a collaborator to a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeFollowers": {
    "accessPath": [
      "removeFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/removeFollowers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Remove a collaborator from a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getParentGoalsForGoal": {
    "accessPath": [
      "getParentGoalsForGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/parentGoals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get parent goals from a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addCustomFieldSettingForGoal": {
    "accessPath": [
      "addCustomFieldSettingForGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/addCustomFieldSetting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Add a custom field to a goal"
  },
  "removeCustomFieldSettingForGoal": {
    "accessPath": [
      "removeCustomFieldSettingForGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/removeCustomFieldSetting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a custom field from a goal"
  },
  "getJob": {
    "accessPath": [
      "getJob"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/jobs/{job_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a job by id",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getMemberships": {
    "accessPath": [
      "getMemberships"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "parent",
      "member",
      "resource_subtype",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple memberships",
    "parameterDescriptions": {
      "parent": "Globally unique identifier for `goal`, `project`, `portfolio`, `custom_type`, or `custom_field`. This parameter is optional when `resource_subtype` is provided along with `member` of type `team`.",
      "member": "Globally unique identifier for `team` or `user`. When used with `resource_subtype` and without `parent`, `member` must be of type `team`. For user-type memberships `parent` parameter is required to disambiguate the workspace from which memberships should be retrieved.",
      "resource_subtype": "The type of membership to return. Required when `parent` is absent. Currently supported value is `project_membership` (when `member` is a team GID, returns all project memberships for that team).",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createMembership": {
    "accessPath": [
      "createMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Create a membership"
  },
  "getMembership": {
    "accessPath": [
      "getMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/memberships/{membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Get a membership"
  },
  "updateMembership": {
    "accessPath": [
      "updateMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/memberships/{membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Update a membership"
  },
  "deleteMembership": {
    "accessPath": [
      "deleteMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/memberships/{membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a membership"
  },
  "getOooEntry": {
    "accessPath": [
      "getOooEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/ooo_entries/{ooo_entry_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ooo_entry_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get an OOO entry",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateOooEntry": {
    "accessPath": [
      "updateOooEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/ooo_entries/{ooo_entry_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ooo_entry_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update an OOO entry",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteOooEntry": {
    "accessPath": [
      "deleteOooEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/ooo_entries/{ooo_entry_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ooo_entry_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete an OOO entry"
  },
  "getOooEntries": {
    "accessPath": [
      "getOooEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/ooo_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "user",
      "workspace",
      "limit",
      "offset",
      "start_date",
      "end_date",
      "opt_fields"
    ],
    "description": "Get OOO entries for a user",
    "parameterDescriptions": {
      "user": "Globally unique identifier for the user to filter OOO entries by.",
      "workspace": "Globally unique identifier for the workspace.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "start_date": "An ISO 8601 date string. Filters to OOO entries that overlap with or end after this date.",
      "end_date": "An ISO 8601 date string. Filters to OOO entries that overlap with or start before this date.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createOooEntry": {
    "accessPath": [
      "createOooEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/ooo_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create an OOO entry",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createOrganizationExport": {
    "accessPath": [
      "createOrganizationExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/organization_exports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create an organization export request",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getOrganizationExport": {
    "accessPath": [
      "getOrganizationExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/organization_exports/{organization_export_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_export_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get details on an org export request",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getPortfolioMemberships": {
    "accessPath": [
      "getPortfolioMemberships"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolio_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "portfolio",
      "workspace",
      "user",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple portfolio memberships",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getPortfolioMembership": {
    "accessPath": [
      "getPortfolioMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolio_memberships/{portfolio_membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a portfolio membership",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getPortfolioMembershipsForPortfolio": {
    "accessPath": [
      "getPortfolioMembershipsForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/portfolio_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get memberships from a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getPortfolios": {
    "accessPath": [
      "getPortfolios"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolios",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "workspace",
      "owner",
      "opt_fields"
    ],
    "description": "Get multiple portfolios",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "workspace": "The workspace or organization to filter portfolios on.",
      "owner": "The user who owns the portfolio. Currently, API users can only get a list of portfolios that they themselves own, unless the request is made from a Service Account. In the case of a Service Account, if this parameter is specified, then all portfolios owned by this parameter are returned. Otherwise, all portfolios across the workspace are returned.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createPortfolio": {
    "accessPath": [
      "createPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getPortfolio": {
    "accessPath": [
      "getPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updatePortfolio": {
    "accessPath": [
      "updatePortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deletePortfolio": {
    "accessPath": [
      "deletePortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a portfolio"
  },
  "getItemsForPortfolio": {
    "accessPath": [
      "getItemsForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get portfolio items",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addItemForPortfolio": {
    "accessPath": [
      "addItemForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/addItem",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Add a portfolio item"
  },
  "removeItemForPortfolio": {
    "accessPath": [
      "removeItemForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/removeItem",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a portfolio item"
  },
  "addCustomFieldSettingForPortfolio": {
    "accessPath": [
      "addCustomFieldSettingForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/addCustomFieldSetting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Add a custom field to a portfolio"
  },
  "removeCustomFieldSettingForPortfolio": {
    "accessPath": [
      "removeCustomFieldSettingForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/removeCustomFieldSetting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a custom field from a portfolio"
  },
  "addMembersForPortfolio": {
    "accessPath": [
      "addMembersForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/addMembers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add users to a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeMembersForPortfolio": {
    "accessPath": [
      "removeMembersForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/removeMembers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Remove users from a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "duplicatePortfolio": {
    "accessPath": [
      "duplicatePortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/duplicate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Duplicate a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectBrief": {
    "accessPath": [
      "getProjectBrief"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/project_briefs/{project_brief_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_brief_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a project brief",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateProjectBrief": {
    "accessPath": [
      "updateProjectBrief"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/project_briefs/{project_brief_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_brief_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a project brief",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteProjectBrief": {
    "accessPath": [
      "deleteProjectBrief"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/project_briefs/{project_brief_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_brief_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a project brief"
  },
  "createProjectBrief": {
    "accessPath": [
      "createProjectBrief"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/project_briefs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a project brief",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectMembership": {
    "accessPath": [
      "getProjectMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/project_memberships/{project_membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a project membership",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectMembershipsForProject": {
    "accessPath": [
      "getProjectMembershipsForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/project_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get memberships from a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectPortfolioSetting": {
    "accessPath": [
      "getProjectPortfolioSetting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/project_portfolio_settings/{project_portfolio_setting_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_portfolio_setting_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a project portfolio setting",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateProjectPortfolioSetting": {
    "accessPath": [
      "updateProjectPortfolioSetting"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/project_portfolio_settings/{project_portfolio_setting_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_portfolio_setting_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a project portfolio setting",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectPortfolioSettingsForProject": {
    "accessPath": [
      "getProjectPortfolioSettingsForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/project_portfolio_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get project portfolio settings for a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectPortfolioSettingsForPortfolio": {
    "accessPath": [
      "getProjectPortfolioSettingsForPortfolio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/portfolios/{portfolio_gid}/project_portfolio_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "portfolio_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get project portfolio settings for a portfolio",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectStatus": {
    "accessPath": [
      "getProjectStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/project_statuses/{project_status_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_status_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a project status",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteProjectStatus": {
    "accessPath": [
      "deleteProjectStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/project_statuses/{project_status_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_status_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a project status"
  },
  "getProjectStatusesForProject": {
    "accessPath": [
      "getProjectStatusesForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/project_statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get statuses from a project",
    "parameterDescriptions": {
      "project_gid": "Globally unique identifier for the project.",
      "opt_pretty": "Provides “pretty” output.\nProvides the response in a “pretty” format. In the case of JSON this means doing proper line breaking and indentation to make it readable. This will take extra time and increase the response size so it is advisable only to use this during debugging.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createProjectStatusForProject": {
    "accessPath": [
      "createProjectStatusForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/project_statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a project status",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectTemplate": {
    "accessPath": [
      "getProjectTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/project_templates/{project_template_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_template_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a project template",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteProjectTemplate": {
    "accessPath": [
      "deleteProjectTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/project_templates/{project_template_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_template_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a project template"
  },
  "getProjectTemplates": {
    "accessPath": [
      "getProjectTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/project_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "workspace",
      "team",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple project templates",
    "parameterDescriptions": {
      "workspace": "The workspace to filter results on.",
      "team": "The team to filter projects on.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectTemplatesForTeam": {
    "accessPath": [
      "getProjectTemplatesForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/teams/{team_gid}/project_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a team's project templates",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "instantiateProject": {
    "accessPath": [
      "instantiateProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/project_templates/{project_template_gid}/instantiateProject",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_template_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Instantiate a project from a project template",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
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
    "routeTemplate": "/api/1.0/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "workspace",
      "team",
      "archived",
      "opt_fields"
    ],
    "description": "Get multiple projects",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "workspace": "The workspace or organization to filter projects on.",
      "team": "**Deprecated.** The team to filter projects on. Please use `GET /memberships` with `{ member: team, resource_subtype: project_membership }` instead.",
      "archived": "Only return projects whose `archived` field takes on the value of this parameter.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createProject": {
    "accessPath": [
      "createProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/projects/{project_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateProject": {
    "accessPath": [
      "updateProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/projects/{project_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/projects/{project_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a project"
  },
  "duplicateProject": {
    "accessPath": [
      "duplicateProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/duplicate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Duplicate a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectsForTask": {
    "accessPath": [
      "getProjectsForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get projects a task is in",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectsForTeam": {
    "accessPath": [
      "getProjectsForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/teams/{team_gid}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "archived",
      "opt_fields"
    ],
    "description": "Get a team's projects",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "archived": "Only return projects whose `archived` field takes on the value of this parameter.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createProjectForTeam": {
    "accessPath": [
      "createProjectForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/teams/{team_gid}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a project in a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getProjectsForWorkspace": {
    "accessPath": [
      "getProjectsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "archived",
      "opt_fields"
    ],
    "description": "Get all projects in a workspace",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "archived": "Only return projects whose `archived` field takes on the value of this parameter.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createProjectForWorkspace": {
    "accessPath": [
      "createProjectForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a project in a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "searchProjectsForWorkspace": {
    "accessPath": [
      "searchProjectsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/projects/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "text",
      "sort_by",
      "sort_ascending",
      "completed",
      "teams.any",
      "owner.any",
      "members.any",
      "members.not",
      "portfolios.any",
      "completed_on",
      "completed_on.before",
      "completed_on.after",
      "completed_at.before",
      "completed_at.after",
      "created_on",
      "created_on.before",
      "created_on.after",
      "created_at.before",
      "created_at.after",
      "due_on",
      "due_on.before",
      "due_on.after",
      "due_at.before",
      "due_at.after",
      "start_on",
      "start_on.before",
      "start_on.after",
      "opt_fields"
    ],
    "description": "Search projects in a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addCustomFieldSettingForProject": {
    "accessPath": [
      "addCustomFieldSettingForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/addCustomFieldSetting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add a custom field to a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeCustomFieldSettingForProject": {
    "accessPath": [
      "removeCustomFieldSettingForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/removeCustomFieldSetting",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a custom field from a project"
  },
  "getTaskCountsForProject": {
    "accessPath": [
      "getTaskCountsForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/task_counts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get task count of a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addMembersForProject": {
    "accessPath": [
      "addMembersForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/addMembers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add users to a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeMembersForProject": {
    "accessPath": [
      "removeMembersForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/removeMembers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Remove users from a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addFollowersForProject": {
    "accessPath": [
      "addFollowersForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/addFollowers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add followers to a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeFollowersForProject": {
    "accessPath": [
      "removeFollowersForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/removeFollowers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Remove followers from a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "projectSaveAsTemplate": {
    "accessPath": [
      "projectSaveAsTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/saveAsTemplate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a project template from a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getRates": {
    "accessPath": [
      "getRates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "parent",
      "resource",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple rates",
    "parameterDescriptions": {
      "parent": "Globally unique identifier for `project`.",
      "resource": "Globally unique identifier for `user` or `placeholder`.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createRate": {
    "accessPath": [
      "createRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a rate",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getRate": {
    "accessPath": [
      "getRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/rates/{rate_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rate_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a rate",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateRate": {
    "accessPath": [
      "updateRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/rates/{rate_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rate_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a rate",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteRate": {
    "accessPath": [
      "deleteRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/rates/{rate_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rate_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a rate"
  },
  "getReactionsOnObject": {
    "accessPath": [
      "getReactionsOnObject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/reactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "target",
      "emoji_base"
    ],
    "description": "Get reactions with an emoji base on an object.",
    "parameterDescriptions": {
      "target": "Globally unique identifier for object to fetch reactions from. Must be a GID for a status update or story.",
      "emoji_base": "Only return reactions with this emoji base character."
    }
  },
  "getRoles": {
    "accessPath": [
      "getRoles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "workspace",
      "archived",
      "opt_fields"
    ],
    "description": "Get multiple roles",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "workspace": "The workspace or organization to filter roles on.",
      "archived": "Only return projects whose `archived` field takes on the value of this parameter.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createRole": {
    "accessPath": [
      "createRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a role",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getRole": {
    "accessPath": [
      "getRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/roles/{role_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a role",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateRole": {
    "accessPath": [
      "updateRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/roles/{role_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a role",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteRole": {
    "accessPath": [
      "deleteRole"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/roles/{role_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a role"
  },
  "triggerRule": {
    "accessPath": [
      "triggerRule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/rule_triggers/{rule_trigger_gid}/run",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_trigger_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trigger a rule"
  },
  "getSection": {
    "accessPath": [
      "getSection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/sections/{section_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "section_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a section",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateSection": {
    "accessPath": [
      "updateSection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/sections/{section_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "section_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a section",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteSection": {
    "accessPath": [
      "deleteSection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/sections/{section_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "section_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a section"
  },
  "getSectionsForProject": {
    "accessPath": [
      "getSectionsForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/sections",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get sections in a project",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createSectionForProject": {
    "accessPath": [
      "createSectionForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/sections",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a section in a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addTaskForSection": {
    "accessPath": [
      "addTaskForSection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/sections/{section_gid}/addTask",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "section_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Add task to section"
  },
  "insertSectionForProject": {
    "accessPath": [
      "insertSectionForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/projects/{project_gid}/sections/insert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Move or Insert sections"
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
    "routeTemplate": "/api/1.0/status_updates/{status_update_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "status_update_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a status update",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteStatus": {
    "accessPath": [
      "deleteStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/status_updates/{status_update_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "status_update_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a status update"
  },
  "getStatusesForObject": {
    "accessPath": [
      "getStatusesForObject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/status_updates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "parent",
      "created_since",
      "opt_fields"
    ],
    "description": "Get status updates from an object",
    "parameterDescriptions": {
      "parent": "Globally unique identifier for object to fetch statuses from. Must be a GID for a project, portfolio, or goal.",
      "created_since": "Only return statuses that have been created since the given time.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createStatusForObject": {
    "accessPath": [
      "createStatusForObject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/status_updates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Create a status update",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getStory": {
    "accessPath": [
      "getStory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/stories/{story_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "story_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a story",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateStory": {
    "accessPath": [
      "updateStory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/stories/{story_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "story_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a story",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteStory": {
    "accessPath": [
      "deleteStory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/stories/{story_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "story_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a story"
  },
  "getStoriesForTask": {
    "accessPath": [
      "getStoriesForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/stories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get stories from a task",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createStoryForTask": {
    "accessPath": [
      "createStoryForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/stories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a story on a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getStoriesForGoal": {
    "accessPath": [
      "getStoriesForGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/stories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get stories from a goal",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createStoryForGoal": {
    "accessPath": [
      "createStoryForGoal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/goals/{goal_gid}/stories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "goal_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a story on a goal",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "workspace",
      "opt_fields"
    ],
    "description": "Get multiple tags",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "workspace": "The workspace to filter tags on.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTag": {
    "accessPath": [
      "createTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a tag",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTag": {
    "accessPath": [
      "getTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tags/{tag_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a tag",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateTag": {
    "accessPath": [
      "updateTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/tags/{tag_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a tag",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteTag": {
    "accessPath": [
      "deleteTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/tags/{tag_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a tag"
  },
  "getTagsForTask": {
    "accessPath": [
      "getTagsForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get a task's tags",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTagsForWorkspace": {
    "accessPath": [
      "getTagsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get tags in a workspace",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTagForWorkspace": {
    "accessPath": [
      "createTagForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a tag in a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTaskTemplates": {
    "accessPath": [
      "getTaskTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/task_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "project",
      "opt_fields"
    ],
    "description": "Get multiple task templates",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "project": "The project to filter task templates on.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTaskTemplate": {
    "accessPath": [
      "getTaskTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/task_templates/{task_template_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_template_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a task template",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteTaskTemplate": {
    "accessPath": [
      "deleteTaskTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/task_templates/{task_template_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_template_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a task template"
  },
  "instantiateTask": {
    "accessPath": [
      "instantiateTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/task_templates/{task_template_gid}/instantiateTask",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_template_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Instantiate a task from a task template",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTasks": {
    "accessPath": [
      "getTasks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "assignee",
      "project",
      "section",
      "workspace",
      "completed_since",
      "modified_since",
      "opt_fields"
    ],
    "description": "Get multiple tasks",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "assignee": "The assignee to filter tasks on. If searching for unassigned tasks, assignee.any = null can be specified.\n*Note: If you specify `assignee`, you must also specify the `workspace` to filter on.*",
      "project": "The project to filter tasks on.",
      "section": "The section to filter tasks on.",
      "workspace": "The workspace to filter tasks on.\n*Note: If you specify `workspace`, you must also specify the `assignee` to filter on.*",
      "completed_since": "Only return tasks that are either incomplete or that have been completed since this time.",
      "modified_since": "Only return tasks that have been modified since the given time.\n\n*Note: A task is considered “modified” if any of its properties\nchange, or associations between it and other objects are modified\n(e.g.  a task being added to a project). A task is not considered\nmodified just because another object it is associated with (e.g. a\nsubtask) is modified. Actions that count as modifying the task\ninclude assigning, renaming, completing, and adding stories.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTask": {
    "accessPath": [
      "createTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/tasks/{task_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateTask": {
    "accessPath": [
      "updateTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/tasks/{task_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteTask": {
    "accessPath": [
      "deleteTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/tasks/{task_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a task"
  },
  "duplicateTask": {
    "accessPath": [
      "duplicateTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/duplicate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Duplicate a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTasksForProject": {
    "accessPath": [
      "getTasksForProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/projects/{project_gid}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "completed_since",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get tasks from a project",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTasksForSection": {
    "accessPath": [
      "getTasksForSection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/sections/{section_gid}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "section_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "completed_since",
      "opt_fields"
    ],
    "description": "Get tasks from a section",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTasksForTag": {
    "accessPath": [
      "getTasksForTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tags/{tag_gid}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get tasks from a tag",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTasksForUserTaskList": {
    "accessPath": [
      "getTasksForUserTaskList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/user_task_lists/{user_task_list_gid}/tasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_task_list_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "completed_since",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get tasks from a user task list",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getSubtasksForTask": {
    "accessPath": [
      "getSubtasksForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/subtasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get subtasks from a task",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createSubtaskForTask": {
    "accessPath": [
      "createSubtaskForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/subtasks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a subtask",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "setParentForTask": {
    "accessPath": [
      "setParentForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/setParent",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Set the parent of a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getDependenciesForTask": {
    "accessPath": [
      "getDependenciesForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/dependencies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get dependencies from a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addDependenciesForTask": {
    "accessPath": [
      "addDependenciesForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/addDependencies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Set dependencies for a task"
  },
  "removeDependenciesForTask": {
    "accessPath": [
      "removeDependenciesForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/removeDependencies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Unlink dependencies from a task"
  },
  "getDependentsForTask": {
    "accessPath": [
      "getDependentsForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/dependents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get dependents from a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addDependentsForTask": {
    "accessPath": [
      "addDependentsForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/addDependents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Set dependents for a task"
  },
  "removeDependentsForTask": {
    "accessPath": [
      "removeDependentsForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/removeDependents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Unlink dependents from a task"
  },
  "addProjectForTask": {
    "accessPath": [
      "addProjectForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/addProject",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Add a project to a task"
  },
  "removeProjectForTask": {
    "accessPath": [
      "removeProjectForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/removeProject",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a project from a task"
  },
  "addTagForTask": {
    "accessPath": [
      "addTagForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/addTag",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Add a tag to a task"
  },
  "removeTagForTask": {
    "accessPath": [
      "removeTagForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/removeTag",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a tag from a task"
  },
  "addFollowersForTask": {
    "accessPath": [
      "addFollowersForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/addFollowers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add followers to a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeFollowerForTask": {
    "accessPath": [
      "removeFollowerForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/removeFollowers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Remove followers from a task",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTaskForCustomID": {
    "accessPath": [
      "getTaskForCustomId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/tasks/custom_id/{custom_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid",
      "custom_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a task for a given custom ID"
  },
  "searchTasksForWorkspace": {
    "accessPath": [
      "searchTasksForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/tasks/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "text",
      "resource_subtype",
      "assignee.any",
      "assignee.not",
      "portfolios.any",
      "projects.any",
      "projects.not",
      "projects.all",
      "sections.any",
      "sections.not",
      "sections.all",
      "tags.any",
      "tags.not",
      "tags.all",
      "teams.any",
      "followers.any",
      "followers.not",
      "created_by.any",
      "created_by.not",
      "assigned_by.any",
      "assigned_by.not",
      "liked_by.not",
      "commented_on_by.not",
      "due_on.before",
      "due_on.after",
      "due_on",
      "due_at.before",
      "due_at.after",
      "start_on.before",
      "start_on.after",
      "start_on",
      "created_on.before",
      "created_on.after",
      "created_on",
      "created_at.before",
      "created_at.after",
      "completed_on.before",
      "completed_on.after",
      "completed_on",
      "completed_at.before",
      "completed_at.after",
      "modified_on.before",
      "modified_on.after",
      "modified_on",
      "modified_at.before",
      "modified_at.after",
      "is_blocking",
      "is_blocked",
      "has_attachment",
      "completed",
      "is_subtask",
      "sort_by",
      "sort_ascending",
      "opt_fields"
    ],
    "description": "Search tasks in a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTeamMembership": {
    "accessPath": [
      "getTeamMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/team_memberships/{team_membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a team membership",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTeamMemberships": {
    "accessPath": [
      "getTeamMemberships"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/team_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "team",
      "user",
      "workspace",
      "opt_fields"
    ],
    "description": "Get team memberships",
    "parameterDescriptions": {
      "team": "Globally unique identifier for the team.",
      "user": "A string identifying a user. This can either be the string \"me\", an email, or the gid of a user. This parameter must be used with the workspace parameter.",
      "workspace": "Globally unique identifier for the workspace. This parameter must be used with the user parameter.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTeamMembershipsForTeam": {
    "accessPath": [
      "getTeamMembershipsForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/teams/{team_gid}/team_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get memberships from a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTeamMembershipsForUser": {
    "accessPath": [
      "getTeamMembershipsForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/users/{user_gid}/team_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "workspace",
      "opt_fields"
    ],
    "description": "Get memberships from a user",
    "parameterDescriptions": {
      "workspace": "Globally unique identifier for the workspace.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTeam": {
    "accessPath": [
      "createTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
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
    "routeTemplate": "/api/1.0/teams/{team_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateTeam": {
    "accessPath": [
      "updateTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/teams/{team_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTeamsForWorkspace": {
    "accessPath": [
      "getTeamsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get teams in a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTeamsForUser": {
    "accessPath": [
      "getTeamsForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/users/{user_gid}/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "organization",
      "opt_fields"
    ],
    "description": "Get teams for a user",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addUserForTeam": {
    "accessPath": [
      "addUserForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/teams/{team_gid}/addUser",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add a user to a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeUserForTeam": {
    "accessPath": [
      "removeUserForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/teams/{team_gid}/removeUser",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a user from a team"
  },
  "getTimePeriod": {
    "accessPath": [
      "getTimePeriod"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_periods/{time_period_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_period_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a time period",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimePeriods": {
    "accessPath": [
      "getTimePeriods"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_periods",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "start_on",
      "end_on",
      "workspace",
      "opt_fields"
    ],
    "description": "Get time periods",
    "parameterDescriptions": {
      "start_on": "ISO 8601 date string",
      "end_on": "ISO 8601 date string",
      "workspace": "Globally unique identifier for the workspace.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimeTrackingCategory": {
    "accessPath": [
      "getTimeTrackingCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_tracking_categories/{time_tracking_category_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_category_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a time tracking category",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateTimeTrackingCategory": {
    "accessPath": [
      "updateTimeTrackingCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/time_tracking_categories/{time_tracking_category_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_category_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a time tracking category",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteTimeTrackingCategory": {
    "accessPath": [
      "deleteTimeTrackingCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/time_tracking_categories/{time_tracking_category_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_category_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a time tracking category"
  },
  "getTimeTrackingEntriesForTimeTrackingCategory": {
    "accessPath": [
      "getTimeTrackingEntriesForTimeTrackingCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_tracking_categories/{time_tracking_category_gid}/time_tracking_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_category_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "start_date",
      "end_date",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get time tracking entries for a time tracking category",
    "parameterDescriptions": {
      "start_date": "The start date for filtering time tracking entries by their entry date.",
      "end_date": "The end date for filtering time tracking entries by their entry date.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimeTrackingCategories": {
    "accessPath": [
      "getTimeTrackingCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_tracking_categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "workspace",
      "is_archived",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get time tracking categories for a workspace",
    "parameterDescriptions": {
      "workspace": "Globally unique identifier for the workspace.",
      "is_archived": "Filter by archived status. If not provided, defaults to returning non-archived categories.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTimeTrackingCategory": {
    "accessPath": [
      "createTimeTrackingCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/time_tracking_categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a time tracking category",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimeTrackingEntriesForTask": {
    "accessPath": [
      "getTimeTrackingEntriesForTask"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/time_tracking_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get time tracking entries for a task",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTimeTrackingEntry": {
    "accessPath": [
      "createTimeTrackingEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/tasks/{task_gid}/time_tracking_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a time tracking entry",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimeTrackingEntry": {
    "accessPath": [
      "getTimeTrackingEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_tracking_entries/{time_tracking_entry_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_entry_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a time tracking entry",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateTimeTrackingEntry": {
    "accessPath": [
      "updateTimeTrackingEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/time_tracking_entries/{time_tracking_entry_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_entry_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a time tracking entry",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "deleteTimeTrackingEntry": {
    "accessPath": [
      "deleteTimeTrackingEntry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/1.0/time_tracking_entries/{time_tracking_entry_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_tracking_entry_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a time tracking entry"
  },
  "getTimeTrackingEntries": {
    "accessPath": [
      "getTimeTrackingEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/time_tracking_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "task",
      "attributable_to",
      "portfolio",
      "user",
      "workspace",
      "entered_on_start_date",
      "entered_on_end_date",
      "timesheet_approval_status",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple time tracking entries",
    "parameterDescriptions": {
      "task": "Globally unique identifier for the task to filter time tracking entries by.",
      "attributable_to": "Globally unique identifier for the project the time tracking entries are attributed to.",
      "portfolio": "Globally unique identifier for the portfolio to filter time tracking entries by.",
      "user": "Globally unique identifier for the user to filter time tracking entries by.",
      "workspace": "Globally unique identifier for the workspace. At least one of `entered_on_start_date` or `entered_on_end_date` must be provided when filtering by workspace.",
      "entered_on_start_date": "The start date for filtering time tracking entries by when they were entered.",
      "entered_on_end_date": "The end date for filtering time tracking entries by when they were entered.",
      "timesheet_approval_status": "Globally unique identifier for the timesheet approval status to filter time tracking entries by.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimesheetApprovalStatus": {
    "accessPath": [
      "getTimesheetApprovalStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/timesheet_approval_statuses/{timesheet_approval_status_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "timesheet_approval_status_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a timesheet approval status",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateTimesheetApprovalStatus": {
    "accessPath": [
      "updateTimesheetApprovalStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/timesheet_approval_statuses/{timesheet_approval_status_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "timesheet_approval_status_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a timesheet approval status",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getTimesheetApprovalStatuses": {
    "accessPath": [
      "getTimesheetApprovalStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/timesheet_approval_statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "workspace",
      "user",
      "from_date",
      "to_date",
      "approval_statuses",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple timesheet approval statuses",
    "parameterDescriptions": {
      "workspace": "Globally unique identifier for the workspace.",
      "user": "Globally unique identifier for the user to filter timesheet approval statuses by.",
      "from_date": "The start date for filtering timesheet approval statuses.",
      "to_date": "The end date for filtering timesheet approval statuses.",
      "approval_statuses": "Filter by approval status. Can be one or more of draft, submitted, approved, or rejected.",
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createTimesheetApprovalStatus": {
    "accessPath": [
      "createTimesheetApprovalStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/timesheet_approval_statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Create a timesheet approval status",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "typeaheadForWorkspace": {
    "accessPath": [
      "typeaheadForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/typeahead",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "resource_type",
      "type",
      "query",
      "count",
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get objects via typeahead",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getUserTaskList": {
    "accessPath": [
      "getUserTaskList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/user_task_lists/{user_task_list_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_task_list_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a user task list",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getUserTaskListForUser": {
    "accessPath": [
      "getUserTaskListForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/users/{user_gid}/user_task_list",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "workspace",
      "opt_fields"
    ],
    "description": "Get a user's task list",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "workspace",
      "team",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple users",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/users/{user_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "workspace",
      "opt_fields"
    ],
    "description": "Get a user",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateUser": {
    "accessPath": [
      "updateUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/users/{user_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "workspace",
      "opt_fields"
    ],
    "description": "Update a user",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getFavoritesForUser": {
    "accessPath": [
      "getFavoritesForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/users/{user_gid}/favorites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "resource_type",
      "workspace",
      "opt_fields"
    ],
    "description": "Get a user's favorites",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getUsersForTeam": {
    "accessPath": [
      "getUsersForTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/teams/{team_gid}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "offset",
      "opt_fields"
    ],
    "description": "Get users in a team",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getUsersForWorkspace": {
    "accessPath": [
      "getUsersForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "offset",
      "opt_fields"
    ],
    "description": "Get users in a workspace or organization",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getUserForWorkspace": {
    "accessPath": [
      "getUserForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/users/{user_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid",
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a user in a workspace or organization",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateUserForWorkspace": {
    "accessPath": [
      "updateUserForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/users/{user_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid",
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a user in a workspace or organization",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getWebhooks": {
    "accessPath": [
      "getWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "workspace",
      "resource",
      "opt_fields"
    ],
    "description": "Get multiple webhooks",
    "parameterDescriptions": {
      "limit": "Results per page.\nThe number of objects to return per page. The value must be between 1 and 100.",
      "offset": "Offset token.\nAn offset to the next page returned by the API. A pagination request will return an offset token, which can be used as an input parameter to the next request. If an offset is not passed in, the API will return the first page of results.\n*Note: You can only pass in an offset that was returned to you via a previously paginated request.*",
      "workspace": "The workspace to query for webhooks in.",
      "resource": "Only return webhooks for the given resource.",
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "createWebhook": {
    "accessPath": [
      "createWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Establish a webhook",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
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
    "routeTemplate": "/api/1.0/webhooks/{webhook_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a webhook",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateWebhook": {
    "accessPath": [
      "updateWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/webhooks/{webhook_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a webhook",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
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
    "routeTemplate": "/api/1.0/webhooks/{webhook_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Delete a webhook"
  },
  "getWorkspaceMembership": {
    "accessPath": [
      "getWorkspaceMembership"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspace_memberships/{workspace_membership_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_membership_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a workspace membership",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getWorkspaceMembershipsForUser": {
    "accessPath": [
      "getWorkspaceMembershipsForUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/users/{user_gid}/workspace_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get workspace memberships for a user",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getWorkspaceMembershipsForWorkspace": {
    "accessPath": [
      "getWorkspaceMembershipsForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/workspace_memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user",
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get the workspace memberships for a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getWorkspaces": {
    "accessPath": [
      "getWorkspaces"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "limit",
      "offset",
      "opt_fields"
    ],
    "description": "Get multiple workspaces",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "getWorkspace": {
    "accessPath": [
      "getWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Get a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "updateWorkspace": {
    "accessPath": [
      "updateWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Update a workspace",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "addUserForWorkspace": {
    "accessPath": [
      "addUserForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/addUser",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "opt_fields"
    ],
    "description": "Add a user to a workspace or organization",
    "parameterDescriptions": {
      "opt_fields": "This endpoint returns a resource which excludes some properties by default. To include those optional properties, set this query parameter to a comma-separated list of the properties you wish to include."
    }
  },
  "removeUserForWorkspace": {
    "accessPath": [
      "removeUserForWorkspace"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/removeUser",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty"
    ],
    "description": "Remove a user from a workspace or organization"
  },
  "getWorkspaceEvents": {
    "accessPath": [
      "getWorkspaceEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/1.0/workspaces/{workspace_gid}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workspace_gid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "opt_pretty",
      "sync"
    ],
    "description": "Get workspace events"
  }
} satisfies ToolRuntimeMetadataMap;
