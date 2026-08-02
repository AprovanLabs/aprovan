# Users

79 operations · `utdk/google/gmail`

```ts
import gmail from "utdk/google/gmail";
```

## `gmail.gmailUsersDraftsList`

Lists the drafts in the user's mailbox. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersDraftsList(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
  /** Include drafts from `SPAM` and `TRASH` in the results. */
  includeSpamTrash?: boolean;
  /** Maximum number of drafts to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** Only return draft messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. */
  q?: string;
}): Promise<ListDraftsResponse>
```

<sub>`GET /gmail/v1/users/{userId}/drafts` · `gmail.users.drafts.list`</sub>

## `gmail.gmailUsersDraftsCreate`

Creates a new draft with the `DRAFT` label. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersDraftsCreate(input: {
  /** The immutable ID of the draft. */
  id?: string;
  /** The message content of the draft. */
  message?: Message;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Draft>
```

<sub>`POST /gmail/v1/users/{userId}/drafts` · `gmail.users.drafts.create`</sub>

## `gmail.gmailUsersDraftsDelete`

Immediately and permanently deletes the specified draft. Does not simply trash it. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersDraftsDelete(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the draft to delete. */
  id: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/drafts/{id}` · `gmail.users.drafts.delete`</sub>

## `gmail.gmailUsersDraftsGet`

Gets the specified draft. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersDraftsGet(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the draft to retrieve. */
  id: string;
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
  /** The format to return the draft in. */
  format?: "minimal" | "full" | "raw" | "metadata";
}): Promise<Draft>
```

<sub>`GET /gmail/v1/users/{userId}/drafts/{id}` · `gmail.users.drafts.get`</sub>

## `gmail.gmailUsersDraftsUpdate`

Replaces a draft's content. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersDraftsUpdate(input: {
  /** The immutable ID of the draft. */
  id?: string;
  /** The message content of the draft. */
  message?: Message;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}, options: { params: { id: string } }): Promise<Draft>
```

<sub>`PUT /gmail/v1/users/{userId}/drafts/{id}` · `gmail.users.drafts.update`</sub>

## `gmail.gmailUsersDraftsSend`

Sends the specified, existing draft to the recipients in the `To`, `Cc`, and `Bcc` headers. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersDraftsSend(input: {
  /** The immutable ID of the draft. */
  id?: string;
  /** The message content of the draft. */
  message?: Message;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/drafts/send` · `gmail.users.drafts.send`</sub>

## `gmail.gmailUsersHistoryList`

Lists the history of all changes to the given mailbox. History results are returned in chronological order (increasing `historyId`). — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersHistoryList(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
  /** History types to be returned by the function */
  historyTypes?: ("messageAdded" | "messageDeleted" | "labelAdded" | "labelRemoved")[];
  /** Only return messages with a label matching the ID. */
  labelId?: string;
  /** Maximum number of history records to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** Required. Returns history records after the specified `startHistoryId`. The supplied `startHistoryId` should be obtained from the `historyId` of a message, thread, or previous `list` response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date `startHistoryId` typically returns an `HTTP 404` error code. A `historyId` is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an `HTTP 404` error response, your application should perform a full sync. If you receive no `nextPageToken` in the response, there are no updates to retrieve and you can store the returned `historyId` for a future request. */
  startHistoryId?: string;
}): Promise<ListHistoryResponse>
```

<sub>`GET /gmail/v1/users/{userId}/history` · `gmail.users.history.list`</sub>

## `gmail.gmailUsersLabelsList`

Lists all labels in the user's mailbox. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersLabelsList(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ListLabelsResponse>
```

<sub>`GET /gmail/v1/users/{userId}/labels` · `gmail.users.labels.list`</sub>

## `gmail.gmailUsersLabelsCreate`

