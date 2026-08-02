export type Annotation = {
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
};

export type Annotations = {
  /** A list of annotations. */
  items?: (Annotation)[];
  /** Resource type. */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
  /** Total number of annotations found. This may be greater than the number of notes returned in this response if results have been paginated. */
  totalItems?: number;
};

export type AnnotationsSummary = {
  kind?: string;
  layers?: ({ allowedCharacterCount?: number; layerId?: string; limitType?: string; remainingCharacterCount?: number; updated?: string })[];
};

export type Annotationsdata = {
  /** A list of Annotation Data. */
  items?: (GeoAnnotationdata)[];
  /** Resource type */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
  /** The total number of volume annotations found. */
  totalItems?: number;
};

export type BooksAnnotationsRange = {
  /** The offset from the ending position. */
  endOffset?: string;
  /** The ending position for the range. */
  endPosition?: string;
  /** The offset from the starting position. */
  startOffset?: string;
  /** The starting position for the range. */
  startPosition?: string;
};

export type BooksCloudloadingResource = {
  author?: string;
  processingState?: string;
  title?: string;
  volumeId?: string;
};

export type BooksVolumesRecommendedRateResponse = {
  consistency_token?: string;
};

export type Bookshelf = {
  /** Whether this bookshelf is PUBLIC or PRIVATE. */
  access?: string;
  /** Created time for this bookshelf (formatted UTC timestamp with millisecond resolution). */
  created?: string;
  /** Description of this bookshelf. */
  description?: string;
  /** Id of this bookshelf, only unique by user. */
  id?: number;
  /** Resource type for bookshelf metadata. */
  kind?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Title of this bookshelf. */
  title?: string;
  /** Last modified time of this bookshelf (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
  /** Number of volumes in this bookshelf. */
  volumeCount?: number;
  /** Last time a volume was added or removed from this bookshelf (formatted UTC timestamp with millisecond resolution). */
  volumesLastUpdated?: string;
};

export type Bookshelves = {
  /** A list of bookshelves. */
  items?: (Bookshelf)[];
  /** Resource type. */
  kind?: string;
};

export type Category = {
  /** A list of onboarding categories. */
  items?: ({ badgeUrl?: string; categoryId?: string; name?: string })[];
  /** Resource type. */
  kind?: string;
};

export type ConcurrentAccessRestriction = {
  /** Whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** Resource type. */
  kind?: string;
  /** The maximum number of concurrent access licenses for this volume. */
  maxConcurrentDevices?: number;
  /** Error/warning message. */
  message?: string;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Error/warning reason code. */
  reasonCode?: string;
  /** Whether this volume has any concurrent access restrictions. */
  restricted?: boolean;
  /** Response signature. */
  signature?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** Time in seconds for license auto-expiration. */
  timeWindowSeconds?: number;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
};

export type DictionaryAnnotationdata = {
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** JSON encoded data for this dictionary annotation data. Emitted with name 'data' in JSON output. Either this or geo_data will be populated. */
  data?: Dictlayerdata;
  /** Base64 encoded data for this annotation data. */
  encodedData?: string;
  /** Unique id for this annotation data. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The volume id for this data. * */
  volumeId?: string;
};

export type Dictlayerdata = {
  common?: { title?: string };
  dict?: { source?: { attribution?: string; url?: string }; words?: ({ derivatives?: ({ source?: { attribution?: string; url?: string }; text?: string })[]; examples?: ({ source?: { attribution?: string; url?: string }; text?: string })[]; senses?: ({ conjugations?: ({ type?: string; value?: string })[]; definitions?: ({ definition?: string; examples?: ({ source?: { attribution?: string; url?: string }; text?: string })[] })[]; partOfSpeech?: string; pronunciation?: string; pronunciationUrl?: string; source?: { attribution?: string; url?: string }; syllabification?: string; synonyms?: ({ source?: { attribution?: string; url?: string }; text?: string })[] })[]; source?: { attribution?: string; url?: string } })[] };
  kind?: string;
};

export type Discoveryclusters = {
  clusters?: ({ banner_with_content_container?: { fillColorArgb?: string; imageUrl?: string; maskColorArgb?: string; moreButtonText?: string; moreButtonUrl?: string; textColorArgb?: string }; subTitle?: string; title?: string; totalVolumes?: number; uid?: string; volumes?: (Volume)[] })[];
  /** Resorce type. */
  kind?: string;
  totalClusters?: number;
};

