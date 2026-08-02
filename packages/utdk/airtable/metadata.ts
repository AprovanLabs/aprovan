import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listRecords": {
    "accessPath": [
      "listRecords"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "fields[]",
      "filterByFormula",
      "maxRecords",
      "pageSize",
      "offset",
      "view",
      "sort[0][field]",
      "sort[0][direction]"
    ],
    "description": "List records",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID (starts with 'app')",
      "tableIdOrName": "The table ID (starts with 'tbl') or table name",
      "fields[]": "Field names to include in the response. If not specified, all fields are returned.",
      "filterByFormula": "An Airtable formula to filter records (e.g. '{Status}=\"Done\"')",
      "maxRecords": "Maximum number of records to return (max 100)",
      "pageSize": "Number of records per page (default 100, max 100)",
      "offset": "Pagination offset string returned from a previous request",
      "view": "Name or ID of a view to filter and sort records",
      "sort[0][field]": "Field name to sort by",
      "sort[0][direction]": "Sort direction"
    }
  },
  "createRecord": {
    "accessPath": [
      "createRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "records",
      "typecast",
      "returnFieldsByFieldId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a record",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID",
      "tableIdOrName": "The table ID or name"
    }
  },
  "updateRecords": {
    "accessPath": [
      "updateRecords"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "records"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update multiple records",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID",
      "tableIdOrName": "The table ID or name"
    }
  },
  "deleteRecords": {
    "accessPath": [
      "deleteRecords"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "records[]"
    ],
    "description": "Delete records",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID",
      "tableIdOrName": "The table ID or name",
      "records[]": "Record IDs to delete"
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
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}/{recordId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName",
      "recordId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a record",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID",
      "tableIdOrName": "The table ID or name",
      "recordId": "The record ID (starts with 'rec')"
    }
  },
  "replaceRecord": {
    "accessPath": [
      "replaceRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}/{recordId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName",
      "recordId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Replace a record",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID",
      "tableIdOrName": "The table ID or name",
      "recordId": "The record ID"
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
    "routeTemplate": "/v0/{baseId}/{tableIdOrName}/{recordId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId",
      "tableIdOrName",
      "recordId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a record",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID",
      "tableIdOrName": "The table ID or name",
      "recordId": "The record ID to delete"
    }
  },
  "listBases": {
    "accessPath": [
      "listBases"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v0/meta/bases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "offset"
    ],
    "description": "List bases",
    "parameterDescriptions": {
      "offset": "Pagination offset for fetching the next page"
    }
  },
  "listTables": {
    "accessPath": [
      "listTables"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v0/meta/bases/{baseId}/tables",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "baseId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List tables in a base",
    "parameterDescriptions": {
      "baseId": "The Airtable base ID"
    }
  }
} satisfies ToolRuntimeMetadataMap;
