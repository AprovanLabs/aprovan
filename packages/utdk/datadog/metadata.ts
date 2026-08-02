import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "ListFleetAgentVersions": {
    "accessPath": [
      "listFleetAgentVersions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/agent_versions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFleetAgents": {
    "accessPath": [
      "listFleetAgents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_number",
      "page_size",
      "sort_attribute",
      "sort_descending",
      "tags",
      "filter"
    ]
  },
  "GetFleetAgentInfo": {
    "accessPath": [
      "getFleetAgentInfo"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/agents/{agent_key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFleetDeployments": {
    "accessPath": [
      "listFleetDeployments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/deployments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page_offset"
    ]
  },
  "CreateFleetDeploymentConfigure": {
    "accessPath": [
      "createFleetDeploymentConfigure"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/unstable/fleet/deployments/configure",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateFleetDeploymentUpgrade": {
    "accessPath": [
      "createFleetDeploymentUpgrade"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/unstable/fleet/deployments/upgrade",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFleetDeployment": {
    "accessPath": [
      "getFleetDeployment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/deployments/{deployment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deployment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page"
    ]
  },
  "CancelFleetDeployment": {
    "accessPath": [
      "cancelFleetDeployment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/unstable/fleet/deployments/{deployment_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deployment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFleetSchedules": {
    "accessPath": [
      "listFleetSchedules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateFleetSchedule": {
    "accessPath": [
      "createFleetSchedule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/unstable/fleet/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteFleetSchedule": {
    "accessPath": [
      "deleteFleetSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/unstable/fleet/schedules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFleetSchedule": {
    "accessPath": [
      "getFleetSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/unstable/fleet/schedules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateFleetSchedule": {
    "accessPath": [
      "updateFleetSchedule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/unstable/fleet/schedules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "TriggerFleetSchedule": {
    "accessPath": [
      "triggerFleetSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/unstable/fleet/schedules/{id}/trigger",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListDatastores": {
    "accessPath": [
      "listDatastores"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/actions-datastores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDatastore": {
    "accessPath": [
      "createDatastore"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/actions-datastores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDatastore": {
    "accessPath": [
      "deleteDatastore"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDatastore": {
    "accessPath": [
      "getDatastore"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateDatastore": {
    "accessPath": [
      "updateDatastore"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDatastoreItem": {
    "accessPath": [
      "deleteDatastoreItem"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}/items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListDatastoreItems": {
    "accessPath": [
      "listDatastoreItems"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}/items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter",
      "item_key",
      "page[limit]",
      "page[offset]",
      "sort"
    ]
  },
  "UpdateDatastoreItem": {
    "accessPath": [
      "updateDatastoreItem"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}/items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "BulkDeleteDatastoreItems": {
    "accessPath": [
      "bulkDeleteDatastoreItems"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}/items/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "BulkWriteDatastoreItems": {
    "accessPath": [
      "bulkWriteDatastoreItems"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/actions-datastores/{datastore_id}/items/bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "datastore_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAppKeyRegistrations": {
    "accessPath": [
      "listAppKeyRegistrations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/actions/app_key_registrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "UnregisterAppKey": {
    "accessPath": [
      "unregisterAppKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/actions/app_key_registrations/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAppKeyRegistration": {
    "accessPath": [
      "getAppKeyRegistration"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/actions/app_key_registrations/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RegisterAppKey": {
    "accessPath": [
      "registerAppKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/actions/app_key_registrations/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateActionConnection": {
    "accessPath": [
      "createActionConnection"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/actions/connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteActionConnection": {
    "accessPath": [
      "deleteActionConnection"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/actions/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetActionConnection": {
    "accessPath": [
      "getActionConnection"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/actions/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateActionConnection": {
    "accessPath": [
      "updateActionConnection"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/actions/connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAwsScanOptions": {
    "accessPath": [
      "listAwsScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/aws",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAwsScanOptions": {
    "accessPath": [
      "createAwsScanOptions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/aws",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAwsScanOptions": {
    "accessPath": [
      "deleteAwsScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/aws/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAwsScanOptions": {
    "accessPath": [
      "getAwsScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/aws/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAwsScanOptions": {
    "accessPath": [
      "updateAwsScanOptions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/aws/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAzureScanOptions": {
    "accessPath": [
      "listAzureScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/azure",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAzureScanOptions": {
    "accessPath": [
      "createAzureScanOptions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/azure",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAzureScanOptions": {
    "accessPath": [
      "deleteAzureScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/azure/{subscription_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAzureScanOptions": {
    "accessPath": [
      "getAzureScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/azure/{subscription_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAzureScanOptions": {
    "accessPath": [
      "updateAzureScanOptions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/azure/{subscription_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "subscription_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListGcpScanOptions": {
    "accessPath": [
      "listGcpScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/gcp",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateGcpScanOptions": {
    "accessPath": [
      "createGcpScanOptions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/gcp",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteGcpScanOptions": {
    "accessPath": [
      "deleteGcpScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/gcp/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetGcpScanOptions": {
    "accessPath": [
      "getGcpScanOptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/gcp/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateGcpScanOptions": {
    "accessPath": [
      "updateGcpScanOptions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/agentless_scanning/accounts/gcp/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAwsOnDemandTasks": {
    "accessPath": [
      "listAwsOnDemandTasks"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/ondemand/aws",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAwsOnDemandTask": {
    "accessPath": [
      "createAwsOnDemandTask"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/agentless_scanning/ondemand/aws",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAwsOnDemandTask": {
    "accessPath": [
      "getAwsOnDemandTask"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/agentless_scanning/ondemand/aws/{task_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "task_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAPIKeys": {
    "accessPath": [
      "listApiKeys"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter",
      "filter[created_at][start]",
      "filter[created_at][end]",
      "filter[modified_at][start]",
      "filter[modified_at][end]",
      "include",
      "filter[remote_config_read_enabled]",
      "filter[category]"
    ]
  },
  "CreateAPIKey": {
    "accessPath": [
      "createApiKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAPIKey": {
    "accessPath": [
      "deleteApiKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAPIKey": {
    "accessPath": [
      "getApiKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateAPIKey": {
    "accessPath": [
      "updateApiKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/api_keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAPIs": {
    "accessPath": [
      "listApIs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apicatalog/api",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "page[limit]",
      "page[offset]"
    ]
  },
  "DeleteOpenAPI": {
    "accessPath": [
      "deleteOpenApi"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/apicatalog/api/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOpenAPI": {
    "accessPath": [
      "getOpenApi"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apicatalog/api/{id}/openapi",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateOpenAPI": {
    "accessPath": [
      "updateOpenApi"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "openapi_spec_file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/apicatalog/api/{id}/openapi",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateOpenAPI": {
    "accessPath": [
      "createOpenApi"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "openapi_spec_file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/apicatalog/openapi",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSpansMetrics": {
    "accessPath": [
      "listSpansMetrics"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apm/config/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSpansMetric": {
    "accessPath": [
      "createSpansMetric"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/apm/config/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSpansMetric": {
    "accessPath": [
      "deleteSpansMetric"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/apm/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSpansMetric": {
    "accessPath": [
      "getSpansMetric"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apm/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSpansMetric": {
    "accessPath": [
      "updateSpansMetric"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/apm/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListApmRetentionFilters": {
    "accessPath": [
      "listApmRetentionFilters"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apm/config/retention-filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateApmRetentionFilter": {
    "accessPath": [
      "createApmRetentionFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/apm/config/retention-filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ReorderApmRetentionFilters": {
    "accessPath": [
      "reorderApmRetentionFilters"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/apm/config/retention-filters-execution-order",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteApmRetentionFilter": {
    "accessPath": [
      "deleteApmRetentionFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/apm/config/retention-filters/{filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApmRetentionFilter": {
    "accessPath": [
      "getApmRetentionFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apm/config/retention-filters/{filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateApmRetentionFilter": {
    "accessPath": [
      "updateApmRetentionFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/apm/config/retention-filters/{filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetServiceList": {
    "accessPath": [
      "getServiceList"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/apm/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[env]"
    ]
  },
  "DeleteApps": {
    "accessPath": [
      "deleteApps"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/app-builder/apps",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListApps": {
    "accessPath": [
      "listApps"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/app-builder/apps",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "page",
      "filter[user_name]",
      "filter[user_uuid]",
      "filter[name]",
      "filter[query]",
      "filter[deployed]",
      "filter[tags]",
      "filter[favorite]",
      "filter[self_service]",
      "sort"
    ]
  },
  "CreateApp": {
    "accessPath": [
      "createApp"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/app-builder/apps",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteApp": {
    "accessPath": [
      "deleteApp"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/app-builder/apps/{app_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApp": {
    "accessPath": [
      "getApp"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/app-builder/apps/{app_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "version"
    ]
  },
  "UpdateApp": {
    "accessPath": [
      "updateApp"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/app-builder/apps/{app_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnpublishApp": {
    "accessPath": [
      "unpublishApp"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/app-builder/apps/{app_id}/deployment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PublishApp": {
    "accessPath": [
      "publishApp"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/app-builder/apps/{app_id}/deployment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListApplicationKeys": {
    "accessPath": [
      "listApplicationKeys"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/application_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter",
      "filter[created_at][start]",
      "filter[created_at][end]",
      "include"
    ]
  },
  "DeleteApplicationKey": {
    "accessPath": [
      "deleteApplicationKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApplicationKey": {
    "accessPath": [
      "getApplicationKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateApplicationKey": {
    "accessPath": [
      "updateApplicationKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAuditLogs": {
    "accessPath": [
      "listAuditLogs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/audit/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "SearchAuditLogs": {
    "accessPath": [
      "searchAuditLogs"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "options",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/audit/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAuthNMappings": {
    "accessPath": [
      "listAuthNMappings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/authn_mappings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter",
      "resource_type"
    ]
  },
  "CreateAuthNMapping": {
    "accessPath": [
      "createAuthNMapping"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/authn_mappings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAuthNMapping": {
    "accessPath": [
      "deleteAuthNMapping"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/authn_mappings/{authn_mapping_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authn_mapping_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAuthNMapping": {
    "accessPath": [
      "getAuthNMapping"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/authn_mappings/{authn_mapping_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authn_mapping_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAuthNMapping": {
    "accessPath": [
      "updateAuthNMapping"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/authn_mappings/{authn_mapping_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "authn_mapping_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchCases": {
    "accessPath": [
      "searchCases"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort[field]",
      "filter",
      "sort[asc]"
    ]
  },
  "CreateCase": {
    "accessPath": [
      "createCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetProjects": {
    "accessPath": [
      "getProjects"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateProject": {
    "accessPath": [
      "createProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteProject": {
    "accessPath": [
      "deleteProject"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetProject": {
    "accessPath": [
      "getProject"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateProject": {
    "accessPath": [
      "updateProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cases/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetProjectNotificationRules": {
    "accessPath": [
      "getProjectNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/projects/{project_id}/notification_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateProjectNotificationRule": {
    "accessPath": [
      "createProjectNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/projects/{project_id}/notification_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteProjectNotificationRule": {
    "accessPath": [
      "deleteProjectNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/projects/{project_id}/notification_rules/{notification_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "notification_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateProjectNotificationRule": {
    "accessPath": [
      "updateProjectNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/cases/projects/{project_id}/notification_rules/{notification_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "notification_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAllCaseTypes": {
    "accessPath": [
      "getAllCaseTypes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCaseType": {
    "accessPath": [
      "createCaseType"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAllCustomAttributes": {
    "accessPath": [
      "getAllCustomAttributes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/types/custom_attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCaseType": {
    "accessPath": [
      "deleteCaseType"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/types/{case_type_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAllCustomAttributeConfigsByCaseType": {
    "accessPath": [
      "getAllCustomAttributeConfigsByCaseType"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/types/{case_type_id}/custom_attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCustomAttributeConfig": {
    "accessPath": [
      "createCustomAttributeConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/types/{case_type_id}/custom_attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCustomAttributeConfig": {
    "accessPath": [
      "deleteCustomAttributeConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/types/{case_type_id}/custom_attributes/{custom_attribute_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_type_id",
      "custom_attribute_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCase": {
    "accessPath": [
      "getCase"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cases/{case_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ArchiveCase": {
    "accessPath": [
      "archiveCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AssignCase": {
    "accessPath": [
      "assignCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/assign",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAttributes": {
    "accessPath": [
      "updateAttributes"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/attributes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CommentCase": {
    "accessPath": [
      "commentCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/comment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCaseComment": {
    "accessPath": [
      "deleteCaseComment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/{case_id}/comment/{cell_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id",
      "cell_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCaseCustomAttribute": {
    "accessPath": [
      "deleteCaseCustomAttribute"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/{case_id}/custom_attributes/{custom_attribute_key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id",
      "custom_attribute_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCaseCustomAttribute": {
    "accessPath": [
      "updateCaseCustomAttribute"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/custom_attributes/{custom_attribute_key}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id",
      "custom_attribute_key"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCaseDescription": {
    "accessPath": [
      "updateCaseDescription"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/description",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdatePriority": {
    "accessPath": [
      "updatePriority"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/priority",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "LinkIncident": {
    "accessPath": [
      "linkIncident"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/incidents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnlinkJiraIssue": {
    "accessPath": [
      "unlinkJiraIssue"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/jira_issues",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "LinkJiraIssueToCase": {
    "accessPath": [
      "linkJiraIssueToCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/jira_issues",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCaseJiraIssue": {
    "accessPath": [
      "createCaseJiraIssue"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/jira_issues",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCaseNotebook": {
    "accessPath": [
      "createCaseNotebook"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/notebook",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "MoveCaseToProject": {
    "accessPath": [
      "moveCaseToProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/project",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCaseServiceNowTicket": {
    "accessPath": [
      "createCaseServiceNowTicket"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/relationships/servicenow_tickets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateStatus": {
    "accessPath": [
      "updateStatus"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/status",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCaseTitle": {
    "accessPath": [
      "updateCaseTitle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/title",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnarchiveCase": {
    "accessPath": [
      "unarchiveCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnassignCase": {
    "accessPath": [
      "unassignCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cases/{case_id}/unassign",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCatalogEntity": {
    "accessPath": [
      "listCatalogEntity"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/catalog/entity",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[offset]",
      "page[limit]",
      "filter[id]",
      "filter[ref]",
      "filter[name]",
      "filter[kind]",
      "filter[owner]",
      "filter[relation][type]",
      "filter[exclude_snapshot]",
      "include",
      "includeDiscovered"
    ]
  },
  "UpsertCatalogEntity": {
    "accessPath": [
      "upsertCatalogEntity"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/catalog/entity",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PreviewCatalogEntities": {
    "accessPath": [
      "previewCatalogEntities"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/catalog/entity/preview",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCatalogEntity": {
    "accessPath": [
      "deleteCatalogEntity"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/catalog/entity/{entity_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entity_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCatalogKind": {
    "accessPath": [
      "listCatalogKind"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/catalog/kind",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[offset]",
      "page[limit]",
      "filter[id]",
      "filter[name]"
    ]
  },
  "UpsertCatalogKind": {
    "accessPath": [
      "upsertCatalogKind"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/catalog/kind",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCatalogKind": {
    "accessPath": [
      "deleteCatalogKind"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/catalog/kind/{kind_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "kind_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCatalogRelation": {
    "accessPath": [
      "listCatalogRelation"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/catalog/relation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[offset]",
      "page[limit]",
      "filter[type]",
      "filter[from_ref]",
      "filter[to_ref]",
      "include",
      "includeDiscovered"
    ]
  },
  "CreateChangeRequest": {
    "accessPath": [
      "createChangeRequest"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/change-management/change-request",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetChangeRequest": {
    "accessPath": [
      "getChangeRequest"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/change-management/change-request/{change_request_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "change_request_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateChangeRequest": {
    "accessPath": [
      "updateChangeRequest"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "included"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/change-management/change-request/{change_request_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "change_request_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateChangeRequestBranch": {
    "accessPath": [
      "createChangeRequestBranch"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/change-management/change-request/{change_request_id}/branch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "change_request_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteChangeRequestDecision": {
    "accessPath": [
      "deleteChangeRequestDecision"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/change-management/change-request/{change_request_id}/decisions/{decision_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "change_request_id",
      "decision_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateChangeRequestDecision": {
    "accessPath": [
      "updateChangeRequestDecision"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "included"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/change-management/change-request/{change_request_id}/decisions/{decision_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "change_request_id",
      "decision_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCIAppPipelineEvent": {
    "accessPath": [
      "createCiAppPipelineEvent"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/ci/pipeline",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AggregateCIAppPipelineEvents": {
    "accessPath": [
      "aggregateCiAppPipelineEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "compute",
      "filter",
      "group_by",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/ci/pipelines/analytics/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCIAppPipelineEvents": {
    "accessPath": [
      "listCiAppPipelineEvents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ci/pipelines/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "SearchCIAppPipelineEvents": {
    "accessPath": [
      "searchCiAppPipelineEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "options",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/ci/pipelines/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTestOptimizationServiceSettings": {
    "accessPath": [
      "deleteTestOptimizationServiceSettings"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/ci/test-optimization/settings/service",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTestOptimizationServiceSettings": {
    "accessPath": [
      "updateTestOptimizationServiceSettings"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/ci/test-optimization/settings/service",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTestOptimizationServiceSettings": {
    "accessPath": [
      "getTestOptimizationServiceSettings"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/ci/test-optimization/settings/service",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AggregateCIAppTestEvents": {
    "accessPath": [
      "aggregateCiAppTestEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "compute",
      "filter",
      "group_by",
      "options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/ci/tests/analytics/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCIAppTestEvents": {
    "accessPath": [
      "listCiAppTestEvents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ci/tests/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "SearchCIAppTestEvents": {
    "accessPath": [
      "searchCiAppTestEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "options",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/ci/tests/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAWSCloudAuthPersonaMappings": {
    "accessPath": [
      "listAwsCloudAuthPersonaMappings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cloud_auth/aws/persona_mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAWSCloudAuthPersonaMapping": {
    "accessPath": [
      "createAwsCloudAuthPersonaMapping"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cloud_auth/aws/persona_mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAWSCloudAuthPersonaMapping": {
    "accessPath": [
      "deleteAwsCloudAuthPersonaMapping"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cloud_auth/aws/persona_mapping/{persona_mapping_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "persona_mapping_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAWSCloudAuthPersonaMapping": {
    "accessPath": [
      "getAwsCloudAuthPersonaMapping"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cloud_auth/aws/persona_mapping/{persona_mapping_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "persona_mapping_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCustomFramework": {
    "accessPath": [
      "createCustomFramework"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cloud_security_management/custom_frameworks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCustomFramework": {
    "accessPath": [
      "deleteCustomFramework"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cloud_security_management/custom_frameworks/{handle}/{version}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle",
      "version"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCustomFramework": {
    "accessPath": [
      "getCustomFramework"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cloud_security_management/custom_frameworks/{handle}/{version}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle",
      "version"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCustomFramework": {
    "accessPath": [
      "updateCustomFramework"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/cloud_security_management/custom_frameworks/{handle}/{version}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle",
      "version"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetResourceEvaluationFilters": {
    "accessPath": [
      "getResourceEvaluationFilters"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cloud_security_management/resource_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cloud_provider",
      "account_id",
      "skip_cache"
    ]
  },
  "UpdateResourceEvaluationFilters": {
    "accessPath": [
      "updateResourceEvaluationFilters"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/cloud_security_management/resource_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCodeCoverageBranchSummary": {
    "accessPath": [
      "getCodeCoverageBranchSummary"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/code-coverage/branch/summary",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCodeCoverageCommitSummary": {
    "accessPath": [
      "getCodeCoverageCommitSummary"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/code-coverage/commit/summary",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListContainerImages": {
    "accessPath": [
      "listContainerImages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/container_images",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[tags]",
      "group_by",
      "sort",
      "page[size]",
      "page[cursor]"
    ]
  },
  "ListContainers": {
    "accessPath": [
      "listContainers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/containers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[tags]",
      "group_by",
      "sort",
      "page[size]",
      "page[cursor]"
    ]
  },
  "ListCustomAllocationRules": {
    "accessPath": [
      "listCustomAllocationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/arbitrary_rule",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCustomAllocationRule": {
    "accessPath": [
      "createCustomAllocationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/arbitrary_rule",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ReorderCustomAllocationRules": {
    "accessPath": [
      "reorderCustomAllocationRules"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/arbitrary_rule/reorder",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCustomAllocationRule": {
    "accessPath": [
      "deleteCustomAllocationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cost/arbitrary_rule/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCustomAllocationRule": {
    "accessPath": [
      "getCustomAllocationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/arbitrary_rule/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCustomAllocationRule": {
    "accessPath": [
      "updateCustomAllocationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cost/arbitrary_rule/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCostAWSCURConfigs": {
    "accessPath": [
      "listCostAwscurConfigs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/aws_cur_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCostAWSCURConfig": {
    "accessPath": [
      "createCostAwscurConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/aws_cur_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCostAWSCURConfig": {
    "accessPath": [
      "deleteCostAwscurConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cost/aws_cur_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCostAWSCURConfig": {
    "accessPath": [
      "getCostAwscurConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/aws_cur_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCostAWSCURConfig": {
    "accessPath": [
      "updateCostAwscurConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cost/aws_cur_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCostAzureUCConfigs": {
    "accessPath": [
      "listCostAzureUcConfigs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/azure_uc_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCostAzureUCConfigs": {
    "accessPath": [
      "createCostAzureUcConfigs"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/azure_uc_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCostAzureUCConfig": {
    "accessPath": [
      "deleteCostAzureUcConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cost/azure_uc_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCostAzureUCConfig": {
    "accessPath": [
      "getCostAzureUcConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/azure_uc_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCostAzureUCConfigs": {
    "accessPath": [
      "updateCostAzureUcConfigs"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cost/azure_uc_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpsertBudget": {
    "accessPath": [
      "upsertBudget"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/cost/budget",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateCsvBudget": {
    "accessPath": [
      "validateCsvBudget"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/budget/csv/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateBudget": {
    "accessPath": [
      "validateBudget"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/budget/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteBudget": {
    "accessPath": [
      "deleteBudget"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cost/budget/{budget_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "budget_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetBudget": {
    "accessPath": [
      "getBudget"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/budget/{budget_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "budget_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListBudgets": {
    "accessPath": [
      "listBudgets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/budgets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCustomCostsFiles": {
    "accessPath": [
      "listCustomCostsFiles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/custom_costs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[number]",
      "page[size]",
      "filter[status]",
      "sort"
    ]
  },
  "UploadCustomCostsFile": {
    "accessPath": [
      "uploadCustomCostsFile"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/cost/custom_costs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCustomCostsFile": {
    "accessPath": [
      "deleteCustomCostsFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cost/custom_costs/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCustomCostsFile": {
    "accessPath": [
      "getCustomCostsFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/custom_costs/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCostGCPUsageCostConfigs": {
    "accessPath": [
      "listCostGcpUsageCostConfigs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/gcp_uc_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCostGCPUsageCostConfig": {
    "accessPath": [
      "createCostGcpUsageCostConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/cost/gcp_uc_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCostGCPUsageCostConfig": {
    "accessPath": [
      "deleteCostGcpUsageCostConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/cost/gcp_uc_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCostGCPUsageCostConfig": {
    "accessPath": [
      "getCostGcpUsageCostConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost/gcp_uc_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCostGCPUsageCostConfig": {
    "accessPath": [
      "updateCostGcpUsageCostConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/cost/gcp_uc_config/{cloud_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cloud_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetActiveBillingDimensions": {
    "accessPath": [
      "getActiveBillingDimensions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost_by_tag/active_billing_dimensions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetMonthlyCostAttribution": {
    "accessPath": [
      "getMonthlyCostAttribution"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/cost_by_tag/monthly_cost_attribution",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_month",
      "end_month",
      "fields",
      "sort_direction",
      "sort_name",
      "tag_breakdown_keys",
      "next_record_id",
      "include_descendants"
    ]
  },
  "ListAllCSMAgents": {
    "accessPath": [
      "listAllCsmAgents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/csm/onboarding/agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "size",
      "query",
      "order_direction"
    ]
  },
  "GetCSMCloudAccountsCoverageAnalysis": {
    "accessPath": [
      "getCsmCloudAccountsCoverageAnalysis"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/csm/onboarding/coverage_analysis/cloud_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCSMHostsAndContainersCoverageAnalysis": {
    "accessPath": [
      "getCsmHostsAndContainersCoverageAnalysis"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/csm/onboarding/coverage_analysis/hosts_and_containers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCSMServerlessCoverageAnalysis": {
    "accessPath": [
      "getCsmServerlessCoverageAnalysis"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/csm/onboarding/coverage_analysis/serverless",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAllCSMServerlessAgents": {
    "accessPath": [
      "listAllCsmServerlessAgents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/csm/onboarding/serverless/agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "size",
      "query",
      "order_direction"
    ]
  },
  "ListCurrentUserApplicationKeys": {
    "accessPath": [
      "listCurrentUserApplicationKeys"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/current_user/application_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter",
      "filter[created_at][start]",
      "filter[created_at][end]",
      "include"
    ]
  },
  "CreateCurrentUserApplicationKey": {
    "accessPath": [
      "createCurrentUserApplicationKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/current_user/application_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCurrentUserApplicationKey": {
    "accessPath": [
      "deleteCurrentUserApplicationKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/current_user/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCurrentUserApplicationKey": {
    "accessPath": [
      "getCurrentUserApplicationKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/current_user/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCurrentUserApplicationKey": {
    "accessPath": [
      "updateCurrentUserApplicationKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/current_user/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDashboardListItems": {
    "accessPath": [
      "deleteDashboardListItems"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dashboards"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/dashboard/lists/manual/{dashboard_list_id}/dashboards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboard_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDashboardListItems": {
    "accessPath": [
      "getDashboardListItems"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/dashboard/lists/manual/{dashboard_list_id}/dashboards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboard_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDashboardListItems": {
    "accessPath": [
      "createDashboardListItems"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dashboards"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/dashboard/lists/manual/{dashboard_list_id}/dashboards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboard_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateDashboardListItems": {
    "accessPath": [
      "updateDashboardListItems"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "dashboards"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/dashboard/lists/manual/{dashboard_list_id}/dashboards",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dashboard_list_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAllDatasets": {
    "accessPath": [
      "getAllDatasets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/datasets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDataset": {
    "accessPath": [
      "createDataset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/datasets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDataset": {
    "accessPath": [
      "deleteDataset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/datasets/{dataset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDataset": {
    "accessPath": [
      "getDataset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/datasets/{dataset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateDataset": {
    "accessPath": [
      "updateDataset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/datasets/{dataset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDataDeletionRequest": {
    "accessPath": [
      "createDataDeletionRequest"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/deletion/data/{product}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "product"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDataDeletionRequests": {
    "accessPath": [
      "getDataDeletionRequests"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/deletion/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "next_page",
      "product",
      "query",
      "status",
      "page_size"
    ]
  },
  "CancelDataDeletionRequest": {
    "accessPath": [
      "cancelDataDeletionRequest"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/deletion/requests/{id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListDeploymentGates": {
    "accessPath": [
      "listDeploymentGates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/deployment_gates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[cursor]",
      "page[size]"
    ]
  },
  "CreateDeploymentGate": {
    "accessPath": [
      "createDeploymentGate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/deployment_gates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDeploymentGateRules": {
    "accessPath": [
      "getDeploymentGateRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/deployment_gates/{gate_id}/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "gate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDeploymentRule": {
    "accessPath": [
      "createDeploymentRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/deployment_gates/{gate_id}/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "gate_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDeploymentRule": {
    "accessPath": [
      "deleteDeploymentRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/deployment_gates/{gate_id}/rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "gate_id",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDeploymentRule": {
    "accessPath": [
      "getDeploymentRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/deployment_gates/{gate_id}/rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "gate_id",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateDeploymentRule": {
    "accessPath": [
      "updateDeploymentRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/deployment_gates/{gate_id}/rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "gate_id",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDeploymentGate": {
    "accessPath": [
      "deleteDeploymentGate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/deployment_gates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDeploymentGate": {
    "accessPath": [
      "getDeploymentGate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/deployment_gates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateDeploymentGate": {
    "accessPath": [
      "updateDeploymentGate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/deployment_gates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "TriggerDeploymentGatesEvaluation": {
    "accessPath": [
      "triggerDeploymentGatesEvaluation"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/deployments/gates/evaluation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDeploymentGatesEvaluationResult": {
    "accessPath": [
      "getDeploymentGatesEvaluationResult"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/deployments/gates/evaluation/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDomainAllowlist": {
    "accessPath": [
      "getDomainAllowlist"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/domain_allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PatchDomainAllowlist": {
    "accessPath": [
      "patchDomainAllowlist"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/domain_allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDORADeployment": {
    "accessPath": [
      "createDoraDeployment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/dora/deployment",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDORADeployment": {
    "accessPath": [
      "deleteDoraDeployment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/dora/deployment/{deployment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deployment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListDORADeployments": {
    "accessPath": [
      "listDoraDeployments"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/dora/deployments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDORADeployment": {
    "accessPath": [
      "getDoraDeployment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/dora/deployments/{deployment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deployment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PatchDORADeployment": {
    "accessPath": [
      "patchDoraDeployment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/dora/deployments/{deployment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "deployment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDORAFailure": {
    "accessPath": [
      "createDoraFailure"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/dora/failure",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteDORAFailure": {
    "accessPath": [
      "deleteDoraFailure"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/dora/failure/{failure_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "failure_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListDORAFailures": {
    "accessPath": [
      "listDoraFailures"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/dora/failures",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDORAFailure": {
    "accessPath": [
      "getDoraFailure"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/dora/failures/{failure_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "failure_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateDORAIncident": {
    "accessPath": [
      "createDoraIncident"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/dora/incident",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListDowntimes": {
    "accessPath": [
      "listDowntimes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/downtime",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "current_only",
      "include",
      "page[offset]",
      "page[limit]"
    ]
  },
  "CreateDowntime": {
    "accessPath": [
      "createDowntime"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/downtime",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CancelDowntime": {
    "accessPath": [
      "cancelDowntime"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/downtime/{downtime_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "downtime_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDowntime": {
    "accessPath": [
      "getDowntime"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/downtime/{downtime_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "downtime_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateDowntime": {
    "accessPath": [
      "updateDowntime"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/downtime/{downtime_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "downtime_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchIssues": {
    "accessPath": [
      "searchIssues"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/error-tracking/issues/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "GetIssue": {
    "accessPath": [
      "getIssue"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/error-tracking/issues/{issue_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "DeleteIssueAssignee": {
    "accessPath": [
      "deleteIssueAssignee"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/error-tracking/issues/{issue_id}/assignee",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIssueAssignee": {
    "accessPath": [
      "updateIssueAssignee"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/error-tracking/issues/{issue_id}/assignee",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIssueState": {
    "accessPath": [
      "updateIssueState"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/error-tracking/issues/{issue_id}/state",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListEvents": {
    "accessPath": [
      "listEvents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "CreateEvent": {
    "accessPath": [
      "createEvent"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchEvents": {
    "accessPath": [
      "searchEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "options",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetEvent": {
    "accessPath": [
      "getEvent"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/events/{event_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "event_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFeatureFlags": {
    "accessPath": [
      "listFeatureFlags"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/feature-flags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "key",
      "is_archived",
      "limit",
      "offset"
    ]
  },
  "CreateFeatureFlag": {
    "accessPath": [
      "createFeatureFlag"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFeatureFlagsEnvironments": {
    "accessPath": [
      "listFeatureFlagsEnvironments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/feature-flags/environments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name",
      "key",
      "limit",
      "offset"
    ]
  },
  "CreateFeatureFlagsEnvironment": {
    "accessPath": [
      "createFeatureFlagsEnvironment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/environments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteFeatureFlagsEnvironment": {
    "accessPath": [
      "deleteFeatureFlagsEnvironment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/feature-flags/environments/{environment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFeatureFlagsEnvironment": {
    "accessPath": [
      "getFeatureFlagsEnvironment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/feature-flags/environments/{environment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateFeatureFlagsEnvironment": {
    "accessPath": [
      "updateFeatureFlagsEnvironment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/feature-flags/environments/{environment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PauseExposureSchedule": {
    "accessPath": [
      "pauseExposureSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/exposure-schedules/{exposure_schedule_id}/pause",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exposure_schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ResumeExposureSchedule": {
    "accessPath": [
      "resumeExposureSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/exposure-schedules/{exposure_schedule_id}/resume",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exposure_schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "StartExposureSchedule": {
    "accessPath": [
      "startExposureSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/exposure-schedules/{exposure_schedule_id}/start",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exposure_schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "StopExposureSchedule": {
    "accessPath": [
      "stopExposureSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/exposure-schedules/{exposure_schedule_id}/stop",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exposure_schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFeatureFlag": {
    "accessPath": [
      "getFeatureFlag"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateFeatureFlag": {
    "accessPath": [
      "updateFeatureFlag"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ArchiveFeatureFlag": {
    "accessPath": [
      "archiveFeatureFlag"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAllocationsForFeatureFlagInEnvironment": {
    "accessPath": [
      "createAllocationsForFeatureFlagInEnvironment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}/environments/{environment_id}/allocations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id",
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAllocationsForFeatureFlagInEnvironment": {
    "accessPath": [
      "updateAllocationsForFeatureFlagInEnvironment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}/environments/{environment_id}/allocations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id",
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DisableFeatureFlagEnvironment": {
    "accessPath": [
      "disableFeatureFlagEnvironment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}/environments/{environment_id}/disable",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id",
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EnableFeatureFlagEnvironment": {
    "accessPath": [
      "enableFeatureFlagEnvironment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}/environments/{environment_id}/enable",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id",
      "environment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnarchiveFeatureFlag": {
    "accessPath": [
      "unarchiveFeatureFlag"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/feature-flags/{feature_flag_id}/unarchive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "feature_flag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetHamrOrgConnection": {
    "accessPath": [
      "getHamrOrgConnection"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/hamr",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateHamrOrgConnection": {
    "accessPath": [
      "createHamrOrgConnection"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/hamr",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidents": {
    "accessPath": [
      "listIncidents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include",
      "page[size]",
      "page[offset]"
    ]
  },
  "CreateIncident": {
    "accessPath": [
      "createIncident"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteGlobalIncidentHandle": {
    "accessPath": [
      "deleteGlobalIncidentHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/config/global/incident-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListGlobalIncidentHandles": {
    "accessPath": [
      "listGlobalIncidentHandles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/global/incident-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateGlobalIncidentHandle": {
    "accessPath": [
      "createGlobalIncidentHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/config/global/incident-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateGlobalIncidentHandle": {
    "accessPath": [
      "updateGlobalIncidentHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/incidents/config/global/incident-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "GetGlobalIncidentSettings": {
    "accessPath": [
      "getGlobalIncidentSettings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/global/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateGlobalIncidentSettings": {
    "accessPath": [
      "updateGlobalIncidentSettings"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/config/global/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentNotificationRules": {
    "accessPath": [
      "listIncidentNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/notification-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateIncidentNotificationRule": {
    "accessPath": [
      "createIncidentNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/config/notification-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentNotificationRule": {
    "accessPath": [
      "deleteIncidentNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/config/notification-rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "GetIncidentNotificationRule": {
    "accessPath": [
      "getIncidentNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/notification-rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateIncidentNotificationRule": {
    "accessPath": [
      "updateIncidentNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/incidents/config/notification-rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListIncidentNotificationTemplates": {
    "accessPath": [
      "listIncidentNotificationTemplates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/notification-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[incident-type]",
      "include"
    ]
  },
  "CreateIncidentNotificationTemplate": {
    "accessPath": [
      "createIncidentNotificationTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/config/notification-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentNotificationTemplate": {
    "accessPath": [
      "deleteIncidentNotificationTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/config/notification-templates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "GetIncidentNotificationTemplate": {
    "accessPath": [
      "getIncidentNotificationTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/notification-templates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateIncidentNotificationTemplate": {
    "accessPath": [
      "updateIncidentNotificationTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/config/notification-templates/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListIncidentPostmortemTemplates": {
    "accessPath": [
      "listIncidentPostmortemTemplates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/postmortem-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateIncidentPostmortemTemplate": {
    "accessPath": [
      "createIncidentPostmortemTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/config/postmortem-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentPostmortemTemplate": {
    "accessPath": [
      "deleteIncidentPostmortemTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/config/postmortem-templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentPostmortemTemplate": {
    "accessPath": [
      "getIncidentPostmortemTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/postmortem-templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIncidentPostmortemTemplate": {
    "accessPath": [
      "updateIncidentPostmortemTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/config/postmortem-templates/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentTypes": {
    "accessPath": [
      "listIncidentTypes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_deleted"
    ]
  },
  "CreateIncidentType": {
    "accessPath": [
      "createIncidentType"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/config/types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentType": {
    "accessPath": [
      "deleteIncidentType"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/config/types/{incident_type_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentType": {
    "accessPath": [
      "getIncidentType"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/types/{incident_type_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIncidentType": {
    "accessPath": [
      "updateIncidentType"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/config/types/{incident_type_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_type_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentUserDefinedFields": {
    "accessPath": [
      "listIncidentUserDefinedFields"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/user-defined-fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "include-deleted",
      "filter[incident-type]",
      "include"
    ]
  },
  "CreateIncidentUserDefinedField": {
    "accessPath": [
      "createIncidentUserDefinedField"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/config/user-defined-fields",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "DeleteIncidentUserDefinedField": {
    "accessPath": [
      "deleteIncidentUserDefinedField"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/config/user-defined-fields/{field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentUserDefinedField": {
    "accessPath": [
      "getIncidentUserDefinedField"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/config/user-defined-fields/{field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateIncidentUserDefinedField": {
    "accessPath": [
      "updateIncidentUserDefinedField"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/config/user-defined-fields/{field_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "field_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ImportIncident": {
    "accessPath": [
      "importIncident"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/import",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "SearchIncidents": {
    "accessPath": [
      "searchIncidents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include",
      "query",
      "sort",
      "page[size]",
      "page[offset]"
    ]
  },
  "DeleteIncident": {
    "accessPath": [
      "deleteIncident"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/{incident_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncident": {
    "accessPath": [
      "getIncident"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateIncident": {
    "accessPath": [
      "updateIncident"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/{incident_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListIncidentAttachments": {
    "accessPath": [
      "listIncidentAttachments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[attachment_type]",
      "include"
    ]
  },
  "CreateIncidentAttachment": {
    "accessPath": [
      "createIncidentAttachment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/{incident_id}/attachments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateIncidentPostmortemAttachment": {
    "accessPath": [
      "createIncidentPostmortemAttachment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/{incident_id}/attachments/postmortems",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentAttachment": {
    "accessPath": [
      "deleteIncidentAttachment"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/{incident_id}/attachments/{attachment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "attachment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIncidentAttachment": {
    "accessPath": [
      "updateIncidentAttachment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/{incident_id}/attachments/{attachment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "attachment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListIncidentImpacts": {
    "accessPath": [
      "listIncidentImpacts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}/impacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateIncidentImpact": {
    "accessPath": [
      "createIncidentImpact"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/{incident_id}/impacts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "DeleteIncidentImpact": {
    "accessPath": [
      "deleteIncidentImpact"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/{incident_id}/impacts/{impact_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "impact_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentIntegrations": {
    "accessPath": [
      "listIncidentIntegrations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/integrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateIncidentIntegration": {
    "accessPath": [
      "createIncidentIntegration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/integrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentIntegration": {
    "accessPath": [
      "deleteIncidentIntegration"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "integration_metadata_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentIntegration": {
    "accessPath": [
      "getIncidentIntegration"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "integration_metadata_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIncidentIntegration": {
    "accessPath": [
      "updateIncidentIntegration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/integrations/{integration_metadata_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "integration_metadata_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentTodos": {
    "accessPath": [
      "listIncidentTodos"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/todos",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateIncidentTodo": {
    "accessPath": [
      "createIncidentTodo"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/todos",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentTodo": {
    "accessPath": [
      "deleteIncidentTodo"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "todo_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentTodo": {
    "accessPath": [
      "getIncidentTodo"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "todo_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIncidentTodo": {
    "accessPath": [
      "updateIncidentTodo"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/incidents/{incident_id}/relationships/todos/{todo_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "incident_id",
      "todo_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAWSAccounts": {
    "accessPath": [
      "listAwsAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "aws_account_id"
    ]
  },
  "CreateAWSAccount": {
    "accessPath": [
      "createAwsAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/aws/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAWSAccount": {
    "accessPath": [
      "deleteAwsAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAWSAccount": {
    "accessPath": [
      "getAwsAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAWSAccount": {
    "accessPath": [
      "updateAwsAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAWSAccountCCMConfig": {
    "accessPath": [
      "deleteAwsAccountCcmConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAWSAccountCCMConfig": {
    "accessPath": [
      "getAwsAccountCcmConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateAWSAccountCCMConfig": {
    "accessPath": [
      "updateAwsAccountCcmConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAWSAccountCCMConfig": {
    "accessPath": [
      "createAwsAccountCcmConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/aws/accounts/{aws_account_config_id}/ccm_config",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "aws_account_config_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAWSNamespaces": {
    "accessPath": [
      "listAwsNamespaces"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/available_namespaces",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteAWSEventBridgeSource": {
    "accessPath": [
      "deleteAwsEventBridgeSource"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/aws/event_bridge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAWSEventBridgeSources": {
    "accessPath": [
      "listAwsEventBridgeSources"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/event_bridge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateAWSEventBridgeSource": {
    "accessPath": [
      "createAwsEventBridgeSource"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/aws/event_bridge",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateNewAWSExternalID": {
    "accessPath": [
      "createNewAwsExternalId"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/aws/generate_new_external_id",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAWSIntegrationIAMPermissions": {
    "accessPath": [
      "getAwsIntegrationIamPermissions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/iam_permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAWSIntegrationIAMPermissionsResourceCollection": {
    "accessPath": [
      "getAwsIntegrationIamPermissionsResourceCollection"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/iam_permissions/resource_collection",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAWSIntegrationIAMPermissionsStandard": {
    "accessPath": [
      "getAwsIntegrationIamPermissionsStandard"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/iam_permissions/standard",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAWSLogsServices": {
    "accessPath": [
      "listAwsLogsServices"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/aws/logs/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListGCPSTSAccounts": {
    "accessPath": [
      "listGcpstsAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/gcp/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateGCPSTSAccount": {
    "accessPath": [
      "createGcpstsAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/gcp/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteGCPSTSAccount": {
    "accessPath": [
      "deleteGcpstsAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/gcp/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateGCPSTSAccount": {
    "accessPath": [
      "updateGcpstsAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/gcp/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetGCPSTSDelegate": {
    "accessPath": [
      "getGcpstsDelegate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/gcp/sts_delegate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "MakeGCPSTSDelegate": {
    "accessPath": [
      "makeGcpstsDelegate"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/gcp/sts_delegate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSpaceByDisplayName": {
    "accessPath": [
      "getSpaceByDisplayName"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/google-chat/organizations/app/named-spaces/{domain_name}/{space_display_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "domain_name",
      "space_display_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListOrganizationHandles": {
    "accessPath": [
      "listOrganizationHandles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/google-chat/organizations/{organization_binding_id}/organization-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_binding_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateOrganizationHandle": {
    "accessPath": [
      "createOrganizationHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/google-chat/organizations/{organization_binding_id}/organization-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_binding_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteOrganizationHandle": {
    "accessPath": [
      "deleteOrganizationHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/google-chat/organizations/{organization_binding_id}/organization-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_binding_id",
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOrganizationHandle": {
    "accessPath": [
      "getOrganizationHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/google-chat/organizations/{organization_binding_id}/organization-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_binding_id",
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateOrganizationHandle": {
    "accessPath": [
      "updateOrganizationHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/google-chat/organizations/{organization_binding_id}/organization-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "organization_binding_id",
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListJiraAccounts": {
    "accessPath": [
      "listJiraAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/jira/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteJiraAccount": {
    "accessPath": [
      "deleteJiraAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/jira/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListJiraIssueTemplates": {
    "accessPath": [
      "listJiraIssueTemplates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/jira/issue-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateJiraIssueTemplate": {
    "accessPath": [
      "createJiraIssueTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/jira/issue-templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteJiraIssueTemplate": {
    "accessPath": [
      "deleteJiraIssueTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/jira/issue-templates/{issue_template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetJiraIssueTemplate": {
    "accessPath": [
      "getJiraIssueTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/jira/issue-templates/{issue_template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateJiraIssueTemplate": {
    "accessPath": [
      "updateJiraIssueTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/jira/issue-templates/{issue_template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "issue_template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetChannelByName": {
    "accessPath": [
      "getChannelByName"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/channel/{tenant_name}/{team_name}/{channel_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tenant_name",
      "team_name",
      "channel_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTenantBasedHandles": {
    "accessPath": [
      "listTenantBasedHandles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/tenant-based-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "tenant_id",
      "name"
    ]
  },
  "CreateTenantBasedHandle": {
    "accessPath": [
      "createTenantBasedHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/tenant-based-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTenantBasedHandle": {
    "accessPath": [
      "deleteTenantBasedHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/tenant-based-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTenantBasedHandle": {
    "accessPath": [
      "getTenantBasedHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/tenant-based-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTenantBasedHandle": {
    "accessPath": [
      "updateTenantBasedHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/tenant-based-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListWorkflowsWebhookHandles": {
    "accessPath": [
      "listWorkflowsWebhookHandles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/workflows-webhook-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name"
    ]
  },
  "CreateWorkflowsWebhookHandle": {
    "accessPath": [
      "createWorkflowsWebhookHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/workflows-webhook-handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteWorkflowsWebhookHandle": {
    "accessPath": [
      "deleteWorkflowsWebhookHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/workflows-webhook-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetWorkflowsWebhookHandle": {
    "accessPath": [
      "getWorkflowsWebhookHandle"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/workflows-webhook-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateWorkflowsWebhookHandle": {
    "accessPath": [
      "updateWorkflowsWebhookHandle"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/ms-teams/configuration/workflows-webhook-handles/{handle_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "handle_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTenancyProducts": {
    "accessPath": [
      "listTenancyProducts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/oci/products",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "productKeys"
    ]
  },
  "GetTenancyConfigs": {
    "accessPath": [
      "getTenancyConfigs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/oci/tenancies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateTenancyConfig": {
    "accessPath": [
      "createTenancyConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/oci/tenancies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTenancyConfig": {
    "accessPath": [
      "deleteTenancyConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/oci/tenancies/{tenancy_ocid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tenancy_ocid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTenancyConfig": {
    "accessPath": [
      "getTenancyConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/oci/tenancies/{tenancy_ocid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tenancy_ocid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTenancyConfig": {
    "accessPath": [
      "updateTenancyConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/oci/tenancies/{tenancy_ocid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tenancy_ocid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListOpsgenieServices": {
    "accessPath": [
      "listOpsgenieServices"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/opsgenie/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateOpsgenieService": {
    "accessPath": [
      "createOpsgenieService"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/opsgenie/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteOpsgenieService": {
    "accessPath": [
      "deleteOpsgenieService"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/opsgenie/services/{integration_service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integration_service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOpsgenieService": {
    "accessPath": [
      "getOpsgenieService"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/opsgenie/services/{integration_service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integration_service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateOpsgenieService": {
    "accessPath": [
      "updateOpsgenieService"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integration/opsgenie/services/{integration_service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "integration_service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceNowAssignmentGroups": {
    "accessPath": [
      "listServiceNowAssignmentGroups"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/servicenow/assignment_groups/{instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceNowBusinessServices": {
    "accessPath": [
      "listServiceNowBusinessServices"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/servicenow/business_services/{instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceNowTemplates": {
    "accessPath": [
      "listServiceNowTemplates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/servicenow/handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateServiceNowTemplate": {
    "accessPath": [
      "createServiceNowTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integration/servicenow/handles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteServiceNowTemplate": {
    "accessPath": [
      "deleteServiceNowTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integration/servicenow/handles/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetServiceNowTemplate": {
    "accessPath": [
      "getServiceNowTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/servicenow/handles/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateServiceNowTemplate": {
    "accessPath": [
      "updateServiceNowTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/integration/servicenow/handles/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceNowInstances": {
    "accessPath": [
      "listServiceNowInstances"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/servicenow/instances",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceNowUsers": {
    "accessPath": [
      "listServiceNowUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integration/servicenow/users/{instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIntegrations": {
    "accessPath": [
      "listIntegrations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCloudflareAccounts": {
    "accessPath": [
      "listCloudflareAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/cloudflare/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCloudflareAccount": {
    "accessPath": [
      "createCloudflareAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/cloudflare/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCloudflareAccount": {
    "accessPath": [
      "deleteCloudflareAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/cloudflare/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCloudflareAccount": {
    "accessPath": [
      "getCloudflareAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/cloudflare/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCloudflareAccount": {
    "accessPath": [
      "updateCloudflareAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/cloudflare/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListConfluentAccount": {
    "accessPath": [
      "listConfluentAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateConfluentAccount": {
    "accessPath": [
      "createConfluentAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteConfluentAccount": {
    "accessPath": [
      "deleteConfluentAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetConfluentAccount": {
    "accessPath": [
      "getConfluentAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateConfluentAccount": {
    "accessPath": [
      "updateConfluentAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListConfluentResource": {
    "accessPath": [
      "listConfluentResource"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}/resources",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateConfluentResource": {
    "accessPath": [
      "createConfluentResource"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}/resources",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteConfluentResource": {
    "accessPath": [
      "deleteConfluentResource"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}/resources/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id",
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetConfluentResource": {
    "accessPath": [
      "getConfluentResource"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}/resources/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id",
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateConfluentResource": {
    "accessPath": [
      "updateConfluentResource"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/confluent-cloud/accounts/{account_id}/resources/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id",
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFastlyAccounts": {
    "accessPath": [
      "listFastlyAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/fastly/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateFastlyAccount": {
    "accessPath": [
      "createFastlyAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/fastly/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteFastlyAccount": {
    "accessPath": [
      "deleteFastlyAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFastlyAccount": {
    "accessPath": [
      "getFastlyAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateFastlyAccount": {
    "accessPath": [
      "updateFastlyAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFastlyServices": {
    "accessPath": [
      "listFastlyServices"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateFastlyService": {
    "accessPath": [
      "createFastlyService"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteFastlyService": {
    "accessPath": [
      "deleteFastlyService"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}/services/{service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id",
      "service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFastlyService": {
    "accessPath": [
      "getFastlyService"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}/services/{service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id",
      "service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateFastlyService": {
    "accessPath": [
      "updateFastlyService"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/fastly/accounts/{account_id}/services/{service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id",
      "service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListOktaAccounts": {
    "accessPath": [
      "listOktaAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/okta/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateOktaAccount": {
    "accessPath": [
      "createOktaAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/integrations/okta/accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteOktaAccount": {
    "accessPath": [
      "deleteOktaAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/integrations/okta/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOktaAccount": {
    "accessPath": [
      "getOktaAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/integrations/okta/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateOktaAccount": {
    "accessPath": [
      "updateOktaAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/integrations/okta/accounts/{account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIPAllowlist": {
    "accessPath": [
      "getIpAllowlist"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ip_allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateIPAllowlist": {
    "accessPath": [
      "updateIpAllowlist"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/ip_allowlist",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLLMObsExperiments": {
    "accessPath": [
      "listLlmObsExperiments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/llm-obs/v1/experiments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[project_id]",
      "filter[dataset_id]",
      "filter[id]",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "CreateLLMObsExperiment": {
    "accessPath": [
      "createLlmObsExperiment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/experiments",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLLMObsExperiments": {
    "accessPath": [
      "deleteLlmObsExperiments"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/experiments/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLLMObsExperiment": {
    "accessPath": [
      "updateLlmObsExperiment"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/llm-obs/v1/experiments/{experiment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experiment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateLLMObsExperimentEvents": {
    "accessPath": [
      "createLlmObsExperimentEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/experiments/{experiment_id}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experiment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLLMObsProjects": {
    "accessPath": [
      "listLlmObsProjects"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/llm-obs/v1/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[id]",
      "filter[name]",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "CreateLLMObsProject": {
    "accessPath": [
      "createLlmObsProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLLMObsProjects": {
    "accessPath": [
      "deleteLlmObsProjects"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/projects/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLLMObsProject": {
    "accessPath": [
      "updateLlmObsProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/llm-obs/v1/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLLMObsDatasets": {
    "accessPath": [
      "listLlmObsDatasets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[name]",
      "filter[id]",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "CreateLLMObsDataset": {
    "accessPath": [
      "createLlmObsDataset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLLMObsDatasets": {
    "accessPath": [
      "deleteLlmObsDatasets"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLLMObsDataset": {
    "accessPath": [
      "updateLlmObsDataset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLLMObsDatasetRecords": {
    "accessPath": [
      "listLlmObsDatasetRecords"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[version]",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "UpdateLLMObsDatasetRecords": {
    "accessPath": [
      "updateLlmObsDatasetRecords"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateLLMObsDatasetRecords": {
    "accessPath": [
      "createLlmObsDatasetRecords"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLLMObsDatasetRecords": {
    "accessPath": [
      "deleteLlmObsDatasetRecords"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/llm-obs/v1/{project_id}/datasets/{dataset_id}/records/delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "dataset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SubmitLog": {
    "accessPath": [
      "submitLog"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Content-Encoding"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "ddtags"
    ]
  },
  "AggregateLogs": {
    "accessPath": [
      "aggregateLogs"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "compute",
      "filter",
      "group_by",
      "options",
      "page"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/analytics/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetLogsArchiveOrder": {
    "accessPath": [
      "getLogsArchiveOrder"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/archive-order",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLogsArchiveOrder": {
    "accessPath": [
      "updateLogsArchiveOrder"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/logs/config/archive-order",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLogsArchives": {
    "accessPath": [
      "listLogsArchives"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/archives",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateLogsArchive": {
    "accessPath": [
      "createLogsArchive"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/config/archives",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLogsArchive": {
    "accessPath": [
      "deleteLogsArchive"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/logs/config/archives/{archive_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "archive_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetLogsArchive": {
    "accessPath": [
      "getLogsArchive"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/archives/{archive_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "archive_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLogsArchive": {
    "accessPath": [
      "updateLogsArchive"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/logs/config/archives/{archive_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "archive_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RemoveRoleFromArchive": {
    "accessPath": [
      "removeRoleFromArchive"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/logs/config/archives/{archive_id}/readers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "archive_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListArchiveReadRoles": {
    "accessPath": [
      "listArchiveReadRoles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/archives/{archive_id}/readers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "archive_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AddReadRoleToArchive": {
    "accessPath": [
      "addReadRoleToArchive"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/config/archives/{archive_id}/readers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "archive_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLogsCustomDestinations": {
    "accessPath": [
      "listLogsCustomDestinations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/custom-destinations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateLogsCustomDestination": {
    "accessPath": [
      "createLogsCustomDestination"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/config/custom-destinations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLogsCustomDestination": {
    "accessPath": [
      "deleteLogsCustomDestination"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/logs/config/custom-destinations/{custom_destination_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_destination_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetLogsCustomDestination": {
    "accessPath": [
      "getLogsCustomDestination"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/custom-destinations/{custom_destination_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_destination_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLogsCustomDestination": {
    "accessPath": [
      "updateLogsCustomDestination"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/logs/config/custom-destinations/{custom_destination_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_destination_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLogsMetrics": {
    "accessPath": [
      "listLogsMetrics"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateLogsMetric": {
    "accessPath": [
      "createLogsMetric"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/config/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteLogsMetric": {
    "accessPath": [
      "deleteLogsMetric"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/logs/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetLogsMetric": {
    "accessPath": [
      "getLogsMetric"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateLogsMetric": {
    "accessPath": [
      "updateLogsMetric"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/logs/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRestrictionQueries": {
    "accessPath": [
      "listRestrictionQueries"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/restriction_queries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "CreateRestrictionQuery": {
    "accessPath": [
      "createRestrictionQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/config/restriction_queries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRoleRestrictionQuery": {
    "accessPath": [
      "getRoleRestrictionQuery"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/role/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListUserRestrictionQueries": {
    "accessPath": [
      "listUserRestrictionQueries"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/user/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRestrictionQuery": {
    "accessPath": [
      "deleteRestrictionQuery"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRestrictionQuery": {
    "accessPath": [
      "getRestrictionQuery"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRestrictionQuery": {
    "accessPath": [
      "updateRestrictionQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ReplaceRestrictionQuery": {
    "accessPath": [
      "replaceRestrictionQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RemoveRoleFromRestrictionQuery": {
    "accessPath": [
      "removeRoleFromRestrictionQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRestrictionQueryRoles": {
    "accessPath": [
      "listRestrictionQueryRoles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "AddRoleToRestrictionQuery": {
    "accessPath": [
      "addRoleToRestrictionQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/config/restriction_queries/{restriction_query_id}/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "restriction_query_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListLogsGet": {
    "accessPath": [
      "listLogsGet"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/logs/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[indexes]",
      "filter[from]",
      "filter[to]",
      "filter[storage_tier]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "ListLogs": {
    "accessPath": [
      "listLogs"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "options",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/logs/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTagConfigurations": {
    "accessPath": [
      "listTagConfigurations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[configured]",
      "filter[tags_configured]",
      "filter[metric_type]",
      "filter[include_percentiles]",
      "filter[queried]",
      "filter[queried][window][seconds]",
      "filter[tags]",
      "filter[related_assets]",
      "window[seconds]",
      "page[size]",
      "page[cursor]"
    ]
  },
  "DeleteBulkTagsMetricsConfiguration": {
    "accessPath": [
      "deleteBulkTagsMetricsConfiguration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/metrics/config/bulk-tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateBulkTagsMetricsConfiguration": {
    "accessPath": [
      "createBulkTagsMetricsConfiguration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/metrics/config/bulk-tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListActiveMetricConfigurations": {
    "accessPath": [
      "listActiveMetricConfigurations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/active-configurations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "window[seconds]"
    ]
  },
  "ListTagsByMetricName": {
    "accessPath": [
      "listTagsByMetricName"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/all-tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "window[seconds]",
      "filter[tags]",
      "filter[match]",
      "filter[include_tag_values]",
      "filter[allow_partial]",
      "page[limit]"
    ]
  },
  "ListMetricAssets": {
    "accessPath": [
      "listMetricAssets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/assets",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EstimateMetricsOutputSeries": {
    "accessPath": [
      "estimateMetricsOutputSeries"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/estimate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[groups]",
      "filter[hours_ago]",
      "filter[num_aggregations]",
      "filter[pct]",
      "filter[timespan_h]"
    ]
  },
  "GetMetricTagCardinalityDetails": {
    "accessPath": [
      "getMetricTagCardinalityDetails"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/tag-cardinalities",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTagConfiguration": {
    "accessPath": [
      "deleteTagConfiguration"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/metrics/{metric_name}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTagConfigurationByName": {
    "accessPath": [
      "listTagConfigurationByName"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTagConfiguration": {
    "accessPath": [
      "updateTagConfiguration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/metrics/{metric_name}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateTagConfiguration": {
    "accessPath": [
      "createTagConfiguration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/metrics/{metric_name}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListVolumesByMetricName": {
    "accessPath": [
      "listVolumesByMetricName"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/metrics/{metric_name}/volumes",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetMonitorNotificationRules": {
    "accessPath": [
      "getMonitorNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/notification_rule",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page",
      "per_page",
      "sort",
      "filters",
      "include"
    ]
  },
  "CreateMonitorNotificationRule": {
    "accessPath": [
      "createMonitorNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/monitor/notification_rule",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteMonitorNotificationRule": {
    "accessPath": [
      "deleteMonitorNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/monitor/notification_rule/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetMonitorNotificationRule": {
    "accessPath": [
      "getMonitorNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/notification_rule/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateMonitorNotificationRule": {
    "accessPath": [
      "updateMonitorNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/monitor/notification_rule/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListMonitorConfigPolicies": {
    "accessPath": [
      "listMonitorConfigPolicies"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateMonitorConfigPolicy": {
    "accessPath": [
      "createMonitorConfigPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/monitor/policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteMonitorConfigPolicy": {
    "accessPath": [
      "deleteMonitorConfigPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/monitor/policy/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetMonitorConfigPolicy": {
    "accessPath": [
      "getMonitorConfigPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/policy/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateMonitorConfigPolicy": {
    "accessPath": [
      "updateMonitorConfigPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/monitor/policy/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListMonitorUserTemplates": {
    "accessPath": [
      "listMonitorUserTemplates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateMonitorUserTemplate": {
    "accessPath": [
      "createMonitorUserTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/monitor/template",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateMonitorUserTemplate": {
    "accessPath": [
      "validateMonitorUserTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/monitor/template/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteMonitorUserTemplate": {
    "accessPath": [
      "deleteMonitorUserTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/monitor/template/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetMonitorUserTemplate": {
    "accessPath": [
      "getMonitorUserTemplate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/template/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_all_versions"
    ]
  },
  "UpdateMonitorUserTemplate": {
    "accessPath": [
      "updateMonitorUserTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/monitor/template/{template_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateExistingMonitorUserTemplate": {
    "accessPath": [
      "validateExistingMonitorUserTemplate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/monitor/template/{template_id}/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "template_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListMonitorDowntimes": {
    "accessPath": [
      "listMonitorDowntimes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/monitor/{monitor_id}/downtime_matches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "monitor_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[offset]",
      "page[limit]"
    ]
  },
  "ListDevices": {
    "accessPath": [
      "listDevices"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ndm/devices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter[tag]"
    ]
  },
  "GetDevice": {
    "accessPath": [
      "getDevice"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ndm/devices/{device_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "device_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetInterfaces": {
    "accessPath": [
      "getInterfaces"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ndm/interfaces",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "device_id",
      "get_ip_addresses"
    ]
  },
  "ListDeviceUserTags": {
    "accessPath": [
      "listDeviceUserTags"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ndm/tags/devices/{device_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "device_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateDeviceUserTags": {
    "accessPath": [
      "updateDeviceUserTags"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/ndm/tags/devices/{device_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "device_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListInterfaceUserTags": {
    "accessPath": [
      "listInterfaceUserTags"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/ndm/tags/interfaces/{interface_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "interface_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateInterfaceUserTags": {
    "accessPath": [
      "updateInterfaceUserTags"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/ndm/tags/interfaces/{interface_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "interface_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAggregatedConnections": {
    "accessPath": [
      "getAggregatedConnections"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/network/connections/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "group_by",
      "tags",
      "limit"
    ]
  },
  "GetAggregatedDns": {
    "accessPath": [
      "getAggregatedDns"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/network/dns/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "group_by",
      "tags",
      "limit"
    ]
  },
  "ListPipelines": {
    "accessPath": [
      "listPipelines"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/obs-pipelines/pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "CreatePipeline": {
    "accessPath": [
      "createPipeline"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/obs-pipelines/pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidatePipeline": {
    "accessPath": [
      "validatePipeline"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/obs-pipelines/pipelines/validate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeletePipeline": {
    "accessPath": [
      "deletePipeline"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/obs-pipelines/pipelines/{pipeline_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pipeline_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetPipeline": {
    "accessPath": [
      "getPipeline"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/obs-pipelines/pipelines/{pipeline_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pipeline_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdatePipeline": {
    "accessPath": [
      "updatePipeline"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/obs-pipelines/pipelines/{pipeline_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pipeline_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateOnCallEscalationPolicy": {
    "accessPath": [
      "createOnCallEscalationPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/escalation-policies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "DeleteOnCallEscalationPolicy": {
    "accessPath": [
      "deleteOnCallEscalationPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/on-call/escalation-policies/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOnCallEscalationPolicy": {
    "accessPath": [
      "getOnCallEscalationPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/escalation-policies/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateOnCallEscalationPolicy": {
    "accessPath": [
      "updateOnCallEscalationPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/on-call/escalation-policies/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateOnCallPage": {
    "accessPath": [
      "createOnCallPage"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/pages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AcknowledgeOnCallPage": {
    "accessPath": [
      "acknowledgeOnCallPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/pages/{page_id}/acknowledge",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EscalateOnCallPage": {
    "accessPath": [
      "escalateOnCallPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/pages/{page_id}/escalate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ResolveOnCallPage": {
    "accessPath": [
      "resolveOnCallPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/pages/{page_id}/resolve",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateOnCallSchedule": {
    "accessPath": [
      "createOnCallSchedule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/schedules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "DeleteOnCallSchedule": {
    "accessPath": [
      "deleteOnCallSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/on-call/schedules/{schedule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOnCallSchedule": {
    "accessPath": [
      "getOnCallSchedule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/schedules/{schedule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateOnCallSchedule": {
    "accessPath": [
      "updateOnCallSchedule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/on-call/schedules/{schedule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "GetScheduleOnCallUser": {
    "accessPath": [
      "getScheduleOnCallUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/schedules/{schedule_id}/on-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "schedule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include",
      "filter[at_ts]"
    ]
  },
  "GetTeamOnCallUsers": {
    "accessPath": [
      "getTeamOnCallUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/teams/{team_id}/on-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "GetOnCallTeamRoutingRules": {
    "accessPath": [
      "getOnCallTeamRoutingRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/teams/{team_id}/routing-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "SetOnCallTeamRoutingRules": {
    "accessPath": [
      "setOnCallTeamRoutingRules"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/on-call/teams/{team_id}/routing-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListUserNotificationChannels": {
    "accessPath": [
      "listUserNotificationChannels"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateUserNotificationChannel": {
    "accessPath": [
      "createUserNotificationChannel"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-channels",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteUserNotificationChannel": {
    "accessPath": [
      "deleteUserNotificationChannel"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetUserNotificationChannel": {
    "accessPath": [
      "getUserNotificationChannel"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-channels/{channel_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "channel_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListUserNotificationRules": {
    "accessPath": [
      "listUserNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateUserNotificationRule": {
    "accessPath": [
      "createUserNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteUserNotificationRule": {
    "accessPath": [
      "deleteUserNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetUserNotificationRule": {
    "accessPath": [
      "getUserNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateUserNotificationRule": {
    "accessPath": [
      "updateUserNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/on-call/users/{user_id}/notification-rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListOrgConfigs": {
    "accessPath": [
      "listOrgConfigs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/org_configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOrgConfig": {
    "accessPath": [
      "getOrgConfig"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/org_configs/{org_config_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "org_config_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateOrgConfig": {
    "accessPath": [
      "updateOrgConfig"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/org_configs/{org_config_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "org_config_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListOrgConnections": {
    "accessPath": [
      "listOrgConnections"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/org_connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "sink_org_id",
      "source_org_id",
      "limit",
      "offset"
    ]
  },
  "CreateOrgConnections": {
    "accessPath": [
      "createOrgConnections"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/org_connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteOrgConnections": {
    "accessPath": [
      "deleteOrgConnections"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/org_connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateOrgConnections": {
    "accessPath": [
      "updateOrgConnections"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/org_connections/{connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListPermissions": {
    "accessPath": [
      "listPermissions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListFindings": {
    "accessPath": [
      "listFindings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/posture_management/findings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[limit]",
      "snapshot_timestamp",
      "page[cursor]",
      "filter[tags]",
      "filter[evaluation_changed_at]",
      "filter[muted]",
      "filter[rule_id]",
      "filter[rule_name]",
      "filter[resource_type]",
      "filter[@resource_id]",
      "filter[discovery_timestamp]",
      "filter[evaluation]",
      "filter[status]",
      "filter[vulnerability_type]",
      "detailed_findings"
    ]
  },
  "MuteFindings": {
    "accessPath": [
      "muteFindings"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/posture_management/findings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetFinding": {
    "accessPath": [
      "getFinding"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/posture_management/findings/{finding_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "finding_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "snapshot_timestamp"
    ]
  },
  "ListPowerpacks": {
    "accessPath": [
      "listPowerpacks"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/powerpacks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[limit]",
      "page[offset]"
    ]
  },
  "CreatePowerpack": {
    "accessPath": [
      "createPowerpack"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/powerpacks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeletePowerpack": {
    "accessPath": [
      "deletePowerpack"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/powerpacks/{powerpack_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "powerpack_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetPowerpack": {
    "accessPath": [
      "getPowerpack"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/powerpacks/{powerpack_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "powerpack_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdatePowerpack": {
    "accessPath": [
      "updatePowerpack"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/powerpacks/{powerpack_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "powerpack_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListProcesses": {
    "accessPath": [
      "listProcesses"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/processes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "search",
      "tags",
      "from",
      "to",
      "page[limit]",
      "page[cursor]"
    ]
  },
  "SubmitProductAnalyticsEvent": {
    "accessPath": [
      "submitProductAnalyticsEvent"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "account",
      "application",
      "event",
      "session",
      "type",
      "usr"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/prodlytics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetAccountFacetInfo": {
    "accessPath": [
      "getAccountFacetInfo"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/accounts/facet_info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryAccounts": {
    "accessPath": [
      "queryAccounts"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/accounts/query",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryProductAnalyticsScalar": {
    "accessPath": [
      "queryProductAnalyticsScalar"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/analytics/scalar",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryProductAnalyticsTimeseries": {
    "accessPath": [
      "queryProductAnalyticsTimeseries"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/analytics/timeseries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryEventFilteredUsers": {
    "accessPath": [
      "queryEventFilteredUsers"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/users/event_filtered_query",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetUserFacetInfo": {
    "accessPath": [
      "getUserFacetInfo"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/users/facet_info",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryUsers": {
    "accessPath": [
      "queryUsers"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/users/query",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetMapping": {
    "accessPath": [
      "getMapping"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/product-analytics/{entity}/mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entity"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateConnection": {
    "accessPath": [
      "createConnection"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/product-analytics/{entity}/mapping/connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entity"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateConnection": {
    "accessPath": [
      "updateConnection"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/product-analytics/{entity}/mapping/connection",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entity"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteConnection": {
    "accessPath": [
      "deleteConnection"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/product-analytics/{entity}/mapping/connection/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id",
      "entity"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListConnections": {
    "accessPath": [
      "listConnections"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/product-analytics/{entity}/mapping/connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "entity"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryScalarData": {
    "accessPath": [
      "queryScalarData"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/query/scalar",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "QueryTimeseriesData": {
    "accessPath": [
      "queryTimeseriesData"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/query/timeseries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "BatchRowsQuery": {
    "accessPath": [
      "batchRowsQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/reference-tables/queries/batch-rows",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTables": {
    "accessPath": [
      "listTables"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/reference-tables/tables",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[limit]",
      "page[offset]",
      "sort",
      "filter[status]",
      "filter[table_name][exact]",
      "filter[table_name][contains]"
    ]
  },
  "CreateReferenceTable": {
    "accessPath": [
      "createReferenceTable"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/reference-tables/tables",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTable": {
    "accessPath": [
      "deleteTable"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/reference-tables/tables/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTable": {
    "accessPath": [
      "getTable"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/reference-tables/tables/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateReferenceTable": {
    "accessPath": [
      "updateReferenceTable"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/reference-tables/tables/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRows": {
    "accessPath": [
      "deleteRows"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/reference-tables/tables/{id}/rows",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRowsByID": {
    "accessPath": [
      "getRowsById"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/reference-tables/tables/{id}/rows",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "row_id"
    ]
  },
  "UpsertRows": {
    "accessPath": [
      "upsertRows"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/reference-tables/tables/{id}/rows",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateReferenceTableUpload": {
    "accessPath": [
      "createReferenceTableUpload"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/reference-tables/uploads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListApplicationSecurityWAFCustomRules": {
    "accessPath": [
      "listApplicationSecurityWafCustomRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/custom_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateApplicationSecurityWafCustomRule": {
    "accessPath": [
      "createApplicationSecurityWafCustomRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/custom_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteApplicationSecurityWafCustomRule": {
    "accessPath": [
      "deleteApplicationSecurityWafCustomRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/custom_rules/{custom_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApplicationSecurityWafCustomRule": {
    "accessPath": [
      "getApplicationSecurityWafCustomRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/custom_rules/{custom_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateApplicationSecurityWafCustomRule": {
    "accessPath": [
      "updateApplicationSecurityWafCustomRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/custom_rules/{custom_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "custom_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListApplicationSecurityWafExclusionFilters": {
    "accessPath": [
      "listApplicationSecurityWafExclusionFilters"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/exclusion_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateApplicationSecurityWafExclusionFilter": {
    "accessPath": [
      "createApplicationSecurityWafExclusionFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/exclusion_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteApplicationSecurityWafExclusionFilter": {
    "accessPath": [
      "deleteApplicationSecurityWafExclusionFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/exclusion_filters/{exclusion_filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exclusion_filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApplicationSecurityWafExclusionFilter": {
    "accessPath": [
      "getApplicationSecurityWafExclusionFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/exclusion_filters/{exclusion_filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exclusion_filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateApplicationSecurityWafExclusionFilter": {
    "accessPath": [
      "updateApplicationSecurityWafExclusionFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/remote_config/products/asm/waf/exclusion_filters/{exclusion_filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "exclusion_filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCSMThreatsAgentRules": {
    "accessPath": [
      "listCsmThreatsAgentRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/cws/agent_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "policy_id"
    ]
  },
  "CreateCSMThreatsAgentRule": {
    "accessPath": [
      "createCsmThreatsAgentRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/remote_config/products/cws/agent_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCSMThreatsAgentRule": {
    "accessPath": [
      "deleteCsmThreatsAgentRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/remote_config/products/cws/agent_rules/{agent_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "policy_id"
    ]
  },
  "GetCSMThreatsAgentRule": {
    "accessPath": [
      "getCsmThreatsAgentRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/cws/agent_rules/{agent_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "policy_id"
    ]
  },
  "UpdateCSMThreatsAgentRule": {
    "accessPath": [
      "updateCsmThreatsAgentRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/remote_config/products/cws/agent_rules/{agent_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "policy_id"
    ]
  },
  "ListCSMThreatsAgentPolicies": {
    "accessPath": [
      "listCsmThreatsAgentPolicies"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/cws/policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCSMThreatsAgentPolicy": {
    "accessPath": [
      "createCsmThreatsAgentPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/remote_config/products/cws/policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DownloadCSMThreatsPolicy": {
    "accessPath": [
      "downloadCsmThreatsPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/cws/policy/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCSMThreatsAgentPolicy": {
    "accessPath": [
      "deleteCsmThreatsAgentPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/remote_config/products/cws/policy/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCSMThreatsAgentPolicy": {
    "accessPath": [
      "getCsmThreatsAgentPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/remote_config/products/cws/policy/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCSMThreatsAgentPolicy": {
    "accessPath": [
      "updateCsmThreatsAgentPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/remote_config/products/cws/policy/{policy_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "policy_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListReplayHeatmapSnapshots": {
    "accessPath": [
      "listReplayHeatmapSnapshots"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/replay/heatmap/snapshots",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[device_type]",
      "filter[view_name]",
      "page[limit]",
      "filter[application_id]"
    ]
  },
  "CreateReplayHeatmapSnapshot": {
    "accessPath": [
      "createReplayHeatmapSnapshot"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/replay/heatmap/snapshots",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteReplayHeatmapSnapshot": {
    "accessPath": [
      "deleteReplayHeatmapSnapshot"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/replay/heatmap/snapshots/{snapshot_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateReplayHeatmapSnapshot": {
    "accessPath": [
      "updateReplayHeatmapSnapshot"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/replay/heatmap/snapshots/{snapshot_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRestrictionPolicy": {
    "accessPath": [
      "deleteRestrictionPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/restriction_policy/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRestrictionPolicy": {
    "accessPath": [
      "getRestrictionPolicy"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/restriction_policy/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRestrictionPolicy": {
    "accessPath": [
      "updateRestrictionPolicy"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/restriction_policy/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "allow_self_lockout"
    ]
  },
  "ListRoles": {
    "accessPath": [
      "listRoles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter",
      "filter[id]"
    ]
  },
  "CreateRole": {
    "accessPath": [
      "createRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/roles",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRoleTemplates": {
    "accessPath": [
      "listRoleTemplates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles/templates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRole": {
    "accessPath": [
      "deleteRole"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRole": {
    "accessPath": [
      "getRole"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRole": {
    "accessPath": [
      "updateRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/roles/{role_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CloneRole": {
    "accessPath": [
      "cloneRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/roles/{role_id}/clone",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RemovePermissionFromRole": {
    "accessPath": [
      "removePermissionFromRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/roles/{role_id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRolePermissions": {
    "accessPath": [
      "listRolePermissions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles/{role_id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AddPermissionToRole": {
    "accessPath": [
      "addPermissionToRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/roles/{role_id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RemoveUserFromRole": {
    "accessPath": [
      "removeUserFromRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/roles/{role_id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRoleUsers": {
    "accessPath": [
      "listRoleUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/roles/{role_id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter"
    ]
  },
  "AddUserToRole": {
    "accessPath": [
      "addUserToRole"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/roles/{role_id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "role_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AggregateRUMEvents": {
    "accessPath": [
      "aggregateRumEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "compute",
      "filter",
      "group_by",
      "options",
      "page"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/analytics/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRUMApplications": {
    "accessPath": [
      "getRumApplications"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/applications",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateRUMApplication": {
    "accessPath": [
      "createRumApplication"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/applications",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "OrderRetentionFilters": {
    "accessPath": [
      "orderRetentionFilters"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/rum/applications/{app_id}/relationships/retention_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRetentionFilters": {
    "accessPath": [
      "listRetentionFilters"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/applications/{app_id}/retention_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateRetentionFilter": {
    "accessPath": [
      "createRetentionFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/applications/{app_id}/retention_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRetentionFilter": {
    "accessPath": [
      "deleteRetentionFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/applications/{app_id}/retention_filters/{rf_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id",
      "rf_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRetentionFilter": {
    "accessPath": [
      "getRetentionFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/applications/{app_id}/retention_filters/{rf_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id",
      "rf_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRetentionFilter": {
    "accessPath": [
      "updateRetentionFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/rum/applications/{app_id}/retention_filters/{rf_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "app_id",
      "rf_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRUMApplication": {
    "accessPath": [
      "deleteRumApplication"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/applications/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRUMApplication": {
    "accessPath": [
      "getRumApplication"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/applications/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRUMApplication": {
    "accessPath": [
      "updateRumApplication"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/rum/applications/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRumMetrics": {
    "accessPath": [
      "listRumMetrics"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/config/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateRumMetric": {
    "accessPath": [
      "createRumMetric"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/config/metrics",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRumMetric": {
    "accessPath": [
      "deleteRumMetric"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRumMetric": {
    "accessPath": [
      "getRumMetric"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRumMetric": {
    "accessPath": [
      "updateRumMetric"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/rum/config/metrics/{metric_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "metric_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRUMEvents": {
    "accessPath": [
      "listRumEvents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "SearchRUMEvents": {
    "accessPath": [
      "searchRumEvents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "options",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRumReplayPlaylists": {
    "accessPath": [
      "listRumReplayPlaylists"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/replay/playlists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[created_by_uuid]",
      "filter[query]",
      "page[number]",
      "page[size]"
    ]
  },
  "CreateRumReplayPlaylist": {
    "accessPath": [
      "createRumReplayPlaylist"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/replay/playlists",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteRumReplayPlaylist": {
    "accessPath": [
      "deleteRumReplayPlaylist"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRumReplayPlaylist": {
    "accessPath": [
      "getRumReplayPlaylist"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateRumReplayPlaylist": {
    "accessPath": [
      "updateRumReplayPlaylist"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "BulkRemoveRumReplayPlaylistSessions": {
    "accessPath": [
      "bulkRemoveRumReplayPlaylistSessions"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRumReplayPlaylistSessions": {
    "accessPath": [
      "listRumReplayPlaylistSessions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[number]",
      "page[size]"
    ]
  },
  "RemoveRumReplaySessionFromPlaylist": {
    "accessPath": [
      "removeRumReplaySessionFromPlaylist"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}/sessions/{session_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id",
      "session_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AddRumReplaySessionToPlaylist": {
    "accessPath": [
      "addRumReplaySessionToPlaylist"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/rum/replay/playlists/{playlist_id}/sessions/{session_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "playlist_id",
      "session_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "data_source",
      "ts"
    ]
  },
  "GetSegments": {
    "accessPath": [
      "getSegments"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/replay/sessions/{session_id}/views/{view_id}/segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "view_id",
      "session_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "source",
      "ts",
      "max_list_size",
      "paging"
    ]
  },
  "ListRumReplaySessionWatchers": {
    "accessPath": [
      "listRumReplaySessionWatchers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/replay/sessions/{session_id}/watchers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "DeleteRumReplaySessionWatch": {
    "accessPath": [
      "deleteRumReplaySessionWatch"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/rum/replay/sessions/{session_id}/watches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateRumReplaySessionWatch": {
    "accessPath": [
      "createRumReplaySessionWatch"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/rum/replay/sessions/{session_id}/watches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "session_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListRumReplayViewershipHistorySessions": {
    "accessPath": [
      "listRumReplayViewershipHistorySessions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/rum/replay/viewership-history/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[watched_at][start]",
      "page[number]",
      "filter[created_by]",
      "filter[watched_at][end]",
      "filter[session_ids]",
      "page[size]",
      "filter[application_id]"
    ]
  },
  "UploadIdPMetadata": {
    "accessPath": [
      "uploadIdPMetadata"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "idp_file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/saml_configurations/idp_metadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListScorecardOutcomes": {
    "accessPath": [
      "listScorecardOutcomes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/scorecard/outcomes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[offset]",
      "include",
      "fields[outcome]",
      "fields[rule]",
      "filter[outcome][service_name]",
      "filter[outcome][state]",
      "filter[rule][enabled]",
      "filter[rule][id]",
      "filter[rule][name]"
    ]
  },
  "UpdateScorecardOutcomesAsync": {
    "accessPath": [
      "updateScorecardOutcomesAsync"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/scorecard/outcomes",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateScorecardOutcomesBatch": {
    "accessPath": [
      "createScorecardOutcomesBatch"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/scorecard/outcomes/batch",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListScorecardRules": {
    "accessPath": [
      "listScorecardRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/scorecard/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[offset]",
      "include",
      "filter[rule][id]",
      "filter[rule][enabled]",
      "filter[rule][custom]",
      "filter[rule][name]",
      "filter[rule][description]",
      "fields[rule]",
      "fields[scorecard]"
    ]
  },
  "CreateScorecardRule": {
    "accessPath": [
      "createScorecardRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/scorecard/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteScorecardRule": {
    "accessPath": [
      "deleteScorecardRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/scorecard/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateScorecardRule": {
    "accessPath": [
      "updateScorecardRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/scorecard/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnassignSeatsUser": {
    "accessPath": [
      "unassignSeatsUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/seats/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSeatsUsers": {
    "accessPath": [
      "getSeatsUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/seats/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "product_code",
      "page[limit]",
      "page[cursor]"
    ]
  },
  "AssignSeatsUser": {
    "accessPath": [
      "assignSeatsUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/seats/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListEntityRiskScores": {
    "accessPath": [
      "listEntityRiskScores"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security-entities/risk-scores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from",
      "to",
      "page[size]",
      "page[number]",
      "page[queryId]",
      "filter[sort]",
      "filter[query]",
      "entityType"
    ]
  },
  "DownloadCloudWorkloadPolicyFile": {
    "accessPath": [
      "downloadCloudWorkloadPolicyFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/cloud_workload/policy/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSecurityFindings": {
    "accessPath": [
      "listSecurityFindings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/findings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "page[cursor]",
      "page[limit]",
      "sort"
    ]
  },
  "DetachCase": {
    "accessPath": [
      "detachCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security/findings/cases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCases": {
    "accessPath": [
      "createCases"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security/findings/cases",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AttachCase": {
    "accessPath": [
      "attachCase"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security/findings/cases/{case_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "case_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AttachJiraIssue": {
    "accessPath": [
      "attachJiraIssue"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security/findings/jira_issues",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateJiraIssues": {
    "accessPath": [
      "createJiraIssues"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security/findings/jira_issues",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchSecurityFindings": {
    "accessPath": [
      "searchSecurityFindings"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security/findings/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListAssetsSBOMs": {
    "accessPath": [
      "listAssetsSboMs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/sboms",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[token]",
      "page[number]",
      "filter[asset_type]",
      "filter[asset_name]",
      "filter[package_name]",
      "filter[package_version]",
      "filter[license_name]",
      "filter[license_type]"
    ]
  },
  "GetSBOM": {
    "accessPath": [
      "getSbom"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/sboms/{asset_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "asset_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[asset_name]",
      "filter[repo_digest]",
      "ext:format"
    ]
  },
  "ListScannedAssetsMetadata": {
    "accessPath": [
      "listScannedAssetsMetadata"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/scanned-assets-metadata",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[token]",
      "page[number]",
      "filter[asset.type]",
      "filter[asset.name]",
      "filter[last_success.origin]",
      "filter[last_success.env]"
    ]
  },
  "GetSignalNotificationRules": {
    "accessPath": [
      "getSignalNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/signals/notification_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSignalNotificationRule": {
    "accessPath": [
      "createSignalNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security/signals/notification_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSignalNotificationRule": {
    "accessPath": [
      "deleteSignalNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security/signals/notification_rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSignalNotificationRule": {
    "accessPath": [
      "getSignalNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/signals/notification_rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PatchSignalNotificationRule": {
    "accessPath": [
      "patchSignalNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security/signals/notification_rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListVulnerabilities": {
    "accessPath": [
      "listVulnerabilities"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/vulnerabilities",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[token]",
      "page[number]",
      "filter[type]",
      "filter[cvss.base.score][`$op`]",
      "filter[cvss.base.severity]",
      "filter[cvss.base.vector]",
      "filter[cvss.datadog.score][`$op`]",
      "filter[cvss.datadog.severity]",
      "filter[cvss.datadog.vector]",
      "filter[status]",
      "filter[tool]",
      "filter[library.name]",
      "filter[library.version]",
      "filter[advisory.id]",
      "filter[risks.exploitation_probability]",
      "filter[risks.poc_exploit_available]",
      "filter[risks.exploit_available]",
      "filter[risks.epss.score][`$op`]",
      "filter[risks.epss.severity]",
      "filter[language]",
      "filter[ecosystem]",
      "filter[code_location.location]",
      "filter[code_location.file_path]",
      "filter[code_location.method]",
      "filter[fix_available]",
      "filter[repo_digests]",
      "filter[origin]",
      "filter[running_kernel]",
      "filter[asset.name]",
      "filter[asset.type]",
      "filter[asset.version.first]",
      "filter[asset.version.last]",
      "filter[asset.repository_url]",
      "filter[asset.risks.in_production]",
      "filter[asset.risks.under_attack]",
      "filter[asset.risks.is_publicly_accessible]",
      "filter[asset.risks.has_privileged_access]",
      "filter[asset.risks.has_access_to_sensitive_data]",
      "filter[asset.environments]",
      "filter[asset.teams]",
      "filter[asset.arch]",
      "filter[asset.operating_system.name]",
      "filter[asset.operating_system.version]"
    ]
  },
  "GetVulnerabilityNotificationRules": {
    "accessPath": [
      "getVulnerabilityNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/vulnerabilities/notification_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateVulnerabilityNotificationRule": {
    "accessPath": [
      "createVulnerabilityNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security/vulnerabilities/notification_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteVulnerabilityNotificationRule": {
    "accessPath": [
      "deleteVulnerabilityNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security/vulnerabilities/notification_rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetVulnerabilityNotificationRule": {
    "accessPath": [
      "getVulnerabilityNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/vulnerabilities/notification_rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PatchVulnerabilityNotificationRule": {
    "accessPath": [
      "patchVulnerabilityNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security/vulnerabilities/notification_rules/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListVulnerableAssets": {
    "accessPath": [
      "listVulnerableAssets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security/vulnerable-assets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[token]",
      "page[number]",
      "filter[name]",
      "filter[type]",
      "filter[version.first]",
      "filter[version.last]",
      "filter[repository_url]",
      "filter[risks.in_production]",
      "filter[risks.under_attack]",
      "filter[risks.is_publicly_accessible]",
      "filter[risks.has_privileged_access]",
      "filter[risks.has_access_to_sensitive_data]",
      "filter[environments]",
      "filter[teams]",
      "filter[arch]",
      "filter[operating_system.name]",
      "filter[operating_system.version]"
    ]
  },
  "ListCloudWorkloadSecurityAgentRules": {
    "accessPath": [
      "listCloudWorkloadSecurityAgentRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/cloud_workload_security/agent_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCloudWorkloadSecurityAgentRule": {
    "accessPath": [
      "createCloudWorkloadSecurityAgentRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/cloud_workload_security/agent_rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCloudWorkloadSecurityAgentRule": {
    "accessPath": [
      "deleteCloudWorkloadSecurityAgentRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security_monitoring/cloud_workload_security/agent_rules/{agent_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCloudWorkloadSecurityAgentRule": {
    "accessPath": [
      "getCloudWorkloadSecurityAgentRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/cloud_workload_security/agent_rules/{agent_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCloudWorkloadSecurityAgentRule": {
    "accessPath": [
      "updateCloudWorkloadSecurityAgentRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/cloud_workload_security/agent_rules/{agent_rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSecurityMonitoringCriticalAssets": {
    "accessPath": [
      "listSecurityMonitoringCriticalAssets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/critical_assets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSecurityMonitoringCriticalAsset": {
    "accessPath": [
      "createSecurityMonitoringCriticalAsset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/configuration/critical_assets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCriticalAssetsAffectingRule": {
    "accessPath": [
      "getCriticalAssetsAffectingRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/critical_assets/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSecurityMonitoringCriticalAsset": {
    "accessPath": [
      "deleteSecurityMonitoringCriticalAsset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security_monitoring/configuration/critical_assets/{critical_asset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "critical_asset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityMonitoringCriticalAsset": {
    "accessPath": [
      "getSecurityMonitoringCriticalAsset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/critical_assets/{critical_asset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "critical_asset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSecurityMonitoringCriticalAsset": {
    "accessPath": [
      "updateSecurityMonitoringCriticalAsset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/configuration/critical_assets/{critical_asset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "critical_asset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSecurityFilters": {
    "accessPath": [
      "listSecurityFilters"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/security_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSecurityFilter": {
    "accessPath": [
      "createSecurityFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/configuration/security_filters",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSecurityFilter": {
    "accessPath": [
      "deleteSecurityFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security_monitoring/configuration/security_filters/{security_filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "security_filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityFilter": {
    "accessPath": [
      "getSecurityFilter"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/security_filters/{security_filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "security_filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSecurityFilter": {
    "accessPath": [
      "updateSecurityFilter"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/configuration/security_filters/{security_filter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "security_filter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSecurityMonitoringSuppressions": {
    "accessPath": [
      "listSecurityMonitoringSuppressions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "sort",
      "page[size]",
      "page[number]"
    ]
  },
  "CreateSecurityMonitoringSuppression": {
    "accessPath": [
      "createSecurityMonitoringSuppression"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSuppressionsAffectingFutureRule": {
    "accessPath": [
      "getSuppressionsAffectingFutureRule"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSuppressionsAffectingRule": {
    "accessPath": [
      "getSuppressionsAffectingRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateSecurityMonitoringSuppression": {
    "accessPath": [
      "validateSecurityMonitoringSuppression"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/validation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSecurityMonitoringSuppression": {
    "accessPath": [
      "deleteSecurityMonitoringSuppression"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/{suppression_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "suppression_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityMonitoringSuppression": {
    "accessPath": [
      "getSecurityMonitoringSuppression"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/{suppression_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "suppression_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSecurityMonitoringSuppression": {
    "accessPath": [
      "updateSecurityMonitoringSuppression"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/{suppression_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "suppression_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSuppressionVersionHistory": {
    "accessPath": [
      "getSuppressionVersionHistory"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/configuration/suppressions/{suppression_id}/version_history",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "suppression_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "GetContentPacksStates": {
    "accessPath": [
      "getContentPacksStates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/content_packs/states",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ActivateContentPack": {
    "accessPath": [
      "activateContentPack"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/security_monitoring/content_packs/{content_pack_id}/activate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "content_pack_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeactivateContentPack": {
    "accessPath": [
      "deactivateContentPack"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/security_monitoring/content_packs/{content_pack_id}/deactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "content_pack_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSecurityMonitoringRules": {
    "accessPath": [
      "listSecurityMonitoringRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "query",
      "sort"
    ]
  },
  "CreateSecurityMonitoringRule": {
    "accessPath": [
      "createSecurityMonitoringRule"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "BulkExportSecurityMonitoringRules": {
    "accessPath": [
      "bulkExportSecurityMonitoringRules"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/rules/bulk_export",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ConvertSecurityMonitoringRuleFromJSONToTerraform": {
    "accessPath": [
      "convertSecurityMonitoringRuleFromJsonToTerraform"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/rules/convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "TestSecurityMonitoringRule": {
    "accessPath": [
      "testSecurityMonitoringRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "rule",
      "ruleQueryPayloads"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/rules/test",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateSecurityMonitoringRule": {
    "accessPath": [
      "validateSecurityMonitoringRule"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/rules/validation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSecurityMonitoringRule": {
    "accessPath": [
      "deleteSecurityMonitoringRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/security_monitoring/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityMonitoringRule": {
    "accessPath": [
      "getSecurityMonitoringRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSecurityMonitoringRule": {
    "accessPath": [
      "updateSecurityMonitoringRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "calculatedFields",
      "cases",
      "complianceSignalOptions",
      "customMessage",
      "customName",
      "filters",
      "groupSignalsBy",
      "hasExtendedTitle",
      "isEnabled",
      "message",
      "name",
      "options",
      "queries",
      "referenceTables",
      "schedulingOptions",
      "tags",
      "thirdPartyCases",
      "version"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/security_monitoring/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ConvertExistingSecurityMonitoringRule": {
    "accessPath": [
      "convertExistingSecurityMonitoringRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/rules/{rule_id}/convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "TestExistingSecurityMonitoringRule": {
    "accessPath": [
      "testExistingSecurityMonitoringRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "rule",
      "ruleQueryPayloads"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/rules/{rule_id}/test",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetRuleVersionHistory": {
    "accessPath": [
      "getRuleVersionHistory"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/rules/{rule_id}/version_history",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "ListSecurityMonitoringSignals": {
    "accessPath": [
      "listSecurityMonitoringSignals"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/signals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "BulkEditSecurityMonitoringSignalsAssignee": {
    "accessPath": [
      "bulkEditSecurityMonitoringSignalsAssignee"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/signals/bulk/assignee",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "BulkEditSecurityMonitoringSignalsState": {
    "accessPath": [
      "bulkEditSecurityMonitoringSignalsState"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/signals/bulk/state",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchSecurityMonitoringSignals": {
    "accessPath": [
      "searchSecurityMonitoringSignals"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/security_monitoring/signals/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityMonitoringSignal": {
    "accessPath": [
      "getSecurityMonitoringSignal"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/security_monitoring/signals/{signal_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signal_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EditSecurityMonitoringSignalAssignee": {
    "accessPath": [
      "editSecurityMonitoringSignalAssignee"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/signals/{signal_id}/assignee",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signal_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EditSecurityMonitoringSignalIncidents": {
    "accessPath": [
      "editSecurityMonitoringSignalIncidents"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/signals/{signal_id}/incidents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signal_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EditSecurityMonitoringSignalState": {
    "accessPath": [
      "editSecurityMonitoringSignalState"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/security_monitoring/signals/{signal_id}/state",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "signal_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListScanningGroups": {
    "accessPath": [
      "listScanningGroups"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ReorderScanningGroups": {
    "accessPath": [
      "reorderScanningGroups"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateScanningGroup": {
    "accessPath": [
      "createScanningGroup"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteScanningGroup": {
    "accessPath": [
      "deleteScanningGroup"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/groups/{group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateScanningGroup": {
    "accessPath": [
      "updateScanningGroup"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/groups/{group_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateScanningRule": {
    "accessPath": [
      "createScanningRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteScanningRule": {
    "accessPath": [
      "deleteScanningRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateScanningRule": {
    "accessPath": [
      "updateScanningRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data",
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListStandardPatterns": {
    "accessPath": [
      "listStandardPatterns"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/sensitive-data-scanner/config/standard-patterns",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SubmitMetrics": {
    "accessPath": [
      "submitMetrics"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "series"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "Content-Encoding"
    ],
    "method": "POST",
    "routeTemplate": "/api/v2/series",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateServiceAccount": {
    "accessPath": [
      "createServiceAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/service_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceAccountApplicationKeys": {
    "accessPath": [
      "listServiceAccountApplicationKeys"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/service_accounts/{service_account_id}/application_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter",
      "filter[created_at][start]",
      "filter[created_at][end]"
    ]
  },
  "CreateServiceAccountApplicationKey": {
    "accessPath": [
      "createServiceAccountApplicationKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/service_accounts/{service_account_id}/application_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteServiceAccountApplicationKey": {
    "accessPath": [
      "deleteServiceAccountApplicationKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/service_accounts/{service_account_id}/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_id",
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetServiceAccountApplicationKey": {
    "accessPath": [
      "getServiceAccountApplicationKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/service_accounts/{service_account_id}/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_id",
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateServiceAccountApplicationKey": {
    "accessPath": [
      "updateServiceAccountApplicationKey"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/service_accounts/{service_account_id}/application_keys/{app_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_id",
      "app_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentServices": {
    "accessPath": [
      "listIncidentServices"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include",
      "page[size]",
      "page[offset]",
      "filter"
    ]
  },
  "CreateIncidentService": {
    "accessPath": [
      "createIncidentService"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/services",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListServiceDefinitions": {
    "accessPath": [
      "listServiceDefinitions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/services/definitions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "schema_version"
    ]
  },
  "CreateOrUpdateServiceDefinitions": {
    "accessPath": [
      "createOrUpdateServiceDefinitions"
    ],
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/services/definitions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteServiceDefinition": {
    "accessPath": [
      "deleteServiceDefinition"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/services/definitions/{service_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetServiceDefinition": {
    "accessPath": [
      "getServiceDefinition"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/services/definitions/{service_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "schema_version"
    ]
  },
  "DeleteIncidentService": {
    "accessPath": [
      "deleteIncidentService"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/services/{service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentService": {
    "accessPath": [
      "getIncidentService"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/services/{service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateIncidentService": {
    "accessPath": [
      "updateIncidentService"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/services/{service_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSecurityMonitoringHistsignals": {
    "accessPath": [
      "listSecurityMonitoringHistsignals"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/siem-threat-hunting/histsignals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "SearchSecurityMonitoringHistsignals": {
    "accessPath": [
      "searchSecurityMonitoringHistsignals"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filter",
      "page",
      "sort"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/siem-threat-hunting/histsignals/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityMonitoringHistsignal": {
    "accessPath": [
      "getSecurityMonitoringHistsignal"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/siem-threat-hunting/histsignals/{histsignal_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "histsignal_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListThreatHuntingJobs": {
    "accessPath": [
      "listThreatHuntingJobs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter[query]"
    ]
  },
  "RunThreatHuntingJob": {
    "accessPath": [
      "runThreatHuntingJob"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ConvertJobResultToSignal": {
    "accessPath": [
      "convertJobResultToSignal"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs/signal_convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteThreatHuntingJob": {
    "accessPath": [
      "deleteThreatHuntingJob"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs/{job_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetThreatHuntingJob": {
    "accessPath": [
      "getThreatHuntingJob"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs/{job_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CancelThreatHuntingJob": {
    "accessPath": [
      "cancelThreatHuntingJob"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs/{job_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecurityMonitoringHistsignalsByJobId": {
    "accessPath": [
      "getSecurityMonitoringHistsignalsByJobId"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/siem-threat-hunting/jobs/{job_id}/histsignals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "CreateSLOReportJob": {
    "accessPath": [
      "createSloReportJob"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/slo/report",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSLOReport": {
    "accessPath": [
      "getSloReport"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/slo/report/{report_id}/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "report_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSLOReportJobStatus": {
    "accessPath": [
      "getSloReportJobStatus"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/slo/report/{report_id}/status",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "report_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSloStatus": {
    "accessPath": [
      "getSloStatus"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/slo/{slo_id}/status",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "slo_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "from_ts",
      "to_ts",
      "disable_corrections"
    ]
  },
  "GetSPARecommendations": {
    "accessPath": [
      "getSpaRecommendations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/spa/recommendations/{service}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "bypass_cache"
    ]
  },
  "GetSPARecommendationsWithShard": {
    "accessPath": [
      "getSpaRecommendationsWithShard"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/spa/recommendations/{service}/{shard}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "shard",
      "service"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "bypass_cache"
    ]
  },
  "AggregateSpans": {
    "accessPath": [
      "aggregateSpans"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/spans/analytics/aggregate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSpansGet": {
    "accessPath": [
      "listSpansGet"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/spans/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[query]",
      "filter[from]",
      "filter[to]",
      "sort",
      "page[cursor]",
      "page[limit]"
    ]
  },
  "ListSpans": {
    "accessPath": [
      "listSpans"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/spans/events/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSCAResult": {
    "accessPath": [
      "createScaResult"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/static-analysis-sca/dependencies",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSCAResolveVulnerableSymbols": {
    "accessPath": [
      "createScaResolveVulnerableSymbols"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/static-analysis-sca/vulnerabilities/resolve-vulnerable-symbols",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCustomRuleset": {
    "accessPath": [
      "deleteCustomRuleset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCustomRuleset": {
    "accessPath": [
      "getCustomRuleset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateCustomRuleset": {
    "accessPath": [
      "updateCustomRuleset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateCustomRule": {
    "accessPath": [
      "createCustomRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteCustomRule": {
    "accessPath": [
      "deleteCustomRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules/{rule_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name",
      "rule_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCustomRule": {
    "accessPath": [
      "getCustomRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules/{rule_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name",
      "rule_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListCustomRuleRevisions": {
    "accessPath": [
      "listCustomRuleRevisions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules/{rule_name}/revisions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name",
      "rule_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[offset]",
      "page[limit]"
    ]
  },
  "CreateCustomRuleRevision": {
    "accessPath": [
      "createCustomRuleRevision"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules/{rule_name}/revisions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name",
      "rule_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RevertCustomRuleRevision": {
    "accessPath": [
      "revertCustomRuleRevision"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules/{rule_name}/revisions/revert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name",
      "rule_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetCustomRuleRevision": {
    "accessPath": [
      "getCustomRuleRevision"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/static-analysis/custom/rulesets/{ruleset_name}/rules/{rule_name}/revisions/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_name",
      "rule_name",
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListMultipleRulesets": {
    "accessPath": [
      "listMultipleRulesets"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/static-analysis/rulesets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSecretsRules": {
    "accessPath": [
      "getSecretsRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/static-analysis/secrets/rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListStatusPages": {
    "accessPath": [
      "listStatusPages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[offset]",
      "page[limit]",
      "include"
    ]
  },
  "CreateStatusPage": {
    "accessPath": [
      "createStatusPage"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/statuspages",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "ListDegradations": {
    "accessPath": [
      "listDegradations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/degradations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[page_id]",
      "page[offset]",
      "page[limit]",
      "include",
      "filter[status]",
      "sort"
    ]
  },
  "ListMaintenances": {
    "accessPath": [
      "listMaintenances"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/maintenances",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[page_id]",
      "page[offset]",
      "page[limit]",
      "include",
      "filter[status]",
      "sort"
    ]
  },
  "DeleteStatusPage": {
    "accessPath": [
      "deleteStatusPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/statuspages/{page_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetStatusPage": {
    "accessPath": [
      "getStatusPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/{page_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateStatusPage": {
    "accessPath": [
      "updateStatusPage"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/statuspages/{page_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "delete_subscribers",
      "include"
    ]
  },
  "ListComponents": {
    "accessPath": [
      "listComponents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/{page_id}/components",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateComponent": {
    "accessPath": [
      "createComponent"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/statuspages/{page_id}/components",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "DeleteComponent": {
    "accessPath": [
      "deleteComponent"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/statuspages/{page_id}/components/{component_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "component_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetComponent": {
    "accessPath": [
      "getComponent"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/{page_id}/components/{component_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "component_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateComponent": {
    "accessPath": [
      "updateComponent"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/statuspages/{page_id}/components/{component_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "component_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "CreateDegradation": {
    "accessPath": [
      "createDegradation"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/statuspages/{page_id}/degradations",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notify_subscribers",
      "include"
    ]
  },
  "DeleteDegradation": {
    "accessPath": [
      "deleteDegradation"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/statuspages/{page_id}/degradations/{degradation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "degradation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetDegradation": {
    "accessPath": [
      "getDegradation"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/{page_id}/degradations/{degradation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "degradation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateDegradation": {
    "accessPath": [
      "updateDegradation"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/statuspages/{page_id}/degradations/{degradation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "degradation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notify_subscribers",
      "include"
    ]
  },
  "CreateMaintenance": {
    "accessPath": [
      "createMaintenance"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/statuspages/{page_id}/maintenances",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notify_subscribers",
      "include"
    ]
  },
  "GetMaintenance": {
    "accessPath": [
      "getMaintenance"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/statuspages/{page_id}/maintenances/{maintenance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "maintenance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateMaintenance": {
    "accessPath": [
      "updateMaintenance"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/statuspages/{page_id}/maintenances/{maintenance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id",
      "maintenance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "notify_subscribers",
      "include"
    ]
  },
  "PublishStatusPage": {
    "accessPath": [
      "publishStatusPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/statuspages/{page_id}/publish",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UnpublishStatusPage": {
    "accessPath": [
      "unpublishStatusPage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/statuspages/{page_id}/unpublish",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "page_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApiMultistepSubtests": {
    "accessPath": [
      "getApiMultistepSubtests"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/api-multistep/subtests/{public_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetApiMultistepSubtestParents": {
    "accessPath": [
      "getApiMultistepSubtestParents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/api-multistep/subtests/{public_id}/parents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetOnDemandConcurrencyCap": {
    "accessPath": [
      "getOnDemandConcurrencyCap"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/settings/on_demand_concurrency_cap",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SetOnDemandConcurrencyCap": {
    "accessPath": [
      "setOnDemandConcurrencyCap"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "on_demand_concurrency_cap"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/settings/on_demand_concurrency_cap",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSyntheticsSuite": {
    "accessPath": [
      "createSyntheticsSuite"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/suites",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSyntheticsSuites": {
    "accessPath": [
      "deleteSyntheticsSuites"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/suites/bulk-delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchSuites": {
    "accessPath": [
      "searchSuites"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/suites/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "sort",
      "facets_only",
      "start",
      "count"
    ]
  },
  "GetSyntheticsSuite": {
    "accessPath": [
      "getSyntheticsSuite"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/suites/{public_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "EditSyntheticsSuite": {
    "accessPath": [
      "editSyntheticsSuite"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/synthetics/suites/{public_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "PatchTestSuite": {
    "accessPath": [
      "patchTestSuite"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/synthetics/suites/{public_id}/jsonpatch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteSyntheticsTests": {
    "accessPath": [
      "deleteSyntheticsTests"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/tests/bulk-delete",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSyntheticsFastTestResult": {
    "accessPath": [
      "getSyntheticsFastTestResult"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/tests/fast/{id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateSyntheticsNetworkTest": {
    "accessPath": [
      "createSyntheticsNetworkTest"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/tests/network",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetSyntheticsNetworkTest": {
    "accessPath": [
      "getSyntheticsNetworkTest"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/tests/network/{public_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateSyntheticsNetworkTest": {
    "accessPath": [
      "updateSyntheticsNetworkTest"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/synthetics/tests/network/{public_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTestFileDownloadUrl": {
    "accessPath": [
      "getTestFileDownloadUrl"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bucketKey"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/files/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTestFileMultipartPresignedUrls": {
    "accessPath": [
      "getTestFileMultipartPresignedUrls"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "bucketKeyPrefix",
      "parts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/files/multipart-presigned-urls",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "AbortTestFileMultipartUpload": {
    "accessPath": [
      "abortTestFileMultipartUpload"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "uploadId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/files/multipart-upload-abort",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CompleteTestFileMultipartUpload": {
    "accessPath": [
      "completeTestFileMultipartUpload"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "key",
      "parts",
      "uploadId"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/files/multipart-upload-complete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTestParentSuites": {
    "accessPath": [
      "getTestParentSuites"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/parent-suites",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListSyntheticsTestVersions": {
    "accessPath": [
      "listSyntheticsTestVersions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/version_history",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "last_version_number",
      "limit"
    ]
  },
  "GetSyntheticsTestVersion": {
    "accessPath": [
      "getSyntheticsTestVersion"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/synthetics/tests/{public_id}/version_history/{version_number}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_id",
      "version_number"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_change_metadata",
      "only_check_existence"
    ]
  },
  "PatchGlobalVariable": {
    "accessPath": [
      "patchGlobalVariable"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/synthetics/variables/{variable_id}/jsonpatch",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "variable_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTagPipelinesRulesets": {
    "accessPath": [
      "listTagPipelinesRulesets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tags/enrichment",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateTagPipelinesRuleset": {
    "accessPath": [
      "createTagPipelinesRuleset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/tags/enrichment",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ReorderTagPipelinesRulesets": {
    "accessPath": [
      "reorderTagPipelinesRulesets"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/tags/enrichment/reorder",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ValidateQuery": {
    "accessPath": [
      "validateQuery"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/tags/enrichment/validate-query",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTagPipelinesRuleset": {
    "accessPath": [
      "deleteTagPipelinesRuleset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/tags/enrichment/{ruleset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTagPipelinesRuleset": {
    "accessPath": [
      "getTagPipelinesRuleset"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/tags/enrichment/{ruleset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTagPipelinesRuleset": {
    "accessPath": [
      "updateTagPipelinesRuleset"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/tags/enrichment/{ruleset_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "ruleset_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTeams": {
    "accessPath": [
      "listTeams"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[number]",
      "page[size]",
      "sort",
      "include",
      "filter[keyword]",
      "filter[me]",
      "fields[team]"
    ]
  },
  "CreateTeam": {
    "accessPath": [
      "createTeam"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTeamHierarchyLinks": {
    "accessPath": [
      "listTeamHierarchyLinks"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team-hierarchy-links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[number]",
      "page[size]",
      "filter[parent_team]",
      "filter[sub_team]"
    ]
  },
  "AddTeamHierarchyLink": {
    "accessPath": [
      "addTeamHierarchyLink"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team-hierarchy-links",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RemoveTeamHierarchyLink": {
    "accessPath": [
      "removeTeamHierarchyLink"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team-hierarchy-links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamHierarchyLink": {
    "accessPath": [
      "getTeamHierarchyLink"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team-hierarchy-links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTeamConnections": {
    "accessPath": [
      "deleteTeamConnections"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team/connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListTeamConnections": {
    "accessPath": [
      "listTeamConnections"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "filter[sources]",
      "filter[team_ids]",
      "filter[connected_team_ids]",
      "filter[connection_ids]"
    ]
  },
  "CreateTeamConnections": {
    "accessPath": [
      "createTeamConnections"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team/connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamSync": {
    "accessPath": [
      "getTeamSync"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/sync",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[source]"
    ]
  },
  "SyncTeams": {
    "accessPath": [
      "syncTeams"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team/sync",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListMemberTeams": {
    "accessPath": [
      "listMemberTeams"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{super_team_id}/member_teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "super_team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "fields[team]"
    ]
  },
  "AddMemberTeam": {
    "accessPath": [
      "addMemberTeam"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team/{super_team_id}/member_teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "super_team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "RemoveMemberTeam": {
    "accessPath": [
      "removeMemberTeam"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team/{super_team_id}/member_teams/{member_team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "super_team_id",
      "member_team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTeam": {
    "accessPath": [
      "deleteTeam"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeam": {
    "accessPath": [
      "getTeam"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTeam": {
    "accessPath": [
      "updateTeam"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/team/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamLinks": {
    "accessPath": [
      "getTeamLinks"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateTeamLink": {
    "accessPath": [
      "createTeamLink"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team/{team_id}/links",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTeamLink": {
    "accessPath": [
      "deleteTeamLink"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team/{team_id}/links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamLink": {
    "accessPath": [
      "getTeamLink"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}/links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTeamLink": {
    "accessPath": [
      "updateTeamLink"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/team/{team_id}/links/{link_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "link_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamMemberships": {
    "accessPath": [
      "getTeamMemberships"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}/memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "filter[keyword]"
    ]
  },
  "CreateTeamMembership": {
    "accessPath": [
      "createTeamMembership"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team/{team_id}/memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTeamMembership": {
    "accessPath": [
      "deleteTeamMembership"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team/{team_id}/memberships/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTeamMembership": {
    "accessPath": [
      "updateTeamMembership"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/team/{team_id}/memberships/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamNotificationRules": {
    "accessPath": [
      "getTeamNotificationRules"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}/notification-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateTeamNotificationRule": {
    "accessPath": [
      "createTeamNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/team/{team_id}/notification-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteTeamNotificationRule": {
    "accessPath": [
      "deleteTeamNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/team/{team_id}/notification-rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamNotificationRule": {
    "accessPath": [
      "getTeamNotificationRule"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}/notification-rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTeamNotificationRule": {
    "accessPath": [
      "updateTeamNotificationRule"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/team/{team_id}/notification-rules/{rule_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "rule_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetTeamPermissionSettings": {
    "accessPath": [
      "getTeamPermissionSettings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/team/{team_id}/permission-settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateTeamPermissionSetting": {
    "accessPath": [
      "updateTeamPermissionSetting"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/team/{team_id}/permission-settings/{action}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id",
      "action"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListIncidentTeams": {
    "accessPath": [
      "listIncidentTeams"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include",
      "page[size]",
      "page[offset]",
      "filter"
    ]
  },
  "CreateIncidentTeam": {
    "accessPath": [
      "createIncidentTeam"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/teams",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteIncidentTeam": {
    "accessPath": [
      "deleteIncidentTeam"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/teams/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetIncidentTeam": {
    "accessPath": [
      "getIncidentTeam"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/teams/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "UpdateIncidentTeam": {
    "accessPath": [
      "updateIncidentTeam"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/teams/{team_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "team_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateFlakyTests": {
    "accessPath": [
      "updateFlakyTests"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/test/flaky-test-management/tests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchFlakyTests": {
    "accessPath": [
      "searchFlakyTests"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/test/flaky-test-management/tests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetUsageApplicationSecurityMonitoring": {
    "accessPath": [
      "getUsageApplicationSecurityMonitoring"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/application_security",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_hr",
      "end_hr"
    ]
  },
  "GetBillingDimensionMapping": {
    "accessPath": [
      "getBillingDimensionMapping"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/billing_dimension_mapping",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[month]",
      "filter[view]"
    ]
  },
  "GetCostByOrg": {
    "accessPath": [
      "getCostByOrg"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/cost_by_org",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_month",
      "end_month"
    ]
  },
  "GetEstimatedCostByOrg": {
    "accessPath": [
      "getEstimatedCostByOrg"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/estimated_cost",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "view",
      "start_month",
      "end_month",
      "start_date",
      "end_date",
      "cost_aggregation",
      "include_connected_accounts"
    ]
  },
  "GetHistoricalCostByOrg": {
    "accessPath": [
      "getHistoricalCostByOrg"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/historical_cost",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_month",
      "view",
      "end_month",
      "include_connected_accounts"
    ]
  },
  "GetHourlyUsage": {
    "accessPath": [
      "getHourlyUsage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/hourly_usage",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[timestamp][start]",
      "filter[timestamp][end]",
      "filter[product_families]",
      "filter[include_descendants]",
      "filter[include_connected_accounts]",
      "filter[include_breakdown]",
      "filter[versions]",
      "page[limit]",
      "page[next_record_id]"
    ]
  },
  "GetUsageLambdaTracedInvocations": {
    "accessPath": [
      "getUsageLambdaTracedInvocations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/lambda_traced_invocations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_hr",
      "end_hr"
    ]
  },
  "GetUsageObservabilityPipelines": {
    "accessPath": [
      "getUsageObservabilityPipelines"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/observability_pipelines",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_hr",
      "end_hr"
    ]
  },
  "GetProjectedCost": {
    "accessPath": [
      "getProjectedCost"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/projected_cost",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "view",
      "include_connected_accounts"
    ]
  },
  "GetUsageAttributionTypes": {
    "accessPath": [
      "getUsageAttributionTypes"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/usage/usage-attribution-types",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SendInvitations": {
    "accessPath": [
      "sendInvitations"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/user_invitations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetInvitation": {
    "accessPath": [
      "getInvitation"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/user_invitations/{user_invitation_uuid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_invitation_uuid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListUsers": {
    "accessPath": [
      "listUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]",
      "sort",
      "sort_dir",
      "filter",
      "filter[status]"
    ]
  },
  "CreateUser": {
    "accessPath": [
      "createUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DisableUser": {
    "accessPath": [
      "disableUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetUser": {
    "accessPath": [
      "getUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateUser": {
    "accessPath": [
      "updateUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListUserOrganizations": {
    "accessPath": [
      "listUserOrganizations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{user_id}/orgs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListUserPermissions": {
    "accessPath": [
      "listUserPermissions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{user_id}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetUserMemberships": {
    "accessPath": [
      "getUserMemberships"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/users/{user_uuid}/memberships",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_uuid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "SearchWidgets": {
    "accessPath": [
      "searchWidgets"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/widgets/{experience_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experience_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "filter[widgetType]",
      "filter[creatorHandle]",
      "filter[isFavorited]",
      "filter[title]",
      "filter[tags]",
      "sort",
      "page[number]",
      "page[size]"
    ]
  },
  "CreateWidget": {
    "accessPath": [
      "createWidget"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/widgets/{experience_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experience_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteWidget": {
    "accessPath": [
      "deleteWidget"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/widgets/{experience_type}/{uuid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experience_type",
      "uuid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetWidget": {
    "accessPath": [
      "getWidget"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/widgets/{experience_type}/{uuid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experience_type",
      "uuid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateWidget": {
    "accessPath": [
      "updateWidget"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/widgets/{experience_type}/{uuid}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "experience_type",
      "uuid"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CreateWorkflow": {
    "accessPath": [
      "createWorkflow"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/workflows",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "DeleteWorkflow": {
    "accessPath": [
      "deleteWorkflow"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v2/workflows/{workflow_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetWorkflow": {
    "accessPath": [
      "getWorkflow"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/workflows/{workflow_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "UpdateWorkflow": {
    "accessPath": [
      "updateWorkflow"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PATCH",
    "routeTemplate": "/api/v2/workflows/{workflow_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "ListWorkflowInstances": {
    "accessPath": [
      "listWorkflowInstances"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/workflows/{workflow_id}/instances",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page[size]",
      "page[number]"
    ]
  },
  "CreateWorkflowInstance": {
    "accessPath": [
      "createWorkflowInstance"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "meta"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v2/workflows/{workflow_id}/instances",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "GetWorkflowInstance": {
    "accessPath": [
      "getWorkflowInstance"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v2/workflows/{workflow_id}/instances/{instance_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id",
      "instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "CancelWorkflowInstance": {
    "accessPath": [
      "cancelWorkflowInstance"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v2/workflows/{workflow_id}/instances/{instance_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "workflow_id",
      "instance_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  }
} satisfies ToolRuntimeMetadataMap;
