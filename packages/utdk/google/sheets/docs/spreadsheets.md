# Spreadsheets

17 operations · `utdk/google/sheets`

```ts
import sheets from "utdk/google/sheets";
```

## `sheets.sheetsSpreadsheetsCreate`

Creates a spreadsheet, returning the newly created spreadsheet. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsCreate(input: {
  /** Output only. A list of data source refresh schedules. */
  dataSourceSchedules?: (DataSourceRefreshSchedule)[];
  /** A list of external data sources connected with the spreadsheet. */
  dataSources?: (DataSource)[];
  /** The developer metadata associated with a spreadsheet. */
  developerMetadata?: (DeveloperMetadata)[];
  /** The named ranges defined in a spreadsheet. */
  namedRanges?: (NamedRange)[];
  /** Overall properties of a spreadsheet. */
  properties?: SpreadsheetProperties;
  /** The sheets that are part of a spreadsheet. */
  sheets?: (Sheet)[];
  /** The ID of the spreadsheet. This field is read-only. */
  spreadsheetId?: string;
  /** The url of the spreadsheet. This field is read-only. */
  spreadsheetUrl?: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<Spreadsheet>
```

<sub>`POST /v4/spreadsheets` · `sheets.spreadsheets.create`</sub>

## `sheets.sheetsSpreadsheetsGet`

Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. By default, data within grids is not returned. You can include grid data in one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData URL parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want. To retrieve only subsets of spreadsheet data, use the ranges URL parameter. Ranges are specified using [A1 notation](/sheets/api/guides/concepts#cell). You can define a single cell (for example, `A1`) or multiple cells (for example, `A1:D5`). You can also get cells from other sheets within the same spreadsheet (for example, `Sheet2!A1:C4`) or retrieve multiple ranges at once (for example, `?ranges=A1:D5&ranges=Sheet2!A1:C4`). Limiting the range returns only the portions of the spreadsheet that intersect the requested ranges. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsGet(input: {
  /** The spreadsheet to request. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** True if grid data should be returned. This parameter is ignored if a field mask was set in the request. */
  includeGridData?: boolean;
  /** The ranges to retrieve from the spreadsheet. */
  ranges?: (string)[];
}): Promise<Spreadsheet>
```

<sub>`GET /v4/spreadsheets/{spreadsheetId}` · `sheets.spreadsheets.get`</sub>

## `sheets.sheetsSpreadsheetsBatchUpdate`

Applies one or more updates to the spreadsheet. Each request is validated before being applied. If any request is not valid then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. The replies will mirror the requests. For example, if you applied 4 updates and the 3rd one had a reply, then the response will have 2 empty replies, the actual reply, and another empty reply, in that order. Due to the collaborative nature of spreadsheets, it is not guaranteed that the spreadsheet will reflect exactly your changes after this completes, however it is guaranteed that the updates in the request will be applied together atomically. Your changes may be altered with respect to collaborator changes. If there are no collaborators, the spreadsheet should reflect your changes. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsBatchUpdate(input: {
  /** Determines if the update response should include the spreadsheet resource. */
  includeSpreadsheetInResponse?: boolean;
  /** A list of updates to apply to the spreadsheet. Requests will be applied in the order they are specified. If any request is not valid, no requests will be applied. */
  requests?: (Request)[];
  /** True if grid data should be returned. Meaningful only if include_spreadsheet_in_response is 'true'. This parameter is ignored if a field mask was set in the request. */
  responseIncludeGridData?: boolean;
  /** Limits the ranges included in the response spreadsheet. Meaningful only if include_spreadsheet_in_response is 'true'. */
  responseRanges?: (string)[];
  /** The spreadsheet to apply the updates to. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<BatchUpdateSpreadsheetResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}:batchUpdate` · `sheets.spreadsheets.batchUpdate`</sub>

## `sheets.sheetsSpreadsheetsGetByDataFilter`

Returns the spreadsheet at the given ID. The caller must specify the spreadsheet ID. This method differs from GetSpreadsheet in that it allows selecting which subsets of spreadsheet data to return by specifying a dataFilters parameter. Multiple DataFilters can be specified. Specifying one or more data filters returns the portions of the spreadsheet that intersect ranges matched by any of the filters. By default, data within grids is not returned. You can include grid data one of 2 ways: * Specify a [field mask](https://developers.google.com/sheets/api/guides/field-masks) listing your desired fields using the `fields` URL parameter in HTTP * Set the includeGridData parameter to true. If a field mask is set, the `includeGridData` parameter is ignored For large spreadsheets, as a best practice, retrieve only the specific spreadsheet fields that you want. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsGetByDataFilter(input: {
  /** The DataFilters used to select which ranges to retrieve from the spreadsheet. */
  dataFilters?: (DataFilter)[];
  /** True if grid data should be returned. This parameter is ignored if a field mask was set in the request. */
  includeGridData?: boolean;
  /** The spreadsheet to request. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<Spreadsheet>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}:getByDataFilter` · `sheets.spreadsheets.getByDataFilter`</sub>

## `sheets.sheetsSpreadsheetsDeveloperMetadataSearch`

Returns all developer metadata matching the specified DataFilter. If the provided DataFilter represents a DeveloperMetadataLookup object, this will return all DeveloperMetadata entries selected by it. If the DataFilter represents a location in a spreadsheet, this will return all developer metadata associated with locations intersecting that region. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsDeveloperMetadataSearch(input: {
  /** The data filters describing the criteria used to determine which DeveloperMetadata entries to return. DeveloperMetadata matching any of the specified filters are included in the response. */
  dataFilters?: (DataFilter)[];
  /** The ID of the spreadsheet to retrieve metadata from. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<SearchDeveloperMetadataResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/developerMetadata:search` · `sheets.spreadsheets.developerMetadata.search`</sub>

## `sheets.sheetsSpreadsheetsDeveloperMetadataGet`

Returns the developer metadata with the specified ID. The caller must specify the spreadsheet ID and the developer metadata's unique metadataId. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsDeveloperMetadataGet(input: {
  /** The ID of the spreadsheet to retrieve metadata from. */
  spreadsheetId: string;
  /** The ID of the developer metadata to retrieve. */
  metadataId: number;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<DeveloperMetadata>
```

<sub>`GET /v4/spreadsheets/{spreadsheetId}/developerMetadata/{metadataId}` · `sheets.spreadsheets.developerMetadata.get`</sub>

## `sheets.sheetsSpreadsheetsSheetsCopyTo`

Copies a single sheet from a spreadsheet to another spreadsheet. Returns the properties of the newly created sheet. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsSheetsCopyTo(input: {
  /** The ID of the spreadsheet to copy the sheet to. */
  destinationSpreadsheetId?: string;
  /** The ID of the spreadsheet containing the sheet to copy. */
  spreadsheetId: string;
  /** The ID of the sheet to copy. */
  sheetId: number;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<SheetProperties>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo` · `sheets.spreadsheets.sheets.copyTo`</sub>

## `sheets.sheetsSpreadsheetsValuesBatchClear`

Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges. Only values are cleared -- all other properties of the cell (such as formatting and data validation) are kept. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesBatchClear(input: {
  /** The ranges to clear, in [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell). */
  ranges?: (string)[];
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<BatchClearValuesResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values:batchClear` · `sheets.spreadsheets.values.batchClear`</sub>

## `sheets.sheetsSpreadsheetsValuesBatchClearByDataFilter`

Clears one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges matching any of the specified data filters will be cleared. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesBatchClearByDataFilter(input: {
  /** The DataFilters used to determine which ranges to clear. */
  dataFilters?: (DataFilter)[];
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<BatchClearValuesByDataFilterResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values:batchClearByDataFilter` · `sheets.spreadsheets.values.batchClearByDataFilter`</sub>

## `sheets.sheetsSpreadsheetsValuesBatchGet`

Returns one or more ranges of values from a spreadsheet. The caller must specify the spreadsheet ID and one or more ranges. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesBatchGet(input: {
  /** The ID of the spreadsheet to retrieve data from. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `ranges=["A1:B2"],majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `ranges=["A1:B2"],majorDimension=COLUMNS` returns `[[1,3],[2,4]]`. */
  majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
  /** The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from. */
  ranges?: (string)[];
  /** How values should be represented in the output. The default render option is ValueRenderOption.FORMATTED_VALUE. */
  valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
}): Promise<BatchGetValuesResponse>
```

<sub>`GET /v4/spreadsheets/{spreadsheetId}/values:batchGet` · `sheets.spreadsheets.values.batchGet`</sub>

## `sheets.sheetsSpreadsheetsValuesBatchGetByDataFilter`

Returns one or more ranges of values that match the specified data filters. The caller must specify the spreadsheet ID and one or more DataFilters. Ranges that match any of the data filters in the request will be returned. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesBatchGetByDataFilter(input: {
  /** The data filters used to match the ranges of values to retrieve. Ranges that match any of the specified data filters are included in the response. */
  dataFilters?: (DataFilter)[];
  /** How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** The major dimension that results should use. For example, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then a request that selects that range and sets `majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas a request that sets `majorDimension=COLUMNS` returns `[[1,3],[2,4]]`. */
  majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
  /** How values should be represented in the output. The default render option is FORMATTED_VALUE. */
  valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  /** The ID of the spreadsheet to retrieve data from. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<BatchGetValuesByDataFilterResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values:batchGetByDataFilter` · `sheets.spreadsheets.values.batchGetByDataFilter`</sub>

## `sheets.sheetsSpreadsheetsValuesBatchUpdate`

Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more ValueRanges. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesBatchUpdate(input: {
  /** The new values to apply to the spreadsheet. */
  data?: (ValueRange)[];
  /** Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. The `updatedData` field within each of the BatchUpdateValuesResponse.responses contains the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns). */
  includeValuesInResponse?: boolean;
  /** Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE. */
  responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  /** How the input data should be interpreted. */
  valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<BatchUpdateValuesResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values:batchUpdate` · `sheets.spreadsheets.values.batchUpdate`</sub>

## `sheets.sheetsSpreadsheetsValuesBatchUpdateByDataFilter`

Sets values in one or more ranges of a spreadsheet. The caller must specify the spreadsheet ID, a valueInputOption, and one or more DataFilterValueRanges. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesBatchUpdateByDataFilter(input: {
  /** The new values to apply to the spreadsheet. If more than one range is matched by the specified DataFilter the specified values are applied to all of those ranges. */
  data?: (DataFilterValueRange)[];
  /** Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. The `updatedData` field within each of the BatchUpdateValuesResponse.responses contains the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns). */
  includeValuesInResponse?: boolean;
  /** Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE. */
  responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  /** How the input data should be interpreted. */
  valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<BatchUpdateValuesByDataFilterResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values:batchUpdateByDataFilter` · `sheets.spreadsheets.values.batchUpdateByDataFilter`</sub>

## `sheets.sheetsSpreadsheetsValuesGet`

Returns a range of values from a spreadsheet. The caller must specify the spreadsheet ID and a range. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesGet(input: {
  /** The ID of the spreadsheet to retrieve data from. */
  spreadsheetId: string;
  /** The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the range to retrieve values from. */
  range: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** How dates, times, and durations should be represented in the output. This is ignored if value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  dateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** The major dimension that results should use. For example, if the spreadsheet data in Sheet1 is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=Sheet1!A1:B2?majorDimension=ROWS` returns `[[1,2],[3,4]]`, whereas requesting `range=Sheet1!A1:B2?majorDimension=COLUMNS` returns `[[1,3],[2,4]]`. */
  majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
  /** How values should be represented in the output. The default render option is FORMATTED_VALUE. */
  valueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
}): Promise<ValueRange>
```

<sub>`GET /v4/spreadsheets/{spreadsheetId}/values/{range}` · `sheets.spreadsheets.values.get`</sub>

## `sheets.sheetsSpreadsheetsValuesUpdate`

Sets values in a range of a spreadsheet. The caller must specify the spreadsheet ID, range, and a valueInputOption. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesUpdate(input: {
  /** The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS. */
  majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
  /** The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended. */
  range?: string;
  /** The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string. */
  values?: ((unknown)[])[];
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** Determines if the update response should include the values of the cells that were updated. By default, responses do not include the updated values. If the range to write was larger than the range actually written, the response includes all values in the requested range (excluding trailing empty rows and columns). */
  includeValuesInResponse?: boolean;
  /** Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE. */
  responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  /** How the input data should be interpreted. */
  valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
}, options: { params: { range: string } }): Promise<UpdateValuesResponse>
```

<sub>`PUT /v4/spreadsheets/{spreadsheetId}/values/{range}` · `sheets.spreadsheets.values.update`</sub>

## `sheets.sheetsSpreadsheetsValuesAppend`

Appends values to a spreadsheet. The input range is used to search for existing data and find a "table" within that range. Values will be appended to the next row of the table, starting with the first column of the table. See the [guide](/sheets/api/guides/values#appending_values) and [sample code](/sheets/api/samples/writing#append_values) for specific details of how tables are detected and data is appended. The caller must specify the spreadsheet ID, range, and a valueInputOption. The `valueInputOption` only controls how the input data will be added to the sheet (column-wise or row-wise), it does not influence what cell the data starts being written to. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesAppend(input: {
  /** The major dimension of the values. For output, if the spreadsheet data is: `A1=1,B1=2,A2=3,B2=4`, then requesting `range=A1:B2,majorDimension=ROWS` will return `[[1,2],[3,4]]`, whereas requesting `range=A1:B2,majorDimension=COLUMNS` will return `[[1,3],[2,4]]`. For input, with `range=A1:B2,majorDimension=ROWS` then `[[1,2],[3,4]]` will set `A1=1,B1=2,A2=3,B2=4`. With `range=A1:B2,majorDimension=COLUMNS` then `[[1,2],[3,4]]` will set `A1=1,B1=3,A2=2,B2=4`. When writing, if this field is not set, it defaults to ROWS. */
  majorDimension?: "DIMENSION_UNSPECIFIED" | "ROWS" | "COLUMNS";
  /** The range the values cover, in [A1 notation](/sheets/api/guides/concepts#cell). For output, this range indicates the entire requested range, even though the values will exclude trailing rows and columns. When appending values, this field represents the range to search for a table, after which values will be appended. */
  range?: string;
  /** The data that was read or to be written. This is an array of arrays, the outer array representing all the data and each inner array representing a major dimension. Each item in the inner array corresponds with one cell. For output, empty trailing rows and columns will not be included. For input, supported value types are: bool, string, and double. Null values will be skipped. To set a cell to an empty value, set the string value to an empty string. */
  values?: ((unknown)[])[];
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
  /** Determines if the update response should include the values of the cells that were appended. By default, responses do not include the updated values. */
  includeValuesInResponse?: boolean;
  /** How the input data should be inserted. */
  insertDataOption?: "OVERWRITE" | "INSERT_ROWS";
  /** Determines how dates, times, and durations in the response should be rendered. This is ignored if response_value_render_option is FORMATTED_VALUE. The default dateTime render option is SERIAL_NUMBER. */
  responseDateTimeRenderOption?: "SERIAL_NUMBER" | "FORMATTED_STRING";
  /** Determines how values in the response should be rendered. The default render option is FORMATTED_VALUE. */
  responseValueRenderOption?: "FORMATTED_VALUE" | "UNFORMATTED_VALUE" | "FORMULA";
  /** How the input data should be interpreted. */
  valueInputOption?: "INPUT_VALUE_OPTION_UNSPECIFIED" | "RAW" | "USER_ENTERED";
}, options: { params: { range: string } }): Promise<AppendValuesResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values/{range}:append` · `sheets.spreadsheets.values.append`</sub>

## `sheets.sheetsSpreadsheetsValuesClear`

Clears values from a spreadsheet. The caller must specify the spreadsheet ID and range. Only values are cleared -- all other properties of the cell (such as formatting, data validation, etc..) are kept. — [Provider docs](https://developers.google.com/sheets/)

```ts
sheets.sheetsSpreadsheetsValuesClear(input: {
  body?: ClearValuesRequest;
  /** The ID of the spreadsheet to update. */
  spreadsheetId: string;
  /** The [A1 notation or R1C1 notation](/sheets/api/guides/concepts#cell) of the values to clear. */
  range: string;
  /** V1 error format. */
  "$.xgafv"?: "1" | "2";
  /** OAuth access token. */
  access_token?: string;
  /** Data format for response. */
  alt?: "json" | "media" | "proto";
  /** JSONP */
  callback?: string;
  /** Selector specifying which fields to include in a partial response. */
  fields?: string;
  /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
  key?: string;
  /** OAuth 2.0 token for the current user. */
  oauth_token?: string;
  /** Returns response with indentations and line breaks. */
  prettyPrint?: boolean;
  /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
  quotaUser?: string;
  /** Upload protocol for media (e.g. "raw", "multipart"). */
  upload_protocol?: string;
  /** Legacy upload protocol for media (e.g. "media", "multipart"). */
  uploadType?: string;
}): Promise<ClearValuesResponse>
```

<sub>`POST /v4/spreadsheets/{spreadsheetId}/values/{range}:clear` · `sheets.spreadsheets.values.clear`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
