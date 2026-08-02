import type { ApiAttributeV1Attributes, ApiB2BIdpV1B2BIdpOauthAuthorizeResponse, ApiB2BIdpV1B2BIdpOauthAuthorizeStartResponse, ApiB2BImpersonationV1AuthenticateResponse, ApiB2BMagicV1AuthenticateRequestLocale, ApiB2BMagicV1AuthenticateResponse, ApiB2BMagicV1B2BMagicLinksDiscoveryAuthenticateResponse, ApiB2BMagicV1B2BMagicLinksEmailDiscoverySendResponse, ApiB2BMagicV1B2BMagicLinksEmailInviteResponse, ApiB2BMagicV1B2BMagicLinksEmailLoginOrSignupResponse, ApiB2BMagicV1InviteRequestLocale, ApiB2BMagicV1LoginOrSignupRequestLocale, ApiB2BMagicV1SendRequestLocale, ApiB2BOauthV1AuthenticateRequestLocale, ApiB2BOauthV1AuthenticateResponse, ApiB2BOauthV1B2BOauthDiscoveryAuthenticateResponse, ApiB2BOtpV1AuthenticateRequestLocale, ApiB2BOtpV1B2BOtpEmailAuthenticateResponse, ApiB2BOtpV1B2BOtpEmailDiscoveryAuthenticateResponse, ApiB2BOtpV1B2BOtpEmailDiscoverySendResponse, ApiB2BOtpV1B2BOtpEmailLoginOrSignupResponse, ApiB2BOtpV1B2BOtpSmsAuthenticateResponse, ApiB2BOtpV1B2BOtpSmsSendResponse, ApiB2BOtpV1LoginOrSignupRequestLocale, ApiB2BOtpV1SendRequestLocale, ApiB2BPasswordV1AuthenticateRequestLocale, ApiB2BPasswordV1AuthenticateResponse, ApiB2BPasswordV1B2BPasswordsDiscoveryAuthenticateResponse, ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetResponse, ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetStartResponse, ApiB2BPasswordV1B2BPasswordsEmailRequireResetResponse, ApiB2BPasswordV1B2BPasswordsEmailResetResponse, ApiB2BPasswordV1B2BPasswordsEmailResetStartResponse, ApiB2BPasswordV1B2BPasswordsExistingPasswordResetResponse, ApiB2BPasswordV1B2BPasswordsSessionResetResponse, ApiB2BPasswordV1MigrateRequestHashType, ApiB2BPasswordV1MigrateResponse, ApiB2BPasswordV1ResetRequestLocale, ApiB2BPasswordV1ResetStartRequestLocale, ApiB2BPasswordV1StrengthCheckResponse, ApiB2BRbacV1B2BRbacOrganizationsGetOrgPolicyResponse, ApiB2BRbacV1B2BRbacOrganizationsSetOrgPolicyResponse, ApiB2BRbacV1OrgPolicy, ApiB2BRbacV1PolicyResponse, ApiB2BRecoveryCodesV1GetResponse, ApiB2BRecoveryCodesV1RecoverResponse, ApiB2BRecoveryCodesV1RotateResponse, ApiB2BScimV1B2BScimConnectionCreateResponse, ApiB2BScimV1B2BScimConnectionDeleteResponse, ApiB2BScimV1B2BScimConnectionGetGroupsResponse, ApiB2BScimV1B2BScimConnectionGetResponse, ApiB2BScimV1B2BScimConnectionRotateCancelRequest, ApiB2BScimV1B2BScimConnectionRotateCancelResponse, ApiB2BScimV1B2BScimConnectionRotateCompleteRequest, ApiB2BScimV1B2BScimConnectionRotateCompleteResponse, ApiB2BScimV1B2BScimConnectionRotateStartRequest, ApiB2BScimV1B2BScimConnectionRotateStartResponse, ApiB2BScimV1B2BScimConnectionUpdateResponse, ApiB2BScimV1CreateRequestIdentityProvider, ApiB2BScimV1ScimGroupImplicitRoleAssignments, ApiB2BScimV1UpdateRequestIdentityProvider, ApiB2BSessionV1AttestResponse, ApiB2BSessionV1AuthenticateResponse, ApiB2BSessionV1AuthorizationCheck, ApiB2BSessionV1ExchangeAccessTokenResponse, ApiB2BSessionV1ExchangeRequestLocale, ApiB2BSessionV1ExchangeResponse, ApiB2BSessionV1GetJwksResponse, ApiB2BSessionV1GetResponse, ApiB2BSessionV1MigrateResponse, ApiB2BSessionV1RevokeResponse, ApiB2BTotpV1AuthenticateResponse, ApiB2BTotpV1CreateResponse, ApiB2BTotpV1MigrateResponse, ApiConnectedappsV1ConnectedAppsClientsCreateResponse, ApiConnectedappsV1ConnectedAppsClientsDeleteResponse, ApiConnectedappsV1ConnectedAppsClientsGetResponse, ApiConnectedappsV1ConnectedAppsClientsSearchResponse, ApiConnectedappsV1ConnectedAppsClientsSecretsRotateCancelRequest, ApiConnectedappsV1ConnectedAppsClientsSecretsRotateCancelResponse, ApiConnectedappsV1ConnectedAppsClientsSecretsRotateRequest, ApiConnectedappsV1ConnectedAppsClientsSecretsRotateResponse, ApiConnectedappsV1ConnectedAppsClientsSecretsRotateStartRequest, ApiConnectedappsV1ConnectedAppsClientsSecretsRotateStartResponse, ApiConnectedappsV1ConnectedAppsClientsUpdateResponse, ApiConnectedappsV1CreateRequestClientType, ApiConsumerRbacV1PolicyResponse, ApiCryptoWalletV1AuthenticateResponse, ApiCryptoWalletV1AuthenticateStartResponse, ApiCryptoWalletV1SiweParams, ApiDebugV1WhoamiResponse, ApiDiscoveryV1CreateRequestFirstPartyConnectedAppsAllowedType, ApiDiscoveryV1CreateRequestThirdPartyConnectedAppsAllowedType, ApiDiscoveryV1DiscoveryIntermediateSessionsExchangeResponse, ApiDiscoveryV1DiscoveryListResponse, ApiDiscoveryV1DiscoveryOrganizationsCreateResponse, ApiDiscoveryV1ExchangeRequestLocale, ApiFraudV1FraudEmailRiskResponse, ApiFraudV1FraudFingerprintLookupResponse, ApiFraudV1FraudRulesListResponse, ApiFraudV1FraudRulesSetResponse, ApiFraudV1FraudVerdictReasonsListResponse, ApiFraudV1FraudVerdictReasonsOverrideResponse, ApiFraudV1Metadata, ApiFraudV1OverrideRequestAction, ApiFraudV1RuleAction, ApiIdpV1IdpOauthAuthorizeResponse, ApiIdpV1IdpOauthAuthorizeStartResponse, ApiImpersonationV1AuthenticateResponse, ApiM2MV1M2MClientsCreateResponse, ApiM2MV1M2MClientsDeleteResponse, ApiM2MV1M2MClientsGetResponse, ApiM2MV1M2MClientsSearchResponse, ApiM2MV1M2MClientsSecretsRotateCancelRequest, ApiM2MV1M2MClientsSecretsRotateCancelResponse, ApiM2MV1M2MClientsSecretsRotateRequest, ApiM2MV1M2MClientsSecretsRotateResponse, ApiM2MV1M2MClientsSecretsRotateStartRequest, ApiM2MV1M2MClientsSecretsRotateStartResponse, ApiM2MV1M2MClientsUpdateResponse, ApiM2MV1M2MSearchQuery, ApiM2MV1UpdateRequestStatus, ApiMagicV1AuthenticateResponse, ApiMagicV1CreateResponse, ApiMagicV1InviteRequestLocale, ApiMagicV1LoginOrCreateRequestLocale, ApiMagicV1MagicLinksEmailInviteResponse, ApiMagicV1MagicLinksEmailLoginOrCreateResponse, ApiMagicV1MagicLinksEmailRevokeInviteResponse, ApiMagicV1MagicLinksEmailSendResponse, ApiMagicV1Options, ApiMagicV1SendRequestLocale, ApiOauthV1AttachResponse, ApiOauthV1AuthenticateResponse, ApiOrganizationV1ConnectedAppsResponse, ApiOrganizationV1CreateRequestFirstPartyConnectedAppsAllowedType, ApiOrganizationV1CreateRequestThirdPartyConnectedAppsAllowedType, ApiOrganizationV1CreateResponse, ApiOrganizationV1DeleteExternalIdResponse, ApiOrganizationV1DeleteResponse, ApiOrganizationV1EmailImplicitRoleAssignment, ApiOrganizationV1GetConnectedAppResponse, ApiOrganizationV1GetResponse, ApiOrganizationV1MetricsResponse, ApiOrganizationV1OrganizationsMembersConnectedAppsRevokeRequest, ApiOrganizationV1OrganizationsMembersConnectedAppsRevokeResponse, ApiOrganizationV1OrganizationsMembersCreateResponse, ApiOrganizationV1OrganizationsMembersDeleteExternalIdResponse, ApiOrganizationV1OrganizationsMembersDeleteMfaPhoneNumberResponse, ApiOrganizationV1OrganizationsMembersDeletePasswordResponse, ApiOrganizationV1OrganizationsMembersDeleteResponse, ApiOrganizationV1OrganizationsMembersDeleteTotpResponse, ApiOrganizationV1OrganizationsMembersGetConnectedAppsResponse, ApiOrganizationV1OrganizationsMembersGetResponse, ApiOrganizationV1OrganizationsMembersOauthProvidersGithubResponse, ApiOrganizationV1OrganizationsMembersOauthProvidersGoogleResponse, ApiOrganizationV1OrganizationsMembersOauthProvidersHubspotResponse, ApiOrganizationV1OrganizationsMembersOauthProvidersMicrosoftResponse, ApiOrganizationV1OrganizationsMembersOauthProvidersSlackResponse, ApiOrganizationV1OrganizationsMembersOidcProvidersResponse, ApiOrganizationV1OrganizationsMembersReactivateRequest, ApiOrganizationV1OrganizationsMembersReactivateResponse, ApiOrganizationV1OrganizationsMembersSearchResponse, ApiOrganizationV1OrganizationsMembersStartEmailUpdateResponse, ApiOrganizationV1OrganizationsMembersUnlinkRetiredEmailResponse, ApiOrganizationV1OrganizationsMembersUpdateResponse, ApiOrganizationV1SearchQuery, ApiOrganizationV1SearchResponse, ApiOrganizationV1StartEmailUpdateRequestDeliveryMethod, ApiOrganizationV1StartEmailUpdateRequestLocale, ApiOrganizationV1UpdateRequestFirstPartyConnectedAppsAllowedType, ApiOrganizationV1UpdateRequestThirdPartyConnectedAppsAllowedType, ApiOrganizationV1UpdateResponse, ApiOtpV1AuthenticateResponse, ApiOtpV1LoginOrCreateRequestLocale, ApiOtpV1OtpEmailLoginOrCreateResponse, ApiOtpV1OtpEmailSendResponse, ApiOtpV1OtpSmsLoginOrCreateResponse, ApiOtpV1OtpSmsSendResponse, ApiOtpV1OtpWhatsappLoginOrCreateResponse, ApiOtpV1OtpWhatsappSendResponse, ApiOtpV1SendRequestLocale, ApiPasswordV1Argon2Config, ApiPasswordV1AuthenticateResponse, ApiPasswordV1CreateResponse, ApiPasswordV1Md5Config, ApiPasswordV1MigrateRequestHashType, ApiPasswordV1MigrateResponse, ApiPasswordV1PasswordsEmailResetResponse, ApiPasswordV1PasswordsEmailResetStartResponse, ApiPasswordV1PasswordsExistingPasswordResetResponse, ApiPasswordV1PasswordsSessionResetResponse, ApiPasswordV1Pbkdf2Config, ApiPasswordV1ResetStartRequestLocale, ApiPasswordV1ScryptConfig, ApiPasswordV1Sha1Config, ApiPasswordV1Sha512Config, ApiPasswordV1StrengthCheckResponse, ApiProjectV1MetricsResponse, ApiSessionV1AttestResponse, ApiSessionV1AuthenticateResponse, ApiSessionV1AuthorizationCheck, ApiSessionV1ExchangeAccessTokenResponse, ApiSessionV1GetJwksResponse, ApiSessionV1GetResponse, ApiSessionV1MigrateResponse, ApiSessionV1RevokeResponse, ApiSsoV1AuthenticateRequestLocale, ApiSsoV1AuthenticateResponse, ApiSsoV1ConnectionImplicitRoleAssignment, ApiSsoV1CreateConnectionRequestIdentityProvider, ApiSsoV1DeleteConnectionResponse, ApiSsoV1GetConnectionsResponse, ApiSsoV1GroupImplicitRoleAssignment, ApiSsoV1SamlConnectionImplicitRoleAssignment, ApiSsoV1SamlGroupImplicitRoleAssignment, ApiSsoV1SsoExternalCreateConnectionResponse, ApiSsoV1SsoExternalUpdateConnectionResponse, ApiSsoV1SsoOidcCreateConnectionResponse, ApiSsoV1SsoOidcUpdateConnectionResponse, ApiSsoV1SsoSamlCreateConnectionResponse, ApiSsoV1SsoSamlDeleteEncryptionPrivateKeyResponse, ApiSsoV1SsoSamlDeleteVerificationCertificateResponse, ApiSsoV1SsoSamlUpdateByUrlResponse, ApiSsoV1SsoSamlUpdateConnectionResponse, ApiSsoV1UpdateConnectionRequestIdentityProvider, ApiTotpV1AuthenticateResponse, ApiTotpV1CreateResponse, ApiTotpV1RecoverResponse, ApiTotpV1RecoveryCodesResponse, ApiUserV1ConnectedAppsResponse, ApiUserV1CreateResponse, ApiUserV1DeleteBiometricRegistrationResponse, ApiUserV1DeleteCryptoWalletResponse, ApiUserV1DeleteEmailResponse, ApiUserV1DeleteExternalIdResponse, ApiUserV1DeleteOAuthRegistrationResponse, ApiUserV1DeletePasswordResponse, ApiUserV1DeletePhoneNumberResponse, ApiUserV1DeleteResponse, ApiUserV1DeleteTotpResponse, ApiUserV1DeleteWebAuthnRegistrationResponse, ApiUserV1ExchangePrimaryFactorResponse, ApiUserV1GetResponse, ApiUserV1Name, ApiUserV1RevokeRequest, ApiUserV1RevokeResponse, ApiUserV1SearchResponse, ApiUserV1SearchUsersQuery, ApiUserV1UpdateResponse, ApiWebauthnV1AuthenticateResponse, ApiWebauthnV1AuthenticateStartResponse, ApiWebauthnV1ListCredentialsResponse, ApiWebauthnV1RegisterResponse, ApiWebauthnV1RegisterStartResponse, ApiWebauthnV1UpdateResponse } from "./schemas.js";