export type DownloadAccessRestriction = {
  /** If restricted, whether access is granted for this (user, device, volume). */
  deviceAllowed?: boolean;
  /** If restricted, the number of content download licenses already acquired (including the requesting client, if licensed). */
  downloadsAcquired?: number;
  /** If deviceAllowed, whether access was just acquired with this request. */
  justAcquired?: boolean;
  /** Resource type. */
  kind?: string;
  /** If restricted, the maximum number of content download licenses for this volume. */
  maxDownloadDevices?: number;
  /** Error/warning message. */
  message?: string;
  /** Client nonce for verification. Download access and client-validation only. */
  nonce?: string;
  /** Error/warning reason code. Additional codes may be added in the future. 0 OK 100 ACCESS_DENIED_PUBLISHER_LIMIT 101 ACCESS_DENIED_LIMIT 200 WARNING_USED_LAST_ACCESS */
  reasonCode?: string;
  /** Whether this volume has any download access restrictions. */
  restricted?: boolean;
  /** Response signature. */
  signature?: string;
  /** Client app identifier for verification. Download access and client-validation only. */
  source?: string;
  /** Identifies the volume for which this entry applies. */
  volumeId?: string;
};

export type DownloadAccesses = {
  /** A list of download access responses. */
  downloadAccessList?: (DownloadAccessRestriction)[];
  /** Resource type. */
  kind?: string;
};

/** A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } */
export type Empty = { [key: string]: unknown };

export type FamilyInfo = {
  /** Resource type. */
  kind?: string;
  /** Family membership info of the user that made the request. */
  membership?: { acquirePermission?: string; ageGroup?: string; allowedMaturityRating?: string; isInFamily?: boolean; role?: string };
};

export type GeoAnnotationdata = {
  /** The type of annotation this data is for. */
  annotationType?: string;
  /** JSON encoded data for this geo annotation data. Emitted with name 'data' in JSON output. Either this or dict_data will be populated. */
  data?: Geolayerdata;
  /** Base64 encoded data for this annotation data. */
  encodedData?: string;
  /** Unique id for this annotation data. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The Layer id for this data. * */
  layerId?: string;
  /** URL for this resource. * */
  selfLink?: string;
  /** Timestamp for the last time this data was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The volume id for this data. * */
  volumeId?: string;
};

export type Geolayerdata = {
  common?: { lang?: string; previewImageUrl?: string; snippet?: string; snippetUrl?: string; title?: string };
  geo?: { boundary?: (string)[]; cachePolicy?: string; countryCode?: string; latitude?: number; longitude?: number; mapType?: string; viewport?: { hi?: { latitude?: number; longitude?: number }; lo?: { latitude?: number; longitude?: number } }; zoom?: number };
  kind?: string;
};

export type Layersummaries = {
  /** A list of layer summary items. */
  items?: (Layersummary)[];
  /** Resource type. */
  kind?: string;
  /** The total number of layer summaries found. */
  totalItems?: number;
};

export type Layersummary = {
  /** The number of annotations for this layer. */
  annotationCount?: number;
  /** The list of annotation types contained for this layer. */
  annotationTypes?: (string)[];
  /** Link to get data for this annotation. */
  annotationsDataLink?: string;
  /** The link to get the annotations for this layer. */
  annotationsLink?: string;
  /** The content version this resource is for. */
  contentVersion?: string;
  /** The number of data items for this layer. */
  dataCount?: number;
  /** Unique id of this layer summary. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The layer id for this summary. */
  layerId?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time an item in this layer was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The current version of this layer's volume annotations. Note that this version applies only to the data in the books.layers.volumeAnnotations.* responses. The actual annotation data is versioned separately. */
  volumeAnnotationsVersion?: string;
  /** The volume id this resource is for. */
  volumeId?: string;
};

export type Metadata = {
  /** A list of offline dictionary metadata. */
  items?: ({ download_url?: string; encrypted_key?: string; language?: string; size?: string; version?: string })[];
  /** Resource type. */
  kind?: string;
};

export type Notification = {
  body?: string;
  /** The list of crm experiment ids. */
  crmExperimentIds?: (string)[];
  doc_id?: string;
  doc_type?: string;
  dont_show_notification?: boolean;
  iconUrl?: string;
  is_document_mature?: boolean;
  /** Resource type. */
  kind?: string;
  notificationGroup?: string;
  notification_type?: string;
  pcampaign_id?: string;
  reason?: string;
  show_notification_settings_action?: boolean;
  targetUrl?: string;
  timeToExpireMs?: string;
  title?: string;
};

export type Offers = {
  /** A list of offers. */
  items?: ({ artUrl?: string; gservicesKey?: string; id?: string; items?: ({ author?: string; canonicalVolumeLink?: string; coverUrl?: string; description?: string; title?: string; volumeId?: string })[] })[];
  /** Resource type. */
  kind?: string;
};

