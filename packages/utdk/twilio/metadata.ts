import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "CreateAccount": {
    "accessPath": [
      "createAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Twilio Subaccount from the account making the request"
  },
  "ListAccount": {
    "accessPath": [
      "listAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "FriendlyName",
      "Status",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieves a collection of Accounts belonging to the account used to make the request",
    "parameterDescriptions": {
      "FriendlyName": "Only return the Account resources with friendly names that exactly match this name.",
      "Status": "Only return Account resources with the given status. Can be `closed`, `suspended` or `active`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchAccount": {
    "accessPath": [
      "fetchAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch the account specified by the provided Account Sid",
    "parameterDescriptions": {
      "Sid": "The Account Sid that uniquely identifies the account to fetch"
    }
  },
  "UpdateAccount": {
    "accessPath": [
      "updateAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "Status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Modify the properties of a given Account",
    "parameterDescriptions": {
      "Sid": "The Account Sid that uniquely identifies the account to update"
    }
  },
  "CreateAddress": {
    "accessPath": [
      "createAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "CustomerName",
      "Street",
      "City",
      "Region",
      "PostalCode",
      "IsoCountry",
      "FriendlyName",
      "EmergencyEnabled",
      "AutoCorrectAddress",
      "StreetSecondary"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Addresses.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Address resource."
    }
  },
  "ListAddress": {
    "accessPath": [
      "listAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Addresses.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "CustomerName",
      "FriendlyName",
      "EmergencyEnabled",
      "IsoCountry",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to read.",
      "CustomerName": "The `customer_name` of the Address resources to read.",
      "FriendlyName": "The string that identifies the Address resources to read.",
      "EmergencyEnabled": "Whether the address can be associated to a number for emergency calling.",
      "IsoCountry": "The ISO country code of the Address resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "DeleteAddress": {
    "accessPath": [
      "deleteAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Address resource to delete."
    }
  },
  "FetchAddress": {
    "accessPath": [
      "fetchAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Address resource to fetch."
    }
  },
  "UpdateAddress": {
    "accessPath": [
      "updateAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "CustomerName",
      "Street",
      "City",
      "Region",
      "PostalCode",
      "EmergencyEnabled",
      "AutoCorrectAddress",
      "StreetSecondary"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is responsible for the Address resource to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Address resource to update."
    }
  },
  "CreateApplication": {
    "accessPath": [
      "createApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ApiVersion",
      "VoiceUrl",
      "VoiceMethod",
      "VoiceFallbackUrl",
      "VoiceFallbackMethod",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceCallerIdLookup",
      "SmsUrl",
      "SmsMethod",
      "SmsFallbackUrl",
      "SmsFallbackMethod",
      "SmsStatusCallback",
      "MessageStatusCallback",
      "FriendlyName",
      "PublicApplicationConnectEnabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Applications.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new application within your account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "ListApplication": {
    "accessPath": [
      "listApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Applications.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "FriendlyName",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of applications representing an application within the requesting account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to read.",
      "FriendlyName": "The string that identifies the Application resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "DeleteApplication": {
    "accessPath": [
      "deleteApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the application by the specified application sid",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Application resource to delete."
    }
  },
  "FetchApplication": {
    "accessPath": [
      "fetchApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch the application specified by the provided sid",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Application resource to fetch."
    }
  },
  "UpdateApplication": {
    "accessPath": [
      "updateApplication"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "ApiVersion",
      "VoiceUrl",
      "VoiceMethod",
      "VoiceFallbackUrl",
      "VoiceFallbackMethod",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceCallerIdLookup",
      "SmsUrl",
      "SmsMethod",
      "SmsFallbackUrl",
      "SmsFallbackMethod",
      "SmsStatusCallback",
      "MessageStatusCallback",
      "PublicApplicationConnectEnabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates the application's properties",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Application resource to update."
    }
  },
  "FetchAuthorizedConnectApp": {
    "accessPath": [
      "fetchAuthorizedConnectApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConnectAppSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of an authorized-connect-app",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resource to fetch.",
      "ConnectAppSid": "The SID of the Connect App to fetch."
    }
  },
  "ListAuthorizedConnectApp": {
    "accessPath": [
      "listAuthorizedConnectApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of authorized-connect-apps belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the AuthorizedConnectApp resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberCountry": {
    "accessPath": [
      "listAvailablePhoneNumberCountry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the available phone number Country resources.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchAvailablePhoneNumberCountry": {
    "accessPath": [
      "fetchAvailablePhoneNumberCountry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the available phone number Country resource.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country to fetch available phone number information about."
    }
  },
  "ListAvailablePhoneNumberLocal": {
    "accessPath": [
      "listAvailablePhoneNumberLocal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberMachineToMachine": {
    "accessPath": [
      "listAvailablePhoneNumberMachineToMachine"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberMobile": {
    "accessPath": [
      "listAvailablePhoneNumberMobile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberNational": {
    "accessPath": [
      "listAvailablePhoneNumberNational"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberSharedCost": {
    "accessPath": [
      "listAvailablePhoneNumberSharedCost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberTollFree": {
    "accessPath": [
      "listAvailablePhoneNumberTollFree"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListAvailablePhoneNumberVoip": {
    "accessPath": [
      "listAvailablePhoneNumberVoip"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CountryCode"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "AreaCode",
      "Contains",
      "SmsEnabled",
      "MmsEnabled",
      "VoiceEnabled",
      "ExcludeAllAddressRequired",
      "ExcludeLocalAddressRequired",
      "ExcludeForeignAddressRequired",
      "Beta",
      "NearNumber",
      "NearLatLong",
      "Distance",
      "InPostalCode",
      "InRegion",
      "InRateCenter",
      "InLata",
      "InLocality",
      "FaxEnabled",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) requesting the AvailablePhoneNumber resources.",
      "CountryCode": "The [ISO-3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the country from which to read phone numbers.",
      "AreaCode": "The area code of the phone numbers to read. Applies to only phone numbers in the US and Canada.",
      "Contains": "Matching pattern to identify phone numbers. This pattern can be between 2 and 16 characters long and allows all digits (0-9) and all non-diacritic latin alphabet letters (a-z, A-Z). It accepts four meta-characters: `*`, `%`, `+`, `$`. The `*` and `%` meta-characters can appear multiple times in the pattern. To match wildcards at the beginning or end of the pattern, use `*` to match any single character or `%` to match a sequence of characters. If you use the wildcard patterns, it must include at least two non-meta-characters, and wildcards cannot be used between non-meta-characters. To match the beginning of a pattern, start the pattern with `+`. To match the end of the pattern, append the pattern with `$`. These meta-characters can't be adjacent to each other.",
      "SmsEnabled": "Whether the phone numbers can receive text messages. Can be: `true` or `false`.",
      "MmsEnabled": "Whether the phone numbers can receive MMS messages. Can be: `true` or `false`.",
      "VoiceEnabled": "Whether the phone numbers can receive calls. Can be: `true` or `false`.",
      "ExcludeAllAddressRequired": "Whether to exclude phone numbers that require an [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeLocalAddressRequired": "Whether to exclude phone numbers that require a local [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "ExcludeForeignAddressRequired": "Whether to exclude phone numbers that require a foreign [Address](https://www.twilio.com/docs/usage/api/address). Can be: `true` or `false` and the default is `false`.",
      "Beta": "Whether to read phone numbers that are new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "NearNumber": "Given a phone number, find a geographically close number within `distance` miles. Distance defaults to 25 miles. Applies to only phone numbers in the US and Canada.",
      "NearLatLong": "Given a latitude/longitude pair `lat,long` find geographically close numbers within `distance` miles. Applies to only phone numbers in the US and Canada.",
      "Distance": "The search radius, in miles, for a `near_` query.  Can be up to `500` and the default is `25`. Applies to only phone numbers in the US and Canada.",
      "InPostalCode": "Limit results to a particular postal code. Given a phone number, search within the same postal code as that number. Applies to only phone numbers in the US and Canada.",
      "InRegion": "Limit results to a particular region, state, or province. Given a phone number, search within the same region as that number. Applies to only phone numbers in the US and Canada.",
      "InRateCenter": "Limit results to a specific rate center, or given a phone number search within the same rate center as that number. Requires `in_lata` to be set as well. Applies to only phone numbers in the US and Canada.",
      "InLata": "Limit results to a specific local access and transport area ([LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area)). Given a phone number, search within the same [LATA](https://en.wikipedia.org/wiki/Local_access_and_transport_area) as that number. Applies to only phone numbers in the US and Canada.",
      "InLocality": "Limit results to a particular locality or city. Given a phone number, search within the same Locality as that number.",
      "FaxEnabled": "Whether the phone numbers can receive faxes. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchBalance": {
    "accessPath": [
      "fetchBalance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Balance.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information",
    "parameterDescriptions": {
      "AccountSid": "The unique SID identifier of the Account."
    }
  },
  "CreateCall": {
    "accessPath": [
      "createCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "To",
      "From",
      "Method",
      "FallbackUrl",
      "FallbackMethod",
      "StatusCallback",
      "StatusCallbackEvent",
      "StatusCallbackMethod",
      "SendDigits",
      "Timeout",
      "Record",
      "RecordingChannels",
      "RecordingStatusCallback",
      "RecordingStatusCallbackMethod",
      "RecordingConfigurationId",
      "SipAuthUsername",
      "SipAuthPassword",
      "MachineDetection",
      "MachineDetectionTimeout",
      "RecordingStatusCallbackEvent",
      "Trim",
      "CallerId",
      "MachineDetectionSpeechThreshold",
      "MachineDetectionSpeechEndThreshold",
      "MachineDetectionSilenceTimeout",
      "AsyncAmd",
      "AsyncAmdStatusCallback",
      "AsyncAmdStatusCallbackMethod",
      "Byoc",
      "CallReason",
      "CallToken",
      "RecordingTrack",
      "TimeLimit",
      "ClientNotificationUrl",
      "Url",
      "Twiml",
      "ApplicationSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "ListCall": {
    "accessPath": [
      "listCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "To",
      "From",
      "ParentCallSid",
      "Status",
      "StartTime",
      "StartTime<",
      "StartTime>",
      "EndTime",
      "EndTime<",
      "EndTime>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieves a collection of calls made to and from your account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to read.",
      "To": "Only show calls made to this phone number, SIP address, Client identifier or SIM SID.",
      "From": "Only include calls from this phone number, SIP address, Client identifier or SIM SID.",
      "ParentCallSid": "Only include calls spawned by calls with this SID.",
      "Status": "The status of the calls to include. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy`, or `no-answer`.",
      "StartTime": "Only include calls that started on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that started on this date.",
      "StartTime<": "Only include calls that started before this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that started before this date.",
      "StartTime>": "Only include calls that started on or after this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that started on or after this date.",
      "EndTime": "Only include calls that ended on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that ended on this date.",
      "EndTime<": "Only include calls that ended before this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that ended before this date.",
      "EndTime>": "Only include calls that ended on or after this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only calls that ended on or after this date.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "DeleteCall": {
    "accessPath": [
      "deleteCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to delete.",
      "Sid": "The Twilio-provided Call SID that uniquely identifies the Call resource to delete"
    }
  },
  "FetchCall": {
    "accessPath": [
      "fetchCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch the call specified by the provided Call SID",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to fetch.",
      "Sid": "The SID of the Call resource to fetch."
    }
  },
  "UpdateCall": {
    "accessPath": [
      "updateCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Url",
      "Method",
      "Status",
      "FallbackUrl",
      "FallbackMethod",
      "StatusCallback",
      "StatusCallbackMethod",
      "Twiml",
      "TimeLimit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Initiates a call redirect or terminates a call",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call resource(s) to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Call resource to update"
    }
  },
  "ListCallEvent": {
    "accessPath": [
      "listCallEvent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of all events for a call.",
    "parameterDescriptions": {
      "AccountSid": "The unique SID identifier of the Account.",
      "CallSid": "The unique SID identifier of the Call.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchCallNotification": {
    "accessPath": [
      "fetchCallNotification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resource to fetch.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the Call Notification resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Call Notification resource to fetch."
    }
  },
  "ListCallNotification": {
    "accessPath": [
      "listCallNotification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Log",
      "MessageDate",
      "MessageDate<",
      "MessageDate>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Call Notification resources to read.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the Call Notification resources to read.",
      "Log": "Only read notifications of the specified log level. Can be:  `0` to read only ERROR notifications or `1` to read only WARNING notifications. By default, all notifications are read.",
      "MessageDate": "Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date.",
      "MessageDate<": "Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date.",
      "MessageDate>": "Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateCallRecording": {
    "accessPath": [
      "createCallRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "RecordingStatusCallbackEvent",
      "RecordingStatusCallback",
      "RecordingStatusCallbackMethod",
      "Trim",
      "RecordingChannels",
      "RecordingTrack",
      "RecordingConfigurationId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a recording for the call",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) to associate the resource with."
    }
  },
  "ListCallRecording": {
    "accessPath": [
      "listCallRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "DateCreated",
      "DateCreated<",
      "DateCreated>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of recordings belonging to the call used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to read.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to read.",
      "DateCreated": "The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date.",
      "DateCreated<": "The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date.",
      "DateCreated>": "The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "UpdateCallRecording": {
    "accessPath": [
      "updateCallRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Status",
      "PauseBehavior"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to update.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording resource to update."
    }
  },
  "FetchCallRecording": {
    "accessPath": [
      "fetchCallRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a recording for a call",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to fetch.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording resource to fetch."
    }
  },
  "DeleteCallRecording": {
    "accessPath": [
      "deleteCallRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a recording from your account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to delete.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording resource to delete."
    }
  },
  "FetchConference": {
    "accessPath": [
      "fetchConference"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a conference",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Conference resource to fetch"
    }
  },
  "UpdateConference": {
    "accessPath": [
      "updateConference"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Status",
      "AnnounceUrl",
      "AnnounceMethod"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Conference resource to update"
    }
  },
  "ListConference": {
    "accessPath": [
      "listConference"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "DateCreated",
      "DateCreated<",
      "DateCreated>",
      "DateUpdated",
      "DateUpdated<",
      "DateUpdated>",
      "FriendlyName",
      "Status",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of conferences belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to read.",
      "DateCreated": "Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date.",
      "DateCreated<": "Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date.",
      "DateCreated>": "Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date.",
      "DateUpdated": "Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date.",
      "DateUpdated<": "Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date.",
      "DateUpdated>": "Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date.",
      "FriendlyName": "The string that identifies the Conference resources to read.",
      "Status": "The status of the resources to read. Can be: `init`, `in-progress`, or `completed`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListConferenceRecording": {
    "accessPath": [
      "listConferenceRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "DateCreated",
      "DateCreated<",
      "DateCreated>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of recordings belonging to the call used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resources to read.",
      "ConferenceSid": "The Conference SID that identifies the conference associated with the recording to read.",
      "DateCreated": "The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date.",
      "DateCreated<": "The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date.",
      "DateCreated>": "The `date_created` value, specified as `YYYY-MM-DD`, of the resources to read. You can also specify inequality: `DateCreated<=YYYY-MM-DD` will return recordings generated at or before midnight on a given date, and `DateCreated>=YYYY-MM-DD` returns recordings generated at or after midnight on a date.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "UpdateConferenceRecording": {
    "accessPath": [
      "updateConferenceRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Status",
      "PauseBehavior"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource to update.",
      "ConferenceSid": "The Conference SID that identifies the conference associated with the recording to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Conference Recording resource to update. Use `Twilio.CURRENT` to reference the current active recording."
    }
  },
  "FetchConferenceRecording": {
    "accessPath": [
      "fetchConferenceRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a recording for a call",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resource to fetch.",
      "ConferenceSid": "The Conference SID that identifies the conference associated with the recording to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Conference Recording resource to fetch."
    }
  },
  "DeleteConferenceRecording": {
    "accessPath": [
      "deleteConferenceRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a recording from your account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference Recording resources to delete.",
      "ConferenceSid": "The Conference SID that identifies the conference associated with the recording to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Conference Recording resource to delete."
    }
  },
  "FetchConnectApp": {
    "accessPath": [
      "fetchConnectApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a connect-app",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the ConnectApp resource to fetch."
    }
  },
  "UpdateConnectApp": {
    "accessPath": [
      "updateConnectApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "AuthorizeRedirectUrl",
      "CompanyName",
      "DeauthorizeCallbackMethod",
      "DeauthorizeCallbackUrl",
      "Description",
      "FriendlyName",
      "HomepageUrl",
      "Permissions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a connect-app with the specified parameters",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resources to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the ConnectApp resource to update."
    }
  },
  "DeleteConnectApp": {
    "accessPath": [
      "deleteConnectApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an instance of a connect-app",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the ConnectApp resource to fetch."
    }
  },
  "ListConnectApp": {
    "accessPath": [
      "listConnectApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/ConnectApps.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of connect-apps belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ConnectApp resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListDependentPhoneNumber": {
    "accessPath": [
      "listDependentPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "AddressSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the DependentPhoneNumber resources to read.",
      "AddressSid": "The SID of the Address resource associated with the phone number.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "UpdateIncomingPhoneNumber": {
    "accessPath": [
      "updateIncomingPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "AccountSid",
      "ApiVersion",
      "FriendlyName",
      "SmsApplicationSid",
      "SmsFallbackMethod",
      "SmsFallbackUrl",
      "SmsMethod",
      "SmsUrl",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceApplicationSid",
      "VoiceCallerIdLookup",
      "VoiceFallbackMethod",
      "VoiceFallbackUrl",
      "VoiceMethod",
      "VoiceUrl",
      "EmergencyStatus",
      "EmergencyAddressSid",
      "TrunkSid",
      "VoiceReceiveMode",
      "IdentitySid",
      "AddressSid",
      "BundleSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json",
    "pathConflictKeys": [
      "AccountSid"
    ],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an incoming-phone-number instance.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to update.  For more information, see [Exchanging Numbers Between Subaccounts](https://www.twilio.com/docs/iam/api/subaccounts#exchanging-numbers).",
      "Sid": "The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to update."
    }
  },
  "FetchIncomingPhoneNumber": {
    "accessPath": [
      "fetchIncomingPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an incoming-phone-number belonging to the account used to make the request.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to fetch."
    }
  },
  "DeleteIncomingPhoneNumber": {
    "accessPath": [
      "deleteIncomingPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a phone-numbers belonging to the account used to make the request.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to delete."
    }
  },
  "ListIncomingPhoneNumber": {
    "accessPath": [
      "listIncomingPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Beta",
      "FriendlyName",
      "PhoneNumber",
      "Origin",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IncomingPhoneNumber resources to read.",
      "Beta": "Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "FriendlyName": "A string that identifies the IncomingPhoneNumber resources to read.",
      "PhoneNumber": "The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit.",
      "Origin": "Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateIncomingPhoneNumber": {
    "accessPath": [
      "createIncomingPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "ApiVersion",
      "FriendlyName",
      "SmsApplicationSid",
      "SmsFallbackMethod",
      "SmsFallbackUrl",
      "SmsMethod",
      "SmsUrl",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceApplicationSid",
      "VoiceCallerIdLookup",
      "VoiceFallbackMethod",
      "VoiceFallbackUrl",
      "VoiceMethod",
      "VoiceUrl",
      "EmergencyStatus",
      "EmergencyAddressSid",
      "TrunkSid",
      "IdentitySid",
      "AddressSid",
      "VoiceReceiveMode",
      "BundleSid",
      "PhoneNumber",
      "AreaCode"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Purchase a phone-number for the account.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "FetchIncomingPhoneNumberAssignedAddOn": {
    "accessPath": [
      "fetchIncomingPhoneNumberAssignedAddOn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ResourceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of an Add-on installation currently assigned to this Number.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource to fetch.",
      "ResourceSid": "The SID of the Phone Number to which the Add-on is assigned.",
      "Sid": "The Twilio-provided string that uniquely identifies the resource to fetch."
    }
  },
  "DeleteIncomingPhoneNumberAssignedAddOn": {
    "accessPath": [
      "deleteIncomingPhoneNumberAssignedAddOn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ResourceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove the assignment of an Add-on installation from the Number specified.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to delete.",
      "ResourceSid": "The SID of the Phone Number to which the Add-on is assigned.",
      "Sid": "The Twilio-provided string that uniquely identifies the resource to delete."
    }
  },
  "ListIncomingPhoneNumberAssignedAddOn": {
    "accessPath": [
      "listIncomingPhoneNumberAssignedAddOn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ResourceSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of Add-on installations currently assigned to this Number.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read.",
      "ResourceSid": "The SID of the Phone Number to which the Add-on is assigned.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateIncomingPhoneNumberAssignedAddOn": {
    "accessPath": [
      "createIncomingPhoneNumberAssignedAddOn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "InstalledAddOnSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ResourceSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign an Add-on installation to the Number specified.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "ResourceSid": "The SID of the Phone Number to assign the Add-on."
    }
  },
  "FetchIncomingPhoneNumberAssignedAddOnExtension": {
    "accessPath": [
      "fetchIncomingPhoneNumberAssignedAddOnExtension"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ResourceSid",
      "AssignedAddOnSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of an Extension for the Assigned Add-on.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resource to fetch.",
      "ResourceSid": "The SID of the Phone Number to which the Add-on is assigned.",
      "AssignedAddOnSid": "The SID that uniquely identifies the assigned Add-on installation.",
      "Sid": "The Twilio-provided string that uniquely identifies the resource to fetch."
    }
  },
  "ListIncomingPhoneNumberAssignedAddOnExtension": {
    "accessPath": [
      "listIncomingPhoneNumberAssignedAddOnExtension"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ResourceSid",
      "AssignedAddOnSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of Extensions for the Assigned Add-on.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read.",
      "ResourceSid": "The SID of the Phone Number to which the Add-on is assigned.",
      "AssignedAddOnSid": "The SID that uniquely identifies the assigned Add-on installation.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListIncomingPhoneNumberLocal": {
    "accessPath": [
      "listIncomingPhoneNumberLocal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Beta",
      "FriendlyName",
      "PhoneNumber",
      "Origin",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read.",
      "Beta": "Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "FriendlyName": "A string that identifies the resources to read.",
      "PhoneNumber": "The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit.",
      "Origin": "Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateIncomingPhoneNumberLocal": {
    "accessPath": [
      "createIncomingPhoneNumberLocal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "PhoneNumber",
      "ApiVersion",
      "FriendlyName",
      "SmsApplicationSid",
      "SmsFallbackMethod",
      "SmsFallbackUrl",
      "SmsMethod",
      "SmsUrl",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceApplicationSid",
      "VoiceCallerIdLookup",
      "VoiceFallbackMethod",
      "VoiceFallbackUrl",
      "VoiceMethod",
      "VoiceUrl",
      "IdentitySid",
      "AddressSid",
      "EmergencyStatus",
      "EmergencyAddressSid",
      "TrunkSid",
      "VoiceReceiveMode",
      "BundleSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "ListIncomingPhoneNumberMobile": {
    "accessPath": [
      "listIncomingPhoneNumberMobile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Beta",
      "FriendlyName",
      "PhoneNumber",
      "Origin",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read.",
      "Beta": "Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "FriendlyName": "A string that identifies the resources to read.",
      "PhoneNumber": "The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit.",
      "Origin": "Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateIncomingPhoneNumberMobile": {
    "accessPath": [
      "createIncomingPhoneNumberMobile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "PhoneNumber",
      "ApiVersion",
      "FriendlyName",
      "SmsApplicationSid",
      "SmsFallbackMethod",
      "SmsFallbackUrl",
      "SmsMethod",
      "SmsUrl",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceApplicationSid",
      "VoiceCallerIdLookup",
      "VoiceFallbackMethod",
      "VoiceFallbackUrl",
      "VoiceMethod",
      "VoiceUrl",
      "IdentitySid",
      "AddressSid",
      "EmergencyStatus",
      "EmergencyAddressSid",
      "TrunkSid",
      "VoiceReceiveMode",
      "BundleSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "ListIncomingPhoneNumberTollFree": {
    "accessPath": [
      "listIncomingPhoneNumberTollFree"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Beta",
      "FriendlyName",
      "PhoneNumber",
      "Origin",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the resources to read.",
      "Beta": "Whether to include phone numbers new to the Twilio platform. Can be: `true` or `false` and the default is `true`.",
      "FriendlyName": "A string that identifies the resources to read.",
      "PhoneNumber": "The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit.",
      "Origin": "Whether to include phone numbers based on their origin. Can be: `twilio` or `hosted`. By default, phone numbers of all origin are included.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateIncomingPhoneNumberTollFree": {
    "accessPath": [
      "createIncomingPhoneNumberTollFree"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "PhoneNumber",
      "ApiVersion",
      "FriendlyName",
      "SmsApplicationSid",
      "SmsFallbackMethod",
      "SmsFallbackUrl",
      "SmsMethod",
      "SmsUrl",
      "StatusCallback",
      "StatusCallbackMethod",
      "VoiceApplicationSid",
      "VoiceCallerIdLookup",
      "VoiceFallbackMethod",
      "VoiceFallbackUrl",
      "VoiceMethod",
      "VoiceUrl",
      "IdentitySid",
      "AddressSid",
      "EmergencyStatus",
      "EmergencyAddressSid",
      "TrunkSid",
      "VoiceReceiveMode",
      "BundleSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "FetchKey": {
    "accessPath": [
      "fetchKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Key resource to fetch."
    }
  },
  "UpdateKey": {
    "accessPath": [
      "updateKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Key resource to update."
    }
  },
  "DeleteKey": {
    "accessPath": [
      "deleteKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Key resource to delete."
    }
  },
  "ListKey": {
    "accessPath": [
      "listKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Keys.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Key resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateNewKey": {
    "accessPath": [
      "createNewKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Keys.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Key resource."
    }
  },
  "DeleteMedia": {
    "accessPath": [
      "deleteMedia"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "MessageSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the Media resource.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is associated with the Media resource.",
      "MessageSid": "The SID of the Message resource that is associated with the Media resource.",
      "Sid": "The unique identifier of the to-be-deleted Media resource."
    }
  },
  "FetchMedia": {
    "accessPath": [
      "fetchMedia"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "MessageSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a single Media resource associated with a specific Message resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Media resource.",
      "MessageSid": "The SID of the Message resource that is associated with the Media resource.",
      "Sid": "The Twilio-provided string that uniquely identifies the Media resource to fetch."
    }
  },
  "ListMedia": {
    "accessPath": [
      "listMedia"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "MessageSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "DateCreated",
      "DateCreated<",
      "DateCreated>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Read a list of Media resources associated with a specific Message resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that is associated with the Media resources.",
      "MessageSid": "The SID of the Message resource that is associated with the Media resources.",
      "DateCreated": "Only include Media resources that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read Media that were created on this date. You can also specify an inequality, such as `StartTime<=YYYY-MM-DD`, to read Media that were created on or before midnight of this date, and `StartTime>=YYYY-MM-DD` to read Media that were created on or after midnight of this date.",
      "DateCreated<": "Only include Media resources that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read Media that were created on this date. You can also specify an inequality, such as `StartTime<=YYYY-MM-DD`, to read Media that were created on or before midnight of this date, and `StartTime>=YYYY-MM-DD` to read Media that were created on or after midnight of this date.",
      "DateCreated>": "Only include Media resources that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read Media that were created on this date. You can also specify an inequality, such as `StartTime<=YYYY-MM-DD`, to read Media that were created on or before midnight of this date, and `StartTime>=YYYY-MM-DD` to read Media that were created on or after midnight of this date.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchMember": {
    "accessPath": [
      "fetchMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "QueueSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a specific member from the queue",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Member resource(s) to fetch.",
      "QueueSid": "The SID of the Queue in which to find the members to fetch.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource(s) to fetch."
    }
  },
  "UpdateMember": {
    "accessPath": [
      "updateMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Url",
      "Method"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "QueueSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Member resource(s) to update.",
      "QueueSid": "The SID of the Queue in which to find the members to update.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource(s) to update."
    }
  },
  "ListMember": {
    "accessPath": [
      "listMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "QueueSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve the members of the queue",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Member resource(s) to read.",
      "QueueSid": "The SID of the Queue in which to find the members",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateMessage": {
    "accessPath": [
      "createMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "To",
      "StatusCallback",
      "ApplicationSid",
      "MaxPrice",
      "ProvideFeedback",
      "Attempt",
      "ValidityPeriod",
      "ForceDelivery",
      "ContentRetention",
      "AddressRetention",
      "SmartEncoded",
      "PersistentAction",
      "TrafficType",
      "ShortenUrls",
      "ScheduleType",
      "SendAt",
      "SendAsMms",
      "ContentVariables",
      "RiskCheck",
      "From",
      "FallbackFrom",
      "MessagingServiceSid",
      "Body",
      "MediaUrl",
      "ContentSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send a message",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) creating the Message resource."
    }
  },
  "ListMessage": {
    "accessPath": [
      "listMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "To",
      "From",
      "DateSent",
      "DateSent<",
      "DateSent>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of Message resources associated with a Twilio Account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resources.",
      "To": "Filter by recipient. For example: Set this parameter to `+15558881111` to retrieve a list of Message resources sent to `+15558881111`.",
      "From": "Filter by sender. For example: Set this parameter to `+15552229999` to retrieve a list of Message resources sent by `+15552229999`.",
      "DateSent": "Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date).",
      "DateSent<": "Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date).",
      "DateSent>": "Filter by Message `sent_date`. Accepts GMT dates in the following formats: `YYYY-MM-DD` (to find Messages with a specific `sent_date`), `<=YYYY-MM-DD` (to find Messages with `sent_date`s on and before a specific date), and `>=YYYY-MM-DD` (to find Messages with `sent_dates` on and after a specific date).",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "DeleteMessage": {
    "accessPath": [
      "deleteMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a Message resource from your account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource",
      "Sid": "The SID of the Message resource you wish to delete"
    }
  },
  "FetchMessage": {
    "accessPath": [
      "fetchMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a specific Message",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource",
      "Sid": "The SID of the Message resource to be fetched"
    }
  },
  "UpdateMessage": {
    "accessPath": [
      "updateMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Body",
      "Status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Message resources to update.",
      "Sid": "The SID of the Message resource to be updated"
    }
  },
  "CreateMessageFeedback": {
    "accessPath": [
      "createMessageFeedback"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Outcome"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "MessageSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource for which to create MessageFeedback.",
      "MessageSid": "The SID of the Message resource for which to create MessageFeedback."
    }
  },
  "CreateNewSigningKey": {
    "accessPath": [
      "createNewSigningKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SigningKeys.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Signing Key for the account making the request.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will be responsible for the new Key resource."
    }
  },
  "ListSigningKey": {
    "accessPath": [
      "listSigningKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SigningKeys.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchNotification": {
    "accessPath": [
      "fetchNotification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a notification belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Notification resource to fetch."
    }
  },
  "ListNotification": {
    "accessPath": [
      "listNotification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Notifications.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Log",
      "MessageDate",
      "MessageDate<",
      "MessageDate>",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of notifications belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Notification resources to read.",
      "Log": "Only read notifications of the specified log level. Can be:  `0` to read only ERROR notifications or `1` to read only WARNING notifications. By default, all notifications are read.",
      "MessageDate": "Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date.",
      "MessageDate<": "Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date.",
      "MessageDate>": "Only show notifications for the specified date, formatted as `YYYY-MM-DD`. You can also specify an inequality, such as `<=YYYY-MM-DD` for messages logged at or before midnight on a date, or `>=YYYY-MM-DD` for messages logged at or after midnight on a date.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchOutgoingCallerId": {
    "accessPath": [
      "fetchOutgoingCallerId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an outgoing-caller-id belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the OutgoingCallerId resource to fetch."
    }
  },
  "UpdateOutgoingCallerId": {
    "accessPath": [
      "updateOutgoingCallerId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates the caller-id",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resources to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the OutgoingCallerId resource to update."
    }
  },
  "DeleteOutgoingCallerId": {
    "accessPath": [
      "deleteOutgoingCallerId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete the caller-id specified from the account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the OutgoingCallerId resource to delete."
    }
  },
  "ListOutgoingCallerId": {
    "accessPath": [
      "listOutgoingCallerId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PhoneNumber",
      "FriendlyName",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of outgoing-caller-ids belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the OutgoingCallerId resources to read.",
      "PhoneNumber": "The phone number of the OutgoingCallerId resources to read.",
      "FriendlyName": "The string that identifies the OutgoingCallerId resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateValidationRequest": {
    "accessPath": [
      "createValidationRequest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "PhoneNumber",
      "FriendlyName",
      "CallDelay",
      "Extension",
      "StatusCallback",
      "StatusCallbackMethod"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for the new caller ID resource."
    }
  },
  "FetchParticipant": {
    "accessPath": [
      "fetchParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a participant",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource to fetch.",
      "ConferenceSid": "The SID of the conference with the participant to fetch.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to fetch. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20."
    }
  },
  "UpdateParticipant": {
    "accessPath": [
      "updateParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Muted",
      "Hold",
      "HoldUrl",
      "HoldMethod",
      "AnnounceUrl",
      "AnnounceMethod",
      "WaitUrl",
      "WaitMethod",
      "BeepOnExit",
      "EndConferenceOnExit",
      "Coaching",
      "CallSidToCoach"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the properties of the participant",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to update.",
      "ConferenceSid": "The SID of the conference with the participant to update.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to update. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20."
    }
  },
  "DeleteParticipant": {
    "accessPath": [
      "deleteParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Kick a participant from a given conference",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to delete.",
      "ConferenceSid": "The SID of the conference with the participants to delete.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID or label of the participant to delete. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20."
    }
  },
  "CreateParticipant": {
    "accessPath": [
      "createParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "From",
      "To",
      "StatusCallback",
      "StatusCallbackMethod",
      "StatusCallbackEvent",
      "Label",
      "Timeout",
      "Record",
      "Muted",
      "Beep",
      "StartConferenceOnEnter",
      "EndConferenceOnExit",
      "WaitUrl",
      "WaitMethod",
      "EarlyMedia",
      "MaxParticipants",
      "ConferenceRecord",
      "ConferenceTrim",
      "ConferenceStatusCallback",
      "ConferenceStatusCallbackMethod",
      "ConferenceStatusCallbackEvent",
      "RecordingChannels",
      "RecordingStatusCallback",
      "RecordingStatusCallbackMethod",
      "SipAuthUsername",
      "SipAuthPassword",
      "Region",
      "ConferenceRecordingStatusCallback",
      "ConferenceRecordingStatusCallbackMethod",
      "RecordingStatusCallbackEvent",
      "ConferenceRecordingStatusCallbackEvent",
      "Coaching",
      "CallSidToCoach",
      "JitterBufferSize",
      "Byoc",
      "CallerId",
      "CallReason",
      "RecordingTrack",
      "RecordingConfigurationId",
      "TimeLimit",
      "MachineDetection",
      "MachineDetectionTimeout",
      "MachineDetectionSpeechThreshold",
      "MachineDetectionSpeechEndThreshold",
      "MachineDetectionSilenceTimeout",
      "AmdStatusCallback",
      "AmdStatusCallbackMethod",
      "Trim",
      "CallToken",
      "ClientNotificationUrl",
      "CallerDisplayName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "ConferenceSid": "The SID of the participant's conference."
    }
  },
  "ListParticipant": {
    "accessPath": [
      "listParticipant"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ConferenceSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Muted",
      "Hold",
      "Coaching",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of participants belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resources to read.",
      "ConferenceSid": "The SID of the conference with the participants to read.",
      "Muted": "Whether to return only participants that are muted. Can be: `true` or `false`.",
      "Hold": "Whether to return only participants that are on hold. Can be: `true` or `false`.",
      "Coaching": "Whether to return only participants who are coaching another call. Can be: `true` or `false`.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreatePayments": {
    "accessPath": [
      "createPayments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "IdempotencyKey",
      "StatusCallback",
      "BankAccountType",
      "ChargeAmount",
      "Currency",
      "Description",
      "Input",
      "MinPostalCodeLength",
      "Parameter",
      "PaymentConnector",
      "PaymentMethod",
      "PostalCode",
      "SecurityCode",
      "Timeout",
      "TokenType",
      "ValidCardTypes",
      "RequireMatchingInputs",
      "Confirmation"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "create an instance of payments. This will start a new payments session",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "CallSid": "The SID of the call that will create the resource. Call leg associated with this sid is expected to provide payment information thru DTMF."
    }
  },
  "UpdatePayments": {
    "accessPath": [
      "updatePayments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "IdempotencyKey",
      "StatusCallback",
      "Capture",
      "Status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "update an instance of payments with different phases of payment flows.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will update the resource.",
      "CallSid": "The SID of the call that will update the resource. This should be the same call sid that was used to create payments resource.",
      "Sid": "The SID of Payments session that needs to be updated."
    }
  },
  "FetchQueue": {
    "accessPath": [
      "fetchQueue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a queue identified by the QueueSid",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Queue resource to fetch"
    }
  },
  "UpdateQueue": {
    "accessPath": [
      "updateQueue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "MaxSize"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the queue with the new parameters",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resource to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the Queue resource to update"
    }
  },
  "DeleteQueue": {
    "accessPath": [
      "deleteQueue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove an empty queue",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resource to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Queue resource to delete"
    }
  },
  "ListQueue": {
    "accessPath": [
      "listQueue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of queues belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Queue resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateQueue": {
    "accessPath": [
      "createQueue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "MaxSize"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Queues.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a queue",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "CreateRealtimeTranscription": {
    "accessPath": [
      "createRealtimeTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Name",
      "Track",
      "StatusCallbackUrl",
      "StatusCallbackMethod",
      "InboundTrackLabel",
      "OutboundTrackLabel",
      "PartialResults",
      "LanguageCode",
      "TranscriptionEngine",
      "ProfanityFilter",
      "SpeechModel",
      "Hints",
      "EnableAutomaticPunctuation",
      "IntelligenceService",
      "ConversationConfiguration",
      "ConversationId",
      "TranscriptionConfigurationId",
      "EnableProviderData"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Transcription",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with."
    }
  },
  "UpdateRealtimeTranscription": {
    "accessPath": [
      "updateRealtimeTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.",
      "Sid": "The SID of the Transcription resource, or the `name` used when creating the resource"
    }
  },
  "FetchRecording": {
    "accessPath": [
      "fetchRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "IncludeSoftDeleted"
    ],
    "description": "Fetch an instance of a recording",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording resource to fetch.",
      "IncludeSoftDeleted": "A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days."
    }
  },
  "DeleteRecording": {
    "accessPath": [
      "deleteRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a recording from your account",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording resource to delete."
    }
  },
  "ListRecording": {
    "accessPath": [
      "listRecording"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "DateCreated",
      "DateCreated<",
      "DateCreated>",
      "CallSid",
      "ConferenceSid",
      "IncludeSoftDeleted",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of recordings belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to read.",
      "DateCreated": "Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date.",
      "DateCreated<": "Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date.",
      "DateCreated>": "Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date.",
      "CallSid": "The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to read.",
      "ConferenceSid": "The Conference SID that identifies the conference associated with the recording to read.",
      "IncludeSoftDeleted": "A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchRecordingAddOnResult": {
    "accessPath": [
      "fetchRecordingAddOnResult"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of an AddOnResult",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resource to fetch.",
      "ReferenceSid": "The SID of the recording to which the result to fetch belongs.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording AddOnResult resource to fetch."
    }
  },
  "DeleteRecordingAddOnResult": {
    "accessPath": [
      "deleteRecordingAddOnResult"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a result and purge all associated Payloads",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resources to delete.",
      "ReferenceSid": "The SID of the recording to which the result to delete belongs.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording AddOnResult resource to delete."
    }
  },
  "ListRecordingAddOnResult": {
    "accessPath": [
      "listRecordingAddOnResult"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of results belonging to the recording",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult resources to read.",
      "ReferenceSid": "The SID of the recording to which the result to read belongs.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchRecordingAddOnResultPayload": {
    "accessPath": [
      "fetchRecordingAddOnResultPayload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid",
      "AddOnResultSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a result payload",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource to fetch.",
      "ReferenceSid": "The SID of the recording to which the AddOnResult resource that contains the payload to fetch belongs.",
      "AddOnResultSid": "The SID of the AddOnResult to which the payload to fetch belongs.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording AddOnResult Payload resource to fetch."
    }
  },
  "DeleteRecordingAddOnResultPayload": {
    "accessPath": [
      "deleteRecordingAddOnResultPayload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid",
      "AddOnResultSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a payload from the result along with all associated Data",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resources to delete.",
      "ReferenceSid": "The SID of the recording to which the AddOnResult resource that contains the payloads to delete belongs.",
      "AddOnResultSid": "The SID of the AddOnResult to which the payloads to delete belongs.",
      "Sid": "The Twilio-provided string that uniquely identifies the Recording AddOnResult Payload resource to delete."
    }
  },
  "ListRecordingAddOnResultPayload": {
    "accessPath": [
      "listRecordingAddOnResultPayload"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid",
      "AddOnResultSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of payloads belonging to the AddOnResult",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resources to read.",
      "ReferenceSid": "The SID of the recording to which the AddOnResult resource that contains the payloads to read belongs.",
      "AddOnResultSid": "The SID of the AddOnResult to which the payloads to read belongs.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchRecordingAddOnResultPayloadData": {
    "accessPath": [
      "fetchRecordingAddOnResultPayloadData"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "ReferenceSid",
      "AddOnResultSid",
      "PayloadSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a result payload",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording AddOnResult Payload resource to fetch.",
      "ReferenceSid": "The SID of the recording to which the AddOnResult resource that contains the payload to fetch belongs.",
      "AddOnResultSid": "The SID of the AddOnResult to which the payload to fetch belongs.",
      "PayloadSid": "The Twilio-provided string that uniquely identifies the Recording AddOnResult Payload resource to fetch."
    }
  },
  "FetchRecordingTranscription": {
    "accessPath": [
      "fetchRecordingTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "RecordingSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource to fetch.",
      "RecordingSid": "The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) that created the transcription to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Transcription resource to fetch."
    }
  },
  "DeleteRecordingTranscription": {
    "accessPath": [
      "deleteRecordingTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "RecordingSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to delete.",
      "RecordingSid": "The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) that created the transcription to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Transcription resource to delete."
    }
  },
  "ListRecordingTranscription": {
    "accessPath": [
      "listRecordingTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "RecordingSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to read.",
      "RecordingSid": "The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) that created the transcriptions to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchShortCode": {
    "accessPath": [
      "fetchShortCode"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a short code",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ShortCode resource(s) to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the ShortCode resource to fetch"
    }
  },
  "UpdateShortCode": {
    "accessPath": [
      "updateShortCode"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "ApiVersion",
      "SmsUrl",
      "SmsMethod",
      "SmsFallbackUrl",
      "SmsFallbackMethod"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a short code with the following parameters",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ShortCode resource(s) to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the ShortCode resource to update"
    }
  },
  "ListShortCode": {
    "accessPath": [
      "listShortCode"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "FriendlyName",
      "ShortCode",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of short-codes belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ShortCode resource(s) to read.",
      "FriendlyName": "The string that identifies the ShortCode resources to read.",
      "ShortCode": "Only show the ShortCode resources that match this pattern. You can specify partial numbers and use '*' as a wildcard for any digit.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchSigningKey": {
    "accessPath": [
      "fetchSigningKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSigningKey": {
    "accessPath": [
      "updateSigningKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSigningKey": {
    "accessPath": [
      "deleteSigningKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSipAuthCallsCredentialListMapping": {
    "accessPath": [
      "createSipAuthCallsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "CredentialListSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new credential list mapping resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "DomainSid": "The SID of the SIP domain that will contain the new resource."
    }
  },
  "ListSipAuthCallsCredentialListMapping": {
    "accessPath": [
      "listSipAuthCallsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of credential list mappings belonging to the domain used in the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to read.",
      "DomainSid": "The SID of the SIP domain that contains the resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchSipAuthCallsCredentialListMapping": {
    "accessPath": [
      "fetchSipAuthCallsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a specific instance of a credential list mapping",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource to fetch.",
      "DomainSid": "The SID of the SIP domain that contains the resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the CredentialListMapping resource to fetch."
    }
  },
  "DeleteSipAuthCallsCredentialListMapping": {
    "accessPath": [
      "deleteSipAuthCallsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a credential list mapping from the requested domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to delete.",
      "DomainSid": "The SID of the SIP domain that contains the resource to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the CredentialListMapping resource to delete."
    }
  },
  "CreateSipAuthCallsIpAccessControlListMapping": {
    "accessPath": [
      "createSipAuthCallsIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "IpAccessControlListSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new IP Access Control List mapping",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "DomainSid": "The SID of the SIP domain that will contain the new resource."
    }
  },
  "ListSipAuthCallsIpAccessControlListMapping": {
    "accessPath": [
      "listSipAuthCallsIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of IP Access Control List mappings belonging to the domain used in the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resources to read.",
      "DomainSid": "The SID of the SIP domain that contains the resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchSipAuthCallsIpAccessControlListMapping": {
    "accessPath": [
      "fetchSipAuthCallsIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a specific instance of an IP Access Control List mapping",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resource to fetch.",
      "DomainSid": "The SID of the SIP domain that contains the resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the IpAccessControlListMapping resource to fetch."
    }
  },
  "DeleteSipAuthCallsIpAccessControlListMapping": {
    "accessPath": [
      "deleteSipAuthCallsIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an IP Access Control List mapping from the requested domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the IpAccessControlListMapping resources to delete.",
      "DomainSid": "The SID of the SIP domain that contains the resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the IpAccessControlListMapping resource to delete."
    }
  },
  "CreateSipAuthRegistrationsCredentialListMapping": {
    "accessPath": [
      "createSipAuthRegistrationsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "CredentialListSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new credential list mapping resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.",
      "DomainSid": "The SID of the SIP domain that will contain the new resource."
    }
  },
  "ListSipAuthRegistrationsCredentialListMapping": {
    "accessPath": [
      "listSipAuthRegistrationsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of credential list mappings belonging to the domain used in the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to read.",
      "DomainSid": "The SID of the SIP domain that contains the resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchSipAuthRegistrationsCredentialListMapping": {
    "accessPath": [
      "fetchSipAuthRegistrationsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a specific instance of a credential list mapping",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resource to fetch.",
      "DomainSid": "The SID of the SIP domain that contains the resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the CredentialListMapping resource to fetch."
    }
  },
  "DeleteSipAuthRegistrationsCredentialListMapping": {
    "accessPath": [
      "deleteSipAuthRegistrationsCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a credential list mapping from the requested domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the CredentialListMapping resources to delete.",
      "DomainSid": "The SID of the SIP domain that contains the resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the CredentialListMapping resource to delete."
    }
  },
  "ListSipCredential": {
    "accessPath": [
      "listSipCredential"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CredentialListSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of credentials.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "CredentialListSid": "The unique id that identifies the credential list that contains the desired credentials.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateSipCredential": {
    "accessPath": [
      "createSipCredential"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Username",
      "Password"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CredentialListSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new credential resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "CredentialListSid": "The unique id that identifies the credential list to include the created credential."
    }
  },
  "FetchSipCredential": {
    "accessPath": [
      "fetchSipCredential"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CredentialListSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a single credential.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "CredentialListSid": "The unique id that identifies the credential list that contains the desired credential.",
      "Sid": "The unique id that identifies the resource to fetch."
    }
  },
  "UpdateSipCredential": {
    "accessPath": [
      "updateSipCredential"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Password"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CredentialListSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a credential resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "CredentialListSid": "The unique id that identifies the credential list that includes this credential.",
      "Sid": "The unique id that identifies the resource to update."
    }
  },
  "DeleteSipCredential": {
    "accessPath": [
      "deleteSipCredential"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CredentialListSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a credential resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "CredentialListSid": "The unique id that identifies the credential list that contains the desired credentials.",
      "Sid": "The unique id that identifies the resource to delete."
    }
  },
  "ListSipCredentialList": {
    "accessPath": [
      "listSipCredentialList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Get All Credential Lists",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateSipCredentialList": {
    "accessPath": [
      "createSipCredentialList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Credential List",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource."
    }
  },
  "FetchSipCredentialList": {
    "accessPath": [
      "fetchSipCredentialList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get a Credential List",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "Sid": "The credential list Sid that uniquely identifies this resource"
    }
  },
  "UpdateSipCredentialList": {
    "accessPath": [
      "updateSipCredentialList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Credential List",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "Sid": "The credential list Sid that uniquely identifies this resource"
    }
  },
  "DeleteSipCredentialList": {
    "accessPath": [
      "deleteSipCredentialList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Credential List",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "Sid": "The credential list Sid that uniquely identifies this resource"
    }
  },
  "CreateSipCredentialListMapping": {
    "accessPath": [
      "createSipCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "CredentialListSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a CredentialListMapping resource for an account.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP Domain for which the CredentialList resource will be mapped."
    }
  },
  "ListSipCredentialListMapping": {
    "accessPath": [
      "listSipCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Read multiple CredentialListMapping resources from an account.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP Domain that includes the resource to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchSipCredentialListMapping": {
    "accessPath": [
      "fetchSipCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a single CredentialListMapping resource from an account.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP Domain that includes the resource to fetch.",
      "Sid": "A 34 character string that uniquely identifies the resource to fetch."
    }
  },
  "DeleteSipCredentialListMapping": {
    "accessPath": [
      "deleteSipCredentialListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a CredentialListMapping resource from an account.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP Domain that includes the resource to delete.",
      "Sid": "A 34 character string that uniquely identifies the resource to delete."
    }
  },
  "ListSipDomain": {
    "accessPath": [
      "listSipDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of domains belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateSipDomain": {
    "accessPath": [
      "createSipDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "DomainName",
      "FriendlyName",
      "VoiceUrl",
      "VoiceMethod",
      "VoiceFallbackUrl",
      "VoiceFallbackMethod",
      "VoiceStatusCallbackUrl",
      "VoiceStatusCallbackMethod",
      "SipRegistration",
      "EmergencyCallingEnabled",
      "Secure",
      "ByocTrunkSid",
      "EmergencyCallerSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new Domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "FetchSipDomain": {
    "accessPath": [
      "fetchSipDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a Domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the SipDomain resource to fetch."
    }
  },
  "UpdateSipDomain": {
    "accessPath": [
      "updateSipDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "VoiceFallbackMethod",
      "VoiceFallbackUrl",
      "VoiceMethod",
      "VoiceStatusCallbackMethod",
      "VoiceStatusCallbackUrl",
      "VoiceUrl",
      "SipRegistration",
      "DomainName",
      "EmergencyCallingEnabled",
      "Secure",
      "ByocTrunkSid",
      "EmergencyCallerSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update the attributes of a domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resource to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the SipDomain resource to update."
    }
  },
  "DeleteSipDomain": {
    "accessPath": [
      "deleteSipDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an instance of a Domain",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the SipDomain resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the SipDomain resource to delete."
    }
  },
  "ListSipIpAccessControlList": {
    "accessPath": [
      "listSipIpAccessControlList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of IpAccessControlLists that belong to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateSipIpAccessControlList": {
    "accessPath": [
      "createSipIpAccessControlList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new IpAccessControlList resource",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource."
    }
  },
  "FetchSipIpAccessControlList": {
    "accessPath": [
      "fetchSipIpAccessControlList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch a specific instance of an IpAccessControlList",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "Sid": "A 34 character string that uniquely identifies the resource to fetch."
    }
  },
  "UpdateSipIpAccessControlList": {
    "accessPath": [
      "updateSipIpAccessControlList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rename an IpAccessControlList",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "Sid": "A 34 character string that uniquely identifies the resource to udpate."
    }
  },
  "DeleteSipIpAccessControlList": {
    "accessPath": [
      "deleteSipIpAccessControlList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an IpAccessControlList from the requested account",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "Sid": "A 34 character string that uniquely identifies the resource to delete."
    }
  },
  "FetchSipIpAccessControlListMapping": {
    "accessPath": [
      "fetchSipIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an IpAccessControlListMapping resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP domain.",
      "Sid": "A 34 character string that uniquely identifies the resource to fetch."
    }
  },
  "DeleteSipIpAccessControlListMapping": {
    "accessPath": [
      "deleteSipIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an IpAccessControlListMapping resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP domain.",
      "Sid": "A 34 character string that uniquely identifies the resource to delete."
    }
  },
  "CreateSipIpAccessControlListMapping": {
    "accessPath": [
      "createSipIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "IpAccessControlListSid"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new IpAccessControlListMapping resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP domain."
    }
  },
  "ListSipIpAccessControlListMapping": {
    "accessPath": [
      "listSipIpAccessControlListMapping"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "DomainSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of IpAccessControlListMapping resources.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the Account that is responsible for this resource.",
      "DomainSid": "A 34 character string that uniquely identifies the SIP domain.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListSipIpAddress": {
    "accessPath": [
      "listSipIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "IpAccessControlListSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Read multiple IpAddress resources.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "IpAccessControlListSid": "The IpAccessControlList Sid that identifies the IpAddress resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateSipIpAddress": {
    "accessPath": [
      "createSipIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "FriendlyName",
      "IpAddress",
      "CidrPrefixLength"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "IpAccessControlListSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new IpAddress resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "IpAccessControlListSid": "The IpAccessControlList Sid with which to associate the created IpAddress resource."
    }
  },
  "FetchSipIpAddress": {
    "accessPath": [
      "fetchSipIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "IpAccessControlListSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Read one IpAddress resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "IpAccessControlListSid": "The IpAccessControlList Sid that identifies the IpAddress resources to fetch.",
      "Sid": "A 34 character string that uniquely identifies the IpAddress resource to fetch."
    }
  },
  "UpdateSipIpAddress": {
    "accessPath": [
      "updateSipIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "IpAddress",
      "FriendlyName",
      "CidrPrefixLength"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "IpAccessControlListSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an IpAddress resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "IpAccessControlListSid": "The IpAccessControlList Sid that identifies the IpAddress resources to update.",
      "Sid": "A 34 character string that identifies the IpAddress resource to update."
    }
  },
  "DeleteSipIpAddress": {
    "accessPath": [
      "deleteSipIpAddress"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "IpAccessControlListSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an IpAddress resource.",
    "parameterDescriptions": {
      "AccountSid": "The unique id of the [Account](https://www.twilio.com/docs/iam/api/account) responsible for this resource.",
      "IpAccessControlListSid": "The IpAccessControlList Sid that identifies the IpAddress resources to delete.",
      "Sid": "A 34 character string that uniquely identifies the resource to delete."
    }
  },
  "CreateSiprec": {
    "accessPath": [
      "createSiprec"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Name",
      "ConnectorName",
      "Track",
      "StatusCallback",
      "StatusCallbackMethod",
      "Parameter1.Name",
      "Parameter1.Value",
      "Parameter2.Name",
      "Parameter2.Value",
      "Parameter3.Name",
      "Parameter3.Value",
      "Parameter4.Name",
      "Parameter4.Value",
      "Parameter5.Name",
      "Parameter5.Value",
      "Parameter6.Name",
      "Parameter6.Value",
      "Parameter7.Name",
      "Parameter7.Value",
      "Parameter8.Name",
      "Parameter8.Value",
      "Parameter9.Name",
      "Parameter9.Value",
      "Parameter10.Name",
      "Parameter10.Value",
      "Parameter11.Name",
      "Parameter11.Value",
      "Parameter12.Name",
      "Parameter12.Value",
      "Parameter13.Name",
      "Parameter13.Value",
      "Parameter14.Name",
      "Parameter14.Value",
      "Parameter15.Name",
      "Parameter15.Value",
      "Parameter16.Name",
      "Parameter16.Value",
      "Parameter17.Name",
      "Parameter17.Value",
      "Parameter18.Name",
      "Parameter18.Value",
      "Parameter19.Name",
      "Parameter19.Value",
      "Parameter20.Name",
      "Parameter20.Value",
      "Parameter21.Name",
      "Parameter21.Value",
      "Parameter22.Name",
      "Parameter22.Value",
      "Parameter23.Name",
      "Parameter23.Value",
      "Parameter24.Name",
      "Parameter24.Value",
      "Parameter25.Name",
      "Parameter25.Value",
      "Parameter26.Name",
      "Parameter26.Value",
      "Parameter27.Name",
      "Parameter27.Value",
      "Parameter28.Name",
      "Parameter28.Value",
      "Parameter29.Name",
      "Parameter29.Value",
      "Parameter30.Name",
      "Parameter30.Value",
      "Parameter31.Name",
      "Parameter31.Value",
      "Parameter32.Name",
      "Parameter32.Value",
      "Parameter33.Name",
      "Parameter33.Value",
      "Parameter34.Name",
      "Parameter34.Value",
      "Parameter35.Name",
      "Parameter35.Value",
      "Parameter36.Name",
      "Parameter36.Value",
      "Parameter37.Name",
      "Parameter37.Value",
      "Parameter38.Name",
      "Parameter38.Value",
      "Parameter39.Name",
      "Parameter39.Value",
      "Parameter40.Name",
      "Parameter40.Value",
      "Parameter41.Name",
      "Parameter41.Value",
      "Parameter42.Name",
      "Parameter42.Value",
      "Parameter43.Name",
      "Parameter43.Value",
      "Parameter44.Name",
      "Parameter44.Value",
      "Parameter45.Name",
      "Parameter45.Value",
      "Parameter46.Name",
      "Parameter46.Value",
      "Parameter47.Name",
      "Parameter47.Value",
      "Parameter48.Name",
      "Parameter48.Value",
      "Parameter49.Name",
      "Parameter49.Value",
      "Parameter50.Name",
      "Parameter50.Value",
      "Parameter51.Name",
      "Parameter51.Value",
      "Parameter52.Name",
      "Parameter52.Value",
      "Parameter53.Name",
      "Parameter53.Value",
      "Parameter54.Name",
      "Parameter54.Value",
      "Parameter55.Name",
      "Parameter55.Value",
      "Parameter56.Name",
      "Parameter56.Value",
      "Parameter57.Name",
      "Parameter57.Value",
      "Parameter58.Name",
      "Parameter58.Value",
      "Parameter59.Name",
      "Parameter59.Value",
      "Parameter60.Name",
      "Parameter60.Value",
      "Parameter61.Name",
      "Parameter61.Value",
      "Parameter62.Name",
      "Parameter62.Value",
      "Parameter63.Name",
      "Parameter63.Value",
      "Parameter64.Name",
      "Parameter64.Value",
      "Parameter65.Name",
      "Parameter65.Value",
      "Parameter66.Name",
      "Parameter66.Value",
      "Parameter67.Name",
      "Parameter67.Value",
      "Parameter68.Name",
      "Parameter68.Value",
      "Parameter69.Name",
      "Parameter69.Value",
      "Parameter70.Name",
      "Parameter70.Value",
      "Parameter71.Name",
      "Parameter71.Value",
      "Parameter72.Name",
      "Parameter72.Value",
      "Parameter73.Name",
      "Parameter73.Value",
      "Parameter74.Name",
      "Parameter74.Value",
      "Parameter75.Name",
      "Parameter75.Value",
      "Parameter76.Name",
      "Parameter76.Value",
      "Parameter77.Name",
      "Parameter77.Value",
      "Parameter78.Name",
      "Parameter78.Value",
      "Parameter79.Name",
      "Parameter79.Value",
      "Parameter80.Name",
      "Parameter80.Value",
      "Parameter81.Name",
      "Parameter81.Value",
      "Parameter82.Name",
      "Parameter82.Value",
      "Parameter83.Name",
      "Parameter83.Value",
      "Parameter84.Name",
      "Parameter84.Value",
      "Parameter85.Name",
      "Parameter85.Value",
      "Parameter86.Name",
      "Parameter86.Value",
      "Parameter87.Name",
      "Parameter87.Value",
      "Parameter88.Name",
      "Parameter88.Value",
      "Parameter89.Name",
      "Parameter89.Value",
      "Parameter90.Name",
      "Parameter90.Value",
      "Parameter91.Name",
      "Parameter91.Value",
      "Parameter92.Name",
      "Parameter92.Value",
      "Parameter93.Name",
      "Parameter93.Value",
      "Parameter94.Name",
      "Parameter94.Value",
      "Parameter95.Name",
      "Parameter95.Value",
      "Parameter96.Name",
      "Parameter96.Value",
      "Parameter97.Name",
      "Parameter97.Value",
      "Parameter98.Name",
      "Parameter98.Value",
      "Parameter99.Name",
      "Parameter99.Value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Siprec",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with."
    }
  },
  "UpdateSiprec": {
    "accessPath": [
      "updateSiprec"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Siprec resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Siprec resource is associated with.",
      "Sid": "The SID of the Siprec resource, or the `name` used when creating the resource"
    }
  },
  "CreateStream": {
    "accessPath": [
      "createStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Url",
      "Name",
      "Track",
      "StatusCallback",
      "StatusCallbackMethod",
      "Parameter1.Name",
      "Parameter1.Value",
      "Parameter2.Name",
      "Parameter2.Value",
      "Parameter3.Name",
      "Parameter3.Value",
      "Parameter4.Name",
      "Parameter4.Value",
      "Parameter5.Name",
      "Parameter5.Value",
      "Parameter6.Name",
      "Parameter6.Value",
      "Parameter7.Name",
      "Parameter7.Value",
      "Parameter8.Name",
      "Parameter8.Value",
      "Parameter9.Name",
      "Parameter9.Value",
      "Parameter10.Name",
      "Parameter10.Value",
      "Parameter11.Name",
      "Parameter11.Value",
      "Parameter12.Name",
      "Parameter12.Value",
      "Parameter13.Name",
      "Parameter13.Value",
      "Parameter14.Name",
      "Parameter14.Value",
      "Parameter15.Name",
      "Parameter15.Value",
      "Parameter16.Name",
      "Parameter16.Value",
      "Parameter17.Name",
      "Parameter17.Value",
      "Parameter18.Name",
      "Parameter18.Value",
      "Parameter19.Name",
      "Parameter19.Value",
      "Parameter20.Name",
      "Parameter20.Value",
      "Parameter21.Name",
      "Parameter21.Value",
      "Parameter22.Name",
      "Parameter22.Value",
      "Parameter23.Name",
      "Parameter23.Value",
      "Parameter24.Name",
      "Parameter24.Value",
      "Parameter25.Name",
      "Parameter25.Value",
      "Parameter26.Name",
      "Parameter26.Value",
      "Parameter27.Name",
      "Parameter27.Value",
      "Parameter28.Name",
      "Parameter28.Value",
      "Parameter29.Name",
      "Parameter29.Value",
      "Parameter30.Name",
      "Parameter30.Value",
      "Parameter31.Name",
      "Parameter31.Value",
      "Parameter32.Name",
      "Parameter32.Value",
      "Parameter33.Name",
      "Parameter33.Value",
      "Parameter34.Name",
      "Parameter34.Value",
      "Parameter35.Name",
      "Parameter35.Value",
      "Parameter36.Name",
      "Parameter36.Value",
      "Parameter37.Name",
      "Parameter37.Value",
      "Parameter38.Name",
      "Parameter38.Value",
      "Parameter39.Name",
      "Parameter39.Value",
      "Parameter40.Name",
      "Parameter40.Value",
      "Parameter41.Name",
      "Parameter41.Value",
      "Parameter42.Name",
      "Parameter42.Value",
      "Parameter43.Name",
      "Parameter43.Value",
      "Parameter44.Name",
      "Parameter44.Value",
      "Parameter45.Name",
      "Parameter45.Value",
      "Parameter46.Name",
      "Parameter46.Value",
      "Parameter47.Name",
      "Parameter47.Value",
      "Parameter48.Name",
      "Parameter48.Value",
      "Parameter49.Name",
      "Parameter49.Value",
      "Parameter50.Name",
      "Parameter50.Value",
      "Parameter51.Name",
      "Parameter51.Value",
      "Parameter52.Name",
      "Parameter52.Value",
      "Parameter53.Name",
      "Parameter53.Value",
      "Parameter54.Name",
      "Parameter54.Value",
      "Parameter55.Name",
      "Parameter55.Value",
      "Parameter56.Name",
      "Parameter56.Value",
      "Parameter57.Name",
      "Parameter57.Value",
      "Parameter58.Name",
      "Parameter58.Value",
      "Parameter59.Name",
      "Parameter59.Value",
      "Parameter60.Name",
      "Parameter60.Value",
      "Parameter61.Name",
      "Parameter61.Value",
      "Parameter62.Name",
      "Parameter62.Value",
      "Parameter63.Name",
      "Parameter63.Value",
      "Parameter64.Name",
      "Parameter64.Value",
      "Parameter65.Name",
      "Parameter65.Value",
      "Parameter66.Name",
      "Parameter66.Value",
      "Parameter67.Name",
      "Parameter67.Value",
      "Parameter68.Name",
      "Parameter68.Value",
      "Parameter69.Name",
      "Parameter69.Value",
      "Parameter70.Name",
      "Parameter70.Value",
      "Parameter71.Name",
      "Parameter71.Value",
      "Parameter72.Name",
      "Parameter72.Value",
      "Parameter73.Name",
      "Parameter73.Value",
      "Parameter74.Name",
      "Parameter74.Value",
      "Parameter75.Name",
      "Parameter75.Value",
      "Parameter76.Name",
      "Parameter76.Value",
      "Parameter77.Name",
      "Parameter77.Value",
      "Parameter78.Name",
      "Parameter78.Value",
      "Parameter79.Name",
      "Parameter79.Value",
      "Parameter80.Name",
      "Parameter80.Value",
      "Parameter81.Name",
      "Parameter81.Value",
      "Parameter82.Name",
      "Parameter82.Value",
      "Parameter83.Name",
      "Parameter83.Value",
      "Parameter84.Name",
      "Parameter84.Value",
      "Parameter85.Name",
      "Parameter85.Value",
      "Parameter86.Name",
      "Parameter86.Value",
      "Parameter87.Name",
      "Parameter87.Value",
      "Parameter88.Name",
      "Parameter88.Value",
      "Parameter89.Name",
      "Parameter89.Value",
      "Parameter90.Name",
      "Parameter90.Value",
      "Parameter91.Name",
      "Parameter91.Value",
      "Parameter92.Name",
      "Parameter92.Value",
      "Parameter93.Name",
      "Parameter93.Value",
      "Parameter94.Name",
      "Parameter94.Value",
      "Parameter95.Name",
      "Parameter95.Value",
      "Parameter96.Name",
      "Parameter96.Value",
      "Parameter97.Name",
      "Parameter97.Value",
      "Parameter98.Name",
      "Parameter98.Value",
      "Parameter99.Name",
      "Parameter99.Value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Stream",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with."
    }
  },
  "UpdateStream": {
    "accessPath": [
      "updateStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.",
      "Sid": "The SID or the `name` of the Stream resource to be stopped"
    }
  },
  "CreateToken": {
    "accessPath": [
      "createToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Ttl"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Tokens.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new token for ICE servers",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "FetchTranscription": {
    "accessPath": [
      "fetchTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch an instance of a Transcription",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the Transcription resource to fetch."
    }
  },
  "DeleteTranscription": {
    "accessPath": [
      "deleteTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a transcription from the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the Transcription resource to delete."
    }
  },
  "ListTranscription": {
    "accessPath": [
      "listTranscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Transcriptions.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of transcriptions belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to read.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecord": {
    "accessPath": [
      "listUsageRecord"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of usage-records belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordAllTime": {
    "accessPath": [
      "listUsageRecordAllTime"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordDaily": {
    "accessPath": [
      "listUsageRecordDaily"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordLastMonth": {
    "accessPath": [
      "listUsageRecordLastMonth"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordMonthly": {
    "accessPath": [
      "listUsageRecordMonthly"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordThisMonth": {
    "accessPath": [
      "listUsageRecordThisMonth"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordToday": {
    "accessPath": [
      "listUsageRecordToday"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordYearly": {
    "accessPath": [
      "listUsageRecordYearly"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "ListUsageRecordYesterday": {
    "accessPath": [
      "listUsageRecordYesterday"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Category",
      "StartDate",
      "EndDate",
      "IncludeSubaccounts",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageRecord resources to read.",
      "Category": "The [usage category](https://www.twilio.com/docs/usage/api/usage-record#usage-categories) of the UsageRecord resources to read. Only UsageRecord resources in the specified category are retrieved.",
      "StartDate": "Only include usage that has occurred on or after this date. Specify the date in GMT and format as `YYYY-MM-DD`. You can also specify offsets from the current date, such as: `-30days`, which will set the start date to be 30 days before the current date.",
      "EndDate": "Only include usage that occurred on or before this date. Specify the date in GMT and format as `YYYY-MM-DD`.  You can also specify offsets from the current date, such as: `+30days`, which will set the end date to 30 days from the current date.",
      "IncludeSubaccounts": "Whether to include usage from the master account and all its subaccounts. Can be: `true` (the default) to include usage from the master account and all subaccounts or `false` to retrieve usage from only the specified account.",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "FetchUsageTrigger": {
    "accessPath": [
      "fetchUsageTrigger"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fetch and instance of a usage-trigger",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resource to fetch.",
      "Sid": "The Twilio-provided string that uniquely identifies the UsageTrigger resource to fetch."
    }
  },
  "UpdateUsageTrigger": {
    "accessPath": [
      "updateUsageTrigger"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "CallbackMethod",
      "CallbackUrl",
      "FriendlyName"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an instance of a usage trigger",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to update.",
      "Sid": "The Twilio-provided string that uniquely identifies the UsageTrigger resource to update."
    }
  },
  "DeleteUsageTrigger": {
    "accessPath": [
      "deleteUsageTrigger"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to delete.",
      "Sid": "The Twilio-provided string that uniquely identifies the UsageTrigger resource to delete."
    }
  },
  "CreateUsageTrigger": {
    "accessPath": [
      "createUsageTrigger"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "CallbackUrl",
      "TriggerValue",
      "UsageCategory",
      "CallbackMethod",
      "FriendlyName",
      "Recurring",
      "TriggerBy"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new UsageTrigger",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource."
    }
  },
  "ListUsageTrigger": {
    "accessPath": [
      "listUsageTrigger"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "Recurring",
      "TriggerBy",
      "UsageCategory",
      "PageSize",
      "Page",
      "PageToken"
    ],
    "description": "Retrieve a list of usage-triggers belonging to the account used to make the request",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the UsageTrigger resources to read.",
      "Recurring": "The frequency of recurring UsageTriggers to read. Can be: `daily`, `monthly`, or `yearly` to read recurring UsageTriggers. An empty value or a value of `alltime` reads non-recurring UsageTriggers.",
      "TriggerBy": "The trigger field of the UsageTriggers to read.  Can be: `count`, `usage`, or `price` as described in the [UsageRecords documentation](https://www.twilio.com/docs/usage/api/usage-record#usage-count-price).",
      "UsageCategory": "The usage category of the UsageTriggers to read. Must be a supported [usage categories](https://www.twilio.com/docs/usage/api/usage-record#usage-categories).",
      "PageSize": "How many resources to return in each list page. The default is 50, and the maximum is 1000.",
      "Page": "The page index. This value is simply for client state.",
      "PageToken": "The page token. This is provided by the API."
    }
  },
  "CreateUserDefinedMessage": {
    "accessPath": [
      "createUserDefinedMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Content",
      "IdempotencyKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a new User Defined Message for the given Call SID.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created User Defined Message.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message is associated with."
    }
  },
  "CreateUserDefinedMessageSubscription": {
    "accessPath": [
      "createUserDefinedMessageSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "Callback",
      "IdempotencyKey",
      "Method"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Subscribe to User Defined Messages for a given Call SID.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Messages subscription is associated with. This refers to the Call SID that is producing the user defined messages."
    }
  },
  "DeleteUserDefinedMessageSubscription": {
    "accessPath": [
      "deleteUserDefinedMessageSubscription"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "AccountSid",
      "CallSid",
      "Sid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a specific User Defined Message Subscription.",
    "parameterDescriptions": {
      "AccountSid": "The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that subscribed to the User Defined Messages.",
      "CallSid": "The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.",
      "Sid": "The SID that uniquely identifies this User Defined Message Subscription."
    }
  }
} satisfies ToolRuntimeMetadataMap;