export type StytchClient = {
  /**
   * Get
   */
  apiConnectedappsV1ConnectedAppsClientsGet: (input: {
    /** The ID of the Connected App client. */
    client_id: string;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsGetResponse>;

  /**
   * Update
   */
  apiConnectedappsV1ConnectedAppsClientsUpdate: (input: {
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
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsUpdateResponse>;

  /**
   * Delete
   */
  apiConnectedappsV1ConnectedAppsClientsDelete: (input: {
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsDeleteResponse>;

  /**
   * Search
   */
  apiConnectedappsV1ConnectedAppsClientsSearch: (input: {
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsSearchResponse>;

  /**
   * Create
   */
  apiConnectedappsV1ConnectedAppsClientsCreate: (input: {
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
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsCreateResponse>;

  /**
   * Rotatestart
   */
  apiConnectedappsV1ConnectedAppsClientsSecretsRotateStart: (input: {
    body: ApiConnectedappsV1ConnectedAppsClientsSecretsRotateStartRequest;
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsSecretsRotateStartResponse>;

  /**
   * Rotatecancel
   */
  apiConnectedappsV1ConnectedAppsClientsSecretsRotateCancel: (input: {
    body: ApiConnectedappsV1ConnectedAppsClientsSecretsRotateCancelRequest;
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsSecretsRotateCancelResponse>;

  /**
   * Rotate
   */
  apiConnectedappsV1ConnectedAppsClientsSecretsRotate: (input: {
    body: ApiConnectedappsV1ConnectedAppsClientsSecretsRotateRequest;
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiConnectedappsV1ConnectedAppsClientsSecretsRotateResponse>;

  /**
   * Update
   */
  apiB2BScimV1B2BScimConnectionUpdate: (input: {
    /** A human-readable display name for the connection. */
    display_name?: string;
    identity_provider?: ApiB2BScimV1UpdateRequestIdentityProvider;
    /** An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and a `role_id`. */
    scim_group_implicit_role_assignments?: (ApiB2BScimV1ScimGroupImplicitRoleAssignments)[];
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SCIM connection. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionUpdateResponse>;

  /**
   * Delete
   */
  apiB2BScimV1B2BScimConnectionDelete: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SCIM connection. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionDeleteResponse>;

  /**
   * Getgroups
   */
  apiB2BScimV1B2BScimConnectionGetGroups: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SCIM connection. */
    connection_id: string;
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionGetGroupsResponse>;

  /**
   * Rotatestart
   */
  apiB2BScimV1B2BScimConnectionRotateStart: (input: {
    body: ApiB2BScimV1B2BScimConnectionRotateStartRequest;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SCIM connection. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionRotateStartResponse>;

  /**
   * Rotatecomplete
   */
  apiB2BScimV1B2BScimConnectionRotateComplete: (input: {
    body: ApiB2BScimV1B2BScimConnectionRotateCompleteRequest;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SCIM connection. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionRotateCompleteResponse>;

  /**
   * Rotatecancel
   */
  apiB2BScimV1B2BScimConnectionRotateCancel: (input: {
    body: ApiB2BScimV1B2BScimConnectionRotateCancelRequest;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SCIM connection. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionRotateCancelResponse>;

  /**
   * Create
   */
  apiB2BScimV1B2BScimConnectionCreate: (input: {
    /** A human-readable display name for the connection. */
    display_name?: string;
    identity_provider?: ApiB2BScimV1CreateRequestIdentityProvider;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionCreateResponse>;

  /**
   * Get
   */
  apiB2BScimV1B2BScimConnectionGet: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BScimV1B2BScimConnectionGetResponse>;

  /**
   * Create
   */
  apiOrganizationV1Create: (input: {
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
  }) => Promise<ApiOrganizationV1CreateResponse>;

  /**
   * Get
   */
  apiOrganizationV1Get: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }) => Promise<ApiOrganizationV1GetResponse>;

  /**
   * Update
   */
  apiOrganizationV1Update: (input: {
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
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1UpdateResponse>;

  /**
   * Delete
   */
  apiOrganizationV1Delete: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1DeleteResponse>;

  /**
   * Search
   */
  apiOrganizationV1Search: (input: {
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
    /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all Organizations with no filtering applied. */
    query?: ApiOrganizationV1SearchQuery;
  }) => Promise<ApiOrganizationV1SearchResponse>;

  /**
   * Metrics
   */
  apiOrganizationV1Metrics: (input: {
    organization_id: string;
  }) => Promise<ApiOrganizationV1MetricsResponse>;

  /**
   * Connectedapps
   */
  apiOrganizationV1ConnectedApps: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1ConnectedAppsResponse>;

  /**
   * Getconnectedapp
   */
  apiOrganizationV1GetConnectedApp: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the Connected App. */
    connected_app_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1GetConnectedAppResponse>;

  /**
   * Deleteexternalid
   */
  apiOrganizationV1DeleteExternalId: (input: {
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1DeleteExternalIdResponse>;

  /**
   * Update
   */
  apiOrganizationV1OrganizationsMembersUpdate: (input: {
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
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersUpdateResponse>;

  /**
   * Delete
   */
  apiOrganizationV1OrganizationsMembersDelete: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersDeleteResponse>;

  /**
   * Reactivate
   */
  apiOrganizationV1OrganizationsMembersReactivate: (input: {
    body: ApiOrganizationV1OrganizationsMembersReactivateRequest;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersReactivateResponse>;

  /**
   * Deletemfaphonenumber
   */
  apiOrganizationV1OrganizationsMembersDeleteMfaPhoneNumber: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersDeleteMfaPhoneNumberResponse>;

  /**
   * Deletetotp
   */
  apiOrganizationV1OrganizationsMembersDeleteTotp: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersDeleteTotpResponse>;

  /**
   * Search
   */
  apiOrganizationV1OrganizationsMembersSearch: (input: {
    /** An array of organization_ids. At least one value is required. */
    organization_ids: (string)[];
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
    /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all Members with no filtering applied. */
    query?: ApiOrganizationV1SearchQuery;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersSearchResponse>;

  /**
   * Deletepassword
   */
  apiOrganizationV1OrganizationsMembersDeletePassword: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a Member's password. */
    member_password_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersDeletePasswordResponse>;

  /**
   * Dangerouslyget
   */
  apiOrganizationV1OrganizationsMembersDangerouslyGet: (input: {
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. */
    member_id: string;
    /** Whether to include deleted Members in the response. Defaults to false. */
    include_deleted?: boolean;
  }) => Promise<ApiOrganizationV1OrganizationsMembersGetResponse>;

  /**
   * Oidcproviders
   */
  apiOrganizationV1OrganizationsMembersOidcProviders: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
    include_refresh_token?: boolean;
  }) => Promise<ApiOrganizationV1OrganizationsMembersOidcProvidersResponse>;

  /**
   * Unlinkretiredemail
   */
  apiOrganizationV1OrganizationsMembersUnlinkRetiredEmail: (input: {
    /** The globally unique UUID of a Member's email. */
    email_id?: string;
    /** The email address of the Member. */
    email_address?: string;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersUnlinkRetiredEmailResponse>;

  /**
   * Startemailupdate
   */
  apiOrganizationV1OrganizationsMembersStartEmailUpdate: (input: {
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
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersStartEmailUpdateResponse>;

  /**
   * Getconnectedapps
   */
  apiOrganizationV1OrganizationsMembersGetConnectedApps: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersGetConnectedAppsResponse>;

  /**
   * Deleteexternalid
   */
  apiOrganizationV1OrganizationsMembersDeleteExternalId: (input: {
    organization_id: string;
    member_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersDeleteExternalIdResponse>;

  /**
   * Create
   */
  apiOrganizationV1OrganizationsMembersCreate: (input: {
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
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersCreateResponse>;

  /**
   * Get
   */
  apiOrganizationV1OrganizationsMembersGet: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id?: string;
    /** The email address of the Member. */
    email_address?: string;
  }) => Promise<ApiOrganizationV1OrganizationsMembersGetResponse>;

  /**
   * Google
   */
  apiOrganizationV1OrganizationsMembersOauthProvidersGoogle: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
    include_refresh_token?: boolean;
  }) => Promise<ApiOrganizationV1OrganizationsMembersOauthProvidersGoogleResponse>;

  /**
   * Microsoft
   */
  apiOrganizationV1OrganizationsMembersOauthProvidersMicrosoft: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
    include_refresh_token?: boolean;
  }) => Promise<ApiOrganizationV1OrganizationsMembersOauthProvidersMicrosoftResponse>;

  /**
   * Slack
   */
  apiOrganizationV1OrganizationsMembersOauthProvidersSlack: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }) => Promise<ApiOrganizationV1OrganizationsMembersOauthProvidersSlackResponse>;

  /**
   * Hubspot
   */
  apiOrganizationV1OrganizationsMembersOauthProvidersHubspot: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
    include_refresh_token?: boolean;
  }) => Promise<ApiOrganizationV1OrganizationsMembersOauthProvidersHubspotResponse>;

  /**
   * Github
   */
  apiOrganizationV1OrganizationsMembersOauthProvidersGithub: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false. **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically refresh access tokens in the future. */
    include_refresh_token?: boolean;
  }) => Promise<ApiOrganizationV1OrganizationsMembersOauthProvidersGithubResponse>;

  /**
   * Revoke
   */
  apiOrganizationV1OrganizationsMembersConnectedAppsRevoke: (input: {
    body: ApiOrganizationV1OrganizationsMembersConnectedAppsRevokeRequest;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** The ID of the Connected App. */
    connected_app_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiOrganizationV1OrganizationsMembersConnectedAppsRevokeResponse>;

  /**
   * Authorizestart
   */
  apiB2BIdpV1B2BIdpOauthAuthorizeStart: (input: {
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
  }) => Promise<ApiB2BIdpV1B2BIdpOauthAuthorizeStartResponse>;

  /**
   * Authorize
   */
  apiB2BIdpV1B2BIdpOauthAuthorize: (input: {
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
  }) => Promise<ApiB2BIdpV1B2BIdpOauthAuthorizeResponse>;

  /**
   * Create
   */
  apiUserV1Create: (input: {
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
  }) => Promise<ApiUserV1CreateResponse>;

  /**
   * Get
   */
  apiUserV1Get: (input: {
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiUserV1GetResponse>;

  /**
   * Update
   */
  apiUserV1Update: (input: {
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
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiUserV1UpdateResponse>;

  /**
   * Delete
   */
  apiUserV1Delete: (input: {
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiUserV1DeleteResponse>;

  /**
   * Search
   */
  apiUserV1Search: (input: {
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
    /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all results with no filtering applied. */
    query?: ApiUserV1SearchUsersQuery;
  }) => Promise<ApiUserV1SearchResponse>;

  /**
   * Exchangeprimaryfactor
   */
  apiUserV1ExchangePrimaryFactor: (input: {
    /** The email address to exchange to. */
    email_address?: string;
    /** The phone number to exchange to. The phone number should be in E.164 format (i.e. +1XXXXXXXXXX). */
    phone_number?: string;
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiUserV1ExchangePrimaryFactorResponse>;

  /**
   * Deleteemail
   */
  apiUserV1DeleteEmail: (input: {
    /** The `email_id` to be deleted. */
    email_id: string;
  }) => Promise<ApiUserV1DeleteEmailResponse>;

  /**
   * Deletephonenumber
   */
  apiUserV1DeletePhoneNumber: (input: {
    /** The `phone_id` to be deleted. */
    phone_id: string;
  }) => Promise<ApiUserV1DeletePhoneNumberResponse>;

  /**
   * Deletewebauthnregistration
   */
  apiUserV1DeleteWebAuthnRegistration: (input: {
    /** The `webauthn_registration_id` to be deleted. */
    webauthn_registration_id: string;
  }) => Promise<ApiUserV1DeleteWebAuthnRegistrationResponse>;

  /**
   * Deletebiometricregistration
   */
  apiUserV1DeleteBiometricRegistration: (input: {
    /** The `biometric_registration_id` to be deleted. */
    biometric_registration_id: string;
  }) => Promise<ApiUserV1DeleteBiometricRegistrationResponse>;

  /**
   * Deletetotp
   */
  apiUserV1DeleteTotp: (input: {
    /** The `totp_id` to be deleted. */
    totp_id: string;
  }) => Promise<ApiUserV1DeleteTotpResponse>;

  /**
   * Deletecryptowallet
   */
  apiUserV1DeleteCryptoWallet: (input: {
    /** The `crypto_wallet_id` to be deleted. */
    crypto_wallet_id: string;
  }) => Promise<ApiUserV1DeleteCryptoWalletResponse>;

  /**
   * Deletepassword
   */
  apiUserV1DeletePassword: (input: {
    /** The `password_id` to be deleted. */
    password_id: string;
  }) => Promise<ApiUserV1DeletePasswordResponse>;

  /**
   * Deleteoauthregistration
   */
  apiUserV1DeleteOAuthRegistration: (input: {
    /** The `oauth_user_registration_id` to be deleted. */
    oauth_user_registration_id: string;
  }) => Promise<ApiUserV1DeleteOAuthRegistrationResponse>;

  /**
   * Deleteexternalid
   */
  apiUserV1DeleteExternalId: (input: {
    user_id: string;
  }) => Promise<ApiUserV1DeleteExternalIdResponse>;

  /**
   * Connectedapps
   */
  apiUserV1ConnectedApps: (input: {
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiUserV1ConnectedAppsResponse>;

  /**
   * Revoke
   */
  apiUserV1Revoke: (input: {
    body: ApiUserV1RevokeRequest;
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
    /** The ID of the Connected App. */
    connected_app_id: string;
  }) => Promise<ApiUserV1RevokeResponse>;

  /**
   * Get
   */
  apiSessionV1Get: (input: {
    /** The `user_id` to get active Sessions for. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiSessionV1GetResponse>;

  /**
   * Authenticate
   */
  apiSessionV1Authenticate: (input: {
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
  }) => Promise<ApiSessionV1AuthenticateResponse>;

  /**
   * Revoke
   */
  apiSessionV1Revoke: (input: {
    /** The `session_id` to revoke. */
    session_id?: string;
    /** The session token to revoke. */
    session_token?: string;
    /** A JWT for the session to revoke. */
    session_jwt?: string;
  }) => Promise<ApiSessionV1RevokeResponse>;

  /**
   * Migrate
   */
  apiSessionV1Migrate: (input: {
    /** The authorization token Stytch will pass in to the external userinfo endpoint. */
    session_token: string;
    /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
    session_duration_minutes?: number;
    /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
    session_custom_claims?: { [key: string]: unknown };
    /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
    telemetry_id?: string;
  }) => Promise<ApiSessionV1MigrateResponse>;

  /**
   * Exchangeaccesstoken
   */
  apiSessionV1ExchangeAccessToken: (input: {
    /** The access token to exchange for a Stytch Session. Must be granted the `full_access` scope. */
    access_token: string;
    /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created. */
    session_duration_minutes?: number;
    /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key, supply a null value.    Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be ignored. Total custom claims size cannot exceed four kilobytes. */
    session_custom_claims?: { [key: string]: unknown };
    /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the User. Your workspace must be enabled for Device Fingerprinting to use this feature. */
    telemetry_id?: string;
  }) => Promise<ApiSessionV1ExchangeAccessTokenResponse>;

  /**
   * Getjwks
   */
  apiSessionV1GetJwks: (input: {
    /** The `project_id` to get the JWKS for. */
    project_id: string;
  }) => Promise<ApiSessionV1GetJwksResponse>;

  /**
   * Attest
   */
  apiSessionV1Attest: (input: {
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
  }) => Promise<ApiSessionV1AttestResponse>;

  /**
   * Get
   */
  apiB2BSessionV1Get: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }) => Promise<ApiB2BSessionV1GetResponse>;

  /**
   * Authenticate
   */
  apiB2BSessionV1Authenticate: (input: {
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
  }) => Promise<ApiB2BSessionV1AuthenticateResponse>;

  /**
   * Revoke
   */
  apiB2BSessionV1Revoke: (input: {
    /** Globally unique UUID that identifies a specific Session in the Stytch API. The `member_session_id` is critical to perform operations on an Session, so be sure to preserve this value. */
    member_session_id?: string;
    /** A secret token for a given Stytch Session. */
    session_token?: string;
    /** The JSON Web Token (JWT) for a given Stytch Session. */
    session_jwt?: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. */
    member_id?: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BSessionV1RevokeResponse>;

  /**
   * Exchange
   */
  apiB2BSessionV1Exchange: (input: {
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
  }) => Promise<ApiB2BSessionV1ExchangeResponse>;

  /**
   * Exchangeaccesstoken
   */
  apiB2BSessionV1ExchangeAccessToken: (input: {
    /** The access token to exchange for a Stytch Session. Must be granted the `full_access` scope. */
    access_token: string;
    /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
    session_duration_minutes?: number;
    /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
    session_custom_claims?: { [key: string]: unknown };
    /** If the `telemetry_id` is passed, as part of this request, Stytch will call the [Fingerprint Lookup API](https://stytch.com/docs/fraud/api/fingerprint-lookup) and store the associated fingerprints and IPGEO information for the Member. Your workspace must be enabled for Device Fingerprinting to use this feature. */
    telemetry_id?: string;
  }) => Promise<ApiB2BSessionV1ExchangeAccessTokenResponse>;

  /**
   * Attest
   */
  apiB2BSessionV1Attest: (input: {
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
  }) => Promise<ApiB2BSessionV1AttestResponse>;

  /**
   * Migrate
   */
  apiB2BSessionV1Migrate: (input: {
    /** The authorization token Stytch will pass in to the external userinfo endpoint. */
    session_token: string;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't already exist,   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the `session_jwt` will have a fixed lifetime of   five minutes regardless of the underlying session duration, and will need to be refreshed over time.    This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).    If a `session_token` or `session_jwt` is provided then a successful authentication will continue to extend the session this many minutes.    If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute duration. If you don't want   to use the Stytch session product, you can ignore the session fields in the response. */
    session_duration_minutes?: number;
    /** Add a custom claims map to the Session being authenticated. Claims are only created if a Session is initialized by providing a value in   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a key in an existing Session, supply a new value. To   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`, `exp`, `nbf`, `iat`, `jti`) will be ignored.   Total custom claims size cannot exceed four kilobytes. */
    session_custom_claims?: { [key: string]: unknown };
  }) => Promise<ApiB2BSessionV1MigrateResponse>;

  /**
   * Getjwks
   */
  apiB2BSessionV1GetJwks: (input: {
    /** The `project_id` to get the JWKS for. */
    project_id: string;
  }) => Promise<ApiB2BSessionV1GetJwksResponse>;

  /**
   * Authenticate
   */
  apiB2BImpersonationV1Authenticate: (input: {
    /** The Member Impersonation token to authenticate. Expires in 5 minutes by default. */
    impersonation_token: string;
  }) => Promise<ApiB2BImpersonationV1AuthenticateResponse>;

  /**
   * Policy
   */
  apiB2BRbacV1Policy: () => Promise<ApiB2BRbacV1PolicyResponse>;

  /**
   * Getorgpolicy
   */
  apiB2BRbacV1B2BRbacOrganizationsGetOrgPolicy: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }) => Promise<ApiB2BRbacV1B2BRbacOrganizationsGetOrgPolicyResponse>;

  /**
   * Setorgpolicy
   */
  apiB2BRbacV1B2BRbacOrganizationsSetOrgPolicy: (input: {
    /** The organization-specific RBAC Policy that contains roles defined for this organization. Organization policies supplement the project-level RBAC policy with additional roles that are specific to the organization. */
    org_policy: ApiB2BRbacV1OrgPolicy;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }) => Promise<ApiB2BRbacV1B2BRbacOrganizationsSetOrgPolicyResponse>;

  /**
   * Recover
   */
  apiB2BRecoveryCodesV1Recover: (input: {
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
  }) => Promise<ApiB2BRecoveryCodesV1RecoverResponse>;

  /**
   * Get
   */
  apiB2BRecoveryCodesV1Get: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }) => Promise<ApiB2BRecoveryCodesV1GetResponse>;

  /**
   * Rotate
   */
  apiB2BRecoveryCodesV1Rotate: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
  }) => Promise<ApiB2BRecoveryCodesV1RotateResponse>;

  /**
   * Create
   */
  apiB2BTotpV1Create: (input: {
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
  }) => Promise<ApiB2BTotpV1CreateResponse>;

  /**
   * Authenticate
   */
  apiB2BTotpV1Authenticate: (input: {
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
  }) => Promise<ApiB2BTotpV1AuthenticateResponse>;

  /**
   * Migrate
   */
  apiB2BTotpV1Migrate: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id: string;
    /** The TOTP secret key shared between the authenticator app and the server used to generate TOTP codes. */
    secret: string;
    /** An existing set of recovery codes to be imported into Stytch to be used to authenticate in place of the secondary MFA method. */
    recovery_codes: (string)[];
  }) => Promise<ApiB2BTotpV1MigrateResponse>;

  /**
   * Policy
   */
  apiConsumerRbacV1Policy: () => Promise<ApiConsumerRbacV1PolicyResponse>;

  /**
   * Authenticatestart
   */
  apiCryptoWalletV1AuthenticateStart: (input: {
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
  }) => Promise<ApiCryptoWalletV1AuthenticateStartResponse>;

  /**
   * Authenticate
   */
  apiCryptoWalletV1Authenticate: (input: {
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
  }) => Promise<ApiCryptoWalletV1AuthenticateResponse>;

  /**
   * Whoami
   */
  apiDebugV1Whoami: () => Promise<ApiDebugV1WhoamiResponse>;

  /**
   * Exchange
   */
  apiDiscoveryV1DiscoveryIntermediateSessionsExchange: (input: {
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
  }) => Promise<ApiDiscoveryV1DiscoveryIntermediateSessionsExchangeResponse>;

  /**
   * Create
   */
  apiDiscoveryV1DiscoveryOrganizationsCreate: (input: {
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
  }) => Promise<ApiDiscoveryV1DiscoveryOrganizationsCreateResponse>;

  /**
   * List
   */
  apiDiscoveryV1DiscoveryOrganizationsList: (input: {
    /** The Intermediate Session Token. This token does not necessarily belong to a specific instance of a Member, but represents a bag of factors that may be converted to a member session. The token can be used with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms), [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an MFA flow and log in to the Organization. The token has a default expiry of 10 minutes. It can also be used with the [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session) to join a specific Organization that allows the factors represented by the intermediate session token; or the [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member. Intermediate Session Tokens have a default expiry of 10 minutes. */
    intermediate_session_token?: string;
    /** A secret token for a given Stytch Session. */
    session_token?: string;
    /** The JSON Web Token (JWT) for a given Stytch Session. */
    session_jwt?: string;
  }) => Promise<ApiDiscoveryV1DiscoveryListResponse>;

  /**
   * Lookup
   */
  apiFraudV1FraudFingerprintLookup: (input: {
    /** The telemetry ID associated with the fingerprint getting looked up. */
    telemetry_id: string;
    /** External identifiers that you wish to associate with the given telemetry ID. You will be able to search for fingerprint results by these identifiers in the DFP analytics dashboard. External metadata fields may not exceed 65 characters. They may only contain alphanumerics and the characters `_` `-` `+` `.` or `@`. */
    external_metadata?: ApiFraudV1Metadata;
  }) => Promise<ApiFraudV1FraudFingerprintLookupResponse>;

  /**
   * Set
   */
  apiFraudV1FraudRulesSet: (input: {
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
  }) => Promise<ApiFraudV1FraudRulesSetResponse>;

  /**
   * List
   */
  apiFraudV1FraudRulesList: (input: {
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 100 results. If your query returns more than 100 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor`, repeat the request with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make requests until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of results to return per page. The default limit is 10. A maximum of 100 results can be returned by a single get request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
  }) => Promise<ApiFraudV1FraudRulesListResponse>;

  /**
   * Override
   */
  apiFraudV1FraudVerdictReasonsOverride: (input: {
    /** The verdict reason that you wish to override. For a list of possible reasons to override, see [Warning Flags (Verdict Reasons)](https://stytch.com/docs/docs/fraud/guides/device-fingerprinting/reference/warning-flags-verdict-reasons). You may not override the `RULE_MATCH` reason. */
    verdict_reason: string;
    /** The action that you want to be returned for the specified verdict reason. The override action must be one of `ALLOW`, `BLOCK`, or `CHALLENGE`. */
    override_action: ApiFraudV1OverrideRequestAction;
    /** An optional description for the verdict reason override. */
    override_description?: string;
  }) => Promise<ApiFraudV1FraudVerdictReasonsOverrideResponse>;

  /**
   * List
   */
  apiFraudV1FraudVerdictReasonsList: (input: {
    /** Whether to return only verdict reasons that have overrides set. Defaults to false. */
    overrides_only?: boolean;
  }) => Promise<ApiFraudV1FraudVerdictReasonsListResponse>;

  /**
   * Risk
   */
  apiFraudV1FraudEmailRisk: (input: {
    /** The email address to check. */
    email_address: string;
  }) => Promise<ApiFraudV1FraudEmailRiskResponse>;

  /**
   * Authorizestart
   */
  apiIdpV1IdpOauthAuthorizeStart: (input: {
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
  }) => Promise<ApiIdpV1IdpOauthAuthorizeStartResponse>;

  /**
   * Authorize
   */
  apiIdpV1IdpOauthAuthorize: (input: {
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
  }) => Promise<ApiIdpV1IdpOauthAuthorizeResponse>;

  /**
   * Authenticate
   */
  apiImpersonationV1Authenticate: (input: {
    /** The User Impersonation token to authenticate. Expires in 5 minutes by default. */
    impersonation_token: string;
  }) => Promise<ApiImpersonationV1AuthenticateResponse>;

  /**
   * Get
   */
  apiM2MV1M2MClientsGet: (input: {
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiM2MV1M2MClientsGetResponse>;

  /**
   * Update
   */
  apiM2MV1M2MClientsUpdate: (input: {
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
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiM2MV1M2MClientsUpdateResponse>;

  /**
   * Delete
   */
  apiM2MV1M2MClientsDelete: (input: {
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiM2MV1M2MClientsDeleteResponse>;

  /**
   * Search
   */
  apiM2MV1M2MClientsSearch: (input: {
    /** The `cursor` field allows you to paginate through your results. Each result array is limited to 1000 results. If your query returns more than 1000 results, you will need to paginate the responses using the `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata` object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the next page of results. Continue to make search calls until the `next_cursor` in the response is null. */
    cursor?: string;
    /** The number of search results to return per page. The default limit is 100. A maximum of 1000 results can be returned by a single search request. If the total size of your result set is greater than one page size, you must paginate the response. See the `cursor` field. */
    limit?: number;
    /** The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter your results. Only an operator is required. If you include no operands, no filtering will be applied. If you include no query object, it will return all results with no filtering applied. */
    query?: ApiM2MV1M2MSearchQuery;
  }) => Promise<ApiM2MV1M2MClientsSearchResponse>;

  /**
   * Create
   */
  apiM2MV1M2MClientsCreate: (input: {
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
  }) => Promise<ApiM2MV1M2MClientsCreateResponse>;

  /**
   * Rotatestart
   */
  apiM2MV1M2MClientsSecretsRotateStart: (input: {
    body: ApiM2MV1M2MClientsSecretsRotateStartRequest;
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiM2MV1M2MClientsSecretsRotateStartResponse>;

  /**
   * Rotatecancel
   */
  apiM2MV1M2MClientsSecretsRotateCancel: (input: {
    body: ApiM2MV1M2MClientsSecretsRotateCancelRequest;
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiM2MV1M2MClientsSecretsRotateCancelResponse>;

  /**
   * Rotate
   */
  apiM2MV1M2MClientsSecretsRotate: (input: {
    body: ApiM2MV1M2MClientsSecretsRotateRequest;
    /** The ID of the client. */
    client_id: string;
  }) => Promise<ApiM2MV1M2MClientsSecretsRotateResponse>;

  /**
   * Authenticate
   */
  apiMagicV1Authenticate: (input: {
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
  }) => Promise<ApiMagicV1AuthenticateResponse>;

  /**
   * Create
   */
  apiMagicV1Create: (input: {
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id: string;
    /** Set the expiration for the Magic Link `token` in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins). */
    expiration_minutes?: number;
    /** Provided attributes to help with fraud detection. These values are pulled and passed into Stytch endpoints by your application. */
    attributes?: ApiAttributeV1Attributes;
  }) => Promise<ApiMagicV1CreateResponse>;

  /**
   * Send
   */
  apiMagicV1MagicLinksEmailSend: (input: {
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
  }) => Promise<ApiMagicV1MagicLinksEmailSendResponse>;

  /**
   * Loginorcreate
   */
  apiMagicV1MagicLinksEmailLoginOrCreate: (input: {
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
  }) => Promise<ApiMagicV1MagicLinksEmailLoginOrCreateResponse>;

  /**
   * Invite
   */
  apiMagicV1MagicLinksEmailInvite: (input: {
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
  }) => Promise<ApiMagicV1MagicLinksEmailInviteResponse>;

  /**
   * Revokeinvite
   */
  apiMagicV1MagicLinksEmailRevokeInvite: (input: {
    /** The email of the user. */
    email: string;
  }) => Promise<ApiMagicV1MagicLinksEmailRevokeInviteResponse>;

  /**
   * Authenticate
   */
  apiB2BMagicV1Authenticate: (input: {
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
  }) => Promise<ApiB2BMagicV1AuthenticateResponse>;

  /**
   * Loginorsignup
   */
  apiB2BMagicV1B2BMagicLinksEmailLoginOrSignup: (input: {
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
  }) => Promise<ApiB2BMagicV1B2BMagicLinksEmailLoginOrSignupResponse>;

  /**
   * Invite
   */
  apiB2BMagicV1B2BMagicLinksEmailInvite: (input: {
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
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BMagicV1B2BMagicLinksEmailInviteResponse>;

  /**
   * Send
   */
  apiB2BMagicV1B2BMagicLinksEmailDiscoverySend: (input: {
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
  }) => Promise<ApiB2BMagicV1B2BMagicLinksEmailDiscoverySendResponse>;

  /**
   * Authenticate
   */
  apiB2BMagicV1B2BMagicLinksDiscoveryAuthenticate: (input: {
    /** The Discovery Email Magic Link token to authenticate. */
    discovery_magic_links_token: string;
    /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
    pkce_code_verifier?: string;
  }) => Promise<ApiB2BMagicV1B2BMagicLinksDiscoveryAuthenticateResponse>;

  /**
   * Authenticate
   */
  apiB2BOauthV1Authenticate: (input: {
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
  }) => Promise<ApiB2BOauthV1AuthenticateResponse>;

  /**
   * Authenticate
   */
  apiB2BOauthV1B2BOauthDiscoveryAuthenticate: (input: {
    /** The Discovery OAuth token to authenticate. */
    discovery_oauth_token: string;
    session_token?: string;
    session_duration_minutes?: number;
    session_jwt?: string;
    session_custom_claims?: { [key: string]: unknown };
    /** A base64url encoded one time secret used to validate that the request starts and ends on the same device. */
    pkce_code_verifier?: string;
  }) => Promise<ApiB2BOauthV1B2BOauthDiscoveryAuthenticateResponse>;

  /**
   * Send
   */
  apiB2BOtpV1B2BOtpSmsSend: (input: {
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
  }) => Promise<ApiB2BOtpV1B2BOtpSmsSendResponse>;

  /**
   * Authenticate
   */
  apiB2BOtpV1B2BOtpSmsAuthenticate: (input: {
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
  }) => Promise<ApiB2BOtpV1B2BOtpSmsAuthenticateResponse>;

  /**
   * Loginorsignup
   */
  apiB2BOtpV1B2BOtpEmailLoginOrSignup: (input: {
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
  }) => Promise<ApiB2BOtpV1B2BOtpEmailLoginOrSignupResponse>;

  /**
   * Authenticate
   */
  apiB2BOtpV1B2BOtpEmailAuthenticate: (input: {
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
  }) => Promise<ApiB2BOtpV1B2BOtpEmailAuthenticateResponse>;

  /**
   * Send
   */
  apiB2BOtpV1B2BOtpEmailDiscoverySend: (input: {
    /** The email address to start the discovery flow for. */
    email_address: string;
    /** Use a custom template for login emails. By default, it will use your default email template. Templates can be added in the [Stytch dashboard](https://stytch.com/dashboard/templates) using our built-in customization options or custom HTML templates with type “OTP - Login”. */
    login_template_id?: string;
    /** Used to determine which language to use when sending the user this delivery method. Parameter is an [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.  Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.  Request support for additional languages [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!  */
    locale?: ApiB2BOtpV1SendRequestLocale;
    /** The expiration time, in minutes, for a discovery OTP email. If not accepted within this time frame, the OTP will need to be resent. Defaults to 10 with a minimum of 2 and a maximum of 15. */
    discovery_expiration_minutes?: number;
  }) => Promise<ApiB2BOtpV1B2BOtpEmailDiscoverySendResponse>;

  /**
   * Authenticate
   */
  apiB2BOtpV1B2BOtpEmailDiscoveryAuthenticate: (input: {
    /** The email address of the Member. */
    email_address: string;
    /** The code to authenticate. */
    code: string;
  }) => Promise<ApiB2BOtpV1B2BOtpEmailDiscoveryAuthenticateResponse>;

  /**
   * Create
   */
  apiPasswordV1Create: (input: {
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
  }) => Promise<ApiPasswordV1CreateResponse>;

  /**
   * Authenticate
   */
  apiPasswordV1Authenticate: (input: {
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
  }) => Promise<ApiPasswordV1AuthenticateResponse>;

  /**
   * Strengthcheck
   */
  apiPasswordV1StrengthCheck: (input: {
    /** The password for the user. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
    password: string;
    /** The email address of the end user. */
    email?: string;
  }) => Promise<ApiPasswordV1StrengthCheckResponse>;

  /**
   * Migrate
   */
  apiPasswordV1Migrate: (input: {
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
  }) => Promise<ApiPasswordV1MigrateResponse>;

  /**
   * Resetstart
   */
  apiPasswordV1PasswordsEmailResetStart: (input: {
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
  }) => Promise<ApiPasswordV1PasswordsEmailResetStartResponse>;

  /**
   * Reset
   */
  apiPasswordV1PasswordsEmailReset: (input: {
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
  }) => Promise<ApiPasswordV1PasswordsEmailResetResponse>;

  /**
   * Reset
   */
  apiPasswordV1PasswordsExistingPasswordReset: (input: {
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
  }) => Promise<ApiPasswordV1PasswordsExistingPasswordResetResponse>;

  /**
   * Reset
   */
  apiPasswordV1PasswordsSessionReset: (input: {
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
  }) => Promise<ApiPasswordV1PasswordsSessionResetResponse>;

  /**
   * Strengthcheck
   */
  apiB2BPasswordV1StrengthCheck: (input: {
    /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
    password: string;
    /** The email address of the Member. */
    email_address?: string;
  }) => Promise<ApiB2BPasswordV1StrengthCheckResponse>;

  /**
   * Migrate
   */
  apiB2BPasswordV1Migrate: (input: {
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
  }) => Promise<ApiB2BPasswordV1MigrateResponse>;

  /**
   * Authenticate
   */
  apiB2BPasswordV1Authenticate: (input: {
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
  }) => Promise<ApiB2BPasswordV1AuthenticateResponse>;

  /**
   * Resetstart
   */
  apiB2BPasswordV1B2BPasswordsEmailResetStart: (input: {
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
  }) => Promise<ApiB2BPasswordV1B2BPasswordsEmailResetStartResponse>;

  /**
   * Reset
   */
  apiB2BPasswordV1B2BPasswordsEmailReset: (input: {
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
  }) => Promise<ApiB2BPasswordV1B2BPasswordsEmailResetResponse>;

  /**
   * Requirereset
   */
  apiB2BPasswordV1B2BPasswordsEmailRequireReset: (input: {
    /** The email address of the Member to start the email reset process for. */
    email_address: string;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id?: string;
    /** Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member. */
    member_id?: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiB2BPasswordV1B2BPasswordsEmailRequireResetResponse>;

  /**
   * Reset
   */
  apiB2BPasswordV1B2BPasswordsSessionReset: (input: {
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
  }) => Promise<ApiB2BPasswordV1B2BPasswordsSessionResetResponse>;

  /**
   * Reset
   */
  apiB2BPasswordV1B2BPasswordsExistingPasswordReset: (input: {
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
  }) => Promise<ApiB2BPasswordV1B2BPasswordsExistingPasswordResetResponse>;

  /**
   * Authenticate
   */
  apiB2BPasswordV1B2BPasswordsDiscoveryAuthenticate: (input: {
    /** The email address of the Member. */
    email_address: string;
    /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
    password: string;
  }) => Promise<ApiB2BPasswordV1B2BPasswordsDiscoveryAuthenticateResponse>;

  /**
   * Resetstart
   */
  apiB2BPasswordV1B2BPasswordsDiscoveryEmailResetStart: (input: {
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
  }) => Promise<ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetStartResponse>;

  /**
   * Reset
   */
  apiB2BPasswordV1B2BPasswordsDiscoveryEmailReset: (input: {
    /** The password reset token to authenticate. */
    password_reset_token: string;
    /** The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g. spaces, emojis, non-English characters, etc. */
    password: string;
    pkce_code_verifier?: string;
  }) => Promise<ApiB2BPasswordV1B2BPasswordsDiscoveryEmailResetResponse>;

  /**
   * Attach
   */
  apiOauthV1Attach: (input: {
    /** The OAuth provider's name. */
    provider: string;
    /** The unique ID of a specific User. You may use an `external_id` here if one is set for the user. */
    user_id?: string;
    /** The `session_token` associated with a User's existing Session. */
    session_token?: string;
    /** The `session_jwt` associated with a User's existing Session. */
    session_jwt?: string;
  }) => Promise<ApiOauthV1AttachResponse>;

  /**
   * Authenticate
   */
  apiOauthV1Authenticate: (input: {
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
  }) => Promise<ApiOauthV1AuthenticateResponse>;

  /**
   * Authenticate
   */
  apiOtpV1Authenticate: (input: {
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
  }) => Promise<ApiOtpV1AuthenticateResponse>;

  /**
   * Send
   */
  apiOtpV1OtpSmsSend: (input: {
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
  }) => Promise<ApiOtpV1OtpSmsSendResponse>;

  /**
   * Loginorcreate
   */
  apiOtpV1OtpSmsLoginOrCreate: (input: {
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
  }) => Promise<ApiOtpV1OtpSmsLoginOrCreateResponse>;

  /**
   * Send
   */
  apiOtpV1OtpWhatsappSend: (input: {
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
  }) => Promise<ApiOtpV1OtpWhatsappSendResponse>;

  /**
   * Loginorcreate
   */
  apiOtpV1OtpWhatsappLoginOrCreate: (input: {
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
  }) => Promise<ApiOtpV1OtpWhatsappLoginOrCreateResponse>;

  /**
   * Send
   */
  apiOtpV1OtpEmailSend: (input: {
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
  }) => Promise<ApiOtpV1OtpEmailSendResponse>;

  /**
   * Loginorcreate
   */
  apiOtpV1OtpEmailLoginOrCreate: (input: {
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
  }) => Promise<ApiOtpV1OtpEmailLoginOrCreateResponse>;

  /**
   * Metrics
   */
  apiProjectV1Metrics: () => Promise<ApiProjectV1MetricsResponse>;

  /**
   * Getconnections
   */
  apiSsoV1GetConnections: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1GetConnectionsResponse>;

  /**
   * Deleteconnection
   */
  apiSsoV1DeleteConnection: (input: {
    /** The organization ID that the SSO connection belongs to. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SSO connection. SAML, OIDC, and External connection IDs can be provided. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1DeleteConnectionResponse>;

  /**
   * Authenticate
   */
  apiSsoV1Authenticate: (input: {
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
  }) => Promise<ApiSsoV1AuthenticateResponse>;

  /**
   * Createconnection
   */
  apiSsoV1SsoOidcCreateConnection: (input: {
    /** A human-readable display name for the connection. */
    display_name?: string;
    /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
    identity_provider?: ApiSsoV1CreateConnectionRequestIdentityProvider;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoOidcCreateConnectionResponse>;

  /**
   * Updateconnection
   */
  apiSsoV1SsoOidcUpdateConnection: (input: {
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
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoOidcUpdateConnectionResponse>;

  /**
   * Createconnection
   */
  apiSsoV1SsoSamlCreateConnection: (input: {
    /** A human-readable display name for the connection. */
    display_name?: string;
    /** Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`, `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`, `rippling`, `salesforce`, `shibboleth`, or `generic`.  Specifying a known provider allows Stytch to handle any provider-specific logic. */
    identity_provider?: ApiSsoV1CreateConnectionRequestIdentityProvider;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoSamlCreateConnectionResponse>;

  /**
   * Updateconnection
   */
  apiSsoV1SsoSamlUpdateConnection: (input: {
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
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoSamlUpdateConnectionResponse>;

  /**
   * Updatebyurl
   */
  apiSsoV1SsoSamlUpdateByUrl: (input: {
    /** A URL that points to the IdP metadata. This will be provided by the IdP. */
    metadata_url: string;
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoSamlUpdateByUrlResponse>;

  /**
   * Deleteverificationcertificate
   */
  apiSsoV1SsoSamlDeleteVerificationCertificate: (input: {
    /** The organization ID that the SAML connection belongs to. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** The ID of the SAML connection. */
    connection_id: string;
    /** The ID of the certificate to be deleted. */
    certificate_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoSamlDeleteVerificationCertificateResponse>;

  /**
   * Deleteencryptionprivatekey
   */
  apiSsoV1SsoSamlDeleteEncryptionPrivateKey: (input: {
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific SSO `connection_id` for a Member. */
    connection_id: string;
    /** The ID of the encryption private key to be deleted. */
    private_key_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoSamlDeleteEncryptionPrivateKeyResponse>;

  /**
   * Createconnection
   */
  apiSsoV1SsoExternalCreateConnection: (input: {
    /** Globally unique UUID that identifies a different Organization within your Project. */
    external_organization_id: string;
    /** Globally unique UUID that identifies a specific SSO connection configured for a different Organization in your Project. */
    external_connection_id: string;
    /** A human-readable display name for the connection. */
    display_name?: string;
    connection_implicit_role_assignments?: (ApiSsoV1SamlConnectionImplicitRoleAssignment)[];
    group_implicit_role_assignments?: (ApiSsoV1SamlGroupImplicitRoleAssignment)[];
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoExternalCreateConnectionResponse>;

  /**
   * Updateconnection
   */
  apiSsoV1SsoExternalUpdateConnection: (input: {
    /** A human-readable display name for the connection. */
    display_name?: string;
    /** All Members who log in with this External connection will implicitly receive the specified Roles. See the [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. Implicit role assignments are not supported for External connections if the underlying SSO connection is an OIDC connection.  */
    external_connection_implicit_role_assignments?: (ApiSsoV1ConnectionImplicitRoleAssignment)[];
    /** Defines the names of the groups  that grant specific role assignments. For each group-Role pair, if a Member logs in with this external connection and  belongs to the specified group, they will be granted the associated Role. See the  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role assignment. Before adding any group implicit role assignments to an external connection, you must add a "groups" key to the underlying SAML connection's          `attribute_mapping`. Make sure that the SAML connection IdP is configured to correctly send the group information. Implicit role assignments are not supported          for External connections if the underlying SSO connection is an OIDC connection. */
    external_group_implicit_role_assignments?: (ApiSsoV1GroupImplicitRoleAssignment)[];
    /** Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience. */
    organization_id: string;
    /** Globally unique UUID that identifies a specific External SSO Connection. */
    connection_id: string;
  }, options?: { headers?: { "X-Stytch-Member-Session"?: string; "X-Stytch-Member-SessionJWT"?: string } }) => Promise<ApiSsoV1SsoExternalUpdateConnectionResponse>;

  /**
   * Create
   */
  apiTotpV1Create: (input: {
    /** The `user_id` of an active user the TOTP registration should be tied to. You may use an `external_id` here if one is set for the user. */
    user_id: string;
    /** The expiration for the TOTP instance. If the newly created TOTP is not authenticated within this time frame the TOTP will be unusable. Defaults to 1440 (1 day) with a minimum of 5 and a maximum of 1440. */
    expiration_minutes?: number;
  }) => Promise<ApiTotpV1CreateResponse>;

  /**
   * Authenticate
   */
  apiTotpV1Authenticate: (input: {
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
  }) => Promise<ApiTotpV1AuthenticateResponse>;

  /**
   * Recoverycodes
   */
  apiTotpV1RecoveryCodes: (input: {
    /** The `user_id` of an active user the TOTP registration should be tied to. You may use an `external_id` here if one is set for the user. */
    user_id: string;
  }) => Promise<ApiTotpV1RecoveryCodesResponse>;

  /**
   * Recover
   */
  apiTotpV1Recover: (input: {
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
  }) => Promise<ApiTotpV1RecoverResponse>;

  /**
   * Registerstart
   */
  apiWebauthnV1RegisterStart: (input: {
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
  }) => Promise<ApiWebauthnV1RegisterStartResponse>;

  /**
   * Register
   */
  apiWebauthnV1Register: (input: {
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
  }) => Promise<ApiWebauthnV1RegisterResponse>;

  /**
   * Authenticatestart
   */
  apiWebauthnV1AuthenticateStart: (input: {
    /** The domain for Passkeys or WebAuthn. Defaults to `window.location.hostname`. */
    domain: string;
    /** The `user_id` of an active user the Passkey or WebAuthn registration should be tied to. You may use an `external_id` here if one is set for the user. */
    user_id?: string;
    /** If true, the `public_key_credential_creation_options` returned will be optimized for Passkeys with `userVerification` set to `"preferred"`.        */
    return_passkey_credential_options?: boolean;
    /** If true, values in the `public_key_credential_creation_options` will be base64 URL encoded. Set this option to true when using built-in browser methods like `navigator.credentials.create` and `navigator.credentials.get`. */
    use_base64_url_encoding?: boolean;
  }) => Promise<ApiWebauthnV1AuthenticateStartResponse>;

  /**
   * Authenticate
   */
  apiWebauthnV1Authenticate: (input: {
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
  }) => Promise<ApiWebauthnV1AuthenticateResponse>;

  /**
   * Update
   */
  apiWebauthnV1Update: (input: {
    /** The `name` of the WebAuthn registration or Passkey. */
    name: string;
    /** Globally unique UUID that identifies a Passkey or WebAuthn registration in the Stytch API. The `webauthn_registration_id` is used when you need to operate on a specific User's WebAuthn registration. */
    webauthn_registration_id: string;
  }) => Promise<ApiWebauthnV1UpdateResponse>;

  /**
   * Listcredentials
   */
  apiWebauthnV1ListCredentials: (input: {
    /** The `user_id` of an active user the Passkey or WebAuthn registration should be tied to. */
    user_id: string;
    /** The domain for Passkeys or WebAuthn. Defaults to `window.location.hostname`. */
    domain: string;
  }) => Promise<ApiWebauthnV1ListCredentialsResponse>;
};

export * from "./schemas.js";
