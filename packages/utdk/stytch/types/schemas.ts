export type ApiAttributeV1Attributes = {
  /** The IP address of the user. */
  ip_address?: string;
  /** The user agent of the User. */
  user_agent?: string;
};

export type ApiConnectedappsV1ConnectedApp = {
  /** The ID of the Connected App client. */
  client_id: string;
  /** A human-readable name for the client. */
  client_name: string;
  /** A human-readable description for the client. */
  client_description: string;
  status: string;
  /** Valid for first party clients only. If `true`, an authorization token granted to this Client can be exchanged for a full Stytch session. */
  full_access_allowed: boolean;
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: string;
  /** Array of redirect URI values for use in OAuth Authorization flows. */
  redirect_urls: (string)[];
  access_token_expiry_minutes: number;
  access_token_template_content: string;
  /** Array of redirect URI values for use in OIDC Logout flows. */
  post_logout_redirect_urls: (string)[];
  /** Valid for first party clients only. If true, the client does not need to request explicit user consent for the `offline_access` scope. */
  bypass_consent_for_offline_access: boolean;
  creation_method: string;
  /** The last four characters of the client secret. */
  client_secret_last_four?: string;
  /** The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists. */
  next_client_secret_last_four?: string;
  access_token_custom_audience?: string;
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
  client_id_metadata_url?: string;
};

export type ApiConnectedappsV1ConnectedAppPublic = {
  client_id: string;
  client_name: string;
  client_description: string;
  client_type: string;
  logo_url?: string;
};

export type ApiConnectedappsV1ConnectedAppWithClientSecret = {
  /** The ID of the Connected App client. */
  client_id: string;
  /** A human-readable name for the client. */
  client_name: string;
  /** A human-readable description for the client. */
  client_description: string;
  status: string;
  /** Valid for first party clients only. If `true`, an authorization token granted to this Client can be exchanged for a full Stytch session. */
  full_access_allowed: boolean;
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: string;
  /** Array of redirect URI values for use in OAuth Authorization flows. */
  redirect_urls: (string)[];
  access_token_expiry_minutes: number;
  access_token_template_content: string;
  /** Array of redirect URI values for use in OIDC Logout flows. */
  post_logout_redirect_urls: (string)[];
  /** Valid for first party clients only. If true, the client does not need to request explicit user consent for the `offline_access` scope. */
  bypass_consent_for_offline_access: boolean;
  /** The last four characters of the client secret. */
  client_secret_last_four?: string;
  /** The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists. */
  next_client_secret_last_four?: string;
  /** The secret of the Connected App client. **Required for confidential clients** */
  client_secret?: string;
  access_token_custom_audience?: string;
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
  client_id_metadata_url?: string;
};

export type ApiConnectedappsV1ConnectedAppWithNextClientSecret = {
  /** The ID of the Connected App client. */
  client_id: string;
  /** A human-readable name for the client. */
  client_name: string;
  /** A human-readable description for the client. */
  client_description: string;
  status: string;
  /** The last four characters of the client secret. */
  client_secret_last_four: string;
  /** Valid for first party clients only. If `true`, an authorization token granted to this Client can be exchanged for a full Stytch session. */
  full_access_allowed: boolean;
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: string;
  /** Array of redirect URI values for use in OAuth Authorization flows. */
  redirect_urls: (string)[];
  next_client_secret: string;
  access_token_expiry_minutes: number;
  access_token_template_content: string;
  /** Array of redirect URI values for use in OIDC Logout flows. */
  post_logout_redirect_urls: (string)[];
  /** Valid for first party clients only. If true, the client does not need to request explicit user consent for the `offline_access` scope. */
  bypass_consent_for_offline_access: boolean;
  /** The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists. */
  next_client_secret_last_four?: string;
  access_token_custom_audience?: string;
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
  client_id_metadata_url?: string;
};

export type ApiConnectedappsV1ResultsMetadata = {
  /** The total number of results returned by your search query. If totals have been disabled for your Stytch Workspace to improve search performance, the value will always be -1. */
  total: number;
  /** The `next_cursor` string is returned when your search result contains more than one page of results. This value is passed into your next search call in the `cursor` field. */
  next_cursor?: string;
};

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsCreateRequest = {
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: ApiConnectedappsV1CreateRequestClientType;
  /** A human-readable name for the client. */
  client_name?: string;
  /** A human-readable description for the client. */
  client_description?: string;
  /** Array of redirect URI values for use in OAuth Authorization flows. */
  redirect_urls?: (string)[];
  /** Valid for first party clients only. If `true`, an authorization token granted to this Client can be exchanged for a full Stytch session. */
  full_access_allowed?: boolean;
  /** The number of minutes before the access token expires. The default is 60 minutes. */
  access_token_expiry_minutes?: number;
  /** The custom audience for the access token. */
  access_token_custom_audience?: string;
  /** The content of the access token custom claims template. The template must be a valid JSON object. */
  access_token_template_content?: string;
  /** Array of redirect URI values for use in OIDC Logout flows. */
  post_logout_redirect_urls?: (string)[];
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
  /** Valid for first party clients only. If true, the client does not need to request explicit user consent for the `offline_access` scope. */
  bypass_consent_for_offline_access?: boolean;
};

export type ApiConnectedappsV1ConnectedAppsClientsCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Connected App created by this API call. */
  connected_app: ApiConnectedappsV1ConnectedAppWithClientSecret;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiConnectedappsV1ConnectedAppsClientsDeleteResponse = {
  request_id: string;
  /** The ID of the client. */
  client_id: string;
  status_code: number;
};

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsGetRequest = { [key: string]: unknown };

export type ApiConnectedappsV1ConnectedAppsClientsGetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Connected App affected by this operation. */
  connected_app: ApiConnectedappsV1ConnectedApp;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsSearchRequest = {
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
};

export type ApiConnectedappsV1ConnectedAppsClientsSearchResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  connected_apps: (ApiConnectedappsV1ConnectedApp)[];
  /** The search `results_metadata` object contains metadata relevant to your specific query like total and `next_cursor`. */
  results_metadata: ApiConnectedappsV1ResultsMetadata;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsUpdateRequest = {
  /** A human-readable name for the client. */
  client_name?: string;
  /** A human-readable description for the client. */
  client_description?: string;
  /** Array of redirect URI values for use in OAuth Authorization flows. */
  redirect_urls?: (string)[];
  /** Valid for first party clients only. If `true`, an authorization token granted to this Client can be exchanged for a full Stytch session. */
  full_access_allowed?: boolean;
  /** The number of minutes before the access token expires. The default is 60 minutes. */
  access_token_expiry_minutes?: number;
  /** The custom audience for the access token. */
  access_token_custom_audience?: string;
  /** The content of the access token custom claims template. The template must be a valid JSON object. */
  access_token_template_content?: string;
  /** Array of redirect URI values for use in OIDC Logout flows. */
  post_logout_redirect_urls?: (string)[];
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
  /** Valid for first party clients only. If true, the client does not need to request explicit user consent for the `offline_access` scope. */
  bypass_consent_for_offline_access?: boolean;
};

export type ApiConnectedappsV1ConnectedAppsClientsUpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Connected App affected by this operation. */
  connected_app: ApiConnectedappsV1ConnectedApp;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiConnectedappsV1CreateRequestClientType = "first_party" | "first_party_public" | "third_party" | "third_party_public";

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsSecretsRotateCancelRequest = { [key: string]: unknown };

export type ApiConnectedappsV1ConnectedAppsClientsSecretsRotateCancelResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Connected App affected by this operation. */
  connected_app: ApiConnectedappsV1ConnectedApp;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsSecretsRotateRequest = { [key: string]: unknown };

export type ApiConnectedappsV1ConnectedAppsClientsSecretsRotateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Connected App affected by this operation. */
  connected_app: ApiConnectedappsV1ConnectedApp;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiConnectedappsV1ConnectedAppsClientsSecretsRotateStartRequest = { [key: string]: unknown };

export type ApiConnectedappsV1ConnectedAppsClientsSecretsRotateStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Connected App affected by this operation. */
  connected_app: ApiConnectedappsV1ConnectedAppWithNextClientSecret;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BScimV1Address = {
  formatted: string;
  street_address: string;
  locality: string;
  region: string;
  postal_code: string;
  country: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1Email = {
  value: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1EnterpriseExtension = {
  employee_number: string;
  cost_center: string;
  division: string;
  department: string;
  organization: string;
  manager?: ApiB2BScimV1Manager;
};

export type ApiB2BScimV1Entitlement = {
  value: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1Group = {
  value: string;
  display: string;
};

export type ApiB2BScimV1IMs = {
  value: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1Manager = {
  value: string;
  ref: string;
  display_name: string;
};

export type ApiB2BScimV1Name = {
  formatted: string;
  family_name: string;
  given_name: string;
  middle_name: string;
  honorific_prefix: string;
  honorific_suffix: string;
};

export type ApiB2BScimV1PhoneNumber = {
  value: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1Photo = {
  value: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1Role = {
  value: string;
  type: string;
  primary: boolean;
};

export type ApiB2BScimV1ScimAttributes = {
  user_name: string;
  id: string;
  external_id: string;
  active: boolean;
  groups: (ApiB2BScimV1Group)[];
  display_name: string;
  nick_name: string;
  profile_url: string;
  user_type: string;
  title: string;
  preferred_language: string;
  locale: string;
  timezone: string;
  emails: (ApiB2BScimV1Email)[];
  phone_numbers: (ApiB2BScimV1PhoneNumber)[];
  addresses: (ApiB2BScimV1Address)[];
  ims: (ApiB2BScimV1IMs)[];
  photos: (ApiB2BScimV1Photo)[];
  entitlements: (ApiB2BScimV1Entitlement)[];
  roles: (ApiB2BScimV1Role)[];
  x509certificates: (ApiB2BScimV1X509Certificate)[];
  name?: ApiB2BScimV1Name;
  enterprise_extension?: ApiB2BScimV1EnterpriseExtension;
};

export type ApiB2BScimV1ScimConnection = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The ID of the SCIM connection. */
  connection_id: string;
  /** The status of the connection. The possible values are deleted or active. */
  status: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  /** Name of the IdP. Enum with possible values: `okta`, `microsoft-entra`, `cyberark`, `jumpcloud`, `onelogin`, `pingfederate`, `rippling` or `generic`.   Specifying a known provider allows Stytch to handle any provider-specific logic, such as automatically appending `?aadOptscim062020` to the returned BaseURL for `microsoft-entra` SCIM Connections to [enable the SCIM 2.0 compliant flag](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#scim-20-compliance-issues-and-status). */
  identity_provider: string;
  /** The URL supplied to the Identity Provider (IdP) alongside the bearer token enabling access to Stytch's SCIM API endpoints */
  base_url: string;
  /** The last four digits of the bearer token. If you've lost access to your `bearer_token` and need to generate a new one, use the [SCIM rotate token start endpoint](https://stytch.com/docs/b2b/api/scim-rotate-token-start). */
  bearer_token_last_four: string;
  /** An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and a `role_id`. */
  scim_group_implicit_role_assignments: (ApiB2BScimV1ScimGroupImplicitRoleAssignments)[];
  next_bearer_token_last_four: string;
  /** The bearer token expiry time. */
  bearer_token_expires_at?: string;
  /** This field is supplied only during [token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start). The next bearer token expiry time. */
  next_bearer_token_expires_at?: string;
};

export type ApiB2BScimV1ScimConnectionWithNextToken = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The ID of the SCIM connection. */
  connection_id: string;
  /** The status of the connection. The possible values are deleted or active. */
  status: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  /** The URL supplied to the Identity Provider (IdP) alongside the bearer token enabling access to Stytch's SCIM API endpoints */
  base_url: string;
  /** Name of the IdP. Enum with possible values: `okta`, `microsoft-entra`, `cyberark`, `jumpcloud`, `onelogin`, `pingfederate`, `rippling` or `generic`.   Specifying a known provider allows Stytch to handle any provider-specific logic, such as automatically appending `?aadOptscim062020` to the returned BaseURL for `microsoft-entra` SCIM Connections to [enable the SCIM 2.0 compliant flag](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#scim-20-compliance-issues-and-status). */
  identity_provider: string;
  /** The last four digits of the bearer token. If you've lost access to your `bearer_token` and need to generate a new one, use the [SCIM rotate token start endpoint](https://stytch.com/docs/b2b/api/scim-rotate-token-start). */
  bearer_token_last_four: string;
  /** This field is supplied only during [token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start). This token should be used as the new bearer token for the SCIM connection after token rotation has been completed using the [SCIM rotate token complete endpoint](https://stytch.com/docs/b2b/api/scim-rotate-token-complete). */
  next_bearer_token: string;
  /** An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and a `role_id`. */
  scim_group_implicit_role_assignments: (ApiB2BScimV1ScimGroupImplicitRoleAssignments)[];
  /** The bearer token expiry time. */
  bearer_token_expires_at?: string;
  /** This field is supplied only during [token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start). The next bearer token expiry time. */
  next_bearer_token_expires_at?: string;
};

export type ApiB2BScimV1ScimConnectionWithToken = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The ID of the SCIM connection. */
  connection_id: string;
  /** The status of the connection. The possible values are deleted or active. */
  status: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  /** Name of the IdP. Enum with possible values: `okta`, `microsoft-entra`, `cyberark`, `jumpcloud`, `onelogin`, `pingfederate`, `rippling` or `generic`.   Specifying a known provider allows Stytch to handle any provider-specific logic, such as automatically appending `?aadOptscim062020` to the returned BaseURL for `microsoft-entra` SCIM Connections to [enable the SCIM 2.0 compliant flag](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#scim-20-compliance-issues-and-status). */
  identity_provider: string;
  /** The URL supplied to the Identity Provider (IdP) alongside the bearer token enabling access to Stytch's SCIM API endpoints */
  base_url: string;
  /** The token supplied to the Identity Provider (IdP) alongside the base URL that grants access to Stytch's SCIM API endpoints. It should be included in HTTP authorization headers. This field is supplied only on creation of the SCIM connection. */
  bearer_token: string;
  /** An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and a `role_id`. */
  scim_group_implicit_role_assignments: (ApiB2BScimV1ScimGroupImplicitRoleAssignments)[];
  /** The bearer token expiry time. */
  bearer_token_expires_at?: string;
};

export type ApiB2BScimV1ScimGroup = {
  /** Stytch-issued, globally unique UUID that identifies a specific SCIM Group. The entity `id` in the SCIM specification is issued by the Service Provider (SP) and returned to the Identity Provider (IdP) to store and use for uniquely identify and updating the Group moving forward. */
  group_id: string;
  /** The displayName of the SCIM group, sent from the Identity Provider (IdP). */
  group_name: string;
  /** Globally unique UUID that identifies a specific Organization. The organization_id is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The ID of the SCIM connection. */
  connection_id: string;
};

export type ApiB2BScimV1ScimGroupImplicitRoleAssignments = {
  /** The ID of the role. */
  role_id: string;
  /** The ID of the group. */
  group_id: string;
  group_name: string;
};

export type ApiB2BScimV1X509Certificate = {
  value: string;
  type: string;
  primary: boolean;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionCreateRequest = {
  /** A human-readable display name for the connection. */
  display_name?: string;
  identity_provider?: ApiB2BScimV1CreateRequestIdentityProvider;
};

export type ApiB2BScimV1B2BScimConnectionCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object). */
  connection?: ApiB2BScimV1ScimConnectionWithToken;
};

export type ApiB2BScimV1B2BScimConnectionDeleteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The `connection_id` that was deleted as part of the delete request. */
  connection_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionGetGroupsRequest = {
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
};

export type ApiB2BScimV1B2BScimConnectionGetGroupsResponse = {
  /** A list of SCIM Connection Groups belonging to the connection. */
  scim_groups: (ApiB2BScimV1ScimGroup)[];
  status_code: number;
  /** The `next_cursor` string is returned when your search result contains more than one page of results. This value is passed into your next search call in the `cursor` field. */
  next_cursor?: string;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionGetRequest = { [key: string]: unknown };

export type ApiB2BScimV1B2BScimConnectionGetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object). */
  connection?: ApiB2BScimV1ScimConnection;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionRotateCancelRequest = { [key: string]: unknown };

export type ApiB2BScimV1B2BScimConnectionRotateCancelResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object). */
  connection?: ApiB2BScimV1ScimConnection;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionRotateCompleteRequest = { [key: string]: unknown };

export type ApiB2BScimV1B2BScimConnectionRotateCompleteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object). */
  connection?: ApiB2BScimV1ScimConnection;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionRotateStartRequest = { [key: string]: unknown };

export type ApiB2BScimV1B2BScimConnectionRotateStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object). */
  connection?: ApiB2BScimV1ScimConnectionWithNextToken;
};

/** Request type */
export type ApiB2BScimV1B2BScimConnectionUpdateRequest = {
  /** A human-readable display name for the connection. */
  display_name?: string;
  identity_provider?: ApiB2BScimV1UpdateRequestIdentityProvider;
  /** An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and a `role_id`. */
  scim_group_implicit_role_assignments?: (ApiB2BScimV1ScimGroupImplicitRoleAssignments)[];
};

export type ApiB2BScimV1B2BScimConnectionUpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SCIM Connection Object](https://stytch.com/docs/b2b/api/scim-connection-object). */
  connection?: ApiB2BScimV1ScimConnection;
};

export type ApiB2BScimV1CreateRequestIdentityProvider = "generic" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling";

export type ApiB2BScimV1UpdateRequestIdentityProvider = "generic" | "okta" | "microsoft-entra" | "cyberark" | "jumpcloud" | "onelogin" | "pingfederate" | "rippling";

export type ApiOrganizationV1ActiveScimConnection = {
  /** The ID of the SCIM connection. */
  connection_id: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  bearer_token_last_four: string;
  bearer_token_expires_at?: string;
};

export type ApiOrganizationV1ActiveSsoConnection = {
  /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
  connection_id: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  identity_provider: string;
};

export type ApiOrganizationV1CustomRole = {
  role_id: string;
  description: string;
  permissions: (ApiOrganizationV1CustomRolePermission)[];
};

export type ApiOrganizationV1CustomRolePermission = {
  resource_id: string;
  actions: (string)[];
};

export type ApiOrganizationV1EmailImplicitRoleAssignment = {
  /** Email domain that grants the specified Role. */
  domain: string;
  /** The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.    Reserved `role_id`s that are predefined by Stytch include:    * `stytch_member`   * `stytch_admin`    Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  role_id: string;
};

export type ApiOrganizationV1GithubProviderInfo = {
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** All tenant IDs returned by the OAuth provider. These is typically used to identify organizations or groups within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the Workspace ID, and in GitHub this is an organization ID. Some OAuth providers do not return tenant IDs, some providers are guaranteed to return one, and some may return multiple. This field will always be populated if at least one tenant ID was returned from the OAuth provider and developers should prefer this field over `provider_tenant_id`. */
  provider_tenant_ids: (string)[];
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token: string;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
};

export type ApiOrganizationV1HubspotProviderInfo = {
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The tenant ID returned by the OAuth provider. This is typically used to identify an organization or group within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the Workspace ID, and in GitHub this is an organization ID. This field will only be populated if exactly one tenant ID is returned from a successful OAuth authentication and developers should prefer `provider_tenant_ids` over this since it accounts for the possibility of an OAuth provider yielding multiple tenant IDs. */
  provider_tenant_id: string;
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token: string;
  /** The number of seconds until the access token expires. */
  access_token_expires_in: number;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's API. */
  refresh_token?: string;
};

export type ApiOrganizationV1Member = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The email address of the Member. */
  email_address: string;
  /** The status of the Member. The possible values are: `pending`, `invited`, `active`, or `deleted`. */
  status: string;
  /** The name of the Member. */
  name: string;
  /** An array of registered [SAML Connection](https://stytch.com/docs/b2b/api/saml-connection-object) or [OIDC Connection](https://stytch.com/docs/b2b/api/oidc-connection-object) objects the Member has authenticated with. */
  sso_registrations: (ApiOrganizationV1SsoRegistration)[];
  /** Identifies the Member as a break glass user - someone who has permissions to authenticate into an Organization by bypassing the Organization's settings. A break glass account is typically used for emergency purposes to gain access outside of normal authentication procedures. Refer to the [Organization object](https://stytch.com/docs/b2b/api/organization-object) and its `auth_methods` and `allowed_auth_methods` fields for more details. */
  is_breakglass: boolean;
  /** Globally unique UUID that identifies a Member's password. */
  member_password_id: string;
  /** A list of OAuth registrations for this member. */
  oauth_registrations: (ApiOrganizationV1OAuthRegistration)[];
  /** Whether or not the Member's email address is verified. */
  email_address_verified: boolean;
  /** Whether or not the Member's phone number is verified. */
  mfa_phone_number_verified: boolean;
  /** Whether or not the Member has the `stytch_admin` Role. This Role is automatically granted to Members   who create an Organization through the [discovery flow](https://stytch.com/docs/b2b/api/create-organization-via-discovery). See the   [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for more details on this Role. */
  is_admin: boolean;
  /** Globally unique UUID that identifies a TOTP instance. */
  totp_registration_id: string;
  /**    A list of retired email addresses for this member.   A previously active email address can be marked as retired in one of two ways:   - It's replaced with a new primary email address during an explicit Member update.   - A new email address is surfaced by an OAuth, SAML or OIDC provider. In this case the new email address becomes the   Member's primary email address and the old primary email address is retired.     A retired email address cannot be used by other Members in the same Organization. However, unlinking retired email   addresses allows them to be subsequently re-used by other Organization Members. Retired email addresses can be unlinked   using the [Unlink Retired Email endpoint](https://stytch.com/docs/b2b/api/unlink-retired-member-email).    */
  retired_email_addresses: (ApiOrganizationV1RetiredEmail)[];
  /** Whether the Member is temporarily locked due to too many failed authentication attempts. See the [User Locking Guide](https://stytch.com/docs/resources/platform/user-locks) for more information. */
  is_locked: boolean;
  /** Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the Organization's MFA policy is set to `REQUIRED_FOR_ALL`. */
  mfa_enrolled: boolean;
  /** The Member's phone number. A Member may only have one phone number. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). */
  mfa_phone_number: string;
  /** The Member's default MFA method. This value is used to determine which secondary MFA method to use in the case of multiple methods registered for a Member. The current possible values are `sms_otp` and `totp`. */
  default_mfa_method: string;
  /** Explicit or implicit Roles assigned to this Member, along with details about the role assignment source.    See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. */
  roles: (ApiOrganizationV1MemberRole)[];
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** An arbitrary JSON object of application-specific data. These fields can be edited directly by the   frontend SDK, and should not be used to store critical information. See the [Metadata resource](https://stytch.com/docs/b2b/api/metadata)   for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** The timestamp of the Member's creation. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  created_at?: string;
  /** The timestamp of when the Member was last updated. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  updated_at?: string;
  /** A scim member registration, referencing a [SCIM Connection](https://stytch.com/docs/b2b/api/scim-connection-object) object in use for the Member creation. */
  scim_registration?: ApiOrganizationV1ScimRegistration;
  /** The ID of the member given by the identity provider. */
  external_id?: string;
  /** When the member lock was created, if there is one. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  lock_created_at?: string;
  /** When the member lock expires, if there is one. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  lock_expires_at?: string;
};

export type ApiOrganizationV1MemberConnectedApp = {
  /** The ID of the Connected App. */
  connected_app_id: string;
  /** The name of the Connected App. */
  name: string;
  /** A description of the Connected App. */
  description: string;
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: string;
  /** The scopes granted to the Connected App at the completion of the last authorization flow. */
  scopes_granted: string;
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
};

export type ApiOrganizationV1MemberRole = {
  /** The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.    Reserved `role_id`s that are predefined by Stytch include:    * `stytch_member`   * `stytch_admin`    Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  role_id: string;
  /** A list of sources for this role assignment. A role assignment can come from multiple sources - for example, the Role could be both explicitly assigned and implicitly granted from the Member's email domain. */
  sources: (ApiOrganizationV1MemberRoleSource)[];
};

export type ApiOrganizationV1MemberRoleSource = {
  /** The type of role assignment. The possible values are:     `direct_assignment` – an explicitly assigned Role.    Directly assigned roles can be updated by passing in the `roles` argument to the   [Update Member](https://stytch.com/docs/b2b/api/update-member) endpoint.     `email_assignment` – an implicit Role granted by the Member's email domain, regardless of their login method.    Email implicit role assignments can be updated by passing in the `rbac_email_implicit_role_assignments` argument to   the [Update Organization](https://stytch.com/docs/b2b/api/update-organization) endpoint.     `sso_connection` – an implicit Role granted by the Member's SSO connection. This is currently only available   for SAML connections and not for OIDC. If the Member has a SAML Member registration with the given connection, this   role assignment will appear in the list. However, for authorization check purposes (in   [sessions authenticate](https://stytch.com/docs/b2b/api/authenticate-session) or in any endpoint that enforces RBAC with session   headers), the Member will only be granted the Role if their session contains an authentication factor with the   specified SAML connection.    SAML connection implicit role assignments can be updated by passing in the   `saml_connection_implicit_role_assignments` argument to the   [Update SAML connection](https://stytch.com/docs/b2b/api/update-saml-connection) endpoint.     `sso_connection_group` – an implicit Role granted by the Member's SSO connection and group. This is currently only   available for SAML connections and not for OIDC. If the Member has a SAML Member registration with the given   connection, and belongs to a specific group within the IdP, this role assignment will appear in the list. However,   for authorization check purposes (in [sessions authenticate](https://stytch.com/docs/b2b/api/authenticate-session) or in any endpoint   that enforces RBAC with session headers), the Member will only be granted the role if their session contains an   authentication factor with the specified SAML connection.    SAML group implicit role assignments can be updated by passing in the `saml_group_implicit_role_assignments`   argument to the [Update SAML connection](https://stytch.com/docs/b2b/api/update-saml-connection) endpoint.      `scim_connection_group` – an implicit Role granted by the Member's SCIM connection and group. If the Member has   a SCIM Member registration with the given connection, and belongs to a specific group within the IdP, this role assignment will appear in the list.    SCIM group implicit role assignments can be updated by passing in the `scim_group_implicit_role_assignments`   argument to the [Update SCIM connection](https://stytch.com/docs/b2b/api/update-scim-connection) endpoint.    */
  type: string;
  /** An object containing additional metadata about the source assignment. The fields will vary depending   on the role assignment type as follows:     `direct_assignment` – no additional details.     `email_assignment` – will contain the email domain that granted the assignment.      `sso_connection` – will contain the `connection_id` of the SAML connection that granted the assignment.     `sso_connection_group` – will contain the `connection_id` of the SAML connection and the name of the `group`   that granted the assignment.     `scim_connection_group` – will contain the `connection_id` of the SAML connection and the `group_id`   that granted the assignment.    */
  details?: { [key: string]: unknown };
};

export type ApiOrganizationV1OAuthRegistration = {
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The unique ID of an OAuth registration. */
  member_oauth_registration_id: string;
  /** If available, the `profile_picture_url` is a URL of the User's profile picture set in OAuth identity the provider that the User has authenticated with, e.g. Google profile picture. */
  profile_picture_url?: string;
  /** If available, the `locale` is the Member's locale set in the OAuth identity provider that the user has authenticated with. */
  locale?: string;
};

