/** A person's physical address. May be a P.O. box or street address. All fields are optional. */
export type Address = {
  /** The city of the address. */
  city?: string;
  /** The country of the address. */
  country?: string;
  /** The [ISO 3166-1 alpha-2](http://www.iso.org/iso/country_codes.htm) country code of the address. */
  countryCode?: string;
  /** The extended address of the address; for example, the apartment number. */
  extendedAddress?: string;
  /** Output only. The type of the address translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** The unstructured value of the address. If this is not set by the user it will be automatically constructed from structured values. */
  formattedValue?: string;
  /** Metadata about the address. */
  metadata?: FieldMetadata;
  /** The P.O. box of the address. */
  poBox?: string;
  /** The postal code of the address. */
  postalCode?: string;
  /** The region of the address; for example, the state or province. */
  region?: string;
  /** The street address. */
  streetAddress?: string;
  /** The type of the address. The type can be custom or one of these predefined values: * `home` * `work` * `other` */
  type?: string;
};

/** A person's age range. */
export type AgeRangeType = {
  /** The age range. */
  ageRange?: "AGE_RANGE_UNSPECIFIED" | "LESS_THAN_EIGHTEEN" | "EIGHTEEN_TO_TWENTY" | "TWENTY_ONE_OR_OLDER";
  /** Metadata about the age range. */
  metadata?: FieldMetadata;
};