Creates a new label. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersLabelsCreate(input: {
  /** The color to assign to the label. Color is only available for labels that have their `type` set to `user`. */
  color?: LabelColor;
  /** The immutable ID of the label. */
  id?: string;
  /** The visibility of the label in the label list in the Gmail web interface. */
  labelListVisibility?: "labelShow" | "labelShowIfUnread" | "labelHide";
  /** The visibility of messages with this label in the message list in the Gmail web interface. */
  messageListVisibility?: "show" | "hide";
  /** The total number of messages with the label. */
  messagesTotal?: number;
  /** The number of unread messages with the label. */
  messagesUnread?: number;
  /** The display name of the label. */
  name?: string;
  /** The total number of threads with the label. */
  threadsTotal?: number;
  /** The number of unread threads with the label. */
  threadsUnread?: number;
  /** The owner type for the label. User labels are created by the user and can be modified and deleted by the user and can be applied to any message or thread. System labels are internally created and cannot be added, modified, or deleted. System labels may be able to be applied to or removed from messages and threads under some circumstances but this is not guaranteed. For example, users can apply and remove the `INBOX` and `UNREAD` labels from messages and threads, but cannot apply or remove the `DRAFTS` or `SENT` labels from messages or threads. */
  type?: "system" | "user";
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Label>
```

<sub>`POST /gmail/v1/users/{userId}/labels` · `gmail.users.labels.create`</sub>

## `gmail.gmailUsersLabelsDelete`

Immediately and permanently deletes the specified label and removes it from any messages and threads that it is applied to. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersLabelsDelete(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the label to delete. */
  id: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/labels/{id}` · `gmail.users.labels.delete`</sub>

## `gmail.gmailUsersLabelsGet`

Gets the specified label. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersLabelsGet(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the label to retrieve. */
  id: string;
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
}): Promise<Label>
```

<sub>`GET /gmail/v1/users/{userId}/labels/{id}` · `gmail.users.labels.get`</sub>

## `gmail.gmailUsersLabelsPatch`

Patch the specified label. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersLabelsPatch(input: {
  /** The color to assign to the label. Color is only available for labels that have their `type` set to `user`. */
  color?: LabelColor;
  /** The immutable ID of the label. */
  id?: string;
  /** The visibility of the label in the label list in the Gmail web interface. */
  labelListVisibility?: "labelShow" | "labelShowIfUnread" | "labelHide";
  /** The visibility of messages with this label in the message list in the Gmail web interface. */
  messageListVisibility?: "show" | "hide";
  /** The total number of messages with the label. */
  messagesTotal?: number;
  /** The number of unread messages with the label. */
  messagesUnread?: number;
  /** The display name of the label. */
  name?: string;
  /** The total number of threads with the label. */
  threadsTotal?: number;
  /** The number of unread threads with the label. */
  threadsUnread?: number;
  /** The owner type for the label. User labels are created by the user and can be modified and deleted by the user and can be applied to any message or thread. System labels are internally created and cannot be added, modified, or deleted. System labels may be able to be applied to or removed from messages and threads under some circumstances but this is not guaranteed. For example, users can apply and remove the `INBOX` and `UNREAD` labels from messages and threads, but cannot apply or remove the `DRAFTS` or `SENT` labels from messages or threads. */
  type?: "system" | "user";
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}, options: { params: { id: string } }): Promise<Label>
```

<sub>`PATCH /gmail/v1/users/{userId}/labels/{id}` · `gmail.users.labels.patch`</sub>

## `gmail.gmailUsersLabelsUpdate`

Updates the specified label. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersLabelsUpdate(input: {
  /** The color to assign to the label. Color is only available for labels that have their `type` set to `user`. */
  color?: LabelColor;
  /** The immutable ID of the label. */
  id?: string;
  /** The visibility of the label in the label list in the Gmail web interface. */
  labelListVisibility?: "labelShow" | "labelShowIfUnread" | "labelHide";
  /** The visibility of messages with this label in the message list in the Gmail web interface. */
  messageListVisibility?: "show" | "hide";
  /** The total number of messages with the label. */
  messagesTotal?: number;
  /** The number of unread messages with the label. */
  messagesUnread?: number;
  /** The display name of the label. */
  name?: string;
  /** The total number of threads with the label. */
  threadsTotal?: number;
  /** The number of unread threads with the label. */
  threadsUnread?: number;
  /** The owner type for the label. User labels are created by the user and can be modified and deleted by the user and can be applied to any message or thread. System labels are internally created and cannot be added, modified, or deleted. System labels may be able to be applied to or removed from messages and threads under some circumstances but this is not guaranteed. For example, users can apply and remove the `INBOX` and `UNREAD` labels from messages and threads, but cannot apply or remove the `DRAFTS` or `SENT` labels from messages or threads. */
  type?: "system" | "user";
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}, options: { params: { id: string } }): Promise<Label>
```

<sub>`PUT /gmail/v1/users/{userId}/labels/{id}` · `gmail.users.labels.update`</sub>

## `gmail.gmailUsersMessagesList`

Lists the messages in the user's mailbox. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesList(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
  /** Include messages from `SPAM` and `TRASH` in the results. */
  includeSpamTrash?: boolean;
  /** Only return messages with labels that match all of the specified label IDs. Messages in a thread might have labels that other messages in the same thread don't have. To learn more, see [Manage labels on messages and threads](https://developers.google.com/gmail/api/guides/labels#manage_labels_on_messages_threads). */
  labelIds?: (string)[];
  /** Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope. */
  q?: string;
}): Promise<ListMessagesResponse>
```

<sub>`GET /gmail/v1/users/{userId}/messages` · `gmail.users.messages.list`</sub>

## `gmail.gmailUsersMessagesInsert`

Directly inserts a message into only this user's mailbox similar to `IMAP APPEND`, bypassing most scanning and classification. Does not send a message. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesInsert(input: {
  /** The ID of the last history record that modified this message. */
  historyId?: string;
  /** The immutable ID of the message. */
  id?: string;
  /** The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the `Date` header. However, for API-migrated mail, it can be configured by client to be based on the `Date` header. */
  internalDate?: string;
  /** List of IDs of labels applied to this message. */
  labelIds?: (string)[];
  /** The parsed email structure in the message parts. */
  payload?: MessagePart;
  /** The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in `messages.get` and `drafts.get` responses when the `format=RAW` parameter is supplied. */
  raw?: string;
  /** Estimated size in bytes of the message. */
  sizeEstimate?: number;
  /** A short part of the message text. */
  snippet?: string;
  /** The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.  */
  threadId?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
  /** Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts. */
  deleted?: boolean;
  /** Source for Gmail's internal date of the message. */
  internalDateSource?: "receivedTime" | "dateHeader";
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/messages` · `gmail.users.messages.insert`</sub>

## `gmail.gmailUsersMessagesDelete`

Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer `messages.trash` instead. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesDelete(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to delete. */
  id: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/messages/{id}` · `gmail.users.messages.delete`</sub>

## `gmail.gmailUsersMessagesGet`

Gets the specified message. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesGet(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to retrieve. This ID is usually retrieved using `messages.list`. The ID is also contained in the result when a message is inserted (`messages.insert`) or imported (`messages.import`). */
  id: string;
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
  /** The format to return the message in. */
  format?: "minimal" | "full" | "raw" | "metadata";
  /** When given and format is `METADATA`, only include headers specified. */
  metadataHeaders?: (string)[];
}): Promise<Message>
```

<sub>`GET /gmail/v1/users/{userId}/messages/{id}` · `gmail.users.messages.get`</sub>

## `gmail.gmailUsersMessagesModify`

Modifies the labels on the specified message. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesModify(input: {
  /** A list of IDs of labels to add to this message. You can add up to 100 labels with each update. */
  addLabelIds?: (string)[];
  /** A list IDs of labels to remove from this message. You can remove up to 100 labels with each update. */
  removeLabelIds?: (string)[];
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to modify. */
  id: string;
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
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/messages/{id}/modify` · `gmail.users.messages.modify`</sub>

## `gmail.gmailUsersMessagesTrash`

