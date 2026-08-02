import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "list-accounts": {
    "accessPath": [
      "listAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List Accounts",
    "parameterDescriptions": {
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the accounts. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-account": {
    "accessPath": [
      "createAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "domains",
      "external_id",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create account"
  },
  "list-account-custom-fields": {
    "accessPath": [
      "listAccountCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/accounts/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Account's custom fields"
  },
  "fetch-an-account": {
    "accessPath": [
      "fetchAnAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an account",
    "parameterDescriptions": {
      "account_id": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "update-account": {
    "accessPath": [
      "updateAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "domains",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update account",
    "parameterDescriptions": {
      "account_id": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "delete-an-account": {
    "accessPath": [
      "deleteAnAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an account",
    "parameterDescriptions": {
      "account_id": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-account-contacts": {
    "accessPath": [
      "listAccountContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/accounts/{account_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_token",
      "limit",
      "sort_by",
      "sort_order"
    ],
    "description": "List account contacts",
    "parameterDescriptions": {
      "account_id": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the contacts. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "add-contact-to-account": {
    "accessPath": [
      "addContactToAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/accounts/{account_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add contact to Account",
    "parameterDescriptions": {
      "account_id": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "remove-contact-from-account": {
    "accessPath": [
      "removeContactFromAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/accounts/{account_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove contact from Account",
    "parameterDescriptions": {
      "account_id": "The Account ID. Alternatively, you can supply the account domain or external ID as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "create-analytics-export": {
    "accessPath": [
      "createAnalyticsExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/analytics/exports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new analytics export"
  },
  "get-analytics-export": {
    "accessPath": [
      "getAnalyticsExport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/analytics/exports/{export_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "export_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an analytics export",
    "parameterDescriptions": {
      "export_id": "The export ID."
    }
  },
  "create-analytics-report": {
    "accessPath": [
      "createAnalyticsReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "start",
      "end",
      "timezone",
      "filters",
      "metrics"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/analytics/reports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new analytics report"
  },
  "get-analytics-report": {
    "accessPath": [
      "getAnalyticsReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/analytics/reports/{report_uid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "report_uid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an analytics report",
    "parameterDescriptions": {
      "report_uid": "The report UID."
    }
  },
  "trigger-app-event": {
    "accessPath": [
      "triggerAppEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "event_type",
      "app_object"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/applications/{application_uid}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "application_uid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Trigger application event",
    "parameterDescriptions": {
      "application_uid": "The application UID"
    }
  },
  "list-channels": {
    "accessPath": [
      "listChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List channels"
  },
  "get-channel": {
    "accessPath": [
      "getChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get channel",
    "parameterDescriptions": {
      "channel_id": "The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "update-channel": {
    "accessPath": [
      "updateChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "inbox_id",
      "settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Channel",
    "parameterDescriptions": {
      "channel_id": "The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "create-draft": {
    "accessPath": [
      "createDraft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "to",
      "cc",
      "bcc",
      "subject",
      "body",
      "quote_body",
      "attachments",
      "mode",
      "signature_id",
      "should_add_default_signature"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/channels/{channel_id}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create draft",
    "parameterDescriptions": {
      "channel_id": "The channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "receive-custom-messages": {
    "accessPath": [
      "receiveCustomMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sender",
      "subject",
      "body",
      "body_format",
      "metadata",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/channels/{channel_id}/incoming_messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Receive custom messages",
    "parameterDescriptions": {
      "channel_id": "The channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "create-message": {
    "accessPath": [
      "createMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "to",
      "cc",
      "bcc",
      "sender_name",
      "subject",
      "author_id",
      "body",
      "text",
      "options",
      "attachments",
      "signature_id",
      "should_add_default_signature"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/channels/{channel_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create message",
    "parameterDescriptions": {
      "channel_id": "The sending channel ID. Alternatively, you can supply the sending channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "validate-channel": {
    "accessPath": [
      "validateChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/channels/{channel_id}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate channel",
    "parameterDescriptions": {
      "channel_id": "The Channel ID. Alternatively, you can supply the channel address as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "get-comment": {
    "accessPath": [
      "getComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/comments/{comment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get comment",
    "parameterDescriptions": {
      "comment_id": "The Comment ID"
    }
  },
  "update-comment": {
    "accessPath": [
      "updateComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/comments/{comment_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update comment"
  },
  "download-attachment-for-a-comment": {
    "accessPath": [
      "downloadAttachmentForAComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/comments/{comment_id}/download/{attachment_link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "comment_id",
      "attachment_link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download attachment for a comment",
    "parameterDescriptions": {
      "comment_id": "The Comment ID",
      "attachment_link_id": "The Attachment ID"
    }
  },
  "list-comment-mentions": {
    "accessPath": [
      "listCommentMentions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/comments/{comment_id}/mentions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List comment mentions",
    "parameterDescriptions": {
      "comment_id": "The Comment ID"
    }
  },
  "add-comment-reply": {
    "accessPath": [
      "addCommentReply"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "body",
      "is_pinned",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/comments/{comment_id}/replies",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "comment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add comment reply",
    "parameterDescriptions": {
      "comment_id": "The comment ID to reply to"
    }
  },
  "list-all-company-rules": {
    "accessPath": [
      "listAllCompanyRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/company/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List all company rules"
  },
  "list-company-ticket-statuses": {
    "accessPath": [
      "listCompanyTicketStatuses"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/company/statuses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List company ticket statuses"
  },
  "get-ticket-status-by-id": {
    "accessPath": [
      "getTicketStatusById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/company/statuses/{status_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "status_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get ticket status",
    "parameterDescriptions": {
      "status_id": "The ticket status ID"
    }
  },
  "list-company-tags": {
    "accessPath": [
      "listCompanyTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/company/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List company tags",
    "parameterDescriptions": {
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the tags. Only supports `id`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-company-tag": {
    "accessPath": [
      "createCompanyTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "highlight",
      "is_visible_in_conversation_lists"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/company/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create company tag"
  },
  "list-groups": {
    "accessPath": [
      "listGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contact_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List groups"
  },
  "create-group": {
    "accessPath": [
      "createGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contact_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create group"
  },
  "delete-group": {
    "accessPath": [
      "deleteGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/contact_groups/{contact_group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete group",
    "parameterDescriptions": {
      "contact_group_id": "The contact group ID"
    }
  },
  "list-contacts-in-group": {
    "accessPath": [
      "listContactsInGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contact_groups/{contact_group_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_token",
      "limit"
    ],
    "description": "List contacts in group",
    "parameterDescriptions": {
      "contact_group_id": "The contact group ID",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "add-contacts-to-group": {
    "accessPath": [
      "addContactsToGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contact_groups/{contact_group_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add contacts to group",
    "parameterDescriptions": {
      "contact_group_id": "The contact group ID"
    }
  },
  "remove-contacts-from-group": {
    "accessPath": [
      "removeContactsFromGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/contact_groups/{contact_group_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove contacts from group",
    "parameterDescriptions": {
      "contact_group_id": "The contact group ID"
    }
  },
  "list-contact-lists": {
    "accessPath": [
      "listContactLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contact_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List contact lists"
  },
  "create-contact-list": {
    "accessPath": [
      "createContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contact_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create contact list"
  },
  "delete-contact-list": {
    "accessPath": [
      "deleteContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/contact_lists/{contact_list_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete contact list",
    "parameterDescriptions": {
      "contact_list_id": "The contact list ID"
    }
  },
  "list-contacts-in-contact-list": {
    "accessPath": [
      "listContactsInContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contact_lists/{contact_list_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_token",
      "limit"
    ],
    "description": "List contacts in contact list",
    "parameterDescriptions": {
      "contact_list_id": "The contact list ID",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "add-contacts-to-contact-list": {
    "accessPath": [
      "addContactsToContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contact_lists/{contact_list_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add contacts to contact list",
    "parameterDescriptions": {
      "contact_list_id": "The contact list ID"
    }
  },
  "remove-contacts-from-contact-list": {
    "accessPath": [
      "removeContactsFromContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/contact_lists/{contact_list_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove contacts from contact list",
    "parameterDescriptions": {
      "contact_list_id": "The contact list ID"
    }
  },
  "list-contacts": {
    "accessPath": [
      "listContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List contacts",
    "parameterDescriptions": {
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `updated_after` and `updated_before`, whose value should be a timestamp in seconds with up to 3 decimal places.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the contacts. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-contact": {
    "accessPath": [
      "createContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "avatar",
      "links",
      "group_names",
      "list_names",
      "custom_fields",
      "handles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create contact"
  },
  "list-contact-custom-fields": {
    "accessPath": [
      "listContactCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Contact's custom fields"
  },
  "merge-contacts": {
    "accessPath": [
      "mergeContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "target_contact_id",
      "contact_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contacts/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge contacts"
  },
  "get-contact": {
    "accessPath": [
      "getContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get contact",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "update-a-contact": {
    "accessPath": [
      "updateAContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "avatar",
      "links",
      "group_names",
      "list_names",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/contacts/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a contact",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "delete-a-contact": {
    "accessPath": [
      "deleteAContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/contacts/{contact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a contact",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-contact-conversations": {
    "accessPath": [
      "listContactConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token"
    ],
    "description": "List contact conversations",
    "parameterDescriptions": {
      "contact_id": "The Contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "add-contact-handle": {
    "accessPath": [
      "addContactHandle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "handle",
      "source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add contact handle",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "delete-contact-handle": {
    "accessPath": [
      "deleteContactHandle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "handle",
      "source",
      "force"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/contacts/{contact_id}/handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete contact handle",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-notes": {
    "accessPath": [
      "listNotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts/{contact_id}/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List notes",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "add-note": {
    "accessPath": [
      "addNote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "body"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contacts/{contact_id}/notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add note",
    "parameterDescriptions": {
      "contact_id": "The contact ID. Alternatively, you can supply the contact's source and handle as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-conversations": {
    "accessPath": [
      "listConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List conversations",
    "parameterDescriptions": {
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the conversations. Only supports `date`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-conversation": {
    "accessPath": [
      "createConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "inbox_id",
      "teammate_ids",
      "subject",
      "comment",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create discussion conversation"
  },
  "list-conversation-custom-fields": {
    "accessPath": [
      "listConversationCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Conversation's custom fields"
  },
  "search-conversations": {
    "accessPath": [
      "searchConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/search/{query}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "query"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "Search conversations",
    "parameterDescriptions": {
      "query": "Search query string. See [Search](https://dev.frontapp.com/docs/search-1) topic for usage details.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "get-conversation-by-id": {
    "accessPath": [
      "getConversationById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get conversation",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "update-conversation": {
    "accessPath": [
      "updateConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assignee_id",
      "inbox_id",
      "status",
      "status_id",
      "tag_ids",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update conversation",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "delete-conversation": {
    "accessPath": [
      "deleteConversation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete conversation",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "update-conversation-assignee": {
    "accessPath": [
      "updateConversationAssignee"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assignee_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/conversations/{conversation_id}/assignee",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update conversation assignee",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "list-conversation-comments": {
    "accessPath": [
      "listConversationComments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List conversation comments",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "add-comment": {
    "accessPath": [
      "addComment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "body",
      "is_pinned",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/comments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add comment",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "list-conversation-drafts": {
    "accessPath": [
      "listConversationDrafts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List conversation drafts",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "create-draft-reply": {
    "accessPath": [
      "createDraftReply"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "to",
      "cc",
      "bcc",
      "subject",
      "body",
      "quote_body",
      "attachments",
      "mode",
      "signature_id",
      "should_add_default_signature",
      "channel_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create draft reply",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "list-conversation-events": {
    "accessPath": [
      "listConversationEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "List conversation events",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "list-conversation-followers": {
    "accessPath": [
      "listConversationFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List conversation followers",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "add-conversation-followers": {
    "accessPath": [
      "addConversationFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ignore_errors"
    ],
    "description": "Add conversation followers",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID",
      "ignore_errors": "Whether to ignore invalid teammate IDs and continue adding valid ones."
    }
  },
  "delete-conversation-followers": {
    "accessPath": [
      "deleteConversationFollowers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}/followers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete conversation followers",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "list-conversation-inboxes": {
    "accessPath": [
      "listConversationInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List conversation inboxes",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "add-conversation-link": {
    "accessPath": [
      "addConversationLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "link_ids",
      "link_external_urls"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add conversation link",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "remove-conversation-links": {
    "accessPath": [
      "removeConversationLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "link_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove conversation links",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "list-conversation-messages": {
    "accessPath": [
      "listConversationMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/conversations/{conversation_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List conversation messages",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the messages. Only supports `created_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-message-reply": {
    "accessPath": [
      "createMessageReply"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "to",
      "cc",
      "bcc",
      "sender_name",
      "subject",
      "author_id",
      "channel_id",
      "body",
      "text",
      "quote_body",
      "options",
      "attachments",
      "signature_id",
      "should_add_default_signature"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create message reply",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "update-conversation-reminders": {
    "accessPath": [
      "updateConversationReminders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_id",
      "scheduled_at",
      "status_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/conversations/{conversation_id}/reminders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update conversation reminders",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "add-conversation-tag": {
    "accessPath": [
      "addConversationTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tag_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/conversations/{conversation_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add conversation tag",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "remove-conversation-tag": {
    "accessPath": [
      "removeConversationTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tag_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/conversations/{conversation_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove conversation tag",
    "parameterDescriptions": {
      "conversation_id": "The conversation ID"
    }
  },
  "list-custom-fields": {
    "accessPath": [
      "listCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Contact's custom fields"
  },
  "download-attachment": {
    "accessPath": [
      "downloadAttachment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/download/{attachment_link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "attachment_link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download attachment",
    "parameterDescriptions": {
      "attachment_link_id": "The Attachment ID"
    }
  },
  "delete-draft": {
    "accessPath": [
      "deleteDraft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "version"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/drafts/{draft_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "draft_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete draft",
    "parameterDescriptions": {
      "draft_id": "The draft ID"
    }
  },
  "edit-draft": {
    "accessPath": [
      "editDraft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/drafts/{message_id}/",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit draft"
  },
  "list-events": {
    "accessPath": [
      "listEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List events",
    "parameterDescriptions": {
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with optional properties `before`, `after`, `types`, or `inboxes`. `before` and `after` should be a timestamp in seconds with up to 3 decimal places. `types` should be a list of [event types](https://dev.frontapp.com/reference/events). `inboxes` should be a list of inbox IDs.",
      "limit": "Max number of results per page (max 15)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the events. Only supports `created_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "get-event": {
    "accessPath": [
      "getEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/events/{event_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "event_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get event",
    "parameterDescriptions": {
      "event_id": "The event ID"
    }
  },
  "list-inboxes": {
    "accessPath": [
      "listInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List inboxes"
  },
  "create-inbox": {
    "accessPath": [
      "createInbox"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "teammate_ids",
      "is_public",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create inbox"
  },
  "list-inbox-custom-fields": {
    "accessPath": [
      "listInboxCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/inboxes/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Inbox's custom fields"
  },
  "get-inbox": {
    "accessPath": [
      "getInbox"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/inboxes/{inbox_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get inbox",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "list-inbox-channels": {
    "accessPath": [
      "listInboxChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/inboxes/{inbox_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List inbox channels",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "create-a-channel": {
    "accessPath": [
      "createAChannel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "settings",
      "type",
      "send_as"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/inboxes/{inbox_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a channel",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "list-inbox-conversations": {
    "accessPath": [
      "listInboxConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/inboxes/{inbox_id}/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token"
    ],
    "description": "List inbox conversations",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "import-inbox-message": {
    "accessPath": [
      "importInboxMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sender",
      "to",
      "cc",
      "bcc",
      "subject",
      "body",
      "body_format",
      "external_id",
      "created_at",
      "type",
      "assignee_id",
      "tags",
      "conversation_id",
      "metadata",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/inboxes/{inbox_id}/imported_messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Import message",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "list-inbox-access": {
    "accessPath": [
      "listInboxAccess"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/inboxes/{inbox_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List inbox access",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "add-inbox-access": {
    "accessPath": [
      "addInboxAccess"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/inboxes/{inbox_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add inbox access",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "removes-inbox-access": {
    "accessPath": [
      "removesInboxAccess"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/inboxes/{inbox_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbox_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Removes inbox access",
    "parameterDescriptions": {
      "inbox_id": "The Inbox ID"
    }
  },
  "get-a-knowledge-base-article": {
    "accessPath": [
      "getAKnowledgeBaseArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_articles/{article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a knowledge base article",
    "parameterDescriptions": {
      "article_id": "The ID of the article to fetch"
    }
  },
  "delete-an-article": {
    "accessPath": [
      "deleteAnArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/knowledge_base_articles/{article_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an article",
    "parameterDescriptions": {
      "article_id": "The ID of the article to delete"
    }
  },
  "get-knowledge-base-article-with-content-in-default-locale": {
    "accessPath": [
      "getKnowledgeBaseArticleWithContentInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_articles/{article_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get knowledge base article with content in default locale",
    "parameterDescriptions": {
      "article_id": "The ID of the article to fetch"
    }
  },
  "update-article-content-in-default-locale": {
    "accessPath": [
      "updateArticleContentInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "subject",
      "content",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/knowledge_base_articles/{article_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update article content in default locale.",
    "parameterDescriptions": {
      "article_id": "The ID of the article to update"
    }
  },
  "download-attachment-from-an-article": {
    "accessPath": [
      "downloadAttachmentFromAnArticle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_articles/{article_id}/download/{attachment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id",
      "attachment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download attachment from an article",
    "parameterDescriptions": {
      "article_id": "The ID of the article",
      "attachment_id": "The ID of the file to download"
    }
  },
  "get-knowledge-base-article-with-content-in-specified-locale": {
    "accessPath": [
      "getKnowledgeBaseArticleWithContentInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_articles/{article_id}/locales/{locale}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get knowledge base article with content in specified locale",
    "parameterDescriptions": {
      "article_id": "The ID of the article to fetch",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch"
    }
  },
  "update-article-content-in-specified-locale": {
    "accessPath": [
      "updateArticleContentInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "author_id",
      "subject",
      "content",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/knowledge_base_articles/{article_id}/locales/{locale}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "article_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update article content in specified locale",
    "parameterDescriptions": {
      "article_id": "The ID of the article to update",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content"
    }
  },
  "get-a-knowledge-base-category": {
    "accessPath": [
      "getAKnowledgeBaseCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_categories/{category_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a knowledge base category",
    "parameterDescriptions": {
      "category_id": "The ID of the category to fetch"
    }
  },
  "delete-a-knowledge-base-category": {
    "accessPath": [
      "deleteAKnowledgeBaseCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/knowledge_base_categories/{category_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a knowledge base category",
    "parameterDescriptions": {
      "category_id": "The ID of the category to delete"
    }
  },
  "list-articles-in-a-category": {
    "accessPath": [
      "listArticlesInACategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_categories/{category_id}/articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "List articles in a category",
    "parameterDescriptions": {
      "category_id": "The ID of the category",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "get-knowledge-base-category-content-in-default-locale": {
    "accessPath": [
      "getKnowledgeBaseCategoryContentInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_categories/{category_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get knowledge base category content in default locale",
    "parameterDescriptions": {
      "category_id": "The ID of the category to fetch"
    }
  },
  "update-knowledge-base-category-in-default-locale": {
    "accessPath": [
      "updateKnowledgeBaseCategoryInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/knowledge_base_categories/{category_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update knowledge base category in default locale",
    "parameterDescriptions": {
      "category_id": "The ID of the category to update"
    }
  },
  "get-knowledge-base-category-with-content-in-specified-locale": {
    "accessPath": [
      "getKnowledgeBaseCategoryWithContentInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_base_categories/{category_id}/locales/{locale}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get knowledge base category with content in specified locale",
    "parameterDescriptions": {
      "category_id": "The ID of the category to fetch",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch"
    }
  },
  "update-knowledge-base-category-in-specified-locale": {
    "accessPath": [
      "updateKnowledgeBaseCategoryInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/knowledge_base_categories/{category_id}/locales/{locale}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "category_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update knowledge base category in specified locale",
    "parameterDescriptions": {
      "category_id": "The ID of the category to update",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content"
    }
  },
  "list-knowledge-bases": {
    "accessPath": [
      "listKnowledgeBases"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_bases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List knowledge bases"
  },
  "create-a-knowledge-base": {
    "accessPath": [
      "createAKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/knowledge_bases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a knowledge base"
  },
  "get-a-knowledge-base": {
    "accessPath": [
      "getAKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a knowledge base",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to fetch"
    }
  },
  "list-articles-in-a-knowledge-base": {
    "accessPath": [
      "listArticlesInAKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "List articles in a knowledge base",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "create-article-in-a-knowledge-base-in-default-locale": {
    "accessPath": [
      "createArticleInAKnowledgeBaseInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "category_id",
      "author_id",
      "subject",
      "content",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create article in a knowledge base in default locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to create the article in"
    }
  },
  "list-categories-in-a-knowledge-base": {
    "accessPath": [
      "listCategoriesInAKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "List categories in a knowledge base",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "create-knowledge-base-category-in-default-locale": {
    "accessPath": [
      "createKnowledgeBaseCategoryInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "parent_category_id",
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create knowledge base category in default locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to create the category in"
    }
  },
  "get-a-knowledge-base-with-content-in-default-locale": {
    "accessPath": [
      "getAKnowledgeBaseWithContentInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a knowledge base with content in default locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to fetch"
    }
  },
  "update-knowledge-base-in-default-locale": {
    "accessPath": [
      "updateKnowledgeBaseInDefaultLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update knowledge base in default locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to update"
    }
  },
  "create-article-in-a-knowledge-base-in-specified-locale": {
    "accessPath": [
      "createArticleInAKnowledgeBaseInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "category_id",
      "author_id",
      "subject",
      "content",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/locales/{locale}/articles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create article in a knowledge base in specified locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to create the article in",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the article's content"
    }
  },
  "create-knowledge-base-category-in-specified-locale": {
    "accessPath": [
      "createKnowledgeBaseCategoryInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "parent_category_id",
      "name",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/locales/{locale}/categories",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create knowledge base category in specified locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to create the category in",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the category's content"
    }
  },
  "get-a-knowledge-base-with-content-in-specified-locale": {
    "accessPath": [
      "getAKnowledgeBaseWithContentInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/locales/{locale}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a knowledge base with content in specified locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to fetch",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the content to fetch"
    }
  },
  "update-knowledge-base-in-specified-locale": {
    "accessPath": [
      "updateKnowledgeBaseInSpecifiedLocale"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/knowledge_bases/{knowledge_base_id}/locales/{locale}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "knowledge_base_id",
      "locale"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update knowledge base in specified locale",
    "parameterDescriptions": {
      "knowledge_base_id": "The ID of the knowledge base to update",
      "locale": "The [locale](https://dev.frontapp.com/reference/knowledge-bases#locales) of the updated content"
    }
  },
  "list-links": {
    "accessPath": [
      "listLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List links",
    "parameterDescriptions": {
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `types`, whose value should be a list of link types. Links created via the API have type `web` and links created by application objects have type `app_<uid>`, matching the app UID where the object is configured. There are also types `jira`, `asana`, `monday`, `trello`, and `github`, which correspond to the integrations built by Front.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the links. Only supports `id`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-link": {
    "accessPath": [
      "createLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "external_url",
      "pattern"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create link"
  },
  "list-link-custom-fields": {
    "accessPath": [
      "listLinkCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/links/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Link's custom fields"
  },
  "get-link": {
    "accessPath": [
      "getLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get link",
    "parameterDescriptions": {
      "link_id": "The link ID"
    }
  },
  "update-a-link": {
    "accessPath": [
      "updateALink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a link",
    "parameterDescriptions": {
      "link_id": "The Link ID"
    }
  },
  "list-link-conversations": {
    "accessPath": [
      "listLinkConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/links/{link_id}/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List link conversations",
    "parameterDescriptions": {
      "link_id": "The Link ID",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the conversations. Only supports `date`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "api-token-details": {
    "accessPath": [
      "apiTokenDetails"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/me",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "API Token details"
  },
  "list-folders": {
    "accessPath": [
      "listFolders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order"
    ],
    "description": "List folders",
    "parameterDescriptions": {
      "sort_by": "Field used to sort the message template folders. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-folder": {
    "accessPath": [
      "createFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create folder"
  },
  "get-folder": {
    "accessPath": [
      "getFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get folder",
    "parameterDescriptions": {
      "message_template_folder_id": "The message template folder ID"
    }
  },
  "update-folder": {
    "accessPath": [
      "updateFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update folder",
    "parameterDescriptions": {
      "message_template_folder_id": "The message template folder ID"
    }
  },
  "delete-folder": {
    "accessPath": [
      "deleteFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete folder",
    "parameterDescriptions": {
      "message_template_folder_id": "The message template folder id"
    }
  },
  "get-child-folders": {
    "accessPath": [
      "getChildFolders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get child folders",
    "parameterDescriptions": {
      "message_template_folder_id": "The message template folder ID"
    }
  },
  "create-child-folder": {
    "accessPath": [
      "createChildFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create child folder",
    "parameterDescriptions": {
      "message_template_folder_id": "The parent message template folder ID"
    }
  },
  "get-child-templates": {
    "accessPath": [
      "getChildTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get child templates",
    "parameterDescriptions": {
      "message_template_folder_id": "The message template folder ID"
    }
  },
  "create-child-template": {
    "accessPath": [
      "createChildTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "subject",
      "body",
      "inbox_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/message_template_folders/{message_template_folder_id}/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create child template",
    "parameterDescriptions": {
      "message_template_folder_id": "The parent message template folder ID"
    }
  },
  "list-message-templates": {
    "accessPath": [
      "listMessageTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order"
    ],
    "description": "List message templates",
    "parameterDescriptions": {
      "sort_by": "Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-message-template": {
    "accessPath": [
      "createMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "subject",
      "body",
      "folder_id",
      "inbox_ids",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create message template"
  },
  "get-message-template": {
    "accessPath": [
      "getMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_templates/{message_template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get message template",
    "parameterDescriptions": {
      "message_template_id": "The message template ID"
    }
  },
  "update-message-template": {
    "accessPath": [
      "updateMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/message_templates/{message_template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update message template",
    "parameterDescriptions": {
      "message_template_id": "The message template ID"
    }
  },
  "delete-message-template": {
    "accessPath": [
      "deleteMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/message_templates/{message_template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete message template",
    "parameterDescriptions": {
      "message_template_id": "The message template ID"
    }
  },
  "download-attachment-for-a-message-template": {
    "accessPath": [
      "downloadAttachmentForAMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/message_templates/{message_template_id}/download/{attachment_link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_template_id",
      "attachment_link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download attachment for a message template",
    "parameterDescriptions": {
      "message_template_id": "The Message Template ID",
      "attachment_link_id": "The Attachment ID"
    }
  },
  "get-message": {
    "accessPath": [
      "getMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get message",
    "parameterDescriptions": {
      "message_id": "The message ID"
    }
  },
  "download-attachment-for-a-message": {
    "accessPath": [
      "downloadAttachmentForAMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/messages/{message_id}/download/{attachment_link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_id",
      "attachment_link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download attachment for a message",
    "parameterDescriptions": {
      "message_id": "The Message ID",
      "attachment_link_id": "The Attachment ID"
    }
  },
  "get-message-seen-status": {
    "accessPath": [
      "getMessageSeenStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/messages/{message_id}/seen",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get message seen status",
    "parameterDescriptions": {
      "message_id": "The message ID"
    }
  },
  "mark-message-seen": {
    "accessPath": [
      "markMessageSeen"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/messages/{message_id}/seen",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Mark message seen",
    "parameterDescriptions": {
      "message_id": "The message ID"
    }
  },
  "list-rules": {
    "accessPath": [
      "listRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List rules"
  },
  "get-rule": {
    "accessPath": [
      "getRule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get rule",
    "parameterDescriptions": {
      "rule_id": "The Rule ID"
    }
  },
  "list-shifts": {
    "accessPath": [
      "listShifts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/shifts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Shifts"
  },
  "create-shift": {
    "accessPath": [
      "createShift"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "color",
      "timezone",
      "times",
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/shifts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create shift"
  },
  "get-shift": {
    "accessPath": [
      "getShift"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/shifts/{shift_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shift_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get shift",
    "parameterDescriptions": {
      "shift_id": "The Shift ID"
    }
  },
  "update-shift": {
    "accessPath": [
      "updateShift"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "color",
      "timezone",
      "times",
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/shifts/{shift_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shift_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update shift",
    "parameterDescriptions": {
      "shift_id": "The Shift ID"
    }
  },
  "list-shifts-teammates": {
    "accessPath": [
      "listShiftsTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/shifts/{shift_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shift_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List shift's teammates",
    "parameterDescriptions": {
      "shift_id": "The Shift ID"
    }
  },
  "add-teammates-to-shift": {
    "accessPath": [
      "addTeammatesToShift"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/shifts/{shift_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shift_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add teammates to shift",
    "parameterDescriptions": {
      "shift_id": "The Shift ID"
    }
  },
  "remove-teammates-from-shift": {
    "accessPath": [
      "removeTeammatesFromShift"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/shifts/{shift_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shift_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove teammates from shift",
    "parameterDescriptions": {
      "shift_id": "The Shift ID"
    }
  },
  "get-signatures": {
    "accessPath": [
      "getSignatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/signatures/{signature_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signature_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get signatures",
    "parameterDescriptions": {
      "signature_id": "The signature ID"
    }
  },
  "update-signature": {
    "accessPath": [
      "updateSignature"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "sender_info",
      "body",
      "is_visible_for_all_teammate_channels",
      "is_default",
      "channel_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/signatures/{signature_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signature_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update signature",
    "parameterDescriptions": {
      "signature_id": "The signature ID"
    }
  },
  "delete-signature": {
    "accessPath": [
      "deleteSignature"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/signatures/{signature_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signature_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete signature",
    "parameterDescriptions": {
      "signature_id": "The signature ID"
    }
  },
  "list-tags": {
    "accessPath": [
      "listTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List tags",
    "parameterDescriptions": {
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the tags. Only supports `id`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-tag": {
    "accessPath": [
      "createTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "highlight",
      "is_visible_in_conversation_lists"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create tag"
  },
  "get-tag": {
    "accessPath": [
      "getTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get tag",
    "parameterDescriptions": {
      "tag_id": "The tag ID"
    }
  },
  "update-a-tag": {
    "accessPath": [
      "updateATag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "highlight",
      "parent_tag_id",
      "is_visible_in_conversation_lists"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a tag",
    "parameterDescriptions": {
      "tag_id": "The tag ID"
    }
  },
  "delete-tag": {
    "accessPath": [
      "deleteTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete tag",
    "parameterDescriptions": {
      "tag_id": "The ID of the tag to delete"
    }
  },
  "list-tag-children": {
    "accessPath": [
      "listTagChildren"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tags/{tag_id}/children",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List tag children",
    "parameterDescriptions": {
      "tag_id": "The tag ID"
    }
  },
  "create-child-tag": {
    "accessPath": [
      "createChildTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "highlight",
      "is_visible_in_conversation_lists"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/tags/{tag_id}/children",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create child tag",
    "parameterDescriptions": {
      "tag_id": "The tag ID"
    }
  },
  "list-tagged-conversations": {
    "accessPath": [
      "listTaggedConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/tags/{tag_id}/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token"
    ],
    "description": "List tagged conversations",
    "parameterDescriptions": {
      "tag_id": "The ID of the tag",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "list-company-teammate-groups": {
    "accessPath": [
      "listCompanyTeammateGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammate_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate groups"
  },
  "create-company-teammate-group": {
    "accessPath": [
      "createCompanyTeammateGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "permissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammate_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate group"
  },
  "get-company-teammate-group": {
    "accessPath": [
      "getCompanyTeammateGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammate_groups/{teammate_group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get teammate group",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "update-a-company-teammate-group": {
    "accessPath": [
      "updateACompanyTeammateGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "permissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/teammate_groups/{teammate_group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a teammate group",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "delete-company-teammate-group": {
    "accessPath": [
      "deleteCompanyTeammateGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/teammate_groups/{teammate_group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete teammate group",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "list-company-teammate-group-team-inboxes": {
    "accessPath": [
      "listCompanyTeammateGroupTeamInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate group team inboxes",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "add-company-teammate-group-team-inboxes": {
    "accessPath": [
      "addCompanyTeammateGroupTeamInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inbox_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add teammate group team inboxes",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "remove-company-teammate-group-team-inboxes": {
    "accessPath": [
      "removeCompanyTeammateGroupTeamInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inbox_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove teammate group team inboxes",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "list-company-teammate-group-teammates": {
    "accessPath": [
      "listCompanyTeammateGroupTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate group teammates",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "add-company-teammate-group-teammates": {
    "accessPath": [
      "addCompanyTeammateGroupTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add teammate group teammates",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "remove-company-teammate-group-teammates": {
    "accessPath": [
      "removeCompanyTeammateGroupTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove teammate group teammates",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "list-company-teammate-group-teams": {
    "accessPath": [
      "listCompanyTeammateGroupTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate group teams",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "add-company-teammate-group-teams": {
    "accessPath": [
      "addCompanyTeammateGroupTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add teammate group teams",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "remove-company-teammate-group-teams": {
    "accessPath": [
      "removeCompanyTeammateGroupTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "team_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/teammate_groups/{teammate_group_id}/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove teammate group teams",
    "parameterDescriptions": {
      "teammate_group_id": "The teammate group ID."
    }
  },
  "list-teammates": {
    "accessPath": [
      "listTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammates"
  },
  "list-teammate-custom-fields": {
    "accessPath": [
      "listTeammateCustomFields"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/custom_fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Teammate's custom fields"
  },
  "get-teammate": {
    "accessPath": [
      "getTeammate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get teammate",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "update-teammate": {
    "accessPath": [
      "updateTeammate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "username",
      "first_name",
      "last_name",
      "is_available",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/teammates/{teammate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update teammate",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-channels": {
    "accessPath": [
      "listTeammateChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate channels",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-groups": {
    "accessPath": [
      "listTeammateGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/contact_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate groups",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "create-teammate-group": {
    "accessPath": [
      "createTeammateGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/contact_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate group",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-contact-lists": {
    "accessPath": [
      "listTeammateContactLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/contact_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate contact lists",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "create-teammate-contact-list": {
    "accessPath": [
      "createTeammateContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/contact_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate contact list",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-contacts": {
    "accessPath": [
      "listTeammateContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List teammate contacts",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `updated_after` and `updated_before`, whose value should be a timestamp in seconds with up to 3 decimal places.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the contacts. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-teammate-contact": {
    "accessPath": [
      "createTeammateContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "avatar",
      "links",
      "group_names",
      "list_names",
      "custom_fields",
      "handles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate contact",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-assigned-conversations": {
    "accessPath": [
      "listAssignedConversations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token"
    ],
    "description": "List assigned conversations",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with a property `statuses`, whose value should be a list of conversation statuses (`assigned`, `unassigned`, `archived`, or `trashed`). If ticketing is enabled, this endpoint accepts either `status_categories` (`open`, `waiting`, `resolved`) or `status_ids` as an alternative.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "list-teammate-inboxes": {
    "accessPath": [
      "listTeammateInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate inboxes",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-folders": {
    "accessPath": [
      "listTeammateFolders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order"
    ],
    "description": "List teammate folders",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "sort_by": "Field used to sort the message template folders. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-teammate-folder": {
    "accessPath": [
      "createTeammateFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate folder",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-message-templates": {
    "accessPath": [
      "listTeammateMessageTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order"
    ],
    "description": "List teammate message templates",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "sort_by": "Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-teammate-message-template": {
    "accessPath": [
      "createTeammateMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "subject",
      "body",
      "folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate message template",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-private-inboxes": {
    "accessPath": [
      "listTeammatePrivateInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/private_inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate private inboxes",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID"
    }
  },
  "create-teammate-private-inbox": {
    "accessPath": [
      "createTeammatePrivateInbox"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/private_inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate private inbox",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID"
    }
  },
  "list-teammate-rules": {
    "accessPath": [
      "listTeammateRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate rules",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-shifts": {
    "accessPath": [
      "listTeammateShifts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/shifts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Teammate Shifts",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-signatures": {
    "accessPath": [
      "listTeammateSignatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/signatures",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teammate signatures",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "create-teammate-signature": {
    "accessPath": [
      "createTeammateSignature"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "sender_info",
      "body",
      "is_default",
      "channel_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/signatures",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate signature",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-tags": {
    "accessPath": [
      "listTeammateTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List teammate tags",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1).",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the tags. Only supports `id`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-teammate-tag": {
    "accessPath": [
      "createTeammateTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "highlight",
      "is_visible_in_conversation_lists"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create teammate tag",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teammate-time-offs": {
    "accessPath": [
      "listTeammateTimeOffs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teammates/{teammate_id}/time_offs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "q"
    ],
    "description": "List teammate time offs",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `active_from` and `active_until`, whose value should be a timestamp in seconds with up to 3 decimal places."
    }
  },
  "create-time-off": {
    "accessPath": [
      "createTimeOff"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "start_at",
      "end_at",
      "auto_responder"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teammates/{teammate_id}/time_offs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "teammate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create time off",
    "parameterDescriptions": {
      "teammate_id": "The teammate ID. Alternatively, you can supply an email as a [resource alias](https://dev.frontapp.com/docs/resource-aliases-1)."
    }
  },
  "list-teams": {
    "accessPath": [
      "listTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List teams"
  },
  "get-team": {
    "accessPath": [
      "getTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get team",
    "parameterDescriptions": {
      "team_id": "The Team ID"
    }
  },
  "list-team-channels": {
    "accessPath": [
      "listTeamChannels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team channels",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-groups": {
    "accessPath": [
      "listTeamGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/contact_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team groups",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "create-team-group": {
    "accessPath": [
      "createTeamGroup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/contact_groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team group",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-contact-lists": {
    "accessPath": [
      "listTeamContactLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/contact_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team contact lists",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "create-team-contact-list": {
    "accessPath": [
      "createTeamContactList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/contact_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team contact list",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-contacts": {
    "accessPath": [
      "listTeamContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "q",
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List team contacts",
    "parameterDescriptions": {
      "team_id": "The team ID",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `updated_after` and `updated_before`, whose value should be a timestamp in seconds with up to 3 decimal places.",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the contacts. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-team-contact": {
    "accessPath": [
      "createTeamContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "avatar",
      "links",
      "group_names",
      "list_names",
      "custom_fields",
      "handles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team contact",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-inboxes": {
    "accessPath": [
      "listTeamInboxes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team inboxes",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "create-team-inbox": {
    "accessPath": [
      "createTeamInbox"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "teammate_ids",
      "is_public",
      "custom_fields"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/inboxes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team inbox",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-folders": {
    "accessPath": [
      "listTeamFolders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order"
    ],
    "description": "List team folders",
    "parameterDescriptions": {
      "team_id": "The team ID",
      "sort_by": "Field used to sort the message template folders. Either `created_at` or `updated_at`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-team-folder": {
    "accessPath": [
      "createTeamFolder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/message_template_folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team folder",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-message-templates": {
    "accessPath": [
      "listTeamMessageTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort_by",
      "sort_order"
    ],
    "description": "List team message templates",
    "parameterDescriptions": {
      "team_id": "The team ID",
      "sort_by": "Field used to sort the message templates. Either `created_at`, `updated_at`, or `sort_order`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-team-message-template": {
    "accessPath": [
      "createTeamMessageTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "subject",
      "body",
      "folder_id",
      "inbox_ids",
      "attachments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/message_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team message template",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-rules": {
    "accessPath": [
      "listTeamRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team rules",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-shifts": {
    "accessPath": [
      "listTeamShifts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/shifts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team Shifts",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "create-team-shift": {
    "accessPath": [
      "createTeamShift"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "color",
      "timezone",
      "times",
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/shifts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team shift",
    "parameterDescriptions": {
      "team_id": "The Team ID"
    }
  },
  "list-team-signatures": {
    "accessPath": [
      "listTeamSignatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/signatures",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List team signatures",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "create-team-signature": {
    "accessPath": [
      "createTeamSignature"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "sender_info",
      "body",
      "is_visible_for_all_teammate_channels",
      "is_default",
      "channel_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/signatures",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team signature",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "list-team-tags": {
    "accessPath": [
      "listTeamTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "sort_by",
      "sort_order"
    ],
    "description": "List team tags",
    "parameterDescriptions": {
      "team_id": "The team ID",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "sort_by": "Field used to sort the tags. Only supports `id`.",
      "sort_order": "Order by which results should be sorted"
    }
  },
  "create-team-tag": {
    "accessPath": [
      "createTeamTag"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "description",
      "highlight",
      "is_visible_in_conversation_lists"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team tag",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "add-teammates-to-team": {
    "accessPath": [
      "addTeammatesToTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add teammates to team",
    "parameterDescriptions": {
      "team_id": "The Team ID"
    }
  },
  "remove-teammates-from-team": {
    "accessPath": [
      "removeTeammatesFromTeam"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/teams/{team_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove teammates from team",
    "parameterDescriptions": {
      "team_id": "The Team ID"
    }
  },
  "list-team-time-offs": {
    "accessPath": [
      "listTeamTimeOffs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/time_offs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token",
      "q"
    ],
    "description": "List team time offs",
    "parameterDescriptions": {
      "team_id": "The team ID",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)",
      "q": "[Search query object](https://dev.frontapp.com/docs/query-object-q) with the optional properties `active_from` and `active_until`, whose value should be a timestamp in seconds with up to 3 decimal places."
    }
  },
  "list-team-views": {
    "accessPath": [
      "listTeamViews"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/teams/{team_id}/views",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "List team views",
    "parameterDescriptions": {
      "team_id": "The team ID",
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "create-team-view": {
    "accessPath": [
      "createTeamView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "inbox_ids",
      "tag_ids",
      "not_tag_ids",
      "no_tags",
      "assignee_ids",
      "not_assignee_ids",
      "highlight"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/teams/{team_id}/views",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create team view",
    "parameterDescriptions": {
      "team_id": "The team ID"
    }
  },
  "get-time-off": {
    "accessPath": [
      "getTimeOff"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/time_offs/{time_off_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_off_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get time off",
    "parameterDescriptions": {
      "time_off_id": "The time off ID"
    }
  },
  "update-time-off": {
    "accessPath": [
      "updateTimeOff"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "start_at",
      "end_at",
      "auto_responder"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/time_offs/{time_off_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_off_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update time off",
    "parameterDescriptions": {
      "time_off_id": "The time off ID"
    }
  },
  "delete-time-off": {
    "accessPath": [
      "deleteTimeOff"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/time_offs/{time_off_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "time_off_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete time off",
    "parameterDescriptions": {
      "time_off_id": "The time off ID"
    }
  },
  "list-views": {
    "accessPath": [
      "listViews"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/views",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page_token"
    ],
    "description": "List views",
    "parameterDescriptions": {
      "limit": "Max number of results per [page](https://dev.frontapp.com/docs/pagination)",
      "page_token": "Token to use to request the [next page](https://dev.frontapp.com/docs/pagination)"
    }
  },
  "get-view": {
    "accessPath": [
      "getView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/views/{view_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "view_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get view",
    "parameterDescriptions": {
      "view_id": "The view ID"
    }
  },
  "update-view": {
    "accessPath": [
      "updateView"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "inbox_ids",
      "tag_ids",
      "not_tag_ids",
      "no_tags",
      "assignee_ids",
      "not_assignee_ids",
      "highlight"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/views/{view_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "view_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update view",
    "parameterDescriptions": {
      "view_id": "The view ID"
    }
  },
  "add-view-teammates": {
    "accessPath": [
      "addViewTeammates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "teammate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/views/{view_id}/teammates",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "view_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add view to teammate sidebars",
    "parameterDescriptions": {
      "view_id": "The view ID"
    }
  }
} satisfies ToolRuntimeMetadataMap;
