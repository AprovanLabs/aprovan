import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listOrganizations": {
    "accessPath": [
      "listOrganizations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/organizations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[id]",
      "filter[name]",
      "page[number]",
      "page[size]",
      "sort"
    ],
    "description": "List organizations",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue.",
      "sort": "Comma separated sort fields; prefix with - for descending."
    }
  },
  "getOrganization": {
    "accessPath": [
      "getOrganization"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/organizations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve one organization"
  },
  "listContacts": {
    "accessPath": [
      "listContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[id]",
      "filter[name]",
      "filter[organization_id]",
      "filter[email]",
      "page[number]",
      "page[size]",
      "sort"
    ],
    "description": "List contacts",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue.",
      "sort": "Comma separated sort fields; prefix with - for descending."
    }
  },
  "createContact": {
    "accessPath": [
      "createContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a contact"
  },
  "getContact": {
    "accessPath": [
      "getContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/contacts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a contact"
  },
  "updateContact": {
    "accessPath": [
      "updateContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/contacts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update or deactivate a contact"
  },
  "listOrganizationContacts": {
    "accessPath": [
      "listOrganizationContacts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/organizations/{organization_id}/relationships/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[email]",
      "page[number]",
      "page[size]"
    ],
    "description": "List contacts for an organization"
  },
  "createOrganizationContact": {
    "accessPath": [
      "createOrganizationContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/organizations/{organization_id}/relationships/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a contact under an organization"
  },
  "updateOrganizationContact": {
    "accessPath": [
      "updateOrganizationContact"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/organizations/{organization_id}/relationships/contacts/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update or deactivate an organization contact"
  },
  "listPasswords": {
    "accessPath": [
      "listPasswords"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/passwords",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[id]",
      "filter[name]",
      "filter[organization_id]",
      "page[number]",
      "page[size]",
      "sort"
    ],
    "description": "List passwords",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue.",
      "sort": "Comma separated sort fields; prefix with - for descending."
    }
  },
  "createPassword": {
    "accessPath": [
      "createPassword"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/passwords",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a password"
  },
  "getPassword": {
    "accessPath": [
      "getPassword"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/passwords/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a password metadata record"
  },
  "updatePassword": {
    "accessPath": [
      "updatePassword"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/passwords/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a password"
  },
  "listConfigurations": {
    "accessPath": [
      "listConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[id]",
      "filter[name]",
      "filter[organization_id]",
      "filter[serial_number]",
      "filter[asset_tag]",
      "filter[hostname]",
      "page[number]",
      "page[size]",
      "sort"
    ],
    "description": "List configurations",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue.",
      "sort": "Comma separated sort fields; prefix with - for descending."
    }
  },
  "createConfiguration": {
    "accessPath": [
      "createConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a configuration"
  },
  "getConfiguration": {
    "accessPath": [
      "getConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/configurations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a configuration"
  },
  "updateConfiguration": {
    "accessPath": [
      "updateConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/configurations/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a configuration"
  },
  "listOrganizationConfigurations": {
    "accessPath": [
      "listOrganizationConfigurations"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/organizations/{organization_id}/relationships/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[name]",
      "page[number]",
      "page[size]"
    ],
    "description": "List configurations for an organization",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue."
    }
  },
  "createOrganizationConfiguration": {
    "accessPath": [
      "createOrganizationConfiguration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/organizations/{organization_id}/relationships/configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a configuration under an organization"
  },
  "listDocuments": {
    "accessPath": [
      "listDocuments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/documents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[id]",
      "filter[name]",
      "filter[organization_id]",
      "page[number]",
      "page[size]",
      "sort"
    ],
    "description": "List documents",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue.",
      "sort": "Comma separated sort fields; prefix with - for descending."
    }
  },
  "createDocument": {
    "accessPath": [
      "createDocument"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/documents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a document"
  },
  "getDocument": {
    "accessPath": [
      "getDocument"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/documents/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve a document"
  },
  "updateDocument": {
    "accessPath": [
      "updateDocument"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/documents/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a document"
  },
  "listOrganizationDocuments": {
    "accessPath": [
      "listOrganizationDocuments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/organizations/{organization_id}/relationships/documents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[name]",
      "page[number]",
      "page[size]"
    ],
    "description": "List documents for an organization",
    "parameterDescriptions": {
      "filter[name]": "Exact match where supported by IT Glue."
    }
  },
  "createOrganizationDocument": {
    "accessPath": [
      "createOrganizationDocument"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/organizations/{organization_id}/relationships/documents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a document under an organization"
  }
} satisfies ToolRuntimeMetadataMap;