Moves the specified message to the trash. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesTrash(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to Trash. */
  id: string;
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
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/messages/{id}/trash` · `gmail.users.messages.trash`</sub>

## `gmail.gmailUsersMessagesUntrash`

Removes the specified message from the trash. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesUntrash(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message to remove from Trash. */
  id: string;
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
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/messages/{id}/untrash` · `gmail.users.messages.untrash`</sub>

## `gmail.gmailUsersMessagesAttachmentsGet`

Gets the specified message attachment. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesAttachmentsGet(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the message containing the attachment. */
  messageId: string;
  /** The ID of the attachment. */
  id: string;
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
}): Promise<MessagePartBody>
```

<sub>`GET /gmail/v1/users/{userId}/messages/{messageId}/attachments/{id}` · `gmail.users.messages.attachments.get`</sub>

## `gmail.gmailUsersMessagesBatchDelete`

Deletes many messages by message ID. Provides no guarantees that messages were not already deleted or even existed at all. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesBatchDelete(input: {
  /** The IDs of the messages to delete. */
  ids?: (string)[];
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<unknown>
```

<sub>`POST /gmail/v1/users/{userId}/messages/batchDelete` · `gmail.users.messages.batchDelete`</sub>

## `gmail.gmailUsersMessagesBatchModify`