export type ApiOrganizationV1OidcProviderInfo = {
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/) specification, which is based on OAuth. */
  id_token: string;
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token: string;
  /** The number of seconds until the access token expires. */
  access_token_expires_in: number;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
  connection_id: string;
  /** The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's API. */
  refresh_token?: string;
};

export type ApiOrganizationV1Organization = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The name of the Organization. Must be between 1 and 128 characters in length. */
  organization_name: string;
  /** The image URL of the Organization logo. */
  organization_logo_url: string;
  /** The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an organization_id is expected in a path or request parameter, you may also use the organization_slug as a convenience. */
  organization_slug: string;
  /** The authentication setting that controls the JIT provisioning of Members when authenticating via SSO. The accepted values are:     `ALL_ALLOWED` – the default setting, new Members will be automatically provisioned upon successful authentication via any of the Organization's `sso_active_connections`.     `RESTRICTED` – only new Members with SSO logins that comply with `sso_jit_provisioning_allowed_connections` can be provisioned upon authentication.     `NOT_ALLOWED` – disable JIT provisioning via SSO.    */
  sso_jit_provisioning: string;
  /** An array of `connection_id`s that reference [SAML Connection objects](https://stytch.com/docs/b2b/api/saml-connection-object).   Only these connections will be allowed to JIT provision Members via SSO when `sso_jit_provisioning` is set to `RESTRICTED`. */
  sso_jit_provisioning_allowed_connections: (string)[];
  /** An array of active [SAML Connection references](https://stytch.com/docs/b2b/api/saml-connection-object) or [OIDC Connection references](https://stytch.com/docs/b2b/api/oidc-connection-object). */
  sso_active_connections: (ApiOrganizationV1ActiveSsoConnection)[];
  /** An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.             Common domains such as `gmail.com` are not allowed. See the [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list. */
  email_allowed_domains: (string)[];
  /** The authentication setting that controls how a new Member can be provisioned by authenticating via Email Magic Link or OAuth. The accepted values are:     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be provisioned upon authentication via Email Magic Link or OAuth.     `NOT_ALLOWED` – the default setting, disables JIT provisioning via Email Magic Link and OAuth.    */
  email_jit_provisioning: string;
  /** The authentication setting that controls how a new Member can be invited to an organization by email. The accepted values are:     `ALL_ALLOWED` – any new Member can be invited to join via email.     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be invited via email.     `NOT_ALLOWED` – disable email invites.    */
  email_invites: string;
  /** The setting that controls which authentication methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_auth_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.    */
  auth_methods: string;
  /** An array of allowed authentication methods. This list is enforced when `auth_methods` is set to `RESTRICTED`.   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`, `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.    */
  allowed_auth_methods: (string)[];
  /** The setting that controls the MFA policy for all Members in the Organization. The accepted values are:     `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time they wish to log in. However, any active Session that existed prior to this setting change will remain valid.     `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members. Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.    */
  mfa_policy: string;
  /** Implicit role assignments based off of email domains.   For each domain-Role pair, all Members whose email addresses have the specified email domain will be granted the   associated Role, regardless of their login method. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)   for more information about role assignment. */
  rbac_email_implicit_role_assignments: (ApiOrganizationV1EmailImplicitRoleAssignment)[];
  /** The setting that controls which MFA methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.    */
  mfa_methods: string;
  /** An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to `RESTRICTED`.   The list's accepted values are: `sms_otp` and `totp`.    */
  allowed_mfa_methods: (string)[];
  /** The authentication setting that controls how a new Member can JIT provision into an organization by tenant. The accepted values are:     `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.     `NOT_ALLOWED` – the default setting, disables JIT provisioning by OAuth Tenant.    */
  oauth_tenant_jit_provisioning: string;
  /** A list of email domains that are claimed by the Organization. */
  claimed_email_domains: (string)[];
  /** The authentication setting that sets the Organization's policy towards first party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any first party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only first party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no first party Connected Apps are permitted.    */
  first_party_connected_apps_allowed_type: string;
  /** An array of first party Connected App IDs that are allowed for the Organization. Only used when the Organization's `first_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_first_party_connected_apps: (string)[];
  /** The authentication setting that sets the Organization's policy towards third party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any third party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only third party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no third party Connected Apps are permitted.    */
  third_party_connected_apps_allowed_type: string;
  /** An array of third party Connected App IDs that are allowed for the Organization. Only used when the Organization's `third_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_third_party_connected_apps: (string)[];
  custom_roles: (ApiOrganizationV1CustomRole)[];
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** The timestamp of the Organization's creation. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  created_at?: string;
  /** The timestamp of when the Organization was last updated. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  updated_at?: string;
  /** A unique identifier for the organization. */
  organization_external_id?: string;
  /** The default connection used for SSO when there are multiple active connections. */
  sso_default_connection_id?: string;
  /** An active [SCIM Connection references](https://stytch.com/docs/b2b/api/scim-connection-object). */
  scim_active_connection?: ApiOrganizationV1ActiveScimConnection;
  /** A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github". */
  allowed_oauth_tenants?: { [key: string]: unknown };
};

export type ApiOrganizationV1OrganizationConnectedApp = {
  connected_app_id: string;
  name: string;
  description: string;
  client_type: string;
  logo_url?: string;
};

export type ApiOrganizationV1OrganizationConnectedAppActiveMember = {
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Scopes that were granted at the completion of the last authorization flow. */
  granted_scopes: (string)[];
};

export type ApiOrganizationV1ResultsMetadata = {
  /** The total number of results returned by your search query. If totals have been disabled for your Stytch Workspace to improve search performance, the value will always be -1. */
  total: number;
  /** The `next_cursor` string is returned when your search result contains more than one page of results. This value is passed into your next search call in the `cursor` field. */
  next_cursor?: string;
};

export type ApiOrganizationV1RetiredEmail = {
  /** The globally unique UUID of a Member's email. */
  email_id: string;
  /** The email address of the Member. */
  email_address: string;
};

export type ApiOrganizationV1ScimRegistration = {
  /** The ID of the SCIM connection. */
  connection_id: string;
  /** The unique ID of a SCIM Registration. */
  registration_id: string;
  /** The ID of the member given by the identity provider. */
  external_id?: string;
  /** An object for storing SCIM attributes brought over from the identity provider. */
  scim_attributes?: ApiB2BScimV1ScimAttributes;
};

export type ApiOrganizationV1SsoRegistration = {
  /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
  connection_id: string;
  /** The ID of the member given by the identity provider. */
  external_id: string;
  /** The unique ID of an SSO Registration. */
  registration_id: string;
  /** An object for storing SSO attributes brought over from the identity provider. */
  sso_attributes?: { [key: string]: unknown };
};

export type ApiOrganizationV1SearchQuery = {
  /** The action to perform on the operands. The accepted values are:    `AND` – all the operand values provided must match.    `OR` – **[DEPRECATED]** the operator will return any matches to at least one of the operand values you supply. This parameter is retained for legacy use cases only and is no longer supported. We strongly recommend breaking down complex queries into multiple search queries instead. */
  operator: ApiOrganizationV1SearchQueryOperator;
  /** An array of operand objects that contains all of the filters and values to apply to your search query. */
  operands: ({ [key: string]: unknown })[];
};

export type ApiOrganizationV1SlackProviderInfo = {
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The tenant ID returned by the OAuth provider. This is typically used to identify an organization or group within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the Workspace ID, and in GitHub this is an organization ID. This field will only be populated if exactly one tenant ID is returned from a successful OAuth authentication and developers should prefer `provider_tenant_ids` over this since it accounts for the possibility of an OAuth provider yielding multiple tenant IDs. */
  provider_tenant_id: string;
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token: string;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** The `access_token` that you may use to access data as a bot application in Slack. Use in conjunction with `bot_scopes`. */
  bot_access_token: string;
  /** The scopes that the bot application has access to in Slack. */
  bot_scopes: (string)[];
};

/** Request type */
export type ApiOrganizationV1ConnectedAppsRequest = { [key: string]: unknown };

export type ApiOrganizationV1ConnectedAppsResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  connected_apps: (ApiOrganizationV1OrganizationConnectedApp)[];
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1CreateRequest = {
  /** The name of the Organization. Must be between 1 and 128 characters in length. */
  organization_name: string;
  /** The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an organization_id is expected in a path or request parameter, you may also use the organization_slug as a convenience. */
  organization_slug?: string;
  /** The image URL of the Organization logo. */
  organization_logo_url?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** An identifier that can be used in API calls wherever a organization_id is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within a project, but may be reused across different projects in the same workspace. */
  organization_external_id?: string;
  /** The authentication setting that controls the JIT provisioning of Members when authenticating via SSO. The accepted values are:     `ALL_ALLOWED` – the default setting, new Members will be automatically provisioned upon successful authentication via any of the Organization's `sso_active_connections`.     `RESTRICTED` – only new Members with SSO logins that comply with `sso_jit_provisioning_allowed_connections` can be provisioned upon authentication.     `NOT_ALLOWED` – disable JIT provisioning via SSO.    */
  sso_jit_provisioning?: string;
  /** An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.             Common domains such as `gmail.com` are not allowed. See the [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list. */
  email_allowed_domains?: (string)[];
  /** The authentication setting that controls how a new Member can be provisioned by authenticating via Email Magic Link or OAuth. The accepted values are:     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be provisioned upon authentication via Email Magic Link or OAuth.     `NOT_ALLOWED` – the default setting, disables JIT provisioning via Email Magic Link and OAuth.    */
  email_jit_provisioning?: string;
  /** The authentication setting that controls how a new Member can be invited to an organization by email. The accepted values are:     `ALL_ALLOWED` – any new Member can be invited to join via email.     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be invited via email.     `NOT_ALLOWED` – disable email invites.    */
  email_invites?: string;
  /** The setting that controls which authentication methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_auth_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.    */
  auth_methods?: string;
  /** An array of allowed authentication methods. This list is enforced when `auth_methods` is set to `RESTRICTED`.   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`, `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.    */
  allowed_auth_methods?: (string)[];
  /** The setting that controls the MFA policy for all Members in the Organization. The accepted values are:     `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time they wish to log in. However, any active Session that existed prior to this setting change will remain valid.     `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members. Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.    */
  mfa_policy?: string;
  /** Implicit role assignments based off of email domains.   For each domain-Role pair, all Members whose email addresses have the specified email domain will be granted the   associated Role, regardless of their login method. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)   for more information about role assignment. */
  rbac_email_implicit_role_assignments?: (ApiOrganizationV1EmailImplicitRoleAssignment)[];
  /** The setting that controls which MFA methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.    */
  mfa_methods?: string;
  /** An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to `RESTRICTED`.   The list's accepted values are: `sms_otp` and `totp`.    */
  allowed_mfa_methods?: (string)[];
  /** The authentication setting that controls how a new Member can JIT provision into an organization by tenant. The accepted values are:     `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.     `NOT_ALLOWED` – the default setting, disables JIT provisioning by OAuth Tenant.    */
  oauth_tenant_jit_provisioning?: string;
  /** A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github". */
  allowed_oauth_tenants?: { [key: string]: unknown };
  /** A list of email domains that are claimed by the Organization. */
  claimed_email_domains?: (string)[];
  /** The authentication setting that sets the Organization's policy towards first party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any first party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only first party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no first party Connected Apps are permitted.    */
  first_party_connected_apps_allowed_type?: ApiOrganizationV1CreateRequestFirstPartyConnectedAppsAllowedType;
  /** An array of first party Connected App IDs that are allowed for the Organization. Only used when the Organization's `first_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_first_party_connected_apps?: (string)[];
  /** The authentication setting that sets the Organization's policy towards third party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any third party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only third party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no third party Connected Apps are permitted.    */
  third_party_connected_apps_allowed_type?: ApiOrganizationV1CreateRequestThirdPartyConnectedAppsAllowedType;
  /** An array of third party Connected App IDs that are allowed for the Organization. Only used when the Organization's `third_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_third_party_connected_apps?: (string)[];
};

export type ApiOrganizationV1CreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1DeleteExternalIdResponse = {
  request_id: string;
  organization: ApiOrganizationV1Organization;
  status_code: number;
};

export type ApiOrganizationV1DeleteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1GetConnectedAppRequest = { [key: string]: unknown };

export type ApiOrganizationV1GetConnectedAppResponse = {
  /** The ID of the Connected App. */
  connected_app_id: string;
  /** The name of the Connected App. */
  name: string;
  /** A description of the Connected App. */
  description: string;
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: string;
  /** Details about Members who has installed a Connected App. */
  active_members: (ApiOrganizationV1OrganizationConnectedAppActiveMember)[];
  status_code: number;
  logo_url?: string;
};

/** Request type */
export type ApiOrganizationV1GetRequest = { [key: string]: unknown };

export type ApiOrganizationV1GetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1MetricsRequest = { [key: string]: unknown };

export type ApiOrganizationV1MetricsResponse = {
  request_id: string;
  member_count: number;
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1SearchRequest = {
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
  /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all Organizations with no filtering applied. */
  query?: ApiOrganizationV1SearchQuery;
};

export type ApiOrganizationV1SearchResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of [Organization objects](https://stytch.com/docs/b2b/api/organization-object). */
  organizations: (ApiOrganizationV1Organization)[];
  /** The search `results_metadata` object contains metadata relevant to your specific query like `total` and `next_cursor`. */
  results_metadata: ApiOrganizationV1ResultsMetadata;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1UpdateRequest = {
  /** The name of the Organization. Must be between 1 and 128 characters in length.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.name` action on the `stytch.organization` Resource. */
  organization_name?: string;
  /** The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an organization_id is expected in a path or request parameter, you may also use the organization_slug as a convenience.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.slug` action on the `stytch.organization` Resource. */
  organization_slug?: string;
  /** The image URL of the Organization logo.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.logo-url` action on the `stytch.organization` Resource. */
  organization_logo_url?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data.           If a session header is passed into the request, this field may **not** be passed into the request. You cannot           update trusted metadata when acting as a Member. */
  trusted_metadata?: { [key: string]: unknown };
  /** An identifier that can be used in API calls wherever a organization_id is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within a project, but may be reused across different projects in the same workspace. */
  organization_external_id?: string;
  /** The default connection used for SSO when there are multiple active connections.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.default-sso-connection` action on the `stytch.organization` Resource. */
  sso_default_connection_id?: string;
  /** The authentication setting that controls the JIT provisioning of Members when authenticating via SSO. The accepted values are:     `ALL_ALLOWED` – the default setting, new Members will be automatically provisioned upon successful authentication via any of the Organization's `sso_active_connections`.     `RESTRICTED` – only new Members with SSO logins that comply with `sso_jit_provisioning_allowed_connections` can be provisioned upon authentication.     `NOT_ALLOWED` – disable JIT provisioning via SSO.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.sso-jit-provisioning` action on the `stytch.organization` Resource. */
  sso_jit_provisioning?: string;
  /** An array of `connection_id`s that reference [SAML Connection objects](https://stytch.com/docs/b2b/api/saml-connection-object).   Only these connections will be allowed to JIT provision Members via SSO when `sso_jit_provisioning` is set to `RESTRICTED`.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.sso-jit-provisioning` action on the `stytch.organization` Resource. */
  sso_jit_provisioning_allowed_connections?: (string)[];
  /** An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.             Common domains such as `gmail.com` are not allowed. See the [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.allowed-domains` action on the `stytch.organization` Resource. */
  email_allowed_domains?: (string)[];
  /** The authentication setting that controls how a new Member can be provisioned by authenticating via Email Magic Link or OAuth. The accepted values are:     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be provisioned upon authentication via Email Magic Link or OAuth.     `NOT_ALLOWED` – the default setting, disables JIT provisioning via Email Magic Link and OAuth.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.email-jit-provisioning` action on the `stytch.organization` Resource. */
  email_jit_provisioning?: string;
  /** The authentication setting that controls how a new Member can be invited to an organization by email. The accepted values are:     `ALL_ALLOWED` – any new Member can be invited to join via email.     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be invited via email.     `NOT_ALLOWED` – disable email invites.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.email-invites` action on the `stytch.organization` Resource. */
  email_invites?: string;
  /** The setting that controls which authentication methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_auth_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.allowed-auth-methods` action on the `stytch.organization` Resource. */
  auth_methods?: string;
  /** An array of allowed authentication methods. This list is enforced when `auth_methods` is set to `RESTRICTED`.   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`, `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.allowed-auth-methods` action on the `stytch.organization` Resource. */
  allowed_auth_methods?: (string)[];
  /** The setting that controls the MFA policy for all Members in the Organization. The accepted values are:     `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time they wish to log in. However, any active Session that existed prior to this setting change will remain valid.     `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members. Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.mfa-policy` action on the `stytch.organization` Resource. */
  mfa_policy?: string;
  /** Implicit role assignments based off of email domains.   For each domain-Role pair, all Members whose email addresses have the specified email domain will be granted the   associated Role, regardless of their login method. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)   for more information about role assignment.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.implicit-roles` action on the `stytch.organization` Resource. */
  rbac_email_implicit_role_assignments?: (ApiOrganizationV1EmailImplicitRoleAssignment)[];
  /** The setting that controls which MFA methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.allowed-mfa-methods` action on the `stytch.organization` Resource. */
  mfa_methods?: string;
  /** An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to `RESTRICTED`.   The list's accepted values are: `sms_otp` and `totp`.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.allowed-mfa-methods` action on the `stytch.organization` Resource. */
  allowed_mfa_methods?: (string)[];
  /** The authentication setting that controls how a new Member can JIT provision into an organization by tenant. The accepted values are:     `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.     `NOT_ALLOWED` – the default setting, disables JIT provisioning by OAuth Tenant.     If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.oauth-tenant-jit-provisioning` action on the `stytch.organization` Resource. */
  oauth_tenant_jit_provisioning?: string;
  /** A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github".  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.allowed-oauth-tenants` action on the `stytch.organization` Resource. */
  allowed_oauth_tenants?: { [key: string]: unknown };
  /** A list of email domains that are claimed by the Organization. */
  claimed_email_domains?: (string)[];
  /** The authentication setting that sets the Organization's policy towards first party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any first party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only first party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no first party Connected Apps are permitted.    */
  first_party_connected_apps_allowed_type?: ApiOrganizationV1UpdateRequestFirstPartyConnectedAppsAllowedType;
  /** An array of first party Connected App IDs that are allowed for the Organization. Only used when the Organization's `first_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_first_party_connected_apps?: (string)[];
  /** The authentication setting that sets the Organization's policy towards third party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any third party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only third party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no third party Connected Apps are permitted.    */
  third_party_connected_apps_allowed_type?: ApiOrganizationV1UpdateRequestThirdPartyConnectedAppsAllowedType;
  /** An array of third party Connected App IDs that are allowed for the Organization. Only used when the Organization's `third_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_third_party_connected_apps?: (string)[];
};

export type ApiOrganizationV1UpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1CreateRequestFirstPartyConnectedAppsAllowedType = "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

export type ApiOrganizationV1CreateRequestThirdPartyConnectedAppsAllowedType = "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

export type ApiOrganizationV1SearchQueryOperator = "OR" | "AND";

export type ApiOrganizationV1UpdateRequestFirstPartyConnectedAppsAllowedType = "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

export type ApiOrganizationV1UpdateRequestThirdPartyConnectedAppsAllowedType = "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

/** Request type */
export type ApiOrganizationV1OrganizationsMembersCreateRequest = {
  /** The email address of the Member. */
  email_address: string;
  /** The name of the Member. */
  name?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** An arbitrary JSON object of application-specific data. These fields can be edited directly by the   frontend SDK, and should not be used to store critical information. See the [Metadata resource](https://stytch.com/docs/b2b/api/metadata)   for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** Flag for whether or not to save a Member as `pending` or `active` in Stytch. It defaults to false. If true, new Members will be created with status `pending` in Stytch's backend. Their status will remain `pending` and they will continue to receive signup email templates for every Email Magic Link until that Member authenticates and becomes `active`. If false, new Members will be created with status `active`. */
  create_member_as_pending?: boolean;
  /** Identifies the Member as a break glass user - someone who has permissions to authenticate into an Organization by bypassing the Organization's settings. A break glass account is typically used for emergency purposes to gain access outside of normal authentication procedures. Refer to the [Organization object](https://stytch.com/docs/b2b/api/organization-object) and its `auth_methods` and `allowed_auth_methods` fields for more details. */
  is_breakglass?: boolean;
  /** The Member's phone number. A Member may only have one phone number. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). */
  mfa_phone_number?: string;
  /** Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the Organization's MFA policy is set to `REQUIRED_FOR_ALL`. */
  mfa_enrolled?: boolean;
  /** Roles to explicitly assign to this Member. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)    for more information about role assignment. */
  roles?: (string)[];
  /** An identifier that can be used in most API calls where a `member_id` is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within an organization, but may be reused across different organizations in the same project. */
  external_id?: string;
};

export type ApiOrganizationV1OrganizationsMembersCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersDangerouslyGetRequest = {
  /** Whether to include deleted Members in the response. Defaults to false. */
  include_deleted?: boolean;
};

export type ApiOrganizationV1OrganizationsMembersDeleteExternalIdResponse = {
  request_id: string;
  member_id: string;
  member: ApiOrganizationV1Member;
  organization: ApiOrganizationV1Organization;
  status_code: number;
};

export type ApiOrganizationV1OrganizationsMembersDeleteMfaPhoneNumberResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1OrganizationsMembersDeletePasswordResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1OrganizationsMembersDeleteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1OrganizationsMembersDeleteTotpResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersGetConnectedAppsRequest = { [key: string]: unknown };

export type ApiOrganizationV1OrganizationsMembersGetConnectedAppsResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of Connected Apps with which the Member has successfully completed an authorization flow. */
  connected_apps: (ApiOrganizationV1MemberConnectedApp)[];
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersGetRequest = {
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id?: string;
  /** The email address of the Member. */
  email_address?: string;
};

export type ApiOrganizationV1OrganizationsMembersGetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersOidcProviderInformationRequest = {
  /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
  include_refresh_token?: boolean;
};

export type ApiOrganizationV1OrganizationsMembersOidcProvidersResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** A list of tokens the member is registered with. */
  registrations: (ApiOrganizationV1OidcProviderInfo)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersReactivateRequest = { [key: string]: unknown };

export type ApiOrganizationV1OrganizationsMembersReactivateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersSearchRequest = {
  /** An array of organization_ids. At least one value is required. */
  organization_ids: (string)[];
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
  /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all Members with no filtering applied. */
  query?: ApiOrganizationV1SearchQuery;
};

export type ApiOrganizationV1OrganizationsMembersSearchResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of [Member objects](https://stytch.com/docs/b2b/api/member-object). */
  members: (ApiOrganizationV1Member)[];
  /** The search `results_metadata` object contains metadata relevant to your specific query like `total` and `next_cursor`. */
  results_metadata: ApiOrganizationV1ResultsMetadata;
  organizations: { [key: string]: ApiOrganizationV1Organization | undefined };
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersStartEmailUpdateRequest = {
  /** The new email address for the Member. */
  email_address: string;
  /** The URL that the Member clicks from the login Email Magic Link. This URL should be an endpoint in the backend server that   verifies the request by querying Stytch's authenticate endpoint and finishes the login. If this value is not passed, the default login   redirect URL that you set in your Dashboard is used. If you have not set a default login redirect URL, an error is returned. */
  login_redirect_url?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOrganizationV1StartEmailUpdateRequestLocale;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic Links - Login”. */
  login_template_id?: string;
  /** The method that should be used to verify a member's new email address. The options are `EMAIL_MAGIC_LINK` or `EMAIL_OTP`. This field is optional, if no value is provided, `EMAIL_MAGIC_LINK` will be used. */
  delivery_method?: ApiOrganizationV1StartEmailUpdateRequestDeliveryMethod;
};

export type ApiOrganizationV1OrganizationsMembersStartEmailUpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersUnlinkRetiredEmailRequest = {
  /** The globally unique UUID of a Member's email. */
  email_id?: string;
  /** The email address of the Member. */
  email_address?: string;
};

export type ApiOrganizationV1OrganizationsMembersUnlinkRetiredEmailResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersUpdateRequest = {
  /** The name of the Member.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.name` action on the `stytch.member` Resource. Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the request, the authorization check will also allow a Member Session that has permission to perform the `update.info.name` action on the `stytch.self` Resource. */
  name?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data.           If a session header is passed into the request, this field may **not** be passed into the request. You cannot           update trusted metadata when acting as a Member. */
  trusted_metadata?: { [key: string]: unknown };
  /** An arbitrary JSON object of application-specific data. These fields can be edited directly by the   frontend SDK, and should not be used to store critical information. See the [Metadata resource](https://stytch.com/docs/b2b/api/metadata)   for complete field behavior details.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.untrusted-metadata` action on the `stytch.member` Resource. Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the request, the authorization check will also allow a Member Session that has permission to perform the `update.info.untrusted-metadata` action on the `stytch.self` Resource. */
  untrusted_metadata?: { [key: string]: unknown };
  /** Identifies the Member as a break glass user - someone who has permissions to authenticate into an Organization by bypassing the Organization's settings. A break glass account is typically used for emergency purposes to gain access outside of normal authentication procedures. Refer to the [Organization object](https://stytch.com/docs/b2b/api/organization-object) and its `auth_methods` and `allowed_auth_methods` fields for more details.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.is-breakglass` action on the `stytch.member` Resource. */
  is_breakglass?: boolean;
  /** Sets the Member's phone number. Throws an error if the Member already has a phone number. To change the Member's phone number, use the [Delete member phone number endpoint](https://stytch.com/docs/b2b/api/delete-member-mfa-phone-number) to delete the Member's existing phone number first.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.mfa-phone` action on the `stytch.member` Resource. Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the request, the authorization check will also allow a Member Session that has permission to perform the `update.info.mfa-phone` action on the `stytch.self` Resource. */
  mfa_phone_number?: string;
  /** Sets whether the Member is enrolled in MFA. If true, the Member must complete an MFA step whenever they wish to log in to their Organization. If false, the Member only needs to complete an MFA step if the Organization's MFA policy is set to `REQUIRED_FOR_ALL`.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.mfa-enrolled` action on the `stytch.member` Resource. Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the request, the authorization check will also allow a Member Session that has permission to perform the `update.settings.mfa-enrolled` action on the `stytch.self` Resource. */
  mfa_enrolled?: boolean;
  /** Roles to explicitly assign to this Member.  Will completely replace any existing explicitly assigned roles. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment.     If a Role is removed from a Member, and the Member is also implicitly assigned this Role from an SSO connection    or an SSO group, we will by default revoke any existing sessions for the Member that contain any SSO    authentication factors with the affected connection ID. You can preserve these sessions by passing in the    `preserve_existing_sessions` parameter with a value of `true`.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.roles` action on the `stytch.member` Resource. */
  roles?: (string)[];
  /** Whether to preserve existing sessions when explicit Roles that are revoked are also implicitly assigned   by SSO connection or SSO group. Defaults to `false` - that is, existing Member Sessions that contain SSO   authentication factors with the affected SSO connection IDs will be revoked. */
  preserve_existing_sessions?: boolean;
  /** The Member's default MFA method. This value is used to determine which secondary MFA method to use in the case of multiple methods registered for a Member. The current possible values are `sms_otp` and `totp`.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.settings.default-mfa-method` action on the `stytch.member` Resource. Alternatively, if the Member Session matches the Member associated with the `member_id` passed in the request, the authorization check will also allow a Member Session that has permission to perform the `update.settings.default-mfa-method` action on the `stytch.self` Resource. */
  default_mfa_method?: string;
  /** Updates the Member's `email_address`, if provided. This will clear any existing passwords and require re-verification of the new email address.         If a Member's email address is changed, other Members in the same Organization cannot use the old email address, although the Member may update back to their old email address.         A Member's email address can only be useable again by other Members if the Member is deleted.  If this field is provided and a session header is passed into the request, the Member Session must have permission to perform the `update.info.email` action on the `stytch.member` Resource. Members cannot update their own email address. */
  email_address?: string;
  /** An identifier that can be used in most API calls where a `member_id` is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within an organization, but may be reused across different organizations in the same project. */
  external_id?: string;
  /** If `unlink_email` is `true` and an `email_address` is provided, the Member's previous email will be deleted instead of retired. Defaults to `false`. */
  unlink_email?: boolean;
};

export type ApiOrganizationV1OrganizationsMembersUpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1StartEmailUpdateRequestDeliveryMethod = "EMAIL_MAGIC_LINK" | "EMAIL_OTP";

export type ApiOrganizationV1StartEmailUpdateRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiOrganizationV1OrganizationsMembersOauthProvidersGithubResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** A list of tokens the member is registered with. */
  registrations: (ApiOrganizationV1GithubProviderInfo)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1OrganizationsMembersOauthProvidersGoogleResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/) specification, which is based on OAuth. */
  id_token: string;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token?: string;
  /** The number of seconds until the access token expires. */
  access_token_expires_in?: number;
  /** The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's API. */
  refresh_token?: string;
};

export type ApiOrganizationV1OrganizationsMembersOauthProvidersHubspotResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** A list of tokens the member is registered with. */
  registrations: (ApiOrganizationV1HubspotProviderInfo)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOrganizationV1OrganizationsMembersOauthProvidersMicrosoftResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token: string;
  /** The number of seconds until the access token expires. */
  access_token_expires_in: number;
  /** The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/) specification, which is based on OAuth. */
  id_token: string;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's API. */
  refresh_token?: string;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersOauthProvidersProviderInformationRequest = {
  /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
  include_refresh_token?: boolean;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersOauthProvidersSlackRequest = { [key: string]: unknown };

export type ApiOrganizationV1OrganizationsMembersOauthProvidersSlackResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** A list of tokens the member is registered with. */
  registrations: (ApiOrganizationV1SlackProviderInfo)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOrganizationV1OrganizationsMembersConnectedAppsRevokeRequest = { [key: string]: unknown };

export type ApiOrganizationV1OrganizationsMembersConnectedAppsRevokeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  status_code: number;
};

export type ApiB2BIdpV1ScopeResult = {
  /** The name of the scope. */
  scope: string;
  /** A human-readable description of the scope, taken from the RBAC Policy. */
  description: string;
  /** Indicates whether the scope can be granted. Users can only grant scopes if they have the required permissions. */
  is_grantable: boolean;
};

/** Request type */
export type ApiB2BIdpV1B2BIdpOauthAuthorizeRequest = {
  /** Indicates whether the user granted the requested scopes. */
  consent_granted: boolean;
  /** An array of scopes requested by the client. */
  scopes: (string)[];
  /** The ID of the Connected App client. */
  client_id: string;
  /** The callback URI used to redirect the user after authentication. This is the same URI provided at the start of the OAuth flow.  This field is required when using the `authorization_code` grant. */
  redirect_uri: string;
  /** The OAuth 2.0 response type. For authorization code flows this value is `code`. */
  response_type: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id?: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Space separated list that specifies how the Authorization Server should prompt the user for reauthentication and consent. Only `consent` is supported today. */
  prompt?: string;
  /** An opaque value used to maintain state between the request and callback. */
  state?: string;
  /** A string used to associate a client session with an ID token to mitigate replay attacks. */
  nonce?: string;
  /** A base64url encoded challenge derived from the code verifier for PKCE flows. */
  code_challenge?: string;
  resources?: (string)[];
};

export type ApiB2BIdpV1B2BIdpOauthAuthorizeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The callback URI used to redirect the user after authentication. This is the same URI provided at the start of the OAuth flow.  This field is required when using the `authorization_code` grant. */
  redirect_uri: string;
  status_code: number;
  /** A one-time use code that can be exchanged for tokens. */
  authorization_code?: string;
};

/** Request type */
export type ApiB2BIdpV1B2BIdpOauthAuthorizeStartRequest = {
  /** The ID of the Connected App client. */
  client_id: string;
  /** The callback URI used to redirect the user after authentication. This is the same URI provided at the start of the OAuth flow.  This field is required when using the `authorization_code` grant. */
  redirect_uri: string;
  /** The OAuth 2.0 response type. For authorization code flows this value is `code`. */
  response_type: string;
  /** An array of scopes requested by the client. */
  scopes: (string)[];
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id?: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Space separated list that specifies how the Authorization Server should prompt the user for reauthentication and consent. Only `consent` is supported today. */
  prompt?: string;
};

export type ApiB2BIdpV1B2BIdpOauthAuthorizeStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  client: ApiConnectedappsV1ConnectedAppPublic;
  /** Whether the user must provide explicit consent for the authorization request. */
  consent_required: boolean;
  /** Details about each requested scope. */
  scope_results: (ApiB2BIdpV1ScopeResult)[];
  status_code: number;
};

export type ApiB2BMfaV1MemberOptions = {
  /** The Member's MFA phone number. */
  mfa_phone_number: string;
  /** The Member's MFA TOTP registration ID. */
  totp_registration_id: string;
};

export type ApiB2BMfaV1MfaRequired = {
  /** Information about the Member's options for completing MFA. */
  member_options?: ApiB2BMfaV1MemberOptions;
  /** If null, indicates that no secondary authentication has been initiated. If equal to "sms_otp", indicates that the Member has a phone number, and a one time passcode has been sent to the Member's phone number. No secondary authentication will be initiated during calls to the discovery authenticate or list organizations endpoints, even if the Member has a phone number. */
  secondary_auth_initiated?: string;
};

export type ApiDeviceHistoryV1DeviceAttributeDetails = {
  /** Whether this `ip_geo_country` has been seen before for this user. */
  is_new: boolean;
  /** When this `ip_geo_country` was first seen for this user. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  first_seen_at?: string;
  /** When this `ip_geo_country` was last seen for this user. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  last_seen_at?: string;
};

export type ApiDeviceHistoryV1DeviceInfo = {
  /** The `visitor_id` (a unique identifier) of the user's device. See the [Device Fingerprinting documentation](https://stytch.com/docs/fraud/guides/device-fingerprinting/fingerprints) for more details on the `visitor_id`. */
  visitor_id: string;
  /** Information about the `visitor_id`. */
  visitor_id_details?: ApiDeviceHistoryV1DeviceAttributeDetails;
  /** The IP address of the user's device. */
  ip_address?: string;
  /** Information about the `ip_address`. */
  ip_address_details?: ApiDeviceHistoryV1DeviceAttributeDetails;
  /** The city where the IP address is located. */
  ip_geo_city?: string;
  /** The region where the IP address is located. */
  ip_geo_region?: string;
  /** The country code where the IP address is located. */
  ip_geo_country?: string;
  /** Information about the `ip_geo_country`. */
  ip_geo_country_details?: ApiDeviceHistoryV1DeviceAttributeDetails;
};

export type ApiUserV1BiometricRegistration = {
  /** The unique ID for a biometric registration. */
  biometric_registration_id: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
};

export type ApiUserV1CryptoWallet = {
  /** The unique ID for a crypto wallet */
  crypto_wallet_id: string;
  /** The actual blockchain address of the User's crypto wallet. */
  crypto_wallet_address: string;
  /** The blockchain that the User's crypto wallet operates on, e.g. Ethereum, Solana, etc. */
  crypto_wallet_type: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
};

export type ApiUserV1Email = {
  /** The unique ID of a specific email address. */
  email_id: string;
  /** The email address. */
  email: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
};

export type ApiUserV1Name = {
  /** The first name of the user. */
  first_name?: string;
  /** The middle name(s) of the user. */
  middle_name?: string;
  /** The last name of the user. */
  last_name?: string;
};

export type ApiUserV1OAuthProvider = {
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Facebook, GitHub etc. */
  provider_type: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the "sub" or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** If available, the `profile_picture_url` is a url of the User's profile picture set in OAuth identity the provider that the User has authenticated with, e.g. Facebook profile picture. */
  profile_picture_url: string;
  /** If available, the `locale` is the User's locale set in the OAuth identity provider that the user has authenticated with. */
  locale: string;
  /** The unique ID for an OAuth registration. */
  oauth_user_registration_id: string;
};

export type ApiUserV1Password = {
  /** The unique ID of a specific password */
  password_id: string;
  /** Indicates whether this password requires a password reset */
  requires_reset: boolean;
};

export type ApiUserV1PhoneNumber = {
  /** The unique ID for the phone number. */
  phone_id: string;
  /** The phone number. */
  phone_number: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
};

export type ApiUserV1ResultsMetadata = {
  /** The total number of results returned by your search query. If totals have been disabled for your Stytch Workspace to improve search performance, the value will always be -1. */
  total: number;
  /** The `next_cursor` string is returned when your search result contains more than one page of results. This value is passed into your next search call in the `cursor` field. */
  next_cursor?: string;
};

export type ApiUserV1SearchUsersQuery = {
  /** The action to perform on the operands. The accepted values are:    `AND` – all the operand values provided must match.    `OR` – **[DEPRECATED]** the operator will return any matches to at least one of the operand values you supply. This parameter is retained for legacy use cases only and is no longer supported. We strongly recommend breaking down complex queries into multiple search queries instead. */
  operator: ApiUserV1SearchUsersQueryOperator;
  /** An array of operand objects that contains all of the filters and values to apply to your search search query. */
  operands: ({ [key: string]: unknown })[];
};

export type ApiUserV1Totp = {
  /** The unique ID for a TOTP instance. */
  totp_id: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
};

export type ApiUserV1User = {
  /** The unique ID of the affected User. */
  user_id: string;
  /** An array of email objects for the User. */
  emails: (ApiUserV1Email)[];
  /** The status of the User. The possible values are `pending` and `active`. */
  status: string;
  /** An array of phone number objects linked to the User. */
  phone_numbers: (ApiUserV1PhoneNumber)[];
  /** An array that contains a list of all Passkey or WebAuthn registrations for a given User in the Stytch API. */
  webauthn_registrations: (ApiUserV1WebAuthnRegistration)[];
  /** An array of OAuth `provider` objects linked to the User. */
  providers: (ApiUserV1OAuthProvider)[];
  /** An array containing a list of all TOTP instances for a given User in the Stytch API. */
  totps: (ApiUserV1Totp)[];
  /** An array contains a list of all crypto wallets for a given User in the Stytch API. */
  crypto_wallets: (ApiUserV1CryptoWallet)[];
  /** An array that contains a list of all biometric registrations for a given User in the Stytch API. */
  biometric_registrations: (ApiUserV1BiometricRegistration)[];
  /** Whether the User is temporarily locked due to too many failed authentication attempts. See the [User Locking Guide](https://stytch.com/docs/resources/platform/user-locks) for more information. */
  is_locked: boolean;
  /** Roles assigned to this User.    See the [RBAC guide](https://stytch.com/docs/guides/rbac/role-assignment) for more information about role assignment. */
  roles: (string)[];
  /** The name of the User. Each field in the `name` object is optional. */
  name?: ApiUserV1Name;
  /** The timestamp of the User's creation. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  created_at?: string;
  /** The password object is returned for users with a password. */
  password?: ApiUserV1Password;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** An identifier that can be used in most API calls where a `member_id` is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within the project. */
  external_id?: string;
  /** When the user lock was created, if there is one. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  lock_created_at?: string;
  /** When the user lock expires, if there is one. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  lock_expires_at?: string;
};

export type ApiUserV1UserConnectedApp = {
  /** The ID of the Connected App. */
  connected_app_id: string;
  /** The name of the Connected App. */
  name: string;
  /** A description of the Connected App. */
  description: string;
  /** The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and `third_party_public`. */
  client_type: string;
  /** The scopes granted to the Connected App at the completion of the last authorization flow. */
  scopes_granted: string;
  /** The logo URL of the Connected App, if any. */
  logo_url?: string;
};

export type ApiUserV1WebAuthnRegistration = {
  /** The unique ID for the Passkey or WebAuthn registration. */
  webauthn_registration_id: string;
  /** The `domain` on which Passkey or WebAuthn registration was started. This will be the domain of your app. */
  domain: string;
  /** The user agent of the User. */
  user_agent: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
  /** The `authenticator_type` string displays the requested authenticator type of the Passkey or WebAuthn device. The two valid types are "platform" and "cross-platform". If no value is present, the Passkey or WebAuthn device was created without an authenticator type preference. */
  authenticator_type: string;
  /** The `name` of the Passkey or WebAuthn registration. */
  name: string;
};

/** Request type */
export type ApiUserV1ConnectedAppsRequest = { [key: string]: unknown };

export type ApiUserV1ConnectedAppsResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of Connected Apps with which the User has successfully completed an authorization flow. */
  connected_apps: (ApiUserV1UserConnectedApp)[];
  status_code: number;
};