export type ReadingPosition = {
  /** Position in an EPUB as a CFI. */
  epubCfiPosition?: string;
  /** Position in a volume for image-based content. */
  gbImagePosition?: string;
  /** Position in a volume for text-based content. */
  gbTextPosition?: string;
  /** Resource type for a reading position. */
  kind?: string;
  /** Position in a PDF file. */
  pdfPosition?: string;
  /** Timestamp when this reading position was last updated (formatted UTC timestamp with millisecond resolution). */
  updated?: string;
  /** Volume id associated with this reading position. */
  volumeId?: string;
};

export type RequestAccessData = {
  /** A concurrent access response. */
  concurrentAccess?: ConcurrentAccessRestriction;
  /** A download access response. */
  downloadAccess?: DownloadAccessRestriction;
  /** Resource type. */
  kind?: string;
};

export type Review = {
  /** Author of this review. */
  author?: { displayName?: string };
  /** Review text. */
  content?: string;
  /** Date of this review. */
  date?: string;
  /** URL for the full review text, for reviews gathered from the web. */
  fullTextUrl?: string;
  /** Resource type for a review. */
  kind?: string;
  /** Star rating for this review. Possible values are ONE, TWO, THREE, FOUR, FIVE or NOT_RATED. */
  rating?: string;
  /** Information regarding the source of this review, when the review is not from a Google Books user. */
  source?: { description?: string; extraDescription?: string; url?: string };
  /** Title for this review. */
  title?: string;
  /** Source type for this review. Possible values are EDITORIAL, WEB_USER or GOOGLE_USER. */
  type?: string;
  /** Volume that this review is for. */
  volumeId?: string;
};

export type Series = {
  /** Resource type. */
  kind?: string;
  series?: ({ bannerImageUrl?: string; eligibleForSubscription?: boolean; imageUrl?: string; isComplete?: boolean; seriesFormatType?: string; seriesId?: string; seriesSubscriptionReleaseInfo?: { cancelTime?: string; currentReleaseInfo?: { amountInMicros?: number; currencyCode?: string; releaseNumber?: string; releaseTime?: string }; nextReleaseInfo?: { amountInMicros?: number; currencyCode?: string; releaseNumber?: string; releaseTime?: string }; seriesSubscriptionType?: string }; seriesType?: string; subscriptionId?: string; title?: string })[];
};

export type Seriesmembership = {
  /** Resorce type. */
  kind?: string;
  member?: (Volume)[];
  nextPageToken?: string;
};

export type Usersettings = {
  /** Resource type. */
  kind?: string;
  /** User settings in sub-objects, each for different purposes. */
  notesExport?: { folderName?: string; isEnabled?: boolean };
  notification?: { matchMyInterests?: { opted_state?: string }; moreFromAuthors?: { opted_state?: string }; moreFromSeries?: { opted_state?: string }; priceDrop?: { opted_state?: string }; rewardExpirations?: { opted_state?: string } };
};

