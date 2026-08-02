import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "get-/crm/v3/objects/contacts_getPage": {
    "accessPath": [
      "get",
      "crm",
      "v3",
      "objects",
      "contactsGetPage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/crm/v3/objects/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "archived",
      "associations",
      "limit",
      "properties",
      "propertiesWithHistory"
    ],
    "description": "Retrieve contacts",
    "parameterDescriptions": {
      "after": "The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.",
      "archived": "Whether to return only results that have been archived.",
      "associations": "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      "limit": "The maximum number of results to display per page.",
      "properties": "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      "propertiesWithHistory": "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request."
    }
  },
  "post-/crm/v3/objects/contacts_create": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contactsCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "associations",
      "properties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a contact"
  },
  "post-/crm/v3/objects/contacts/batch/archive_archive": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "batch",
      "archiveArchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/batch/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive a batch of contacts"
  },
  "post-/crm/v3/objects/contacts/batch/create_create": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "batch",
      "createCreate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/batch/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create a batch of contacts"
  },
  "post-/crm/v3/objects/contacts/batch/read_read": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "batch",
      "readRead"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idProperty",
      "inputs",
      "properties",
      "propertiesWithHistory"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/batch/read",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "archived"
    ],
    "description": "Retrieve a batch of contacts",
    "parameterDescriptions": {
      "archived": "Whether to return only results that have been archived."
    }
  },
  "post-/crm/v3/objects/contacts/batch/update_update": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "batch",
      "updateUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/batch/update",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update a batch of contacts"
  },
  "post-/crm/v3/objects/contacts/batch/upsert_upsert": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "batch",
      "upsertUpsert"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/batch/upsert",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create or update a batch of contacts"
  },
  "post-/crm/v3/objects/contacts/gdpr-delete_purge": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "gdprDeletePurge"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idProperty",
      "objectId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/gdpr-delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Permanently delete a contact (GDPR-compliant)"
  },
  "post-/crm/v3/objects/contacts/merge_merge": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "mergeMerge"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "objectIdToMerge",
      "primaryObjectId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Merge two contacts"
  },
  "post-/crm/v3/objects/contacts/search_doSearch": {
    "accessPath": [
      "post",
      "crm",
      "v3",
      "objects",
      "contacts",
      "searchDoSearch"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "after",
      "filterGroups",
      "limit",
      "properties",
      "query",
      "sorts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/crm/v3/objects/contacts/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search for contacts"
  },
  "get-/crm/v3/objects/contacts/{contactId}_getById": {
    "accessPath": [
      "get",
      "crm",
      "v3",
      "objects",
      "contacts",
      "contactIdGetById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/crm/v3/objects/contacts/{contactId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contactId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "archived",
      "associations",
      "idProperty",
      "properties",
      "propertiesWithHistory"
    ],
    "description": "Retrieve a contact",
    "parameterDescriptions": {
      "archived": "Whether to return only results that have been archived.",
      "associations": "A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.",
      "idProperty": "The name of a property whose values are unique for this object type",
      "properties": "A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.",
      "propertiesWithHistory": "A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored."
    }
  },
  "delete-/crm/v3/objects/contacts/{contactId}_archive": {
    "accessPath": [
      "delete",
      "crm",
      "v3",
      "objects",
      "contacts",
      "contactIdArchive"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/crm/v3/objects/contacts/{contactId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contactId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Archive a contact"
  },
  "patch-/crm/v3/objects/contacts/{contactId}_update": {
    "accessPath": [
      "patch",
      "crm",
      "v3",
      "objects",
      "contacts",
      "contactIdUpdate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "properties"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/crm/v3/objects/contacts/{contactId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "contactId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "idProperty"
    ],
    "description": "Update a contact",
    "parameterDescriptions": {
      "idProperty": "The name of a property whose values are unique for this object type"
    }
  }
} satisfies ToolRuntimeMetadataMap;
