import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listSObjects": {
    "accessPath": [
      "listSObjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/services/data/v58.0/sobjects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List available sObjects"
  },
  "describeSObject": {
    "accessPath": [
      "describeSObject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/services/data/v58.0/sobjects/{sObjectName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sObjectName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Describe a sObject",
    "parameterDescriptions": {
      "sObjectName": "API name of the Salesforce object (e.g. Account, Contact, Opportunity)"
    }
  },
  "createRecord": {
    "accessPath": [
      "createRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/services/data/v58.0/sobjects/{sObjectName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sObjectName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a record",
    "parameterDescriptions": {
      "sObjectName": "API name of the Salesforce object"
    }
  },
  "getRecord": {
    "accessPath": [
      "getRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/services/data/v58.0/sobjects/{sObjectName}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sObjectName",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "fields"
    ],
    "description": "Get a record",
    "parameterDescriptions": {
      "sObjectName": "API name of the Salesforce object",
      "id": "Salesforce record ID (15 or 18 character ID)",
      "fields": "Comma-separated list of fields to return"
    }
  },
  "updateRecord": {
    "accessPath": [
      "updateRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/services/data/v58.0/sobjects/{sObjectName}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sObjectName",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a record",
    "parameterDescriptions": {
      "sObjectName": "API name of the Salesforce object",
      "id": "Salesforce record ID"
    }
  },
  "deleteRecord": {
    "accessPath": [
      "deleteRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/services/data/v58.0/sobjects/{sObjectName}/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "sObjectName",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a record",
    "parameterDescriptions": {
      "sObjectName": "API name of the Salesforce object",
      "id": "Salesforce record ID"
    }
  },
  "query": {
    "accessPath": [
      "query"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/services/data/v58.0/query",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q"
    ],
    "description": "Execute a SOQL query",
    "parameterDescriptions": {
      "q": "The SOQL query string (e.g. 'SELECT Id, Name FROM Account WHERE CreatedDate = TODAY')"
    }
  },
  "queryMore": {
    "accessPath": [
      "queryMore"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/services/data/v58.0/query/{queryLocator}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "queryLocator"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get next page of query results",
    "parameterDescriptions": {
      "queryLocator": "The query locator identifier from the nextRecordsUrl"
    }
  },
  "search": {
    "accessPath": [
      "search"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/services/data/v58.0/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q"
    ],
    "description": "Execute a SOSL search",
    "parameterDescriptions": {
      "q": "The SOSL search string (e.g. 'FIND {Acme} IN ALL FIELDS RETURNING Account, Contact')"
    }
  },
  "compositeBatch": {
    "accessPath": [
      "compositeBatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "batchRequests",
      "haltOnError"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/services/data/v58.0/composite/batch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Execute composite batch requests"
  }
} satisfies ToolRuntimeMetadataMap;
