import type { Annotation, Annotations, AnnotationsSummary, Annotationsdata, BooksAnnotationsRange, BooksCloudloadingResource, BooksVolumesRecommendedRateResponse, Bookshelf, Bookshelves, Category, DictionaryAnnotationdata, Discoveryclusters, DownloadAccesses, Empty, FamilyInfo, Layersummaries, Layersummary, Metadata, Notification, Offers, ReadingPosition, RequestAccessData, Series, Seriesmembership, Usersettings, Volume, Volume2, Volumeannotation, Volumeannotations, Volumes } from "./schemas.js";

export type GoogleBooksClient = {
  /**
   * Add a user-upload volume and triggers processing.
   */
  booksCloudloadingAddBook: (input: {
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
    /** A drive document id. The upload_client_token must not be set. */
    drive_document_id?: string;
    /** The document MIME type. It can be set only if the drive_document_id is set. */
    mime_type?: string;
    /** The document name. It can be set only if the drive_document_id is set. */
    name?: string;
    /** Scotty upload token. */
    upload_client_token?: string;
  }) => Promise<BooksCloudloadingResource>;

  /**
   * Remove the book and its contents
   */
  booksCloudloadingDeleteBook: (input: {
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
    /** The id of the book to be removed. */
    volumeId: string;
  }) => Promise<Empty>;

  /**
   * Updates a user-upload volume.
   */
  booksCloudloadingUpdateBook: (input: {
    author?: string;
    processingState?: string;
    title?: string;
    volumeId?: string;
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
  }) => Promise<BooksCloudloadingResource>;

  /**
   * Returns a list of offline dictionary metadata available
   */
  booksDictionaryListOfflineMetadata: (input: {
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
    /** The device/version ID from which to request the data. */
    cpksver: string;
  }) => Promise<Metadata>;

  /**
   * Gets information regarding the family that the user is part of.
   */
  booksFamilysharingGetFamilyInfo: (input: {
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<FamilyInfo>;

  /**
   * Initiates sharing of the content with the user's family. Empty response indicates success.
   */
  booksFamilysharingShare: (input: {
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
    /** The docid to share. */
    docId?: string;
    /** String to identify the originator of this request. */
    source?: string;
    /** The volume to share. */
    volumeId?: string;
  }) => Promise<Empty>;

  /**
   * Initiates revoking content that has already been shared with the user's family. Empty response indicates success.
   */
  booksFamilysharingUnshare: (input: {
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
    /** The docid to unshare. */
    docId?: string;
    /** String to identify the originator of this request. */
    source?: string;
    /** The volume to unshare. */
    volumeId?: string;
  }) => Promise<Empty>;

  /**
   * Gets the current settings for the user.
   */
  booksMyconfigGetUserSettings: (input: {
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
    /** Unused. Added only to workaround TEX mandatory request template requirement */
    country?: string;
  }) => Promise<Usersettings>;

  /**
   * Release downloaded content access restriction.
   */
  booksMyconfigReleaseDownloadAccess: (input: {
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
    /** The device/version ID from which to release the restriction. */
    cpksver: string;
    /** The volume(s) to release restrictions for. */
    volumeIds: (string)[];
    /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
    locale?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<DownloadAccesses>;

  /**
   * Request concurrent and download access restrictions.
   */
  booksMyconfigRequestAccess: (input: {
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
    /** The device/version ID from which to request the restrictions. */
    cpksver: string;
    /** The client nonce value. */
    nonce: string;
    /** String to identify the originator of this request. */
    source: string;
    /** The volume to request concurrent/download restrictions for. */
    volumeId: string;
    /** The type of access license to request. If not specified, the default is BOTH. */
    licenseTypes?: "LICENSE_TYPES_UNDEFINED" | "BOTH" | "CONCURRENT" | "DOWNLOAD";
    /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
    locale?: string;
  }) => Promise<RequestAccessData>;

  /**
   * Request downloaded content access for specified volumes on the My eBooks shelf.
   */
  booksMyconfigSyncVolumeLicenses: (input: {
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
    /** The device/version ID from which to release the restriction. */
    cpksver: string;
    /** The client nonce value. */
    nonce: string;
    /** String to identify the originator of this request. */
    source: string;
    /** List of features supported by the client, i.e., 'RENTALS' */
    features?: ("FEATURES_UNDEFINED" | "RENTALS")[];
    /** Set to true to include non-comics series. Defaults to false. */
    includeNonComicsSeries?: boolean;
    /** ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US. */
    locale?: string;
    /** Set to true to show pre-ordered books. Defaults to false. */
    showPreorders?: boolean;
    /** The volume(s) to request download restrictions for. */
    volumeIds?: (string)[];
  }) => Promise<Volumes>;

  /**
   * Sets the settings for the user. If a sub-object is specified, it will overwrite the existing sub-object stored in the server. Unspecified sub-objects will retain the existing value.
   */
  booksMyconfigUpdateUserSettings: (input: {
    /** Resource type. */
    kind?: string;
    /** User settings in sub-objects, each for different purposes. */
    notesExport?: { folderName?: string; isEnabled?: boolean };
    notification?: { matchMyInterests?: { opted_state?: string }; moreFromAuthors?: { opted_state?: string }; moreFromSeries?: { opted_state?: string }; priceDrop?: { opted_state?: string }; rewardExpirations?: { opted_state?: string } };
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
  }) => Promise<Usersettings>;

  /**
   * Retrieves a list of annotations, possibly filtered.
   */
  booksMylibraryAnnotationsList: (input: {
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
    /** The content version for the requested volume. */
    contentVersion?: string;
    /** The layer ID to limit annotation by. */
    layerId?: string;
    /** The layer ID(s) to limit annotation by. */
    layerIds?: (string)[];
    /** Maximum number of results to return */
    maxResults?: number;
    /** The value of the nextToken from the previous page. */
    pageToken?: string;
    /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
    showDeleted?: boolean;
    /** String to identify the originator of this request. */
    source?: string;
    /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
    updatedMax?: string;
    /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
    updatedMin?: string;
    /** The volume to restrict annotations to. */
    volumeId?: string;
  }) => Promise<Annotations>;

  /**
   * Inserts a new annotation.
   */
  booksMylibraryAnnotationsInsert: (input: {
    /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
    afterSelectedText?: string;
    /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
    beforeSelectedText?: string;
    /** Selection ranges sent from the client. */
    clientVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
    /** Timestamp for the created time of this annotation. */
    created?: string;
    /** Selection ranges for the most recent content version. */
    currentVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
    /** User-created data for this annotation. */
    data?: string;
    /** Indicates that this annotation is deleted. */
    deleted?: boolean;
    /** The highlight style for this annotation. */
    highlightStyle?: string;
    /** Id of this annotation, in the form of a GUID. */
    id?: string;
    /** Resource type. */
    kind?: string;
    /** The layer this annotation is for. */
    layerId?: string;
    layerSummary?: { allowedCharacterCount?: number; limitType?: string; remainingCharacterCount?: number };
    /** Pages that this annotation spans. */
    pageIds?: (string)[];
    /** Excerpt from the volume. */
    selectedText?: string;
    /** URL to this resource. */
    selfLink?: string;
    /** Timestamp for the last time this annotation was modified. */
    updated?: string;
    /** The volume that this annotation belongs to. */
    volumeId?: string;
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
    /** The ID for the annotation to insert. */
    annotationId?: string;
    /** ISO-3166-1 code to override the IP-based location. */
    country?: string;
    /** Requests that only the summary of the specified layer be provided in the response. */
    showOnlySummaryInResponse?: boolean;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Annotation>;

  /**
   * Gets the summary of specified layers.
   */
  booksMylibraryAnnotationsSummary: (input: {
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
    /** Array of layer IDs to get the summary for. */
    layerIds: (string)[];
    /** Volume id to get the summary for. */
    volumeId: string;
  }) => Promise<AnnotationsSummary>;

  /**
   * Deletes an annotation.
   */
  booksMylibraryAnnotationsDelete: (input: {
    /** The ID for the annotation to delete. */
    annotationId: string;
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Empty>;

  /**
   * Updates an existing annotation.
   */
  booksMylibraryAnnotationsUpdate: (input: {
    /** Anchor text after excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
    afterSelectedText?: string;
    /** Anchor text before excerpt. For requests, if the user bookmarked a screen that has no flowing text on it, then this field should be empty. */
    beforeSelectedText?: string;
    /** Selection ranges sent from the client. */
    clientVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
    /** Timestamp for the created time of this annotation. */
    created?: string;
    /** Selection ranges for the most recent content version. */
    currentVersionRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange; imageCfiRange?: BooksAnnotationsRange };
    /** User-created data for this annotation. */
    data?: string;
    /** Indicates that this annotation is deleted. */
    deleted?: boolean;
    /** The highlight style for this annotation. */
    highlightStyle?: string;
    /** Id of this annotation, in the form of a GUID. */
    id?: string;
    /** Resource type. */
    kind?: string;
    /** The layer this annotation is for. */
    layerId?: string;
    layerSummary?: { allowedCharacterCount?: number; limitType?: string; remainingCharacterCount?: number };
    /** Pages that this annotation spans. */
    pageIds?: (string)[];
    /** Excerpt from the volume. */
    selectedText?: string;
    /** URL to this resource. */
    selfLink?: string;
    /** Timestamp for the last time this annotation was modified. */
    updated?: string;
    /** The volume that this annotation belongs to. */
    volumeId?: string;
    /** The ID for the annotation to update. */
    annotationId: string;
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Annotation>;

  /**
   * Retrieves a list of bookshelves belonging to the authenticated user.
   */
  booksMylibraryBookshelvesList: (input: {
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Bookshelves>;

  /**
   * Retrieves metadata for a specific bookshelf belonging to the authenticated user.
   */
  booksMylibraryBookshelvesGet: (input: {
    /** ID of bookshelf to retrieve. */
    shelf: string;
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Bookshelf>;

  /**
   * Adds a volume to a bookshelf.
   */
  booksMylibraryBookshelvesAddVolume: (input: {
    /** ID of bookshelf to which to add a volume. */
    shelf: string;
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
    /** ID of volume to add. */
    volumeId: string;
    /** The reason for which the book is added to the library. */
    reason?: "REASON_UNDEFINED" | "IOS_PREX" | "IOS_SEARCH" | "ONBOARDING";
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Empty>;

  /**
   * Clears all volumes from a bookshelf.
   */
  booksMylibraryBookshelvesClearVolumes: (input: {
    /** ID of bookshelf from which to remove a volume. */
    shelf: string;
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Empty>;

  /**
   * Moves a volume within a bookshelf.
   */
  booksMylibraryBookshelvesMoveVolume: (input: {
    /** ID of bookshelf with the volume. */
    shelf: string;
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
    /** ID of volume to move. */
    volumeId: string;
    /** Position on shelf to move the item (0 puts the item before the current first item, 1 puts it between the first and the second and so on.) */
    volumePosition: number;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Empty>;

  /**
   * Removes a volume from a bookshelf.
   */
  booksMylibraryBookshelvesRemoveVolume: (input: {
    /** ID of bookshelf from which to remove a volume. */
    shelf: string;
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
    /** ID of volume to remove. */
    volumeId: string;
    /** The reason for which the book is removed from the library. */
    reason?: "REASON_UNDEFINED" | "ONBOARDING";
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Empty>;

  /**
   * Gets volume information for volumes on a bookshelf.
   */
  booksMylibraryBookshelvesVolumesList: (input: {
    /** The bookshelf ID or name retrieve volumes for. */
    shelf: string;
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
    /** ISO-3166-1 code to override the IP-based location. */
    country?: string;
    /** Maximum number of results to return */
    maxResults?: number;
    /** Restrict information returned to a set of selected fields. */
    projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
    /** Full-text search query string in this bookshelf. */
    q?: string;
    /** Set to true to show pre-ordered books. Defaults to false. */
    showPreorders?: boolean;
    /** String to identify the originator of this request. */
    source?: string;
    /** Index of the first element to return (starts at 0) */
    startIndex?: number;
  }) => Promise<Volumes>;

  /**
   * Retrieves my reading position information for a volume.
   */
  booksMylibraryReadingpositionsGet: (input: {
    /** ID of volume for which to retrieve a reading position. */
    volumeId: string;
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
    /** Volume content version for which this reading position is requested. */
    contentVersion?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<ReadingPosition>;

  /**
   * Sets my reading position information for a volume.
   */
  booksMylibraryReadingpositionsSetPosition: (input: {
    /** ID of volume for which to update the reading position. */
    volumeId: string;
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
    /** Position string for the new volume reading position. */
    position: string;
    /** RFC 3339 UTC format timestamp associated with this reading position. */
    timestamp: string;
    /** Action that caused this reading position to be set. */
    action?: "ACTION_UNDEFINED" | "bookmark" | "chapter" | "next-page" | "prev-page" | "scroll" | "search";
    /** Volume content version for which this reading position applies. */
    contentVersion?: string;
    /** Random persistent device cookie optional on set position. */
    deviceCookie?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Empty>;

  /**
   * Returns notification details for a given notification id.
   */
  booksNotificationGet: (input: {
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
    /** String to identify the notification. */
    notification_id: string;
    /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating notification title and body. */
    locale?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Notification>;

  /**
   * List categories for onboarding experience.
   */
  booksOnboardingListCategories: (input: {
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
    /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
    locale?: string;
  }) => Promise<Category>;

  /**
   * List available volumes under categories for onboarding experience.
   */
  booksOnboardingListCategoryVolumes: (input: {
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
    /** List of category ids requested. */
    categoryId?: (string)[];
    /** ISO-639-1 language and ISO-3166-1 country code. Default is en-US if unset. */
    locale?: string;
    /** The maximum allowed maturity rating of returned volumes. Books with a higher maturity rating are filtered out. */
    maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
    /** Number of maximum results per page to be included in the response. */
    pageSize?: number;
    /** The value of the nextToken from the previous page. */
    pageToken?: string;
  }) => Promise<Volume2>;

  /**
   * Returns a stream of personalized book clusters
   */
  booksPersonalizedstreamGet: (input: {
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
    /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
    locale?: string;
    /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
    maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Discoveryclusters>;

  /**
   * Accepts the promo offer.
   */
  booksPromoofferAccept: (input: {
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
    /** device android_id */
    androidId?: string;
    /** device device */
    device?: string;
    /** device manufacturer */
    manufacturer?: string;
    /** device model */
    model?: string;
    offerId?: string;
    /** device product */
    product?: string;
    /** device serial */
    serial?: string;
    /** Volume id to exercise the offer */
    volumeId?: string;
  }) => Promise<Empty>;

  /**
   * Marks the promo offer as dismissed.
   */
  booksPromoofferDismiss: (input: {
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
    /** device android_id */
    androidId?: string;
    /** device device */
    device?: string;
    /** device manufacturer */
    manufacturer?: string;
    /** device model */
    model?: string;
    /** Offer to dimiss */
    offerId?: string;
    /** device product */
    product?: string;
    /** device serial */
    serial?: string;
  }) => Promise<Empty>;

  /**
   * Returns a list of promo offers available to the user
   */
  booksPromoofferGet: (input: {
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
    /** device android_id */
    androidId?: string;
    /** device device */
    device?: string;
    /** device manufacturer */
    manufacturer?: string;
    /** device model */
    model?: string;
    /** device product */
    product?: string;
    /** device serial */
    serial?: string;
  }) => Promise<Offers>;

  /**
   * Returns Series metadata for the given series ids.
   */
  booksSeriesGet: (input: {
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
    /** String that identifies the series */
    series_id: (string)[];
  }) => Promise<Series>;

  /**
   * Returns Series membership data given the series id.
   */
  booksSeriesMembershipGet: (input: {
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
    /** String that identifies the series */
    series_id: string;
    /** Number of maximum results per page to be included in the response. */
    page_size?: number;
    /** The value of the nextToken from the previous page. */
    page_token?: string;
  }) => Promise<Seriesmembership>;

  /**
   * Retrieves a list of public bookshelves for the specified user.
   */
  booksBookshelvesList: (input: {
    /** ID of user for whom to retrieve bookshelves. */
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Bookshelves>;

  /**
   * Retrieves metadata for a specific bookshelf for the specified user.
   */
  booksBookshelvesGet: (input: {
    /** ID of user for whom to retrieve bookshelves. */
    userId: string;
    /** ID of bookshelf to retrieve. */
    shelf: string;
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
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Bookshelf>;

  /**
   * Retrieves volumes in a specific bookshelf for the specified user.
   */
  booksBookshelvesVolumesList: (input: {
    /** ID of user for whom to retrieve bookshelf volumes. */
    userId: string;
    /** ID of bookshelf to retrieve volumes. */
    shelf: string;
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
    /** Maximum number of results to return */
    maxResults?: number;
    /** Set to true to show pre-ordered books. Defaults to false. */
    showPreorders?: boolean;
    /** String to identify the originator of this request. */
    source?: string;
    /** Index of the first element to return (starts at 0) */
    startIndex?: number;
  }) => Promise<Volumes>;

  /**
   * Performs a book search.
   */
  booksVolumesList: (input: {
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
    /** Full-text search query string. */
    q: string;
    /** Restrict to volumes by download availability. */
    download?: "DOWNLOAD_UNDEFINED" | "EPUB";
    /** Filter search results. */
    filter?: "FILTER_UNDEFINED" | "ebooks" | "free-ebooks" | "full" | "paid-ebooks" | "partial";
    /** Restrict results to books with this language code. */
    langRestrict?: string;
    /** Restrict search to this user's library. */
    libraryRestrict?: "LIBRARY_RESTRICT_UNDEFINED" | "my-library" | "no-restrict";
    /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
    maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
    /** Maximum number of results to return. */
    maxResults?: number;
    /** Sort search results. */
    orderBy?: "ORDER_BY_UNDEFINED" | "newest" | "relevance";
    /** Restrict and brand results for partner ID. */
    partner?: string;
    /** Restrict to books or magazines. */
    printType?: "PRINT_TYPE_UNDEFINED" | "ALL" | "BOOKS" | "MAGAZINES";
    /** Restrict information returned to a set of selected fields. */
    projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
    /** Set to true to show books available for preorder. Defaults to false. */
    showPreorders?: boolean;
    /** String to identify the originator of this request. */
    source?: string;
    /** Index of the first result to return (starts at 0) */
    startIndex?: number;
  }) => Promise<Volumes>;

  /**
   * Return a list of books in My Library.
   */
  booksVolumesMybooksList: (input: {
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
    /** How the book was acquired */
    acquireMethod?: ("ACQUIRE_METHOD_UNDEFINED" | "FAMILY_SHARED" | "PREORDERED" | "PREVIOUSLY_RENTED" | "PUBLIC_DOMAIN" | "PURCHASED" | "RENTED" | "SAMPLE" | "UPLOADED")[];
    /** ISO-3166-1 code to override the IP-based location. */
    country?: string;
    /** ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating recommendations. */
    locale?: string;
    /** Maximum number of results to return. */
    maxResults?: number;
    /** The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod. */
    processingState?: ("PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING")[];
    /** String to identify the originator of this request. */
    source?: string;
    /** Index of the first result to return (starts at 0) */
    startIndex?: number;
  }) => Promise<Volumes>;

  /**
   * Return a list of recommended books for the current user.
   */
  booksVolumesRecommendedList: (input: {
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
    /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
    locale?: string;
    /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
    maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Volumes>;

  /**
   * Rate a recommended book for the current user.
   */
  booksVolumesRecommendedRate: (input: {
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
    /** Rating to be given to the volume. */
    rating: "RATING_UNDEFINED" | "HAVE_IT" | "NOT_INTERESTED";
    /** ID of the source volume. */
    volumeId: string;
    /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
    locale?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<BooksVolumesRecommendedRateResponse>;

  /**
   * Return a list of books uploaded by the current user.
   */
  booksVolumesUseruploadedList: (input: {
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
    /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
    locale?: string;
    /** Maximum number of results to return. */
    maxResults?: number;
    /** The processing state of the user uploaded volumes to be returned. */
    processingState?: ("PROCESSING_STATE_UNDEFINED" | "COMPLETED_FAILED" | "COMPLETED_SUCCESS" | "RUNNING")[];
    /** String to identify the originator of this request. */
    source?: string;
    /** Index of the first result to return (starts at 0) */
    startIndex?: number;
    /** The ids of the volumes to be returned. If not specified all that match the processingState are returned. */
    volumeId?: (string)[];
  }) => Promise<Volumes>;

  /**
   * Gets volume information for a single volume.
   */
  booksVolumesGet: (input: {
    /** ID of volume to retrieve. */
    volumeId: string;
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
    /** ISO-3166-1 code to override the IP-based location. */
    country?: string;
    /** Set to true to include non-comics series. Defaults to false. */
    includeNonComicsSeries?: boolean;
    /** Brand results for partner ID. */
    partner?: string;
    /** Restrict information returned to a set of selected fields. */
    projection?: "PROJECTION_UNDEFINED" | "FULL" | "LITE";
    /** string to identify the originator of this request. */
    source?: string;
    user_library_consistent_read?: boolean;
  }) => Promise<Volume>;

  /**
   * Return a list of associated books.
   */
  booksVolumesAssociatedList: (input: {
    /** ID of the source volume. */
    volumeId: string;
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
    /** Association type. */
    association?: "ASSOCIATION_UNDEFINED" | "end-of-sample" | "end-of-volume" | "related-for-play";
    /** ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating recommendations. */
    locale?: string;
    /** The maximum allowed maturity rating of returned recommendations. Books with a higher maturity rating are filtered out. */
    maxAllowedMaturityRating?: "MAX_ALLOWED_MATURITY_RATING_UNDEFINED" | "MATURE" | "not-mature";
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Volumes>;

  /**
   * Gets the volume annotations for a volume and layer.
   */
  booksLayersVolumeAnnotationsList: (input: {
    /** The volume to retrieve annotations for. */
    volumeId: string;
    /** The ID for the layer to get the annotations. */
    layerId: string;
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
    /** The content version for the requested volume. */
    contentVersion: string;
    /** The end offset to end retrieving data from. */
    endOffset?: string;
    /** The end position to end retrieving data from. */
    endPosition?: string;
    /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
    locale?: string;
    /** Maximum number of results to return */
    maxResults?: number;
    /** The value of the nextToken from the previous page. */
    pageToken?: string;
    /** Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false. */
    showDeleted?: boolean;
    /** String to identify the originator of this request. */
    source?: string;
    /** The start offset to start retrieving data from. */
    startOffset?: string;
    /** The start position to start retrieving data from. */
    startPosition?: string;
    /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
    updatedMax?: string;
    /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
    updatedMin?: string;
    /** The version of the volume annotations that you are requesting. */
    volumeAnnotationsVersion?: string;
  }) => Promise<Volumeannotations>;

  /**
   * Gets the volume annotation.
   */
  booksLayersVolumeAnnotationsGet: (input: {
    /** The volume to retrieve annotations for. */
    volumeId: string;
    /** The ID for the layer to get the annotations. */
    layerId: string;
    /** The ID of the volume annotation to retrieve. */
    annotationId: string;
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
    /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
    locale?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Volumeannotation>;

  /**
   * Gets the annotation data for a volume and layer.
   */
  booksLayersAnnotationDataList: (input: {
    /** The volume to retrieve annotation data for. */
    volumeId: string;
    /** The ID for the layer to get the annotation data. */
    layerId: string;
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
    /** The content version for the requested volume. */
    contentVersion: string;
    /** The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set. */
    annotationDataId?: (string)[];
    /** The requested pixel height for any images. If height is provided width must also be provided. */
    h?: number;
    /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
    locale?: string;
    /** Maximum number of results to return */
    maxResults?: number;
    /** The value of the nextToken from the previous page. */
    pageToken?: string;
    /** The requested scale for the image. */
    scale?: number;
    /** String to identify the originator of this request. */
    source?: string;
    /** RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive). */
    updatedMax?: string;
    /** RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive). */
    updatedMin?: string;
    /** The requested pixel width for any images. If width is provided height must also be provided. */
    w?: number;
  }) => Promise<Annotationsdata>;

  /**
   * Gets the annotation data.
   */
  booksLayersAnnotationDataGet: (input: {
    /** The volume to retrieve annotations for. */
    volumeId: string;
    /** The ID for the layer to get the annotations. */
    layerId: string;
    /** The ID of the annotation data to retrieve. */
    annotationDataId: string;
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
    /** The content version for the volume you are trying to retrieve. */
    contentVersion: string;
    /** For the dictionary layer. Whether or not to allow web definitions. */
    allowWebDefinitions?: boolean;
    /** The requested pixel height for any images. If height is provided width must also be provided. */
    h?: number;
    /** The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. */
    locale?: string;
    /** The requested scale for the image. */
    scale?: number;
    /** String to identify the originator of this request. */
    source?: string;
    /** The requested pixel width for any images. If width is provided height must also be provided. */
    w?: number;
  }) => Promise<DictionaryAnnotationdata>;

  /**
   * List the layer summaries for a volume.
   */
  booksLayersList: (input: {
    /** The volume to retrieve layers for. */
    volumeId: string;
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
    /** The content version for the requested volume. */
    contentVersion?: string;
    /** Maximum number of results to return */
    maxResults?: number;
    /** The value of the nextToken from the previous page. */
    pageToken?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Layersummaries>;

  /**
   * Gets the layer summary for a volume.
   */
  booksLayersGet: (input: {
    /** The volume to retrieve layers for. */
    volumeId: string;
    /** The ID for the layer to get the summary for. */
    summaryId: string;
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
    /** The content version for the requested volume. */
    contentVersion?: string;
    /** String to identify the originator of this request. */
    source?: string;
  }) => Promise<Layersummary>;
};

export * from "./schemas.js";
