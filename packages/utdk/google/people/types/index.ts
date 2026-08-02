import type { Address, AgeRangeType, BatchCreateContactsResponse, BatchGetContactGroupsResponse, BatchUpdateContactsResponse, Biography, Birthday, BraggingRights, CalendarUrl, ClientData, ContactGroup, ContactToCreate, CoverPhoto, DeleteContactPhotoResponse, EmailAddress, Empty, Event, ExternalId, FileAs, Gender, GetPeopleResponse, ImClient, Interest, ListConnectionsResponse, ListContactGroupsResponse, ListDirectoryPeopleResponse, ListOtherContactsResponse, Locale, Location, Membership, MiscKeyword, ModifyContactGroupMembersResponse, Name, Nickname, Occupation, Organization, Person, PersonMetadata, PhoneNumber, Photo, Relation, RelationshipInterest, RelationshipStatus, Residence, SearchDirectoryPeopleResponse, SearchResponse, SipAddress, Skill, Tagline, UpdateContactPhotoResponse, Url, UserDefined } from "./schemas.js";

export type GooglePeopleClient = {
  /**
   * List all contact groups owned by the authenticated user. Members of the contact groups are not populated.
   */
  peopleContactGroupsList: (input: {
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
    /** Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, `memberCount`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name */
    groupFields?: string;
    /** Optional. The maximum number of resources to return. Valid values are between 1 and 1000, inclusive. Defaults to 30 if not set or set to 0. */
    pageSize?: number;
    /** Optional. The next_page_token value returned from a previous call to [ListContactGroups](/people/api/rest/v1/contactgroups/list). Requests the next page of resources. */
    pageToken?: string;
    /** Optional. A sync token, returned by a previous call to `contactgroups.list`. Only resources changed since the sync token was created will be returned. */
    syncToken?: string;
  }) => Promise<ListContactGroupsResponse>;

  /**
   * Create a new contact group owned by the authenticated user. Created contact group names must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peopleContactGroupsCreate: (input: {
    /** Required. The contact group to create. */
    contactGroup?: ContactGroup;
    /** Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * metadata * name */
    readGroupFields?: string;
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
  }) => Promise<ContactGroup>;

  /**
   * Get a list of contact groups owned by the authenticated user by specifying a list of contact group resource names.
   */
  peopleContactGroupsBatchGet: (input: {
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
    /** Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, `memberCount`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name */
    groupFields?: string;
    /** Optional. Specifies the maximum number of members to return for each group. Defaults to 0 if not set, which will return zero members. */
    maxMembers?: number;
    /** Required. The resource names of the contact groups to get. There is a maximum of 200 resource names. */
    resourceNames?: (string)[];
  }) => Promise<BatchGetContactGroupsResponse>;

  /**
   * List all "Other contacts", that is contacts that are not in a contact group. "Other contacts" are typically auto created contacts from interactions. Sync tokens expire 7 days after the full sync. A request with an expired sync token will get an error with an [google.rpc.ErrorInfo](https://cloud.google.com/apis/design/errors#error_info) with reason "EXPIRED_SYNC_TOKEN". In the case of such an error clients should make a full sync request without a `sync_token`. The first page of a full sync request has an additional quota. If the quota is exceeded, a 429 error will be returned. This quota is fixed and can not be increased. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the user's other contacts that have changed](/people/v1/other-contacts#list_the_users_other_contacts_that_have_changed).
   */
  peopleOtherContactsList: (input: {
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
    /** Optional. The number of "Other contacts" to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0. */
    pageSize?: number;
    /** Optional. A page token, received from a previous response `next_page_token`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `otherContacts.list` must match the first call that provided the page token. */
    pageToken?: string;
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. What values are valid depend on what ReadSourceType is used. If READ_SOURCE_TYPE_CONTACT is used, valid values are: * emailAddresses * metadata * names * phoneNumbers * photos If READ_SOURCE_TYPE_PROFILE is used, valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Optional. Whether the response should return `next_sync_token` on the last page of results. It can be used to get incremental changes since the last request by setting it on the request `sync_token`. More details about sync behavior at `otherContacts.list`. */
    requestSyncToken?: boolean;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT if not set. Possible values for this field are: * READ_SOURCE_TYPE_CONTACT * READ_SOURCE_TYPE_CONTACT,READ_SOURCE_TYPE_PROFILE Specifying READ_SOURCE_TYPE_PROFILE without specifying READ_SOURCE_TYPE_CONTACT is not permitted. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
    /** Optional. A sync token, received from a previous response `next_sync_token` Provide this to retrieve only the resources changed since the last request. When syncing, all other parameters provided to `otherContacts.list` must match the first call that provided the sync token. More details about sync behavior at `otherContacts.list`. */
    syncToken?: string;
  }) => Promise<ListOtherContactsResponse>;

  /**
   * Provides a list of contacts in the authenticated user's other contacts that matches the search query. The query matches on a contact's `names`, `emailAddresses`, and `phoneNumbers` fields that are from the OTHER_CONTACT source. **IMPORTANT**: Before searching, clients should send a warmup request with an empty query to update the cache. See https://developers.google.com/people/v1/other-contacts#search_the_users_other_contacts
   */
  peopleOtherContactsSearch: (input: {
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
    /** Optional. The number of results to return. Defaults to 10 if field is not set, or set to 0. Values greater than 30 will be capped to 30. */
    pageSize?: number;
    /** Required. The plain-text query for the request. The query is used to match prefix phrases of the fields on a person. For example, a person with name "foo name" matches queries such as "f", "fo", "foo", "foo n", "nam", etc., but not "oo n". */
    query?: string;
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * emailAddresses * metadata * names * phoneNumbers */
    readMask?: string;
  }) => Promise<SearchResponse>;

  /**
   * Create a batch of new contacts and return the PersonResponses for the newly Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleBatchCreateContacts: (input: {
    /** Required. The contact to create. Allows up to 200 contacts in a single request. */
    contacts?: (ContactToCreate)[];
    /** Required. A field mask to restrict which fields on each person are returned in the response. Multiple fields can be specified by separating them with commas. If read mask is left empty, the post-mutate-get is skipped and no data will be returned in the response. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Optional. A mask of what source types to return in the post mutate read. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
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
  }) => Promise<BatchCreateContactsResponse>;

  /**
   * Delete a batch of contacts. Any non-contact data will not be deleted. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleBatchDeleteContacts: (input: {
    /** Required. The resource names of the contact to delete. It's repeatable. Allows up to 500 resource names in a single request. */
    resourceNames?: (string)[];
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
  }) => Promise<Empty>;

  /**
   * Provides information about a list of specific people by specifying a list of requested resource names. Use `people/me` to indicate the authenticated user. The request returns a 400 error if 'personFields' is not specified.
   */
  peoplePeopleGetBatchGet: (input: {
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
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`. */
    "requestMask.includeField"?: string;
    /** Required. The resource names of the people to provide information about. It's repeatable. The URL query parameter should be resourceNames=<name1>&resourceNames=<name2>&... - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify `people/{account_id}`. - To get information about a contact, specify the resource name that identifies the contact as returned by `people.connections.list`. There is a maximum of 200 resource names. */
    resourceNames?: (string)[];
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
  }) => Promise<GetPeopleResponse>;

  /**
   * Update a batch of contacts and return a map of resource names to PersonResponses for the updated contacts. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleBatchUpdateContacts: (input: {
    /** Required. A map of resource names to the person data to be updated. Allows up to 200 contacts in a single request. */
    contacts?: { [key: string]: Person | undefined };
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. If read mask is left empty, the post-mutate-get is skipped and no data will be returned in the response. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
    /** Required. A field mask to restrict which fields on the person are updated. Multiple fields can be specified by separating them with commas. All specified fields will be replaced, or cleared if left empty for each person. Valid values are: * addresses * biographies * birthdays * calendarUrls * clientData * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * relations * sipAddresses * urls * userDefined */
    updateMask?: string;
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
  }) => Promise<BatchUpdateContactsResponse>;

  /**
   * Create a new contact and return the person resource for that contact. The request returns a 400 error if more than one field is specified on a field that is a singleton for contact sources: * biographies * birthdays * genders * names Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleCreateContact: (input: {
    /** The person's street addresses. */
    addresses?: (Address)[];
    /** Output only. **DEPRECATED** (Please use `person.ageRanges` instead) The person's age range. */
    ageRange?: "AGE_RANGE_UNSPECIFIED" | "LESS_THAN_EIGHTEEN" | "EIGHTEEN_TO_TWENTY" | "TWENTY_ONE_OR_OLDER";
    /** Output only. The person's age ranges. */
    ageRanges?: (AgeRangeType)[];
    /** The person's biographies. This field is a singleton for contact sources. */
    biographies?: (Biography)[];
    /** The person's birthdays. This field is a singleton for contact sources. */
    birthdays?: (Birthday)[];
    /** **DEPRECATED**: No data will be returned The person's bragging rights. */
    braggingRights?: (BraggingRights)[];
    /** The person's calendar URLs. */
    calendarUrls?: (CalendarUrl)[];
    /** The person's client data. */
    clientData?: (ClientData)[];
    /** Output only. The person's cover photos. */
    coverPhotos?: (CoverPhoto)[];
    /** The person's email addresses. For `people.connections.list` and `otherContacts.list` the number of email addresses is limited to 100. If a Person has more email addresses the entire set can be obtained by calling GetPeople. */
    emailAddresses?: (EmailAddress)[];
    /** The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation. */
    etag?: string;
    /** The person's events. */
    events?: (Event)[];
    /** The person's external IDs. */
    externalIds?: (ExternalId)[];
    /** The person's file-ases. */
    fileAses?: (FileAs)[];
    /** The person's genders. This field is a singleton for contact sources. */
    genders?: (Gender)[];
    /** The person's instant messaging clients. */
    imClients?: (ImClient)[];
    /** The person's interests. */
    interests?: (Interest)[];
    /** The person's locale preferences. */
    locales?: (Locale)[];
    /** The person's locations. */
    locations?: (Location)[];
    /** The person's group memberships. */
    memberships?: (Membership)[];
    /** Output only. Metadata about the person. */
    metadata?: PersonMetadata;
    /** The person's miscellaneous keywords. */
    miscKeywords?: (MiscKeyword)[];
    /** The person's names. This field is a singleton for contact sources. */
    names?: (Name)[];
    /** The person's nicknames. */
    nicknames?: (Nickname)[];
    /** The person's occupations. */
    occupations?: (Occupation)[];
    /** The person's past or current organizations. */
    organizations?: (Organization)[];
    /** The person's phone numbers. For `people.connections.list` and `otherContacts.list` the number of phone numbers is limited to 100. If a Person has more phone numbers the entire set can be obtained by calling GetPeople. */
    phoneNumbers?: (PhoneNumber)[];
    /** Output only. The person's photos. */
    photos?: (Photo)[];
    /** The person's relations. */
    relations?: (Relation)[];
    /** Output only. **DEPRECATED**: No data will be returned The person's relationship interests. */
    relationshipInterests?: (RelationshipInterest)[];
    /** Output only. **DEPRECATED**: No data will be returned The person's relationship statuses. */
    relationshipStatuses?: (RelationshipStatus)[];
    /** **DEPRECATED**: (Please use `person.locations` instead) The person's residences. */
    residences?: (Residence)[];
    /** The resource name for the person, assigned by the server. An ASCII string in the form of `people/{person_id}`. */
    resourceName?: string;
    /** The person's SIP addresses. */
    sipAddresses?: (SipAddress)[];
    /** The person's skills. */
    skills?: (Skill)[];
    /** Output only. **DEPRECATED**: No data will be returned The person's taglines. */
    taglines?: (Tagline)[];
    /** The person's associated URLs. */
    urls?: (Url)[];
    /** The person's user defined data. */
    userDefined?: (UserDefined)[];
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
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Defaults to all fields if not set. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
  }) => Promise<Person>;

  /**
   * Provides a list of domain profiles and domain contacts in the authenticated user's domain directory. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the directory people that have changed](/people/v1/directory#list_the_directory_people_that_have_changed).
   */
  peoplePeopleListDirectoryPeople: (input: {
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
    /** Optional. Additional data to merge into the directory sources if they are connected through verified join keys such as email addresses or phone numbers. */
    mergeSources?: ("DIRECTORY_MERGE_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_MERGE_SOURCE_TYPE_CONTACT")[];
    /** Optional. The number of people to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0. */
    pageSize?: number;
    /** Optional. A page token, received from a previous response `next_page_token`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `people.listDirectoryPeople` must match the first call that provided the page token. */
    pageToken?: string;
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Optional. Whether the response should return `next_sync_token`. It can be used to get incremental changes since the last request by setting it on the request `sync_token`. More details about sync behavior at `people.listDirectoryPeople`. */
    requestSyncToken?: boolean;
    /** Required. Directory sources to return. */
    sources?: ("DIRECTORY_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT" | "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE")[];
    /** Optional. A sync token, received from a previous response `next_sync_token` Provide this to retrieve only the resources changed since the last request. When syncing, all other parameters provided to `people.listDirectoryPeople` must match the first call that provided the sync token. More details about sync behavior at `people.listDirectoryPeople`. */
    syncToken?: string;
  }) => Promise<ListDirectoryPeopleResponse>;

  /**
   * Provides a list of contacts in the authenticated user's grouped contacts that matches the search query. The query matches on a contact's `names`, `nickNames`, `emailAddresses`, `phoneNumbers`, and `organizations` fields that are from the CONTACT source. **IMPORTANT**: Before searching, clients should send a warmup request with an empty query to update the cache. See https://developers.google.com/people/v1/contacts#search_the_users_contacts
   */
  peoplePeopleSearchContacts: (input: {
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
    /** Optional. The number of results to return. Defaults to 10 if field is not set, or set to 0. Values greater than 30 will be capped to 30. */
    pageSize?: number;
    /** Required. The plain-text query for the request. The query is used to match prefix phrases of the fields on a person. For example, a person with name "foo name" matches queries such as "f", "fo", "foo", "foo n", "nam", etc., but not "oo n". */
    query?: string;
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
  }) => Promise<SearchResponse>;

  /**
   * Provides a list of domain profiles and domain contacts in the authenticated user's domain directory that match the search query.
   */
  peoplePeopleSearchDirectoryPeople: (input: {
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
    /** Optional. Additional data to merge into the directory sources if they are connected through verified join keys such as email addresses or phone numbers. */
    mergeSources?: ("DIRECTORY_MERGE_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_MERGE_SOURCE_TYPE_CONTACT")[];
    /** Optional. The number of people to include in the response. Valid values are between 1 and 500, inclusive. Defaults to 100 if not set or set to 0. */
    pageSize?: number;
    /** Optional. A page token, received from a previous response `next_page_token`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `SearchDirectoryPeople` must match the first call that provided the page token. */
    pageToken?: string;
    /** Required. Prefix query that matches fields in the person. Does NOT use the read_mask for determining what fields to match. */
    query?: string;
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Required. Directory sources to return. */
    sources?: ("DIRECTORY_SOURCE_TYPE_UNSPECIFIED" | "DIRECTORY_SOURCE_TYPE_DOMAIN_CONTACT" | "DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE")[];
  }) => Promise<SearchDirectoryPeopleResponse>;

  /**
   * Delete an existing contact group owned by the authenticated user by specifying a contact group resource name. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peopleContactGroupsDelete: (input: {
    /** Required. The resource name of the contact group to delete. */
    resourceName: string;
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
    /** Optional. Set to true to also delete the contacts in the specified group. */
    deleteContacts?: boolean;
  }) => Promise<Empty>;

  /**
   * Provides information about a person by specifying a resource name. Use `people/me` to indicate the authenticated user. The request returns a 400 error if 'personFields' is not specified.
   */
  peoplePeopleGet: (input: {
    /** Required. The resource name of the person to provide information about. - To get information about the authenticated user, specify `people/me`. - To get information about a google account, specify `people/{account_id}`. - To get information about a contact, specify the resource name that identifies the contact as returned by `people.connections.list`. */
    resourceName: string;
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
    /** Required. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`. */
    "requestMask.includeField"?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_PROFILE and READ_SOURCE_TYPE_CONTACT if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
  }) => Promise<Person>;

  /**
   * Update the name of an existing contact group owned by the authenticated user. Updated contact group names must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peopleContactGroupsUpdate: (input: {
    /** Required. The contact group to update. */
    contactGroup?: ContactGroup;
    /** Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name */
    readGroupFields?: string;
    /** Optional. A field mask to restrict which fields on the group are updated. Multiple fields can be specified by separating them with commas. Defaults to `name` if not set or set to empty. Updated fields are replaced. Valid values are: * clientData * name */
    updateGroupFields?: string;
    /** The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`. */
    resourceName: string;
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
  }) => Promise<ContactGroup>;

  /**
   * Provides a list of the authenticated user's contacts. Sync tokens expire 7 days after the full sync. A request with an expired sync token will get an error with an [google.rpc.ErrorInfo](https://cloud.google.com/apis/design/errors#error_info) with reason "EXPIRED_SYNC_TOKEN". In the case of such an error clients should make a full sync request without a `sync_token`. The first page of a full sync request has an additional quota. If the quota is exceeded, a 429 error will be returned. This quota is fixed and can not be increased. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the user's contacts that have changed](/people/v1/contacts#list_the_users_contacts_that_have_changed).
   */
  peoplePeopleConnectionsList: (input: {
    /** Required. The resource name to return connections for. Only `people/me` is valid. */
    resourceName: string;
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
    /** Optional. The number of connections to include in the response. Valid values are between 1 and 1000, inclusive. Defaults to 100 if not set or set to 0. */
    pageSize?: number;
    /** Optional. A page token, received from a previous response `next_page_token`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `people.connections.list` must match the first call that provided the page token. */
    pageToken?: string;
    /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Required. Comma-separated list of person fields to be included in the response. Each path should start with `person.`: for example, `person.names` or `person.photos`. */
    "requestMask.includeField"?: string;
    /** Optional. Whether the response should return `next_sync_token` on the last page of results. It can be used to get incremental changes since the last request by setting it on the request `sync_token`. More details about sync behavior at `people.connections.list`. */
    requestSyncToken?: boolean;
    /** Optional. The order in which the connections should be sorted. Defaults to `LAST_MODIFIED_ASCENDING`. */
    sortOrder?: "LAST_MODIFIED_ASCENDING" | "LAST_MODIFIED_DESCENDING" | "FIRST_NAME_ASCENDING" | "LAST_NAME_ASCENDING";
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
    /** Optional. A sync token, received from a previous response `next_sync_token` Provide this to retrieve only the resources changed since the last request. When syncing, all other parameters provided to `people.connections.list` must match the first call that provided the sync token. More details about sync behavior at `people.connections.list`. */
    syncToken?: string;
  }) => Promise<ListConnectionsResponse>;

  /**
   * Modify the members of a contact group owned by the authenticated user. The only system contact groups that can have members added are `contactGroups/myContacts` and `contactGroups/starred`. Other system contact groups are deprecated and can only have contacts removed.
   */
  peopleContactGroupsMembersModify: (input: {
    /** Optional. The resource names of the contact people to add in the form of `people/{person_id}`. The total number of resource names in `resource_names_to_add` and `resource_names_to_remove` must be less than or equal to 1000. */
    resourceNamesToAdd?: (string)[];
    /** Optional. The resource names of the contact people to remove in the form of `people/{person_id}`. The total number of resource names in `resource_names_to_add` and `resource_names_to_remove` must be less than or equal to 1000. */
    resourceNamesToRemove?: (string)[];
    /** Required. The resource name of the contact group to modify. */
    resourceName: string;
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
  }) => Promise<ModifyContactGroupMembersResponse>;

  /**
   * Copies an "Other contact" to a new contact in the user's "myContacts" group Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peopleOtherContactsCopyOtherContactToMyContactsGroup: (input: {
    /** Required. A field mask to restrict which fields are copied into the new contact. Valid values are: * emailAddresses * names * phoneNumbers */
    copyMask?: string;
    /** Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to the copy mask with metadata and membership fields if not set. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    readMask?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
    /** Required. The resource name of the "Other contact" to copy. */
    resourceName: string;
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
  }) => Promise<Person>;

  /**
   * Delete a contact person. Any non-contact data will not be deleted. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleDeleteContact: (input: {
    /** Required. The resource name of the contact to delete. */
    resourceName: string;
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
  }) => Promise<Empty>;

  /**
   * Delete a contact's photo. Mutate requests for the same user should be done sequentially to avoid // lock contention.
   */
  peoplePeopleDeleteContactPhoto: (input: {
    /** Required. The resource name of the contact whose photo will be deleted. */
    resourceName: string;
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
    /** Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to empty if not set, which will skip the post mutate get. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
  }) => Promise<DeleteContactPhotoResponse>;

  /**
   * Update contact data for an existing contact person. Any non-contact data will not be modified. Any non-contact data in the person to update will be ignored. All fields specified in the `update_mask` will be replaced. The server returns a 400 error if `person.metadata.sources` is not specified for the contact to be updated or if there is no contact source. The server returns a 400 error with reason `"failedPrecondition"` if `person.metadata.sources.etag` is different than the contact's etag, which indicates the contact has changed since its data was read. Clients should get the latest person and merge their updates into the latest person. The server returns a 400 error if `memberships` are being updated and there are no contact group memberships specified on the person. The server returns a 400 error if more than one field is specified on a field that is a singleton for contact sources: * biographies * birthdays * genders * names Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleUpdateContact: (input: {
    /** The person's street addresses. */
    addresses?: (Address)[];
    /** Output only. **DEPRECATED** (Please use `person.ageRanges` instead) The person's age range. */
    ageRange?: "AGE_RANGE_UNSPECIFIED" | "LESS_THAN_EIGHTEEN" | "EIGHTEEN_TO_TWENTY" | "TWENTY_ONE_OR_OLDER";
    /** Output only. The person's age ranges. */
    ageRanges?: (AgeRangeType)[];
    /** The person's biographies. This field is a singleton for contact sources. */
    biographies?: (Biography)[];
    /** The person's birthdays. This field is a singleton for contact sources. */
    birthdays?: (Birthday)[];
    /** **DEPRECATED**: No data will be returned The person's bragging rights. */
    braggingRights?: (BraggingRights)[];
    /** The person's calendar URLs. */
    calendarUrls?: (CalendarUrl)[];
    /** The person's client data. */
    clientData?: (ClientData)[];
    /** Output only. The person's cover photos. */
    coverPhotos?: (CoverPhoto)[];
    /** The person's email addresses. For `people.connections.list` and `otherContacts.list` the number of email addresses is limited to 100. If a Person has more email addresses the entire set can be obtained by calling GetPeople. */
    emailAddresses?: (EmailAddress)[];
    /** The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation. */
    etag?: string;
    /** The person's events. */
    events?: (Event)[];
    /** The person's external IDs. */
    externalIds?: (ExternalId)[];
    /** The person's file-ases. */
    fileAses?: (FileAs)[];
    /** The person's genders. This field is a singleton for contact sources. */
    genders?: (Gender)[];
    /** The person's instant messaging clients. */
    imClients?: (ImClient)[];
    /** The person's interests. */
    interests?: (Interest)[];
    /** The person's locale preferences. */
    locales?: (Locale)[];
    /** The person's locations. */
    locations?: (Location)[];
    /** The person's group memberships. */
    memberships?: (Membership)[];
    /** Output only. Metadata about the person. */
    metadata?: PersonMetadata;
    /** The person's miscellaneous keywords. */
    miscKeywords?: (MiscKeyword)[];
    /** The person's names. This field is a singleton for contact sources. */
    names?: (Name)[];
    /** The person's nicknames. */
    nicknames?: (Nickname)[];
    /** The person's occupations. */
    occupations?: (Occupation)[];
    /** The person's past or current organizations. */
    organizations?: (Organization)[];
    /** The person's phone numbers. For `people.connections.list` and `otherContacts.list` the number of phone numbers is limited to 100. If a Person has more phone numbers the entire set can be obtained by calling GetPeople. */
    phoneNumbers?: (PhoneNumber)[];
    /** Output only. The person's photos. */
    photos?: (Photo)[];
    /** The person's relations. */
    relations?: (Relation)[];
    /** Output only. **DEPRECATED**: No data will be returned The person's relationship interests. */
    relationshipInterests?: (RelationshipInterest)[];
    /** Output only. **DEPRECATED**: No data will be returned The person's relationship statuses. */
    relationshipStatuses?: (RelationshipStatus)[];
    /** **DEPRECATED**: (Please use `person.locations` instead) The person's residences. */
    residences?: (Residence)[];
    /** The resource name for the person, assigned by the server. An ASCII string in the form of `people/{person_id}`. */
    resourceName?: string;
    /** The person's SIP addresses. */
    sipAddresses?: (SipAddress)[];
    /** The person's skills. */
    skills?: (Skill)[];
    /** Output only. **DEPRECATED**: No data will be returned The person's taglines. */
    taglines?: (Tagline)[];
    /** The person's associated URLs. */
    urls?: (Url)[];
    /** The person's user defined data. */
    userDefined?: (UserDefined)[];
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
    /** Optional. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. Defaults to all fields if not set. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
    /** Required. A field mask to restrict which fields on the person are updated. Multiple fields can be specified by separating them with commas. All updated fields will be replaced. Valid values are: * addresses * biographies * birthdays * calendarUrls * clientData * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * relations * sipAddresses * urls * userDefined */
    updatePersonFields?: string;
  }, options: { params: { resourceName: string } }) => Promise<Person>;

  /**
   * Update a contact's photo. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures.
   */
  peoplePeopleUpdateContactPhoto: (input: {
    /** Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to empty if not set, which will skip the post mutate get. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
    personFields?: string;
    /** Required. Raw photo bytes */
    photoBytes?: string;
    /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
    sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
    /** Required. Person resource name */
    resourceName: string;
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
  }) => Promise<UpdateContactPhotoResponse>;
};

export * from "./schemas.js";
