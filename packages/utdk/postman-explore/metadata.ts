import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listNetworkEntities": {
    "accessPath": [
      "listNetworkEntities"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/_api/ws/proxy/v1/api/networkentity",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "entityType",
      "limit",
      "offset",
      "sort",
      "categoryId"
    ]
  },
  "getNetworkEntityCounts": {
    "accessPath": [
      "getNetworkEntityCounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/_api/ws/proxy/v1/api/networkentity/count",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "flattenAPIVersions"
    ]
  },
  "searchAll": {
    "accessPath": [
      "searchAll"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "queryText",
      "size",
      "from",
      "domain",
      "queryIndices",
      "mergeEntities",
      "nested",
      "nonNestedRequests",
      "filter"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/_api/ws/proxy/search-all",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listCategories": {
    "accessPath": [
      "listCategories"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/_api/ws/proxy/v2/api/category",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sort"
    ]
  },
  "getCategory": {
    "accessPath": [
      "getCategory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/_api/ws/proxy/v2/api/category/{slug}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "slug"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listTeams": {
    "accessPath": [
      "listTeams"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/_api/ws/proxy/v1/api/team",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "sort"
    ]
  }
} satisfies ToolRuntimeMetadataMap;
