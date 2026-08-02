export type ApiV2010Account = {
  /** The authorization token for this account. This token should be kept a secret, so no sharing. */
  auth_token?: string | null;
  /** The date that this account was created, in GMT in RFC 2822 format */
  date_created?: string | null;
  /** The date that this account was last updated, in GMT in RFC 2822 format. */
  date_updated?: string | null;
  /** A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address. */
  friendly_name?: string | null;
  /** The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid. */
  owner_account_sid?: string | null;
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  status?: AccountEnumStatus;
  /** A Map of various subresources available for the given Account Instance */
  subresource_uris?: { [key: string]: unknown } | null;
  type?: AccountEnumType;
  /** The URI for this resource, relative to `https://api.twilio.com` */
  uri?: string | null;
};

/** The status of this account. Usually `active`, but can be `suspended` or `closed`. */
export type AccountEnumStatus = "active" | "suspended" | "closed";

/** The type of this account. Either `Trial` or `Full` if it's been upgraded */
export type AccountEnumType = "Trial" | "Full";

export type ApiV2010AccountAddress = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource. */
  account_sid?: string | null;
  /** The city in which the address is located. */
  city?: string | null;
  /** The name associated with the address.This property has a maximum length of 16 4-byte characters, or 21 3-byte characters. */
  customer_name?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The ISO country code of the address. */
  iso_country?: string | null;
  /** The postal code of the address. */
  postal_code?: string | null;
  /** The state or region of the address. */
  region?: string | null;
  /** The unique string that that we created to identify the Address resource. */
  sid?: string | null;
  /** The number and street address of the address. */
  street?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** Whether emergency calling has been enabled on this number. */
  emergency_enabled?: boolean | null;
  /** Whether the address has been validated to comply with local regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been validated. `false` indicate the country doesn't require validation or the Address is not valid. */
  validated?: boolean | null;
  /** Whether the address has been verified to comply with regulation. In countries that require valid addresses, an invalid address will not be accepted. `true` indicates the Address has been verified. `false` indicate the country doesn't require verified or the Address is not valid. */
  verified?: boolean | null;
  /** The additional number and street address of the address. */
  street_secondary?: string | null;
};

export type ApiV2010AccountApplication = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource. */
  account_sid?: string | null;
  /** The API version used to start a new TwiML session. */
  api_version?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The URL we call using a POST method to send message status information to your application. */
  message_status_callback?: string | null;
  /** The unique string that that we created to identify the Application resource. */
  sid?: string | null;
  /** The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call using a POST method to send status information to your application about SMS messages that refer to the application. */
  sms_status_callback?: string | null;
  /** The URL we call when the phone number receives an incoming SMS message. */
  sms_url?: string | null;
  /** The URL we call using the `status_callback_method` to send status information to your application. */
  status_callback?: string | null;
  /** The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`. */
  status_callback_method?: "GET" | "POST" | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`. */
  voice_caller_id_lookup?: boolean | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`. */
  voice_fallback_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number assigned to this application receives a call. */
  voice_url?: string | null;
  /** Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`. */
  public_application_connect_enabled?: boolean | null;
};

export type ApiV2010AccountAuthorizedConnectApp = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource. */
  account_sid?: string | null;
  /** The company name set for the Connect App. */
  connect_app_company_name?: string | null;
  /** A detailed description of the Connect App. */
  connect_app_description?: string | null;
  /** The name of the Connect App. */
  connect_app_friendly_name?: string | null;
  /** The public URL for the Connect App. */
  connect_app_homepage_url?: string | null;
  /** The SID that we assigned to the Connect App. */
  connect_app_sid?: string | null;
  /** The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`. */
  permissions?: (AuthorizedConnectAppEnumPermission)[] | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The set of permissions that you authorized for the Connect App.  Can be: `get-all` or `post-all`. */
export type AuthorizedConnectAppEnumPermission = "get-all" | "post-all";

