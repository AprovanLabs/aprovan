/** Auto-forwarding settings for an account. */
export type AutoForwarding = {
  /** The state that a message should be left in after it has been forwarded. */
  disposition?: "dispositionUnspecified" | "leaveInInbox" | "archive" | "trash" | "markRead";
  /** Email address to which all incoming messages are forwarded. This email address must be a verified member of the forwarding addresses. */
  emailAddress?: string;
  /** Whether all incoming mail is automatically forwarded to another address. */
  enabled?: boolean;
};

export type BatchDeleteMessagesRequest = {
  /** The IDs of the messages to delete. */
  ids?: (string)[];
};

export type BatchModifyMessagesRequest = {
  /** A list of label IDs to add to messages. */
  addLabelIds?: (string)[];
  /** The IDs of the messages to modify. There is a limit of 1000 ids per request. */
  ids?: (string)[];
  /** A list of label IDs to remove from messages. */
  removeLabelIds?: (string)[];
};

/** The client-side encryption (CSE) configuration for the email address of an authenticated user. Gmail uses CSE configurations to save drafts of client-side encrypted email messages, and to sign and send encrypted email messages. */
export type CseIdentity = {
  /** The email address for the sending identity. The email address must be the primary email address of the authenticated user. */
  emailAddress?: string;
  /** If a key pair is associated, the identifier of the key pair, CseKeyPair. */
  primaryKeyPairId?: string;
};

/** A client-side encryption S/MIME key pair, which is comprised of a public key, its certificate chain, and metadata for its paired private key. Gmail uses the key pair to complete the following tasks: - Sign outgoing client-side encrypted messages. - Save and reopen drafts of client-side encrypted messages. - Save and reopen sent messages. - Decrypt incoming or archived S/MIME messages. */
export type CseKeyPair = {
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
};

/** Metadata for a private key instance. */
export type CsePrivateKeyMetadata = {
  /** Metadata for a private key instance managed by an external key access control list service. */
  kaclsKeyMetadata?: KaclsKeyMetadata;
  /** Output only. The immutable ID for the private key metadata instance. */
  privateKeyMetadataId?: string;
};

