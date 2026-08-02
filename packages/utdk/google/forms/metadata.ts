import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "forms.forms.create": {
    "accessPath": [
      "formsFormsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "formId",
      "info",
      "items",
      "linkedSheetId",
      "responderUri",
      "revisionId",
      "settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/forms",
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
    "description": "Create a new form using the title given in the provided form message in the request. *Important:* Only the form.info.title and form.info.document_title fields are copied to the new form. All other fields including the form description, items and settings are disallowed. To create a new form and add items, you must first call forms.create to create an empty form with a title and (optional) document title, and then call forms.update to add the items."
  },
  "forms.forms.get": {
    "accessPath": [
      "formsFormsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/forms/{formId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId"
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
    "description": "Get a form.",
    "parameterDescriptions": {
      "formId": "Required. The form ID."
    }
  },
  "forms.forms.responses.list": {
    "accessPath": [
      "formsFormsResponsesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/forms/{formId}/responses",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId"
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
      "filter",
      "pageSize",
      "pageToken"
    ],
    "description": "List a form's responses.",
    "parameterDescriptions": {
      "formId": "Required. ID of the Form whose responses to list.",
      "filter": "Which form responses to return. Currently, the only supported filters are: * timestamp > *N* which means to get all form responses submitted after (but not at) timestamp *N*. * timestamp >= *N* which means to get all form responses submitted at and after timestamp *N*. For both supported filters, timestamp must be formatted in RFC3339 UTC \"Zulu\" format. Examples: \"2014-10-02T15:01:23Z\" and \"2014-10-02T15:01:23.045123456Z\".",
      "pageSize": "The maximum number of responses to return. The service may return fewer than this value. If unspecified or zero, at most 5000 responses are returned.",
      "pageToken": "A page token returned by a previous list response. If this field is set, the form and the values of the filter must be the same as for the original request."
    }
  },
  "forms.forms.responses.get": {
    "accessPath": [
      "formsFormsResponsesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/forms/{formId}/responses/{responseId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId",
      "responseId"
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
    "description": "Get one response from the form.",
    "parameterDescriptions": {
      "formId": "Required. The form ID.",
      "responseId": "Required. The response ID within the form."
    }
  },
  "forms.forms.watches.list": {
    "accessPath": [
      "formsFormsWatchesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/forms/{formId}/watches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId"
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
    "description": "Return a list of the watches owned by the invoking project. The maximum number of watches is two: For each invoker, the limit is one for each event type per form.",
    "parameterDescriptions": {
      "formId": "Required. ID of the Form whose watches to list."
    }
  },
  "forms.forms.watches.create": {
    "accessPath": [
      "formsFormsWatchesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "watch",
      "watchId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/forms/{formId}/watches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId"
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
    "description": "Create a new watch. If a watch ID is provided, it must be unused. For each invoking project, the per form limit is one watch per Watch.EventType. A watch expires seven days after it is created (see Watch.expire_time).",
    "parameterDescriptions": {
      "formId": "Required. ID of the Form to watch."
    }
  },
  "forms.forms.watches.delete": {
    "accessPath": [
      "formsFormsWatchesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/forms/{formId}/watches/{watchId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId",
      "watchId"
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
    "description": "Delete a watch.",
    "parameterDescriptions": {
      "formId": "Required. The ID of the Form.",
      "watchId": "Required. The ID of the Watch to delete."
    }
  },
  "forms.forms.watches.renew": {
    "accessPath": [
      "formsFormsWatchesRenew"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/forms/{formId}/watches/{watchId}:renew",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId",
      "watchId"
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
    "description": "Renew an existing watch for seven days. The state of the watch after renewal is `ACTIVE`, and the `expire_time` is seven days from the renewal. Renewing a watch in an error state (e.g. `SUSPENDED`) succeeds if the error is no longer present, but fail otherwise. After a watch has expired, RenewWatch returns `NOT_FOUND`.",
    "parameterDescriptions": {
      "formId": "Required. The ID of the Form.",
      "watchId": "Required. The ID of the Watch to renew."
    }
  },
  "forms.forms.batchUpdate": {
    "accessPath": [
      "formsFormsBatchUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "includeFormInResponse",
      "requests",
      "writeControl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/forms/{formId}:batchUpdate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "formId"
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
    "description": "Change the form with a batch of updates.",
    "parameterDescriptions": {
      "formId": "Required. The form ID."
    }
  }
} satisfies ToolRuntimeMetadataMap;