export type ApiV2010AccountAvailablePhoneNumberCountry = {
  /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country. */
  country_code?: string | null;
  /** The name of the country. */
  country?: string | null;
  /** The URI of the Country resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** Whether all phone numbers available in the country are new to the Twilio platform. `true` if they are and `false` if all numbers are not in the Twilio Phone Number Beta program. */
  beta?: boolean | null;
  /** A list of related AvailablePhoneNumber resources identified by their URIs relative to `https://api.twilio.com`. */
  subresource_uris?: { [key: string]: unknown } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip = {
  /** A formatted version of the phone number. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) of this phone number. Available for only phone numbers from the US and Canada. */
  lata?: string | null;
  /** The locality or city of this phone number's location. */
  locality?: string | null;
  /** The [rate center](https://en.wikipedia.org/wiki/Telephone_exchange) of this phone number. Available for only phone numbers from the US and Canada. */
  rate_center?: string | null;
  /** The latitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  latitude?: number | null;
  /** The longitude of this phone number's location. Available for only phone numbers from the US and Canada. */
  longitude?: number | null;
  /** The two-letter state or province abbreviation of this phone number's location. Available for only phone numbers from the US and Canada. */
  region?: string | null;
  /** The postal or ZIP code of this phone number's location. Available for only phone numbers from the US and Canada. */
  postal_code?: string | null;
  /** The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of this phone number. */
  iso_country?: string | null;
  /** The type of [Address](https://www.twilio.com/docs/usage/api/address) resource the phone number requires. Can be: `none`, `any`, `local`, or `foreign`. `none` means no address is required. `any` means an address is required, but it can be anywhere in the world. `local` means an address in the phone number's country is required. `foreign` means an address outside of the phone number's country is required. */
  address_requirements?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are: `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
};

export type ApiV2010AccountBalance = {
  /** The unique SID identifier of the Account. */
  account_sid?: string | null;
  /** The balance of the Account, in units specified by the unit parameter. Balance changes may not be reflected immediately. Child accounts do not contain balance information */
  balance?: string | null;
  /** The units of currency for the account balance */
  currency?: string | null;
};

export type ApiV2010AccountCall = {
  /** The unique string that we created to identify this Call resource. */
  sid?: string | null;
  /** The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The SID that identifies the call that created this leg. */
  parent_call_sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Call resource. */
  account_sid?: string | null;
  /** The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`. */
  to?: string | null;
  /** The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750). */
  to_formatted?: string | null;
  /** The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`. SIM SIDs are formatted as `sim:sid`. */
  from?: string | null;
  /** The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +442071838750). */
  from_formatted?: string | null;
  /** If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed. */
  phone_number_sid?: string | null;
  status?: CallEnumStatus;
  /** The start time of the call, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call has not yet been dialed. */
  start_time?: string | null;
  /** The time the call ended, given as UTC in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. Empty if the call did not complete successfully. */
  end_time?: string | null;
  /** The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls. */
  duration?: string | null;
  /** The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity.  Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value. */
  price?: string | null;
  /** The currency in which `Price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g., `USD`, `EUR`, `JPY`). Always capitalized for calls. */
  price_unit?: string | null;
  /** A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API or `outbound-dial` for calls initiated by a `<Dial>` verb. Using [Elastic SIP Trunking](https://www.twilio.com/docs/sip-trunking), the values can be [`trunking-terminating`](https://www.twilio.com/docs/sip-trunking#termination) for outgoing calls from your communications infrastructure to the PSTN or [`trunking-originating`](https://www.twilio.com/docs/sip-trunking#origination) for incoming calls to your communications infrastructure from the PSTN. */
  direction?: string | null;
  /** Either `human` or `machine` if this call was initiated with answering machine detection. Empty otherwise. */
  answered_by?: string | null;
  /** The API version used to create the call. */
  api_version?: string | null;
  /** The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty. */
  forwarded_from?: string | null;
  /** The Group SID associated with this call. If no Group is associated with the call, the field is empty. */
  group_sid?: string | null;
  /** The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty. */
  caller_name?: string | null;
  /** The wait time in milliseconds before the call is placed. */
  queue_time?: string | null;
  /** The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated. */
  trunk_sid?: string | null;
  /** The URI of this resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** A list of subresources available to this call, identified by their URIs relative to `https://api.twilio.com`. */
  subresource_uris?: { [key: string]: unknown } | null;
};

export type CallEnumEvent = "initiated" | "ringing" | "answered" | "completed";

/** The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy` or `no-answer`. See [Call Status Values](https://www.twilio.com/docs/voice/api/call-resource#call-status-values) below for more information. */
export type CallEnumStatus = "queued" | "ringing" | "in-progress" | "completed" | "busy" | "failed" | "no-answer" | "canceled";

export type CallEnumUpdateStatus = "canceled" | "completed";

export type ApiV2010AccountCallCallEvent = {
  /** Contains a dictionary representing the request of the call. */
  request?: unknown;
  /** Contains a dictionary representing the call response, including a list of the call events. */
  response?: unknown;
};

export type ApiV2010AccountCallCallNotification = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource. */
  account_sid?: string | null;
  /** The API version used to create the Call Notification resource. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with. */
  call_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  error_code?: string | null;
  /** An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING. */
  log?: string | null;
  /** The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`. */
  message_date?: string | null;
  /** The text of the notification. */
  message_text?: string | null;
  /** The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  more_info?: string | null;
  /** The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers. */
  request_method?: "GET" | "POST" | null;
  /** The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called. */
  request_url?: string | null;
  /** The unique string that that we created to identify the Call Notification resource. */
  sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountCallCallNotificationInstance = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource. */
  account_sid?: string | null;
  /** The API version used to create the Call Notification resource. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Call Notification resource is associated with. */
  call_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  error_code?: string | null;
  /** An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING. */
  log?: string | null;
  /** The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`. */
  message_date?: string | null;
  /** The text of the notification. */
  message_text?: string | null;
  /** The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  more_info?: string | null;
  /** The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers. */
  request_method?: "GET" | "POST" | null;
  /** The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called. */
  request_url?: string | null;
  /** The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API. */
  request_variables?: string | null;
  /** The HTTP body returned by your server. */
  response_body?: string | null;
  /** The HTTP headers returned by your server. */
  response_headers?: string | null;
  /** The unique string that that we created to identify the Call Notification resource. */
  sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountCallCallRecording = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource. */
  account_sid?: string | null;
  /** The API version used to make the recording. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. */
  call_sid?: string | null;
  /** The Conference SID that identifies the conference associated with the recording, if a conference recording. */
  conference_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  start_time?: string | null;
  /** The length of the recording in seconds. */
  duration?: string | null;
  /** The unique string that that we created to identify the Recording resource. */
  sid?: string | null;
  /** The one-time cost of creating the recording in the `price_unit` currency. */
  price?: number | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature. */
  encryption_details?: unknown;
  /** The currency used in the `price` property. Example: `USD`. */
  price_unit?: string | null;
  status?: CallRecordingEnumStatus;
  /** The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options. */
  channels?: number;
  source?: CallRecordingEnumSource;
  /** The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`. */
  error_code?: number | null;
  /** The recorded track. Can be: `inbound`, `outbound`, or `both`. */
  track?: string | null;
};

/** The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource). */
export type CallRecordingEnumStatus = "in-progress" | "paused" | "stopped" | "processing" | "completed" | "absent";

/** How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`. */
export type CallRecordingEnumSource = "DialVerb" | "Conference" | "OutboundAPI" | "Trunking" | "RecordVerb" | "StartCallRecordingAPI" | "StartConferenceRecordingAPI";

export type ApiV2010AccountConference = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource. */
  account_sid?: string | null;
  /** The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The API version used to create this conference. */
  api_version?: string | null;
  /** A string that you assigned to describe this conference room. Maximum length is 128 characters. */
  friendly_name?: string | null;
  /** A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants. */
  region?: string | null;
  /** The unique, Twilio-provided string used to identify this Conference resource. */
  sid?: string | null;
  status?: ConferenceEnumStatus;
  /** The URI of this resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** A list of related resources identified by their URIs relative to `https://api.twilio.com`. */
  subresource_uris?: { [key: string]: unknown } | null;
  reason_conference_ended?: ConferenceEnumReasonConferenceEnded;
  /** The call SID that caused the conference to end. */
  call_sid_ending_conference?: string | null;
};

/** The status of this conference. Can be: `init`, `in-progress`, or `completed`. */
export type ConferenceEnumStatus = "init" | "in-progress" | "completed";

export type ConferenceEnumUpdateStatus = "completed";

/** The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`. */
export type ConferenceEnumReasonConferenceEnded = "conference-ended-via-api" | "participant-with-end-conference-on-exit-left" | "participant-with-end-conference-on-exit-kicked" | "last-participant-kicked" | "last-participant-left";

export type ApiV2010AccountConferenceConferenceRecording = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource. */
  account_sid?: string | null;
  /** The API version used to create the recording. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Conference Recording resource is associated with. */
  call_sid?: string | null;
  /** The Conference SID that identifies the conference associated with the recording. */
  conference_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  start_time?: string | null;
  /** The length of the recording in seconds. */
  duration?: string | null;
  /** The unique string that that we created to identify the Conference Recording resource. */
  sid?: string | null;
  /** The one-time cost of creating the recording in the `price_unit` currency. */
  price?: string | null;
  /** The currency used in the `price` property. Example: `USD`. */
  price_unit?: string | null;
  status?: ConferenceRecordingEnumStatus;
  /** The number of channels in the final recording file.  Can be: `1`, or `2`. Separating a two leg call into two separate channels of the recording file is supported in [Dial](https://www.twilio.com/docs/voice/twiml/dial#attributes-record) and [Outbound Rest API](https://www.twilio.com/docs/voice/make-calls) record options. */
  channels?: number;
  source?: ConferenceRecordingEnumSource;
  /** The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`. */
  error_code?: number | null;
  /** How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature. */
  encryption_details?: unknown;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource). */
export type ConferenceRecordingEnumStatus = "in-progress" | "paused" | "stopped" | "processing" | "completed" | "absent";