/** Settings for a delegate. Delegates can read, send, and delete messages, as well as view and add contacts, for the delegator's account. See "Set up mail delegation" for more information about delegates. */
export type Delegate = {
  /** The email address of the delegate. */
  delegateEmail?: string;
  /** Indicates whether this address has been verified and can act as a delegate for the account. Read-only. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending" | "rejected" | "expired";
};

/** Requests to turn off a client-side encryption key pair. */
export type DisableCseKeyPairRequest = { [key: string]: unknown };

/** A draft email in the user's mailbox. */
export type Draft = {
  /** The immutable ID of the draft. */
  id?: string;
  /** The message content of the draft. */
  message?: Message;
};

/** Requests to turn on a client-side encryption key pair. */
export type EnableCseKeyPairRequest = { [key: string]: unknown };

/** Resource definition for Gmail filters. Filters apply to specific messages instead of an entire email thread. */
export type Filter = {
  /** Action that the filter performs. */
  action?: FilterAction;
  /** Matching criteria for the filter. */
  criteria?: FilterCriteria;
  /** The server assigned ID of the filter. */
  id?: string;
};

/** A set of actions to perform on a message. */
export type FilterAction = {
  /** List of labels to add to the message. */
  addLabelIds?: (string)[];
  /** Email address that the message should be forwarded to. */
  forward?: string;
  /** List of labels to remove from the message. */
  removeLabelIds?: (string)[];
};

/** Message matching criteria. */
export type FilterCriteria = {
  /** Whether the response should exclude chats. */
  excludeChats?: boolean;
  /** The sender's display name or email address. */
  from?: string;
  /** Whether the message has any attachment. */
  hasAttachment?: boolean;
  /** Only return messages not matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. */
  negatedQuery?: string;
  /** Only return messages matching the specified query. Supports the same query format as the Gmail search box. For example, `"from:someuser@example.com rfc822msgid: is:unread"`. */
  query?: string;
  /** The size of the entire RFC822 message in bytes, including all headers and attachments. */
  size?: number;
  /** How the message size in bytes should be in relation to the size field. */
  sizeComparison?: "unspecified" | "smaller" | "larger";
  /** Case-insensitive phrase found in the message's subject. Trailing and leading whitespace are be trimmed and adjacent spaces are collapsed. */
  subject?: string;
  /** The recipient's display name or email address. Includes recipients in the "to", "cc", and "bcc" header fields. You can use simply the local part of the email address. For example, "example" and "example@" both match "example@gmail.com". This field is case-insensitive. */
  to?: string;
};

/** Settings for a forwarding address. */
export type ForwardingAddress = {
  /** An email address to which messages can be forwarded. */
  forwardingEmail?: string;
  /** Indicates whether this address has been verified and is usable for forwarding. Read-only. */
  verificationStatus?: "verificationStatusUnspecified" | "accepted" | "pending";
};

/** A record of a change to the user's mailbox. Each history change may affect multiple messages in multiple ways. */
export type History = {
  /** The mailbox sequence ID. */
  id?: string;
  /** Labels added to messages in this history record. */
  labelsAdded?: (HistoryLabelAdded)[];
  /** Labels removed from messages in this history record. */
  labelsRemoved?: (HistoryLabelRemoved)[];
  /** List of messages changed in this history record. The fields for specific change types, such as `messagesAdded` may duplicate messages in this field. We recommend using the specific change-type fields instead of this. */
  messages?: (Message)[];
  /** Messages added to the mailbox in this history record. */
  messagesAdded?: (HistoryMessageAdded)[];
  /** Messages deleted (not Trashed) from the mailbox in this history record. */
  messagesDeleted?: (HistoryMessageDeleted)[];
};

export type HistoryLabelAdded = {
  /** Label IDs added to the message. */
  labelIds?: (string)[];
  message?: Message;
};

export type HistoryLabelRemoved = {
  /** Label IDs removed from the message. */
  labelIds?: (string)[];
  message?: Message;
};

export type HistoryMessageAdded = {
  message?: Message;
};

export type HistoryMessageDeleted = {
  message?: Message;
};

/** IMAP settings for an account. */
export type ImapSettings = {
  /** If this value is true, Gmail will immediately expunge a message when it is marked as deleted in IMAP. Otherwise, Gmail will wait for an update from the client before expunging messages marked as deleted. */
  autoExpunge?: boolean;
  /** Whether IMAP is enabled for the account. */
  enabled?: boolean;
  /** The action that will be executed on a message when it is marked as deleted and expunged from the last visible IMAP folder. */
  expungeBehavior?: "expungeBehaviorUnspecified" | "archive" | "trash" | "deleteForever";
  /** An optional limit on the number of messages that an IMAP folder may contain. Legal values are 0, 1000, 2000, 5000 or 10000. A value of zero is interpreted to mean that there is no limit. */
  maxFolderSize?: number;
};

/** Metadata for private keys managed by an external key access control list service. For details about managing key access, see [Google Workspace CSE API Reference](https://developers.google.com/workspace/cse/reference). */
export type KaclsKeyMetadata = {
  /** Opaque data generated and used by the key access control list service. Maximum size: 8 KiB. */
  kaclsData?: string;
  /** The URI of the key access control list service that manages the private key. */
  kaclsUri?: string;
};

/** Labels are used to categorize messages and threads within the user's mailbox. The maximum number of labels supported for a user's mailbox is 10,000. */
export type Label = {
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
};

export type LabelColor = {
  /** The background color represented as hex string #RRGGBB (ex #000000). This field is required in order to set the color of a label. Only the following predefined set of color values are allowed: \#000000, #434343, #666666, #999999, #cccccc, #efefef, #f3f3f3, #ffffff, \#fb4c2f, #ffad47, #fad165, #16a766, #43d692, #4a86e8, #a479e2, #f691b3, \#f6c5be, #ffe6c7, #fef1d1, #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, \#efa093, #ffd6a2, #fce8b3, #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, \#e66550, #ffbc6b, #fcda83, #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, \#cc3a21, #eaa041, #f2c960, #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, \#ac2b16, #cf8933, #d5ae49, #0b804b, #2a9c68, #285bac, #653e9b, #b65775, \#822111, #a46a21, #aa8831, #076239, #1a764d, #1c4587, #41236d, #83334c \#464646, #e7e7e7, #0d3472, #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, \#711a36, #fbd3e0, #8a1c0a, #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, \#594c05, #fbe983, #684e07, #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, \#c2c2c2, #4986e7, #2da2bb, #b99aff, #994a64, #f691b2, #ff7537, #ffad46, \#662e37, #ebdbde, #cca6ac, #094228, #42d692, #16a765 */
  backgroundColor?: string;
  /** The text color of the label, represented as hex string. This field is required in order to set the color of a label. Only the following predefined set of color values are allowed: \#000000, #434343, #666666, #999999, #cccccc, #efefef, #f3f3f3, #ffffff, \#fb4c2f, #ffad47, #fad165, #16a766, #43d692, #4a86e8, #a479e2, #f691b3, \#f6c5be, #ffe6c7, #fef1d1, #b9e4d0, #c6f3de, #c9daf8, #e4d7f5, #fcdee8, \#efa093, #ffd6a2, #fce8b3, #89d3b2, #a0eac9, #a4c2f4, #d0bcf1, #fbc8d9, \#e66550, #ffbc6b, #fcda83, #44b984, #68dfa9, #6d9eeb, #b694e8, #f7a7c0, \#cc3a21, #eaa041, #f2c960, #149e60, #3dc789, #3c78d8, #8e63ce, #e07798, \#ac2b16, #cf8933, #d5ae49, #0b804b, #2a9c68, #285bac, #653e9b, #b65775, \#822111, #a46a21, #aa8831, #076239, #1a764d, #1c4587, #41236d, #83334c \#464646, #e7e7e7, #0d3472, #b6cff5, #0d3b44, #98d7e4, #3d188e, #e3d7ff, \#711a36, #fbd3e0, #8a1c0a, #f2b2a8, #7a2e0b, #ffc8af, #7a4706, #ffdeb5, \#594c05, #fbe983, #684e07, #fdedc1, #0b4f30, #b3efd3, #04502e, #a2dcc1, \#c2c2c2, #4986e7, #2da2bb, #b99aff, #994a64, #f691b2, #ff7537, #ffad46, \#662e37, #ebdbde, #cca6ac, #094228, #42d692, #16a765 */
  textColor?: string;
};

/** Language settings for an account. These settings correspond to the "Language settings" feature in the web interface. */
export type LanguageSettings = {
  /** The language to display Gmail in, formatted as an RFC 3066 Language Tag (for example `en-GB`, `fr` or `ja` for British English, French, or Japanese respectively). The set of languages supported by Gmail evolves over time, so please refer to the "Language" dropdown in the Gmail settings for all available options, as described in the language settings help article. A table of sample values is also provided in the Managing Language Settings guide Not all Gmail clients can display the same set of languages. In the case that a user's display language is not available for use on a particular client, said client automatically chooses to display in the closest supported variant (or a reasonable default). */
  displayLanguage?: string;
};

export type ListCseIdentitiesResponse = {
  /** One page of the list of CSE identities configured for the user. */
  cseIdentities?: (CseIdentity)[];
  /** Pagination token to be passed to a subsequent ListCseIdentities call in order to retrieve the next page of identities. If this value is not returned or is the empty string, then no further pages remain. */
  nextPageToken?: string;
};

export type ListCseKeyPairsResponse = {
  /** One page of the list of CSE key pairs installed for the user. */
  cseKeyPairs?: (CseKeyPair)[];
  /** Pagination token to be passed to a subsequent ListCseKeyPairs call in order to retrieve the next page of key pairs. If this value is not returned, then no further pages remain. */
  nextPageToken?: string;
};

/** Response for the ListDelegates method. */
export type ListDelegatesResponse = {
  /** List of the user's delegates (with any verification status). If an account doesn't have delegates, this field doesn't appear. */
  delegates?: (Delegate)[];
};

export type ListDraftsResponse = {
  /** List of drafts. Note that the `Message` property in each `Draft` resource only contains an `id` and a `threadId`. The messages.get method can fetch additional message details. */
  drafts?: (Draft)[];
  /** Token to retrieve the next page of results in the list. */
  nextPageToken?: string;
  /** Estimated total number of results. */
  resultSizeEstimate?: number;
};

/** Response for the ListFilters method. */
export type ListFiltersResponse = {
  /** List of a user's filters. */
  filter?: (Filter)[];
};

/** Response for the ListForwardingAddresses method. */
export type ListForwardingAddressesResponse = {
  /** List of addresses that may be used for forwarding. */
  forwardingAddresses?: (ForwardingAddress)[];
};

export type ListHistoryResponse = {
  /** List of history records. Any `messages` contained in the response will typically only have `id` and `threadId` fields populated. */
  history?: (History)[];
  /** The ID of the mailbox's current history record. */
  historyId?: string;
  /** Page token to retrieve the next page of results in the list. */
  nextPageToken?: string;
};

export type ListLabelsResponse = {
  /** List of labels. Note that each label resource only contains an `id`, `name`, `messageListVisibility`, `labelListVisibility`, and `type`. The labels.get method can fetch additional label details. */
  labels?: (Label)[];
};

export type ListMessagesResponse = {
  /** List of messages. Note that each message resource contains only an `id` and a `threadId`. Additional message details can be fetched using the messages.get method. */
  messages?: (Message)[];
  /** Token to retrieve the next page of results in the list. */
  nextPageToken?: string;
  /** Estimated total number of results. */
  resultSizeEstimate?: number;
};

/** Response for the ListSendAs method. */
export type ListSendAsResponse = {
  /** List of send-as aliases. */
  sendAs?: (SendAs)[];
};

export type ListSmimeInfoResponse = {
  /** List of SmimeInfo. */
  smimeInfo?: (SmimeInfo)[];
};

export type ListThreadsResponse = {
  /** Page token to retrieve the next page of results in the list. */
  nextPageToken?: string;
  /** Estimated total number of results. */
  resultSizeEstimate?: number;
  /** List of threads. Note that each thread resource does not contain a list of `messages`. The list of `messages` for a given thread can be fetched using the threads.get method. */
  threads?: (Thread)[];
};

/** An email message. */
export type Message = {
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
};

/** A single MIME message part. */
export type MessagePart = {
  /** The message part body for this part, which may be empty for container MIME message parts. */
  body?: MessagePartBody;
  /** The filename of the attachment. Only present if this message part represents an attachment. */
  filename?: string;
  /** List of headers on this message part. For the top-level message part, representing the entire message payload, it will contain the standard RFC 2822 email headers such as `To`, `From`, and `Subject`. */
  headers?: (MessagePartHeader)[];
  /** The MIME type of the message part. */
  mimeType?: string;
  /** The immutable ID of the message part. */
  partId?: string;
  /** The child MIME message parts of this part. This only applies to container MIME message parts, for example `multipart/*`. For non- container MIME message part types, such as `text/plain`, this field is empty. For more information, see RFC 1521. */
  parts?: (MessagePart)[];
};

/** The body of a single MIME message part. */
export type MessagePartBody = {
  /** When present, contains the ID of an external attachment that can be retrieved in a separate `messages.attachments.get` request. When not present, the entire content of the message part body is contained in the data field. */
  attachmentId?: string;
  /** The body data of a MIME message part as a base64url encoded string. May be empty for MIME container types that have no message body or when the body data is sent as a separate attachment. An attachment ID is present if the body data is contained in a separate attachment. */
  data?: string;
  /** Number of bytes for the message part data (encoding notwithstanding). */
  size?: number;
};

export type MessagePartHeader = {
  /** The name of the header before the `:` separator. For example, `To`. */
  name?: string;
  /** The value of the header after the `:` separator. For example, `someuser@example.com`. */
  value?: string;
};

export type ModifyMessageRequest = {
  /** A list of IDs of labels to add to this message. You can add up to 100 labels with each update. */
  addLabelIds?: (string)[];
  /** A list IDs of labels to remove from this message. You can remove up to 100 labels with each update. */
  removeLabelIds?: (string)[];
};

export type ModifyThreadRequest = {
  /** A list of IDs of labels to add to this thread. You can add up to 100 labels with each update. */
  addLabelIds?: (string)[];
  /** A list of IDs of labels to remove from this thread. You can remove up to 100 labels with each update. */
  removeLabelIds?: (string)[];
};

/** Request to obliterate a CSE key pair. */
export type ObliterateCseKeyPairRequest = { [key: string]: unknown };

/** POP settings for an account. */
export type PopSettings = {
  /** The range of messages which are accessible via POP. */
  accessWindow?: "accessWindowUnspecified" | "disabled" | "fromNowOn" | "allMail";
  /** The action that will be executed on a message after it has been fetched via POP. */
  disposition?: "dispositionUnspecified" | "leaveInInbox" | "archive" | "trash" | "markRead";
};

/** Profile for a Gmail user. */
export type Profile = {
  /** The user's email address. */
  emailAddress?: string;
  /** The ID of the mailbox's current history record. */
  historyId?: string;
  /** The total number of messages in the mailbox. */
  messagesTotal?: number;
  /** The total number of threads in the mailbox. */
  threadsTotal?: number;
};

/** Settings associated with a send-as alias, which can be either the primary login address associated with the account or a custom "from" address. Send-as aliases correspond to the "Send Mail As" feature in the web interface. */
export type SendAs = {
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
};

/** An S/MIME email config. */
export type SmimeInfo = {
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
};

/** Configuration for communication with an SMTP service. */
export type SmtpMsa = {
  /** The hostname of the SMTP service. Required. */
  host?: string;
  /** The password that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses. */
  password?: string;
  /** The port of the SMTP service. Required. */
  port?: number;
  /** The protocol that will be used to secure communication with the SMTP service. Required. */
  securityMode?: "securityModeUnspecified" | "none" | "ssl" | "starttls";
  /** The username that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses. */
  username?: string;
};

/** A collection of messages representing a conversation. */
export type Thread = {
  /** The ID of the last history record that modified this thread. */
  historyId?: string;
  /** The unique ID of the thread. */
  id?: string;
  /** The list of messages in the thread. */
  messages?: (Message)[];
  /** A short part of the message text. */
  snippet?: string;
};

/** Vacation auto-reply settings for an account. These settings correspond to the "Vacation responder" feature in the web interface. */
export type VacationSettings = {
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
};

/** Set up or update a new push notification watch on this user's mailbox. */
export type WatchRequest = {
  /** Filtering behavior of labelIds list specified. */
  labelFilterAction?: "include" | "exclude";
  /** List of label_ids to restrict notifications about. By default, if unspecified, all changes are pushed out. If specified then dictates which labels are required for a push notification to be generated. */
  labelIds?: (string)[];
  /** A fully qualified Google Cloud Pub/Sub API topic name to publish the events to. This topic name **must** already exist in Cloud Pub/Sub and you **must** have already granted gmail "publish" permission on it. For example, "projects/my-project-identifier/topics/my-topic-name" (using the Cloud Pub/Sub "v1" topic naming format). Note that the "my-project-identifier" portion must exactly match your Google developer project id (the one executing this watch request). */
  topicName?: string;
};

/** Push notification watch response. */
export type WatchResponse = {
  /** When Gmail will stop sending notifications for mailbox updates (epoch millis). Call `watch` again before this time to renew the watch. */
  expiration?: string;
  /** The ID of the mailbox's current history record. */
  historyId?: string;
};
