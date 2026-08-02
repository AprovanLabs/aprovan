import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "docs.documents.create": {
    "accessPath": [
      "docsDocumentsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "body",
      "documentId",
      "documentStyle",
      "footers",
      "footnotes",
      "headers",
      "inlineObjects",
      "lists",
      "namedRanges",
      "namedStyles",
      "positionedObjects",
      "revisionId",
      "suggestedDocumentStyleChanges",
      "suggestedNamedStylesChanges",
      "suggestionsViewMode",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/documents",
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
    "description": "Creates a blank document using the title given in the request. Other fields in the request, including any provided content, are ignored. Returns the created document."
  },
  "docs.documents.get": {
    "accessPath": [
      "docsDocumentsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/documents/{documentId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentId"
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
      "suggestionsViewMode"
    ],
    "description": "Gets the latest version of the specified document.",
    "parameterDescriptions": {
      "documentId": "The ID of the document to retrieve.",
      "suggestionsViewMode": "The suggestions view mode to apply to the document. This allows viewing the document with all suggestions inline, accepted or rejected. If one is not specified, DEFAULT_FOR_CURRENT_ACCESS is used."
    }
  },
  "docs.documents.batchUpdate": {
    "accessPath": [
      "docsDocumentsBatchUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "requests",
      "writeControl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/documents/{documentId}:batchUpdate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentId"
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
    "description": "Applies one or more updates to the document. Each request is validated before being applied. If any request is not valid, then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. Other requests do not need to return information; these each return an empty reply. The order of replies matches that of the requests. For example, suppose you call batchUpdate with four updates, and only the third one returns information. The response would have two empty replies, the reply to the third request, and another empty reply, in that order. Because other users may be editing the document, the document might not exactly reflect your changes: your changes may be altered with respect to collaborator changes. If there are no collaborators, the document should reflect your changes. In any case, the updates in your request are guaranteed to be applied together atomically.",
    "parameterDescriptions": {
      "documentId": "The ID of the document to update."
    }
  }
} satisfies ToolRuntimeMetadataMap;