/** How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, `StartConferenceRecordingAPI`. */
export type ConferenceRecordingEnumSource = "DialVerb" | "Conference" | "OutboundAPI" | "Trunking" | "RecordVerb" | "StartCallRecordingAPI" | "StartConferenceRecordingAPI";

export type ApiV2010AccountConnectApp = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource. */
  account_sid?: string | null;
  /** The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App. */
  authorize_redirect_url?: string | null;
  /** The company name set for the Connect App. */
  company_name?: string | null;
  /** The HTTP method we use to call `deauthorize_callback_url`. */
  deauthorize_callback_method?: "GET" | "POST" | null;
  /** The URL we call using the `deauthorize_callback_method` to de-authorize the Connect App. */
  deauthorize_callback_url?: string | null;
  /** The description of the Connect App. */
  description?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The public URL where users can obtain more information about this Connect App. */
  homepage_url?: string | null;
  /** The set of permissions that your ConnectApp requests. */
  permissions?: (ConnectAppEnumPermission)[] | null;
  /** The unique string that that we created to identify the ConnectApp resource. */
  sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The set of permissions that your ConnectApp requests. */
export type ConnectAppEnumPermission = "get-all" | "post-all";

export type ApiV2010AccountAddressDependentPhoneNumber = {
  /** The unique string that that we created to identify the DependentPhoneNumber resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resource. */
  account_sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set. */
  voice_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`. */
  voice_fallback_url?: string | null;
  /** Whether we look up the caller's caller-ID name from the CNAM database. Can be: `true` or `false`. Caller ID lookups can cost $0.01 each. */
  voice_caller_id_lookup?: boolean | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives an incoming SMS message. */
  sms_url?: string | null;
  address_requirements?: DependentPhoneNumberEnumAddressRequirement;
  /** The set of Boolean properties that indicates whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: unknown;
  /** The URL we call using the `status_callback_method` to send status information to your application. */
  status_callback?: string | null;
  /** The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`. */
  status_callback_method?: "GET" | "POST" | null;
  /** The API version used to start a new TwiML session. */
  api_version?: string | null;
  /** The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application. */
  sms_application_sid?: string | null;
  /** The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
  voice_application_sid?: string | null;
  /** The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
  trunk_sid?: string | null;
  emergency_status?: DependentPhoneNumberEnumEmergencyStatus;
  /** The SID of the emergency address configuration that we use for emergency calling from the phone number. */
  emergency_address_sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`. */
export type DependentPhoneNumberEnumAddressRequirement = "none" | "any" | "local" | "foreign";

/** Whether the phone number is enabled for emergency calling. */
export type DependentPhoneNumberEnumEmergencyStatus = "Active" | "Inactive";

export type ApiV2010AccountIncomingPhoneNumber = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this IncomingPhoneNumber resource. */
  account_sid?: string | null;
  /** The SID of the Address resource associated with the phone number. */
  address_sid?: string | null;
  address_requirements?: IncomingPhoneNumberEnumAddressRequirement;
  /** The API version used to start a new TwiML session. */
  api_version?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations. */
  identity_sid?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers. */
  origin?: string | null;
  /** The unique string that that we created to identify this IncomingPhoneNumber resource. */
  sid?: string | null;
  /** The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application. */
  sms_application_sid?: string | null;
  /** The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives an incoming SMS message. */
  sms_url?: string | null;
  /** The URL we call using the `status_callback_method` to send status information to your application. */
  status_callback?: string | null;
  /** The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`. */
  status_callback_method?: "GET" | "POST" | null;
  /** The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
  trunk_sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  voice_receive_mode?: IncomingPhoneNumberEnumVoiceReceiveMode;
  /** The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
  voice_application_sid?: string | null;
  /** Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`. */
  voice_caller_id_lookup?: boolean | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`. */
  voice_fallback_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set. */
  voice_url?: string | null;
  emergency_status?: IncomingPhoneNumberEnumEmergencyStatus;
  /** The SID of the emergency address configuration that we use for emergency calling from this phone number. */
  emergency_address_sid?: string | null;
  emergency_address_status?: IncomingPhoneNumberEnumEmergencyAddressStatus;
  /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
  bundle_sid?: string | null;
  status?: string | null;
  /** The phone number type. */
  type?: string | null;
};

/** Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`. */
export type IncomingPhoneNumberEnumAddressRequirement = "none" | "any" | "local" | "foreign";

/** The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. */
export type IncomingPhoneNumberEnumEmergencyStatus = "Active" | "Inactive";

/** The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number. */
export type IncomingPhoneNumberEnumEmergencyAddressStatus = "registered" | "unregistered" | "pending-registration" | "registration-failure" | "pending-unregistration" | "unregistration-failure";

export type IncomingPhoneNumberEnumVoiceReceiveMode = "voice" | "fax";

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn = {
  /** The unique string that that we created to identify the resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource. */
  account_sid?: string | null;
  /** The SID of the Phone Number to which the Add-on is assigned. */
  resource_sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** A short description of the functionality that the Add-on provides. */
  description?: string | null;
  /** A JSON string that represents the current configuration of this Add-on installation. */
  configuration?: unknown;
  /** An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource. */
  unique_name?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** A list of related resources identified by their relative URIs. */
  subresource_uris?: { [key: string]: unknown } | null;
};

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension = {
  /** The unique string that that we created to identify the resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource. */
  account_sid?: string | null;
  /** The SID of the Phone Number to which the Add-on is assigned. */
  resource_sid?: string | null;
  /** The SID that uniquely identifies the assigned Add-on installation. */
  assigned_add_on_sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** A string that you assigned to describe the Product this Extension is used within. */
  product_name?: string | null;
  /** An application-defined string that uniquely identifies the resource. It can be used in place of the resource's `sid` in the URL to address the resource. */
  unique_name?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** Whether the Extension will be invoked. */
  enabled?: boolean | null;
};

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource. */
  account_sid?: string | null;
  /** The SID of the Address resource associated with the phone number. */
  address_sid?: string | null;
  address_requirements?: IncomingPhoneNumberLocalEnumAddressRequirement;
  /** The API version used to start a new TwiML session. */
  api_version?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations. */
  identity_sid?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers. */
  origin?: string | null;
  /** The unique string that that we created to identify the resource. */
  sid?: string | null;
  /** The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application. */
  sms_application_sid?: string | null;
  /** The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives an incoming SMS message. */
  sms_url?: string | null;
  /** The URL we call using the `status_callback_method` to send status information to your application. */
  status_callback?: string | null;
  /** The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`. */
  status_callback_method?: "GET" | "POST" | null;
  /** The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
  trunk_sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  voice_receive_mode?: IncomingPhoneNumberLocalEnumVoiceReceiveMode;
  /** The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
  voice_application_sid?: string | null;
  /** Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`. */
  voice_caller_id_lookup?: boolean | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`. */
  voice_fallback_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The URL we call when this phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set. */
  voice_url?: string | null;
  emergency_status?: IncomingPhoneNumberLocalEnumEmergencyStatus;
  /** The SID of the emergency address configuration that we use for emergency calling from this phone number. */
  emergency_address_sid?: string | null;
  emergency_address_status?: IncomingPhoneNumberLocalEnumEmergencyAddressStatus;
  /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
  bundle_sid?: string | null;
  status?: string | null;
};

/** Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`. */
export type IncomingPhoneNumberLocalEnumAddressRequirement = "none" | "any" | "local" | "foreign";

/** The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. */
export type IncomingPhoneNumberLocalEnumEmergencyStatus = "Active" | "Inactive";

/** The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number. */
export type IncomingPhoneNumberLocalEnumEmergencyAddressStatus = "registered" | "unregistered" | "pending-registration" | "registration-failure" | "pending-unregistration" | "unregistration-failure";

export type IncomingPhoneNumberLocalEnumVoiceReceiveMode = "voice" | "fax";

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource. */
  account_sid?: string | null;
  /** The SID of the Address resource associated with the phone number. */
  address_sid?: string | null;
  address_requirements?: IncomingPhoneNumberMobileEnumAddressRequirement;
  /** The API version used to start a new TwiML session. */
  api_version?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations. */
  identity_sid?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers. */
  origin?: string | null;
  /** The unique string that that we created to identify the resource. */
  sid?: string | null;
  /** The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application. */
  sms_application_sid?: string | null;
  /** The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives an incoming SMS message. */
  sms_url?: string | null;
  /** The URL we call using the `status_callback_method` to send status information to your application. */
  status_callback?: string | null;
  /** The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`. */
  status_callback_method?: "GET" | "POST" | null;
  /** The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
  trunk_sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  voice_receive_mode?: IncomingPhoneNumberMobileEnumVoiceReceiveMode;
  /** The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
  voice_application_sid?: string | null;
  /** Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`. */
  voice_caller_id_lookup?: boolean | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`. */
  voice_fallback_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set. */
  voice_url?: string | null;
  emergency_status?: IncomingPhoneNumberMobileEnumEmergencyStatus;
  /** The SID of the emergency address configuration that we use for emergency calling from this phone number. */
  emergency_address_sid?: string | null;
  emergency_address_status?: IncomingPhoneNumberMobileEnumEmergencyAddressStatus;
  /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
  bundle_sid?: string | null;
  status?: string | null;
};

/** Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`. */
export type IncomingPhoneNumberMobileEnumAddressRequirement = "none" | "any" | "local" | "foreign";

/** The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. */
export type IncomingPhoneNumberMobileEnumEmergencyStatus = "Active" | "Inactive";

/** The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number. */
export type IncomingPhoneNumberMobileEnumEmergencyAddressStatus = "registered" | "unregistered" | "pending-registration" | "registration-failure" | "pending-unregistration" | "unregistration-failure";

export type IncomingPhoneNumberMobileEnumVoiceReceiveMode = "voice" | "fax";

export type ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource. */
  account_sid?: string | null;
  /** The SID of the Address resource associated with the phone number. */
  address_sid?: string | null;
  address_requirements?: IncomingPhoneNumberTollFreeEnumAddressRequirement;
  /** The API version used to start a new TwiML session. */
  api_version?: string | null;
  /** Whether the phone number is new to the Twilio platform. Can be: `true` or `false`. */
  beta?: boolean | null;
  /** The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`. */
  capabilities?: { mms?: boolean; sms?: boolean; voice?: boolean; fax?: boolean } | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations. */
  identity_sid?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The phone number's origin. `twilio` identifies Twilio-owned phone numbers and `hosted` identifies hosted phone numbers. */
  origin?: string | null;
  /** The unique string that that we created to identify the resource. */
  sid?: string | null;
  /** The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application. */
  sms_application_sid?: string | null;
  /** The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives an incoming SMS message. */
  sms_url?: string | null;
  /** The URL we call using the `status_callback_method` to send status information to your application. */
  status_callback?: string | null;
  /** The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`. */
  status_callback_method?: "GET" | "POST" | null;
  /** The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
  trunk_sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  voice_receive_mode?: IncomingPhoneNumberTollFreeEnumVoiceReceiveMode;
  /** The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
  voice_application_sid?: string | null;
  /** Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`. */
  voice_caller_id_lookup?: boolean | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`. */
  voice_fallback_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The URL we call when the phone number receives a call. The `voice_url` will not be used if a `voice_application_sid` or a `trunk_sid` is set. */
  voice_url?: string | null;
  emergency_status?: IncomingPhoneNumberTollFreeEnumEmergencyStatus;
  /** The SID of the emergency address configuration that we use for emergency calling from this phone number. */
  emergency_address_sid?: string | null;
  emergency_address_status?: IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus;
  /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
  bundle_sid?: string | null;
  status?: string | null;
};

/** Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio. Can be: `none`, `any`, `local`, or `foreign`. */
export type IncomingPhoneNumberTollFreeEnumAddressRequirement = "none" | "any" | "local" | "foreign";

/** The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. */
export type IncomingPhoneNumberTollFreeEnumEmergencyStatus = "Active" | "Inactive";

/** The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number. */
export type IncomingPhoneNumberTollFreeEnumEmergencyAddressStatus = "registered" | "unregistered" | "pending-registration" | "registration-failure" | "pending-unregistration" | "unregistration-failure";

export type IncomingPhoneNumberTollFreeEnumVoiceReceiveMode = "voice" | "fax";

export type ApiV2010AccountKey = {
  /** The unique string that that we created to identify the Key resource. */
  sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
};

export type ApiV2010AccountMessageMedia = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this Media resource. */
  account_sid?: string | null;
  /** The default [MIME type](https://en.wikipedia.org/wiki/Internet_media_type) of the media, for example `image/jpeg`, `image/png`, or `image/gif`. */
  content_type?: string | null;
  /** The date and time in GMT when this Media resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT when this Media resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The SID of the Message resource that is associated with this Media resource. */
  parent_sid?: string | null;
  /** The unique string that identifies this Media resource. */
  sid?: string | null;
  /** The URI of this Media resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountQueueMember = {
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Member resource is associated with. */
  call_sid?: string | null;
  /** The date that the member was enqueued, given in RFC 2822 format. */
  date_enqueued?: string | null;
  /** This member's current position in the queue. */
  position?: number;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The number of seconds the member has been in the queue. */
  wait_time?: number;
  /** The SID of the Queue the member is in. */
  queue_sid?: string | null;
};

export type ApiV2010AccountMessage = {
  /** The text content of the message */
  body?: string | null;
  /** The number of segments that make up the complete message. SMS message bodies that exceed the [character limit](https://www.twilio.com/docs/glossary/what-sms-character-limit) are segmented and charged as multiple messages. Note: For messages sent via a Messaging Service, `num_segments` is initially `0`, since a sender hasn't yet been assigned. */
  num_segments?: string | null;
  direction?: MessageEnumDirection;
  /** The sender's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or  [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). For incoming messages, this is the number or channel address of the sender. For outgoing messages, this value is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent. */
  from?: string | null;
  /** The recipient's phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format) or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g. `whatsapp:+15552229999`) */
  to?: string | null;
  /** The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was last updated */
  date_updated?: string | null;
  /** The amount billed for the message in the currency specified by `price_unit`. The `price` is populated after the message has been sent/received, and may not be immediately availalble. View the [Pricing page](https://www.twilio.com/en-us/pricing) for more details. */
  price?: string | null;
  /** The description of the `error_code` if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically. */
  error_message?: string | null;
  /** The URI of the Message resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource */
  account_sid?: string | null;
  /** The number of media files associated with the Message resource. */
  num_media?: string | null;
  status?: MessageEnumStatus;
  /** The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource) associated with the Message resource. A unique default value is assigned if a Messaging Service is not used. */
  messaging_service_sid?: string | null;
  /** The unique, Twilio-provided string that identifies the Message resource. */
  sid?: string | null;
  /** The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL. */
  date_sent?: string | null;
  /** The [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822#section-3.3) timestamp (in GMT) of when the Message resource was created */
  date_created?: string | null;
  /** The [error code](https://www.twilio.com/docs/api/errors) returned if the Message `status` is `failed` or `undelivered`. If no error was encountered, the value is `null`. The value returned in this field for a specific error cause is subject to change as Twilio improves errors. Users should not use the `error_code` and `error_message` fields programmatically. */
  error_code?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`). */
  price_unit?: string | null;
  /** The API version used to process the Message */
  api_version?: string | null;
  /** A list of related resources identified by their URIs relative to `https://api.twilio.com` */
  subresource_uris?: { [key: string]: unknown } | null;
};

