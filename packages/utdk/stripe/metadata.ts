import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "GetAccount": {
    "accessPath": [
      "getAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/account",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostAccountLinks": {
    "accessPath": [
      "postAccountLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account",
      "collect",
      "collection_options",
      "expand",
      "refresh_url",
      "return_url",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/account_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an account link"
  },
  "PostAccountSessions": {
    "accessPath": [
      "postAccountSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account",
      "components",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/account_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an Account Session"
  },
  "GetAccounts": {
    "accessPath": [
      "getAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all connected accounts",
    "parameterDescriptions": {
      "created": "Only return connected accounts that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostAccounts": {
    "accessPath": [
      "postAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_token",
      "bank_account",
      "business_profile",
      "business_type",
      "capabilities",
      "company",
      "controller",
      "country",
      "default_currency",
      "documents",
      "email",
      "expand",
      "external_account",
      "groups",
      "individual",
      "metadata",
      "settings",
      "tos_acceptance",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>With <a href=\"/docs/connect\">Connect</a>, you can create Stripe accounts for your users.\nTo do this, you’ll first need to <a href=\"https://dashboard.stripe.com/account/applications/settings\">register your platform</a>.</p>\n\n<p>If you’ve already collected information for your connected accounts, you <a href=\"/docs/connect/best-practices#onboarding\">can prefill that information</a> when\ncreating the account. Connect Onboarding won’t ask for the prefilled information during account onboarding.\nYou can prefill any information on the account.</p>"
  },
  "DeleteAccountsAccount": {
    "accessPath": [
      "deleteAccountsAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/accounts/{account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an account"
  },
  "GetAccountsAccount": {
    "accessPath": [
      "getAccountsAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostAccountsAccount": {
    "accessPath": [
      "postAccountsAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_token",
      "business_profile",
      "business_type",
      "capabilities",
      "company",
      "default_currency",
      "documents",
      "email",
      "expand",
      "external_account",
      "groups",
      "individual",
      "metadata",
      "settings",
      "tos_acceptance"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an account"
  },
  "PostAccountsAccountBankAccounts": {
    "accessPath": [
      "postAccountsAccountBankAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bank_account",
      "default_for_currency",
      "expand",
      "external_account",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/bank_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an external account"
  },
  "DeleteAccountsAccountBankAccountsId": {
    "accessPath": [
      "deleteAccountsAccountBankAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/accounts/{account}/bank_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an external account",
    "parameterDescriptions": {
      "id": "Unique identifier for the external account to be deleted."
    }
  },
  "GetAccountsAccountBankAccountsId": {
    "accessPath": [
      "getAccountsAccountBankAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/bank_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an external account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "Unique identifier for the external account to be retrieved."
    }
  },
  "PostAccountsAccountBankAccountsId": {
    "accessPath": [
      "postAccountsAccountBankAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder_name",
      "account_holder_type",
      "account_type",
      "address_city",
      "address_country",
      "address_line1",
      "address_line2",
      "address_state",
      "address_zip",
      "default_for_currency",
      "documents",
      "exp_month",
      "exp_year",
      "expand",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/bank_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Updates the metadata, account holder name, account holder type of a bank account belonging to\na connected account and optionally sets it as the default for its currency. Other bank account\ndetails are not editable by design.</p>\n\n<p>You can only update bank accounts when <a href=\"/api/accounts/object#account_object-controller-requirement_collection\">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href=\"/connect/custom-accounts\">Custom accounts</a>.</p>\n\n<p>You can re-enable a disabled bank account by performing an update call without providing any\narguments or changes.</p>"
  },
  "GetAccountsAccountCapabilities": {
    "accessPath": [
      "getAccountsAccountCapabilities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/capabilities",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "List all account capabilities",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetAccountsAccountCapabilitiesCapability": {
    "accessPath": [
      "getAccountsAccountCapabilitiesCapability"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/capabilities/{capability}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "capability"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an Account Capability",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostAccountsAccountCapabilitiesCapability": {
    "accessPath": [
      "postAccountsAccountCapabilitiesCapability"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "requested"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/capabilities/{capability}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "capability"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an Account Capability"
  },
  "GetAccountsAccountExternalAccounts": {
    "accessPath": [
      "getAccountsAccountExternalAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/external_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "object",
      "starting_after"
    ],
    "description": "List all external accounts",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "object": "Filter external accounts according to a particular object type.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostAccountsAccountExternalAccounts": {
    "accessPath": [
      "postAccountsAccountExternalAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bank_account",
      "default_for_currency",
      "expand",
      "external_account",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/external_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an external account"
  },
  "DeleteAccountsAccountExternalAccountsId": {
    "accessPath": [
      "deleteAccountsAccountExternalAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/accounts/{account}/external_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an external account",
    "parameterDescriptions": {
      "id": "Unique identifier for the external account to be deleted."
    }
  },
  "GetAccountsAccountExternalAccountsId": {
    "accessPath": [
      "getAccountsAccountExternalAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/external_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an external account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "Unique identifier for the external account to be retrieved."
    }
  },
  "PostAccountsAccountExternalAccountsId": {
    "accessPath": [
      "postAccountsAccountExternalAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder_name",
      "account_holder_type",
      "account_type",
      "address_city",
      "address_country",
      "address_line1",
      "address_line2",
      "address_state",
      "address_zip",
      "default_for_currency",
      "documents",
      "exp_month",
      "exp_year",
      "expand",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/external_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Updates the metadata, account holder name, account holder type of a bank account belonging to\na connected account and optionally sets it as the default for its currency. Other bank account\ndetails are not editable by design.</p>\n\n<p>You can only update bank accounts when <a href=\"/api/accounts/object#account_object-controller-requirement_collection\">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href=\"/connect/custom-accounts\">Custom accounts</a>.</p>\n\n<p>You can re-enable a disabled bank account by performing an update call without providing any\narguments or changes.</p>"
  },
  "PostAccountsAccountLoginLinks": {
    "accessPath": [
      "postAccountsAccountLoginLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/login_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a login link"
  },
  "GetAccountsAccountPeople": {
    "accessPath": [
      "getAccountsAccountPeople"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/people",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "relationship",
      "starting_after"
    ],
    "description": "List all persons",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "relationship": "Filters on the list of people returned based on the person's relationship to the account's company.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostAccountsAccountPeople": {
    "accessPath": [
      "postAccountsAccountPeople"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "additional_tos_acceptances",
      "address",
      "address_kana",
      "address_kanji",
      "dob",
      "documents",
      "email",
      "expand",
      "first_name",
      "first_name_kana",
      "first_name_kanji",
      "full_name_aliases",
      "gender",
      "id_number",
      "id_number_secondary",
      "last_name",
      "last_name_kana",
      "last_name_kanji",
      "maiden_name",
      "metadata",
      "nationality",
      "person_token",
      "phone",
      "political_exposure",
      "registered_address",
      "relationship",
      "ssn_last_4",
      "us_cfpb_data",
      "verification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/people",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a person"
  },
  "DeleteAccountsAccountPeoplePerson": {
    "accessPath": [
      "deleteAccountsAccountPeoplePerson"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/accounts/{account}/people/{person}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "person"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a person"
  },
  "GetAccountsAccountPeoplePerson": {
    "accessPath": [
      "getAccountsAccountPeoplePerson"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/people/{person}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "person"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a person",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostAccountsAccountPeoplePerson": {
    "accessPath": [
      "postAccountsAccountPeoplePerson"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "additional_tos_acceptances",
      "address",
      "address_kana",
      "address_kanji",
      "dob",
      "documents",
      "email",
      "expand",
      "first_name",
      "first_name_kana",
      "first_name_kanji",
      "full_name_aliases",
      "gender",
      "id_number",
      "id_number_secondary",
      "last_name",
      "last_name_kana",
      "last_name_kanji",
      "maiden_name",
      "metadata",
      "nationality",
      "person_token",
      "phone",
      "political_exposure",
      "registered_address",
      "relationship",
      "ssn_last_4",
      "us_cfpb_data",
      "verification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/people/{person}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "person"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a person"
  },
  "GetAccountsAccountPersons": {
    "accessPath": [
      "getAccountsAccountPersons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/persons",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "relationship",
      "starting_after"
    ],
    "description": "List all persons",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "relationship": "Filters on the list of people returned based on the person's relationship to the account's company.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostAccountsAccountPersons": {
    "accessPath": [
      "postAccountsAccountPersons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "additional_tos_acceptances",
      "address",
      "address_kana",
      "address_kanji",
      "dob",
      "documents",
      "email",
      "expand",
      "first_name",
      "first_name_kana",
      "first_name_kanji",
      "full_name_aliases",
      "gender",
      "id_number",
      "id_number_secondary",
      "last_name",
      "last_name_kana",
      "last_name_kanji",
      "maiden_name",
      "metadata",
      "nationality",
      "person_token",
      "phone",
      "political_exposure",
      "registered_address",
      "relationship",
      "ssn_last_4",
      "us_cfpb_data",
      "verification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/persons",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a person"
  },
  "DeleteAccountsAccountPersonsPerson": {
    "accessPath": [
      "deleteAccountsAccountPersonsPerson"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/accounts/{account}/persons/{person}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "person"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a person"
  },
  "GetAccountsAccountPersonsPerson": {
    "accessPath": [
      "getAccountsAccountPersonsPerson"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/accounts/{account}/persons/{person}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "person"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a person",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostAccountsAccountPersonsPerson": {
    "accessPath": [
      "postAccountsAccountPersonsPerson"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "additional_tos_acceptances",
      "address",
      "address_kana",
      "address_kanji",
      "dob",
      "documents",
      "email",
      "expand",
      "first_name",
      "first_name_kana",
      "first_name_kanji",
      "full_name_aliases",
      "gender",
      "id_number",
      "id_number_secondary",
      "last_name",
      "last_name_kana",
      "last_name_kanji",
      "maiden_name",
      "metadata",
      "nationality",
      "person_token",
      "phone",
      "political_exposure",
      "registered_address",
      "relationship",
      "ssn_last_4",
      "us_cfpb_data",
      "verification"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/persons/{person}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account",
      "person"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a person"
  },
  "PostAccountsAccountReject": {
    "accessPath": [
      "postAccountsAccountReject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "reason"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/accounts/{account}/reject",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reject an account"
  },
  "GetApplePayDomains": {
    "accessPath": [
      "getApplePayDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/apple_pay/domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "domain_name",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "<p>List apple pay domains.</p>",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostApplePayDomains": {
    "accessPath": [
      "postApplePayDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "domain_name",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/apple_pay/domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Create an apple pay domain.</p>"
  },
  "DeleteApplePayDomainsDomain": {
    "accessPath": [
      "deleteApplePayDomainsDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/apple_pay/domains/{domain}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Delete an apple pay domain.</p>"
  },
  "GetApplePayDomainsDomain": {
    "accessPath": [
      "getApplePayDomainsDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/apple_pay/domains/{domain}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "<p>Retrieve an apple pay domain.</p>",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetApplicationFees": {
    "accessPath": [
      "getApplicationFees"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/application_fees",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "charge",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all application fees",
    "parameterDescriptions": {
      "charge": "Only return application fees for the charge specified by this charge ID.",
      "created": "Only return applications fees that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetApplicationFeesFeeRefundsId": {
    "accessPath": [
      "getApplicationFeesFeeRefundsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/application_fees/{fee}/refunds/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fee",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an application fee refund",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostApplicationFeesFeeRefundsId": {
    "accessPath": [
      "postApplicationFeesFeeRefundsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/application_fees/{fee}/refunds/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fee",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an application fee refund"
  },
  "GetApplicationFeesId": {
    "accessPath": [
      "getApplicationFeesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/application_fees/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an application fee",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostApplicationFeesIdRefund": {
    "accessPath": [
      "postApplicationFeesIdRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "directive",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/application_fees/{id}/refund",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApplicationFeesIdRefunds": {
    "accessPath": [
      "getApplicationFeesIdRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/application_fees/{id}/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all application fee refunds",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostApplicationFeesIdRefunds": {
    "accessPath": [
      "postApplicationFeesIdRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/application_fees/{id}/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an application fee refund"
  },
  "GetAppsSecrets": {
    "accessPath": [
      "getAppsSecrets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/apps/secrets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "scope",
      "starting_after"
    ],
    "description": "List secrets",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "scope": "Specifies the scoping of the secret. Requests originating from UI extensions can only access account-scoped secrets or secrets scoped to their own user.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostAppsSecrets": {
    "accessPath": [
      "postAppsSecrets"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "expires_at",
      "name",
      "payload",
      "scope"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/apps/secrets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set a Secret"
  },
  "PostAppsSecretsDelete": {
    "accessPath": [
      "postAppsSecretsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "name",
      "scope"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/apps/secrets/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Secret"
  },
  "GetAppsSecretsFind": {
    "accessPath": [
      "getAppsSecretsFind"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/apps/secrets/find",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "name",
      "scope"
    ],
    "description": "Find a Secret",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "name": "A name for the secret that's unique within the scope.",
      "scope": "Specifies the scoping of the secret. Requests originating from UI extensions can only access account-scoped secrets or secrets scoped to their own user."
    }
  },
  "GetBalance": {
    "accessPath": [
      "getBalance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/balance",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve balance",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetBalanceHistory": {
    "accessPath": [
      "getBalanceHistory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/balance/history",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "currency",
      "ending_before",
      "expand",
      "limit",
      "payout",
      "source",
      "starting_after",
      "type"
    ],
    "description": "List all balance transactions",
    "parameterDescriptions": {
      "created": "Only return transactions that were created during the given date interval.",
      "currency": "Only return transactions in a certain currency. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payout": "For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID.",
      "source": "Only returns transactions associated with the given object.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "Only returns transactions of the given type. One of: `adjustment`, `advance`, `advance_funding`, `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`, `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`, `contribution`, `inbound_transfer`, `inbound_transfer_reversal`, `issuing_authorization_hold`, `issuing_authorization_release`, `issuing_dispute`, `issuing_transaction`, `obligation_outbound`, `obligation_reversal_inbound`, `payment`, `payment_failure_refund`, `payment_network_reserve_hold`, `payment_network_reserve_release`, `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`, `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`, `payout_minimum_balance_release`, `refund`, `refund_failure`, `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`, `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`, `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`, `transfer`, `transfer_cancel`, `transfer_failure`, `transfer_refund`, or `fee_credit_funding`."
    }
  },
  "GetBalanceHistoryId": {
    "accessPath": [
      "getBalanceHistoryId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/balance/history/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a balance transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetBalanceSettings": {
    "accessPath": [
      "getBalanceSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/balance_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve balance settings",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostBalanceSettings": {
    "accessPath": [
      "postBalanceSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "payments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/balance_settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update balance settings"
  },
  "GetBalanceTransactions": {
    "accessPath": [
      "getBalanceTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/balance_transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "currency",
      "ending_before",
      "expand",
      "limit",
      "payout",
      "source",
      "starting_after",
      "type"
    ],
    "description": "List all balance transactions",
    "parameterDescriptions": {
      "created": "Only return transactions that were created during the given date interval.",
      "currency": "Only return transactions in a certain currency. Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payout": "For automatic Stripe payouts only, only returns transactions that were paid out on the specified payout ID.",
      "source": "Only returns transactions associated with the given object.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "Only returns transactions of the given type. One of: `adjustment`, `advance`, `advance_funding`, `anticipation_repayment`, `application_fee`, `application_fee_refund`, `charge`, `climate_order_purchase`, `climate_order_refund`, `connect_collection_transfer`, `contribution`, `inbound_transfer`, `inbound_transfer_reversal`, `issuing_authorization_hold`, `issuing_authorization_release`, `issuing_dispute`, `issuing_transaction`, `obligation_outbound`, `obligation_reversal_inbound`, `payment`, `payment_failure_refund`, `payment_network_reserve_hold`, `payment_network_reserve_release`, `payment_refund`, `payment_reversal`, `payment_unreconciled`, `payout`, `payout_cancel`, `payout_failure`, `payout_minimum_balance_hold`, `payout_minimum_balance_release`, `refund`, `refund_failure`, `reserve_transaction`, `reserved_funds`, `reserve_hold`, `reserve_release`, `stripe_fee`, `stripe_fx_fee`, `stripe_balance_payment_debit`, `stripe_balance_payment_debit_reversal`, `tax_fee`, `topup`, `topup_reversal`, `transfer`, `transfer_cancel`, `transfer_failure`, `transfer_refund`, or `fee_credit_funding`."
    }
  },
  "GetBalanceTransactionsId": {
    "accessPath": [
      "getBalanceTransactionsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/balance_transactions/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a balance transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetBillingAlerts": {
    "accessPath": [
      "getBillingAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/alerts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alert_type",
      "ending_before",
      "expand",
      "limit",
      "meter",
      "starting_after"
    ],
    "description": "List billing alerts",
    "parameterDescriptions": {
      "alert_type": "Filter results to only include this type of alert.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "meter": "Filter results to only include alerts with the given meter.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostBillingAlerts": {
    "accessPath": [
      "postBillingAlerts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alert_type",
      "expand",
      "title",
      "usage_threshold"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/alerts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a billing alert"
  },
  "GetBillingAlertsId": {
    "accessPath": [
      "getBillingAlertsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/alerts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a billing alert",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostBillingAlertsIdActivate": {
    "accessPath": [
      "postBillingAlertsIdActivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/alerts/{id}/activate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Activate a billing alert"
  },
  "PostBillingAlertsIdArchive": {
    "accessPath": [
      "postBillingAlertsIdArchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/alerts/{id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive a billing alert"
  },
  "PostBillingAlertsIdDeactivate": {
    "accessPath": [
      "postBillingAlertsIdDeactivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/alerts/{id}/deactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deactivate a billing alert"
  },
  "GetBillingCreditBalanceSummary": {
    "accessPath": [
      "getBillingCreditBalanceSummary"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/credit_balance_summary",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "customer",
      "customer_account",
      "expand",
      "filter"
    ],
    "description": "Retrieve the credit balance summary for a customer",
    "parameterDescriptions": {
      "customer": "The customer whose credit balance summary you're retrieving.",
      "customer_account": "The account representing the customer whose credit balance summary you're retrieving.",
      "expand": "Specifies which fields in the response should be expanded.",
      "filter": "The filter criteria for the credit balance summary."
    }
  },
  "GetBillingCreditBalanceTransactions": {
    "accessPath": [
      "getBillingCreditBalanceTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/credit_balance_transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "credit_grant",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List credit balance transactions",
    "parameterDescriptions": {
      "credit_grant": "The credit grant for which to fetch credit balance transactions.",
      "customer": "The customer whose credit balance transactions you're retrieving.",
      "customer_account": "The account representing the customer whose credit balance transactions you're retrieving.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetBillingCreditBalanceTransactionsId": {
    "accessPath": [
      "getBillingCreditBalanceTransactionsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/credit_balance_transactions/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a credit balance transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "Unique identifier for the object."
    }
  },
  "GetBillingCreditGrants": {
    "accessPath": [
      "getBillingCreditGrants"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/credit_grants",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List credit grants",
    "parameterDescriptions": {
      "customer": "Only return credit grants for this customer.",
      "customer_account": "Only return credit grants for this account representing the customer.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostBillingCreditGrants": {
    "accessPath": [
      "postBillingCreditGrants"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "applicability_config",
      "category",
      "customer",
      "customer_account",
      "effective_at",
      "expand",
      "expires_at",
      "metadata",
      "name",
      "priority"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/credit_grants",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a credit grant"
  },
  "GetBillingCreditGrantsId": {
    "accessPath": [
      "getBillingCreditGrantsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/credit_grants/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a credit grant",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "Unique identifier for the object."
    }
  },
  "PostBillingCreditGrantsId": {
    "accessPath": [
      "postBillingCreditGrantsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "expires_at",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/credit_grants/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a credit grant",
    "parameterDescriptions": {
      "id": "Unique identifier for the object."
    }
  },
  "PostBillingCreditGrantsIdExpire": {
    "accessPath": [
      "postBillingCreditGrantsIdExpire"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/credit_grants/{id}/expire",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Expire a credit grant",
    "parameterDescriptions": {
      "id": "Unique identifier for the object."
    }
  },
  "PostBillingCreditGrantsIdVoid": {
    "accessPath": [
      "postBillingCreditGrantsIdVoid"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/credit_grants/{id}/void",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Void a credit grant",
    "parameterDescriptions": {
      "id": "Unique identifier for the object."
    }
  },
  "PostBillingMeterEventAdjustments": {
    "accessPath": [
      "postBillingMeterEventAdjustments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cancel",
      "event_name",
      "expand",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/meter_event_adjustments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a billing meter event adjustment"
  },
  "PostBillingMeterEvents": {
    "accessPath": [
      "postBillingMeterEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "event_name",
      "expand",
      "identifier",
      "payload",
      "timestamp"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/meter_events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a billing meter event"
  },
  "GetBillingMeters": {
    "accessPath": [
      "getBillingMeters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/meters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List billing meters",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Filter results to only include meters with the given status."
    }
  },
  "PostBillingMeters": {
    "accessPath": [
      "postBillingMeters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customer_mapping",
      "default_aggregation",
      "display_name",
      "event_name",
      "event_time_window",
      "expand",
      "value_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/meters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a billing meter"
  },
  "GetBillingMetersId": {
    "accessPath": [
      "getBillingMetersId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/meters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a billing meter",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostBillingMetersId": {
    "accessPath": [
      "postBillingMetersId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/meters/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a billing meter"
  },
  "PostBillingMetersIdDeactivate": {
    "accessPath": [
      "postBillingMetersIdDeactivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/meters/{id}/deactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deactivate a billing meter"
  },
  "GetBillingMetersIdEventSummaries": {
    "accessPath": [
      "getBillingMetersIdEventSummaries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing/meters/{id}/event_summaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "customer",
      "end_time",
      "ending_before",
      "expand",
      "limit",
      "start_time",
      "starting_after",
      "value_grouping_window"
    ],
    "description": "List billing meter event summaries",
    "parameterDescriptions": {
      "customer": "The customer for which to fetch event summaries.",
      "end_time": "The timestamp from when to stop aggregating meter events (exclusive). Must be aligned with minute boundaries.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "Unique identifier for the object.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "start_time": "The timestamp from when to start aggregating meter events (inclusive). Must be aligned with minute boundaries.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "value_grouping_window": "Specifies what granularity to use when generating event summaries. If not specified, a single event summary would be returned for the specified time range. For hourly granularity, start and end times must align with hour boundaries (e.g., 00:00, 01:00, ..., 23:00). For daily granularity, start and end times must align with UTC day boundaries (00:00 UTC)."
    }
  },
  "PostBillingMetersIdReactivate": {
    "accessPath": [
      "postBillingMetersIdReactivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing/meters/{id}/reactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reactivate a billing meter"
  },
  "GetBillingPortalConfigurations": {
    "accessPath": [
      "getBillingPortalConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing_portal/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "ending_before",
      "expand",
      "is_default",
      "limit",
      "starting_after"
    ],
    "description": "List portal configurations",
    "parameterDescriptions": {
      "active": "Only return configurations that are active or inactive (e.g., pass `true` to only list active configurations).",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "is_default": "Only return the default or non-default configurations (e.g., pass `true` to only list the default configuration).",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostBillingPortalConfigurations": {
    "accessPath": [
      "postBillingPortalConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "business_profile",
      "default_return_url",
      "expand",
      "features",
      "login_page",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing_portal/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a portal configuration"
  },
  "GetBillingPortalConfigurationsConfiguration": {
    "accessPath": [
      "getBillingPortalConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/billing_portal/configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a portal configuration",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostBillingPortalConfigurationsConfiguration": {
    "accessPath": [
      "postBillingPortalConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "business_profile",
      "default_return_url",
      "expand",
      "features",
      "login_page",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing_portal/configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a portal configuration"
  },
  "PostBillingPortalSessions": {
    "accessPath": [
      "postBillingPortalSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "configuration",
      "customer",
      "customer_account",
      "expand",
      "flow_data",
      "locale",
      "on_behalf_of",
      "return_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/billing_portal/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a portal session"
  },
  "GetCharges": {
    "accessPath": [
      "getCharges"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/charges",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "customer",
      "ending_before",
      "expand",
      "limit",
      "payment_intent",
      "starting_after",
      "transfer_group"
    ],
    "description": "List all charges",
    "parameterDescriptions": {
      "created": "Only return charges that were created during the given date interval.",
      "customer": "Only return charges for the customer specified by this customer ID.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_intent": "Only return charges that were created by the PaymentIntent specified by this PaymentIntent ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "transfer_group": "Only return charges for this transfer group, limited to 100."
    }
  },
  "PostCharges": {
    "accessPath": [
      "postCharges"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "application_fee",
      "application_fee_amount",
      "capture",
      "card",
      "currency",
      "customer",
      "description",
      "destination",
      "expand",
      "metadata",
      "on_behalf_of",
      "radar_options",
      "receipt_email",
      "shipping",
      "source",
      "statement_descriptor",
      "statement_descriptor_suffix",
      "transfer_data",
      "transfer_group"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>This method is no longer recommended—use the <a href=\"/docs/api/payment_intents\">Payment Intents API</a>\nto initiate a new payment instead. Confirmation of the PaymentIntent creates the <code>Charge</code>\nobject used to request payment.</p>"
  },
  "GetChargesSearch": {
    "accessPath": [
      "getChargesSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/charges/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search charges",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for charges](https://docs.stripe.com/search#query-fields-for-charges)."
    }
  },
  "GetChargesCharge": {
    "accessPath": [
      "getChargesCharge"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/charges/{charge}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a charge",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostChargesCharge": {
    "accessPath": [
      "postChargesCharge"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customer",
      "description",
      "expand",
      "fraud_details",
      "metadata",
      "receipt_email",
      "shipping",
      "transfer_group"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a charge"
  },
  "PostChargesChargeCapture": {
    "accessPath": [
      "postChargesChargeCapture"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "application_fee",
      "application_fee_amount",
      "expand",
      "receipt_email",
      "statement_descriptor",
      "statement_descriptor_suffix",
      "transfer_data",
      "transfer_group"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}/capture",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Capture a payment"
  },
  "GetChargesChargeDispute": {
    "accessPath": [
      "getChargesChargeDispute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/charges/{charge}/dispute",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "<p>Retrieve a dispute for a specified charge.</p>",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostChargesChargeDispute": {
    "accessPath": [
      "postChargesChargeDispute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "evidence",
      "expand",
      "metadata",
      "submit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}/dispute",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PostChargesChargeDisputeClose": {
    "accessPath": [
      "postChargesChargeDisputeClose"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}/dispute/close",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PostChargesChargeRefund": {
    "accessPath": [
      "postChargesChargeRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "expand",
      "instructions_email",
      "metadata",
      "payment_intent",
      "reason",
      "refund_application_fee",
      "reverse_transfer"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}/refund",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a refund",
    "parameterDescriptions": {
      "charge": "The identifier of the charge to refund."
    }
  },
  "GetChargesChargeRefunds": {
    "accessPath": [
      "getChargesChargeRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/charges/{charge}/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all refunds",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostChargesChargeRefunds": {
    "accessPath": [
      "postChargesChargeRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "customer",
      "expand",
      "instructions_email",
      "metadata",
      "origin",
      "payment_intent",
      "reason",
      "refund_application_fee",
      "reverse_transfer"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create customer balance refund",
    "parameterDescriptions": {
      "charge": "The identifier of the charge to refund."
    }
  },
  "GetChargesChargeRefundsRefund": {
    "accessPath": [
      "getChargesChargeRefundsRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/charges/{charge}/refunds/{refund}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge",
      "refund"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "<p>Retrieves the details of an existing refund.</p>",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostChargesChargeRefundsRefund": {
    "accessPath": [
      "postChargesChargeRefundsRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/charges/{charge}/refunds/{refund}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "charge",
      "refund"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Update a specified refund.</p>"
  },
  "GetCheckoutSessions": {
    "accessPath": [
      "getCheckoutSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/checkout/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "customer",
      "customer_account",
      "customer_details",
      "ending_before",
      "expand",
      "limit",
      "payment_intent",
      "payment_link",
      "starting_after",
      "status",
      "subscription"
    ],
    "description": "List all Checkout Sessions",
    "parameterDescriptions": {
      "created": "Only return Checkout Sessions that were created during the given date interval.",
      "customer": "Only return the Checkout Sessions for the Customer specified.",
      "customer_account": "Only return the Checkout Sessions for the Account specified.",
      "customer_details": "Only return the Checkout Sessions for the Customer details specified.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_intent": "Only return the Checkout Session for the PaymentIntent specified.",
      "payment_link": "Only return the Checkout Sessions for the Payment Link specified.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return the Checkout Sessions matching the given status.",
      "subscription": "Only return the Checkout Session for the subscription specified."
    }
  },
  "PostCheckoutSessions": {
    "accessPath": [
      "postCheckoutSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "adaptive_pricing",
      "after_expiration",
      "allow_promotion_codes",
      "automatic_tax",
      "billing_address_collection",
      "branding_settings",
      "cancel_url",
      "client_reference_id",
      "consent_collection",
      "currency",
      "custom_fields",
      "custom_text",
      "customer",
      "customer_account",
      "customer_creation",
      "customer_email",
      "customer_update",
      "discounts",
      "excluded_payment_method_types",
      "expand",
      "expires_at",
      "integration_identifier",
      "invoice_creation",
      "line_items",
      "locale",
      "managed_payments",
      "metadata",
      "mode",
      "name_collection",
      "optional_items",
      "origin_context",
      "payment_intent_data",
      "payment_method_collection",
      "payment_method_configuration",
      "payment_method_data",
      "payment_method_options",
      "payment_method_types",
      "permissions",
      "phone_number_collection",
      "redirect_on_completion",
      "return_url",
      "saved_payment_method_options",
      "setup_intent_data",
      "shipping_address_collection",
      "shipping_options",
      "submit_type",
      "subscription_data",
      "success_url",
      "tax_id_collection",
      "ui_mode",
      "wallet_options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/checkout/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Checkout Session"
  },
  "GetCheckoutSessionsSession": {
    "accessPath": [
      "getCheckoutSessionsSession"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/checkout/sessions/{session}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Checkout Session",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCheckoutSessionsSession": {
    "accessPath": [
      "postCheckoutSessionsSession"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "collected_information",
      "expand",
      "line_items",
      "metadata",
      "shipping_options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/checkout/sessions/{session}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Checkout Session"
  },
  "PostCheckoutSessionsSessionExpire": {
    "accessPath": [
      "postCheckoutSessionsSessionExpire"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/checkout/sessions/{session}/expire",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Expire a Checkout Session"
  },
  "GetCheckoutSessionsSessionLineItems": {
    "accessPath": [
      "getCheckoutSessionsSessionLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/checkout/sessions/{session}/line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a Checkout Session's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetClimateOrders": {
    "accessPath": [
      "getClimateOrders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/climate/orders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List orders",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostClimateOrders": {
    "accessPath": [
      "postClimateOrders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "beneficiary",
      "currency",
      "expand",
      "metadata",
      "metric_tons",
      "product"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/climate/orders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an order"
  },
  "GetClimateOrdersOrder": {
    "accessPath": [
      "getClimateOrdersOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/climate/orders/{order}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an order",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "order": "Unique identifier of the order."
    }
  },
  "PostClimateOrdersOrder": {
    "accessPath": [
      "postClimateOrdersOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "beneficiary",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/climate/orders/{order}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an order",
    "parameterDescriptions": {
      "order": "Unique identifier of the order."
    }
  },
  "PostClimateOrdersOrderCancel": {
    "accessPath": [
      "postClimateOrdersOrderCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/climate/orders/{order}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel an order",
    "parameterDescriptions": {
      "order": "Unique identifier of the order."
    }
  },
  "GetClimateProducts": {
    "accessPath": [
      "getClimateProducts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/climate/products",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List products",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetClimateProductsProduct": {
    "accessPath": [
      "getClimateProductsProduct"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/climate/products/{product}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "product"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a product",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetClimateSuppliers": {
    "accessPath": [
      "getClimateSuppliers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/climate/suppliers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List suppliers",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetClimateSuppliersSupplier": {
    "accessPath": [
      "getClimateSuppliersSupplier"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/climate/suppliers/{supplier}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "supplier"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a supplier",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetConfirmationTokensConfirmationToken": {
    "accessPath": [
      "getConfirmationTokensConfirmationToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/confirmation_tokens/{confirmation_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "confirmation_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a ConfirmationToken",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetCountrySpecs": {
    "accessPath": [
      "getCountrySpecs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/country_specs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List Country Specs",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetCountrySpecsCountry": {
    "accessPath": [
      "getCountrySpecsCountry"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/country_specs/{country}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "country"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Country Spec",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetCoupons": {
    "accessPath": [
      "getCoupons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/coupons",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all coupons",
    "parameterDescriptions": {
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCoupons": {
    "accessPath": [
      "postCoupons"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount_off",
      "applies_to",
      "currency",
      "currency_options",
      "duration",
      "duration_in_months",
      "expand",
      "id",
      "max_redemptions",
      "metadata",
      "name",
      "percent_off",
      "redeem_by"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/coupons",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a coupon"
  },
  "DeleteCouponsCoupon": {
    "accessPath": [
      "deleteCouponsCoupon"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/coupons/{coupon}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "coupon"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a coupon"
  },
  "GetCouponsCoupon": {
    "accessPath": [
      "getCouponsCoupon"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/coupons/{coupon}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "coupon"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a coupon",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCouponsCoupon": {
    "accessPath": [
      "postCouponsCoupon"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "currency_options",
      "expand",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/coupons/{coupon}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "coupon"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a coupon"
  },
  "GetCreditNotes": {
    "accessPath": [
      "getCreditNotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/credit_notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "invoice",
      "limit",
      "starting_after"
    ],
    "description": "List all credit notes",
    "parameterDescriptions": {
      "created": "Only return credit notes that were created during the given date interval.",
      "customer": "Only return credit notes for the customer specified by this customer ID.",
      "customer_account": "Only return credit notes for the account representing the customer specified by this account ID.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "invoice": "Only return credit notes for the invoice specified by this invoice ID.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCreditNotes": {
    "accessPath": [
      "postCreditNotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "credit_amount",
      "effective_at",
      "email_type",
      "expand",
      "invoice",
      "lines",
      "memo",
      "metadata",
      "out_of_band_amount",
      "reason",
      "refund_amount",
      "refunds",
      "shipping_cost"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/credit_notes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a credit note"
  },
  "GetCreditNotesPreview": {
    "accessPath": [
      "getCreditNotesPreview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/credit_notes/preview",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "amount",
      "credit_amount",
      "effective_at",
      "email_type",
      "expand",
      "invoice",
      "lines",
      "memo",
      "metadata",
      "out_of_band_amount",
      "reason",
      "refund_amount",
      "refunds",
      "shipping_cost"
    ],
    "description": "Preview a credit note",
    "parameterDescriptions": {
      "amount": "The integer amount in cents (or local equivalent) representing the total amount of the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      "credit_amount": "The integer amount in cents (or local equivalent) representing the amount to credit the customer's balance, which will be automatically applied to their next invoice.",
      "effective_at": "The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF.",
      "email_type": "Type of email to send to the customer, one of `credit_note` or `none` and the default is `credit_note`.",
      "expand": "Specifies which fields in the response should be expanded.",
      "invoice": "ID of the invoice.",
      "lines": "Line items that make up the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      "memo": "The credit note's memo appears on the credit note PDF.",
      "metadata": "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      "out_of_band_amount": "The integer amount in cents (or local equivalent) representing the amount that is credited outside of Stripe.",
      "reason": "Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`",
      "refund_amount": "The integer amount in cents (or local equivalent) representing the amount to refund. If set, a refund will be created for the charge associated with the invoice.",
      "refunds": "Refunds to link to this credit note.",
      "shipping_cost": "When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided."
    }
  },
  "GetCreditNotesPreviewLines": {
    "accessPath": [
      "getCreditNotesPreviewLines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/credit_notes/preview/lines",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "amount",
      "credit_amount",
      "effective_at",
      "email_type",
      "ending_before",
      "expand",
      "invoice",
      "limit",
      "lines",
      "memo",
      "metadata",
      "out_of_band_amount",
      "reason",
      "refund_amount",
      "refunds",
      "shipping_cost",
      "starting_after"
    ],
    "description": "Retrieve a credit note preview's line items",
    "parameterDescriptions": {
      "amount": "The integer amount in cents (or local equivalent) representing the total amount of the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      "credit_amount": "The integer amount in cents (or local equivalent) representing the amount to credit the customer's balance, which will be automatically applied to their next invoice.",
      "effective_at": "The date when this credit note is in effect. Same as `created` unless overwritten. When defined, this value replaces the system-generated 'Date of issue' printed on the credit note PDF.",
      "email_type": "Type of email to send to the customer, one of `credit_note` or `none` and the default is `credit_note`.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "invoice": "ID of the invoice.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "lines": "Line items that make up the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      "memo": "The credit note's memo appears on the credit note PDF.",
      "metadata": "Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.",
      "out_of_band_amount": "The integer amount in cents (or local equivalent) representing the amount that is credited outside of Stripe.",
      "reason": "Reason for issuing this credit note, one of `duplicate`, `fraudulent`, `order_change`, or `product_unsatisfactory`",
      "refund_amount": "The integer amount in cents (or local equivalent) representing the amount to refund. If set, a refund will be created for the charge associated with the invoice.",
      "refunds": "Refunds to link to this credit note.",
      "shipping_cost": "When shipping_cost contains the shipping_rate from the invoice, the shipping_cost is included in the credit note. One of `amount`, `lines`, or `shipping_cost` must be provided.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetCreditNotesCreditNoteLines": {
    "accessPath": [
      "getCreditNotesCreditNoteLines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/credit_notes/{credit_note}/lines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "credit_note"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a credit note's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetCreditNotesId": {
    "accessPath": [
      "getCreditNotesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/credit_notes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a credit note",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCreditNotesId": {
    "accessPath": [
      "postCreditNotesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "memo",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/credit_notes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a credit note"
  },
  "PostCreditNotesIdVoid": {
    "accessPath": [
      "postCreditNotesIdVoid"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/credit_notes/{id}/void",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Void a credit note"
  },
  "PostCustomerSessions": {
    "accessPath": [
      "postCustomerSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "components",
      "customer",
      "customer_account",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customer_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Customer Session"
  },
  "GetCustomers": {
    "accessPath": [
      "getCustomers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "email",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "test_clock"
    ],
    "description": "List all customers",
    "parameterDescriptions": {
      "created": "Only return customers that were created during the given date interval.",
      "email": "A case-sensitive filter on the list based on the customer's `email` field. The value must be a string.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "test_clock": "Provides a list of customers that are associated with the specified test clock. The response will not include customers with test clocks if this parameter is not set."
    }
  },
  "PostCustomers": {
    "accessPath": [
      "postCustomers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "balance",
      "business_name",
      "cash_balance",
      "description",
      "email",
      "expand",
      "individual_name",
      "invoice_prefix",
      "invoice_settings",
      "metadata",
      "name",
      "next_invoice_sequence",
      "payment_method",
      "phone",
      "preferred_locales",
      "shipping",
      "source",
      "tax",
      "tax_exempt",
      "tax_id_data",
      "test_clock"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a customer"
  },
  "GetCustomersSearch": {
    "accessPath": [
      "getCustomersSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search customers",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for customers](https://docs.stripe.com/search#query-fields-for-customers)."
    }
  },
  "DeleteCustomersCustomer": {
    "accessPath": [
      "deleteCustomersCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer"
  },
  "GetCustomersCustomer": {
    "accessPath": [
      "getCustomersCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a customer",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomer": {
    "accessPath": [
      "postCustomersCustomer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "balance",
      "bank_account",
      "business_name",
      "card",
      "cash_balance",
      "default_alipay_account",
      "default_bank_account",
      "default_card",
      "default_source",
      "description",
      "email",
      "expand",
      "individual_name",
      "invoice_prefix",
      "invoice_settings",
      "metadata",
      "name",
      "next_invoice_sequence",
      "phone",
      "preferred_locales",
      "shipping",
      "source",
      "tax",
      "tax_exempt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a customer"
  },
  "GetCustomersCustomerBalanceTransactions": {
    "accessPath": [
      "getCustomersCustomerBalanceTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/balance_transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "invoice",
      "limit",
      "starting_after"
    ],
    "description": "List customer balance transactions",
    "parameterDescriptions": {
      "created": "Only return customer balance transactions that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "invoice": "Only return transactions that are related to the specified invoice.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCustomersCustomerBalanceTransactions": {
    "accessPath": [
      "postCustomersCustomerBalanceTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/balance_transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a customer balance transaction"
  },
  "GetCustomersCustomerBalanceTransactionsTransaction": {
    "accessPath": [
      "getCustomersCustomerBalanceTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/balance_transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a customer balance transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerBalanceTransactionsTransaction": {
    "accessPath": [
      "postCustomersCustomerBalanceTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/balance_transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a customer credit balance transaction"
  },
  "GetCustomersCustomerBankAccounts": {
    "accessPath": [
      "getCustomersCustomerBankAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/bank_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all bank accounts",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCustomersCustomerBankAccounts": {
    "accessPath": [
      "postCustomersCustomerBankAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alipay_account",
      "bank_account",
      "card",
      "expand",
      "metadata",
      "source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/bank_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a card"
  },
  "DeleteCustomersCustomerBankAccountsId": {
    "accessPath": [
      "deleteCustomersCustomerBankAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/bank_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer source"
  },
  "GetCustomersCustomerBankAccountsId": {
    "accessPath": [
      "getCustomersCustomerBankAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/bank_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a bank account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerBankAccountsId": {
    "accessPath": [
      "postCustomersCustomerBankAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder_name",
      "account_holder_type",
      "address_city",
      "address_country",
      "address_line1",
      "address_line2",
      "address_state",
      "address_zip",
      "exp_month",
      "exp_year",
      "expand",
      "metadata",
      "name",
      "owner"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/bank_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Update a specified source for a given customer.</p>"
  },
  "PostCustomersCustomerBankAccountsIdVerify": {
    "accessPath": [
      "postCustomersCustomerBankAccountsIdVerify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amounts",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/bank_accounts/{id}/verify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify a bank account"
  },
  "GetCustomersCustomerCards": {
    "accessPath": [
      "getCustomersCustomerCards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all cards",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCustomersCustomerCards": {
    "accessPath": [
      "postCustomersCustomerCards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alipay_account",
      "bank_account",
      "card",
      "expand",
      "metadata",
      "source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a card"
  },
  "DeleteCustomersCustomerCardsId": {
    "accessPath": [
      "deleteCustomersCustomerCardsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/cards/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer source"
  },
  "GetCustomersCustomerCardsId": {
    "accessPath": [
      "getCustomersCustomerCardsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/cards/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a card",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerCardsId": {
    "accessPath": [
      "postCustomersCustomerCardsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder_name",
      "account_holder_type",
      "address_city",
      "address_country",
      "address_line1",
      "address_line2",
      "address_state",
      "address_zip",
      "exp_month",
      "exp_year",
      "expand",
      "metadata",
      "name",
      "owner"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/cards/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Update a specified source for a given customer.</p>"
  },
  "GetCustomersCustomerCashBalance": {
    "accessPath": [
      "getCustomersCustomerCashBalance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/cash_balance",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a cash balance",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerCashBalance": {
    "accessPath": [
      "postCustomersCustomerCashBalance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/cash_balance",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a cash balance's settings"
  },
  "GetCustomersCustomerCashBalanceTransactions": {
    "accessPath": [
      "getCustomersCustomerCashBalanceTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/cash_balance_transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List cash balance transactions",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetCustomersCustomerCashBalanceTransactionsTransaction": {
    "accessPath": [
      "getCustomersCustomerCashBalanceTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/cash_balance_transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a cash balance transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "DeleteCustomersCustomerDiscount": {
    "accessPath": [
      "deleteCustomersCustomerDiscount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/discount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer discount"
  },
  "GetCustomersCustomerDiscount": {
    "accessPath": [
      "getCustomersCustomerDiscount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/discount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerFundingInstructions": {
    "accessPath": [
      "postCustomersCustomerFundingInstructions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bank_transfer",
      "currency",
      "expand",
      "funding_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/funding_instructions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or retrieve funding instructions for a customer cash balance"
  },
  "GetCustomersCustomerPaymentMethods": {
    "accessPath": [
      "getCustomersCustomerPaymentMethods"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/payment_methods",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "allow_redisplay",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "type"
    ],
    "description": "List a Customer's PaymentMethods",
    "parameterDescriptions": {
      "allow_redisplay": "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "An optional filter on the list, based on the object `type` field. Without the filter, the list includes all current and future payment method types. If your integration expects only one type of payment method in the response, make sure to provide a type value in the request."
    }
  },
  "GetCustomersCustomerPaymentMethodsPaymentMethod": {
    "accessPath": [
      "getCustomersCustomerPaymentMethodsPaymentMethod"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/payment_methods/{payment_method}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "payment_method"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Customer's PaymentMethod",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetCustomersCustomerSources": {
    "accessPath": [
      "getCustomersCustomerSources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/sources",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "object",
      "starting_after"
    ],
    "description": "<p>List sources for a specified customer.</p>",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "object": "Filter sources according to a particular object type.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCustomersCustomerSources": {
    "accessPath": [
      "postCustomersCustomerSources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alipay_account",
      "bank_account",
      "card",
      "expand",
      "metadata",
      "source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/sources",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a card"
  },
  "DeleteCustomersCustomerSourcesId": {
    "accessPath": [
      "deleteCustomersCustomerSourcesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/sources/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer source"
  },
  "GetCustomersCustomerSourcesId": {
    "accessPath": [
      "getCustomersCustomerSourcesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/sources/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "<p>Retrieve a specified source for a given customer.</p>",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerSourcesId": {
    "accessPath": [
      "postCustomersCustomerSourcesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder_name",
      "account_holder_type",
      "address_city",
      "address_country",
      "address_line1",
      "address_line2",
      "address_state",
      "address_zip",
      "exp_month",
      "exp_year",
      "expand",
      "metadata",
      "name",
      "owner"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/sources/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Update a specified source for a given customer.</p>"
  },
  "PostCustomersCustomerSourcesIdVerify": {
    "accessPath": [
      "postCustomersCustomerSourcesIdVerify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amounts",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/sources/{id}/verify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify a bank account"
  },
  "GetCustomersCustomerSubscriptions": {
    "accessPath": [
      "getCustomersCustomerSubscriptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List active subscriptions",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCustomersCustomerSubscriptions": {
    "accessPath": [
      "postCustomersCustomerSubscriptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "add_invoice_items",
      "application_fee_percent",
      "automatic_tax",
      "backdate_start_date",
      "billing_cycle_anchor",
      "billing_thresholds",
      "cancel_at",
      "cancel_at_period_end",
      "collection_method",
      "currency",
      "days_until_due",
      "default_payment_method",
      "default_source",
      "default_tax_rates",
      "discounts",
      "expand",
      "invoice_settings",
      "items",
      "metadata",
      "off_session",
      "payment_behavior",
      "payment_settings",
      "pending_invoice_item_interval",
      "proration_behavior",
      "transfer_data",
      "trial_end",
      "trial_from_plan",
      "trial_period_days",
      "trial_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a subscription"
  },
  "DeleteCustomersCustomerSubscriptionsSubscriptionExposedId": {
    "accessPath": [
      "deleteCustomersCustomerSubscriptionsSubscriptionExposedId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "invoice_now",
      "prorate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a subscription"
  },
  "GetCustomersCustomerSubscriptionsSubscriptionExposedId": {
    "accessPath": [
      "getCustomersCustomerSubscriptionsSubscriptionExposedId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a subscription",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostCustomersCustomerSubscriptionsSubscriptionExposedId": {
    "accessPath": [
      "postCustomersCustomerSubscriptionsSubscriptionExposedId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "add_invoice_items",
      "application_fee_percent",
      "automatic_tax",
      "billing_cycle_anchor",
      "billing_thresholds",
      "cancel_at",
      "cancel_at_period_end",
      "cancellation_details",
      "collection_method",
      "days_until_due",
      "default_payment_method",
      "default_source",
      "default_tax_rates",
      "discounts",
      "expand",
      "invoice_settings",
      "items",
      "metadata",
      "off_session",
      "pause_collection",
      "payment_behavior",
      "payment_settings",
      "pending_invoice_item_interval",
      "proration_behavior",
      "proration_date",
      "transfer_data",
      "trial_end",
      "trial_from_plan",
      "trial_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a subscription on a customer"
  },
  "DeleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount": {
    "accessPath": [
      "deleteCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a customer discount"
  },
  "GetCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount": {
    "accessPath": [
      "getCustomersCustomerSubscriptionsSubscriptionExposedIdDiscount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/subscriptions/{subscription_exposed_id}/discount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetCustomersCustomerTaxIds": {
    "accessPath": [
      "getCustomersCustomerTaxIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/tax_ids",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all Customer tax IDs",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostCustomersCustomerTaxIds": {
    "accessPath": [
      "postCustomersCustomerTaxIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "type",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/customers/{customer}/tax_ids",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Customer tax ID"
  },
  "DeleteCustomersCustomerTaxIdsId": {
    "accessPath": [
      "deleteCustomersCustomerTaxIdsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/customers/{customer}/tax_ids/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Customer tax ID"
  },
  "GetCustomersCustomerTaxIdsId": {
    "accessPath": [
      "getCustomersCustomerTaxIdsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/customers/{customer}/tax_ids/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Customer tax ID",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetDisputes": {
    "accessPath": [
      "getDisputes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/disputes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "charge",
      "created",
      "ending_before",
      "expand",
      "limit",
      "payment_intent",
      "starting_after"
    ],
    "description": "List all disputes",
    "parameterDescriptions": {
      "charge": "Only return disputes associated to the charge specified by this charge ID.",
      "created": "Only return disputes that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_intent": "Only return disputes associated to the PaymentIntent specified by this PaymentIntent ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetDisputesDispute": {
    "accessPath": [
      "getDisputesDispute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/disputes/{dispute}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dispute"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a dispute",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostDisputesDispute": {
    "accessPath": [
      "postDisputesDispute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "evidence",
      "expand",
      "metadata",
      "submit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/disputes/{dispute}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dispute"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a dispute"
  },
  "PostDisputesDisputeClose": {
    "accessPath": [
      "postDisputesDisputeClose"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/disputes/{dispute}/close",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dispute"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Close a dispute"
  },
  "GetEntitlementsActiveEntitlements": {
    "accessPath": [
      "getEntitlementsActiveEntitlements"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/entitlements/active_entitlements",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "customer",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all active entitlements",
    "parameterDescriptions": {
      "customer": "The ID of the customer.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetEntitlementsActiveEntitlementsId": {
    "accessPath": [
      "getEntitlementsActiveEntitlementsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/entitlements/active_entitlements/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an active entitlement",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "The ID of the entitlement."
    }
  },
  "GetEntitlementsFeatures": {
    "accessPath": [
      "getEntitlementsFeatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/entitlements/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "archived",
      "ending_before",
      "expand",
      "limit",
      "lookup_key",
      "starting_after"
    ],
    "description": "List all features",
    "parameterDescriptions": {
      "archived": "If set, filter results to only include features with the given archive status.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "lookup_key": "If set, filter results to only include features with the given lookup_key.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostEntitlementsFeatures": {
    "accessPath": [
      "postEntitlementsFeatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "lookup_key",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/entitlements/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a feature"
  },
  "GetEntitlementsFeaturesId": {
    "accessPath": [
      "getEntitlementsFeaturesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/entitlements/features/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a feature",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "The ID of the feature."
    }
  },
  "PostEntitlementsFeaturesId": {
    "accessPath": [
      "postEntitlementsFeaturesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "expand",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/entitlements/features/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updates a feature"
  },
  "PostEphemeralKeys": {
    "accessPath": [
      "postEphemeralKeys"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customer",
      "expand",
      "issuing_card",
      "nonce",
      "verification_session"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/ephemeral_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an ephemeral key"
  },
  "DeleteEphemeralKeysKey": {
    "accessPath": [
      "deleteEphemeralKeysKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/ephemeral_keys/{key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Immediately invalidate an ephemeral key"
  },
  "GetEvents": {
    "accessPath": [
      "getEvents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "delivery_success",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "type",
      "types"
    ],
    "description": "List all events",
    "parameterDescriptions": {
      "created": "Only return events that were created during the given date interval.",
      "delivery_success": "Filter events by whether all webhooks were successfully delivered. If false, events which are still pending or have failed all delivery attempts to a webhook endpoint will be returned.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "A string containing a specific event name, or group of events using * as a wildcard. The list will be filtered to include only events with a matching event property.",
      "types": "An array of up to 20 strings containing specific event names. The list will be filtered to include only events with a matching event property. You may pass either `type` or `types`, but not both."
    }
  },
  "GetEventsId": {
    "accessPath": [
      "getEventsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/events/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an event",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetExchangeRates": {
    "accessPath": [
      "getExchangeRates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/exchange_rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all exchange rates",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is the currency that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with the exchange rate for currency X your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and total number of supported payout currencies, and the default is the max.",
      "starting_after": "A cursor for use in pagination. `starting_after` is the currency that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with the exchange rate for currency X, your subsequent call can include `starting_after=X` in order to fetch the next page of the list."
    }
  },
  "GetExchangeRatesRateId": {
    "accessPath": [
      "getExchangeRatesRateId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/exchange_rates/{rate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an exchange rate",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostExternalAccountsId": {
    "accessPath": [
      "postExternalAccountsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder_name",
      "account_holder_type",
      "account_type",
      "address_city",
      "address_country",
      "address_line1",
      "address_line2",
      "address_state",
      "address_zip",
      "default_for_currency",
      "documents",
      "exp_month",
      "exp_year",
      "expand",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/external_accounts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Updates the metadata, account holder name, account holder type of a bank account belonging to\na connected account and optionally sets it as the default for its currency. Other bank account\ndetails are not editable by design.</p>\n\n<p>You can only update bank accounts when <a href=\"/api/accounts/object#account_object-controller-requirement_collection\">account.controller.requirement_collection</a> is <code>application</code>, which includes <a href=\"/connect/custom-accounts\">Custom accounts</a>.</p>\n\n<p>You can re-enable a disabled bank account by performing an update call without providing any\narguments or changes.</p>"
  },
  "GetFileLinks": {
    "accessPath": [
      "getFileLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/file_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "expired",
      "file",
      "limit",
      "starting_after"
    ],
    "description": "List all file links",
    "parameterDescriptions": {
      "created": "Only return links that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "expired": "Filter links by their expiration status. By default, Stripe returns all links.",
      "file": "Only return links for the given file.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostFileLinks": {
    "accessPath": [
      "postFileLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "expires_at",
      "file",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/file_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a file link"
  },
  "GetFileLinksLink": {
    "accessPath": [
      "getFileLinksLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/file_links/{link}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a file link",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostFileLinksLink": {
    "accessPath": [
      "postFileLinksLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "expires_at",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/file_links/{link}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a file link"
  },
  "GetFiles": {
    "accessPath": [
      "getFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "purpose",
      "starting_after"
    ],
    "description": "List all files",
    "parameterDescriptions": {
      "created": "Only return files that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "purpose": "Filter queries by the file purpose. If you don't provide a purpose, the queries return unfiltered files.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostFiles": {
    "accessPath": [
      "postFiles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "file",
      "file_link_data",
      "purpose"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a file"
  },
  "GetFilesFile": {
    "accessPath": [
      "getFilesFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a file",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetFinancialConnectionsAccounts": {
    "accessPath": [
      "getFinancialConnectionsAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/financial_connections/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "account_holder",
      "ending_before",
      "expand",
      "limit",
      "session",
      "starting_after"
    ],
    "description": "List Accounts",
    "parameterDescriptions": {
      "account_holder": "If present, only return accounts that belong to the specified account holder. `account_holder[customer]` and `account_holder[account]` are mutually exclusive.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "session": "If present, only return accounts that were collected as part of the given session.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetFinancialConnectionsAccountsAccount": {
    "accessPath": [
      "getFinancialConnectionsAccountsAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/financial_connections/accounts/{account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an Account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostFinancialConnectionsAccountsAccountDisconnect": {
    "accessPath": [
      "postFinancialConnectionsAccountsAccountDisconnect"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/financial_connections/accounts/{account}/disconnect",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Disconnect an Account"
  },
  "GetFinancialConnectionsAccountsAccountOwners": {
    "accessPath": [
      "getFinancialConnectionsAccountsAccountOwners"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/financial_connections/accounts/{account}/owners",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "ownership",
      "starting_after"
    ],
    "description": "List Account Owners",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "ownership": "The ID of the ownership object to fetch owners from.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostFinancialConnectionsAccountsAccountRefresh": {
    "accessPath": [
      "postFinancialConnectionsAccountsAccountRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "features"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/financial_connections/accounts/{account}/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh Account data"
  },
  "PostFinancialConnectionsAccountsAccountSubscribe": {
    "accessPath": [
      "postFinancialConnectionsAccountsAccountSubscribe"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "features"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/financial_connections/accounts/{account}/subscribe",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Subscribe to data refreshes for an Account"
  },
  "PostFinancialConnectionsAccountsAccountUnsubscribe": {
    "accessPath": [
      "postFinancialConnectionsAccountsAccountUnsubscribe"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "features"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/financial_connections/accounts/{account}/unsubscribe",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unsubscribe from data refreshes for an Account"
  },
  "PostFinancialConnectionsSessions": {
    "accessPath": [
      "postFinancialConnectionsSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder",
      "expand",
      "filters",
      "permissions",
      "prefetch",
      "return_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/financial_connections/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Session"
  },
  "GetFinancialConnectionsSessionsSession": {
    "accessPath": [
      "getFinancialConnectionsSessionsSession"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/financial_connections/sessions/{session}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Session",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetFinancialConnectionsTransactions": {
    "accessPath": [
      "getFinancialConnectionsTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/financial_connections/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "account",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "transacted_at",
      "transaction_refresh"
    ],
    "description": "List Transactions",
    "parameterDescriptions": {
      "account": "The ID of the Financial Connections Account whose transactions will be retrieved.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "transacted_at": "A filter on the list based on the object `transacted_at` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with the following options:",
      "transaction_refresh": "A filter on the list based on the object `transaction_refresh` field. The value can be a dictionary with the following options:"
    }
  },
  "GetFinancialConnectionsTransactionsTransaction": {
    "accessPath": [
      "getFinancialConnectionsTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/financial_connections/transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetForwardingRequests": {
    "accessPath": [
      "getForwardingRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/forwarding/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all ForwardingRequests",
    "parameterDescriptions": {
      "created": "Similar to other List endpoints, filters results based on created timestamp. You can pass gt, gte, lt, and lte timestamp values.",
      "ending_before": "A pagination cursor to fetch the previous page of the list. The value must be a ForwardingRequest ID.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A pagination cursor to fetch the next page of the list. The value must be a ForwardingRequest ID."
    }
  },
  "PostForwardingRequests": {
    "accessPath": [
      "postForwardingRequests"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata",
      "payment_method",
      "replacements",
      "request",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/forwarding/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a ForwardingRequest"
  },
  "GetForwardingRequestsId": {
    "accessPath": [
      "getForwardingRequestsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/forwarding/requests/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a ForwardingRequest",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetIdentityVerificationReports": {
    "accessPath": [
      "getIdentityVerificationReports"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/identity/verification_reports",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_reference_id",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "type",
      "verification_session"
    ],
    "description": "List VerificationReports",
    "parameterDescriptions": {
      "client_reference_id": "A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.",
      "created": "Only return VerificationReports that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "Only return VerificationReports of this type",
      "verification_session": "Only return VerificationReports created by this VerificationSession ID. It is allowed to provide a VerificationIntent ID."
    }
  },
  "GetIdentityVerificationReportsReport": {
    "accessPath": [
      "getIdentityVerificationReportsReport"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/identity/verification_reports/{report}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "report"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a VerificationReport",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetIdentityVerificationSessions": {
    "accessPath": [
      "getIdentityVerificationSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/identity/verification_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_reference_id",
      "created",
      "ending_before",
      "expand",
      "limit",
      "related_customer",
      "related_customer_account",
      "starting_after",
      "status"
    ],
    "description": "List VerificationSessions",
    "parameterDescriptions": {
      "client_reference_id": "A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.",
      "created": "Only return VerificationSessions that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "related_customer": "Customer ID",
      "related_customer_account": "The ID of the Account representing a customer.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return VerificationSessions with this status. [Learn more about the lifecycle of sessions](https://docs.stripe.com/identity/how-sessions-work)."
    }
  },
  "PostIdentityVerificationSessions": {
    "accessPath": [
      "postIdentityVerificationSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_reference_id",
      "expand",
      "metadata",
      "options",
      "provided_details",
      "related_customer",
      "related_customer_account",
      "related_person",
      "return_url",
      "type",
      "verification_flow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/identity/verification_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a VerificationSession"
  },
  "GetIdentityVerificationSessionsSession": {
    "accessPath": [
      "getIdentityVerificationSessionsSession"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/identity/verification_sessions/{session}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a VerificationSession",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIdentityVerificationSessionsSession": {
    "accessPath": [
      "postIdentityVerificationSessionsSession"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata",
      "options",
      "provided_details",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/identity/verification_sessions/{session}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a VerificationSession"
  },
  "PostIdentityVerificationSessionsSessionCancel": {
    "accessPath": [
      "postIdentityVerificationSessionsSessionCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/identity/verification_sessions/{session}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a VerificationSession"
  },
  "PostIdentityVerificationSessionsSessionRedact": {
    "accessPath": [
      "postIdentityVerificationSessionsSessionRedact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/identity/verification_sessions/{session}/redact",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Redact a VerificationSession"
  },
  "GetInvoicePayments": {
    "accessPath": [
      "getInvoicePayments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoice_payments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "invoice",
      "limit",
      "payment",
      "starting_after",
      "status"
    ],
    "description": "List all payments for an invoice",
    "parameterDescriptions": {
      "created": "Only return invoice payments that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "invoice": "The identifier of the invoice whose payments to return.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment": "The payment details of the invoice payments to return.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "The status of the invoice payments to return."
    }
  },
  "GetInvoicePaymentsInvoicePayment": {
    "accessPath": [
      "getInvoicePaymentsInvoicePayment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoice_payments/{invoice_payment}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice_payment"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an InvoicePayment",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetInvoiceRenderingTemplates": {
    "accessPath": [
      "getInvoiceRenderingTemplates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoice_rendering_templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all invoice rendering templates",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetInvoiceRenderingTemplatesTemplate": {
    "accessPath": [
      "getInvoiceRenderingTemplatesTemplate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoice_rendering_templates/{template}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "version"
    ],
    "description": "Retrieve an invoice rendering template",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostInvoiceRenderingTemplatesTemplateArchive": {
    "accessPath": [
      "postInvoiceRenderingTemplatesTemplateArchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoice_rendering_templates/{template}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive an invoice rendering template"
  },
  "PostInvoiceRenderingTemplatesTemplateUnarchive": {
    "accessPath": [
      "postInvoiceRenderingTemplatesTemplateUnarchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoice_rendering_templates/{template}/unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unarchive an invoice rendering template"
  },
  "GetInvoiceitems": {
    "accessPath": [
      "getInvoiceitems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoiceitems",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "invoice",
      "limit",
      "pending",
      "starting_after"
    ],
    "description": "List all invoice items",
    "parameterDescriptions": {
      "created": "Only return invoice items that were created during the given date interval.",
      "customer": "The identifier of the customer whose invoice items to return. If none is provided, returns all invoice items.",
      "customer_account": "The identifier of the account representing the customer whose invoice items to return. If none is provided, returns all invoice items.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "invoice": "Only return invoice items belonging to this invoice. If none is provided, all invoice items will be returned. If specifying an invoice, no customer identifier is needed.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "pending": "Set to `true` to only show pending invoice items, which are not yet attached to any invoices. Set to `false` to only show invoice items already attached to invoices. If unspecified, no filter is applied.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostInvoiceitems": {
    "accessPath": [
      "postInvoiceitems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "customer",
      "customer_account",
      "description",
      "discountable",
      "discounts",
      "expand",
      "invoice",
      "metadata",
      "period",
      "price_data",
      "pricing",
      "quantity",
      "quantity_decimal",
      "subscription",
      "tax_behavior",
      "tax_code",
      "tax_rates",
      "unit_amount_decimal"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoiceitems",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an invoice item"
  },
  "DeleteInvoiceitemsInvoiceitem": {
    "accessPath": [
      "deleteInvoiceitemsInvoiceitem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/invoiceitems/{invoiceitem}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceitem"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete an invoice item"
  },
  "GetInvoiceitemsInvoiceitem": {
    "accessPath": [
      "getInvoiceitemsInvoiceitem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoiceitems/{invoiceitem}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceitem"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an invoice item",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostInvoiceitemsInvoiceitem": {
    "accessPath": [
      "postInvoiceitemsInvoiceitem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "description",
      "discountable",
      "discounts",
      "expand",
      "metadata",
      "period",
      "price_data",
      "pricing",
      "quantity",
      "quantity_decimal",
      "tax_behavior",
      "tax_code",
      "tax_rates",
      "unit_amount_decimal"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoiceitems/{invoiceitem}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoiceitem"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an invoice item"
  },
  "GetInvoices": {
    "accessPath": [
      "getInvoices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "collection_method",
      "created",
      "customer",
      "customer_account",
      "due_date",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status",
      "subscription"
    ],
    "description": "List all invoices",
    "parameterDescriptions": {
      "collection_method": "The collection method of the invoice to retrieve. Either `charge_automatically` or `send_invoice`.",
      "created": "Only return invoices that were created during the given date interval.",
      "customer": "Only return invoices for the customer specified by this customer ID.",
      "customer_account": "Only return invoices for the account representing the customer specified by this account ID.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "The status of the invoice, one of `draft`, `open`, `paid`, `uncollectible`, or `void`. [Learn more](https://docs.stripe.com/billing/invoices/workflow#workflow-overview)",
      "subscription": "Only return invoices for the subscription specified by this subscription ID."
    }
  },
  "PostInvoices": {
    "accessPath": [
      "postInvoices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_tax_ids",
      "application_fee_amount",
      "auto_advance",
      "automatic_tax",
      "automatically_finalizes_at",
      "collection_method",
      "currency",
      "custom_fields",
      "customer",
      "customer_account",
      "days_until_due",
      "default_payment_method",
      "default_source",
      "default_tax_rates",
      "description",
      "discounts",
      "due_date",
      "effective_at",
      "expand",
      "footer",
      "from_invoice",
      "issuer",
      "metadata",
      "number",
      "on_behalf_of",
      "payment_settings",
      "pending_invoice_items_behavior",
      "rendering",
      "shipping_cost",
      "shipping_details",
      "statement_descriptor",
      "subscription",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an invoice"
  },
  "PostInvoicesCreatePreview": {
    "accessPath": [
      "postInvoicesCreatePreview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "automatic_tax",
      "currency",
      "customer",
      "customer_account",
      "customer_details",
      "discounts",
      "expand",
      "invoice_items",
      "issuer",
      "on_behalf_of",
      "preview_mode",
      "schedule",
      "schedule_details",
      "subscription",
      "subscription_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/create_preview",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a preview invoice"
  },
  "GetInvoicesSearch": {
    "accessPath": [
      "getInvoicesSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoices/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search invoices",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for invoices](https://docs.stripe.com/search#query-fields-for-invoices)."
    }
  },
  "DeleteInvoicesInvoice": {
    "accessPath": [
      "deleteInvoicesInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/invoices/{invoice}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a draft invoice"
  },
  "GetInvoicesInvoice": {
    "accessPath": [
      "getInvoicesInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoices/{invoice}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an invoice",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostInvoicesInvoice": {
    "accessPath": [
      "postInvoicesInvoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_tax_ids",
      "application_fee_amount",
      "auto_advance",
      "automatic_tax",
      "automatically_finalizes_at",
      "collection_method",
      "custom_fields",
      "days_until_due",
      "default_payment_method",
      "default_source",
      "default_tax_rates",
      "description",
      "discounts",
      "due_date",
      "effective_at",
      "expand",
      "footer",
      "issuer",
      "metadata",
      "number",
      "on_behalf_of",
      "payment_settings",
      "rendering",
      "shipping_cost",
      "shipping_details",
      "statement_descriptor",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an invoice"
  },
  "PostInvoicesInvoiceAddLines": {
    "accessPath": [
      "postInvoicesInvoiceAddLines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "invoice_metadata",
      "lines"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/add_lines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk add invoice line items"
  },
  "PostInvoicesInvoiceAttachPayment": {
    "accessPath": [
      "postInvoicesInvoiceAttachPayment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "payment_intent",
      "payment_record"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/attach_payment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach a payment to an Invoice"
  },
  "PostInvoicesInvoiceFinalize": {
    "accessPath": [
      "postInvoicesInvoiceFinalize"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "auto_advance",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/finalize",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Finalize an invoice"
  },
  "GetInvoicesInvoiceLines": {
    "accessPath": [
      "getInvoicesInvoiceLines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/invoices/{invoice}/lines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve an invoice's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostInvoicesInvoiceLinesLineItemId": {
    "accessPath": [
      "postInvoicesInvoiceLinesLineItemId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "description",
      "discountable",
      "discounts",
      "expand",
      "metadata",
      "period",
      "price_data",
      "pricing",
      "quantity",
      "quantity_decimal",
      "tax_amounts",
      "tax_rates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/lines/{line_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice",
      "line_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an invoice's line item",
    "parameterDescriptions": {
      "invoice": "Invoice ID of line item",
      "line_item_id": "Invoice line item ID"
    }
  },
  "PostInvoicesInvoiceMarkUncollectible": {
    "accessPath": [
      "postInvoicesInvoiceMarkUncollectible"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/mark_uncollectible",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Mark an invoice as uncollectible"
  },
  "PostInvoicesInvoicePay": {
    "accessPath": [
      "postInvoicesInvoicePay"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "forgive",
      "mandate",
      "off_session",
      "paid_out_of_band",
      "payment_method",
      "source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/pay",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Pay an invoice"
  },
  "PostInvoicesInvoiceRemoveLines": {
    "accessPath": [
      "postInvoicesInvoiceRemoveLines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "invoice_metadata",
      "lines"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/remove_lines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk remove invoice line items"
  },
  "PostInvoicesInvoiceSend": {
    "accessPath": [
      "postInvoicesInvoiceSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send an invoice for manual payment"
  },
  "PostInvoicesInvoiceUpdateLines": {
    "accessPath": [
      "postInvoicesInvoiceUpdateLines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "invoice_metadata",
      "lines"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/update_lines",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk update invoice line items"
  },
  "PostInvoicesInvoiceVoid": {
    "accessPath": [
      "postInvoicesInvoiceVoid"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/invoices/{invoice}/void",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invoice"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Void an invoice"
  },
  "GetIssuingAuthorizations": {
    "accessPath": [
      "getIssuingAuthorizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/authorizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "card",
      "cardholder",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all authorizations",
    "parameterDescriptions": {
      "card": "Only return authorizations that belong to the given card.",
      "cardholder": "Only return authorizations that belong to the given cardholder.",
      "created": "Only return authorizations that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return authorizations with the given status. One of `pending`, `closed`, or `reversed`."
    }
  },
  "GetIssuingAuthorizationsAuthorization": {
    "accessPath": [
      "getIssuingAuthorizationsAuthorization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/authorizations/{authorization}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an authorization",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingAuthorizationsAuthorization": {
    "accessPath": [
      "postIssuingAuthorizationsAuthorization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/authorizations/{authorization}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an authorization"
  },
  "PostIssuingAuthorizationsAuthorizationApprove": {
    "accessPath": [
      "postIssuingAuthorizationsAuthorizationApprove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/authorizations/{authorization}/approve",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve an authorization"
  },
  "PostIssuingAuthorizationsAuthorizationDecline": {
    "accessPath": [
      "postIssuingAuthorizationsAuthorizationDecline"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/authorizations/{authorization}/decline",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Decline an authorization"
  },
  "GetIssuingCardholders": {
    "accessPath": [
      "getIssuingCardholders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/cardholders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "email",
      "ending_before",
      "expand",
      "limit",
      "phone_number",
      "starting_after",
      "status",
      "type"
    ],
    "description": "List all cardholders",
    "parameterDescriptions": {
      "created": "Only return cardholders that were created during the given date interval.",
      "email": "Only return cardholders that have the given email address.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "phone_number": "Only return cardholders that have the given phone number.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return cardholders that have the given status. One of `active`, `inactive`, or `blocked`.",
      "type": "Only return cardholders that have the given type. One of `individual` or `company`."
    }
  },
  "PostIssuingCardholders": {
    "accessPath": [
      "postIssuingCardholders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing",
      "company",
      "email",
      "expand",
      "individual",
      "metadata",
      "name",
      "phone_number",
      "preferred_locales",
      "spending_controls",
      "status",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/cardholders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a cardholder"
  },
  "GetIssuingCardholdersCardholder": {
    "accessPath": [
      "getIssuingCardholdersCardholder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/cardholders/{cardholder}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardholder"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a cardholder",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingCardholdersCardholder": {
    "accessPath": [
      "postIssuingCardholdersCardholder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing",
      "company",
      "email",
      "expand",
      "individual",
      "metadata",
      "phone_number",
      "preferred_locales",
      "spending_controls",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/cardholders/{cardholder}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cardholder"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a cardholder"
  },
  "GetIssuingCards": {
    "accessPath": [
      "getIssuingCards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cardholder",
      "created",
      "ending_before",
      "exp_month",
      "exp_year",
      "expand",
      "last4",
      "limit",
      "personalization_design",
      "starting_after",
      "status",
      "type"
    ],
    "description": "List all cards",
    "parameterDescriptions": {
      "cardholder": "Only return cards belonging to the Cardholder with the provided ID.",
      "created": "Only return cards that were issued during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "exp_month": "Only return cards that have the given expiration month.",
      "exp_year": "Only return cards that have the given expiration year.",
      "expand": "Specifies which fields in the response should be expanded.",
      "last4": "Only return cards that have the given last four digits.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return cards that have the given status. One of `active`, `inactive`, or `canceled`.",
      "type": "Only return cards that have the given type. One of `virtual` or `physical`."
    }
  },
  "PostIssuingCards": {
    "accessPath": [
      "postIssuingCards"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cardholder",
      "currency",
      "exp_month",
      "exp_year",
      "expand",
      "financial_account",
      "lifecycle_controls",
      "metadata",
      "personalization_design",
      "pin",
      "replacement_for",
      "replacement_reason",
      "second_line",
      "shipping",
      "spending_controls",
      "status",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/cards",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a card"
  },
  "GetIssuingCardsCard": {
    "accessPath": [
      "getIssuingCardsCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/cards/{card}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a card",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingCardsCard": {
    "accessPath": [
      "postIssuingCardsCard"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cancellation_reason",
      "expand",
      "metadata",
      "personalization_design",
      "pin",
      "shipping",
      "spending_controls",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/cards/{card}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a card"
  },
  "GetIssuingDisputes": {
    "accessPath": [
      "getIssuingDisputes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/disputes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status",
      "transaction"
    ],
    "description": "List all disputes",
    "parameterDescriptions": {
      "created": "Only return Issuing disputes that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Select Issuing disputes with the given status.",
      "transaction": "Select the Issuing dispute for the given transaction."
    }
  },
  "PostIssuingDisputes": {
    "accessPath": [
      "postIssuingDisputes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "evidence",
      "expand",
      "metadata",
      "transaction",
      "treasury"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/disputes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a dispute"
  },
  "GetIssuingDisputesDispute": {
    "accessPath": [
      "getIssuingDisputesDispute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/disputes/{dispute}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dispute"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a dispute",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingDisputesDispute": {
    "accessPath": [
      "postIssuingDisputesDispute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "evidence",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/disputes/{dispute}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dispute"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a dispute"
  },
  "PostIssuingDisputesDisputeSubmit": {
    "accessPath": [
      "postIssuingDisputesDisputeSubmit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/disputes/{dispute}/submit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dispute"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit a dispute"
  },
  "GetIssuingPersonalizationDesigns": {
    "accessPath": [
      "getIssuingPersonalizationDesigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/personalization_designs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "lookup_keys",
      "preferences",
      "starting_after",
      "status"
    ],
    "description": "List all personalization designs",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "lookup_keys": "Only return personalization designs with the given lookup keys.",
      "preferences": "Only return personalization designs with the given preferences.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return personalization designs with the given status."
    }
  },
  "PostIssuingPersonalizationDesigns": {
    "accessPath": [
      "postIssuingPersonalizationDesigns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "card_logo",
      "carrier_text",
      "expand",
      "lookup_key",
      "metadata",
      "name",
      "physical_bundle",
      "preferences",
      "transfer_lookup_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/personalization_designs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a personalization design"
  },
  "GetIssuingPersonalizationDesignsPersonalizationDesign": {
    "accessPath": [
      "getIssuingPersonalizationDesignsPersonalizationDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/personalization_designs/{personalization_design}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "personalization_design"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a personalization design",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingPersonalizationDesignsPersonalizationDesign": {
    "accessPath": [
      "postIssuingPersonalizationDesignsPersonalizationDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "card_logo",
      "carrier_text",
      "expand",
      "lookup_key",
      "metadata",
      "name",
      "physical_bundle",
      "preferences",
      "transfer_lookup_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/personalization_designs/{personalization_design}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "personalization_design"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a personalization design"
  },
  "GetIssuingPhysicalBundles": {
    "accessPath": [
      "getIssuingPhysicalBundles"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/physical_bundles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status",
      "type"
    ],
    "description": "List all physical bundles",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return physical bundles with the given status.",
      "type": "Only return physical bundles with the given type."
    }
  },
  "GetIssuingPhysicalBundlesPhysicalBundle": {
    "accessPath": [
      "getIssuingPhysicalBundlesPhysicalBundle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/physical_bundles/{physical_bundle}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "physical_bundle"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a physical bundle",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetIssuingSettlementsSettlement": {
    "accessPath": [
      "getIssuingSettlementsSettlement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/settlements/{settlement}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "settlement"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a settlement",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingSettlementsSettlement": {
    "accessPath": [
      "postIssuingSettlementsSettlement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/settlements/{settlement}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "settlement"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a settlement"
  },
  "GetIssuingTokens": {
    "accessPath": [
      "getIssuingTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "card",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all issuing tokens for card",
    "parameterDescriptions": {
      "card": "The Issuing card identifier to list tokens for.",
      "created": "Only return Issuing tokens that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Select Issuing tokens with the given status."
    }
  },
  "GetIssuingTokensToken": {
    "accessPath": [
      "getIssuingTokensToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/tokens/{token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an issuing token",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingTokensToken": {
    "accessPath": [
      "postIssuingTokensToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/tokens/{token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a token status"
  },
  "GetIssuingTransactions": {
    "accessPath": [
      "getIssuingTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "card",
      "cardholder",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "type"
    ],
    "description": "List all transactions",
    "parameterDescriptions": {
      "card": "Only return transactions that belong to the given card.",
      "cardholder": "Only return transactions that belong to the given cardholder.",
      "created": "Only return transactions that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "Only return transactions that have the given type. One of `capture` or `refund`."
    }
  },
  "GetIssuingTransactionsTransaction": {
    "accessPath": [
      "getIssuingTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/issuing/transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostIssuingTransactionsTransaction": {
    "accessPath": [
      "postIssuingTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/issuing/transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a transaction"
  },
  "PostLinkAccountSessions": {
    "accessPath": [
      "postLinkAccountSessions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account_holder",
      "expand",
      "filters",
      "permissions",
      "prefetch",
      "return_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/link_account_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Session"
  },
  "GetLinkAccountSessionsSession": {
    "accessPath": [
      "getLinkAccountSessionsSession"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/link_account_sessions/{session}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Session",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetLinkedAccounts": {
    "accessPath": [
      "getLinkedAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/linked_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "account_holder",
      "ending_before",
      "expand",
      "limit",
      "session",
      "starting_after"
    ],
    "description": "List Accounts",
    "parameterDescriptions": {
      "account_holder": "If present, only return accounts that belong to the specified account holder. `account_holder[customer]` and `account_holder[account]` are mutually exclusive.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "session": "If present, only return accounts that were collected as part of the given session.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetLinkedAccountsAccount": {
    "accessPath": [
      "getLinkedAccountsAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/linked_accounts/{account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an Account",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostLinkedAccountsAccountDisconnect": {
    "accessPath": [
      "postLinkedAccountsAccountDisconnect"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/linked_accounts/{account}/disconnect",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Disconnect an Account"
  },
  "GetLinkedAccountsAccountOwners": {
    "accessPath": [
      "getLinkedAccountsAccountOwners"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/linked_accounts/{account}/owners",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "ownership",
      "starting_after"
    ],
    "description": "List Account Owners",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "ownership": "The ID of the ownership object to fetch owners from.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostLinkedAccountsAccountRefresh": {
    "accessPath": [
      "postLinkedAccountsAccountRefresh"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "features"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/linked_accounts/{account}/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh Account data"
  },
  "GetMandatesMandate": {
    "accessPath": [
      "getMandatesMandate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/mandates/{mandate}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mandate"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Mandate",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetPaymentAttemptRecords": {
    "accessPath": [
      "getPaymentAttemptRecords"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_attempt_records",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "payment_record",
      "starting_after"
    ],
    "description": "List Payment Attempt Records",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_record": "The ID of the Payment Record.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetPaymentAttemptRecordsId": {
    "accessPath": [
      "getPaymentAttemptRecordsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_attempt_records/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Payment Attempt Record",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "The ID of the Payment Attempt Record."
    }
  },
  "GetPaymentIntents": {
    "accessPath": [
      "getPaymentIntents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_intents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all PaymentIntents",
    "parameterDescriptions": {
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp or a dictionary with a number of different query options.",
      "customer": "Only return PaymentIntents for the customer that this customer ID specifies.",
      "customer_account": "Only return PaymentIntents for the account representing the customer that this ID specifies.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPaymentIntents": {
    "accessPath": [
      "postPaymentIntents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "amount_details",
      "application_fee_amount",
      "automatic_payment_methods",
      "capture_method",
      "confirm",
      "confirmation_method",
      "confirmation_token",
      "currency",
      "customer",
      "customer_account",
      "description",
      "error_on_requires_action",
      "excluded_payment_method_types",
      "expand",
      "hooks",
      "mandate",
      "mandate_data",
      "metadata",
      "off_session",
      "on_behalf_of",
      "payment_details",
      "payment_method",
      "payment_method_configuration",
      "payment_method_data",
      "payment_method_options",
      "payment_method_types",
      "radar_options",
      "receipt_email",
      "return_url",
      "setup_future_usage",
      "shipping",
      "statement_descriptor",
      "statement_descriptor_suffix",
      "transfer_data",
      "transfer_group",
      "use_stripe_sdk"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a PaymentIntent"
  },
  "GetPaymentIntentsSearch": {
    "accessPath": [
      "getPaymentIntentsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_intents/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search PaymentIntents",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for payment intents](https://docs.stripe.com/search#query-fields-for-payment-intents)."
    }
  },
  "GetPaymentIntentsIntent": {
    "accessPath": [
      "getPaymentIntentsIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_intents/{intent}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_secret",
      "expand"
    ],
    "description": "Retrieve a PaymentIntent",
    "parameterDescriptions": {
      "client_secret": "The client secret of the PaymentIntent. We require it if you use a publishable key to retrieve the source.",
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPaymentIntentsIntent": {
    "accessPath": [
      "postPaymentIntentsIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "amount_details",
      "application_fee_amount",
      "capture_method",
      "currency",
      "customer",
      "customer_account",
      "description",
      "excluded_payment_method_types",
      "expand",
      "hooks",
      "metadata",
      "payment_details",
      "payment_method",
      "payment_method_configuration",
      "payment_method_data",
      "payment_method_options",
      "payment_method_types",
      "receipt_email",
      "setup_future_usage",
      "shipping",
      "statement_descriptor",
      "statement_descriptor_suffix",
      "transfer_data",
      "transfer_group"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a PaymentIntent"
  },
  "GetPaymentIntentsIntentAmountDetailsLineItems": {
    "accessPath": [
      "getPaymentIntentsIntentAmountDetailsLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_intents/{intent}/amount_details_line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all PaymentIntent LineItems",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPaymentIntentsIntentApplyCustomerBalance": {
    "accessPath": [
      "postPaymentIntentsIntentApplyCustomerBalance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}/apply_customer_balance",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reconcile a customer_balance PaymentIntent"
  },
  "PostPaymentIntentsIntentCancel": {
    "accessPath": [
      "postPaymentIntentsIntentCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cancellation_reason",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a PaymentIntent"
  },
  "PostPaymentIntentsIntentCapture": {
    "accessPath": [
      "postPaymentIntentsIntentCapture"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount_details",
      "amount_to_capture",
      "application_fee_amount",
      "expand",
      "final_capture",
      "hooks",
      "metadata",
      "payment_details",
      "statement_descriptor",
      "statement_descriptor_suffix",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}/capture",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Capture a PaymentIntent"
  },
  "PostPaymentIntentsIntentConfirm": {
    "accessPath": [
      "postPaymentIntentsIntentConfirm"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount_details",
      "amount_to_confirm",
      "capture_method",
      "client_secret",
      "confirmation_token",
      "error_on_requires_action",
      "excluded_payment_method_types",
      "expand",
      "hooks",
      "mandate",
      "mandate_data",
      "off_session",
      "payment_details",
      "payment_method",
      "payment_method_data",
      "payment_method_options",
      "payment_method_types",
      "radar_options",
      "receipt_email",
      "return_url",
      "setup_future_usage",
      "shipping",
      "use_stripe_sdk"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}/confirm",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Confirm a PaymentIntent"
  },
  "PostPaymentIntentsIntentIncrementAuthorization": {
    "accessPath": [
      "postPaymentIntentsIntentIncrementAuthorization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "amount_details",
      "application_fee_amount",
      "description",
      "expand",
      "hooks",
      "metadata",
      "payment_details",
      "statement_descriptor",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}/increment_authorization",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Increment an authorization"
  },
  "PostPaymentIntentsIntentVerifyMicrodeposits": {
    "accessPath": [
      "postPaymentIntentsIntentVerifyMicrodeposits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amounts",
      "client_secret",
      "descriptor_code",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_intents/{intent}/verify_microdeposits",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify microdeposits on a PaymentIntent"
  },
  "GetPaymentLinks": {
    "accessPath": [
      "getPaymentLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all payment links",
    "parameterDescriptions": {
      "active": "Only return payment links that are active or inactive (e.g., pass `false` to list all inactive payment links).",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPaymentLinks": {
    "accessPath": [
      "postPaymentLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after_completion",
      "allow_promotion_codes",
      "application_fee_amount",
      "application_fee_percent",
      "automatic_tax",
      "billing_address_collection",
      "consent_collection",
      "currency",
      "custom_fields",
      "custom_text",
      "customer_creation",
      "expand",
      "inactive_message",
      "invoice_creation",
      "line_items",
      "managed_payments",
      "metadata",
      "name_collection",
      "on_behalf_of",
      "optional_items",
      "payment_intent_data",
      "payment_method_collection",
      "payment_method_options",
      "payment_method_types",
      "phone_number_collection",
      "restrictions",
      "shipping_address_collection",
      "shipping_options",
      "submit_type",
      "subscription_data",
      "tax_id_collection",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a payment link"
  },
  "GetPaymentLinksPaymentLink": {
    "accessPath": [
      "getPaymentLinksPaymentLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_links/{payment_link}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_link"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve payment link",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPaymentLinksPaymentLink": {
    "accessPath": [
      "postPaymentLinksPaymentLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "after_completion",
      "allow_promotion_codes",
      "automatic_tax",
      "billing_address_collection",
      "custom_fields",
      "custom_text",
      "customer_creation",
      "expand",
      "inactive_message",
      "invoice_creation",
      "line_items",
      "metadata",
      "name_collection",
      "optional_items",
      "payment_intent_data",
      "payment_method_collection",
      "payment_method_options",
      "payment_method_types",
      "phone_number_collection",
      "restrictions",
      "shipping_address_collection",
      "submit_type",
      "subscription_data",
      "tax_id_collection"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_links/{payment_link}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_link"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a payment link"
  },
  "GetPaymentLinksPaymentLinkLineItems": {
    "accessPath": [
      "getPaymentLinksPaymentLinkLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_links/{payment_link}/line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_link"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a payment link's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetPaymentMethodConfigurations": {
    "accessPath": [
      "getPaymentMethodConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_method_configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "application",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List payment method configurations",
    "parameterDescriptions": {
      "active": "Whether the configuration is active.",
      "application": "The Connect application to filter by.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPaymentMethodConfigurations": {
    "accessPath": [
      "postPaymentMethodConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "acss_debit",
      "affirm",
      "afterpay_clearpay",
      "alipay",
      "alma",
      "amazon_pay",
      "apple_pay",
      "apple_pay_later",
      "au_becs_debit",
      "bacs_debit",
      "bancontact",
      "billie",
      "bizum",
      "blik",
      "boleto",
      "card",
      "cartes_bancaires",
      "cashapp",
      "crypto",
      "customer_balance",
      "eps",
      "expand",
      "fpx",
      "fr_meal_voucher_conecs",
      "giropay",
      "google_pay",
      "grabpay",
      "ideal",
      "jcb",
      "kakao_pay",
      "klarna",
      "konbini",
      "kr_card",
      "link",
      "mb_way",
      "mobilepay",
      "multibanco",
      "name",
      "naver_pay",
      "nz_bank_account",
      "oxxo",
      "p24",
      "parent",
      "pay_by_bank",
      "payco",
      "paynow",
      "paypal",
      "payto",
      "pix",
      "promptpay",
      "revolut_pay",
      "samsung_pay",
      "satispay",
      "scalapay",
      "sepa_debit",
      "sofort",
      "sunbit",
      "swish",
      "twint",
      "upi",
      "us_bank_account",
      "wechat_pay",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_method_configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a payment method configuration"
  },
  "GetPaymentMethodConfigurationsConfiguration": {
    "accessPath": [
      "getPaymentMethodConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_method_configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve payment method configuration",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPaymentMethodConfigurationsConfiguration": {
    "accessPath": [
      "postPaymentMethodConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "acss_debit",
      "active",
      "affirm",
      "afterpay_clearpay",
      "alipay",
      "alma",
      "amazon_pay",
      "apple_pay",
      "apple_pay_later",
      "au_becs_debit",
      "bacs_debit",
      "bancontact",
      "billie",
      "bizum",
      "blik",
      "boleto",
      "card",
      "cartes_bancaires",
      "cashapp",
      "crypto",
      "customer_balance",
      "eps",
      "expand",
      "fpx",
      "fr_meal_voucher_conecs",
      "giropay",
      "google_pay",
      "grabpay",
      "ideal",
      "jcb",
      "kakao_pay",
      "klarna",
      "konbini",
      "kr_card",
      "link",
      "mb_way",
      "mobilepay",
      "multibanco",
      "name",
      "naver_pay",
      "nz_bank_account",
      "oxxo",
      "p24",
      "pay_by_bank",
      "payco",
      "paynow",
      "paypal",
      "payto",
      "pix",
      "promptpay",
      "revolut_pay",
      "samsung_pay",
      "satispay",
      "scalapay",
      "sepa_debit",
      "sofort",
      "sunbit",
      "swish",
      "twint",
      "upi",
      "us_bank_account",
      "wechat_pay",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_method_configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update payment method configuration"
  },
  "GetPaymentMethodDomains": {
    "accessPath": [
      "getPaymentMethodDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_method_domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "domain_name",
      "enabled",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List payment method domains",
    "parameterDescriptions": {
      "domain_name": "The domain name that this payment method domain object represents.",
      "enabled": "Whether this payment method domain is enabled. If the domain is not enabled, payment methods will not appear in Elements or Embedded Checkout",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPaymentMethodDomains": {
    "accessPath": [
      "postPaymentMethodDomains"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "domain_name",
      "enabled",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_method_domains",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a payment method domain"
  },
  "GetPaymentMethodDomainsPaymentMethodDomain": {
    "accessPath": [
      "getPaymentMethodDomainsPaymentMethodDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_method_domains/{payment_method_domain}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method_domain"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a payment method domain",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPaymentMethodDomainsPaymentMethodDomain": {
    "accessPath": [
      "postPaymentMethodDomainsPaymentMethodDomain"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "enabled",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_method_domains/{payment_method_domain}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method_domain"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a payment method domain"
  },
  "PostPaymentMethodDomainsPaymentMethodDomainValidate": {
    "accessPath": [
      "postPaymentMethodDomainsPaymentMethodDomainValidate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_method_domains/{payment_method_domain}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method_domain"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Validate an existing payment method domain"
  },
  "GetPaymentMethods": {
    "accessPath": [
      "getPaymentMethods"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_methods",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "allow_redisplay",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "type"
    ],
    "description": "List PaymentMethods",
    "parameterDescriptions": {
      "allow_redisplay": "This field indicates whether this payment method can be shown again to its customer in a checkout flow. Stripe products such as Checkout and Elements use this field to determine whether a payment method can be shown as a saved payment method in a checkout flow.",
      "customer": "The ID of the customer whose PaymentMethods will be retrieved.",
      "customer_account": "The ID of the Account whose PaymentMethods will be retrieved.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "Filters the list by the object `type` field. Unfiltered, the list returns all payment method types except `custom`. If your integration expects only one type of payment method in the response, specify that type value in the request to reduce your payload."
    }
  },
  "PostPaymentMethods": {
    "accessPath": [
      "postPaymentMethods"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "acss_debit",
      "affirm",
      "afterpay_clearpay",
      "alipay",
      "allow_redisplay",
      "alma",
      "amazon_pay",
      "au_becs_debit",
      "bacs_debit",
      "bancontact",
      "billie",
      "billing_details",
      "bizum",
      "blik",
      "boleto",
      "card",
      "cashapp",
      "crypto",
      "custom",
      "customer",
      "customer_balance",
      "eps",
      "expand",
      "fpx",
      "giropay",
      "grabpay",
      "ideal",
      "interac_present",
      "kakao_pay",
      "klarna",
      "konbini",
      "kr_card",
      "link",
      "mb_way",
      "metadata",
      "mobilepay",
      "multibanco",
      "naver_pay",
      "nz_bank_account",
      "oxxo",
      "p24",
      "pay_by_bank",
      "payco",
      "payment_method",
      "paynow",
      "paypal",
      "payto",
      "pix",
      "promptpay",
      "radar_options",
      "revolut_pay",
      "samsung_pay",
      "satispay",
      "scalapay",
      "sepa_debit",
      "sofort",
      "sunbit",
      "swish",
      "twint",
      "type",
      "upi",
      "us_bank_account",
      "wechat_pay",
      "zip"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_methods",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Shares a PaymentMethod"
  },
  "GetPaymentMethodsPaymentMethod": {
    "accessPath": [
      "getPaymentMethodsPaymentMethod"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_methods/{payment_method}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a PaymentMethod",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPaymentMethodsPaymentMethod": {
    "accessPath": [
      "postPaymentMethodsPaymentMethod"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "allow_redisplay",
      "billing_details",
      "card",
      "expand",
      "metadata",
      "payto",
      "us_bank_account"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_methods/{payment_method}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a PaymentMethod"
  },
  "PostPaymentMethodsPaymentMethodAttach": {
    "accessPath": [
      "postPaymentMethodsPaymentMethodAttach"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customer",
      "customer_account",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_methods/{payment_method}/attach",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach a PaymentMethod to a Customer"
  },
  "PostPaymentMethodsPaymentMethodDetach": {
    "accessPath": [
      "postPaymentMethodsPaymentMethodDetach"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_methods/{payment_method}/detach",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payment_method"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Detach a PaymentMethod from a Customer"
  },
  "PostPaymentRecordsReportPayment": {
    "accessPath": [
      "postPaymentRecordsReportPayment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount_requested",
      "customer_details",
      "customer_presence",
      "description",
      "expand",
      "failed",
      "guaranteed",
      "initiated_at",
      "metadata",
      "outcome",
      "payment_method_details",
      "processor_details",
      "shipping_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/report_payment",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report a payment"
  },
  "GetPaymentRecordsId": {
    "accessPath": [
      "getPaymentRecordsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payment_records/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Payment Record",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "The ID of the Payment Record."
    }
  },
  "PostPaymentRecordsIdReportPaymentAttempt": {
    "accessPath": [
      "postPaymentRecordsIdReportPaymentAttempt"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "expand",
      "failed",
      "guaranteed",
      "initiated_at",
      "metadata",
      "outcome",
      "payment_method_details",
      "shipping_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/{id}/report_payment_attempt",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report a payment attempt",
    "parameterDescriptions": {
      "id": "The ID of the Payment Record."
    }
  },
  "PostPaymentRecordsIdReportPaymentAttemptCanceled": {
    "accessPath": [
      "postPaymentRecordsIdReportPaymentAttemptCanceled"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "canceled_at",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/{id}/report_payment_attempt_canceled",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report payment attempt canceled",
    "parameterDescriptions": {
      "id": "The ID of the Payment Record."
    }
  },
  "PostPaymentRecordsIdReportPaymentAttemptFailed": {
    "accessPath": [
      "postPaymentRecordsIdReportPaymentAttemptFailed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "failed_at",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/{id}/report_payment_attempt_failed",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report payment attempt failed",
    "parameterDescriptions": {
      "id": "The ID of the Payment Record."
    }
  },
  "PostPaymentRecordsIdReportPaymentAttemptGuaranteed": {
    "accessPath": [
      "postPaymentRecordsIdReportPaymentAttemptGuaranteed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "guaranteed_at",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/{id}/report_payment_attempt_guaranteed",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report payment attempt guaranteed",
    "parameterDescriptions": {
      "id": "The ID of the Payment Record."
    }
  },
  "PostPaymentRecordsIdReportPaymentAttemptInformational": {
    "accessPath": [
      "postPaymentRecordsIdReportPaymentAttemptInformational"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customer_details",
      "description",
      "expand",
      "metadata",
      "shipping_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/{id}/report_payment_attempt_informational",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report payment attempt informational",
    "parameterDescriptions": {
      "id": "The ID of the Payment Record."
    }
  },
  "PostPaymentRecordsIdReportRefund": {
    "accessPath": [
      "postPaymentRecordsIdReportRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "expand",
      "initiated_at",
      "metadata",
      "outcome",
      "processor_details",
      "refunded"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payment_records/{id}/report_refund",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Report a refund",
    "parameterDescriptions": {
      "id": "The ID of the Payment Record."
    }
  },
  "GetPayouts": {
    "accessPath": [
      "getPayouts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payouts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "arrival_date",
      "created",
      "destination",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all payouts",
    "parameterDescriptions": {
      "arrival_date": "Only return payouts that are expected to arrive during the given date interval.",
      "created": "Only return payouts that were created during the given date interval.",
      "destination": "The ID of an external account - only return payouts sent to this external account.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return payouts that have the given status: `pending`, `paid`, `failed`, or `canceled`."
    }
  },
  "PostPayouts": {
    "accessPath": [
      "postPayouts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "destination",
      "expand",
      "metadata",
      "method",
      "payout_method",
      "source_type",
      "statement_descriptor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payouts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a payout"
  },
  "GetPayoutsPayout": {
    "accessPath": [
      "getPayoutsPayout"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/payouts/{payout}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payout"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a payout",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPayoutsPayout": {
    "accessPath": [
      "postPayoutsPayout"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payouts/{payout}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payout"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a payout"
  },
  "PostPayoutsPayoutCancel": {
    "accessPath": [
      "postPayoutsPayoutCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payouts/{payout}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payout"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a payout"
  },
  "PostPayoutsPayoutReverse": {
    "accessPath": [
      "postPayoutsPayoutReverse"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/payouts/{payout}/reverse",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "payout"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reverse a payout"
  },
  "GetPlans": {
    "accessPath": [
      "getPlans"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/plans",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "created",
      "ending_before",
      "expand",
      "limit",
      "product",
      "starting_after"
    ],
    "description": "List all plans",
    "parameterDescriptions": {
      "active": "Only return plans that are active or inactive (e.g., pass `false` to list all inactive plans).",
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "product": "Only return plans for the given product.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPlans": {
    "accessPath": [
      "postPlans"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "amount",
      "amount_decimal",
      "billing_scheme",
      "currency",
      "expand",
      "id",
      "interval",
      "interval_count",
      "metadata",
      "meter",
      "nickname",
      "product",
      "tiers",
      "tiers_mode",
      "transform_usage",
      "trial_period_days",
      "usage_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/plans",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a plan"
  },
  "DeletePlansPlan": {
    "accessPath": [
      "deletePlansPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/plans/{plan}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "plan"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a plan"
  },
  "GetPlansPlan": {
    "accessPath": [
      "getPlansPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/plans/{plan}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "plan"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a plan",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPlansPlan": {
    "accessPath": [
      "postPlansPlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "expand",
      "metadata",
      "nickname",
      "product",
      "trial_period_days"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/plans/{plan}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "plan"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a plan"
  },
  "GetPrices": {
    "accessPath": [
      "getPrices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/prices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "created",
      "currency",
      "ending_before",
      "expand",
      "limit",
      "lookup_keys",
      "product",
      "recurring",
      "starting_after",
      "type"
    ],
    "description": "List all prices",
    "parameterDescriptions": {
      "active": "Only return prices that are active or inactive (e.g., pass `false` to list all inactive prices).",
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "currency": "Only return prices for the given currency.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "lookup_keys": "Only return the price with these lookup_keys, if any exist. You can specify up to 10 lookup_keys.",
      "product": "Only return prices for the given product.",
      "recurring": "Only return prices with these recurring fields.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "type": "Only return prices of type `recurring` or `one_time`."
    }
  },
  "PostPrices": {
    "accessPath": [
      "postPrices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "billing_scheme",
      "currency",
      "currency_options",
      "custom_unit_amount",
      "expand",
      "lookup_key",
      "metadata",
      "nickname",
      "product",
      "product_data",
      "recurring",
      "tax_behavior",
      "tiers",
      "tiers_mode",
      "transfer_lookup_key",
      "transform_quantity",
      "unit_amount",
      "unit_amount_decimal"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/prices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a price"
  },
  "GetPricesSearch": {
    "accessPath": [
      "getPricesSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/prices/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search prices",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for prices](https://docs.stripe.com/search#query-fields-for-prices)."
    }
  },
  "GetPricesPrice": {
    "accessPath": [
      "getPricesPrice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/prices/{price}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "price"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a price",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPricesPrice": {
    "accessPath": [
      "postPricesPrice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "currency_options",
      "expand",
      "lookup_key",
      "metadata",
      "nickname",
      "tax_behavior",
      "transfer_lookup_key"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/prices/{price}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "price"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a price"
  },
  "GetProducts": {
    "accessPath": [
      "getProducts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "created",
      "ending_before",
      "expand",
      "ids",
      "limit",
      "shippable",
      "starting_after",
      "url"
    ],
    "description": "List all products",
    "parameterDescriptions": {
      "active": "Only return products that are active or inactive (e.g., pass `false` to list all inactive products).",
      "created": "Only return products that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "ids": "Only return products with the given IDs. Cannot be used with [starting_after](https://api.stripe.com#list_products-starting_after) or [ending_before](https://api.stripe.com#list_products-ending_before).",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "shippable": "Only return products that can be shipped (i.e., physical, not digital products).",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "url": "Only return products with the given url."
    }
  },
  "PostProducts": {
    "accessPath": [
      "postProducts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "default_price_data",
      "description",
      "expand",
      "id",
      "images",
      "marketing_features",
      "metadata",
      "name",
      "package_dimensions",
      "shippable",
      "statement_descriptor",
      "tax_code",
      "unit_label",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/products",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a product"
  },
  "GetProductsSearch": {
    "accessPath": [
      "getProductsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search products",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for products](https://docs.stripe.com/search#query-fields-for-products)."
    }
  },
  "DeleteProductsId": {
    "accessPath": [
      "deleteProductsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/products/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a product"
  },
  "GetProductsId": {
    "accessPath": [
      "getProductsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a product",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostProductsId": {
    "accessPath": [
      "postProductsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "default_price",
      "description",
      "expand",
      "images",
      "marketing_features",
      "metadata",
      "name",
      "package_dimensions",
      "shippable",
      "statement_descriptor",
      "tax_code",
      "unit_label",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/products/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a product"
  },
  "GetProductsProductFeatures": {
    "accessPath": [
      "getProductsProductFeatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{product}/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "product"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all features attached to a product",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostProductsProductFeatures": {
    "accessPath": [
      "postProductsProductFeatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "entitlement_feature",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/products/{product}/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "product"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach a feature to a product"
  },
  "DeleteProductsProductFeaturesId": {
    "accessPath": [
      "deleteProductsProductFeaturesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/products/{product}/features/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "product"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove a feature from a product"
  },
  "GetProductsProductFeaturesId": {
    "accessPath": [
      "getProductsProductFeaturesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/products/{product}/features/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "product"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a product_feature",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "id": "The ID of the product_feature.",
      "product": "The ID of the product."
    }
  },
  "GetPromotionCodes": {
    "accessPath": [
      "getPromotionCodes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/promotion_codes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "code",
      "coupon",
      "created",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all promotion codes",
    "parameterDescriptions": {
      "active": "Filter promotion codes by whether they are active.",
      "code": "Only return promotion codes that have this case-insensitive code.",
      "coupon": "Only return promotion codes for this coupon.",
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "customer": "Only return promotion codes that are restricted to this customer.",
      "customer_account": "Only return promotion codes that are restricted to this account representing the customer.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostPromotionCodes": {
    "accessPath": [
      "postPromotionCodes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "code",
      "customer",
      "customer_account",
      "expand",
      "expires_at",
      "max_redemptions",
      "metadata",
      "promotion",
      "restrictions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/promotion_codes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a promotion code"
  },
  "GetPromotionCodesPromotionCode": {
    "accessPath": [
      "getPromotionCodesPromotionCode"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/promotion_codes/{promotion_code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "promotion_code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a promotion code",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostPromotionCodesPromotionCode": {
    "accessPath": [
      "postPromotionCodesPromotionCode"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "expand",
      "metadata",
      "restrictions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/promotion_codes/{promotion_code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "promotion_code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a promotion code"
  },
  "GetQuotes": {
    "accessPath": [
      "getQuotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/quotes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status",
      "test_clock"
    ],
    "description": "List all quotes",
    "parameterDescriptions": {
      "customer": "The ID of the customer whose quotes you're retrieving.",
      "customer_account": "The ID of the account representing the customer whose quotes you're retrieving.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "The status of the quote.",
      "test_clock": "Provides a list of quotes that are associated with the specified test clock. The response will not include quotes with test clocks if this and the customer parameter is not set."
    }
  },
  "PostQuotes": {
    "accessPath": [
      "postQuotes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "application_fee_amount",
      "application_fee_percent",
      "automatic_tax",
      "collection_method",
      "customer",
      "customer_account",
      "default_tax_rates",
      "description",
      "discounts",
      "expand",
      "expires_at",
      "footer",
      "from_quote",
      "header",
      "invoice_settings",
      "line_items",
      "metadata",
      "on_behalf_of",
      "subscription_data",
      "test_clock",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/quotes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a quote"
  },
  "GetQuotesQuote": {
    "accessPath": [
      "getQuotesQuote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/quotes/{quote}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a quote",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostQuotesQuote": {
    "accessPath": [
      "postQuotesQuote"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "application_fee_amount",
      "application_fee_percent",
      "automatic_tax",
      "collection_method",
      "customer",
      "customer_account",
      "default_tax_rates",
      "description",
      "discounts",
      "expand",
      "expires_at",
      "footer",
      "header",
      "invoice_settings",
      "line_items",
      "metadata",
      "on_behalf_of",
      "subscription_data",
      "transfer_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/quotes/{quote}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a quote"
  },
  "PostQuotesQuoteAccept": {
    "accessPath": [
      "postQuotesQuoteAccept"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/quotes/{quote}/accept",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Accept a quote"
  },
  "PostQuotesQuoteCancel": {
    "accessPath": [
      "postQuotesQuoteCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/quotes/{quote}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a quote"
  },
  "GetQuotesQuoteComputedUpfrontLineItems": {
    "accessPath": [
      "getQuotesQuoteComputedUpfrontLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/quotes/{quote}/computed_upfront_line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a quote's upfront line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostQuotesQuoteFinalize": {
    "accessPath": [
      "postQuotesQuoteFinalize"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "expires_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/quotes/{quote}/finalize",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Finalize a quote"
  },
  "GetQuotesQuoteLineItems": {
    "accessPath": [
      "getQuotesQuoteLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/quotes/{quote}/line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a quote's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetQuotesQuotePdf": {
    "accessPath": [
      "getQuotesQuotePdf"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/quotes/{quote}/pdf",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "quote"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Download quote PDF",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetRadarEarlyFraudWarnings": {
    "accessPath": [
      "getRadarEarlyFraudWarnings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/radar/early_fraud_warnings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "charge",
      "created",
      "ending_before",
      "expand",
      "limit",
      "payment_intent",
      "starting_after"
    ],
    "description": "List all early fraud warnings",
    "parameterDescriptions": {
      "charge": "Only return early fraud warnings for the charge specified by this charge ID.",
      "created": "Only return early fraud warnings that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_intent": "Only return early fraud warnings for charges that were created by the PaymentIntent specified by this PaymentIntent ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetRadarEarlyFraudWarningsEarlyFraudWarning": {
    "accessPath": [
      "getRadarEarlyFraudWarningsEarlyFraudWarning"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/radar/early_fraud_warnings/{early_fraud_warning}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "early_fraud_warning"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an early fraud warning",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostRadarPaymentEvaluations": {
    "accessPath": [
      "postRadarPaymentEvaluations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_device_metadata_details",
      "customer_details",
      "expand",
      "metadata",
      "payment_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/radar/payment_evaluations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Payment Evaluation"
  },
  "GetRadarValueListItems": {
    "accessPath": [
      "getRadarValueListItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/radar/value_list_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "value",
      "value_list"
    ],
    "description": "List all value list items",
    "parameterDescriptions": {
      "created": "Only return items that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "value": "Return items belonging to the parent list whose value matches the specified value (using an \"is like\" match).",
      "value_list": "Identifier for the parent value list this item belongs to."
    }
  },
  "PostRadarValueListItems": {
    "accessPath": [
      "postRadarValueListItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "value",
      "value_list"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/radar/value_list_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a value list item"
  },
  "DeleteRadarValueListItemsItem": {
    "accessPath": [
      "deleteRadarValueListItemsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/radar/value_list_items/{item}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "item"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a value list item"
  },
  "GetRadarValueListItemsItem": {
    "accessPath": [
      "getRadarValueListItemsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/radar/value_list_items/{item}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "item"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a value list item",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetRadarValueLists": {
    "accessPath": [
      "getRadarValueLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/radar/value_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "alias",
      "contains",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all value lists",
    "parameterDescriptions": {
      "alias": "The alias used to reference the value list when writing rules.",
      "contains": "A value contained within a value list - returns all value lists containing this value.",
      "created": "Only return value lists that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostRadarValueLists": {
    "accessPath": [
      "postRadarValueLists"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alias",
      "expand",
      "item_type",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/radar/value_lists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a value list"
  },
  "DeleteRadarValueListsValueList": {
    "accessPath": [
      "deleteRadarValueListsValueList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/radar/value_lists/{value_list}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "value_list"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a value list"
  },
  "GetRadarValueListsValueList": {
    "accessPath": [
      "getRadarValueListsValueList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/radar/value_lists/{value_list}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "value_list"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a value list",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostRadarValueListsValueList": {
    "accessPath": [
      "postRadarValueListsValueList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "alias",
      "expand",
      "metadata",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/radar/value_lists/{value_list}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "value_list"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a value list"
  },
  "GetRefunds": {
    "accessPath": [
      "getRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "charge",
      "created",
      "ending_before",
      "expand",
      "limit",
      "payment_intent",
      "starting_after"
    ],
    "description": "List all refunds",
    "parameterDescriptions": {
      "charge": "Only return refunds for the charge specified by this charge ID.",
      "created": "Only return refunds that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_intent": "Only return refunds for the PaymentIntent specified by this ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostRefunds": {
    "accessPath": [
      "postRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "charge",
      "currency",
      "customer",
      "expand",
      "instructions_email",
      "metadata",
      "origin",
      "payment_intent",
      "reason",
      "refund_application_fee",
      "reverse_transfer"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create customer balance refund"
  },
  "GetRefundsRefund": {
    "accessPath": [
      "getRefundsRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/refunds/{refund}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "refund"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a refund",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostRefundsRefund": {
    "accessPath": [
      "postRefundsRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/refunds/{refund}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "refund"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a refund"
  },
  "PostRefundsRefundCancel": {
    "accessPath": [
      "postRefundsRefundCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/refunds/{refund}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "refund"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a refund"
  },
  "GetReportingReportRuns": {
    "accessPath": [
      "getReportingReportRuns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/reporting/report_runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all Report Runs",
    "parameterDescriptions": {
      "created": "Only return Report Runs that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostReportingReportRuns": {
    "accessPath": [
      "postReportingReportRuns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "parameters",
      "report_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/reporting/report_runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Report Run"
  },
  "GetReportingReportRunsReportRun": {
    "accessPath": [
      "getReportingReportRunsReportRun"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/reporting/report_runs/{report_run}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "report_run"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Report Run",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetReportingReportTypes": {
    "accessPath": [
      "getReportingReportTypes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/reporting/report_types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "List all Report Types",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetReportingReportTypesReportType": {
    "accessPath": [
      "getReportingReportTypesReportType"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/reporting/report_types/{report_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "report_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Report Type",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetReviews": {
    "accessPath": [
      "getReviews"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/reviews",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all open reviews",
    "parameterDescriptions": {
      "created": "Only return reviews that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetReviewsReview": {
    "accessPath": [
      "getReviewsReview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/reviews/{review}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "review"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a review",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostReviewsReviewApprove": {
    "accessPath": [
      "postReviewsReviewApprove"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/reviews/{review}/approve",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "review"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Approve a review"
  },
  "GetSetupAttempts": {
    "accessPath": [
      "getSetupAttempts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/setup_attempts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "setup_intent",
      "starting_after"
    ],
    "description": "List all SetupAttempts",
    "parameterDescriptions": {
      "created": "A filter on the list, based on the object `created` field. The value\ncan be a string with an integer Unix timestamp or a\ndictionary with a number of different query options.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "setup_intent": "Only return SetupAttempts created by the SetupIntent specified by\nthis ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetSetupIntents": {
    "accessPath": [
      "getSetupIntents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/setup_intents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "attach_to_self",
      "created",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "payment_method",
      "starting_after"
    ],
    "description": "List all SetupIntents",
    "parameterDescriptions": {
      "attach_to_self": "If present, the SetupIntent's payment method will be attached to the in-context Stripe Account.\n\nIt can only be used for this Stripe Account’s own money movement flows like InboundTransfer and OutboundTransfers. It cannot be set to true when setting up a PaymentMethod for a Customer, and defaults to false when attaching a PaymentMethod to a Customer.",
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "customer": "Only return SetupIntents for the customer specified by this customer ID.",
      "customer_account": "Only return SetupIntents for the account specified by this customer ID.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "payment_method": "Only return SetupIntents that associate with the specified payment method.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostSetupIntents": {
    "accessPath": [
      "postSetupIntents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "attach_to_self",
      "automatic_payment_methods",
      "confirm",
      "confirmation_token",
      "customer",
      "customer_account",
      "description",
      "excluded_payment_method_types",
      "expand",
      "flow_directions",
      "mandate_data",
      "metadata",
      "on_behalf_of",
      "payment_method",
      "payment_method_configuration",
      "payment_method_data",
      "payment_method_options",
      "payment_method_types",
      "return_url",
      "single_use",
      "usage",
      "use_stripe_sdk"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/setup_intents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a SetupIntent"
  },
  "GetSetupIntentsIntent": {
    "accessPath": [
      "getSetupIntentsIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/setup_intents/{intent}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_secret",
      "expand"
    ],
    "description": "Retrieve a SetupIntent",
    "parameterDescriptions": {
      "client_secret": "The client secret of the SetupIntent. We require this string if you use a publishable key to retrieve the SetupIntent.",
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSetupIntentsIntent": {
    "accessPath": [
      "postSetupIntentsIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "attach_to_self",
      "customer",
      "customer_account",
      "description",
      "excluded_payment_method_types",
      "expand",
      "flow_directions",
      "metadata",
      "payment_method",
      "payment_method_configuration",
      "payment_method_data",
      "payment_method_options",
      "payment_method_types"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/setup_intents/{intent}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a SetupIntent"
  },
  "PostSetupIntentsIntentCancel": {
    "accessPath": [
      "postSetupIntentsIntentCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cancellation_reason",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/setup_intents/{intent}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a SetupIntent"
  },
  "PostSetupIntentsIntentConfirm": {
    "accessPath": [
      "postSetupIntentsIntentConfirm"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_secret",
      "confirmation_token",
      "expand",
      "mandate_data",
      "payment_method",
      "payment_method_data",
      "payment_method_options",
      "return_url",
      "use_stripe_sdk"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/setup_intents/{intent}/confirm",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Confirm a SetupIntent"
  },
  "PostSetupIntentsIntentVerifyMicrodeposits": {
    "accessPath": [
      "postSetupIntentsIntentVerifyMicrodeposits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amounts",
      "client_secret",
      "descriptor_code",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/setup_intents/{intent}/verify_microdeposits",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "intent"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify microdeposits on a SetupIntent"
  },
  "GetShippingRates": {
    "accessPath": [
      "getShippingRates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/shipping_rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "created",
      "currency",
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all shipping rates",
    "parameterDescriptions": {
      "active": "Only return shipping rates that are active or inactive.",
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "currency": "Only return shipping rates for the given currency.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostShippingRates": {
    "accessPath": [
      "postShippingRates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "delivery_estimate",
      "display_name",
      "expand",
      "fixed_amount",
      "metadata",
      "tax_behavior",
      "tax_code",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/shipping_rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a shipping rate"
  },
  "GetShippingRatesShippingRateToken": {
    "accessPath": [
      "getShippingRatesShippingRateToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/shipping_rates/{shipping_rate_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shipping_rate_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a shipping rate",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostShippingRatesShippingRateToken": {
    "accessPath": [
      "postShippingRatesShippingRateToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "expand",
      "fixed_amount",
      "metadata",
      "tax_behavior"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/shipping_rates/{shipping_rate_token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shipping_rate_token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a shipping rate"
  },
  "PostSigmaSavedQueriesId": {
    "accessPath": [
      "postSigmaSavedQueriesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "name",
      "sql"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sigma/saved_queries/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing Sigma Query",
    "parameterDescriptions": {
      "id": "The `id` of the saved query to update. This should be a valid `id` that was previously created."
    }
  },
  "GetSigmaScheduledQueryRuns": {
    "accessPath": [
      "getSigmaScheduledQueryRuns"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sigma/scheduled_query_runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all scheduled query runs",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetSigmaScheduledQueryRunsScheduledQueryRun": {
    "accessPath": [
      "getSigmaScheduledQueryRunsScheduledQueryRun"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sigma/scheduled_query_runs/{scheduled_query_run}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "scheduled_query_run"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a scheduled query run",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSources": {
    "accessPath": [
      "postSources"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "customer",
      "expand",
      "flow",
      "mandate",
      "metadata",
      "original_source",
      "owner",
      "receiver",
      "redirect",
      "source_order",
      "statement_descriptor",
      "token",
      "type",
      "usage"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sources",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Shares a source"
  },
  "GetSourcesSource": {
    "accessPath": [
      "getSourcesSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sources/{source}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "client_secret",
      "expand"
    ],
    "description": "Retrieve a source",
    "parameterDescriptions": {
      "client_secret": "The client secret of the source. Required if a publishable key is used to retrieve the source.",
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSourcesSource": {
    "accessPath": [
      "postSourcesSource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "expand",
      "mandate",
      "metadata",
      "owner",
      "source_order"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sources/{source}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a source"
  },
  "GetSourcesSourceMandateNotificationsMandateNotification": {
    "accessPath": [
      "getSourcesSourceMandateNotificationsMandateNotification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sources/{source}/mandate_notifications/{mandate_notification}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mandate_notification",
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Source MandateNotification",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetSourcesSourceSourceTransactions": {
    "accessPath": [
      "getSourcesSourceSourceTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sources/{source}/source_transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "<p>List source transactions for a given source.</p>",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetSourcesSourceSourceTransactionsSourceTransaction": {
    "accessPath": [
      "getSourcesSourceSourceTransactionsSourceTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sources/{source}/source_transactions/{source_transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source",
      "source_transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a source transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSourcesSourceVerify": {
    "accessPath": [
      "postSourcesSourceVerify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "values"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sources/{source}/verify",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "source"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "<p>Verify a given source.</p>"
  },
  "GetSubscriptionItems": {
    "accessPath": [
      "getSubscriptionItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscription_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "subscription"
    ],
    "description": "List all subscription items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "subscription": "The ID of the subscription whose items will be retrieved."
    }
  },
  "PostSubscriptionItems": {
    "accessPath": [
      "postSubscriptionItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing_thresholds",
      "discounts",
      "expand",
      "metadata",
      "payment_behavior",
      "price",
      "price_data",
      "proration_behavior",
      "proration_date",
      "quantity",
      "subscription",
      "tax_rates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscription_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a subscription item"
  },
  "DeleteSubscriptionItemsItem": {
    "accessPath": [
      "deleteSubscriptionItemsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "clear_usage",
      "payment_behavior",
      "proration_behavior",
      "proration_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/subscription_items/{item}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "item"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a subscription item"
  },
  "GetSubscriptionItemsItem": {
    "accessPath": [
      "getSubscriptionItemsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscription_items/{item}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "item"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a subscription item",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSubscriptionItemsItem": {
    "accessPath": [
      "postSubscriptionItemsItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing_thresholds",
      "discounts",
      "expand",
      "metadata",
      "off_session",
      "payment_behavior",
      "price",
      "price_data",
      "proration_behavior",
      "proration_date",
      "quantity",
      "tax_rates"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscription_items/{item}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "item"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a subscription item"
  },
  "GetSubscriptionSchedules": {
    "accessPath": [
      "getSubscriptionSchedules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscription_schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "canceled_at",
      "completed_at",
      "created",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "released_at",
      "scheduled",
      "starting_after"
    ],
    "description": "List all schedules",
    "parameterDescriptions": {
      "canceled_at": "Only return subscription schedules that were created canceled the given date interval.",
      "completed_at": "Only return subscription schedules that completed during the given date interval.",
      "created": "Only return subscription schedules that were created during the given date interval.",
      "customer": "Only return subscription schedules for the given customer.",
      "customer_account": "Only return subscription schedules for the given account.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "released_at": "Only return subscription schedules that were released during the given date interval.",
      "scheduled": "Only return subscription schedules that have not started yet.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostSubscriptionSchedules": {
    "accessPath": [
      "postSubscriptionSchedules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing_mode",
      "customer",
      "customer_account",
      "default_settings",
      "end_behavior",
      "expand",
      "from_subscription",
      "metadata",
      "phases",
      "start_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscription_schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a schedule"
  },
  "GetSubscriptionSchedulesSchedule": {
    "accessPath": [
      "getSubscriptionSchedulesSchedule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscription_schedules/{schedule}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a schedule",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSubscriptionSchedulesSchedule": {
    "accessPath": [
      "postSubscriptionSchedulesSchedule"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "default_settings",
      "end_behavior",
      "expand",
      "metadata",
      "phases",
      "proration_behavior"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscription_schedules/{schedule}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a schedule"
  },
  "PostSubscriptionSchedulesScheduleCancel": {
    "accessPath": [
      "postSubscriptionSchedulesScheduleCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "invoice_now",
      "prorate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscription_schedules/{schedule}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a schedule"
  },
  "PostSubscriptionSchedulesScheduleRelease": {
    "accessPath": [
      "postSubscriptionSchedulesScheduleRelease"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "preserve_cancel_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscription_schedules/{schedule}/release",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Release a schedule"
  },
  "GetSubscriptions": {
    "accessPath": [
      "getSubscriptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "automatic_tax",
      "collection_method",
      "created",
      "current_period_end",
      "current_period_start",
      "customer",
      "customer_account",
      "ending_before",
      "expand",
      "limit",
      "price",
      "starting_after",
      "status",
      "test_clock"
    ],
    "description": "List subscriptions",
    "parameterDescriptions": {
      "automatic_tax": "Filter subscriptions by their automatic tax settings.",
      "collection_method": "The collection method of the subscriptions to retrieve. Either `charge_automatically` or `send_invoice`.",
      "created": "Only return subscriptions that were created during the given date interval.",
      "current_period_end": "Only return subscriptions whose minimum item current_period_end falls within the given date interval.",
      "current_period_start": "Only return subscriptions whose maximum item current_period_start falls within the given date interval.",
      "customer": "The ID of the customer whose subscriptions you're retrieving.",
      "customer_account": "The ID of the account representing the customer whose subscriptions you're retrieving.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "price": "Filter for subscriptions that contain this recurring price ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "The status of the subscriptions to retrieve. Passing in a value of `canceled` will return all canceled subscriptions, including those belonging to deleted customers. Pass `ended` to find subscriptions that are canceled and subscriptions that are expired due to [incomplete payment](https://docs.stripe.com/billing/subscriptions/overview#subscription-statuses). Passing in a value of `all` will return subscriptions of all statuses. If no value is supplied, all subscriptions that have not been canceled are returned.",
      "test_clock": "Filter for subscriptions that are associated with the specified test clock. The response will not include subscriptions with test clocks if this and the customer parameter is not set."
    }
  },
  "PostSubscriptions": {
    "accessPath": [
      "postSubscriptions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "add_invoice_items",
      "application_fee_percent",
      "automatic_tax",
      "backdate_start_date",
      "billing_cycle_anchor",
      "billing_cycle_anchor_config",
      "billing_mode",
      "billing_schedules",
      "billing_thresholds",
      "cancel_at",
      "cancel_at_period_end",
      "collection_method",
      "currency",
      "customer",
      "customer_account",
      "days_until_due",
      "default_payment_method",
      "default_source",
      "default_tax_rates",
      "description",
      "discounts",
      "expand",
      "invoice_settings",
      "items",
      "metadata",
      "off_session",
      "on_behalf_of",
      "payment_behavior",
      "payment_settings",
      "pending_invoice_item_interval",
      "proration_behavior",
      "transfer_data",
      "trial_end",
      "trial_from_plan",
      "trial_period_days",
      "trial_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a subscription"
  },
  "GetSubscriptionsSearch": {
    "accessPath": [
      "getSubscriptionsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscriptions/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "limit",
      "page",
      "query"
    ],
    "description": "Search subscriptions",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "page": "A cursor for pagination across multiple pages of results. Don't include this parameter on the first call. Use the next_page value returned in a previous response to request subsequent results.",
      "query": "The search query string. See [search query language](https://docs.stripe.com/search#search-query-language) and the list of supported [query fields for subscriptions](https://docs.stripe.com/search#query-fields-for-subscriptions)."
    }
  },
  "DeleteSubscriptionsSubscriptionExposedId": {
    "accessPath": [
      "deleteSubscriptionsSubscriptionExposedId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cancellation_details",
      "expand",
      "invoice_now",
      "prorate"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/subscriptions/{subscription_exposed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a subscription"
  },
  "GetSubscriptionsSubscriptionExposedId": {
    "accessPath": [
      "getSubscriptionsSubscriptionExposedId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/subscriptions/{subscription_exposed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a subscription",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostSubscriptionsSubscriptionExposedId": {
    "accessPath": [
      "postSubscriptionsSubscriptionExposedId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "add_invoice_items",
      "application_fee_percent",
      "automatic_tax",
      "billing_cycle_anchor",
      "billing_schedules",
      "billing_thresholds",
      "cancel_at",
      "cancel_at_period_end",
      "cancellation_details",
      "collection_method",
      "days_until_due",
      "default_payment_method",
      "default_source",
      "default_tax_rates",
      "description",
      "discounts",
      "expand",
      "invoice_settings",
      "items",
      "metadata",
      "off_session",
      "on_behalf_of",
      "pause_collection",
      "payment_behavior",
      "payment_settings",
      "pending_invoice_item_interval",
      "proration_behavior",
      "proration_date",
      "transfer_data",
      "trial_end",
      "trial_from_plan",
      "trial_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscriptions/{subscription_exposed_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a subscription"
  },
  "DeleteSubscriptionsSubscriptionExposedIdDiscount": {
    "accessPath": [
      "deleteSubscriptionsSubscriptionExposedIdDiscount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/subscriptions/{subscription_exposed_id}/discount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_exposed_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a subscription discount"
  },
  "PostSubscriptionsSubscriptionMigrate": {
    "accessPath": [
      "postSubscriptionsSubscriptionMigrate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing_mode",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscriptions/{subscription}/migrate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate a subscription"
  },
  "PostSubscriptionsSubscriptionResume": {
    "accessPath": [
      "postSubscriptionsSubscriptionResume"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "billing_cycle_anchor",
      "expand",
      "proration_behavior",
      "proration_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/subscriptions/{subscription}/resume",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resume a subscription"
  },
  "GetTaxAssociationsFind": {
    "accessPath": [
      "getTaxAssociationsFind"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/associations/find",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand",
      "payment_intent"
    ],
    "description": "Find a Tax Association",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded.",
      "payment_intent": "Valid [PaymentIntent](https://docs.stripe.com/api/payment_intents/object) id"
    }
  },
  "PostTaxCalculations": {
    "accessPath": [
      "postTaxCalculations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "currency",
      "customer",
      "customer_details",
      "expand",
      "line_items",
      "ship_from_details",
      "shipping_cost",
      "tax_date"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax/calculations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Calculation"
  },
  "GetTaxCalculationsCalculation": {
    "accessPath": [
      "getTaxCalculationsCalculation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/calculations/{calculation}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calculation"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Calculation",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTaxCalculationsCalculationLineItems": {
    "accessPath": [
      "getTaxCalculationsCalculationLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/calculations/{calculation}/line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "calculation"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a Calculation's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetTaxRegistrations": {
    "accessPath": [
      "getTaxRegistrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/registrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List registrations",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "The status of the Tax Registration."
    }
  },
  "PostTaxRegistrations": {
    "accessPath": [
      "postTaxRegistrations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active_from",
      "country",
      "country_options",
      "expand",
      "expires_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax/registrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a registration"
  },
  "GetTaxRegistrationsId": {
    "accessPath": [
      "getTaxRegistrationsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/registrations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a registration",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTaxRegistrationsId": {
    "accessPath": [
      "postTaxRegistrationsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active_from",
      "expand",
      "expires_at"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax/registrations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a registration"
  },
  "GetTaxSettings": {
    "accessPath": [
      "getTaxSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve settings",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTaxSettings": {
    "accessPath": [
      "postTaxSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "defaults",
      "expand",
      "head_office"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update settings"
  },
  "PostTaxTransactionsCreateFromCalculation": {
    "accessPath": [
      "postTaxTransactionsCreateFromCalculation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "calculation",
      "expand",
      "metadata",
      "posted_at",
      "reference"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax/transactions/create_from_calculation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Transaction from a Calculation"
  },
  "PostTaxTransactionsCreateReversal": {
    "accessPath": [
      "postTaxTransactionsCreateReversal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "flat_amount",
      "line_items",
      "metadata",
      "mode",
      "original_transaction",
      "reference",
      "shipping_cost"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax/transactions/create_reversal",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a reversal Transaction"
  },
  "GetTaxTransactionsTransaction": {
    "accessPath": [
      "getTaxTransactionsTransaction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/transactions/{transaction}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTaxTransactionsTransactionLineItems": {
    "accessPath": [
      "getTaxTransactionsTransactionLineItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax/transactions/{transaction}/line_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "Retrieve a Transaction's line items",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetTaxCodes": {
    "accessPath": [
      "getTaxCodes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax_codes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all tax codes",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "GetTaxCodesId": {
    "accessPath": [
      "getTaxCodesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax_codes/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a tax code",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTaxIds": {
    "accessPath": [
      "getTaxIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax_ids",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "owner",
      "starting_after"
    ],
    "description": "List all tax IDs",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "owner": "The account or customer the tax ID belongs to. Defaults to `owner[type]=self`.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostTaxIds": {
    "accessPath": [
      "postTaxIds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "owner",
      "type",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax_ids",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a tax ID"
  },
  "DeleteTaxIdsId": {
    "accessPath": [
      "deleteTaxIdsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/tax_ids/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a tax ID"
  },
  "GetTaxIdsId": {
    "accessPath": [
      "getTaxIdsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax_ids/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a tax ID",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTaxRates": {
    "accessPath": [
      "getTaxRates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax_rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "active",
      "created",
      "ending_before",
      "expand",
      "inclusive",
      "limit",
      "starting_after"
    ],
    "description": "List all tax rates",
    "parameterDescriptions": {
      "active": "Optional flag to filter by tax rates that are either active or inactive (archived).",
      "created": "Optional range for filtering created date.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "inclusive": "Optional flag to filter by tax rates that are inclusive (or those that are not inclusive).",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostTaxRates": {
    "accessPath": [
      "postTaxRates"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "country",
      "description",
      "display_name",
      "expand",
      "inclusive",
      "jurisdiction",
      "metadata",
      "percentage",
      "state",
      "tax_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax_rates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a tax rate"
  },
  "GetTaxRatesTaxRate": {
    "accessPath": [
      "getTaxRatesTaxRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tax_rates/{tax_rate}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tax_rate"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a tax rate",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTaxRatesTaxRate": {
    "accessPath": [
      "postTaxRatesTaxRate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "active",
      "country",
      "description",
      "display_name",
      "expand",
      "jurisdiction",
      "metadata",
      "state",
      "tax_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tax_rates/{tax_rate}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tax_rate"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a tax rate"
  },
  "GetTerminalConfigurations": {
    "accessPath": [
      "getTerminalConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/terminal/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "is_account_default",
      "limit",
      "starting_after"
    ],
    "description": "List all Configurations",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "is_account_default": "if present, only return the account default or non-default configurations.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostTerminalConfigurations": {
    "accessPath": [
      "postTerminalConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "cellular",
      "expand",
      "name",
      "offline",
      "reboot_window",
      "stripe_s700",
      "stripe_s710",
      "tipping",
      "verifone_m425",
      "verifone_p400",
      "verifone_p630",
      "verifone_ux700",
      "verifone_v660p",
      "wifi"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Configuration"
  },
  "DeleteTerminalConfigurationsConfiguration": {
    "accessPath": [
      "deleteTerminalConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/terminal/configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Configuration"
  },
  "GetTerminalConfigurationsConfiguration": {
    "accessPath": [
      "getTerminalConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/terminal/configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Configuration",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTerminalConfigurationsConfiguration": {
    "accessPath": [
      "postTerminalConfigurationsConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "cellular",
      "expand",
      "name",
      "offline",
      "reboot_window",
      "stripe_s700",
      "stripe_s710",
      "tipping",
      "verifone_m425",
      "verifone_p400",
      "verifone_p630",
      "verifone_ux700",
      "verifone_v660p",
      "wifi"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/configurations/{configuration}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "configuration"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Configuration"
  },
  "PostTerminalConnectionTokens": {
    "accessPath": [
      "postTerminalConnectionTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "location"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/connection_tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Connection Token"
  },
  "GetTerminalLocations": {
    "accessPath": [
      "getTerminalLocations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/terminal/locations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all Locations",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostTerminalLocations": {
    "accessPath": [
      "postTerminalLocations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address_kana",
      "address_kanji",
      "configuration_overrides",
      "display_name",
      "display_name_kana",
      "display_name_kanji",
      "expand",
      "metadata",
      "phone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/locations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Location"
  },
  "DeleteTerminalLocationsLocation": {
    "accessPath": [
      "deleteTerminalLocationsLocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/terminal/locations/{location}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "location"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Location"
  },
  "GetTerminalLocationsLocation": {
    "accessPath": [
      "getTerminalLocationsLocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/terminal/locations/{location}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "location"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Location",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTerminalLocationsLocation": {
    "accessPath": [
      "postTerminalLocationsLocation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "address",
      "address_kana",
      "address_kanji",
      "configuration_overrides",
      "display_name",
      "display_name_kana",
      "display_name_kanji",
      "expand",
      "metadata",
      "phone"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/locations/{location}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "location"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Location"
  },
  "PostTerminalOnboardingLinks": {
    "accessPath": [
      "postTerminalOnboardingLinks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "link_options",
      "link_type",
      "on_behalf_of"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/onboarding_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an Onboarding Link"
  },
  "GetTerminalReaders": {
    "accessPath": [
      "getTerminalReaders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/terminal/readers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "device_type",
      "ending_before",
      "expand",
      "limit",
      "location",
      "serial_number",
      "starting_after",
      "status"
    ],
    "description": "List all Readers",
    "parameterDescriptions": {
      "device_type": "Filters readers by device type",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "location": "A location ID to filter the response list to only readers at the specific location",
      "serial_number": "Filters readers by serial number",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "A status filter to filter readers to only offline or online readers"
    }
  },
  "PostTerminalReaders": {
    "accessPath": [
      "postTerminalReaders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "label",
      "location",
      "metadata",
      "registration_code"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a Reader"
  },
  "DeleteTerminalReadersReader": {
    "accessPath": [
      "deleteTerminalReadersReader"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/terminal/readers/{reader}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a Reader"
  },
  "GetTerminalReadersReader": {
    "accessPath": [
      "getTerminalReadersReader"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/terminal/readers/{reader}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Reader",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTerminalReadersReader": {
    "accessPath": [
      "postTerminalReadersReader"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "label",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a Reader"
  },
  "PostTerminalReadersReaderCancelAction": {
    "accessPath": [
      "postTerminalReadersReaderCancelAction"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/cancel_action",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel the current reader action"
  },
  "PostTerminalReadersReaderCollectInputs": {
    "accessPath": [
      "postTerminalReadersReaderCollectInputs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "inputs",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/collect_inputs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Collect inputs using a Reader"
  },
  "PostTerminalReadersReaderCollectPaymentMethod": {
    "accessPath": [
      "postTerminalReadersReaderCollectPaymentMethod"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "collect_config",
      "expand",
      "payment_intent"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/collect_payment_method",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Hand off a PaymentIntent to a Reader and collect card details"
  },
  "PostTerminalReadersReaderConfirmPaymentIntent": {
    "accessPath": [
      "postTerminalReadersReaderConfirmPaymentIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "confirm_config",
      "expand",
      "payment_intent"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/confirm_payment_intent",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Confirm a PaymentIntent on the Reader"
  },
  "PostTerminalReadersReaderProcessPaymentIntent": {
    "accessPath": [
      "postTerminalReadersReaderProcessPaymentIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "payment_intent",
      "process_config"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/process_payment_intent",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Hand-off a PaymentIntent to a Reader"
  },
  "PostTerminalReadersReaderProcessSetupIntent": {
    "accessPath": [
      "postTerminalReadersReaderProcessSetupIntent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "allow_redisplay",
      "expand",
      "process_config",
      "setup_intent"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/process_setup_intent",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Hand-off a SetupIntent to a Reader"
  },
  "PostTerminalReadersReaderRefundPayment": {
    "accessPath": [
      "postTerminalReadersReaderRefundPayment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "charge",
      "expand",
      "metadata",
      "payment_intent",
      "refund_application_fee",
      "refund_payment_config",
      "reverse_transfer"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/refund_payment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refund a Charge or a PaymentIntent in-person"
  },
  "PostTerminalReadersReaderSetReaderDisplay": {
    "accessPath": [
      "postTerminalReadersReaderSetReaderDisplay"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cart",
      "expand",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/readers/{reader}/set_reader_display",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set reader display"
  },
  "PostTerminalRefunds": {
    "accessPath": [
      "postTerminalRefunds"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/terminal/refunds",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a refund using a Terminal-supported device."
  },
  "PostTestHelpersConfirmationTokens": {
    "accessPath": [
      "postTestHelpersConfirmationTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "payment_method",
      "payment_method_data",
      "payment_method_options",
      "return_url",
      "setup_future_usage",
      "shipping"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/confirmation_tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test Confirmation Token"
  },
  "PostTestHelpersCustomersCustomerFundCashBalance": {
    "accessPath": [
      "postTestHelpersCustomersCustomerFundCashBalance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "expand",
      "reference"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/customers/{customer}/fund_cash_balance",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "customer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fund a test mode cash balance"
  },
  "PostTestHelpersIssuingAuthorizations": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "amount_details",
      "authorization_method",
      "card",
      "currency",
      "expand",
      "fleet",
      "fraud_disputability_likelihood",
      "fuel",
      "is_amount_controllable",
      "merchant_amount",
      "merchant_currency",
      "merchant_data",
      "network_data",
      "risk_assessment",
      "verification_data",
      "wallet"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test-mode authorization"
  },
  "PostTestHelpersIssuingAuthorizationsAuthorizationCapture": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizationsAuthorizationCapture"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "capture_amount",
      "close_authorization",
      "expand",
      "purchase_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations/{authorization}/capture",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Capture a test-mode authorization"
  },
  "PostTestHelpersIssuingAuthorizationsAuthorizationExpire": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizationsAuthorizationExpire"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations/{authorization}/expire",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Expire a test-mode authorization"
  },
  "PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "final_amount",
      "fleet",
      "fuel"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Finalize a test-mode authorization's amount"
  },
  "PostTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizationsAuthorizationFraudChallengesRespond"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "confirmed",
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Respond to fraud challenge"
  },
  "PostTestHelpersIssuingAuthorizationsAuthorizationIncrement": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizationsAuthorizationIncrement"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "increment_amount",
      "is_amount_controllable"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations/{authorization}/increment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Increment a test-mode authorization"
  },
  "PostTestHelpersIssuingAuthorizationsAuthorizationReverse": {
    "accessPath": [
      "postTestHelpersIssuingAuthorizationsAuthorizationReverse"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "reverse_amount"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/authorizations/{authorization}/reverse",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authorization"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reverse a test-mode authorization"
  },
  "PostTestHelpersIssuingCardsCardShippingDeliver": {
    "accessPath": [
      "postTestHelpersIssuingCardsCardShippingDeliver"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/cards/{card}/shipping/deliver",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deliver a testmode card"
  },
  "PostTestHelpersIssuingCardsCardShippingFail": {
    "accessPath": [
      "postTestHelpersIssuingCardsCardShippingFail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/cards/{card}/shipping/fail",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Fail a testmode card"
  },
  "PostTestHelpersIssuingCardsCardShippingReturn": {
    "accessPath": [
      "postTestHelpersIssuingCardsCardShippingReturn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/cards/{card}/shipping/return",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Return a testmode card"
  },
  "PostTestHelpersIssuingCardsCardShippingShip": {
    "accessPath": [
      "postTestHelpersIssuingCardsCardShippingShip"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/cards/{card}/shipping/ship",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Ship a testmode card"
  },
  "PostTestHelpersIssuingCardsCardShippingSubmit": {
    "accessPath": [
      "postTestHelpersIssuingCardsCardShippingSubmit"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/cards/{card}/shipping/submit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "card"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit a testmode card"
  },
  "PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate": {
    "accessPath": [
      "postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignActivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "personalization_design"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Activate a testmode personalization design"
  },
  "PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate": {
    "accessPath": [
      "postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignDeactivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "personalization_design"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deactivate a testmode personalization design"
  },
  "PostTestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject": {
    "accessPath": [
      "postTestHelpersIssuingPersonalizationDesignsPersonalizationDesignReject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "rejection_reasons"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "personalization_design"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reject a testmode personalization design"
  },
  "PostTestHelpersIssuingSettlements": {
    "accessPath": [
      "postTestHelpersIssuingSettlements"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bin",
      "clearing_date",
      "currency",
      "expand",
      "interchange_fees_amount",
      "net_total_amount",
      "network",
      "network_settlement_identifier",
      "transaction_amount",
      "transaction_count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/settlements",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test-mode settlement"
  },
  "PostTestHelpersIssuingSettlementsSettlementComplete": {
    "accessPath": [
      "postTestHelpersIssuingSettlementsSettlementComplete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/settlements/{settlement}/complete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "settlement"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Complete a test-mode settlement",
    "parameterDescriptions": {
      "settlement": "The settlement token to mark as complete."
    }
  },
  "PostTestHelpersIssuingTransactionsCreateForceCapture": {
    "accessPath": [
      "postTestHelpersIssuingTransactionsCreateForceCapture"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "card",
      "currency",
      "expand",
      "merchant_data",
      "purchase_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/transactions/create_force_capture",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test-mode force capture"
  },
  "PostTestHelpersIssuingTransactionsCreateUnlinkedRefund": {
    "accessPath": [
      "postTestHelpersIssuingTransactionsCreateUnlinkedRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "card",
      "currency",
      "expand",
      "merchant_data",
      "purchase_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/transactions/create_unlinked_refund",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test-mode unlinked refund"
  },
  "PostTestHelpersIssuingTransactionsTransactionRefund": {
    "accessPath": [
      "postTestHelpersIssuingTransactionsTransactionRefund"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "refund_amount"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/issuing/transactions/{transaction}/refund",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transaction"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refund a test-mode transaction"
  },
  "PostTestHelpersRefundsRefundExpire": {
    "accessPath": [
      "postTestHelpersRefundsRefundExpire"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/refunds/{refund}/expire",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "refund"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Expire a pending refund."
  },
  "PostTestHelpersTerminalReadersReaderPresentPaymentMethod": {
    "accessPath": [
      "postTestHelpersTerminalReadersReaderPresentPaymentMethod"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount_tip",
      "card",
      "card_present",
      "expand",
      "interac_present",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/terminal/readers/{reader}/present_payment_method",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate presenting a payment method"
  },
  "PostTestHelpersTerminalReadersReaderSucceedInputCollection": {
    "accessPath": [
      "postTestHelpersTerminalReadersReaderSucceedInputCollection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "skip_non_required_inputs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate a successful input collection"
  },
  "PostTestHelpersTerminalReadersReaderTimeoutInputCollection": {
    "accessPath": [
      "postTestHelpersTerminalReadersReaderTimeoutInputCollection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "reader"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulate an input collection timeout"
  },
  "GetTestHelpersTestClocks": {
    "accessPath": [
      "getTestHelpersTestClocks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/test_helpers/test_clocks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all test clocks",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostTestHelpersTestClocks": {
    "accessPath": [
      "postTestHelpersTestClocks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "customer",
      "expand",
      "frozen_time",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/test_clocks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a test clock"
  },
  "DeleteTestHelpersTestClocksTestClock": {
    "accessPath": [
      "deleteTestHelpersTestClocksTestClock"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/test_helpers/test_clocks/{test_clock}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_clock"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a test clock"
  },
  "GetTestHelpersTestClocksTestClock": {
    "accessPath": [
      "getTestHelpersTestClocksTestClock"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/test_helpers/test_clocks/{test_clock}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_clock"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a test clock",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTestHelpersTestClocksTestClockAdvance": {
    "accessPath": [
      "postTestHelpersTestClocksTestClockAdvance"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "frozen_time"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/test_clocks/{test_clock}/advance",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_clock"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Advance a test clock"
  },
  "PostTestHelpersTreasuryInboundTransfersIdFail": {
    "accessPath": [
      "postTestHelpersTreasuryInboundTransfersIdFail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "failure_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/inbound_transfers/{id}/fail",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Fail an InboundTransfer"
  },
  "PostTestHelpersTreasuryInboundTransfersIdReturn": {
    "accessPath": [
      "postTestHelpersTreasuryInboundTransfersIdReturn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/inbound_transfers/{id}/return",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Return an InboundTransfer"
  },
  "PostTestHelpersTreasuryInboundTransfersIdSucceed": {
    "accessPath": [
      "postTestHelpersTreasuryInboundTransfersIdSucceed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/inbound_transfers/{id}/succeed",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Succeed an InboundTransfer"
  },
  "PostTestHelpersTreasuryOutboundPaymentsId": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundPaymentsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "tracking_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_payments/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Update an OutboundPayment"
  },
  "PostTestHelpersTreasuryOutboundPaymentsIdFail": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundPaymentsIdFail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_payments/{id}/fail",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Fail an OutboundPayment"
  },
  "PostTestHelpersTreasuryOutboundPaymentsIdPost": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundPaymentsIdPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_payments/{id}/post",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Post an OutboundPayment"
  },
  "PostTestHelpersTreasuryOutboundPaymentsIdReturn": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundPaymentsIdReturn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "returned_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_payments/{id}/return",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Return an OutboundPayment"
  },
  "PostTestHelpersTreasuryOutboundTransfersOutboundTransfer": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundTransfersOutboundTransfer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "tracking_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "outbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Update an OutboundTransfer"
  },
  "PostTestHelpersTreasuryOutboundTransfersOutboundTransferFail": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundTransfersOutboundTransferFail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "outbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Fail an OutboundTransfer"
  },
  "PostTestHelpersTreasuryOutboundTransfersOutboundTransferPost": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundTransfersOutboundTransferPost"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "outbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Post an OutboundTransfer"
  },
  "PostTestHelpersTreasuryOutboundTransfersOutboundTransferReturn": {
    "accessPath": [
      "postTestHelpersTreasuryOutboundTransfersOutboundTransferReturn"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "returned_details"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "outbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Return an OutboundTransfer"
  },
  "PostTestHelpersTreasuryReceivedCredits": {
    "accessPath": [
      "postTestHelpersTreasuryReceivedCredits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "expand",
      "financial_account",
      "initiating_payment_method_details",
      "network"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/received_credits",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Create a ReceivedCredit"
  },
  "PostTestHelpersTreasuryReceivedDebits": {
    "accessPath": [
      "postTestHelpersTreasuryReceivedDebits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "expand",
      "financial_account",
      "initiating_payment_method_details",
      "network"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/test_helpers/treasury/received_debits",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Test mode: Create a ReceivedDebit"
  },
  "PostTokens": {
    "accessPath": [
      "postTokens"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account",
      "bank_account",
      "card",
      "customer",
      "cvc_update",
      "expand",
      "person",
      "pii"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/tokens",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a CVC update token"
  },
  "GetTokensToken": {
    "accessPath": [
      "getTokensToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/tokens/{token}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a token",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTopups": {
    "accessPath": [
      "getTopups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/topups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "amount",
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all top-ups",
    "parameterDescriptions": {
      "amount": "A positive integer representing how much to transfer.",
      "created": "A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return top-ups that have the given status. One of `canceled`, `failed`, `pending` or `succeeded`."
    }
  },
  "PostTopups": {
    "accessPath": [
      "postTopups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "expand",
      "metadata",
      "source",
      "statement_descriptor",
      "transfer_group"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/topups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a top-up"
  },
  "GetTopupsTopup": {
    "accessPath": [
      "getTopupsTopup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/topups/{topup}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "topup"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a top-up",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTopupsTopup": {
    "accessPath": [
      "postTopupsTopup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/topups/{topup}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "topup"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a top-up"
  },
  "PostTopupsTopupCancel": {
    "accessPath": [
      "postTopupsTopupCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/topups/{topup}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "topup"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel a top-up"
  },
  "GetTransfers": {
    "accessPath": [
      "getTransfers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/transfers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "destination",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "transfer_group"
    ],
    "description": "List all transfers",
    "parameterDescriptions": {
      "created": "Only return transfers that were created during the given date interval.",
      "destination": "Only return transfers for the destination specified by this account ID.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "transfer_group": "Only return transfers with the specified transfer group."
    }
  },
  "PostTransfers": {
    "accessPath": [
      "postTransfers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "destination",
      "expand",
      "metadata",
      "source_transaction",
      "source_type",
      "transfer_group"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/transfers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a transfer"
  },
  "GetTransfersIdReversals": {
    "accessPath": [
      "getTransfersIdReversals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/transfers/{id}/reversals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all reversals",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostTransfersIdReversals": {
    "accessPath": [
      "postTransfersIdReversals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "description",
      "expand",
      "metadata",
      "refund_application_fee"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/transfers/{id}/reversals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a transfer reversal"
  },
  "GetTransfersTransfer": {
    "accessPath": [
      "getTransfersTransfer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/transfers/{transfer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a transfer",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTransfersTransfer": {
    "accessPath": [
      "postTransfersTransfer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/transfers/{transfer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a transfer"
  },
  "GetTransfersTransferReversalsId": {
    "accessPath": [
      "getTransfersTransferReversalsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/transfers/{transfer}/reversals/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a reversal",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTransfersTransferReversalsId": {
    "accessPath": [
      "postTransfersTransferReversalsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/transfers/{transfer}/reversals/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a reversal"
  },
  "GetTreasuryCreditReversals": {
    "accessPath": [
      "getTreasuryCreditReversals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/credit_reversals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "received_credit",
      "starting_after",
      "status"
    ],
    "description": "List all CreditReversals",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "received_credit": "Only return CreditReversals for the ReceivedCredit ID.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return CreditReversals for a given status."
    }
  },
  "PostTreasuryCreditReversals": {
    "accessPath": [
      "postTreasuryCreditReversals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata",
      "received_credit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/credit_reversals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a CreditReversal"
  },
  "GetTreasuryCreditReversalsCreditReversal": {
    "accessPath": [
      "getTreasuryCreditReversalsCreditReversal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/credit_reversals/{credit_reversal}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "credit_reversal"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a CreditReversal",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTreasuryDebitReversals": {
    "accessPath": [
      "getTreasuryDebitReversals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/debit_reversals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "received_debit",
      "resolution",
      "starting_after",
      "status"
    ],
    "description": "List all DebitReversals",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "received_debit": "Only return DebitReversals for the ReceivedDebit ID.",
      "resolution": "Only return DebitReversals for a given resolution.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return DebitReversals for a given status."
    }
  },
  "PostTreasuryDebitReversals": {
    "accessPath": [
      "postTreasuryDebitReversals"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "metadata",
      "received_debit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/debit_reversals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a DebitReversal"
  },
  "GetTreasuryDebitReversalsDebitReversal": {
    "accessPath": [
      "getTreasuryDebitReversalsDebitReversal"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/debit_reversals/{debit_reversal}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "debit_reversal"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a DebitReversal",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTreasuryFinancialAccounts": {
    "accessPath": [
      "getTreasuryFinancialAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/financial_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all FinancialAccounts",
    "parameterDescriptions": {
      "created": "Only return FinancialAccounts that were created during the given date interval.",
      "ending_before": "An object ID cursor for use in pagination.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit ranging from 1 to 100 (defaults to 10).",
      "starting_after": "An object ID cursor for use in pagination.",
      "status": "Only return FinancialAccounts that have the given status: `open` or `closed`"
    }
  },
  "PostTreasuryFinancialAccounts": {
    "accessPath": [
      "postTreasuryFinancialAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "features",
      "metadata",
      "nickname",
      "platform_restrictions",
      "supported_currencies"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/financial_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a FinancialAccount"
  },
  "GetTreasuryFinancialAccountsFinancialAccount": {
    "accessPath": [
      "getTreasuryFinancialAccountsFinancialAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/financial_accounts/{financial_account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "financial_account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a FinancialAccount",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTreasuryFinancialAccountsFinancialAccount": {
    "accessPath": [
      "postTreasuryFinancialAccountsFinancialAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "features",
      "forwarding_settings",
      "metadata",
      "nickname",
      "platform_restrictions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/financial_accounts/{financial_account}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "financial_account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a FinancialAccount"
  },
  "PostTreasuryFinancialAccountsFinancialAccountClose": {
    "accessPath": [
      "postTreasuryFinancialAccountsFinancialAccountClose"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand",
      "forwarding_settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/financial_accounts/{financial_account}/close",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "financial_account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Close a FinancialAccount"
  },
  "GetTreasuryFinancialAccountsFinancialAccountFeatures": {
    "accessPath": [
      "getTreasuryFinancialAccountsFinancialAccountFeatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/financial_accounts/{financial_account}/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "financial_account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve FinancialAccount Features",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTreasuryFinancialAccountsFinancialAccountFeatures": {
    "accessPath": [
      "postTreasuryFinancialAccountsFinancialAccountFeatures"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "card_issuing",
      "deposit_insurance",
      "expand",
      "financial_addresses",
      "inbound_transfers",
      "intra_stripe_flows",
      "outbound_payments",
      "outbound_transfers"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/financial_accounts/{financial_account}/features",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "financial_account"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update FinancialAccount Features"
  },
  "GetTreasuryInboundTransfers": {
    "accessPath": [
      "getTreasuryInboundTransfers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/inbound_transfers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all InboundTransfers",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return InboundTransfers that have the given status: `processing`, `succeeded`, `failed` or `canceled`."
    }
  },
  "PostTreasuryInboundTransfers": {
    "accessPath": [
      "postTreasuryInboundTransfers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "expand",
      "financial_account",
      "metadata",
      "origin_payment_method",
      "statement_descriptor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/inbound_transfers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an InboundTransfer"
  },
  "GetTreasuryInboundTransfersId": {
    "accessPath": [
      "getTreasuryInboundTransfersId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/inbound_transfers/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an InboundTransfer",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTreasuryInboundTransfersInboundTransferCancel": {
    "accessPath": [
      "postTreasuryInboundTransfersInboundTransferCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/inbound_transfers/{inbound_transfer}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "inbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel an InboundTransfer"
  },
  "GetTreasuryOutboundPayments": {
    "accessPath": [
      "getTreasuryOutboundPayments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/outbound_payments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "customer",
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all OutboundPayments",
    "parameterDescriptions": {
      "created": "Only return OutboundPayments that were created during the given date interval.",
      "customer": "Only return OutboundPayments sent to this customer.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return OutboundPayments that have the given status: `processing`, `failed`, `posted`, `returned`, or `canceled`."
    }
  },
  "PostTreasuryOutboundPayments": {
    "accessPath": [
      "postTreasuryOutboundPayments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "customer",
      "description",
      "destination_payment_method",
      "destination_payment_method_data",
      "destination_payment_method_options",
      "end_user_details",
      "expand",
      "financial_account",
      "metadata",
      "statement_descriptor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/outbound_payments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an OutboundPayment"
  },
  "GetTreasuryOutboundPaymentsId": {
    "accessPath": [
      "getTreasuryOutboundPaymentsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/outbound_payments/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an OutboundPayment",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTreasuryOutboundPaymentsIdCancel": {
    "accessPath": [
      "postTreasuryOutboundPaymentsIdCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/outbound_payments/{id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel an OutboundPayment"
  },
  "GetTreasuryOutboundTransfers": {
    "accessPath": [
      "getTreasuryOutboundTransfers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/outbound_transfers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all OutboundTransfers",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return OutboundTransfers that have the given status: `processing`, `canceled`, `failed`, `posted`, or `returned`."
    }
  },
  "PostTreasuryOutboundTransfers": {
    "accessPath": [
      "postTreasuryOutboundTransfers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "amount",
      "currency",
      "description",
      "destination_payment_method",
      "destination_payment_method_data",
      "destination_payment_method_options",
      "expand",
      "financial_account",
      "metadata",
      "statement_descriptor"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/outbound_transfers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create an OutboundTransfer"
  },
  "GetTreasuryOutboundTransfersOutboundTransfer": {
    "accessPath": [
      "getTreasuryOutboundTransfersOutboundTransfer"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/outbound_transfers/{outbound_transfer}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "outbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve an OutboundTransfer",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostTreasuryOutboundTransfersOutboundTransferCancel": {
    "accessPath": [
      "postTreasuryOutboundTransfersOutboundTransferCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "expand"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/treasury/outbound_transfers/{outbound_transfer}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "outbound_transfer"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel an OutboundTransfer"
  },
  "GetTreasuryReceivedCredits": {
    "accessPath": [
      "getTreasuryReceivedCredits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/received_credits",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "linked_flows",
      "starting_after",
      "status"
    ],
    "description": "List all ReceivedCredits",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "The FinancialAccount that received the funds.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "linked_flows": "Only return ReceivedCredits described by the flow.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return ReceivedCredits that have the given status: `succeeded` or `failed`."
    }
  },
  "GetTreasuryReceivedCreditsId": {
    "accessPath": [
      "getTreasuryReceivedCreditsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/received_credits/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a ReceivedCredit",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTreasuryReceivedDebits": {
    "accessPath": [
      "getTreasuryReceivedDebits"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/received_debits",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "starting_after",
      "status"
    ],
    "description": "List all ReceivedDebits",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "The FinancialAccount that funds were pulled from.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return ReceivedDebits that have the given status: `succeeded` or `failed`."
    }
  },
  "GetTreasuryReceivedDebitsId": {
    "accessPath": [
      "getTreasuryReceivedDebitsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/received_debits/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a ReceivedDebit",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTreasuryTransactionEntries": {
    "accessPath": [
      "getTreasuryTransactionEntries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/transaction_entries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "effective_at",
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "order_by",
      "starting_after",
      "transaction"
    ],
    "description": "List all TransactionEntries",
    "parameterDescriptions": {
      "created": "Only return TransactionEntries that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "order_by": "The results are in reverse chronological order by `created` or `effective_at`. The default is `created`.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "transaction": "Only return TransactionEntries associated with this Transaction."
    }
  },
  "GetTreasuryTransactionEntriesId": {
    "accessPath": [
      "getTreasuryTransactionEntriesId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/transaction_entries/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a TransactionEntry",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetTreasuryTransactions": {
    "accessPath": [
      "getTreasuryTransactions"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/transactions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "created",
      "ending_before",
      "expand",
      "financial_account",
      "limit",
      "order_by",
      "starting_after",
      "status",
      "status_transitions"
    ],
    "description": "List all Transactions",
    "parameterDescriptions": {
      "created": "Only return Transactions that were created during the given date interval.",
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "financial_account": "Returns objects associated with this FinancialAccount.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "order_by": "The results are in reverse chronological order by `created` or `posted_at`. The default is `created`.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.",
      "status": "Only return Transactions that have the given status: `open`, `posted`, or `void`.",
      "status_transitions": "A filter for the `status_transitions.posted_at` timestamp. When using this filter, `status=posted` and `order_by=posted_at` must also be specified."
    }
  },
  "GetTreasuryTransactionsId": {
    "accessPath": [
      "getTreasuryTransactionsId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/treasury/transactions/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a Transaction",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "GetWebhookEndpoints": {
    "accessPath": [
      "getWebhookEndpoints"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/webhook_endpoints",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ending_before",
      "expand",
      "limit",
      "starting_after"
    ],
    "description": "List all webhook endpoints",
    "parameterDescriptions": {
      "ending_before": "A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.",
      "expand": "Specifies which fields in the response should be expanded.",
      "limit": "A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.",
      "starting_after": "A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list."
    }
  },
  "PostWebhookEndpoints": {
    "accessPath": [
      "postWebhookEndpoints"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "api_version",
      "connect",
      "description",
      "enabled_events",
      "expand",
      "metadata",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webhook_endpoints",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a webhook endpoint"
  },
  "DeleteWebhookEndpointsWebhookEndpoint": {
    "accessPath": [
      "deleteWebhookEndpointsWebhookEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/webhook_endpoints/{webhook_endpoint}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_endpoint"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete a webhook endpoint"
  },
  "GetWebhookEndpointsWebhookEndpoint": {
    "accessPath": [
      "getWebhookEndpointsWebhookEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/webhook_endpoints/{webhook_endpoint}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_endpoint"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "expand"
    ],
    "description": "Retrieve a webhook endpoint",
    "parameterDescriptions": {
      "expand": "Specifies which fields in the response should be expanded."
    }
  },
  "PostWebhookEndpointsWebhookEndpoint": {
    "accessPath": [
      "postWebhookEndpointsWebhookEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "description",
      "disabled",
      "enabled_events",
      "expand",
      "metadata",
      "url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webhook_endpoints/{webhook_endpoint}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_endpoint"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a webhook endpoint"
  }
} satisfies ToolRuntimeMetadataMap;
