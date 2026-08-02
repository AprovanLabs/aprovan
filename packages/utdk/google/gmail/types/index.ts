import type { AutoForwarding, CseIdentity, CseKeyPair, CsePrivateKeyMetadata, Delegate, DisableCseKeyPairRequest, Draft, EnableCseKeyPairRequest, Filter, FilterAction, FilterCriteria, ForwardingAddress, ImapSettings, Label, LabelColor, LanguageSettings, ListCseIdentitiesResponse, ListCseKeyPairsResponse, ListDelegatesResponse, ListDraftsResponse, ListFiltersResponse, ListForwardingAddressesResponse, ListHistoryResponse, ListLabelsResponse, ListMessagesResponse, ListSendAsResponse, ListSmimeInfoResponse, ListThreadsResponse, Message, MessagePart, MessagePartBody, ObliterateCseKeyPairRequest, PopSettings, Profile, SendAs, SmimeInfo, SmtpMsa, Thread, VacationSettings, WatchResponse } from "./schemas.js";

export type GoogleGmailClient = {
  /**
   * Lists the drafts in the user's mailbox.
   */
  gmailUsersDraftsList: (input: {
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
  }) => Promise<ListDraftsResponse>;

  /**
   * Creates a new draft with the `DRAFT` label.
   */
  gmailUsersDraftsCreate: (input: {
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
  }) => Promise<Draft>;

  /**
   * Sends the specified, existing draft to the recipients in the `To`, `Cc`, and `Bcc` headers.
   */
  gmailUsersDraftsSend: (input: {
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
  }) => Promise<Message>;

  /**
   * Immediately and permanently deletes the specified draft. Does not simply trash it.
   */
  gmailUsersDraftsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified draft.
   */
  gmailUsersDraftsGet: (input: {
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
  }) => Promise<Draft>;

  /**
   * Replaces a draft's content.
   */
  gmailUsersDraftsUpdate: (input: {
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
  }, options: { params: { id: string } }) => Promise<Draft>;

  /**
   * Lists the history of all changes to the given mailbox. History results are returned in chronological order (increasing `historyId`).
   */
  gmailUsersHistoryList: (input: {
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
  }) => Promise<ListHistoryResponse>;

  /**
   * Lists all labels in the user's mailbox.
   */
  gmailUsersLabelsList: (input: {
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
  }) => Promise<ListLabelsResponse>;

  /**
   * Creates a new label.
   */
  gmailUsersLabelsCreate: (input: {
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
  }) => Promise<Label>;

  /**
   * Immediately and permanently deletes the specified label and removes it from any messages and threads that it is applied to.
   */
  gmailUsersLabelsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified label.
   */
  gmailUsersLabelsGet: (input: {
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
  }) => Promise<Label>;

  /**
   * Patch the specified label.
   */
  gmailUsersLabelsPatch: (input: {
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
  }, options: { params: { id: string } }) => Promise<Label>;

  /**
   * Updates the specified label.
   */
  gmailUsersLabelsUpdate: (input: {
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
  }, options: { params: { id: string } }) => Promise<Label>;

  /**
   * Lists the messages in the user's mailbox.
   */
  gmailUsersMessagesList: (input: {
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
  }) => Promise<ListMessagesResponse>;

  /**
   * Directly inserts a message into only this user's mailbox similar to `IMAP APPEND`, bypassing most scanning and classification. Does not send a message.
   */
  gmailUsersMessagesInsert: (input: {
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
  }) => Promise<Message>;

  /**
   * Deletes many messages by message ID. Provides no guarantees that messages were not already deleted or even existed at all.
   */
  gmailUsersMessagesBatchDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Modifies the labels on the specified messages.
   */
  gmailUsersMessagesBatchModify: (input: {
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
  }) => Promise<unknown>;

  /**
   * Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. This method doesn't perform SPF checks, so it might not work for some spam messages, such as those attempting to perform domain spoofing. This method does not send a message. Note: This function doesn't trigger forwarding rules or filters set up by the user.
   */
  gmailUsersMessagesImport: (input: {
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
  }) => Promise<Message>;

  /**
   * Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc` headers. For example usage, see [Sending email](https://developers.google.com/gmail/api/guides/sending).
   */
  gmailUsersMessagesSend: (input: {
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
  }) => Promise<Message>;

  /**
   * Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer `messages.trash` instead.
   */
  gmailUsersMessagesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified message.
   */
  gmailUsersMessagesGet: (input: {
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
  }) => Promise<Message>;

  /**
   * Modifies the labels on the specified message.
   */
  gmailUsersMessagesModify: (input: {
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
  }) => Promise<Message>;

  /**
   * Moves the specified message to the trash.
   */
  gmailUsersMessagesTrash: (input: {
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
  }) => Promise<Message>;

  /**
   * Removes the specified message from the trash.
   */
  gmailUsersMessagesUntrash: (input: {
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
  }) => Promise<Message>;

  /**
   * Gets the specified message attachment.
   */
  gmailUsersMessagesAttachmentsGet: (input: {
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
  }) => Promise<MessagePartBody>;

  /**
   * Gets the current user's Gmail profile.
   */
  gmailUsersGetProfile: (input: {
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
  }) => Promise<Profile>;

  /**
   * Gets the auto-forwarding setting for the specified account.
   */
  gmailUsersSettingsGetAutoForwarding: (input: {
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
  }) => Promise<AutoForwarding>;

  /**
   * Updates the auto-forwarding setting for the specified account. A verified forwarding address must be specified when auto-forwarding is enabled. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsUpdateAutoForwarding: (input: {
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
  }) => Promise<AutoForwarding>;

  /**
   * Lists the client-side encrypted identities for an authenticated user.
   */
  gmailUsersSettingsCseIdentitiesList: (input: {
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
  }) => Promise<ListCseIdentitiesResponse>;

  /**
   * Creates and configures a client-side encryption identity that's authorized to send mail from the user account. Google publishes the S/MIME certificate to a shared domain-wide directory so that people within a Google Workspace organization can encrypt and send mail to the identity.
   */
  gmailUsersSettingsCseIdentitiesCreate: (input: {
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
  }) => Promise<CseIdentity>;

  /**
   * Deletes a client-side encryption identity. The authenticated user can no longer use the identity to send encrypted messages. You cannot restore the identity after you delete it. Instead, use the CreateCseIdentity method to create another identity with the same configuration.
   */
  gmailUsersSettingsCseIdentitiesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Retrieves a client-side encryption identity configuration.
   */
  gmailUsersSettingsCseIdentitiesGet: (input: {
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
  }) => Promise<CseIdentity>;

  /**
   * Associates a different key pair with an existing client-side encryption identity. The updated key pair must validate against Google's [S/MIME certificate profiles](https://support.google.com/a/answer/7300887).
   */
  gmailUsersSettingsCseIdentitiesPatch: (input: {
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
  }, options: { params: { emailAddress: string } }) => Promise<CseIdentity>;

  /**
   * Lists client-side encryption key pairs for an authenticated user.
   */
  gmailUsersSettingsCseKeypairsList: (input: {
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
  }) => Promise<ListCseKeyPairsResponse>;

  /**
   * Creates and uploads a client-side encryption S/MIME public key certificate chain and private key metadata for the authenticated user.
   */
  gmailUsersSettingsCseKeypairsCreate: (input: {
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
  }) => Promise<CseKeyPair>;

  /**
   * Retrieves an existing client-side encryption key pair.
   */
  gmailUsersSettingsCseKeypairsGet: (input: {
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
  }) => Promise<CseKeyPair>;

  /**
   * Turns off a client-side encryption key pair. The authenticated user can no longer use the key pair to decrypt incoming CSE message texts or sign outgoing CSE mail. To regain access, use the EnableCseKeyPair to turn on the key pair. After 30 days, you can permanently delete the key pair by using the ObliterateCseKeyPair method.
   */
  gmailUsersSettingsCseKeypairsDisable: (input: {
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
  }) => Promise<CseKeyPair>;

  /**
   * Turns on a client-side encryption key pair that was turned off. The key pair becomes active again for any associated client-side encryption identities.
   */
  gmailUsersSettingsCseKeypairsEnable: (input: {
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
  }) => Promise<CseKeyPair>;

  /**
   * Deletes a client-side encryption key pair permanently and immediately. You can only permanently delete key pairs that have been turned off for more than 30 days. To turn off a key pair, use the DisableCseKeyPair method. Gmail can't restore or decrypt any messages that were encrypted by an obliterated key. Authenticated users and Google Workspace administrators lose access to reading the encrypted messages.
   */
  gmailUsersSettingsCseKeypairsObliterate: (input: {
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
  }) => Promise<unknown>;

  /**
   * Lists the delegates for the specified account. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsDelegatesList: (input: {
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
  }) => Promise<ListDelegatesResponse>;

  /**
   * Adds a delegate with its verification status set directly to `accepted`, without sending any verification email. The delegate user must be a member of the same Google Workspace organization as the delegator user. Gmail imposes limitations on the number of delegates and delegators each user in a Google Workspace organization can have. These limits depend on your organization, but in general each user can have up to 25 delegates and up to 10 delegators. Note that a delegate user must be referred to by their primary email address, and not an email alias. Also note that when a new delegate is created, there may be up to a one minute delay before the new delegate is available for use. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsDelegatesCreate: (input: {
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
  }) => Promise<Delegate>;

  /**
   * Removes the specified delegate (which can be of any verification status), and revokes any verification that may have been required for using it. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsDelegatesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified delegate. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsDelegatesGet: (input: {
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
  }) => Promise<Delegate>;

  /**
   * Lists the message filters of a Gmail user.
   */
  gmailUsersSettingsFiltersList: (input: {
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
  }) => Promise<ListFiltersResponse>;

  /**
   * Creates a filter. Note: you can only create a maximum of 1,000 filters.
   */
  gmailUsersSettingsFiltersCreate: (input: {
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
  }) => Promise<Filter>;

  /**
   * Immediately and permanently deletes the specified filter.
   */
  gmailUsersSettingsFiltersDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets a filter.
   */
  gmailUsersSettingsFiltersGet: (input: {
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
  }) => Promise<Filter>;

  /**
   * Lists the forwarding addresses for the specified account.
   */
  gmailUsersSettingsForwardingAddressesList: (input: {
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
  }) => Promise<ListForwardingAddressesResponse>;

  /**
   * Creates a forwarding address. If ownership verification is required, a message will be sent to the recipient and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsForwardingAddressesCreate: (input: {
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
  }) => Promise<ForwardingAddress>;

  /**
   * Deletes the specified forwarding address and revokes any verification that may have been required. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsForwardingAddressesDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified forwarding address.
   */
  gmailUsersSettingsForwardingAddressesGet: (input: {
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
  }) => Promise<ForwardingAddress>;

  /**
   * Gets IMAP settings.
   */
  gmailUsersSettingsGetImap: (input: {
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
  }) => Promise<ImapSettings>;

  /**
   * Updates IMAP settings.
   */
  gmailUsersSettingsUpdateImap: (input: {
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
  }) => Promise<ImapSettings>;

  /**
   * Gets language settings.
   */
  gmailUsersSettingsGetLanguage: (input: {
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
  }) => Promise<LanguageSettings>;

  /**
   * Updates language settings. If successful, the return object contains the `displayLanguage` that was saved for the user, which may differ from the value passed into the request. This is because the requested `displayLanguage` may not be directly supported by Gmail but have a close variant that is, and so the variant may be chosen and saved instead.
   */
  gmailUsersSettingsUpdateLanguage: (input: {
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
  }) => Promise<LanguageSettings>;

  /**
   * Gets POP settings.
   */
  gmailUsersSettingsGetPop: (input: {
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
  }) => Promise<PopSettings>;

  /**
   * Updates POP settings.
   */
  gmailUsersSettingsUpdatePop: (input: {
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
  }) => Promise<PopSettings>;

  /**
   * Lists the send-as aliases for the specified account. The result includes the primary send-as address associated with the account as well as any custom "from" aliases.
   */
  gmailUsersSettingsSendAsList: (input: {
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
  }) => Promise<ListSendAsResponse>;

  /**
   * Creates a custom "from" send-as alias. If an SMTP MSA is specified, Gmail will attempt to connect to the SMTP service to validate the configuration before creating the alias. If ownership verification is required for the alias, a message will be sent to the email address and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsSendAsCreate: (input: {
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
  }) => Promise<SendAs>;

  /**
   * Deletes the specified send-as alias. Revokes any verification that may have been required for using it. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsSendAsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified send-as alias. Fails with an HTTP 404 error if the specified address is not a member of the collection.
   */
  gmailUsersSettingsSendAsGet: (input: {
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
  }) => Promise<SendAs>;

  /**
   * Patch the specified send-as alias.
   */
  gmailUsersSettingsSendAsPatch: (input: {
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
  }, options: { params: { sendAsEmail: string } }) => Promise<SendAs>;

  /**
   * Updates a send-as alias. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. Addresses other than the primary address for the account can only be updated by service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsSendAsUpdate: (input: {
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
  }, options: { params: { sendAsEmail: string } }) => Promise<SendAs>;

  /**
   * Lists S/MIME configs for the specified send-as alias.
   */
  gmailUsersSettingsSendAsSmimeInfoList: (input: {
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
  }) => Promise<ListSmimeInfoResponse>;

  /**
   * Insert (upload) the given S/MIME config for the specified send-as alias. Note that pkcs12 format is required for the key.
   */
  gmailUsersSettingsSendAsSmimeInfoInsert: (input: {
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
  }) => Promise<SmimeInfo>;

  /**
   * Deletes the specified S/MIME config for the specified send-as alias.
   */
  gmailUsersSettingsSendAsSmimeInfoDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified S/MIME config for the specified send-as alias.
   */
  gmailUsersSettingsSendAsSmimeInfoGet: (input: {
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
  }) => Promise<SmimeInfo>;

  /**
   * Sets the default S/MIME config for the specified send-as alias.
   */
  gmailUsersSettingsSendAsSmimeInfoSetDefault: (input: {
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
  }) => Promise<unknown>;

  /**
   * Sends a verification email to the specified send-as alias address. The verification status must be `pending`. This method is only available to service account clients that have been delegated domain-wide authority.
   */
  gmailUsersSettingsSendAsVerify: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets vacation responder settings.
   */
  gmailUsersSettingsGetVacation: (input: {
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
  }) => Promise<VacationSettings>;

  /**
   * Updates vacation responder settings.
   */
  gmailUsersSettingsUpdateVacation: (input: {
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
  }) => Promise<VacationSettings>;

  /**
   * Stop receiving push notifications for the given user mailbox.
   */
  gmailUsersStop: (input: {
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
  }) => Promise<unknown>;

  /**
   * Lists the threads in the user's mailbox.
   */
  gmailUsersThreadsList: (input: {
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
  }) => Promise<ListThreadsResponse>;

  /**
   * Immediately and permanently deletes the specified thread. Any messages that belong to the thread are also deleted. This operation cannot be undone. Prefer `threads.trash` instead.
   */
  gmailUsersThreadsDelete: (input: {
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
  }) => Promise<unknown>;

  /**
   * Gets the specified thread.
   */
  gmailUsersThreadsGet: (input: {
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
  }) => Promise<Thread>;

  /**
   * Modifies the labels applied to the thread. This applies to all messages in the thread.
   */
  gmailUsersThreadsModify: (input: {
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
  }) => Promise<Thread>;

  /**
   * Moves the specified thread to the trash. Any messages that belong to the thread are also moved to the trash.
   */
  gmailUsersThreadsTrash: (input: {
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
  }) => Promise<Thread>;

  /**
   * Removes the specified thread from the trash. Any messages that belong to the thread are also removed from the trash.
   */
  gmailUsersThreadsUntrash: (input: {
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
  }) => Promise<Thread>;

  /**
   * Set up or update a push notification watch on the given user mailbox.
   */
  gmailUsersWatch: (input: {
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
  }) => Promise<WatchResponse>;
};

export * from "./schemas.js";