/** The status of the Message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only). For more information, See [detailed descriptions](https://www.twilio.com/docs/sms/api/message-resource#message-status-values). */
export type MessageEnumStatus = "queued" | "sending" | "sent" | "failed" | "delivered" | "undelivered" | "receiving" | "received" | "accepted" | "scheduled" | "read" | "partially_delivered" | "canceled";

export type MessageEnumUpdateStatus = "canceled";

/** The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message. */
export type MessageEnumDirection = "inbound" | "outbound-api" | "outbound-call" | "outbound-reply";

/** Determines if the message content can be stored or redacted based on privacy settings */
export type MessageEnumContentRetention = "retain" | "discard";

/** Determines if the address can be stored or obfuscated based on privacy settings */
export type MessageEnumAddressRetention = "retain" | "obfuscate";

export type MessageEnumTrafficType = "free";

/** For Messaging Services only: Include this parameter with a value of `fixed` in conjuction with the `send_time` parameter in order to [schedule a Message](https://www.twilio.com/docs/messaging/features/message-scheduling). */
export type MessageEnumScheduleType = "fixed";

/** Include this parameter with a value of `disable` to skip any kind of risk check on the respective message request. */
export type MessageEnumRiskCheck = "enable" | "disable";

export type ApiV2010AccountMessageMessageFeedback = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource. */
  account_sid?: string | null;
  /** The SID of the Message resource associated with this MessageFeedback resource. */
  message_sid?: string | null;
  outcome?: MessageFeedbackEnumOutcome;
  /** The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio). */