/** Request type */
export type ApiUserV1CreateRequest = {
  /** The email address of the end user. */
  email?: string;
  /** The name of the user. Each field in the name object is optional. */
  name?: ApiUserV1Name;
  attributes?: ApiAttributeV1Attributes;
  /** The phone number to use for one-time passcodes. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  phone_number?: string;
  /** Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.         If true, users will be saved with status pending in Stytch's backend until authenticated.         If false, users will be created as active. An example usage of         a true flag would be to require users to verify their phone by entering the OTP code before creating         an account for them. */
  create_user_as_pending?: boolean;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** An identifier that can be used in API calls wherever a user_id is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. */
  external_id?: string;
  /** Roles to explicitly assign to this User.    See the [RBAC guide](https://stytch.com/docs/guides/rbac/role-assignment) for more information about role assignment. */
  roles?: (string)[];
};

export type ApiUserV1CreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** The status of the User. The possible values are `pending` and `active`. */
  status: string;
  /** The unique ID for the phone number. */
  phone_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteBiometricRegistrationResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteCryptoWalletResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteEmailResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteExternalIdResponse = {
  request_id: string;
  user_id: string;
  user: ApiUserV1User;
  status_code: number;
};

export type ApiUserV1DeleteOAuthRegistrationResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeletePasswordResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeletePhoneNumberResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the deleted User. */
  user_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteTotpResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1DeleteWebAuthnRegistrationResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiUserV1ExchangePrimaryFactorRequest = {
  /** The email address to exchange to. */
  email_address?: string;
  /** The phone number to exchange to. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). */
  phone_number?: string;
};

export type ApiUserV1ExchangePrimaryFactorResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiUserV1GetRequest = { [key: string]: unknown };

export type ApiUserV1GetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the returned User. */
  user_id: string;
  /** An array of email objects for the User. */
  emails: (ApiUserV1Email)[];
  /** The status of the User. The possible values are `pending` and `active`. */
  status: string;
  /** An array of phone number objects linked to the User. */
  phone_numbers: (ApiUserV1PhoneNumber)[];
  /** An array that contains a list of all Passkey or WebAuthn registrations for a given User in the Stytch API. */
  webauthn_registrations: (ApiUserV1WebAuthnRegistration)[];
  /** An array of OAuth `provider` objects linked to the User. */
  providers: (ApiUserV1OAuthProvider)[];
  /** An array containing a list of all TOTP instances for a given User in the Stytch API. */
  totps: (ApiUserV1Totp)[];
  /** An array contains a list of all crypto wallets for a given User in the Stytch API. */
  crypto_wallets: (ApiUserV1CryptoWallet)[];
  /** An array that contains a list of all biometric registrations for a given User in the Stytch API. */
  biometric_registrations: (ApiUserV1BiometricRegistration)[];
  is_locked: boolean;
  /** Roles assigned to this User.    See the [RBAC guide](https://stytch.com/docs/guides/rbac/role-assignment) for more information about role assignment. */
  roles: (string)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The name of the User. Each field in the `name` object is optional. */
  name?: ApiUserV1Name;
  /** The timestamp of the User's creation. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  created_at?: string;
  /** The password object is returned for users with a password. */
  password?: ApiUserV1Password;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  external_id?: string;
  lock_created_at?: string;
  lock_expires_at?: string;
};

/** Request type */
export type ApiUserV1RevokeRequest = { [key: string]: unknown };

export type ApiUserV1RevokeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  status_code: number;
};

/** Request type */
export type ApiUserV1SearchRequest = {
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
  /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all results with no filtering applied. */
  query?: ApiUserV1SearchUsersQuery;
};

export type ApiUserV1SearchResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of results that match your search query. */
  results: (ApiUserV1User)[];
  /** The search `results_metadata` object contains metadata relevant to your specific query like total and `next_cursor`. */
  results_metadata: ApiUserV1ResultsMetadata;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiUserV1UpdateRequest = {
  /** The name of the user. Each field in the name object is optional. */
  name?: ApiUserV1Name;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** An identifier that can be used in API calls wherever a user_id is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. */
  external_id?: string;
  /** Roles to explicitly assign to this User.    See the [RBAC guide](https://stytch.com/docs/guides/rbac/role-assignment) for more information about role assignment. */
  roles?: (string)[];
};

export type ApiUserV1UpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the updated User. */
  user_id: string;
  /** An array of email objects for the User. */
  emails: (ApiUserV1Email)[];
  /** An array of phone number objects linked to the User. */
  phone_numbers: (ApiUserV1PhoneNumber)[];
  /** An array contains a list of all crypto wallets for a given User in the Stytch API. */
  crypto_wallets: (ApiUserV1CryptoWallet)[];
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiUserV1SearchUsersQueryOperator = "OR" | "AND";

export type ApiSessionV1AmazonOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1AppleOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1AuthenticationFactor = {
  /** The type of authentication factor. The possible values are: `email_otp`, `impersonated`, `imported`,        `magic_link`, `oauth`, `otp`, `password`, `recovery_codes`, `sso`, `trusted_auth_token`, or `totp`. */
  type: ApiSessionV1AuthenticationFactorType;
  /** The method that was used to deliver the authentication factor. The possible values depend on the `type`:             `email_otp` – Only `email`.             `impersonated` – Only `impersonation`.              `imported` – Only `imported_auth0`.             `magic_link` – Only `email`.             `oauth` – The delivery method is determined by the specific OAuth provider used. The possible values are `oauth_google`, `oauth_microsoft`, `oauth_hubspot`, `oauth_slack`, or `oauth_github`.                In addition, you may see an 'exchange' delivery method when a non-email-verifying OAuth factor originally authenticated in one organization is exchanged for a factor in another organization.         This can happen during authentication flows such as [session exchange](https://stytch.com/docs/b2b/api/exchange-session).         The non-email-verifying OAuth providers are Hubspot, Slack, and Github.         Google is also considered non-email-verifying when the HD claim is empty.         The possible exchange values are `oauth_exchange_google`, `oauth_exchange_hubspot`, `oauth_exchange_slack`, or `oauth_exchange_github`.                 The final possible value is `oauth_access_token_exchange`, if this factor came from an [access token exchange flow](https://stytch.com/docs/b2b/api/connected-app-access-token-exchange).             `otp` –  Only `sms`.             `password` – Only `knowledge`.             `recovery_codes` – Only `recovery_code`.             `sso` – Either `sso_saml` or `sso_oidc`.             `trusted_auth_token` – Only `trusted_token_exchange`.             `totp` – Only `authenticator_app`.        */
  delivery_method: ApiSessionV1AuthenticationFactorDeliveryMethod;
  /** The timestamp when the factor was last authenticated. */
  last_authenticated_at?: string;
  /** The timestamp when the factor was initially authenticated. */
  created_at?: string;
  /** The timestamp when the factor was last updated. */
  updated_at?: string;
  /** Information about the email factor, if one is present. */
  email_factor?: ApiSessionV1EmailFactor;
  /** Information about the phone number factor, if one is present. */
  phone_number_factor?: ApiSessionV1PhoneNumberFactor;
  /** Information about the Google OAuth factor, if one is present. */
  google_oauth_factor?: ApiSessionV1GoogleOAuthFactor;
  /** Information about the Microsoft OAuth factor, if one is present. */
  microsoft_oauth_factor?: ApiSessionV1MicrosoftOAuthFactor;
  apple_oauth_factor?: ApiSessionV1AppleOAuthFactor;
  webauthn_factor?: ApiSessionV1WebAuthnFactor;
  /** Information about the TOTP-backed Authenticator App factor, if one is present. */
  authenticator_app_factor?: ApiSessionV1AuthenticatorAppFactor;
  /** Information about the Github OAuth factor, if one is present. */
  github_oauth_factor?: ApiSessionV1GithubOAuthFactor;
  recovery_code_factor?: ApiSessionV1RecoveryCodeFactor;
  facebook_oauth_factor?: ApiSessionV1FacebookOAuthFactor;
  crypto_wallet_factor?: ApiSessionV1CryptoWalletFactor;
  amazon_oauth_factor?: ApiSessionV1AmazonOAuthFactor;
  bitbucket_oauth_factor?: ApiSessionV1BitbucketOAuthFactor;
  coinbase_oauth_factor?: ApiSessionV1CoinbaseOAuthFactor;
  discord_oauth_factor?: ApiSessionV1DiscordOAuthFactor;
  figma_oauth_factor?: ApiSessionV1FigmaOAuthFactor;
  git_lab_oauth_factor?: ApiSessionV1GitLabOAuthFactor;
  instagram_oauth_factor?: ApiSessionV1InstagramOAuthFactor;
  linked_in_oauth_factor?: ApiSessionV1LinkedInOAuthFactor;
  shopify_oauth_factor?: ApiSessionV1ShopifyOAuthFactor;
  /** Information about the Slack OAuth factor, if one is present. */
  slack_oauth_factor?: ApiSessionV1SlackOAuthFactor;
  snapchat_oauth_factor?: ApiSessionV1SnapchatOAuthFactor;
  spotify_oauth_factor?: ApiSessionV1SpotifyOAuthFactor;
  steam_oauth_factor?: ApiSessionV1SteamOAuthFactor;
  tik_tok_oauth_factor?: ApiSessionV1TikTokOAuthFactor;
  twitch_oauth_factor?: ApiSessionV1TwitchOAuthFactor;
  twitter_oauth_factor?: ApiSessionV1TwitterOAuthFactor;
  embeddable_magic_link_factor?: ApiSessionV1EmbeddableMagicLinkFactor;
  biometric_factor?: ApiSessionV1BiometricFactor;
  /** Information about the SAML SSO factor, if one is present. */
  saml_sso_factor?: ApiSessionV1SamlssoFactor;
  /** Information about the OIDC SSO factor, if one is present. */
  oidc_sso_factor?: ApiSessionV1OidcssoFactor;
  salesforce_oauth_factor?: ApiSessionV1SalesforceOAuthFactor;
  yahoo_oauth_factor?: ApiSessionV1YahooOAuthFactor;
  /** Information about the Hubspot OAuth factor, if one is present. */
  hubspot_oauth_factor?: ApiSessionV1HubspotOAuthFactor;
  /** Information about the Slack OAuth Exchange factor, if one is present. */
  slack_oauth_exchange_factor?: ApiSessionV1SlackOAuthExchangeFactor;
  /** Information about the Hubspot OAuth Exchange factor, if one is present. */
  hubspot_oauth_exchange_factor?: ApiSessionV1HubspotOAuthExchangeFactor;
  /** Information about the Github OAuth Exchange factor, if one is present. */
  github_oauth_exchange_factor?: ApiSessionV1GithubOAuthExchangeFactor;
  /** Information about the Google OAuth Exchange factor, if one is present. */
  google_oauth_exchange_factor?: ApiSessionV1GoogleOAuthExchangeFactor;
  /** Information about the impersonated factor, if one is present. */
  impersonated_factor?: ApiSessionV1ImpersonatedFactor;
  /** Information about the access token exchange factor, if one is present. */
  oauth_access_token_exchange_factor?: ApiSessionV1OAuthAccessTokenExchangeFactor;
  /** Information about the trusted auth token factor, if one is present. */
  trusted_auth_token_factor?: ApiSessionV1TrustedAuthTokenFactor;
};

export type ApiSessionV1AuthenticatorAppFactor = {
  /** Globally unique UUID that identifies a TOTP instance. */
  totp_id: string;
};

export type ApiSessionV1AuthorizationCheck = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s.    */
  resource_id: string;
  /** An action to take on a Resource. */
  action: string;
};

export type ApiSessionV1AuthorizationVerdict = {
  /** Whether the User was authorized to perform the specified action on the specified Resource. Always true if the request succeeds. */
  authorized: boolean;
  /** The complete list of Roles that gave the User permission to perform the specified action on the specified Resource. */
  granting_roles: (string)[];
};

export type ApiSessionV1BiometricFactor = {
  biometric_registration_id: string;
};

export type ApiSessionV1BitbucketOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1CoinbaseOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1CryptoWalletFactor = {
  crypto_wallet_id: string;
  crypto_wallet_address: string;
  crypto_wallet_type: string;
};

export type ApiSessionV1DiscordOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1EmailFactor = {
  /** The globally unique UUID of the Member's email. */
  email_id: string;
  /** The email address of the Member. */
  email_address: string;
};

export type ApiSessionV1EmbeddableMagicLinkFactor = {
  embedded_id: string;
};

export type ApiSessionV1FacebookOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1FigmaOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1GitLabOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1GithubOAuthExchangeFactor = {
  /** The globally unique UUID of the Member's email. */
  email_id: string;
};

export type ApiSessionV1GithubOAuthFactor = {
  /** The unique ID of an OAuth registration. */
  id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The globally unique UUID of the Member's email. */
  email_id?: string;
};

export type ApiSessionV1GoogleOAuthExchangeFactor = {
  /** The globally unique UUID of the Member's email. */
  email_id: string;
};

export type ApiSessionV1GoogleOAuthFactor = {
  /** The unique ID of an OAuth registration. */
  id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The globally unique UUID of the Member's email. */
  email_id?: string;
};

export type ApiSessionV1HubspotOAuthExchangeFactor = {
  /** The globally unique UUID of the Member's email. */
  email_id: string;
};

export type ApiSessionV1HubspotOAuthFactor = {
  /** The unique ID of an OAuth registration. */
  id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The globally unique UUID of the Member's email. */
  email_id?: string;
};

export type ApiSessionV1ImpersonatedFactor = {
  /** For impersonated sessions initiated via the Stytch Dashboard, the `impersonator_id` will be the impersonator's Stytch Dashboard `member_id`. */
  impersonator_id: string;
  /** The email address of the impersonator. */
  impersonator_email_address: string;
};

export type ApiSessionV1InstagramOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1Jwk = {
  kty: string;
  use: string;
  key_ops: (string)[];
  alg: string;
  kid: string;
  x5c: (string)[];
  x5tS256: string;
  n: string;
  e: string;
};

export type ApiSessionV1LinkedInOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1MicrosoftOAuthFactor = {
  /** The unique ID of an OAuth registration. */
  id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The globally unique UUID of the Member's email. */
  email_id?: string;
};

