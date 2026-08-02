import type { AccountEnumStatus, ApiV2010Account, ApiV2010AccountAddress, ApiV2010AccountAddressDependentPhoneNumber, ApiV2010AccountApplication, ApiV2010AccountAuthorizedConnectApp, ApiV2010AccountAvailablePhoneNumberCountry, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree, ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip, ApiV2010AccountBalance, ApiV2010AccountCall, ApiV2010AccountCallCallEvent, ApiV2010AccountCallCallNotification, ApiV2010AccountCallCallNotificationInstance, ApiV2010AccountCallCallRecording, ApiV2010AccountCallPayments, ApiV2010AccountCallRealtimeTranscription, ApiV2010AccountCallSiprec, ApiV2010AccountCallStream, ApiV2010AccountCallUserDefinedMessage, ApiV2010AccountCallUserDefinedMessageSubscription, ApiV2010AccountConference, ApiV2010AccountConferenceConferenceRecording, ApiV2010AccountConferenceParticipant, ApiV2010AccountConnectApp, ApiV2010AccountIncomingPhoneNumber, ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn, ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension, ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal, ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile, ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree, ApiV2010AccountKey, ApiV2010AccountMessage, ApiV2010AccountMessageMedia, ApiV2010AccountMessageMessageFeedback, ApiV2010AccountNewKey, ApiV2010AccountNewSigningKey, ApiV2010AccountNotification, ApiV2010AccountNotificationInstance, ApiV2010AccountOutgoingCallerId, ApiV2010AccountQueue, ApiV2010AccountQueueMember, ApiV2010AccountRecording, ApiV2010AccountRecordingRecordingAddOnResult, ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload, ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData, ApiV2010AccountRecordingRecordingTranscription, ApiV2010AccountShortCode, ApiV2010AccountSigningKey, ApiV2010AccountSipSipCredentialList, ApiV2010AccountSipSipCredentialListSipCredential, ApiV2010AccountSipSipDomain, ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping, ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping, ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping, ApiV2010AccountSipSipDomainSipCredentialListMapping, ApiV2010AccountSipSipDomainSipIpAccessControlListMapping, ApiV2010AccountSipSipIpAccessControlList, ApiV2010AccountSipSipIpAccessControlListSipIpAddress, ApiV2010AccountToken, ApiV2010AccountTranscription, ApiV2010AccountUsageUsageRecord, ApiV2010AccountUsageUsageRecordUsageRecordAllTime, ApiV2010AccountUsageUsageRecordUsageRecordDaily, ApiV2010AccountUsageUsageRecordUsageRecordLastMonth, ApiV2010AccountUsageUsageRecordUsageRecordMonthly, ApiV2010AccountUsageUsageRecordUsageRecordThisMonth, ApiV2010AccountUsageUsageRecordUsageRecordToday, ApiV2010AccountUsageUsageRecordUsageRecordYearly, ApiV2010AccountUsageUsageRecordUsageRecordYesterday, ApiV2010AccountUsageUsageTrigger, ApiV2010AccountValidationRequest, CallEnumStatus, CallEnumUpdateStatus, CallRecordingEnumStatus, ConferenceEnumStatus, ConferenceEnumUpdateStatus, ConferenceRecordingEnumStatus, ConnectAppEnumPermission, IncomingPhoneNumberEnumEmergencyStatus, IncomingPhoneNumberEnumVoiceReceiveMode, IncomingPhoneNumberLocalEnumEmergencyStatus, IncomingPhoneNumberLocalEnumVoiceReceiveMode, IncomingPhoneNumberMobileEnumEmergencyStatus, IncomingPhoneNumberMobileEnumVoiceReceiveMode, IncomingPhoneNumberTollFreeEnumEmergencyStatus, IncomingPhoneNumberTollFreeEnumVoiceReceiveMode, MessageEnumAddressRetention, MessageEnumContentRetention, MessageEnumRiskCheck, MessageEnumScheduleType, MessageEnumTrafficType, MessageEnumUpdateStatus, MessageFeedbackEnumOutcome, PaymentsEnumBankAccountType, PaymentsEnumCapture, PaymentsEnumPaymentMethod, PaymentsEnumStatus, PaymentsEnumTokenType, RealtimeTranscriptionEnumTrack, RealtimeTranscriptionEnumUpdateStatus, SiprecEnumTrack, SiprecEnumUpdateStatus, StreamEnumTrack, StreamEnumUpdateStatus, UsageTriggerEnumRecurring, UsageTriggerEnumTriggerField } from "./schemas.js";