export type MessageFeedbackEnumOutcome = "confirmed" | "unconfirmed";

export type ApiV2010AccountNewKey = {
  /** The unique string that that we created to identify the NewKey resource. You will use this as the basic-auth `user` when authenticating to the API. */
  sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The date and time in GMT that the API Key was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the new API Key was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.** */
  secret?: string | null;
};

export type ApiV2010AccountNewSigningKey = {
  /** The unique string that that we created to identify the NewSigningKey resource. */
  sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The secret your application uses to sign Access Tokens and to authenticate to the REST API (you will use this as the basic-auth `password`).  **Note that for security reasons, this field is ONLY returned when the API Key is first created.** */
  secret?: string | null;
};

export type ApiV2010AccountNotification = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource. */
  account_sid?: string | null;
  /** The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with. */
  call_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  error_code?: string | null;
  /** An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING. */
  log?: string | null;
  /** The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`. */
  message_date?: string | null;
  /** The text of the notification. */
  message_text?: string | null;
  /** The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  more_info?: string | null;
  /** The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers. */
  request_method?: "GET" | "POST" | null;
  /** The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called. */
  request_url?: string | null;
  /** The unique string that that we created to identify the Notification resource. */
  sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountNotificationInstance = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource. */
  account_sid?: string | null;
  /** The API version used to generate the notification. Can be empty for events that don't have a specific API version, such as incoming phone calls. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Notification resource is associated with. */
  call_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** A unique error code for the error condition that is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  error_code?: string | null;
  /** An integer log level that corresponds to the type of notification: `0` is ERROR, `1` is WARNING. */
  log?: string | null;
  /** The date the notification was actually generated in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. Message buffering can cause this value to differ from `date_created`. */
  message_date?: string | null;
  /** The text of the notification. */
  message_text?: string | null;
  /** The URL for more information about the error condition. This value is a page in our [Error Dictionary](https://www.twilio.com/docs/api/errors). */
  more_info?: string | null;
  /** The HTTP method used to generate the notification. If the notification was generated during a phone call, this is the HTTP Method used to request the resource on your server. If the notification was generated by your use of our REST API, this is the HTTP method used to call the resource on our servers. */
  request_method?: "GET" | "POST" | null;
  /** The URL of the resource that generated the notification. If the notification was generated during a phone call, this is the URL of the resource on your server that caused the notification. If the notification was generated by your use of our REST API, this is the URL of the resource you called. */
  request_url?: string | null;
  /** The HTTP GET or POST variables we sent to your server. However, if the notification was generated by our REST API, this contains the HTTP POST or PUT variables you sent to our API. */
  request_variables?: string | null;
  /** The HTTP body returned by your server. */
  response_body?: string | null;
  /** The HTTP headers returned by your server. */
  response_headers?: string | null;
  /** The unique string that that we created to identify the Notification resource. */
  sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountOutgoingCallerId = {
  /** The unique string that that we created to identify the OutgoingCallerId resource. */
  sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource. */
  account_sid?: string | null;
  /** The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountConferenceParticipant = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Participant resource is associated with. */
  call_sid?: string | null;
  /** The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant. */
  label?: string | null;
  /** The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`. */
  call_sid_to_coach?: string | null;
  /** Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined. */
  coaching?: boolean | null;
  /** The SID of the conference the participant is in. */
  conference_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** Whether the conference ends when the participant leaves. Can be: `true` or `false` and the default is `false`. If `true`, the conference ends and all other participants drop out when the participant leaves. */
  end_conference_on_exit?: boolean | null;
  /** Whether the participant is muted. Can be `true` or `false`. */
  muted?: boolean | null;
  /** Whether the participant is on hold. Can be `true` or `false`. */
  hold?: boolean | null;
  /** Whether the conference starts when the participant joins the conference, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference. */
  start_conference_on_enter?: boolean | null;
  status?: ParticipantEnumStatus;
  /** The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request. */
  queue_time?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The status of the participant's call in a session. Can be: `queued`, `connecting`, `ringing`, `connected`, `complete`, or `failed`. */
export type ParticipantEnumStatus = "queued" | "connecting" | "ringing" | "connected" | "complete" | "failed";

export type ApiV2010AccountCallPayments = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Payments resource. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Payments resource is associated with. This will refer to the call sid that is producing the payment card (credit/ACH) information thru DTMF. */
  call_sid?: string | null;
  /** The SID of the Payments resource. */
  sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** Type of payment being captured. One of `credit-card` or `ach-debit`. The default value is `credit-card`. */
export type PaymentsEnumPaymentMethod = "credit-card" | "ach-debit";

/** Type of bank account if payment source is ACH. One of `consumer-checking`, `consumer-savings`, or `commercial-checking`. The default value is `consumer-checking`. */
export type PaymentsEnumBankAccountType = "consumer-checking" | "consumer-savings" | "commercial-checking";

/** Indicates whether the payment method should be tokenized as a `one-time`, `reusable`, or `payment-method` token. The default value is `reusable`. Do not enter a charge amount when tokenizing. If a charge amount is entered, the payment method will be charged and not tokenized. */
export type PaymentsEnumTokenType = "one-time" | "reusable" | "payment-method";

/** The piece of payment information that you wish the caller to enter. Must be one of `payment-card-number`, `expiration-date`, `security-code`, `postal-code`, `bank-routing-number`, `bank-account-number`, or their `-matcher` variants for input confirmation when `RequireMatchingInputs` is enabled. */
export type PaymentsEnumCapture = "payment-card-number" | "expiration-date" | "security-code" | "postal-code" | "bank-routing-number" | "bank-account-number" | "payment-card-number-matcher" | "expiration-date-matcher" | "security-code-matcher" | "postal-code-matcher";

/** Indicates whether the current payment session should be cancelled or completed. When `cancel` the payment session is cancelled. When `complete`, Twilio sends the payment information to the selected Pay Connector for processing. */
export type PaymentsEnumStatus = "complete" | "cancel";

export type ApiV2010AccountQueue = {
  /** The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The number of calls currently in the queue. */
  current_size?: number;
  /** A string that you assigned to describe this resource. */
  friendly_name?: string | null;
  /** The URI of this resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Queue resource. */
  account_sid?: string | null;
  /**  The average wait time in seconds of the members in this queue. This is calculated at the time of the request. */
  average_wait_time?: number;
  /** The unique string that that we created to identify this Queue resource. */
  sid?: string | null;
  /** The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /**  The maximum number of calls that can be in the queue. The default is 1000 and the maximum is 5000. */
  max_size?: number;
};

export type ApiV2010AccountCallRealtimeTranscription = {
  /** The SID of the Transcription resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with. */
  call_sid?: string | null;
  /** The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription. */
  name?: string | null;
  status?: RealtimeTranscriptionEnumStatus;
  /** The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  uri?: string | null;
};

/** One of `inbound_track`, `outbound_track`, `both_tracks`. */
export type RealtimeTranscriptionEnumTrack = "inbound_track" | "outbound_track" | "both_tracks";

/** The status - one of `stopped`, `in-flight` */
export type RealtimeTranscriptionEnumStatus = "in-progress" | "stopped";

export type RealtimeTranscriptionEnumUpdateStatus = "stopped";

export type ApiV2010AccountRecording = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource. */
  account_sid?: string | null;
  /** The API version used during the recording. */
  api_version?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call. */
  call_sid?: string | null;
  /** The Conference SID that identifies the conference associated with the recording, if a conference recording. */
  conference_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  start_time?: string | null;
  /** The length of the recording in seconds. */
  duration?: string | null;
  /** The unique string that that we created to identify the Recording resource. */
  sid?: string | null;
  /** The one-time cost of creating the recording in the `price_unit` currency. */
  price?: string | null;
  /** The currency used in the `price` property. Example: `USD`. */
  price_unit?: string | null;
  status?: RecordingEnumStatus;
  /** The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file). */
  channels?: number | null;
  source?: RecordingEnumSource;
  /** The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`. */
  error_code?: number | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature. */
  encryption_details?: unknown;
  /** A list of related resources identified by their relative URIs. */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file. */
  media_url?: string | null;
};

/** The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource). */
export type RecordingEnumStatus = "in-progress" | "paused" | "stopped" | "processing" | "completed" | "absent" | "deleted";

/** How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`. */
export type RecordingEnumSource = "DialVerb" | "Conference" | "OutboundAPI" | "Trunking" | "RecordVerb" | "StartCallRecordingAPI" | "StartConferenceRecordingAPI";

export type ApiV2010AccountRecordingRecordingAddOnResult = {
  /** The unique string that that we created to identify the Recording AddOnResult resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource. */
  account_sid?: string | null;
  status?: RecordingAddOnResultEnumStatus;
  /** The SID of the Add-on to which the result belongs. */
  add_on_sid?: string | null;
  /** The SID of the Add-on configuration. */
  add_on_configuration_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The date and time in GMT that the result was completed specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_completed?: string | null;
  /** The SID of the recording to which the AddOnResult resource belongs. */
  reference_sid?: string | null;
  /** A list of related resources identified by their relative URIs. */
  subresource_uris?: { [key: string]: unknown } | null;
};

/** The status of the result. Can be: `canceled`, `completed`, `deleted`, `failed`, `in-progress`, `init`, `processing`, `queued`. */
export type RecordingAddOnResultEnumStatus = "canceled" | "completed" | "deleted" | "failed" | "in-progress" | "init" | "processing" | "queued";

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload = {
  /** The unique string that that we created to identify the Recording AddOnResult Payload resource. */
  sid?: string | null;
  /** The SID of the AddOnResult to which the payload belongs. */
  add_on_result_sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource. */
  account_sid?: string | null;
  /** The string provided by the vendor that describes the payload. */
  label?: string | null;
  /** The SID of the Add-on to which the result belongs. */
  add_on_sid?: string | null;
  /** The SID of the Add-on configuration. */
  add_on_configuration_sid?: string | null;
  /** The MIME type of the payload. */
  content_type?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The SID of the recording to which the AddOnResult resource that contains the payload belongs. */
  reference_sid?: string | null;
  /** A list of related resources identified by their relative URIs. */
  subresource_uris?: { [key: string]: unknown } | null;
};

export type ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData = {
  /** The URL to redirect to to get the data returned by the AddOn that was previously stored. */
  redirect_to?: string | null;
};

export type ApiV2010AccountRecordingRecordingTranscription = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource. */
  account_sid?: string | null;
  /** The API version used to create the transcription. */
  api_version?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The duration of the transcribed audio in seconds. */
  duration?: string | null;
  /** The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`). */
  price_unit?: string | null;
  /** The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created. */
  recording_sid?: string | null;
  /** The unique string that that we created to identify the Transcription resource. */
  sid?: string | null;
  status?: RecordingTranscriptionEnumStatus;
  /** The text content of the transcription. */
  transcription_text?: string | null;
  /** The transcription type. */
  type?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The status of the transcription. Can be: `in-progress`, `completed`, `failed`. */
export type RecordingTranscriptionEnumStatus = "in-progress" | "completed" | "failed";

export type ApiV2010AccountShortCode = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this ShortCode resource. */
  account_sid?: string | null;
  /** The API version used to start a new TwiML session when an SMS message is sent to this short code. */
  api_version?: string | null;
  /** The date and time in GMT that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** A string that you assigned to describe this resource. By default, the `FriendlyName` is the short code. */
  friendly_name?: string | null;
  /** The short code. e.g., 894546. */
  short_code?: string | null;
  /** The unique string that that we created to identify this ShortCode resource. */
  sid?: string | null;
  /** The HTTP method we use to call the `sms_fallback_url`. Can be: `GET` or `POST`. */
  sms_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call if an error occurs while retrieving or executing the TwiML from `sms_url`. */
  sms_fallback_url?: string | null;
  /** The HTTP method we use to call the `sms_url`. Can be: `GET` or `POST`. */
  sms_method?: "GET" | "POST" | null;
  /** The URL we call when receiving an incoming SMS message to this short code. */
  sms_url?: string | null;
  /** The URI of this resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountSigningKey = {
  sid?: string | null;
  friendly_name?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
};

export type ApiV2010AccountSip = { [key: string]: unknown };

export type ApiV2010AccountSipSipDomainSipAuth = { [key: string]: unknown };

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCalls = { [key: string]: unknown };

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource. */
  account_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The unique string that that we created to identify the CredentialListMapping resource. */
  sid?: string | null;
};