Modifies the labels on the specified messages. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesBatchModify(input: {
  /** A list of label IDs to add to messages. */
  addLabelIds?: (string)[];
  /** The IDs of the messages to modify. There is a limit of 1000 ids per request. */
  ids?: (string)[];
  /** A list of label IDs to remove from messages. */
  removeLabelIds?: (string)[];
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<unknown>
```

<sub>`POST /gmail/v1/users/{userId}/messages/batchModify` · `gmail.users.messages.batchModify`</sub>

## `gmail.gmailUsersMessagesImport`

Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. This method doesn't perform SPF checks, so it might not work for some spam messages, such as those attempting to perform domain spoofing. This method does not send a message. Note: This function doesn't trigger forwarding rules or filters set up by the user. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesImport(input: {
  /** The ID of the last history record that modified this message. */
  historyId?: string;
  /** The immutable ID of the message. */
  id?: string;
  /** The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the `Date` header. However, for API-migrated mail, it can be configured by client to be based on the `Date` header. */
  internalDate?: string;
  /** List of IDs of labels applied to this message. */
  labelIds?: (string)[];
  /** The parsed email structure in the message parts. */
  payload?: MessagePart;
  /** The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in `messages.get` and `drafts.get` responses when the `format=RAW` parameter is supplied. */
  raw?: string;
  /** Estimated size in bytes of the message. */
  sizeEstimate?: number;
  /** A short part of the message text. */
  snippet?: string;
  /** The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.  */
  threadId?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
  /** Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts. */
  deleted?: boolean;
  /** Source for Gmail's internal date of the message. */
  internalDateSource?: "receivedTime" | "dateHeader";
  /** Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox. */
  neverMarkSpam?: boolean;
  /** Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user. */
  processForCalendar?: boolean;
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/messages/import` · `gmail.users.messages.import`</sub>

## `gmail.gmailUsersMessagesSend`

Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc` headers. For example usage, see [Sending email](https://developers.google.com/gmail/api/guides/sending). — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersMessagesSend(input: {
  /** The ID of the last history record that modified this message. */
  historyId?: string;
  /** The immutable ID of the message. */
  id?: string;
  /** The internal message creation timestamp (epoch ms), which determines ordering in the inbox. For normal SMTP-received email, this represents the time the message was originally accepted by Google, which is more reliable than the `Date` header. However, for API-migrated mail, it can be configured by client to be based on the `Date` header. */
  internalDate?: string;
  /** List of IDs of labels applied to this message. */
  labelIds?: (string)[];
  /** The parsed email structure in the message parts. */
  payload?: MessagePart;
  /** The entire email message in an RFC 2822 formatted and base64url encoded string. Returned in `messages.get` and `drafts.get` responses when the `format=RAW` parameter is supplied. */
  raw?: string;
  /** Estimated size in bytes of the message. */
  sizeEstimate?: number;
  /** A short part of the message text. */
  snippet?: string;
  /** The ID of the thread the message belongs to. To add a message or draft to a thread, the following criteria must be met: 1. The requested `threadId` must be specified on the `Message` or `Draft.Message` you supply with your request. 2. The `References` and `In-Reply-To` headers must be set in compliance with the [RFC 2822](https://tools.ietf.org/html/rfc2822) standard. 3. The `Subject` headers must match.  */
  threadId?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Message>
```

<sub>`POST /gmail/v1/users/{userId}/messages/send` · `gmail.users.messages.send`</sub>

## `gmail.gmailUsersGetProfile`

Gets the current user's Gmail profile. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersGetProfile(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Profile>
```

<sub>`GET /gmail/v1/users/{userId}/profile` · `gmail.users.getProfile`</sub>

## `gmail.gmailUsersSettingsGetAutoForwarding`

Gets the auto-forwarding setting for the specified account. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsGetAutoForwarding(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<AutoForwarding>
```

<sub>`GET /gmail/v1/users/{userId}/settings/autoForwarding` · `gmail.users.settings.getAutoForwarding`</sub>

## `gmail.gmailUsersSettingsUpdateAutoForwarding`

Updates the auto-forwarding setting for the specified account. A verified forwarding address must be specified when auto-forwarding is enabled. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsUpdateAutoForwarding(input: {
  /** The state that a message should be left in after it has been forwarded. */
  disposition?: "dispositionUnspecified" | "leaveInInbox" | "archive" | "trash" | "markRead";
  /** Email address to which all incoming messages are forwarded. This email address must be a verified member of the forwarding addresses. */
  emailAddress?: string;
  /** Whether all incoming mail is automatically forwarded to another address. */
  enabled?: boolean;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<AutoForwarding>
```

<sub>`PUT /gmail/v1/users/{userId}/settings/autoForwarding` · `gmail.users.settings.updateAutoForwarding`</sub>

## `gmail.gmailUsersSettingsCseIdentitiesList`

Lists the client-side encrypted identities for an authenticated user. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseIdentitiesList(input: {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
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
  /** The number of identities to return. If not provided, the page size will default to 20 entries. */
  pageSize?: number;
  /** Pagination token indicating which page of identities to return. If the token is not supplied, then the API will return the first page of results. */
  pageToken?: string;
}): Promise<ListCseIdentitiesResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/cse/identities` · `gmail.users.settings.cse.identities.list`</sub>

## `gmail.gmailUsersSettingsCseIdentitiesCreate`

Creates and configures a client-side encryption identity that's authorized to send mail from the user account. Google publishes the S/MIME certificate to a shared domain-wide directory so that people within a Google Workspace organization can encrypt and send mail to the identity. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseIdentitiesCreate(input: {
  /** The email address for the sending identity. The email address must be the primary email address of the authenticated user. */
  emailAddress?: string;
  /** If a key pair is associated, the identifier of the key pair, CseKeyPair. */
  primaryKeyPairId?: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
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
}): Promise<CseIdentity>
```

<sub>`POST /gmail/v1/users/{userId}/settings/cse/identities` · `gmail.users.settings.cse.identities.create`</sub>

## `gmail.gmailUsersSettingsCseIdentitiesDelete`

Deletes a client-side encryption identity. The authenticated user can no longer use the identity to send encrypted messages. You cannot restore the identity after you delete it. Instead, use the CreateCseIdentity method to create another identity with the same configuration. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseIdentitiesDelete(input: {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The primary email address associated with the client-side encryption identity configuration that's removed. */
  cseEmailAddress: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}` · `gmail.users.settings.cse.identities.delete`</sub>

## `gmail.gmailUsersSettingsCseIdentitiesGet`

Retrieves a client-side encryption identity configuration. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseIdentitiesGet(input: {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The primary email address associated with the client-side encryption identity configuration that's retrieved. */
  cseEmailAddress: string;
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
}): Promise<CseIdentity>
```

<sub>`GET /gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}` · `gmail.users.settings.cse.identities.get`</sub>

## `gmail.gmailUsersSettingsCseIdentitiesPatch`

Associates a different key pair with an existing client-side encryption identity. The updated key pair must validate against Google's [S/MIME certificate profiles](https://support.google.com/a/answer/7300887). — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseIdentitiesPatch(input: {
  /** The email address for the sending identity. The email address must be the primary email address of the authenticated user. */
  emailAddress?: string;
  /** If a key pair is associated, the identifier of the key pair, CseKeyPair. */
  primaryKeyPairId?: string;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
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
}, options: { params: { emailAddress: string } }): Promise<CseIdentity>
```

<sub>`PATCH /gmail/v1/users/{userId}/settings/cse/identities/{emailAddress}` · `gmail.users.settings.cse.identities.patch`</sub>

## `gmail.gmailUsersSettingsCseKeypairsList`

Lists client-side encryption key pairs for an authenticated user. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseKeypairsList(input: {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
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
  /** The number of key pairs to return. If not provided, the page size will default to 20 entries. */
  pageSize?: number;
  /** Pagination token indicating which page of key pairs to return. If the token is not supplied, then the API will return the first page of results. */
  pageToken?: string;
}): Promise<ListCseKeyPairsResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/cse/keypairs` · `gmail.users.settings.cse.keypairs.list`</sub>

## `gmail.gmailUsersSettingsCseKeypairsCreate`

Creates and uploads a client-side encryption S/MIME public key certificate chain and private key metadata for the authenticated user. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseKeypairsCreate(input: {
  /** Output only. If a key pair is set to `DISABLED`, the time that the key pair's state changed from `ENABLED` to `DISABLED`. This field is present only when the key pair is in state `DISABLED`. */
  disableTime?: string;
  /** Output only. The current state of the key pair. */
  enablementState?: "stateUnspecified" | "enabled" | "disabled";
  /** Output only. The immutable ID for the client-side encryption S/MIME key pair. */
  keyPairId?: string;
  /** Output only. The public key and its certificate chain, in [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format. */
  pem?: string;
  /** Input only. The public key and its certificate chain. The chain must be in [PKCS#7](https://en.wikipedia.org/wiki/PKCS_7) format and use PEM encoding and ASCII armor. */
  pkcs7?: string;
  /** Metadata for instances of this key pair's private key. */
  privateKeyMetadata?: (CsePrivateKeyMetadata)[];
  /** Output only. The email address identities that are specified on the leaf certificate. */
  subjectEmailAddresses?: (string)[];
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
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
}): Promise<CseKeyPair>
```

<sub>`POST /gmail/v1/users/{userId}/settings/cse/keypairs` · `gmail.users.settings.cse.keypairs.create`</sub>

## `gmail.gmailUsersSettingsCseKeypairsGet`

Retrieves an existing client-side encryption key pair. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseKeypairsGet(input: {
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The identifier of the key pair to retrieve. */
  keyPairId: string;
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
}): Promise<CseKeyPair>
```

<sub>`GET /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}` · `gmail.users.settings.cse.keypairs.get`</sub>

## `gmail.gmailUsersSettingsCseKeypairsDisable`

Turns off a client-side encryption key pair. The authenticated user can no longer use the key pair to decrypt incoming CSE message texts or sign outgoing CSE mail. To regain access, use the EnableCseKeyPair to turn on the key pair. After 30 days, you can permanently delete the key pair by using the ObliterateCseKeyPair method. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseKeypairsDisable(input: {
  body?: DisableCseKeyPairRequest;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The identifier of the key pair to turn off. */
  keyPairId: string;
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
}): Promise<CseKeyPair>
```

<sub>`POST /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:disable` · `gmail.users.settings.cse.keypairs.disable`</sub>

## `gmail.gmailUsersSettingsCseKeypairsEnable`