export type ApiSessionV1OAuthAccessTokenExchangeFactor = {
  /** The ID of the Connected App client. */
  client_id: string;
};

export type ApiSessionV1OidcssoFactor = {
  /** The unique ID of an SSO Registration. */
  id: string;
  /** Globally unique UUID that identifies a specific OIDC Connection. */
  provider_id: string;
  /** The ID of the member given by the identity provider. */
  external_id: string;
};

export type ApiSessionV1PhoneNumberFactor = {
  /** The globally unique UUID of the Member's phone number. */
  phone_id: string;
  /** The phone number of the Member. */
  phone_number: string;
};

export type ApiSessionV1RecoveryCodeFactor = {
  totp_recovery_code_id: string;
};

export type ApiSessionV1SamlssoFactor = {
  /** The unique ID of an SSO Registration. */
  id: string;
  /** Globally unique UUID that identifies a specific SAML Connection. */
  provider_id: string;
  /** The ID of the member given by the identity provider. */
  external_id: string;
};

export type ApiSessionV1SalesforceOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1Session = {
  /** A unique identifier for a specific Session. */
  session_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** An array of different authentication factors that comprise a Session. */
  authentication_factors: (ApiSessionV1AuthenticationFactor)[];
  roles: (string)[];
  /** The timestamp when the Session was created. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  started_at?: string;
  /** The timestamp when the Session was last accessed. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  last_accessed_at?: string;
  /** The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  expires_at?: string;
  /** Provided attributes help with fraud detection. */
  attributes?: ApiAttributeV1Attributes;
  /** The custom claims map for a Session. Claims can be added to a session during a Sessions authenticate call. */
  custom_claims?: { [key: string]: unknown };
};

export type ApiSessionV1ShopifyOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1SlackOAuthExchangeFactor = {
  /** The globally unique UUID of the Member's email. */
  email_id: string;
};

export type ApiSessionV1SlackOAuthFactor = {
  /** The unique ID of an OAuth registration. */
  id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** The globally unique UUID of the Member's email. */
  email_id?: string;
};

export type ApiSessionV1SnapchatOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1SpotifyOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1SteamOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1TikTokOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1TrustedAuthTokenFactor = {
  /** The ID of the trusted auth token. */
  token_id: string;
};

export type ApiSessionV1TwitchOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1TwitterOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

export type ApiSessionV1WebAuthnFactor = {
  webauthn_registration_id: string;
  domain: string;
  user_agent?: string;
};

export type ApiSessionV1YahooOAuthFactor = {
  id: string;
  provider_subject: string;
  email_id?: string;
};

/** Request type */
export type ApiSessionV1AttestRequest = {
  /** The ID of the trusted auth token profile to use for attestation. */
  profile_id: string;
  /** The trusted auth token to authenticate. */
  token: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** The `session_token` for the session that you wish to add the trusted auth token authentication factor to. */
  session_token?: string;
  /** The `session_jwt` for the session that you wish to add the trusted auth token authentication factor to. */
  session_jwt?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiSessionV1AttestResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiSessionV1AuthenticateRequest = {
  /** The session token to authenticate. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now; minimum of 5 and a maximum of 527040 minutes (366 days). Note that a successful authentication will continue to extend the session this many minutes. */
  session_duration_minutes?: number;
  /** The JWT to authenticate. You may provide a JWT that has expired according to its `exp` claim and needs to be refreshed. If the signature is valid and the underlying session is still active then Stytch will return a new JWT. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If an `authorization_check` object is passed in, this endpoint will also check if the User is   authorized to perform the given action on the given Resource. A User is authorized if they are assigned a Role with adequate permissions.    If the User is not authorized to perform the specified action on the specified Resource, a 403 error will be thrown.   Otherwise, the response will contain a list of Roles that satisfied the authorization check. */
  authorization_check?: ApiSessionV1AuthorizationCheck;
};

export type ApiSessionV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session: ApiSessionV1Session;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If an `authorization_check` is provided in the request and the check succeeds, this field will return   information about why the User was granted permission. */
  verdict?: ApiSessionV1AuthorizationVerdict;
};

/** Request type */
export type ApiSessionV1ExchangeAccessTokenRequest = {
  /** The access token to exchange for a Stytch Session. Must be granted the `full_access` scope. */
  access_token: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiSessionV1ExchangeAccessTokenResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiSessionV1GetJwksRequest = { [key: string]: unknown };

export type ApiSessionV1GetJwksResponse = {
  /** The list of JWKs associated with the project. */
  keys: (ApiSessionV1Jwk)[];
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiSessionV1GetRequest = {
  /** The `user_id` to get active Sessions for. You may use an `external_id` here if one is set for the user. */
  user_id: string;
};

export type ApiSessionV1GetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of [Session objects](https://stytch.com/docs/api/session-object). */
  sessions: (ApiSessionV1Session)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiSessionV1MigrateRequest = {
  /** The authorization token Stytch will pass in to the external userinfo endpoint. */
  session_token: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiSessionV1MigrateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiSessionV1RevokeRequest = {
  /** The `session_id` to revoke. */
  session_id?: string;
  /** The session token to revoke. */
  session_token?: string;
  /** A JWT for the session to revoke. */
  session_jwt?: string;
};

export type ApiSessionV1RevokeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiSessionV1AuthenticationFactorDeliveryMethod = "email" | "sms" | "whatsapp" | "embedded" | "oauth_google" | "oauth_microsoft" | "oauth_apple" | "webauthn_registration" | "authenticator_app" | "oauth_github" | "recovery_code" | "oauth_facebook" | "crypto_wallet" | "oauth_amazon" | "oauth_bitbucket" | "oauth_coinbase" | "oauth_discord" | "oauth_figma" | "oauth_gitlab" | "oauth_instagram" | "oauth_linkedin" | "oauth_shopify" | "oauth_slack" | "oauth_snapchat" | "oauth_spotify" | "oauth_steam" | "oauth_tiktok" | "oauth_twitch" | "oauth_twitter" | "knowledge" | "biometric" | "sso_saml" | "sso_oidc" | "oauth_salesforce" | "oauth_yahoo" | "oauth_hubspot" | "imported_auth0" | "oauth_exchange_slack" | "oauth_exchange_hubspot" | "oauth_exchange_github" | "oauth_exchange_google" | "impersonation" | "oauth_access_token_exchange" | "trusted_token_exchange";

export type ApiSessionV1AuthenticationFactorType = "magic_link" | "otp" | "oauth" | "webauthn" | "totp" | "crypto" | "password" | "signature_challenge" | "sso" | "imported" | "recovery_codes" | "email_otp" | "impersonated" | "trusted_auth_token";

export type ApiB2BSessionV1AuthorizationCheck = {
  /** Globally unique UUID that identifies a specific Organization. The Organization's ID must match the Member's Organization */
  organization_id: string;
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s. These include:    * `stytch.organization`   * `stytch.member`   * `stytch.sso`   * `stytch.self`    Check out the [guide on Stytch default Resources](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  resource_id: string;
  /** An action to take on a Resource. */
  action: string;
};

export type ApiB2BSessionV1AuthorizationVerdict = {
  /** Whether the Member was authorized to perform the specified action on the specified Resource. Always true if the request succeeds. */
  authorized: boolean;
  /** The complete list of Roles that gave the Member permission to perform the specified action on the specified Resource. */
  granting_roles: (string)[];
};

export type ApiB2BSessionV1MemberSession = {
  /** Globally unique UUID that identifies a specific Session. */
  member_session_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The timestamp when the Session was created. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  started_at: string;
  /** The timestamp when the Session was last accessed. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  last_accessed_at: string;
  /** The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  expires_at: string;
  /** An array of different authentication factors that comprise a Session. */
  authentication_factors: (ApiSessionV1AuthenticationFactor)[];
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  roles: (string)[];
  /** The unique URL slug of the Organization. The slug only accepts alphanumeric characters and the following reserved characters: `-` `.` `_` `~`. Must be between 2 and 128 characters in length. Wherever an organization_id is expected in a path or request parameter, you may also use the organization_slug as a convenience. */
  organization_slug: string;
  /** The custom claims map for a Session. Claims can be added to a session during a Sessions authenticate call. */
  custom_claims?: { [key: string]: unknown };
};

export type ApiB2BSessionV1PrimaryRequired = {
  /** Details the auth method that the member must also complete to fulfill the primary authentication requirements of the Organization. For example, a value of `[magic_link]` indicates that the Member must also complete a magic link authentication step. If you have an intermediate session token, you must pass it into that primary authentication step. */
  allowed_auth_methods: (string)[];
};

/** Request type */
export type ApiB2BSessionV1AttestRequest = {
  /** The ID of the trusted auth token profile to use for attestation. */
  profile_id: string;
  /** The trusted auth token to authenticate. The token must have an organization ID claim if JIT provisioning is enabled. */
  token: string;
  /** The organization ID that the session should be authenticated in. Must be provided if the trusted auth token does not have an organization ID claim. */
  organization_id?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** The `session_token` for the session that you wish to add the trusted auth token authentication factor to. */
  session_token?: string;
  /** The `session_jwt` for the session that you wish to add the trusted auth token authentication factor to. */
  session_jwt?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BSessionV1AttestResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session: ApiB2BSessionV1MemberSession;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BSessionV1AuthenticateRequest = {
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If an `authorization_check` object is passed in, this endpoint will also check if the Member is   authorized to perform the given action on the given Resource in the specified Organization. A Member is authorized if   their Member Session contains a Role, assigned   [explicitly or implicitly](https://stytch.com/docs/b2b/guides/rbac/role-assignment), with adequate permissions.   In addition, the `organization_id` passed in the authorization check must match the Member's Organization.    The Roles on the Member Session may differ from the Roles you see on the Member object - Roles that are implicitly   assigned by SSO connection or SSO group will only be valid for a Member Session if there is at least one authentication   factor on the Member Session from the specified SSO connection.    If the Member is not authorized to perform the specified action on the specified Resource, or if the   `organization_id` does not match the Member's Organization, a 403 error will be thrown.   Otherwise, the response will contain a list of Roles that satisfied the authorization check. */
  authorization_check?: ApiB2BSessionV1AuthorizationCheck;
};

export type ApiB2BSessionV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session: ApiB2BSessionV1MemberSession;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If an `authorization_check` is provided in the request and the check succeeds, this field will return   information about why the Member was granted permission. */
  verdict?: ApiB2BSessionV1AuthorizationVerdict;
};

/** Request type */
export type ApiB2BSessionV1ExchangeAccessTokenRequest = {
  /** The access token to exchange for a Stytch Session. Must be granted the `full_access` scope. */
  access_token: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BSessionV1ExchangeAccessTokenResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BSessionV1ExchangeRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The `session_token` belonging to the member that you wish to associate the email with. */
  session_token?: string;
  /** The `session_jwt` belonging to the member that you wish to associate the email with. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BSessionV1ExchangeRequestLocale;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BSessionV1ExchangeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The returned Intermediate Session Token contains any Email Magic Link or OAuth factors from the original member session that are valid for the target Organization. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BSessionV1GetJwksRequest = { [key: string]: unknown };

export type ApiB2BSessionV1GetJwksResponse = {
  /** The list of JWKs associated with the project. */
  keys: (ApiSessionV1Jwk)[];
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BSessionV1GetRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
};

export type ApiB2BSessionV1GetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of [Session objects](https://stytch.com/docs/b2b/api/session-object). */
  member_sessions: (ApiB2BSessionV1MemberSession)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BSessionV1MigrateRequest = {
  /** The authorization token Stytch will pass in to the external userinfo endpoint. */
  session_token: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
};

export type ApiB2BSessionV1MigrateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
};

/** Request type */
export type ApiB2BSessionV1RevokeRequest = {
  /** Globally unique UUID that identifies a specific Session in the Stytch API. The `member_session_id` is critical to perform operations on an Session, so be sure to preserve this value. */
  member_session_id?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. */
  member_id?: string;
};

export type ApiB2BSessionV1RevokeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BSessionV1ExchangeRequestLocale = "en" | "es" | "pt-br" | "fr" | "it" | "de-DE" | "zh-Hans" | "ca-ES";

/** Request type */
export type ApiB2BImpersonationV1AuthenticateRequest = {
  /** The Member Impersonation token to authenticate. Expires in 5 minutes by default. */
  impersonation_token: string;
};

export type ApiB2BImpersonationV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** Successfully authenticating an impersonation token will never result in an intermediate session. If the token is valid, a full session will be created. */
  intermediate_session_token: string;
  /** The member will always be fully authenticated if an impersonation token is successfully authenticated. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object) for the impersonated Member. */
  member_session?: ApiB2BSessionV1MemberSession;
  /** MFA will not be required when authenticating impersonation tokens. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
};

export type ApiB2BRbacV1OrgPolicy = {
  /** An array of [Role objects](https://stytch.com/docs/b2b/api/rbac-role-object). */
  roles: (ApiB2BRbacV1PolicyRole)[];
};

export type ApiB2BRbacV1Policy = {
  /** An array of [Role objects](https://stytch.com/docs/b2b/api/rbac-role-object). */
  roles: (ApiB2BRbacV1PolicyRole)[];
  /** An array of [Resource objects](https://stytch.com/docs/b2b/api/rbac-resource-object). */
  resources: (ApiB2BRbacV1PolicyResource)[];
  /** An array of [Scope objects](https://stytch.com/docs/b2b/api/rbac-scope-object). */
  scopes: (ApiB2BRbacV1PolicyScope)[];
};

export type ApiB2BRbacV1PolicyResource = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s. These include:    * `stytch.organization`   * `stytch.member`   * `stytch.sso`   * `stytch.self`    Check out the [guide on Stytch default Resources](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  resource_id: string;
  /** The description of the RBAC Resource. */
  description: string;
  /** A list of all possible actions for a provided Resource.    Reserved `actions` that are predefined by Stytch include:    * `*`   * For the `stytch.organization` Resource:     * `update.info.name`     * `update.info.slug`     * `update.info.untrusted_metadata`     * `update.info.email_jit_provisioning`     * `update.info.logo_url`     * `update.info.email_invites`     * `update.info.allowed_domains`     * `update.info.default_sso_connection`     * `update.info.sso_jit_provisioning`     * `update.info.mfa_policy`     * `update.info.implicit_roles`     * `delete`   * For the `stytch.member` Resource:     * `create`     * `update.info.name`     * `update.info.untrusted_metadata`     * `update.info.mfa-phone`     * `update.info.delete.mfa-phone`     * `update.settings.is-breakglass`     * `update.settings.mfa_enrolled`     * `update.settings.roles`     * `search`     * `delete`   * For the `stytch.sso` Resource:     * `create`     * `update`     * `delete`   * For the `stytch.self` Resource:     * `update.info.name`     * `update.info.untrusted_metadata`     * `update.info.mfa-phone`     * `update.info.delete.mfa-phone`     * `update.info.delete.password`     * `update.settings.mfa_enrolled`     * `delete`    */
  actions: (string)[];
};

export type ApiB2BRbacV1PolicyRole = {
  /** The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.    Reserved `role_id`s that are predefined by Stytch include:    * `stytch_member`   * `stytch_admin`    Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  role_id: string;
  /** The description of the RBAC Role. */
  description: string;
  /** A list of permissions that link a [Resource](https://stytch.com/docs/b2b/api/rbac-resource-object) to a list of actions. */
  permissions: (ApiB2BRbacV1PolicyRolePermission)[];
};

export type ApiB2BRbacV1PolicyRolePermission = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s. These include:    * `stytch.organization`   * `stytch.member`   * `stytch.sso`   * `stytch.self`    Check out the [guide on Stytch default Resources](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  resource_id: string;
  /** A list of permitted actions the Scope is required to take with the provided Resource. You can use `*` as a wildcard to require a Scope permission to use all possible actions related to the Resource.  */
  actions: (string)[];
};

export type ApiB2BRbacV1PolicyScope = {
  /** The unique identifier of the RBAC Scope, provided by the developer and intended to be human-readable. */
  scope: string;
  /** The description of the RBAC Scope. */
  description: string;
  /** A list of permissions that link a [Resource](https://stytch.com/docs/b2b/api/rbac-resource-object) to a list of actions. */
  permissions: (ApiB2BRbacV1PolicyScopePermission)[];
};

export type ApiB2BRbacV1PolicyScopePermission = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s. These include:    * `stytch.organization`   * `stytch.member`   * `stytch.sso`   * `stytch.self`    Check out the [guide on Stytch default Resources](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  resource_id: string;
  /** A list of permitted actions the Scope is required to take with the provided Resource. You can use `*` as a wildcard to require a Scope permission to use all possible actions related to the Resource.  */
  actions: (string)[];
};

/** Request type */
export type ApiB2BRbacV1PolicyRequest = { [key: string]: unknown };

export type ApiB2BRbacV1PolicyResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The RBAC Policy document that contains all defined Roles and Resources – which are managed in the [Dashboard](https://stytch.com/dashboard/rbac). Read more about these entities and how they work in our [RBAC overview](https://stytch.com/docs/b2b/guides/rbac/overview). */
  policy?: ApiB2BRbacV1Policy;
};

/** Request type */
export type ApiB2BRbacV1B2BRbacOrganizationsGetOrgPolicyRequest = { [key: string]: unknown };

export type ApiB2BRbacV1B2BRbacOrganizationsGetOrgPolicyResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The organization-specific RBAC Policy that contains roles defined for this organization. Organization policies supplement the project-level RBAC policy with additional roles that are specific to the organization. */
  org_policy: ApiB2BRbacV1OrgPolicy;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BRbacV1B2BRbacOrganizationsSetOrgPolicyRequest = {
  /** The organization-specific RBAC Policy that contains roles defined for this organization. Organization policies supplement the project-level RBAC policy with additional roles that are specific to the organization. */
  org_policy: ApiB2BRbacV1OrgPolicy;
};

export type ApiB2BRbacV1B2BRbacOrganizationsSetOrgPolicyResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The organization-specific RBAC Policy that contains roles defined for this organization. Organization policies supplement the project-level RBAC policy with additional roles that are specific to the organization. */
  org_policy: ApiB2BRbacV1OrgPolicy;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BRecoveryCodesV1GetRequest = { [key: string]: unknown };

export type ApiB2BRecoveryCodesV1GetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** An array of recovery codes that can be used to recover a Member's account. */
  recovery_codes: (string)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BRecoveryCodesV1RecoverRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The recovery code generated by a secondary MFA method. This code is used to authenticate in place of the secondary MFA method if that method as a backup. */
  recovery_code: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BRecoveryCodesV1RecoverResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The number of recovery codes remaining for a Member. */
  recovery_codes_remaining: number;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BRecoveryCodesV1RotateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
};

export type ApiB2BRecoveryCodesV1RotateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** An array of recovery codes that can be used to recover a Member's account. */
  recovery_codes: (string)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BTotpV1AuthenticateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The code to authenticate. */
  code: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** Optionally sets the Member’s MFA enrollment status upon a successful authentication. If the Organization’s MFA policy is `REQUIRED_FOR_ALL`, this field will be ignored. If this field is not passed in, the Member’s `mfa_enrolled` boolean will not be affected. The options are:     `enroll` – sets the Member's `mfa_enrolled` boolean to `true`. The Member will be required to complete an MFA step upon subsequent logins to the Organization.     `unenroll` –  sets the Member's `mfa_enrolled` boolean to `false`. The Member will no longer be required to complete MFA steps when logging in to the Organization.    */
  set_mfa_enrollment?: string;
  /** If passed will set the authenticated method to the default MFA method. Completing an MFA authentication flow for the first time for a Member will implicitly set the method to the default MFA method. This option can be used to update the default MFA method if multiple are being used. */
  set_default_mfa?: boolean;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BTotpV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BTotpV1CreateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The expiration for the TOTP registration. If the newly created TOTP registration is not authenticated within this time frame the member will have to restart the registration flow. Defaults to 60 (1 hour) with a minimum of 5 and a maximum of 1440. */
  expiration_minutes?: number;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
};

export type ApiB2BTotpV1CreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The unique ID for a TOTP instance. */
  totp_registration_id: string;
  /** The TOTP secret key shared between the authenticator app and the server used to generate TOTP codes. */
  secret: string;
  /** The QR code image encoded in base64. */
  qr_code: string;
  /** An array of recovery codes that can be used to recover a Member's account. */
  recovery_codes: (string)[];
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BTotpV1MigrateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The TOTP secret key shared between the authenticator app and the server used to generate TOTP codes. */
  secret: string;
  /** An existing set of recovery codes to be imported into Stytch to be used to authenticate in place of the secondary MFA method. */
  recovery_codes: (string)[];
};

export type ApiB2BTotpV1MigrateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The unique ID for a TOTP instance. */
  totp_registration_id: string;
  /** An array of recovery codes that can be used to recover a Member's account. */
  recovery_codes: (string)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiConsumerRbacV1Policy = {
  /** An array of [Role objects](https://stytch.com/docs/api/rbac-role-object). */
  roles: (ApiConsumerRbacV1PolicyRole)[];
  /** An array of [Resource objects](https://stytch.com/docs/api/rbac-resource-object). */
  resources: (ApiConsumerRbacV1PolicyResource)[];
  /** An array of [Scope objects](https://stytch.com/docs/api/rbac-scope-object). */
  scopes: (ApiConsumerRbacV1PolicyScope)[];
};

export type ApiConsumerRbacV1PolicyResource = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s.    */
  resource_id: string;
  /** The description of the RBAC Resource. */
  description: string;
  /** A list of all possible actions for a provided Resource. */
  actions: (string)[];
};

export type ApiConsumerRbacV1PolicyRole = {
  /** The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.    The `stytch_user` `role_id` is predefined by Stytch.   Check out the [RBAC guide](https://stytch.com/docs/guides/rbac/overview) for a more detailed explanation.    */
  role_id: string;
  /** The description of the RBAC Role. */
  description: string;
  /** A list of permissions that link a [Resource](https://stytch.com/docs/api/rbac-resource-object) to a list of actions. */
  permissions: (ApiConsumerRbacV1PolicyRolePermission)[];
};

export type ApiConsumerRbacV1PolicyRolePermission = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s.    */
  resource_id: string;
  /** A list of permitted actions the Role is authorized to take with the provided Resource. You can use `*` as a wildcard to grant a Role permission to use all possible actions related to the Resource.  */
  actions: (string)[];
};

export type ApiConsumerRbacV1PolicyScope = {
  /** The unique identifier of the RBAC Scope, provided by the developer and intended to be human-readable. */
  scope: string;
  /** The description of the RBAC Scope. */
  description: string;
  /** A list of permissions that link a [Resource](https://stytch.com/docs/api/rbac-resource-object) to a list of actions. */
  permissions: (ApiConsumerRbacV1PolicyScopePermission)[];
};

export type ApiConsumerRbacV1PolicyScopePermission = {
  /** A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.    A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch default Resources with reserved `resource_id`s.    */
  resource_id: string;
  /** A list of permitted actions the Scope is required to take with the provided Resource. You can use `*` as a wildcard to require a Scope permission to use all possible actions related to the Resource.  */
  actions: (string)[];
};

/** Request type */
export type ApiConsumerRbacV1PolicyRequest = { [key: string]: unknown };

export type ApiConsumerRbacV1PolicyResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The RBAC Policy document that contains all defined Roles and Resources – which are managed in the [Dashboard](https://stytch.com/dashboard/rbac). Read more about these entities and how they work in our [RBAC overview](https://stytch.com/docs/guides/rbac/overview). */
  policy?: ApiConsumerRbacV1Policy;
};

export type ApiCryptoWalletV1SiweParams = {
  /** Only required if `siwe_params` is passed. The domain that is requesting the crypto wallet signature. Must be an RFC 3986 authority. */
  domain: string;
  /** Only required if `siwe_params` is passed. An RFC 3986 URI referring to the resource that is the subject of the signing. */
  uri: string;
  /**  A list of information or references to information the user wishes to have resolved as part of authentication. Every resource must be an RFC 3986 URI. */
  resources: (string)[];
  /** The EIP-155 Chain ID to which the session is bound. Defaults to 1. Must be the string representation of an integer between 1 and 9,223,372,036,854,775,771, inclusive. */
  chain_id?: string;
  /** A human-readable ASCII assertion that the user will sign. The statement may only include reserved, unreserved, or space characters according to RFC 3986 definitions, and must not contain other forms of whitespace such as newlines, tabs, and carriage returns. */
  statement?: string;
  /** The time when the message was generated. Defaults to the current time. All timestamps in our API conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  issued_at?: string;
  /** The time when the signed authentication message will become valid. Defaults to the current time. All timestamps in our API conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  not_before?: string;
  /** A system-specific identifier that may be used to uniquely refer to the sign-in request. The `message_request_id` must be a valid pchar according to RFC 3986 definitions. */
  message_request_id?: string;
};

/** Request type */
export type ApiCryptoWalletV1AuthenticateRequest = {
  /** The type of wallet to authenticate. Currently `ethereum` and `solana` are supported. Wallets for any EVM-compatible chains (such as Polygon or BSC) are also supported and are grouped under the `ethereum` type. */
  crypto_wallet_type: string;
  /** The crypto wallet address to authenticate. */
  crypto_wallet_address: string;
  /** The signature from the message challenge. */
  signature: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiCryptoWalletV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** The parameters of the Sign In With Ethereum (SIWE) message that was signed. */
  siwe_params?: ApiCryptoWalletV1SiweParamsResponse;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiCryptoWalletV1AuthenticateStartRequest = {
  /** The type of wallet to authenticate. Currently `ethereum` and `solana` are supported. Wallets for any EVM-compatible chains (such as Polygon or BSC) are also supported and are grouped under the `ethereum` type. */
  crypto_wallet_type: string;
  /** The crypto wallet address to authenticate. */
  crypto_wallet_address: string;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** The parameters for a Sign In With Ethereum (SIWE) message. May only be passed if the `crypto_wallet_type` is `ethereum`. */
  siwe_params?: ApiCryptoWalletV1SiweParams;
};

export type ApiCryptoWalletV1AuthenticateStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A challenge string to be signed by the wallet in order to prove ownership. */
  challenge: string;
  /** In `login_or_create` endpoints, this field indicates whether or not a User was just created. */
  user_created: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiCryptoWalletV1SiweParamsResponse = {
  /** The domain that requested the crypto wallet signature. */
  domain: string;
  /** An RFC 3986 URI referring to the resource that is the subject of the signing. */
  uri: string;
  /** The EIP-155 Chain ID to which the session is bound. */
  chain_id: string;
  /**  A list of information or references to information the user wishes to have resolved as part of authentication. Every resource must be an RFC 3986 URI. */
  resources: (string)[];
  status_code: number;
  /** The time when the message was generated. All timestamps in our API conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  issued_at?: string;
  /** A system-specific identifier that may be used to uniquely refer to the sign-in request. */
  message_request_id?: string;
};

export type ApiDebugV1WhoamiRequest = { [key: string]: unknown };

export type ApiDebugV1WhoamiResponse = {
  request_id: string;
  project_id: string;
  name: string;
  status_code: number;
};

export type ApiDiscoveryV1DiscoveredOrganization = {
  /** Indicates whether the Member has all of the factors needed to fully authenticate to this Organization. If false, the Member may need to complete an MFA step or complete a different primary authentication flow. See the `primary_required` and `mfa_required` fields for more details on each. */
  member_authenticated: boolean;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization?: ApiOrganizationV1Organization;
  /** Information about the membership. */
  membership?: ApiDiscoveryV1Membership;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
};

export type ApiDiscoveryV1Membership = {
  /** Either `active_member`, `pending_member`, `invited_member`, `eligible_to_join_by_email_domain`, or `eligible_to_join_by_oauth_tenant` */
  type: string;
  /** An object containing additional metadata about the membership, if available. */
  details?: { [key: string]: unknown };
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) if one already exists, or null if one does not. */
  member?: ApiOrganizationV1Member;
};