export type Volume = {
  /** Any information about a volume related to reading or obtaining that volume text. This information can depend on country (books may be public domain in one country but not in another, e.g.). */
  accessInfo?: { accessViewStatus?: string; country?: string; downloadAccess?: DownloadAccessRestriction; driveImportedContentLink?: string; embeddable?: boolean; epub?: { acsTokenLink?: string; downloadLink?: string; isAvailable?: boolean }; explicitOfflineLicenseManagement?: boolean; pdf?: { acsTokenLink?: string; downloadLink?: string; isAvailable?: boolean }; publicDomain?: boolean; quoteSharingAllowed?: boolean; textToSpeechPermission?: string; viewOrderUrl?: string; viewability?: string; webReaderLink?: string };
  /** Opaque identifier for a specific version of a volume resource. (In LITE projection) */
  etag?: string;
  /** Unique identifier for a volume. (In LITE projection.) */
  id?: string;
  /** Resource type for a volume. (In LITE projection.) */
  kind?: string;
  /** What layers exist in this volume and high level information about them. */
  layerInfo?: { layers?: ({ layerId?: string; volumeAnnotationsVersion?: string })[] };
  /** Recommendation related information for this volume. */
  recommendedInfo?: { explanation?: string };
  /** Any information about a volume related to the eBookstore and/or purchaseability. This information can depend on the country where the request originates from (i.e. books may not be for sale in certain countries). */
  saleInfo?: { buyLink?: string; country?: string; isEbook?: boolean; listPrice?: { amount?: number; currencyCode?: string }; offers?: ({ finskyOfferType?: number; giftable?: boolean; listPrice?: { amountInMicros?: number; currencyCode?: string }; rentalDuration?: { count?: number; unit?: string }; retailPrice?: { amountInMicros?: number; currencyCode?: string } })[]; onSaleDate?: string; retailPrice?: { amount?: number; currencyCode?: string }; saleability?: string };
  /** Search result information related to this volume. */
  searchInfo?: { textSnippet?: string };
  /** URL to this resource. (In LITE projection.) */
  selfLink?: string;
  /** User specific information related to this volume. (e.g. page this user last read or whether they purchased this book) */
  userInfo?: { acquiredTime?: string; acquisitionType?: number; copy?: { allowedCharacterCount?: number; limitType?: string; remainingCharacterCount?: number; updated?: string }; entitlementType?: number; familySharing?: { familyRole?: string; isSharingAllowed?: boolean; isSharingDisabledByFop?: boolean }; isFamilySharedFromUser?: boolean; isFamilySharedToUser?: boolean; isFamilySharingAllowed?: boolean; isFamilySharingDisabledByFop?: boolean; isInMyBooks?: boolean; isPreordered?: boolean; isPurchased?: boolean; isUploaded?: boolean; readingPosition?: ReadingPosition; rentalPeriod?: { endUtcSec?: string; startUtcSec?: string }; rentalState?: string; review?: Review; updated?: string; userUploadedVolumeInfo?: { processingState?: string } };
  /** General volume information. */
  volumeInfo?: { allowAnonLogging?: boolean; authors?: (string)[]; averageRating?: number; canonicalVolumeLink?: string; categories?: (string)[]; comicsContent?: boolean; contentVersion?: string; description?: string; dimensions?: { height?: string; thickness?: string; width?: string }; imageLinks?: { extraLarge?: string; large?: string; medium?: string; small?: string; smallThumbnail?: string; thumbnail?: string }; industryIdentifiers?: ({ identifier?: string; type?: string })[]; infoLink?: string; language?: string; mainCategory?: string; maturityRating?: string; pageCount?: number; panelizationSummary?: { containsEpubBubbles?: boolean; containsImageBubbles?: boolean; epubBubbleVersion?: string; imageBubbleVersion?: string }; previewLink?: string; printType?: string; printedPageCount?: number; publishedDate?: string; publisher?: string; ratingsCount?: number; readingModes?: { image?: boolean; text?: boolean }; samplePageCount?: number; seriesInfo?: Volumeseriesinfo; subtitle?: string; title?: string };
};

export type Volume2 = {
  /** A list of volumes. */
  items?: (Volume)[];
  /** Resource type. */
  kind?: string;
  nextPageToken?: string;
};

export type Volumeannotation = {
  /** The annotation data id for this volume annotation. */
  annotationDataId?: string;
  /** Link to get data for this annotation. */
  annotationDataLink?: string;
  /** The type of annotation this is. */
  annotationType?: string;
  /** The content ranges to identify the selected text. */
  contentRanges?: { cfiRange?: BooksAnnotationsRange; contentVersion?: string; gbImageRange?: BooksAnnotationsRange; gbTextRange?: BooksAnnotationsRange };
  /** Data for this annotation. */
  data?: string;
  /** Indicates that this annotation is deleted. */
  deleted?: boolean;
  /** Unique id of this volume annotation. */
  id?: string;
  /** Resource Type */
  kind?: string;
  /** The Layer this annotation is for. */
  layerId?: string;
  /** Pages the annotation spans. */
  pageIds?: (string)[];
  /** Excerpt from the volume. */
  selectedText?: string;
  /** URL to this resource. */
  selfLink?: string;
  /** Timestamp for the last time this anntoation was updated. (RFC 3339 UTC date-time format). */
  updated?: string;
  /** The Volume this annotation is for. */
  volumeId?: string;
};

export type Volumeannotations = {
  /** A list of volume annotations. */
  items?: (Volumeannotation)[];
  /** Resource type */
  kind?: string;
  /** Token to pass in for pagination for the next page. This will not be present if this request does not have more results. */
  nextPageToken?: string;
  /** The total number of volume annotations found. */
  totalItems?: number;
  /** The version string for all of the volume annotations in this layer (not just the ones in this response). Note: the version string doesn't apply to the annotation data, just the information in this response (e.g. the location of annotations in the book). */
  version?: string;
};

export type Volumes = {
  /** A list of volumes. */
  items?: (Volume)[];
  /** Resource type. */
  kind?: string;
  /** Total number of volumes found. This might be greater than the number of volumes returned in this response if results have been paginated. */
  totalItems?: number;
};

export type Volumeseriesinfo = {
  /** The display number string. This should be used only for display purposes and the actual sequence should be inferred from the below orderNumber. */
  bookDisplayNumber?: string;
  /** Resource type. */
  kind?: string;
  /** Short book title in the context of the series. */
  shortSeriesBookTitle?: string;
  volumeSeries?: ({ issue?: ({ issueDisplayNumber?: string; issueOrderNumber?: number })[]; orderNumber?: number; seriesBookType?: string; seriesId?: string })[];
};