Turns on a client-side encryption key pair that was turned off. The key pair becomes active again for any associated client-side encryption identities. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseKeypairsEnable(input: {
  body?: EnableCseKeyPairRequest;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The identifier of the key pair to turn on. */
  keyPairId: string;
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
}): Promise<CseKeyPair>
```

<sub>`POST /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:enable` · `gmail.users.settings.cse.keypairs.enable`</sub>

## `gmail.gmailUsersSettingsCseKeypairsObliterate`

Deletes a client-side encryption key pair permanently and immediately. You can only permanently delete key pairs that have been turned off for more than 30 days. To turn off a key pair, use the DisableCseKeyPair method. Gmail can't restore or decrypt any messages that were encrypted by an obliterated key. Authenticated users and Google Workspace administrators lose access to reading the encrypted messages. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsCseKeypairsObliterate(input: {
  body?: ObliterateCseKeyPairRequest;
  /** The requester's primary email address. To indicate the authenticated user, you can use the special value `me`. */
  userId: string;
  /** The identifier of the key pair to obliterate. */
  keyPairId: string;
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
}): Promise<unknown>
```

<sub>`POST /gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:obliterate` · `gmail.users.settings.cse.keypairs.obliterate`</sub>

## `gmail.gmailUsersSettingsDelegatesList`