/** Request type */
export type ApiDiscoveryV1DiscoveryIntermediateSessionsExchangeRequest = {
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiDiscoveryV1ExchangeRequestLocale;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiDiscoveryV1DiscoveryIntermediateSessionsExchangeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The returned Intermediate Session Token is identical to the one that was originally passed in to the request. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

export type ApiDiscoveryV1ExchangeRequestLocale = "en" | "es" | "pt-br" | "fr" | "it" | "de-DE" | "zh-Hans" | "ca-ES";

/** Request type */
export type ApiDiscoveryV1DiscoveryListRequest = {
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
};

export type ApiDiscoveryV1DiscoveryListResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The email address. */
  email_address: string;
  /** An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`, or `session_jwt`. See the [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for complete details.    Note that Organizations will only appear here under any of the following conditions:   1. The end user is already a Member of the Organization.   2. The end user is invited to the Organization.   3. The end user can join the Organization because:        a) The Organization allows JIT provisioning.        b) The Organizations' allowed domains list contains the Member's email domain.        c) The Organization has at least one other Member with a verified email address with the same domain as the end user (to prevent phishing attacks). */
  discovered_organizations: (ApiDiscoveryV1DiscoveredOrganization)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If the intermediate session token is associated with a specific Organization, that Organization ID will be returned here. The Organization ID will be null if the intermediate session token was generated by a email magic link discovery or OAuth discovery flow. If a session token or session JWT is provided, the Organization ID hint will be null. */
  organization_id_hint?: string;
};

/** Request type */
export type ApiDiscoveryV1DiscoveryOrganizationsCreateRequest = {
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** The name of the Organization. If the name is not specified, a default name will be created based on the email used to initiate the discovery flow. If the email domain is a common email provider such as gmail.com, or if the email is a .edu email, the organization name will be generated based on the name portion of the email. Otherwise, the organization name will be generated based on the email domain. */
  organization_name?: string;
  /** The unique URL slug of the Organization. A minimum of two characters is required. The slug only accepts alphanumeric characters and the following reserved characters: `-` `.` `_` `~`. If the slug is not specified, a default slug will be created based on the email used to initiate the discovery flow. If the email domain is a common email provider such as gmail.com, or if the email is a .edu email, the organization slug will be generated based on the name portion of the email. Otherwise, the organization slug will be generated based on the email domain. */
  organization_slug?: string;
  /** An identifier that can be used in API calls wherever a organization_id is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within a project, but may be reused across different projects in the same workspace. */
  organization_external_id?: string;
  /** The image URL of the Organization logo. */
  organization_logo_url?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** The authentication setting that controls the JIT provisioning of Members when authenticating via SSO. The accepted values are:     `ALL_ALLOWED` – the default setting, new Members will be automatically provisioned upon successful authentication via any of the Organization's `sso_active_connections`.     `RESTRICTED` – only new Members with SSO logins that comply with `sso_jit_provisioning_allowed_connections` can be provisioned upon authentication.     `NOT_ALLOWED` – disable JIT provisioning via SSO.    */
  sso_jit_provisioning?: string;
  /** An array of email domains that allow invites or JIT provisioning for new Members. This list is enforced when either `email_invites` or `email_jit_provisioning` is set to `RESTRICTED`.             Common domains such as `gmail.com` are not allowed. See the [common email domains resource](https://stytch.com/docs/b2b/api/common-email-domains) for the full list. */
  email_allowed_domains?: (string)[];
  /** The authentication setting that controls how a new Member can be provisioned by authenticating via Email Magic Link or OAuth. The accepted values are:     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be provisioned upon authentication via Email Magic Link or OAuth.     `NOT_ALLOWED` – the default setting, disables JIT provisioning via Email Magic Link and OAuth.    */
  email_jit_provisioning?: string;
  /** The authentication setting that controls how a new Member can be invited to an organization by email. The accepted values are:     `ALL_ALLOWED` – any new Member can be invited to join via email.     `RESTRICTED` – only new Members with verified emails that comply with `email_allowed_domains` can be invited via email.     `NOT_ALLOWED` – disable email invites.    */
  email_invites?: string;
  /** The setting that controls which authentication methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_auth_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.    */
  auth_methods?: string;
  /** An array of allowed authentication methods. This list is enforced when `auth_methods` is set to `RESTRICTED`.   The list's accepted values are: `sso`, `magic_link`, `email_otp`, `password`, `google_oauth`, `microsoft_oauth`, `slack_oauth`, `github_oauth`, and `hubspot_oauth`.    */
  allowed_auth_methods?: (string)[];
  /** The setting that controls the MFA policy for all Members in the Organization. The accepted values are:     `REQUIRED_FOR_ALL` – All Members within the Organization will be required to complete MFA every time they wish to log in. However, any active Session that existed prior to this setting change will remain valid.     `OPTIONAL` – The default value. The Organization does not require MFA by default for all Members. Members will be required to complete MFA only if their `mfa_enrolled` status is set to true.    */
  mfa_policy?: string;
  /** Implicit role assignments based off of email domains.   For each domain-Role pair, all Members whose email addresses have the specified email domain will be granted the   associated Role, regardless of their login method. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)   for more information about role assignment. */
  rbac_email_implicit_role_assignments?: (ApiOrganizationV1EmailImplicitRoleAssignment)[];
  /** The setting that controls which MFA methods can be used by Members of an Organization. The accepted values are:     `ALL_ALLOWED` – the default setting which allows all authentication methods to be used.     `RESTRICTED` – only methods that comply with `allowed_mfa_methods` can be used for authentication. This setting does not apply to Members with `is_breakglass` set to `true`.    */
  mfa_methods?: string;
  /** An array of allowed MFA authentication methods. This list is enforced when `mfa_methods` is set to `RESTRICTED`.   The list's accepted values are: `sms_otp` and `totp`.    */
  allowed_mfa_methods?: (string)[];
  /** The authentication setting that controls how a new Member can JIT provision into an organization by tenant. The accepted values are:     `RESTRICTED` – only new Members with tenants in `allowed_oauth_tenants` can JIT provision via tenant.     `NOT_ALLOWED` – the default setting, disables JIT provisioning by OAuth Tenant.    */
  oauth_tenant_jit_provisioning?: string;
  /** A map of allowed OAuth tenants. If this field is not passed in, the Organization will not allow JIT provisioning by OAuth Tenant. Allowed keys are "slack", "hubspot", and "github". */
  allowed_oauth_tenants?: { [key: string]: unknown };
  /** The authentication setting that sets the Organization's policy towards first party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any first party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only first party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no first party Connected Apps are permitted.    */
  first_party_connected_apps_allowed_type?: ApiDiscoveryV1CreateRequestFirstPartyConnectedAppsAllowedType;
  /** An array of first party Connected App IDs that are allowed for the Organization. Only used when the Organization's `first_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_first_party_connected_apps?: (string)[];
  /** The authentication setting that sets the Organization's policy towards third party Connected Apps. The accepted values are:     `ALL_ALLOWED` – the default setting, any third party Connected App in the Project is permitted for use by Members.     `RESTRICTED` – only third party Connected Apps with IDs in `allowed_first_party_connected_apps` can be used by Members.     `NOT_ALLOWED` – no third party Connected Apps are permitted.    */
  third_party_connected_apps_allowed_type?: ApiDiscoveryV1CreateRequestThirdPartyConnectedAppsAllowedType;
  /** An array of third party Connected App IDs that are allowed for the Organization. Only used when the Organization's `third_party_connected_apps_allowed_type` is `RESTRICTED`. */
  allowed_third_party_connected_apps?: (string)[];
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiDiscoveryV1DiscoveryOrganizationsCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The returned Intermediate Session Token is identical to the one that was originally passed in to the request. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

export type ApiDiscoveryV1CreateRequestFirstPartyConnectedAppsAllowedType = "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

export type ApiDiscoveryV1CreateRequestThirdPartyConnectedAppsAllowedType = "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

export type ApiFraudV1AsnProperties = {
  /** The Autonomous System Number of the user's network. */
  asn: string;
  /** Public name associated with the ASN. */
  name: string;
  /** The CIDR block associated with the ASN. */
  network: string;
};

export type ApiFraudV1AddressInformation = {
  /** Whether email sent to this address is known to have bounced previously. */
  has_known_bounces: boolean;
  /** Whether this email address is valid. */
  has_valid_syntax: boolean;
  /** Whether the local part of the email appears to be a role or group, rather than an individual end user. */
  is_suspected_role_address: boolean;
  /** The normalized email address after removing '.' characters and any characters after a '+'. */
  normalized_email: string;
  /** The number of '.' and '+' characters in the email address. A higher tumbling count indicates a higher potential for fraud. */
  tumbling_character_count: number;
};

export type ApiFraudV1BrowserProperties = {
  /** The user agent of the user's browser. */
  user_agent: string;
};

export type ApiFraudV1DomainInformation = {
  /** Whether the email has appropriate DNS records to deliver a message. */
  has_mx_or_a_record: boolean;
  /** Whether the email domain is known to be disposable. */
  is_disposable_domain: boolean;
};

export type ApiFraudV1Fingerprints = {
  /** Combination of signals associated with a specific network commonly known as TLS fingerprinting.  */
  network_fingerprint: string;
  /** Combinations of signals to identify an operating system and architecture. */
  hardware_fingerprint: string;
  /** Combination of signals to identify a browser and its specific version. */
  browser_fingerprint: string;
  /** Cookie-less way of identifying a unique user. */
  visitor_fingerprint: string;
  /** The cookie stored on the user's device that uniquely identifies them. */
  visitor_id?: string;
  /** Combination of VisitorID and NetworkFingerprint to create a clear identifier of a browser. */
  browser_id?: string;
};

export type ApiFraudV1IpGeoProperties = {
  /** The city where the IP is located. */
  city: string;
  /** The region where the IP is located. */
  region: string;
  /** The country where the IP is located. */
  country: string;
};

export type ApiFraudV1Metadata = {
  /** An external ID, such as a user ID, that you wish to associate with the telemetry ID. */
  external_id?: string;
  /** The organization ID you wish to associate with the telemetry ID. */
  organization_id?: string;
  /** The user action, such as 'login', that you wish to associate with the telemetry ID. */
  user_action?: string;
};

export type ApiFraudV1NetworkProperties = {
  /** The IP address of the client. */
  ip_address: string;
  /** Information about the network's ASN (Autonomous System Number). */
  asn: ApiFraudV1AsnProperties;
  /** Information about the geolocation of the user's IP address. */
  ip_geolocation: ApiFraudV1IpGeoProperties;
  /** Whether the user is using a proxy. */
  is_proxy: boolean;
  /** Whether the user is using a VPN. */
  is_vpn: boolean;
};

export type ApiFraudV1Properties = {
  network_properties: ApiFraudV1NetworkProperties;
  browser_properties: ApiFraudV1BrowserProperties;
};

export type ApiFraudV1Rule = {
  /** The rule type. The possible values are `VISITOR_ID`, `BROWSER_ID`, `VISITOR_FINGERPRINT`, `BROWSER_FINGERPRINT`, `HARDWARE_FINGERPRINT`, `NETWORK_FINGERPRINT`, `CIDR_BLOCK`, `ASN`, or `COUNTRY_CODE`. */
  rule_type: ApiFraudV1RuleType;
  /** The action (`ALLOW`, `BLOCK`, or `CHALLENGE`) that will be returned for this rule. */
  action: ApiFraudV1RuleAction;
  /** The time when the rule was created. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  created_at: string;
  /** The visitor ID that a rule was set for. */
  visitor_id?: string;
  /** The browser ID that a rule was set for. */
  browser_id?: string;
  /** The visitor fingerprint that a rule was set for. */
  visitor_fingerprint?: string;
  /** The browser fingerprint that a rule was set for. */
  browser_fingerprint?: string;
  /** The hardware fingerprint that a rule was set for. */
  hardware_fingerprint?: string;
  /** The network fingerprint that a rule was set for. */
  network_fingerprint?: string;
  /** The CIDR block that a rule was set for. If an end user's IP address is within this CIDR block, this rule will be applied. */
  cidr_block?: string;
  /** The country code that a rule was set for. */
  country_code?: string;
  /** The ASN that a rule was set for. */
  asn?: string;
  /** A description for the rule. */
  description?: string;
  /** The timestamp when the rule expires. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  expires_at?: string;
  /** The time when the rule was last updated. Will be null if the rule has never been updated. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  last_updated_at?: string;
};

export type ApiFraudV1Verdict = {
  /** The suggested action based on the fingerprint review. The available actions are:   * `ALLOW` - This is a known valid device grouping or device profile that is part of the default ALLOW listed set of known devices by Stytch. This grouping is made up of verified device profiles that match the characteristics of known/authentic traffic origins   * `BLOCK` - This is a known bad or malicious device profile that is undesirable and should be blocked from completing the privileged action in question   * `CHALLENGE` - This is an unknown or potentially malicious device that should be put through increased friction such as 2FA or other forms of extended user verification before allowing the privileged action to proceed    */
  action: ApiFraudV1VerdictAction;
  /** A set of contextual clues to inform why a `CHALLENGE` or `BLOCK` action was suggested. For a list of possible Reasons, see [Warning Flags (Verdict Reasons)](https://stytch.com/docs/docs/fraud/guides/device-fingerprinting/reference/warning-flags-verdict-reasons). */
  reasons: (string)[];
  /** The operating system and architecture that took the fingerprint. */
  detected_device_type: string;
  /** The assessment of whether this is an authentic device. It will be false if hardware or browser deception is detected. */
  is_authentic_device: boolean;
  /** A list of verdict reason overrides that were applied, if any. */
  verdict_reason_overrides: (ApiFraudV1VerdictReasonOverride)[];
  /** The type of rule match that was applied (e.g. `VISITOR_ID`), if any. This field will only be present if there is a `RULE_MATCH` reason in the list of verdict reasons. */
  rule_match_type?: ApiFraudV1RuleType;
  /** The rule that was applied (e.g. a specific visitor ID value), if any. This field will only be present if there is a `RULE_MATCH` reason in the list of verdict reasons. */
  rule_match_identifier?: string;
};

export type ApiFraudV1VerdictReasonAction = {
  /** The verdict reason. */
  verdict_reason: string;
  /** The default action returned for the specified verdict reason in a fingerprint lookup when no overrides are specified. */
  default_action: ApiFraudV1VerdictReasonActionAction;
  /** If not null, this action will be returned for the specified verdict reason in a fingerprint lookup, in place of the default action. */
  override_action?: ApiFraudV1VerdictReasonActionAction;
  /** The time when the override was created, if one exists. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  override_created_at?: string;
  /** A description of the override, if one exists. */
  override_description?: string;
};

export type ApiFraudV1VerdictReasonOverride = {
  /** The verdict reason that was overridden. */
  verdict_reason: string;
  /** The action that was applied for the given verdict reason. */
  override_action: ApiFraudV1VerdictReasonOverrideAction;
};

export type ApiFraudV1RuleAction = "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE";

export type ApiFraudV1RuleType = "VISITOR_ID" | "BROWSER_ID" | "VISITOR_FINGERPRINT" | "BROWSER_FINGERPRINT" | "HARDWARE_FINGERPRINT" | "NETWORK_FINGERPRINT" | "CIDR_BLOCK" | "ASN" | "COUNTRY_CODE";

export type ApiFraudV1VerdictAction = "ALLOW" | "CHALLENGE" | "BLOCK";

export type ApiFraudV1VerdictReasonActionAction = "ALLOW" | "CHALLENGE" | "BLOCK";

export type ApiFraudV1VerdictReasonOverrideAction = "ALLOW" | "CHALLENGE" | "BLOCK";

/** Request type */
export type ApiFraudV1FraudFingerprintLookupRequest = {
  /** The telemetry ID associated with the fingerprint getting looked up. */
  telemetry_id: string;
  /** External identifiers that you wish to associate with the given telemetry ID. You will be able to search for fingerprint results by these identifiers in the DFP analytics dashboard. External metadata fields may not exceed 65 characters. They may only contain alphanumerics and the characters `_` `-` `+` `.` or `@`. */
  external_metadata?: ApiFraudV1Metadata;
};

export type ApiFraudV1FraudFingerprintLookupResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The telemetry ID associated with the fingerprint getting looked up. */
  telemetry_id: string;
  /** A Stytch fingerprint consists of the following identifiers: */
  fingerprints: ApiFraudV1Fingerprints;
  /** The metadata associated with each fingerprint */
  verdict: ApiFraudV1Verdict;
  /** External identifiers that you wish to associate with the given telemetry ID. You will be able to search for fingerprint results by these identifiers in the DFP analytics dashboard. External metadata fields may not exceed 65 characters. They may only contain alphanumerics and the characters `_` `-` `+` `.` or `@`. */
  external_metadata: ApiFraudV1Metadata;
  /** The time when the fingerprint was taken. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  created_at: string;
  /** The timestamp when the fingerprint expires. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  expires_at: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** Additional information about the user's browser and network. */
  properties?: ApiFraudV1Properties;
  /** The raw device attributes, such as screen size, that were collected by the Device Fingerprinting product to generate the fingerprints and verdict. You must be specifically enabled for the raw signals feature to see this field. You can find documentation for the specific fields in the [guides](https://stytch.com/docs/fraud/guides/device-fingerprinting/reference/raw-signals). */
  raw_signals?: { [key: string]: unknown };
};

