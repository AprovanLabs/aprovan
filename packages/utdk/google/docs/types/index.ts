import type { BatchUpdateDocumentResponse, Body, Document, DocumentStyle, Footer, Footnote, Header, InlineObject, List, NamedRanges, NamedStyles, PositionedObject, Request, SuggestedDocumentStyle, SuggestedNamedStyles, WriteControl } from "./schemas.js";

export type GoogleDocsClient = {
  /**
   * Creates a blank document using the title given in the request. Other fields in the request, including any provided content, are ignored. Returns the created document.
   */
  docsDocumentsCreate: (input: {
    /** Output only. The main body of the document. */
    body?: Body;
    /** Output only. The ID of the document. */
    documentId?: string;
    /** Output only. The style of the document. */
    documentStyle?: DocumentStyle;
    /** Output only. The footers in the document, keyed by footer ID. */
    footers?: { [key: string]: Footer | undefined };
    /** Output only. The footnotes in the document, keyed by footnote ID. */
    footnotes?: { [key: string]: Footnote | undefined };
    /** Output only. The headers in the document, keyed by header ID. */
    headers?: { [key: string]: Header | undefined };
    /** Output only. The inline objects in the document, keyed by object ID. */
    inlineObjects?: { [key: string]: InlineObject | undefined };
    /** Output only. The lists in the document, keyed by list ID. */
    lists?: { [key: string]: List | undefined };
    /** Output only. The named ranges in the document, keyed by name. */
    namedRanges?: { [key: string]: NamedRanges | undefined };
    /** Output only. The named styles of the document. */
    namedStyles?: NamedStyles;
    /** Output only. The positioned objects in the document, keyed by object ID. */
    positionedObjects?: { [key: string]: PositionedObject | undefined };
    /** Output only. The revision ID of the document. Can be used in update requests to specify which revision of a document to apply updates to and how the request should behave if the document has been edited since that revision. Only populated if the user has edit access to the document. The revision ID is not a sequential number but an opaque string. The format of the revision ID might change over time. A returned revision ID is only guaranteed to be valid for 24 hours after it has been returned and cannot be shared across users. If the revision ID is unchanged between calls, then the document has not changed. Conversely, a changed ID (for the same document and user) usually means the document has been updated. However, a changed ID can also be due to internal factors such as ID format changes. */
    revisionId?: string;
    /** Output only. The suggested changes to the style of the document, keyed by suggestion ID. */
    suggestedDocumentStyleChanges?: { [key: string]: SuggestedDocumentStyle | undefined };
    /** Output only. The suggested changes to the named styles of the document, keyed by suggestion ID. */
    suggestedNamedStylesChanges?: { [key: string]: SuggestedNamedStyles | undefined };
    /** Output only. The suggestions view mode applied to the document. Note: When editing a document, changes must be based on a document with SUGGESTIONS_INLINE. */
    suggestionsViewMode?: "DEFAULT_FOR_CURRENT_ACCESS" | "SUGGESTIONS_INLINE" | "PREVIEW_SUGGESTIONS_ACCEPTED" | "PREVIEW_WITHOUT_SUGGESTIONS";
    /** The title of the document. */
    title?: string;
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
  }) => Promise<Document>;

  /**
   * Gets the latest version of the specified document.
   */
  docsDocumentsGet: (input: {
    /** The ID of the document to retrieve. */
    documentId: string;
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
    /** The suggestions view mode to apply to the document. This allows viewing the document with all suggestions inline, accepted or rejected. If one is not specified, DEFAULT_FOR_CURRENT_ACCESS is used. */
    suggestionsViewMode?: "DEFAULT_FOR_CURRENT_ACCESS" | "SUGGESTIONS_INLINE" | "PREVIEW_SUGGESTIONS_ACCEPTED" | "PREVIEW_WITHOUT_SUGGESTIONS";
  }) => Promise<Document>;

  /**
   * Applies one or more updates to the document. Each request is validated before being applied. If any request is not valid, then the entire request will fail and nothing will be applied. Some requests have replies to give you some information about how they are applied. Other requests do not need to return information; these each return an empty reply. The order of replies matches that of the requests. For example, suppose you call batchUpdate with four updates, and only the third one returns information. The response would have two empty replies, the reply to the third request, and another empty reply, in that order. Because other users may be editing the document, the document might not exactly reflect your changes: your changes may be altered with respect to collaborator changes. If there are no collaborators, the document should reflect your changes. In any case, the updates in your request are guaranteed to be applied together atomically.
   */
  docsDocumentsBatchUpdate: (input: {
    /** A list of updates to apply to the document. */
    requests?: (Request)[];
    /** Provides control over how write requests are executed. */
    writeControl?: WriteControl;
    /** The ID of the document to update. */
    documentId: string;
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
  }) => Promise<BatchUpdateDocumentResponse>;
};

export * from "./schemas.js";
