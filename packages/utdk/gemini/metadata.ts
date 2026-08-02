import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listModels": {
    "accessPath": [
      "listModels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1beta/models",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "pageSize",
      "pageToken"
    ],
    "description": "List models"
  },
  "getModel": {
    "accessPath": [
      "getModel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1beta/models/{model}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "model"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a model",
    "parameterDescriptions": {
      "model": "Model name without the models/ prefix, e.g. gemini-2.5-flash"
    }
  },
  "generateContent": {
    "accessPath": [
      "generateContent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contents",
      "systemInstruction",
      "generationConfig",
      "safetySettings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1beta/models/{model}:generateContent",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "model"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate content",
    "parameterDescriptions": {
      "model": "Model name without the models/ prefix, e.g. gemini-2.5-flash"
    }
  },
  "countTokens": {
    "accessPath": [
      "countTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contents"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1beta/models/{model}:countTokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "model"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Count tokens"
  }
} satisfies ToolRuntimeMetadataMap;