/** Request type */
export type ApiFraudV1FraudRulesListRequest = {
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 100 results. If your query returns more than 100 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor`, repeat the request with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make requests until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of results to return per page. The default limit is 10. A maximum of 100 results can be returned by a single get request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
};

export type ApiFraudV1FraudRulesListResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The `next_cursor` string is returned when your result contains more than one page of results. This value is passed into your next request in the `cursor` field. */
  next_cursor: string;
  /** A list of rules for the project */
  rules: (ApiFraudV1Rule)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiFraudV1FraudRulesSetRequest = {
  /** The action that should be returned by a fingerprint lookup for that identifier with a `RULE_MATCH` reason. The following values are valid: `ALLOW`, `BLOCK`, `CHALLENGE`, or `NONE`. For country codes, `ALLOW` actions are not allowed. If a `NONE` action is specified, it will clear the stored rule. */
  action: ApiFraudV1RuleAction;
  /** The visitor ID we want to set a rule for. Only one identifier can be specified in the request. */
  visitor_id?: string;
  /** The browser ID we want to set a rule for. Only one identifier can be specified in the request. */
  browser_id?: string;
  /** The visitor fingerprint we want to set a rule for. Only one identifier can be specified in the request. */
  visitor_fingerprint?: string;
  /** The browser fingerprint we want to set a rule for. Only one identifier can be specified in the request. */
  browser_fingerprint?: string;
  /** The hardware fingerprint we want to set a rule for. Only one identifier can be specified in the request. */
  hardware_fingerprint?: string;
  /** The network fingerprint we want to set a rule for. Only one identifier can be specified in the request. */
  network_fingerprint?: string;
  /** The number of minutes until this rule expires. If no `expires_in_minutes` is specified, then the rule is kept permanently. */
  expires_in_minutes?: number;
  /** An optional description for the rule. */
  description?: string;
  /** The CIDR block we want to set a rule for. You may pass either an IP address or a CIDR block. The CIDR block prefix must be between 16 and 32, inclusive. If an end user's IP address is within this CIDR block, this rule will be applied. Only one identifier can be specified in the request. */
  cidr_block?: string;
  /** The country code we want to set a rule for. The country code must be a valid ISO 3166-1 alpha-2 code. You may not set `ALLOW` rules for country codes. Only one identifier can be specified in the request. */
  country_code?: string;
  /** The ASN we want to set a rule for. The ASN must be the string representation of an integer between 0 and 4294967295, inclusive. Only one identifier can be specified in the request. */
  asn?: string;
};

export type ApiFraudV1FraudRulesSetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The action that will be returned for the specified identifier. */
  action: ApiFraudV1RuleAction;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The visitor ID that a rule was set for. */
  visitor_id?: string;
  /** The browser ID that a rule was set for. */
  browser_id?: string;
  /** The visitor fingerprint that a rule was set for. */
  visitor_fingerprint?: string;
  /** The browser fingerprint that a rule was set for. */
  browser_fingerprint?: string;
  /** The hardware fingerprint that a rule was set for. */
  hardware_fingerprint?: string;
  /** The network fingerprint that a rule was set for. */
  network_fingerprint?: string;
  /** The timestamp when the rule expires. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  expires_at?: string;
  /** The CIDR block that a rule was set for. If an end user's IP address is within this CIDR block, this rule will be applied. */
  cidr_block?: string;
  /** The country code that a rule was set for. */
  country_code?: string;
  /** The ASN that a rule was set for. */
  asn?: string;
};

/** Request type */
export type ApiFraudV1FraudVerdictReasonsListRequest = {
  /** Whether to return only verdict reasons that have overrides set. Defaults to false. */
  overrides_only?: boolean;
};

export type ApiFraudV1FraudVerdictReasonsListResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Information about verdict reasons and any overrides that were set on them. */
  verdict_reason_actions: (ApiFraudV1VerdictReasonAction)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiFraudV1FraudVerdictReasonsOverrideRequest = {
  /** The verdict reason that you wish to override. For a list of possible reasons to override, see [Warning Flags (Verdict Reasons)](https://stytch.com/docs/docs/fraud/guides/device-fingerprinting/reference/warning-flags-verdict-reasons). You may not override the `RULE_MATCH` reason. */
  verdict_reason: string;
  /** The action that you want to be returned for the specified verdict reason. The override action must be one of `ALLOW`, `BLOCK`, or `CHALLENGE`. */
  override_action: ApiFraudV1OverrideRequestAction;
  /** An optional description for the verdict reason override. */
  override_description?: string;
};

export type ApiFraudV1FraudVerdictReasonsOverrideResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Information about the verdict reason override that was just set. */
  verdict_reason_action: ApiFraudV1VerdictReasonAction;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiFraudV1OverrideRequestAction = "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE";

/** Request type */
export type ApiFraudV1FraudEmailRiskRequest = {
  /** The email address to check. */
  email_address: string;
};

export type ApiFraudV1FraudEmailRiskResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Information about the email address. */
  address_information: ApiFraudV1AddressInformation;
  /** Information about the email domain. */
  domain_information: ApiFraudV1DomainInformation;
  /** The suggested action based on the attributes of the email address. The available actions are:   * `ALLOW` - This email is most likely safe to send to and not fraudulent.   * `BLOCK` - This email is invalid or exhibits signs of fraud. We recommend blocking the end user.   * `CHALLENGE` - This email has some potentially fraudulent attributes. We recommend increased friction such as 2FA or other forms of extended user verification before allowing the privileged action to proceed.    */
  action: ApiFraudV1RiskResponseAction;
  /** A score from 0 to 100 indicating how risky the email is. 100 is the most risky. */
  risk_score: number;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiFraudV1RiskResponseAction = "ALLOW" | "CHALLENGE" | "BLOCK";

export type ApiIdpV1ScopeResult = {
  /** The name of the scope. */
  scope: string;
  /** A human-readable description of the scope, taken from the RBAC Policy. */
  description: string;
  /** Indicates whether the scope can be granted. Users can only grant scopes if they have the required permissions. */
  is_grantable: boolean;
};

/** Request type */
export type ApiIdpV1IdpOauthAuthorizeRequest = {
  /** Indicates whether the user granted the requested scopes. */
  consent_granted: boolean;
  /** An array of scopes requested by the client. */
  scopes: (string)[];
  /** The ID of the Connected App client. */
  client_id: string;
  /** The callback URI used to redirect the user after authentication. This is the same URI provided at the start of the OAuth flow.  This field is required when using the `authorization_code` grant. */
  redirect_uri: string;
  /** The OAuth 2.0 response type. For authorization code flows this value is `code`. */
  response_type: string;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Space separated list that specifies how the Authorization Server should prompt the user for reauthentication and consent. Only `consent` is supported today. */
  prompt?: string;
  /** An opaque value used to maintain state between the request and callback. */
  state?: string;
  /** A string used to associate a client session with an ID token to mitigate replay attacks. */
  nonce?: string;
  /** A base64url encoded challenge derived from the code verifier for PKCE flows. */
  code_challenge?: string;
  resources?: (string)[];
};

export type ApiIdpV1IdpOauthAuthorizeResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The callback URI used to redirect the user after authentication. This is the same URI provided at the start of the OAuth flow.  This field is required when using the `authorization_code` grant. */
  redirect_uri: string;
  status_code: number;
  /** A one-time use code that can be exchanged for tokens. */
  authorization_code?: string;
};

/** Request type */
export type ApiIdpV1IdpOauthAuthorizeStartRequest = {
  /** The ID of the Connected App client. */
  client_id: string;
  /** The callback URI used to redirect the user after authentication. This is the same URI provided at the start of the OAuth flow.  This field is required when using the `authorization_code` grant. */
  redirect_uri: string;
  /** The OAuth 2.0 response type. For authorization code flows this value is `code`. */
  response_type: string;
  /** An array of scopes requested by the client. */
  scopes: (string)[];
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Space separated list that specifies how the Authorization Server should prompt the user for reauthentication and consent. Only `consent` is supported today. */
  prompt?: string;
};

export type ApiIdpV1IdpOauthAuthorizeStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  client: ApiConnectedappsV1ConnectedAppPublic;
  /** Whether the user must provide explicit consent for the authorization request. */
  consent_required: boolean;
  /** Details about each requested scope. */
  scope_results: (ApiIdpV1ScopeResult)[];
  status_code: number;
};

/** Request type */
export type ApiImpersonationV1AuthenticateRequest = {
  /** The User Impersonation token to authenticate. Expires in 5 minutes by default. */
  impersonation_token: string;
};

export type ApiImpersonationV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
};

export type ApiM2MV1M2MClient = {
  /** The ID of the client. */
  client_id: string;
  /** A human-readable name for the client. */
  client_name: string;
  /** A human-readable description for the client. */
  client_description: string;
  /** The status of the client - either `active` or `inactive`. */
  status: string;
  /** An array of scopes assigned to the client. */
  scopes: (string)[];
  /** The last four characters of the client secret. */
  client_secret_last_four: string;
  /** An arbitrary JSON object for storing application-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists. */
  next_client_secret_last_four?: string;
};

export type ApiM2MV1M2MClientWithClientSecret = {
  /** The ID of the client. */
  client_id: string;
  /** The secret of the client. **Important:** this is the only time you will be able to view the `client_secret`. Be sure to persist the `client_secret` in a secure location. If the `client_secret` is lost, you will need to trigger a secret rotation flow to receive another one. */
  client_secret: string;
  /** A human-readable name for the client. */
  client_name: string;
  /** A human-readable description for the client. */
  client_description: string;
  /** The status of the client - either `active` or `inactive`. */
  status: string;
  /** An array of scopes assigned to the client. */
  scopes: (string)[];
  /** The last four characters of the client secret. */
  client_secret_last_four: string;
  /** An arbitrary JSON object for storing application-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists. */
  next_client_secret_last_four?: string;
};

export type ApiM2MV1M2MClientWithNextClientSecret = {
  /** The ID of the client. */
  client_id: string;
  /** The newly created secret that's next in rotation for the client. **Important:** this is the only time you will be able to view the `next_client_secret`. Be sure to persist the `next_client_secret` in a secure location. If the `next_client_secret` is lost, you will need to trigger a secret rotation flow to receive another one. */
  next_client_secret: string;
  /** A human-readable name for the client. */
  client_name: string;
  /** A human-readable description for the client. */
  client_description: string;
  /** The status of the client - either `active` or `inactive`. */
  status: string;
  /** An array of scopes assigned to the client. */
  scopes: (string)[];
  /** The last four characters of the client secret. */
  client_secret_last_four: string;
  /** An arbitrary JSON object for storing application-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** The last four characters of the `next_client_secret`. Null if no `next_client_secret` exists. */
  next_client_secret_last_four?: string;
};

export type ApiM2MV1M2MSearchQuery = {
  /** The action to perform on the operands. The accepted value are:    `AND` – all the operand values provided must match.      `OR` – the operator will return any matches to at least one of the operand values you supply. */
  operator: ApiM2MV1M2MSearchQueryOperator;
  /** An array of operand objects that contains all of the filters and values to apply to your search search query. */
  operands: ({ [key: string]: unknown })[];
};

export type ApiM2MV1ResultsMetadata = {
  /** The total number of results returned by your search query. If totals have been disabled for your Stytch Workspace to improve search performance, the value will always be -1. */
  total: number;
  /** The `next_cursor` string is returned when your search result contains more than one page of results. This value is passed into your next search call in the `cursor` field. */
  next_cursor?: string;
};

export type ApiM2MV1M2MSearchQueryOperator = "OR" | "AND";

/** Request type */
export type ApiM2MV1M2MClientsCreateRequest = {
  /** An array of scopes assigned to the client. */
  scopes: (string)[];
  /** If provided, the ID of the client to create. If not provided, Stytch will generate this value for you. The `client_id` must be unique within your project. */
  client_id?: string;
  /** If provided, the stored secret of the client to create. If not provided, Stytch will generate this value for you. If provided, the `client_secret` must be at least 8 characters long and pass entropy requirements. */
  client_secret?: string;
  /** A human-readable name for the client. */
  client_name?: string;
  /** A human-readable description for the client. */
  client_description?: string;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
};

export type ApiM2MV1M2MClientsCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The M2M Client created by this API call. */
  m2m_client: ApiM2MV1M2MClientWithClientSecret;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiM2MV1M2MClientsDeleteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The ID of the client. */
  client_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiM2MV1M2MClientsGetRequest = { [key: string]: unknown };

export type ApiM2MV1M2MClientsGetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The M2M Client affected by this operation. */
  m2m_client: ApiM2MV1M2MClient;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiM2MV1M2MClientsSearchRequest = {
  /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
  cursor?: string;
  /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
  limit?: number;
  /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all results with no filtering applied. */
  query?: ApiM2MV1M2MSearchQuery;
};

export type ApiM2MV1M2MClientsSearchResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** An array of M2M Clients that match your search query. */
  m2m_clients: (ApiM2MV1M2MClient)[];
  /** The search `results_metadata` object contains metadata relevant to your specific query like total and `next_cursor`. */
  results_metadata: ApiM2MV1ResultsMetadata;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiM2MV1M2MClientsUpdateRequest = {
  /** A human-readable name for the client. */
  client_name?: string;
  /** A human-readable description for the client. */
  client_description?: string;
  /** The status of the client - either `active` or `inactive`. */
  status?: ApiM2MV1UpdateRequestStatus;
  /** An array of scopes assigned to the client. */
  scopes?: (string)[];
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
};

export type ApiM2MV1M2MClientsUpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The M2M Client affected by this operation. */
  m2m_client: ApiM2MV1M2MClient;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiM2MV1UpdateRequestStatus = "active" | "inactive";

/** Request type */
export type ApiM2MV1M2MClientsSecretsRotateCancelRequest = { [key: string]: unknown };

export type ApiM2MV1M2MClientsSecretsRotateCancelResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The M2M Client affected by this operation. */
  m2m_client: ApiM2MV1M2MClient;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiM2MV1M2MClientsSecretsRotateRequest = { [key: string]: unknown };

export type ApiM2MV1M2MClientsSecretsRotateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The M2M Client affected by this operation. */
  m2m_client: ApiM2MV1M2MClient;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiM2MV1M2MClientsSecretsRotateStartRequest = { [key: string]: unknown };

export type ApiM2MV1M2MClientsSecretsRotateStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The M2M Client affected by this operation. */
  m2m_client: ApiM2MV1M2MClientWithNextClientSecret;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiMagicV1Options = {
  /** Require that the IP address the Magic Link was requested from matches the IP address it's clicked from. */
  ip_match_required: boolean;
  /** Require that the user agent the Magic Link was requested from matches the user agent it's clicked from. */
  user_agent_match_required: boolean;
};

/** Request type */
export type ApiMagicV1AuthenticateRequest = {
  /** The Magic Link `token` from the `?token=` query parameter in the URL.        The redirect URL will look like `https://example.com/authenticate?stytch_token_type=magic_links&token=rM_kw42CWBhsHLF62V75jELMbvJ87njMe3tFVj7Qupu7`        In the redirect URL, the `stytch_token_type` will be `magic_link`. See [here](https://stytch.com/docs/workspace-management/redirect-urls) for more detail. */
  token: string;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Specify optional security settings. */
  options?: ApiMagicV1Options;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  code_verifier?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiMagicV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `email_id` or `phone_id` involved in the given authentication. */
  method_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** Indicates if all other of the User's Sessions need to be reset. You should check this field if you aren't using Stytch's Session product. If you are using Stytch's Session product, we revoke the User's other sessions for you. */
  reset_sessions: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiMagicV1CreateRequest = {
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id: string;
  /** Set the expiration for the Magic Link `token` in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
};

export type ApiMagicV1CreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The Magic Link `token` that you'll include in your contact method of choice, e.g. email or SMS. */
  token: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiMagicV1MagicLinksEmailInviteRequest = {
  /** The email address of the User to send the invite Magic Link to. */
  email: string;
  /** Use a custom template for invite emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Invite”. */
  invite_template_id?: string;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** The name of the user. Each field in the name object is optional. */
  name?: ApiUserV1Name;
  /** The URL the end user clicks from the Email Magic Link. This should be a URL that your app receives and parses and subsequently sends an API request to authenticate the Magic Link and log in the User. If this value is not passed, the default invite redirect URL that you set in your Dashboard is used. If you have not set a default sign-up redirect URL, an error is returned. */
  invite_magic_link_url?: string;
  /** Set the expiration for the email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  invite_expiration_minutes?: number;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiMagicV1InviteRequestLocale;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
};

export type ApiMagicV1MagicLinksEmailInviteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiMagicV1MagicLinksEmailLoginOrCreateRequest = {
  /** The email address of the end user. */
  email: string;
  /** The URL the end user clicks from the login Email Magic Link. This should be a URL that your app receives and parses and subsequently send an API request to authenticate the Magic Link and log in the User. If this value is not passed, the default login redirect URL that you set in your Dashboard is used. If you have not set a default login redirect URL, an error is returned. */
  login_magic_link_url?: string;
  /** The URL the end user clicks from the sign-up Email Magic Link. This should be a URL that your app receives and parses and subsequently send an API request to authenticate the Magic Link and sign-up the User. If this value is not passed, the default sign-up redirect URL that you set in your Dashboard is used. If you have not set a default sign-up redirect URL, an error is returned. */
  signup_magic_link_url?: string;
  /** Set the expiration for the login email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  login_expiration_minutes?: number;
  /** Set the expiration for the sign-up email magic link, in minutes. By default, it expires in 1 week. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  signup_expiration_minutes?: number;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Login”. */
  login_template_id?: string;
  /** Use a custom template for sign-up emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Sign-up”. */
  signup_template_id?: string;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.         If true, users will be saved with status pending in Stytch's backend until authenticated.         If false, users will be created as active. An example usage of         a true flag would be to require users to verify their phone by entering the OTP code before creating         an account for them. */
  create_user_as_pending?: boolean;
  /** A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends on the same device. */
  code_challenge?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiMagicV1LoginOrCreateRequestLocale;
};

export type ApiMagicV1MagicLinksEmailLoginOrCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** In `login_or_create` endpoints, this field indicates whether or not a User was just created. */
  user_created: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiMagicV1MagicLinksEmailRevokeInviteRequest = {
  /** The email of the user. */
  email: string;
};

export type ApiMagicV1MagicLinksEmailRevokeInviteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiMagicV1MagicLinksEmailSendRequest = {
  /** The email address of the User to send the Magic Link to. */
  email: string;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Login”. */
  login_template_id?: string;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** The URL the end user clicks from the login Email Magic Link. This should be a URL that your app receives and parses and subsequently send an API request to authenticate the Magic Link and log in the User. If this value is not passed, the default login redirect URL that you set in your Dashboard is used. If you have not set a default login redirect URL, an error is returned. */
  login_magic_link_url?: string;
  /** The URL the end user clicks from the sign-up Email Magic Link. This should be a URL that your app receives and parses and subsequently send an API request to authenticate the Magic Link and sign-up the User. If this value is not passed, the default sign-up redirect URL that you set in your Dashboard is used. If you have not set a default sign-up redirect URL, an error is returned. */
  signup_magic_link_url?: string;
  /** Set the expiration for the login email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  login_expiration_minutes?: number;
  /** Set the expiration for the sign-up email magic link, in minutes. By default, it expires in 1 week. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  signup_expiration_minutes?: number;
  /** A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends on the same device. */
  code_challenge?: string;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` of the user to associate the email with. */
  session_token?: string;
  /** The `session_jwt` of the user to associate the email with. */
  session_jwt?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiMagicV1SendRequestLocale;
  /** Use a custom template for sign-up emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Sign-up”. */
  signup_template_id?: string;
};

export type ApiMagicV1MagicLinksEmailSendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiMagicV1InviteRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiMagicV1LoginOrCreateRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiMagicV1SendRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BMagicV1AuthenticateRequest = {
  /** The Email Magic Link token to authenticate. */
  magic_links_token: string;
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_verifier?: string;
  /** Reuse an existing session instead of creating a new one. If you provide a `session_token`, Stytch will update the session.       If the `session_token` and `magic_links_token` belong to different Members, the `session_token` will be ignored. This endpoint will error if       both `session_token` and `session_jwt` are provided. */
  session_token?: string;
  /** Reuse an existing session instead of creating a new one. If you provide a `session_jwt`, Stytch will update the session. If the `session_jwt`       and `magic_links_token` belong to different Members, the `session_jwt` will be ignored. This endpoint will error if both `session_token` and `session_jwt`       are provided. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BMagicV1AuthenticateRequestLocale;
  /** Adds this primary authentication factor to the intermediate session token. If the resulting set of factors satisfies the organization's primary authentication requirements and MFA requirements, the intermediate session token will be consumed and converted to a member session. If not, the same intermediate session token will be returned. */
  intermediate_session_token?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BMagicV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The email or device involved in the authentication. */
  method_id: string;
  /** This field is deprecated. */
  reset_sessions: boolean;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The returned Intermediate Session Token contains an Email Magic Link factor associated with the Member's email address. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

export type ApiB2BMagicV1AuthenticateRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BMagicV1B2BMagicLinksEmailInviteRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The email address of the Member. */
  email_address: string;
  /** The URL that the Member clicks from the invite Email Magic Link. This URL should be an endpoint in the backend server that verifies   the request by querying Stytch's authenticate endpoint and finishes the invite flow. If this value is not passed, the default `invite_redirect_url`   that you set in your Dashboard is used. If you have not set a default `invite_redirect_url`, an error is returned. */
  invite_redirect_url?: string;
  /** The `member_id` of the Member who sends the invite. */
  invited_by_member_id?: string;
  /** The name of the Member. */
  name?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** An arbitrary JSON object of application-specific data. These fields can be edited directly by the   frontend SDK, and should not be used to store critical information. See the [Metadata resource](https://stytch.com/docs/b2b/api/metadata)   for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** Use a custom template for invite emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic Links - Invite”. */
  invite_template_id?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BMagicV1InviteRequestLocale;
  /** Roles to explicitly assign to this Member. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment)    for more information about role assignment. */
  roles?: (string)[];
  /** The expiration time, in minutes, for an invite email. If not accepted within this time frame, the invite will need to be resent. Defaults to 10080 (1 week) with a minimum of 5 and a maximum of 10080. */
  invite_expiration_minutes?: number;
};

export type ApiB2BMagicV1B2BMagicLinksEmailInviteResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BMagicV1B2BMagicLinksEmailLoginOrSignupRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The email address of the Member. */
  email_address: string;
  /** The URL that the Member clicks from the login Email Magic Link. This URL should be an endpoint in the backend server that   verifies the request by querying Stytch's authenticate endpoint and finishes the login. If this value is not passed, the default login   redirect URL that you set in your Dashboard is used. If you have not set a default login redirect URL, an error is returned. */
  login_redirect_url?: string;
  /** The URL the Member clicks from the signup Email Magic Link. This URL should be an endpoint in the backend server that verifies   the request by querying Stytch's authenticate endpoint and finishes the login. If this value is not passed, the default sign-up redirect URL   that you set in your Dashboard is used. If you have not set a default sign-up redirect URL, an error is returned. */
  signup_redirect_url?: string;
  /** A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_challenge?: string;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic Links - Login”. */
  login_template_id?: string;
  /** Use a custom template for signup emails. By default, it will use your default email template. The template must be from Stytch's built-in customizations or a custom HTML email for “Magic Links - Signup”. */
  signup_template_id?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BMagicV1LoginOrSignupRequestLocale;
  /** The expiration time, in minutes, for a login Email Magic Link. If not authenticated within this time frame, the email will need to be resent. Defaults to 60 (1 hour) with a minimum of 5 and a maximum of 10080 (1 week). */
  login_expiration_minutes?: number;
  /** The expiration time, in minutes, for a signup Email Magic Link. If not authenticated within this time frame, the email will need to be resent. Defaults to 60 (1 hour) with a minimum of 5 and a maximum of 10080 (1 week). */
  signup_expiration_minutes?: number;
};

export type ApiB2BMagicV1B2BMagicLinksEmailLoginOrSignupResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A flag indicating `true` if a new Member object was created and `false` if the Member object already existed. */
  member_created: boolean;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BMagicV1InviteRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiB2BMagicV1LoginOrSignupRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BMagicV1B2BMagicLinksEmailDiscoverySendRequest = {
  /** The email address of the Member. */
  email_address: string;
  /** The URL that the end user clicks from the discovery Magic Link. This URL should be an endpoint in the backend server that   verifies the request by querying Stytch's discovery authenticate endpoint and continues the flow. If this value is not passed, the default   discovery redirect URL that you set in your Dashboard is used. If you have not set a default discovery redirect URL, an error is returned. */
  discovery_redirect_url?: string;
  /** A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_challenge?: string;
  /** Use a custom template for discovery emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic Links - Login”. */
  login_template_id?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BMagicV1SendRequestLocale;
  /** The expiration time, in minutes, for an discovery magic link email. If not accepted within this time frame, the email will need to be resent. Defaults to 60 (1 hour) with a minimum of 5 and a maximum of 10080 (1 week). */
  discovery_expiration_minutes?: number;
};

export type ApiB2BMagicV1B2BMagicLinksEmailDiscoverySendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BMagicV1SendRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BMagicV1B2BMagicLinksDiscoveryAuthenticateRequest = {
  /** The Discovery Email Magic Link token to authenticate. */
  discovery_magic_links_token: string;
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_verifier?: string;
};

export type ApiB2BMagicV1B2BMagicLinksDiscoveryAuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The email address. */
  email_address: string;
  /** An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`, or `session_jwt`. See the [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for complete details.    Note that Organizations will only appear here under any of the following conditions:   1. The end user is already a Member of the Organization.   2. The end user is invited to the Organization.   3. The end user can join the Organization because:        a) The Organization allows JIT provisioning.        b) The Organizations' allowed domains list contains the Member's email domain.        c) The Organization has at least one other Member with a verified email address with the same domain as the end user (to prevent phishing attacks). */
  discovered_organizations: (ApiDiscoveryV1DiscoveredOrganization)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BOauthV1ProviderValues = {
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token?: string;
  /** The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's API. */
  refresh_token?: string;
  expires_at?: string;
  /** The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/) specification, which is based on OAuth. */
  id_token?: string;
};

/** Request type */
export type ApiB2BOauthV1AuthenticateRequest = {
  /** The token to authenticate. */
  oauth_token: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_verifier?: string;
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BOauthV1AuthenticateRequestLocale;
  /** Adds this primary authentication factor to the intermediate session token. If the resulting set of factors satisfies the organization's primary authentication requirements and MFA requirements, the intermediate session token will be consumed and converted to a member session. If not, the same intermediate session token will be returned. */
  intermediate_session_token?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BOauthV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** This field is deprecated. */
  reset_sessions: boolean;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The returned Intermediate Session Token contains an OAuth factor associated with the Member's email address. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** The `provider_values` object lists relevant identifiers, values, and scopes for a given OAuth provider. For example this object will include a provider's `access_token` that you can use to access the provider's API for a given user.    Note that these values will vary based on the OAuth provider in question, e.g. `id_token` is only returned by Microsoft. Google One Tap does not return access tokens or refresh tokens. */
  provider_values?: ApiB2BOauthV1ProviderValues;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

export type ApiB2BOauthV1AuthenticateRequestLocale = "en" | "es" | "pt-br" | "fr" | "it" | "de-DE" | "zh-Hans" | "ca-ES";

/** Request type */
export type ApiB2BOauthV1B2BOauthDiscoveryAuthenticateRequest = {
  /** The Discovery OAuth token to authenticate. */
  discovery_oauth_token: string;
  session_token?: string;
  session_duration_minutes?: number;
  session_jwt?: string;
  session_custom_claims?: { [key: string]: unknown };
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_verifier?: string;
};

export type ApiB2BOauthV1B2BOauthDiscoveryAuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The email address. */
  email_address: string;
  /** An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`, or `session_jwt`. See the [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for complete details.    Note that Organizations will only appear here under any of the following conditions:   1. The end user is already a Member of the Organization.   2. The end user is invited to the Organization.   3. The end user can join the Organization because:        a) The Organization allows JIT provisioning.        b) The Organizations' allowed domains list contains the Member's email domain.        c) The Organization has at least one other Member with a verified email address with the same domain as the end user (to prevent phishing attacks). */
  discovered_organizations: (ApiDiscoveryV1DiscoveredOrganization)[];
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub etc. */
  provider_type: string;
  /** The tenant ID returned by the OAuth provider. This is typically used to identify an organization or group within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the Workspace ID, and in GitHub this is an organization ID. This field will only be populated if exactly one tenant ID is returned from a successful OAuth authentication and developers should prefer `provider_tenant_ids` over this since it accounts for the possibility of an OAuth provider yielding multiple tenant IDs. */
  provider_tenant_id: string;
  /** All tenant IDs returned by the OAuth provider. These is typically used to identify organizations or groups within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the Workspace ID, and in GitHub this is an organization ID. Some OAuth providers do not return tenant IDs, some providers are guaranteed to return one, and some may return multiple. This field will always be populated if at least one tenant ID was returned from the OAuth provider and developers should prefer this field over `provider_tenant_id`. */
  provider_tenant_ids: (string)[];
  /** The full name of the authenticated end user, if available. */
  full_name: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BOtpV1B2BOtpSmsAuthenticateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The code to authenticate. */
  code: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** Optionally sets the Member’s MFA enrollment status upon a successful authentication. If the Organization’s MFA policy is `REQUIRED_FOR_ALL`, this field will be ignored. If this field is not passed in, the Member’s `mfa_enrolled` boolean will not be affected. The options are:     `enroll` – sets the Member's `mfa_enrolled` boolean to `true`. The Member will be required to complete an MFA step upon subsequent logins to the Organization.     `unenroll` –  sets the Member's `mfa_enrolled` boolean to `false`. The Member will no longer be required to complete MFA steps when logging in to the Organization.    */
  set_mfa_enrollment?: string;
  set_default_mfa?: boolean;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BOtpV1B2BOtpSmsAuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BOtpV1B2BOtpSmsSendRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id: string;
  /** The phone number to send the OTP to. If the Member already has a phone number, this argument is not needed. */
  mfa_phone_number?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BOtpV1SendRequestLocale;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
};

export type ApiB2BOtpV1B2BOtpSmsSendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BOtpV1SendRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BOtpV1B2BOtpEmailAuthenticateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The email address of the Member. */
  email_address: string;
  /** The code to authenticate. */
  code: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BOtpV1AuthenticateRequestLocale;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BOtpV1B2BOtpEmailAuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The email or device involved in the authentication. */
  method_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BOtpV1B2BOtpEmailLoginOrSignupRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The email address of the Member. */
  email_address: string;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “OTP - Login”. */
  login_template_id?: string;
  /** Use a custom template for signup emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “OTP - Signup”. */
  signup_template_id?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BOtpV1LoginOrSignupRequestLocale;
  /** The expiration time, in minutes, for a login OTP email to a Member. If not authenticated within this time frame, the OTP will need to be resent. Defaults to 10 with a minimum of 2 and a maximum of 15. */
  login_expiration_minutes?: number;
  /** The expiration time, in minutes, for a signup OTP email to a Member. If not authenticated within this time frame, the OTP will need to be resent. Defaults to 10 with a minimum of 2 and a maximum of 15. */
  signup_expiration_minutes?: number;
};

export type ApiB2BOtpV1B2BOtpEmailLoginOrSignupResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A flag indicating `true` if a new Member object was created and `false` if the Member object already existed. */
  member_created: boolean;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BOtpV1AuthenticateRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiB2BOtpV1LoginOrSignupRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BOtpV1B2BOtpEmailDiscoveryAuthenticateRequest = {
  /** The email address of the Member. */
  email_address: string;
  /** The code to authenticate. */
  code: string;
};

export type ApiB2BOtpV1B2BOtpEmailDiscoveryAuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** The email address. */
  email_address: string;
  /** An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`, or `session_jwt`. See the [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for complete details.    Note that Organizations will only appear here under any of the following conditions:   1. The end user is already a Member of the Organization.   2. The end user is invited to the Organization.   3. The end user can join the Organization because:        a) The Organization allows JIT provisioning.        b) The Organizations' allowed domains list contains the Member's email domain.        c) The Organization has at least one other Member with a verified email address with the same domain as the end user (to prevent phishing attacks). */
  discovered_organizations: (ApiDiscoveryV1DiscoveredOrganization)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BOtpV1B2BOtpEmailDiscoverySendRequest = {
  /** The email address to start the discovery flow for. */
  email_address: string;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “OTP - Login”. */
  login_template_id?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BOtpV1SendRequestLocale;
  /** The expiration time, in minutes, for a discovery OTP email. If not accepted within this time frame, the OTP will need to be resent. Defaults to 10 with a minimum of 2 and a maximum of 15. */
  discovery_expiration_minutes?: number;
};

export type ApiB2BOtpV1B2BOtpEmailDiscoverySendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiPasswordV1Argon2Config = {
  /** The salt value. */
  salt: string;
  /** The iteration amount. */
  iteration_amount: number;
  /** The memory in kibibytes. */
  memory: number;
  /** The thread value, also known as the parallelism factor. */
  threads: number;
  /** The key length, also known as the hash length. */
  key_length: number;
};

export type ApiPasswordV1Feedback = {
  /** For `zxcvbn` validation, contains an end user consumable warning if the password is valid but not strong enough. */
  warning: string;
  /** For `zxcvbn` validation, contains end user consumable suggestions on how to improve the strength of the password. */
  suggestions: (string)[];
  /** Contains which LUDS properties are fulfilled by the password and which are missing to convert an invalid password into a valid one. You'll use these fields to provide feedback to the user on how to improve the password. */
  luds_requirements?: ApiPasswordV1LudsRequirements;
};

export type ApiPasswordV1LudsRequirements = {
  /** For LUDS validation, whether the password contains at least one lowercase letter. */
  has_lower_case: boolean;
  /** For LUDS validation, whether the password contains at least one uppercase letter. */
  has_upper_case: boolean;
  /** For LUDS validation, whether the password contains at least one digit. */
  has_digit: boolean;
  /** For LUDS validation, whether the password contains at least one symbol. Any UTF8 character outside of a-z or A-Z may count as a valid symbol. */
  has_symbol: boolean;
  /** For LUDS validation, the number of complexity requirements that are missing from the password. Check the complexity fields to see which requirements are missing. */
  missing_complexity: number;
  /** For LUDS validation, this is the required length of the password that you've set minus the length of the password being checked. The user will need to add this many characters to the password to make it valid. */
  missing_characters: number;
};

export type ApiPasswordV1Md5Config = {
  /** The salt that should be prepended to the migrated password. */
  prepend_salt: string;
  /** The salt that should be appended to the migrated password. */
  append_salt: string;
};

export type ApiPasswordV1Pbkdf2Config = {
  /** The salt value, which should be in a base64 encoded string form. */
  salt: string;
  /** The iteration amount. */
  iteration_amount: number;
  /** The key length, also known as the hash length. */
  key_length: number;
  /** The algorithm that was used to generate the HMAC hash. Accepted values are "sha512" and sha256". Defaults to sha256. */
  algorithm: string;
};

export type ApiPasswordV1Sha1Config = {
  /** The salt that should be prepended to the migrated password. */
  prepend_salt: string;
  /** The salt that should be appended to the migrated password. */
  append_salt: string;
};

export type ApiPasswordV1Sha512Config = {
  /** The salt that should be prepended to the migrated password. */
  prepend_salt: string;
  /** The salt that should be appended to the migrated password. */
  append_salt: string;
};

export type ApiPasswordV1ScryptConfig = {
  /** The salt value, which should be in a base64 encoded string form. */
  salt: string;
  /** The N value, also known as the iterations count. It must be a power of two greater than 1 and less than 262,145.       If your application's N parameter is larger than 262,144, please reach out to [support@stytch.com](mailto:support@stytch.com) */
  n_parameter: number;
  /** The r parameter, also known as the block size. */
  r_parameter: number;
  /** The p parameter, also known as the parallelism factor. */
  p_parameter: number;
  /** The key length, also known as the hash length. */
  key_length: number;
};