export type ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource. */
  account_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The unique string that that we created to identify the IpAccessControlListMapping resource. */
  sid?: string | null;
};

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrations = { [key: string]: unknown };

export type ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource. */
  account_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The unique string that that we created to identify the CredentialListMapping resource. */
  sid?: string | null;
};

export type ApiV2010AccountSipSipCredentialListSipCredential = {
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  /** The unique id of the Account that is responsible for this resource. */
  account_sid?: string | null;
  /** The unique id that identifies the credential list that includes this credential. */
  credential_list_sid?: string | null;
  /** The username for this credential. */
  username?: string | null;
  /** The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_created?: string | null;
  /** The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_updated?: string | null;
  /** The URI for this resource, relative to `https://api.twilio.com` */
  uri?: string | null;
};

export type ApiV2010AccountSipSipCredentialList = {
  /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource. */
  account_sid?: string | null;
  /** The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_created?: string | null;
  /** The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_updated?: string | null;
  /** A human readable descriptive text that describes the CredentialList, up to 64 characters long. */
  friendly_name?: string | null;
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  /** A list of credentials associated with this credential list. */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI for this resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountSipSipDomainSipCredentialListMapping = {
  /** The unique id of the Account that is responsible for this resource. */
  account_sid?: string | null;
  /** The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_created?: string | null;
  /** The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_updated?: string | null;
  /** The unique string that is created to identify the SipDomain resource. */
  domain_sid?: string | null;
  /** A human readable descriptive text for this resource, up to 64 characters long. */
  friendly_name?: string | null;
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  /** The URI for this resource, relative to `https://api.twilio.com` */
  uri?: string | null;
};

export type ApiV2010AccountSipSipDomain = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource. */
  account_sid?: string | null;
  /** The API version used to process the call. */
  api_version?: string | null;
  /** The types of authentication you have mapped to your domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If you have both defined for your domain, both will be returned in a comma delimited string. If `auth_type` is not defined, the domain will not be able to receive any traffic. */
  auth_type?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`. */
  domain_name?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The unique string that that we created to identify the SipDomain resource. */
  sid?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
  voice_fallback_method?: "GET" | "POST" | null;
  /** The URL that we call when an error occurs while retrieving or executing the TwiML requested from `voice_url`. */
  voice_fallback_url?: string | null;
  /** The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`. */
  voice_method?: "GET" | "POST" | null;
  /** The HTTP method we use to call `voice_status_callback_url`. Either `GET` or `POST`. */
  voice_status_callback_method?: "GET" | "POST" | null;
  /** The URL that we call to pass status parameters (such as call ended) to your application. */
  voice_status_callback_url?: string | null;
  /** The URL we call using the `voice_method` when the domain receives a call. */
  voice_url?: string | null;
  /** A list of mapping resources associated with the SIP Domain resource identified by their relative URIs. */
  subresource_uris?: { [key: string]: unknown } | null;
  /** Whether to allow SIP Endpoints to register with the domain to receive calls. */
  sip_registration?: boolean | null;
  /** Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses. */
  emergency_calling_enabled?: boolean | null;
  /** Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain. */
  secure?: boolean | null;
  /** The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with. */
  byoc_trunk_sid?: string | null;
  /** Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call. */
  emergency_caller_sid?: string | null;
};

