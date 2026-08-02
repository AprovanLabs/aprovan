import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "slides.presentations.create": {
    "accessPath": [
      "slidesPresentationsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "layouts",
      "locale",
      "masters",
      "notesMaster",
      "pageSize",
      "presentationId",
      "revisionId",
      "slides",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/presentations",
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
    "description": "Creates a blank presentation using the title given in the request. If a `presentationId` is provided, it is used as the ID of the new presentation. Otherwise, a new ID is generated. Other fields in the request, including any provided content, are ignored. Returns the created presentation."
  },
  "slides.presentations.get": {
    "accessPath": [
      "slidesPresentationsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/presentations/{presentationId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "presentationId"
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
    "description": "Gets the latest version of the specified presentation.",
    "parameterDescriptions": {
      "presentationId": "The ID of the presentation to retrieve."
    }
  },
  "slides.presentations.pages.get": {
    "accessPath": [
      "slidesPresentationsPagesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/presentations/{presentationId}/pages/{pageObjectId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "presentationId",
      "pageObjectId"
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
    "description": "Gets the latest version of the specified page in the presentation.",
    "parameterDescriptions": {
      "presentationId": "The ID of the presentation to retrieve.",
      "pageObjectId": "The object ID of the page to retrieve."
    }
  },
  "slides.presentations.pages.getThumbnail": {
    "accessPath": [
      "slidesPresentationsPagesGetThumbnail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "presentationId",
      "pageObjectId"
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
      "thumbnailProperties.mimeType",
      "thumbnailProperties.thumbnailSize"
    ],
    "description": "Generates a thumbnail of the latest version of the specified page in the presentation and returns a URL to the thumbnail image. This request counts as an [expensive read request](/slides/limits) for quota purposes.",
    "parameterDescriptions": {
      "presentationId": "The ID of the presentation to retrieve.",
      "pageObjectId": "The object ID of the page whose thumbnail to retrieve.",
      "thumbnailProperties.mimeType": "The optional mime type of the thumbnail image. If you don't specify the mime type, the mime type defaults to PNG.",
      "thumbnailProperties.thumbnailSize": "The optional thumbnail image size. If you don't specify the size, the server chooses a default size of the image."
    }
  },
  "slides.presentations.batchUpdate": {
    "accessPath": [
      "slidesPresentationsBatchUpdate"
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
    "routeTemplate": "/v1/presentations/{presentationId}:batchUpdate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "presentationId"
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
    "description": "Applies one or more updates to the presentation. Each request is validated before being applied. If any request is not valid, then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. Other requests do not need to return information; these each return an empty reply. The order of replies matches that of the requests. For example, suppose you call batchUpdate with four updates, and only the third one returns information. The response would have two empty replies: the reply to the third request, and another empty reply, in that order. Because other users may be editing the presentation, the presentation might not exactly reflect your changes: your changes may be altered with respect to collaborator changes. If there are no collaborators, the presentation should reflect your changes. In any case, the updates in your request are guaranteed to be applied together atomically.",
    "parameterDescriptions": {
      "presentationId": "The presentation to apply the updates to."
    }
  }
} satisfies ToolRuntimeMetadataMap;
