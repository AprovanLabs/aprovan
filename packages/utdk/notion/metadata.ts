import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "deleteABlock": {
    "accessPath": [
      "deleteABlock"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/blocks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a block"
  },
  "retrieveABlock": {
    "accessPath": [
      "retrieveABlock"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/blocks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a block"
  },
  "updateABlock": {
    "accessPath": [
      "updateABlock"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "paragraph"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/blocks/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a block"
  },
  "retrieveBlockChildren": {
    "accessPath": [
      "retrieveBlockChildren"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/blocks/{id}/children",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size"
    ],
    "description": "Retrieve block children"
  },
  "appendBlockChildren": {
    "accessPath": [
      "appendBlockChildren"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "children"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/blocks/{id}/children",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Append block children"
  },
  "retrieveComments": {
    "accessPath": [
      "retrieveComments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "block_id",
      "page_size"
    ],
    "description": "Retrieve comments"
  },
  "retrieveADatabase": {
    "accessPath": [
      "retrieveADatabase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/databases/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a database"
  },
  "updateADatabase": {
    "accessPath": [
      "updateADatabase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "properties",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/databases/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a database"
  },
  "queryADatabase": {
    "accessPath": [
      "queryADatabase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "POST",
    "routeTemplate": "/v1/databases/{id}/query",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Query a database"
  },
  "retrieveAPage": {
    "accessPath": [
      "retrieveAPage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version",
      ""
    ],
    "method": "GET",
    "routeTemplate": "/v1/pages/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Page"
  },
  "updatePageProperties": {
    "accessPath": [
      "updatePageProperties"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "properties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/pages/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Page properties "
  },
  "retrieveAPagePropertyItem": {
    "accessPath": [
      "retrieveAPagePropertyItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/pages/{page_id}/properties/{property_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "property_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a Page Property Item"
  },
  "retrieveAUser": {
    "accessPath": [
      "retrieveAUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Notion-Version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/users/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a user"
  }
} satisfies ToolRuntimeMetadataMap;