export type ApiV2010AccountSipSipIpAccessControlList = {
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) that owns this resource. */
  account_sid?: string | null;
  /** A human readable descriptive text, up to 255 characters long. */
  friendly_name?: string | null;
  /** The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_created?: string | null;
  /** The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_updated?: string | null;
  /** A list of the IpAddress resources associated with this IP access control list resource. */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI for this resource, relative to `https://api.twilio.com` */
  uri?: string | null;
};

export type ApiV2010AccountSipSipDomainSipIpAccessControlListMapping = {
  /** The unique id of the Account that is responsible for this resource. */
  account_sid?: string | null;
  /** The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_created?: string | null;
  /** The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_updated?: string | null;
  /** The unique string that is created to identify the SipDomain resource. */
  domain_sid?: string | null;
  /** A human readable descriptive text for this resource, up to 64 characters long. */
  friendly_name?: string | null;
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  /** The URI for this resource, relative to `https://api.twilio.com` */
  uri?: string | null;
};

export type ApiV2010AccountSipSipIpAccessControlListSipIpAddress = {
  /** A 34 character string that uniquely identifies this resource. */
  sid?: string | null;
  /** The unique id of the Account that is responsible for this resource. */
  account_sid?: string | null;
  /** A human readable descriptive text for this resource, up to 255 characters long. */
  friendly_name?: string | null;
  /** An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today. */
  ip_address?: string | null;
  /** An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used. */
  cidr_prefix_length?: number;
  /** The unique id of the IpAccessControlList resource that includes this resource. */
  ip_access_control_list_sid?: string | null;
  /** The date that this resource was created, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_created?: string | null;
  /** The date that this resource was last updated, given as GMT in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format. */
  date_updated?: string | null;
  /** The URI for this resource, relative to `https://api.twilio.com` */
  uri?: string | null;
};

