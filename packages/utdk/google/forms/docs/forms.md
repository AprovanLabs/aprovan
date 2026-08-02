# Forms

9 operations · `utdk/google/forms`

```ts
import forms from "utdk/google/forms";
```

## `forms.formsFormsCreate`

Create a new form using the title given in the provided form message in the request. *Important:* Only the form.info.title and form.info.document_title fields are copied to the new form. All other fields including the form description, items and settings are disallowed. To create a new form and add items, you must first call forms.create to create an empty form with a title and (optional) document title, and then call forms.update to add the items. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsCreate(input: {
  /** Output only. The form ID. */
  formId?: string;
  /** Required. The title and description of the form. */
  info?: Info;
  /** Required. A list of the form's items, which can include section headers, questions, embedded media, etc. */
  items?: (Item)[];
  /** Output only. The ID of the linked Google Sheet which is accumulating responses from this Form (if such a Sheet exists). */
  linkedSheetId?: string;
  /** Output only. The form URI to share with responders. This opens a page that allows the user to submit responses but not edit the questions. */
  responderUri?: string;
  /** Output only. The revision ID of the form. Used in the WriteControl in update requests to identify the revision on which the changes are based. The format of the revision ID may change over time, so it should be treated opaquely. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the form has not changed. Conversely, a changed ID (for the same form and user) usually means the form has been updated; however, a changed ID can also be due to internal factors such as ID format changes. */
  revisionId?: string;
  /** The form's settings. This must be updated with UpdateSettingsRequest; it is ignored during `forms.create` and UpdateFormInfoRequest. */
  settings?: FormSettings;
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
}): Promise<Form>
```

<sub>`POST /v1/forms` · `forms.forms.create`</sub>

## `forms.formsFormsGet`

Get a form. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsGet(input: {
  /** Required. The form ID. */
  formId: string;
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
}): Promise<Form>
```

<sub>`GET /v1/forms/{formId}` · `forms.forms.get`</sub>

## `forms.formsFormsBatchUpdate`

Change the form with a batch of updates. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsBatchUpdate(input: {
  /** Whether to return an updated version of the model in the response. */
  includeFormInResponse?: boolean;
  /** Required. The update requests of this batch. */
  requests?: (Request)[];
  /** Provides control over how write requests are executed. */
  writeControl?: WriteControl;
  /** Required. The form ID. */
  formId: string;
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
}): Promise<BatchUpdateFormResponse>
```

<sub>`POST /v1/forms/{formId}:batchUpdate` · `forms.forms.batchUpdate`</sub>

## `forms.formsFormsResponsesList`

List a form's responses. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsResponsesList(input: {
  /** Required. ID of the Form whose responses to list. */
  formId: string;
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
  /** Which form responses to return. Currently, the only supported filters are: * timestamp > *N* which means to get all form responses submitted after (but not at) timestamp *N*. * timestamp >= *N* which means to get all form responses submitted at and after timestamp *N*. For both supported filters, timestamp must be formatted in RFC3339 UTC "Zulu" format. Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z". */
  filter?: string;
  /** The maximum number of responses to return. The service may return fewer than this value. If unspecified or zero, at most 5000 responses are returned. */
  pageSize?: number;
  /** A page token returned by a previous list response. If this field is set, the form and the values of the filter must be the same as for the original request. */
  pageToken?: string;
}): Promise<ListFormResponsesResponse>
```

<sub>`GET /v1/forms/{formId}/responses` · `forms.forms.responses.list`</sub>

## `forms.formsFormsResponsesGet`

Get one response from the form. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsResponsesGet(input: {
  /** Required. The form ID. */
  formId: string;
  /** Required. The response ID within the form. */
  responseId: string;
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
}): Promise<FormResponse>
```

<sub>`GET /v1/forms/{formId}/responses/{responseId}` · `forms.forms.responses.get`</sub>

## `forms.formsFormsWatchesList`

Return a list of the watches owned by the invoking project. The maximum number of watches is two: For each invoker, the limit is one for each event type per form. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsWatchesList(input: {
  /** Required. ID of the Form whose watches to list. */
  formId: string;
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
}): Promise<ListWatchesResponse>
```

<sub>`GET /v1/forms/{formId}/watches` · `forms.forms.watches.list`</sub>

## `forms.formsFormsWatchesCreate`

Create a new watch. If a watch ID is provided, it must be unused. For each invoking project, the per form limit is one watch per Watch.EventType. A watch expires seven days after it is created (see Watch.expire_time). — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsWatchesCreate(input: {
  /** Required. The watch object. No ID should be set on this object; use `watch_id` instead. */
  watch?: Watch;
  /** The ID to use for the watch. If specified, the ID must not already be in use. If not specified, an ID is generated. This value should be 4-63 characters, and valid characters are /a-z-/. */
  watchId?: string;
  /** Required. ID of the Form to watch. */
  formId: string;
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
}): Promise<Watch>
```

<sub>`POST /v1/forms/{formId}/watches` · `forms.forms.watches.create`</sub>

## `forms.formsFormsWatchesDelete`

Delete a watch. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsWatchesDelete(input: {
  /** Required. The ID of the Form. */
  formId: string;
  /** Required. The ID of the Watch to delete. */
  watchId: string;
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
}): Promise<Empty>
```

<sub>`DELETE /v1/forms/{formId}/watches/{watchId}` · `forms.forms.watches.delete`</sub>

## `forms.formsFormsWatchesRenew`

Renew an existing watch for seven days. The state of the watch after renewal is `ACTIVE`, and the `expire_time` is seven days from the renewal. Renewing a watch in an error state (e.g. `SUSPENDED`) succeeds if the error is no longer present, but fail otherwise. After a watch has expired, RenewWatch returns `NOT_FOUND`. — [Provider docs](https://developers.google.com/forms/api)

```ts
forms.formsFormsWatchesRenew(input: {
  body?: RenewWatchRequest;
  /** Required. The ID of the Form. */
  formId: string;
  /** Required. The ID of the Watch to renew. */
  watchId: string;
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
}): Promise<Watch>
```

<sub>`POST /v1/forms/{formId}/watches/{watchId}:renew` · `forms.forms.watches.renew`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