/** Request type */
export type ApiPasswordV1AuthenticateRequest = {
  /** The email address of the end user. */
  email: string;
  /** The password for the user. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiPasswordV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiPasswordV1CreateRequest = {
  /** The email address of the end user. */
  email: string;
  /** The password for the user. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** The name of the user. Each field in the name object is optional. */
  name?: ApiUserV1Name;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiPasswordV1CreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiPasswordV1MigrateRequest = {
  /** The email address of the end user. */
  email: string;
  /** The password hash. For a Scrypt or PBKDF2 hash, the hash needs to be a base64 encoded string. */
  hash: string;
  /** The password hash used. Currently `bcrypt`, `scrypt`, `argon_2i`, `argon_2id`, `md_5`, `sha_1`, `sha_512`, and `pbkdf_2` are supported. */
  hash_type: ApiPasswordV1MigrateRequestHashType;
  /** Optional parameters for MD-5 hash types. */
  md_5_config?: ApiPasswordV1Md5Config;
  /** Required parameters if the argon2 hex form, as opposed to the encoded form, is supplied. */
  argon_2_config?: ApiPasswordV1Argon2Config;
  /** Optional parameters for SHA-1 hash types. */
  sha_1_config?: ApiPasswordV1Sha1Config;
  /** Optional parameters for SHA-512 hash types. */
  sha_512_config?: ApiPasswordV1Sha512Config;
  /** Required parameters if the scrypt is not provided in a [PHC encoded form](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md#phc-string-format). */
  scrypt_config?: ApiPasswordV1ScryptConfig;
  /** Required additional parameters for PBKDF2 hash keys. */
  pbkdf_2_config?: ApiPasswordV1Pbkdf2Config;
  /** The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  trusted_metadata?: { [key: string]: unknown };
  /** The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted metadata can be edited by end users directly via the SDK, and **cannot be used to store critical information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** Whether to set the user's email as verified. This is a dangerous field, incorrect use may lead to users getting erroneously                 deduplicated into one User object. This flag should only be set if you can attest that the user owns the email address in question.                  */
  set_email_verified?: boolean;
  /** The name of the user. Each field in the name object is optional. */
  name?: ApiUserV1Name;
  /** The phone number of the user. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). */
  phone_number?: string;
  /** Whether to set the user's phone number as verified. This is a dangerous field, this flag should only be set if you can attest that    the user owns the phone number in question. */
  set_phone_number_verified?: boolean;
  /** If a new user is created, this will set an identifier that can be used in API calls wherever a user_id is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. */
  external_id?: string;
  /** Roles to explicitly assign to this User.    See the [RBAC guide](https://stytch.com/docs/guides/rbac/role-assignment) for more information about role assignment. */
  roles?: (string)[];
};

export type ApiPasswordV1MigrateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** In `login_or_create` endpoints, this field indicates whether or not a User was just created. */
  user_created: boolean;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiPasswordV1StrengthCheckRequest = {
  /** The password for the user. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** The email address of the end user. */
  email?: string;
};

export type ApiPasswordV1StrengthCheckResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Returns `true` if the password passes our password validation. We offer two validation options, [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy) is the default option which offers a high level of sophistication. We also offer [LUDS](https://stytch.com/docs/guides/passwords/strength-policy) which is less sophisticated but easier to understand. If an email address is included in the call we also require that the password hasn't been compromised using built-in breach detection powered by [HaveIBeenPwned](https://haveibeenpwned.com/). */
  valid_password: boolean;
  /** The score of the password determined by [zxcvbn](https://github.com/dropbox/zxcvbn). Values will be between 1 and 4, a 3 or greater is required to pass validation. */
  score: number;
  /** Returns `true` if the password has been breached. Powered by [HaveIBeenPwned](https://haveibeenpwned.com/). */
  breached_password: boolean;
  /** The strength policy type enforced, either `zxcvbn` or `luds`. */
  strength_policy: string;
  /** Will return `true` if breach detection will be evaluated. By default this option is enabled. This option can be disabled in the [dashboard](https://stytch.com/dashboard/password-strength-config#breach-detection). If this value is `false` then `breached_password` will always be `false` as well. */
  breach_detection_on_create: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** Feedback for how to improve the password's strength [HaveIBeenPwned](https://haveibeenpwned.com/). */
  feedback?: ApiPasswordV1Feedback;
};

export type ApiPasswordV1MigrateRequestHashType = "bcrypt" | "md_5" | "argon_2i" | "argon_2id" | "sha_1" | "sha_512" | "scrypt" | "phpass" | "pbkdf_2";

/** Request type */
export type ApiPasswordV1PasswordsEmailResetRequest = {
  /** The Passwords `token` from the `?token=` query parameter in the URL.        In the redirect URL, the `stytch_token_type` will be `login` or `reset_password`.        See examples and read more about redirect URLs [here](https://stytch.com/docs/workspace-management/redirect-urls). */
  token: string;
  /** The password for the user. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  code_verifier?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Specify optional security settings. */
  options?: ApiMagicV1Options;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiPasswordV1PasswordsEmailResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiPasswordV1PasswordsEmailResetStartRequest = {
  /** The email of the User that requested the password reset. */
  email: string;
  /** The URL that the User is redirected to from the reset password magic link. This URL should display your application's reset password page.   Before rendering the reset page, extract the `token` from the query parameters. On the reset page, collect the new password and complete the flow by calling the corresponding Password Reset by Email endpoint.   If this parameter is not specified, the default Reset Password redirect URL configured in the Dashboard will be used. If you have not set a default Reset Password redirect URL, an error is returned. */
  reset_password_redirect_url?: string;
  /** Set the expiration for the password reset, in minutes. By default, it expires in 30 minutes.   The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
  reset_password_expiration_minutes?: number;
  /** A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends on the same device. */
  code_challenge?: string;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** The URL that Users are redirected to upon clicking the "Log in without password" button in password reset emails.        After Users are redirected to the login redirect URL, your application should retrieve the `token` value from the URL parameters and call the [Magic Link Authenticate endpoint](https://stytch.com/docs/api/authenticate-magic-link) to log the User in without requiring a password reset. If this value is not provided, your project's default login redirect URL will be used. If you have not set a default login redirect URL, an error will be returned. */
  login_redirect_url?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiPasswordV1ResetStartRequestLocale;
  /** Use a custom template for password reset emails. By default, it will use your default email template.   Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Passwords - Password reset”. */
  reset_password_template_id?: string;
};

export type ApiPasswordV1PasswordsEmailResetStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiPasswordV1ResetStartRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiPasswordV1PasswordsExistingPasswordResetRequest = {
  /** The email address of the end user. */
  email: string;
  /** The user's existing password. */
  existing_password: string;
  /** The new password for the user. */
  new_password: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiPasswordV1PasswordsExistingPasswordResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiPasswordV1PasswordsSessionResetRequest = {
  /** The password for the user. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiPasswordV1PasswordsSessionResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

export type ApiB2BPasswordV1LudsFeedback = {
  /** For LUDS validation, whether the password contains at least one lowercase letter. */
  has_lower_case: boolean;
  /** For LUDS validation, whether the password contains at least one uppercase letter. */
  has_upper_case: boolean;
  /** For LUDS validation, whether the password contains at least one digit. */
  has_digit: boolean;
  /** For LUDS validation, whether the password contains at least one symbol. Any UTF8 character outside of a-z or A-Z may count as a valid symbol. */
  has_symbol: boolean;
  /** For LUDS validation, the number of complexity requirements that are missing from the password.       Check the complexity fields to see which requirements are missing. */
  missing_complexity: number;
  /** For LUDS validation, this is the required length of the password that you've set minus the length of the password being checked.       The user will need to add this many characters to the password to make it valid. */
  missing_characters: number;
};

export type ApiB2BPasswordV1ZxcvbnFeedback = {
  /** For zxcvbn validation, contains an end user consumable warning if the password is valid but not strong enough. */
  warning: string;
  /** For zxcvbn validation, contains end user consumable suggestions on how to improve the strength of the password. */
  suggestions: (string)[];
};

/** Request type */
export type ApiB2BPasswordV1AuthenticateRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The email address of the Member. */
  email_address: string;
  /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BPasswordV1AuthenticateRequestLocale;
  /** Adds this primary authentication factor to the intermediate session token. If the resulting set of factors satisfies the organization's primary authentication requirements and MFA requirements, the intermediate session token will be consumed and converted to a member session. If not, the same intermediate session token will be returned. */
  intermediate_session_token?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BPasswordV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The returned Intermediate Session Token contains a password factor associated with the Member. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. Password factors are not transferable between Organizations, so the intermediate session token is not valid for use with discovery endpoints. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BPasswordV1MigrateRequest = {
  /** The email address of the Member. */
  email_address: string;
  /** The password hash. For a Scrypt or PBKDF2 hash, the hash needs to be a base64 encoded string. */
  hash: string;
  /** The password hash used. Currently `bcrypt`, `scrypt`, `argon_2i`, `argon_2id`, `md_5`, `sha_1`, `sha_512`, and `pbkdf_2` are supported. */
  hash_type: ApiB2BPasswordV1MigrateRequestHashType;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Optional parameters for MD-5 hash types. */
  md_5_config?: ApiPasswordV1Md5Config;
  /** Required parameters if the argon2 hex form, as opposed to the encoded form, is supplied. */
  argon_2_config?: ApiPasswordV1Argon2Config;
  /** Optional parameters for SHA-1 hash types. */
  sha_1_config?: ApiPasswordV1Sha1Config;
  /** Optional parameters for SHA-512 hash types. */
  sha_512_config?: ApiPasswordV1Sha512Config;
  /** Required parameters if the scrypt is not provided in a **PHC encoded form**. */
  scrypt_config?: ApiPasswordV1ScryptConfig;
  /** Required additional parameters for PBKDF2 hash keys. Note that we use the SHA-256 by default, please contact [support@stytch.com](mailto:support@stytch.com) if you use another hashing function. */
  pbkdf_2_config?: ApiPasswordV1Pbkdf2Config;
  /** The name of the Member. Each field in the name object is optional. */
  name?: string;
  /** An arbitrary JSON object for storing application-specific data or identity-provider-specific data. */
  trusted_metadata?: { [key: string]: unknown };
  /** An arbitrary JSON object of application-specific data. These fields can be edited directly by the   frontend SDK, and should not be used to store critical information. See the [Metadata resource](https://stytch.com/docs/b2b/api/metadata)   for complete field behavior details. */
  untrusted_metadata?: { [key: string]: unknown };
  /** Roles to explicitly assign to this Member.  Will completely replace any existing explicitly assigned roles. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment.     If a Role is removed from a Member, and the Member is also implicitly assigned this Role from an SSO connection    or an SSO group, we will by default revoke any existing sessions for the Member that contain any SSO    authentication factors with the affected connection ID. You can preserve these sessions by passing in the    `preserve_existing_sessions` parameter with a value of `true`. */
  roles?: (string)[];
  /** Whether to preserve existing sessions when explicit Roles that are revoked are also implicitly assigned   by SSO connection or SSO group. Defaults to `false` - that is, existing Member Sessions that contain SSO   authentication factors with the affected SSO connection IDs will be revoked. */
  preserve_existing_sessions?: boolean;
  /** The Member's phone number. A Member may only have one phone number. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). */
  mfa_phone_number?: string;
  /** Whether to set the user's phone number as verified. This is a dangerous field. This flag should only be set if you can attest that    the user owns the phone number in question. */
  set_phone_number_verified?: boolean;
  /** If a new member is created, this will set an identifier that can be used in most API calls where a `member_id` is expected. This is a string consisting of alphanumeric, `.`, `_`, `-`, or `|` characters with a maximum length of 128 characters. External IDs must be unique within an organization, but may be reused across different organizations in the same project. Note that if a member already exists, this field will be ignored. */
  external_id?: string;
};

export type ApiB2BPasswordV1MigrateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** A flag indicating `true` if a new Member object was created and `false` if the Member object already existed. */
  member_created: boolean;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BPasswordV1StrengthCheckRequest = {
  /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** The email address of the Member. */
  email_address?: string;
};

export type ApiB2BPasswordV1StrengthCheckResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Returns `true` if the password passes our password validation. We offer two validation options,   [zxcvbn](https://stytch.com/docs/guides/passwords/strength-policy) is the default option which offers a high level of sophistication.   We also offer [LUDS](https://stytch.com/docs/b2b/guides/passwords/strength-policy) which is less sophisticated    but easier to understand. If an email address is included in the call we also   require that the password hasn't been compromised using built-in breach detection powered by [HaveIBeenPwned](https://haveibeenpwned.com/) */
  valid_password: boolean;
  /** The score of the password determined by [zxcvbn](https://github.com/dropbox/zxcvbn). Values will be between 1 and 4, a 3 or greater is required to pass validation. */
  score: number;
  /** Returns `true` if the password has been breached. Powered by [HaveIBeenPwned](https://haveibeenpwned.com/). */
  breached_password: boolean;
  /** The strength policy type enforced, either `zxcvbn` or `luds`. */
  strength_policy: string;
  /** Will return `true` if breach detection will be evaluated. By default this option is enabled.   This option can be disabled in the [dashboard](https://stytch.com/dashboard/password-strength-config#breach-detection).   If this value is false then `breached_password` will always be `false` as well. */
  breach_detection_on_create: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** Feedback for how to improve the password's strength using [luds](https://stytch.com/docs/guides/passwords/strength-policy). */
  luds_feedback?: ApiB2BPasswordV1LudsFeedback;
  /** Feedback for how to improve the password's strength using [zxcvbn](https://stytch.com/docs/b2b/guides/passwords/strength-policy). */
  zxcvbn_feedback?: ApiB2BPasswordV1ZxcvbnFeedback;
};

export type ApiB2BPasswordV1AuthenticateRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiB2BPasswordV1MigrateRequestHashType = "bcrypt" | "md_5" | "argon_2i" | "argon_2id" | "sha_1" | "sha_512" | "scrypt" | "phpass" | "pbkdf_2";

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsEmailRequireResetRequest = {
  /** The email address of the Member to start the email reset process for. */
  email_address: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id?: string;
  /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
  member_id?: string;
};

export type ApiB2BPasswordV1B2BPasswordsEmailRequireResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** Globally unique UUID that identifies a specific Member. */
  member_id?: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member?: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization?: ApiOrganizationV1Organization;
};

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsEmailResetRequest = {
  /** The password reset token to authenticate. */
  password_reset_token: string;
  /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** Reuse an existing session instead of creating a new one. If you provide a `session_token`, Stytch will update the session.       If the `session_token` and `magic_links_token` belong to different Members, the `session_token` will be ignored. This endpoint will error if       both `session_token` and `session_jwt` are provided. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Reuse an existing session instead of creating a new one. If you provide a `session_jwt`, Stytch will update the session. If the `session_jwt`       and `magic_links_token` belong to different Members, the `session_jwt` will be ignored. This endpoint will error if both `session_token` and `session_jwt`       are provided. */
  session_jwt?: string;
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  code_verifier?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BPasswordV1ResetRequestLocale;
  /** Adds this primary authentication factor to the intermediate session token. If the resulting set of factors satisfies the organization's primary authentication requirements and MFA requirements, the intermediate session token will be consumed and converted to a member session. If not, the same intermediate session token will be returned. */
  intermediate_session_token?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BPasswordV1B2BPasswordsEmailResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Globally unique UUID that identifies a member's email */
  member_email_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The returned Intermediate Session Token contains a password factor associated with the Member. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. Password factors are not transferable between Organizations, so the intermediate session token is not valid for use with discovery endpoints. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsEmailResetStartRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The email address of the Member to start the email reset process for. */
  email_address: string;
  /** The URL that the Member is redirected to from the reset password magic link. This URL should display your application's reset password page.   Before rendering the reset page, extract the `token` from the query parameters. On the reset page, collect the new password and complete the flow by calling the corresponding Password Reset by Email endpoint.   If this parameter is not specified, the default Reset Password redirect URL configured in the Dashboard will be used. If you have not set a default Reset Password redirect URL, an error is returned. */
  reset_password_redirect_url?: string;
  /** Sets a time limit after which the email link to reset the member's password will no longer be valid. The minimum allowed expiration is 5 minutes and the maximum is 10080 minutes (7 days). By default, the expiration is 30 minutes. */
  reset_password_expiration_minutes?: number;
  /** A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends on the same device. */
  code_challenge?: string;
  /** The URL that Members are redirected to upon clicking the "Log in without password" button in password reset emails.        After Members are redirected to the login redirect URL, your application should retrieve the `token` value from the URL parameters and call the [Magic Link Authenticate endpoint](https://stytch.com/docs/api/authenticate-magic-link) to log the Member in without requiring a password reset. If this value is not provided, your project's default login redirect URL will be used. If you have not set a default login redirect URL, an error will be returned. */
  login_redirect_url?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BPasswordV1ResetStartRequestLocale;
  /** Use a custom template for reset password emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Passwords - Reset Password”. */
  reset_password_template_id?: string;
  /** Use a custom template for verification emails sent during password reset flows. When cross-organization passwords are enabled for your Project, this template will be used the first time a user sets a password via a   password reset flow. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Passwords - Email Verification”. */
  verify_email_template_id?: string;
};

export type ApiB2BPasswordV1B2BPasswordsEmailResetStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Globally unique UUID that identifies a member's email */
  member_email_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiB2BPasswordV1ResetRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiB2BPasswordV1ResetStartRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsSessionResetRequest = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BPasswordV1ResetRequestLocale;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BPasswordV1B2BPasswordsSessionResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsExistingPasswordResetRequest = {
  /** The email address of the Member. */
  email_address: string;
  /** The Member's current password that they supplied. */
  existing_password: string;
  /** The Member's elected new password. */
  new_password: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** A secret token for a given Stytch Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiB2BPasswordV1ResetRequestLocale;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiB2BPasswordV1B2BPasswordsExistingPasswordResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The returned Intermediate Session Token contains a password factor associated with the Member. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. Password factors are not transferable between Organizations, so the intermediate session token is not valid for use with discovery endpoints. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  /** Information about the primary authentication requirements of the Organization. */
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsDiscoveryAuthenticateRequest = {
  /** The email address of the Member. */
  email_address: string;
  /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
};

export type ApiB2BPasswordV1B2BPasswordsDiscoveryAuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The email address. */
  email_address: string;
  /** The returned Intermediate Session Token contains a password factor associated with the Member. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. Password factors are not transferable between Organizations, so the intermediate session token is not valid for use with discovery endpoints. */
  intermediate_session_token: string;
  /** An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`, or `session_jwt`. See the [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for complete details.    Note that Organizations will only appear here under any of the following conditions:   1. The end user is already a Member of the Organization.   2. The end user is invited to the Organization.   3. The end user can join the Organization because:        a) The Organization allows JIT provisioning.        b) The Organizations' allowed domains list contains the Member's email domain.        c) The Organization has at least one other Member with a verified email address with the same domain as the end user (to prevent phishing attacks). */
  discovered_organizations: (ApiDiscoveryV1DiscoveredOrganization)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetRequest = {
  /** The password reset token to authenticate. */
  password_reset_token: string;
  /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
  password: string;
  pkce_code_verifier?: string;
};

export type ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The returned Intermediate Session Token contains a password factor associated with the Member. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. Password factors are not transferable between Organizations, so the intermediate session token is not valid for use with discovery endpoints. */
  intermediate_session_token: string;
  /** The email address. */
  email_address: string;
  /** An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`, or `session_jwt`. See the [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for complete details.    Note that Organizations will only appear here under any of the following conditions:   1. The end user is already a Member of the Organization.   2. The end user is invited to the Organization.   3. The end user can join the Organization because:        a) The Organization allows JIT provisioning.        b) The Organizations' allowed domains list contains the Member's email domain.        c) The Organization has at least one other Member with a verified email address with the same domain as the end user (to prevent phishing attacks). */
  discovered_organizations: (ApiDiscoveryV1DiscoveredOrganization)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetStartRequest = {
  /** The email address of the Member to start the email reset process for. */
  email_address: string;
  /** The URL that the Member is redirected to from the reset password magic link. This URL should display your application's reset password page.   Before rendering the reset page, extract the `token` from the query parameters. On the reset page, collect the new password and complete the flow by calling the corresponding Password Reset by Email endpoint.   If this parameter is not specified, the default Reset Password redirect URL configured in the Dashboard will be used. If you have not set a default Reset Password redirect URL, an error is returned. */
  reset_password_redirect_url?: string;
  /** The URL that the end user clicks from the discovery Magic Link. This URL should be an endpoint in the backend server that   verifies the request by querying Stytch's discovery authenticate endpoint and continues the flow. If this value is not passed, the default   discovery redirect URL that you set in your Dashboard is used. If you have not set a default discovery redirect URL, an error is returned. */
  discovery_redirect_url?: string;
  /** Use a custom template for reset password emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Passwords - Reset Password”. */
  reset_password_template_id?: string;
  /** Sets a time limit after which the email link to reset the member's password will no longer be valid. The minimum allowed expiration is 5 minutes and the maximum is 10080 minutes (7 days). By default, the expiration is 30 minutes. */
  reset_password_expiration_minutes?: number;
  pkce_code_challenge?: string;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: string;
  /** Use a custom template for verification emails sent during password reset flows. When cross-organization passwords are enabled for your Project, this template will be used the first time a user sets a password via a   password reset flow. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Passwords - Email Verification”. */
  verify_email_template_id?: string;
};

export type ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOauthV1ProviderValues = {
  /** The `access_token` that you may use to access the User's data in the provider's API. */
  access_token: string;
  /** The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's API. */
  refresh_token: string;
  /** The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/) specification, which is based on OAuth. */
  id_token: string;
  /** The OAuth scopes included for a given provider. See each provider's section above to see which scopes are included by default and how to add custom scopes. */
  scopes: (string)[];
  /** The timestamp when the Session expires. Values conform to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`. */
  expires_at?: string;
};

/** Request type */
export type ApiOauthV1AttachRequest = {
  /** The OAuth provider's name. */
  provider: string;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
};

export type ApiOauthV1AttachResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** A single-use token for connecting the Stytch User selection from an OAuth Attach request to the corresponding OAuth Start request. */
  oauth_attach_token: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOauthV1AuthenticateRequest = {
  /** The OAuth `token` from the `?token=` query parameter in the URL.        The redirect URL will look like `https://example.com/authenticate?stytch_token_type=oauth&token=rM_kw42CWBhsHLF62V75jELMbvJ87njMe3tFVj7Qupu7`        In the redirect URL, the `stytch_token_type` will be `oauth`. See [here](https://stytch.com/docs/workspace-management/redirect-urls) for more detail. */
  token: string;
  /** Reuse an existing session instead of creating a new one. If you provide us with a `session_token`, then we'll update the session represented by this session token with this OAuth factor. If this `session_token` belongs to a different user than the OAuth token, the session_jwt will be ignored. This endpoint will error if both `session_token` and `session_jwt` are provided. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** Reuse an existing session instead of creating a new one. If you provide us with a `session_jwt`, then we'll update the session represented by this JWT with this OAuth factor. If this `session_jwt` belongs to a different user than the OAuth token, the session_jwt will be ignored. This endpoint will error if both `session_token` and `session_jwt` are provided. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  code_verifier?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiOauthV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique identifier for the User within a given OAuth provider. Also commonly called the "sub" or "Subject field" in OAuth protocols. */
  provider_subject: string;
  /** Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Facebook, GitHub etc. */
  provider_type: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `provider_values` object lists relevant identifiers, values, and scopes for a given OAuth provider. For example this object will include a provider's `access_token` that you can use to access the provider's API for a given user.    Note that these values will vary based on the OAuth provider in question, e.g. `id_token` is only returned by OIDC compliant identity providers. */
  provider_values: ApiOauthV1ProviderValues;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** Indicates if all other of the User's Sessions need to be reset. You should check this field if you aren't using Stytch's Session product. If you are using Stytch's Session product, we revoke the User's other sessions for you. */
  reset_sessions: boolean;
  /** The unique ID for an OAuth registration. */
  oauth_user_registration_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** A `Session` object. For backwards compatibility reasons, the session from an OAuth authenticate call is labeled as `user_session`, but is otherwise just a standard stytch `Session` object.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  user_session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiOtpV1AuthenticateRequest = {
  /** The `email_id` or `phone_id` involved in the given authentication. */
  method_id: string;
  /** The code to authenticate. */
  code: string;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Specify optional security settings. */
  options?: ApiMagicV1Options;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiOtpV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The `email_id` or `phone_id` involved in the given authentication. */
  method_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** Indicates if all other of the User's Sessions need to be reset. You should check this field if you aren't using Stytch's Session product. If you are using Stytch's Session product, we revoke the User's other sessions for you. */
  reset_sessions: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiOtpV1OtpSmsLoginOrCreateRequest = {
  /** The phone number to use for one-time passcodes. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  phone_number: string;
  /** Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the maximum is 10 minutes. The default expiration is 2 minutes. */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.         If true, users will be saved with status pending in Stytch's backend until authenticated.         If false, users will be created as active. An example usage of         a true flag would be to require users to verify their phone by entering the OTP code before creating         an account for them. */
  create_user_as_pending?: boolean;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOtpV1LoginOrCreateRequestLocale;
};

export type ApiOtpV1OtpSmsLoginOrCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID for the phone number. */
  phone_id: string;
  /** In `login_or_create` endpoints, this field indicates whether or not a User was just created. */
  user_created: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOtpV1OtpSmsSendRequest = {
  /** The phone number to use for one-time passcodes. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  phone_number: string;
  /** Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the maximum is 10 minutes. The default expiration is 2 minutes. */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOtpV1SendRequestLocale;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
};

export type ApiOtpV1OtpSmsSendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID for the phone number. */
  phone_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiOtpV1LoginOrCreateRequestLocale = "en" | "es" | "pt-br" | "fr";

export type ApiOtpV1SendRequestLocale = "en" | "es" | "pt-br" | "fr";

/** Request type */
export type ApiOtpV1OtpWhatsappLoginOrCreateRequest = {
  /** The phone number to use for one-time passcodes. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  phone_number: string;
  /** Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the maximum is 10 minutes. The default expiration is 2 minutes. */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.         If true, users will be saved with status pending in Stytch's backend until authenticated.         If false, users will be created as active. An example usage of         a true flag would be to require users to verify their phone by entering the OTP code before creating         an account for them. */
  create_user_as_pending?: boolean;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOtpV1LoginOrCreateRequestLocale;
};

export type ApiOtpV1OtpWhatsappLoginOrCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID for the phone number. */
  phone_id: string;
  /** In `login_or_create` endpoints, this field indicates whether or not a User was just created. */
  user_created: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOtpV1OtpWhatsappSendRequest = {
  /** The phone number to use for one-time passcodes. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  phone_number: string;
  /** Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the maximum is 10 minutes. The default expiration is 2 minutes. */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOtpV1SendRequestLocale;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
};

export type ApiOtpV1OtpWhatsappSendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID for the phone number. */
  phone_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOtpV1OtpEmailLoginOrCreateRequest = {
  /** The email address of the user to send the one-time passcode to. You may use sandbox@stytch.com to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  email: string;
  /** Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the maximum is 10 minutes. The default expiration is 2 minutes. */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.         If true, users will be saved with status pending in Stytch's backend until authenticated.         If false, users will be created as active. An example usage of         a true flag would be to require users to verify their phone by entering the OTP code before creating         an account for them. */
  create_user_as_pending?: boolean;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOtpV1LoginOrCreateRequestLocale;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Login”. */
  login_template_id?: string;
  /** Use a custom template for sign-up emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “Magic links - Sign-up”. */
  signup_template_id?: string;
};

export type ApiOtpV1OtpEmailLoginOrCreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** In `login_or_create` endpoints, this field indicates whether or not a User was just created. */
  user_created: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiOtpV1OtpEmailSendRequest = {
  /** The email address of the user to send the one-time passcode to. You may use sandbox@stytch.com to test this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail. */
  email: string;
  /** Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the maximum is 10 minutes. The default expiration is 2 minutes. */
  expiration_minutes?: number;
  /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
  attributes?: ApiAttributeV1Attributes;
  /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiOtpV1SendRequestLocale;
  /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “OTP - Login”. */
  login_template_id?: string;
  /** Use a custom template for sign-up emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “OTP - Sign-up”. */
  signup_template_id?: string;
};

export type ApiOtpV1OtpEmailSendResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID of a specific email address. */
  email_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiProjectV1ProjectMetric = {
  metric_type: ApiProjectV1ProjectMetricMetricType;
  count: number;
};

export type ApiProjectV1MetricsRequest = { [key: string]: unknown };

export type ApiProjectV1MetricsResponse = {
  request_id: string;
  project_id: string;
  metrics: (ApiProjectV1ProjectMetric)[];
  status_code: number;
};

export type ApiProjectV1ProjectMetricMetricType = "UNKNOWN" | "USER_COUNT" | "ORGANIZATION_COUNT" | "MEMBER_COUNT" | "M2M_CLIENT_COUNT";

export type ApiSsoV1Connection = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific External SSO Connection. */
  connection_id: string;
  /** Globally unique UUID that identifies a different Organization within your Project. */
  external_organization_id: string;
  /** Globally unique UUID that identifies a specific SSO connection configured for a different Organization in your Project. */
  external_connection_id: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  /** The status of the connection. External connections are always active. */
  status: string;
  /** All Members who log in with this External connection will implicitly receive the specified Roles. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. Implicit role assignments are not supported for External connections if the underlying SSO connection is an OIDC connection.  */
  external_connection_implicit_role_assignments: (ApiSsoV1ConnectionImplicitRoleAssignment)[];
  /** Defines the names of the groups  that grant specific role assignments. For each group-Role pair, if a Member logs in with this external connection and  belongs to the specified group, they will be granted the associated Role. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. */
  external_group_implicit_role_assignments: (ApiSsoV1GroupImplicitRoleAssignment)[];
};

export type ApiSsoV1ConnectionImplicitRoleAssignment = {
  /** The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.    Reserved `role_id`s that are predefined by Stytch include:    * `stytch_member`   * `stytch_admin`    Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  role_id: string;
};

export type ApiSsoV1EncryptionPrivateKey = {
  private_key_id: string;
  private_key: string;
  created_at?: string;
};

export type ApiSsoV1GroupImplicitRoleAssignment = {
  role_id: string;
  group: string;
};

export type ApiSsoV1OidcConnection = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific OIDC Connection. */
  connection_id: string;
  /** The status of the connection. The possible values are pending or active. See the [Update OIDC Connection endpoint](https://stytch.com/docs/b2b/api/update-oidc-connection) for more details. */
  status: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  /** The callback URL for this OIDC connection. This value will be passed to the IdP to redirect the Member back to Stytch after a sign-in attempt. */
  redirect_url: string;
  /** The OAuth2.0 client ID used to authenticate login attempts. This will be provided by the IdP. */
  client_id: string;
  /** The secret belonging to the OAuth2.0 client used to authenticate login attempts. This will be provided by the IdP. */
  client_secret: string;
  /** A case-sensitive `https://` URL that uniquely identifies the IdP. This will be provided by the IdP. */
  issuer: string;
  /** The location of the URL that starts an OAuth login at the IdP. This will be provided by the IdP. */
  authorization_url: string;
  /** The location of the URL that issues OAuth2.0 access tokens and OIDC ID tokens. This will be provided by the IdP. */
  token_url: string;
  /** The location of the IDP's [UserInfo Endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo). This will be provided by the IdP. */
  userinfo_url: string;
  /** The location of the IdP's JSON Web Key Set, used to verify credentials issued by the IdP. This will be provided by the IdP. */
  jwks_url: string;
  /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
  identity_provider: string;
  /** A space-separated list of custom scopes that will be requested on every SSOStart call. If set, this value will replace the default set of OIDC scopes requested: `openid email profile`. Additional scopes can be requested using the `custom_scopes` query parameter on individual SSOStart calls. */
  custom_scopes: string;
  /** An object that represents the attributes used to identify a Member. This object will map the IdP-defined User attributes to Stytch-specific values, which will appear on the member's Trusted Metadata. */
  attribute_mapping?: { [key: string]: unknown };
};

export type ApiSsoV1SamlConnection = {
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
  organization_id: string;
  /** Globally unique UUID that identifies a specific SAML Connection. */
  connection_id: string;
  /** The status of the connection. The possible values are pending or active. See the [Update SAML Connection endpoint](https://stytch.com/docs/b2b/api/update-saml-connection) for more details. */
  status: string;
  /** A globally unique name for the IdP. This will be provided by the IdP. */
  idp_entity_id: string;
  /** A human-readable display name for the connection. */
  display_name: string;
  /** The URL for which assertions for login requests will be sent. This will be provided by the IdP. */
  idp_sso_url: string;
  /** The URL of the Assertion Consumer Service. This value will be passed to the IdP to redirect the Member back to Stytch after a sign-in attempt. Read our [SAML Overview](https://stytch.com/docs/b2b/api/saml-overview) for more info. */
  acs_url: string;
  /** The URL of the Audience Restriction. This value will indicate that Stytch is the intended audience of an assertion. Read our [SAML Overview](https://stytch.com/docs/b2b/api/saml-overview) for more info. */
  audience_uri: string;
  /** A list of X.509 certificates Stytch will use to sign its assertion requests. Certificates should be uploaded to the IdP. */
  signing_certificates: (ApiSsoV1X509Certificate)[];
  /** A list of X.509 certificates Stytch will use to validate an assertion callback. Certificates should be populated from the IdP. */
  verification_certificates: (ApiSsoV1X509Certificate)[];
  encryption_private_keys: (ApiSsoV1EncryptionPrivateKey)[];
  /** All Members who log in with this SAML connection will implicitly receive the specified Roles. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. */
  saml_connection_implicit_role_assignments: (ApiSsoV1SamlConnectionImplicitRoleAssignment)[];
  /** Defines the names of the SAML groups  that grant specific role assignments. For each group-Role pair, if a Member logs in with this SAML connection and  belongs to the specified SAML group, they will be granted the associated Role. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. */
  saml_group_implicit_role_assignments: (ApiSsoV1SamlGroupImplicitRoleAssignment)[];
  /** An alternative URL to use for the Audience Restriction. This value can be used when you wish to migrate an existing SAML integration to Stytch with zero downtime. Read our [SSO migration guide](https://stytch.com/docs/b2b/guides/migrations/additional-migration-considerations) for more info. */
  alternative_audience_uri: string;
  /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
  identity_provider: string;
  /** The NameID format the SAML Connection expects to use. Defaults to `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`. */
  nameid_format: string;
  /** An alternative URL to use for the `AssertionConsumerServiceURL` in SP initiated SAML AuthNRequests. This value can be used when you wish to migrate an existing SAML integration to Stytch with zero downtime. Note that you will be responsible for proxying requests sent to the Alternative ACS URL to Stytch. Read our [SSO migration guide](https://stytch.com/docs/b2b/guides/migrations/additional-migration-considerations) for more info. */
  alternative_acs_url: string;
  /** Determines whether IDP initiated auth is allowed for a given SAML connection. Defaults to false (IDP Initiated Auth is enabled). */
  idp_initiated_auth_disabled: boolean;
  allow_gateway_callback: boolean;
  /** An object that represents the attributes used to identify a Member. This object will map the IdP-defined User attributes to Stytch-specific values. Required attributes: `email` and one of `full_name` or `first_name` and `last_name`. */
  attribute_mapping?: { [key: string]: unknown };
};

export type ApiSsoV1SamlConnectionImplicitRoleAssignment = {
  /** The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.    Reserved `role_id`s that are predefined by Stytch include:    * `stytch_member`   * `stytch_admin`    Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more detailed explanation.     */
  role_id: string;
};

export type ApiSsoV1SamlGroupImplicitRoleAssignment = {
  role_id: string;
  group: string;
};

export type ApiSsoV1X509Certificate = {
  /** The ID of the certificate. */
  certificate_id: string;
  /** The certificate, in [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format. */
  certificate: string;
  /** The issuer of the certificate. For signing certificates, this value will be "Stytch". */
  issuer: string;
  /** A timestamp that indicates when the certificate was created. */
  created_at?: string;
  /** A timestamp that indicates when the certificate will expire. */
  expires_at?: string;
  /** A timestamp that indicates when the certificate was updated. */
  updated_at?: string;
};

/** Request type */
export type ApiSsoV1AuthenticateRequest = {
  /** The token to authenticate. */
  sso_token: string;
  /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
  pkce_code_verifier?: string;
  /** The `session_token` belonging to the member that you wish to associate the email with. */
  session_token?: string;
  /** The `session_jwt` belonging to the member that you wish to associate the email with. */
  session_jwt?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
  session_duration_minutes?: number;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the Member needs to complete an MFA step, and the Member has a phone number, this endpoint will pre-emptively send a one-time passcode (OTP) to the Member's phone number. The locale argument will be used to determine which language to use when sending the passcode.  Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
  locale?: ApiSsoV1AuthenticateRequestLocale;
  /** Adds this primary authentication factor to the intermediate session token. If the resulting set of factors satisfies the organization's primary authentication requirements and MFA requirements, the intermediate session token will be consumed and converted to a member session. If not, the same intermediate session token will be returned. */
  intermediate_session_token?: string;
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiSsoV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** Globally unique UUID that identifies a specific Member. */
  member_id: string;
  /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. */
  organization_id: string;
  /** The [Member object](https://stytch.com/docs/b2b/api/member-object) */
  member: ApiOrganizationV1Member;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** This field is deprecated. */
  reset_session: boolean;
  /** The [Organization object](https://stytch.com/docs/b2b/api/organization-object). */
  organization: ApiOrganizationV1Organization;
  /** The returned Intermediate Session Token contains an SSO factor associated with the Member. If this value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. SSO factors are not transferable between Organizations, so the intermediate session token is not valid for use with discovery endpoints. */
  intermediate_session_token: string;
  /** Indicates whether the Member is fully authenticated. If false, the Member needs to complete an MFA step to log in to the Organization. */
  member_authenticated: boolean;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [Session object](https://stytch.com/docs/b2b/api/session-object). */
  member_session?: ApiB2BSessionV1MemberSession;
  /** Information about the MFA requirements of the Organization and the Member's options for fulfilling MFA. */
  mfa_required?: ApiB2BMfaV1MfaRequired;
  primary_required?: ApiB2BSessionV1PrimaryRequired;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `member_device` response field will contain information about the member's device attributes. */
  member_device?: ApiDeviceHistoryV1DeviceInfo;
};

export type ApiSsoV1DeleteConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The `connection_id` that was deleted as part of the delete request. */
  connection_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiSsoV1GetConnectionsRequest = { [key: string]: unknown };

export type ApiSsoV1GetConnectionsResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The list of [SAML Connections](https://stytch.com/docs/b2b/api/saml-connection-object) owned by this organization. */
  saml_connections: (ApiSsoV1SamlConnection)[];
  /** The list of [OIDC Connections](https://stytch.com/docs/b2b/api/oidc-connection-object) owned by this organization. */
  oidc_connections: (ApiSsoV1OidcConnection)[];
  /** The list of [External Connections](https://stytch.com/docs/b2b/api/external-connection-object) owned by this organization. */
  external_connections: (ApiSsoV1Connection)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiSsoV1AuthenticateRequestLocale = "en" | "es" | "pt-br" | "fr" | "it" | "de-DE" | "zh-Hans" | "ca-ES";

/** Request type */
export type ApiSsoV1SsoOidcCreateConnectionRequest = {
  /** A human-readable display name for the connection. */
  display_name?: string;
  /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
  identity_provider?: ApiSsoV1CreateConnectionRequestIdentityProvider;
};

export type ApiSsoV1SsoOidcCreateConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [OIDC Connection Object](https://stytch.com/docs/b2b/api/oidc-connection-object). */
  connection?: ApiSsoV1OidcConnection;
};

/** Request type */
export type ApiSsoV1SsoOidcUpdateConnectionRequest = {
  /** A human-readable display name for the connection. */
  display_name?: string;
  /** The OAuth2.0 client ID used to authenticate login attempts. This will be provided by the IdP. */
  client_id?: string;
  /** The secret belonging to the OAuth2.0 client used to authenticate login attempts. This will be provided by the IdP. */
  client_secret?: string;
  /** A case-sensitive `https://` URL that uniquely identifies the IdP. This will be provided by the IdP. */
  issuer?: string;
  /** The location of the URL that starts an OAuth login at the IdP. This will be provided by the IdP. */
  authorization_url?: string;
  /** The location of the URL that issues OAuth2.0 access tokens and OIDC ID tokens. This will be provided by the IdP. */
  token_url?: string;
  /** The location of the IDP's [UserInfo Endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo). This will be provided by the IdP. */
  userinfo_url?: string;
  /** The location of the IdP's JSON Web Key Set, used to verify credentials issued by the IdP. This will be provided by the IdP. */
  jwks_url?: string;
  /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
  identity_provider?: ApiSsoV1UpdateConnectionRequestIdentityProvider;
  /** Include a space-separated list of custom scopes that you'd like to include. Note that this list must be URL encoded, e.g. the spaces must be expressed as %20. */
  custom_scopes?: string;
  /** An object that represents the attributes used to identify a Member. This object will map the IdP-defined User attributes to Stytch-specific values, which will appear on the member's Trusted Metadata. */
  attribute_mapping?: { [key: string]: unknown };
};

export type ApiSsoV1SsoOidcUpdateConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [OIDC Connection Object](https://stytch.com/docs/b2b/api/oidc-connection-object). */
  connection?: ApiSsoV1OidcConnection;
  /** If it is not possible to resolve the well-known metadata document from the OIDC issuer, this field will explain what went wrong if the request is successful otherwise. In other words, even if the overall request succeeds, there could be relevant warnings related to the connection update. */
  warning?: string;
};

export type ApiSsoV1CreateConnectionRequestIdentityProvider = "classlink" | "cyberark" | "duo" | "generic" | "google-workspace" | "jumpcloud" | "keycloak" | "miniorange" | "microsoft-entra" | "okta" | "onelogin" | "pingfederate" | "rippling" | "salesforce" | "shibboleth";

export type ApiSsoV1UpdateConnectionRequestIdentityProvider = "classlink" | "cyberark" | "duo" | "generic" | "google-workspace" | "jumpcloud" | "keycloak" | "miniorange" | "microsoft-entra" | "okta" | "onelogin" | "pingfederate" | "rippling" | "salesforce" | "shibboleth";

/** Request type */
export type ApiSsoV1SsoSamlCreateConnectionRequest = {
  /** A human-readable display name for the connection. */
  display_name?: string;
  /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
  identity_provider?: ApiSsoV1CreateConnectionRequestIdentityProvider;
};

export type ApiSsoV1SsoSamlCreateConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) */
  connection?: ApiSsoV1SamlConnection;
};

export type ApiSsoV1SsoSamlDeleteEncryptionPrivateKeyResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The ID of the encryption private key. */
  private_key_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiSsoV1SsoSamlDeleteVerificationCertificateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The ID of the certificate that was deleted. */
  certificate_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiSsoV1SsoSamlUpdateByUrlRequest = {
  /** A URL that points to the IdP metadata. This will be provided by the IdP. */
  metadata_url: string;
};

export type ApiSsoV1SsoSamlUpdateByUrlResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) */
  connection?: ApiSsoV1SamlConnection;
};

/** Request type */
export type ApiSsoV1SsoSamlUpdateConnectionRequest = {
  /** A globally unique name for the IdP. This will be provided by the IdP. */
  idp_entity_id?: string;
  /** A human-readable display name for the connection. */
  display_name?: string;
  /** An object that represents the attributes used to identify a Member. This object will map the IdP-defined User attributes to Stytch-specific values. Required attributes: `email` and one of `full_name` or `first_name` and `last_name`. */
  attribute_mapping?: { [key: string]: unknown };
  /** A certificate that Stytch will use to verify the sign-in assertion sent by the IdP, in [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format. See our [X509 guide](https://stytch.com/docs/b2b/api/saml-certificates) for more info. */
  x509_certificate?: string;
  /** The URL for which assertions for login requests will be sent. This will be provided by the IdP. */
  idp_sso_url?: string;
  /** All Members who log in with this SAML connection will implicitly receive the specified Roles. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. */
  saml_connection_implicit_role_assignments?: (ApiSsoV1SamlConnectionImplicitRoleAssignment)[];
  /** Defines the names of the SAML groups  that grant specific role assignments. For each group-Role pair, if a Member logs in with this SAML connection and  belongs to the specified SAML group, they will be granted the associated Role. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. Before adding any group implicit role assignments, you must add a "groups" key to your SAML connection's          `attribute_mapping`. Make sure that your IdP is configured to correctly send the group information. */
  saml_group_implicit_role_assignments?: (ApiSsoV1SamlGroupImplicitRoleAssignment)[];
  /** An alternative URL to use for the Audience Restriction. This value can be used when you wish to migrate an existing SAML integration to Stytch with zero downtime. Read our [SSO migration guide](https://stytch.com/docs/b2b/guides/migrations/additional-migration-considerations) for more info. */
  alternative_audience_uri?: string;
  /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
  identity_provider?: ApiSsoV1UpdateConnectionRequestIdentityProvider;
  /** A PKCS1 format RSA private key used for signing SAML requests. Only PKCS1 format (starting with "-----BEGIN RSA PRIVATE KEY-----") is supported. When provided, Stytch will generate a new x509 certificate from this key and return it in the signing_certificates array. */
  signing_private_key?: string;
  /** The NameID format the SAML Connection expects to use. Defaults to `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`. */
  nameid_format?: string;
  /** An alternative URL to use for the `AssertionConsumerServiceURL` in SP initiated SAML AuthNRequests. This value can be used when you wish to migrate an existing SAML integration to Stytch with zero downtime. Note that you will be responsible for proxying requests sent to the Alternative ACS URL to Stytch. Read our [SSO migration guide](https://stytch.com/docs/b2b/guides/migrations/additional-migration-considerations) for more info. */
  alternative_acs_url?: string;
  /** Determines whether IDP initiated auth is allowed for a given SAML connection. Defaults to false (IDP Initiated Auth is enabled). */
  idp_initiated_auth_disabled?: boolean;
  /** A PKCS1 format RSA private key used to decrypt encrypted SAML assertions. Only PKCS1 format (starting with "-----BEGIN RSA PRIVATE KEY-----") is supported. */
  saml_encryption_private_key?: string;
  allow_gateway_callback?: boolean;
};

export type ApiSsoV1SsoSamlUpdateConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) */
  connection?: ApiSsoV1SamlConnection;
};

/** Request type */
export type ApiSsoV1SsoExternalCreateConnectionRequest = {
  /** Globally unique UUID that identifies a different Organization within your Project. */
  external_organization_id: string;
  /** Globally unique UUID that identifies a specific SSO connection configured for a different Organization in your Project. */
  external_connection_id: string;
  /** A human-readable display name for the connection. */
  display_name?: string;
  connection_implicit_role_assignments?: (ApiSsoV1SamlConnectionImplicitRoleAssignment)[];
  group_implicit_role_assignments?: (ApiSsoV1SamlGroupImplicitRoleAssignment)[];
};

export type ApiSsoV1SsoExternalCreateConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [External Connection Object](https://stytch.com/docs/b2b/api/external-connection-object). */
  connection?: ApiSsoV1Connection;
};

/** Request type */
export type ApiSsoV1SsoExternalUpdateConnectionRequest = {
  /** A human-readable display name for the connection. */
  display_name?: string;
  /** All Members who log in with this External connection will implicitly receive the specified Roles. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. Implicit role assignments are not supported for External connections if the underlying SSO connection is an OIDC connection.  */
  external_connection_implicit_role_assignments?: (ApiSsoV1ConnectionImplicitRoleAssignment)[];
  /** Defines the names of the groups  that grant specific role assignments. For each group-Role pair, if a Member logs in with this external connection and  belongs to the specified group, they will be granted the associated Role. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. Before adding any group implicit role assignments to an external connection, you must add a "groups" key to the underlying SAML connection's          `attribute_mapping`. Make sure that the SAML connection IdP is configured to correctly send the group information. Implicit role assignments are not supported          for External connections if the underlying SSO connection is an OIDC connection. */
  external_group_implicit_role_assignments?: (ApiSsoV1GroupImplicitRoleAssignment)[];
};

export type ApiSsoV1SsoExternalUpdateConnectionResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** The [External Connection Object](https://stytch.com/docs/b2b/api/external-connection-object). */
  connection?: ApiSsoV1Connection;
};

export type ApiTotpV1Totp = {
  /** The unique ID for a TOTP instance. */
  totp_id: string;
  /** The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc., has been successfully authenticated by the User. */
  verified: boolean;
  /** The recovery codes used to authenticate the user without an authenticator app. */
  recovery_codes: (string)[];
};

/** Request type */
export type ApiTotpV1AuthenticateRequest = {
  /** The `user_id` of an active user the TOTP registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id: string;
  /** The TOTP code to authenticate. The TOTP code should consist of 6 digits. */
  totp_code: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiTotpV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The unique ID for a TOTP instance. */
  totp_id: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiTotpV1CreateRequest = {
  /** The `user_id` of an active user the TOTP registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id: string;
  /** The expiration for the TOTP instance. If the newly created TOTP is not authenticated within this time frame the TOTP will be unusable. Defaults to 1440 (1 day) with a minimum of 5 and a maximum of 1440. */
  expiration_minutes?: number;
};

export type ApiTotpV1CreateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID for a TOTP instance. */
  totp_id: string;
  /** The TOTP secret key shared between the authenticator app and the server used to generate TOTP codes. */
  secret: string;
  /** The QR code image encoded in base64. */
  qr_code: string;
  /** The recovery codes used to authenticate the user without an authenticator app. */
  recovery_codes: (string)[];
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiTotpV1RecoverRequest = {
  /** The `user_id` of an active user the TOTP registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id: string;
  /** The recovery code to authenticate. */
  recovery_code: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiTotpV1RecoverResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID for a TOTP instance. */
  totp_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiTotpV1RecoveryCodesRequest = {
  /** The `user_id` of an active user the TOTP registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id: string;
};

export type ApiTotpV1RecoveryCodesResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** An array containing a list of all TOTP instances (along with their recovery codes) for a given User in the Stytch API. */
  totps: (ApiTotpV1Totp)[];
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

export type ApiWebauthnV1WebAuthnCredential = {
  /** The unique, public ID of the WebAuthn credential. */
  credential_id: string;
  /** The unique ID for the Passkey or WebAuthn registration. */
  webauthn_registration_id: string;
  /** The type of the WebAuthn credential. Examples include `public-key`. */
  type: string;
  /** The public key for the WebAuthn credential in base64 format. */
  public_key: string;
};

/** Request type */
export type ApiWebauthnV1AuthenticateRequest = {
  /** The response of the [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential). */
  public_key_credential: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiWebauthnV1AuthenticateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID for the Passkey or WebAuthn registration. */
  webauthn_registration_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  /** The `user` object affected by this API call. See the [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details. */
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiWebauthnV1AuthenticateStartRequest = {
  /** The domain for Passkeys or WebAuthn. Defaults to `window.location.hostname`. */
  domain: string;
  /** The `user_id` of an active user the Passkey or WebAuthn registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id?: string;
  /** If true, the `public_key_credential_creation_options` returned will be optimized for Passkeys with `userVerification` set to `"preferred"`.        */
  return_passkey_credential_options?: boolean;
  /** If true, values in the `public_key_credential_creation_options` will be base64 URL encoded. Set this option to true when using built-in browser methods like `navigator.credentials.create` and `navigator.credentials.get`. */
  use_base64_url_encoding?: boolean;
};

export type ApiWebauthnV1AuthenticateStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** Options used for Passkey or WebAuthn authentication. */
  public_key_credential_request_options: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiWebauthnV1ListCredentialsRequest = { [key: string]: unknown };

export type ApiWebauthnV1ListCredentialsResponse = {
  /** A list of WebAuthn credential objects. */
  credentials: (ApiWebauthnV1WebAuthnCredential)[];
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiWebauthnV1RegisterRequest = {
  /** The `user_id` of an active user the Passkey or WebAuthn registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id: string;
  /** The response of the [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential). */
  public_key_credential: string;
  /** The `session_token` associated with a User's existing Session. */
  session_token?: string;
  /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
  session_duration_minutes?: number;
  /** The `session_jwt` associated with a User's existing Session. */
  session_jwt?: string;
  /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
  session_custom_claims?: { [key: string]: unknown };
  /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
  telemetry_id?: string;
};

export type ApiWebauthnV1RegisterResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** The unique ID for the Passkey or WebAuthn registration. */
  webauthn_registration_id: string;
  /** A secret token for a given Stytch Session. */
  session_token: string;
  /** The JSON Web Token (JWT) for a given Stytch Session. */
  session_jwt: string;
  user: ApiUserV1User;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll receive a full Session object in the response.    See [Session object](https://stytch.com/docs/api/session-object) for complete response fields.    */
  session?: ApiSessionV1Session;
  /** If a valid `telemetry_id` was passed in the request and the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) returned results, the `user_device` response field will contain information about the user's device attributes. */
  user_device?: ApiDeviceHistoryV1DeviceInfo;
};

/** Request type */
export type ApiWebauthnV1RegisterStartRequest = {
  /** The `user_id` of an active user the Passkey or WebAuthn registration should be tied to. You may use an `external_id` here if one is set for the user. */
  user_id: string;
  /** The domain for Passkeys or WebAuthn. Defaults to `window.location.hostname`. */
  domain: string;
  /** The user agent of the client. */
  user_agent?: string;
  /** The requested authenticator type of the Passkey or WebAuthn device. The two valid values are platform and cross-platform. If no value passed, we assume both values are allowed. */
  authenticator_type?: string;
  /** If true, the `public_key_credential_creation_options` returned will be optimized for Passkeys with `residentKey` set to `"required"` and `userVerification` set to `"preferred"`.        */
  return_passkey_credential_options?: boolean;
  override_id?: string;
  override_name?: string;
  override_display_name?: string;
  /** If true, values in the `public_key_credential_creation_options` will be base64 URL encoded. Set this option to true when using built-in browser methods like `navigator.credentials.create` and `navigator.credentials.get`. */
  use_base64_url_encoding?: boolean;
};

export type ApiWebauthnV1RegisterStartResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The unique ID of the affected User. */
  user_id: string;
  /** Options used for Passkey or WebAuthn registration. */
  public_key_credential_creation_options: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
};

/** Request type */
export type ApiWebauthnV1UpdateRequest = {
  /** The `name` of the WebAuthn registration or Passkey. */
  name: string;
};

export type ApiWebauthnV1UpdateResponse = {
  /** Globally unique UUID that is returned with every API call. This value is important to log for debugging purposes; we may ask for this value to help identify a specific API call when helping you debug an issue. */
  request_id: string;
  /** The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g. 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors. */
  status_code: number;
  /** A Passkey or WebAuthn registration. */
  webauthn_registration?: ApiUserV1WebAuthnRegistration;
};
