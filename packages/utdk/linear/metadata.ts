import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "executeGraphQL": {
    "accessPath": [
      "executeGraphQl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "query",
      "variables",
      "operationName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/graphql",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Execute a GraphQL query or mutation"
  },
  "exchangeOAuthToken": {
    "accessPath": [
      "exchangeOAuthToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "code",
      "redirect_uri",
      "client_id",
      "client_secret",
      "grant_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/oauth/token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchange authorization code for access token"
  },
  "revokeOAuthToken": {
    "accessPath": [
      "revokeOAuthToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/oauth/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke an OAuth access token"
  },
  "listWebhooks": {
    "accessPath": [
      "listWebhooks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit"
    ],
    "description": "List webhooks",
    "parameterDescriptions": {
      "cursor": "Pagination cursor for fetching the next page of results",
      "limit": "Maximum number of webhooks to return (1-250)"
    }
  },
  "createWebhook": {
    "accessPath": [
      "createWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "url",
      "secret",
      "enabled",
      "resourceTypes",
      "teamId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a webhook"
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
    "routeTemplate": "/webhooks/{webhookId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a webhook",
    "parameterDescriptions": {
      "webhookId": "The unique identifier of the webhook"
    }
  },
  "updateWebhook": {
    "accessPath": [
      "updateWebhook"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "url",
      "secret",
      "enabled",
      "resourceTypes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/webhooks/{webhookId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a webhook",
    "parameterDescriptions": {
      "webhookId": "The unique identifier of the webhook"
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
    "routeTemplate": "/webhooks/{webhookId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhookId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a webhook",
    "parameterDescriptions": {
      "webhookId": "The unique identifier of the webhook to delete"
    }
  },
  "createAttachment": {
    "accessPath": [
      "createAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "issueId",
      "url",
      "title",
      "subtitle",
      "iconUrl",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/attachment",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an attachment on an issue"
  }
} satisfies ToolRuntimeMetadataMap;
