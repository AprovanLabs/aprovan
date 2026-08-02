import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "createMessage": {
    "accessPath": [
      "createMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "max_tokens",
      "messages",
      "system",
      "thinking",
      "output_config",
      "tools",
      "tool_choice",
      "stop_sequences",
      "stream",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "anthropic-version"
    ],
    "method": "POST",
    "routeTemplate": "/v1/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a message",
    "parameterDescriptions": {
      "anthropic-version": "API version date"
    }
  },
  "countTokens": {
    "accessPath": [
      "countTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "messages",
      "system",
      "tools"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "anthropic-version"
    ],
    "method": "POST",
    "routeTemplate": "/v1/messages/count_tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Count tokens in a message",
    "parameterDescriptions": {
      "anthropic-version": "API version date"
    }
  },
  "listModels": {
    "accessPath": [
      "listModels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "anthropic-version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/models",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "before_id",
      "after_id"
    ],
    "description": "List models",
    "parameterDescriptions": {
      "anthropic-version": "API version date"
    }
  },
  "getModel": {
    "accessPath": [
      "getModel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "anthropic-version"
    ],
    "method": "GET",
    "routeTemplate": "/v1/models/{model_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "model_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a model",
    "parameterDescriptions": {
      "anthropic-version": "API version date",
      "model_id": "Model identifier or alias, e.g. claude-opus-4-8"
    }
  }
} satisfies ToolRuntimeMetadataMap;
