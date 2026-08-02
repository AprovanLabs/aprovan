import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "sheets.spreadsheets.create": {
    "accessPath": [
      "sheetsSpreadsheetsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dataSourceSchedules",
      "dataSources",
      "developerMetadata",
      "namedRanges",
      "properties",
      "sheets",
      "spreadsheetId",
      "spreadsheetUrl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets",
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
    "description": "Creates a spreadsheet, returning the newly created spreadsheet."
  },
  "sheets.spreadsheets.get": {
    "accessPath": [
      "sheetsSpreadsheetsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
      "includeGridData",
      "ranges"
    ],
    "description": "Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. By default, data within grids is not returned. You can include grid data in one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData URL parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want. To retrieve only subsets of spreadsheet data, use the ranges URL parameter. Ranges are specified using [A1 notation](/sheets/api/guides/concepts#cell). You can define a single cell (for example, `A1`) or multiple cells (for example, `A1:D5`). You can also get cells from other sheets within the same spreadsheet (for example, `Sheet2!A1:C4`) or retrieve multiple ranges at once (for example, `?ranges=A1:D5&ranges=Sheet2!A1:C4`). Limiting the range returns only the portions of the spreadsheet that intersect the requested ranges.",
    "parameterDescriptions": {
      "spreadsheetId": "The spreadsheet to request.",
      "includeGridData": "True if grid data should be returned. This parameter is ignored if a field mask was set in the request.",
      "ranges": "The ranges to retrieve from the spreadsheet."
    }
  },
  "sheets.spreadsheets.developerMetadata.get": {
    "accessPath": [
      "sheetsSpreadsheetsDeveloperMetadataGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId",
      "metadataId"
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
    "description": "Returns the developer metadata with the specified ID. The caller must specify the spreadsheet ID and the developer metadata's unique metadataId.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to retrieve metadata from.",
      "metadataId": "The ID of the developer metadata to retrieve."
    }
  },
  "sheets.spreadsheets.developerMetadata.search": {
    "accessPath": [
      "sheetsSpreadsheetsDeveloperMetadataSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dataFilters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/developerMetadata:search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Returns all developer metadata matching the specified DataFilter. If the provided DataFilter represents a DeveloperMetadataLookup object, this will return all DeveloperMetadata entries selected by it. If the DataFilter represents a location in a spreadsheet, this will return all developer metadata associated with locations intersecting that region.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to retrieve metadata from."
    }
  },
  "sheets.spreadsheets.sheets.copyTo": {
    "accessPath": [
      "sheetsSpreadsheetsSheetsCopyTo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "destinationSpreadsheetId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId",
      "sheetId"
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
    "description": "Copies a single sheet from a spreadsheet to another spreadsheet. Returns the properties of the newly created sheet.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet containing the sheet to copy.",
      "sheetId": "The ID of the sheet to copy."
    }
  },
  "sheets.spreadsheets.values.get": {
    "accessPath": [
      "sheetsSpreadsheetsValuesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values/{range}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId",
      "range"
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
      "dateTimeRenderOption",
      "majorDimension",
      "valueRenderOption"
    ],
    "description": "Returns a range of values from a spreadsheet. The caller must specify the spreadsheet ID and a range.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to retrieve data from.",
      "range": "The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from.",
      "dateTimeRenderOption": "How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.",
      "majorDimension": "The major dimension that results should use. For example, if the spreadsheet data in Sheet1 is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=Sheet1!A1:B2?majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `range=Sheet1!A1:B2?majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.",
      "valueRenderOption": "How values should be represented in the output. The default render option is FORMATTED_VALUE."
    }
  },
  "sheets.spreadsheets.values.update": {
    "accessPath": [
      "sheetsSpreadsheetsValuesUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "majorDimension",
      "range",
      "values"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values/{range}",
    "pathConflictKeys": [
      "range"
    ],
    "pathParameterKeys": [
      "spreadsheetId",
      "range"
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
      "includeValuesInResponse",
      "responseDateTimeRenderOption",
      "responseValueRenderOption",
      "valueInputOption"
    ],
    "description": "Sets values in a range of a spreadsheet. The caller must specify the spreadsheet ID, range, and a valueInputOption.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update.",
      "range": "The [A1 notation](/sheets/api/guides/concepts#cell) of the values to update.",
      "includeValuesInResponse": "Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns).",
      "responseDateTimeRenderOption": "Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.",
      "responseValueRenderOption": "Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.",
      "valueInputOption": "How the input data should be interpreted."
    }
  },
  "sheets.spreadsheets.values.append": {
    "accessPath": [
      "sheetsSpreadsheetsValuesAppend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "majorDimension",
      "range",
      "values"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values/{range}:append",
    "pathConflictKeys": [
      "range"
    ],
    "pathParameterKeys": [
      "spreadsheetId",
      "range"
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
      "includeValuesInResponse",
      "insertDataOption",
      "responseDateTimeRenderOption",
      "responseValueRenderOption",
      "valueInputOption"
    ],
    "description": "Appends values to a spreadsheet. The input range is used to search for existing data and find a \"table\" within that range. Values will be appended to the next row of the table, starting with the first column of the table. See the [guide](/sheets/api/guides/values#appending_values) and [sample code](/sheets/api/samples/writing#append_values) for specific details of how tables are detected and data is appended. The caller must specify the spreadsheet ID, range, and a valueInputOption. The `valueInputOption` only controls how the input data will be added to the sheet (column-wise or row-wise), it does not influence what cell the data starts being written to.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update.",
      "range": "The [A1 notation](/sheets/api/guides/concepts#cell) of a range to search for a logical table of data. Values are appended after the last row of the table.",
      "includeValuesInResponse": "Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values.",
      "insertDataOption": "How the input data should be inserted.",
      "responseDateTimeRenderOption": "Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.",
      "responseValueRenderOption": "Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE.",
      "valueInputOption": "How the input data should be interpreted."
    }
  },
  "sheets.spreadsheets.values.clear": {
    "accessPath": [
      "sheetsSpreadsheetsValuesClear"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values/{range}:clear",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId",
      "range"
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
    "description": "Clears values from a spreadsheet. The caller must specify the spreadsheet ID and range. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update.",
      "range": "The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the values to clear."
    }
  },
  "sheets.spreadsheets.values.batchClear": {
    "accessPath": [
      "sheetsSpreadsheetsValuesBatchClear"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ranges"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values:batchClear",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges. Only values are cleared -- all other properties of the cell (such as formatting and data validation) are kept.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update."
    }
  },
  "sheets.spreadsheets.values.batchClearByDataFilter": {
    "accessPath": [
      "sheetsSpreadsheetsValuesBatchClearByDataFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dataFilters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges matching any of the specified data filters will be cleared. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update."
    }
  },
  "sheets.spreadsheets.values.batchGet": {
    "accessPath": [
      "sheetsSpreadsheetsValuesBatchGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values:batchGet",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
      "dateTimeRenderOption",
      "majorDimension",
      "ranges",
      "valueRenderOption"
    ],
    "description": "Returns one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to retrieve data from.",
      "dateTimeRenderOption": "How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER.",
      "majorDimension": "The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `ranges=[\"A1:B2\"],majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `ranges=[\"A1:B2\"],majorDimension=COLUMNS` returns `[[1,3],[2,4]]`.",
      "ranges": "The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from.",
      "valueRenderOption": "How values should be represented in the output. The default render option is ValueRenderOption.FORMATTED_VALUE."
    }
  },
  "sheets.spreadsheets.values.batchGetByDataFilter": {
    "accessPath": [
      "sheetsSpreadsheetsValuesBatchGetByDataFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dataFilters",
      "dateTimeRenderOption",
      "majorDimension",
      "valueRenderOption"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Returns one or more ranges of values that match the specified data filters. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges that match any of the data filters in the request will be returned.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to retrieve data from."
    }
  },
  "sheets.spreadsheets.values.batchUpdate": {
    "accessPath": [
      "sheetsSpreadsheetsValuesBatchUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "includeValuesInResponse",
      "responseDateTimeRenderOption",
      "responseValueRenderOption",
      "valueInputOption"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values:batchUpdate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more ValueRanges.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update."
    }
  },
  "sheets.spreadsheets.values.batchUpdateByDataFilter": {
    "accessPath": [
      "sheetsSpreadsheetsValuesBatchUpdateByDataFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "includeValuesInResponse",
      "responseDateTimeRenderOption",
      "responseValueRenderOption",
      "valueInputOption"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more DataFilterValueRanges.",
    "parameterDescriptions": {
      "spreadsheetId": "The ID of the spreadsheet to update."
    }
  },
  "sheets.spreadsheets.batchUpdate": {
    "accessPath": [
      "sheetsSpreadsheetsBatchUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "includeSpreadsheetInResponse",
      "requests",
      "responseIncludeGridData",
      "responseRanges"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}:batchUpdate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Applies one or more updates to the spreadsheet. Each request is validated before being applied. If any request is not valid then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. The replies will mirror the requests. For example, if you applied 4 updates and the 3rd one had a reply, then the response will have 2 empty replies, the actual reply, and another empty reply, in that order. Due to the collaborative nature of spreadsheets, it is not guaranteed that the spreadsheet will reflect exactly your changes after this completes, however it is guaranteed that the updates in the request will be applied together atomically. Your changes may be altered with respect to collaborator changes. If there are no collaborators, the spreadsheet should reflect your changes.",
    "parameterDescriptions": {
      "spreadsheetId": "The spreadsheet to apply the updates to."
    }
  },
  "sheets.spreadsheets.getByDataFilter": {
    "accessPath": [
      "sheetsSpreadsheetsGetByDataFilter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dataFilters",
      "includeGridData"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v4/spreadsheets/{spreadsheetId}:getByDataFilter",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "spreadsheetId"
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
    "description": "Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. This method differs from GetSpreadsheet in that it allows selecting which subsets of spreadsheet data to return by specifying a dataFilters parameter. Multiple DataFilters can be specified. Specifying one or more data filters returns the portions of the spreadsheet that intersect ranges matched by any of the filters. By default, data within grids is not returned. You can include grid data one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want.",
    "parameterDescriptions": {
      "spreadsheetId": "The spreadsheet to request."
    }
  }
} satisfies ToolRuntimeMetadataMap;