/** A request to create a batch of contacts. */
export type BatchCreateContactsRequest = {
  /** Required. The contact to create. Allows up to 200 contacts in a single request. */
  contacts?: (ContactToCreate)[];
  /** Required. A field mask to restrict which fields on each person are returned in the response. Multiple fields can be specified by separating them with commas. If read mask is left empty, the post-mutate-get is skipped and no data will be returned in the response. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
  readMask?: string;
  /** Optional. A mask of what source types to return in the post mutate read. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
  sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
};

/** If not successful, returns BatchCreateContactsErrorDetails which contains a list of errors for each invalid contact. The response to a request to create a batch of contacts. */
export type BatchCreateContactsResponse = {
  /** The contacts that were created, unless the request `read_mask` is empty. */
  createdPeople?: (PersonResponse)[];
};

/** A request to delete a batch of existing contacts. */
export type BatchDeleteContactsRequest = {
  /** Required. The resource names of the contact to delete. It's repeatable. Allows up to 500 resource names in a single request. */
  resourceNames?: (string)[];
};

/** The response to a batch get contact groups request. */
export type BatchGetContactGroupsResponse = {
  /** The list of responses for each requested contact group resource. */
  responses?: (ContactGroupResponse)[];
};

/** A request to update a batch of contacts. */
export type BatchUpdateContactsRequest = {
  /** Required. A map of resource names to the person data to be updated. Allows up to 200 contacts in a single request. */
  contacts?: { [key: string]: Person | undefined };
  /** Required. A field mask to restrict which fields on each person are returned. Multiple fields can be specified by separating them with commas. If read mask is left empty, the post-mutate-get is skipped and no data will be returned in the response. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
  readMask?: string;
  /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
  sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
  /** Required. A field mask to restrict which fields on the person are updated. Multiple fields can be specified by separating them with commas. All specified fields will be replaced, or cleared if left empty for each person. Valid values are: * addresses * biographies * birthdays * calendarUrls * clientData * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * relations * sipAddresses * urls * userDefined */
  updateMask?: string;
};

/** If not successful, returns BatchUpdateContactsErrorDetails, a list of errors corresponding to each contact. The response to a request to update a batch of contacts. */
export type BatchUpdateContactsResponse = {
  /** A map of resource names to the contacts that were updated, unless the request `read_mask` is empty. */
  updateResult?: { [key: string]: PersonResponse | undefined };
};

/** A person's short biography. */
export type Biography = {
  /** The content type of the biography. */
  contentType?: "CONTENT_TYPE_UNSPECIFIED" | "TEXT_PLAIN" | "TEXT_HTML";
  /** Metadata about the biography. */
  metadata?: FieldMetadata;
  /** The short biography. */
  value?: string;
};

/** A person's birthday. At least one of the `date` and `text` fields are specified. The `date` and `text` fields typically represent the same date, but are not guaranteed to. Clients should always set the `date` field when mutating birthdays. */
export type Birthday = {
  /** The structured date of the birthday. */
  date?: Date;
  /** Metadata about the birthday. */
  metadata?: FieldMetadata;
  /** Prefer to use the `date` field if set. A free-form string representing the user's birthday. This value is not validated. */
  text?: string;
};

/** **DEPRECATED**: No data will be returned A person's bragging rights. */
export type BraggingRights = {
  /** Metadata about the bragging rights. */
  metadata?: FieldMetadata;
  /** The bragging rights; for example, `climbed mount everest`. */
  value?: string;
};

/** A person's calendar URL. */
export type CalendarUrl = {
  /** Output only. The type of the calendar URL translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the calendar URL. */
  metadata?: FieldMetadata;
  /** The type of the calendar URL. The type can be custom or one of these predefined values: * `home` * `freeBusy` * `work` */
  type?: string;
  /** The calendar URL. */
  url?: string;
};

/** Arbitrary client data that is populated by clients. Duplicate keys and values are allowed. */
export type ClientData = {
  /** The client specified key of the client data. */
  key?: string;
  /** Metadata about the client data. */
  metadata?: FieldMetadata;
  /** The client specified value of the client data. */
  value?: string;
};

/** A contact group. */
export type ContactGroup = {
  /** The group's client data. */
  clientData?: (GroupClientData)[];
  /** The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the resource. Used for web cache validation. */
  etag?: string;
  /** Output only. The name translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale for system groups names. Group names set by the owner are the same as name. */
  formattedName?: string;
  /** Output only. The contact group type. */
  groupType?: "GROUP_TYPE_UNSPECIFIED" | "USER_CONTACT_GROUP" | "SYSTEM_CONTACT_GROUP";
  /** Output only. The total number of contacts in the group irrespective of max members in specified in the request. */
  memberCount?: number;
  /** Output only. The list of contact person resource names that are members of the contact group. The field is only populated for GET requests and will only return as many members as `maxMembers` in the get request. */
  memberResourceNames?: (string)[];
  /** Output only. Metadata about the contact group. */
  metadata?: ContactGroupMetadata;
  /** The contact group name set by the group owner or a system provided name for system groups. For [`contactGroups.create`](/people/api/rest/v1/contactGroups/create) or [`contactGroups.update`](/people/api/rest/v1/contactGroups/update) the name must be unique to the users contact groups. Attempting to create a group with a duplicate name will return a HTTP 409 error. */
  name?: string;
  /** The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`. */
  resourceName?: string;
};

/** A Google contact group membership. */
export type ContactGroupMembership = {
  /** Output only. The contact group ID for the contact group membership. */
  contactGroupId?: string;
  /** The resource name for the contact group, assigned by the server. An ASCII string, in the form of `contactGroups/{contact_group_id}`. Only contact_group_resource_name can be used for modifying memberships. Any contact group membership can be removed, but only user group or "myContacts" or "starred" system groups memberships can be added. A contact must always have at least one contact group membership. */
  contactGroupResourceName?: string;
};

/** The metadata about a contact group. */
export type ContactGroupMetadata = {
  /** Output only. True if the contact group resource has been deleted. Populated only for [`ListContactGroups`](/people/api/rest/v1/contactgroups/list) requests that include a sync token. */
  deleted?: boolean;
  /** Output only. The time the group was last updated. */
  updateTime?: string;
};

/** The response for a specific contact group. */
export type ContactGroupResponse = {
  /** The contact group. */
  contactGroup?: ContactGroup;
  /** The original requested resource name. */
  requestedResourceName?: string;
  /** The status of the response. */
  status?: Status;
};

/** A wrapper that contains the person data to populate a newly created source. */
export type ContactToCreate = {
  /** Required. The person data to populate a newly created source. */
  contactPerson?: Person;
};

/** A request to copy an "Other contact" to my contacts group. */
export type CopyOtherContactToMyContactsGroupRequest = {
  /** Required. A field mask to restrict which fields are copied into the new contact. Valid values are: * emailAddresses * names * phoneNumbers */
  copyMask?: string;
  /** Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to the copy mask with metadata and membership fields if not set. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
  readMask?: string;
  /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
  sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
};

/** A person's cover photo. A large image shown on the person's profile page that represents who they are or what they care about. */
export type CoverPhoto = {
  /** Metadata about the cover photo. */
  metadata?: FieldMetadata;
  /** The URL of the cover photo. */
  url?: string;
};

/** A request to create a new contact group. */
export type CreateContactGroupRequest = {
  /** Required. The contact group to create. */
  contactGroup?: ContactGroup;
  /** Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * metadata * name */
  readGroupFields?: string;
};

/** Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp */
export type Date = {
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
};

/** The response for deleting a contact's photo. */
export type DeleteContactPhotoResponse = {
  /** The updated person, if person_fields is set in the DeleteContactPhotoRequest; otherwise this will be unset. */
  person?: Person;
};

/** A Google Workspace Domain membership. */
export type DomainMembership = {
  /** True if the person is in the viewer's Google Workspace domain. */
  inViewerDomain?: boolean;
};

/** A person's email address. */
export type EmailAddress = {
  /** The display name of the email. */
  displayName?: string;
  /** Output only. The type of the email address translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the email address. */
  metadata?: FieldMetadata;
  /** The type of the email address. The type can be custom or one of these predefined values: * `home` * `work` * `other` */
  type?: string;
  /** The email address. */
  value?: string;
};

/** A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); } */
export type Empty = { [key: string]: unknown };

/** An event related to the person. */
export type Event = {
  /** The date of the event. */
  date?: Date;
  /** Output only. The type of the event translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the event. */
  metadata?: FieldMetadata;
  /** The type of the event. The type can be custom or one of these predefined values: * `anniversary` * `other` */
  type?: string;
};

/** An identifier from an external entity related to the person. */
export type ExternalId = {
  /** Output only. The type of the event translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the external ID. */
  metadata?: FieldMetadata;
  /** The type of the external ID. The type can be custom or one of these predefined values: * `account` * `customer` * `loginId` * `network` * `organization` */
  type?: string;
  /** The value of the external ID. */
  value?: string;
};

/** Metadata about a field. */
export type FieldMetadata = {
  /** Output only. True if the field is the primary field for all sources in the person. Each person will have at most one field with `primary` set to true. */
  primary?: boolean;
  /** The source of the field. */
  source?: Source;
  /** True if the field is the primary field for the source. Each source must have at most one field with `source_primary` set to true. */
  sourcePrimary?: boolean;
  /** Output only. True if the field is verified; false if the field is unverified. A verified field is typically a name, email address, phone number, or website that has been confirmed to be owned by the person. */
  verified?: boolean;
};

/** The name that should be used to sort the person in a list. */
export type FileAs = {
  /** Metadata about the file-as. */
  metadata?: FieldMetadata;
  /** The file-as value */
  value?: string;
};

/** A person's gender. */
export type Gender = {
  /** Free form text field for pronouns that should be used to address the person. Common values are: * `he`/`him` * `she`/`her` * `they`/`them` */
  addressMeAs?: string;
  /** Output only. The value of the gender translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. Unspecified or custom value are not localized. */
  formattedValue?: string;
  /** Metadata about the gender. */
  metadata?: FieldMetadata;
  /** The gender for the person. The gender can be custom or one of these predefined values: * `male` * `female` * `unspecified` */
  value?: string;
};

/** The response to a get request for a list of people by resource name. */
export type GetPeopleResponse = {
  /** The response for each requested resource name. */
  responses?: (PersonResponse)[];
};

/** Arbitrary client data that is populated by clients. Duplicate keys and values are allowed. */
export type GroupClientData = {
  /** The client specified key of the client data. */
  key?: string;
  /** The client specified value of the client data. */
  value?: string;
};

/** A person's instant messaging client. */
export type ImClient = {
  /** Output only. The protocol of the IM client formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedProtocol?: string;
  /** Output only. The type of the IM client translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the IM client. */
  metadata?: FieldMetadata;
  /** The protocol of the IM client. The protocol can be custom or one of these predefined values: * `aim` * `msn` * `yahoo` * `skype` * `qq` * `googleTalk` * `icq` * `jabber` * `netMeeting` */
  protocol?: string;
  /** The type of the IM client. The type can be custom or one of these predefined values: * `home` * `work` * `other` */
  type?: string;
  /** The user name used in the IM client. */
  username?: string;
};

/** One of the person's interests. */
export type Interest = {
  /** Metadata about the interest. */
  metadata?: FieldMetadata;
  /** The interest; for example, `stargazing`. */
  value?: string;
};

/** The response to a request for the authenticated user's connections. */
export type ListConnectionsResponse = {
  /** The list of people that the requestor is connected to. */
  connections?: (Person)[];
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A token, which can be sent as `sync_token` to retrieve changes since the last request. Request must set `request_sync_token` to return the sync token. When the response is paginated, only the last page will contain `nextSyncToken`. */
  nextSyncToken?: string;
  /** The total number of items in the list without pagination. */
  totalItems?: number;
  /** **DEPRECATED** (Please use totalItems) The total number of people in the list without pagination. */
  totalPeople?: number;
};

/** The response to a list contact groups request. */
export type ListContactGroupsResponse = {
  /** The list of contact groups. Members of the contact groups are not populated. */
  contactGroups?: (ContactGroup)[];
  /** The token that can be used to retrieve the next page of results. */
  nextPageToken?: string;
  /** The token that can be used to retrieve changes since the last request. */
  nextSyncToken?: string;
  /** The total number of items in the list without pagination. */
  totalItems?: number;
};

/** The response to a request for the authenticated user's domain directory. */
export type ListDirectoryPeopleResponse = {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A token, which can be sent as `sync_token` to retrieve changes since the last request. Request must set `request_sync_token` to return the sync token. */
  nextSyncToken?: string;
  /** The list of people in the domain directory. */
  people?: (Person)[];
};

/** The response to a request for the authenticated user's "Other contacts". */
export type ListOtherContactsResponse = {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** A token, which can be sent as `sync_token` to retrieve changes since the last request. Request must set `request_sync_token` to return the sync token. */
  nextSyncToken?: string;
  /** The list of "Other contacts" returned as Person resources. "Other contacts" support a limited subset of fields. See ListOtherContactsRequest.request_mask for more detailed information. */
  otherContacts?: (Person)[];
  /** The total number of other contacts in the list without pagination. */
  totalSize?: number;
};

/** A person's locale preference. */
export type Locale = {
  /** Metadata about the locale. */
  metadata?: FieldMetadata;
  /** The well-formed [IETF BCP 47](https://tools.ietf.org/html/bcp47) language tag representing the locale. */
  value?: string;
};

/** A person's location. */
export type Location = {
  /** The building identifier. */
  buildingId?: string;
  /** Whether the location is the current location. */
  current?: boolean;
  /** The individual desk location. */
  deskCode?: string;
  /** The floor name or number. */
  floor?: string;
  /** The floor section in `floor_name`. */
  floorSection?: string;
  /** Metadata about the location. */
  metadata?: FieldMetadata;
  /** The type of the location. The type can be custom or one of these predefined values: * `desk` * `grewUp` */
  type?: string;
  /** The free-form value of the location. */
  value?: string;
};

/** A person's membership in a group. Only contact group memberships can be modified. */
export type Membership = {
  /** The contact group membership. */
  contactGroupMembership?: ContactGroupMembership;
  /** Output only. The domain membership. */
  domainMembership?: DomainMembership;
  /** Metadata about the membership. */
  metadata?: FieldMetadata;
};

/** A person's miscellaneous keyword. */
export type MiscKeyword = {
  /** Output only. The type of the miscellaneous keyword translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the miscellaneous keyword. */
  metadata?: FieldMetadata;
  /** The miscellaneous keyword type. */
  type?: "TYPE_UNSPECIFIED" | "OUTLOOK_BILLING_INFORMATION" | "OUTLOOK_DIRECTORY_SERVER" | "OUTLOOK_KEYWORD" | "OUTLOOK_MILEAGE" | "OUTLOOK_PRIORITY" | "OUTLOOK_SENSITIVITY" | "OUTLOOK_SUBJECT" | "OUTLOOK_USER" | "HOME" | "WORK" | "OTHER";
  /** The value of the miscellaneous keyword. */
  value?: string;
};

/** A request to modify an existing contact group's members. Contacts can be removed from any group but they can only be added to a user group or "myContacts" or "starred" system groups. */
export type ModifyContactGroupMembersRequest = {
  /** Optional. The resource names of the contact people to add in the form of `people/{person_id}`. The total number of resource names in `resource_names_to_add` and `resource_names_to_remove` must be less than or equal to 1000. */
  resourceNamesToAdd?: (string)[];
  /** Optional. The resource names of the contact people to remove in the form of `people/{person_id}`. The total number of resource names in `resource_names_to_add` and `resource_names_to_remove` must be less than or equal to 1000. */
  resourceNamesToRemove?: (string)[];
};

/** The response to a modify contact group members request. */
export type ModifyContactGroupMembersResponse = {
  /** The contact people resource names that cannot be removed from their last contact group. */
  canNotRemoveLastContactGroupResourceNames?: (string)[];
  /** The contact people resource names that were not found. */
  notFoundResourceNames?: (string)[];
};

/** A person's name. If the name is a mononym, the family name is empty. */
export type Name = {
  /** Output only. The display name formatted according to the locale specified by the viewer's account or the `Accept-Language` HTTP header. */
  displayName?: string;
  /** Output only. The display name with the last name first formatted according to the locale specified by the viewer's account or the `Accept-Language` HTTP header. */
  displayNameLastFirst?: string;
  /** The family name. */
  familyName?: string;
  /** The given name. */
  givenName?: string;
  /** The honorific prefixes, such as `Mrs.` or `Dr.` */
  honorificPrefix?: string;
  /** The honorific suffixes, such as `Jr.` */
  honorificSuffix?: string;
  /** Metadata about the name. */
  metadata?: FieldMetadata;
  /** The middle name(s). */
  middleName?: string;
  /** The family name spelled as it sounds. */
  phoneticFamilyName?: string;
  /** The full name spelled as it sounds. */
  phoneticFullName?: string;
  /** The given name spelled as it sounds. */
  phoneticGivenName?: string;
  /** The honorific prefixes spelled as they sound. */
  phoneticHonorificPrefix?: string;
  /** The honorific suffixes spelled as they sound. */
  phoneticHonorificSuffix?: string;
  /** The middle name(s) spelled as they sound. */
  phoneticMiddleName?: string;
  /** The free form name value. */
  unstructuredName?: string;
};

/** A person's nickname. */
export type Nickname = {
  /** Metadata about the nickname. */
  metadata?: FieldMetadata;
  /** The type of the nickname. */
  type?: "DEFAULT" | "MAIDEN_NAME" | "INITIALS" | "GPLUS" | "OTHER_NAME" | "ALTERNATE_NAME" | "SHORT_NAME";
  /** The nickname. */
  value?: string;
};

/** A person's occupation. */
export type Occupation = {
  /** Metadata about the occupation. */
  metadata?: FieldMetadata;
  /** The occupation; for example, `carpenter`. */
  value?: string;
};

/** A person's past or current organization. Overlapping date ranges are permitted. */
export type Organization = {
  /** The person's cost center at the organization. */
  costCenter?: string;
  /** True if the organization is the person's current organization; false if the organization is a past organization. */
  current?: boolean;
  /** The person's department at the organization. */
  department?: string;
  /** The domain name associated with the organization; for example, `google.com`. */
  domain?: string;
  /** The end date when the person left the organization. */
  endDate?: Date;
  /** Output only. The type of the organization translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** The person's full-time equivalent millipercent within the organization (100000 = 100%). */
  fullTimeEquivalentMillipercent?: number;
  /** The person's job description at the organization. */
  jobDescription?: string;
  /** The location of the organization office the person works at. */
  location?: string;
  /** Metadata about the organization. */
  metadata?: FieldMetadata;
  /** The name of the organization. */
  name?: string;
  /** The phonetic name of the organization. */
  phoneticName?: string;
  /** The start date when the person joined the organization. */
  startDate?: Date;
  /** The symbol associated with the organization; for example, a stock ticker symbol, abbreviation, or acronym. */
  symbol?: string;
  /** The person's job title at the organization. */
  title?: string;
  /** The type of the organization. The type can be custom or one of these predefined values: * `work` * `school` */
  type?: string;
};

/** Information about a person merged from various data sources such as the authenticated user's contacts and profile data. Most fields can have multiple items. The items in a field have no guaranteed order, but each non-empty field is guaranteed to have exactly one field with `metadata.primary` set to true. */
export type Person = {
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
};

/** The metadata about a person. */
export type PersonMetadata = {
  /** Output only. True if the person resource has been deleted. Populated only for `people.connections.list` and `otherContacts.list` sync requests. */
  deleted?: boolean;
  /** Output only. Resource names of people linked to this resource. */
  linkedPeopleResourceNames?: (string)[];
  /** Output only. **DEPRECATED** (Please use `person.metadata.sources.profileMetadata.objectType` instead) The type of the person object. */
  objectType?: "OBJECT_TYPE_UNSPECIFIED" | "PERSON" | "PAGE";
  /** Output only. Any former resource names this person has had. Populated only for `people.connections.list` requests that include a sync token. The resource name may change when adding or removing fields that link a contact and profile such as a verified email, verified phone number, or profile URL. */
  previousResourceNames?: (string)[];
  /** The sources of data for the person. */
  sources?: (Source)[];
};

/** The response for a single person */
export type PersonResponse = {
  /** **DEPRECATED** (Please use status instead) [HTTP 1.1 status code] (http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). */
  httpStatusCode?: number;
  /** The person. */
  person?: Person;
  /** The original requested resource name. May be different than the resource name on the returned person. The resource name can change when adding or removing fields that link a contact and profile such as a verified email, verified phone number, or a profile URL. */
  requestedResourceName?: string;
  /** The status of the response. */
  status?: Status;
};

/** A person's phone number. */
export type PhoneNumber = {
  /** Output only. The canonicalized [ITU-T E.164](https://law.resource.org/pub/us/cfr/ibr/004/itu-t.E.164.1.2008.pdf) form of the phone number. */
  canonicalForm?: string;
  /** Output only. The type of the phone number translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the phone number. */
  metadata?: FieldMetadata;
  /** The type of the phone number. The type can be custom or one of these predefined values: * `home` * `work` * `mobile` * `homeFax` * `workFax` * `otherFax` * `pager` * `workMobile` * `workPager` * `main` * `googleVoice` * `other` */
  type?: string;
  /** The phone number. */
  value?: string;
};

/** A person's photo. A picture shown next to the person's name to help others recognize the person. */
export type Photo = {
  /** Metadata about the photo. */
  metadata?: FieldMetadata;
  /** The URL of the photo. You can change the desired size by appending a query parameter `sz={size}` at the end of the url, where {size} is the size in pixels. Example: https://lh3.googleusercontent.com/-T_wVWLlmg7w/AAAAAAAAAAI/AAAAAAAABa8/00gzXvDBYqw/s100/photo.jpg?sz=50 */
  url?: string;
};

/** The metadata about a profile. */
export type ProfileMetadata = {
  /** Output only. The profile object type. */
  objectType?: "OBJECT_TYPE_UNSPECIFIED" | "PERSON" | "PAGE";
  /** Output only. The user types. */
  userTypes?: ("USER_TYPE_UNKNOWN" | "GOOGLE_USER" | "GPLUS_USER" | "GOOGLE_APPS_USER")[];
};

/** A person's relation to another person. */
export type Relation = {
  /** Output only. The type of the relation translated and formatted in the viewer's account locale or the locale specified in the Accept-Language HTTP header. */
  formattedType?: string;
  /** Metadata about the relation. */
  metadata?: FieldMetadata;
  /** The name of the other person this relation refers to. */
  person?: string;
  /** The person's relation to the other person. The type can be custom or one of these predefined values: * `spouse` * `child` * `mother` * `father` * `parent` * `brother` * `sister` * `friend` * `relative` * `domesticPartner` * `manager` * `assistant` * `referredBy` * `partner` */
  type?: string;
};

/** **DEPRECATED**: No data will be returned A person's relationship interest . */
export type RelationshipInterest = {
  /** Output only. The value of the relationship interest translated and formatted in the viewer's account locale or the locale specified in the Accept-Language HTTP header. */
  formattedValue?: string;
  /** Metadata about the relationship interest. */
  metadata?: FieldMetadata;
  /** The kind of relationship the person is looking for. The value can be custom or one of these predefined values: * `friend` * `date` * `relationship` * `networking` */
  value?: string;
};

/** **DEPRECATED**: No data will be returned A person's relationship status. */
export type RelationshipStatus = {
  /** Output only. The value of the relationship status translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedValue?: string;
  /** Metadata about the relationship status. */
  metadata?: FieldMetadata;
  /** The relationship status. The value can be custom or one of these predefined values: * `single` * `inARelationship` * `engaged` * `married` * `itsComplicated` * `openRelationship` * `widowed` * `inDomesticPartnership` * `inCivilUnion` */
  value?: string;
};

/** **DEPRECATED**: Please use `person.locations` instead. A person's past or current residence. */
export type Residence = {
  /** True if the residence is the person's current residence; false if the residence is a past residence. */
  current?: boolean;
  /** Metadata about the residence. */
  metadata?: FieldMetadata;
  /** The address of the residence. */
  value?: string;
};

/** The response to a request for people in the authenticated user's domain directory that match the specified query. */
export type SearchDirectoryPeopleResponse = {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of people in the domain directory that match the query. */
  people?: (Person)[];
  /** The total number of items in the list without pagination. */
  totalSize?: number;
};

/** The response to a search request for the authenticated user, given a query. */
export type SearchResponse = {
  /** The results of the request. */
  results?: (SearchResult)[];
};

/** A result of a search query. */
export type SearchResult = {
  /** The matched Person. */
  person?: Person;
};

/** A person's SIP address. Session Initial Protocol addresses are used for VoIP communications to make voice or video calls over the internet. */
export type SipAddress = {
  /** Output only. The type of the SIP address translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the SIP address. */
  metadata?: FieldMetadata;
  /** The type of the SIP address. The type can be custom or or one of these predefined values: * `home` * `work` * `mobile` * `other` */
  type?: string;
  /** The SIP address in the [RFC 3261 19.1](https://tools.ietf.org/html/rfc3261#section-19.1) SIP URI format. */
  value?: string;
};

/** A skill that the person has. */
export type Skill = {
  /** Metadata about the skill. */
  metadata?: FieldMetadata;
  /** The skill; for example, `underwater basket weaving`. */
  value?: string;
};

/** The source of a field. */
export type Source = {
  /** **Only populated in `person.metadata.sources`.** The [HTTP entity tag](https://en.wikipedia.org/wiki/HTTP_ETag) of the source. Used for web cache validation. */
  etag?: string;
  /** The unique identifier within the source type generated by the server. */
  id?: string;
  /** Output only. **Only populated in `person.metadata.sources`.** Metadata about a source of type PROFILE. */
  profileMetadata?: ProfileMetadata;
  /** The source type. */
  type?: "SOURCE_TYPE_UNSPECIFIED" | "ACCOUNT" | "PROFILE" | "DOMAIN_PROFILE" | "CONTACT" | "OTHER_CONTACT" | "DOMAIN_CONTACT";
  /** Output only. **Only populated in `person.metadata.sources`.** Last update timestamp of this source. */
  updateTime?: string;
};

/** The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors). */
export type Status = {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: ({ [key: string]: unknown | undefined })[];
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
};

/** **DEPRECATED**: No data will be returned A brief one-line description of the person. */
export type Tagline = {
  /** Metadata about the tagline. */
  metadata?: FieldMetadata;
  /** The tagline. */
  value?: string;
};

/** A request to update an existing user contact group. All updated fields will be replaced. */
export type UpdateContactGroupRequest = {
  /** Required. The contact group to update. */
  contactGroup?: ContactGroup;
  /** Optional. A field mask to restrict which fields on the group are returned. Defaults to `metadata`, `groupType`, and `name` if not set or set to empty. Valid fields are: * clientData * groupType * memberCount * metadata * name */
  readGroupFields?: string;
  /** Optional. A field mask to restrict which fields on the group are updated. Multiple fields can be specified by separating them with commas. Defaults to `name` if not set or set to empty. Updated fields are replaced. Valid values are: * clientData * name */
  updateGroupFields?: string;
};

/** A request to update an existing contact's photo. All requests must have a valid photo format: JPEG or PNG. */
export type UpdateContactPhotoRequest = {
  /** Optional. A field mask to restrict which fields on the person are returned. Multiple fields can be specified by separating them with commas. Defaults to empty if not set, which will skip the post mutate get. Valid values are: * addresses * ageRanges * biographies * birthdays * calendarUrls * clientData * coverPhotos * emailAddresses * events * externalIds * genders * imClients * interests * locales * locations * memberships * metadata * miscKeywords * names * nicknames * occupations * organizations * phoneNumbers * photos * relations * sipAddresses * skills * urls * userDefined */
  personFields?: string;
  /** Required. Raw photo bytes */
  photoBytes?: string;
  /** Optional. A mask of what source types to return. Defaults to READ_SOURCE_TYPE_CONTACT and READ_SOURCE_TYPE_PROFILE if not set. */
  sources?: ("READ_SOURCE_TYPE_UNSPECIFIED" | "READ_SOURCE_TYPE_PROFILE" | "READ_SOURCE_TYPE_CONTACT" | "READ_SOURCE_TYPE_DOMAIN_CONTACT")[];
};

/** The response for updating a contact's photo. */
export type UpdateContactPhotoResponse = {
  /** The updated person, if person_fields is set in the UpdateContactPhotoRequest; otherwise this will be unset. */
  person?: Person;
};

/** A person's associated URLs. */
export type Url = {
  /** Output only. The type of the URL translated and formatted in the viewer's account locale or the `Accept-Language` HTTP header locale. */
  formattedType?: string;
  /** Metadata about the URL. */
  metadata?: FieldMetadata;
  /** The type of the URL. The type can be custom or one of these predefined values: * `home` * `work` * `blog` * `profile` * `homePage` * `ftp` * `reservations` * `appInstallPage`: website for a Currents application. * `other` */
  type?: string;
  /** The URL. */
  value?: string;
};

/** Arbitrary user data that is populated by the end users. */
export type UserDefined = {
  /** The end user specified key of the user defined data. */
  key?: string;
  /** Metadata about the user defined data. */
  metadata?: FieldMetadata;
  /** The end user specified value of the user defined data. */
  value?: string;
};