export type ApiV2010AccountCallSiprec = {
  /** The SID of the Siprec resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with. */
  call_sid?: string | null;
  /** The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec. */
  name?: string | null;
  status?: SiprecEnumStatus;
  /** The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** One of `inbound_track`, `outbound_track`, `both_tracks`. */
export type SiprecEnumTrack = "inbound_track" | "outbound_track" | "both_tracks";

/** The status - one of `stopped`, `in-progress` */
export type SiprecEnumStatus = "in-progress" | "stopped";

export type SiprecEnumUpdateStatus = "stopped";

export type SmsFeedbackEnumOutcome = "confirmed" | "unconfirmed" | "received" | "not-received" | "delayed";

export type SmsMessageEnumStatus = "queued" | "sending" | "sent" | "failed" | "delivered" | "undelivered" | "receiving" | "received" | "accepted" | "scheduled" | "read" | "partially_delivered" | "canceled";

export type SmsMessageEnumUpdateStatus = "canceled";

export type SmsMessageEnumDirection = "inbound" | "outbound-api" | "outbound-call" | "outbound-reply";

export type ApiV2010AccountCallStream = {
  /** The SID of the Stream resource. */
  sid?: string | null;
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with. */
  call_sid?: string | null;
  /** The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream. */
  name?: string | null;
  status?: StreamEnumStatus;
  /** The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`. */
export type StreamEnumTrack = "inbound_track" | "outbound_track" | "both_tracks";

/** The status of the Stream. Possible values are `stopped` and `in-progress`. */
export type StreamEnumStatus = "in-progress" | "stopped";

export type StreamEnumUpdateStatus = "stopped";

export type ApiV2010AccountToken = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Token resource. */
  account_sid?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** An array representing the ephemeral credentials and the STUN and TURN server URIs. */
  ice_servers?: ({ credential?: string; username?: string; url?: string; urls?: string })[] | null;
  /** The temporary password that the username will use when authenticating with Twilio. */
  password?: string | null;
  /** The duration in seconds for which the username and password are valid. */
  ttl?: string | null;
  /** The temporary username that uniquely identifies a Token. */
  username?: string | null;
};

export type ApiV2010AccountTranscription = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource. */
  account_sid?: string | null;
  /** The API version used to create the transcription. */
  api_version?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The duration of the transcribed audio in seconds. */
  duration?: string | null;
  /** The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`). */
  price_unit?: string | null;
  /** The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created. */
  recording_sid?: string | null;
  /** The unique string that that we created to identify the Transcription resource. */
  sid?: string | null;
  status?: TranscriptionEnumStatus;
  /** The text content of the transcription. */
  transcription_text?: string | null;
  /** The transcription type. Can only be: `fast`. */
  type?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

/** The status of the transcription. Can be: `in-progress`, `completed`, `failed`. */
export type TranscriptionEnumStatus = "in-progress" | "completed" | "failed";

export type ApiV2010AccountUsage = { [key: string]: unknown };

export type ApiV2010AccountUsageUsageRecord = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordAllTime = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordDaily = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordLastMonth = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordMonthly = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordThisMonth = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordToday = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordYearly = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageRecordUsageRecordYesterday = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that accrued the usage. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** Usage records up to date as of this timestamp, formatted as YYYY-MM-DDTHH:MM:SS+00:00. All timestamps are in GMT */
  as_of?: string | null;
  /** The category of usage. For more information, see [Usage Categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  category?: string | null;
  /** The number of usage events, such as the number of calls. */
  count?: string | null;
  /** The units in which `count` is measured, such as `calls` for calls or `messages` for SMS. */
  count_unit?: string | null;
  /** A plain-language description of the usage category. */
  description?: string | null;
  /** The last date for which usage is included in the UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  end_date?: string | null;
  /** The total price of the usage in the currency specified in `price_unit` and associated with the account. */
  price?: number | null;
  /** The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format, such as `usd`, `eur`, and `jpy`. */
  price_unit?: string | null;
  /** The first date for which usage is included in this UsageRecord. The date is specified in GMT and formatted as `YYYY-MM-DD`. */
  start_date?: string | null;
  /** A list of related resources identified by their URIs. For more information, see [List Subresources](https://www.twilio.com/docs/usage/api/usage-record#list-subresources). */
  subresource_uris?: { [key: string]: unknown } | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The amount used to bill usage and measured in units described in `usage_unit`. */
  usage?: string | null;
  /** The units in which `usage` is measured, such as `minutes` for calls or `messages` for SMS. */
  usage_unit?: string | null;
};

export type ApiV2010AccountUsageUsageTrigger = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the trigger monitors. */
  account_sid?: string | null;
  /** The API version used to create the resource. */
  api_version?: string | null;
  /** The HTTP method we use to call `callback_url`. Can be: `GET` or `POST`. */
  callback_method?: "GET" | "POST" | null;
  /** The URL we call using the `callback_method` when the trigger fires. */
  callback_url?: string | null;
  /** The current value of the field the trigger is watching. */
  current_value?: string | null;
  /** The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_created?: string | null;
  /** The date and time in GMT that the trigger was last fired specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_fired?: string | null;
  /** The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. */
  date_updated?: string | null;
  /** The string that you assigned to describe the trigger. */
  friendly_name?: string | null;
  recurring?: UsageTriggerEnumRecurring;
  /** The unique string that that we created to identify the UsageTrigger resource. */
  sid?: string | null;
  trigger_by?: UsageTriggerEnumTriggerField;
  /** The value at which the trigger will fire.  Must be a positive, numeric value. */
  trigger_value?: string | null;
  /** The URI of the resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
  /** The usage category the trigger watches. Must be one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
  usage_category?: string | null;
  /** The URI of the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource this trigger watches, relative to `https://api.twilio.com`. */
  usage_record_uri?: string | null;
};

/** The frequency of a recurring UsageTrigger.  Can be: `daily`, `monthly`, or `yearly` for recurring triggers or empty for non-recurring triggers. A trigger will only fire once during each period. Recurring times are in GMT. */
export type UsageTriggerEnumRecurring = "daily" | "monthly" | "yearly" | "alltime";

/** The field in the [UsageRecord](https://www.twilio.com/docs/usage/api/usage-record) resource that fires the trigger.  Can be: `count`, `usage`, or `price`, as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price). */
export type UsageTriggerEnumTriggerField = "count" | "usage" | "price";

export type ApiV2010AccountCallUserDefinedMessage = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with. */
  call_sid?: string | null;
  /** The SID that uniquely identifies this User Defined Message. */
  sid?: string | null;
  /** The date that this User Defined Message was created, given in RFC 2822 format. */
  date_created?: string | null;
};

export type ApiV2010AccountCallUserDefinedMessageSubscription = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages. */
  call_sid?: string | null;
  /** The SID that uniquely identifies this User Defined Message Subscription. */
  sid?: string | null;
  /** The date that this User Defined Message Subscription was created, given in RFC 2822 format. */
  date_created?: string | null;
  /** The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`. */
  uri?: string | null;
};

export type ApiV2010AccountValidationRequest = {
  /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the Caller ID. */
  account_sid?: string | null;
  /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Caller ID is associated with. */
  call_sid?: string | null;
  /** The string that you assigned to describe the resource. */
  friendly_name?: string | null;
  /** The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
  phone_number?: string | null;
  /** The 6 digit validation code that someone must enter to validate the Caller ID  when `phone_number` is called. */
  validation_code?: string | null;
};