Lists the delegates for the specified account. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsDelegatesList(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ListDelegatesResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/delegates` · `gmail.users.settings.delegates.list`</sub>

## `gmail.gmailUsersSettingsDelegatesCreate`

Adds a delegate with its verification status set directly to `accepted`, without sending any verification email. The delegate user must be a member of the same Google Workspace organization as the delegator user. Gmail imposes limitations on the number of delegates and delegators each user in a Google Workspace organization can have. These limits depend on your organization, but in general each user can have up to 25 delegates and up to 10 delegators. Note that a delegate user must be referred to by their primary email address, and not an email alias. Also note that when a new delegate is created, there may be up to a one minute delay before the new delegate is available for use. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsDelegatesCreate(input: {
  /** The email address of the delegate. */
  delegateEmail?: string;
  /** Indicates whether this address has been verified and can act as a delegate for the account. Read-only. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending" | "rejected" | "expired";
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Delegate>
```

<sub>`POST /gmail/v1/users/{userId}/settings/delegates` · `gmail.users.settings.delegates.create`</sub>

## `gmail.gmailUsersSettingsDelegatesDelete`

Removes the specified delegate (which can be of any verification status), and revokes any verification that may have been required for using it. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsDelegatesDelete(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The email address of the user to be removed as a delegate. */
  delegateEmail: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/settings/delegates/{delegateEmail}` · `gmail.users.settings.delegates.delete`</sub>

## `gmail.gmailUsersSettingsDelegatesGet`

Gets the specified delegate. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsDelegatesGet(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The email address of the user whose delegate relationship is to be retrieved. */
  delegateEmail: string;
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
}): Promise<Delegate>
```

<sub>`GET /gmail/v1/users/{userId}/settings/delegates/{delegateEmail}` · `gmail.users.settings.delegates.get`</sub>

## `gmail.gmailUsersSettingsFiltersList`

Lists the message filters of a Gmail user. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsFiltersList(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ListFiltersResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/filters` · `gmail.users.settings.filters.list`</sub>

## `gmail.gmailUsersSettingsFiltersCreate`

Creates a filter. Note: you can only create a maximum of 1,000 filters. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsFiltersCreate(input: {
  /** Action that the filter performs. */
  action?: FilterAction;
  /** Matching criteria for the filter. */
  criteria?: FilterCriteria;
  /** The server assigned ID of the filter. */
  id?: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<Filter>
```

<sub>`POST /gmail/v1/users/{userId}/settings/filters` · `gmail.users.settings.filters.create`</sub>

## `gmail.gmailUsersSettingsFiltersDelete`

Immediately and permanently deletes the specified filter. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsFiltersDelete(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the filter to be deleted. */
  id: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/settings/filters/{id}` · `gmail.users.settings.filters.delete`</sub>

## `gmail.gmailUsersSettingsFiltersGet`

Gets a filter. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsFiltersGet(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the filter to be fetched. */
  id: string;
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
}): Promise<Filter>
```

<sub>`GET /gmail/v1/users/{userId}/settings/filters/{id}` · `gmail.users.settings.filters.get`</sub>

## `gmail.gmailUsersSettingsForwardingAddressesList`

Lists the forwarding addresses for the specified account. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsForwardingAddressesList(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ListForwardingAddressesResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/forwardingAddresses` · `gmail.users.settings.forwardingAddresses.list`</sub>

## `gmail.gmailUsersSettingsForwardingAddressesCreate`

Creates a forwarding address. If ownership verification is required, a message will be sent to the recipient and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsForwardingAddressesCreate(input: {
  /** An email address to which messages can be forwarded. */
  forwardingEmail?: string;
  /** Indicates whether this address has been verified and is usable for forwarding. Read-only. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending";
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ForwardingAddress>
```

<sub>`POST /gmail/v1/users/{userId}/settings/forwardingAddresses` · `gmail.users.settings.forwardingAddresses.create`</sub>

## `gmail.gmailUsersSettingsForwardingAddressesDelete`

Deletes the specified forwarding address and revokes any verification that may have been required. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsForwardingAddressesDelete(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The forwarding address to be deleted. */
  forwardingEmail: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}` · `gmail.users.settings.forwardingAddresses.delete`</sub>

## `gmail.gmailUsersSettingsForwardingAddressesGet`

Gets the specified forwarding address. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsForwardingAddressesGet(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The forwarding address to be retrieved. */
  forwardingEmail: string;
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
}): Promise<ForwardingAddress>
```

<sub>`GET /gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}` · `gmail.users.settings.forwardingAddresses.get`</sub>

## `gmail.gmailUsersSettingsGetImap`

Gets IMAP settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsGetImap(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ImapSettings>
```

<sub>`GET /gmail/v1/users/{userId}/settings/imap` · `gmail.users.settings.getImap`</sub>

## `gmail.gmailUsersSettingsUpdateImap`

Updates IMAP settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsUpdateImap(input: {
  /** If this value is true, Gmail will immediately expunge a message when it is marked as deleted in IMAP. Otherwise, Gmail will wait for an update from the client before expunging messages marked as deleted. */
  autoExpunge?: boolean;
  /** Whether IMAP is enabled for the account. */
  enabled?: boolean;
  /** The action that will be executed on a message when it is marked as deleted and expunged from the last visible IMAP folder. */
  expungeBehavior?: "expungeBehaviorUnspecified" | "archive" | "trash" | "deleteForever";
  /** An optional limit on the number of messages that an IMAP folder may contain. Legal values are 0, 1000, 2000, 5000 or 10000. A value of zero is interpreted to mean that there is no limit. */
  maxFolderSize?: number;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ImapSettings>
```

<sub>`PUT /gmail/v1/users/{userId}/settings/imap` · `gmail.users.settings.updateImap`</sub>

## `gmail.gmailUsersSettingsGetLanguage`

Gets language settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsGetLanguage(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<LanguageSettings>
```

<sub>`GET /gmail/v1/users/{userId}/settings/language` · `gmail.users.settings.getLanguage`</sub>

## `gmail.gmailUsersSettingsUpdateLanguage`

Updates language settings. If successful, the return object contains the `displayLanguage` that was saved for the user, which may differ from the value passed into the request. This is because the requested `displayLanguage` may not be directly supported by Gmail but have a close variant that is, and so the variant may be chosen and saved instead. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsUpdateLanguage(input: {
  /** The language to display Gmail in, formatted as an RFC 3066 Language Tag (for example `en-GB`, `fr` or `ja` for British English, French, or Japanese respectively). The set of languages supported by Gmail evolves over time, so please refer to the "Language" dropdown in the Gmail settings for all available options, as described in the language settings help article. A table of sample values is also provided in the Managing Language Settings guide Not all Gmail clients can display the same set of languages. In the case that a user's display language is not available for use on a particular client, said client automatically chooses to display in the closest supported variant (or a reasonable default). */
  displayLanguage?: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<LanguageSettings>
```

<sub>`PUT /gmail/v1/users/{userId}/settings/language` · `gmail.users.settings.updateLanguage`</sub>

## `gmail.gmailUsersSettingsGetPop`

Gets POP settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsGetPop(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<PopSettings>
```

<sub>`GET /gmail/v1/users/{userId}/settings/pop` · `gmail.users.settings.getPop`</sub>

## `gmail.gmailUsersSettingsUpdatePop`

Updates POP settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsUpdatePop(input: {
  /** The range of messages which are accessible via POP. */
  accessWindow?: "accessWindowUnspecified" | "disabled" | "fromNowOn" | "allMail";
  /** The action that will be executed on a message after it has been fetched via POP. */
  disposition?: "dispositionUnspecified" | "leaveInInbox" | "archive" | "trash" | "markRead";
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<PopSettings>
```

<sub>`PUT /gmail/v1/users/{userId}/settings/pop` · `gmail.users.settings.updatePop`</sub>

## `gmail.gmailUsersSettingsSendAsList`

Lists the send-as aliases for the specified account. The result includes the primary send-as address associated with the account as well as any custom "from" aliases. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsList(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<ListSendAsResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/sendAs` · `gmail.users.settings.sendAs.list`</sub>

## `gmail.gmailUsersSettingsSendAsCreate`

Creates a custom "from" send-as alias. If an SMTP MSA is specified, Gmail will attempt to connect to the SMTP service to validate the configuration before creating the alias. If ownership verification is required for the alias, a message will be sent to the email address and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsCreate(input: {
  /** A name that appears in the "From:" header for mail sent using this alias. For custom "from" addresses, when this is empty, Gmail will populate the "From:" header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail. */
  displayName?: string;
  /** Whether this address is selected as the default "From:" address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is `true`. Changing this from `false` to `true` for an address will result in this field becoming `false` for the other previous default address. */
  isDefault?: boolean;
  /** Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only. */
  isPrimary?: boolean;
  /** An optional email address that is included in a "Reply-To:" header for mail sent using this alias. If this is empty, Gmail will not generate a "Reply-To:" header. */
  replyToAddress?: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. This is read-only for all operations except create. */
  sendAsEmail?: string;
  /** An optional HTML signature that is included in messages composed with this alias in the Gmail web UI. This signature is added to new emails only. */
  signature?: string;
  /** An optional SMTP service that will be used as an outbound relay for mail sent using this alias. If this is empty, outbound mail will be sent directly from Gmail's servers to the destination SMTP service. This setting only applies to custom "from" aliases. */
  smtpMsa?: SmtpMsa;
  /** Whether Gmail should treat this address as an alias for the user's primary email address. This setting only applies to custom "from" aliases. */
  treatAsAlias?: boolean;
  /** Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom "from" aliases. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending";
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<SendAs>
```

<sub>`POST /gmail/v1/users/{userId}/settings/sendAs` · `gmail.users.settings.sendAs.create`</sub>

## `gmail.gmailUsersSettingsSendAsDelete`

Deletes the specified send-as alias. Revokes any verification that may have been required for using it. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsDelete(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The send-as alias to be deleted. */
  sendAsEmail: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` · `gmail.users.settings.sendAs.delete`</sub>

## `gmail.gmailUsersSettingsSendAsGet`

Gets the specified send-as alias. Fails with an HTTP 404 error if the specified address is not a member of the collection. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsGet(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The send-as alias to be retrieved. */
  sendAsEmail: string;
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
}): Promise<SendAs>
```

<sub>`GET /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` · `gmail.users.settings.sendAs.get`</sub>

## `gmail.gmailUsersSettingsSendAsPatch`

Patch the specified send-as alias. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsPatch(input: {
  /** A name that appears in the "From:" header for mail sent using this alias. For custom "from" addresses, when this is empty, Gmail will populate the "From:" header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail. */
  displayName?: string;
  /** Whether this address is selected as the default "From:" address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is `true`. Changing this from `false` to `true` for an address will result in this field becoming `false` for the other previous default address. */
  isDefault?: boolean;
  /** Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only. */
  isPrimary?: boolean;
  /** An optional email address that is included in a "Reply-To:" header for mail sent using this alias. If this is empty, Gmail will not generate a "Reply-To:" header. */
  replyToAddress?: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. This is read-only for all operations except create. */
  sendAsEmail?: string;
  /** An optional HTML signature that is included in messages composed with this alias in the Gmail web UI. This signature is added to new emails only. */
  signature?: string;
  /** An optional SMTP service that will be used as an outbound relay for mail sent using this alias. If this is empty, outbound mail will be sent directly from Gmail's servers to the destination SMTP service. This setting only applies to custom "from" aliases. */
  smtpMsa?: SmtpMsa;
  /** Whether Gmail should treat this address as an alias for the user's primary email address. This setting only applies to custom "from" aliases. */
  treatAsAlias?: boolean;
  /** Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom "from" aliases. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending";
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}, options: { params: { sendAsEmail: string } }): Promise<SendAs>
```

<sub>`PATCH /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` · `gmail.users.settings.sendAs.patch`</sub>

## `gmail.gmailUsersSettingsSendAsUpdate`

Updates a send-as alias. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. Addresses other than the primary address for the account can only be updated by service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsUpdate(input: {
  /** A name that appears in the "From:" header for mail sent using this alias. For custom "from" addresses, when this is empty, Gmail will populate the "From:" header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail. */
  displayName?: string;
  /** Whether this address is selected as the default "From:" address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is `true`. Changing this from `false` to `true` for an address will result in this field becoming `false` for the other previous default address. */
  isDefault?: boolean;
  /** Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only. */
  isPrimary?: boolean;
  /** An optional email address that is included in a "Reply-To:" header for mail sent using this alias. If this is empty, Gmail will not generate a "Reply-To:" header. */
  replyToAddress?: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. This is read-only for all operations except create. */
  sendAsEmail?: string;
  /** An optional HTML signature that is included in messages composed with this alias in the Gmail web UI. This signature is added to new emails only. */
  signature?: string;
  /** An optional SMTP service that will be used as an outbound relay for mail sent using this alias. If this is empty, outbound mail will be sent directly from Gmail's servers to the destination SMTP service. This setting only applies to custom "from" aliases. */
  smtpMsa?: SmtpMsa;
  /** Whether Gmail should treat this address as an alias for the user's primary email address. This setting only applies to custom "from" aliases. */
  treatAsAlias?: boolean;
  /** Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom "from" aliases. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending";
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}, options: { params: { sendAsEmail: string } }): Promise<SendAs>
```

<sub>`PUT /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}` · `gmail.users.settings.sendAs.update`</sub>

## `gmail.gmailUsersSettingsSendAsSmimeInfoList`

Lists S/MIME configs for the specified send-as alias. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsSmimeInfoList(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
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
}): Promise<ListSmimeInfoResponse>
```

<sub>`GET /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo` · `gmail.users.settings.sendAs.smimeInfo.list`</sub>

## `gmail.gmailUsersSettingsSendAsSmimeInfoInsert`

Insert (upload) the given S/MIME config for the specified send-as alias. Note that pkcs12 format is required for the key. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsSmimeInfoInsert(input: {
  /** Encrypted key password, when key is encrypted. */
  encryptedKeyPassword?: string;
  /** When the certificate expires (in milliseconds since epoch). */
  expiration?: string;
  /** The immutable ID for the SmimeInfo. */
  id?: string;
  /** Whether this SmimeInfo is the default one for this user's send-as address. */
  isDefault?: boolean;
  /** The S/MIME certificate issuer's common name. */
  issuerCn?: string;
  /** PEM formatted X509 concatenated certificate string (standard base64 encoding). Format used for returning key, which includes public key as well as certificate chain (not private key). */
  pem?: string;
  /** PKCS#12 format containing a single private/public key pair and certificate chain. This format is only accepted from client for creating a new SmimeInfo and is never returned, because the private key is not intended to be exported. PKCS#12 may be encrypted, in which case encryptedKeyPassword should be set appropriately. */
  pkcs12?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
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
}): Promise<SmimeInfo>
```

<sub>`POST /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo` · `gmail.users.settings.sendAs.smimeInfo.insert`</sub>

## `gmail.gmailUsersSettingsSendAsSmimeInfoDelete`

Deletes the specified S/MIME config for the specified send-as alias. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsSmimeInfoDelete(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
  /** The immutable ID for the SmimeInfo. */
  id: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}` · `gmail.users.settings.sendAs.smimeInfo.delete`</sub>

## `gmail.gmailUsersSettingsSendAsSmimeInfoGet`

Gets the specified S/MIME config for the specified send-as alias. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsSmimeInfoGet(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
  /** The immutable ID for the SmimeInfo. */
  id: string;
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
}): Promise<SmimeInfo>
```

<sub>`GET /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}` · `gmail.users.settings.sendAs.smimeInfo.get`</sub>

## `gmail.gmailUsersSettingsSendAsSmimeInfoSetDefault`

Sets the default S/MIME config for the specified send-as alias. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsSmimeInfoSetDefault(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The email address that appears in the "From:" header for mail sent using this alias. */
  sendAsEmail: string;
  /** The immutable ID for the SmimeInfo. */
  id: string;
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
}): Promise<unknown>
```

<sub>`POST /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}/setDefault` · `gmail.users.settings.sendAs.smimeInfo.setDefault`</sub>

## `gmail.gmailUsersSettingsSendAsVerify`

Sends a verification email to the specified send-as alias address. The verification status must be `pending`. This method is only available to service account clients that have been delegated domain-wide authority. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsSendAsVerify(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
  /** The send-as alias to be verified. */
  sendAsEmail: string;
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
}): Promise<unknown>
```

<sub>`POST /gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/verify` · `gmail.users.settings.sendAs.verify`</sub>

## `gmail.gmailUsersSettingsGetVacation`

Gets vacation responder settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsGetVacation(input: {
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<VacationSettings>
```

<sub>`GET /gmail/v1/users/{userId}/settings/vacation` · `gmail.users.settings.getVacation`</sub>

## `gmail.gmailUsersSettingsUpdateVacation`

Updates vacation responder settings. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersSettingsUpdateVacation(input: {
  /** Flag that controls whether Gmail automatically replies to messages. */
  enableAutoReply?: boolean;
  /** An optional end time for sending auto-replies (epoch ms). When this is specified, Gmail will automatically reply only to messages that it receives before the end time. If both `startTime` and `endTime` are specified, `startTime` must precede `endTime`. */
  endTime?: string;
  /** Response body in HTML format. Gmail will sanitize the HTML before storing it. If both `response_body_plain_text` and `response_body_html` are specified, `response_body_html` will be used. */
  responseBodyHtml?: string;
  /** Response body in plain text format. If both `response_body_plain_text` and `response_body_html` are specified, `response_body_html` will be used. */
  responseBodyPlainText?: string;
  /** Optional text to prepend to the subject line in vacation responses. In order to enable auto-replies, either the response subject or the response body must be nonempty. */
  responseSubject?: string;
  /** Flag that determines whether responses are sent to recipients who are not in the user's list of contacts. */
  restrictToContacts?: boolean;
  /** Flag that determines whether responses are sent to recipients who are outside of the user's domain. This feature is only available for Google Workspace users. */
  restrictToDomain?: boolean;
  /** An optional start time for sending auto-replies (epoch ms). When this is specified, Gmail will automatically reply only to messages that it receives after the start time. If both `startTime` and `endTime` are specified, `startTime` must precede `endTime`. */
  startTime?: string;
  /** User's email address. The special value "me" can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<VacationSettings>
```

<sub>`PUT /gmail/v1/users/{userId}/settings/vacation` · `gmail.users.settings.updateVacation`</sub>

## `gmail.gmailUsersStop`

Stop receiving push notifications for the given user mailbox. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersStop(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<unknown>
```

<sub>`POST /gmail/v1/users/{userId}/stop` · `gmail.users.stop`</sub>

## `gmail.gmailUsersThreadsList`

Lists the threads in the user's mailbox. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersThreadsList(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
  /** Include threads from `SPAM` and `TRASH` in the results. */
  includeSpamTrash?: boolean;
  /** Only return threads with labels that match all of the specified label IDs. */
  labelIds?: (string)[];
  /** Maximum number of threads to return. This field defaults to 100. The maximum allowed value for this field is 500. */
  maxResults?: number;
  /** Page token to retrieve a specific page of results in the list. */
  pageToken?: string;
  /** Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. Parameter cannot be used when accessing the api using the gmail.metadata scope. */
  q?: string;
}): Promise<ListThreadsResponse>
```

<sub>`GET /gmail/v1/users/{userId}/threads` · `gmail.users.threads.list`</sub>

## `gmail.gmailUsersThreadsDelete`

Immediately and permanently deletes the specified thread. Any messages that belong to the thread are also deleted. This operation cannot be undone. Prefer `threads.trash` instead. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersThreadsDelete(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** ID of the Thread to delete. */
  id: string;
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
}): Promise<unknown>
```

<sub>`DELETE /gmail/v1/users/{userId}/threads/{id}` · `gmail.users.threads.delete`</sub>

## `gmail.gmailUsersThreadsGet`

Gets the specified thread. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersThreadsGet(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the thread to retrieve. */
  id: string;
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
  /** The format to return the messages in. */
  format?: "full" | "metadata" | "minimal";
  /** When given and format is METADATA, only include headers specified. */
  metadataHeaders?: (string)[];
}): Promise<Thread>
```

<sub>`GET /gmail/v1/users/{userId}/threads/{id}` · `gmail.users.threads.get`</sub>

## `gmail.gmailUsersThreadsModify`

Modifies the labels applied to the thread. This applies to all messages in the thread. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersThreadsModify(input: {
  /** A list of IDs of labels to add to this thread. You can add up to 100 labels with each update. */
  addLabelIds?: (string)[];
  /** A list of IDs of labels to remove from this thread. You can remove up to 100 labels with each update. */
  removeLabelIds?: (string)[];
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the thread to modify. */
  id: string;
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
}): Promise<Thread>
```

<sub>`POST /gmail/v1/users/{userId}/threads/{id}/modify` · `gmail.users.threads.modify`</sub>

## `gmail.gmailUsersThreadsTrash`

Moves the specified thread to the trash. Any messages that belong to the thread are also moved to the trash. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersThreadsTrash(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the thread to Trash. */
  id: string;
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
}): Promise<Thread>
```

<sub>`POST /gmail/v1/users/{userId}/threads/{id}/trash` · `gmail.users.threads.trash`</sub>

## `gmail.gmailUsersThreadsUntrash`

Removes the specified thread from the trash. Any messages that belong to the thread are also removed from the trash. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersThreadsUntrash(input: {
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
  /** The ID of the thread to remove from Trash. */
  id: string;
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
}): Promise<Thread>
```

<sub>`POST /gmail/v1/users/{userId}/threads/{id}/untrash` · `gmail.users.threads.untrash`</sub>

## `gmail.gmailUsersWatch`

Set up or update a push notification watch on the given user mailbox. — [Provider docs](https://developers.google.com/gmail/api/)

```ts
gmail.gmailUsersWatch(input: {
  /** Filtering behavior of labelIds list specified. */
  labelFilterAction?: "include" | "exclude";
  /** List of label_ids to restrict notifications about. By default, if unspecified, all changes are pushed out. If specified then dictates which labels are required for a push notification to be generated. */
  labelIds?: (string)[];
  /** A fully qualified Google Cloud Pub/Sub API topic name to publish the events to. This topic name **must** already exist in Cloud Pub/Sub and you **must** have already granted gmail "publish" permission on it. For example, "projects/my-project-identifier/topics/my-topic-name" (using the Cloud Pub/Sub "v1" topic naming format). Note that the "my-project-identifier" portion must exactly match your Google developer project id (the one executing this watch request). */
  topicName?: string;
  /** The user's email address. The special value `me` can be used to indicate the authenticated user. */
  userId: string;
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
}): Promise<WatchResponse>
```

<sub>`POST /gmail/v1/users/{userId}/watch` · `gmail.users.watch`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
