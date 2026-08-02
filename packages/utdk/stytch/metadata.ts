import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "api_connectedapps_v1_connected_apps_clients_Get": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/connected_apps/clients/{client_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get",
    "parameterDescriptions": {
      "client_id": "The ID of the Connected App client."
    }
  },
  "api_connectedapps_v1_connected_apps_clients_Update": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_name",
      "client_description",
      "redirect_urls",
      "full_access_allowed",
      "access_token_expiry_minutes",
      "access_token_custom_audience",
      "access_token_template_content",
      "post_logout_redirect_urls",
      "logo_url",
      "bypass_consent_for_offline_access"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/connected_apps/clients/{client_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_connectedapps_v1_connected_apps_clients_Delete": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/connected_apps/clients/{client_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_connectedapps_v1_connected_apps_clients_Search": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cursor",
      "limit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/connected_apps/clients/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search"
  },
  "api_connectedapps_v1_connected_apps_clients_Create": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_type",
      "client_name",
      "client_description",
      "redirect_urls",
      "full_access_allowed",
      "access_token_expiry_minutes",
      "access_token_custom_audience",
      "access_token_template_content",
      "post_logout_redirect_urls",
      "logo_url",
      "bypass_consent_for_offline_access"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/connected_apps/clients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_connectedapps_v1_connected_apps_clients_secrets_RotateStart": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsSecretsRotateStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/connected_apps/clients/{client_id}/secrets/rotate/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatestart",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_connectedapps_v1_connected_apps_clients_secrets_RotateCancel": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsSecretsRotateCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/connected_apps/clients/{client_id}/secrets/rotate/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatecancel",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_connectedapps_v1_connected_apps_clients_secrets_Rotate": {
    "accessPath": [
      "apiConnectedappsV1ConnectedAppsClientsSecretsRotate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/connected_apps/clients/{client_id}/secrets/rotate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotate",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_Update": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "identity_provider",
      "scim_group_implicit_role_assignments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SCIM connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_Delete": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SCIM connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_GetGroups": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionGetGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "GET",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "limit"
    ],
    "description": "Getgroups",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SCIM connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_RotateStart": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionRotateStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection/{connection_id}/rotate/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatestart",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SCIM connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_RotateComplete": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionRotateComplete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection/{connection_id}/rotate/complete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatecomplete",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SCIM connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_RotateCancel": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionRotateCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection/{connection_id}/rotate/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatecancel",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SCIM connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_Create": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "identity_provider"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_scim_v1_b2b_scim_connection_Get": {
    "accessPath": [
      "apiB2BScimV1B2BScimConnectionGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "GET",
    "routeTemplate": "/v1/b2b/scim/{organization_id}/connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_Create": {
    "accessPath": [
      "apiOrganizationV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_name",
      "organization_slug",
      "organization_logo_url",
      "trusted_metadata",
      "organization_external_id",
      "sso_jit_provisioning",
      "email_allowed_domains",
      "email_jit_provisioning",
      "email_invites",
      "auth_methods",
      "allowed_auth_methods",
      "mfa_policy",
      "rbac_email_implicit_role_assignments",
      "mfa_methods",
      "allowed_mfa_methods",
      "oauth_tenant_jit_provisioning",
      "allowed_oauth_tenants",
      "claimed_email_domains",
      "first_party_connected_apps_allowed_type",
      "allowed_first_party_connected_apps",
      "third_party_connected_apps_allowed_type",
      "allowed_third_party_connected_apps"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_organization_v1_Get": {
    "accessPath": [
      "apiOrganizationV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience."
    }
  },
  "api_organization_v1_Update": {
    "accessPath": [
      "apiOrganizationV1Update"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_name",
      "organization_slug",
      "organization_logo_url",
      "trusted_metadata",
      "organization_external_id",
      "sso_default_connection_id",
      "sso_jit_provisioning",
      "sso_jit_provisioning_allowed_connections",
      "email_allowed_domains",
      "email_jit_provisioning",
      "email_invites",
      "auth_methods",
      "allowed_auth_methods",
      "mfa_policy",
      "rbac_email_implicit_role_assignments",
      "mfa_methods",
      "allowed_mfa_methods",
      "oauth_tenant_jit_provisioning",
      "allowed_oauth_tenants",
      "claimed_email_domains",
      "first_party_connected_apps_allowed_type",
      "allowed_first_party_connected_apps",
      "third_party_connected_apps_allowed_type",
      "allowed_third_party_connected_apps"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_Delete": {
    "accessPath": [
      "apiOrganizationV1Delete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_Search": {
    "accessPath": [
      "apiOrganizationV1Search"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cursor",
      "limit",
      "query"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search"
  },
  "api_organization_v1_Metrics": {
    "accessPath": [
      "apiOrganizationV1Metrics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Metrics"
  },
  "api_organization_v1_ConnectedApps": {
    "accessPath": [
      "apiOrganizationV1ConnectedApps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/connected_apps",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Connectedapps",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_GetConnectedApp": {
    "accessPath": [
      "apiOrganizationV1GetConnectedApp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/connected_apps/{connected_app_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connected_app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getconnectedapp",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connected_app_id": "The ID of the Connected App.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_DeleteExternalId": {
    "accessPath": [
      "apiOrganizationV1DeleteExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/external_id",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteexternalid",
    "parameterDescriptions": {
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_Update": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "trusted_metadata",
      "untrusted_metadata",
      "is_breakglass",
      "mfa_phone_number",
      "mfa_enrolled",
      "roles",
      "preserve_existing_sessions",
      "default_mfa_method",
      "email_address",
      "external_id",
      "unlink_email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_Delete": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_Reactivate": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersReactivate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/reactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reactivate",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_DeleteMFAPhoneNumber": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersDeleteMfaPhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/mfa_phone_numbers/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletemfaphonenumber",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_DeleteTOTP": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersDeleteTotp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/totp",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletetotp",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_Search": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_ids",
      "cursor",
      "limit",
      "query"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations/members/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search",
    "parameterDescriptions": {
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_DeletePassword": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersDeletePassword"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/passwords/{member_password_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_password_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletepassword",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_password_id": "Globally unique UUID that identifies a Member's password.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_DangerouslyGet": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersDangerouslyGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/members/dangerously_get/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_deleted"
    ],
    "description": "Dangerouslyget",
    "parameterDescriptions": {
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value."
    }
  },
  "api_organization_v1_organizations_members_OIDCProviders": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersOidcProviders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/oidc_providers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_refresh_token"
    ],
    "description": "Oidcproviders",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_organization_v1_organizations_members_UnlinkRetiredEmail": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersUnlinkRetiredEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_id",
      "email_address"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/unlink_retired_email",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unlinkretiredemail",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_StartEmailUpdate": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersStartEmailUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "login_redirect_url",
      "locale",
      "login_template_id",
      "delivery_method"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/start_email_update",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Startemailupdate",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_GetConnectedApps": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersGetConnectedApps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/connected_apps",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getconnectedapps",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_DeleteExternalId": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersDeleteExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/external_id",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteexternalid",
    "parameterDescriptions": {
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_Create": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "name",
      "trusted_metadata",
      "untrusted_metadata",
      "create_member_as_pending",
      "is_breakglass",
      "mfa_phone_number",
      "mfa_enrolled",
      "roles",
      "external_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_organization_v1_organizations_members_Get": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/member",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "member_id",
      "email_address"
    ],
    "description": "Get",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience."
    }
  },
  "api_organization_v1_organizations_members_oauth_providers_Google": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersOauthProvidersGoogle"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/oauth_providers/google",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_refresh_token"
    ],
    "description": "Google",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_organization_v1_organizations_members_oauth_providers_Microsoft": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersOauthProvidersMicrosoft"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/oauth_providers/microsoft",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_refresh_token"
    ],
    "description": "Microsoft",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_organization_v1_organizations_members_oauth_providers_Slack": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersOauthProvidersSlack"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/oauth_providers/slack",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Slack",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_organization_v1_organizations_members_oauth_providers_Hubspot": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersOauthProvidersHubspot"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/oauth_providers/hubspot",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_refresh_token"
    ],
    "description": "Hubspot",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_organization_v1_organizations_members_oauth_providers_Github": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersOauthProvidersGithub"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/oauth_providers/github",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_refresh_token"
    ],
    "description": "Github",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_organization_v1_organizations_members_connected_apps_Revoke": {
    "accessPath": [
      "apiOrganizationV1OrganizationsMembersConnectedAppsRevoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/organizations/{organization_id}/members/{member_id}/connected_apps/{connected_app_id}/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id",
      "connected_app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member.",
      "connected_app_id": "The ID of the Connected App.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_idp_v1_b2b_idp_oauth_AuthorizeStart": {
    "accessPath": [
      "apiB2BIdpV1B2BIdpOauthAuthorizeStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "redirect_uri",
      "response_type",
      "scopes",
      "organization_id",
      "member_id",
      "session_token",
      "session_jwt",
      "prompt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/idp/oauth/authorize/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authorizestart"
  },
  "api_b2b_idp_v1_b2b_idp_oauth_Authorize": {
    "accessPath": [
      "apiB2BIdpV1B2BIdpOauthAuthorize"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "consent_granted",
      "scopes",
      "client_id",
      "redirect_uri",
      "response_type",
      "organization_id",
      "member_id",
      "session_token",
      "session_jwt",
      "prompt",
      "state",
      "nonce",
      "code_challenge",
      "resources"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/idp/oauth/authorize",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authorize"
  },
  "api_user_v1_Create": {
    "accessPath": [
      "apiUserV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "name",
      "attributes",
      "phone_number",
      "create_user_as_pending",
      "trusted_metadata",
      "untrusted_metadata",
      "external_id",
      "roles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_user_v1_Get": {
    "accessPath": [
      "apiUserV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get",
    "parameterDescriptions": {
      "user_id": "The unique ID of a specific User. You may use an `external_id` here if one is set for the user."
    }
  },
  "api_user_v1_Update": {
    "accessPath": [
      "apiUserV1Update"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "attributes",
      "trusted_metadata",
      "untrusted_metadata",
      "external_id",
      "roles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "user_id": "The unique ID of a specific User. You may use an `external_id` here if one is set for the user."
    }
  },
  "api_user_v1_Delete": {
    "accessPath": [
      "apiUserV1Delete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete",
    "parameterDescriptions": {
      "user_id": "The unique ID of a specific User. You may use an `external_id` here if one is set for the user."
    }
  },
  "api_user_v1_Search": {
    "accessPath": [
      "apiUserV1Search"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cursor",
      "limit",
      "query"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/users/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search"
  },
  "api_user_v1_ExchangePrimaryFactor": {
    "accessPath": [
      "apiUserV1ExchangePrimaryFactor"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "phone_number"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/users/{user_id}/exchange_primary_factor",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchangeprimaryfactor",
    "parameterDescriptions": {
      "user_id": "The unique ID of a specific User. You may use an `external_id` here if one is set for the user."
    }
  },
  "api_user_v1_DeleteEmail": {
    "accessPath": [
      "apiUserV1DeleteEmail"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/emails/{email_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "email_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteemail",
    "parameterDescriptions": {
      "email_id": "The `email_id` to be deleted."
    }
  },
  "api_user_v1_DeletePhoneNumber": {
    "accessPath": [
      "apiUserV1DeletePhoneNumber"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/phone_numbers/{phone_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletephonenumber",
    "parameterDescriptions": {
      "phone_id": "The `phone_id` to be deleted."
    }
  },
  "api_user_v1_DeleteWebAuthnRegistration": {
    "accessPath": [
      "apiUserV1DeleteWebAuthnRegistration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/webauthn_registrations/{webauthn_registration_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webauthn_registration_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletewebauthnregistration",
    "parameterDescriptions": {
      "webauthn_registration_id": "The `webauthn_registration_id` to be deleted."
    }
  },
  "api_user_v1_DeleteBiometricRegistration": {
    "accessPath": [
      "apiUserV1DeleteBiometricRegistration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/biometric_registrations/{biometric_registration_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "biometric_registration_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletebiometricregistration",
    "parameterDescriptions": {
      "biometric_registration_id": "The `biometric_registration_id` to be deleted."
    }
  },
  "api_user_v1_DeleteTOTP": {
    "accessPath": [
      "apiUserV1DeleteTotp"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/totps/{totp_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "totp_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletetotp",
    "parameterDescriptions": {
      "totp_id": "The `totp_id` to be deleted."
    }
  },
  "api_user_v1_DeleteCryptoWallet": {
    "accessPath": [
      "apiUserV1DeleteCryptoWallet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/crypto_wallets/{crypto_wallet_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "crypto_wallet_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletecryptowallet",
    "parameterDescriptions": {
      "crypto_wallet_id": "The `crypto_wallet_id` to be deleted."
    }
  },
  "api_user_v1_DeletePassword": {
    "accessPath": [
      "apiUserV1DeletePassword"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/passwords/{password_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "password_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletepassword",
    "parameterDescriptions": {
      "password_id": "The `password_id` to be deleted."
    }
  },
  "api_user_v1_DeleteOAuthRegistration": {
    "accessPath": [
      "apiUserV1DeleteOAuthRegistration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/oauth/{oauth_user_registration_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "oauth_user_registration_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteoauthregistration",
    "parameterDescriptions": {
      "oauth_user_registration_id": "The `oauth_user_registration_id` to be deleted."
    }
  },
  "api_user_v1_DeleteExternalId": {
    "accessPath": [
      "apiUserV1DeleteExternalId"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/users/{user_id}/external_id",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteexternalid"
  },
  "api_user_v1_ConnectedApps": {
    "accessPath": [
      "apiUserV1ConnectedApps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/users/{user_id}/connected_apps",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Connectedapps",
    "parameterDescriptions": {
      "user_id": "The unique ID of a specific User. You may use an `external_id` here if one is set for the user."
    }
  },
  "api_user_v1_Revoke": {
    "accessPath": [
      "apiUserV1Revoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/users/{user_id}/connected_apps/{connected_app_id}/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "connected_app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke",
    "parameterDescriptions": {
      "user_id": "The unique ID of a specific User. You may use an `external_id` here if one is set for the user.",
      "connected_app_id": "The ID of the Connected App."
    }
  },
  "api_session_v1_Get": {
    "accessPath": [
      "apiSessionV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "user_id"
    ],
    "description": "Get"
  },
  "api_session_v1_Authenticate": {
    "accessPath": [
      "apiSessionV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "authorization_check"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sessions/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_session_v1_Revoke": {
    "accessPath": [
      "apiSessionV1Revoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "session_id",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sessions/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke"
  },
  "api_session_v1_Migrate": {
    "accessPath": [
      "apiSessionV1Migrate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "session_token",
      "session_duration_minutes",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sessions/migrate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate"
  },
  "api_session_v1_ExchangeAccessToken": {
    "accessPath": [
      "apiSessionV1ExchangeAccessToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "session_duration_minutes",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sessions/exchange_access_token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchangeaccesstoken"
  },
  "api_session_v1_GetJWKS": {
    "accessPath": [
      "apiSessionV1GetJwks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/sessions/jwks/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getjwks",
    "parameterDescriptions": {
      "project_id": "The `project_id` to get the JWKS for."
    }
  },
  "api_session_v1_Attest": {
    "accessPath": [
      "apiSessionV1Attest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "profile_id",
      "token",
      "session_duration_minutes",
      "session_custom_claims",
      "session_token",
      "session_jwt",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/sessions/attest",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attest"
  },
  "api_b2b_session_v1_Get": {
    "accessPath": [
      "apiB2BSessionV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "description": "Get"
  },
  "api_b2b_session_v1_Authenticate": {
    "accessPath": [
      "apiB2BSessionV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "authorization_check"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sessions/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_session_v1_Revoke": {
    "accessPath": [
      "apiB2BSessionV1Revoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "member_session_id",
      "session_token",
      "session_jwt",
      "member_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sessions/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revoke",
    "parameterDescriptions": {
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_session_v1_Exchange": {
    "accessPath": [
      "apiB2BSessionV1Exchange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "locale",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sessions/exchange",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchange"
  },
  "api_b2b_session_v1_ExchangeAccessToken": {
    "accessPath": [
      "apiB2BSessionV1ExchangeAccessToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "access_token",
      "session_duration_minutes",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sessions/exchange_access_token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchangeaccesstoken"
  },
  "api_b2b_session_v1_Attest": {
    "accessPath": [
      "apiB2BSessionV1Attest"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "profile_id",
      "token",
      "organization_id",
      "session_duration_minutes",
      "session_custom_claims",
      "session_token",
      "session_jwt",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sessions/attest",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attest"
  },
  "api_b2b_session_v1_Migrate": {
    "accessPath": [
      "apiB2BSessionV1Migrate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "session_token",
      "organization_id",
      "session_duration_minutes",
      "session_custom_claims"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sessions/migrate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate"
  },
  "api_b2b_session_v1_GetJWKS": {
    "accessPath": [
      "apiB2BSessionV1GetJwks"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/sessions/jwks/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getjwks",
    "parameterDescriptions": {
      "project_id": "The `project_id` to get the JWKS for."
    }
  },
  "api_b2b_impersonation_v1_Authenticate": {
    "accessPath": [
      "apiB2BImpersonationV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "impersonation_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/impersonation/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_rbac_v1_Policy": {
    "accessPath": [
      "apiB2BRbacV1Policy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/rbac/policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Policy"
  },
  "api_b2b_rbac_v1_b2b_rbac_organizations_GetOrgPolicy": {
    "accessPath": [
      "apiB2BRbacV1B2BRbacOrganizationsGetOrgPolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/rbac/organizations/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getorgpolicy",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience."
    }
  },
  "api_b2b_rbac_v1_b2b_rbac_organizations_SetOrgPolicy": {
    "accessPath": [
      "apiB2BRbacV1B2BRbacOrganizationsSetOrgPolicy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "org_policy"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/rbac/organizations/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Setorgpolicy",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience."
    }
  },
  "api_b2b_recovery_codes_v1_Recover": {
    "accessPath": [
      "apiB2BRecoveryCodesV1Recover"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id",
      "recovery_code",
      "intermediate_session_token",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/recovery_codes/recover",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Recover"
  },
  "api_b2b_recovery_codes_v1_Get": {
    "accessPath": [
      "apiB2BRecoveryCodesV1Get"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/b2b/recovery_codes/{organization_id}/{member_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "member_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "member_id": "Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set for the member."
    }
  },
  "api_b2b_recovery_codes_v1_Rotate": {
    "accessPath": [
      "apiB2BRecoveryCodesV1Rotate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/recovery_codes/rotate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotate"
  },
  "api_b2b_totp_v1_Create": {
    "accessPath": [
      "apiB2BTotpV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id",
      "expiration_minutes",
      "intermediate_session_token",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/totp",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_b2b_totp_v1_Authenticate": {
    "accessPath": [
      "apiB2BTotpV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id",
      "code",
      "intermediate_session_token",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "set_mfa_enrollment",
      "set_default_mfa",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/totp/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_totp_v1_Migrate": {
    "accessPath": [
      "apiB2BTotpV1Migrate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id",
      "secret",
      "recovery_codes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/totp/migrate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate"
  },
  "api_consumer_rbac_v1_Policy": {
    "accessPath": [
      "apiConsumerRbacV1Policy"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/rbac/policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Policy"
  },
  "api_crypto_wallet_v1_AuthenticateStart": {
    "accessPath": [
      "apiCryptoWalletV1AuthenticateStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "crypto_wallet_type",
      "crypto_wallet_address",
      "user_id",
      "session_token",
      "session_jwt",
      "siwe_params"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/crypto_wallets/authenticate/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticatestart"
  },
  "api_crypto_wallet_v1_Authenticate": {
    "accessPath": [
      "apiCryptoWalletV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "crypto_wallet_type",
      "crypto_wallet_address",
      "signature",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/crypto_wallets/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_debug_v1_Whoami": {
    "accessPath": [
      "apiDebugV1Whoami"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/debug/whoami",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Whoami"
  },
  "api_discovery_v1_discovery_intermediate_sessions_Exchange": {
    "accessPath": [
      "apiDiscoveryV1DiscoveryIntermediateSessionsExchange"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "intermediate_session_token",
      "organization_id",
      "session_duration_minutes",
      "session_custom_claims",
      "locale",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/discovery/intermediate_sessions/exchange",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Exchange"
  },
  "api_discovery_v1_discovery_organizations_Create": {
    "accessPath": [
      "apiDiscoveryV1DiscoveryOrganizationsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "intermediate_session_token",
      "session_duration_minutes",
      "session_custom_claims",
      "organization_name",
      "organization_slug",
      "organization_external_id",
      "organization_logo_url",
      "trusted_metadata",
      "sso_jit_provisioning",
      "email_allowed_domains",
      "email_jit_provisioning",
      "email_invites",
      "auth_methods",
      "allowed_auth_methods",
      "mfa_policy",
      "rbac_email_implicit_role_assignments",
      "mfa_methods",
      "allowed_mfa_methods",
      "oauth_tenant_jit_provisioning",
      "allowed_oauth_tenants",
      "first_party_connected_apps_allowed_type",
      "allowed_first_party_connected_apps",
      "third_party_connected_apps_allowed_type",
      "allowed_third_party_connected_apps",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/discovery/organizations/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_discovery_v1_discovery_organizations_List": {
    "accessPath": [
      "apiDiscoveryV1DiscoveryOrganizationsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "intermediate_session_token",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/discovery/organizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List"
  },
  "api_fraud_v1_fraud_fingerprint_Lookup": {
    "accessPath": [
      "apiFraudV1FraudFingerprintLookup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "telemetry_id",
      "external_metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/fingerprint/lookup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Lookup"
  },
  "api_fraud_v1_fraud_rules_Set": {
    "accessPath": [
      "apiFraudV1FraudRulesSet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "action",
      "visitor_id",
      "browser_id",
      "visitor_fingerprint",
      "browser_fingerprint",
      "hardware_fingerprint",
      "network_fingerprint",
      "expires_in_minutes",
      "description",
      "cidr_block",
      "country_code",
      "asn"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/rules/set",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set"
  },
  "api_fraud_v1_fraud_rules_List": {
    "accessPath": [
      "apiFraudV1FraudRulesList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cursor",
      "limit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/rules/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List"
  },
  "api_fraud_v1_fraud_verdict_reasons_Override": {
    "accessPath": [
      "apiFraudV1FraudVerdictReasonsOverride"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "verdict_reason",
      "override_action",
      "override_description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/verdict_reasons/override",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Override"
  },
  "api_fraud_v1_fraud_verdict_reasons_List": {
    "accessPath": [
      "apiFraudV1FraudVerdictReasonsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "overrides_only"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/verdict_reasons/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List"
  },
  "api_fraud_v1_fraud_email_Risk": {
    "accessPath": [
      "apiFraudV1FraudEmailRisk"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/email/risk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Risk"
  },
  "api_idp_v1_idp_oauth_AuthorizeStart": {
    "accessPath": [
      "apiIdpV1IdpOauthAuthorizeStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_id",
      "redirect_uri",
      "response_type",
      "scopes",
      "user_id",
      "session_token",
      "session_jwt",
      "prompt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/idp/oauth/authorize/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authorizestart"
  },
  "api_idp_v1_idp_oauth_Authorize": {
    "accessPath": [
      "apiIdpV1IdpOauthAuthorize"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "consent_granted",
      "scopes",
      "client_id",
      "redirect_uri",
      "response_type",
      "user_id",
      "session_token",
      "session_jwt",
      "prompt",
      "state",
      "nonce",
      "code_challenge",
      "resources"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/idp/oauth/authorize",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authorize"
  },
  "api_impersonation_v1_Authenticate": {
    "accessPath": [
      "apiImpersonationV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "impersonation_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/impersonation/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_m2m_v1_m2m_clients_Get": {
    "accessPath": [
      "apiM2MV1M2MClientsGet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/m2m/clients/{client_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_m2m_v1_m2m_clients_Update": {
    "accessPath": [
      "apiM2MV1M2MClientsUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "client_name",
      "client_description",
      "status",
      "scopes",
      "trusted_metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/m2m/clients/{client_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_m2m_v1_m2m_clients_Delete": {
    "accessPath": [
      "apiM2MV1M2MClientsDelete"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/m2m/clients/{client_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_m2m_v1_m2m_clients_Search": {
    "accessPath": [
      "apiM2MV1M2MClientsSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "cursor",
      "limit",
      "query"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/m2m/clients/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search"
  },
  "api_m2m_v1_m2m_clients_Create": {
    "accessPath": [
      "apiM2MV1M2MClientsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "scopes",
      "client_id",
      "client_secret",
      "client_name",
      "client_description",
      "trusted_metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/m2m/clients",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_m2m_v1_m2m_clients_secrets_RotateStart": {
    "accessPath": [
      "apiM2MV1M2MClientsSecretsRotateStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/m2m/clients/{client_id}/secrets/rotate/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatestart",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_m2m_v1_m2m_clients_secrets_RotateCancel": {
    "accessPath": [
      "apiM2MV1M2MClientsSecretsRotateCancel"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/m2m/clients/{client_id}/secrets/rotate/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotatecancel",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_m2m_v1_m2m_clients_secrets_Rotate": {
    "accessPath": [
      "apiM2MV1M2MClientsSecretsRotate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/m2m/clients/{client_id}/secrets/rotate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "client_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Rotate",
    "parameterDescriptions": {
      "client_id": "The ID of the client."
    }
  },
  "api_magic_v1_Authenticate": {
    "accessPath": [
      "apiMagicV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "token",
      "attributes",
      "options",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "code_verifier",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/magic_links/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_magic_v1_Create": {
    "accessPath": [
      "apiMagicV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "expiration_minutes",
      "attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/magic_links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_magic_v1_magic_links_email_Send": {
    "accessPath": [
      "apiMagicV1MagicLinksEmailSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "login_template_id",
      "attributes",
      "login_magic_link_url",
      "signup_magic_link_url",
      "login_expiration_minutes",
      "signup_expiration_minutes",
      "code_challenge",
      "user_id",
      "session_token",
      "session_jwt",
      "locale",
      "signup_template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/magic_links/email/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_magic_v1_magic_links_email_LoginOrCreate": {
    "accessPath": [
      "apiMagicV1MagicLinksEmailLoginOrCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "login_magic_link_url",
      "signup_magic_link_url",
      "login_expiration_minutes",
      "signup_expiration_minutes",
      "login_template_id",
      "signup_template_id",
      "attributes",
      "create_user_as_pending",
      "code_challenge",
      "locale"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/magic_links/email/login_or_create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Loginorcreate"
  },
  "api_magic_v1_magic_links_email_Invite": {
    "accessPath": [
      "apiMagicV1MagicLinksEmailInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "invite_template_id",
      "attributes",
      "name",
      "invite_magic_link_url",
      "invite_expiration_minutes",
      "locale",
      "trusted_metadata",
      "untrusted_metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/magic_links/email/invite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite"
  },
  "api_magic_v1_magic_links_email_RevokeInvite": {
    "accessPath": [
      "apiMagicV1MagicLinksEmailRevokeInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/magic_links/email/revoke_invite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Revokeinvite"
  },
  "api_b2b_magic_v1_Authenticate": {
    "accessPath": [
      "apiB2BMagicV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "magic_links_token",
      "pkce_code_verifier",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "locale",
      "intermediate_session_token",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/magic_links/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_magic_v1_b2b_magic_links_email_LoginOrSignup": {
    "accessPath": [
      "apiB2BMagicV1B2BMagicLinksEmailLoginOrSignup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "email_address",
      "login_redirect_url",
      "signup_redirect_url",
      "pkce_code_challenge",
      "login_template_id",
      "signup_template_id",
      "locale",
      "login_expiration_minutes",
      "signup_expiration_minutes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/magic_links/email/login_or_signup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Loginorsignup"
  },
  "api_b2b_magic_v1_b2b_magic_links_email_Invite": {
    "accessPath": [
      "apiB2BMagicV1B2BMagicLinksEmailInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "email_address",
      "invite_redirect_url",
      "invited_by_member_id",
      "name",
      "trusted_metadata",
      "untrusted_metadata",
      "invite_template_id",
      "locale",
      "roles",
      "invite_expiration_minutes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/magic_links/email/invite",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite",
    "parameterDescriptions": {
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_magic_v1_b2b_magic_links_email_discovery_Send": {
    "accessPath": [
      "apiB2BMagicV1B2BMagicLinksEmailDiscoverySend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "discovery_redirect_url",
      "pkce_code_challenge",
      "login_template_id",
      "locale",
      "discovery_expiration_minutes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/magic_links/email/discovery/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_b2b_magic_v1_b2b_magic_links_discovery_Authenticate": {
    "accessPath": [
      "apiB2BMagicV1B2BMagicLinksDiscoveryAuthenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "discovery_magic_links_token",
      "pkce_code_verifier"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/magic_links/discovery/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_oauth_v1_Authenticate": {
    "accessPath": [
      "apiB2BOauthV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "oauth_token",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "pkce_code_verifier",
      "locale",
      "intermediate_session_token",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/oauth/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_oauth_v1_b2b_oauth_discovery_Authenticate": {
    "accessPath": [
      "apiB2BOauthV1B2BOauthDiscoveryAuthenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "discovery_oauth_token",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "pkce_code_verifier"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/oauth/discovery/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_otp_v1_b2b_otp_sms_Send": {
    "accessPath": [
      "apiB2BOtpV1B2BOtpSmsSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id",
      "mfa_phone_number",
      "locale",
      "intermediate_session_token",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/otps/sms/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_b2b_otp_v1_b2b_otp_sms_Authenticate": {
    "accessPath": [
      "apiB2BOtpV1B2BOtpSmsAuthenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "member_id",
      "code",
      "intermediate_session_token",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "set_mfa_enrollment",
      "set_default_mfa",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/otps/sms/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_otp_v1_b2b_otp_email_LoginOrSignup": {
    "accessPath": [
      "apiB2BOtpV1B2BOtpEmailLoginOrSignup"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "email_address",
      "login_template_id",
      "signup_template_id",
      "locale",
      "login_expiration_minutes",
      "signup_expiration_minutes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/otps/email/login_or_signup",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Loginorsignup"
  },
  "api_b2b_otp_v1_b2b_otp_email_Authenticate": {
    "accessPath": [
      "apiB2BOtpV1B2BOtpEmailAuthenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "email_address",
      "code",
      "session_token",
      "session_jwt",
      "intermediate_session_token",
      "session_duration_minutes",
      "session_custom_claims",
      "locale",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/otps/email/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_otp_v1_b2b_otp_email_discovery_Send": {
    "accessPath": [
      "apiB2BOtpV1B2BOtpEmailDiscoverySend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "login_template_id",
      "locale",
      "discovery_expiration_minutes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/otps/email/discovery/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_b2b_otp_v1_b2b_otp_email_discovery_Authenticate": {
    "accessPath": [
      "apiB2BOtpV1B2BOtpEmailDiscoveryAuthenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "code"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/otps/email/discovery/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_password_v1_Create": {
    "accessPath": [
      "apiPasswordV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "password",
      "session_duration_minutes",
      "session_custom_claims",
      "trusted_metadata",
      "untrusted_metadata",
      "name",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_password_v1_Authenticate": {
    "accessPath": [
      "apiPasswordV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "password",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_password_v1_StrengthCheck": {
    "accessPath": [
      "apiPasswordV1StrengthCheck"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "password",
      "email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/strength_check",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Strengthcheck"
  },
  "api_password_v1_Migrate": {
    "accessPath": [
      "apiPasswordV1Migrate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "hash",
      "hash_type",
      "md_5_config",
      "argon_2_config",
      "sha_1_config",
      "sha_512_config",
      "scrypt_config",
      "pbkdf_2_config",
      "trusted_metadata",
      "untrusted_metadata",
      "set_email_verified",
      "name",
      "phone_number",
      "set_phone_number_verified",
      "external_id",
      "roles"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/migrate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate"
  },
  "api_password_v1_passwords_email_ResetStart": {
    "accessPath": [
      "apiPasswordV1PasswordsEmailResetStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "reset_password_redirect_url",
      "reset_password_expiration_minutes",
      "code_challenge",
      "attributes",
      "login_redirect_url",
      "locale",
      "reset_password_template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/email/reset/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resetstart"
  },
  "api_password_v1_passwords_email_Reset": {
    "accessPath": [
      "apiPasswordV1PasswordsEmailReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "token",
      "password",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "code_verifier",
      "session_custom_claims",
      "attributes",
      "options",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/email/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_password_v1_passwords_existing_password_Reset": {
    "accessPath": [
      "apiPasswordV1PasswordsExistingPasswordReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "existing_password",
      "new_password",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/existing_password/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_password_v1_passwords_session_Reset": {
    "accessPath": [
      "apiPasswordV1PasswordsSessionReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "password",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/passwords/session/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_b2b_password_v1_StrengthCheck": {
    "accessPath": [
      "apiB2BPasswordV1StrengthCheck"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "password",
      "email_address"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/strength_check",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Strengthcheck"
  },
  "api_b2b_password_v1_Migrate": {
    "accessPath": [
      "apiB2BPasswordV1Migrate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "hash",
      "hash_type",
      "organization_id",
      "md_5_config",
      "argon_2_config",
      "sha_1_config",
      "sha_512_config",
      "scrypt_config",
      "pbkdf_2_config",
      "name",
      "trusted_metadata",
      "untrusted_metadata",
      "roles",
      "preserve_existing_sessions",
      "mfa_phone_number",
      "set_phone_number_verified",
      "external_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/migrate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Migrate"
  },
  "api_b2b_password_v1_Authenticate": {
    "accessPath": [
      "apiB2BPasswordV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "email_address",
      "password",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "locale",
      "intermediate_session_token",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_password_v1_b2b_passwords_email_ResetStart": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsEmailResetStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "email_address",
      "reset_password_redirect_url",
      "reset_password_expiration_minutes",
      "code_challenge",
      "login_redirect_url",
      "locale",
      "reset_password_template_id",
      "verify_email_template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/email/reset/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resetstart"
  },
  "api_b2b_password_v1_b2b_passwords_email_Reset": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsEmailReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "password_reset_token",
      "password",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "code_verifier",
      "session_custom_claims",
      "locale",
      "intermediate_session_token",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/email/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_b2b_password_v1_b2b_passwords_email_RequireReset": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsEmailRequireReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "organization_id",
      "member_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/email/require_reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Requirereset",
    "parameterDescriptions": {
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_b2b_password_v1_b2b_passwords_session_Reset": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsSessionReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "organization_id",
      "password",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "locale",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/session/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_b2b_password_v1_b2b_passwords_existing_password_Reset": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsExistingPasswordReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "existing_password",
      "new_password",
      "organization_id",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "locale",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/existing_password/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_b2b_password_v1_b2b_passwords_discovery_Authenticate": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsDiscoveryAuthenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "password"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/discovery/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_b2b_password_v1_b2b_passwords_discovery_email_ResetStart": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsDiscoveryEmailResetStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email_address",
      "reset_password_redirect_url",
      "discovery_redirect_url",
      "reset_password_template_id",
      "reset_password_expiration_minutes",
      "pkce_code_challenge",
      "locale",
      "verify_email_template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/discovery/email/reset/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resetstart"
  },
  "api_b2b_password_v1_b2b_passwords_discovery_email_Reset": {
    "accessPath": [
      "apiB2BPasswordV1B2BPasswordsDiscoveryEmailReset"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "password_reset_token",
      "password",
      "pkce_code_verifier"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/passwords/discovery/email/reset",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Reset"
  },
  "api_oauth_v1_Attach": {
    "accessPath": [
      "apiOauthV1Attach"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "provider",
      "user_id",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/oauth/attach",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Attach"
  },
  "api_oauth_v1_Authenticate": {
    "accessPath": [
      "apiOauthV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "token",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "code_verifier",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/oauth/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_otp_v1_Authenticate": {
    "accessPath": [
      "apiOtpV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "method_id",
      "code",
      "attributes",
      "options",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_otp_v1_otp_sms_Send": {
    "accessPath": [
      "apiOtpV1OtpSmsSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phone_number",
      "expiration_minutes",
      "attributes",
      "locale",
      "user_id",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/sms/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_otp_v1_otp_sms_LoginOrCreate": {
    "accessPath": [
      "apiOtpV1OtpSmsLoginOrCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phone_number",
      "expiration_minutes",
      "attributes",
      "create_user_as_pending",
      "locale"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/sms/login_or_create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Loginorcreate"
  },
  "api_otp_v1_otp_whatsapp_Send": {
    "accessPath": [
      "apiOtpV1OtpWhatsappSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phone_number",
      "expiration_minutes",
      "attributes",
      "locale",
      "user_id",
      "session_token",
      "session_jwt"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/whatsapp/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_otp_v1_otp_whatsapp_LoginOrCreate": {
    "accessPath": [
      "apiOtpV1OtpWhatsappLoginOrCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "phone_number",
      "expiration_minutes",
      "attributes",
      "create_user_as_pending",
      "locale"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/whatsapp/login_or_create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Loginorcreate"
  },
  "api_otp_v1_otp_email_Send": {
    "accessPath": [
      "apiOtpV1OtpEmailSend"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "expiration_minutes",
      "attributes",
      "locale",
      "user_id",
      "session_token",
      "session_jwt",
      "login_template_id",
      "signup_template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/email/send",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send"
  },
  "api_otp_v1_otp_email_LoginOrCreate": {
    "accessPath": [
      "apiOtpV1OtpEmailLoginOrCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "expiration_minutes",
      "attributes",
      "create_user_as_pending",
      "locale",
      "login_template_id",
      "signup_template_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/otps/email/login_or_create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Loginorcreate"
  },
  "api_project_v1_Metrics": {
    "accessPath": [
      "apiProjectV1Metrics"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/projects/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Metrics"
  },
  "api_sso_v1_GetConnections": {
    "accessPath": [
      "apiSsoV1GetConnections"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "GET",
    "routeTemplate": "/v1/b2b/sso/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Getconnections",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_DeleteConnection": {
    "accessPath": [
      "apiSsoV1DeleteConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/sso/{organization_id}/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteconnection",
    "parameterDescriptions": {
      "organization_id": "The organization ID that the SSO connection belongs to. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SSO connection. SAML, OIDC, and External connection IDs can be provided.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_Authenticate": {
    "accessPath": [
      "apiSsoV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "sso_token",
      "pkce_code_verifier",
      "session_token",
      "session_jwt",
      "session_duration_minutes",
      "session_custom_claims",
      "locale",
      "intermediate_session_token",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sso/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_sso_v1_sso_oidc_CreateConnection": {
    "accessPath": [
      "apiSsoV1SsoOidcCreateConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "identity_provider"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sso/oidc/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Createconnection",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_oidc_UpdateConnection": {
    "accessPath": [
      "apiSsoV1SsoOidcUpdateConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "client_id",
      "client_secret",
      "issuer",
      "authorization_url",
      "token_url",
      "userinfo_url",
      "jwks_url",
      "identity_provider",
      "custom_scopes",
      "attribute_mapping"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/sso/oidc/{organization_id}/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updateconnection",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "Globally unique UUID that identifies a specific SSO `connection_id` for a Member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_saml_CreateConnection": {
    "accessPath": [
      "apiSsoV1SsoSamlCreateConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "identity_provider"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sso/saml/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Createconnection",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_saml_UpdateConnection": {
    "accessPath": [
      "apiSsoV1SsoSamlUpdateConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idp_entity_id",
      "display_name",
      "attribute_mapping",
      "x509_certificate",
      "idp_sso_url",
      "saml_connection_implicit_role_assignments",
      "saml_group_implicit_role_assignments",
      "alternative_audience_uri",
      "identity_provider",
      "signing_private_key",
      "nameid_format",
      "alternative_acs_url",
      "idp_initiated_auth_disabled",
      "saml_encryption_private_key",
      "allow_gateway_callback"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/sso/saml/{organization_id}/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updateconnection",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "Globally unique UUID that identifies a specific SSO `connection_id` for a Member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_saml_UpdateByURL": {
    "accessPath": [
      "apiSsoV1SsoSamlUpdateByUrl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/sso/saml/{organization_id}/connections/{connection_id}/url",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updatebyurl",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "Globally unique UUID that identifies a specific SSO `connection_id` for a Member.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_saml_DeleteVerificationCertificate": {
    "accessPath": [
      "apiSsoV1SsoSamlDeleteVerificationCertificate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/sso/saml/{organization_id}/connections/{connection_id}/verification_certificates/{certificate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id",
      "certificate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteverificationcertificate",
    "parameterDescriptions": {
      "organization_id": "The organization ID that the SAML connection belongs to. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "The ID of the SAML connection.",
      "certificate_id": "The ID of the certificate to be deleted.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_saml_DeleteEncryptionPrivateKey": {
    "accessPath": [
      "apiSsoV1SsoSamlDeleteEncryptionPrivateKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/b2b/sso/saml/{organization_id}/connections/{connection_id}/encryption_private_keys/{private_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id",
      "private_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deleteencryptionprivatekey",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "Globally unique UUID that identifies a specific SSO `connection_id` for a Member.",
      "private_key_id": "The ID of the encryption private key to be deleted.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_external_CreateConnection": {
    "accessPath": [
      "apiSsoV1SsoExternalCreateConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "external_organization_id",
      "external_connection_id",
      "display_name",
      "connection_implicit_role_assignments",
      "group_implicit_role_assignments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "POST",
    "routeTemplate": "/v1/b2b/sso/external/{organization_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Createconnection",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_sso_v1_sso_external_UpdateConnection": {
    "accessPath": [
      "apiSsoV1SsoExternalUpdateConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "display_name",
      "external_connection_implicit_role_assignments",
      "external_group_implicit_role_assignments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "X-Stytch-Member-Session",
      "X-Stytch-Member-SessionJWT"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/b2b/sso/external/{organization_id}/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Updateconnection",
    "parameterDescriptions": {
      "organization_id": "Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to perform operations on an Organization, so be sure to preserve this value. You may also use the organization_slug or organization_external_id here as a convenience.",
      "connection_id": "Globally unique UUID that identifies a specific External SSO Connection.",
      "X-Stytch-Member-Session": "A Stytch session that can be used to run the request with the given member's permissions.",
      "X-Stytch-Member-SessionJWT": "A Stytch Session JSON Web Token (JWT) that can be used to run the request with the given member's permissions."
    }
  },
  "api_totp_v1_Create": {
    "accessPath": [
      "apiTotpV1Create"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "expiration_minutes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/totps",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create"
  },
  "api_totp_v1_Authenticate": {
    "accessPath": [
      "apiTotpV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "totp_code",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/totps/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_totp_v1_RecoveryCodes": {
    "accessPath": [
      "apiTotpV1RecoveryCodes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/totps/recovery_codes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Recoverycodes"
  },
  "api_totp_v1_Recover": {
    "accessPath": [
      "apiTotpV1Recover"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "recovery_code",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/totps/recover",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Recover"
  },
  "api_webauthn_v1_RegisterStart": {
    "accessPath": [
      "apiWebauthnV1RegisterStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "domain",
      "user_agent",
      "authenticator_type",
      "return_passkey_credential_options",
      "override_id",
      "override_name",
      "override_display_name",
      "use_base64_url_encoding"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webauthn/register/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Registerstart"
  },
  "api_webauthn_v1_Register": {
    "accessPath": [
      "apiWebauthnV1Register"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "public_key_credential",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webauthn/register",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register"
  },
  "api_webauthn_v1_AuthenticateStart": {
    "accessPath": [
      "apiWebauthnV1AuthenticateStart"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "domain",
      "user_id",
      "return_passkey_credential_options",
      "use_base64_url_encoding"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webauthn/authenticate/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticatestart"
  },
  "api_webauthn_v1_Authenticate": {
    "accessPath": [
      "apiWebauthnV1Authenticate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "public_key_credential",
      "session_token",
      "session_duration_minutes",
      "session_jwt",
      "session_custom_claims",
      "telemetry_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/webauthn/authenticate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Authenticate"
  },
  "api_webauthn_v1_Update": {
    "accessPath": [
      "apiWebauthnV1Update"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/v1/webauthn/{webauthn_registration_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webauthn_registration_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update",
    "parameterDescriptions": {
      "webauthn_registration_id": "Globally unique UUID that identifies a Passkey or WebAuthn registration in the Stytch API. The `webauthn_registration_id` is used when you need to operate on a specific User's WebAuthn registration."
    }
  },
  "api_webauthn_v1_ListCredentials": {
    "accessPath": [
      "apiWebauthnV1ListCredentials"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/webauthn/credentials/{user_id}/{domain}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "domain"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Listcredentials",
    "parameterDescriptions": {
      "user_id": "The `user_id` of an active user the Passkey or WebAuthn registration should be tied to.",
      "domain": "The domain for Passkeys or WebAuthn. Defaults to `window.location.hostname`."
    }
  }
} satisfies ToolRuntimeMetadataMap;
