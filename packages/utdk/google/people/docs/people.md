# People

14 operations · `utdk/google/people`

```ts
import people from "utdk/google/people";
```

## `people.peoplePeopleGet`

Provides information about a person by specifying a resource name. Use `people/me` to indicate the authenticated user. The request returns a 400 error if 'personFields' is not specified. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleGet(input: {
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
}): Promise<Person>
```

<sub>`GET /v1/{resourceName}` · `people.people.get`</sub>

## `people.peoplePeopleDeleteContact`

Delete a contact person. Any non-contact data will not be deleted. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleDeleteContact(input: {
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
}): Promise<Empty>
```

<sub>`DELETE /v1/{resourceName}:deleteContact` · `people.people.deleteContact`</sub>

## `people.peoplePeopleDeleteContactPhoto`

Delete a contact's photo. Mutate requests for the same user should be done sequentially to avoid // lock contention. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleDeleteContactPhoto(input: {
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
}): Promise<DeleteContactPhotoResponse>
```

<sub>`DELETE /v1/{resourceName}:deleteContactPhoto` · `people.people.deleteContactPhoto`</sub>

## `people.peoplePeopleUpdateContact`

Update contact data for an existing contact person. Any non-contact data will not be modified. Any non-contact data in the person to update will be ignored. All fields specified in the `update_mask` will be replaced. The server returns a 400 error if `person.metadata.sources` is not specified for the contact to be updated or if there is no contact source. The server returns a 400 error with reason `"failedPrecondition"` if `person.metadata.sources.etag` is different than the contact's etag, which indicates the contact has changed since its data was read. Clients should get the latest person and merge their updates into the latest person. The server returns a 400 error if `memberships` are being updated and there are no contact group memberships specified on the person. The server returns a 400 error if more than one field is specified on a field that is a singleton for contact sources: * biographies * birthdays * genders * names Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleUpdateContact(input: {
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
}, options: { params: { resourceName: string } }): Promise<Person>
```

<sub>`PATCH /v1/{resourceName}:updateContact` · `people.people.updateContact`</sub>

## `people.peoplePeopleUpdateContactPhoto`

Update a contact's photo. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleUpdateContactPhoto(input: {
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
}): Promise<UpdateContactPhotoResponse>
```

<sub>`PATCH /v1/{resourceName}:updateContactPhoto` · `people.people.updateContactPhoto`</sub>

## `people.peoplePeopleConnectionsList`

Provides a list of the authenticated user's contacts. Sync tokens expire 7 days after the full sync. A request with an expired sync token will get an error with an [google.rpc.ErrorInfo](https://cloud.google.com/apis/design/errors#error_info) with reason "EXPIRED_SYNC_TOKEN". In the case of such an error clients should make a full sync request without a `sync_token`. The first page of a full sync request has an additional quota. If the quota is exceeded, a 429 error will be returned. This quota is fixed and can not be increased. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the user's contacts that have changed](/people/v1/contacts#list_the_users_contacts_that_have_changed). — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleConnectionsList(input: {
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
}): Promise<ListConnectionsResponse>
```

<sub>`GET /v1/{resourceName}/connections` · `people.people.connections.list`</sub>

## `people.peoplePeopleBatchCreateContacts`

Create a batch of new contacts and return the PersonResponses for the newly Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleBatchCreateContacts(input: {
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
}): Promise<BatchCreateContactsResponse>
```

<sub>`POST /v1/people:batchCreateContacts` · `people.people.batchCreateContacts`</sub>

## `people.peoplePeopleBatchDeleteContacts`

Delete a batch of contacts. Any non-contact data will not be deleted. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleBatchDeleteContacts(input: {
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
}): Promise<Empty>
```

<sub>`POST /v1/people:batchDeleteContacts` · `people.people.batchDeleteContacts`</sub>

## `people.peoplePeopleGetBatchGet`

Provides information about a list of specific people by specifying a list of requested resource names. Use `people/me` to indicate the authenticated user. The request returns a 400 error if 'personFields' is not specified. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleGetBatchGet(input: {
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
}): Promise<GetPeopleResponse>
```

<sub>`GET /v1/people:batchGet` · `people.people.getBatchGet`</sub>

## `people.peoplePeopleBatchUpdateContacts`

Update a batch of contacts and return a map of resource names to PersonResponses for the updated contacts. Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleBatchUpdateContacts(input: {
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
}): Promise<BatchUpdateContactsResponse>
```

<sub>`POST /v1/people:batchUpdateContacts` · `people.people.batchUpdateContacts`</sub>

## `people.peoplePeopleCreateContact`

Create a new contact and return the person resource for that contact. The request returns a 400 error if more than one field is specified on a field that is a singleton for contact sources: * biographies * birthdays * genders * names Mutate requests for the same user should be sent sequentially to avoid increased latency and failures. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleCreateContact(input: {
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
}): Promise<Person>
```

<sub>`POST /v1/people:createContact` · `people.people.createContact`</sub>

## `people.peoplePeopleListDirectoryPeople`

Provides a list of domain profiles and domain contacts in the authenticated user's domain directory. When the `sync_token` is specified, resources deleted since the last sync will be returned as a person with `PersonMetadata.deleted` set to true. When the `page_token` or `sync_token` is specified, all other request parameters must match the first call. Writes may have a propagation delay of several minutes for sync requests. Incremental syncs are not intended for read-after-write use cases. See example usage at [List the directory people that have changed](/people/v1/directory#list_the_directory_people_that_have_changed). — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleListDirectoryPeople(input: {
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
}): Promise<ListDirectoryPeopleResponse>
```

<sub>`GET /v1/people:listDirectoryPeople` · `people.people.listDirectoryPeople`</sub>

## `people.peoplePeopleSearchContacts`

Provides a list of contacts in the authenticated user's grouped contacts that matches the search query. The query matches on a contact's `names`, `nickNames`, `emailAddresses`, `phoneNumbers`, and `organizations` fields that are from the CONTACT source. **IMPORTANT**: Before searching, clients should send a warmup request with an empty query to update the cache. See https://developers.google.com/people/v1/contacts#search_the_users_contacts — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleSearchContacts(input: {
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
}): Promise<SearchResponse>
```

<sub>`GET /v1/people:searchContacts` · `people.people.searchContacts`</sub>

## `people.peoplePeopleSearchDirectoryPeople`

Provides a list of domain profiles and domain contacts in the authenticated user's domain directory that match the search query. — [Provider docs](https://developers.google.com/people/)

```ts
people.peoplePeopleSearchDirectoryPeople(input: {
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
}): Promise<SearchDirectoryPeopleResponse>
```

<sub>`GET /v1/people:searchDirectoryPeople` · `people.people.searchDirectoryPeople`</sub>

Named result types are exported from the package — hover them in your editor, or browse `types/schemas.ts`.

<!-- prompt-hash:
8c3694991a4c289225f05a4e8f1e098cc74d085a088d7dffd82f00d93797b7f8
-->