export type TwilioClient = {
  /**
   * Create a new Twilio Subaccount from the account making the request
   */
  createAccount: (input: {
    /** A human readable description of the account to create, defaults to `SubAccount Created at {YYYY-MM-DD HH:MM meridian}` */
    FriendlyName?: string;
  }) => Promise<ApiV2010Account>;

  /**
   * Retrieves a collection of Accounts belonging to the account used to make the request
   */
  listAccount: (input: {
    /** Only return the Account resources with friendly names that exactly match this name. */
    FriendlyName?: string;
    Status?: AccountEnumStatus;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; accounts?: (ApiV2010Account)[] }>;

  /**
   * Fetch the account specified by the provided Account Sid
   */
  fetchAccount: (input: {
    /** The Account Sid that uniquely identifies the account to fetch */
    Sid: string;
  }) => Promise<ApiV2010Account>;

  /**
   * Modify the properties of a given Account
   */
  updateAccount: (input: {
    /** Update the human-readable description of this Account */
    FriendlyName?: string;
    Status?: AccountEnumStatus;
    /** The Account Sid that uniquely identifies the account to update */
    Sid: string;
  }) => Promise<ApiV2010Account>;

  createAddress: (input: {
    /** The name to associate with the new address. */
    CustomerName: string;
    /** The number and street address of the new address. */
    Street: string;
    /** The city of the new address. */
    City: string;
    /** The state or region of the new address. */
    Region: string;
    /** The postal code of the new address. */
    PostalCode: string;
    /** The ISO country code of the new address. */
    IsoCountry: string;
    /** A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses. */
    FriendlyName?: string;
    /** Whether to enable emergency calling on the new address. Can be: `true` or `false`. */
    EmergencyEnabled?: boolean;
    /** Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide. */
    AutoCorrectAddress?: boolean;
    /** The additional number and street address of the address. */
    StreetSecondary?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Address resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountAddress>;

  listAddress: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to read. */
    AccountSid: string;
    /** The `customer_name` of the Address resources to read. */
    CustomerName?: string;
    /** The string that identifies the Address resources to read. */
    FriendlyName?: string;
    /** Whether the address can be associated to a number for emergency calling. */
    EmergencyEnabled?: boolean;
    /** The ISO country code of the Address resources to read. */
    IsoCountry?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; addresses?: (ApiV2010AccountAddress)[] }>;

  deleteAddress: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Address resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  fetchAddress: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Address resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountAddress>;

  updateAddress: (input: {
    /** A descriptive string that you create to describe the new address. It can be up to 64 characters long for Regulatory Compliance addresses and 32 characters long for Emergency addresses. */
    FriendlyName?: string;
    /** The name to associate with the address. */
    CustomerName?: string;
    /** The number and street address of the address. */
    Street?: string;
    /** The city of the address. */
    City?: string;
    /** The state or region of the address. */
    Region?: string;
    /** The postal code of the address. */
    PostalCode?: string;
    /** Whether to enable emergency calling on the address. Can be: `true` or `false`. */
    EmergencyEnabled?: boolean;
    /** Whether we should automatically correct the address. Can be: `true` or `false` and the default is `true`. If empty or `true`, we will correct the address you provide if necessary. If `false`, we won't alter the address you provide. */
    AutoCorrectAddress?: boolean;
    /** The additional number and street address of the address. */
    StreetSecondary?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Address resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountAddress>;

  /**
   * Create a new application within your account
   */
  createApplication: (input: {
    /** The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version. */
    ApiVersion?: string;
    /** The URL we should call when the phone number assigned to this application receives a call. */
    VoiceUrl?: string;
    /** The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The URL we should call when the phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The URL we should call using a POST method to send status information about SMS messages sent by the application. */
    SmsStatusCallback?: string;
    /** The URL we should call using a POST method to send message status information to your application. */
    MessageStatusCallback?: string;
    /** A descriptive string that you create to describe the new application. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`. */
    PublicApplicationConnectEnabled?: boolean;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountApplication>;

  /**
   * Retrieve a list of applications representing an application within the requesting account
   */
  listApplication: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to read. */
    AccountSid: string;
    /** The string that identifies the Application resources to read. */
    FriendlyName?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; applications?: (ApiV2010AccountApplication)[] }>;

  /**
   * Delete the application by the specified application sid
   */
  deleteApplication: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Application resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch the application specified by the provided sid
   */
  fetchApplication: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Application resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountApplication>;

  /**
   * Updates the application's properties
   */
  updateApplication: (input: {
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version. */
    ApiVersion?: string;
    /** The URL we should call when the phone number assigned to this application receives a call. */
    VoiceUrl?: string;
    /** The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The URL we should call when the phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility. */
    SmsStatusCallback?: string;
    /** The URL we should call using a POST method to send message status information to your application. */
    MessageStatusCallback?: string;
    /** Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`. */
    PublicApplicationConnectEnabled?: boolean;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Application resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountApplication>;

  /**
   * Fetch an instance of an authorized-connect-app
   */
  fetchAuthorizedConnectApp: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource to fetch. */
    AccountSid: string;
    /** The SID of the Connect App to fetch. */
    ConnectAppSid: string;
  }) => Promise<ApiV2010AccountAuthorizedConnectApp>;

  /**
   * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
   */
  listAuthorizedConnectApp: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resources to read. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; authorized_connect_apps?: (ApiV2010AccountAuthorizedConnectApp)[] }>;

  listAvailablePhoneNumberCountry: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the available phone number Country resources. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ countries?: (ApiV2010AccountAvailablePhoneNumberCountry)[]; uri?: string | null }>;

  fetchAvailablePhoneNumberCountry: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the available phone number Country resource. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country to fetch available phone number information about. */
    CountryCode: string;
  }) => Promise<ApiV2010AccountAvailablePhoneNumberCountry>;

  listAvailablePhoneNumberLocal: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberLocal)[] }>;

  listAvailablePhoneNumberMachineToMachine: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMachineToMachine)[] }>;

  listAvailablePhoneNumberMobile: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberMobile)[] }>;

  listAvailablePhoneNumberNational: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberNational)[] }>;

  listAvailablePhoneNumberSharedCost: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberSharedCost)[] }>;

  listAvailablePhoneNumberTollFree: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberTollFree)[] }>;

  listAvailablePhoneNumberVoip: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources. */
    AccountSid: string;
    /** The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers. */
    CountryCode: string;
    /** The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada. */
    AreaCode?: number;
    /** Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other. */
    Contains?: string;
    /** Whether the phone numbers can receive text messages. Can be: `true` or `false`. */
    SmsEnabled?: boolean;
    /** Whether the phone numbers can receive MMS messages. Can be: `true` or `false`. */
    MmsEnabled?: boolean;
    /** Whether the phone numbers can receive calls. Can be: `true` or `false`. */
    VoiceEnabled?: boolean;
    /** Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeAllAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeLocalAddressRequired?: boolean;
    /** Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`. */
    ExcludeForeignAddressRequired?: boolean;
    /** Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada. */
    NearNumber?: string;
    /** Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada. */
    NearLatLong?: string;
    /** The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada. */
    Distance?: number;
    /** Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada. */
    InPostalCode?: string;
    /** Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada. */
    InRegion?: string;
    /** Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada. */
    InRateCenter?: string;
    /** Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada. */
    InLata?: string;
    /** Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number. */
    InLocality?: string;
    /** Whether the phone numbers can receive faxes. Can be: `true` or `false`. */
    FaxEnabled?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; available_phone_numbers?: (ApiV2010AccountAvailablePhoneNumberCountryAvailablePhoneNumberVoip)[] }>;

  /**
   * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
   */
  fetchBalance: (input: {
    /** The unique SID identifier of the Account. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountBalance>;

  /**
   * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
   */
  createCall: (input: {
    /** The phone number, SIP address, or client identifier to call. */
    To: string;
    /** The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `From` must also be a phone number. */
    From: string;
    /** The HTTP method we should use when calling the `url` parameter's value. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored. */
    Method?: "GET" | "POST";
    /** The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored. */
    FallbackUrl?: string;
    /** The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored. */
    FallbackMethod?: "GET" | "POST";
    /** The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted). */
    StatusCallback?: string;
    /** The call progress events that we will send to the `status_callback` URL. Can be: `initiated`, `ringing`, `answered`, and `completed`. If no event is specified, we send the `completed` status. If you want to receive multiple events, specify each one in a separate `status_callback_event` parameter. See the code sample for [monitoring call progress](https://www.twilio.com/docs/voice/api/call-resource?code-sample=code-create-a-call-resource-and-specify-a-statuscallbackevent&code-sdk-version=json). If an `application_sid` is present, this parameter is ignored. */
    StatusCallbackEvent?: (string)[];
    /** The HTTP method we should use when calling the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (`0`-`9`), '`A`', '`B`', '`C`', '`D`', '`#`', and '`*`'. You can also use '`w`' to insert a half-second pause and '`W`' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to `W1234#`. Be sure to URL-encode this string because the '`#`' character has special meaning in a URL. If both `SendDigits` and `MachineDetection` parameters are provided, then `MachineDetection` will be ignored. */
    SendDigits?: string;
    /** The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is `60` seconds and the maximum is `600` seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as `15` seconds, to hang up before reaching an answering machine or voicemail. */
    Timeout?: number;
    /** Whether to record the call. Can be `true` to record the phone call, or `false` to not. The default is `false`. The `recording_url` is sent to the `status_callback` URL. */
    Record?: boolean;
    /** The number of channels in the final recording. Can be: `mono` or `dual`. The default is `mono`. `mono` records both legs of the call in a single channel of the recording file. `dual` records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call. */
    RecordingChannels?: string;
    /** The URL that we call when the recording is available to be accessed. */
    RecordingStatusCallback?: string;
    /** The HTTP method we should use when calling the `recording_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. */
    RecordingStatusCallbackMethod?: "GET" | "POST";
    /** The identifier of the configuration to be used when creating and processing the recording */
    RecordingConfigurationId?: string;
    /** The username used to authenticate the caller making a SIP call. */
    SipAuthUsername?: string;
    /** The password required to authenticate the user account specified in `sip_auth_username`. */
    SipAuthPassword?: string;
    /** Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. If `send_digits` is provided, this parameter is ignored. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection). */
    MachineDetection?: string;
    /** The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds. */
    MachineDetectionTimeout?: number;
    /** The recording status events that will trigger calls to the URL specified in `recording_status_callback`. Can be: `in-progress`, `completed` and `absent`. Defaults to `completed`. Separate  multiple values with a space. */
    RecordingStatusCallbackEvent?: (string)[];
    /** Whether to trim any leading and trailing silence from the recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`. */
    Trim?: string;
    /** The phone number, SIP address, or Client identifier that made this call. Phone numbers are in [E.164 format](https://wwnw.twilio.com/docs/glossary/what-e164) (e.g., +16175551212). SIP addresses are formatted as `name@company.com`. */
    CallerId?: string;
    /** The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400. */
    MachineDetectionSpeechThreshold?: number;
    /** The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200. */
    MachineDetectionSpeechEndThreshold?: number;
    /** The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000. */
    MachineDetectionSilenceTimeout?: number;
    /** Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: `true` or `false`. */
    AsyncAmd?: string;
    /** The URL that we should call using the `async_amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax. */
    AsyncAmdStatusCallback?: string;
    /** The HTTP method we should use when calling the `async_amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. */
    AsyncAmdStatusCallbackMethod?: "GET" | "POST";
    /** The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta) */
    Byoc?: string;
    /** The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta) */
    CallReason?: string;
    /** A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call. */
    CallToken?: string;
    /** The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio. */
    RecordingTrack?: string;
    /** The maximum duration of the call in seconds. Constraints depend on account and configuration. */
    TimeLimit?: number;
    /** The URL that we should use to deliver `push call notification`. */
    ClientNotificationUrl?: string;
    /** The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls). */
    Url?: string;
    /** TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both `twiml` and `url` are provided then `twiml` parameter will be ignored. Max 4000 characters. */
    Twiml?: string;
    /** The SID of the Application resource that will handle the call, if the call will be handled by an application. */
    ApplicationSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountCall>;

  /**
   * Retrieves a collection of calls made to and from your account
   */
  listCall: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to read. */
    AccountSid: string;
    /** Only show calls made to this phone number, SIP address, Client identifier or SIM SID. */
    To?: string;
    /** Only include calls from this phone number, SIP address, Client identifier or SIM SID. */
    From?: string;
    /** Only include calls spawned by calls with this SID. */
    ParentCallSid?: string;
    Status?: CallEnumStatus;
    /** Only include calls that started on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that started on this date. */
    StartTime?: string;
    /** Only include calls that started before this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that started before this date. */
    "StartTime<"?: string;
    /** Only include calls that started on or after this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that started on or after this date. */
    "StartTime>"?: string;
    /** Only include calls that ended on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that ended on this date. */
    EndTime?: string;
    /** Only include calls that ended before this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that ended before this date. */
    "EndTime<"?: string;
    /** Only include calls that ended on or after this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that ended on or after this date. */
    "EndTime>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; calls?: (ApiV2010AccountCall)[] }>;

  /**
   * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
   */
  deleteCall: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to delete. */
    AccountSid: string;
    /** The Twilio-provided Call SID that uniquely identifies the Call resource to delete */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch the call specified by the provided Call SID
   */
  fetchCall: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to fetch. */
    AccountSid: string;
    /** The SID of the Call resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountCall>;

  /**
   * Initiates a call redirect or terminates a call
   */
  updateCall: (input: {
    /** The absolute URL that returns the TwiML instructions for the call. We will call this URL using the `method` when the call connects. For more information, see the [Url Parameter](https://www.twilio.com/docs/voice/make-calls#specify-a-url-parameter) section in [Making Calls](https://www.twilio.com/docs/voice/make-calls). */
    Url?: string;
    /** The HTTP method we should use when calling the `url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored. */
    Method?: "GET" | "POST";
    Status?: CallEnumUpdateStatus;
    /** The URL that we call using the `fallback_method` if an error occurs when requesting or executing the TwiML at `url`. If an `application_sid` parameter is present, this parameter is ignored. */
    FallbackUrl?: string;
    /** The HTTP method that we should use to request the `fallback_url`. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored. */
    FallbackMethod?: "GET" | "POST";
    /** The URL we should call using the `status_callback_method` to send status information to your application. If no `status_callback_event` is specified, we will send the `completed` status. If an `application_sid` parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted). */
    StatusCallback?: string;
    /** The HTTP method we should use when requesting the `status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. If an `application_sid` parameter is present, this parameter is ignored. */
    StatusCallbackMethod?: "GET" | "POST";
    /** TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive */
    Twiml?: string;
    /** The maximum duration of the call in seconds. Constraints depend on account and configuration. */
    TimeLimit?: number;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Call resource to update */
    Sid: string;
  }) => Promise<ApiV2010AccountCall>;

  /**
   * Retrieve a list of all events for a call.
   */
  listCallEvent: (input: {
    /** The unique SID identifier of the Account. */
    AccountSid: string;
    /** The unique SID identifier of the Call. */
    CallSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; events?: (ApiV2010AccountCallCallEvent)[] }>;

  fetchCallNotification: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource to fetch. */
    AccountSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the Call Notification resource to fetch. */
    CallSid: string;
    /** The Twilio-provided string that uniquely identifies the Call Notification resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountCallCallNotificationInstance>;

  listCallNotification: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resources to read. */
    AccountSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the Call Notification resources to read. */
    CallSid: string;
    /** Only read notifications of the specified log level. Can be:  `0` to read only ERROR notifications or `1` to read only WARNING notifications. By default, all notifications are read. */
    Log?: number;
    /** Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date. */
    MessageDate?: string;
    /** Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date. */
    "MessageDate<"?: string;
    /** Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date. */
    "MessageDate>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; notifications?: (ApiV2010AccountCallCallNotification)[] }>;

  /**
   * Create a recording for the call
   */
  createCallRecording: (input: {
    /** The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space. */
    RecordingStatusCallbackEvent?: (string)[];
    /** The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback). */
    RecordingStatusCallback?: string;
    /** The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`. */
    RecordingStatusCallbackMethod?: "GET" | "POST";
    /** Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not. */
    Trim?: string;
    /** The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels. */
    RecordingChannels?: string;
    /** The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio. */
    RecordingTrack?: string;
    /** The identifier of the configuration to be used when creating and processing the recording */
    RecordingConfigurationId?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) to associate the resource with. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallCallRecording>;

  /**
   * Retrieve a list of recordings belonging to the call used to make the request
   */
  listCallRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to read. */
    AccountSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to read. */
    CallSid: string;
    /** The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date. */
    DateCreated?: string;
    /** The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date. */
    "DateCreated<"?: string;
    /** The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date. */
    "DateCreated>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; recordings?: (ApiV2010AccountCallCallRecording)[] }>;

  /**
   * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
   */
  updateCallRecording: (input: {
    Status: CallRecordingEnumStatus;
    /** Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`. */
    PauseBehavior?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to update. */
    AccountSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource to update. */
    CallSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountCallCallRecording>;

  /**
   * Fetch an instance of a recording for a call
   */
  fetchCallRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to fetch. */
    AccountSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource to fetch. */
    CallSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountCallCallRecording>;

  /**
   * Delete a recording from your account
   */
  deleteCallRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to delete. */
    AccountSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to delete. */
    CallSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch an instance of a conference
   */
  fetchConference: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Conference resource to fetch */
    Sid: string;
  }) => Promise<ApiV2010AccountConference>;

  updateConference: (input: {
    Status?: ConferenceEnumUpdateStatus;
    /** The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs. */
    AnnounceUrl?: string;
    /** The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST` */
    AnnounceMethod?: "GET" | "POST";
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Conference resource to update */
    Sid: string;
  }) => Promise<ApiV2010AccountConference>;

  /**
   * Retrieve a list of conferences belonging to the account used to make the request
   */
  listConference: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to read. */
    AccountSid: string;
    /** Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date. */
    DateCreated?: string;
    /** Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date. */
    "DateCreated<"?: string;
    /** Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date. */
    "DateCreated>"?: string;
    /** Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date. */
    DateUpdated?: string;
    /** Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date. */
    "DateUpdated<"?: string;
    /** Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date. */
    "DateUpdated>"?: string;
    /** The string that identifies the Conference resources to read. */
    FriendlyName?: string;
    Status?: ConferenceEnumStatus;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; conferences?: (ApiV2010AccountConference)[] }>;

  /**
   * Retrieve a list of recordings belonging to the call used to make the request
   */
  listConferenceRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resources to read. */
    AccountSid: string;
    /** The Conference SID that identifies the conference associated with the recording to read. */
    ConferenceSid: string;
    /** The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date. */
    DateCreated?: string;
    /** The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date. */
    "DateCreated<"?: string;
    /** The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date. */
    "DateCreated>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; recordings?: (ApiV2010AccountConferenceConferenceRecording)[] }>;

  /**
   * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
   */
  updateConferenceRecording: (input: {
    Status: ConferenceRecordingEnumStatus;
    /** Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`. */
    PauseBehavior?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource to update. */
    AccountSid: string;
    /** The Conference SID that identifies the conference associated with the recording to update. */
    ConferenceSid: string;
    /** The Twilio-provided string that uniquely identifies the Conference Recording resource to update. Use `Twilio.CURRENT` to reference the current active recording. */
    Sid: string;
  }) => Promise<ApiV2010AccountConferenceConferenceRecording>;

  /**
   * Fetch an instance of a recording for a call
   */
  fetchConferenceRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource to fetch. */
    AccountSid: string;
    /** The Conference SID that identifies the conference associated with the recording to fetch. */
    ConferenceSid: string;
    /** The Twilio-provided string that uniquely identifies the Conference Recording resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountConferenceConferenceRecording>;

  /**
   * Delete a recording from your account
   */
  deleteConferenceRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resources to delete. */
    AccountSid: string;
    /** The Conference SID that identifies the conference associated with the recording to delete. */
    ConferenceSid: string;
    /** The Twilio-provided string that uniquely identifies the Conference Recording resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch an instance of a connect-app
   */
  fetchConnectApp: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the ConnectApp resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountConnectApp>;

  /**
   * Update a connect-app with the specified parameters
   */
  updateConnectApp: (input: {
    /** The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App. */
    AuthorizeRedirectUrl?: string;
    /** The company name to set for the Connect App. */
    CompanyName?: string;
    /** The HTTP method to use when calling `deauthorize_callback_url`. */
    DeauthorizeCallbackMethod?: "GET" | "POST";
    /** The URL to call using the `deauthorize_callback_method` to de-authorize the Connect App. */
    DeauthorizeCallbackUrl?: string;
    /** A description of the Connect App. */
    Description?: string;
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** A public URL where users can obtain more information about this Connect App. */
    HomepageUrl?: string;
    /** A comma-separated list of the permissions you will request from the users of this ConnectApp.  Can include: `get-all` and `post-all`. */
    Permissions?: (ConnectAppEnumPermission)[];
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resources to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the ConnectApp resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountConnectApp>;

  /**
   * Delete an instance of a connect-app
   */
  deleteConnectApp: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the ConnectApp resource to fetch. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of connect-apps belonging to the account used to make the request
   */
  listConnectApp: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resources to read. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; connect_apps?: (ApiV2010AccountConnectApp)[] }>;

  listDependentPhoneNumber: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resources to read. */
    AccountSid: string;
    /** The SID of the Address resource associated with the phone number. */
    AddressSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; dependent_phone_numbers?: (ApiV2010AccountAddressDependentPhoneNumber)[] }>;

  /**
   * Update an incoming-phone-number instance.
   */
  updateIncomingPhoneNumber: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers). */
    AccountSid?: string;
    /** The API version to use for incoming calls made to the phone number. The default is `2010-04-01`. */
    ApiVersion?: string;
    /** A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number. */
    FriendlyName?: string;
    /** The SID of the application that should handle SMS messages sent to the number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application. */
    SmsApplicationSid?: string;
    /** The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL we should call when the phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The SID of the application we should use to handle phone calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
    VoiceApplicationSid?: string;
    /** Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call to answer a call to the phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set. */
    VoiceUrl?: string;
    EmergencyStatus?: IncomingPhoneNumberEnumEmergencyStatus;
    /** The SID of the emergency address configuration to use for emergency calling from this phone number. */
    EmergencyAddressSid?: string;
    /** The SID of the Trunk we should use to handle phone calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
    TrunkSid?: string;
    VoiceReceiveMode?: IncomingPhoneNumberEnumVoiceReceiveMode;
    /** The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations. */
    IdentitySid?: string;
    /** The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations. */
    AddressSid?: string;
    /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
    BundleSid?: string;
    /** The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to update. */
    Sid: string;
  }, options: { params: { AccountSid: string } }) => Promise<ApiV2010AccountIncomingPhoneNumber>;

  /**
   * Fetch an incoming-phone-number belonging to the account used to make the request.
   */
  fetchIncomingPhoneNumber: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumber>;

  /**
   * Delete a phone-numbers belonging to the account used to make the request.
   */
  deleteIncomingPhoneNumber: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
   */
  listIncomingPhoneNumber: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resources to read. */
    AccountSid: string;
    /** Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** A string that identifies the IncomingPhoneNumber resources to read. */
    FriendlyName?: string;
    /** The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit. */
    PhoneNumber?: string;
    /** Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included. */
    Origin?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; incoming_phone_numbers?: (ApiV2010AccountIncomingPhoneNumber)[] }>;

  /**
   * Purchase a phone-number for the account.
   */
  createIncomingPhoneNumber: (input: {
    /** The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`. */
    ApiVersion?: string;
    /** A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number. */
    FriendlyName?: string;
    /** The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application. */
    SmsApplicationSid?: string;
    /** The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL we should call when the new phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
    VoiceApplicationSid?: string;
    /** Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set. */
    VoiceUrl?: string;
    EmergencyStatus?: IncomingPhoneNumberEnumEmergencyStatus;
    /** The SID of the emergency address configuration to use for emergency calling from the new phone number. */
    EmergencyAddressSid?: string;
    /** The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
    TrunkSid?: string;
    /** The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations. */
    IdentitySid?: string;
    /** The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations. */
    AddressSid?: string;
    VoiceReceiveMode?: IncomingPhoneNumberEnumVoiceReceiveMode;
    /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
    BundleSid?: string;
    /** The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234. */
    PhoneNumber?: string;
    /** The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. **You must provide an `area_code` or a `phone_number`.** (US and Canada only). */
    AreaCode?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumber>;

  /**
   * Fetch an instance of an Add-on installation currently assigned to this Number.
   */
  fetchIncomingPhoneNumberAssignedAddOn: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource to fetch. */
    AccountSid: string;
    /** The SID of the Phone Number to which the Add-on is assigned. */
    ResourceSid: string;
    /** The Twilio-provided string that uniquely identifies the resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn>;

  /**
   * Remove the assignment of an Add-on installation from the Number specified.
   */
  deleteIncomingPhoneNumberAssignedAddOn: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to delete. */
    AccountSid: string;
    /** The SID of the Phone Number to which the Add-on is assigned. */
    ResourceSid: string;
    /** The Twilio-provided string that uniquely identifies the resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of Add-on installations currently assigned to this Number.
   */
  listIncomingPhoneNumberAssignedAddOn: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read. */
    AccountSid: string;
    /** The SID of the Phone Number to which the Add-on is assigned. */
    ResourceSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; assigned_add_ons?: (ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn)[] }>;

  /**
   * Assign an Add-on installation to the Number specified.
   */
  createIncomingPhoneNumberAssignedAddOn: (input: {
    /** The SID that identifies the Add-on installation. */
    InstalledAddOnSid: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the Phone Number to assign the Add-on. */
    ResourceSid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOn>;

  /**
   * Fetch an instance of an Extension for the Assigned Add-on.
   */
  fetchIncomingPhoneNumberAssignedAddOnExtension: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource to fetch. */
    AccountSid: string;
    /** The SID of the Phone Number to which the Add-on is assigned. */
    ResourceSid: string;
    /** The SID that uniquely identifies the assigned Add-on installation. */
    AssignedAddOnSid: string;
    /** The Twilio-provided string that uniquely identifies the resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension>;

  /**
   * Retrieve a list of Extensions for the Assigned Add-on.
   */
  listIncomingPhoneNumberAssignedAddOnExtension: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read. */
    AccountSid: string;
    /** The SID of the Phone Number to which the Add-on is assigned. */
    ResourceSid: string;
    /** The SID that uniquely identifies the assigned Add-on installation. */
    AssignedAddOnSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; extensions?: (ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtension)[] }>;

  listIncomingPhoneNumberLocal: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read. */
    AccountSid: string;
    /** Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** A string that identifies the resources to read. */
    FriendlyName?: string;
    /** The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit. */
    PhoneNumber?: string;
    /** Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included. */
    Origin?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; incoming_phone_numbers?: (ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal)[] }>;

  createIncomingPhoneNumberLocal: (input: {
    /** The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234. */
    PhoneNumber: string;
    /** The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`. */
    ApiVersion?: string;
    /** A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number. */
    FriendlyName?: string;
    /** The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those set on the application. */
    SmsApplicationSid?: string;
    /** The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL we should call when the new phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
    VoiceApplicationSid?: string;
    /** Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set. */
    VoiceUrl?: string;
    /** The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations. */
    IdentitySid?: string;
    /** The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations. */
    AddressSid?: string;
    EmergencyStatus?: IncomingPhoneNumberLocalEnumEmergencyStatus;
    /** The SID of the emergency address configuration to use for emergency calling from the new phone number. */
    EmergencyAddressSid?: string;
    /** The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
    TrunkSid?: string;
    VoiceReceiveMode?: IncomingPhoneNumberLocalEnumVoiceReceiveMode;
    /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
    BundleSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocal>;

  listIncomingPhoneNumberMobile: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read. */
    AccountSid: string;
    /** Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** A string that identifies the resources to read. */
    FriendlyName?: string;
    /** The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit. */
    PhoneNumber?: string;
    /** Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included. */
    Origin?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; incoming_phone_numbers?: (ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile)[] }>;

  createIncomingPhoneNumberMobile: (input: {
    /** The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234. */
    PhoneNumber: string;
    /** The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`. */
    ApiVersion?: string;
    /** A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, the is a formatted version of the phone number. */
    FriendlyName?: string;
    /** The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all of the `sms_*_url` urls and use those of the application. */
    SmsApplicationSid?: string;
    /** The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL we should call when the new phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use only those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
    VoiceApplicationSid?: string;
    /** Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set. */
    VoiceUrl?: string;
    /** The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations. */
    IdentitySid?: string;
    /** The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations. */
    AddressSid?: string;
    EmergencyStatus?: IncomingPhoneNumberMobileEnumEmergencyStatus;
    /** The SID of the emergency address configuration to use for emergency calling from the new phone number. */
    EmergencyAddressSid?: string;
    /** The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
    TrunkSid?: string;
    VoiceReceiveMode?: IncomingPhoneNumberMobileEnumVoiceReceiveMode;
    /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
    BundleSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobile>;

  listIncomingPhoneNumberTollFree: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read. */
    AccountSid: string;
    /** Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`. */
    Beta?: boolean;
    /** A string that identifies the resources to read. */
    FriendlyName?: string;
    /** The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit. */
    PhoneNumber?: string;
    /** Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included. */
    Origin?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; incoming_phone_numbers?: (ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree)[] }>;

  createIncomingPhoneNumberTollFree: (input: {
    /** The phone number to purchase specified in [E.164](https://www.twilio.com/docs/glossary/what-e164) format.  E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234. */
    PhoneNumber: string;
    /** The API version to use for incoming calls made to the new phone number. The default is `2010-04-01`. */
    ApiVersion?: string;
    /** A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number. */
    FriendlyName?: string;
    /** The SID of the application that should handle SMS messages sent to the new phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application. */
    SmsApplicationSid?: string;
    /** The HTTP method that we should use to call `sms_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while requesting or executing the TwiML defined by `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method that we should use to call `sms_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL we should call when the new phone number receives an incoming SMS message. */
    SmsUrl?: string;
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The SID of the application we should use to handle calls to the new phone number. If a `voice_application_sid` is present, we ignore all of the voice urls and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa. */
    VoiceApplicationSid?: string;
    /** Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: `true` or `false` and defaults to `false`. */
    VoiceCallerIdLookup?: boolean;
    /** The HTTP method that we should use to call `voice_fallback_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method that we should use to call `voice_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call to answer a call to the new phone number. The `voice_url` will not be called if a `voice_application_sid` or a `trunk_sid` is set. */
    VoiceUrl?: string;
    /** The SID of the Identity resource that we should associate with the new phone number. Some regions require an Identity to meet local regulations. */
    IdentitySid?: string;
    /** The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations. */
    AddressSid?: string;
    EmergencyStatus?: IncomingPhoneNumberTollFreeEnumEmergencyStatus;
    /** The SID of the emergency address configuration to use for emergency calling from the new phone number. */
    EmergencyAddressSid?: string;
    /** The SID of the Trunk we should use to handle calls to the new phone number. If a `trunk_sid` is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa. */
    TrunkSid?: string;
    VoiceReceiveMode?: IncomingPhoneNumberTollFreeEnumVoiceReceiveMode;
    /** The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. */
    BundleSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFree>;

  fetchKey: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Key resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountKey>;

  updateKey: (input: {
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Key resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountKey>;

  deleteKey: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Key resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  listKey: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to read. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; keys?: (ApiV2010AccountKey)[] }>;

  createNewKey: (input: {
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Key resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountNewKey>;

  /**
   * Delete the Media resource.
   */
  deleteMedia: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is associated with the Media resource. */
    AccountSid: string;
    /** The SID of the Message resource that is associated with the Media resource. */
    MessageSid: string;
    /** The unique identifier of the to-be-deleted Media resource. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch a single Media resource associated with a specific Message resource
   */
  fetchMedia: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Media resource. */
    AccountSid: string;
    /** The SID of the Message resource that is associated with the Media resource. */
    MessageSid: string;
    /** The Twilio-provided string that uniquely identifies the Media resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountMessageMedia>;

  /**
   * Read a list of Media resources associated with a specific Message resource
   */
  listMedia: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is associated with the Media resources. */
    AccountSid: string;
    /** The SID of the Message resource that is associated with the Media resources. */
    MessageSid: string;
    /** Only include Media resources that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read Media that were created on this date. You can also specify an inequality, such as `StartTime<=YYYY-MM-DD`, to read Media that were created on or before midnight of this date, and `StartTime>=YYYY-MM-DD` to read Media that were created on or after midnight of this date. */
    DateCreated?: string;
    /** Only include Media resources that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read Media that were created on this date. You can also specify an inequality, such as `StartTime<=YYYY-MM-DD`, to read Media that were created on or before midnight of this date, and `StartTime>=YYYY-MM-DD` to read Media that were created on or after midnight of this date. */
    "DateCreated<"?: string;
    /** Only include Media resources that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read Media that were created on this date. You can also specify an inequality, such as `StartTime<=YYYY-MM-DD`, to read Media that were created on or before midnight of this date, and `StartTime>=YYYY-MM-DD` to read Media that were created on or after midnight of this date. */
    "DateCreated>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; media_list?: (ApiV2010AccountMessageMedia)[] }>;

  /**
   * Fetch a specific member from the queue
   */
  fetchMember: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Member resource(s) to fetch. */
    AccountSid: string;
    /** The SID of the Queue in which to find the members to fetch. */
    QueueSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource(s) to fetch. */
    CallSid: string;
  }) => Promise<ApiV2010AccountQueueMember>;

  /**
   * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
   */
  updateMember: (input: {
    /** The absolute URL of the Queue resource. */
    Url: string;
    /** How to pass the update request data. Can be `GET` or `POST` and the default is `POST`. `POST` sends the data as encoded form data and `GET` sends the data as query parameters. */
    Method?: "GET" | "POST";
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Member resource(s) to update. */
    AccountSid: string;
    /** The SID of the Queue in which to find the members to update. */
    QueueSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource(s) to update. */
    CallSid: string;
  }) => Promise<ApiV2010AccountQueueMember>;

  /**
   * Retrieve the members of the queue
   */
  listMember: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Member resource(s) to read. */
    AccountSid: string;
    /** The SID of the Queue in which to find the members */
    QueueSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; queue_members?: (ApiV2010AccountQueueMember)[] }>;

  /**
   * Send a message
   */
  createMessage: (input: {
    /** The recipient's phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (for SMS/MMS) or [channel address](https://www.twilio.com/docs/messaging/channels), e.g. `whatsapp:+15552229999`. */
    To: string;
    /** The URL of the endpoint to which Twilio sends [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url). URL must contain a valid hostname and underscores are not allowed. If you include this parameter with the `messaging_service_sid`, Twilio uses this URL instead of the Status Callback URL of the [Messaging Service](https://www.twilio.com/docs/messaging/api/service-resource).  */
    StatusCallback?: string;
    /** The SID of the associated [TwiML Application](https://www.twilio.com/docs/usage/api/applications). [Message status callback requests](https://www.twilio.com/docs/sms/api/message-resource#twilios-request-to-the-statuscallback-url) are sent to the TwiML App's `message_status_callback` URL. Note that the `status_callback` parameter of a request takes priority over the `application_sid` parameter; if both are included `application_sid` is ignored. */
    ApplicationSid?: string;
    /** [OBSOLETE] This parameter will no longer have any effect as of 2024-06-03. */
    MaxPrice?: number;
    /** Boolean indicating whether or not you intend to provide delivery confirmation feedback to Twilio (used in conjunction with the [Message Feedback subresource](https://www.twilio.com/docs/sms/api/message-feedback-resource)). Default value is `false`. */
    ProvideFeedback?: boolean;
    /** Total number of attempts made (including this request) to send the message regardless of the provider used */
    Attempt?: number;
    /** The maximum length in seconds that the Message can remain in Twilio's outgoing message queue. If a queued Message exceeds the `validity_period`, the Message is not sent. Accepted values are integers from `1` to `36000`. Default value is `36000`. A `validity_period` greater than `5` is recommended. [Learn more about the validity period](https://www.twilio.com/blog/take-more-control-of-outbound-messages-using-validity-period-html) */
    ValidityPeriod?: number;
    /** Reserved */
    ForceDelivery?: boolean;
    ContentRetention?: MessageEnumContentRetention;
    AddressRetention?: MessageEnumAddressRetention;
    /** Whether to detect Unicode characters that have a similar GSM-7 character and replace them. Can be: `true` or `false`. */
    SmartEncoded?: boolean;
    /** Rich actions for non-SMS/MMS channels. Used for [sending location in WhatsApp messages](https://www.twilio.com/docs/whatsapp/message-features#location-messages-with-whatsapp). */
    PersistentAction?: (string)[];
    TrafficType?: MessageEnumTrafficType;
    /** For Messaging Services with [Link Shortening configured](https://www.twilio.com/docs/messaging/features/link-shortening) only: A Boolean indicating whether or not Twilio should shorten links in the `body` of the Message. Default value is `false`. If `true`, the `messaging_service_sid` parameter must also be provided. */
    ShortenUrls?: boolean;
    ScheduleType?: MessageEnumScheduleType;
    /** The time that Twilio will send the message. Must be in ISO 8601 format. */
    SendAt?: string;
    /** If set to `true`, Twilio delivers the message as a single MMS message, regardless of the presence of media. */
    SendAsMms?: boolean;
    /** For [Content Editor/API](https://www.twilio.com/docs/content) only: Key-value pairs of [Template variables](https://www.twilio.com/docs/content/using-variables-with-content-api) and their substitution values. `content_sid` parameter must also be provided. If values are not defined in the `content_variables` parameter, the [Template's default placeholder values](https://www.twilio.com/docs/content/content-api-resources#create-templates) are used. */
    ContentVariables?: string;
    RiskCheck?: MessageEnumRiskCheck;
    /** The sender's Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), [Wireless SIM](https://www.twilio.com/docs/iot/wireless/programmable-wireless-send-machine-machine-sms-commands), [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), or [channel address](https://www.twilio.com/docs/messaging/channels) (e.g., `whatsapp:+15554449999`). The value of the `from` parameter must be a sender that is hosted within Twilio and belongs to the Account creating the Message. If you are using `messaging_service_sid`, this parameter can be empty (Twilio assigns a `from` value from the Messaging Service's Sender Pool) or you can provide a specific sender from your Sender Pool. */
    From?: string;
    /** A fallback SMS sender to use when the recipient cannot be reached over RCS. This parameter may only be used when also providing a [Messaging Service](https://twilio.com/docs/messaging/services) containing an RCS sender. The fallback SMS sender must be either a Twilio phone number (in [E.164](https://en.wikipedia.org/wiki/E.164) format), [alphanumeric sender ID](https://www.twilio.com/docs/sms/quickstart), or [short code](https://www.twilio.com/en-us/messaging/channels/sms/short-codes), hosted within Twilio and belong to the Account creating the Message. */
    FallbackFrom?: string;
    /** The SID of the [Messaging Service](https://www.twilio.com/docs/messaging/services) you want to associate with the Message. When this parameter is provided and the `from` parameter is omitted, Twilio selects the optimal sender from the Messaging Service's Sender Pool. You may also provide a `from` parameter if you want to use a specific Sender from the Sender Pool. */
    MessagingServiceSid?: string;
    /** The text content of the outgoing message. Can be up to 1,600 characters in length. SMS only: If the `body` contains more than 160 [GSM-7](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding) characters (or 70 [UCS-2](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding) characters), the message is segmented and charged accordingly. For long `body` text, consider using the [send_as_mms parameter](https://www.twilio.com/blog/mms-for-long-text-messages). */
    Body?: string;
    /** The URL of media to include in the Message content. `jpeg`, `jpg`, `gif`, and `png` file types are fully supported by Twilio and content is formatted for delivery on destination devices. The media size limit is 5 MB for supported file types (`jpeg`, `jpg`, `png`, `gif`) and 500 KB for [other types](https://www.twilio.com/docs/messaging/guides/accepted-mime-types) of accepted media. To send more than one image in the message, provide multiple `media_url` parameters in the POST request. You can include up to ten `media_url` parameters per message. [International](https://support.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages) and [carrier](https://support.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-) limits apply. */
    MediaUrl?: (string)[];
    /** For [Content Editor/API](https://www.twilio.com/docs/content) only: The SID of the Content Template to be used with the Message, e.g., `HXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`. If this parameter is not provided, a Content Template is not used. Find the SID in the Console on the Content Editor page. For Content API users, the SID is found in Twilio's response when [creating the Template](https://www.twilio.com/docs/content/content-api-resources#create-templates) or by [fetching your Templates](https://www.twilio.com/docs/content/content-api-resources#fetch-all-content-resources). */
    ContentSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) creating the Message resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountMessage>;

  /**
   * Retrieve a list of Message resources associated with a Twilio Account
   */
  listMessage: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resources. */
    AccountSid: string;
    /** Filter by recipient. For example: Set this parameter to `+15558881111` to retrieve a list of Message resources sent to `+15558881111`. */
    To?: string;
    /** Filter by sender. For example: Set this parameter to `+15552229999` to retrieve a list of Message resources sent by `+15552229999`. */
    From?: string;
    /** Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date). */
    DateSent?: string;
    /** Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date). */
    "DateSent<"?: string;
    /** Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date). */
    "DateSent>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; messages?: (ApiV2010AccountMessage)[] }>;

  /**
   * Deletes a Message resource from your account
   */
  deleteMessage: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource */
    AccountSid: string;
    /** The SID of the Message resource you wish to delete */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch a specific Message
   */
  fetchMessage: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource */
    AccountSid: string;
    /** The SID of the Message resource to be fetched */
    Sid: string;
  }) => Promise<ApiV2010AccountMessage>;

  /**
   * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
   */
  updateMessage: (input: {
    /** The new `body` of the Message resource. To redact the text content of a Message, this parameter's value must be an empty string */
    Body?: string;
    Status?: MessageEnumUpdateStatus;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Message resources to update. */
    AccountSid: string;
    /** The SID of the Message resource to be updated */
    Sid: string;
  }) => Promise<ApiV2010AccountMessage>;

  /**
   * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
   */
  createMessageFeedback: (input: {
    Outcome?: MessageFeedbackEnumOutcome;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource for which to create MessageFeedback. */
    AccountSid: string;
    /** The SID of the Message resource for which to create MessageFeedback. */
    MessageSid: string;
  }) => Promise<ApiV2010AccountMessageMessageFeedback>;

  /**
   * Create a new Signing Key for the account making the request.
   */
  createNewSigningKey: (input: {
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Key resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountNewSigningKey>;

  listSigningKey: (input: {
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; signing_keys?: (ApiV2010AccountSigningKey)[] }>;

  /**
   * Fetch a notification belonging to the account used to make the request
   */
  fetchNotification: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Notification resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountNotificationInstance>;

  /**
   * Retrieve a list of notifications belonging to the account used to make the request
   */
  listNotification: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resources to read. */
    AccountSid: string;
    /** Only read notifications of the specified log level. Can be:  `0` to read only ERROR notifications or `1` to read only WARNING notifications. By default, all notifications are read. */
    Log?: number;
    /** Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date. */
    MessageDate?: string;
    /** Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date. */
    "MessageDate<"?: string;
    /** Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date. */
    "MessageDate>"?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; notifications?: (ApiV2010AccountNotification)[] }>;

  /**
   * Fetch an outgoing-caller-id belonging to the account used to make the request
   */
  fetchOutgoingCallerId: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the OutgoingCallerId resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountOutgoingCallerId>;

  /**
   * Updates the caller-id
   */
  updateOutgoingCallerId: (input: {
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resources to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the OutgoingCallerId resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountOutgoingCallerId>;

  /**
   * Delete the caller-id specified from the account
   */
  deleteOutgoingCallerId: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the OutgoingCallerId resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
   */
  listOutgoingCallerId: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resources to read. */
    AccountSid: string;
    /** The phone number of the OutgoingCallerId resources to read. */
    PhoneNumber?: string;
    /** The string that identifies the OutgoingCallerId resources to read. */
    FriendlyName?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; outgoing_caller_ids?: (ApiV2010AccountOutgoingCallerId)[] }>;

  createValidationRequest: (input: {
    /** The phone number to verify in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number. */
    PhoneNumber: string;
    /** A descriptive string that you create to describe the new caller ID resource. It can be up to 64 characters long. The default value is a formatted version of the phone number. */
    FriendlyName?: string;
    /** The number of seconds to delay before initiating the verification call. Can be an integer between `0` and `60`, inclusive. The default is `0`. */
    CallDelay?: number;
    /** The digits to dial after connecting the verification call. */
    Extension?: string;
    /** The URL we should call using the `status_callback_method` to send status information about the verification process to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`, and the default is `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the new caller ID resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountValidationRequest>;

  /**
   * Fetch an instance of a participant
   */
  fetchParticipant: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource to fetch. */
    AccountSid: string;
    /** The SID of the conference with the participant to fetch. */
    ConferenceSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to fetch. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20. */
    CallSid: string;
  }) => Promise<ApiV2010AccountConferenceParticipant>;

  /**
   * Update the properties of the participant
   */
  updateParticipant: (input: {
    /** Whether the participant should be muted. Can be `true` or `false`. `true` will mute the participant, and `false` will un-mute them. Anything value other than `true` or `false` is interpreted as `false`. */
    Muted?: boolean;
    /** Whether the participant should be on hold. Can be: `true` or `false`. `true` puts the participant on hold, and `false` lets them rejoin the conference. */
    Hold?: boolean;
    /** The URL we call using the `hold_method` for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs. */
    HoldUrl?: string;
    /** The HTTP method we should use to call `hold_url`. Can be: `GET` or `POST` and the default is `GET`. */
    HoldMethod?: "GET" | "POST";
    /** The URL we call using the `announce_method` for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs. */
    AnnounceUrl?: string;
    /** The HTTP method we should use to call `announce_url`. Can be: `GET` or `POST` and defaults to `POST`. */
    AnnounceMethod?: "GET" | "POST";
    /** The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl). */
    WaitUrl?: string;
    /** The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file. */
    WaitMethod?: "GET" | "POST";
    /** Whether to play a notification beep to the conference when the participant exits. Can be: `true` or `false`. */
    BeepOnExit?: boolean;
    /** Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`. */
    EndConferenceOnExit?: boolean;
    /** Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined. */
    Coaching?: boolean;
    /** The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`. */
    CallSidToCoach?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to update. */
    AccountSid: string;
    /** The SID of the conference with the participant to update. */
    ConferenceSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to update. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20. */
    CallSid: string;
  }) => Promise<ApiV2010AccountConferenceParticipant>;

  /**
   * Kick a participant from a given conference
   */
  deleteParticipant: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to delete. */
    AccountSid: string;
    /** The SID of the conference with the participants to delete. */
    ConferenceSid: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to delete. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20. */
    CallSid: string;
  }) => Promise<unknown>;

  createParticipant: (input: {
    /** The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `from` must also be a phone number. If `to` is sip address, this value of `from` should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint. */
    From: string;
    /** The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). SIP addresses are formatted as `sip:name@company.com`. Client identifiers are formatted `client:name`. TwiML App identifiers are formatted `app:<APP_SID>`. [Custom parameters](https://www.twilio.com/docs/voice/api/conference-participant-resource#custom-parameters) may also be specified. */
    To: string;
    /** The URL we should call using the `status_callback_method` to send status information to your application. */
    StatusCallback?: string;
    /** The HTTP method we should use to call `status_callback`. Can be: `GET` and `POST` and defaults to `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** The conference state changes that should generate a call to `status_callback`. Can be: `initiated`, `ringing`, `answered`, and `completed`. Separate multiple values with a space. The default value is `completed`. */
    StatusCallbackEvent?: (string)[];
    /** A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant. */
    Label?: string;
    /** The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between `5` and `600`, inclusive. The default value is `60`. We always add a 5-second timeout buffer to outgoing calls, so  value of 10 would result in an actual timeout that was closer to 15 seconds. */
    Timeout?: number;
    /** Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`. */
    Record?: boolean;
    /** Whether the agent is muted in the conference. Can be `true` or `false` and the default is `false`. */
    Muted?: boolean;
    /** Whether to play a notification beep to the conference when the participant joins. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`. */
    Beep?: string;
    /** Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference. */
    StartConferenceOnEnter?: boolean;
    /** Whether to end the conference when the participant leaves. Can be: `true` or `false` and defaults to `false`. */
    EndConferenceOnExit?: boolean;
    /** The URL that Twilio calls using the `wait_method` before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting `wait_url` to `''`. For more details on the allowable verbs within the `waitUrl`, see the `waitUrl` attribute in the [<Conference> TwiML instruction](https://www.twilio.com/docs/voice/twiml/conference#attributes-waiturl). */
    WaitUrl?: string;
    /** The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file. */
    WaitMethod?: "GET" | "POST";
    /** Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: `true` or `false` and defaults to `true`. */
    EarlyMedia?: boolean;
    /** The maximum number of participants in the conference. Can be a positive integer from `2` to `250`. The default value is `250`. */
    MaxParticipants?: number;
    /** Whether to record the conference the participant is joining. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`. */
    ConferenceRecord?: string;
    /** Whether to trim leading and trailing silence from the conference recording. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`. */
    ConferenceTrim?: string;
    /** The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored. */
    ConferenceStatusCallback?: string;
    /** The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    ConferenceStatusCallbackMethod?: "GET" | "POST";
    /** The conference state changes that should generate a call to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `modify`, `speaker`, and `announcement`. Separate multiple values with a space. Defaults to `start end`. */
    ConferenceStatusCallbackEvent?: (string)[];
    /** The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`. */
    RecordingChannels?: string;
    /** The URL that we should call using the `recording_status_callback_method` when the recording status changes. */
    RecordingStatusCallback?: string;
    /** The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    RecordingStatusCallbackMethod?: "GET" | "POST";
    /** The SIP username used for authentication. */
    SipAuthUsername?: string;
    /** The SIP password for authentication. */
    SipAuthPassword?: string;
    /** The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`. */
    Region?: string;
    /** The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available. */
    ConferenceRecordingStatusCallback?: string;
    /** The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`. */
    ConferenceRecordingStatusCallbackMethod?: "GET" | "POST";
    /** The recording state changes that should generate a call to `recording_status_callback`. Can be: `started`, `in-progress`, `paused`, `resumed`, `stopped`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'`. */
    RecordingStatusCallbackEvent?: (string)[];
    /** The conference recording state changes that generate a call to `conference_recording_status_callback`. Can be: `in-progress`, `completed`, `failed`, and `absent`. Separate multiple values with a space, ex: `'in-progress completed failed'` */
    ConferenceRecordingStatusCallbackEvent?: (string)[];
    /** Whether the participant is coaching another call. Can be: `true` or `false`. If not present, defaults to `false` unless `call_sid_to_coach` is defined. If `true`, `call_sid_to_coach` must be defined. */
    Coaching?: boolean;
    /** The SID of the participant who is being `coached`. The participant being coached is the only participant who can hear the participant who is `coaching`. */
    CallSidToCoach?: string;
    /** Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: `off`, `small`, `medium`, and `large`. Default to `large`. */
    JitterBufferSize?: string;
    /** The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that `byoc` is only meaningful when `to` is a phone number; it will otherwise be ignored. (Beta) */
    Byoc?: string;
    /** The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in [E.164](https://www.twilio.com/docs/glossary/what-e164) format (e.g., +16175551212). Client identifiers are formatted `client:name`. If using a phone number, it must be a Twilio number or a Verified [outgoing caller id](https://www.twilio.com/docs/voice/api/outgoing-caller-ids) for your account. If the `to` parameter is a phone number, `callerId` must also be a phone number. If `to` is sip address, this value of `callerId` should be a username portion to be used to populate the From header that is passed to the SIP endpoint. */
    CallerId?: string;
    /** The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta) */
    CallReason?: string;
    /** The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is sent from Twilio. `both` records the audio that is received and sent by Twilio. */
    RecordingTrack?: string;
    /** The identifier of the configuration to be used when creating and processing the recording */
    RecordingConfigurationId?: string;
    /** The maximum duration of the call in seconds. Constraints depend on account and configuration. */
    TimeLimit?: number;
    /** Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd`, if you would like to leave a message on an answering machine. For more information, see [Answering Machine Detection](https://www.twilio.com/docs/voice/answering-machine-detection). */
    MachineDetection?: string;
    /** The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`. The default timeout is 30 seconds. */
    MachineDetectionTimeout?: number;
    /** The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400. */
    MachineDetectionSpeechThreshold?: number;
    /** The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200. */
    MachineDetectionSpeechEndThreshold?: number;
    /** The number of milliseconds of initial silence after which an `unknown` AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000. */
    MachineDetectionSilenceTimeout?: number;
    /** The URL that we should call using the `amd_status_callback_method` to notify customer application whether the call was answered by human, machine or fax. */
    AmdStatusCallback?: string;
    /** The HTTP method we should use when calling the `amd_status_callback` URL. Can be: `GET` or `POST` and the default is `POST`. */
    AmdStatusCallbackMethod?: "GET" | "POST";
    /** Whether to trim any leading and trailing silence from the participant recording. Can be: `trim-silence` or `do-not-trim` and the default is `trim-silence`. */
    Trim?: string;
    /** A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call. */
    CallToken?: string;
    /** The URL that we should use to deliver `push call notification`. */
    ClientNotificationUrl?: string;
    /** The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address. */
    CallerDisplayName?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the participant's conference. */
    ConferenceSid: string;
  }) => Promise<ApiV2010AccountConferenceParticipant>;

  /**
   * Retrieve a list of participants belonging to the account used to make the request
   */
  listParticipant: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to read. */
    AccountSid: string;
    /** The SID of the conference with the participants to read. */
    ConferenceSid: string;
    /** Whether to return only participants that are muted. Can be: `true` or `false`. */
    Muted?: boolean;
    /** Whether to return only participants that are on hold. Can be: `true` or `false`. */
    Hold?: boolean;
    /** Whether to return only participants who are coaching another call. Can be: `true` or `false`. */
    Coaching?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; participants?: (ApiV2010AccountConferenceParticipant)[] }>;

  /**
   * create an instance of payments. This will start a new payments session
   */
  createPayments: (input: {
    /** A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated. */
    IdempotencyKey: string;
    /** Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [expected StatusCallback values](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback) */
    StatusCallback: string;
    BankAccountType?: PaymentsEnumBankAccountType;
    /** A positive decimal value less than 1,000,000 to charge against the credit card or bank account. Default currency can be overwritten with `currency` field. Leave blank or set to 0 to tokenize. */
    ChargeAmount?: number;
    /** The currency of the `charge_amount`, formatted as [ISO 4127](http://www.iso.org/iso/home/standards/currency_codes.htm) format. The default value is `USD` and all values allowed from the Pay Connector are accepted. */
    Currency?: string;
    /** The description can be used to provide more details regarding the transaction. This information is submitted along with the payment details to the Payment Connector which are then posted on the transactions. */
    Description?: string;
    /** A list of inputs that should be accepted. Currently only `dtmf` is supported. All digits captured during a pay session are redacted from the logs. */
    Input?: string;
    /** A positive integer that is used to validate the length of the `PostalCode` inputted by the user. User must enter this many digits. */
    MinPostalCodeLength?: number;
    /** A single-level JSON object used to pass custom parameters to payment processors. (Required for ACH payments). The information that has to be included here depends on the <Pay> Connector. [Read more](https://www.twilio.com/console/voice/pay-connectors). */
    Parameter?: unknown;
    /** This is the unique name corresponding to the Pay Connector installed in the Twilio Add-ons. Learn more about [<Pay> Connectors](https://www.twilio.com/console/voice/pay-connectors). The default value is `Default`. */
    PaymentConnector?: string;
    PaymentMethod?: PaymentsEnumPaymentMethod;
    /** Indicates whether the credit card postal code (zip code) is a required piece of payment information that must be provided by the caller. The default is `true`. */
    PostalCode?: boolean;
    /** Indicates whether the credit card security code is a required piece of payment information that must be provided by the caller. The default is `true`. */
    SecurityCode?: boolean;
    /** The number of seconds that <Pay> should wait for the caller to press a digit between each subsequent digit, after the first one, before moving on to validate the digits captured. The default is `5`, maximum is `600`. */
    Timeout?: number;
    TokenType?: PaymentsEnumTokenType;
    /** Credit card types separated by space that Pay should accept. The default value is `visa mastercard amex` */
    ValidCardTypes?: string;
    /** A comma-separated list of payment information fields that require the caller to enter the same value twice for confirmation. Supported values are `payment-card-number`, `expiration-date`, `security-code`, and `postal-code`. */
    RequireMatchingInputs?: string;
    /** Whether to prompt the caller to confirm their payment information before submitting to the payment gateway. If `true`, the caller will hear the last 4 digits of their card or account number and must press 1 to confirm or 2 to cancel. Default is `false`. */
    Confirmation?: "true" | "false";
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the call that will create the resource. Call leg associated with this sid is expected to provide payment information thru DTMF. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallPayments>;

  /**
   * update an instance of payments with different phases of payment flows.
   */
  updatePayments: (input: {
    /** A unique token that will be used to ensure that multiple API calls with the same information do not result in multiple transactions. This should be a unique string value per API call and can be a randomly generated. */
    IdempotencyKey: string;
    /** Provide an absolute or relative URL to receive status updates regarding your Pay session. Read more about the [Update](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-update) and [Complete/Cancel](https://www.twilio.com/docs/voice/api/payment-resource#statuscallback-cancelcomplete) POST requests. */
    StatusCallback: string;
    Capture?: PaymentsEnumCapture;
    Status?: PaymentsEnumStatus;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will update the resource. */
    AccountSid: string;
    /** The SID of the call that will update the resource. This should be the same call sid that was used to create payments resource. */
    CallSid: string;
    /** The SID of Payments session that needs to be updated. */
    Sid: string;
  }) => Promise<ApiV2010AccountCallPayments>;

  /**
   * Fetch an instance of a queue identified by the QueueSid
   */
  fetchQueue: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Queue resource to fetch */
    Sid: string;
  }) => Promise<ApiV2010AccountQueue>;

  /**
   * Update the queue with the new parameters
   */
  updateQueue: (input: {
    /** A descriptive string that you created to describe this resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000. */
    MaxSize?: number;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resource to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Queue resource to update */
    Sid: string;
  }) => Promise<ApiV2010AccountQueue>;

  /**
   * Remove an empty queue
   */
  deleteQueue: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resource to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Queue resource to delete */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of queues belonging to the account used to make the request
   */
  listQueue: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resources to read. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; queues?: (ApiV2010AccountQueue)[] }>;

  /**
   * Create a queue
   */
  createQueue: (input: {
    /** A descriptive string that you created to describe this resource. It can be up to 64 characters long. */
    FriendlyName: string;
    /** The maximum number of calls allowed to be in the queue. The default is 1000. The maximum is 5000. */
    MaxSize?: number;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountQueue>;

  /**
   * Create a Transcription
   */
  createRealtimeTranscription: (input: {
    /** The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription. */
    Name?: string;
    Track?: RealtimeTranscriptionEnumTrack;
    /** Absolute URL of the status callback. */
    StatusCallbackUrl?: string;
    /** The http method for the status_callback (one of GET, POST). */
    StatusCallbackMethod?: "GET" | "POST";
    /** Friendly name given to the Inbound Track */
    InboundTrackLabel?: string;
    /** Friendly name given to the Outbound Track */
    OutboundTrackLabel?: string;
    /** Indicates if partial results are going to be sent to the customer */
    PartialResults?: boolean;
    /** Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format */
    LanguageCode?: string;
    /** Definition of the transcription engine to be used, among those supported by Twilio */
    TranscriptionEngine?: string;
    /** indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks */
    ProfanityFilter?: boolean;
    /** Recognition model used by the transcription engine, among those supported by the provider */
    SpeechModel?: string;
    /** A Phrase contains words and phrase "hints" so that the speech recognition engine is more likely to recognize them. */
    Hints?: string;
    /** The provider will add punctuation to recognition result */
    EnableAutomaticPunctuation?: boolean;
    /** The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators */
    IntelligenceService?: string;
    /** The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service */
    ConversationConfiguration?: string;
    /** The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service */
    ConversationId?: string;
    /** The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go. */
    TranscriptionConfigurationId?: string;
    /** Whether the callback includes raw provider data. */
    EnableProviderData?: boolean;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallRealtimeTranscription>;

  /**
   * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
   */
  updateRealtimeTranscription: (input: {
    Status: RealtimeTranscriptionEnumUpdateStatus;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with. */
    CallSid: string;
    /** The SID of the Transcription resource, or the `name` used when creating the resource */
    Sid: string;
  }) => Promise<ApiV2010AccountCallRealtimeTranscription>;

  /**
   * Fetch an instance of a recording
   */
  fetchRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording resource to fetch. */
    Sid: string;
    /** A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days. */
    IncludeSoftDeleted?: boolean;
  }) => Promise<ApiV2010AccountRecording>;

  /**
   * Delete a recording from your account
   */
  deleteRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of recordings belonging to the account used to make the request
   */
  listRecording: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to read. */
    AccountSid: string;
    /** Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date. */
    DateCreated?: string;
    /** Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date. */
    "DateCreated<"?: string;
    /** Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date. */
    "DateCreated>"?: string;
    /** The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to read. */
    CallSid?: string;
    /** The Conference SID that identifies the conference associated with the recording to read. */
    ConferenceSid?: string;
    /** A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days. */
    IncludeSoftDeleted?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; recordings?: (ApiV2010AccountRecording)[] }>;

  /**
   * Fetch an instance of an AddOnResult
   */
  fetchRecordingAddOnResult: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource to fetch. */
    AccountSid: string;
    /** The SID of the recording to which the result to fetch belongs. */
    ReferenceSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording AddOnResult resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountRecordingRecordingAddOnResult>;

  /**
   * Delete a result and purge all associated Payloads
   */
  deleteRecordingAddOnResult: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resources to delete. */
    AccountSid: string;
    /** The SID of the recording to which the result to delete belongs. */
    ReferenceSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording AddOnResult resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of results belonging to the recording
   */
  listRecordingAddOnResult: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resources to read. */
    AccountSid: string;
    /** The SID of the recording to which the result to read belongs. */
    ReferenceSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; add_on_results?: (ApiV2010AccountRecordingRecordingAddOnResult)[] }>;

  /**
   * Fetch an instance of a result payload
   */
  fetchRecordingAddOnResultPayload: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource to fetch. */
    AccountSid: string;
    /** The SID of the recording to which the AddOnResult resource that contains the payload to fetch belongs. */
    ReferenceSid: string;
    /** The SID of the AddOnResult to which the payload to fetch belongs. */
    AddOnResultSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording AddOnResult Payload resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload>;

  /**
   * Delete a payload from the result along with all associated Data
   */
  deleteRecordingAddOnResultPayload: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resources to delete. */
    AccountSid: string;
    /** The SID of the recording to which the AddOnResult resource that contains the payloads to delete belongs. */
    ReferenceSid: string;
    /** The SID of the AddOnResult to which the payloads to delete belongs. */
    AddOnResultSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording AddOnResult Payload resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of payloads belonging to the AddOnResult
   */
  listRecordingAddOnResultPayload: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resources to read. */
    AccountSid: string;
    /** The SID of the recording to which the AddOnResult resource that contains the payloads to read belongs. */
    ReferenceSid: string;
    /** The SID of the AddOnResult to which the payloads to read belongs. */
    AddOnResultSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; payloads?: (ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayload)[] }>;

  /**
   * Fetch an instance of a result payload
   */
  fetchRecordingAddOnResultPayloadData: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource to fetch. */
    AccountSid: string;
    /** The SID of the recording to which the AddOnResult resource that contains the payload to fetch belongs. */
    ReferenceSid: string;
    /** The SID of the AddOnResult to which the payload to fetch belongs. */
    AddOnResultSid: string;
    /** The Twilio-provided string that uniquely identifies the Recording AddOnResult Payload resource to fetch. */
    PayloadSid: string;
  }) => Promise<ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadRecordingAddOnResultPayloadData>;

  fetchRecordingTranscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource to fetch. */
    AccountSid: string;
    /** The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) that created the transcription to fetch. */
    RecordingSid: string;
    /** The Twilio-provided string that uniquely identifies the Transcription resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountRecordingRecordingTranscription>;

  deleteRecordingTranscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to delete. */
    AccountSid: string;
    /** The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) that created the transcription to delete. */
    RecordingSid: string;
    /** The Twilio-provided string that uniquely identifies the Transcription resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  listRecordingTranscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to read. */
    AccountSid: string;
    /** The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) that created the transcriptions to read. */
    RecordingSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; transcriptions?: (ApiV2010AccountRecordingRecordingTranscription)[] }>;

  /**
   * Fetch an instance of a short code
   */
  fetchShortCode: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ShortCode resource(s) to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the ShortCode resource to fetch */
    Sid: string;
  }) => Promise<ApiV2010AccountShortCode>;

  /**
   * Update a short code with the following parameters
   */
  updateShortCode: (input: {
    /** A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the `FriendlyName` is the short code. */
    FriendlyName?: string;
    /** The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. */
    ApiVersion?: string;
    /** The URL we should call when receiving an incoming SMS message to this short code. */
    SmsUrl?: string;
    /** The HTTP method we should use when calling the `sms_url`. Can be: `GET` or `POST`. */
    SmsMethod?: "GET" | "POST";
    /** The URL that we should call if an error occurs while retrieving or executing the TwiML from `sms_url`. */
    SmsFallbackUrl?: string;
    /** The HTTP method that we should use to call the `sms_fallback_url`. Can be: `GET` or `POST`. */
    SmsFallbackMethod?: "GET" | "POST";
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ShortCode resource(s) to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the ShortCode resource to update */
    Sid: string;
  }) => Promise<ApiV2010AccountShortCode>;

  /**
   * Retrieve a list of short-codes belonging to the account used to make the request
   */
  listShortCode: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ShortCode resource(s) to read. */
    AccountSid: string;
    /** The string that identifies the ShortCode resources to read. */
    FriendlyName?: string;
    /** Only show the ShortCode resources that match this pattern. You can specify partial numbers and use '*' as a wildcard for any digit. */
    ShortCode?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; short_codes?: (ApiV2010AccountShortCode)[] }>;

  fetchSigningKey: (input: {
    AccountSid: string;
    Sid: string;
  }) => Promise<ApiV2010AccountSigningKey>;

  updateSigningKey: (input: {
    FriendlyName?: string;
    AccountSid: string;
    Sid: string;
  }) => Promise<ApiV2010AccountSigningKey>;

  deleteSigningKey: (input: {
    AccountSid: string;
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a new credential list mapping resource
   */
  createSipAuthCallsCredentialListMapping: (input: {
    /** The SID of the CredentialList resource to map to the SIP domain. */
    CredentialListSid: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the SIP domain that will contain the new resource. */
    DomainSid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping>;

  /**
   * Retrieve a list of credential list mappings belonging to the domain used in the request
   */
  listSipAuthCallsCredentialListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to read. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resources to read. */
    DomainSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; contents?: (ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping)[] }>;

  /**
   * Fetch a specific instance of a credential list mapping
   */
  fetchSipAuthCallsCredentialListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource to fetch. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resource to fetch. */
    DomainSid: string;
    /** The Twilio-provided string that uniquely identifies the CredentialListMapping resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMapping>;

  /**
   * Delete a credential list mapping from the requested domain
   */
  deleteSipAuthCallsCredentialListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to delete. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resource to delete. */
    DomainSid: string;
    /** The Twilio-provided string that uniquely identifies the CredentialListMapping resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a new IP Access Control List mapping
   */
  createSipAuthCallsIpAccessControlListMapping: (input: {
    /** The SID of the IpAccessControlList resource to map to the SIP domain. */
    IpAccessControlListSid: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the SIP domain that will contain the new resource. */
    DomainSid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping>;

  /**
   * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
   */
  listSipAuthCallsIpAccessControlListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resources to read. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resources to read. */
    DomainSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; contents?: (ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping)[] }>;

  /**
   * Fetch a specific instance of an IP Access Control List mapping
   */
  fetchSipAuthCallsIpAccessControlListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource to fetch. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resource to fetch. */
    DomainSid: string;
    /** The Twilio-provided string that uniquely identifies the IpAccessControlListMapping resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMapping>;

  /**
   * Delete an IP Access Control List mapping from the requested domain
   */
  deleteSipAuthCallsIpAccessControlListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resources to delete. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resources to delete. */
    DomainSid: string;
    /** The Twilio-provided string that uniquely identifies the IpAccessControlListMapping resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a new credential list mapping resource
   */
  createSipAuthRegistrationsCredentialListMapping: (input: {
    /** The SID of the CredentialList resource to map to the SIP domain. */
    CredentialListSid: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
    /** The SID of the SIP domain that will contain the new resource. */
    DomainSid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping>;

  /**
   * Retrieve a list of credential list mappings belonging to the domain used in the request
   */
  listSipAuthRegistrationsCredentialListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to read. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resources to read. */
    DomainSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; contents?: (ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping)[] }>;

  /**
   * Fetch a specific instance of a credential list mapping
   */
  fetchSipAuthRegistrationsCredentialListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource to fetch. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resource to fetch. */
    DomainSid: string;
    /** The Twilio-provided string that uniquely identifies the CredentialListMapping resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMapping>;

  /**
   * Delete a credential list mapping from the requested domain
   */
  deleteSipAuthRegistrationsCredentialListMapping: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to delete. */
    AccountSid: string;
    /** The SID of the SIP domain that contains the resources to delete. */
    DomainSid: string;
    /** The Twilio-provided string that uniquely identifies the CredentialListMapping resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of credentials.
   */
  listSipCredential: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The unique id that identifies the credential list that contains the desired credentials. */
    CredentialListSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; credentials?: (ApiV2010AccountSipSipCredentialListSipCredential)[] }>;

  /**
   * Create a new credential resource.
   */
  createSipCredential: (input: {
    /** The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long. */
    Username: string;
    /** The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`) */
    Password: string;
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The unique id that identifies the credential list to include the created credential. */
    CredentialListSid: string;
  }) => Promise<ApiV2010AccountSipSipCredentialListSipCredential>;

  /**
   * Fetch a single credential.
   */
  fetchSipCredential: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The unique id that identifies the credential list that contains the desired credential. */
    CredentialListSid: string;
    /** The unique id that identifies the resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipCredentialListSipCredential>;

  /**
   * Update a credential resource.
   */
  updateSipCredential: (input: {
    /** The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg `IWasAtSignal2018`) */
    Password?: string;
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The unique id that identifies the credential list that includes this credential. */
    CredentialListSid: string;
    /** The unique id that identifies the resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipCredentialListSipCredential>;

  /**
   * Delete a credential resource.
   */
  deleteSipCredential: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The unique id that identifies the credential list that contains the desired credentials. */
    CredentialListSid: string;
    /** The unique id that identifies the resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Get All Credential Lists
   */
  listSipCredentialList: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; credential_lists?: (ApiV2010AccountSipSipCredentialList)[] }>;

  /**
   * Create a Credential List
   */
  createSipCredentialList: (input: {
    /** A human readable descriptive text that describes the CredentialList, up to 64 characters long. */
    FriendlyName: string;
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountSipSipCredentialList>;

  /**
   * Get a Credential List
   */
  fetchSipCredentialList: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The credential list Sid that uniquely identifies this resource */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipCredentialList>;

  /**
   * Update a Credential List
   */
  updateSipCredentialList: (input: {
    /** A human readable descriptive text for a CredentialList, up to 64 characters long. */
    FriendlyName: string;
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The credential list Sid that uniquely identifies this resource */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipCredentialList>;

  /**
   * Delete a Credential List
   */
  deleteSipCredentialList: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** The credential list Sid that uniquely identifies this resource */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a CredentialListMapping resource for an account.
   */
  createSipCredentialListMapping: (input: {
    /** A 34 character string that uniquely identifies the CredentialList resource to map to the SIP domain. */
    CredentialListSid: string;
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP Domain for which the CredentialList resource will be mapped. */
    DomainSid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipCredentialListMapping>;

  /**
   * Read multiple CredentialListMapping resources from an account.
   */
  listSipCredentialListMapping: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP Domain that includes the resource to read. */
    DomainSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; credential_list_mappings?: (ApiV2010AccountSipSipDomainSipCredentialListMapping)[] }>;

  /**
   * Fetch a single CredentialListMapping resource from an account.
   */
  fetchSipCredentialListMapping: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP Domain that includes the resource to fetch. */
    DomainSid: string;
    /** A 34 character string that uniquely identifies the resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipCredentialListMapping>;

  /**
   * Delete a CredentialListMapping resource from an account.
   */
  deleteSipCredentialListMapping: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP Domain that includes the resource to delete. */
    DomainSid: string;
    /** A 34 character string that uniquely identifies the resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of domains belonging to the account used to make the request
   */
  listSipDomain: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resources to read. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; domains?: (ApiV2010AccountSipSipDomain)[] }>;

  /**
   * Create a new Domain
   */
  createSipDomain: (input: {
    /** The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`. */
    DomainName: string;
    /** A descriptive string that you created to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The URL we should when the domain receives a call. */
    VoiceUrl?: string;
    /** The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`. */
    VoiceMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while retrieving or executing the TwiML from `voice_url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call to pass status parameters (such as call ended) to your application. */
    VoiceStatusCallbackUrl?: string;
    /** The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`. */
    VoiceStatusCallbackMethod?: "GET" | "POST";
    /** Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not. */
    SipRegistration?: boolean;
    /** Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses. */
    EmergencyCallingEnabled?: boolean;
    /** Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain. */
    Secure?: boolean;
    /** The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with. */
    ByocTrunkSid?: string;
    /** Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call. */
    EmergencyCallerSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountSipSipDomain>;

  /**
   * Fetch an instance of a Domain
   */
  fetchSipDomain: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the SipDomain resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomain>;

  /**
   * Update the attributes of a domain
   */
  updateSipDomain: (input: {
    /** A descriptive string that you created to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`. */
    VoiceFallbackMethod?: "GET" | "POST";
    /** The URL that we should call when an error occurs while retrieving or executing the TwiML requested by `voice_url`. */
    VoiceFallbackUrl?: string;
    /** The HTTP method we should use to call `voice_url` */
    VoiceMethod?: "GET" | "POST";
    /** The HTTP method we should use to call `voice_status_callback_url`. Can be: `GET` or `POST`. */
    VoiceStatusCallbackMethod?: "GET" | "POST";
    /** The URL that we should call to pass status parameters (such as call ended) to your application. */
    VoiceStatusCallbackUrl?: string;
    /** The URL we should call when the domain receives a call. */
    VoiceUrl?: string;
    /** Whether to allow SIP Endpoints to register with the domain to receive calls. Can be `true` or `false`. `true` allows SIP Endpoints to register with the domain to receive calls, `false` does not. */
    SipRegistration?: boolean;
    /** The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with `sip.twilio.com`. */
    DomainName?: string;
    /** Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses. */
    EmergencyCallingEnabled?: boolean;
    /** Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain. */
    Secure?: boolean;
    /** The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with. */
    ByocTrunkSid?: string;
    /** Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call. */
    EmergencyCallerSid?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the SipDomain resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomain>;

  /**
   * Delete an instance of a Domain
   */
  deleteSipDomain: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the SipDomain resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
   */
  listSipIpAccessControlList: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; ip_access_control_lists?: (ApiV2010AccountSipSipIpAccessControlList)[] }>;

  /**
   * Create a new IpAccessControlList resource
   */
  createSipIpAccessControlList: (input: {
    /** A human readable descriptive text that describes the IpAccessControlList, up to 255 characters long. */
    FriendlyName: string;
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountSipSipIpAccessControlList>;

  /**
   * Fetch a specific instance of an IpAccessControlList
   */
  fetchSipIpAccessControlList: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipIpAccessControlList>;

  /**
   * Rename an IpAccessControlList
   */
  updateSipIpAccessControlList: (input: {
    /** A human readable descriptive text, up to 255 characters long. */
    FriendlyName: string;
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the resource to udpate. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipIpAccessControlList>;

  /**
   * Delete an IpAccessControlList from the requested account
   */
  deleteSipIpAccessControlList: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Fetch an IpAccessControlListMapping resource.
   */
  fetchSipIpAccessControlListMapping: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP domain. */
    DomainSid: string;
    /** A 34 character string that uniquely identifies the resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipIpAccessControlListMapping>;

  /**
   * Delete an IpAccessControlListMapping resource.
   */
  deleteSipIpAccessControlListMapping: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP domain. */
    DomainSid: string;
    /** A 34 character string that uniquely identifies the resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a new IpAccessControlListMapping resource.
   */
  createSipIpAccessControlListMapping: (input: {
    /** The unique id of the IP access control list to map to the SIP domain. */
    IpAccessControlListSid: string;
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP domain. */
    DomainSid: string;
  }) => Promise<ApiV2010AccountSipSipDomainSipIpAccessControlListMapping>;

  /**
   * Retrieve a list of IpAccessControlListMapping resources.
   */
  listSipIpAccessControlListMapping: (input: {
    /** The unique id of the Account that is responsible for this resource. */
    AccountSid: string;
    /** A 34 character string that uniquely identifies the SIP domain. */
    DomainSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; ip_access_control_list_mappings?: (ApiV2010AccountSipSipDomainSipIpAccessControlListMapping)[] }>;

  /**
   * Read multiple IpAddress resources.
   */
  listSipIpAddress: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** The IpAccessControlList Sid that identifies the IpAddress resources to read. */
    IpAccessControlListSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; ip_addresses?: (ApiV2010AccountSipSipIpAccessControlListSipIpAddress)[] }>;

  /**
   * Create a new IpAddress resource.
   */
  createSipIpAddress: (input: {
    /** A human readable descriptive text for this resource, up to 255 characters long. */
    FriendlyName: string;
    /** An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today. */
    IpAddress: string;
    /** An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used. */
    CidrPrefixLength?: number;
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** The IpAccessControlList Sid with which to associate the created IpAddress resource. */
    IpAccessControlListSid: string;
  }) => Promise<ApiV2010AccountSipSipIpAccessControlListSipIpAddress>;

  /**
   * Read one IpAddress resource.
   */
  fetchSipIpAddress: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** The IpAccessControlList Sid that identifies the IpAddress resources to fetch. */
    IpAccessControlListSid: string;
    /** A 34 character string that uniquely identifies the IpAddress resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipIpAccessControlListSipIpAddress>;

  /**
   * Update an IpAddress resource.
   */
  updateSipIpAddress: (input: {
    /** An IP address in dotted decimal notation from which you want to accept traffic. Any SIP requests from this IP address will be allowed by Twilio. IPv4 only supported today. */
    IpAddress?: string;
    /** A human readable descriptive text for this resource, up to 255 characters long. */
    FriendlyName?: string;
    /** An integer representing the length of the CIDR prefix to use with this IP address when accepting traffic. By default the entire IP address is used. */
    CidrPrefixLength?: number;
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** The IpAccessControlList Sid that identifies the IpAddress resources to update. */
    IpAccessControlListSid: string;
    /** A 34 character string that identifies the IpAddress resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountSipSipIpAccessControlListSipIpAddress>;

  /**
   * Delete an IpAddress resource.
   */
  deleteSipIpAddress: (input: {
    /** The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource. */
    AccountSid: string;
    /** The IpAccessControlList Sid that identifies the IpAddress resources to delete. */
    IpAccessControlListSid: string;
    /** A 34 character string that uniquely identifies the resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a Siprec
   */
  createSiprec: (input: {
    /** The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec. */
    Name?: string;
    /** Unique name used when configuring the connector via Marketplace Add-on. */
    ConnectorName?: string;
    Track?: SiprecEnumTrack;
    /** Absolute URL of the status callback. */
    StatusCallback?: string;
    /** The http method for the status_callback (one of GET, POST). */
    StatusCallbackMethod?: "GET" | "POST";
    /** Parameter name */
    "Parameter1.Name"?: string;
    /** Parameter value */
    "Parameter1.Value"?: string;
    /** Parameter name */
    "Parameter2.Name"?: string;
    /** Parameter value */
    "Parameter2.Value"?: string;
    /** Parameter name */
    "Parameter3.Name"?: string;
    /** Parameter value */
    "Parameter3.Value"?: string;
    /** Parameter name */
    "Parameter4.Name"?: string;
    /** Parameter value */
    "Parameter4.Value"?: string;
    /** Parameter name */
    "Parameter5.Name"?: string;
    /** Parameter value */
    "Parameter5.Value"?: string;
    /** Parameter name */
    "Parameter6.Name"?: string;
    /** Parameter value */
    "Parameter6.Value"?: string;
    /** Parameter name */
    "Parameter7.Name"?: string;
    /** Parameter value */
    "Parameter7.Value"?: string;
    /** Parameter name */
    "Parameter8.Name"?: string;
    /** Parameter value */
    "Parameter8.Value"?: string;
    /** Parameter name */
    "Parameter9.Name"?: string;
    /** Parameter value */
    "Parameter9.Value"?: string;
    /** Parameter name */
    "Parameter10.Name"?: string;
    /** Parameter value */
    "Parameter10.Value"?: string;
    /** Parameter name */
    "Parameter11.Name"?: string;
    /** Parameter value */
    "Parameter11.Value"?: string;
    /** Parameter name */
    "Parameter12.Name"?: string;
    /** Parameter value */
    "Parameter12.Value"?: string;
    /** Parameter name */
    "Parameter13.Name"?: string;
    /** Parameter value */
    "Parameter13.Value"?: string;
    /** Parameter name */
    "Parameter14.Name"?: string;
    /** Parameter value */
    "Parameter14.Value"?: string;
    /** Parameter name */
    "Parameter15.Name"?: string;
    /** Parameter value */
    "Parameter15.Value"?: string;
    /** Parameter name */
    "Parameter16.Name"?: string;
    /** Parameter value */
    "Parameter16.Value"?: string;
    /** Parameter name */
    "Parameter17.Name"?: string;
    /** Parameter value */
    "Parameter17.Value"?: string;
    /** Parameter name */
    "Parameter18.Name"?: string;
    /** Parameter value */
    "Parameter18.Value"?: string;
    /** Parameter name */
    "Parameter19.Name"?: string;
    /** Parameter value */
    "Parameter19.Value"?: string;
    /** Parameter name */
    "Parameter20.Name"?: string;
    /** Parameter value */
    "Parameter20.Value"?: string;
    /** Parameter name */
    "Parameter21.Name"?: string;
    /** Parameter value */
    "Parameter21.Value"?: string;
    /** Parameter name */
    "Parameter22.Name"?: string;
    /** Parameter value */
    "Parameter22.Value"?: string;
    /** Parameter name */
    "Parameter23.Name"?: string;
    /** Parameter value */
    "Parameter23.Value"?: string;
    /** Parameter name */
    "Parameter24.Name"?: string;
    /** Parameter value */
    "Parameter24.Value"?: string;
    /** Parameter name */
    "Parameter25.Name"?: string;
    /** Parameter value */
    "Parameter25.Value"?: string;
    /** Parameter name */
    "Parameter26.Name"?: string;
    /** Parameter value */
    "Parameter26.Value"?: string;
    /** Parameter name */
    "Parameter27.Name"?: string;
    /** Parameter value */
    "Parameter27.Value"?: string;
    /** Parameter name */
    "Parameter28.Name"?: string;
    /** Parameter value */
    "Parameter28.Value"?: string;
    /** Parameter name */
    "Parameter29.Name"?: string;
    /** Parameter value */
    "Parameter29.Value"?: string;
    /** Parameter name */
    "Parameter30.Name"?: string;
    /** Parameter value */
    "Parameter30.Value"?: string;
    /** Parameter name */
    "Parameter31.Name"?: string;
    /** Parameter value */
    "Parameter31.Value"?: string;
    /** Parameter name */
    "Parameter32.Name"?: string;
    /** Parameter value */
    "Parameter32.Value"?: string;
    /** Parameter name */
    "Parameter33.Name"?: string;
    /** Parameter value */
    "Parameter33.Value"?: string;
    /** Parameter name */
    "Parameter34.Name"?: string;
    /** Parameter value */
    "Parameter34.Value"?: string;
    /** Parameter name */
    "Parameter35.Name"?: string;
    /** Parameter value */
    "Parameter35.Value"?: string;
    /** Parameter name */
    "Parameter36.Name"?: string;
    /** Parameter value */
    "Parameter36.Value"?: string;
    /** Parameter name */
    "Parameter37.Name"?: string;
    /** Parameter value */
    "Parameter37.Value"?: string;
    /** Parameter name */
    "Parameter38.Name"?: string;
    /** Parameter value */
    "Parameter38.Value"?: string;
    /** Parameter name */
    "Parameter39.Name"?: string;
    /** Parameter value */
    "Parameter39.Value"?: string;
    /** Parameter name */
    "Parameter40.Name"?: string;
    /** Parameter value */
    "Parameter40.Value"?: string;
    /** Parameter name */
    "Parameter41.Name"?: string;
    /** Parameter value */
    "Parameter41.Value"?: string;
    /** Parameter name */
    "Parameter42.Name"?: string;
    /** Parameter value */
    "Parameter42.Value"?: string;
    /** Parameter name */
    "Parameter43.Name"?: string;
    /** Parameter value */
    "Parameter43.Value"?: string;
    /** Parameter name */
    "Parameter44.Name"?: string;
    /** Parameter value */
    "Parameter44.Value"?: string;
    /** Parameter name */
    "Parameter45.Name"?: string;
    /** Parameter value */
    "Parameter45.Value"?: string;
    /** Parameter name */
    "Parameter46.Name"?: string;
    /** Parameter value */
    "Parameter46.Value"?: string;
    /** Parameter name */
    "Parameter47.Name"?: string;
    /** Parameter value */
    "Parameter47.Value"?: string;
    /** Parameter name */
    "Parameter48.Name"?: string;
    /** Parameter value */
    "Parameter48.Value"?: string;
    /** Parameter name */
    "Parameter49.Name"?: string;
    /** Parameter value */
    "Parameter49.Value"?: string;
    /** Parameter name */
    "Parameter50.Name"?: string;
    /** Parameter value */
    "Parameter50.Value"?: string;
    /** Parameter name */
    "Parameter51.Name"?: string;
    /** Parameter value */
    "Parameter51.Value"?: string;
    /** Parameter name */
    "Parameter52.Name"?: string;
    /** Parameter value */
    "Parameter52.Value"?: string;
    /** Parameter name */
    "Parameter53.Name"?: string;
    /** Parameter value */
    "Parameter53.Value"?: string;
    /** Parameter name */
    "Parameter54.Name"?: string;
    /** Parameter value */
    "Parameter54.Value"?: string;
    /** Parameter name */
    "Parameter55.Name"?: string;
    /** Parameter value */
    "Parameter55.Value"?: string;
    /** Parameter name */
    "Parameter56.Name"?: string;
    /** Parameter value */
    "Parameter56.Value"?: string;
    /** Parameter name */
    "Parameter57.Name"?: string;
    /** Parameter value */
    "Parameter57.Value"?: string;
    /** Parameter name */
    "Parameter58.Name"?: string;
    /** Parameter value */
    "Parameter58.Value"?: string;
    /** Parameter name */
    "Parameter59.Name"?: string;
    /** Parameter value */
    "Parameter59.Value"?: string;
    /** Parameter name */
    "Parameter60.Name"?: string;
    /** Parameter value */
    "Parameter60.Value"?: string;
    /** Parameter name */
    "Parameter61.Name"?: string;
    /** Parameter value */
    "Parameter61.Value"?: string;
    /** Parameter name */
    "Parameter62.Name"?: string;
    /** Parameter value */
    "Parameter62.Value"?: string;
    /** Parameter name */
    "Parameter63.Name"?: string;
    /** Parameter value */
    "Parameter63.Value"?: string;
    /** Parameter name */
    "Parameter64.Name"?: string;
    /** Parameter value */
    "Parameter64.Value"?: string;
    /** Parameter name */
    "Parameter65.Name"?: string;
    /** Parameter value */
    "Parameter65.Value"?: string;
    /** Parameter name */
    "Parameter66.Name"?: string;
    /** Parameter value */
    "Parameter66.Value"?: string;
    /** Parameter name */
    "Parameter67.Name"?: string;
    /** Parameter value */
    "Parameter67.Value"?: string;
    /** Parameter name */
    "Parameter68.Name"?: string;
    /** Parameter value */
    "Parameter68.Value"?: string;
    /** Parameter name */
    "Parameter69.Name"?: string;
    /** Parameter value */
    "Parameter69.Value"?: string;
    /** Parameter name */
    "Parameter70.Name"?: string;
    /** Parameter value */
    "Parameter70.Value"?: string;
    /** Parameter name */
    "Parameter71.Name"?: string;
    /** Parameter value */
    "Parameter71.Value"?: string;
    /** Parameter name */
    "Parameter72.Name"?: string;
    /** Parameter value */
    "Parameter72.Value"?: string;
    /** Parameter name */
    "Parameter73.Name"?: string;
    /** Parameter value */
    "Parameter73.Value"?: string;
    /** Parameter name */
    "Parameter74.Name"?: string;
    /** Parameter value */
    "Parameter74.Value"?: string;
    /** Parameter name */
    "Parameter75.Name"?: string;
    /** Parameter value */
    "Parameter75.Value"?: string;
    /** Parameter name */
    "Parameter76.Name"?: string;
    /** Parameter value */
    "Parameter76.Value"?: string;
    /** Parameter name */
    "Parameter77.Name"?: string;
    /** Parameter value */
    "Parameter77.Value"?: string;
    /** Parameter name */
    "Parameter78.Name"?: string;
    /** Parameter value */
    "Parameter78.Value"?: string;
    /** Parameter name */
    "Parameter79.Name"?: string;
    /** Parameter value */
    "Parameter79.Value"?: string;
    /** Parameter name */
    "Parameter80.Name"?: string;
    /** Parameter value */
    "Parameter80.Value"?: string;
    /** Parameter name */
    "Parameter81.Name"?: string;
    /** Parameter value */
    "Parameter81.Value"?: string;
    /** Parameter name */
    "Parameter82.Name"?: string;
    /** Parameter value */
    "Parameter82.Value"?: string;
    /** Parameter name */
    "Parameter83.Name"?: string;
    /** Parameter value */
    "Parameter83.Value"?: string;
    /** Parameter name */
    "Parameter84.Name"?: string;
    /** Parameter value */
    "Parameter84.Value"?: string;
    /** Parameter name */
    "Parameter85.Name"?: string;
    /** Parameter value */
    "Parameter85.Value"?: string;
    /** Parameter name */
    "Parameter86.Name"?: string;
    /** Parameter value */
    "Parameter86.Value"?: string;
    /** Parameter name */
    "Parameter87.Name"?: string;
    /** Parameter value */
    "Parameter87.Value"?: string;
    /** Parameter name */
    "Parameter88.Name"?: string;
    /** Parameter value */
    "Parameter88.Value"?: string;
    /** Parameter name */
    "Parameter89.Name"?: string;
    /** Parameter value */
    "Parameter89.Value"?: string;
    /** Parameter name */
    "Parameter90.Name"?: string;
    /** Parameter value */
    "Parameter90.Value"?: string;
    /** Parameter name */
    "Parameter91.Name"?: string;
    /** Parameter value */
    "Parameter91.Value"?: string;
    /** Parameter name */
    "Parameter92.Name"?: string;
    /** Parameter value */
    "Parameter92.Value"?: string;
    /** Parameter name */
    "Parameter93.Name"?: string;
    /** Parameter value */
    "Parameter93.Value"?: string;
    /** Parameter name */
    "Parameter94.Name"?: string;
    /** Parameter value */
    "Parameter94.Value"?: string;
    /** Parameter name */
    "Parameter95.Name"?: string;
    /** Parameter value */
    "Parameter95.Value"?: string;
    /** Parameter name */
    "Parameter96.Name"?: string;
    /** Parameter value */
    "Parameter96.Value"?: string;
    /** Parameter name */
    "Parameter97.Name"?: string;
    /** Parameter value */
    "Parameter97.Value"?: string;
    /** Parameter name */
    "Parameter98.Name"?: string;
    /** Parameter value */
    "Parameter98.Value"?: string;
    /** Parameter name */
    "Parameter99.Name"?: string;
    /** Parameter value */
    "Parameter99.Value"?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallSiprec>;

  /**
   * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
   */
  updateSiprec: (input: {
    Status: SiprecEnumUpdateStatus;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with. */
    CallSid: string;
    /** The SID of the Siprec resource, or the `name` used when creating the resource */
    Sid: string;
  }) => Promise<ApiV2010AccountCallSiprec>;

  /**
   * Create a Stream
   */
  createStream: (input: {
    /** Relative or absolute URL where WebSocket connection will be established. */
    Url: string;
    /** The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream. */
    Name?: string;
    Track?: StreamEnumTrack;
    /** Absolute URL to which Twilio sends status callback HTTP requests. */
    StatusCallback?: string;
    /** The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`. */
    StatusCallbackMethod?: "GET" | "POST";
    /** Parameter name */
    "Parameter1.Name"?: string;
    /** Parameter value */
    "Parameter1.Value"?: string;
    /** Parameter name */
    "Parameter2.Name"?: string;
    /** Parameter value */
    "Parameter2.Value"?: string;
    /** Parameter name */
    "Parameter3.Name"?: string;
    /** Parameter value */
    "Parameter3.Value"?: string;
    /** Parameter name */
    "Parameter4.Name"?: string;
    /** Parameter value */
    "Parameter4.Value"?: string;
    /** Parameter name */
    "Parameter5.Name"?: string;
    /** Parameter value */
    "Parameter5.Value"?: string;
    /** Parameter name */
    "Parameter6.Name"?: string;
    /** Parameter value */
    "Parameter6.Value"?: string;
    /** Parameter name */
    "Parameter7.Name"?: string;
    /** Parameter value */
    "Parameter7.Value"?: string;
    /** Parameter name */
    "Parameter8.Name"?: string;
    /** Parameter value */
    "Parameter8.Value"?: string;
    /** Parameter name */
    "Parameter9.Name"?: string;
    /** Parameter value */
    "Parameter9.Value"?: string;
    /** Parameter name */
    "Parameter10.Name"?: string;
    /** Parameter value */
    "Parameter10.Value"?: string;
    /** Parameter name */
    "Parameter11.Name"?: string;
    /** Parameter value */
    "Parameter11.Value"?: string;
    /** Parameter name */
    "Parameter12.Name"?: string;
    /** Parameter value */
    "Parameter12.Value"?: string;
    /** Parameter name */
    "Parameter13.Name"?: string;
    /** Parameter value */
    "Parameter13.Value"?: string;
    /** Parameter name */
    "Parameter14.Name"?: string;
    /** Parameter value */
    "Parameter14.Value"?: string;
    /** Parameter name */
    "Parameter15.Name"?: string;
    /** Parameter value */
    "Parameter15.Value"?: string;
    /** Parameter name */
    "Parameter16.Name"?: string;
    /** Parameter value */
    "Parameter16.Value"?: string;
    /** Parameter name */
    "Parameter17.Name"?: string;
    /** Parameter value */
    "Parameter17.Value"?: string;
    /** Parameter name */
    "Parameter18.Name"?: string;
    /** Parameter value */
    "Parameter18.Value"?: string;
    /** Parameter name */
    "Parameter19.Name"?: string;
    /** Parameter value */
    "Parameter19.Value"?: string;
    /** Parameter name */
    "Parameter20.Name"?: string;
    /** Parameter value */
    "Parameter20.Value"?: string;
    /** Parameter name */
    "Parameter21.Name"?: string;
    /** Parameter value */
    "Parameter21.Value"?: string;
    /** Parameter name */
    "Parameter22.Name"?: string;
    /** Parameter value */
    "Parameter22.Value"?: string;
    /** Parameter name */
    "Parameter23.Name"?: string;
    /** Parameter value */
    "Parameter23.Value"?: string;
    /** Parameter name */
    "Parameter24.Name"?: string;
    /** Parameter value */
    "Parameter24.Value"?: string;
    /** Parameter name */
    "Parameter25.Name"?: string;
    /** Parameter value */
    "Parameter25.Value"?: string;
    /** Parameter name */
    "Parameter26.Name"?: string;
    /** Parameter value */
    "Parameter26.Value"?: string;
    /** Parameter name */
    "Parameter27.Name"?: string;
    /** Parameter value */
    "Parameter27.Value"?: string;
    /** Parameter name */
    "Parameter28.Name"?: string;
    /** Parameter value */
    "Parameter28.Value"?: string;
    /** Parameter name */
    "Parameter29.Name"?: string;
    /** Parameter value */
    "Parameter29.Value"?: string;
    /** Parameter name */
    "Parameter30.Name"?: string;
    /** Parameter value */
    "Parameter30.Value"?: string;
    /** Parameter name */
    "Parameter31.Name"?: string;
    /** Parameter value */
    "Parameter31.Value"?: string;
    /** Parameter name */
    "Parameter32.Name"?: string;
    /** Parameter value */
    "Parameter32.Value"?: string;
    /** Parameter name */
    "Parameter33.Name"?: string;
    /** Parameter value */
    "Parameter33.Value"?: string;
    /** Parameter name */
    "Parameter34.Name"?: string;
    /** Parameter value */
    "Parameter34.Value"?: string;
    /** Parameter name */
    "Parameter35.Name"?: string;
    /** Parameter value */
    "Parameter35.Value"?: string;
    /** Parameter name */
    "Parameter36.Name"?: string;
    /** Parameter value */
    "Parameter36.Value"?: string;
    /** Parameter name */
    "Parameter37.Name"?: string;
    /** Parameter value */
    "Parameter37.Value"?: string;
    /** Parameter name */
    "Parameter38.Name"?: string;
    /** Parameter value */
    "Parameter38.Value"?: string;
    /** Parameter name */
    "Parameter39.Name"?: string;
    /** Parameter value */
    "Parameter39.Value"?: string;
    /** Parameter name */
    "Parameter40.Name"?: string;
    /** Parameter value */
    "Parameter40.Value"?: string;
    /** Parameter name */
    "Parameter41.Name"?: string;
    /** Parameter value */
    "Parameter41.Value"?: string;
    /** Parameter name */
    "Parameter42.Name"?: string;
    /** Parameter value */
    "Parameter42.Value"?: string;
    /** Parameter name */
    "Parameter43.Name"?: string;
    /** Parameter value */
    "Parameter43.Value"?: string;
    /** Parameter name */
    "Parameter44.Name"?: string;
    /** Parameter value */
    "Parameter44.Value"?: string;
    /** Parameter name */
    "Parameter45.Name"?: string;
    /** Parameter value */
    "Parameter45.Value"?: string;
    /** Parameter name */
    "Parameter46.Name"?: string;
    /** Parameter value */
    "Parameter46.Value"?: string;
    /** Parameter name */
    "Parameter47.Name"?: string;
    /** Parameter value */
    "Parameter47.Value"?: string;
    /** Parameter name */
    "Parameter48.Name"?: string;
    /** Parameter value */
    "Parameter48.Value"?: string;
    /** Parameter name */
    "Parameter49.Name"?: string;
    /** Parameter value */
    "Parameter49.Value"?: string;
    /** Parameter name */
    "Parameter50.Name"?: string;
    /** Parameter value */
    "Parameter50.Value"?: string;
    /** Parameter name */
    "Parameter51.Name"?: string;
    /** Parameter value */
    "Parameter51.Value"?: string;
    /** Parameter name */
    "Parameter52.Name"?: string;
    /** Parameter value */
    "Parameter52.Value"?: string;
    /** Parameter name */
    "Parameter53.Name"?: string;
    /** Parameter value */
    "Parameter53.Value"?: string;
    /** Parameter name */
    "Parameter54.Name"?: string;
    /** Parameter value */
    "Parameter54.Value"?: string;
    /** Parameter name */
    "Parameter55.Name"?: string;
    /** Parameter value */
    "Parameter55.Value"?: string;
    /** Parameter name */
    "Parameter56.Name"?: string;
    /** Parameter value */
    "Parameter56.Value"?: string;
    /** Parameter name */
    "Parameter57.Name"?: string;
    /** Parameter value */
    "Parameter57.Value"?: string;
    /** Parameter name */
    "Parameter58.Name"?: string;
    /** Parameter value */
    "Parameter58.Value"?: string;
    /** Parameter name */
    "Parameter59.Name"?: string;
    /** Parameter value */
    "Parameter59.Value"?: string;
    /** Parameter name */
    "Parameter60.Name"?: string;
    /** Parameter value */
    "Parameter60.Value"?: string;
    /** Parameter name */
    "Parameter61.Name"?: string;
    /** Parameter value */
    "Parameter61.Value"?: string;
    /** Parameter name */
    "Parameter62.Name"?: string;
    /** Parameter value */
    "Parameter62.Value"?: string;
    /** Parameter name */
    "Parameter63.Name"?: string;
    /** Parameter value */
    "Parameter63.Value"?: string;
    /** Parameter name */
    "Parameter64.Name"?: string;
    /** Parameter value */
    "Parameter64.Value"?: string;
    /** Parameter name */
    "Parameter65.Name"?: string;
    /** Parameter value */
    "Parameter65.Value"?: string;
    /** Parameter name */
    "Parameter66.Name"?: string;
    /** Parameter value */
    "Parameter66.Value"?: string;
    /** Parameter name */
    "Parameter67.Name"?: string;
    /** Parameter value */
    "Parameter67.Value"?: string;
    /** Parameter name */
    "Parameter68.Name"?: string;
    /** Parameter value */
    "Parameter68.Value"?: string;
    /** Parameter name */
    "Parameter69.Name"?: string;
    /** Parameter value */
    "Parameter69.Value"?: string;
    /** Parameter name */
    "Parameter70.Name"?: string;
    /** Parameter value */
    "Parameter70.Value"?: string;
    /** Parameter name */
    "Parameter71.Name"?: string;
    /** Parameter value */
    "Parameter71.Value"?: string;
    /** Parameter name */
    "Parameter72.Name"?: string;
    /** Parameter value */
    "Parameter72.Value"?: string;
    /** Parameter name */
    "Parameter73.Name"?: string;
    /** Parameter value */
    "Parameter73.Value"?: string;
    /** Parameter name */
    "Parameter74.Name"?: string;
    /** Parameter value */
    "Parameter74.Value"?: string;
    /** Parameter name */
    "Parameter75.Name"?: string;
    /** Parameter value */
    "Parameter75.Value"?: string;
    /** Parameter name */
    "Parameter76.Name"?: string;
    /** Parameter value */
    "Parameter76.Value"?: string;
    /** Parameter name */
    "Parameter77.Name"?: string;
    /** Parameter value */
    "Parameter77.Value"?: string;
    /** Parameter name */
    "Parameter78.Name"?: string;
    /** Parameter value */
    "Parameter78.Value"?: string;
    /** Parameter name */
    "Parameter79.Name"?: string;
    /** Parameter value */
    "Parameter79.Value"?: string;
    /** Parameter name */
    "Parameter80.Name"?: string;
    /** Parameter value */
    "Parameter80.Value"?: string;
    /** Parameter name */
    "Parameter81.Name"?: string;
    /** Parameter value */
    "Parameter81.Value"?: string;
    /** Parameter name */
    "Parameter82.Name"?: string;
    /** Parameter value */
    "Parameter82.Value"?: string;
    /** Parameter name */
    "Parameter83.Name"?: string;
    /** Parameter value */
    "Parameter83.Value"?: string;
    /** Parameter name */
    "Parameter84.Name"?: string;
    /** Parameter value */
    "Parameter84.Value"?: string;
    /** Parameter name */
    "Parameter85.Name"?: string;
    /** Parameter value */
    "Parameter85.Value"?: string;
    /** Parameter name */
    "Parameter86.Name"?: string;
    /** Parameter value */
    "Parameter86.Value"?: string;
    /** Parameter name */
    "Parameter87.Name"?: string;
    /** Parameter value */
    "Parameter87.Value"?: string;
    /** Parameter name */
    "Parameter88.Name"?: string;
    /** Parameter value */
    "Parameter88.Value"?: string;
    /** Parameter name */
    "Parameter89.Name"?: string;
    /** Parameter value */
    "Parameter89.Value"?: string;
    /** Parameter name */
    "Parameter90.Name"?: string;
    /** Parameter value */
    "Parameter90.Value"?: string;
    /** Parameter name */
    "Parameter91.Name"?: string;
    /** Parameter value */
    "Parameter91.Value"?: string;
    /** Parameter name */
    "Parameter92.Name"?: string;
    /** Parameter value */
    "Parameter92.Value"?: string;
    /** Parameter name */
    "Parameter93.Name"?: string;
    /** Parameter value */
    "Parameter93.Value"?: string;
    /** Parameter name */
    "Parameter94.Name"?: string;
    /** Parameter value */
    "Parameter94.Value"?: string;
    /** Parameter name */
    "Parameter95.Name"?: string;
    /** Parameter value */
    "Parameter95.Value"?: string;
    /** Parameter name */
    "Parameter96.Name"?: string;
    /** Parameter value */
    "Parameter96.Value"?: string;
    /** Parameter name */
    "Parameter97.Name"?: string;
    /** Parameter value */
    "Parameter97.Value"?: string;
    /** Parameter name */
    "Parameter98.Name"?: string;
    /** Parameter value */
    "Parameter98.Value"?: string;
    /** Parameter name */
    "Parameter99.Name"?: string;
    /** Parameter value */
    "Parameter99.Value"?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallStream>;

  /**
   * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
   */
  updateStream: (input: {
    Status: StreamEnumUpdateStatus;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with. */
    CallSid: string;
    /** The SID or the `name` of the Stream resource to be stopped */
    Sid: string;
  }) => Promise<ApiV2010AccountCallStream>;

  /**
   * Create a new token for ICE servers
   */
  createToken: (input: {
    /** The duration in seconds for which the generated credentials are valid. The default value is 86400 (24 hours). */
    Ttl?: number;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountToken>;

  /**
   * Fetch an instance of a Transcription
   */
  fetchTranscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Transcription resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountTranscription>;

  /**
   * Delete a transcription from the account used to make the request
   */
  deleteTranscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the Transcription resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Retrieve a list of transcriptions belonging to the account used to make the request
   */
  listTranscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to read. */
    AccountSid: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; transcriptions?: (ApiV2010AccountTranscription)[] }>;

  /**
   * Retrieve a list of usage-records belonging to the account used to make the request
   */
  listUsageRecord: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecord)[] }>;

  listUsageRecordAllTime: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordAllTime)[] }>;

  listUsageRecordDaily: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordDaily)[] }>;

  listUsageRecordLastMonth: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordLastMonth)[] }>;

  listUsageRecordMonthly: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordMonthly)[] }>;

  listUsageRecordThisMonth: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordThisMonth)[] }>;

  listUsageRecordToday: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordToday)[] }>;

  listUsageRecordYearly: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordYearly)[] }>;

  listUsageRecordYesterday: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read. */
    AccountSid: string;
    /** The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved. */
    Category?: string;
    /** Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date. */
    StartDate?: string;
    /** Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date. */
    EndDate?: string;
    /** Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account. */
    IncludeSubaccounts?: boolean;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_records?: (ApiV2010AccountUsageUsageRecordUsageRecordYesterday)[] }>;

  /**
   * Fetch and instance of a usage-trigger
   */
  fetchUsageTrigger: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resource to fetch. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the UsageTrigger resource to fetch. */
    Sid: string;
  }) => Promise<ApiV2010AccountUsageUsageTrigger>;

  /**
   * Update an instance of a usage trigger
   */
  updateUsageTrigger: (input: {
    /** The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`. */
    CallbackMethod?: "GET" | "POST";
    /** The URL we should call using `callback_method` when the trigger fires. */
    CallbackUrl?: string;
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to update. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the UsageTrigger resource to update. */
    Sid: string;
  }) => Promise<ApiV2010AccountUsageUsageTrigger>;

  deleteUsageTrigger: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to delete. */
    AccountSid: string;
    /** The Twilio-provided string that uniquely identifies the UsageTrigger resource to delete. */
    Sid: string;
  }) => Promise<unknown>;

  /**
   * Create a new UsageTrigger
   */
  createUsageTrigger: (input: {
    /** The URL we should call using `callback_method` when the trigger fires. */
    CallbackUrl: string;
    /** The usage value at which the trigger should fire.  For convenience, you can use an offset value such as `+30` to specify a trigger_value that is 30 units more than the current usage value. Be sure to urlencode a `+` as `%2B`. */
    TriggerValue: string;
    /** The usage category that the trigger should watch.  Use one of the supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) for this value. */
    UsageCategory: string;
    /** The HTTP method we should use to call `callback_url`. Can be: `GET` or `POST` and the default is `POST`. */
    CallbackMethod?: "GET" | "POST";
    /** A descriptive string that you create to describe the resource. It can be up to 64 characters long. */
    FriendlyName?: string;
    Recurring?: UsageTriggerEnumRecurring;
    TriggerBy?: UsageTriggerEnumTriggerField;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource. */
    AccountSid: string;
  }) => Promise<ApiV2010AccountUsageUsageTrigger>;

  /**
   * Retrieve a list of usage-triggers belonging to the account used to make the request
   */
  listUsageTrigger: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to read. */
    AccountSid: string;
    Recurring?: UsageTriggerEnumRecurring;
    TriggerBy?: UsageTriggerEnumTriggerField;
    /** The usage category of the UsageTriggers to read. Must be a supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories). */
    UsageCategory?: string;
    /** How many resources to return in each list page. The default is 50, and the maximum is 1000. */
    PageSize?: number;
    /** The page index. This value is simply for client state. */
    Page?: number;
    /** The page token. This is provided by the API. */
    PageToken?: string;
  }) => Promise<{ end?: number; first_page_uri?: string; next_page_uri?: string | null; page?: number; page_size?: number; previous_page_uri?: string | null; start?: number; uri?: string; usage_triggers?: (ApiV2010AccountUsageUsageTrigger)[] }>;

  /**
   * Create a new User Defined Message for the given Call SID.
   */
  createUserDefinedMessage: (input: {
    /** The User Defined Message in the form of URL-encoded JSON string. */
    Content: string;
    /** A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated. */
    IdempotencyKey?: string;
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallUserDefinedMessage>;

  /**
   * Subscribe to User Defined Messages for a given Call SID.
   */
  createUserDefinedMessageSubscription: (input: {
    /** The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted). */
    Callback: string;
    /** A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated. */
    IdempotencyKey?: string;
    /** The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`. */
    Method?: "GET" | "POST";
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Messages subscription is associated with. This refers to the Call SID that is producing the user defined messages. */
    CallSid: string;
  }) => Promise<ApiV2010AccountCallUserDefinedMessageSubscription>;

  /**
   * Delete a specific User Defined Message Subscription.
   */
  deleteUserDefinedMessageSubscription: (input: {
    /** The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages. */
    AccountSid: string;
    /** The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages. */
    CallSid: string;
    /** The SID that uniquely identifies this User Defined Message Subscription. */
    Sid: string;
  }) => Promise<unknown>;
};

export * from "./schemas.js";
