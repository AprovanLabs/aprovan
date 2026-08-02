import type { ToolRuntimeMetadataMap } from "../../client.js";

export const toolMetadata = {
  "gmail.users.drafts.list": {
    "accessPath": [
      "gmailUsersDraftsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "includeSpamTrash",
      "maxResults",
      "pageToken",
      "q"
    ],
    "description": "Lists the drafts in the user's mailbox.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "includeSpamTrash": "Include drafts from `SPAM` and `TRASH` in the results.",
      "maxResults": "Maximum number of drafts to return. This field defaults to 100. The maximum allowed value for this field is 500.",
      "pageToken": "Page token to retrieve a specific page of results in the list.",
      "q": "Only return draft messages matching the specified query. Supports the same query format as the Gmail search box. For example, `\"from:someuser@example.com rfc822msgid: is:unread\"`."
    }
  },
  "gmail.users.drafts.create": {
    "accessPath": [
      "gmailUsersDraftsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "message"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates a new draft with the `DRAFT` label.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.drafts.send": {
    "accessPath": [
      "gmailUsersDraftsSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "message"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/drafts/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Sends the specified, existing draft to the recipients in the `To`, `Cc`, and `Bcc` headers.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.drafts.delete": {
    "accessPath": [
      "gmailUsersDraftsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/drafts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Immediately and permanently deletes the specified draft. Does not simply trash it.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the draft to delete."
    }
  },
  "gmail.users.drafts.get": {
    "accessPath": [
      "gmailUsersDraftsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/drafts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
      "format"
    ],
    "description": "Gets the specified draft.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the draft to retrieve.",
      "format": "The format to return the draft in."
    }
  },
  "gmail.users.drafts.update": {
    "accessPath": [
      "gmailUsersDraftsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "message"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/drafts/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Replaces a draft's content.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the draft to update."
    }
  },
  "gmail.users.history.list": {
    "accessPath": [
      "gmailUsersHistoryList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/history",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "historyTypes",
      "labelId",
      "maxResults",
      "pageToken",
      "startHistoryId"
    ],
    "description": "Lists the history of all changes to the given mailbox. History results are returned in chronological order (increasing `historyId`).",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "historyTypes": "History types to be returned by the function",
      "labelId": "Only return messages with a label matching the ID.",
      "maxResults": "Maximum number of history records to return. This field defaults to 100. The maximum allowed value for this field is 500.",
      "pageToken": "Page token to retrieve a specific page of results in the list.",
      "startHistoryId": "Required. Returns history records after the specified `startHistoryId`. The supplied `startHistoryId` should be obtained from the `historyId` of a message, thread, or previous `list` response. History IDs increase chronologically but are not contiguous with random gaps in between valid IDs. Supplying an invalid or out of date `startHistoryId` typically returns an `HTTP 404` error code. A `historyId` is typically valid for at least a week, but in some rare circumstances may be valid for only a few hours. If you receive an `HTTP 404` error response, your application should perform a full sync. If you receive no `nextPageToken` in the response, there are no updates to retrieve and you can store the returned `historyId` for a future request."
    }
  },
  "gmail.users.labels.list": {
    "accessPath": [
      "gmailUsersLabelsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/labels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Lists all labels in the user's mailbox.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.labels.create": {
    "accessPath": [
      "gmailUsersLabelsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "color",
      "id",
      "labelListVisibility",
      "messageListVisibility",
      "messagesTotal",
      "messagesUnread",
      "name",
      "threadsTotal",
      "threadsUnread",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/labels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates a new label.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.labels.delete": {
    "accessPath": [
      "gmailUsersLabelsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/labels/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Immediately and permanently deletes the specified label and removes it from any messages and threads that it is applied to.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the label to delete."
    }
  },
  "gmail.users.labels.get": {
    "accessPath": [
      "gmailUsersLabelsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/labels/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Gets the specified label.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the label to retrieve."
    }
  },
  "gmail.users.labels.patch": {
    "accessPath": [
      "gmailUsersLabelsPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "color",
      "id",
      "labelListVisibility",
      "messageListVisibility",
      "messagesTotal",
      "messagesUnread",
      "name",
      "threadsTotal",
      "threadsUnread",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/gmail/v1/users/{userId}/labels/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Patch the specified label.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the label to update."
    }
  },
  "gmail.users.labels.update": {
    "accessPath": [
      "gmailUsersLabelsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "color",
      "id",
      "labelListVisibility",
      "messageListVisibility",
      "messagesTotal",
      "messagesUnread",
      "name",
      "threadsTotal",
      "threadsUnread",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/labels/{id}",
    "pathConflictKeys": [
      "id"
    ],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Updates the specified label.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the label to update."
    }
  },
  "gmail.users.messages.list": {
    "accessPath": [
      "gmailUsersMessagesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "includeSpamTrash",
      "labelIds",
      "maxResults",
      "pageToken",
      "q"
    ],
    "description": "Lists the messages in the user's mailbox.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "includeSpamTrash": "Include messages from `SPAM` and `TRASH` in the results.",
      "labelIds": "Only return messages with labels that match all of the specified label IDs. Messages in a thread might have labels that other messages in the same thread don't have. To learn more, see [Manage labels on messages and threads](https://developers.google.com/gmail/api/guides/labels#manage_labels_on_messages_threads).",
      "maxResults": "Maximum number of messages to return. This field defaults to 100. The maximum allowed value for this field is 500.",
      "pageToken": "Page token to retrieve a specific page of results in the list.",
      "q": "Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `\"from:someuser@example.com rfc822msgid: is:unread\"`. Parameter cannot be used when accessing the api using the gmail.metadata scope."
    }
  },
  "gmail.users.messages.insert": {
    "accessPath": [
      "gmailUsersMessagesInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "historyId",
      "id",
      "internalDate",
      "labelIds",
      "payload",
      "raw",
      "sizeEstimate",
      "snippet",
      "threadId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "deleted",
      "internalDateSource"
    ],
    "description": "Directly inserts a message into only this user's mailbox similar to `IMAP APPEND`, bypassing most scanning and classification. Does not send a message.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "deleted": "Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts.",
      "internalDateSource": "Source for Gmail's internal date of the message."
    }
  },
  "gmail.users.messages.batchDelete": {
    "accessPath": [
      "gmailUsersMessagesBatchDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/batchDelete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Deletes many messages by message ID. Provides no guarantees that messages were not already deleted or even existed at all.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.messages.batchModify": {
    "accessPath": [
      "gmailUsersMessagesBatchModify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "addLabelIds",
      "ids",
      "removeLabelIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/batchModify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Modifies the labels on the specified messages.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.messages.import": {
    "accessPath": [
      "gmailUsersMessagesImport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "historyId",
      "id",
      "internalDate",
      "labelIds",
      "payload",
      "raw",
      "sizeEstimate",
      "snippet",
      "threadId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/import",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "deleted",
      "internalDateSource",
      "neverMarkSpam",
      "processForCalendar"
    ],
    "description": "Imports a message into only this user's mailbox, with standard email delivery scanning and classification similar to receiving via SMTP. This method doesn't perform SPF checks, so it might not work for some spam messages, such as those attempting to perform domain spoofing. This method does not send a message. Note: This function doesn't trigger forwarding rules or filters set up by the user.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "deleted": "Mark the email as permanently deleted (not TRASH) and only visible in Google Vault to a Vault administrator. Only used for Google Workspace accounts.",
      "internalDateSource": "Source for Gmail's internal date of the message.",
      "neverMarkSpam": "Ignore the Gmail spam classifier decision and never mark this email as SPAM in the mailbox.",
      "processForCalendar": "Process calendar invites in the email and add any extracted meetings to the Google Calendar for this user."
    }
  },
  "gmail.users.messages.send": {
    "accessPath": [
      "gmailUsersMessagesSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "historyId",
      "id",
      "internalDate",
      "labelIds",
      "payload",
      "raw",
      "sizeEstimate",
      "snippet",
      "threadId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Sends the specified message to the recipients in the `To`, `Cc`, and `Bcc` headers. For example usage, see [Sending email](https://developers.google.com/gmail/api/guides/sending).",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.messages.delete": {
    "accessPath": [
      "gmailUsersMessagesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Immediately and permanently deletes the specified message. This operation cannot be undone. Prefer `messages.trash` instead.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the message to delete."
    }
  },
  "gmail.users.messages.get": {
    "accessPath": [
      "gmailUsersMessagesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
      "format",
      "metadataHeaders"
    ],
    "description": "Gets the specified message.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the message to retrieve. This ID is usually retrieved using `messages.list`. The ID is also contained in the result when a message is inserted (`messages.insert`) or imported (`messages.import`).",
      "format": "The format to return the message in.",
      "metadataHeaders": "When given and format is `METADATA`, only include headers specified."
    }
  },
  "gmail.users.messages.modify": {
    "accessPath": [
      "gmailUsersMessagesModify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "addLabelIds",
      "removeLabelIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/{id}/modify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Modifies the labels on the specified message.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the message to modify."
    }
  },
  "gmail.users.messages.trash": {
    "accessPath": [
      "gmailUsersMessagesTrash"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/{id}/trash",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Moves the specified message to the trash.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the message to Trash."
    }
  },
  "gmail.users.messages.untrash": {
    "accessPath": [
      "gmailUsersMessagesUntrash"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/{id}/untrash",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Removes the specified message from the trash.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the message to remove from Trash."
    }
  },
  "gmail.users.messages.attachments.get": {
    "accessPath": [
      "gmailUsersMessagesAttachmentsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/messages/{messageId}/attachments/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "messageId",
      "id"
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
    "description": "Gets the specified message attachment.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "messageId": "The ID of the message containing the attachment.",
      "id": "The ID of the attachment."
    }
  },
  "gmail.users.getProfile": {
    "accessPath": [
      "gmailUsersGetProfile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/profile",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Gets the current user's Gmail profile.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.getAutoForwarding": {
    "accessPath": [
      "gmailUsersSettingsGetAutoForwarding"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/autoForwarding",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Gets the auto-forwarding setting for the specified account.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.updateAutoForwarding": {
    "accessPath": [
      "gmailUsersSettingsUpdateAutoForwarding"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "disposition",
      "emailAddress",
      "enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/autoForwarding",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Updates the auto-forwarding setting for the specified account. A verified forwarding address must be specified when auto-forwarding is enabled. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.cse.identities.list": {
    "accessPath": [
      "gmailUsersSettingsCseIdentitiesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/identities",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "pageSize",
      "pageToken"
    ],
    "description": "Lists the client-side encrypted identities for an authenticated user.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "pageSize": "The number of identities to return. If not provided, the page size will default to 20 entries.",
      "pageToken": "Pagination token indicating which page of identities to return. If the token is not supplied, then the API will return the first page of results."
    }
  },
  "gmail.users.settings.cse.identities.create": {
    "accessPath": [
      "gmailUsersSettingsCseIdentitiesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "emailAddress",
      "primaryKeyPairId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/identities",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates and configures a client-side encryption identity that's authorized to send mail from the user account. Google publishes the S/MIME certificate to a shared domain-wide directory so that people within a Google Workspace organization can encrypt and send mail to the identity.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`."
    }
  },
  "gmail.users.settings.cse.identities.delete": {
    "accessPath": [
      "gmailUsersSettingsCseIdentitiesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "cseEmailAddress"
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
    "description": "Deletes a client-side encryption identity. The authenticated user can no longer use the identity to send encrypted messages. You cannot restore the identity after you delete it. Instead, use the CreateCseIdentity method to create another identity with the same configuration.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "cseEmailAddress": "The primary email address associated with the client-side encryption identity configuration that's removed."
    }
  },
  "gmail.users.settings.cse.identities.get": {
    "accessPath": [
      "gmailUsersSettingsCseIdentitiesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "cseEmailAddress"
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
    "description": "Retrieves a client-side encryption identity configuration.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "cseEmailAddress": "The primary email address associated with the client-side encryption identity configuration that's retrieved."
    }
  },
  "gmail.users.settings.cse.identities.patch": {
    "accessPath": [
      "gmailUsersSettingsCseIdentitiesPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "emailAddress",
      "primaryKeyPairId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/identities/{emailAddress}",
    "pathConflictKeys": [
      "emailAddress"
    ],
    "pathParameterKeys": [
      "userId",
      "emailAddress"
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
    "description": "Associates a different key pair with an existing client-side encryption identity. The updated key pair must validate against Google's [S/MIME certificate profiles](https://support.google.com/a/answer/7300887).",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "emailAddress": "The email address of the client-side encryption identity to update."
    }
  },
  "gmail.users.settings.cse.keypairs.list": {
    "accessPath": [
      "gmailUsersSettingsCseKeypairsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/keypairs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "pageSize",
      "pageToken"
    ],
    "description": "Lists client-side encryption key pairs for an authenticated user.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "pageSize": "The number of key pairs to return. If not provided, the page size will default to 20 entries.",
      "pageToken": "Pagination token indicating which page of key pairs to return. If the token is not supplied, then the API will return the first page of results."
    }
  },
  "gmail.users.settings.cse.keypairs.create": {
    "accessPath": [
      "gmailUsersSettingsCseKeypairsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "disableTime",
      "enablementState",
      "keyPairId",
      "pem",
      "pkcs7",
      "privateKeyMetadata",
      "subjectEmailAddresses"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/keypairs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates and uploads a client-side encryption S/MIME public key certificate chain and private key metadata for the authenticated user.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`."
    }
  },
  "gmail.users.settings.cse.keypairs.get": {
    "accessPath": [
      "gmailUsersSettingsCseKeypairsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "keyPairId"
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
    "description": "Retrieves an existing client-side encryption key pair.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "keyPairId": "The identifier of the key pair to retrieve."
    }
  },
  "gmail.users.settings.cse.keypairs.disable": {
    "accessPath": [
      "gmailUsersSettingsCseKeypairsDisable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:disable",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "keyPairId"
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
    "description": "Turns off a client-side encryption key pair. The authenticated user can no longer use the key pair to decrypt incoming CSE message texts or sign outgoing CSE mail. To regain access, use the EnableCseKeyPair to turn on the key pair. After 30 days, you can permanently delete the key pair by using the ObliterateCseKeyPair method.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "keyPairId": "The identifier of the key pair to turn off."
    }
  },
  "gmail.users.settings.cse.keypairs.enable": {
    "accessPath": [
      "gmailUsersSettingsCseKeypairsEnable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:enable",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "keyPairId"
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
    "description": "Turns on a client-side encryption key pair that was turned off. The key pair becomes active again for any associated client-side encryption identities.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "keyPairId": "The identifier of the key pair to turn on."
    }
  },
  "gmail.users.settings.cse.keypairs.obliterate": {
    "accessPath": [
      "gmailUsersSettingsCseKeypairsObliterate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:obliterate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "keyPairId"
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
    "description": "Deletes a client-side encryption key pair permanently and immediately. You can only permanently delete key pairs that have been turned off for more than 30 days. To turn off a key pair, use the DisableCseKeyPair method. Gmail can't restore or decrypt any messages that were encrypted by an obliterated key. Authenticated users and Google Workspace administrators lose access to reading the encrypted messages.",
    "parameterDescriptions": {
      "userId": "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
      "keyPairId": "The identifier of the key pair to obliterate."
    }
  },
  "gmail.users.settings.delegates.list": {
    "accessPath": [
      "gmailUsersSettingsDelegatesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/delegates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Lists the delegates for the specified account. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.delegates.create": {
    "accessPath": [
      "gmailUsersSettingsDelegatesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delegateEmail",
      "verificationStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/delegates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Adds a delegate with its verification status set directly to `accepted`, without sending any verification email. The delegate user must be a member of the same Google Workspace organization as the delegator user. Gmail imposes limitations on the number of delegates and delegators each user in a Google Workspace organization can have. These limits depend on your organization, but in general each user can have up to 25 delegates and up to 10 delegators. Note that a delegate user must be referred to by their primary email address, and not an email alias. Also note that when a new delegate is created, there may be up to a one minute delay before the new delegate is available for use. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.delegates.delete": {
    "accessPath": [
      "gmailUsersSettingsDelegatesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/delegates/{delegateEmail}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "delegateEmail"
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
    "description": "Removes the specified delegate (which can be of any verification status), and revokes any verification that may have been required for using it. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "delegateEmail": "The email address of the user to be removed as a delegate."
    }
  },
  "gmail.users.settings.delegates.get": {
    "accessPath": [
      "gmailUsersSettingsDelegatesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/delegates/{delegateEmail}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "delegateEmail"
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
    "description": "Gets the specified delegate. Note that a delegate user must be referred to by their primary email address, and not an email alias. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "delegateEmail": "The email address of the user whose delegate relationship is to be retrieved."
    }
  },
  "gmail.users.settings.filters.list": {
    "accessPath": [
      "gmailUsersSettingsFiltersList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Lists the message filters of a Gmail user.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.filters.create": {
    "accessPath": [
      "gmailUsersSettingsFiltersCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "criteria",
      "id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates a filter. Note: you can only create a maximum of 1,000 filters.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.filters.delete": {
    "accessPath": [
      "gmailUsersSettingsFiltersDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/filters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Immediately and permanently deletes the specified filter.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "id": "The ID of the filter to be deleted."
    }
  },
  "gmail.users.settings.filters.get": {
    "accessPath": [
      "gmailUsersSettingsFiltersGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/filters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Gets a filter.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "id": "The ID of the filter to be fetched."
    }
  },
  "gmail.users.settings.forwardingAddresses.list": {
    "accessPath": [
      "gmailUsersSettingsForwardingAddressesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/forwardingAddresses",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Lists the forwarding addresses for the specified account.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.forwardingAddresses.create": {
    "accessPath": [
      "gmailUsersSettingsForwardingAddressesCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "forwardingEmail",
      "verificationStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/forwardingAddresses",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates a forwarding address. If ownership verification is required, a message will be sent to the recipient and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.forwardingAddresses.delete": {
    "accessPath": [
      "gmailUsersSettingsForwardingAddressesDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "forwardingEmail"
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
    "description": "Deletes the specified forwarding address and revokes any verification that may have been required. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "forwardingEmail": "The forwarding address to be deleted."
    }
  },
  "gmail.users.settings.forwardingAddresses.get": {
    "accessPath": [
      "gmailUsersSettingsForwardingAddressesGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/forwardingAddresses/{forwardingEmail}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "forwardingEmail"
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
    "description": "Gets the specified forwarding address.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "forwardingEmail": "The forwarding address to be retrieved."
    }
  },
  "gmail.users.settings.getImap": {
    "accessPath": [
      "gmailUsersSettingsGetImap"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/imap",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Gets IMAP settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.updateImap": {
    "accessPath": [
      "gmailUsersSettingsUpdateImap"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "autoExpunge",
      "enabled",
      "expungeBehavior",
      "maxFolderSize"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/imap",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Updates IMAP settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.getLanguage": {
    "accessPath": [
      "gmailUsersSettingsGetLanguage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/language",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Gets language settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.updateLanguage": {
    "accessPath": [
      "gmailUsersSettingsUpdateLanguage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "displayLanguage"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/language",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Updates language settings. If successful, the return object contains the `displayLanguage` that was saved for the user, which may differ from the value passed into the request. This is because the requested `displayLanguage` may not be directly supported by Gmail but have a close variant that is, and so the variant may be chosen and saved instead.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.getPop": {
    "accessPath": [
      "gmailUsersSettingsGetPop"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/pop",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Gets POP settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.updatePop": {
    "accessPath": [
      "gmailUsersSettingsUpdatePop"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "accessWindow",
      "disposition"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/pop",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Updates POP settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.sendAs.list": {
    "accessPath": [
      "gmailUsersSettingsSendAsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Lists the send-as aliases for the specified account. The result includes the primary send-as address associated with the account as well as any custom \"from\" aliases.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.sendAs.create": {
    "accessPath": [
      "gmailUsersSettingsSendAsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "displayName",
      "isDefault",
      "isPrimary",
      "replyToAddress",
      "sendAsEmail",
      "signature",
      "smtpMsa",
      "treatAsAlias",
      "verificationStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Creates a custom \"from\" send-as alias. If an SMTP MSA is specified, Gmail will attempt to connect to the SMTP service to validate the configuration before creating the alias. If ownership verification is required for the alias, a message will be sent to the email address and the resource's verification status will be set to `pending`; otherwise, the resource will be created with verification status set to `accepted`. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.sendAs.delete": {
    "accessPath": [
      "gmailUsersSettingsSendAsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Deletes the specified send-as alias. Revokes any verification that may have been required for using it. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "sendAsEmail": "The send-as alias to be deleted."
    }
  },
  "gmail.users.settings.sendAs.get": {
    "accessPath": [
      "gmailUsersSettingsSendAsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Gets the specified send-as alias. Fails with an HTTP 404 error if the specified address is not a member of the collection.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "sendAsEmail": "The send-as alias to be retrieved."
    }
  },
  "gmail.users.settings.sendAs.patch": {
    "accessPath": [
      "gmailUsersSettingsSendAsPatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "displayName",
      "isDefault",
      "isPrimary",
      "replyToAddress",
      "sendAsEmail",
      "signature",
      "smtpMsa",
      "treatAsAlias",
      "verificationStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
    "pathConflictKeys": [
      "sendAsEmail"
    ],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Patch the specified send-as alias.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "sendAsEmail": "The send-as alias to be updated."
    }
  },
  "gmail.users.settings.sendAs.update": {
    "accessPath": [
      "gmailUsersSettingsSendAsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "displayName",
      "isDefault",
      "isPrimary",
      "replyToAddress",
      "sendAsEmail",
      "signature",
      "smtpMsa",
      "treatAsAlias",
      "verificationStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
    "pathConflictKeys": [
      "sendAsEmail"
    ],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Updates a send-as alias. If a signature is provided, Gmail will sanitize the HTML before saving it with the alias. Addresses other than the primary address for the account can only be updated by service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "sendAsEmail": "The send-as alias to be updated."
    }
  },
  "gmail.users.settings.sendAs.smimeInfo.list": {
    "accessPath": [
      "gmailUsersSettingsSendAsSmimeInfoList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Lists S/MIME configs for the specified send-as alias.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "sendAsEmail": "The email address that appears in the \"From:\" header for mail sent using this alias."
    }
  },
  "gmail.users.settings.sendAs.smimeInfo.insert": {
    "accessPath": [
      "gmailUsersSettingsSendAsSmimeInfoInsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "encryptedKeyPassword",
      "expiration",
      "id",
      "isDefault",
      "issuerCn",
      "pem",
      "pkcs12"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Insert (upload) the given S/MIME config for the specified send-as alias. Note that pkcs12 format is required for the key.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "sendAsEmail": "The email address that appears in the \"From:\" header for mail sent using this alias."
    }
  },
  "gmail.users.settings.sendAs.smimeInfo.delete": {
    "accessPath": [
      "gmailUsersSettingsSendAsSmimeInfoDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail",
      "id"
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
    "description": "Deletes the specified S/MIME config for the specified send-as alias.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "sendAsEmail": "The email address that appears in the \"From:\" header for mail sent using this alias.",
      "id": "The immutable ID for the SmimeInfo."
    }
  },
  "gmail.users.settings.sendAs.smimeInfo.get": {
    "accessPath": [
      "gmailUsersSettingsSendAsSmimeInfoGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail",
      "id"
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
    "description": "Gets the specified S/MIME config for the specified send-as alias.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "sendAsEmail": "The email address that appears in the \"From:\" header for mail sent using this alias.",
      "id": "The immutable ID for the SmimeInfo."
    }
  },
  "gmail.users.settings.sendAs.smimeInfo.setDefault": {
    "accessPath": [
      "gmailUsersSettingsSendAsSmimeInfoSetDefault"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}/setDefault",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail",
      "id"
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
    "description": "Sets the default S/MIME config for the specified send-as alias.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "sendAsEmail": "The email address that appears in the \"From:\" header for mail sent using this alias.",
      "id": "The immutable ID for the SmimeInfo."
    }
  },
  "gmail.users.settings.sendAs.verify": {
    "accessPath": [
      "gmailUsersSettingsSendAsVerify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/verify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "sendAsEmail"
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
    "description": "Sends a verification email to the specified send-as alias address. The verification status must be `pending`. This method is only available to service account clients that have been delegated domain-wide authority.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user.",
      "sendAsEmail": "The send-as alias to be verified."
    }
  },
  "gmail.users.settings.getVacation": {
    "accessPath": [
      "gmailUsersSettingsGetVacation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/vacation",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Gets vacation responder settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.settings.updateVacation": {
    "accessPath": [
      "gmailUsersSettingsUpdateVacation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enableAutoReply",
      "endTime",
      "responseBodyHtml",
      "responseBodyPlainText",
      "responseSubject",
      "restrictToContacts",
      "restrictToDomain",
      "startTime"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/gmail/v1/users/{userId}/settings/vacation",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Updates vacation responder settings.",
    "parameterDescriptions": {
      "userId": "User's email address. The special value \"me\" can be used to indicate the authenticated user."
    }
  },
  "gmail.users.stop": {
    "accessPath": [
      "gmailUsersStop"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/stop",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Stop receiving push notifications for the given user mailbox.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  },
  "gmail.users.threads.list": {
    "accessPath": [
      "gmailUsersThreadsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/threads",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
      "includeSpamTrash",
      "labelIds",
      "maxResults",
      "pageToken",
      "q"
    ],
    "description": "Lists the threads in the user's mailbox.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "includeSpamTrash": "Include threads from `SPAM` and `TRASH` in the results.",
      "labelIds": "Only return threads with labels that match all of the specified label IDs.",
      "maxResults": "Maximum number of threads to return. This field defaults to 100. The maximum allowed value for this field is 500.",
      "pageToken": "Page token to retrieve a specific page of results in the list.",
      "q": "Only return threads matching the specified query. Supports the same query format as the Gmail search box. For example, `\"from:someuser@example.com rfc822msgid: is:unread\"`. Parameter cannot be used when accessing the api using the gmail.metadata scope."
    }
  },
  "gmail.users.threads.delete": {
    "accessPath": [
      "gmailUsersThreadsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/gmail/v1/users/{userId}/threads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Immediately and permanently deletes the specified thread. Any messages that belong to the thread are also deleted. This operation cannot be undone. Prefer `threads.trash` instead.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "ID of the Thread to delete."
    }
  },
  "gmail.users.threads.get": {
    "accessPath": [
      "gmailUsersThreadsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/gmail/v1/users/{userId}/threads/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
      "format",
      "metadataHeaders"
    ],
    "description": "Gets the specified thread.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the thread to retrieve.",
      "format": "The format to return the messages in.",
      "metadataHeaders": "When given and format is METADATA, only include headers specified."
    }
  },
  "gmail.users.threads.modify": {
    "accessPath": [
      "gmailUsersThreadsModify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "addLabelIds",
      "removeLabelIds"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/threads/{id}/modify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Modifies the labels applied to the thread. This applies to all messages in the thread.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the thread to modify."
    }
  },
  "gmail.users.threads.trash": {
    "accessPath": [
      "gmailUsersThreadsTrash"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/threads/{id}/trash",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Moves the specified thread to the trash. Any messages that belong to the thread are also moved to the trash.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the thread to Trash."
    }
  },
  "gmail.users.threads.untrash": {
    "accessPath": [
      "gmailUsersThreadsUntrash"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/threads/{id}/untrash",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId",
      "id"
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
    "description": "Removes the specified thread from the trash. Any messages that belong to the thread are also removed from the trash.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user.",
      "id": "The ID of the thread to remove from Trash."
    }
  },
  "gmail.users.watch": {
    "accessPath": [
      "gmailUsersWatch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "labelFilterAction",
      "labelIds",
      "topicName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/gmail/v1/users/{userId}/watch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "userId"
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
    "description": "Set up or update a push notification watch on the given user mailbox.",
    "parameterDescriptions": {
      "userId": "The user's email address. The special value `me` can be used to indicate the authenticated user."
    }
  }
} satisfies ToolRuntimeMetadataMap;
